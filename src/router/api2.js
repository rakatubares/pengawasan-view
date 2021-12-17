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

	async insertDetail(doc_type, doc_id, detail_type, data) {
		return await this.postApi(`/${doc_type}/${doc_id}/${detail_type}`, data)
	}

	async updateDetail(doc_type, doc_id, detail_type, detail_id, data) {
		return await this.putApi(`/${doc_type}/${doc_id}/${detail_type}/${detail_id}`, data)
	}

	upsertLinkedDoc(doc_type, doc_id, data) {
		return this.postApi(`/${doc_type}/${doc_id}/storelinked`, data)
	}
}

export default new API