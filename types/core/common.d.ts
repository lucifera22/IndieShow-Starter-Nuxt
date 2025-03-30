/**
 * 基础项目类型
 */
export interface BaseItem {
  /** 显示标签 */
  label: string
  /** 值 */
  value: string | number
  /** 禁用状态 */
  disabled?: boolean
}

/**
 * 图标项目类型
 */
export interface IconItem {
  /** 名称 */
  name: string
  /** 图标 */
  icon: string
}

/**
 * 颜色标签类型
 */
export interface ColorTag extends IconItem {
  /** 颜色 */
  color: string
}

/**
 * 社交媒体类型
 */
export interface Social extends IconItem {
  /** 社交媒体名称 */
  name: string
  /** 社交媒体链接 */
  url?: string
}
