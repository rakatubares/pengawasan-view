<template>
	<div class="wrapper">
		<CRow>
			<CCol class="mt-3 mx-2" md="12">
				<CRow>
					<CCol class="pb-1">
						<h4>{{ disp_no_dok_lengkap }}</h4>
					</CCol>
				</CRow>
				<CRow class="mb-3">
					<CCol class="pt-1 pb-3">
						<h5>{{ disp_tgl_dok }}</h5>
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
						<b>Nomor Pengaman</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_nomor_pengaman }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Tanggal Pengaman</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_tanggal_pengaman }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Jenis Pengaman</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_jenis_pengaman }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Jumlah Pengaman</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_jumlah_pengaman }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Tempat Pengaman</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_tempat_pengaman }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Dasar Pengamanan</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_dasar_pengamanan }}
					</CCol>
				</CRow>
				<MyDisplayEntitas
					title="Pemilik/Saksi"
					:data.sync="data_buka_pengaman.saksi"
				/>
				<MyDisplayPegawai
					title="Petugas 1"
					:data.sync="data_buka_pengaman.petugas1"
				/>
				<MyDisplayPegawai
					title="Petugas 2"
					:data.sync="data_buka_pengaman.petugas2"
				/>
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
	tanggal_dokumen: null,
	nomor_pengaman: null,
	tanggal_pengaman: null,
	jenis_pengaman: null,
	jumlah_pengaman: null,
	tempat_pengaman: null,
	dasar_pengamanan: null,
	sprint: {
		nomor_sprint: null,
		tanggal_sprint: null
	}
}

export default {
	name: 'DisplayBukaPengaman',
	components: {
		MyDisplayEntitas,
		MyDisplayPegawai
	},
	props: {
		doc_id: Number
	},
	data() {
		return {
			data_buka_pengaman: JSON.parse(JSON.stringify(default_data))
		}
	},
	computed: {
		disp_no_dok_lengkap() { return this.data_buka_pengaman.no_dok_lengkap || '-' },
		disp_tgl_dok() { return this.data_buka_pengaman.tanggal_dokumen || '-' },
		disp_sprint() { return ((this.data_buka_pengaman.sprint.nomor_sprint || '') + ' tanggal ' + (this.data_buka_pengaman.sprint.tanggal_sprint || '')) },
		disp_jenis_pengaman() { return this.data_buka_pengaman.jenis_pengaman || '-' },
		disp_jumlah_pengaman() { return ((this.data_buka_pengaman.jumlah_pengaman || '-') + ' ' + (this.data_buka_pengaman.satuan_pengaman || '')) },
		disp_nomor_pengaman() { return this.data_buka_pengaman.nomor_pengaman || '-' },
		disp_tanggal_pengaman() { return this.data_buka_pengaman.tanggal_pengaman || '-' },
		disp_tempat_pengaman() { return this.data_buka_pengaman.tempat_pengaman || '-' },
		disp_dasar_pengamanan() { return this.data_buka_pengaman.dasar_pengamanan || '-' },
	},
	methods: {
		async getData() {
			this.data_buka_pengaman = await api.getBasicDataById('bukapengaman', this.doc_id)
		}
	},
	async mounted() {
		await this.getData()
	}
}
</script>

<style>
</style>