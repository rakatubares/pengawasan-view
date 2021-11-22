<template>
	<div class="wrapper">
		<CRow>
			<CCol class="mt-3 mx-2" md="12">
				<CRow>
					<CCol>
						<h4>{{ disp_no_dok }}</h4>
					</CCol>
				</CRow>
				<CRow class="mb-3">
					<CCol>
						<h5>{{ disp_tgl_dok }}</h5>
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
						<b>Nama Pemilik/Saksi</b>
					</CCol>
					<CCol md="9">
						{{ disp_nama_saksi }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3">
						<b>Alamat</b>
					</CCol>
					<CCol md="9">
						{{ disp_alamat_saksi }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3">
						<b>Pekerjaan</b>
					</CCol>
					<CCol md="9">
						{{ disp_jabatan_saksi }}
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
	name: 'DisplayTegah',
	props: {
		id: Number
	},
	computed: {
		disp_no_dok() { return this.data.no_dok_lengkap || '-' },
		disp_tgl_dok() { return this.data.tgl_dok || '-' },
		disp_sprint() { return ((this.data.sprint.nomor_sprint || '') + ' tanggal ' + (this.data.sprint.tanggal_sprint || '')) },
		disp_nama_saksi() { return this.data.saksi.nama || '-' },
		disp_alamat_saksi() { return this.data.saksi.alamat || '-' },
		disp_jabatan_saksi() { return this.data.saksi.pekerjaan || '-' },
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
				.get(api.getPenegahanById(this.id))
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