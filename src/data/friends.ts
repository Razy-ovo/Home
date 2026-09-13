/**
 * friends.ts — 友情链接配置
 * 用法：import { friends } from "@/data/friends"
 */

export interface Friend {
  /** 站点名称 */
  name: string;
  /** 站点描述 */
  description: string;
  /** 站点链接 */
  url: string;
  /** 头像图片 URL，或 astro-icon 图标名（如 'icon:fa6-solid:link'） */
  avatar: string;
}

export const friends: Friend[] = [
  {
    name: '羽毛的小屋',
    description: '阅己 越己 悦己',
    url: 'https://ym.2v.nz/',
    avatar: 'https://ym.2v.nz/images/favicon.png',
  },
];
