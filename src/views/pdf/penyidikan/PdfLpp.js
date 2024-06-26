import converters from "../../../helpers/converter"
import Pdf from "../MyPdf"

const inds = {
	cln_dok: 45,
	txt_dok: 50,
	lbl_tgl: 140,
	cln_tgl: 155,
	txt_tgl: 160,
	lbl: 15,
	cln: 75,
	txt: 80,
	lbl2: 20,
	lbl3: 25,
	ttd1: 17,
	ttd2: 127,
	ttd3: 75,
	lamp: 140,
}

class PdfLpp extends Pdf {
	constructor(data) {
		super(data, 'LEMBAR PENERIMAAN PERKARA (LPP)', 30)
	}

	generateText()
	{
		this.prepareDocDate(this.data.tanggal_dokumen)

		this.txt = {}

		// Nomor
		this.txt.no_lp = this.data.lp.no_dok_lengkap || '-'
		this.txt.tgl_lp = this.data.lp.tanggal_dokumen || '-'
		this.txt.no_sbp = this.data.sbp.no_dok_lengkap || '-'
		this.txt.tgl_sbp = this.data.sbp.tanggal_dokumen || '-'

		// Perkara
		this.txt.asal_perkara = this.data.asal_perkara || '-'
		this.txt.jenis_penindakan = this.data.jenis_penindakan || '-'
		this.txt.jenis_perkara = this.data.jenis_perkara.kategori || '-'
		this.txt.status_pelanggaran = this.data.penyidikan.tertangkap_tangan
			? 'Tertangkap tangan' : 'Tidak tertangkap tangan'

		// Pelanggaran
		this.txt.jenis_pelanggaran = this.data.penyidikan.jenis_pelanggaran
			? this.data.penyidikan.pasal
				? `${this.data.penyidikan.jenis_pelanggaran} / ${this.data.penyidikan.pasal}`
				: this.data.penyidikan.jenis_pelanggaran
			: this.data.penyidikan.pasal
				? this.data.penyidikan.pasal
				: '-'
		this.txt.modus = this.data.penyidikan.modus || '-'
		this.txt.tempat = this.data.penyidikan.tempat_pelanggaran || '-'
		this.txt.waktu = this.data.penyidikan.tanggal_pelanggaran
			? this.data.penyidikan.waktu_pelanggaran
				? `${this.data.penyidikan.tanggal_pelanggaran} ${this.data.penyidikan.waktu_pelanggaran}`
				: this.data.penyidikan.tanggal_pelanggaran
			: this.data.penyidikan.waktu_pelanggaran
				? this.data.penyidikan.waktu_pelanggaran
				: '-'
		this.txt.nama_pelaku = this.data.penyidikan.pelaku.nama || '-'
		this.txt.umur = '-'
		let tanggal_lahir = this.data.penyidikan.pelaku.tanggal_lahir
		let tanggal_pelanggaran = this.data.penyidikan.tanggal_pelanggaran
		if (tanggal_lahir && tanggal_pelanggaran) {
			this.txt.umur = converters.age(tanggal_lahir, tanggal_pelanggaran)
		}
		this.txt.jenis_kelamin = this.data.penyidikan.pelaku.jenis_kelamin.uraian || '-'
		this.txt.alamat = this.data.penyidikan.pelaku.alamat_identitas 
			? converters.string(this.data.penyidikan.pelaku.alamat_identitas)
			: this.data.penyidikan.pelaku.alamat_tinggal
				? converters.string(this.data.penyidikan.pelaku.alamat_tinggal)
				: '-'

		// BHP
		this.txt.komoditi = '-'
		if (this.data.penyidikan.bhp.item) {
			this.txt.komoditi = this.getKomoditi(this.data.penyidikan.bhp.item)
		}
		this.txt.koli = this.data.penyidikan.bhp
			? this.data.penyidikan.bhp.kemasan
				? this.data.penyidikan.bhp.jumlah_kemasan
					? `${this.data.penyidikan.bhp.jumlah_kemasan} ${this.data.penyidikan.bhp.kemasan.kemasan}`
					: this.data.penyidikan.bhp.kemasan.kemasan
				: this.data.penyidikan.bhp.jumlah_kemasan
					? `${this.data.penyidikan.bhp.jumlah_kemasan} koli`
					: '-'
			: '-'
		this.txt.pengangkut = this.data.penyidikan.bhp
			? this.data.penyidikan.bhp.nama_sarkut
				? this.data.penyidikan.bhp.nomor_sarkut
					? `${this.data.penyidikan.bhp.nama_sarkut} / ${this.data.penyidikan.bhp.nomor_sarkut}`
					: this.data.penyidikan.bhp.nama_sarkut
				: this.data.penyidikan.bhp.nomor_sarkut
					? this.data.penyidikan.bhp.nomor_sarkut
					: '-'
			: '-'
		this.txt.kontainer = '-'
		this.txt.dok_barang = '-'
		let jenis_dok_barang = this.data.penyidikan.bhp.jenis_dokumen || ''
		let nomor_dok_barang = this.data.penyidikan.bhp.nomor_dokumen || ''
		let tanggal_dok_barang = this.data.penyidikan.bhp.tanggal_dokumen || ''
		if (jenis_dok_barang | nomor_dok_barang | tanggal_dok_barang) {
			this.txt.dok_barang = `${jenis_dok_barang} ${nomor_dok_barang} tanggal ${tanggal_dok_barang}`
		}
		this.txt.catatan = this.data.catatan || '-'
	}

	writeText()
	{
		this.createHeaderSimple()
		this.createNomor(this.jenis_dok, this.data.no_dok_lengkap)

		////// URAIAN NOMOR //////

		// LP
		this.write('LP/Surat Nomor')
		this.write(':', inds.cln_dok)
		this.write(this.txt.no_lp, inds.txt_dok)
		this.write('Tanggal', inds.lbl_tgl)
		this.write(':', inds.cln_tgl)
		this.write(this.txt.tgl_lp, inds.txt_tgl)
		this.break()

		// SBP
		this.write('SBP Nomor')
		this.write(':', inds.cln_dok)
		this.write(this.txt.no_sbp, inds.txt_dok)
		this.write('Tanggal', inds.lbl_tgl)
		this.write(':', inds.cln_tgl)
		this.write(this.txt.tgl_sbp, inds.txt_tgl)
		this.break()

		////// URAIAN PERKARA //////

		this.write('A.')
		this.write('Asal Perkara', inds.lbl)
		this.write(':', inds.cln)
		this.write(this.txt.asal_perkara, inds.txt)
		this.break()

		this.write('B.')
		this.write('Jenis Penindakan', inds.lbl)
		this.write(':', inds.cln)
		this.write(this.txt.jenis_penindakan, inds.txt)
		this.break()

		this.write('C.')
		this.write('Jenis Perkara', inds.lbl)
		this.write(':', inds.cln)
		this.write(this.txt.jenis_perkara, inds.txt)
		this.break()

		this.write('D.')
		this.write('Status Pelanggaran', inds.lbl)
		this.write(':', inds.cln)
		this.write(this.txt.status_pelanggaran, inds.txt)
		this.break()

		// Uraian pelanggaran
		this.write('E.')
		this.write('Uraian Pelanggaran', inds.lbl)
		this.break()

		this.write('1.', inds.lbl)
		this.write('Jenis Pelanggaran / Pasal', inds.lbl2)
		this.write(':', inds.cln)
		this.write(this.txt.jenis_pelanggaran, inds.txt)
		this.break()

		this.write('2.', inds.lbl)
		this.write('Modus Operandi', inds.lbl2)
		this.write(':', inds.cln)
		this.write(this.txt.modus, inds.txt)
		this.break()

		this.write('3.', inds.lbl)
		this.write('Lokasi', inds.lbl2)
		this.break()

		this.write('a.', inds.lbl2)
		this.write('Tempat', inds.lbl3)
		this.write(':', inds.cln)
		this.write(this.txt.tempat, inds.txt)
		this.break()

		this.write('b.', inds.lbl2)
		this.write('Tanggal dan waktu', inds.lbl3)
		this.write(':', inds.cln)
		this.write(this.txt.waktu, inds.txt)
		this.break()

		this.write('4.', inds.lbl)
		this.write('Pelaku Pelanggaran', inds.lbl2)
		this.break()

		this.write('a.', inds.lbl2)
		this.write('Nama', inds.lbl3)
		this.write(':', inds.cln)
		this.write(this.txt.nama_pelaku, inds.txt)
		this.break()

		this.write('b.', inds.lbl2)
		this.write('Umur', inds.lbl3)
		this.write(':', inds.cln)
		this.write(this.txt.umur, inds.txt)
		this.break()

		this.write('c.', inds.lbl2)
		this.write('Jenis Kelamin', inds.lbl3)
		this.write(':', inds.cln)
		this.write(this.txt.jenis_kelamin, inds.txt)
		this.break()

		this.write('d.', inds.lbl2)
		this.write('Alamat', inds.lbl3)
		this.write(':', inds.cln)
		this.write(this.txt.alamat, inds.txt)
		this.break()

		////// BHP //////

		this.write('F.')
		this.write('Barang Hasil Penindakan', inds.lbl)
		this.break()

		this.write('1.', inds.lbl)
		this.write('Komoditi', inds.lbl2)
		this.write(':', inds.cln)
		this.write(this.txt.komoditi, inds.txt)
		this.break()

		this.write('2.', inds.lbl)
		this.write('Jumlah Koli / Jenis Koli', inds.lbl2)
		this.write(':', inds.cln)
		this.write(this.txt.koli, inds.txt)
		this.break()

		this.write('3.', inds.lbl)
		this.write('Pengangkut / Nopol-Voy-Flight', inds.lbl2)
		this.write(':', inds.cln)
		this.write(this.txt.pengangkut, inds.txt)
		this.break()

		this.write('4.', inds.lbl)
		this.write('No. Container / Ukuran', inds.lbl2)
		this.write(':', inds.cln)
		this.write(this.txt.kontainer, inds.txt)
		this.break()

		this.write('5.', inds.lbl)
		this.write('Detail Uraian Barang', inds.lbl2)
		this.write(':', inds.cln)
		this.break(1)

		let y_rect_ikhtisar = this.ln - 4
		let txt_barang = '-'
		if (this.data.penyidikan.bhp != null) {
			if (this.data.penyidikan.bhp.item.length == 0) {
				txt_barang = '-'
			} else if (this.data.penyidikan.bhp.item.length > 1) {
				txt_barang = `${this.data.penyidikan.bhp.item.length} ITEM BARANG, TERLAMPIR`
			} else {
				txt_barang = this.data.penyidikan.bhp.item[0].uraian_barang
			}	
		}
		this.write(txt_barang, inds.lbl)
		let h_rect_ikhtisar = this.ln - y_rect_ikhtisar + 2
		this.pdf.rect(this.left_margin, y_rect_ikhtisar, 190, h_rect_ikhtisar, 'D')
		this.break(1)

		this.write('G.')
		this.write('Dokumen Barang', inds.lbl)
		this.write(':', inds.cln)
		this.write(this.txt.dok_barang, inds.txt)
		this.break()

		this.write('H.')
		this.write('Catatan atasan pembuat LPP', inds.lbl)
		this.break(1)

		let y_rect_catatan = this.ln - 4
		this.write(this.txt.catatan, inds.lbl, undefined, undefined, 15)
		let h_rect_catatan = this.ln - y_rect_catatan + 6
		this.pdf.rect(this.left_margin, y_rect_catatan, 190, h_rect_catatan, 'D')
		this.break(2)

		///// TTD /////
		this.write(`Tangerang, ${this.full_tgl_dok}`, inds.ttd2)
		this.break()

		let ln_ttd = this.ln

		// Atasan 1
		this.ttd(
			inds.ttd1,
			this.data.petugas.atasan1.jabatan,
			this.data.petugas.atasan1.txt_tipe_ttd,
			this.data.petugas.atasan1.name,
			this.data.petugas.atasan1.nip,
		)

		// Penyusun
		this.ln = ln_ttd
		this.ttd(
			inds.ttd2,
			'Yang membuat LPP,',
			undefined,
			this.data.petugas.penyusun.name,
			this.data.petugas.penyusun.nip,
		)
		this.break()

		// Atasan 2
		this.ttd(
			inds.ttd3,
			this.data.petugas.atasan2.jabatan,
			this.data.petugas.atasan2.txt_tipe_ttd,
			this.data.petugas.atasan2.name,
			this.data.petugas.atasan2.nip,
		)

		////// LAMPIRAN //////
		if (this.data.penyidikan.bhp) {
			if (this.data.penyidikan.bhp.item.length > 1) {
				this.pdf.setFont('Helvetica', 'normal')
				this.pdf.addPage()
				// Header
				this.headerLampiran()
				// Tabel barang
				this.tabelBarang(this.data.penyidikan.bhp.item)
			}
		}
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