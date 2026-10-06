let timerId: ReturnType<typeof setTimeout> | null = null;
let clock: {
  hour: SVGElement | null;
  minute: SVGElement | null;
  second: SVGElement | null;
  time: HTMLElement | null;
  date: HTMLElement | null;
} | null = null;
let lastDate = '';
let swapping = false;


const pad = (n: number) => String(n).padStart(2, '0');

function stop() {
  if (timerId !== null) clearTimeout(timerId);
  timerId = null;
  clock?.second?.classList.remove('running');
}

function tick() {
  if (!clock || document.hidden || swapping) return;

  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();
  const s = now.getSeconds();

  if (clock.hour) clock.hour.style.transform = `rotate(${(h % 12) * 30 + m * 0.5 + s / 120}deg)`;
  if (clock.minute) clock.minute.style.transform = `rotate(${m * 6 + s * 0.1}deg)`;
  if (clock.time) clock.time.textContent = `${pad(h)}:${pad(m)}:${pad(s)}`;

  const date = `${now.getFullYear()}/${pad(now.getMonth() + 1)}/${pad(now.getDate())}`;
  if (clock.date && date !== lastDate) {
    clock.date.textContent = date;
    lastDate = date;
  }

  timerId = setTimeout(tick, 1000 - Date.now() % 1000);
}

function start() {
  stop();
  clock = null;
  lastDate = '';
  if (document.hidden || swapping) return;

  const root = document.querySelector('[data-clock]');
  if (!root) return;
  clock = {
    hour: root.querySelector<SVGElement>('.clock-hour'),
    minute: root.querySelector<SVGElement>('.clock-minute'),
    second: root.querySelector<SVGElement>('.clock-second'),
    time: root.querySelector<HTMLElement>('.clock-time'),
    date: root.querySelector<HTMLElement>('.clock-date'),
  };
  if (clock.second) {
    const now = new Date();
    clock.second.style.setProperty('--second-delay', `-${now.getSeconds() + now.getMilliseconds() / 1000}s`);
    clock.second.classList.add('running');
  }
  tick();
}

document.addEventListener('visibilitychange', start);
document.addEventListener('astro:before-swap', () => {
  swapping = true;
  stop();
  clock = null;
});
document.addEventListener('astro:after-swap', () => {
  swapping = false;
  start();
});
window.addEventListener('pagehide', stop);
window.addEventListener('pageshow', start);

start();
