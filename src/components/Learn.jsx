import { useState, useEffect } from 'react'
import { hiragana, hiraganaRows } from '../data/hiragana'
import { katakana, katakanaRows } from '../data/katakana'
import { speak } from '../utils/speech'
import { loadProgress, markAsLearned } from '../utils/storage'

function Learn({ type, onBack, refreshProgress }) {
  const [mode, setMode] = useState('list') // 'list' or 'detail'
  const [currentChar, setCurrentChar] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [progress, setProgress] = useState(null)

  const data = type === 'hiragana' ? hiragana : katakana
  const rows = type === 'hiragana' ? hiraganaRows : katakanaRows
  const title = type === 'hiragana' ? '히라가나' : '가타카나'

  useEffect(() => {
    setProgress(loadProgress())
  }, [])

  const handleCharClick = (char) => {
    const index = data.findIndex(c => c.char === char.char)
    setCurrentChar(char)
    setCurrentIndex(index)
    setMode('detail')
    
    // 학습 완료 표시
    markAsLearned(type, char.char)
    setProgress(loadProgress())
    refreshProgress()
    
    // 자동 발음
    speak(char.char)
  }

  const playSound = () => {
    if (currentChar) {
      speak(currentChar.char)
    }
  }

  const goNext = () => {
    if (currentIndex < data.length - 1) {
      const nextChar = data[currentIndex + 1]
      setCurrentChar(nextChar)
      setCurrentIndex(currentIndex + 1)
      markAsLearned(type, nextChar.char)
      setProgress(loadProgress())
      refreshProgress()
      speak(nextChar.char)
    }
  }

  const goPrev = () => {
    if (currentIndex > 0) {
      const prevChar = data[currentIndex - 1]
      setCurrentChar(prevChar)
      setCurrentIndex(currentIndex - 1)
      speak(prevChar.char)
    }
  }

  const isLearned = (char) => {
    return progress?.[type]?.learned?.includes(char) || false
  }

  if (mode === 'detail' && currentChar) {
    return (
      <div className="fade-in">
        <header className="header">
          <button className="back-btn" onClick={() => setMode('list')}>←</button>
          <h1>{title} 학습</h1>
          <span style={{ marginLeft: 'auto', color: 'var(--text-secondary)' }}>
            {currentIndex + 1} / {data.length}
          </span>
        </header>

        <div className="content">
          <div className="card" style={{ textAlign: 'center' }}>
            <div className="char-display pulse">{currentChar.char}</div>
            <div className="char-romaji">{currentChar.romaji}</div>
            
            <button className="play-btn" onClick={playSound}>
              <svg viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </button>
            
            <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>
              🔊 클릭하면 발음을 들을 수 있어요
            </p>
          </div>

          <div className="nav-buttons">
            <button 
              className="btn btn-secondary" 
              onClick={goPrev}
              disabled={currentIndex === 0}
              style={{ opacity: currentIndex === 0 ? 0.5 : 1 }}
            >
              ← 이전
            </button>
            <button 
              className="btn" 
              onClick={goNext}
              disabled={currentIndex === data.length - 1}
              style={{ opacity: currentIndex === data.length - 1 ? 0.5 : 1 }}
            >
              다음 →
            </button>
          </div>

          {/* 진행률 */}
          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${((currentIndex + 1) / data.length) * 100}%` }}
              />
            </div>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
              {progress?.[type]?.learned?.length || 0}개 학습 완료
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fade-in">
      <header className="header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>{title} 학습</h1>
      </header>

      <div className="content">
        {/* 진행률 */}
        <div className="card">
          <div className="card-title">📊 학습 진행률</div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((progress?.[type]?.learned?.length || 0) / data.length) * 100}%` }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
            <span style={{ color: 'var(--text-secondary)' }}>
              {progress?.[type]?.learned?.length || 0}개 학습
            </span>
            <span style={{ color: 'var(--accent)' }}>
              {data.length}개 전체
            </span>
          </div>
        </div>

        {/* 행별 그리드 */}
        {Object.entries(rows).map(([rowKey, row]) => (
          <div key={rowKey}>
            <div className="row-header">{row.name}</div>
            <div className="char-grid">
              {row.chars.map(charStr => {
                const charData = data.find(c => c.char === charStr)
                if (!charData) return null
                return (
                  <div 
                    key={charStr}
                    className={`char-item ${isLearned(charStr) ? 'learned' : ''}`}
                    onClick={() => handleCharClick(charData)}
                  >
                    <div className="char">{charStr}</div>
                    <div className="romaji">{charData.romaji}</div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Learn




