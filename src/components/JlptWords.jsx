import { useState } from 'react'
import { jlptN5, getTotalJlptWords } from '../data/jlpt-n5'
import { speak } from '../utils/speech'

function JlptWords({ onBack }) {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showMeaning, setShowMeaning] = useState(false)

  const categories = Object.entries(jlptN5)
  const totalWords = getTotalJlptWords()

  const playWord = (text) => {
    speak(text, 0.7)
  }

  if (selectedCategory) {
    const category = jlptN5[selectedCategory]
    const currentWord = category.words[currentIndex]

    return (
      <div className="fade-in">
        <header className="header">
          <button className="back-btn" onClick={() => { setSelectedCategory(null); setCurrentIndex(0); }}>←</button>
          <h1>{category.icon} {category.name}</h1>
          <span style={{ marginLeft: 'auto', color: 'var(--text-secondary)' }}>
            {currentIndex + 1} / {category.words.length}
          </span>
        </header>

        <div className="content">
          {/* 진행률 */}
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((currentIndex + 1) / category.words.length) * 100}%` }}
            />
          </div>

          {/* 단어 카드 */}
          <div 
            className="card" 
            style={{ textAlign: 'center', padding: '2rem', marginTop: '1rem', cursor: 'pointer' }}
            onClick={() => {
              setShowMeaning(!showMeaning)
              if (!showMeaning) playWord(currentWord.japanese)
            }}
          >
            {/* 한자 */}
            <div style={{ 
              fontSize: '3.5rem', 
              fontFamily: "'Noto Sans JP', sans-serif",
              marginBottom: '0.5rem'
            }}>
              {currentWord.japanese}
            </div>
            
            {/* 히라가나 */}
            <div style={{ 
              fontSize: '1.5rem', 
              color: 'var(--primary)',
              fontFamily: "'Noto Sans JP', sans-serif",
              marginBottom: '0.5rem'
            }}>
              {currentWord.hiragana}
            </div>

            {/* 로마자 */}
            <div style={{ color: 'var(--accent)', marginBottom: '1rem' }}>
              {currentWord.romaji}
            </div>

            {/* 뜻 (토글) */}
            {showMeaning ? (
              <div style={{ 
                fontSize: '1.5rem', 
                color: 'var(--text-primary)',
                padding: '1rem',
                background: 'var(--bg-light)',
                borderRadius: '12px',
                animation: 'fadeIn 0.3s'
              }}>
                {currentWord.korean}
              </div>
            ) : (
              <div style={{ 
                padding: '1rem',
                background: 'var(--bg-light)',
                borderRadius: '12px',
                color: 'var(--text-secondary)'
              }}>
                탭하면 뜻 보기
              </div>
            )}

            {/* 발음 버튼 */}
            <button 
              className="play-btn" 
              onClick={(e) => { e.stopPropagation(); playWord(currentWord.japanese); }}
              style={{ marginTop: '1rem' }}
            >
              <svg viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </button>
          </div>

          {/* 네비게이션 */}
          <div className="nav-buttons" style={{ marginTop: '1.5rem' }}>
            <button 
              className="btn btn-secondary" 
              onClick={() => { 
                setCurrentIndex(Math.max(0, currentIndex - 1))
                setShowMeaning(false)
              }}
              disabled={currentIndex === 0}
              style={{ opacity: currentIndex === 0 ? 0.5 : 1 }}
            >
              ← 이전
            </button>
            <button 
              className="btn" 
              onClick={() => { 
                setCurrentIndex(Math.min(category.words.length - 1, currentIndex + 1))
                setShowMeaning(false)
              }}
              disabled={currentIndex === category.words.length - 1}
              style={{ opacity: currentIndex === category.words.length - 1 ? 0.5 : 1 }}
            >
              다음 →
            </button>
          </div>

          {/* 전체 단어 목록 */}
          <div style={{ marginTop: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--accent)' }}>📋 전체 단어</h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
              gap: '0.5rem' 
            }}>
              {category.words.map((word, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setCurrentIndex(idx)
                    setShowMeaning(false)
                    playWord(word.japanese)
                  }}
                  style={{
                    background: idx === currentIndex ? 'var(--primary)' : 'var(--bg-light)',
                    padding: '0.7rem',
                    borderRadius: '8px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    fontSize: '1.2rem',
                    fontFamily: "'Noto Sans JP', sans-serif"
                  }}
                >
                  {word.japanese}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fade-in">
      <header className="header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>JLPT N5 단어</h1>
      </header>

      <div className="content">
        <div className="card" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📖</div>
          <h2>JLPT N5 필수 단어</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            총 {totalWords}개 단어를 카테고리별로 학습하세요!
          </p>
        </div>

        <div className="category-grid">
          {categories.map(([key, category]) => (
            <div 
              key={key}
              className="category-item"
              onClick={() => setSelectedCategory(key)}
            >
              <div className="category-icon">{category.icon}</div>
              <div className="category-name">{category.name}</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '0.3rem' }}>
                {category.words.length}개
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default JlptWords




