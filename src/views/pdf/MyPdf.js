import jsPDF from "jspdf"
import 'jspdf-autotable'

import converters from "../../helpers/converter"

const left_margin = 10

class MyPdf {
	constructor(
		data,
		jenis_dok,
		ln=50, 
		font_height=4, 
		font_size=10, 
		page_height=297,
		page_width=210,
		start_line=83, 
		end_line=127,
		inds={}
	)
	{
		this.pdf = new jsPDF('p', 'mm', [page_height, page_width])
		this.data = data
		this.jenis_dok = jenis_dok
		this.font_height = font_height
		this.font_size = font_size
		this.page_height = page_height
		this.page_width = page_width
		this.left_margin = left_margin
		this.title_line = {
			start: start_line,
			end: end_line
		}
		this.ln = ln
		this.break_height = this.font_height
		this.inds = inds
		this.converters = converters
	}

	generatePdf()
	{
		this.generateText()
		this.writeText()
		this.paintWatermark()
		return this.ouputFile()
	}

	write(txt, x=left_margin, y=this.ln, align='justify', right_limit=0)
	{
		let options = this.setOptions(align, x, right_limit)
		this.pdf.text(txt, x, y, options)
		this.setBreak(txt, options)
	}

	break(additional=0, reset=false) {
		let break_height = reset ? this.font_height : this.break_height
		this.ln += break_height
		this.ln += this.font_height*additional
		this.break_height = this.font_height
	}

	setOptions(align, x, right_limit)
	{
		if (align == 'center') {
			var maxWidth = 200
		} else {
			var maxWidth = 200 - x - right_limit
		}
		
		return {align: align, maxWidth: maxWidth}
	}

	setBreak(txt, options)
	{
		let dim = this.pdf.getTextDimensions(txt, options)
		let break_height = this.roundUp(dim.h, 1)
		if (this.break_height < break_height) {
			this.break_height = break_height
		}
	}

	roundUp(num, precision) 
	{
		precision = Math.pow(10, precision)
		return Math.ceil(num * precision) / precision
	}

	/**
	 * Generate kop surat
	 */
	createHeader() 
	{
		// Logo
		var image = new Image()
		image.src = "form/logo-kemenkeu.png"
		this.pdf.addImage(image, 'png', 15, 7.5, (233/8), (216/8));

		// Identitas Kantor
		this.pdf.setFont('Helvetica', 'bold')
		this.pdf.setFontSize('13')
		this.pdf.text("KEMENTERIAN KEUANGAN REPUBLIK INDONESIA", 125, 10, "center");
		this.pdf.setFontSize('11')
		this.pdf.text("DIREKTORAT JENDERAL BEA DAN CUKAI", 125, 15, "center");
		this.pdf.setFontSize('13')
		this.pdf.text(["KANTOR PELAYANAN UTAMA BEA DAN CUKAI TIPE C", "SOEKARNO-HATTA"], 125, 20, "center")
		this.pdf.setFont('Helvetica', 'normal')
		this.pdf.setFontSize('7')
		this.pdf.text(
			[
				'AREA KARGO BANDARA SOEKARNO-HATTA, TANGERANG, BANTEN KODE POS 15126; CALL CENTER: 1500225 (BRAVO BC)',
				'EMAIL: BCKPUSOETTA@CUSTOMS.GO.ID; WEBSITE: WWW.BCSOEKARNOHATTA.BEACUKAI.GO.ID;',
				'FACEBOOK: BEA CUKAI SOEKARNO HATTA; LAYANAN INFORMASI: PLI_SH@CUSTOMS.GO.ID; INSTAGRAM: @BCSOETTA;',
				'TWITTER: @BCSOETTA; PENGADUAN MASYARAKAT: WWW.BEACUKAI.GO.ID/PENGADUAN.HTML'
			], 
			125, 30, "center"
		)

		// Underline
		this.pdf.line(10,41,200,41)
	}

	/**
	 * Generate penomoran
	 * 
	 * @param {String} doc_title 
	 * @param {String} doc_no 
	 */
	createNomor(doc_title, doc_no=null)
	{
		this.pdf.setFont('Helvetica', 'bold')
		this.pdf.setFontSize(this.font_size)

		let center = this.page_width/2
		if (Array.isArray(doc_title)) {
			console.log('MY PDF - TITEL - IS ARRAY', doc_title)
			doc_title.forEach(txt => {
				this.write(txt, center, this.ln, 'center')	
				let dim = this.pdf.getTextDimensions(txt)
				this.pdf.line(center-(dim.w/2)-1, this.ln+0.5, center+(dim.w/2)+1, this.ln+0.5)
				this.break()
			});
		} else {
			console.log('MY PDF - TITEL - NOT ARRAY', doc_title)
			this.write(doc_title, center, this.ln, 'center')
			let dim = this.pdf.getTextDimensions(doc_title)
			this.pdf.line(center-(dim.w/2)-1, this.ln+0.5, center+(dim.w/2)+1, this.ln+0.5)
			this.break()
		}

		this.pdf.setFont('Helvetica', 'normal')
		this.ln += this.font_height
		
		if (doc_no != null) {
			this.pdf.text(doc_no, center, this.ln, 'center')
			this.ln += this.font_height*2	
		}
	}

	prepareDocDate(tgl_dok) 
	{
		this.tgl_dok = converters.date(tgl_dok, 'DD-MM-YYYY')
		this.full_tgl_dok = this.tgl_dok != null ? converters.fullDate(this.tgl_dok) : ''
		this.hr = this.tgl_dok != null ? converters.weekDay(this.tgl_dok) : ''
		this.tgl = this.tgl_dok != null ? converters.numTerbilang(this.tgl_dok.getDate()) : ''
		this.bln = this.tgl_dok != null ? converters.monthName(this.tgl_dok) : ''
		this.thn = this.tgl_dok != null ? converters.numTerbilang(this.tgl_dok.getFullYear()) : ''
	}

	ttd(x, jabatan, tipe_ttd, nama, breaks=5)
	{
		this.write(tipe_ttd, x-7)
		this.write(jabatan, x)
		this.break(breaks, true)
		this.write(nama, x)
	}
	
	cc(ccs)
	{
		this.write('Tembusan:')
		this.break()
		for (let i = 0; i < ccs.length; i++) {
			this.write(`${i+1}. ${ccs[i]}`)
			this.break()
		}
	}

	headerLampiran(ind_lamp=130) {
		this.ln = 10
		this.pdf.setFontSize(this.font_size)
		this.write('LAMPIRAN', ind_lamp)
		this.break()
		this.pdf.setFontSize(this.font_size - 2)
		this.write(this.jenis_dok, ind_lamp)
		this.break()
		this.write(`Nomor`, ind_lamp)
		this.write(`:`, ind_lamp+12)
		this.write(this.data.no_dok_lengkap, ind_lamp+15)
		this.break()
		this.write(`Tanggal`, ind_lamp)
		this.write(`:`, ind_lamp+12)
		this.write(this.full_tgl_dok, ind_lamp+15)
		this.break(2)
		this.pdf.setFontSize(this.font_size)
	}

	tabelBarang(items, withDetails=false) {
		const tabelData = converters.item_barang(items, withDetails)
		const tabelHead = [
			{header: 'No', dataKey: 'no'},
			{header: 'Uraian Barang', dataKey: 'uraian'},
			{header: 'Jumlah', dataKey: 'jumlah'},
		]
	
		let height = 0;
		let tableMeta = null;
		this.pdf.autoTable({
			columns: tabelHead,
			body: tabelData,
			margin: {top: this.ln},
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
				1: {minCellWidth: 50},
				2: {
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

		height = tableMeta.finalY
		return height
	}

	paintWatermark()
	{
		if (['draft'].includes(this.data.kode_status)) {
			this.watermark()
		}
	}

	watermark() 
	{
		var totalPages = this.pdf.internal.getNumberOfPages();
	
		for (let i = 1; i <= totalPages; i++) {
			this.pdf.setPage(i);
			this.pdf.saveGraphicsState()
			this.pdf.setGState(new this.pdf.GState({opacity: 0.2}))
			this.pdf.setFont('Helvetica', 'bold')
			this.pdf.setTextColor('E02401')
			this.pdf.setFontSize('200')
			this.pdf.text('DRAFT', 75, 270, { angle: 60 })
			this.pdf.restoreGraphicsState()
		}
	}

	ouputFile() 
	{
		return this.pdf.output('datauristring')
	}
}

export default MyPdf