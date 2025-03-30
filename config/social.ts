import type { SocialConfig } from "~/types/config/social"

// 全球社交媒体平台配置
export const globalSocialConfig: SocialConfig = {
  discord: {
    name: "Discord",
    url: "https://discord.gg/yajD5sJN",
    icon: "simple-icons:discord",
  },
  github: {
    name: "GitHub",
    url: "https://github.com/waveany/",
    icon: "simple-icons:github",
  },
  x: {
    name: "X",
    url: "https://x.com/wave_any",
    icon: "simple-icons:x",
  },
  instagram: {
    name: "Instagram",
    url: "/",
    icon: "simple-icons:instagram",
  },
  facebook: {
    name: "Facebook",
    url: "/",
    icon: "simple-icons:facebook",
  },
  youtube: {
    name: "YouTube",
    url: "/",
    icon: "simple-icons:youtube",
  },
}

// 中文社交媒体平台配置
export const cnSocialConfig: SocialConfig = {
  blog: {
    name: "博客",
    url: "https://waveany.com",
    icon: "simple-icons:blogger",
  },
  github: {
    name: "GitHub",
    url: "https://github.com/waveany/",
    icon: "lucide:github",
  },
  zhihu: {
    name: "知乎",
    url: "/",
    icon: "simple-icons:zhihu",
  },
  weibo: {
    name: "微博",
    url: "/",
    icon: "simple-icons:sinaweibo",
  },
  bilibili: {
    name: "B站",
    url: "/",
    icon: "simple-icons:bilibili",
  },
  xiaohongshu: {
    name: "小红书",
    url: "/",
    icon: "simple-icons:xiaohongshu",
  },
}

/**
 * 根据语言获取社交媒体配置
 * @param locale - 语言代码 ('zh' | 'en')
 * @returns 对应语言的社交媒体配置
 */
export function getSocialConfigByLocale(locale: string): SocialConfig {
  return locale === "zh" ? cnSocialConfig : globalSocialConfig
}

/**
 * 获取所有可用的社交媒体键名
 * @param locale - 语言代码 ('zh' | 'en')
 * @returns 社交媒体键名数组
 */
export function getAvailableSocialKeys(locale: string): string[] {
  const config = getSocialConfigByLocale(locale)
  return Object.keys(config)
}

/**
 * 验证社交媒体配置是否有效
 * @param config - 社交媒体配置对象
 * @returns 配置是否有效
 */
export function validateSocialConfig(config: SocialConfig): boolean {
  return Object.values(config).every(
    item =>
      item.name
      && item.icon
      && (item.url ? item.url.startsWith("https://") : true),
  )
}
