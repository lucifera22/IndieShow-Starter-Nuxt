/**
 * Twitter 卡片类型
 */
export type TwitterCard = "summary" | "summary_large_image" | "app" | "player"

/**
 * Open Graph 类型
 */
export type OGType =
  | "website"
  | "article"
  | "book"
  | "profile"
  | "music.song"
  | "music.album"
  | "music.playlist"
  | "music.radio_status"
  | "video.movie"
  | "video.episode"
  | "video.tv_show"
  | "video.other"

/**
 * 社交媒体配置
 */
export interface SocialMedia {
  twitter: {
    card: TwitterCard
    creator: string
    site: string
  }
  facebook?: {
    appId?: string
  }
}

/**
 * SEO 配置
 */
export interface SEOConfig {
  defaults: {
    titleTemplate: string
    author: string
    ogImage: string
    title?: string
    description?: string
    keywords?: string
  }
  social: SocialMedia
  pages: string[]
  getSiteUrl: () => string
  generateUrl: (path: string) => string
  generateImageUrl: (imagePath: string) => string
}

/**
 * SEO 属性
 */
export interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  type?: OGType
}
