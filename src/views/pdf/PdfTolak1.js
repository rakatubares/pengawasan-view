import converters from "../../helpers/converter";
import Pdf from "./PdfMain"

const props = {
	font: {
		size: 10,
		height: 4
	},
	title_line: [
		{
			start: 91,
			end: 119,
		},
		{
			start: 53.5,
			end: 156.5
		}
	],
	ind: {
		alp: 15,
		dtl: 21,
		cln: 50,
		txt: 53,
		cln2: 65,
		txt2: 68,
		ttd:125,
		lamp: 140
	}
}

class PdfTolak1 extends Pdf {
	constructor(data) {
		super(props);
		this.jenis_dok = ['BERITA ACARA', 'PENOLAKAN TANDA TANGAN SURAT BUKTI PENINDAKAN']
		this.data = data
		this.sbp_type = data.sbp_type
		this.prepareDocDate(this.data.tanggal_dokumen)
		this.prepareSprintDate(this.data.sprint.tanggal_sprint)
	}

	generatePdf() {
		this.createHeader()
		this.createNomor(this.jenis_dok, 'Nomor: ' + this.data.no_dok_lengkap)

		////// URAIAN TOP //////
		let txt_waktu = 'Pada hari ini ' + this.hr + ' tanggal ' + this.tgl + ' bulan ' + this.bln + ' tahun ' + this.thn + '.'
		this.pdf.text(txt_waktu, this.props.ind.dtl, this.ln)
		this.ln += this.props.font.height

		let txt_sprint = 'Berdasarkan Surat Perintah : Kepala Bidang Penindakan dan Penyidikan Nomor ' 
			+ this.data.sprint.nomor_sprint 
			+ ' tanggal ' + this.full_tgl_sprint + '.'
		let arr_sprint = converters.array_text(txt_sprint, 105)
		this.pdf.text(arr_sprint, this.props.ind.alp, this.ln)
		this.ln += this.props.font.height*arr_sprint.length

		let txt_pernyataan = 'Kami yang bertanda tangan di bawah ini menyatakan bahwa setelah dibacakan Surat Bukti Penindakan '
			+ this.data.nomor_sbp
			+ ' tanggal ' + this.data.tanggal_sbp + '.'
		let arr_pernyataan = converters.array_text(txt_pernyataan, 105)
		this.pdf.text(arr_pernyataan, this.props.ind.alp, this.ln)
		this.ln += this.props.font.height*(arr_pernyataan.length+1)

		this.pdf.text('Saudara:', this.props.ind.alp, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Nama', this.props.ind.alp, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(this.data.saksi.nama, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Tempat/tanggal lahir', this.props.ind.alp, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(this.data.saksi.tanggal_lahir, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Jenis kelamin', this.props.ind.alp, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(this.data.saksi.jenis_kelamin.uraian, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Agama', this.props.ind.alp, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(this.data.saksi.agama, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Kewarganegaraan', this.props.ind.alp, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let txt_warga_negara = ''
		if (this.data.saksi.warga_negara) {
			txt_warga_negara = this.data.saksi.warga_negara.nama_negara
		}
		this.pdf.text(txt_warga_negara, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Pekerjaan', this.props.ind.alp, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(this.data.saksi.pekerjaan, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Alamat', this.props.ind.alp, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(this.data.saksi.alamat_identitas.replace('\n', ' '), this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		let txt_penolakan = 'menolak untuk menandatangani Surat Bukti Penindakan tersebut di atas dengan alasan:'
		this.pdf.text(txt_penolakan, this.props.ind.alp, this.ln)
		this.ln += this.props.font.height

		let arr_alasan = converters.array_text(this.data.alasan, 105)
		this.pdf.text(arr_alasan, this.props.ind.alp, this.ln)
		this.ln += this.props.font.height*arr_alasan.length

		let txt_tanpa_alasan = 'atau tanpa alasan yang jelas / tidak ada alasan*.'
		this.pdf.text(txt_tanpa_alasan, this.props.ind.alp, this.ln)
		this.ln += this.props.font.height*2

		let txt_dibuat = 'Demikian Berita Acara ini dibuat dengan sebenarnya atas kekuatan sumpah jabatan.'
		this.pdf.text(txt_dibuat, this.props.ind.alp, this.ln)
		this.ln += this.props.font.height

		////// TTD //////
		let txt_saksi = 'Pemilik/Pengangkut/Kuasanya*'
		let txt_pejabat = 'Pejabat Bea dan Cukai,'
		this.ttd(txt_saksi, txt_pejabat, this.data.saksi, this.data.petugas1, this.data.petugas2)

		////// KETERANGAN //////
		this.ln + this.props.font.height
		this.pdf.setFont('Helvetica', 'italic')
		this.pdf.setFontSize('7')
		this.pdf.text('*Coret yang tidak perlu', this.props.ind.alp, this.ln)

		////// WATERMARK //////
		if ([100].includes(this.data.kode_status)) {
			this.watermark()
		}

		return this.pdf.output('datauristring')
	}
}

export default PdfTolak1