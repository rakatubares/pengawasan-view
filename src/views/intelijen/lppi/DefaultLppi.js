let default_data = {
    no_dok_lengkap: null,
    tanggal_dokumen: null,
    lpti_id: null,
    flag_info_internal: false,
    media_info_internal: null,
    tgl_terima_info_internal: null,
    no_dok_info_internal: null,
    tgl_dok_info_internal: null,
    flag_info_eksternal: false,
    media_info_eksternal: null,
    tgl_terima_info_eksternal: null,
    no_dok_info_eksternal: null,
    tgl_dok_info_eksternal: null,
    kesimpulan: null,
    tanggal_disposisi: null,
    flag_analisis: false,
    flag_arsip: false,
    catatan: null,
    informasi: [],
    petugas: {
        penerima_informasi: {nip: null},
        penilai_informasi: {nip: null},
        penerima_disposisi: {nip: null},
        pejabat: {
            kode_jabatan: null,
            tipe_ttd: null,
            nip: null,
            flag_pejabat: true,
        },
    }
}

let default_lppi = JSON.parse(JSON.stringify(default_data))
default_lppi.media_info_internal = 'LPTI'

let default_lppin = JSON.parse(JSON.stringify(default_data))
default_lppin.media_info_internal = 'LPT-N'

export default {
    data: {
        lppi: default_lppi,
        lppin: default_lppin,
    }
}