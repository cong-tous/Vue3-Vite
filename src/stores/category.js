import { defineStore } from "pinia";
import { ref } from "vue";
import { getCategoryAPI } from '@/apis/layout'

export const categoryStore = defineStore('category',()=>{
    // state 导航列表数据
    const categoryList =ref([])

    // action 获取导航数据的方法
    const getCategoryList=async ()=>{
        const res =await getCategoryAPI()
        categoryList.value = res.result
    }
    return{
        categoryList,
        getCategoryList
    }
})