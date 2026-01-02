import { useState } from 'react'
import { words } from '../data/words'
import { speak } from '../utils/speech'

function Words({ onBack }) {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)

  const categories = Object.entries(words)

  const playWord = (japanese) => {
    speak(japanese, 0.7) // 좀 더 느리게
  }

  if (selectedCategory) {
    const category = words[selectedCategory]
    const currentWord = category.words[currentWordIndex]

    return (
      <div className="fade-in">
        <header className="header">
          <button className="back-btn" onClick={() => setSelectedCategory(null)}>←</button>
          <h1>{category.icon} {category.name}</h1>
          <span style={{ marginLeft: 'auto', color: 'var(--text-secondary)' }}>
            {currentWordIndex + 1} / {category.words.length}
          </span>
        </header>

        <div className="content">
          {/* 현재 단어 카드 */}
          <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
            <div 
              className="word-japanese pulse" 
              style={{ fontSize: '3rem', marginBottom: '1rem', cursor: 'pointer' }}
              onClick={() => playWord(currentWord.japanese)}
            >
              {currentWord.japanese}
            </div>
            <div className="word-romaji" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
              {currentWord.romaji}
            </div>
            <div className="word-korean" style={{ fontSize: '1.3rem' }}>
              {currentWord.korean}
            </div>
            
            <button 
              className="play-btn" 
              onClick={() => playWord(currentWord.japanese)}
              style={{ marginTop: '1.5rem' }}
            >
              <svg viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </button>
            
            <p style={{ color: 'var(--text-secondary)', marginTop: '1rem', fontSize: '0.9rem' }}>
              🔊 터치하면 발음을 들을 수 있어요
            </p>
          </div>

          {/* 네비게이션 */}
          <div className="nav-buttons">
            <button 
              className="btn btn-secondary" 
              onClick={() => setCurrentWordIndex(Math.max(0, currentWordIndex - 1))}
              disabled={currentWordIndex === 0}
              style={{ opacity: currentWordIndex === 0 ? 0.5 : 1 }}
            >
              ← 이전
            </button>
            <button 
              className="btn" 
              onClick={() => setCurrentWordIndex(Math.min(category.words.length - 1, currentWordIndex + 1))}
              disabled={currentWordIndex === category.words.length - 1}
              style={{ opacity: currentWordIndex === category.words.length - 1 ? 0.5 : 1 }}
            >
              다음 →
            </button>
          </div>

          {/* 진행률 */}
          <div className="progress-bar" style={{ marginTop: '2rem' }}>
            <div 
              className="progress-fill" 
              style={{ width: `${((currentWordIndex + 1) / category.words.length) * 100}%` }}
            />
          </div>

          {/* 전체 단어 목록 */}
          <div style={{ marginTop: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--accent)' }}>📋 전체 단어</h3>
            {category.words.map((word, idx) => (
              <div 
                key={idx}
                className="word-card"
                onClick={() => {
                  setCurrentWordIndex(idx)
                  playWord(word.japanese)
                }}
                style={{
                  borderLeft: idx === currentWordIndex ? '4px solid var(--primary)' : 'none'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span className="word-japanese">{word.japanese}</span>
                    <span className="word-romaji" style={{ marginLeft: '1rem' }}>{word.romaji}</span>
                  </div>
                  <span className="word-korean">{word.korean}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fade-in">
      <header className="header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>기초 단어</h1>
      </header>

      <div className="content">
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', textAlign: 'center' }}>
          카테고리를 선택해서 단어를 배워보세요! 🎧
        </p>

        <div className="category-grid">
          {categories.map(([key, category]) => (
            <div 
              key={key}
              className="category-item"
              onClick={() => {
                setSelectedCategory(key)
                setCurrentWordIndex(0)
              }}
            >
              <div className="category-icon">{category.icon}</div>
              <div className="category-name">{category.name}</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '0.3rem' }}>
                {category.words.length}개 단어
              </div>
            </div>
          ))}
        </div>

        {/* 팁 */}
        <div className="card" style={{ marginTop: '2rem' }}>
          <div className="card-title">💡 학습 팁</div>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            • 먼저 듣기 버튼을 눌러 발음을 들어보세요<br/>
            • 따라 말하면서 입으로 익히세요<br/>
            • 하루에 5~10개씩 꾸준히 외우세요
          </p>
        </div>
      </div>
    </div>
  )
}

export default Words


