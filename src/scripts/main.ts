/**
 * Interacciones globales (≈2 KB). Todo es mejora progresiva:
 * sin JavaScript la web es navegable y el contenido es visible.
 */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const parallaxEls = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));

/* — Cabecera: borde al hacer scroll + CTA fijo en móvil — */
const header = document.querySelector<HTMLElement>('[data-header]');
const stickyCta = document.querySelector<HTMLElement>('[data-sticky-cta]');
let ticking = false;

function onScroll() {
  const y = window.scrollY;
  header?.classList.toggle('is-scrolled', y > 8);
  if (stickyCta) {
    const nearEnd = window.innerHeight + y > document.body.scrollHeight - 700;
    const shown = y > 640 && !nearEnd;
    stickyCta.classList.toggle('is-shown', shown);
    stickyCta.setAttribute('aria-hidden', String(!shown));
    stickyCta.querySelector('a')?.setAttribute('tabindex', shown ? '0' : '-1');
  }
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

/* — Parallax muy sutil (máx. ±24px) — */
function updateParallax() {
  const vh = window.innerHeight;
  for (const el of parallaxEls) {
    const r = el.getBoundingClientRect();
    if (r.bottom < 0 || r.top > vh) continue;
    const progress = (r.top + r.height / 2 - vh / 2) / vh; // -1 … 1
    el.style.setProperty('--py', `${(progress * -24).toFixed(1)}px`);
  }
}
