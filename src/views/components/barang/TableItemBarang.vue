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
											@click="deleteItem(item)"
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
			:doc_type.sync="doc_type"
			:doc_id.sync="doc_id"
			:bhp="bhp"
			:state.sync="item_state"
			@save="getData"
		>
		</MyFormItemBarang>

		<!-- Modal konfirmasi delete -->
		<MyFormDeleteItemBarang
			ref="modal_delete"
			:doc_type.sync="doc_type"
			:doc_id.sync="doc_id"
			@delete="getData"
		/>

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
import MyModalCarousel from '../ModalCarousel.vue'
import MyFormItemBarang from './FormItemBarang.vue'
import MyFormDeleteItemBarang from './FormDeleteItemBarang.vue'
import MyTableData from '../TableData.vue'

export default {
	name: 'TableItemBarang',
	components: {
		MyModalCarousel,
		MyFormDeleteItemBarang,
		MyFormItemBarang,
		MyTableData
	},
	props: {
		state: String,
		doc_type: String,
		doc_id: Number,
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
					jumlah: (arr[idx]['jumlah_barang'] || '-') + ' ' + (arr[idx]['satuan']['satuan'] || ''),
					berat: (arr[idx]['berat'] || '-') + ' ' + (arr[idx]['satuan_berat'] || ''),
					kategori: arr[idx]['kategori'] ? arr[idx]['kategori']['kategori'] : '-',
					_cellClasses: { jumlah: 'text-center', berat: 'text-center',},
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
				{ key: 'uraian_barang', label: 'Uraian Barang', _style: 'text-align: center;' },
				{ key: 'jumlah', label: 'Jumlah', _style: 'text-align: center; min-width: 150px;' },
				{ key: 'berat', label: 'Berat (KG)', _style: 'text-align: center; min-width: 150px;' },
				{ key: 'kategori', label: 'Kategori', _style: 'text-align: center;' },
				{ key: 'actions', label: '' }
			],
			modal_carousel_props: {
				show: false,
				item_id: null
			},
			list_barang: [],
			show_modal_barang: false,
			show_modal_delete: false,
			item_state: 'insert',
			item_to_edit: null,
		}
	},
	methods: {
		async getData() {
			let response = null
			if (!this.bhp) {
				response = await api.getBarang(this.doc_type, this.doc_id)
				this.list_barang = response.data
			} else {
				response = await api.getBhpByDocId(this.doc_type, this.doc_id)
				this.list_barang = response.data
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
		deleteItem(item) {
			this.$refs.modal_delete.showModal(item.id, item.uraian_barang)
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