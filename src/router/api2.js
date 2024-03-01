import axios from 'axios'

import store from '../store.js'

class API {
	constructor() {
		let token = store.getters.token
		this.config = {
			headers: { Authorization: `Bearer ${token}` }
		}
		this.base_url = process.env.VUE_APP_BASEAPI
	}

	async getApi(url) 		 { return await axios.get(`${this.base_url}${url}`, this.config) }
	async postApi(url, data) { return await axios.post(`${this.base_url}${url}`, data, this.config) }
	async putApi(url, data)  { return await axios.put(`${this.base_url}${url}`, data, this.config) }
	async delApi(url) 		 { return await axios.delete(`${this.base_url}${url}`, this.config) }

	/*
    |--------------------------------------------------------------------------
    | API for SSO users
    |--------------------------------------------------------------------------
    */

	async getUserById(id) {
		let response = await this.getApi(`/user/${id}`)
		let user = response.data.data[0]
		return user
	}

	async getUserByNip(nip) {
		let response = await this.postApi(`/user/nip`, nip)
		let user = response.data.data[0]
		return user
	}

	async getUserByRole(roles) {
		let response = await this.postApi(`/user/role`, roles)
		let users = response.data.data
		return users
	}

	async getUserByPosition(positions) {
		let response = await this.postApi(`/user/jabatan`, positions)
		let users = response.data.data
		return users
	}

	async getJabatanByCode(positions) {
		let response = await this.postApi(`/jabatan/list`, positions)
		let jabatan = response.data.data
		return jabatan
	}

	async searchUser(query) {
		let response = await this.postApi(`/user/search`, query)
		let users = response.data.data
		return users
	}

	saveUser(data) {
		this.postApi('/user', data)
	}

	/*
	|--------------------------------------------------------------------------
	| API for documents
	|--------------------------------------------------------------------------
	*/

	async getListDocuments(doc_type) {
		let response = await this.getApi(`/${doc_type}`)
		let list = response.data.data
		return list
	}

	async getDocumentById(doc_type, doc_id) {
		let response = await this.getApi(`/${doc_type}/${doc_id}`)
		let doc = response.data
		return doc
	}

	async storeDoc(doc_type, data) {
		let response = await this.postApi(`/${doc_type}`, data)
		let doc = response.data.data
		return doc
	}

	async updateDoc(doc_type, doc_id, data) {
		let response = await this.putApi(`/${doc_type}/${doc_id}`, data)
		return response.data.data
	}

	async publishDoc(doc_type, doc_id) {
		await this.putApi(`/${doc_type}/${doc_id}/publish`)
	}

	async searchDoc(doc_type, search_query) {
		return await this.postApi(`/doc/${doc_type}/search`, search_query)
	}

	async deleteDoc(doc_type, doc_id) {
		return await this.delApi(`/${doc_type}/${doc_id}`)
	}

	async getRelatedDocuments(doc_type, doc_id) {
		return await this.getApi(`/${doc_type}/${doc_id}/docs`)
	}

	async getDocumentsChain(doc_type, doc_id) {
		let response = await this.getApi(`/chain/${doc_type}/id/${doc_id}`)
		return response.data
	}

	/*
	|--------------------------------------------------------------------------
	| API for details
	|--------------------------------------------------------------------------
	*/

	async getDetailByDocId(doc_type, doc_id, detail_type) {
		let response = await this.getApi(`/${doc_type}/${doc_id}/${detail_type}`)
		let objek = response.data.data
		return objek
	}

	async getItemBarangByDocId(doc_type, doc_id) {
		return await this.getApi(`/${doc_type}/${doc_id}/barang/item`)
	}

	async getItemBarang(doc_type, doc_id, item_id) {
		return await this.getApi(`/${doc_type}/${doc_id}/barang/item/${item_id}`)
	}

	async delItemBarang(doc_type, doc_id, item_id) {
		await this.delApi(`/${doc_type}/${doc_id}/barang/item/${item_id}`)
	}

	async insertDetail(doc_type, doc_id, detail_type, data) {
		return await this.postApi(`/${doc_type}/${doc_id}/${detail_type}`, data)
	}

	async updateDetail(doc_type, doc_id, detail_type, detail_id, data) {
		return await this.putApi(`/${doc_type}/${doc_id}/${detail_type}/${detail_id}`, data)
	}

	async getLinkedDoc(doc_type, doc_id) {
		return await this.getApi(`/${doc_type}/${doc_id}/linked`)
	}

	async storeLinkedDoc(doc_type, doc_id, data) {
		return await this.postApi(`/${doc_type}/${doc_id}/storelinked`, data)
	}

	async getEntitasById(id) {
		return await this.getApi(`/entitas/${id}`)
	}

	async saveEntitas(data) {
		return await this.postApi(`/entitas`, data)
	}

	async updateEntitas(id, data) {
		return await this.putApi(`/entitas/${id}`, data)
	}

	async searchEntitas(data) {
		return await this.postApi('/entitas/search', data)
	}

	async getBhpByDocId(doc_type, doc_id) {
		return await this.getApi(`/${doc_type}/${doc_id}/bhp`)
	}

	async insertBhp(doc_type, doc_id, data) {
		return await this.postApi(`/${doc_type}/${doc_id}/bhp`, data)
	}

	async updateBhp(doc_type, doc_id, detail_id, data) {
		return await this.putApi(`/${doc_type}/${doc_id}/bhp/${detail_id}`, data)
	}

	async delItemBhp(doc_type, doc_id, item_id) {
		await this.delApi(`/${doc_type}/${doc_id}/bhp/item/${item_id}`)
	}

	// Barang
	async getBarang(doc_type, doc_id) {
		let response = await this.getApi(`/barang/${doc_type}/${doc_id}/item`)
		return response.data
	}

	async getItemBarang(doc_type, doc_id, item_id) {
		let response = await this.getApi(`/barang/${doc_type}/${doc_id}/item/${item_id}`)
		return response.data
	}

	async saveItemBarang(data, doc_type, doc_id) {
		await this.postApi(`/barang/${doc_type}/${doc_id}/item`, data)
	}

	async updateItemBarang(data, doc_type, doc_id, item_id) {
		await this.putApi(`/barang/${doc_type}/${doc_id}/item/${item_id}`, data)
	}

	async deleteItemBarang(doc_type, doc_id, item_id) {
		await this.delApi(`/barang/${doc_type}/${doc_id}/item/${item_id}`)
	}

	// Entitas orang
	async searchEntitasOrang(data) {
		let response = await this.postApi(`/entitas/orang/search`, data)
		return response.data
	}

	async getEntitasOrang(id) {
		let response = await this.getApi(`/entitas/orang/${id}`)
		return response.data
	}

	async saveEntitasOrang(data) {
		console.log('API - SAVE ENTITAS ORANG')
		let response = await this.postApi(`/entitas/orang`, data)
		return response.data
	}

	async updateEntitasOrang(data, id) {
		console.log('API - UPDATE ENTITAS ORANG')
		let response = await this.putApi(`/entitas/orang/${id}`, data)
		return response.data
	}

	// Entitas badan hukum
	async searchEntitasBadanHukum(data) {
		let response = await this.postApi(`/entitas/badanhukum/search`, data)
		return response.data
	}

	async getEntitasBadanHukum(id) {
		let response = await this.getApi(`/entitas/badanhukum/${id}`)
		return response.data
	}

	async saveEntitasBadanHukum(data) {
		let response = await this.postApi(`/entitas/badanhukum`, data)
		return response.data
	}

	async updateEntitasBadanHukum(data, id) {
		let response = await this.putApi(`/entitas/badanhukum/${id}`, data)
		return response.data
	}

	// Tembusan
	async searchTembusan(data) {
		let response = await this.postApi(`/tembusan/search`, data)
		return response.data
	}

	/*
	|--------------------------------------------------------------------------
	| API for references
	|--------------------------------------------------------------------------
	*/

	async searchLokasi(data) {
		let response = await this.postApi(`/lokasi/search`, data)
		return response.data
	}

	async getGrupLokasi() {
		return await this.getApi('/lokasi')
	}

	async searchKantorBC(data) {
		let response = await this.postApi('/kantor/search', data)
		return response.data
	}

	async getKantorByCode(code) {
		let response =  await this.getApi(`/kantor/kode/${code}`)
		return response.data
	}

	async searchSatuan(data) {
		let response = await this.postApi('/satuan/search', data)
		return response.data
	}

	async getSatuanById(id) {
		let response = await this.getApi(`/satuan/${id}`)
		return response.data
	}

	async getSatuanBarang() {
		let response = await this.getApi(`/satuan`)
		return response.data
	}

	async searchKemasan(data) {
		return await this.postApi('/kemasan/search', data)
	}

	async getKemasanById(id) {
		return await this.getApi(`/kemasan/${id}`)
	}

	async searchKategori(data) {
		return await this.postApi('/kategori/search', data)
	}

	async getKategori() {
		let response = await this.getApi(`/kategori`)
		return response.data
	}

	async getKategoriById(id) {
		return await this.getApi(`/kategori/${id}`)
	}
	
	async searchNegara(data) {
		return await this.postApi('/negara/search', data)
	}

	async getNegaraByCode(code) {
		return await this.getApi(`/negara/${code}`)
	}

	async searchBandara(data) {
		return await this.postApi('/bandara/search', data)
	}

	async getBandaraByCode(code) {
		return await this.getApi(`/bandara/${code}`)
	}

	async getKlasifikasiKepercayaan() {
		return await this.getApi(`/kepercayaan`)
	}

	async getKlasifikasiValiditas() {
		return await this.getApi(`/validitas`)
	}

	async getListJabatan() {
		return await this.getApi('/jabatan')
	}
}

export default new API