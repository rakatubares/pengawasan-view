<template>
	<div class="wrapper">
		<CRow>
			<CCol class="mt-3 mx-2" md="12">
				<CRow>
					<CCol>
						<h4>{{ disp_no_bast }}</h4>
					</CCol>
				</CRow>
				<CRow class="mb-3">
					<CCol>
						<h5>{{ disp_tgl_bast }}</h5>
					</CCol>
				</CRow>
				<CRow>
					<CCol md="3">
						<b>Surat Perintah</b>
					</CCol>
					<CCol md="9">
						{{ disp_sprint }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3">
						<b>Nama Penerima</b>
					</CCol>
					<CCol md="9">
						{{ disp_nama_penerima }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3">
						<b>Identitas</b>
					</CCol>
					<CCol md="9">
						{{ disp_identitas }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3">
						<b>Atas nama</b>
					</CCol>
					<CCol md="9">
						{{ disp_atas_nama }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3">
						<b>Dalam rangka</b>
					</CCol>
					<CCol md="9">
						{{ disp_dalam_rangka }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3">
						<b>Pejabat</b>
					</CCol>
					<CCol md="9">
						{{ disp_pejabat }}
					</CCol>
				</CRow>
			</CCol>
		</CRow>
	</div>
</template>

<script>
import axios from "axios"

const API = process.env.VUE_APP_BASEAPI + '/bast'

const data_default = {
	no_dok_lengkap: null,
	tgl_dok: null,
	no_sprint: null,
	tgl_sprint: null,
	nama_penerima: null,
	jns_identitas: null,
	no_identitas: null,
	atas_nama_penerima: null,
	dalam_rangka: null,
	pejabat: null
}

export default {
	name: 'DisplayBast',
	props: {
		id: Number
	},
	computed: {
		API_BAST_ID() { return API + '/' + this.id },
		disp_no_bast() { return this.data.no_dok_lengkap || '-' },
		disp_tgl_bast() { return this.data.tgl_dok || '-' },
		disp_sprint() { return ((this.data.no_sprint || '') + ' tanggal ' + (this.data.tgl_sprint || '')) },
		disp_nama_penerima() { return this.data.nama_penerima || '-' },
		disp_identitas() { return ((this.data.jns_identitas || '') + ' tanggal ' + (this.data.no_identitas || '-')) },
		disp_atas_nama() { return this.data.atas_nama_penerima || '-' },
		disp_dalam_rangka() { return this.data.dalam_rangka || '-' },
		disp_pejabat() { return this.data.pejabat || '-' },
	},
	data() {
		return {
			data: JSON.parse(JSON.stringify(data_default))
		}
	},
	methods: {
		getData() {
			axios
				.get(this.API_BAST_ID)
				.then(
					(response) => {
						this.data = JSON.parse(JSON.stringify(response.data.data ))
					}
				)
		}
	},
	mounted() {
		this.getData()
	}
}
</script>

<style>

</style>