<template>
	<div class="wrapper display-tolak2">
		<CRow>
			<CCol class="mt-3 mx-2" md="12">
				<CRow>
					<CCol class="pb-1">
						<h4>{{ disp_no_ba_tolak2 }}</h4>
					</CCol>
				</CRow>
				<CRow>
					<CCol class="pt-1 pb-3">
						<h5>{{ disp_tgl_ba_tolak2 }}</h5>
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
						<b>BA Penolakan SBP</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_ba_tolak1 }}
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
						<b>Alasan Penolakan</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_alasan }}
					</CCol>
				</CRow>
				<MyDisplayEntitas
					title="Pemilik/Kuasa"
					:data.sync="data_doc.pemilik"
				/>
				<MyDisplayEntitas
					title="Saksi"
					:data.sync="data_doc.saksi"
				/>
				<MyDisplayPegawai
					title="Petugas 1"
					:data.sync="data_doc.petugas1"
				/>
				<MyDisplayPegawai
					title="Petugas 2"
					:data.sync="data_doc.petugas2"
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
	nomor_sbp: null,
	tanggal_sbp: null,
	alasan: null,
	sprint: {
		nomor_sprint: null,
		tanggal_sprint: null
	}
}

export default {
	name: 'DisplayTolak2',
	components: {
		MyDisplayEntitas,
		MyDisplayPegawai,
	},
	props: {
		doc_type: String,
		doc_id: Number
	},
	data() {
		return {
			data_doc: JSON.parse(JSON.stringify(default_data))
		}
	},
	computed: {
		disp_no_ba_tolak2() { return this.data_doc.no_dok_lengkap || '-' },
		disp_tgl_ba_tolak2() { return this.data_doc.tanggal_dokumen || '-' },
		disp_sprint() { return ((this.data_doc.sprint.nomor_sprint || '') + ' tanggal ' + (this.data_doc.sprint.tanggal_sprint || '')) },
		disp_ba_tolak1() { return ((this.data_doc.nomor_tolak1 || '-') + ' tanggal ' + (this.data_doc.tanggal_tolak1 || '')) },
		disp_sbp() { return ((this.data_doc.nomor_sbp || '') + ' tanggal ' + (this.data_doc.tanggal_sbp || '')) },
		disp_alasan() { return this.data_doc.alasan || '-' },
	},
	methods: {
		async getData() {
			let response = await api.getDisplayDataById(this.doc_type, this.doc_id)
			this.data_doc = response.data.data
		}
	},
	async mounted() {
		await this.getData()
	}
}
</script>

<style>

</style>