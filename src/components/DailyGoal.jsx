import { useState, useEffect } from 'react'
import { loadProgress, saveProgress } from '../utils/storage'

// 배지 정의
const badges = [
  { id: 'first_step', name: '첫 걸음', icon: '👣', description: '첫 학습 완료', condition: (p) => p.stats.totalStudyTime >= 1 },
  { id: 'hiragana_10', name: '히라가나 입문', icon: '🌱', description: '히라가나 10자 학습', condition: (p) => p.hiragana.learned.length >= 10 },
  { id: 'hiragana_all', name: '히라가나 마스터', icon: '🏆', description: '히라가나 전체 학습', condition: (p) => p.hiragana.learned.length >= 46 },
  { id: 'katakana_10', name: '가타카나 입문', icon: '🌿', description: '가타카나 10자 학습', condition: (p) => p.katakana.learned.length >= 10 },
  { id: 'katakana_all', name: '가타카나 마스터', icon: '🎖️', description: '가타카나 전체 학습', condition: (p) => p.katakana.learned.length >= 46 },
  { id: 'streak_3', name: '3일 연속', icon: '🔥', description: '3일 연속 학습', condition: (p) => p.stats.streak >= 3 },
  { id: 'streak_7', name: '일주일 챌린저', icon: '💪', description: '7일 연속 학습', condition: (p) => p.stats.streak >= 7 },
  { id: 'streak_30', name: '한 달 마스터', icon: '⭐', description: '30일 연속 학습', condition: (p) => p.stats.streak >= 30 },
  { id: 'quiz_80', name: '퀴즈 고수', icon: '🎯', description: '퀴즈 80% 이상', condition: (p) => p.hiragana.quizScore >= 80 || p.katakana.quizScore >= 80 },
  { id: 'quiz_100', name: '퍼펙트', icon: '💯', description: '퀴즈 100% 달성', condition: (p) => p.hiragana.quizScore >= 100 || p.katakana.quizScore >= 100 },
]

function DailyGoal({ onBack }) {
  const [progress, setProgress] = useState(null)
  const [dailyGoal, setDailyGoal] = useState(5) // 하루 목표 (단어 수)
  const [todayLearned, setTodayLearned] = useState(0)

  useEffect(() => {
    const p = loadProgress()
    setProgress(p)
    
    // 오늘 학습량 계산
    const today = new Date().toDateString()
    const hiraganaToday = p.hiragana.lastStudied?.startsWith(today) ? p.hiragana.learned.length : 0
    const katakanaToday = p.katakana.lastStudied?.startsWith(today) ? p.katakana.learned.length : 0
    setTodayLearned(hiraganaToday + katakanaToday)
    
    if (p.settings.dailyGoal) {
      setDailyGoal(p.settings.dailyGoal)
    }
  }, [])

  const updateDailyGoal = (newGoal) => {
    setDailyGoal(newGoal)
    const p = loadProgress()
    p.settings.dailyGoal = newGoal
    saveProgress(p)
  }

  const earnedBadges = badges.filter(badge => progress && badge.condition(progress))
  const unearnedBadges = badges.filter(badge => progress && !badge.condition(progress))

  const goalPercent = Math.min(100, Math.round((todayLearned / dailyGoal) * 100))

  if (!progress) {
    return (
      <div className="content">
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="fade-in">
      <header className="header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>일일 목표 & 배지</h1>
      </header>

      <div className="content">
        {/* 스트릭 */}
        <div className="card" style={{ 
          textAlign: 'center', 
          background: progress.stats.streak >= 7 
            ? 'linear-gradient(135deg, #FF5722 0%, #E91E63 100%)' 
            : 'var(--bg-card)'
        }}>
          <div style={{ fontSize: '3rem' }}>🔥</div>
          <div style={{ fontSize: '2.5rem', fontWeight: '700' }}>{progress.stats.streak}</div>
          <div style={{ color: 'var(--text-secondary)' }}>일 연속 학습 중!</div>
        </div>

        {/* 오늘의 목표 */}
        <div className="card" style={{ marginTop: '1rem' }}>
          <div className="card-title">🎯 오늘의 목표</div>
          
          <div style={{ textAlign: 'center', margin: '1rem 0' }}>
            <div style={{ 
              width: '150px', 
              height: '150px', 
              borderRadius: '50%',
              background: `conic-gradient(var(--primary) ${goalPercent}%, var(--bg-light) ${goalPercent}%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto'
            }}>
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: 'var(--bg-card)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{ fontSize: '2rem', fontWeight: '700' }}>{todayLearned}</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>/ {dailyGoal}</div>
              </div>
            </div>
            
            {goalPercent >= 100 && (
              <div style={{ marginTop: '1rem', color: 'var(--success)', fontSize: '1.2rem' }}>
                🎉 오늘 목표 달성!
              </div>
            )}
          </div>

          {/* 목표 설정 */}
          <div style={{ marginTop: '1rem' }}>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>일일 목표 설정</p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {[5, 10, 15, 20].map(goal => (
                <button
                  key={goal}
                  className={`btn ${dailyGoal === goal ? '' : 'btn-secondary'}`}
                  onClick={() => updateDailyGoal(goal)}
                  style={{ flex: 1, padding: '0.8rem' }}
                >
                  {goal}개
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 획득한 배지 */}
        <div className="card" style={{ marginTop: '1rem' }}>
          <div className="card-title">🏅 획득한 배지 ({earnedBadges.length}/{badges.length})</div>
          
          {earnedBadges.length > 0 ? (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
              gap: '1rem',
              marginTop: '1rem'
            }}>
              {earnedBadges.map(badge => (
                <div 
                  key={badge.id} 
                  style={{ 
                    textAlign: 'center',
                    padding: '1rem',
                    background: 'var(--bg-light)',
                    borderRadius: '12px'
                  }}
                >
                  <div style={{ fontSize: '2rem' }}>{badge.icon}</div>
                  <div style={{ fontSize: '0.8rem', marginTop: '0.3rem' }}>{badge.name}</div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginTop: '1rem' }}>
              아직 획득한 배지가 없어요. 학습을 시작해보세요!
            </p>
          )}
        </div>

        {/* 미획득 배지 */}
        {unearnedBadges.length > 0 && (
          <div className="card" style={{ marginTop: '1rem' }}>
            <div className="card-title">🔒 도전하세요!</div>
            <div style={{ marginTop: '1rem' }}>
              {unearnedBadges.slice(0, 5).map(badge => (
                <div 
                  key={badge.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '0.8rem',
                    background: 'var(--bg-light)',
                    borderRadius: '8px',
                    marginBottom: '0.5rem',
                    opacity: 0.6
                  }}
                >
                  <div style={{ fontSize: '1.5rem', filter: 'grayscale(100%)' }}>{badge.icon}</div>
                  <div>
                    <div style={{ fontWeight: '500' }}>{badge.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      {badge.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 학습 통계 */}
        <div className="card" style={{ marginTop: '1rem' }}>
          <div className="card-title">📊 학습 통계</div>
          <div className="stats-row" style={{ marginTop: '1rem' }}>
            <div className="stat-item">
              <div className="stat-value">{progress.hiragana.learned.length}</div>
              <div className="stat-label">히라가나</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{progress.katakana.learned.length}</div>
              <div className="stat-label">가타카나</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">
                {Math.max(progress.hiragana.quizScore, progress.katakana.quizScore)}%
              </div>
              <div className="stat-label">최고 점수</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DailyGoal




