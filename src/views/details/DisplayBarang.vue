<template>
	<div class="wrapper">
		<CRow 
			class="mt-3 mx-2 pt-3 border-top"
		>
			<CCol col="12">
				<CRow>
					<CCol md="12">
						<h5>Barang</h5>
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>Jumlah/Jenis Kemasan</b>
					</CCol>
					<CCol md="9">
						&nbsp;{{disp_kemasan}}
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>Jenis/Nomor dan Tanggal Dokumen</b>
					</CCol>
					<CCol md="9">
						&nbsp;{{disp_dokumen}}
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>Pemilik/Importir/Eksportir/Kuasa</b>
					</CCol>
					<CCol md="9">
						&nbsp;{{disp_pemilik}}
					</CCol>
				</CRow>

				<!-- Button edit delete -->
				<CRow 
					v-if="(state==='insert') || (state==='edit')"
					class="mt-2 ml-1"
				>
					<CButton 
						class="mx-1"
						size="sm" 
						color="success"
						@click="editData"
					>
						<CIcon name="cil-pencil"/>&nbsp; Edit
					</CButton>
					<CButton 
						class="mx-1" 
						size="sm" 
						color="danger"
						@click="confirmDeleteData"
					>
						<CIcon name="cil-trash"/>&nbsp; Hapus
					</CButton>
				</CRow>

				<!-- Tabel item barang -->
				<CRow>
					<CCol>
						<MyTableData
							class="mt-3"
							:fields="fields_barang"
							:items="list_barang"
							:editData="editBarang"
							:deleteData="confirmDeleteBarang"
						>
							<template #header>
								<CButton 
									v-if="(state==='insert') || (state==='edit')"
									color="primary" 
									class="mr-1"
									@click="inputNewBarang()"
								>
									+ Tambah Barang
								</CButton>
								<div v-else ><b>Daftar Barang</b></div>
							</template>
						</MyTableData>
					</CCol>
				</CRow>
			</CCol>
		</CRow>

		<!-- Modal input item barang -->
		<MyFormItemBarang
			v-if="show_modal_barang"
			:show.sync="show_modal_barang"
			:id.sync="item_to_edit"
			:doc_type="doc_type"
			:doc_id="doc_id"
			:state.sync="item_state"
			@save-data="saveItem"
		>
		</MyFormItemBarang>

		<!-- Modal konfirmasi delete -->
		<MyModalDelete
			v-if="modal_delete_props.show"
			:type="modal_delete_props.type"
			:url.sync="modal_delete_props.url"
			@close-modal="closeModalDelete"
			@delete-data="deleteData"
		>
			<template #text>
				<span v-html="modal_delete_props.text"></span>
			</template>
		</MyModalDelete>
	</div>
</template>

<script>
import axios from "axios"

import MyModalDelete from '../components/ModalDelete.vue'
import MyFormItemBarang from '../details/FormItemBarang.vue'
import MyTableData from '../components/TableData.vue'

export default {
	name: 'DisplayBarang',
	components: {
		MyModalDelete,
		MyFormItemBarang,
		MyTableData
	},
	props: {
		state: {
			type: String,
			default: 'insert'
		},
		doc_type: String,
		doc_id: Number,
	},
	computed: {
		API_BARANG() { return process.env.VUE_APP_BASEAPI +  '/' + this.doc_type + '/' + this.doc_id + '/barang' },
		API_BARANG_DETAIL() { return this.API_BARANG + '/item' },
		disp_kemasan() {
			return (this.data.jumlah_kemasan || '-') + ' ' + (this.data.satuan_kemasan || '')
		},
		disp_dokumen() {
			return (this.data.jns_dok || '') + ' ' + (this.data.no_dok || '-') + ' / ' + (this.data.tgl_dok || '-')
		},
		disp_pemilik() {
			return this.data.pemilik || '-'
		},
		fields_barang() {
			let fields = [
				{ key: 'uraian_barang', label: 'Uraian Barang' },
				{ key: 'jumlah', label: 'Jumlah' },
			]

			if (['insert', 'edit'].includes(this.state)) {
				fields.push({ key: 'actions', label: '' })
			}

			return fields
		},
		list_barang_table: {
			get() { return this.list_barang },
			set(arr) {
				let data_barang = []
				for (let idx in arr) {
					let temp_barang = {
						id: arr[idx]['id'],
						uraian_barang: arr[idx]['uraian_barang'],
						jumlah: (arr[idx]['jumlah_barang'] || '-') + ' ' + (arr[idx]['satuan_barang'] || '')
					}
					data_barang.push(temp_barang)
				}
				this.list_barang = data_barang
			}
		}
	},
	data() {
		return {
			console,
			data: {
				id: null,
				doc_id: null,
				jumlah_kemasan: null,
				satuan_kemasan: null,
				jns_dok: null,
				no_dok: null,
				tgl_dok: null,
				pemilik: null,
			},
			modal_delete_props: {
				type: null,
				show: false,
				url: null,
				text: null
			},
			list_barang: [],
			show_modal_barang: false,
			item_state: 'insert',
			item_to_edit: null
		}
	},
	methods: {
		getData() {
			axios
				.get(this.API_BARANG)
				.then(
					(response) => {
						this.data = response.data.data
					}
				)
		},
		editData() {
			this.$emit('edit-data')
		},
		confirmDeleteData() {
			let text = "Apakah Anda yakin untuk menghapus data <b>penindakan barang</b>?" 

			this.modal_delete_props.type = "detail barang"
			this.modal_delete_props.url = this.API_BARANG
			this.modal_delete_props.text = text
			this.modal_delete_props.show = true
		},
		closeModalDelete() {
			this.modal_delete_props.type = null
			this.modal_delete_props.url = null
			this.modal_delete_props.text = null
			this.modal_delete_props.show = false
		},
		deleteData(type) {
			this.closeModalDelete()

			if (type == 'item barang') {
				this.getListBarang()
				this.$emit('edit-item')
			} else {
				this.$emit('delete-data')
			}
		},
		getListBarang() {
			axios
				.get(this.API_BARANG_DETAIL)
				.then(
					(response) => {
						this.list_barang_table = response.data.data
					}
				)
				.catch((error) => {console.error(error)})
		},
		inputNewBarang() {
			this.show_modal_barang = true
			this.item_state = 'insert'
			this.item_to_edit = null
		},
		editBarang(id) {
			this.show_modal_barang = true
			this.item_state = 'edit'
			this.item_to_edit = id
		},
		confirmDeleteBarang(item) {
			let API_BARANG_DETAIL_ID = this.API_BARANG_DETAIL + '/' + item.id
			let text = "Apakah Anda yakin untuk menghapus data barang " 
				+ item.uraian_barang.bold()
				+ "?"

			this.modal_delete_props.type = 'item barang'
			this.modal_delete_props.url = API_BARANG_DETAIL_ID
			this.modal_delete_props.text = text
			this.modal_delete_props.show = true
		},
		saveItem() {
			this.getListBarang()
			this.$emit('edit-item')
		}
	},
	mounted() {
		this.getData()
		this.getListBarang()
	}
}
</script>

<style>

</style>