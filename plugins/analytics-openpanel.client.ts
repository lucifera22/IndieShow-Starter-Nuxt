import { defineNuxtPlugin, useRuntimeConfig } from "#app"

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const { opClientId } = config.public

  // 如果未设置必要的配置，则不初始化
  if (!opClientId) {
    if (config.public.environment === "development") {
      console.warn("OpenPanel Analytics: Client ID not set")
    }
    return
  }

  // 初始化 window.op 函数
  window.op
    = window.op
      || function (...args) {
        (window.op.q = window.op.q || []).push(args)
      }

  // 初始化 OpenPanel
  window.op("init", {
    clientId: opClientId,
    trackScreenViews: true,
    trackOutgoingLinks: true,
    trackAttributes: true,
  })

  // 在页面加载完成后加载 OpenPanel 脚本
  nuxtApp.hook("app:mounted", () => {
    // 添加 OpenPanel 脚本
    const script = document.createElement("script")
    script.async = true
    script.defer = true
    script.src = "https://openpanel.dev/op1.js"
    document.head.appendChild(script)

    // 监听路由变化，记录页面访问
    nuxtApp.hook("page:finish", () => {
      window.op("track", "page_view", {
        path: window.location.pathname,
        title: document.title,
        url: window.location.href,
      })
    })
  })

  // 提供全局的事件跟踪函数
  return {
    provide: {
      // 跟踪事件
      trackEvent: (eventName: string, properties: Record<string, any> = {}) => {
        window.op("track", eventName, properties)
      },
      // 识别用户
      identifyUser: (userId: string, traits: Record<string, any> = {}) => {
        window.op("identify", userId, traits)
      },
    },
  }
})
