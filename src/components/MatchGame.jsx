import { useState, useEffect } from 'react'
import { hiragana } from '../data/hiragana'
import { katakana } from '../data/katakana'
import { speak } from '../utils/speech'

function MatchGame({ onBack }) {
  const [cards, setCards] = useState([])
  const [flipped, setFlipped] = useState([])
  const [matched, setMatched] = useState([])
  const [moves, setMoves] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [timer, setTimer] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [mode, setMode] = useState(null)

  useEffect(() => {
    let interval
    if (isRunning) {
      interval = setInterval(() => {
        setTimer(t => t + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning])

  const startGame = (selectedMode) => {
    setMode(selectedMode)
    
    let data
    if (selectedMode === 'hira-kata') {
      // 히라가나-가타카나 매칭 (같은 발음)
      const selected = hiragana.slice(0, 8) // 8쌍 = 16장
      data = selected.flatMap(h => {
        const k = katakana.find(k => k.romaji === h.romaji)
        return [
          { ...h, id: `h-${h.romaji}`, pairId: h.romaji, type: 'hiragana' },
          { ...k, id: `k-${k.romaji}`, pairId: k.romaji, type: 'katakana' }
        ]
      })
    } else {
      // 문자-로마자 매칭
      const source = selectedMode === 'hiragana' ? hiragana : katakana
      const selected = source.slice(0, 8)
      data = selected.flatMap(item => [
        { char: item.char, id: `c-${item.romaji}`, pairId: item.romaji, type: 'char' },
        { char: item.romaji, id: `r-${item.romaji}`, pairId: item.romaji, type: 'romaji' }
      ])
    }
    
    setCards(data.sort(() => Math.random() - 0.5))
    setFlipped([])
    setMatched([])
    setMoves(0)
    setTimer(0)
    setIsRunning(true)
    setGameOver(false)
  }

  const handleCardClick = (index) => {
    if (flipped.length === 2) return
    if (flipped.includes(index)) return
    if (matched.includes(cards[index].pairId)) return

    const newFlipped = [...flipped, index]
    setFlipped(newFlipped)

    // 문자 카드 클릭 시 발음
    if (cards[index].type !== 'romaji') {
      speak(cards[index].char)
    }

    if (newFlipped.length === 2) {
      setMoves(moves + 1)
      const [first, second] = newFlipped
      
      if (cards[first].pairId === cards[second].pairId) {
        // 매칭 성공
        setMatched([...matched, cards[first].pairId])
        setFlipped([])
        
        // 게임 종료 체크
        if (matched.length + 1 === cards.length / 2) {
          setIsRunning(false)
          setGameOver(true)
        }
      } else {
        // 매칭 실패 - 1초 후 뒤집기
        setTimeout(() => {
          setFlipped([])
        }, 1000)
      }
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // 모드 선택
  if (!mode) {
    return (
      <div className="fade-in">
        <header className="header">
          <button className="back-btn" onClick={onBack}>←</button>
          <h1>매칭 게임</h1>
        </header>
        <div className="content">
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            같은 발음의 카드를 찾아 매칭하세요! 🎯
          </p>
          
          <div className="menu-grid">
            <div className="menu-item" onClick={() => startGame('hiragana')}>
              <div className="menu-icon">あ=a</div>
              <div className="menu-info">
                <h3>히라가나 ↔ 로마자</h3>
                <p>8쌍 (16장)</p>
              </div>
            </div>
            <div className="menu-item" onClick={() => startGame('katakana')}>
              <div className="menu-icon">ア=a</div>
              <div className="menu-info">
                <h3>가타카나 ↔ 로마자</h3>
                <p>8쌍 (16장)</p>
              </div>
            </div>
            <div className="menu-item" onClick={() => startGame('hira-kata')}>
              <div className="menu-icon">あ=ア</div>
              <div className="menu-info">
                <h3>히라가나 ↔ 가타카나</h3>
                <p>8쌍 (16장)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // 게임 종료
  if (gameOver) {
    return (
      <div className="fade-in">
        <header className="header">
          <button className="back-btn" onClick={() => setMode(null)}>←</button>
          <h1>게임 완료!</h1>
        </header>
        <div className="content">
          <div className="score-display">
            <div style={{ fontSize: '4rem' }}>🎉</div>
            <div className="score-value">{formatTime(timer)}</div>
            <div className="score-label">클리어 시간</div>
          </div>
          
          <div className="stats-row">
            <div className="stat-item">
              <div className="stat-value">{moves}</div>
              <div className="stat-label">시도 횟수</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{Math.round((cards.length / 2 / moves) * 100)}%</div>
              <div className="stat-label">정확도</div>
            </div>
          </div>

          <div className="nav-buttons" style={{ marginTop: '2rem' }}>
            <button className="btn btn-secondary" onClick={() => setMode(null)}>
              뒤로
            </button>
            <button className="btn" onClick={() => startGame(mode)}>
              다시 하기 🔄
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fade-in">
      <header className="header">
        <button className="back-btn" onClick={() => setMode(null)}>←</button>
        <h1>매칭 게임</h1>
      </header>

      <div className="content">
        {/* 스탯 */}
        <div className="stats-row" style={{ marginBottom: '1rem' }}>
          <div className="stat-item">
            <div className="stat-value">{formatTime(timer)}</div>
            <div className="stat-label">시간</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{moves}</div>
            <div className="stat-label">시도</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{matched.length}/{cards.length / 2}</div>
            <div className="stat-label">매칭</div>
          </div>
        </div>

        {/* 카드 그리드 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '0.5rem',
        }}>
          {cards.map((card, index) => {
            const isFlipped = flipped.includes(index) || matched.includes(card.pairId)
            const isMatched = matched.includes(card.pairId)
            
            return (
              <div
                key={card.id}
                onClick={() => handleCardClick(index)}
                style={{
                  aspectRatio: '1',
                  background: isMatched ? 'rgba(76, 175, 80, 0.3)' : 
                              isFlipped ? 'var(--bg-card)' : 'var(--bg-light)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: card.type === 'romaji' ? '1rem' : '1.8rem',
                  fontFamily: card.type === 'romaji' ? 'inherit' : "'Noto Sans JP', sans-serif",
                  cursor: isMatched ? 'default' : 'pointer',
                  transition: 'all 0.3s',
                  border: isFlipped ? '2px solid var(--primary)' : '2px solid transparent',
                  color: isMatched ? 'var(--success)' : 'var(--text-primary)',
                }}
              >
                {isFlipped || isMatched ? card.char : '?'}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default MatchGame


