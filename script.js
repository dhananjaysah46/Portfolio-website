'use strict';
/* ═══════════════════════════════════════════════
   DHANANJAY SAH · SIGNAL · script.js
═══════════════════════════════════════════════ */

/* ── Loader ── */
(function(){
  const loader = document.getElementById('loader');
  const pct    = document.getElementById('ld-pct');
  let n = 0;
  const tick = () => {
    n = Math.min(n + Math.random() * 14 + 5, 100);
    if(pct) pct.textContent = Math.floor(n);
    if(n < 100) setTimeout(tick, 100);
    else setTimeout(() => { if(loader) loader.classList.add('out'); }, 280);
  };
  tick();
  window.addEventListener('load', () => { n = 100; if(pct) pct.textContent = '100'; setTimeout(() => { if(loader) loader.classList.add('out'); }, 400); }, {once:true});
  setTimeout(() => { if(loader) loader.classList.add('out'); }, 4000);
})();

/* ── Custom cursor ── */
(function(){
  if(window.innerWidth <= 768) return;
  const ring = document.getElementById('cur-ring');
  const dot  = document.getElementById('cur-dot');
  if(!ring || !dot) return;
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx+'px'; dot.style.top = my+'px';
  });
  (function loop(){
    rx += (mx-rx)*0.13; ry += (my-ry)*0.13;
    ring.style.left = rx+'px'; ring.style.top = ry+'px';
    requestAnimationFrame(loop);
  })();
  document.addEventListener('mousedown', () => ring.classList.add('small'));
  document.addEventListener('mouseup',   () => ring.classList.remove('small'));
  document.querySelectorAll('a,button,.jtl-card,.pb-card,.sbt-item,.fbtn,.pcl-btn,.csl-row').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('big'));
    el.addEventListener('mouseleave', () => ring.classList.remove('big'));
  });
})();

/* ── Theme ── */
(function(){
  const btn = document.getElementById('theme-btn');
  const ico = document.getElementById('theme-ico');
  if(!btn) return;
  const saved = localStorage.getItem('ds-signal-theme');
  if(saved === 'dark') { document.body.classList.add('dark'); if(ico) ico.className='bx bx-moon'; }
  btn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const d = document.body.classList.contains('dark');
    if(ico) ico.className = d ? 'bx bx-moon' : 'bx bx-sun';
    localStorage.setItem('ds-signal-theme', d ? 'dark' : 'light');
    showToast(d ? 'Dark mode' : 'Light mode');
  });
})();

/* ── Toast ── */
function showToast(msg, type='ok') {
  const zone = document.getElementById('toast-zone');
  if(!zone) return;
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.textContent = msg;
  zone.appendChild(t);
  requestAnimationFrame(() => requestAnimationFrame(() => t.classList.add('show')));
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, 3000);
}

/* ── Mobile menu ── */
(function(){
  const burger  = document.getElementById('burger');
  const menu    = document.getElementById('mob-menu');
  const close   = document.getElementById('mob-close');
  if(!burger || !menu) return;
  const open  = () => { menu.classList.add('open'); document.body.style.overflow='hidden'; };
  const shut  = () => { menu.classList.remove('open'); document.body.style.overflow=''; };
  burger.addEventListener('click', open);
  close?.addEventListener('click', shut);
  menu.querySelectorAll('.mml').forEach(l => l.addEventListener('click', shut));
})();

/* ── Scroll: progress, nav, spy, btt ── */
(function(){
  const prog  = document.getElementById('sprogress');
  const nav   = document.getElementById('nav');
  const btt   = document.getElementById('btt');
  const navLs = document.querySelectorAll('.nl[data-s]');
  const mbbIs = document.querySelectorAll('.mbb-item[data-s]');
  const sects = document.querySelectorAll('section[id]');

  function thr(fn, ms){ let t=0; return (...a)=>{ const n=Date.now(); if(n-t>=ms){t=n;fn(...a);} }; }

  const onScroll = thr(() => {
    const sy = window.scrollY;
    const tot = document.documentElement.scrollHeight - window.innerHeight;
    if(prog) prog.style.width = (sy/tot*100)+'%';
    if(nav)  nav.classList.toggle('scrolled', sy > 40);
    if(btt)  btt.style.display = sy > 500 ? 'flex' : 'none';
    let cur = '';
    sects.forEach(s => { if(sy >= s.offsetTop - 180) cur = s.id; });
    navLs.forEach(l => l.classList.toggle('active', l.getAttribute('data-s') === cur));
    mbbIs.forEach(l => l.classList.toggle('active', l.getAttribute('data-s') === cur));
  }, 60);

  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();
  btt?.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));
})();

/* ── Smooth anchors ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if(t){ e.preventDefault(); t.scrollIntoView({behavior:'smooth'}); }
  });
});

/* ── Reveal on scroll ── */
(function(){
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(!e.isIntersecting) return;
      const d = parseInt(e.target.getAttribute('data-delay')||0);
      setTimeout(() => e.target.classList.add('vis'), d);
    });
  }, {threshold:0.08, rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('[data-reveal]').forEach(el => {
    io.observe(el);
    if(el.getBoundingClientRect().top < window.innerHeight)
      setTimeout(() => el.classList.add('vis'), parseInt(el.getAttribute('data-delay')||0)+60);
  });
})();

/* ── Hero title stagger ── */
(function(){
  document.querySelectorAll('.ht-line').forEach((el,i) => {
    el.style.opacity='0'; el.style.transform='translateY(24px)';
    el.style.transition=`opacity .7s .${3+i*1}s ease, transform .7s .${3+i*1}s ease`;
    setTimeout(() => { el.style.opacity='1'; el.style.transform='none'; }, 300 + i*130);
  });
  ['.hero-eyebrow','.hero-sub','.hero-actions','.hero-scroll-tag'].forEach((sel,i) => {
    const el = document.querySelector(sel);
    if(!el) return;
    el.style.opacity='0'; el.style.transition=`opacity .6s ${.55+i*.1}s ease`;
    setTimeout(() => el.style.opacity='1', 700 + i*90);
  });
})();

/* ── Terminal typewriter ── */
(function(){
  const typed  = document.getElementById('term-typed');
  const cursor = document.getElementById('term-cursor');
  const output = document.getElementById('term-output');
  if(!typed || !output) return;

  const sessions = [
    {
      cmd: 'python manage.py runserver',
      lines: [
        {cls:'to-line', txt:'Watching for file changes with StatReloader'},
        {cls:'to-line', txt:'Performing system checks...'},
        {cls:'', txt:''},
        {cls:'to-line', txt:'System check identified no issues (0 silenced).'},
        {cls:'to-line', txt:'Django version 4.2.7, using settings "config.settings"'},
        {cls:'to-line', txt:'Starting development server at <span class="to-val">http://127.0.0.1:8000/</span>'},
        {cls:'to-line', txt:'Quit the server with CONTROL-C.'},
      ]
    },
    {
      cmd: 'python manage.py makemigrations',
      lines: [
        {cls:'to-line', txt:'Migrations for <span class="to-key">\'expenses\'</span>:'},
        {cls:'to-line', txt:'  expenses/migrations/<span class="to-val">0002_expense_category.py</span>'},
        {cls:'to-line', txt:'    - Add field category to expense'},
        {cls:'to-line', txt:'    - Add field budget to expense'},
      ]
    },
    {
      cmd: 'git push origin main',
      lines: [
        {cls:'to-line', txt:'Enumerating objects: 5, done.'},
        {cls:'to-line', txt:'Counting objects: 100% (5/5), done.'},
        {cls:'to-line', txt:'Writing objects: 100% (3/3), 812 bytes | 812.00 KiB/s, done.'},
        {cls:'to-line', txt:'Branch \'main\' set up to track origin/main.'},
        {cls:'to-val',  txt:'✓ Push successful.'},
      ]
    }
  ];

  let si = 0;

  function typeCmd(cmd, cb) {
    typed.textContent = '';
    let ci = 0;
    const iv = setInterval(() => {
      typed.textContent += cmd[ci++];
      if(ci >= cmd.length){ clearInterval(iv); setTimeout(cb, 500); }
    }, 45);
  }

  function showOutput(lines, cb) {
    output.innerHTML = '';
    let li = 0;
    function next() {
      if(li >= lines.length){ setTimeout(cb, 1800); return; }
      const row = document.createElement('div');
      row.className = lines[li].cls;
      row.innerHTML = lines[li].txt;
      output.appendChild(row);
      li++;
      setTimeout(next, 160);
    }
    next();
  }

  function clearAndType() {
    typed.textContent = '';
    output.innerHTML = '';
    const s = sessions[si % sessions.length];
    si++;
    typeCmd(s.cmd, () => {
      showOutput(s.lines, () => {
        setTimeout(clearAndType, 1200);
      });
    });
  }

  setTimeout(clearAndType, 1200);
})();

/* ── Count-up ── */
(function(){
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(!e.isIntersecting) return;
      const el = e.target, target = parseInt(el.getAttribute('data-to'));
      const dur = 1600, step = target / (dur / 16);
      let n = 0;
      const run = () => {
        n = Math.min(n+step, target);
        el.textContent = Math.floor(n)+'+';
        if(n < target) requestAnimationFrame(run); else el.textContent = target+'+';
      };
      run(); io.unobserve(el);
    });
  }, {threshold:0.5});
  document.querySelectorAll('.hss-num[data-to]').forEach(el => io.observe(el));
})();

/* ── Progress bar fill ── */
(function(){
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(!e.isIntersecting) return;
      const fill = e.target.querySelector('.aep-fill');
      if(fill) fill.style.width = fill.getAttribute('data-w')+'%';
      io.unobserve(e.target);
    });
  }, {threshold:0.5});
  document.querySelectorAll('.ae-progress').forEach(el => io.observe(el));
})();

/* ── Nepal clock ── */
(function(){
  const el = document.getElementById('clk');
  if(!el) return;
  const tick = () => {
    el.textContent = new Intl.DateTimeFormat('en-US',{
      timeZone:'Asia/Kathmandu',hour:'2-digit',minute:'2-digit',hour12:true
    }).format(new Date());
  };
  tick(); setInterval(tick, 10000);
})();

/* ── Draggable timeline ── */
(function(){
  const track = document.getElementById('jtl-track');
  if(!track) return;
  let isDown=false, startX=0, scrollL=0;
  track.parentElement.addEventListener('mousedown', e => {
    isDown=true; startX=e.pageX - track.parentElement.offsetLeft;
    scrollL = track.parentElement.scrollLeft;
  });
  track.parentElement.addEventListener('mouseleave', () => isDown=false);
  track.parentElement.addEventListener('mouseup', () => isDown=false);
  track.parentElement.addEventListener('mousemove', e => {
    if(!isDown) return; e.preventDefault();
    const x = e.pageX - track.parentElement.offsetLeft;
    track.parentElement.scrollLeft = scrollL - (x - startX);
  });
})();

/* ── Project filter ── */
(function(){
  const btns  = document.querySelectorAll('.fbtn');
  const cards = document.querySelectorAll('.pb-card');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.getAttribute('data-f');
      cards.forEach(c => {
        const cats = (c.getAttribute('data-cat')||'').split(' ');
        c.classList.toggle('hide', f !== 'all' && !cats.includes(f));
      });
    });
  });
})();

/* ── Contact form ── */
(function(){
  const form   = document.getElementById('cf');
  const nameEl = document.getElementById('cf-name');
  const emlEl  = document.getElementById('cf-email');
  const msgEl  = document.getElementById('cf-msg');
  const count  = document.querySelector('.cf-count');
  const out    = document.getElementById('cf-msg-out');
  const sub    = document.getElementById('cf-submit');
  const lbl    = document.getElementById('cf-label');
  if(!form) return;

  const KEY = '64f1d5c8-b451-45de-b0e0-7c55d8dbadb9';
  let lastSend = 0;

  const san   = s => { const d=document.createElement('div'); d.textContent=s; return d.innerHTML; };
  const vName = s => /^[a-zA-Z\s'\-]{2,50}$/.test(s.trim());
  const vEml  = s => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s);
  const vMsg  = s => s.length>=10 && s.length<=500 && !/<script|javascript:|eval\(/i.test(s);
  const mark  = (el, ok) => { el.classList.toggle('ok',ok); el.classList.toggle('bad',!ok&&el.value.trim()!==''); };

  nameEl?.addEventListener('input', () => mark(nameEl, vName(nameEl.value)));
  emlEl?.addEventListener('input',  () => mark(emlEl,  vEml(emlEl.value)));
  msgEl?.addEventListener('input',  () => {
    const l = msgEl.value.length;
    if(count) count.textContent = `${l} / 500`;
    mark(msgEl, vMsg(msgEl.value));
  });

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if(Date.now()-lastSend < 5000){ showToast('Wait a moment…','err'); return; }
    const n=nameEl.value.trim(), em=emlEl.value.trim(), ms=msgEl.value.trim();
    if(!vName(n)){ showToast('Enter a valid name.','err'); nameEl.focus(); return; }
    if(!vEml(em)){ showToast('Enter a valid email.','err'); emlEl.focus(); return; }
    if(!vMsg(ms)){ showToast('Message: 10–500 chars.','err'); msgEl.focus(); return; }
    if(document.getElementById('hp')?.value) return;
    lastSend = Date.now();
    sub.disabled=true; if(lbl) lbl.textContent='Sending…';
    try {
      const res = await fetch('https://api.web3forms.com/submit',{
        method:'POST',
        headers:{'Content-Type':'application/json','Accept':'application/json'},
        body: JSON.stringify({access_key:KEY, name:san(n), email:san(em), message:san(ms), botcheck:false})
      });
      const data = await res.json();
      if(data.success){
        if(out){ out.textContent='✓ Message sent! I\'ll reply within 24 hours.'; out.className='ok'; }
        showToast('Message sent!','ok');
        form.reset();
        nameEl.className=''; emlEl.className=''; msgEl.className='';
        if(count) count.textContent='0 / 500';
      } else throw new Error(data.message);
    } catch(err){
      if(out){ out.textContent='✗ Failed — please try again.'; out.className='err'; }
      showToast('Send failed.','err');
    } finally {
      sub.disabled=false; if(lbl) lbl.textContent='Send Message';
      setTimeout(()=>{ if(out){out.textContent='';out.className='';} },6000);
    }
  });
})();

/* ── CV download guard ── */
(function(){
  const el = document.getElementById('dl-cv');
  if(!el) return;
  el.addEventListener('click', e => {
    if(el.getAttribute('href')==='resume.pdf' || !el.getAttribute('href') || el.getAttribute('href')==='#'){
      e.preventDefault(); showToast('CV coming soon!','err');
    } else { showToast('Downloading…'); }
  });
})();

/* ── Inject mobile bottom bar ── */
(function(){
  const bar = document.createElement('div');
  bar.className = 'mob-bar-bottom';
  bar.innerHTML = `
    <a href="#hero"     class="mbb-item active" data-s="hero"><i class="bx bx-home-alt-2"></i><span>Home</span></a>
    <a href="#about"    class="mbb-item" data-s="about"><i class="bx bx-user"></i><span>About</span></a>
    <a href="#projects" class="mbb-item" data-s="projects"><i class="bx bx-briefcase"></i><span>Work</span></a>
    <a href="#contact"  class="mbb-item" data-s="contact"><i class="bx bx-send"></i><span>Contact</span></a>
  `;
  document.body.appendChild(bar);
})();

/* ── Skill items hover noise ── */
document.querySelectorAll('.sbt-item').forEach(el => {
  el.addEventListener('mouseenter', () => el.style.transition='all .15s ease');
  el.addEventListener('mouseleave', () => el.style.transition='all .25s ease');
});

/* ── Console sig ── */
console.log('%cDS · SIGNAL', 'color:#C1121F;font-size:20px;font-weight:900;letter-spacing:.05em;');
console.log('%cDjango · Python · Built precise.', 'color:#8C8070;font-size:12px;');

/* ── Tab title ── */
const _origTitle = document.title;
document.addEventListener('visibilitychange', () => {
  document.title = document.hidden ? '👋 Come back' : _origTitle;
});

/* ── Konami ── */
(function(){
  const seq=['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let buf=[];
  document.addEventListener('keydown', e => {
    buf.push(e.key); buf=buf.slice(-seq.length);
    if(buf.join('')===seq.join('')){ showToast('🎮 Easter egg found!'); }
  });
})();