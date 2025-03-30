import type { I18nOptions } from "vue-i18n"

import { DEFAULT_LOCALE } from "./i18n/config"

export default defineI18nConfig(
  (): I18nOptions => ({
    legacy: false,
    locale: DEFAULT_LOCALE,
    fallbackLocale: DEFAULT_LOCALE,
    messages: {
      en: {},
      zh: {},
    },
    missingWarn: false,
    fallbackWarn: false,
    silentTranslationWarn: true,
  }),
)
