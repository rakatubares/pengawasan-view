<template>
	<div class="wrapper">
		<CRow>
			<CCol class="mt-3 mx-2" md="12">
				<CRow>
					<CCol>
						<h4>{{ disp_no_ba_pengaman }}</h4>
					</CCol>
				</CRow>
				<CRow class="mb-3">
					<CCol>
						<h5>{{ disp_tgl_ba_pengaman }}</h5>
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
						<b>Jenis Tanda Pengaman</b>
					</CCol>
					<CCol md="9">
						{{ disp_jenis_pengaman }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3">
						<b>Jumlah Tanda Pengaman</b>
					</CCol>
					<CCol md="9">
						{{ disp_jumlah_pengaman }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3">
						<b>Nomor Tanda Pengaman</b>
					</CCol>
					<CCol md="9">
						{{ disp_nomor_pengaman }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3">
						<b>Tempat Tanda Pengaman</b>
					</CCol>
					<CCol md="9">
						{{ disp_tempat_pengaman }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3">
						<b>Lokasi Pengamanan</b>
					</CCol>
					<CCol md="9">
						{{ disp_lokasi_pengamanan }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3">
						<b>Alasan Pengamanan</b>
					</CCol>
					<CCol md="9">
						{{ disp_alasan_pengamanan }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3">
						<b>Keterangan</b>
					</CCol>
					<CCol md="9">
						{{ disp_keterangan }}
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
	name: 'DisplayPengaman',
	props: {
		data_pengaman: Object
	},
	computed: {
		disp_no_ba_pengaman() { return this.data_pengaman.main.data.no_dok_lengkap || '-' },
		disp_tgl_ba_pengaman() { return this.data_pengaman.penindakan.tanggal_penindakan || '-' },
		disp_sprint() { return ((this.data_pengaman.penindakan.sprint.nomor_sprint || '') + ' tanggal ' + (this.data_pengaman.penindakan.sprint.tanggal_sprint || '')) },
		disp_jenis_pengaman() { return this.data_pengaman.main.data.jenis_pengaman || '-' },
		disp_jumlah_pengaman() { return ((this.data_pengaman.main.data.jumlah_pengaman || '-') + ' ' + (this.data_pengaman.main.data.satuan_pengaman || '')) },
		disp_nomor_pengaman() { return this.data_pengaman.main.data.nomor_pengaman || '-'},
		disp_tempat_pengaman() { return this.data_pengaman.main.data.tempat_pengaman || '-' },
		disp_alasan_pengamanan() { return this.data_pengaman.main.data.alasan_pengamanan || '-' },
		disp_lokasi_pengamanan() { return this.data_pengaman.penindakan.lokasi_penindakan || '-' },
		disp_keterangan() { return this.data_pengaman.main.data.keterangan || '-' },
		disp_nama_saksi() { return this.data_pengaman.penindakan.saksi.nama || '-' },
		disp_alamat_saksi() { return this.data_pengaman.penindakan.saksi.alamat || '-' },
		disp_pekerjaan_saksi() { return this.data_pengaman.penindakan.saksi.pekerjaan || '-' },
		disp_identitas() { return (this.data_pengaman.penindakan.saksi.jenis_identitas || '') + ' ' + (this.data_pengaman.penindakan.saksi.nomor_identitas || '-') },
		disp_petugas1() { return this.data_pengaman.penindakan.petugas1.name || '-' },
		disp_petugas2() { 
			if (this.data_pengaman.penindakan.petugas2 != null) {
				return this.data_pengaman.penindakan.petugas2.name
			} else {
				return '-'
			}
		},
	},
}
</script>

<style>
</style>