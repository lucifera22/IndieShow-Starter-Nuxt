import type { ColorTag, IconItem } from "../core/common"

/**
 * 平台类型
 */
export interface Platform extends IconItem {
  name: string
}

/**
 * 作品展示项目类型
 */
export interface ShowcaseItem {
  id?: string
  type: "web" | "mobile" | "desktop"
  image: string
  link?: string
  platforms: Platform[]
  qrCode?: string
  qrCodeDescription?: string
  tags: ColorTag[]
  isOnline: boolean
}

/**
 * 作品展示配置类型
 */
export interface ShowcaseConfig {
  items: ShowcaseItem[]
}

/**
 * 二维码弹窗状态类型
 */
export interface QRCodeModalState {
  isOpen: boolean
  title: string
  qrCodeUrl: string
  description: string
}
