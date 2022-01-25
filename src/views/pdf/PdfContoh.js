import converters from "../../helpers/converter";
import Pdf from "./PdfMain"

const props = {
	font: {
		size: 10,
		height: 4
	},
	title_line: {
		start: 60,
		end: 150
	},
	ind: {
		alp: 15,
		dtl: 21,
		cln: 70,
		txt: 73,
		itm: 75,
		cln2: 60,
		txt2: 63,
		cln3: 75,
		txt3: 78,
		ttd:125,
		lamp: 140
	}
}

class PdfContoh extends Pdf {
	constructor(data) {
		super(props);
		this.jenis_dok = 'BERITA ACARA PENGAMBILAN CONTOH BARANG'
		this.data = data
		this.prepareDocDate(this.data.tanggal_dokumen)
		this.prepareSprintDate(this.data.sprint.tanggal_sprint)
	}

	generatePdf() {
		this.createHeader()
		this.createNomor(this.jenis_dok, 'Nomor: ' + this.data.no_dok_lengkap)

		////// URAIAN TOP //////
		let txt_waktu = `Pada hari ini ${this.hr} tanggal ${this.tgl} bulan ${this.bln} tahun ${this.thn}.`
		this.pdf.text(txt_waktu, this.props.ind.dtl, this.ln)
		this.ln += this.props.font.height

		let txt_sprint = 'Berdasarkan Surat Perintah : Kepala Bidang Penindakan dan Penyidikan Nomor ' 
			+ this.data.sprint.nomor_sprint 
			+ ' tanggal ' + this.full_tgl_sprint + '.'
		let arr_sprint = converters.array_text(txt_sprint, 105)
		this.pdf.text(arr_sprint, this.props.ind.alp, this.ln)
		this.ln += this.props.font.height*(arr_sprint.length + 1)

		////// DETAIL //////
		let txt_pernyataan = 'Kami yang bertanda tangan di bawah ini, telah melakukan pengambilan barang contoh atas:'
		let arr_pernyataan = converters.array_text(txt_pernyataan, 105)
		this.pdf.text(arr_pernyataan, this.props.ind.alp, this.ln)
		this.ln += this.props.font.height*arr_pernyataan.length

		// Barang
		this.pdf.text('Jumlah dan Jenis Barang', this.props.ind.alp, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		if (this.data.barang != null) {
			if (this.data.barang.data.item.length > 1) {
				this.data.barang.data.item.forEach(brg => {
					let txt_barang = `${brg.jumlah_barang} ${brg.satuan_barang} ${brg.uraian_barang}`
					let arr_barang = converters.array_text(txt_barang, 75)
					this.pdf.text('-', this.props.ind.txt, this.ln)
					this.pdf.text(arr_barang, this.props.ind.itm, this.ln)
					this.ln += this.props.font.height*arr_barang.length
				});	
			} else if (this.data.barang.data.item.length == 1) {
				let brg = this.data.barang.data.item[0]
				let txt_barang = `${brg.jumlah_barang} ${brg.satuan_barang} ${brg.uraian_barang}`
				let arr_barang = converters.array_text(txt_barang, 75)
				this.pdf.text(arr_barang, this.props.ind.txt, this.ln)
				this.ln += this.props.font.height*arr_barang.length
			} else {
				this.ln += this.props.font.height
			}
		} else {
			this.ln += this.props.font.height
		}

		// Pemilik
		let txt_pemilik = 'Pemilik/Importir/Eksportir/Yang Menguasai*'
		let arr_pemilik = converters.array_text(txt_pemilik, 35)
		this.pdf.text(arr_pemilik, this.props.ind.alp, this.ln)
		this.ln += this.props.font.height*(arr_pemilik.length - 1)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let txt_nama_pemilik = this.data.barang != null ? this.data.barang.data.pemilik.nama : ''
		this.pdf.text(txt_nama_pemilik, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		// Identitas
		this.pdf.text('Identitas', this.props.ind.alp, this.ln)
		this.ln += this.props.font.height
		this.pdf.text('(KTP/NPWP/NPPBKC*)', this.props.ind.alp, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let txt_identitas = this.data.barang != null
			? `(${this.data.barang.data.pemilik.jenis_identitas}) ${this.data.barang.data.pemilik.nomor_identitas}`
			: ''
		this.pdf.text(txt_identitas, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		// Dokumen
		this.pdf.text('Jenis/Nomor dan Tgl. Dokumen', this.props.ind.alp, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let txt_dokumen = this.data.barang != null
			? `${this.data.barang.data.dokumen.jns_dok} ${this.data.barang.data.dokumen.no_dok}`
				+ ` tanggal ${this.data.barang.data.dokumen.tgl_dok}`
			: ''
		this.pdf.text(txt_dokumen, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		// Lokasi
		this.pdf.text('Lokasi', this.props.ind.alp, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let txt_lokasi = converters.string(this.data.lokasi).replace('\n', ' ')
		this.pdf.text(txt_lokasi, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height*2

		////// DETAIL //////
		let txt_disaksikan = 'Pengambilan contoh disaksikan oleh pengangkut/pemilik/importir/eksportir atau kuasanya*:'
		let arr_saksi = converters.array_text(txt_disaksikan, 110)
		this.pdf.text(arr_saksi, this.props.ind.alp, this.ln)
		this.ln += this.props.font.height*arr_saksi.length

		this.pdf.text('Nama', this.props.ind.alp, this.ln)
		this.pdf.text(':', this.props.ind.cln2, this.ln)
		this.pdf.text(converters.string(this.data.saksi.nama), this.props.ind.txt2, this.ln)
		this.ln += this.props.font.height
		this.pdf.text('Alamat', this.props.ind.alp, this.ln)
		this.pdf.text(':', this.props.ind.cln2, this.ln)
		this.pdf.text(converters.string(this.data.saksi.alamat).replace('\n', ' '), this.props.ind.txt2, this.ln)
		this.ln += this.props.font.height
		this.pdf.text('Pekerjaan', this.props.ind.alp, this.ln)
		this.pdf.text(':', this.props.ind.cln2, this.ln)
		this.pdf.text(converters.string(this.data.saksi.pekerjaan), this.props.ind.txt2, this.ln)
		this.ln += this.props.font.height
		this.pdf.text('Identitas (KTP/SIM/Paspor*)', this.props.ind.alp, this.ln)
		this.pdf.text(':', this.props.ind.cln2, this.ln)
		let txt_identitas_saksi = converters.string(this.data.saksi.nomor_identitas)
			+ converters.string_format(converters.string(this.data.saksi.jenis_identitas), ' ({})')
		this.pdf.text(txt_identitas_saksi, this.props.ind.txt2, this.ln)
		this.ln += this.props.font.height*2

		this.pdf.text('Demikian Berita Acara ini dibuat dengan sebenarnya.', this.props.ind.dtl, this.ln)

		////// TTD //////
		this.ln += this.props.font.height
		let txt_saksi = 'Orang yang menyaksikan'
		let txt_pejabat = 'Pejabat yang mengambil contoh,'
		this.ttd(txt_saksi, txt_pejabat, this.data.saksi, this.data.petugas1, this.data.petugas2)

		////// KETERANGAN //////
		this.ln += this.props.font.height
		this.pdf.setFont('Helvetica', 'italic')
		this.pdf.text('*Coret yang tidak perlu', this.props.ind.alp, this.ln)

		////// WATERMARK //////
		if ([100].includes(this.data.dokumen.contoh.kode_status)) {
			this.watermark()
		}

		return this.pdf.output('datauristring')
	}
}

export default PdfContoh