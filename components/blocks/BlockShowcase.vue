<script setup lang="ts">
import { ref, computed, onMounted } from "vue"

import { UIQRCodeModal, UIScrollAnimation } from "#components"
import { useI18n } from "#imports"
import { showcaseConfig } from "~/config/showcase"
import type { QRCodeModalState, ShowcaseItem } from "~/types/config/showcase"

// 使用 i18n
const { t } = useI18n()

// 使用 showcase 配置
const showcase = showcaseConfig

// 分类列表
const categories = [
  { key: "all", type: "all" },
  { key: "web", type: "web" },
  { key: "mobile", type: "mobile" },
  { key: "desktop", type: "desktop" },
]

// 当前选中的分类
const currentCategory = ref("all")

// 是否正在加载
const isLoading = ref(true)

// 过滤后的项目列表
const filteredProjects = computed(() => {
  if (currentCategory.value === "all") {
    return showcase.items
  }
  return showcase.items.filter(item => item.type === currentCategory.value)
})

// 分类切换动画状态
const isChangingCategory = ref(false)
const previousCategory = ref("all")

// 优化分类切换函数
async function changeCategory(type: string) {
  if (currentCategory.value === type || isChangingCategory.value)
    return

  isChangingCategory.value = true
  previousCategory.value = currentCategory.value
  isLoading.value = true

  // 更新分类
  currentCategory.value = type

  // 模拟加载延迟，实际项目中可能是API调用
  await new Promise(resolve => setTimeout(resolve, 300))

  isLoading.value = false
  isChangingCategory.value = false
}

// 计算过渡动画类名
function getTransitionClass(project: ShowcaseItem) {
  if (isChangingCategory.value) {
    return project.type === currentCategory.value
      ? "transition-all duration-500 opacity-100 transform translate-y-0"
      : "transition-all duration-300 opacity-0 transform translate-y-4"
  }
  return ""
}

// 初始化
onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 500)
})

// 二维码弹窗状态
const qrCodeModal = ref<QRCodeModalState>({
  isOpen: false,
  title: "",
  qrCodeUrl: "",
  description: "",
})

// 优化项目打开函数
function openProject(project: ShowcaseItem) {
  if (!project.link)
    return

  // 添加点击反馈
  const feedback = document.createElement("div")
  feedback.className = "fixed inset-0 bg-primary-500/5 dark:bg-primary-400/5 z-50 transition-opacity duration-300"
  document.body.appendChild(feedback)

  // 打开链接
  setTimeout(() => {
    window.open(project.link, "_blank", "noopener,noreferrer")
    // 移除反馈效果
    feedback.classList.add("opacity-0")
    setTimeout(() => feedback.remove(), 300)
  }, 150)
}

// 优化二维码打开函数
function openQRCode(projectIndex: number) {
  const project = showcase.items[projectIndex]
  if (!project.qrCode)
    return

  // 添加打开动画
  qrCodeModal.value = {
    isOpen: true,
    title: t(`showcase.items.project${projectIndex + 1}.title`),
    qrCodeUrl: project.qrCode,
    description: t(`showcase.items.project${projectIndex + 1}.qr_code_description`),
  }
}
</script>

<template>
  <section
    id="showcase"
    class="relative overflow-hidden bg-gradient-to-b from-white via-gray-50/80 to-white dark:from-gray-900 dark:via-gray-800/95 dark:to-gray-900 transition-colors duration-200 scroll-mt-24 py-16 sm:py-20"
    role="region" :aria-label="t('showcase.title')"
  >
    <!-- 顶部渐变过渡 -->
    <div
      class="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white/80 to-transparent dark:from-gray-900/80"
      aria-hidden="true"
    />

    <!-- 底部渐变过渡 -->
    <div
      class="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/80 to-transparent dark:from-gray-900/80"
      aria-hidden="true"
    />
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-3xl text-center">
        <UIScrollAnimation animation="zoom-in" :duration="1200">
          <div class="relative">
            <h2
              class="relative bg-gradient-to-r from-primary-600 via-primary-500 to-primary-400 bg-clip-text text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent"
            >
              {{ t('showcase.title') }}
            </h2>
            <!-- 添加副标题 -->
            <p class="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {{ t('showcase.subtitle') }}
            </p>
          </div>
        </UIScrollAnimation>
      </div>

      <div class="mx-auto mt-12 sm:mt-16">
        <!-- 分类筛选 -->
        <UIScrollAnimation animation="fade-down" :duration="800">
          <div
            class="flex flex-wrap justify-center gap-4 mb-8 md:mb-10" role="tablist"
            :aria-label="t('components.showcase.aria.filter_projects')"
          >
            <UButton
              v-for="category in categories" :key="category.key" color="gray" variant="ghost" size="lg"
              class="rounded-full hover:scale-105 transition-all duration-300 text-base relative overflow-hidden"
              :class="[
                category.type === currentCategory
                  ? 'bg-primary-500/10 text-primary-500 dark:bg-primary-400/10 dark:text-primary-400'
                  : '',
                isChangingCategory && category.type === currentCategory
                  ? 'animate-pulse'
                  : '',
              ]" :disabled="isChangingCategory" role="tab" :aria-selected="category.type === currentCategory"
              :aria-label="t('components.showcase.aria.current_filter', { category: t(`showcase.categories.${category.key}`) })"
              @click="changeCategory(category.type)"
            >
              {{ t(`showcase.categories.${category.key}`) }}
              <!-- 添加涟漪效果 -->
              <div
                v-if="category.type === currentCategory"
                class="absolute inset-0 bg-primary-500/5 dark:bg-primary-400/5 rounded-full transform scale-0 animate-ripple"
                aria-hidden="true"
              />
            </UButton>
          </div>
        </UIScrollAnimation>

        <!-- 作品网格 -->
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto"
          role="tabpanel"
          :aria-label="t('components.showcase.aria.current_filter', { category: t(`showcase.categories.${currentCategory}`) })"
        >
          <template v-if="!isLoading">
            <UIScrollAnimation
              v-for="(project, key) in filteredProjects" :key="project.id || key" animation="fade-up"
              :delay="key * 100" :duration="800"
            >
              <div
                class="group/card relative bg-white/90 dark:bg-gray-800/70 rounded-xl shadow-lg ring-1 ring-gray-200/50 dark:ring-gray-700/50 transition-all duration-500 hover:-translate-y-2 hover:bg-white dark:hover:bg-gray-900 backdrop-blur-sm overflow-hidden h-[280px] hover:scale-[1.02]"
                :class="[getTransitionClass(project)]" role="article"
                :aria-label="t('components.showcase.aria.project_card', { title: t(`showcase.items.project${key + 1}.title`) })"
              >
                <div class="p-6 flex flex-col h-full">
                  <!-- Logo 和标题区 -->
                  <div class="flex items-start gap-4 mb-4">
                    <!-- Logo -->
                    <div
                      class="relative flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900"
                      role="img" :aria-label="t(`showcase.items.project${key + 1}.title`)"
                    >
                      <img
                        :src="project.image" :alt="t(`showcase.items.project${key + 1}.title`)"
                        class="w-full h-full object-contain p-2.5 transition-transform duration-500 group-hover/card:scale-110"
                        loading="lazy" decoding="async" fetchpriority="low"
                      >
                    </div>

                    <div class="flex-1 min-w-0">
                      <!-- 标题和状态 -->
                      <div class="flex items-center justify-between gap-2 mb-2">
                        <h3
                          :id="`project-title-${key}`"
                          class="text-lg font-semibold text-gray-900 dark:text-white group-hover/card:text-primary-500 dark:group-hover/card:text-primary-400 transition-colors duration-300 truncate"
                        >
                          {{ t(`showcase.items.project${key + 1}.title`) }}
                        </h3>
                        <!-- 状态标签 -->
                        <span
                          class="flex-shrink-0 inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-md transition-colors duration-300"
                          :class="[
                            project.isOnline
                              ? 'bg-green-500/10 text-green-500 dark:bg-green-400/10 dark:text-green-400'
                              : 'bg-amber-500/10 text-amber-500 dark:bg-amber-400/10 dark:text-amber-400',
                          ]" :aria-label="t('components.showcase.aria.project_status', {
                            status: project.isOnline ? t('showcase.status.online') : t('showcase.status.developing'),
                          })"
                        >
                          <UIcon
                            :name="project.isOnline ? 'lucide:check-circle' : 'lucide:clock'"
                            class="h-3.5 w-3.5 mr-1" aria-hidden="true"
                          />
                          {{ project.isOnline ? t('showcase.status.online') : t('showcase.status.developing') }}
                        </span>
                      </div>

                      <!-- 简短描述 -->
                      <p
                        class="text-base leading-relaxed text-gray-600 dark:text-gray-300 line-clamp-2" :aria-label="t('components.showcase.aria.project_description', {
                          description: t(`showcase.items.project${key + 1}.description`),
                        })"
                      >
                        {{ t(`showcase.items.project${key + 1}.description`) }}
                      </p>
                    </div>
                  </div>

                  <!-- 中间伸展区域 -->
                  <div class="flex-1">
                    <!-- 技术标签 -->
                    <div
                      class="flex flex-wrap gap-2 mb-4"
                      role="list"
                      :aria-label="t('components.showcase.aria.project_tags')"
                    >
                      <div
                        v-for="(tag, tagIndex) in project.tags.slice(0, 3)"
                        :key="tagIndex"
                        class="group/tag inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-300 hover:scale-105 bg-opacity-10 dark:bg-opacity-20"
                        :class="[tag.color]"
                        :title="tag.name"
                        role="listitem"
                        :aria-label="t('components.showcase.aria.project_tag', { name: tag.name })"
                      >
                        <UIcon :name="tag.icon" class="h-4 w-4" aria-hidden="true" />
                        {{ tag.name }}
                      </div>
                      <UTooltip
                        v-if="project.tags.length > 3"
                        :text="project.tags.slice(3).map(t => t.name).join(', ')"
                      >
                        <div
                          class="px-3 py-1.5 text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700/50 rounded-md"
                          role="listitem"
                          :aria-label="t('components.showcase.aria.more_tags', { count: project.tags.length - 3 })"
                        >
                          +{{ project.tags.length - 3 }}
                        </div>
                      </UTooltip>
                    </div>
                  </div>

                  <!-- 底部固定区域 -->
                  <div class="mt-auto">
                    <!-- 分隔线 -->
                    <div class="h-px bg-gray-100 dark:bg-gray-700/50 mb-4" aria-hidden="true" />

                    <!-- 平台图标和操作按钮 -->
                    <div class="flex items-center justify-between">
                      <!-- 平台图标 -->
                      <div
                        class="flex gap-3" role="group"
                        :aria-label="t('components.showcase.aria.project_platforms')"
                      >
                        <UTooltip
                          v-for="(platform, platformIndex) in project.platforms" :key="platformIndex"
                          :text="platform.name"
                        >
                          <div
                            class="text-gray-500 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 transition-colors duration-300"
                            role="img" :aria-label="platform.name"
                          >
                            <UIcon :name="platform.icon" class="h-5 w-5" />
                          </div>
                        </UTooltip>
                      </div>

                      <!-- 操作按钮 -->
                      <div class="flex items-center gap-3">
                        <UButton
                          size="sm" color="primary" variant="ghost" class="group/btn" :aria-label="t('components.showcase.aria.view_project_details', {
                            title: t(`showcase.items.project${key + 1}.title`),
                          })" @click="openProject(project)"
                        >
                          <span class="flex items-center justify-center gap-1.5">
                            {{ t('showcase.view_details') }}
                            <UIcon
                              name="lucide:arrow-right"
                              class="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5"
                              aria-hidden="true"
                            />
                          </span>
                        </UButton>
                        <UButton
                          v-if="project.qrCode" size="sm" color="gray" variant="ghost" class="group/qr"
                          :aria-label="t('components.showcase.aria.open_project_qrcode', {
                            title: t(`showcase.items.project${key + 1}.title`),
                          })" @click="openQRCode(key)"
                        >
                          <UIcon
                            name="lucide:qr-code"
                            class="h-4 w-4 transition-transform duration-300 group-hover/qr:rotate-12"
                            aria-hidden="true"
                          />
                        </UButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </UIScrollAnimation>
          </template>
          <template v-else>
            <div
              v-for="i in 3" :key="i"
              class="bg-white/90 dark:bg-gray-800/70 rounded-xl shadow-lg ring-1 ring-gray-200/50 dark:ring-gray-700/50 h-[280px] relative overflow-hidden"
              role="alert" :aria-label="t('components.showcase.aria.loading_projects')"
            >
              <div class="p-6 flex flex-col h-full">
                <div class="flex items-start gap-4 mb-4">
                  <div
                    class="w-14 h-14 rounded-xl bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 relative overflow-hidden"
                  >
                    <div
                      class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-loading"
                    />
                  </div>
                  <div class="flex-1">
                    <div
                      class="h-6 w-2/3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded mb-2 relative overflow-hidden"
                    >
                      <div
                        class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-loading"
                      />
                    </div>
                    <div
                      class="h-4 w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded relative overflow-hidden"
                    >
                      <div
                        class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-loading"
                      />
                    </div>
                  </div>
                </div>
                <div class="flex-1">
                  <div class="flex gap-2 mb-4">
                    <div
                      class="h-8 w-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-md relative overflow-hidden"
                    >
                      <div
                        class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-loading"
                      />
                    </div>
                    <div
                      class="h-8 w-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-md relative overflow-hidden"
                    >
                      <div
                        class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-loading"
                      />
                    </div>
                  </div>
                </div>
                <div class="mt-auto">
                  <div
                    class="h-px bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 mb-4 relative overflow-hidden"
                  >
                    <div
                      class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-loading"
                    />
                  </div>
                  <div class="flex justify-between items-center">
                    <div class="flex gap-3">
                      <div
                        class="h-5 w-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-full relative overflow-hidden"
                      >
                        <div
                          class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-loading"
                        />
                      </div>
                      <div
                        class="h-5 w-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-full relative overflow-hidden"
                      >
                        <div
                          class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-loading"
                        />
                      </div>
                    </div>
                    <div class="flex gap-3">
                      <div
                        class="h-8 w-24 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-md relative overflow-hidden"
                      >
                        <div
                          class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-loading"
                        />
                      </div>
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
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- 二维码弹窗 -->
    <UIQRCodeModal
      :is-open="qrCodeModal.isOpen" :title="qrCodeModal.title" :qr-code-url="qrCodeModal.qrCodeUrl"
      :description="qrCodeModal.description" @update:is-open="qrCodeModal.isOpen = $event"
    />
  </section>
</template>

<style scoped>
/* 基础动画关键帧定义 */
@keyframes bounce-right {
  0%,
  100% {
    transform: translateX(0);
  }

  50% {
    transform: translateX(4px);
  }
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

@keyframes skeletonLoading {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(100%);
  }
}

/* 卡片基础样式优化 */
.group\/card {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  isolation: isolate;
}

/* 卡片悬停效果增强 */
.group\/card:hover {
  transform: translateY(-8px) scale(1.02);
}

/* 暗色模式下的卡片效果 */
.dark .group\/card {
  backdrop-filter: blur(12px);
  background: rgba(17, 24, 39, 0.7);
}

.dark .group\/card:hover {
  background: rgba(17, 24, 39, 0.85);
}

/* 标签悬停效果 */
.group\/tag {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.group\/tag:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

/* 图标动画效果 */
.group\/btn:hover .lucide-arrow-right {
  transform: translateX(4px);
  transition: transform 0.3s ease;
}

.group\/qr:hover .lucide-qr-code {
  transform: rotate(12deg) scale(1.1);
  transition: transform 0.3s ease;
}

/* Logo 动画效果 */
.group\/card:hover img {
  transform: scale(1.15) rotate(5deg);
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 分类按钮动画 */
.rounded-full {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.rounded-full:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(var(--color-primary-500), 0.2);
}

/* 骨架屏动画优化 */
.skeleton-loading {
  animation: skeletonLoading 1.5s infinite;
}

/* 优化暗色模式下骨架屏的效果 */
@media (prefers-color-scheme: dark) {
  .skeleton-loading {
    opacity: 0.1;
  }
}

/* 减少动画模式 */
@media (prefers-reduced-motion: reduce) {
  .skeleton-loading {
    animation: none !important;
  }
  .group\/card,
  .group\/tag,
  .rounded-full,
  .group\/card img {
    transition: none !important;
  }
}

/* 添加涟漪动画 */
@keyframes ripple {
  0% {
    transform: scale(0);
    opacity: 1;
  }

  100% {
    transform: scale(4);
    opacity: 0;
  }
}

.animate-ripple {
  animation: ripple 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

/* 分类切换动画 */
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.7;
  }
}
</style>
