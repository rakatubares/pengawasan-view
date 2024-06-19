export default {
	data: {
		jenis_segel: 'Kertas',
		jumlah_segel: 1,
		satuan_segel: 'lembar',
		tempat_segel: null,
		penindakan: {
			tanggal_selesai_penindakan: null,
			lokasi_penindakan: null,
			sprint: {id: null},
			saksi: {id: null},
			petugas: {
				petugas1: {nip: null},
				petugas2: {nip: null},
			},
			objek: {},
		},
	}
}