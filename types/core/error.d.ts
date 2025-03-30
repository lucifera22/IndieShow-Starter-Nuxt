/**
 * 错误对象类型
 */
export interface ErrorObject extends Error {
  statusCode?: number
  url?: string
  message: string
  stack?: string
}

/**
 * 错误页面组件属性
 */
export interface ErrorPageProps {
  error: ErrorObject
}
