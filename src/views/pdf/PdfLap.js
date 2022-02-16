import converters from "../../helpers/converter";
import Pdf from "./PdfMain"

const props = {
	font: {
		size: 10,
		height: 4
	},
	title_line: {
		start: 72.5,
		end: 137.5
	},
	ind: {
		alp: 15,
		cln: 80,
		txt: 83,
		lbl2: 150,
		txt2: 165,
		num: 21,
		lbl: 27,
		chk1: 55,
		ops1: 62.5,
		chk2: 95,
		ops2: 102.5,
		cln3: 75,
		txt3: 78,
		lbl3: 40,
		cln4: 115,
		txt4: 118, 
		ttd:125,
		lamp: 140
	}
}

class PdfLap extends Pdf {
	constructor(data) {
		super(props);
		this.jenis_dok = 'LEMBAR ANALISIS PRA PENINDAKAN'
		this.data = data
		this.prepareDocDate(this.data.dokumen.lap.tanggal_dokumen)
	}

	generatePdf() {
		this.createHeader()
		this.createNomor(this.jenis_dok, 'Nomor: ' + this.data.dokumen.lap.no_dok_lengkap)

		this.pdf.text(`Sumber Informasi : NHI/LI-1/Info lain* No`, this.props.ind.alp, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(this.data.dokumen.lap.nomor_sumber, this.props.ind.txt, this.ln)
		this.pdf.text('Tanggal :', this.props.ind.lbl2, this.ln)
		this.pdf.text(this.data.dokumen.lap.tanggal_sumber, this.props.ind.txt2, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Kategori Dugaan Pelanggaran', this.props.ind.alp, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(this.data.dokumen.lap.dugaan_pelanggaran.kategori, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		////// URAIAN //////
		this.pdf.text('Uraian Pra-Penindakan:', this.props.ind.alp, this.ln)
		this.ln += this.props.font.height

		// SUBSTANSI
		this.pdf.text('-', this.props.ind.alp, this.ln)
		this.pdf.text('Substansi', this.props.ind.num, this.ln)
		this.ln += this.props.font.height

		// Pelaku
		this.constructUraian(
			'1.', 'num', 'Pelaku', 'lbl', 
			this.data.dokumen.lap.flag_pelaku, 
			'Diketahui', 'Tidak Diketahui', 
			this.data.dokumen.lap.keterangan_pelaku
		)

		// Pelanggaran
		this.constructUraian(
			'2.', 'num', 'Pelanggaran', 'lbl', 
			this.data.dokumen.lap.flag_pelanggaran, 
			'Diketahui', 'Tidak Diketahui', 
			this.data.dokumen.lap.keterangan_pelanggaran
		)

		// Locus
		this.constructUraian(
			'3.', 'num', 'Locus', 'lbl', 
			this.data.dokumen.lap.flag_locus, 
			'Diketahui', 'Tidak Diketahui', 
			this.data.dokumen.lap.keterangan_locus
		)

		// Tempus
		this.constructUraian(
			'4.', 'num', 'Tempus', 'lbl', 
			this.data.dokumen.lap.flag_tempus, 
			'Diketahui', 'Tidak Diketahui', 
			this.data.dokumen.lap.keterangan_tempus
		)

		// Prosedural
		this.constructUraian(
			'-', 'alp', 'Prosedural', 'num', 
			this.data.dokumen.lap.flag_kewenangan, 
			'Kewenangan DJBC', 'Bukan Kewenangan DJBC', 
			this.data.dokumen.lap.keterangan_kewenangan
		)

		// SDM
		this.constructUraian(
			'-', 'alp', 'SDM', 'num', 
			this.data.dokumen.lap.flag_sdm, 
			'Tersedia', 'Tidak tersedia', 
			this.data.dokumen.lap.keterangan_sdm
		)

		// Sarpras
		this.constructUraian(
			'-', 'alp', 'Sarana Prasarana', 'num', 
			this.data.dokumen.lap.flag_sarpras, 
			'Tersedia', 'Tidak tersedia', 
			this.data.dokumen.lap.keterangan_sarpras
		)

		// Anggaran
		this.constructUraian(
			'-', 'alp', 'Anggaran', 'num', 
			this.data.dokumen.lap.flag_anggaran, 
			'Tersedia', 'Tidak tersedia', 
			this.data.dokumen.lap.keterangan_anggaran
		)

		////// KELAYAKAN //////
		this.ln += this.props.font.height
		this.pdf.text('Kelayakan Pelaksanaan Operasi Penindakan:', this.props.ind.alp, this.ln)
		this.ln += this.props.font.height

		// Layak Penindakan
		let chk_layak_penindakan = this.data.dokumen.lap.flag_layak_penindakan == 1 ? '( V )' : '(    )'
		this.pdf.text(chk_layak_penindakan, this.props.ind.alp, this.ln)
		this.pdf.text('Layak Dilakukan Operasi Penindakan', this.props.ind.lbl, this.ln)
		this.ln += this.props.font.height

		// Skema
		this.constructSkema(1, 'Mandiri')
		this.constructSkema(2, 'Dgn Bantuan')
		this.constructSkema(3, 'Pelimpahan')
		this.constructSkema(4, 'Pelimpahan dgn Bantuan')
		this.constructSkema(5, 'Perbantuan dgn Instansi lain')

		// Tidak Layak Penindakan
		let chk_tidak_layak_penindakan = this.data.dokumen.lap.flag_layak_penindakan == 0 ? '( V )' : '(    )'
		this.pdf.text(chk_tidak_layak_penindakan, this.props.ind.alp, this.ln)
		this.pdf.text('Tidak / Belum Layak Dilakukan Operasi Penindakan', this.props.ind.lbl, this.ln)
		this.ln += this.props.font.height

		// Patroli
		this.constructPatroli(1, 'Layak Patroli')
		this.constructPatroli(0, 'Tidak / Belum Layak Patroli')

		////// KESIMPULAN //////
		this.pdf.text('Kesimpulan:', this.props.ind.alp, this.ln)
		let arr_kesimpulan = converters.array_text(this.data.dokumen.lap.kesimpulan, 100)
		this.pdf.text(arr_kesimpulan, this.props.ind.lbl3, this.ln)
		let height_kesimpulan = arr_kesimpulan.length > 0 ? arr_kesimpulan.length : 1
		this.ln += this.props.font.height*(height_kesimpulan + 1)

		////// TTD //////
		let ln_tgl_ttd = this.ln
		let ln_ttd_jabatan = ln_tgl_ttd + this.props.font.height
		let ln_ttd_nama = ln_ttd_jabatan + this.props.font.height*5
		let ln_ttd_nip = ln_ttd_nama + this.props.font.height
		this.ln = ln_ttd_nip + this.props.font.height*3
		let tgl_lap = converters.fullDate(converters.date(this.data.dokumen.lap.tanggal_dokumen, 'DD-MM-YYYY'))

		this.pdf.text(this.data.dokumen.lap.atasan.jabatan.jabatan, this.props.ind.num, ln_ttd_jabatan)
		this.pdf.text(this.data.dokumen.lap.atasan.user.name, this.props.ind.num, ln_ttd_nama)
		this.pdf.text('NIP. ' + this.data.dokumen.lap.atasan.user.nip, this.props.ind.num, ln_ttd_nip)
		
		this.pdf.text('Tangerang, ' + tgl_lap, this.props.ind.ttd, ln_tgl_ttd)
		this.pdf.text(this.data.dokumen.lap.penerbit.jabatan.jabatan, this.props.ind.ttd, ln_ttd_jabatan)
		this.pdf.text(this.data.dokumen.lap.penerbit.user.name, this.props.ind.ttd, ln_ttd_nama)
		this.pdf.text('NIP. ' + this.data.dokumen.lap.penerbit.user.nip, this.props.ind.ttd, ln_ttd_nip)

		////// WATERMARK //////
		if ([100].includes(this.data.dokumen.lap.kode_status)) {
			this.watermark()
		}

		return this.pdf.output('datauristring')
	}

	constructUraian(num, ind_num, label, ind_lbl, flag, ops1, ops2, ket) {
		this.pdf.text(num, this.props.ind[ind_num], this.ln)
		this.pdf.text(label, this.props.ind[ind_lbl], this.ln)
		let chk_known = flag == 1 ? '( V )' : '(    )'
		this.pdf.text(chk_known, this.props.ind.chk1, this.ln)
		this.pdf.text(ops1, this.props.ind.ops1, this.ln)
		let chk_unknown = flag == 0 ? '( V )' : '(    )'
		this.pdf.text(chk_unknown, this.props.ind.chk2, this.ln)
		this.pdf.text(ops2, this.props.ind.ops2, this.ln)
		this.ln += this.props.font.height
		this.pdf.text('Keterangan', this.props.ind.chk1, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		let arr_ket = converters.array_text(ket, 75)
		this.pdf.text(arr_ket, this.props.ind.txt3, this.ln)
		let height = arr_ket.length > 0 ? arr_ket.length : 1
		this.ln += this.props.font.height*height
	}

	constructSkema(id_skema, lbl) {
		let chk_skema = this.data.dokumen.lap.skema_penindakan != null
			? this.data.dokumen.lap.skema_penindakan.id == id_skema 
				? '( V )' 
				: '(    )'
			: '(    )'
		this.pdf.text(chk_skema, this.props.ind.lbl, this.ln)
		this.pdf.text(lbl, this.props.ind.lbl3, this.ln)
		this.pdf.text('Keterangan', this.props.ind.chk2, this.ln)
		this.pdf.text(':', this.props.ind.cln4, this.ln)
		let txt_ket_skema = this.data.dokumen.lap.skema_penindakan != null
			? this.data.dokumen.lap.skema_penindakan.id == id_skema
				? this.data.dokumen.lap.keterangan_skema_penindakan 
				: ''
			: ''
		let arr_ket_skema = converters.array_text(txt_ket_skema, 50)
		this.pdf.text(arr_ket_skema, this.props.ind.txt4, this.ln)
		let height = arr_ket_skema.length > 0 ? arr_ket_skema.length : 1
		this.ln += this.props.font.height*height
	}

	constructPatroli(status, lbl) {
		let chk_patroli = this.data.dokumen.lap.flag_layak_patroli != null
			? this.data.dokumen.lap.flag_layak_patroli == status 
				? '( V )' 
				: '(    )'
			: '(    )'
		this.pdf.text(chk_patroli, this.props.ind.lbl, this.ln)
		this.pdf.text(lbl, this.props.ind.lbl3, this.ln)
		this.pdf.text('Keterangan', this.props.ind.chk2, this.ln)
		this.pdf.text(':', this.props.ind.cln4, this.ln)
		let txt_ket_patroli = this.data.dokumen.lap.flag_layak_patroli != null
			? this.data.dokumen.lap.flag_layak_patroli == status
				? this.data.dokumen.lap.keterangan_patroli 
				: ''
			: ''
		let arr_ket_patroli = converters.array_text(txt_ket_patroli, 50)
		this.pdf.text(arr_ket_patroli, this.props.ind.txt4, this.ln)
		let height = arr_ket_patroli.length > 0 ? arr_ket_patroli.length : 1
		this.ln += this.props.font.height*height
	}
}

export default PdfLap