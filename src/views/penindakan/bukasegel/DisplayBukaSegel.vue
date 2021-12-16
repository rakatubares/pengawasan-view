<template>
	<div class="wrapper">
		<CRow>
			<CCol class="mt-3 mx-2" md="12">
				<CRow>
					<CCol>
						<h4>{{ disp_no_dok_lengkap }}</h4>
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
						<b>Tanggal Segel</b>
					</CCol>
					<CCol md="9">
						{{ disp_tanggal_segel }}
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
	name: 'DisplayBukaSegel',
	props: {
		data: Object
	},
	computed: {
		disp_no_dok_lengkap() { return this.data.main.data.no_dok_lengkap || '-' },
		disp_tgl_dok() { return this.data.main.data.tanggal_dokumen || '-' },
		disp_sprint() { return ((this.data.main.data.sprint.nomor_sprint || '') + ' tanggal ' + (this.data.main.data.sprint.tanggal_sprint || '')) },
		disp_jenis_segel() { return this.data.main.data.jenis_segel || '-' },
		disp_jumlah_segel() { return ((this.data.main.data.jumlah_segel || '-') + ' ' + (this.data.main.data.satuan_segel || '')) },
		disp_nomor_segel() { return this.data.main.data.nomor_segel || '-' },
		disp_tanggal_segel() { return this.data.main.data.tanggal_segel || '-' },
		disp_tempat_segel() { return this.data.main.data.tempat_segel || '-' },
		disp_nama_saksi() { return this.data.main.data.saksi.nama || '-' },
		disp_alamat_saksi() { return this.data.main.data.saksi.alamat || '-' },
		disp_pekerjaan_saksi() { return this.data.main.data.saksi.pekerjaan || '-' },
		disp_identitas() { return (this.data.main.data.saksi.jenis_identitas || '') + ' ' + (this.data.main.data.saksi.nomor_identitas || '-') },
		disp_petugas1() { return this.data.main.data.petugas1.name || '-' },
		disp_petugas2() { 
			if (this.data.main.data.petugas2 != null) {
				return this.data.main.data.petugas2.name
			} else {
				return '-'
			}
		},
	},
}
</script>

<style>

</style>