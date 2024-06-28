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
		<CRow>
			<CCol col="12">
				<CButton
					v-if="show_publish_button"
					class="mx-1"
					color="success"
					shape="pill"
					@click="publishDoc"
				>
					Terbitkan
				</CButton>

				<CButton
					v-if="show_book_button"
					class="mx-1"
					color="primary"
					shape="pill"
					@click="bookNumber"
				>
					Booking nomor
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
import PdfBukaPengaman from './penindakan/PdfBukaPengaman'
import PdfBukaSegel from './penindakan/PdfBukaSegel'
import PdfLap from './penindakan/PdfLap'
import PdfLapN from './penindakan/PdfLapN'
import PdfLi from './penindakan/PdfLi'
import PdfLkai from './intelijen/PdfLkai'
import PdfLkaiN from './intelijen/PdfLkaiN'
import PdfLp from './penindakan/PdfLp'
import PdfLpf from './penyidikan/PdfLpf'
import PdfLpN from './penindakan/PdfLpN'
import PdfLphp from './penindakan/PdfLphp'
import PdfLphpN from './penindakan/PdfLphpN'
import PdfLpp from './penyidikan/PdfLpp'
import PdfLppi from './intelijen/PdfLppi'
import PdfLppiN from './intelijen/PdfLppiN'
import PdfLpt from './penindakan/PdfLpt'
import PdfLptp from './penindakan/PdfLptp'
import PdfLptpN from './penindakan/PdfLptpN'
import PdfNhi from './intelijen/PdfNhi'
import PdfNhiN from './intelijen/PdfNhiN'
import PdfNi from './intelijen/PdfNi'
import PdfNiN from './intelijen/PdfNiN'
import PdfRiksa from './penindakan/PdfRiksa'
import PdfRiksaBadan from './penindakan/PdfRiksaBadan'
import PdfSbp from './penindakan/PdfSbp'
import PdfSbpN from './penindakan/PdfSbpN'
import PdfSegel from './penindakan/PdfSegel'
import PdfPengaman from './penindakan/PdfPengaman'
import PdfTegah from './penindakan/PdfTegah'
import PdfTolak1 from './penindakan/PdfTolak1'
import PdfTolak2 from './penindakan/PdfTolak2'
import permission from '../../helpers/permission'
import store from '../../store'

export default {
	name: "DisplayPdf",
	components: {
		MyAlert
	},
	props: {
		state: String,
		doc_type: String,
		document: Object,
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
		doc_id() { return this.document ? this.document.id : null },
		show_publish_button() {
			let show = false
			let user = store.getters.userInfo
			let match_user = user.nip == this.document['created_by']['nip']
			let permited = permission.checkPermission('create-'+this.doc_type)
			if (
				this.is_publishable && match_user && permited &&
				['draft', 'booking-nomor', 'rollback'].includes(this.status_pdf)
			) { show = true }
			return show
		},
		show_book_button() { 
			let show = false
			let user = store.getters.userInfo
			let permited = permission.checkPermission('create-'+this.doc_type)

			if (
				(this.is_publishable) &&
				(['draft'].includes(this.status_pdf)) &&
				(user.nip == this.document['created_by']['nip']) &&
				(permited)
			) {
				show = true
			}

			return show
		},
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
				// Intelijen
				case 'lkai':
					pdf = new PdfLkai(data_pdf)
					break;

				case 'lkain':
					pdf = new PdfLkaiN(data_pdf)
					break;

				case 'lppi':
					pdf = new PdfLppi(data_pdf)
					break;

				case 'lppin':
					pdf = new PdfLppiN(data_pdf)
					break;

				case 'nhi':
					let response = await api.getBarang(doc_type, doc_id)
					var data_barang = response.data
					pdf = new PdfNhi(data_pdf, data_barang)
					break;

				case 'nhin':
					var data_barang = null
					if (data_pdf.detail.type == 'nhin-exim') {
						let response = await api.getBarang(doc_type, doc_id)
						data_barang = response.data
					}
					pdf = new PdfNhiN(data_pdf, data_barang)
					break;

				case 'ni':
					pdf = new PdfNi(data_pdf)
					break;
				
				case 'nin':
					pdf = new PdfNiN(data_pdf)
					break;

				// Penindakan
				case 'li':
					pdf = new PdfLi(data_pdf)
					break;

				case 'lap':
					pdf = new PdfLap(data_pdf)
					break;

				case 'lapn':
					pdf = new PdfLapN(data_pdf)
					break;

				case 'riksa_badan':
					pdf = new PdfRiksaBadan(data_pdf)
					break;

				case 'riksa':
					pdf = new PdfRiksa(data_pdf)
					break;

				case 'tegah':
					pdf = new PdfTegah(data_pdf)
					break;

				case 'segel':
					pdf = new PdfSegel(data_pdf)
					break;

				case 'buka_segel':
					pdf = new PdfBukaSegel(data_pdf)
					break;

				case 'sbp':
					pdf = new PdfSbp(data_pdf)
					break;

				case 'sbpn':
					pdf = new PdfSbpN(data_pdf)
					break;

				case 'tolak1':
					pdf = new PdfTolak1(data_pdf)
					break;

				case 'tolak2':
					pdf = new PdfTolak2(data_pdf)
					break;

				case 'lpt':
					pdf = new PdfLpt(data_pdf)
					break;

				case 'lptp':
					pdf = new PdfLptp(data_pdf)
					break;

				case 'lptpn':
					pdf = new PdfLptpN(data_pdf)
					break;

				case 'lphp':
					pdf = new PdfLphp(data_pdf)
					break;

				case 'lphpn':
					pdf = new PdfLphpN(data_pdf)
					break;

				case 'lp':
					pdf = new PdfLp(data_pdf)
					break;

				case 'lpn':
					pdf = new PdfLpN(data_pdf)
					break;

				case 'pengaman':
					pdf = new PdfPengaman(data_pdf)
					break;

				case 'buka_pengaman':
					pdf = new PdfBukaPengaman(data_pdf)
					break

				// Penyidikan
				case 'lpp':
					pdf = new PdfLpp(data_pdf)
					break

				case 'lpf':
					pdf = new PdfLpf(data_pdf)
					break
			
				default:
					break;
			}

			this.src_pdf = pdf.generatePdf()
			this.show_pdf = true
			this.status_pdf = data_pdf.kode_status
			if (doc_type == this.doc_type) {
				if (['draft', 'booking-nomor', 'rollback'].includes(this.status_pdf)) {
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
		},
		async bookNumber() {
			await api.bookDoc(this.doc_type, this.doc_id)
			await this.getPdf(this.doc_type, this.doc_id)
			this.active_pdf = this.doc_type
		},
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