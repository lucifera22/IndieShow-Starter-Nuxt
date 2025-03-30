<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from "vue"

import type { TypeWriterProps } from "~/types/components/ui/uitypewriter"

const props = defineProps<TypeWriterProps>()

const config = useRuntimeConfig()

const isEnabled = config.public.typewriterEnabled
const defaultSpeed = Number(config.public.typewriterSpeed)

const displayText = ref("")
let currentIndex = 0
let timer: NodeJS.Timeout | null = null

// 清理定时器
function clearTimer() {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
}

// 开始打字效果
function startTyping() {
  clearTimer()
  currentIndex = 0

  // 如果禁用了打字机效果，直接显示全部文本
  if (!isEnabled) {
    displayText.value = props.text
    return
  }

  displayText.value = ""
  const type = () => {
    if (currentIndex < props.text.length) {
      displayText.value += props.text[currentIndex]
      currentIndex++
      timer = setTimeout(type, props.typeSpeed || defaultSpeed)
    }
  }

  timer = setTimeout(type, props.startDelay || 0)
}

// 监听文本变化，重新开始打字效果
watch(
  () => props.text,
  () => {
    startTyping()
  },
  { immediate: true },
)

// 组件卸载时清理
onBeforeUnmount(() => {
  clearTimer()
})
</script>

<template>
  <span>{{ displayText }}</span>
</template>

<style scoped>
.typewriter-container {
  display: inline-flex;
  align-items: center;
}

.cursor {
  display: inline-block;
  margin-left: 2px;
  font-weight: bold;
  opacity: 1;
  transition: opacity 0.1s ease;
}

.cursor-blink {
  opacity: 0;
}
</style>
