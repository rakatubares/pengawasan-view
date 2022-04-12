import converters from "../../helpers/converter";
import Pdf from "./PdfMain"

const ind_start = 10

const props = {
	font: {
		size: 10,
		height: 4
	},
	title_line: {
		start: 70,
		end: 140
	},
	ind: {
		sta: ind_start,
		tab: ind_start+10,
		cln: ind_start+50,
		val: ind_start+53,
		ttd:125,
	}
}

class PdfRiksaBadan extends Pdf {
	constructor(data) {
		super(props);
		this.jenis_dok = 'BERITA ACARA PEMERIKSAAN BADAN'
		this.data = data
		this.riksabadan = this.data.dokumen.riksabadan
		this.prepareDocDate()
		this.prepareSprintDate()
	}

	generatePdf() {
		this.createHeader()
		this.createNomor(this.jenis_dok, 'Nomor: ' + this.riksabadan.no_dok_lengkap)

		////// URAIAN TOP //////
		let txt_waktu = 'Pada hari ini ' + this.hr + ' tanggal ' + this.tgl + ' bulan ' + this.bln + ' tahun ' + this.thn + '.'
		this.pdf.text(txt_waktu, this.props.ind.tab, this.ln)
		this.ln += this.props.font.height

		let txt_sprint = `Berdasarkan Surat Perintah : ${this.data.penindakan.sprint.pejabat.jabatan} Nomor `
			+ this.data.penindakan.sprint.nomor_sprint 
			+ ` tanggal ${this.full_tgl_sprint}.`
		let arr_sprint = converters.array_text(txt_sprint, 105)
		this.pdf.text(arr_sprint, this.props.ind.sta, this.ln)
		this.ln += this.props.font.height*arr_sprint.length

		let txt_pernyataan = 'Kami yang bertanda tangan di bawah ini telah melakukan pemeriksaan Badan terhadap:'
		let arr_pernyataan = converters.array_text(txt_pernyataan, 105)
		this.pdf.text(arr_pernyataan, this.props.ind.sta, this.ln)
		this.ln += this.props.font.height*arr_pernyataan.length

		////// DETAIL //////
		// Orang
		this.pdf.text('Nama', this.props.ind.sta, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(this.riksabadan.orang.nama, this.props.ind.val, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Alias', this.props.ind.sta, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let txt_alias = this.riksabadan.orang.alias != null ? this.riksabadan.orang.alias : '-'
		this.pdf.text(txt_alias, this.props.ind.val, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Tempat dan Tanggal Lahir', this.props.ind.sta, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let tempat_lahir = this.riksabadan.orang.tempat_lahir != null ? this.riksabadan.orang.tempat_lahir : ''
		let tanggal_lahir = this.riksabadan.orang.tanggal_lahir != null ? this.riksabadan.orang.tanggal_lahir : ''
		let txt_lahir = `${tempat_lahir} / ${tanggal_lahir}`
		this.pdf.text(txt_lahir, this.props.ind.val, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Kewarganegaraan', this.props.ind.sta, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let txt_warga_negara = this.riksabadan.orang.warga_negara != null ? this.riksabadan.orang.warga_negara : '-'
		this.pdf.text(txt_warga_negara, this.props.ind.val, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Alamat Tempat Tinggal', this.props.ind.sta, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let txt_alamat_tinggal = this.riksabadan.orang.alamat_tinggal || '-'
		let arr_alamat_tinggal = converters.array_text(txt_alamat_tinggal, 110)
		this.pdf.text(arr_alamat_tinggal, this.props.ind.val, this.ln)
		this.ln += this.props.font.height*arr_alamat_tinggal.length

		this.pdf.text('Alamat KTP/Paspor', this.props.ind.sta, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let txt_alamat_id = this.riksabadan.orang.alamat || '-'
		let arr_alamat_id = converters.array_text(txt_alamat_id, 110)
		this.pdf.text(arr_alamat_id, this.props.ind.val, this.ln)
		this.ln += this.props.font.height*arr_alamat_id.length

		this.pdf.text('Nomor KTP/Paspor', this.props.ind.sta, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let txt_jenis_id = this.riksabadan.orang.jenis_identitas != null
			? this.riksabadan.orang.jenis_identitas + ' '
			: ''
		let txt_nomor_id = this.riksabadan.orang.nomor_identitas || ''
		let txt_id = txt_jenis_id + txt_nomor_id
		this.pdf.text(txt_id, this.props.ind.val, this.ln)
		this.ln += this.props.font.height

		let lbl_pejabat_id = 'Tempat/Pejabat yang Mengeluarkan'
		let arr_lbl_pejabat_id = converters.array_text(lbl_pejabat_id, 30)
		this.pdf.text(arr_lbl_pejabat_id, this.props.ind.sta, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let penerbit = this.riksabadan.orang.penerbit_identitas
		let tempat_terbit = this.riksabadan.orang.tempat_identitas_terbit
		if (
			(penerbit != null) &&
			(tempat_terbit != null)
		) {
			var txt_penerbit_id = `${(tempat_terbit)} / ${penerbit}`
		} else if (penerbit != null) {
			var txt_penerbit_id = penerbit
		} else if (tempat_terbit != null) {
			var txt_penerbit_id = tempat_terbit
		} else {
			var txt_penerbit_id = '-'
		}
		this.pdf.text(txt_penerbit_id, this.props.ind.val, this.ln)
		this.ln += this.props.font.height*arr_lbl_pejabat_id.length

		// Asal tujuan
		this.pdf.text('Datang Dari', this.props.ind.sta, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(this.riksabadan.asal, this.props.ind.val, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Tempat Tujuan', this.props.ind.sta, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		if (this.riksabadan.tujuan != null) {
			var txt_tujuan = converters.array_text(this.riksabadan.tujuan.replace('\n', ' '), 110)
			var hgt_tujuan = txt_tujuan.length
		} else {
			var txt_tujuan = '-'
			var hgt_tujuan = 1
		}
		this.pdf.text(txt_tujuan, this.props.ind.val, this.ln)
		this.ln += this.props.font.height*hgt_tujuan

		// Pendamping
		let lbl_pendamping = 'Nama/Identitas orang yang bepergian dengannya'
		let arr_pendamping = converters.array_text(lbl_pendamping, 30)
		this.pdf.text(arr_pendamping, this.props.ind.sta, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let nama_pendamping = this.riksabadan.pendamping != null ? this.riksabadan.pendamping.nama : '-'
		this.pdf.text(nama_pendamping, this.props.ind.val, this.ln)
		this.ln += this.props.font.height*arr_pendamping.length

		// Sarkut
		if (this.riksabadan.sarkut != null) {
			let nama_sarkut = this.riksabadan.sarkut.nama_sarkut
			let jenis_sarkut = this.riksabadan.sarkut.jenis_sarkut
			var sarkut = jenis_sarkut != null ? `${nama_sarkut} (${jenis_sarkut})` : nama_sarkut
			var no_flight_trayek = this.riksabadan.sarkut.no_flight_trayek != null ? this.riksabadan.sarkut.no_flight_trayek : '-'
			var bendera = this.riksabadan.sarkut.bendera != null ? this.riksabadan.sarkut.bendera : '-'
			var no_reg_polisi = this.riksabadan.sarkut.no_reg_polisi != null ? this.riksabadan.sarkut.no_reg_polisi : '-'
			var nama_pilot = this.riksabadan.sarkut.pilot != null ? this.riksabadan.sarkut.pilot.nama : '-'
		} else {
			var sarkut = '-'
			var no_flight_trayek = '-'
			var bendera = '-'
			var no_reg_polisi = '-'
			var nama_pilot = '-'
		}

		this.pdf.text('Nama dan Jenis Sarkut', this.props.ind.sta, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(sarkut, this.props.ind.val, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('No. Voy/Penerbangan/Trayek*', this.props.ind.sta, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(no_flight_trayek, this.props.ind.val, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Nahkoda/Pilot/pengemudi', this.props.ind.sta, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(nama_pilot, this.props.ind.val, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Bendera', this.props.ind.sta, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(bendera, this.props.ind.val, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Nomor Register/Polisi*', this.props.ind.sta, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(no_reg_polisi, this.props.ind.val, this.ln)
		this.ln += this.props.font.height

		// Dokumen
		let lbl_dokumen = 'Jenis/Nomor dan Tgl Dokumen barang yang dibawa'
		let arr_lbl_dokumen = converters.array_text(lbl_dokumen, 30)
		this.pdf.text(arr_lbl_dokumen, this.props.ind.sta, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		if (this.riksabadan.dokumen != null) {
			let jns_dokumen = this.riksabadan.dokumen.jns_dok != null ? `${this.riksabadan.dokumen.jns_dok} ` : ''
			let no_dokumen = this.riksabadan.dokumen.no_dok != null ? `${this.riksabadan.dokumen.no_dok}` : ''
			let tgl_dokumen = this.riksabadan.dokumen.tgl_dok != null ? ` tanggal ${this.riksabadan.dokumen.tgl_dok}` : ''
			var txt_dokumen = jns_dokumen + no_dokumen + tgl_dokumen
		} else {
			var txt_dokumen = '-'
		}
		this.pdf.text(txt_dokumen, this.props.ind.val, this.ln)
		this.ln += this.props.font.height*arr_lbl_dokumen.length

		// Lokasi
		this.pdf.text('Lokasi Pemeriksaan', this.props.ind.sta, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let arr_lokasi = converters.array_text(this.data.penindakan.lokasi_penindakan.replace('\n', ' '), 110)
		this.pdf.text(arr_lokasi, this.props.ind.val, this.ln)
		this.ln += this.props.font.height*(arr_lokasi.length + 0.5)

		////// URAIAN BOTTOM //////
		// Uraian
		let txt_pemeriksaan = 'Dalam pemeriksaan yang bersangkutan diminta membuka/tidak membuka pakaian/pemeriksaan medis*.'
		let arr_pemeriksaan = converters.array_text(txt_pemeriksaan, 120)
		this.pdf.text(arr_pemeriksaan, this.props.ind.sta, this.ln)
		this.ln += this.props.font.height*arr_pemeriksaan.length

		this.pdf.text('Uraian pakaian yang dibuka/pemeriksaan medis*:', this.props.ind.sta, this.ln)
		this.ln += this.props.font.height

		let arr_uraian = this.riksabadan.uraian_pemeriksaan != null 
			? converters.array_text(this.riksabadan.uraian_pemeriksaan, 120)
			: '-'
		this.pdf.text(arr_uraian, this.props.ind.sta, this.ln)
		this.ln += this.props.font.height*(arr_uraian.length + 0.5)

		// Hasil
		this.pdf.text('Hasil pemeriksaan kedapatan sebagai berikut:', this.props.ind.sta, this.ln)
		this.ln += this.props.font.height

		let arr_hasil = converters.array_text(this.riksabadan.hasil_pemeriksaan, 120)
		this.pdf.text(arr_hasil, this.props.ind.sta, this.ln)
		this.ln += this.props.font.height*(arr_hasil.length + 0.5)

		let txt_kondisi = 'Selama pemeriksaan yang diperiksa mematuhi/tidak mematuhi permintaan Pejabat Bea dan Cukai'
			+ '/menunjukkan sikap melawan/tidak menghormati Pejabat Bea dan Cukai*.'
		let arr_kondisi = converters.array_text(txt_kondisi, 120)
		this.pdf.text(arr_kondisi, this.props.ind.sta, this.ln)
		this.ln += this.props.font.height*(arr_kondisi.length + 1)

		// Penutup
		this.pdf.text('Demikian Berita Acara ini dibuat dengan sebenarnya.', this.props.ind.tab, this.ln)
		this.ln += this.props.font.height*2

		////// TTD //////
		let ln_tgl = this.ln + this.props.font.height
		let ln_jabatan_1 = ln_tgl + this.props.font.height
		let ln_nama_1 = ln_jabatan_1 + this.props.font.height*4
		let ln_nip_1 = ln_nama_1 + this.props.font.height
		let ln_jabatan_2 = ln_nip_1 + this.props.font.height
		let ln_nama_2 = ln_jabatan_2 + this.props.font.height*4
		let ln_nip_2 = ln_nama_2 + this.props.font.height

		// Tanggal
		this.pdf.text(`Tangerang, ${this.full_tgl_dok}`, this.props.ind.ttd, ln_tgl)
		
		// Orang yg diperiksa
		this.pdf.text(`Orang yang diperiksa,`, this.props.ind.tab, ln_jabatan_1)
		this.pdf.text(this.riksabadan.orang.nama, this.props.ind.tab, ln_nama_1)

		// Saksi
		this.pdf.text(`Saksi,`, this.props.ind.tab, ln_jabatan_2)
		let txt_saksi = this.riksabadan.saksi != null ? this.riksabadan.saksi.nama : '-'
		this.pdf.text(txt_saksi, this.props.ind.tab, ln_nama_2)

		// Petugas 1
		this.pdf.text(`Pejabat yang melakukan pemeriksaan,`, this.props.ind.ttd, ln_jabatan_1)
		this.pdf.text(this.data.penindakan.petugas1.name, this.props.ind.ttd, ln_nama_1)
		this.pdf.text(`NIP. ${this.data.penindakan.petugas1.nip}`, this.props.ind.ttd, ln_nip_1)

		// Petugas 2
		if (this.data.penindakan.petugas2 != null) {
			var nm_petugas2 = this.data.penindakan.petugas2.name
			var nip_petugas2 = `NIP. ${this.data.penindakan.petugas2.nip}`
		} else {
			var nm_petugas2 = ''
			var nip_petugas2 = ''
		}
		this.pdf.text(nm_petugas2, this.props.ind.ttd, ln_nama_2)
		this.pdf.text(nip_petugas2, this.props.ind.ttd, ln_nip_2)

		this.ln = ln_nip_2 + this.props.font.height*2
		this.pdf.text('*Coret yang tidak perlu', this.props.ind.sta, this.ln)

		////// WATERMARK //////
		if ([100].includes(this.riksabadan.kode_status)) {
			this.watermark()
		}

		return this.pdf.output('datauristring')
	}
}

export default PdfRiksaBadan