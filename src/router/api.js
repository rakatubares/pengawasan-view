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
api.getSegel = () => {return base_url + '/segel'}
api.getSegelById = (id) => {return base_url + '/segel/' + id}
api.getSegelComplete = (id) => {return base_url + '/segel/' + id + '/complete'}
api.publishSegel = (id) => {return base_url + '/segel/' + id + '/publish'}

api.bukaSegel = () => {return base_url + '/bukasegel'}
api.bukaSegelId = (id) => {return api.bukaSegel() + '/' + id}
api.bukaSegelComplete = (id) => {return api.bukaSegelId(id) + '/complete'}
api.publishBukaSegel = (id) => {return api.bukaSegelId(id) + '/publish'}

export default api