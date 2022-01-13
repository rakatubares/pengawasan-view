<template>
	<div class="wrapper">
		<CRow>
			<CCol class="mt-3 mx-2" md="12">
				<CRow>
					<CCol class="pb-1">
						<h4>{{ disp_no_ba_pengaman }}</h4>
					</CCol>
				</CRow>
				<CRow class="mb-3">
					<CCol class="pt-1 pb-3">
						<h5>{{ disp_tgl_ba_pengaman }}</h5>
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Surat Perintah</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_sprint }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Jenis Tanda Pengaman</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_jenis_pengaman }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Jumlah Tanda Pengaman</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_jumlah_pengaman }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Nomor Tanda Pengaman</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_nomor_pengaman }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Tempat Tanda Pengaman</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_tempat_pengaman }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Lokasi Pengamanan</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_lokasi_pengamanan }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Alasan Pengamanan</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_alasan_pengamanan }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Keterangan</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_keterangan }}
					</CCol>
				</CRow>
				<MyDisplayEntitas
					title="Pemilik/Saksi"
					:data.sync="data_pengaman.penindakan.saksi"
				/>
				<MyDisplayPegawai
					title="Petugas 1"
					:data.sync="data_pengaman.penindakan.petugas1"
				/>
				<MyDisplayPegawai
					title="Petugas 2"
					:data.sync="data_pengaman.penindakan.petugas2"
				/>
				<!-- <CRow class="mb-1">
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
				</CRow> -->
			</CCol>
		</CRow>
	</div>
</template>

<script>
import api from '../../../router/api2.js'
import MyDisplayEntitas from '../../components/DisplayEntitas.vue'
import MyDisplayPegawai from '../../components/DisplayPegawai.vue'

const default_data = {
	no_dok_lengkap: null,
	jenis_pengaman: null,
	jumlah_pengaman: null,
	nomor_pengaman: null,
	tempat_pengaman: null,
	penindakan: {
		tanggal_penindakan: null,
		lokasi_penindakan: null,
		sprint: {
			nomor_sprint: null,
			tanggal_sprint: null
		}
	},
}

export default {
	name: 'DisplayPengaman',
	components: {
		MyDisplayEntitas,
		MyDisplayPegawai
	},
	props: {
		doc_id: Number
	},
	data() {
		return {
			data_pengaman: JSON.parse(JSON.stringify(default_data))
		}
	},
	computed: {
		disp_no_ba_pengaman() { return this.data_pengaman.no_dok_lengkap || '-' },
		disp_tgl_ba_pengaman() { return this.data_pengaman.penindakan.tanggal_penindakan || '-' },
		disp_sprint() { return ((this.data_pengaman.penindakan.sprint.nomor_sprint || '') + ' tanggal ' + (this.data_pengaman.penindakan.sprint.tanggal_sprint || '')) },
		disp_jenis_pengaman() { return this.data_pengaman.jenis_pengaman || '-' },
		disp_jumlah_pengaman() { return ((this.data_pengaman.jumlah_pengaman || '-') + ' ' + (this.data_pengaman.satuan_pengaman || '')) },
		disp_nomor_pengaman() { return this.data_pengaman.nomor_pengaman || '-'},
		disp_tempat_pengaman() { return this.data_pengaman.tempat_pengaman || '-' },
		disp_alasan_pengamanan() { return this.data_pengaman.alasan_pengamanan || '-' },
		disp_lokasi_pengamanan() { return this.data_pengaman.penindakan.lokasi_penindakan || '-' },
		disp_keterangan() { return this.data_pengaman.keterangan || '-' },
		// disp_nama_saksi() { return this.data_pengaman.penindakan.saksi.nama || '-' },
		// disp_alamat_saksi() { return this.data_pengaman.penindakan.saksi.alamat || '-' },
		// disp_pekerjaan_saksi() { return this.data_pengaman.penindakan.saksi.pekerjaan || '-' },
		// disp_identitas() { return (this.data_pengaman.penindakan.saksi.jenis_identitas || '') + ' ' + (this.data_pengaman.penindakan.saksi.nomor_identitas || '-') },
		// disp_petugas1() { return this.data_pengaman.penindakan.petugas1.name || '-' },
		// disp_petugas2() { 
		// 	if (this.data_pengaman.penindakan.petugas2 != null) {
		// 		return this.data_pengaman.penindakan.petugas2.name
		// 	} else {
		// 		return '-'
		// 	}
		// },
	},
	methods: {
		async getData() {
			this.data_pengaman = await api.getBasicDataById('pengaman', this.doc_id)
		}
	},
	async mounted() {
		await this.getData()
	}
}
</script>

<style>
</style>