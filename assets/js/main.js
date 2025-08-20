/* ==========================================================
   Gaurav Lohkna — Minimal JS
   - Mobile nav
   - Active link highlighting
   - Reading progress + ToC on blog posts
   - Lazy image enhancements & meta
   ========================================================== */

(function () {
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* Mobile menu */
  const toggleBtn = $('.menu-toggle');
  const navLinks = $('.nav-links');
  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('is-open');
      toggleBtn.setAttribute('aria-expanded', navLinks.classList.contains('is-open') ? 'true' : 'false');
    });
    // Close when clicking a link (mobile)
    $$('.nav-links a').forEach(a => a.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }));
  }

  /* Active nav link */
  const path = location.pathname.replace(/\/index\.html$/, '/');
  $$('.nav-links a').forEach(a => {
    const href = new URL(a.getAttribute('href'), location.origin).pathname.replace(/\/index\.html$/, '/');
    if (href === path) a.setAttribute('aria-current', 'page');
  });

  /* Lazy: give all non-hero images lazy loading + decoding hints */
  $$('img:not([loading])').forEach(img => {
    img.loading = 'lazy';
    img.decoding = 'async';
  });

  /* Inject generic SEO/OG if missing (non-destructive) */
  const ensureMeta = (name, attrs) => {
    if (!document.head.querySelector(`[name="${name}"],[property="${name}"]`)) {
      const m = document.createElement('meta');
      for (const [k, v] of Object.entries(attrs)) m.setAttribute(k, v);
      document.head.appendChild(m);
    }
  };
  ensureMeta('og:site_name', { property: 'og:site_name', content: 'Gaurav Lohkna' });
  ensureMeta('twitter:card', { name: 'twitter:card', content: 'summary_large_image' });

  /* Blog detail: progress bar + Table of Contents */
  const isBlogDetail = /\/blog_content\//.test(location.pathname);
  if (isBlogDetail) {
    // Progress bar
    const bar = document.createElement('div');
    bar.className = 'reading-progress';
    document.body.appendChild(bar);
    const update = () => {
      const s = document.documentElement.scrollTop || document.body.scrollTop;
      const h = (document.documentElement.scrollHeight - document.documentElement.clientHeight);
      const pct = Math.max(0, Math.min(1, s / h)) * 100;
      bar.style.width = pct + '%';
    };
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();

    // ToC (build from h2/h3)
    const main = $('main') || $('article') || $('.blog-content') || document.body;
    const headings = $$('h2[id], h3[id]', main).length
      ? $$('h2[id], h3[id]', main)
      : $$('h2, h3', main).map(h => { h.id ||= h.textContent.trim().toLowerCase().replace(/\s+/g,'-').replace(/[^\w\-]/g,''); return h; });

    if (headings.length > 1) {
      const toc = document.createElement('nav');
      toc.className = 'toc';
      toc.setAttribute('aria-label','Table of contents');
      toc.innerHTML = `<h3>On this page</h3><ol>${headings.map(h=>{
        const depth = h.tagName === 'H2' ? 0 : 1;
        return `<li style="padding-left:${depth*.75}rem"><a href="#${h.id}">${h.textContent}</a></li>`;
      }).join('')}</ol>`;
      // Insert near the top if a layout has a sidebar slot:
      const wrapper = $('.article-layout') || main;
      if (wrapper === main) {
        // Prepend in-flow on mobile
        main.insertBefore(toc, main.firstChild);
      } else {
        wrapper.appendChild(toc);
      }
    }
  }
})();
