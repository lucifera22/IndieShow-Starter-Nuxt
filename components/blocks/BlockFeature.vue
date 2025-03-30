<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from "vue"

import { useI18n } from "#imports"

const { t } = useI18n()

// 添加加载状态
const isLoading = ref(true)

// 控制技术栈图标的动画状态
const techStackVisible = ref(false)
const techStackObserver = ref<IntersectionObserver | null>(null)

// 特性列表
const features = computed(() => [
  {
    title: t("features.items.iteration.title"),
    description: t("features.items.iteration.description"),
    icon: "lucide:rocket",
    color: "#10B981", // Emerald-500
    delay: 0,
  },
  {
    title: t("features.items.performance.title"),
    description: t("features.items.performance.description"),
    icon: "lucide:zap",
    color: "#F59E0B", // Amber-500
    delay: 100,
  },
  {
    title: t("features.items.deployment.title"),
    description: t("features.items.deployment.description"),
    icon: "lucide:server",
    color: "#6366F1", // Indigo-500
    delay: 200,
  },
  {
    title: t("features.items.responsive.title"),
    description: t("features.items.responsive.description"),
    icon: "lucide:smartphone",
    color: "#8B5CF6", // Violet-500
    delay: 400,
  },
  {
    title: t("features.items.global.title"),
    description: t("features.items.global.description"),
    icon: "lucide:globe",
    color: "#3B82F6", // Blue-500
    delay: 500,
  },
  {
    title: t("features.items.support.title"),
    description: t("features.items.support.description"),
    icon: "lucide:headphones",
    color: "#EC4899", // Pink-500
    delay: 300,
  },
])

// 技术栈
const technologies = computed(() => [
  {
    name: "Vue.js",
    icon: "simple-icons:vuedotjs",
    color: "#4FC08D",
    bgColor: "#E8F5EC",
    darkBgColor: "rgba(79, 192, 141, 0.2)",
    delay: 0,
  },
  {
    name: "Nuxt.js",
    icon: "simple-icons:nuxtdotjs",
    color: "#00DC82",
    bgColor: "#E6FAF3",
    darkBgColor: "rgba(0, 220, 130, 0.2)",
    delay: 100,
  },
  {
    name: "Tailwind CSS",
    icon: "simple-icons:tailwindcss",
    color: "#06B6D4",
    bgColor: "#E6F7FA",
    darkBgColor: "rgba(6, 182, 212, 0.2)",
    delay: 200,
  },
  {
    name: "TypeScript",
    icon: "simple-icons:typescript",
    color: "#3178C6",
    bgColor: "#E8F0F9",
    darkBgColor: "rgba(49, 120, 198, 0.2)",
    delay: 300,
  },
  {
    name: "Vercel",
    icon: "simple-icons:vercel",
    color: "#000000",
    bgColor: "#F5F5F5",
    darkBgColor: "rgba(255, 255, 255, 0.2)",
    delay: 400,
  },
])

onMounted(() => {
  // 移除延迟加载
  isLoading.value = false

  // 设置技术栈的交叉观察器，使用 requestIdleCallback 延迟非关键操作
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(() => {
      initTechStackObserver()
    })
  }
  else {
    setTimeout(() => {
      initTechStackObserver()
    }, 0)
  }
})

// 将观察器初始化逻辑抽离成单独的函数
function initTechStackObserver() {
  techStackObserver.value = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        techStackVisible.value = true
        techStackObserver.value?.disconnect()
      }
    },
    {
      threshold: 0.5,
      rootMargin: "50px",
    },
  )

  const techStackElement = document.querySelector(".tech-stack-section")
  if (techStackElement) {
    techStackObserver.value?.observe(techStackElement)
  }
}

onBeforeUnmount(() => {
  // 清理观察器
  techStackObserver.value?.disconnect()
})
</script>

<template>
  <section
    id="features"
    class="relative overflow-hidden bg-gradient-to-b from-white via-gray-50/80 to-white dark:from-gray-900 dark:via-gray-800/95 dark:to-gray-900 transition-colors duration-200 scroll-mt-24 py-20"
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
      class="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white/80 to-transparent dark:from-gray-900/80 transition-colors duration-200"
    />

    <!-- 底部渐变过渡 -->
    <div
      class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-white/95 to-white dark:via-gray-900/95 dark:to-gray-900 transition-colors duration-200"
    />

    <div class="max-w-screen-xl w-full mx-auto px-4 sm:px-6 lg:px-16">
      <!-- 标题部分优化 -->
      <div class="w-full grid grid-cols-1 lg:grid-cols-2 items-start lg:items-center gap-6 lg:gap-16 mb-8 lg:mb-16">
        <UIScrollAnimation animation="zoom-in" :duration="1000">
          <h2
            class="text-4xl sm:text-5xl lg:text-7xl font-medium tracking-tight text-gray-600 dark:text-gray-400 !leading-tight"
          >
            {{ t('features.title') }}
            <span class="relative whitespace-normal lg:whitespace-nowrap text-primary-500">
              <svg
                aria-hidden="true" viewBox="0 0 418 42"
                class="absolute left-0 top-2/3 h-[0.58em] w-full fill-primary-500/80 dark:fill-primary-400/80"
                preserveAspectRatio="none"
              >
                <path
                  d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"
                />
              </svg>
              <span class="relative">{{ t('features.subtitle') }}</span>
            </span>
          </h2>
        </UIScrollAnimation>
        <p v-if="isLoading" class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2" />
        <p v-else>
          {{ t('features.description') }}
        </p>
      </div>

      <!-- 特性列表优化 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 lg:mb-24">
        <template v-if="!isLoading">
          <UIScrollAnimation
            v-for="(feature, key) in features" :key="key" animation="fade-up" :delay="feature.delay"
            :duration="800"
          >
            <div
              class="flex items-start gap-3 sm:gap-4 group p-3 sm:p-4 rounded-2xl transition-all duration-500 hover:bg-white/50 dark:hover:bg-gray-800/50 backdrop-blur-sm transform-gpu shadow-md hover:shadow-lg relative before:absolute before:inset-0 before:rounded-2xl before:border before:border-gray-100 dark:before:border-gray-800 h-full"
              :style="{ '--feature-color': `${feature.color}40` }" role="button" aria-label="{{ feature.title }}"
            >
              <div
                class="rounded-xl bg-gray-100 dark:bg-gray-800 text-white p-2.5 sm:p-3 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center
                transition-all duration-500 transform-gpu backface-hidden will-change-transform shrink-0"
                :style="{ backgroundColor: `${feature.color}15`, color: feature.color }"
              >
                <UIcon :name="feature.icon" class="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <div class="flex-1 min-w-0 flex flex-col">
                <h3
                  class="text-lg sm:text-xl leading-tight mb-1.5 sm:mb-2 font-bold text-gray-900 dark:text-white
                  transition-colors duration-500 group-hover:text-primary-500 line-clamp-2"
                >
                  {{ feature.title }}
                </h3>
                <p
                  class="text-sm sm:text-base text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-3 overflow-hidden"
                >
                  {{ feature.description }}
                </p>
              </div>
            </div>
          </UIScrollAnimation>
        </template>

        <!-- 骨架屏 -->
        <template v-else>
          <div v-for="i in 6" :key="i" class="flex items-start gap-4 p-4 animate-pulse">
            <div
              class="rounded-xl bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 w-14 h-14 relative overflow-hidden"
            >
              <div
                class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-loading"
              />
            </div>
            <div class="flex-1 space-y-3">
              <div
                class="h-7 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-lg w-3/4 relative overflow-hidden"
              >
                <div
                  class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-loading"
                />
              </div>
              <div class="space-y-2">
                <div
                  class="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-md w-full relative overflow-hidden"
                >
                  <div
                    class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-loading"
                  />
                </div>
                <div
                  class="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-md w-5/6 relative overflow-hidden"
                >
                  <div
                    class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-loading"
                  />
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>

      <!-- 技术栈展示优化 -->
      <div class="relative tech-stack-section">
        <div class="absolute inset-0 overflow-hidden">
          <!-- 网格背景 -->
          <div
            class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)]
            bg-[size:24px_24px] opacity-40 dark:opacity-20"
          />
          <!-- 装饰光晕 -->
          <div class="absolute -left-1/4 -top-1/4 h-[200%] w-[200%] animate-slow-spin">
            <div
              class="absolute inset-0 bg-[radial-gradient(circle_at_center,primary-500_0%,transparent_65%)] opacity-5 dark:opacity-10"
            />
          </div>
        </div>

        <div class="relative py-6 sm:py-8 lg:py-12">
          <!-- 技术栈标题部分 -->
          <div class="text-center mb-6 sm:mb-8 lg:mb-10">
            <div class="inline-flex flex-col items-center">
              <template v-if="!isLoading">
                <h3
                  class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white"
                >
                  {{ t('features.tech_stack') }}
                </h3>
                <div class="mt-3 sm:mt-4 flex items-center space-x-3 sm:space-x-4">
                  <div class="w-8 sm:w-12 h-[1px] bg-slate-200 dark:bg-slate-700" />
                  <span
                    class="text-xs sm:text-sm font-semibold tracking-wider text-slate-500 dark:text-slate-400"
                  >POWERED
                    BY</span>
                  <div class="w-8 sm:w-12 h-[1px] bg-slate-200 dark:bg-slate-700" />
                </div>
              </template>
              <!-- 标题骨架屏 -->
              <template v-else>
                <div class="animate-pulse space-y-4">
                  <div
                    class="h-10 sm:h-12 lg:h-14 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-lg w-64 sm:w-80 lg:w-96 mx-auto relative overflow-hidden"
                  >
                    <div
                      class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-loading"
                    />
                  </div>
                  <div class="flex items-center justify-center space-x-3 sm:space-x-4">
                    <div class="w-8 sm:w-12 h-[1px] bg-slate-200 dark:bg-slate-700" />
                    <div
                      class="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded w-20 relative overflow-hidden"
                    >
                      <div
                        class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-loading"
                      />
                    </div>
                    <div class="w-8 sm:w-12 h-[1px] bg-slate-200 dark:bg-slate-700" />
                  </div>
                </div>
              </template>
            </div>
          </div>

          <!-- 技术栈网格布局 -->
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 px-2 sm:px-4 lg:px-8">
            <template v-if="!isLoading">
              <UIScrollAnimation
                v-for="tech in technologies" :key="tech.name" animation="fade-up" :delay="tech.delay"
                :duration="800" :disabled="!techStackVisible"
              >
                <div
                  class="group relative p-6 rounded-xl transition-all duration-300 hover:bg-slate-50/80 dark:hover:bg-slate-800/50"
                >
                  <!-- 图标容器 -->
                  <div class="flex flex-col items-center">
                    <!-- 图标 -->
                    <div class="relative mb-4">
                      <!-- 图标 -->
                      <UIcon
                        :name="tech.icon" class="relative w-8 h-8 md:w-10 md:h-10 transition-all duration-300"
                        :style="{ color: tech.color }" :title="tech.name"
                      />
                    </div>

                    <!-- 技术名称 -->
                    <span
                      class="font-medium text-sm tracking-wide text-slate-700 dark:text-slate-300
                      group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-300"
                    >
                      {{ tech.name }}
                    </span>

                    <!-- 底部装饰线 -->
                    <div
                      class="mt-2.5 w-6 h-[2px] rounded-full transition-all duration-300 group-hover:w-10"
                      :style="{ backgroundColor: `${tech.color}50` }"
                    />
                  </div>
                </div>
              </UIScrollAnimation>
            </template>
            <!-- 技术栈骨架屏 -->
            <template v-else>
              <div v-for="i in 5" :key="i" class="animate-pulse p-6">
                <div class="flex flex-col items-center space-y-4">
                  <!-- 图标骨架屏 -->
                  <div class="relative">
                    <div
                      class="w-10 h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-full relative overflow-hidden"
                    >
                      <div
                        class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-loading"
                      />
                    </div>
                  </div>
                  <!-- 技术名称骨架屏 -->
                  <div
                    class="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded w-16 relative overflow-hidden"
                  >
                    <div
                      class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-loading"
                    />
                  </div>
                  <!-- 装饰线骨架屏 -->
                  <div
                    class="h-[2px] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded w-6"
                  />
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* 移除旧的动画样式 */
.animate-title {
  background-size: 200% auto;
  animation: gradient 8s linear infinite;
}

.animate-wave {
  animation: wave 3s ease-in-out infinite;
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

@keyframes wave {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(5px);
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
  animation: slow-spin 120s linear infinite;
}

/* 优化特性卡片悬浮效果 */
.group {
  transform: translateZ(0);
  backface-visibility: hidden;
  will-change: transform;
  /* 使用flex布局和flex-col让内容填充整个卡片 */
  display: flex;
  flex-direction: column;
  /* 调整内部间距 */
  padding-bottom: 1rem !important;
}

/* 网格布局，确保同一行的卡片高度一致 */
.grid-cols-1.sm\:grid-cols-2.lg\:grid-cols-3 {
  display: grid;
  grid-auto-rows: 1fr;
}

/* 确保每个卡片容器填充网格单元格高度 */
.grid-cols-1.sm\:grid-cols-2.lg\:grid-cols-3 > * {
  height: 100%;
}

.group:hover {
  transform: translateY(-2px);
}

.group:hover .rounded-xl {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

/* 统一所有过渡效果 */
.transition-all {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* 优化暗色模式下的视觉效果 */
@media (prefers-color-scheme: dark) {
  .group:hover .rounded-xl {
    box-shadow: 0 4px 12px rgba(255, 255, 255, 0.08);
  }
}

/* 减少动画 */
@media (prefers-reduced-motion: reduce) {
  .group,
  .group *,
  .transition-all,
  .animate-slow-spin {
    transition: none !important;
    animation: none !important;
    transform: none !important;
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

/* 优化响应式布局 */
@media (max-width: 640px) {
  .group {
    padding: 0.75rem;
    /* 确保卡片内容紧凑 */
    padding-bottom: 0.5rem !important;
  }

  .group:hover {
    transform: translateY(-1px);
  }

  .group:hover .rounded-xl {
    transform: scale(1.03);
  }

  /* 移动端的文本行高调整 */
  .line-clamp-3 {
    height: auto;
    max-height: 4.5rem;
  }
}

/* 优化文本溢出 */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  max-height: 3rem;
  /* 为标题设置固定的最大高度 */
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 4.5rem;
  /* 为描述文本设置固定高度 */
  margin-bottom: 0;
  /* 确保底部没有多余的margin */
}

/* 优化性能相关的样式 */
.transition-all {
  transition:
    transform 0.3s ease-out,
    background-color 0.3s ease-out;
  will-change: transform;
}

/* 使用 transform 替代 opacity 实现动画效果 */
.fade-enter-active,
.fade-leave-active {
  transition: transform 0.3s ease-out;
  will-change: transform;
}

.fade-enter-from,
.fade-leave-to {
  transform: translateY(20px);
}

/* 优化动画性能 */
.animate-slow-spin {
  animation: slow-spin 120s linear infinite;
  will-change: transform;
  transform: translateZ(0);
}

/* 减少不必要的动画 */
@media (prefers-reduced-motion: reduce) {
  .transition-all,
  .animate-slow-spin,
  .fade-enter-active,
  .fade-leave-active {
    animation: none !important;
    transition: none !important;
  }
}
</style>
