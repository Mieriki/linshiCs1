import { defineStore } from 'pinia'

const mainStore = defineStore('main', {
	state: () => {
		return {
			helloPinia: 'Hello Pinia!',
			router: []
		}
	},
	getters: {},
	actions: {
		setHelloPinia(helloPinia: string) {
			setTimeout(() => {
				this.helloPinia = helloPinia
			}, 1000)
		},
		setRouter(router: never[]) {
			setTimeout(() => {
				this.router = router
			}, 1000)
		}

	}
})

export { mainStore }