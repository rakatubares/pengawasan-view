import converters from "../../helpers/converter";
import Pdf from "./PdfMain"

const ind_start = 10

const props = {
	font: {
		size: 10,
		height: 4
	},
	title_line: {
		start: 57,
		end: 153
	},
	ind: {
		sta: ind_start,
		cln1: ind_start+15,
		val1: ind_start+20,
		chk: ind_start+40,
		lbl2: ind_start+47,
		cln2: ind_start+80,
		val2: ind_start+85,
		txt: ind_start+30,
		lbl_tgl_dis: ind_start+120,
		txt_tgl_dis: ind_start+150,
		ttd:125,
		lamp: 140
	}
}

class PdfLppi extends Pdf {
	constructor(data) {
		super(props);
		this.jenis_dok = 'LEMBAR PENGUMPULAN DAN PENILAIAN INFORMASI'
		this.data = data
		this.lppi = this.data.dokumen.lppi
		this.prepareDocDate(this.lppi.tanggal_dokumen)
	}

	generatePdf() {
		var empty_checkbox = new Image()
		empty_checkbox.src = 'form/checkbox-unchecked.png'
		var checked_checkbox = new Image()
		checked_checkbox.src = 'form/checkbox-checked.png'

		this.createHeader()
		this.createNomor(this.jenis_dok, '')

		// No & tanggal
		this.pdf.text('Nomor', this.props.ind.sta, this.ln)
		this.pdf.text(':', this.props.ind.cln1, this.ln)
		this.pdf.text(this.lppi.no_dok_lengkap, this.props.ind.val1, this.ln)
		this.ln += this.props.font.height

		this.pdf.text('Tanggal', this.props.ind.sta, this.ln)
		this.pdf.text(':', this.props.ind.cln1, this.ln)
		this.pdf.text(this.full_tgl_dok, this.props.ind.val1, this.ln)
		this.ln += this.props.font.height*2

		///// Sumber informasi /////
		// Internal
		this.pdf.setFont('Helvetica', 'bold')
		this.pdf.text('SUMBER INFORMASI:', this.props.ind.sta, this.ln)
		this.pdf.setFont('Helvetica', 'normal')
		let checkbox_internal = this.lppi.flag_info_internal == true ? checked_checkbox : empty_checkbox
		this.pdf.addImage(checkbox_internal, 'png', this.props.ind.chk, this.ln-4, 5, 5);
		this.pdf.text('Internal', this.props.ind.lbl2, this.ln)
		let y_rect_internal = this.ln+3
		this.ln += this.props.font.height*2
		this.pdf.text('Media', this.props.ind.lbl2, this.ln)
		this.pdf.text(':', this.props.ind.cln2, this.ln)
		let txt_media_internal = this.lppi.media_info_internal != null ? this.lppi.media_info_internal : '-'
		this.pdf.text(txt_media_internal, this.props.ind.val2, this.ln)
		this.ln += this.props.font.height
		this.pdf.text('Tanggal terima', this.props.ind.lbl2, this.ln)
		this.pdf.text(':', this.props.ind.cln2, this.ln)
		let txt_tgl_terima_internal = this.lppi.tgl_terima_info_internal != null ? this.lppi.tgl_terima_info_internal : '-'
		this.pdf.text(txt_tgl_terima_internal, this.props.ind.val2, this.ln)
		this.ln += this.props.font.height
		this.pdf.text('No. Dokumen', this.props.ind.lbl2, this.ln)
		this.pdf.text(':', this.props.ind.cln2, this.ln)
		let txt_no_dok_internal = this.lppi.no_dok_info_internal != null ? this.lppi.no_dok_info_internal : '-'
		this.pdf.text(txt_no_dok_internal, this.props.ind.val2, this.ln)
		this.ln += this.props.font.height
		this.pdf.text('Tanggal', this.props.ind.lbl2, this.ln)
		this.pdf.text(':', this.props.ind.cln2, this.ln)
		let txt_tgl_dok_internal = this.lppi.tgl_dok_info_internal != null ? this.lppi.tgl_dok_info_internal : '-'
		this.pdf.text(txt_tgl_dok_internal, this.props.ind.val2, this.ln)
		let h_rect_internal = this.ln - y_rect_internal + 2
		this.pdf.rect(this.props.ind.lbl2-2, y_rect_internal, 140, h_rect_internal, 'D');
		this.ln += this.props.font.height*2

		// Eksternal
		let checkbox_eksternal = this.lppi.flag_info_eksternal == true ? checked_checkbox : empty_checkbox
		this.pdf.addImage(checkbox_eksternal, 'png', this.props.ind.chk, this.ln-4, 5, 5)
		this.pdf.text('Eksternal', this.props.ind.lbl2, this.ln)
		let y_rect_eksternal = this.ln+3
		this.ln += this.props.font.height*2
		this.pdf.text('Media', this.props.ind.lbl2, this.ln)
		this.pdf.text(':', this.props.ind.cln2, this.ln)
		let txt_media_eksternal = this.lppi.media_info_eksternal != null ? this.lppi.media_info_eksternal : '-'
		this.pdf.text(txt_media_eksternal, this.props.ind.val2, this.ln)
		this.ln += this.props.font.height
		this.pdf.text('Tanggal terima', this.props.ind.lbl2, this.ln)
		this.pdf.text(':', this.props.ind.cln2, this.ln)
		let txt_tgl_terima_eksternal = this.lppi.tgl_terima_info_eksternal != null ? this.lppi.tgl_terima_info_eksternal : '-'
		this.pdf.text(txt_tgl_terima_eksternal, this.props.ind.val2, this.ln)
		this.ln += this.props.font.height
		this.pdf.text('No. Dokumen', this.props.ind.lbl2, this.ln)
		this.pdf.text(':', this.props.ind.cln2, this.ln)
		let txt_no_dok_eksternal = this.lppi.no_dok_info_eksternal != null ? this.lppi.no_dok_info_eksternal : '-'
		this.pdf.text(txt_no_dok_eksternal, this.props.ind.val2, this.ln)
		this.ln += this.props.font.height
		this.pdf.text('Tanggal', this.props.ind.lbl2, this.ln)
		this.pdf.text(':', this.props.ind.cln2, this.ln)
		let txt_tgl_dok_eksternal = this.lppi.tgl_dok_info_eksternal != null ? this.lppi.tgl_dok_info_eksternal : '-'
		this.pdf.text(txt_tgl_dok_eksternal, this.props.ind.val2, this.ln)
		let h_rect_eksternal = this.ln - y_rect_eksternal + 2
		this.pdf.rect(this.props.ind.lbl2-2, y_rect_eksternal, 140, h_rect_eksternal, 'D');
		this.ln += this.props.font.height*2

		///// Ikhtisar /////
		// Tabel ikhtisar
		let ikhtisar = []
		for (let i = 0; i < this.lppi.ikhtisar.length; i++) {
			let data = {
				no: i+1,
				ikhtisar: this.lppi.ikhtisar[i]['ikhtisar'],
				sumber: this.lppi.ikhtisar[i]['kode_kepercayaan'],
				validitas: this.lppi.ikhtisar[i]['kode_validitas'],
			}
			ikhtisar.push(data)
		}
		const tabelData = ikhtisar
		let txt_nama_penerima = this.lppi.penerima_info != null ? this.lppi.penerima_info.name : '-'
		let txt_nama_penilai = this.lppi.penilai_info != null ? this.lppi.penilai_info.name : '-'
		tabelData.push([
			{content: ''},
			{content: `Penerima Informasi\n\n\n\n${txt_nama_penerima}`},
			{content: `Penilai Informasi\n\n\n\n${txt_nama_penilai}`, colSpan: 2, styles: {halign: 'left'}}
		])

		const tabelHead = [
			{header: 'NO', dataKey: 'no'},
			{header: 'IKHTISAR INFORMASI', dataKey: 'ikhtisar'},
			{header: 'SUMBER', dataKey: 'sumber'},
			{header: 'VALIDITAS', dataKey: 'validitas'},
		]

		let table_height = 0;
		let tableMeta = null;
		this.pdf.autoTable({
			columns: tabelHead,
			body: tabelData,
			margin: {top: this.ln},
			theme: 'grid',
			styles: {
				fontSize: this.props.font.size,
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
				1: {minCellWidth: 50},
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
		this.ln = Math.ceil(table_height) + (this.props.font.height*2)

		// Kesimpulan
		this.pdf.setLineWidth(0.25)
		this.pdf.setDrawColor(0, 0, 0);
		this.pdf.setFont('Helvetica', 'bold')
		this.pdf.text('KESIMPULAN', this.props.ind.sta, this.ln)
		this.pdf.setFont('Helvetica', 'normal')
		let txt_kesimpulan = this.lppi.kesimpulan != null ? this.lppi.kesimpulan : '-'
		let arr_kesimpulan = converters.array_text(txt_kesimpulan, 90)
		this.pdf.text(arr_kesimpulan, this.props.ind.txt, this.ln)
		let h_rect_kesimpulan = arr_kesimpulan.length*this.props.font.height+4
		this.pdf.rect(this.props.ind.txt-2, this.ln-5, 157, h_rect_kesimpulan, 'D');
		this.ln += this.props.font.height*(arr_kesimpulan.length+1.5)

		// Disposisi
		this.pdf.text('Disposisi Kepada:', this.props.ind.sta, this.ln)
		this.pdf.text(this.lppi.disposisi.name, this.props.ind.txt, this.ln)
		this.pdf.text('Tanggal Disposisi:', this.props.ind.lbl_tgl_dis, this.ln)
		let txt_tanggal_disposisi = this.lppi.tanggal_disposisi != null ? this.lppi.tanggal_disposisi : ''
		this.pdf.text(txt_tanggal_disposisi, this.props.ind.txt_tgl_dis, this.ln)
		this.ln += this.props.font.height*1.5

		// Tindak lanjut
		this.pdf.setFont('Helvetica', 'bold')
		this.pdf.text('TINDAK LANJUT:', this.props.ind.sta, this.ln)
		this.pdf.setFont('Helvetica', 'normal')
		let checkbox_analisis = this.lppi.flag_analisis == true ? checked_checkbox : empty_checkbox
		this.pdf.addImage(checkbox_analisis, 'png', this.props.ind.txt, this.ln-3.5, 4, 4)
		this.pdf.text('Analisis', this.props.ind.txt+5, this.ln)
		this.ln += this.props.font.height
		let checkbox_arsip = this.lppi.flag_arsip == true ? checked_checkbox : empty_checkbox
		this.pdf.addImage(checkbox_arsip, 'png', this.props.ind.txt, this.ln-3.5, 4, 4)
		this.pdf.text('Arsip', this.props.ind.txt+5, this.ln)
		this.ln += this.props.font.height*2.5

		// Catatan
		this.pdf.setFont('Helvetica', 'bold')
		this.pdf.text('CATATAN', this.props.ind.sta, this.ln)
		this.pdf.setFont('Helvetica', 'normal')
		let txt_catatan = this.lppi.catatan != null ? this.lppi.catatan : '-'
		let arr_catatan = converters.array_text(txt_catatan, 90)
		this.pdf.text(arr_catatan, this.props.ind.txt, this.ln)
		let h_rect_catatan = arr_catatan.length*this.props.font.height+4
		this.pdf.rect(this.props.ind.txt-2, this.ln-5, 157, h_rect_catatan, 'D');
		this.ln += this.props.font.height*(arr_catatan.length+2)

		// TTD
		let txt_jabatan = this.lppi.pejabat.plh == true 
			? `Plh. ${this.lppi.pejabat.jabatan.jabatan}` 
			: this.lppi.pejabat.jabatan.jabatan
		this.pdf.text(txt_jabatan, this.props.ind.sta, this.ln)
		this.ln += this.props.font.height*5
		this.pdf.text(this.lppi.pejabat.user.name, this.props.ind.sta, this.ln)

		////// WATERMARK //////
		if ([100].includes(this.lppi.kode_status)) {
			this.watermark()
		}

		return this.pdf.output('datauristring')
	}
}

export default PdfLppi