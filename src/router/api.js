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

export default api