import { useState, useEffect, useRef } from 'react'
import { CapacitorHttp } from '@capacitor/core'
import { categories, cities } from '../data/restaurants'
import { getRestaurants, saveRestaurants, addRestaurant, deleteRestaurant, updateRestaurant } from '../utils/restaurantStorage'
import CustomSelect from './CustomSelect'

function Restaurant({ onBack }) {
  const [restaurants, setRestaurants] = useState([])
  const [selectedCity, setSelectedCity] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingRestaurant, setEditingRestaurant] = useState(null)
  const [userLocation, setUserLocation] = useState(null)
  const [sortBy, setSortBy] = useState('rating') // rating, distance, name
  const [showDetail, setShowDetail] = useState(null)

  useEffect(() => {
    // 저장된 맛집 불러오기 (사용자 등록 데이터만 유지)
    const saved = getRestaurants()
    setRestaurants(saved)

    // 현재 위치 가져오기
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          })
        },
        () => console.log('위치 권한 거부됨')
      )
    }
  }, [])

  // 거리 계산 (Haversine 공식)
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371 // 지구 반경 (km)
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLng = (lng2 - lng1) * Math.PI / 180
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c
  }

  // 필터링 & 정렬
  const filteredRestaurants = restaurants
    .filter(r => selectedCity === 'all' || r.city === selectedCity)
    .filter(r => selectedCategory === 'all' || r.category === selectedCategory)
    .map(r => ({
      ...r,
      distance: userLocation ? calculateDistance(userLocation.lat, userLocation.lng, r.lat, r.lng) : null
    }))
    .sort((a, b) => {
      if (sortBy === 'distance' && a.distance && b.distance) {
        return a.distance - b.distance
      } else if (sortBy === 'rating') {
        return b.rating - a.rating
      } else {
        return a.name.localeCompare(b.name)
      }
    })

  // 구글맵으로 길찾기
  const openGoogleMaps = (restaurant) => {
    const destination = encodeURIComponent(restaurant.address)
    const url = userLocation
      ? `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${destination}&travelmode=transit`
      : `https://www.google.com/maps/search/?api=1&query=${destination}`
    window.open(url, '_blank')
  }

  // 구글맵에서 검색
  const searchInMaps = (restaurant) => {
    const query = encodeURIComponent(`${restaurant.nameJp} ${restaurant.address}`)
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank')
  }

  // 맛집 삭제
  const handleDelete = (id) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      const updated = deleteRestaurant(id)
      setRestaurants(updated)
    }
  }

  // 맛집 추가/수정
  const handleSave = (restaurant) => {
    if (editingRestaurant) {
      const updated = updateRestaurant(restaurant)
      setRestaurants(updated)
    } else {
      const updated = addRestaurant(restaurant)
      setRestaurants(updated)
    }
    setShowAddModal(false)
    setEditingRestaurant(null)
  }

  return (
    <div className="restaurant-page">
      <header className="header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>🍜 일본 맛집</h1>
        <button className="add-btn" onClick={() => setShowAddModal(true)}>+</button>
      </header>

      {/* 필터 영역 */}
      <div className="filter-section">
        {/* 도시 선택 */}
        <div className="filter-row">
          <div className="filter-scroll">
            {Object.entries(cities).map(([key, city]) => (
              <button
                key={key}
                className={`filter-chip ${selectedCity === key ? 'active' : ''}`}
                onClick={() => setSelectedCity(key)}
              >
                {city.name}
              </button>
            ))}
          </div>
        </div>

        {/* 카테고리 선택 */}
        <div className="filter-row">
          <div className="filter-scroll">
            {Object.entries(categories).map(([key, cat]) => (
              <button
                key={key}
                className={`filter-chip ${selectedCategory === key ? 'active' : ''}`}
                onClick={() => setSelectedCategory(key)}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* 정렬 */}
        <div className="sort-row">
          <span className="result-count">{filteredRestaurants.length}개 맛집</span>
          <div className="sort-select-wrapper">
            <CustomSelect
              value={sortBy}
              onChange={setSortBy}
              options={[
                { value: 'rating', label: '⭐ 평점순' },
                { value: 'distance', label: '📍 거리순' },
                { value: 'name', label: '가나다순' }
              ]}
            />
          </div>
        </div>
      </div>

      {/* 맛집 리스트 */}
      <div className="restaurant-list">
        {filteredRestaurants.length === 0 ? (
          <div className="empty-state">
            <p>😢 조건에 맞는 맛집이 없어요</p>
            <button className="primary-btn" onClick={() => setShowAddModal(true)}>
              + 맛집 추가하기
            </button>
          </div>
        ) : (
          filteredRestaurants.map(restaurant => (
            <div key={restaurant.id} className="restaurant-card">
              <div className="restaurant-image">{restaurant.image}</div>
              <div className="restaurant-info">
                <div className="restaurant-header">
                  <h3>{restaurant.name}</h3>
                  <span className="rating">⭐ {restaurant.rating}</span>
                </div>
                <p className="name-jp">{restaurant.nameJp}</p>
                <div className="restaurant-meta">
                  <span className="city">{cities[restaurant.city]?.name}</span>
                  <span className="category">{categories[restaurant.category]?.name}</span>
                  <span className="price">{restaurant.priceRange}</span>
                </div>
                {restaurant.distance && (
                  <p className="distance">
                    📍 {restaurant.distance < 1 
                      ? `${Math.round(restaurant.distance * 1000)}m` 
                      : `${restaurant.distance.toFixed(1)}km`}
                  </p>
                )}
                <div className="restaurant-actions">
                  <button 
                    className="action-btn maps"
                    onClick={() => openGoogleMaps(restaurant)}
                  >
                    🗺️ 길찾기
                  </button>
                  <button 
                    className="action-btn search"
                    onClick={() => searchInMaps(restaurant)}
                  >
                    🔍 지도
                  </button>
                  <button 
                    className="action-btn detail"
                    onClick={() => setShowDetail(restaurant)}
                  >
                    📋 상세
                  </button>
                </div>
              </div>
              <div className="restaurant-menu">
                <button 
                  className="menu-btn"
                  onClick={() => {
                    setEditingRestaurant(restaurant)
                    setShowAddModal(true)
                  }}
                >
                  ✏️
                </button>
                <button 
                  className="menu-btn delete"
                  onClick={() => handleDelete(restaurant.id)}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 상세 모달 */}
      {showDetail && (
        <div className="modal-overlay" onClick={() => setShowDetail(null)}>
          <div className="modal detail-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{showDetail.image} {showDetail.name}</h2>
              <button className="close-btn" onClick={() => setShowDetail(null)}>×</button>
            </div>
            <div className="detail-content">
              <p className="detail-jp">{showDetail.nameJp}</p>
              <div className="detail-row">
                <span className="label">📍 주소</span>
                <span>{showDetail.address}</span>
              </div>
              <div className="detail-row">
                <span className="label">⭐ 평점</span>
                <span>{showDetail.rating}</span>
              </div>
              <div className="detail-row">
                <span className="label">💰 가격대</span>
                <span>{showDetail.priceRange}</span>
              </div>
              <div className="detail-row">
                <span className="label">🕐 영업시간</span>
                <span>{showDetail.hours}</span>
              </div>
              <div className="detail-row">
                <span className="label">📝 메모</span>
                <span>{showDetail.memo}</span>
              </div>
              <div className="detail-actions">
                <button 
                  className="primary-btn"
                  onClick={() => openGoogleMaps(showDetail)}
                >
                  🗺️ 구글맵으로 길찾기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 추가/수정 모달 */}
      {showAddModal && (
        <AddRestaurantModal
          restaurant={editingRestaurant}
          onSave={handleSave}
          onClose={() => {
            setShowAddModal(false)
            setEditingRestaurant(null)
          }}
        />
      )}
    </div>
  )
}

// 구글맵 URL에서 좌표 추출
function parseGoogleMapsUrl(url) {
  try {
    // 패턴 1: @lat,lng 형태 (예: @35.6762,139.6503,17z)
    const coordMatch = url.match(/@(-?\d+\.?\d*),(-?\d+\.?\d*)/)
    if (coordMatch) {
      return {
        lat: parseFloat(coordMatch[1]),
        lng: parseFloat(coordMatch[2])
      }
    }

    // 패턴 2: place/name/@lat,lng 형태
    const placeMatch = url.match(/place\/[^\/]+\/@(-?\d+\.?\d*),(-?\d+\.?\d*)/)
    if (placeMatch) {
      return {
        lat: parseFloat(placeMatch[1]),
        lng: parseFloat(placeMatch[2])
      }
    }

    // 패턴 3: ll=lat,lng 형태 (모바일 링크)
    const llMatch = url.match(/ll=(-?\d+\.?\d*),(-?\d+\.?\d*)/)
    if (llMatch) {
      return {
        lat: parseFloat(llMatch[1]),
        lng: parseFloat(llMatch[2])
      }
    }

    // 패턴 4: q=lat,lng 형태
    const qMatch = url.match(/[?&]q=(-?\d+\.?\d*),(-?\d+\.?\d*)/)
    if (qMatch) {
      return {
        lat: parseFloat(qMatch[1]),
        lng: parseFloat(qMatch[2])
      }
    }

    // 패턴 5: !3d lat !4d lng 형태
    const dataMatch = url.match(/!3d(-?\d+\.?\d*)!4d(-?\d+\.?\d*)/)
    if (dataMatch) {
      return {
        lat: parseFloat(dataMatch[1]),
        lng: parseFloat(dataMatch[2])
      }
    }

    return null
  } catch (e) {
    console.error('URL 파싱 오류:', e)
    return null
  }
}

// 구글맵 URL에서 장소 정보 추출 (이름, 주소 등)
function parseGoogleMapsInfo(url) {
  const result = {
    name: null,
    nameJp: null,
    address: null
  }
  
  try {
    // place/이름/ 형태에서 추출
    // 예: /place/一蘭+渋谷店/@35.123,139.456
    const placeMatch = url.match(/place\/([^\/\@]+)/)
    if (placeMatch) {
      const placeName = decodeURIComponent(placeMatch[1].replace(/\+/g, ' '))
      
      // 일본어가 포함되어 있으면 nameJp로
      if (/[\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]/.test(placeName)) {
        result.nameJp = placeName
        
        // 한국어 이름 자동 생성 시도 (일본어 그대로 사용)
        // 사용자가 나중에 수정할 수 있음
        result.name = placeName
      } else {
        result.name = placeName
      }
    }
    
    // 주소 추출 시도 (data= 파라미터에서)
    // 예: data=!4m...!3m...!1s일본+도쿄도+시부야구...
    const addressMatch = url.match(/!1s([^!]+)/)
    if (addressMatch) {
      const addr = decodeURIComponent(addressMatch[1].replace(/\+/g, ' '))
      // 일본 주소 형태인지 확인
      if (/[都道府県市区町村]/.test(addr) || addr.includes('Japan') || addr.includes('日本')) {
        result.address = addr.replace(/^(일본|Japan|日本)\s*/i, '')
      }
    }
    
    // 검색어에서 주소 추출 시도
    // 예: /search/도쿄+시부야...
    if (!result.address) {
      const searchMatch = url.match(/search\/([^\/\@]+)/)
      if (searchMatch) {
        const searchTerm = decodeURIComponent(searchMatch[1].replace(/\+/g, ' '))
        if (/[都道府県市区町村]/.test(searchTerm)) {
          result.address = searchTerm
        }
      }
    }
    
    return result
  } catch (e) {
    console.error('URL 파싱 오류:', e)
    return result
  }
}

// 맛집 추가/수정 모달 (구글맵 검색 기능 추가)
function AddRestaurantModal({ restaurant, onSave, onClose }) {
  const [form, setForm] = useState(restaurant || {
    name: '',
    nameJp: '',
    address: '',
    lat: 35.6762,
    lng: 139.6503,
    city: 'tokyo',
    category: 'ramen',
    rating: 4.0,
    priceRange: '¥1000~2000',
    hours: '',
    memo: '',
    image: '🍜'
  })
  
  const [searchMode, setSearchMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [urlInput, setUrlInput] = useState('')
  const [parseError, setParseError] = useState('')
  const [coordInput, setCoordInput] = useState('') // 좌표 직접 입력
  const [inputMethod, setInputMethod] = useState('coord') // 'url' or 'coord'

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.address) {
      alert('이름과 주소는 필수입니다!')
      return
    }
    onSave({
      ...form,
      id: form.id || `r${Date.now()}`,
      lat: parseFloat(form.lat) || 35.6762,
      lng: parseFloat(form.lng) || 139.6503,
      rating: parseFloat(form.rating) || 4.0
    })
  }

  // 구글맵에서 검색 열기
  const openGoogleMapsSearch = () => {
    const query = searchQuery || form.name || '일본 음식점'
    const encodedQuery = encodeURIComponent(query)
    window.open(`https://www.google.com/maps/search/${encodedQuery}`, '_blank')
  }

  const [isExpanding, setIsExpanding] = useState(false)
  const [debugLog, setDebugLog] = useState([])

  // 디버그 로그 추가 함수
  const addLog = (msg) => {
    const time = new Date().toLocaleTimeString()
    setDebugLog(prev => [...prev.slice(-15), `[${time}] ${msg}`])
    console.log(msg)
  }

  // HTML/URL에서 좌표 추출하는 헬퍼 함수
  const extractCoordsFromText = (text, log = () => {}) => {
    // 다양한 좌표 패턴 (우선순위 순)
    const patterns = [
      { regex: /@(-?\d+\.\d{4,}),(-?\d+\.\d{4,})/, name: '@lat,lng' },
      { regex: /!3d(-?\d+\.\d{4,})!4d(-?\d+\.\d{4,})/, name: '!3d!4d', swap: false },
      { regex: /!4d(-?\d+\.\d{4,})!3d(-?\d+\.\d{4,})/, name: '!4d!3d', swap: true },
      { regex: /"lat":?\s*(-?\d+\.\d{3,}).*?"lng":?\s*(-?\d+\.\d{3,})/, name: 'lat/lng json' },
      { regex: /\\"lat\\":(-?\d+\.\d{3,}),\\"lng\\":(-?\d+\.\d{3,})/, name: 'escaped lat/lng' },
      { regex: /center=(-?\d+\.\d{3,})%2C(-?\d+\.\d{3,})/, name: 'center=' },
      { regex: /ll=(-?\d+\.\d{3,}),(-?\d+\.\d{3,})/, name: 'll=' },
      { regex: /\[null,null,(-?\d+\.\d{3,}),(-?\d+\.\d{3,})\]/, name: '[null,null,lat,lng]' },
      { regex: /\[(-?\d+\.\d{4,}),(-?\d+\.\d{4,})\]/, name: '[lat,lng]' },
      { regex: /,(-?\d+\.\d{5,}),(-?\d+\.\d{5,}),/, name: ',lat,lng,' },
      { regex: /"(-?\d{2}\.\d{4,})","(-?\d{2,3}\.\d{4,})"/, name: '"lat","lng"' },
      { regex: /\\u0022(-?\d{2}\.\d{4,})\\u0022.*?\\u0022(-?\d{2,3}\.\d{4,})\\u0022/, name: 'unicode' },
    ]
    
    for (const { regex, name, swap } of patterns) {
      const match = text.match(regex)
      if (match) {
        let lat = parseFloat(match[1])
        let lng = parseFloat(match[2])
        if (swap) [lat, lng] = [lng, lat]
        
        // 일본/아시아 범위 체크 (더 넓게)
        if (lat >= 20 && lat <= 50 && lng >= 100 && lng <= 160) {
          log(`✅ 패턴 '${name}'에서 발견: ${lat}, ${lng}`)
          return { lat, lng }
        }
      }
    }
    
    // 구글맵 특수 패턴: null,null,lat,lng 또는 [[lat,lng]] 등
    const specialPatterns = [
      /null,null,(\d{2}\.\d{4,}),(\d{2,3}\.\d{4,})/g,
      /\[(\d{2}\.\d{4,}),(\d{2,3}\.\d{4,})\]/g,
      /,(\d{2}\.\d{5,}),(\d{2,3}\.\d{5,})/g,
    ]
    
    for (const pattern of specialPatterns) {
      const matches = [...text.matchAll(pattern)]
      for (const match of matches) {
        const lat = parseFloat(match[1])
        const lng = parseFloat(match[2])
        if (lat >= 24 && lat <= 46 && lng >= 122 && lng <= 154) {
          log(`✅ 특수패턴에서 발견: ${lat}, ${lng}`)
          return { lat, lng }
        }
      }
    }
    
    // 마지막 시도: 모든 소수점 숫자에서 좌표 찾기 (더 공격적)
    // 3자리 이상 소수점을 가진 모든 숫자
    const allNums = [...text.matchAll(/(\d{2,3}\.\d{3,})/g)].map(m => parseFloat(m[1]))
    log(`숫자 ${allNums.length}개 발견, 좌표 범위 검색...`)
    
    // 일본 좌표 범위: 위도 24-46, 경도 122-154
    for (let i = 0; i < allNums.length - 1; i++) {
      const a = allNums[i], b = allNums[i + 1]
      // 위도, 경도 순서
      if (a >= 24 && a <= 46 && b >= 122 && b <= 154) {
        log(`✅ 숫자쌍에서 발견: ${a}, ${b}`)
        return { lat: a, lng: b }
      }
      // 경도, 위도 순서 (반대)
      if (b >= 24 && b <= 46 && a >= 122 && a <= 154) {
        log(`✅ 숫자쌍(역순)에서 발견: ${b}, ${a}`)
        return { lat: b, lng: a }
      }
    }
    
    // 더 공격적: 가까운 숫자 쌍 (최대 5개 간격)
    for (let i = 0; i < allNums.length - 1; i++) {
      for (let j = i + 1; j < Math.min(i + 6, allNums.length); j++) {
        const a = allNums[i], b = allNums[j]
        if (a >= 24 && a <= 46 && b >= 122 && b <= 154) {
          log(`✅ 근접쌍에서 발견: ${a}, ${b} (간격: ${j-i})`)
          return { lat: a, lng: b }
        }
        if (b >= 24 && b <= 46 && a >= 122 && a <= 154) {
          log(`✅ 근접쌍(역순)에서 발견: ${b}, ${a} (간격: ${j-i})`)
          return { lat: b, lng: a }
        }
      }
    }
    
    log(`좌표 찾기 실패 (숫자 ${allNums.length}개 중 일본 범위 없음)`)
    return null
  }

  // consent.google.com URL에서 실제 URL 추출
  const extractContinueUrl = (url) => {
    if (!url.includes('consent.google')) return null
    const match = url.match(/continue=([^&]+)/)
    if (match) {
      try {
        return decodeURIComponent(match[1])
      } catch {
        return match[1]
      }
    }
    return null
  }

  // 단축 URL 확장 함수 - 완전히 재작성
  const expandShortUrl = async (shortUrl) => {
    addLog('=== 단축 URL 분석 시작 ===')
    addLog(`입력: ${shortUrl.substring(0, 50)}...`)
    
    const collectedUrls = []
    const collectedHtml = []
    
    // CONSENT 쿠키로 동의 페이지 우회
    const defaultHeaders = {
      'User-Agent': 'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml',
      'Accept-Language': 'ja-JP,ja;q=0.9,ko;q=0.8',
      'Cookie': 'CONSENT=YES+cb; SOCS=CAISHAgCEhJnd3NfMjAyNDA1MDItMF9SQzEaAmtvIAEaBgiA_LmyBg'
    }
    
    // 방법 1: Capacitor HTTP로 리다이렉트 따라가기
    try {
      addLog('1️⃣ Capacitor HTTP 요청...')
      
      // 첫 번째 요청 (단축 URL)
      const resp1 = await CapacitorHttp.get({
        url: shortUrl,
        headers: defaultHeaders
      })
      
      addLog(`응답 상태: ${resp1.status}`)
      
      let currentUrl = resp1.url
      
      // consent.google.com 우회
      if (currentUrl && currentUrl.includes('consent.google')) {
        addLog('⚠️ 동의 페이지 감지, 우회 시도...')
        const continueUrl = extractContinueUrl(currentUrl)
        if (continueUrl) {
          addLog(`continue URL: ${continueUrl.substring(0, 50)}...`)
          currentUrl = continueUrl
          
          // continue URL로 다시 요청
          try {
            const consentResp = await CapacitorHttp.get({
              url: continueUrl,
              headers: defaultHeaders
            })
            if (consentResp.url) currentUrl = consentResp.url
            if (consentResp.data) {
              const html = typeof consentResp.data === 'string' ? consentResp.data : JSON.stringify(consentResp.data)
              collectedHtml.push(html)
              addLog(`동의 우회 후 HTML: ${html.length} bytes`)
            }
          } catch (e) {
            addLog(`동의 우회 실패: ${e.message}`)
          }
        }
      }
      
      if (currentUrl) {
        addLog(`리다이렉트 URL: ${currentUrl.substring(0, 60)}...`)
        collectedUrls.push(currentUrl)
      }
      
      if (resp1.data) {
        const html1 = typeof resp1.data === 'string' ? resp1.data : JSON.stringify(resp1.data)
        collectedHtml.push(html1)
        addLog(`HTML 크기: ${html1.length} bytes`)
        
        // HTML에서 추가 URL 추출
        const urlMatches = html1.match(/https:\/\/www\.google\.[a-z.]+\/maps\/[^"'\s<>\\]+/gi) || []
        collectedUrls.push(...urlMatches)
        
        // continue URL 추출 (동의 페이지인 경우)
        const continueMatch = html1.match(/continue=([^&"']+)/i)
        if (continueMatch) {
          try {
            const decoded = decodeURIComponent(continueMatch[1])
            if (decoded.includes('google') && decoded.includes('maps')) {
              collectedUrls.push(decoded)
              addLog(`HTML에서 continue URL 발견`)
            }
          } catch {}
        }
        
        // meta refresh URL 추출
        const metaMatch = html1.match(/content=["'][^"']*url=([^"'\s]+)/i)
        if (metaMatch) collectedUrls.push(metaMatch[1])
        
        // window.location URL 추출
        const locMatch = html1.match(/window\.location\s*=\s*["']([^"']+)/i)
        if (locMatch) collectedUrls.push(locMatch[1])
      }
      
      // 구글맵 URL 찾았으면 다시 요청
      const googleMapUrl = collectedUrls.find(u => 
        (u.includes('google.com/maps') || u.includes('google.co.jp/maps')) && 
        !u.includes('consent')
      )
      if (googleMapUrl && googleMapUrl !== shortUrl) {
        addLog(`2️⃣ 구글맵 URL 재요청...`)
        try {
          const resp2 = await CapacitorHttp.get({
            url: googleMapUrl,
            headers: defaultHeaders
          })
          
          // 또 consent 페이지면 다시 우회
          let finalUrl = resp2.url
          if (finalUrl && finalUrl.includes('consent.google')) {
            const continueUrl2 = extractContinueUrl(finalUrl)
            if (continueUrl2) {
              addLog(`2차 동의 우회...`)
              finalUrl = continueUrl2
              try {
                const resp3 = await CapacitorHttp.get({
                  url: continueUrl2,
                  headers: defaultHeaders
                })
                if (resp3.url) finalUrl = resp3.url
                if (resp3.data) {
                  const html3 = typeof resp3.data === 'string' ? resp3.data : JSON.stringify(resp3.data)
                  collectedHtml.push(html3)
                }
              } catch {}
            }
          }
          
          if (finalUrl) {
            addLog(`최종 URL: ${finalUrl.substring(0, 60)}...`)
            collectedUrls.push(finalUrl)
          }
          if (resp2.data) {
            const html2 = typeof resp2.data === 'string' ? resp2.data : JSON.stringify(resp2.data)
            collectedHtml.push(html2)
            addLog(`HTML2 크기: ${html2.length} bytes`)
          }
        } catch (e) {
          addLog(`재요청 실패: ${e.message}`)
        }
      }
    } catch (e) {
      addLog(`Capacitor HTTP 오류: ${e.message}`)
    }
    
    // 수집된 모든 URL에서 좌표 추출 시도
    addLog(`3️⃣ URL ${collectedUrls.length}개에서 좌표 검색...`)
    for (const url of collectedUrls) {
      const coords = extractCoordsFromText(url, addLog)
      if (coords) {
        return { ...coords, url }
      }
    }
    
    // 수집된 모든 HTML에서 좌표 추출 시도
    addLog(`4️⃣ HTML ${collectedHtml.length}개에서 좌표 검색...`)
    for (const html of collectedHtml) {
      const coords = extractCoordsFromText(html, addLog)
      if (coords) {
        return { ...coords, url: collectedUrls[0] || shortUrl }
      }
    }
    
    // 방법 2: fetch fallback (브라우저 환경)
    addLog('5️⃣ fetch fallback 시도...')
    try {
      const resp = await fetch(shortUrl, {
        redirect: 'follow',
        mode: 'cors',
        headers: { 'Accept': 'text/html' }
      })
      const html = await resp.text()
      addLog(`fetch 응답: ${html.length} bytes`)
      
      const coords = extractCoordsFromText(html, addLog)
      if (coords) {
        return { ...coords, url: resp.url }
      }
    } catch (e) {
      addLog(`fetch 실패: ${e.message}`)
    }
    
    // 방법 3: URL 언쇼트 서비스 사용
    addLog('6️⃣ 외부 언쇼트 서비스 시도...')
    try {
      const unshortResp = await CapacitorHttp.get({
        url: `https://unshorten.me/json/${encodeURIComponent(shortUrl)}`,
        headers: { 'Accept': 'application/json' }
      })
      if (unshortResp.data) {
        const data = typeof unshortResp.data === 'string' ? JSON.parse(unshortResp.data) : unshortResp.data
        if (data.resolved_url) {
          let resolvedUrl = data.resolved_url
          addLog(`언쇼트 결과: ${resolvedUrl.substring(0, 50)}...`)
          
          // consent.google.com이면 continue URL 추출
          if (resolvedUrl.includes('consent.google')) {
            addLog('⚠️ 언쇼트 결과가 동의 페이지, continue 추출...')
            const continueUrl = extractContinueUrl(resolvedUrl)
            if (continueUrl) {
              resolvedUrl = continueUrl
              addLog(`continue URL: ${resolvedUrl.substring(0, 50)}...`)
              
              // continue URL로 다시 요청
              try {
                const followResp = await CapacitorHttp.get({
                  url: resolvedUrl,
                  headers: defaultHeaders
                })
                
                if (followResp.url && !followResp.url.includes('consent')) {
                  addLog(`최종 URL: ${followResp.url.substring(0, 50)}...`)
                  
                  // URL에서 좌표 추출
                  const coords = extractCoordsFromText(followResp.url, addLog)
                  if (coords) {
                    return { ...coords, url: followResp.url }
                  }
                  
                  // HTML에서 좌표 추출
                  if (followResp.data) {
                    const html = typeof followResp.data === 'string' ? followResp.data : JSON.stringify(followResp.data)
                    addLog(`HTML 크기: ${html.length} bytes`)
                    const htmlCoords = extractCoordsFromText(html, addLog)
                    if (htmlCoords) {
                      return { ...htmlCoords, url: followResp.url }
                    }
                  }
                }
              } catch (e) {
                addLog(`continue 요청 실패: ${e.message}`)
              }
            }
          }
          
          const coords = extractCoordsFromText(resolvedUrl, addLog)
          if (coords) {
            return { ...coords, url: resolvedUrl }
          }
        }
      }
    } catch (e) {
      addLog(`언쇼트 서비스 실패: ${e.message}`)
    }

    addLog('❌ 모든 방법 실패')
    return null
  }

  // 구글맵 URL 파싱해서 데이터 가져오기
  const handleParseUrl = async () => {
    setParseError('')
    setDebugLog([]) // 로그 초기화
    
    if (!urlInput.includes('google.com/maps') && !urlInput.includes('goo.gl/maps') && !urlInput.includes('maps.app.goo.gl')) {
      setParseError('구글맵 URL이 아닙니다. 구글맵에서 공유 > 링크 복사를 해주세요.')
      return
    }

    let coords = null
    let urlToParse = urlInput

    // 단축 URL인 경우 확장 시도
    if (urlInput.includes('maps.app.goo.gl') || urlInput.includes('goo.gl/maps')) {
      setIsExpanding(true)
      
      try {
        const result = await expandShortUrl(urlInput)
        if (result && result.lat && result.lng) {
          // 직접 좌표를 얻었으면 바로 사용
          coords = { lat: result.lat, lng: result.lng }
          urlToParse = result.url || urlInput
          addLog(`✅ 좌표 추출 성공!`)
        } else {
          // 확장 실패
          setIsExpanding(false)
          setParseError('좌표를 찾을 수 없습니다. 디버그 로그를 확인해주세요.')
          return
        }
      } catch (e) {
        setIsExpanding(false)
        addLog(`❌ 오류: ${e.message}`)
        setParseError(`오류 발생: ${e.message}`)
        return
      }
      setIsExpanding(false)
    } else {
      // 일반 URL에서 좌표 추출
      coords = parseGoogleMapsUrl(urlToParse)
    }

    const info = parseGoogleMapsInfo(urlToParse)

    if (coords) {
      // 추출된 정보로 폼 업데이트
      const updates = {
        lat: coords.lat,
        lng: coords.lng
      }
      
      // 이름이 비어있으면 추출된 이름 사용
      if (info.name && !form.name) {
        updates.name = info.name
      }
      if (info.nameJp && !form.nameJp) {
        updates.nameJp = info.nameJp
      }
      if (info.address && !form.address) {
        updates.address = info.address
      }
      
      setForm(prev => ({ ...prev, ...updates }))
      setSearchMode(false)
      setUrlInput('')
      setDebugLog([])
      
      // 어떤 정보를 가져왔는지 알려주기
      const extracted = []
      if (coords) extracted.push('좌표')
      if (info.nameJp) extracted.push('가게 이름')
      if (info.address) extracted.push('주소')
      
      alert(`✅ ${extracted.join(', ')}를 가져왔습니다!\n\n위도: ${coords.lat}\n경도: ${coords.lng}${extracted.length < 3 ? '\n\n💡 나머지 정보는 직접 입력해주세요.' : ''}`)
    } else {
      setParseError('좌표를 찾을 수 없습니다. 디버그 로그를 확인해주세요.')
    }
  }

  // 단축 URL을 브라우저에서 열기
  const openShortUrl = () => {
    window.open(urlInput, '_blank')
  }

  // 좌표 직접 파싱 (예: "35.6762, 139.6503" 또는 "35.6762 139.6503")
  const handleParseCoord = () => {
    setParseError('')
    
    // 다양한 형식 지원
    // "35.6762, 139.6503", "35.6762,139.6503", "35.6762 139.6503"
    const cleanInput = coordInput.trim()
    
    // 패턴 매칭
    const patterns = [
      /(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)/,  // 콤마로 구분
      /(-?\d+\.?\d*)\s+(-?\d+\.?\d*)/,       // 공백으로 구분
    ]
    
    for (const pattern of patterns) {
      const match = cleanInput.match(pattern)
      if (match) {
        const lat = parseFloat(match[1])
        const lng = parseFloat(match[2])
        
        // 유효 범위 체크
        if (lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
          setForm(prev => ({ ...prev, lat, lng }))
          setSearchMode(false)
          setCoordInput('')
          alert(`✅ 좌표를 저장했습니다!\n위도: ${lat}\n경도: ${lng}`)
          return
        }
      }
    }
    
    setParseError('좌표 형식이 올바르지 않습니다. 예: 35.6762, 139.6503')
  }

  const categoryEmojis = {
    ramen: '🍜', sushi: '🍣', yakiniku: '🥓', katsu: '🥩',
    kushikatsu: '🍢', kaiseki: '🍱', izakaya: '🍶', cafe: '🍰', other: '🍴'
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal add-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{restaurant ? '맛집 수정' : '🍜 맛집 추가'}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {/* 구글맵 검색 모드 */}
        {searchMode ? (
          <div className="search-mode">
            {/* 탭 선택 */}
            <div style={{
              display: 'flex',
              marginBottom: '1rem',
              borderRadius: '8px',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <button
                type="button"
                onClick={() => setInputMethod('coord')}
                style={{
                  flex: 1,
                  padding: '0.8rem',
                  border: 'none',
                  background: inputMethod === 'coord' ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                  color: 'white',
                  cursor: 'pointer',
                  fontWeight: inputMethod === 'coord' ? 'bold' : 'normal'
                }}
              >
                📍 좌표 입력 (추천)
              </button>
              <button
                type="button"
                onClick={() => setInputMethod('url')}
                style={{
                  flex: 1,
                  padding: '0.8rem',
                  border: 'none',
                  background: inputMethod === 'url' ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                  color: 'white',
                  cursor: 'pointer',
                  fontWeight: inputMethod === 'url' ? 'bold' : 'normal'
                }}
              >
                🔗 URL 입력
              </button>
            </div>

            {/* 좌표 직접 입력 모드 */}
            {inputMethod === 'coord' && (
              <>
                <div style={{
                  padding: '1rem',
                  background: 'rgba(100, 200, 100, 0.15)',
                  borderRadius: '10px',
                  marginBottom: '1rem',
                  border: '1px solid rgba(100, 200, 100, 0.3)'
                }}>
                  <h3 style={{ margin: '0 0 0.8rem', color: '#90ee90' }}>📍 좌표 가져오는 법</h3>
                  <ol style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    <li>구글맵 앱에서 <strong>장소를 길게 터치</strong></li>
                    <li>화면 아래에 <strong>좌표가 표시됨</strong> (예: 35.6762, 139.6503)</li>
                    <li>좌표를 터치하면 <strong>자동 복사</strong>됨</li>
                    <li>아래에 <strong>붙여넣기</strong></li>
                  </ol>
                </div>

                <div className="form-group">
                  <label>📋 좌표 붙여넣기</label>
                  <input
                    type="text"
                    value={coordInput}
                    onChange={e => {
                      setCoordInput(e.target.value)
                      setParseError('')
                    }}
                    placeholder="예: 35.6762, 139.6503"
                    style={{ fontSize: '1.1rem', padding: '1rem', textAlign: 'center' }}
                  />
                  {parseError && (
                    <p style={{ color: '#ff6b6b', marginTop: '0.5rem', fontSize: '0.85rem' }}>
                      ⚠️ {parseError}
                    </p>
                  )}
                </div>

                <div className="form-actions">
                  <button type="button" className="cancel-btn" onClick={() => setSearchMode(false)}>
                    ← 돌아가기
                  </button>
                  <button 
                    type="button" 
                    className="save-btn"
                    onClick={handleParseCoord}
                    disabled={!coordInput}
                  >
                    ✓ 좌표 저장
                  </button>
                </div>

                <div style={{
                  marginTop: '1rem',
                  padding: '0.8rem',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  color: '#888'
                }}>
                  💡 <strong>팁:</strong> 구글맵 검색도 가능해요!
                  <button 
                    type="button"
                    onClick={openGoogleMapsSearch}
                    style={{
                      display: 'block',
                      width: '100%',
                      marginTop: '0.5rem',
                      padding: '0.6rem',
                      background: 'rgba(255,255,255,0.1)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '6px',
                      color: 'white',
                      cursor: 'pointer'
                    }}
                  >
                    🗺️ 구글맵 열기
                  </button>
                </div>
              </>
            )}

            {/* URL 입력 모드 */}
            {inputMethod === 'url' && (
              <>
                <div className="search-instructions">
                  <h3>🔗 URL로 좌표 가져오기</h3>
                  <div style={{ 
                    marginTop: '0.5rem', 
                    padding: '0.6rem 0.8rem',
                    background: 'rgba(255,100,100,0.15)',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    color: '#ffaaaa',
                    border: '1px solid rgba(255,100,100,0.3)'
                  }}>
                    <strong>⚠️ 중요:</strong> "공유 → 링크 복사" 하면 안됩니다!<br/>
                    <strong>✅ 올바른 방법:</strong> 브라우저 <strong>주소창</strong>에서 직접 복사
                  </div>
                </div>

                <div className="form-group">
                  <label>🔍 검색어 입력</label>
                  <div className="form-row">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      placeholder="예: 이치란 라멘 도쿄"
                      style={{ flex: 1 }}
                    />
                  </div>
                  <button 
                    type="button"
                    className="save-btn"
                    onClick={openGoogleMapsSearch}
                    style={{ width: '100%', marginTop: '0.8rem' }}
                  >
                    🗺️ 구글맵에서 검색
                  </button>
                </div>

                <div className="form-group">
                  <label>📋 구글맵 URL 붙여넣기</label>
                  <textarea
                    value={urlInput}
                    onChange={e => {
                      setUrlInput(e.target.value)
                      setParseError('')
                    }}
                    placeholder="구글맵 주소창에서 복사한 URL 붙여넣기"
                    rows={3}
                  />
                  {isExpanding && (
                    <p style={{ color: 'var(--primary)', marginTop: '0.5rem', textAlign: 'center' }}>
                      ⏳ URL 분석 중...
                    </p>
                  )}
                  
                  {/* 디버그 로그 */}
                  {debugLog.length > 0 && (
                    <div style={{
                      marginTop: '0.5rem',
                      padding: '0.5rem',
                      background: '#1a1a2e',
                      borderRadius: '6px',
                      fontSize: '0.65rem',
                      fontFamily: 'monospace',
                      maxHeight: '100px',
                      overflow: 'auto',
                      color: '#0f0'
                    }}>
                      {debugLog.slice(-5).map((log, i) => (
                        <div key={i} style={{ color: log.includes('❌') || log.includes('오류') ? '#f66' : log.includes('✅') ? '#6f6' : '#aaa' }}>
                          {log}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {parseError && (
                    <div className="error-message" style={{ marginTop: '0.5rem' }}>
                      <p style={{ margin: 0, color: '#ff6b6b' }}>⚠️ {parseError}</p>
                      <p style={{ margin: '0.5rem 0 0', fontSize: '0.85rem', color: '#aaddff' }}>
                        💡 <strong>추천:</strong> 위의 "좌표 입력" 탭에서 직접 입력하세요!
                      </p>
                    </div>
                  )}
                </div>

                <div className="form-actions">
                  <button type="button" className="cancel-btn" onClick={() => setSearchMode(false)}>
                    ← 돌아가기
                  </button>
                  <button 
                    type="button" 
                    className="save-btn"
                    onClick={handleParseUrl}
                    disabled={!urlInput}
                  >
                    ✓ 좌표 가져오기
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          /* 일반 폼 모드 */
          <form onSubmit={handleSubmit} className="add-form">
            {/* 구글맵 검색 버튼 */}
            <button
              type="button"
              className="google-maps-btn"
              onClick={() => setSearchMode(true)}
            >
              🗺️ 구글맵에서 검색하기
            </button>

            <div className="divider-text">
              <span>또는 직접 입력</span>
            </div>

            <div className="form-group">
              <label>가게 이름 *</label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
                placeholder="이치란 라멘"
              />
            </div>
            <div className="form-group">
              <label>일본어 이름</label>
              <input
                type="text"
                value={form.nameJp}
                onChange={e => setForm({...form, nameJp: e.target.value})}
                placeholder="一蘭"
              />
            </div>
            <div className="form-group">
              <label>주소 (일본어) *</label>
              <input
                type="text"
                value={form.address}
                onChange={e => setForm({...form, address: e.target.value})}
                placeholder="東京都渋谷区..."
              />
            </div>
            <div className="form-row">
              <div className="form-group half">
                <label>도시</label>
                <CustomSelect
                  value={form.city}
                  onChange={(val) => setForm({...form, city: val})}
                  options={Object.entries(cities)
                    .filter(([k]) => k !== 'all')
                    .map(([key, city]) => ({ value: key, label: city.name }))}
                />
              </div>
              <div className="form-group half">
                <label>카테고리</label>
                <CustomSelect
                  value={form.category}
                  onChange={(val) => setForm({
                    ...form, 
                    category: val,
                    image: categoryEmojis[val] || '🍴'
                  })}
                  options={Object.entries(categories)
                    .filter(([k]) => k !== 'all')
                    .map(([key, cat]) => ({ value: key, label: `${cat.icon} ${cat.name}` }))}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group half">
                <label>평점</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  step="0.1"
                  value={form.rating}
                  onChange={e => setForm({...form, rating: e.target.value})}
                />
              </div>
              <div className="form-group half">
                <label>가격대</label>
                <input
                  type="text"
                  value={form.priceRange}
                  onChange={e => setForm({...form, priceRange: e.target.value})}
                  placeholder="¥1000~2000"
                />
              </div>
            </div>
            <div className="form-group">
              <label>영업시간</label>
              <input
                type="text"
                value={form.hours}
                onChange={e => setForm({...form, hours: e.target.value})}
                placeholder="11:00-22:00"
              />
            </div>
            <div className="form-group">
              <label>메모</label>
              <textarea
                value={form.memo}
                onChange={e => setForm({...form, memo: e.target.value})}
                placeholder="추천 메뉴, 팁 등..."
                rows={3}
              />
            </div>

            {/* 좌표 표시 */}
            <div className="form-group coordinates-box">
              <div className="coordinates-header">
                <label>📍 위치 좌표</label>
                <button
                  type="button"
                  className="link-btn"
                  onClick={() => setSearchMode(true)}
                >
                  구글맵에서 가져오기 →
                </button>
              </div>
              <div className="form-row">
                <input
                  type="text"
                  value={form.lat}
                  onChange={e => setForm({...form, lat: e.target.value})}
                  placeholder="위도"
                  className="half"
                />
                <input
                  type="text"
                  value={form.lng}
                  onChange={e => setForm({...form, lng: e.target.value})}
                  placeholder="경도"
                  className="half"
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="cancel-btn" onClick={onClose}>취소</button>
              <button type="submit" className="save-btn">
                {restaurant ? '수정' : '추가'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default Restaurant
