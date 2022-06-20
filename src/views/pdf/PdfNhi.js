import converters from "../../helpers/converter";
import Pdf from "./PdfMain"

const ind_start = 10

const props = {
	font: {
		size: 10,
		height: 4
	},
	title_line: {
		start: 83,
		end: 127
	},
	ind: {
		sta: ind_start,
		cln1: ind_start+20,
		val1: ind_start+25,
		lbl2: ind_start+120,
		cln2: ind_start+145,
		val2: ind_start+150,
		par: ind_start+10,
		lbl3: ind_start+5,
		lbl4: ind_start+10,
		cln3: ind_start+100,
		val3: ind_start+105,
		ttd:125,
		lamp: 150
	}
}

class PdfNhi extends Pdf {
	constructor(data) {
		super(props);
		this.jenis_dok = 'NOTA HASIL INTELIJEN'
		this.data = data
		this.nhi = this.data.dokumen.nhi
		this.prepareDocDate(this.nhi.tanggal_dokumen)
	}

	generatePdf() {
		this.createHeader()
		this.createNomor(this.jenis_dok, '')

		// No & tanggal
		this.pdf.text('Nomor', this.props.ind.sta, this.ln)
		this.pdf.text(':', this.props.ind.cln1, this.ln)
		this.pdf.text(this.nhi.no_dok_lengkap, this.props.ind.val1, this.ln)

		this.pdf.text('Referensi', this.props.ind.lbl2, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Tanggal', this.props.ind.sta, this.ln)
		this.pdf.text(':', this.props.ind.cln1, this.ln)
		this.pdf.text(this.full_tgl_dok, this.props.ind.val1, this.ln)

		this.pdf.text('Nomor LKAI', this.props.ind.lbl2, this.ln)
		this.pdf.text(':', this.props.ind.cln2, this.ln)
		this.pdf.text(this.nhi.nomor_lkai, this.props.ind.val2, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Sifat', this.props.ind.sta, this.ln)
		this.pdf.text(':', this.props.ind.cln1, this.ln)
		this.pdf.text(this.nhi.sifat, this.props.ind.val1, this.ln)

		this.pdf.text('Tanggal LKAI', this.props.ind.lbl2, this.ln)
		this.pdf.text(':', this.props.ind.cln2, this.ln)
		this.pdf.text(converters.fullDate(this.nhi.tanggal_lkai), this.props.ind.val2, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Klasifikasi', this.props.ind.sta, this.ln)
		this.pdf.text(':', this.props.ind.cln1, this.ln)
		this.pdf.text(this.nhi.klasifikasi, this.props.ind.val1, this.ln)
		this.ln += this.props.font.height*2

		// Uraian
		let txt_tujuan = this.nhi.tujuan || ''
		this.pdf.text(`Yth. ${txt_tujuan}`, this.props.ind.sta, this.ln)
		this.ln += this.props.font.height

		let txt_op = '     Sehubungan dengan hasil analisis intelijen yang mengindikasikan adanya pelanggaran kepabeanan atau cukai, '
			+ 'diperintahkan / direkomendasikan*) kepada Saudara untuk melakukan penindakan terhadap '
			+ 'Barang / Sarana Pengangkut / Orang / Bangunan / lainnya*), dengan informasi sebagai berikut:'
		this.pdf.text(txt_op, this.props.ind.sta, this.ln, {align: 'justify', maxWidth: 185})
		this.ln += this.props.font.height*3

		this.pdf.text('A.', this.props.ind.sta, this.ln)
		this.pdf.text('Tempat', this.props.ind.lbl3, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		let txt_tempat = this.nhi.tempat_indikasi || ''
		let arr_tempat = converters.array_text(txt_tempat.replace('\n', ' '), 50)
		let hgt_tempat = arr_tempat.length > 0 ? arr_tempat.length : 1
		this.pdf.text(arr_tempat, this.props.ind.val3, this.ln)
		this.ln += this.props.font.height*hgt_tempat

		this.pdf.text('B.', this.props.ind.sta, this.ln)
		this.pdf.text('Tanggal/Waktu', this.props.ind.lbl3, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		if (this.nhi.waktu_indikasi) {
			if (this.nhi.zona_waktu) {
				var txt_tanggal = `${this.nhi.waktu_indikasi} ${this.nhi.zona_waktu}`
			} else {
				var txt_tanggal = `${this.nhi.waktu_indikasi}`
			}
		} else {
			var txt_tanggal = ''
		}
		this.pdf.text(txt_tanggal, this.props.ind.val3, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('C.', this.props.ind.sta, this.ln)
		this.pdf.text('Kantor Bea dan Cukai', this.props.ind.lbl3, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		let txt_kantor = this.nhi.kantor || ''
		this.pdf.text(txt_kantor, this.props.ind.val3, this.ln)
		this.ln += this.props.font.height

		// EXIM
		this.pdf.text('D.', this.props.ind.sta, this.ln)
		this.pdf.text('Kegiatan atas Barang Impor/Ekspor*):', this.props.ind.lbl3, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('1.', this.props.ind.lbl3, this.ln)
		this.pdf.text('Nama/No. Dokumen Kepabeanan', this.props.ind.lbl4, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		let txt_dok_exim = this.nhi.flag_exim 
			? this.nhi.jenis_dok_exim
				? this.nhi.nomor_dok_exim
					? this.nhi.tanggal_dok_exim 
						? `${this.nhi.jenis_dok_exim} nomor ${this.nhi.nomor_dok_exim} tanggal ${this.nhi.tanggal_dok_exim}`
						: `${this.nhi.jenis_dok_exim} nomor ${this.nhi.nomor_dok_exim}`
					: this.nhi.tanggal_dok_exim 
						? `${this.nhi.jenis_dok_exim} tanggal ${this.nhi.tanggal_dok_exim}`
						: this.nhi.jenis_dok_exim
				: this.nhi.nomor_dok_exim
					? this.nhi.tanggal_dok_exim 
						? `${this.nhi.nomor_dok_exim} tanggal ${this.nhi.tanggal_dok_exim}`
						: this.nhi.nomor_dok_exim
					: ''
			: ''
		this.pdf.text(txt_dok_exim, this.props.ind.val3, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('2.', this.props.ind.lbl3, this.ln)
		this.pdf.text('Eks/Untuk Kapal/Pesawat/Alat Angkut/Lainnya', this.props.ind.lbl4, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		let txt_sarkut_exim = this.nhi.flag_exim 
			? `${this.nhi.nama_sarkut_exim || '-'} Voy/Flight/No. Pol: ${this.nhi.no_flight_trayek_exim || '-'}` 
			: ''
		this.pdf.text(txt_sarkut_exim, this.props.ind.val3, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('3.', this.props.ind.lbl3, this.ln)
		this.pdf.text('No. BL/AWB', this.props.ind.lbl4, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		let txt_awb_exim = this.nhi.flag_exim 
			? this.nhi.nomor_awb_exim
				? this.nhi.tanggal_awb_exim
					? `${this.nhi.nomor_awb_exim} tanggal ${this.nhi.tanggal_awb_exim}` 
					: this.nhi.nomor_awb_exim
				: this.nhi.tanggal_awb_exim
					? `- tanggal ${this.nhi.tanggal_awb_exim}` 
					: ''
			: ''
		this.pdf.text(txt_awb_exim, this.props.ind.val3, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('4.', this.props.ind.lbl3, this.ln)
		this.pdf.text('No. Container/Merek Kolli', this.props.ind.lbl4, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		let txt_koli_exim = this.nhi.flag_exim ? (this.nhi.merek_koli_exim || '') : ''
		this.pdf.text(txt_koli_exim, this.props.ind.val3, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('5.', this.props.ind.lbl3, this.ln)
		this.pdf.text('Importir/Eksportir/PPJK', this.props.ind.lbl4, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		let txt_importir_exim = this.nhi.flag_exim ? (this.nhi.importir_ppjk || '') : ''
		this.pdf.text(txt_importir_exim, this.props.ind.val3, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('6.', this.props.ind.lbl3, this.ln)
		this.pdf.text('NPWP', this.props.ind.lbl4, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		let txt_npwp_exim = this.nhi.flag_exim ? (this.nhi.npwp || '') : ''
		this.pdf.text(txt_npwp_exim, this.props.ind.val3, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('7.', this.props.ind.lbl3, this.ln)
		this.pdf.text('Jenis/Jumlah barang', this.props.ind.lbl4, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		if (this.nhi.flag_exim) {
			if (this.nhi.objek) {
				if (this.nhi.objek.data.item.length > 1) {
					var uraian_barang = 'LIHAT LAMPIRAN'
				} else {
					var uraian_barang = `${this.nhi.objek.data.item[0].jumlah_barang} `
						+ `${this.nhi.objek.data.item[0].satuan.kode_satuan} `
						+ `${this.nhi.objek.data.item[0].uraian_barang} `
				}	
			} else {
				var uraian_barang = ''	
			}
		} else {
			var uraian_barang = ''
		}
		this.pdf.text(uraian_barang, this.props.ind.val3, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('8.', this.props.ind.lbl3, this.ln)
		this.pdf.text('Data Lainnya', this.props.ind.lbl4, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		let txt_lain_exim = this.nhi.flag_exim ? (this.nhi.data_lain_exim || '') : ''
		let arr_lain_exim = converters.array_text(txt_lain_exim, 50)
		let hgt_lain_exim = arr_lain_exim.length > 1 ? arr_lain_exim.length : 1
		this.pdf.text(txt_lain_exim, this.props.ind.val3, this.ln, {align: 'justify', maxWidth: 80})
		this.ln += this.props.font.height*hgt_lain_exim

		// BKC
		this.pdf.text('E.', this.props.ind.sta, this.ln)
		this.pdf.text('Kegiatan atas Barang Kena Cukai:', this.props.ind.lbl3, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('1.', this.props.ind.lbl3, this.ln)
		this.pdf.text('Eks Pabrik/Tempat Penyimpanan/Tempat Penimbunan', this.props.ind.lbl4, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		let txt_tempat_penimbunan = this.nhi.flag_bkc ? (this.nhi.tempat_penimbunan || '') : ''
		let arr_tempat_penimbunan = converters.array_text(txt_tempat_penimbunan.replace('\n', ' '), 50)
		let hgt_tempat_penimbunan = arr_tempat_penimbunan.length > 0 ? arr_tempat_penimbunan.length : 1
		this.pdf.text(arr_tempat_penimbunan, this.props.ind.val3, this.ln)
		this.ln += this.props.font.height*hgt_tempat_penimbunan

		this.pdf.text('2.', this.props.ind.lbl3, this.ln)
		this.pdf.text('Penyalur', this.props.ind.lbl4, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		let txt_penyalur = this.nhi.flag_bkc ? (this.nhi.penyalur || '') : ''
		let arr_penyalur = converters.array_text(txt_penyalur.replace('\n', ' '), 50)
		let hgt_penyalur = arr_penyalur.length > 0 ? arr_penyalur.length : 1
		this.pdf.text(arr_penyalur, this.props.ind.val3, this.ln)
		this.ln += this.props.font.height*hgt_penyalur

		this.pdf.text('3.', this.props.ind.lbl3, this.ln)
		this.pdf.text('Tempat Penjualan Eceran', this.props.ind.lbl4, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		let txt_tempat_penjualan = this.nhi.flag_bkc ? (this.nhi.tempat_penjualan || '') : ''
		let arr_tempat_penjualan = converters.array_text(txt_tempat_penjualan.replace('\n', ' '), 50)
		let hgt_tempat_penjualan = arr_tempat_penjualan.length > 0 ? arr_tempat_penjualan.length : 1
		this.pdf.text(arr_tempat_penjualan, this.props.ind.val3, this.ln)
		this.ln += this.props.font.height*hgt_tempat_penjualan

		this.pdf.text('4.', this.props.ind.lbl3, this.ln)
		this.pdf.text('NPPBKC', this.props.ind.lbl4, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		let txt_nppbkc = this.nhi.flag_bkc ? (this.nhi.nppbkc || '') : ''
		this.pdf.text(txt_nppbkc, this.props.ind.val3, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('5.', this.props.ind.lbl3, this.ln)
		this.pdf.text('Eks/Untuk Kapal/Pesawat/Alat Angkut/Lainnya', this.props.ind.lbl4, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		let txt_sarkut_bkc = this.nhi.flag_bkc 
			? `${this.nhi.nama_sarkut_bkc || ''} Voy/Flight/No. Pol: ${this.nhi.no_flight_trayek_bkc || ''}` 
			: ''
		this.pdf.text(txt_sarkut_bkc, this.props.ind.val3, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('6.', this.props.ind.lbl3, this.ln)
		this.pdf.text('Jenis/Jumlah barang', this.props.ind.lbl4, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		if (this.nhi.flag_bkc) {
			if (this.nhi.objek) {
				if (this.nhi.objek.data.item.length > 1) {
					var uraian_barang = 'LIHAT LAMPIRAN'
				} else {
					var uraian_barang = `${this.nhi.objek.data.item[0].jumlah_barang} `
						+ `${this.nhi.objek.data.item[0].satuan.kode_satuan} `
						+ `${this.nhi.objek.data.item[0].uraian_barang} `
				}	
			} else {
				var uraian_barang = ''	
			}
		} else {
			var uraian_barang = ''
		}
		this.pdf.text(uraian_barang, this.props.ind.val3, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('7.', this.props.ind.lbl3, this.ln)
		this.pdf.text('Data Lainnya', this.props.ind.lbl4, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		let txt_lain_bkc = this.nhi.flag_bkc ? (this.nhi.data_lain_bkc || '') : ''
		let arr_lain_bkc = converters.array_text(txt_lain_bkc, 50)
		let hgt_lain_bkc = arr_lain_bkc.length > 1 ? arr_lain_bkc.length : 1
		this.pdf.text(txt_lain_bkc, this.props.ind.val3, this.ln, {align: 'justify', maxWidth: 80})
		this.ln += this.props.font.height*hgt_lain_bkc

		// Barang tertentu
		this.pdf.text('F.', this.props.ind.sta, this.ln)
		this.pdf.text('Kegiatan atas Barang Tertentu:', this.props.ind.lbl3, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('1.', this.props.ind.lbl3, this.ln)
		this.pdf.text('Nama/No. Dokumen', this.props.ind.lbl4, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		let txt_dok_tertentu = this.nhi.flag_tertentu 
			? this.nhi.jenis_dok_tertentu
				? this.nhi.nomor_dok_tertentu
					? this.nhi.tanggal_dok_tertentu
						? `${this.nhi.jenis_dok_tertentu} nomor ${this.nhi.nomor_dok_tertentu} tanggal ${this.nhi.tanggal_dok_tertentu}`
						: `${this.nhi.jenis_dok_tertentu} nomor ${this.nhi.nomor_dok_tertentu}`
					: this.nhi.tanggal_dok_tertentu 
						? `${this.nhi.jenis_dok_tertentu} tanggal ${this.nhi.tanggal_dok_tertentu}`
						: this.nhi.jenis_dok_tertentu
				: this.nhi.nomor_dok_tertentu
					? this.nhi.tanggal_dok_tertentu 
						? `${this.nhi.nomor_dok_tertentu} tanggal ${this.nhi.tanggal_dok_tertentu}`
						: this.nhi.nomor_dok_tertentu
					: ''
			: ''
		this.pdf.text(txt_dok_tertentu, this.props.ind.val3, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('2.', this.props.ind.lbl3, this.ln)
		this.pdf.text('Eks/Untuk Kapal/Pesawat/Alat Angkut/Lainnya', this.props.ind.lbl4, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		let txt_sarkut_tertentu = this.nhi.flag_tertentu 
			? `${this.nhi.nama_sarkut_tertentu || '-'} Voy/Flight/No. Pol: ${this.nhi.no_flight_trayek_tertentu || '-'}`
			: ''
		this.pdf.text(txt_sarkut_tertentu, this.props.ind.val3, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('3.', this.props.ind.lbl3, this.ln)
		this.pdf.text('No. BL/AWB', this.props.ind.lbl4, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		let txt_awb_tertentu = this.nhi.flag_tertentu 
			? this.nhi.nomor_awb_tertentu
				? this.nhi.tanggal_awb_tertentu
					? `${this.nhi.nomor_awb_tertentu} tanggal ${this.nhi.tanggal_awb_tertentu}` 
					: this.nhi.nomor_awb_tertentu
				: this.nhi.tanggal_awb_tertentu
					? `- tanggal ${this.nhi.tanggal_awb_tertentu}` 
					: ''
			: ''
		this.pdf.text(txt_awb_tertentu, this.props.ind.val3, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('4.', this.props.ind.lbl3, this.ln)
		this.pdf.text('No. Container/Merek Kolli', this.props.ind.lbl4, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		let txt_koli_tertentu = this.nhi.flag_tertentu ? (this.nhi.merek_koli_tertentu || '') : ''
		this.pdf.text(txt_koli_tertentu, this.props.ind.val3, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('5.', this.props.ind.lbl3, this.ln)
		this.pdf.text('Orang Pribadi/Badan Hukum', this.props.ind.lbl4, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		let txt_importir_tertentu = this.nhi.flag_tertentu ? (this.nhi.orang_badan_hukum || '') : ''
		this.pdf.text(txt_importir_tertentu, this.props.ind.val3, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('6.', this.props.ind.lbl3, this.ln)
		this.pdf.text('Jenis/Jumlah barang', this.props.ind.lbl4, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		if (this.nhi.flag_tertentu) {
			if (this.nhi.objek) {
				if (this.nhi.objek.data.item.length > 1) {
					var uraian_barang = 'LIHAT LAMPIRAN'
				} else {
					var uraian_barang = `${this.nhi.objek.data.item[0].jumlah_barang} `
						+ `${this.nhi.objek.data.item[0].satuan.kode_satuan} `
						+ `${this.nhi.objek.data.item[0].uraian_barang} `
				}	
			} else {
				var uraian_barang = ''	
			}
		} else {
			var uraian_barang = ''
		}
		this.pdf.text(uraian_barang, this.props.ind.val3, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('7.', this.props.ind.lbl3, this.ln)
		this.pdf.text('Data Lainnya', this.props.ind.lbl4, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		let txt_lain_tertentu = this.nhi.flag_tertentu ? (this.nhi.data_lain_tertentu || '') : ''
		let arr_lain_tertentu = converters.array_text(txt_lain_tertentu, 50)
		let hgt_lain_tertentu = arr_lain_tertentu.length > 1 ? arr_lain_tertentu.length : 1
		this.pdf.text(txt_lain_tertentu, this.props.ind.val3, this.ln, {align: 'justify', maxWidth: 80})
		this.ln += this.props.font.height*(hgt_lain_tertentu+1)

		// Indikasi
		let txt_indikasi = `Indikasi: ${this.nhi.indikasi || ''}`
		let arr_indikasi = converters.array_text(txt_indikasi, 120)
		this.pdf.text(txt_indikasi, this.props.ind.sta, this.ln, {align: 'justify', maxWidth: 185})
		this.ln += this.props.font.height*(arr_indikasi.length+1)

		// Closing
		let txt_closing = 'Demikian disampaikan agar pelaksanaan Nota Hasil Intelijen ini dilaporkan pada kesempatan pertama.'
		this.pdf.text(txt_closing, this.props.ind.sta, this.ln)
		this.ln += this.props.font.height*2

		// TTD
		let txt_jabatan = this.nhi.penerbit.plh == true 
			? `Plh. ${this.nhi.penerbit.jabatan.jabatan}` 
			: this.nhi.penerbit.jabatan.jabatan
		this.pdf.text(txt_jabatan, this.props.ind.ttd, this.ln)
		this.ln += this.props.font.height*5
		this.pdf.text(this.nhi.penerbit.user.name, this.props.ind.ttd, this.ln)
		this.ln += this.props.font.height

		// CC
		this.pdf.text('Tembusan:', this.props.ind.sta, this.ln)
		let cc_num = 1
		this.nhi.tembusan.forEach(element => {
			this.ln += this.props.font.height
			this.pdf.text(`${cc_num}. ${element}`, this.props.ind.sta, this.ln)
			cc_num += 1
		});

		// LAMPIRAN
		if (this.nhi.objek) {
			if (this.nhi.objek.data.item.length > 2) {
				this.pdf.setFont('Helvetica', 'normal')
				this.pdf.addPage()
			
				// Header
				this.headerLampiran(this.nhi.no_dok_lengkap)
			
				// Tabel barang
				this.tabelBarang(this.nhi.objek.data.item)
			}	
		}

		////// WATERMARK //////
		if ([100].includes(this.nhi.kode_status)) {
			this.watermark()
		}

		return this.pdf.output('datauristring')
	}
}

export default PdfNhi