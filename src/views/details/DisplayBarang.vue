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
				<CRow class="mt-2 ml-1">
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
						@click="deleteData"
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
							:deleteData="deleteBarang"
						>
							<template #header>
								<CButton 
									color="primary" 
									class="mr-1"
									@click="inputNewBarang()"
								>
									+ Tambah Barang
								</CButton>
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
			:sbp_id.sync="this.data.sbp_id"
			:state.sync="item_state"
			@save-data="getListBarang"
		>
		</MyFormItemBarang>
	</div>
</template>

<script>
import axios from "axios"

import MyFormItemBarang from '../details/FormItemBarang.vue'
import MyTableData from '../components/TableData.vue'

const API = process.env.VUE_APP_BASEAPI + '/sbp'

const data_default = {
	id: null,
	sbp_id: null,
	jumlah_kemasan: null,
	satuan_kemasan: null,
	jns_dok: null,
	no_dok: null,
	tgl_dok: null,
	pemilik: null,
}

export default {
	name: 'DisplayBarang',
	components: {
		MyFormItemBarang,
		MyTableData
	},
	props: {
		data: {
			id: Number,
			sbp_id: Number,
			jumlah_kemasan: Number,
			satuan_kemasan: String,
			jns_dok: String,
			no_dok: String,
			tgl_dok: String,
			pemilik: String,
		},
	},
	computed: {
		API_BARANG() { return API + '/' + this.data.sbp_id + '/barang' },
		API_BARANG_DETAIL() { return this.API_BARANG + '/detail' },
		disp_kemasan() {
			return (this.data.jumlah_kemasan || '-') + ' ' + (this.data.satuan_kemasan || '')
		},
		disp_dokumen() {
			return (this.data.jns_dok || '') + ' ' + (this.data.no_dok || '-') + ' / ' + (this.data.tgl_dok || '-')
		},
		disp_pemilik() {
			return this.data.pemilik || '-'
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
			fields_barang: [
				{ key: 'uraian_barang', label: 'Uraian Barang' },
				{ key: 'jumlah', label: 'Jumlah' },
				{ key: 'actions', label: '' }
			],
			list_barang: [],
			show_modal_barang: false,
			item_state: 'insert',
			item_to_edit: null
		}
	},
	methods: {
		editData() {
			this.$emit('edit-data')
		},
		deleteData() {
			axios
				.delete(this.API_BARANG)
				.then(
					(response) => {
						this.$emit('delete-data')
					}
				)
				.catch((error) => {console.error(error)})
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
		deleteBarang(id) {
			let API_BARANG_DETAIL_ID = this.API_BARANG_DETAIL + '/' + id
			axios
				.delete(API_BARANG_DETAIL_ID)
				.then(
					(response) => {
						this.getListBarang()
					}
				)
				.catch((error) => {console.error(error)})
		}
	},
	mounted() {
		this.getListBarang()
	}
}
</script>

<style>

</style>