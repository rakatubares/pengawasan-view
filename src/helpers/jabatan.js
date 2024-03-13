import api2 from "../router/api2"
import store from "../store";

class Jabatan {
	async getListJabatan() {
		var list_jabatan = []
		var r = await api2.getListJabatan()

		r.data.data.forEach(j => {
			let option = {
				'value': j.kode,
				'label': j.jabatan
			}
			list_jabatan.push(option)
		});
		
		store.commit('set', ['jabatanOptions', list_jabatan])
	}
}

export default new Jabatan