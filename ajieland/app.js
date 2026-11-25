// ===== AjieLand core =====
const $ = (s,r=document)=>r.querySelector(s);
const app = $('#app'), fx=$('#fx');
const el = (tag,cls,html)=>{ const e=document.createElement(tag); if(cls) e.className=cls; if(html!=null) e.innerHTML=html; return e; };
const sleep = ms=>new Promise(r=>setTimeout(r,ms));
const rnd = a=>a[Math.floor(Math.random()*a.length)];
const shuffle = a=>{ a=a.slice(); for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; };

// ---------- original SVG art ----------
const SVG = {
  cup:`<svg viewBox="0 0 100 100"><path d="M18 30h52v34a20 20 0 0 1-20 20h-12a20 20 0 0 1-20-20z" fill="#ff7aa8" stroke="#333" stroke-width="4"/><path d="M70 40h6a11 11 0 0 1 0 22h-6" fill="none" stroke="#333" stroke-width="7"/><path d="M70 40h6a11 11 0 0 1 0 22h-6" fill="none" stroke="#ff7aa8" stroke-width="3"/><ellipse cx="44" cy="30" rx="26" ry="6" fill="#ffd1e1" stroke="#333" stroke-width="4"/><circle cx="36" cy="55" r="5" fill="#fff"/><circle cx="52" cy="62" r="4" fill="#fff"/></svg>`,
  plate:`<svg viewBox="0 0 100 100"><ellipse cx="50" cy="58" rx="46" ry="26" fill="#ffffff" stroke="#333" stroke-width="4"/><ellipse cx="50" cy="56" rx="30" ry="15" fill="#e8f6ff" stroke="#9ccbe8" stroke-width="3"/><path d="M14 52q8-8 18-10" stroke="#6ec6ff" stroke-width="3" fill="none"/></svg>`,
  bowl:`<svg viewBox="0 0 100 100"><path d="M8 44h84a42 38 0 0 1-84 0z" fill="#53b6ff" stroke="#333" stroke-width="4"/><ellipse cx="50" cy="44" rx="42" ry="9" fill="#bfe6ff" stroke="#333" stroke-width="4"/><path d="M36 82h28l4 8H32z" fill="#2a8be0" stroke="#333" stroke-width="4"/><circle cx="30" cy="62" r="5" fill="#fff" opacity=".7"/></svg>`
};
function picHTML(w){ const p=WORDS[w]?WORDS[w].pic:w; return p.startsWith('svg:')?SVG[p.slice(4)]:p; }
function wordLabel(w){ return `${w}<span class="zh">${WORDS[w]?WORDS[w].zh:''}</span>`; }

// Original mascot "Mumu": a fuzzy round monster (not from any app)
function monsterSVG(o={}){
  const c=o.color||'#ff5fa2', c2=o.color2||'#ff8cc0';
  let fur=''; const R=70,cx=100,cy=118; for(let i=0;i<48;i++){ const a=i/48*Math.PI*2, r=i%2?R:R+9; fur+=(i?'L':'M')+(cx+Math.cos(a)*r).toFixed(1)+' '+(cy+Math.sin(a)*r*0.95).toFixed(1); }
  return `<svg class="monster ${o.cls||''}" viewBox="0 0 200 210" xmlns="http://www.w3.org/2000/svg">
  <path class="arm l" d="M40 120 q-28 -10 -30 -36" stroke="${c}" stroke-width="16" stroke-linecap="round" fill="none"/>
  <path class="arm r" d="M160 120 q28 -10 30 -36" stroke="${c}" stroke-width="16" stroke-linecap="round" fill="none"/>
  <path d="${fur}Z" fill="${c}"/>
  <ellipse cx="100" cy="128" rx="48" ry="44" fill="${c2}" opacity=".55"/>
  <ellipse cx="78" cy="96" rx="17" ry="19" fill="#fff"/><ellipse cx="122" cy="96" rx="17" ry="19" fill="#fff"/>
  <circle cx="81" cy="99" r="8" fill="#222"/><circle cx="119" cy="99" r="8" fill="#222"/><circle cx="84" cy="95" r="3" fill="#fff"/><circle cx="122" cy="95" r="3" fill="#fff"/>
  <ellipse cx="62" cy="122" rx="8" ry="5" fill="#ff2d6f" opacity=".5"/><ellipse cx="138" cy="122" rx="8" ry="5" fill="#ff2d6f" opacity=".5"/>
  <g class="mouth"><path d="M74 124 q26 34 52 0 z" fill="#7a1033"/><path d="M84 124h8v8h-8zM108 124h8v8h-8z" fill="#fff"/><ellipse cx="100" cy="138" rx="10" ry="5" fill="#ff7a9a"/></g>
  <ellipse cx="80" cy="196" rx="16" ry="9" fill="${c}"/><ellipse cx="120" cy="196" rx="16" ry="9" fill="${c}"/>
  ${o.hat!==false?`<g transform="translate(100 20) rotate(${o.hatTilt||-8})"><path d="M-22 34 L0 -26 L22 34 Z" fill="#7cdcff" stroke="#333" stroke-width="3"/><path d="M-15 14 L15 14 M-9 -4 L9 -4" stroke="#ffd400" stroke-width="6"/><circle cx="0" cy="-28" r="8" fill="#ffd400" stroke="#333" stroke-width="3"/></g>`:''}
</svg>`;
}

// ---------- state (survives lock / reload) ----------
const KEY='ajieland_v1';
let S; try{ S=JSON.parse(localStorage.getItem(KEY))||{}; }catch(e){ S={}; }
S.stars=S.stars||0; S.zh=!!S.zh;
function save(){ S.t=Date.now(); try{ localStorage.setItem(KEY,JSON.stringify(S)); }catch(e){} }
document.addEventListener('visibilitychange',()=>{ if(document.hidden){ save(); Voice.stop(); } });
window.addEventListener('pagehide',save);
// block pinch / double-tap zoom & context menus
['gesturestart','gesturechange','dblclick','contextmenu'].forEach(ev=>document.addEventListener(ev,e=>e.preventDefault(),{passive:false}));
let lastTouch=0; document.addEventListener('touchend',e=>{ const n=Date.now(); if(n-lastTouch<300) e.preventDefault(); lastTouch=n; },{passive:false});
document.addEventListener('touchmove',e=>{ if(e.touches.length>1) e.preventDefault(); },{passive:false});

// ---------- top bar ----------
const btnHome=$('#btnHome'), btnHint=$('#btnHint'), btnZh=$('#btnZh'), btnMusic=$('#btnMusic');
function updStars(){ $('#starN').textContent=S.stars; }
updStars();
document.body.classList.toggle('zhOn',S.zh); btnZh.classList.toggle('on',S.zh);
btnZh.onclick=()=>{ S.zh=!S.zh; document.body.classList.toggle('zhOn',S.zh); btnZh.classList.toggle('on',S.zh); save(); };
btnMusic.onclick=()=>{ const on=!Snd.musicEnabled; Snd.setMusic(on); btnMusic.style.opacity=on?1:.4; if(on) Snd.startBed(); };
let hintWord=null, hintStep=0;
function setHint(w){ hintWord=w; hintStep=0; btnHint.classList.toggle('hidden',!w); }
btnHint.onclick=async()=>{ if(!hintWord) return; const w=WORDS[hintWord];
  if(hintStep===0 && w){ hintStep=1; await Voice.say(w.hint+'...', {rate:0.6}); }
  else { hintStep=0; await Voice.say(w?`${w.hint}... ${hintWord}!`:hintWord,{rate:0.7}); }
  document.querySelectorAll(`[data-w="${hintWord}"]`).forEach(e=>e.classList.add('glow'));
};
let leaveGame=null;
btnHome.onclick=()=>{ Snd.sfx.tap(); if(leaveGame) leaveGame(); goGrid(); };

// ---------- fx ----------
function confetti(n=40,x=50,y=40){ const cols=['#FFD400','#F47773','#2ADEFA','#82F72D','#5800F5','#ff5fa2'];
  for(let i=0;i<n;i++){ const c=el('div','confetti'); c.style.background=rnd(cols); c.style.left=x+'%'; c.style.top=y+'%'; fx.appendChild(c);
    const dx=(Math.random()-.5)*90, dy=-20-Math.random()*40;
    c.animate([{transform:'translate(0,0) rotate(0)'},{transform:`translate(${dx}vw,${dy}vh) rotate(${Math.random()*720}deg)`,offset:.4},{transform:`translate(${dx*1.3}vw,${dy+120}vh) rotate(${Math.random()*1440}deg)`}],{duration:1800+Math.random()*800,easing:'cubic-bezier(.2,.6,.4,1)'}).onfinish=()=>c.remove(); } }
function addStar(n=1){ S.stars+=n; save(); updStars(); const s=el('div','starFly','⭐'); s.style.left='45%'; s.style.top='45%'; fx.appendChild(s);
  const r=$('#stars').getBoundingClientRect(); s.animate([{transform:'scale(1)'},{transform:'scale(2)',offset:.3},{left:r.left+'px',top:r.top+'px',transform:'scale(.6)'}],{duration:900,easing:'ease-in'}).onfinish=()=>s.remove(); }
async function bigWord(w,sentence){ const b=el('div','bigWord',`<div class="pic">${picHTML(w)}</div><div class="w">${wordLabel(w)}</div>`); app.appendChild(b); Snd.sfx.ding();
  await Voice.say(w+'!'); if(sentence){ await sleep(150); await Voice.say(sentence); } await sleep(350); b.remove(); }
const PRAISE=['Great job!','Yay!','Wonderful!','You did it!','Super!','Good job!','Hooray!'];
function praise(){ return Voice.say(rnd(PRAISE)); }

// ---------- draggable / tappable item ----------
// opts.onTap(), opts.onDrop(clientX,clientY) -> true if accepted. Tap counts if moved < 12px.
function makeItem(w,x,y,opts={}){
  const it=el('div','item'); it.dataset.w=w; it.innerHTML=`<div class="pic">${picHTML(w)}</div>${opts.noLabel?'':`<div class="wl">${wordLabel(w)}</div>`}`;
  it.style.left=x; it.style.top=y; it.style.transform='translate(-50%,-50%)';
  let sx,sy,ox,oy,moved=false,id=null;
  it.addEventListener('pointerdown',e=>{ if(it.dataset.lock) return; id=e.pointerId; it.setPointerCapture(id); sx=e.clientX; sy=e.clientY; const r=it.getBoundingClientRect(); ox=r.left+r.width/2; oy=r.top+r.height/2; moved=false; it.classList.add('drag'); Snd.sfx.tap(); });
  it.addEventListener('pointermove',e=>{ if(e.pointerId!==id) return; const dx=e.clientX-sx, dy=e.clientY-sy; if(Math.hypot(dx,dy)>12) moved=true; if(moved){ it.style.left=(ox+dx)+'px'; it.style.top=(oy+dy)+'px'; } });
  const end=e=>{ if(e.pointerId!==id) return; id=null; it.classList.remove('drag');
    if(!moved){ it.style.left=x; it.style.top=y; opts.onTap&&opts.onTap(it); return; }
    const ok=opts.onDrop&&opts.onDrop(e.clientX,e.clientY,it); if(!ok){ it.animate([{left:it.style.left,top:it.style.top},{left:x,top:y}],{duration:250,easing:'ease-out'}); it.style.left=x; it.style.top=y; } };
  it.addEventListener('pointerup',end); it.addEventListener('pointercancel',end);
  return it;
}
function inRect(x,y,elm,pad=40){ const r=elm.getBoundingClientRect(); return x>r.left-pad&&x<r.right+pad&&y>r.top-pad&&y<r.bottom+pad; }
function flyTo(it,target,dur=450){ const a=it.getBoundingClientRect(), b=target.getBoundingClientRect();
  return new Promise(res=>{ const tx=b.left+b.width/2, ty=b.top+b.height/2; it.dataset.lock=1;
    it.animate([{left:(a.left+a.width/2)+'px',top:(a.top+a.height/2)+'px'},{left:tx+'px',top:ty+'px'}],{duration:dur,easing:'cubic-bezier(.3,1.4,.5,1)'}).onfinish=res; it.style.left=tx+'px'; it.style.top=ty+'px'; }); }

// ---------- reward screen ----------
function reward(gameId,onReplay){ setHint(null); Snd.sfx.yay(); confetti(80);
  const r=el('div','reward',`<div class="card"><div style="width:30vmin;margin:0 auto" class="wave bob">${monsterSVG({cls:'wave'})}</div><h1>Great job!</h1><div class="bigStars">⭐⭐⭐</div></div><div class="btns"><button class="home">🏠</button><button class="replay">🔄</button></div>`);
  app.appendChild(r); addStar(3); Voice.say('Great job! You are a star!');
  r.querySelector('.home').onclick=()=>{ Snd.sfx.tap(); goGrid(); };
  r.querySelector('.replay').onclick=()=>{ Snd.sfx.tap(); r.remove(); onReplay(); };
  delete S.gs; save();
}

// ---------- screens ----------
let RUNID=0; const alive=id=>id===RUNID;
function clear(){ RUNID++; Voice.stop(); app.innerHTML=''; fx.innerHTML=''; setHint(null); leaveGame=null; }
function showBar(home,stars){ btnHome.classList.toggle('hidden',!home); $('#stars').classList.toggle('hidden',!stars); btnMusic.classList.toggle('hidden',!stars); }

const SWARM = [['👨','#ff9f43'],['👩','#ff6b81'],['👦','#54a0ff'],['👧','#ff9ff3'],['👴','#1dd1a1'],['👵','#feca57'],['svg:cup','#48dbfb'],['svg:plate','#5f27cd'],['🥄','#ff9f43'],['svg:bowl','#10ac84'],['✏️','#ee5253'],['📘','#ffd32a'],['🎒','#0abde3'],['🪙','#c56cf0'],['🥛','#2ed573'],['🍎','#70a1ff'],['🎈','#ff4757'],['⭐','#3742fa'],['🎨','#ffa502'],['🃏','#1e90ff']];

function launch(){
  clear(); showBar(false,false);
  const L=el('div','screen'); L.id='launch';
  L.innerHTML=`<div class="wordmark">AjieLand<small>PLAY • LEARN • SAY</small></div><div class="loadwrap"><div class="loadbar"></div></div><div class="loadtxt">Loading...</div>`;
  app.appendChild(L);
  const bar=L.querySelector('.loadbar'); let p=0;
  const iv=setInterval(()=>{ p=Math.min(100,p+4+Math.random()*9); bar.style.width=p+'%'; if(p>=100){ clearInterval(iv);
      L.querySelector('.loadtxt').remove(); L.querySelector('.loadwrap').remove();
      const b=el('button','', '▶ Tap!'); b.id='tapStart'; L.appendChild(b);
      b.addEventListener('pointerup',()=>intro(L),{once:true}); } },90);
}
async function intro(L){
  Snd.init(); Voice.prime(); $('#tapStart').remove();
  const dur=Snd.jingle()||5.4; const logo=L.querySelector('.wordmark');
  logo.animate([{transform:'scale(1)'},{transform:'scale(1.15)'},{transform:'scale(1)'}],{duration:600,iterations:8});
  const W=innerWidth,H=innerHeight, R=Math.min(W,H)*0.36;
  SWARM.forEach((s,i)=>{ const t=el('div','swarm',`${s[0].startsWith('svg:')?SVG[s[0].slice(4)]:s[0]}`); t.style.background=s[1]; const sv=t.querySelector('svg'); if(sv){sv.style.width='70%';sv.style.height='70%';}
    L.appendChild(t);
    const a0=i/SWARM.length*Math.PI*2, edge=Math.max(W,H)*0.9, rx=R*(W>H?1.6:1), ry=R*(W>H?1:1.4);
    const fr=[]; fr.push({transform:`translate(${Math.cos(a0)*edge}px,${Math.sin(a0)*edge}px) scale(.6) rotate(-90deg)`,offset:0});
    for(let k=0;k<=8;k++){ const a=a0+k*0.35; fr.push({transform:`translate(${Math.cos(a)*rx}px,${Math.sin(a)*ry}px) scale(1) rotate(${k%2?-6:6}deg)`,offset:0.18+k*0.07}); }
    const af=a0+8*0.35; fr.push({transform:`translate(${Math.cos(af)*edge*1.2}px,${Math.sin(af)*edge*1.2}px) scale(.5) rotate(90deg)`,offset:1});
    t.animate(fr,{duration:dur*1000*0.82,delay:i*30,easing:'ease-in-out',fill:'forwards'});
  });
  await sleep(dur*1000*0.72);
  const m=el('div','mascotPop',monsterSVG({cls:'wave'})); L.appendChild(m);
  m.animate([{transform:'scale(0) translateY(40%)'},{transform:'scale(1.15)'},{transform:'scale(1)'}],{duration:600,fill:'forwards',easing:'ease-out'});
  await sleep(700); Voice.say("Hi! I'm Mumu! Let's play!");
  await sleep(1800);
  Snd.startBed();
  if(S.screen==='game' && S.game && GAMES[S.game] && Date.now()-(S.t||0)<4*3600e3) startGame(S.game,true);
  else hub();
}
function hub(){
  clear(); showBar(false,true); S.screen='hub'; save();
  const H=el('div','screen'); H.id='hub';
  let h=''; for(let i=0;i<5;i++) h+=`<div class="cloud" style="left:${i*22+3}%;top:${8+(i%2)*10}%;width:${14+i%3*4}vmin;height:${6+i%2*2}vmin"></div>`;
  for(let i=0;i<8;i++) h+=`<div class="city" style="left:${i*13}%;height:${18+(i*37)%20}%"></div>`;
  h+=`<div class="grass"></div>
  <svg class="school" viewBox="0 0 300 200"><path d="M150 8 L270 70 H30Z" fill="#e55a5a" stroke="#b33" stroke-width="3"/><rect x="40" y="68" width="220" height="120" fill="#F47773"/><rect x="40" y="68" width="220" height="10" fill="#ffd1c9"/><circle cx="150" cy="48" r="13" fill="#fff" stroke="#b33" stroke-width="3"/><path d="M150 40v8h6" stroke="#333" stroke-width="2" fill="none"/>
  <rect x="85" y="86" width="130" height="26" rx="6" fill="#fff"/><text x="150" y="105" font-size="17" font-weight="900" text-anchor="middle" fill="#5800F5" font-family="Arial Rounded MT Bold,Arial">AJIE SCHOOL</text>
  ${[55,95,185,225].map(x=>`<rect x="${x}" y="122" width="22" height="26" fill="#bdf1ff" stroke="#fff" stroke-width="3"/>`).join('')}
  <path d="M128 188v-42a22 22 0 0 1 44 0v42z" fill="#FFD400" stroke="#d9a800" stroke-width="3"/><rect x="110" y="186" width="80" height="10" fill="#ddd"/></svg>
  <div class="hubSign"><div class="wordmark">AjieLand</div></div>
  <div class="hubMascot bob">${monsterSVG({cls:'wave'})}</div>
  <button class="playBtn" aria-label="play"></button>`;
  H.innerHTML=h; app.appendChild(H);
  H.querySelector('.playBtn').onclick=()=>{ Snd.sfx.whoosh(); goGrid(); };
  H.querySelector('.hubMascot').onclick=()=>{ Snd.sfx.boing(); Voice.say("Let's play!"); };
}
function goGrid(){
  clear(); showBar(true,true); S.screen='grid'; delete S.gs; save();
  btnHome.onclick=()=>{ Snd.sfx.tap(); if(leaveGame) leaveGame(); if(S.screen==='grid') hub(); else goGrid(); };
  const G=el('div','screen'); G.id='grid';
  let st='<svg class="stars" width="100%" height="100%">'; for(let i=0;i<70;i++) st+=`<circle cx="${Math.random()*100}%" cy="${Math.random()*100}%" r="${Math.random()*2+0.6}" fill="#fff" opacity="${Math.random()*0.7+0.3}"/>`; st+='</svg>';
  G.innerHTML=st+`<div class="gridTitle"><b>Let's Play!</b></div><div class="tiles"></div>`;
  const T=G.querySelector('.tiles');
  Object.entries(GAMES).forEach(([id,g],i)=>{ const t=el('div','tile',`<div class="art" style="background:${g.bg}">${g.art}</div><div class="lbl">${g.name}</div><div class="min">~${g.min} min</div>`); t.style.animationDelay=(i*60)+'ms';
    t.onclick=()=>{ Snd.sfx.ding(); startGame(id); }; T.appendChild(t); });
  app.appendChild(G); Voice.say("Let's play!");
}
function startGame(id,resume){
  clear(); showBar(true,true); S.screen='game'; S.game=id; if(!resume) delete S.gs; save();
  btnHome.onclick=()=>{ Snd.sfx.tap(); if(leaveGame) leaveGame(); goGrid(); };
  const g=GAMES[id]; const root=el('div','screen'); app.appendChild(root);
  g.start(root, resume&&S.gs?S.gs:null);
}
// game state helper
function gsSave(o){ S.gs=Object.assign(S.gs||{},o); save(); }
const GAMES={};
window.addEventListener('load',()=>launch());
