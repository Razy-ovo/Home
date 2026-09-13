/**
 * risk-dialog.ts — 友链外链风险提示弹窗
 *
 * 常驻脚本（在 #swup 容器外，仅加载一次）：
 * 弹窗中的链接点击后复制到剪贴板，点“继续访问”才真正跳转。
 */

let pendingUrl = '';

document.addEventListener('click', (e) => {
  const dialog = document.getElementById('risk-dialog') as HTMLDialogElement | null;

  const visitBtn = (e.target as HTMLElement).closest<HTMLElement>('.visit-btn');
  if (visitBtn) {
    const url = visitBtn.dataset.url;
    const name = visitBtn.dataset.name;
    if (url && name && dialog && /^https?:\/\//i.test(url)) {
      pendingUrl = url;
      const targetSite = document.getElementById('target-site');
      const siteUrl = document.getElementById('site-url');
      if (targetSite) targetSite.textContent = name;
      if (siteUrl) {
        siteUrl.replaceChildren();

        const ICON_COPY = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M5 15V5a2 2 0 0 1 2-2h10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
        const ICON_CHECK = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

        const copyBtn = document.createElement('button');
        copyBtn.type = 'button';
        copyBtn.className = 'copy-url-btn';
        copyBtn.title = '点击复制链接';
        copyBtn.setAttribute('aria-label', `复制链接 ${url}`);
        copyBtn.innerHTML = `
          <span class="copy-url-icon">${ICON_COPY}</span>
          <span class="copy-url-text"></span>
          <span class="copy-url-hint">${ICON_COPY}<span>复制</span></span>
        `;
        (copyBtn.querySelector('.copy-url-text') as HTMLElement).textContent = url;

        const hint = copyBtn.querySelector('.copy-url-hint') as HTMLElement;
        const originalHint = hint.innerHTML;
        let resetTimer: ReturnType<typeof setTimeout>;

        copyBtn.addEventListener('click', async () => {
          try {
            await navigator.clipboard.writeText(url);
            copyBtn.classList.add('copied');
            hint.innerHTML = `${ICON_CHECK}<span>已复制</span>`;
          } catch {
            copyBtn.classList.add('failed');
            hint.innerHTML = `<span>复制失败</span>`;
          }
          clearTimeout(resetTimer);
          resetTimer = setTimeout(() => {
            copyBtn.classList.remove('copied', 'failed');
            hint.innerHTML = originalHint;
          }, 1600);
        });

        siteUrl.append(copyBtn);
      }
      dialog.showModal();
    }
    return;
  }

  if ((e.target as HTMLElement).closest('#cancel-btn')) {
    dialog?.close();
    pendingUrl = '';
    return;
  }

  if ((e.target as HTMLElement).closest('#confirm-btn')) {
    if (pendingUrl) {
      window.open(pendingUrl, '_blank', 'noopener,noreferrer');
    }
    dialog?.close();
    pendingUrl = '';
    return;
  }

  // 点击遮罩区域关闭弹窗
  if (e.target === dialog) {
    dialog.close();
    pendingUrl = '';
  }
});
