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
		let doc = response.data.data
		return doc
	}

	async getDisplayDataById(doc_type, doc_id) {
		return await this.getApi(`/${doc_type}/${doc_id}/display`)
	}

	async getBasicDataById(doc_type, doc_id) {
		let response = await this.getApi(`/${doc_type}/${doc_id}/basic`)
		let doc = response.data.data
		return doc
	}

	async getFormDataById(doc_type, doc_id) {
		return await this.getApi(`/${doc_type}/${doc_id}/form`)
	}

	async getPdfDataById(doc_type, doc_id) {
		return await this.getApi(`/${doc_type}/${doc_id}/pdf`)
	}

	async getObjek(doc_type, doc_id) {
		let response = await this.getApi(`/${doc_type}/${doc_id}/objek`)
		let objek = response.data
		return objek
	}

	async getPenindakanById(penindakan_id) {
		let response = await this.getApi(`/penindakan/${penindakan_id}`)
		let penindakan = response.data.data
		return penindakan
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
		return await this.postApi(`/${doc_type}/search`, search_query)
	}

	async deleteDoc(doc_type, doc_id) {
		return await this.delApi(`/${doc_type}/${doc_id}`)
	}

	async getRelatedDocuments(doc_type, doc_id) {
		return await this.getApi(`/${doc_type}/${doc_id}/docs`)
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

	/*
	|--------------------------------------------------------------------------
	| API for references
	|--------------------------------------------------------------------------
	*/

	async getGrupLokasi() {
		return await this.getApi('/lokasi')
	}

	async searchSatuan(data) {
		return await this.postApi('/satuan/search', data)
	}

	async getSatuanById(id) {
		return await this.getApi(`/satuan/${id}`)
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
		return await this.getApi(`/kategori`)
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
}

export default new API