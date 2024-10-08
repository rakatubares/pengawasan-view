import PdfLkai from "./PdfLkai";

class PdfLkaiN extends PdfLkai
{
    constructor(data)
    {
        super(
            data,
            'LEMBAR KERJA ANALISIS INTELIJEN NPP (LKAI-N)',
            'lkain',
            'LPPI-N',
            'NPI-N',
            'NHI-N',
            'NI-N',
        )
    }

    generateText() 
    {
        this.prepareDocDate(this.data.tanggal_dokumen)
        
        this.checkbox = {}
        this.checkbox.lppi = this.data.lppin_id != null ? this.checked_checkbox : this.empty_checkbox
        this.checkbox.npi = (
            (
                this.data.nomor_npin != null &&
                this.data.nomor_npin != ''
            ) ||
            this.data.tanggal_npin != null
        ) ? this.checked_checkbox : this.empty_checkbox
        this.checkbox.nhi = this.data.flag_rekom_nhin == 1 ? this.checked_checkbox : this.empty_checkbox
        this.checkbox.ni = this.data.flag_rekom_nin == 1 ? this.checked_checkbox : this.empty_checkbox
        this.checkbox.rekomendasi = this.data.rekomendasi_lain != null ? this.checked_checkbox : this.empty_checkbox

        this.txt = {}

        this.txt.lppi = this.converters.no_tanggal_dok(this.data.nomor_lppin, this.data.tanggal_lppin)
        this.txt.npi = this.converters.no_tanggal_dok(this.data.nomor_npin, this.data.tanggal_npin)

        this.txt.informasi = this.data.informasi != null ? this.data.informasi : '-'
        this.txt.prosedur = this.data.prosedur != null ? this.data.prosedur : '-'
        this.txt.hasil = this.data.hasil != null ? this.data.hasil : '-'
        this.txt.kesimpulan = this.data.kesimpulan != null ? this.data.kesimpulan : '-'

        this.txt.label_rekomendasi = 'Lainnya'
        this.txt.rekomendasi = this.data.rekomendasi_lain != null ? this.data.rekomendasi_lain : '-'

        this.txt.tujuan = this.data.tujuan || '-'

        this.txt.analis = this.data.petugas.analis ? this.data.petugas.analis.name : '-'
    }
}

export default PdfLkaiN