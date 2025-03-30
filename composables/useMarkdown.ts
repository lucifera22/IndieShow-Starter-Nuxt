import { ref } from "vue"

import { useFetch } from "#app"

export function useMarkdown() {
  const content = ref("")
  const error = ref<Error | null>(null)
  const loading = ref(false)

  // 加载 markdown 内容
  const loadMarkdown = async (locale: string, page: string) => {
    loading.value = true
    error.value = null
    content.value = ""

    try {
      const { data, error: fetchError } = await useFetch<string>("/api/markdown", {
        params: { locale, page },
        key: `markdown-${locale}-${page}`,
      })

      if (fetchError.value) {
        throw new Error(fetchError.value.message || "Unable to load content")
      }

      if (!data.value) {
        throw new Error("Content is empty")
      }

      // 确保 data.value 是字符串类型
      if (typeof data.value === "string") {
        content.value = data.value
      }
      else {
        throw new TypeError("Invalid content type")
      }
    }
    catch (e) {
      error.value = e as Error
      console.error("Error loading content:", e)
    }
    finally {
      loading.value = false
    }
  }

  return {
    content,
    error,
    loading,
    loadMarkdown,
  }
}
