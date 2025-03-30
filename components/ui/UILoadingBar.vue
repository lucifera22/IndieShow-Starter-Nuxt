<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue"

import { useNuxtApp } from "#app"

const loading = ref(false)
const progress = ref(0)
let progressInterval: NodeJS.Timeout | null = null

// 开始加载动画
function startLoading() {
  loading.value = true
  progress.value = 0

  // 模拟进度增加
  progressInterval = setInterval(() => {
    if (progress.value < 90) {
      // 快速到 30%
      if (progress.value < 30) {
        progress.value += 4
      }
      // 30-60% 变慢
      else if (progress.value < 60) {
        progress.value += 1.5
      }
      // 60-90% 更慢
      else {
        progress.value += 0.4
      }
    }
  }, 80)
}

// 结束加载动画
function finishLoading() {
  if (progressInterval) {
    clearInterval(progressInterval)
    progressInterval = null
  }

  // 直接到 100%
  progress.value = 100

  // 400ms 后隐藏进度条
  setTimeout(() => {
    loading.value = false
    progress.value = 0
  }, 400)
}

onMounted(() => {
  const nuxtApp = useNuxtApp()

  // 页面开始加载时
  nuxtApp.hook("page:start", () => {
    startLoading()
  })

  // 页面完成加载时
  nuxtApp.hook("page:finish", () => {
    finishLoading()
  })

  // 页面加载出错时
  nuxtApp.hook("app:error", () => {
    finishLoading()
  })
})

// 组件卸载时清理
onBeforeUnmount(() => {
  if (progressInterval) {
    clearInterval(progressInterval)
  }
})
</script>

<template>
  <div v-if="loading" class="fixed top-0 left-0 right-0 z-[9999]">
    <div class="h-1 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
      <div
        class="h-full bg-gradient-to-r from-primary-500 via-primary-600 to-primary-500 transition-all duration-300 ease-in-out"
        :style="{ width: `${progress}%`, opacity: loading ? 1 : 0 }"
      />
    </div>
  </div>
</template>

<style scoped>
.bg-gradient-to-r {
  background-size: 200% auto;
  animation: gradient 1.5s linear infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% center;
  }

  50% {
    background-position: 100% center;
  }

  100% {
    background-position: 0% center;
  }
}
</style>
