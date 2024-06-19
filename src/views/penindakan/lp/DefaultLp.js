export default {
	data: {
		no_dok_lengkap: null,
		tanggal_dokumen: null,
		lp_id: null,
		nomor_lp: null,
		tanggal_lp: null,
		pasal: null,
		modus: null,
		penindakan: { 
			uraian_penindakan: null,
			objek: {}, 
		},
		petugas: {
			pejabat: {
				kode_jabatan: null,
				tipe_ttd: null,
				nip: null,
				flag_pejabat: true,
			},
		},
	}
}