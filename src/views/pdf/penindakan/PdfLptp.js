import PdfPenindakan from "./PdfPenindakan";

const inds = {
	lbl: 16,
	cln: 52,
	txt: 55,
	lbl2: 130,
	cln2: 160,
	txt2: 163,
	lbl3: 22,
	cln3: 30,
	txt3: 33,
	ttd1: 17,
	ttd2: 127,
	lamp: 140
}

class PdfLptp extends PdfPenindakan {
	constructor(
		data, 
		title='LAPORAN PELAKSANAAN TUGAS PENINDAKAN', 
	) {
		super(data, title)
	}

	generateText()
	{
		this.prepareDocDate(this.data.tanggal_dokumen)

		this.txt = {}

		this.txt.no_sprint = this.data.penindakan.sprint 
			? this.data.penindakan.sprint.nomor_sprint
			: '-' 
		this.txt.tgl_sprint = this.data.penindakan.sprint 
			? this.data.penindakan.sprint.tanggal_sprint
			: '-' 

		this.txt.locus = this.data.penindakan.lokasi_penindakan || '-'
		this.txt.tempus_tanggal = this.data.penindakan.tanggal_selesai_penindakan || '-'
		this.txt.tempus_jam = this.data.penindakan.waktu_selesai_penindakan || '-'

		let kategori = this.data.penindakan.kategori_penindakan
			? this.data.penindakan.kategori_penindakan.kategori || ''
			: ''
		let uraian = this.data.penindakan.uraian_penindakan || ''
		this.txt.kategori_uraian = kategori != ''
			? uraian != ''
				? `${kategori} / ${uraian}` : kategori
			: uraian != ''
				? uraian : '-'

		this.txt.nomor_sbp = this.data.sbp.no_dok_lengkap || ''
		this.txt.tanggal_sbp = this.data.sbp.tanggal_dokumen || ''

		this.txt.hal_terjadi = this.data.penindakan.hal_terjadi || ''
		this.txt.alasan = this.data.alasan || ''
		this.txt.catatan = this.data.catatan || ''
	}

	writeText()
	{
		this.createHeader()
		this.createNomor(this.jenis_dok, this.data.no_dok_lengkap)

		///// Uraian Top /////
		// Surat Perintah
		this.write('1.')
		this.write('Surat Perintah', inds.lbl)
		this.write(':', inds.cln)
		this.write(this.txt.no_sprint, inds.txt)
		this.write('Tanggal', inds.lbl2)
		this.write(':', inds.cln2)
		this.write(this.txt.tgl_sprint, inds.txt2)
		this.break()
		this.write('Nomor', inds.lbl)
		this.break()

		// Locusdan tempus
		let ln_locus_tempus = this.ln
		this.write('2.')
		this.write('Locus', inds.lbl)
		this.write(':', inds.cln)
		this.write('Tempus', inds.lbl2)
		this.write(':', inds.cln2)
		this.write(this.txt.tempus_tanggal, inds.txt2)
		this.break()
		this.write('Jam', inds.lbl2)
		this.write(':', inds.cln2)
		this.write(this.txt.tempus_jam, inds.txt2)
		let temp_ln_locus_tempus = this.ln
		this.ln = ln_locus_tempus
		this.write(this.txt.locus, inds.txt, undefined, undefined, this.page_width-inds.lbl2-5)
		if (temp_ln_locus_tempus > this.ln) {
			this.ln = temp_ln_locus_tempus
			this.break_height = this.font_height
		}
		this.break()

		// Kategori dan uraian
		this.write('3.')
		this.write('Kategori dan Uraian Penindakan', inds.lbl, undefined, 'left', this.page_width-inds.cln-2)
		this.write(':', inds.cln)
		this.write(this.txt.kategori_uraian, inds.txt)
		this.break()

		///// Detail /////
		// Sarkut
		let data_sarkut = this.convertSarkut(this.data.penindakan.objek.sarkut)
		this.write('A.', inds.lbl)
		this.write('Sarana Pengangkut', inds.lbl3)
		this.break()
		this.write('Jenis', inds.lbl3)
		this.write(':', inds.cln)
		this.write(data_sarkut.jenis_sarkut, inds.txt)
		this.write('No. Pol/Voy/Flight', inds.lbl2)
		this.write(':', inds.cln2)
		this.write(data_sarkut.nomor_sarkut, inds.txt2)
		this.break()
		this.write('Nomor Petikemas', inds.lbl3)
		this.write(':', inds.cln)
		this.write('Ukuran', inds.lbl2)
		this.write(':', inds.cln2)
		this.break()

		// Barang
		let data_barang = this.convertBarang(this.data.penindakan.objek.barang)
		this.write('B.', inds.lbl)
		this.write('Barang', inds.lbl3)
		this.break()
		this.write('Komoditi/Jenis', inds.lbl3)
		this.write(':', inds.cln)
		this.write(data_barang.komoditi, inds.txt)
		this.break()
		this.write('Jumlah', inds.lbl3)
		this.write(':', inds.cln)
		this.write(data_barang.jumlah, inds.txt)
		this.break()

		// Bangunan
		let data_bangunan = this.convertBangunan(this.data.penindakan.objek.bangunan)
		this.write('C.', inds.lbl)
		this.write('Bangunan/Tempat', inds.lbl3)
		this.break()
		this.write('Alamat', inds.lbl3)
		this.write(':', inds.cln)
		this.write(data_bangunan.alamat, inds.txt)
		this.break()
		this.write('No Reg Bangunan / NPPBKC / dll.', inds.lbl3, undefined, 'left', this.page_width-inds.cln-10)
		this.write(':', inds.cln)
		this.write(data_bangunan.no_reg, inds.txt)
		this.break()
		this.write('Pemilik / yang menguasai', inds.lbl3, undefined, 'left', this.page_width-inds.cln-10)
		this.write(':', inds.cln)
		this.write(data_bangunan.pemilik, inds.txt)
		this.break()

		// Orang
		let data_orang = this.convertBadan(this.data.penindakan.objek.badan)
		this.write('D.', inds.lbl)
		this.write('Orang', inds.lbl3)
		this.break()
		this.write('Nama', inds.lbl3)
		this.write(':', inds.cln)
		this.write(data_orang.nama, inds.txt, undefined, undefined, this.page_width-inds.lbl2)
		this.write('Tanggal Lahir', inds.lbl2)
		this.write(':', inds.cln2)
		this.write(data_orang.tanggal_lahir, inds.txt2)
		this.break()
		this.write('Jenis Kelamin', inds.lbl3)
		this.write(':', inds.cln)
		this.write(data_orang.jenis_kelamin, inds.txt, undefined, undefined, this.page_width-inds.lbl2)
		this.write('Identitas', inds.lbl2)
		this.write(':', inds.cln2)
		this.write(data_orang.identitas, inds.txt2)
		this.break()

		///// Uraian Bottom /////
		// SBP
		this.write('4.')
		this.write('SB Penindakan', inds.lbl)
		this.write(':', inds.cln)
		this.write(this.txt.nomor_sbp, inds.txt)
		this.write('Tanggal', inds.lbl2)
		this.write(':', inds.cln2)
		this.write(this.txt.tanggal_sbp, inds.txt2)
		this.break()

		// Diberikan kepada
		let saksi = {entitas: this.data.penindakan.saksi}
		let data_saksi = this.convertBadan(saksi)
		this.write('5.')
		this.write('Diberikan Kepada', inds.lbl)
		this.write(':', inds.cln)
		this.break()
		this.write('Nama', inds.lbl)
		this.write(':', inds.cln)
		this.write(data_saksi.nama, inds.txt, undefined, undefined, this.page_width-inds.lbl2)
		this.write('Selaku  :  Pemilik/Kuasanya*', inds.lbl2)
		this.break()
		this.write('Alamat', inds.lbl)
		this.write(':', inds.cln)
		this.write(data_saksi.alamat, inds.txt)
		this.break()
		this.write('Identitas', inds.lbl)
		this.write(':', inds.cln)
		this.write(data_saksi.identitas, inds.txt)
		this.break()

		// Hal
		this.write('6.')
		this.write('Hal yang terjadi', inds.lbl)
		this.write(':', inds.cln)
		this.write(this.txt.hal_terjadi, inds.txt)
		this.break()

		// Alasan
		this.write('7.')
		this.write('Alasan tidak dilakukan penindakan', inds.lbl, undefined, 'left', this.page_width-inds.cln-10)
		this.write(':', inds.cln)
		this.write(this.txt.alasan, inds.txt)
		this.break(1)

		///// TTD /////
		let ln_ttd = this.ln

		// Atasan
		this.ttd(
			inds.ttd1,
			this.data.petugas.atasan.jabatan,
			this.data.petugas.atasan.txt_tipe_ttd,
			this.data.petugas.atasan.name,
			this.data.petugas.atasan.nip,
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
		this.break(1)

		///// Catatan /////
		this.write('Catatan', inds.lbl)
		this.write(':', inds.cln3)
		this.write(this.txt.catatan, inds.txt3)
		this.break(1)

		///// Tembusan /////
		this.cc(this.data.tembusan, inds.lbl)

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

export default PdfLptp