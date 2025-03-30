<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue"

import type { ScrollAnimationProps } from "~/types/components/ui/uiscrollanimation"

// 默认属性值
const props = withDefaults(defineProps<ScrollAnimationProps>(), {
  animation: "fade-up",
  duration: 800,
  delay: 0,
  threshold: 0.1,
  once: true,
  root: null,
  rootMargin: "0px",
})

const element = ref<HTMLElement | null>(null)
const isVisible = ref(false)
const isReducedMotion = ref(false)
let observer: IntersectionObserver | null = null

// 创建观察者
function createObserver() {
  if (!window.IntersectionObserver) {
    console.warn("IntersectionObserver is not supported in this browser")
    isVisible.value = true
    return
  }

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true
        if (props.once && observer) {
          observer.disconnect()
        }
      }
      else if (!props.once) {
        isVisible.value = false
      }
    },
    {
      root: props.root,
      rootMargin: props.rootMargin,
      threshold: props.threshold,
    },
  )
}

// 开始观察
function startObserving() {
  if (element.value && observer) {
    observer.observe(element.value)
  }
}

// 停止观察
function stopObserving() {
  if (observer) {
    observer.disconnect()
    observer = null
  }
}

onMounted(() => {
  // 检查用户是否偏好减少动画
  isReducedMotion.value = window.matchMedia("(prefers-reduced-motion: reduce)").matches

  // 只在非减少动画模式下创建观察者
  if (!isReducedMotion.value) {
    createObserver()
    startObserving()
  }
  else {
    isVisible.value = true
  }
})

onUnmounted(() => {
  stopObserving()
})
</script>

<template>
  <div
    ref="element" class="scroll-animation"
    :class="[`animation-${animation}`, isVisible ? 'is-visible' : '', isReducedMotion ? 'reduce-motion' : '']" :style="{
      '--animation-duration': `${duration}ms`,
      '--animation-delay': `${delay}ms`,
    }" role="presentation"
  >
    <slot />
  </div>
</template>

<style scoped>
.scroll-animation {
  opacity: 0;
  transition: opacity 0.3s ease;
}

/* 减少动画模式 */
.reduce-motion {
  opacity: 1 !important;
  transform: none !important;
  transition: none !important;
}

.scroll-animation.is-visible {
  opacity: 1;
}

@media (prefers-reduced-motion: no-preference) {
  .scroll-animation.is-visible {
    animation-duration: var(--animation-duration);
    animation-delay: var(--animation-delay);
    animation-fill-mode: both;
    animation-timing-function: ease-out;
  }

  .animation-fade-up.is-visible {
    animation-name: fadeUp;
  }

  .animation-fade-down.is-visible {
    animation-name: fadeDown;
  }

  .animation-fade-left.is-visible {
    animation-name: fadeLeft;
  }

  .animation-fade-right.is-visible {
    animation-name: fadeRight;
  }

  .animation-zoom-in.is-visible {
    animation-name: zoomIn;
  }

  .animation-zoom-out.is-visible {
    animation-name: zoomOut;
  }
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeLeft {
  from {
    opacity: 0;
    transform: translateX(20px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeRight {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes zoomOut {
  from {
    opacity: 0;
    transform: scale(1.05);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
