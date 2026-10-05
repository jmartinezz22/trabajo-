/**
 * Interacciones globales (≈2 KB). Todo es mejora progresiva:
 * sin JavaScript la web es navegable y el contenido es visible.
 */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const parallaxEls = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));

/* — Cabecera: borde al hacer scroll + CTA fijo en móvil — */
const header = document.querySelector<HTMLElement>('[data-header]');
const stickyCta = document.querySelector<HTMLElement>('[data-sticky-cta]');
const progress = document.querySelector<HTMLElement>('[data-progress]');
let ticking = false;

/* — Portada narrativa: progreso 0→1 mientras la portada está fijada — */
const story = document.querySelector<HTMLElement>('[data-story]');
if (story && !reduceMotion) document.documentElement.classList.add('story-live');
const driftEls = Array.from(document.querySelectorAll<HTMLElement>('[data-drift]'));

/** Hasta dónde la cabecera superpuesta sigue transparente (fin de la foto de portada). */
function headerThreshold() {
  if (!header?.classList.contains('is-overlay')) return 8;
  const first = document.querySelector<HTMLElement>('main > section');
  if (!first) return 8;
  // En la portada narrativa basta con superar la primera pantalla
  const end = first.offsetTop + first.offsetHeight;
  return Math.max(8, end - header.offsetHeight);
}

function updateStory() {
  if (!story || reduceMotion) return;
  const range = Math.max(1, story.offsetHeight - window.innerHeight);
  const p = Math.min(1, Math.max(0, (window.scrollY - story.offsetTop) / range));
  story.style.setProperty('--p', p.toFixed(4));
  document.documentElement.classList.toggle('story-past', p > 0.42);
}

/** Desplazamiento horizontal muy sutil (máx. ±60 px) de franjas tipográficas. */
function updateDrift() {
  const vh = window.innerHeight;
  for (const el of driftEls) {
    const r = el.getBoundingClientRect();
    if (r.bottom < 0 || r.top > vh) continue;
    const t = (r.top + r.height / 2 - vh / 2) / vh; // -0.5 … 0.5
    el.style.setProperty('--dx', `${(t * 120).toFixed(1)}px`);
  }
}

function onScroll() {
  const y = window.scrollY;
  header?.classList.toggle('is-scrolled', y > headerThreshold());
  if (!reduceMotion) {
    updateStory();
    updateDrift();
  }
  if (stickyCta) {
    const nearEnd = window.innerHeight + y > document.body.scrollHeight - 700;
    const shown = y > 640 && !nearEnd;
    stickyCta.classList.toggle('is-shown', shown);
    stickyCta.setAttribute('aria-hidden', String(!shown));
    stickyCta.querySelector('a')?.setAttribute('tabindex', shown ? '0' : '-1');
  }
  progress?.style.setProperty('--progress', String(Math.min(1, y / Math.max(1, document.documentElement.scrollHeight - window.innerHeight))));
  if (!reduceMotion) updateParallax();
  ticking = false;
}
window.addEventListener(
  'scroll',
  () => {
    if (!ticking) {
      requestAnimationFrame(onScroll);
      ticking = true;
    }
  },
  { passive: true },
);
onScroll();

/* — Menú móvil — */
const toggle = document.querySelector<HTMLAnchorElement>('[data-menu-toggle]');
const menu = document.querySelector<HTMLElement>('[data-menu]');
const label = document.querySelector<HTMLElement>('[data-menu-label]');

function setMenu(open: boolean) {
  if (!toggle || !menu) return;
  menu.hidden = !open;
  toggle.setAttribute('aria-expanded', String(open));
  if (label) label.textContent = open ? 'Cerrar menú' : 'Abrir menú';
  document.documentElement.classList.toggle('menu-open', open);
  document.body.style.overflow = open ? 'hidden' : '';
  if (open) menu.querySelector<HTMLElement>('a')?.focus();
}
toggle?.setAttribute('role', 'button');
toggle?.addEventListener('click', (e) => {
  e.preventDefault();
  setMenu(menu?.hidden ?? true);
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menu && !menu.hidden) {
    setMenu(false);
    toggle?.focus();
  }
});
window.matchMedia('(min-width: 1100px)').addEventListener('change', (e) => e.matches && setMenu(false));

/* — Aparición al hacer scroll — */
const revealEls = document.querySelectorAll<HTMLElement>('[data-reveal]');
if ('IntersectionObserver' in window && !reduceMotion) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('is-visible'));
}

/* — Líneas de proceso que se dibujan al entrar en pantalla — */
document.querySelectorAll<HTMLElement>('[data-draw]').forEach((el) => {
  if (reduceMotion || !('IntersectionObserver' in window)) {
    el.classList.add('is-drawn');
    return;
  }
  const io = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) {
        el.classList.add('is-drawn');
        io.disconnect();
      }
    },
    { threshold: 0.3 },
  );
  io.observe(el);
});

/* — Contadores (solo cifras verificadas; sin JS se ve el valor final) — */
document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
  const target = Number(el.dataset.count);
  if (reduceMotion || !('IntersectionObserver' in window) || !Number.isFinite(target)) return;
  el.textContent = '0';
  const io = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const dur = 1400;
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / dur);
        el.textContent = String(Math.round(target * (1 - Math.pow(1 - t, 3))));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    },
    { threshold: 0.6 },
  );
  io.observe(el);
});

/* — Parallax muy sutil (máx. ±24px) — */
function updateParallax() {
  const vh = window.innerHeight;
  for (const el of parallaxEls) {
    const r = el.getBoundingClientRect();
    if (r.bottom < 0 || r.top > vh) continue;
    const ratio = (r.top + r.height / 2 - vh / 2) / vh; // -1 … 1
    el.style.setProperty('--py', `${(ratio * -24).toFixed(1)}px`);
  }
}
