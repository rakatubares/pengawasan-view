<template>
	<div class="wrapper display-lpn">
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
						<b>Surat Perintah</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_sprint }}
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
						<b>Hal yang Terjadi</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_hal_terjadi }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Analisa hasil penindakan</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_analisa }}
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
				<MyDisplayEntitas
					title="Pemilik/Saksi"
					:data.sync="data_lp.saksi"
				/>
				<MyDisplayPegawai
					title="Petugas"
					:data.sync="data_lp.petugas"
				/>
				<MyDisplayPejabat
					:data.sync="data_lp.penyusun"
				/>
				<MyDisplayPejabat
					:data.sync="data_lp.penerbit"
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
	no_sbp: null,
	tanggal_sbp: null,
	locus: null,
	tempus: null,
	uraian_penindakan: null,
	hal_terjadi: null,
	analisa: null,
	kesimpulan: null,
	sprint: {
		nomor_sprint: null,
		tanggal_sprint: null
	}
}

export default {
	name: 'DisplayLpN',
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
			data_lp: JSON.parse(JSON.stringify(default_data))
		}
	},
	computed: {
		disp_no_lp() { return this.data_lp.no_dok_lengkap || '-' },
		disp_tgl_lp() { return this.data_lp.tanggal_dokumen || '-' },
		disp_sprint() { return (
			(this.data_lp.sprint.nomor_sprint || '') 
			+ ' tanggal ' + 
			(this.data_lp.sprint.tanggal_sprint || '')
		) },
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
		disp_locus() { return this.data_lp.locus || '-' },
		disp_tempus() { return this.data_lp.tempus || '-' },
		disp_uraian() { return this.data_lp.uraian_penindakan || '-' },
		disp_hal_terjadi() { return this.data_lp.hal_terjadi || '-' },
		disp_analisa() { return this.data_lp.analisa || '-' },
		disp_kesimpulan() { return this.data_lp.kesimpulan || '-' },
		
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
.display-lpn .row+.row {
	margin-top:0;
}
</style>