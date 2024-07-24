import axios from "axios";
import { ElMessage, MessageParamsWithType } from "element-plus";

function accessHeader() {
	return {}
}

const defaultError = (error: any) => {
    console.error(error)
    ElMessage.error('发生了一些错误，请联系管理员')
}

const defaultFailure = (message: MessageParamsWithType, status: any, url: any) => {
    console.warn(`请求地址: ${url}, 状态码: ${status}, 错误信息: ${message}`)
    ElMessage.warning(message)
}

const getMenuRouter = (router: any,store: any) => {
	console.log("正在初始化工作列表......")
	console.log(store.state)
	// if (store.router.length > 0) {
	// 	return
	// }
	// get("/menus/get/router/1", (data: any) => {
	// 	console.log(data)
	// 	store.setRouter(data)
	// 	console.log(store.router)
	// })
}

function analysisCode(code: number) {
	if (code === 200) {
		return true
	} 
	return false
}

function internalPost(url: string, data: any, headers: {}, success: (arg0: any) => void, failure: { (message: MessageParamsWithType, status: any, url: any): void; (arg0: any, arg1: any, arg2: any): void; }, error = defaultError){
    axios.post(url, data, { headers: headers }).then(({data}) => {
        if(analysisCode(data.code))
            success(data.data)
        else
            failure(data.message, data.code, url)
    }).catch(err => error(err))
}

function internalGet(url: string, headers: {}, success: (arg0: any) => void, failure: { (message: MessageParamsWithType, status: any, url: any): void; (arg0: any, arg1: any, arg2: any): void; }, error = defaultError){
    axios.get(url, { headers: headers }).then(({data}) => {
        if(analysisCode(data.code))
            success(data.data)
        else
            failure(data.message, data.code, url)
    }).catch(err => error(err))
}

function post(url: string, data: any, success: (arg0: any) => void, failure = defaultFailure) {
    internalPost(url, data, accessHeader() , success, failure)
}

function get(url: string, success: (arg0: any) => void, failure = defaultFailure) {
    internalGet(url, accessHeader(), success, failure)
}

export { post, get, accessHeader, getMenuRouter }
