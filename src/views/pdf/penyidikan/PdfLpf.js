import converters from "../../../helpers/converter";
import Pdf from "../MyPdf"

const inds = {
	num: 15,
	lbl: 20,
	cln: 70,
	txt: 75,
	lbl2: 25,
	lbl3: 30,
	ttd1: 17,
	ttd2: 127,
	ttd3: 75,
	lamp: 140,
}

class PdfLpf extends Pdf {
	constructor(data) {
		super(data, 'LEMBAR PENELITIAN FORMAL (LPF)', 30)
	}

	generateText()
	{
		super.generateText()

		// Pelanggaran
		this.txt.jenis_pelanggaran = this.data.penyidikan.jenis_pelanggaran
			? this.data.penyidikan.pasal
				? `${this.data.penyidikan.jenis_pelanggaran} / ${this.data.penyidikan.pasal}`
				: this.data.penyidikan.jenis_pelanggaran
			: this.data.penyidikan.pasal
				? this.data.penyidikan.pasal
				: '-'
		this.txt.tempat = this.data.penyidikan.tempat_pelanggaran || '-'
		this.txt.waktu = this.data.penyidikan.tanggal_pelanggaran
			? this.data.penyidikan.waktu_pelanggaran
				? `${this.data.penyidikan.tanggal_pelanggaran} ${this.data.penyidikan.waktu_pelanggaran}`
				: this.data.penyidikan.tanggal_pelanggaran
			: this.data.penyidikan.waktu_pelanggaran
				? this.data.penyidikan.waktu_pelanggaran
				: '-'
		this.txt.nama_pelaku = this.data.penyidikan.pelaku.nama || '-'
		this.txt.umur = '-'
		let tanggal_lahir = this.data.penyidikan.pelaku.tanggal_lahir
		let tanggal_pelanggaran = this.data.penyidikan.tanggal_pelanggaran
		if (tanggal_lahir && tanggal_pelanggaran) {
			this.txt.umur = converters.age(tanggal_lahir, tanggal_pelanggaran)
		}
		this.txt.jenis_kelamin = this.data.penyidikan.pelaku.jenis_kelamin.uraian || '-'
		this.txt.alamat = this.data.penyidikan.pelaku.alamat_identitas 
			? converters.string(this.data.penyidikan.pelaku.alamat_identitas)
			: this.data.penyidikan.pelaku.alamat_tinggal
				? converters.string(this.data.penyidikan.pelaku.alamat_tinggal)
				: '-'
		this.txt.status_penangkapan = this.data.penyidikan.tertangkap_tangan
			? 'Tertangkap tangan' : 'Tidak tertangkap tangan'

		// Penindakan
		this.txt.sprint = this.data.penindakan.sprint
			? this.data.penindakan.sprint.nomor_sprint
				? this.data.penindakan.sprint.tanggal_sprint
					? `${this.data.penindakan.sprint.nomor_sprint} tanggal ${this.data.penindakan.sprint.tanggal_sprint}`
					: this.data.penindakan.sprint.nomor_sprint
				: this.data.penindakan.sprint.tanggal_sprint
					? `tanggal ${this.data.penindakan.sprint.tanggal_sprint}`
					: '-'
			: '-'
		this.txt.sbp = this.data.sbp
			? this.data.sbp.no_dok_lengkap
				? this.data.sbp.tanggal_dokumen
					? `${this.data.sbp.no_dok_lengkap} tanggal ${this.data.sbp.tanggal_dokumen}`
					: this.data.sbp.no_dok_lengkap
				: this.data.sbp.tanggal_dokumen
					? `tanggal ${this.data.sbp.tanggal_dokumen}`
					: '-'
			: '-'
		this.txt.lp = this.data.lp
			? this.data.lp.no_dok_lengkap
				? this.data.lp.tanggal_dokumen
					? `${this.data.lp.no_dok_lengkap} tanggal ${this.data.lp.tanggal_dokumen}`
					: this.data.lp.no_dok_lengkap
				: this.data.lp.tanggal_dokumen
					? `tanggal ${this.data.lp.tanggal_dokumen}`
					: '-'
			: '-'
		this.txt.saksi = this.data.saksi
			? this.data.saksi.nama
				? this.data.tanggal_bap_saksi
					? `${this.data.saksi.nama} tanggal ${this.data.tanggal_bap_saksi}`
					: this.data.saksi.nama
				: this.data.tanggal_bap_saksi
					? `tanggal ${this.data.tanggal_bap_saksi}`
					: '-'
			: '-'
		this.txt.tersangka = this.data.tersangka
			? this.data.tersangka.nama
				? this.data.tanggal_bap_tersangka
					? `${this.data.tersangka.nama} tanggal ${this.data.tanggal_bap_tersangka}`
					: this.data.tersangka.nama
				: this.data.tanggal_bap_tersangka
					? `tanggal ${this.data.tanggal_bap_tersangka}`
					: '-'
			: '-'
		this.txt.resume = this.data.resume_perkara
			? this.data.tanggal_resume_perkara
				? `${this.data.resume_perkara} tanggal ${this.data.tanggal_resume_perkara}`
				: this.data.resume_perkara
			: this.data.tanggal_resume_perkara
				? `tanggal ${this.data.tanggal_resume_perkara}`
				: '-'
		this.txt.dokumen_lain = this.data.jenis_dokumen_lain
			? this.data.nomor_dokumen_lain
				? this.data.tanggal_dokumen_lain
					? `${this.data.jenis_dokumen_lain} ${this.data.nomor_dokumen_lain} tanggal ${this.data.tanggal_dokumen_lain}`
					: `${this.data.jenis_dokumen_lain} ${this.data.nomor_dokumen_lain}`
				: this.data.tanggal_dokumen_lain
					? `${this.data.jenis_dokumen_lain} tanggal ${this.data.tanggal_dokumen_lain}`
					: this.data.jenis_dokumen_lain
			: this.data.nomor_dokumen_lain
				? this.data.tanggal_dokumen_lain
					? `${this.data.nomor_dokumen_lain} tanggal ${this.data.tanggal_dokumen_lain}`
					: `${this.data.nomor_dokumen_lain}`
				: this.data.tanggal_dokumen_lain
					? `tanggal ${this.data.tanggal_dokumen_lain}`
					: '-'

		// BHP
		this.txt.komoditi = '-'
		if (this.data.penyidikan.bhp.item) {
			this.txt.komoditi = this.getKomoditi(this.data.penyidikan.bhp.item)
		}

		this.txt.barang = ''
		this.txt.merek = ''
		this.txt.kondisi = ''
		this.txt.tipe = ''
		this.txt.spesifikasi_lain = ''
		this.txt.jumlah_koli = ''
		this.txt.jenis_koli = ''
		if (this.data.penyidikan.bhp != null) {
			if (this.data.penyidikan.bhp.item.length == 0) {
				this.txt.barang = '-'
				this.txt.merek = '-'
				this.txt.kondisi = '-'
				this.txt.tipe = '-'
				this.txt.spesifikasi_lain = '-'
				this.txt.jumlah_koli = '-'
				this.txt.jenis_koli = '-'
			} else if (this.data.penyidikan.bhp.item.length > 1) {
				this.txt.barang = `${this.data.penyidikan.bhp.item.length} ITEM BARANG, TERLAMPIR`
			} else {
				this.txt.barang = this.data.penyidikan.bhp.item[0].uraian_barang
				this.txt.merek = this.data.penyidikan.bhp.item[0].merek || ''
				this.txt.kondisi = this.data.penyidikan.bhp.item[0].kondisi || ''
				this.txt.tipe = this.data.penyidikan.bhp.item[0].tipe || ''
				this.txt.spesifikasi_lain = this.data.penyidikan.bhp.item[0].spesifikasi_lain || ''
				this.txt.jumlah_koli = this.data.penyidikan.bhp.item[0].jumlah_koli || ''
				this.txt.jenis_koli = this.data.penyidikan.bhp.item[0].jenis_koli || ''
			}	
		}

		this.txt.jenis_dok_asal = this.data.penyidikan.bhp.jenis_dokumen || '-'
		// this.txt.kantor_dok_asal = this.data.penyidikan.bhp.kantor_dokumen || '-'
		this.txt.nomor_dok_asal = this.data.penyidikan.bhp.nomor_dokumen || '-'
		this.txt.tanggal_dok_asal = this.data.penyidikan.bhp.tanggal_dokumen || '-'

		this.txt.nama_sarkut = this.data.penyidikan.bhp.nama_sarkut || '-'
		this.txt.nomor_sarkut = this.data.penyidikan.bhp.nomor_sarkut
			? this.data.penyidikan.bhp.registrasi_sarkut
				? `${this.data.penyidikan.bhp.nomor_sarkut} / ${this.data.penyidikan.bhp.registrasi_sarkut}`
				: this.data.penyidikan.bhp.nomor_sarkut
			: this.data.penyidikan.bhp.registrasi_sarkut
				? this.data.penyidikan.bhp.registrasi_sarkut
				: '-'
		this.txt.nomor_kontainer = this.data.penyidikan.bhp.nomor_kontainer || '-'
		this.txt.ukuran_kontainer = this.data.penyidikan.bhp.ukuran_kontainer || '-'

		// Simpulan
		this.txt.kesimpulan = this.data.kesimpulan || '-'
		this.txt.usulan = this.data.usulan || '-'
		this.txt.catatan = this.data.catatan || '-'
	}

	writeText()
	{
		this.createHeaderSimple()
		this.createNomor(this.jenis_dok, this.data.no_dok_lengkap)

		////// URAIAN PELANGGARAN //////
		this.pdf.setFont('Helvetica', 'bold')
		this.write('A.')
		this.write('Uraian Pelanggaran', inds.num)
		this.pdf.setFont('Helvetica', 'normal')
		this.break()

		this.write('1.', inds.num)
		this.write('Jenis Pelanggaran / Pasal', inds.lbl)
		this.write(':', inds.cln)
		this.write(this.txt.jenis_pelanggaran, inds.txt)
		this.break()

		this.write('2.', inds.num)
		this.write('Tempat (Locus)', inds.lbl)
		this.write(':', inds.cln)
		this.write(this.txt.tempat, inds.txt)
		this.break()

		this.write('3.', inds.num)
		this.write('Waktu (Tempus)', inds.lbl)
		this.write(':', inds.cln)
		this.write(this.txt.waktu, inds.txt)
		this.break()

		this.write('4.', inds.num)
		this.write('Pelaku', inds.lbl)
		this.break()

		this.write('Nama', inds.lbl)
		this.write(':', inds.cln)
		this.write(this.txt.nama_pelaku, inds.txt)
		this.break()

		this.write('Jenis Kelamin', inds.lbl)
		this.write(':', inds.cln)
		this.write(this.txt.jenis_kelamin, inds.txt)
		this.break()

		this.write('Umur', inds.lbl)
		this.write(':', inds.cln)
		this.write(this.txt.umur, inds.txt)
		this.break()

		this.write('Alamat', inds.lbl)
		this.write(':', inds.cln)
		this.write(this.txt.alamat, inds.txt)
		this.break()

		this.write('5.', inds.num)
		this.write('Status Penangkapan', inds.lbl)
		this.write(':', inds.cln)
		this.write(this.txt.status_penangkapan, inds.txt)
		this.break()

		////// KELENGKAPAN PENINDAKAN //////
		this.pdf.setFont('Helvetica', 'bold')
		this.write('B.')
		this.write('Kelengkapan Dokumen Penindakan', inds.num)
		this.pdf.setFont('Helvetica', 'normal')
		this.break()

		this.write('1.', inds.num)
		this.write('No. Surat Perintah / Tugas', inds.lbl)
		this.write(':', inds.cln)
		this.write(this.txt.sprint, inds.txt)
		this.break()

		this.write('2.', inds.num)
		this.write('No. SBP', inds.lbl)
		this.write(':', inds.cln)
		this.write(this.txt.sbp, inds.txt)
		this.break()

		this.write('3.', inds.num)
		this.write('No. LP / LK / Lap. Polisi', inds.lbl)
		this.write(':', inds.cln)
		this.write(this.txt.lp, inds.txt)
		this.break()

		this.write('4.', inds.num)
		this.write('BAP Saksi atas nama', inds.lbl)
		this.write(':', inds.cln)
		this.write(this.txt.saksi, inds.txt)
		this.break()

		this.write('5.', inds.num)
		this.write('BAP Tersangka atas nama', inds.lbl)
		this.write(':', inds.cln)
		this.write(this.txt.tersangka, inds.txt)
		this.break()

		this.write('6.', inds.num)
		this.write('Resume Perkara', inds.lbl)
		this.write(':', inds.cln)
		this.write(this.txt.resume, inds.txt)
		this.break()

		this.write('7.', inds.num)
		this.write('Dokumen Lain', inds.lbl)
		this.write(':', inds.cln)
		this.write(this.txt.dokumen_lain, inds.txt)
		this.break()

		////// BHP //////
		this.pdf.setFont('Helvetica', 'bold')
		this.write('C.')
		this.write('Barang Hasil Penindakan', inds.num)
		this.pdf.setFont('Helvetica', 'normal')
		this.break()

		this.write('1.', inds.num)
		this.write('Komoditi', inds.lbl)
		this.write(':', inds.cln)
		this.write(this.txt.komoditi, inds.txt)
		this.break()

		this.write('Uraian Barang', inds.lbl)
		this.write(':', inds.cln)
		this.write(this.txt.barang, inds.txt)
		this.break()

		this.write('Merek', inds.lbl)
		this.write(':', inds.cln)
		this.write(this.txt.merek, inds.txt)
		this.break()

		this.write('Kondisi', inds.lbl)
		this.write(':', inds.cln)
		this.write(this.txt.kondisi, inds.txt)
		this.break()

		this.write('Tipe', inds.lbl)
		this.write(':', inds.cln)
		this.write(this.txt.tipe, inds.txt)
		this.break()

		this.write('Spesifikasi Lain', inds.lbl)
		this.write(':', inds.cln)
		this.write(this.txt.spesifikasi_lain, inds.txt)
		this.break()

		this.write('Jumlah Koli', inds.lbl)
		this.write(':', inds.cln)
		this.write(this.txt.jumlah_koli, inds.txt)
		this.break()

		this.write('Jenis Koli', inds.lbl)
		this.write(':', inds.cln)
		this.write(this.txt.jenis_koli, inds.txt)
		this.break()

		this.write('2.', inds.num)
		this.write('Dokumen Pab. / Cukai Asal', inds.lbl)
		this.write(':', inds.cln)
		this.write(this.txt.jenis_dok_asal, inds.txt)
		this.break()

		this.write('Kantor Pendaftaran', inds.lbl)
		this.write(':', inds.cln)
		// this.write(this.txt.kantor_dok_asal, inds.txt)
		this.break()

		this.write('Nomor', inds.lbl)
		this.write(':', inds.cln)
		this.write(this.txt.nomor_dok_asal, inds.txt)
		this.break()

		this.write('Tanggal', inds.lbl)
		this.write(':', inds.cln)
		this.write(this.txt.tanggal_dok_asal, inds.txt)
		this.break()

		this.write('3.', inds.num)
		this.write('Pengangkut', inds.lbl)
		this.write(':', inds.cln)
		this.write(this.txt.nama_sarkut, inds.txt)
		this.break()

		this.write('No. Voyage / No. Polisi', inds.lbl)
		this.write(':', inds.cln)
		this.write(this.txt.nomor_sarkut, inds.txt)
		this.break()

		this.write('Kontainer No.', inds.lbl)
		this.write(':', inds.cln)
		this.write(this.txt.nomor_kontainer, inds.txt)
		this.break()

		this.write('Ukuran', inds.lbl)
		this.write(':', inds.cln)
		this.write(this.txt.ukuran_kontainer, inds.txt)
		this.break()

		////// SIMPULAN //////
		this.pdf.setFont('Helvetica', 'bold')
		this.write('D.')
		this.write('Kesimpulan', inds.num)
		this.pdf.setFont('Helvetica', 'normal')
		this.write(':', inds.cln)
		this.write(this.txt.kesimpulan, inds.txt)
		this.break()

		this.pdf.setFont('Helvetica', 'bold')
		this.write('E.')
		this.write('Usulan', inds.num)
		this.pdf.setFont('Helvetica', 'normal')
		this.write(':', inds.cln)
		this.write(this.txt.usulan, inds.txt)
		this.break()

		this.pdf.setFont('Helvetica', 'bold')
		this.write('F.')
		this.write('Catatan / diposisi atasan', inds.num)
		this.pdf.setFont('Helvetica', 'normal')
		this.write(':', inds.cln)
		this.break(1)
		let y_rect_catatan = this.ln - 4
		this.write(this.txt.catatan, inds.num, undefined, undefined, inds.num-this.left_margin)
		this.break()
		let h_rect_catatan = this.ln - y_rect_catatan - 2
		this.pdf.rect(this.left_margin, y_rect_catatan, this.page_width-2*this.left_margin, h_rect_catatan, 'D')
		this.break()

		///// TTD /////
		this.write(`Tangerang, ${this.full_tgl_dok}`, inds.ttd2)
		this.break()

		let ln_ttd = this.ln

		// Atasan 1
		this.ttd(
			inds.ttd1,
			this.data.petugas.atasan1.jabatan,
			this.data.petugas.atasan1.txt_tipe_ttd,
			this.data.petugas.atasan1.name,
			this.data.petugas.atasan1.nip,
		)

		// Peneliti
		this.ln = ln_ttd
		this.ttd(
			inds.ttd2,
			'Tim Peneliti,',
			undefined,
			this.data.petugas.peneliti.name,
			this.data.petugas.peneliti.nip,
		)
		this.break()

		// Atasan 2
		this.ttd(
			inds.ttd3,
			this.data.petugas.atasan2.jabatan,
			this.data.petugas.atasan2.txt_tipe_ttd,
			this.data.petugas.atasan2.name,
			this.data.petugas.atasan2.nip,
		)

		let checkLn = this.ln

		////// LAMPIRAN //////
		if (this.data.penyidikan.bhp) {
			if (this.data.penyidikan.bhp.item.length > 1) {
				this.pdf.setFont('Helvetica', 'normal')
				this.pdf.addPage()
				// Header
				this.headerLampiran()
				// Tabel barang
				this.tabelBarang(this.data.penyidikan.bhp.item)
			}
		}

		return checkLn
	}

	getKomoditi(item_barang) {
		let flat_komoditi = [];
		item_barang.forEach(item => {
			if (item.kategori != null) {
				let kategori = item.kategori.kategori
				if (!flat_komoditi.includes(kategori)) {
					flat_komoditi.push(kategori)	
				}
			}
		});
		
		let txt_komoditi = flat_komoditi.join(', ');
		return txt_komoditi
	}
}

export default PdfLpf