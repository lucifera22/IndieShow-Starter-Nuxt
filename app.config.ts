import { seoConfig } from "./config/seo"
import { uiConfig } from "./config/theme"

export default defineAppConfig({
  // SEO 配置
  seo: seoConfig.defaults,
  // UI主题配置
  ui: uiConfig,
})
