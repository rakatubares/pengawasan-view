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

	async getApi(url) {
		let response =  await axios.get(`${this.base_url}${url}`, this.config)
		return response
	}

	postApi(url, data) {
		let response = axios.post(`${this.base_url}${url}`, data)
		return response
	}

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

	async getUserByRole(role) {
		let response = await this.getApi(`/user/role/${role}`)
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
		let response = await this.getApi(`/${doc_type}/${doc_id}/barang/item`)
		let objek = response.data.data.item
		return objek
	}

	upsertDetail(doc_type, doc_id, detail_type, data) {
		let response = this.postApi(`/${doc_type}/${doc_id}/${detail_type}/upsert`, data)
		return response
	}

	upsertLinkedDoc(doc_type, doc_id, data) {
		let response = this.postApi(`/${doc_type}/${doc_id}/storelinked`, data)
		return response
	}
}

export default new API