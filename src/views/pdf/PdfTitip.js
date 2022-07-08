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

class PdfTitip extends Pdf {
	constructor(data) {
		super(props);
		this.jenis_dok = 'BERITA ACARA PENITIPAN'
		this.data = data
		this.prepareDocDate(this.data.dokumen.titip.tanggal_dokumen)
		this.prepareSprintDate(this.data.dokumen.titip.sprint.tanggal_sprint)
	}

	generatePdf() {
		this.createHeader()
		this.createNomor(this.jenis_dok, 'Nomor: ' + this.data.dokumen.titip.no_dok_lengkap)

		////// URAIAN TOP //////
		let txt_waktu = 'Pada hari ini ' + this.hr + ' tanggal ' + this.tgl + ' bulan ' + this.bln + ' tahun ' + this.thn + '.'
		this.pdf.text(txt_waktu, this.props.ind.dtl, this.ln)
		this.ln += this.props.font.height

		let txt_sprint = 'Berdasarkan Surat Perintah : Kepala Bidang Penindakan dan Penyidikan Nomor ' 
				+ this.data.dokumen.titip.sprint.nomor_sprint 
				+ ' tanggal ' + this.full_tgl_sprint + '.'
		let arr_sprint = converters.array_text(txt_sprint, 105)
		this.pdf.text(arr_sprint, this.props.ind.alp, this.ln)
		this.ln += this.props.font.height*arr_sprint.length

		let txt_pernyataan = 'Kami yang bertanda tangan di bawah ini telah melakukan penitipan atas:'
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
		this.pdf.text('Lokasi Penitipan', this.props.ind.alp, this.ln)
		this.pdf.text(':', this.props.ind.cln2, this.ln)
		this.pdf.text(converters.string(this.data.dokumen.titip.lokasi_titip).replace('\n', ' '), this.props.ind.txt2, this.ln)
		this.ln += this.props.font.height

		let txt_penerima = 'Dititipkan kepada pengangkut/pemilik/importir/eksportir '
			+ 'atau kuasanya/ketua lingkungan/petugas TPS*:'
		let arr_penerima = converters.array_text(txt_penerima, 110)
		this.pdf.text(arr_penerima, this.props.ind.alp, this.ln)
		this.ln += this.props.font.height*arr_penerima.length

		this.pdf.text('Nama', this.props.ind.alp, this.ln)
		this.pdf.text(':', this.props.ind.cln2, this.ln)
		this.pdf.text(converters.string(this.data.dokumen.titip.penerima.nama), this.props.ind.txt2, this.ln)
		this.ln += this.props.font.height
		this.pdf.text('Alamat', this.props.ind.alp, this.ln)
		this.pdf.text(':', this.props.ind.cln2, this.ln)
		this.pdf.text(converters.string(this.data.dokumen.titip.penerima.alamat_identitas).replace('\n', ' '), this.props.ind.txt2, this.ln)
		this.ln += this.props.font.height
		this.pdf.text('Jabatan', this.props.ind.alp, this.ln)
		this.pdf.text(':', this.props.ind.cln2, this.ln)
		this.pdf.text(converters.string(this.data.dokumen.titip.penerima.pekerjaan), this.props.ind.txt2, this.ln)
		this.ln += this.props.font.height

		let txt_segel = 'Sesuai dengan BA Penyegelan Nomor : '
			+ this.data.dokumen.segel.no_dok_lengkap
			+ ' tanggal '
			+ this.data.penindakan.tanggal_penindakan
			+ '.'
		let arr_segel = converters.array_text(txt_segel, 110)
		this.pdf.text(arr_segel, this.props.ind.alp, this.ln)
		this.ln += this.props.font.height*arr_segel.length

		this.ln += this.props.font.height
		this.pdf.text('Demikian Berita Acara ini dibuat dengan sebenarnya.', this.props.ind.dtl, this.ln)
		this.ln += this.props.font.height

		////// TTD //////
		let ln_tgl = this.ln + this.props.font.height*3
		let ln_jabatan_1 = ln_tgl + this.props.font.height
		let ln_nama_1 = ln_jabatan_1 + this.props.font.height*6
		let ln_nip_1 = ln_nama_1 + this.props.font.height
		let ln_nama_2 = ln_nip_1 + this.props.font.height*6
		let ln_nip_2 = ln_nama_2 + this.props.font.height

		// Pemilik/kuasa
		this.pdf.text('Orang yang menerima penitipan,', this.props.ind.alp, ln_jabatan_1)
		this.pdf.text(this.data.dokumen.titip.penerima.nama, this.props.ind.alp, ln_nama_1)
		this.pdf.text('Pemilik/kuasanya', this.props.ind.alp, ln_nip_1)

		// Saksi
		if (this.data.dokumen.titip.saksi != null) {
			var txt_nama_saksi = this.data.dokumen.titip.saksi.nama
		} else {
			var txt_nama_saksi = '...........................................'
		}
		this.pdf.text(txt_nama_saksi, this.props.ind.alp, ln_nama_2)
		this.pdf.text('Saksi', this.props.ind.alp, ln_nip_2)

		// Pejabat
		this.pdf.text('Tangerang, ' + this.full_tgl_dok, this.props.ind.ttd, ln_tgl)
		this.pdf.text('Pejabat yang melakukan penitipan,', this.props.ind.ttd, ln_jabatan_1)
		this.pdf.text(this.data.dokumen.titip.petugas1.name, this.props.ind.ttd, ln_nama_1)
		this.pdf.text('NIP ' + this.data.dokumen.titip.petugas1.nip, this.props.ind.ttd, ln_nip_1)
		if (this.data.dokumen.titip.petugas2 != null) {
			var txt_nama_pejabat2 = this.data.dokumen.titip.petugas2.name
			var txt_nip_pejabat2 = this.data.dokumen.titip.petugas2.nip
		} else {
			var txt_nama_pejabat2 = '...........................................'
			var txt_nip_pejabat2 = '....................................'
		}
		this.pdf.text(txt_nama_pejabat2, this.props.ind.ttd, ln_nama_2)
		this.pdf.text('NIP ' + txt_nip_pejabat2, this.props.ind.ttd, ln_nip_2)

		////// KETERANGAN //////
		let ln_coret = ln_nip_2 + this.props.font.height*2
		this.pdf.setFont('Helvetica', 'italic')
		this.pdf.setFontSize('7')
		this.pdf.text('*Coret yang tidak perlu', this.props.ind.alp, ln_coret)

		////// LAMPIRAN //////
		if (this.data.objek != null) {
			if (this.data.objek.type == 'barang') {
				if ((this.data.objek.data.item.length > 1) && !('riksa' in this.data.dokumen)) {
					this.pdf.setFont('Helvetica', 'normal')
					this.pdf.addPage()
					// Header
					this.headerLampiran(this.data.dokumen.titip.no_dok_lengkap)
					// Tabel barang
					this.tabelBarang()
				}
			}
		}

		////// WATERMARK //////
		if ([100].includes(this.data.dokumen.titip.kode_status)) {
			this.watermark()
		}

		return this.pdf.output('datauristring')
	}
}

export default PdfTitip