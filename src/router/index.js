import Cookie from 'cookie'
import Vue from 'vue'
import Router from 'vue-router'
import Store from '../store'

// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views
const Homepage = () => import('@/views/Homepage')

// Views - Penindakan
const PageSbp = () => import('@/views/penindakan/sbp/PageSbp')
const PageSegel = () => import('@/views/penindakan/segel/PageSegel')
const PageBukaSegel = () => import('@/views/penindakan/bukasegel/PageBukaSegel')
const PageTitip = () => import('@/views/penindakan/titip/PageTitip')
const PageTegah = () => import('@/views/penindakan/tegah/PageTegah')

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
					path: 'sbp',
					name: 'SBP',
					component: PageSbp
				},
				{
					path: 'segel',
					name: 'Segel',
					component: PageSegel
				},
				{
					path: 'bukasegel',
					name: 'BukaSegel',
					component: PageBukaSegel
				},
				{
					path: 'titip',
					name: 'Penitipan',
					component: PageTitip
				},
				{
					path: 'tegah',
					name: 'Penegahan',
					component: PageTegah
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