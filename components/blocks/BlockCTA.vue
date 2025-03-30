<script setup lang="ts">
import { computed, ref, onMounted } from "vue"

import { useI18n, useToast } from "#imports"
import { getSocialConfigByLocale } from "~/config/social"

const { add } = useToast()
const { t, locale } = useI18n()

// 添加加载状态
const isLoading = ref(true)

// 初始化
onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 500)
})

// 使用计算属性获取当前配置
const socialConfig = computed(() => getSocialConfigByLocale(locale.value))

// 添加到收藏夹
function addToBookmark() {
  if (import.meta.client) {
    try {
      // 尝试使用现代浏览器的 API
      if (navigator.share) {
        navigator
          .share({
            title: document.title,
            url: window.location.href,
          })
          .catch(() => {
            // 如果分享失败，显示提示信息
            showBookmarkToast()
          })
      }
      else {
        // 如果不支持分享 API，显示提示信息
        showBookmarkToast()
      }
    }
    catch (error) {
      // 在开发环境下输出错误信息
      if (import.meta.dev) {
        console.error("添加书签时发生错误:", error)
      }
      showBookmarkToast()
    }
  }
}

// 显示收藏提示
function showBookmarkToast() {
  add({
    title: t("cta.bookmark_title"),
    description: t("cta.bookmark_description"),
    icon: "lucide:bookmark",
    color: "primary",
    timeout: 5000,
  })
}
</script>

<template>
  <section
    id="cta"
    class="relative overflow-hidden bg-gradient-to-b from-white via-gray-50/80 to-white py-16 dark:from-gray-900 dark:via-gray-800/95 dark:to-gray-900 sm:py-20 transition-colors duration-200"
  >
    <!-- 背景装饰 -->
    <div class="absolute inset-0 overflow-hidden">
      <!-- 渐变圆环 -->
      <div class="absolute -left-1/4 -top-1/4 h-[200%] w-[200%] animate-slow-spin">
        <div
          class="absolute inset-0 bg-[radial-gradient(circle_at_center,primary-500_0%,transparent_65%)] opacity-10 dark:opacity-15"
        />
      </div>
      <!-- 网格背景 -->
      <div
        class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-40 dark:opacity-30"
      />
    </div>

    <!-- 顶部渐变过渡 -->
    <div
      class="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white/95 to-transparent dark:from-gray-900/95 transition-colors duration-200"
    />

    <!-- 底部渐变过渡 -->
    <div
      class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-white/95 to-white dark:via-gray-900/95 dark:to-gray-900 transition-colors duration-200"
    />

    <div class="container relative mx-auto px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div class="mx-auto max-w-2xl text-center">
        <!-- 实际内容 -->
        <template v-if="!isLoading">
          <!-- 标题 -->
          <UIScrollAnimation animation="zoom-in" :duration="1200">
            <div class="relative">
              <h2
                class="relative animate-gradient-text bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 bg-clip-text text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent transition-all duration-300"
              >
                <ClientOnly>
                  {{ t('cta.title') }}
                </ClientOnly>
              </h2>
            </div>
          </UIScrollAnimation>

          <!-- 描述 -->
          <UIScrollAnimation animation="fade-up" :delay="300" :duration="1200">
            <p
              class="mx-auto mt-8 max-w-xl text-lg leading-8 text-gray-600 dark:text-gray-300 opacity-95 transition-all duration-300 hover:opacity-100"
            >
              <ClientOnly>
                {{ t('cta.description') }}
              </ClientOnly>
            </p>
          </UIScrollAnimation>

          <!-- 按钮组 -->
          <UIScrollAnimation animation="fade-up" :delay="600" :duration="1200">
            <div class="mt-12 flex flex-col items-center justify-center gap-6 px-8 sm:flex-row sm:gap-x-8 sm:px-0">
              <ClientOnly>
                <UButton
                  size="xl" :ui="{
                    rounded: 'rounded-full',
                    padding: {
                      xl: 'px-8 py-3.5 sm:px-10 sm:py-4',
                    },
                    font: 'font-bold',
                  }"
                  class="group relative w-[85%] max-w-[280px] overflow-hidden bg-gradient-to-r from-primary-600 to-primary-500 text-white transition-all duration-500 hover:from-primary-500 hover:to-primary-400 hover:shadow-xl hover:shadow-primary-500/30 dark:hover:shadow-primary-500/40 hover:scale-105 transform-gpu sm:w-auto"
                  :aria-label="t('components.aria.bookmark_site')" @click="addToBookmark"
                >
                  <div
                    class="absolute inset-0 bg-white/30 transition-transform duration-500 translate-x-[-100%] group-hover:translate-x-[100%] skew-x-12"
                  />
                  <div class="relative z-10 flex items-center justify-center w-full gap-2">
                    <span class="text-base sm:text-lg">
                      {{ t('cta.bookmark') }}
                    </span>
                    <UIcon
                      name="lucide:bookmark"
                      class="h-4 w-4 sm:h-5 sm:w-5 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12"
                    />
                  </div>
                </UButton>
              </ClientOnly>
            </div>
          </UIScrollAnimation>

          <!-- 社交媒体图标 -->
          <UIScrollAnimation animation="fade-up" :delay="900" :duration="1200">
            <div class="mt-16 flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
              <template v-for="(key, index) in Object.keys(socialConfig)" :key="index">
                <component
                  :is="socialConfig[key].url ? 'a' : 'button'" v-if="socialConfig[key]"
                  :href="socialConfig[key].url" :target="socialConfig[key].url ? '_blank' : undefined"
                  :rel="socialConfig[key].url ? 'noopener noreferrer' : undefined"
                  :aria-label="t('components.aria.social_media', { platform: key })"
                  class="group relative rounded-xl p-3 text-gray-600 transition-all duration-500 hover:-translate-y-2 hover:bg-white/80 hover:text-primary-600 hover:shadow-xl hover:shadow-primary-500/10 dark:text-gray-400 dark:hover:bg-gray-800/80 dark:hover:text-primary-400 dark:hover:shadow-primary-500/20 backdrop-blur-sm hover:scale-110 transform-gpu"
                >
                  <div
                    class="absolute inset-0 rounded-xl bg-white/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:bg-gray-700/50 backdrop-blur-sm"
                  />
                  <UIcon
                    :name="socialConfig[key].icon"
                    class="relative z-10 h-8 w-8 sm:h-9 sm:w-9 transition-transform duration-500 group-hover:scale-125"
                  />
                </component>
              </template>
            </div>
          </UIScrollAnimation>
        </template>

        <!-- 骨架屏 -->
        <template v-else>
          <!-- 标题占位 -->
          <div class="relative">
            <div
              class="h-16 sm:h-20 lg:h-24 w-4/5 mx-auto bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-lg relative overflow-hidden"
            >
              <div
                class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-loading"
              />
            </div>
          </div>

          <!-- 描述占位 -->
          <div class="mt-8 max-w-xl mx-auto space-y-4">
            <div
              class="h-4 w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded relative overflow-hidden"
            >
              <div
                class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-loading"
              />
            </div>
            <div
              class="h-4 w-5/6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded relative overflow-hidden"
            >
              <div
                class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-loading"
              />
            </div>
            <div
              class="h-4 w-4/6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded relative overflow-hidden"
            >
              <div
                class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-loading"
              />
            </div>
          </div>

          <!-- 按钮占位 -->
          <div class="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 px-8 sm:gap-8 sm:px-0">
            <div
              class="w-[85%] max-w-[280px] h-14 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-full relative overflow-hidden sm:w-40"
            >
              <div
                class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-loading"
              />
            </div>
          </div>

          <!-- 社交媒体图标占位 -->
          <div class="mt-16 flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
            <div
              v-for="i in 4" :key="i"
              class="w-14 h-14 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-xl relative overflow-hidden"
            >
              <div
                class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-loading"
              />
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<style scoped>
.animate-gradient-text {
  background-size: 200% auto;
  animation: gradient 8s linear infinite;
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

@keyframes slow-spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.animate-slow-spin {
  animation: slow-spin 60s linear infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse-slow {
  0%,
  100% {
    opacity: 0.5;
    transform: scale(1);
  }

  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
}

/* 骨架屏动画 */
@keyframes skeletonLoading {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(100%);
  }
}

.skeleton-loading {
  animation: skeletonLoading 1.5s infinite;
}

/* 优化暗色模式下骨架屏的效果 */
@media (prefers-color-scheme: dark) {
  .skeleton-loading {
    opacity: 0.1;
  }
}

/* 减少动画模式下也要包含骨架屏动画 */
@media (prefers-reduced-motion: reduce) {
  .skeleton-loading {
    animation: none !important;
  }
}
</style>
