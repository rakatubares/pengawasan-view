<template>
	<div class="wrapper">
		<CRow v-if="show_button">
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
import PdfContoh from './PdfContoh.js'
import PdfLap from './PdfLap.js'
import PdfLi from './PdfLi.js'
import PdfLp from './PdfLp.js'
import PdfLphp from './PdfLphp.js'
import PdfLpN from './PdfLpN.js'
import PdfLptp from './PdfLptp.js'
import PdfRiksa from './PdfRiksa.js'
import PdfRiksaBadan from './PdfRiksaBadan.js'
import PdfSbp from './PdfSbp.js'
import PdfSegel from './PdfSegel.js'
import PdfTegah from './PdfTegah.js'
import PdfTolak1 from './PdfTolak1.js'
import PdfTolak2 from './PdfTolak2.js'
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
			status_pdf: null,
			list_pdf: [this.doc_type],
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
		async getPdf() {
			await this.getData()
			
			switch (this.active_pdf) {
				case 'bast':
					let pdfBast = new PdfBast(this.data)
					this.src_pdf = pdfBast.generatePdf()
					break;

				case 'contoh':
					let pdfContoh = new PdfContoh(this.data)
					this.src_pdf = pdfContoh.generatePdf()
					break;

				case 'lap':
					let pdfLap = new PdfLap(this.data)
					this.src_pdf = pdfLap.generatePdf()
					break;
					
				case 'li':
					let pdfLi = new PdfLi(this.data)
					this.src_pdf = pdfLi.generatePdf()
					break;
					
				case 'lp':
					let pdfLp = new PdfLp(this.data)
					this.src_pdf = pdfLp.generatePdf()
					break;

				case 'lpn':
					let pdfLpN = new PdfLpN(this.data)
					this.src_pdf = pdfLpN.generatePdf()
					break;

				case 'lphp':
					let pdfLphp = new PdfLphp(this.data)
					this.src_pdf = pdfLphp.generatePdf()
					break;

				case 'lphpn':
					let pdfLphpn = new PdfLphp(
						this.data, 
						this.active_pdf, 
						'lptpn', 
						'sbpn', 
						'LEMBAR PENENTUAN HASIL PENINDAKAN NPP', 
						{start: 63, end: 147}
					)
					this.src_pdf = pdfLphpn.generatePdf()
					break;

				case 'lptp':
					let pdfLptp = new PdfLptp(this.data)
					this.src_pdf = pdfLptp.generatePdf()
					break;

				case 'lptpn':
					let pdfLptpn = new PdfLptp(
						this.data, 
						this.active_pdf, 
						'sbpn', 
						'LAPORAN PELAKSANAAN TUGAS PENINDAKAN NPP', 
						{start: 58, end: 152}
					)
					this.src_pdf = pdfLptpn.generatePdf()
					break;

				case 'riksa':
					let pdfRiksa = new PdfRiksa(this.data)
					this.src_pdf = pdfRiksa.generatePdf()
					break;

				case 'riksabadan':
					let pdfRiksaBadan = new PdfRiksaBadan(this.data)
					this.src_pdf = pdfRiksaBadan.generatePdf()
					break;

				case 'sbp':
					let pdfSbp = new PdfSbp(this.data)
					this.src_pdf = pdfSbp.generatePdf()
					break;

				case 'sbpn':
					let pdfSbpn = new PdfSbp(
						this.data, 
						this.active_pdf, 
						'SURAT BUKTI PENINDAKAN NPP', 
						{start: 76, end: 134}
					)
					this.src_pdf = pdfSbpn.generatePdf()
					break;

				case 'segel':
					let pdfSegel = new PdfSegel(this.data)
					this.src_pdf = pdfSegel.generatePdf()
					break;

				case 'tegah':
					let pdfTegah = new PdfTegah(this.data)
					this.src_pdf = pdfTegah.generatePdf()
					break;

				case 'tolak1':
					let pdfTolak1 = new PdfTolak1(this.data)
					this.src_pdf = pdfTolak1.generatePdf()
					break;

				case 'tolak2':
					let pdfTolak2 = new PdfTolak2(this.data)
					this.src_pdf = pdfTolak2.generatePdf()
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
			this.$emit('update:state', 'show')
		}
	},
	mounted() {
		this.getPdf()
	}
}
</script>

<style>

</style>