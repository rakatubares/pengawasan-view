import Cookie from 'cookie'
import Vue from 'vue'
import Router from 'vue-router'
import Store from '../store'

// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views
const Homepage = () => import('@/views/Homepage')

// Views - Penindakan
const PageTitip = () => import('@/views/penindakan/titip/PageTitip')

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
					path: 'titip',
					name: 'Penitipan',
					component: PageTitip
				},
			]
		},
	]
}

router.beforeEach(async (to, from, next) => {
	var env = process.env.VUE_APP_MODE

	if (env == 'production') {
		var cookies = Cookie.parse(document.cookie)
		var token = cookies.sso_token_1

		var tries = 0
		while ((typeof token === 'undefined' || !token) && tries <= 100) {
			// welp, not attached yet. force attachment
			await Store.getters.sso.attach()
			cookies = Cookie.parse(document.cookie)
			token = cookies.sso_token_3
		}

		if (typeof token === 'undefined' || !token) {
			await Store.getters.sso.attach()
			cookies = Cookie.parse(document.cookie)
			token = cookies.sso_token_3
		} else {
			Store.getters.sso.getUserInfo()
				.then((e) => {
					if (!e.data) {
						window.location.replace("http://ssologin.local/login?appid=3");
					} else {
						console.log(e)
					}
				})
		}
	}
	
	next()
})

export default router