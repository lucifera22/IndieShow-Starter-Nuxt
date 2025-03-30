<script setup lang="ts">
import MarkdownIt from "markdown-it"
import DOMPurify from "isomorphic-dompurify"

const props = defineProps<{
  page: string
}>()

const { locale, t } = useI18n()

// 创建 markdown-it 实例
const md = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true,
})

// 配置 DOMPurify
const purifyConfig = {
  ALLOWED_TAGS: [
    "p",
    "div",
    "span",
    "br",
    "hr",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "strong",
    "em",
    "del",
    "ins",
    "mark",
    "ul",
    "ol",
    "li",
    "blockquote",
    "a",
    "img",
  ],
  ALLOWED_ATTR: [
    "id",
    "class",
    "href",
    "target",
    "rel",
    "src",
    "alt",
    "title",
    "width",
    "height",
  ],
}

const content = ref("")
const loading = ref(true)
const error = ref<Error | null>(null)

// 加载并渲染 Markdown 内容
async function loadContent() {
  try {
    loading.value = true
    error.value = null

    // 动态导入 Markdown 文件
    const markdown = await import(`~/content/${locale.value}/${props.page}.md?raw`)
    const html = md.render(markdown.default || "")
    content.value = DOMPurify.sanitize(html, purifyConfig)
  }
  catch (e) {
    console.error("Error loading markdown:", e)
    error.value = e instanceof Error ? e : new Error("Failed to load content")
  }
  finally {
    loading.value = false
  }
}

// 监听语言变化
watch(() => locale.value, loadContent, { immediate: true })
</script>

<template>
  <article class="prose prose-primary mx-auto dark:prose-invert lg:prose-lg">
    <div v-if="loading" class="flex items-center justify-center py-8">
      <div class="text-gray-500">
        <Icon name="lucide:loader-2" class="mr-2 h-5 w-5 animate-spin" />
        {{ t('components.loading.description') }}
      </div>
    </div>
    <div v-else-if="error" class="rounded-lg bg-red-50 p-4 text-red-500 dark:bg-red-950">
      <div class="flex items-center">
        <Icon name="lucide:alert-triangle" class="mr-2 h-5 w-5" />
        {{ t('components.error_page.description') }}
      </div>
    </div>
    <div v-else v-html="content" />
  </article>
</template>
