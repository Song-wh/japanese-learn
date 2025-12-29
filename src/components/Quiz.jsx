import { useState, useEffect } from 'react'
import { hiragana } from '../data/hiragana'
import { katakana } from '../data/katakana'
import { speak } from '../utils/speech'
import { updateQuizScore } from '../utils/storage'

function Quiz({ type, onBack, refreshProgress }) {
  const [questions, setQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [gameOver, setGameOver] = useState(false)

  const data = type === 'hiragana' ? hiragana : katakana
  const title = type === 'hiragana' ? '히라가나' : '가타카나'
  const QUESTION_COUNT = 10

  useEffect(() => {
    generateQuestions()
  }, [])

  const generateQuestions = () => {
    // 랜덤 10문제 생성
    const shuffled = [...data].sort(() => Math.random() - 0.5)
    const selected = shuffled.slice(0, QUESTION_COUNT)
    
    const qs = selected.map(correct => {
      // 오답 3개 생성
      const wrongOptions = data
        .filter(c => c.char !== correct.char)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
      
      // 정답 포함해서 섞기
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
  }

  const handleAnswer = (option) => {
    if (answered) return
    
    setSelectedAnswer(option.char)
    setAnswered(true)
    
    if (option.char === questions[currentIndex].correctAnswer) {
      setScore(score + 1)
      speak(option.char) // 정답이면 발음 재생
    }
  }

  const nextQuestion = () => {
    if (currentIndex < QUESTION_COUNT - 1) {
      setCurrentIndex(currentIndex + 1)
      setAnswered(false)
      setSelectedAnswer(null)
    } else {
      // 게임 종료
      const finalScore = Math.round(((score + (selectedAnswer === questions[currentIndex].correctAnswer ? 1 : 0)) / QUESTION_COUNT) * 100)
      updateQuizScore(type, finalScore)
      refreshProgress()
      setGameOver(true)
    }
  }

  const playQuestionSound = () => {
    if (questions[currentIndex]) {
      speak(questions[currentIndex].question.char)
    }
  }

  if (gameOver) {
    const finalScore = Math.round((score / QUESTION_COUNT) * 100)
    return (
      <div className="fade-in">
        <header className="header">
          <button className="back-btn" onClick={onBack}>←</button>
          <h1>{title} 퀴즈</h1>
        </header>

        <div className="content">
          <div className="card score-display">
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
              {finalScore >= 80 ? '🎉' : finalScore >= 50 ? '👍' : '💪'}
            </div>
            <div className="score-value">{finalScore}%</div>
            <div className="score-label">{score} / {QUESTION_COUNT} 정답</div>
            
            <p style={{ marginTop: '2rem', color: 'var(--text-secondary)' }}>
              {finalScore >= 80 
                ? '훌륭해요! 완벽에 가까워요! 🌟' 
                : finalScore >= 50 
                  ? '좋아요! 조금만 더 연습하면 완벽해요!' 
                  : '괜찮아요! 다시 학습하고 도전해보세요!'}
            </p>
          </div>

          <div className="nav-buttons">
            <button className="btn btn-secondary" onClick={onBack}>
              홈으로
            </button>
            <button className="btn" onClick={generateQuestions}>
              다시 도전 🔄
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="content">
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    )
  }

  const current = questions[currentIndex]

  return (
    <div className="fade-in">
      <header className="header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>{title} 퀴즈</h1>
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

        {/* 문제 카드 */}
        <div className="quiz-question-card">
          <p className="quiz-subtitle">이 글자의 발음은?</p>
          <div className="quiz-char">{current.question.char}</div>
          <button className="quiz-sound-btn" onClick={playQuestionSound}>
            🔊
          </button>
        </div>

        {/* 선택지 - 2x2 그리드 */}
        <div className="quiz-options-grid">
          {current.options.map((option, idx) => {
            let className = 'quiz-option-btn'
            if (answered) {
              if (option.char === current.correctAnswer) {
                className += ' correct'
              } else if (option.char === selectedAnswer) {
                className += ' wrong'
              }
            }
            
            return (
              <button 
                key={idx}
                className={className}
                onClick={() => handleAnswer(option)}
                disabled={answered}
              >
                {option.romaji}
              </button>
            )
          })}
        </div>

        {/* 현재 점수 */}
        <div className="quiz-score-display">
          현재 점수: <strong>{score}</strong> / {currentIndex + (answered ? 1 : 0)}
        </div>

        {/* 다음 버튼 */}
        {answered && (
          <button className="quiz-next-btn" onClick={nextQuestion}>
            {currentIndex < QUESTION_COUNT - 1 ? '다음 문제 →' : '결과 보기 🎯'}
          </button>
        )}
      </div>
    </div>
  )
}

export default Quiz

