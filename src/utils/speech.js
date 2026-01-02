// 일본어 음성 재생 유틸리티 (Web Speech API)

export const speak = (text, rate = 0.8) => {
  return new Promise((resolve, reject) => {
    if (!window.speechSynthesis) {
      reject(new Error('음성 합성을 지원하지 않는 브라우저입니다.'));
      return;
    }

    // 이전 음성 중단
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP'; // 일본어
    utterance.rate = rate; // 속도 (0.1 ~ 10, 기본 1)
    utterance.pitch = 1; // 피치 (0 ~ 2, 기본 1)
    utterance.volume = 1; // 볼륨 (0 ~ 1)

    // 일본어 음성 찾기
    const voices = window.speechSynthesis.getVoices();
    const japaneseVoice = voices.find(v => v.lang.includes('ja'));
    if (japaneseVoice) {
      utterance.voice = japaneseVoice;
    }

    utterance.onend = () => resolve();
    utterance.onerror = (e) => reject(e);

    window.speechSynthesis.speak(utterance);
  });
};

// 음성 목록 로드 (비동기)
export const loadVoices = () => {
  return new Promise((resolve) => {
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      resolve(voices);
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        resolve(window.speechSynthesis.getVoices());
      };
    }
  });
};

// 일본어 음성 사용 가능 여부 확인
export const hasJapaneseVoice = async () => {
  const voices = await loadVoices();
  return voices.some(v => v.lang.includes('ja'));
};


