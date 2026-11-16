/* Same data as items.json, wrapped so the game also runs from file:// (browsers block fetch() of local files).
   If you edit items.json, paste its full contents after the equals sign below. */
window.LISTENING_GAME_DATA = {
  "meta": {
    "title": {
      "en": "Listening Practice Game",
      "zh": "英語聽力練習遊戲"
    },
    "subtitle": {
      "en": "12 questions · 3 parts",
      "zh": "共 12 題 · 三個部分"
    },
    "version": "1.0",
    "testMinutes": 7,
    "level": "CEFR A1-A2"
  },
  "timing": {
    "answerWindowMs": {
      "I": 12200,
      "II": 12200,
      "III": 8100
    },
    "gapAfterPartIntroMs": 1100,
    "practiceVideoLeadInMs": 1200,
    "note": "Answer windows are game timers. They are not silence inside the mp3 files."
  },
  "voices": {
    "N": {
      "role": "Narrator",
      "gender": "female",
      "reads": "part announcements, item numbers, the word 'Question.' and the questions in Parts II and III",
      "placeholderTts": "Kokoro af_bella"
    },
    "W": {
      "role": "Woman",
      "gender": "female",
      "reads": "the woman's lines",
      "placeholderTts": "Kokoro af_heart"
    },
    "M": {
      "role": "Man",
      "gender": "male",
      "reads": "the man's lines",
      "placeholderTts": "Kokoro am_michael"
    }
  },
  "sfx": {
    "correct": "sfx/correct.mp3",
    "wrong": "sfx/wrong.mp3"
  },
  "parts": [
    {
      "id": "I",
      "numberWord": "one",
      "title": {
        "en": "Question and Response",
        "zh": "問答"
      },
      "directions": {
        "en": "For each item, you will hear a question or a short sentence. Choose the best reply.",
        "zh": "每題會聽到一個問句或一句話，請選出最適合的回應。"
      },
      "howItWorks": {
        "en": "The question is spoken once. It is not printed. Only the three replies are printed.",
        "zh": "題目只唸一次，不會印出來；畫面上只有三個回應選項。"
      },
      "optionType": "text",
      "introAudio": "audio/test/part1_intro.mp3",
      "introScript": [
        {
          "speaker": "Narrator",
          "gender": "female",
          "voice": "N",
          "text": "Part one.",
          "pauseAfterMs": 350
        },
        {
          "speaker": "Narrator",
          "gender": "female",
          "voice": "N",
          "text": "Question and Response.",
          "pauseAfterMs": 750
        },
        {
          "speaker": "Narrator",
          "gender": "female",
          "voice": "N",
          "text": "For each item, you will hear a question or a short sentence. Choose the best reply.",
          "pauseAfterMs": 0
        }
      ]
    },
    {
      "id": "II",
      "numberWord": "two",
      "title": {
        "en": "Short Conversations",
        "zh": "簡短對話"
      },
      "directions": {
        "en": "You will hear a short conversation and then a question about it. Choose the right answer.",
        "zh": "每題會先聽到一段簡短對話，接著是一個問題，請選出正確的答案。"
      },
      "howItWorks": {
        "en": "The conversation and the question are spoken once. They are not printed. Only the three answers are printed.",
        "zh": "對話和問題都只唸一次，不會印出來；畫面上只有三個答案選項。"
      },
      "optionType": "text",
      "introAudio": "audio/test/part2_intro.mp3",
      "introScript": [
        {
          "speaker": "Narrator",
          "gender": "female",
          "voice": "N",
          "text": "Part two.",
          "pauseAfterMs": 350
        },
        {
          "speaker": "Narrator",
          "gender": "female",
          "voice": "N",
          "text": "Short Conversations.",
          "pauseAfterMs": 750
        },
        {
          "speaker": "Narrator",
          "gender": "female",
          "voice": "N",
          "text": "You will hear a short conversation and then a question about it. Choose the right answer.",
          "pauseAfterMs": 0
        }
      ]
    },
    {
      "id": "III",
      "numberWord": "three",
      "title": {
        "en": "Short Talks",
        "zh": "簡短談話"
      },
      "directions": {
        "en": "You will hear a question and then a short talk. Choose the picture that answers the question.",
        "zh": "每題會先聽到一個問題，接著是一段簡短談話，請選出符合答案的圖片。"
      },
      "howItWorks": {
        "en": "The question comes first, then the talk. Both are spoken once. Only the three pictures are shown.",
        "zh": "先唸問題，再唸談話，都只唸一次；畫面上只有三張圖片。"
      },
      "optionType": "image",
      "introAudio": "audio/test/part3_intro.mp3",
      "introScript": [
        {
          "speaker": "Narrator",
          "gender": "female",
          "voice": "N",
          "text": "Part three.",
          "pauseAfterMs": 350
        },
        {
          "speaker": "Narrator",
          "gender": "female",
          "voice": "N",
          "text": "Short Talks.",
          "pauseAfterMs": 750
        },
        {
          "speaker": "Narrator",
          "gender": "female",
          "voice": "N",
          "text": "You will hear a question and then a short talk. Choose the picture that answers the question.",
          "pauseAfterMs": 0
        }
      ]
    }
  ],
  "items": [
    {
      "number": 1,
      "id": "item01",
      "part": "I",
      "itemType": "Tag question (checking a fact): confirm and add a detail",
      "audio": {
        "test": "audio/test/item01.mp3",
        "practice": "audio/practice/item01.mp3"
      },
      "video": "videos/item01.mp4",
      "videoStill": "videos/item01.jpg",
      "scene": {
        "en": "Two students meet beside the indoor courts.",
        "zh": "兩位同學在室內球場旁遇到。"
      },
      "script": [
        {
          "speaker": "Narrator",
          "gender": "female",
          "voice": "N",
          "text": "One.",
          "pauseAfterMs": 750
        },
        {
          "speaker": "Woman",
          "gender": "female",
          "voice": "W",
          "text": "You're on the badminton team, right?",
          "zh": "你是羽球隊的，對吧？",
          "pauseAfterMs": 0
        }
      ],
      "question": {
        "text": "You're on the badminton team, right?",
        "zh": "你是羽球隊的，對吧？",
        "spokenBy": "Woman",
        "printedInTest": false
      },
      "options": [
        {
          "letter": "A",
          "text": "Yeah, we practice every Tuesday."
        },
        {
          "letter": "B",
          "text": "At seven thirty tonight."
        },
        {
          "letter": "C",
          "text": "Yes, she plays very well."
        }
      ],
      "answer": "A",
      "explanations": {
        "A": {
          "en": "Correct. \"..., right?\" checks a fact. \"Yeah\" says the fact is true, and \"we practice every Tuesday\" adds something about the team.",
          "zh": "正確。句尾的 right? 是在確認「你是羽球隊的吧？」。Yeah 表示「對」，後面再補充「我們每週二練習」，是最自然的回應。"
        },
        "B": {
          "en": "Wrong. This gives a time. It answers a When question, and nobody asked when.",
          "zh": "錯誤。這句是在說時間，用來回答 When（什麼時候）；這裡沒有人問時間。"
        },
        "C": {
          "en": "Wrong. \"Yes\" sounds fine, but the rest is about \"she\". The question is about \"you\".",
          "zh": "錯誤。開頭的 Yes 聽起來像對的，但後面說的是「她」打得很好；題目問的是「你」。"
        }
      },
      "tip": {
        "en": "Don't stop at \"Yes\". Listen to the whole reply.",
        "zh": "不要只聽到 Yes 就選，要把整句回應聽完。"
      }
    },
    {
      "number": 2,
      "id": "item02",
      "part": "I",
      "itemType": "Yes/No question (Does...?): indirect No with new information",
      "audio": {
        "test": "audio/test/item02.mp3",
        "practice": "audio/practice/item02.mp3"
      },
      "video": "videos/item02.mp4",
      "videoStill": "videos/item02.jpg",
      "scene": {
        "en": "A thirsty student walks toward the campus store after exercise.",
        "zh": "運動完口渴的同學走向學校福利社。"
      },
      "script": [
        {
          "speaker": "Narrator",
          "gender": "female",
          "voice": "N",
          "text": "Two.",
          "pauseAfterMs": 750
        },
        {
          "speaker": "Man",
          "gender": "male",
          "voice": "M",
          "text": "Does the school store sell sports drinks?",
          "zh": "學校的福利社有賣運動飲料嗎？",
          "pauseAfterMs": 0
        }
      ],
      "question": {
        "text": "Does the school store sell sports drinks?",
        "zh": "學校的福利社有賣運動飲料嗎？",
        "spokenBy": "Man",
        "printedInTest": false
      },
      "options": [
        {
          "letter": "A",
          "text": "The store is near the school gate."
        },
        {
          "letter": "B",
          "text": "Yes, I drink milk every morning."
        },
        {
          "letter": "C",
          "text": "No, they only have water and tea."
        }
      ],
      "answer": "C",
      "explanations": {
        "A": {
          "en": "Wrong. It repeats \"store\", but it says where the store is. It does not say what the store sells.",
          "zh": "錯誤。雖然重複了 store，但這句是說福利社「在哪裡」，沒有回答有沒有賣運動飲料。"
        },
        "B": {
          "en": "Wrong. It starts with \"Yes\" and repeats \"drink\", but it is about what the speaker drinks, not what the store sells.",
          "zh": "錯誤。雖然用 Yes 開頭、也有 drink，但說的是「我每天早上喝牛奶」，不是福利社賣什麼。"
        },
        "C": {
          "en": "Correct. A \"Does...?\" question needs Yes or No. \"No\" and then \"they only have water and tea\" tells you the store has no sports drinks.",
          "zh": "正確。Does 開頭的問句要用 Yes／No 回答。先說 No，再說「只有水和茶」，意思就是沒有賣運動飲料。"
        }
      },
      "tip": {
        "en": "A reply that repeats a word from the question (store, drink) can be a trap.",
        "zh": "回應裡重複題目出現過的字（store、drink）不一定是對的，常常是陷阱。"
      }
    },
    {
      "number": 3,
      "id": "item03",
      "part": "I",
      "itemType": "Wh-question (What...?): direct answer about the listener",
      "audio": {
        "test": "audio/test/item03.mp3",
        "practice": "audio/practice/item03.mp3"
      },
      "video": "videos/item03.mp4",
      "videoStill": "videos/item03.jpg",
      "scene": {
        "en": "Class is over and students are packing their bags.",
        "zh": "下課了，同學們正在收書包。"
      },
      "script": [
        {
          "speaker": "Narrator",
          "gender": "female",
          "voice": "N",
          "text": "Three.",
          "pauseAfterMs": 750
        },
        {
          "speaker": "Woman",
          "gender": "female",
          "voice": "W",
          "text": "What do you usually do after class?",
          "zh": "你下課後通常都做什麼？",
          "pauseAfterMs": 0
        }
      ],
      "question": {
        "text": "What do you usually do after class?",
        "zh": "你下課後通常都做什麼？",
        "spokenBy": "Woman",
        "printedInTest": false
      },
      "options": [
        {
          "letter": "A",
          "text": "She walks to school every day."
        },
        {
          "letter": "B",
          "text": "I go jogging with my friends."
        },
        {
          "letter": "C",
          "text": "In the classroom on the second floor."
        }
      ],
      "answer": "B",
      "explanations": {
        "A": {
          "en": "Wrong. The question is about \"you\", but this reply is about \"she\".",
          "zh": "錯誤。問的是「你」，這句回答的卻是「她」，人不對。"
        },
        "B": {
          "en": "Correct. \"What do you ... do?\" asks about an activity. \"I go jogging\" names the activity.",
          "zh": "正確。What do you … do? 是問「做什麼事」。回答「我和朋友去慢跑」正好說出活動。"
        },
        "C": {
          "en": "Wrong. This gives a place. The question asked what, not where.",
          "zh": "錯誤。這句是在說地點，但題目問的是 What（做什麼），不是 Where（在哪裡）。"
        }
      },
      "tip": {
        "en": "Catch the question word first: What = a thing or an activity.",
        "zh": "先抓住疑問詞：What 問的是「什麼事／什麼東西」。"
      }
    },
    {
      "number": 4,
      "id": "item04",
      "part": "I",
      "itemType": "Yes/No question (Have you...?): indirect Yes that shows it is done",
      "audio": {
        "test": "audio/test/item04.mp3",
        "practice": "audio/practice/item04.mp3"
      },
      "video": "videos/item04.mp4",
      "videoStill": "videos/item04.jpg",
      "scene": {
        "en": "Two classmates talk in a hallway decorated for a school event.",
        "zh": "兩位同學在佈置好的走廊上聊天。"
      },
      "script": [
        {
          "speaker": "Narrator",
          "gender": "female",
          "voice": "N",
          "text": "Four.",
          "pauseAfterMs": 750
        },
        {
          "speaker": "Man",
          "gender": "male",
          "voice": "M",
          "text": "Have you signed up for Sports Day?",
          "zh": "你報名運動會了嗎？",
          "pauseAfterMs": 0
        }
      ],
      "question": {
        "text": "Have you signed up for Sports Day?",
        "zh": "你報名運動會了嗎？",
        "spokenBy": "Man",
        "printedInTest": false
      },
      "options": [
        {
          "letter": "A",
          "text": "Yes, it was sunny all day."
        },
        {
          "letter": "B",
          "text": "Yes, my name is on the list."
        },
        {
          "letter": "C",
          "text": "No, he lives near the park."
        }
      ],
      "answer": "B",
      "explanations": {
        "A": {
          "en": "Wrong. It repeats \"day\", but it is about the weather. It says nothing about signing up.",
          "zh": "錯誤。雖然也有 day，但這句是說「一整天都是晴天」，和有沒有報名無關。"
        },
        "B": {
          "en": "Correct. If your name is on the list, you have already signed up.",
          "zh": "正確。「我的名字已經在名單上了」就表示已經報名了。"
        },
        "C": {
          "en": "Wrong. It starts with \"No\", but it is about where another person lives, not about Sports Day.",
          "zh": "錯誤。雖然用 No 開頭，但說的是「他住在公園附近」，人不對，也和運動會報名無關。"
        }
      },
      "tip": {
        "en": "The right reply may not repeat the words in the question. Think about the meaning.",
        "zh": "正確回應不一定會重複題目的字，要想整句的意思。"
      }
    },
    {
      "number": 5,
      "id": "item05",
      "part": "I",
      "itemType": "Wh-question (What + noun...?): name a choice",
      "audio": {
        "test": "audio/test/item05.mp3",
        "practice": "audio/practice/item05.mp3"
      },
      "video": "videos/item05.mp4",
      "videoStill": "videos/item05.jpg",
      "scene": {
        "en": "Two students look at a phone together outside the P.E. office.",
        "zh": "兩位同學在體育組辦公室外一起看手機。"
      },
      "script": [
        {
          "speaker": "Narrator",
          "gender": "female",
          "voice": "N",
          "text": "Five.",
          "pauseAfterMs": 750
        },
        {
          "speaker": "Woman",
          "gender": "female",
          "voice": "W",
          "text": "What P.E. class are you going to take?",
          "zh": "你打算修哪一門體育課？",
          "pauseAfterMs": 0
        }
      ],
      "question": {
        "text": "What P.E. class are you going to take?",
        "zh": "你打算修哪一門體育課？",
        "spokenBy": "Woman",
        "printedInTest": false
      },
      "options": [
        {
          "letter": "A",
          "text": "To get more exercise."
        },
        {
          "letter": "B",
          "text": "We took the bus to school."
        },
        {
          "letter": "C",
          "text": "I'll probably take yoga."
        }
      ],
      "answer": "C",
      "explanations": {
        "A": {
          "en": "Wrong. \"To get more exercise\" gives a reason. The question asked which class, not why.",
          "zh": "錯誤。To get more exercise 是說明目的（為了多運動），但題目問的是「哪一門課」，不是為什麼。"
        },
        "B": {
          "en": "Wrong. \"took\" sounds like \"take\", but this is about taking a bus in the past.",
          "zh": "錯誤。took 和 take 聽起來很像，但這句是說「我們之前搭公車上學」，和選課無關。"
        },
        "C": {
          "en": "Correct. \"What P.E. class...?\" asks for a class. Yoga is a class you can take.",
          "zh": "正確。What P.E. class…? 是問「哪一門體育課」，回答「我大概會修瑜珈」正好說出課名。"
        }
      },
      "tip": {
        "en": "Listen for the noun after What: What class = name a class.",
        "zh": "注意 What 後面的名詞：What class 就是要回答一門課。"
      }
    },
    {
      "number": 6,
      "id": "item06",
      "part": "I",
      "itemType": "Statement about another person: reply with a sensible guess",
      "audio": {
        "test": "audio/test/item06.mp3",
        "practice": "audio/practice/item06.mp3"
      },
      "video": "videos/item06.mp4",
      "videoStill": "videos/item06.jpg",
      "scene": {
        "en": "A student crosses the campus while two classmates watch from a bench.",
        "zh": "一位同學走過校園，兩位同學坐在長椅上看著他。"
      },
      "script": [
        {
          "speaker": "Narrator",
          "gender": "female",
          "voice": "N",
          "text": "Six.",
          "pauseAfterMs": 750
        },
        {
          "speaker": "Man",
          "gender": "male",
          "voice": "M",
          "text": "Ryan always has a basketball under his arm.",
          "zh": "Ryan 手臂下總是夾著一顆籃球。",
          "pauseAfterMs": 0
        }
      ],
      "question": {
        "text": "Ryan always has a basketball under his arm.",
        "zh": "Ryan 手臂下總是夾著一顆籃球。",
        "spokenBy": "Man",
        "printedInTest": false
      },
      "options": [
        {
          "letter": "A",
          "text": "Yeah, he really loves sports."
        },
        {
          "letter": "B",
          "text": "He broke his arm last year."
        },
        {
          "letter": "C",
          "text": "I left my ball at home."
        }
      ],
      "answer": "A",
      "explanations": {
        "A": {
          "en": "Correct. A person who always carries a basketball probably loves sports. \"Yeah\" agrees with the speaker.",
          "zh": "正確。總是帶著籃球的人，應該很愛運動。Yeah 表示同意對方說的話，是最合理的回應。"
        },
        "B": {
          "en": "Wrong. It repeats \"arm\", but a broken arm last year does not explain why he carries a ball now.",
          "zh": "錯誤。雖然重複了 arm，但「他去年手臂骨折」和他現在總是帶著籃球沒有關係。"
        },
        "C": {
          "en": "Wrong. It has the word \"ball\", but it is about the speaker's own ball. The statement is about Ryan.",
          "zh": "錯誤。雖然有 ball，但這句說的是「我」把球忘在家裡；題目講的是 Ryan。"
        }
      },
      "tip": {
        "en": "For a statement, ask yourself: what does this tell me about the person?",
        "zh": "聽到敘述句時，想一想：這句話讓我知道這個人怎麼樣？"
      }
    },
    {
      "number": 7,
      "id": "item07",
      "part": "II",
      "itemType": "Conversation, man speaks first, 8 turns: guess the place from the plan",
      "audio": {
        "test": "audio/test/item07.mp3",
        "practice": "audio/practice/item07.mp3"
      },
      "video": "videos/item07.mp4",
      "videoStill": "videos/item07.jpg",
      "scene": {
        "en": "A man and a woman chat beside the campus bicycle racks.",
        "zh": "一男一女在校園腳踏車停車架旁聊天。"
      },
      "script": [
        {
          "speaker": "Narrator",
          "gender": "female",
          "voice": "N",
          "text": "Seven.",
          "pauseAfterMs": 1000
        },
        {
          "speaker": "Man",
          "gender": "male",
          "voice": "M",
          "text": "How do you spend your weekends?",
          "zh": "你週末都怎麼過？",
          "pauseAfterMs": 950
        },
        {
          "speaker": "Woman",
          "gender": "female",
          "voice": "W",
          "text": "I usually ride my bike in the park. It's great exercise.",
          "zh": "我通常會在公園騎腳踏車，是很棒的運動。",
          "pauseAfterMs": 950
        },
        {
          "speaker": "Man",
          "gender": "male",
          "voice": "M",
          "text": "I love cycling, too! Do you ride fast?",
          "zh": "我也很愛騎車！你騎得快嗎？",
          "pauseAfterMs": 950
        },
        {
          "speaker": "Woman",
          "gender": "female",
          "voice": "W",
          "text": "Not really. I'm pretty slow, but I have a lot of fun.",
          "zh": "還好，我騎很慢，不過很開心。",
          "pauseAfterMs": 950
        },
        {
          "speaker": "Man",
          "gender": "male",
          "voice": "M",
          "text": "Nice! Do you ever ride with other people?",
          "zh": "不錯耶！你有跟別人一起騎過嗎？",
          "pauseAfterMs": 950
        },
        {
          "speaker": "Woman",
          "gender": "female",
          "voice": "W",
          "text": "No, but I want to try it sometime.",
          "zh": "沒有，不過我想找時間試試看。",
          "pauseAfterMs": 950
        },
        {
          "speaker": "Man",
          "gender": "male",
          "voice": "M",
          "text": "My classmates and I are riding along the river this Sunday.",
          "zh": "我和同學這個星期天要沿著河邊騎車。",
          "pauseAfterMs": 950
        },
        {
          "speaker": "Woman",
          "gender": "female",
          "voice": "W",
          "text": "Great! I'd love to join.",
          "zh": "太好了！我很想一起去。",
          "pauseAfterMs": 1300
        },
        {
          "speaker": "Narrator",
          "gender": "female",
          "voice": "N",
          "text": "Question.",
          "pauseAfterMs": 750
        },
        {
          "speaker": "Narrator",
          "gender": "female",
          "voice": "N",
          "text": "Where will the man and the woman probably go on Sunday?",
          "zh": "這位男生和女生星期天可能會去哪裡？",
          "pauseAfterMs": 0
        }
      ],
      "question": {
        "text": "Where will the man and the woman probably go on Sunday?",
        "zh": "這位男生和女生星期天可能會去哪裡？",
        "spokenBy": "Narrator",
        "printedInTest": false
      },
      "options": [
        {
          "letter": "A",
          "text": "To a park"
        },
        {
          "letter": "B",
          "text": "To the river"
        },
        {
          "letter": "C",
          "text": "To a bike shop"
        }
      ],
      "answer": "B",
      "explanations": {
        "A": {
          "en": "Wrong. The park is where the woman usually rides. It is not the plan for this Sunday.",
          "zh": "錯誤。公園是女生平常騎車的地方，不是這個星期天的計畫。"
        },
        "B": {
          "en": "Correct. The man says he and his classmates are riding along the river this Sunday, and the woman says, \"I'd love to join.\"",
          "zh": "正確。男生說他和同學星期天要沿著河邊騎車，女生說「我很想一起去」，所以他們可能會去河邊。"
        },
        "C": {
          "en": "Wrong. They talk about riding bikes, but nobody talks about going to a shop.",
          "zh": "錯誤。他們聊的是騎腳踏車，但沒有人提到要去腳踏車店。"
        }
      },
      "tip": {
        "en": "You hear two places. Only one is the plan for Sunday, and it comes at the end.",
        "zh": "對話裡有兩個地點，只有一個是星期天的計畫，而且在最後才出現。"
      }
    },
    {
      "number": 8,
      "id": "item08",
      "part": "II",
      "itemType": "Conversation, man speaks first, 7 turns: detail about one speaker (not the other)",
      "audio": {
        "test": "audio/test/item08.mp3",
        "practice": "audio/practice/item08.mp3"
      },
      "video": "videos/item08.mp4",
      "videoStill": "videos/item08.jpg",
      "scene": {
        "en": "A man and a woman talk on the library steps on a sunny day.",
        "zh": "晴朗的日子裡，一男一女在圖書館階梯上聊天。"
      },
      "script": [
        {
          "speaker": "Narrator",
          "gender": "female",
          "voice": "N",
          "text": "Eight.",
          "pauseAfterMs": 1000
        },
        {
          "speaker": "Man",
          "gender": "male",
          "voice": "M",
          "text": "Hi! Did you find a part-time job for the summer?",
          "zh": "嗨！你找到暑假的打工了嗎？",
          "pauseAfterMs": 950
        },
        {
          "speaker": "Woman",
          "gender": "female",
          "voice": "W",
          "text": "Yes! I'm going to work at a coffee shop near school.",
          "zh": "有啊！我要去學校附近的咖啡店打工。",
          "pauseAfterMs": 950
        },
        {
          "speaker": "Man",
          "gender": "male",
          "voice": "M",
          "text": "That's great! Can you make good coffee?",
          "zh": "太棒了！你很會煮咖啡嗎？",
          "pauseAfterMs": 950
        },
        {
          "speaker": "Woman",
          "gender": "female",
          "voice": "W",
          "text": "Not yet. My boss will teach me next week. How about you?",
          "zh": "還不會，老闆下星期會教我。那你呢？",
          "pauseAfterMs": 950
        },
        {
          "speaker": "Man",
          "gender": "male",
          "voice": "M",
          "text": "I can't make coffee at all, but I want a job at the city swimming pool. I'm a strong swimmer.",
          "zh": "我完全不會煮咖啡，不過我想去市立游泳池工作，我很會游泳。",
          "pauseAfterMs": 950
        },
        {
          "speaker": "Woman",
          "gender": "female",
          "voice": "W",
          "text": "Really? Does the pool need more people?",
          "zh": "真的嗎？游泳池還需要人嗎？",
          "pauseAfterMs": 950
        },
        {
          "speaker": "Man",
          "gender": "male",
          "voice": "M",
          "text": "Yes, they want someone to teach kids on weekends. It's a good way to make money and help children.",
          "zh": "有啊，他們想找人在週末教小朋友。這樣可以賺錢，又可以幫助小孩。",
          "pauseAfterMs": 1300
        },
        {
          "speaker": "Narrator",
          "gender": "female",
          "voice": "N",
          "text": "Question.",
          "pauseAfterMs": 750
        },
        {
          "speaker": "Narrator",
          "gender": "female",
          "voice": "N",
          "text": "Where is the woman going to work?",
          "zh": "這位女生要去哪裡工作？",
          "pauseAfterMs": 0
        }
      ],
      "question": {
        "text": "Where is the woman going to work?",
        "zh": "這位女生要去哪裡工作？",
        "spokenBy": "Narrator",
        "printedInTest": false
      },
      "options": [
        {
          "letter": "A",
          "text": "At a swimming pool"
        },
        {
          "letter": "B",
          "text": "At a school"
        },
        {
          "letter": "C",
          "text": "At a coffee shop"
        }
      ],
      "answer": "C",
      "explanations": {
        "A": {
          "en": "Wrong. The swimming pool is where the man wants to work.",
          "zh": "錯誤。想去游泳池工作的是男生，不是女生。"
        },
        "B": {
          "en": "Wrong. The coffee shop is near school, and the man wants to teach kids, but nobody is going to work at a school.",
          "zh": "錯誤。咖啡店在學校「附近」，男生也說想教小朋友，但沒有人要去學校工作。"
        },
        "C": {
          "en": "Correct. The woman says, \"I'm going to work at a coffee shop near school.\"",
          "zh": "正確。女生自己說：「我要去學校附近的咖啡店打工。」"
        }
      },
      "tip": {
        "en": "The question asks about the woman. Keep track of who says what.",
        "zh": "題目問的是女生，要分清楚哪句話是誰說的。"
      }
    },
    {
      "number": 9,
      "id": "item09",
      "part": "II",
      "itemType": "Conversation, woman speaks first, 6 turns: count the days you hear",
      "audio": {
        "test": "audio/test/item09.mp3",
        "practice": "audio/practice/item09.mp3"
      },
      "video": "videos/item09.mp4",
      "videoStill": "videos/item09.jpg",
      "scene": {
        "en": "A woman greets a man in a team jacket outside the gym.",
        "zh": "一位女生在體育館外向穿著隊服外套的男生打招呼。"
      },
      "script": [
        {
          "speaker": "Narrator",
          "gender": "female",
          "voice": "N",
          "text": "Nine.",
          "pauseAfterMs": 1000
        },
        {
          "speaker": "Woman",
          "gender": "female",
          "voice": "W",
          "text": "Hi, Eric. I heard you joined a school team.",
          "zh": "嗨，Eric，聽說你加入校隊了。",
          "pauseAfterMs": 950
        },
        {
          "speaker": "Man",
          "gender": "male",
          "voice": "M",
          "text": "That's right. I play table tennis for the school.",
          "zh": "對啊，我是學校桌球隊的。",
          "pauseAfterMs": 950
        },
        {
          "speaker": "Woman",
          "gender": "female",
          "voice": "W",
          "text": "Nice. Is practice hard?",
          "zh": "不錯喔。練習很辛苦嗎？",
          "pauseAfterMs": 950
        },
        {
          "speaker": "Man",
          "gender": "male",
          "voice": "M",
          "text": "A little. We run first, and then we play practice games.",
          "zh": "有一點。我們會先跑步，然後打練習賽。",
          "pauseAfterMs": 950
        },
        {
          "speaker": "Woman",
          "gender": "female",
          "voice": "W",
          "text": "Wow, you must be tired! Which days does the team practice?",
          "zh": "哇，你一定很累！球隊星期幾練習？",
          "pauseAfterMs": 950
        },
        {
          "speaker": "Man",
          "gender": "male",
          "voice": "M",
          "text": "Tuesday and Thursday evenings, and then again on Saturday mornings at eight.",
          "zh": "星期二和星期四晚上，然後星期六早上八點還要再練一次。",
          "pauseAfterMs": 1300
        },
        {
          "speaker": "Narrator",
          "gender": "female",
          "voice": "N",
          "text": "Question.",
          "pauseAfterMs": 750
        },
        {
          "speaker": "Narrator",
          "gender": "female",
          "voice": "N",
          "text": "How many days a week does the table tennis team practice?",
          "zh": "桌球隊一個星期練習幾天？",
          "pauseAfterMs": 0
        }
      ],
      "question": {
        "text": "How many days a week does the table tennis team practice?",
        "zh": "桌球隊一個星期練習幾天？",
        "spokenBy": "Narrator",
        "printedInTest": false
      },
      "options": [
        {
          "letter": "A",
          "text": "One day"
        },
        {
          "letter": "B",
          "text": "Two days"
        },
        {
          "letter": "C",
          "text": "Three days"
        }
      ],
      "answer": "C",
      "explanations": {
        "A": {
          "en": "Wrong. He names more than one day: Tuesday, Thursday and Saturday.",
          "zh": "錯誤。他說的不只一天：星期二、星期四，還有星期六。"
        },
        "B": {
          "en": "Wrong. Tuesday and Thursday are two days, but he adds \"and then again on Saturday mornings.\"",
          "zh": "錯誤。星期二和星期四是兩天，但他後面又說「星期六早上還要再練一次」。"
        },
        "C": {
          "en": "Correct. Tuesday + Thursday + Saturday = three days.",
          "zh": "正確。星期二、星期四、星期六，加起來是三天。"
        }
      },
      "tip": {
        "en": "The answer is not said directly. Count each day as you hear it, and keep listening to the end.",
        "zh": "答案不會直接說出來，聽到一個日子就數一個，而且要聽到最後。"
      }
    },
    {
      "number": 10,
      "id": "item10",
      "part": "II",
      "itemType": "Conversation, man speaks first, 8 turns: detail that is said directly",
      "audio": {
        "test": "audio/test/item10.mp3",
        "practice": "audio/practice/item10.mp3"
      },
      "video": "videos/item10.mp4",
      "videoStill": "videos/item10.jpg",
      "scene": {
        "en": "A man and a woman walk beside the sports field in the morning.",
        "zh": "早晨，一男一女走在運動場旁。"
      },
      "script": [
        {
          "speaker": "Narrator",
          "gender": "female",
          "voice": "N",
          "text": "Ten.",
          "pauseAfterMs": 1000
        },
        {
          "speaker": "Man",
          "gender": "male",
          "voice": "M",
          "text": "Hey, are you planning to play a team sport this year?",
          "zh": "嘿，你今年打算參加團隊運動嗎？",
          "pauseAfterMs": 950
        },
        {
          "speaker": "Woman",
          "gender": "female",
          "voice": "W",
          "text": "Hi! Maybe. I'm not sure yet. How about you?",
          "zh": "嗨！也許吧，我還不確定。你呢？",
          "pauseAfterMs": 950
        },
        {
          "speaker": "Man",
          "gender": "male",
          "voice": "M",
          "text": "I am! Team sports are really good for you.",
          "zh": "我要啊！團隊運動對你真的很好。",
          "pauseAfterMs": 950
        },
        {
          "speaker": "Woman",
          "gender": "female",
          "voice": "W",
          "text": "Oh, yeah? How?",
          "zh": "是喔？怎麼說？",
          "pauseAfterMs": 950
        },
        {
          "speaker": "Man",
          "gender": "male",
          "voice": "M",
          "text": "First, you sleep better at night after practice.",
          "zh": "第一，練習完之後，晚上會睡得比較好。",
          "pauseAfterMs": 950
        },
        {
          "speaker": "Woman",
          "gender": "female",
          "voice": "W",
          "text": "Sounds good. What else?",
          "zh": "聽起來不錯。還有呢？",
          "pauseAfterMs": 950
        },
        {
          "speaker": "Man",
          "gender": "male",
          "voice": "M",
          "text": "Second, you learn to work with other people.",
          "zh": "第二，你會學到怎麼和別人合作。",
          "pauseAfterMs": 950
        },
        {
          "speaker": "Woman",
          "gender": "female",
          "voice": "W",
          "text": "OK. Maybe I should give it a try.",
          "zh": "好，也許我該試試看。",
          "pauseAfterMs": 1300
        },
        {
          "speaker": "Narrator",
          "gender": "female",
          "voice": "N",
          "text": "Question.",
          "pauseAfterMs": 750
        },
        {
          "speaker": "Narrator",
          "gender": "female",
          "voice": "N",
          "text": "What is good about team sports?",
          "zh": "團隊運動有什麼好處？",
          "pauseAfterMs": 0
        }
      ],
      "question": {
        "text": "What is good about team sports?",
        "zh": "團隊運動有什麼好處？",
        "spokenBy": "Narrator",
        "printedInTest": false
      },
      "options": [
        {
          "letter": "A",
          "text": "Sleeping better"
        },
        {
          "letter": "B",
          "text": "Saving money"
        },
        {
          "letter": "C",
          "text": "Getting better grades"
        }
      ],
      "answer": "A",
      "explanations": {
        "A": {
          "en": "Correct. The man says, \"You sleep better at night after practice.\"",
          "zh": "正確。男生說：「練習完之後，晚上會睡得比較好。」"
        },
        "B": {
          "en": "Wrong. The man never talks about money.",
          "zh": "錯誤。男生沒有提到錢。"
        },
        "C": {
          "en": "Wrong. The man never talks about grades. He talks about sleep and about working with other people.",
          "zh": "錯誤。男生沒有提到成績，他說的是睡得好和學會與別人合作。"
        }
      },
      "tip": {
        "en": "Choose what the speaker really said, not what you think is true.",
        "zh": "要選說話者真的說過的內容，不是選你自己覺得對的。"
      }
    },
    {
      "number": 11,
      "id": "item11",
      "part": "III",
      "itemType": "Short talk, question first, picture options: work out what is described (it is never named)",
      "audio": {
        "test": "audio/test/item11.mp3",
        "practice": "audio/practice/item11.mp3"
      },
      "video": "videos/item11.mp4",
      "videoStill": "videos/item11.jpg",
      "scene": {
        "en": "A team captain welcomes a group of new students outdoors.",
        "zh": "隊長在戶外歡迎一群新同學。"
      },
      "script": [
        {
          "speaker": "Narrator",
          "gender": "female",
          "voice": "N",
          "text": "Eleven.",
          "pauseAfterMs": 800
        },
        {
          "speaker": "Narrator",
          "gender": "female",
          "voice": "N",
          "text": "Question.",
          "pauseAfterMs": 800
        },
        {
          "speaker": "Narrator",
          "gender": "female",
          "voice": "N",
          "text": "Which sport is the speaker talking about?",
          "zh": "說話的人在談哪一種運動？",
          "pauseAfterMs": 900
        },
        {
          "speaker": "Woman",
          "gender": "female",
          "voice": "W",
          "text": "Hi, everyone! Thanks for coming to our first practice.",
          "zh": "大家好！謝謝你們來參加第一次練習。",
          "pauseAfterMs": 800
        },
        {
          "speaker": "Woman",
          "gender": "female",
          "voice": "W",
          "text": "We are a friendly team, and we always practice outside on the grass.",
          "zh": "我們是很友善的球隊，都在戶外的草地上練習。",
          "pauseAfterMs": 800
        },
        {
          "speaker": "Woman",
          "gender": "female",
          "voice": "W",
          "text": "In our sport, we run a lot, so you need strong legs.",
          "zh": "我們這項運動要常常跑，所以腿要很有力。",
          "pauseAfterMs": 800
        },
        {
          "speaker": "Woman",
          "gender": "female",
          "voice": "W",
          "text": "In practice, we pass the ball and kick it into the goal.",
          "zh": "練習的時候，我們會傳球，還有把球踢進球門。",
          "pauseAfterMs": 800
        },
        {
          "speaker": "Woman",
          "gender": "female",
          "voice": "W",
          "text": "Remember, most players can't touch the ball with their hands.",
          "zh": "記住，大部分的球員都不能用手碰球。",
          "pauseAfterMs": 800
        },
        {
          "speaker": "Woman",
          "gender": "female",
          "voice": "W",
          "text": "Any student who likes fresh air and teamwork can join.",
          "zh": "只要喜歡新鮮空氣和團隊合作的同學都可以加入。",
          "pauseAfterMs": 800
        },
        {
          "speaker": "Woman",
          "gender": "female",
          "voice": "W",
          "text": "Stay with us, and you will be a good player very soon!",
          "zh": "跟著我們練，你很快就會變成好球員！",
          "pauseAfterMs": 0
        }
      ],
      "question": {
        "text": "Which sport is the speaker talking about?",
        "zh": "說話的人在談哪一種運動？",
        "spokenBy": "Narrator",
        "printedInTest": false
      },
      "options": [
        {
          "letter": "A",
          "image": "images/item11_a.svg",
          "alt": {
            "en": "Runners on a track",
            "zh": "跑道上的跑者"
          }
        },
        {
          "letter": "B",
          "image": "images/item11_b.svg",
          "alt": {
            "en": "A player kicking a ball toward a goal",
            "zh": "把球踢向球門的球員"
          }
        },
        {
          "letter": "C",
          "image": "images/item11_c.svg",
          "alt": {
            "en": "A player shooting a ball at a hoop",
            "zh": "把球投向籃框的球員"
          }
        }
      ],
      "answer": "B",
      "explanations": {
        "A": {
          "en": "Wrong. They run a lot, but they also pass and kick a ball. Runners on a track do not use a ball.",
          "zh": "錯誤。雖然要常常跑，但他們還要傳球、踢球；跑步比賽不會用到球。"
        },
        "B": {
          "en": "Correct. They kick the ball into the goal, and most players can't use their hands. That is soccer.",
          "zh": "正確。把球踢進球門、大部分球員不能用手碰球，這就是足球。"
        },
        "C": {
          "en": "Wrong. Basketball players pass the ball, but they use their hands and they do not kick it.",
          "zh": "錯誤。籃球也會傳球，但是用手打，而且不會用腳踢。"
        }
      },
      "tip": {
        "en": "The sport is never named. Put the clues together: grass, kick, goal, no hands.",
        "zh": "談話中不會直接說出運動名稱，要把線索合起來：草地、踢、球門、不能用手。"
      }
    },
    {
      "number": 12,
      "id": "item12",
      "part": "III",
      "itemType": "Phone message, question first, picture options: catch one detail (the place)",
      "audio": {
        "test": "audio/test/item12.mp3",
        "practice": "audio/practice/item12.mp3"
      },
      "video": "videos/item12.mp4",
      "videoStill": "videos/item12.jpg",
      "scene": {
        "en": "A student leaves a voice message on his phone in the dorm hallway.",
        "zh": "一位同學在宿舍走廊用手機留語音訊息。"
      },
      "script": [
        {
          "speaker": "Narrator",
          "gender": "female",
          "voice": "N",
          "text": "Twelve.",
          "pauseAfterMs": 800
        },
        {
          "speaker": "Narrator",
          "gender": "female",
          "voice": "N",
          "text": "Question.",
          "pauseAfterMs": 800
        },
        {
          "speaker": "Narrator",
          "gender": "female",
          "voice": "N",
          "text": "Where is Jack's class going on Saturday?",
          "zh": "Jack 的班級星期六要去哪裡？",
          "pauseAfterMs": 900
        },
        {
          "speaker": "Man",
          "gender": "male",
          "voice": "M",
          "text": "Hi Tina, this is Jack, your class leader.",
          "zh": "嗨 Tina，我是班代 Jack。",
          "pauseAfterMs": 800
        },
        {
          "speaker": "Man",
          "gender": "male",
          "voice": "M",
          "text": "I'm calling about our class picnic at the beach this Saturday.",
          "zh": "我打來是要跟你說，這個星期六我們班要去海邊野餐。",
          "pauseAfterMs": 800
        },
        {
          "speaker": "Man",
          "gender": "male",
          "voice": "M",
          "text": "We're going to eat lunch together and play some games.",
          "zh": "我們會一起吃午餐、玩一些遊戲。",
          "pauseAfterMs": 800
        },
        {
          "speaker": "Man",
          "gender": "male",
          "voice": "M",
          "text": "Many of our classmates are coming, and you can invite a friend, too.",
          "zh": "很多同學都會來，你也可以邀請一位朋友。",
          "pauseAfterMs": 800
        },
        {
          "speaker": "Man",
          "gender": "male",
          "voice": "M",
          "text": "Could you help us buy the drinks?",
          "zh": "你可以幫我們買飲料嗎？",
          "pauseAfterMs": 800
        },
        {
          "speaker": "Man",
          "gender": "male",
          "voice": "M",
          "text": "Please call me back tonight, and we can decide what to buy.",
          "zh": "今晚請回電給我，我們再決定要買什麼。",
          "pauseAfterMs": 800
        },
        {
          "speaker": "Man",
          "gender": "male",
          "voice": "M",
          "text": "I hope you can come. Talk to you later. Bye!",
          "zh": "希望你能來。晚點聊，掰！",
          "pauseAfterMs": 0
        }
      ],
      "question": {
        "text": "Where is Jack's class going on Saturday?",
        "zh": "Jack 的班級星期六要去哪裡？",
        "spokenBy": "Narrator",
        "printedInTest": false
      },
      "options": [
        {
          "letter": "A",
          "image": "images/item12_a.svg",
          "alt": {
            "en": "A beach",
            "zh": "海邊沙灘"
          }
        },
        {
          "letter": "B",
          "image": "images/item12_b.svg",
          "alt": {
            "en": "A city park",
            "zh": "市區公園"
          }
        },
        {
          "letter": "C",
          "image": "images/item12_c.svg",
          "alt": {
            "en": "A sports field",
            "zh": "運動場"
          }
        }
      ],
      "answer": "A",
      "explanations": {
        "A": {
          "en": "Correct. Jack says the class picnic is \"at the beach this Saturday.\"",
          "zh": "正確。Jack 說班上的野餐是「這個星期六在海邊」。"
        },
        "B": {
          "en": "Wrong. A park is a common place for a picnic, but Jack never says \"park\".",
          "zh": "錯誤。公園雖然常用來野餐，但 Jack 完全沒有說到 park。"
        },
        "C": {
          "en": "Wrong. They will play some games, but Jack never talks about a sports field.",
          "zh": "錯誤。雖然他們會玩遊戲，但 Jack 沒有提到運動場。"
        }
      },
      "tip": {
        "en": "The question comes first, so you know what to listen for: a place. It is said only once.",
        "zh": "題目先唸，所以可以先知道要聽「地點」；地點只會說一次，要專心聽。"
      }
    }
  ]
};
