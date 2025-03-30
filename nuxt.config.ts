import { defineNuxtConfig } from "nuxt/config"

import { i18nConfig } from "./i18n/config"
import { metaConfig } from "./config/theme"

/**
 * Nuxt 3 配置文件
 * 包含了项目的所有核心配置，如模块、运行时配置、路由规则等
 * 详细文档：https://nuxt.com/docs/api/configuration/nuxt-config
 */
export default defineNuxtConfig({
  // 开启服务端渲染(SSR)，提升首屏加载速度和SEO效果
  ssr: true,

  // 核心模块配置
  modules: [
    "@nuxtjs/sitemap", // 自动生成站点地图
    "@nuxt/ui", // UI组件库
    "@nuxtjs/i18n", // 国际化支持
    "@nuxtjs/color-mode", // 颜色模式（暗色/亮色）
    "@nuxt/icon", // 图标支持
  ],

  // 图标配置，使用 iconify 作为图标提供者
  icon: {
    provider: "iconify",
  },

  // 组件自动导入配置
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],

  devtools: { enabled: false },

  // 运行时配置，包含所有环境变量
  runtimeConfig: {
    public: {
      environment: process.env.NODE_ENV,
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL,
      siteName: process.env.NUXT_PUBLIC_SITE_NAME,
      typewriterEnabled: process.env.NUXT_PUBLIC_TYPEWRITER_ENABLED,
      typewriterSpeed: process.env.NUXT_PUBLIC_TYPEWRITER_SPEED,
      googleAnalyticsId: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
      baiduId: process.env.NUXT_PUBLIC_BAIDU_ID,
      opClientId: process.env.NUXT_PUBLIC_OP_CLIENT_ID,
      plausibleDomain: process.env.NUXT_PUBLIC_PLAUSIBLE_DOMAIN,
      umamiWebsiteId: process.env.NUXT_PUBLIC_UMAMI_WEBSITE_ID,
    },
  },

  // 应用全局配置
  app: {
    head: {
      title: process.env.NUXT_PUBLIC_SITE_NAME,
      titleTemplate: `%s - ${process.env.NUXT_PUBLIC_SITE_NAME}`,
      htmlAttrs: {
        lang: i18nConfig.defaultLocale,
      },
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { charset: "utf-8" },
        { name: "format-detection", content: "telephone=no" },
        ...metaConfig,
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
        { rel: "manifest", href: "/site.webmanifest" },
        // 合并 DNS 预取和预连接
        { rel: "dns-prefetch preconnect", href: "https://fonts.googleapis.com" },
        { rel: "dns-prefetch preconnect", href: "https://fonts.gstatic.com", crossorigin: "anonymous" as const },
      ],
    },
  },

  // 站点配置
  appConfig: {
    siteName: process.env.NUXT_PUBLIC_SITE_NAME,
    siteUrl: process.env.NUXT_PUBLIC_SITE_URL,
  },

  // 颜色模式配置
  colorMode: {
    classSuffix: "",
    preference: "system",
    fallback: "light",
    dataValue: "theme",
    storageKey: "nuxt-color-mode",
  },

  // 路由规则配置
  routeRules: {
    // 所有路由静态化
    "/**": {
      static: true,
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    },
  },

  // 实验性功能配置
  experimental: {
    viewTransition: true, // 启用视图过渡
  },

  // Nitro 服务器引擎配置
  nitro: {
    // 压缩静态资源
    compressPublicAssets: true,
  },

  // Vite 构建工具配置
  vite: {
    build: {
      sourcemap: process.env.NODE_ENV === "development",
    },
    optimizeDeps: {
      include: ["@vueuse/core"],
    },
  },

  // 国际化配置
  i18n: i18nConfig,

  compatibilityDate: "2025-02-23",
})
