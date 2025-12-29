// 학습 진행 저장 유틸리티 (localStorage)

const STORAGE_KEY = 'japanese-learn-progress';

// 기본 진행 상태
const defaultProgress = {
  hiragana: {
    learned: [], // 학습한 문자들
    mastered: [], // 마스터한 문자들
    quizScore: 0,
    lastStudied: null,
  },
  katakana: {
    learned: [],
    mastered: [],
    quizScore: 0,
    lastStudied: null,
  },
  words: {
    learned: {}, // 카테고리별 학습한 단어
    lastStudied: null,
  },
  settings: {
    speechRate: 0.8,
    autoPlay: true,
    darkMode: false,
    dailyGoal: 5,
  },
  stats: {
    totalStudyTime: 0,
    streak: 0,
    lastVisit: null,
  }
};

// 진행 상태 불러오기
export const loadProgress = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return { ...defaultProgress, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.error('진행 상태 로드 실패:', e);
  }
  return defaultProgress;
};

// 진행 상태 저장
export const saveProgress = (progress) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('진행 상태 저장 실패:', e);
  }
};

// 특정 문자 학습 완료 표시
export const markAsLearned = (type, char) => {
  const progress = loadProgress();
  if (!progress[type].learned.includes(char)) {
    progress[type].learned.push(char);
    progress[type].lastStudied = new Date().toISOString();
    saveProgress(progress);
  }
  return progress;
};

// 특정 문자 마스터 표시
export const markAsMastered = (type, char) => {
  const progress = loadProgress();
  if (!progress[type].mastered.includes(char)) {
    progress[type].mastered.push(char);
    saveProgress(progress);
  }
  return progress;
};

// 퀴즈 점수 업데이트
export const updateQuizScore = (type, score) => {
  const progress = loadProgress();
  if (score > progress[type].quizScore) {
    progress[type].quizScore = score;
    saveProgress(progress);
  }
  return progress;
};

// 스트릭 업데이트
export const updateStreak = () => {
  const progress = loadProgress();
  const today = new Date().toDateString();
  const lastVisit = progress.stats.lastVisit;

  if (lastVisit) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (lastVisit === yesterday.toDateString()) {
      progress.stats.streak += 1;
    } else if (lastVisit !== today) {
      progress.stats.streak = 1;
    }
  } else {
    progress.stats.streak = 1;
  }

  progress.stats.lastVisit = today;
  saveProgress(progress);
  return progress;
};

// 설정 저장
export const saveSettings = (settings) => {
  const progress = loadProgress();
  progress.settings = { ...progress.settings, ...settings };
  saveProgress(progress);
  return progress;
};

// 진행 초기화
export const resetProgress = () => {
  localStorage.removeItem(STORAGE_KEY);
  return defaultProgress;
};

