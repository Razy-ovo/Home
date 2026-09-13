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
        const copyBtn = document.createElement('button');
        copyBtn.textContent = url;
        copyBtn.className = 'copy-url-btn';
        copyBtn.title = '点击复制链接';
        copyBtn.addEventListener('click', async () => {
          try {
            await navigator.clipboard.writeText(url);
            const originalText = copyBtn.textContent;
            copyBtn.textContent = '✓ 已复制';
            copyBtn.style.color = '#10b981';
            setTimeout(() => {
              copyBtn.textContent = originalText;
              copyBtn.style.color = '';
            }, 1500);
          } catch {
            copyBtn.textContent = '复制失败';
            setTimeout(() => {
              copyBtn.textContent = url;
            }, 1500);
          }
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
