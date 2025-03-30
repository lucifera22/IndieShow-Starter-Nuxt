declare global {
  interface Window {
    umami: UmamiFunction
  }
}

interface UmamiFunction {
  (event: string, props?: Record<string, any>): void
  track: (event: string, props?: Record<string, any>) => void
  identify: (userId: string) => void
}

export {} // 确保这是一个模块
