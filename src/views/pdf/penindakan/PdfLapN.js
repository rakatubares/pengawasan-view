import PdfLap from "./PdfLap";

class PdfLapN extends PdfLap
{
	constructor(data)
	{
		super(
			data,
			'LEMBAR ANALISIS PRA PENINDAKAN NPP',
			'NHI-N/Lainnya',
		)
	}
}

export default PdfLapN