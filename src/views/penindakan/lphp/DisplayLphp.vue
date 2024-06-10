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
						<b>No {{ tipe_surat_lptp }}</b>
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
					:data.sync="document.petugas.penyusun"
				/>
				<MyDisplayPejabat
					title="Atasan"
					:data.sync="document.petugas.atasan"
				/>
			</CCol>
		</CRow>
	</div>
</template>

<script>
import MyDisplayPejabat from '../../components/DisplayPejabat.vue'

export default {
	name: 'DisplayLphp',
	components: {
		MyDisplayPejabat,
	},
	props: {
		doc_type: String,
		tipe_surat_lptp: String,
		document: Object,
	},
	computed: {
		disp_no_lphp() { return this.document.no_dok_lengkap || '-' },
		disp_tgl_lphp() { return this.document.tanggal_dokumen || '-' },
		disp_lptp() {
			let txt_no_lptp = this.document.nomor_lptp || '-'
			let txt_tgl_lptp = ''
			if (this.document.tanggal_lptp != null) {
				txt_tgl_lptp = ' tanggal ' + this.document.tanggal_lptp
			} else {
				txt_tgl_lptp = ''
			}
			return txt_no_lptp + txt_tgl_lptp
		},
		disp_uraian() { return this.document.penindakan.uraian_penindakan || '-' },
		disp_analisa() { return this.document.analisa || '-' },
		disp_catatan() { return this.document.catatan || '-' }
	},
}
</script>

<style>

</style>