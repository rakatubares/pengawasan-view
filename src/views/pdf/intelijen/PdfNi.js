import Pdf from '../MyPdf'

const inds = {
	cln1: 30,
	val1: 35,
	lbl2: 130,
	cln2: 155,
	val2: 160,
	ttd: 125,
}

class PdfNi extends Pdf
{
	constructor(data)
	{
		super(data, 'NOTA INFORMASI')
	}

	generateText()
	{
		this.prepareDocDate(this.data.tanggal_dokumen)
		this.txt = {}
		this.txt.tgl_lkai = this.converters.fullDate(this.data.tanggal_lkai)
		this.txt.nomor_lkai = this.data.nomor_lkai || ''
		this.txt.tujuan = `Yth. ${this.converters.string(this.data.tujuan)}`
		this.txt.uraian = this.data.uraian || ''
	}

	writeText()
	{
		this.createHeader()
		this.createNomor(this.jenis_dok)

		// No & tanggal
		this.write('Nomor')
		this.write(':', inds.cln1)
		this.write(this.data.no_dok_lengkap, inds.val1)

		this.write('Referensi', inds.lbl2)
		this.break()

		this.write('Tanggal')
		this.write(':', inds.cln1)
		this.write(this.full_tgl_dok, inds.val1)

		this.write('Nomor LKAI', inds.lbl2)
		this.write(':', inds.cln2)
		this.write(this.txt.nomor_lkai, inds.val2)
		this.break()

		this.write('Sifat')
		this.write(':', inds.cln1)
		this.write(this.data.sifat, inds.val1)

		this.write('Tanggal LKAI', inds.lbl2)
		this.write(':', inds.cln2)
		this.write(this.txt.tgl_lkai, inds.val2)
		this.break()

		this.write('Klasifikasi')
		this.write(':', inds.cln1)
		this.write(this.data.klasifikasi, inds.val1)
		this.break(1)

		// Uraian
		this.write(this.txt.tujuan)
		this.break()

		let txt_opening = '     Sehubungan dengan hasil analisis intelijen yang mengindikasikan adanya pelanggaran kepabeanan atau cukai, '
			+ 'dengan ini disampaikan informasi agar dapat dilakukan penelitian mendalam tentang informasi sebagai berikut:'
		this.write(txt_opening)
		this.break(1)

		let uraian = this.txt.uraian.split('\n')
		uraian.forEach(paragraph => {
			let txt = paragraph
			this.write(txt)
			this.break(-.25)
		});

		// Closing
		this.break()
		var txt_closing = 'Demikian disampaikan atas perhatian Bapak / Ibu / Saudara *) diucapkan terima kasih untuk mendapat perhatian.'
		this.write(txt_closing)
		this.break(1)

		// TTD
		this.ttd(
			inds.ttd, 
			this.data.petugas.penerbit.jabatan, 
			this.data.petugas.penerbit.txt_tipe_ttd, 
			this.data.petugas.penerbit.name
		)
		this.break()

		// CC
		this.cc(this.data.tembusan)
	}
}

export default PdfNi