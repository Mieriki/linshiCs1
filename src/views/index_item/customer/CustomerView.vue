<template>
	<div style="margin-bottom: 10px;">
		<el-row>
			<el-input v-model="searchValue.name" style="width: 240px;" size="small" placeholder="请输入名称" type="text">
				<template #prepend>
					<el-button @click="handleSearch" :icon="Search" />
				</template>
			</el-input>
			<el-button  @click="handleSearch" style="margin-left: 5px; width: 75px; height: 32px;" size="small" type="primary">搜索</el-button>
			
			<el-button type="primary" style="width: 80px; height: 32px;" size="small" @click="nextAdd">新增<el-icon><CirclePlus /></el-icon></el-button>
			<el-button type="danger" style="margin-left: 5px; width: 80px; height: 32px;" size="small" @click="handleDeleteAccounts">批量删除<el-icon><Remove /></el-icon></el-button>
			<el-upload 
				list-type="text"
				accept=".xls, .xlsx"
				:file-list="fileList"
				:headers="headers"
				:action="postUrl"
				:multiple="false"
				:show-file-list="false"
				:on-success="uploadSuccess">
				<el-button type="primary" style="margin-left: 5px; width: 80px; height: 32px;" size="small">导入<el-icon><Download /></el-icon></el-button>
			</el-upload>
			<el-button type="primary" style="margin-left: 5px; width: 80px; height: 32px;" size="small" @click="exportData">导出<el-icon><Upload /></el-icon></el-button>
		</el-row>
	</div>
	
	<el-table :data="customerList" border :header-cell-class-name="headerBg" @selection-change="handleSelectionChange" max-height=530>
		<el-table-column type="selection" width="55"/>
		<el-table-column prop="id" label="客户编号" width="100">
		</el-table-column>
		<el-table-column prop="name" label="客户名称" width="250">
		</el-table-column>
		<el-table-column prop="contact" label="联系人" width="140">
		</el-table-column>
		<el-table-column prop="number" label="电话" width="200">
		</el-table-column>
		<el-table-column prop="remarks" label="备注" width="300">
		</el-table-column>
		<el-table-column label="操作" fixed="right">
			<template #default="scope">
				<el-button size="small" type="warning" @click="handleEdit(scope.row)">编辑</el-button>
				<el-button type="danger" size="small" @click="handleDeleteAccount(scope.row)">删除</el-button>
			</template>
		</el-table-column>
	</el-table>
</template>

<script setup lang="ts">
	//导入依赖
	import { ref, onMounted, reactive } from 'vue';
	import { Search, CirclePlus, Remove, Download, Upload } from '@element-plus/icons-vue';
	import { get, post, accessHeader } from '@/net';
	import router from '@/router';
	
	// 响应式数据定义
	let customerList = ref([]);
	const addDialogVisible = ref(false)
	const editDialogVisible = ref(false)
	const accountId = ref(null)

	
	const count = ref(0)
	
	let searchValue = reactive({
		name: '',
		currentPage: 1,
		pageSize: 10
	})
	
	let fileName = ref("multipartFiles")
	let headers =ref(accessHeader())
	let fileList =ref([])
	let postUrl = ref("")
		
	const formRef = ref()
	// 页面初始化加载数据
	onMounted(() => {
		
		initializePage();
	});
	
	// 初始化页面数据
	function initializePage() {
		get(`/customers/get`, (data) => {
			customerList.value = data
		})
	};
	
	function handleClose() {
		
	}
</script>

<style scoped>
</style>