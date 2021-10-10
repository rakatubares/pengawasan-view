<template>
	<CRow 
		class="mt-3 mx-2 pt-3 border-top"
	>
		<CCol col="12">
			<CRow>
				<CCol md="12">
					<h5>Badan / Orang</h5>
				</CCol>
			</CRow>
			<CRow class="mt-2 ml-1">
				<CCol md="3">
					<b>Nama</b>
				</CCol>
				<CCol md="9">
					&nbsp;{{disp_nama}}
				</CCol>
			</CRow>
			<CRow class="mt-2 ml-1">
				<CCol md="3">
					<b>Tanggal Lahir</b>
				</CCol>
				<CCol md="9">
					&nbsp;{{disp_tgl_lahir}}
				</CCol>
			</CRow>
			<CRow class="mt-2 ml-1">
				<CCol md="3">
					<b>Kewarganegaraan</b>
				</CCol>
				<CCol md="9">
					&nbsp;{{disp_warga_negara}}
				</CCol>
			</CRow>
			<CRow class="mt-2 ml-1">
				<CCol md="3">
					<b>Alamat</b>
				</CCol>
				<CCol md="9">
					&nbsp;{{disp_alamat}}
				</CCol>
			</CRow>
			<CRow class="mt-2 ml-1">
				<CCol md="3">
					<b>Nomor Identitas</b>
				</CCol>
				<CCol md="9">
					&nbsp;{{disp_identitas}}
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

export default {
	name: 'DisplayBadan',
	props: {
		data: {
			id: Number,
			sbp_id: Number,
			nama: String,
			tgl_lahir: String,
			warga_negara: String,
			alamat: String,
			jns_identitas: String,
			no_identitas: String,
		},
	},
	computed: {
		API_BADAN() { return API + '/' + this.data.sbp_id + '/badan' },
		disp_nama() {
			return this.data.nama || '-'
		},
		disp_tgl_lahir() {
			return this.data.tgl_lahir || '-'
		},
		disp_warga_negara() {
			return this.data.warga_negara || '-'
		},
		disp_alamat() {
			return this.data.alamat || '-'
		},
		disp_identitas() {
			return (this.data.jns_identitas || '') + ' ' + (this.data.no_identitas || '-')
		},
	},
	methods: {
		editData() {
			this.$emit('edit-data')
		},
		deleteData() {
			axios
				.delete(this.API_BADAN)
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