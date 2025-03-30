🌍 [English](./README.md) | [简体中文](./README-zh.md)

<div align="center">

# IndieShow

### IndieShow: 🚀 为独立开发者打造的 Nuxt 3 + Tailwind CSS + TypeScript 产品展示模板

专注于开发体验: 🖥️ Nuxt 3 + 🛠️ TypeScript + 🎨 Tailwind CSS + 🌐 i18n + 📄 markdown-it + 🔍 ESLint + 🧩 simple-git-hooks + 🧹 Lint-Staged + 📝 Commitlint + ☁️ Vercel.
通过这个优雅、高性能且SEO友好的基础框架，快速启动您的全球化Web应用。

[![CI](https://github.com/WaveAny/IndieShow/actions/workflows/ci.yml/badge.svg)](https://github.com/WaveAny/IndieShow/actions/workflows/ci.yml)
[![CD](https://github.com/WaveAny/IndieShow/actions/workflows/cd.yml/badge.svg)](https://github.com/WaveAny/IndieShow/actions/workflows/cd.yml)
[![GitHub license](https://img.shields.io/github/license/WaveAny/IndieShow)](https://github.com/WaveAny/IndieShow/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/WaveAny/IndieShow)](https://github.com/WaveAny/IndieShow/stargazers)
[![Node Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org)
[![pnpm Version](https://img.shields.io/badge/pnpm-%3E%3D8.0.0-blue)](https://pnpm.io)
[![Nuxt Version](https://img.shields.io/badge/nuxt-3.15.4-00DC82.svg?logo=nuxt.js)](https://nuxt.com)

</div>

## 💡 项目概述

IndieShow 是一个专为独立开发者设计的产品展示网站模板。基于 Nuxt 3 + TailwindCSS + TypeScript 构建，您可以通过简单的配置在几分钟内创建一个专业的产品展示网站！

### 🎯 使用场景

- 🏢 初创公司的产品展示
- 👨‍💻 独立开发者的作品集
- 🛠️ 开发项目的快速启动模板

## ⚡ 性能表现

| 测试项目                  | 得分 | 基准线 |
| ------------------------- | ---- | ------ |
| Google PageSpeed (移动端) | 94   | > 90   |
| Google PageSpeed (桌面端) | 99   | > 90   |

<table>
  <tr>
    <td width="50%" align="center">
      <strong>移动端性能</strong>
      <br>
      <sub><img src="./public/assets/images/IndieShow-pagespeed-mobile.png?raw=true" alt="IndieShow-pagespeed-mobile"></sub>
    </td>
    <td width="50%" align="center">
      <strong>桌面端性能</strong>
      <br>
      <sub><img src="./public/assets/images/IndieShow-pagespeed-pc.png?raw=true" alt="IndieShow-pagespeed-pc"></sub>
    </td>
  </tr>
</table>

## 🌈 在线演示

- **演示站点**: [https://indieshow.waveany.com](https://indieshow.waveany.com)
- **开发文档**: [查看文档](https://docs.indieshow.waveany.com)

<p align="center">
  <a href="https://indieshow.waveany.com/"><img src="./public/assets/images/IndieShow-banner.png?raw=true" alt="IndieShow banner"></a>
  <a href="https://indieshow.waveany.com/"><img src="./public/assets/images/IndieShow-MyWorkWithFooter.png?raw=true" alt="IndieShow-MyWorkWithFooter"></a>
</p>

## 🛠️ 技术栈

![Nuxt 3](https://img.shields.io/badge/-Nuxt.js-%232c3e50?style=for-the-badge&logo=Nuxt.js)
![Vue.js](https://img.shields.io/badge/-Vue.js-%232c3e50?style=for-the-badge&logo=Vue.js)
![TypeScript](https://img.shields.io/badge/-TypeScript-%23007ACC?style=for-the-badge&logo=TypeScript)
![TailwindCSS](https://img.shields.io/badge/-TailwindCSS-%231a202c?style=for-the-badge&logo=TailwindCSS)

## 📦 项目结构

```bash
IndieShow/
├── components/        # 组件目录
│   ├── blocks/       # 区块组件 (Hero, Feature, ShowCase, CTA)
│   ├── common/       # 通用组件 (主题切换, 语言切换)
│   ├── layout/       # 布局组件 (页头, 页脚)
│   └── ui/           # UI组件 (返回顶部, 进度条, 二维码模态框等)
├── composables/      # 组合式函数
│   ├── useLocale     # 语言切换
│   ├── useMarkdown   # Markdown解析器
│   └── useSeo        # SEO优化
├── config/           # 配置文件
│   ├── nav          # 导航菜单
│   ├── seo          # SEO配置
│   ├── showcase     # 作品展示
│   ├── social       # 社交链接
│   └── theme        # 主题配置
├── i18n/            # 国际化
│   ├── en/          # 英文语言包
│   ├── zh/          # 中文语言包
│   └── config.ts    # i18n配置
├── layouts/         # 布局模板
├── pages/           # 页面文件
│   ├── group.ts       # 用户组页面
│   ├── index.ts       # 首页
│   ├── privacy.ts     # 隐私政策页面
│   ├── sales.ts       # 销售条款页面
│   ├── terms.ts       # 服务条款页面
├── plugins/         # 插件目录
│   └── analytics-google.client.ts  # Google分析
├── public/          # 静态资源
└── types/           # 类型定义
```

## ✨ 核心特性

### 🚀 开发体验

- 使用最新依赖版本并持续更新
- 基于组合式API和`<script setup>`的简洁优雅代码
- 完整的TypeScript类型支持
- 集成antfu/eslint-config保持一致的代码风格

### 🎨 UI设计

- 基于TailwindCSS的响应式设计
- 明/暗主题切换，跟随系统主题
- 美观的过渡和页面效果
- 可自定义的主题颜色

### 🌍 国际化

- 支持英文和中文，易于扩展
- 自动检测浏览器语言
- 简单配置，即时翻译更新
- URL中自动添加语言前缀

### 📱 多平台适配

- 完美适配移动端和桌面端
- 支持PWA，可安装到主屏幕
- 针对不同设备优化交互

### 🔍 SEO优化

- 基于Nuxt 3的SSR支持
- 自动生成sitemap.xml
- 静态页面预渲染
- 完整的Meta标签支持
- 可自定义的页面标题和描述

### ⚡️ 性能优化

- 自动代码分割
- 智能组件预加载
- 自动图片优化
- 按需加载图标

## 🚀 快速开始

### 环境要求

- Node.js ≥ 18.0
- pnpm ≥ 8.0

### 开发流程

1. **克隆项目**

```bash
git clone https://github.com/WaveAny/IndieShow.git
cd IndieShow
pnpm install
```

2. **配置环境变量**

```bash
cp .env.example .env
```

3. **启动开发服务器**

```bash
pnpm dev
```

4. **构建与部署**

```bash
# 生产环境构建
pnpm build

# 预览生产构建
pnpm preview
```

5. **一键部署**

推荐使用Vercel部署：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/WaveAny/IndieShow)

## 🤔 常见问题

<details>
<summary>1. 如何自定义主题？</summary>

编辑`config/theme.ts`文件：

```ts
export const themeColors = {
  primary: {
    color: "indigo",
    hex: "#4f46e5",
    gradient: {
      dark: "#6366f1",
    },
  },
  gray: {
    color: "zinc",
  },
}
```

</details>

## 📄 许可证

本项目基于 [MIT 许可证](LICENSE) 授权。

## 🙏 致谢

- [Nuxt 3](https://nuxt.com) - Vue.js全栈框架
- [Vue 3](https://vuejs.org) - 渐进式JavaScript框架
- [Tailwind CSS](https://tailwindcss.com) - 实用优先的CSS框架

## 📮 联系方式

- GitHub问题: [提交问题](https://github.com/WaveAny/IndieShow/issues)
- 电子邮件: <suppore@waveany.com>

## 📈 项目统计''

![项目统计](https://repobeats.axiom.co/api/embed/f6ac717e2e67eeb7c6d8ff113b93a77fc3c988b6.svg 'Repobeats analytics image')
''

## 🎨 主题预览

<table>
  <tr>
    <td width="50%" align="center">
      <strong>浅色主题</strong>
      <br>
      <sub><img  src="./public/assets/images/IndieShow-light.png?raw=true" alt="IndieShow-light"></sub>
    </td>
    <td width="50%" align="center">
      <strong>深色主题</strong>
      <br>
      <sub><img src="./public/assets/images/IndieShow-dark.png?raw=true" alt="IndieShow-dark"></sub>
    </td>
  </tr>
</table>

## 📈 Star历史

[![Star历史图表](https://api.star-history.com/svg?repos=WaveAny/IndieShow&type=Date)](https://star-history.com/#WaveAny/IndieShow&Date)
