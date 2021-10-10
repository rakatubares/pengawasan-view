import Vue from 'vue'
import Router from 'vue-router'

// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views
const Homepage = () => import('@/views/Homepage')

// Views - Sbp
const SbpInput = () => import('@/views/penindakan/SbpInput')
const SbpInput2 = () => import('@/views/penindakan/SbpInput2')

const Test = () => import('@/views/Test')

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
					component: SbpInput
				},
				{
					path: 'sbp2',
					name: 'SBP2',
					component: SbpInput2
				},
				{
					path: 'test',
					name: 'TEST',
					component: Test
				}
			]
		},
	]
}

