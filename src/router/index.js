import Cookie from 'cookie'
import Vue from 'vue'
import Router from 'vue-router'
import Store from '../store'
import Permission from '../helpers/permission'

// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views
const Homepage = () => import('@/views/Homepage')

// Views - Penindakan
const PageBhp = () => import('@/views/monitoring/penarikan_bhp/PageBhp')
const PageLp = () => import('@/views/penindakan/lp/PageLp')
const PageLpN = () => import('@/views/penindakan/lpn/PageLpN')
const PageLphp = () => import('@/views/penindakan/lphp/PageLphp')
const PageLphpN = () => import('@/views/penindakan/lphp/PageLphpN')
const PageSbp = () => import('@/views/penindakan/sbp/PageSbp')
const PageSbpN = () => import('@/views/penindakan/sbp/PageSbpN')
const PageSegel = () => import('@/views/penindakan/segel/PageSegel')

// View - Penyidikan
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
					path: 'bhp',
					name: 'Penarikan BHP',
					component: PageBhp,
					beforeEnter: (to, from, next) => {
						checkRoutePermission('view-bhp', next)
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