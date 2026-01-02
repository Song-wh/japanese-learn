// 학습 진행 저장 유틸리티 (localStorage)

const STORAGE_KEY = 'japanese-learn-progress';
const STATS_KEY = 'japanese-learn-stats';

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
  learnedKanji: [], // 학습한 한자
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

// 상세 통계 기본값
const defaultStats = {
  dailyActivity: {}, // { '2024-01-01': { studyTime: 10, quizCount: 5, correctCount: 3 } }
  weeklyData: [], // 주간 학습 데이터
  quizHistory: [], // { date, type, score, total }
  wrongAnswers: {}, // { 'あ': 3, 'か': 2 } 틀린 횟수
  totalQuizzes: 0,
  totalCorrect: 0,
  totalWrong: 0,
  totalStudySessions: 0,
  achievements: [], // 획득한 업적
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

// ============================================
// 상세 통계 관련 함수
// ============================================

// 상세 통계 불러오기
export const loadStats = () => {
  try {
    const saved = localStorage.getItem(STATS_KEY);
    if (saved) {
      return { ...defaultStats, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.error('통계 로드 실패:', e);
  }
  return defaultStats;
};

// 상세 통계 저장
export const saveStats = (stats) => {
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch (e) {
    console.error('통계 저장 실패:', e);
  }
};

// 오늘 날짜 키 생성
const getTodayKey = () => {
  return new Date().toISOString().split('T')[0];
};

// 학습 세션 기록
export const recordStudySession = (minutes = 1) => {
  const stats = loadStats();
  const today = getTodayKey();
  
  if (!stats.dailyActivity[today]) {
    stats.dailyActivity[today] = { studyTime: 0, quizCount: 0, correctCount: 0 };
  }
  
  stats.dailyActivity[today].studyTime += minutes;
  stats.totalStudySessions += 1;
  
  saveStats(stats);
  return stats;
};

// 퀴즈 결과 기록
export const recordQuizResult = (type, score, total, wrongItems = []) => {
  const stats = loadStats();
  const today = getTodayKey();
  
  // 일일 활동 업데이트
  if (!stats.dailyActivity[today]) {
    stats.dailyActivity[today] = { studyTime: 0, quizCount: 0, correctCount: 0 };
  }
  stats.dailyActivity[today].quizCount += 1;
  stats.dailyActivity[today].correctCount += score;
  
  // 퀴즈 히스토리 추가
  stats.quizHistory.push({
    date: today,
    type,
    score,
    total,
    percentage: Math.round((score / total) * 100)
  });
  
  // 최근 50개만 유지
  if (stats.quizHistory.length > 50) {
    stats.quizHistory = stats.quizHistory.slice(-50);
  }
  
  // 틀린 문제 기록
  wrongItems.forEach(item => {
    stats.wrongAnswers[item] = (stats.wrongAnswers[item] || 0) + 1;
  });
  
  // 총계 업데이트
  stats.totalQuizzes += 1;
  stats.totalCorrect += score;
  stats.totalWrong += (total - score);
  
  saveStats(stats);
  return stats;
};

// 최근 7일 데이터 가져오기
export const getWeeklyData = () => {
  const stats = loadStats();
  const data = [];
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const key = date.toISOString().split('T')[0];
    const dayName = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];
    
    const activity = stats.dailyActivity[key] || { studyTime: 0, quizCount: 0, correctCount: 0 };
    
    data.push({
      date: key,
      day: dayName,
      ...activity
    });
  }
  
  return data;
};

// 가장 많이 틀린 문자/단어 TOP 10
export const getTopWrongAnswers = (limit = 10) => {
  const stats = loadStats();
  const sorted = Object.entries(stats.wrongAnswers)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit);
  
  return sorted.map(([item, count]) => ({ item, count }));
};

// 전체 정답률 계산
export const getAccuracyRate = () => {
  const stats = loadStats();
  const total = stats.totalCorrect + stats.totalWrong;
  if (total === 0) return 0;
  return Math.round((stats.totalCorrect / total) * 100);
};

// 통계 초기화
export const resetStats = () => {
  localStorage.removeItem(STATS_KEY);
  return defaultStats;
};

