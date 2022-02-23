<template>
	<div class="wrapper display-lphp">
		<CRow>
			<CCol class="mt-3 mx-2" md="12">
				<CRow>
					<CCol class="pb-1">
						<h4>{{ disp_no_lphp }}</h4>
					</CCol>
				</CRow>
				<CRow>
					<CCol class="pt-1 pb-3">
						<h5>{{ disp_tgl_lphp }}</h5>
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>No SBP</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_sbp }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>No LPTP</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_lptp }}
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
						<b>Analisa</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_analisa }}
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
				<MyDisplayPejabat
					title="Penyusun"
					:data.sync="data_lphp.penyusun"
				/>
				<MyDisplayPejabat
					title="Atasan"
					:data.sync="data_lphp.atasan"
				/>
			</CCol>
		</CRow>
	</div>
</template>

<script>
import api from '../../../router/api2.js'
import MyDisplayPejabat from '../../components/DisplayPejabat.vue'

const default_data = {
	no_dok_lengkap: null,
	tanggal_dokumen: null,
	no_sbp: null,
	tanggal_sbp: null,
	analisa: null,
	catatan: null,
}

export default {
	name: 'DisplayLphp',
	components: {
		MyDisplayPejabat
	},
	props: {
		doc_type: String,
		doc_id: Number
	},
	data() {
		return {
			data_lphp: JSON.parse(JSON.stringify(default_data))
		}
	},
	computed: {
		disp_no_lphp() { return this.data_lphp.no_dok_lengkap || '-' },
		disp_tgl_lphp() { return this.data_lphp.tanggal_dokumen || '-' },
		disp_sbp() {
			let txt_no_sbp = this.data_lphp.no_sbp || '-'
			let txt_tgl_sbp = ''
			if (this.data_lphp.tanggal_sbp != null) {
				txt_tgl_sbp = ' tanggal ' + this.data_lphp.tanggal_sbp
			} else {
				txt_tgl_sbp = ''
			}
			return txt_no_sbp + txt_tgl_sbp
		},
		disp_lptp() {
			let txt_no_lptp = this.data_lphp.no_lptp || '-'
			let txt_tgl_lptp = ''
			if (this.data_lphp.tanggal_lptp != null) {
				txt_tgl_lptp = ' tanggal ' + this.data_lphp.tanggal_lptp
			} else {
				txt_tgl_lptp = ''
			}
			return txt_no_lptp + txt_tgl_lptp
		},
		disp_uraian() { return this.data_lphp.uraian_penindakan || '-' },
		disp_analisa() { return this.data_lphp.analisa || '-' },
		disp_catatan() { return this.data_lphp.catatan || '-' }
	},
	methods: {
		async getData() {
			let response = await api.getDisplayDataById(this.doc_type, this.doc_id)
			this.data_lphp = response.data.data
		}
	},
	async mounted() {
		await this.getData()
	}
}
</script>

<style>
.display-lphp .row+.row {
	margin-top:0;
}
</style>