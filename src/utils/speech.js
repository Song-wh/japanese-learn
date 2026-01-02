// 일본어 음성 재생 유틸리티 (Web Speech API)
// 모바일 호환성 개선 버전

let voices = []
let voicesLoaded = false
let japaneseVoice = null

// 음성 초기화 (앱 시작 시 호출)
export const initSpeech = () => {
  return new Promise((resolve) => {
    if (!window.speechSynthesis) {
      console.warn('음성 합성을 지원하지 않는 브라우저입니다.')
      resolve(false)
      return
    }

    const loadVoicesList = () => {
      voices = window.speechSynthesis.getVoices()
      if (voices.length > 0) {
        voicesLoaded = true
        // 일본어 음성 찾기 (우선순위: ja-JP > ja)
        japaneseVoice = voices.find(v => v.lang === 'ja-JP') 
          || voices.find(v => v.lang.startsWith('ja'))
          || null
        
        console.log(`음성 ${voices.length}개 로드됨, 일본어 음성: ${japaneseVoice?.name || '없음'}`)
        resolve(true)
      }
    }

    // 즉시 시도
    loadVoicesList()

    // 비동기 로드 대기 (Chrome, Edge 등)
    if (!voicesLoaded) {
      window.speechSynthesis.onvoiceschanged = () => {
        loadVoicesList()
      }
      
      // 타임아웃 (일부 모바일에서 이벤트가 안 오는 경우)
      setTimeout(() => {
        if (!voicesLoaded) {
          loadVoicesList()
          if (!voicesLoaded) resolve(false)
        }
      }, 1000)
    }
  })
}

// 음성 재생 (모바일 호환)
export const speak = (text, rate = 0.8) => {
  return new Promise((resolve, reject) => {
    if (!window.speechSynthesis) {
      console.warn('음성 합성을 지원하지 않는 브라우저입니다.')
      reject(new Error('음성 합성 미지원'))
      return
    }

    // 음성이 로드되지 않았으면 다시 시도
    if (!voicesLoaded) {
      voices = window.speechSynthesis.getVoices()
      japaneseVoice = voices.find(v => v.lang === 'ja-JP') 
        || voices.find(v => v.lang.startsWith('ja'))
        || null
      voicesLoaded = voices.length > 0
    }

    // 이전 음성 중단 (모바일에서 중요)
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'ja-JP'
    utterance.rate = rate
    utterance.pitch = 1
    utterance.volume = 1

    // 일본어 음성 설정
    if (japaneseVoice) {
      utterance.voice = japaneseVoice
    }

    // 이벤트 핸들러
    utterance.onend = () => {
      resolve()
    }
    
    utterance.onerror = (event) => {
      console.error('음성 오류:', event.error)
      // 일부 모바일에서 'interrupted' 에러는 무시
      if (event.error === 'interrupted' || event.error === 'canceled') {
        resolve()
      } else {
        reject(event)
      }
    }

    // iOS Safari 버그 해결: 짧은 딜레이 후 실행
    setTimeout(() => {
      window.speechSynthesis.speak(utterance)
      
      // Chrome 모바일 버그: 음성이 멈추는 현상 해결
      // 15초마다 resume 호출
      const resumeInterval = setInterval(() => {
        if (window.speechSynthesis.speaking) {
          window.speechSynthesis.pause()
          window.speechSynthesis.resume()
        } else {
          clearInterval(resumeInterval)
        }
      }, 14000)

      // 타임아웃 처리 (음성이 시작 안 되는 경우)
      setTimeout(() => {
        clearInterval(resumeInterval)
        if (window.speechSynthesis.speaking) {
          // 아직 말하고 있으면 대기
        } else if (window.speechSynthesis.pending) {
          // 대기 중이면 조금 더 기다림
        } else {
          // 아무것도 안 하고 있으면 완료 처리
          resolve()
        }
      }, 10000)
    }, 100)
  })
}

// 음성 즉시 재생 (사용자 인터랙션 이후)
export const speakWithFallback = async (text, rate = 0.8) => {
  try {
    await speak(text, rate)
  } catch (error) {
    console.warn('TTS 실패, 대체 방법 시도:', error)
    // 대체 방법: 새 Utterance 생성 후 재시도
    try {
      window.speechSynthesis.cancel()
      await new Promise(r => setTimeout(r, 100))
      await speak(text, rate)
    } catch (retryError) {
      console.error('TTS 재시도 실패:', retryError)
    }
  }
}

// 음성 목록 로드 (비동기)
export const loadVoices = () => {
  return new Promise((resolve) => {
    if (voicesLoaded && voices.length > 0) {
      resolve(voices)
      return
    }

    const voicesList = window.speechSynthesis.getVoices()
    if (voicesList.length > 0) {
      voices = voicesList
      voicesLoaded = true
      resolve(voices)
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        voices = window.speechSynthesis.getVoices()
        voicesLoaded = true
        resolve(voices)
      }
    }
  })
}

// 일본어 음성 사용 가능 여부 확인
export const hasJapaneseVoice = async () => {
  if (!window.speechSynthesis) return false
  const voiceList = await loadVoices()
  return voiceList.some(v => v.lang.includes('ja'))
}

// 음성 테스트 (사용자 인터랙션 필요)
export const testSpeech = async () => {
  try {
    await speak('あ', 1.0)
    return true
  } catch {
    return false
  }
}

// 지원 여부 확인
export const isSpeechSupported = () => {
  return 'speechSynthesis' in window
}
