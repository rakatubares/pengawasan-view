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
import PdfBast from './PdfBast.js'
import PdfBukaPengaman from './PdfBukaPengaman.js'
import PdfContoh from './PdfContoh.js'
import PdfLap from './PdfLap.js'
import PdfLi from './PdfLi.js'
import PdfLkai from './PdfLkai.js'
import PdfLp from './PdfLp.js'
import PdfLphp from './PdfLphp.js'
import PdfLpN from './PdfLpN.js'
import PdfLppi from './PdfLppi.js'
import PdfLptp from './PdfLptp.js'
import PdfNhi from './PdfNhi.js'
import PdfPengaman from './PdfPengaman.js'
import PdfReekspor from './PdfReekspor.js'
import PdfRiksa from './PdfRiksa.js'
import PdfRiksaBadan from './PdfRiksaBadan.js'
import PdfSbp from './PdfSbp.js'
import PdfSegel from './PdfSegel.js'
import PdfTegah from './PdfTegah.js'
import PdfTolak1 from './PdfTolak1.js'
import PdfTolak2 from './PdfTolak2.js'
import MyAlert from '../components/AlertSubmit.vue'
import PdfBukaSegel from './PdfBukaSegel.js'
import PdfTitip from './PdfTitip.js'

export default {
	name: "DisplayPdf",
	components: {
		MyAlert
	},
	props: {
		state: String,
		doc_type: String,
		doc_id: Number,
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
				if (this.status_pdf == 100) {
					show = true
				}	
			}

			return show
		}
	},
	methods: {
		async listPdf() {
			let response = await api.getRelatedDocuments(this.doc_type, this.doc_id)
			this.list_pdf = response.data
		},
		async getPdf(doc_type, doc_id) {
			let pdf = null
			let response = await api.getPdfDataById(doc_type, doc_id)
			let pdfData = response.data.data

			switch (doc_type) {
				case 'bast':
					pdf = new PdfBast(pdfData)
					break;

				case 'bukapengaman':
					pdf = new PdfBukaPengaman(pdfData)
					break;

				case 'bukasegel':
					pdf = new PdfBukaSegel(pdfData)
					break;

				case 'contoh':
					pdf = new PdfContoh(pdfData)
					break;

				case 'lap':
					pdf = new PdfLap(pdfData)
					break;
					
				case 'li':
					pdf = new PdfLi(pdfData)
					break;

				case 'lkai':
					pdf = new PdfLkai(pdfData)
					break;
					
				case 'lp':
					pdf = new PdfLp(pdfData)
					break;

				case 'lpn':
					pdf = new PdfLpN(pdfData)
					break;

				case 'lphp':
					pdf = new PdfLphp(pdfData)
					break;

				case 'lphpn':
					pdf = new PdfLphp(
						pdfData, 
						this.active_pdf, 
						'lptpn', 
						'sbpn', 
						'LEMBAR PENENTUAN HASIL PENINDAKAN NPP', 
						{start: 63, end: 147}
					)
					break;

				case 'lppi':
					pdf = new PdfLppi(pdfData)
					break;

				case 'lptp':
					pdf = new PdfLptp(pdfData)
					break;

				case 'lptpn':
					pdf = new PdfLptp(
						pdfData, 
						this.active_pdf, 
						'sbpn', 
						'LAPORAN PELAKSANAAN TUGAS PENINDAKAN NPP', 
						{start: 58, end: 152}
					)
					break;

				case 'nhi':
					pdf = new PdfNhi(pdfData)
					break;

				case 'pengaman':
					pdf = new PdfPengaman(pdfData)
					break;

				case 'reekspor':
					pdf = new PdfReekspor(pdfData)
					break;

				case 'riksa':
					pdf = new PdfRiksa(pdfData)
					break;

				case 'riksabadan':
					pdf = new PdfRiksaBadan(pdfData)
					break;

				case 'sbp':
					pdf = new PdfSbp(pdfData)
					break;

				case 'sbpn':
					pdf = new PdfSbp(
						pdfData, 
						this.active_pdf, 
						'SURAT BUKTI PENINDAKAN NPP', 
						{start: 76, end: 134}
					)
					break;

				case 'segel':
					pdf = new PdfSegel(pdfData)
					break;

				case 'tegah':
					pdf = new PdfTegah(pdfData)
					break;

				case 'titip':
					pdf = new PdfTitip(pdfData)
					break;

				case 'tolak1':
					pdf = new PdfTolak1(pdfData)
					break;

				case 'tolak2':
					pdf = new PdfTolak2(pdfData)
					break;

				default:
					break;
			}

			this.src_pdf = pdf.generatePdf()
			this.show_pdf = true
			this.status_pdf = pdfData.kode_status
			if (doc_type == this.doc_type) {
				if (this.status_pdf == 100) {
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