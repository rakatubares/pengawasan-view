import converters from "../../helpers/converter";
import Pdf from "./PdfMain"

const props = {
	font: {
		size: 10,
		height: 4
	},
	title_line: {
		start: 77.5,
		end: 132.5
	},
	ind: {
		alp: 15,
		dtl: 21,
		cln: 85,
		txt: 88,
		cln2: 65,
		txt2: 68,
		ttd:125,
		lamp: 140
	}
}

class PdfSegel extends Pdf {
	constructor(data) {
		super(props);
		this.jenis_dok = 'BERITA ACARA PENYEGELAN'
		this.data = data
		this.prepareDate()
	}

	generatePdf() {
		this.createHeader()
		this.createNomor(this.jenis_dok, 'Nomor: ' + this.data.dokumen.segel.no_dok_lengkap)

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

		let txt_pernyataan = 'Kami yang bertanda tangan di bawah ini telah melakukan penyegelan atas:'
		this.pdf.text(txt_pernyataan, this.props.ind.alp, this.ln)
		this.ln += this.props.font.height

		////// DETAIL //////
		let data_sarkut = this.dataObjek(this.data.objek, 'sarkut')
		this.detailSarkut(data_sarkut)

		let data_barang = this.dataObjek(this.data.objek, 'barang')
		this.detailBarang(data_barang)

		let data_bangunan = this.dataObjek(this.data.objek, 'bangunan')
		this.detailBangunan(data_bangunan)

		////// URAIAN BOTTOM //////
		this.ln += this.props.font.height
		let txt_segel = 'dengan menggunakan segel/tanda pengaman ' 
			+ converters.string(this.data.dokumen.segel.jenis_segel)
			+ ' sebanyak ' 
			+ converters.string(this.data.dokumen.segel.jumlah_segel)
			+ ' '
			+ converters.string(this.data.dokumen.segel.satuan_segel)
			+ ' Nomor ' 
			+ converters.string(this.data.dokumen.segel.nomor_segel)
			+ ' penempatan/pelekatan segel sebagai berikut: '
			+ converters.string(this.data.dokumen.segel.tempat_segel)
			+ '.'
		let arr_segel = converters.array_text(txt_segel, 100)
		this.pdf.text(arr_segel, this.props.ind.alp, this.ln)
		this.ln += this.props.font.height*arr_segel.length

		let txt_disaksikan = 'Penyegelan disaksikan oleh pengangkut/pemilik/importir/eksportir '
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
		this.pdf.text('Identitas (KTP/SIM/Paspor*)', this.props.ind.alp, this.ln)
		this.pdf.text(':', this.props.ind.cln2, this.ln)
		let txt_identitas = converters.string(this.data.penindakan.saksi.nomor_identitas)
			+ converters.string_format(converters.string(this.data.penindakan.saksi.jenis_identitas), ' ({})')
		this.pdf.text(txt_identitas, this.props.ind.txt2, this.ln)
		this.ln += this.props.font.height

		this.ln += this.props.font.height
		this.pdf.text('Demikian Berita Acara ini dibuat dengan sebenarnya.', this.props.ind.dtl, this.ln)
		this.ln += this.props.font.height

		////// TTD //////
		let txt_saksi = 'Pemilik/Importir/Eksportir/Kuasanya/Saksi*'
		let txt_pejabat = 'Pejabat yang melakukan penyegelan,'
		this.ttd(txt_saksi, txt_pejabat)

		////// KETERANGAN //////
		this.ln + this.props.font.height
		this.pdf.setFont('Helvetica', 'italic')
		this.pdf.setFontSize('7')
		this.pdf.text('*Coret yang tidak perlu', this.props.ind.alp, this.ln)

		////// LAMPIRAN //////
		if (this.data.objek != null) {
			if (this.data.objek.type == 'barang') {
				if (this.data.objek.data.item.length > 1) {
					this.pdf.setFont('Helvetica', 'normal')
					this.pdf.addPage()
					// Header
					this.headerLampiran(this.data.dokumen.segel.no_dok_lengkap)
					// Tabel barang
					this.tabelBarang()
				}
			}
		}

		////// WATERMARK //////
		if ([100,101].includes(this.data.dokumen.segel.kode_status)) {
			this.watermark()
		}

		return this.pdf.output('datauristring')
	}
}

export default PdfSegel