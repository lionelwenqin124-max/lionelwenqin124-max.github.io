// ===== AjieLand games =====
// Shared "ask for an item" helper: resolves when the right item is chosen (tap or drag). Never fails.
function askLoop(my, target, items, dropZone, phrase, onPicked){
  let misses=0;
  const repeat=()=>alive(my)&&Voice.say(phrase);
  setHint(target);
  items.forEach(it=>{
    const w=it.dataset.w;
    const pick=async()=>{ if(!alive(my)||it.dataset.lock) return;
      if(w===target){ items.forEach(i=>i.classList.remove('glow')); it.dataset.lock=1; await flyTo(it,dropZone); onPicked(it); }
      else { it.classList.remove('wiggle'); void it.offsetWidth; it.classList.add('wiggle'); Snd.sfx.boing(); misses++;
        await Voice.say(thatIs(w));
        if(misses>=2) items.forEach(i=>{ if(i.dataset.w===target) i.classList.add('glow'); });
        repeat(); } };
    it._opts.onTap=pick;
    it._opts.onDrop=(x,y)=>{ if(inRect(x,y,dropZone,60)){ if(w===target){ pick(); return true; } pick(); return false; } return false; };
  });
  repeat();
}
// makeItem wrapper that keeps opts mutable
function item(w,x,y,o={}){ const opts=Object.assign({},o); const it=makeItem(w,x,y,{onTap:(e)=>opts.onTap&&opts.onTap(e),onDrop:(a,b,e)=>opts.onDrop?opts.onDrop(a,b,e):false,noLabel:o.noLabel}); it._opts=opts; return it; }
const thatIs = w => WORDS[w]&&WORDS[w].cat==='family'||['money','milk','bread','juice'].includes(w) ? `That's ${w}.` : `That's ${/^[aeiou]/.test(w)?'an':'a'} ${w}.`;
const article = w => ['money','milk','bread','juice'].includes(w)?'the '+w:'the '+w;

/* ---------------- 1. Little Chef ---------------- */
const RECIPES=[
  {name:'Cereal',base:'bowl',steps:[['bowl','Put the bowl on the table.'],['milk','Pour the milk in the bowl.'],['spoon','Put the spoon in the bowl.']],eater:'monster',sentence:'This is a bowl.'},
  {name:'Breakfast',base:'plate',steps:[['plate','Put the plate on the table.'],['bread','Put the bread on the plate.'],['apple','Put the apple on the plate.']],eater:'monster',sentence:'This is a plate.'},
  {name:'Milk for Grandpa',base:'cup',steps:[['cup','Put the cup on the table.'],['milk','Pour the milk in the cup.']],eater:'grandpa',sentence:'This is a cup.'},
  {name:'Soup for Grandma',base:'bowl',steps:[['bowl','Put the bowl on the table.'],['spoon','Put the spoon in the bowl.']],eater:'grandma',sentence:'This is a bowl.'},
  {name:'Juice Party',base:'cup',steps:[['cup','Put the cup on the table.'],['juice','Pour the juice in the cup.'],['plate','Now the plate!'],['apple','Put the apple on the plate.']],eater:'monster',sentence:'This is a cup.'},
];
GAMES.chef={name:'Little Chef',min:6,bg:'linear-gradient(#ffe7a8,#ffbf69)',art:`<span style="font-size:10vmin">🥣</span><span style="font-size:7vmin">🥄</span>`,
 start(root,gs){
  const my=RUNID; gs=gs||{r:Math.floor(Math.random()*RECIPES.length),k:0}; gsSave(gs);
  root.innerHTML=`<div class="gameBg" style="background:linear-gradient(#bfe9ff 0 52%,#e0a96d 52% 60%,#c98a4b 60% 63%,#ffd6e7 63%);"></div>
   <div style="position:absolute;left:8%;top:6%;width:30%;height:30%;background:#fff;border:1.4vmin solid #fff;border-radius:2vmin;box-shadow:inset 0 0 0 9999px #9fe3ff"></div>
   <div style="position:absolute;right:8%;top:8%;font-size:9vmin">🌷</div>
   <div class="mat" style="position:absolute;left:50%;top:56%;width:34vmin;height:16vmin;transform:translate(-50%,-50%);border-radius:50%;background:radial-gradient(#fff 55%,#ffe0ec 56%);box-shadow:0 1vmin 0 rgba(0,0,0,.1)"></div>
   <div class="prompt"></div>`;
  const mat=root.querySelector('.mat'), prompt=root.querySelector('.prompt');
  const shelfWords=['bowl','plate','cup','spoon','milk','bread','apple','juice'];
  async function recipe(){
    if(!alive(my)) return; const R=RECIPES[(gs.r+gs.k)%RECIPES.length];
    root.querySelectorAll('.item,.eater').forEach(e=>e.remove());
    const placed=[];
    // shelf: 5 items including all needed
    const need=R.steps.map(s=>s[0]); const extra=shuffle(shelfWords.filter(w=>!need.includes(w))).slice(0,Math.max(0,5-need.length));
    const row=shuffle(need.concat(extra)); const items=[];
    const portrait=innerHeight>innerWidth;
    row.forEach((w,i)=>{ const it=item(w,(10+i*80/(row.length-1))+'%',portrait?'84%':'82%'); root.appendChild(it); items.push(it); it.classList.add('bounceIn'); });
    await Voice.say(R.eater==='monster'?"Let's cook for Mumu!":`Let's make ${R.name.toLowerCase().replace(' for ',' for ')}!`);
    for(const [w,phrase] of R.steps){
      if(!alive(my)) return;
      prompt.innerHTML=`<span style="font-size:1.4em">${picHTML(w).startsWith('<')?`<span style="display:inline-block;width:1.4em;height:1.4em">${picHTML(w)}</span>`:picHTML(w)}</span> ${wordLabel(w)}`;
      await new Promise(res=>askLoop(my,w,items.filter(i=>!i.dataset.lock),mat,phrase,async it=>{
        const n=placed.length; it.style.zIndex=11+n;
        const off=[[0,-2],[0,-6],[6,-5],[-6,-5]][n]||[0,0];
        it.querySelector('.wl')&&it.querySelector('.wl').remove();
        it.animate([{transform:'translate(-50%,-50%) scale(1)'},{transform:`translate(calc(-50% + ${off[0]}vmin),calc(-50% + ${off[1]}vmin)) scale(${n?0.7:1.1})`}],{duration:300,fill:'forwards'});
        if(['milk','juice'].includes(w)) Snd.sfx.pour(); else Snd.sfx.pop();
        placed.push(it); addStar(); await Voice.say(w+'!'); await sleep(200); res(); }));
    }
    if(!alive(my)) return; setHint(null);
    await bigWord(R.base,R.sentence); if(!alive(my)) return;
    // the eater arrives
    const male=R.eater==='grandpa';
    const eater=el('div','eater'); eater.style.cssText='position:absolute;right:4%;top:22%;width:30vmin;z-index:15;text-align:center';
    eater.innerHTML=R.eater==='monster'?monsterSVG({}):`<div style="font-size:24vmin;line-height:1">${WORDS[R.eater].pic}</div><div class="wl" style="font-size:4vmin;font-weight:900;background:#fff;border-radius:99px;display:inline-block;padding:0 2vmin">${wordLabel(R.eater)}</div>`;
    root.appendChild(eater); eater.animate([{transform:'translateX(60vw)'},{transform:'translateX(0)'}],{duration:600,easing:'cubic-bezier(.3,1.3,.5,1)'});
    prompt.innerHTML=`👉 ${R.eater==='monster'?'Mumu':wordLabel(R.eater)}`;
    if(R.eater!=='monster'){ await Voice.say(`Hello! I'm ${R.eater}!`,{male}); }
    await new Promise(res=>{ let done=false;
      const give=async()=>{ if(done||!alive(my)) return; done=true; mat.style.pointerEvents='none';
        for(const p of placed){ flyTo(p,eater,500); } await sleep(520); Snd.sfx.chomp(); const svg=eater.querySelector('svg'); if(svg) svg.classList.add('chomp');
        placed.forEach(p=>p.animate([{opacity:1},{opacity:0,transform:'translate(-50%,-50%) scale(.2)'}],{duration:500,fill:'forwards'}));
        await sleep(600); confetti(40,75,30); await Voice.say(R.eater==='monster'?'Yum yum! Thank you!':(R.eater==='grandpa'?'Thank you! I love you!':'Thank you, sweetie!'),{male:R.eater==='grandpa',pitch:R.eater==='monster'?1.4:undefined}); res(); };
      Voice.say(R.eater==='monster'?'Give it to Mumu!':`Give it to ${R.eater}!`);
      mat.style.pointerEvents='auto'; mat.onclick=give; eater.onclick=give; placed.forEach(p=>{ p.dataset.lock=''; p._opts.onTap=give; p._opts.onDrop=(x,y)=>{ if(inRect(x,y,eater,80)){give();return true;} return false; }; });
      setTimeout(()=>{ if(!done&&alive(my)) placed[0]&&placed[0].classList.add('glow'); },5000);
    });
    if(!alive(my)) return; addStar(); gs.k++; gsSave(gs);
    if(gs.k>=4){ reward('chef',()=>startGame('chef')); } else { await sleep(500); recipe(); }
  }
  recipe();
 }};

/* ---------------- 2. Family Story ---------------- */
const STORY=[
  {w:'father',t:'This is my father.'},{w:'mother',t:'This is my mother.'},{w:'brother',t:'This is my brother.'},
  {w:'sister',t:'This is my sister.'},{w:'grandpa',t:'This is my grandpa.'},{w:'grandma',t:'This is my grandma.'},
  {w:'family',t:'I love my family.'}];
GAMES.story={name:'My Family Story',min:5,bg:'linear-gradient(#a8e6ff,#7bd88f)',art:`<span style="font-size:7vmin">👴👵<br>👨👩<br>👦👧</span>`,
 start(root,gs){
  const my=RUNID; gs=gs||{p:-1,mode:null}; gsSave(gs);
  const bgs=['#ffe9a8','#ffd1dc','#c9f0ff','#e3d4ff','#d4ffd9','#ffe0c2','#fff3b0'];
  function cover(){
    root.innerHTML=`<div class="gameBg" style="background:linear-gradient(#7fe0ff,#2ADEFA 60%,#82F72D 60%)"></div>
    <div class="storyPage"><div style="font-size:16vmin;line-height:1.1">👨‍👩‍👧‍👦</div><div class="wordmark" style="font-size:min(10vmin,80px);background:linear-gradient(#ffd84d,#f2a900);box-shadow:0 .08em 0 #b77d00">My Family</div>
    <div class="modeBtns"><button class="rfm" style="background:#2a9df4">🔊 Read For Me</button><button class="rbm" style="background:#F47773">👆 Read By Myself</button></div></div>`;
    Voice.say('My Family. Read for me, or read by myself?');
    root.querySelector('.rfm').onclick=()=>{ Snd.sfx.ding(); gs.mode='auto'; gs.p=0; gsSave(gs); page(); };
    root.querySelector('.rbm').onclick=()=>{ Snd.sfx.ding(); gs.mode='self'; gs.p=0; gsSave(gs); page(); };
  }
  async function readSentence(P,box){
    const spans=[...box.querySelectorAll('.wd')]; const words=P.t.split(' ');
    const v=Voice.say(P.t,{rate:0.75}); let t=0;
    for(let i=0;i<spans.length;i++){ spans.forEach(s=>s.classList.remove('reading')); spans[i].classList.add('reading'); await sleep(260+words[i].length*70); }
    await v; spans.forEach(s=>s.classList.remove('reading'));
  }
  async function page(){
    if(!alive(my)) return; const P=STORY[gs.p]; if(!P){ return quiz(); }
    const kw=P.w;
    const pic=kw==='family'?`<div style="font-size:13vmin;line-height:1.1">👴👵👨<br>👩👦👧</div><div style="font-size:8vmin">❤️❤️❤️</div>`:`<div class="storyPic" data-w="${kw}" style="font-size:30vmin;line-height:1.05">${WORDS[kw].pic}</div>`;
    root.innerHTML=`<div class="gameBg" style="background:${bgs[gs.p%bgs.length]}"></div>
     <div style="position:absolute;left:6%;top:12%;width:18vmin;height:18vmin;background:#9fe3ff;border:1.2vmin solid #fff;border-radius:2vmin"></div>
     <div style="position:absolute;right:8%;top:14%;font-size:10vmin">🖼️</div>
     <div class="storyPage">${pic}<div class="storyText">${P.t.split(' ').map(x=>{ const clean=x.replace(/[^a-z]/gi,'').toLowerCase(); return `<span class="wd ${clean===kw?'kw':''}" data-t="${clean}">${x}</span>`; }).join(' ')}${kw!=='family'?`<span class="zh">${WORDS[kw].zh}</span>`:'<span class="zh">我愛我的家人</span>'}</div></div>
     ${gs.p>0?'<div class="arrow prev">◀</div>':''}<div class="arrow next">▶</div>`;
    setHint(kw==='family'?null:kw);
    const box=root.querySelector('.storyText'), next=root.querySelector('.arrow.next'), prev=root.querySelector('.arrow.prev');
    box.querySelectorAll('.wd').forEach(s=>s.onclick=()=>{ Snd.sfx.tap(); Voice.say(s.dataset.t); });
    const sp=root.querySelector('.storyPic'); if(sp) sp.onclick=()=>{ sp.classList.remove('wiggle'); void sp.offsetWidth; sp.classList.add('wiggle'); Voice.say(`Hello! I'm ${kw}!`,{male:!!WORDS[kw].male}); };
    let moved=false;
    next.onclick=()=>{ if(moved) return; moved=true; Snd.sfx.whoosh(); gs.p++; gsSave(gs); addStar(); page(); };
    if(prev) prev.onclick=()=>{ if(moved) return; moved=true; Snd.sfx.whoosh(); gs.p--; gsSave(gs); page(); };
    await sleep(300); if(!alive(my)||moved) return;
    await readSentence(P,box); if(!alive(my)||moved) return;
    if(kw!=='family'){ await sleep(200); await Voice.say(kw+'!'); }
    next.classList.add('pulse');
    if(gs.mode==='auto'){ await sleep(1800); if(alive(my)&&!moved) next.onclick(); }
  }
  async function quiz(){
    const Q=shuffle(['father','mother','brother','sister','grandpa','grandma']).slice(0,3); let qi=gs.q||0;
    const ask=async()=>{
      if(!alive(my)) return; if(qi>=Q.length){ reward('story',()=>startGame('story')); return; }
      const t=Q[qi]; const opts=shuffle([t].concat(shuffle(CAT_WORDS('family').filter(w=>w!==t)).slice(0,2)));
      root.innerHTML=`<div class="gameBg" style="background:linear-gradient(#ffe9a8,#ffd1dc)"></div><div class="prompt">❓ ${wordLabel(t)}</div><div class="zone" style="position:absolute;left:50%;top:50%;width:1px;height:1px"></div>`;
      const zone=root.querySelector('.zone'); const items=opts.map((w,i)=>{ const it=item(w,(22+i*28)+'%','55%'); root.appendChild(it); it.classList.add('bounceIn'); return it; });
      await new Promise(res=>askLoop(my,t,items,zone,`Where is ${t}?`,async it=>{ Snd.sfx.ding(); confetti(30); addStar(); await Voice.say(`Yes! ${t}!`); res(); }));
      qi++; ask();
    };
    ask();
  }
  if(gs.p>=0&&gs.mode) page(); else cover();
 }};

/* ---------------- 3. Pack My Bag ---------------- */
GAMES.bag={name:'Pack My Bag',min:5,bg:'linear-gradient(#c2f970,#82F72D)',art:`<span style="font-size:11vmin">🎒</span><span style="font-size:6vmin">✏️📘🪙</span>`,
 start(root,gs){
  const my=RUNID; gs=gs||{round:0,k:0}; gsSave(gs);
  root.innerHTML=`<div class="gameBg" style="background:linear-gradient(#fff4c2 0 55%,#d9a066 55% 58%,#b9824c 58%)"></div>
   <div style="position:absolute;left:5%;top:5%;width:24vmin;height:16vmin;background:#2e7d4f;border:1.2vmin solid #a0522d;border-radius:1vmin;color:#fff;font-size:4.5vmin;font-weight:900;display:flex;align-items:center;justify-content:center">A B C</div>
   <div class="prompt"></div>
   <div class="bigbag" data-w="bag" style="position:absolute;left:50%;top:70%;transform:translate(-50%,-50%);font-size:34vmin;line-height:1;z-index:5;filter:drop-shadow(0 1.4vmin 0 rgba(0,0,0,.2))">🎒</div>`;
  const bag=root.querySelector('.bigbag'), prompt=root.querySelector('.prompt');
  // lots of book / money / bag repetition (weak words), pencil once, one extra
  function plan(){ return shuffle(['book','money','pencil','book','money',rnd(['cup','spoon','apple'])]); }
  async function round(){
    if(!alive(my)) return; root.querySelectorAll('.item').forEach(e=>e.remove());
    const P=gs.plan||(gs.plan=plan()); gsSave(gs);
    prompt.innerHTML=`🎒 ${wordLabel('bag')}`;
    if(gs.k===0){ setHint('bag'); await Voice.say('This is my bag! Bag!'); bag.animate([{transform:'translate(-50%,-50%) scale(1)'},{transform:'translate(-50%,-50%) scale(1.15)'},{transform:'translate(-50%,-50%) scale(1)'}],{duration:500}); }
    while(gs.k<P.length){
      if(!alive(my)) return; const t=P[gs.k];
      root.querySelectorAll('.item').forEach(e=>e.remove());
      const pool=shuffle(['pencil','book','money','cup','spoon','apple'].filter(w=>w!==t)).slice(0,3).concat([t]); const row=shuffle(pool);
      const items=row.map((w,i)=>{ const pos=[[18,30],[40,24],[62,30],[84,24]][i]; const it=item(w,pos[0]+'%',pos[1]+'%'); it.classList.add('bounceIn'); root.appendChild(it); return it; });
      prompt.innerHTML=`<span style="font-size:1.3em">${picHTML(t)}</span> ${wordLabel(t)} → 🎒`;
      await new Promise(res=>askLoop(my,t,items,bag,`Put ${article(t)} in the bag.`,async it=>{
        it.animate([{transform:'translate(-50%,-50%) scale(1)',opacity:1},{transform:'translate(-50%,-50%) scale(.2)',opacity:0}],{duration:300,fill:'forwards'});
        Snd.sfx.pop(); bag.animate([{transform:'translate(-50%,-50%) scale(1)'},{transform:'translate(-50%,-50%) scale(1.2,0.85)'},{transform:'translate(-50%,-50%) scale(1)'}],{duration:350});
        addStar(); await Voice.say(`${t[0].toUpperCase()+t.slice(1)}! In the bag!`); res(); }));
      gs.k++; gsSave(gs);
    }
    if(!alive(my)) return; root.querySelectorAll('.item').forEach(e=>e.remove());
    prompt.innerHTML=`👆 🎒 ${wordLabel('bag')}`; setHint('bag');
    await new Promise(res=>{ bag.classList.add('glow'); Voice.say('Tap the bag! Zip it up!'); bag.onclick=()=>{ bag.onclick=null; res(); }; });
    Snd.sfx.zip(); bag.classList.remove('glow'); confetti(50,50,60);
    await bigWord('bag','This is my bag.');
    gs.round++; gs.k=0; delete gs.plan; gsSave(gs);
    if(gs.round>=3) reward('bag',()=>startGame('bag')); else { await Voice.say('Again! Pack the bag!'); round(); }
  }
  round();
 }};

/* ---------------- 4. Coloring Time ---------------- */
const CPICS={
  cup:{main:'body',svg:`<path data-p="saucer" d="M40 250 q110 40 220 0 q-10 -20 -110 -22 q-100 2 -110 22z"/><path data-p="body" d="M70 90 h150 v90 a60 60 0 0 1 -60 60 h-30 a60 60 0 0 1 -60 -60z"/><path data-p="handle" d="M220 110 h18 a32 32 0 0 1 0 64 h-18 v-16 h16 a16 16 0 0 0 0 -32 h-16z"/><ellipse data-p="rim" cx="145" cy="90" rx="75" ry="16"/><path data-p="heart" d="M145 200 l-26 -26 a15 15 0 0 1 26 -18 a15 15 0 0 1 26 18z"/>`},
  bag:{main:'body',svg:`<path data-p="handle" d="M120 60 a30 30 0 0 1 60 0 v12 h-14 v-10 a16 16 0 0 0 -32 0 v10 h-14z"/><rect data-p="body" x="60" y="70" width="180" height="200" rx="40"/><path data-p="flap" d="M60 120 a40 40 0 0 1 40 -50 h100 a40 40 0 0 1 40 50 q-90 40 -180 0z"/><rect data-p="pocket" x="95" y="170" width="110" height="75" rx="20"/><rect data-p="strapL" x="40" y="110" width="20" height="120" rx="10"/><rect data-p="strapR" x="240" y="110" width="20" height="120" rx="10"/>`},
  bowl:{main:'bowl',svg:`<path data-p="spoon" d="M200 40 l-40 90 l12 6 l40 -90z"/><ellipse data-p="spoonhead" cx="212" cy="40" rx="20" ry="28"/><path data-p="bowl" d="M30 130 h240 a120 110 0 0 1 -240 0z"/><ellipse data-p="soup" cx="150" cy="130" rx="120" ry="26"/><path data-p="foot" d="M110 236 h80 l12 30 h-104z"/>`},
  book:{main:'cover',svg:`<path data-p="pages" d="M70 60 h170 v200 h-170z"/><rect data-p="cover" x="50" y="45" width="180" height="210" rx="10"/><rect data-p="spine" x="50" y="45" width="30" height="210" rx="8"/><polygon data-p="star" points="155,90 168,125 205,125 175,147 186,182 155,160 124,182 135,147 105,125 142,125"/>`},
  pencil:{main:'wood',svg:`<polygon data-p="wood" points="40,200 200,40 250,90 90,250"/><polygon data-p="tip" points="40,200 90,250 20,270"/><polygon data-p="lead" points="20,270 34,240 50,256"/><polygon data-p="band" points="200,40 215,25 265,75 250,90"/><path data-p="eraser" d="M215 25 l15 -15 a20 20 0 0 1 28 0 l22 22 a20 20 0 0 1 0 28 l-15 15z"/>`},
  grandma:{main:'dress',svg:`<path data-p="dress" d="M70 290 q0 -90 80 -100 q80 10 80 100z"/><circle data-p="bun" cx="150" cy="40" r="26"/><circle data-p="hair" cx="150" cy="115" r="66"/><circle data-p="face" cx="150" cy="128" r="54"/><circle data-p="glassL" cx="128" cy="122" r="14" fill="none"/><circle data-p="glassR" cx="172" cy="122" r="14" fill="none"/><path data-p="smile" d="M128 150 q22 18 44 0" fill="none"/><path data-p="collar" d="M120 196 l30 30 l30 -30 q-30 -8 -60 0z"/>`}
};
const COLORS=[['red','#ff4757'],['blue','#3b82f6'],['yellow','#ffd400'],['green','#2ed573'],['pink','#ff8cc6'],['orange','#ff9f1a'],['purple','#9b59ff'],['brown','#a0632d']];
GAMES.color={name:'Coloring Time',min:6,bg:'linear-gradient(#ffd1f0,#c9b6ff)',art:`<span style="font-size:11vmin">🎨</span><span style="font-size:7vmin">🖍️</span>`,
 start(root,gs){
  const my=RUNID; gs=gs||{done:0}; gsSave(gs);
  function picker(){
    root.innerHTML=`<div class="gameBg" style="background:#fff7e6"></div><div class="prompt">🎨 Pick one!</div><div class="tiles" style="position:absolute;top:14vmin;left:0;right:0;grid-template-columns:repeat(3,1fr)"></div>`;
    const T=root.querySelector('.tiles');
    Object.keys(CPICS).forEach(w=>{ const t=el('div','tile',`<div class="art" style="background:#f0f7ff"><svg viewBox="0 0 300 300" style="width:80%;height:80%" class="colorSvg2">${CPICS[w].svg}</svg></div><div class="lbl">${wordLabel(w)}</div>`);
      t.querySelectorAll('[data-p]').forEach(p=>{ p.setAttribute('fill', p.getAttribute('fill')==='none'?'none':((gs.fills&&gs.fills[w]&&gs.fills[w][p.dataset.p])||'#fff')); p.setAttribute('stroke','#333'); p.setAttribute('stroke-width','5'); });
      t.onclick=()=>{ Snd.sfx.ding(); gs.cur=w; gsSave(gs); canvas(w); }; T.appendChild(t); });
    Voice.say('Pick a picture to color!');
  }
  async function canvas(w){
    if(!alive(my)) return; gs.fills=gs.fills||{}; gs.fills[w]=gs.fills[w]||{};
    root.innerHTML=`<div class="gameBg" style="background:#fff7e6"></div><div class="prompt"><span style="font-size:1.2em">${picHTML(w).startsWith('<')?`<span style="display:inline-block;width:1.2em;height:1.2em">${picHTML(w)}</span>`:picHTML(w)}</span>${wordLabel(w)}</div>
      <svg class="colorSvg" viewBox="0 0 300 300">${CPICS[w].svg}</svg><div class="palette"></div><button class="doneBtn">✔</button>`;
    setHint(w);
    let cur=gs.col||'red';
    const pal=root.querySelector('.palette');
    COLORS.forEach(([n,c])=>{ const b=el('button','crayon'+(n===cur?' sel':'')); b.style.background=c; b.onclick=()=>{ cur=n; gs.col=n; gsSave(gs); pal.querySelectorAll('.crayon').forEach(x=>x.classList.remove('sel')); b.classList.add('sel'); Snd.sfx.tap(); Voice.say(n); }; pal.appendChild(b); });
    root.querySelectorAll('.colorSvg [data-p]').forEach(p=>{
      const isLine=p.getAttribute('fill')==='none';
      if(!isLine) p.setAttribute('fill',gs.fills[w][p.dataset.p]||'#fff');
      p.addEventListener('pointerdown',()=>{ if(isLine){ p.setAttribute('stroke',COLORS.find(c=>c[0]===cur)[1]); p.setAttribute('stroke-width','8'); Snd.sfx.color(); return; }
        const hex=COLORS.find(c=>c[0]===cur)[1]; p.setAttribute('fill',hex); gs.fills[w][p.dataset.p]=hex; gsSave(gs); Snd.sfx.color();
        p.animate([{opacity:.4},{opacity:1}],{duration:250});
        Voice.say(p.dataset.p===CPICS[w].main?`${cur} ${w}!`:`${cur}!`); });
    });
    await Voice.say(`Let's color the ${w}! ${w}!`);
    root.querySelector('.doneBtn').onclick=async()=>{ if(!alive(my)) return; const mainHex=gs.fills[w][CPICS[w].main]; const cn=(COLORS.find(c=>c[1]===mainHex)||[''])[0];
      Snd.sfx.yay(); confetti(60); addStar(2); await Voice.say(cn?`A ${cn} ${w}! Beautiful!`:`Beautiful ${w}!`);
      gs.done++; delete gs.cur; gsSave(gs); if(gs.done%3===0) reward('color',()=>{ startGame('color'); }); else picker(); };
  }
  if(gs.cur) canvas(gs.cur); else picker();
 }};

/* ---------------- 5. Balloon Pop ---------------- */
GAMES.balloon={name:'Balloon Pop',min:5,bg:'linear-gradient(#9fe8ff,#2ADEFA)',art:`<span style="font-size:11vmin">🎈</span><span style="font-size:8vmin">🎈</span>`,
 start(root,gs){
  const my=RUNID; gs=gs||{k:0}; gsSave(gs);
  const ALL=['father','mother','brother','sister','grandpa','grandma','cup','plate','spoon','bowl','pencil','book','bag','money'];
  const seq=gs.seq||(gs.seq=shuffle(['book','bag','money','book','bag','money'].concat(shuffle(ALL.filter(w=>!WEAK.includes(w))).slice(0,6)))); gsSave(gs);
  root.innerHTML=`<div class="gameBg" style="background:linear-gradient(#bff2ff,#2ADEFA 70%,#82F72D 70%)"></div>
   ${[10,40,70].map((x,i)=>`<div class="cloud" style="left:${x}%;top:${10+i*6}%;width:18vmin;height:7vmin"></div>`).join('')}<div class="prompt"></div>`;
  const prompt=root.querySelector('.prompt'); const cols=['#ff4757','#ffa502','#ffd400','#2ed573','#1e90ff','#a55eea','#ff6b81'];
  let balloons=[], target=null, misses=0, busy=false, raf, lastSpawn=0, slots=[12,30,50,70,88];
  function spawn(w){ const b=el('div','balloon',`<div class="b" style="background:${rnd(cols)}"><div class="pic">${picHTML(w)}</div></div><div class="s"></div>`); b.dataset.w=w;
    const used=balloons.map(o=>o.x); const free=slots.filter(s=>!used.some(u=>Math.abs(u-s)<10)); const x=(free.length?rnd(free):rnd(slots));
    const o={el:b,w,x,y:110,sp:0.09+Math.random()*0.04,ph:Math.random()*6}; b.style.left=`calc(${x}% - 10vmin)`; root.appendChild(b); balloons.push(o);
    b.addEventListener('pointerdown',()=>hit(o)); return o; }
  function loop(ts){ if(!alive(my)) return; raf=requestAnimationFrame(loop);
    balloons.forEach(o=>{ o.y-=o.sp; o.el.style.top=o.y+'%'; o.el.style.transform=`translateX(${Math.sin(ts/700+o.ph)*1.5}vmin) rotate(${Math.sin(ts/900+o.ph)*4}deg)`; });
    balloons.filter(o=>o.y<-40).forEach(o=>{ o.el.remove(); });
    balloons=balloons.filter(o=>o.y>=-40);
    if(target && !balloons.some(o=>o.w===target && o.y>-20 && o.y<95) && !balloons.some(o=>o.w===target&&o.y>=95)) spawn(target);
    if(ts-lastSpawn>1700 && balloons.length<5){ lastSpawn=ts; spawn(rnd(ALL.filter(w=>w!==target))); }
  }
  async function hit(o){ if(!alive(my)||o.popped) return;
    if(o.w===target && !busy){ busy=true; o.popped=true; Snd.sfx.pop(); const r=o.el.getBoundingClientRect(); confetti(30,(r.left+r.width/2)/innerWidth*100,(r.top+r.height/3)/innerHeight*100);
      o.el.animate([{transform:'scale(1)'},{transform:'scale(1.5)',opacity:0}],{duration:200,fill:'forwards'}); setTimeout(()=>o.el.remove(),220); balloons=balloons.filter(x=>x!==o);
      addStar(); target=null; setHint(null); await Voice.say(`${o.w}! Pop!`); gs.k++; gsSave(gs); busy=false; next(); }
    else if(!busy){ Snd.sfx.boing(); o.el.firstChild.animate([{transform:'scale(1)'},{transform:'scale(1.15,.85)'},{transform:'scale(1)'}],{duration:300}); misses++;
      if(misses>=2) balloons.forEach(b=>{ if(b.w===target) b.el.classList.add('glow'); });
      await Voice.say(thatIs(o.w)); if(target&&alive(my)) await Voice.say(`Pop the ${target}!`); }
  }
  async function next(){ if(!alive(my)) return;
    if(gs.k>=seq.length){ cancelAnimationFrame(raf); reward('balloon',()=>startGame('balloon')); return; }
    target=seq[gs.k]; misses=0; setHint(target); prompt.innerHTML=`🎈 <span style="font-size:1.2em">${picHTML(target).startsWith('<')?`<span style="display:inline-block;width:1.2em;height:1.2em">${picHTML(target)}</span>`:picHTML(target)}</span> ${wordLabel(target)}`;
    if(!balloons.some(o=>o.w===target)) spawn(target);
    await Voice.say(`Pop the ${target}!`);
  }
  leaveGame=()=>cancelAnimationFrame(raf);
  for(let i=0;i<3;i++){ const o=spawn(rnd(ALL)); o.y=40+i*25; }
  raf=requestAnimationFrame(loop); next();
 }};

/* ---------------- 6. Memory Match ---------------- */
GAMES.memory={name:'Memory Match',min:5,bg:'linear-gradient(#8a5cff,#5800F5)',art:`<span style="font-size:8vmin">🃏</span><span style="font-size:8vmin">📘📘</span>`,
 start(root,gs){
  const my=RUNID; gs=gs||{set:0}; gsSave(gs);
  const SETS=[['father','mother','brother','sister','grandpa','grandma'],['cup','plate','spoon','bowl','book','bag'],['pencil','book','bag','money','cup','spoon']];
  const words=SETS[gs.set%SETS.length];
  const deck=gs.deck||(gs.deck=shuffle(words.concat(words))); gs.matched=gs.matched||[]; gsSave(gs);
  const portrait=innerHeight>innerWidth;
  root.innerHTML=`<div class="gameBg" style="background:radial-gradient(#3b0aa8,#030657)"></div><div class="prompt">🃏 Find the pairs!</div><div class="mgrid" style="grid-template-columns:repeat(${portrait?3:4},auto)"></div>`;
  const G=root.querySelector('.mgrid'); let open=[], lock=false;
  const cards=deck.map((w,i)=>{ const c=el('div','mcard'+(gs.matched.includes(w)?' flip done':''),`<div class="in"><div class="bk">★</div><div class="f"><div class="pic">${picHTML(w)}</div><div class="w">${wordLabel(w)}</div></div></div>`); c.dataset.w=w;
    c.onclick=async()=>{ if(lock||c.classList.contains('flip')||!alive(my)) return; c.classList.add('flip'); Snd.sfx.tap(); open.push(c); Voice.say(w);
      if(open.length===2){ lock=true; const [a,b]=open; await sleep(900); if(!alive(my)) return;
        if(a.dataset.w===b.dataset.w){ Snd.sfx.ding(); addStar(); a.classList.add('done'); b.classList.add('done'); gs.matched.push(w); gsSave(gs); await Voice.say(`${w} and ${w}! Match!`);
          if(gs.matched.length===words.length){ gs.set++; delete gs.deck; gs.matched=[]; gsSave(gs); confetti(80); reward('memory',()=>{ S.gs={set:gs.set}; save(); startGame('memory',true); }); }
        } else { await sleep(300); a.classList.remove('flip'); b.classList.remove('flip'); }
        open=[]; lock=false; } };
    G.appendChild(c); return c; });
  setHint(null); Voice.say('Find the pairs! Tap a card.');
 }};
