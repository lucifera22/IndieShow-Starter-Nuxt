/**
 * layouts/default.vue - 默认布局组件
 * 为所有页面提供基础布局结构和全局样式
 * 包含主题切换、滚动条美化和页面过渡动画等功能
 */
<template>
  <!--
    主容器
    min-h-screen: 最小高度为视口高度
    bg-white/dark:bg-gray-900: 明暗主题背景色
    transition-colors: 颜色过渡动画
   -->
  <div class="min-h-screen bg-white transition-colors duration-200 ease-in-out dark:bg-gray-900">
    <!-- 页面头部 -->
    <LayoutHeader />

    <!--
      页面包装器
      用于实现页面过渡动画效果
     -->
    <div class="page-wrapper">
      <!-- 页面内容插槽 -->
      <slot />
    </div>

    <!-- 页面底部 -->
    <LayoutFooter />
  </div>
</template>

<style>
/**
 * 全局样式定义
 * 包含滚动条美化、页面过渡动画和平滑滚动等效果
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
  /* 透明背景 */
}

/* 滚动条滑块样式 */
::-webkit-scrollbar-thumb {
  background: #d1d5db;
  /* 浅色主题下的滑块颜色 */
  border-radius: 4px;
  /* 圆角 */
  visibility: hidden;
  /* 默认隐藏 */
  transition: opacity 0.3s ease;
  /* 透明度过渡动画 */
}

/* 暗色主题下的滚动条滑块样式 */
.dark ::-webkit-scrollbar-thumb {
  background: #4b5563;
  /* 暗色主题下的滑块颜色 */
}

/* 暗色主题下滚动条滑块悬停样式 */
.dark ::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
  /* 暗色主题下悬停时的滑块颜色 */
}

/*
 * 滚动条显示逻辑
 * 在以下情况下显示滚动条：
 * 1. 鼠标悬停在可滚动元素上
 * 2. 元素获得焦点
 * 3. 元素内部的子元素获得焦点
 * 4. 鼠标悬停在滚动条上
 * 5. 正在滚动时
 */
:is(*:hover, *:focus, *:focus-within) ::-webkit-scrollbar-thumb,
*::-webkit-scrollbar-thumb:hover,
*::-webkit-scrollbar-thumb:active {
  visibility: visible;
}

/* 页面包装器样式 */
.page-wrapper {
  position: relative;
  /* 相对定位，用于页面过渡动画 */
}

/*
 * 全局平滑滚动
 * 使用 CSS scroll-behavior 实现页面内导航的平滑滚动效果
 */
html {
  scroll-behavior: smooth;
}
</style>
