import converters from '../helpers/converter.js'

let pdf = {}

pdf.header = (doc) => {
	// Logo
	var image = new Image()
	image.src = "form/logo-kemenkeu.png"
	doc.addImage(image, 'png', 15, 7.5, (233/8), (216/8));

	// Identitas Kantor
	doc.setFont('Helvetica', 'bold')
	doc.setFontSize('13')
	doc.text("KEMENTERIAN KEUANGAN REPUBLIK INDONESIA", 125, 10, "center");
	doc.setFontSize('11')
	doc.text("DIREKTORAT JENDERAL BEA DAN CUKAI", 125, 15, "center");
	doc.setFontSize('13')
	doc.text(["KANTOR PELAYANAN UTAMA BEA DAN CUKAI TIPE C", "SOEKARNO-HATTA"], 125, 20, "center")
	doc.setFont('Helvetica', 'normal')
	doc.setFontSize('7')
	doc.text(
		[
			'AREA KARGO BANDARA SOEKARNO-HATTA, TANGERANG, BANTEN KODE POS 15126; CALL CENTER: 1500225 (BRAVO BC)',
			'EMAIL: BCKPUSOETTA@CUSTOMS.GO.ID; WEBSITE: WWW.BCSOEKARNOHATTA.BEACUKAI.GO.ID;',
			'FACEBOOK: BEA CUKAI SOEKARNO HATTA; LAYANAN INFORMASI: PLI_SH@CUSTOMS.GO.ID; INSTAGRAM: @BCSOETTA;',
			'TWITTER: @BCSOETTA; PENGADUAN MASYARAKAT: WWW.BEACUKAI.GO.ID/PENGADUAN.HTML'
		], 
		125, 30, "center"
	)

	// Underline
	doc.line(10,41,200,41)

	return doc
}

pdf.nomor = (doc, font_size, font_height, line_start, line_end, doc_title, doc_no) => {
	doc.setFont('Helvetica', 'bold')
	doc.setFontSize(font_size)
	let ln = 50

	doc.text(doc_title, 105, ln, 'center')
	doc.line(line_start, ln+0.5, line_end, ln+0.5)
	
	doc.setFont('Helvetica', 'normal')
	ln += font_height
	
	doc.text(doc_no, 105, ln, 'center')
	ln += font_height*2

	return [doc, ln]
}

pdf.detail_sarkut = (doc, data_sarkut, ln, font_height, indents) => {
	let data = converters.sarkut(data_sarkut)

	doc.setFont('Helvetica', 'bold')
	doc.text('a.', indents.alp, ln)
	doc.text('Sarana pengangkut* :', indents.lbl, ln)
	ln += font_height

	doc.setFont('Helvetica', 'normal')
	doc.text('Nama dan Jenis Sarkut', indents.lbl, ln)
	doc.text(':', indents.cln, ln)
	doc.text(data.nama, indents.txt, ln)
	ln += font_height

	doc.text('No. Voy / Penerbangan / Trayek*', indents.lbl, ln)
	doc.text(':', indents.cln, ln)
	doc.text(data.flight, indents.txt, ln)
	ln += font_height

	doc.text('Ukuran / Kapasitas Muatan', indents.lbl, ln)
	doc.text(':', indents.cln, ln)
	doc.text(data.kapasitas, indents.txt, ln)
	ln += font_height

	doc.text('Nahkoda / Pilot / Pengemudi*', indents.lbl, ln)
	doc.text(':', indents.cln, ln)
	doc.text(data.pilot, indents.txt, ln)
	ln += font_height

	doc.text('Bendera*', indents.lbl, ln)
	doc.text(':', indents.cln, ln)
	doc.text(data.bendera, indents.txt, ln)
	ln += font_height

	doc.text('Nomor Register / Polisi', indents.lbl, ln)
	doc.text(':', indents.cln, ln)
	doc.text(data.no_reg, indents.txt, ln)
	ln += font_height

	return [doc, ln]
}

pdf.detail_barang = (doc, data_barang, item_barang, ln, font_height, indents) => {
	let data = converters.barang(data_barang)

	doc.setFont('Helvetica', 'bold')
	doc.text('b.', indents.alp, ln)
	doc.text('Barang* :', indents.lbl, ln)
	ln += font_height

	doc.setFont('Helvetica', 'normal')
	doc.text(['Jumlah / Jenis / Ukuran Nomor', 'Peti Kemas / Kemasan'], indents.lbl, ln)
	ln += font_height
	doc.text(':', indents.cln, ln)
	doc.text(data.kemasan, indents.txt, ln)
	ln += font_height

	doc.text('Jumlah / Jenis Barang', indents.lbl, ln)
	doc.text(':', indents.cln, ln)
	let barang = (item_barang != null)
		? (item_barang.length > 0) 
			? (item_barang.length == 1)
				? item_barang[0]['jumlah_barang'] + ' '
					+ item_barang[0]['satuan_barang'] + ' '
					+ item_barang[0]['uraian_barang']
				: 'LIHAT LAMPIRAN'
			: ''
		: ''
	doc.text(barang, indents.txt, ln)
	ln += font_height

	doc.text('Jenis / Nomor dan Tgl Dokumen', indents.lbl, ln)
	doc.text(':', indents.cln, ln)
	doc.text(data.dokumen, indents.txt, ln)
	ln += font_height

	doc.text('Pemilik / Importir / Eksportir / Kuasa*', indents.lbl, ln)
	doc.text(':', indents.cln, ln)
	doc.text(data.pemilik, indents.txt, ln)
	ln += font_height

	return [doc, ln]
}

pdf.detail_bangunan = (doc, data_bangunan, ln, font_height, indents) => {
	let data = converters.bangunan(data_bangunan)

	doc.setFont('Helvetica', 'bold')
	doc.text('c.', indents.alp, ln)
	doc.text('Bangunan atau tempat* :', indents.lbl, ln)
	ln += font_height

	doc.setFont('Helvetica', 'normal')
	doc.text('Alamat', indents.lbl, ln)
	doc.text(':', indents.cln, ln)
	doc.text(data.alamat, indents.txt, ln)
	ln += font_height

	doc.text('No Reg Bangunan / NPPBKC / dll.', indents.lbl, ln)
	doc.text(':', indents.cln, ln)
	doc.text(data.no_reg, indents.txt, ln)
	ln += font_height

	doc.text('Nama Pemilik / Yang Menguasai*', indents.lbl, ln)
	doc.text(':', indents.cln, ln)
	doc.text(data.pemilik, indents.txt, ln)
	ln += font_height

	return [doc, ln]
}

pdf.header_lampiran = (doc, tipe_dok, no_dok, tgl_dok, font_size, font_height, ln, indent) => {
	doc.setFontSize(font_size)
	doc.text('LAMPIRAN', indent, ln)
	ln += font_height
	doc.setFontSize(font_size - 2)
	doc.text(tipe_dok, indent, ln)
	ln += font_height
	doc.text('Nomor : ' + no_dok, indent, ln)
	ln += font_height
	doc.text('Tanggal : ' + tgl_dok, indent, ln)
	ln += font_height*3

	return [doc, ln]
}

pdf.tabel_barang = (doc, data, ln, font_size) => {
	const tabelHead = [
		{header: 'No', dataKey: 'no'},
		{header: 'Uraian Barang', dataKey: 'uraian'},
		{header: 'Jumlah', dataKey: 'jumlah'},
	]

	doc.autoTable({
		columns: tabelHead,
		body: data,
		margin: {top: ln},
		theme: 'grid',
		styles: {
			fontSize: font_size,
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
	})

	return doc
}

pdf.watermark = (doc) => {
	var totalPages = doc.internal.getNumberOfPages();

	for (let i = 1; i <= totalPages; i++) {
		doc.setPage(i);
		doc.saveGraphicsState()
		doc.setGState(new doc.GState({opacity: 0.2}))
		doc.setFont('Helvetica', 'bold')
		doc.setTextColor('E02401')
		doc.setFontSize('200')
		doc.text('DRAFT', 75, 270, { angle: 60 })
		doc.restoreGraphicsState()
	}

	return doc
}

export default pdf