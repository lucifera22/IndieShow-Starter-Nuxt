import type { LocaleObject } from "@nuxtjs/i18n"

// 支持的语言列表
export const LOCALES: LocaleObject[] = [
  {
    code: "en",
    iso: "en-US",
    name: "English",
    dir: "ltr",
    file: "en/index.ts",
  },
  {
    code: "zh",
    iso: "zh-CN",
    name: "中文",
    dir: "ltr",
    file: "zh/index.ts",
  },
]

// 默认语言
export const DEFAULT_LOCALE = "en"

// i18n 配置
export const i18nConfig = {
  defaultLocale: DEFAULT_LOCALE,
  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: "i18n_redirected",
    alwaysRedirect: true,
    redirectOn: "root" as const,
  },
  langDir: "locales",
  lazy: false,
  locales: LOCALES,
  strategy: "prefix_except_default" as const,
  customRoutes: "config",
  vueI18n: "../i18n.config.ts",
  precompile: {
    strictMessage: true,
    escapeHtml: true,
  },
  missingWarn: false,
  fallbackWarn: false,
  silentTranslationWarn: true,
  fallbackLocale: DEFAULT_LOCALE as "en" | "zh",
  messages: {
    en: {},
    zh: {},
  },
  bundle: {
    optimizeTranslationDirective: false,
  },
} as const
