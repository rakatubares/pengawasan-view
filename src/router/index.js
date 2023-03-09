import Cookie from 'cookie'
import Vue from 'vue'
import Router from 'vue-router'
import Store from '../store'
import Permission from '../helpers/permission'

// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views
const Homepage = () => import('@/views/Homepage')

// Views - Intelijen
const PageLkai = () => import('@/views/intelijen/lkai/PageLkai.vue')
const PageLkaiN = () => import('@/views/intelijen/lkai/PageLkaiN.vue')
const PageLppi = () => import('@/views/intelijen/lppi/PageLppi.vue')
const PageLppiN = () => import('@/views/intelijen/lppi/PageLppiN.vue')
const PageNhi = () => import('@/views/intelijen/nhi/PageNhi.vue')
const PageNhiN = () => import('@/views/intelijen/nhin/PageNhiN.vue')
const PageNi = () => import('@/views/intelijen/ni/PageNi.vue')
const PageNiN = () => import('@/views/intelijen/ni/PageNiN.vue')

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

// Views - Penyidikan
const PageLhp = () => import('@/views/penyidikan/lhp/PageLhp')
const PageLpf = () => import('@/views/penyidikan/lpf/PageLpf')
const PageLpp = () => import('@/views/penyidikan/lpp/PageLpp.vue')
const PageSplit = () => import('@/views/penyidikan/split/PageSplit.vue')

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
					path: 'bast',
					name: 'BAST',
					component: PageBast,
					beforeEnter: (to, from, next) => {
						checkRoutePermission('view-bast', next)
					},
				},
				{
					path: 'bhp',
					name: 'Penarikan BHP',
					component: PageBhp,
					beforeEnter: (to, from, next) => {
						checkRoutePermission('view-bhp', next)
					},
				},
				{
					path: 'bukapengaman',
					name: 'BA Pembukaan Tanda Pengaman',
					component: PageBukaPengaman,
					beforeEnter: (to, from, next) => {
						checkRoutePermission('view-buka-pengaman', next)
					},
				},
				{
					path: 'bukasegel',
					name: 'BA Buka Segel',
					component: PageBukaSegel,
					beforeEnter: (to, from, next) => {
						checkRoutePermission('view-buka-segel', next)
					},
				},
				{
					path: 'contoh',
					name: 'BA Contoh Barang',
					component: PageContoh,
					beforeEnter: (to, from, next) => {
						checkRoutePermission('view-contoh', next)
					},
				},
				{
					path: 'lap',
					name: 'LAP',
					component: PageLap,
					beforeEnter: (to, from, next) => {
						checkRoutePermission('view-lap', next)
					},
				},
				{
					path: 'lhp',
					name: 'LHP',
					component: PageLhp,
					beforeEnter: (to, from, next) => {
						checkRoutePermission('view-lhp', next)
					},
				},
				{
					path: 'li',
					name: 'LI-1',
					component: PageLi,
					beforeEnter: (to, from, next) => {
						checkRoutePermission('view-li', next)
					},
				},
				{
					path: 'lkai',
					name: 'LKAI',
					component: PageLkai,
					beforeEnter: (to, from, next) => {
						checkRoutePermission('view-lkai', next)
					},
				},
				{
					path: 'lkain',
					name: 'LKAI-N',
					component: PageLkaiN,
					beforeEnter: (to, from, next) => {
						checkRoutePermission('view-lkain', next)
					},
				},
				{
					path: 'lp',
					name: 'LP',
					component: PageLp,
					beforeEnter: (to, from, next) => {
						checkRoutePermission('view-lp', next)
					},
				},
				{
					path: 'lpf',
					name: 'LPF',
					component: PageLpf,
					beforeEnter: (to, from, next) => {
						checkRoutePermission('view-lpf', next)
					},
				},
				{
					path: 'lpn',
					name: 'LP-N',
					component: PageLpN,
					beforeEnter: (to, from, next) => {
						checkRoutePermission('view-lpn', next)
					},
				},
				{
					path: 'lphp',
					name: 'LPHP',
					component: PageLphp,
					beforeEnter: (to, from, next) => {
						checkRoutePermission('view-lphp', next)
					},
				},
				{
					path: 'lphpn',
					name: 'LPHP-N',
					component: PageLphpN,
					beforeEnter: (to, from, next) => {
						checkRoutePermission('view-lphpn', next)
					},
				},
				{
					path: 'lpp',
					name: 'LPP',
					component: PageLpp,
					beforeEnter: (to, from, next) => {
						checkRoutePermission('view-lpp', next)
					},
				},
				{
					path: 'lppi',
					name: 'LPPI',
					component: PageLppi,
					beforeEnter: (to, from, next) => {
						checkRoutePermission('view-lppi', next)
					},
				},
				{
					path: 'lppin',
					name: 'LPPI-N',
					component: PageLppiN,
					beforeEnter: (to, from, next) => {
						checkRoutePermission('view-lppin', next)
					},
				},
				{
					path: 'nhi',
					name: 'NHI',
					component: PageNhi,
					beforeEnter: (to, from, next) => {
						checkRoutePermission('view-nhi', next)
					},
				},
				{
					path: 'nhin',
					name: 'NHI-N',
					component: PageNhiN,
					beforeEnter: (to, from, next) => {
						checkRoutePermission('view-nhin', next)
					},
				},
				{
					path: 'ni',
					name: 'NI',
					component: PageNi,
					beforeEnter: (to, from, next) => {
						checkRoutePermission('view-ni', next)
					},
				},
				{
					path: 'nin',
					name: 'NI-N',
					component: PageNiN,
					beforeEnter: (to, from, next) => {
						checkRoutePermission('view-nin', next)
					},
				},
				{
					path: 'pengaman',
					name: 'BA Tanda Pengaman',
					component: PagePengaman,
					beforeEnter: (to, from, next) => {
						checkRoutePermission('view-pengaman', next)
					},
				},
				{
					path: 'reekspor',
					name: 'BA Pengawasan Reekspor',
					component: PageReekspor,
					beforeEnter: (to, from, next) => {
						checkRoutePermission('view-reekspor', next)
					},
				},
				{
					path: 'riksa',
					name: 'Periksa',
					component: PageRiksa,
					beforeEnter: (to, from, next) => {
						checkRoutePermission('view-riksa', next)
					},
				},
				{
					path: 'riksabadan',
					name: 'BA Pemeriksaan Badan',
					component: PageRiksaBadan,
					beforeEnter: (to, from, next) => {
						checkRoutePermission('view-riksa-badan', next)
					},
				},
				{
					path: 'sbp',
					name: 'SBP',
					component: PageSbp,
					beforeEnter: (to, from, next) => {
						checkRoutePermission('view-sbp', next)
					},
				},
				{
					path: 'sbpn',
					name: 'SBP-N',
					component: PageSbpN,
					beforeEnter: (to, from, next) => {
						checkRoutePermission('view-sbpn', next)
					},
				},
				{
					path: 'segel',
					name: 'BA Segel',
					component: PageSegel,
					beforeEnter: (to, from, next) => {
						checkRoutePermission('view-segel', next)
					},
				},
				{
					path: 'split',
					name: 'SPLIT',
					component: PageSplit,
					beforeEnter: (to, from, next) => {
						checkRoutePermission('view-split', next)
					},
				},
				{
					path: 'titip',
					name: 'BA Penitipan',
					component: PageTitip,
					beforeEnter: (to, from, next) => {
						checkRoutePermission('view-titip', next)
					},
				},
				{
					path: 'tolak1',
					name: 'BA Penolakan SBP',
					component: PageTolak1,
					beforeEnter: (to, from, next) => {
						checkRoutePermission(['view-tolak1', 'view-tolak1n'], next)
					},
				},
				{
					path: 'tolak2',
					name: 'BA Penolakan TTD BA Penolakan SBP',
					component: PageTolak2,
					beforeEnter: (to, from, next) => {
						checkRoutePermission(['view-tolak2', 'view-tolak2n'], next)
					},
				},
			]
		},
	]
}

function checkRoutePermission(routePermissions, next, redirectRoute='Homepage') {
	let isPermitted = Permission.checkPermission(routePermissions)
	if (isPermitted) {
		next()
	} else {
		next({name: redirectRoute})
	}
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
			await Store.getters.sso.getUserInfo()
				.then((e) => {
					if (!e.data) {
						let login_url = process.env.VUE_APP_LOGIN_URL + '?appid=' + process.env.VUE_APP_ID
						window.location.replace(login_url);
					} else {
						Store.commit('set', ['userInfo', JSON.parse(JSON.stringify(e.data))])
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