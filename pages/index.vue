/**
* pages/index.vue - 网站首页
* 包含了网站的主要展示内容，包括Hero区域、产品特性、作品展示和行动号召等部分
*/
<script setup lang="ts">
// 导入 SEO 相关的组合式函数
import { useSeo } from "~/composables/useSeo"

// 获取 SEO 更新方法
const { updatePageSeo } = useSeo()

// 更新首页的 SEO 信息
// 'home' 参数对应 i18n 中定义的首页 SEO 配置
updatePageSeo("home")
</script>

<template>
  <!-- 页面主容器 -->
  <div>
    <!-- 主要内容区域 -->
    <main>
      <!-- Hero 区域组件 -->
      <!-- 展示网站的主要标语和核心价值主张 -->
      <BlockHero />

      <!-- 产品特性组件 -->
      <!-- 展示产品的主要功能和特点 -->
      <BlockFeature />

      <!-- 作品展示组件 -->
      <!-- 展示产品案例或用户作品 -->
      <BlockShowcase />

      <!-- 行动号召组件 -->
      <!-- 引导用户采取下一步行动，如注册、下载等 -->
      <BlockCTA />
    </main>
  </div>
</template>

<style scoped>
/**
 * 页面级样式
 * 使用 scoped 属性确保样式只应用于当前组件
 */
</style>
