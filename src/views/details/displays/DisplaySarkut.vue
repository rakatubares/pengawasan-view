<template>
	<div class="wrapper border-top">
		<CRow class="mt-2">
			<CCol md="12">
				<h4><b>Sarana Pengangkut</b></h4>
			</CCol>
		</CRow>
		<CRow class="mt-2">
			<CCol md="3">
				<b>Nama Sarana Pengangkut</b>
			</CCol>
			<CCol md="9">
				&nbsp;{{disp_nama_sarkut}}
			</CCol>
		</CRow>
		<CRow class="mt-2">
			<CCol md="3">
				<b>Jenis Sarana Pengangkut</b>
			</CCol>
			<CCol md="9">
				&nbsp;{{disp_jenis_sarkut}}
			</CCol>
		</CRow>
		<CRow class="mt-2">
			<CCol md="3">
				<b>No Voyage/Penerbangan/Trayek</b>
			</CCol>
			<CCol md="9">
				&nbsp;{{disp_no_flight_trayek}}
			</CCol>
		</CRow>
		<CRow class="mt-2">
			<CCol md="3">
				<b>Ukuran/Kapasitas Muatan</b>
			</CCol>
			<CCol md="9">
				&nbsp;{{disp_kapasitas_sarkut}}
			</CCol>
		</CRow>
		<CRow class="mt-2">
			<CCol md="3">
				<b>Nahkoda/Pilot/Pengemudi</b>
			</CCol>
			<CCol md="9">
				&nbsp;{{disp_nama_pilot}}
			</CCol>
		</CRow>
		<CRow class="mt-2">
			<CCol md="3">
				<b>Identitas</b>
			</CCol>
			<CCol md="9">
				&nbsp;{{disp_identitas_pilot}}
			</CCol>
		</CRow>
		<CRow class="mt-2">
			<CCol md="3">
				<b>Bendera</b>
			</CCol>
			<CCol md="9">
				&nbsp;{{disp_bendera}}
			</CCol>
		</CRow>
		<CRow class="mt-2">
			<CCol md="3">
				<b>Nomor Register/Polisi</b>
			</CCol>
			<CCol md="9">
				&nbsp;{{disp_no_reg_polisi}}
			</CCol>
		</CRow>
	</div>
</template>

<script>
const default_data = {
	nama_sarkut: null,
	jenis_sarkut: null,
	no_flight_trayek: null,
	jumlah_kapasitas: null,
	satuan_kapasitas: null,
	bendera: null,
	no_reg_polisi: null,
	pilot: {
		nama: null,
		warga_negara: null,
		jenis_identitas: null,
		nomor_identitas: null,
		tempat_lahir: null,
		tanggal_lahir: null,
		agama: null,
		alamat: null,
		pekerjaan: null,
		nomor_telepon: null,
		email: null,
	}
}

export default {
	name: 'DisplaySarkut',
	props: {
		data_objek: Object,
	},
	computed: {
		objek() {
			let data = this.data_objek.data == null
				? JSON.parse(JSON.stringify(default_data))
				: JSON.parse(JSON.stringify(this.data_objek.data))
			
			return data
		},
		disp_nama_sarkut() {
			return this.objek.nama_sarkut || '-'
		},
		disp_jenis_sarkut() {
			return this.objek.jenis_sarkut || '-'
		},
		disp_no_flight_trayek() {
			return this.objek.no_flight_trayek || '-'
		},
		disp_kapasitas_sarkut() {
			return (this.objek.jumlah_kapasitas || '-') + ' ' + (this.objek.satuan_kapasitas || '')
		},
		disp_nama_pilot() {
			return this.objek.pilot.nama || '-'
		},
		disp_identitas_pilot() { 
			return (this.objek.pilot.jenis_identitas || '') + ' ' + (this.objek.pilot.nomor_identitas || '-') 
		},
		disp_bendera() {
			return this.objek.bendera || '-'
		},
		disp_no_reg_polisi() {
			return this.objek.no_reg_polisi || '-'
		},
	},
}
</script>

<style>

</style>