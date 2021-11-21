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
						<b>Lokasi Penitipan</b>
					</CCol>
					<CCol md="9">
						{{ disp_lokasi_titip }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3">
						<b>BA Penyegelan</b>
					</CCol>
					<CCol md="9">
						{{ disp_segel }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3">
						<b>Nama Penerima/Pemilik</b>
					</CCol>
					<CCol md="9">
						{{ disp_nama_penerima }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3">
						<b>Alamat</b>
					</CCol>
					<CCol md="9">
						{{ disp_alamat_penerima }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3">
						<b>Pekerjaan</b>
					</CCol>
					<CCol md="9">
						{{ disp_jabatan_penerima }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3">
						<b>Identitas</b>
					</CCol>
					<CCol md="9">
						{{ disp_identitas_penerima }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3">
						<b>Nama Saksi</b>
					</CCol>
					<CCol md="9">
						{{ disp_nama_saksi }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3">
						<b>Identitas</b>
					</CCol>
					<CCol md="9">
						{{ disp_identitas_saksi }}
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
	lokasi_titip: null,
	nomor_ba_segel: null,
	tanggal_segel: null,
	lokasi_segel: null,
	penerima: {
		nama: null,
		alamat: null,
		pekerjaan: null,
		jenis_identitas: null,
		nomor_identitas: null
	},
	saksi: {
		nama: null,
		alamat: null,
		pekerjaan: null,
		jenis_identitas: null,
		nomor_identitas: null
	},
	pejabat1: null,
	pejabat2: null
}

export default {
	name: 'DisplayTitip',
	props: {
		id: Number
	},
	computed: {
		disp_no_ba_segel() { return this.data.no_dok_lengkap || '-' },
		disp_tgl_ba_segel() { return this.data.tgl_dok || '-' },
		disp_sprint() { return ((this.data.sprint.nomor_sprint || '') + ' tanggal ' + (this.data.sprint.tanggal_sprint || '')) },
		disp_lokasi_titip() { return this.data.lokasi_titip || '-' },
		disp_segel() { return ((this.data.nomor_ba_segel || '-') + ' tanggal ' + (this.data.tanggal_segel || ''))},
		disp_nama_penerima() { return this.data.penerima.nama || '-' },
		disp_alamat_penerima() { return this.data.penerima.alamat || '-' },
		disp_jabatan_penerima() { return this.data.penerima.pekerjaan || '-' },
		disp_identitas_penerima() { return (this.data.penerima.jenis_identitas || '') + ' ' + (this.data.penerima.nomor_identitas || '-') },
		disp_nama_saksi() { return this.data.saksi.nama || '-' },
		disp_identitas_saksi() { return (this.data.saksi.jenis_identitas || '') + ' ' + (this.data.saksi.nomor_identitas || '-') },
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
				.get(api.getPenitipanById(this.id))
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