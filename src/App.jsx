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
import { loadProgress, updateStreak } from './utils/storage'
import { loadVoices } from './utils/speech'

function App() {
  const [page, setPage] = useState('home')
  const [learnType, setLearnType] = useState('hiragana')
  const [progress, setProgress] = useState(null)

  useEffect(() => {
    // 음성 로드
    loadVoices()
    
    // 진행 상태 로드 및 스트릭 업데이트
    const p = updateStreak()
    setProgress(p)
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
