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
					:data.sync="data_doc.penerbit"
				/>
				<MyDisplayPejabat
					title="Atasan"
					:data.sync="data_doc.atasan"
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
	sumber: null,
	informasi: null,
	tindak_lanjut: null,
	catatan: null,
}

export default {
	name: 'DisplayLi',
	components: {
		MyDisplayPejabat,
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
		disp_no_li() { return this.data_doc.no_dok_lengkap || '-' },
		disp_tgl_li() { return this.data_doc.tanggal_dokumen || '-' },
		disp_sumber() { return (this.data_doc.sumber || '-') },
		disp_informasi() { return (this.data_doc.informasi || '-') },
		disp_tindak_lanjut() { return this.data_doc.tindak_lanjut || '-' },
		disp_catatan() { return this.data_doc.catatan || '-' },
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