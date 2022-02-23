<template>
	<div class="wrapper display-lp">
		<CRow>
			<CCol class="mt-3 mx-2" md="12">
				<CRow>
					<CCol class="pb-1">
						<h4>{{ disp_no_lp }}</h4>
					</CCol>
				</CRow>
				<CRow>
					<CCol class="pt-1 pb-3">
						<h5>{{ disp_tgl_lp }}</h5>
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
						<b>No LPHP</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_lphp }}
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
						<b>Jenis Pelanggaran</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_jenis }}
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
						<b>Modus</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_modus }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Locus</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_locus }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Tempus</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_tempus }}
					</CCol>
				</CRow>
				<MyDisplayEntitas
					title="Pemilik/Saksi"
					:data.sync="data_lp.saksi"
				/>
				<MyDisplayPejabat
					:data.sync="data_lp.pejabat"
				/>
			</CCol>
		</CRow>
	</div>
</template>

<script>
import api from '../../../router/api2.js'
import MyDisplayEntitas from '../../components/DisplayEntitas.vue'
import MyDisplayPejabat from '../../components/DisplayPejabat.vue'

const default_data = {
	no_dok_lengkap: null,
	tanggal_dokumen: null,
	no_sbp: null,
	tanggal_sbp: null,
	no_lphp: null,
	tanggal_lphp: null,
	uraian_penindakan: null,
	jenis_pelanggaran: null,
	pasal: null,
	modus: null,
	locus: null,
	tempus: null,
}

export default {
	name: 'DisplayLp',
	components: {
		MyDisplayEntitas,
		MyDisplayPejabat,
	},
	props: {
		doc_type: String,
		doc_id: Number
	},
	data() {
		return {
			data_lp: JSON.parse(JSON.stringify(default_data))
		}
	},
	computed: {
		disp_no_lp() { return this.data_lp.no_dok_lengkap || '-' },
		disp_tgl_lp() { return this.data_lp.tanggal_dokumen || '-' },
		disp_sbp() {
			let txt_no_sbp = this.data_lp.no_sbp || '-'
			let txt_tgl_sbp = ''

			if (this.data_lp.tanggal_sbp != null) {
				txt_tgl_sbp = ' tanggal ' + this.data_lp.tanggal_sbp
			} else {
				txt_tgl_sbp = ''
			}

			return txt_no_sbp + txt_tgl_sbp
		},
		disp_lphp() {
			let txt_no_lphp = this.data_lp.no_lphp || '-'
			let txt_tgl_lphp = ''

			if (this.data_lp.tanggal_lphp != null) {
				txt_tgl_lphp = ' tanggal ' + this.data_lp.tanggal_lphp
			} else {
				txt_tgl_lphp = ''
			}

			return txt_no_lphp + txt_tgl_lphp
		},
		disp_uraian() { return this.data_lp.uraian_penindakan || '-' },
		disp_jenis() { return this.data_lp.jenis_pelanggaran || '-' },
		disp_pasal() { return this.data_lp.pasal || '-' },
		disp_modus() { return this.data_lp.modus || '-' },
		disp_locus() { return this.data_lp.locus || '-' },
		disp_tempus() { return this.data_lp.tempus || '-' },
	},
	methods: {
		async getData() {
			let response = await api.getDisplayDataById(this.doc_type, this.doc_id)
			this.data_lp = response.data.data
		}
	},
	async mounted() {
		await this.getData()
	}
}
</script>

<style>
.display-lp .row+.row {
	margin-top:0;
}
</style>