export default {
	data: {
		no_dok_lengkap: null,
		tanggal_dokumen: null,
		sifat: 'segera',
		klasifikasi: 'rahasia',
		tujuan: 'Kepala Seksi Patroli dan Operasi I',
		tempat_indikasi: null,
		tanggal_indikasi: null,
		waktu_indikasi: null,
		zona_waktu: 'WIB',
		kantor: {
			kode_kantor: '050100',
			nama_kantor: null,
		},
		indikasi: null,
		detail: {
			type: 'nhi-exim',
			data: {
				tipe: 'IMPOR',
				entitas: {
					type: null,
					data: { id: null },
				}
			},
		},
		petugas: { 
			penerbit: {
				kode_jabatan: null,
				tipe_ttd: null,
				nip: null,
				flag_pejabat: true,
			} 
		},
		tembusan: [null, null, null],
	},
	detail_exim: {
		tipe: 'IMPOR',
		entitas: {
			type: null,
			data: { id: null },
		}
	},
	detail_tertentu: {
		entitas: {
			type: null,
			data: { id: null },
		}
	},
}