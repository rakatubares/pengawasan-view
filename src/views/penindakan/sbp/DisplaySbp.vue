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
						<b>Saksi/Pemilik</b>
					</CCol>
					<CCol md="9">
						{{ disp_saksi }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3">
						<b>Petugas 1</b>
					</CCol>
					<CCol md="9">
						{{ disp_petugas1 }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3">
						<b>Petugas 2</b>
					</CCol>
					<CCol md="9">
						{{ disp_petugas2 }}
					</CCol>
				</CRow>
			</CCol>
		</CRow>
	</div>
</template>

<script>
import axios from "axios"

import api from '../../../router/api.js'

const data_default = {
	no_dok_lengkap: null,
	tgl_dok: null,
	sprint: {
		nomor_sprint: null,
		tanggal_sprint: null
	},
	uraian_penindakan: null,
	alasan_penindakan: null,
	jenis_pelanggaran: null,
	wkt_mulai_penindakan: null,
	wkt_selesai_penindakan: null,
	hal_terjadi: null,
	saksi: {nama: null},
	petugas1: {
		name: null,
		nip: null
	},
	petugas2: {
		name: null,
		nip: null
	}
}

export default {
	name: 'DisplaySbp',
	props: {
		id: Number
	},
	computed: {
		disp_no_sbp() { return this.data.no_dok_lengkap || '-' },
		disp_tgl_sbp() { return this.data.tgl_dok || '-' },
		disp_sprint() { return ((this.data.sprint.nomor_sprint || '') + ' tanggal ' + (this.data.sprint.tanggal_sprint || '')) },
		disp_lokasi() { return this.data.lokasi_penindakan || '-' },
		disp_uraian() { return this.data.uraian_penindakan || '-' },
		disp_alasan() { return this.data.alasan_penindakan || '-' },
		disp_pelanggaran() { return this.data.jenis_pelanggaran || '-' },
		disp_waktu_mulai() { return this.data.wkt_mulai_penindakan || '-' },
		disp_waktu_selesai() { return this.data.wkt_selesai_penindakan || '-' },
		disp_hal_terjadi() { return this.data.hal_terjadi || '-' },
		disp_saksi() { return this.data.saksi.nama || '-' },
		disp_petugas1() { return this.data.petugas1.name || '-' },
		disp_petugas2() { 
			if (this.data.petugas2 != null) {
				return this.data.petugas2.name
			} else {
				return '-'
			}
		},
	},
	data() {
		return {
			data: JSON.parse(JSON.stringify(data_default))
		}
	},
	methods: {
		getData() {
			axios
				.get(api.sbpId(this.id))
				.then(
					(response) => { 
						this.data = JSON.parse(JSON.stringify(response.data.data ))
						console.log('display sbp - data', JSON.parse(JSON.stringify(this.data)))
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