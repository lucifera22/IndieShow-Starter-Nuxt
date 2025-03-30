import type { BaseItem } from "../core/common"

/**
 * 支持的语言类型
 */
export type Locale = "zh" | "en"
/**
 * 语言选项类型
 */
export interface LocaleItem extends BaseItem {
  /** 语言代码 */
  value: Locale
  /** 显示标签 */
  label: string
}

/**
 * 语言对象类型
 */
export interface LocaleObject {
  code: Locale
  name?: string
}
