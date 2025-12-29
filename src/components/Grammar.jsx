import { useState } from 'react'
import { grammar, grammarCategories } from '../data/grammar'
import { speak } from '../utils/speech'

function Grammar({ onBack }) {
  const [selectedGrammar, setSelectedGrammar] = useState(null)
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0)

  const playExample = (text) => {
    speak(text, 0.7)
  }

  if (selectedGrammar) {
    const item = grammar.find(g => g.id === selectedGrammar)
    const currentExample = item.examples[currentExampleIndex]

    return (
      <div className="fade-in">
        <header className="header">
          <button className="back-btn" onClick={() => setSelectedGrammar(null)}>←</button>
          <h1>{item.title}</h1>
        </header>

        <div className="content">
          {/* 제목과 설명 */}
          <div className="card">
            <div className="card-title" style={{ fontSize: '1.5rem' }}>
              {item.title}
            </div>
            <div style={{ color: 'var(--accent)', marginBottom: '1rem' }}>
              {item.subtitle}
            </div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              {item.explanation}
            </p>
          </div>

          {/* 예문 카드 */}
          <div className="card" style={{ marginTop: '1rem' }}>
            <div className="card-title">📝 예문</div>
            
            <div 
              style={{ 
                textAlign: 'center', 
                padding: '1.5rem',
                background: 'var(--bg-light)',
                borderRadius: '12px',
                marginTop: '1rem',
                cursor: 'pointer'
              }}
              onClick={() => playExample(currentExample.japanese)}
            >
              <div style={{ 
                fontSize: '1.8rem', 
                fontFamily: "'Noto Sans JP', sans-serif",
                marginBottom: '0.5rem'
              }}>
                {currentExample.japanese}
              </div>
              <div style={{ color: 'var(--accent)', marginBottom: '0.3rem' }}>
                {currentExample.romaji}
              </div>
              <div style={{ color: 'var(--text-secondary)' }}>
                {currentExample.korean}
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                🔊 터치하면 발음
              </div>
            </div>

            {/* 예문 네비게이션 */}
            {item.examples.length > 1 && (
              <div className="nav-buttons" style={{ marginTop: '1rem' }}>
                <button 
                  className="btn btn-secondary"
                  onClick={() => setCurrentExampleIndex(Math.max(0, currentExampleIndex - 1))}
                  disabled={currentExampleIndex === 0}
                  style={{ opacity: currentExampleIndex === 0 ? 0.5 : 1 }}
                >
                  ← 이전
                </button>
                <span style={{ color: 'var(--text-secondary)', alignSelf: 'center' }}>
                  {currentExampleIndex + 1} / {item.examples.length}
                </span>
                <button 
                  className="btn btn-secondary"
                  onClick={() => setCurrentExampleIndex(Math.min(item.examples.length - 1, currentExampleIndex + 1))}
                  disabled={currentExampleIndex === item.examples.length - 1}
                  style={{ opacity: currentExampleIndex === item.examples.length - 1 ? 0.5 : 1 }}
                >
                  다음 →
                </button>
              </div>
            )}
          </div>

          {/* 팁 */}
          {item.tip && (
            <div className="card" style={{ marginTop: '1rem', background: 'rgba(255, 193, 7, 0.1)' }}>
              <div className="card-title">💡 팁</div>
              <p style={{ color: 'var(--text-secondary)' }}>{item.tip}</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="fade-in">
      <header className="header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>기초 문법</h1>
      </header>

      <div className="content">
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          일본어 기초 문법 패턴을 배워보세요! 📚
        </p>

        {grammarCategories.map(category => (
          <div key={category.id} style={{ marginBottom: '1.5rem' }}>
            <div className="row-header" style={{ marginBottom: '0.5rem' }}>
              {category.icon} {category.name}
            </div>
            
            {category.items.map(itemId => {
              const item = grammar.find(g => g.id === itemId)
              if (!item) return null
              
              return (
                <div 
                  key={item.id}
                  className="menu-item"
                  onClick={() => {
                    setSelectedGrammar(item.id)
                    setCurrentExampleIndex(0)
                  }}
                  style={{ marginBottom: '0.5rem' }}
                >
                  <div className="menu-info">
                    <h3>{item.title}</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>{item.subtitle}</p>
                  </div>
                  <div style={{ color: 'var(--primary)', fontSize: '1.5rem' }}>→</div>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Grammar

