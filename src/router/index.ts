import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'index',
			component: () => import('@/views/IndexView.vue'),
			children: [
				{
					path: '/',
					name: 'index-首页',
					component: () => import('@/views/index_item/HomeView.vue')
				}, {
					path: '/customer',
					name: 'index-客户管理',
					component: () => import('@/views/index_item/customer/CustomerView.vue')
				}
			]
		},{
			path: '/welcome',
			name: 'welcome',
			component: () => import('@/views/WelcomeView.vue'),
			children: [
				{
					path: '',
					name: 'welcome-form',
					component: () => import('@/views/welcome/FormView.vue'),
					children: [
						{
							path: 'login',
							name: 'welcome-login',
							component: () => import('@/views/welcome/LoginPage.vue')
						},
					]
				}
			]
		}, {
			path: '/test',
			name: 'test',
			component: () => import('@/components/HelloWorld.vue')
		},
	]
})

router.beforeEach((to, from, next) => {
	next()
})

export default router