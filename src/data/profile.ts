/**
 * profile.ts — 个人信息配置
 * 用法：import { nickname, motto, intro, socialLinks } from "@/data/profile"
 */

export interface SocialLink {
  label: string;
  url: string;
}

/** 昵称 */
export const nickname = '星辰';

/** 签名 / 座右铭 */
export const motto = '高中生个人开发者';

/** 联系方式 */
export const socialLinks: SocialLink[] = [
  { label: '邮箱', url: 'mailto:razy-ovo@outlook.com' },
  { label: 'QQ', url: 'https://qm.qq.com/q/1oIg7qIYzm' },
];
