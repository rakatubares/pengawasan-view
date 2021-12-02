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
					@click="publishSbp"
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
import PdfSbp from '../pdf/PdfSbp.js'
import PdfSegel from '../pdf/PdfSegel.js'
import PdfTegah from '../pdf/PdfTegah.js'
import MyAlert from '../components/AlertSubmit.vue'

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
			let doc = await api.getDocumentById(this.doc_type, this.doc_id)
			this.data = await api.getPenindakanById(doc.penindakan.id)
			for (const key in this.data.dokumen) {
				if (!this.list_pdf.includes(key)) {
					this.list_pdf.push(key)
				}
			}
		},
		async getPdf() {
			await this.getData()
			
			switch (this.active_pdf) {
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
		}
	},
	mounted() {
		this.getPdf()
	}
}
</script>

<style>

</style>