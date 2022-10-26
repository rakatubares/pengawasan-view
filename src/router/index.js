import Cookie from 'cookie'
import Vue from 'vue'
import Router from 'vue-router'
import Store from '../store'
import Permission from '../helpers/permission'

// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views
const Homepage = () => import('@/views/Homepage')

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