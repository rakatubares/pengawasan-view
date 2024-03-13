import Pdf from "../MyPdf";

const inds = {
	cln1: 25,
	val1: 30,
	chk: 50,
	lbl2: 57,
	cln2: 90,
	val2: 95,
	txt: 40,
	lbl_tgl_dis: 130,
	txt_tgl_dis: 160,
	ttd:125,
}

class PdfLppi extends Pdf
{
	constructor(
		data,
		title='LEMBAR PENGUMPULAN DAN PENILAIAN INFORMASI',
	)
	{
		super(data, title)
		this.empty_checkbox = new Image()
		this.empty_checkbox.src = 'form/checkbox-unchecked.png'
		this.checked_checkbox = new Image()
		this.checked_checkbox.src = 'form/checkbox-checked.png'
	}

	generateText() 
	{
		this.prepareDocDate(this.data.tanggal_dokumen)

		this.checkbox = {}
		this.checkbox.internal = this.data.flag_info_internal == true 
			? this.checked_checkbox 
			: this.empty_checkbox
		this.checkbox.eksternal = this.data.flag_info_eksternal == true 
			? this.checked_checkbox 
			: this.empty_checkbox
		this.checkbox.analisis = this.data.flag_analisis == true 
			? this.checked_checkbox 
			: this.empty_checkbox
		this.checkbox.arsip = this.data.flag_arsip == true 
			? this.checked_checkbox 
			: this.empty_checkbox

		this.txt = {}

		// Media Internal
		this.txt.media_internal = this.data.media_info_internal != null 
			? this.data.media_info_internal 
			: '-'
		this.txt.tgl_terima_internal = this.data.tgl_terima_info_internal != null 
			? this.data.tgl_terima_info_internal 
			: '-'
		this.txt.no_dok_internal = this.data.no_dok_info_internal != null 
			? this.data.no_dok_info_internal 
			: '-'
		this.txt.tgl_dok_internal = this.data.tgl_dok_info_internal != null 
			? this.data.tgl_dok_info_internal 
			: '-'

		// Media Eksternal
		this.txt.media_eksternal = this.data.media_info_eksternal != null 
			? this.data.media_info_eksternal 
			: '-'
		this.txt.tgl_terima_eksternal = this.data.tgl_terima_info_eksternal != null 
			? this.data.tgl_terima_info_eksternal 
			: '-'
		this.txt.no_dok_eksternal = this.data.no_dok_info_eksternal != null 
			? this.data.no_dok_info_eksternal 
			: '-'
		this.txt.tgl_dok_eksternal = this.data.tgl_dok_info_eksternal != null 
			? this.data.tgl_dok_info_eksternal 
			: '-'

		this.txt.kesimpulan = this.data.kesimpulan != null ? this.data.kesimpulan : '-'
		this.txt.tujuan_disposisi = this.data.petugas.penerima_disposisi
			? this.data.petugas.penerima_disposisi.name
			: '-'
		this.txt.tanggal_disposisi = this.data.tanggal_disposisi != null 
			? this.data.tanggal_disposisi 
			: '-'
		this.txt.catatan = this.data.catatan != null ? this.data.catatan : '-'
		this.txt.jabatan = this.data.petugas.pejabat
			? this.data.petugas.pejabat.txt_tipe_ttd + this.data.petugas.pejabat.jabatan
			: ''
		this.txt.nama_pejabat = this.data.petugas.pejabat
			? this.data.petugas.pejabat.name
			: ''
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

		///// Sumber informasi /////
		this.pdf.setFont('Helvetica', 'bold')
		this.write('SUMBER INFORMASI:')
		this.pdf.setFont('Helvetica', 'normal')

		// Internal
		this.pdf.addImage(this.checkbox.internal, 'png', inds.chk, this.ln-4, 5, 5);
		this.write('Internal', inds.lbl2)
		this.break(.5)
		let y_rect_internal = this.ln - this.font_height

		this.write('Media', inds.lbl2)
		this.write(':', inds.cln2)
		this.write(this.txt.media_internal, inds.val2)
		this.break()

		this.write('Tanggal terima', inds.lbl2)
		this.write(':', inds.cln2)
		this.write(this.txt.tgl_terima_internal, inds.val2)
		this.break()

		this.write('No. Dokumen', inds.lbl2)
		this.write(':', inds.cln2)
		this.write(this.txt.no_dok_internal, inds.val2)
		this.break()

		this.write('Tanggal', inds.lbl2)
		this.write(':', inds.cln2)
		this.write(this.txt.tgl_dok_internal, inds.val2)
		this.break(.5)

		let x_rect_internal = inds.lbl2-2
		let h_rect_internal = this.ln - y_rect_internal - this.font_height
		let w_rect_internal = this.page_width - x_rect_internal - this.left_margin
		this.pdf.rect(x_rect_internal, y_rect_internal, w_rect_internal, h_rect_internal, 'D')
		this.break(-.5)

		// Eksternal
		this.pdf.addImage(this.checkbox.eksternal, 'png', inds.chk, this.ln-4, 5, 5);
		this.write('Eksternal', inds.lbl2)
		this.break(.5)
		let y_rect_eksternal = this.ln - this.font_height
		
		this.write('Media', inds.lbl2)
		this.write(':', inds.cln2)
		this.write(this.txt.media_eksternal, inds.val2)
		this.break()

		this.write('Tanggal terima', inds.lbl2)
		this.write(':', inds.cln2)
		this.write(this.txt.tgl_terima_eksternal, inds.val2)
		this.break()

		this.write('No. Dokumen', inds.lbl2)
		this.write(':', inds.cln2)
		this.write(this.txt.no_dok_eksternal, inds.val2)
		this.break()

		this.write('Tanggal', inds.lbl2)
		this.write(':', inds.cln2)
		this.write(this.txt.tgl_dok_eksternal, inds.val2)
		this.break(.5)

		let x_rect_eksternal = inds.lbl2-2
		let h_rect_eksternal = this.ln - y_rect_eksternal - this.font_height
		let w_rect_eksternal = this.page_width - x_rect_eksternal - this.left_margin
		this.pdf.rect(x_rect_eksternal, y_rect_eksternal, w_rect_eksternal, h_rect_eksternal, 'D')

		///// Ikhtisar /////
		// Tabel ikhtisar
		let ikhtisar = []
		for (let i = 0; i < this.data.informasi.length; i++) {
			let data = {
				no: i+1,
				informasi: this.data.informasi[i]['informasi'],
				sumber: this.data.informasi[i]['kode_kepercayaan'],
				validitas: this.data.informasi[i]['kode_validitas'],
			}
			ikhtisar.push(data)
		}
		const tabelData = ikhtisar
		let penerima = this.data.petugas.penerima_informasi ?? null
		let penilai = this.data.petugas.penilai_informasi ?? null
		let txt_nama_penerima = penerima != null ? penerima.name : '-'
		let txt_nama_penilai = penilai != null ? penilai.name : '-'

		tabelData.push([
			{content: ''},
			{content: `Penerima Informasi\n\n\n\n${txt_nama_penerima}`},
			{content: `Penilai Informasi\n\n\n\n${txt_nama_penilai}`, colSpan: 2, styles: {halign: 'left'}}
		])

		const tabelHead = [
			{header: 'NO', dataKey: 'no'},
			{header: 'IKHTISAR INFORMASI', dataKey: 'informasi'},
			{header: 'SUMBER', dataKey: 'sumber'},
			{header: 'VALIDITAS', dataKey: 'validitas'},
		]

		let table_height = 0;
		let tableMeta = null;
		this.pdf.autoTable({
			columns: tabelHead,
			body: tabelData,
			margin: {
				top: this.ln, 
				left: this.left_margin,
				right: this.left_margin,
			},
			theme: 'grid',
			styles: {
				fontSize: this.font_size,
				textColor: 20,
				fillColor: null,
				lineWidth: 0.25,
				lineColor: 1,
			},
			headStyles: {
				halign: 'center'
			},
			columnStyles: {
				0: {
					cellWidth: 10,
					halign: 'center'
				},
				1: {minCellWidth: 130},
				2: {
					minCellWidth: 20,
					halign: 'center'
				},
				3: {
					minCellWidth: 20,
					halign: 'center'
				},
			},
			didParseCell: function (HookData) {
				if (!tableMeta) {
					tableMeta = HookData.table;
				}
			}
		})
		table_height = tableMeta.finalY
		this.ln = Math.ceil(table_height) + (this.font_height*2)

		// Kesimpulan
		this.pdf.setLineWidth(0.25)
		this.pdf.setDrawColor(0, 0, 0);
		this.pdf.setFont('Helvetica', 'bold')
		this.write('KESIMPULAN')
		this.pdf.setFont('Helvetica', 'normal')

		let y_rect_kesimpulan = this.ln - this.font_height
		this.write(this.txt.kesimpulan, inds.txt, undefined, undefined, 5)
		this.break(.5)

		let x_rect_kesimpulan = inds.txt-2
		let h_rect_kesimpulan = this.ln - y_rect_kesimpulan - this.font_height
		let w_rect_kesimpulan = this.page_width - x_rect_kesimpulan - 10
		this.pdf.rect(x_rect_kesimpulan, y_rect_kesimpulan, w_rect_kesimpulan, h_rect_kesimpulan, 'D')
		this.break()

		// Disposisi
		this.write('Disposisi Kepada:')
		this.write(this.txt.tujuan_disposisi, inds.txt)
		this.write('Tanggal Disposisi:', inds.lbl_tgl_dis)
		this.write(this.txt.tanggal_disposisi, inds.txt_tgl_dis)
		this.break(.5)

		// Tindak lanjut
		this.pdf.setFont('Helvetica', 'bold')
		this.write('TINDAK LANJUT:')
		this.pdf.setFont('Helvetica', 'normal')

		this.pdf.addImage(this.checkbox.analisis, 'png', inds.txt, this.ln-3.5, 4, 4)
		this.break(.25)

		this.pdf.addImage(this.checkbox.arsip, 'png', inds.txt, this.ln-3.5, 4, 4)
		this.break(1)

		// Catatan
		this.pdf.setFont('Helvetica', 'bold')
		this.write('CATATAN')
		this.pdf.setFont('Helvetica', 'normal')

		let y_rect_catatan = this.ln - this.font_height
		this.write(this.txt.catatan, inds.txt, undefined, undefined, 5)
		this.break(.5)

		let x_rect_catatan = inds.txt-2
		let h_rect_catatan = this.ln - y_rect_catatan - this.font_height
		let w_rect_catatan = this.page_width - x_rect_catatan - 10
		this.pdf.rect(x_rect_catatan, y_rect_catatan, w_rect_catatan, h_rect_catatan, 'D')
		this.break(1)

		// TTD
		this.write(this.txt.jabatan)
		this.break(5)
		this.write(this.txt.nama_pejabat)
	}
}

export default PdfLppi