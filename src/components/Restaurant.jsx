import { useState, useEffect, useRef } from 'react'
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

  // 콜백 저장소
  const urlExpanderCallbacks = useRef({})

  // 네이티브 URL 확장 콜백 설정
  useEffect(() => {
    window.urlExpanderCallback = (callbackId, expandedUrl) => {
      const callback = urlExpanderCallbacks.current[callbackId]
      if (callback) {
        callback(expandedUrl)
        delete urlExpanderCallbacks.current[callbackId]
      }
    }
    return () => {
      delete window.urlExpanderCallback
    }
  }, [])

  // 단축 URL 확장 함수
  const expandShortUrl = async (shortUrl) => {
    console.log('expandShortUrl 시작:', shortUrl)
    console.log('UrlExpander 존재:', !!window.UrlExpander)
    
    // 방법 1: 네이티브 앱에서 URL 확장 (CORS 제한 없음)
    if (window.UrlExpander) {
      return new Promise((resolve) => {
        const callbackId = 'cb_' + Date.now()
        console.log('콜백 ID:', callbackId)
        
        urlExpanderCallbacks.current[callbackId] = (expandedUrl) => {
          console.log('콜백 받음:', expandedUrl)
          // google.com/maps 또는 maps.google.com 체크
          if (expandedUrl && (expandedUrl.includes('google.com/maps') || expandedUrl.includes('maps.google.com'))) {
            resolve(expandedUrl)
          } else if (expandedUrl && expandedUrl.includes('@')) {
            // 좌표가 포함된 URL이면 일단 반환
            resolve(expandedUrl)
          } else {
            console.log('유효하지 않은 URL:', expandedUrl)
            resolve(null)
          }
        }
        
        // 10초 타임아웃
        setTimeout(() => {
          if (urlExpanderCallbacks.current[callbackId]) {
            console.log('타임아웃 발생')
            delete urlExpanderCallbacks.current[callbackId]
            resolve(null)
          }
        }, 10000)
        
        try {
          window.UrlExpander.expandUrl(shortUrl, callbackId)
          console.log('네이티브 호출 완료')
        } catch (e) {
          console.error('네이티브 호출 오류:', e)
          resolve(null)
        }
      })
    }

    // 방법 2: 웹 환경 - CORS 프록시 사용
    console.log('웹 환경 - CORS 프록시 사용')
    try {
      const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(shortUrl)}`)
      const data = await response.json()
      if (data.contents) {
        // 다양한 Google Maps URL 패턴 매칭
        const mapsUrlMatch = data.contents.match(/https:\/\/(www\.)?google\.(com|co\.\w+)\/maps[^"'\s<>]*/i)
        if (mapsUrlMatch) {
          console.log('CORS 프록시 성공:', mapsUrlMatch[0])
          return mapsUrlMatch[0]
        }
      }
    } catch (e) {
      console.log('CORS proxy failed:', e)
    }

    return null
  }

  // 구글맵 URL 파싱해서 데이터 가져오기
  const handleParseUrl = async () => {
    setParseError('')
    
    if (!urlInput.includes('google.com/maps') && !urlInput.includes('goo.gl/maps') && !urlInput.includes('maps.app.goo.gl')) {
      setParseError('구글맵 URL이 아닙니다. 구글맵에서 공유 > 링크 복사를 해주세요.')
      return
    }

    let urlToParse = urlInput

    // 단축 URL인 경우 확장 시도
    if (urlInput.includes('maps.app.goo.gl') || urlInput.includes('goo.gl/maps')) {
      setIsExpanding(true)
      
      try {
        const expandedUrl = await expandShortUrl(urlInput)
        if (expandedUrl) {
          urlToParse = expandedUrl
          console.log('✅ Expanded URL:', expandedUrl)
        } else {
          // 확장 실패 시 새 탭에서 열기
          setIsExpanding(false)
          window.open(urlInput, '_blank')
          setParseError('URL 확장 실패. 방금 열린 구글맵에서 주소창의 전체 URL을 복사해주세요.')
          return
        }
      } catch (e) {
        setIsExpanding(false)
        window.open(urlInput, '_blank')
        setParseError('URL 확장 실패. 방금 열린 구글맵에서 주소창의 전체 URL을 복사해주세요.')
        return
      }
      setIsExpanding(false)
    }

    const coords = parseGoogleMapsUrl(urlToParse)
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
      
      // 어떤 정보를 가져왔는지 알려주기
      const extracted = []
      if (coords) extracted.push('좌표')
      if (info.nameJp) extracted.push('가게 이름')
      if (info.address) extracted.push('주소')
      
      alert(`✅ ${extracted.join(', ')}를 가져왔습니다!${extracted.length < 3 ? '\n💡 나머지 정보는 직접 입력해주세요.' : ''}`)
    } else {
      setParseError('좌표를 찾을 수 없습니다. 구글맵 브라우저 주소창에서 URL을 복사해주세요.')
    }
  }

  // 단축 URL을 브라우저에서 열기
  const openShortUrl = () => {
    window.open(urlInput, '_blank')
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
            <div className="search-instructions">
              <h3>📍 구글맵에서 장소 찾기</h3>
              <ol>
                <li>아래 검색어를 입력하고 "구글맵 열기" 클릭</li>
                <li>구글맵에서 원하는 장소 선택</li>
                <li><strong>⚠️ 브라우저 주소창에서 URL 복사</strong></li>
                <li>복사한 링크를 아래에 붙여넣기</li>
              </ol>
              <div style={{ 
                marginTop: '0.8rem', 
                padding: '0.6rem 0.8rem',
                background: 'rgba(255,100,100,0.15)',
                borderRadius: '8px',
                fontSize: '0.8rem',
                color: '#ffaaaa',
                border: '1px solid rgba(255,100,100,0.3)'
              }}>
                <strong>❌ 주의:</strong> "공유 → 링크 복사"로 하면 안됩니다!<br/>
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
                placeholder="구글맵 주소창에서 복사한 URL 붙여넣기 (예: https://www.google.com/maps/place/...)"
                rows={4}
              />
              {isExpanding && (
                <p style={{ color: 'var(--primary)', marginTop: '0.5rem', textAlign: 'center' }}>
                  ⏳ 단축 URL 확장 중...
                </p>
              )}
              {parseError && (
                <div className="error-message" style={{ marginTop: '0.5rem' }}>
                  <p style={{ margin: 0 }}>⚠️ {parseError}</p>
                  {(urlInput.includes('maps.app.goo.gl') || urlInput.includes('goo.gl/maps')) && (
                    <button 
                      type="button"
                      onClick={openShortUrl}
                      style={{
                        marginTop: '0.5rem',
                        padding: '0.5rem 1rem',
                        background: 'var(--primary)',
                        border: 'none',
                        borderRadius: '6px',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '0.85rem'
                      }}
                    >
                      🔗 구글맵에서 열기 → 주소창 복사
                    </button>
                  )}
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
