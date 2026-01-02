import { hiragana } from '../data/hiragana'
import { katakana } from '../data/katakana'

function Home({ navigate, progress }) {
  const hiraganaProgress = progress?.hiragana?.learned?.length || 0
  const katakanaProgress = progress?.katakana?.learned?.length || 0
  const streak = progress?.stats?.streak || 0

  return (
    <div className="content fade-in">
      {/* 로고 */}
      <div className="home-logo">
        <h1>🇯🇵 日本語</h1>
        <p>매일 조금씩 배우는 일본어</p>
      </div>

      {/* 스트릭 */}
      {streak > 0 && (
        <div 
          className="card" 
          style={{ 
            textAlign: 'center', 
            background: 'linear-gradient(135deg, #FF5722 0%, #E91E63 100%)',
            cursor: 'pointer'
          }}
          onClick={() => navigate('daily')}
        >
          <div style={{ fontSize: '2rem' }}>🔥</div>
          <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>{streak}일 연속 학습 중!</div>
          <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>탭해서 목표 & 배지 확인</div>
        </div>
      )}

      {/* 기본 학습 섹션 */}
      <div style={{ marginTop: '1.5rem' }}>
        <h2 style={{ fontSize: '1.1rem', color: 'var(--accent)', marginBottom: '1rem' }}>📚 기본 학습</h2>
        
        <div className="menu-grid">
          {/* 히라가나 */}
          <div className="menu-item" onClick={() => navigate('learn', 'hiragana')}>
            <div className="menu-icon">あ</div>
            <div className="menu-info">
              <h3>히라가나</h3>
              <p>기본 46자</p>
              <div className="progress-bar" style={{ width: '120px', marginTop: '0.5rem' }}>
                <div 
                  className="progress-fill" 
                  style={{ width: `${(hiraganaProgress / hiragana.length) * 100}%` }}
                />
              </div>
            </div>
            <div className="menu-progress">
              <div className="value">{hiraganaProgress}/{hiragana.length}</div>
            </div>
          </div>

          {/* 가타카나 */}
          <div className="menu-item" onClick={() => navigate('learn', 'katakana')}>
            <div className="menu-icon">ア</div>
            <div className="menu-info">
              <h3>가타카나</h3>
              <p>기본 46자</p>
              <div className="progress-bar" style={{ width: '120px', marginTop: '0.5rem' }}>
                <div 
                  className="progress-fill" 
                  style={{ width: `${(katakanaProgress / katakana.length) * 100}%` }}
                />
              </div>
            </div>
            <div className="menu-progress">
              <div className="value">{katakanaProgress}/{katakana.length}</div>
            </div>
          </div>

          {/* 기초 단어 */}
          <div className="menu-item" onClick={() => navigate('words')}>
            <div className="menu-icon">📝</div>
            <div className="menu-info">
              <h3>기초 단어</h3>
              <p>인사, 숫자, 가족 등</p>
            </div>
          </div>

          {/* JLPT N5 */}
          <div className="menu-item" onClick={() => navigate('jlpt')}>
            <div className="menu-icon">📖</div>
            <div className="menu-info">
              <h3>JLPT N5</h3>
              <p>필수 단어 100+</p>
            </div>
          </div>
        </div>
      </div>

      {/* 문법 & 회화 섹션 */}
      <div style={{ marginTop: '1.5rem' }}>
        <h2 style={{ fontSize: '1.1rem', color: 'var(--accent)', marginBottom: '1rem' }}>💬 문법 & 회화</h2>
        
        <div className="menu-grid">
          <div className="menu-item" onClick={() => navigate('grammar')}>
            <div className="menu-icon">📐</div>
            <div className="menu-info">
              <h3>기초 문법</h3>
              <p>~です, ~ます 등</p>
            </div>
          </div>

          <div className="menu-item" onClick={() => navigate('conversation')}>
            <div className="menu-icon">🗣️</div>
            <div className="menu-info">
              <h3>일상 회화</h3>
              <p>상황별 대화문</p>
            </div>
          </div>
        </div>
      </div>

      {/* 게임 & 퀴즈 섹션 */}
      <div style={{ marginTop: '1.5rem' }}>
        <h2 style={{ fontSize: '1.1rem', color: 'var(--accent)', marginBottom: '1rem' }}>🎮 게임 & 퀴즈</h2>
        
        <div className="menu-grid">
          <div className="menu-item" onClick={() => navigate('quiz', 'hiragana')}>
            <div className="menu-icon">🎯</div>
            <div className="menu-info">
              <h3>퀴즈</h3>
              <p>문자 → 발음 맞추기</p>
            </div>
          </div>

          <div className="menu-item" onClick={() => navigate('listen')}>
            <div className="menu-icon">🎧</div>
            <div className="menu-info">
              <h3>듣기 퀴즈</h3>
              <p>소리 듣고 문자 맞추기</p>
            </div>
          </div>

          <div className="menu-item" onClick={() => navigate('flashcard')}>
            <div className="menu-icon">🎴</div>
            <div className="menu-info">
              <h3>플래시카드</h3>
              <p>스와이프로 외우기</p>
            </div>
          </div>

          <div className="menu-item" onClick={() => navigate('match')}>
            <div className="menu-icon">🧩</div>
            <div className="menu-info">
              <h3>매칭 게임</h3>
              <p>짝 맞추기</p>
            </div>
          </div>

          <div className="menu-item" onClick={() => navigate('timeattack')}>
            <div className="menu-icon">⏱️</div>
            <div className="menu-info">
              <h3>타임어택</h3>
              <p>60초 챌린지</p>
            </div>
          </div>

          <div className="menu-item" onClick={() => navigate('writing')}>
            <div className="menu-icon">✍️</div>
            <div className="menu-info">
              <h3>손글씨 연습</h3>
              <p>직접 써보기</p>
            </div>
          </div>
        </div>
      </div>

      {/* 여행 & 맛집 */}
      <div style={{ marginTop: '1.5rem' }}>
        <h2 style={{ fontSize: '1.1rem', color: 'var(--accent)', marginBottom: '1rem' }}>🗾 여행 & 맛집</h2>
        
        <div className="menu-grid">
          <div className="menu-item" onClick={() => navigate('restaurant')}>
            <div className="menu-icon">🍜</div>
            <div className="menu-info">
              <h3>일본 맛집</h3>
              <p>맛집 저장 & 구글맵 길찾기</p>
            </div>
          </div>
        </div>
      </div>

      {/* 목표 & 배지 */}
      <div style={{ marginTop: '1.5rem' }}>
        <h2 style={{ fontSize: '1.1rem', color: 'var(--accent)', marginBottom: '1rem' }}>🏆 성취</h2>
        
        <div className="menu-item" onClick={() => navigate('daily')}>
          <div className="menu-icon">🎖️</div>
          <div className="menu-info">
            <h3>일일 목표 & 배지</h3>
            <p>성취도 확인 및 목표 설정</p>
          </div>
          {streak > 0 && (
            <div className="menu-progress">
              <div className="value">🔥 {streak}</div>
            </div>
          )}
        </div>
      </div>

      {/* 팁 */}
      <div className="card" style={{ marginTop: '2rem' }}>
        <div className="card-title">💡 오늘의 팁</div>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          {streak === 0 
            ? '히라가나는 일본어의 기본! 먼저 모음 5개(あいうえお)부터 시작해보세요! 🚀'
            : streak < 7
              ? `${streak}일째 학습 중! 7일 연속 달성하면 배지를 받을 수 있어요! 💪`
              : '대단해요! 꾸준히 잘 하고 있어요. 오늘도 조금씩 배워봐요! ⭐'
          }
        </p>
      </div>

      {/* 푸터 */}
      <div style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
        Made with ❤️ for Japanese learners
      </div>
    </div>
  )
}

export default Home
