<template>
	<div>
		<el-container style="height: 100%;min-height: 100vh">
			<el-aside :width="sideWidth + 'px'" style="background-color: #00525f;min-height: 100%;box-shadow: 2px 0 6px rgba(0,21,41,.35); transition: 300ms;">
				<el-menu 
					:default-openeds="['1', '3']" style="height: 100%; overflow-x: hidden; transition: 300ms; border: none;"
				    background-color="#00525f"
				    text-color="#FFF"
				    active-text-color="#ffbc98"
				    :collapse-transition="false"
					:width="sideWidth + 'px'" 
				    :collapse="isCollapse"
					router>
					<div style="display: flex; align-items: center; justify-content: center; height: 60px;">
						<el-image src="https://t.tutu.to/img/mZhyw" alt=""
							style="width: 15px; position: relative; top: 5px; margin-right: 5px;"></el-image>
						<b style="color: #FFF;" v-show="logoTextShow">超市订单管理系统</b>
					</div>
					<el-menu-item index="/">
						<el-icon v-show="!logoTextShow" style="color: #b1b3b8;">
							<HomeFilled />
						</el-icon>
						<template #title>
							<component :is="HomeFilled" class="iconColor"></component>
							<span>首页</span>
						</template>
					</el-menu-item>
						<el-sub-menu index="1">
					    <template #title>
							<el-icon class="iconColor"><Menu /></el-icon>
							<span>基本资料维护</span>
					    </template>
						<el-menu-item index="/customer">
							<el-icon class="iconColor"><UserFilled /></el-icon> 
							<samp>客户管理</samp>
						</el-menu-item>	
					<!-- 	<el-menu-item index="/account">
							<el-icon class="iconColor"><UserFilled /></el-icon> 
							<samp>用户管理</samp>
						</el-menu-item>	
						<el-menu-item index="/provider">
							<el-icon class="iconColor"><OfficeBuilding /></el-icon>
							<samp>供应商管理</samp>
						</el-menu-item>	
						<el-menu-item index="/bill">
							<el-icon class="iconColor"><Van /></el-icon>
							<samp>订单管理</samp>
						</el-menu-item>	 -->
					</el-sub-menu>
					<!-- <el-sub-menu index="2">
					    <template #title>
							<el-icon class="iconColor"><TrendCharts /></el-icon>
							<span>数据分析</span>
					    </template>
						<el-menu-item index="/data">
							<el-icon class="iconColor"><Histogram /></el-icon>
							<samp>图表分析</samp>
						</el-menu-item>	
					</el-sub-menu> -->
				</el-menu>
			</el-aside>
			<el-container>
				<el-header style="font-size: 12px;border-bottom: 1px solid #CCC;line-height: 60px;display: flex;">
					<div style="flex: 1; font-size: 20px; cursor: pointer">
						<el-icon v-show="logoTextShow" @click="collape">
							<Fold />
						</el-icon>
						<el-icon v-show="!logoTextShow" @click="collape">
							<Expand />
						</el-icon>
					</div>
					<div class="dropdown-container">
						<el-dropdown>
							<div class="dropdown-content">
								<span style="margin-right: 5px; font-size: 14px;"> Mieriki </span>
								<!-- <el-icon><User /></el-icon> -->
								<el-avatar src="https://t.tutu.to/th/mKTGj" :size="25"></el-avatar>
							</div>
							<template #dropdown>
								<el-dropdown-menu>
									<el-dropdown-item @click="nextInfo">个人信息</el-dropdown-item>
									<el-dropdown-item @click="handleResetPassword">修改密码</el-dropdown-item>
									<el-dropdown-item @click="userLogout">退出登录</el-dropdown-item>
									<!-- <el-dropdown-item disabled>Action 4</el-dropdown-item>
									<el-dropdown-item divided>Action 5</el-dropdown-item> -->
								</el-dropdown-menu>
							</template>
						</el-dropdown>
					</div>
				</el-header>

				<el-main>
					<div style="margin-bottom: 30px">
						<el-breadcrumb separator="/">
							<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
							<template v-for="(item, index) in breadList" :key="index">
								<el-breadcrumb-item v-if="item.name && item.path"
									:to="item.path">{{ item.name }}</el-breadcrumb-item>
							</template>
						</el-breadcrumb>
					</div>

					<div class="content-container-box">
						<div class="content">
							<router-view v-slot="{ Component }" :key="$route.fullPath">
								<transition name="el-fade-in-linear" mode="out-in">
									<component :is="Component" style="height: 100%" />
								</transition>
							</router-view>
						</div>
					</div>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue'
	import { HomeFilled, Fold, Expand, Menu, User, UserFilled, OfficeBuilding, Van, Histogram, TrendCharts } from '@element-plus/icons-vue';
	import router from '../router';

	let logoTextShow: boolean = ref(true);
	let isCollapse: boolean = ref(false);
	let sideWidth: number = ref(200);
	
	
	
	// const newChildRoute = {
	//   path: 'cs',
	//   name: 'index-new-child',
	//   component: () => import('@/components/HelloWorld.vue')
	// };
		
		
	// // 添加新的孩子节点路由到 index 路由中
	// const indexRoute = router.options.routes.find(route => route.name === 'index');
	
	// if (indexRoute) {
	//   indexRoute.children = indexRoute.children || [];
	//   indexRoute.children.push(newChildRoute);
	  
	//   // 使用 addRoute 方法来动态添加路由
	//   router.addRoute('index', newChildRoute);
	// } else {
	//   console.error('Index route not found');
	// }
	
	// console.log(router.getRoutes())

	function collape() {
		isCollapse.value = !isCollapse.value;
		if (isCollapse.value) {
			sideWidth.value = 64;
			logoTextShow.value = false;
		} else {
			sideWidth.value = 200;
			logoTextShow.value = true;
		}
	}
	
	// watch(
	// 	() => ({
	// 		route: router.currentRoute.value,
	// 	}), (newValue, oldValue) => {
	// 		if (newValue.route.name.split('-').length > 1) {
	// 			breadList.value = [{ path: newValue.route.path, name: newValue.route.name.split('-')[1] }];
	// 		} else {
	// 			breadList.value = [];
	// 		}
	// 	}, { immediate: true, deep: true }
	// );
</script>

<style scoped>
	.dropdown-container {
		position: relative;
		width: 200px;
		/* 调整需要的宽度 */
		text-align: right;
		/* 将内容右对齐 */
		cursor: pointer;
		padding: 10px;
		/* 添加内边距 */
	}

	.dropdown-content {
		display: flex;
		justify-content: space-between;
		/* 在内容区域内平均分布元素 */
		align-items: center;
		/* 垂直居中 */
		padding: 10px;
		width: 100%;
		/* 使用全部宽度 */
	}

	.dropdown-menu {
		position: absolute;
		top: calc(100% + 5px);
		/* 下拉菜单相对于触发按钮底部位置 */
		right: 0;
		width: 150px;
		/* 调整需要的宽度 */
		text-align: left;
		/* 将下拉菜单左对齐 */
	}

	.example-showcase .el-dropdown-link {
		cursor: pointer;
		color: var(--el-color-primary);
		display: flex;
		align-items: center;
	}

	.iconColor {
		width: 18px;
		margin-left: 3px;
		margin-right: 10px;
		color: #b1b3b8;
	}

	.el-dropdown-link:focus-visible {
		outline: unset;
	}
</style>