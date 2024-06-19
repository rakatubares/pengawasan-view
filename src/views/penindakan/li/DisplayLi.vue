<template>
	<div class="wrapper">
		<CRow>
			<CCol class="mt-3 mx-2" md="12">
				<CRow>
					<CCol class="pb-1">
						<h4>{{ disp_no_li }}</h4>
					</CCol>
				</CRow>
				<CRow>
					<CCol class="pt-1 pb-3">
						<h5>{{ disp_tgl_li }}</h5>
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Sumber Informasi</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_sumber }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Isi Informasi</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_informasi }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Tindak Lanjut</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_tindak_lanjut }}
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
					title="Penerbit"
					:data.sync="document.petugas.penerbit"
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
	name: 'DisplayLi',
	components: {
		MyDisplayPejabat,
	},
	props: {
		doc_type: String,
		document: Object,
	},
	computed: {
		disp_no_li() { return this.document.no_dok_lengkap || '-' },
		disp_tgl_li() { return this.document.tanggal_dokumen || '-' },
		disp_sumber() { return (this.document.sumber || '-') },
		disp_informasi() { return (this.document.informasi || '-') },
		disp_tindak_lanjut() { return this.document.tindak_lanjut || '-' },
		disp_catatan() { return this.document.catatan || '-' },
	},
}
</script>

<style>
</style>