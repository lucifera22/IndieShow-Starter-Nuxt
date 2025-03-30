declare namespace LayoutFooter {
  /**
   * 页脚链接项接口
   */
  export interface FooterLink {
    key: string
    href: string
    isExternal?: boolean
    isRawText?: boolean
    onClick?: (e: Event) => void
  }

  /**
   * 页脚链接分组接口
   */
  export interface FooterSection {
    title: string
    links: FooterLink[]
  }

  /**
   * 友情链接接口
   */
  export interface FriendLink {
    name: string
    url: string
  }

  /**
   * 社交媒体链接接口
   */
  export interface SocialLink {
    icon: string
    href: string
    label: string
  }
}

export = LayoutFooter
export as namespace LayoutFooter;
