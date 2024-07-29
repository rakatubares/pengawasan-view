import Pdf from "../MyPdf";

const inds = {
    lbl: 17,
    cln: 30,
    txt: 33,
    tugas: 37,
    cln2: 52,
    txt2: 55,
    lbl2: 22,
    lbl3: 27,
    cln3: 80,
    txt3: 83,
    ttd: 125,
}

class PdfLpti extends Pdf
{
    constructor(
        data,
        title='LAPORAN PELAKSANAAN TUGAS INTELIJEN',
    )
    {
        super(data, title)
    }


    generateText() 
    {
        this.prepareDocDate(this.data.tanggal_dokumen)

        this.txt = {}

        let sti = this.data.sti ? this.data.sti.no_dok_lengkap : '-'
        let wilayah_penugasan = this.data.sti ? this.data.sti.wilayah : '-'
        let tanggal_mulai = this.data.sti ? this.data.sti.tanggal_mulai : null
        let tanggal_akhir = this.data.sti ? this.data.sti.tanggal_akhir : null
        this.txt.sti = `Surat Tugas Intelijen Nomor: ${sti}`
        this.txt.wilayah_penugasan = this.converters.string(wilayah_penugasan)
        this.txt.periode_penugasan = this.converters.dateRange(tanggal_mulai, tanggal_akhir)
        
        this.txt.tempat_pengumpulan = this.data.tempat_pengumpulan
            ? this.converters.string(this.data.tempat_pengumpulan) : '-'
        this.txt.sumber_informasi = this.data.sumber_informasi || '-'
        this.txt.metode_pengumpulan = this.data.metode_pengumpulan || '-'
        this.txt.ikhtisar_informasi = this.data.ikhtisar_informasi || '-'

        this.txt.jenis_dok_pabean = this.data.jenis_dok_pabean || '-'
        this.txt.dok_pabean = ''
        if (this.data.nomor_dok_pabean) {
            this.txt.dok_pabean = this.data.nomor_dok_pabean
        }
        if (this.data.tanggal_dok_pabean) {
            this.txt.dok_pabean = `${this.txt.dok_pabean} tanggal ${this.data.tanggal_dok_pabean}`.trim()
        }
        if (this.txt.dok_pabean == '') {
            this.txt.dok_pabean = '-'
        }
        this.txt.metode_analisis = this.data.metode_analisis || '-'
        this.txt.ikhtisar_analisis = this.data.ikhtisar_analisis || '-'

        this.txt.jenis_pelanggaran = this.data.jenis_pelanggaran || '-'
        this.txt.modus_pelanggaran = this.data.modus_pelanggaran || '-'
        this.txt.tempat_pelanggaran = this.data.tempat_pelanggaran 
            ? this.converters.string(this.data.tempat_pelanggaran) : '-'
        this.txt.waktu_pelanggaran = this.data.waktu_pelanggaran || '-'
        this.txt.pelaku = this.data.pelaku ? this.data.pelaku.data.nama : '-'

        this.txt.foto = this.data.dokumentasi_foto || '-'
        this.txt.audio = this.data.dokumentasi_audio || '-'
        this.txt.video = this.data.dokumentasi_video || '-'

        this.txt.informasi_lain = this.data.informasi_lain || '-'
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
        this.write(this.txt.sti, inds.txt)
        this.break(.25)

        // Tugas
        this.pdf.setFont('Helvetica', 'bold')
        this.write('II.')
        this.write('Tugas', inds.lbl)
        this.pdf.setFont('Helvetica', 'normal')
        this.write(':', inds.cln)
        if (this.data.sti != null) {
            let n_tugas = 1
            this.data.sti.tugas.forEach(tugas => {
                this.write(`${n_tugas}.`, inds.txt)
                this.write(tugas, inds.tugas)
                this.break()
                n_tugas += 1
            });
            this.break(-.75)	
        } else {
            this.break()
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
        this.write('Uraian Pelaksanaan Tugas', inds.lbl)
        this.pdf.setFont('Helvetica', 'normal')
        this.break()

        // Pengumpulan dan penilaian informasi
        this.write('1.', inds.lbl)
        this.write('Kegiatan Pengumpulan dan Penilaian Informasi', inds.lbl2)
        this.break()

        this.write('a.', inds.lbl2)
        this.write('Tempat Pengumpulan Informasi', inds.lbl3)
        this.write(':', inds.cln3)
        this.write(this.txt.tempat_pengumpulan, inds.txt3)
        this.break()

        this.write('b.', inds.lbl2)
        this.write('Sumber Informasi', inds.lbl3)
        this.write(':', inds.cln3)
        this.write(this.txt.sumber_informasi, inds.txt3)
        this.break()

        this.write('c.', inds.lbl2)
        this.write('Metode Pengumpulan Informasi', inds.lbl3)
        this.write(':', inds.cln3)
        this.write(this.txt.metode_pengumpulan, inds.txt3)
        this.break()

        this.write('d.', inds.lbl2)
        this.write('Ikhtisar Informasi', inds.lbl3)
        this.write(':', inds.cln3)
        this.write(this.txt.ikhtisar_informasi, inds.txt3)
        this.break(.25)

        // Analisis intelijen
        this.write('2.', inds.lbl)
        this.write('Kegiatan Analisis Intelijen', inds.lbl2)
        this.break()

        this.write('a.', inds.lbl2)
        this.write(
            'Jenis Dokumen Kepabeanan dan/atau Cukai', 
            inds.lbl3, undefined, undefined, this.page_width-inds.cln3-8
        )
        this.write(':', inds.cln3)
        this.write(this.txt.jenis_dok_pabean, inds.txt3)
        this.break()

        this.write('b.', inds.lbl2)
        this.write(
            'Nomor dan Tanggal Dokumen Kepabeanan dan/atau Cukai', 
            inds.lbl3, undefined, undefined, this.page_width-inds.cln3-8
        )
        this.write(':', inds.cln3)
        this.write(this.txt.dok_pabean, inds.txt3)
        this.break()

        this.write('c.', inds.lbl2)
        this.write('Metode Analisis Intelijen', inds.lbl3)
        this.write(':', inds.cln3)
        this.write(this.txt.metode_analisis, inds.txt3)
        this.break()

        this.write('d.', inds.lbl2)
        this.write('Ikhtisar Hasil Analisis Intelijen', inds.lbl3)
        this.write(':', inds.cln3)
        this.write(this.txt.ikhtisar_analisis, inds.txt3)
        this.break(.25)

        // Indikasi Pelanggaran
        this.write('3.', inds.lbl)
        this.write('Indikasi Pelanggaran', inds.lbl2)
        this.break()

        this.write('a.', inds.lbl2)
        this.write('Jenis Pelanggaran', inds.lbl3)
        this.write(':', inds.cln3)
        this.write(this.txt.jenis_pelanggaran, inds.txt3)
        this.break()

        this.write('b.', inds.lbl2)
        this.write('Modus Pelanggaran', inds.lbl3)
        this.write(':', inds.cln3)
        this.write(this.txt.modus_pelanggaran, inds.txt3)
        this.break()

        this.write('c.', inds.lbl2)
        this.write('Perkiraan Tempat Pelanggaran', inds.lbl3)
        this.write(':', inds.cln3)
        this.write(this.txt.tempat_pelanggaran, inds.txt3)
        this.break()

        this.write('d.', inds.lbl2)
        this.write('Perkiraan Waktu Pelanggaran', inds.lbl3)
        this.write(':', inds.cln3)
        this.write(this.txt.waktu_pelanggaran, inds.txt3)
        this.break()

        this.write('e.', inds.lbl2)
        this.write('Perkiraan Pelaku Pelanggaran', inds.lbl3)
        this.write(':', inds.cln3)
        this.write(this.txt.pelaku, inds.txt3)
        this.break(.25)

        // Dokumentasi
        this.write('4.', inds.lbl)
        this.write('Dokumentasi Kegiatan Intelijen', inds.lbl2)
        this.break()

        this.write('a.', inds.lbl2)
        this.write('Foto', inds.lbl3)
        this.write(':', inds.cln3)
        this.write(this.txt.foto, inds.txt3)
        this.break()

        this.write('b.', inds.lbl2)
        this.write('Rekaman Audio', inds.lbl3)
        this.write(':', inds.cln3)
        this.write(this.txt.audio, inds.txt3)
        this.break()

        this.write('c.', inds.lbl2)
        this.write('Rekaman Video', inds.lbl3)
        this.write(':', inds.cln3)
        this.write(this.txt.video, inds.txt3)
        this.break(.25)

        // Informasi lain
        this.write('5.', inds.lbl)
        this.write('Informasi Lainnya yang Berkaitan:', inds.lbl2)
        this.break()
        this.write(this.txt.informasi_lain, inds.lbl2)
        this.break(.25)

        // Penutup
        this.pdf.setFont('Helvetica', 'bold')
        this.write('VI.')
        this.write('Kesimpulan', inds.lbl)
        this.pdf.setFont('Helvetica', 'normal')
        this.break()
        this.write(this.txt.kesimpulan, inds.lbl)
        this.break(.25)

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
            'Ketua Tim Pelaksanaan Tugas Intelijen', 
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

export default PdfLpti