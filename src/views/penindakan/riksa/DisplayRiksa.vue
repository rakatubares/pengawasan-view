<template>
	<div class="wrapper">
		<CRow>
			<CCol class="mt-3 mx-2" md="12">
				<CRow>
					<CCol class="pb-1">
						<h4>{{ disp_no_ba_riksa }}</h4>
					</CCol>
				</CRow>
				<CRow class="mb-3">
					<CCol class="pt-1 pb-3">
						<h5>{{ disp_tgl_ba_riksa }}</h5>
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
				<MyDisplayEntitas
					title="Pemilik/Saksi"
					:data.sync="data_riksa.penindakan.saksi"
				/>
				<MyDisplayPegawai
					title="Petugas 1"
					:data.sync="data_riksa.penindakan.petugas1"
				/>
				<MyDisplayPegawai
					title="Petugas 2"
					:data.sync="data_riksa.penindakan.petugas2"
				/>
				<!-- <CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Nama Pemilik/Saksi</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_nama_saksi }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Alamat</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_alamat_saksi }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Pekerjaan</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_pekerjaan_saksi }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Identitas</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_identitas }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Petugas 1</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_petugas1 }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Petugas 2</b>
					</CCol>
					<CCol md="9" class="py-1">
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
	penindakan: {
		tanggal_penindakan: null,
		lokasi_penindakan: null,
		sprint: {
			nomor_sprint: null,
			tanggal_sprint: null
		}
	}
}

export default {
	name: 'DisplayRiksa',
	components: {
		MyDisplayEntitas,
		MyDisplayPegawai
	},
	props: {
		doc_id: Number
	},
	data() {
		return {
			data_riksa: JSON.parse(JSON.stringify(default_data))
		}
	},
	computed: {
		disp_no_ba_riksa() { return this.data_riksa.no_dok_lengkap || '-' },
		disp_tgl_ba_riksa() { return this.data_riksa.penindakan.tanggal_penindakan || '-' },
		disp_sprint() { return ((this.data_riksa.penindakan.sprint.nomor_sprint || '') + ' tanggal ' + (this.data_riksa.penindakan.sprint.tanggal_sprint || '')) },
		disp_lokasi() { return this.data_riksa.penindakan.lokasi_penindakan || '-' },
		// disp_nama_saksi() { return this.data.penindakan.saksi.nama || '-' },
		// disp_alamat_saksi() { return this.data.penindakan.saksi.alamat || '-' },
		// disp_pekerjaan_saksi() { return this.data.penindakan.saksi.pekerjaan || '-' },
		// disp_identitas() { return (this.data.penindakan.saksi.jenis_identitas || '') + ' ' + (this.data.penindakan.saksi.nomor_identitas || '-') },
		// disp_petugas1() { return this.data.penindakan.petugas1.name || '-' },
		// disp_petugas2() { 
		// 	if (this.data.penindakan.petugas2 != null) {
		// 		return this.data.penindakan.petugas2.name
		// 	} else {
		// 		return '-'
		// 	}
		// },
	},
	methods: {
		async getData() {
			this.data_riksa = await api.getBasicDataById('riksa', this.doc_id)
		}
	},
	async mounted() {
		await this.getData()
	}
}
</script>

<style>
</style>