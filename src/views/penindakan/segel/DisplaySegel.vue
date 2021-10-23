<template>
	<div class="wrapper">
		<CRow>
			<CCol class="mt-3 mx-2" md="12">
				<CRow>
					<CCol>
						<h4>{{ disp_no_ba_segel }}</h4>
					</CCol>
				</CRow>
				<CRow class="mb-3">
					<CCol>
						<h5>{{ disp_tgl_ba_segel }}</h5>
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3">
						<b>Surat Perintah</b>
					</CCol>
					<CCol md="9">
						{{ disp_sprint }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3">
						<b>Jenis Segel</b>
					</CCol>
					<CCol md="9">
						{{ disp_jenis_segel }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3">
						<b>Jumlah Segel</b>
					</CCol>
					<CCol md="9">
						{{ disp_jumlah_segel }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3">
						<b>Nomor Segel</b>
					</CCol>
					<CCol md="9">
						{{ disp_nomor_segel }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3">
						<b>Lokasi Segel</b>
					</CCol>
					<CCol md="9">
						{{ disp_lokasi_segel }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3">
						<b>Nama Pemilik/Saksi</b>
					</CCol>
					<CCol md="9">
						{{ disp_nama_pemilik }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3">
						<b>Alamat</b>
					</CCol>
					<CCol md="9">
						{{ disp_alamat_pemilik }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3">
						<b>Pekerjaan</b>
					</CCol>
					<CCol md="9">
						{{ disp_pekerjaan_pemilik }}
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
			</CCol>
		</CRow>
	</div>
</template>

<script>
import axios from "axios"

const API = process.env.VUE_APP_BASEAPI + '/segel'

const data_default = {
	no_dok_lengkap: null,
	tgl_dok: null,
	no_sprint: null,
	tgl_sprint: null,
	jenis_segel: null,
	jumlah_segel: null,
	nomor_segel: null,
	lokasi_segel: null,
	nama_pemilik: null,
	alamat_pemilik: null,
	pekerjaan_pemilik: null,
	jns_identitas: null,
	no_identitas: null,
	pejabat1: null,
	pejabat2: null
}

export default {
	name: 'DisplaySegel',
	props: {
		id: Number
	},
	computed: {
		API_SEGEL_ID() { return API + '/' + this.id},
		disp_no_ba_segel() { return this.data.no_dok_lengkap || '-' },
		disp_tgl_ba_segel() { return this.data.tgl_dok || '-' },
		disp_sprint() { return ((this.data.no_sprint || '') + ' tanggal ' + (this.data.tgl_sprint || '')) },
		disp_jenis_segel() { return this.data.jenis_segel || '-' },
		disp_jumlah_segel() { return this.data.jumlah_segel || '-' },
		disp_nomor_segel() { return this.data.nomor_dok || '-' },
		disp_lokasi_segel() { return this.data.lokasi_dok || '-' },
		disp_nama_pemilik() { return this.data.nama_pemilik || '-' },
		disp_alamat_pemilik() { return this.data.alamat_pemilik || '-' },
		disp_pekerjaan_pemilik() { return this.data.pekerjaan_pemilik || '-' },
		disp_identitas() { return (this.data.jns_identitas || '') + ' ' + (this.data.no_identitas || '-') },
		disp_pejabat1() { return this.data.pejabat1 || '-' },
		disp_pejabat2() { return this.data.pejabat2 || '-' },
	},
	data() {
		return {
			data: JSON.parse(JSON.stringify(data_default))
		}
	},
	methods: {
		getData() {
			axios
				.get(this.API_SEGEL_ID)
				.then(
					(response) => {
						this.data = JSON.parse(JSON.stringify(response.data.data))
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