const norm=s=>s.trim().toLowerCase().replace(/[’']/g,"'").replace(/\s+/g," ").replace(/[.!]$/,"");
const strip=s=>s.normalize("NFD").replace(/[\u0300-\u036f]/g,"");
const state={};let total=0;
function check(it,val){const v=norm(val);for(const a of it.a){if(norm(a)===v)return 2;if(strip(norm(a))===strip(v))return 1}return 0}
function mark(id,res){state[id]=res;const n=Object.values(state).filter(x=>x).length;document.getElementById('score').textContent=`${n} / ${total}`}
function fb(el,ok,it,extra){el.className='fb show '+(ok?'ok':'bad');el.innerHTML=(ok?'✅ ':'❌ ')+(extra||'')+`<br>🇬🇧 ${it.en}<br>🇹🇼 ${it.zh}`}
function render(){const root=document.getElementById('ex');root.innerHTML='';total=0;
SECTIONS.forEach(s=>{root.insertAdjacentHTML('beforeend',`<h2><span>${s.id}</span> ${s.fr}</h2><div class="muted">${s.en} · ${s.zh}</div>`);
s.items.forEach((it,i)=>{const id=s.id+'-'+i;total++;const c=document.createElement('div');c.className='card';c.dataset.id=id;
c.innerHTML=`<div class="q">${i+1}. ${it.q}</div>`;const out=document.createElement('div');out.className='fb';
if(it.t==='fill'||it.t==='tr'){const r=document.createElement('div');r.className='row';const inp=document.createElement('input');inp.placeholder=it.t==='tr'?'Elle…':'…';inp.autocapitalize='off';inp.spellcheck=false;
const b=document.createElement('button');b.textContent='Vérifier';const go=()=>{const k=check(it,inp.value);inp.className=k?'ok':'bad';
fb(out,k,it,k===2?'Parfait !':k===1?`Presque ! Watch the accents 注意重音: <b>${it.a[0]}</b>`:`Réponse : <b>${it.a[0]}</b>`);mark(id,k>0)};
b.onclick=go;inp.onkeydown=e=>{if(e.key==='Enter')go()};r.append(inp,b);c.append(r);
const keys=document.createElement('div');keys.className='row keys';keys.style.marginTop='6px';'é è ê à ç ô î'.split(' ').forEach(ch=>{const k=document.createElement('button');k.textContent=ch;k.onclick=()=>{inp.value+=ch;inp.focus()};keys.append(k)});c.append(keys)}
if(it.t==='mc'){const r=document.createElement('div');r.className='row';const order=it.o.map((o,j)=>j).sort(()=>Math.random()-.5);
order.forEach(j=>{const b=document.createElement('button');b.className='opt';b.textContent=it.o[j];b.onclick=()=>{r.querySelectorAll('button').forEach(x=>x.className='opt');const ok=j===it.a;b.className='opt '+(ok?'ok':'bad');fb(out,ok,it,ok?'Bravo !':`Réponse : <b>${it.o[it.a]}</b>`);mark(id,ok)};r.append(b)});c.append(r)}
if(it.t==='match'){const cols=it.pairs.map(p=>p[1]).sort();const sels=it.pairs.map(p=>{const d=document.createElement('div');d.className='m';d.innerHTML=`<b>${p[0]}</b> est`;const s=document.createElement('select');s.innerHTML='<option value="">—</option>'+cols.map(x=>`<option>${x}</option>`).join('');d.append(s);c.append(d);return s});
const b=document.createElement('button');b.textContent='Vérifier';b.onclick=()=>{let all=true;sels.forEach((s,k)=>{const ok=s.value===it.pairs[k][1];s.className=ok?'ok':'bad';all=all&&ok});
fb(out,all,it,all?'Parfait !':it.pairs.map(p=>p[0]+' est '+p[1]).join(' · '));mark(id,all)};c.append(b)}
c.append(out);root.append(c)})});mark('_',false);delete state['_'];document.getElementById('score').textContent=`0 / ${total}`}
function retry(){const wrong=Object.entries(state).filter(([k,v])=>!v).map(([k])=>k);if(!wrong.length){alert('Aucune erreur ! / No mistakes / 沒有錯誤 🎉');return}
document.querySelectorAll('#ex .card').forEach(c=>{c.style.display=wrong.includes(c.dataset.id)?'':'none'});document.querySelectorAll('#ex h2,#ex .muted').forEach(h=>h.style.display='none');
document.getElementById('all').style.display='';window.scrollTo(0,document.getElementById('ex').offsetTop-60)}
function showAll(){render();document.getElementById('all').style.display='none'}
render();
