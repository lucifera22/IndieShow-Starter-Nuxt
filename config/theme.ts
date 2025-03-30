/**
 * config/theme.ts
 * 主题配置文件，统一管理整个应用的主题相关配置
 */

/**
 * 主题色配置
 * primary: 主色调，用于品牌识别和主要交互元素
 * gray: 中性色，用于文本和背景
 */
export const themeColors = {
  primary: {
    color: "indigo", // 靛蓝色：专业、创新、可信赖
    hex: "#4f46e5", // 主色调的具体色值
    gradient: {
      dark: "#6366f1", // 更柔和的渐变过渡
    },
  },
  gray: {
    color: "zinc", // zinc灰：更温和的中性色调
  },
}

/**
 * UI 组件配置
 * 主要用于按钮、卡片等组件的样式配置
 */
export const uiConfig = {
  primary: themeColors.primary.color,
  gray: themeColors.gray.color,
  button: {
    // 白色按钮的样式变体
    color: {
      white: {
        link: "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200",
        solid:
          "shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 text-gray-700 dark:text-gray-200 bg-white hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800/50",
        ghost:
          "text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-900",
      },
    },
    // 按钮的三种变体样式：solid、ghost、link
    variant: {
      solid:
        "shadow-sm text-white dark:text-gray-900 bg-{color}-500 hover:bg-{color}-600 disabled:bg-{color}-500 dark:bg-{color}-400 dark:hover:bg-{color}-500 dark:disabled:bg-{color}-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-{color}-500 dark:focus-visible:outline-{color}-400",
      ghost:
        "text-{color}-500 dark:text-{color}-400 hover:bg-{color}-50 dark:hover:bg-{color}-950",
      link: "text-{color}-500 hover:text-{color}-600 dark:text-{color}-400 dark:hover:text-{color}-500",
    },
    // 按钮的默认配置
    default: {
      size: "md",
      variant: "solid",
      color: "primary",
    },
  },
}

/**
 * Meta 标签配置
 * 用于配置浏览器标题栏和 Windows 磁贴的颜色
 */
export const metaConfig = [
  { name: "msapplication-TileColor", content: themeColors.primary.hex },
  { name: "theme-color", content: themeColors.primary.hex },
]

// 导出所有配置，方便统一引用
export default {
  colors: themeColors,
  ui: uiConfig,
  meta: metaConfig,
}
