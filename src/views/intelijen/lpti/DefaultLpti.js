export default {
    data: {
        no_dok_lengkap: null,
        tanggal_dokumen: null,
        jenis_pelanggaran: 'kepabeanan',
        pelaku: { 
            type: 'entitas-badan-hukum',
            data: { id: null, nama: null }
        },
        petugas: { pembuat: { nip: null }},
        tembusan: [],
        sti: {
            id: null,
            no_dok_lengkap: null,
            tanggal_dokumen: null,
        }
    }
}