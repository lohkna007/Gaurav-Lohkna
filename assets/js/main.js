(function(){
  const $ = s=>document.querySelector(s), $$ = s=>Array.from(document.querySelectorAll(s));

  /* Mobile menu */
  const btn=$('.menu-toggle'), nav=$('.nav-links');
  if(btn && nav){
    btn.addEventListener('click',()=>{ nav.classList.toggle('is-open'); btn.setAttribute('aria-expanded', nav.classList.contains('is-open')); });
    $$('.nav-links a').forEach(a=>a.addEventListener('click',()=>{ nav.classList.remove('is-open'); btn.setAttribute('aria-expanded','false'); }));
  }

  /* Active link */
  const path = location.pathname.replace(/\/index\.html$/,'/'); 
  $$('.nav-links a').forEach(a=>{
    const href = new URL(a.getAttribute('href'), location.origin).pathname.replace(/\/index\.html$/,'/');
    if(href===path) a.setAttribute('aria-current','page');
  });

  /* Progress + ToC on blog detail */
  if(/\/blog_content\//.test(location.pathname)){
    const bar=document.createElement('div'); bar.className='reading-progress'; document.body.appendChild(bar);
    const onScroll=()=>{
      const s=document.documentElement.scrollTop||document.body.scrollTop;
      const h=document.documentElement.scrollHeight-document.documentElement.clientHeight;
      bar.style.width=(Math.min(1,Math.max(0,s/h))*100)+'%';
    };
    addEventListener('scroll', onScroll, {passive:true}); addEventListener('resize', onScroll); onScroll();

    // Simple ToC
    const main=document.querySelector('main')||document.body;
    const hs=$$('h2, h3', main).filter(h=>h.textContent.trim().length>0);
    hs.forEach(h=>{ if(!h.id) h.id=h.textContent.toLowerCase().replace(/\s+/g,'-').replace(/[^\w\-]/g,''); });
    if(hs.length>1){
      const toc=document.createElement('nav'); toc.className='toc'; toc.innerHTML=`<h3>On this page</h3><ol>${hs.map(h=>`<li style="padding-left:${h.tagName==='H3'?'.75rem':'0'}"><a href="#${h.id}">${h.textContent}</a></li>`).join('')}</ol>`;
      main.insertBefore(toc, main.firstChild);
    }
  }
})();
