import { useState, useEffect } from 'react'
import { defaultRestaurants, categories, cities } from '../data/restaurants'
import { getRestaurants, saveRestaurants, addRestaurant, deleteRestaurant, updateRestaurant } from '../utils/restaurantStorage'

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
    // 저장된 맛집 불러오기 (없으면 기본 데이터)
    const saved = getRestaurants()
    if (saved.length === 0) {
      saveRestaurants(defaultRestaurants)
      setRestaurants(defaultRestaurants)
    } else {
      setRestaurants(saved)
    }

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
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="rating">⭐ 평점순</option>
            <option value="distance">📍 거리순</option>
            <option value="name">가나다순</option>
          </select>
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

// 맛집 추가/수정 모달
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
        <form onSubmit={handleSubmit} className="add-form">
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
              <select 
                value={form.city}
                onChange={e => setForm({...form, city: e.target.value})}
              >
                {Object.entries(cities).filter(([k]) => k !== 'all').map(([key, city]) => (
                  <option key={key} value={key}>{city.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group half">
              <label>카테고리</label>
              <select 
                value={form.category}
                onChange={e => setForm({
                  ...form, 
                  category: e.target.value,
                  image: categoryEmojis[e.target.value] || '🍴'
                })}
              >
                {Object.entries(categories).filter(([k]) => k !== 'all').map(([key, cat]) => (
                  <option key={key} value={key}>{cat.icon} {cat.name}</option>
                ))}
              </select>
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
          <div className="form-group">
            <label>좌표 (선택 - 구글맵에서 복사)</label>
            <div className="form-row">
              <input
                type="text"
                value={form.lat}
                onChange={e => setForm({...form, lat: e.target.value})}
                placeholder="위도 (35.xxxx)"
                className="half"
              />
              <input
                type="text"
                value={form.lng}
                onChange={e => setForm({...form, lng: e.target.value})}
                placeholder="경도 (139.xxxx)"
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
      </div>
    </div>
  )
}

export default Restaurant


