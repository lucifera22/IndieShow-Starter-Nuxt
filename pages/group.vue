<script setup lang="ts">
import { useI18n } from "#imports"
import { useSeo } from "~/composables/useSeo"

const { t } = useI18n()
const { updatePageSeo } = useSeo()

// 更新页面的 SEO 信息
updatePageSeo("group")
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <main class="flex-1">
      <div class="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <!-- 页面内容 -->
        <UIScrollAnimation animation="fade-up" :duration="1200">
          <div class="mx-auto max-w-3xl text-center">
            <h1
              class="bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl"
            >
              {{ t('group.title') }}
            </h1>
            <p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              {{ t('group.description') }}
            </p>
            <p class="mt-4 text-base leading-7 text-gray-500 dark:text-gray-400">
              {{ t('group.communication') }}
            </p>
            <p class="mt-2 text-sm leading-6 text-gray-400 dark:text-gray-500 italic">
              {{ t('group.disclaimer') }}
            </p>

            <!-- 二维码区域 -->
            <div class="mt-12 flex justify-center">
              <div class="relative group">
                <!-- 装饰背景 -->
                <div
                  class="absolute -inset-5 sm:-inset-6 bg-gradient-to-r from-primary-500/20 via-primary-400/10 to-primary-500/20 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-all duration-500 ease-in-out group-hover:scale-105"
                />
                <!-- 二维码容器 -->
                <div
                  class="relative bg-white dark:bg-gray-900/95 p-5 sm:p-6 rounded-xl shadow-lg transform-gpu transition-all duration-500 hover:shadow-xl hover:shadow-primary-500/30 dark:hover:shadow-primary-400/30 group-hover:scale-[1.02]"
                >
                  <!-- 扫描动画效果 -->
                  <div class="absolute inset-0 overflow-hidden rounded-xl">
                    <div
                      class="absolute inset-0 bg-gradient-to-b from-transparent via-primary-500/15 to-transparent qr-scan-animation"
                    />
                  </div>
                  <!-- 二维码图片 -->
                  <img
                    src="/images/group-discord.png" :alt="t('group.qr_code_alt')"
                    class="w-48 h-48 sm:w-56 sm:h-56 rounded-lg transition-all duration-500 group-hover:scale-105 dark:brightness-90 dark:contrast-125"
                  >
                </div>
              </div>
            </div>
          </div>
        </UIScrollAnimation>
      </div>
    </main>
  </div>
</template>

<style scoped>
.qr-scan-animation {
  height: 100%;
  animation: scan 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

@keyframes scan {
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }

  25% {
    opacity: 1;
  }

  75% {
    opacity: 1;
  }

  100% {
    transform: translateY(100%);
    opacity: 0;
  }
}
</style>
