declare global {
  interface Window {
    "op": OpFunction
    // 用于存储队列的数组
    "op.q"?: any[]
  }
}

// OpenPanel 初始化配置接口
interface OpInitConfig {
  clientId: string
  trackScreenViews?: boolean
  trackOutgoingLinks?: boolean
  trackAttributes?: boolean
}

// OpenPanel 函数类型
interface OpFunction {
  (...args: any[]): void
  q?: any[]
}

export {} // 确保这是一个模块
