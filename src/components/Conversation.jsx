import { useState } from 'react'
import { conversations } from '../data/conversation'
import { speak } from '../utils/speech'

function Conversation({ onBack }) {
  const [selectedSituation, setSelectedSituation] = useState(null)
  const [selectedDialogue, setSelectedDialogue] = useState(null)
  const [showPhrases, setShowPhrases] = useState(false)

  const playLine = (text) => {
    speak(text, 0.7)
  }

  // 대화문 보기
  if (selectedDialogue !== null && selectedSituation) {
    const situation = conversations[selectedSituation]
    const dialogue = situation.dialogues[selectedDialogue]

    return (
      <div className="fade-in">
        <header className="header">
          <button className="back-btn" onClick={() => setSelectedDialogue(null)}>←</button>
          <h1>{dialogue.title}</h1>
        </header>

        <div className="content">
          {/* 대화문 */}
          {dialogue.lines.map((line, idx) => (
            <div 
              key={idx}
              className="card"
              onClick={() => playLine(line.japanese)}
              style={{ 
                cursor: 'pointer',
                marginLeft: line.speaker === '나' || line.speaker === '손님' ? 'auto' : 0,
                marginRight: line.speaker === '나' || line.speaker === '손님' ? 0 : 'auto',
                maxWidth: '85%',
                background: line.speaker === '나' || line.speaker === '손님' 
                  ? 'linear-gradient(135deg, #E91E63 0%, #FF5722 100%)' 
                  : 'var(--bg-card)'
              }}
            >
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                {line.speaker}
              </div>
              <div style={{ fontSize: '1.3rem', fontFamily: "'Noto Sans JP', sans-serif", marginBottom: '0.3rem' }}>
                {line.japanese}
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--accent)' }}>
                {line.romaji}
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                {line.korean}
              </div>
            </div>
          ))}

          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '1.5rem' }}>
            💡 대화를 터치하면 발음을 들을 수 있어요!
          </p>

          {/* 전체 듣기 버튼 */}
          <button 
            className="btn" 
            onClick={async () => {
              for (const line of dialogue.lines) {
                await speak(line.japanese, 0.7)
                await new Promise(r => setTimeout(r, 800))
              }
            }}
            style={{ width: '100%', marginTop: '1rem' }}
          >
            🎧 전체 대화 듣기
          </button>
        </div>
      </div>
    )
  }

  // 상황 상세 보기
  if (selectedSituation) {
    const situation = conversations[selectedSituation]

    return (
      <div className="fade-in">
        <header className="header">
          <button className="back-btn" onClick={() => { setSelectedSituation(null); setShowPhrases(false); }}>←</button>
          <h1>{situation.icon} {situation.name}</h1>
        </header>

        <div className="content">
          {/* 탭 */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <button 
              className={`btn ${!showPhrases ? '' : 'btn-secondary'}`}
              onClick={() => setShowPhrases(false)}
              style={{ flex: 1 }}
            >
              💬 대화문
            </button>
            <button 
              className={`btn ${showPhrases ? '' : 'btn-secondary'}`}
              onClick={() => setShowPhrases(true)}
              style={{ flex: 1 }}
            >
              📝 유용한 표현
            </button>
          </div>

          {!showPhrases ? (
            // 대화문 목록
            <>
              {situation.dialogues.map((dialogue, idx) => (
                <div 
                  key={idx}
                  className="menu-item"
                  onClick={() => setSelectedDialogue(idx)}
                >
                  <div className="menu-icon">💬</div>
                  <div className="menu-info">
                    <h3>{dialogue.title}</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>
                      {dialogue.lines.length}개 대화
                    </p>
                  </div>
                </div>
              ))}
            </>
          ) : (
            // 유용한 표현
            <>
              {situation.phrases.map((phrase, idx) => (
                <div 
                  key={idx}
                  className="word-card"
                  onClick={() => playLine(phrase.japanese)}
                >
                  <div className="word-japanese">{phrase.japanese}</div>
                  <div className="word-romaji">{phrase.romaji}</div>
                  <div className="word-korean">{phrase.korean}</div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    )
  }

  // 상황 목록
  return (
    <div className="fade-in">
      <header className="header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>일상 회화</h1>
      </header>

      <div className="content">
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          상황별 실전 회화를 배워보세요! 🗣️
        </p>

        <div className="category-grid">
          {Object.entries(conversations).map(([key, situation]) => (
            <div 
              key={key}
              className="category-item"
              onClick={() => setSelectedSituation(key)}
            >
              <div className="category-icon">{situation.icon}</div>
              <div className="category-name">{situation.name}</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '0.3rem' }}>
                {situation.dialogues.length}개 대화
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Conversation






