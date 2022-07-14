import converters from "../../helpers/converter";
import Pdf from "./PdfMain"

const ind_start = 10

const props = {
	font: {
		size: 10,
		height: 4
	},
	title_line: {
		start: 88,
		end: 122
	},
	ind: {
		sta: ind_start,
		cln1: ind_start+20,
		val1: ind_start+25,
		lbl2: ind_start+120,
		cln2: ind_start+145,
		val2: ind_start+150,
		plh: 118,
		ttd: 125,
	}
}

class PdfNi extends Pdf {
	constructor(data) {
		super(props);
		this.jenis_dok = 'NOTA INFORMASI'
		this.data = data
		this.ni = this.data.dokumen.ni
		this.prepareDocDate(this.ni.tanggal_dokumen)
	}

	generatePdf() {
		this.createHeader()
		this.createNomor(this.jenis_dok, '')

		// No & tanggal
		this.pdf.text('Nomor', this.props.ind.sta, this.ln)
		this.pdf.text(':', this.props.ind.cln1, this.ln)
		this.pdf.text(this.ni.no_dok_lengkap, this.props.ind.val1, this.ln)

		this.pdf.text('Referensi', this.props.ind.lbl2, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Tanggal', this.props.ind.sta, this.ln)
		this.pdf.text(':', this.props.ind.cln1, this.ln)
		this.pdf.text(this.full_tgl_dok, this.props.ind.val1, this.ln)

		this.pdf.text('Nomor LKAI', this.props.ind.lbl2, this.ln)
		this.pdf.text(':', this.props.ind.cln2, this.ln)
		this.pdf.text(this.ni.nomor_lkai, this.props.ind.val2, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Sifat', this.props.ind.sta, this.ln)
		this.pdf.text(':', this.props.ind.cln1, this.ln)
		this.pdf.text(this.ni.sifat, this.props.ind.val1, this.ln)

		this.pdf.text('Tanggal LKAI', this.props.ind.lbl2, this.ln)
		this.pdf.text(':', this.props.ind.cln2, this.ln)
		this.pdf.text(converters.fullDate(this.ni.tanggal_lkai), this.props.ind.val2, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Klasifikasi', this.props.ind.sta, this.ln)
		this.pdf.text(':', this.props.ind.cln1, this.ln)
		this.pdf.text(this.ni.klasifikasi, this.props.ind.val1, this.ln)
		this.ln += this.props.font.height*2

		// Uraian
		let txt_tujuan = this.ni.tujuan || ''
		this.pdf.text(`Yth. ${txt_tujuan}`, this.props.ind.sta, this.ln)
		this.ln += this.props.font.height

		let txt_op = '     Sehubungan dengan hasil analisis intelijen yang mengindikasikan adanya pelanggaran kepabeanan atau cukai, '
			+ 'dengan ini disampaikan informasi agar dapat dilakukan penelitian mendalam tentang informasi sebagai berikut:'
		this.pdf.text(txt_op, this.props.ind.sta, this.ln, {align: 'justify', maxWidth: 185})
		this.ln += this.props.font.height*3

		let arr_uraian = this.ni.uraian.split('\n')
		arr_uraian.forEach(par => {
			let text = converters.array_text(par, 120)
			this.pdf.text(par, this.props.ind.sta, this.ln, {align: 'left', maxWidth: 185})	
			this.ln += this.props.font.height*text.length
		});
		this.ln += this.props.font.height

		// Closing
		let txt_closing = 'Demikian disampaikan atas perhatian Bapak / Ibu / Saudara *) diucapkan terima kasih untuk mendapat perhatian.'
		this.pdf.text(txt_closing, this.props.ind.sta, this.ln)
		this.ln += this.props.font.height*4

		// TTD
		let txt_plh = this.ni.penerbit.plh == true ? 'Plh.' : ''
		this.pdf.text(txt_plh, this.props.ind.plh, this.ln)
		this.pdf.text(this.ni.penerbit.jabatan.jabatan, this.props.ind.ttd, this.ln)
		this.ln += this.props.font.height*5
		this.pdf.text(this.ni.penerbit.user.name, this.props.ind.ttd, this.ln)
		this.ln += this.props.font.height

		// CC
		this.pdf.text('Tembusan:', this.props.ind.sta, this.ln)
		let cc_num = 1
		this.ni.tembusan.forEach(element => {
			this.ln += this.props.font.height
			this.pdf.text(`${cc_num}. ${element}`, this.props.ind.sta, this.ln)
			cc_num += 1
		});

		////// WATERMARK //////
		if ([100].includes(this.ni.kode_status)) {
			this.watermark()
		}

		return this.pdf.output('datauristring')
	}
}

export default PdfNi