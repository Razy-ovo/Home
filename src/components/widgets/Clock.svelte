<!-- Clock.svelte — 实时时钟 -->
<script>
  import { onMount, onDestroy } from 'svelte';

  let ready = $state(false);
  let now = $state(new Date());
  let time = $state('');
  let date = $state('');
  let raf;
  let lastDisplayedSecond = -1;

  let hDeg = $state(0);
  let mDeg = $state(0);
  let sDeg = $state(0);

  function hAngle(d) {
    const h = d.getHours() % 12;
    const m = d.getMinutes();
    const s = d.getSeconds();
    return h * 30 + m * 0.5 + s / 120 + d.getMilliseconds() / 120000;
  }

  function mAngle(d) {
    return d.getMinutes() * 6 + d.getSeconds() * 0.1 + d.getMilliseconds() / 60000;
  }

  function sAngle(d) {
    return d.getSeconds() * 6 + d.getMilliseconds() * 0.006;
  }

  function loop(ts) {
    const current = new Date();
    now = current;
    hDeg = hAngle(current);
    mDeg = mAngle(current);
    sDeg = sAngle(current);

    if (current.getSeconds() !== lastDisplayedSecond) {
      lastDisplayedSecond = current.getSeconds();
      const h = String(current.getHours()).padStart(2, "0");
      const m = String(current.getMinutes()).padStart(2, "0");
      const s = String(current.getSeconds()).padStart(2, "0");
      time = `${h}:${m}:${s}`;

      const y = current.getFullYear();
      const mo = String(current.getMonth() + 1).padStart(2, "0");
      const d = String(current.getDate()).padStart(2, "0");
      date = `${y}/${mo}/${d}`;
    }

    raf = requestAnimationFrame(loop);
  }

  function tick() {
    now = new Date();
    const h = String(now.getHours()).padStart(2, "0");
    const m = String(now.getMinutes()).padStart(2, "0");
    const s = String(now.getSeconds()).padStart(2, "0");
    time = `${h}:${m}:${s}`;
    lastDisplayedSecond = now.getSeconds();

    const y = now.getFullYear();
    const mo = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    date = `${y}/${mo}/${d}`;

    hDeg = hAngle(now);
    mDeg = mAngle(now);
    sDeg = sAngle(now);
  }

  onMount(() => {
    tick();
    ready = true;
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
    };
  });
</script>

<div class="clock-body">
  <svg class="clock-icon" width="100" height="100" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10.8" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="0.3" />
    <!-- 四个简约刻度 -->
    <line x1="12" y1="2.4" x2="12" y2="3.8" stroke="rgba(255,255,255,0.55)" stroke-width="0.5" stroke-linecap="round" />
    <line x1="21.6" y1="12" x2="20.2" y2="12" stroke="rgba(255,255,255,0.55)" stroke-width="0.5" stroke-linecap="round" />
    <line x1="12" y1="21.6" x2="12" y2="20.2" stroke="rgba(255,255,255,0.55)" stroke-width="0.5" stroke-linecap="round" />
    <line x1="2.4" y1="12" x2="3.8" y2="12" stroke="rgba(255,255,255,0.55)" stroke-width="0.5" stroke-linecap="round" />
    <!-- 时针 -->
    <line x1="12" y1="12.8" x2="12" y2="7.2"
      stroke="rgba(255,255,255,1)" stroke-width="2" stroke-linecap="round"
      style="transform: rotate({hDeg}deg); transform-origin: 12px 12px;" />
    <!-- 分针 -->
    <line x1="12" y1="13.0" x2="12" y2="4.0"
      stroke="rgba(255,255,255,0.7)" stroke-width="1.2" stroke-linecap="round"
      style="transform: rotate({mDeg}deg); transform-origin: 12px 12px;" />
    <!-- 秒针 -->
    <line x1="12" y1="13.3" x2="12" y2="3.5"
      stroke="#ff4d4f" stroke-width="0.5" stroke-linecap="round"
      style="transform: rotate({sDeg}deg); transform-origin: 12px 12px;" />
    <!-- 中心点 -->
    <circle cx="12" cy="12" r="0.7" fill="#ff4d4f" />
  </svg>

  <div class="clock-info">
    {#if ready}
      <span class="clock-time" aria-live="polite">{time}</span>
      <span class="clock-date">{date}</span>
    {:else}
      <div class="skeleton" style="width:150px;font-size:2rem;line-height:1.2;margin-bottom:4px"></div>
      <div class="skeleton" style="width:90px;font-size:1.05rem"></div>
    {/if}
  </div>
</div>

<style>
  .clock-body {
    display: flex;
    align-items: center;
    gap: 16px;
    height: 108px;
    overflow: visible;
  }
  .clock-icon {
    flex-shrink: 0;
    color: rgba(255, 255, 255, 0.7);
    border-radius: 50%;
    box-shadow:
      0 3px 6px rgba(0, 0, 0, 0.4),
      0 8px 20px rgba(0, 0, 0, 0.25),
      inset 0 1px 0 rgba(255, 255, 255, 0.08);
  }
  .clock-info {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .clock-time {
    font-size: 2rem;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.06em;
    line-height: 1.2;
    background: linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.7) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .clock-date {
    font-size: 1.05rem;
    color: rgba(255, 255, 255, 0.38);
    letter-spacing: 0.02em;
  }
  @media (min-width: 1024px) {
    .clock-time { font-size: 2.2rem; }
  }
</style>
