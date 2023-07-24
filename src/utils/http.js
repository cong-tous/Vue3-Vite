// axios基础的封装
import axios from "axios";
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import { useUserStore } from "@/stores/user";
// vue3不能在setup外使用 useRouter (useRouter是Vue3中Composition API函数，它只能在Vue3组件的setup函数中使用)
import router from "@/router";

const httpInstance = axios.create({
    baseURL:'http://pcapi-xiaotuxian-front-devtest.itheima.net',
    timeout:5000
})

//拦截器

// axios请求拦截器
httpInstance.interceptors.request.use(config => {
    // 1.从pinia获取token数据
    const userStore =useUserStore()
    // 2.按照后端的要求拼接token数据
    const token =userStore.userInfo.token
    if(token){
        //别丢空格
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, e => Promise.reject(e))

    // axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
    const userStore =useUserStore()
    // 统一错误提示
    ElMessage({
        type:'warning',
        message:e.response.data.message
    })
    // 401 token 失效处理
    if(e.response.status===401){
        // 1.清除本地用户数据
        userStore.clearUserInfo()
        // 2.跳转到登录页面
        router.push('/login')
    }
    return Promise.reject(e)
})

export default httpInstance