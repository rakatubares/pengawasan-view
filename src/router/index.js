import Vue from 'vue'
import Router from 'vue-router'

// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views
const Homepage = () => import('@/views/Homepage')

// Views - Penindakan
const PageSbp = () => import('@/views/penindakan/sbp/PageSbp')
const PageSegel = () => import('@/views/penindakan/segel/PageSegel')

Vue.use(Router)

export default new Router({
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
			]
		},
	]
}

