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
	constructor(
		data,
		lkai_type = 'lkai',
		doc_title = 'LEMBAR KERJA ANALISIS INTELIJEN',
		lppi_type = 'lppi',
		lppi_label = 'LPPI',
		title_line_indent = {start: 72, end: 138}
	) {
		super(props);
		this.data = data
		this.lkai_type = lkai_type
		this.doc_title = doc_title
		this.lppi_type = lppi_type
		this.lppi_label = lppi_label
		this.props.title_line = title_line_indent
		this.prepareDocDate(this.data.tanggal_dokumen)
	}

	generatePdf() {
		this.empty_checkbox = new Image()
		this.empty_checkbox.src = 'form/checkbox-unchecked.png'
		this.checked_checkbox = new Image()
		this.checked_checkbox.src = 'form/checkbox-checked.png'

		this.createHeader()
		this.createNomor(this.doc_title, '')

		// No & tanggal
		this.pdf.text('Nomor', this.props.ind.sta, this.ln)
		this.pdf.text(':', this.props.ind.cln1, this.ln)
		this.pdf.text(this.data.no_dok_lengkap, this.props.ind.val1, this.ln)
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
		let checkbox_lppi = this.empty_checkbox
		if (this.data.lppi_id != null) {
			checkbox_lppi = this.checked_checkbox
		}
		this.pdf.addImage(checkbox_lppi, 'png', this.props.ind.chk, this.ln-3.5, 4, 4);
		this.pdf.text(`${this.lppi_label},`, this.props.ind.lbl2, this.ln)
		this.pdf.text('Nomor:', this.props.ind.lbl3, this.ln)
		let txt_lppi = '-'
		if (this.data.nomor_lppi != null) {
			if (this.data.tanggal_lppi != null) {
				txt_lppi = `${this.data.nomor_lppi} tanggal ${this.data.tanggal_lppi}`
			} else {
				txt_lppi = `${this.data.nomor_lppi} tanggal -`
			}
		} else {
			if (this.data.tanggal_lppi != null) {
				txt_lppi = `- tanggal ${this.data.tanggal_lppi}`
			}
		}
		this.pdf.text(txt_lppi, this.props.ind.val2, this.ln)
		this.ln += this.props.font.height

		// LTPI
		let checkbox_lpti = this.data.flag_lpti == 1 ? this.checked_checkbox : this.empty_checkbox
		this.pdf.addImage(checkbox_lpti, 'png', this.props.ind.chk, this.ln-3.5, 4, 4);
		this.pdf.text('LPT-I,', this.props.ind.lbl2, this.ln)
		this.pdf.text('Nomor:', this.props.ind.lbl3, this.ln)
		let txt_lpti = this.data.nomor_lpti != null
			? this.data.tanggal_lpti != null
				? `${this.data.nomor_lpti} tanggal ${this.data.tanggal_lpti}`
				: `${this.data.nomor_lpti} tanggal -`
			: this.data.tanggal_lpti != null
				? `- tanggal ${this.data.tanggal_lpti}`
				: '-'
		this.pdf.text(txt_lpti, this.props.ind.val2, this.ln)
		this.ln += this.props.font.height

		// NPI
		let checkbox_npi = this.data.flag_npi == 1 ? this.checked_checkbox : this.empty_checkbox
		this.pdf.addImage(checkbox_npi, 'png', this.props.ind.chk, this.ln-3.5, 4, 4);
		let npi_type = this.lkai_type == 'lkain' ? 'NPI-N' : 'NPI'
		this.pdf.text(`${npi_type},`, this.props.ind.lbl2, this.ln)
		this.pdf.text('Nomor:', this.props.ind.lbl3, this.ln)
		let txt_npi = this.data.nomor_npi != null
			? this.data.tanggal_npi != null
				? `${this.data.nomor_npi} tanggal ${this.data.tanggal_npi}`
				: `${this.data.nomor_npi} tanggal -`
			: this.data.tanggal_ltpi != null
				? `- tanggal ${this.data.tanggal_npi}`
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
		this.data.ikhtisar.forEach(elm => {
			this.pdf.text(`${num.toString()}.`, this.props.ind.num, this.ln)
			let arr_ikhtisar = converters.array_text(elm.informasi, 110)
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
		let arr_prosedur = converters.array_text(this.data.prosedur, 110)
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
		let arr_hasil = converters.array_text(this.data.hasil, 110)
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
		let arr_kesimpulan = converters.array_text(this.data.kesimpulan, 110)
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
		let checkbox_nhi = this.data.flag_rekom_nhi == 1 ? this.checked_checkbox : this.empty_checkbox
		this.pdf.addImage(checkbox_nhi, 'png', this.props.ind.chk, this.ln-3.5, 4, 4);
		let nhi_type = this.lkai_type == 'lkain' ? 'NHI-N' : 'NHI'
		this.pdf.text(nhi_type, this.props.ind.lbl2, this.ln)
		this.ln += this.props.font.height*1.5

		// NI
		let checkbox_ni = this.data.flag_rekom_ni == 1 ? this.checked_checkbox : this.empty_checkbox
		this.pdf.addImage(checkbox_ni, 'png', this.props.ind.chk, this.ln-3.5, 4, 4);
		let ni_type = this.lkai_type == 'lkain' ? 'NI-N' : 'NI'
		this.pdf.text(ni_type, this.props.ind.lbl2, this.ln)
		this.ln += this.props.font.height*1.5

		// Rekomendasi
		let checkbox_rekomendasi = this.data.rekomendasi_lain != null ? this.checked_checkbox : this.empty_checkbox
		this.pdf.addImage(checkbox_rekomendasi, 'png', this.props.ind.chk, this.ln-3.5, 4, 4);
		let rekom_type = this.lkai_type == 'lkain' ? 'Lainnya' : 'Rekomendasi Lainnya'
		this.pdf.text(`${rekom_type}:`, this.props.ind.lbl2, this.ln)
		let y_rect_rekomendasi = this.ln - 4
		let txt_rekomendasi = this.data.rekomendasi_lain != null ? this.data.rekomendasi_lain : '-'
		let arr_rekomendasi = converters.array_text(txt_rekomendasi, 60)
		this.pdf.text(arr_rekomendasi, this.props.ind.val3, this.ln)
		this.ln += this.props.font.height*(arr_rekomendasi.length + 0.5)
		let h_rect_rekomendasi = this.ln - y_rect_rekomendasi - 4
		this.pdf.rect(this.props.ind.rct, y_rect_rekomendasi, 105, h_rect_rekomendasi)
		this.ln += this.props.font.height*0.5

		// Informasi
		if (this.lkai_type == 'lkai') {
			let checkbox_informasi = this.data.informasi_lain != null ? this.checked_checkbox : this.empty_checkbox
			this.pdf.addImage(checkbox_informasi, 'png', this.props.ind.chk, this.ln-3.5, 4, 4);
			this.pdf.text('Informasi Lainnya:', this.props.ind.lbl2, this.ln)
			let y_rect_informasi = this.ln - 4
			let txt_informasi = this.data.informasi_lain != null ? this.data.informasi_lain : '-'
			let arr_informasi = converters.array_text(txt_informasi, 60)
			this.pdf.text(arr_informasi, this.props.ind.val3, this.ln)
			this.ln += this.props.font.height*(arr_informasi.length + 0.5)
			let h_rect_informasi = this.ln - y_rect_informasi - 4
			this.pdf.rect(this.props.ind.rct, y_rect_informasi, 105, h_rect_informasi)
			this.ln += this.props.font.height
		}

		// Tujuan
		this.pdf.setFont('Helvetica', 'bold')
		this.pdf.text('TUJUAN:', this.props.ind.sta, this.ln)
		this.pdf.setFont('Helvetica', 'normal')
		let txt_tujuan = this.data.tujuan || '-'
		this.pdf.text(txt_tujuan, this.props.ind.val1, this.ln)
		this.ln += this.props.font.height*2

		// Analis
		this.pdf.setFont('Helvetica', 'bold')
		this.pdf.text('Analis,', this.props.ind.sta, this.ln)
		this.pdf.setFont('Helvetica', 'normal')
		this.ln += this.props.font.height*5
		let analis = this.data.petugas.analis ?? null
		let txt_analis = analis != null ? analis.name : '-'
		this.pdf.text(txt_analis, this.props.ind.sta, this.ln)

		///// TTD /////
		this.pdf.addPage()
		this.ln = 20
		this.generateTtd(
			this.data.petugas.pejabat, 
			this.data.keputusan_pejabat,
			this.data.catatan_pejabat,
			this.data.tanggal_terima_pejabat,
		)
		this.ln += this.props.font.height*4
		this.generateTtd(
			this.data.petugas.atasan,
			this.data.keputusan_atasan,
			this.data.catatan_atasan,
			this.data.tanggal_terima_atasan,
		)

		////// WATERMARK //////
		if (['draft'].includes(this.data.kode_status)) {
			this.watermark()
		}

		return this.pdf.output('datauristring')
	}

	generateTtd(data_pejabat, keputusan, catatan, tanggal_terima) {
		this.pdf.setFont('Helvetica', 'bold')
		let txt_tipe_ttd
		switch (data_pejabat.tipe_ttd) {
			case 'plh':
				txt_tipe_ttd = 'Plh. '
				break;

			case 'plt':
				txt_tipe_ttd = 'Plt. '
				break;
		
			default:
				txt_tipe_ttd = ''
				break;
		}
		let txt_jabatan = txt_tipe_ttd + data_pejabat.jabatan
		this.pdf.text(txt_jabatan, 105, this.ln, 'center')
		this.pdf.rect(this.props.ind.sta, this.ln-5, 190, 7)
		this.ln += 8
		
		this.pdf.text('Keputusan:', this.props.ind.num, this.ln)
		this.pdf.setFont('Helvetica', 'normal')
		let checkbox_y = keputusan == true ? this.checked_checkbox : this.empty_checkbox
		let checkbox_n = keputusan == true ? this.empty_checkbox : this.checked_checkbox
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
		let txt_ctt = catatan || '-'
		let arr_ctt = converters.array_text(txt_ctt, 85)
		this.pdf.text(arr_ctt, this.props.ind.lbl2, this.ln)
		let y_rect_catatan = this.ln-6
		let h_rect_catatan = (this.props.font.height*arr_ctt.length)+5
		this.pdf.rect(this.props.ind.sta, y_rect_catatan, 40, h_rect_catatan)
		this.pdf.rect(this.props.ind.sta+40, y_rect_catatan, 150, h_rect_catatan)
		this.ln += h_rect_catatan

		let txt_tgl_terima = tanggal_terima || '-'
		this.pdf.text(`Hasil analisis diterima tanggal: ${txt_tgl_terima}`, this.props.ind.num, this.ln)
		this.pdf.rect(this.props.ind.sta, this.ln-6, 190, 9)
		this.ln += 9

		this.pdf.setFont('Helvetica', 'bold')
		this.pdf.text('Tanda tangan:', this.props.ind.num, this.ln)
		this.pdf.setFont('Helvetica', 'normal')
		let y_rect_pejabat = this.ln-6
		this.ln += this.props.font.height*4
		let h_rect_pejabat = this.props.font.height*5+5
		let txt_pejabat = data_pejabat.name || '...................'
		this.pdf.text(txt_pejabat, this.props.ind.lbl2, this.ln)
		this.pdf.rect(this.props.ind.sta, y_rect_pejabat, 40, h_rect_pejabat)
		this.pdf.rect(this.props.ind.sta+40, y_rect_pejabat, 150, h_rect_pejabat)
	}
}

export default PdfLkai