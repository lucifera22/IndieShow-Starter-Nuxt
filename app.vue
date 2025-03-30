/**
* app.vue - 应用程序的根组件
* 这是整个应用的入口点，包含了全局布局和基础样式
*/
<script setup lang="ts">
// 使用 Vue 的组合式 API 和 TypeScript

// 获取颜色模式实例，用于管理明暗主题
// useColorMode 是 Nuxt 提供的组合式函数，用于主题切换
const colorMode = useColorMode()

// 设置 HTML 标签的 class，实现主题切换
// useHead 是 Nuxt 提供的组合式函数，用于管理 <head> 标签
useHead({
  htmlAttrs: {
    // 使用计算属性动态更新主题 class
    class: computed(() => colorMode.value),
  },
})
</script>

<template>
  <!-- 页面加载进度条组件 -->
  <UILoadingBar />

  <!-- 主要内容容器 -->
  <div>
    <!-- NuxtLayout：布局组件，用于包装页面内容 -->
    <NuxtLayout>
      <!-- NuxtPage：页面组件，根据路由动态加载页面 -->
      <NuxtPage />
    </NuxtLayout>

    <!-- 返回顶部按钮组件 -->
    <UIBackToTop />

    <!-- 全局通知组件 -->
    <UNotifications />
  </div>
</template>

<style>
/**
 * 全局样式定义
 * 使用 Tailwind CSS 的 @apply 指令应用工具类
 */

/* 自定义滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
  /* 垂直滚动条宽度 */
  height: 8px;
  /* 水平滚动条高度 */
}

/* 滚动条轨道样式 */
::-webkit-scrollbar-track {
  background: transparent;
}

/* 滚动条滑块样式 */
::-webkit-scrollbar-thumb {
  @apply bg-gray-300 dark:bg-gray-600;
  /* 明暗主题下的背景色 */
  border-radius: 4px;
  /* 圆角 */
}

/* 滚动条滑块悬停样式 */
::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-400 dark:bg-gray-500;
  /* 悬停时的背景色 */
}

/* 文本选中样式 */
::selection {
  @apply bg-primary-100 text-primary-900 dark:bg-primary-900 dark:text-primary-100;
}

/**
 * 主题切换动画
 * 使用 CSS View Transitions API 实现平滑的主题切换效果
 */
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

/* 亮色主题切换动画 */
::view-transition-old(root) {
  z-index: 1;
}

::view-transition-new(root) {
  z-index: 2;
}

/* 暗色主题切换动画 */
.dark::view-transition-old(root) {
  z-index: 2;
}

.dark::view-transition-new(root) {
  z-index: 1;
}
</style>
