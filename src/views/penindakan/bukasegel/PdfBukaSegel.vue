<template>
	<div class="wrapper">
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
import axios from 'axios'
import jsPDF from "jspdf"
import 'jspdf-autotable'

import api from '../../../router/api.js'
import converters from '../../../helpers/converter.js'
import pdf from '../../../helpers/pdf.js'
import MyAlert from '../../components/AlertSubmit.vue'

const pdf_props = {
	font: {
		size: 10,
		height: 4
	},
	title_line: {
		start: 72.5,
		end: 137.5
	},
	ind: {
		alp: 15,
		dtl: 21,
		cln: 85,
		txt: 88,
		cln2: 65,
		txt2: 68,
		ttd:125,
		lamp: 140
	}
}

export default {
	name: "PdfBukaSegel",
	components: {
		MyAlert
	},
	props: {
		id: Number
	},
	computed: {
		pdf_txt() {
			let txt = {
				doc_no: 'Nomor: ' + this.data.header.no_dok_lengkap
			}
			return txt
		}
	},
	data() {
		return {
			show_pdf: false,
			src_pdf: null,
			status_pdf: null,
			data: {
				header: null
			}
		}
	},
	methods: {
		publishDoc() {
			axios
				.put(api.publishBukaSegel(this.id))
				.then(
					(response) => { 
						this.alert('BA Pembukaan Segel berhasil diterbitkan', 'success', 2)
						this.showPdf()
						this.$emit('publish-doc', this.id)
					}
				)
				.catch(
					(error) => {
						if (error.response) {
							let errMsg = error.response.data.error 
							this.alert(errMsg, 'danger', 2)
						}
					}
				)
		},
		alert(text, color, time) {
			this.$refs.alert.show_alert(text, color, time)
		},
		async showPdf() {
			console.log('show pdf')
			this.data = await this.getData()
			this.status_pdf = this.data.status.kode_status
			this.show_pdf = false
			this.src_pdf = this.createPDF()
			this.show_pdf = true
		},
		async getData() {
			const response =  await axios.get(api.bukaSegelComplete(this.id))
			return response.data.data
		},
		createPDF() {
			let ln
			let tgl_dok = converters.date(this.data.tgl_dok, 'DD-MM-YYYY')
			let tgl_sprint = converters.date(this.data.sprint.tanggal_sprint, 'DD-MM-YYYY')
			let hr = tgl_dok != null ? converters.weekDay(tgl_dok) : ''
			let tgl = tgl_dok != null ? tgl_dok.getDate() : ''
			let bln = tgl_dok != null ? converters.monthName(tgl_dok) : ''
			let thn = tgl_dok != null ? tgl_dok.getFullYear() : ''
			let full_tgl_dok = tgl_dok != null ? converters.fullDate(tgl_dok) : ''
			let full_tgl_sprint = converters.fullDate(tgl_sprint)
			
			var doc = new jsPDF('p', 'mm', [297, 210])

			////// KOP SURAT //////
			doc = pdf.header(doc)

			////// NOMOR SURAT //////
			let doc_title = 'BERITA ACARA PEMBUKAAN SEGEL'
			let doc_no = 'Nomor: ' + this.data.no_dok_lengkap
			let res_nomor = pdf.nomor(
				doc, 
				pdf_props.font.size, 
				pdf_props.font.height, 
				pdf_props.title_line.start,
				pdf_props.title_line.end,
				doc_title, 
				doc_no
			)
			doc = res_nomor[0]
			ln = res_nomor[1]

			////// URAIAN //////
			let txt_waktu = 'Pada hari ini ' + hr + ' tanggal ' + tgl + ' bulan ' + bln + ' tahun ' + thn + '.'
			doc.text(txt_waktu, pdf_props.ind.dtl, ln)
			ln += pdf_props.font.height
			let txt_sprint = 'Berdasarkan Surat Perintah : Kepala Bidang Penindakan dan Penyidikan Nomor ' 
				+ this.data.sprint.nomor_sprint 
				+ ' tanggal ' + full_tgl_sprint + '.'
			let arr_sprint = converters.array_text(txt_sprint, 105)
			doc.text(arr_sprint, pdf_props.ind.alp, ln)
			ln += pdf_props.font.height*arr_sprint.length
			let txt_pernyataan = 'Kami yang bertanda tangan di bawah ini telah melakukan pembukaan segel atas:'
			doc.text(txt_pernyataan, pdf_props.ind.alp, ln)
			ln += pdf_props.font.height

			////// DETAIL //////
			let indents = {
				alp: pdf_props.ind.alp, 
				lbl: pdf_props.ind.dtl,
				cln: pdf_props.ind.cln,
				txt: pdf_props.ind.txt,
			}

			// Sarkut
			let res_sarkut = pdf.detail_sarkut(doc, this.data.detail.sarkut, ln, pdf_props.font.height, indents)
			doc = res_sarkut[0]
			ln = res_sarkut[1]

			// Barang
			let res_barang = pdf.detail_barang(doc, this.data.detail.barang, ln, pdf_props.font.height, indents)
			doc = res_barang[0]
			ln = res_barang[1]

			// Bangunan
			let res_bangunan = pdf.detail_bangunan(doc, this.data.detail.bangunan, ln, pdf_props.font.height, indents)
			doc = res_bangunan[0]
			ln = res_bangunan[1]

			ln += pdf_props.font.height
			let txt_segel = 'berupa segel/tanda pengaman ' 
				+ converters.string(this.data.jenis_segel)
				+ ' sebanyak ' 
				+ converters.string(this.data.jumlah_segel)
				+ ' Nomor ' 
				+ converters.string(this.data.nomor_segel)
				+ ' penempatan/pelekatan segel sebagai berikut: '
				+ converters.string(this.data.tempat_segel)
				+ '.'
			let arr_segel = converters.array_text(txt_segel, 100)
			doc.text(arr_segel, pdf_props.ind.alp, ln)
			ln += pdf_props.font.height*arr_segel.length

			let txt_saksi = 'Penyegelan disaksikan oleh pengangkut/pemilik/importir/eksportir '
				+ 'atau kuasanya/ketua lingkungan/dll*:'
			let arr_saksi = converters.array_text(txt_saksi, 110)
			doc.text(arr_saksi, pdf_props.ind.alp, ln)
			ln += pdf_props.font.height*arr_saksi.length

			doc.text('Nama', pdf_props.ind.alp, ln)
			doc.text(':', pdf_props.ind.cln2, ln)
			doc.text(converters.string(this.data.saksi.nama), pdf_props.ind.txt2, ln)
			ln += pdf_props.font.height
			doc.text('Alamat', pdf_props.ind.alp, ln)
			doc.text(':', pdf_props.ind.cln2, ln)
			doc.text(converters.string(this.data.saksi.alamat).replace('\n', ' '), pdf_props.ind.txt2, ln)
			ln += pdf_props.font.height
			doc.text('Pekerjaan', pdf_props.ind.alp, ln)
			doc.text(':', pdf_props.ind.cln2, ln)
			doc.text(converters.string(this.data.saksi.pekerjaan), pdf_props.ind.txt2, ln)
			ln += pdf_props.font.height
			doc.text('Identitas (KTP/SIM/Paspor*)', pdf_props.ind.alp, ln)
			doc.text(':', pdf_props.ind.cln2, ln)
			let txt_identitas = converters.string(this.data.saksi.nomor_identitas)
				+ converters.string_format(converters.string(this.data.saksi.jenis_identitas), ' ({})')
			doc.text(txt_identitas, pdf_props.ind.txt2, ln)
			ln += pdf_props.font.height

			ln += pdf_props.font.height
			doc.text('Demikian Berita Acara ini dibuat dengan sebenarnya.', pdf_props.ind.dtl, ln)
			ln += pdf_props.font.height

			////// TTD //////
			let ln_tgl = ln + pdf_props.font.height*2
			let ln_jabatan_1 = ln_tgl + pdf_props.font.height
			let ln_nama_1 = ln_jabatan_1 + pdf_props.font.height*6
			let ln_nip_1 = ln_nama_1 + pdf_props.font.height
			let ln_nama_2 = ln_nip_1 + pdf_props.font.height*6
			let ln_nip_2 = ln_nama_2 + pdf_props.font.height

			// Pemilik/kuasa
			doc.text('Pengangkut / Pemilik / Kuasanya / Saksi*', pdf_props.ind.alp, ln_jabatan_1)
			doc.text(this.data.saksi.nama, pdf_props.ind.alp, ln_nama_1)

			// Pejabat
			doc.text('Tangerang, ' + full_tgl_dok, pdf_props.ind.ttd, ln_tgl)
			doc.text('Pejabat yang melakukan pembukaan segel,', pdf_props.ind.ttd, ln_jabatan_1)
			doc.text(this.data.petugas1.name, pdf_props.ind.ttd, ln_nama_1)
			doc.text('NIP ' + this.data.petugas1.nip, pdf_props.ind.ttd, ln_nip_1)
			if (this.data.petugas2 != null) {
				var txt_nama_pejabat2 = this.data.petugas2.name
				var txt_nip_pejabat2 = this.data.petugas2.nip
			} else {
				var txt_nama_pejabat2 = '...........................................'
				var txt_nip_pejabat2 = '....................................'
			}
			doc.text(txt_nama_pejabat2, pdf_props.ind.ttd, ln_nama_2)
			doc.text('NIP ' + txt_nip_pejabat2, pdf_props.ind.ttd, ln_nip_2)

			////// KETERANGAN //////
			let ln_coret = ln_nip_2 + pdf_props.font.height
			doc.setFont('Helvetica', 'italic')
			doc.setFontSize('7')
			doc.text('*Coret yang tidak perlu', pdf_props.ind.alp, ln_coret)

			////// LAMPIRAN //////
			if (this.data.detail.barang != null) {
				if (this.data.detail.barang.item.length > 1) {
					doc.setFont('Helvetica', 'normal')
					ln = 10
					doc.addPage()

					// Header
					let res_att_head = pdf.header_lampiran(
						doc, 
						doc_title, 
						this.data.no_dok_lengkap,
						full_tgl_dok,
						pdf_props.font.size,
						pdf_props.font.height,
						ln,
						pdf_props.ind.lamp
					)
					doc = res_att_head[0]
					ln = res_att_head[1]

					// Tabel barang
					const tabelData = converters.item_barang(this.data.detail.barang.item)
					doc = pdf.tabel_barang(doc, tabelData, ln, pdf_props.font.size)
				}
			}

			////// WATERMARK //////
			if ([100,101].includes(this.data.status.kode_status)) {
				doc = pdf.watermark(doc)	
			}

			return doc.output('datauristring');
		},
	},
	mounted() {
		this.showPdf()
	}
}
</script>

<style>

</style>