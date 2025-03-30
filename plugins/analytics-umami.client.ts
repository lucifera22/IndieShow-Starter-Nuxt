import { defineNuxtPlugin, useRuntimeConfig } from "#app"

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const { umamiWebsiteId } = config.public

  // 如果未设置必要的配置，则不初始化
  if (!umamiWebsiteId) {
    if (config.public.environment === "development") {
      console.warn("Umami Analytics: Website ID not set")
    }
    return
  }

  // 在页面加载完成后加载 Umami 脚本
  nuxtApp.hook("app:mounted", () => {
    // 添加 Umami 脚本
    const script = document.createElement("script")
    script.defer = true
    script.async = true
    script.setAttribute("data-website-id", umamiWebsiteId)
    script.src = "https://cloud.umami.is/script.js"
    document.head.appendChild(script)

    // 监听路由变化
    nuxtApp.hook("page:finish", () => {
      // Umami 会自动跟踪页面访问，无需手动调用
    })
  })

  // 提供全局的事件跟踪函数
  return {
    provide: {
      // 跟踪自定义事件
      trackUmamiEvent: (
        eventName: string,
        properties?: Record<string, any>,
      ) => {
        if (window.umami) {
          window.umami.track(eventName, properties)
        }
      },
      // 识别用户
      identifyUmamiUser: (userId: string) => {
        if (window.umami) {
          window.umami.identify(userId)
        }
      },
    },
  }
})
