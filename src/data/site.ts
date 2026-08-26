/**
 * site.ts — 站点配置
 * 用法：import { site } from "@/data/site"
 */

export interface SiteConfig {
  /** 站点名称 */
  name: string;
  /** 站点描述（SEO） */
  description: string;
  /** 语言 */
  lang: string;
  /** 主题色 */
  colorScheme: 'dark' | 'light';
}

export const site: SiteConfig = {
  name: '星辰 / Razy',
  description: '星辰 Razy 的个人主页',
  lang: 'zh-CN',
  colorScheme: 'dark',
};
