export default {
	data: {
		no_dok_lengkap: null,
		tanggal_dokumen: null,
		penyidikan: {
			jenis_pelanggaran: 'kepabeanan',
			pasal: null,
			modus: null,
			tempat_pelanggaran: null,
			tanggal_pelanggaran: null,
			waktu_pelanggaran: null,
			tertangkap_tangan: true,
			pelaku: { id: null, jenis_kelamin: { uraian: null }},
			bhp: {},
		},
		lp: {
			no_dok_lengkap: null,
			tanggal_dokumen: null,
		},
		lpf: {
			no_dok_lengkap: null,
			tanggal_dokumen: null,
		},
		petugas: {
			pelaksana: [],
			pejabat: {
				kode_jabatan: null,
				tipe_ttd: null,
				nip: null,
				flag_pejabat: true,
			},
		}
	}
}