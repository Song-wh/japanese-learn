import { useState, useEffect } from 'react'
import { kanjiData, kanjiCategories } from '../data/kanji'
import { speak } from '../utils/speech'
import { loadProgress, saveProgress } from '../utils/storage'

function Kanji({ onBack }) {
  const [mode, setMode] = useState('category') // category, learn, quiz
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showDetails, setShowDetails] = useState(false)
  const [learnedKanji, setLearnedKanji] = useState([])
  
  // 퀴즈 상태
  const [quizKanji, setQuizKanji] = useState([])
  const [quizIndex, setQuizIndex] = useState(0)
  const [quizType, setQuizType] = useState('meaning') // meaning, reading
  const [options, setOptions] = useState([])
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    const progress = loadProgress()
    if (progress.learnedKanji) {
      setLearnedKanji(progress.learnedKanji)
    }
  }, [])

  const getCategoryKanji = (categoryKey) => {
    const category = kanjiCategories[categoryKey]
    return kanjiData.filter(k => category.kanji.includes(k.kanji))
  }

  const speakKanji = (kanji) => {
    speak(kanji.kanji, 0.7)
  }

  const markAsLearned = (kanji) => {
    if (!learnedKanji.includes(kanji)) {
      const newLearned = [...learnedKanji, kanji]
      setLearnedKanji(newLearned)
      const progress = loadProgress()
      progress.learnedKanji = newLearned
      saveProgress(progress)
    }
  }

  const startQuiz = (type) => {
    const categoryKanji = selectedCategory 
      ? getCategoryKanji(selectedCategory)
      : kanjiData.slice(0, 30) // 전체 퀴즈는 30개만
    
    const shuffled = [...categoryKanji].sort(() => Math.random() - 0.5).slice(0, 10)
    setQuizKanji(shuffled)
    setQuizType(type)
    setQuizIndex(0)
    setScore(0)
    setSelected(null)
    setShowResult(false)
    generateOptions(shuffled[0], type, categoryKanji)
    setMode('quiz')
  }

  const generateOptions = (current, type, pool) => {
    const others = pool.filter(k => k.kanji !== current.kanji)
    const shuffled = [...others].sort(() => Math.random() - 0.5).slice(0, 3)
    
    let allOptions
    if (type === 'meaning') {
      allOptions = [current.meaning, ...shuffled.map(k => k.meaning)]
    } else {
      allOptions = [current.onyomi, ...shuffled.map(k => k.onyomi)]
    }
    
    setOptions(allOptions.sort(() => Math.random() - 0.5))
  }

  const handleAnswer = (answer) => {
    const current = quizKanji[quizIndex]
    const correct = quizType === 'meaning' ? current.meaning : current.onyomi
    
    setSelected(answer)
    
    if (answer === correct) {
      setScore(score + 1)
      markAsLearned(current.kanji)
    }

    setTimeout(() => {
      if (quizIndex < quizKanji.length - 1) {
        const nextIndex = quizIndex + 1
        setQuizIndex(nextIndex)
        setSelected(null)
        generateOptions(quizKanji[nextIndex], quizType, 
          selectedCategory ? getCategoryKanji(selectedCategory) : kanjiData)
      } else {
        setShowResult(true)
      }
    }, 1000)
  }

  // 카테고리 선택 화면
  if (mode === 'category') {
    return (
      <div className="fade-in">
        <header className="header">
          <button className="back-btn" onClick={onBack}>←</button>
          <h1>📝 한자 학습</h1>
        </header>

        <div className="content">
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <p style={{ color: 'var(--text-secondary)' }}>
              JLPT N5 필수 한자 {kanjiData.length}자
            </p>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '1rem',
              marginTop: '0.5rem'
            }}>
              <span style={{ color: 'var(--success)' }}>
                ✅ {learnedKanji.length}자 학습
              </span>
              <span style={{ color: 'var(--text-secondary)' }}>
                📖 {kanjiData.length - learnedKanji.length}자 남음
              </span>
            </div>
          </div>

          <div className="progress-bar" style={{ marginBottom: '1.5rem' }}>
            <div 
              className="progress-fill" 
              style={{ width: `${(learnedKanji.length / kanjiData.length) * 100}%` }}
            />
          </div>

          <h3 style={{ marginBottom: '1rem', color: 'var(--accent)' }}>📚 카테고리별 학습</h3>
          
          <div className="category-grid">
            {Object.entries(kanjiCategories).map(([key, category]) => {
              const learned = category.kanji.filter(k => learnedKanji.includes(k)).length
              return (
                <div 
                  key={key}
                  className="category-item"
                  onClick={() => {
                    setSelectedCategory(key)
                    setCurrentIndex(0)
                    setShowDetails(false)
                    setMode('learn')
                  }}
                >
                  <div className="category-icon">{category.icon}</div>
                  <div className="category-name">{category.name}</div>
                  <div style={{ 
                    color: learned === category.kanji.length ? 'var(--success)' : 'var(--text-secondary)', 
                    fontSize: '0.8rem', 
                    marginTop: '0.3rem' 
                  }}>
                    {learned}/{category.kanji.length}자
                  </div>
                </div>
              )
            })}
          </div>

          <h3 style={{ margin: '1.5rem 0 1rem', color: 'var(--accent)' }}>🎯 퀴즈</h3>
          
          <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
            <button 
              className="btn"
              onClick={() => {
                setSelectedCategory(null)
                startQuiz('meaning')
              }}
            >
              📖 한자 → 뜻 퀴즈
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => {
                setSelectedCategory(null)
                startQuiz('reading')
              }}
            >
              🔊 한자 → 읽기 퀴즈
            </button>
          </div>
        </div>
      </div>
    )
  }

  // 학습 모드
  if (mode === 'learn') {
    const categoryKanji = getCategoryKanji(selectedCategory)
    const current = categoryKanji[currentIndex]
    const isLearned = learnedKanji.includes(current.kanji)

    return (
      <div className="fade-in">
        <header className="header">
          <button className="back-btn" onClick={() => setMode('category')}>←</button>
          <h1>{kanjiCategories[selectedCategory].icon} {kanjiCategories[selectedCategory].name}</h1>
          <span style={{ marginLeft: 'auto', color: 'var(--text-secondary)' }}>
            {currentIndex + 1} / {categoryKanji.length}
          </span>
        </header>

        <div className="content">
          {/* 한자 카드 */}
          <div 
            className="card" 
            style={{ textAlign: 'center', padding: '2rem', cursor: 'pointer' }}
            onClick={() => speakKanji(current)}
          >
            <div style={{ 
              fontSize: '8rem', 
              fontFamily: "'Noto Sans JP', sans-serif",
              marginBottom: '1rem',
              textShadow: '0 4px 20px rgba(233, 30, 99, 0.5)'
            }}>
              {current.kanji}
            </div>
            
            {isLearned && (
              <span style={{ 
                background: 'var(--success)', 
                color: 'white', 
                padding: '0.3rem 0.8rem', 
                borderRadius: '20px',
                fontSize: '0.8rem'
              }}>
                ✅ 학습완료
              </span>
            )}
          </div>

          {/* 기본 정보 */}
          <div className="card">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>음독 (온요미)</div>
                <div style={{ fontSize: '1.3rem', color: 'var(--accent)' }}>{current.onyomi || '-'}</div>
              </div>
              <div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>훈독 (쿤요미)</div>
                <div style={{ fontSize: '1.3rem', color: 'var(--primary)' }}>{current.kunyomi || '-'}</div>
              </div>
            </div>
            <div style={{ marginTop: '1rem', textAlign: 'center' }}>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>의미</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{current.meaning}</div>
            </div>
          </div>

          {/* 예시 */}
          <button 
            className="btn btn-secondary" 
            style={{ width: '100%', marginBottom: '1rem' }}
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? '예시 접기 ▲' : '예시 보기 ▼'}
          </button>

          {showDetails && (
            <div className="card fade-in">
              <div className="card-title">📝 예시 단어</div>
              {current.examples.map((ex, idx) => (
                <div 
                  key={idx} 
                  style={{ 
                    padding: '0.5rem 0', 
                    borderBottom: idx < current.examples.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    const word = ex.split(' ')[0]
                    speak(word, 0.7)
                  }}
                >
                  🔊 {ex}
                </div>
              ))}
            </div>
          )}

          {/* 네비게이션 */}
          <div className="nav-buttons">
            <button 
              className="btn btn-secondary" 
              onClick={() => {
                setCurrentIndex(Math.max(0, currentIndex - 1))
                setShowDetails(false)
              }}
              disabled={currentIndex === 0}
              style={{ opacity: currentIndex === 0 ? 0.5 : 1 }}
            >
              ← 이전
            </button>
            <button 
              className="btn" 
              onClick={() => {
                markAsLearned(current.kanji)
                if (currentIndex < categoryKanji.length - 1) {
                  setCurrentIndex(currentIndex + 1)
                  setShowDetails(false)
                }
              }}
              style={{ flex: 2 }}
            >
              {isLearned ? '다음 →' : '✓ 학습완료'}
            </button>
          </div>

          {/* 퀴즈 버튼 */}
          <button 
            className="btn btn-secondary" 
            style={{ width: '100%', marginTop: '1rem' }}
            onClick={() => startQuiz('meaning')}
          >
            🎯 이 카테고리 퀴즈 시작
          </button>

          {/* 진행률 */}
          <div className="progress-bar" style={{ marginTop: '1rem' }}>
            <div 
              className="progress-fill" 
              style={{ width: `${((currentIndex + 1) / categoryKanji.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    )
  }

  // 퀴즈 모드
  if (mode === 'quiz') {
    if (showResult) {
      const percentage = Math.round((score / quizKanji.length) * 100)
      return (
        <div className="fade-in">
          <header className="header">
            <button className="back-btn" onClick={() => setMode('category')}>←</button>
            <h1>퀴즈 결과</h1>
          </header>

          <div className="content">
            <div className="score-display">
              <div className="score-value">{percentage}%</div>
              <div className="score-label">{score} / {quizKanji.length} 정답</div>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              {percentage >= 80 ? (
                <p style={{ fontSize: '1.2rem' }}>🎉 훌륭해요!</p>
              ) : percentage >= 60 ? (
                <p style={{ fontSize: '1.2rem' }}>👍 잘했어요!</p>
              ) : (
                <p style={{ fontSize: '1.2rem' }}>💪 조금 더 연습해봐요!</p>
              )}
            </div>

            <button 
              className="btn" 
              style={{ width: '100%', marginBottom: '1rem' }}
              onClick={() => startQuiz(quizType)}
            >
              🔄 다시 도전
            </button>
            <button 
              className="btn btn-secondary" 
              style={{ width: '100%' }}
              onClick={() => setMode('category')}
            >
              📚 카테고리로 돌아가기
            </button>
          </div>
        </div>
      )
    }

    const current = quizKanji[quizIndex]
    const correct = quizType === 'meaning' ? current.meaning : current.onyomi

    return (
      <div className="fade-in">
        <header className="header">
          <button className="back-btn" onClick={() => setMode('category')}>←</button>
          <h1>{quizType === 'meaning' ? '뜻 맞추기' : '읽기 맞추기'}</h1>
          <span style={{ marginLeft: 'auto', color: 'var(--text-secondary)' }}>
            {quizIndex + 1} / {quizKanji.length}
          </span>
        </header>

        <div className="content">
          <div className="quiz-score-display">
            점수: <strong>{score}</strong>
          </div>

          <div className="quiz-question-card" onClick={() => speakKanji(current)}>
            <div className="quiz-subtitle">
              {quizType === 'meaning' ? '이 한자의 뜻은?' : '이 한자의 읽기는?'}
            </div>
            <div className="quiz-char" style={{ fontSize: '10rem' }}>
              {current.kanji}
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              🔊 터치하면 발음을 들을 수 있어요
            </p>
          </div>

          <div className="quiz-options-grid">
            {options.map((option, idx) => (
              <button
                key={idx}
                className={`quiz-option-btn ${
                  selected === option 
                    ? option === correct ? 'correct' : 'wrong'
                    : selected && option === correct ? 'correct' : ''
                }`}
                onClick={() => !selected && handleAnswer(option)}
                disabled={selected !== null}
                style={{ fontSize: '1.2rem' }}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((quizIndex + 1) / quizKanji.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Kanji

