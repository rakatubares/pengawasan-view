import PdfLphp from "./PdfLphp";

class PdfLphpN extends PdfLphp
{
	constructor(data)
	{
		super(
			data,
			'LAPORAN PENENTUAN HASIL PENINDAKAN NPP',
			'LPTP-N'
		)
	}
}

export default PdfLphpN