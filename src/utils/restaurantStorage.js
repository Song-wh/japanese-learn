// 맛집 데이터 저장소 유틸리티

const STORAGE_KEY = 'japanese_restaurants'

// 맛집 목록 가져오기
export function getRestaurants() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch (e) {
    console.error('맛집 데이터 로드 실패:', e)
    return []
  }
}

// 맛집 목록 저장
export function saveRestaurants(restaurants) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(restaurants))
    return restaurants
  } catch (e) {
    console.error('맛집 데이터 저장 실패:', e)
    return []
  }
}

// 맛집 추가
export function addRestaurant(restaurant) {
  const restaurants = getRestaurants()
  const newRestaurant = {
    ...restaurant,
    id: restaurant.id || `r${Date.now()}`,
    createdAt: new Date().toISOString()
  }
  const updated = [...restaurants, newRestaurant]
  saveRestaurants(updated)
  return updated
}

// 맛집 수정
export function updateRestaurant(restaurant) {
  const restaurants = getRestaurants()
  const updated = restaurants.map(r => 
    r.id === restaurant.id ? { ...restaurant, updatedAt: new Date().toISOString() } : r
  )
  saveRestaurants(updated)
  return updated
}

// 맛집 삭제
export function deleteRestaurant(id) {
  const restaurants = getRestaurants()
  const updated = restaurants.filter(r => r.id !== id)
  saveRestaurants(updated)
  return updated
}

// 맛집 검색
export function searchRestaurants(query) {
  const restaurants = getRestaurants()
  const lowerQuery = query.toLowerCase()
  return restaurants.filter(r => 
    r.name.toLowerCase().includes(lowerQuery) ||
    r.nameJp.includes(query) ||
    r.address.includes(query) ||
    r.memo?.toLowerCase().includes(lowerQuery)
  )
}

// 즐겨찾기 토글
export function toggleFavorite(id) {
  const restaurants = getRestaurants()
  const updated = restaurants.map(r => 
    r.id === id ? { ...r, isFavorite: !r.isFavorite } : r
  )
  saveRestaurants(updated)
  return updated
}

// 데이터 내보내기 (백업)
export function exportRestaurants() {
  const restaurants = getRestaurants()
  const blob = new Blob([JSON.stringify(restaurants, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `japanese-restaurants-${new Date().toISOString().split('T')[0]}.json`
  a.click()
  URL.revokeObjectURL(url)
}

// 데이터 가져오기 (복원)
export function importRestaurants(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result)
        if (Array.isArray(data)) {
          const existing = getRestaurants()
          const existingIds = new Set(existing.map(r => r.id))
          const newData = data.filter(r => !existingIds.has(r.id))
          const merged = [...existing, ...newData]
          saveRestaurants(merged)
          resolve(merged)
        } else {
          reject(new Error('잘못된 데이터 형식'))
        }
      } catch (e) {
        reject(e)
      }
    }
    reader.onerror = reject
    reader.readAsText(file)
  })
}




