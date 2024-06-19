import Pdf from "../MyPdf"

const inds = {
	cln1: 25,
	val1: 28,
	cln2: 60,
	val2: 63,
	ttd1: 17,
	ttd2: 127,
}

class PdfLi extends Pdf {
	constructor(data) {
		super(data, 'LEMBAR INFORMASI')
	}

	generateText()
	{
		this.prepareDocDate(this.data.tanggal_dokumen)

		this.txt = {}
		this.txt.sumber = this.data.sumber != null
			? this.data.sumber
			: '-'
		this.txt.informasi = this.data.informasi != null
			? this.data.informasi
			: '-'
		this.txt.tindak_lanjut = this.data.tindak_lanjut != null
			? this.data.tindak_lanjut
			: '-'
		this.txt.catatan = this.data.catatan != null
			? this.data.catatan
			: '-'
	}

	writeText() 
	{
		this.createHeader()
		this.createNomor(this.jenis_dok)

		///// No & tanggal /////
		this.write('Nomor')
		this.write(':', inds.cln1)
		this.write(this.data.no_dok_lengkap, inds.val1)
		this.break()

		this.write('Tanggal')
		this.write(':', inds.cln1)
		this.write(this.full_tgl_dok, inds.val1)
		this.break(1)

		///// Uraian /////
		this.write('SUMBER / MEDIA INFORMASI')
		this.write(':', inds.cln2)
		this.write(this.txt.sumber, inds.val2)
		this.break(.5)

		this.write('ISI INFORMASI')
		this.write(':', inds.cln2)
		this.break()
		this.write(this.txt.informasi)
		this.break(.5)

		this.write('TINDAK LANJUT')
		this.write(':', inds.cln2)
		this.write(this.txt.tindak_lanjut, inds.val2)
		this.break(.5)

		this.write('CATATAN')
		this.write(':', inds.cln2)
		this.write(this.txt.catatan, inds.val2)
		this.break(2)

		///// TTD /////
		let ln_ttd = this.ln

		// Penerbit
		this.ttd(
			inds.ttd1,
			this.data.petugas.penerbit.jabatan, 
			this.data.petugas.penerbit.txt_tipe_ttd, 
			this.data.petugas.penerbit.name
		)

		// Atasan
		this.ln = ln_ttd
		this.ttd(
			inds.ttd2,
			this.data.petugas.atasan.jabatan, 
			this.data.petugas.atasan.txt_tipe_ttd, 
			this.data.petugas.atasan.name
		)
	}
}

export default PdfLi