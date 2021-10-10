<template>
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
		</CCol>
	</CRow>
</template>

<script>
import axios from "axios"

const API = process.env.VUE_APP_BASEAPI + '/sbp'

const data_default = {
	id: null,
	sbp_id: null,
	nama_sarkut: null,
	jenis_sarkut: null,
	no_flight_trayek: null,
	kapasitas_sarkut: null,
	nama_pilot_pengemudi: null,
	bendera: null,
	no_reg_polisi: null,
}

export default {
	name: 'DisplaySarkut',
	props: {
		data: {
			id: Number,
			sbp_id: Number,
			nama_sarkut: String,
			jenis_sarkut: String,
			no_flight_trayek: String,
			kapasitas: Number,
			satuan_kapasitas: String,
			nama_pilot_pengemudi: String,
			bendera: String,
			no_reg_polisi: String,
		},
	},
	computed: {
		API_SARKUT() { return API + '/' + this.data.sbp_id + '/sarkut' },
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
	methods: {
		editData() {
			this.$emit('edit-data')
		},
		deleteData() {
			axios
				.delete(this.API_SARKUT)
				.then(
					(response) => {
						this.$emit('delete-data')
					}
				)
				.catch((error) => {console.error(error)})
		}
	}
}
</script>

<style>

</style>