// ===== Original synthesized music & SFX (Web Audio) + voice (mp3 override -> speechSynthesis) =====
const Snd = (() => {
  let ctx=null, master, musicGain, sfxGain, bedTimer=null, bedOn=false, musicEnabled=true;
  const N = n => 440*Math.pow(2,(n-69)/12); // midi -> Hz
  function init(){
    if(ctx){ if(ctx.state!=='running') ctx.resume(); return; }
    const AC = window.AudioContext||window.webkitAudioContext; if(!AC) return;
    ctx = new AC();
    master = ctx.createGain(); master.gain.value=0.9;
    const comp = ctx.createDynamicsCompressor(); master.connect(comp); comp.connect(ctx.destination);
    musicGain = ctx.createGain(); musicGain.gain.value=0.55; musicGain.connect(master);
    sfxGain = ctx.createGain(); sfxGain.gain.value=0.8; sfxGain.connect(master);
    // unlock iOS
    const b=ctx.createBuffer(1,1,22050), s=ctx.createBufferSource(); s.buffer=b; s.connect(ctx.destination); s.start(0);
  }
  function env(g,t,a,d,peak){ g.gain.setValueAtTime(0.0001,t); g.gain.exponentialRampToValueAtTime(peak,t+a); g.gain.exponentialRampToValueAtTime(0.0001,t+a+d); }
  function osc(type,f,t,dur,peak,out,a=0.005){ const o=ctx.createOscillator(),g=ctx.createGain(); o.type=type;o.frequency.setValueAtTime(f,t); env(g,t,a,dur,peak); o.connect(g); g.connect(out); o.start(t); o.stop(t+a+dur+0.05); return o; }
  // instruments
  function bell(n,t,v=0.25,out){ out=out||musicGain; const f=N(n); osc('sine',f,t,1.2,v,out); osc('sine',f*2.76,t,0.35,v*0.35,out); osc('triangle',f*2,t,0.6,v*0.25,out); }
  function xylo(n,t,v=0.3,out){ out=out||musicGain; const f=N(n); osc('sine',f,t,0.35,v,out,0.002); osc('sine',f*3.93,t,0.08,v*0.4,out,0.001); }
  function pluck(n,t,v=0.2,out){ out=out||musicGain; const f=N(n); const o=ctx.createOscillator(),fl=ctx.createBiquadFilter(),g=ctx.createGain(); o.type='sawtooth'; o.frequency.value=f; fl.type='lowpass'; fl.frequency.setValueAtTime(f*8,t); fl.frequency.exponentialRampToValueAtTime(f*1.2,t+0.25); env(g,t,0.004,0.4,v); o.connect(fl); fl.connect(g); g.connect(out); o.start(t); o.stop(t+0.5); }
  function marimba(n,t,v=0.25,out){ out=out||musicGain; const f=N(n); osc('sine',f,t,0.5,v,out,0.003); osc('sine',f*4,t,0.06,v*0.25,out,0.001); }
  function uke(n,t,v=0.12,out){ out=out||musicGain; const f=N(n); const o=ctx.createOscillator(),fl=ctx.createBiquadFilter(),g=ctx.createGain(); o.type='triangle'; o.frequency.value=f; fl.type='lowpass'; fl.frequency.value=2400; env(g,t,0.004,0.7,v); o.connect(fl);fl.connect(g);g.connect(out); o.start(t); o.stop(t+0.8); }
  function noise(t,dur,v,hp=4000,out){ out=out||musicGain; const len=Math.floor(ctx.sampleRate*dur), b=ctx.createBuffer(1,len,ctx.sampleRate), d=b.getChannelData(0); for(let i=0;i<len;i++) d[i]=Math.random()*2-1; const s=ctx.createBufferSource(); s.buffer=b; const f=ctx.createBiquadFilter(); f.type='highpass'; f.frequency.value=hp; const g=ctx.createGain(); env(g,t,0.002,dur,v); s.connect(f);f.connect(g);g.connect(out); s.start(t); }
  function kick(t,v=0.5){ const o=ctx.createOscillator(),g=ctx.createGain(); o.frequency.setValueAtTime(150,t); o.frequency.exponentialRampToValueAtTime(45,t+0.15); env(g,t,0.002,0.2,v); o.connect(g);g.connect(musicGain); o.start(t);o.stop(t+0.3); }

  // ---- Launch jingle: ~5.2 s, 150 BPM, bright bells/xylophone/plucks (original melody) ----
  function jingle(){
    init(); if(!ctx) return; const t0=ctx.currentTime+0.05, e=0.2; // eighth note @150bpm
    // whoosh rise
    const o=ctx.createOscillator(),g=ctx.createGain(); o.type='triangle'; o.frequency.setValueAtTime(300,t0); o.frequency.exponentialRampToValueAtTime(1600,t0+0.8); env(g,t0,0.3,0.5,0.08); o.connect(g);g.connect(musicGain); o.start(t0);o.stop(t0+0.9);
    // melody (C major, bouncy)
    const mel=[[72,0],[76,1],[79,2],[84,3],[83,4],[79,5],[81,6],[79,7],[76,8],[77,9],[79,10],[81,11],[79,12],[77,13],[76,14],[74,15],
               [72,16],[76,17],[79,18],[81,19],[84,20],[88,21],[86,22],[84,24]];
    mel.forEach(([n,i])=>{ xylo(n,t0+0.8+i*e,0.28); if(i%2===0) bell(n+12,t0+0.8+i*e,0.07); });
    const bass=[[48,0],[48,2],[53,4],[53,6],[55,8],[55,10],[48,12],[52,14],[53,16],[55,18],[55,20],[48,24]];
    bass.forEach(([n,i])=>pluck(n,t0+0.8+i*e,0.22));
    const ch=[[60,64,67],[65,69,72],[67,71,74],[60,64,67],[65,69,72],[67,71,74]];
    ch.forEach((c,k)=>c.forEach(n=>pluck(n,t0+0.8+k*4*e+e,0.06)));
    for(let i=0;i<24;i+=2){ kick(t0+0.8+i*e,0.35); noise(t0+0.8+(i+1)*e,0.05,0.08); }
    // ta-da sparkle
    const tEnd=t0+0.8+24*e; [72,76,79,84].forEach(n=>bell(n,tEnd,0.12)); [84,88,91,96,100].forEach((n,i)=>bell(n,tEnd+0.06*i,0.06));
    return 0.8+24*e+0.9; // seconds
  }
  // ---- Home bed: warm ukulele + marimba loop @86 BPM (original) ----
  function bedBar(t,bar){
    const b=60/86; const prog=[[60,64,67,72],[57,60,64,69],[53,57,60,65],[55,59,62,67]];
    const c=prog[bar%4];
    [0,1,1.5,2.5,3].forEach((beat,i)=>{ c.forEach((n,j)=>uke(n,t+beat*b+j*0.012,i===0?0.09:0.06)); });
    pluck(c[0]-12,t,0.12); pluck(c[0]-12,t+2*b,0.1);
    const mels=[[76,74,72,74],[72,71,69,67],[69,72,77,76],[74,72,71,74]];
    if(bar%8<4){ mels[bar%4].forEach((n,i)=>marimba(n,t+i*b+(i%2?b*0.5:0),0.13)); }
    else { [c[3]+12,c[2]+12,c[1]+12].forEach((n,i)=>marimba(n,t+(i*1.25+0.5)*b,0.1)); }
    for(let i=0;i<8;i++) noise(t+i*b/2,0.03,i%2?0.02:0.035,7000);
  }
  function startBed(){ init(); if(!ctx||bedOn||!musicEnabled) return; bedOn=true; let bar=0, next=ctx.currentTime+0.1; const b=60/86*4;
    const tick=()=>{ if(!bedOn) return; while(next<ctx.currentTime+1.2){ bedBar(next,bar++); next+=b; } bedTimer=setTimeout(tick,300); }; tick(); }
  function stopBed(){ bedOn=false; clearTimeout(bedTimer); }
  function duck(on){ if(!ctx) return; musicGain.gain.setTargetAtTime(on?0.18:0.55,ctx.currentTime,0.08); }
  function setMusic(on){ musicEnabled=on; if(!on) stopBed(); }
  // ---- SFX ----
  const sfx = {
    pop(){ init(); if(!ctx)return; const t=ctx.currentTime; const o=ctx.createOscillator(),g=ctx.createGain(); o.frequency.setValueAtTime(900,t); o.frequency.exponentialRampToValueAtTime(200,t+0.12); env(g,t,0.002,0.12,0.5); o.connect(g);g.connect(sfxGain);o.start(t);o.stop(t+0.2); noise(t,0.08,0.3,1500,sfxGain); },
    ding(){ init(); if(!ctx)return; const t=ctx.currentTime; [84,88,91].forEach((n,i)=>bell(n,t+i*0.08,0.18,sfxGain)); },
    tap(){ init(); if(!ctx)return; xylo(79,ctx.currentTime,0.25,sfxGain); },
    boing(){ init(); if(!ctx)return; const t=ctx.currentTime; const o=ctx.createOscillator(),g=ctx.createGain(); o.type='triangle'; o.frequency.setValueAtTime(260,t); o.frequency.exponentialRampToValueAtTime(420,t+0.08); o.frequency.exponentialRampToValueAtTime(220,t+0.25); env(g,t,0.005,0.25,0.25); o.connect(g);g.connect(sfxGain);o.start(t);o.stop(t+0.3); },
    whoosh(){ init(); if(!ctx)return; noise(ctx.currentTime,0.35,0.15,800,sfxGain); },
    chomp(){ init(); if(!ctx)return; const t=ctx.currentTime; [0,0.22,0.44].forEach(d=>{ noise(t+d,0.09,0.35,300,sfxGain); osc('square',110,t+d,0.08,0.08,sfxGain); }); },
    yay(){ init(); if(!ctx)return; const t=ctx.currentTime; [72,76,79,84,88].forEach((n,i)=>{xylo(n,t+i*0.09,0.25,sfxGain);}); [84,88,91,96].forEach(n=>bell(n,t+0.5,0.1,sfxGain)); },
    pour(){ init(); if(!ctx)return; const t=ctx.currentTime; for(let i=0;i<10;i++) osc('sine',600+Math.random()*500,t+i*0.06,0.05,0.08,sfxGain); },
    zip(){ init(); if(!ctx)return; const t=ctx.currentTime; const o=ctx.createOscillator(),g=ctx.createGain(); o.type='sawtooth'; o.frequency.setValueAtTime(200,t); o.frequency.linearRampToValueAtTime(900,t+0.4); env(g,t,0.01,0.4,0.05); o.connect(g);g.connect(sfxGain);o.start(t);o.stop(t+0.5); },
    color(){ init(); if(!ctx)return; const t=ctx.currentTime; noise(t,0.15,0.12,2500,sfxGain); xylo(76,t,0.15,sfxGain); }
  };
  // ---- Recorded voice clips through the same (already unlocked) AudioContext: reliable on iPad/iPhone ----
  function playClip(buf,onend){ init(); if(!ctx) return null; const s=ctx.createBufferSource(); s.buffer=buf; const g=ctx.createGain(); g.gain.value=1.0; s.connect(g); g.connect(master); s.onended=onend; s.start(ctx.currentTime+0.02); return s; }
  function decode(ab){ init(); if(!ctx) return Promise.reject(new Error('no ctx')); return new Promise((res,rej)=>{ try{ const p=ctx.decodeAudioData(ab.slice(0),res,rej); if(p&&p.then) p.then(res,rej); }catch(e){ rej(e); } }); }
  return {init,jingle,startBed,stopBed,duck,setMusic,sfx,playClip,decode,get hasCtx(){return !!ctx;},get musicEnabled(){return musicEnabled;}};
})();

// ===== Voice =====
// Recorded clips in audio/<key>.mp3 (listed in audio/manifest.json) automatically replace the device voice.
const Voice = (() => {
  let manifest=new Set(), voicesF=null, voicesM=null, cur=null, curSrc=null, queueId=0;
  const bytes=new Map(), bufs=new Map(), packP=new Map(); let packIdx=null;
  // Iris clips ship as base64 inside audio/voiceN.json packs (GitHub Pages-friendly); per-file audio/<key>.mp3 is the fallback.
  const b64=s=>{ const bin=atob(s), u=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); return u.buffer; };
  function loadPack(n){ if(!packP.has(n)) packP.set(n, fetch('audio/voice'+n+'.json?v=2').then(r=>{ if(!r.ok) throw new Error(r.status); return r.json(); })
      .then(o=>{ for(const k in o){ if(!bytes.has(k)) bytes.set(k, Promise.resolve(b64(o[k]))); } }).catch(e=>{ packP.delete(n); throw e; })); return packP.get(n); }
  const getBytes=k=>{
    if(bytes.has(k)) return bytes.get(k);
    const n=packIdx&&packIdx.clips[k];
    const viaFile=()=>fetch('audio/'+k+'.mp3').then(r=>{ if(!r.ok) throw new Error(r.status); return r.arrayBuffer(); });
    const p=(n? loadPack(n).then(()=>bytes.has(k)?bytes.get(k):viaFile()).catch(viaFile) : viaFile()).catch(e=>{ bytes.delete(k); throw e; });
    bytes.set(k,p); return p; };
  const getBuf=k=>{ if(!bufs.has(k)) bufs.set(k, getBytes(k).then(ab=>Snd.decode(ab)).catch(e=>{ bufs.delete(k); throw e; })); return bufs.get(k); };
  fetch('audio/manifest.json?v=4').then(r=>r.json()).then(a=>{ manifest=new Set(a); }).catch(()=>{});
  fetch('audio/packs.json?v=2').then(r=>r.json()).then(o=>{ packIdx=o;
    // quietly pre-download the packs one by one (≈6 MB total) so voices play instantly later
    let n=1; const next=()=>{ if(n>o.packs) return; loadPack(n++).catch(()=>{}).finally(()=>setTimeout(next,50)); }; next();
  }).catch(()=>{});
  const key = t => t.toLowerCase().replace(/[^a-z0-9]+/g,'_').replace(/^_|_$/g,'');
  function pick(){
    const vs=(window.speechSynthesis&&speechSynthesis.getVoices())||[]; const en=vs.filter(v=>/^en/i.test(v.lang));
    const by=(names)=>{ for(const n of names){ const v=en.find(v=>v.name.indexOf(n)>=0); if(v) return v; } return null; };
    voicesF = by(['Samantha','Karen','Tessa','Moira','Google US English','Aria','Jenny','Zira','Female'])||en.find(v=>/en-US/i.test(v.lang))||en[0]||null;
    voicesM = by(['Daniel','Aaron','Fred','Alex','Google UK English Male','Guy','David','Male'])||voicesF;
  }
  if(window.speechSynthesis){ pick(); speechSynthesis.onvoiceschanged=pick; }
  function prime(){ try{ if(window.speechSynthesis){ const u=new SpeechSynthesisUtterance(' '); u.volume=0; speechSynthesis.speak(u);} }catch(e){} }
  function stop(){ queueId++; try{ speechSynthesis.cancel(); }catch(e){} if(cur){ try{cur.pause();}catch(e){} cur=null; } if(curSrc){ try{curSrc.onended=null; curSrc.stop();}catch(e){} curSrc=null; } Snd.duck(false); }
  // say(text,{male,rate}) -> Promise resolved when finished (never rejects)
  function say(text,o={}){
    stop(); const my=++queueId; Snd.duck(true);
    return new Promise(res=>{
      const done=()=>{ if(my===queueId) Snd.duck(false); res(); };
      const k=key(text);
      if(manifest.has(k)){
        let settled=false; const fin=()=>{ if(!settled){ settled=true; done(); } }; const fallback=()=>{ if(!settled && my===queueId) tts(); };
        if(Snd.hasCtx||window.AudioContext||window.webkitAudioContext){
          getBuf(k).then(buf=>{ if(my!==queueId){ fin(); return; } curSrc=Snd.playClip(buf,()=>{ curSrc=null; fin(); }); if(!curSrc) fallback(); setTimeout(fin,(buf.duration||3)*1000+1500); }).catch(()=>{
            // last resort: plain <audio>, then device voice
            const a=new Audio('audio/'+k+'.mp3'); cur=a; a.onended=fin; a.onerror=fallback; a.play().catch(fallback); setTimeout(fin,9000); });
        } else { const a=new Audio('audio/'+k+'.mp3'); cur=a; a.onended=fin; a.onerror=fallback; a.play().catch(fallback); setTimeout(fin,9000); }
        return;
      }
      tts();
      function tts(){
        if(!window.speechSynthesis){ setTimeout(done,600); return; }
        const u=new SpeechSynthesisUtterance(text); if(!voicesF) pick();
        const v=o.male?voicesM:voicesF; if(v){u.voice=v; u.lang=v.lang;} else u.lang='en-US';
        u.rate=o.rate||0.85; u.pitch=o.pitch||(o.male?1:1.15);
        let fin=false; const f=()=>{ if(!fin){fin=true;done();} }; u.onend=f; u.onerror=f;
        setTimeout(f, 1500+text.length*120);
        speechSynthesis.speak(u);
      }
    });
  }
  return {say,stop,prime,key};
})();
