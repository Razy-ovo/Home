/**
 * scroll-root.ts — 内部滚动容器控制
 *
 * 视口本身不滚动，页面内容在 .scroll-root 内滚动：
 * - 普通 Swup 导航后回到顶部
 * - 浏览器前进/后退时交给 swup scroll-plugin 恢复位置
 * - 页内锚点手动滚动内部容器
 */

let popstateHref: string | null = null;

window.addEventListener('popstate', () => {
  popstateHref = window.location.href;
});

document.addEventListener('swup:page:view', () => {
  const root = document.querySelector('.scroll-root');
  if (root && popstateHref !== window.location.href) root.scrollTop = 0;
  popstateHref = null;
});

document.addEventListener('click', (e) => {
  const el = e.target as HTMLElement;
  const anchor = el.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
  if (!anchor) return;
  const hash = anchor.getAttribute('href') ?? '';
  const id = decodeURIComponent(hash.slice(1));
  if (!id) return;
  const target = document.getElementById(id);
  if (!target) return;
  e.preventDefault();
  target.scrollIntoView();
  history.pushState(null, '', `#${id}`);
});
