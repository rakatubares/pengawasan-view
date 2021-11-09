<template>
	<div class="wrapper">
		<CRow 
			class="mt-3 mx-2 pt-3 border-top"
		>
			<CCol col="12">
				<CRow>
					<CCol md="12">
						<h5>
							Sarana Pengangkut
						</h5>
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>Nama Sarana Pengangkut</b>
					</CCol>
					<CCol md="9">
						&nbsp;{{disp_nama_sarkut}}
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>Jenis Sarana Pengangkut</b>
					</CCol>
					<CCol md="9">
						&nbsp;{{disp_jenis_sarkut}}
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>No Voyage/Penerbangan/Trayek</b>
					</CCol>
					<CCol md="9">
						&nbsp;{{disp_no_flight_trayek}}
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>Ukuran/Kapasitas Muatan</b>
					</CCol>
					<CCol md="9">
						&nbsp;{{disp_kapasitas_sarkut}}
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>Nahkoda/Pilot/Pengemudi</b>
					</CCol>
					<CCol md="9">
						&nbsp;{{disp_nama_pilot_pengemudi}}
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>Bendera</b>
					</CCol>
					<CCol md="9">
						&nbsp;{{disp_bendera}}
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>Nomor Register/Polisi</b>
					</CCol>
					<CCol md="9">
						&nbsp;{{disp_no_reg_polisi}}
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
			</CCol>
		</CRow>

		<!-- Modal konfirmasi delete SBP -->
		<MyModalDelete
			v-if="modal_delete_props.show"
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

export default {
	name: 'DisplaySarkut',
	components: {
		MyModalDelete
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
		API_SARKUT() { return process.env.VUE_APP_BASEAPI + '/' + this.doc_type + '/' + this.doc_id + '/sarkut' },
		disp_nama_sarkut() {
			return this.data.nama_sarkut || '-'
		},
		disp_jenis_sarkut() {
			return this.data.jenis_sarkut || '-'
		},
		disp_no_flight_trayek() {
			return this.data.no_flight_trayek || '-'
		},
		disp_kapasitas_sarkut() {
			return (this.data.kapasitas || '-') + ' ' + (this.data.satuan_kapasitas || '')
		},
		disp_nama_pilot_pengemudi() {
			return this.data.nama_pilot_pengemudi || '-'
		},
		disp_bendera() {
			return this.data.bendera || '-'
		},
		disp_no_reg_polisi() {
			return this.data.no_reg_polisi || '-'
		},
	},
	data() {
		return {
			data: {
				id: null,
				doc_id: null,
				nama_sarkut: null,
				jenis_sarkut: null,
				no_flight_trayek: null,
				kapasitas: null,
				satuan_kapasitas: null,
				nama_pilot_pengemudi: null,
				bendera: null,
				no_reg_polisi: null,
			},
			modal_delete_props: {
				show: false,
				url: null,
				text: null
			}
		}
	},
	methods: {
		getData() {
			axios
				.get(this.API_SARKUT)
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
			let text = "Apakah Anda yakin untuk menghapus data <b>penindakan sarana pengangkut</b>?" 

			this.modal_delete_props.url = this.API_SARKUT
			this.modal_delete_props.text = text
			this.modal_delete_props.show = true
		},
		closeModalDelete() {
			this.modal_delete_props.url = null
			this.modal_delete_props.text = null
			this.modal_delete_props.show = false
		},
		deleteData() {
			this.closeModalDelete()
			this.$emit('delete-data')
		}
	},
	mounted() {
		this.getData()
	}
}
</script>

<style>

</style>