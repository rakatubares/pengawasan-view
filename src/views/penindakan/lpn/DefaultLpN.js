export default {
	data: {
		no_dok_lengkap: null,
		tanggal_dokumen: null,
		sprint: {id: null},
		lp_id: null,
		nomor_lp: null,
		tanggal_lp: null,
		lphp_id: null,
		analisa_lphp: null,
		kesimpulan: null,
		penindakan: { 
			lokasi_penindakan: null,
			tanggal_selesai_penindakan: null,
			waktu_selesai_penindakan: null,
			uraian_penindakan: null,
			hal_terjadi: null,
			objek: {}, 
			saksi: {id: null, nama: null},
			petugas: {petugas1: {nip: null}}
		},
		petugas: {
			penyusun: {
				kode_jabatan: 'bd.0502',
				tipe_ttd: null,
				nip: null,
				flag_pejabat: true,
			},
			penerbit: {
				kode_jabatan: 'bd.05',
				tipe_ttd: null,
				nip: null,
				flag_pejabat: true,
			},
		},
	}
}