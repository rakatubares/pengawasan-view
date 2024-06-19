import PdfPenindakan from "./PdfPenindakan"

const inds = {
	alp: 15,
	dtl: 20,
	cln: 90,
	txt: 93,
	num_cln: 55,
	num_txt: 58,
	ttd1: 17,
	ttd2: 127,
	lamp: 140
}

class PdfSbp extends PdfPenindakan {
	constructor(
		data, 
		title = 'SURAT BUKTI PENINDAKAN', 
	) {
		super(data, title, inds)
	}

	generateText()
	{
		this.prepareDocDate(this.data.tanggal_dokumen)
		if (this.data.penindakan.sprint) {
			let tgl_sprint = this.prepareDate(this.data.penindakan.sprint.tanggal_sprint)
			this.tgl_sprint = tgl_sprint['short_tgl']
			this.full_tgl_sprint = tgl_sprint['full_tgl']	
		} else {
			this.tgl_sprint = ''
			this.full_tgl_sprint = ''
		}

		this.txt = {}
		
		// Dasar penindakan
		if (this.data.penindakan.sprint) {
			this.txt.dasar_penindakan = 'Dasar penindakan, Surat Perintah Nomor : ' 
				+ this.data.penindakan.sprint.nomor_sprint 
				+ ' tanggal ' + this.full_tgl_sprint + '.'	
		} else {
			this.txt.dasar_penindakan = 'Dasar penindakan, Surat Perintah Nomor :     tanggal     .'
		}

		// Perintah
		this.txt.perintah = 'Perintah yang dilaksanakan : '
			+ 'Penghentian, pemeriksaan, penegahan, penyegelan, '
			+ 'penghentian pembongkaran dan/atau penegahan di bidang HKI*.'

		// Lokasi Penindakan
		this.txt.lokasi = this.data.penindakan.lokasi_penindakan || ''

		// Uraian Penindakan
		this.txt.uraian = this.data.penindakan.uraian_penindakan || ''

		// Alasan Penindakan
		this.txt.alasan = this.data.penindakan.alasan_penindakan || ''

		// Jenis Palanggaran
		this.txt.pelanggaran = this.data.penindakan.jenis_pelanggaran || ''

		// Tindakan
		this.txt.tindakan = 'Tindakan yang diambil : pemeriksaan dihentikan / diijinkan meneruskan perjalanan / '
			+ 'penegahan / penyegelan / dibawa ke Kantor Bea dan Cukai terdekat / '
			+ 'dibawa ke Kantor Bea dan Cukai tempat kedudukan penjabat penerbit Surat Perintah / diserahkan kepada PPNS Bea dan Cukai*.'

		// Mulai
		this.txt.mulai = this.data.penindakan.tanggal_mulai_penindakan
			? this.data.penindakan.waktu_mulai_penindakan
				? `${this.data.penindakan.tanggal_mulai_penindakan} ${this.data.penindakan.waktu_mulai_penindakan}`
				: this.data.penindakan.tanggal_mulai_penindakan
			: ''

		// Selesai
		this.txt.selesai = this.data.penindakan.tanggal_selesai_penindakan
			? this.data.penindakan.waktu_selesai_penindakan
				? `${this.data.penindakan.tanggal_selesai_penindakan} ${this.data.penindakan.waktu_selesai_penindakan}`
				: this.data.penindakan.tanggal_selesai_penindakan
			: ''

		// Hal Terjadi
		this.txt.hal_terjadi = this.data.penindakan.hal_terjadi || ''

		// Saksi
		this.txt.saksi = this.data.penindakan.saksi
			? this.data.penindakan.saksi.nama : ''

		// Keterangan
		this.txt.keterangan = 'Yang dimaksud dengan "barang yang dikuasai negara" adalah '
			+ 'barang yang untuk sementara waktu penguasaannya berada pada negara '
			+ 'sampai dapat ditentukan status barang yang sebenarnya. '
			+ 'Perubahaan status ini dimaksudkan agar pejabat bea dan cukai '
			+ 'dapat memproses barang tersebut secara administrasi sampai dapat dibuktikan '
			+ 'bahwa telah terjadi kesalahan atau sama sekali tidak terjadi kesalahan.'
	}

	writeText()
	{
		this.createHeader()
		this.createNomor(this.jenis_dok, this.data.no_dok_lengkap)

		// Dasar Penindakan
		this.write('1.')
		this.write(this.txt.dasar_penindakan, inds.alp)
		this.break()

		// Perintah
		this.write('2.')
		this.write(this.txt.perintah, inds.alp)
		this.break()

		// Objek Penindakan
		this.write('3.')
		this.write('Obyek Penindakan:', inds.alp)
		this.break()

		this.writeSarkut(this.data.penindakan.objek.sarkut, true)
		this.writeBarang(this.data.penindakan.objek.barang, true)
		this.writeBangunan(this.data.penindakan.objek.bangunan, true)
		this.writeBadan(this.data.penindakan.objek.badan, true)

		// Lokasi
		this.write('4.')
		this.write('Lokasi Penindakan', inds.alp)
		this.write(':', inds.num_cln)
		this.write(this.txt.lokasi, inds.num_txt)
		this.break()

		// Uraian
		this.write('5.')
		this.write('Uraian Penindakan', inds.alp)
		this.write(':', inds.num_cln)
		this.write(this.txt.uraian, inds.num_txt)
		this.break()

		// Alasan
		this.write('6.')
		this.write('Alasan Penindakan', inds.alp)
		this.write(':', inds.num_cln)
		this.write(this.txt.alasan, inds.num_txt)
		this.break()

		// Pelanggaran
		this.write('7.')
		this.write('Jenis Pelanggaran', inds.alp)
		this.write(':', inds.num_cln)
		this.write(this.txt.pelanggaran, inds.num_txt)
		this.break()

		// Tindakan
		this.write('8.')
		this.write(this.txt.tindakan, inds.alp)
		this.break()

		// Waktu
		this.write('9.')
		this.write('Waktu Penindakan', inds.alp)
		this.break()
		this.write('Dimulai tanggal', inds.alp)
		this.write(':', inds.num_cln)
		this.write(this.txt.mulai, inds.num_txt)
		this.break()
		this.write('Berakhir', inds.alp)
		this.write(':', inds.num_cln)
		this.write(this.txt.selesai, inds.num_txt)
		this.break()

		// Hal terjadi
		this.write('10.')
		this.write('Hal yang terjadi', inds.alp)
		this.write(':', inds.num_cln)
		this.write(this.txt.hal_terjadi, inds.num_txt)
		this.break(1)

		///// TTD /////
		this.write(`Tangerang, ${this.full_tgl_dok}`, inds.ttd2)
		this.break()

		let ln_ttd = this.ln

		// Saksi
		this.ttd(
			inds.ttd1,
			'Pengangkut/Pemilik/Kuasanya/Saksi*',
			undefined, 
			this.txt.saksi,
		)

		// Pejabat
		this.ln = ln_ttd
		this.ttd(
			inds.ttd2,
			'Pejabat yang melakukan penindakan,',
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

		////// KETERANGAN //////
		this.pdf.setFont('Helvetica', 'italic')
		this.pdf.setFontSize('7')
		this.write('*Coret yang tidak perlu')
		this.break()
		this.write(this.txt.keterangan)

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

export default PdfSbp