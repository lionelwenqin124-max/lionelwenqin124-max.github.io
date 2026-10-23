(function(){
'use strict';
const D=window.DATA, $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const main=$('#main'), P='phon12_';
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
/* ---------- storage ---------- */
const S={get(k,d){try{const v=localStorage.getItem(P+k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem(P+k,JSON.stringify(v))}catch(e){}}};
let st=S.get('state',{xp:0,streak:0,last:'',done:{},battle:[],mock:[],lab:{}});
function save(){S.set('state',st);hud()}
function today(){const d=new Date();return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()}
function addXP(n){st.xp+=n;const t=today();if(st.last!==t){const y=new Date(Date.now()-864e5);const ys=y.getFullYear()+'-'+(y.getMonth()+1)+'-'+y.getDate();st.streak=st.last===ys?st.streak+1:1;st.last=t}save()}
function hud(){$('#xp b').textContent=st.xp;$('#streak b').textContent=st.streak}
function mark(key,ok){st.done[key]=ok?1:0;save()}
function say(t){try{const u=new SpeechSynthesisUtterance(t);u.lang='en-US';const v=speechSynthesis.getVoices().find(v=>/en[-_]US/i.test(v.lang));if(v)u.voice=v;u.rate=S.get('rate',0.9);speechSynthesis.cancel();speechSynthesis.speak(u)}catch(e){}}
function live(m){const l=$('#live');l.textContent='';setTimeout(()=>l.textContent=m,30)}
function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(toast.h);toast.h=setTimeout(()=>t.classList.remove('show'),1400)}
let timers=[];function clearTimers(){timers.forEach(clearInterval);timers=[]}
/* ---------- answer checking ---------- */
const norm=s=>String(s).toLowerCase().replace(/\(.*?\)/g,' ').replace(/[^a-z\u00c0-\u024f ]/g,' ').replace(/\b(the|a|an)\b/g,' ').replace(/\s+/g,' ').trim();
function okBlank(v,acc){const n=norm(v);return !!n&&acc.some(a=>norm(a)===n||norm(a)+'s'===n||norm(a)===n+'s')}
function checkFill(item,vals){const acc=item[1],any=item[3]==='any';const res=[];
 if(any){const used=new Set();vals.forEach(v=>{let hit=-1;acc.forEach((a,i)=>{if(hit<0&&!used.has(i)&&okBlank(v,a))hit=i});if(hit>=0)used.add(hit);res.push(hit>=0)})}
 else vals.forEach((v,i)=>res.push(okBlank(v,acc[i])));return res}
const official=item=>item[1].map(a=>a[0]);
function fillHTML(item,idp){let i=0;return esc(item[0]).replace(/___/g,()=>`<label class="sr" for="${idp}${i}">blank ${i+1}</label><input id="${idp}${i++}" autocomplete="off" autocapitalize="off" spellcheck="false">`)}
const keyText=item=>{let i=0;return esc(item[0]).replace(/___/g,()=>'<u><b>'+esc(item[1][i++][0])+'</b></u>')};
/* ---------- router ---------- */
const routes={'':home,learn,ex,lab,battle,mock,ipa};
function go(){clearTimers();try{speechSynthesis.cancel()}catch(e){}
 const h=location.hash.replace(/^#\/?/,'').split('/');const r=routes[h[0]]?h[0]:'';
 $$('[data-nav]').forEach(a=>{if(a.dataset.nav===r)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
 routes[r](h.slice(1));window.scrollTo(0,0);if(r)main.focus({preventScroll:true})}
window.addEventListener('hashchange',go);
$('#themeBtn').onclick=()=>{const t=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=t;S.set('theme',t)};
/* store theme as raw string for the inline head script */
const _st=S.set;S.set=(k,v)=>{if(k==='theme'){try{localStorage.setItem(P+'theme',v)}catch(e){}}else _st(k,v)};
/* ---------- HOME ---------- */
function pct(prefix,total){const n=Object.keys(st.done).filter(k=>k.startsWith(prefix)&&st.done[k]).length;return Math.round(100*n/total)}
function home(){
 const tfN=D.tf[1].length+D.tf[2].length,fN=D.fill[1].length+D.fill[2].length;
 const tiles=[['learn','Learn','Bilingual summaries & '+D.terms.length+' flip cards with audio.',pct('t',D.terms.length)],
 ['ex','Exercises','The exact textbook T/F ('+tfN+') and fill-ins ('+fN+'), plus model answers.',pct('e',tfN+fN)],
 ['lab','Diagram Lab','Label Figure 1 — the key scoring item. Learn, Practice, timed Exam.',pct('d',D.diagram.length)],
 ['battle','Quiz Battle','Kahoot-style: countdown, speed points, streaks, podium.',null],
 ['mock','Mock Midterm','Randomized 30-item test with score and mistake review.',null],
 ['ipa','IPA · KK · TS','Symbol drill from Ch.1 Q3 (a–v): which system?',pct('s',D.symbols.length)]];
 main.innerHTML=`<section class="hero"><div><p class="kicker">期中考 · Midterm · Chapters 1 & 2</p>
 <h1>How we make <span class="hl">speech</span>, one organ at a time.</h1>
 <p class="lede">Your study lab for <i>American English Phonetics</i>: basic concepts of phonetics, and the three systems of speech production. Start with the diagram — it’s the item most likely to be scored.</p>
 <div class="row"><a class="btn primary" href="#/lab">Open the Diagram Lab →</a><a class="btn" href="#/battle">Quiz Battle ⚡</a></div></div>
 <figure class="paper" style="margin:0"><img src="fig1.svg" alt="Line diagram of the systems of speech production, adapted from Figure 1 of the textbook, labels removed"></figure></section>
 <div class="grid g3">${tiles.map(t=>`<a class="card tile" href="#/${t[0]}"><span class="tag">${t[1]}</span><h3>${t[1]}</h3><p>${t[2]}</p>${t[3]!=null?`<div class="bar" aria-label="${t[3]}% done"><i style="width:${t[3]}%"></i></div>`:''}</a>`).join('')}</div>
 <p class="kicker" style="margin-top:32px">Best Quiz Battle: ${Math.max(0,...st.battle)} pts · Best mock: ${st.mock.length?Math.max(...st.mock)+'%':'—'}</p>`}
/* ---------- LEARN ---------- */
function learn(a){const ch=+(a[0]||1);
 const c=D.chapters[ch-1],terms=D.terms.filter(t=>t[4]===ch);
 main.innerHTML=`<div class="section-head"><p class="kicker">Learn · 學習</p><h1>Chapter ${ch===1?'One':'Two'}: <span class="hl">${c.title}</span></h1><p>${c.zh}</p></div>
 <div class="row" style="margin-bottom:24px"><div class="seg" role="group" aria-label="Chapter"><button aria-pressed="${ch===1}" data-c="1">Chapter 1</button><button aria-pressed="${ch===2}" data-c="2">Chapter 2</button></div>
 <label class="row" style="gap:8px">Voice speed <input type="range" id="rate" min="0.5" max="1.2" step="0.1" value="${S.get('rate',0.9)}"></label></div>
 <section class="card"><h2>Summary · 重點摘要</h2><ol class="sum">${c.summary.map(s=>`<li>${esc(s[0])}<span class="zh" lang="zh-Hant">${esc(s[1])}</span></li>`).join('')}</ol></section>
 <h2 style="margin-top:32px">Key terms · 關鍵詞 <span class="kicker">(${terms.length} cards — tap to flip)</span></h2>
 <div class="flips">${terms.map((t,i)=>`<div class="flip" role="button" tabindex="0" aria-pressed="false" data-i="${D.terms.indexOf(t)}" aria-label="${esc(t[0])} flip card"><div class="in"><div class="f"><span class="chip-ch">CH${t[4]}</span><h3>${esc(t[0])}</h3><span class="zh" lang="zh-Hant">${esc(t[1])}</span></div><div class="b"><b>${esc(t[0])}</b><span class="ipa">${esc(t[2])}</span><button class="say" data-say="${esc(t[3])}" aria-label="Play ${esc(t[3])}">🔊 ${esc(t[3])}</button></div></div></div>`).join('')}</div>`;
 $$('.seg button',main).forEach(b=>b.onclick=()=>location.hash='#/learn/'+b.dataset.c);
 $('#rate').oninput=e=>S.set('rate',+e.target.value);
 $$('.flip',main).forEach(f=>{const t=()=>{f.classList.toggle('on');f.setAttribute('aria-pressed',f.classList.contains('on'));if(f.classList.contains('on')){const k='t'+f.dataset.i;if(!st.done[k]){mark(k,1);addXP(2)}}};
  f.onclick=e=>{if(e.target.closest('.say')){e.stopPropagation();say(e.target.closest('.say').dataset.say);return}t()};
  f.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();t()}}})}
/* ---------- EXERCISES ---------- */
function ex(a){const ch=+(a[0]||1),type=a[1]||'tf',mode=a[2]||'practice';
 const head=`<div class="section-head"><p class="kicker">Exercises · 課本練習</p><h1>Chapter ${ch} <span class="hl">${type==='tf'?'True or False':type==='fill'?'Fill in the blanks':'Questions'}</span></h1><p>Exact items from the textbook, checked against the official answer key.</p></div>
 <div class="row" style="margin-bottom:24px;gap:16px">
 <div class="seg" role="group" aria-label="Chapter">${[1,2].map(c=>`<button aria-pressed="${c===ch}" data-h="#/ex/${c}/${type}/${mode}">Ch ${c}</button>`).join('')}</div>
 <div class="seg" role="group" aria-label="Type">${[['tf','True/False'],['fill','Fill-in'],['q','Questions']].map(t=>`<button aria-pressed="${t[0]===type}" data-h="#/ex/${ch}/${t[0]}/${mode}">${t[1]}</button>`).join('')}</div>
 ${type!=='q'?`<div class="seg" role="group" aria-label="Mode">${['practice','exam'].map(m=>`<button aria-pressed="${m===mode}" data-h="#/ex/${ch}/${type}/${m}">${m[0].toUpperCase()+m.slice(1)}</button>`).join('')}</div>`:''}</div><div id="exbody"></div>`;
 main.innerHTML=head;$$('[data-h]',main).forEach(b=>b.onclick=()=>location.hash=b.dataset.h);
 const body=$('#exbody');
 if(type==='q'){body.innerHTML=D.questions[ch].map((q,i)=>`<details class="card qa" style="margin-bottom:16px"><summary>${i+1}. ${esc(q[0])}</summary><div class="model"><span class="badge">Model answer</span><p>${esc(q[1])}</p></div></details>`).join('')+(ch===1?'<p><a class="btn" href="#/ipa">Q3 symbol drill →</a></p>':'<p><a class="btn" href="#/lab">Q4: practise the diagram →</a></p>');return}
 const items=type==='tf'?D.tf[ch]:D.fill[ch];
 if(mode==='practice'){let i=0;
  const draw=()=>{if(i>=items.length){const n=items.filter((_,k)=>st.done[`e${ch}${type}${k}`]).length;body.innerHTML=`<div class="card"><h2>Done! ${n}/${items.length} correct so far</h2><div class="row"><button class="btn primary" id="again">Practise again</button><a class="btn" href="#/ex/${ch}/${type}/exam">Try exam mode</a></div></div>`;$('#again').onclick=()=>{i=0;draw()};return}
   const it=items[i];
   body.innerHTML=`<div class="card"><div class="progress"><span>${type==='tf'?'T/F':'Fill-in'} ${i+1} / ${items.length}</span><span>Ch ${ch}</span></div>
   ${type==='tf'?`<p class="q">${i+1}. ${esc(it[0])}</p><div class="tfb"><button class="btn" data-v="1">T · True</button><button class="btn" data-v="0">F · False</button></div>`
   :`<p class="q">${i+1}. ${fillHTML(it,'b')}</p><div class="row"><button class="btn primary" id="checkBtn">Check</button><button class="btn" id="showBtn">Show answer</button></div>`}
   <div class="fb" id="fb" aria-live="polite"></div><div class="row" style="margin-top:16px"><button class="btn blue" id="nextBtn" hidden>Next →</button></div></div>`;
   const fb=$('#fb'),fin=(ok,msg)=>{fb.className='fb show '+(ok?'ok':'no');fb.innerHTML=msg;live((ok?'Correct. ':'Not quite. ')+fb.textContent);$('#nextBtn').hidden=false;$('#nextBtn').focus();mark(`e${ch}${type}${i}`,ok);if(ok)addXP(10)};
   if(type==='tf'){$$('[data-v]',body).forEach(b=>b.onclick=()=>{const v=b.dataset.v==='1',ok=v===it[1];$$('[data-v]',body).forEach(x=>x.disabled=true);fin(ok,`<b>${ok?'✓ Correct':'✗ Not quite'} — the answer is ${it[1]?'T (True)':'F (False)'}.</b>${esc(it[2])}`)})}
   else{const ins=$$('input',body);ins[0].focus();ins.forEach(x=>x.onkeydown=e=>{if(e.key==='Enter')$('#checkBtn').click()});
    $('#checkBtn').onclick=()=>{const r=checkFill(it,ins.map(x=>x.value));ins.forEach((x,k)=>x.className=r[k]?'ok':'no');const ok=r.every(Boolean);$('#checkBtn').disabled=true;$('#showBtn').disabled=true;fin(ok,`<b>${ok?'✓ Correct':'✗ Not quite'}</b>Key: ${keyText(it)}${it[2]?'<br><small>'+esc(it[2])+'</small>':''}`)};
    $('#showBtn').onclick=()=>{ins.forEach((x,k)=>{x.value=it[1][k][0];x.className='no'});$('#checkBtn').disabled=true;$('#showBtn').disabled=true;fin(false,`<b>Answer</b>${keyText(it)}`)}}
   $('#nextBtn').onclick=()=>{i++;draw()}};draw()}
 else{body.innerHTML=`<form id="exam" class="card"><p class="kicker">Exam mode — answer everything, then submit. No hints.</p>${items.map((it,k)=>`<div class="exq" style="padding:12px 0;border-bottom:1px solid var(--line)">${type==='tf'?`<p class="q" style="font-size:1.1rem">${k+1}. ${esc(it[0])}</p><div class="seg" role="radiogroup" aria-label="Answer ${k+1}"><button type="button" aria-pressed="false" data-k="${k}" data-v="1">T</button><button type="button" aria-pressed="false" data-k="${k}" data-v="0">F</button></div>`:`<p class="q" style="font-size:1.1rem">${k+1}. ${fillHTML(it,'x'+k+'_')}</p>`}<div class="fb" data-fb="${k}"></div></div>`).join('')}
  <div class="row" style="margin-top:16px"><button class="btn primary" id="submitBtn" type="submit">Submit</button></div><div id="res" aria-live="polite"></div></form>`;
  const ans={};$$('[data-v]',body).forEach(b=>b.onclick=()=>{ans[b.dataset.k]=b.dataset.v==='1';$$(`[data-k="${b.dataset.k}"]`,body).forEach(x=>x.setAttribute('aria-pressed',x===b))});
  $('#exam').onsubmit=e=>{e.preventDefault();let n=0;items.forEach((it,k)=>{let ok,msg;const f=$(`[data-fb="${k}"]`,body);
   if(type==='tf'){ok=ans[k]===it[1];msg=`Answer: <b>${it[1]?'T':'F'}</b> — ${esc(it[2])}`}else{const ins=$$(`input[id^="x${k}_"]`,body);const r=checkFill(it,ins.map(x=>x.value));ins.forEach((x,j)=>x.className=r[j]?'ok':'no');ok=r.every(Boolean);msg='Key: '+keyText(it)}
   if(ok)n++;mark(`e${ch}${type}${k}`,ok);f.className='fb show '+(ok?'ok':'no');f.innerHTML=(ok?'✓ ':'✗ ')+msg});
   addXP(n*5);const p=Math.round(100*n/items.length);$('#res').innerHTML=`<h2 style="margin-top:16px">Score: <span class="hl">${n}/${items.length} (${p}%)</span></h2>`;live(`Score ${n} out of ${items.length}`);$('#submitBtn').disabled=true}}}
/* ---------- DIAGRAM LAB ---------- */
function labSet(set){return D.diagram.filter(d=>set==='all'||d[6]===set)}
function lab(a){const mode=a[0]||'learn',set=a[1]||'fig',lang=S.get('lang','both');const items=labSet(set);
 main.innerHTML=`<div class="section-head"><p class="kicker">Diagram Lab · 圖解實驗室 · Figure 1, p. 13</p><h1>The systems of <span class="hl">speech production</span></h1><p>The textbook marks this diagram for the midterm (期中考). Learn every label, practise placing them, then sit the timed exam.</p></div>
 <div class="row" style="margin-bottom:16px;gap:16px"><div class="seg" role="group" aria-label="Mode">${[['learn','Learn'],['practice','Practice'],['exam','Exam ⏱']].map(m=>`<button aria-pressed="${m[0]===mode}" data-h="#/lab/${m[0]}/${set}">${m[1]}</button>`).join('')}</div>
 <div class="seg" role="group" aria-label="Label set">${[['fig','Figure 1 (22)'],['tongue','Tongue parts (4)'],['all','All (26)']].map(m=>`<button aria-pressed="${m[0]===set}" data-h="#/lab/${mode}/${m[0]}">${m[1]}</button>`).join('')}</div>
 <div class="seg" role="group" aria-label="Label language">${[['en','EN'],['zh','中文'],['both','EN+中文']].map(m=>`<button aria-pressed="${m[0]===lang}" data-lang="${m[0]}">${m[1]}</button>`).join('')}</div></div>
 <div class="labwrap"><div><div class="dia" id="dia"><img src="fig1.svg?v=${window.V||1}" alt="Diagram of the systems of speech production (labels removed)"></div></div><aside id="side" class="card"></aside></div>`;
 $$('[data-h]',main).forEach(b=>b.onclick=()=>location.hash=b.dataset.h);
 $$('[data-lang]',main).forEach(b=>b.onclick=()=>{S.set('lang',b.dataset.lang);lab(a)});
 const dia=$('#dia'),side=$('#side');
 const name=d=>lang==='en'?esc(d[1]):lang==='zh'?esc(d[2]):`${esc(d[1])} <small lang="zh-Hant">${esc(d[2])}</small>`;
 const NUD={nasopharynx:-7,velum:7,epiglottis:-6,laryngopharynx:6,lips:-4,teeth:4,oropharynx:2};const pos=d=>`left:${d[3]}%;top:calc(${d[4]}% + ${NUD[d[0]]||0}px)`;
 const nameTxt=d=>lang==='zh'?d[2]:d[1];
 if(mode==='learn'){
  items.forEach((d,i)=>{dia.insertAdjacentHTML('beforeend',`<span class="dot" style="left:${d[3]}%;top:${d[4]}%"></span><button class="lbl ${d[5]}${set==='all'&&d[6]==='tongue'?' numonly':''}" style="${pos(d)}" data-id="${d[0]}" aria-label="${esc(d[1])} ${esc(d[2])}"><span class="n">${i+1}</span><span class="t">${name(d)}</span></button>`)});
  side.innerHTML=`<h3>Labels</h3><p class="kicker">Tap a label to hear it</p><ol class="legend">${items.map(d=>`<li><button class="linkish" data-id="${d[0]}" style="border:0;background:none;color:inherit;font:inherit;cursor:pointer;padding:2px;text-align:left">${esc(d[1])} <span lang="zh-Hant" style="color:var(--muted)">${esc(d[2])}</span></button></li>`).join('')}</ol><div id="info" class="fb show" aria-live="polite" style="border-color:var(--yellow)">Systems: supralaryngeal (top), laryngeal (middle), respiratory (bottom).</div>`;
  $$('[data-id]',main).forEach(b=>b.onclick=()=>{const d=D.diagram.find(x=>x[0]===b.dataset.id);say(d[1].replace(/\(.*\)/,''));const t=D.terms.find(t=>t[0].toLowerCase().startsWith(d[1].toLowerCase().split(' (')[0]));$('#info').innerHTML=`<b>${esc(d[1])} · ${esc(d[2])}</b>${t?esc(t[2]):''}`;if(!st.done['d'+d[0]]){st.done['d'+d[0]]=0;save()}});
  return}
 /* practice & exam: slots */
 const order=shuffle(items);const placed={};let sel=null;const exam=mode==='exam';
 items.forEach((d,i)=>dia.insertAdjacentHTML('beforeend',`<span class="dot" style="left:${d[3]}%;top:${d[4]}%"></span><button class="slot ${d[5]}" style="${pos(d)}" data-slot="${d[0]}" aria-label="Slot ${i+1}, empty"><span class="n">${i+1}</span><span class="t">${i+1}</span></button>`));
 side.innerHTML=`${exam?`<div class="row" style="justify-content:space-between"><h3>Exam</h3><span class="timer" id="timer" role="timer" aria-live="off"></span></div>`:'<h3>Practice</h3>'}
 <p class="kicker">${'ontouchstart' in window?'Tap a label, then tap its spot':'Drag a label onto its spot — or click label, then spot'}</p>
 <div class="bank" id="bank">${order.map(d=>`<button class="chip" draggable="true" data-chip="${d[0]}" aria-pressed="false">${lang==='zh'?esc(d[2]):esc(d[1])}${lang==='both'?' · '+esc(d[2]):''}</button>`).join('')}</div>
 <p id="lstat" aria-live="polite" style="font-weight:700;margin:12px 0 4px"></p>
 <ol class="legend" id="plist">${items.map((d,i)=>`<li data-pl="${d[0]}">—</li>`).join('')}</ol>
 <div class="row" style="margin-top:12px">${exam?'<button class="btn primary" id="submitLab">Submit</button>':''}<button class="btn" id="resetLab">Reset</button></div><div id="labres" aria-live="polite"></div>`;
 const stat=$('#lstat');let right=0,tries=0;
 const upd=()=>{if(!exam)stat.textContent=`${right} / ${items.length} correct · ${tries} tries`;else stat.textContent=`${Object.keys(placed).length} / ${items.length} placed`;
  items.forEach((d,i)=>{const li=$(`[data-pl="${d[0]}"]`);const c=placed[d[0]];li.textContent=c?D.diagram.find(x=>x[0]===c)[lang==='zh'?2:1]:'—'})};
 function place(slotId,chipId){const slot=$(`[data-slot="${slotId}"]`,dia);const d=D.diagram.find(x=>x[0]===chipId);
  if(!exam){tries++;if(chipId===slotId){placed[slotId]=chipId;slot.className=slot.className.replace(/\b(fill|no)\b/g,'')+' ok';slot.querySelector('.t').innerHTML=name(d);slot.disabled=true;$(`[data-chip="${chipId}"]`).classList.add('used');right++;addXP(3);if(!st.done['d'+slotId])mark('d'+slotId,1);live('Correct: '+d[1]);toast('✓ '+nameTxt(d))}
   else{slot.classList.add('no');setTimeout(()=>slot.classList.remove('no'),600);live('Not there. Try again.');toast('✗ Not there')}
   if(right===items.length){$('#labres').innerHTML=`<div class="fb show ok"><b>All ${items.length} placed!</b>Accuracy ${Math.round(100*right/tries)}% (${tries} tries).</div>`;st.lab[set+'_p']=Math.max(st.lab[set+'_p']||0,Math.round(100*right/tries));save()}}
  else{for(const k in placed)if(placed[k]===chipId){delete placed[k];const s=$(`[data-slot="${k}"]`,dia);s.classList.remove('fill');s.querySelector('.t').textContent=items.findIndex(x=>x[0]===k)+1}
   if(placed[slotId])$(`[data-chip="${placed[slotId]}"]`).classList.remove('used');
   placed[slotId]=chipId;slot.classList.add('fill');slot.querySelector('.t').innerHTML=name(d);$(`[data-chip="${chipId}"]`).classList.add('used')}
  sel=null;$$('.chip',side).forEach(c=>c.setAttribute('aria-pressed','false'));upd()}
 $$('.chip',side).forEach(c=>{c.onclick=()=>{sel=sel===c.dataset.chip?null:c.dataset.chip;$$('.chip',side).forEach(x=>x.setAttribute('aria-pressed',x.dataset.chip===sel))};
  c.ondragstart=e=>{e.dataTransfer.setData('text/plain',c.dataset.chip)}});
 $$('.slot',dia).forEach(s=>{s.onclick=()=>{if(sel)place(s.dataset.slot,sel);else if(exam&&placed[s.dataset.slot]){const c=placed[s.dataset.slot];delete placed[s.dataset.slot];s.classList.remove('fill');s.querySelector('.t').textContent=items.findIndex(x=>x[0]===s.dataset.slot)+1;$(`[data-chip="${c}"]`).classList.remove('used');upd()}else toast('Pick a label first')};
  s.ondragover=e=>{e.preventDefault();s.classList.add('drop')};s.ondragleave=()=>s.classList.remove('drop');
  s.ondrop=e=>{e.preventDefault();s.classList.remove('drop');const id=e.dataTransfer.getData('text/plain');if(id)place(s.dataset.slot,id)}});
 $('#resetLab').onclick=()=>lab(a);
 if(exam){let left=Math.max(60,items.length*10);const tm=$('#timer');const tick=()=>{tm.textContent=Math.floor(left/60)+':'+String(left%60).padStart(2,'0');if(left--<=0){submit(true)}};tick();timers.push(setInterval(tick,1000));
  function submit(auto){clearTimers();let n=0;items.forEach(d=>{const s=$(`[data-slot="${d[0]}"]`,dia);const ok=placed[d[0]]===d[0];if(ok)n++;s.classList.remove('fill');s.classList.add(ok?'ok':'no');s.querySelector('.t').innerHTML=name(d);s.disabled=true;mark('d'+d[0],ok)});
   $$('.chip',side).forEach(c=>c.disabled=true);$('#submitLab').disabled=true;addXP(n*4);const p=Math.round(100*n/items.length);st.lab[set+'_e']=Math.max(st.lab[set+'_e']||0,p);save();
   const wrong=items.filter(d=>placed[d[0]]!==d[0]);
   $('#labres').innerHTML=`<div class="fb show ${p>=80?'ok':'no'}"><b>${auto?'Time’s up! ':''}Score ${n}/${items.length} (${p}%)</b>${wrong.length?'Review: '+wrong.map(d=>`#${items.indexOf(d)+1} = ${esc(d[1])}${placed[d[0]]?' (you put '+esc(D.diagram.find(x=>x[0]===placed[d[0]])[1])+')':''}`).join('; '):'Perfect!'}</div>`;live(`Score ${n} of ${items.length}`)}
  $('#submitLab').onclick=()=>submit(false)}
 upd()}
/* ---------- question pool for Battle & Mock ---------- */
function pool(){const P=[];
 [1,2].forEach(ch=>{D.tf[ch].forEach((t,i)=>P.push({kind:'tf',ch,q:t[0],opts:['True','False'],a:t[1]?0:1,exp:t[2]}));
  const singles=D.fill[ch].flatMap(f=>f[1].map(a=>a[0]));
  D.fill[ch].forEach((f,i)=>{const k=Math.random()*f[1].length|0;let j=0;
   const q=esc(f[0]).replace(/___/g,()=>j++===k?'<span class="hl">_____</span>':'<u>'+esc(f[1][j-1][0])+'</u>');
   const right=f[1][k][0];const ds=shuffle([...new Set(singles.filter(s=>s!==right&&!f[1][k].includes(s)))]).slice(0,3);const opts=shuffle([right,...ds]);
   P.push({kind:'fill',ch,q,html:1,opts,a:opts.indexOf(right),exp:'Key: '+keyText(f)})})});
 D.diagram.forEach(d=>{const ds=shuffle(D.diagram.filter(x=>x!==d)).slice(0,3).map(x=>x[1]);const opts=shuffle([d[1],...ds]);P.push({kind:'dia',ch:2,q:'Which part is marked by the yellow dot?',d,opts,a:opts.indexOf(d[1]),exp:d[1]+' · '+d[2]})});
 D.symbols.forEach(s=>P.push({kind:'sym',ch:1,q:`Ch.1 Q3 (${s[0]}): which system does <span class="ipa">/${esc(s[1])}/</span> belong to?`,html:1,opts:['K.K.','T.S.'],a:s[2]==='K.K.'?0:1,exp:`/${s[1]}/ = ${s[2]} (key word “${s[3]}”, IPA /${s[4]}/)`}));
 return P}
const mini=d=>`<div class="mini"><img src="fig1.svg" alt="Diagram with one part marked"><span class="dot" style="left:${d[3]}%;top:${d[4]}%;width:16px;height:16px;margin:-8px 0 0 -8px"></span></div>`;
/* ---------- QUIZ BATTLE ---------- */
const SH=['▲','◆','●','■'];
function battle(a){
 main.innerHTML=`<div class="section-head"><p class="kicker">Quiz Battle · 搶答對戰</p><h1>Beat the <span class="hl">clock</span>.</h1><p>Kahoot-style: 20 seconds per question, faster answers earn more points, streaks add bonuses. Mixes Ch.1 & Ch.2 T/F, fill-ins, the diagram and IPA/KK/TS symbols.</p></div>
 <div class="card"><div class="row"><label>Questions <select id="nq"><option>10</option><option selected>15</option><option>25</option><option value="999">All</option></select></label>
 <label>Mix <select id="mix"><option value="all">Everything</option><option value="2">Chapter 2 exercises (pp. 19–20)</option><option value="1">Chapter 1 exercises</option><option value="dia">Diagram only</option></select></label>
 <button class="btn primary" id="go">Start ⚡</button></div></div>`;
 $('#go').onclick=()=>{let P=pool();const m=$('#mix').value;if(m==='1'||m==='2')P=P.filter(p=>p.ch==+m&&(p.kind==='tf'||p.kind==='fill'));else if(m==='dia')P=P.filter(p=>p.kind==='dia');
  run(shuffle(P).slice(0,+$('#nq').value))};
 function run(Q){let i=0,score=0,streak=0,best=0,right=0;const T=20;
  const next=()=>{clearTimers();if(i>=Q.length)return end();const q=Q[i];let left=T*10,locked=false;
   main.innerHTML=`<div class="progress"><span>Question ${i+1} / ${Q.length}</span><span>🔥 ${streak} · ${score} pts</span></div><div class="count" aria-hidden="true"><i id="cd" style="width:100%"></i></div>
   <p class="kicker" style="text-align:center;margin-top:16px">${{tf:'True or False',fill:'Fill in the blank',dia:'Diagram',sym:'IPA · KK · TS'}[q.kind]} · Ch ${q.ch} · <span id="secs" aria-live="off">${T}</span>s</p>
   <p class="bt-q">${q.html?q.q:esc(q.q)}</p>${q.kind==='dia'?mini(q.d):''}
   <div class="answers" style="margin-top:16px">${q.opts.map((o,k)=>`<button class="ans k${k}" data-k="${k}"><span class="shape" aria-hidden="true">${SH[k]}</span>${esc(o)}</button>`).join('')}</div><div class="fb" id="fb"></div>
   <div class="row" style="margin-top:16px;justify-content:flex-end"><button class="btn blue" id="nextBtn" hidden>${i+1<Q.length?'Next →':'See podium 🏆'}</button></div>`;
   const fin=k=>{if(locked)return;locked=true;clearTimers();const ok=k===q.a;$$('.ans').forEach((b,j)=>{b.disabled=true;if(j===q.a)b.classList.add('right');else b.classList.add('dim')});
    let pts=0;if(ok){streak++;right++;best=Math.max(best,streak);pts=Math.round(500+500*left/(T*10))+100*Math.min(streak-1,5);score+=pts;addXP(5)}else streak=0;
    const fb=$('#fb');fb.className='fb show '+(ok?'ok':'no');fb.innerHTML=`<b>${ok?'✓ +'+pts+' pts'+(streak>1?' · streak '+streak:''):k<0?'⏰ Time’s up':'✗ Wrong'}</b>${q.exp}`;live(fb.textContent);$('#nextBtn').hidden=false;$('#nextBtn').focus()};
   $$('.ans').forEach(b=>b.onclick=()=>fin(+b.dataset.k));$('#nextBtn').onclick=()=>{i++;next()};
   timers.push(setInterval(()=>{left--;$('#cd').style.width=(100*left/(T*10))+'%';if(left%10===0)$('#secs').textContent=left/10;if(left<=0)fin(-1)},100))};
  const end=()=>{clearTimers();const prev=st.battle.slice();st.battle=[...st.battle,score].sort((a,b)=>b-a).slice(0,10);save();
   const board=[...prev.map(s=>({n:'Past you',s})),{n:'You (now)',s:score,me:1},{n:'TA Bot',s:Math.round(Q.length*650)}].sort((a,b)=>b.s-a.s).slice(0,3);
   const pos=[1,0,2].filter(k=>board[k]);
   main.innerHTML=`<div class="section-head" style="text-align:center"><p class="kicker">Final podium</p><p class="score-big">${score} pts</p><p>${right}/${Q.length} correct · best streak ${best}</p></div>
   <div class="podium">${pos.map(k=>`<div class="p${k+1}${board[k].me?' me':''}">${['🥇','🥈','🥉'][k]}<br>${board[k].n}<br>${board[k].s}</div>`).join('')}</div>
   <p style="text-align:center">${board.some(b=>b.me)?'You made the podium! 🎉':'Not on the podium yet — go again!'}</p><div class="row" style="justify-content:center"><button class="btn primary" id="again">Play again</button><a class="btn" href="#/">Home</a></div>`;
   $('#again').onclick=()=>battle()};next()}}
/* ---------- MOCK MIDTERM ---------- */
function mock(){const P=pool();const pick=(k,n)=>shuffle(P.filter(p=>p.kind===k)).slice(0,n);
 const fills=shuffle([1,2].flatMap(ch=>D.fill[ch].map((f,i)=>({ch,f})))).slice(0,10);
 const Q=[...pick('tf',8).map(q=>({...q,t:'mc'})),...fills.map(x=>({t:'fill',...x})),...pick('dia',8).map(q=>({...q,t:'mc'})),...pick('sym',4).map(q=>({...q,t:'mc'}))];
 main.innerHTML=`<div class="section-head"><p class="kicker">Mock midterm · 模擬期中考</p><h1>A fresh <span class="hl">${Q.length}-item</span> test every time.</h1><p>8 True/False · 10 fill-ins (typed, exact textbook items) · 8 diagram labels · 4 IPA/KK/TS. Suggested time 25 minutes.</p></div>
 <div class="row" style="margin-bottom:16px"><span class="timer" id="mt">25:00</span><button class="btn" id="newMock">New test</button></div>
 <form id="mockf">${Q.map((q,k)=>`<div class="card" style="margin-bottom:12px" data-q="${k}"><p class="kicker">${k+1} · ${q.t==='fill'?'Fill in · Ch '+q.ch:{tf:'True/False',dia:'Diagram',sym:'Symbol'}[q.kind]+' · Ch '+q.ch}</p>
 ${q.t==='fill'?`<p class="q" style="font-size:1.1rem">${fillHTML(q.f,'m'+k+'_')}</p>`:`<p class="q" style="font-size:1.1rem">${q.html?q.q:esc(q.q)}</p>${q.kind==='dia'?mini(q.d):''}<div class="seg" role="radiogroup" aria-label="Answer ${k+1}">${q.opts.map((o,j)=>`<button type="button" aria-pressed="false" data-mk="${k}" data-j="${j}">${esc(o)}</button>`).join('')}</div>`}<div class="fb" data-mfb="${k}"></div></div>`).join('')}
 <button class="btn primary" id="submitMock" type="submit">Submit test</button></form><div id="mres" aria-live="polite"></div>`;
 const ans={};$$('[data-mk]').forEach(b=>b.onclick=()=>{ans[b.dataset.mk]=+b.dataset.j;$$(`[data-mk="${b.dataset.mk}"]`).forEach(x=>x.setAttribute('aria-pressed',x===b))});
 $('#newMock').onclick=()=>mock();
 let left=1500;timers.push(setInterval(()=>{left--;$('#mt').textContent=Math.floor(left/60)+':'+String(left%60).padStart(2,'0');if(left<=0)$('#submitMock').click()},1000));
 $('#mockf').onsubmit=e=>{e.preventDefault();clearTimers();let n=0;const miss=[];
  Q.forEach((q,k)=>{let ok,key;if(q.t==='fill'){const ins=$$(`input[id^="m${k}_"]`);const r=checkFill(q.f,ins.map(x=>x.value));ins.forEach((x,j)=>x.className=r[j]?'ok':'no');ok=r.every(Boolean);key=keyText(q.f)}else{ok=ans[k]===q.a;key=esc(q.opts[q.a])+' — '+q.exp}
   if(ok)n++;else miss.push(`<li><b>Q${k+1}.</b> ${key}</li>`);const f=$(`[data-mfb="${k}"]`);f.className='fb show '+(ok?'ok':'no');f.innerHTML=(ok?'✓ ':'✗ Answer: ')+key});
  const p=Math.round(100*n/Q.length);st.mock.push(p);addXP(n*3);$('#submitMock').disabled=true;
  $('#mres').innerHTML=`<div class="card" style="margin-top:16px"><h2>Score: <span class="hl">${n}/${Q.length} · ${p}%</span></h2>${miss.length?`<h3>Review your ${miss.length} mistake${miss.length>1?'s':''}</h3><ol class="review">${miss.join('')}</ol>`:'<p>Perfect score! 🎉</p>'}<button class="btn primary" id="again2">New mock test</button></div>`;
  $('#again2').onclick=()=>mock();$('#mres').scrollIntoView();live(`Score ${p} percent`)}}
/* ---------- IPA / KK / TS ---------- */
function ipa(a){const mode=a[0]||'drill';
 main.innerHTML=`<div class="section-head"><p class="kicker">Ch.1 Question 3 · a–v</p><h1>Is it <span class="hl">K.K.</span> or <span class="hl">T.S.</span>?</h1><p>Kenyon & Knott (K.K.) shares most IPA symbols; Trager & Smith (T.S.) writes glides with y/w and uses š ž č ǰ y.</p></div>
 <div class="seg" role="group" aria-label="Mode" style="margin-bottom:16px"><button aria-pressed="${mode==='drill'}" data-h="#/ipa/drill">Drill</button><button aria-pressed="${mode==='table'}" data-h="#/ipa/table">Answer table</button></div><div id="ib"></div>`;
 $$('[data-h]',main).forEach(b=>b.onclick=()=>location.hash=b.dataset.h);const ib=$('#ib');
 if(mode==='table'){ib.innerHTML=`<div class="card" style="overflow-x:auto"><table class="sym"><thead><tr><th>Q3</th><th>Symbol</th><th>System</th><th>IPA</th><th>Key word</th></tr></thead><tbody>${D.symbols.map(s=>`<tr><td>${s[0]}.</td><td class="ipa">/${esc(s[1])}/</td><td><b>${s[2]}</b></td><td class="ipa">/${esc(s[4])}/</td><td><button class="say" data-say="${s[3]}">🔊 ${s[3]}</button></td></tr>`).join('')}</tbody></table></div>`;$$('.say',ib).forEach(b=>b.onclick=()=>say(b.dataset.say));return}
 const Q=shuffle(D.symbols);let i=0,n=0;
 const draw=()=>{if(i>=Q.length){ib.innerHTML=`<div class="card"><h2>${n}/${Q.length} correct</h2><button class="btn primary" id="again">Again</button></div>`;$('#again').onclick=()=>ipa(a);return}
  const s=Q[i];ib.innerHTML=`<div class="card" style="text-align:center"><div class="progress"><span>${i+1} / ${Q.length}</span><span>Q3 ${s[0]}.</span></div><p class="symbig">/${esc(s[1])}/</p>
  <div class="tfb" style="margin:0 auto"><button class="btn" data-s="K.K.">K.K.</button><button class="btn" data-s="T.S.">T.S.</button></div><div class="fb" id="fb"></div><div class="row" style="justify-content:center;margin-top:12px"><button class="btn blue" id="nextBtn" hidden>Next →</button></div></div>`;
  $$('[data-s]',ib).forEach(b=>b.onclick=()=>{const ok=b.dataset.s===s[2];$$('[data-s]',ib).forEach(x=>x.disabled=true);if(ok){n++;addXP(3)}mark('s'+s[0],ok);const fb=$('#fb');fb.className='fb show '+(ok?'ok':'no');
   fb.innerHTML=`<b>${ok?'✓ Correct':'✗ It’s '+s[2]}</b>/${esc(s[1])}/ is ${s[2]} — IPA /${esc(s[4])}/, as in “${s[3]}”. <button class="say" data-say="${s[3]}">🔊 ${s[3]}</button>`;$('.say',fb).onclick=()=>say(s[3]);live(fb.textContent);$('#nextBtn').hidden=false;$('#nextBtn').focus()});
  $('#nextBtn').onclick=()=>{i++;draw()}};draw()}
window.V='202610231451';window.APP={pool,checkFill,norm};
hud();go();
})();
