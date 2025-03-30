<script setup lang="ts">
import { useI18n, navigateTo } from "#imports"
import { useI18nLocale } from "~/composables/useLocale"
import type { ErrorPageProps } from "~/types/core/error"

// 定义 props
const props = defineProps<ErrorPageProps>()

const { t } = useI18n()
const { getLocalePath } = useI18nLocale()

// 获取状态码
const getStatusCode = computed(() => {
  // 如果错误消息包含 "Page not found"，则返回 404
  if (props.error?.message?.includes("Page not found")) {
    return "404"
  }
  // 否则返回错误状态码或默认 500
  return props.error?.statusCode?.toString() || "500"
})

// 处理错误
async function handleError() {
  // 清除错误并返回首页
  clearError()
  await navigateTo(getLocalePath("/"))
}

// 错误日志记录（可选）
onMounted(() => {
  if (import.meta.dev) {
    console.error("Error details:", {
      code: getStatusCode.value,
      message: props.error?.message,
      url: props.error?.url,
      stack: props.error?.stack,
    })
  }
})
</script>

<template>
  <section
    class="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-gray-50/80 to-white dark:from-gray-900 dark:via-gray-800/95 dark:to-gray-900 transition-colors duration-200"
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

    <!-- 内容区域 -->
    <div class="container relative mx-auto flex min-h-screen items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <div class="max-w-2xl text-center">
        <!-- 错误状态码 -->
        <UIScrollAnimation animation="zoom-in" :duration="1200">
          <div class="relative">
            <span
              class="absolute -inset-1 block rounded-lg bg-gradient-to-r from-primary-600/30 via-primary-400/30 to-primary-600/30 blur-2xl dark:from-primary-600/20 dark:via-primary-400/20 dark:to-primary-600/20 animate-pulse-slow"
            />
            <h2
              class="relative animate-gradient-text bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 bg-clip-text text-8xl font-extrabold tracking-tight text-transparent"
            >
              {{ getStatusCode }}
            </h2>
          </div>
        </UIScrollAnimation>

        <!-- 错误状态 -->
        <UIScrollAnimation animation="fade-up" :delay="300" :duration="1200">
          <p class="mt-4 text-lg font-semibold tracking-wide text-gray-600 dark:text-gray-300">
            {{ t(`components.error_page.status.${getStatusCode}`) }}
          </p>
        </UIScrollAnimation>

        <!-- 错误标题 -->
        <UIScrollAnimation animation="fade-up" :delay="600" :duration="1200">
          <h1 class="mt-8 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            {{ t('components.error_page.title') }}
          </h1>
        </UIScrollAnimation>

        <!-- 错误描述 -->
        <UIScrollAnimation animation="fade-up" :delay="900" :duration="1200">
          <p class="mt-4 text-base text-gray-500 dark:text-gray-400">
            {{ t('components.error_page.description') }}
            <span v-if="error?.url" class="font-medium text-primary-500">
              {{ error.url }}
            </span>
          </p>
        </UIScrollAnimation>

        <!-- 返回首页按钮 -->
        <UIScrollAnimation animation="fade-up" :delay="1200" :duration="1200">
          <div class="mt-12 flex justify-center">
            <UButton
              size="xl" :ui="{
                rounded: 'rounded-full',
                padding: {
                  xl: 'px-8 py-3.5 sm:px-10 sm:py-4',
                },
                font: 'font-bold',
              }"
              class="group relative overflow-hidden bg-gradient-to-r from-primary-600 to-primary-500 text-white transition-all duration-500 hover:from-primary-500 hover:to-primary-400 hover:shadow-xl hover:shadow-primary-500/30 dark:hover:shadow-primary-500/40 hover:scale-105 transform-gpu"
              :label="t('components.error_page.back_home')" @click="handleError"
            >
              <div
                class="absolute inset-0 bg-white/30 transition-transform duration-500 translate-x-[-100%] group-hover:translate-x-[100%] skew-x-12"
              />
              <div class="relative z-10 flex items-center justify-center w-full gap-2">
                <UIcon
                  name="lucide:home"
                  class="h-4 w-4 sm:h-5 sm:w-5 transition-all duration-500 group-hover:scale-125"
                />
                <span class="text-base sm:text-lg">{{ t('components.error_page.back_home') }}</span>
              </div>
            </UButton>
          </div>
        </UIScrollAnimation>
      </div>
    </div>

    <!-- 装饰背景 -->
    <div
      class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
    >
      <div
        class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-primary-500 to-primary-600 opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem] animate-pulse-slow"
        style="
          clip-path: polygon(
            74.1% 44.1%,
            100% 61.6%,
            97.5% 26.9%,
            85.5% 0.1%,
            80.7% 2%,
            72.5% 32.5%,
            60.2% 62.4%,
            52.4% 68.1%,
            47.5% 58.3%,
            45.2% 34.5%,
            27.5% 76.7%,
            0.1% 64.9%,
            17.9% 100%,
            27.6% 76.8%,
            76.1% 97.7%,
            74.1% 44.1%
          );
        "
      />
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
</style>
