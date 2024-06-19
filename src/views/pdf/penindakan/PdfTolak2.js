import PdfPenindakan from "./PdfPenindakan";

const inds = {
	cln: 50,
	txt: 53,
	ttd1: 17,
	ttd2: 127,
}

class PdfTolak2 extends PdfPenindakan {
	constructor(
		data,
		title = ['BERITA ACARA PENOLAKAN TANDA TANGAN', 'TERHADAP BERITA ACARA PENOLAKAN TANDA TANGAN SURAT BUKTI PENINDAKAN'],
	) {
		super(data, title)
	}

	generateText()
	{
		this.prepareDocDate(this.data.tanggal_dokumen)

		this.txt = {}

		this.txt.pernyataan = `Kami yang bertanda tangan di bawah ini menyatakan bahwa ` +
			`setelah dibacakan Berita Acara Penolakan Tanda Tangan Surat Bukti Penindakan nomor ${this.data.tolak1.no_dok_lengkap} ` +
			`tanggal ${this.data.tolak1.tanggal_dokumen}.`

		this.txt.alasan = this.data.alasan || ''
	}

	writeText()
	{
		this.createHeader()
		this.createNomor(this.jenis_dok, this.data.no_dok_lengkap)

		this.write(this.opening())
		this.break()
		this.write(this.txt.pernyataan)
		this.break()

		///// Detail /////
		let entitas = {entitas: this.data.penindakan.saksi}
		let data_orang = this.convertBadan(entitas)

		this.write('Saudara:')
		this.break()

		this.write('Nama')
		this.write(':', inds.cln)
		this.write(data_orang.nama, inds.txt)
		this.break()

		this.write('Tempat/tanggal lahir')
		this.write(':', inds.cln)
		this.write(data_orang.ttl, inds.txt)
		this.break()

		this.write('Jenis kelamin')
		this.write(':', inds.cln)
		this.write(data_orang.jenis_kelamin, inds.txt)
		this.break()

		this.write('Agama')
		this.write(':', inds.cln)
		this.write(data_orang.agama, inds.txt)
		this.break()

		this.write('Kewarganegaraan')
		this.write(':', inds.cln)
		this.write(data_orang.warga_negara, inds.txt)
		this.break()

		this.write('Pekerjaan')
		this.write(':', inds.cln)
		this.write(data_orang.pekerjaan, inds.txt)
		this.break()

		this.write('Alamat')
		this.write(':', inds.cln)
		this.write(data_orang.alamat, inds.txt)
		this.break()

		this.write('menolak untuk menandatangani Berita Acara Penolakan Tanda Tangan Surat Bukti Penindakan tersebut di atas dengan alasan :')
		this.break()

		this.write(this.txt.alasan)
		this.break()

		this.write('atau tanpa alasan yang jelas / tidak ada alasan*.')
		this.break(1)

		this.write('Demikian Berita Acara ini dibuat dengan sebenarnya atas kekuatan sumpah jabatan.')
		this.break(1)

		///// TTD /////
		this.write(`Tangerang, ${this.full_tgl_dok}`, inds.ttd2)
		this.break()

		let ln_ttd = this.ln

		// Saksi
		this.ttd(
			inds.ttd1,
			'Saksi,',
			undefined, 
			this.data.saksi.nama,
		)

		// Pejabat
		this.ln = ln_ttd
		this.ttd(
			inds.ttd2,
			'Pejabat Bea dan Cukai,',
			undefined, 
			this.data.penindakan.petugas.petugas1.name,
			this.data.penindakan.petugas.petugas1.nip,
		)

		if (this.data.penindakan.petugas.petugas2) {
			this.ttd(
				inds.ttd2,
				undefined,
				undefined, 
				this.data.penindakan.petugas.petugas2.name,
				this.data.penindakan.petugas.petugas2.nip,
				3,
			)	
		}

		///// Coret /////
		this.pdf.setFont('Helvetica', 'italic')
		this.pdf.setFontSize('7')
		this.write(`*Coret yang tidak perlu`)
	}
}

export default PdfTolak2