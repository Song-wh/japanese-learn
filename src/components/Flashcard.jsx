import { useState, useEffect } from 'react'
import { hiragana } from '../data/hiragana'
import { katakana } from '../data/katakana'
import { speak } from '../utils/speech'

function Flashcard({ onBack }) {
  const [cards, setCards] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [swipeDirection, setSwipeDirection] = useState(null)
  const [known, setKnown] = useState([])
  const [unknown, setUnknown] = useState([])
  const [touchStart, setTouchStart] = useState(null)
  const [mode, setMode] = useState(null) // 'hiragana', 'katakana', 'both'

  useEffect(() => {
    if (mode) {
      let data = []
      if (mode === 'hiragana') data = [...hiragana]
      else if (mode === 'katakana') data = [...katakana]
      else data = [...hiragana, ...katakana]
      
      // 섞기
      setCards(data.sort(() => Math.random() - 0.5))
      setCurrentIndex(0)
      setKnown([])
      setUnknown([])
    }
  }, [mode])

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchEnd = (e) => {
    if (!touchStart) return
    
    const touchEnd = e.changedTouches[0].clientX
    const diff = touchEnd - touchStart
    
    if (Math.abs(diff) > 100) {
      if (diff > 0) {
        handleSwipe('right') // 알아요
      } else {
        handleSwipe('left') // 몰라요
      }
    }
    setTouchStart(null)
  }

  const handleSwipe = (direction) => {
    const currentCard = cards[currentIndex]
    setSwipeDirection(direction)
    
    if (direction === 'right') {
      setKnown([...known, currentCard])
    } else {
      setUnknown([...unknown, currentCard])
    }
    
    setTimeout(() => {
      setSwipeDirection(null)
      setFlipped(false)
      if (currentIndex < cards.length - 1) {
        setCurrentIndex(currentIndex + 1)
      }
    }, 300)
  }

  const handleCardClick = () => {
    setFlipped(!flipped)
    if (!flipped && cards[currentIndex]) {
      speak(cards[currentIndex].char)
    }
  }

  const resetCards = () => {
    setCards(cards.sort(() => Math.random() - 0.5))
    setCurrentIndex(0)
    setKnown([])
    setUnknown([])
    setFlipped(false)
  }

  // 모드 선택 화면
  if (!mode) {
    return (
      <div className="fade-in">
        <header className="header">
          <button className="back-btn" onClick={onBack}>←</button>
          <h1>플래시카드</h1>
        </header>
        <div className="content">
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            스와이프로 외우세요!<br/>
            👉 오른쪽 = 알아요 | 👈 왼쪽 = 몰라요
          </p>
          
          <div className="menu-grid">
            <div className="menu-item" onClick={() => setMode('hiragana')}>
              <div className="menu-icon">あ</div>
              <div className="menu-info">
                <h3>히라가나</h3>
                <p>46장 카드</p>
              </div>
            </div>
            <div className="menu-item" onClick={() => setMode('katakana')}>
              <div className="menu-icon">ア</div>
              <div className="menu-info">
                <h3>가타카나</h3>
                <p>46장 카드</p>
              </div>
            </div>
            <div className="menu-item" onClick={() => setMode('both')}>
              <div className="menu-icon">🎴</div>
              <div className="menu-info">
                <h3>전체</h3>
                <p>92장 카드</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // 완료 화면
  if (currentIndex >= cards.length && cards.length > 0) {
    const accuracy = Math.round((known.length / cards.length) * 100)
    return (
      <div className="fade-in">
        <header className="header">
          <button className="back-btn" onClick={() => setMode(null)}>←</button>
          <h1>결과</h1>
        </header>
        <div className="content">
          <div className="score-display">
            <div style={{ fontSize: '4rem' }}>
              {accuracy >= 80 ? '🎉' : accuracy >= 50 ? '👍' : '💪'}
            </div>
            <div className="score-value">{accuracy}%</div>
            <div className="score-label">정답률</div>
          </div>
          
          <div className="stats-row">
            <div className="stat-item">
              <div className="stat-value" style={{ color: 'var(--success)' }}>{known.length}</div>
              <div className="stat-label">알아요 ✓</div>
            </div>
            <div className="stat-item">
              <div className="stat-value" style={{ color: 'var(--error)' }}>{unknown.length}</div>
              <div className="stat-label">몰라요 ✗</div>
            </div>
          </div>

          {unknown.length > 0 && (
            <div className="card" style={{ marginTop: '1rem' }}>
              <div className="card-title">📚 복습 필요</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
                {unknown.map((card, idx) => (
                  <span 
                    key={idx}
                    style={{ 
                      background: 'var(--bg-light)', 
                      padding: '0.5rem 1rem',
                      borderRadius: '8px',
                      fontSize: '1.5rem'
                    }}
                    onClick={() => speak(card.char)}
                  >
                    {card.char}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="nav-buttons" style={{ marginTop: '2rem' }}>
            <button className="btn btn-secondary" onClick={() => setMode(null)}>
              뒤로
            </button>
            <button className="btn" onClick={resetCards}>
              다시 하기 🔄
            </button>
          </div>
        </div>
      </div>
    )
  }

  const currentCard = cards[currentIndex]

  return (
    <div className="fade-in">
      <header className="header">
        <button className="back-btn" onClick={() => setMode(null)}>←</button>
        <h1>플래시카드</h1>
        <span style={{ marginLeft: 'auto', color: 'var(--text-secondary)' }}>
          {currentIndex + 1} / {cards.length}
        </span>
      </header>

      <div className="content">
        {/* 진행률 */}
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${((currentIndex) / cards.length) * 100}%` }}
          />
        </div>

        {/* 스탯 */}
        <div className="stats-row" style={{ marginBottom: '1rem' }}>
          <div className="stat-item">
            <div className="stat-value" style={{ color: 'var(--success)', fontSize: '1.5rem' }}>{known.length}</div>
            <div className="stat-label">알아요</div>
          </div>
          <div className="stat-item">
            <div className="stat-value" style={{ color: 'var(--error)', fontSize: '1.5rem' }}>{unknown.length}</div>
            <div className="stat-label">몰라요</div>
          </div>
        </div>

        {/* 카드 */}
        <div 
          className={`card ${swipeDirection === 'left' ? 'swipe-left' : ''} ${swipeDirection === 'right' ? 'swipe-right' : ''}`}
          style={{ 
            textAlign: 'center', 
            padding: '3rem',
            cursor: 'pointer',
            transition: 'transform 0.3s, opacity 0.3s',
            transform: swipeDirection === 'left' ? 'translateX(-100%) rotate(-20deg)' : 
                       swipeDirection === 'right' ? 'translateX(100%) rotate(20deg)' : 'none',
            opacity: swipeDirection ? 0 : 1,
            minHeight: '250px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
          onClick={handleCardClick}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {currentCard && (
            <>
              <div style={{ fontSize: '6rem', fontFamily: "'Noto Sans JP', sans-serif" }}>
                {currentCard.char}
              </div>
              {flipped && (
                <div style={{ 
                  marginTop: '1rem', 
                  fontSize: '2rem', 
                  color: 'var(--accent)',
                  animation: 'fadeIn 0.3s'
                }}>
                  {currentCard.romaji}
                </div>
              )}
              <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>
                {flipped ? '🔊 발음 듣기' : '탭하면 정답 보기'}
              </p>
            </>
          )}
        </div>

        {/* 버튼 */}
        <div className="nav-buttons" style={{ marginTop: '2rem' }}>
          <button 
            className="btn" 
            onClick={() => handleSwipe('left')}
            style={{ background: 'var(--error)', flex: 1 }}
          >
            👈 몰라요
          </button>
          <button 
            className="btn" 
            onClick={() => handleSwipe('right')}
            style={{ background: 'var(--success)', flex: 1 }}
          >
            알아요 👉
          </button>
        </div>

        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '1rem' }}>
          💡 카드를 좌우로 스와이프하세요!
        </p>
      </div>
    </div>
  )
}

export default Flashcard

