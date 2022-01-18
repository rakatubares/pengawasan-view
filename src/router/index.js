import Cookie from 'cookie'
import Vue from 'vue'
import Router from 'vue-router'
import Store from '../store'

// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views
const Homepage = () => import('@/views/Homepage')

// Views - Penindakan
const PageBast = () => import('@/views/penindakan/bast/PageBast')
const PageBukaPengaman = () => import('@/views/penindakan/bukapengaman/PageBukaPengaman')
const PageBukaSegel = () => import('@/views/penindakan/bukasegel/PageBukaSegel')
const PageLp = () => import('@/views/penindakan/lp/PageLp')
const PageLphp = () => import('@/views/penindakan/lphp/PageLphp')
const PagePengaman = () => import('@/views/penindakan/pengaman/PagePengaman')
const PageRiksa = () => import('@/views/penindakan/riksa/PageRiksa')
const PageSbp = () => import('@/views/penindakan/sbp/PageSbp')
const PageSegel = () => import('@/views/penindakan/segel/PageSegel')

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
					path: 'lphp',
					name: 'LPHP',
					component: PageLphp
				},
				{
					path: 'lp',
					name: 'LP',
					component: PageLp
				},
				{
					path: 'riksa',
					name: 'Periksa',
					component: PageRiksa
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
				}
				// {
				// 	path: 'titip',
				// 	name: 'Penitipan',
				// 	component: PageTitip
				// },
				// {
				// 	path: 'tegah',
				// 	name: 'Penegahan',
				// 	component: PageTegah
				// },
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