<script setup lang="ts">
import { ref, watch, onMounted } from "vue"

import { useI18n } from "#imports"

// 定义属性
const props = defineProps<{
  isOpen: boolean
  title: string
  qrCodeUrl: string
  description: string
}>()

// 定义事件
defineEmits<{
  "update:isOpen": [value: boolean]
}>()

const { t } = useI18n()

// 添加加载状态
const isLoading = ref(true)
const qrCodeLoaded = ref(false)

// 监听二维码加载
function handleQRCodeLoad() {
  qrCodeLoaded.value = true
}

// 初始化
onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 300)
})

// 重置加载状态
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    isLoading.value = true
    qrCodeLoaded.value = false
    setTimeout(() => {
      isLoading.value = false
    }, 300)
  }
})
</script>

<template>
  <UModal
    :model-value="isOpen" :ui="{
      wrapper: 'fixed inset-0 flex items-center justify-center',
      container: 'flex items-center justify-center w-full h-full p-6',
      dialog: 'max-w-[200px] sm:max-w-[240px] mx-auto',
      width: 'auto',
      padding: 'p-0',
      base: 'relative transform overflow-hidden transition-all duration-500',
      overlay: {
        base: 'fixed inset-0 transition-opacity',
        background: 'bg-gray-950/75 dark:bg-gray-950/85 backdrop-blur-md',
        transition: {
          enter: 'ease-out duration-500',
          enterFrom: 'opacity-0',
          enterTo: 'opacity-100',
          leave: 'ease-in duration-300',
          leaveFrom: 'opacity-100',
          leaveTo: 'opacity-0',
        },
      },
      transition: {
        enter: 'ease-out duration-500',
        enterFrom: 'opacity-0 scale-95 translate-y-4',
        enterTo: 'opacity-100 scale-100 translate-y-0',
        leave: 'ease-in duration-300',
        leaveFrom: 'opacity-100 scale-100 translate-y-0',
        leaveTo: 'opacity-0 scale-95 translate-y-4',
      },
    }" @update:model-value="$emit('update:isOpen', $event)"
  >
    <div
      class="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800/95 backdrop-blur-xl shadow-2xl dark:shadow-primary-500/10"
    >
      <!-- 标题区域 -->
      <div class="relative px-8 pt-8 pb-6 sm:px-10 sm:pt-10 sm:pb-8 text-center">
        <h3
          class="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 bg-clip-text text-transparent animate-gradient-text"
          tabindex="0"
        >
          {{ title || t('showcase.qr_code.title') }}
        </h3>
        <!-- 关闭按钮 -->
        <UButton
          color="gray" variant="ghost" icon="lucide:x"
          class="absolute right-4 top-4 sm:right-5 sm:top-5 transform-gpu transition-all duration-300 ease-in-out hover:rotate-90 hover:scale-110 active:scale-95"
          size="sm" :ui="{
            base: 'hover:bg-gray-100 dark:hover:bg-gray-700/80 rounded-full transition-colors duration-300',
            padding: {
              sm: 'p-2',
            },
          }" :aria-label="t('components.aria.close_qrcode')" @click="$emit('update:isOpen', false)"
        />
      </div>

      <!-- 二维码区域 -->
      <div class="p-8 sm:p-10 flex flex-col items-center">
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
              :src="qrCodeUrl" :alt="t('components.locale_switch.qr_code_alt', { title })"
              class="w-36 h-36 sm:w-44 sm:h-44 rounded-lg transition-all duration-500 group-hover:scale-105 dark:brightness-90 dark:contrast-125"
              tabindex="0" @load="handleQRCodeLoad"
            >
          </div>
        </div>

        <!-- 描述文本 -->
        <p
          v-if="description"
          class="mt-8 sm:mt-10 text-base text-gray-600 dark:text-gray-300 text-center max-w-[240px] sm:max-w-[280px] leading-relaxed animate-fade-in"
          tabindex="0"
        >
          {{ description }}
        </p>
      </div>

      <!-- 底部装饰 -->
      <div
        class="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-primary-500/10 via-primary-500/5 to-transparent dark:from-primary-400/10 dark:via-primary-400/5"
      />
    </div>
  </UModal>
</template>

<style scoped>
.animate-gradient-text {
  background-size: 200% auto;
  animation: gradient 10s linear infinite;
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

.animate-fade-in {
  animation: fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(12px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.transform-gpu {
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
  will-change: transform, opacity;
}
</style>
