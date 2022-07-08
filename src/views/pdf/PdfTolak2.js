import converters from "../../helpers/converter";
import Pdf from "./PdfMain"

const props = {
	font: {
		size: 10,
		height: 4
	},
	title_line: [
		{
			start: 65,
			end: 145,
		},
		{
			start: 30,
			end: 180
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

class PdfTolak2 extends Pdf {
	constructor(data) {
		super(props);
		this.jenis_dok = ['BERITA ACARA PENOLAKAN TANDA TANGAN', 'TERHADAP BERITA ACARA PENOLAKAN TANDA TANGAN SURAT BUKTI PENINDAKAN']
		this.data = data
		this.prepareDocDate()
		this.prepareSprintDate()
	}

	generatePdf() {
		this.createHeader()
		this.createNomor(this.jenis_dok, 'Nomor: ' + this.data.dokumen.tolak2.no_dok_lengkap)

		////// URAIAN TOP //////
		let txt_waktu = 'Pada hari ini ' + this.hr + ' tanggal ' + this.tgl + ' bulan ' + this.bln + ' tahun ' + this.thn + '.'
		this.pdf.text(txt_waktu, this.props.ind.dtl, this.ln)
		this.ln += this.props.font.height

		let txt_sprint = 'Berdasarkan Surat Perintah : Kepala Bidang Penindakan dan Penyidikan Nomor ' 
			+ this.data.penindakan.sprint.nomor_sprint 
			+ ' tanggal ' + this.full_tgl_sprint + '.'
		let arr_sprint = converters.array_text(txt_sprint, 105)
		this.pdf.text(arr_sprint, this.props.ind.alp, this.ln)
		this.ln += this.props.font.height*arr_sprint.length

		let txt_pernyataan = 'Kami yang bertanda tangan di bawah ini menyatakan bahwa setelah dibacakan Berita Acara Penolakan Tanda Tangan Surat Bukti Penindakan nomor '
			+ this.data.dokumen.tolak1.no_dok_lengkap
			+ ' tanggal ' + this.full_tgl_dok + '.'
		let arr_pernyataan = converters.array_text(txt_pernyataan, 105)
		this.pdf.text(arr_pernyataan, this.props.ind.alp, this.ln)
		this.ln += this.props.font.height*(arr_pernyataan.length+1)

		this.pdf.text('Saudara:', this.props.ind.alp, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Nama', this.props.ind.alp, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(this.data.penindakan.saksi.nama, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Tempat/tanggal lahir', this.props.ind.alp, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(this.data.penindakan.saksi.tanggal_lahir, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Jenis kelamin', this.props.ind.alp, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let txt_jenis_kelamin = ''
		switch (this.data.penindakan.saksi.jenis_kelamin) {
			case 'F':
				txt_jenis_kelamin = 'Perempuan'
				break;

			case 'M':
				txt_jenis_kelamin = 'Laki-laki'
				break;
		
			default:
				break;
		}
		this.pdf.text(txt_jenis_kelamin, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Agama', this.props.ind.alp, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(this.data.penindakan.saksi.agama, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Kewarganegaraan', this.props.ind.alp, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let txt_warga_negara = ''
		if (this.data.penindakan.saksi.warga_negara) {
			txt_warga_negara = this.data.penindakan.saksi.warga_negara.nama_negara
		}
		this.pdf.text(txt_warga_negara, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Pekerjaan', this.props.ind.alp, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(this.data.penindakan.saksi.pekerjaan, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Alamat', this.props.ind.alp, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(this.data.penindakan.saksi.alamat_identitas.replace('\n', ' '), this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		let txt_penolakan = 'menolak untuk menandatangani Berita Acara Penolakan Tanda Tangan Surat Bukti Penindakan tersebut di atas dengan alasan:'
		let arr_penolakan = converters.array_text(txt_penolakan, 105)
		this.pdf.text(arr_penolakan, this.props.ind.alp, this.ln)
		this.ln += this.props.font.height*arr_penolakan.length

		let arr_alasan = converters.array_text(this.data.dokumen.tolak2.alasan, 105)
		this.pdf.text(arr_alasan, this.props.ind.alp, this.ln)
		this.ln += this.props.font.height*arr_alasan.length

		let txt_tanpa_alasan = 'atau tanpa alasan yang jelas / tidak ada alasan*.'
		this.pdf.text(txt_tanpa_alasan, this.props.ind.alp, this.ln)
		this.ln += this.props.font.height*2

		let txt_dibuat = 'Demikian Berita Acara ini dibuat dengan sebenarnya atas kekuatan sumpah jabatan.'
		this.pdf.text(txt_dibuat, this.props.ind.alp, this.ln)
		this.ln += this.props.font.height

		////// TTD //////
		let txt_saksi = 'Saksi,'
		let txt_pejabat = 'Pejabat Bea dan Cukai,'
		this.ttd(txt_saksi, txt_pejabat, this.data.dokumen.tolak2.saksi, this.data.dokumen.tolak2.petugas1, this.data.dokumen.tolak2.petugas2)

		////// KETERANGAN //////
		this.ln + this.props.font.height
		this.pdf.setFont('Helvetica', 'italic')
		this.pdf.setFontSize('7')
		this.pdf.text('*Coret yang tidak perlu', this.props.ind.alp, this.ln)

		////// WATERMARK //////
		if ([100].includes(this.data.dokumen.tolak2.kode_status)) {
			this.watermark()
		}

		return this.pdf.output('datauristring')
	}
}

export default PdfTolak2