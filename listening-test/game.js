/* Listening practice game engine.
   Everything about the content comes from items.js (window.LISTENING_GAME_DATA): parts, items, scripts,
   options, answers, explanations, file names and timings. This file holds no item content.
   Plain script, no modules and no fetch() of local files, so it also runs from file://. */
(function () {
  'use strict';

  var D = window.LISTENING_GAME_DATA;
  var app = document.getElementById('app');
  var overlayEl = document.getElementById('overlay');
  var liveEl = document.getElementById('live');

  if (!D || !D.items || !D.parts) {
    app.innerHTML = '<div class="card"><p>items.js 沒有載入成功。items.js did not load.</p></div>';
    return;
  }

  var PARTS = {};
  D.parts.forEach(function (p) { PARTS[p.id] = p; });
  var TOTAL = D.items.length;
  var IS_FILE = location.protocol === 'file:';
  var SPEAKER_ZH = { Narrator: '旁白', Man: '男生', Woman: '女生' };

  var S = {
    mode: null,        // 'practice' | 'test' | null
    run: 0,            // changes whenever a mode starts or ends; stale async steps check it and stop
    playTok: 0,        // changes whenever practice audio is (re)started or stopped
    paused: false,
    testLive: false,   // true while the timed test sequence is running
    idx: 0,
    answers: {},       // item number -> letter (test mode)
    first: {},         // item number -> true/false (practice mode, first try)
    seenPart: {},
    blob: {},          // url -> blob url (http/https only)
    video: {},         // item id -> true/false once known
    cur: null          // current practice view state
  };

  /* ---------- small helpers ---------- */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function bi(zh, en) { return '<span class="zh">' + esc(zh) + '</span><span class="en">' + esc(en) + '</span>'; }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function say(text) { liveEl.textContent = ''; setTimeout(function () { liveEl.textContent = text; }, 30); }
  function partItems(pid) { return D.items.filter(function (i) { return i.part === pid; }); }
  function optLabel(it, letter) {
    for (var i = 0; i < it.options.length; i++) {
      if (it.options[i].letter === letter) {
        var o = it.options[i];
        return o.text != null ? { en: o.text, zh: '' } : { en: o.alt.en, zh: o.alt.zh };
      }
    }
    return { en: '', zh: '' };
  }
  function windowMs(it) {
    if (it.answerWindowMs) return it.answerWindowMs;
    var w = D.timing.answerWindowMs;
    return typeof w === 'number' ? w : (w[it.part] || 10000);
  }
  function setScreen(html) {
    app.innerHTML = html;
    window.scrollTo(0, 0);
  }

  /* ---------- overlay ---------- */
  function showOverlay(opts) {
    var h = '<div class="box"><h2 id="overlay-title">' + bi(opts.zh, opts.en) + '</h2>';
    if (opts.textZh) h += '<p>' + bi(opts.textZh, opts.textEn || '') + '</p>';
    if (opts.file) h += '<p class="file">' + esc(opts.file) + '</p>';
    if (opts.meter) h += '<div class="meter"><i></i></div>';
    if (opts.buttons && opts.buttons.length) {
      h += '<div class="btn-row">';
      opts.buttons.forEach(function (b, i) {
        h += '<button class="btn' + (b.ghost ? ' ghost' : '') + '" data-i="' + i + '">' + bi(b.zh, b.en) + '</button>';
      });
      h += '</div>';
    }
    overlayEl.innerHTML = h + '</div>';
    overlayEl.hidden = false;
    (opts.buttons || []).forEach(function (b, i) {
      $('[data-i="' + i + '"]', overlayEl).addEventListener('click', function () { b.fn(); });
    });
    var first = $('button', overlayEl);
    if (first) first.focus();
  }
  function hideOverlay() { overlayEl.hidden = true; overlayEl.innerHTML = ''; }

  /* ---------- audio ----------
     One <audio> element plays all narration. It is unlocked inside the first tap (Start), and after that
     the timed sequence may change its src and call play() without another tap, which is what iOS Safari
     and Android Chrome require. HTMLAudioElement (not Web Audio) is used on purpose: it works from
     file://, and it is not silenced by the iPhone ring/silent switch. */
  var SILENT = (function () {
    // 0.1 s of 16-bit mono silence at 22.05 kHz, built here so no extra file is needed
    var n = 4410, b = new Uint8Array(44 + n), v = new DataView(b.buffer), i, s = '';
    function w(o, t) { for (var k = 0; k < t.length; k++) b[o + k] = t.charCodeAt(k); }
    w(0, 'RIFF'); v.setUint32(4, 36 + n, true); w(8, 'WAVE'); w(12, 'fmt '); v.setUint32(16, 16, true);
    v.setUint16(20, 1, true); v.setUint16(22, 1, true); v.setUint32(24, 22050, true); v.setUint32(28, 44100, true);
    v.setUint16(32, 2, true); v.setUint16(34, 16, true); w(36, 'data'); v.setUint32(40, n, true);
    for (i = 0; i < b.length; i++) s += String.fromCharCode(b[i]);
    return 'data:audio/wav;base64,' + btoa(s);
  })();

  var Player = (function () {
    var a = new Audio();
    a.preload = 'auto';
    a.setAttribute('playsinline', '');
    var cur = null, selfPause = false, unlocked = false, watch = null, lastT = 0, lastMove = 0;
    var api = { onInterrupt: null };

    function stopWatch() { if (watch) { clearInterval(watch); watch = null; } }
    function startWatch() {
      stopWatch();
      lastT = -1; lastMove = Date.now();
      watch = setInterval(function () {
        if (!cur || selfPause || cur.interrupted || S.paused) { lastMove = Date.now(); return; }
        if (a.currentTime !== lastT) { lastT = a.currentTime; lastMove = Date.now(); return; }
        if (Date.now() - lastMove > 12000) interrupt('stalled');
      }, 1000);
    }
    function settle(result) {
      var c = cur; cur = null; stopWatch();
      if (c) c.resolve(result);
    }
    function interrupt(why) {
      if (!cur || cur.interrupted) return;
      cur.interrupted = true;
      if (api.onInterrupt) api.onInterrupt(why);
    }
    function tryPlay() {
      selfPause = false;
      var p;
      try { p = a.play(); } catch (e) { p = null; }
      if (p && p.catch) {
        p.catch(function (err) {
          if (!cur) return;
          var name = err && err.name;
          if (name === 'AbortError' || name === 'NotSupportedError') return; // superseded, or the error event reports it
          interrupt(name || 'blocked');
        });
      }
    }
    a.addEventListener('ended', function () { if (cur && a.ended) settle('ended'); });
    a.addEventListener('error', function () {
      if (!cur) return;
      if (cur.alt) { var alt = cur.alt; cur.alt = null; a.src = alt; tryPlay(); return; }
      settle('error');
    });
    a.addEventListener('pause', function () {
      // a pause we did not ask for: phone call, headphones unplugged, another app taking audio
      setTimeout(function () { if (cur && a.paused && !a.ended && !selfPause) interrupt('paused'); }, 120);
    });
    a.addEventListener('playing', function () { if (cur) cur.interrupted = false; lastMove = Date.now(); });

    api.unlock = function () {
      if (unlocked) return;
      unlocked = true;
      try {
        a.src = SILENT;
        a.load();
        var p = a.play();
        if (p && p.catch) p.catch(function () {});
      } catch (e) { /* the tap-to-continue overlay covers a failed unlock */ }
    };
    api.play = function (url) {
      api.stop();
      return new Promise(function (resolve) {
        cur = { resolve: resolve, url: url, alt: S.blob[url] ? url : null, interrupted: false };
        a.src = S.blob[url] || url;
        startWatch();
        tryPlay();
      });
    };
    api.stop = function () {
      selfPause = true;
      try { a.pause(); } catch (e) {}
      if (cur) settle('stopped');
    };
    api.pause = function () { if (cur) { selfPause = true; try { a.pause(); } catch (e) {} } };
    api.resume = function () { if (cur) { cur.interrupted = false; lastMove = Date.now(); tryPlay(); } };
    api.busy = function () { return !!cur; };
    return api;
  })();

  var sfx = {};
  ['correct', 'wrong'].forEach(function (k) {
    var a = new Audio();
    a.preload = 'auto';
    a.setAttribute('playsinline', '');
    a.src = D.sfx[k];
    sfx[k] = a;
  });
  function primeSfx() { ['correct', 'wrong'].forEach(function (k) { try { sfx[k].load(); } catch (e) {} }); }
  function playSfx(kind) {
    var a = sfx[kind];
    if (!a) return;
    try { a.pause(); a.currentTime = 0; } catch (e) {}
    var p;
    try { p = a.play(); } catch (e) { p = null; }
    if (p && p.catch) p.catch(function () {});
  }

  /* On http(s) the narration for the chosen mode is fetched once and kept in memory, so the game keeps
     working if the connection drops and the test timing is never held up by buffering.
     From file:// nothing is fetched: the <audio> element reads the files directly. */
  function mime(u) {
    var e = u.split('?')[0].split('.').pop().toLowerCase();
    return { mp3: 'audio/mpeg', m4a: 'audio/mp4', mp4: 'audio/mp4', aac: 'audio/aac', wav: 'audio/wav', ogg: 'audio/ogg' }[e] || 'audio/mpeg';
  }
  function preload(urls, onProgress) {
    if (IS_FILE || !window.fetch || !window.URL || !URL.createObjectURL) return Promise.resolve();
    var done = 0;
    return Promise.all(urls.map(function (u) {
      if (S.blob[u]) { done++; onProgress(done, urls.length); return null; }
      var timer;
      var job = fetch(u).then(function (r) {
        if (!r.ok) throw new Error('http ' + r.status);
        return r.arrayBuffer();
      }).then(function (buf) {
        S.blob[u] = URL.createObjectURL(new Blob([buf], { type: mime(u) }));
      });
      var timeout = new Promise(function (res) { timer = setTimeout(res, 25000); });
      return Promise.race([job, timeout]).catch(function () {}).then(function () {
        clearTimeout(timer); done++; onProgress(done, urls.length);
      });
    }));
  }
  function allAudio() {
    var urls = [D.sfx.correct, D.sfx.wrong];
    D.parts.forEach(function (p) { if (p.introAudio) urls.push(p.introAudio); });
    D.items.forEach(function (it) { urls.push(it.audio.test); });
    return urls;
  }
  function prepare(urls) {
    D.items.forEach(function (it) {
      it.options.forEach(function (o) { if (o.image) { var im = new Image(); im.src = o.image; } });
    });
    if (IS_FILE) return Promise.resolve();
    showOverlay({ zh: '準備中…', en: 'Getting ready…', textZh: '正在載入音檔', textEn: 'Loading the audio', meter: true });
    return preload(urls, function (d, n) {
      var m = $('.meter > i', overlayEl);
      if (m) m.style.width = Math.round(d / n * 100) + '%';
    }).then(function () {
      ['correct', 'wrong'].forEach(function (k) {
        if (S.blob[D.sfx[k]] && sfx[k].paused && sfx[k].src !== S.blob[D.sfx[k]]) sfx[k].src = S.blob[D.sfx[k]];
      });
      hideOverlay();
      // then fetch the other mode's audio quietly, so switching modes also works without a connection
      preload(allAudio(), function () {});
    });
  }

  /* keep the phone screen on during a run, where the browser allows it (https only) */
  var wakeLock = null;
  function keepAwake(on) {
    try {
      if (on && navigator.wakeLock && !wakeLock) {
        navigator.wakeLock.request('screen').then(function (l) {
          wakeLock = l;
          l.addEventListener('release', function () { wakeLock = null; });
        }).catch(function () {});
      } else if (!on && wakeLock) {
        wakeLock.release().catch(function () {});
        wakeLock = null;
      }
    } catch (e) {}
  }

  /* a timer that stops while the test is paused */
  function sleep(ms, run, onTick) {
    return new Promise(function (resolve) {
      var elapsed = 0, last = Date.now();
      (function tick() {
        if (run !== S.run) return resolve(false);
        var now = Date.now();
        if (!S.paused) elapsed += Math.min(now - last, 1000);
        last = now;
        if (onTick) onTick(Math.min(elapsed, ms));
        if (elapsed >= ms) return resolve(true);
        setTimeout(tick, 50);
      })();
    });
  }

  /* ---------- shared pieces of UI ---------- */
  function topbar(modeZh, modeEn, num) {
    var steps = '';
    for (var i = 1; i <= TOTAL; i++) {
      var prev = D.items[i - 2], me = D.items[i - 1];
      var cls = (i < num ? 'done' : (i === num ? 'now' : '')) + (prev && prev.part !== me.part ? ' gap' : '');
      steps += '<i class="' + cls + '"></i>';
    }
    return '<header class="topbar"><div class="row">' +
      '<button class="icon-btn" id="quit" aria-label="離開 Leave">✕</button>' +
      '<div class="where"><div class="mode-label">' + esc(modeZh) + ' ' + esc(modeEn) + '</div>' +
      '<div class="count">' + (num ? '第 ' + num + ' 題 <small>/ ' + TOTAL + ' · Question ' + num + ' of ' + TOTAL + '</small>' : '&nbsp;') + '</div></div></div>' +
      '<div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="' + TOTAL + '" aria-valuenow="' + (num || 0) + '" aria-label="進度 Progress"><i style="width:' + ((num || 0) / TOTAL * 100) + '%"></i></div>' +
      '<div class="steps" aria-hidden="true">' + steps + '</div></header>';
  }
  function partChip(part) {
    return '<span class="part-chip">Part ' + esc(part.id) + ' <span>' + esc(part.title.zh) + '</span><span class="en">' + esc(part.title.en) + '</span></span>';
  }
  function partCard(part) {
    return '<div class="card part-intro"><div class="big">Part ' + esc(part.id) + '</div>' +
      '<h2>' + bi(part.title.zh, part.title.en) + '</h2>' +
      '<div class="dir"><p lang="en">' + esc(part.directions.en) + '</p><p>' + esc(part.directions.zh) + '</p></div>' +
      (part.howItWorks ? '<p class="how">' + esc(part.howItWorks.zh) + '<span class="en" lang="en">' + esc(part.howItWorks.en) + '</span></p>' : '') +
      '</div>';
  }
  function optionsHtml(it, state) {
    // state: { chosen, reveal }  reveal=true marks correct / wrong and disables the buttons
    var pics = it.options.some(function (o) { return !!o.image; });
    var h = '<div class="options' + (pics ? ' pics' : '') + '" role="group" aria-label="選項 Options">';
    it.options.forEach(function (o) {
      var cls = 'opt', mark = '';
      if (state.reveal) {
        if (o.letter === it.answer) { cls += ' correct'; mark = '✓'; }
        else if (o.letter === state.chosen) { cls += ' wrong'; mark = '✗'; }
        else cls += ' dim';
      } else if (o.letter === state.chosen) cls += ' selected';
      var body = o.image
        ? '<img src="' + esc(o.image) + '" alt="' + (state.reveal ? esc(o.alt.zh + ' ' + o.alt.en) : '圖片 Picture ' + o.letter) + '" width="400" height="300">'
        : '<span lang="en">' + esc(o.text) + '</span>';
      h += '<button class="' + cls + '" data-letter="' + o.letter + '"' + (state.reveal ? ' disabled' : '') +
        ' aria-pressed="' + (o.letter === state.chosen ? 'true' : 'false') + '">' +
        '<span class="letter">' + o.letter + '</span><span class="body">' + body + '</span>' +
        (mark ? '<span class="mark" aria-hidden="true">' + mark + '</span>' : '') + '</button>';
    });
    return h + '</div>';
  }
  function transcriptHtml(it) {
    var h = '<div class="sect">' + bi('聽力原文', 'Transcript') + '</div><div class="script">';
    it.script.forEach(function (l) {
      var isQ = l.text === it.question.text;
      if (l.speaker === 'Narrator' && !isQ) return; // item number and the word "Question."
      var who = isQ && l.speaker === 'Narrator' ? '問題 Q' : (SPEAKER_ZH[l.speaker] || l.speaker);
      var c = l.gender === 'male' ? ' male' : (l.speaker === 'Narrator' ? ' narr' : '');
      h += '<div class="l' + (isQ ? ' q' : '') + '"><div class="who' + c + '">' + esc(who) + '</div><div><div lang="en">' + esc(l.text) + '</div>' +
        (l.zh ? '<div class="z">' + esc(l.zh) + '</div>' : '') + '</div></div>';
    });
    return h + '</div>';
  }
  function whyHtml(it) {
    var h = '<div class="sect">' + bi('解析', 'Why?') + '</div><div class="why">';
    it.options.forEach(function (o) {
      var ok = o.letter === it.answer, ex = it.explanations[o.letter] || { en: '', zh: '' }, lab = optLabel(it, o.letter);
      h += '<div class="w' + (ok ? ' ok' : '') + '"><div class="h">' + (ok ? '✓' : '✗') + ' (' + o.letter + ') <span class="t" lang="en">' + esc(lab.en) + '</span>' +
        (lab.zh ? ' <span class="t">' + esc(lab.zh) + '</span>' : '') + '</div>' +
        '<div class="z">' + esc(ex.zh) + '</div><div class="e" lang="en">' + esc(ex.en) + '</div></div>';
    });
    h += '</div>';
    if (it.tip) h += '<div class="tip"><b>聽力小技巧 Tip</b><br>' + esc(it.tip.zh) + '<span class="en" lang="en">' + esc(it.tip.en) + '</span></div>';
    return h;
  }

  /* ---------- home ---------- */
  function goHome() {
    S.run++; S.playTok++; S.mode = null; S.paused = false; S.testLive = false; S.cur = null;
    Player.stop();
    keepAwake(false);
    hideOverlay();
    var t = D.meta.title, sub = D.meta.subtitle || { zh: '', en: '' };
    setScreen(
      '<section class="hero"><div class="badge" aria-hidden="true"><svg width="44" height="44" viewBox="0 0 64 64"><path d="M14 25v14h9l12 10V15L23 25z" fill="#fff"/><path d="M42 23q7 9 0 18M48 17q11 15 0 30" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/></svg></div>' +
      '<h1>' + bi(t.zh, t.en) + '</h1><p class="sub">' + esc(sub.zh) + '<span class="en">' + esc(sub.en) + '</span></p></section>' +
      '<button class="mode-card test" id="go-test"><span class="icon" aria-hidden="true">📝</span><span class="txt"><span class="name">測驗模式<span class="en">Test mode</span></span>' +
      '<span class="desc">模擬正式聽力測驗：只播一次、限時作答，最後看成績。<span class="en">Like the real test: plays once, timed, score at the end.</span></span></span><span class="chev" aria-hidden="true">›</span></button>' +
      '<div class="home-tools"><button class="btn ghost small" id="soundcheck">🔊 ' + '試聽音量 <span class="en" style="display:inline">Sound check</span></button></div>' +
      '<p class="note" id="sc-note" hidden>有聽到音效嗎？沒有的話，請把音量調大。<span class="en">Did you hear the sound? If not, turn the volume up.</span></p>'
    );
    $('#go-test').addEventListener('click', function () { primeSfx(); testBrief(); });
    $('#soundcheck').addEventListener('click', function () { playSfx('correct'); $('#sc-note').hidden = false; });
  }

  function confirmQuit() {
    var wasTest = S.mode === 'test' && S.testLive;
    if (wasTest) { S.paused = true; Player.pause(); }
    showOverlay({
      zh: S.mode === 'test' ? '要離開測驗嗎？' : '要離開練習嗎？',
      en: S.mode === 'test' ? 'Leave the test?' : 'Leave practice?',
      textZh: '作答紀錄不會保留。', textEn: 'Your answers will not be saved.',
      buttons: [
        { zh: '繼續作答', en: 'Keep going', fn: function () { hideOverlay(); if (wasTest) { S.paused = false; Player.resume(); } } },
        { zh: '離開', en: 'Leave', ghost: true, fn: goHome }
      ]
    });
  }
  function wireQuit() { var q = $('#quit'); if (q) q.addEventListener('click', confirmQuit); }

  /* ---------- test mode ---------- */
  function testBrief() {
    S.mode = null;
    var w = D.timing.answerWindowMs, secs = [];
    D.parts.forEach(function (p) { var s = Math.round((typeof w === 'number' ? w : w[p.id]) / 1000); if (secs.indexOf(s) < 0) secs.push(s); });
    var secTxt = secs.join(' / ');
    setScreen(
      '<header class="topbar"><div class="row"><button class="icon-btn" id="back" aria-label="回首頁 Home">‹</button><div class="where"><div class="mode-label">測驗模式 Test mode</div><div class="count">測驗說明 <small>Before you start</small></div></div></div></header>' +
      '<div class="card"><ul class="list">' +
      '<li>共 ' + TOTAL + ' 題，分 ' + D.parts.length + ' 個部分' + (D.meta.testMinutes ? '，約 ' + D.meta.testMinutes + ' 分鐘' : '') + '。<span class="en">' + TOTAL + ' questions in ' + D.parts.length + ' parts' + (D.meta.testMinutes ? ', about ' + D.meta.testMinutes + ' minutes' : '') + '.</span></li>' +
      '<li>每段音檔<b>只播一次</b>，不能重聽。<span class="en">Each recording plays once. No replay.</span></li>' +
      '<li>題目不會印出來，要用聽的；畫面上只有選項。<span class="en">The questions are not printed. You only see the options.</span></li>' +
      '<li>聽完後有約 ' + secTxt + ' 秒的作答時間，時間到會自動進入下一題。<span class="en">After each recording you have about ' + secTxt + ' seconds to answer. Then the next question starts by itself.</span></li>' +
      '<li>時間到之前都可以改答案。<span class="en">You can change your answer until the time is up.</span></li>' +
      '<li>全部作答完才會看到成績和解析。<span class="en">You see your score and the answers at the end.</span></li>' +
      '<li>請戴耳機或把音量調大，測驗中不要離開這個畫面。<span class="en">Use earphones or turn the volume up. Stay on this page during the test.</span></li>' +
      '</ul></div>' +
      '<div class="btn-row"><button class="btn" id="start">' + bi('開始測驗', 'Start the test') + '</button></div>'
    );
    $('#back').addEventListener('click', goHome);
    $('#start').addEventListener('click', function () { Player.unlock(); primeSfx(); startTest(); });
  }

  function pauseTest(why) {
    if (S.mode !== 'test' || !S.testLive || S.paused) return;
    S.paused = true;
    Player.pause();
    var blocked = why === 'NotAllowedError' || why === 'blocked';
    showOverlay({
      zh: blocked ? '點一下繼續' : '測驗已暫停',
      en: blocked ? 'Tap to continue' : 'Test paused',
      textZh: blocked ? '瀏覽器需要你點一下才能播放聲音。' : '音檔被中斷了。準備好之後請按「繼續」。',
      textEn: blocked ? 'The browser needs a tap before it can play sound.' : 'The audio was interrupted. Tap Continue when you are ready.',
      buttons: [{ zh: '繼續', en: 'Continue', fn: function () { hideOverlay(); S.paused = false; keepAwake(true); Player.resume(); } }]
    });
  }

  function playInTest(url, run) {
    // resolves true when the recording has finished (or was skipped); false when the run was cancelled
    return Player.play(url).then(function (res) {
      if (run !== S.run) return false;
      if (res === 'ended') return true;
      if (res !== 'error') return false;
      return new Promise(function (resolve) {
        S.paused = true;
        showOverlay({
          zh: '音檔無法播放', en: 'This audio could not be played', file: url,
          buttons: [
            { zh: '再試一次', en: 'Try again', fn: function () { hideOverlay(); S.paused = false; resolve(playInTest(url, run)); } },
            { zh: '跳過這段音檔', en: 'Skip this audio', ghost: true, fn: function () { hideOverlay(); S.paused = false; resolve(true); } }
          ]
        });
      });
    });
  }

  function setStatus(kind, zh, en, secs) {
    var st = $('#status');
    if (!st) return;
    st.className = 'status ' + kind;
    st.innerHTML = (kind === 'listening' ? '<span class="bars" aria-hidden="true"><i></i><i></i><i></i><i></i></span>' : '') +
      '<div class="label">' + bi(zh, en) + (kind === 'window' ? '<div class="timerbar"><i id="tbar"></i></div>' : '') + '</div>' +
      (kind === 'window' ? '<div class="secs" id="secs" aria-hidden="true">' + secs + '</div>' : '');
  }

  function renderTestItem(it) {
    var part = PARTS[it.part];
    setScreen(topbar('測驗模式', 'Test mode', it.number) +
      '<div class="card qhead">' + partChip(part) + '<div class="qnum">第 ' + it.number + ' 題</div></div>' +
      '<div id="status" class="status" role="status"></div><div id="opts">' + optionsHtml(it, { chosen: S.answers[it.number] }) + '</div>');
    wireQuit();
    $('#opts').addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('.opt') : null;
      if (!b || b.disabled) return;
      S.answers[it.number] = b.getAttribute('data-letter');
      var all = $('#opts').querySelectorAll('.opt');
      for (var i = 0; i < all.length; i++) {
        var on = all[i] === b;
        all[i].classList.toggle('selected', on);
        all[i].setAttribute('aria-pressed', on ? 'true' : 'false');
      }
    });
  }

  function startTest() {
    var run = ++S.run;
    S.mode = 'test'; S.answers = {}; S.paused = false; S.testLive = false;
    keepAwake(true);
    var urls = [D.sfx.correct, D.sfx.wrong];
    D.parts.forEach(function (p) { if (p.introAudio) urls.push(p.introAudio); });
    D.items.forEach(function (it) { urls.push(it.audio.test); });
    prepare(urls).then(function () { if (run === S.run) runTest(run); });
  }

  function runTest(run) {
    S.testLive = true;
    var pi = 0;
    function nextPart() {
      if (run !== S.run) return;
      if (pi >= D.parts.length) return showResults();
      var part = D.parts[pi++], items = partItems(part.id);
      if (!items.length) return nextPart();
      setScreen(topbar('測驗模式', 'Test mode', items[0].number) + partCard(part) + '<div id="status" class="status" role="status"></div>');
      wireQuit();
      setStatus('listening', '正在播放說明', 'Listen to the directions');
      var intro = part.introAudio ? playInTest(part.introAudio, run) : Promise.resolve(true);
      intro.then(function (ok) {
        if (!ok || run !== S.run) return;
        return sleep(D.timing.gapAfterPartIntroMs || 0, run).then(function (ok2) {
          if (!ok2) return;
          var ii = 0;
          (function nextItem() {
            if (run !== S.run) return;
            if (ii >= items.length) return nextPart();
            var it = items[ii++];
            renderTestItem(it);
            setStatus('listening', '請仔細聽', 'Listen carefully');
            playInTest(it.audio.test, run).then(function (ok3) {
              if (!ok3 || run !== S.run) return;
              var ms = windowMs(it), total = Math.ceil(ms / 1000);
              setStatus('window', '作答時間', 'Answer now', total);
              say('作答時間 Answer now');
              return sleep(ms, run, function (el) {
                var bar = $('#tbar'), sec = $('#secs');
                if (bar) bar.style.transform = 'scaleX(' + Math.max(0, 1 - el / ms) + ')';
                if (sec) sec.textContent = Math.max(0, Math.ceil((ms - el) / 1000));
              }).then(function (ok4) { if (ok4) nextItem(); });
            });
          })();
        });
      });
    }
    nextPart();
  }

  function showResults() {
    S.testLive = false; S.run++;
    keepAwake(false);
    var score = 0, byPart = {};
    D.parts.forEach(function (p) { byPart[p.id] = { ok: 0, n: 0 }; });
    D.items.forEach(function (it) {
      var ok = S.answers[it.number] === it.answer;
      byPart[it.part].n++;
      if (ok) { score++; byPart[it.part].ok++; }
    });
    var ratio = score / TOTAL;
    var msg = ratio >= 0.83 ? ['太棒了！', 'Excellent!'] : (ratio >= 0.58 ? ['不錯喔，繼續加油！', 'Good job. Keep going!'] : ['再多練習幾次，一定會進步！', 'Keep practicing. You will get better!']);
    var h = '<header class="topbar"><div class="row"><div class="where"><div class="mode-label">測驗模式 Test mode</div><div class="count">成績單 <small>Score report</small></div></div></div></header>' +
      '<div class="card score"><div class="num" aria-label="' + score + ' / ' + TOTAL + '">' + score + '<small> / ' + TOTAL + '</small></div><div class="msg">' + bi(msg[0], msg[1]) + '</div></div>' +
      '<div class="card"><div class="sect" style="margin-top:0">' + bi('各部分答對題數', 'Score by part') + '</div><div class="parts" style="margin-top:10px">';
    D.parts.forEach(function (p) {
      var b = byPart[p.id];
      if (!b.n) return;
      h += '<div class="pb"><div class="top"><span>Part ' + esc(p.id) + ' ' + esc(p.title.zh) + '<span class="en">' + esc(p.title.en) + '</span></span><b>' + b.ok + ' / ' + b.n + '</b></div>' +
        '<div class="bar"><i style="width:' + (b.ok / b.n * 100) + '%"></i></div></div>';
    });
    h += '</div></div><div class="sect">' + bi('逐題檢討（點一下看解析）', 'Review each question (tap to open)') + '</div><div class="review">';
    D.items.forEach(function (it) {
      var mine = S.answers[it.number], ok = mine === it.answer;
      h += '<div class="rv ' + (ok ? 'ok' : 'bad') + '" data-n="' + it.number + '"><button aria-expanded="false"><span class="n">' + it.number + '</span>' +
        '<span class="sum">' + (ok ? '✓ 答對' : '✗ 答錯') + ' <span lang="en">' + (ok ? 'Correct' : 'Wrong') + '</span>' +
        '<small>你的答案 ' + (mine ? '(' + mine + ')' : '未作答') + '　正確答案 (' + it.answer + ')<br><span lang="en">Your answer ' + (mine ? '(' + mine + ')' : 'none') + ' · Correct answer (' + it.answer + ')</span></small></span>' +
        '<span class="tog" aria-hidden="true">▾</span></button><div class="detail"></div></div>';
    });
    h += '</div><div class="btn-row"><button class="btn" id="again">' + bi('重新測驗', 'Take the test again') + '</button>' +
      '<button class="btn ghost" id="home">' + bi('回首頁', 'Home') + '</button></div>';
    setScreen(h);
    S.mode = 'review';
    $('#home').addEventListener('click', goHome);
    $('#again').addEventListener('click', function () { Player.stop(); testBrief(); });
    var cards = app.querySelectorAll('.rv');
    for (var i = 0; i < cards.length; i++) (function (card) {
      var it = D.items[parseInt(card.getAttribute('data-n'), 10) - 1], btn = $('button', card), det = $('.detail', card);
      btn.addEventListener('click', function () {
        var open = !card.classList.contains('open');
        card.classList.toggle('open', open);
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        if (!open) return;
        var mine = S.answers[it.number];
        Player.stop();
        playSfx(mine === it.answer ? 'correct' : 'wrong');
        if (!det.innerHTML) {
          det.innerHTML = optionsHtml(it, { chosen: mine, reveal: true }) + whyHtml(it) + transcriptHtml(it) +
            '<div class="tools"><button class="btn ghost small" data-play>🔊 ' + '再聽一次 <span class="en" style="display:inline">Listen again</span></button></div>';
          $('[data-play]', det).addEventListener('click', function () { Player.play(it.audio.test); });
        }
      });
    })(cards[i]);
  }

  /* ---------- practice mode ---------- */
  function startPractice() {
    var run = ++S.run;
    S.mode = 'practice'; S.first = {}; S.seenPart = {}; S.idx = 0; S.paused = false; S.testLive = false;
    keepAwake(true);
    var urls = [D.sfx.correct, D.sfx.wrong];
    D.items.forEach(function (it) { urls.push(it.audio.practice); });
    prepare(urls).then(function () { if (run === S.run) practiceItem(0); });
  }

  function practiceItem(i) {
    S.playTok++;
    Player.stop();
    if (i >= TOTAL) return practiceSummary();
    S.idx = i;
    var it = D.items[i], part = PARTS[it.part];
    if (!S.seenPart[part.id]) {
      S.seenPart[part.id] = true;
      setScreen(topbar('練習模式', 'Practice mode', it.number) + partCard(part) +
        '<div class="btn-row"><button class="btn" id="go">' + bi('開始這個部分', 'Start this part') + '</button></div>');
      wireQuit();
      $('#go').addEventListener('click', function () { practiceItem(i); });
      return;
    }
    setScreen(topbar('練習模式', 'Practice mode', it.number) +
      '<div class="card qhead">' + partChip(part) + '<div class="qnum">第 ' + it.number + ' 題</div></div>' +
      '<div class="stage" id="stage"><img class="still" alt=""><video muted playsinline webkit-playsinline preload="auto" disablepictureinpicture disableremoteplayback controlslist="nodownload nofullscreen noremoteplayback" x-webkit-airplay="deny" aria-hidden="true" tabindex="-1"></video>' +
      '<div class="ph"><div class="clap" aria-hidden="true">🎬</div><div class="tag">情境 SCENE</div><div class="scene">' + esc(it.scene ? it.scene.zh : '') + '</div><div class="scene-en" lang="en">' + esc(it.scene ? it.scene.en : '') + '</div></div></div>' +
      '<div class="prow"><div id="status" class="status" role="status"></div>' +
      '<button class="btn ghost small" id="replay"><span aria-hidden="true">🔁</span><span class="zh">再聽一次</span><span class="en">Replay</span></button></div>' +
      '<div id="opts">' + optionsHtml(it, {}) + '</div><div id="fb"></div>');
    wireQuit();
    var cur = S.cur = { it: it, answered: false, video: $('video', app), stage: $('#stage') };
    mountVideo(cur);
    $('#replay').addEventListener('click', function () { playPractice(cur, true); });
    $('#opts').addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('.opt') : null;
      if (!b || b.disabled || cur.answered) return;
      answerPractice(cur, b.getAttribute('data-letter'));
    });
    playPractice(cur, false);
  }

  function mountVideo(cur) {
    var it = cur.it, v = cur.video, stage = cur.stage;
    v.muted = true; v.defaultMuted = true; v.playsInline = true; v.controls = false; v.loop = false;
    cur.videoState = S.video[it.id] === false ? 'missing' : 'loading';
    if (it.videoStill) {
      var still = $('.still', stage);
      still.onload = function () { stage.classList.add('has-still'); };
      still.onerror = function () { still.removeAttribute('src'); };
      still.src = it.videoStill;
    }
    if (!it.video || cur.videoState === 'missing') return;
    cur.videoReady = new Promise(function (resolve) {
      var done = false;
      function fin(ok) {
        if (done) return; done = true;
        S.video[it.id] = ok;
        cur.videoState = ok ? 'ready' : 'missing';
        if (ok) stage.classList.add('has-video');
        resolve(ok);
      }
      v.addEventListener('loadeddata', function () { fin(true); });
      v.addEventListener('playing', function () { fin(true); });
      v.addEventListener('error', function () { fin(false); });
      setTimeout(function () { if (!done) resolve(false); }, 1500); // slow network: start the audio, show the clip when it arrives
    });
    v.src = it.video;
    // a tap on the picture also starts the clip, for phones that hold back muted autoplay (e.g. Low Power Mode)
    stage.addEventListener('click', function () { restartVideo(cur); });
  }
  function restartVideo(cur) {
    var v = cur.video;
    if (!v || cur.videoState === 'missing' || !cur.it.video) return;
    try { v.currentTime = 0; } catch (e) {}
    var p;
    try { p = v.play(); } catch (e) { p = null; }
    if (p && p.catch) p.catch(function () {});
  }

  function playPractice(cur, isReplay) {
    var tok = ++S.playTok, run = S.run, it = cur.it;
    Player.stop();
    restartVideo(cur);
    setStatus('listening', '請仔細聽', 'Listen carefully');
    var lead = (cur.videoReady && cur.videoState !== 'missing' ? cur.videoReady : Promise.resolve(false)).then(function (hasVideo) {
      return sleep(hasVideo ? (D.timing.practiceVideoLeadInMs || 0) : 250, run);
    });
    lead.then(function () {
      if (tok !== S.playTok || run !== S.run) return;
      return Player.play(it.audio.practice).then(function (res) {
        if (tok !== S.playTok || run !== S.run) return;
        if (res === 'error') {
          setStatus('error', '音檔無法播放：' + it.audio.practice, 'This audio could not be played.');
        } else if (res === 'ended') {
          if (cur.answered) setStatus('done', '可以再聽一次，或按「下一題」', 'Replay it, or go to the next question');
          else setStatus('done', '請選出答案（可以再聽一次）', 'Choose your answer. You can replay.');
        }
      });
    });
  }

  function answerPractice(cur, letter) {
    var it = cur.it, ok = letter === it.answer;
    cur.answered = true;
    S.playTok++;
    Player.stop();
    if (!(it.number in S.first)) S.first[it.number] = ok;
    playSfx(ok ? 'correct' : 'wrong');
    $('#opts').innerHTML = optionsHtml(it, { chosen: letter, reveal: true });
    setStatus('done', '看看解析，也可以再聽一次', 'Read the feedback. You can replay the audio.');
    var last = it.number >= TOTAL;
    $('#fb').innerHTML = '<div class="feedback' + (ok ? '' : ' bad') + '" id="fbbox" tabindex="-1"><div class="verdict">' + (ok ? '✓ 答對了！' : '✗ 答錯了') + '<span class="en">' + (ok ? 'Correct!' : 'Not quite.') + '</span></div>' +
      '<div class="ans">正確答案 Answer: (' + it.answer + ') <span lang="en">' + esc(optLabel(it, it.answer).en) + '</span></div>' +
      whyHtml(it) + transcriptHtml(it) + '</div>' +
      '<div class="btn-row"><button class="btn" id="next">' + (last ? bi('看練習結果', 'See my results') : bi('下一題', 'Next question')) + '</button></div>';
    say(ok ? '答對了 Correct' : '答錯了，正確答案是 ' + it.answer);
    $('#next').addEventListener('click', function () { practiceItem(S.idx + 1); });
    var box = $('#opts');
    if (box && box.scrollIntoView) {
      try { box.scrollIntoView({ behavior: 'smooth', block: 'start' }); } catch (e) { box.scrollIntoView(); }
    }
  }

  function practiceSummary() {
    S.run++; S.playTok++; S.cur = null;
    keepAwake(false);
    var score = 0;
    D.items.forEach(function (it) { if (S.first[it.number]) score++; });
    var h = '<header class="topbar"><div class="row"><div class="where"><div class="mode-label">練習模式 Practice mode</div><div class="count">練習結果 <small>Practice results</small></div></div></div></header>' +
      '<div class="card score"><div class="num" aria-label="' + score + ' / ' + TOTAL + '">' + score + '<small> / ' + TOTAL + '</small></div><div class="msg">' + bi('第一次就答對的題數', 'Correct on the first try') + '</div></div>' +
      '<div class="card"><div class="steps" style="grid-template-columns:repeat(' + Math.min(TOTAL, 6) + ',1fr);gap:8px;margin:0" aria-label="每題結果 Results">';
    D.items.forEach(function (it) {
      var ok = !!S.first[it.number];
      h += '<i style="height:auto;padding:8px 0;text-align:center;font-style:normal;font-weight:800;border-radius:10px;color:' + (ok ? '#166534' : '#b91c1c') + ';background:' + (ok ? '#dcfce7' : '#fee2e2') + '">' + it.number + ' ' + (ok ? '✓' : '✗') + '</i>';
    });
    h += '</div></div><div class="btn-row"><button class="btn" id="to-test">' + bi('挑戰測驗模式', 'Try test mode') + '</button>' +
      '<button class="btn ghost" id="again">' + bi('再練習一次', 'Practice again') + '</button>' +
      '<button class="btn ghost" id="home">' + bi('回首頁', 'Home') + '</button></div>';
    setScreen(h);
    S.mode = null;
    $('#home').addEventListener('click', goHome);
    $('#again').addEventListener('click', function () { Player.unlock(); startPractice(); });
    $('#to-test').addEventListener('click', testBrief);
  }

  /* ---------- interruptions ---------- */
  Player.onInterrupt = function (why) {
    if (S.mode === 'test' && S.testLive) { pauseTest(why); return; }
    if (S.mode === 'practice' && S.cur) {
      S.playTok++;
      Player.stop();
      setStatus('done', '聲音停了，請按「再聽一次」', 'The audio stopped. Tap Replay.');
    }
  };
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      if (S.mode === 'test' && S.testLive) pauseTest('hidden');
      else if (S.mode === 'practice' && S.cur && Player.busy()) Player.onInterrupt('hidden');
      else if (S.mode === 'review') Player.stop();
    } else if (S.mode === 'test' || S.mode === 'practice') {
      keepAwake(true);
    }
  });

  goHome();
})();
