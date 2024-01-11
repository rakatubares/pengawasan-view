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

	let token_name = 'sso_token_' + process.env.VUE_APP_ID
	var cookies = Cookie.parse(document.cookie)
	var token = cookies[token_name]

	var tries = 0
	while ((typeof token === 'undefined' || !token) && tries <= 100) {
		// welp, not attached yet. force attachment
		await Store.getters.sso.attach()
		cookies = Cookie.parse(document.cookie)
		token = cookies[token_name]

		// Store token
		Store.commit('set', ['token', token])
	}

	// Get user info
	var user = Store.getters.userInfo
	if (user == null) {
		if (env == 'development') {
			// Login for development environment
			Store.getters.sso.login()
		}

		// Store user info
		await Store.getters.sso.getUserInfo()
			.then((e) => {
				if (!e.data) {
					// Login for production environment
					let login_url = process.env.VUE_APP_LOGIN_URL + '?appid=' + process.env.VUE_APP_ID
					window.location.replace(login_url);
				} else {
					Store.commit('set', ['userInfo', JSON.parse(JSON.stringify(e.data))])
				}
			})
	}

	
	
	next()
})

export default router