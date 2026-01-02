import { useState, useEffect } from 'react'
import './App.css'
import Home from './components/Home'
import Learn from './components/Learn'
import Quiz from './components/Quiz'
import Words from './components/Words'
import Flashcard from './components/Flashcard'
import MatchGame from './components/MatchGame'
import TimeAttack from './components/TimeAttack'
import ListenQuiz from './components/ListenQuiz'
import Grammar from './components/Grammar'
import Conversation from './components/Conversation'
import JlptWords from './components/JlptWords'
import DailyGoal from './components/DailyGoal'
import Writing from './components/Writing'
import Restaurant from './components/Restaurant'
import Kanji from './components/Kanji'
import Travel from './components/Travel'
import Statistics from './components/Statistics'
import { loadProgress, updateStreak } from './utils/storage'
import { initSpeech, speak } from './utils/speech'

function App() {
  const [page, setPage] = useState('home')
  const [learnType, setLearnType] = useState('hiragana')
  const [progress, setProgress] = useState(null)
  const [speechInitialized, setSpeechInitialized] = useState(false)

  useEffect(() => {
    // 음성 초기화
    initSpeech().then(result => {
      console.log('음성 초기화:', result ? '성공' : '실패 또는 미지원')
    })
    
    // 진행 상태 로드 및 스트릭 업데이트
    const p = updateStreak()
    setProgress(p)

    // 모바일에서 첫 터치 시 음성 초기화 (iOS Safari 요구사항)
    const initOnFirstTouch = () => {
      if (!speechInitialized) {
        // 빈 음성 재생으로 오디오 컨텍스트 활성화
        if (window.speechSynthesis) {
          const utterance = new SpeechSynthesisUtterance('')
          utterance.volume = 0
          window.speechSynthesis.speak(utterance)
        }
        setSpeechInitialized(true)
        document.removeEventListener('touchstart', initOnFirstTouch)
        document.removeEventListener('click', initOnFirstTouch)
      }
    }

    document.addEventListener('touchstart', initOnFirstTouch, { once: true })
    document.addEventListener('click', initOnFirstTouch, { once: true })

    return () => {
      document.removeEventListener('touchstart', initOnFirstTouch)
      document.removeEventListener('click', initOnFirstTouch)
    }
  }, [])

  const navigate = (newPage, type = null) => {
    if (type) setLearnType(type)
    setPage(newPage)
  }

  const refreshProgress = () => {
    setProgress(loadProgress())
  }

  const renderPage = () => {
    switch (page) {
      case 'home':
        return <Home navigate={navigate} progress={progress} />
      case 'learn':
        return (
          <Learn 
            type={learnType} 
            onBack={() => navigate('home')} 
            refreshProgress={refreshProgress}
          />
        )
      case 'quiz':
        return (
          <Quiz 
            type={learnType} 
            onBack={() => navigate('home')} 
            refreshProgress={refreshProgress}
          />
        )
      case 'words':
        return (
          <Words 
            onBack={() => navigate('home')} 
            refreshProgress={refreshProgress}
          />
        )
      case 'flashcard':
        return <Flashcard onBack={() => navigate('home')} />
      case 'match':
        return <MatchGame onBack={() => navigate('home')} />
      case 'timeattack':
        return <TimeAttack onBack={() => navigate('home')} />
      case 'listen':
        return <ListenQuiz onBack={() => navigate('home')} />
      case 'grammar':
        return <Grammar onBack={() => navigate('home')} />
      case 'conversation':
        return <Conversation onBack={() => navigate('home')} />
      case 'jlpt':
        return <JlptWords onBack={() => navigate('home')} />
      case 'daily':
        return <DailyGoal onBack={() => navigate('home')} />
      case 'writing':
        return <Writing onBack={() => navigate('home')} />
      case 'restaurant':
        return <Restaurant onBack={() => navigate('home')} />
      case 'kanji':
        return <Kanji onBack={() => navigate('home')} />
      case 'travel':
        return <Travel onBack={() => navigate('home')} />
      case 'statistics':
        return <Statistics onBack={() => navigate('home')} />
      default:
        return <Home navigate={navigate} progress={progress} />
    }
  }

  return (
    <div className="app">
      {renderPage()}
    </div>
  )
}

export default App
