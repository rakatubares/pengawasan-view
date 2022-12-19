import converters from "../../helpers/converter";
import Pdf from "./PdfMain"

const props = {
	font: {
		size: 10,
		height: 4
	},
	title_line: {
		start: 70,
		end: 140
	},
	ind: {
		alp: 15,
		cln_dok: 45,
		txt_dok: 50,
		lbl_tgl: 140,
		cln_tgl: 155,
		txt_tgl: 160,
		lbl: 20,
		cln: 80,
		txt: 85,
		lbl2: 25,
		lbl3: 30,
		ttd:125,
		ttd2: 75,
		lamp: 140
	}
}

class PdfLpp extends Pdf {
	constructor(data) {
		super(props, 30)
		this.jenis_dok = 'LEMBAR PENERIMAAN PERKARA (LPP)'
		this.data = data
	}

	generatePdf() {
		this.createHeaderSimple()
		this.createNomor(this.jenis_dok, 'Nomor: ' + this.data.no_dok_lengkap, 50)
		this.prepareDocDate(this.data.tanggal_dokumen)

		////// URAIAN NOMOR //////
		this.pdf.text('LP/Surat Nomor', this.props.ind.alp, this.ln)
		this.pdf.text(':', this.props.ind.cln_dok, this.ln)
		this.pdf.text(this.data.dokumen.lp.no_dok_lengkap, this.props.ind.txt_dok, this.ln)
		this.pdf.text('Tanggal', this.props.ind.lbl_tgl, this.ln)
		this.pdf.text(':', this.props.ind.cln_tgl, this.ln)
		this.pdf.text(this.data.dokumen.lp.tanggal_dokumen, this.props.ind.txt_tgl, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('SBP Nomor', this.props.ind.alp, this.ln)
		this.pdf.text(':', this.props.ind.cln_dok, this.ln)
		this.pdf.text(this.data.dokumen.sbp.no_dok_lengkap, this.props.ind.txt_dok, this.ln)
		this.pdf.text('Tanggal', this.props.ind.lbl_tgl, this.ln)
		this.pdf.text(':', this.props.ind.cln_tgl, this.ln)
		this.pdf.text(this.data.dokumen.sbp.tanggal_dokumen, this.props.ind.txt_tgl, this.ln)
		this.ln += this.props.font.height*2

		////// URAIAN //////
		this.pdf.text('A.', this.props.ind.alp, this.ln)
		this.pdf.text('Asal Perkara', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(this.data.asal_perkara, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('B.', this.props.ind.alp, this.ln)
		this.pdf.text('Jenis Penindakan', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(this.data.jenis_penindakan, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('C.', this.props.ind.alp, this.ln)
		this.pdf.text('Jenis Perkara', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(this.data.jenis_perkara, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('D.', this.props.ind.alp, this.ln)
		this.pdf.text('Status Pelanggaran', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(this.data.status_pelanggaran, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('E.', this.props.ind.alp, this.ln)
		this.pdf.text('Uraian Pelanggaran', this.props.ind.lbl, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('1.', this.props.ind.lbl, this.ln)
		this.pdf.text('Jenis Pelanggaran/Pasal', this.props.ind.lbl2, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let txt_pelanggaran = `${this.data.penyidikan.jenis_pelanggaran} / ${this.data.penyidikan.pasal}`
		let arr_pelanggaran = converters.array_text(txt_pelanggaran, 70)
		this.pdf.text(arr_pelanggaran, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height*arr_pelanggaran.length

		this.pdf.text('2.', this.props.ind.lbl, this.ln)
		this.pdf.text('Modus Operandi', this.props.ind.lbl2, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let arr_modus = converters.array_text(this.data.penyidikan.modus, 70)
		this.pdf.text(arr_modus, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height*arr_modus.length

		this.pdf.text('3.', this.props.ind.lbl, this.ln)
		this.pdf.text('Lokasi', this.props.ind.lbl2, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('a.', this.props.ind.lbl2, this.ln)
		this.pdf.text('Tempat', this.props.ind.lbl3, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let txt_tempat = converters.string(this.data.penyidikan.tempat_pelanggaran).replace('\n', ' ')
		this.pdf.text(txt_tempat, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('b.', this.props.ind.lbl2, this.ln)
		this.pdf.text('Tanggal dan waktu', this.props.ind.lbl3, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(this.data.penyidikan.waktu_pelanggaran, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('4.', this.props.ind.lbl, this.ln)
		this.pdf.text('Pelaku Pelanggaran', this.props.ind.lbl2, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('a.', this.props.ind.lbl2, this.ln)
		this.pdf.text('Nama', this.props.ind.lbl3, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(this.data.penyidikan.pelaku.nama, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('b.', this.props.ind.lbl2, this.ln)
		this.pdf.text('Umur', this.props.ind.lbl3, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text('', this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('c.', this.props.ind.lbl2, this.ln)
		this.pdf.text('Jenis Kelamin', this.props.ind.lbl3, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(this.data.penyidikan.pelaku.jenis_kelamin.uraian, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('d.', this.props.ind.lbl2, this.ln)
		this.pdf.text('Alamat', this.props.ind.lbl3, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let txt_alamat = converters.string(this.data.penyidikan.pelaku.alamat_identitas).replace('\n', ' ')
		this.pdf.text(txt_alamat, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('F.', this.props.ind.alp, this.ln)
		this.pdf.text('Barang Hasil Penindakan', this.props.ind.lbl, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('1.', this.props.ind.lbl, this.ln)
		this.pdf.text('Komoditi', this.props.ind.lbl2, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let txt_komoditi = '-'
		let hgt_komoditi = 1
		if (this.data.barang != null) {
			txt_komoditi = this.getKomoditi(this.data.barang.item)
			txt_komoditi = converters.array_text(txt_komoditi, 50)
			hgt_komoditi = txt_komoditi.length
		}
		this.pdf.text(txt_komoditi, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height*hgt_komoditi

		this.pdf.text('2.', this.props.ind.lbl, this.ln)
		this.pdf.text('Jumlah Koli/Jenis Koli', this.props.ind.lbl2, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let txt_kemasan = '-'
		if (this.data.barang != null) {
			txt_kemasan = `${this.data.barang.jumlah_kemasan} ${this.data.barang.kemasan.kode_kemasan}`
		}
		this.pdf.text(txt_kemasan, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('3.', this.props.ind.lbl, this.ln)
		this.pdf.text('Pengangkut/Nopol-Voy-Flight', this.props.ind.lbl2, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text('-', this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('4.', this.props.ind.lbl, this.ln)
		this.pdf.text('No. Container/Ukuran', this.props.ind.lbl2, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text('-', this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('5.', this.props.ind.lbl, this.ln)
		this.pdf.text('Detail Uraian Barang', this.props.ind.lbl2, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.ln += this.props.font.height*2

		let y_rect_barang = this.ln - 5
		let txt_barang = '-'
		let hgt_barang = 1
		if (this.data.barang != null) {
			if (this.data.barang.item.length > 1) {
				txt_barang = 'LIHAT LAMPIRAN'
			} else {
				txt_barang = this.data.barang.item[0]
			}	
		}
		let h_rect_barang = this.props.font.height*(hgt_barang+1)
		this.pdf.text(txt_barang, this.props.ind.lbl2, this.ln)
		this.pdf.rect(this.props.ind.lbl, y_rect_barang, 180, h_rect_barang, 'D')
		this.ln += 10

		this.pdf.text('G.', this.props.ind.alp, this.ln)
		this.pdf.text('Dokumen Barang', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let txt_dok_barang = '-'
		if (this.data.barang != null) {
			txt_dok_barang = `${this.data.barang.dokumen.jns_dok} ${this.data.barang.dokumen.no_dok} tanggal ${this.data.barang.dokumen.tgl_dok}`
		}
		this.pdf.text(txt_dok_barang, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('H.', this.props.ind.alp, this.ln)
		this.pdf.text('Catatan atasan pembuat LPP', this.props.ind.lbl, this.ln)
		this.ln += this.props.font.height*2

		let y_rect_catatan = this.ln - 5
		let arr_catatan = converters.array_text(this.data.catatan, 100)
		this.pdf.text(arr_catatan, this.props.ind.lbl2, this.ln)
		let h_rect_ikhtisar = this.props.font.height*(arr_catatan.length+1)
		this.pdf.rect(this.props.ind.lbl, y_rect_catatan, 180, h_rect_ikhtisar, 'D')
		this.ln += h_rect_ikhtisar+this.props.font.height

		////// TTD //////
		this.pdf.text(`Tangerang, ${this.full_tgl_dok}`, this.props.ind.ttd, this.ln)
		this.ln += this.props.font.height
		this.pdf.text(`Yang membuat LPP`, this.props.ind.ttd, this.ln)
		this.ln += this.props.font.height
		
		let plh_atasan1 = (this.data.atasan1.plh == true) ? 'Plh. ' : '';
		this.pdf.text(`${plh_atasan1}${this.data.atasan1.jabatan.jabatan}`, this.props.ind.alp, this.ln)
		this.pdf.text(`Pelaksana`, this.props.ind.ttd, this.ln)
		this.ln += this.props.font.height*5

		this.pdf.text(this.data.atasan1.user.name, this.props.ind.alp, this.ln)
		this.pdf.text(this.data.petugas.name, this.props.ind.ttd, this.ln)
		this.ln += this.props.font.height

		this.pdf.text(`NIP. ${this.data.atasan1.user.nip}`, this.props.ind.alp, this.ln)
		this.pdf.text(`NIP. ${this.data.petugas.nip}`, this.props.ind.ttd, this.ln)
		this.ln += this.props.font.height*3

		let plh_atasan2 = (this.data.atasan2.plh == true) ? 'Plh. ' : '';
		this.pdf.text(`${plh_atasan2}${this.data.atasan2.jabatan.jabatan}`, this.props.ind.ttd2, this.ln)
		this.ln += this.props.font.height*5

		this.pdf.text(this.data.atasan2.user.name, this.props.ind.ttd2, this.ln)
		this.ln += this.props.font.height

		this.pdf.text(`NIP. ${this.data.atasan2.user.nip}`, this.props.ind.ttd2, this.ln)

		////// LAMPIRAN //////
		if (this.data.barang != null) {
			// if (this.data.objek.type == 'barang') {
				if (this.data.barang.item.length > 1) {
					this.pdf.setFont('Helvetica', 'normal')
					this.pdf.addPage()
					// Header
					this.headerLampiran(this.data.no_dok_lengkap)
					// Tabel barang
					this.tabelBarang(this.data.barang.item)
				}
			// }
		}

		////// WATERMARK //////
		if ([100].includes(this.data.kode_status)) {
			this.watermark()
		}

		return this.pdf.output('datauristring')
	}

	getKomoditi(item_barang) {
		let flat_komoditi = [];
		item_barang.forEach(item => {
			if (item.kategori != null) {
				let kategori = item.kategori.kategori
				if (!flat_komoditi.includes(kategori)) {
					flat_komoditi.push(kategori)	
				}
			}
		});
		
		let txt_komoditi = flat_komoditi.join(', ');
		return txt_komoditi
	}
}

export default PdfLpp