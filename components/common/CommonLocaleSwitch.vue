/**
* components/common/CommonLocaleSwitch.vue
* 语言切换组件
* 提供多语言切换功能，支持下拉菜单选择语言
* 包含无障碍支持和响应式设计
*/
<script setup lang="ts">
// 导入必要的依赖
import { onClickOutside } from "@vueuse/core"

import { useI18n } from "#imports"
import { useI18nLocale } from "~/composables/useLocale"
import type { LocaleItem, LocaleObject } from "~/types/i18n"

// 定义组件属性
interface Props {
  /** 是否始终显示语言名称 */
  alwaysShowName?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  alwaysShowName: false,
})

// 获取国际化相关的方法和状态
const { locales, locale, t } = useI18n()
const { switchLocale } = useI18nLocale()

/**
 * 计算当前选中的语言配置
 * 如果找不到当前语言，则返回第一个语言选项
 */
const currentLocale = computed<LocaleObject>(() => {
  const found = (locales.value as LocaleObject[]).find(l => l.code === locale.value)
  if (!found) {
    console.warn(`未找到当前语言的配置: ${locale.value}`)
    return (locales.value as LocaleObject[])[0]
  }
  return found
})

/**
 * 处理语言选项列表
 * 将语言配置转换为下拉菜单项格式
 */
const localeItems = computed<LocaleItem[]>(() =>
  (locales.value as LocaleObject[]).map(l => ({
    label: l.name || l.code, // 显示名称，如果没有则使用语言代码
    value: l.code, // 语言代码作为值
  })),
)

// 控制语言选择菜单的显示状态
const isLocaleMenuOpen = ref(false)

// 获取菜单 DOM 引用，用于点击外部关闭
const localeMenuRef = ref<HTMLElement | null>(null)

/**
 * 监听点击外部事件
 * 当点击组件外部时自动关闭菜单
 */
onClickOutside(localeMenuRef, () => {
  isLocaleMenuOpen.value = false
})

/**
 * 切换语言选择菜单的显示状态
 */
function toggleLocaleMenu() {
  isLocaleMenuOpen.value = !isLocaleMenuOpen.value
}

/**
 * 处理语言切换
 * @param item - 选中的语言选项
 */
async function handleLocaleSwitch(item: LocaleItem) {
  // 如果选中当前语言，则只关闭菜单
  if (item.value === locale.value) {
    isLocaleMenuOpen.value = false
    return
  }

  try {
    // 切换到新语言
    await switchLocale(item.value)
    // 切换成功后关闭菜单
    isLocaleMenuOpen.value = false
  }
  catch (error) {
    console.error("切换语言失败:", error)
  }
}
</script>

<template>
  <!-- 语言切换组件容器 -->
  <div ref="localeMenuRef" class="relative">
    <!-- 语言切换按钮，带有工具提示 -->
    <UTooltip :text="t('components.locale_switch.tooltip')">
      <UButton
        color="gray" variant="ghost" :ui="{
          padding: {
            base: 'p-2',
            sm: 'p-2.5',
            md: 'p-3',
          },
          rounded: 'rounded-md',
        }" :aria-label="t('components.locale_switch.toggle_locale')" :aria-expanded="isLocaleMenuOpen"
        @click="toggleLocaleMenu"
      >
        <!-- 屏幕阅读器文本 -->
        <span class="sr-only">{{ t('components.locale_switch.toggle_locale') }}</span>
        <!-- 按钮内容 -->
        <div class="flex items-center space-x-1.5">
          <!-- 地球图标 -->
          <UIcon name="lucide:globe" class="locale-icon" />
          <!-- 当前语言名称 -->
          <span
            class="text-sm font-medium" :class="[
              props.alwaysShowName ? 'inline' : 'hidden sm:inline',
            ]"
          >{{ currentLocale.name }}</span>
          <!-- 下拉箭头图标 -->
          <UIcon
            name="lucide:chevron-down"
            class="w-4 h-4 transition-transform duration-200"
            :class="{ 'rotate-180': isLocaleMenuOpen }"
          />
        </div>
      </UButton>
    </UTooltip>

    <!--
      语言选择下拉菜单
      使用绝对定位和 transform 实现居中对齐
      添加毛玻璃效果和阴影提升视觉层次
     -->
    <div
      v-show="isLocaleMenuOpen"
      class="absolute left-1/2 -translate-x-1/2 top-[60px] w-36 rounded-lg bg-white py-1 shadow-lg ring-1 ring-gray-200/50 dark:bg-gray-800/95 dark:ring-gray-700/50 backdrop-blur-xl z-50"
      role="menu" aria-orientation="vertical"
    >
      <!-- 语言选项列表 -->
      <button
        v-for="item in localeItems" :key="item.value" class="locale-menu-item"
        :aria-label="t('components.aria.select_language', { name: item.label })"
        :aria-current="item.value === locale ? 'true' : undefined" role="menuitem" @click="handleLocaleSwitch(item)"
      >
        <div class="flex items-center w-full">
          <!-- 当前选中语言的勾选标记 -->
          <div class="w-6 flex items-center justify-center">
            <UIcon
              v-if="item.value === locale" name="lucide:check" class="h-4 w-4"
              :aria-label="t('components.aria.current_language', { name: item.label })"
            />
          </div>
          <!-- 语言名称 -->
          <span>{{ item.label }}</span>
        </div>
      </button>
    </div>
  </div>
</template>

<style scoped>
/**
 * 组件级样式
 * 使用 Tailwind 的 @apply 指令应用工具类
 */

/* 语言切换图标样式 */
.locale-icon {
  @apply w-5 h-5 sm:w-6 sm:h-6;
  /* 响应式尺寸 */
}

/* 语言菜单项样式 */
.locale-menu-item {
  @apply flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200;
  /* 暗色主题适配 */
}
</style>
