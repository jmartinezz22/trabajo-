/**
 * Interacciones del catálogo (común a todas las versiones; sin datos de marca).
 * Mejora progresiva: sin JavaScript todo el contenido es visible y navegable.
 */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const body = document.body;

/* — Cabecera: borde al hacer scroll — */
const header = document.querySelector<HTMLElement>('[data-c-header]');
const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 8);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* — Menú móvil — */
const menuBtn = document.querySelector<HTMLButtonElement>('[data-c-menu]');
const mobile = document.querySelector<HTMLElement>('[data-c-mobile]');
const setMenu = (open: boolean) => {
  if (!menuBtn || !mobile) return;
  mobile.hidden = !open;
  menuBtn.setAttribute('aria-expanded', String(open));
  body.style.overflow = open ? 'hidden' : '';
};
menuBtn?.addEventListener('click', () => setMenu(mobile?.hidden ?? true));
mobile?.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    setMenu(false);
    closeShares();
  }
});

/* — Aparición al hacer scroll — */
const revealEls = Array.from(document.querySelectorAll<HTMLElement>('[data-rv], [data-rv-img]'));
if (reduceMotion || !('IntersectionObserver' in window)) {
  revealEls.forEach((el) => el.classList.add('is-in'));
} else {
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add('is-in');
          io.unobserve(en.target);
        }
      }),
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  revealEls.forEach((el) => io.observe(el));
}
// Antes de imprimir se muestra todo
window.addEventListener('beforeprint', () => revealEls.forEach((el) => el.classList.add('is-in')));

/* — Buscador y filtros — */
const finder = document.querySelector<HTMLElement>('[data-finder]');
if (finder) {
  const input = finder.querySelector<HTMLInputElement>('[data-q]')!;
  const tiles = Array.from(finder.querySelectorAll<HTMLElement>('[data-item]'));
  const count = finder.querySelector<HTMLElement>('[data-count]')!;
  const empty = finder.querySelector<HTMLElement>('[data-empty]')!;
  const chips = Array.from(finder.querySelectorAll<HTMLButtonElement>('[data-filter]'));
  const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();
  const state = { q: '', cat: '', need: '' };

  const params = new URLSearchParams(location.search);
  state.q = params.get('q') ?? '';
  state.cat = params.get('categoria') ?? '';
  state.need = params.get('necesidad') ?? '';
  input.value = state.q;

  const apply = (syncUrl = true) => {
    const terms = norm(state.q).split(/\s+/).filter(Boolean);
    let shown = 0;
    tiles.forEach((t) => {
      const okCat = !state.cat || t.dataset.cat === state.cat;
      const okNeed = !state.need || (t.dataset.needs ?? '').split(' ').includes(state.need);
      const text = t.dataset.text ?? '';
      const okText = terms.every((w) => text.includes(w));
      const show = okCat && okNeed && okText;
      t.hidden = !show;
      if (show) {
        shown++;
        t.classList.add('is-in');
      }
    });
    chips.forEach((c) => {
      const active = (c.dataset.filter === 'cat' ? state.cat : state.need) === (c.dataset.value ?? '');
      c.setAttribute('aria-pressed', String(active));
    });
    count.textContent = `${shown} ${shown === 1 ? 'servicio' : 'servicios'}`;
    empty.hidden = shown > 0;
    if (syncUrl) {
      const p = new URLSearchParams();
      if (state.q) p.set('q', state.q);
      if (state.cat) p.set('categoria', state.cat);
      if (state.need) p.set('necesidad', state.need);
      const qs = p.toString();
      history.replaceState(null, '', `${location.pathname}${qs ? `?${qs}` : ''}${location.hash}`);
    }
  };

  input.addEventListener('input', () => {
    state.q = input.value;
    apply();
  });
  chips.forEach((c) =>
    c.addEventListener('click', () => {
      if (c.dataset.filter === 'cat') state.cat = c.dataset.value ?? '';
      else state.need = c.dataset.value ?? '';
      apply();
    }),
  );
  finder.querySelectorAll('[data-reset]').forEach((r) =>
    r.addEventListener('click', () => {
      state.q = state.cat = state.need = '';
      input.value = '';
      apply();
      input.focus();
    }),
  );
  if (state.q || state.cat || state.need) apply(false);
}

/* — Compartir — */
const shares = Array.from(document.querySelectorAll<HTMLElement>('[data-share]'));
function closeShares(except?: HTMLElement) {
  shares.forEach((s) => {
    if (s === except) return;
    const m = s.querySelector<HTMLElement>('[data-share-menu]');
    if (m) m.hidden = true;
    s.querySelector('[data-share-toggle]')?.setAttribute('aria-expanded', 'false');
  });
}
const shareUrl = () => `${location.origin}${location.pathname}`;
shares.forEach((s) => {
  const toggle = s.querySelector<HTMLButtonElement>('[data-share-toggle]')!;
  const menu = s.querySelector<HTMLElement>('[data-share-menu]')!;
  const status = s.querySelector<HTMLElement>('[data-share-status]')!;
  const title = s.dataset.shareTitle ?? document.title;
  const native = menu.querySelector<HTMLButtonElement>('[data-share-action="native"]');
  if (native && typeof navigator.share === 'function') native.hidden = false;

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = menu.hidden;
    closeShares(s);
    menu.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    status.textContent = '';
  });
  menu.addEventListener('click', async (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-share-action]');
    if (!btn) return;
    e.stopPropagation();
    const url = shareUrl();
    const action = btn.dataset.shareAction;
    if (action === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`, '_blank', 'noopener');
    } else if (action === 'email') {
      location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${title}\n${url}`)}`;
    } else if (action === 'native') {
      try {
        await navigator.share({ title, url });
      } catch {
        /* cancelado */
      }
    } else if (action === 'copy') {
      try {
        await navigator.clipboard.writeText(url);
        status.textContent = 'Enlace copiado';
      } catch {
        status.textContent = url;
      }
    }
  });
});
document.addEventListener('click', () => closeShares());

/* — Imprimir — */
document.querySelectorAll('[data-print]').forEach((b) => b.addEventListener('click', () => window.print()));

/* — Interruptor interno de versión —
   Invisible para el cliente. Se activa abriendo cualquier página con ?interno=1
   (y se desactiva con ?interno=0). Las rutas de las versiones solo se conocen
   desde la versión con branding: la neutra no contiene ninguna referencia. */
(() => {
  const KEY = 'catalogo-interno';
  const root = body.dataset.catalogRoot ?? '';
  const alt = body.dataset.altRoot;
  const flag = new URLSearchParams(location.search).get('interno');
  let roots: string[] = [];
  try {
    if (flag === '0') localStorage.removeItem(KEY);
    if (flag === '1') {
      const prev: string[] = JSON.parse(localStorage.getItem(KEY) ?? '[]');
      localStorage.setItem(KEY, JSON.stringify(Array.from(new Set([...prev, root, ...(alt ? [alt] : [])]))));
    }
    roots = JSON.parse(localStorage.getItem(KEY) ?? '[]');
  } catch {
    return;
  }
  if (!roots.includes(root) || roots.length < 2) return;
  const rest = location.pathname.slice(root.length);
  const nav = document.createElement('nav');
  nav.className = 'vswitch no-print';
  nav.setAttribute('aria-label', 'Versión del catálogo (uso interno)');
  roots.forEach((r) => {
    const a = document.createElement('a');
    a.href = r + rest;
    a.textContent = r.split('/').filter(Boolean).pop() ?? r;
    if (r === root) a.setAttribute('aria-current', 'true');
    nav.appendChild(a);
  });
  body.appendChild(nav);
})();

export {};
