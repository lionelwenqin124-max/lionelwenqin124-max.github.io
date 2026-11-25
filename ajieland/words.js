// Word bank. pic = emoji or 'svg:name' (drawn in app.js). hint = first sounds spoken by the 💡 button.
const WORDS = {
  father:{pic:'👨',zh:'爸爸',hint:'fah',cat:'family',male:true},
  mother:{pic:'👩',zh:'媽媽',hint:'muh',cat:'family'},
  brother:{pic:'👦',zh:'哥哥 / 弟弟',hint:'bruh',cat:'family',male:true},
  sister:{pic:'👧',zh:'姊姊 / 妹妹',hint:'sis',cat:'family'},
  grandpa:{pic:'👴',zh:'爺爺 / 外公',hint:'gran',cat:'family',male:true},
  grandma:{pic:'👵',zh:'奶奶 / 外婆',hint:'gran',cat:'family'},
  cup:{pic:'svg:cup',zh:'杯子',hint:'cuh',cat:'table'},
  plate:{pic:'svg:plate',zh:'盤子',hint:'play',cat:'table'},
  spoon:{pic:'🥄',zh:'湯匙',hint:'spoo',cat:'table'},
  bowl:{pic:'svg:bowl',zh:'碗',hint:'boh',cat:'table'},
  pencil:{pic:'✏️',zh:'鉛筆',hint:'pen',cat:'school'},
  book:{pic:'📘',zh:'書',hint:'buh',cat:'school'},
  bag:{pic:'🎒',zh:'書包',hint:'ba',cat:'school'},
  money:{pic:'🪙',zh:'錢',hint:'muh',cat:'school'},
  milk:{pic:'🥛',zh:'牛奶',hint:'mil',cat:'food'},
  apple:{pic:'🍎',zh:'蘋果',hint:'ap',cat:'food'},
  bread:{pic:'🍞',zh:'麵包',hint:'bre',cat:'food'},
  juice:{pic:'🧃',zh:'果汁',hint:'joo',cat:'food'}
};
const CAT_WORDS = c => Object.keys(WORDS).filter(k=>WORDS[k].cat===c);
// Weak words get extra repetition (he only remembered "pencil" last month).
const WEAK = ['book','bag','money'];
