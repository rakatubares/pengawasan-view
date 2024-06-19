export default {
	data: {
		no_dok_lengkap: null,
		tanggal_dokumen: null,
		lptp_id: null,
		nomor_lptp: null,
		tanggal_lptp: null,
		nomor_sbp: null,
		tanggal_sbp: null,
		analisa: null,
		catatan: null,
		penindakan: { 
			uraian_penindakan: null,
			objek: {}, 
		},
		petugas: {
			penyusun: {
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
			} 
		},
	}
}