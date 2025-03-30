<script setup lang="ts">
import { ref, onMounted } from "vue"

import { useI18n } from "#imports"

const { t } = useI18n()

// 添加加载状态
const isLoading = ref(true)

// 初始化
onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 500)
})
</script>

<template>
  <section
    class="relative overflow-hidden bg-gradient-to-b from-white via-gray-50/80 to-white py-16 dark:from-gray-900 dark:via-gray-800/95 dark:to-gray-900 sm:py-20 transition-colors duration-200"
  >
    <div class="container relative mx-auto px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div class="mx-auto max-w-4xl text-center">
        <!-- 实际内容 -->
        <template v-if="!isLoading">
          <!-- 锚点导航组件 -->
          <UIScrollAnimation animation="fade-down" :duration="1000" :delay="400">
            <UButton
              to="https://github.com/WaveAny/IndieShow-Starter-Nuxt" variant="ghost" target="_blank" rel="noopener noreferrer"
              class="group relative mb-8 inline-flex items-center gap-1 rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-gray-600 backdrop-blur-sm transition-all duration-300 hover:text-primary-600 dark:bg-gray-800/80 dark:text-gray-300 dark:hover:text-primary-400"
            >
              <!-- 渐变边框动画 -->
              <div
                class="absolute inset-0 block h-full w-full animate-gradient bg-gradient-to-r from-[#4F46E5]/60 via-[#06B6D4]/60 to-[#8B5CF6]/60 dark:from-[#4F46E5]/40 dark:via-[#06B6D4]/40 dark:to-[#8B5CF6]/40 bg-[length:var(--bg-size)_100%] p-[1px] ![mask-composite:subtract] [border-radius:inherit] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]"
              />
              <span class="inline-flex items-center gap-1">
                <span class="relative z-10">
                  <ClientOnly>
                    {{ t('site.tips') }}
                  </ClientOnly>
                </span>
                <UIcon
                  name="lucide:chevron-right"
                  class="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </span>
            </UButton>
          </UIScrollAnimation>

          <!-- 主标题 -->
          <UIScrollAnimation animation="zoom-in" :duration="1200" class="relative">
            <div class="relative">
              <span
                class="absolute -inset-1 block rounded-lg bg-gradient-to-r from-primary-600/30 via-primary-400/30 to-primary-600/30 blur-2xl dark:from-primary-600/20 dark:via-primary-400/20 dark:to-primary-600/20 animate-pulse-slow"
              />
              <h1 class="relative text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-relaxed">
                <ClientOnly>
                  <span class="text-gray-900 dark:text-gray-300">{{ t('site.subTitleStart') }}</span>
                  <span class="relative whitespace-nowrap text-primary-500 dark:text-primary-400 mx-3">
                    <svg
                      aria-hidden="true" viewBox="0 0 418 42"
                      class="absolute left-0 top-2/3 h-[0.58em] w-full fill-primary-500/80 dark:fill-primary-400/80"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"
                      />
                    </svg>
                    <span class="relative">{{ t('site.subTitleHighlight') }}</span>
                  </span>
                  <br class="hidden sm:block">
                  <span class="text-gray-900 dark:text-gray-300 mt-4 inline-block">{{ t('site.subTitleEnd') }}</span>
                </ClientOnly>
              </h1>
            </div>
          </UIScrollAnimation>

          <!-- 主要描述 -->
          <UIScrollAnimation animation="fade-up" :delay="800" :duration="1200">
            <p class="mt-8 text-lg leading-8 text-gray-600 dark:text-gray-300 relative animate-float max-w-3xl mx-auto">
              <ClientOnly>
                <UITypeWriter :text="t('site.description')" :start-delay="1500" class="leading-tight" />
              </ClientOnly>
            </p>
          </UIScrollAnimation>

          <!-- 副标语 -->
          <UIScrollAnimation animation="fade-up" :delay="1200" :duration="1200">
            <p class="mt-6 text-base text-gray-500 dark:text-gray-400 relative animate-float-delayed max-w-2xl mx-auto">
              <ClientOnly>
                {{ t('site.slogan') }}
              </ClientOnly>
            </p>
          </UIScrollAnimation>

          <!-- 行动按钮 -->
          <UIScrollAnimation animation="fade-up" :delay="1600" :duration="1200">
            <div class="mt-12 flex flex-col items-center justify-center gap-6 px-8 sm:flex-row sm:gap-8 sm:px-0">
              <!-- Github按钮 -->
              <UButton
                size="xl" :ui="{
                  rounded: 'rounded-full',
                  padding: {
                    xl: 'px-8 py-4 sm:px-10 sm:py-4',
                  },
                  font: 'font-bold',
                }"
                class="group relative w-[85%] max-w-[280px] overflow-hidden bg-gradient-to-r from-primary-600 to-primary-500 text-white transition-all duration-200 hover:from-primary-500 hover:to-primary-400 hover:shadow-xl hover:shadow-primary-500/20 hover:scale-105 transform-gpu sm:w-auto"
                to="https://github.com/WaveAny/IndieShow-Starter-Nuxt" target="_blank" rel="noopener noreferrer"
              >
                <div
                  class="absolute inset-0 bg-white/30 transition-transform duration-500 translate-x-[-100%] group-hover:translate-x-[100%] skew-x-12"
                />
                <div class="relative z-10 flex items-center justify-center w-full gap-2">
                  <span class="text-base sm:text-lg">
                    <ClientOnly>
                      {{ t('site.mainButton') }}
                    </ClientOnly>
                  </span>
                  <UIcon
                    name="lucide:github"
                    class="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-500 group-hover:translate-x-2"
                  />
                </div>
              </UButton>

              <!-- 关注我们按钮 -->
              <UButton
                size="xl" color="white" variant="solid" :ui="{
                  rounded: 'rounded-full',
                  padding: {
                    xl: 'px-8 py-4 sm:px-10 sm:py-4',
                  },
                  font: 'font-bold',
                  color: {
                    white: {
                      solid:
                        'shadow-sm ring-1 ring-gray-300/50 dark:ring-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-800 backdrop-blur-sm transition-colors duration-200',
                    },
                  },
                }"
                class="group relative w-[85%] max-w-[280px] overflow-hidden transition-all duration-200 hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-gray-800/50 hover:scale-105 transform-gpu sm:w-auto"
                to="#showcase"
              >
                <div class="flex items-center justify-center w-full gap-2">
                  <span class="text-base sm:text-lg">
                    <ClientOnly>
                      {{ t('site.subButton') }}
                    </ClientOnly>
                  </span>
                  <UIcon
                    name="lucide:arrow-right"
                    class="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-500 group-hover:translate-x-2"
                  />
                </div>
              </UButton>
            </div>
          </UIScrollAnimation>
        </template>

        <!-- 骨架屏 -->
        <template v-else>
          <!-- 导航按钮占位 -->
          <div class="mb-8 flex justify-center">
            <div
              class="w-32 h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-full relative overflow-hidden"
            >
              <div
                class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-loading"
              />
            </div>
          </div>

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
          <div class="space-y-4 mt-8 max-w-3xl mx-auto">
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

          <!-- 副标语占位 -->
          <div class="mt-6 max-w-2xl mx-auto">
            <div
              class="h-4 w-3/4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded relative overflow-hidden"
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
            <div
              class="w-[85%] max-w-[280px] h-14 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-full relative overflow-hidden sm:w-40"
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
:root {
  --bg-size: 400%;
}

@keyframes gradient {
  0% {
    background-position: 0% 0%;
  }

  100% {
    background-position: 100% 0%;
  }
}

.animate-gradient {
  animation: gradient 8s linear infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}

@keyframes float-delayed {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-8px);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 6s ease-in-out infinite;
  animation-delay: 1s;
}

.animate-pulse-slow {
  animation: pulseSlow 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulseSlow {
  0%,
  100% {
    opacity: 0.2;
    transform: translateX(-50%) scale(1);
  }

  50% {
    opacity: 0.15;
    transform: translateX(-50%) scale(1.1);
  }
}

.animate-title {
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
