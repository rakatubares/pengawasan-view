import PdfPenindakan from "./PdfPenindakan"

const inds = {
	lbl: 16,
	cln: 53,
	txt: 56,
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

class PdfLp extends PdfPenindakan {
	constructor(
		data,
		title='LAPORAN PELANGGARAN',
	) {
		super(data, title)
	}

	generateText()
	{
		this.prepareDocDate(this.data.tanggal_dokumen)

		this.txt = {}
		
		this.txt.no_lphp = this.data.nomor_lphp || '-'
		this.txt.tgl_lphp = this.data.tanggal_lphp || '-'

		this.txt.no_sbp = this.data.nomor_sbp || '-'
		this.txt.tgl_sbp = this.data.tanggal_sbp || '-'

		let kategori = this.data.penindakan.kategori_penindakan
			? this.data.penindakan.kategori_penindakan.kategori || ''
			: ''
		let uraian = this.data.penindakan.uraian_penindakan || ''
		this.txt.kategori_uraian = kategori != ''
			? uraian != ''
				? `${kategori} / ${uraian}` : kategori
			: uraian != ''
				? uraian : '-'

		this.txt.jenis_pelanggaran = this.data.penindakan.jenis_pelanggaran
			? this.data.penindakan.jenis_pelanggaran || ''
			: ''
		this.txt.pasal = this.data.pasal
			? this.data.pasal || ''
			: ''
		this.txt.modus = this.data.modus
			? this.data.modus || ''
			: ''

		this.txt.locus = this.data.penindakan.lokasi_penindakan || '-'
		this.txt.tempus_tanggal = this.data.penindakan.tanggal_selesai_penindakan || '-'
		this.txt.tempus_jam = this.data.penindakan.waktu_selesai_penindakan || '-'
	}

	writeText()
	{
		this.createHeader()
		this.createNomor(this.jenis_dok, this.data.no_dok_lengkap)

		///// URAIAN /////
		// LPHP
		this.write('1.')
		this.write('LPHP', inds.lbl)
		this.write(':', inds.cln)
		this.write(this.txt.no_lphp, inds.txt)
		this.write('Tanggal', inds.lbl2)
		this.write(':', inds.cln2)
		this.write(this.txt.tgl_lphp, inds.txt2)
		this.break()

		// SBP
		this.write('2.')
		this.write('SB Penindakan', inds.lbl)
		this.write(':', inds.cln)
		this.write(this.txt.no_sbp, inds.txt)
		this.write('Tanggal', inds.lbl2)
		this.write(':', inds.cln2)
		this.write(this.txt.tgl_sbp, inds.txt2)
		this.break(1)

		// Kategori dan uraian
		this.write('3.')
		this.write('Kategori dan Uraian Penindakan', inds.lbl, undefined, 'left', this.page_width-inds.cln-2)
		this.write(':', inds.cln)
		this.write(this.txt.kategori_uraian, inds.txt)
		this.break(1)

		// Jenis pelanggaran
		this.write('Jenis Pelanggaran', inds.lbl, undefined, 'left', this.page_width-inds.cln-2)
		this.write(':', inds.cln)
		this.write(this.txt.jenis_pelanggaran, inds.txt)
		this.write('Pasal', inds.lbl2)
		this.write(':', inds.cln2)
		this.write(this.txt.pasal, inds.txt2)
		this.break()

		// Modus
		this.write('Uraian Modus', inds.lbl, undefined, 'left', this.page_width-inds.cln-2)
		this.write(':', inds.cln)
		this.write(this.txt.modus, inds.txt)
		this.break()

		// Locus dan tempus
		this.write('Locus', inds.lbl)
		this.write(':', inds.cln)
		this.write(this.txt.locus, inds.txt)
		this.break()
		this.write('Tempus', inds.lbl)
		this.write(':', inds.cln)
		this.write(this.txt.tempus_tanggal, inds.txt)
		this.write('Jam', inds.lbl2)
		this.write(':', inds.cln2)
		this.write(this.txt.tempus_jam, inds.txt2)
		this.break(1)

		// Pelaku
		this.write('4.')
		this.write('Diduga dilakukan oleh:', inds.lbl)
		this.break()

		let saksi = {entitas: this.data.penindakan.saksi}
		let data_saksi = this.convertBadan(saksi)

		this.write('Nama', inds.lbl, undefined, 'left', this.page_width-inds.cln-2)
		this.write(':', inds.cln)
		this.write(data_saksi.nama, inds.txt)
		this.write('Tanggal Lahir', inds.lbl2, undefined)
		this.write(':', inds.cln2)
		this.write(data_saksi.tanggal_lahir, inds.txt2)
		this.break()

		this.write('Nomor Identitas', inds.lbl, undefined, 'left', this.page_width-inds.cln-2)
		this.write(':', inds.cln)
		this.write(data_saksi.identitas, inds.txt)
		this.write('Jenis Kelamin', inds.lbl2, undefined)
		this.write(':', inds.cln2)
		this.write(data_saksi.jenis_kelamin, inds.txt2)
		this.break()

		this.write('Alamat', inds.lbl, undefined, 'left', this.page_width-inds.cln-2)
		this.write(':', inds.cln)
		this.write(data_saksi.alamat, inds.txt)
		this.break(1)

		// BHP
		let data_barang = this.convertBarang(this.data.penindakan.objek.barang)
		this.write('5.')
		this.write('Barang Hasil Penindakan', inds.lbl)
		this.break()
		this.write('Komoditi / Jenis Barang', inds.lbl, undefined, 'left', this.page_width-inds.cln-2)
		this.write(':', inds.cln)
		this.write(data_barang.komoditi, inds.txt)
		this.break()
		this.write('Jumlah Barang', inds.lbl, undefined, 'left', this.page_width-inds.cln-2)
		this.write(':', inds.cln)
		this.write(data_barang.jumlah, inds.txt)
		this.break()
		this.write('Dokumen / Surat Terkait', inds.lbl, undefined, 'left', this.page_width-inds.cln-2)
		this.write(':', inds.cln)
		this.write(data_barang.dokumen, inds.txt)
		this.break(1)

		///// TTD /////
		this.write(`Tangerang, ${this.full_tgl_dok}`, inds.ttd2)
		this.break()

		// Pejabat
		this.ttd(
			inds.ttd2,
			this.data.petugas.pejabat.jabatan,
			this.data.petugas.pejabat.txt_tipe_ttd,
			this.data.petugas.pejabat.name,
			this.data.petugas.pejabat.nip,
		)

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

export default PdfLp