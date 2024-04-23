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

class PdfSegel extends PdfPenindakan {
	constructor(
		data,
		title = 'BERITA ACARA PENYEGELAN',
	) {
		super(data, title, inds)
	}

	generateText()
	{
		this.prepareDocDate(this.data.tanggal_dokumen)

		this.txt = {}

		let jenis = this.data.jenis_segel || '     '
		let jumlah = this.data.jumlah_segel
			? this.data.satuan_segel
				? `${this.data.jumlah_segel} ${this.converters.numTerbilang(this.data.jumlah_segel)} ${this.data.satuan_segel}`
				: this.data.jumlah_segel
			: '     '
		let nomor = this.data.nomor_segel || '     '
		let tempat = this.data.tempat_segel || '     '
		this.txt.segel = `dengan menggunakan segel / tanda pengaman ${jenis} `
			+ `sebanyak ${jumlah} Nomor ${nomor} penempatan / pelekatan segel sebagai berikut ${tempat}`
		this.txt.saksi = this.data.penindakan.saksi ? this.data.penindakan.saksi.nama : ''
	}

	writeText()
	{
		this.createHeader()
		this.createNomor(this.jenis_dok, this.data.no_dok_lengkap)

		this.write(this.opening())
		this.break()
		this.write('Kami yang bertanda tangan di bawah ini telah melakukan penyegelan atas:')
		this.break()

		this.writeSarkut(this.data.penindakan.objek.sarkut)
		this.writeBarang(this.data.penindakan.objek.barang)
		this.writeBangunan(this.data.penindakan.objek.bangunan)

		this.write(this.txt.segel)
		this.break()

		this.writeSaksi(this.data.penindakan.saksi, 'Penyegelan')

		this.write('Demikian Berita Acara ini dibuat dengan sebenarnya.', inds.ttd1)
		this.break(1)

		///// TTD /////
		this.write(`Tangerang, ${this.full_tgl_dok}`, inds.ttd2)
		this.break()

		let ln_ttd = this.ln

		// Saksi
		this.ttd(
			inds.ttd1,
			'Pemilik/Importir/Eksportir/Kuasanya/Saksi*,',
			undefined,
			this.txt.saksi,
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
		this.pdf.setFont('Helvetica', 'italic')
		this.pdf.setFontSize('7')
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

export default PdfSegel