import { useState } from 'react'
import { travelData } from '../data/travel'
import { speak } from '../utils/speech'

function Travel({ onBack }) {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('travel-favorites')
    return saved ? JSON.parse(saved) : []
  })
  const [showFavorites, setShowFavorites] = useState(false)

  const speakPhrase = (japanese) => {
    speak(japanese, 0.7)
  }

  const toggleFavorite = (japanese) => {
    let newFavorites
    if (favorites.includes(japanese)) {
      newFavorites = favorites.filter(f => f !== japanese)
    } else {
      newFavorites = [...favorites, japanese]
    }
    setFavorites(newFavorites)
    localStorage.setItem('travel-favorites', JSON.stringify(newFavorites))
  }

  const getAllPhrases = () => {
    const all = []
    Object.entries(travelData).forEach(([key, category]) => {
      category.phrases.forEach(phrase => {
        all.push({ ...phrase, category: category.name, categoryIcon: category.icon })
      })
    })
    return all
  }

  const getFavoritePhrases = () => {
    const all = getAllPhrases()
    return all.filter(p => favorites.includes(p.japanese))
  }

  // 즐겨찾기 보기
  if (showFavorites) {
    const favPhrases = getFavoritePhrases()
    
    return (
      <div className="fade-in">
        <header className="header">
          <button className="back-btn" onClick={() => setShowFavorites(false)}>←</button>
          <h1>⭐ 즐겨찾기</h1>
        </header>

        <div className="content">
          {favPhrases.length === 0 ? (
            <div className="empty-state">
              <p>즐겨찾기한 표현이 없어요</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                ⭐ 버튼을 눌러 자주 쓰는 표현을 저장하세요
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {favPhrases.map((phrase, idx) => (
                <div 
                  key={idx}
                  className="card"
                  style={{ padding: '1rem' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div 
                      style={{ flex: 1, cursor: 'pointer' }}
                      onClick={() => speakPhrase(phrase.japanese)}
                    >
                      <div style={{ 
                        fontSize: '1.2rem', 
                        fontFamily: "'Noto Sans JP', sans-serif",
                        marginBottom: '0.3rem'
                      }}>
                        🔊 {phrase.japanese}
                      </div>
                      <div style={{ color: 'var(--accent)', fontSize: '0.9rem', marginBottom: '0.2rem' }}>
                        {phrase.romaji}
                      </div>
                      <div style={{ color: 'var(--text-secondary)' }}>
                        {phrase.korean}
                      </div>
                      <div style={{ 
                        marginTop: '0.5rem',
                        fontSize: '0.8rem',
                        color: 'var(--text-secondary)'
                      }}>
                        {phrase.categoryIcon} {phrase.category}
                      </div>
                    </div>
                    <button
                      onClick={() => toggleFavorite(phrase.japanese)}
                      style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        padding: '0.5rem'
                      }}
                    >
                      ⭐
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  // 카테고리 상세
  if (selectedCategory) {
    const category = travelData[selectedCategory]
    
    return (
      <div className="fade-in">
        <header className="header">
          <button className="back-btn" onClick={() => setSelectedCategory(null)}>←</button>
          <h1>{category.icon} {category.name}</h1>
        </header>

        <div className="content">
          <p style={{ 
            color: 'var(--text-secondary)', 
            textAlign: 'center', 
            marginBottom: '1rem' 
          }}>
            터치하면 발음을 들을 수 있어요 🔊
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {category.phrases.map((phrase, idx) => {
              const isFavorite = favorites.includes(phrase.japanese)
              
              return (
                <div 
                  key={idx}
                  className="card"
                  style={{ padding: '1rem' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div 
                      style={{ flex: 1, cursor: 'pointer' }}
                      onClick={() => speakPhrase(phrase.japanese)}
                    >
                      <div style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '0.3rem'
                      }}>
                        <span style={{ 
                          background: 'var(--bg-light)', 
                          padding: '0.2rem 0.5rem', 
                          borderRadius: '4px',
                          fontSize: '0.75rem',
                          color: 'var(--accent)'
                        }}>
                          {phrase.situation}
                        </span>
                      </div>
                      <div style={{ 
                        fontSize: '1.2rem', 
                        fontFamily: "'Noto Sans JP', sans-serif",
                        marginBottom: '0.3rem'
                      }}>
                        🔊 {phrase.japanese}
                      </div>
                      <div style={{ color: 'var(--accent)', fontSize: '0.9rem', marginBottom: '0.2rem' }}>
                        {phrase.romaji}
                      </div>
                      <div style={{ color: 'var(--text-secondary)' }}>
                        {phrase.korean}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(phrase.japanese)
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        padding: '0.5rem',
                        opacity: isFavorite ? 1 : 0.3
                      }}
                    >
                      ⭐
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* 전체 듣기 버튼 */}
          <button 
            className="btn" 
            style={{ width: '100%', marginTop: '1.5rem' }}
            onClick={() => {
              category.phrases.forEach((phrase, idx) => {
                setTimeout(() => speakPhrase(phrase.japanese), idx * 3000)
              })
            }}
          >
            🔊 전체 듣기
          </button>
        </div>
      </div>
    )
  }

  // 카테고리 목록
  return (
    <div className="fade-in">
      <header className="header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>✈️ 여행 일본어</h1>
      </header>

      <div className="content">
        <p style={{ 
          color: 'var(--text-secondary)', 
          textAlign: 'center', 
          marginBottom: '1.5rem' 
        }}>
          상황별 필수 표현을 배워보세요! 🇯🇵
        </p>

        {/* 즐겨찾기 버튼 */}
        <div 
          className="card"
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1rem',
            cursor: 'pointer',
            marginBottom: '1rem',
            background: favorites.length > 0 ? 'linear-gradient(135deg, rgba(255, 193, 7, 0.2), rgba(255, 87, 34, 0.2))' : undefined
          }}
          onClick={() => setShowFavorites(true)}
        >
          <div style={{ fontSize: '2rem' }}>⭐</div>
          <div>
            <div style={{ fontWeight: 'bold' }}>즐겨찾기</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              {favorites.length}개 저장됨
            </div>
          </div>
        </div>

        {/* 카테고리 그리드 */}
        <div className="category-grid">
          {Object.entries(travelData).map(([key, category]) => (
            <div 
              key={key}
              className="category-item"
              onClick={() => setSelectedCategory(key)}
            >
              <div className="category-icon">{category.icon}</div>
              <div className="category-name">{category.name}</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '0.3rem' }}>
                {category.phrases.length}개 표현
              </div>
            </div>
          ))}
        </div>

        {/* 팁 */}
        <div className="card" style={{ marginTop: '1.5rem' }}>
          <div className="card-title">💡 여행 팁</div>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            • 모르면 "すみません"으로 시작하세요<br/>
            • 천천히 또박또박 말해보세요<br/>
            • 손짓과 함께 사용하면 더 잘 통해요<br/>
            • ⭐를 눌러 자주 쓰는 표현을 저장하세요
          </p>
        </div>
      </div>
    </div>
  )
}

export default Travel

