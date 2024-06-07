import PdfLptp from "./PdfLptp";

class PdfSbpN extends PdfLptp
{
	constructor(data)
	{
		super(
			data,
			'LAPORAN PELAKSANAAN TUGAS PENINDAKAN NPP',
		)
	}
}

export default PdfSbpN