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

		<!-- <vue-html2pdf
				:show-layout="false"
				:float-layout="true"
				:enable-download="false"
				:preview-modal="true"
				:paginate-elements-by-height="1400"
				:pdf-quality="2"
				:manual-pagination="false"
				pdf-format="a4"
				pdf-orientation="portrait"
 
				ref="html2Pdf"
		>
			<section slot="pdf-content">
				<CRow>
					<CCol col="2">LOGO</CCol>
					<CCol col="8">
						<CRow>
							<CCol style="font-size: 20px" class="text-center">KEMENTERIAN KEUANGAN REPUBLIK INDONESIA</CCol>
						</CRow>
						<CRow class="text-center">DIREKTORAT JENDERAL BEA DAN CUKAI</CRow>
					</CCol>
				</CRow>
			</section>
		</vue-html2pdf> -->

		<!-- Alert -->
		<MyAlert ref="alert"></MyAlert>
	</div>
</template>

<script>
import axios from "axios"
import jsPDF from "jspdf"
import 'jspdf-autotable'
import VueHtml2pdf from 'vue-html2pdf'

import MyAlert from '../../components/AlertSubmit.vue'
import converters from '../../../helpers/converter.js'

const API = process.env.VUE_APP_BASEAPI + '/sbp'

const pdf = {
	font: {
		size: 10,
		height: 4
	},
	ind: {
		num: 15,
		alp: 21,
		dtl: 26,
		dtl_cln: 85,
		dtl_txt: 88,
		num_cln: 55,
		num_txt: 58,
		ttd: 125,
		lamp: 140
	}
}

export default {
	name: "PdfSbp",
	components: {
		MyAlert,
		VueHtml2pdf
	},
	props: {
		id: Number
	},
	computed: {
		API_SBP_ID() { return API + '/' + this.id },
		API_SBP_PUBLISH() { return this.API_SBP_ID + '/publish' },
		pdf_txt() {
			let txt = {
				no_sbp: 'Nomor: ' + this.data.header.no_sbp_lengkap,
				tgl_sbp: converters.string(this.data.tgl_sbp),
				no_sprint: 'Dasar penindakan, Surat Perintah Nomor : ' 
					+ this.data.header.no_sprint 
					+ ' tanggal ' 
					+ this.data.header.tgl_sprint 
					+ '.',
				perintah: 'Perintah yang dilaksanakan : '
					+ 'Penghentian, pemeriksaan, penegahan, penyegelan, '
					+ 'penghentian pembongkaran dan/atau penegahan di bidang HKI*.',
				lokasi: this.data.header.lokasi_penindakan,
				uraian: converters.array_text(this.data.header.uraian_penindakan, 95),
				alasan: converters.string(this.data.alasan),
				jenis: this.data.header.jenis_pelanggaran,
				wkt_mulai_penindakan: this.data.header.wkt_mulai_penindakan.replace(" ", " jam "),
				wkt_selesai_penindakan: this.data.header.wkt_selesai_penindakan.replace(" ", " jam "),
				hal_terjadi: converters.string(this.data.hal_terjadi),

				sarkut: converters.sarkut(this.data.sarkut),
				barang: converters.barang(this.data.barang),
				bangunan: converters.bangunan(this.data.bangunan),
				badan: converters.badan(this.data.badan)
			}
			return txt
		}
	},
	data() {
		return {
			console,
			show_pdf: false,
			src_pdf: null,
			status_pdf: null,
			data: {
				header: null,
				sarkut: null,
			}
		}
	},
	methods: {
		publishSbp() {
			axios
				.put(this.API_SBP_PUBLISH)
				.then(
					(response) => { 
						console.log(response)
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
		generateReport () {
			this.$refs.html2Pdf.generatePdf()
		},
		prepareItemData(data) {
			let preparedData = []
			for (let index = 0; index < data.length; index++) {
				let entry = {
					no: (index+1).toString(),
					uraian: data[index]['uraian_barang'],
					jumlah: data[index]['jumlah_barang'] + ' ' + data[index]['satuan_barang']
				}

				preparedData.push(entry)
			}

			return preparedData
		},
		addWatermark(doc) {
			var totalPages = doc.internal.getNumberOfPages();

			for (let i = 1; i <= totalPages; i++) {
				doc.setPage(i);
				doc.saveGraphicsState()
				doc.setGState(new doc.GState({opacity: 0.2}))
				doc.setFont('Helvetica', 'bold')
				doc.setTextColor('E02401')
				doc.setFontSize('200')
				doc.text('DRAFT', 75, 270, { angle: 60 })
				doc.restoreGraphicsState()
			}

			return doc
		},
		async showPdf() {
			this.data.header = await this.getDataHeader()
			if (this.data.header.penindakan_sarkut == 1) {
				this.data.sarkut = await this.getDataSarkut()
			} else {
				this.data.sarkut = null
			}

			if (this.data.header.penindakan_barang == 1) {
				this.data.barang = await this.getDataBarang()
				this.data.item_barang = await this.getDataItemBarang()
			} else {
				this.data.barang = null
				this.data.item_barang = null
			}

			if (this.data.header.penindakan_bangunan == 1) {
				this.data.bangunan = await this.getDataBangunan()
			} else {
				this.data.bangunan = null
			}

			if (this.data.header.penindakan_badan == 1) {
				this.data.badan = await this.getDataBadan()
			} else {
				this.data.badan = null
			}

			this.status_pdf = this.data.header.status.kode_status
			this.show_pdf = false
			this.src_pdf = this.createPDF()
			this.show_pdf = true
		},
		async getDataHeader() {
			const response =  await axios.get(this.API_SBP_ID)
			return response.data.data
		},
		async getDataSarkut() {
			const response =  await axios.get(this.API_SBP_ID + '/sarkut')
			return response.data.data
		},
		async getDataBarang() {
			const response =  await axios.get(this.API_SBP_ID + '/barang')
			return response.data.data
		},
		async getDataBangunan() {
			const response =  await axios.get(this.API_SBP_ID + '/bangunan')
			return response.data.data
		},
		async getDataBadan() {
			const response =  await axios.get(this.API_SBP_ID + '/badan')
			return response.data.data
		},
		async getDataItemBarang() {
			const response =  await axios.get(this.API_SBP_ID + '/barang/detail')
			return response.data.data
		},
		createPDF() {
			var doc = new jsPDF('p', 'mm', [297, 210]);

			doc.setProperties({
				title: 'Surat Bukti Penindakan',
			});

			////// KOP SURAT //////

			// Logo
			var image = new Image()
			image.src = "form/logo-kemenkeu.png"
			doc.addImage(image, 'png', 15, 7.5, (233/8), (216/8));

			// Identitas Kantor
			doc.setFont('Helvetica', 'bold')
			doc.setFontSize('13')
			doc.text("KEMENTERIAN KEUANGAN REPUBLIK INDONESIA", 125, 10, "center");
			doc.setFontSize('11')
			doc.text("DIREKTORAT JENDERAL BEA DAN CUKAI", 125, 15, "center");
			doc.setFontSize('13')
			doc.text(["KANTOR PELAYANAN UTAMA BEA DAN CUKAI TIPE C", "SOEKARNO-HATTA"], 125, 20, "center")
			doc.setFont('Helvetica', 'normal')
			doc.setFontSize('7')
			doc.text(
				[
					'AREA KARGO BANDARA SOEKARNO-HATTA, TANGERANG, BANTEN KODE POS 15126; CALL CENTER: 1500225 (BRAVO BC)',
					'EMAIL: BCKPUSOETTA@CUSTOMS.GO.ID; WEBSITE: WWW.BCSOEKARNOHATTA.BEACUKAI.GO.ID;',
					'FACEBOOK: BEA CUKAI SOEKARNO HATTA; LAYANAN INFORMASI: PLI_SH@CUSTOMS.GO.ID; INSTAGRAM: @BCSOETTA;',
					'TWITTER: @BCSOETTA; PENGADUAN MASYARAKAT: WWW.BEACUKAI.GO.ID/PENGADUAN.HTML'
				], 
				125, 30, "center"
			)

			// Underline
			doc.line(10,41,200,41)

			////// ISI //////

			// No dokumen
			doc.setFont('Helvetica', 'bold')
			doc.setFontSize(pdf.font.size)
			let ln = 50
			doc.text('SURAT BUKTI PENINDAKAN', 105, ln, 'center')
			doc.line(80,ln+0.5,130,ln+0.5)
			doc.setFont('Helvetica', 'normal')
			ln += pdf.font.height
			doc.text(this.pdf_txt.no_sbp, 105, ln, 'center')
			ln += pdf.font.height*2

			// Uraian penindakan
			doc.text('1.', pdf.ind.num, ln)
			doc.text(this.pdf_txt.no_sprint, 21, ln)
			ln += pdf.font.height

			doc.text('2.', pdf.ind.num, ln)
			doc.text(this.pdf_txt.perintah, 21, ln, {maxWidth: 180})
			ln += pdf.font.height*2

			doc.text('3.', pdf.ind.num, ln)
			doc.text('Obyek Penindakan:', pdf.ind.alp, ln)
			ln += pdf.font.height

				//// Obyek penindakan ////
				
				// Penindakan sarkut
				doc.setFont('Helvetica', 'bold')
				doc.text('a.', pdf.ind.alp, ln)
				doc.text('Sarana pengangkut* :', pdf.ind.dtl, ln)
				ln += pdf.font.height

				doc.setFont('Helvetica', 'normal')
				doc.text('Nama dan Jenis Sarkut', pdf.ind.dtl, ln)
				doc.text(':', pdf.ind.dtl_cln, ln)
				doc.text(this.pdf_txt.sarkut.nama, pdf.ind.dtl_txt, ln)
				ln += pdf.font.height

				doc.text('No. Voy / Penerbangan / Trayek*', pdf.ind.dtl, ln)
				doc.text(':', pdf.ind.dtl_cln, ln)
				doc.text(this.pdf_txt.sarkut.flight, pdf.ind.dtl_txt, ln)
				ln += pdf.font.height

				doc.text('Ukuran / Kapasitas Muatan', pdf.ind.dtl, ln)
				doc.text(':', pdf.ind.dtl_cln, ln)
				doc.text(this.pdf_txt.sarkut.kapasitas, pdf.ind.dtl_txt, ln)
				ln += pdf.font.height

				doc.text('Nahkoda / Pilot / Pengemudi*', pdf.ind.dtl, ln)
				doc.text(':', pdf.ind.dtl_cln, ln)
				doc.text(this.pdf_txt.sarkut.pilot, pdf.ind.dtl_txt, ln)
				ln += pdf.font.height

				doc.text('Bendera*', pdf.ind.dtl, ln)
				doc.text(':', pdf.ind.dtl_cln, ln)
				doc.text(this.pdf_txt.sarkut.bendera, pdf.ind.dtl_txt, ln)
				ln += pdf.font.height

				doc.text('Nomor Register / Polisi', pdf.ind.dtl, ln)
				doc.text(':', pdf.ind.dtl_cln, ln)
				doc.text(this.pdf_txt.sarkut.no_reg, pdf.ind.dtl_txt, ln)
				ln += pdf.font.height

				// Penindakan barang
				doc.setFont('Helvetica', 'bold')
				doc.text('b.', pdf.ind.alp, ln)
				doc.text('Barang* :', pdf.ind.dtl, ln)
				ln += pdf.font.height

				doc.setFont('Helvetica', 'normal')
				doc.text(['Jumlah / Jenis / Ukuran Nomor', 'Peti Kemas / Kemasan'], pdf.ind.dtl, ln)
				ln += pdf.font.height
				doc.text(':', pdf.ind.dtl_cln, ln)
				doc.text(this.pdf_txt.barang.kemasan, pdf.ind.dtl_txt, ln)
				ln += pdf.font.height

				doc.text('Jumlah / Jenis Barang', pdf.ind.dtl, ln)
				doc.text(':', pdf.ind.dtl_cln, ln)
				let barang = (this.data.item_barang != null)
					? (this.data.item_barang.length > 0) 
						? (this.data.item_barang.length == 1)
							? this.data.item_barang[0]['jumlah_barang'] + ' '
								+ this.data.item_barang[0]['satuan_barang'] + ' '
								+ this.data.item_barang[0]['uraian_barang']
							: 'LIHAT LAMPIRAN'
						: ''
					: ''
				doc.text(barang, pdf.ind.dtl_txt, ln)
				ln += pdf.font.height

				doc.text('Jenis / Nomor dan Tgl Dokumen', pdf.ind.dtl, ln)
				doc.text(':', pdf.ind.dtl_cln, ln)
				doc.text(this.pdf_txt.barang.dokumen, pdf.ind.dtl_txt, ln)
				ln += pdf.font.height

				doc.text('Pemilik / Importir / Eksportir / Kuasa*', pdf.ind.dtl, ln)
				doc.text(':', pdf.ind.dtl_cln, ln)
				doc.text(this.pdf_txt.barang.pemilik, pdf.ind.dtl_txt, ln)
				ln += pdf.font.height

				// Penindakan bangunan
				doc.setFont('Helvetica', 'bold')
				doc.text('c.', pdf.ind.alp, ln)
				doc.text('Bangunan atau tempat* :', pdf.ind.dtl, ln)
				ln += pdf.font.height

				doc.setFont('Helvetica', 'normal')
				doc.text('Alamat', pdf.ind.dtl, ln)
				doc.text(':', pdf.ind.dtl_cln, ln)
				doc.text(this.pdf_txt.bangunan.alamat, pdf.ind.dtl_txt, ln)
				ln += pdf.font.height

				doc.text('No Reg Bangunan / NPPBKC / dll.', pdf.ind.dtl, ln)
				doc.text(':', pdf.ind.dtl_cln, ln)
				doc.text(this.pdf_txt.bangunan.no_reg, pdf.ind.dtl_txt, ln)
				ln += pdf.font.height

				doc.text('Nama Pemilik / Yang Menguasai*', pdf.ind.dtl, ln)
				doc.text(':', pdf.ind.dtl_cln, ln)
				doc.text(this.pdf_txt.bangunan.pemilik, pdf.ind.dtl_txt, ln)
				ln += pdf.font.height

				// Penindakan badan
				doc.setFont('Helvetica', 'bold')
				doc.text('d.', pdf.ind.alp, ln)
				doc.text('Badan* :', pdf.ind.dtl, ln)
				ln += pdf.font.height

				doc.setFont('Helvetica', 'normal')
				doc.text('Nama', pdf.ind.dtl, ln)
				doc.text(':', pdf.ind.dtl_cln, ln)
				doc.text(this.pdf_txt.badan.nama, pdf.ind.dtl_txt, ln)
				ln += pdf.font.height

				doc.text('Tanggal Lahir', pdf.ind.dtl, ln)
				doc.text(':', pdf.ind.dtl_cln, ln)
				doc.text(this.pdf_txt.badan.tgl_lahir, pdf.ind.dtl_txt, ln)
				ln += pdf.font.height

				doc.text('Kewarganegaraan', pdf.ind.dtl, ln)
				doc.text(':', pdf.ind.dtl_cln, ln)
				doc.text(this.pdf_txt.badan.warga_negara, pdf.ind.dtl_txt, ln)
				ln += pdf.font.height

				doc.text('Alamat', pdf.ind.dtl, ln)
				doc.text(':', pdf.ind.dtl_cln, ln)
				doc.text(this.pdf_txt.badan.alamat, pdf.ind.dtl_txt, ln)
				ln += pdf.font.height

				doc.text('Nomor Identitas', pdf.ind.dtl, ln)
				doc.text(':', pdf.ind.dtl_cln, ln)
				doc.text(this.pdf_txt.badan.identitas, pdf.ind.dtl_txt, ln)
				ln += pdf.font.height

			doc.text('4.', pdf.ind.num, ln)
			doc.text('Lokasi Penindakan', pdf.ind.alp, ln)
			doc.text(':', pdf.ind.num_cln, ln)
			doc.text(this.pdf_txt.lokasi, pdf.ind.num_txt, ln)
			ln += pdf.font.height

			doc.text('5.', pdf.ind.num, ln)
			doc.text('Uraian Penindakan', pdf.ind.alp, ln)
			doc.text(':', pdf.ind.num_cln, ln)
			doc.text(this.pdf_txt.uraian, pdf.ind.num_txt, ln)
			ln += pdf.font.height*(((this.pdf_txt.uraian).length) ? ((this.pdf_txt.uraian).length) > 0 : 1)

			doc.text('6.', pdf.ind.num, ln)
			doc.text('Alasan Penindakan', pdf.ind.alp, ln)
			doc.text(':', pdf.ind.num_cln, ln)
			doc.text(this.pdf_txt.alasan, pdf.ind.num_txt, ln)
			ln += pdf.font.height

			doc.text('7.', pdf.ind.num, ln)
			doc.text('Jenis Pelanggaran', pdf.ind.alp, ln)
			doc.text(':', pdf.ind.num_cln, ln)
			doc.text(this.pdf_txt.jenis, pdf.ind.num_txt, ln)
			ln += pdf.font.height

			doc.text('8.', pdf.ind.num, ln)
			let tindakan = 'Tindakan yang diambil : pemeriksaan dihentikan / diijinkan meneruskan perjalanan / '
			tindakan += 'penegahan / penyegelan / dibawa ke Kantor Bea dan Cukai terdekat / '
			tindakan += 'dibawa ke Kantor Bea dan Cukai tempat kedudukan penjabat penerbit Surat Perintah / diserahkan kepada PPNS Bea dan Cukai*.'
			doc.text(tindakan, pdf.ind.alp, ln,{maxWidth: 180})
			ln += pdf.font.height*3

			doc.text('9.', pdf.ind.num, ln)
			doc.text('Waktu Penindakan', pdf.ind.alp, ln)
			ln += pdf.font.height
			doc.text('Dimulai tanggal', pdf.ind.alp, ln)
			doc.text(':', pdf.ind.num_cln, ln)
			doc.text(this.pdf_txt.wkt_mulai_penindakan, pdf.ind.num_txt, ln)
			ln += pdf.font.height
			doc.text('Berakhir', pdf.ind.alp, ln)
			doc.text(':', pdf.ind.num_cln, ln)
			doc.text(this.pdf_txt.wkt_selesai_penindakan, pdf.ind.num_txt, ln)
			ln += pdf.font.height

			doc.text('10.', pdf.ind.num, ln)
			doc.text('Hal yang terjadi', pdf.ind.alp, ln)
			doc.text(':', pdf.ind.num_cln, ln)
			doc.text(this.pdf_txt.hal_terjadi, pdf.ind.num_txt, ln)

			////// TTD //////

			let ln_tgl = ln + pdf.font.height*1.5
			let ln_jabatan_1 = ln_tgl + pdf.font.height
			let ln_nama_1 = ln_jabatan_1 + pdf.font.height*4
			let ln_nip_1 = ln_nama_1 + pdf.font.height
			let ln_nama_2 = ln_nip_1 + pdf.font.height*4
			let ln_nip_2 = ln_nama_2 + pdf.font.height

			// Pemilik/kuasa
			doc.text('Pengangkut / Pemilik / Kuasanya / Saksi*', pdf.ind.alp, ln_jabatan_1)
			doc.text(this.data.header.nama_pemilik, pdf.ind.alp, ln_nama_1)

			// Pejabat
			doc.text('Tangerang, ' + this.pdf_txt.tgl_sbp, pdf.ind.ttd, ln_tgl)
			doc.text('Pejabat yang melakukan penindakan,', pdf.ind.ttd, ln_jabatan_1)
			doc.text('..............', pdf.ind.ttd, ln_nama_1)
			doc.text('NIP ......', pdf.ind.ttd, ln_nip_1)

			doc.text('..............', pdf.ind.ttd, ln_nama_2)
			doc.text('NIP ......', pdf.ind.ttd, ln_nip_2)

			////// KETERANGAN //////

			let ln_coret = ln_nip_2 + pdf.font.height
			let ln_ket = ln_coret + pdf.font.height*2

			doc.setFont('Helvetica', 'italic')
			doc.setFontSize('7')
			doc.text('*Coret yang tidak perlu', pdf.ind.num, ln_coret)

			doc.setFontSize(pdf.font.size-1)
			let ket = 'Yang dimaksud dengan "barang yang dikuasai negara" adalah '
			ket += 'barang yang untuk sementara waktu penguasaannya berada pada negara '
			ket += 'sampai dapat ditentukan status barang yang sebenarnya. '
			ket += 'Perubahaan status ini dimaksudkan agar pejabat bea dan cukai '
			ket += 'dapat memproses barang tersebut secara administrasi sampai dapat dibuktikan '
			ket += 'bahwa telah terjadi kesalahan atau sama sekali tidak terjadi kesalahan.'
			doc.text(ket, pdf.ind.num, ln_ket, {maxWidth: 185})

			////// LAMPIRAN //////
			if (this.data.item_barang != null) {
				if (this.data.item_barang.length > 1) {
					doc.setFont('Helvetica', 'normal')
					ln = 10
					doc.addPage()

					////// NOMOR LAMPIRAN //////
					doc.setFontSize(pdf.font.size)
					doc.text('LAMPIRAN', pdf.ind.lamp, ln)
					ln += pdf.font.height
					doc.setFontSize(pdf.font.size - 2)
					doc.text('Surat Bukti Penindakan', pdf.ind.lamp, ln)
					ln += pdf.font.height
					doc.text(this.pdf_txt.no_sbp, pdf.ind.lamp, ln)
					ln += pdf.font.height
					doc.text('Tanggal : ' + this.pdf_txt.no_sbp, pdf.ind.lamp, ln)
					ln += pdf.font.height*3

					////// TABEL //////
					const tabelData = this.prepareItemData(this.data.item_barang)
					const tabelHead = [
						{header: 'No', dataKey: 'no'},
						{header: 'Uraian Barang', dataKey: 'uraian'},
						{header: 'Jumlah', dataKey: 'jumlah'},
					]

					doc.autoTable({
						columns: tabelHead,
						body: tabelData,
						margin: {top: ln},
						theme: 'grid',
						styles: {
							fontSize: pdf.font.size,
							textColor: 20,
							fillColor: null,
							lineWidth: 0.25,
							lineColor: 1,
						},
						headStyles: {
							halign: 'center'
						},
						columnStyles: {
							0: {
								cellWidth: 10,
								halign: 'center'
							},
							1: {minCellWidth: 50},
							2: {
								minCellWidth: 20,
								halign: 'center'
							},
						},
					})
				}
			}

			////// WATERMARK //////
			if ([100,101].includes(this.data.header.status.kode_status)) {
				doc = this.addWatermark(doc)	
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
.pdf-preview {
	min-width: 0 !important;
	width: 100% !important;
	position: inherit !important;
	transform: none !important;
}
.pdf-preview > button {
	display: none !important;
}
</style>