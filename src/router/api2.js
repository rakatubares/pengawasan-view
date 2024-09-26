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
        return await axios.get(`${this.base_url}${url}`, this.config)
            .catch(function (error) { if (error.response.status == 401) { redirectToLogin() } })
    }
    async postApi(url, data) { 
        return await axios.post(`${this.base_url}${url}`, data, this.config) 
            .catch(function (error) { if (error.response.status == 401) { redirectToLogin() } })
    }
    async putApi(url, data) { 
        return await axios.put(`${this.base_url}${url}`, data, this.config)
            .catch(function (error) { if (error.response.status == 401) { redirectToLogin() } })
    }
    async delApi(url) { 
        return await axios.delete(`${this.base_url}${url}`, this.config)
            .catch(function (error) { if (error.response.status == 401) { redirectToLogin() } })
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

    async getListDocuments(doc_type, search_query) {
        let response = await this.postApi(`/doc/${doc_type}/index`, search_query)
        let list = response.data.data
        return list
    }

    async getDocumentById(doc_type, doc_id) {
        let response = await this.getApi(`/doc/${doc_type}/${doc_id}`)
        let doc = response.data
        return doc
    }

    async storeDoc(doc_type, data) {
        let response = await this.postApi(`/doc/${doc_type}`, data)
        let doc = response.data.data
        return doc
    }

    async updateDoc(doc_type, doc_id, data) {
        let response = await this.putApi(`/doc/${doc_type}/${doc_id}`, data)
        return response.data.data
    }

    async bookDoc(doc_type, doc_id) {
        await this.putApi(`/doc/${doc_type}/${doc_id}/book`)
    }

    async publishDoc(doc_type, doc_id) {
        await this.putApi(`/doc/${doc_type}/${doc_id}/publish`)
    }

    async searchDoc(doc_type, search_query) {
        return await this.postApi(`/doc/${doc_type}/search`, search_query)
    }

    async deleteDoc(doc_type, doc_id) {
        return await this.delApi(`/doc/${doc_type}/${doc_id}`)
    }

    async rollbackDoc(doc_type, doc_id, data) {
        await this.putApi(`/doc/${doc_type}/${doc_id}/rollback`, data)
    }

    async getDocumentsChain(doc_type, doc_id) {
        let response = await this.getApi(`/doc/${doc_type}/${doc_id}/chain`)
        return response.data
    }

    /*
    |--------------------------------------------------------------------------
    | API for details
    |--------------------------------------------------------------------------
    */

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
        let response = await this.postApi(`/entitas/orang`, data)
        return response.data
    }

    async updateEntitasOrang(data, id) {
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

    // Penindakan Sarkut
    async getPenindakanSarkut(penindakan_id) {
        let response = await this.getApi(`/penindakan/${penindakan_id}/sarkut`)
        return response.data
    }

    async savePenindakanSarkut(data, penindakan_id) {
        let response = await this.postApi(`/penindakan/${penindakan_id}/sarkut`, data)
        return response.data
    }

    async updatePenindakanSarkut(data, penindakan_id) {
        let response = await this.putApi(`/penindakan/${penindakan_id}/sarkut`, data)
        return response.data
    }

    // Penindakan Bangunan
    async getPenindakanBangunan(penindakan_id) {
        let response = await this.getApi(`/penindakan/${penindakan_id}/bangunan`)
        return response.data
    }

    async savePenindakanBangunan(data, penindakan_id) {
        let response = await this.postApi(`/penindakan/${penindakan_id}/bangunan`, data)
        return response.data
    }

    async updatePenindakanBangunan(data, penindakan_id) {
        let response = await this.putApi(`/penindakan/${penindakan_id}/bangunan`, data)
        return response.data
    }

    // Penindakan Badan
    async getPenindakanBadan(penindakan_id) {
        let response = await this.getApi(`/penindakan/${penindakan_id}/badan`)
        return response.data
    }

    async savePenindakanBadan(data, penindakan_id) {
        let response = await this.postApi(`/penindakan/${penindakan_id}/badan`, data)
        return response.data
    }

    async updatePenindakanBadan(data, penindakan_id) {
        let response = await this.putApi(`/penindakan/${penindakan_id}/badan`, data)
        return response.data
    }

    // Penindakan Barang
    async getPenindakanBarang(penindakan_id) {
        let response = await this.getApi(`/penindakan/${penindakan_id}/barang`)
        return response.data
    }

    async savePenindakanBarang(data, penindakan_id) {
        let response = await this.postApi(`/penindakan/${penindakan_id}/barang`, data)
        return response.data
    }

    async updatePenindakanBarang(data, penindakan_id) {
        let response = await this.putApi(`/penindakan/${penindakan_id}/barang`, data)
        return response.data
    }

    // Tindakan
    async saveTindakan(data, penindakan_id) {
        let response = await this.postApi(`/penindakan/${penindakan_id}/tindakan`, data)
        return response.data
    }

    async updateBhp(data, bhp_id) {
        let response = await this.putApi(`/bhp/${bhp_id}`, data)
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

    async getKemasan() {
        let response = await this.getApi(`/kemasan`)
        return response.data
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

    async getKategoriPelanggaran() {
        let response = await this.getApi(`/pelanggaran`)
        return response.data
    }

    async getSkemaPenindakan() {
        let response = await this.getApi(`/skema_penindakan`)
        return response.data
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

function redirectToLogin() {
    let login_url = process.env.VUE_APP_LOGIN_URL + '?appid=' + process.env.VUE_APP_ID
    window.location.replace(login_url);
}

export default new API