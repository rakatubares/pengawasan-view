import PdfNi from './PdfNi'

class PdfNiN extends PdfNi
{
	constructor(data)
	{
		super(data, 'NOTA INFORMASI NPP', 'LKAI-N')
	}

	generateText()
	{
		this.prepareDocDate(this.data.tanggal_dokumen)
		this.txt = {}
		this.txt.tgl_lkai = this.converters.fullDate(this.data.tanggal_lkain)
		this.txt.nomor_lkai = this.data.nomor_lkain || ''
		this.txt.tujuan = `Yth. ${this.converters.string(this.data.tujuan)}`
		this.txt.uraian = this.data.uraian || ''
	}
}

export default PdfNiN