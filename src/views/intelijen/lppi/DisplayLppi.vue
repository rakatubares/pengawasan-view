<template>
	<div class="wrapper display-lppi">
		<CRow>
			<CCol class="mt-3 mx-2" md="12">
				<CRow>
					<CCol class="pb-1">
						<h4>{{ disp_no_lppi }}</h4>
					</CCol>
				</CRow>
				<CRow>
					<CCol class="pt-1 pb-3">
						<h5>{{ disp_tgl_lppi }}</h5>
					</CCol>
				</CRow>
				<div class="sep">
					<CRow class="mt-2">
						<CCol>
							<h4><b>Informasi Internal</b></h4>
						</CCol>
					</CRow>
					<CRow class="mb-1">
						<CCol md="3" class="py-1">
							<b>Media</b>
						</CCol>
						<CCol md="9" class="py-1">
							{{ disp_media_internal }}
						</CCol>
					</CRow>
					<CRow class="mb-1">
						<CCol md="3" class="py-1">
							<b>Tanggal Terima</b>
						</CCol>
						<CCol md="9" class="py-1">
							{{ disp_tgl_terima_internal }}
						</CCol>
					</CRow>
					<CRow class="mb-1">
						<CCol md="3" class="py-1">
							<b>Dokumen</b>
						</CCol>
						<CCol md="9" class="py-1">
							{{ disp_dokumen_internal }}
						</CCol>
					</CRow>
				</div>
				<div class="sep">
					<CRow class="mt-2">
						<CCol>
							<h4><b>Informasi Eksternal</b></h4>
						</CCol>
					</CRow>
					<CRow class="mb-1">
						<CCol md="3" class="py-1">
							<b>Media</b>
						</CCol>
						<CCol md="9" class="py-1">
							{{ disp_media_eksternal }}
						</CCol>
					</CRow>
					<CRow class="mb-1">
						<CCol md="3" class="py-1">
							<b>Tanggal Terima</b>
						</CCol>
						<CCol md="9" class="py-1">
							{{ disp_tgl_terima_eksternal }}
						</CCol>
					</CRow>
					<CRow class="mb-1">
						<CCol md="3" class="py-1">
							<b>Dokumen</b>
						</CCol>
						<CCol md="9" class="py-1">
							{{ disp_dokumen_eksternal }}
						</CCol>
					</CRow>
				</div>
				<div class="sep">
					<CRow class="mt-2">
						<CCol>
							<h4><b>Ikhtisar Informasi</b></h4>
						</CCol>
					</CRow>

					<!-- Tabel ikhtisar -->
					<CDataTable
						class="my-2 mr-3"
						:items="document.informasi"
						:fields="informasi_table_fields"
						:items-per-page="5"
						pagination
					/>

					<!-- Kesimpulan & catatan -->
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
							<b>Catatan</b>
						</CCol>
						<CCol md="9" class="py-1">
							{{ disp_catatan }}
						</CCol>
					</CRow>
				</div>
				<MyDisplayPegawai
					title="Penerima Informasi"
					:data.sync="document.petugas.penerima_informasi"
				/>
				<MyDisplayPegawai
					title="Penilai Informasi"
					:data.sync="document.petugas.penilai_informasi"
				/>
				<MyDisplayPegawai
					title="Tujuan Disposisi"
					:data.sync="document.petugas.penerima_disposisi"
				/>
				<CRow class="mb-1 mt-2">
					<CCol md="3" class="py-1">
						<b>Tanggal Disposisi</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_tanggal_disposisi }}
					</CCol>
				</CRow>
				<MyDisplayPejabat
					title="Pejabat"
					:data.sync="document.petugas.pejabat"
				/>
			</CCol>
		</CRow>
	</div>
</template>

<script>
import MyDisplayPegawai from '../../components/DisplayPegawai.vue'
import MyDisplayPejabat from '../../components/DisplayPejabat.vue'

export default {
	name: 'DisplayLppi',
	components: {
		MyDisplayPegawai,
		MyDisplayPejabat,
	},
	props: {
		doc_type: String,
		document: Object,
	},
	data() {
		return {
			informasi_table_fields: [
				{ key: 'informasi', label: 'Informasi' },
				{ key: 'kode_kepercayaan', label: 'Sumber' },
				{ key: 'kode_validitas', label: 'Validitas' },
			]
		}
	},
	computed: {
		disp_no_lppi() { return this.document.no_dok_lengkap || '-' },
		disp_tgl_lppi() { return this.document.tanggal_dokumen || '-' },
		disp_media_internal() { return (this.document.media_info_internal || '-') },
		disp_tgl_terima_internal() { return (this.document.tgl_terima_info_internal || '-') },
		disp_dokumen_internal() {
			let no_dok = this.document.no_dok_info_internal || '-'
			let tgl_dok = this.document.tgl_dok_info_internal != null
				? ' tanggal ' + this.document.tgl_dok_info_internal
				: ''
			return no_dok + tgl_dok 
		},
		disp_media_eksternal() { return (this.document.media_info_eksternal || '-') },
		disp_tgl_terima_eksternal() { return (this.document.tgl_terima_info_eksternal || '-') },
		disp_dokumen_eksternal() {
			let no_dok = this.document.no_dok_info_eksternal || '-'
			let tgl_dok = this.document.tgl_dok_info_eksternal != null
				? ' tanggal ' + this.document.tgl_dok_info_eksternal
				: ''
			return no_dok + tgl_dok 
		},
		disp_kesimpulan() { return (this.document.kesimpulan || '-') },
		disp_catatan() { return (this.document.catatan || '-') },
		disp_tanggal_disposisi() { return (this.document.tanggal_disposisi || '-') },
	},
}
</script>

<style>
</style>