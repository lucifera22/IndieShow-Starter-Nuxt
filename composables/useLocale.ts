import { useI18n, useRoute, computed, navigateTo } from "#imports"
import { LOCALES, DEFAULT_LOCALE } from "~/i18n/config"
import type { Locale } from "~/types/i18n"

/**
 * 语言切换组合式函数
 * @description 提供语言切换和初始化功能，包含错误处理和性能优化
 */
export function useI18nLocale() {
  const { locale, t, setLocale } = useI18n()
  const route = useRoute()

  // 缓存常用值，避免重复计算
  const localesMap = computed(() => new Map(
    LOCALES.map(l => [l.code, l]),
  ))

  /**
   * 检查路径类型并规范化
   * @param path 输入路径
   * @returns 规范化后的路径
   */
  const normalizePath = (path: string) => {
    // 确保路径以 / 开头（除非是外部链接或锚点）
    if (!path.startsWith("/") && !path.startsWith("http") && !path.startsWith("#")) {
      path = `/${path}`
    }
    return path
  }

  /**
   * 获取本地化路径
   * @param path 目标路径
   * @returns 带有语言前缀的本地化路径（默认语言不带前缀）
   */
  const getLocalePath = (path: string) => {
    // 处理特殊路径
    if (path.startsWith("http"))
      return path

    // 处理锚点链接
    if (path.startsWith("#")) {
      const currentPath = route.path === "/" ? "" : route.path
      return `${currentPath}${path}`
    }

    // 规范化路径
    const normalizedPath = normalizePath(path)

    // 默认语言不添加前缀
    if (locale.value === DEFAULT_LOCALE) {
      return normalizedPath
    }

    // 其他语言添加前缀
    return `/${locale.value}${normalizedPath}`
  }

  /**
   * 从路径中提取语言代码
   * @param path 路径
   * @returns 语言代码或 null
   */
  const extractLocaleFromPath = (path: string): Locale | null => {
    const segments = path.split("/")
    const possibleLocale = segments[1]
    return LOCALES.some(l => l.code === possibleLocale) ? possibleLocale as Locale : null
  }

  /**
   * 从路径中移除语言前缀
   * @param path 带有语言前缀的路径
   * @returns 不带语言前缀的路径
   */
  const removeLocalePrefix = (path: string): string => {
    const localeCode = extractLocaleFromPath(path)
    if (!localeCode)
      return path
    return path.substring(localeCode.length + 1) || "/"
  }

  /**
   * 设置语言 Cookie
   * @param locale 语言代码
   */
  const setLocaleCookie = (locale: string) => {
    const date = new Date()
    date.setTime(date.getTime() + 365 * 24 * 60 * 60 * 1000) // 一年有效期
    document.cookie = `i18n_redirected=${locale}; expires=${date.toUTCString()}; path=/`
  }

  /**
   * 切换语言
   * @param newLocale 新语言
   */
  const switchLocale = async (newLocale: Locale) => {
    try {
      // 验证语言代码
      if (!localesMap.value.has(newLocale)) {
        console.warn(`Invalid locale: ${newLocale}`)
        return
      }

      // 如果新语言和当前语言相同，不做任何操作
      if (locale.value === newLocale)
        return

      // 更新语言
      await setLocale(newLocale)

      // 设置语言 Cookie
      if (process.client) {
        setLocaleCookie(newLocale)
      }

      // 获取不带语言前缀的当前路径
      const pathWithoutLocale = removeLocalePrefix(route.path)

      // 构建新路径
      const newPath = newLocale === DEFAULT_LOCALE
        ? pathWithoutLocale
        : `/${newLocale}${pathWithoutLocale}`

      // 使用 replace 模式导航，这样不会在历史记录中创建新条目
      await navigateTo({
        path: newPath,
        query: route.query,
      }, {
        replace: true,
      })
    }
    catch (error) {
      console.error("Failed to switch locale:", error)
    }
  }

  /**
   * 获取当前语言的显示名称
   */
  const currentLocaleName = computed(() =>
    localesMap.value.get(locale.value)?.name || locale.value,
  )

  /**
   * 获取所有可用的语言选项
   */
  const availableLocales = computed(() =>
    LOCALES.map(locale => ({
      value: locale.code,
      label: locale.name || locale.code,
    })),
  )

  return {
    locale,
    t,
    switchLocale,
    currentLocaleName,
    availableLocales,
    getLocalePath,
  }
}
