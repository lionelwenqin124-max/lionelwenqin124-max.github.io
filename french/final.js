/* Final test Part 1 期末考 — verbes en -er (unités 6-8). Modes: exam, kahoot, listen, dictée, boss, conjugueur, match, erreurs, rules */
(()=>{
const K='lfr_fn_';const st={get(k,d){try{const v=localStorage.getItem(K+k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem(K+k,JSON.stringify(v))}catch(e){}}};
const D=window.FINAL_DATA,SECS=D.secs,ALL=D.items,VB=D.verbs;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const norm=s=>String(s).toLowerCase().replace(/[’`´]/g,"'").replace(/\s*'\s*/g,"'").replace(/[«»"]/g,'').replace(/\s+/g,' ').replace(/\s*([?!.,;:])/g,'$1').replace(/[.!?;:]+$/,'').trim();
const strip=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'');
const H=()=>window.LFR||{};const $=s=>document.querySelector(s);
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const secOf=id=>SECS.find(s=>s.id===id);const byS=id=>ALL.filter(x=>x.s===id);
const PRF=['je','tu','il/elle/on','nous','vous','ils/elles'];
/* ---------- AUDIO: real French clips (gTTS), lazy-loaded; fallback = device voice ---------- */
let audLoad=null;function loadAudio(){if(audLoad)return audLoad;const V=window.ASSET_V||'1';
 audLoad=Promise.all(['final-audio-1.js','final-audio-2.js'].map(f=>new Promise(r=>{const s=document.createElement('script');s.src=f+'?v='+V;s.onload=s.onerror=r;document.head.appendChild(s)})));return audLoad}
let cur=null,slow=st.get('slow',false);
function clip(t){const k=D.ak[t];const A=window.FINAL_AUD||{};return k&&A[k]?'data:audio/mpeg;base64,'+A[k]:null}
function play(t,o={}){o=Object.assign({twice:false},o);if(cur){cur.pause();cur=null}try{speechSynthesis.cancel()}catch(e){}
 const src=clip(t);if(!src){H().speak&&H().speak(t);return}
 const a=new Audio(src);a.playbackRate=slow?0.72:1;try{a.preservesPitch=true}catch(e){}cur=a;let n=o.twice?2:1;
 a.onended=()=>{if(--n>0&&cur===a)setTimeout(()=>{if(cur===a){a.currentTime=0;a.play().catch(()=>{})}},650)};
 a.play().catch(()=>{H().speak&&H().speak(t)})}
let sfxOn=st.get('sfx',true);function sfx(ok){if(!sfxOn)return;const A=window.FINAL_AUD||{},b=A['sfx_'+(ok?'correct':'wrong')];if(!b)return;try{const a=new Audio('data:audio/mpeg;base64,'+b);a.volume=.5;a.play().catch(()=>{})}catch(e){}}
document.addEventListener('click',e=>{const s=e.target.closest&&e.target.closest('[data-fnsay]');if(s){e.preventDefault();play(s.dataset.fnsay,{twice:s.dataset.twice==='1'})}
 const sl=e.target.closest&&e.target.closest('[data-fnslow]');if(sl){slow=!slow;st.set('slow',slow);document.querySelectorAll('[data-fnslow]').forEach(b=>b.classList.toggle('on',slow))}});
const sayBtn=(t,tw)=>`<button type="button" class="say say-inline" data-fnsay="${esc(t)}"${tw?' data-twice="1"':''} aria-label="Listen">🔊</button>`;
const slowBtn=()=>`<button type="button" class="btn btn-ghost fn-slow${slow?' on':''}" data-fnslow="1" title="Slow audio">🐢 Lent</button>`;
/* ---------- accent bar (shared pattern with Midterm) ---------- */
const ACC=['é','è','ê','à','â','ç','î','ï','ô','û','ù','œ',"'"];
const accBar=()=>`<div class="mt-acc" aria-label="Accents">${ACC.map(a=>`<button type="button" data-fnacc="${a}">${a}</button>`).join('')}</div>`;
let lastInput=null;document.addEventListener('focusin',e=>{if(e.target.matches&&e.target.matches('.fn input[type=text]'))lastInput=e.target});
document.addEventListener('mousedown',e=>{if(e.target.matches&&e.target.matches('[data-fnacc]'))e.preventDefault()});
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-fnacc]');if(b&&lastInput){const i=lastInput,p=i.selectionStart??i.value.length;i.value=i.value.slice(0,p)+b.dataset.fnacc+i.value.slice(i.selectionEnd??p);i.focus();i.setSelectionRange(p+1,p+1)}});
const inp=(id,ph,cls)=>`<input type="text" id="${id}" class="mt-in ${cls||'lg'}" placeholder="${esc(ph||'')}" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" aria-label="Answer">`;
/* ---------- GRADING: r=2 perfect, 1 accent slip, 0 wrong ---------- */
function grade(x,v){const n=norm(v);if(!n)return{r:0};const A=x.a.map(norm);
 if(A.includes(n))return{r:2};
 if(x.s==='S2'||x.s==='S3'||x.s==='S6'){const bare=n.replace(/^(je |j'|tu |il |elle |on |nous |vous |ils |elles )/,'');if(A.includes(bare))return{r:2}}
 if(x.s==='S1'&&A.includes(n.replace(/^je (?=[aeéèêiouh])/,"j'")))return{r:0,msg:"Élision ! je + voyelle/h → j'  →  "+x.a[0]};
 const sA=A.map(strip),sn=strip(n);
 if(sA.includes(sn)||((x.s==='S2'||x.s==='S3'||x.s==='S6')&&sA.includes(sn.replace(/^(je |j'|tu |il |elle |on |nous |vous |ils |elles )/,'')))){
  if(x.strict||x.s==='S6')return{r:0,msg:'Accents ! → '+x.a[0]};return{r:1,msg:'Presque ! Attention aux accents → '+x.a[0]}}
 return{r:0}}
function diff(v,ans){const a=norm(ans).split(' '),b=norm(v).split(' ');return ans.split(' ').map((w,i)=>a[i]===b[i]?esc(w):`<mark>${esc(w)}</mark>`).join(' ')}
const expl=x=>`<div class="mt-ex"><p>🇫🇷 <b>${esc(x.full)}</b> ${sayBtn(x.full)}</p><p>🇹🇼 ${esc(x.zh)}</p><p>🇬🇧 ${esc(x.en)}</p></div>`;
/* ---------- PROGRESS ---------- */
let M=st.get('box',{});const box=id=>M[id]||0;const saveM=()=>st.set('box',M);
let ERR=st.get('err',{});const saveE=()=>st.set('err',ERR);
function mark(id,ok){const b=box(id);M[id]=ok?Math.min(4,b+1):0;saveM();if(!ok){ERR[id]=(ERR[id]||0)+1}else if(ERR[id]&&box(id)>=2){delete ERR[id]}saveE()}
const mastery=s=>{const it=byS(s);return Math.round(it.reduce((a,x)=>a+Math.min(box(x.id),3),0)/(it.length*3)*100)};
const totalM=()=>Math.round(SECS.reduce((a,s)=>a+mastery(s.id),0)/SECS.length);
let cele=st.get('cele',{});function checkM(){SECS.forEach(s=>{if(mastery(s.id)===100&&!cele[s.id]){cele[s.id]=1;st.set('cele',cele);H().confetti&&H().confetti();H().toast&&H().toast(`🏆 ${s.fr} maîtrisé !`)}})}
const xp=n=>H().addXP&&H().addXP(n);
/* ---------- CSS (Kahoot tiles etc.) ---------- */
if(!document.getElementById('fnCss')){const c=document.createElement('style');c.id='fnCss';c.textContent=`
.fn .k-wrap{max-width:760px;margin:0 auto}.fn .k-top{display:flex;justify-content:space-between;align-items:center;font-weight:800;margin-bottom:8px;gap:8px}
.fn .k-q{background:var(--surface);border-radius:16px;padding:18px;text-align:center;box-shadow:var(--sh);margin-bottom:12px}.fn .k-q h2{font-size:1.35rem;margin:.3em 0;line-height:1.35}
.fn .k-time{height:10px;border-radius:6px;background:var(--surface2);overflow:hidden;margin-bottom:12px}.fn .k-time i{display:block;height:100%;background:linear-gradient(90deg,#46178f,#1368ce);transition:width .1s linear}
.fn .k-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.fn .k-t{border:none;border-radius:12px;min-height:84px;padding:12px 12px 12px 44px;color:#fff;font:inherit;font-weight:700;font-size:1.02rem;text-align:left;position:relative;cursor:pointer;box-shadow:0 4px 0 rgba(0,0,0,.25);transition:transform .08s,opacity .2s}
.fn .k-t:active{transform:translateY(2px)}.fn .k-t::before{position:absolute;left:12px;top:50%;transform:translateY(-50%);font-size:1.3rem}
.fn .k-t.c0{background:#e21b3c}.fn .k-t.c0::before{content:"▲"}.fn .k-t.c1{background:#1368ce}.fn .k-t.c1::before{content:"◆"}.fn .k-t.c2{background:#d89e00}.fn .k-t.c2::before{content:"●"}.fn .k-t.c3{background:#26890c}.fn .k-t.c3::before{content:"■"}
.fn .k-t.dim{opacity:.35}.fn .k-t.right{outline:4px solid #fff;box-shadow:0 0 0 7px #26890c}.fn .k-fb{margin-top:12px}
.fn .k-pop{font-size:1.4rem;font-weight:900;text-align:center;padding:10px;border-radius:12px;color:#fff}.fn .k-pop.ok{background:#26890c}.fn .k-pop.bad{background:#e21b3c}
.fn .k-grid.one{grid-template-columns:1fr}@media(max-width:520px){.fn .k-grid{grid-template-columns:1fr}.fn .k-t{min-height:60px}}
.fn .fn-listen{font-size:2.4rem;width:96px;height:96px;border-radius:50%;border:none;background:var(--primary);color:#fff;cursor:pointer;box-shadow:var(--sh)}
.fn .fn-slow.on{background:var(--primary);color:#fff}.fn mark{background:#ffd7d7;color:#a00;border-radius:4px;padding:0 2px}
.fn .fn-tbl td{padding:6px 8px}.fn .fn-tbl .end{color:#ef4135;font-weight:800}.fn .fn-sec-q{margin:10px 0;line-height:2.1}.fn .fn-sec-q .mt-in{width:min(170px,40vw)}.fn .fn-sec-q .mt-in.wide{width:100%;margin:4px 0}
.fn .fn-mark{font-weight:800;margin-left:6px}.fn .fn-mcq label{display:block;padding:8px 10px;border:2px solid var(--line);border-radius:10px;margin:6px 0;cursor:pointer;font-family:var(--font)}
.fn .fn-mcq input{margin-right:8px}.fn .fn-mcq label.ok{border-color:#10b981;background:var(--okbg)}.fn .fn-mcq label.bad{border-color:#ef4135;background:var(--badbg)}
.fn .fn-pill{display:inline-block;padding:2px 10px;border-radius:99px;background:var(--surface2);font-size:.85rem;font-weight:700}
.fn .fn-chips{display:flex;flex-wrap:wrap;gap:6px;margin:8px 0}.fn .fn-chips button{border:2px solid var(--line);background:var(--surface);color:var(--text);border-radius:99px;padding:6px 12px;font:inherit;cursor:pointer}.fn .fn-chips button.on{background:var(--text);color:var(--surface)}
`;document.head.appendChild(c)}
/* ---------- shared bits ---------- */
const toTop=el=>{if(!el)return;const y=el.getBoundingClientRect().top+window.scrollY-80;if(Math.abs(window.scrollY-y)>40)window.scrollTo({top:Math.max(0,y)})};
const crumbs=t=>`<div class="crumbs"><a href="#/">Accueil</a> › <a href="#/final">Final</a>${t?' › '+t:''}</div>`;
const MODES=[['exam','📝','Examen blanc','Mock test, all 8 parts, score /100 · 模擬考＋錯題檢討'],['kahoot','🎮','Kahoot !','20 s per question, speed points · 限時搶答'],
['listen','🎧','Écoute','Hear it, pick it: liaison, -ons/-ez · 聽力辨音'],['dictee','✏️','Dictée','Hear twice, type it · 聽寫'],
['boss','🐉','Boss battle','Spaced repetition, 3 ❤️ · 錯題重複'],['conj','🧮','Conjugueur','All verb tables + audio + quiz · 動詞變化表'],
['match','🔗','Matching','Pronoun ↔ verb form · 配對'],['errors','🩹','Mes erreurs','Redo only your mistakes · 只練錯題'],['rules','📌','Cheat-sheet','All rules FR/中/EN · 規則整理']];
/* ---------- HOME ---------- */
function home(){const t=totalM(),eb=st.get('examBest',null),kb=st.get('kBest',0),ne=Object.keys(ERR).length;
 return `${crumbs()}<div class="lesson-head mt-head" style="--c:#46178f"><span class="eyebrow">Grammaire · 期末考 Final · Part 1</span><h1>Final test 🏁</h1>
<p>Part 1 = <b>les verbes en -er au présent</b> (unités 6, 7, 8): je/j', all endings, silent letters & liaison, questions & négation, <b>acheter, préférer, appeler, jeter, manger, commencer, payer, envoyer</b>. 期末考第一部分：-er 動詞現在式＋特殊字根。</p>
<div class="mt-ring" style="--p:${t}"><b>${t}%</b><span>maîtrisé</span></div></div>
<div class="grid g3" style="margin:12px 0"><div class="card"><b>📝 ${eb==null?'—':eb+'/100'}</b><p class="mt-small">Best mock exam · 模擬考最高分</p></div><div class="card"><b>🎮 ${kb}</b><p class="mt-small">Kahoot record · 最高分</p></div><div class="card"><b>🩹 ${ne}</b><p class="mt-small">Mistakes to fix · 待複習錯題</p></div></div>
<div class="section-title"><div><h2>Modes de jeu</h2><p>Choose how to practise · 選擇練習模式</p></div></div>
<div class="grid g4 mt-modes">${MODES.map(([k,e,f,d])=>`<a class="card" href="#/final/${k}"><div class="emo">${e}</div><h3>${f}</h3><p>${d}</p></a>`).join('')}</div>
<div class="section-title"><div><h2>Les 8 parties</h2><p>Mastery per part · 各部分熟練度</p></div></div>
<div class="mt-secs">${SECS.map((s,i)=>{const m=mastery(s.id);return `<div class="card mt-sec" style="--c:${s.color}"><div class="mt-sec-h"><span class="emo">${s.emo}</span><div><b>${i+1}. ${esc(s.fr)}</b> <span class="badge">${byS(s.id).length}</span><p>${s.zh}<br><small>${s.en}</small></p></div></div>
<div class="bar"><i style="width:${m}%;background:${s.color}"></i></div><div class="mt-sec-a"><small>${m}%${m===100?' 🏆':''}</small><a class="btn btn-ghost" href="#/final/boss/${s.id}" aria-label="Boss">🐉</a><a class="btn btn-ghost" href="#/final/kahoot/${s.id}" aria-label="Kahoot">🎮</a></div></div>`}).join('')}</div>
<p style="text-align:center"><label class="mt-small"><input type="checkbox" id="fnSfx" ${sfxOn?'checked':''}> 🔔 Sound effects</label> &nbsp; <button class="btn btn-ghost" id="fnReset">↺ Reset progress</button></p>`}
function bindHome(){$('#fnSfx').onchange=e=>{sfxOn=e.target.checked;st.set('sfx',sfxOn)};$('#fnReset').onclick=()=>{if(confirm('Reset final-test progress?')){['box','err','cele','examBest','examHist','kBest'].forEach(k=>localStorage.removeItem(K+k));location.reload()}}}
/* ---------- KAHOOT ---------- */
const secTabs=(mode,cur)=>`<div class="tabs mt-tabs"><a class="tab${!cur?' on':''}" href="#/final/${mode}">🌐 All</a>${SECS.map(s=>`<a class="tab${cur===s.id?' on':''}" href="#/final/${mode}/${s.id}">${s.emo} ${SECS.indexOf(s)+1}</a>`).join('')}</div>`;
function kahoot(sec){return `${crumbs('Kahoot')}${secTabs('kahoot',sec)}<div id="kA" class="k-wrap"></div>`}
function bindKahoot(sec){const el=$('#kA');const N=15;
 const start=()=>{el.innerHTML=`<div class="card done-screen"><div class="big">🎮</div><h2>Kahoot ! ${sec?esc(secOf(sec).fr):'Toutes les parties'}</h2><p>${N} questions · 20 s each · faster = more points · 🔥 streak bonus<br>每題 20 秒，越快分數越高。</p><p class="mt-small">Record : <b>${st.get('kBest',0)}</b></p><button class="btn btn-primary" id="kGo">▶ Jouer</button></div>`;$('#kGo').onclick=run};
 const run=()=>{loadAudio();const tb=document.querySelector('.fn .mt-tabs');if(tb)tb.style.display='none';let pool=shuffle(sec?byS(sec):ALL).filter(x=>x.ch&&x.ch.length>=2);
  if(!sec){const per={};pool=pool.filter(x=>(per[x.s]=(per[x.s]||0)+1)<=2||Math.random()<.15)}pool=pool.slice(0,N);
  let i=0,score=0,streak=0,right=0,miss=[];const T=20;
  const q=()=>{if(i>=pool.length)return end();const x=pool[i];const opts=shuffle(x.ch.slice(0,4));const t0=Date.now();let done=false,tick;
   const s=secOf(x.s);el.innerHTML=`<div class="k-top"><span>${i+1}/${pool.length}</span><span>⭐ ${score}</span><span>🔥 ${streak}</span></div><div class="k-time"><i id="kT" style="width:100%"></i></div>
   <div class="k-q"><span class="badge" style="background:${s.color};color:#fff">${s.emo} ${esc(s.fr)}</span>${x.listen?`<p class="mt-small">🎧 What did you hear? 你聽到哪一句？</p><p><button class="fn-listen" data-fnsay="${esc(x.full)}" data-twice="1">🔊</button></p>${slowBtn()}`:`<h2>${esc(x.q)}</h2>${x.mcq?sayBtn(x.full):''}<p class="mt-small">${esc(s.zh)}</p>`}</div>
   <div class="k-grid${opts.some(o=>o.length>34)?' one':''}">${opts.map((o,j)=>`<button class="k-t c${j}" data-o="${esc(o)}">${esc(o)}</button>`).join('')}</div><div class="k-fb" id="kF"></div>`;
   toTop(el);if(x.listen)setTimeout(()=>play(x.full,{twice:true}),250);
   tick=setInterval(()=>{const left=Math.max(0,T-(Date.now()-t0)/1000);const b=$('#kT');if(!b||!document.body.contains(el)){clearInterval(tick);return}b.style.width=(left/T*100)+'%';if(left<=0){clearInterval(tick);ans(null)}},100);
   const ans=v=>{if(done)return;done=true;clearInterval(tick);const ok=v!=null&&x.a.map(norm).includes(norm(v));const dt=(Date.now()-t0)/1000;
    let pts=0;if(ok){streak++;right++;pts=Math.round(1000*(1-dt/T/2))+(streak>=3?100*Math.min(streak-2,5):0);score+=pts}else{streak=0;miss.push({x,v})}
    mark(x.id,ok);sfx(ok);
    el.querySelectorAll('.k-t').forEach(b=>{b.disabled=true;if(x.a.map(norm).includes(norm(b.dataset.o)))b.classList.add('right');else b.classList.add('dim')});
    $('#kF').innerHTML=`<div class="k-pop ${ok?'ok':'bad'}">${ok?'✅ +'+pts+(streak>=3?' 🔥×'+streak:''):(v==null?'⏰ Temps écoulé !':'❌ Raté !')}</div>${expl(x)}<div class="actions"><button class="btn btn-primary" id="kN">${i+1<pool.length?'Suivant ▶':'Résultats 🏁'}</button></div>`;
    if(!x.listen)play(x.full);$('#kN').onclick=()=>{i++;q()};$('#kN').focus()};
   el.querySelectorAll('.k-t').forEach(b=>b.onclick=()=>ans(b.dataset.o))};
  const end=()=>{const tb=document.querySelector('.fn .mt-tabs');if(tb)tb.style.display='';const best=st.get('kBest',0),nb=score>best;if(nb){st.set('kBest',score);H().confetti&&H().confetti()}xp(Math.round(score/200));checkM();
   el.innerHTML=`<div class="card done-screen"><div class="big">${nb?'🏆':right>=pool.length*.8?'🎉':'💪'}</div><h2>${score} points</h2><p>${right}/${pool.length} correct · ${nb?'Nouveau record ! New best!':'Record : '+best}</p>
   ${miss.length?`<div style="text-align:left"><h3>🩹 Révision des erreurs · 錯題</h3>${miss.map(m=>`<div class="card" style="margin:8px 0"><p><b>${esc(m.x.listen?'🎧 (écoute)':m.x.q)}</b><br>❌ ${esc(m.v||'—')}  ✅ <b>${esc(m.x.a[0])}</b></p>${expl(m.x)}</div>`).join('')}</div>`:''}
   <div class="actions" style="justify-content:center"><button class="btn btn-primary" id="kAg">↻ Rejouer</button><a class="btn btn-ghost" href="#/final">🏠 Final</a></div></div>`;$('#kAg').onclick=run};
  q()};start()}
/* ---------- LISTEN (pick what you hear) ---------- */
function listenPool(){const L=byS('S8').filter(x=>x.listen);const extra=[];
 // generated minimal pairs from verb tables: il X / ils X(liaison) & nous/vous
 VB.filter(v=>/^[aeéiouh]/.test(v.inf)).forEach(v=>{const a='il '+v.f[2],b='ils '+v.f[5];if(D.ak[a]&&D.ak[b]){extra.push({id:'L-'+v.inf+'-s',s:'S8',full:a,a:[a],ch:[a,b],en:`Singular: no [z] liaison → il ${v.f[2]}. (${v.en})`,zh:`沒有 [z] 連音 → 單數 il ${v.f[2]}（${v.zh}）`,listen:1,gen:1});extra.push({id:'L-'+v.inf+'-p',s:'S8',full:b,a:[b],ch:[b,a],en:`Plural: ils‿${v.f[5]} with [z] liaison. (${v.en})`,zh:`有 [z] 連音 → 複數 ils ${v.f[5]}（${v.zh}）`,listen:1,gen:1})}});
 VB.forEach(v=>{const n='nous '+v.f[3],w='vous '+v.f[4];if(D.ak[n]&&D.ak[w]&&Math.random()<.5){const pick=Math.random()<.5?n:w;extra.push({id:'L-'+v.inf+'-nv',s:'S8',full:pick,a:[pick],ch:[n,w],en:`-ons = [ɔ̃], -ez = [e]. ${v.inf} = ${v.en}.`,zh:`-ons 發 [ɔ̃]、-ez 發 [e]。${v.inf}（${v.zh}）`,listen:1,gen:1})}});
 return shuffle(L.concat(shuffle(extra).slice(0,14)))}
function listen(){return `${crumbs('Écoute')}<div class="k-wrap"><div class="card"><h2>🎧 Écoute — qu'avez-vous entendu ?</h2><p>Each sentence plays <b>twice</b>. Listen for the <b>[z] liaison</b> (ils‿écoutent), <b>-ons [ɔ̃]</b> vs <b>-ez [e]</b>, and remember: <b>-e, -es, -ent are silent</b>. 每句播兩次；注意連音、-ons／-ez。</p>${slowBtn()}</div><div id="lA"></div></div>`}
function bindListen(){loadAudio().then(()=>{});const pool=listenPool().slice(0,16);let i=0,right=0;const el=$('#lA');
 const q=()=>{if(i>=pool.length){xp(right);checkM();el.innerHTML=`<div class="card done-screen"><div class="big">🎧</div><h2>${right}/${pool.length}</h2><button class="btn btn-primary" id="lAg">↻ Encore</button></div>`;$('#lAg').onclick=bindListen;return}
  const x=pool[i],o=shuffle(x.ch);el.innerHTML=`<div class="k-q"><div class="k-top"><span>${i+1}/${pool.length}</span><span>✅ ${right}</span></div><p><button class="fn-listen" data-fnsay="${esc(x.full)}" data-twice="1" aria-label="Play">🔊</button></p><p class="mt-small">Tap to replay · 點擊重播</p></div>
  <div class="k-grid${o.some(s=>s.length>30)?' one':''}">${o.map((s,j)=>`<button class="k-t c${j}" data-o="${esc(s)}">${esc(s)}</button>`).join('')}</div><div id="lF" class="k-fb"></div>`;
  toTop(el);loadAudio().then(()=>play(x.full,{twice:true}));
  el.querySelectorAll('.k-t').forEach(b=>b.onclick=()=>{const ok=norm(b.dataset.o)===norm(x.a[0]);if(ok)right++;if(!x.gen)mark(x.id,ok);sfx(ok);
   el.querySelectorAll('.k-t').forEach(c=>{c.disabled=true;c.classList.add(norm(c.dataset.o)===norm(x.a[0])?'right':'dim')});
   $('#lF').innerHTML=`<div class="k-pop ${ok?'ok':'bad'}">${ok?'✅ Bravo !':'❌ '+esc(x.a[0])}</div><div class="mt-ex"><p>🇫🇷 <b>${esc(x.full)}</b> ${sayBtn(x.full)}</p><p>🇹🇼 ${esc(x.zh)}</p><p>🇬🇧 ${esc(x.en)}</p></div><div class="actions"><button class="btn btn-primary" id="lN">Suivant ▶</button></div>`;$('#lN').onclick=()=>{i++;q()}})};q()}
/* ---------- DICTÉE ---------- */
function dictee(){return `${crumbs('Dictée')}<div class="k-wrap"><div class="card"><h2>✏️ Dictée</h2><p>Listen (twice), then type the whole sentence. Wrong words are highlighted. 聽兩次，寫出整句；錯的字會標紅。</p>${slowBtn()}</div><div id="dA"></div></div>`}
function bindDictee(){loadAudio();const pool=shuffle(ALL.filter(x=>!x.mcq&&['S1','S2','S3','S4','S5','S6','S8'].includes(x.s)&&x.full.split(' ').length>=2)).slice(0,10);let i=0,right=0;const el=$('#dA');
 const q=()=>{if(i>=pool.length){xp(right*2);el.innerHTML=`<div class="card done-screen"><div class="big">✏️</div><h2>${right}/${pool.length}</h2><button class="btn btn-primary" id="dAg">↻ Encore</button></div>`;$('#dAg').onclick=bindDictee;return}
  const x=pool[i];el.innerHTML=`<div class="card qcard"><div class="k-top"><span>${i+1}/${pool.length}</span><span>✅ ${right}</span></div><p style="text-align:center"><button class="fn-listen" data-fnsay="${esc(x.full)}" data-twice="1">🔊</button></p>
  <form id="dF">${inp('dIn','Écrivez la phrase…','lg wide')}${accBar()}<div class="actions"><button class="btn btn-primary">Vérifier</button><button type="button" class="btn btn-ghost" id="dH">💡 ${esc(x.zh.split(/[。！？]/)[0])}</button></div></form><div id="dFb"></div></div>`;
  toTop(el);loadAudio().then(()=>play(x.full,{twice:true}));$('#dIn').focus();$('#dH').onclick=e=>{e.target.textContent='💡 '+x.en};
  $('#dF').onsubmit=e=>{e.preventDefault();const v=$('#dIn').value,n=norm(v),a=norm(x.full);const r=n===a?2:strip(n)===strip(a)?1:0;if(r)right++;if(!x.gen)mark(x.id,r>0);sfx(r>0);
   $('#dFb').innerHTML=`<div class="mt-fbbox ${r===2?'ok':r===1?'near':'bad'}">${r===2?'✅ Parfait !':r===1?'🟡 Presque — accents !':'❌'} <p>${diff(v,x.full)}</p></div>${expl(x)}<div class="actions"><button class="btn btn-primary" id="dN">Suivant ▶</button></div>`;$('#dN').onclick=()=>{i++;q()};$('#dN').focus()}};q()}
/* ---------- BOSS (typed, spaced repetition) ---------- */
function boss(sec){return `${crumbs('Boss battle')}${secTabs('boss',sec)}<div id="bA" class="mt-q"></div>`}
function bindBoss(sec,list){loadAudio();const el=$('#bA');let pool=list||(sec?byS(sec):ALL);pool=shuffle(pool).sort((a,b)=>box(a.id)-box(b.id)).slice(0,list?pool.length:12);
 let queue=pool.slice(),hearts=3,streak=0,done=0;const tot=queue.length;
 const q=()=>{if(!queue.length||hearts<=0){checkM();xp(done*2);const win=!queue.length;if(win)H().confetti&&H().confetti();
   el.innerHTML=`<div class="card done-screen"><div class="big">${win?'🏆':'💀'}</div><h2>${win?'Boss vaincu ! Boss defeated!':'Game over'}</h2><p>${done}/${tot} ✅</p><button class="btn btn-primary" id="bAg">↻ Encore</button> <a class="btn btn-ghost" href="#/final">🏠</a></div>`;$('#bAg').onclick=()=>bindBoss(sec,list);return}
  const x=queue[0],s=secOf(x.s);const mc=x.listen||x.mcq;
  el.innerHTML=`<div class="mt-boss"><span>🐉 Boss</span><span class="mt-hearts">${'❤️'.repeat(hearts)}${'🖤'.repeat(3-hearts)}</span><span>🔥 ${streak}</span></div><div class="bar"><i style="width:${done/tot*100}%;background:linear-gradient(90deg,#ef4135,#f59e0b)"></i></div>
  <div class="card qcard"><span class="badge">${s.emo} ${esc(s.fr)}</span><p class="mt-small">${esc(s.zh)} · ${esc(s.en)}</p>
  ${x.listen?`<p style="text-align:center"><button class="fn-listen" data-fnsay="${esc(x.full)}" data-twice="1">🔊</button></p>`:`<h2 class="mt-prompt">${esc(x.q)}</h2>${x.mcq?sayBtn(x.full):''}`}
  ${mc?`<div class="opts">${shuffle(x.ch).map(o=>`<button class="opt" data-o="${esc(o)}">${esc(o)}</button>`).join('')}</div>`:`<form id="bF">${inp('bIn',x.s==='S4'?'Réécrivez la phrase…':'Réponse…',x.s==='S4'||x.s==='S5'?'lg wide':'lg')}${accBar()}<div class="actions"><button class="btn btn-primary">Vérifier</button><button type="button" class="btn btn-ghost" id="bSkip">🙋 Je ne sais pas</button></div></form>`}
  <div id="bFb"></div></div>`;
  toTop(el);if(x.listen)play(x.full,{twice:true});
  const res=(r,v,msg)=>{const ok=r>=1;mark(x.id,r===2);sfx(ok);queue.shift();if(ok){done++;streak++}else{hearts--;streak=0;queue.splice(Math.min(3,queue.length),0,x)}
   $('#bFb').innerHTML=`<div class="mt-fbbox ${r===2?'ok':r===1?'near':'bad'}">${r===2?'✅ Parfait !':r===1?'🟡 '+esc(msg||''):'❌ '+esc(msg||'')+(v!=null&&!mc?`<p>${diff(v,x.a[0])}</p>`:` ✅ <b>${esc(x.a[0])}</b>`)}</div>${expl(x)}<div class="actions"><button class="btn btn-primary" id="bN">Suivant ▶</button></div>`;
   el.querySelectorAll('.opt').forEach(b=>{b.disabled=true;if(norm(b.dataset.o)===norm(x.a[0]))b.classList.add('ok');else if(norm(b.dataset.o)===norm(v||''))b.classList.add('bad')});
   const f=$('#bF');if(f)f.querySelectorAll('input,button').forEach(b=>b.disabled=true);if(!x.listen)play(x.full);$('#bN').onclick=q;$('#bN').focus()};
  if(mc)el.querySelectorAll('.opt').forEach(b=>b.onclick=()=>res(norm(b.dataset.o)===norm(x.a[0])?2:0,b.dataset.o));
  else{$('#bIn').focus();$('#bF').onsubmit=e=>{e.preventDefault();const g=grade(x,$('#bIn').value);res(g.r,$('#bIn').value,g.msg)};$('#bSkip').onclick=()=>res(0,'','')}};q()}
/* ---------- ERRORS ---------- */
function errors(){const L=Object.keys(ERR).map(id=>ALL.find(x=>x.id===id)).filter(Boolean);
 return `${crumbs('Mes erreurs')}<div class="mt-q"><div class="card"><h2>🩹 Mes erreurs (${L.length})</h2><p>Every question you missed in any mode is saved here until you get it right twice. 任何模式答錯的題目都會存在這裡，答對兩次才會移除。</p>
 ${L.length?`<button class="btn btn-primary" id="eGo">🐉 Practise my ${L.length} mistakes</button>`:'<p>🎉 Aucune erreur ! No mistakes saved.</p>'}</div><div id="bA"></div>
 ${L.length?`<div class="card"><table class="tbl">${L.map(x=>`<tr><td>${secOf(x.s).emo}</td><td>${esc(x.listen?'🎧 '+x.full:x.q)}</td><td><b>${esc(x.a[0])}</b></td><td>×${ERR[x.id]}</td></tr>`).join('')}</table></div>`:''}</div>`}
function bindErrors(){const b=$('#eGo');if(b)b.onclick=()=>{const L=Object.keys(ERR).map(id=>ALL.find(x=>x.id===id)).filter(Boolean);b.parentNode.style.display='none';bindBoss(null,L)}}
/* ---------- CONJUGUEUR ---------- */
const TYPE={reg:'Régulier',ger:'-ger',cer:'-cer','è':'e → è','é':'é → è',dbl:'-eter / -eler',ayer:'-ayer',oyer:'-oyer / -uyer'};
const subj=(i,f)=>i===0&&/^[aeéèêiouyh]/.test(f)?"j'":['je','tu','il','nous','vous','ils'][i]+' ';
const say6=(i,f)=>i===2?'il '+f:i===5?'ils '+f:subj(i,f).trim()==="j'"?"j'"+f:subj(i,f)+f;
function conj(inf){const v=VB.find(x=>x.inf===inf)||VB[0];const r=D.rules[v.t];
 return `${crumbs('Conjugueur')}<div class="mt-q"><div class="card"><h2>🧮 Conjugueur</h2><p class="mt-small">Pick a verb · 選一個動詞 (${VB.length})</p>
 ${Object.keys(TYPE).map(t=>`<p style="margin:6px 0 0"><b>${TYPE[t]}</b></p><div class="fn-chips">${VB.filter(x=>x.t===t).map(x=>`<button data-v="${x.inf}" class="${x.inf===v.inf?'on':''}">${x.inf}</button>`).join('')}</div>`).join('')}</div>
 <div class="card"><h2>${esc(v.inf)} ${sayBtn(v.inf)} <span class="fn-pill">${TYPE[v.t]}</span></h2><p>🇹🇼 ${esc(v.zh)} · 🇬🇧 ${esc(v.en)}</p>
 <table class="tbl fn-tbl">${v.f.map((f,i)=>{const sj=subj(i,f);const stem=f.slice(0,f.length-(['e','es','e','ons','ez','ent'][i].length)),end=f.slice(stem.length);return `<tr><td>${PRF[i].replace(/^je$/,sj.trim()==="j'"?"j'":'je')}</td><td><b>${esc(stem)}<span class="end">${esc(end)}</span></b></td><td>${sayBtn(say6(i,f))}</td><td class="mt-small">${i===0||i===1||i===2||i===5?'🔇 ending silent':'🔊 '+(i===3?'[ɔ̃]':'[e]')}</td></tr>`}).join('')}</table>
 <div class="mt-ex"><p>🇹🇼 ${esc(r.zh)}</p><p>🇬🇧 ${esc(r.en)}</p></div>
 <div class="actions"><button class="btn btn-primary" id="cQ">✍️ Quiz me on ${esc(v.inf)}</button><button class="btn btn-ghost" id="cR">🎲 Random verb</button></div><div id="cQA"></div></div></div>`}
function bindConj(inf){document.querySelectorAll('.fn-chips button').forEach(b=>b.onclick=()=>{location.hash='#/final/conj/'+b.dataset.v});
 $('#cR').onclick=()=>{location.hash='#/final/conj/'+VB[Math.random()*VB.length|0].inf};
 const v=VB.find(x=>x.inf===inf)||VB[0];
 $('#cQ').onclick=()=>{$('.fn-tbl').style.filter='blur(7px)';const qa=$('#cQA');qa.innerHTML=`<form id="cF">${v.f.map((f,i)=>`<p class="fn-sec-q">${PRF[i]} ${inp('c'+i,'','x')}<span id="cm${i}" class="fn-mark"></span></p>`).join('')}${accBar()}<div class="actions"><button class="btn btn-primary">Vérifier</button></div></form><div id="cFb"></div>`;$('#c0').focus();
  $('#cF').onsubmit=e=>{e.preventDefault();let ok=0;v.f.forEach((f,i)=>{let val=norm($('#c'+i).value).replace(/^(je |j'|tu |il |elle |on |nous |vous |ils |elles )/,'');const alt=v.t==='ayer'&&[0,1,2,5].includes(i)?f.replace('ai','ay'):f;const g=val===f||val===alt;if(g)ok++;$('#cm'+i).innerHTML=g?'✅':'❌ '+esc(f)});
   $('.fn-tbl').style.filter='';sfx(ok===6);xp(ok);if(ok===6)H().confetti&&H().confetti();$('#cFb').innerHTML=`<div class="mt-fbbox ${ok===6?'ok':'bad'}">${ok}/6 ${ok===6?'🏆 Parfait !':''}</div>`}}}
/* ---------- MATCH ---------- */
function match(){return `${crumbs('Matching')}<div class="mt-q"><div class="card"><h2>🔗 Matching</h2><p>Tap a pronoun, then its verb form. 先點主詞，再點對應的動詞。</p><div id="mA"></div></div></div>`}
function bindMatch(){loadAudio();const VF=VB.filter(x=>x.t!=='reg'||Math.random()<.4);const v=VF[Math.random()*VF.length|0]||VB[0];const P=['je','tu','il / elle','nous','vous','ils / elles'];
 const idx=[0,1,3,4,5];const L=idx.map(i=>({i,t:P[i]})),R=shuffle(idx.map(i=>({i,t:v.f[i]})));
 const el=$('#mA');let sel=null,left=L.length,miss=0,t0=Date.now();
 el.innerHTML=`<p><b>${esc(v.inf)}</b> · ${esc(v.zh)} · ${esc(v.en)} <span class="fn-pill">${TYPE[v.t]}</span></p><div class="mt-match"><div>${L.map(x=>`<button class="opt" data-l="${x.i}">${x.t}</button>`).join('')}</div><div>${R.map(x=>`<button class="opt" data-r="${x.i}">${esc(x.t)}</button>`).join('')}</div></div><div id="mR"></div>`;
 el.querySelectorAll('[data-l]').forEach(b=>b.onclick=()=>{el.querySelectorAll('[data-l]').forEach(c=>c.classList.remove('sel'));b.classList.add('sel');sel=b});
 el.querySelectorAll('[data-r]').forEach(b=>b.onclick=()=>{if(!sel||b.disabled)return;const i=+b.dataset.r;
  if(sel.dataset.l===b.dataset.r||v.f[+sel.dataset.l]===v.f[i]){[sel,b].forEach(c=>{c.classList.add('ok');c.disabled=true});play(say6(+sel.dataset.l,v.f[+sel.dataset.l]));sel=null;
   if(--left===0){const s=((Date.now()-t0)/1000).toFixed(1);xp(5);sfx(true);$('#mR').innerHTML=`<div class="done-screen"><div class="big">🔗</div><h2>${s} s · ${miss} erreur(s)</h2><div class="mt-ex"><p>🇹🇼 ${esc(D.rules[v.t].zh)}</p><p>🇬🇧 ${esc(D.rules[v.t].en)}</p></div><button class="btn btn-primary" id="mAg">↻ Encore</button></div>`;$('#mAg').onclick=bindMatch}}
  else{miss++;sfx(false);b.classList.add('bad');setTimeout(()=>b.classList.remove('bad'),500)}})}
/* ---------- EXAM (mock paper) ---------- */
const PLAN={S1:6,S2:8,S3:8,S4:3,S5:6,S6:8,S7:6,S8:6};const PTS={S1:10,S2:15,S3:10,S4:15,S5:15,S6:15,S7:10,S8:10};
const INSTR={S1:['Mettez à la première personne. Faites l\'élision si c\'est nécessaire.','寫出第一人稱 je 的形式，必要時省音 j\'。','Write the je-form; elide when needed.'],
S2:['Conjuguez les verbes.','填入正確的動詞變化。','Conjugate the verbs.'],S3:['Complétez le texte avec les verbes.','用括號中的動詞完成短文。','Complete the text.'],
S4:['Changez le sujet (je → tu, tu → nous, nous → ils, je → nous).','改變主詞並改寫整句。','Rewrite with the new subject.'],
S5:['Répondez (Oui… / Non, ne … pas / On …).','依提示回答：肯定、否定（ne…pas）或用 on。','Answer: yes / no (ne…pas) / on.'],
S6:['Complétez (verbes particuliers).','填入特殊字根動詞的正確形式。','Fill in the spelling-change verbs.'],
S7:['Mettez les accents si c\'est nécessaire.','需要的地方加上重音符號（有些不需要！）。','Add accents where needed (some need none!).'],
S8:['Écoutez et choisissez.','聽音檔，選出聽到的句子／正確答案。','Listen and choose.']};
let EX=null;
function exam(){const per={};const pick=s=>{let it=byS(s);if(s==='S4'){const g={};shuffle(it).forEach(x=>{(g[x.ins]=g[x.ins]||[]).push(x)});return ['je → tu','tu → nous','nous → ils'].map(k=>g[k][0])}
  if(s==='S3'){const a=it.slice(0,8),b=it.slice(8);return Math.random()<.5?a:b.concat(a.slice(0,2))}if(s==='S8'){return shuffle(it.filter(x=>x.listen)).slice(0,4).concat(shuffle(it.filter(x=>x.mcq)).slice(0,2))}return shuffle(it).slice(0,PLAN[s])};
 EX={t0:Date.now(),secs:SECS.map(s=>({s:s.id,items:pick(s.id)}))};
 return `${crumbs('Examen blanc')}<div class="mt-paper card fn-paper"><div class="mt-ph"><h1>法語文法 期末考 · Part 1</h1><p>Les verbes en « -er » au présent · Nom : <u>Lionel</u> · ⏱️ <span id="eT">0:00</span></p><p class="mt-small">Format built from your textbook exercises (unités 6-8) & class slides. 題型依課本練習與上課投影片設計。${slowBtn()}</p></div>${accBar()}
 ${EX.secs.map((S,si)=>{const s=secOf(S.s);return `<section><h3>${['I','II','III','IV','V','VI','VII','VIII'][si]}. ${esc(INSTR[S.s][0])} <span class="badge">${PTS[S.s]} pts</span></h3><p class="mt-small">${esc(INSTR[S.s][1])} · ${esc(INSTR[S.s][2])}</p>
 ${S.items.map((x,j)=>{const id=`e_${si}_${j}`;if(x.listen||x.mcq)return `<div class="fn-mcq" id="${id}"><p>${j+1}. ${x.listen?`<button type="button" class="say say-inline" data-fnsay="${esc(x.full)}" data-twice="1">🔊 Écouter</button>`:esc(x.q)}</p>${shuffle(x.ch).map(o=>`<label><input type="radio" name="${id}" value="${esc(o)}">${esc(o)}</label>`).join('')}</div>`;
  const wide=x.s==='S4'||x.s==='S5'||x.s==='S7';return `<div class="fn-sec-q">${j+1}. ${wide?`${esc(x.q)}<br>${inp(id,'','wide')}`:esc(x.q).replace('___',inp(id,'','x'))}<span class="fn-mark" id="m${id}"></span></div>`}).join('')}</section>`}).join('')}
 <div class="actions"><button class="btn btn-primary" id="eSub">📤 Rendre la copie · Submit</button></div><div id="eRes"></div></div>`}
function bindExam(){loadAudio();const t=setInterval(()=>{const e=$('#eT');if(!e){clearInterval(t);return}const s=(Date.now()-EX.t0)/1000|0;e.textContent=(s/60|0)+':'+String(s%60).padStart(2,'0')},1000);
 $('#eSub').onclick=()=>{if(EX.done)return;const blanks=document.querySelectorAll('.fn-paper input[type=text]');const empty=[...blanks].filter(b=>!b.value.trim()).length;if(empty&&!confirm(`${empty} blank(s) — submit anyway? 還有空白，確定交卷？`))return;
  EX.done=1;clearInterval(t);let total=0;const rows=[],wrong=[];
  EX.secs.forEach((S,si)=>{let got=0;S.items.forEach((x,j)=>{const id=`e_${si}_${j}`;let v,g;
   if(x.listen||x.mcq){const c=document.querySelector(`input[name="${id}"]:checked`);v=c?c.value:'';g={r:norm(v)===norm(x.a[0])?2:0};document.querySelectorAll(`#${id} label`).forEach(l=>{const val=l.querySelector('input').value;if(norm(val)===norm(x.a[0]))l.classList.add('ok');else if(val===v)l.classList.add('bad');l.querySelector('input').disabled=true})}
   else{const el=$('#'+id);v=el.value;g=grade(x,v);el.disabled=true;$('#m'+id).innerHTML=g.r===2?'✅':g.r===1?'🟡 '+esc(x.a[0]):'❌ '+esc(x.a[0])}
   const sc=g.r===2?1:g.r===1?.5:0;got+=sc;mark(x.id,g.r===2);if(sc<1)wrong.push({x,v,g})});
   const pts=Math.round(got/S.items.length*PTS[S.s]*10)/10;total+=pts;rows.push([S.s,got,S.items.length,pts])});
  total=Math.round(total);const secs=(Date.now()-EX.t0)/1000|0;const best=st.get('examBest',null);if(best==null||total>best){st.set('examBest',total)}
  const hist=st.get('examHist',[]);hist.unshift({d:new Date().toLocaleDateString('zh-TW'),s:total,t:secs});st.set('examHist',hist.slice(0,8));xp(Math.round(total/5));checkM();sfx(total>=60);if(total>=80)H().confetti&&H().confetti();
  $('#eRes').innerHTML=`<div class="mt-result"><div class="big">${total>=90?'🏆':total>=70?'🎉':total>=60?'🙂':'💪'}</div><h2>${total} / 100</h2><p>⏱️ ${(secs/60|0)} min ${secs%60} s · ${best!=null&&total>best?'Nouveau record ! ':''}Best: ${Math.max(total,best||0)}</p>
  <table class="tbl">${rows.map(([s,g,n,p])=>`<tr><td>${secOf(s).emo} ${esc(secOf(s).fr)}</td><td>${g}/${n}</td><td><b>${p}</b> / ${PTS[s]}</td></tr>`).join('')}</table>
  <p class="mt-small">History · 歷次成績：${hist.slice(0,8).map(h=>h.s).join(' · ')}</p></div>
  ${wrong.length?`<h3>🩹 Correction · 錯題檢討 (${wrong.length})</h3>${wrong.map(w=>`<div class="card" style="margin:8px 0"><p><span class="badge">${secOf(w.x.s).emo}</span> <b>${esc(w.x.listen?'🎧 écoute':w.x.q)}</b></p><p>✍️ ${esc(w.v||'—')}${w.x.s==='S4'&&w.v?`<br>✅ ${diff(w.v,w.x.a[0])}`:`<br>✅ <b>${esc(w.x.a[0])}</b>`}</p>${expl(w.x)}</div>`).join('')}`:'<p>🎉 Sans faute ! Perfect paper!</p>'}
  <div class="actions" style="justify-content:center"><a class="btn btn-primary" href="#/final/exam/${Date.now()}">↻ Nouvel examen</a><a class="btn btn-ghost" href="#/final/errors">🩹 Mes erreurs</a></div>`;$('#eRes').scrollIntoView({behavior:'smooth'})}}
/* ---------- RULES ---------- */
function rules(){const ex=(inf)=>{const v=VB.find(x=>x.inf===inf);return `<tr><td><b>${inf}</b> ${sayBtn(inf)}</td><td>${v.f.map((f,i)=>esc(subj(i,f)+(subj(i,f).endsWith("'")?'':'')+f)).filter((_,i)=>i===0||i===3||i===5).join(' · ')}</td></tr>`};
 return `${crumbs('Cheat-sheet')}<div class="lesson-head" style="--c:#46178f"><h1>📌 Cheat-sheet</h1><p>Everything for Part 1 · 第一部分重點整理 · FR / 中 / EN</p></div><div class="grid g2 mt-rules fn">
 <div class="card"><h3>🧩 -er endings · 規則字尾</h3><table class="tbl">${['je chante','tu chantes','il/elle/on chante','nous chantons','vous chantez','ils/elles chantent'].map((s,i)=>`<tr><td>${s.replace(/(e|es|ons|ez|ent)$/,'<b style="color:#ef4135">$1</b>')}</td><td>${sayBtn(['je chante','tu chantes','il chante','nous chantons','vous chantez','ils chantent'][i])}</td><td class="mt-small">${[0,1,2,5].includes(i)?'🔇 muet':'🔊 '+(i===3?'[ɔ̃]':'[e]')}</td></tr>`).join('')}</table>
 <p class="mt-small">🇹🇼 去 -er，加 e, es, e, ons, ez, ent。-e/-es/-ent 不發音，所以 je parle = tu parles = il parle = ils parlent [paʁl]。<br>🇬🇧 Drop -er, add the endings. -e, -es, -ent are silent.</p></div>
 <div class="card"><h3>👤 Élision · 省音</h3><p><b>je → j'</b> before a vowel or h: j'aime, j'écoute, j'habite, j'étudie, j'arrive, j'achète, j'appelle.</p><p>But: je parle, je regarde, je mange, je travaille.</p><p class="mt-small">🇹🇼 je 在母音或 h 前變 j'。否定也一樣：ne → n'（je n'aime pas）。</p></div>
 <div class="card"><h3>🎧 Liaison · 連音</h3><p>ils / elles + vowel → <b>[z]</b>: ils‿écoutent [ilzekut], elles‿aiment [ɛlzɛm].</p><p>il écoute [ilekut] (no z) ≠ ils écoutent [ilzekut] → the only way to hear singular vs plural!</p><p class="mt-small">🇹🇼 ils/elles 後接母音要連音 [z]；單複數只能靠連音聽出來。</p></div>
 <div class="card"><h3>❓ Questions & négation</h3><p>Vous parlez anglais ? · <b>Est-ce que</b> Marie travaille ?</p><p>Non, je <b>ne</b> parle <b>pas</b> anglais. · Non, je <b>n'</b>habite <b>pas</b> en France.</p><p><b>on</b> = nous (Igor et moi, on parle russe) or people in general (En Russie, on parle russe). Verb like il: on danse.</p><p class="mt-small">🇹🇼 否定 ne＋動詞＋pas；母音前 n'。on 可指「我們」或「一般人」，動詞同 il。</p></div>
 <div class="card"><h3>✨ Verbes particuliers · 特殊字根</h3><table class="tbl">${['acheter','promener','préférer','espérer','jeter','appeler','manger','voyager','commencer','payer','envoyer','essuyer'].map(ex).join('')}</table>
 <p class="mt-small">🇹🇼 「靴子型」：je, tu, il/elle, ils/elles 變（è、雙子音、i），nous/vous 不變。<br>🇬🇧 "Boot" pattern: je/tu/il/ils change, nous/vous keep the infinitive stem.</p></div>
 <div class="card"><h3>🙋 -oyer / -uyer ? (your question)</h3><p><b>y → i</b> before a silent ending (je, tu, il, ils): j'envoie, tu nettoies, il essuie, ils envoient. Keep <b>y</b> with nous/vous: nous envoyons, vous essuyez.</p><p>-ayer: both OK — je paie / je paye; nous payons.</p><p class="mt-small">🇹🇼 -oyer／-uyer 一定要把 y 改 i（只有 nous/vous 保留 y）；-ayer 兩種都可以。</p></div>
 <div class="card"><h3>🔤 être & avoir (in Part 1 sentences)</h3><table class="tbl"><tr><td>je suis · j'ai</td></tr><tr><td>tu es · tu as</td></tr><tr><td>il est · il a</td></tr><tr><td>nous sommes · nous avons</td></tr><tr><td>vous êtes · vous avez</td></tr><tr><td>ils sont · ils ont</td></tr></table><p class="mt-small">Tu n'as pas froid · Nous sommes fatigués · Ils sont contents. nos amis → <b>leurs</b> amis.</p></div>
 <div class="card"><h3>🗓️ Vocabulaire des notes</h3><p>lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche · la ville 城市 · la campagne 鄉下 · le village · la banlieue 郊區 · mon / ma / mes 我的 · mes collègues 我的同事 · avoir sommeil 想睡 · avoir faim 餓</p></div>
 </div>`}
/* ---------- ROUTER ---------- */
window.FINAL={route(h){const m=h[1]||'',a=h[2];let html,after;loadAudio();
 if(m==='exam'){html=exam();after=bindExam}else if(m==='kahoot'){html=kahoot(a);after=()=>bindKahoot(a)}else if(m==='listen'){html=listen();after=bindListen}
 else if(m==='dictee'){html=dictee();after=bindDictee}else if(m==='boss'){html=boss(a);after=()=>bindBoss(a)}else if(m==='conj'){html=conj(a);after=()=>bindConj(a)}
 else if(m==='match'){html=match();after=bindMatch}else if(m==='errors'){html=errors();after=bindErrors}else if(m==='rules'){html=rules()}else{html=home();after=bindHome}
 return{html:`<div class="mt fn">${html}</div>`,after}},mastery:totalM,ALL,grade,_ex:()=>EX};
})();
