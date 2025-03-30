declare global {
  interface Window {
    plausible: PlausibleFunction
  }
}

interface PlausibleFunction {
  (event: string, options?: PlausibleOptions): void
  q?: any[]
}

interface PlausibleOptions {
  callback?: () => void
  props?: Record<string, string | number | boolean>
  revenue?: {
    currency: string
    amount: number
  }
}

export {} // 确保这是一个模块
