import converters from "../../helpers/converter";
import Pdf from "./PdfMain"

const ind_start = 10

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
		num: ind_start,
		lbl: ind_start + 6,
		cln: ind_start + 42,
		txt: ind_start + 45,
		lbl2: ind_start + 110,
		cln2: ind_start + 135,
		txt2: ind_start + 138,
		plh: ind_start + 103,
		lamp: 140
	}
}

class PdfLp extends Pdf {
	constructor(data) {
		super(props);
		this.jenis_dok = 'LAPORAN PELANGGARAN'
		this.data = data
		this.prepareDocDate(this.data.tanggal_dokumen)
	}

	generatePdf() {
		this.createHeader()
		this.createNomor(this.jenis_dok, 'Nomor: ' + this.data.no_dok_lengkap)

		////// URAIAN //////
		// LPHP
		this.pdf.text('1.', this.props.ind.num, this.ln)
		this.pdf.text('LPHP', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(this.data.no_lphp, this.props.ind.txt, this.ln)
		this.pdf.text('Tanggal', this.props.ind.lbl2, this.ln)
		this.pdf.text(':', this.props.ind.cln2, this.ln)
		this.pdf.text(this.data.tanggal_lphp, this.props.ind.txt2, this.ln)
		this.ln += this.props.font.height

		// SBP
		this.pdf.text('2.', this.props.ind.num, this.ln)
		this.pdf.text('SB Penindakan', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(this.data.no_sbp, this.props.ind.txt, this.ln)
		this.pdf.text('Tanggal', this.props.ind.lbl2, this.ln)
		this.pdf.text(':', this.props.ind.cln2, this.ln)
		this.pdf.text(this.data.tanggal_sbp, this.props.ind.txt2, this.ln)
		this.ln += this.props.font.height*2

		// Uraian pelanggaran
		this.pdf.text('3.', this.props.ind.num, this.ln)
		let lbl_uraian = converters.array_text('Kategori dan Uraian Penindakan', 15)
		let lng_lbl_uraian = lbl_uraian.length
		this.pdf.text(lbl_uraian, this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let txt_uraian = converters.array_text(this.data.uraian_penindakan, 90)
		let lng_txt_uraian = txt_uraian.length
		this.pdf.text(txt_uraian, this.props.ind.txt, this.ln)
		let lng_uraian = lng_txt_uraian > lng_lbl_uraian ? lng_txt_uraian : lng_lbl_uraian
		this.ln += this.props.font.height*(lng_uraian + 1)

		this.pdf.text('Jenis Pelanggaran', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(this.data.jenis_pelanggaran, this.props.ind.txt, this.ln)
		this.pdf.text('Pasal', this.props.ind.lbl2, this.ln)
		this.pdf.text(':', this.props.ind.cln2, this.ln)
		let txt_pasal = converters.array_text(this.data.pasal, 30)
		this.pdf.text(txt_pasal, this.props.ind.txt2, this.ln)
		let len_pasal = txt_pasal.length > 0 ? txt_pasal.length : 1
		this.ln += this.props.font.height*len_pasal

		this.pdf.text('Uraian Modus', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let txt_modus = converters.array_text(this.data.modus, 90)
		this.pdf.text(txt_modus, this.props.ind.txt, this.ln)
		let len_modus = txt_modus.length > 0 ? txt_modus.length : 1
		this.ln += this.props.font.height*len_modus

		this.pdf.text('Locus', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let txt_locus = converters.array_text(this.data.locus.replace('\n', ' '), 90)
		this.pdf.text(txt_locus, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height*txt_locus.length

		this.pdf.text('Tempus', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let dt_tempus = converters.date(this.data.tempus.substring(0,10), 'DD-MM-YYYY')
		let txt_tanggal_tempus = converters.fullDate(dt_tempus)
		let txt_waktu_tempus = this.data.tempus.substring(11)
		this.pdf.text(txt_tanggal_tempus, this.props.ind.txt, this.ln)
		this.pdf.text('Jam', this.props.ind.lbl2, this.ln)
		this.pdf.text(':', this.props.ind.cln2, this.ln)
		this.pdf.text(txt_waktu_tempus, this.props.ind.txt2, this.ln)
		this.ln += this.props.font.height*2

		// Dugaan pelaku
		this.pdf.text('4.', this.props.ind.num, this.ln)
		this.pdf.text('Diduga dilakukan oleh', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Nama', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(this.data.saksi.nama, this.props.ind.txt, this.ln)
		this.pdf.text('Tanggal Lahir', this.props.ind.lbl2, this.ln)
		this.pdf.text(':', this.props.ind.cln2, this.ln)
		this.pdf.text(this.data.saksi.tanggal_lahir, this.props.ind.txt2, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Nomor Identitas', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let txt_identitas = this.data.saksi.nomor_identitas + ' (' + this.data.saksi.jenis_identitas + ')'
		this.pdf.text(txt_identitas, this.props.ind.txt, this.ln)
		this.pdf.text('Jenis Kelamin', this.props.ind.lbl2, this.ln)
		this.pdf.text(':', this.props.ind.cln2, this.ln)
		this.pdf.text(this.data.saksi.jenis_kelamin.uraian, this.props.ind.txt2, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Alamat', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let txt_alamat = converters.array_text(this.data.saksi.alamat_identitas.replace('\n', ' '), 90)
		this.pdf.text(txt_alamat, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height*(txt_alamat.length + 1)

		// BHP
		let komoditi = this.data.objek != null
			? this.data.objek.type == 'barang' 
				? this.data.objek.data.item.length == 1
					? this.data.objek.data.item[0].uraian_barang
					: ('riksa' in this.data)
						? `${this.data.objek.data.item.length} ITEM, LIHAT LAMPIRAN BA ${this.data.riksa}`
						: `${this.data.objek.data.item.length} ITEM, LIHAT LAMPIRAN`
				: ''
			: ''
		let txt_komoditi = converters.array_text(komoditi, 90)
		let jumlah_barang = this.data.objek != null
			? this.data.objek.type == 'barang' 
				? this.data.objek.data.item.length == 1
					? this.data.objek.data.item[0].jumlah_barang + ' ' + this.data.objek.data.item[0]['satuan']['kode_satuan']
					: ('riksa' in this.data)
					? `${this.data.objek.data.item.length} ITEM, LIHAT LAMPIRAN BA ${this.data.riksa}`
					: `${this.data.objek.data.item.length} ITEM, LIHAT LAMPIRAN`
				: ''
			: ''
		let barang = this.data.objek != null
			? this.data.objek.type == 'barang'
				? this.data.objek.data
				: null
			: null
		let data_barang = converters.barang(barang)

		this.pdf.text('5.', this.props.ind.num, this.ln)
		this.pdf.text('Barang Hasil Penindakan', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.ln += this.props.font.height

		let lbl_barang = converters.array_text('Komoditi / jenis barang', 15)
		this.pdf.text(lbl_barang, this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(txt_komoditi, this.props.ind.txt, this.ln)
		let len_komoditi = txt_komoditi.length > lbl_barang.length ? txt_komoditi.length : lbl_barang.length
		this.ln += this.props.font.height*len_komoditi

		this.pdf.text('Jumlah barang', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(jumlah_barang, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		let lbl_dok = converters.array_text('Dokumen / surat terkait', 15)
		this.pdf.text(lbl_dok, this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(data_barang.dokumen, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height*4

		////// TTD //////
		let tgl_lp = converters.fullDate(converters.date(this.data.tanggal_dokumen, 'DD-MM-YYYY'))
		this.pdf.text('Tangerang, ' + tgl_lp, this.props.ind.lbl2, this.ln)
		this.ln += this.props.font.height
		let plh = this.data.pejabat.plh ? 'Plh.' : ''
		this.pdf.text(plh, this.props.ind.plh, this.ln)
		this.pdf.text(this.data.pejabat.jabatan.jabatan, this.props.ind.lbl2, this.ln)
		this.ln += this.props.font.height*5
		this.pdf.text(this.data.pejabat.user.name, this.props.ind.lbl2, this.ln)
		this.ln += this.props.font.height
		this.pdf.text('NIP. ' + this.data.pejabat.user.nip, this.props.ind.lbl2, this.ln)
		this.ln += this.props.font.height

		////// LAMPIRAN //////
		if (this.data.objek != null) {
			if (this.data.objek.type == 'barang') {
				if ((this.data.objek.data.item.length > 1) && !('riksa' in this.data)) {
					this.pdf.setFont('Helvetica', 'normal')
					this.pdf.addPage()
					// Header
					this.headerLampiran(this.data.no_dok_lengkap)
					// Tabel barang
					this.tabelBarang()
				}
			}	
		}

		////// WATERMARK //////
		if ([100].includes(this.data.kode_status)) {
			this.watermark()
		}

		return this.pdf.output('datauristring')
	}
}

export default PdfLp