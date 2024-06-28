export default {
	data: {
		no_dok_lengkap: null,
		tanggal_dokumen: null,
		saksi: {id: null},
		tersangka: {id: null},
		penindakan: {
			sprint: {
				nomor_sprint: null,
				tanggal_sprint: null,
			}
		},
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
		sbp: {
			no_dok_lengkap: null,
			tanggal_dokumen: null,
		},
		lp: {
			no_dok_lengkap: null,
			tanggal_dokumen: null,
		},
		lpp: {
			id: null,
			no_dok_lengkap: null,
			tanggal_dokumen: null,
		},
		petugas: {
			peneliti: {nip: null},
			atasan1: {
				kode_jabatan: null,
				tipe_ttd: null,
				nip: null,
				flag_pejabat: true,
			},
			atasan2: {
				kode_jabatan: null,
				tipe_ttd: null,
				nip: null,
				flag_pejabat: true,
			},
		}
	}
}