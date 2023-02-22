<template>
	<div class="wrapper">
		<CRow>
			<CCol class="mt-3 mx-2" md="12">
				<CRow>
					<CCol class="pb-1">
						<h4>{{ disp_no_split }}</h4>
					</CCol>
				</CRow>
				<CRow>
					<CCol class="pt-1 pb-3">
						<h5>{{ disp_tgl_split }}</h5>
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
						<b>LPF</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_lpf }}
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
						<b>Dugaan Pelanggaran</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_dugaan_pelanggaran }}
					</CCol>
				</CRow>
				<MyDisplayEntitas
					title="Pelaku"
					:data.sync="data_split.penyidikan.pelaku"
				/>
				<MyDisplayPegawai
					v-for="(petugas, index) in data_split.petugas"
					:title="`Petugas ` + (index+1)"
					:data.sync="petugas"
				/>
				<MyDisplayPejabat
					title="Pemberi Perintah"
					:data.sync="data_split.pemberi_perintah"
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
		lpf: {
			no_dok_lengkap: null,
			tanggal_dokumen: null,
		},
	},
	penyidikan: {
		jenis_penindakan: null,
	}
}

export default {
	name: 'DisplaySplit',
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
			data_split: JSON.parse(JSON.stringify(default_data))
		}
	},
	computed: {
		disp_no_split() { return this.data_split.no_dok_lengkap || '-' },
		disp_tgl_split() { return this.data_split.tanggal_dokumen || '-' },
		disp_lp() { return `${this.data_split.dokumen.lp.no_dok_lengkap} tanggal ${this.data_split.dokumen.lp.tanggal_dokumen}` },
		disp_lpf() { return `${this.data_split.dokumen.lpf.no_dok_lengkap} tanggal ${this.data_split.dokumen.lpf.tanggal_dokumen}` },
		disp_jenis_pelanggaran() { return this.data_split.penyidikan.jenis_pelanggaran || '-' },
		disp_dugaan_pelanggaran() { return this.data_split.dugaan_pelanggaran || '-' },
	},
	methods: {
		async getData() {
			let response = await api.getDisplayDataById(this.doc_type, this.doc_id)
			this.data_split = response.data.data
		}
	},
	async mounted() {
		await this.getData()
	},
}
</script>

<style>

</style>