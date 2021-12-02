import converters from "../../helpers/converter";
import Pdf from "./PdfMain"

const props = {
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

class PdfSbp extends Pdf {
	constructor(data) {
		super(props);
		this.jenis_dok = 'SURAT BUKTI PENINDAKAN'
		this.data = data
		this.prepareDate()
	}

	generatePdf() {
		this.createHeader()
		this.createNomor(this.jenis_dok, 'Nomor: ' + this.data.dokumen.sbp.no_dok_lengkap)

		////// URAIAN TOP //////
		let txt_sprint = 'Dasar penindakan, Surat Perintah Nomor : ' 
			+ this.data.penindakan.sprint.nomor_sprint 
			+ ' tanggal ' + this.full_tgl_sprint + '.'
		this.pdf.text('1.', this.props.ind.num, this.ln)
		this.pdf.text(txt_sprint, 21, this.ln)
		this.ln += this.props.font.height

		let txt_perintah = 'Perintah yang dilaksanakan : '
			+ 'Penghentian, pemeriksaan, penegahan, penyegelan, '
			+ 'penghentian pembongkaran dan/atau penegahan di bidang HKI*.'
		this.pdf.text('2.', this.props.ind.num, this.ln)
		this.pdf.text(txt_perintah, 21, this.ln, {maxWidth: 180})
		this.ln += this.props.font.height*2

		this.pdf.text('3.', this.props.ind.num, this.ln)
		this.pdf.text('Obyek Penindakan:', this.props.ind.alp, this.ln)
		this.ln += this.props.font.height

		////// DETAIL //////
		let data_sarkut = (this.data.objek.type == 'sarkut') ? this.data.objek.data : null
		this.detailSarkut(data_sarkut)

		let data_barang = (this.data.objek.type == 'barang') ? this.data.objek.data : null
		this.detailBarang(data_barang)

		let data_bangunan = (this.data.objek.type == 'bangunan') ? this.data.objek.data : null
		this.detailBangunan(data_bangunan)

		let data_orang = (this.data.objek.type == 'orang') ? this.data.objek.data : null
		this.detailOrang(data_orang)

		////// URAIAN BOTTOM //////
		this.pdf.text('4.', this.props.ind.num, this.ln)
		this.pdf.text('Lokasi Penindakan', this.props.ind.alp, this.ln)
		this.pdf.text(':', this.props.ind.num_cln, this.ln)
		this.pdf.text(this.data.penindakan.lokasi_penindakan.replace('\n', ' '), this.props.ind.num_txt, this.ln)
		this.ln += this.props.font.height

		let txt_uraian = converters.array_text(this.data.dokumen.sbp.uraian_penindakan, 90)
		this.pdf.text('5.', this.props.ind.num, this.ln)
		this.pdf.text('Uraian Penindakan', this.props.ind.alp, this.ln)
		this.pdf.text(':', this.props.ind.num_cln, this.ln)
		this.pdf.text(txt_uraian, this.props.ind.num_txt, this.ln)
		this.ln += this.props.font.height*((txt_uraian.length) > 0 ? txt_uraian.length : 1)

		let txt_alasan = converters.array_text(this.data.dokumen.sbp.alasan_penindakan, 90)
		this.pdf.text('6.', this.props.ind.num, this.ln)
		this.pdf.text('Alasan Penindakan', this.props.ind.alp, this.ln)
		this.pdf.text(':', this.props.ind.num_cln, this.ln)
		this.pdf.text(txt_alasan, this.props.ind.num_txt, this.ln)
		this.ln += this.props.font.height*((txt_alasan.length) > 0 ? txt_alasan.length : 1)

		this.pdf.text('7.', this.props.ind.num, this.ln)
		this.pdf.text('Jenis Pelanggaran', this.props.ind.alp, this.ln)
		this.pdf.text(':', this.props.ind.num_cln, this.ln)
		this.pdf.text(this.data.dokumen.sbp.jenis_pelanggaran, this.props.ind.num_txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('8.', this.props.ind.num, this.ln)
		let tindakan = 'Tindakan yang diambil : pemeriksaan dihentikan / diijinkan meneruskan perjalanan / '
			+ 'penegahan / penyegelan / dibawa ke Kantor Bea dan Cukai terdekat / '
			+ 'dibawa ke Kantor Bea dan Cukai tempat kedudukan penjabat penerbit Surat Perintah / diserahkan kepada PPNS Bea dan Cukai*.'
		this.pdf.text(tindakan, this.props.ind.alp, this.ln,{maxWidth: 180})
		this.ln += this.props.font.height*3

		let txt_mulai_penindakan = this.data.dokumen.sbp.wkt_mulai_penindakan.replace(" ", " jam ")
		let txt_selesai_penindakan = this.data.dokumen.sbp.wkt_selesai_penindakan.replace(" ", " jam ")
		this.pdf.text('9.', this.props.ind.num, this.ln)
		this.pdf.text('Waktu Penindakan', this.props.ind.alp, this.ln)
		this.ln += this.props.font.height
		this.pdf.text('Dimulai tanggal', this.props.ind.alp, this.ln)
		this.pdf.text(':', this.props.ind.num_cln, this.ln)
		this.pdf.text(txt_mulai_penindakan, this.props.ind.num_txt, this.ln)
		this.ln += this.props.font.height
		this.pdf.text('Berakhir', this.props.ind.alp, this.ln)
		this.pdf.text(':', this.props.ind.num_cln, this.ln)
		this.pdf.text(txt_selesai_penindakan, this.props.ind.num_txt, this.ln)
		this.ln += this.props.font.height

		let txt_hal_terjadi = converters.array_text(this.data.dokumen.sbp.hal_terjadi, 90)
		this.pdf.text('10.', this.props.ind.num, this.ln)
		this.pdf.text('Hal yang terjadi', this.props.ind.alp, this.ln)
		this.pdf.text(':', this.props.ind.num_cln, this.ln)
		this.pdf.text(txt_hal_terjadi, this.props.ind.num_txt, this.ln)
		this.ln += this.props.font.height*((txt_hal_terjadi.length) > 0 ? txt_hal_terjadi.length : 1)

		////// TTD //////
		let txt_saksi = 'Pengangkut/Pemilik/Kuasanya/Saksi*'
		let txt_pejabat = 'Pejabat yang melakukan penindakan,'
		this.ttd(txt_saksi, txt_pejabat, 1, 4)

		////// KETERANGAN //////
		this.ln += this.props.font.height
		this.pdf.setFont('Helvetica', 'italic')
		this.pdf.setFontSize('7')
		this.pdf.text('*Coret yang tidak perlu', this.props.ind.num, this.ln)
		this.ln += this.props.font.height*1

		this.pdf.setFontSize(this.props.font.size-1)
		let ket = 'Yang dimaksud dengan "barang yang dikuasai negara" adalah '
		ket += 'barang yang untuk sementara waktu penguasaannya berada pada negara '
		ket += 'sampai dapat ditentukan status barang yang sebenarnya. '
		ket += 'Perubahaan status ini dimaksudkan agar pejabat bea dan cukai '
		ket += 'dapat memproses barang tersebut secara administrasi sampai dapat dibuktikan '
		ket += 'bahwa telah terjadi kesalahan atau sama sekali tidak terjadi kesalahan.'
		this.pdf.text(ket, this.props.ind.num, this.ln, {maxWidth: 185})

		////// LAMPIRAN //////
		if (this.data.objek.type == 'barang') {
			if (this.data.objek.data.item.length > 1) {
				this.pdf.setFont('Helvetica', 'normal')
				this.pdf.addPage()
				// Header
				this.headerLampiran(this.data.dokumen.sbp.no_dok_lengkap)
				// Tabel barang
				this.tabelBarang()
			}
		}

		////// WATERMARK //////
		if ([100,101].includes(this.data.dokumen.sbp.kode_status)) {
			this.watermark()
		}
		
		return this.pdf.output('datauristring')
	}
}

export default PdfSbp