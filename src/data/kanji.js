// JLPT N5 필수 한자 (80자)
export const kanjiData = [
  // 숫자
  { kanji: '一', onyomi: 'イチ', kunyomi: 'ひと(つ)', meaning: '하나, 1', examples: ['一人 (ひとり) - 한 사람', '一つ (ひとつ) - 하나'], level: 1 },
  { kanji: '二', onyomi: 'ニ', kunyomi: 'ふた(つ)', meaning: '둘, 2', examples: ['二人 (ふたり) - 두 사람', '二月 (にがつ) - 2월'], level: 1 },
  { kanji: '三', onyomi: 'サン', kunyomi: 'み(つ)', meaning: '셋, 3', examples: ['三人 (さんにん) - 세 사람', '三月 (さんがつ) - 3월'], level: 1 },
  { kanji: '四', onyomi: 'シ', kunyomi: 'よ(つ)', meaning: '넷, 4', examples: ['四人 (よにん) - 네 사람', '四月 (しがつ) - 4월'], level: 1 },
  { kanji: '五', onyomi: 'ゴ', kunyomi: 'いつ(つ)', meaning: '다섯, 5', examples: ['五人 (ごにん) - 다섯 사람', '五月 (ごがつ) - 5월'], level: 1 },
  { kanji: '六', onyomi: 'ロク', kunyomi: 'む(つ)', meaning: '여섯, 6', examples: ['六人 (ろくにん) - 여섯 사람', '六月 (ろくがつ) - 6월'], level: 1 },
  { kanji: '七', onyomi: 'シチ', kunyomi: 'なな(つ)', meaning: '일곱, 7', examples: ['七人 (しちにん) - 일곱 사람', '七月 (しちがつ) - 7월'], level: 1 },
  { kanji: '八', onyomi: 'ハチ', kunyomi: 'や(つ)', meaning: '여덟, 8', examples: ['八人 (はちにん) - 여덟 사람', '八月 (はちがつ) - 8월'], level: 1 },
  { kanji: '九', onyomi: 'キュウ', kunyomi: 'ここの(つ)', meaning: '아홉, 9', examples: ['九人 (きゅうにん) - 아홉 사람', '九月 (くがつ) - 9월'], level: 1 },
  { kanji: '十', onyomi: 'ジュウ', kunyomi: 'とお', meaning: '열, 10', examples: ['十人 (じゅうにん) - 열 사람', '十月 (じゅうがつ) - 10월'], level: 1 },
  { kanji: '百', onyomi: 'ヒャク', kunyomi: '', meaning: '백, 100', examples: ['百円 (ひゃくえん) - 100엔', '三百 (さんびゃく) - 300'], level: 1 },
  { kanji: '千', onyomi: 'セン', kunyomi: 'ち', meaning: '천, 1000', examples: ['千円 (せんえん) - 1000엔', '三千 (さんぜん) - 3000'], level: 1 },
  { kanji: '万', onyomi: 'マン', kunyomi: '', meaning: '만, 10000', examples: ['一万 (いちまん) - 10000', '万円 (まんえん) - 만엔'], level: 1 },

  // 시간/날짜
  { kanji: '日', onyomi: 'ニチ, ジツ', kunyomi: 'ひ, か', meaning: '날, 해', examples: ['日曜日 (にちようび) - 일요일', '今日 (きょう) - 오늘'], level: 1 },
  { kanji: '月', onyomi: 'ゲツ, ガツ', kunyomi: 'つき', meaning: '달, 월', examples: ['月曜日 (げつようび) - 월요일', '今月 (こんげつ) - 이번 달'], level: 1 },
  { kanji: '火', onyomi: 'カ', kunyomi: 'ひ', meaning: '불, 화요일', examples: ['火曜日 (かようび) - 화요일', '火事 (かじ) - 화재'], level: 1 },
  { kanji: '水', onyomi: 'スイ', kunyomi: 'みず', meaning: '물, 수요일', examples: ['水曜日 (すいようび) - 수요일', '水 (みず) - 물'], level: 1 },
  { kanji: '木', onyomi: 'モク, ボク', kunyomi: 'き', meaning: '나무, 목요일', examples: ['木曜日 (もくようび) - 목요일', '木 (き) - 나무'], level: 1 },
  { kanji: '金', onyomi: 'キン, コン', kunyomi: 'かね', meaning: '금, 돈, 금요일', examples: ['金曜日 (きんようび) - 금요일', 'お金 (おかね) - 돈'], level: 1 },
  { kanji: '土', onyomi: 'ド, ト', kunyomi: 'つち', meaning: '흙, 토요일', examples: ['土曜日 (どようび) - 토요일', '土地 (とち) - 토지'], level: 1 },
  { kanji: '年', onyomi: 'ネン', kunyomi: 'とし', meaning: '해, 년', examples: ['今年 (ことし) - 올해', '去年 (きょねん) - 작년'], level: 1 },
  { kanji: '時', onyomi: 'ジ', kunyomi: 'とき', meaning: '때, 시간', examples: ['時間 (じかん) - 시간', '何時 (なんじ) - 몇 시'], level: 1 },
  { kanji: '分', onyomi: 'フン, ブン', kunyomi: 'わ(かる)', meaning: '분, 나누다', examples: ['十分 (じゅっぷん) - 10분', '分かる (わかる) - 알다'], level: 1 },
  { kanji: '半', onyomi: 'ハン', kunyomi: 'なか(ば)', meaning: '반, 절반', examples: ['半分 (はんぶん) - 절반', '三時半 (さんじはん) - 3시 반'], level: 1 },
  { kanji: '週', onyomi: 'シュウ', kunyomi: '', meaning: '주', examples: ['今週 (こんしゅう) - 이번 주', '毎週 (まいしゅう) - 매주'], level: 2 },

  // 사람/가족
  { kanji: '人', onyomi: 'ジン, ニン', kunyomi: 'ひと', meaning: '사람', examples: ['日本人 (にほんじん) - 일본인', '人 (ひと) - 사람'], level: 1 },
  { kanji: '子', onyomi: 'シ, ス', kunyomi: 'こ', meaning: '아이', examples: ['子供 (こども) - 아이', '女子 (じょし) - 여자'], level: 1 },
  { kanji: '女', onyomi: 'ジョ, ニョ', kunyomi: 'おんな', meaning: '여자', examples: ['女の人 (おんなのひと) - 여자', '女性 (じょせい) - 여성'], level: 1 },
  { kanji: '男', onyomi: 'ダン, ナン', kunyomi: 'おとこ', meaning: '남자', examples: ['男の人 (おとこのひと) - 남자', '男性 (だんせい) - 남성'], level: 1 },
  { kanji: '父', onyomi: 'フ', kunyomi: 'ちち', meaning: '아버지', examples: ['お父さん (おとうさん) - 아버지', '父 (ちち) - 아버지(겸양)'], level: 1 },
  { kanji: '母', onyomi: 'ボ', kunyomi: 'はは', meaning: '어머니', examples: ['お母さん (おかあさん) - 어머니', '母 (はは) - 어머니(겸양)'], level: 1 },
  { kanji: '友', onyomi: 'ユウ', kunyomi: 'とも', meaning: '친구', examples: ['友達 (ともだち) - 친구', '友人 (ゆうじん) - 친구'], level: 1 },
  { kanji: '先', onyomi: 'セン', kunyomi: 'さき', meaning: '먼저, 앞', examples: ['先生 (せんせい) - 선생님', '先週 (せんしゅう) - 지난주'], level: 1 },
  { kanji: '生', onyomi: 'セイ, ショウ', kunyomi: 'い(きる), う(まれる)', meaning: '살다, 태어나다', examples: ['学生 (がくせい) - 학생', '生まれる (うまれる) - 태어나다'], level: 1 },

  // 장소
  { kanji: '国', onyomi: 'コク', kunyomi: 'くに', meaning: '나라', examples: ['外国 (がいこく) - 외국', '国 (くに) - 나라'], level: 1 },
  { kanji: '外', onyomi: 'ガイ, ゲ', kunyomi: 'そと, ほか', meaning: '밖, 외', examples: ['外国 (がいこく) - 외국', '外 (そと) - 밖'], level: 1 },
  { kanji: '山', onyomi: 'サン, ザン', kunyomi: 'やま', meaning: '산', examples: ['富士山 (ふじさん) - 후지산', '山 (やま) - 산'], level: 1 },
  { kanji: '川', onyomi: 'セン', kunyomi: 'かわ', meaning: '강', examples: ['川 (かわ) - 강', '小川 (おがわ) - 시내'], level: 1 },
  { kanji: '田', onyomi: 'デン', kunyomi: 'た', meaning: '논, 밭', examples: ['田中 (たなか) - 다나카(이름)', '田んぼ (たんぼ) - 논'], level: 2 },
  { kanji: '駅', onyomi: 'エキ', kunyomi: '', meaning: '역', examples: ['駅 (えき) - 역', '東京駅 (とうきょうえき) - 도쿄역'], level: 1 },
  { kanji: '店', onyomi: 'テン', kunyomi: 'みせ', meaning: '가게', examples: ['店 (みせ) - 가게', '喫茶店 (きっさてん) - 찻집'], level: 1 },
  { kanji: '会', onyomi: 'カイ, エ', kunyomi: 'あ(う)', meaning: '만나다, 모임', examples: ['会社 (かいしゃ) - 회사', '会う (あう) - 만나다'], level: 1 },
  { kanji: '社', onyomi: 'シャ', kunyomi: 'やしろ', meaning: '회사, 신사', examples: ['会社 (かいしゃ) - 회사', '神社 (じんじゃ) - 신사'], level: 1 },
  { kanji: '校', onyomi: 'コウ', kunyomi: '', meaning: '학교', examples: ['学校 (がっこう) - 학교', '高校 (こうこう) - 고등학교'], level: 1 },

  // 동작
  { kanji: '行', onyomi: 'コウ, ギョウ', kunyomi: 'い(く), おこな(う)', meaning: '가다, 행하다', examples: ['行く (いく) - 가다', '銀行 (ぎんこう) - 은행'], level: 1 },
  { kanji: '来', onyomi: 'ライ', kunyomi: 'く(る), き(たる)', meaning: '오다', examples: ['来る (くる) - 오다', '来週 (らいしゅう) - 다음 주'], level: 1 },
  { kanji: '出', onyomi: 'シュツ', kunyomi: 'で(る), だ(す)', meaning: '나가다, 내다', examples: ['出る (でる) - 나가다', '出口 (でぐち) - 출구'], level: 1 },
  { kanji: '入', onyomi: 'ニュウ', kunyomi: 'はい(る), い(れる)', meaning: '들어가다', examples: ['入る (はいる) - 들어가다', '入口 (いりぐち) - 입구'], level: 1 },
  { kanji: '見', onyomi: 'ケン', kunyomi: 'み(る)', meaning: '보다', examples: ['見る (みる) - 보다', '見せる (みせる) - 보여주다'], level: 1 },
  { kanji: '聞', onyomi: 'ブン, モン', kunyomi: 'き(く)', meaning: '듣다', examples: ['聞く (きく) - 듣다', '新聞 (しんぶん) - 신문'], level: 1 },
  { kanji: '話', onyomi: 'ワ', kunyomi: 'はな(す), はなし', meaning: '말하다, 이야기', examples: ['話す (はなす) - 말하다', '電話 (でんわ) - 전화'], level: 1 },
  { kanji: '読', onyomi: 'ドク, トク', kunyomi: 'よ(む)', meaning: '읽다', examples: ['読む (よむ) - 읽다', '読書 (どくしょ) - 독서'], level: 1 },
  { kanji: '書', onyomi: 'ショ', kunyomi: 'か(く)', meaning: '쓰다', examples: ['書く (かく) - 쓰다', '辞書 (じしょ) - 사전'], level: 1 },
  { kanji: '食', onyomi: 'ショク', kunyomi: 'た(べる)', meaning: '먹다', examples: ['食べる (たべる) - 먹다', '食事 (しょくじ) - 식사'], level: 1 },
  { kanji: '飲', onyomi: 'イン', kunyomi: 'の(む)', meaning: '마시다', examples: ['飲む (のむ) - 마시다', '飲み物 (のみもの) - 음료'], level: 1 },
  { kanji: '買', onyomi: 'バイ', kunyomi: 'か(う)', meaning: '사다', examples: ['買う (かう) - 사다', '買い物 (かいもの) - 쇼핑'], level: 1 },
  { kanji: '言', onyomi: 'ゲン, ゴン', kunyomi: 'い(う)', meaning: '말하다', examples: ['言う (いう) - 말하다', '言葉 (ことば) - 말, 언어'], level: 1 },
  { kanji: '立', onyomi: 'リツ', kunyomi: 'た(つ)', meaning: '서다', examples: ['立つ (たつ) - 서다', '立派 (りっぱ) - 훌륭하다'], level: 2 },
  { kanji: '休', onyomi: 'キュウ', kunyomi: 'やす(む)', meaning: '쉬다', examples: ['休む (やすむ) - 쉬다', '休み (やすみ) - 휴일'], level: 1 },

  // 형용사/기타
  { kanji: '大', onyomi: 'ダイ, タイ', kunyomi: 'おお(きい)', meaning: '크다', examples: ['大きい (おおきい) - 크다', '大学 (だいがく) - 대학'], level: 1 },
  { kanji: '小', onyomi: 'ショウ', kunyomi: 'ちい(さい), こ', meaning: '작다', examples: ['小さい (ちいさい) - 작다', '小学校 (しょうがっこう) - 초등학교'], level: 1 },
  { kanji: '中', onyomi: 'チュウ', kunyomi: 'なか', meaning: '가운데, 안', examples: ['中 (なか) - 안', '中学校 (ちゅうがっこう) - 중학교'], level: 1 },
  { kanji: '上', onyomi: 'ジョウ', kunyomi: 'うえ, あ(がる)', meaning: '위', examples: ['上 (うえ) - 위', '上がる (あがる) - 오르다'], level: 1 },
  { kanji: '下', onyomi: 'カ, ゲ', kunyomi: 'した, さ(がる)', meaning: '아래', examples: ['下 (した) - 아래', '下がる (さがる) - 내려가다'], level: 1 },
  { kanji: '左', onyomi: 'サ', kunyomi: 'ひだり', meaning: '왼쪽', examples: ['左 (ひだり) - 왼쪽', '左手 (ひだりて) - 왼손'], level: 1 },
  { kanji: '右', onyomi: 'ウ, ユウ', kunyomi: 'みぎ', meaning: '오른쪽', examples: ['右 (みぎ) - 오른쪽', '右手 (みぎて) - 오른손'], level: 1 },
  { kanji: '前', onyomi: 'ゼン', kunyomi: 'まえ', meaning: '앞', examples: ['前 (まえ) - 앞', '名前 (なまえ) - 이름'], level: 1 },
  { kanji: '後', onyomi: 'ゴ, コウ', kunyomi: 'うし(ろ), あと', meaning: '뒤, 후', examples: ['後ろ (うしろ) - 뒤', '午後 (ごご) - 오후'], level: 1 },
  { kanji: '北', onyomi: 'ホク', kunyomi: 'きた', meaning: '북쪽', examples: ['北 (きた) - 북쪽', '北海道 (ほっかいどう) - 홋카이도'], level: 1 },
  { kanji: '南', onyomi: 'ナン', kunyomi: 'みなみ', meaning: '남쪽', examples: ['南 (みなみ) - 남쪽', '南口 (みなみぐち) - 남쪽 출구'], level: 1 },
  { kanji: '東', onyomi: 'トウ', kunyomi: 'ひがし', meaning: '동쪽', examples: ['東 (ひがし) - 동쪽', '東京 (とうきょう) - 도쿄'], level: 1 },
  { kanji: '西', onyomi: 'セイ, サイ', kunyomi: 'にし', meaning: '서쪽', examples: ['西 (にし) - 서쪽', '西口 (にしぐち) - 서쪽 출구'], level: 1 },
  { kanji: '新', onyomi: 'シン', kunyomi: 'あたら(しい)', meaning: '새로운', examples: ['新しい (あたらしい) - 새롭다', '新聞 (しんぶん) - 신문'], level: 1 },
  { kanji: '古', onyomi: 'コ', kunyomi: 'ふる(い)', meaning: '오래된', examples: ['古い (ふるい) - 오래되다', '中古 (ちゅうこ) - 중고'], level: 1 },
  { kanji: '長', onyomi: 'チョウ', kunyomi: 'なが(い)', meaning: '길다', examples: ['長い (ながい) - 길다', '社長 (しゃちょう) - 사장'], level: 1 },
  { kanji: '高', onyomi: 'コウ', kunyomi: 'たか(い)', meaning: '높다, 비싸다', examples: ['高い (たかい) - 높다/비싸다', '高校 (こうこう) - 고등학교'], level: 1 },
  { kanji: '安', onyomi: 'アン', kunyomi: 'やす(い)', meaning: '싸다, 편안', examples: ['安い (やすい) - 싸다', '安心 (あんしん) - 안심'], level: 1 },
  { kanji: '白', onyomi: 'ハク, ビャク', kunyomi: 'しろ(い)', meaning: '흰색', examples: ['白い (しろい) - 하얗다', '白 (しろ) - 흰색'], level: 1 },
  { kanji: '電', onyomi: 'デン', kunyomi: '', meaning: '전기', examples: ['電話 (でんわ) - 전화', '電車 (でんしゃ) - 전철'], level: 1 },
  { kanji: '車', onyomi: 'シャ', kunyomi: 'くるま', meaning: '차', examples: ['車 (くるま) - 차', '電車 (でんしゃ) - 전철'], level: 1 },
  { kanji: '語', onyomi: 'ゴ', kunyomi: 'かた(る)', meaning: '말, 언어', examples: ['日本語 (にほんご) - 일본어', '英語 (えいご) - 영어'], level: 1 },
  { kanji: '学', onyomi: 'ガク', kunyomi: 'まな(ぶ)', meaning: '배우다', examples: ['学校 (がっこう) - 학교', '学生 (がくせい) - 학생'], level: 1 },
]

// 카테고리별 분류
export const kanjiCategories = {
  numbers: { name: '숫자', icon: '🔢', kanji: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '百', '千', '万'] },
  time: { name: '시간/날짜', icon: '📅', kanji: ['日', '月', '火', '水', '木', '金', '土', '年', '時', '分', '半', '週'] },
  people: { name: '사람/가족', icon: '👨‍👩‍👧‍👦', kanji: ['人', '子', '女', '男', '父', '母', '友', '先', '生'] },
  places: { name: '장소', icon: '🏠', kanji: ['国', '外', '山', '川', '田', '駅', '店', '会', '社', '校'] },
  actions: { name: '동작', icon: '🏃', kanji: ['行', '来', '出', '入', '見', '聞', '話', '読', '書', '食', '飲', '買', '言', '立', '休'] },
  adjectives: { name: '형용사/방향', icon: '📐', kanji: ['大', '小', '中', '上', '下', '左', '右', '前', '後', '北', '南', '東', '西', '新', '古', '長', '高', '安', '白', '電', '車', '語', '学'] },
}





