// 여행 일본어 데이터
export const travelData = {
  airport: {
    name: '공항',
    icon: '✈️',
    phrases: [
      { japanese: 'パスポートを見せてください', romaji: 'Pasupooto o misete kudasai', korean: '여권을 보여주세요', situation: '입국심사' },
      { japanese: '観光です', romaji: 'Kankou desu', korean: '관광입니다', situation: '방문 목적' },
      { japanese: '3日間滞在します', romaji: 'Mikkakan taizai shimasu', korean: '3일간 체류합니다', situation: '체류 기간' },
      { japanese: '荷物はどこで受け取りますか', romaji: 'Nimotsu wa doko de uketorimasu ka', korean: '짐은 어디서 받나요?', situation: '수하물' },
      { japanese: '税関はどこですか', romaji: 'Zeikan wa doko desu ka', korean: '세관은 어디예요?', situation: '세관' },
      { japanese: '申告するものはありません', romaji: 'Shinkoku suru mono wa arimasen', korean: '신고할 것이 없습니다', situation: '세관 신고' },
      { japanese: '両替所はどこですか', romaji: 'Ryougaejo wa doko desu ka', korean: '환전소는 어디예요?', situation: '환전' },
      { japanese: 'Wi-Fiはありますか', romaji: 'Waifai wa arimasu ka', korean: '와이파이 있나요?', situation: '인터넷' },
    ]
  },
  transport: {
    name: '교통',
    icon: '🚃',
    phrases: [
      { japanese: '〇〇駅はどこですか', romaji: '〇〇 eki wa doko desu ka', korean: '〇〇역은 어디예요?', situation: '길 찾기' },
      { japanese: '切符はどこで買えますか', romaji: 'Kippu wa doko de kaemasu ka', korean: '표는 어디서 사나요?', situation: '표 구매' },
      { japanese: '〇〇までいくらですか', romaji: '〇〇 made ikura desu ka', korean: '〇〇까지 얼마예요?', situation: '요금' },
      { japanese: 'この電車は〇〇に止まりますか', romaji: 'Kono densha wa 〇〇 ni tomarimasu ka', korean: '이 전철은 〇〇에 서나요?', situation: '정차역 확인' },
      { japanese: '次の駅はどこですか', romaji: 'Tsugi no eki wa doko desu ka', korean: '다음 역은 어디예요?', situation: '다음 역' },
      { japanese: '乗り換えはどこですか', romaji: 'Norikae wa doko desu ka', korean: '환승은 어디서 하나요?', situation: '환승' },
      { japanese: 'Suicaを買いたいです', romaji: 'Suica o kaitai desu', korean: '스이카를 사고 싶어요', situation: 'IC카드' },
      { japanese: 'タクシー乗り場はどこですか', romaji: 'Takushii noriba wa doko desu ka', korean: '택시 승강장은 어디예요?', situation: '택시' },
      { japanese: 'ここで降ります', romaji: 'Koko de orimasu', korean: '여기서 내릴게요', situation: '하차' },
      { japanese: '〇〇までお願いします', romaji: '〇〇 made onegai shimasu', korean: '〇〇까지 부탁해요', situation: '목적지' },
    ]
  },
  hotel: {
    name: '호텔',
    icon: '🏨',
    phrases: [
      { japanese: 'チェックインお願いします', romaji: 'Chekkuin onegai shimasu', korean: '체크인 부탁해요', situation: '체크인' },
      { japanese: '予約した〇〇です', romaji: 'Yoyaku shita 〇〇 desu', korean: '예약한 〇〇입니다', situation: '예약 확인' },
      { japanese: '今夜部屋はありますか', romaji: 'Konya heya wa arimasu ka', korean: '오늘 밤 방 있나요?', situation: '당일 예약' },
      { japanese: '一泊いくらですか', romaji: 'Ippaku ikura desu ka', korean: '1박에 얼마예요?', situation: '요금' },
      { japanese: '朝食は何時からですか', romaji: 'Choushoku wa nanji kara desu ka', korean: '조식은 몇 시부터예요?', situation: '조식' },
      { japanese: 'Wi-Fiのパスワードを教えてください', romaji: 'Waifai no pasuwaado o oshiete kudasai', korean: '와이파이 비밀번호 알려주세요', situation: '인터넷' },
      { japanese: '荷物を預かってもらえますか', romaji: 'Nimotsu o azukatte moraemasu ka', korean: '짐을 맡아주실 수 있나요?', situation: '짐 보관' },
      { japanese: 'チェックアウトは何時ですか', romaji: 'Chekkuauto wa nanji desu ka', korean: '체크아웃은 몇 시예요?', situation: '체크아웃' },
      { japanese: 'タクシーを呼んでください', romaji: 'Takushii o yonde kudasai', korean: '택시 불러주세요', situation: '택시 호출' },
      { japanese: 'エアコンが動きません', romaji: 'Eakon ga ugokimasen', korean: '에어컨이 안 돼요', situation: '문제 신고' },
    ]
  },
  restaurant: {
    name: '식당',
    icon: '🍽️',
    phrases: [
      { japanese: '何名様ですか', romaji: 'Nanmei sama desu ka', korean: '몇 분이세요?', situation: '입장' },
      { japanese: '2人です', romaji: 'Futari desu', korean: '2명이에요', situation: '인원' },
      { japanese: 'メニューをください', romaji: 'Menyuu o kudasai', korean: '메뉴판 주세요', situation: '메뉴' },
      { japanese: 'おすすめは何ですか', romaji: 'Osusume wa nan desu ka', korean: '추천 메뉴는 뭐예요?', situation: '추천' },
      { japanese: 'これをください', romaji: 'Kore o kudasai', korean: '이거 주세요', situation: '주문' },
      { japanese: '〇〇を一つお願いします', romaji: '〇〇 o hitotsu onegai shimasu', korean: '〇〇 하나 주세요', situation: '주문' },
      { japanese: 'お水をください', romaji: 'Omizu o kudasai', korean: '물 주세요', situation: '물 요청' },
      { japanese: 'おかわりください', romaji: 'Okawari kudasai', korean: '리필해주세요', situation: '리필' },
      { japanese: 'お会計お願いします', romaji: 'Okaikei onegai shimasu', korean: '계산해주세요', situation: '계산' },
      { japanese: 'カードで払えますか', romaji: 'Kaado de haraemasu ka', korean: '카드로 계산할 수 있나요?', situation: '결제' },
      { japanese: 'ごちそうさまでした', romaji: 'Gochisousama deshita', korean: '잘 먹었습니다', situation: '식사 후' },
      { japanese: 'アレルギーがあります', romaji: 'Arerugii ga arimasu', korean: '알레르기가 있어요', situation: '알레르기' },
      { japanese: '辛くしないでください', romaji: 'Karaku shinaide kudasai', korean: '맵지 않게 해주세요', situation: '요청' },
      { japanese: '持ち帰りできますか', romaji: 'Mochikaeri dekimasu ka', korean: '포장 되나요?', situation: '포장' },
    ]
  },
  shopping: {
    name: '쇼핑',
    icon: '🛍️',
    phrases: [
      { japanese: 'いらっしゃいませ', romaji: 'Irasshaimase', korean: '어서오세요', situation: '인사' },
      { japanese: 'これはいくらですか', romaji: 'Kore wa ikura desu ka', korean: '이거 얼마예요?', situation: '가격' },
      { japanese: '試着できますか', romaji: 'Shichaku dekimasu ka', korean: '입어볼 수 있나요?', situation: '시착' },
      { japanese: '他のサイズはありますか', romaji: 'Hoka no saizu wa arimasu ka', korean: '다른 사이즈 있나요?', situation: '사이즈' },
      { japanese: 'もう少し安くなりますか', romaji: 'Mou sukoshi yasuku narimasu ka', korean: '조금 더 싸게 되나요?', situation: '할인' },
      { japanese: 'これをください', romaji: 'Kore o kudasai', korean: '이거 주세요', situation: '구매' },
      { japanese: '袋をください', romaji: 'Fukuro o kudasai', korean: '봉투 주세요', situation: '봉투' },
      { japanese: '免税になりますか', romaji: 'Menzei ni narimasu ka', korean: '면세 되나요?', situation: '면세' },
      { japanese: '別々に包んでください', romaji: 'Betsubetsu ni tsutsunde kudasai', korean: '따로따로 포장해주세요', situation: '포장' },
      { japanese: '見ているだけです', romaji: 'Mite iru dake desu', korean: '그냥 보고 있어요', situation: '구경' },
    ]
  },
  convenience: {
    name: '편의점',
    icon: '🏪',
    phrases: [
      { japanese: '温めてください', romaji: 'Atatamete kudasai', korean: '데워주세요', situation: '도시락' },
      { japanese: 'お箸をください', romaji: 'Ohashi o kudasai', korean: '젓가락 주세요', situation: '젓가락' },
      { japanese: 'スプーンをください', romaji: 'Supuun o kudasai', korean: '숟가락 주세요', situation: '숟가락' },
      { japanese: 'ストローをください', romaji: 'Sutoroo o kudasai', korean: '빨대 주세요', situation: '빨대' },
      { japanese: '袋はいりません', romaji: 'Fukuro wa irimasen', korean: '봉투 필요없어요', situation: '봉투' },
      { japanese: 'ATMはありますか', romaji: 'ATM wa arimasu ka', korean: 'ATM 있나요?', situation: 'ATM' },
      { japanese: 'コピー機はありますか', romaji: 'Kopiiki wa arimasu ka', korean: '복사기 있나요?', situation: '복사' },
      { japanese: 'トイレはどこですか', romaji: 'Toire wa doko desu ka', korean: '화장실 어디예요?', situation: '화장실' },
    ]
  },
  emergency: {
    name: '긴급상황',
    icon: '🆘',
    phrases: [
      { japanese: '助けてください', romaji: 'Tasukete kudasai', korean: '도와주세요', situation: '도움 요청' },
      { japanese: '警察を呼んでください', romaji: 'Keisatsu o yonde kudasai', korean: '경찰 불러주세요', situation: '경찰' },
      { japanese: '救急車を呼んでください', romaji: 'Kyuukyuusha o yonde kudasai', korean: '구급차 불러주세요', situation: '응급' },
      { japanese: '病院はどこですか', romaji: 'Byouin wa doko desu ka', korean: '병원 어디예요?', situation: '병원' },
      { japanese: '気分が悪いです', romaji: 'Kibun ga warui desu', korean: '기분이 안 좋아요', situation: '몸 상태' },
      { japanese: '頭が痛いです', romaji: 'Atama ga itai desu', korean: '머리가 아파요', situation: '두통' },
      { japanese: 'お腹が痛いです', romaji: 'Onaka ga itai desu', korean: '배가 아파요', situation: '복통' },
      { japanese: '薬局はどこですか', romaji: 'Yakkyoku wa doko desu ka', korean: '약국 어디예요?', situation: '약국' },
      { japanese: '財布を落としました', romaji: 'Saifu o otoshimashita', korean: '지갑을 잃어버렸어요', situation: '분실' },
      { japanese: 'パスポートをなくしました', romaji: 'Pasupooto o nakushimashita', korean: '여권을 잃어버렸어요', situation: '분실' },
      { japanese: '大使館はどこですか', romaji: 'Taishikan wa doko desu ka', korean: '대사관 어디예요?', situation: '대사관' },
      { japanese: '韓国語が話せる人はいますか', romaji: 'Kankokugo ga hanaseru hito wa imasu ka', korean: '한국어 할 수 있는 사람 있나요?', situation: '통역' },
    ]
  },
  basic: {
    name: '기본 표현',
    icon: '💬',
    phrases: [
      { japanese: 'すみません', romaji: 'Sumimasen', korean: '저기요 / 죄송합니다', situation: '부름/사과' },
      { japanese: 'ありがとうございます', romaji: 'Arigatou gozaimasu', korean: '감사합니다', situation: '감사' },
      { japanese: 'お願いします', romaji: 'Onegai shimasu', korean: '부탁합니다', situation: '부탁' },
      { japanese: 'わかりました', romaji: 'Wakarimashita', korean: '알겠습니다', situation: '이해' },
      { japanese: 'わかりません', romaji: 'Wakarimasen', korean: '모르겠어요', situation: '불이해' },
      { japanese: '日本語がわかりません', romaji: 'Nihongo ga wakarimasen', korean: '일본어를 몰라요', situation: '언어' },
      { japanese: 'もう一度言ってください', romaji: 'Mou ichido itte kudasai', korean: '한번 더 말해주세요', situation: '재요청' },
      { japanese: 'ゆっくり話してください', romaji: 'Yukkuri hanashite kudasai', korean: '천천히 말해주세요', situation: '요청' },
      { japanese: '英語は話せますか', romaji: 'Eigo wa hanasemasu ka', korean: '영어 할 수 있나요?', situation: '언어' },
      { japanese: 'ちょっと待ってください', romaji: 'Chotto matte kudasai', korean: '잠시만요', situation: '대기' },
      { japanese: 'いいですか', romaji: 'Ii desu ka', korean: '괜찮아요?', situation: '확인' },
      { japanese: '大丈夫です', romaji: 'Daijoubu desu', korean: '괜찮아요', situation: '응답' },
      { japanese: 'これは何ですか', romaji: 'Kore wa nan desu ka', korean: '이건 뭐예요?', situation: '질문' },
      { japanese: 'どこですか', romaji: 'Doko desu ka', korean: '어디예요?', situation: '위치' },
      { japanese: '何時ですか', romaji: 'Nanji desu ka', korean: '몇 시예요?', situation: '시간' },
    ]
  }
}

