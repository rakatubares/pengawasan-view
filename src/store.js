import SSO from '../src/helpers/sso'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  sidebarShow: 'responsive',
  sidebarMinimize: false,
  sso: new SSO(false),
  userInfo: null,
  token: null,
  jabatanOptions: null,
  jenisKegiatan: ['IMPOR', 'EKSPOR', 'PJT', 'PENUMPANG'],
  sifatSurat: ['SEGERA', 'SANGAT SEGERA'],
  klasifikasiSurat: ['RAHASIA', 'SANGAT RAHASIA'],
  kategoriBarang: null,
  satuanBarang: null,
}

const mutations = {
  toggleSidebarDesktop (state) {
    const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarOpened ? false : 'responsive'
  },
  toggleSidebarMobile (state) {
    const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarClosed ? true : 'responsive'
  },
  set (state, [variable, value]) {
    state[variable] = value
  }
}

const getters = {
	sso: state => { return state.sso },
	token: state => { return state.token },
	userInfo: state => { return state.userInfo },
	jabatanOptions: state => { return state.jabatanOptions },
	jenisKegiatan: state => { return state.jenisKegiatan },
	sifatSurat: state => { return state.sifatSurat },
	klasifikasiSurat: state => { return state.klasifikasiSurat },
	kategoriBarang: state => { return state.kategoriBarang },
	satuanBarang: state => { return state.satuanBarang },
}

export default new Vuex.Store({
  state,
  mutations,
  getters
})