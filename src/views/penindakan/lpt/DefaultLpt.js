export default {
	data: {
		no_dok_lengkap: null,
		tanggal_dokumen: null,
		penindakan: { 
			petugas: {
				petugas1: {nip: null, name: null},
				petugas2: {nip: null, name: null}
			},
			objek: {}, 
		},
		sbp: {
			id: null,
			no_dok_lengkap: null,
			tanggal_dokumen: null,
		},
		petugas: {
			pejabat: {
				kode_jabatan: 'bd.0503',
				tipe_ttd: null,
				nip: null,
				flag_pejabat: true,
			},
		},
	}
}