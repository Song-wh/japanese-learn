// 일본 맛집 기본 데이터
export const defaultRestaurants = [
  // 도쿄
  {
    id: 'r1',
    name: '이치란 라멘 시부야점',
    nameJp: '一蘭 渋谷店',
    address: '東京都渋谷区神南1-22-7',
    lat: 35.6614,
    lng: 139.7003,
    city: 'tokyo',
    category: 'ramen',
    rating: 4.8,
    priceRange: '¥1000~2000',
    hours: '24시간',
    memo: '돈코츠 라멘 명가, 1인석 집중 시스템',
    image: '🍜'
  },
  {
    id: 'r2',
    name: '스시 다이',
    nameJp: '寿司大',
    address: '東京都江東区豊洲6-3-1',
    lat: 35.6425,
    lng: 139.7831,
    city: 'tokyo',
    category: 'sushi',
    rating: 4.9,
    priceRange: '¥4000~6000',
    hours: '05:00-14:00',
    memo: '츠키지→토요스 이전, 새벽 줄서기 필수',
    image: '🍣'
  },
  {
    id: 'r3',
    name: '긴자 교카츠',
    nameJp: '銀座 京カツ',
    address: '東京都中央区銀座3-4-5',
    lat: 35.6721,
    lng: 139.7649,
    city: 'tokyo',
    category: 'katsu',
    rating: 4.7,
    priceRange: '¥2000~3000',
    hours: '11:00-21:00',
    memo: '규카츠(소고기 카츠) 원조',
    image: '🥩'
  },
  {
    id: 'r4',
    name: '아후리',
    nameJp: 'AFURI',
    address: '東京都渋谷区恵比寿1-1-7',
    lat: 35.6469,
    lng: 139.7103,
    city: 'tokyo',
    category: 'ramen',
    rating: 4.6,
    priceRange: '¥1000~1500',
    hours: '11:00-23:00',
    memo: '유자시오 라멘으로 유명',
    image: '🍜'
  },
  // 오사카
  {
    id: 'r5',
    name: '이치비리안',
    nameJp: '一味禅',
    address: '大阪府大阪市中央区難波1-7-16',
    lat: 34.6685,
    lng: 135.5014,
    city: 'osaka',
    category: 'yakiniku',
    rating: 4.8,
    priceRange: '¥5000~8000',
    hours: '17:00-24:00',
    memo: '와규 야키니쿠 명소',
    image: '🥓'
  },
  {
    id: 'r6',
    name: '쿠시카츠 다루마',
    nameJp: '串カツだるま',
    address: '大阪府大阪市浪速区恵美須東2-3-9',
    lat: 34.6520,
    lng: 135.5062,
    city: 'osaka',
    category: 'kushikatsu',
    rating: 4.5,
    priceRange: '¥2000~3000',
    hours: '11:00-22:30',
    memo: '오사카 쿠시카츠 원조, 소스 두 번 찍기 금지!',
    image: '🍢'
  },
  {
    id: 'r7',
    name: '하나마루키',
    nameJp: '花丸軒',
    address: '大阪府大阪市北区曽根崎2-14-13',
    lat: 34.7037,
    lng: 135.5009,
    city: 'osaka',
    category: 'ramen',
    rating: 4.4,
    priceRange: '¥800~1200',
    hours: '11:00-02:00',
    memo: '진한 돈코츠 라멘',
    image: '🍜'
  },
  // 교토
  {
    id: 'r8',
    name: '기온 나노하나',
    nameJp: '祇園 なの花',
    address: '京都府京都市東山区祇園町南側570-8',
    lat: 35.0037,
    lng: 135.7755,
    city: 'kyoto',
    category: 'kaiseki',
    rating: 4.9,
    priceRange: '¥10000~15000',
    hours: '12:00-14:00, 18:00-21:00',
    memo: '정통 교토 가이세키 요리',
    image: '🍱'
  },
  {
    id: 'r9',
    name: '멘바카 이치다이',
    nameJp: 'めん馬鹿一代',
    address: '京都府京都市北区紫野東御所田町33',
    lat: 35.0420,
    lng: 135.7544,
    city: 'kyoto',
    category: 'ramen',
    rating: 4.7,
    priceRange: '¥900~1300',
    hours: '11:30-14:30, 18:00-22:00',
    memo: '파 라멘이 유명, 불쇼 퍼포먼스',
    image: '🍜'
  },
  // 후쿠오카
  {
    id: 'r10',
    name: '이치란 본점',
    nameJp: '一蘭 本社総本店',
    address: '福岡県福岡市博多区中洲5-3-2',
    lat: 33.5923,
    lng: 130.4067,
    city: 'fukuoka',
    category: 'ramen',
    rating: 4.8,
    priceRange: '¥1000~1500',
    hours: '24시간',
    memo: '이치란 발상지, 하카타 돈코츠 라멘 본점',
    image: '🍜'
  }
]

// 카테고리 정보
export const categories = {
  all: { name: '전체', icon: '🍽️' },
  ramen: { name: '라멘', icon: '🍜' },
  sushi: { name: '스시', icon: '🍣' },
  yakiniku: { name: '야키니쿠', icon: '🥓' },
  katsu: { name: '돈카츠/규카츠', icon: '🥩' },
  kushikatsu: { name: '쿠시카츠', icon: '🍢' },
  kaiseki: { name: '가이세키', icon: '🍱' },
  izakaya: { name: '이자카야', icon: '🍶' },
  cafe: { name: '카페/디저트', icon: '🍰' },
  other: { name: '기타', icon: '🍴' }
}

// 도시 정보
export const cities = {
  all: { name: '전체', nameJp: '全て' },
  tokyo: { name: '도쿄', nameJp: '東京' },
  osaka: { name: '오사카', nameJp: '大阪' },
  kyoto: { name: '교토', nameJp: '京都' },
  fukuoka: { name: '후쿠오카', nameJp: '福岡' },
  sapporo: { name: '삿포로', nameJp: '札幌' },
  nagoya: { name: '나고야', nameJp: '名古屋' },
  okinawa: { name: '오키나와', nameJp: '沖縄' }
}




