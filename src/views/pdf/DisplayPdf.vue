<template>
	<div class="wrapper">
		<CRow v-if="show_button">
			<CCol>
				<CButton 
					v-for="pdf in list_pdf"
					:key="pdf.doc_type"
					class="mt-3 mx-1"
					shape="pill"
					variant="outline"
					color="info"
					@click="changePdf(pdf.doc_type, pdf.doc_id)"
					:pressed="active_pdf == pdf.doc_type"
				>
					{{ pdf.doc_type }}
				</CButton>
			</CCol>
		</CRow>
		<CRow class="mb-2">
			<CCol col="12">
				<object
					v-if="show_pdf"
					:data="src_pdf" 
					width="100%" 
					height="600px"
				></object>
			</CCol>
		</CRow>
		<CRow
			v-if="show_publish_button"
		>
			<CCol col="12">
				<CButton
					color="success"
					shape="pill"
					@click="publishDoc"
				>
					Terbitkan
				</CButton>
			</CCol>
		</CRow>

		<!-- Alert -->
		<MyAlert ref="alert"></MyAlert>
	</div>
</template>

<script>
import api from '../../router/api2.js'
import PdfLkai from './PdfLkai.js'
import PdfLppi from './PdfLppi.js'
import PdfNhi from './PdfNhi.js'
import PdfNhiN from './pdfNhiN.js'
import PdfNi from './PdfNi.js'
import MyAlert from '../components/AlertSubmit.vue'

export default {
	name: "DisplayPdf",
	components: {
		MyAlert
	},
	props: {
		state: String,
		doc_type: String,
		doc_id: Number,
		chain_id: Number,
		show_button: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			data: null,
			show_pdf: false,
			src_pdf: null,
			is_publishable: false,
			status_pdf: null,
			list_pdf: [{
				'doc_type': this.doc_type,
				'doc_id': this.doc_id,
			}],
			active_pdf: this.doc_type
		}
	},
	computed: {
		show_publish_button() {
			let show = false
			if (this.is_publishable) {
				if (this.status_pdf == 'draft') {
					show = true
				}	
			}

			return show
		}
	},
	methods: {
		async listPdf() {
			let response = await api.getDocumentsChain(this.doc_type, this.doc_id)
			this.list_pdf = response.data
		},
		async getBarang(doc_type, doc_id) {
			return await api.getBarang(doc_type, doc_id)
		},
		async getPdf(doc_type, doc_id) {
			let pdf = null
			let response = await api.getDocumentById(doc_type, doc_id)
			let data_pdf = response.data

			switch (doc_type) {
				case 'lkai':
					pdf = new PdfLkai(pdfData)
					break;

				case 'lkain':
					pdf = new PdfLkai(
						pdfData,
						this.active_pdf,
						'LEMBAR KERJA ANALISIS INTELIJEN NPP (LKAI-N)',
						'lppin',
						'LPPI-N',
						{start: 60, end: 150}
					)
					break;

				case 'lppi':
					pdf = new PdfLppi(pdfData)
					break;

				case 'lppin':
					pdf = new PdfLppi(
						pdfData,
						this.active_pdf,
						'LEMBAR PENGUMPULAN DAN PENILAIAN INFORMASI NPP',
						{start: 53, end: 157}
					)
					break;

				case 'nhi':
					pdf = new PdfNhi(pdfData)
					break;

				case 'nhin':
					pdf = new PdfNhiN(pdfData)
					break;

				case 'ni':
					pdf = new PdfNi(pdfData)
					break;

				case 'nin':
					pdf = new PdfNi(
						pdfData,
						this.active_pdf,
						'NOTA INFORMASI NPP',
						'LKAI-N',
						{start: 85, end: 125}
					)
					break;
			
				default:
					break;
			}

			this.src_pdf = pdf.generatePdf()
			this.show_pdf = true
			this.status_pdf = data_pdf.kode_status
			if (doc_type == this.doc_type) {
				if (this.status_pdf == 'draft') {
					this.is_publishable = true
				} else {
					this.is_publishable = false
				}
			}
		},
		changePdf(doc_type, doc_id) {
			this.active_pdf = doc_type
			this.show_pdf = false
			this.getPdf(doc_type, doc_id)
			this.show_pdf = true
		},
		async publishDoc() {
			await api.publishDoc(this.doc_type, this.doc_id)
			await this.getPdf(this.doc_type, this.doc_id)
			this.active_pdf = this.doc_type
			this.$emit('update:state', 'show')
		}
	},
	mounted() {
		if (this.show_button == true) {
			this.listPdf()	
		}
		this.getPdf(this.doc_type, this.doc_id)
	}
}
</script>

<style>

</style>