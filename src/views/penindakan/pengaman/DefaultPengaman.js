export default {
	data: {
		jenis_pengaman: 'Kertas',
		jumlah_pengaman: 1,
		satuan_pengaman: 'lembar',
		tempat_pengaman: null,
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