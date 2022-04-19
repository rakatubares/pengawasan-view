import converters from "../../helpers/converter";
import Pdf from "./PdfMain"

const ind_start = 10

const props = {
	font: {
		size: 10,
		height: 4
	},
	title_line: {
		start: 72,
		end: 138
	},
	ind: {
		sta: ind_start,
		cln1: ind_start+15,
		val1: ind_start+20,
		chk: ind_start+40,
		lbl2: ind_start+47,
		lbl3: ind_start+60,
		val2: ind_start+75,
		num: ind_start+5,
		txt: ind_start+10,
		rct: ind_start+85,
		val3: ind_start+88,
		ttd:125,
		lamp: 140
	}
}

class PdfLkai extends Pdf {
	constructor(data) {
		super(props);
		this.jenis_dok = 'LEMBAR KERJA ANALISIS INTELIJEN'
		this.data = data
		this.lkai = this.data.dokumen.lkai
		this.prepareDocDate(this.lkai.tanggal_dokumen)
	}

	generatePdf() {
		this.empty_checkbox = new Image()
		this.empty_checkbox.src = 'form/checkbox-unchecked.png'
		this.checked_checkbox = new Image()
		this.checked_checkbox.src = 'form/checkbox-checked.png'

		this.createHeader()
		this.createNomor(this.jenis_dok, '')

		// No & tanggal
		this.pdf.text('Nomor', this.props.ind.sta, this.ln)
		this.pdf.text(':', this.props.ind.cln1, this.ln)
		this.pdf.text(this.lkai.no_dok_lengkap, this.props.ind.val1, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Tanggal', this.props.ind.sta, this.ln)
		this.pdf.text(':', this.props.ind.cln1, this.ln)
		this.pdf.text(this.full_tgl_dok, this.props.ind.val1, this.ln)
		this.ln += this.props.font.height*2

		///// Dokumen Sumber /////
		this.pdf.setFont('Helvetica', 'bold')
		this.pdf.text('DOKUMEN SUMBER:', this.props.ind.sta, this.ln)
		this.pdf.setFont('Helvetica', 'normal')

		// LPPI
		let checkbox_lppi = this.lkai.nomor_lppi != null ? this.checked_checkbox : this.empty_checkbox
		this.pdf.addImage(checkbox_lppi, 'png', this.props.ind.chk, this.ln-3.5, 4, 4);
		this.pdf.text('LPPI,', this.props.ind.lbl2, this.ln)
		this.pdf.text('Nomor:', this.props.ind.lbl3, this.ln)
		let txt_lppi = this.lkai.nomor_lppi != null
			? this.lkai.tanggal_lppi != null
				? `${this.lkai.nomor_lppi} tanggal ${this.lkai.tanggal_lppi}`
				: `${this.lkai.nomor_lppi} tanggal -`
			: this.lkai.tanggal_lppi != null
				? `- tanggal ${this.lkai.tanggal_lppi}`
				: '-'
		this.pdf.text(txt_lppi, this.props.ind.val2, this.ln)
		this.ln += this.props.font.height

		// LTPI
		let checkbox_lpti = this.lkai.flag_lpti == 1 ? this.checked_checkbox : this.empty_checkbox
		this.pdf.addImage(checkbox_lpti, 'png', this.props.ind.chk, this.ln-3.5, 4, 4);
		this.pdf.text('LPT-I,', this.props.ind.lbl2, this.ln)
		this.pdf.text('Nomor:', this.props.ind.lbl3, this.ln)
		let txt_lpti = this.lkai.nomor_lpti != null
			? this.lkai.tanggal_lpti != null
				? `${this.lkai.nomor_lpti} tanggal ${this.lkai.tanggal_lpti}`
				: `${this.lkai.nomor_lpti} tanggal -`
			: this.lkai.tanggal_lpti != null
				? `- tanggal ${this.lkai.tanggal_lpti}`
				: '-'
		this.pdf.text(txt_lpti, this.props.ind.val2, this.ln)
		this.ln += this.props.font.height

		// NPI
		let checkbox_npi = this.lkai.flag_npi == 1 ? this.checked_checkbox : this.empty_checkbox
		this.pdf.addImage(checkbox_npi, 'png', this.props.ind.chk, this.ln-3.5, 4, 4);
		this.pdf.text('NPI,', this.props.ind.lbl2, this.ln)
		this.pdf.text('Nomor:', this.props.ind.lbl3, this.ln)
		let txt_npi = this.lkai.nomor_npi != null
			? this.lkai.tanggal_npi != null
				? `${this.lkai.nomor_npi} tanggal ${this.lkai.tanggal_npi}`
				: `${this.lkai.nomor_npi} tanggal -`
			: this.lkai.tanggal_ltpi != null
				? `- tanggal ${this.lkai.tanggal_npi}`
				: '-'
		this.pdf.text(txt_npi, this.props.ind.val2, this.ln)
		this.ln += this.props.font.height*2

		///// Analisis /////
		// Ikhtisar
		let y_rect_ikhtisar = this.ln - 4
		this.pdf.setFont('Helvetica', 'bold')
		this.pdf.text('IKHTISAR INFORMASI', 105, this.ln, 'center')
		this.ln += this.props.font.height*2
		this.pdf.setFont('Helvetica', 'normal')
		this.pdf.rect(this.props.ind.sta, y_rect_ikhtisar, 190, 5, 'D');
		let num = 1
		this.lkai.ikhtisar.forEach(elm => {
			this.pdf.text(`${num.toString()}.`, this.props.ind.num, this.ln)
			let arr_ikhtisar = converters.array_text(elm.ikhtisar, 110)
			this.pdf.text(arr_ikhtisar, this.props.ind.txt, this.ln)
			this.ln += this.props.font.height*arr_ikhtisar.length
			num += 1
		});
		let h_rect_ikhtisar = this.ln - y_rect_ikhtisar
		this.pdf.rect(this.props.ind.sta, y_rect_ikhtisar, 190, h_rect_ikhtisar, 'D')
		this.ln += this.props.font.height*2

		// Prosedur
		let y_rect_prosedur = this.ln - 4
		this.pdf.setFont('Helvetica', 'bold')
		this.pdf.text('PROSEDUR ANALISIS', 105, this.ln, 'center')
		this.ln += this.props.font.height*2
		this.pdf.setFont('Helvetica', 'normal')
		this.pdf.rect(this.props.ind.sta, y_rect_prosedur, 190, 5, 'D');
		let arr_prosedur = converters.array_text(this.lkai.prosedur, 110)
		this.pdf.text(arr_prosedur, this.props.ind.num, this.ln)
		this.ln += this.props.font.height*arr_prosedur.length
		let h_rect_prosedur = this.ln - y_rect_prosedur
		this.pdf.rect(this.props.ind.sta, y_rect_prosedur, 190, h_rect_prosedur, 'D')
		this.ln += this.props.font.height*2

		// Hasil
		let y_rect_hasil = this.ln - 4
		this.pdf.setFont('Helvetica', 'bold')
		this.pdf.text('HASIL ANALISIS', 105, this.ln, 'center')
		this.ln += this.props.font.height*2
		this.pdf.setFont('Helvetica', 'normal')
		this.pdf.rect(this.props.ind.sta, y_rect_hasil, 190, 5, 'D');
		let arr_hasil = converters.array_text(this.lkai.hasil, 110)
		this.pdf.text(arr_hasil, this.props.ind.num, this.ln)
		this.ln += this.props.font.height*arr_hasil.length
		let h_rect_hasil = this.ln - y_rect_hasil
		this.pdf.rect(this.props.ind.sta, y_rect_hasil, 190, h_rect_hasil, 'D')
		this.ln += this.props.font.height*2

		// Kesimpulan
		let y_rect_kesimpulan = this.ln - 4
		this.pdf.setFont('Helvetica', 'bold')
		this.pdf.text('KESIMPULAN', 105, this.ln, 'center')
		this.ln += this.props.font.height*2
		this.pdf.setFont('Helvetica', 'normal')
		this.pdf.rect(this.props.ind.sta, y_rect_kesimpulan, 190, 5, 'D');
		let arr_kesimpulan = converters.array_text(this.lkai.kesimpulan, 110)
		this.pdf.text(arr_kesimpulan, this.props.ind.num, this.ln)
		this.ln += this.props.font.height*arr_kesimpulan.length
		let h_rect_kesimpulan = this.ln - y_rect_kesimpulan
		this.pdf.rect(this.props.ind.sta, y_rect_kesimpulan, 190, h_rect_kesimpulan, 'D')
		this.ln += this.props.font.height*2

		///// Rekomendasi /////
		this.pdf.setFont('Helvetica', 'bold')
		this.pdf.text('REKOMENDASI:', this.props.ind.sta, this.ln)
		this.pdf.setFont('Helvetica', 'normal')

		// NHI
		let checkbox_nhi = this.lkai.flag_rekom_nhi == 1 ? this.checked_checkbox : this.empty_checkbox
		this.pdf.addImage(checkbox_nhi, 'png', this.props.ind.chk, this.ln-3.5, 4, 4);
		this.pdf.text('NHI', this.props.ind.lbl2, this.ln)
		this.ln += this.props.font.height*1.5

		// NI
		let checkbox_ni = this.lkai.flag_rekom_ni == 1 ? this.checked_checkbox : this.empty_checkbox
		this.pdf.addImage(checkbox_ni, 'png', this.props.ind.chk, this.ln-3.5, 4, 4);
		this.pdf.text('NI', this.props.ind.lbl2, this.ln)
		this.ln += this.props.font.height*1.5

		// Rekomendasi
		let checkbox_rekomendasi = this.lkai.rekomendasi_lain != null ? this.checked_checkbox : this.empty_checkbox
		this.pdf.addImage(checkbox_rekomendasi, 'png', this.props.ind.chk, this.ln-3.5, 4, 4);
		this.pdf.text('Rekomendasi Lainnya:', this.props.ind.lbl2, this.ln)
		let y_rect_rekomendasi = this.ln - 4
		let txt_rekomendasi = this.lkai.rekomendasi_lain != null ? this.lkai.rekomendasi_lain : '-'
		let arr_rekomendasi = converters.array_text(txt_rekomendasi, 60)
		this.pdf.text(arr_rekomendasi, this.props.ind.val3, this.ln)
		this.ln += this.props.font.height*(arr_rekomendasi.length + 0.5)
		let h_rect_rekomendasi = this.ln - y_rect_rekomendasi - 4
		this.pdf.rect(this.props.ind.rct, y_rect_rekomendasi, 105, h_rect_rekomendasi)
		this.ln += this.props.font.height*0.5

		// Informasi
		let checkbox_informasi = this.lkai.informasi_lain != null ? this.checked_checkbox : this.empty_checkbox
		this.pdf.addImage(checkbox_informasi, 'png', this.props.ind.chk, this.ln-3.5, 4, 4);
		this.pdf.text('Informasi Lainnya:', this.props.ind.lbl2, this.ln)
		let y_rect_informasi = this.ln - 4
		let txt_informasi = this.lkai.informasi_lain != null ? this.lkai.informasi_lain : '-'
		let arr_informasi = converters.array_text(txt_informasi, 60)
		this.pdf.text(arr_informasi, this.props.ind.val3, this.ln)
		this.ln += this.props.font.height*(arr_informasi.length + 0.5)
		let h_rect_informasi = this.ln - y_rect_informasi - 4
		this.pdf.rect(this.props.ind.rct, y_rect_informasi, 105, h_rect_informasi)
		this.ln += this.props.font.height

		// Tujuan
		this.pdf.setFont('Helvetica', 'bold')
		this.pdf.text('TUJUAN:', this.props.ind.sta, this.ln)
		this.pdf.setFont('Helvetica', 'normal')
		let txt_tujuan = this.lkai.tujuan || '-'
		this.pdf.text(txt_tujuan, this.props.ind.val1, this.ln)
		this.ln += this.props.font.height*2

		// Analis
		this.pdf.setFont('Helvetica', 'bold')
		this.pdf.text('Analis,', this.props.ind.sta, this.ln)
		this.pdf.setFont('Helvetica', 'normal')
		this.ln += this.props.font.height*5
		this.pdf.text(this.lkai.analis.name, this.props.ind.sta, this.ln)

		///// TTD /////
		this.pdf.addPage()
		this.ln = 20
		this.generateTtd(this.lkai.pejabat)
		this.ln += this.props.font.height*4
		this.generateTtd(this.lkai.atasan)

		return this.pdf.output('datauristring')
	}

	generateTtd(data_pejabat) {
		this.pdf.setFont('Helvetica', 'bold')
		let txt_jabatan = data_pejabat.plh == 1 
			? `Plh. ${data_pejabat.jabatan.jabatan}`
			: data_pejabat.jabatan.jabatan
		this.pdf.text(txt_jabatan, 105, this.ln, 'center')
		this.pdf.rect(this.props.ind.sta, this.ln-5, 190, 7)
		this.ln += 8
		
		this.pdf.text('Keputusan:', this.props.ind.num, this.ln)
		this.pdf.setFont('Helvetica', 'normal')
		let checkbox_y = data_pejabat.keputusan == 1 ? this.checked_checkbox : this.empty_checkbox
		let checkbox_n = data_pejabat.keputusan == 1 ? this.empty_checkbox : this.checked_checkbox
		this.pdf.addImage(checkbox_y, 'png', this.props.ind.lbl2, this.ln-3.5, 4, 4)
		this.pdf.text('Setuju', this.props.ind.lbl2+5, this.ln)
		this.pdf.addImage(checkbox_n, 'png', this.props.ind.lbl2+30, this.ln-3.5, 4, 4)
		this.pdf.text('Tidak Setuju', this.props.ind.lbl2+35, this.ln)
		let y_rect_checkbox = this.ln-6
		let h_rect_checkbox = 9
		this.pdf.rect(this.props.ind.sta, y_rect_checkbox, 40, h_rect_checkbox)
		this.pdf.rect(this.props.ind.sta+40, y_rect_checkbox, 150, h_rect_checkbox)
		this.ln += 9

		this.pdf.setFont('Helvetica', 'bold')
		this.pdf.text('Catatan:', this.props.ind.num, this.ln)
		this.pdf.setFont('Helvetica', 'normal')
		let txt_ctt = data_pejabat.catatan || '-'
		let arr_ctt = converters.array_text(txt_ctt, 85)
		this.pdf.text(arr_ctt, this.props.ind.lbl2, this.ln)
		let y_rect_catatan = this.ln-6
		let h_rect_catatan = (this.props.font.height*arr_ctt.length)+5
		this.pdf.rect(this.props.ind.sta, y_rect_catatan, 40, h_rect_catatan)
		this.pdf.rect(this.props.ind.sta+40, y_rect_catatan, 150, h_rect_catatan)
		this.ln += h_rect_catatan

		let txt_tgl_terima = data_pejabat.tanggal_terima || '-'
		this.pdf.text(`Hasil analisis diterima tanggal: ${txt_tgl_terima}`, this.props.ind.num, this.ln)
		this.pdf.rect(this.props.ind.sta, this.ln-6, 190, 9)
		this.ln += 9

		this.pdf.setFont('Helvetica', 'bold')
		this.pdf.text('Tanda tangan:', this.props.ind.num, this.ln)
		this.pdf.setFont('Helvetica', 'normal')
		let y_rect_pejabat = this.ln-6
		this.ln += this.props.font.height*4
		let h_rect_pejabat = this.props.font.height*5+5
		let txt_pejabat = data_pejabat.user.name || '...................'
		this.pdf.text(txt_pejabat, this.props.ind.lbl2, this.ln)
		this.pdf.rect(this.props.ind.sta, y_rect_pejabat, 40, h_rect_pejabat)
		this.pdf.rect(this.props.ind.sta+40, y_rect_pejabat, 150, h_rect_pejabat)
	}
}

export default PdfLkai