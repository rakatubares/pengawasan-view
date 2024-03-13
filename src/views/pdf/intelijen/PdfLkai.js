import Pdf from '../MyPdf'

const inds = {
	cln1: 25,
	val1: 30,
	chk: 50,
	lbl2: 57,
	lbl3: 70,
	val2: 85,
	num: 15,
	txt: 20,
	rct: 95,
	val3: 98,
	ttd:125,
}

class PdfLkai extends Pdf 
{
	constructor(
		data, 
		title='LEMBAR KERJA ANALISIS INTELIJEN',
		lkai_type='lkai',
		lppi_label='LPPI',
		lpti_label='LPTI',
		npi_label='NPI',
		nhi_label='NHI',
		ni_label='NI',
	)
	{
		super(data, title)
		this.lkai_type = lkai_type
		this.lppi_label = lppi_label
		this.lpti_label = lpti_label
		this.npi_label = npi_label
		this.nhi_label = nhi_label
		this.ni_label = ni_label

		this.empty_checkbox = new Image()
		this.empty_checkbox.src = 'form/checkbox-unchecked.png'
		this.checked_checkbox = new Image()
		this.checked_checkbox.src = 'form/checkbox-checked.png'
	}

	generateText() 
	{
		this.prepareDocDate(this.data.tanggal_dokumen)
		
		this.checkbox = {}
		this.checkbox.lppi = this.data.lppi_id != null ? this.checked_checkbox : this.empty_checkbox
		this.checkbox.lpti = (
			(
				this.data.nomor_lpti != null &&
				this.data.nomor_lpti != ''
			) ||
			this.data.tanggal_lpti != null
		) ? this.checked_checkbox : this.empty_checkbox
		this.checkbox.npi = (
			(
				this.data.nomor_npi != null &&
				this.data.nomor_npi != ''
			) ||
			this.data.tanggal_npi != null
		) ? this.checked_checkbox : this.empty_checkbox
		this.checkbox.nhi = this.data.flag_rekom_nhi == 1 ? this.checked_checkbox : this.empty_checkbox
		this.checkbox.ni = this.data.flag_rekom_ni == 1 ? this.checked_checkbox : this.empty_checkbox
		this.checkbox.rekomendasi = this.data.rekomendasi_lain != null ? this.checked_checkbox : this.empty_checkbox
		this.checkbox.informasi_lain = this.data.informasi_lain != null ? this.checked_checkbox : this.empty_checkbox

		this.txt = {}
		this.txt.lppi = this.data.nomor_lppi
			? this.data.tanggal_lppi
				? `${this.data.nomor_lppi} tanggal ${this.data.tanggal_lppi}`
				: `${this.data.nomor_lppi} tanggal -`
			: this.data.tanggal_lppi
				? `- tanggal ${this.data.tanggal_lppi}`
				: `-`
		this.txt.lpti = this.data.nomor_lpti
			? this.data.tanggal_lpti
				? `${this.data.nomor_lpti} tanggal ${this.data.tanggal_lpti}`
				: `${this.data.nomor_lpti} tanggal -`
			: this.data.tanggal_lpti
				? `- tanggal ${this.data.tanggal_lpti}`
				: `-`
		this.txt.npi = this.data.nomor_npi
			? this.data.tanggal_npi
				? `${this.data.nomor_npi} tanggal ${this.data.tanggal_npi}`
				: `${this.data.nomor_npi} tanggal -`
			: this.data.tanggal_npi
				? `- tanggal ${this.data.tanggal_npi}`
				: `-`

		this.txt.informasi = this.data.informasi != null ? this.data.informasi : '-'
		this.txt.prosedur = this.data.prosedur != null ? this.data.prosedur : '-'
		this.txt.hasil = this.data.hasil != null ? this.data.hasil : '-'
		this.txt.kesimpulan = this.data.kesimpulan != null ? this.data.kesimpulan : '-'

		this.txt.label_rekomendasi = 'Rekomendasi Lainnya'
		this.txt.rekomendasi = this.data.rekomendasi_lain != null ? this.data.rekomendasi_lain : '-'
		this.txt.informasi_lain = this.data.informasi_lain != null ? this.data.informasi_lain : '-'

		this.txt.tujuan = this.data.tujuan || '-'

		this.txt.analis = this.data.petugas.analis ? this.data.petugas.analis.name : '-'
	}

	writeText()
	{
		this.createHeader()
		this.createNomor(this.jenis_dok)

		// No & tanggal
		this.write('Nomor')
		this.write(':', inds.cln1)
		this.write(this.data.no_dok_lengkap, inds.val1)
		this.break()

		this.write('Tanggal')
		this.write(':', inds.cln1)
		this.write(this.full_tgl_dok, inds.val1)
		this.break(1)

		///// Dokumen Sumber /////
		this.pdf.setFont('Helvetica', 'bold')
		this.write('DOKUMEN SUMBER:')
		this.pdf.setFont('Helvetica', 'normal')

		// LPPI
		this.pdf.addImage(this.checkbox.lppi, 'png', inds.chk, this.ln-3.5, 4, 4);
		this.write(`${this.lppi_label},`, inds.lbl2)
		this.write('Nomor:', inds.lbl3)
		this.write(this.txt.lppi, inds.val2)
		this.break()

		// LTPI
		this.pdf.addImage(this.checkbox.lpti, 'png', inds.chk, this.ln-3.5, 4, 4);
		this.write(`${this.lpti_label},`, inds.lbl2)
		this.write('Nomor:', inds.lbl3)
		this.write(this.txt.lpti, inds.val2)
		this.break()

		// NPI
		this.pdf.addImage(this.checkbox.npi, 'png', inds.chk, this.ln-3.5, 4, 4);
		this.write(`${this.npi_label},`, inds.lbl2)
		this.write('Nomor:', inds.lbl3)
		this.write(this.txt.npi, inds.val2)
		this.break(2)

		///// Analisis /////
		// Ikhtisar informasi
		let y_rect_ikhtisar = this.ln - 4
		this.pdf.setFont('Helvetica', 'bold')
		this.write('IKHTISAR INFORMASI', 105, this.ln, 'center')
		this.pdf.setFont('Helvetica', 'normal')
		this.pdf.rect(this.left_margin, y_rect_ikhtisar, 190, 5, 'D');
		this.break(1)

		let infos = this.txt.informasi.split('\n') 
		infos.forEach(info => {
			this.write(info, inds.num, undefined, undefined, 5)
			this.break(.5)
		})
		let h_rect_ikhtisar = this.ln - y_rect_ikhtisar
		this.pdf.rect(this.left_margin, y_rect_ikhtisar, 190, h_rect_ikhtisar, 'D')
		this.break(1)

		// Prosedur
		let y_rect_prosedur = this.ln - 4
		this.pdf.setFont('Helvetica', 'bold')
		this.write('PROSEDUR ANALISIS', 105, this.ln, 'center')
		this.pdf.setFont('Helvetica', 'normal')
		this.pdf.rect(this.left_margin, y_rect_prosedur, 190, 5, 'D');
		this.break(1)

		this.write(this.txt.prosedur, inds.num, undefined, undefined, 5)
		this.break(.25)
		let h_rect_prosedur = this.ln - y_rect_prosedur
		this.pdf.rect(this.left_margin, y_rect_prosedur, 190, h_rect_prosedur, 'D')
		this.break(1)

		// Hasil
		let y_rect_hasil = this.ln - 4
		this.pdf.setFont('Helvetica', 'bold')
		this.write('HASIL ANALISIS', 105, this.ln, 'center')
		this.pdf.setFont('Helvetica', 'normal')
		this.pdf.rect(this.left_margin, y_rect_hasil, 190, 5, 'D');
		this.break(1)

		this.write(this.txt.hasil, inds.num, undefined, undefined, 5)
		this.break(.25)
		let h_rect_hasil = this.ln - y_rect_hasil
		this.pdf.rect(this.left_margin, y_rect_hasil, 190, h_rect_hasil, 'D')
		this.break(1)

		// Kesimpulan
		let y_rect_kesimpulan = this.ln - 4
		this.pdf.setFont('Helvetica', 'bold')
		this.write('KESIMPULAN', 105, this.ln, 'center')
		this.pdf.setFont('Helvetica', 'normal')
		this.pdf.rect(this.left_margin, y_rect_kesimpulan, 190, 5, 'D');
		this.break(1)

		this.write(this.txt.kesimpulan, inds.num, undefined, undefined, 5)
		this.break(.25)
		let h_rect_kesimpulan = this.ln - y_rect_kesimpulan
		this.pdf.rect(this.left_margin, y_rect_kesimpulan, 190, h_rect_kesimpulan, 'D')
		this.break(1)

		///// Rekomendasi /////
		this.pdf.setFont('Helvetica', 'bold')
		this.write('REKOMENDASI:')
		this.pdf.setFont('Helvetica', 'normal')

		// NHI
		this.pdf.addImage(this.checkbox.nhi, 'png', inds.chk, this.ln-3.5, 4, 4);
		this.write(this.nhi_label, inds.lbl2)
		this.break(.5)

		// NI
		this.pdf.addImage(this.checkbox.ni, 'png', inds.chk, this.ln-3.5, 4, 4);
		this.write(this.ni_label, inds.lbl2)
		this.break(.5)

		// Rekomendasi
		this.pdf.addImage(this.checkbox.rekomendasi, 'png', inds.chk, this.ln-3.5, 4, 4);
		this.write(`${this.txt.label_rekomendasi}:`, inds.lbl2)

		let y_rect_rekomendasi = this.ln - 4
		this.write(this.txt.rekomendasi, inds.val3, undefined, undefined, 5)
		this.break(.5)
		let h_rect_rekomendasi = this.ln - y_rect_rekomendasi - 4
		this.pdf.rect(inds.rct, y_rect_rekomendasi, 105, h_rect_rekomendasi)
		this.break()

		// Informasi
		if (this.lkai_type == 'lkai') {
			this.pdf.addImage(this.checkbox.informasi_lain, 'png', inds.chk, this.ln-3.5, 4, 4);
			this.write('Informasi Lainnya:', inds.lbl2)

			let y_rect_informasi_lain = this.ln - 4
			this.write(this.txt.informasi_lain, inds.val3, undefined, undefined, 5)
			this.break(.5)
			let h_rect_informasi_lain = this.ln - y_rect_informasi_lain - 4
			this.pdf.rect(inds.rct, y_rect_informasi_lain, 105, h_rect_informasi_lain)
			this.break(.5)
		}

		// Tujuan
		this.pdf.setFont('Helvetica', 'bold')
		this.write('TUJUAN:')
		this.pdf.setFont('Helvetica', 'normal')
		this.write(this.txt.tujuan, inds.val1)
		this.break(1)

		// Analis
		this.pdf.setFont('Helvetica', 'bold')
		this.write('Analis,')
		this.pdf.setFont('Helvetica', 'normal')
		this.break(4)
		this.write(this.txt.analis)

		///// TTD /////
		this.pdf.addPage()
		this.ln = 20
		this.generateTtd(
			this.data.petugas.pejabat, 
			this.data.keputusan_pejabat,
			this.data.catatan_pejabat,
			this.data.tanggal_terima_pejabat,
		)
		this.ln += this.font_height*4
		this.generateTtd(
			this.data.petugas.atasan,
			this.data.keputusan_atasan,
			this.data.catatan_atasan,
			this.data.tanggal_terima_atasan,
		)

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
		this.write(txt_jabatan, 105, this.ln, 'center')
		this.pdf.rect(this.left_margin, this.ln-5, 190, 7)
		this.ln += 8
		
		this.write('Keputusan:', inds.num)
		this.pdf.setFont('Helvetica', 'normal')
		let checkbox_y = keputusan == true ? this.checked_checkbox : this.empty_checkbox
		let checkbox_n = keputusan == true ? this.empty_checkbox : this.checked_checkbox
		this.pdf.addImage(checkbox_y, 'png', inds.lbl2, this.ln-3.5, 4, 4)
		this.write('Setuju', inds.lbl2+5)
		this.pdf.addImage(checkbox_n, 'png', inds.lbl2+30, this.ln-3.5, 4, 4)
		this.write('Tidak Setuju', inds.lbl2+35)
		let y_rect_checkbox = this.ln-6
		let h_rect_checkbox = 9
		this.pdf.rect(this.left_margin, y_rect_checkbox, 40, h_rect_checkbox)
		this.pdf.rect(this.left_margin+40, y_rect_checkbox, 150, h_rect_checkbox)
		this.ln += 9

		this.pdf.setFont('Helvetica', 'bold')
		this.write('Catatan:', inds.num)
		this.pdf.setFont('Helvetica', 'normal')
		let txt_ctt = catatan || '-'
		let y_rect_catatan = this.ln-6
		this.write(txt_ctt, inds.lbl2, undefined, undefined, 5)
		this.break()
		let h_rect_catatan = this.ln - y_rect_catatan
		this.pdf.rect(this.left_margin, y_rect_catatan, 40, h_rect_catatan)
		this.pdf.rect(this.left_margin+40, y_rect_catatan, 150, h_rect_catatan)
		this.break(.5)

		let txt_tgl_terima = tanggal_terima || '-'
		this.pdf.text(`Hasil analisis diterima tanggal: ${txt_tgl_terima}`, inds.num, this.ln)
		this.pdf.rect(this.left_margin, this.ln-6, 190, 9)
		this.ln += 9

		this.pdf.setFont('Helvetica', 'bold')
		this.pdf.text('Tanda tangan:', inds.num, this.ln)
		this.pdf.setFont('Helvetica', 'normal')
		let y_rect_pejabat = this.ln-6
		this.ln += this.font_height*4
		let h_rect_pejabat = this.font_height*5+5
		let txt_pejabat = data_pejabat.name || '...................'
		this.pdf.text(txt_pejabat, inds.lbl2, this.ln)
		this.pdf.rect(this.left_margin, y_rect_pejabat, 40, h_rect_pejabat)
		this.pdf.rect(this.left_margin+40, y_rect_pejabat, 150, h_rect_pejabat)
	}
}

export default PdfLkai