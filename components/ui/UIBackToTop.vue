<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue"

import { useI18n } from "#imports"

const { t } = useI18n()
const show = ref(false)
const scrollThreshold = 150 // 降低滚动阈值，让按钮更早出现

// 监听滚动事件，使用 requestAnimationFrame 优化性能
let ticking = false
function onScroll() {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      show.value = window.scrollY > scrollThreshold
      ticking = false
    })
    ticking = true
  }
}

// 返回顶部，使用更平滑的缓动函数
function scrollToTop() {
  const duration = 800
  const start = window.scrollY
  const startTime = performance.now()

  function easeOutExpo(t: number): number {
    return t === 1 ? 1 : 1 - 2 ** (-10 * t)
  }

  function animate(currentTime: number) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    window.scrollTo({
      top: start * (1 - easeOutExpo(progress)),
      behavior: "auto",
    })

    if (progress < 1) {
      window.requestAnimationFrame(animate)
    }
  }

  window.requestAnimationFrame(animate)
}

onMounted(() => {
  window.addEventListener("scroll", onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll)
})
</script>

<template>
  <Transition
    enter-active-class="transition duration-700 ease-out"
    enter-from-class="transform translate-y-10 opacity-0" enter-to-class="transform translate-y-0 opacity-100"
    leave-active-class="transition duration-500 ease-in" leave-from-class="transform translate-y-0 opacity-100"
    leave-to-class="transform translate-y-10 opacity-0"
  >
    <button
      v-show="show" :aria-label="t('components.back_to_top.label')"
      class="group fixed bottom-36 right-6 sm:right-8 lg:right-10 z-50 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-gray-700 shadow-lg shadow-gray-500/5 ring-1 ring-gray-200/50 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:bg-white/20 hover:text-primary-500 hover:shadow-xl hover:shadow-primary-500/10 focus:outline-none focus:ring-2 focus:ring-primary-500/50 dark:bg-gray-800/20 dark:text-gray-300 dark:ring-gray-700/50 dark:hover:bg-gray-800/30 dark:hover:text-primary-400 sm:bottom-32 sm:h-14 sm:w-14"
      @click="scrollToTop" @keydown.enter="scrollToTop"
    >
      <div
        class="absolute inset-0 rounded-xl bg-gradient-to-br from-primary-500/5 via-transparent to-primary-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      <UIcon
        name="lucide:chevron-up"
        class="relative h-6 w-6 transform transition-all duration-300 ease-out group-hover:scale-110 group-hover:animate-float sm:h-7 sm:w-7"
      />
      <div
        class="absolute -inset-1 rounded-xl bg-gradient-to-br from-primary-500/20 to-primary-400/20 opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-100"
      />
      <span class="sr-only">{{ t('components.back_to_top.label') }}</span>
    </button>
  </Transition>
</template>

<style>
@keyframes float {
  0% {
    transform: translateY(0) scale(1.1);
  }

  50% {
    transform: translateY(-5px) scale(1.1);
  }

  100% {
    transform: translateY(0) scale(1.1);
  }
}

.animate-float {
  animation: float 1.5s ease-in-out infinite;
}
</style>
