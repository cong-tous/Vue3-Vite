<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutFixed from './components/LayoutFixed.vue'
import { categoryStore } from '@/stores/category'
import { onMounted } from 'vue'

const useCategoryStore =categoryStore()

onMounted(()=>{
    useCategoryStore.getCategoryList()
})
</script>
<template>
    <div>
        <LayoutFixed/>
        <LayoutNav/>
        <LayoutHeader/>
        <!-- 二级路由出口 -->
        <!-- 添加key 破坏复用机制 强制销毁重建 以更新数据 -->
        <!-- <RouterView :key="$route.fullPath"/> -->
        <RouterView />
        <LayoutFooter/>
    </div>
</template>