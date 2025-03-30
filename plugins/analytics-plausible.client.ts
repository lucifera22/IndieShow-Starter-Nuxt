import { defineNuxtPlugin, useRuntimeConfig } from "#app"

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const { plausibleDomain } = config.public

  // 如果未设置必要的配置，则不初始化
  if (!plausibleDomain) {
    if (config.public.environment === "development") {
      console.warn("Plausible Analytics: Domain not set")
    }
    return
  }

  // 在页面加载完成后加载 Plausible 脚本
  nuxtApp.hook("app:mounted", () => {
    // 添加 Plausible 脚本
    const script = document.createElement("script")
    script.defer = true
    script.dataset.domain = plausibleDomain
    script.src = "https://plausible.io/js/script.js"
    document.head.appendChild(script)

    // 监听路由变化
    nuxtApp.hook("page:finish", () => {
      // Plausible 会自动跟踪页面访问，无需手动调用
    })
  })

  // 提供全局的事件跟踪函数
  return {
    provide: {
      // 跟踪自定义事件
      trackPlausibleEvent: (eventName: string, options?: Record<string, any>) => {
        if (window.plausible) {
          window.plausible(eventName, { props: options })
        }
      },
    },
  }
})
