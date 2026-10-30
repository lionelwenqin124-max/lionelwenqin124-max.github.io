/* Midterm 期中考 module — exact exam questions, modes: paper, flashcards, speed, match, boss (spaced repetition) */
(()=>{
const K='lfr_mt_';const st={get(k,d){try{const v=localStorage.getItem(K+k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem(K+k,JSON.stringify(v))}catch(e){}}};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const norm=s=>String(s).toLowerCase().replace(/[’`]/g,"'").replace(/\s+/g,' ').replace(/\s*([?!.,])\s*$/,'').trim();
const strip=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'');
const H=()=>window.LFR||{};
const say=t=>{const h=H();if(h.speak)h.speak(t);else if('speechSynthesis' in window){const u=new SpeechSynthesisUtterance(t);u.lang='fr-FR';speechSynthesis.cancel();speechSynthesis.speak(u)}};
/* ---------- DATA ---------- */
const SECS=[
{id:'I',w:20,emo:'🧩',color:'#2b59c3',fr:'Le verbe « être »',zh:'填入適當的 «être» 動詞變化',en:'Fill in the correct form of être'},
{id:'II',w:15,emo:'🌍',color:'#10b981',fr:'Nationalité + profession',zh:'請寫出 3 個不同國籍及職業',en:'Write 3 different nationalities and professions'},
{id:'III',w:30,emo:'👩‍🍳',color:'#ec4899',fr:'Masculin → féminin',zh:'請將下列陽性的名詞與形容詞改為陰性',en:'Change these masculine nouns/adjectives to feminine'},
{id:'IV',w:15,emo:'💼',color:'#f59e0b',fr:'Métiers + qualités',zh:'請將下列職業，填入適當的形容詞',en:'Give each job two suitable adjectives'},
{id:'V',w:15,emo:'🎭',color:'#8b5cf6',fr:'Il est ou Elle est ?',zh:'填入適當的主詞與動詞 «Il est» 或 «Elle est»',en:'Il est or Elle est?'}];
const ETRE={je:'suis',tu:'es',il:'est',elle:'est',nous:'sommes',vous:'êtes',ils:'sont',elles:'sont'};
const ETZH={je:'我',tu:'你',il:'他',elle:'她',nous:'我們',vous:'您／你們',ils:'他們',elles:'她們'};
const I=[['Je','taïwanais.'],['Vous','marié ?'],['Tu','brun.'],['Ils','gentils.'],['Il','étudiant ?'],['Elles','blondes.'],['Elle','grande ?'],['Tu','taïwanaise ?'],['Nous','célibataires.'],['Il','français ?']].map(([p,r],i)=>{const a=ETRE[p.toLowerCase()];return{s:'I',n:i+1,q:`${p} ___ ${r}`,a:[a],full:`${p} ${a} ${r}`,
 en:`${p} → ${a}. être: je suis, tu es, il/elle est, nous sommes, vous êtes, ils/elles sont.`,zh:`${p}（${ETZH[p.toLowerCase()]}）→ ${a}。`}});
const III=[['infirmier','infirmière','-ier → -ière','護士'],['poissonnier','poissonnière','-ier → -ière','魚販'],['danseur','danseuse','-eur (from verb danser) → -euse','舞者'],['serveur','serveuse','-eur (from verb servir) → -euse','服務生'],['présentateur','présentatrice','-teur → -trice','主持人'],['acteur','actrice','-teur → -trice','演員'],['heureux','heureuse','-eux → -euse','快樂的'],['instituteur','institutrice','-teur → -trice','小學老師'],['chanteur','chanteuse','chanteur comes from chanter → -euse (NOT chantrice!)','歌手'],['breton','bretonne','-on → -onne (double n)','布列塔尼的'],['colombien','colombienne','-ien → -ienne (double n)','哥倫比亞的'],['coréen','coréenne','-éen → -éenne (double n)','韓國的'],['bon','bonne','-on → -onne (double n)','好的'],['musicien','musicienne','-ien → -ienne (double n)','音樂家'],['chilien','chilienne','-ien → -ienne (double n)','智利的']]
 .map(([m,f,r,z],i)=>({s:'III',n:i+1,q:m,a:[f],full:f,en:`${m} → ${f}. Rule: ${r}.`,zh:`${z}：${m} → ${f}（${r}）`}));
const ADJ={calme:'calme',souriant:'souriante',curieux:'curieuse',rapide:'rapide','précis':'précise',patient:'patiente',dynamique:'dynamique',gai:'gaie'};
const ADJZH={calme:'冷靜',souriant:'愛笑',curieux:'好奇',rapide:'快速','précis':'精確',patient:'有耐心',dynamique:'有活力',gai:'開朗'};
const IV=[['Un bon chirurgien','m','calme','précis','A surgeon must stay calm and be precise.','外科醫生要冷靜、精確。'],['Une bonne journaliste','f','curieux','rapide','A journalist is curious and quick.','記者要好奇、動作快。'],['Un bon vendeur','m','souriant','dynamique','A salesman smiles and is energetic.','售貨員要愛笑、有活力。'],['Une bonne institutrice','f','patient','calme','A primary-school teacher is patient and calm.','小學老師要有耐心、冷靜。'],['Un bon chanteur','m','gai','dynamique','A singer is cheerful and energetic.','歌手要開朗、有活力。']]
 .map(([job,g,a1,a2,en,zh],i)=>{const P=g==='f'?'Elle':'Il',f=x=>g==='f'?ADJ[x]:x,full=`${P} est ${f(a1)} et ${f(a2)}.`;return{s:'IV',n:i+1,q:`${job} : ___`,job,g,a:[full],full,
 en:`${en} ${g==='f'?'Feminine job → Elle + feminine adjectives (+e: '+[a1,a2].map(x=>x+'→'+ADJ[x]).join(', ')+').':'Masculine job → Il + masculine adjectives.'} Link with ET (and), never EST (is)!`,zh:`${zh}${g==='f'?'陰性職業 → Elle，形容詞也要陰性。':'陽性 → Il。'} 連接用 et（和），不是 est（是）！`}});
const V=[['japonaise','f'],['étudiante','f'],['jeune','b'],['marié','m'],['chinoise','f'],['italienne','f'],['français','m'],['célibataire','b'],['bon','m'],['sympathique','b'],['blond','m'],['petit','m'],['brune','f'],['lycéenne','f'],['amusant','m']]
 .map(([w,g],i)=>({s:'V',n:i+1,q:`___ ${w}.`,g,a:g==='f'?['Elle est']:g==='m'?['Il est']:['Il est','Elle est'],full:g==='f'?`Elle est ${w}.`:g==='m'?`Il est ${w}.`:`Il est ${w}. / Elle est ${w}.`,
 en:g==='b'?`BOTH are correct: « ${w} » ends in -e already, so masculine = feminine.`:g==='f'?`« ${w} » is feminine (ends in -e / -ne / -se) → Elle est.`:`« ${w} » is masculine (no feminine -e) → Il est.`,
 zh:g==='b'?`兩個都對：${w} 本來就以 -e 結尾，陰陽同形。`:g==='f'?`${w} 是陰性 → Elle est。`:`${w} 是陽性 → Il est。`}));
const NAT={'malaisien':'Malaisie 馬來西亞','taïwanais':'Taïwan 台灣','français':'France 法國','japonais':'Japon 日本','chinois':'Chine 中國','coréen':'Corée 韓國','américain':'États-Unis 美國','anglais':'Angleterre 英國','italien':'Italie 義大利','espagnol':'Espagne 西班牙','allemand':'Allemagne 德國','canadien':'Canada 加拿大','colombien':'Colombie 哥倫比亞','chilien':'Chili 智利','mexicain':'Mexique 墨西哥','brésilien':'Brésil 巴西','thaïlandais':'Thaïlande 泰國','vietnamien':'Viêt Nam 越南','suisse':'Suisse 瑞士','belge':'Belgique 比利時','russe':'Russie 俄羅斯','portugais':'Portugal 葡萄牙','indien':'Inde 印度','australien':'Australie 澳洲','breton':'Bretagne 布列塔尼','singapourien':'Singapour 新加坡','indonésien':'Indonésie 印尼','philippin':'Philippines 菲律賓'};
const PRO={'étudiant':'學生','professeur':'教授／老師','médecin':'醫生','infirmier':'護士','journaliste':'記者','acteur':'演員','chanteur':'歌手','danseur':'舞者','serveur':'服務生','vendeur':'售貨員','boulanger':'麵包師','poissonnier':'魚販','instituteur':'小學老師','présentateur':'主持人','chirurgien':'外科醫生','musicien':'音樂家','ingénieur':'工程師','avocat':'律師','architecte':'建築師','dentiste':'牙醫','pharmacien':'藥劑師','cuisinier':'廚師','photographe':'攝影師','secrétaire':'秘書','lycéen':'高中生','pilote':'飛行員','policier':'警察','informaticien':'資訊工程師','coiffeur':'美髮師','directeur':'經理','employé':'職員','commerçant':'商人','peintre':'畫家','écrivain':'作家','traducteur':'翻譯'};
function fem(w){if(/eur$/.test(w)){if(/teur$/.test(w)&&!/chanteur|menteur/.test(w))return w.replace(/teur$/,'trice');return w.replace(/eur$/,'euse')}
 if(/ier$/.test(w))return w.replace(/ier$/,'ière');if(/er$/.test(w))return w.replace(/er$/,'ère');if(/eux$/.test(w))return w.replace(/eux$/,'euse');if(/(ien|éen|on)$/.test(w))return w+'ne';if(/e$/.test(w))return w;return w+'e'}
const FEM_EX={'professeur':['professeur','professeure'],'médecin':['médecin'],'écrivain':['écrivain','écrivaine'],'ingénieur':['ingénieur','ingénieure'],'grec':['grecque']};
const forms=(w)=>FEM_EX[w]||[fem(w)];
const II=[['malaisien','étudiant'],['taïwanais','professeur'],['japonais','médecin'],['coréen','chanteur'],['italien','serveur'],['colombien','danseur']].map(([n,p],i)=>({s:'II',n:i+1,q:`🧑 ${n} + ${p}`,a:[`Je suis ${n} et je suis ${p}.`],full:`Je suis ${n} et je suis ${p}.`,
 en:`Je suis + nationality + ET + je suis + profession. No article before the job (je suis étudiant, not « un étudiant »).`,zh:`我是${NAT[n].split(' ')[1]}人，我是${PRO[p]}。職業前不加冠詞。`}));
const IIf=[['malaisien','étudiant'],['coréen','chanteur'],['colombien','danseur'],['japonais','serveur']].map(([n,p],i)=>{const fn=fem(n),fp=forms(p)[0];return{s:'II',n:7+i,q:`👩 ${n} + ${p} (Elle)`,a:[`Je suis ${fn} et je suis ${fp}.`],full:`Je suis ${fn} et je suis ${fp}.`,
 en:`For a woman both words become feminine: ${n}→${fn}, ${p}→${fp}.`,zh:`女生：兩個字都要變陰性：${n}→${fn}，${p}→${fp}。`}});
const ITEMS={I,II:[...II,...IIf],III,IV,V};
const ALL=[].concat(I,ITEMS.II,III,IV,V);ALL.forEach(x=>x.id=x.s+'-'+x.n);
const MODELII=['Je suis malaisien et je suis étudiant.','Je suis taïwanais et je suis professeur.','Je suis japonais et je suis médecin.'];
/* ---------- GRADING ---------- */
// returns {r:2 perfect,1 accent-only,0 wrong, msg}
function basic(inp,ans){const n=norm(inp);if(!n)return{r:0};for(const a of ans){if(norm(a)===n)return{r:2}}for(const a of ans){if(strip(norm(a))===strip(n))return{r:1,msg:'Presque ! Attention aux accents → '+a}}return{r:0}}
function gradeIV(item,inp){let s=norm(inp).replace(/\.$/,'');const m=s.match(/^(il|elle) (est|et) (\S+) (et|est) (\S+)$/);if(!m)return{r:0,msg:'Format: '+(item.g==='f'?'Elle':'Il')+' est … et … .'};
 const P=item.g==='f'?'elle':'il';let probs=[];if(m[1]!==P)probs.push(`Use ${item.g==='f'?'Elle':'Il'} (${item.g==='f'?'féminin':'masculin'}).`);if(m[2]!=='est')probs.push('First verb = EST (is).');if(m[4]!=='et')probs.push('Link with ET (and), not EST!');
 let acc=false;const chk=w=>{for(const [mm,ff] of Object.entries(ADJ)){const want=item.g==='f'?ff:mm;if(w===want)return true;if(strip(w)===strip(want)){acc=true;return true}if(w===mm||w===ff||strip(w)===strip(mm)||strip(w)===strip(ff)){probs.push(`« ${w} » → ${want} (${item.g==='f'?'feminine':'masculine'}).`);return true}}probs.push(`« ${w} » is not in the list.`);return false};
 chk(m[3]);chk(m[5]);if(m[3]===m[5])probs.push('Choose two different adjectives.');
 if(probs.length)return{r:0,msg:probs.join(' ')};return acc?{r:1,msg:'Presque ! Accents.'}:{r:2,msg:'Model: '+item.full}}
function gradeII(inp,gender){const s=norm(inp).replace(/\.$/,'');const m=s.match(/^je suis (\S+) et je suis (\S+(?: \S+)?)$/);if(!m)return{r:0,msg:'Format: Je suis + nationalité + et je suis + profession.'};
 let nat=m[1],pro=m[2],msg=[],acc=false;if(/^(un|une) /.test(pro)){msg.push('No article: je suis étudiant (not un étudiant).');pro=pro.replace(/^(un|une) /,'')}
 const find=(w,dict)=>{for(const k of Object.keys(dict)){for(const f of [k,...forms(k)]){if(w===f)return{k,f};if(strip(w)===strip(f)){acc=true;return{k,f}}}}return null};
 const a=find(nat,NAT),b=find(pro,PRO);if(!a)msg.push(`Nationality « ${nat} » not recognised.`);if(!b)msg.push(`Profession « ${pro} » not recognised.`);
 if(a&&b){const fa=a.f!==a.k&&forms(a.k).includes(a.f),fb=b.f!==b.k&&forms(b.k).includes(b.f);if(fa!==fb&&!(FEM_EX[b.k]||fem(a.k)===a.k||fem(b.k)===b.k))msg.push('Gender mismatch: both masculine or both feminine.')}
 if(msg.length)return{r:0,msg:msg.join(' '),nat:a&&a.k};return{r:acc?1:2,msg:acc?'Presque ! Accents.':'',nat:a.k}}
function grade(item,inp){if(item.s==='IV')return gradeIV(item,inp);if(item.s==='II'){const g=gradeII(inp);if(g.r&&norm(inp)!==norm(item.full)&&item.n<=10){/* must match the requested words */const b=basic(inp,item.a);return b.r?b:{r:0,msg:'Use the words given: '+item.full}}return g}
 if(item.s==='V'){const n=norm(inp).replace(/^(il|elle)\s*(est)?$/,'$1 est');return basic(n,item.a)}return basic(inp,item.a)}
/* ---------- PROGRESS (Leitner boxes 0..4, mastered at 3+) ---------- */
let M=st.get('box',{});const box=id=>M[id]||0;const saveM=()=>st.set('box',M);
function mark(id,ok){const b=box(id);M[id]=ok?Math.min(4,b+1):0;saveM()}
const mastery=s=>{const it=ITEMS[s];return Math.round(it.reduce((a,x)=>a+Math.min(box(x.id),3),0)/(it.length*3)*100)};
const totalM=()=>Math.round(SECS.reduce((a,s)=>a+mastery(s.id),0)/5);
let celebrated=st.get('cele',{});
function checkMastery(){SECS.forEach(s=>{if(mastery(s.id)===100&&!celebrated[s.id]){celebrated[s.id]=1;st.set('cele',celebrated);H().confetti&&H().confetti();H().toast&&H().toast(`🏆 Section ${s.id} maîtrisée ! Mastered!`)}})}
const xp=n=>H().addXP&&H().addXP(n);
/* ---------- UI helpers ---------- */
const ACC=['é','è','ê','à','â','ç','î','ï','ô','û','ù','ë','œ'];
const accBar=()=>`<div class="mt-acc" aria-label="Accents">${ACC.map(a=>`<button type="button" data-acc="${a}">${a}</button>`).join('')}</div>`;
let lastInput=null;document.addEventListener('focusin',e=>{if(e.target.matches&&e.target.matches('.mt input[type=text]'))lastInput=e.target});
document.addEventListener('mousedown',e=>{if(e.target.matches&&e.target.matches('[data-acc]'))e.preventDefault()});
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-acc]');if(b&&lastInput){const i=lastInput,p=i.selectionStart??i.value.length;i.value=i.value.slice(0,p)+b.dataset.acc+i.value.slice(i.selectionEnd??p);i.focus();i.setSelectionRange(p+1,p+1)}
 const s=e.target.closest&&e.target.closest('[data-mtsay]');if(s){e.preventDefault();say(s.dataset.mtsay)}});
const sayBtn=t=>`<button type="button" class="say say-inline" data-mtsay="${esc(t)}" aria-label="Listen">🔊</button>`;
const expl=x=>`<div class="mt-ex"><p>🇬🇧 ${esc(x.en)}</p><p>🇹🇼 ${esc(x.zh)}</p></div>`;
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const secOf=id=>SECS.find(s=>s.id===id);
const crumbs=t=>`<div class="crumbs"><a href="#/">Accueil</a> › <a href="#/midterm">Midterm</a>${t?' › '+t:''}</div>`;
const MODES=[['paper','📝','Examen blanc','Mock exam paper · 模擬考卷'],['cards','🃏','Flashcards','Flip & listen · 翻卡記憶'],['boss','🐉','Boss battle','Spaced repetition, 3 ❤️ · 錯題重複直到熟練'],['speed','⚡','Speed round','60 seconds · 限時挑戰'],['match','🔗','Matching','Pair them up · 配對遊戲'],['builder','🏗️','Builder II','Nationality + job · 國籍職業組合'],['rules','📌','Cheat-sheet','All rules · 規則整理']];
/* ---------- HOME ---------- */
function home(){const t=totalM();return `${crumbs()}<div class="lesson-head mt-head" style="--c:#ef4135"><span class="eyebrow">Grammaire · 期中考 Midterm</span><h1>Midterm 🎯</h1>
<p>The <b>exact</b> 5 parts of your midterm paper, with every answer. Practise until each bar is full! 老師說考題完全一樣——全部背起來！</p>
<div class="mt-ring" style="--p:${t}"><b>${t}%</b><span>maîtrisé</span></div></div>
<div class="section-title"><div><h2>Modes de jeu</h2><p>Choose how to practise · 選擇練習模式</p></div></div>
<div class="grid g4 mt-modes">${MODES.map(([k,e,f,d])=>`<a class="card" href="#/midterm/${k}"><div class="emo">${e}</div><h3>${f}</h3><p>${d}</p></a>`).join('')}</div>
<div class="section-title"><div><h2>Sections</h2><p>Mastery per section · 各大題熟練度</p></div></div>
<div class="mt-secs">${SECS.map(s=>{const m=mastery(s.id);return `<div class="card mt-sec" style="--c:${s.color}"><div class="mt-sec-h"><span class="emo">${s.emo}</span><div><b>${s.id}. ${esc(s.fr)}</b> <span class="badge">${s.w}%</span><p>${s.zh}</p></div></div>
<div class="bar"><i style="width:${m}%;background:${s.color}"></i></div><div class="mt-sec-a"><small>${m}%${m===100?' 🏆':''}</small><a class="btn btn-ghost" href="#/midterm/cards/${s.id}">🃏</a><a class="btn btn-ghost" href="#/midterm/boss/${s.id}">🐉</a></div></div>`}).join('')}</div>
<p style="text-align:center"><button class="btn btn-ghost" id="mtReset">↺ Reset progress</button></p>`}
/* ---------- PAPER ---------- */
function paper(){let h=`${crumbs('Examen blanc')}<div class="mt-paper card"><div class="mt-ph"><h1>法語文法 期中考</h1><p>Nom : <u>Lionel</u> · Classe : ______</p></div>${accBar()}`;
 h+=`<section data-sec="I"><h3>一、填入適當的 «être» 動詞變化 <span class="badge">20%</span></h3><ol class="mt-ol">${I.map(x=>{const [a,b]=x.q.split('___');return `<li>${esc(a)}<input type="text" data-id="${x.id}" class="mt-in sm" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="${esc(x.q)}">${esc(b)}<span class="mt-fb"></span></li>`}).join('')}</ol></section>`;
 h+=`<section data-sec="II"><h3>二、請寫出 3 個不同國籍及職業 <span class="badge">15%</span></h3><p class="mt-eg">Ex : Je suis français et je suis professeur.</p><ol class="mt-ol">${[1,2,3].map(i=>`<li><input type="text" data-ii="${i}" class="mt-in lg" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Sentence ${i}"><span class="mt-fb"></span></li>`).join('')}</ol></section>`;
 h+=`<section data-sec="III"><h3>三、請將下列陽性的名詞與形容詞改為陰性 <span class="badge">30%</span></h3><p class="mt-eg">Ex : boulanger → boulangère</p><ol class="mt-ol two-col">${III.map(x=>`<li>${esc(x.q)} → <input type="text" data-id="${x.id}" class="mt-in" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="${esc(x.q)} feminine"><span class="mt-fb"></span></li>`).join('')}</ol></section>`;
 h+=`<section data-sec="IV"><h3>四、請將下列四個職業，填入適當的形容詞 <span class="badge">15%</span></h3><p class="mt-eg"><b>calme – souriant – curieux – rapide – précis – patient – dynamique – gai</b><br>Ex : Un bon professeur : Il est souriant et patient.</p><ol class="mt-ol">${IV.map(x=>`<li>${esc(x.job)} : <input type="text" data-id="${x.id}" class="mt-in lg" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="${esc(x.job)}"><span class="mt-fb"></span></li>`).join('')}</ol></section>`;
 h+=`<section data-sec="V"><h3>五、填入適當的主詞與動詞 «Il est» 或 «Elle est» <span class="badge">15%</span></h3><ol class="mt-ol two-col">${V.map(x=>`<li><input type="text" data-id="${x.id}" class="mt-in" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="${esc(x.q)}"> ${esc(x.q.replace('___ ',''))}<span class="mt-fb"></span></li>`).join('')}</ol></section>`;
 h+=`<div class="actions"><button class="btn btn-primary" id="mtGrade">✅ Corriger · 批改</button><button class="btn btn-ghost" id="mtFill">👀 Show answers</button><button class="btn btn-ghost" id="mtClear">↺ Clear</button></div><div id="mtScore"></div></div>`;return h}
function bindPaper(){const fb=(inp,g,item,extra)=>{const f=inp.nextElementSibling;inp.classList.remove('ok','bad','near');inp.classList.add(g.r===2?'ok':g.r===1?'near':'bad');
  f.innerHTML=(g.r===2?' ✅':g.r===1?' 🟡 '+esc(g.msg||'Presque !'):' ❌ '+(item?`<b>${esc(item.full)}</b>`:'')+(g.msg?' <small>'+esc(g.msg)+'</small>':''))+(extra||'')+(item?' '+sayBtn(item.full):'')+(item&&g.r!==2?expl(item):'')};
 $('#mtGrade').onclick=()=>{const per={};SECS.forEach(s=>per[s.id]=[0,0]);
  document.querySelectorAll('.mt-paper [data-id]').forEach(inp=>{const it=ALL.find(x=>x.id===inp.dataset.id),g=grade(it,inp.value);per[it.s][0]+=g.r===2?1:g.r===1?.5:0;per[it.s][1]++;mark(it.id,g.r===2);fb(inp,g,it)});
  const nats=[];document.querySelectorAll('.mt-paper [data-ii]').forEach(inp=>{let g=gradeII(inp.value);if(g.r&&nats.includes(g.nat))g={r:0,msg:'Use a DIFFERENT nationality each time (不同國籍).'};if(g.r)nats.push(g.nat);per.II[0]+=g.r===2?1:g.r===1?.5:0;per.II[1]++;fb(inp,g,null,g.r?'':` <small>e.g. ${esc(MODELII[inp.dataset.ii-1])}</small>`)});
  let tot=0;const rows=SECS.map(s=>{const p=per[s.id],sc=Math.round(p[0]/p[1]*s.w*10)/10;tot+=sc;return `<tr><td>${s.id}. ${esc(s.fr)}</td><td>${p[0]}/${p[1]}</td><td><b>${sc}</b> / ${s.w}</td></tr>`}).join('');
  tot=Math.round(tot*10)/10;$('#mtScore').innerHTML=`<div class="card mt-result"><div class="big">${tot>=90?'🏆':tot>=70?'🎉':'💪'}</div><h2>${tot} / 95</h2><p>(${Math.round(tot/95*100)}% · sections printed as 20+15+30+15+15 = 95%)</p><table class="tbl">${rows}</table></div>`;
  const best=st.get('best',0);if(tot>best)st.set('best',tot);xp(Math.round(tot/5));if(tot>=85)H().confetti&&H().confetti();checkMastery();$('#mtScore').scrollIntoView({behavior:'smooth'})};
 $('#mtFill').onclick=()=>{document.querySelectorAll('.mt-paper [data-id]').forEach(i=>{const it=ALL.find(x=>x.id===i.dataset.id);i.value=(it.s==='V'||it.s==='I')?it.a[0]:it.full});document.querySelectorAll('.mt-paper [data-ii]').forEach(i=>i.value=MODELII[i.dataset.ii-1])};
 $('#mtClear').onclick=()=>{document.querySelectorAll('.mt-paper input').forEach(i=>{i.value='';i.className=i.className.replace(/ ?(ok|bad|near)/g,'');i.nextElementSibling.innerHTML=''});$('#mtScore').innerHTML=''}}
/* ---------- FLASHCARDS ---------- */
function cards(sec){sec=sec||'I';return `${crumbs('Flashcards')}<div class="tabs mt-tabs">${SECS.map(s=>`<a class="tab ${s.id===sec?'on':''}" href="#/midterm/cards/${s.id}">${s.emo} ${s.id}</a>`).join('')}</div>
<p class="mt-hint">${secOf(sec).zh} · Tap to flip · 🔊 listen · mark ✅/❌ to update mastery</p><div class="grid g3 mt-cards">${ITEMS[sec].map(x=>`<div class="flip mt-flip" tabindex="0" role="button" data-id="${x.id}" style="--c:${secOf(sec).color}"><div class="flip-in"><div class="face"><small>${sec}.${x.n}</small><b>${esc(x.q)}</b><small>${box(x.id)>=3?'⭐ maîtrisé':'tap 翻面'}</small></div><div class="face back"><b>${esc(x.full)}</b>${sayBtn(x.full)}<p class="mt-small">${esc(x.zh)}</p><div class="mt-yn"><button data-y="1">✅ Je sais</button><button data-y="0">❌ Encore</button></div></div></div></div>`).join('')}</div>`}
function bindCards(){document.querySelectorAll('.mt-flip').forEach(f=>{f.onclick=e=>{const y=e.target.closest('[data-y]');if(y){e.stopPropagation();mark(f.dataset.id,y.dataset.y==='1');xp(1);f.classList.remove('on');f.querySelector('.face small:last-child').textContent=box(f.dataset.id)>=3?'⭐ maîtrisé':'box '+box(f.dataset.id)+'/3';checkMastery();return}if(e.target.closest('[data-mtsay]'))return;f.classList.toggle('on');if(f.classList.contains('on'))say(ALL.find(x=>x.id===f.dataset.id).full)};f.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();f.classList.toggle('on')}}})}
/* ---------- QUESTION CARD (shared) ---------- */
function qHTML(x,extra){const s=secOf(x.s);const ph=x.s==='IV'?(x.g==='f'?'Elle est … et …':'Il est … et …'):x.s==='II'?'Je suis … et je suis …':x.s==='V'?'Il est / Elle est':'';
 return `<div class="card qcard mt-q" style="--c:${s.color}"><span class="badge">${s.emo} ${s.id}. ${esc(s.fr)}</span><p class="mt-small">${s.zh}${x.s==='IV'?' · calme, souriant, curieux, rapide, précis, patient, dynamique, gai':''}</p><h2 class="mt-prompt">${esc(x.q)}</h2>${extra||''}
 <form id="mtF" autocomplete="off"><input type="text" id="mtA" class="mt-in lg" placeholder="${ph}" autocapitalize="off" spellcheck="false" aria-label="Answer">${accBar()}<div class="actions"><button class="btn btn-primary">Vérifier ↵</button><button type="button" class="btn btn-ghost" id="mtSkip">🤷 Je ne sais pas</button></div></form><div id="mtFb" class="feedback"></div></div>`}
function fbHTML(x,g){return `<div class="mt-fbbox ${g.r===2?'ok':g.r===1?'near':'bad'}"><b>${g.r===2?'✅ Bravo !':g.r===1?'🟡 Presque !':'❌ Pas tout à fait…'}</b> ${g.msg&&g.r!==2?esc(g.msg):''}<p>👉 <b>${esc(x.full)}</b> ${sayBtn(x.full)}</p>${expl(x)}<button class="btn btn-primary" id="mtNext">Suivant →</button></div>`}
/* ---------- BOSS (spaced repetition until mastered) ---------- */
function boss(sec){return `${crumbs('Boss battle')}<div class="tabs mt-tabs"><a class="tab ${!sec?'on':''}" href="#/midterm/boss">🌐 All</a>${SECS.map(s=>`<a class="tab ${s.id===sec?'on':''}" href="#/midterm/boss/${s.id}">${s.emo} ${s.id}</a>`).join('')}</div><div id="mtBoss"></div>`}
function bindBoss(sec){const pool=sec?ITEMS[sec]:ALL;let queue=shuffle(pool.filter(x=>box(x.id)<3));if(!queue.length)queue=shuffle(pool).slice(0,12);queue=queue.slice(0,15);
 const need={};queue.forEach(x=>need[x.id]=1);let hearts=3,streak=0,bossHP=queue.length,max=queue.length,el=$('#mtBoss');
 const hud=()=>`<div class="mt-boss"><div>🐉 Boss <div class="bar mt-hp"><i style="width:${bossHP/max*100}%"></i></div></div><div class="mt-hearts">${'❤️'.repeat(hearts)}${'🖤'.repeat(3-hearts)}</div><div>🔥 ${streak}</div></div>`;
 function next(){if(hearts<=0){el.innerHTML=hud()+`<div class="card done-screen"><div class="big">💀</div><h2>Game over</h2><p>The boss won this time. Missed items will come back first! 錯的題目下次優先出現。</p><button class="btn btn-primary" onclick="location.reload()">↻ Rejouer</button></div>`;return}
  if(!queue.length){H().confetti&&H().confetti();xp(25);el.innerHTML=hud()+`<div class="card done-screen"><div class="big">🏆</div><h2>Boss vaincu !</h2><p>Every question answered correctly. 全部答對！</p><a class="btn btn-primary" href="#/midterm">← Midterm</a> <button class="btn btn-ghost" onclick="location.reload()">↻ Encore</button></div>`;checkMastery();return}
  const x=queue[0];el.innerHTML=hud()+qHTML(x,`<p class="mt-small">${need[x.id]>1?'🔁 Revenge question!':''} Remaining: ${queue.length}</p>`);const a=$('#mtA');a.focus();
  const done=g=>{queue.shift();if(g.r===2){mark(x.id,need[x.id]===1);streak++;bossHP=Math.max(0,bossHP-1);xp(2)}else{mark(x.id,false);hearts-=g.r===1?0:1;streak=0;need[x.id]=2;queue.splice(Math.min(2,queue.length),0,x)}
   $('#mtFb').innerHTML=fbHTML(x,g);$('#mtF').querySelector('.btn-primary').disabled=true;a.disabled=true;if(g.r===2)say(x.full);$('#mtNext').onclick=next;$('#mtNext').focus()};
  $('#mtF').onsubmit=e=>{e.preventDefault();if(!a.value.trim())return;done(grade(x,a.value))};$('#mtSkip').onclick=()=>done({r:0})}
 next()}
/* ---------- SPEED ---------- */
function speed(){return `${crumbs('Speed round')}<div class="card qcard" id="mtSp"><h2>⚡ Speed round · 60 s</h2><p>Quick-fire from sections I, III and V (one-word answers). Each correct = +1, streak bonus! Best: <b>${st.get('speedBest',0)}</b></p><button class="btn btn-primary" id="mtGo">▶ Go!</button></div>`}
function bindSpeed(){$('#mtGo').onclick=()=>{let t=60,score=0,streak=0;const pool=[].concat(I,III,V);const el=$('#mtSp');let x;
 const tick=setInterval(()=>{t--;const s=$('#mtT');if(s)s.textContent=t;if(t<=0||!document.body.contains(el)){clearInterval(tick);end()}},1000);
 function q(){x=pool[Math.random()*pool.length|0];el.innerHTML=`<div class="mt-boss"><div>⏱️ <b id="mtT">${t}</b>s</div><div>⭐ ${score}</div><div>🔥 ${streak}</div></div><span class="badge">${x.s}</span><h2 class="mt-prompt">${esc(x.s==='III'?x.q+' → ?':x.q)}</h2>${x.s==='V'?`<div class="actions"><button class="btn btn-ghost" data-v="Il est">Il est</button><button class="btn btn-ghost" data-v="Elle est">Elle est</button></div>`:`<form id="mtF" autocomplete="off"><input type="text" id="mtA" class="mt-in lg" autocapitalize="off" spellcheck="false" aria-label="Answer">${accBar()}</form>`}<div id="mtFb"></div>`;
  const ans=v=>{const g=grade(x,v);if(g.r>=1){score+=1+(streak>=4?1:0);streak++;mark(x.id,g.r===2)}else{streak=0;mark(x.id,false)}const f=$('#mtFb');el.classList.add(g.r?'flash-ok':'flash-bad');setTimeout(()=>{el.classList.remove('flash-ok','flash-bad');q()},g.r?350:1200);if(f)f.innerHTML=g.r?'✅':'❌ '+esc(x.full)};
  if(x.s==='V')el.querySelectorAll('[data-v]').forEach(b=>b.onclick=()=>ans(b.dataset.v));else{$('#mtA').focus();$('#mtF').onsubmit=e=>{e.preventDefault();ans($('#mtA').value)}}}
 function end(){const b=st.get('speedBest',0);if(score>b){st.set('speedBest',score);H().confetti&&H().confetti()}xp(score);checkMastery();el.innerHTML=`<div class="done-screen"><div class="big">${score>b?'🏆':'⚡'}</div><h2>${score} points</h2><p>${score>b?'Nouveau record ! New best!':'Best: '+b}</p><button class="btn btn-primary" id="mtGo">↻ Rejouer</button></div>`;bindSpeed()}
 q()}}
/* ---------- MATCH ---------- */
function match(){return `${crumbs('Matching')}<div class="tabs mt-tabs">${['I','III','IV','V'].map(s=>`<a class="tab" href="#/midterm/match/${s}">${secOf(s).emo} ${s}</a>`).join('')}</div><div id="mtM"></div>`}
function bindMatch(sec){sec=sec||'III';document.querySelectorAll('.mt-tabs .tab').forEach(a=>a.classList.toggle('on',a.getAttribute('href').endsWith('/'+sec)));
 const pick=shuffle(ITEMS[sec]).slice(0,6);const L=pick.map(x=>({id:x.id,t:sec==='IV'?x.job:x.q})),R=shuffle(pick.map(x=>({id:x.id,t:sec==='I'?x.a[0]+' ('+x.q.split(' ')[0]+')':sec==='V'?x.full:x.full})));
 const el=$('#mtM');let sel=null,left=6,t0=Date.now(),miss=0;
 el.innerHTML=`<p class="mt-hint">${secOf(sec).zh} — tap a left card, then its answer.</p><div class="mt-match"><div>${L.map(x=>`<button class="opt" data-l="${x.id}">${esc(x.t)}</button>`).join('')}</div><div>${R.map(x=>`<button class="opt" data-r="${x.id}">${esc(x.t)}</button>`).join('')}</div></div><div id="mtMr"></div>`;
 el.querySelectorAll('[data-l]').forEach(b=>b.onclick=()=>{el.querySelectorAll('[data-l]').forEach(c=>c.classList.remove('sel'));b.classList.add('sel');sel=b});
 el.querySelectorAll('[data-r]').forEach(b=>b.onclick=()=>{if(!sel||b.disabled)return;if(sel.dataset.l===b.dataset.r){[sel,b].forEach(c=>{c.classList.add('ok');c.disabled=true});say(ALL.find(x=>x.id===b.dataset.r).full);mark(b.dataset.r,true);sel=null;if(--left===0){const s=((Date.now()-t0)/1000).toFixed(1);xp(10);H().confetti&&H().confetti();checkMastery();$('#mtMr').innerHTML=`<div class="card done-screen"><div class="big">🔗</div><h2>${s} s · ${miss} erreur(s)</h2><button class="btn btn-primary" id="mtAgain">↻ Encore</button></div>`;$('#mtAgain').onclick=()=>bindMatch(sec)}}
  else{miss++;b.classList.add('bad');setTimeout(()=>b.classList.remove('bad'),500)}})}
/* ---------- BUILDER (Section II) ---------- */
function builder(){const ns=Object.keys(NAT),ps=Object.keys(PRO);return `${crumbs('Builder II')}<div class="card qcard"><h2>🏗️ Nationalité + profession</h2><p>Section II asks for <b>3 different</b> sentences. Build them here, hear them, then memorise your 3 models. 第二大題要寫 3 句不同國籍＋職業。</p>
<div class="mt-build"><label>👤 <select id="bG"><option value="m">Il / homme (masc.)</option><option value="f">Elle / femme (fém.)</option></select></label><label>🌍 <select id="bN">${ns.map(n=>`<option>${n}</option>`).join('')}</select></label><label>💼 <select id="bP">${ps.map(n=>`<option>${n}</option>`).join('')}</select></label></div>
<div class="mt-out" id="bOut"></div><div class="actions"><button class="btn btn-ghost" id="bRand">🎲 Random</button></div></div>
<div class="card qcard"><h3>⭐ Your 3 model answers (Lionel = malaisien, étudiant)</h3><ol>${MODELII.map(m=>`<li>${esc(m)} ${sayBtn(m)}</li>`).join('')}</ol><p class="mt-small">Rule: Je suis + nationalité <b>et</b> je suis + profession. No « un/une » before the job. 職業前不加冠詞；女生兩個字都變陰性 (malaisienne, étudiante).</p></div>
<div class="card qcard"><h3>✍️ Write it yourself</h3><p class="mt-small">Type any sentence; I'll check grammar, gender and spelling.</p><form id="bF" autocomplete="off"><input type="text" id="bA" class="mt-in lg" placeholder="Je suis … et je suis …" autocapitalize="off" spellcheck="false">${accBar()}<button class="btn btn-primary">Vérifier</button></form><div id="bFb"></div></div>`}
function bindBuilder(){const upd=()=>{const g=$('#bG').value,n=$('#bN').value,p=$('#bP').value,nn=g==='f'?forms(n)[0]:n,pp=g==='f'?forms(p)[0]:p,s=`Je suis ${nn} et je suis ${pp}.`,s3=`${g==='f'?'Elle':'Il'} est ${nn} et ${g==='f'?'elle':'il'} est ${pp}.`;
 $('#bOut').innerHTML=`<p class="mt-big">${esc(s)} ${sayBtn(s)}</p><p>${esc(s3)} ${sayBtn(s3)}</p><p class="mt-small">${NAT[n]} · ${PRO[p]}${g==='f'&&(nn!==n||pp!==p)?` · 陰性：${n}→${nn}, ${p}→${pp}`:''}</p>`};
 ['bG','bN','bP'].forEach(i=>$('#'+i).onchange=upd);$('#bRand').onclick=()=>{['bG','bN','bP'].forEach(i=>{const s=$('#'+i);s.selectedIndex=Math.random()*s.options.length|0});upd()};upd();
 $('#bF').onsubmit=e=>{e.preventDefault();const g=gradeII($('#bA').value);$('#bFb').innerHTML=`<div class="mt-fbbox ${g.r===2?'ok':g.r===1?'near':'bad'}">${g.r===2?'✅ Parfait ! '+sayBtn($('#bA').value):g.r===1?'🟡 '+esc(g.msg):'❌ '+esc(g.msg)}</div>`;if(g.r===2)xp(2)}}
/* ---------- RULES ---------- */
function rules(){return `${crumbs('Cheat-sheet')}<div class="lesson-head" style="--c:#ef4135"><h1>📌 Cheat-sheet</h1><p>Everything you need for the 5 parts. 五大題重點整理。</p></div>
<div class="grid g2 mt-rules">
<div class="card"><h3>🧩 I. être</h3><table class="tbl">${Object.entries(ETRE).map(([p,v])=>`<tr><td>${p==='je'?'je':p}</td><td><b>${v}</b></td><td>${ETZH[p]}</td><td>${sayBtn(p+' '+v)}</td></tr>`).join('')}</table><p class="mt-small">Answers: suis · êtes · es · sont · est · sont · est · es · sommes · est</p></div>
<div class="card"><h3>🌍 II. Nationalité + profession</h3><p><b>Je suis</b> + nationalité <b>et je suis</b> + profession.</p><p>✅ Je suis malaisien et je suis étudiant.<br>❌ Je suis <s>un</s> étudiant · ❌ Je suis malaisien <s>est</s> …</p><p class="mt-small">No article before the job; 3 <b>different</b> nationalities. 職業前不加 un/une。</p></div>
<div class="card"><h3>👩‍🍳 III. Féminin</h3><table class="tbl"><tr><td>-ier → -ière</td><td>infirmière, poissonnière</td></tr><tr><td>-eur → -euse</td><td>danseuse, serveuse, chanteuse</td></tr><tr><td>-teur → -trice</td><td>présentatrice, actrice, institutrice</td></tr><tr><td>-eux → -euse</td><td>heureuse</td></tr><tr><td>-on → -onne</td><td>bretonne, bonne</td></tr><tr><td>-ien/-éen → -ienne/-éenne</td><td>colombienne, coréenne, musicienne, chilienne</td></tr></table><p class="mt-small">⚠️ chanteur → chanteuse (from chanter), not chantrice! -eur 從動詞來 → -euse。</p></div>
<div class="card"><h3>💼 IV. Adjectifs</h3><table class="tbl">${Object.entries(ADJ).map(([m,f])=>`<tr><td>${m}</td><td><b>${f}</b></td><td>${ADJZH[m]}</td></tr>`).join('')}</table><p>${IV.map(x=>`${esc(x.job)} : <b>${esc(x.full)}</b>`).join('<br>')}</p><p class="mt-small">⚠️ <b>ET</b> = and (和) · <b>EST</b> = is (是). Il est calme <b>et</b> précis.</p></div>
<div class="card"><h3>🎭 V. Il est / Elle est</h3><p>Ends in <b>-e, -se, -ne, -te</b> added for feminine → <b>Elle est</b>: japonaise, étudiante, chinoise, italienne, brune, lycéenne.</p><p>No -e → <b>Il est</b>: marié, français, bon, blond, petit, amusant.</p><p>Already ends in -e for both → <b>both OK</b>: jeune, célibataire, sympathique. 本來就 -e 結尾的陰陽同形，兩個都對！</p></div>
</div>`}
/* ---------- ROUTER ENTRY ---------- */
let $=s=>document.querySelector(s);
window.MIDTERM={route(h){const m=h[1]||'',a=h[2];let html,after;
 if(m==='paper'){html=paper();after=bindPaper}else if(m==='cards'){html=cards(a);after=bindCards}else if(m==='boss'){html=boss(a);after=()=>bindBoss(a)}
 else if(m==='speed'){html=speed();after=bindSpeed}else if(m==='match'){html=match();after=()=>bindMatch(a)}else if(m==='builder'){html=builder();after=bindBuilder}else if(m==='rules'){html=rules()}
 else{html=home();after=()=>{$('#mtReset').onclick=()=>{if(confirm('Reset midterm progress?')){M={};celebrated={};saveM();st.set('cele',{});location.reload()}}}}
 return{html:`<div class="mt">${html}</div>`,after}},mastery:totalM,ALL,grade};
})();
