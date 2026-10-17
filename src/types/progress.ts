export interface UserProgress {
  studentName: string;
  totalXp: number;
  currentStreak: number;
  lastActiveDate: string; // YYYY-MM-DD
  completedLessons: string[]; // array of lesson IDs
  completedBeats: Record<string, number[]>; // lessonId -> [beatIndex 1..7]
  completedBossChallenges: string[]; // array of boss challenge IDs
  quizScores: Record<string, number>; // lessonId -> best percentage (0..100)
  earnedBadges: string[]; // array of badge IDs
  checklistCompletedItems: string[]; // for module 6 checklist item keys
}

export interface ProgressContextType {
  progress: UserProgress;
  addXp: (amount: number, reason?: string) => void;
  completeBeat: (lessonId: string, beatIndex: number) => void;
  completeLesson: (lessonId: string) => void;
  recordQuizScore: (lessonId: string, score: number, totalQuestions: number) => void;
  completeBossChallenge: (challengeId: string, perfect?: boolean) => void;
  unlockBadge: (badgeId: string) => void;
  setStudentName: (name: string) => void;
  toggleChecklistItem: (itemId: string) => void;
  resetProgress: () => void;
}
