export default {
    data: {
        seksi: 'Intelijen I',
        no_dok_lengkap: null,
        tanggal_dokumen: null,
        tugas: [null],
        jenis_pelanggaran: 'kepabeanan',
        pelaku: { 
            type: 'entitas-badan-hukum',
            data: { id: null, nama: null }
        },
        petugas: { pembuat: { nip: null }},
        tembusan: [],
    }
}