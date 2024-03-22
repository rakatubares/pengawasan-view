import Pdf from "../MyPdf"

const inds = {
	alp: 15,
	lbl1: 75,
	cln1: 80,
	val1: 83,
	lbl2: 150,
	cln2: 163,
	val2: 166,
	num: 15,
	lbla: 20,
	chk1: 52.5,
	ops1: 62.5,
	chk2: 102.5,
	ops2: 112.5,
	ket1: 75,
	lblb: 30,
	lbl3: 90,
	cln3: 112.5,
	val3: 118, 
	simp: 35,
	ttd1: 17,
	ttd2: 127,
}

class PdfLap extends Pdf {
	constructor(
		data,
		title = 'LEMBAR ANALISIS PRA PENINDAKAN'
	) {
		super(data, title)
	}

	generateText()
	{
		this.prepareDocDate(this.data.tanggal_dokumen)

		this.txt = {}
		
		// No & Tanggal
		this.txt.pilihan_sumber_informasi = 'Sumber Informasi : NHI/LI-1/Info lain*'
		this.txt.nomor_sumber = this.data.nomor_sumber != null 
			? this.data.nomor_sumber
			: '-'
		this.txt.tanggal_sumber = this.data.tanggal_sumber != null 
			? this.data.tanggal_sumber
			: '-'
		this.txt.dugaan_pelanggaran = this.data.dugaan_pelanggaran != null 
			? this.data.dugaan_pelanggaran.kategori
			: '-'

		// Uraian
		this.txt.keterangan_pelaku = this.data.keterangan_pelaku != null
			? this.data.keterangan_pelaku
			: '-'
		this.txt.keterangan_pelanggaran = this.data.keterangan_pelanggaran != null
			? this.data.keterangan_pelanggaran
			: '-'
		this.txt.keterangan_locus = this.data.keterangan_locus != null
			? this.data.keterangan_locus
			: '-'
		this.txt.keterangan_tempus = this.data.keterangan_tempus != null
			? this.data.keterangan_tempus
			: '-'
		this.txt.keterangan_kewenangan = this.data.keterangan_kewenangan != null
			? this.data.keterangan_kewenangan
			: '-'
		this.txt.keterangan_sdm = this.data.keterangan_sdm != null
			? this.data.keterangan_sdm
			: '-'
		this.txt.keterangan_sarpras = this.data.keterangan_sarpras != null
			? this.data.keterangan_sarpras
			: '-'
		this.txt.keterangan_anggaran = this.data.keterangan_anggaran != null
			? this.data.keterangan_anggaran
			: '-'

		// Kelayakan
		this.txt.ket_penindakan_1 = this.data.flag_layak_penindakan == 1
			? this.data.skema_penindakan.id == 1
				? this.data.keterangan_skema_penindakan != null
					? this.data.keterangan_skema_penindakan
					: '-'
				: '-'
			: '-'
		this.txt.ket_penindakan_2 = this.data.flag_layak_penindakan == 1
			? this.data.skema_penindakan.id == 2
				? this.data.keterangan_skema_penindakan != null
					? this.data.keterangan_skema_penindakan
					: '-'
				: '-'
			: '-'
		this.txt.ket_penindakan_3 = this.data.flag_layak_penindakan == 1
			? this.data.skema_penindakan.id == 3
				? this.data.keterangan_skema_penindakan != null
					? this.data.keterangan_skema_penindakan
					: '-'
				: '-'
			: '-'
		this.txt.ket_penindakan_4 = this.data.flag_layak_penindakan == 1
			? this.data.skema_penindakan.id == 4
				? this.data.keterangan_skema_penindakan != null
					? this.data.keterangan_skema_penindakan
					: '-'
				: '-'
			: '-'
		this.txt.ket_penindakan_5 = this.data.flag_layak_penindakan == 1
			? this.data.skema_penindakan.id == 5
				? this.data.keterangan_skema_penindakan != null
					? this.data.keterangan_skema_penindakan
					: '-'
				: '-'
			: '-'

		this.txt.ket_layak_patroli = this.data.flag_layak_penindakan == 0
			? this.data.flag_layak_patroli == 1
				? this.data.keterangan_patroli != null
					? this.data.keterangan_patroli
					: '-'
				: '-'
			: '-'
		this.txt.ket_tidak_layak_patroli = this.data.flag_layak_penindakan == 0
			? this.data.flag_layak_patroli == 0
				? this.data.keterangan_patroli != null
					? this.data.keterangan_patroli
					: '-'
				: '-'
			: '-'

		this.txt.kesimpulan = this.data.kesimpulan != null
			? this.data.kesimpulan : '-'

		this.flag = {}
		this.flag.ops_penindakan_1 = this.data.flag_layak_penindakan == 1
			? this.data.skema_penindakan.id == 1 
				? true : false
			: false
		this.flag.ops_penindakan_2 = this.data.flag_layak_penindakan == 1
			? this.data.skema_penindakan.id == 2
				? true : false
			: false
		this.flag.ops_penindakan_3 = this.data.flag_layak_penindakan == 1
			? this.data.skema_penindakan.id == 3 
				? true : false
			: false
		this.flag.ops_penindakan_4 = this.data.flag_layak_penindakan == 1
			? this.data.skema_penindakan.id == 4 
				? true : false
			: false
		this.flag.ops_penindakan_5 = this.data.flag_layak_penindakan == 1
			? this.data.skema_penindakan.id == 5 
				? true : false
			: false

		this.flag.layak_patroli = this.data.flag_layak_penindakan == 0
			? this.data.flag_layak_patroli == 1
				? true : false
			: false
		this.flag.tidak_layak_patroli = this.data.flag_layak_penindakan == 0
			? this.data.flag_layak_patroli == 0
				? true : false
			: false
	}

	writeText()
	{
		this.createHeader()
		this.createNomor(this.jenis_dok, this.data.no_dok_lengkap)

		////// NO & TANGGAL //////
		this.write(this.txt.pilihan_sumber_informasi)
		this.write('No', inds.lbl1)
		this.write(':', inds.cln1)
		this.write(this.txt.nomor_sumber, inds.val1)

		this.write('Tanggal', inds.lbl2)
		this.write(':', inds.cln2)
		this.write(this.txt.tanggal_sumber, inds.val2)
		this.break()

		this.write('Kategori Dugaan Pelanggaran')
		this.write(':', inds.cln1)
		this.write(this.txt.dugaan_pelanggaran, inds.val1)
		this.break()

		////// URAIAN //////
		this.write('Uraian Pra-Penindakan:')
		this.break()

		// SUBSTANSI
		this.write('-')
		this.write('Substansi', inds.num)
		this.break()

		this.writeData(
			'1.', 'Pelaku', this.data.flag_pelaku, 
			'Diketahui', 'Tidak Diketahui', 
			this.txt.keterangan_pelaku, 2
		)

		this.writeData(
			'2.', 'Pelanggaran', this.data.flag_pelanggaran, 
			'Diketahui', 'Tidak Diketahui', 
			this.txt.keterangan_pelanggaran, 2
		)

		this.writeData(
			'3.', 'Locus', this.data.flag_locus, 
			'Diketahui', 'Tidak Diketahui', 
			this.txt.keterangan_locus, 2
		)

		this.writeData(
			'4.', 'Tempus', this.data.flag_tempus, 
			'Diketahui', 'Tidak Diketahui', 
			this.txt.keterangan_tempus, 2
		)

		// Prosedural
		this.writeData(
			'-', 'Prosedural', this.data.flag_kewenangan, 
			'Kewenangan DJBC', 'Bukan Kewenangan DJBC', 
			this.txt.keterangan_kewenangan
		)

		// SDM
		this.writeData(
			'-', 'SDM', this.data.flag_sdm, 
			'Tersedia', 'Tidak Tersedia', 
			this.txt.keterangan_sdm
		)

		// Sarpras
		this.writeData(
			'-', 'Sarana Prasarana', this.data.flag_sarpras, 
			'Tersedia', 'Tidak Tersedia', 
			this.txt.keterangan_sarpras
		)

		// Anggaran
		this.writeData(
			'-', 'Anggaran', this.data.flag_anggaran, 
			'Tersedia', 'Tidak Tersedia', 
			this.txt.keterangan_anggaran
		)

		this.break()

		////// KELAYAKAN //////
		this.write('Kelayakan Pelaksanaan Operasi Penindakan:')
		this.break()

		this.writeKelayakan1(this.data.flag_layak_penindakan, 'Layak Dilakukan Operasi Penindakan')
		this.writeKelayakan2(this.flag.ops_penindakan_1, 'Mandiri', this.txt.ket_penindakan_1)
		this.writeKelayakan2(this.flag.ops_penindakan_2, 'Dgn Bantuan', this.txt.ket_penindakan_2)
		this.writeKelayakan2(this.flag.ops_penindakan_3, 'Pelimpahan', this.txt.ket_penindakan_3)
		this.writeKelayakan2(this.flag.ops_penindakan_4, 'Pelimpahan dgn Bantuan', this.txt.ket_penindakan_4)
		this.writeKelayakan2(this.flag.ops_penindakan_5, 'Perbantuan dgn Instansi Lain', this.txt.ket_penindakan_5)

		this.writeKelayakan1(!this.data.flag_layak_penindakan, 'Tidak / Belum Layak Dilakukan Operasi Penindakan')
		this.writeKelayakan2(this.flag.layak_patroli, 'Layak Patroli', this.txt.ket_layak_patroli)
		this.writeKelayakan2(this.flag.tidak_layak_patroli, 'Tidak / Belum Layak Patroli', this.txt.ket_tidak_layak_patroli)

		////// KESIMPULAN //////
		this.write('Kesimpulan :')
		this.write(this.txt.kesimpulan, inds.simp)
		this.break(1)

		///// TTD /////

		// Tanggal
		this.write(`Tangerang, ${this.full_tgl_dok}`, inds.ttd2)
		this.break()
		
		let ln_ttd = this.ln
		// Penerbit
		this.ttd(
			inds.ttd1,
			this.data.petugas.penerbit.jabatan, 
			this.data.petugas.penerbit.txt_tipe_ttd, 
			this.data.petugas.penerbit.name,
			this.data.petugas.penerbit.nip
		)

		// Atasan
		this.ln = ln_ttd
		this.ttd(
			inds.ttd2,
			this.data.petugas.atasan.jabatan, 
			this.data.petugas.atasan.txt_tipe_ttd, 
			this.data.petugas.atasan.name,
			this.data.petugas.atasan.nip
		)
	}

	writeData(num, lbl, flag, ops1, ops2, ket, level=1)
	{
		let ind_num = level==2 ? inds.num : this.left_margin
		let ind_lbl = level==2 ? inds.lbla : inds.num
		this.write(num, ind_num)
		this.write(lbl, ind_lbl)

		let chk1 = flag == 1 ? '( V )' : '(    )'
		this.write(chk1, inds.chk1)
		this.write(ops1, inds.ops1)

		let chk2 = flag == 0 ? '( V )' : '(    )'
		this.write(chk2, inds.chk2)
		this.write(ops2, inds.ops2)

		this.break()

		this.write('Keterangan :', inds.chk1)
		this.write(ket, inds.ket1)

		this.break(.5)
	}

	writeKelayakan1(flag, txt)
	{
		let chk = flag == 1 ? '( V )' : '(    )'
		this.write(chk)
		this.write(txt, inds.lbla)
		this.break()
	}

	writeKelayakan2(flag, txt, ket)
	{
		let chk = flag == 1 ? '( V )' : '(    )'
		this.write(chk, inds.lbla)
		this.write(txt, inds.lblb)
		this.write('Keterangan', inds.lbl3)
		this.write(':', inds.cln3)
		this.write(ket, inds.val3)
		this.break()
	}
}

export default PdfLap