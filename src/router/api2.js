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
		axios.post(`${this.base_url}${url}`, data)
	}

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
}

export default new API