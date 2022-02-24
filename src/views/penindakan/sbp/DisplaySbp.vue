<template>
	<div class="wrapper">
		<CRow>
			<CCol class="mt-3 mx-2" md="12">
				<CRow>
					<CCol class="pb-1">
						<h4>{{ disp_no_sbp }}</h4>
					</CCol>
				</CRow>
				<CRow>
					<CCol class="pt-1 pb-3">
						<h5>{{ disp_tgl_sbp }}</h5>
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
						<b>LPTP</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_lptp }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Lokasi Penindakan</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_lokasi }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Uraian Penindakan</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_uraian }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Alasan Penindakan</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_alasan }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Jenis Pelanggaran</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_pelanggaran }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Waktu Mulai Penindakan</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_waktu_mulai }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Waktu Selesai Penindakan</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_waktu_selesai }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Hal Terjadi</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_hal_terjadi }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Catatan LPTP</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_catatan }}
					</CCol>
				</CRow>
				<MyDisplayEntitas
					title="Pemilik/Saksi"
					:data.sync="data_sbp.penindakan.saksi"
				/>
				<MyDisplayPegawai
					title="Pejabat 1"
					:data.sync="data_sbp.penindakan.petugas1"
				/>
				<MyDisplayPegawai
					title="Pejabat 2"
					:data.sync="data_sbp.penindakan.petugas2"
				/>
				<MyDisplayPejabat
					v-if="doc_type == 'sbp'"
					title="Atasan"
					:data.sync="data_sbp.lptp.atasan"
				/>
			</CCol>
		</CRow>
	</div>
</template>

<script>
import api from '../../../router/api2.js'
import MyDisplayEntitas from '../../components/DisplayEntitas.vue'
import MyDisplayPegawai from '../../components/DisplayPegawai.vue'
import MyDisplayPejabat from '../../components/DisplayPejabat.vue'

const default_data = {
	no_dok_lengkap: null,
	uraian_penindakan: null,
	alasan_penindakan: null,
	jenis_pelanggaran: null,
	wkt_mulai_penindakan: null,
	wkt_selesai_penindakan: null,
	hal_terjadi: null,
	penindakan: {
		tanggal_penindakan: null,
		lokasi_penindakan: null,
		sprint: {
			nomor_sprint: null,
			tanggal_sprint: null
		}
	},
	lptp: {
		no_dok_lengkap: null,
		catatan: null,
	}
}

export default {
	name: 'DisplaySbp',
	components: {
		MyDisplayEntitas,
		MyDisplayPegawai,
		MyDisplayPejabat,
	},
	props: {
		doc_type: String,
		doc_id: Number
	},
	data() {
		return {
			data_sbp: JSON.parse(JSON.stringify(default_data))
		}
	},
	computed: {
		disp_no_sbp() { return this.data_sbp.no_dok_lengkap || '-' },
		disp_tgl_sbp() { return this.data_sbp.penindakan.tanggal_penindakan || '-' },
		disp_sprint() { return ((this.data_sbp.penindakan.sprint.nomor_sprint || '') + ' tanggal ' + (this.data_sbp.penindakan.sprint.tanggal_sprint || '')) },
		disp_lptp() { return this.data_sbp.lptp.no_dok_lengkap || '-' },
		disp_lokasi() { return this.data_sbp.penindakan.lokasi_penindakan || '-' },
		disp_uraian() { return this.data_sbp.uraian_penindakan || '-' },
		disp_alasan() { return this.data_sbp.alasan_penindakan || '-' },
		disp_pelanggaran() { return this.data_sbp.jenis_pelanggaran || '-' },
		disp_waktu_mulai() { return this.data_sbp.wkt_mulai_penindakan || '-' },
		disp_waktu_selesai() { return this.data_sbp.wkt_selesai_penindakan || '-' },
		disp_hal_terjadi() { return this.data_sbp.hal_terjadi || '-' },
		disp_catatan() { return this.data_sbp.lptp.catatan || '-' }
	},
	methods: {
		async getData() {
			let response = await api.getDisplayDataById(this.doc_type, this.doc_id)
			this.data_sbp = response.data.data
		}
	},
	async mounted() {
		await this.getData()
	}
}
</script>

<style>

</style>