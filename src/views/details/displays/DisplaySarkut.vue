<template>
	<div class="wrapper">
		<CRow 
			class="mt-3 mx-2 pt-3 border-top"
		>
			<CCol col="12">
				<CRow>
					<CCol md="12">
						<h5>
							Sarana Pengangkut
						</h5>
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>Nama Sarana Pengangkut</b>
					</CCol>
					<CCol md="9">
						&nbsp;{{disp_nama_sarkut}}
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>Jenis Sarana Pengangkut</b>
					</CCol>
					<CCol md="9">
						&nbsp;{{disp_jenis_sarkut}}
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>No Voyage/Penerbangan/Trayek</b>
					</CCol>
					<CCol md="9">
						&nbsp;{{disp_no_flight_trayek}}
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>Ukuran/Kapasitas Muatan</b>
					</CCol>
					<CCol md="9">
						&nbsp;{{disp_kapasitas_sarkut}}
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>Nahkoda/Pilot/Pengemudi</b>
					</CCol>
					<CCol md="9">
						&nbsp;{{disp_nama_pilot}}
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>Identitas</b>
					</CCol>
					<CCol md="9">
						&nbsp;{{disp_identitas_pilot}}
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>Bendera</b>
					</CCol>
					<CCol md="9">
						&nbsp;{{disp_bendera}}
					</CCol>
				</CRow>
				<CRow class="mt-2 ml-1">
					<CCol md="3">
						<b>Nomor Register/Polisi</b>
					</CCol>
					<CCol md="9">
						&nbsp;{{disp_no_reg_polisi}}
					</CCol>
				</CRow>
			</CCol>
		</CRow>
	</div>
</template>

<script>
export default {
	name: 'DisplaySarkut',
	props: {
		data_objek: Object
	},
	computed: {
		disp_nama_sarkut() {
			return this.data.nama_sarkut || '-'
		},
		disp_jenis_sarkut() {
			return this.data.jenis_sarkut || '-'
		},
		disp_no_flight_trayek() {
			return this.data.no_flight_trayek || '-'
		},
		disp_kapasitas_sarkut() {
			return (this.data.jumlah_kapasitas || '-') + ' ' + (this.data.satuan_kapasitas || '')
		},
		disp_nama_pilot() {
			return this.data.pilot.nama || '-'
		},
		disp_identitas_pilot() { 
			return (this.data.pilot.jenis_identitas || '') + ' ' + (this.data.pilot.nomor_identitas || '-') 
		},
		disp_bendera() {
			return this.data.bendera || '-'
		},
		disp_no_reg_polisi() {
			return this.data.no_reg_polisi || '-'
		},
	},
	data() {
		return {
			data: this.data_objek.data
		}
	},
}
</script>

<style>

</style>