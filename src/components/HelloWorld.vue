<template>
	<div>
		<h2 class="">{{ store.helloPinia}}</h2>
		
		<el-button type="primary" @click="cs">set</el-button>
		<el-input></el-input>
	</div>
</template>

<script setup lang="ts">
	import { mainStore } from "@/store";
	import { get } from '@/net'
	import router from "../router";
	const store = mainStore();
	// console.log(store.router)
	// const cs = () => {
	// 	store.setHelloPinia("Hello Mieriki!")
	// 	get("/menus/get/router/1", (data: any) => {
	// 		console.log(data)
	// 		store.setRouter(data)
	// 		console.log(store.router)
	// 	})
	// }
	
	
	console.log(router.getRoutes())
	  
</script>


<style scoped>

</style>