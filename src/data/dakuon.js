// 탁음 (가 행, 자 행, 다 행, 바 행) - 20자
export const dakuon = [
  // G행 (가 행)
  { char: 'が', romaji: 'ga', row: 'g', type: 'hiragana' },
  { char: 'ぎ', romaji: 'gi', row: 'g', type: 'hiragana' },
  { char: 'ぐ', romaji: 'gu', row: 'g', type: 'hiragana' },
  { char: 'げ', romaji: 'ge', row: 'g', type: 'hiragana' },
  { char: 'ご', romaji: 'go', row: 'g', type: 'hiragana' },

  // Z행 (자 행)
  { char: 'ざ', romaji: 'za', row: 'z', type: 'hiragana' },
  { char: 'じ', romaji: 'ji', row: 'z', type: 'hiragana' },
  { char: 'ず', romaji: 'zu', row: 'z', type: 'hiragana' },
  { char: 'ぜ', romaji: 'ze', row: 'z', type: 'hiragana' },
  { char: 'ぞ', romaji: 'zo', row: 'z', type: 'hiragana' },

  // D행 (다 행)
  { char: 'だ', romaji: 'da', row: 'd', type: 'hiragana' },
  { char: 'ぢ', romaji: 'ji', row: 'd', type: 'hiragana' },
  { char: 'づ', romaji: 'zu', row: 'd', type: 'hiragana' },
  { char: 'で', romaji: 'de', row: 'd', type: 'hiragana' },
  { char: 'ど', romaji: 'do', row: 'd', type: 'hiragana' },

  // B행 (바 행)
  { char: 'ば', romaji: 'ba', row: 'b', type: 'hiragana' },
  { char: 'び', romaji: 'bi', row: 'b', type: 'hiragana' },
  { char: 'ぶ', romaji: 'bu', row: 'b', type: 'hiragana' },
  { char: 'べ', romaji: 'be', row: 'b', type: 'hiragana' },
  { char: 'ぼ', romaji: 'bo', row: 'b', type: 'hiragana' },
];

// 반탁음 (파 행) - 5자
export const handakuon = [
  { char: 'ぱ', romaji: 'pa', row: 'p', type: 'hiragana' },
  { char: 'ぴ', romaji: 'pi', row: 'p', type: 'hiragana' },
  { char: 'ぷ', romaji: 'pu', row: 'p', type: 'hiragana' },
  { char: 'ぺ', romaji: 'pe', row: 'p', type: 'hiragana' },
  { char: 'ぽ', romaji: 'po', row: 'p', type: 'hiragana' },
];

// 가타카나 탁음
export const dakuonKatakana = [
  // G행
  { char: 'ガ', romaji: 'ga', row: 'g', type: 'katakana' },
  { char: 'ギ', romaji: 'gi', row: 'g', type: 'katakana' },
  { char: 'グ', romaji: 'gu', row: 'g', type: 'katakana' },
  { char: 'ゲ', romaji: 'ge', row: 'g', type: 'katakana' },
  { char: 'ゴ', romaji: 'go', row: 'g', type: 'katakana' },

  // Z행
  { char: 'ザ', romaji: 'za', row: 'z', type: 'katakana' },
  { char: 'ジ', romaji: 'ji', row: 'z', type: 'katakana' },
  { char: 'ズ', romaji: 'zu', row: 'z', type: 'katakana' },
  { char: 'ゼ', romaji: 'ze', row: 'z', type: 'katakana' },
  { char: 'ゾ', romaji: 'zo', row: 'z', type: 'katakana' },

  // D행
  { char: 'ダ', romaji: 'da', row: 'd', type: 'katakana' },
  { char: 'ヂ', romaji: 'ji', row: 'd', type: 'katakana' },
  { char: 'ヅ', romaji: 'zu', row: 'd', type: 'katakana' },
  { char: 'デ', romaji: 'de', row: 'd', type: 'katakana' },
  { char: 'ド', romaji: 'do', row: 'd', type: 'katakana' },

  // B행
  { char: 'バ', romaji: 'ba', row: 'b', type: 'katakana' },
  { char: 'ビ', romaji: 'bi', row: 'b', type: 'katakana' },
  { char: 'ブ', romaji: 'bu', row: 'b', type: 'katakana' },
  { char: 'ベ', romaji: 'be', row: 'b', type: 'katakana' },
  { char: 'ボ', romaji: 'bo', row: 'b', type: 'katakana' },
];

// 가타카나 반탁음
export const handakuonKatakana = [
  { char: 'パ', romaji: 'pa', row: 'p', type: 'katakana' },
  { char: 'ピ', romaji: 'pi', row: 'p', type: 'katakana' },
  { char: 'プ', romaji: 'pu', row: 'p', type: 'katakana' },
  { char: 'ペ', romaji: 'pe', row: 'p', type: 'katakana' },
  { char: 'ポ', romaji: 'po', row: 'p', type: 'katakana' },
];

export const dakuonRows = {
  g: { name: 'G행 (탁음)', chars: ['が', 'ぎ', 'ぐ', 'げ', 'ご'] },
  z: { name: 'Z행 (탁음)', chars: ['ざ', 'じ', 'ず', 'ぜ', 'ぞ'] },
  d: { name: 'D행 (탁음)', chars: ['だ', 'ぢ', 'づ', 'で', 'ど'] },
  b: { name: 'B행 (탁음)', chars: ['ば', 'び', 'ぶ', 'べ', 'ぼ'] },
  p: { name: 'P행 (반탁음)', chars: ['ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ'] },
};


