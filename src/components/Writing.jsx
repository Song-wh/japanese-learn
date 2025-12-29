import { useState, useRef, useEffect } from 'react'
import { hiragana } from '../data/hiragana'
import { katakana } from '../data/katakana'
import { speak } from '../utils/speech'

function Writing({ onBack }) {
  const canvasRef = useRef(null)
  const [mode, setMode] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDrawing, setIsDrawing] = useState(false)
  const [showGuide, setShowGuide] = useState(true)

  const data = mode === 'hiragana' ? hiragana : mode === 'katakana' ? katakana : []
  const currentChar = data[currentIndex]

  useEffect(() => {
    if (canvasRef.current && currentChar) {
      clearCanvas()
    }
  }, [currentIndex, mode])

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#16213e'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // 가이드 표시
    if (showGuide) {
      ctx.font = '200px "Noto Sans JP"'
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(currentChar?.char || '', canvas.width / 2, canvas.height / 2)
    }
    
    // 그리드
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(canvas.width / 2, 0)
    ctx.lineTo(canvas.width / 2, canvas.height)
    ctx.moveTo(0, canvas.height / 2)
    ctx.lineTo(canvas.width, canvas.height / 2)
    ctx.stroke()
  }

  const getPos = (e) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    
    if (e.touches) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY
      }
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    }
  }

  const startDrawing = (e) => {
    e.preventDefault()
    setIsDrawing(true)
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const pos = getPos(e)
    ctx.beginPath()
    ctx.moveTo(pos.x, pos.y)
    ctx.strokeStyle = '#E91E63'
    ctx.lineWidth = 8
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
  }

  const draw = (e) => {
    if (!isDrawing) return
    e.preventDefault()
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const pos = getPos(e)
    ctx.lineTo(pos.x, pos.y)
    ctx.stroke()
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const nextChar = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1)
      speak(data[currentIndex + 1].char)
    }
  }

  const prevChar = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      speak(data[currentIndex - 1].char)
    }
  }

  // 모드 선택
  if (!mode) {
    return (
      <div className="fade-in">
        <header className="header">
          <button className="back-btn" onClick={onBack}>←</button>
          <h1>손글씨 연습</h1>
        </header>
        <div className="content">
          <div className="card" style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✍️</div>
            <h2>직접 써보세요!</h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              화면에 손가락이나 마우스로<br/>
              일본어 문자를 따라 써보세요!
            </p>
          </div>
          
          <div className="menu-grid">
            <div className="menu-item" onClick={() => { setMode('hiragana'); setCurrentIndex(0); }}>
              <div className="menu-icon">あ</div>
              <div className="menu-info">
                <h3>히라가나</h3>
                <p>46자 쓰기 연습</p>
              </div>
            </div>
            <div className="menu-item" onClick={() => { setMode('katakana'); setCurrentIndex(0); }}>
              <div className="menu-icon">ア</div>
              <div className="menu-info">
                <h3>가타카나</h3>
                <p>46자 쓰기 연습</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fade-in">
      <header className="header">
        <button className="back-btn" onClick={() => setMode(null)}>←</button>
        <h1>{mode === 'hiragana' ? '히라가나' : '가타카나'} 쓰기</h1>
        <span style={{ marginLeft: 'auto', color: 'var(--text-secondary)' }}>
          {currentIndex + 1} / {data.length}
        </span>
      </header>

      <div className="content">
        {/* 현재 문자 정보 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <div 
            style={{ 
              fontSize: '4rem', 
              fontFamily: "'Noto Sans JP', sans-serif",
              cursor: 'pointer'
            }}
            onClick={() => speak(currentChar.char)}
          >
            {currentChar?.char}
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '1.5rem', color: 'var(--accent)' }}>{currentChar?.romaji}</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>🔊 터치해서 발음 듣기</div>
          </div>
        </div>

        {/* 캔버스 */}
        <div style={{ 
          background: 'var(--bg-card)', 
          borderRadius: '16px', 
          padding: '1rem',
          touchAction: 'none'
        }}>
          <canvas
            ref={canvasRef}
            width={300}
            height={300}
            style={{ 
              width: '100%', 
              maxWidth: '300px',
              height: 'auto',
              aspectRatio: '1',
              display: 'block',
              margin: '0 auto',
              borderRadius: '12px',
              cursor: 'crosshair'
            }}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
        </div>

        {/* 컨트롤 */}
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
          <button 
            className="btn btn-secondary" 
            onClick={clearCanvas}
            style={{ flex: 1 }}
          >
            🗑️ 지우기
          </button>
          <button 
            className="btn btn-secondary" 
            onClick={() => setShowGuide(!showGuide)}
            style={{ flex: 1 }}
          >
            {showGuide ? '👁️ 가이드 숨기기' : '👁️ 가이드 보기'}
          </button>
        </div>

        {/* 네비게이션 */}
        <div className="nav-buttons" style={{ marginTop: '1rem' }}>
          <button 
            className="btn btn-secondary" 
            onClick={prevChar}
            disabled={currentIndex === 0}
            style={{ opacity: currentIndex === 0 ? 0.5 : 1 }}
          >
            ← 이전
          </button>
          <button 
            className="btn" 
            onClick={nextChar}
            disabled={currentIndex === data.length - 1}
            style={{ opacity: currentIndex === data.length - 1 ? 0.5 : 1 }}
          >
            다음 →
          </button>
        </div>

        {/* 진행률 */}
        <div className="progress-bar" style={{ marginTop: '1.5rem' }}>
          <div 
            className="progress-fill" 
            style={{ width: `${((currentIndex + 1) / data.length) * 100}%` }}
          />
        </div>

        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '1rem', fontSize: '0.9rem' }}>
          💡 가이드를 보면서 따라 써보세요!
        </p>
      </div>
    </div>
  )
}

export default Writing

