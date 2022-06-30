import converters from "../../helpers/converter";
import Pdf from "./PdfMain"

const ind_start = 10

const props = {
	font: {
		size: 10,
		height: 4
	},
	title_line: {
		start: 80,
		end: 130
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

class PdfNhiN extends Pdf {
	constructor(data) {
		super(props);
		this.jenis_dok = 'NOTA HASIL INTELIJEN NPP'
		this.data = data
		this.nhin = this.data.dokumen.nhin
		this.prepareDocDate(this.nhin.tanggal_dokumen)
	}

	generatePdf() {
		this.createHeader()
		this.createNomor(this.jenis_dok, '')

		// No & tanggal
		this.pdf.text('Nomor', this.props.ind.sta, this.ln)
		this.pdf.text(':', this.props.ind.cln1, this.ln)
		this.pdf.text(this.nhin.no_dok_lengkap, this.props.ind.val1, this.ln)

		this.pdf.text('Referensi', this.props.ind.lbl2, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Tanggal', this.props.ind.sta, this.ln)
		this.pdf.text(':', this.props.ind.cln1, this.ln)
		this.pdf.text(this.full_tgl_dok, this.props.ind.val1, this.ln)

		this.pdf.text('Nomor LKAI-N', this.props.ind.lbl2, this.ln)
		this.pdf.text(':', this.props.ind.cln2, this.ln)
		this.pdf.text(this.nhin.nomor_lkain, this.props.ind.val2, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Sifat', this.props.ind.sta, this.ln)
		this.pdf.text(':', this.props.ind.cln1, this.ln)
		this.pdf.text(this.nhin.sifat, this.props.ind.val1, this.ln)

		this.pdf.text('Tanggal LKAI-N', this.props.ind.lbl2, this.ln)
		this.pdf.text(':', this.props.ind.cln2, this.ln)
		this.pdf.text(converters.fullDate(this.nhin.tanggal_lkain), this.props.ind.val2, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Klasifikasi', this.props.ind.sta, this.ln)
		this.pdf.text(':', this.props.ind.cln1, this.ln)
		this.pdf.text(this.nhin.klasifikasi, this.props.ind.val1, this.ln)
		this.ln += this.props.font.height*2

		// Uraian
		let txt_tujuan = this.nhin.tujuan || ''
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
		let txt_tempat = this.nhin.tempat_indikasi || ''
		let arr_tempat = converters.array_text(txt_tempat.replace('\n', ' '), 50)
		let hgt_tempat = arr_tempat.length > 0 ? arr_tempat.length : 1
		this.pdf.text(arr_tempat, this.props.ind.val3, this.ln)
		this.ln += this.props.font.height*hgt_tempat

		this.pdf.text('B.', this.props.ind.sta, this.ln)
		this.pdf.text('Tanggal/Waktu', this.props.ind.lbl3, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		if (this.nhin.waktu_indikasi) {
			if (this.nhin.zona_waktu) {
				var txt_tanggal = `${this.nhin.waktu_indikasi} ${this.nhin.zona_waktu}`
			} else {
				var txt_tanggal = `${this.nhin.waktu_indikasi}`
			}
		} else {
			var txt_tanggal = ''
		}
		this.pdf.text(txt_tanggal, this.props.ind.val3, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('C.', this.props.ind.sta, this.ln)
		this.pdf.text('Kantor Bea dan Cukai', this.props.ind.lbl3, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		let arr_kantor = ''
		let hgt_kantor = 1
		if (this.nhin.kantor_bc) {
			arr_kantor = converters.array_text(this.nhin.kantor_bc.nama_kantor, 38)
			hgt_kantor = arr_kantor.length
		}
		this.pdf.text(arr_kantor, this.props.ind.val3, this.ln)
		this.ln += this.props.font.height*hgt_kantor

		// EXIM
		this.pdf.text('D.', this.props.ind.sta, this.ln)
		this.pdf.text('Kegiatan atas Barang Impor/Ekspor*):', this.props.ind.lbl3, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('1.', this.props.ind.lbl3, this.ln)
		this.pdf.text('Nama/No. Dokumen Kepabeanan', this.props.ind.lbl4, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		let txt_dok_exim = this.nhin.flag_exim 
			? this.nhin.jenis_dok_exim
				? this.nhin.nomor_dok_exim
					? this.nhin.tanggal_dok_exim 
						? `${this.nhin.jenis_dok_exim} nomor ${this.nhin.nomor_dok_exim} tanggal ${this.nhin.tanggal_dok_exim}`
						: `${this.nhin.jenis_dok_exim} nomor ${this.nhin.nomor_dok_exim}`
					: this.nhin.tanggal_dok_exim 
						? `${this.nhin.jenis_dok_exim} tanggal ${this.nhin.tanggal_dok_exim}`
						: this.nhin.jenis_dok_exim
				: this.nhin.nomor_dok_exim
					? this.nhin.tanggal_dok_exim 
						? `${this.nhin.nomor_dok_exim} tanggal ${this.nhin.tanggal_dok_exim}`
						: this.nhin.nomor_dok_exim
					: ''
			: ''
		this.pdf.text(txt_dok_exim, this.props.ind.val3, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('2.', this.props.ind.lbl3, this.ln)
		this.pdf.text('Eks/Untuk Kapal/Pesawat/Alat Angkut/Lainnya', this.props.ind.lbl4, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		if (this.nhin.flag_exim) {
			var txt_sarkut_exim = `${this.nhin.nama_sarkut_exim || '-'} Voy/Flight/No. Pol: ${this.nhin.no_flight_trayek_exim || '-'}`
			var arr_sarkut_exim = converters.array_text(txt_sarkut_exim, 50)
			var height_sarkut_exim = arr_sarkut_exim.length
		} else {
			var arr_sarkut_exim = ''
			var height_sarkut_exim = 1
		}
		this.pdf.text(arr_sarkut_exim, this.props.ind.val3, this.ln)
		this.ln += this.props.font.height*height_sarkut_exim

		this.pdf.text('3.', this.props.ind.lbl3, this.ln)
		this.pdf.text('No. BL/AWB', this.props.ind.lbl4, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		let txt_awb_exim = this.nhin.flag_exim 
			? this.nhin.nomor_awb_exim
				? this.nhin.tanggal_awb_exim
					? `${this.nhin.nomor_awb_exim} tanggal ${this.nhin.tanggal_awb_exim}` 
					: this.nhin.nomor_awb_exim
				: this.nhin.tanggal_awb_exim
					? `- tanggal ${this.nhin.tanggal_awb_exim}` 
					: ''
			: ''
		this.pdf.text(txt_awb_exim, this.props.ind.val3, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('4.', this.props.ind.lbl3, this.ln)
		this.pdf.text('No. Container/Merek Kolli', this.props.ind.lbl4, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		let txt_koli_exim = this.nhin.flag_exim ? (this.nhin.merek_koli_exim || '') : ''
		this.pdf.text(txt_koli_exim, this.props.ind.val3, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('5.', this.props.ind.lbl3, this.ln)
		this.pdf.text('Importir/Eksportir/PPJK', this.props.ind.lbl4, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		let txt_importir_exim = this.nhin.flag_exim ? (this.nhin.importir_ppjk || '') : ''
		this.pdf.text(txt_importir_exim, this.props.ind.val3, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('6.', this.props.ind.lbl3, this.ln)
		this.pdf.text('NPWP', this.props.ind.lbl4, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		let txt_npwp_exim = this.nhin.flag_exim ? (this.nhin.npwp || '') : ''
		this.pdf.text(txt_npwp_exim, this.props.ind.val3, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('7.', this.props.ind.lbl3, this.ln)
		this.pdf.text('Jenis/Jumlah barang', this.props.ind.lbl4, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		let height_barang = 1
		let uraian_barang = ''
		if (this.nhin.barang_exim) {
			if (this.nhin.barang_exim.data.item.length > 1) {
				uraian_barang = 'LIHAT LAMPIRAN'
			} else {
				let txt_barang = `${this.nhin.barang_exim.data.item[0].jumlah_barang} `
					+ `${this.nhin.barang_exim.data.item[0].satuan.kode_satuan} `
					+ `${this.nhin.barang_exim.data.item[0].uraian_barang} `
				uraian_barang = converters.array_text(txt_barang, 45)
				height_barang = uraian_barang.length
			}	
		}
		this.pdf.text(uraian_barang, this.props.ind.val3, this.ln, {align: 'justify', maxWidth: 80})
		this.ln += this.props.font.height*height_barang

		this.pdf.text('8.', this.props.ind.lbl3, this.ln)
		this.pdf.text('Data Lainnya', this.props.ind.lbl4, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		let txt_lain_exim = this.nhin.flag_exim ? (this.nhin.data_lain_exim || '') : ''
		let arr_lain_exim = converters.array_text(txt_lain_exim, 50)
		let hgt_lain_exim = arr_lain_exim.length > 1 ? arr_lain_exim.length : 1
		this.pdf.text(txt_lain_exim, this.props.ind.val3, this.ln, {align: 'justify', maxWidth: 80})
		this.ln += this.props.font.height*hgt_lain_exim

		// Sarkut
		this.pdf.text('E.', this.props.ind.sta, this.ln)
		this.pdf.text('Kegiatan atas Sarana Pengangkut:', this.props.ind.lbl3, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('1.', this.props.ind.lbl3, this.ln)
		this.pdf.text('Nama', this.props.ind.lbl4, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		let txt_nama_sarkut = this.nhin.flag_sarkut ? (this.nhin.nama_sarkut || '') : ''
		this.pdf.text(txt_nama_sarkut, this.props.ind.val3, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('2.', this.props.ind.lbl3, this.ln)
		this.pdf.text('Jenis Sarana Pengangkut', this.props.ind.lbl4, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		let txt_jenis_sarkut = this.nhin.flag_sarkut ? (this.nhin.jenis_sarkut || '') : ''
		this.pdf.text(txt_jenis_sarkut, this.props.ind.val3, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('3.', this.props.ind.lbl3, this.ln)
		this.pdf.text('Voyage / Flight / No Pol', this.props.ind.lbl4, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		let txt_flight_trayek = this.nhin.flag_sarkut ? (this.nhin.no_flight_trayek_sarkut || '') : ''
		this.pdf.text(txt_flight_trayek, this.props.ind.val3, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('4.', this.props.ind.lbl3, this.ln)
		this.pdf.text('Pelabuhan Asal', this.props.ind.lbl4, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		let txt_asal_sarkut = ''
		if (this.nhin.flag_sarkut) {
			if (this.nhin.pelabuhan_asal_sarkut) {
				if (this.nhin.pelabuhan_asal_sarkut.negara) {
					txt_asal_sarkut = `${this.nhin.pelabuhan_asal_sarkut.airport_name}, ${this.nhin.pelabuhan_asal_sarkut.negara.kode_2}`
				} else {
					txt_asal_sarkut = this.nhin.pelabuhan_asal_sarkut.airport_name
				}
			}
		}
		this.pdf.text(txt_asal_sarkut, this.props.ind.val3, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('5.', this.props.ind.lbl3, this.ln)
		this.pdf.text('Pelabuhan Tujuan', this.props.ind.lbl4, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		let txt_tujuan_sarkut = ''
		if (this.nhin.flag_sarkut) {
			if (this.nhin.pelabuhan_tujuan_sarkut) {
				if (this.nhin.pelabuhan_tujuan_sarkut.negara) {
					txt_tujuan_sarkut = `${this.nhin.pelabuhan_tujuan_sarkut.airport_name}, ${this.nhin.pelabuhan_tujuan_sarkut.negara.kode_2}`
				} else {
					txt_tujuan_sarkut = this.nhin.pelabuhan_tujuan_sarkut.airport_name
				}
			}
		}
		this.pdf.text(txt_tujuan_sarkut, this.props.ind.val3, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('6.', this.props.ind.lbl3, this.ln)
		this.pdf.text('IMO / MMSI', this.props.ind.lbl4, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		let txt_imo_mmsi = this.nhin.flag_sarkut ? (this.nhin.imo_mmsi_sarkut || '') : ''
		this.pdf.text(txt_imo_mmsi, this.props.ind.val3, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('7.', this.props.ind.lbl3, this.ln)
		this.pdf.text('Data Lainnya', this.props.ind.lbl4, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		let txt_lain_sarkut = this.nhin.flag_sarkut ? (this.nhin.data_lain_sarkut || '') : ''
		let arr_lain_sarkut = converters.array_text(txt_lain_sarkut, 50)
		let hgt_lain_sarkut = arr_lain_sarkut.length > 1 ? arr_lain_sarkut.length : 1
		this.pdf.text(txt_lain_sarkut, this.props.ind.val3, this.ln, {align: 'justify', maxWidth: 80})
		this.ln += this.props.font.height*hgt_lain_sarkut

		// Orang
		this.pdf.text('F.', this.props.ind.sta, this.ln)
		this.pdf.text('Kegiatan atas Orang:', this.props.ind.lbl3, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('1.', this.props.ind.lbl3, this.ln)
		this.pdf.text('Nama', this.props.ind.lbl4, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		let txt_nama_orang = this.nhin.flag_orang ? (this.nhin.orang.nama || '') : ''
		this.pdf.text(txt_nama_orang, this.props.ind.val3, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('2.', this.props.ind.lbl3, this.ln)
		this.pdf.text('Jenis Kelamin', this.props.ind.lbl4, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		let txt_jenis_kelamin = this.nhin.flag_orang ? (this.nhin.orang.jenis_kelamin || '') : ''
		this.pdf.text(txt_jenis_kelamin, this.props.ind.val3, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('3.', this.props.ind.lbl3, this.ln)
		this.pdf.text('Kewarganegaraan', this.props.ind.lbl4, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		let txt_warga_negara = this.nhin.flag_orang ? (this.nhin.orang.warga_negara || '') : ''
		this.pdf.text(txt_warga_negara, this.props.ind.val3, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('4.', this.props.ind.lbl3, this.ln)
		this.pdf.text('No Paspor', this.props.ind.lbl4, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		let txt_no_paspor = this.nhin.flag_orang ? (this.nhin.orang.nomor_identitas || '') : ''
		this.pdf.text(txt_no_paspor, this.props.ind.val3, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('5.', this.props.ind.lbl3, this.ln)
		this.pdf.text('Flight / Voyage', this.props.ind.lbl4, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		let txt_flight_voyage_orang = this.nhin.flag_orang ? (this.nhin.flight_voyage_orang || '') : ''
		this.pdf.text(txt_flight_voyage_orang, this.props.ind.val3, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('6.', this.props.ind.lbl3, this.ln)
		this.pdf.text('Pelabuhan / Bandara Asal', this.props.ind.lbl4, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		let txt_asal_orang = ''
		if (this.nhin.flag_orang) {
			if (this.nhin.pelabuhan_asal_orang) {
				if (this.nhin.pelabuhan_asal_orang.negara) {
					txt_asal_orang = `${this.nhin.pelabuhan_asal_orang.airport_name}, ${this.nhin.pelabuhan_asal_orang.negara.kode_2}`
				} else {
					txt_asal_orang = this.nhin.pelabuhan_asal_orang.airport_name
				}
			}
		}
		this.pdf.text(txt_asal_orang, this.props.ind.val3, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('7.', this.props.ind.lbl3, this.ln)
		this.pdf.text('Pelabuhan / Bandara Tujuan', this.props.ind.lbl4, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		let txt_tujuan_orang = ''
		if (this.nhin.flag_orang) {
			if (this.nhin.pelabuhan_tujuan_orang) {
				if (this.nhin.pelabuhan_tujuan_orang.negara) {
					txt_tujuan_orang = `${this.nhin.pelabuhan_tujuan_orang.airport_name}, ${this.nhin.pelabuhan_tujuan_orang.negara.kode_2}`
				} else {
					txt_tujuan_orang = this.nhin.pelabuhan_tujuan_orang.airport_name
				}
			}
		}
		this.pdf.text(txt_tujuan_orang, this.props.ind.val3, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('8.', this.props.ind.lbl3, this.ln)
		this.pdf.text('Waktu Keberangkatan', this.props.ind.lbl4, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		let txt_waktu_berangkat_orang = this.nhin.flag_orang ? (this.nhin.waktu_berangkat_orang || '') : ''
		this.pdf.text(txt_waktu_berangkat_orang, this.props.ind.val3, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('9.', this.props.ind.lbl3, this.ln)
		this.pdf.text('Waktu Kedatangan', this.props.ind.lbl4, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		let txt_waktu_datang_orang = this.nhin.flag_orang ? (this.nhin.waktu_datang_orang || '') : ''
		this.pdf.text(txt_waktu_datang_orang, this.props.ind.val3, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('10.', this.props.ind.lbl3, this.ln)
		this.pdf.text('Data Lainnya', this.props.ind.lbl4, this.ln)
		this.pdf.text(':', this.props.ind.cln3, this.ln)
		let txt_lain_orang = this.nhin.flag_orang ? (this.nhin.data_lain_orang || '') : ''
		let arr_lain_orang = converters.array_text(txt_lain_orang, 50)
		let hgt_lain_orang = arr_lain_orang.length > 1 ? arr_lain_orang.length : 1
		this.pdf.text(txt_lain_orang, this.props.ind.val3, this.ln, {align: 'justify', maxWidth: 80})
		this.ln += this.props.font.height*(hgt_lain_orang+1)

		// Indikasi
		let txt_indikasi = `Indikasi: ${this.nhin.indikasi || ''}`
		let arr_indikasi = converters.array_text(txt_indikasi, 120)
		this.pdf.text(txt_indikasi, this.props.ind.sta, this.ln, {align: 'justify', maxWidth: 185})
		this.ln += this.props.font.height*(arr_indikasi.length+1)

		// Closing
		let txt_closing = 'Demikian disampaikan agar pelaksanaan Nota Hasil Intelijen ini dilaporkan pada kesempatan pertama.'
		this.pdf.text(txt_closing, this.props.ind.sta, this.ln)
		this.ln += this.props.font.height*2

		// TTD
		let txt_jabatan = this.nhin.penerbit.plh == true 
			? `Plh. ${this.nhin.penerbit.jabatan.jabatan}` 
			: this.nhin.penerbit.jabatan.jabatan
		this.pdf.text(txt_jabatan, this.props.ind.ttd, this.ln)
		this.ln += this.props.font.height*5
		this.pdf.text(this.nhin.penerbit.user.name, this.props.ind.ttd, this.ln)
		this.ln += this.props.font.height

		// CC
		this.pdf.text('Tembusan:', this.props.ind.sta, this.ln)
		let cc_num = 1
		this.nhin.tembusan.forEach(element => {
			this.ln += this.props.font.height
			this.pdf.text(`${cc_num}. ${element}`, this.props.ind.sta, this.ln)
			cc_num += 1
		});
		
		// LAMPIRAN
		if (this.nhin.barang_exim) {
			if (this.nhin.barang_exim.data.item.length > 1) {
				this.pdf.setFont('Helvetica', 'normal')
				this.pdf.addPage()
			
				// Header
				this.headerLampiran(this.nhin.no_dok_lengkap)
			
				// Tabel barang
				this.tabelBarang(this.nhin.barang_exim.data.item)
			}	
		}

		////// WATERMARK //////
		if ([100].includes(this.nhin.kode_status)) {
			this.watermark()
		}

		return this.pdf.output('datauristring')
	}
}

export default PdfNhiN