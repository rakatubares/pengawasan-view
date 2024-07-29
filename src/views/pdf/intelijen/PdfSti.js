import pangkat from "../../../helpers/pangkat";
import Pdf from "../MyPdf";

const inds = {
    lbl: 15,
    cln: 45,
    txt: 50,
    txt2: 55,
    ttd: 125,
}

class PdfSti extends Pdf
{
    constructor(data) {
        super(data, 'SURAT TUGAS INTELIJEN')
    }

    generateText()
    {
        super.generateText()

        this.txt.dasar_hukum = 'Dalam rangka pelaksanaan ' +
            'Undang-Undang Nomor 10 Tahun 1995 tentang Kepabeanan ' +
            'jo. Undang-Undang Nomor 17 Tahun 2006 ' +
            'dan Undang-Undang Nomor 11 Tahun 1995 tentang Cukai ' +
            'jo. Undang-Undang Nomor 39 Tahun 2007, ' +
            'kami pejabat yang bertandatangan di bawah ini memberi tugas ' +
            'untuk melaksanakan kegiatan intelijen kepada:'

        this.txt.tugas = this.data.tugas || '-'
        this.txt.wilayah = this.data.wilayah 
            ? this.converters.string(this.data.wilayah) 
            : '-'

        this.txt.bantuan = 'Kepada pihak yang berwajib/berwenang/terkait, ' +
            'sesuai dengan ketentuan Pasal 76 Undang-undang Nomor 17 Tahun 2006 tentang ' +
            'Perubahan Undang-undang Nomor 10 tahun 1995 tentang Kepabeanan ' +
            'dan Pasal 34 Undang-undang 39 tahun 2007 tentang ' +
            'Perubahan Undang-undang Nomor 11 tahun 1995 tentang Cukai ' +
            'diminta bantuan seperlunya.'

        this.txt.penutup = 'Demikian disampaikan untuk dilaksanakan dengan penuh rasa tanggung jawab ' +
            'dan melaporkan pelaksanaan Surat Tugas ini setelah menyelesaikan pelaksanaan tugas.'
    }

    writeText()
    {
        this.createHeader()
        this.createNomor(this.jenis_dok, this.data.no_dok_lengkap)

        this.write(this.txt.dasar_hukum)
        this.break(1)

        // Pengendali
        this.write('Pengendali Operasi')
        this.break()
        let n_pengendali = 1
        this.data.petugas.pengendali.forEach(element => {
            this.write(`${n_pengendali}.`)
            this.write('Nama', inds.lbl)
            this.write(':', inds.cln)
            this.write(element.name, inds.txt)
            this.break()

            this.write('Pangkat / Gol.', inds.lbl)
            this.write(':', inds.cln)
            this.write(`${pangkat.getPangkat(element.pangkat)} / ${element.pangkat}`, inds.txt)
            this.break()

            let jabatan = element.jabatan_petugas || '-'
            this.write('Jabatan', inds.lbl)
            this.write(':', inds.cln)
            this.write(jabatan, inds.txt)
            this.break(.5)

            n_pengendali += 1
        });
        this.break()

        // Tim
        this.write('Tim Operasi')
        this.break()
        let n_tim = 1
        this.data.petugas.tim.forEach(element => {
            this.write(`${n_tim}.`)
            this.write('Nama', inds.lbl)
            this.write(':', inds.cln)
            this.write(element.name, inds.txt)
            this.break()

            this.write('Pangkat / Gol.', inds.lbl)
            this.write(':', inds.cln)
            this.write(`${pangkat.getPangkat(element.pangkat)} / ${element.pangkat}`, inds.txt)
            this.break()

            let jabatan = element.jabatan_petugas || '-'
            this.write('Jabatan', inds.lbl)
            this.write(':', inds.cln)
            this.write(jabatan, inds.txt)
            this.break(.5)

            n_tim += 1
        });
        this.break(-.5)

        // Tugas
        this.write('Untuk melaksanakan tugas sebagai berikut:')
        this.break()
        let n_tugas = 1
        this.txt.tugas.forEach(tugas => {
            this.write(`${n_tugas}.`)
            this.write(tugas, inds.lbl)
            this.break()
            n_tugas += 1
        });
        

        this.write('Wilayah Penugasan')
        this.write(':', inds.cln)
        this.write(this.txt.wilayah, inds.txt)
        this.break()

        this.write('Periode Penugasan')
        this.write(':', inds.cln)
        this.write(
            this.converters.dateRange(this.data.tanggal_mulai, this.data.tanggal_akhir), 
            inds.txt
        )
        this.break(1)

        // Ketentuan
        this.write('Ketentuan')
        this.write(':', inds.cln)
        this.write('1.', inds.txt)
        this.write('Surat Tugas ini bersifat rahasia ' +
            'dan terbatas untuk pihak yang berkepentingan;', inds.txt2)
        this.break()

        this.write('2.', inds.txt)
        this.write(`Sifat kegiatan intelijen ${this.data.sifat};`, inds.txt2)
        this.break()

        this.write('3.', inds.txt)
        this.write(`Berpakaian ${this.data.pakaian};`, inds.txt2)
        this.break(1)

        // Penutup
        this.write(this.txt.bantuan)
        this.break(1)

        this.write(this.txt.penutup)
        this.break(1)

        // TTD
        this.write('Dikeluarkan di Tangerang', inds.ttd)
        this.break()
        this.write(`Pada tanggal ${this.full_tgl_dok}`, inds.ttd)
        this.break()
        this.ttd(
            inds.ttd,
            this.data.petugas.penerbit.jabatan,
            this.data.petugas.penerbit.txt_tipe_ttd,
            this.data.petugas.penerbit.name,
            this.data.petugas.penerbit.nip,
        )

        // CC
        this.cc(this.data.tembusan)
    }
}

export default PdfSti