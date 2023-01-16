<template>
	<div class="wrapper">
		<CRow>
			<CCol class="mt-3 mx-2" md="12">
				<CRow>
					<CCol class="pb-1">
						<h4>{{ disp_no_lpp }}</h4>
					</CCol>
				</CRow>
				<CRow>
					<CCol class="pt-1 pb-3">
						<h5>{{ disp_tgl_lpp }}</h5>
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>LP</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_lp }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>SBP</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_sbp }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Asal Perkara</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_asal_perkara }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Jenis Penindakan</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_jenis_penindakan }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Jenis Perkara</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_jenis_perkara }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Status Pelanggaran</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_status_pelanggaran }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Jenis Pelanggaran</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_jenis_pelanggaran }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Modus Operandi</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_modus_operandi }}
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
						<b>Tanggal dan Waktu</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_tanggal_waktu }}
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
				<MyDisplayEntitas
					title="Pelaku"
					:data.sync="data_lpp.penyidikan.pelaku"
				/>
				<MyDisplayPegawai
					title="Petugas"
					:data.sync="data_lpp.petugas"
				/>
				<MyDisplayPejabat
					title="Atasan 1"
					:data.sync="data_lpp.atasan1"
				/>
				<MyDisplayPejabat
					title="Atasan 2"
					:data.sync="data_lpp.atasan2"
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
	dokumen: {
		lp: {
			no_dok_lengkap: null,
			tanggal_dokumen: null,
		},
		sbp: {
			no_dok_lengkap: null,
			tanggal_dokumen: null,
		},
	},
	penyidikan: {
		jenis_penindakan: null,
		modus: null,
		tempat_pelanggaran: null,
		waktu_pelanggaran: null,
		pelaku: { jenis_kelamin: { uraian: null }},
	},
}

export default {
	name: 'DisplayLpp',
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
			data_lpp: JSON.parse(JSON.stringify(default_data))
		}
	},
	computed: {
		disp_no_lpp() { return this.data_lpp.no_dok_lengkap || '-' },
		disp_tgl_lpp() { return this.data_lpp.tanggal_dokumen || '-' },
		disp_lp() { return `${this.data_lpp.dokumen.lp.no_dok_lengkap} tanggal ${this.data_lpp.dokumen.lp.tanggal_dokumen}`},
		disp_sbp() { return `${this.data_lpp.dokumen.sbp.no_dok_lengkap} tanggal ${this.data_lpp.dokumen.sbp.tanggal_dokumen}`},
		disp_asal_perkara() { return this.data_lpp.asal_perkara || '-' },
		disp_jenis_penindakan() { return this.data_lpp.jenis_penindakan || '-' },
		disp_jenis_perkara() { return this.data_lpp.jenis_perkara || '-' },
		disp_status_pelanggaran() { return this.data_lpp.penyidikan.status_penangkapan || '-' },
		disp_jenis_pelanggaran() { return this.data_lpp.penyidikan.jenis_pelanggaran || '-' },
		disp_modus_operandi() { return this.data_lpp.penyidikan.modus || '-' },
		disp_tempat() { return this.data_lpp.penyidikan.tempat_pelanggaran || '-' },
		disp_tanggal_waktu() { return this.data_lpp.penyidikan.waktu_pelanggaran || '-' },
		disp_catatan() { return this.data_lpp.catatan || '-' },
	},
	methods: {
		async getData() {
			let response = await api.getDisplayDataById(this.doc_type, this.doc_id)
			this.data_lpp = response.data.data
		}
	},
	async mounted() {
		await this.getData()
	},
}
</script>

<style>

</style>