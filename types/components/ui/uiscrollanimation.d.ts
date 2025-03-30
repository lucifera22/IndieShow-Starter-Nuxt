/**
 * 滚动动画类型
 */
export type AnimationType =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "zoom-in"
  | "zoom-out"

/**
 * 滚动动画组件属性
 */
export interface ScrollAnimationProps {
  animation: AnimationType
  duration?: number
  delay?: number
  threshold?: number
  once?: boolean
  root?: Element | null
  rootMargin?: string
}
