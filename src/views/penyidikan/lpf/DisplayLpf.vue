<template>
	<div class="wrapper">
		<CRow>
			<CCol class="mt-3 mx-2" md="12">
				<CRow>
					<CCol class="pb-1">
						<h4>{{ disp_no_lpf }}</h4>
					</CCol>
				</CRow>
				<CRow>
					<CCol class="pt-1 pb-3">
						<h5>{{ disp_tgl_lpf }}</h5>
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
						<b>Pasal</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_pasal }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Tempat</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_tempat }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Waktu</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_tanggal_waktu }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Status Penangkapan</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_status_penangkapan }}
					</CCol>
				</CRow>
				<MyDisplayEntitas
					title="Pelaku"
					:data.sync="data_lpf.penyidikan.pelaku"
				/>
				<CRow class="mt-2 mb-1 sep">
					<CCol md="3" class="py-1">
						<b>Surat Perintah</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_nomor_sprint + ' / ' + disp_tanggal_sprint }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>SBP</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_nomor_sbp + ' / ' + disp_tanggal_sbp }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>LP</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_nomor_lp + ' / ' + disp_tanggal_lp }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>BAP Saksi</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_saksi + ' / ' + disp_tanggal_bap_saksi }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>BAP Tersangka</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_tersangka + ' / ' + disp_tanggal_bap_tersangka }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Resume Perkara</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_resume_perkara + ' / ' + disp_tanggal_resume_perkara }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Dokumen Lain</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_dokumen_lain + ' / ' + disp_tanggal_dokumen_lain }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Kesimpulan</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_kesimpulan }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Usulan</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_usulan }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Catatan</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_catatan }}
					</CCol>
				</CRow>
				<MyDisplayPegawai
					title="Peneliti"
					:data.sync="data_lpf.peneliti"
				/>
				<MyDisplayPejabat
					title="Atasan 1"
					:data.sync="data_lpf.atasan1"
				/>
				<MyDisplayPejabat
					title="Atasan 2"
					:data.sync="data_lpf.atasan2"
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
	tanggal_dokumen: null,
	penyidikan: {
		jenis_pelanggaran: null,
		pasal: null,
		tempat_pelanggaran: null,
		waktu_pelanggaran: null,
		status_penangkapan: null,
	},
	penindakan: {
		sprint: {
			nomor_sprint: null,
			tanggal_sprint: null,
		},
	},
	dokumen: {
		sbp: {
			no_dok_lengkap: null,
			tanggal_dokumen: null,
		},
		lp: {
			no_dok_lengkap: null,
			tanggal_dokumen: null,
		},
	},
	saksi: {nama: null},
	tersangka: {nama: null},
}

export default {
	name: 'DisplayLpf',
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
			data_lpf: JSON.parse(JSON.stringify(default_data))
		}
	},
	computed: {
		disp_no_lpf() { return this.data_lpf.no_dok_lengkap || '-' },
		disp_tgl_lpf() { return this.data_lpf.tanggal_dokumen || '-' },
		disp_pelanggaran() { return this.data_lpf.penyidikan.jenis_pelanggaran || '-' },
		disp_pasal() { return this.data_lpf.penyidikan.pasal || '-' },
		disp_tempat() { return this.data_lpf.penyidikan.tempat_pelanggaran || '-' },
		disp_tanggal_waktu() { return this.data_lpf.penyidikan.waktu_pelanggaran || '-' },
		disp_status_penangkapan() { return this.data_lpf.penyidikan.status_penangkapan || '-' },
		disp_nomor_sprint() { return this.data_lpf.penindakan.sprint.nomor_sprint || '-' },
		disp_tanggal_sprint() { return this.data_lpf.penindakan.sprint.tanggal_sprint || '-' },
		disp_nomor_sbp() { return this.data_lpf.dokumen.sbp.no_dok_lengkap || '-' },
		disp_tanggal_sbp() { return this.data_lpf.dokumen.sbp.tanggal_dokumen || '-' },
		disp_nomor_lp() { return this.data_lpf.dokumen.lp.no_dok_lengkap || '-' },
		disp_tanggal_lp() { return this.data_lpf.dokumen.lp.tanggal_dokumen || '-' },
		disp_saksi() { return this.data_lpf.saksi.nama || '-' },
		disp_tanggal_bap_saksi() { return this.data_lpf.tanggal_bap_saksi || '-' },
		disp_tersangka() { return this.data_lpf.tersangka.nama || '-' },
		disp_tanggal_bap_tersangka() { return this.data_lpf.tanggal_bap_tersangka || '-' },
		disp_resume_perkara() { return this.data_lpf.resume_perkara || '-' },
		disp_tanggal_resume_perkara() { return this.data_lpf.tanggal_resume_perkara || '-' },
		disp_dokumen_lain() { 
			var dokumen_lain = this.data_lpf.jenis_dokumen_lain + this.data_lpf.nomor_dokumen_lain
			return dokumen_lain
		},
		disp_tanggal_dokumen_lain() { return this.data_lpf.tanggal_dokumen_lain || '-' },
		disp_kesimpulan() { return this.data_lpf.kesimpulan || '-' },
		disp_usulan() { return this.data_lpf.usulan || '-' },
		disp_catatan() { return this.data_lpf.catatan || '-' },
	},
	methods: {
		async getData() {
			let response = await api.getDisplayDataById(this.doc_type, this.doc_id)
			this.data_lpf = response.data.data
		}
	},
	async mounted() {
		await this.getData()
	},
}
</script>

<style>

</style>