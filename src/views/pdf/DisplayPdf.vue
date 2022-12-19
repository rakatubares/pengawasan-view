<template>
	<div class="wrapper">
		<CRow>
			<CCol>
				<CButton 
					v-for="pdf in list_pdf"
					:key="pdf.doc_type"
					class="mt-3 mx-1"
					shape="pill"
					variant="outline"
					color="info"
					@click="changePdf(pdf.doc_type)"
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
import PdfLpp from './PdfLpp.js'
import PdfSbp from './PdfSbp.js'
import PdfSegel from './PdfSegel.js'
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
	},
	data() {
		return {
			data: null,
			show_pdf: false,
			src_pdf: null,
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
			if (this.status_pdf == 100) {
				show = true
			}

			return show
		}
	},
	methods: {
		async listPdf() {
			let response = await api.getRelatedDocuments(this.doc_type, this.doc_id)
			console.log('RESPONSE LIST PDF', JSON.parse(JSON.stringify(response)))
			this.list_pdf = response.data
			console.log('LIST PDF', JSON.parse(JSON.stringify(this.list_pdf)))
		},
		async getData() {
			this.data = await api.getDocumentById(this.doc_type, this.doc_id)
			this.list_pdf = [this.doc_type]
			for (const key in this.data.dokumen) {
				if (!this.list_pdf.includes(key)) {
					this.list_pdf.push(key)
				}
			}
			this.status_pdf = this.data.dokumen[this.doc_type]['kode_status']
		},
		async getPdf(doc_type, doc_id) {
			let pdf = null
			let response = await api.getPdfDataById(doc_type, doc_id)
			let pdfData = response.data.data

			switch (doc_type) {
				case 'lpp':
					pdf = new PdfLpp(pdfData)
					break;

				case'sbp':
					pdf = new PdfSbp(pdfData)
					break;
			
				default:
					break;
			}

			this.src_pdf = pdf.generatePdf()
			
			// switch (this.active_pdf) {
			// 	case 'lpp':
			// 		let pdfLpp = new PdfLpp(this.data)
			// 		this.src_pdf = pdfLpp.generatePdf()
			// 		break;
				
			// 	case 'sbp':
			// 		let pdfSbp = new PdfSbp(this.data)
			// 		this.src_pdf = pdfSbp.generatePdf()
			// 		break;

			// 	case 'segel':
			// 		let pdfSegel = new PdfSegel(this.data)
			// 		this.src_pdf = pdfSegel.generatePdf()
			// 		break;

			// 	default:
			// 		break;
			// }

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
			this.$emit('update:state', 'show')
		}
	},
	mounted() {
		console.log('DISPLAY PDF - MOUNTED')
		this.listPdf()
		this.getPdf(this.doc_type, this.doc_id)
	}
}
</script>

<style>

</style>