import converters from "../../helpers/converter";
import Pdf from "./PdfMain"

const props = {
	font: {
		size: 10,
		height: 4
	},
	title_line: {
		start: 79,
		end: 131
	},
	ind: {
		alp: 15,
		dtl: 21,
		cln: 85,
		txt: 88,
		cln2: 45,
		txt2: 48,
		ttd:125,
		lamp: 140
	}
}

class PdfTegah extends Pdf {
	constructor(data) {
		super(props);
		this.jenis_dok = 'BERITA ACARA PENEGAHAN'
		this.data = data
		this.prepareDate()
	}

	generatePdf() {
		this.createHeader()
		this.createNomor(this.jenis_dok, 'Nomor: ' + this.data.dokumen.tegah.no_dok_lengkap)

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

		let txt_pernyataan = 'Kami yang bertanda tangan di bawah ini dalam rangka pengamanan hak-hak negara, telah melakukan penegahan terhadap:'
		let arr_pernyataan = converters.array_text(txt_pernyataan, 105)
		this.pdf.text(arr_pernyataan, this.props.ind.alp, this.ln)
		this.ln += this.props.font.height*arr_pernyataan.length

		////// DETAIL //////
		let data_sarkut = (this.data.objek.type == 'sarkut') ? this.data.objek.data : null
		this.detailSarkut(data_sarkut)

		let data_barang = (this.data.objek.type == 'barang') ? this.data.objek.data : null
		this.detailBarang(data_barang)

		////// URAIAN BOTTOM //////
		let txt_disaksikan = 'Penegahan disaksikan oleh pengangkut/pemilik/importir/eksportir '
			+ 'atau kuasanya/ketua lingkungan/dll*:'
		let arr_saksi = converters.array_text(txt_disaksikan, 110)
		this.pdf.text(arr_saksi, this.props.ind.alp, this.ln)
		this.ln += this.props.font.height*arr_saksi.length

		this.pdf.text('Nama', this.props.ind.alp, this.ln)
		this.pdf.text(':', this.props.ind.cln2, this.ln)
		this.pdf.text(converters.string(this.data.penindakan.saksi.nama), this.props.ind.txt2, this.ln)
		this.ln += this.props.font.height
		this.pdf.text('Alamat', this.props.ind.alp, this.ln)
		this.pdf.text(':', this.props.ind.cln2, this.ln)
		this.pdf.text(converters.string(this.data.penindakan.saksi.alamat).replace('\n', ' '), this.props.ind.txt2, this.ln)
		this.ln += this.props.font.height
		this.pdf.text('Pekerjaan', this.props.ind.alp, this.ln)
		this.pdf.text(':', this.props.ind.cln2, this.ln)
		this.pdf.text(converters.string(this.data.penindakan.saksi.pekerjaan), this.props.ind.txt2, this.ln)
		this.ln += this.props.font.height
		this.pdf.text('Nomor Identitas', this.props.ind.alp, this.ln)
		this.pdf.text(':', this.props.ind.cln2, this.ln)
		let txt_identitas = converters.string(this.data.penindakan.saksi.nomor_identitas)
			+ converters.string_format(converters.string(this.data.penindakan.saksi.jenis_identitas), ' ({})')
		this.pdf.text(txt_identitas, this.props.ind.txt2, this.ln)
		this.ln += this.props.font.height

		////// TTD //////
		let txt_saksi = 'Pemilik/Importir/Eksportir/Kuasanya/Saksi*'
		let txt_pejabat = 'Pejabat yang melakukan penegahan,'
		this.ttd(txt_saksi, txt_pejabat)

		////// KETERANGAN //////
		this.ln += this.props.font.height*3
		this.pdf.setFont('Helvetica', 'italic')

		let ket = 'Penegahan merupakan kewenangan administratif berdasarkan '
			+ 'Pasal 77 Undang-Undang nomor 10 tahun 1995 sebagaimana diubah terakhir dengan '
			+ 'Undang-Undang nomor 17 tahun 2006 tentang Kepabeanan dan '
			+ 'Pasal 33 Undang-Undang nomor 11 tahun 1995 sebagaimana diubah terakhir dengan '
			+ 'Undang-Undang nomor 39 tahun 2007 tentang Cukai.'
		let arr_ket = converters.array_text(ket, 105)
		this.pdf.text(arr_ket, this.props.ind.alp, this.ln)
		this.ln += this.props.font.height*(arr_ket.length + 1)

		this.pdf.text('*Coret yang tidak perlu', this.props.ind.alp, this.ln)

		////// LAMPIRAN //////
		if (this.data.objek.type == 'barang') {
			if (this.data.objek.data.item.length > 1) {
				this.pdf.setFont('Helvetica', 'normal')
				this.pdf.addPage()
				// Header
				this.headerLampiran(this.data.dokumen.tegah.no_dok_lengkap)
				// Tabel barang
				this.tabelBarang()
			}
		}

		////// WATERMARK //////
		if ([100,101].includes(this.data.dokumen.tegah.kode_status)) {
			this.watermark()
		}

		return this.pdf.output('datauristring')
	}
}

export default PdfTegah