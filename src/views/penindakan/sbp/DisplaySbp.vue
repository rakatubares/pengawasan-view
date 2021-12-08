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
export default {
	name: 'DisplaySbp',
	props: {
		data_sbp: Object
	},
	computed: {
		disp_no_sbp() { return this.data_sbp.main.data.no_dok_lengkap || '-' },
		disp_tgl_sbp() { return this.data_sbp.penindakan.tanggal_penindakan || '-' },
		disp_sprint() { return ((this.data_sbp.penindakan.sprint.nomor_sprint || '') + ' tanggal ' + (this.data_sbp.penindakan.sprint.tanggal_sprint || '')) },
		disp_lokasi() { return this.data_sbp.penindakan.lokasi_penindakan || '-' },
		disp_uraian() { return this.data_sbp.main.data.uraian_penindakan || '-' },
		disp_alasan() { return this.data_sbp.main.data.alasan_penindakan || '-' },
		disp_pelanggaran() { return this.data_sbp.main.data.jenis_pelanggaran || '-' },
		disp_waktu_mulai() { return this.data_sbp.main.data.wkt_mulai_penindakan || '-' },
		disp_waktu_selesai() { return this.data_sbp.main.data.wkt_selesai_penindakan || '-' },
		disp_hal_terjadi() { return this.data_sbp.main.data.hal_terjadi || '-' },
		disp_saksi() { return this.data_sbp.penindakan.saksi.nama || '-' },
		disp_petugas1() { return this.data_sbp.penindakan.petugas1.name || '-' },
		disp_petugas2() { 
			if (this.data_sbp.penindakan.petugas2 != null) {
				return this.data_sbp.penindakan.petugas2.name
			} else {
				return '-'
			}
		},
	},
}
</script>

<style>

</style>