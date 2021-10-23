<template>
	<div class="wrapper">
		<CRow>
			<CCol class="mt-3 mx-2" md="12">
				<CRow>
					<CCol>
						<h4>{{ disp_no_sbp }}</h4>
					</CCol>
				</CRow>
				<CRow class="mb-3">
					<CCol>
						<h5>{{ disp_tgl_sbp }}</h5>
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
						<b>Lokasi Penindakan</b>
					</CCol>
					<CCol md="9">
						{{ disp_lokasi }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3">
						<b>Uraian Penindakan</b>
					</CCol>
					<CCol md="9">
						{{ disp_uraian }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3">
						<b>Alasan Penindakan</b>
					</CCol>
					<CCol md="9">
						{{ disp_alasan }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3">
						<b>Jenis Pelanggaran</b>
					</CCol>
					<CCol md="9">
						{{ disp_pelanggaran }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3">
						<b>Waktu Mulai Penindakan</b>
					</CCol>
					<CCol md="9">
						{{ disp_waktu_mulai }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3">
						<b>Waktu Selesai Penindakan</b>
					</CCol>
					<CCol md="9">
						{{ disp_waktu_selesai }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3">
						<b>Hal Terjadi</b>
					</CCol>
					<CCol md="9">
						{{ disp_hal_terjadi }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3">
						<b>Pemilik</b>
					</CCol>
					<CCol md="9">
						{{ disp_pemilik }}
					</CCol>
				</CRow>
			</CCol>
		</CRow>
	</div>
</template>

<script>
import axios from "axios"

const API = process.env.VUE_APP_BASEAPI + '/sbp'

const data_default = {
	no_dok_lengkap: null,
	tgl_dok: null,
	no_sprint: null,
	tgl_sprint: null,
	uraian_penindakan: null,
	alasan_penindakan: null,
	alasan_penindakan: null,
	jenis_pelanggaran: null,
	wkt_mulai_penindakan: null,
	wkt_selesai_penindakan: null,
	hal_terjadi: null,
	nama_pemilik: null,
	pejabat1: null,
	pejabat2: null
}

export default {
	name: 'DisplaySbp',
	props: {
		id: Number
	},
	computed: {
		API_SBP_ID() { return API + '/' + this.id },
		disp_no_sbp() { return this.data.no_dok_lengkap || '-' },
		disp_tgl_sbp() { return this.data.tgl_dok || '-' },
		disp_sprint() { return ((this.data.no_sprint || '') + ' tanggal ' + (this.data.tgl_sprint || '')) },
		disp_lokasi() { return this.data.lokasi_penindakan || '-' },
		disp_uraian() { return this.data.uraian_penindakan || '-' },
		disp_alasan() { return this.data.alasan_penindakan || '-' },
		disp_pelanggaran() { return this.data.jenis_pelanggaran || '-' },
		disp_waktu_mulai() { return this.data.wkt_mulai_penindakan || '-' },
		disp_waktu_selesai() { return this.data.wkt_selesai_penindakan || '-' },
		disp_hal_terjadi() { return this.data.hal_terjadi || '-' },
		disp_pemilik() { return this.data.nama_pemilik || '-' },
	},
	data() {
		return {
			data: JSON.parse(JSON.stringify(data_default))
		}
	},
	methods: {
		getData() {
			axios
				.get(this.API_SBP_ID)
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