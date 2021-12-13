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
						<b>Tempat Segel</b>
					</CCol>
					<CCol md="9">
						{{ disp_tempat_segel }}
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
// import axios from "axios"

// import api from '../../../router/api.js'

// const data_default = {
// 	no_dok_lengkap: null,
// 	tgl_dok: null,
// 	sprint: {
// 		nomor_sprint: null,
// 		tanggal_sprint: null
// 	},
// 	jenis_segel: null,
// 	jumlah_segel: null,
// 	nomor_segel: null,
// 	lokasi_segel: null,
// 	saksi: {
// 		nama: null,
// 		alamat: null,
// 		pekerjaan: null,
// 		jenis_identitas: null,
// 		nomor_identitas: null
// 	},
// 	petugas1: {
// 		name: null,
// 		nip: null
// 	},
// 	petugas2: {
// 		name: null,
// 		nip: null
// 	}
// }

export default {
	name: 'DisplaySegel',
	props: {
		// id: Number
		data_segel: Object
	},
	computed: {
		disp_no_ba_segel() { return this.data_segel.main.data.no_dok_lengkap || '-' },
		disp_tgl_ba_segel() { return this.data_segel.penindakan.tanggal_penindakan || '-' },
		disp_sprint() { return ((this.data_segel.penindakan.sprint.nomor_sprint || '') + ' tanggal ' + (this.data_segel.penindakan.sprint.tanggal_sprint || '')) },
		disp_jenis_segel() { return this.data_segel.main.data.jenis_segel || '-' },
		disp_jumlah_segel() { return ((this.data_segel.main.data.jumlah_segel || '-') + ' ' + (this.data_segel.main.data.satuan_segel || '')) },
		disp_nomor_segel() { return this.data_segel.main.data.nomor_segel || '-'},
		disp_tempat_segel() { return this.data_segel.main.data.tempat_segel || '-' },
		disp_nama_pemilik() { return this.data_segel.penindakan.saksi.nama || '-' },
		disp_alamat_pemilik() { return this.data_segel.penindakan.saksi.alamat || '-' },
		disp_pekerjaan_pemilik() { return this.data_segel.penindakan.saksi.pekerjaan || '-' },
		disp_identitas() { return (this.data_segel.penindakan.saksi.jenis_identitas || '') + ' ' + (this.data_segel.penindakan.saksi.nomor_identitas || '-') },
		disp_petugas1() { return this.data_segel.penindakan.petugas1.name || '-' },
		disp_petugas2() { 
			if (this.data_segel.penindakan.petugas2 != null) {
				return this.data_segel.penindakan.petugas2.name
			} else {
				return '-'
			}
		},
	},
	// data() {
	// 	return {
	// 		data: JSON.parse(JSON.stringify(data_default))
	// 	}
	// },
	// methods: {
	// 	getData() {
	// 		axios
	// 			.get(api.getSegelById(this.id))
	// 			.then(
	// 				(response) => {
	// 					this.data = JSON.parse(JSON.stringify(response.data.data))
	// 				}
	// 			)
	// 	}
	// },
	// mounted() {
	// 	this.getData()
	// }
}
</script>

<style>

</style>