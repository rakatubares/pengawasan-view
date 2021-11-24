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
import axios from "axios"
import jsPDF from "jspdf"
import 'jspdf-autotable'

import MyAlert from '../../components/AlertSubmit.vue'
import api from '../../../router/api.js'
import converters from '../../../helpers/converter.js'
import pdf from '../../../helpers/pdf.js'

const pdf_props = {
	font: {
		size: 10,
		height: 4
	},
	title_line: {
		start: 80,
		end: 130
	},
	ind: {
		num: 15,
		alp: 21,
		dtl: 26,
		cln: 85,
		txt: 88,
		num_cln: 55,
		num_txt: 58,
		ttd: 125,
		lamp: 140
	}
}

export default {
	name: "PdfSbp",
	components: {
		MyAlert
	},
	props: {
		id: Number
	},
	data() {
		return {
			show_pdf: false,
			src_pdf: null,
			status_pdf: null,
			data: null
		}
	},
	methods: {
		publishSbp() {
			axios
				.put(api.publishSbp(this.id))
				.then(
					(response) => { 
						this.alert('SBP berhasil diterbitkan', 'success', 2)
						this.showPdf()
						this.$emit('publish-sbp', this.id)
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
			this.data = await this.getData()
			this.status_pdf = this.data.status.kode_status
			this.show_pdf = false
			this.src_pdf = this.createPDF()
			this.show_pdf = true
		},
		async getData() {
			const response =  await axios.get(api.sbpComplete(this.id))
			return response.data.data
		},
		createPDF() {
			let ln
			let tgl_dok = converters.date(this.data.tgl_dok, 'DD-MM-YYYY')
			let tgl_sprint = converters.date(this.data.sprint.tanggal_sprint, 'DD-MM-YYYY')
			let full_tgl_dok = tgl_dok != null ? converters.fullDate(tgl_dok) : ''
			let full_tgl_sprint = converters.fullDate(tgl_sprint)

			var doc = new jsPDF('p', 'mm', [297, 210]);

			////// KOP SURAT //////
			doc = pdf.header(doc)

			////// NOMOR SURAT //////
			let doc_title = 'SURAT BUKTI PENINDAKAN'
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
			let txt_sprint = 'Dasar penindakan, Surat Perintah Nomor : ' 
				+ this.data.sprint.nomor_sprint 
				+ ' tanggal ' + full_tgl_sprint + '.'
			doc.text('1.', pdf_props.ind.num, ln)
			doc.text(txt_sprint, 21, ln)
			ln += pdf_props.font.height

			let txt_perintah = 'Perintah yang dilaksanakan : '
				+ 'Penghentian, pemeriksaan, penegahan, penyegelan, '
				+ 'penghentian pembongkaran dan/atau penegahan di bidang HKI*.'
			doc.text('2.', pdf_props.ind.num, ln)
			doc.text(txt_perintah, 21, ln, {maxWidth: 180})
			ln += pdf_props.font.height*2

			doc.text('3.', pdf_props.ind.num, ln)
			doc.text('Obyek Penindakan:', pdf_props.ind.alp, ln)
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

			// Badan
			let res_badan = pdf.detail_badan(doc, this.data.detail.badan, ln, pdf_props.font.height, indents)
			doc = res_badan[0]
			ln = res_badan[1]

			doc.text('4.', pdf_props.ind.num, ln)
			doc.text('Lokasi Penindakan', pdf_props.ind.alp, ln)
			doc.text(':', pdf_props.ind.num_cln, ln)
			doc.text(this.data.lokasi_penindakan, pdf_props.ind.num_txt, ln)
			ln += pdf_props.font.height

			let txt_uraian = converters.array_text(this.data.uraian_penindakan, 90)
			doc.text('5.', pdf_props.ind.num, ln)
			doc.text('Uraian Penindakan', pdf_props.ind.alp, ln)
			doc.text(':', pdf_props.ind.num_cln, ln)
			doc.text(txt_uraian, pdf_props.ind.num_txt, ln)
			ln += pdf_props.font.height*((txt_uraian.length) > 0 ? txt_uraian.length : 1)

			let txt_alasan = converters.array_text(this.data.alasan_penindakan, 90)
			doc.text('6.', pdf_props.ind.num, ln)
			doc.text('Alasan Penindakan', pdf_props.ind.alp, ln)
			doc.text(':', pdf_props.ind.num_cln, ln)
			doc.text(txt_alasan, pdf_props.ind.num_txt, ln)
			ln += pdf_props.font.height*((txt_alasan.length) > 0 ? txt_alasan.length : 1)

			doc.text('7.', pdf_props.ind.num, ln)
			doc.text('Jenis Pelanggaran', pdf_props.ind.alp, ln)
			doc.text(':', pdf_props.ind.num_cln, ln)
			doc.text(this.data.jenis_pelanggaran, pdf_props.ind.num_txt, ln)
			ln += pdf_props.font.height

			doc.text('8.', pdf_props.ind.num, ln)
			let tindakan = 'Tindakan yang diambil : pemeriksaan dihentikan / diijinkan meneruskan perjalanan / '
				+ 'penegahan / penyegelan / dibawa ke Kantor Bea dan Cukai terdekat / '
				+ 'dibawa ke Kantor Bea dan Cukai tempat kedudukan penjabat penerbit Surat Perintah / diserahkan kepada PPNS Bea dan Cukai*.'
			doc.text(tindakan, pdf_props.ind.alp, ln,{maxWidth: 180})
			ln += pdf_props.font.height*3

			let txt_mulai_penindakan = this.data.wkt_mulai_penindakan.replace(" ", " jam ")
			let txt_selesai_penindakan = this.data.wkt_selesai_penindakan.replace(" ", " jam ")
			doc.text('9.', pdf_props.ind.num, ln)
			doc.text('Waktu Penindakan', pdf_props.ind.alp, ln)
			ln += pdf_props.font.height
			doc.text('Dimulai tanggal', pdf_props.ind.alp, ln)
			doc.text(':', pdf_props.ind.num_cln, ln)
			doc.text(txt_mulai_penindakan, pdf_props.ind.num_txt, ln)
			ln += pdf_props.font.height
			doc.text('Berakhir', pdf_props.ind.alp, ln)
			doc.text(':', pdf_props.ind.num_cln, ln)
			doc.text(txt_selesai_penindakan, pdf_props.ind.num_txt, ln)
			ln += pdf_props.font.height

			let txt_hal_terjadi = converters.array_text(this.data.hal_terjadi, 90)
			doc.text('10.', pdf_props.ind.num, ln)
			doc.text('Hal yang terjadi', pdf_props.ind.alp, ln)
			doc.text(':', pdf_props.ind.num_cln, ln)
			doc.text(txt_hal_terjadi, pdf_props.ind.num_txt, ln)
			ln += pdf_props.font.height*((txt_hal_terjadi.length) > 0 ? txt_hal_terjadi.length : 1)

			////// TTD //////
			let ln_tgl = ln + pdf_props.font.height*1.5
			let ln_jabatan_1 = ln_tgl + pdf_props.font.height
			let ln_nama_1 = ln_jabatan_1 + pdf_props.font.height*4
			let ln_nip_1 = ln_nama_1 + pdf_props.font.height
			let ln_nama_2 = ln_nip_1 + pdf_props.font.height*4
			let ln_nip_2 = ln_nama_2 + pdf_props.font.height

			// Pemilik/kuasa
			doc.text('Pengangkut / Pemilik / Kuasanya / Saksi*', pdf_props.ind.alp, ln_jabatan_1)
			doc.text(this.data.saksi.nama, pdf_props.ind.alp, ln_nama_1)

			// Pejabat
			doc.text('Tangerang, ' + full_tgl_dok, pdf_props.ind.ttd, ln_tgl)
			doc.text('Pejabat yang melakukan penindakan,', pdf_props.ind.ttd, ln_jabatan_1)
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
			let ln_ket = ln_coret + pdf_props.font.height*2

			doc.setFont('Helvetica', 'italic')
			doc.setFontSize('7')
			doc.text('*Coret yang tidak perlu', pdf_props.ind.num, ln_coret)

			doc.setFontSize(pdf_props.font.size-1)
			let ket = 'Yang dimaksud dengan "barang yang dikuasai negara" adalah '
			ket += 'barang yang untuk sementara waktu penguasaannya berada pada negara '
			ket += 'sampai dapat ditentukan status barang yang sebenarnya. '
			ket += 'Perubahaan status ini dimaksudkan agar pejabat bea dan cukai '
			ket += 'dapat memproses barang tersebut secara administrasi sampai dapat dibuktikan '
			ket += 'bahwa telah terjadi kesalahan atau sama sekali tidak terjadi kesalahan.'
			doc.text(ket, pdf_props.ind.num, ln_ket, {maxWidth: 185})

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
		}
	},
	mounted() {
		this.showPdf()
	}
}
</script>

<style>

</style>