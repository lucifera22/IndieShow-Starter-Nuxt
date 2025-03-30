/**
 * components/layout/LayoutHeader.vue
 * 网站头部导航组件
 * 包含 Logo、导航菜单、语言切换、主题切换等功能
 * 支持响应式布局和移动端适配
 */
<script setup lang="ts">
import { nextTick, ref, watch, onMounted, onUnmounted } from "vue"
import { onClickOutside } from "@vueuse/core"

import CommonLocaleSwitch from "../common/CommonLocaleSwitch.vue"
import CommonThemeSwitch from "../common/CommonThemeSwitch.vue"

import { useRoute, useRouter, useI18n } from "#imports"
import { NAV_LINKS } from "~/config/nav"
import { useI18nLocale } from "~/composables/useLocale"
import { DEFAULT_LOCALE } from "~/i18n/config"

// 导航链接配置
const navLinks = NAV_LINKS

// 移动端菜单展开状态
const isMenuOpen = ref(false)

// 移动端菜单容器的引用
const mobileMenuRef = ref<HTMLElement | null>(null)
// 菜单按钮容器的引用
const menuButtonContainerRef = ref<HTMLElement | null>(null)

// 路由相关
const route = useRoute()
const router = useRouter()

// 国际化相关
const { t, locale } = useI18n()
const { getLocalePath } = useI18nLocale()

// 添加加载状态
const isLoading = ref(true)

// 初始化
onMounted(() => {
  // 确保页面加载时重置菜单状态和 body 样式
  isMenuOpen.value = false
  document.body.style.overflow = ""

  setTimeout(() => {
    isLoading.value = false
  }, 300)

  const handleEsc = (e: KeyboardEvent) => {
    if (e.key === "Escape" && isMenuOpen.value) {
      isMenuOpen.value = false
    }
  }
  window.addEventListener("keydown", handleEsc)
  onUnmounted(() => {
    window.removeEventListener("keydown", handleEsc)
    // 确保组件卸载时清理 body 样式
    document.body.style.overflow = ""
  })
})

// 监听点击外部事件，关闭菜单
onClickOutside(mobileMenuRef, (event) => {
  // 如果点击的是菜单按钮容器，不处理（让按钮的 click 事件处理）
  if (menuButtonContainerRef.value?.contains(event.target as Node)) {
    return
  }
  isMenuOpen.value = false
})

/**
 * 处理导航链接点击事件
 * @param href - 目标链接
 */
async function handleNavClick(href: string) {
  // 处理非锚点链接
  if (!href.startsWith("#")) {
    await router.push(getLocalePath(href))
    return
  }

  // 处理锚点链接
  const hash = href.split("#")[1]
  if (!hash)
    return

  // 关闭移动端菜单
  isMenuOpen.value = false

  // 如果不在首页，先跳转到首页
  if (route.path !== "/" && route.path !== `/${locale.value}` && (locale.value !== DEFAULT_LOCALE || route.path !== "/")) {
    await router.push(getLocalePath("/"))
    // 等待页面加载完成
    await new Promise(resolve => setTimeout(resolve, 500))
  }

  // 等待 DOM 更新完成
  await nextTick()

  // 滚动到目标元素
  const scrollToElement = () => {
    const element = document.getElementById(hash)
    if (element) {
      // 平滑滚动到目标位置
      element.scrollIntoView({ behavior: "smooth" })
      // 更新 URL hash，但不触发滚动
      window.history.pushState({}, "", getLocalePath(`#${hash}`))
    }
    else {
      // 如果元素还未加载，继续尝试
      setTimeout(scrollToElement, 100)
    }
  }
  scrollToElement()
}

/**
 * 处理 Logo 点击事件
 * 返回首页顶部
 */
async function handleLogoClick() {
  // 关闭移动端菜单
  isMenuOpen.value = false

  // 如果不在首页，跳转到首页
  if (route.path !== "/" && route.path !== `/${locale.value}` && (locale.value !== DEFAULT_LOCALE || route.path !== "/")) {
    await router.push(getLocalePath("/"))
  }

  // 移除 URL 中的 hash
  if (window.location.hash) {
    window.history.pushState({}, "", getLocalePath("/"))
  }

  // 平滑滚动到页面顶部
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

// 修改 watch 逻辑，确保在路由变化时正确清理状态
watch(
  () => route.fullPath,
  () => {
    isMenuOpen.value = false
    // 确保路由变化时重置 body 样式
    document.body.style.overflow = ""
  },
)

// 监听滚动时关闭菜单
onMounted(() => {
  const handleScroll = () => {
    if (isMenuOpen.value) {
      isMenuOpen.value = false
    }
  }
  window.addEventListener("scroll", handleScroll)
  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll)
  })
})

// 优化菜单状态监听逻辑
watch(isMenuOpen, (value) => {
  nextTick(() => {
    try {
      if (value) {
        document.body.style.overflow = "hidden"
      }
      else {
        document.body.style.overflow = ""
      }
    }
    catch (error) {
      console.error("Failed to update body overflow:", error)
      // 发生错误时确保重置为默认状态
      document.body.style.overflow = ""
    }
  })
})
</script>

<template>
  <!--
    头部导航容器
    sticky: 固定在顶部
    backdrop-blur-sm: 毛玻璃效果
    backdrop-saturate-150: 增加饱和度
   -->
  <header
    class="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/80 backdrop-blur-sm backdrop-saturate-150 transition-colors duration-200 ease-in-out dark:border-gray-800 dark:bg-gray-900/80"
  >
    <!-- 导航栏 -->
    <nav class="container mx-auto px-2 sm:px-4 lg:px-8">
      <!-- 实际内容 -->
      <template v-if="!isLoading">
        <!-- 导航栏内容 -->
        <div class="flex h-16 sm:h-18 items-center justify-between">
          <!-- Logo 和导航链接区域 -->
          <div class="flex items-center min-w-0">
            <!-- Logo 链接 -->
            <a
              href="/"
              class="group flex items-center space-x-2 sm:space-x-3 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400"
              @click.prevent="handleLogoClick"
            >
              <!-- Logo 图片 -->
              <img
                src="/logo.svg" alt="IndieShow Logo"
                class="h-7 w-7 sm:h-8 sm:w-8 transition-transform duration-200 ease-in-out group-hover:scale-110"
              >
              <!-- 网站标题 -->
              <span
                class="text-base sm:text-lg font-bold text-gray-900 transition-colors duration-200 ease-in-out group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400 truncate"
              >
                {{ t('site.title') }}
              </span>
            </a>

            <!-- 桌面端导航菜单 -->
            <div class="hidden md:flex md:space-x-1 lg:space-x-3 md:ml-4 lg:ml-8">
              <a
                v-for="link in navLinks" :key="link.href" :href="link.href"
                class="relative rounded-full px-3 py-2 sm:px-4 sm:py-2.5 text-sm font-medium text-gray-600 transition-all duration-300 ease-in-out hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 whitespace-nowrap"
                @click.prevent="handleNavClick(link.href)"
              >
                <span class="relative z-10">{{ t(link.text) }}</span>
                <span
                  class="absolute inset-0 -z-10 scale-x-0 rounded-full bg-primary-50 opacity-0 transition-all duration-300 ease-in-out group-hover:scale-x-100 group-hover:opacity-100 dark:bg-primary-900/20"
                />
              </a>
            </div>
          </div>

          <!-- 右侧功能区域 -->
          <div
            class="flex items-center justify-center h-full space-x-1 sm:space-x-2 md:space-x-3 lg:space-x-4 shrink-0"
          >
            <!-- 在桌面端显示语言和主题切换 -->
            <div class="hidden md:flex items-center space-x-2">
              <CommonLocaleSwitch class="flex items-center" />
              <CommonThemeSwitch class="flex items-center" />
            </div>
            <!-- 移动端只显示菜单按钮 -->
            <div ref="menuButtonContainerRef" class="md:hidden">
              <UButton
                class="flex items-center transition-colors duration-200" color="gray" variant="ghost" size="sm"
                :ui="{
                  rounded: 'rounded-lg',
                  padding: {
                    base: 'p-2',
                    sm: 'p-2.5',
                    md: 'p-3',
                  },
                  icon: {
                    base: 'h-6 w-6',
                    sm: 'h-6 w-6',
                  },
                  color: {
                    gray: {
                      ghost: 'hover:bg-gray-100 dark:hover:bg-gray-800',
                    },
                  },
                }" :icon="isMenuOpen ? 'lucide:x' : 'lucide:menu'" @click="isMenuOpen = !isMenuOpen"
              />
            </div>
          </div>
        </div>

        <!-- 移动端菜单遮罩和侧边栏 -->
        <Teleport to="body">
          <!-- 遮罩层动画 -->
          <Transition
            enter-active-class="transition-opacity duration-300 ease-out" enter-from-class="opacity-0"
            enter-to-class="opacity-100" leave-active-class="transition-opacity duration-200 ease-in"
            leave-from-class="opacity-100" leave-to-class="opacity-0"
          >
            <!-- 遮罩层 -->
            <div
              v-if="isMenuOpen" class="fixed inset-0 z-50 bg-gray-900/50 backdrop-blur-sm dark:bg-gray-900/80"
              aria-hidden="true"
            />
          </Transition>

          <!-- 侧边栏动画 -->
          <Transition
            enter-active-class="transition-transform duration-300 ease-out"
            enter-from-class="translate-x-full" enter-to-class="translate-x-0"
            leave-active-class="transition-transform duration-200 ease-in" leave-from-class="translate-x-0"
            leave-to-class="translate-x-full"
          >
            <!-- 侧边栏菜单 -->
            <div
              v-if="isMenuOpen" ref="mobileMenuRef"
              class="fixed right-0 top-0 bottom-0 z-50 w-[280px] max-w-[85vw] bg-white dark:bg-gray-900 shadow-xl dark:shadow-primary-900/20 flex flex-col"
            >
              <!-- 菜单内容 -->
              <nav class="flex-1 flex flex-col h-full">
                <!-- 侧边栏头部 -->
                <div
                  class="sticky top-0 z-10 flex items-center justify-between px-3 py-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm backdrop-saturate-150 border-b border-gray-100 dark:border-gray-800"
                >
                  <div class="flex items-center space-x-3 px-4">
                    <img src="/logo.svg" alt="Logo" class="h-8 w-auto">
                    <span class="text-lg font-semibold text-gray-900 dark:text-white">{{ t('site.title') }}</span>
                  </div>
                  <UButton
                    class="flex items-center transform-gpu transition-all duration-300 ease-in-out hover:rotate-90 hover:scale-110 active:scale-95 mr-3"
                    color="gray" variant="ghost" size="sm" :ui="{
                      rounded: 'rounded-full',
                      padding: {
                        base: 'p-2',
                        sm: 'p-2',
                        md: 'p-2',
                      },
                      icon: { base: 'h-5 w-5' },
                    }" icon="lucide:x" :aria-label="t('components.aria.close_menu')" @click="isMenuOpen = false"
                  />
                </div>

                <!-- 菜单链接列表 -->
                <div class="flex-1 overflow-y-auto">
                  <!-- 主导航链接 -->
                  <div class="px-3 py-4 space-y-1">
                    <a
                      v-for="link in navLinks" :key="link.href" :href="link.href"
                      class="group flex items-center px-4 py-3 rounded-xl text-base font-medium text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-gray-800/50 transition-all duration-200"
                      @click.prevent="handleNavClick(link.href)"
                    >
                      <span class="relative">
                        {{ t(link.text) }}
                        <span
                          class="absolute inset-x-0 -bottom-0.5 h-0.5 bg-primary-500 scale-x-0 opacity-0 transition-all duration-300 group-hover:scale-x-100 group-hover:opacity-100"
                        />
                      </span>
                    </a>
                  </div>

                  <!-- 分隔线 -->
                  <div class="h-px bg-gray-100 dark:bg-gray-800 mx-3" />

                  <!-- 功能按钮区域 -->
                  <div class="px-3 py-4">
                    <!-- 语言和主题切换 -->
                    <div class="flex items-center justify-center gap-4 px-4 py-3 text-gray-700 dark:text-gray-300">
                      <div class="flex-1 flex justify-center">
                        <CommonLocaleSwitch :always-show-name="true" />
                      </div>
                      <div class="h-6 w-px bg-gray-200 dark:bg-gray-700" />
                      <div class="flex-1 flex justify-center">
                        <CommonThemeSwitch />
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 底部信息 -->
                <div
                  class="shrink-0 px-3 py-4 bg-gray-50/50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-800"
                >
                  <div class="flex items-center justify-between px-4">
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                      © {{ new Date().getFullYear() }} {{ t('site.title') }}
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </Transition>
        </Teleport>
      </template>

      <!-- 骨架屏 -->
      <template v-else>
        <div class="flex h-16 items-center justify-between">
          <!-- Logo占位 -->
          <div class="flex items-center">
            <div
              class="h-8 w-32 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded relative overflow-hidden"
            >
              <div
                class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-loading"
              />
            </div>
          </div>

          <!-- 右侧功能区域占位 -->
          <div class="flex items-center space-x-4">
            <!-- 桌面端语言和主题切换占位 -->
            <div class="hidden md:flex items-center space-x-4">
              <div
                class="h-8 w-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-full relative overflow-hidden"
              >
                <div
                  class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-loading"
                />
              </div>
              <div
                class="h-8 w-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-full relative overflow-hidden"
              >
                <div
                  class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-loading"
                />
              </div>
            </div>
            <!-- 移动端菜单按钮占位 -->
            <div class="md:hidden">
              <div
                class="h-8 w-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-md relative overflow-hidden"
              >
                <div
                  class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-loading"
                />
              </div>
            </div>
          </div>
        </div>
      </template>
    </nav>
  </header>
</template>

<style scoped>
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

/* 防止侧边栏内容溢出 */
.overflow-y-auto {
  -webkit-overflow-scrolling: touch;
}

/* 优化侧边栏动画性能 */
.transform {
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform-style: preserve-3d;
  will-change: transform;
}
</style>
