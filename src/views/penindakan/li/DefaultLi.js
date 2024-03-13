export default {
	data: {
		no_dok_lengkap: null,
		tanggal_dokumen: null,
		sumber: null,
		informasi: null,
		tindak_lanjut: null,
		catatan: null,
		petugas: { 
			penerbit: {
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