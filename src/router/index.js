import Cookie from 'cookie'
import Vue from 'vue'
import Router from 'vue-router'
import Store from '../store'

// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views
const Homepage = () => import('@/views/Homepage')

// Views - Intelijen
const PageLkai = () => import('@/views/intelijen/lkai/PageLkai.vue')
const PageLppi = () => import('@/views/intelijen/lppi/PageLppi.vue')

// Views - Penindakan
const PageBast = () => import('@/views/penindakan/bast/PageBast')
const PageBhp = () => import('@/views/monitoring/penarikan_bhp/PageBhp')
const PageBukaPengaman = () => import('@/views/penindakan/bukapengaman/PageBukaPengaman')
const PageBukaSegel = () => import('@/views/penindakan/bukasegel/PageBukaSegel')
const PageContoh = () => import('@/views/penindakan/contoh/PageContoh')
const PageLap = () => import('@/views/penindakan/lap/PageLap')
const PageLi = () => import('@/views/penindakan/li/PageLi')
const PageLp = () => import('@/views/penindakan/lp/PageLp')
const PageLpN = () => import('@/views/penindakan/lpn/PageLpN')
const PageLphp = () => import('@/views/penindakan/lphp/PageLphp')
const PageLphpN = () => import('@/views/penindakan/lphp/PageLphpN')
const PagePengaman = () => import('@/views/penindakan/pengaman/PagePengaman')
const PageReekspor = () => import('@/views/penindakan/reekspor/PageReekspor')
const PageRiksa = () => import('@/views/penindakan/riksa/PageRiksa')
const PageRiksaBadan = () => import('@/views/penindakan/riksabadan/PageRiksaBadan')
const PageSbp = () => import('@/views/penindakan/sbp/PageSbp')
const PageSbpN = () => import('@/views/penindakan/sbp/PageSbpN')
const PageSegel = () => import('@/views/penindakan/segel/PageSegel')
const PageTitip = () => import('@/views/penindakan/titip/PageTitip')
const PageTolak1 = () => import('@/views/penindakan/tolak1/PageTolak1')
const PageTolak2 = () => import('@/views/penindakan/tolak2/PageTolak2')

Vue.use(Router)

const router =  new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
})

function configRoutes () {
	return [
		{
			path: '/',
			redirect: '/homepage',
			name: 'Home',
			component: TheContainer,
			children: [
				{
					path: 'homepage',
					name: 'Homepage',
					component: Homepage
				},
				{
					path: 'bhp',
					name: 'Penarikan BHP',
					component: PageBhp
				},
				{
					path: 'lap',
					name: 'LAP',
					component: PageLap
				},
				{
					path: 'li',
					name: 'LI-1',
					component: PageLi
				},
				{
					path: 'lkai',
					name: 'LKAI',
					component: PageLkai
				},
				{
					path: 'sbp',
					name: 'SBP',
					component: PageSbp
				},
				{
					path: 'sbpn',
					name: 'SBP-N',
					component: PageSbpN
				},
				{
					path: 'tolak1',
					name: 'BA Penolakan SBP',
					component: PageTolak1
				},
				{
					path: 'tolak2',
					name: 'BA Penolakan TTD BA Penolakan SBP',
					component: PageTolak2
				},
				{
					path: 'lphp',
					name: 'LPHP',
					component: PageLphp
				},
				{
					path: 'lphpn',
					name: 'LPHP-N',
					component: PageLphpN
				},
				{
					path: 'lp',
					name: 'LP',
					component: PageLp
				},
				{
					path: 'lpn',
					name: 'LP-N',
					component: PageLpN
				},
				{
					path: 'lppi',
					name: 'LPPI',
					component: PageLppi
				},
				{
					path: 'riksa',
					name: 'Periksa',
					component: PageRiksa
				},
				{
					path: 'segel',
					name: 'BA Segel',
					component: PageSegel
				},
				{
					path: 'bukasegel',
					name: 'BA Buka Segel',
					component: PageBukaSegel
				},
				{
					path: 'titip',
					name: 'BA Penitipan',
					component: PageTitip
				},
				{
					path: 'pengaman',
					name: 'BA Tanda Pengaman',
					component: PagePengaman
				},
				{
					path: 'bukapengaman',
					name: 'BA Pembukaan Tanda Pengaman',
					component: PageBukaPengaman
				},
				{
					path: 'bast',
					name: 'BAST',
					component: PageBast
				},
				{
					path: 'contoh',
					name: 'BA Contoh Barang',
					component: PageContoh
				},
				{
					path: 'reekspor',
					name: 'BA Pengawasan Reekspor',
					component: PageReekspor
				},
				{
					path: 'riksabadan',
					name: 'BA Pemeriksaan Badan',
					component: PageRiksaBadan
				},
			]
		},
	]
}

router.beforeEach(async (to, from, next) => {
	var env = process.env.VUE_APP_MODE

	if (env != 'development') {
		let token_name = 'sso_token_' + process.env.VUE_APP_ID
		var cookies = Cookie.parse(document.cookie)
		var token = cookies[token_name]

		var tries = 0
		while ((typeof token === 'undefined' || !token) && tries <= 100) {
			// welp, not attached yet. force attachment
			await Store.getters.sso.attach()
			cookies = Cookie.parse(document.cookie)
			token = cookies[token_name]
		}

		if (typeof token === 'undefined' || !token) {
			await Store.getters.sso.attach()
			cookies = Cookie.parse(document.cookie)
			token = cookies[token_name]
		} else {
			// Store user info
			Store.getters.sso.getUserInfo()
				.then((e) => {
					if (!e.data) {
						let login_url = process.env.VUE_APP_LOGIN_URL + '?appid=' + process.env.VUE_APP_ID
						window.location.replace(login_url);
					} else {
						Store.commit('set', ['userInfo', e.data])
					}
				})

			// Store token
			Store.commit('set', ['token', token])
		}
	} else {
		console.log('DEVELOPMENT - NO SSO')
	}
	
	next()
})

export default router