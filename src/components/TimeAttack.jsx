import { useState, useEffect, useCallback } from 'react'
import { hiragana } from '../data/hiragana'
import { katakana } from '../data/katakana'
import { speak } from '../utils/speech'

function TimeAttack({ onBack }) {
  const [mode, setMode] = useState(null)
  const [questions, setQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [isRunning, setIsRunning] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [combo, setCombo] = useState(0)
  const [maxCombo, setMaxCombo] = useState(0)
  const [feedback, setFeedback] = useState(null)

  useEffect(() => {
    let interval
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            setIsRunning(false)
            setGameOver(true)
            return 0
          }
          return t - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning])

  const generateQuestion = useCallback((data) => {
    const correct = data[Math.floor(Math.random() * data.length)]
    const wrongOptions = data
      .filter(c => c.char !== correct.char)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
    
    const options = [...wrongOptions, correct].sort(() => Math.random() - 0.5)
    
    return {
      question: correct,
      options: options,
      correctAnswer: correct.romaji
    }
  }, [])

  const startGame = (selectedMode) => {
    setMode(selectedMode)
    const data = selectedMode === 'hiragana' ? hiragana : 
                 selectedMode === 'katakana' ? katakana :
                 [...hiragana, ...katakana]
    
    // 충분한 문제 생성
    const qs = Array(100).fill(null).map(() => generateQuestion(data))
    setQuestions(qs)
    setCurrentIndex(0)
    setScore(0)
    setCombo(0)
    setMaxCombo(0)
    setTimeLeft(60)
    setIsRunning(true)
    setGameOver(false)
    setFeedback(null)
  }

  const handleAnswer = (option) => {
    if (!isRunning) return
    
    const current = questions[currentIndex]
    const isCorrect = option.romaji === current.correctAnswer

    if (isCorrect) {
      // 콤보 보너스 적용
      const comboBonus = Math.floor(combo / 5)
      const points = 10 + comboBonus * 2
      setScore(score + points)
      setCombo(combo + 1)
      setMaxCombo(Math.max(maxCombo, combo + 1))
      setFeedback({ type: 'correct', points })
      speak(option.char)
      
      // 콤보로 시간 보너스
      if ((combo + 1) % 10 === 0) {
        setTimeLeft(t => Math.min(t + 5, 99))
      }
    } else {
      setCombo(0)
      setFeedback({ type: 'wrong' })
    }

    // 피드백 표시 후 다음 문제
    setTimeout(() => {
      setFeedback(null)
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1)
      }
    }, 200)
  }

  // 모드 선택
  if (!mode) {
    return (
      <div className="fade-in">
        <header className="header">
          <button className="back-btn" onClick={onBack}>←</button>
          <h1>타임어택</h1>
        </header>
        <div className="content">
          <div className="card" style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏱️</div>
            <h2>60초 챌린지!</h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              제한 시간 안에 최대한 많은 문제를 맞추세요!<br/>
              콤보를 이으면 보너스 점수 획득!
            </p>
          </div>
          
          <div className="menu-grid">
            <div className="menu-item" onClick={() => startGame('hiragana')}>
              <div className="menu-icon">あ</div>
              <div className="menu-info">
                <h3>히라가나</h3>
                <p>기본 46자</p>
              </div>
            </div>
            <div className="menu-item" onClick={() => startGame('katakana')}>
              <div className="menu-icon">ア</div>
              <div className="menu-info">
                <h3>가타카나</h3>
                <p>기본 46자</p>
              </div>
            </div>
            <div className="menu-item" onClick={() => startGame('both')}>
              <div className="menu-icon">🔥</div>
              <div className="menu-info">
                <h3>하드 모드</h3>
                <p>전체 92자</p>
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
          <h1>결과</h1>
        </header>
        <div className="content">
          <div className="score-display">
            <div style={{ fontSize: '4rem' }}>
              {score >= 200 ? '🏆' : score >= 100 ? '🎉' : '💪'}
            </div>
            <div className="score-value">{score}</div>
            <div className="score-label">점수</div>
          </div>
          
          <div className="stats-row">
            <div className="stat-item">
              <div className="stat-value">{currentIndex}</div>
              <div className="stat-label">문제 수</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{maxCombo}</div>
              <div className="stat-label">최대 콤보</div>
            </div>
          </div>

          <div className="card" style={{ textAlign: 'center', marginTop: '1rem' }}>
            <p style={{ color: 'var(--text-secondary)' }}>
              {score >= 200 
                ? '🔥 대단해요! 마스터 수준입니다!' 
                : score >= 100 
                  ? '👏 훌륭해요! 계속 연습하세요!'
                  : '💪 좋은 시작이에요! 다시 도전해보세요!'}
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
        <button className="back-btn" onClick={() => { setIsRunning(false); setMode(null); }}>←</button>
        <h1>타임어택</h1>
      </header>

      <div className="content">
        {/* 상단 정보 */}
        <div className="stats-row" style={{ marginBottom: '1rem' }}>
          <div className="stat-item" style={{ 
            background: timeLeft <= 10 ? 'rgba(244, 67, 54, 0.3)' : 'var(--bg-light)',
            animation: timeLeft <= 10 ? 'pulse 0.5s infinite' : 'none'
          }}>
            <div className="stat-value">{timeLeft}</div>
            <div className="stat-label">⏱️ 초</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{score}</div>
            <div className="stat-label">점수</div>
          </div>
          <div className="stat-item" style={{
            background: combo >= 5 ? 'rgba(255, 193, 7, 0.3)' : 'var(--bg-light)'
          }}>
            <div className="stat-value" style={{ color: combo >= 5 ? 'var(--accent)' : 'inherit' }}>
              {combo}
            </div>
            <div className="stat-label">🔥 콤보</div>
          </div>
        </div>

        {/* 문제 */}
        {current && (
          <>
            <div 
              className="card" 
              style={{ 
                textAlign: 'center', 
                padding: '2rem',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{ 
                fontSize: '5rem', 
                fontFamily: "'Noto Sans JP', sans-serif",
              }}>
                {current.question.char}
              </div>
              
              {/* 피드백 오버레이 */}
              {feedback && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: feedback.type === 'correct' 
                    ? 'rgba(76, 175, 80, 0.3)' 
                    : 'rgba(244, 67, 54, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '3rem',
                  animation: 'fadeIn 0.1s'
                }}>
                  {feedback.type === 'correct' ? `+${feedback.points}` : '✗'}
                </div>
              )}
            </div>

            {/* 선택지 */}
            <div className="quiz-options" style={{ marginTop: '1rem' }}>
              {current.options.map((option, idx) => (
                <div
                  key={idx}
                  className="quiz-option"
                  onClick={() => handleAnswer(option)}
                  style={{ padding: '1.5rem' }}
                >
                  <div style={{ fontSize: '1.3rem', color: 'var(--accent)' }}>
                    {option.romaji}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* 콤보 보너스 알림 */}
        {combo > 0 && combo % 5 === 0 && (
          <div style={{ 
            textAlign: 'center', 
            marginTop: '1rem',
            color: 'var(--accent)',
            animation: 'pulse 0.5s'
          }}>
            🔥 {combo} 콤보! 보너스 점수 +{Math.floor(combo / 5) * 2}
          </div>
        )}
      </div>
    </div>
  )
}

export default TimeAttack


