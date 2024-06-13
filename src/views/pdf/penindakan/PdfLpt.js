import pangkat from "../../../helpers/pangkat";
import PdfPenindakan from "./PdfPenindakan";

const inds = {
	num: 15,
	lbl: 20,
	cln: 43,
	txt: 45,
	cln2: 70,
	txt2: 72,
	ttd1: 17,
	ttd2: 127,
	lamp: 140,
}

class PdfLpt extends PdfPenindakan {
	constructor(
		data, 
		title='LAPORAN PELAKSANAAN TUGAS', 
	) {
		super(data, title)
	}

	generateText() 
	{
		this.prepareDocDate(this.data.tanggal_dokumen)

		this.txt = {}

		// Petugas 1
		this.txt.nama_petugas1 = this.data.penindakan.petugas.petugas1
			? this.data.penindakan.petugas.petugas1.name || '-'
			: '-'
		this.txt.nip_petugas1 = this.data.penindakan.petugas.petugas1
			? this.data.penindakan.petugas.petugas1.nip || '-'
			: '-'
		this.txt.pangkat_petugas1 = this.data.penindakan.petugas.petugas1
			? this.data.penindakan.petugas.petugas1.pangkat
				? `${pangkat.getPangkat(this.data.penindakan.petugas.petugas1.pangkat)} / ${this.data.penindakan.petugas.petugas1.pangkat}`
				: '-'
			: '-'

		// Petugas 2
		this.txt.nama_petugas2 = this.data.penindakan.petugas.petugas2
			? this.data.penindakan.petugas.petugas2.name || '-'
			: '-'
		this.txt.nip_petugas2 = this.data.penindakan.petugas.petugas2
			? this.data.penindakan.petugas.petugas2.nip || '-'
			: '-'
		this.txt.pangkat_petugas2 = this.data.penindakan.petugas.petugas2
			? this.data.penindakan.petugas.petugas2.pangkat
				? `${pangkat.getPangkat(this.data.penindakan.petugas.petugas2.pangkat)} / ${this.data.penindakan.petugas.petugas2.pangkat}`
				: '-'
			: '-'

		let jabatan_sprint = this.data.penindakan.sprint 
			? this.data.penindakan.sprint.pejabat.jabatan
			: '     ' 
		let nomor_sprint = this.data.penindakan.sprint 
			? this.data.penindakan.sprint.nomor_sprint
			: '     ' 
		let tanggal_sprint = this.data.penindakan.sprint 
			? this.data.penindakan.sprint.tanggal_sprint
			: '     ' 
		let barang = this.data.barang || '     '
		this.txt.uraian = `Sehubungan dengan Surat Perintah ${jabatan_sprint} nomor ${nomor_sprint} `
			+ `tanggal ${tanggal_sprint} telah dilaksanakan pemeriksaan atas barang ${barang}, `
			+ 'dengan data sebagai berikut:'

		this.txt.jumlah_kemasan = this.data.penindakan.objek.barang
			? `${this.data.penindakan.objek.barang.jumlah_kemasan} (${this.converters.numTerbilang(this.data.penindakan.objek.barang.jumlah_kemasan)})`
			: ''
		this.txt.jenis_kemasan = this.data.penindakan.objek.barang
			? this.data.penindakan.objek.barang.kemasan.kemasan
			: ''
		
		this.txt.lokasi_penindakan = this.data.penindakan.lokasi_penindakan || ''
		this.txt.waktu_penindakan = this.data.penindakan.tanggal_selesai_penindakan || ''
		this.txt.sarpras = this.data.sarpras || ''
		this.txt.saksi = this.data.penindakan.saksi
			? this.data.penindakan.saksi.nama : '-'
		this.txt.sbp = this.data.sbp 
			? this.data.sbp.no_dok_lengkap
				? this.data.sbp.tanggal_dokumen
					? `${this.data.sbp.no_dok_lengkap} tanggal ${this.data.sbp.tanggal_dokumen}`
					: this.data.sbp.no_dok_lengkap
				: this.data.sbp.tanggal_dokumen
					? `tanggal ${this.data.sbp.tanggal_dokumen}`
					: '-'
			: '-'

		this.txt.kronologi = this.data.kronologi || '-'
	}

	writeText()
	{
		this.createHeader()
		this.createNomor(this.jenis_dok, this.data.no_dok_lengkap)

		///// IDENTITAS /////
		this.write('Kami yang bertanda tangan di bawah ini:')
		this.break()

		// Petugas 1
		this.write('1.', inds.num)
		this.write('Nama', inds.lbl)
		this.write(':', inds.cln)
		this.write(this.txt.nama_petugas1, inds.txt)
		this.break()
		this.write('NIP', inds.lbl)
		this.write(':', inds.cln)
		this.write(this.txt.nip_petugas1, inds.txt)
		this.break()
		this.write('Pangkat/Gol', inds.lbl)
		this.write(':', inds.cln)
		this.write(this.txt.pangkat_petugas1, inds.txt)
		this.break()

		// Petugas 2
		this.write('2.', inds.num)
		this.write('Nama', inds.lbl)
		this.write(':', inds.cln)
		this.write(this.txt.nama_petugas2, inds.txt)
		this.break()
		this.write('NIP', inds.lbl)
		this.write(':', inds.cln)
		this.write(this.txt.nip_petugas2, inds.txt)
		this.break()
		this.write('Pangkat/Gol', inds.lbl)
		this.write(':', inds.cln)
		this.write(this.txt.pangkat_petugas2, inds.txt)
		this.break(1)

		///// URAIAN /////
		this.write(this.txt.uraian)
		this.break()

		let data_barang = this.convertBarang(this.data.penindakan.objek.barang)

		// Jumlah kemasan
		this.write('a.', inds.num)
		this.write('Jumlah / Jenis / Ukuran Nomor', inds.lbl)
		this.write(':', inds.cln2)
		this.write(this.txt.jumlah_kemasan, inds.txt2)
		this.break()

		// Jenis kemasan
		this.write('b.', inds.num)
		this.write('Peti Kemas / Kemasan', inds.lbl)
		this.write(':', inds.cln2)
		this.write(this.txt.jenis_kemasan, inds.txt2)
		this.break()

		// Barang
		this.write('c.', inds.num)
		this.write('Jumlah / Jenis Barang', inds.lbl)
		this.write(':', inds.cln2)
		this.write(data_barang.barang, inds.txt2)
		this.break()

		// Dokumen
		this.write('d.', inds.num)
		this.write('Jenis / Nomor dan Tgl Dok.', inds.lbl)
		this.write(':', inds.cln2)
		this.write(data_barang.dokumen, inds.txt2)
		this.break()

		// Pemilik
		this.write('e.', inds.num)
		this.write('Pemilik / Kuasa', inds.lbl)
		this.write(':', inds.cln2)
		this.write(data_barang.pemilik, inds.txt2)
		this.break()

		this.write('Hal-hal yang perlu disampaikan:')
		this.break()

		// Lokasi
		this.write('a.', inds.num)
		this.write('Wilayah / Lokasi Tugas', inds.lbl)
		this.write(':', inds.cln2)
		this.write(this.txt.lokasi_penindakan, inds.txt2)
		this.break()

		// Waktu
		this.write('b.', inds.num)
		this.write('Jangka Waktu', inds.lbl)
		this.write(':', inds.cln2)
		this.write(this.txt.waktu_penindakan, inds.txt2)
		this.break()

		// Sarpras
		this.write('c.', inds.num)
		this.write('Sarana Prasarana', inds.lbl)
		this.write(':', inds.cln2)
		this.write(this.txt.sarpras, inds.txt2)
		this.break()

		// Saksi
		this.write('d.', inds.num)
		this.write('Pemilik / Kuasa / Saksi', inds.lbl)
		this.write(':', inds.cln2)
		this.write(this.txt.saksi, inds.txt2)
		this.break()

		// SBP
		this.write('e.', inds.num)
		this.write('Hasil dan Tindak Lanjut', inds.lbl)
		this.write(':', inds.cln2)
		this.write(this.txt.sbp, inds.txt2)
		this.break()

		// Kronologi
		this.write('f.', inds.num)
		this.write('Kronologi Pelaksanaan Tugas', inds.lbl)
		this.write(':', inds.cln2)
		this.break()
		this.write(this.txt.kronologi, inds.lbl)
		this.break(1)

		this.write('Demikiam disampaikan sebagai laporan.', inds.lbl)
		this.break(1)

		///// TTD /////
		// Pejabat
		this.write('Mengetahui:', inds.ttd1)
		this.break()
		let ln_ttd = this.ln
		this.ttd(
			inds.ttd1,
			this.data.petugas.pejabat.jabatan,
			this.data.petugas.pejabat.txt_tipe_ttd,
			this.data.petugas.pejabat.name,
			this.data.petugas.pejabat.nip,
		)

		// Petugas 1
		this.ln = ln_ttd
		this.ttd(
			inds.ttd2,
			'Petugas Penyusun,',
			undefined, 
			this.data.penindakan.petugas.petugas1.name,
			this.data.penindakan.petugas.petugas1.nip,
		)

		// Petugas 2
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

export default PdfLpt