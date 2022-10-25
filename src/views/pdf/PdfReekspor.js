import converters from "../../helpers/converter";
import Pdf from "./PdfMain"

const props = {
	font: {
		size: 10,
		height: 4
	},
	title_line: {
		start: 50,
		end: 160
	},
	ind: {
		alp: 15,
		lbl: 21,
		cln: 40,
		txt: 43,
		lbl2: 100,
		cln2: 110,
		txt2: 113,
		cln3: 60,
		txt3: 63,
		lbl4: 130,
		cln4: 145,
		txt4: 148,
		ttd:125,
	}
}

class PdfReekspor extends Pdf {
	constructor(data) {
		super(props);
		this.jenis_dok = 'BERITA ACARA PENGAWASAN BARANG DIEKSPOR KEMBALI'
		this.data = data
		this.prepareDocDate(this.data.dokumen.reekspor.tanggal_dokumen)
	}

	generatePdf() {
		this.createHeader()
		this.createNomor(this.jenis_dok, 'Nomor: ' + this.data.dokumen.reekspor.no_dok_lengkap)

		////// URAIAN TOP //////
		let txt_waktu = `Pada hari ini ${this.hr} tanggal ${this.tgl} bulan ${this.bln} tahun ${this.thn}.`
		this.pdf.text(txt_waktu, this.props.ind.lbl, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Kami yang bertanda tangan di bawah ini:', this.props.ind.alp, this.ln)
		this.ln += this.props.font.height

		// Petugas 1
		this.pdf.text('1.', this.props.ind.alp, this.ln)
		this.pdf.text('Nama', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(this.data.dokumen.reekspor.petugas1.name, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Pangkat', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(this.data.dokumen.reekspor.petugas1.pangkat, this.props.ind.txt, this.ln)

		this.pdf.text('NIP', this.props.ind.lbl2, this.ln)
		this.pdf.text(':', this.props.ind.cln2, this.ln)
		this.pdf.text(this.data.dokumen.reekspor.petugas1.nip, this.props.ind.txt2, this.ln)
		this.ln += this.props.font.height*2

		// Petugas 2
		if (this.data.dokumen.reekspor.petugas2 != null) {
			let petugas2 = this.data.dokumen.reekspor.petugas2
			var petugas2_name = petugas2.name
			var petugas2_pangkat = petugas2.pangkat
			var petugas2_nip = petugas2.nip
		} else {
			var petugas2_name = ''
			var petugas2_pangkat = ''
			var petugas2_nip = ''
		}

		this.pdf.text('2.', this.props.ind.alp, this.ln)
		this.pdf.text('Nama', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(petugas2_name, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Pangkat', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(petugas2_pangkat, this.props.ind.txt, this.ln)

		this.pdf.text('NIP', this.props.ind.lbl2, this.ln)
		this.pdf.text(':', this.props.ind.cln2, this.ln)
		this.pdf.text(petugas2_nip, this.props.ind.txt2, this.ln)
		this.ln += this.props.font.height*2

		// Dasar hukum
		let txt_hukum = 'Berdasarkan pasal 74 Undang-Undang Republik Indonesia Nomor 17 Tahun 2006 '
			+ 'tentang Perubahan Undang-Undang Nomor 10 Tahun 1995 tentang Kepabeanan, '
			+ 'telah melakukan pengawasan atas barang yang diekspor kembali eks '
			+ this.data.dokumen.reekspor.jenis_dok_asal
			+ ' nomor ' 
			+ this.data.dokumen.reekspor.nomor_dok_asal
			+ ' dengan dokumen:'
		let arr_hukum = converters.array_text(txt_hukum, 105)
		this.pdf.text(arr_hukum, this.props.ind.alp, this.ln)
		this.ln += this.props.font.height*arr_hukum.length

		////// DETIL //////
		// Dok ekspor
		let txt_dok_ekspor = `${this.data.dokumen.reekspor.jenis_dok_ekspor} ${this.data.dokumen.reekspor.nomor_dok_ekspor}`
		this.pdf.text('BC 3.0/1.2 Nomor', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		this.pdf.text(txt_dok_ekspor, this.props.ind.txt3, this.ln)

		this.pdf.text('Tanggal', this.props.ind.lbl4, this.ln)
		this.pdf.text(':', this.props.ind.cln4, this.ln)
		this.pdf.text(this.data.dokumen.reekspor.tanggal_dok_ekspor, this.props.ind.txt4, this.ln)
		this.ln += this.props.font.height

		// MAWB
		let txt_nomor_mawb = this.data.dokumen.reekspor.nomor_mawb || ''
		this.pdf.text('MAWB', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		this.pdf.text(txt_nomor_mawb, this.props.ind.txt3, this.ln)

		let txt_tanggal_mawb = this.data.dokumen.reekspor.tanggal_mawb || ''
		this.pdf.text('Tanggal', this.props.ind.lbl4, this.ln)
		this.pdf.text(':', this.props.ind.cln4, this.ln)
		this.pdf.text(txt_tanggal_mawb, this.props.ind.txt4, this.ln)
		this.ln += this.props.font.height

		// HAWB
		let txt_nomor_hawb = this.data.dokumen.reekspor.nomor_hawb || ''
		this.pdf.text('HAWB', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		this.pdf.text(txt_nomor_hawb, this.props.ind.txt3, this.ln)

		let txt_tanggal_hawb = this.data.dokumen.reekspor.tanggal_hawb || ''
		this.pdf.text('Tanggal', this.props.ind.lbl4, this.ln)
		this.pdf.text(':', this.props.ind.cln4, this.ln)
		this.pdf.text(txt_tanggal_hawb, this.props.ind.txt4, this.ln)
		this.ln += this.props.font.height

		// Pesawat
		let txt_nama_sarkut = this.data.dokumen.reekspor.nama_sarkut || ''
		this.pdf.text('Dimuat di pesawat', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		this.pdf.text(txt_nama_sarkut, this.props.ind.txt3, this.ln)
		this.ln += this.props.font.height

		let txt_nomor_flight = this.data.dokumen.reekspor.nomor_flight || ''
		this.pdf.text('Nomor penerbangan', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		this.pdf.text(txt_nomor_flight, this.props.ind.txt3, this.ln)

		let txt_tanggal_flight = this.data.dokumen.reekspor.tanggal_flight || ''
		this.pdf.text('Tanggal', this.props.ind.lbl4, this.ln)
		this.pdf.text(':', this.props.ind.cln4, this.ln)
		this.pdf.text(txt_tanggal_flight, this.props.ind.txt4, this.ln)
		this.ln += this.props.font.height

		let txt_nomor_reg_sarkut = this.data.dokumen.reekspor.nomor_reg_sarkut || ''
		this.pdf.text('Nomor register', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		this.pdf.text(txt_nomor_reg_sarkut, this.props.ind.txt3, this.ln)
		this.ln += this.props.font.height*2
	
		////// URAIAN BOTTOM //////
		// Kedapatan
		let txt_kedapatan = 'Atas pengawasan barang yang akan diekspor kembali kedapatan jumlah, jenis, nomor, dan merk barang/kemasan:'
		this.pdf.text(txt_kedapatan, this.props.ind.alp, this.ln)
		this.ln += this.props.font.height

		let arr_ur_kedapatan = converters.array_text(this.data.dokumen.reekspor.kedapatan, 100)
		this.pdf.text(arr_ur_kedapatan, this.props.ind.alp, this.ln)
		this.ln += this.props.font.height*(arr_ur_kedapatan.length + 1)

		// Saksi
		let txt_disaksikan = 'Pengawasan disaksikan oleh pengangkut/pemilik barang/kuasanya:'
		this.pdf.text(txt_disaksikan, this.props.ind.alp, this.ln)
		this.ln += this.props.font.height
		
		this.pdf.text('Nama', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(this.data.dokumen.reekspor.saksi.nama, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Pekerjaan', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(this.data.dokumen.reekspor.saksi.pekerjaan, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height*2

		this.pdf.text('Demikian Berita Acara ini dibuat dengan sebenarnya.', this.props.ind.alp, this.ln)

		////// TTD //////
		this.ln += this.props.font.height
		let txt_saksi = 'Yang menyaksikan'
		let txt_pejabat = 'Yang melakukan pengawasan,'
		this.ttd(txt_saksi, txt_pejabat, this.data.dokumen.reekspor.saksi, this.data.dokumen.reekspor.petugas1, this.data.dokumen.reekspor.petugas2)

		////// WATERMARK //////
		if ([100].includes(this.data.dokumen.reekspor.kode_status)) {
			this.watermark()
		}

		return this.pdf.output('datauristring')
	}
}

export default PdfReekspor