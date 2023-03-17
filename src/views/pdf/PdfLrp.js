import converters from "../../helpers/converter";
import Pdf from "./PdfMain"

const props = {
	font: {
		size: 10,
		height: 4,
		txt_len: 70,
		txt_prop: {'align':'justify', 'maxWidth': 170},
		txt_sub: 100,
	},
	title_line: {
		start: 75,
		end: 135
	},
	ind: {
		alp: 15,
		cln_dok: 45,
		txt_dok: 50,
		lbl_tgl: 125,
		cln_tgl: 155,
		txt_tgl: 160,
		lbl: 20,
		cln: 80,
		txt: 85,
		lbl2: 25,
		lbl3: 30,
		ttd:125,
		ttd2: 75,
		lamp: 140
	},
	txt_line: {
		sta: 15,
		max: 265,
	}
}

class PdfLrp extends Pdf {
	constructor(data) {
		super(props);
		this.jenis_dok = 'LEMBAR RESUME PERKARA (LRP)'
		this.data = data
	}

	generatePdf() {
		this.createHeader()
		this.createNomor(this.jenis_dok, 'Nomor: ' + this.data.no_dok_lengkap)
		this.prepareDocDate(this.data.tanggal_dokumen)

		////// NO DOK TERKAIT //////
		this.pdf.text('Nomor LP/LP-1', this.props.ind.alp, this.ln)
		this.pdf.text(':', this.props.ind.cln_dok, this.ln)
		this.pdf.text(this.data.dokumen.lp.no_dok_lengkap, this.props.ind.txt_dok, this.ln)
		this.pdf.text('Tanggal LP/LP-1', this.props.ind.lbl_tgl, this.ln)
		this.pdf.text(':', this.props.ind.cln_tgl, this.ln)
		this.pdf.text(this.data.dokumen.lp.tanggal_dokumen, this.props.ind.txt_tgl, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Nomor LK', this.props.ind.alp, this.ln)
		this.pdf.text(':', this.props.ind.cln_dok, this.ln)
		let txt_no_lk = this.data.no_lk || '-'
		this.pdf.text(txt_no_lk, this.props.ind.txt_dok, this.ln)
		this.pdf.text('Tanggal LK', this.props.ind.lbl_tgl, this.ln)
		this.pdf.text(':', this.props.ind.cln_tgl, this.ln)
		let txt_tanggal_lk = this.data.tanggal_lk || '-'
		this.pdf.text(txt_tanggal_lk, this.props.ind.txt_tgl, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Nomor SPTP', this.props.ind.alp, this.ln)
		this.pdf.text(':', this.props.ind.cln_dok, this.ln)
		let txt_no_sptp = this.data.no_sptp || '-'
		this.pdf.text(txt_no_sptp, this.props.ind.txt_dok, this.ln)
		this.pdf.text('Tanggal SPTP', this.props.ind.lbl_tgl, this.ln)
		this.pdf.text(':', this.props.ind.cln_tgl, this.ln)
		let txt_tanggal_sptp = this.data.tanggal_sptp || '-'
		this.pdf.text(txt_tanggal_sptp, this.props.ind.txt_tgl, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Nomor SPDP', this.props.ind.alp, this.ln)
		this.pdf.text(':', this.props.ind.cln_dok, this.ln)
		let txt_no_spdp = this.data.no_spdp || '-'
		this.pdf.text(txt_no_spdp, this.props.ind.txt_dok, this.ln)
		this.pdf.text('Tanggal SPDP', this.props.ind.lbl_tgl, this.ln)
		this.pdf.text(':', this.props.ind.cln_tgl, this.ln)
		let txt_tanggal_spdp = this.data.tanggal_spdp || '-'
		this.pdf.text(txt_tanggal_spdp, this.props.ind.txt_tgl, this.ln)
		this.ln += this.props.font.height*2

		////// URAIAN PELANGGARAN //////
		this.pdf.text('A. URAIAN PELANGGARAN', this.props.ind.alp, this.ln)
		this.ln += this.props.font.height

		this.pdf.setFont('Helvetica', 'bold')
		this.pdf.text('Jenis Pelanggaran', this.props.ind.alp, this.ln)
		this.pdf.setFont('Helvetica', 'normal')
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let txt_jenis_pelanggaran = this.data.penyidikan.jenis_pelanggaran || '-'
		let arr_jenis_pelanggaran = converters.array_text(txt_jenis_pelanggaran, this.props.font.txt_len)
		this.pdf.text(arr_jenis_pelanggaran, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height*arr_jenis_pelanggaran.length

		this.pdf.setFont('Helvetica', 'bold')
		this.pdf.text('Pasal yang Dilanggar', this.props.ind.alp, this.ln)
		this.pdf.setFont('Helvetica', 'normal')
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(this.data.penyidikan.pasal, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.setFont('Helvetica', 'bold')
		this.pdf.text('Locus', this.props.ind.alp, this.ln)
		this.pdf.setFont('Helvetica', 'normal')
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let txt_tempat_pelanggaran = converters.string(this.data.penyidikan.tempat_pelanggaran).replace('\n', ' ')
		let arr_tempat_pelanggaran = converters.array_text(txt_tempat_pelanggaran, this.props.font.txt_len)
		this.pdf.text(arr_tempat_pelanggaran, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height*arr_tempat_pelanggaran.length

		this.pdf.setFont('Helvetica', 'bold')
		this.pdf.text('Tempus', this.props.ind.alp, this.ln)
		this.pdf.setFont('Helvetica', 'normal')
		this.ln += this.props.font.height

		let tempus = this.data.penyidikan.waktu_pelanggaran.split(' ')
		this.pdf.text('a.', this.props.ind.alp, this.ln)
		this.pdf.text('Hari/Tanggal/Bulan/Tahun', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(tempus[0], this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('b.', this.props.ind.alp, this.ln)
		this.pdf.text('Waktu', this.props.ind.lbl, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(tempus[1], this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		// Tersangka
		this.pdf.setFont('Helvetica', 'bold')
		this.pdf.text('Tersangka', this.props.ind.alp, this.ln)
		this.pdf.setFont('Helvetica', 'normal')
		this.ln += this.props.font.height

		this.pdf.text('a.', this.props.ind.lbl, this.ln)
		this.pdf.text('Nama', this.props.ind.lbl2, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(this.data.penyidikan.pelaku.nama, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('b.', this.props.ind.lbl, this.ln)
		this.pdf.text('Tempat/Tanggal Lahir', this.props.ind.lbl2, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let txt_ttl = this.data.penyidikan.pelaku.tempat_lahir + ' / ' + this.data.penyidikan.pelaku.tanggal_lahir
		this.pdf.text(txt_ttl, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('c.', this.props.ind.lbl, this.ln)
		this.pdf.text('NIK/No. Passport', this.props.ind.lbl2, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let txt_identitas = this.data.penyidikan.pelaku.jenis_identitas + ' ' + this.data.penyidikan.pelaku.nomor_identitas
		this.pdf.text(txt_identitas, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('d.', this.props.ind.lbl, this.ln)
		this.pdf.text('Pekerjaan', this.props.ind.lbl2, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(this.data.penyidikan.pelaku.pekerjaan, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('e.', this.props.ind.lbl, this.ln)
		this.pdf.text('Nomor Telepon', this.props.ind.lbl2, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(this.data.penyidikan.pelaku.nomor_telepon, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('f.', this.props.ind.lbl, this.ln)
		this.pdf.text('Nomor Rekening Bank', this.props.ind.lbl2, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text('-', this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('g.', this.props.ind.lbl, this.ln)
		this.pdf.text('Jenis Kelamin', this.props.ind.lbl2, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(this.data.penyidikan.pelaku.jenis_kelamin.uraian, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('h.', this.props.ind.lbl, this.ln)
		this.pdf.text('Alamat', this.props.ind.lbl2, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let txt_alamat = converters.string(this.data.penyidikan.pelaku.alamat_identitas).replace('\n', ' ')
		this.pdf.text(txt_alamat, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		// Saksi
		this.pdf.setFont('Helvetica', 'bold')
		this.pdf.text('Alat Bukti', this.props.ind.alp, this.ln)
		this.pdf.setFont('Helvetica', 'normal')
		this.ln += this.props.font.height

		this.pdf.text('Saksi-saksi', this.props.ind.lbl, this.ln)
		this.ln += this.props.font.height

		if (this.data.saksi.length == 0) {
			this.pdf.text('a.', this.props.ind.lbl, this.ln)
			this.pdf.text('Nama', this.props.ind.lbl2, this.ln)
			this.pdf.text(':', this.props.ind.cln, this.ln)
			this.ln += this.props.font.height

			this.pdf.text('NIK/No. Passport', this.props.ind.lbl2, this.ln)
			this.pdf.text(':', this.props.ind.cln, this.ln)
			this.ln += this.props.font.height

			this.pdf.text('Pekerjaan', this.props.ind.lbl2, this.ln)
			this.pdf.text(':', this.props.ind.cln, this.ln)
			this.ln += this.props.font.height

			this.pdf.text('Nomor Telepon', this.props.ind.lbl2, this.ln)
			this.pdf.text(':', this.props.ind.cln, this.ln)
			this.ln += this.props.font.height

			this.pdf.text('Jenis Kelamin', this.props.ind.lbl2, this.ln)
			this.pdf.text(':', this.props.ind.cln, this.ln)
			this.ln += this.props.font.height

			this.pdf.text('Alamat', this.props.ind.lbl2, this.ln)
			this.pdf.text(':', this.props.ind.cln, this.ln)
			this.ln += this.props.font.height*1.5
		} else {
			let alp = 'a'
			this.data.saksi.forEach(function (saksi, index) {
				this.pdf.text(`${alp}.`, this.props.ind.lbl, this.ln)
				this.pdf.text('Nama', this.props.ind.lbl2, this.ln)
				this.pdf.text(':', this.props.ind.cln, this.ln)
				this.pdf.text(saksi.nama, this.props.ind.txt, this.ln)
				this.ln += this.props.font.height

				this.pdf.text('NIK/No. Passport', this.props.ind.lbl2, this.ln)
				this.pdf.text(':', this.props.ind.cln, this.ln)
				let txt_identitas_saksi = `${saksi.jenis_identitas} ${saksi.nomor_identitas}`
				this.pdf.text(txt_identitas_saksi, this.props.ind.txt, this.ln)
				this.ln += this.props.font.height

				this.pdf.text('Pekerjaan', this.props.ind.lbl2, this.ln)
				this.pdf.text(':', this.props.ind.cln, this.ln)
				this.pdf.text(saksi.pekerjaan, this.props.ind.txt, this.ln)
				this.ln += this.props.font.height

				this.pdf.text('Nomor Telepon', this.props.ind.lbl2, this.ln)
				this.pdf.text(':', this.props.ind.cln, this.ln)
				this.pdf.text(saksi.nomor_telepon, this.props.ind.txt, this.ln)
				this.ln += this.props.font.height

				this.pdf.text('Jenis Kelamin', this.props.ind.lbl2, this.ln)
				this.pdf.text(':', this.props.ind.cln, this.ln)
				this.pdf.text(saksi.jenis_kelamin.uraian, this.props.ind.txt, this.ln)
				this.ln += this.props.font.height

				this.pdf.text('Alamat', this.props.ind.lbl2, this.ln)
				this.pdf.text(':', this.props.ind.cln, this.ln)
				let txt_alamat_saksi = converters.string(saksi.alamat_identitas).replace('\n', ' ')
				let arr_alamat_saksi = converters.array_text(txt_alamat_saksi, this.props.font.txt_len)
				this.pdf.text(arr_alamat_saksi, this.props.ind.txt, this.ln)
				this.ln += this.props.font.height*1.5

				alp = String.fromCharCode(alp.charCodeAt() + 1)

				if (this.ln > this.props.txt_line.max) {
					this.pdf.addPage()
					this.ln = this.props.txt_line.sta
				}
			}.bind(this))
		}
		this.ln += this.props.font.height*.5

		this.pdf.setFont('Helvetica', 'bold')
		this.pdf.text('Surat/Dokumen', this.props.ind.lbl, this.ln)
		this.pdf.setFont('Helvetica', 'normal')
		this.ln += this.props.font.height

		let txt_bukti_surat = converters.string(this.data.alat_bukti_surat).replace('\n', ' ')
		let arr_bukti_surat = converters.array_text(txt_bukti_surat, 110)
		this.pdf.text(arr_bukti_surat, this.props.ind.lbl, this.ln)
		this.ln += this.props.font.height*(arr_bukti_surat.length + 1)

		if (this.ln > this.props.txt_line.max) {
			this.pdf.addPage()
			this.ln = this.props.txt_line.sta
		}

		this.pdf.setFont('Helvetica', 'bold')
		this.pdf.text('Petunjuk', this.props.ind.lbl, this.ln)
		this.pdf.setFont('Helvetica', 'normal')
		this.ln += this.props.font.height

		let txt_bukti_petunjuk = converters.string(this.data.alat_bukti_petunjuk).replace('\n', ' ')
		let arr_bukti_petunjuk = converters.array_text(txt_bukti_petunjuk, 110)
		this.pdf.text(arr_bukti_petunjuk, this.props.ind.lbl, this.ln)
		this.ln += this.props.font.height*(arr_bukti_petunjuk.length + 1)

		if (this.ln > this.props.txt_line.max) {
			this.pdf.addPage()
			this.ln = this.props.txt_line.sta
		}

		// Ahli
		this.pdf.setFont('Helvetica', 'bold')
		this.pdf.text('Ahli', this.props.ind.lbl, this.ln)
		this.pdf.setFont('Helvetica', 'normal')
		this.ln += this.props.font.height

		if (this.data.ahli.length == 0) {
			this.pdf.text('a.', this.props.ind.lbl, this.ln)
			this.pdf.text('Nama', this.props.ind.lbl2, this.ln)
			this.pdf.text(':', this.props.ind.cln, this.ln)
			this.ln += this.props.font.height

			this.pdf.text('NIK/No. Passport', this.props.ind.lbl2, this.ln)
			this.pdf.text(':', this.props.ind.cln, this.ln)
			this.ln += this.props.font.height

			this.pdf.text('Pekerjaan', this.props.ind.lbl2, this.ln)
			this.pdf.text(':', this.props.ind.cln, this.ln)
			this.ln += this.props.font.height

			this.pdf.text('Nomor Telepon', this.props.ind.lbl2, this.ln)
			this.pdf.text(':', this.props.ind.cln, this.ln)
			this.ln += this.props.font.height

			this.pdf.text('Jenis Kelamin', this.props.ind.lbl2, this.ln)
			this.pdf.text(':', this.props.ind.cln, this.ln)
			this.ln += this.props.font.height

			this.pdf.text('Alamat', this.props.ind.lbl2, this.ln)
			this.pdf.text(':', this.props.ind.cln, this.ln)
			this.ln += this.props.font.height*1.5
		} else {
			let alp = 'a'
			this.data.ahli.forEach(function (ahli, index) {
				this.pdf.text(`${alp}.`, this.props.ind.lbl, this.ln)
				this.pdf.text('Nama', this.props.ind.lbl2, this.ln)
				this.pdf.text(':', this.props.ind.cln, this.ln)
				this.pdf.text(ahli.nama, this.props.ind.txt, this.ln)
				this.ln += this.props.font.height

				this.pdf.text('NIK/No. Passport', this.props.ind.lbl2, this.ln)
				this.pdf.text(':', this.props.ind.cln, this.ln)
				let txt_identitas_ahli = `${ahli.jenis_identitas} ${ahli.nomor_identitas}`
				this.pdf.text(txt_identitas_ahli, this.props.ind.txt, this.ln)
				this.ln += this.props.font.height

				this.pdf.text('Pekerjaan', this.props.ind.lbl2, this.ln)
				this.pdf.text(':', this.props.ind.cln, this.ln)
				this.pdf.text(ahli.pekerjaan, this.props.ind.txt, this.ln)
				this.ln += this.props.font.height

				this.pdf.text('Nomor Telepon', this.props.ind.lbl2, this.ln)
				this.pdf.text(':', this.props.ind.cln, this.ln)
				this.pdf.text(ahli.nomor_telepon, this.props.ind.txt, this.ln)
				this.ln += this.props.font.height

				this.pdf.text('Jenis Kelamin', this.props.ind.lbl2, this.ln)
				this.pdf.text(':', this.props.ind.cln, this.ln)
				this.pdf.text(ahli.jenis_kelamin.uraian, this.props.ind.txt, this.ln)
				this.ln += this.props.font.height

				this.pdf.text('Alamat', this.props.ind.lbl2, this.ln)
				this.pdf.text(':', this.props.ind.cln, this.ln)
				let txt_alamat_ahli = converters.string(ahli.alamat_identitas).replace('\n', ' ')
				let arr_alamat_ahli = converters.array_text(txt_alamat_ahli, this.props.font.txt_len)
				this.pdf.text(arr_alamat_ahli, this.props.ind.txt, this.ln)
				this.ln += this.props.font.height*1.5

				alp = String.fromCharCode(alp.charCodeAt() + 1)

				if (this.ln > this.props.txt_line.max) {
					this.pdf.addPage()
					this.ln = this.props.txt_line.sta
				}
			}.bind(this))
		}
		this.ln += this.props.font.height*.5

		////// URAIAN BARANG //////
		this.pdf.setFont('Helvetica', 'bold')
		this.pdf.text('Uraian Barang', this.props.ind.alp, this.ln)
		this.pdf.setFont('Helvetica', 'normal')
		this.ln += this.props.font.height

		this.pdf.text('a.', this.props.ind.lbl, this.ln)
		this.pdf.text('Komoditas', this.props.ind.lbl2, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let txt_komoditas = '-'
		if (this.data.barang != null) {
			if (this.data.barang.item.length == 0) {
				txt_komoditas = '-'
			} else if (this.data.barang.item.length > 1) {
				txt_komoditas = 'LIHAT LAMPIRAN'
			} else {
				txt_komoditas = this.data.barang.item[0].kategori.kategori
			}	
		}
		this.pdf.text(txt_komoditas, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('b.', this.props.ind.lbl, this.ln)
		this.pdf.text('Jumlah', this.props.ind.lbl2, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let txt_barang = '-'
		if (this.data.barang != null) {
			if (this.data.barang.item.length == 0) {
				txt_barang = '-'
			} else if (this.data.barang.item.length > 1) {
				txt_barang = 'LIHAT LAMPIRAN'
			} else {
				txt_barang = this.data.barang.item[0].jumlah_barang + ' ' + this.data.barang.item[0].satuan.kode_satuan
			}	
		}
		let arr_barang = converters.array_text(txt_barang, this.props.font.txt_len)
		this.pdf.text(arr_barang, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height*arr_barang.length

		this.pdf.text('c.', this.props.ind.lbl, this.ln)
		this.pdf.text('Jenis', this.props.ind.lbl2, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let txt_jenis = '-'
		if (this.data.barang != null) {
			if (this.data.barang.item.length == 0) {
				txt_jenis = '-'
			} else if (this.data.barang.item.length > 1) {
				txt_jenis = 'LIHAT LAMPIRAN'
			} else {
				txt_jenis = this.data.barang.item[0].uraian_barang
			}	
		}
		this.pdf.text(txt_jenis, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('d.', this.props.ind.lbl, this.ln)
		this.pdf.text('Merk/Type', this.props.ind.lbl2, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let txt_merk_tipe = '-'
		if (this.data.barang != null) {
			if (this.data.barang.item.length == 0) {
				txt_merk_tipe = '-'
			} else if (this.data.barang.item.length > 1) {
				txt_merk_tipe = 'LIHAT LAMPIRAN'
			} else {
				let txt_merk = this.data.barang.item[0].merk || '-'
				let txt_tipe = this.data.barang.item[0].tipe || '-'
				txt_merk_tipe = txt_merk + ' / ' + txt_tipe
			}	
		}
		this.pdf.text(txt_merk_tipe, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('e.', this.props.ind.lbl, this.ln)
		this.pdf.text('Kondisi', this.props.ind.lbl2, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let txt_kondisi = '-'
		if (this.data.barang != null) {
			if (this.data.barang.item.length == 0) {
				txt_kondisi = '-'
			} else if (this.data.barang.item.length > 1) {
				txt_kondisi = 'LIHAT LAMPIRAN'
			} else {
				txt_kondisi = this.data.barang.item[0].kondisi || ''
			}	
		}
		this.pdf.text(txt_kondisi, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('f.', this.props.ind.lbl, this.ln)
		this.pdf.text('Kemasan', this.props.ind.lbl2, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		let txt_kemasan = '-'
		if (this.data.barang != null) {
			let txt_jumlah_kemasan = this.data.barang.jumlah_kemasan || ''
			let txt_jenis_kemasan = ''
			if (this.data.barang.kemasan != null) {
				txt_jenis_kemasan = this.data.barang.kemasan.kode_kemasan || ''
			}
			txt_kemasan = txt_jumlah_kemasan + ' ' + txt_jenis_kemasan
		}
		this.pdf.text(txt_kemasan, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height*2

		if (this.ln > this.props.txt_line.max) {
			this.pdf.addPage()
			this.ln = this.props.txt_line.sta
		}

		////// SARANA PENGANGKUT //////
		let txt_pengangkut = '-'
		let txt_jenis_sarkut = '-'
		let txt_nomor_voyage = '-'
		if (this.data.penyidikan.sarkut != null) {
			txt_pengangkut = this.data.penyidikan.sarkut.nama_sarkut || '-'
			txt_jenis_sarkut = this.data.penyidikan.sarkut.jenis_sarkut || '-'
			txt_nomor_voyage = this.data.penyidikan.sarkut.no_flight_trayek || '-'
		}

		this.pdf.setFont('Helvetica', 'bold')
		this.pdf.text('Sarana Pengangkut', this.props.ind.alp, this.ln)
		this.pdf.setFont('Helvetica', 'normal')
		this.ln += this.props.font.height

		this.pdf.text('a.', this.props.ind.lbl, this.ln)
		this.pdf.text('Pengangkut', this.props.ind.lbl2, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(txt_pengangkut, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('b.', this.props.ind.lbl, this.ln)
		this.pdf.text('Jenis Sarana Pengangkut', this.props.ind.lbl2, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(txt_jenis_sarkut, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('c.', this.props.ind.lbl, this.ln)
		this.pdf.text('Nomor Polisi/Nomor Voyage', this.props.ind.lbl2, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text(txt_nomor_voyage, this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('d.', this.props.ind.lbl, this.ln)
		this.pdf.text('Bukti Kepemilikan', this.props.ind.lbl2, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text('-', this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('e.', this.props.ind.lbl, this.ln)
		this.pdf.text('Nomor Kontainer', this.props.ind.lbl2, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text('-', this.props.ind.txt, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('f.', this.props.ind.lbl, this.ln)
		this.pdf.text('Surat Jalan', this.props.ind.lbl2, this.ln)
		this.pdf.text(':', this.props.ind.cln, this.ln)
		this.pdf.text('-', this.props.ind.txt, this.ln)
		this.ln += this.props.font.height*2

		if (this.ln > this.props.txt_line.max) {
			this.pdf.addPage()
			this.ln = this.props.txt_line.sta
		}

		////// URAIAN KETERANGAN //////
		this.pdf.text('B. MODUS PELANGGARAN', this.props.ind.alp, this.ln)
		this.ln += this.props.font.height*2
		let y_rect_modus = this.ln - 5
		let txt_modus = this.data.penyidikan.modus || '-'
		this.pdf.text(txt_modus, this.props.ind.lbl, this.ln, this.props.font.txt_prop)
		let hgt_modus = Math.round(txt_modus.length / (this.props.font.txt_prop.maxWidth - this.props.font.txt_sub))
		let h_rect_modus = this.props.font.height*(hgt_modus+1)
		this.pdf.rect(this.props.ind.alp, y_rect_modus, 180, h_rect_modus, 'D')
		this.ln += h_rect_modus+(this.props.font.height)

		if (this.ln > this.props.txt_line.max) {
			this.pdf.addPage()
			this.ln = this.props.txt_line.sta
		}

		this.pdf.text('C. PEMENUHAN UNSUR PASAL', this.props.ind.alp, this.ln)
		this.ln += this.props.font.height*2
		let y_rect_pasal = this.ln - 5
		let txt_pasal = this.data.penyidikan.pasal || '-'
		this.pdf.text(txt_pasal, this.props.ind.lbl, this.ln, this.props.font.txt_prop)
		let hgt_pasal = Math.round(txt_pasal.length / (this.props.font.txt_prop.maxWidth - this.props.font.txt_sub))
		if (hgt_pasal < 1) { hgt_pasal = 1 }
		let h_rect_pasal = this.props.font.height*(hgt_pasal+1)
		this.pdf.rect(this.props.ind.alp, y_rect_pasal, 180, h_rect_pasal, 'D')
		this.ln += h_rect_pasal+(this.props.font.height)

		if (this.ln > this.props.txt_line.max) {
			this.pdf.addPage()
			this.ln = this.props.txt_line.sta
		}

		this.pdf.text('D. ALTERNATIF PENYELESAIAN PERKARA', this.props.ind.alp, this.ln)
		this.ln += this.props.font.height*2
		let y_rect_alternatif = this.ln - 5
		let txt_alternatif = this.data.alternatif_penyelesaian || '-'
		this.pdf.text(txt_alternatif, this.props.ind.lbl, this.ln, this.props.font.txt_prop)
		let hgt_alternatif = Math.round(txt_alternatif.length / (this.props.font.txt_prop.maxWidth - this.props.font.txt_sub))
		if (hgt_alternatif < 1) { hgt_alternatif = 1 }
		let h_rect_alternatif = this.props.font.height*(hgt_alternatif+1)
		this.pdf.rect(this.props.ind.alp, y_rect_alternatif, 180, h_rect_alternatif, 'D')
		this.ln += h_rect_alternatif+(this.props.font.height)

		if (this.ln > this.props.txt_line.max) {
			this.pdf.addPage()
			this.ln = this.props.txt_line.sta
		}

		this.pdf.text('E. INFORMASI LAINNYA', this.props.ind.alp, this.ln)
		this.ln += this.props.font.height*2
		let y_rect_informasi = this.ln - 5
		let txt_informasi = this.data.informasi_lain || '-'
		this.pdf.text(txt_informasi, this.props.ind.lbl, this.ln, this.props.font.txt_prop)
		let hgt_informasi = Math.round(txt_informasi.length / (this.props.font.txt_prop.maxWidth - this.props.font.txt_sub))
		if (hgt_informasi < 1) { hgt_informasi = 1 }
		let h_rect_informasi = this.props.font.height*(hgt_informasi+1)
		this.pdf.rect(this.props.ind.alp, y_rect_informasi, 180, h_rect_informasi, 'D')
		this.ln += h_rect_informasi+(this.props.font.height)

		if (this.ln > this.props.txt_line.max) {
			this.pdf.addPage()
			this.ln = this.props.txt_line.sta
		}

		this.pdf.text('F. CATATAN ATASAN', this.props.ind.alp, this.ln)
		this.ln += this.props.font.height*2
		let y_rect_catatan = this.ln - 5
		let txt_catatan = this.data.catatan || '-'
		this.pdf.text(txt_catatan, this.props.ind.lbl, this.ln, this.props.font.txt_prop)
		let hgt_catatan = Math.round(txt_catatan.length / (this.props.font.txt_prop.maxWidth - this.props.font.txt_sub))
		if (hgt_catatan < 1) { hgt_catatan = 1 }
		let h_rect_catatan = this.props.font.height*(hgt_catatan+1)
		this.pdf.rect(this.props.ind.alp, y_rect_catatan, 180, h_rect_catatan, 'D')
		this.ln += h_rect_catatan+(this.props.font.height)*2

		if (this.ln > 230) {
			this.pdf.addPage()
			this.ln = this.props.txt_line.sta
		}

		////// TTD //////
		this.pdf.text(`Tangerang, ${this.full_tgl_dok}`, this.props.ind.ttd, this.ln)
		this.ln += this.props.font.height

		let plh_atasan1 = (this.data.atasan1.plh == true) ? 'Plh. ' : '';
		let txt_jabatan_atasan1 = `${plh_atasan1}${this.data.atasan1.jabatan.jabatan}`
		let arr_jabatan_atasan1 = converters.array_text(txt_jabatan_atasan1, 30)
		this.pdf.text(arr_jabatan_atasan1, this.props.ind.alp, this.ln)
		this.pdf.text(`Ketua Tim Penyidik,`, this.props.ind.ttd, this.ln)
		this.ln += this.props.font.height*5

		this.pdf.text(this.data.atasan1.user.name, this.props.ind.alp, this.ln)
		this.pdf.text(this.data.penyidik.name, this.props.ind.ttd, this.ln)
		this.ln += this.props.font.height

		this.pdf.text(`NIP. ${this.data.atasan1.user.nip}`, this.props.ind.alp, this.ln)
		this.pdf.text(`NIP. ${this.data.penyidik.nip}`, this.props.ind.ttd, this.ln)
		this.ln += this.props.font.height*2

		let plh_atasan2 = (this.data.atasan2.plh == true) ? 'Plh. ' : '';
		let txt_jabatan_atasan2 = `${plh_atasan2}${this.data.atasan2.jabatan.jabatan}`
		let arr_jabatan_atasan2 = converters.array_text(txt_jabatan_atasan2, 30)
		this.pdf.text(arr_jabatan_atasan2, this.props.ind.ttd2, this.ln)
		this.ln += this.props.font.height*5

		this.pdf.text(this.data.atasan2.user.name, this.props.ind.ttd2, this.ln)
		this.ln += this.props.font.height

		this.pdf.text(`NIP. ${this.data.atasan2.user.nip}`, this.props.ind.ttd2, this.ln)

		////// LAMPIRAN //////
		if (this.data.barang != null) {
			if (this.data.barang.item.length > 1) {
				this.pdf.setFont('Helvetica', 'normal')
				this.pdf.addPage()
				// Header
				this.headerLampiran(this.data.no_dok_lengkap)
				// Tabel barang
				this.tabelBarang(this.data.barang.item, true)
			}
		}

		////// WATERMARK //////
		if ([100].includes(this.data.kode_status)) {
			this.watermark()
		}

		return this.pdf.output('datauristring')
	}
}

export default PdfLrp