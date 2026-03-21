(function () {
  const $ = s => document.querySelector(s), $$ = s => Array.from(document.querySelectorAll(s));



  /* Active link */
  const path = location.pathname.replace(/\/index\.html$/, '/');
  $$('.nav-links a').forEach(a => {
    const href = new URL(a.getAttribute('href'), location.origin).pathname.replace(/\/index\.html$/, '/');
    if (href === path) a.setAttribute('aria-current', 'page');
  });

  /* Progress on blog detail (ToC generation removed) */
  if (/\/blog_content\//.test(location.pathname)) {
    const bar = document.createElement('div'); bar.className = 'reading-progress'; document.body.appendChild(bar);
    const onScroll = () => {
      const s = document.documentElement.scrollTop || document.body.scrollTop;
      const h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      bar.style.width = (Math.min(1, Math.max(0, s / h)) * 100) + '%';
    };
    addEventListener('scroll', onScroll, { passive: true }); addEventListener('resize', onScroll); onScroll();

    // NOTE: Automatic ToC generation intentionally removed to prevent the "On this page" box
  }
})();
