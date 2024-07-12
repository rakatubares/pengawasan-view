export default {
	data: {
		no_dok_lengkap: null,
		tanggal_dokumen: null,
		sifat: 'tertutup',
		pakaian: 'Non-PDH',
		tugas: [null],
		petugas: {
			pengendali: [ {nip: null} ],
			tim: [ {nip: null} ],
			penerbit: {
				kode_jabatan: null,
				tipe_ttd: null,
				nip: null,
				flag_pejabat: true,
			},
		},
		tembusan: [null],
	}
}