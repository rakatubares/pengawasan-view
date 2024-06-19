import PdfPenindakan from "./PdfPenindakan";

const inds = {
	lbl: 16,
	cln: 52,
	txt: 55,
	lbl2: 130,
	cln2: 160,
	txt2: 163,
	lbl3: 22,
	cln3: 30,
	txt3: 33,
	ttd1: 17,
	ttd2: 127,
	lamp: 140
}

class PdfLphp extends PdfPenindakan {
	constructor(
		data, 
		title='LAPORAN PENENTUAN HASIL PENINDAKAN', 
		lptp_name='LPTP',
	) {
		super(data, title)
		this.lptp_name = lptp_name
	}

	generateText()
	{
		this.prepareDocDate(this.data.tanggal_dokumen)

		this.txt = {}

		this.txt.no_lptp = this.data.nomor_lptp || '-'
		this.txt.tgl_lptp = this.data.tanggal_lptp || '-'

		let kategori = this.data.penindakan.kategori_penindakan
			? this.data.penindakan.kategori_penindakan.kategori || ''
			: ''
		let uraian = this.data.penindakan.uraian_penindakan || ''
		this.txt.kategori_uraian = kategori != ''
			? uraian != ''
				? `${kategori} / ${uraian}` : kategori
			: uraian != ''
				? uraian : '-'

		this.txt.nomor_sbp = this.data.nomor_sbp || ''
		this.txt.tanggal_sbp = this.data.tanggal_sbp || ''

		this.txt.analisa = this.data.analisa || ''
		this.txt.catatan = this.data.catatan || ''
	}

	writeText()
	{
		this.createHeader()
		this.createNomor(this.jenis_dok, this.data.no_dok_lengkap)

		///// Uraian Top /////
		// LPTP
		this.write('1.')
		this.write(`Nomor ${this.lptp_name}`, inds.lbl)
		this.write(':', inds.cln)
		this.write(this.txt.no_lptp, inds.txt)
		this.write('Tanggal', inds.lbl2)
		this.write(':', inds.cln2)
		this.write(this.txt.tgl_lptp, inds.txt2)
		this.break()

		// Kategori dan uraian
		this.write('2.')
		this.write('Kategori dan Uraian Penindakan', inds.lbl, undefined, 'left', this.page_width-inds.cln-2)
		this.write(':', inds.cln)
		this.write(this.txt.kategori_uraian, inds.txt)
		this.break()

		///// Detail /////
		// Sarkut
		let data_sarkut = this.convertSarkut(this.data.penindakan.objek.sarkut)
		this.write('A.', inds.lbl)
		this.write('Sarana Pengangkut', inds.lbl3)
		this.break()
		this.write('Jenis', inds.lbl3)
		this.write(':', inds.cln)
		this.write(data_sarkut.jenis_sarkut, inds.txt)
		this.write('No. Pol/Voy/Flight', inds.lbl2)
		this.write(':', inds.cln2)
		this.write(data_sarkut.nomor_sarkut, inds.txt2)
		this.break()
		this.write('Nomor Petikemas', inds.lbl3)
		this.write(':', inds.cln)
		this.write('Ukuran', inds.lbl2)
		this.write(':', inds.cln2)
		this.break()

		// Barang
		let data_barang = this.convertBarang(this.data.penindakan.objek.barang)
		this.write('B.', inds.lbl)
		this.write('Barang', inds.lbl3)
		this.break()
		this.write('Komoditi/Jenis', inds.lbl3)
		this.write(':', inds.cln)
		this.write(data_barang.komoditi, inds.txt)
		this.break()
		this.write('Jumlah', inds.lbl3)
		this.write(':', inds.cln)
		this.write(data_barang.jumlah, inds.txt)
		this.break()

		// Bangunan
		let data_bangunan = this.convertBangunan(this.data.penindakan.objek.bangunan)
		this.write('C.', inds.lbl)
		this.write('Bangunan/Tempat', inds.lbl3)
		this.break()
		this.write('Alamat', inds.lbl3)
		this.write(':', inds.cln)
		this.write(data_bangunan.alamat, inds.txt)
		this.break()
		this.write('No Reg Bangunan / NPPBKC / dll.', inds.lbl3, undefined, 'left', this.page_width-inds.cln-10)
		this.write(':', inds.cln)
		this.write(data_bangunan.no_reg, inds.txt)
		this.break()
		this.write('Pemilik / yang menguasai', inds.lbl3, undefined, 'left', this.page_width-inds.cln-10)
		this.write(':', inds.cln)
		this.write(data_bangunan.pemilik, inds.txt)
		this.break()

		// Orang
		let data_orang = this.convertBadan(this.data.penindakan.objek.badan)
		this.write('D.', inds.lbl)
		this.write('Orang', inds.lbl3)
		this.break()
		this.write('Nama', inds.lbl3)
		this.write(':', inds.cln)
		this.write(data_orang.nama, inds.txt, undefined, undefined, this.page_width-inds.lbl2)
		this.write('Tanggal Lahir', inds.lbl2)
		this.write(':', inds.cln2)
		this.write(data_orang.tanggal_lahir, inds.txt2)
		this.break()
		this.write('Jenis Kelamin', inds.lbl3)
		this.write(':', inds.cln)
		this.write(data_orang.jenis_kelamin, inds.txt, undefined, undefined, this.page_width-inds.lbl2)
		this.write('Identitas', inds.lbl2)
		this.write(':', inds.cln2)
		this.write(data_orang.identitas, inds.txt2)
		this.break()
		this.write('Alamat', inds.lbl3)
		this.write(':', inds.cln)
		this.write(data_orang.alamat, inds.txt, undefined, undefined, this.page_width-inds.lbl2)
		this.write('Kewarganegaraan', inds.lbl2)
		this.write(':', inds.cln2)
		this.write(data_orang.warga_negara, inds.txt2)
		this.break()

		///// Uraian Bottom /////
		// SBP
		this.write('3.')
		this.write('SB Penindakan', inds.lbl)
		this.write(':', inds.cln)
		this.write(this.txt.nomor_sbp, inds.txt)
		this.write('Tanggal', inds.lbl2)
		this.write(':', inds.cln2)
		this.write(this.txt.tanggal_sbp, inds.txt2)
		this.break()

		// Alasan
		this.write('4.')
		this.write('Analisa hasil penindakan', inds.lbl, undefined, 'left', this.page_width-inds.cln-10)
		this.write(':', inds.cln)
		this.break()
		this.write(this.txt.analisa, inds.lbl)
		this.break(1)

		///// TTD /////
		this.write(`Tangerang, ${this.full_tgl_dok}`, inds.ttd2)
		this.break()

		let ln_ttd = this.ln

		// Atasan
		this.ttd(
			inds.ttd1,
			this.data.petugas.atasan.jabatan,
			this.data.petugas.atasan.txt_tipe_ttd,
			this.data.petugas.atasan.name,
			this.data.petugas.atasan.nip,
		)

		// Penyusun
		this.ln = ln_ttd
		this.ttd(
			inds.ttd2,
			this.data.petugas.penyusun.jabatan,
			this.data.petugas.penyusun.txt_tipe_ttd,
			this.data.petugas.penyusun.name,
			this.data.petugas.penyusun.nip,
		)

		this.break(1)

		///// Catatan /////
		this.write('Catatan:')
		this.break()
		this.write(this.txt.analisa)

		////// LAMPIRAN //////
		if (this.data.penindakan.objek.barang) {
			if (this.data.penindakan.objek.barang.item.length > 1) {
				this.pdf.setFont('Helvetica', 'normal')
				this.pdf.addPage()
				// Header
				this.headerLampiran()
				// Tabel barang
				this.tabelBarang(this.data.penindakan.objek.barang.item)
			}
		}
	}
}

export default PdfLphp