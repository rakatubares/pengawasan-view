let base_url = process.env.VUE_APP_BASEAPI
let api = {}

// API for references
api.getSprint = () => {return base_url + '/sprint'}
api.getSprintById = (id) => {return base_url + '/sprint/' + id}
api.searchSprint = () => {return base_url + '/sprint/search'}

api.getEntitas = () => {return base_url + '/entitas'}
api.getEntitasById = (id) => {return base_url + '/entitas/' + id}
api.searchEntitas = () => {return base_url + '/entitas/search'}

api.user = () => {return base_url + '/user'}

api.getJabatan = () => {return base_url + '/jabatan'}

// API for details
api.getSarkutById = (doc_type, doc_id) => {return base_url + '/' + doc_type + '/' + doc_id + '/sarkut'}

api.getBarangById = (doc_type, doc_id) => {return base_url + '/' + doc_type + '/' + doc_id + '/barang'}
api.upsertBarang = (doc_type, doc_id) => {return api.getBarangById(doc_type, doc_id) + '/upsert'}

api.getBangunanById = (doc_type, doc_id) => {return base_url + '/' + doc_type + '/' + doc_id + '/bangunan'}

api.getBadanById = (doc_type, doc_id) => {return base_url + '/' + doc_type + '/' + doc_id + '/badan'}

// API for documents
api.sbp = () => {return base_url + '/sbp'}
api.sbpId = (id) => {return api.sbp() + '/' + id}
api.sbpComplete = (id) => {return api.sbpId(id) + '/complete'}
api.publishSbp = (id) => {return api.sbpId(id) + '/publish'}

api.getSegel = () => {return base_url + '/segel'}
api.getSegelById = (id) => {return base_url + '/segel/' + id}
api.getSegelComplete = (id) => {return base_url + '/segel/' + id + '/complete'}
api.publishSegel = (id) => {return base_url + '/segel/' + id + '/publish'}

api.getBukaSegel = () => {return base_url + '/bukasegel'}
api.getBukaSegelById = (id) => {return api.getBukaSegel() + '/' + id}
api.getBukaSegelComplete = (id) => {return api.getBukaSegelById(id) + '/complete'}
api.publishSegel = (id) => {return api.getBukaSegelById(id) + '/publish'}

api.getPenitipan = () => {return base_url + '/titip'}
api.getPenitipanById = (id) => {return api.getPenitipan() + '/' + id}
api.getPenitipanComplete = (id) => {return api.getPenitipanById(id) + '/complete'}
api.publishPenitipan = (id) => {return api.getPenitipanById(id) + '/publish'}

api.getPenegahan = () => {return base_url + '/tegah'}
api.getPenegahanById = (id) => {return api.getPenegahan() + '/' + id}
api.getPenegahanComplete = (id) => {return api.getPenegahanById(id) + '/complete'}
api.publishPenegahan = (id) => {return api.getPenegahanById(id) + '/publish'}

export default api