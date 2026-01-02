// 가타카나 데이터 - 기본 46자
export const katakana = [
  // 모음 (5자)
  { char: 'ア', romaji: 'a', row: 'vowel', audio: 'a' },
  { char: 'イ', romaji: 'i', row: 'vowel', audio: 'i' },
  { char: 'ウ', romaji: 'u', row: 'vowel', audio: 'u' },
  { char: 'エ', romaji: 'e', row: 'vowel', audio: 'e' },
  { char: 'オ', romaji: 'o', row: 'vowel', audio: 'o' },

  // K행 (5자)
  { char: 'カ', romaji: 'ka', row: 'k', audio: 'ka' },
  { char: 'キ', romaji: 'ki', row: 'k', audio: 'ki' },
  { char: 'ク', romaji: 'ku', row: 'k', audio: 'ku' },
  { char: 'ケ', romaji: 'ke', row: 'k', audio: 'ke' },
  { char: 'コ', romaji: 'ko', row: 'k', audio: 'ko' },

  // S행 (5자)
  { char: 'サ', romaji: 'sa', row: 's', audio: 'sa' },
  { char: 'シ', romaji: 'shi', row: 's', audio: 'shi' },
  { char: 'ス', romaji: 'su', row: 's', audio: 'su' },
  { char: 'セ', romaji: 'se', row: 's', audio: 'se' },
  { char: 'ソ', romaji: 'so', row: 's', audio: 'so' },

  // T행 (5자)
  { char: 'タ', romaji: 'ta', row: 't', audio: 'ta' },
  { char: 'チ', romaji: 'chi', row: 't', audio: 'chi' },
  { char: 'ツ', romaji: 'tsu', row: 't', audio: 'tsu' },
  { char: 'テ', romaji: 'te', row: 't', audio: 'te' },
  { char: 'ト', romaji: 'to', row: 't', audio: 'to' },

  // N행 (5자)
  { char: 'ナ', romaji: 'na', row: 'n', audio: 'na' },
  { char: 'ニ', romaji: 'ni', row: 'n', audio: 'ni' },
  { char: 'ヌ', romaji: 'nu', row: 'n', audio: 'nu' },
  { char: 'ネ', romaji: 'ne', row: 'n', audio: 'ne' },
  { char: 'ノ', romaji: 'no', row: 'n', audio: 'no' },

  // H행 (5자)
  { char: 'ハ', romaji: 'ha', row: 'h', audio: 'ha' },
  { char: 'ヒ', romaji: 'hi', row: 'h', audio: 'hi' },
  { char: 'フ', romaji: 'fu', row: 'h', audio: 'fu' },
  { char: 'ヘ', romaji: 'he', row: 'h', audio: 'he' },
  { char: 'ホ', romaji: 'ho', row: 'h', audio: 'ho' },

  // M행 (5자)
  { char: 'マ', romaji: 'ma', row: 'm', audio: 'ma' },
  { char: 'ミ', romaji: 'mi', row: 'm', audio: 'mi' },
  { char: 'ム', romaji: 'mu', row: 'm', audio: 'mu' },
  { char: 'メ', romaji: 'me', row: 'm', audio: 'me' },
  { char: 'モ', romaji: 'mo', row: 'm', audio: 'mo' },

  // Y행 (3자)
  { char: 'ヤ', romaji: 'ya', row: 'y', audio: 'ya' },
  { char: 'ユ', romaji: 'yu', row: 'y', audio: 'yu' },
  { char: 'ヨ', romaji: 'yo', row: 'y', audio: 'yo' },

  // R행 (5자)
  { char: 'ラ', romaji: 'ra', row: 'r', audio: 'ra' },
  { char: 'リ', romaji: 'ri', row: 'r', audio: 'ri' },
  { char: 'ル', romaji: 'ru', row: 'r', audio: 'ru' },
  { char: 'レ', romaji: 're', row: 'r', audio: 're' },
  { char: 'ロ', romaji: 'ro', row: 'r', audio: 'ro' },

  // W행 (2자)
  { char: 'ワ', romaji: 'wa', row: 'w', audio: 'wa' },
  { char: 'ヲ', romaji: 'wo', row: 'w', audio: 'wo' },

  // N (1자)
  { char: 'ン', romaji: 'n', row: 'n-single', audio: 'n' },
];

// 행별 그룹
export const katakanaRows = {
  vowel: { name: '모음', chars: ['ア', 'イ', 'ウ', 'エ', 'オ'] },
  k: { name: 'K행', chars: ['カ', 'キ', 'ク', 'ケ', 'コ'] },
  s: { name: 'S행', chars: ['サ', 'シ', 'ス', 'セ', 'ソ'] },
  t: { name: 'T행', chars: ['タ', 'チ', 'ツ', 'テ', 'ト'] },
  n: { name: 'N행', chars: ['ナ', 'ニ', 'ヌ', 'ネ', 'ノ'] },
  h: { name: 'H행', chars: ['ハ', 'ヒ', 'フ', 'ヘ', 'ホ'] },
  m: { name: 'M행', chars: ['マ', 'ミ', 'ム', 'メ', 'モ'] },
  y: { name: 'Y행', chars: ['ヤ', 'ユ', 'ヨ'] },
  r: { name: 'R행', chars: ['ラ', 'リ', 'ル', 'レ', 'ロ'] },
  w: { name: 'W행', chars: ['ワ', 'ヲ'] },
  'n-single': { name: 'ン', chars: ['ン'] },
};


