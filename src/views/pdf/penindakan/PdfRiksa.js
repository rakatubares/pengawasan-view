import PdfPenindakan from "./PdfPenindakan";

const inds = {
	dtl: undefined,
	cln: 95,
	txt: 98,
	cln2: 50,
	txt2: 53,
	cln3: 60,
	txt3: 63,
	ttd1: 17,
	ttd2: 127,
	lamp: 140
}

class PdfRiksa extends PdfPenindakan {
	constructor(
		data,
		title = 'BERITA ACARA PEMERIKSAAN',
	) {
		super(data, title, inds)
	}

	generateText()
	{
		this.prepareDocDate(this.data.tanggal_dokumen)

		this.txt = {}

		this.txt.lokasi = this.data.penindakan.lokasi_penindakan || ''

	}

	writeText()
	{
		this.createHeader()
		this.createNomor(this.jenis_dok, this.data.no_dok_lengkap)

		this.write(this.opening())
		this.break()
		this.write('Kami yang bertanda tangan di bawah ini telah melakukan pemeriksaan terhadap:')
		this.break()

		this.writeSarkut(this.data.penindakan.objek.sarkut)
		this.writeBarang(this.data.penindakan.objek.barang)
		this.writeBangunan(this.data.penindakan.objek.bangunan)

		this.write('Lokasi Pemeriksaan')
		this.write(':', inds.cln2)
		this.break()
		this.write(this.txt.lokasi)
		this.break()

		let ln_jumlah_lampiran = this.ln
		this.write('Hasil Pemeriksaan')
		this.write(':', inds.cln2)
		this.break()

		///// Saksi /////
		let data_saksi = this.convertBadan({entitas: this.data.penindakan.saksi})
		this.write('Pemeriksaan disaksikan oleh pengangkut/pemilik/importir/eksportir atau kuasanya/ketua lingkungan/dll*:')
		this.break()

		this.write('Nama')
		this.write(':', inds.cln3)
		this.write(data_saksi.nama, inds.txt3)
		this.break()

		this.write('Alamat')
		this.write(':', inds.cln3)
		this.write(data_saksi.alamat, inds.txt3)
		this.break()

		this.write('Pekerjaan')
		this.write(':', inds.cln3)
		this.write(data_saksi.pekerjaan, inds.txt3)
		this.break()

		this.write('Identitas (KTP/SIM/Paspor*)')
		this.write(':', inds.cln3)
		this.write(data_saksi.identitas, inds.txt3)
		this.break()

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
			data_saksi.nama,
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
				this.pdf.setFont('Helvetica', 'bold')
				this.write('LAPORAN HASIL PEMERIKSAAN', this.page_width/2, undefined, 'center')
				this.break(1)
				this.pdf.setFont('Helvetica', 'normal')
				this.write('Hasil pemeriksaan kedapatan:')
				this.break()
				this.tabelBarang(this.data.penindakan.objek.barang.item)

				// Statement jumlah lampiran
				let totalPages = this.pdf.internal.getNumberOfPages();
				this.pdf.setPage(1)
				this.write(`Laporan hasil pemeriksaan terlampir sebanyak ${totalPages-1} halaman.`, inds.txt2, ln_jumlah_lampiran)
			}
		}
	}
}

export default PdfRiksa