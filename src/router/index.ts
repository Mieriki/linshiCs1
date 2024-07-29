import { createRouter, createWebHistory } from 'vue-router'
import { useMeanStore } from '../store'
import { getMenuRouter, getUserInfo } from '../net'

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
					component: () => import('@/views/index_view/HomeView.vue')
				}
			]
		}, {
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

async function fetchMenuData() {
	try {
		const data = await getMenuRouter();
		console.log('Data received:', data);
		return data
	} catch (error) {
		console.error('Error fetching menu router:', error);
		// 处理请求失败的情况
	}
}

async function fetchUserData() {
	try {
		const data = await getUserInfo();
		console.log('Data received:', data);
		return data
	} catch (error) {
		console.error('Error fetching user router:', error);
		// 处理请求失败的情况
	}
}

router.beforeEach((to, from, next) => {
	const meanStore = useMeanStore()
	console.log('hasRoute', meanStore.hasRoute)
	if (!meanStore.hasRoute) {
		console.log("正在初始化菜单.......")
		fetchUserData().then((userInfo) => {
			meanStore.setUserInfo(userInfo)
		})
		fetchMenuData().then((routerList) => {
			// console.log('routerList', routerList)
			meanStore.setMenuList(routerList)
			routerList.forEach((menu : { children : any[]; }) => {
				if (menu.children) {
					menu.children.forEach((e : any) => {
						if (!e.component) {
							return
						}
						let route : any = {
							name: e.name,
							path: e.path,
							component: () => import('../views' + e.component + '.vue')
						}
						router.addRoute("index", route)
					})
				}
			})
		})
		meanStore.changeRouteStatus(true)
	}
	next()
})

export default router