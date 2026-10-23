// Part 1 content — based on Grammaire progressive du français A1 (CLE International), units 1–6, + Lionel's class notes
window.COURSE = {
parts: [
 {id:1, title:"Part 1 · Se présenter & décrire", zh:"自我介紹與描述", status:"open", emoji:"🥐"},
 {id:2, title:"Part 2 · Coming soon", zh:"即將推出", status:"soon", emoji:"🗼"},
 {id:3, title:"Part 3 · Coming soon", zh:"即將推出", status:"soon", emoji:"🧀"},
 {id:4, title:"Part 4 · Coming soon", zh:"即將推出", status:"soon", emoji:"🎨"}
],
lessons: [
/* ================= LESSON 1 ================= */
{id:1, emoji:"🤝", color:"#3b82f6",
 title:"Vous êtes japonais ? — Oui, je suis japonais.",
 short:"Se présenter", zh:"自我介紹・國籍・職業",
 goal:"Introduce yourself, say your nationality and your job with « je suis ».",
 sections:[
  {h:"La présentation 自我介紹", body:`
   <div class="dialog"><p><b>Kenji :</b> Bonjour, <mark>je suis</mark> Kenji Takashi.</p>
   <p><b>Jean :</b> Bonjour, monsieur Takashi. <mark>Je suis</mark> Jean Borel.</p></div>
   <ul class="rules">
    <li>✅ <b>Je suis Kenji Takashi.</b> &nbsp; ❌ <s>Suis Kenji Takashi.</s> — French always needs the subject pronoun (中文可以省略主詞，法文不行).</li>
    <li>✅ On dit aussi : <b>Je m'appelle Kenji Takashi.</b> = "I call myself…" 我叫…（最常用的自我介紹）</li>
    <li>💡 <b>Bonjour</b> (day) · <b>Bonsoir</b> (evening greeting 晚上好) · <b>Bonne nuit</b> (going to bed 晚安) · <b>Bonne soirée</b> (have a nice evening, when leaving).</li>
   </ul>`},
  {h:"La nationalité et la profession 國籍與職業", body:`
   <div class="dialog"><p>– <b>Vous êtes</b> japonais ? &nbsp;– Oui, je suis japonais.</p>
   <p>– <b>Vous êtes</b> médecin ? &nbsp;– Non, je suis chimiste.</p></div>
   <ul class="rules">
    <li>⚠️ No article before a profession after <b>être</b>: ✅ <b>Je suis médecin.</b> ❌ <s>Je suis un médecin.</s> (English says "a doctor", French doesn't.)</li>
    <li>⚠️ Nationalities are written <b>lowercase</b> as adjectives: <i>je suis taïwanais</i>, but <b>un Taïwanais</b> (a Taiwanese person, noun) takes a capital.</li>
    <li>🔊 <b>Liaison</b>: vous‿êtes → [vu-z‿ɛt]. The silent <i>s</i> of <i>vous</i> sounds like <b>z</b> before a vowel.</li>
    <li>👩 A woman says: <i>Je suis japonais<b>e</b>, taïwanais<b>e</b>, français<b>e</b>.</i> (see Lesson 2)</li>
   </ul>`},
  {h:"Petit lexique de la classe 課堂用語", body:`
   <ul class="rules">
    <li><b>C'est bon ?</b> = Is it OK? / Are you done? → <b>C'est bon !</b> = It's fine / done.</li>
    <li><b>C'est fini ?</b> = Is it finished? · <b>Une pause</b> = a break · <b>Merci</b> · <b>S'il vous plaît</b> (polite) / <b>s'il te plaît</b> (familiar).</li>
    <li>🎓 School words: <b>un collégien</b> = 國中生 (collège = junior high), <b>un lycéen / une lycéenne</b> = 高中生, <b>un étudiant / une étudiante</b> = 大學生.</li>
   </ul>`}
 ],
 vocab:[
  {fr:"Bonjour",zh:"你好／早安",en:"Hello",e:"👋",ex:"Bonjour, je suis Lionel."},
  {fr:"Bonsoir",zh:"晚上好",en:"Good evening",e:"🌆",ex:"Bonsoir, madame !"},
  {fr:"Bonne nuit",zh:"晚安（睡前）",en:"Good night",e:"🌙",ex:"Bonne nuit, papa."},
  {fr:"Je m'appelle…",zh:"我叫…",en:"My name is…",e:"🪪",ex:"Je m'appelle Lionel."},
  {fr:"japonais / japonaise",zh:"日本的／日本人",en:"Japanese",e:"🇯🇵",ex:"Kenji est japonais."},
  {fr:"taïwanais / taïwanaise",zh:"台灣的／台灣人",en:"Taiwanese",e:"🇹🇼",ex:"Je suis taïwanais."},
  {fr:"français / française",zh:"法國的／法國人",en:"French",e:"🇫🇷",ex:"Jean est français."},
  {fr:"anglais / anglaise",zh:"英國的／英國人",en:"English",e:"🇬🇧",ex:"John est anglais."},
  {fr:"chinois / chinoise",zh:"中國的",en:"Chinese",e:"🇨🇳",ex:"Elle est chinoise."},
  {fr:"belge",zh:"比利時的（陰陽同形）",en:"Belgian",e:"🇧🇪",ex:"Il est belge, elle est belge."},
  {fr:"martien / martienne",zh:"火星人",en:"Martian",e:"👽",ex:"Bip est martien."},
  {fr:"le médecin",zh:"醫生",en:"doctor",e:"🩺",ex:"Vous êtes médecin ?"},
  {fr:"le / la chimiste",zh:"化學家",en:"chemist",e:"⚗️",ex:"Je suis chimiste."},
  {fr:"le professeur",zh:"老師／教授",en:"teacher",e:"👨‍🏫",ex:"Jean est professeur."},
  {fr:"l'étudiant / l'étudiante",zh:"大學生",en:"student",e:"🎓",ex:"Je suis étudiant."},
  {fr:"le lycéen / la lycéenne",zh:"高中生",en:"high-school student",e:"🏫",ex:"John est lycéen."},
  {fr:"l'astronaute",zh:"太空人",en:"astronaut",e:"🧑‍🚀",ex:"Bip est astronaute."},
  {fr:"S'il vous plaît",zh:"請（禮貌）",en:"Please",e:"🙏",ex:"Une pause, s'il vous plaît !"}
 ],
 notes:[
  ["Fransais / Français","✅ <b>français</b> — with ç (cédille) so the c sounds like s. Lowercase as an adjective."],
  ["Taiwanais(e)","✅ <b>taïwanais(e)</b> — the tréma ï shows the a and i are pronounced separately: [ta-i-wa-nɛ]."],
  ["collégien = university","❌ <b>collégien</b> = junior-high student 國中生. University student = <b>étudiant(e)</b>. <i>Le lycée</i> = senior high."],
  ["Night : Bonsoir","⚠️ <b>Bonsoir</b> is a <i>greeting</i> (good evening). Before sleeping say <b>Bonne nuit</b>."],
  ["C'est bon (Are you done?)","✅ Good note! In class, <i>C'est bon ?</i> = Are you done? / OK? Also: <b>C'est fini ?</b>"]
 ],
 ex:[
  {t:"mcq",q:"How do you introduce yourself correctly?",o:["Suis Lionel.","Je suis Lionel.","Je suis un Lionel."],a:1,why:"French needs the subject pronoun « je »."},
  {t:"mcq",q:"« Vous êtes médecin ? » — 正確回答是：",o:["Non, je suis un chimiste.","Non, je suis chimiste.","Non, suis chimiste."],a:1,why:"No article before a profession after être."},
  {t:"fill",q:"– Vous êtes chinois, Kenji ? – Non, je suis ____ . (Kenji is Japanese)",a:["japonais"]},
  {t:"fill",q:"– Vous êtes anglais, John ? – Oui, je suis ____ .",a:["anglais"]},
  {t:"fill",q:"– Vous êtes français, Bip ? – Non, je suis ____ . (Bip is from Mars)",a:["martien"]},
  {t:"order",q:"Build the sentence:",w:["Bonjour,","je","suis","Jean","Borel."],a:"Bonjour, je suis Jean Borel."},
  {t:"order",q:"Build the question (Jean: professeur / étudiant):",w:["Jean,","vous","êtes","professeur","ou","étudiant","?"],a:"Jean, vous êtes professeur ou étudiant ?"},
  {t:"match",q:"Match the word to its meaning:",p:[["lycéen","高中生"],["collégien","國中生"],["étudiant","大學生"],["médecin","醫生"]]},
  {t:"mcq",q:"Before going to bed you say…",o:["Bonsoir","Bonne nuit","Bonjour"],a:1}
 ]},
/* ================= LESSON 2 ================= */
{id:2, emoji:"🧍‍♀️", color:"#ec4899",
 title:"Il est grand. Elle est grande.",
 short:"Masculin & féminin", zh:"形容詞與職業的陰陽性",
 goal:"Describe a person and make adjectives & job names feminine.",
 sections:[
  {h:"La description (1) 描述一個人", body:`
   <div class="two"><div class="dialog"><p>Max est étudiant.<br><b>Il est</b> anglais.<br><b>Il est</b> grand.<br><b>Il est</b> blond.<br><b>Il est</b> jeune.</p></div>
   <div class="dialog pink"><p>Léa est étudiante.<br><b>Elle est</b> anglaise.<br><b>Elle est</b> grande.<br><b>Elle est</b> blonde.<br><b>Elle est</b> jeune.</p></div></div>
   <p><b>Il</b> = Max (他) · <b>Elle</b> = Léa (她)</p>`},
  {h:"Féminin = masculin + e 陰性 = 陽性 + e", body:`
   <table class="tbl"><tr><th>Masculin ♂</th><th>Féminin ♀</th></tr>
   <tr><td>Il est étudiant.</td><td>Elle est étudiant<b>e</b>.</td></tr>
   <tr><td>Il est grand.</td><td>Elle est grand<b>e</b>.</td></tr>
   <tr><td>Il est marié.</td><td>Elle est marié<b>e</b>.</td></tr>
   <tr><td>Il est jeune.</td><td>Elle est jeune. <small>(already ends in -e → no change)</small></td></tr></table>
   <ul class="rules"><li><b>-en → -enne</b>: italien → italien<b>ne</b>, lycéen → lycéen<b>ne</b>.</li>
   <li>🔊 Final <b>-s, -d, -t</b> are <b>silent</b> in the masculine and <b>pronounced</b> in the feminine: anglai(s) / anglai<b>se</b> [z], gran(d) / gran<b>de</b> [d], intelligen(t) / intelligen<b>te</b> [t]. 陽性字尾不發音，陰性加 e 後就要發音！</li>
   <li>🔊 <b>marié / mariée</b> sound the same. <b>-en</b> [ɛ̃] (nasal) → <b>-enne</b> [ɛn] (not nasal).</li>
   <li>🔗 Liaison: Il est‿amusant [t], il est‿intelligent [t].</li></ul>`},
  {h:"Plus de féminins 更多陰性變化", body:`
   <table class="tbl"><tr><th>Rule</th><th>Masculin</th><th>Féminin</th></tr>
   <tr><td>-on → -onne</td><td>bon, breton, mignon (可愛)</td><td>bo<b>nne</b>, breto<b>nne</b>, migno<b>nne</b></td></tr>
   <tr><td>-er → -ère</td><td>étranger, boulanger, infirmier</td><td>étrang<b>ère</b>, boulang<b>ère</b>, infirmi<b>ère</b></td></tr>
   <tr><td>-eur / -eux → -euse</td><td>serveur, menteur, heureux (幸福)</td><td>serv<b>euse</b>, ment<b>euse</b>, heur<b>euse</b></td></tr>
   <tr><td>-teur → -trice (most jobs)</td><td>acteur, éditeur, agriculteur</td><td>ac<b>trice</b>, édi<b>trice</b>, agricul<b>trice</b></td></tr>
   <tr><td>Exception</td><td>chanteur (歌手)</td><td>chant<b>euse</b></td></tr></table>
   <ul class="rules"><li>⚠️ Some jobs traditionally don't change: <b>professeur, médecin, écrivain, auteur</b> → <i>Elle est professeur.</i> Today you also often see <b>professeure, écrivaine, autrice/auteure</b>.</li>
   <li>⭐ Irregular adjectives: <b>beau/belle</b> (帥／美) · <b>gros/grosse</b> (胖) · <b>vieux/vieille</b> (老) · <b>gentil/gentille</b> (親切) · <b>blanc/blanche</b> (白).</li>
   <li>🔊 <b>è</b> = accent grave → open [ɛ] sound in boulang<b>è</b>re.</li>
   <li>💬 Careful: about a <i>person</i>, <i>il/elle est bon(ne)</i> can sound like slang for "hot". To praise a person, use <b>gentil(le)</b>, <b>sympathique</b>, or <b>un bon professeur</b> (bon before a noun = good at the job).</li></ul>`}
 ],
 vocab:[
  {fr:"grand / grande",zh:"高的",en:"tall",e:"🦒",ex:"Léa est grande."},
  {fr:"petit / petite",zh:"矮的／小的",en:"short, small",e:"🐭",ex:"Bip est petit."},
  {fr:"blond / blonde",zh:"金髮的",en:"blond",e:"👱",ex:"Max est blond."},
  {fr:"brun / brune",zh:"棕髮的",en:"brown-haired",e:"🧑‍🦱",ex:"Elle est brune."},
  {fr:"jeune",zh:"年輕的",en:"young",e:"🧒",ex:"Il est jeune."},
  {fr:"marié / mariée",zh:"已婚的",en:"married",e:"💍",ex:"Elle est mariée."},
  {fr:"célibataire",zh:"單身的",en:"single",e:"🙋",ex:"Je suis célibataire."},
  {fr:"amusant / amusante",zh:"有趣的",en:"funny",e:"😂",ex:"Il est amusant."},
  {fr:"intelligent / intelligente",zh:"聰明的",en:"intelligent",e:"🧠",ex:"Elle est très intelligente."},
  {fr:"sympathique",zh:"友善的",en:"nice",e:"😊",ex:"Chiara est sympathique."},
  {fr:"souriant / souriante",zh:"愛笑的",en:"smiling",e:"😁",ex:"Elle est souriante."},
  {fr:"gentil / gentille",zh:"親切的",en:"kind",e:"🤗",ex:"Il est très gentil."},
  {fr:"beau / belle",zh:"帥的／美的",en:"handsome / beautiful",e:"✨",ex:"Elle est belle."},
  {fr:"vieux / vieille",zh:"老的",en:"old",e:"👴",ex:"Il est vieux."},
  {fr:"blanc / blanche",zh:"白色的",en:"white",e:"⚪",ex:"La neige est blanche."},
  {fr:"le boulanger / la boulangère",zh:"麵包師傅",en:"baker",e:"🥖",ex:"Madame Janin est boulangère."},
  {fr:"le serveur / la serveuse",zh:"服務生",en:"waiter / waitress",e:"🍽️",ex:"Le soir, je suis serveur."},
  {fr:"l'acteur / l'actrice",zh:"演員",en:"actor / actress",e:"🎬",ex:"Elle est actrice."},
  {fr:"l'infirmier / l'infirmière",zh:"護理師",en:"nurse",e:"🏥",ex:"Elle est infirmière."},
  {fr:"le chanteur / la chanteuse",zh:"歌手",en:"singer",e:"🎤",ex:"Elle est chanteuse."},
  {fr:"le petit ami / la petite amie",zh:"男朋友／女朋友",en:"boyfriend / girlfriend",e:"💑",ex:"C'est mon petit ami. (familier : copain / copine)"}
 ],
 notes:[
  ["Oui, il est anglais (tangly)","🔊 <b>anglais</b> [ɑ̃-glɛ] — nasal <i>an</i>, final s silent. Fem. <b>anglaise</b> [ɑ̃-glɛz]."],
  ["Elle est curieuse est rapide","❌ → ✅ <b>Elle est curieuse <u>et</u> rapide.</b> « et » = and; « est » = is. Same sound [e]/[ɛ], different words!"],
  ["bon can be seductive","✅ Correct instinct: for people prefer <b>belle / gentille / sympa</b>."],
  ["teur → trice","✅ Most <b>-teur</b> → <b>-trice</b> (acteur → actrice) but <b>chanteur → chanteuse</b>, and <b>-eur</b> not from a verb stem → <b>-euse</b> (serveur → serveuse)."],
  ["bon nuit / bon soirée","❌ → ✅ <b>bonne nuit, bonne soirée</b> — nuit and soirée are feminine, so bon → bonne."],
  ["Restauratrice","✅ <b>restaurateur / restauratrice</b> — no « n » (unlike restaurant)."],
  ["la mer / la nuit / l'herbe / la neige","✅ La mer est bleu<b>e</b>, la nuit est noir<b>e</b>, l'herbe est vert<b>e</b>, la neige est blanch<b>e</b> — all feminine nouns."]
 ],
 ex:[
  {t:"fill",q:"John est anglais. Ann est ____ .",a:["anglaise"]},
  {t:"fill",q:"John est blond. Ann est ____ .",a:["blonde"]},
  {t:"fill",q:"John est jeune. Ann est ____ .",a:["jeune"]},
  {t:"fill",q:"Bip est vert. Zaza est ____ .",a:["verte"]},
  {t:"fill",q:"Bip est martien. Zaza est ____ .",a:["martienne"]},
  {t:"mcq",q:"___ est italienne.",o:["Il","Elle","Il / Elle"],a:1},
  {t:"mcq",q:"___ est jeune.",o:["Il","Elle","Both 都可以"],a:2,why:"jeune already ends in -e."},
  {t:"mcq",q:"___ est blond.",o:["Il","Elle","Both"],a:0},
  {t:"match",q:"Masculin → féminin",p:[["boulanger","boulangère"],["acteur","actrice"],["chanteur","chanteuse"],["breton","bretonne"],["coréen","coréenne"]]},
  {t:"fill",q:"un serveur → une ____",a:["serveuse"]},
  {t:"fill",q:"un instituteur → une ____",a:["institutrice"]},
  {t:"fill",q:"un musicien → une ____",a:["musicienne"]},
  {t:"mcq",q:"La neige est…",o:["blanc","blanche","blance"],a:1},
  {t:"order",q:"Madame Janin :",w:["Elle","est","jeune","et","elle","est","belle."],a:"Elle est jeune et elle est belle."},
  {t:"mcq",q:"Which pronunciation changes in the feminine?",o:["jeune → jeune","marié → mariée","grand → grande"],a:2,why:"The d becomes audible: [grɑ̃] → [grɑ̃d]."}
 ]},
/* ================= LESSON 3 ================= */
{id:3, emoji:"👯", color:"#8b5cf6",
 title:"Ils sont grands. Elles sont grandes.",
 short:"Singulier & pluriel", zh:"形容詞單複數",
 goal:"Describe groups and make adjectives plural.",
 sections:[
  {h:"La description (2)", body:`
   <div class="two"><div class="dialog"><p>Max et Léo sont grand<b>s</b>.<br><b>Ils sont</b> blond<b>s</b>.</p></div>
   <div class="dialog pink"><p>Léa et Ada sont grand<b>es</b>.<br><b>Elles sont</b> blond<b>es</b>.</p></div></div>
   <div class="dialog"><p>Max, Ada et Léa sont blonds. → <b>Ils sont blonds.</b></p></div>
   <ul class="rules"><li>👨‍👩‍👧 Mixed group (even 1 man + 100 women) → masculine <b>ils</b> + masculine plural. 男女混合一律用陽性複數。</li></ul>`},
  {h:"Pluriel = singulier + s", body:`
   <table class="tbl"><tr><th>Singulier</th><th>Pluriel</th></tr>
   <tr><td>Il est blond.</td><td>Ils sont blond<b>s</b>.</td></tr>
   <tr><td>Elle est blonde.</td><td>Elles sont blonde<b>s</b>.</td></tr>
   <tr><td>Il est étudiant.</td><td>Ils sont étudiant<b>s</b>.</td></tr>
   <tr><td>Elle est étudiante.</td><td>Elles sont étudiante<b>s</b>.</td></tr></table>
   <ul class="rules"><li>🔊 The plural <b>-s is silent</b>: <i>blond</i> and <i>blonds</i> sound identical. You hear the plural in <b>il est</b> [ilɛ] vs <b>ils sont</b> [ilsɔ̃].</li>
   <li>Ending in <b>-s</b> or <b>-x</b> → no change: Il est françai<b>s</b> → Ils sont françai<b>s</b>; Il est vieu<b>x</b> → Ils sont vieu<b>x</b>; jalou<b>x</b> → jalou<b>x</b>.</li>
   <li>⚠️ <b>-eau → -eaux</b>: Il est beau → Ils sont beau<b>x</b>.</li></ul>`}
 ],
 vocab:[
  {fr:"américain / américaine",zh:"美國的",en:"American",e:"🇺🇸",ex:"Ils sont américains."},
  {fr:"brésilien / brésilienne",zh:"巴西的",en:"Brazilian",e:"🇧🇷",ex:"Elles sont brésiliennes."},
  {fr:"allemand / allemande",zh:"德國的",en:"German",e:"🇩🇪",ex:"Ils sont allemands."},
  {fr:"italien / italienne",zh:"義大利的",en:"Italian",e:"🇮🇹",ex:"Elles sont italiennes."},
  {fr:"russe",zh:"俄國的",en:"Russian",e:"🇷🇺",ex:"Ils sont russes."},
  {fr:"le danseur / la danseuse",zh:"舞者",en:"dancer",e:"💃",ex:"Elles sont danseuses."},
  {fr:"célèbre",zh:"有名的",en:"famous",e:"🌟",ex:"Les actrices sont belles et célèbres."},
  {fr:"distrait / distraite",zh:"心不在焉的",en:"absent-minded",e:"🙃",ex:"Les savants sont distraits."},
  {fr:"riche",zh:"富有的",en:"rich",e:"💰",ex:"Les princesses sont riches."},
  {fr:"malheureux / malheureuse",zh:"不幸的",en:"unhappy",e:"😢",ex:"Elles sont malheureuses."},
  {fr:"musclé / musclée",zh:"肌肉發達的",en:"muscular",e:"💪",ex:"Les basketteurs sont musclés."},
  {fr:"curieux / curieuse",zh:"好奇的",en:"curious",e:"🧐",ex:"Elles sont curieuses."},
  {fr:"courageux / courageuse",zh:"勇敢的",en:"brave",e:"🦁",ex:"Les Martiennes sont courageuses."},
  {fr:"jaloux / jalouse",zh:"嫉妒的",en:"jealous",e:"😒",ex:"Roméo et Othello sont jaloux."},
  {fr:"le savant",zh:"科學家",en:"scientist",e:"🔬",ex:"Les savants sont intelligents."}
 ],
 notes:[
  ["Ils sont beax","❌ → ✅ <b>beaux</b> (b-e-a-u-x). -eau → -eaux."],
  ["X at the end, never add s","✅ Correct for -x (jaloux, vieux, heureux). Also words ending in <b>-s</b> (français, anglais)."],
  ["Elles sont bruns","❌ → ✅ Tania et Zoé : <b>Elles sont brunes.</b>"],
  ["男女在一起，一定要陽","✅ Exactly: Max, Ada et Léa → <b>ils</b> sont blond<b>s</b>."],
  ["les savants = 聰明","💡 <b>un savant</b> = a scientist/scholar 科學家、學者."]
 ],
 ex:[
  {t:"fill",q:"David est brun. David et Kevin sont ____ .",a:["bruns"]},
  {t:"fill",q:"David est gentil. David et Kevin sont ____ .",a:["gentils"]},
  {t:"fill",q:"Tania est brésilienne. Tania et Zoé sont ____ .",a:["brésiliennes"]},
  {t:"fill",q:"Tania est célibataire. Tania et Zoé sont ____ .",a:["célibataires"]},
  {t:"fill",q:"Narcisse est beau. Narcisse et Adonis sont ____ .",a:["beaux"]},
  {t:"fill",q:"Roméo est jaloux. Roméo et Othello sont ____ .",a:["jaloux"]},
  {t:"fill",q:"Shakespeare est anglais. Shakespeare et Hitchcock sont ____ .",a:["anglais"]},
  {t:"mcq",q:"Max, Ada et Léa sont…",o:["blondes","blonds","blond"],a:1,why:"Mixed group → masculine plural."},
  {t:"mcq",q:"Les princesses sont…",o:["riches et malheureuses","riche et malheureux","riches et malheureux"],a:0},
  {t:"order",q:"Les basketteurs :",w:["Ils","sont","grands","et","musclés."],a:"Ils sont grands et musclés."},
  {t:"match",q:"Il est… → Ils sont…",p:[["italien","italiens"],["allemand","allemands"],["russe","russes"],["vieux","vieux"]]},
  {t:"mcq",q:"Do « étudiant » and « étudiants » sound different?",o:["Yes","No — the plural s is silent"],a:1}
 ]},
/* ================= LESSON 4 ================= */
{id:4, emoji:"🧩", color:"#10b981",
 title:"Je suis, tu es, il est…",
 short:"Le verbe être", zh:"être 動詞變化・tu/vous・nous/on",
 goal:"Conjugate « être » and choose between tu / vous and nous / on.",
 sections:[
  {h:"Le verbe « être » au présent", body:`
   <table class="tbl conj"><tr><th>主詞</th><th>être</th><th>exemple</th></tr>
   <tr><td>je 我</td><td><b>suis</b></td><td>français(e)</td></tr>
   <tr><td>tu 你/妳</td><td><b>es</b></td><td>anglais(e)</td></tr>
   <tr><td>il / elle / on 他/她/我們</td><td><b>est</b></td><td>italien / italienne / jeune(s)</td></tr>
   <tr><td>nous 我們</td><td><b>sommes</b></td><td>fatigué(e)s</td></tr>
   <tr><td>vous 你們/您</td><td><b>êtes</b></td><td>fatigué(e)(s)</td></tr>
   <tr><td>ils / elles 他們/她們</td><td><b>sont</b></td><td>italiens / italiennes</td></tr></table>
   <ul class="rules"><li>🔊 <b>tu es</b> and <b>il est</b> sound the same [ɛ]. ⚠️ Spelling: <b>tu es</b>, never <s>tu est</s>.</li>
   <li>🔗 vous‿êtes [z] · on‿est [n] · ils sont [s] ≠ ils‿ont [z] (avoir!).</li></ul>
   <div class="board"><p class="hand">fatigué <small>(adj.)</small></p>
   <p>♂ Paul est fatigué. · ♀ Emma est fatigué<b>e</b>. · ♂♂ Ils sont fatigué<b>s</b>. · ♀♀ Elles sont fatigué<b>es</b>.</p></div>`},
  {h:"« Vous » et « tu »", body:`
   <div class="two"><div class="dialog"><p><b>VOUS</b> = politeness 禮貌 (university, office, strangers)<br>– Vous êtes prêt, monsieur Meyer ?<br>– Vous êtes prête, madame Meyer ?</p></div>
   <div class="dialog pink"><p><b>TU</b> = familiar 熟人 (family, friends, classmates)<br>– Tu es prêt, papa ?<br>– Tu es prête, maman ?</p></div></div>
   <div class="dialog"><p><b>VOUS</b> = plural 複數 : Vous êtes prêts ? (Léo et papa) · Vous êtes prêtes ? (Léa et maman)</p></div>`},
  {h:"« Nous » et « on »", body:`
   <ul class="rules"><li><b>ON = NOUS</b> (spoken, very common): <i>Jean et moi, on est enrhumés.</i> = Nous sommes enrhumés. 我們感冒了。</li>
   <li>⚠️ <b>on</b> means "we" but takes the <b>3rd-person singular verb</b> (on <b>est</b>); the adjective may agree in plural (on est fatigué<b>s</b>).</li>
   <li><b>ON = generality</b> 泛指「人」: <i>Quand on est enrhumé, on est fatigué.</i> When you have a cold, you're tired.</li>
   <li>💬 <b>On est ici.</b> = We're here.</li></ul>`}
 ],
 vocab:[
  {fr:"fatigué / fatiguée",zh:"累的",en:"tired",e:"😴",ex:"Nous sommes fatigués."},
  {fr:"prêt / prête",zh:"準備好的",en:"ready",e:"✅",ex:"Tu es prête, maman ?"},
  {fr:"enrhumé / enrhumée",zh:"感冒的",en:"have a cold",e:"🤧",ex:"On est enrhumés."},
  {fr:"content / contente",zh:"開心的",en:"happy, glad",e:"😃",ex:"Nous sommes contents d'être à Paris."},
  {fr:"triste",zh:"難過的",en:"sad",e:"😞",ex:"On est triste de partir."},
  {fr:"désolé / désolée",zh:"抱歉的",en:"sorry",e:"🙇",ex:"Nous sommes désolés d'être en retard."},
  {fr:"heureux / heureuse",zh:"幸福的",en:"happy",e:"🥰",ex:"Nous sommes heureux d'être en vacances."},
  {fr:"en retard",zh:"遲到",en:"late",e:"⏰",ex:"Quand on est en retard, on est pressé."},
  {fr:"en vacances",zh:"在度假",en:"on holiday",e:"🏖️",ex:"On est en vacances à Rome."},
  {fr:"pressé / pressée",zh:"匆忙的",en:"in a hurry",e:"🏃",ex:"On est pressé."},
  {fr:"stressé / stressée",zh:"有壓力的",en:"stressed",e:"😰",ex:"Quand on est fatigué, on est stressé."},
  {fr:"au chômage",zh:"失業",en:"unemployed",e:"📉",ex:"Quand on est au chômage, on est triste."},
  {fr:"non-fumeur",zh:"不抽菸的人",en:"non-smoker",e:"🚭",ex:"Tu es non-fumeur ?"},
  {fr:"seul / seule",zh:"單獨的",en:"alone",e:"🧍",ex:"Vous êtes seul ?"},
  {fr:"le vent",zh:"風",en:"wind",e:"🌬️",ex:"Le vent est froid."},
  {fr:"le ventilateur",zh:"電風扇",en:"fan",e:"🌀",ex:"Le ventilateur est cassé."},
  {fr:"C'est la vie",zh:"人生就是這樣",en:"That's life",e:"🤷",ex:"C'est la vie !"}
 ],
 notes:[
  ["on, nous = 3rd person","⚠️ Precisely: <b>nous</b> is 1st-person plural (nous <b>sommes</b>). <b>on</b> <i>means</i> « we » but conjugates like <b>il/elle</b> (on <b>est</b>)."],
  ["Tu est fatigué / Tu est étudiant ?","❌ → ✅ <b>Tu es</b> — tu always takes <b>es</b>; <b>est</b> is for il/elle/on."],
  ["Nous sommes désolé de…","❌ → ✅ <b>Nous sommes désolé<u>s</u></b> — agree with nous (plural)."],
  ["Je suis fatigué ≠ Je ne suis pas fatigué","✅ Nice! Negation is lesson 5: <b>ne + verb + pas</b>."],
  ["Le vent = the wind, fan = ventilateur","✅ Correct."],
  ["C'est la vie = mostly during sad","✅ Yes, it's resigned: « that's life, oh well »."]
 ],
 ex:[
  {t:"fill",q:"Tu ____ brun.",a:["es"]},
  {t:"fill",q:"Ada ____ grande.",a:["est"]},
  {t:"fill",q:"Nous ____ célibataires.",a:["sommes"]},
  {t:"fill",q:"Vous ____ marié ?",a:["êtes"]},
  {t:"fill",q:"Les enfants ____ fatigués.",a:["sont"]},
  {t:"fill",q:"Ada et Léa ____ gentilles.",a:["sont"]},
  {t:"mcq",q:"À un nouveau camarade (classmate) :",o:["Vous êtes calme ?","Tu es calme ?","Tu est calme ?"],a:1},
  {t:"mcq",q:"À un inconnu (a stranger) :",o:["Tu es étudiant ?","Vous êtes étudiant ?"],a:1},
  {t:"mcq",q:"À deux nouveaux camarades :",o:["Tu es non-fumeur ?","Vous êtes non-fumeurs ?"],a:1,why:"vous = plural too."},
  {t:"match",q:"Associez :",p:[["content","d'être à Paris"],["désolé","d'être en retard"],["heureux","d'être en vacances"],["triste","de partir"]]},
  {t:"order",q:"« nous » → « on »:",w:["On","est","étudiants."],a:"On est étudiants."},
  {t:"order",q:"Généralité :",w:["Quand","on","est","enrhumé,","on","est","fatigué."],a:"Quand on est enrhumé, on est fatigué."},
  {t:"fill",q:"Elle est fatiguée → Elles sont ____ .",a:["fatiguées"]}
 ]},
/* ================= LESSON 5 ================= */
{id:5, emoji:"❓", color:"#f59e0b",
 title:"Est-ce que vous êtes japonais ? — Non, je ne suis pas japonais.",
 short:"Questions & négation", zh:"疑問句與否定句",
 goal:"Ask yes/no questions and answer in the negative.",
 sections:[
  {h:"L'interrogation simple 簡單疑問句", body:`
   <div class="two"><div class="dialog"><p><b>Affirmation ↘</b> (intonation descendante)<br>– Vous êtes japonais.<br>– Jean est français.</p></div>
   <div class="dialog pink"><p><b>Interrogation ↗</b> (intonation montante)<br>– Vous êtes japonais ?<br>– Jean est français ?</p></div></div>
   <div class="dialog"><p><b>Est-ce que</b> + phrase : <b>Est-ce que</b> vous êtes japonais ? · <b>Est-ce que</b> Jean est français ?</p></div>
   <ul class="rules"><li>✍️ Spelling: <b>Est-ce que</b> (one hyphen only). Before a vowel: <b>Est-ce qu'</b>il est… / Est-ce qu'elle est…</li>
   <li>🔊 Pronounced [ɛs-kə]. In French there's a space before ? ! : ; (« Vous êtes japonais ? »).</li></ul>`},
  {h:"La négation (1) : ne + verbe + pas", body:`
   <table class="tbl"><tr><td>Je</td><td><b>ne</b></td><td>suis</td><td><b>pas</b></td><td>content.</td></tr>
   <tr><td>Elle</td><td><b>n'</b></td><td>est</td><td><b>pas</b></td><td>riche.</td></tr>
   <tr><td>Ils</td><td><b>ne</b></td><td>sont</td><td><b>pas</b></td><td>italiens.</td></tr></table>
   <ul class="rules"><li><b>ne → n'</b> before a vowel: Il <s>ne est</s> → Il <b>n'est</b> pas… · Vous <s>ne êtes</s> → Vous <b>n'êtes</b> pas…</li>
   <li>💬 Spoken French often drops <i>ne</i>: « Je suis pas fatigué. » OK when chatting, but <b>write ne…pas</b> in tests.</li>
   <li>⚠️ Don't mix up <b>Je ne suis pas</b> (I am not — être) and <b>Je ne sais pas</b> (I don't know — savoir; spoken « j'sais pas / chais pas »).</li></ul>`}
 ],
 vocab:[
  {fr:"Est-ce que… ?",zh:"…嗎？",en:"(question marker)",e:"❓",ex:"Est-ce que tu es étudiant ?"},
  {fr:"ne… pas",zh:"不",en:"not",e:"🚫",ex:"Je ne suis pas japonais."},
  {fr:"Je ne sais pas",zh:"我不知道",en:"I don't know",e:"🤷‍♂️",ex:"Je ne sais pas !"},
  {fr:"bilingue",zh:"雙語的",en:"bilingual",e:"🗣️",ex:"Je suis bilingue."},
  {fr:"la chambre",zh:"房間",en:"bedroom",e:"🛏️",ex:"La chambre n'est pas grande."},
  {fr:"le lit",zh:"床",en:"bed",e:"🛌",ex:"Le lit est confortable."},
  {fr:"l'eau (f.)",zh:"水",en:"water",e:"💧",ex:"L'eau n'est pas chaude."},
  {fr:"chaud / chaude",zh:"熱的",en:"hot",e:"🔥",ex:"L'eau est chaude."},
  {fr:"cher / chère",zh:"貴的",en:"expensive",e:"💸",ex:"Les chambres sont chères."},
  {fr:"confortable",zh:"舒適的",en:"comfortable",e:"🛋️",ex:"Le lit n'est pas confortable."},
  {fr:"sévère",zh:"嚴格的",en:"strict",e:"😠",ex:"Le professeur est sévère."},
  {fr:"difficile",zh:"困難的",en:"difficult",e:"🧗",ex:"Le sujet est difficile."},
  {fr:"vénusien / vénusienne",zh:"金星人",en:"Venusian",e:"🪐",ex:"La mère de Zaza est vénusienne."}
 ],
 notes:[
  ["Je ne sais pas = Je sais pas = J'sais pas","⚠️ Those are <b>savoir</b> (know). For <b>être</b>: Je ne <b>suis</b> pas = Je suis pas (spoken)."],
  ["Je suis pas = 0 分","✅ Exactly — on a written test, keep <b>ne</b>!"],
  ["Est-ce-que","❌ → ✅ <b>Est-ce que</b> — only one hyphen (est-ce)."],
  ["Je suis Malaisien","✅ → <b>Je suis malaisien</b> (lowercase adjective). Fem. malaisienne."],
  ["quadrilingue","✅ Correct word: speaks 4 languages. Nice!"]
 ],
 ex:[
  {t:"order",q:"Question with « tu » :",w:["Est-ce","que","tu","es","anglais","?"],a:"Est-ce que tu es anglais ?"},
  {t:"fill",q:"Je suis grand. → Je ne suis ____ grand.",a:["pas"]},
  {t:"fill",q:"La chambre est grande. → La chambre ____ pas grande.",a:["n'est"]},
  {t:"fill",q:"Le lit est confortable. → Le lit n'est ____ confortable.",a:["pas"]},
  {t:"order",q:"Les chambres sont chères → négatif :",w:["Les","chambres","ne","sont","pas","chères."],a:"Les chambres ne sont pas chères."},
  {t:"mcq",q:"Vous êtes riche → ?",o:["Vous ne êtes pas riche.","Vous n'êtes pas riche.","Vous n'êtes riche pas."],a:1},
  {t:"mcq",q:"« Je ne sais pas » means…",o:["I am not","I don't know"],a:1},
  {t:"order",q:"– Est-ce que Léa est célibataire ? (mariée)",w:["Non,","elle","n'est","pas","célibataire.","Elle","est","mariée."],a:"Non, elle n'est pas célibataire. Elle est mariée."},
  {t:"order",q:"– Est-ce que Bip et Zaza sont blancs ? (verts)",w:["Non,","ils","ne","sont","pas","blancs.","Ils","sont","verts."],a:"Non, ils ne sont pas blancs. Ils sont verts."},
  {t:"mcq",q:"Which spelling is correct?",o:["Est-ce-que","Est-ce que","Est ce que"],a:1},
  {t:"mcq",q:"In a statement, the intonation goes…",o:["↗ up","↘ down"],a:1}
 ]},
/* ================= LESSON 6 ================= */
{id:6, emoji:"🎧", color:"#ef4444",
 title:"Je parle, je regarde, j'aime…",
 short:"Les verbes en -ER", zh:"-er 動詞（第一人稱）",
 goal:"Use regular -er verbs with « je » and express likes with « aimer ».",
 sections:[
  {h:"Les verbes en « -ER » (1)", body:`
   <div class="dialog"><p>Je <b>regarde</b> la télé. · J'<b>écoute</b> la radio. · Je <b>mange</b> un gâteau. · Je <b>téléphone</b> à Marta. · J'<b>aime</b> les gâteaux. · J'<b>aime</b> Marta.</p></div>
   <table class="tbl"><tr><th>Infinitif</th><th>je</th></tr>
   <tr><td>parl-<b>er</b></td><td>je parl-<b>e</b></td></tr><tr><td>regard-<b>er</b></td><td>je regard-<b>e</b></td></tr>
   <tr><td>mang-<b>er</b></td><td>je mang-<b>e</b></td></tr><tr><td>téléphon-<b>er</b></td><td>je téléphon-<b>e</b></td></tr>
   <tr><td>écout-<b>er</b></td><td>j'écout-<b>e</b></td></tr><tr><td>aim-<b>er</b></td><td>j'aim-<b>e</b></td></tr>
   <tr><td>étudi-<b>er</b></td><td>j'étudi-<b>e</b> &nbsp; ❌ <s>j'étude</s></td></tr></table>
   <ul class="rules"><li>🔊 The final <b>-e is silent</b>: je parl(e), je travaill(e), j'aim(e).</li>
   <li>✂️ <b>Je → J'</b> before a vowel or a silent h: <s>je aime</s> → <b>j'aime</b>, <s>je habite</s> → <b>j'habite</b>.</li>
   <li>⭐ Bonus (full present): je parl<b>e</b>, tu parl<b>es</b>, il parl<b>e</b>, nous parl<b>ons</b>, vous parl<b>ez</b>, ils parl<b>ent</b> — e/es/e/ent all sound the same! (manger → nous mange<b>ons</b>)</li></ul>`},
  {h:"Le verbe « aimer » : sentiments et goûts 喜好", body:`
   <div class="two"><div class="dialog"><p>J'aime Jean.<br>J'aime mon mari.<br>J'aime mon chien.</p></div>
   <div class="dialog pink"><p>J'aime Paris.<br>J'aime <b>les</b> carottes.<br>J'aime <b>la</b> musique.</p></div></div>
   <ul class="rules"><li>⚠️ After <b>aimer</b>, use the definite article (le / la / les): <i>J'aime <b>le</b> sport</i>, never <s>J'aime sport</s>.</li></ul>`}
 ],
 vocab:[
  {fr:"parler",zh:"說",en:"to speak",e:"🗣️",ex:"Je parle anglais."},
  {fr:"regarder",zh:"看",en:"to watch",e:"📺",ex:"Je regarde la télé."},
  {fr:"écouter",zh:"聽",en:"to listen",e:"🎧",ex:"J'écoute la radio."},
  {fr:"manger",zh:"吃",en:"to eat",e:"🍰",ex:"Je mange un gâteau."},
  {fr:"téléphoner (à)",zh:"打電話（給）",en:"to phone",e:"📞",ex:"Je téléphone à Marta."},
  {fr:"aimer",zh:"喜歡／愛",en:"to like / love",e:"❤️",ex:"J'aime la musique."},
  {fr:"étudier",zh:"讀書、學習",en:"to study",e:"📚",ex:"J'étudie le français."},
  {fr:"travailler",zh:"工作",en:"to work",e:"💼",ex:"Je travaille dans une banque."},
  {fr:"habiter (à)",zh:"住在",en:"to live",e:"🏠",ex:"J'habite à Taipei."},
  {fr:"commencer",zh:"開始",en:"to start",e:"▶️",ex:"Je commence à 9 heures."},
  {fr:"terminer",zh:"結束",en:"to finish",e:"⏹️",ex:"Je termine à 18 heures."},
  {fr:"dîner",zh:"吃晚餐",en:"to have dinner",e:"🍝",ex:"Je dîne chez moi."},
  {fr:"le gâteau",zh:"蛋糕",en:"cake",e:"🎂",ex:"J'aime les gâteaux."},
  {fr:"la musique",zh:"音樂",en:"music",e:"🎵",ex:"J'aime la musique."},
  {fr:"le cinéma",zh:"電影院／電影",en:"cinema",e:"🎞️",ex:"J'aime le cinéma et le sport."}
 ],
 notes:[
  ["(no notes on this unit yet)","Exercises on p.21 were blank — try them all below! Answers checked automatically."]
 ],
 ex:[
  {t:"fill",q:"travailler → je ____",a:["travaille"]},
  {t:"fill",q:"parler → je ____",a:["parle"]},
  {t:"fill",q:"écouter → ____ (with je)",a:["j'écoute"]},
  {t:"fill",q:"habiter → ____ (with je)",a:["j'habite"]},
  {t:"fill",q:"étudier → ____ (with je)",a:["j'étudie"]},
  {t:"mcq",q:"Le matin, ____ à 9 heures.",o:["je commence","je termine","je dîne"],a:0},
  {t:"mcq",q:"Le soir, ____ à 18 heures.",o:["je commence","je termine","je regarde"],a:1},
  {t:"mcq",q:"Après le repas, ____ la télévision.",o:["j'écoute","je regarde","je parle"],a:1},
  {t:"order",q:"– Vous habitez à Londres ?",w:["Oui,","j'habite","à","Londres."],a:"Oui, j'habite à Londres."},
  {t:"order",q:"– Vous aimez le football ?",w:["Oui,","j'aime","le","football."],a:"Oui, j'aime le football."},
  {t:"mcq",q:"Which is correct?",o:["Je aime la musique.","J'aime musique.","J'aime la musique."],a:2},
  {t:"match",q:"Trouvez le verbe :",p:[["un sandwich","je mange"],["la radio","j'écoute"],["dans une banque","je travaille"],["anglais","je parle"]]}
 ]}
]};
