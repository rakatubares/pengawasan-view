import PdfPenindakan from "./PdfPenindakan"

const inds = {
	lbl: 16,
	cln: 52,
	txt: 55,
	lbl2: 130,
	cln2: 160,
	txt2: 163,
	lbl3: 22,
	cln3: 57,
	txt3: 60,
	ttd1: 17,
	plh2: 128,
	ttd2: 135,
	lamp: 140
}

class PdfLpN extends PdfPenindakan {
	constructor(
		data,
		title='LAPORAN PELANGGARAN NPP',
	) {
		super(data, title);
	}

	generateText()
	{
		this.prepareDocDate(this.data.tanggal_dokumen)
		if (this.data.sprint) {
			let tgl_sprint = this.prepareDate(this.data.sprint.tanggal_sprint)
			this.tgl_sprint = tgl_sprint['short_tgl']
			this.full_tgl_sprint = tgl_sprint['full_tgl']	
		} else {
			this.tgl_sprint = ''
			this.full_tgl_sprint = ''
		}

		this.txt = {}

		this.txt.no_sprint = this.data.sprint
			? this.data.sprint.nomor_sprint || '-'
			: '-'
		this.txt.tgl_sprint = this.data.sprint
			? this.data.sprint.tanggal_sprint || '-'
			: '-'

		this.txt.locus = this.data.penindakan.lokasi_penindakan || '-'
		this.txt.tempus = this.data.penindakan.tanggal_selesai_penindakan || '-'
		this.txt.jam_tempus = this.data.penindakan.waktu_selesai_penindakan || '-'

		this.txt.uraian = this.data.penindakan.uraian_penindakan || '-'

		this.txt.no_sbp = this.data.nomor_sbp || '-'
		this.txt.tgl_sbp = this.data.tanggal_sbp || '-'

		this.txt.hal_terjadi = this.data.penindakan.hal_terjadi || '-'
		this.txt.analisa = this.data.analisa_lphp || '-'
		this.txt.kesimpulan = this.data.kesimpulan || '-'
	}

	writeText()
	{
		this.createHeader()
		this.createNomor(this.jenis_dok, this.data.no_dok_lengkap)

		///// URAIAN /////
		// SPRINT
		this.write('1.')
		this.write('Surat Perintah Nomor', inds.lbl)
		this.write(':', inds.cln)
		this.write(this.txt.no_sprint, inds.txt)
		this.write('Tanggal', inds.lbl2)
		this.write(':', inds.cln2)
		this.write(this.txt.tgl_sprint, inds.txt2)
		this.break()

		// Locus Tempus
		this.write('2.')
		this.write('Locus', inds.lbl)
		this.write(':', inds.cln)
		this.write(this.txt.locus, inds.txt, undefined, undefined, this.page_width-inds.lbl2)
		this.write('Tempus', inds.lbl2)
		this.write(':', inds.cln2)
		this.write(this.txt.tempus, inds.txt2)
		this.break()
		this.write('Jam', inds.lbl2)
		this.write(':', inds.cln2)
		this.write(this.txt.jam_tempus, inds.txt2)
		this.break()

		// Penindakan
		this.write('3.')
		this.write('Uraian Penindakan', inds.lbl)
		this.write(':', inds.cln)
		this.write(this.txt.uraian, inds.txt)
		this.break()

		// Sarkut
		let data_sarkut = this.convertSarkut(this.data.penindakan.objek.sarkut)
		this.write('A.', inds.lbl)
		this.write('Sarana Pengangkut', inds.lbl3)
		this.break()
		this.write('Jenis', inds.lbl3)
		this.write(':', inds.cln)
		this.write(data_sarkut.jenis_sarkut, inds.txt, undefined, undefined, this.page_width-inds.lbl2)
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

		// Orang
		let data_orang = this.convertBadan(
			this.data.penindakan.objek.badan, 
			this.data.penindakan.tanggal_selesai_penindakan,
		)
		this.write('C.', inds.lbl)
		this.write('Orang', inds.lbl3)
		this.break()
		this.write('Nama', inds.lbl3)
		this.write(':', inds.cln)
		this.write(data_orang.nama, inds.txt, undefined, undefined, this.page_width-inds.lbl2)
		this.write('Umur', inds.lbl2)
		this.write(':', inds.cln2)
		this.write(data_orang.umur, inds.txt2)
		this.break()
		this.write('Jenis Kelamin', inds.lbl3)
		this.write(':', inds.cln)
		this.write(data_orang.jenis_kelamin, inds.txt, undefined, undefined, this.page_width-inds.lbl2)
		this.write('Identitas', inds.lbl2)
		this.write(':', inds.cln2)
		this.write(data_orang.identitas, inds.txt2)
		this.break()
		this.write('Alamat', inds.lbl3)
		this.write(':', inds.cln)
		this.write(data_orang.alamat, inds.txt, undefined, undefined, this.page_width-inds.lbl2)
		this.write('Kewarganegaraan', inds.lbl2)
		this.write(':', inds.cln2)
		this.write(data_orang.warga_negara, inds.txt2)
		this.break()

		// SBP
		this.write('4.')
		this.write('Nomor SB Penindakan', inds.lbl)
		this.write(':', inds.cln)
		this.write(this.txt.no_sbp, inds.txt)
		this.write('Tanggal', inds.lbl2)
		this.write(':', inds.cln2)
		this.write(this.txt.tgl_sbp, inds.txt2)
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
		this.break(1)

		// Pejabat penindakan
		this.ttd(
			inds.ttd2,
			'Pejabat yang melaksanakan penindakan,',
			this.data.penindakan.petugas.petugas1.txt_tipe_ttd,
			this.data.penindakan.petugas.petugas1.name,
			this.data.penindakan.petugas.petugas1.nip,
		)
		this.break(-.5)

		// Analisa
		this.write('7.')
		this.write('Analisa hasil penindakan:', inds.lbl)
		this.break()
		this.write(this.txt.analisa, inds.lbl)
		this.break()

		// Kesimpulan
		this.write('8.')
		this.write('Kesimpulan', inds.lbl)
		this.write(':', inds.cln)
		this.write(this.txt.kesimpulan, inds.txt)
		this.break(1)

		///// TTD /////
		this.write(`Tangerang, ${this.full_tgl_dok}`, inds.ttd2)
		this.break()

		let ln_ttd = this.ln

		// Penerbit
		this.ttd(
			inds.ttd1,
			this.data.petugas.penerbit.jabatan,
			this.data.petugas.penerbit.txt_tipe_ttd,
			this.data.petugas.penerbit.name,
			this.data.petugas.penerbit.nip,
		)

		// Penyusun
		this.ln = ln_ttd
		this.ttd(
			inds.ttd2,
			this.data.petugas.penyusun.jabatan,
			this.data.petugas.penyusun.txt_tipe_ttd,
			this.data.petugas.penyusun.name,
			this.data.petugas.penyusun.nip,
		)

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

export default PdfLpN