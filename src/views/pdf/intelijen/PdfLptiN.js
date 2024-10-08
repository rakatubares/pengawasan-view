import Pdf from "../MyPdf";

const inds = {
    lbl: 17,
    cln: 30,
    txt: 33,
    tugas: 37,
    cln2: 52,
    txt2: 55,
    lbl2: 22,
    ttd: 125,
}

class PdfLptiN extends Pdf
{
    constructor(
        data,
        title='LAPORAN PELAKSANAAN TUGAS NPP',
    )
    {
        super(data, title)
    }


    generateText() 
    {
        this.prepareDocDate(this.data.tanggal_dokumen)

        this.txt = {}

        let st = this.converters.no_tanggal_dok(this.data.nomor_st, this.data.tanggal_st)
        this.txt.st = `Surat Tugas Intelijen Nomor: ${st}`
        this.txt.wilayah_penugasan = this.converters.string(this.data.wilayah)
        this.txt.periode_penugasan = this.converters.dateRange(this.data.tanggal_mulai, this.data.tanggal_akhir)

        this.txt.uraian = this.data.uraian || '-'
        this.txt.kesimpulan = this.data.kesimpulan || '-'
        this.txt.rekomendasi = this.data.rekomendasi || '-'
    }

    writeText()
    {
        this.createHeader()
        this.createNomor(this.jenis_dok, this.data.no_dok_lengkap)

        // STI
        this.pdf.setFont('Helvetica', 'bold')
        this.write('I.')
        this.write('Dasar', inds.lbl)
        this.pdf.setFont('Helvetica', 'normal')
        this.write(':', inds.cln)
        this.write(this.txt.st, inds.txt)
        this.break(.25)

        // Tugas
        this.pdf.setFont('Helvetica', 'bold')
        this.write('II.')
        this.write('Tugas', inds.lbl)
        this.pdf.setFont('Helvetica', 'normal')
        this.write(':', inds.cln)
        if (this.data.tugas.length > 0) {
            let n_tugas = 1
            this.data.tugas.forEach(tugas => {
                this.write(`${n_tugas}.`, inds.txt)
                this.write(tugas, inds.tugas)
                this.break()
                n_tugas += 1
            });
            this.break(-.75)	
        } else {
            this.break(.25)
        }

        // Wilayah
        this.pdf.setFont('Helvetica', 'bold')
        this.write('III.')
        this.write('Wilayah Penugasan', inds.lbl)
        this.pdf.setFont('Helvetica', 'normal')
        this.write(':', inds.cln2)
        this.write(this.txt.wilayah_penugasan, inds.txt2)
        this.break(.25)

        // Periode
        this.pdf.setFont('Helvetica', 'bold')
        this.write('IV.')
        this.write('Periode Penugasan', inds.lbl)
        this.pdf.setFont('Helvetica', 'normal')
        this.write(':', inds.cln2)
        this.write(this.txt.periode_penugasan, inds.txt2)
        this.break(.25)

        // Uraian
        this.pdf.setFont('Helvetica', 'bold')
        this.write('V.')
        this.write('Uraian', inds.lbl)
        this.pdf.setFont('Helvetica', 'normal')
        this.break()
        this.write(this.txt.uraian, inds.lbl)
        this.break(.25)
        
        // Kesimpulan
        this.pdf.setFont('Helvetica', 'bold')
        this.write('VI.')
        this.write('Kesimpulan', inds.lbl)
        this.pdf.setFont('Helvetica', 'normal')
        this.break()
        this.write(this.txt.kesimpulan, inds.lbl)
        this.break(.25)

        // Rekomendasi
        this.pdf.setFont('Helvetica', 'bold')
        this.write('VII.')
        this.write('Rekomendasi', inds.lbl)
        this.pdf.setFont('Helvetica', 'normal')
        this.break()
        this.write(this.txt.rekomendasi, inds.lbl)
        this.break(.25)

        this.write('Demikian disampaikan sebagai laporan.', inds.lbl)
        this.break(1)

        // TTD
        this.write(`Tangerang, ${this.full_tgl_dok}`, inds.ttd)
        this.break()
        this.ttd(
            inds.ttd, 
            'Pelaksana Tugas', 
            undefined, 
            this.data.petugas.pembuat.name,
            this.data.petugas.pembuat.nip,
        )

        // CC
        this.cc(this.data.tembusan)

        let checkLn = this.ln
        return checkLn
    }
}

export default PdfLptiN