import { useState, useEffect } from 'react'
import { 
  loadProgress, 
  loadStats, 
  getWeeklyData, 
  getTopWrongAnswers, 
  getAccuracyRate,
  resetStats
} from '../utils/storage'
import { kanjiData } from '../data/kanji'

function Statistics({ onBack }) {
  const [progress, setProgress] = useState(null)
  const [stats, setStats] = useState(null)
  const [weeklyData, setWeeklyData] = useState([])
  const [topWrong, setTopWrong] = useState([])
  const [accuracy, setAccuracy] = useState(0)
  const [showResetConfirm, setShowResetConfirm] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    setProgress(loadProgress())
    setStats(loadStats())
    setWeeklyData(getWeeklyData())
    setTopWrong(getTopWrongAnswers(10))
    setAccuracy(getAccuracyRate())
  }

  const handleReset = () => {
    resetStats()
    loadData()
    setShowResetConfirm(false)
  }

  if (!progress || !stats) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    )
  }

  const hiraganaProgress = Math.round((progress.hiragana.learned.length / 46) * 100)
  const katakanaProgress = Math.round((progress.katakana.learned.length / 46) * 100)
  const kanjiProgress = Math.round(((progress.learnedKanji?.length || 0) / kanjiData.length) * 100)
  
  const totalStudyTime = weeklyData.reduce((sum, d) => sum + d.studyTime, 0)
  const totalQuizzes = weeklyData.reduce((sum, d) => sum + d.quizCount, 0)
  const maxStudyTime = Math.max(...weeklyData.map(d => d.studyTime), 1)

  return (
    <div className="fade-in">
      <header className="header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>📊 학습 통계</h1>
      </header>

      <div className="content">
        {/* 연속 학습 & 정답률 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <div className="card" style={{ textAlign: 'center', padding: '1.5rem' }}>
            <div style={{ fontSize: '3rem' }}>🔥</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent)' }}>
              {progress.stats.streak}일
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>연속 학습</div>
          </div>
          <div className="card" style={{ textAlign: 'center', padding: '1.5rem' }}>
            <div style={{ fontSize: '3rem' }}>🎯</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--success)' }}>
              {accuracy}%
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>전체 정답률</div>
          </div>
        </div>

        {/* 주간 차트 */}
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <div className="card-title">📈 주간 학습 활동</div>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            height: '120px',
            padding: '1rem 0'
          }}>
            {weeklyData.map((day, idx) => {
              const height = day.studyTime > 0 
                ? Math.max((day.studyTime / maxStudyTime) * 100, 10) 
                : 5
              const isToday = idx === 6
              
              return (
                <div key={idx} style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  flex: 1
                }}>
                  <div style={{ 
                    color: 'var(--accent)', 
                    fontSize: '0.8rem',
                    marginBottom: '0.3rem'
                  }}>
                    {day.studyTime > 0 ? day.studyTime : ''}
                  </div>
                  <div style={{
                    width: '60%',
                    height: `${height}px`,
                    background: isToday 
                      ? 'var(--gradient)' 
                      : day.studyTime > 0 
                        ? 'var(--primary)' 
                        : 'var(--bg-light)',
                    borderRadius: '4px 4px 0 0',
                    transition: 'height 0.3s'
                  }} />
                  <div style={{ 
                    marginTop: '0.5rem', 
                    fontSize: '0.8rem',
                    color: isToday ? 'var(--accent)' : 'var(--text-secondary)',
                    fontWeight: isToday ? 'bold' : 'normal'
                  }}>
                    {day.day}
                  </div>
                </div>
              )
            })}
          </div>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-around', 
            paddingTop: '1rem',
            borderTop: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                {totalStudyTime}분
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>이번 주 학습</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent)' }}>
                {totalQuizzes}회
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>퀴즈 도전</div>
            </div>
          </div>
        </div>

        {/* 학습 진도 */}
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <div className="card-title">📚 학습 진도</div>
          
          {/* 히라가나 */}
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>あ 히라가나</span>
              <span style={{ color: 'var(--accent)' }}>
                {progress.hiragana.learned.length}/46 ({hiraganaProgress}%)
              </span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${hiraganaProgress}%` }} />
            </div>
          </div>

          {/* 가타카나 */}
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>ア 가타카나</span>
              <span style={{ color: 'var(--accent)' }}>
                {progress.katakana.learned.length}/46 ({katakanaProgress}%)
              </span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${katakanaProgress}%` }} />
            </div>
          </div>

          {/* 한자 */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>📝 한자 (N5)</span>
              <span style={{ color: 'var(--accent)' }}>
                {progress.learnedKanji?.length || 0}/{kanjiData.length} ({kanjiProgress}%)
              </span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${kanjiProgress}%` }} />
            </div>
          </div>
        </div>

        {/* 퀴즈 통계 */}
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <div className="card-title">🎮 퀴즈 통계</div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                {stats.totalQuizzes}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>총 퀴즈</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--success)' }}>
                {stats.totalCorrect}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>정답</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--error)' }}>
                {stats.totalWrong}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>오답</div>
            </div>
          </div>

          {/* 최근 퀴즈 히스토리 */}
          {stats.quizHistory.length > 0 && (
            <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                최근 퀴즈
              </div>
              {stats.quizHistory.slice(-5).reverse().map((quiz, idx) => (
                <div key={idx} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  padding: '0.5rem 0',
                  borderBottom: idx < 4 ? '1px solid rgba(255,255,255,0.05)' : 'none'
                }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    {quiz.type} ({quiz.date})
                  </span>
                  <span style={{ 
                    color: quiz.percentage >= 80 ? 'var(--success)' : quiz.percentage >= 60 ? 'var(--accent)' : 'var(--error)',
                    fontWeight: 'bold'
                  }}>
                    {quiz.score}/{quiz.total} ({quiz.percentage}%)
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 자주 틀리는 문제 */}
        {topWrong.length > 0 && (
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <div className="card-title">⚠️ 자주 틀리는 문제 TOP 10</div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
              이 문제들을 집중적으로 복습해보세요!
            </p>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {topWrong.map((item, idx) => (
                <div key={idx} style={{
                  background: idx < 3 ? 'rgba(244, 67, 54, 0.2)' : 'var(--bg-light)',
                  border: idx < 3 ? '1px solid var(--error)' : '1px solid transparent',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span style={{ 
                    fontSize: '1.5rem',
                    fontFamily: "'Noto Sans JP', sans-serif"
                  }}>
                    {item.item}
                  </span>
                  <span style={{ 
                    fontSize: '0.8rem',
                    color: 'var(--error)'
                  }}>
                    ×{item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 업적 */}
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <div className="card-title">🏆 업적</div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
            {[
              { icon: '🔥', name: '첫 학습', achieved: progress.stats.streak >= 1 },
              { icon: '📅', name: '7일 연속', achieved: progress.stats.streak >= 7 },
              { icon: '🗓️', name: '30일 연속', achieved: progress.stats.streak >= 30 },
              { icon: '📚', name: '히라가나 완료', achieved: progress.hiragana.learned.length >= 46 },
              { icon: '📖', name: '가타카나 완료', achieved: progress.katakana.learned.length >= 46 },
              { icon: '🎯', name: '첫 퀴즈', achieved: stats.totalQuizzes >= 1 },
              { icon: '💯', name: '퀴즈 10회', achieved: stats.totalQuizzes >= 10 },
              { icon: '🏅', name: '정답률 90%+', achieved: accuracy >= 90 },
            ].map((badge, idx) => (
              <div key={idx} style={{
                textAlign: 'center',
                padding: '0.8rem 0.5rem',
                background: badge.achieved ? 'rgba(76, 175, 80, 0.2)' : 'var(--bg-light)',
                borderRadius: '12px',
                opacity: badge.achieved ? 1 : 0.4
              }}>
                <div style={{ fontSize: '1.8rem' }}>{badge.icon}</div>
                <div style={{ fontSize: '0.7rem', marginTop: '0.3rem', color: 'var(--text-secondary)' }}>
                  {badge.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 초기화 버튼 */}
        <button 
          className="btn btn-secondary" 
          style={{ width: '100%', opacity: 0.7 }}
          onClick={() => setShowResetConfirm(true)}
        >
          🗑️ 통계 초기화
        </button>

        {/* 초기화 확인 모달 */}
        {showResetConfirm && (
          <div className="modal-overlay" onClick={() => setShowResetConfirm(false)}>
            <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '350px' }}>
              <div className="modal-header">
                <h2>통계 초기화</h2>
                <button className="close-btn" onClick={() => setShowResetConfirm(false)}>×</button>
              </div>
              <div style={{ padding: '1.5rem', textAlign: 'center' }}>
                <p style={{ marginBottom: '1.5rem' }}>
                  퀴즈 기록과 통계가 모두 삭제됩니다.<br/>
                  학습 진도는 유지됩니다.
                </p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button 
                    className="btn btn-secondary" 
                    style={{ flex: 1 }}
                    onClick={() => setShowResetConfirm(false)}
                  >
                    취소
                  </button>
                  <button 
                    className="btn" 
                    style={{ flex: 1, background: 'var(--error)' }}
                    onClick={handleReset}
                  >
                    초기화
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Statistics





