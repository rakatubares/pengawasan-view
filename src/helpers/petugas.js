class Petugas {
	findPetugasByPosisi(list_petugas, posisi) {
		let petugas_posisi = null
		
		if (typeof list_petugas !== 'undefined') {
			list_petugas.forEach(petugas => {
				for (let i = 0; i < list_petugas.length; i++) {
					// Get petugas
					if (petugas['posisi'] == posisi) {
						petugas_posisi = petugas
						break
					}

					// Construct tipe ttd
					if (petugas['flag_pejabat'] == 1) {
						switch (petugas['tipe_ttd']) {
							case 'plh':
								petugas['txt_tipe_ttd'] = 'Plh. '
								break;

							case 'plt':
								petugas['txt_tipe_ttd'] = 'Plt. '
								break;
						
							default:
								petugas['txt_tipe_ttd'] = ''
								break;
						}
					}
				}
			});
		}
		return petugas_posisi
	}
}

export default new Petugas