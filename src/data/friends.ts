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
  /** 站点图标/头像 */
  avatar: string;
}

export const friends: Friend[] = [
  {
    name: '羽毛的小屋',
    description: '阅己 越己 悦己',
    url: 'https://ym.2v.nz/',
    avatar: 'https://ym.2v.nz/_astro/avatar.CvlqatIg_1DWLHP.webp',
  },
  {
    name: '示例站点',
    description: '这是一个示例友情链接站点',
    url: 'https://example.com',
    avatar: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?auto=format&fit=crop&w=200&q=80',
  },
];
