/* ============================================================
   DARK SHADOWS ART STUDIO — script.js
   Michelle Palacios · El Paso, TX
   Vanilla JS: gallery, lightbox, filters, forms, nav, scroll
   ============================================================ */

'use strict';

/* ── Gallery data ───────────────────────────────────────────── */
/*
  To add real artwork: set `image` to the file path, e.g. "images/my-piece.jpg"
  Leave `image: null` to display a styled placeholder.
  Categories: "Día de los Muertos" | "Gothic Original" | "Fan Art" | "Custom Portrait"
*/
const GALLERY = [
  {
    id: 1,
    title: '915 Poppies',
    category: 'Dark Shadows Original',
    medium: 'Traditional media',
    description: 'An original work by Michelle Palacios of Dark Shadows Art Studio.',
    image: 'images/915 Poppies.jpeg',
    accent: '#c9a84c',
    wide: true,
  },
  {
    id: 2,
    title: 'Creature Calavara',
    category: 'Dark Shadows Original',
    medium: 'Traditional media',
    description: 'An original work by Michelle Palacios of Dark Shadows Art Studio.',
    image: 'images/Creature Calavara.jpg',
    accent: '#c9a84c',
  },
  {
    id: 3,
    title: 'Dead Flies',
    category: 'Dark Shadows Original',
    medium: 'Traditional media',
    description: 'An original work by Michelle Palacios of Dark Shadows Art Studio.',
    image: 'images/Dead Flies.jpg',
    accent: '#c9a84c',
  },

  {
    id: 5,
    title: 'Fire Fly Ghost',
    category: 'Dark Shadows Original',
    medium: 'Traditional media',
    description: 'An original work by Michelle Palacios of Dark Shadows Art Studio.',
    image: 'images/Fire Fly ghost.jpeg',
    accent: '#c9a84c',
  },
  {
    id: 6,
    title: 'Wild Axolotl',
    category: 'Dark Shadows Original',
    medium: 'Traditional media',
    description: 'An original work by Michelle Palacios of Dark Shadows Art Studio.',
    image: 'images/Wild Axolotl.jpg',
    accent: '#c9a84c',
  },
];

/* Palette gradients for placeholder backgrounds */
const CATEGORY_GRADIENTS = {
  'Día de los Muertos': 'linear-gradient(160deg, #1a0505 0%, #2a0a0a 40%, #180a00 100%)',
  'Gothic Original':    'linear-gradient(160deg, #0d0618 0%, #180a30 50%, #0a0a1a 100%)',
  'Fan Art':            'linear-gradient(160deg, #0a0a0a 0%, #1a1408 50%, #0f0c02 100%)',
  'Custom Portrait':    'linear-gradient(160deg, #0a0a0a 0%, #141414 50%, #111111 100%)',
};

/* SVG art placeholder icons per category */
function placeholderSVG(category, accent) {
  const a = accent || '#c9a84c';
  const shapes = {
    'Día de los Muertos': `
      <circle cx="50" cy="42" r="22" stroke="${a}" stroke-width="1.5" opacity=".7"/>
      <circle cx="43" cy="38" r="4" fill="${a}" opacity=".5"/>
      <circle cx="57" cy="38" r="4" fill="${a}" opacity=".5"/>
      <path d="M43 52 Q50 58 57 52" stroke="${a}" stroke-width="1.5" fill="none" stroke-linecap="round" opacity=".7"/>
      <path d="M30 28 Q35 15 50 20 Q65 15 70 28" stroke="${a}" stroke-width="1" fill="none" opacity=".4" stroke-dasharray="3 3"/>
      <path d="M50 20 L50 10 M46 16 L50 10 L54 16" stroke="${a}" stroke-width="1" opacity=".3"/>
      <circle cx="50" cy="8" r="3" fill="${a}" opacity=".3"/>
    `,
    'Gothic Original': `
      <path d="M50 15 L55 30 H70 L58 39 L63 54 L50 45 L37 54 L42 39 L30 30 H45 Z" stroke="${a}" stroke-width="1.25" fill="none" opacity=".6"/>
      <circle cx="50" cy="50" r="18" stroke="${a}" stroke-width="1" opacity=".2" stroke-dasharray="4 4"/>
      <path d="M36 70 Q50 60 64 70" stroke="${a}" stroke-width="1" fill="none" opacity=".35"/>
    `,
    'Fan Art': `
      <rect x="22" y="22" width="56" height="56" rx="4" stroke="${a}" stroke-width="1.5" fill="none" opacity=".5"/>
      <path d="M22 42 H78 M42 22 V78" stroke="${a}" stroke-width=".75" opacity=".2"/>
      <circle cx="50" cy="50" r="14" stroke="${a}" stroke-width="1.25" opacity=".6"/>
      <path d="M42 42 L58 58 M58 42 L42 58" stroke="${a}" stroke-width="1" opacity=".3"/>
    `,
    'Custom Portrait': `
      <circle cx="50" cy="36" r="14" stroke="${a}" stroke-width="1.5" opacity=".6"/>
      <path d="M22 82 C22 64 36 56 50 56 C64 56 78 64 78 82" stroke="${a}" stroke-width="1.5" fill="none" opacity=".6"/>
      <path d="M36 36 Q50 44 64 36" stroke="${a}" stroke-width=".75" fill="none" opacity=".3"/>
    `,
  };
  const shape = shapes[category] || shapes['Gothic Original'];
  return `<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${shape}</svg>`;
}

/* ── Render gallery ─────────────────────────────────────────── */
function renderGallery() {
  const grid = document.getElementById('gallery-grid');
  if (!grid) return;

  grid.innerHTML = '';

  GALLERY.forEach((item, idx) => {
    const el = document.createElement('div');
    el.className = 'gallery-item reveal' + (item.wide ? ' gallery-item-wide' : '');
    el.style.setProperty('--reveal-delay', `${(idx % 4) * 80}ms`);
    el.setAttribute('role', 'listitem');
    el.setAttribute('tabindex', '0');
    el.setAttribute('data-id', item.id);
    el.setAttribute('data-category', item.category);
    el.setAttribute('aria-label', `${item.title} — ${item.category}`);

    const bg = CATEGORY_GRADIENTS[item.category] || CATEGORY_GRADIENTS['Gothic Original'];

    el.innerHTML = item.image
      ? `
        <img src="${item.image}" alt="${item.title}" class="gallery-item-img" loading="lazy">
        <div class="gallery-item-overlay">
          <span class="gallery-item-category">${item.category}</span>
          <h3 class="gallery-item-title">${item.title}</h3>
        </div>
        <span class="gallery-item-view" aria-hidden="true">View Piece</span>
      `
      : `
        <div class="gallery-item-placeholder" style="background: ${bg};">
          <div class="gallery-placeholder-icon">${placeholderSVG(item.category, item.accent)}</div>
          <div>
            <p class="gallery-placeholder-label">${item.title}</p>
            <p class="gallery-placeholder-cat">${item.category}</p>
          </div>
        </div>
        <div class="gallery-item-overlay">
          <span class="gallery-item-category">${item.category}</span>
          <h3 class="gallery-item-title">${item.title}</h3>
        </div>
        <span class="gallery-item-view" aria-hidden="true">View Details</span>
      `;

    el.addEventListener('click', () => openLightbox(item.id));
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(item.id); }
    });

    grid.appendChild(el);
  });

  initRevealObserver();
}

/* ── Gallery filters ────────────────────────────────────────── */
function initGalleryFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  const grid = document.getElementById('gallery-grid');
  if (!buttons.length || !grid) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      buttons.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      const items = grid.querySelectorAll('.gallery-item');
      items.forEach(item => {
        const cat = item.dataset.category;
        const show = filter === 'all' || cat === filter;

        if (show) {
          item.removeAttribute('data-hidden');
          item.style.display = '';
        } else {
          item.setAttribute('data-hidden', '');
          item.style.display = 'none';
        }
      });
    });
  });
}

/* ── Lightbox ────────────────────────────────────────────────── */
let currentLightboxId = null;

function openLightbox(id) {
  const item = GALLERY.find(g => g.id === id);
  if (!item) return;

  currentLightboxId = id;

  const lb = document.getElementById('lightbox');
  const wrap = document.getElementById('lightbox-img-wrap');
  const title = document.getElementById('lightbox-title');
  const cat = document.getElementById('lightbox-category');
  const medium = document.getElementById('lightbox-medium');
  const desc = document.getElementById('lightbox-desc');

  if (!lb) return;

  cat.textContent = item.category;
  title.textContent = item.title;
  medium.textContent = item.medium;
  desc.textContent = item.description;

  if (item.image) {
    wrap.innerHTML = `<img src="${item.image}" alt="${item.title}">`;
  } else {
    const bg = CATEGORY_GRADIENTS[item.category] || CATEGORY_GRADIENTS['Gothic Original'];
    wrap.innerHTML = `
      <div class="lightbox-placeholder" style="background: ${bg};">
        ${placeholderSVG(item.category, item.accent)}
        <p style="font-family: var(--font-sub); font-size: .75rem; letter-spacing: .12em; opacity: .7;">Image Coming Soon</p>
      </div>`;
  }

  lb.hidden = false;
  document.body.style.overflow = 'hidden';

  // Focus management
  const closeBtn = document.getElementById('lightbox-close');
  closeBtn?.focus();

  updateLightboxNav();
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  lb.hidden = true;
  document.body.style.overflow = '';
  currentLightboxId = null;
}

function lightboxNav(direction) {
  const visibleIds = GALLERY
    .filter(item => {
      const el = document.querySelector(`.gallery-item[data-id="${item.id}"]`);
      return el && !el.hasAttribute('data-hidden');
    })
    .map(i => i.id);

  const idx = visibleIds.indexOf(currentLightboxId);
  if (idx === -1) return;

  const nextIdx = (idx + direction + visibleIds.length) % visibleIds.length;
  openLightbox(visibleIds[nextIdx]);
}

function updateLightboxNav() {
  const visibleIds = GALLERY
    .filter(item => {
      const el = document.querySelector(`.gallery-item[data-id="${item.id}"]`);
      return el && !el.hasAttribute('data-hidden');
    })
    .map(i => i.id);

  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');
  if (prevBtn) prevBtn.style.visibility = visibleIds.length > 1 ? '' : 'hidden';
  if (nextBtn) nextBtn.style.visibility = visibleIds.length > 1 ? '' : 'hidden';
}

function initLightbox() {
  const lb = document.getElementById('lightbox');
  if (!lb) return;

  document.getElementById('lightbox-close')?.addEventListener('click', closeLightbox);
  document.getElementById('lightbox-overlay')?.addEventListener('click', closeLightbox);
  document.getElementById('lightbox-prev')?.addEventListener('click', () => lightboxNav(-1));
  document.getElementById('lightbox-next')?.addEventListener('click', () => lightboxNav(1));

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (lb.hidden) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lightboxNav(-1);
    if (e.key === 'ArrowRight') lightboxNav(1);
  });

  // Close lightbox commission button
  document.getElementById('lightbox-commission-btn')?.addEventListener('click', closeLightbox);
}

/* ── Navigation ─────────────────────────────────────────────── */
function initNav() {
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');

  if (!nav) return;

  // Scroll state
  const scrollHandler = () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', scrollHandler, { passive: true });
  scrollHandler();

  // Mobile toggle
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close when a link is clicked
    links.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && links.classList.contains('open')) {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // Active section highlighting
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        active?.classList.add('active');
      }
    });
  }, { rootMargin: '-45% 0px -45% 0px' });

  sections.forEach(s => sectionObserver.observe(s));
}

/* ── Scroll reveal ──────────────────────────────────────────── */
function initRevealObserver() {
  const els = document.querySelectorAll('.reveal:not(.revealed)');
  if (!els.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.style.getPropertyValue('--reveal-delay')) || 0;
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -60px 0px', threshold: 0.06 });

  els.forEach(el => observer.observe(el));
}

function addRevealClasses() {
  // About section
  document.querySelectorAll('.about-photo-wrap, .about-quote, .about-bio, .about-tags').forEach((el, i) => {
    el.classList.add('reveal');
    if (i > 0) el.classList.add(`reveal-delay-${Math.min(i, 4)}`);
  });

  // Commission info
  document.querySelectorAll('.commission-status, .commission-steps li, .commission-note-box').forEach((el, i) => {
    el.classList.add('reveal', `reveal-delay-${Math.min(i, 4)}`);
  });

  // Prints
  document.querySelectorAll('.gallery-location-card, .prints-type-item').forEach((el, i) => {
    el.classList.add('reveal', `reveal-delay-${Math.min(i, 4)}`);
  });

  // Event cards
  document.querySelectorAll('.event-card').forEach((el, i) => {
    el.classList.add('reveal', `reveal-delay-${Math.min(i + 1, 4)}`);
  });

  // Contact cards
  document.querySelectorAll('.contact-card').forEach((el, i) => {
    el.classList.add('reveal', `reveal-delay-${Math.min(i, 4)}`);
  });
}

/* ── Commission form ────────────────────────────────────────── */
function initCommissionForm() {
  const form = document.getElementById('commission-form');
  if (!form) return;

  // File drop zone
  const dropZone = document.getElementById('file-drop-zone');
  const fileInput = document.getElementById('c-reference');
  const fileList = document.getElementById('file-list');

  if (dropZone && fileInput && fileList) {
    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.classList.add('drag-over');
    });

    ['dragleave', 'dragend'].forEach(evt => {
      dropZone.addEventListener(evt, () => dropZone.classList.remove('drag-over'));
    });

    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.classList.remove('drag-over');
      handleFiles(e.dataTransfer.files);
    });

    fileInput.addEventListener('change', () => handleFiles(fileInput.files));

    function handleFiles(files) {
      fileList.innerHTML = '';
      const arr = Array.from(files).slice(0, 10);
      arr.forEach(file => {
        const chip = document.createElement('div');
        chip.className = 'file-chip';
        chip.innerHTML = `
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="1" y="1" width="10" height="10" rx="2" stroke="currentColor" stroke-width="1"/>
            <path d="M3 5l2 2 4-4" stroke="currentColor" stroke-width="1" stroke-linecap="round"/>
          </svg>
          <span>${truncate(file.name, 22)}</span>
        `;
        fileList.appendChild(chip);
      });
    }
  }

  // Validation + submit via Formsubmit.co
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateForm(form)) return;

    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending…';

    const formData = new FormData(form);

    fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    })
    .then(response => {
      if (response.ok) {
        form.reset();
        if (fileList) fileList.innerHTML = '';
        showModal('commission-success');
      } else {
        alert('Something went wrong. Please try again or DM @mic_palacios13 on Instagram.');
      }
    })
    .catch(() => {
      alert('Network error. Please try again or DM @mic_palacios13 on Instagram.');
    })
    .finally(() => {
      btn.disabled = false;
      btn.textContent = 'Submit Commission Request';
    });
  });
}

/* ── Prints form ────────────────────────────────────────────── */
function initPrintsForm() {
  const form = document.getElementById('prints-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateForm(form)) return;

    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending…';

    const formData = new FormData(form);

    fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    })
    .then(response => {
      if (response.ok) {
        form.reset();
        showModal('prints-success');
      } else {
        alert('Something went wrong. Please try again or DM @mic_palacios13 on Instagram.');
      }
    })
    .catch(() => {
      alert('Network error. Please try again or DM @mic_palacios13 on Instagram.');
    })
    .finally(() => {
      btn.disabled = false;
      btn.textContent = 'Send Inquiry';
    });
  });
}

/* ── Form validation ────────────────────────────────────────── */
function validateForm(form) {
  let valid = true;

  form.querySelectorAll('[required]').forEach(field => {
    field.classList.remove('error');
    const isEmpty = !field.value.trim();
    const isInvalidEmail = field.type === 'email' && field.value && !isValidEmail(field.value);

    if (isEmpty || isInvalidEmail) {
      field.classList.add('error');
      valid = false;
    }
  });

  if (!valid) {
    const firstError = form.querySelector('.error');
    firstError?.focus();
    firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  return valid;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ── Modals ─────────────────────────────────────────────────── */
function showModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.hidden = false;
  modal.querySelector('button')?.focus();
}

function hideModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.hidden = true;
}

function initModals() {
  document.getElementById('commission-success-close')?.addEventListener('click', () => hideModal('commission-success'));
  document.getElementById('prints-success-close')?.addEventListener('click', () => hideModal('prints-success'));

  // Close on backdrop click
  ['commission-success', 'prints-success'].forEach(id => {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.addEventListener('click', (e) => {
      if (e.target === modal) hideModal(id);
    });
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      ['commission-success', 'prints-success'].forEach(id => {
        const modal = document.getElementById(id);
        if (modal && !modal.hidden) hideModal(id);
      });
    }
  });
}

/* ── Footer year ────────────────────────────────────────────── */
function setFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ── Utilities ──────────────────────────────────────────────── */
function truncate(str, maxLen) {
  return str.length > maxLen ? str.slice(0, maxLen - 1) + '…' : str;
}

/* ── Init ───────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  setFooterYear();
  addRevealClasses();
  renderGallery();
  initGalleryFilters();
  initLightbox();
  initNav();
  initCommissionForm();
  initPrintsForm();
  initModals();
  initRevealObserver();

  // Polite aria-pressed init on filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.setAttribute('aria-pressed', btn.classList.contains('active') ? 'true' : 'false');
  });
});
