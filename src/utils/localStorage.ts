import { UserProgress } from '../types';

const STORAGE_KEY = 'agentic_course_progress_v2';

export const defaultProgress: UserProgress = {
  xp: 0,
  streak: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  completedBeats: [],
  completedModules: [],
  unlockedBadges: [],
  quizScores: {},
};

export function loadProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return updateStreakOnLoad(defaultProgress);
    const parsed = JSON.parse(raw);
    return updateStreakOnLoad({ ...defaultProgress, ...parsed });
  } catch (err) {
    console.error('Failed to load progress from localStorage', err);
    return defaultProgress;
  }
}

export function saveProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (err) {
    console.error('Failed to save progress to localStorage', err);
  }
}

function updateStreakOnLoad(prog: UserProgress): UserProgress {
  const today = new Date().toISOString().split('T')[0];
  const lastDate = prog.lastActiveDate;

  if (lastDate === today) {
    return prog;
  }

  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  if (lastDate === yesterday) {
    return {
      ...prog,
      streak: (prog.streak || 0) + 1,
      lastActiveDate: today,
    };
  } else {
    return {
      ...prog,
      streak: 1,
      lastActiveDate: today,
    };
  }
}
