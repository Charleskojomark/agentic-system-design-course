import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { UserProgress, ProgressContextType } from '../types/progress';
import { loadProgress, saveProgress, defaultProgress } from '../utils/localStorage';
import { badges } from '../utils/contentLoader';

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<UserProgress>(() => loadProgress());
  const [newBadgeUnlocked, setNewBadgeUnlocked] = useState<string | null>(null);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const triggerConfetti = useCallback(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#06b6d4'],
      });
    } catch {
      // ignore in environments without canvas
    }
  }, []);

  const unlockBadge = useCallback((badgeId: string) => {
    setProgress((prev) => {
      if (prev.earnedBadges.includes(badgeId)) return prev;
      triggerConfetti();
      return {
        ...prev,
        earnedBadges: [...prev.earnedBadges, badgeId],
      };
    });
  }, [triggerConfetti]);

  const addXp = useCallback((amount: number, reason?: string) => {
    setProgress((prev) => {
      const nextXp = prev.totalXp + amount;
      return {
        ...prev,
        totalXp: nextXp,
      };
    });
  }, []);

  const completeBeat = useCallback((lessonId: string, beatIndex: number) => {
    setProgress((prev) => {
      const currentBeats = prev.completedBeats[lessonId] || [];
      if (currentBeats.includes(beatIndex)) return prev;

      const nextBeats = [...currentBeats, beatIndex];
      const nextXp = prev.totalXp + 10; // +10 XP per lesson beat

      return {
        ...prev,
        totalXp: nextXp,
        completedBeats: {
          ...prev.completedBeats,
          [lessonId]: nextBeats,
        },
      };
    });
  }, []);

  const completeLesson = useCallback((lessonId: string) => {
    setProgress((prev) => {
      const alreadyCompleted = prev.completedLessons.includes(lessonId);
      const nextCompleted = alreadyCompleted
        ? prev.completedLessons
        : [...prev.completedLessons, lessonId];

      const nextXp = alreadyCompleted ? prev.totalXp : prev.totalXp + 50;

      // Check badges
      const newBadges = [...prev.earnedBadges];
      if (!newBadges.includes('module-maven') && nextCompleted.length >= 1) {
        newBadges.push('module-maven');
      }
      if (lessonId === 'lesson-3-memory-perception' && !newBadges.includes('full-loop')) {
        newBadges.push('full-loop');
      }
      if (lessonId === 'lesson-5-guardrails' && !newBadges.includes('guardian')) {
        newBadges.push('guardian');
      }
      if (nextCompleted.length >= 6 && !newBadges.includes('course-champion')) {
        newBadges.push('course-champion');
        triggerConfetti();
      }

      return {
        ...prev,
        totalXp: nextXp,
        completedLessons: nextCompleted,
        earnedBadges: newBadges,
      };
    });
  }, [triggerConfetti]);

  const recordQuizScore = useCallback((lessonId: string, score: number, totalQuestions: number) => {
    const percent = Math.round((score / totalQuestions) * 100);
    const xpPerCorrect = score * 15;
    const isPerfect = percent === 100;
    const perfectBonus = isPerfect ? 50 : 0;

    setProgress((prev) => {
      const prevBest = prev.quizScores[lessonId] || 0;
      const bestScore = Math.max(prevBest, percent);

      // Only award fresh XP if score improved or first time
      const earnedXp = prevBest === 0 ? xpPerCorrect + perfectBonus : (percent > prevBest ? 25 : 0);
      const newBadges = [...prev.earnedBadges];

      if (isPerfect && !newBadges.includes('first-perfect')) {
        newBadges.push('first-perfect');
        triggerConfetti();
      }

      // Check perfectionist if all 6 lessons are 100
      const nextScores = { ...prev.quizScores, [lessonId]: bestScore };
      const scoreValues = Object.values(nextScores);
      if (scoreValues.length >= 6 && scoreValues.every((s) => s === 100) && !newBadges.includes('perfectionist')) {
        newBadges.push('perfectionist');
      }

      return {
        ...prev,
        totalXp: prev.totalXp + earnedXp,
        quizScores: nextScores,
        earnedBadges: newBadges,
      };
    });
  }, [triggerConfetti]);

  const completeBossChallenge = useCallback((challengeId: string, perfect = true) => {
    setProgress((prev) => {
      if (prev.completedBossChallenges.includes(challengeId)) return prev;

      const earnedXp = 100 + (perfect ? 150 : 0);
      const nextCompleted = [...prev.completedBossChallenges, challengeId];
      const newBadges = [...prev.earnedBadges];

      if (challengeId === 'boss-challenge-2' && !newBadges.includes('builder')) {
        newBadges.push('builder');
      }
      if (challengeId === 'boss-challenge-6' && !newBadges.includes('certified-designer')) {
        newBadges.push('certified-designer');
      }

      triggerConfetti();

      return {
        ...prev,
        totalXp: prev.totalXp + earnedXp,
        completedBossChallenges: nextCompleted,
        earnedBadges: newBadges,
      };
    });
  }, [triggerConfetti]);

  const setStudentName = useCallback((name: string) => {
    setProgress((prev) => ({
      ...prev,
      studentName: name || 'Agentic Architect',
    }));
  }, []);

  const toggleChecklistItem = useCallback((itemId: string) => {
    setProgress((prev) => {
      const items = prev.checklistCompletedItems || [];
      const exists = items.includes(itemId);
      const next = exists ? items.filter((i) => i !== itemId) : [...items, itemId];
      return {
        ...prev,
        checklistCompletedItems: next,
      };
    });
  }, []);

  const resetProgress = useCallback(() => {
    if (window.confirm('Are you sure you want to reset all your course progress, XP, and badges?')) {
      setProgress(defaultProgress);
      saveProgress(defaultProgress);
    }
  }, []);

  return (
    <ProgressContext.Provider
      value={{
        progress,
        addXp,
        completeBeat,
        completeLesson,
        recordQuizScore,
        completeBossChallenge,
        unlockBadge,
        setStudentName,
        toggleChecklistItem,
        resetProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = (): ProgressContextType => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
