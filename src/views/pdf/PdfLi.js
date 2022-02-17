import converters from "../../helpers/converter";
import Pdf from "./PdfMain"

const ind_start = 10

const props = {
	font: {
		size: 10,
		height: 4
	},
	title_line: {
		start: 85,
		end: 125
	},
	ind: {
		sta: ind_start,
		cln: ind_start + 15,
		txt: ind_start + 18,
		cln2: ind_start + 50,
		txt2: ind_start + 53,
		ttd1: ind_start + 5,
		ttd2: 125,
	}
}

class PdfLi extends Pdf {
	constructor(data) {
		super(props);
		this.jenis_dok = 'LEMBAR INFORMASI'
		this.data = data
		this.prepareDocDate(this.data.dokumen.li.tanggal_dokumen)
	}

	generatePdf() {
		this.createHeader()

		this.pdf.setFont('Helvetica', 'bold')
		this.pdf.setFontSize(this.props.font.size)
		this.pdf.text(this.jenis_dok, 105, this.ln, 'center')
		this.pdf.line(this.props.title_line.start, this.ln+0.5, this.props.title_line.end, this.ln+0.5)
		this.pdf.setFont('Helvetica', 'normal')
		this.ln += this.props.font.height*2

		// Nomor
		this.pdf.text('Nomor', this.props.ind.sta, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(this.data.dokumen.li.no_dok_lengkap, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Tanggal', this.props.ind.sta, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(this.full_tgl_dok, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height*3

		// Uraian
		this.pdf.text('SUMBER / MEDIA INFORMASI', this.props.ind.sta, this.ln)
		this.pdf.text(':', this.props.ind.cln2, this.ln)
		let arr_sumber = converters.array_text(this.data.dokumen.li.sumber, 85)
		this.pdf.text(arr_sumber, this.props.ind.txt2, this.ln)
		let height_sumber = arr_sumber.length > 1 ? arr_sumber.length : 1
		this.ln += this.props.font.height*(height_sumber + 0.5)

		this.pdf.text('ISI INFORMASI', this.props.ind.sta, this.ln)
		this.pdf.text(':', this.props.ind.cln2, this.ln)
		let arr_informasi = converters.array_text(this.data.dokumen.li.informasi, 85)
		this.pdf.text(arr_informasi, this.props.ind.txt2, this.ln)
		let height_informasi = arr_informasi.length > 1 ? arr_informasi.length : 1
		this.ln += this.props.font.height*(height_informasi + 0.5)

		this.pdf.text('TINDAK LANJUT', this.props.ind.sta, this.ln)
		this.pdf.text(':', this.props.ind.cln2, this.ln)
		let arr_tindak_lanjut = converters.array_text(this.data.dokumen.li.tindak_lanjut, 85)
		this.pdf.text(arr_tindak_lanjut, this.props.ind.txt2, this.ln)
		let height_tindak_lanjut = arr_tindak_lanjut.length > 1 ? arr_tindak_lanjut.length : 1
		this.ln += this.props.font.height*(height_tindak_lanjut + 0.5)

		this.pdf.text('CATATAN', this.props.ind.sta, this.ln)
		this.pdf.text(':', this.props.ind.cln2, this.ln)
		let arr_catatan = converters.array_text(this.data.dokumen.li.catatan, 85)
		this.pdf.text(arr_catatan, this.props.ind.txt2, this.ln)
		let height_catatan = arr_catatan.length > 1 ? arr_catatan.length : 1
		this.ln += this.props.font.height*(height_catatan + 2)

		////// TTD //////
		let ln_tgl_ttd = this.ln
		let ln_ttd_jabatan = ln_tgl_ttd + this.props.font.height
		let ln_ttd_nama = ln_ttd_jabatan + this.props.font.height*5
		let ln_ttd_nip = ln_ttd_nama + this.props.font.height
		this.ln = ln_ttd_nip + this.props.font.height*3

		this.pdf.text(this.data.dokumen.li.atasan.jabatan.jabatan, this.props.ind.ttd1, ln_ttd_jabatan)
		this.pdf.text(this.data.dokumen.li.atasan.user.name, this.props.ind.ttd1, ln_ttd_nama)
		this.pdf.text('NIP. ' + this.data.dokumen.li.atasan.user.nip, this.props.ind.ttd1, ln_ttd_nip)
		
		this.pdf.text(this.data.dokumen.li.penerbit.jabatan.jabatan, this.props.ind.ttd2, ln_ttd_jabatan)
		this.pdf.text(this.data.dokumen.li.penerbit.user.name, this.props.ind.ttd2, ln_ttd_nama)
		this.pdf.text('NIP. ' + this.data.dokumen.li.penerbit.user.nip, this.props.ind.ttd2, ln_ttd_nip)

		////// WATERMARK //////
		if ([100].includes(this.data.dokumen.li.kode_status)) {
			this.watermark()
		}

		return this.pdf.output('datauristring')
	}
}

export default PdfLi