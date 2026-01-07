// 기초 일본어 문법
export const grammar = [
  {
    id: 1,
    title: '~です (desu)',
    subtitle: '~입니다',
    explanation: '명사 뒤에 붙여서 "~입니다"라는 정중한 표현을 만듭니다.',
    examples: [
      { japanese: '私は学生です', romaji: 'watashi wa gakusei desu', korean: '저는 학생입니다' },
      { japanese: 'これは本です', romaji: 'kore wa hon desu', korean: '이것은 책입니다' },
      { japanese: '今日は月曜日です', romaji: 'kyou wa getsuyoubi desu', korean: '오늘은 월요일입니다' },
    ],
    tip: 'です를 생략하면 반말이 됩니다!',
  },
  {
    id: 2,
    title: '~ます (masu)',
    subtitle: '~합니다',
    explanation: '동사의 정중형입니다. 동사 어간에 붙여 사용합니다.',
    examples: [
      { japanese: '食べます', romaji: 'tabemasu', korean: '먹습니다' },
      { japanese: '飲みます', romaji: 'nomimasu', korean: '마십니다' },
      { japanese: '行きます', romaji: 'ikimasu', korean: '갑니다' },
      { japanese: '見ます', romaji: 'mimasu', korean: '봅니다' },
    ],
    tip: '부정형은 ~ません (masen)입니다',
  },
  {
    id: 3,
    title: '~は (wa)',
    subtitle: '~은/는 (주제)',
    explanation: '문장의 주제를 나타내는 조사입니다. "~에 관해서 말하면"의 의미입니다.',
    examples: [
      { japanese: '私は韓国人です', romaji: 'watashi wa kankokujin desu', korean: '저는 한국인입니다' },
      { japanese: '東京は大きいです', romaji: 'toukyou wa ookii desu', korean: '도쿄는 큽니다' },
    ],
    tip: '는 "ha"로 읽지만 조사로 쓰일 때는 "wa"로 읽습니다',
  },
  {
    id: 4,
    title: '~が (ga)',
    subtitle: '~이/가 (주어)',
    explanation: '주어를 나타내는 조사입니다. 새로운 정보나 강조할 때 사용합니다.',
    examples: [
      { japanese: '猫がいます', romaji: 'neko ga imasu', korean: '고양이가 있습니다' },
      { japanese: '誰が来ましたか', romaji: 'dare ga kimashita ka', korean: '누가 왔습니까?' },
    ],
    tip: 'は는 구정보, が는 신정보를 나타냅니다',
  },
  {
    id: 5,
    title: '~を (wo/o)',
    subtitle: '~을/를 (목적어)',
    explanation: '목적어를 나타내는 조사입니다.',
    examples: [
      { japanese: 'ご飯を食べます', romaji: 'gohan wo tabemasu', korean: '밥을 먹습니다' },
      { japanese: '水を飲みます', romaji: 'mizu wo nomimasu', korean: '물을 마십니다' },
      { japanese: '本を読みます', romaji: 'hon wo yomimasu', korean: '책을 읽습니다' },
    ],
    tip: 'を는 "wo"로 쓰지만 "o"로 발음합니다',
  },
  {
    id: 6,
    title: '~に (ni)',
    subtitle: '~에 (장소/시간)',
    explanation: '장소, 시간, 방향 등을 나타내는 조사입니다.',
    examples: [
      { japanese: '学校に行きます', romaji: 'gakkou ni ikimasu', korean: '학교에 갑니다' },
      { japanese: '七時に起きます', romaji: 'shichiji ni okimasu', korean: '7시에 일어납니다' },
      { japanese: '友達に会います', romaji: 'tomodachi ni aimasu', korean: '친구를 만납니다' },
    ],
    tip: '목적지에는 に, 통과하는 장소에는 で를 씁니다',
  },
  {
    id: 7,
    title: '~で (de)',
    subtitle: '~에서/~로 (수단)',
    explanation: '장소(동작), 수단, 방법을 나타내는 조사입니다.',
    examples: [
      { japanese: '電車で行きます', romaji: 'densha de ikimasu', korean: '전철로 갑니다' },
      { japanese: 'レストランで食べます', romaji: 'resutoran de tabemasu', korean: '레스토랑에서 먹습니다' },
      { japanese: '日本語で話します', romaji: 'nihongo de hanashimasu', korean: '일본어로 말합니다' },
    ],
    tip: 'に는 존재, で는 동작이 일어나는 장소',
  },
  {
    id: 8,
    title: '~か (ka)',
    subtitle: '~입니까? (의문)',
    explanation: '문장 끝에 붙여 의문문을 만듭니다.',
    examples: [
      { japanese: 'これは何ですか', romaji: 'kore wa nan desu ka', korean: '이것은 무엇입니까?' },
      { japanese: '日本人ですか', romaji: 'nihonjin desu ka', korean: '일본인입니까?' },
      { japanese: '行きますか', romaji: 'ikimasu ka', korean: '갑니까?' },
    ],
    tip: '일본어는 문장 끝에 か만 붙이면 의문문!',
  },
  {
    id: 9,
    title: '~と (to)',
    subtitle: '~와/과 (함께)',
    explanation: '함께하는 대상이나 인용을 나타내는 조사입니다.',
    examples: [
      { japanese: '友達と行きます', romaji: 'tomodachi to ikimasu', korean: '친구와 갑니다' },
      { japanese: 'コーヒーとケーキ', romaji: 'koohii to keeki', korean: '커피와 케이크' },
    ],
    tip: '나열할 때는 と, や, も를 사용합니다',
  },
  {
    id: 10,
    title: '~から/~まで',
    subtitle: '~부터/~까지',
    explanation: '시작점과 끝점을 나타냅니다.',
    examples: [
      { japanese: '九時から五時まで', romaji: 'kuji kara goji made', korean: '9시부터 5시까지' },
      { japanese: '東京から大阪まで', romaji: 'toukyou kara oosaka made', korean: '도쿄에서 오사카까지' },
    ],
    tip: 'から는 이유를 나타낼 때도 사용합니다 (~이니까)',
  },
];

// 문법 카테고리
export const grammarCategories = [
  { id: 'basic', name: '기본 조사', icon: '📝', items: [3, 4, 5, 6, 7] },
  { id: 'verb', name: '동사 활용', icon: '🔄', items: [1, 2] },
  { id: 'question', name: '의문문', icon: '❓', items: [8] },
  { id: 'connection', name: '연결', icon: '🔗', items: [9, 10] },
];




