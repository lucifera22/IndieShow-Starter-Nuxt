<script setup lang="ts">
import { useI18n, useColorMode } from "#imports"

const { t } = useI18n()
const colorMode = useColorMode()

// 切换主题时添加过渡动画
function toggleTheme() {
  if (!document.startViewTransition) {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark"
    return
  }

  document.startViewTransition(() => {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark"
  })
}
</script>

<template>
  <div class="relative flex items-center">
    <UTooltip :text="t('components.theme_switch.tooltip')">
      <UButton
        :aria-label="t('components.theme_switch.toggle_theme')"
        class="theme-switch-btn flex items-center justify-center" variant="ghost" color="gray" :ui="{
          padding: {
            base: 'p-2',
            sm: 'p-2.5',
            md: 'p-3',
          },
          rounded: 'rounded-md',
        }" @click="toggleTheme"
      >
        <span class="sr-only">{{ t('components.theme_switch.toggle_theme') }}</span>
        <transition name="theme-switch" mode="out-in">
          <div :key="colorMode.value" class="relative flex items-center justify-center">
            <UIcon :name="colorMode.value === 'dark' ? 'lucide:sun' : 'lucide:moon'" class="theme-icon" />
          </div>
        </transition>
      </UButton>
    </UTooltip>
  </div>
</template>

<style scoped>
.theme-switch-btn {
  transform: none;
  backface-visibility: hidden;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-switch-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, var(--hover-color, theme('colors.gray.100')) 0%, transparent 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.dark .theme-switch-btn::before {
  --hover-color: theme('colors.gray.800');
}

.theme-switch-btn:hover::before {
  opacity: 1;
}

.theme-switch-btn:active::before {
  opacity: 0.7;
}

.theme-icon {
  @apply w-5 h-5 sm:w-6 sm:h-6;
  transform: none;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 主题切换动画 */
.theme-switch-enter-active,
.theme-switch-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.theme-switch-enter-from,
.theme-switch-leave-to {
  opacity: 0;
  transform: scale(0.8) rotate(-45deg);
}

.theme-switch-enter-to,
.theme-switch-leave-from {
  opacity: 1;
  transform: scale(1) rotate(0);
}

/* 优化动画性能 */
.theme-switch-btn :deep(span) {
  transform: translateZ(0);
  backface-visibility: hidden;
}

@media (prefers-reduced-motion: reduce) {
  .theme-switch-btn,
  .theme-icon,
  .theme-switch-enter-active,
  .theme-switch-leave-active {
    transition: none !important;
    animation: none !important;
  }
}
</style>
