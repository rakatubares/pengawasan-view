import PdfPenindakan from "./PdfPenindakan";

const inds = {
	cln: 60,
	txt: 63,
	ttd1: 17,
	ttd2: 127,
}

class PdfRiksaBadan extends PdfPenindakan {
	constructor(
		data,
		title = 'BERITA ACARA PEMERIKSAAN BADAN',
	) {
		super(data, title)
	}

	generateText() 
	{
		this.prepareDocDate(this.data.tanggal_dokumen)

		this.txt = {}

		let objek_badan = this.data.penindakan.objek.badan

		this.txt.asal = objek_badan
			? this.converters.string(objek_badan.asal) || ''
			: ''
		this.txt.tujuan = objek_badan
			? this.converters.string(objek_badan.tujuan) || ''
			: ''
		
		let pendamping = {entitas: objek_badan.pendamping}
		let data_pendamping = this.convertBadan(pendamping)
		this.txt.pendamping = data_pendamping.nama != ''
			? data_pendamping.identitas != ''
				? `${data_pendamping.nama} / ${data_pendamping.identitas}`
				: data_pendamping.nama
			: data_pendamping.identitas
				? data_pendamping.identitas
				: ''

		this.txt.sarkut = objek_badan
			? objek_badan.nama_sarkut
				? objek_badan.jenis_sarkut
					? `${objek_badan.nama_sarkut} (${objek_badan.jenis_sarkut})`
					: objek_badan.nama_sarkut
				: objek_badan.jenis_sarkut
					? objek_badan.jenis_sarkut
					: ''
			: ''
		this.txt.nomor_sarkut = objek_badan
			? objek_badan.nomor_sarkut || ''
			: ''
		this.txt.pengemudi = objek_badan
			? objek_badan.pengemudi
				? objek_badan.pengemudi.nama || ''
				: ''
			: ''

		this.txt.bendera = objek_badan
			? objek_badan.bendera
				? objek_badan.bendera.nama_negara || ''
				: ''
			: ''

		this.txt.registrasi_sarkut = objek_badan
			? objek_badan.registrasi_sarkut || ''
			: ''

		this.txt.dokumen = objek_badan
			? objek_badan.jenis_dokumen
				? objek_badan.nomor_dokumen
					? objek_badan.tanggal_dokumen
						? `${objek_badan.jenis_dokumen} ${objek_badan.nomor_dokumen} tanggal ${objek_badan.tanggal_dokumen}`
						: `${objek_badan.jenis_dokumen} ${objek_badan.nomor_dokumen}`
					: objek_badan.tanggal_dokumen
						? `${objek_badan.jenis_dokumen} tanggal ${objek_badan.tanggal_dokumen}`
						: objek_badan.jenis_dokumen
				: objek_badan.nomor_dokumen
					? objek_badan.tanggal_dokumen
						? `${objek_badan.nomor_dokumen} tanggal ${objek_badan.tanggal_dokumen}`
						: objek_badan.nomor_dokumen
					: objek_badan.tanggal_dokumen
						? objek_badan.tanggal_dokumen
						: ''
			: ''

		this.txt.lokasi = this.data.penindakan.lokasi_penindakan || ''

		this.txt.uraian_pemeriksaan = objek_badan
			? objek_badan.uraian_pemeriksaan || ''
			: ''

		this.txt.hasil_pemeriksaan = objek_badan
			? objek_badan.hasil_pemeriksaan || ''
			: ''

		this.txt.saksi = this.data.penindakan.saksi
			? this.data.penindakan.saksi.nama || ''
			: ''
	}

	writeText()
	{
		this.createHeader()
		this.createNomor(this.jenis_dok, this.data.no_dok_lengkap)

		this.write(this.opening())
		this.break()
		this.write('Kami yang bertanda tangan di bawah ini telah melakukan pemeriksaan Badan terhadap:')
		this.break()

		///// Detail /////
		let data_orang = this.convertBadan(this.data.penindakan.objek.badan)

		this.writeData('Nama', data_orang.nama)
		this.writeData('Alias', data_orang.alias)
		this.writeData('Tempat dan Tanggal Lahir', data_orang.ttl)
		this.writeData('Kewarganegaraan', data_orang.warga_negara)
		this.writeData('Alamat Tempat Tinggal', data_orang.alamat_tinggal)
		this.writeData('Alamat KTP/Paspor', data_orang.alamat_identitas)
		this.writeData('Nomor KTP/Paspor', data_orang.identitas)
		this.writeData('Tempat/Pejabat yang Mengeluarkan', data_orang.penerbit_identitas)
		this.writeData('Datang Dari', this.txt.asal)
		this.writeData('Tempat Tujuan', this.txt.tujuan)
		this.writeData('Nama/Identitas Orang yang Bepergian Dengannya', this.txt.pendamping)
		this.writeData('Nama dan Jenis Sarkut', this.txt.sarkut)
		this.writeData('No. Voy/Penerbangan/Travel*', this.txt.nomor_sarkut)
		this.writeData('Nahkoda/Pilot/Pengemudi*', this.txt.pengemudi)
		this.writeData('Bendera', this.txt.bendera)
		this.writeData('Nomor Register/Polisi*', this.txt.registrasi_sarkut)
		this.writeData('Jenis/Nomor dan Tgl Dokumen Barang yang Dibawa', this.txt.dokumen)
		this.writeData('Lokasi Pemeriksaan', this.txt.lokasi)

		let txt_permintaan = 'Dalam pemeriksaan yang bersangkutan diminta membuka/tidak membuka pakaian/pemeriksaan medis*.'
		this.write(txt_permintaan)
		this.break()
		this.write('Uraian pakaian yang dibuka/pemeriksaan medis*:')
		this.break()
		this.write(this.txt.uraian_pemeriksaan, inds.ttd1)
		this.break()
		this.write('Hasil pemeriksaan kedapatan sebagai berikut:')
		this.break()
		this.write(this.txt.hasil_pemeriksaan, inds.ttd1)
		this.break()

		let txt_kepatuhan = 'Selama pemeriksaan yang diperiksa mematuhi/tidak mematuhi permintaan Pejabat Bea dan Cukai'
			+ '/menunjukkan sikap melawan/tidak menghormati Pejabat Bea dan Cukai*.'
		this.write(txt_kepatuhan)
		this.break()

		this.write('Demikian Berita Acara ini dibuat dengan sebenarnya.', inds.ttd1)
		this.break(1)

		///// TTD /////
		this.write(`Tangerang, ${this.full_tgl_dok}`, inds.ttd2)
		this.break()

		let ln_ttd = this.ln

		// Terperiksa
		this.ttd(
			inds.ttd1,
			'Orang yang diperiksa,',
			undefined,
			data_orang.nama,
		)
		this.break()

		// Saksi
		this.ttd(
			inds.ttd1,
			'Saksi,',
			undefined,
			this.txt.saksi,
		)

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
	}

	writeData(lbl, data)
	{
		this.write(lbl, undefined, undefined, 'left', this.page_width-inds.cln-12)
		this.write(':', inds.cln)
		this.write(data, inds.txt)
		this.break()
	}
}

export default PdfRiksaBadan