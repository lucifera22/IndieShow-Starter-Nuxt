import { defineNuxtPlugin } from "#app"

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const route = useRoute()

  // 如果未设置站点 ID，则不初始化
  if (!config.public.baiduId) {
    // 只在开发环境下打印警告
    if (config.public.environment === "development") {
      console.warn("Baidu Analytics: Site ID not set")
    }
    return
  }

  // 初始化百度统计数组
  window._hmt = window._hmt || []

  // 加载百度统计脚本
  const loadBaiduAnalytics = () => {
    try {
      const script = document.createElement("script")
      script.async = true
      script.src = `https://hm.baidu.com/hm.js?${config.public.baiduId}`

      // 添加加载错误处理
      script.onerror = () => {
        // 只在开发环境下打印错误
        if (config.public.environment === "development") {
          console.error("Baidu Analytics: Script loading failed")
        }
      }

      document.head.appendChild(script)
    }
    catch (error) {
      // 只在开发环境下打印错误
      if (config.public.environment === "development") {
        console.error("Baidu Analytics: Initialization failed", error)
      }
    }
  }

  // 页面加载完成后再加载百度统计
  if (process.client) {
    nuxtApp.hook("app:mounted", () => {
      loadBaiduAnalytics()
    })
  }

  // 监听路由变化
  nuxtApp.hook("page:finish", () => {
    try {
      window._hmt.push(["_trackPageview", route.path])
    }
    catch (error) {
      // 只在开发环境下打印错误
      if (config.public.environment === "development") {
        console.error("Baidu Analytics: Page tracking failed", error)
      }
    }
  })
})
