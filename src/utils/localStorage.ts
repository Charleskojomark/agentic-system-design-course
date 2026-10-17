import { UserProgress } from '../types/progress';

const STORAGE_KEY = 'agentic_course_progress_v1';

export const defaultProgress: UserProgress = {
  studentName: 'Agentic Architect',
  totalXp: 0,
  currentStreak: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  completedLessons: [],
  completedBeats: {},
  completedBossChallenges: [],
  quizScores: {},
  earnedBadges: [],
  checklistCompletedItems: [],
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
    // Continued streak!
    return {
      ...prog,
      currentStreak: prog.currentStreak + 1,
      lastActiveDate: today,
    };
  } else {
    // Broken streak
    return {
      ...prog,
      currentStreak: 1,
      lastActiveDate: today,
    };
  }
}
