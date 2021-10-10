<template>
	<CRow 
		class="mt-3 mx-2 pt-3 border-top"
	>
		<CCol col="12">
			<CRow>
				<CCol md="12">
					<h5>Bangunan / Tempat</h5>
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
					<b>No Reg. Bangunan/NPPPBKC</b>
				</CCol>
				<CCol md="9">
					&nbsp;{{disp_no_reg}}
				</CCol>
			</CRow>
			<CRow class="mt-2 ml-1">
				<CCol md="3">
					<b>Pemilik</b>
				</CCol>
				<CCol md="9">
					&nbsp;{{disp_pemilik}}
				</CCol>
			</CRow>
			<CRow class="mt-2 ml-1">
				<CCol md="3">
					<b>Identitas Pemilik</b>
				</CCol>
				<CCol md="9">
					&nbsp;{{disp_identitas}}
				</CCol>
			</CRow>
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
	name: 'DisplayBangunan',
	props: {
		data: {
			id: Number,
			sbp_id: Number,
			alamat: String,
			no_reg: String,
			pemilik: String,
			jns_identitas: String,
			no_identitas: String,
		}
	},
	computed: {
		API_BANGUNAN() { return API + '/' + this.data.sbp_id + '/bangunan' },
		disp_alamat() {
			return (this.data.alamat || '-')
		},
		disp_no_reg() {
			return (this.data.no_reg || '-')
		},
		disp_pemilik() {
			return (this.data.pemilik || '-')
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
				.delete(this.API_BANGUNAN)
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