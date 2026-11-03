/* ==========================================================
   Portfolio behaviour (menus, carousel, pop ups, effects).
   Needs js/projects.js loaded first (defines PROJECTS).
   ========================================================== */

const isTouch = window.matchMedia('(pointer: coarse)').matches;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
document.body.classList.toggle('is-touch', isTouch);

/* ---------- floating background bubbles ---------- */
(function(){
  if (reduceMotion) return;
  const wrap = document.getElementById('bgBubbles');
  const count = window.innerWidth < 680 ? 6 : 16;
  for (let i = 0; i < count; i++){
    const s = document.createElement('span');
    const size = 14 + Math.random() * 44;
    s.style.width = s.style.height = size + 'px';
    s.style.left = Math.random() * 100 + '%';
    s.style.animationDuration = (16 + Math.random() * 20) + 's';
    s.style.animationDelay = (-Math.random() * 30) + 's';
    wrap.appendChild(s);
  }
})();

/* ---------- rotating hero words ---------- */
(function(){
  const el = document.getElementById('rotator');
  const words = ['loves building the web', 'enjoys casual coding', 'keeps learning new things', 'builds apps for fun'];
  let i = 0;
  if (reduceMotion) return;
  setInterval(() => {
    el.classList.add('out');
    setTimeout(() => {
      i = (i + 1) % words.length;
      el.textContent = words[i];
      el.classList.remove('out');
    }, 260);
  }, 2800);
})();

/* ---------- reveal on scroll ---------- */
(function(){
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)){ items.forEach(el => el.classList.add('in')); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target);
        const t = en.target; setTimeout(() => { t.style.transitionDelay = ''; }, 1000); }
    });
  }, { threshold: 0.12 });
  items.forEach((el, i) => {
    el.style.transitionDelay = (i % 3) * 80 + 'ms';
    io.observe(el);
  });
})();

/* ---------- cute effects: sparkle trail (mouse) + bubble pop (click/tap) ---------- */
(function(){
  if (reduceMotion) return;
  /* effects live in their own clipped layer so they can never widen the page */
  const fxLayer = document.createElement('div');
  fxLayer.setAttribute('aria-hidden', 'true');
  fxLayer.style.cssText = 'position:fixed;inset:0;overflow:hidden;pointer-events:none;z-index:100;';
  document.body.appendChild(fxLayer);

  function make(cls, x, y, dx, dy){
    const f = document.createElement('div');
    f.className = 'fx ' + cls;
    f.style.left = x + 'px'; f.style.top = y + 'px';
    f.style.setProperty('--dx', dx + 'px'); f.style.setProperty('--dy', dy + 'px');
    fxLayer.appendChild(f);
    setTimeout(() => f.remove(), 850);
  }
  if (!isTouch){
    let last = 0;
    window.addEventListener('mousemove', (e) => {
      const now = performance.now();
      if (now - last < 55) return;
      last = now;
      make('spark', e.clientX + (Math.random()*10-5), e.clientY + (Math.random()*10-5), Math.random()*30-15, 16 + Math.random()*16);
    });
  }
  window.addEventListener('click', (e) => {
    for (let i = 0; i < 7; i++){
      const a = (Math.PI * 2 / 7) * i + Math.random() * .5;
      const d = 28 + Math.random() * 26;
      make('pop', e.clientX - 6, e.clientY - 6, Math.cos(a) * d, Math.sin(a) * d);
    }
  });
})();

/* ---------- carousel ---------- */
const carousel = document.getElementById('carousel');
const cards = Array.from(carousel.children);
const dotsWrap = document.getElementById('carouselDots');

cards.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.type = 'button';
  dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => cards[i].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' }));
  dotsWrap.appendChild(dot);
});
const dots = Array.from(dotsWrap.children);

function updateDots(){
  const center = carousel.scrollLeft + carousel.clientWidth / 2;
  let closest = 0, min = Infinity;
  cards.forEach((card, i) => {
    const dist = Math.abs(card.offsetLeft + card.offsetWidth / 2 - center);
    if (dist < min){ min = dist; closest = i; }
  });
  dots.forEach((d, i) => d.classList.toggle('active', i === closest));
}
carousel.addEventListener('scroll', () => window.requestAnimationFrame(updateDots));
document.getElementById('prevBtn').addEventListener('click', () => carousel.scrollBy({ left: -320, behavior: 'smooth' }));
document.getElementById('nextBtn').addEventListener('click', () => carousel.scrollBy({ left: 320, behavior: 'smooth' }));

/* drag with mouse only; touch uses native swipe + scroll-snap */
let dragMoved = false;
if (!isTouch){
  let isDown = false, startX = 0, startScroll = 0;
  carousel.addEventListener('mousedown', (e) => {
    isDown = true; dragMoved = false; carousel.classList.add('dragging');
    startX = e.pageX; startScroll = carousel.scrollLeft;
  });
  window.addEventListener('mouseup', () => { isDown = false; carousel.classList.remove('dragging'); });
  carousel.addEventListener('mouseleave', () => { isDown = false; carousel.classList.remove('dragging'); });
  carousel.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    if (Math.abs(e.pageX - startX) > 5) dragMoved = true;
    carousel.scrollLeft = startScroll - (e.pageX - startX);
  });
}

/* ---------- thumbnail helper: placeholder text first, image on top if it loads ---------- */
function setThumb(el, src, alt, fallbackText){
  el.textContent = fallbackText;
  if (!src) return;
  const img = new Image();
  img.alt = alt || '';
  img.onload = () => el.appendChild(img);
  img.src = src;
}

/* ---------- modal helpers ---------- */
let lastFocus = null;
function lockScroll(){ document.documentElement.classList.add('modal-open'); document.body.classList.add('modal-open'); }
function unlockScroll(){
  if (document.querySelector('.lightbox.open, .pmodal.open')) return;
  document.documentElement.classList.remove('modal-open'); document.body.classList.remove('modal-open');
}
function esc(t){ return String(t).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }

/* ---------- certificate lightbox ---------- */
const lightbox = document.getElementById('lightbox');
const lbClose = document.getElementById('lbClose');
document.querySelectorAll('.cert-card').forEach(card => {
  card.setAttribute('tabindex', '0');
  card.setAttribute('role', 'button');
  function openCert(){
    document.getElementById('lbTitle').textContent = card.dataset.title;
    document.getElementById('lbIssuer').textContent = card.dataset.issuer;
    document.getElementById('lbYear').textContent = card.dataset.year;
    setThumb(document.getElementById('lbThumb'), card.dataset.image, card.dataset.title, '[Certificate image]');
    lastFocus = card;
    lightbox.classList.add('open'); lockScroll();
    lbClose.focus({ preventScroll: true });
  }
  card.addEventListener('click', openCert);
  card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' '){ e.preventDefault(); openCert(); } });
});
function closeLightbox(){
  if (!lightbox.classList.contains('open')) return;
  lightbox.classList.remove('open'); unlockScroll();
  if (lastFocus) lastFocus.focus({ preventScroll: true });
}
lbClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });


/* ---------- project detail pop up ---------- */
const pmodal = document.getElementById('pmodal');
const pmClose = document.getElementById('pmClose');
const checkSvg = '<svg class="ico" aria-hidden="true" focusable="false"><use href="#i-check"/></svg>';

function openProject(id, opener) {
  const p = PROJECTS[id];

  if (!p || !pmodal) return;

  setThumb(
    document.getElementById('pmThumb'),
    p.image,
    'Screenshot of ' + p.title,
    p.thumb || '[Project screenshot]'
  );

  // Project information
  document.getElementById('pmTag').textContent = p.tag || '';
  document.getElementById('pmMeta').textContent = p.meta || '';
  document.getElementById('pmTitle').textContent = p.title || '';

  // Project description
  document.getElementById('pmAbout').innerHTML =
    (p.about || []).map(t => '<p>' + esc(t) + '</p>').join('');

  // Project features
  document.getElementById('pmFeatures').innerHTML =
    (p.features || []).map(f =>
      '<li>' + checkSvg + '<span>' + esc(f) + '</span></li>'
    ).join('');

  // Project role
  document.getElementById('pmRole').textContent = p.role || '';

  // Hide technology stack
  const stack = document.getElementById('pmStack');
  if (stack) {
    stack.innerHTML = '';
    stack.hidden = true;
  }

  // Visit site button
  const visit = document.getElementById('pmVisit');

  if (p.url) {
    visit.href = p.url;
    visit.hidden = false;
  } else {
    visit.hidden = true;
    visit.removeAttribute('href');
  }

  // Open modal
  document.getElementById('pmScroll').scrollTop = 0;

  lastFocus = opener || null;

  pmodal.classList.add('open');
  pmodal.setAttribute('aria-hidden', 'false');

  lockScroll();
  pmClose.focus({ preventScroll: true });
}

function closeProject() {
  if (!pmodal || !pmodal.classList.contains('open')) return;

  pmodal.classList.remove('open');
  pmodal.setAttribute('aria-hidden', 'true');

  unlockScroll();

  if (lastFocus) {
    lastFocus.focus({ preventScroll: true });
  }
}

// Read more button
carousel.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-project]');

  if (!btn || dragMoved) return;

  openProject(btn.dataset.project, btn);
});

// Close buttons
pmClose.addEventListener('click', closeProject);

document.getElementById('pmDone').addEventListener('click', closeProject);

// Close when clicking outside modal
pmodal.addEventListener('click', (e) => {
  if (e.target === pmodal) closeProject();
});

// Close with Escape key
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeProject();
    closeLightbox();
    return;
  }

  if (e.key === 'Tab' && pmodal.classList.contains('open')) {
    const f = Array.from(
      pmodal.querySelectorAll('a[href], button')
    ).filter(el => !el.hidden && el.offsetParent !== null);

    if (!f.length) return;

    const first = f[0];
    const last = f[f.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape'){ closeProject(); closeLightbox(); return; }
  if (e.key === 'Tab' && pmodal.classList.contains('open')){
    const f = Array.from(pmodal.querySelectorAll('a[href], button')).filter(el => !el.hidden && el.offsetParent !== null);
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
  }
});

/* ---------- scroll progress + back to top ---------- */
const progress = document.getElementById('scrollProgress');
const backToTop = document.getElementById('backToTop');
function onScroll(){
  const h = document.documentElement;
  const max = h.scrollHeight - h.clientHeight;
  progress.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
  backToTop.classList.toggle('visible', window.scrollY > 500);
}
window.addEventListener('scroll', () => window.requestAnimationFrame(onScroll));
onScroll();
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ---------- scrollspy for mobile tab bar ---------- */
const tabLinks = document.querySelectorAll('.mobile-tabbar a');
const spy = new IntersectionObserver((entries) => {
  entries.forEach(en => {
    if (en.isIntersecting){
      tabLinks.forEach(a => a.classList.toggle('active', a.dataset.section === en.target.id));
    }
  });
}, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });
['about', 'tools', 'projects', 'organizations', 'certificates'].forEach(id => {
  const s = document.getElementById(id); if (s) spy.observe(s);
});

/* ---------- tech marquee: tap to pause on touch ---------- */
const marquee = document.getElementById('techMarquee');
if (isTouch){
  marquee.addEventListener('click', (e) => {
    const icon = e.target.closest('.tech-icon');
    marquee.classList.toggle('paused');
    if (icon){
      document.querySelectorAll('.tech-icon.tapped').forEach(el => { if (el !== icon) el.classList.remove('tapped'); });
      icon.classList.toggle('tapped');
    }
  });
}
