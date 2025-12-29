// 히라가나 데이터 - 기본 46자
export const hiragana = [
  // 모음 (5자)
  { char: 'あ', romaji: 'a', row: 'vowel', audio: 'a' },
  { char: 'い', romaji: 'i', row: 'vowel', audio: 'i' },
  { char: 'う', romaji: 'u', row: 'vowel', audio: 'u' },
  { char: 'え', romaji: 'e', row: 'vowel', audio: 'e' },
  { char: 'お', romaji: 'o', row: 'vowel', audio: 'o' },

  // K행 (5자)
  { char: 'か', romaji: 'ka', row: 'k', audio: 'ka' },
  { char: 'き', romaji: 'ki', row: 'k', audio: 'ki' },
  { char: 'く', romaji: 'ku', row: 'k', audio: 'ku' },
  { char: 'け', romaji: 'ke', row: 'k', audio: 'ke' },
  { char: 'こ', romaji: 'ko', row: 'k', audio: 'ko' },

  // S행 (5자)
  { char: 'さ', romaji: 'sa', row: 's', audio: 'sa' },
  { char: 'し', romaji: 'shi', row: 's', audio: 'shi' },
  { char: 'す', romaji: 'su', row: 's', audio: 'su' },
  { char: 'せ', romaji: 'se', row: 's', audio: 'se' },
  { char: 'そ', romaji: 'so', row: 's', audio: 'so' },

  // T행 (5자)
  { char: 'た', romaji: 'ta', row: 't', audio: 'ta' },
  { char: 'ち', romaji: 'chi', row: 't', audio: 'chi' },
  { char: 'つ', romaji: 'tsu', row: 't', audio: 'tsu' },
  { char: 'て', romaji: 'te', row: 't', audio: 'te' },
  { char: 'と', romaji: 'to', row: 't', audio: 'to' },

  // N행 (5자)
  { char: 'な', romaji: 'na', row: 'n', audio: 'na' },
  { char: 'に', romaji: 'ni', row: 'n', audio: 'ni' },
  { char: 'ぬ', romaji: 'nu', row: 'n', audio: 'nu' },
  { char: 'ね', romaji: 'ne', row: 'n', audio: 'ne' },
  { char: 'の', romaji: 'no', row: 'n', audio: 'no' },

  // H행 (5자)
  { char: 'は', romaji: 'ha', row: 'h', audio: 'ha' },
  { char: 'ひ', romaji: 'hi', row: 'h', audio: 'hi' },
  { char: 'ふ', romaji: 'fu', row: 'h', audio: 'fu' },
  { char: 'へ', romaji: 'he', row: 'h', audio: 'he' },
  { char: 'ほ', romaji: 'ho', row: 'h', audio: 'ho' },

  // M행 (5자)
  { char: 'ま', romaji: 'ma', row: 'm', audio: 'ma' },
  { char: 'み', romaji: 'mi', row: 'm', audio: 'mi' },
  { char: 'む', romaji: 'mu', row: 'm', audio: 'mu' },
  { char: 'め', romaji: 'me', row: 'm', audio: 'me' },
  { char: 'も', romaji: 'mo', row: 'm', audio: 'mo' },

  // Y행 (3자)
  { char: 'や', romaji: 'ya', row: 'y', audio: 'ya' },
  { char: 'ゆ', romaji: 'yu', row: 'y', audio: 'yu' },
  { char: 'よ', romaji: 'yo', row: 'y', audio: 'yo' },

  // R행 (5자)
  { char: 'ら', romaji: 'ra', row: 'r', audio: 'ra' },
  { char: 'り', romaji: 'ri', row: 'r', audio: 'ri' },
  { char: 'る', romaji: 'ru', row: 'r', audio: 'ru' },
  { char: 'れ', romaji: 're', row: 'r', audio: 're' },
  { char: 'ろ', romaji: 'ro', row: 'r', audio: 'ro' },

  // W행 (2자)
  { char: 'わ', romaji: 'wa', row: 'w', audio: 'wa' },
  { char: 'を', romaji: 'wo', row: 'w', audio: 'wo' },

  // N (1자)
  { char: 'ん', romaji: 'n', row: 'n-single', audio: 'n' },
];

// 행별 그룹
export const hiraganaRows = {
  vowel: { name: '모음', chars: ['あ', 'い', 'う', 'え', 'お'] },
  k: { name: 'K행', chars: ['か', 'き', 'く', 'け', 'こ'] },
  s: { name: 'S행', chars: ['さ', 'し', 'す', 'せ', 'そ'] },
  t: { name: 'T행', chars: ['た', 'ち', 'つ', 'て', 'と'] },
  n: { name: 'N행', chars: ['な', 'に', 'ぬ', 'ね', 'の'] },
  h: { name: 'H행', chars: ['は', 'ひ', 'ふ', 'へ', 'ほ'] },
  m: { name: 'M행', chars: ['ま', 'み', 'む', 'め', 'も'] },
  y: { name: 'Y행', chars: ['や', 'ゆ', 'よ'] },
  r: { name: 'R행', chars: ['ら', 'り', 'る', 'れ', 'ろ'] },
  w: { name: 'W행', chars: ['わ', 'を'] },
  'n-single': { name: 'ん', chars: ['ん'] },
};

