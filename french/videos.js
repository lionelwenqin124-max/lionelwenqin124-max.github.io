// Review videos (Grok Imagine, native French audio). Lines: [start,end,speaker,fr,en,zh]
window.VIDEOS={
1:{title:"Au café : se présenter",scene:"Paris café terrace · Lionel meets Camille",lines:[
 [0,2.3,"Lionel","Bonjour ! Je m'appelle Lionel.","Hello! My name is Lionel.","你好！我叫 Lionel。"],
 [2.3,5.5,"Camille","Enchantée ! Je suis Camille. Vous êtes japonais ?","Nice to meet you! I'm Camille. Are you Japanese?","很高興認識你！我是 Camille。您是日本人嗎？"],
 [5.5,7.5,"Lionel","Non, je suis taïwanais.","No, I'm Taiwanese.","不，我是台灣人。"],
 [7.5,10.5,"Camille","Moi, je suis française. Je suis médecin.","Me, I'm French. I'm a doctor.","我呢，我是法國人。我是醫生。"],
 [10.5,13,"Lionel","Et moi, je suis étudiant.","And I'm a student.","而我是學生。"]],
 tip:"« Enchantée » has an extra -e because Camille is a woman. Note: « je suis médecin » — no article before a job.",
 qs:[{q:"Lionel est…",o:["japonais","taïwanais","français"],a:1},{q:"Quelle est la profession de Camille ?",o:["étudiante","professeur","médecin"],a:2},{q:"Why « Enchantée » and not « Enchanté » ?",o:["Camille is a woman","It's a question","It's plural"],a:0}]},
2:{title:"Sur un banc : décrire des amis",scene:"University courtyard · looking at a photo",lines:[
 [0,3,"Mei","Regarde, c'est Paul. Il est grand et blond.","Look, it's Paul. He's tall and blond.","你看，這是 Paul。他又高又是金髮。"],
 [3,4,"Hugo","Et Julie ?","And Julie?","那 Julie 呢？"],
 [4,7,"Mei","Elle est grande et blonde aussi.","She's tall and blond too.","她也很高，也是金髮。"],
 [7,8,"Hugo","Elle est étudiante ?","Is she a student?","她是學生嗎？"],
 [8,12.5,"Mei","Oui, elle est étudiante. Elle est très gentille.","Yes, she's a student. She's very kind.","是的，她是學生。她人很好。"]],
 tip:"Listen: grand [grɑ̃] → grande [grɑ̃d], blond [blɔ̃] → blonde [blɔ̃d]. The feminine -e makes the final consonant audible.",
 qs:[{q:"Paul est…",o:["petit et brun","grand et blond","grande et blonde"],a:1},{q:"Julie est…",o:["étudiante","professeur","médecin"],a:0},{q:"gentil → féminin ?",o:["gentile","gentille","gentil"],a:1}]},
3:{title:"À la boulangerie : les amis italiens",scene:"Paris bakery-café · talking about friends",lines:[
 [0.4,2.8,"Kai","Ils sont italiens, tes amis ?","Are your friends Italian?","你的朋友們是義大利人嗎？"],
 [2.8,5.3,"Léa","Oui, Marco et Luca sont italiens.","Yes, Marco and Luca are Italian.","是的，Marco 和 Luca 是義大利人。"],
 [5.3,7.2,"Kai","Et Anna et Sofia ?","And Anna and Sofia?","那 Anna 和 Sofia 呢？"],
 [7.2,10.5,"Léa","Elles sont italiennes aussi. Elles sont très sympathiques !","They're Italian too. They're very nice!","她們也是義大利人。她們人很好！"]],
 tip:"ils (boys) → italiens; elles (girls) → italiennes. The plural -s is silent: italien = italiens to the ear.",
 qs:[{q:"Marco et Luca sont…",o:["italiennes","italiens","italien"],a:1},{q:"Anna et Sofia sont…",o:["italiennes","italiens","sympathique"],a:0},{q:"Do « italien » and « italiens » sound different?",o:["Yes","No"],a:1}]},
4:{title:"Dans le métro : on est en retard !",scene:"Paris metro platform · after class",lines:[
 [0,2,"Tom","Ah, tu es fatiguée ?","Oh, are you tired?","啊，妳累了嗎？"],
 [2,5,"Chloé","Oui, je suis très fatiguée. Et toi ?","Yes, I'm very tired. And you?","對，我很累。你呢？"],
 [5,7,"Tom","Moi aussi. Et on est en retard !","Me too. And we're late!","我也是。而且我們遲到了！"],
 [7,10,"Chloé","Oui, nous sommes pressés. Vite !","Yes, we're in a hurry. Quick!","對，我們很趕。快點！"]],
 tip:"tu es (not « tu est »). « on est » = « nous sommes » — same meaning, on uses the il/elle form.",
 qs:[{q:"« On est en retard » = …",o:["Nous sommes en retard","Ils sont en retard","Je suis en retard"],a:0},{q:"Chloé est…",o:["fatigué","fatiguée","fatigués"],a:1},{q:"Complete: Tu ___ fatiguée ?",o:["est","es","êtes"],a:1}]},
5:{title:"À l'hôtel : questions et négation",scene:"Small Paris hotel · at reception",lines:[
 [0,2.9,"Yu","Bonjour ! Est-ce que vous êtes français ?","Hello! Are you French?","您好！請問您是法國人嗎？"],
 [2.9,6,"Réceptionniste","Non, je ne suis pas français. Je suis belge.","No, I'm not French. I'm Belgian.","不，我不是法國人。我是比利時人。"],
 [6,8.4,"Yu","Est-ce que la chambre est chère ?","Is the room expensive?","房間貴嗎？"],
 [8.4,13.2,"Réceptionniste","Non, elle n'est pas chère. Elle est petite, mais elle est confortable.","No, it isn't expensive. It's small, but it's comfortable.","不，不貴。房間很小，但是很舒適。"]],
 tip:"ne + être + pas; before a vowel ne → n' : elle n'est pas chère. « chambre » is feminine → chère, petite.",
 qs:[{q:"Le réceptionniste est…",o:["français","belge","japonais"],a:1},{q:"La chambre est…",o:["chère et grande","petite et confortable","grande et chère"],a:1},{q:"Negative of « elle est chère » :",o:["elle ne est pas chère","elle n'est pas chère","elle n'est chère pas"],a:1}]},
6:{title:"Au bord de la Seine : -er verbs",scene:"Park by the Seine · getting to know each other",lines:[
 [0,2,"Inès","Tu parles anglais ?","Do you speak English?","你會說英文嗎？"],
 [2,6,"Lionel","Oui, je parle anglais. Et j'étudie le français.","Yes, I speak English. And I'm studying French.","會，我會說英文。而且我在學法文。"],
 [6,8,"Inès","Tu habites à Paris ?","Do you live in Paris?","你住在巴黎嗎？"],
 [8,13.5,"Lionel","Non, j'habite à Taipei. J'aime la musique et le cinéma.","No, I live in Taipei. I like music and cinema.","不，我住在台北。我喜歡音樂和電影。"]],
 tip:"je → j' before a vowel or h: j'étudie, j'habite, j'aime. After aimer use le/la/les: j'aime la musique.",
 qs:[{q:"Lionel habite à…",o:["Paris","Londres","Taipei"],a:2},{q:"Lionel aime…",o:["le sport","la musique et le cinéma","la télévision"],a:1},{q:"habiter → je ?",o:["je habite","j'habite","j'habites"],a:1}]}
};
