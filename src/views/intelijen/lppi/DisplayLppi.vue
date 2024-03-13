<template>
	<div class="wrapper display-tolak1">
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
						:items="data_doc.informasi"
						:fields="informasi_table_fields"
						:items-per-page="5"
						pagination
					/>

					<!-- Keimpulan & catatan -->
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
					:data.sync="data_doc.petugas.penerima_informasi"
				/>
				<MyDisplayPegawai
					title="Penilai Informasi"
					:data.sync="data_doc.petugas.penilai_informasi"
				/>
				<MyDisplayPegawai
					title="Tujuan Disposisi"
					:data.sync="data_doc.petugas.penerima_disposisi"
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
					:data.sync="data_doc.petugas.pejabat"
				/>
			</CCol>
		</CRow>
	</div>
</template>

<script>
import api from '../../../router/api2.js'
import MyDisplayPegawai from '../../components/DisplayPegawai.vue'
import MyDisplayPejabat from '../../components/DisplayPejabat.vue'

const default_data = {
	no_dok_lengkap: null,
	tanggal_dokumen: null,
	media_info_internal: null,
	tanggal_sbp: null,
	media_info_internal:null,
	tgl_terima_info_internal: null,
	no_dok_info_internal: null,
	tgl_dok_info_internal: null,
	media_info_eksternal: null,
	tgl_terima_info_eksternal: null,
	no_dok_info_eksternal: null,
	tgl_dok_info_eksternal: null,
	kesimpulan: null,
	catatan: null,
	tanggal_disposisi: null,
	petugas: {},
}

export default {
	name: 'DisplayLppi',
	components: {
		MyDisplayPegawai,
		MyDisplayPejabat,
	},
	props: {
		doc_type: String,
		doc_id: Number
	},
	data() {
		return {
			data_doc: JSON.parse(JSON.stringify(default_data)),
			informasi_table_fields: [
				{ key: 'informasi', label: 'Informasi' },
				{ key: 'kode_kepercayaan', label: 'Sumber' },
				{ key: 'kode_validitas', label: 'Validitas' },
			]
		}
	},
	computed: {
		disp_no_lppi() { return this.data_doc.no_dok_lengkap || '-' },
		disp_tgl_lppi() { return this.data_doc.tanggal_dokumen || '-' },
		disp_media_internal() { return (this.data_doc.media_info_internal || '-') },
		disp_tgl_terima_internal() { return (this.data_doc.tgl_terima_info_internal || '-') },
		disp_dokumen_internal() {
			let no_dok = this.data_doc.no_dok_info_internal || '-'
			let tgl_dok = this.data_doc.tgl_dok_info_internal != null
				? ' tanggal ' + this.data_doc.tgl_dok_info_internal
				: ''
			return no_dok + tgl_dok 
		},
		disp_media_eksternal() { return (this.data_doc.media_info_eksternal || '-') },
		disp_tgl_terima_eksternal() { return (this.data_doc.tgl_terima_info_eksternal || '-') },
		disp_dokumen_eksternal() {
			let no_dok = this.data_doc.no_dok_info_eksternal || '-'
			let tgl_dok = this.data_doc.tgl_dok_info_eksternal != null
				? ' tanggal ' + this.data_doc.tgl_dok_info_eksternal
				: ''
			return no_dok + tgl_dok 
		},
		disp_kesimpulan() { return (this.data_doc.kesimpulan || '-') },
		disp_catatan() { return (this.data_doc.catatan || '-') },
		disp_tanggal_disposisi() { return (this.data_doc.tanggal_disposisi || '-') },
	},
	methods: {
		async getData() {
			let response = await api.getDocumentById(this.doc_type, this.doc_id)
			this.data_doc = response.data
		}
	},
	async mounted() {
		await this.getData()
	}
}
</script>

<style>
</style>