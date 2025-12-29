// 상황별 일상 회화
export const conversations = {
  restaurant: {
    name: '식당에서',
    icon: '🍽️',
    dialogues: [
      {
        title: '주문하기',
        lines: [
          { speaker: '점원', japanese: 'いらっしゃいませ', romaji: 'irasshaimase', korean: '어서오세요' },
          { speaker: '손님', japanese: 'メニューをください', romaji: 'menyuu wo kudasai', korean: '메뉴 주세요' },
          { speaker: '점원', japanese: 'はい、どうぞ', romaji: 'hai, douzo', korean: '네, 여기요' },
          { speaker: '손님', japanese: 'これをください', romaji: 'kore wo kudasai', korean: '이것 주세요' },
          { speaker: '점원', japanese: 'かしこまりました', romaji: 'kashikomarimashita', korean: '알겠습니다' },
        ]
      },
      {
        title: '계산하기',
        lines: [
          { speaker: '손님', japanese: 'お会計をお願いします', romaji: 'okaikei wo onegai shimasu', korean: '계산해 주세요' },
          { speaker: '점원', japanese: '千円になります', romaji: 'sen en ni narimasu', korean: '1000엔입니다' },
          { speaker: '손님', japanese: 'カードで払えますか', romaji: 'kaado de haraemasu ka', korean: '카드로 결제할 수 있나요?' },
          { speaker: '점원', japanese: 'はい、大丈夫です', romaji: 'hai, daijoubu desu', korean: '네, 괜찮습니다' },
        ]
      }
    ],
    phrases: [
      { japanese: 'おいしいです', romaji: 'oishii desu', korean: '맛있습니다' },
      { japanese: '水をください', romaji: 'mizu wo kudasai', korean: '물 주세요' },
      { japanese: 'トイレはどこですか', romaji: 'toire wa doko desu ka', korean: '화장실은 어디예요?' },
      { japanese: 'おすすめは何ですか', romaji: 'osusume wa nan desu ka', korean: '추천 메뉴가 뭐예요?' },
    ]
  },
  shopping: {
    name: '쇼핑할 때',
    icon: '🛍️',
    dialogues: [
      {
        title: '옷 가게에서',
        lines: [
          { speaker: '점원', japanese: '何かお探しですか', romaji: 'nanika osagashi desu ka', korean: '무언가 찾으시나요?' },
          { speaker: '손님', japanese: 'これはいくらですか', romaji: 'kore wa ikura desu ka', korean: '이거 얼마예요?' },
          { speaker: '점원', japanese: '三千円です', romaji: 'sanzen en desu', korean: '3000엔입니다' },
          { speaker: '손님', japanese: '試着できますか', romaji: 'shichaku dekimasu ka', korean: '입어볼 수 있어요?' },
          { speaker: '점원', japanese: 'はい、こちらへどうぞ', romaji: 'hai, kochira e douzo', korean: '네, 이쪽으로 오세요' },
        ]
      }
    ],
    phrases: [
      { japanese: '安いですね', romaji: 'yasui desu ne', korean: '싸네요' },
      { japanese: '高いですね', romaji: 'takai desu ne', korean: '비싸네요' },
      { japanese: 'もう少し安くなりますか', romaji: 'mou sukoshi yasuku narimasu ka', korean: '조금 더 싸게 해주실 수 있어요?' },
      { japanese: 'Sサイズはありますか', romaji: 'esu saizu wa arimasu ka', korean: 'S사이즈 있어요?' },
    ]
  },
  direction: {
    name: '길 찾기',
    icon: '🗺️',
    dialogues: [
      {
        title: '역 찾기',
        lines: [
          { speaker: '나', japanese: 'すみません', romaji: 'sumimasen', korean: '실례합니다' },
          { speaker: '나', japanese: '駅はどこですか', romaji: 'eki wa doko desu ka', korean: '역은 어디예요?' },
          { speaker: '상대', japanese: 'まっすぐ行ってください', romaji: 'massugu itte kudasai', korean: '직진하세요' },
          { speaker: '상대', japanese: '右に曲がってください', romaji: 'migi ni magatte kudasai', korean: '오른쪽으로 돌아가세요' },
          { speaker: '나', japanese: 'ありがとうございます', romaji: 'arigatou gozaimasu', korean: '감사합니다' },
        ]
      }
    ],
    phrases: [
      { japanese: '左に曲がってください', romaji: 'hidari ni magatte kudasai', korean: '왼쪽으로 돌아가세요' },
      { japanese: 'ここから近いですか', romaji: 'koko kara chikai desu ka', korean: '여기서 가까워요?' },
      { japanese: '歩いて何分ですか', romaji: 'aruite nanpun desu ka', korean: '걸어서 몇 분이에요?' },
      { japanese: 'この辺にコンビニはありますか', romaji: 'kono hen ni konbini wa arimasu ka', korean: '이 근처에 편의점 있어요?' },
    ]
  },
  hotel: {
    name: '호텔에서',
    icon: '🏨',
    dialogues: [
      {
        title: '체크인',
        lines: [
          { speaker: '직원', japanese: 'いらっしゃいませ', romaji: 'irasshaimase', korean: '어서오세요' },
          { speaker: '손님', japanese: 'チェックインをお願いします', romaji: 'chekkuin wo onegai shimasu', korean: '체크인 부탁합니다' },
          { speaker: '직원', japanese: 'お名前をお願いします', romaji: 'onamae wo onegai shimasu', korean: '성함을 알려주세요' },
          { speaker: '손님', japanese: '田中です', romaji: 'tanaka desu', korean: '타나카입니다' },
          { speaker: '직원', japanese: 'パスポートを見せてください', romaji: 'pasupooto wo misete kudasai', korean: '여권을 보여주세요' },
        ]
      }
    ],
    phrases: [
      { japanese: 'チェックアウトは何時ですか', romaji: 'chekkuauto wa nanji desu ka', korean: '체크아웃은 몇 시예요?' },
      { japanese: 'Wi-Fiはありますか', romaji: 'waifai wa arimasu ka', korean: '와이파이 있어요?' },
      { japanese: '朝食は何時からですか', romaji: 'choushoku wa nanji kara desu ka', korean: '아침식사는 몇 시부터예요?' },
      { japanese: '荷物を預かってもらえますか', romaji: 'nimotsu wo azukatte moraemasu ka', korean: '짐을 맡아주실 수 있나요?' },
    ]
  },
  emergency: {
    name: '긴급상황',
    icon: '🚨',
    dialogues: [
      {
        title: '아플 때',
        lines: [
          { speaker: '나', japanese: '具合が悪いです', romaji: 'guai ga warui desu', korean: '몸이 안 좋아요' },
          { speaker: '상대', japanese: '大丈夫ですか', romaji: 'daijoubu desu ka', korean: '괜찮아요?' },
          { speaker: '나', japanese: '病院に行きたいです', romaji: 'byouin ni ikitai desu', korean: '병원에 가고 싶어요' },
          { speaker: '상대', japanese: '救急車を呼びましょうか', romaji: 'kyuukyuusha wo yobimashou ka', korean: '구급차를 부를까요?' },
        ]
      }
    ],
    phrases: [
      { japanese: '助けてください', romaji: 'tasukete kudasai', korean: '도와주세요' },
      { japanese: '警察を呼んでください', romaji: 'keisatsu wo yonde kudasai', korean: '경찰을 불러주세요' },
      { japanese: '財布をなくしました', romaji: 'saifu wo nakushimashita', korean: '지갑을 잃어버렸어요' },
      { japanese: '日本語がわかりません', romaji: 'nihongo ga wakarimasen', korean: '일본어를 모르겠어요' },
    ]
  }
};

