<template>
	<div class="wrapper">
		<CRow>
			<CCol class="mt-3 mx-2" md="12">
				<CRow>
					<CCol>
						<h4>{{ disp_no_ba_riksa }}</h4>
					</CCol>
				</CRow>
				<CRow class="mb-3">
					<CCol>
						<h5>{{ disp_tgl_ba_riksa }}</h5>
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
						{{ disp_pekerjaan_saksi }}
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
export default {
	name: 'DisplayRiksa',
	props: {
		data: Object
	},
	computed: {
		disp_no_ba_riksa() { return this.data.main.data.no_dok_lengkap || '-' },
		disp_tgl_ba_riksa() { return this.data.penindakan.tanggal_penindakan || '-' },
		disp_sprint() { return ((this.data.penindakan.sprint.nomor_sprint || '') + ' tanggal ' + (this.data.penindakan.sprint.tanggal_sprint || '')) },
		disp_lokasi() { return this.data.penindakan.lokasi_penindakan || '-' },
		disp_nama_saksi() { return this.data.penindakan.saksi.nama || '-' },
		disp_alamat_saksi() { return this.data.penindakan.saksi.alamat || '-' },
		disp_pekerjaan_saksi() { return this.data.penindakan.saksi.pekerjaan || '-' },
		disp_identitas() { return (this.data.penindakan.saksi.jenis_identitas || '') + ' ' + (this.data.penindakan.saksi.nomor_identitas || '-') },
		disp_petugas1() { return this.data.penindakan.petugas1.name || '-' },
		disp_petugas2() { 
			if (this.data.penindakan.petugas2 != null) {
				return this.data.penindakan.petugas2.name
			} else {
				return '-'
			}
		},
	},
}
</script>

<style>
</style>