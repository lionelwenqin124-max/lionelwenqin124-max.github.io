(()=>{
const C=window.COURSE, L=C.lessons, $=(s,r=document)=>r.querySelector(s), main=$('#main');
const K='lfr_';
const store={get(k,d){try{const v=localStorage.getItem(K+k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem(K+k,JSON.stringify(v))}catch(e){}}};
let P=store.get('progress',{}); // {lessonId:{best:0..n, done:bool, seen:{cardIdx:1}}}
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const lp=id=>P[id]||(P[id]={best:0,done:false,seen:{}});
const save=()=>store.set('progress',P);
const pct=l=>{const p=lp(l.id);const ex=p.best/l.ex.length, v=Object.keys(p.seen).length/l.vocab.length;return Math.round((ex*0.7+Math.min(v,1)*0.3)*100)};
/* --- XP & streak (retention loop) --- */
function today(){const d=new Date();return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()}
function addXP(n){store.set('xp',store.get('xp',0)+n);const s=store.get('streak',{n:0,last:''}),t=today();if(s.last!==t){const y=new Date(Date.now()-864e5);const ys=y.getFullYear()+'-'+(y.getMonth()+1)+'-'+y.getDate();s.n=s.last===ys?s.n+1:1;s.last=t;store.set('streak',s)}hud()}
function hud(){$('#xp b').textContent=store.get('xp',0);const s=store.get('streak',{n:0,last:''});$('#streak b').textContent=s.n}
/* --- theme --- */
const tb=$('#themeBtn');const setIcon=()=>{const d=document.documentElement.dataset.theme==='dark';tb.textContent=d?'☀️':'🌙';tb.setAttribute('aria-pressed',d)};setIcon();
tb.onclick=()=>{const d=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=d;localStorage.setItem(K+'theme',d);setIcon()};
/* --- speech --- */
let voice=null;function pickVoice(){const vs=speechSynthesis.getVoices();voice=vs.find(v=>/fr[-_]FR/i.test(v.lang))||vs.find(v=>/^fr/i.test(v.lang))||null}
if('speechSynthesis' in window){pickVoice();speechSynthesis.onvoiceschanged=pickVoice}
function speak(text,btn){if(!('speechSynthesis' in window)){toast('🔇 No speech on this device');return}
 speechSynthesis.cancel();const t=text.replace(/\(.*?\)/g,'').replace(/\s\/\s/g,', ').replace(/…/g,'');const u=new SpeechSynthesisUtterance(t);u.lang='fr-FR';u.rate=+store.get('rate',0.9);if(voice)u.voice=voice;
 if(btn){btn.classList.add('playing');u.onend=u.onerror=()=>btn.classList.remove('playing')}speechSynthesis.speak(u)}
document.addEventListener('click',e=>{const b=e.target.closest('[data-say]');if(b){e.stopPropagation();speak(b.dataset.say,b)}},true);
function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('show'),1800)}
function confetti(){const cs=['#2b59c3','#ef4135','#f59e0b','#10b981','#ec4899'];for(let i=0;i<40;i++){const d=document.createElement('i');d.className='confetti';d.style.left=Math.random()*100+'vw';d.style.background=cs[i%5];d.style.animationDelay=Math.random()*.5+'s';document.body.appendChild(d);setTimeout(()=>d.remove(),2400)}}
/* --- views --- */
function home(){
 const total=L.reduce((a,l)=>a+pct(l),0)/L.length|0, words=L.reduce((a,l)=>a+l.vocab.length,0), exs=L.reduce((a,l)=>a+l.ex.length,0);
 const next=L.find(l=>!lp(l.id).done)||L[0];
 return `<section class="hero"><div>
  <span class="eyebrow">Français · Niveau A1 <span class="flag" aria-hidden="true"><i></i><i></i><i></i></span></span>
  <h1>Bonjour, Lionel&nbsp;! <br>Apprends le français, <span style="color:var(--primary)">une tasse à la fois.</span></h1>
  <p class="lead">Short lessons, flip-card vocabulary with real French pronunciation, and bite-size exercises. 用繁體中文＋英文解說，從自我介紹開始。</p>
  <div class="ctas"><a class="btn btn-primary" href="#/lesson/${next.id}">${total?'▶ Continuer':'▶ Commencer'} · Leçon ${next.id}</a><a class="btn btn-ghost" href="#/part/1">📘 Voir Part 1</a></div>
  <div class="stats"><div class="stat"><b>${total}%</b><span>Part 1</span></div><div class="stat"><b>${words}</b><span>mots 單字</span></div><div class="stat"><b>${exs}</b><span>exercices</span></div></div>
 </div><figure class="hero-art"><img src="hero.webp" alt="Two students meet at a Paris café terrace: Lionel waves and introduces himself, a student at a table replies." width="1000" height="750">
 <figcaption class="bubble b-left"><span lang="fr">Bonjour ! Je m'appelle Lionel.</span><button class="say say-inline" data-say="Bonjour ! Je m'appelle Lionel." aria-label="Listen">🔊</button></figcaption>
 <figcaption class="bubble b-right"><span lang="fr">Enchantée !</span><button class="say say-inline" data-say="Enchantée !" aria-label="Listen">🔊</button></figcaption></figure></section>
<a class="card mt-promo" href="#/midterm"><div class="emo">🎯</div><div style="flex:1"><span class="badge">期中考 · Midterm</span><h3>Midterm — the exact exam questions</h3><p>Mock paper, flashcards, boss battle, speed round & matching. 模擬考＋遊戲背題。</p><div class="bar"><i style="width:${window.MIDTERM?window.MIDTERM.mastery():0}%"></i></div></div><span class="btn btn-primary">▶ Go</span></a>
 <div class="section-title"><div><h2>Ton parcours</h2><p>Your learning path · 學習路線</p></div></div>
 <div class="grid g4">${C.parts.map(p=>p.status==='open'?`<a class="card" href="#/part/${p.id}" style="--c:var(--primary)"><div class="emo">${p.emoji}</div><span class="badge ${total==100?'done':''}">${total==100?'Terminé ✓':'Ouvert'}</span><h3>${esc(p.title)}</h3><p>${p.zh} · 6 leçons</p><div class="bar" aria-label="Progress ${total}%"><i style="width:${total}%"></i></div></a>`
   :`<div class="card locked" aria-disabled="true"><div class="emo">${p.emoji}</div><span class="badge soon">🔒 Bientôt</span><h3>Part ${p.id}</h3><p>Coming soon · 即將推出</p></div>`).join('')}</div>
 <div class="section-title"><div><h2>Comment ça marche ?</h2><p>How each lesson works</p></div></div>
 <div class="principles"><div class="card"><div class="emo">📖</div><h3>1 · Leçon</h3><p>Clear rules, tables and dialogues, with 中文 tips and pronunciation notes.</p></div>
 <div class="card"><div class="emo">🃏</div><h3>2 · Vocabulaire</h3><p>Tap to flip, 🔊 to hear a French voice. Blue = masculine, pink = feminine.</p></div>
 <div class="card"><div class="emo">🎯</div><h3>3 · Exercices</h3><p>Choose, type, build sentences and match pairs. Earn ⭐ XP and keep your 🔥 streak.</p></div></div>`}
function part(id){
 const p=C.parts.find(x=>x.id==id);if(!p||p.status!=='open')return `<div class="crumbs"><a href="#/">Accueil</a> › Part ${esc(id)}</div><div class="card done-screen"><div class="big">🔒</div><h1>Part ${esc(id)} — bientôt !</h1><p>Coming soon. 下一份講義上傳後就會開放。</p><a class="btn btn-primary" href="#/part/1">Retour à Part 1</a></div>`;
 return `<div class="crumbs"><a href="#/">Accueil</a> › Part 1</div>
 <div class="lesson-head" style="--c:var(--primary)"><span class="eyebrow">Part 1 · Unités 1–6</span><h1>Se présenter & décrire</h1><p>${p.zh} — être, adjectives (gender & number), questions, negation and -er verbs.</p></div>
 <ol class="path">${L.map(l=>{const v=pct(l);return `<li><a class="card" href="#/lesson/${l.id}" style="--c:${l.color}"><span class="node" aria-hidden="true">${l.emoji}</span><span style="flex:1;min-width:0"><span class="badge ${v>=100?'done':''}">Leçon ${l.id} ${lp(l.id).done?'· ✓':''}</span><h3>${esc(l.short)} <small style="color:var(--muted);font-weight:500">· ${l.zh}</small></h3><p>${esc(l.title)}</p><span class="bar" style="display:block"><i style="width:${v}%"></i></span></span></a></li>`}).join('')}</ol>`}
function lesson(id,tab){
 const l=L.find(x=>x.id==id);if(!l)return part(1);tab=tab||'learn';
 const t=[['learn','📖 Leçon'],['vocab','🃏 Vocabulaire'],['video','🎬 Vidéo'],['notes','✍️ Mes notes'],['ex','🎯 Exercices']];
 return `<div style="--c:${l.color}"><div class="crumbs"><a href="#/">Accueil</a> › <a href="#/part/1">Part 1</a> › Leçon ${l.id}</div>
 <header class="lesson-head"><span class="eyebrow">Leçon ${l.id} · ${esc(l.short)}</span><h1>${esc(l.title)} <button class="say say-inline" data-say="${esc(l.title)}" aria-label="Listen">🔊</button></h1><p>🎯 ${esc(l.goal)} · ${l.zh}</p></header>
 <div class="tabs" role="tablist">${t.map(([k,n])=>`<button role="tab" aria-selected="${k===tab}" data-tab="${k}">${n}</button>`).join('')}</div>
 <div id="panel" class="panel" role="tabpanel"></div>
 <div class="actions">${l.id>1?`<a class="btn btn-ghost" href="#/lesson/${l.id-1}">← Leçon ${l.id-1}</a>`:''}${l.id<L.length?`<a class="btn btn-ghost" href="#/lesson/${l.id+1}">Leçon ${l.id+1} →</a>`:''}</div></div>`}
function renderPanel(l,tab){
 const el=$('#panel');el.classList.remove('panel');void el.offsetWidth;el.classList.add('panel');
 if(tab==='learn'){el.innerHTML=l.sections.map(s=>`<section class="lesson-sec card"><h2>${s.h}</h2>${s.body}</section>`).join('')+`<div class="actions"><button class="btn btn-primary" data-go="vocab">Vocabulaire →</button></div>`;
  el.querySelectorAll('.dialog p, .tbl td:first-child + td').forEach(n=>{});}
 if(tab==='vocab')el.innerHTML=vocabGrid(l.vocab,l.id)+`<div class="actions"><button class="btn btn-primary" data-go="ex">Exercices →</button></div>`;
 if(tab==='notes')el.innerHTML=`<p class="lead" style="color:var(--muted)">Your handwritten notes from class, checked by a French teacher's eye 🧐 · 課堂筆記檢查</p>`+l.notes.map(([o,c])=>`<div class="note"><span class="orig">“${esc(o)}”</span><span>${c}</span></div>`).join('');
 if(tab==='ex')quiz(el,l);
 if(tab==='video')videoPanel(el,l);
 el.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>{location.hash=`#/lesson/${l.id}/${b.dataset.go}`});
 bindFlips(el);
}
function gender(fr){if(/\/ ?(la|l')|\(f\.\)/.test(fr))return /\(f\.\)/.test(fr)?'f':'';if(/^(le |l'.*\(m|un )/.test(fr))return 'm';if(/^(la |une )/.test(fr))return 'f';return ''}
function vocabGrid(v,lid){return `<div class="vocab-tools"><button class="btn btn-ghost" id="flipAll">🔄 Tout retourner</button><button class="btn btn-ghost" id="playAll">🔊 Écouter tout</button><label class="btn btn-ghost">🐢 <input type="range" min="0.5" max="1.2" step="0.1" value="${store.get('rate',0.9)}" id="rate" aria-label="Speech speed"></label></div>
 <div class="grid g3">${v.map((w,i)=>{const g=gender(w.fr);return `<div class="flip" tabindex="0" role="button" aria-label="${esc(w.fr)} — flip card" data-l="${lid}" data-i="${i}"><div class="flip-in">
 <div class="face front"><button class="say" data-say="${esc(w.fr)}" aria-label="Listen ${esc(w.fr)}">🔊</button><div class="big" aria-hidden="true">${w.e}</div><div class="fr ${g?'g-'+g:''}">${esc(w.fr)}</div><div class="hint">Tap to flip ↻</div></div>
 <div class="face back"><button class="say" data-say="${esc(w.ex)}" aria-label="Listen example">🔊</button><div class="zh">${esc(w.zh)}</div><div class="en">${esc(w.en)}</div><div class="exs">« ${esc(w.ex)} »</div></div></div></div>`}).join('')}</div>`}
function bindFlips(el){el.querySelectorAll('.flip').forEach(f=>{const go=()=>{f.classList.toggle('on');if(f.dataset.l){const p=lp(f.dataset.l);if(!p.seen[f.dataset.i]){p.seen[f.dataset.i]=1;save();addXP(1)}}};f.onclick=go;f.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();go()}}});
 const fa=$('#flipAll',el);if(fa)fa.onclick=()=>el.querySelectorAll('.flip').forEach(f=>f.click());
 const pa=$('#playAll',el);if(pa)pa.onclick=()=>{speechSynthesis.cancel();el.querySelectorAll('.front .say').forEach(b=>{const u=new SpeechSynthesisUtterance(b.dataset.say.replace(/\s\/\s/g,', '));u.lang='fr-FR';u.rate=+store.get('rate',0.9);if(voice)u.voice=voice;speechSynthesis.speak(u)})};
 const r=$('#rate',el);if(r)r.oninput=()=>store.set('rate',r.value)}
/* --- review video --- */
const vcache={};
async function loadVid(n){if(vcache[n])return vcache[n];const r=await fetch('videos/l'+n+'.b64?v='+(window.ASSET_V||''));if(!r.ok)throw new Error(r.status);const t=(await r.text()).trim();const bin=atob(t);const u=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);return vcache[n]=URL.createObjectURL(new Blob([u],{type:'video/mp4'}))}
function videoPanel(el,l){const V=(window.VIDEOS||{})[l.id];if(!V){el.innerHTML='<p>Bientôt.</p>';return}
 el.innerHTML=`<div class="vid-wrap"><div class="vid-box"><video id="vid" playsinline controls preload="auto" aria-label="${esc(V.title)}"></video><div class="vid-load" id="vload">⏳ Chargement de la vidéo…</div>
  <div class="vcap" id="vcap" aria-hidden="true"></div></div>
  <div class="vid-bar"><div><b>${esc(V.title)}</b><br><small>🎬 ${esc(V.scene)}</small></div><div class="vid-ctl"><button class="btn btn-ghost" id="cc" aria-pressed="true">CC</button><button class="btn btn-ghost" id="spd">1×</button></div></div>
  <h3 style="margin-top:24px">📝 Transcription · Transcript · 逐字稿</h3>
  <ol class="tline">${V.lines.map((x,i)=>`<li data-i="${i}"><button class="ts" data-t="${x[0]}" aria-label="Play from ${x[0]} seconds">▶ ${x[0].toFixed(0)}s</button><div class="tl"><span class="spk">${esc(x[2])}</span><span class="tfr" lang="fr">${esc(x[3])}</span><span class="ten" lang="en">${esc(x[4])}</span><span class="tzh" lang="zh-Hant">${esc(x[5])}</span></div><button class="say" data-say="${esc(x[3])}" aria-label="Listen slowly">🔊</button></li>`).join('')}</ol>
  <div class="note"><span>💡 ${esc(V.tip)}</span></div>
  <h3 style="margin-top:24px">❓ Compréhension</h3><div id="vq"></div></div>`;
 const v=$('#vid',el),cap=$('#vcap',el),items=[...el.querySelectorAll('.tline li')];let cc=true;
 loadVid(l.id).then(u=>{v.src=u;$('#vload',el).remove()}).catch(e=>{$('#vload',el).textContent='⚠️ Video failed to load ('+e.message+')'});
 v.ontimeupdate=()=>{const t=v.currentTime;let k=V.lines.findIndex(x=>t>=x[0]&&t<x[1]);items.forEach((li,i)=>li.classList.toggle('on',i===k));
  cap.innerHTML=cc&&k>=0?`<span lang="fr">${esc(V.lines[k][3])}</span><small>${esc(V.lines[k][4])}<br>${esc(V.lines[k][5])}</small>`:'';cap.style.display=cap.innerHTML?'block':'none'};
 el.querySelectorAll('.ts').forEach(b=>b.onclick=()=>{v.currentTime=+b.dataset.t+0.01;v.play()});
 $('#cc',el).onclick=e=>{cc=!cc;e.currentTarget.setAttribute('aria-pressed',cc);e.currentTarget.style.opacity=cc?1:.5;v.ontimeupdate()};
 $('#spd',el).onclick=e=>{v.playbackRate=v.playbackRate===1?0.75:1;e.currentTarget.textContent=(v.playbackRate===1?'1':'0.75')+'×'};
 $('#vq',el).innerHTML=V.qs.map((q,i)=>`<div class="qcard" style="margin-bottom:12px"><div class="q">${i+1}. ${esc(q.q)}</div><div class="opts">${q.o.map((o,k)=>`<button class="opt" data-q="${i}" data-k="${k}">${esc(o)}</button>`).join('')}</div></div>`).join('');
 el.querySelectorAll('#vq .opt').forEach(b=>b.onclick=()=>{const q=V.qs[b.dataset.q],box=b.parentElement;if(box.dataset.done)return;box.dataset.done=1;const ok=+b.dataset.k===q.a;
  box.querySelectorAll('.opt').forEach(x=>{if(+x.dataset.k===q.a)x.classList.add('right');else if(x===b)x.classList.add('wrong')});if(ok){addXP(5);toast('🎉 +5 XP')}});
}
/* --- answer checking --- */
const norm=s=>s.toLowerCase().replace(/[’`]/g,"'").replace(/\s+/g,' ').replace(/\s*([?!.,])\s*$/,'').trim();
const strip=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'');
function check(input,answers){const n=norm(input);for(const a of answers){if(norm(a)===n)return 2;if(strip(norm(a))===strip(n))return 1}return 0}
/* --- quiz engine --- */
function quiz(el,l){
 let i=0,score=0;const qs=l.ex;
 const shuffle=a=>a.map(x=>[Math.random(),x]).sort((a,b)=>a[0]-b[0]).map(x=>x[1]);
 function step(){
  if(i>=qs.length)return finish();
  const q=qs[i];let answered=false;
  const kinds={mcq:'Choisis la bonne réponse',fill:'Écris la réponse',order:'Remets dans l\'ordre',match:'Associe les paires'};
  el.innerHTML=`<div class="ex-wrap"><div class="ex-top"><button class="icon-btn" id="quit" aria-label="Restart">✕</button><div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="${qs.length}" aria-valuenow="${i}"><i style="width:${i/qs.length*100}%"></i></div><b>${i+1}/${qs.length}</b></div>
  <div class="qcard"><div class="kind">${kinds[q.t]}</div><div class="q">${esc(q.q)}</div><div id="body"></div>
  <div class="actions"><button class="btn btn-primary" id="checkBtn" disabled>Vérifier</button></div></div>
  <div class="feedback" id="fb" aria-live="assertive"><div class="msg"></div><button class="btn btn-primary" id="nextBtn">Continuer →</button></div></div>`;
  const body=$('#body',el),cb=$('#checkBtn',el),fb=$('#fb',el);
  $('#quit',el).onclick=()=>{i=0;score=0;step()};
  let getResult;
  if(q.t==='mcq'){body.innerHTML=`<div class="opts">${q.o.map((o,k)=>`<button class="opt" data-k="${k}">${esc(o)}</button>`).join('')}</div>`;let sel=-1;
   body.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{if(answered)return;body.querySelectorAll('.opt').forEach(x=>x.classList.remove('sel'));b.classList.add('sel');sel=+b.dataset.k;cb.disabled=false});
   getResult=()=>{const ok=sel===q.a;body.querySelectorAll('.opt').forEach(b=>{if(+b.dataset.k===q.a)b.classList.add('right');else if(+b.dataset.k===sel)b.classList.add('wrong')});return[ok?2:0,q.o[q.a]]}}
  if(q.t==='fill'){body.innerHTML=`<div class="fill"><input id="inp" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Your answer" placeholder="Tape ta réponse…"><div class="accents">${['é','è','ê','à','ç','ï','ô',"'"].map(c=>`<button type="button">${c}</button>`).join('')}</div></div>`;
   const inp=$('#inp',body);inp.oninput=()=>cb.disabled=!inp.value.trim();inp.onkeydown=e=>{if(e.key==='Enter'&&!cb.disabled)cb.click()};
   body.querySelectorAll('.accents button').forEach(b=>b.onclick=()=>{inp.value+=b.textContent;inp.focus();inp.oninput()});setTimeout(()=>inp.focus({preventScroll:true}),50);
   getResult=()=>[check(inp.value,q.a),q.a[0]]}
  if(q.t==='order'){const ans=[];body.innerHTML=`<div class="answer-zone" id="az" aria-label="Your sentence"></div><div class="bank">${shuffle(q.w.map((w,k)=>[w,k])).map(([w,k])=>`<button class="chip" data-k="${k}">${esc(w)}</button>`).join('')}</div>`;
   const az=$('#az',body);body.querySelectorAll('.bank .chip').forEach(b=>b.onclick=()=>{if(answered)return;b.classList.add('used');const c=document.createElement('button');c.className='chip';c.textContent=b.textContent;ans.push(b.textContent);c.onclick=()=>{if(answered)return;ans.splice([...az.children].indexOf(c),1);c.remove();b.classList.remove('used');cb.disabled=!ans.length};az.appendChild(c);cb.disabled=false;speak(b.textContent)});
   getResult=()=>[check(ans.join(' '),[q.a]),q.a]}
  if(q.t==='match'){const L1=shuffle(q.p.map((p,k)=>[p[0],k])),R1=shuffle(q.p.map((p,k)=>[p[1],k]));let pick=null,done=0,miss=0;
   body.innerHTML=`<div class="match"><div style="display:grid;gap:10px">${L1.map(([t,k])=>`<button class="chip" data-s="l" data-k="${k}">${esc(t)}</button>`).join('')}</div><div style="display:grid;gap:10px">${R1.map(([t,k])=>`<button class="chip" data-s="r" data-k="${k}">${esc(t)}</button>`).join('')}</div></div>`;
   body.querySelectorAll('.chip').forEach(b=>b.onclick=()=>{if(b.classList.contains('paired'))return;if(b.dataset.s==='l')speak(b.textContent);
    if(!pick||pick.dataset.s===b.dataset.s){if(pick)pick.classList.remove('picked');pick=b;b.classList.add('picked');return}
    if(pick.dataset.k===b.dataset.k){[pick,b].forEach(x=>{x.classList.remove('picked');x.classList.add('paired')});done++;pick=null;if(done===q.p.length){cb.disabled=false;cb.click()}}
    else{miss++;const a=pick;[a,b].forEach(x=>x.classList.add('bad'));setTimeout(()=>[a,b].forEach(x=>x.classList.remove('bad','picked')),450);pick=null}});
   getResult=()=>[miss===0?2:(miss<=2?1:0),q.p.map(p=>p.join(' = ')).join(' · ')]}
  cb.onclick=()=>{if(answered)return;answered=true;const[r,right]=getResult();cb.style.display='none';
   if(q.t==='match'&&r===0){score+=0}else if(r>=1){score++;addXP(r===2?10:7)}
   const ok=r>=1;fb.className='feedback show '+(ok?'ok':'no');
   fb.querySelector('.msg').innerHTML=(r===2?'🎉 Excellent !':r===1?(q.t==='match'?'👍 Bien — a few slips':'👍 Presque ! Watch the accents'):'😅 Pas tout à fait…')+`<small>✔ ${esc(right)}${q.why?' — '+esc(q.why):''}</small>`;
   if(q.t!=='match')speak(q.t==='mcq'?q.o[q.a]:right);$('#nextBtn',el).focus();$('#nextBtn',el).onclick=()=>{i++;step()}};
 }
 function finish(){const p=lp(l.id);p.best=Math.max(p.best,score);if(score/qs.length>=.6)p.done=true;save();addXP(20);if(score/qs.length>=.8)confetti();
  const pc=Math.round(score/qs.length*100);
  el.innerHTML=`<div class="card done-screen"><div class="big">${pc>=80?'🏆':pc>=60?'🎉':'💪'}</div><h2>${pc>=80?'Magnifique !':pc>=60?'Bravo !':'Courage !'}</h2><p>${score} / ${qs.length} correct · ${pc}%</p><div class="bar" style="max-width:320px;margin:16px auto"><i style="width:${pc}%"></i></div>
  <div class="ctas" style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap"><button class="btn btn-ghost" id="again">↻ Recommencer</button>${l.id<L.length?`<a class="btn btn-primary" href="#/lesson/${l.id+1}">Leçon ${l.id+1} →</a>`:`<a class="btn btn-primary" href="#/review">🃏 Révision</a>`}</div></div>`;
  $('#again',el).onclick=()=>{i=0;score=0;step()}}
 step();
}
function review(){const all=L.flatMap(l=>l.vocab.map(v=>({...v,c:l.color,l:l.id})));
 return `<div class="crumbs"><a href="#/">Accueil</a> › Révision</div><div class="lesson-head" style="--c:var(--accent)"><span class="eyebrow">Toutes les cartes · ${all.length}</span><h1>Révision 🃏</h1><p>All Part 1 vocabulary. Filter by lesson, flip, listen. 全部單字複習。</p></div>
 <div class="tabs" role="tablist" id="rf"><button role="tab" aria-selected="true" data-f="0">Toutes</button>${L.map(l=>`<button role="tab" aria-selected="false" data-f="${l.id}">${l.emoji} L${l.id}</button>`).join('')}<button role="tab" aria-selected="false" data-f="s">🔀 Mélanger</button></div><div id="rv"></div>`}
function bindReview(){const all=L.flatMap(l=>l.vocab.map((v,i)=>({...v,l:l.id})));const rv=$('#rv');
 const show=list=>{rv.innerHTML=vocabGrid(list,'');bindFlips(rv)};show(all);
 $('#rf').querySelectorAll('button').forEach(b=>b.onclick=()=>{$('#rf').querySelectorAll('button').forEach(x=>x.setAttribute('aria-selected',x===b));const f=b.dataset.f;
  show(f==='0'?all:f==='s'?[...all].sort(()=>Math.random()-.5):all.filter(v=>v.l==f))})}
/* --- router --- */
function route(){const h=location.hash.replace(/^#\/?/,'').split('/');let html,after;
 const v=h[0]||'home';
 if(v==='part'){html=part(h[1]||1)}else if(v==='lesson'){const l=L.find(x=>x.id==h[1]);html=lesson(h[1],h[2]);after=()=>{if(!l)return;const tab=h[2]||'learn';renderPanel(l,tab);document.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>{location.hash=`#/lesson/${l.id}/${b.dataset.tab}`})}}
 else if(v==='review'){html=review();after=bindReview}else if(v==='midterm'&&window.MIDTERM){const r=window.MIDTERM.route(h);html=r.html;after=r.after}else html=home();
 main.innerHTML=html;after&&after();
 document.querySelectorAll('[data-nav]').forEach(a=>a.classList.toggle('active',a.dataset.nav===(v==='lesson'?'part':v)));
 if(!(v==='lesson'&&h[2]))window.scrollTo({top:0});else{const t=document.querySelector('.tabs');if(t&&t.getBoundingClientRect().top<0)t.scrollIntoView()}
 document.title=(v==='lesson'?'Leçon '+h[1]+' · ':v==='review'?'Révision · ':v==='midterm'?'Midterm · ':'')+'Le Petit Café du Français';
}
window.LFR={speak:(t)=>speak(t),toast,confetti,addXP};
window.addEventListener('hashchange',route);hud();route();
})();
