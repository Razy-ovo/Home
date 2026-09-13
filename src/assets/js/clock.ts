/**
 * clock.ts — 首页实时时钟
 *
 * 每帧重新查找 [data-clock]，因此 Swup 换页后回到首页时，
 * 时钟会自动恢复运行，无需依赖组件水合。
 */

let lastSecond = -1;
let rafId = 0;

const pad = (n: number) => String(n).padStart(2, '0');

function setRotate(el: Element | null, deg: number) {
  if (el instanceof SVGElement) el.style.transform = `rotate(${deg}deg)`;
}

function tick() {
  const root = document.querySelector('[data-clock]');
  if (root) {
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();
    const s = now.getSeconds();
    const ms = now.getMilliseconds();

    setRotate(root.querySelector('.clock-hour'), (h % 12) * 30 + m * 0.5 + s / 120 + ms / 120000);
    setRotate(root.querySelector('.clock-minute'), m * 6 + s * 0.1 + ms / 60000);
    setRotate(root.querySelector('.clock-second'), s * 6 + ms * 0.006);

    if (s !== lastSecond) {
      lastSecond = s;
      const timeEl = root.querySelector('.clock-time');
      const dateEl = root.querySelector('.clock-date');
      if (timeEl) timeEl.textContent = `${pad(h)}:${pad(m)}:${pad(s)}`;
      if (dateEl) dateEl.textContent = `${now.getFullYear()}/${pad(now.getMonth() + 1)}/${pad(now.getDate())}`;
    }
  } else {
    // 不在首页时重置，回到首页立即刷新
    lastSecond = -1;
  }
  rafId = requestAnimationFrame(tick);
}

rafId = requestAnimationFrame(tick);
window.addEventListener('beforeunload', () => cancelAnimationFrame(rafId));
