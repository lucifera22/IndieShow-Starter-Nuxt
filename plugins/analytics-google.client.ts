import { defineNuxtPlugin } from "#app"

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const route = useRoute()

  // 如果未设置 GA ID，则不初始化
  if (!config.public.googleAnalyticsId) {
    // 只在开发环境下打印警告
    if (config.public.environment === "development") {
      console.warn("Google Analytics: ID not set")
    }
    return
  }

  // 创建 gtag 函数
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag(...args: any[]) {
    window.dataLayer.push(args)
  }

  // 加载 Google Analytics 脚本
  const loadGoogleAnalytics = () => {
    try {
      const script = document.createElement("script")
      script.async = true
      script.src = `https://www.googletagmanager.com/gtag/js?id=${config.public.gaId}`

      // 添加加载错误处理
      script.onerror = () => {
        // 只在开发环境下打印错误
        if (config.public.environment === "development") {
          console.error("Google Analytics: Script loading failed")
        }
      }

      document.head.appendChild(script)

      // 初始化 Google Analytics
      window.gtag("js", new Date())
      window.gtag("config", config.public.gaId, {
        page_path: route.path,
        send_page_view: true,
      })
    }
    catch (error) {
      // 只在开发环境下打印错误
      if (config.public.environment === "development") {
        console.error("Google Analytics: Initialization failed", error)
      }
    }
  }

  // 页面加载完成后再加载 GA
  if (process.client) {
    nuxtApp.hook("app:mounted", () => {
      loadGoogleAnalytics()
    })
  }

  // 监听路由变化
  nuxtApp.hook("page:finish", () => {
    try {
      window.gtag("event", "page_view", {
        page_path: route.path,
        page_title: document.title,
      })
    }
    catch (error) {
      // 只在开发环境下打印错误
      if (config.public.environment === "development") {
        console.error("Google Analytics: Page tracking failed", error)
      }
    }
  })
})
