import { useState, useEffect } from 'react'
import { hiragana } from '../data/hiragana'
import { katakana } from '../data/katakana'
import { speak } from '../utils/speech'

function ListenQuiz({ onBack }) {
  const [mode, setMode] = useState(null)
  const [questions, setQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [gameOver, setGameOver] = useState(false)
  const QUESTION_COUNT = 10

  const startGame = (selectedMode) => {
    setMode(selectedMode)
    const data = selectedMode === 'hiragana' ? hiragana : 
                 selectedMode === 'katakana' ? katakana :
                 [...hiragana, ...katakana]
    
    const shuffled = [...data].sort(() => Math.random() - 0.5)
    const selected = shuffled.slice(0, QUESTION_COUNT)
    
    const qs = selected.map(correct => {
      const wrongOptions = data
        .filter(c => c.char !== correct.char)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
      
      const options = [...wrongOptions, correct].sort(() => Math.random() - 0.5)
      
      return {
        question: correct,
        options: options,
        correctAnswer: correct.char
      }
    })
    
    setQuestions(qs)
    setCurrentIndex(0)
    setScore(0)
    setAnswered(false)
    setSelectedAnswer(null)
    setGameOver(false)
    
    // 첫 문제 발음
    setTimeout(() => speak(qs[0].question.char, 0.7), 500)
  }

  const playSound = () => {
    if (questions[currentIndex]) {
      speak(questions[currentIndex].question.char, 0.7)
    }
  }

  const handleAnswer = (option) => {
    if (answered) return
    
    setSelectedAnswer(option.char)
    setAnswered(true)
    
    if (option.char === questions[currentIndex].correctAnswer) {
      setScore(score + 1)
    }
  }

  const nextQuestion = () => {
    if (currentIndex < QUESTION_COUNT - 1) {
      const nextIdx = currentIndex + 1
      setCurrentIndex(nextIdx)
      setAnswered(false)
      setSelectedAnswer(null)
      // 자동 발음
      setTimeout(() => speak(questions[nextIdx].question.char, 0.7), 300)
    } else {
      setGameOver(true)
    }
  }

  // 모드 선택
  if (!mode) {
    return (
      <div className="fade-in">
        <header className="header">
          <button className="back-btn" onClick={onBack}>←</button>
          <h1>듣기 퀴즈</h1>
        </header>
        <div className="content">
          <div className="card" style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎧</div>
            <h2>소리를 듣고 맞추세요!</h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              발음을 듣고 올바른 문자를 선택하세요.<br/>
              귀로 익히면 더 빨리 배울 수 있어요!
            </p>
          </div>
          
          <div className="menu-grid">
            <div className="menu-item" onClick={() => startGame('hiragana')}>
              <div className="menu-icon">🎵</div>
              <div className="menu-info">
                <h3>히라가나</h3>
                <p>{QUESTION_COUNT}문제</p>
              </div>
            </div>
            <div className="menu-item" onClick={() => startGame('katakana')}>
              <div className="menu-icon">🎶</div>
              <div className="menu-info">
                <h3>가타카나</h3>
                <p>{QUESTION_COUNT}문제</p>
              </div>
            </div>
            <div className="menu-item" onClick={() => startGame('both')}>
              <div className="menu-icon">🎼</div>
              <div className="menu-info">
                <h3>전체</h3>
                <p>{QUESTION_COUNT}문제</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // 게임 종료
  if (gameOver) {
    const finalScore = Math.round((score / QUESTION_COUNT) * 100)
    return (
      <div className="fade-in">
        <header className="header">
          <button className="back-btn" onClick={() => setMode(null)}>←</button>
          <h1>결과</h1>
        </header>
        <div className="content">
          <div className="score-display">
            <div style={{ fontSize: '4rem' }}>
              {finalScore >= 80 ? '🎧' : finalScore >= 50 ? '👂' : '🔊'}
            </div>
            <div className="score-value">{finalScore}%</div>
            <div className="score-label">{score} / {QUESTION_COUNT} 정답</div>
          </div>

          <div className="card" style={{ textAlign: 'center', marginTop: '1rem' }}>
            <p style={{ color: 'var(--text-secondary)' }}>
              {finalScore >= 80 
                ? '🎉 훌륭해요! 귀가 트였네요!' 
                : finalScore >= 50 
                  ? '👏 좋아요! 조금 더 연습하면 완벽!'
                  : '💪 괜찮아요! 발음을 더 들어보세요!'}
            </p>
          </div>

          <div className="nav-buttons" style={{ marginTop: '2rem' }}>
            <button className="btn btn-secondary" onClick={() => setMode(null)}>
              뒤로
            </button>
            <button className="btn" onClick={() => startGame(mode)}>
              다시 도전 🔄
            </button>
          </div>
        </div>
      </div>
    )
  }

  const current = questions[currentIndex]

  return (
    <div className="fade-in">
      <header className="header">
        <button className="back-btn" onClick={() => setMode(null)}>←</button>
        <h1>듣기 퀴즈</h1>
        <span style={{ marginLeft: 'auto', color: 'var(--text-secondary)' }}>
          {currentIndex + 1} / {QUESTION_COUNT}
        </span>
      </header>

      <div className="content">
        {/* 진행률 */}
        <div className="progress-bar" style={{ marginBottom: '2rem' }}>
          <div 
            className="progress-fill" 
            style={{ width: `${((currentIndex + 1) / QUESTION_COUNT) * 100}%` }}
          />
        </div>

        {/* 재생 버튼 */}
        <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            🎧 소리를 듣고 맞추세요!
          </p>
          
          <button 
            className="play-btn pulse" 
            onClick={playSound}
            style={{ width: '100px', height: '100px', margin: '1rem auto' }}
          >
            <svg viewBox="0 0 24 24" style={{ width: '50px', height: '50px' }}>
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          </button>
          
          <p style={{ color: 'var(--accent)', fontSize: '0.9rem' }}>
            클릭해서 다시 듣기
          </p>
        </div>

        {/* 선택지 (문자) */}
        {current && (
          <div className="quiz-options" style={{ marginTop: '1.5rem' }}>
            {current.options.map((option, idx) => {
              let className = 'quiz-option'
              if (answered) {
                if (option.char === current.correctAnswer) {
                  className += ' correct'
                } else if (option.char === selectedAnswer) {
                  className += ' wrong'
                }
              }
              
              return (
                <div 
                  key={idx}
                  className={className}
                  onClick={() => handleAnswer(option)}
                  style={{ fontSize: '2.5rem', fontFamily: "'Noto Sans JP', sans-serif" }}
                >
                  {option.char}
                </div>
              )
            })}
          </div>
        )}

        {/* 다음 버튼 */}
        {answered && (
          <button className="btn" onClick={nextQuestion} style={{ width: '100%', marginTop: '1.5rem' }}>
            {currentIndex < QUESTION_COUNT - 1 ? '다음 문제 →' : '결과 보기 🎯'}
          </button>
        )}

        {/* 현재 점수 */}
        <div style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-secondary)' }}>
          현재 점수: <span style={{ color: 'var(--accent)', fontWeight: '700' }}>{score}</span>
        </div>
      </div>
    </div>
  )
}

export default ListenQuiz

