/* ═══════════════════════════════════════════════════════
   DHANANJAY SAH · PORTFOLIO · SCRIPT
   Modules: DevTools Block · Preloader · Canvas · Cursor · Nav · Reveal
            Typewriter · CountUp · RingProgress · SkillBars
            Tilt · Magnetic · Cube · ProjectFilter
            Form · Scroll · Theme · Clock · Konami
═══════════════════════════════════════════════════════ */

'use strict';

/* ══════════════════════════════════════════════════════════
   ██████╗ ███████╗██╗   ██╗    ████████╗ ██████╗  ██████╗ ██╗     ███████╗
   ██╔══██╗██╔════╝██║   ██║       ██╔══╝██╔═══██╗██╔═══██╗██║     ██╔════╝
   ██║  ██║█████╗  ██║   ██║       ██║   ██║   ██║██║   ██║██║     ███████╗
   ██║  ██║██╔══╝  ╚██╗ ██╔╝       ██║   ██║   ██║██║   ██║██║     ╚════██║
   ██████╔╝███████╗ ╚████╔╝        ██║   ╚██████╔╝╚██████╔╝███████╗███████║
   ╚═════╝ ╚══════╝  ╚═══╝         ╚═╝    ╚═════╝  ╚═════╝ ╚══════╝╚══════╝
   BLOCKING — Protects source inspection
══════════════════════════════════════════════════════════ */

(function initDevToolsBlock(){

  /* ── 1. Disable right-click context menu ── */
  document.addEventListener('contextmenu', function(e){
    e.preventDefault();
    return false;
  });

  /* ── 2. Block common keyboard shortcuts ── */
  document.addEventListener('keydown', function(e){
    // F12
    if(e.key === 'F12' || e.keyCode === 123){
      e.preventDefault(); return false;
    }
    // Ctrl+Shift+I / Cmd+Option+I (DevTools)
    if((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.key === 'i')){
      e.preventDefault(); return false;
    }
    // Ctrl+Shift+J / Cmd+Option+J (Console)
    if((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'J' || e.key === 'j')){
      e.preventDefault(); return false;
    }
    // Ctrl+Shift+C / Cmd+Option+C (Inspector)
    if((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'C' || e.key === 'c')){
      e.preventDefault(); return false;
    }
    // Ctrl+U / Cmd+U (View Source)
    if((e.ctrlKey || e.metaKey) && (e.key === 'U' || e.key === 'u')){
      e.preventDefault(); return false;
    }
    // Ctrl+S / Cmd+S (Save Page)
    if((e.ctrlKey || e.metaKey) && (e.key === 'S' || e.key === 's')){
      e.preventDefault(); return false;
    }
    // Ctrl+P / Cmd+P (Print — optional)
    if((e.ctrlKey || e.metaKey) && (e.key === 'P' || e.key === 'p')){
      e.preventDefault(); return false;
    }
  }, true);

  /* ── 3. DevTools size-change detection ── */
  const THRESHOLD = 160;
  let _devOpen = false;

  function checkDevTools(){
    const widthDiff  = window.outerWidth  - window.innerWidth;
    const heightDiff = window.outerHeight - window.innerHeight;
    const isOpen = widthDiff > THRESHOLD || heightDiff > THRESHOLD;

    if(isOpen && !_devOpen){
      _devOpen = true;
      handleDevToolsOpen();
    } else if(!isOpen && _devOpen){
      _devOpen = false;
    }
  }

  function handleDevToolsOpen(){
    // Redirect or blank the page when DevTools detected
    document.body.innerHTML = '';
    document.title = '⚠️ Access Denied';
    const shield = document.createElement('div');
    shield.style.cssText = [
      'position:fixed;inset:0;background:#020408;',
      'display:flex;flex-direction:column;align-items:center;justify-content:center;',
      'font-family:monospace;color:#00f5d4;z-index:999999;gap:16px;'
    ].join('');
    shield.innerHTML = [
      '<div style="font-size:3rem;">🛡️</div>',
      '<div style="font-size:1.4rem;font-weight:bold;">Developer Tools Detected</div>',
      '<div style="color:#6b7a99;font-size:.9rem;">This portfolio is protected.</div>',
      '<div style="color:#6b7a99;font-size:.85rem;">Please close DevTools to continue.</div>',
    ].join('');
    document.body.appendChild(shield);
  }

  setInterval(checkDevTools, 1000);

  /* ── 4. console.log trap (debugger detection) ── */
  let _startTime = new Date();
  const _devCheck = new RegExp('');
  _devCheck.toString = function(){
    if(new Date() - _startTime > 100){
      handleDevToolsOpen();
    }
    return '';
  };

  /* ── 5. Disable text selection on sensitive elements ── */
  document.addEventListener('selectstart', function(e){
    if(e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    // Allow selecting in readable text areas for UX
    const tag = e.target.closest('p, h1, h2, h3, h4, li, .at-body, .at-lead');
    if(tag) return;
    e.preventDefault();
  });

})();

/* ── Preloader ── */
let _preloaderDone = false;
function skipPreloader(){
  if(_preloaderDone) return;
  _preloaderDone = true;
  const el = document.getElementById('preloader');
  if(!el) return;
  el.classList.add('out');
  setTimeout(()=>{ el.style.display='none'; }, 700);
}

(function initPreloader(){
  const pct = document.getElementById('pl-pct');
  let n = 0;
  const iv = setInterval(()=>{
    n = Math.min(n + Math.random()*18 + 4, 100);
    if(pct) pct.textContent = Math.floor(n);
    if(n >= 100){ clearInterval(iv); setTimeout(skipPreloader, 300); }
  }, 120);
  // Failsafe — fires once on window load, then absolute timeout
  window.addEventListener('load', ()=>{ clearInterval(iv); setTimeout(skipPreloader, 800); }, {once:true});
  setTimeout(skipPreloader, 4500);
})();

/* ── WebGL Background Canvas ── */
(function initCanvas(){
  const canvas = document.getElementById('bg-canvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let W,H,particles=[];

  function resize(){
    W=canvas.width=window.innerWidth;
    H=canvas.height=window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Star{
    constructor(){this.reset();}
    reset(){
      this.x=Math.random()*W;
      this.y=Math.random()*H;
      this.r=Math.random()*1.5+.3;
      this.vx=(Math.random()-.5)*.2;
      this.vy=(Math.random()-.5)*.2;
      this.a=Math.random()*.7;
    }
    update(){
      this.x+=this.vx; this.y+=this.vy;
      if(this.x<0||this.x>W||this.y<0||this.y>H) this.reset();
    }
    draw(){
      const isLight=document.body.classList.contains('light-theme');
      const col = isLight ? `rgba(100,60,200,${this.a*.6})` : `rgba(0,245,212,${this.a})`;
      ctx.fillStyle=col;
      ctx.beginPath();
      ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
      ctx.fill();
    }
  }

  const COUNT = window.innerWidth>768 ? 120 : 60;
  for(let i=0;i<COUNT;i++) particles.push(new Star());

  function drawLines(){
    const isLight=document.body.classList.contains('light-theme');
    for(let i=0;i<particles.length;i++){
      for(let j=i+1;j<particles.length;j++){
        const dx=particles[i].x-particles[j].x;
        const dy=particles[i].y-particles[j].y;
        const d=Math.sqrt(dx*dx+dy*dy);
        if(d<110){
          const a=(1-d/110)*.15;
          const col = isLight ? `rgba(100,60,200,${a*.5})` : `rgba(0,245,212,${a})`;
          ctx.strokeStyle=col;
          ctx.lineWidth=.7;
          ctx.beginPath();
          ctx.moveTo(particles[i].x,particles[i].y);
          ctx.lineTo(particles[j].x,particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function loop(){
    ctx.clearRect(0,0,W,H);
    particles.forEach(p=>{p.update();p.draw();});
    drawLines();
    requestAnimationFrame(loop);
  }
  loop();
})();

/* ── Custom Cursor ── */
(function initCursor(){
  if(window.innerWidth<=768) return;
  const dot  = document.getElementById('c-dot');
  const halo = document.getElementById('c-halo');
  const lbl  = document.getElementById('c-label');
  if(!dot||!halo) return;

  let mx=0,my=0,hx=0,hy=0;

  document.addEventListener('mousemove',e=>{
    mx=e.clientX; my=e.clientY;
    dot.style.left=mx+'px'; dot.style.top=my+'px';
  });

  function followHalo(){
    hx+=(mx-hx)*.12; hy+=(my-hy)*.12;
    halo.style.left=hx+'px'; halo.style.top=hy+'px';
    if(lbl.classList.contains('visible')){
      lbl.style.left=(mx+20)+'px'; lbl.style.top=(my)+'px';
    }
    requestAnimationFrame(followHalo);
  }
  followHalo();

  document.addEventListener('mousedown',()=>halo.classList.add('click'));
  document.addEventListener('mouseup',()=>halo.classList.remove('click'));

  document.querySelectorAll('a,button,.tilt-card,.proj-card,.pca-btn,.sk-icon').forEach(el=>{
    el.addEventListener('mouseenter',()=>{
      halo.classList.add('grow');
      const tip=el.getAttribute('data-tip');
      if(tip){lbl.textContent=tip;lbl.classList.add('visible');}
    });
    el.addEventListener('mouseleave',()=>{
      halo.classList.remove('grow');
      lbl.classList.remove('visible');
    });
  });
})();

/* ── Skill icon hover ripple glow ── */
(function initSkillIcons(){
  document.querySelectorAll('.sk-icon').forEach(el=>{
    el.addEventListener('mouseenter',function(){
      this.style.transition='border-color .2s,background .2s,box-shadow .2s';
    });
    // Stagger entrance animation
    const group = el.closest('.ic-group');
    if(!group) return;
    const siblings = Array.from(group.querySelectorAll('.sk-icon'));
    const idx = siblings.indexOf(el);
    el.style.animationDelay = (idx * 60) + 'ms';
  });

  // Entrance animation via IntersectionObserver
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(!e.isIntersecting) return;
      e.target.querySelectorAll('.sk-icon').forEach((el,i)=>{
        setTimeout(()=>{
          el.style.opacity='1';
          el.style.transform='translateY(0)';
        }, i*55);
      });
      io.unobserve(e.target);
    });
  },{threshold:0.15});

  document.querySelectorAll('.ic-group').forEach(g=>{
    g.querySelectorAll('.sk-icon').forEach(el=>{
      el.style.opacity='0';
      el.style.transform='translateY(16px)';
      el.style.transition='opacity .5s ease,transform .5s ease';
    });
    io.observe(g);
  });
})();

/* ── Theme Toggle ── */
(function initTheme(){
  const btn=document.getElementById('theme-toggle');
  const ico=document.getElementById('theme-icon');
  if(!btn) return;
  const saved=localStorage.getItem('ds-theme');
  if(saved==='light'){
    document.body.classList.add('light-theme');
    if(ico) ico.className='bx bx-sun';
  }
  btn.addEventListener('click',()=>{
    document.body.classList.toggle('light-theme');
    const isLight=document.body.classList.contains('light-theme');
    if(ico) ico.className=isLight?'bx bx-sun':'bx bx-moon';
    localStorage.setItem('ds-theme',isLight?'light':'dark');
    showToast(`${isLight?'Light':'Dark'} mode`,'ok');
  });
})();

/* ── Toast ── */
function showToast(msg,type='ok'){
  const zone=document.getElementById('toast-zone');
  if(!zone) return;
  const t=document.createElement('div');
  t.className=`toast ${type}`;
  t.textContent=msg;
  zone.appendChild(t);
  requestAnimationFrame(()=>requestAnimationFrame(()=>t.classList.add('show')));
  setTimeout(()=>{
    t.classList.remove('show');
    setTimeout(()=>t.remove(),350);
  },3200);
}

/* ── Mobile Nav Drawer ── */
(function initDrawer(){
  const toggle=document.getElementById('mob-toggle');
  const drawer=document.getElementById('mob-drawer');
  const mask=document.getElementById('drawer-mask');
  const closeBtn=document.getElementById('mob-close');
  if(!toggle) return;
  function open(){
    toggle.classList.add('open');
    drawer.classList.add('open');
    mask.classList.add('open');
    document.body.style.overflow='hidden';
  }
  function close(){
    toggle.classList.remove('open');
    drawer.classList.remove('open');
    mask.classList.remove('open');
    document.body.style.overflow='';
  }
  toggle.addEventListener('click',()=>drawer.classList.contains('open')?close():open());
  closeBtn?.addEventListener('click',close);
  mask.addEventListener('click',close);
  document.querySelectorAll('.mdl').forEach(l=>l.addEventListener('click',close));
})();

/* ── Scroll Effects: progress, active nav, back-to-top, scroll-hint ── */
(function initScroll(){
  const progressBar=document.getElementById('progress-bar');
  const backTop=document.getElementById('back-top');
  const nav=document.getElementById('site-nav');
  const hint=document.getElementById('scroll-hint');
  const navLinks=document.querySelectorAll('.dn-link');
  const mobItems=document.querySelectorAll('.mb-item');
  const sections=document.querySelectorAll('section[id]');

  function throttle(fn,ms){
    let t=0;
    return function(...a){const now=Date.now();if(now-t>=ms){t=now;fn(...a);}};
  }

  const onScroll=throttle(()=>{
    const scrollY=window.scrollY;
    const total=document.documentElement.scrollHeight-window.innerHeight;
    if(progressBar) progressBar.style.width=((scrollY/total)*100)+'%';
    if(nav) nav.classList.toggle('scrolled',scrollY>50);
    if(backTop) backTop.style.display=scrollY>500?'flex':'none';
    if(hint) hint.style.opacity=scrollY>120?'0':'1';

    // Active section
    let current='';
    sections.forEach(s=>{
      if(scrollY>=s.offsetTop-200) current=s.id;
    });
    navLinks.forEach(l=>{l.classList.toggle('active',l.getAttribute('data-sec')===current);});
    mobItems.forEach(l=>{l.classList.toggle('active',l.getAttribute('data-sec')===current);});
  },80);

  window.addEventListener('scroll',onScroll,{passive:true});
  onScroll();
  backTop?.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
})();

/* ── Nav entrance animation on load ── */
(function initNavEntrance(){
  const links = document.querySelectorAll('.dn-link');
  links.forEach((link, i) => {
    link.style.opacity = '0';
    link.style.transform = 'translateY(-8px)';
    link.style.transition = 'opacity .4s ease, transform .4s ease';
    setTimeout(() => {
      link.style.opacity = '1';
      link.style.transform = 'translateY(0)';
    }, 400 + i * 80);
  });

  // Logo entrance
  const logo = document.querySelector('.logo-wrap');
  if (logo) {
    logo.style.opacity = '0';
    logo.style.transform = 'translateX(-12px)';
    logo.style.transition = 'opacity .5s ease, transform .5s ease';
    setTimeout(() => {
      logo.style.opacity = '1';
      logo.style.transform = 'translateX(0)';
    }, 200);
  }

  // Hire Me entrance
  const hire = document.querySelector('.nav-hire');
  if (hire) {
    hire.style.opacity = '0';
    hire.style.transform = 'translateX(12px)';
    hire.style.transition = 'opacity .5s ease, transform .5s ease';
    setTimeout(() => {
      hire.style.opacity = '1';
      hire.style.transform = 'translateX(0)';
    }, 600);
  }
})();

/* ── Smooth anchor scroll ── */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const t=document.querySelector(a.getAttribute('href'));
    if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'});}
  });
});

/* ── Reveal on scroll ── */
(function initReveal(){
  const io=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        const delay=parseInt(e.target.getAttribute('data-delay')||0);
        setTimeout(()=>e.target.classList.add('vis'),delay);
      }
    });
  },{threshold:0.06,rootMargin:'0px 0px -30px 0px'});

  document.querySelectorAll('[data-reveal],.section-eyebrow,.section-title').forEach(el=>{
    io.observe(el);
    // Fire immediately if already in viewport
    const r=el.getBoundingClientRect();
    if(r.top<window.innerHeight){
      const delay=parseInt(el.getAttribute('data-delay')||0);
      setTimeout(()=>el.classList.add('vis'),delay+80);
    }
  });
})();

/* ── Hero Word Rotator ── */
(function initWordRotator(){
  const rotator = document.getElementById('hh-rotator');
  if(!rotator) return;

  const words = rotator.querySelectorAll('.hh-rot-word');
  if(!words.length) return;

  let current = 0;
  let timer = null;

  function rotateTo(next){
    const prev = current;
    if(prev === next) return;

    // Mark current as exiting
    words[prev].classList.remove('active');
    words[prev].classList.add('exit');

    // Bring next word in
    words[next].classList.add('active');
    current = next;

    // Clean up exit class after animation
    setTimeout(() => {
      words[prev].classList.remove('exit');
    }, 600);
  }

  function startRotation(){
    timer = setInterval(() => {
      const next = (current + 1) % words.length;
      rotateTo(next);
    }, 2800);
  }

  // Pause on hover
  rotator.addEventListener('mouseenter', () => clearInterval(timer));
  rotator.addEventListener('mouseleave', startRotation);

  // Start after hero is visible
  setTimeout(startRotation, 1800);
})();

/* ── Word reveal clip-path on hero lines ── */
(function initWordReveal(){
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(!e.isIntersecting) return;
      const items = e.target.querySelectorAll('[data-reveal-word]');
      items.forEach((el, i) => {
        setTimeout(() => el.classList.add('vis'), 300 + i * 160);
      });
      io.unobserve(e.target);
    });
  }, {threshold: 0.1});

  const hero = document.querySelector('.h-headline');
  if(hero) {
    io.observe(hero);
    // Fire immediately if visible
    const r = hero.getBoundingClientRect();
    if(r.top < window.innerHeight) {
      hero.querySelectorAll('[data-reveal-word]').forEach((el, i) => {
        setTimeout(() => el.classList.add('vis'), 600 + i * 160);
      });
    }
  }
})();

/* ── Count-up animation ── */
(function initCountUp(){
  const io=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(!e.isIntersecting) return;
      const el=e.target;
      const target=parseInt(el.getAttribute('data-to'));
      const dur=1800;
      const step=target/(dur/16);
      let n=0;
      const run=()=>{
        n=Math.min(n+step,target);
        el.textContent=Math.floor(n)+(target>=10?'+':'');
        if(n<target) requestAnimationFrame(run);
        else el.textContent=target+(target>=10?'+':'');
      };
      run();
      io.unobserve(el);
    });
  },{threshold:0.5});
  document.querySelectorAll('.count-anim').forEach(el=>io.observe(el));
})();

/* ── SVG Progress Ring ── */
(function initRings(){
  document.querySelectorAll('.ring-fill[data-pct]').forEach(circle=>{
    const pct=parseInt(circle.getAttribute('data-pct'));
    const r=parseFloat(circle.getAttribute('r')||50);
    const circ=2*Math.PI*r;
    circle.style.strokeDasharray=circ;
    circle.style.strokeDashoffset=circ;
    const io=new IntersectionObserver(entries=>{
      if(entries[0].isIntersecting){
        circle.style.strokeDashoffset=circ-(pct/100)*circ;
        io.disconnect();
      }
    },{threshold:0.5});
    io.observe(circle);
  });
})();

/* skill bars removed — icon-only grid */

/* ── 3D Tilt on tilt-card and sb-row ── */
(function initTilt(){
  if(window.innerWidth<=768) return;
  document.querySelectorAll('.tilt-card,.sb-row,.ap-card').forEach(el=>{
    el.style.willChange='transform';
    el.addEventListener('mousemove',function(e){
      const rect=this.getBoundingClientRect();
      const rx=((e.clientY-rect.top)/rect.height-.5)*-16;
      const ry=((e.clientX-rect.left)/rect.width-.5)*16;
      this.style.transition='transform .1s ease';
      this.style.transform=`perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02,1.02,1.02)`;
    });
    el.addEventListener('mouseleave',function(){
      this.style.transition='transform .5s cubic-bezier(.23,1,.32,1)';
      this.style.transform='perspective(700px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    });
  });
})();

/* ── Magnetic on .mag ── */
(function initMagnetic(){
  if(window.innerWidth<=768) return;
  document.querySelectorAll('.mag').forEach(el=>{
    el.addEventListener('mousemove',function(e){
      const rect=this.getBoundingClientRect();
      const x=(e.clientX-rect.left-rect.width/2)*.22;
      const y=(e.clientY-rect.top-rect.height/2)*.22;
      this.style.transform=`translate(${x}px,${y}px)`;
    });
    el.addEventListener('mouseleave',function(){
      this.style.transform='translate(0,0)';
    });
  });
})();

/* ── Rotating Cube pause on hover ── */
(function initCube(){
  const cube=document.getElementById('skills-cube');
  if(!cube) return;
  cube.addEventListener('mouseenter',()=>cube.style.animationPlayState='paused');
  cube.addEventListener('mouseleave',()=>cube.style.animationPlayState='running');
})();

/* ── Code panel 3D follow-mouse ── */
(function initCodePanel(){
  if(window.innerWidth<=768) return;
  const panel=document.getElementById('code-panel');
  if(!panel) return;
  const hero=document.querySelector('.h-right');
  if(!hero) return;
  hero.addEventListener('mousemove',e=>{
    const rect=hero.getBoundingClientRect();
    const rx=((e.clientY-rect.top)/rect.height-.5)*-10;
    const ry=((e.clientX-rect.left)/rect.width-.5)*14;
    panel.style.animation='none';
    panel.style.transition='transform .15s ease';
    panel.style.transform=`perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-8px)`;
  });
  hero.addEventListener('mouseleave',()=>{
    panel.style.animation='panelFloat 7s ease-in-out infinite';
    panel.style.transform='';
  });
})();

/* ── Project Filter ── */
(function initFilter(){
  const btns=document.querySelectorAll('.pf-btn');
  const cards=document.querySelectorAll('.proj-card');
  btns.forEach(btn=>{
    btn.addEventListener('click',()=>{
      btns.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const f=btn.getAttribute('data-pf');
      cards.forEach(c=>{
        const cats=c.getAttribute('data-cat')||'';
        const show=f==='all'||cats.includes(f);
        c.classList.toggle('hide',!show);
        if(show){
          c.style.animation='none';
          requestAnimationFrame(()=>{
            c.style.animation='';
            c.style.opacity='1';
            c.style.transform='';
          });
        }
      });
    });
  });
})();

/* ── Nepal Time Clock ── */
(function initClock(){
  const el=document.getElementById('local-time');
  if(!el) return;
  function tick(){
    el.textContent=new Intl.DateTimeFormat('en-US',{
      timeZone:'Asia/Kathmandu',hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:true
    }).format(new Date());
  }
  tick();
  setInterval(tick,1000);
})();

/* ── Resume download ── */
(function initResume(){
  const btn=document.getElementById('dl-resume');
  if(!btn) return;
  btn.addEventListener('click',e=>{
    if(btn.getAttribute('href')==='#'){
      e.preventDefault();
      showToast('Resume coming soon!','fail');
    } else {
      showToast('Downloading CV…','ok');
    }
  });
})();

/* ── Contact Form ── */
(function initForm(){
  const form=document.getElementById('contact-form');
  const nameIn=document.getElementById('name-in');
  const emailIn=document.getElementById('email-in');
  const msgIn=document.getElementById('msg-in');
  const counter=document.querySelector('.char-count');
  const feedback=document.getElementById('form-feedback');
  const submitBtn=document.getElementById('form-submit');
  const btnLabel=document.getElementById('btn-label');
  if(!form) return;

  // ⚠️  Replace with your own Web3Forms access key before deploying.
  //    Get one free at https://web3forms.com
  const KEY = '64f1d5c8-b451-45de-b0e0-7c55d8dbadb9';
  let lastSubmit=0;

  function sanitize(s){const d=document.createElement('div');d.textContent=s;return d.innerHTML;}
  function validEmail(s){return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s);}
  function validName(s){return /^[a-zA-Z\s''-]{2,50}$/.test(s.trim());}
  function validMsg(s){
    if(s.length<10||s.length>500) return false;
    return !/<script|javascript:|on\w+=|<iframe|eval\(/i.test(s);
  }

  function setValid(input,ok){
    input.classList.toggle('valid',ok);
    input.classList.toggle('invalid',!ok&&input.value.trim()!=='');
  }

  nameIn?.addEventListener('input',()=>setValid(nameIn,validName(nameIn.value)));
  emailIn?.addEventListener('input',()=>setValid(emailIn,validEmail(emailIn.value)));
  msgIn?.addEventListener('input',()=>{
    const l=msgIn.value.length;
    if(counter) counter.textContent=`${l} / 500`;
    setValid(msgIn,validMsg(msgIn.value));
  });

  form.addEventListener('submit',async e=>{
    e.preventDefault();
    if(Date.now()-lastSubmit<5000){showToast('Please wait before resending','fail');return;}

    const n=nameIn.value.trim(),em=emailIn.value.trim(),ms=msgIn.value.trim();
    if(!validName(n)){showToast('Enter a valid name','fail');nameIn.focus();return;}
    if(!validEmail(em)){showToast('Enter a valid email','fail');emailIn.focus();return;}
    if(!validMsg(ms)){showToast('Message must be 10–500 chars','fail');msgIn.focus();return;}
    if(document.getElementById('hp')?.value){return;}

    lastSubmit=Date.now();
    submitBtn.disabled=true;
    if(btnLabel) btnLabel.textContent='Sending…';

    try{
      const res=await fetch('https://api.web3forms.com/submit',{
        method:'POST',
        headers:{'Content-Type':'application/json','Accept':'application/json'},
        body:JSON.stringify({
          access_key:KEY,
          name:sanitize(n),
          email:sanitize(em),
          message:sanitize(ms),
          botcheck:false
        })
      });
      const data=await res.json();
      if(data.success){
        feedback.textContent='✓ Message sent! I\'ll get back to you soon.';
        feedback.className='ok';
        showToast('Message sent!','ok');
        form.reset();
        nameIn.classList.remove('valid','invalid');
        emailIn.classList.remove('valid','invalid');
        if(counter) counter.textContent='0 / 500';
      } else throw new Error(data.message);
    } catch(err){
      feedback.textContent='✗ Failed to send. Please try again.';
      feedback.className='fail';
      showToast('Send failed — try again','fail');
    } finally{
      submitBtn.disabled=false;
      if(btnLabel) btnLabel.textContent='Send Message';
      setTimeout(()=>{ feedback.className = ''; feedback.textContent = ''; },6000);
    }
  });
})();

/* ── Konami Code Easter Egg ── */
(function initKonami(){
  const seq=['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let buf=[];
  // Inject keyframe style once
  const s=document.createElement('style');
  s.textContent='@keyframes rainbowBody{0%{filter:hue-rotate(0deg)}100%{filter:hue-rotate(360deg)}}';
  document.head.appendChild(s);

  document.addEventListener('keydown',e=>{
    buf.push(e.key);
    buf=buf.slice(-seq.length);
    if(buf.join('')===seq.join('')){
      showToast('🎮 Konami Code! You found the egg!','ok');
      document.body.style.animation='rainbowBody 2s linear 3';
      setTimeout(()=>{ document.body.style.animation=''; }, 6100);
    }
  });
})();

/* ── Keyboard shortcuts (Alt + key for nav) ── */
document.addEventListener('keydown',e=>{
  // Skip if modifier combos that DevTools blocker already handles
  if(e.ctrlKey || e.metaKey || e.shiftKey || e.key === 'F12') return;
  if(!e.altKey) return;
  const map={h:'#home',a:'#about',j:'#journey',s:'#skills',p:'#projects',c:'#contact'};
  if(map[e.key]){
    e.preventDefault();
    document.querySelector(map[e.key])?.scrollIntoView({behavior:'smooth'});
  }
  if(e.key==='t'){
    e.preventDefault();
    document.getElementById('theme-toggle')?.click();
  }
});

/* ── Visibility handler (tab title) ── */
(function(){
  const orig=document.title;
  document.addEventListener('visibilitychange',()=>{
    document.title=document.hidden?'👋 Come back soon!':orig;
  });
})();

/* ── Portfolio Signature ── */
(function(){
  const isLight = document.body.classList.contains('light-theme');
  const accent = isLight ? '#f97316' : '#00f5d4';
  console.log('%c DS Portfolio','color:' + accent + ';font-size:22px;font-weight:900;letter-spacing:.05em;');
  console.log('%c Built with Django mindset — clean, scalable, precise.','color:#7c3aed;font-size:13px;');
  console.log('%c 👋 Hi there, fellow developer!','color:#6b7a99;font-size:11px;');
})();