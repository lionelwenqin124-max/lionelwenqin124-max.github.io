# Listening Practice Game 英語聽力練習遊戲

A self-contained static web app: plain HTML, CSS and JavaScript in one folder. No server code, no build step, no login, no cookies, no storage, no analytics. Nothing is loaded from outside this folder.

- **Practice mode 練習模式:** the 12 questions in test order, each with a scene video (or a placeholder until you add one), replay, instant feedback, sound effects and a bilingual explanation.
- **Test mode 測驗模式:** no videos. Part directions are announced, every recording plays once, the answer time is counted down, and the score report with a review comes at the end.

## How to run or host it

- **On a computer:** double-click `index.html`. It runs from `file://` in Chrome and Safari.
- **On any static host:** upload the whole folder as it is and open `index.html`. All paths are relative, so it works in a sub-folder too.
- **Inside a React app:** copy the folder into `public/`, for example `public/listening-game/`, and link to `/listening-game/index.html`.
- **On phones:** students open the link and tap a mode. Sound starts from that tap, which is what iPhone Safari and Android Chrome require. If a student leaves the page during the test, the test pauses and waits for a tap on Continue.

## What is in the folder

| Path | What it is |
| --- | --- |
| `index.html`, `style.css`, `game.js` | The game. `game.js` holds no question content. |
| `items.json` | The manifest: parts, 12 items, scripts with speaker and gender, questions, options, answers, explanations, file names, timings. |
| `items.js` | The same data as `items.json`, wrapped as `window.LISTENING_GAME_DATA = {...};`. The game reads this file, because browsers do not let a page opened from `file://` fetch a JSON file. |
| `audio/test/` | `part1_intro.mp3`, `part2_intro.mp3`, `part3_intro.mp3`, `item01.mp3` to `item12.mp3` |
| `audio/practice/` | `item01.mp3` to `item12.mp3` |
| `videos/` | Empty for now. Put `item01.mp4` to `item12.mp4` here. |
| `images/` | The six pictures for questions 11 and 12 (drawn for this game). |
| `sfx/` | `correct.mp3`, `wrong.mp3` |

If you edit `items.json`, paste its full contents into `items.js` after `window.LISTENING_GAME_DATA = ` so the two stay the same.

## Swapping the audio 1:1

1. Record each file with exactly the script listed under "Narration scripts" below.
2. Save it as MP3 with the **same file name** in the same folder. Mono or stereo and any bitrate are fine.
3. That is all. The game does not store audio lengths. It waits for each file to end, so a longer or shorter recording works without any other change.

Rules that keep the timing right:

- **Record speech only. Do not add silence for the answer time.** The game counts the answer time itself after the file ends: 12.2 s in Parts I and II, 8.1 s in Part III. To change it, edit `timing.answerWindowMs` in `items.json` and `items.js`.
- Keep the short pauses inside a file natural: about 0.7 s after the item number, about 1 s between speakers, about 0.8 s between sentences in the talks. The scripts below show where they go.
- Leave no more than about 0.3 s of silence at the start and end of a file.
- The game also waits 1.1 s between a part announcement and the first question of that part (`timing.gapAfterPartIntroMs`).
- `audio/practice/itemNN.mp3` uses the same script as `audio/test/itemNN.mp3`. You can record once and copy the file into both folders, or record a slower version for practice.

The audio in this folder is a placeholder made with Kokoro-82M, an open text-to-speech model (Apache-2.0) run locally: narrator `af_bella`, woman `af_heart`, man `am_michael`.

## Adding the videos 1:1

Drop the files into `videos/` with these names. Nothing else needs to change.

`item01.mp4` `item02.mp4` `item03.mp4` `item04.mp4` `item05.mp4` `item06.mp4` `item07.mp4` `item08.mp4` `item09.mp4` `item10.mp4` `item11.mp4` `item12.mp4`

| Spec | Value |
| --- | --- |
| Container and codec | MP4, H.264 video (yuv420p). This plays on iPhone, Android and desktop. |
| Shape and size | 16:9, 1280x720 is enough (1920x1080 also works) |
| Length | 5 to 8 seconds |
| Sound | Not needed. The game always plays videos muted, so a sound track is ignored. |
| File size | Aim for under 3 MB each, exported with "fast start" / "web optimized" if the tool offers it |
| On-screen text | None, and nothing that gives the answer away. See `video_prompts.md`. |

How the game uses them, in practice mode only:

- When a question opens, its video plays once, inline and muted, and then holds its last frame. The narration starts about 1.2 s after the video starts.
- Replay restarts the video and the narration together.
- Videos never open full screen on iPhone and have no controls.
- If a video file is missing or cannot be played, the game shows a placeholder card with a one-line scene description. The game never stops because of a missing video.
- Optional: `videos/item01.jpg` to `videos/item12.jpg` (16:9). If a still is there, it is shown instead of the placeholder card whenever the video is missing or still loading.

Test mode never loads a video.

## Sound effects

`sfx/correct.mp3` and `sfx/wrong.mp3` play when an answer is marked in practice mode and when an item is opened in the review after the test. Replace them with files of the same names to change them.

## Narration scripts

Each list is the complete content of one file, in order. _(pause)_ marks a short silence inside the file.


### Part announcements (test mode)

**`audio/test/part1_intro.mp3`** (placeholder length 9 s)

- **Narrator (female):** Part one.  _(pause 0.3 s)_
- **Narrator (female):** Question and Response.  _(pause 0.8 s)_
- **Narrator (female):** For each item, you will hear a question or a short sentence. Choose the best reply.

**`audio/test/part2_intro.mp3`** (placeholder length 9 s)

- **Narrator (female):** Part two.  _(pause 0.3 s)_
- **Narrator (female):** Short Conversations.  _(pause 0.8 s)_
- **Narrator (female):** You will hear a short conversation and then a question about it. Choose the right answer.

**`audio/test/part3_intro.mp3`** (placeholder length 9 s)

- **Narrator (female):** Part three.  _(pause 0.3 s)_
- **Narrator (female):** Short Talks.  _(pause 0.8 s)_
- **Narrator (female):** You will hear a question and then a short talk. Choose the picture that answers the question.


### Part I: Question and Response

**`audio/test/item01.mp3`** and **`audio/practice/item01.mp3`** (placeholder length 4 s)

- **Narrator (female):** One.  _(pause 0.8 s)_
- **Woman (female):** You're on the badminton team, right?

**`audio/test/item02.mp3`** and **`audio/practice/item02.mp3`** (placeholder length 4 s)

- **Narrator (female):** Two.  _(pause 0.8 s)_
- **Man (male):** Does the school store sell sports drinks?

**`audio/test/item03.mp3`** and **`audio/practice/item03.mp3`** (placeholder length 4 s)

- **Narrator (female):** Three.  _(pause 0.8 s)_
- **Woman (female):** What do you usually do after class?

**`audio/test/item04.mp3`** and **`audio/practice/item04.mp3`** (placeholder length 4 s)

- **Narrator (female):** Four.  _(pause 0.8 s)_
- **Man (male):** Have you signed up for Sports Day?

**`audio/test/item05.mp3`** and **`audio/practice/item05.mp3`** (placeholder length 4 s)

- **Narrator (female):** Five.  _(pause 0.8 s)_
- **Woman (female):** What P.E. class are you going to take?

**`audio/test/item06.mp3`** and **`audio/practice/item06.mp3`** (placeholder length 5 s)

- **Narrator (female):** Six.  _(pause 0.8 s)_
- **Man (male):** Ryan always has a basketball under his arm.


### Part II: Short Conversations

**`audio/test/item07.mp3`** and **`audio/practice/item07.mp3`** (placeholder length 36 s)

- **Narrator (female):** Seven.  _(pause 1.0 s)_
- **Man (male):** How do you spend your weekends?  _(pause 0.9 s)_
- **Woman (female):** I usually ride my bike in the park. It's great exercise.  _(pause 0.9 s)_
- **Man (male):** I love cycling, too! Do you ride fast?  _(pause 0.9 s)_
- **Woman (female):** Not really. I'm pretty slow, but I have a lot of fun.  _(pause 0.9 s)_
- **Man (male):** Nice! Do you ever ride with other people?  _(pause 0.9 s)_
- **Woman (female):** No, but I want to try it sometime.  _(pause 0.9 s)_
- **Man (male):** My classmates and I are riding along the river this Sunday.  _(pause 0.9 s)_
- **Woman (female):** Great! I'd love to join.  _(pause 1.3 s)_
- **Narrator (female):** Question.  _(pause 0.8 s)_
- **Narrator (female):** Where will the man and the woman probably go on Sunday?

**`audio/test/item08.mp3`** and **`audio/practice/item08.mp3`** (placeholder length 38 s)

- **Narrator (female):** Eight.  _(pause 1.0 s)_
- **Man (male):** Hi! Did you find a part-time job for the summer?  _(pause 0.9 s)_
- **Woman (female):** Yes! I'm going to work at a coffee shop near school.  _(pause 0.9 s)_
- **Man (male):** That's great! Can you make good coffee?  _(pause 0.9 s)_
- **Woman (female):** Not yet. My boss will teach me next week. How about you?  _(pause 0.9 s)_
- **Man (male):** I can't make coffee at all, but I want a job at the city swimming pool. I'm a strong swimmer.  _(pause 0.9 s)_
- **Woman (female):** Really? Does the pool need more people?  _(pause 0.9 s)_
- **Man (male):** Yes, they want someone to teach kids on weekends. It's a good way to make money and help children.  _(pause 1.3 s)_
- **Narrator (female):** Question.  _(pause 0.8 s)_
- **Narrator (female):** Where is the woman going to work?

**`audio/test/item09.mp3`** and **`audio/practice/item09.mp3`** (placeholder length 32 s)

- **Narrator (female):** Nine.  _(pause 1.0 s)_
- **Woman (female):** Hi, Eric. I heard you joined a school team.  _(pause 0.9 s)_
- **Man (male):** That's right. I play table tennis for the school.  _(pause 0.9 s)_
- **Woman (female):** Nice. Is practice hard?  _(pause 0.9 s)_
- **Man (male):** A little. We run first, and then we play practice games.  _(pause 0.9 s)_
- **Woman (female):** Wow, you must be tired! Which days does the team practice?  _(pause 0.9 s)_
- **Man (male):** Tuesday and Thursday evenings, and then again on Saturday mornings at eight.  _(pause 1.3 s)_
- **Narrator (female):** Question.  _(pause 0.8 s)_
- **Narrator (female):** How many days a week does the table tennis team practice?

**`audio/test/item10.mp3`** and **`audio/practice/item10.mp3`** (placeholder length 32 s)

- **Narrator (female):** Ten.  _(pause 1.0 s)_
- **Man (male):** Hey, are you planning to play a team sport this year?  _(pause 0.9 s)_
- **Woman (female):** Hi! Maybe. I'm not sure yet. How about you?  _(pause 0.9 s)_
- **Man (male):** I am! Team sports are really good for you.  _(pause 0.9 s)_
- **Woman (female):** Oh, yeah? How?  _(pause 0.9 s)_
- **Man (male):** First, you sleep better at night after practice.  _(pause 0.9 s)_
- **Woman (female):** Sounds good. What else?  _(pause 0.9 s)_
- **Man (male):** Second, you learn to work with other people.  _(pause 0.9 s)_
- **Woman (female):** OK. Maybe I should give it a try.  _(pause 1.3 s)_
- **Narrator (female):** Question.  _(pause 0.8 s)_
- **Narrator (female):** What is good about team sports?


### Part III: Short Talks

**`audio/test/item11.mp3`** and **`audio/practice/item11.mp3`** (placeholder length 34 s)

- **Narrator (female):** Eleven.  _(pause 0.8 s)_
- **Narrator (female):** Question.  _(pause 0.8 s)_
- **Narrator (female):** Which sport is the speaker talking about?  _(pause 0.9 s)_
- **Woman (female):** Hi, everyone! Thanks for coming to our first practice.  _(pause 0.8 s)_
- **Woman (female):** We are a friendly team, and we always practice outside on the grass.  _(pause 0.8 s)_
- **Woman (female):** In our sport, we run a lot, so you need strong legs.  _(pause 0.8 s)_
- **Woman (female):** In practice, we pass the ball and kick it into the goal.  _(pause 0.8 s)_
- **Woman (female):** Remember, most players can't touch the ball with their hands.  _(pause 0.8 s)_
- **Woman (female):** Any student who likes fresh air and teamwork can join.  _(pause 0.8 s)_
- **Woman (female):** Stay with us, and you will be a good player very soon!

**`audio/test/item12.mp3`** and **`audio/practice/item12.mp3`** (placeholder length 33 s)

- **Narrator (female):** Twelve.  _(pause 0.8 s)_
- **Narrator (female):** Question.  _(pause 0.8 s)_
- **Narrator (female):** Where is Jack's class going on Saturday?  _(pause 0.9 s)_
- **Man (male):** Hi Tina, this is Jack, your class leader.  _(pause 0.8 s)_
- **Man (male):** I'm calling about our class picnic at the beach this Saturday.  _(pause 0.8 s)_
- **Man (male):** We're going to eat lunch together and play some games.  _(pause 0.8 s)_
- **Man (male):** Many of our classmates are coming, and you can invite a friend, too.  _(pause 0.8 s)_
- **Man (male):** Could you help us buy the drinks?  _(pause 0.8 s)_
- **Man (male):** Please call me back tonight, and we can decide what to buy.  _(pause 0.8 s)_
- **Man (male):** I hope you can come. Talk to you later. Bye!
