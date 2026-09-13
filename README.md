# RazyHome

![Node.js >= 18](https://img.shields.io/badge/node.js->=18-339933?logo=node.js&logoColor=white)
![pnpm >= 9](https://img.shields.io/badge/pnpm->=9-F69220?logo=pnpm&logoColor=white)

星辰 / Razy 的个人主页，基于 [Alula](https://github.com/yumaonb/Alula) 模板二改。

## 特性

- Astro + Svelte + TypeScript，静态生成，首屏加载快
- 毛玻璃（Glassmorphism）暗色设计，响应式布局
- Swup 驱动的平滑页面切换
- Markdown 文章，支持 KaTeX 数学公式、标签、草稿
- 实时时钟小组件，本地背景与 favicon，无外部 CSS 依赖

## 命令

| 命令 | 说明 |
| --- | --- |
| `pnpm install` | 安装依赖 |
| `pnpm dev` | 启动本地开发服务器 |
| `pnpm build` | 构建生产版本到 `./dist/` |
| `pnpm preview` | 本地预览构建结果 |

## 项目结构

```
src/
├── assets/css/          # 全局样式、工具类、变量
├── components/
│   ├── layout/          # NavBar、Footer
│   └── widgets/         # Clock
├── content/articles/    # Markdown 文章
├── data/                # site / profile / friends / projects 配置
├── layouts/             # BaseLayout
└── pages/               # 首页 / 关于 / 作品 / 文章 / 友链 / 联系
```

## 写文章

在 `src/content/articles/` 下新建 `.md` 文件即可，frontmatter 支持以下字段（均可省略）：

```yaml
---
title: 文章标题        # 缺省时取文件名
description: 摘要      # 列表页与 SEO 使用
tags: [标签1, 标签2]
pubDate: 2026-01-01   # 缺省时列表页不显示日期
draft: false          # true 时不发布
---
```

## 许可证

MIT
