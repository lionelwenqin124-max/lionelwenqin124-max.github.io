/* Le luthier de Venise 🎻 — story reader, lessons, practice (Kahoot-style), mock oral test. Route #/luthier */
(()=>{
const K='lfr_lu_';const st={get(k,d){try{const v=localStorage.getItem(K+k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem(K+k,JSON.stringify(v))}catch(e){}}};
const D=window.LU_DATA;if(!D)return;
const P=D.paras,VO=D.vocab,OQ=D.oral;
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const strip=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'');
const nk=s=>strip(String(s).toLowerCase().replace(/œ/g,'oe').replace(/[’`´]/g,"'")).replace(/\s+/g,' ').trim();
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const $=s=>document.querySelector(s);const H=()=>window.LFR||{};
const xp=n=>H().addXP&&H().addXP(n);
/* ---------- LANGUAGE (中文 / Français / English) ---------- */
let LG=st.get('lang','zh');if(!['zh','fr','en'].includes(LG))LG='zh';
const setLangAttr=()=>document.documentElement.setAttribute('data-lulang',LG);setLangAttr();
const UI={
sndOn:['聽聲音','Son','Sound'],sndOff:['靜音','Muet','Mute'],animTip:['🎬 每段上方有動畫短片：點 🔇 打開聲音，聽角色說法語','🎬 Chaque paragraphe a une petite scène animée : touchez 🔇 pour entendre les personnages parler français','🎬 Each paragraph has a short animated scene: tap 🔇 to hear the characters speak French'],
home:['首頁','Accueil','Home'],read:['讀故事','Lire l\'histoire','Read the story'],learn:['課程重點','Leçons','Lessons'],practice:['練習','Exercices','Practice'],oral:['模擬口試','Oral blanc','Mock oral'],
readD:['11 段原文＋真人語速法語朗讀（正常／慢速）、逐行翻譯、點單字看解釋','11 paragraphes, audio normal / lent, traduction ligne par ligne, mots cliquables','11 paragraphs with French audio (normal/slow), line-by-line translation, tap-a-word glossary'],
learnD:['每段大意、重點單字（有發音）、文法重點','Résumés, vocabulaire avec audio, points de grammaire','Paragraph summaries, key vocabulary with audio, grammar points'],
practiceD:['學習單全部題目：A1、A2 兩回、配對、填空、文法、B1 寫作，Kahoot 計分','Toutes les fiches : A1, A2 (×2), association, texte à trous, grammaire, B1 — style Kahoot','All worksheet exercises: A1, A2 ×2, matching, gap-fill, grammar, B1 writing — Kahoot-style'],
oralD:['像十二月口試：隨機抽 3 段 → 朗讀 → 老師用法語問 3–5 題','Comme l\'examen de décembre : 3 paragraphes au hasard → lecture → 3 à 5 questions','Like the December test: 3 random paragraphs → read aloud → 3–5 questions in French'],
intro:['製琴師、一棵樹和一把有魔力的大提琴。下週有不計分的 test blanc，十二月口試：老師抽約 3 段，你朗讀後回答關於這幾段或整個故事的問題。','Un luthier, un arbre et un violoncelle magique. Test blanc (non noté) la semaine prochaine ; à l\'oral de décembre, le professeur choisit environ 3 paragraphes : tu les lis, puis tu réponds à ses questions.','A luthier, a tree and a magic cello. Ungraded test blanc next week; in the December oral the teacher picks about 3 paragraphs: you read them aloud, then answer questions about them or the whole story.'],
bestOral:['模擬口試最高分','Meilleur oral blanc','Best mock oral'],parasRead:['已聽過的段落','Paragraphes écoutés','Paragraphs listened to'],stars:['練習最高分總和','Total des records','Sum of practice records'],
modes:['學習模式','Modes','Modes'],listen:['聽','Écouter','Listen'],slow:['慢速','Lent','Slow'],stop:['停止','Stop','Stop'],trans:['翻譯','Traduction','Translation'],
allTrans:['顯示全部翻譯','Toutes les traductions','Show all translations'],tapWord:['點有底線的單字看解釋','Touche un mot souligné pour le lexique','Tap an underlined word for its meaning'],
para:['第','§','§'],page:['講義頁','p.','p.'],note:['原文註記','Note sur le texte','Note on the text'],
tSum:['每段大意','Résumés','Summaries'],tVoc:['單字','Vocabulaire','Vocabulary'],tGram:['文法','Grammaire','Grammar'],tNotes:['時態與原文註記','Temps & notes','Tenses & notes'],
all:['全部','Tout','All'],hideTr:['遮住翻譯自我測驗','Cacher la traduction','Hide translations (self-test)'],readPara:['讀這段','Lire ce paragraphe','Read this paragraph'],
inText:['課文例句','Dans le texte','In the text'],
pA1:['A1 問答','A1 · Questions','A1 Q&A'],pA2a:['A2 理解（一）','A2 · Compréhension 1','A2 comprehension 1'],pA2b:['A2 理解（二）','A2 · Compréhension 2','A2 comprehension 2'],
pMatch:['單字配對','Association de mots','Vocabulary matching'],pFill:['克漏字','Texte à trous','Fill in the blanks'],pGram:['文法選擇題','Grammaire (QCM)','Grammar MCQ'],pB1:['B1 短文寫作','B1 · Expression écrite','B1 writing'],pMix:['Kahoot 綜合搶答','Kahoot mix','Kahoot mix'],
pA1d:['學習單 10 題＋A1 重點','Les 10 questions de la fiche + points A1','The worksheet\'s 10 Qs + A1 key points'],pA2ad:['學習單 10 題＋提示＋A2 重點','Les 10 questions de la fiche + indices + points A2','The worksheet\'s 10 Qs + hints + A2 key points'],pA2bd:['學習單 10 題（只有提示）＋依課文寫的參考答案','Les 10 questions (indices) + réponses modèles tirées du texte','The worksheet\'s 10 Qs (hints) + model answers from the text'],
pMatchd:['établi, copeaux, ébrancher…','établi, copeaux, ébrancher…','établi, copeaux, ébrancher…'],pFilld:['violoncelle, attristé, brutal…','violoncelle, attristé, brutal…','violoncelle, attristé, brutal…'],pGramd:['學習單第 1–5 題：sa, s\'amoncellent, en, nulle part, mu','Fiche Q1–5 : sa, s\'amoncellent, en, nulle part, mu','Worksheet Q1–5: sa, s\'amoncellent, en, nulle part, mu'],pB1d:['2 題＋範文對照','2 sujets + modèles','2 prompts + model answers'],pMixd:['15 題限時、連擊加分','15 questions chronométrées','15 timed questions, streak bonus'],
play:['開始','Jouer','Play'],again:['再玩一次','Rejouer','Play again'],next:['下一題','Suivant','Next'],results:['看結果','Résultats','Results'],timer:['計時（20 秒）','Chrono (20 s)','Timer (20 s)'],
pick:['選擇題','Choisir','Pick'],type:['自己寫','Écrire','Type'],check:['檢查','Vérifier','Check'],dunno:['我不知道','Je ne sais pas','I don\'t know'],
model:['參考答案','Réponse modèle','Model answer'],keywords:['關鍵字','Mots-clés','Key words'],keypoint:['A2 重點','Point A2','A2 key point'],hint:['提示','Indice','Hint'],
speak:['用說的回答','Répondre à l\'oral','Answer by speaking'],listening:['正在聽…（再按一次停止）','J\'écoute… (touche pour arrêter)','Listening… (tap to stop)'],
record:['錄下自己','M\'enregistrer','Record myself'],recStop:['停止錄音','Arrêter','Stop recording'],myRec:['我的錄音','Mon enregistrement','My recording'],
newDraw:['重新抽題','Nouveau tirage','New random draw'],start:['抽 3 段開始','Tirer 3 paragraphes','Draw 3 paragraphs'],nQ:['題數','Nombre de questions','Number of questions'],
hideQ:['只用聽的（隱藏題目文字）','Écoute seule (cacher le texte)','Listening only (hide question text)'],showQ:['顯示題目','Voir la question','Show question'],
readAloud:['朗讀','Lecture','Reading'],readTip:['先大聲朗讀，可以錄音後重聽，再聽範例比較。','Lis à voix haute, enregistre-toi, puis compare avec le modèle.','Read aloud, record yourself, then compare with the model audio.'],
toQs:['開始回答問題','Passer aux questions','Go to the questions'],aboutP:['關於段落','Sur le paragraphe','About paragraph'],whole:['整個故事','Toute l\'histoire','Whole story'],
yourAns:['你的回答（可用說的或打字）','Ta réponse (à l\'oral ou à l\'écrit)','Your answer (speak or type)'],
oralIntro:['隨機抽出 3 段（像老師抽段落）。每段：朗讀 → 可錄音重聽 → 聽範例。接著老師用法語問 3–5 題（有聲音＋文字），題目關於這幾段或整個故事。回答後看參考答案和關鍵字。','3 paragraphes au hasard. Pour chacun : lecture à voix haute → enregistrement → modèle. Puis 3 à 5 questions en français (audio + texte) sur ces paragraphes ou toute l\'histoire. Compare avec la réponse modèle et les mots-clés.','3 random paragraphs. For each: read aloud → record yourself → model audio. Then 3–5 questions in French (audio + text) about those paragraphs or the whole story. Compare with the model answer and key words.'],
score:['分數','Score','Score'],best:['最高分','Record','Best'],done:['完成！','Terminé !','Done!'],review:['檢討','Révision','Review'],
words:['字','mots','words'],compare:['和範文比較','Comparer au modèle','Compare with the model'],yourText:['寫下你的短文…','Écris ton texte…','Write your text…'],
ok:['答對了！','Bravo !','Correct!'],bad:['答錯了','Raté !','Wrong'],time:['時間到！','Temps écoulé !','Time\'s up!'],partial:['部分正確','Presque !','Partly right'],good:['很好！','Très bien !','Well done!'],
errors:['錯誤','erreur(s)','mistake(s)'],testInfo:['Test blanc：下週（不計分）· 十二月：口試','Test blanc : semaine prochaine (non noté) · Décembre : oral','Test blanc: next week (ungraded) · December: oral test'],
keyNote:['⚠️ 講義答案註記','⚠️ Note sur le corrigé','⚠️ Note on the answer key'],noSR:['這個瀏覽器不支援語音辨識，請用打字（iPhone 請用 Safari）。','Reconnaissance vocale indisponible : écris ta réponse.','Speech recognition isn\'t available here — please type (on iPhone use Safari).'],
noRec:['這個瀏覽器無法錄音。','Enregistrement impossible sur ce navigateur.','Recording isn\'t supported in this browser.'],micDenied:['沒有麥克風權限。','Micro refusé.','Microphone permission denied.'],
tapPair:['先點左邊的字，再點右邊的意思','Touche un mot, puis sa définition','Tap a word, then its definition'],tapFill:['點下面的字填進空格（點空格可取消）','Touche un mot pour remplir le trou (touche un trou pour l\'effacer)','Tap a word to fill the next blank (tap a blank to clear it)'],
q:['題','Q','Q'],wsTag:['📄 老師學習單題目','📄 Questions de la fiche du professeur','📄 Teacher\'s worksheet questions'],extra:['➕ 額外練習（不是學習單）','➕ Exercices en plus (hors fiche)','➕ Extra practice (not from the worksheet)'],vsText:['📖 和課文對照','📖 Comparaison avec le texte','📖 Checked against the story text'],pGramX:['額外文法題','Grammaire en plus','Extra grammar'],pGramXd:['ne…que、部分冠詞、被動、passé simple…','ne…que, partitifs, passif, passé simple…','ne…que, partitives, passive, passé simple…'],ws:['學習單','Fiche','Worksheet'],of:['／','/','/'],found:['找到','trouvés','found'],
};
const IDX={zh:0,fr:1,en:2};
const U=k=>{const a=UI[k]||[k,k,k];return `<span class="U uz">${a[0]}</span><span class="U uf">${a[1]}</span><span class="U ue">${a[2]}</span>`};
const L=k=>(UI[k]||[k,k,k])[IDX[LG]];
const T=(zh,en,cls)=>`<span class="T tz ${cls||''}">${esc(zh)}</span><span class="T te ${cls||''}">${esc(en)}</span>`;
const Tm=(o,f)=>T(o[f+'zh']||o.zh,o[f+'en']||o.en);
function langBar(){return `<div class="lu-lang" role="group" aria-label="Language">${[['zh','中文'],['fr','Français'],['en','English']].map(([k,n])=>`<button type="button" data-lulang="${k}" class="${LG===k?'on':''}">${n}</button>`).join('')}</div>`}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-lulang]');if(!b||b.tagName!=='BUTTON')return;LG=b.dataset.lulang;st.set('lang',LG);setLangAttr();
 document.querySelectorAll('.lu-lang button').forEach(x=>x.classList.toggle('on',x.dataset.lulang===LG));document.querySelectorAll('[data-ph]').forEach(i=>i.placeholder=L(i.dataset.ph))});
/* ---------- AUDIO (real French gTTS clips, lazy-loaded) ---------- */
const loaded={};function loadG(g){if(loaded[g])return loaded[g];const V=window.ASSET_V||'1';
 loaded[g]=Promise.all((D.af[g]||[]).map(f=>new Promise(r=>{const s=document.createElement('script');s.src=f+'?v='+V;s.onload=s.onerror=r;document.head.appendChild(s)})));return loaded[g]}
const loadAll=()=>Promise.all(['x','o','p','ps'].map(loadG));
let cur=null,curBtn=null;
function keyOf(t,slow){const k=D.ak[t];return k?(slow?'S'+k.slice(1):k):null}
function stopAudio(){if(cur){cur.pause();cur=null}if(curBtn){curBtn.classList.remove('playing');curBtn=null}try{speechSynthesis.cancel()}catch(e){}}
function play(t,o={}){const btn=o.btn||null;if(btn&&btn===curBtn){stopAudio();return}stopAudio();try{muteScenes()}catch(e){}
 const k=keyOf(t,o.slow),A=window.LU_AUD||{};
 if(!k||!A[k]){if(k&&!o.retry){if(btn)btn.classList.add('playing');curBtn=btn;loadAll().then(()=>{if(curBtn===btn){curBtn=null;if(btn)btn.classList.remove('playing');play(t,Object.assign({},o,{retry:1}))}});return}H().speak&&H().speak(t);return}
 const a=new Audio('data:audio/mpeg;base64,'+A[k]);cur=a;if(btn){btn.classList.add('playing');curBtn=btn}
 a.onended=()=>{if(cur===a){cur=null;if(curBtn){curBtn.classList.remove('playing');curBtn=null}o.onend&&o.onend()}};
 a.play().catch(()=>{if(cur===a){cur=null;if(btn)btn.classList.remove('playing');curBtn=null}H().speak&&H().speak(t)})}
let sfxOn=st.get('sfx',true);function sfx(ok){if(!sfxOn)return;const b=(window.LU_AUD||{})['sfx_'+(ok?'correct':'wrong')];if(!b)return;try{const a=new Audio('data:audio/mpeg;base64,'+b);a.volume=.45;a.play().catch(()=>{})}catch(e){}}
document.addEventListener('click',e=>{const s=e.target.closest&&e.target.closest('[data-lusay]');if(!s)return;e.preventDefault();
 play(s.dataset.lusay,{slow:s.dataset.slow==='1',btn:s,onend:s.dataset.p?()=>markRead(+s.dataset.p):null})});
const say=(t,lbl)=>`<button type="button" class="lu-say" data-lusay="${esc(t)}" aria-label="Listen">🔊${lbl?' '+lbl:''}</button>`;
let READ=st.get('read',[]);function markRead(n){if(!READ.includes(n)){READ.push(n);st.set('read',READ)}}
/* ---------- speech recognition + recorder ---------- */
const SR=window.SpeechRecognition||window.webkitSpeechRecognition;let rec=null;
function dictate(btn,ta){if(rec){try{rec.stop()}catch(e){}return}if(!SR){H().toast&&H().toast(L('noSR'));return}stopAudio();
 const r=new SR();r.lang='fr-FR';r.interimResults=true;r.continuous=true;const base=ta.value.trim();rec=r;btn.classList.add('rec');btn.innerHTML='🎙️ '+U('listening');
 r.onresult=e=>{let s='';for(let i=0;i<e.results.length;i++)s+=e.results[i][0].transcript;ta.value=(base?base+' ':'')+s.trim();ta.dispatchEvent(new Event('input'))};
 const end=()=>{rec=null;btn.classList.remove('rec');btn.innerHTML='🎤 '+U('speak')};r.onend=end;r.onerror=ev=>{if(ev.error==='not-allowed')H().toast&&H().toast(L('micDenied'));end()};
 try{r.start()}catch(e){end()}}
let mr=null;
async function recToggle(btn,out){if(mr){mr.stop();return}
 if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia||!window.MediaRecorder){H().toast&&H().toast(L('noRec'));return}stopAudio();
 let stream;try{stream=await navigator.mediaDevices.getUserMedia({audio:true})}catch(e){H().toast&&H().toast(L('micDenied'));return}
 const mime=['audio/mp4','audio/webm;codecs=opus','audio/webm','audio/ogg'].find(m=>MediaRecorder.isTypeSupported&&MediaRecorder.isTypeSupported(m));
 const m=new MediaRecorder(stream,mime?{mimeType:mime}:undefined),ch=[];mr=m;const t0=Date.now();
 btn.classList.add('rec');const tick=setInterval(()=>{btn.innerHTML='⏹ '+U('recStop')+' · '+Math.round((Date.now()-t0)/1000)+' s'},300);
 m.ondataavailable=e=>{if(e.data&&e.data.size)ch.push(e.data)};
 m.onstop=()=>{clearInterval(tick);mr=null;stream.getTracks().forEach(t=>t.stop());btn.classList.remove('rec');btn.innerHTML='🎙️ '+U('record');
  const url=URL.createObjectURL(new Blob(ch,{type:m.mimeType||mime||'audio/webm'}));out.innerHTML=`<p class="lu-small">🎧 ${U('myRec')} · ${Math.round((Date.now()-t0)/1000)} s</p><audio controls src="${url}"></audio>`};
 m.start()}
/* ---------- accent bar for typing ---------- */
const ACC=['é','è','ê','à','â','ç','î','ô','û','ù','œ','«','»'];
const accBar=()=>`<div class="lu-acc">${ACC.map(a=>`<button type="button" data-luacc="${a}">${a}</button>`).join('')}</div>`;
let lastIn=null;document.addEventListener('focusin',e=>{if(e.target.matches&&e.target.matches('.lu textarea,.lu input[type=text]'))lastIn=e.target});
document.addEventListener('mousedown',e=>{if(e.target.matches&&e.target.matches('[data-luacc]'))e.preventDefault()});
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-luacc]');if(b&&lastIn){const i=lastIn,p=i.selectionStart??i.value.length;i.value=i.value.slice(0,p)+b.dataset.luacc+i.value.slice(i.selectionEnd??p);i.focus();i.setSelectionRange(p+1,p+1)}});
/* ---------- keyword grading ---------- */
function kwGrade(text,kw){const n=nk(text);const hits=kw.map(g=>g.some(k=>n.includes(nk(k))));return{hits,ratio:kw.length?hits.filter(Boolean).length/kw.length:0}}
const kwChips=(kw,hits)=>`<div class="lu-kw">${kw.map((g,i)=>`<span class="${hits&&hits[i]?'hit':''}">${hits&&hits[i]?'✓':'○'} ${esc(g[0])}${g.length>1?'…':''}</span>`).join('')}</div>`;
/* ---------- CSS ---------- */
if(!document.getElementById('luCss')){const c=document.createElement('style');c.id='luCss';c.textContent=`
.lu .U,.lu-sheet .U{display:none}html[data-lulang=zh] .uz,html[data-lulang=fr] .uf,html[data-lulang=en] .ue{display:inline}
.lu .T,.lu-sheet .T{display:block;color:var(--muted);font-size:.95rem;line-height:1.5}.lu .T.in{display:inline}html[data-lulang=zh] .te,html[data-lulang=en] .tz{display:none!important}
html[data-lulang=fr] .lu .tz::before,html[data-lulang=fr] .lu-sheet .tz::before{content:"🇹🇼 "}html[data-lulang=fr] .lu .te::before,html[data-lulang=fr] .lu-sheet .te::before{content:"🇬🇧 "}
.lu{--wood:#8b5a2b;max-width:980px;margin:0 auto;padding:0 12px 24px}
.lu-top{position:sticky;top:61px;z-index:15;display:flex;justify-content:space-between;align-items:center;gap:8px;padding:8px 0;background:var(--bg)}
.lu-top .crumbs{margin:0;font-size:.85rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}
.lu-lang{display:inline-flex;flex:none;border:2px solid var(--line);border-radius:999px;overflow:hidden;background:var(--surface)}
.lu-lang button{border:0;background:transparent;color:var(--text);font:inherit;font-weight:700;font-size:.82rem;padding:6px 10px;cursor:pointer;min-height:34px}.lu-lang button.on{background:var(--wood);color:#fff}
.lu-head{background:linear-gradient(135deg,#5b3a1e,#8b5a2b 55%,#c08a4a);color:#fff;border-radius:20px;padding:20px;margin:6px 0 14px;box-shadow:var(--sh)}.lu-head h1{margin:.1em 0;font-size:1.8rem;line-height:1.2}.lu-head p{margin:.4em 0;opacity:.95}.lu-head .T{color:#fff;opacity:.92}
.lu-head .eyebrow{color:#ffe7c2}.lu-pill{display:inline-block;background:rgba(255,255,255,.18);border-radius:999px;padding:3px 10px;font-size:.82rem;font-weight:700;margin-top:6px}
.lu-grid{display:grid;gap:12px;grid-template-columns:repeat(auto-fill,minmax(210px,1fr))}.lu-grid .card h3{margin:.2em 0}.lu-grid .card p{margin:.2em 0;color:var(--muted);font-size:.92rem}
.lu-card-key{border:3px solid var(--wood)!important}.lu-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:12px 0}.lu-stats .stat b{font-size:1.25rem}
.lu-say{border:1px solid var(--line);background:var(--surface);color:var(--text);border-radius:999px;padding:4px 10px;font:inherit;font-size:.9rem;cursor:pointer;min-height:34px}.lu-say.playing{background:var(--wood);color:#fff;border-color:var(--wood)}
.lu-btn{border:2px solid var(--line);background:var(--surface);color:var(--text);border-radius:999px;padding:7px 14px;font:inherit;font-weight:700;cursor:pointer;min-height:40px}.lu-btn.on,.lu-btn.playing{background:var(--wood);color:#fff;border-color:var(--wood)}.lu-btn.rec{background:#e21b3c;color:#fff;border-color:#e21b3c;animation:luPulse 1.2s infinite}
@keyframes luPulse{50%{opacity:.7}}.lu-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:8px 0}
.lu-para{margin:12px 0;padding:16px}.lu-para h3{margin:0 0 4px;display:flex;gap:8px;align-items:baseline;flex-wrap:wrap}.lu-num{background:var(--wood);color:#fff;border-radius:10px;padding:1px 9px;font-size:.9rem}
.lu-line{margin:6px 0}.lu-fr{font-size:1.08rem;line-height:1.65}.lu-para .lu-line .T{display:none}.lu-para.showtr .lu-line .T{display:block;padding-left:10px;border-left:3px solid var(--line);margin:2px 0 8px}
.lu-g{border:0;background:none;padding:0;font:inherit;color:inherit;cursor:pointer;text-decoration:underline dotted color-mix(in srgb,var(--wood) 70%,transparent);text-underline-offset:4px;text-decoration-thickness:2px}
.lu-note{font-size:.88rem;background:var(--surface2);border-radius:10px;padding:8px 10px;margin-top:8px}
.lu-sheet{position:fixed;left:0;right:0;bottom:0;z-index:60;background:var(--surface);border-top:3px solid var(--wood);border-radius:18px 18px 0 0;padding:16px 18px calc(16px + env(safe-area-inset-bottom));box-shadow:0 -10px 40px rgba(0,0,0,.25);max-width:640px;margin:0 auto;transform:translateY(110%);transition:transform .2s}
.lu-sheet.open{transform:none}.lu-sheet h3{margin:0 0 6px;font-size:1.3rem}.lu-sheet .x{position:absolute;right:12px;top:10px;border:0;background:none;font-size:1.4rem;cursor:pointer;color:var(--text)}
.lu-tabs{display:flex;gap:6px;overflow-x:auto;margin:8px 0 12px;padding-bottom:4px}.lu-tabs a{flex:none;text-decoration:none;color:var(--text);border:2px solid var(--line);border-radius:999px;padding:6px 12px;font-weight:700;font-size:.9rem;background:var(--surface)}.lu-tabs a.on{background:var(--wood);color:#fff;border-color:var(--wood)}
.lu-voc{display:grid;grid-template-columns:auto 1fr auto;gap:6px 10px;align-items:center}.lu-voc>div{padding:6px 0;border-bottom:1px solid var(--line)}.lu-voc b{font-size:1.02rem}
.lu.hidetr .lu-voc .T{filter:blur(6px);cursor:pointer}.lu.hidetr .lu-voc .T.rv{filter:none}
.lu-ex{margin:6px 0;padding:6px 10px;background:var(--surface2);border-radius:10px}.lu-small{font-size:.86rem;color:var(--muted);margin:.3em 0}
.lu .k-wrap{max-width:760px;margin:0 auto}.lu .k-top{display:flex;justify-content:space-between;align-items:center;font-weight:800;margin-bottom:8px;gap:8px;flex-wrap:wrap}.lu .k-top>span:first-child{white-space:nowrap}
.lu .k-q{background:var(--surface);border-radius:16px;padding:16px;text-align:center;box-shadow:var(--sh);margin-bottom:12px}.lu .k-q h2{font-size:1.25rem;margin:.3em 0;line-height:1.4}
.lu .k-time{height:10px;border-radius:6px;background:var(--surface2);overflow:hidden;margin-bottom:12px}.lu .k-time i{display:block;height:100%;background:linear-gradient(90deg,#5b3a1e,#c08a4a);transition:width .1s linear}
.lu .k-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.lu .k-t{border:none;border-radius:12px;min-height:70px;padding:12px 12px 12px 44px;color:#fff;font:inherit;font-weight:700;font-size:1rem;text-align:left;position:relative;cursor:pointer;box-shadow:0 4px 0 rgba(0,0,0,.25)}
.lu .k-t:active{transform:translateY(2px)}.lu .k-t::before{position:absolute;left:12px;top:50%;transform:translateY(-50%);font-size:1.3rem}
.lu .k-t.c0{background:#e21b3c}.lu .k-t.c0::before{content:"▲"}.lu .k-t.c1{background:#1368ce}.lu .k-t.c1::before{content:"◆"}.lu .k-t.c2{background:#d89e00}.lu .k-t.c2::before{content:"●"}.lu .k-t.c3{background:#26890c}.lu .k-t.c3::before{content:"■"}
.lu .k-t.dim{opacity:.35}.lu .k-t.right{outline:4px solid #fff;box-shadow:0 0 0 7px #26890c}.lu .k-grid.one{grid-template-columns:1fr}@media(max-width:560px){.lu .k-grid{grid-template-columns:1fr}.lu .k-t{min-height:54px}}
.lu .k-pop{font-size:1.25rem;font-weight:900;text-align:center;padding:10px;border-radius:12px;color:#fff;margin-top:10px}.lu .k-pop.ok{background:#26890c}.lu .k-pop.bad{background:#e21b3c}.lu .k-pop.mid{background:#d89e00}
.lu-fb{background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:12px 14px;margin-top:10px;text-align:left}.lu-fb p{margin:.35em 0}
.lu-kw{display:flex;flex-wrap:wrap;gap:6px;margin:6px 0}.lu-kw span{border:2px solid var(--line);border-radius:999px;padding:2px 10px;font-size:.88rem;color:var(--muted)}.lu-kw span.hit{border-color:#26890c;color:#26890c;background:var(--okbg);font-weight:700}
.lu textarea{width:100%;box-sizing:border-box;min-height:96px;border:2px solid var(--line);border-radius:12px;padding:10px;font:inherit;font-size:1.02rem;background:var(--surface);color:var(--text)}
.lu-acc{display:flex;flex-wrap:wrap;gap:4px;margin:6px 0}.lu-acc button{border:1px solid var(--line);background:var(--surface2);color:var(--text);border-radius:8px;min-width:34px;min-height:34px;font:inherit;cursor:pointer}
.lu-match{display:grid;grid-template-columns:1fr 1.4fr;gap:8px}.lu-match button{border:2px solid var(--line);background:var(--surface);color:var(--text);border-radius:12px;padding:10px;font:inherit;text-align:left;cursor:pointer;min-height:54px}
.lu-match button.sel{border-color:var(--wood);background:color-mix(in srgb,var(--wood) 15%,var(--surface))}.lu-match button.ok{border-color:#26890c;background:var(--okbg);opacity:.75}.lu-match button.bad{border-color:#e21b3c;animation:luShake .3s}
@keyframes luShake{25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}
.lu-fill{font-size:1.08rem;line-height:2.3}.lu-blank{display:inline-block;min-width:90px;border:0;border-bottom:3px solid var(--wood);background:var(--surface2);color:var(--text);border-radius:6px 6px 0 0;padding:0 8px;font:inherit;font-weight:700;cursor:pointer;line-height:1.6}
.lu-blank.ok{border-color:#26890c;background:var(--okbg)}.lu-blank.bad{border-color:#e21b3c;background:var(--badbg)}.lu-bank{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0}.lu-bank button{border:2px solid var(--wood);background:var(--surface);color:var(--text);border-radius:999px;padding:6px 14px;font:inherit;font-weight:700;cursor:pointer}.lu-bank button:disabled{opacity:.3}
.lu-big{font-size:2.2rem;width:84px;height:84px;border-radius:50%;border:none;background:var(--wood);color:#fff;cursor:pointer;box-shadow:var(--sh)}.lu-big.playing{animation:luPulse 1s infinite}
.lu-tag{display:inline-block;background:var(--surface2);border-radius:999px;padding:2px 10px;font-size:.82rem;font-weight:700}.lu-flag{background:#fff4d6;color:#7a5200;border-radius:10px;padding:8px 10px;font-size:.9rem;margin-top:8px}
[data-theme=dark] .lu-flag{background:#3a2f12;color:#ffd98a}.lu audio{width:100%;margin-top:4px}.lu .done-screen{text-align:center}.lu-steps{display:flex;gap:6px;justify-content:center;margin:6px 0 10px}.lu-steps i{width:28px;height:6px;border-radius:4px;background:var(--line)}.lu-steps i.on{background:var(--wood)}
@media(max-width:560px){.lu-head h1{font-size:1.45rem}.lu-top{top:57px}.lu-lang button{padding:6px 8px;font-size:.78rem}.lu-stats .stat span{font-size:.72rem}}
`;document.head.appendChild(c)}
/* ---------- shared bits ---------- */
const crumbs=t=>`<div class="crumbs"><a href="#/">Accueil</a> › <a href="#/luthier">🎻 Luthier</a>${t?' › '+t:''}</div>`;
const top=t=>`<div class="lu-top">${crumbs(t)}${langBar()}</div>`;
const pLabel=p=>`<span class="lu-num">§${p.n}</span>`;
const toTop=el=>{if(!el)return;const y=el.getBoundingClientRect().top+window.scrollY-120;if(Math.abs(window.scrollY-y)>40)window.scrollTo({top:Math.max(0,y)})};
const lineHTML=seg=>seg.map(s=>s.length>1?`<button type="button" class="lu-g" data-g="${s[1]}">${esc(s[0])}</button>`:esc(s[0])).join('');
/* glossary bottom sheet */
function sheet(){let s=document.getElementById('luSheet');if(!s){s=document.createElement('div');s.id='luSheet';s.className='lu-sheet';s.setAttribute('role','dialog');document.body.appendChild(s)}return s}
document.addEventListener('click',e=>{const g=e.target.closest&&e.target.closest('.lu-g');const s=document.getElementById('luSheet');
 if(g){const v=VO[+g.dataset.g];const sh=sheet();sh.innerHTML=`<button class="x" aria-label="Close">✕</button><h3>${esc(v.w)} ${say(v.say)}</h3>${T(v.zh,v.en)}<p class="lu-small">§${v.p}</p>`;sh.classList.add('open');play(v.say);return}
 if(s&&s.classList.contains('open')&&(e.target.closest('.x')||!e.target.closest('.lu-sheet')))s.classList.remove('open')});
window.addEventListener('hashchange',()=>{const s=document.getElementById('luSheet');if(s)s.classList.remove('open');stopAudio();if(rec)try{rec.stop()}catch(e){};if(mr)try{mr.stop()}catch(e){}});
/* ---------- ANIMATED SCENES (Grok Imagine clips, lazy-loaded, captions follow language) ---------- */
const WHO={l:['🧓','Le luthier','製琴師','The luthier'],m:['🎻','Un musicien','一位音樂家','A musician'],d:['💃','Une dame','一位女士','A lady'],a:['🎭',"L'artiste",'藝術家','The artist']};
const SCN={1:[[0,6.8,'l',"Bonjour ! Voici ma boutique. Derrière, il y a mon jardin et mon grand arbre.","你好！這是我的店。後面有我的花園和我的大樹。","Hello! Here is my shop. Behind it are my garden and my big tree."]],
2:[[0,6.8,'l',"Mon bel arbre… Écoute les oiseaux. C'est plus beau que la musique des théâtres !","我美麗的樹……聽聽這些鳥兒。這比劇院裡的音樂還美！","My beautiful tree… Listen to the birds. It's more beautiful than the music of the theatres!"]],
3:[[0.8,5.3,'l',"Le printemps est revenu… mais mon arbre n'a plus de feuilles.","春天回來了……可是我的樹再也沒有葉子了。","Spring has come back… but my tree has no more leaves."],[5.9,7.6,'l',"Il est mort.","它死了。","It is dead."]],
4:[[0.7,6.8,'l',"Doucement, messieurs ! Attention à mon petit jardin. Je garde tout le bois.","先生們，輕一點！小心我的小花園。所有的木頭我都要留著。","Gently, gentlemen! Mind my little garden. I'm keeping all the wood."]],
5:[[2.2,5.1,'m',"Maître, je voudrais votre plus beau violon !","師傅，我想要您最好的小提琴！","Master, I would like your finest violin!"],[5.2,6.8,'l',"Bien sûr, monsieur.","當然，先生。","Of course, sir."]],
6:[[2,7.7,'l',"Avec le bois de mon arbre, j'ai fait le plus beau violoncelle du monde.","我用我那棵樹的木頭，做出了世界上最美的大提琴。","With the wood of my tree, I made the most beautiful cello in the world."]],
7:[[0,4.8,'d',"C'est le carnaval ! Venez danser avec nous !","嘉年華會來了！來跟我們一起跳舞吧！","It's carnival! Come and dance with us!"]],
8:[[0,3.2,'d',"Oh, quels beaux instruments !","哦，多美的樂器啊！","Oh, what beautiful instruments!"],[3.3,5.7,'a',"Bravo, maître luthier !","太棒了，製琴大師！","Bravo, master luthier!"]],
9:[[0,3.8,'d',"Quelle horreur ! Ce violoncelle grince ! Partons !","太可怕了！這把大提琴吱吱嘎嘎的！我們走吧！","How awful! This cello squeaks! Let's go!"]],
10:[[0,5.8,'a',"Plus de masque, plus de perruque. Maintenant, je joue avec mon cœur.","不要面具，不要假髮。現在，我用我的心來演奏。","No more mask, no more wig. Now I play with my heart."]],
11:[[0.8,5.6,'l',"Cette musique… c'est mon arbre ! Il chante encore.","這音樂……是我的樹！它又在唱歌了。","This music… it's my tree! It is singing again."]]};
(function(){const s=document.createElement('style');s.textContent=`
.lu-scene{margin:-16px -16px 12px;position:relative;overflow:hidden;border-radius:18px 18px 0 0;background:#2b1c10;aspect-ratio:16/9}
.lu-scene img,.lu-scene video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}
.lu-scene img{opacity:0;transform:scale(1.08);transition:opacity .9s ease}
.lu-scene.has-p img{opacity:1}.lu-scene.in img{animation:luKB 14s ease-out forwards}
.lu-scene video{opacity:0;transition:opacity .8s ease}.lu-scene.vid video{opacity:1}
@keyframes luKB{from{transform:scale(1.08) translate(1.5%,1%)}to{transform:scale(1) translate(0,0)}}
.lu-snd{position:absolute;right:10px;top:10px;z-index:3;border:0;border-radius:999px;background:rgba(0,0,0,.55);color:#fff;font-size:1.05rem;min-width:44px;min-height:44px;padding:6px 12px;font-weight:700;cursor:pointer;backdrop-filter:blur(4px)}
.lu-snd.on{background:var(--wood)}
.lu-hd{position:absolute;left:10px;top:12px;z-index:2;color:#fff;font:800 .62rem/1 system-ui;letter-spacing:.06em;background:rgba(0,0,0,.45);border:1px solid rgba(255,255,255,.6);border-radius:4px;padding:3px 5px;opacity:0;transition:opacity .4s}.lu-scene.vid .lu-hd{opacity:.85}
.lu-snd .lbl{font-size:.8rem;margin-left:4px}
.lu-cap{position:absolute;left:0;right:0;bottom:0;z-index:2;padding:22px 12px 9px;background:linear-gradient(transparent,rgba(0,0,0,.78));color:#fff;text-align:center;pointer-events:none;opacity:0;transition:opacity .4s}
.lu-cap.show{opacity:1}html[data-lulang=zh] .lu-cap .who .tz,html[data-lulang=en] .lu-cap .who .te{display:inline!important;color:#fff;font-size:.75rem;padding:0;border:0;margin:0}.lu-cap .cf{font-weight:800;font-size:.95rem;line-height:1.35;text-shadow:0 1px 3px #000}.lu-cap .who{font-size:.75rem;opacity:.85;font-weight:700}
.lu-cap .T{font-size:.86rem;opacity:.95;line-height:1.3;text-shadow:0 1px 3px #000;color:#ffe7c2}
html[data-lulang=fr] .lu-cap .T{display:none!important}
.lu-load{position:absolute;left:10px;top:12px;z-index:3;color:#fff;font-size:.75rem;background:rgba(0,0,0,.45);border-radius:999px;padding:3px 9px}
.lu-reader .lu-para{transform-origin:left center;opacity:0;transform:perspective(1200px) rotateY(-9deg) translateX(14px)}
.lu-reader .lu-para.turned{animation:luTurn .75s cubic-bezier(.2,.7,.2,1) forwards}
.lu-reader .lu-para::after{content:"";position:absolute;top:0;right:0;width:26px;height:26px;background:linear-gradient(225deg,var(--bg,#f6efe6) 50%,rgba(0,0,0,.08) 50%);border-radius:0 0 0 10px;pointer-events:none}
.lu-reader .lu-para{position:relative}
@keyframes luTurn{to{opacity:1;transform:none}}
@media (max-width:480px){.lu-cap{padding:16px 8px 6px}.lu-cap .cf{font-size:.86rem}.lu-cap .T{font-size:.78rem}.lu-snd{min-height:38px;min-width:40px;padding:4px 10px;font-size:.95rem}}
@media (prefers-reduced-motion:reduce){.lu-scene.in img{animation:none;transform:none}.lu-reader .lu-para{opacity:1;transform:none}.lu-reader .lu-para.turned{animation:none}}
`;document.head.appendChild(s)})();
function sceneHTML(n){if(!SCN[n])return '';return `<figure class="lu-scene" data-scn="${n}"><img alt="" decoding="async"><video muted loop playsinline preload="none" aria-label="Scène ${n}"></video>
<span class="lu-load">🎬 HD …</span><span class="lu-hd" aria-hidden="true">HD</span><button type="button" class="lu-snd" data-snd="${n}" aria-label="Son">🔇<span class="lbl">${U('sndOn')}</span></button><div class="lu-cap" aria-live="polite"></div></figure>`}
let POST=null;const vcacheL={};
function mediaV(){return window.ASSET_V||'1'}
function loadPosters(){if(POST)return POST;POST=fetch('luvid/posters.json?v='+mediaV()).then(r=>r.ok?r.json():{}).catch(()=>({}));return POST}
function lite(){const c=navigator.connection||{};return !!(c.saveData||/(^|-)2g$/.test(c.effectiveType||''))}
function b64url(t,type){const b=atob(t.trim());const u=new Uint8Array(b.length);for(let i=0;i<b.length;i++)u[i]=b.charCodeAt(i);return URL.createObjectURL(new Blob([u],{type}))}
async function loadClip(n){if(vcacheL[n])return vcacheL[n];const nn=String(n).padStart(2,'0');return vcacheL[n]=(async()=>{
 const get=async u=>{const r=await fetch(u+'?v='+mediaV());if(!r.ok)throw new Error(r.status);return (await r.text()).trim()};
 if(!lite()){try{const parts=await Promise.all(['a','b','c'].map(x=>get('luvid/hd/h'+nn+x+'.b64')));return b64url(parts.join(''),'video/mp4')}catch(e){}}
 try{return b64url(await get('luvid/v'+nn+'.b64'),'video/mp4')}catch(e){}
 throw new Error('clip '+n)})()}
const hpost={};function loadHDPoster(f){const n=f.dataset.scn;if(hpost[n]||lite())return;hpost[n]=1;fetch('luvid/hd/p'+String(n).padStart(2,'0')+'.b64?v='+mediaV()).then(r=>r.ok?r.text():null).then(t=>{if(!t)return;const im=f.querySelector('img');const u=b64url(t,'image/jpeg');const pre=new Image();pre.onload=()=>{im.src=u;f.classList.add('has-p')};pre.src=u}).catch(()=>{})}
function capRender(f){const v=f.querySelector('video'),c=f.querySelector('.lu-cap'),cues=SCN[+f.dataset.scn]||[];const t=v.currentTime;const q=cues.find(x=>t>=x[0]&&t<x[1]);const k=q?q.join('|'):'';if(c.dataset.k===k)return;c.dataset.k=k;
 if(!q){c.classList.remove('show');return}const w=WHO[q[2]];c.innerHTML=`<div class="who">${w[0]} ${esc(w[1])}<span class="T tz"> · ${esc(w[2])}</span><span class="T te"> · ${esc(w[3])}</span></div><div class="cf" lang="fr">${esc(q[3])}</div>${T(q[4],q[5])}`;c.classList.add('show')}
function muteScenes(except){document.querySelectorAll('.lu-scene').forEach(f=>{if(f===except)return;const v=f.querySelector('video');v.muted=true;const b=f.querySelector('.lu-snd');b.classList.remove('on');b.innerHTML=`🔇<span class="lbl">${U('sndOn')}</span>`})}
async function startScene(f){const n=+f.dataset.scn,v=f.querySelector('video');if(f.dataset.st)return;f.dataset.st='1';
 try{const u=await loadClip(n);v.src=u;v.addEventListener('timeupdate',()=>capRender(f));v.addEventListener('playing',()=>{f.classList.add('vid');const l=f.querySelector('.lu-load');if(l)l.remove()},{once:true});
  if(f.dataset.vis==='1'){const p=v.play();if(p&&p.catch)p.catch(()=>{})}}catch(e){const l=f.querySelector('.lu-load');if(l)l.textContent='🖼️';f.dataset.st=''}}
let scIO=null,turnIO=null;
function initScenes(root){loadPosters().then(P0=>{root.querySelectorAll('.lu-scene').forEach(f=>{const s=P0[f.dataset.scn];if(s){const im=f.querySelector('img');im.onload=()=>f.classList.add('has-p');im.src='data:image/jpeg;base64,'+s}})});
 if(scIO)scIO.disconnect();if(turnIO)turnIO.disconnect();
 const fs=[...root.querySelectorAll('.lu-scene')];
 if(!('IntersectionObserver' in window)){root.querySelectorAll('.lu-para').forEach(p=>p.classList.add('turned'));fs.forEach(f=>{f.classList.add('in');f.dataset.vis='1';loadHDPoster(f);startScene(f)});return}
 scIO=new IntersectionObserver(es=>es.forEach(e=>{const f=e.target,v=f.querySelector('video');
  if(e.isIntersecting){f.classList.add('in');f.dataset.vis='1';loadHDPoster(f);if(!f.dataset.st)startScene(f);else if(v.src){const p=v.play();if(p&&p.catch)p.catch(()=>{})}}
  else{f.dataset.vis='0';if(v.src&&!v.paused)v.pause()}}),{rootMargin:'250px 0px',threshold:0.2});
 fs.forEach(f=>scIO.observe(f));
 turnIO=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('turned');turnIO.unobserve(e.target)}}),{threshold:0.06});
 root.querySelectorAll('.lu-para').forEach(p=>turnIO.observe(p))}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-snd]');if(!b)return;const f=b.closest('.lu-scene'),v=f.querySelector('video');
 if(!v.src){f.dataset.vis='1';startScene(f).then(()=>{if(v.src)b.click()});return}
 if(v.muted){stopAudio();muteScenes(f);v.muted=false;try{v.currentTime=0}catch(_){}const p=v.play();if(p&&p.catch)p.catch(()=>{});b.classList.add('on');b.innerHTML=`🔊<span class="lbl">${U('sndOff')}</span>`}
 else{v.muted=true;b.classList.remove('on');b.innerHTML=`🔇<span class="lbl">${U('sndOn')}</span>`}});
window.addEventListener('hashchange',()=>{document.querySelectorAll('.lu-scene video').forEach(v=>{try{v.pause()}catch(e){}})});
function paraCard(p,o={}){return `<div class="card lu-para${o.tr?' showtr':''}" id="lp${p.n}">${o.scene?sceneHTML(+p.n):''}<h3>${pLabel(p)} <span>${p.emo} ${esc(p.t.fr)}</span> <span class="lu-small">${U('page')} ${p.pg}</span></h3>${T(p.t.zh,p.t.en)}
<div class="lu-row"><button type="button" class="lu-say" data-lusay="${esc(p.tts)}" data-p="${p.n}">▶ ${U('listen')}</button><button type="button" class="lu-say" data-lusay="${esc(p.tts)}" data-slow="1" data-p="${p.n}">🐢 ${U('slow')}</button><button type="button" class="lu-btn lu-trb${o.tr?' on':''}" data-trp="${p.n}">🌐 ${U('trans')}</button></div>${o.extra||''}
${p.seg.map((s,i)=>`<div class="lu-line"><div class="lu-fr" lang="fr">${lineHTML(s)}</div>${T(p.zh[i],p.en[i])}</div>`).join('')}
${p.note.length?`<details class="lu-note"><summary>📝 ${U('note')}</summary>${p.note.map(n=>`<p>${esc(n)}</p>`).join('')}</details>`:''}</div>`}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-trp]');if(!b)return;const c=b.closest('.lu-para');c.classList.toggle('showtr');b.classList.toggle('on',c.classList.contains('showtr'));if(c.classList.contains('showtr'))markRead(+b.dataset.trp)});
/* ---------- HOME ---------- */
const MODES=[['read','📖','readD'],['learn','🧠','learnD'],['practice','🎮','practiceD'],['oral','🎤','oralD']];
function home(){const ob=st.get('oralBest',null);const recs=st.get('best',{});const sum=Object.values(recs).reduce((a,b)=>a+b,0);
 return `${top()}<div class="lu-head"><span class="eyebrow">Compréhension écrite & orale · 文本理解</span><h1>Le luthier de Venise 🎻</h1><p>${U('intro')}</p><span class="lu-pill">🗓️ ${U('testInfo')}</span></div>
<div class="lu-stats"><div class="stat"><b>${ob==null?'—':ob+'%'}</b><span>${U('bestOral')}</span></div><div class="stat"><b>${READ.length}/${P.length}</b><span>${U('parasRead')}</span></div><div class="stat"><b>${sum}</b><span>${U('stars')}</span></div></div>
<div class="section-title"><div><h2>${U('modes')}</h2></div></div>
<div class="lu-grid">${MODES.map(([k,e,d])=>`<a class="card${k==='oral'?' lu-card-key':''}" href="#/luthier/${k}"><div class="emo" style="--c:#8b5a2b">${e}</div><h3>${U(k)}</h3><p>${U(d)}</p></a>`).join('')}</div>
<div class="section-title"><div><h2>📜 ${P.length} paragraphes</h2></div></div>
<div class="lu-grid">${P.map(p=>`<a class="card" href="#/luthier/read/${p.n}"><b>${pLabel(p)} ${p.emo} ${esc(p.t.fr)}</b>${T(p.t.zh,p.t.en)}<p class="lu-small">${U('page')} ${p.pg}${READ.includes(p.n)?' · ✅':''}</p></a>`).join('')}</div>
<p style="text-align:center;margin-top:16px"><label class="lu-small"><input type="checkbox" id="luSfx" ${sfxOn?'checked':''}> 🔔 SFX</label></p>`}
function bindHome(){const c=$('#luSfx');if(c)c.onchange=e=>{sfxOn=e.target.checked;st.set('sfx',sfxOn)}}
/* ---------- READER ---------- */
function reader(n){return `${top(U('read'))}<div class="lu-head" style="padding:14px 18px"><h1 style="font-size:1.4rem">📖 ${U('read')}</h1><p class="lu-small" style="color:#fff">💡 ${U('tapWord')} · ▶ / 🐢</p><p class="lu-small" style="color:#fff">${U('animTip')}</p>
<div class="lu-row"><button type="button" class="lu-btn" id="luAllTr" style="background:rgba(255,255,255,.15);color:#fff;border-color:rgba(255,255,255,.4)">🌐 ${U('allTrans')}</button></div></div>
<div class="lu-reader">${P.map(p=>paraCard(p,{tr:st.get('allTr',false),scene:1})).join('')}</div>`}
function bindReader(n){loadG('p');loadG('x');const rd=document.querySelector('.lu-reader');if(rd)initScenes(rd);const b=$('#luAllTr');let on=st.get('allTr',false);b.classList.toggle('on',on);
 b.onclick=()=>{on=!on;st.set('allTr',on);b.classList.toggle('on',on);document.querySelectorAll('.lu-para').forEach(c=>{c.classList.toggle('showtr',on);c.querySelector('.lu-trb').classList.toggle('on',on)})};
 if(n){const el=document.getElementById('lp'+n);if(el)setTimeout(()=>toTop(el),50)}
}
/* ---------- LESSONS ---------- */
const LT=[['sum','📖','tSum'],['voc','🔤','tVoc'],['gram','🧩','tGram'],['notes','📝','tNotes']];
function learn(tab){tab=tab||'sum';const tabs=`<div class="lu-tabs">${LT.map(([k,e,l])=>`<a class="${tab===k?'on':''}" href="#/luthier/learn/${k}">${e} ${U(l)}</a>`).join('')}</div>`;let body='';
 if(tab==='sum')body=P.map(p=>`<div class="card lu-para"><h3>${pLabel(p)} ${p.emo} ${esc(p.t.fr)} <span class="lu-small">${U('page')} ${p.pg}</span></h3>${T(p.t.zh,p.t.en)}
  <p class="lu-fr" lang="fr" style="margin-top:8px"><b>🇫🇷</b> ${esc(p.sum.fr)} ${say(p.sum.fr)}</p>${T(p.sum.zh,p.sum.en)}<p><a href="#/luthier/read/${p.n}">📖 ${U('readPara')} →</a></p></div>`).join('');
 else if(tab==='voc')body=`<div class="lu-tabs" id="luVf"><a href="#" data-vf="0" class="on">${U('all')}</a>${P.map(p=>`<a href="#" data-vf="${p.n}">§${p.n}</a>`).join('')}</div>
  <label class="lu-small"><input type="checkbox" id="luHide"> 🙈 ${U('hideTr')}</label><div class="card" style="margin-top:8px"><div class="lu-voc" id="luVoc"></div></div>`;
 else if(tab==='gram')body=D.gram.map(g=>`<div class="card lu-para"><h3>${g.emo} ${esc(g.fr)}</h3>${T(g.zh,g.en)}<div class="lu-fb">${T(g.xzh,g.xen)}</div>
  <p class="lu-small" style="margin-top:10px">📌 ${U('inText')}</p>${g.ex.map(e=>`<div class="lu-ex"><span lang="fr">${esc(e.t)}</span> ${say(e.s)}</div>`).join('')}<p class="lu-small">➕ <span lang="fr">${esc(g.more)}</span></p></div>`).join('');
 else body=`<div class="card lu-para"><h3>📚 ${esc(D.gram.find(g=>g.id==='temps').fr)}</h3><div class="lu-fb">${T(D.gram.find(g=>g.id==='temps').xzh,D.gram.find(g=>g.id==='temps').xen)}</div></div>
  <div class="card lu-para"><h3>📝 ${U('note')}</h3>${P.filter(p=>p.note.length).map(p=>`<p><b>§${p.n} (p.${p.pg})</b></p>${p.note.map(n=>`<div class="lu-ex">${esc(n)}</div>`).join('')}`).join('')}</div>`;
 return `${top(U('learn'))}<h1>🧠 ${U('learn')}</h1>${tabs}${body}`}
function bindLearn(tab){loadG('x');if(tab!=='voc')return;let f='0';
 const draw=()=>{$('#luVoc').innerHTML=VO.filter(v=>f==='0'||v.p==f).map(v=>`<div>${say(v.say)}</div><div><b lang="fr">${esc(v.w)}</b>${T(v.zh,v.en)}</div><div class="lu-small">§${v.p}</div>`).join('');
  document.querySelectorAll('#luVoc .T').forEach(t=>t.onclick=()=>t.classList.add('rv'))};draw();
 document.querySelectorAll('#luVf a').forEach(a=>a.onclick=e=>{e.preventDefault();f=a.dataset.vf;document.querySelectorAll('#luVf a').forEach(x=>x.classList.toggle('on',x===a));draw()});
 $('#luHide').onchange=e=>{document.querySelector('.lu').classList.toggle('hidetr',e.target.checked);draw()}}
/* ---------- PRACTICE ---------- */
const PR=[['a1','🅰️','pA1','pA1d'],['a2a','📗','pA2a','pA2ad'],['a2b','📘','pA2b','pA2bd'],['match','🔗','pMatch','pMatchd'],['fill','🧩','pFill','pFilld'],['gram','✍️','pGram','pGramd'],['b1','📝','pB1','pB1d'],['gramx','➕','pGramX','pGramXd'],['mix','🎮','pMix','pMixd']];const WS=['a1','a2a','a2b','match','fill','gram','b1'];
function saveBest(k,v){const b=st.get('best',{});if(!(b[k]>=v)){b[k]=v;st.set('best',b);return true}return false}
function practiceHub(){const b=st.get('best',{});const card=([k,e,l,d])=>`<a class="card" href="#/luthier/practice/${k}"><div class="emo" style="--c:#8b5a2b">${e}</div>${WS.includes(k)?`<span class="lu-tag">📄 ${U('ws')}</span>`:''}<h3>${U(l)}</h3><p>${U(d)}</p>${b[k]!=null?`<p class="lu-small">🏆 ${b[k]}</p>`:''}</a>`;
 return `${top(U('practice'))}<h1>🎮 ${U('practice')}</h1><div class="section-title"><div><h2>${U('wsTag')}</h2></div></div><div class="lu-grid">${PR.filter(x=>WS.includes(x[0])).map(card).join('')}</div>
 <div class="section-title"><div><h2>${U('extra')}</h2></div></div><div class="lu-grid">${PR.filter(x=>!WS.includes(x[0])).map(card).join('')}</div>`}
const ptabs=cur=>`<div class="lu-tabs">${PR.map(([k,e,l])=>`<a class="${cur===k?'on':''}" href="#/luthier/practice/${k}">${e} ${U(l)}</a>`).join('')}</div>`;
function practice(k){const m=PR.find(x=>x[0]===k);if(!m)return practiceHub();return `${top(U(m[2]))}${ptabs(k)}<p class="lu-small" style="text-align:center"><span class="lu-tag">${U(WS.includes(k)?'wsTag':'extra')}</span></p><div id="luP" class="k-wrap"></div>`}
/* generic Kahoot MCQ runner. item: {q,sub,opts:[text],ok:text,expl,sayQ,sayA,badge,flag} */
function runMCQ(el,items,key,title,o={}){let timerOn=st.get('timer',o.timer!==false);
 const intro=()=>{el.innerHTML=`<div class="card done-screen"><div class="big" style="font-size:3rem">${o.emo||'🎮'}</div><h2>${title}</h2><p>${items.length} ${U('q')} · 🔥 streak</p><p class="lu-small">🏆 ${U('best')} : <b>${(st.get('best',{})[key])??'—'}</b></p>
  <p><label class="lu-small"><input type="checkbox" id="luTm" ${timerOn?'checked':''}> ⏱ ${U('timer')}</label></p><button class="btn btn-primary" id="luGo">▶ ${U('play')}</button></div>`;
  $('#luTm').onchange=e=>{timerOn=e.target.checked;st.set('timer',timerOn)};$('#luGo').onclick=run};
 const run=()=>{loadG('x');let i=0,score=0,streak=0,right=0;const miss=[];const TT=20;
  const q=()=>{if(i>=items.length)return end();const x=items[i];const opts=shuffle(x.opts);const t0=Date.now();let done=false,tick=null;
   el.innerHTML=`<div class="k-top"><span>${i+1}/${items.length}</span><span>⭐ ${score}</span><span>🔥 ${streak}</span></div>${timerOn?'<div class="k-time"><i id="luT" style="width:100%"></i></div>':''}
   <div class="k-q">${x.badge||''}<h2 lang="fr">${x.q}</h2>${x.sayQ?say(x.sayQ):''}${x.sub||''}</div>
   <div class="k-grid${opts.some(t=>t.length>30)?' one':''}">${opts.map((t,j)=>`<button class="k-t c${j%4}" data-o="${esc(t)}">${esc(t)}</button>`).join('')}</div><div id="luF"></div>`;
   toTop(el);
   if(timerOn)tick=setInterval(()=>{const left=Math.max(0,TT-(Date.now()-t0)/1000);const b=$('#luT');if(!b){clearInterval(tick);return}b.style.width=(left/TT*100)+'%';if(left<=0){clearInterval(tick);ans(null)}},100);
   const ans=v=>{if(done)return;done=true;if(tick)clearInterval(tick);const ok=v===x.ok;const dt=(Date.now()-t0)/1000;let pts=0;
    if(ok){streak++;right++;pts=(timerOn?Math.round(1000*(1-dt/TT/2)):1000)+(streak>=3?100*Math.min(streak-2,5):0);score+=pts}else{streak=0;miss.push(x)}
    sfx(ok);el.querySelectorAll('.k-t').forEach(b=>{b.disabled=true;b.classList.add(b.dataset.o===x.ok?'right':'dim')});
    $('#luF').innerHTML=`<div class="k-pop ${ok?'ok':'bad'}">${ok?'✅ +'+pts+(streak>=3?' 🔥×'+streak:''):(v==null?'⏰ '+U('time'):'❌ '+U('bad'))}</div><div class="lu-fb"><p lang="fr">✔️ <b>${esc(x.ok)}</b> ${x.sayA?say(x.sayA):''}</p>${x.expl||''}${x.flag||''}</div>
    <div class="lu-row" style="justify-content:center"><button class="btn btn-primary" id="luN">${i+1<items.length?U('next')+' ▶':U('results')+' 🏁'}</button></div>`;
    if(x.sayA)play(x.sayA);$('#luN').onclick=()=>{i++;q()}};
   el.querySelectorAll('.k-t').forEach(b=>b.onclick=()=>ans(b.dataset.o))};
  const end=()=>{const nb=saveBest(key,score);xp(right*2);if(right===items.length&&H().confetti)H().confetti();
   el.innerHTML=`<div class="card done-screen"><div class="big" style="font-size:3rem">🏁</div><h2>${score} pts · ${right}/${items.length}</h2>${nb?'<p>🏆 New record!</p>':''}
   <button class="btn btn-primary" id="luAg">↻ ${U('again')}</button></div>${miss.length?`<h3>🩹 ${U('review')}</h3>${miss.map(x=>`<div class="lu-fb"><p lang="fr"><b>${x.q}</b></p><p lang="fr">✔️ ${esc(x.ok)}</p>${x.expl||''}</div>`).join('')}`:''}`;
   $('#luAg').onclick=()=>{items=o.regen?o.regen():o.keep?items:shuffle(items);run()}};
  q()};
 intro()}
/* typed/oral-style runner for A2: item {q,sub,hint,model,mtr,kw,extra,sayQ} */
function runTyped(el,items,key,title){let i=0,score=0,streak=0;const res=[];
 const q=()=>{if(i>=items.length)return end();const x=items[i];
  el.innerHTML=`<div class="k-top"><span>${i+1}/${items.length}</span><span>⭐ ${score}</span><span>🔥 ${streak}</span></div><div class="k-q"><h2 lang="fr">${esc(x.q)}</h2>${say(x.q)}${x.sub}${x.hint?`<p class="lu-small">💡 ${U('hint')} : <i>${esc(x.hint)}</i></p>`:''}</div>
  <textarea id="luTa" lang="fr" data-ph="yourAns" placeholder="${esc(L('yourAns'))}" autocapitalize="sentences"></textarea>${accBar()}
  <div class="lu-row"><button class="lu-btn" id="luMic">🎤 ${U('speak')}</button><button class="btn btn-primary" id="luC">${U('check')}</button><button class="lu-btn" id="luDk">${U('dunno')}</button></div><div id="luF"></div>`;toTop(el);
  $('#luMic').onclick=()=>dictate($('#luMic'),$('#luTa'));
  const chk=give=>{if(rec)try{rec.stop()}catch(e){};const v=$('#luTa').value;const g=give?{hits:x.kw.map(()=>false),ratio:0}:kwGrade(v,x.kw);const r=g.ratio;let pts=Math.round(r*1000);
   if(r>=.6){streak++;pts+=streak>=3?100*Math.min(streak-2,5):0}else streak=0;score+=pts;res.push(r);sfx(r>=.6);
   $('#luC').disabled=$('#luDk').disabled=$('#luMic').disabled=true;
   $('#luF').innerHTML=`<div class="k-pop ${r>=.75?'ok':r>=.4?'mid':'bad'}">${r>=.75?'✅ '+U('good'):r>=.4?'🟡 '+U('partial'):'❌ '+U('bad')} · +${pts}</div>
   <div class="lu-fb"><p class="lu-small">🔑 ${U('keywords')} (${g.hits.filter(Boolean).length}/${x.kw.length})</p>${kwChips(x.kw,g.hits)}<p lang="fr">💬 <b>${U('model')} :</b> ${esc(x.model)} ${say(x.model)}</p>${x.mtr}${x.extra||''}</div>
   <div class="lu-row" style="justify-content:center"><button class="btn btn-primary" id="luN">${i+1<items.length?U('next')+' ▶':U('results')+' 🏁'}</button></div>`;play(x.model);$('#luN').onclick=()=>{i++;q()}};
  $('#luC').onclick=()=>chk(false);$('#luDk').onclick=()=>chk(true)};
 const end=()=>{const nb=saveBest(key,score);xp(Math.round(res.reduce((a,b)=>a+b,0)*3));el.innerHTML=`<div class="card done-screen"><div class="big" style="font-size:3rem">🏁</div><h2>${score} pts</h2>${nb?'<p>🏆 New record!</p>':''}<button class="btn btn-primary" id="luAg">↻ ${U('again')}</button></div>`;$('#luAg').onclick=()=>{i=0;score=0;streak=0;res.length=0;items=shuffle(items);q()}};
 q()}
const trQ=x=>T(x.tzh,x.ten);
const vsT=x=>x&&x.fzh?`<div class="lu-flag">${U('vsText')} : ${T(x.fzh,x.fen)}</div>`:'';
const kp=x=>x.kzh?`<p class="lu-small" style="margin-top:8px">📌 ${U('keypoint')}</p>${T(x.kzh,x.ken)}`:'';
const hintP=x=>x.hint?`<p class="lu-small">💡 ${U('hint')} : <i>${esc(x.hint)}</i></p>`:'';
function a2Items(set){return D[set].map(x=>({q:x.q,sub:trQ(x),hint:x.hint||'',model:x.a,mtr:T(x.azh,x.aen),kw:x.kw,extra:kp(x)+vsT(x)}))}
function a2Mcq(set){const all=D[set];return all.map(x=>{const w=x.w||shuffle(all.filter(y=>y!==x).map(y=>y.a)).slice(0,3);return{q:esc(x.q),sayQ:x.q,sub:trQ(x)+hintP(x),opts:[x.a,...w],ok:x.a,sayA:x.a,expl:T(x.azh,x.aen)+kp(x),flag:vsT(x)}})}
const meaning=v=>LG==='zh'?v.zh:LG==='en'?v.en:v.zh+' · '+v.en;
function mixItems(){const it=[];
 a2Mcq('a1').sort(()=>Math.random()-.5).slice(0,4).forEach(x=>{x.badge='<span class="lu-tag">A1</span>';it.push(x)});
 a2Mcq('a2a').sort(()=>Math.random()-.5).slice(0,3).forEach(x=>{x.badge='<span class="lu-tag">A2</span>';it.push(x)});
 gramItems(null).sort(()=>Math.random()-.5).slice(0,4).forEach(x=>{x.badge='<span class="lu-tag">Grammaire</span>';it.push(x)});
 shuffle(VO).slice(0,4).forEach(v=>{const w=shuffle(VO.filter(y=>y!==v&&meaning(y)!==meaning(v))).slice(0,3).map(meaning);it.push({q:`« ${esc(v.w)} »`,sayQ:v.say,sub:`<p class="lu-small">${U('tVoc')} · §${v.p}</p>`,opts:[meaning(v),...w],ok:meaning(v),sayA:v.say,expl:`<p lang="fr">🇫🇷 <b>${esc(v.w)}</b></p>`,badge:'<span class="lu-tag">Vocabulaire</span>'})});
 return shuffle(it)}
function gramItems(ws){return D.gm.filter(x=>ws==null||x.ws===ws).map(x=>({badge:x.ws?`<span class="lu-tag">📄 ${U('ws')} Q${x.n}</span>`:`<span class="lu-tag">➕</span>`,q:esc(x.q).replace('___','<u>&nbsp;?&nbsp;</u>'),sub:'',opts:x.o,ok:x.o[x.c],sayA:x.full,expl:T(x.xzh,x.xen),flag:x.flag==='amonc'?`<div class="lu-flag">${U('keyNote')}: ${T('學習單答案寫「A」，但它自己的解釋說要雙寫 l（ll，不加重音）→ 正確答案是 B. s\'amoncellent。（1990 新拼法也接受 s\'amoncèlent，但這份學習單教的是 ll。）','The key says « A » but its own explanation says to double the l (ll, no accent) → the right answer is B. s\'amoncellent. (The 1990 spelling reform also accepts s\'amoncèlent, but this worksheet teaches the ll form.)')}</div>`:''}))}
function bindPractice(k){loadG('x');const el=$('#luP');if(!el)return;
 if(k==='a1'||k==='a2a'||k==='a2b'){const NM={a1:['pA1','🅰️'],a2a:['pA2a','📗'],a2b:['pA2b','📘']}[k];const md=st.get('a2mode','pick');el.innerHTML=`<div class="lu-row" style="justify-content:center"><button class="lu-btn${md==='pick'?' on':''}" data-md="pick">🅰️ ${U('pick')}</button><button class="lu-btn${md==='type'?' on':''}" data-md="type">⌨️🎤 ${U('type')}</button></div><div id="luP2"></div>`;
  const go=m=>{st.set('a2mode',m);el.querySelectorAll('[data-md]').forEach(b=>b.classList.toggle('on',b.dataset.md===m));const e2=$('#luP2');
   if(m==='pick')runMCQ(e2,a2Mcq(k),k,U(NM[0]),{emo:NM[1],keep:1});else runTyped(e2,a2Items(k),k+'t',U(NM[0]))};
  el.querySelectorAll('[data-md]').forEach(b=>b.onclick=()=>go(b.dataset.md));go(md)}
 else if(k==='gram')runMCQ(el,gramItems(1),'gram',U('pGram'),{emo:'✍️',keep:1});
 else if(k==='gramx')runMCQ(el,shuffle(gramItems(0)),'gramx',U('pGramX'),{emo:'➕'});
 else if(k==='mix')runMCQ(el,mixItems(),'mix',U('pMix'),{emo:'🎮',regen:mixItems});
 else if(k==='match')bindMatch(el);else if(k==='fill')bindFill(el);else if(k==='b1')bindB1(el)}
function bindMatch(el){const M=D.match;const R=shuffle(M.map((m,i)=>i));let sel=null,left=M.length,miss=0;const t0=Date.now();
 el.innerHTML=`<div class="card"><h2>🔗 ${U('pMatch')}</h2><p class="lu-small">${U('tapPair')}</p><div class="lu-match">${M.map((m,i)=>`<button data-l="${i}" lang="fr"><b>${esc(m.w)}</b></button><button data-r="${R[i]}"><span lang="fr"><b>${M[R[i]].L}.</b> ${esc(M[R[i]].d)}</span>${T(M[R[i]].zh,M[R[i]].en)}</button>`).join('')}</div><div id="luMR"></div></div>`;
 el.querySelectorAll('[data-l]').forEach(b=>b.onclick=()=>{if(b.disabled)return;el.querySelectorAll('[data-l]').forEach(c=>c.classList.remove('sel'));b.classList.add('sel');sel=b;play(M[+b.dataset.l].w)});
 el.querySelectorAll('[data-r]').forEach(b=>b.onclick=()=>{if(!sel||b.disabled)return;
  if(sel.dataset.l===b.dataset.r){[sel,b].forEach(c=>{c.classList.remove('sel');c.classList.add('ok');c.disabled=true});sel=null;sfx(true);
   if(--left===0){const s=Math.round((Date.now()-t0)/1000);const sc=Math.max(100,1000-miss*120-s*5);saveBest('match',sc);xp(5);if(!miss&&H().confetti)H().confetti();
    $('#luMR').innerHTML=`<div class="done-screen" style="margin-top:12px"><h2>🏁 ${s} s · ${miss} ${U('errors')} · ${sc} pts</h2><button class="btn btn-primary" id="luAg">↻ ${U('again')}</button></div>`;$('#luAg').onclick=()=>bindMatch(el)}}
  else{miss++;sfx(false);b.classList.add('bad');setTimeout(()=>b.classList.remove('bad'),400)}})}
function bindFill(el){const F=D.fill;const parts=F.text.split(/\{(\d)\}/);const val=Array(F.ans.length).fill(null);
 el.innerHTML=`<div class="card"><h2>🧩 ${U('pFill')}</h2><p class="lu-small">${U('tapFill')}</p><div class="lu-bank">${shuffle(F.ans).map(w=>`<button data-w="${esc(w)}" lang="fr">${esc(w)}</button>`).join('')}</div>
 <p class="lu-fill" lang="fr">${parts.map((s,i)=>i%2?`<button class="lu-blank" data-b="${s}">&nbsp;</button>`:esc(s)).join('')}</p><div class="lu-row"><button class="btn btn-primary" id="luC">${U('check')}</button></div><div id="luF"></div></div>`;
 const draw=()=>{el.querySelectorAll('.lu-blank').forEach(b=>{b.innerHTML=val[+b.dataset.b]?esc(val[+b.dataset.b]):'&nbsp;'});el.querySelectorAll('[data-w]').forEach(b=>b.disabled=val.includes(b.dataset.w))};
 el.querySelectorAll('[data-w]').forEach(b=>b.onclick=()=>{const j=val.indexOf(null);if(j<0)return;val[j]=b.dataset.w;draw()});
 el.querySelectorAll('.lu-blank').forEach(b=>b.onclick=()=>{val[+b.dataset.b]=null;b.classList.remove('ok','bad');draw()});
 $('#luC').onclick=()=>{let n=0;el.querySelectorAll('.lu-blank').forEach(b=>{const j=+b.dataset.b,ok=val[j]===F.ans[j];if(ok)n++;b.classList.toggle('ok',ok);b.classList.toggle('bad',!ok)});
  const sc=n*100;saveBest('fill',sc);sfx(n===F.ans.length);if(n===F.ans.length){xp(5);H().confetti&&H().confetti()}
  $('#luF').innerHTML=`<div class="k-pop ${n===F.ans.length?'ok':n>=3?'mid':'bad'}">${n}/${F.ans.length}</div><div class="lu-fb"><p lang="fr">${esc(F.full)} ${say(F.full)}</p>${T(F.zh,F.en)}
  <ol>${F.ans.map((a,i)=>`<li><b lang="fr">${esc(a)}</b> — ${T(F.why[i].zh,F.why[i].en,'in')}</li>`).join('')}</ol>${vsT(F)}</div><div class="lu-row"><button class="lu-btn" id="luAg">↻ ${U('again')}</button></div>`;$('#luAg').onclick=()=>bindFill(el)};
 draw()}
function bindB1(el){el.innerHTML=D.b1.map((x,i)=>`<div class="card lu-para"><h3>📝 ${i+1}. <span lang="fr">${esc(x.q)}</span></h3>${say(x.q)}${trQ(x)}${hintP(x)}
 <textarea id="luB${i}" lang="fr" data-ph="yourText" placeholder="${esc(L('yourText'))}" style="margin-top:8px"></textarea>${accBar()}<div class="lu-row"><span class="lu-small" id="luBw${i}">0 ${U('words')}</span><button class="lu-btn" data-mic="${i}">🎤 ${U('speak')}</button><button class="btn btn-primary" data-cmp="${i}">${U('compare')}</button></div><div id="luBf${i}"></div></div>`).join('');
 D.b1.forEach((x,i)=>{const ta=$('#luB'+i);const sv=st.get('b1_'+i,'');ta.value=sv;const wc=()=>{$('#luBw'+i).innerHTML=(ta.value.trim()?ta.value.trim().split(/\s+/).length:0)+' '+U('words');st.set('b1_'+i,ta.value)};ta.oninput=wc;wc()});
 el.querySelectorAll('[data-mic]').forEach(b=>b.onclick=()=>dictate(b,$('#luB'+b.dataset.mic)));
 el.querySelectorAll('[data-cmp]').forEach(b=>b.onclick=()=>{const i=+b.dataset.cmp,x=D.b1[i],g=kwGrade($('#luB'+i).value,x.kw);saveBest('b1',Math.max(st.get('best',{}).b1||0,Math.round(g.ratio*1000)));
  $('#luBf'+i).innerHTML=`<div class="lu-fb"><p class="lu-small">🔑 ${U('keywords')} (${g.hits.filter(Boolean).length}/${x.kw.length})</p>${kwChips(x.kw,g.hits)}<p lang="fr">💬 <b>${U('model')} :</b> ${esc(x.a)} ${say(x.a)}</p>${T(x.azh,x.aen)}${vsT(x)}</div>`})}
/* ---------- MOCK ORAL TEST ---------- */
let OR=null;
function oral(){return `${top(U('oral'))}<div class="lu-head" style="padding:14px 18px"><h1 style="font-size:1.4rem">🎤 ${U('oral')}</h1><p class="lu-small" style="color:#fff">${U('oralD')}</p>
 <div class="lu-row"><button class="lu-btn" id="luNew" style="background:rgba(255,255,255,.15);color:#fff;border-color:rgba(255,255,255,.4)">🎲 ${U('newDraw')}</button></div></div><div id="luO" class="k-wrap"></div>`}
function drawOral(n){const picks=shuffle(P).slice(0,3).sort((a,b)=>a.n-b.n);const nWhole=n>=4?n-3:1,nPara=n-nWhole;
 const askP=shuffle(picks).slice(0,nPara);const what=Math.random()*askP.length|0;
 const qs=askP.map((p,i)=>{const bank=OQ.filter(q=>q.p===p.n);const gist=bank.find(q=>/^De quoi parle/.test(q.q));const others=bank.filter(q=>q!==gist);return i===what?gist:shuffle(others)[0]});
 qs.sort((a,b)=>a.p-b.p);shuffle(OQ.filter(q=>q.p===0)).slice(0,nWhole).forEach(q=>qs.push(q));return{picks,qs,step:0,res:[]}}
function bindOral(){loadG('p');loadG('o');const el=$('#luO');
 const startScreen=()=>{const n=st.get('oralN',4),hq=st.get('oralHide',false);el.innerHTML=`<div class="card"><h2>🎓 ${U('oral')}</h2><p>${U('oralIntro')}</p>
  <p class="lu-small">${U('nQ')}</p><div class="lu-row" id="luNq">${[3,4,5].map(k=>`<button class="lu-btn${k===n?' on':''}" data-n="${k}">${k}</button>`).join('')}</div>
  <p><label class="lu-small"><input type="checkbox" id="luHq" ${hq?'checked':''}> 👂 ${U('hideQ')}</label></p><p class="lu-small">🏆 ${U('best')} : ${st.get('oralBest',null)??'—'}${st.get('oralBest',null)!=null?'%':''}</p>
  <button class="btn btn-primary" id="luStart">🎲 ${U('start')}</button></div>`;
  el.querySelectorAll('[data-n]').forEach(b=>b.onclick=()=>{st.set('oralN',+b.dataset.n);el.querySelectorAll('[data-n]').forEach(c=>c.classList.toggle('on',c===b))});
  $('#luHq').onchange=e=>st.set('oralHide',e.target.checked);$('#luStart').onclick=()=>{OR=drawOral(st.get('oralN',4));stepper()}};
 const steps=()=>{const tot=3+OR.qs.length;return `<div class="lu-steps">${Array.from({length:tot},(_,i)=>`<i class="${i<=OR.step?'on':''}"></i>`).join('')}</div>`};
 const stepper=()=>{stopAudio();if(OR.step<3)readStep();else if(OR.step<3+OR.qs.length)qStep();else endOral();toTop(el)};
 const readStep=()=>{const p=OR.picks[OR.step];el.innerHTML=`${steps()}<div class="k-top"><span>📖 ${U('readAloud')} ${OR.step+1}/3</span><span>${OR.picks.map(x=>'§'+x.n).join(' · ')}</span></div>
  <p class="lu-small">💡 ${U('readTip')}</p>${paraCard(p,{extra:`<div class="lu-row"><button class="lu-btn" id="luRec">🎙️ ${U('record')}</button></div><div id="luRecOut"></div>`})}
  <div class="lu-row" style="justify-content:center"><button class="btn btn-primary" id="luN">${OR.step<2?U('next')+' ▶':'❓ '+U('toQs')+' ▶'}</button></div>`;
  $('#luRec').onclick=()=>recToggle($('#luRec'),$('#luRecOut'));$('#luN').onclick=()=>{if(mr)try{mr.stop()}catch(e){};OR.step++;stepper()}};
 const qStep=()=>{const qi=OR.step-3,x=OR.qs[qi],p=x.p?P[x.p-1]:null,hq=st.get('oralHide',false);
  el.innerHTML=`${steps()}<div class="k-top"><span>❓ ${qi+1}/${OR.qs.length}</span><span>${p?`<span class="lu-tag">${U('aboutP')} §${p.n} · ${p.emo} ${esc(p.t.fr)}</span>`:`<span class="lu-tag">🌍 ${U('whole')}</span>`}</span></div>
  <div class="k-q"><button class="lu-big" id="luQa" data-lusay="${esc(x.q)}" aria-label="Listen">🔊</button><h2 lang="fr" id="luQt" style="${hq?'display:none':''}">${esc(x.q)}</h2>${hq?`<button class="lu-btn" id="luShowQ">👁 ${U('showQ')}</button>`:''}
  <details style="margin-top:6px"><summary class="lu-small">🌐 ${U('trans')}</summary>${T(x.tzh,x.ten)}</details>${p?`<details><summary class="lu-small">📖 §${p.n}</summary><div style="text-align:left">${p.fr.map(l=>`<div class="lu-fr" lang="fr">${esc(l)}</div>`).join('')}</div></details>`:''}</div>
  <textarea id="luTa" lang="fr" data-ph="yourAns" placeholder="${esc(L('yourAns'))}"></textarea>${accBar()}
  <div class="lu-row"><button class="lu-btn" id="luMic">🎤 ${U('speak')}</button><button class="btn btn-primary" id="luC">${U('check')}</button><button class="lu-btn" id="luDk">${U('dunno')}</button></div><div id="luF"></div>`;
  setTimeout(()=>play(x.q,{btn:$('#luQa')}),300);if(hq)$('#luShowQ').onclick=e=>{$('#luQt').style.display='';e.target.remove()};
  $('#luMic').onclick=()=>dictate($('#luMic'),$('#luTa'));
  const chk=give=>{if(rec)try{rec.stop()}catch(e){};const g=give?{hits:x.kw.map(()=>false),ratio:0}:kwGrade($('#luTa').value,x.kw);OR.res[qi]={r:g.ratio,ans:$('#luTa').value};sfx(g.ratio>=.6);
   $('#luC').disabled=$('#luDk').disabled=$('#luMic').disabled=true;$('#luQt').style.display='';
   $('#luF').innerHTML=`<div class="k-pop ${g.ratio>=.75?'ok':g.ratio>=.4?'mid':'bad'}">${g.ratio>=.75?'✅ '+U('good'):g.ratio>=.4?'🟡 '+U('partial'):'📘 '+U('model')} · ${Math.round(g.ratio*100)}%</div>
   <div class="lu-fb"><p class="lu-small">🔑 ${U('keywords')} (${g.hits.filter(Boolean).length}/${x.kw.length})</p>${kwChips(x.kw,g.hits)}<p lang="fr">💬 <b>${U('model')} :</b> ${esc(x.a)} ${say(x.a)}</p>${T(x.azh,x.aen)}</div>
   <div class="lu-row" style="justify-content:center"><button class="btn btn-primary" id="luN">${qi+1<OR.qs.length?U('next')+' ▶':U('results')+' 🏁'}</button></div>`;play(x.a);$('#luN').onclick=()=>{OR.step++;stepper()}};
  $('#luC').onclick=()=>chk(false);$('#luDk').onclick=()=>chk(true)};
 const endOral=()=>{const pct=Math.round(OR.res.reduce((a,b)=>a+(b?b.r:0),0)/OR.qs.length*100);const ob=st.get('oralBest',null);if(ob==null||pct>ob)st.set('oralBest',pct);xp(Math.round(pct/10));if(pct>=80&&H().confetti)H().confetti();
  el.innerHTML=`<div class="card done-screen"><div class="big" style="font-size:3rem">🎓</div><h2>${U('done')} ${pct}%</h2><p class="lu-small">${OR.picks.map(p=>`§${p.n} ${p.emo}`).join(' · ')}</p><button class="btn btn-primary" id="luAg">🎲 ${U('newDraw')}</button></div>
  <h3>📋 ${U('review')}</h3>${OR.qs.map((x,i)=>`<div class="lu-fb"><p lang="fr"><b>${i+1}. ${esc(x.q)}</b> <span class="lu-tag">${x.p?'§'+x.p:U('whole')}</span> · ${Math.round((OR.res[i]?OR.res[i].r:0)*100)}%</p>${OR.res[i]&&OR.res[i].ans?`<p class="lu-small" lang="fr">🗣️ ${esc(OR.res[i].ans)}</p>`:''}<p lang="fr">💬 ${esc(x.a)} ${say(x.a)}</p>${T(x.azh,x.aen)}</div>`).join('')}`;
  $('#luAg').onclick=()=>{OR=drawOral(st.get('oralN',4));stepper()}};
 $('#luNew').onclick=()=>{OR=drawOral(st.get('oralN',4));stepper()};
 if(OR&&OR.step>0&&OR.step<3+OR.qs.length)stepper();else startScreen()}
/* ---------- ROUTER ---------- */
window.LUTHIER={route(h){const m=h[1]||'',a=h[2];let html,after;
 if(m==='read'){html=reader(a);after=()=>bindReader(a)}else if(m==='learn'){html=learn(a);after=()=>bindLearn(a||'sum')}
 else if(m==='practice'){html=a?practice(a):practiceHub();after=a?()=>bindPractice(a):null}else if(m==='oral'){html=oral();after=bindOral}else{html=home();after=bindHome}
 return{html:`<div class="lu">${html}</div>`,after}},data:D,kwGrade,drawOral:n=>drawOral(n),play};
})();
