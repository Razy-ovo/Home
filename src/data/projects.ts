/**
 * projects.ts — 作品配置
 * 用法：import { projects } from "@/data/projects"
 */

export interface Project {
  /** 作品名称 */
  name: string;
  /** 名称后半段（弱化显示） */
  nameSuffix: string;
  /** 一句话介绍 */
  description: string;
  /** 功能 / 技术标签 */
  tags: string[];
}

export const projects: Project[] = [
  {
    name: 'RazyAI',
    nameSuffix: '- Chat',
    description: '自己写的 AI 聊天应用，可以接入大模型 API，支持聊天和生成图片。',
    tags: ['AI 对话', '图片生成'],
  },
  {
    name: 'Razy',
    nameSuffix: '个人主页',
    description: '就是你现在看到的这个网站。Astro + Svelte 写的，基于 Alula 模板二改。',
    tags: ['Astro', 'Svelte'],
  },
];
