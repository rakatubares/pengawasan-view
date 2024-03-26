import PdfPenindakan from "./PdfPenindakan";

const inds = {
	dtl: 15,
	cln: 85,
	txt: 88,
	cln2: 60,
	txt2: 63,
	cln_saksi: 45,
	txt_saksi: 48,
	ttd1: 17,
	ttd2: 127,
	lamp: 140
}

class PdfTegah extends PdfPenindakan {
	constructor(
		data,
		title = 'BERITA ACARA PENEGAHAN',
	) {
		super(data, title, inds)
	}

	generateText()
	{
		this.prepareDocDate(this.data.tanggal_dokumen)
	}

	writeText()
	{
		this.createHeader()
		this.createNomor(this.jenis_dok, this.data.no_dok_lengkap)

		this.write(this.opening())
		this.break()
		this.write('Kami yang bertanda tangan di bawah ini dalam rangka pengamanan hak-hak negara, telah melakukan penegahan terhadap:')
		this.break()

		this.writeSarkut(this.data.penindakan.objek.sarkut)
		this.writeBarang(this.data.penindakan.objek.barang)

		this.writeSaksi(this.data.penindakan.saksi)

		///// TTD /////
		this.write(`Tangerang, ${this.full_tgl_dok}`, inds.ttd2)
		this.break()

		let ln_ttd = this.ln

		// Saksi
		this.ttd(
			inds.ttd1,
			'Pemilik/Importir/Eksportir/Kuasanya/Saksi*,',
			undefined,
			this.data.penindakan.saksi.nama,
		)
		this.break()

		// Pejabat
		this.ln = ln_ttd
		this.ttd(
			inds.ttd2,
			'Pejabat yang melakukan pemeriksaan,',
			undefined, 
			this.data.penindakan.petugas.petugas1.name,
			this.data.penindakan.petugas.petugas1.nip,
		)

		if (this.data.penindakan.petugas.petugas2) {
			this.break()
			this.ttd(
				inds.ttd2,
				undefined,
				undefined, 
				this.data.penindakan.petugas.petugas2.name,
				this.data.penindakan.petugas.petugas2.nip,
				3,
			)	
		}

		////// KETERANGAN //////
		this.break()
		this.pdf.setFont('Helvetica', 'italic')
		this.pdf.setFontSize('7')
		let txt_kewenangan = 'Penegahan merupakan kewenangan administratif berdasarkan '
			+ 'Pasal 77 Undang-Undang nomor 10 tahun 1995 sebagaimana diubah terakhir dengan '
			+ 'Undang-Undang nomor 17 tahun 2006 tentang Kepabeanan dan '
			+ 'Pasal 33 Undang-Undang nomor 11 tahun 1995 sebagaimana diubah terakhir dengan '
			+ 'Undang-Undang nomor 39 tahun 2007 tentang Cukai.'
		this.write(txt_kewenangan)
		this.break(1)
		this.write('*Coret yang tidak perlu')

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

export default PdfTegah