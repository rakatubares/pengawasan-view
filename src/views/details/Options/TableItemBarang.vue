<template>
	<div class="wrapper">
		<!-- Tabel item barang -->
		<CRow>
			<CCol>
				<CCard>
					<CCardHeader>
						<CButton 
							v-if="(state==='insert') || (state==='edit')"
							color="primary" 
							class="mr-1"
							@click="inputNewBarang()"
						>
							+ Tambah Barang
						</CButton>
						<div v-else ><b>Daftar Barang</b></div>
					</CCardHeader>
					<CCardBody>
						<CDataTable
							:items="list_barang_table"
							:fields="fields"
							:items-per-page="5"
							pagination
						>
							<template #actions="{item}">
								<slot name="buttons">
									<td>
										<CButton 
											v-if="getButton('edit', item)"
											class="m-1"
											size="sm" 
											color="success"
											@click="editData(item.id)"
										>
											Edit
										</CButton>
										<CButton 
											v-if="getButton('delete', item)"
											class="m-1"
											size="sm" 
											color="danger"
											@click="confirmDeleteBarang(item)"
										>
											Hapus
										</CButton>
										<CButton 
											v-if="getButton('show', item)  & with_photo==true"
											class="m-1"
											size="sm" 
											color="primary"
											@click="showModalCarousel(item.id)"
										>
											Foto
										</CButton>
									</td>
								</slot>
							</template>
						</CDataTable>
					</CCardBody>
				</CCard>
			</CCol>
		</CRow>

		<!-- Modal input item barang -->
		<MyFormItemBarang
			v-if="show_modal_barang"
			:show.sync="show_modal_barang"
			:with_photo="with_photo"
			:id.sync="item_to_edit"
			:doc_type="doc_type"
			:doc_id="doc_id"
			:bhp="bhp"
			:state.sync="item_state"
			@submit-data="saveItem"
		>
		</MyFormItemBarang>

		<!-- Modal konfirmasi delete -->
		<MyModalDelete
			v-if="modal_delete_props.show"
			:target="delete_target"
			:doc_type="doc_type"
			:doc_id="doc_id"
			:item_id="modal_delete_props.item_id"
			@close-modal="closeModalDelete"
			@delete-data="deleteData"
		>
			<template #text>
				<span v-html="modal_delete_props.text"></span>
			</template>
		</MyModalDelete>

		<MyModalCarousel
			v-if="modal_carousel_props.show"
			:doc_type="doc_type"
			:doc_id="doc_id"
			:item_id="modal_carousel_props.item_id"
			@close-modal="closeModalCarousel"
		/>
	</div>
</template>

<script>
import api from '../../../router/api2.js'
import MyModalCarousel from '../../components/ModalCarousel.vue'
import MyModalDelete from '../../components/ModalDelete.vue'
import MyFormItemBarang from './FormItemBarang.vue'
import MyTableData from '../../components/TableData.vue'

export default {
	name: 'TableItemBarang',
	components: {
		MyModalCarousel,
		MyModalDelete,
		MyFormItemBarang,
		MyTableData
	},
	props: {
		state: String,
		doc_type: String,
		doc_id: Number,
		data_objek: Object,
		with_photo: {
			type: Boolean,
			default: true
		},
		bhp: {
			type: Boolean,
			default: false,
		},
	},
	computed: {
		list_barang_table() {
			let data_barang = []
			let arr = this.list_barang
			for (let idx in arr) {
				let uraian_barang = arr[idx]['uraian_barang']
				if (this.bhp) {
					let merk = arr[idx]['merk'] || '- '
					let kondisi = arr[idx]['kondisi'] || '- '
					let tipe = arr[idx]['tipe'] || '- '
					let spesifikasi_lain = arr[idx]['spesifikasi_lain'] || '- '
					
					uraian_barang += `; MERK: ${merk}`
					uraian_barang += `; KONDISI: ${kondisi}`
					uraian_barang += `; TIPE: ${tipe}`
					uraian_barang += `; SPESIFIKASI LAIN: ${spesifikasi_lain}`
				}

				let temp_barang = {
					id: arr[idx]['id'],
					uraian_barang: uraian_barang,
					jumlah: (arr[idx]['jumlah_barang'] || '-') + ' ' + (arr[idx]['satuan']['kode_satuan'] || ''),
					kategori: arr[idx]['kategori'] ? arr[idx]['kategori']['kategori'] : '-'
				}
				data_barang.push(temp_barang)
			}
			return data_barang
		},
		delete_target() {
			let target = this.bhp ? 'bhp' : 'item'
			return target
		}
	},
	data() {
		return {
			fields: [
				{ key: 'uraian_barang', label: 'Uraian Barang' },
				{ key: 'jumlah', label: 'Jumlah' },
				{ key: 'kategori', label: 'Kategori' },
				{ key: 'actions', label: '' }
			],
			modal_delete_props: {
				type: null,
				show: false,
				url: null,
				text: null
			},
			modal_carousel_props: {
				show: false,
				item_id: null
			},
			list_barang: this.data_objek.item,
			show_modal_barang: false,
			item_state: 'insert',
			item_to_edit: null,
		}
	},
	methods: {
		async getData() {
			let response = null
			if (!this.bhp) {
				response = await api.getObjek(this.doc_type, this.doc_id)
				this.list_barang = response.data.item
			} else {
				response = await api.getBhpByDocId(this.doc_type, this.doc_id)
				this.list_barang = response.data.data.item
			}
		},
		inputNewBarang() {
			this.show_modal_barang = true
			this.item_state = 'insert'
			this.item_to_edit = null
		},
		editData(id) {
			this.show_modal_barang = true
			this.item_state = 'edit'
			this.item_to_edit = id
		},
		saveItem() {
			this.getData()
			this.$emit('submit-data')
		},
		confirmDeleteBarang(item) {
			let text = "Apakah Anda yakin untuk menghapus data barang " 
				+ item.uraian_barang.bold()
				+ "?"

			this.modal_delete_props.text = text
			this.modal_delete_props.item_id = item.id
			this.modal_delete_props.show = true
		},
		deleteData() {
			this.getData()
			this.closeModalDelete()
		},
		closeModalDelete() {
			this.modal_delete_props.type = null
			this.modal_delete_props.url = null
			this.modal_delete_props.text = null
			this.modal_delete_props.show = false
		},
		showModalCarousel(id) {
			this.modal_carousel_props.show = true
			this.modal_carousel_props.item_id = id
		},
		closeModalCarousel() {
			this.modal_carousel_props.show = false
			this.modal_carousel_props.item_id = null
		},
		getButton(type, item) {
			let btn = false

			if ((this.state == 'insert') || (this.state == 'edit')) {
				if ((type == 'edit') || (type == 'delete')) {
					btn = true
				} else {
					btn = false
				}
			} else if (this.state == 'show') {
				if (type == 'show') {
					btn = true
				}
			}

			return btn
		}
	},
	mounted() {
		this.getData()
	}
}
</script>

<style>

</style>