export default {
    data: {
        no_dok_lengkap: null,
        tanggal_dokumen: null,
        lppin_id: null, 
        nomor_lppin: null,
        tanggal_lppin: null,
        nomor_npin: null,
        tanggal_npin: null,
        informasi: null,
        prosedur: null,
        hasil: null,
        kesimpulan: null,
        flag_rekom_nhin: false,
        flag_rekom_nin: false,
        rekomendasi_lain: null,
        informasi_lain: null,
        tujuan: null,
        keputusan_pejabat: true,
        catatan_pejabat: null,
        tanggal_terima_pejabat: null,
        keputusan_atasan: true,
        catatan_atasan: null,
        tanggal_terima_atasan: null,
        petugas: {
            analis: {nip: null},
            pejabat: {
                kode_jabatan: null,
                tipe_ttd: null,
                nip: null,
                flag_pejabat: true,
            },
            atasan: {
                kode_jabatan: null,
                tipe_ttd: null,
                nip: null,
                flag_pejabat: true,
            },
        }
    }
}