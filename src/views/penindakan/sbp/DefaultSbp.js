let default_data = {
    jenis_sumber: 'nhi',
    sumber_id: null,
    nomor_sumber: null,
    tanggal_sumber: null,
    penindakan: {
        sprint: {id: null},
        lokasi_penindakan: null,
        uraian_penindakan: null,
        alasan_penindakan: null,
        jenis_pelanggaran: 'kepabeanan',
        kategori_penindakan: {id: 1},
        tanggal_mulai_penindakan: null,
        waktu_mulai_penindakan: null,
        tanggal_selesai_penindakan: null,
        waktu_selesai_penindakan: null,
        hal_terjadi: null,
        saksi: {id: null},
        petugas: {
            petugas1: {nip: null},
            petugas2: {nip: null}
        },
        objek: {},
    },
    lptp: {
        catatan: null,
        petugas: {
            atasan: {
                kode_jabatan: null,
                tipe_ttd: null,
                nip: null,
                flag_pejabat: true,
            }
        }
    },
}

let default_sbp = JSON.parse(JSON.stringify(default_data))
default_sbp.jenis_sumber = 'nhi'

let default_sbpn = JSON.parse(JSON.stringify(default_data))
default_sbpn.jenis_sumber = 'nhin'

export default {
    data: {
        sbp: default_sbp,
        sbpn: default_sbpn,
    }
}