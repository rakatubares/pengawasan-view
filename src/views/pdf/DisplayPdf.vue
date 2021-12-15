<template>
	<div class="wrapper">
		<CRow>
			<CCol>
				<CButton 
					v-for="doc_type in list_pdf"
					:key="doc_type"
					class="mt-3 mx-1"
					shape="pill"
					variant="outline"
					color="info"
					@click="changePdf(doc_type)"
					:pressed="active_pdf == doc_type"
				>
					{{ doc_type }}
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
			v-if="[100, 101].includes(status_pdf)"
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
import MyAlert from '../components/AlertSubmit.vue'
import PdfBukaSegel from './PdfBukaSegel.js'
import PdfLptp from './PdfLptp.js'
import PdfRiksa from './PdfRiksa.js'
import PdfSbp from './PdfSbp.js'
import PdfSegel from './PdfSegel.js'
import PdfTegah from './PdfTegah.js'

export default {
	name: "DisplayPdf",
	components: {
		MyAlert
	},
	props: {
		doc_type: String,
		doc_id: Number,
	},
	data() {
		return {
			data: null,
			show_pdf: false,
			src_pdf: null,
			status_pdf: null,
			list_pdf: [this.doc_type],
			active_pdf: this.doc_type
		}
	},
	methods: {
		async getData() {
			this.data = await api.getDocumentById(this.doc_type, this.doc_id)
			for (const key in this.data.dokumen) {
				if (!this.list_pdf.includes(key)) {
					this.list_pdf.push(key)
				}
			}
			this.status_pdf = this.data.dokumen[this.doc_type]['kode_status']
		},
		async getPdf() {
			await this.getData()
			
			switch (this.active_pdf) {
				case 'bukasegel':
					let pdfBukaSegel = new PdfBukaSegel(this.data)
					this.src_pdf = pdfBukaSegel.generatePdf()
					break;

				case 'sbp':
					let pdfSbp = new PdfSbp(this.data)
					this.src_pdf = pdfSbp.generatePdf()
					break;

				case 'segel':
					let pdfSegel = new PdfSegel(this.data)
					this.src_pdf = pdfSegel.generatePdf()
					break;

				case 'tegah':
					let pdfTegah = new PdfTegah(this.data)
					this.src_pdf = pdfTegah.generatePdf()
					break;

				case 'riksa':
					let pdfRiksa = new PdfRiksa(this.data)
					this.src_pdf = pdfRiksa.generatePdf()
					break;

				case 'lptp':
					let pdfLptp = new PdfLptp(this.data)
					this.src_pdf = pdfLptp.generatePdf()
					break;
			
				default:
					break;
			}

			this.show_pdf = true
		},
		changePdf(doc_type) {
			this.active_pdf = doc_type
			this.show_pdf = false
			this.getPdf()
			this.show_pdf = true
		},
		async publishDoc() {
			await api.publishDoc(this.doc_type, this.doc_id)
			await this.getPdf()
		}
	},
	mounted() {
		this.getPdf()
	}
}
</script>

<style>

</style>