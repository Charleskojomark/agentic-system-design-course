import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { UserProgress, ProgressContextType, Badge, LevelTier } from '../types';
import { loadProgress, saveProgress, defaultProgress } from '../utils/localStorage';
import { getLevelForXp } from '../utils/xpCalculator';
import badgesData from '../../content/badges.json';

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<UserProgress>(() => loadProgress());
  const [studentName, setStudentNameState] = useState<string>(() => {
    return localStorage.getItem('agentic_student_name') || 'Agentic Architect';
  });

  const badges = badgesData as Badge[];

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
      // ignore
    }
  }, []);

  const unlockBadge = useCallback((badgeId: string) => {
    setProgress((prev) => {
      if (prev.unlockedBadges.includes(badgeId)) return prev;
      triggerConfetti();
      return {
        ...prev,
        unlockedBadges: [...prev.unlockedBadges, badgeId],
      };
    });
  }, [triggerConfetti]);

  const addXp = useCallback((amount: number, _reason?: string) => {
    setProgress((prev) => {
      const nextXp = prev.xp + amount;
      return {
        ...prev,
        xp: nextXp,
      };
    });
  }, []);

  const completeBeat = useCallback((beatKey: string) => {
    setProgress((prev) => {
      if (prev.completedBeats.includes(beatKey)) return prev;
      const nextBeats = [...prev.completedBeats, beatKey];
      const nextXp = prev.xp + 15; // +15 XP per beat
      return {
        ...prev,
        xp: nextXp,
        completedBeats: nextBeats,
      };
    });
  }, []);

  const completeModule = useCallback((moduleId: number) => {
    setProgress((prev) => {
      const alreadyCompleted = prev.completedModules.includes(moduleId);
      const nextModules = alreadyCompleted
        ? prev.completedModules
        : [...prev.completedModules, moduleId];

      const nextXp = alreadyCompleted ? prev.xp : prev.xp + 150;
      const newBadges = [...prev.unlockedBadges];

      if (!newBadges.includes('module-maven') && nextModules.length >= 1) {
        newBadges.push('module-maven');
      }
      if (moduleId === 3 && !newBadges.includes('full-loop')) {
        newBadges.push('full-loop');
      }
      if (moduleId === 5 && !newBadges.includes('guardian')) {
        newBadges.push('guardian');
      }
      if (nextModules.length >= 6 && !newBadges.includes('course-champion')) {
        newBadges.push('course-champion');
        triggerConfetti();
      }

      return {
        ...prev,
        xp: nextXp,
        completedModules: nextModules,
        unlockedBadges: newBadges,
      };
    });
  }, [triggerConfetti]);

  const recordQuizScore = useCallback((key: string | number, score: number) => {
    setProgress((prev) => {
      const scoreKey = typeof key === 'number' ? `m${key}` : key;
      const prevBest = prev.quizScores[scoreKey] || 0;
      const best = Math.max(prevBest, score);
      const newBadges = [...prev.unlockedBadges];

      if (score === 100 && !newBadges.includes('first-perfect')) {
        newBadges.push('first-perfect');
        triggerConfetti();
      }

      const nextScores = { ...prev.quizScores, [scoreKey]: best };
      const scoreVals = Object.values(nextScores);
      if (scoreVals.length >= 6 && scoreVals.every((s) => s === 100) && !newBadges.includes('perfectionist')) {
        newBadges.push('perfectionist');
      }

      const earnedXp = prevBest === 0 ? score : (score > prevBest ? 25 : 0);

      return {
        ...prev,
        xp: prev.xp + earnedXp,
        quizScores: nextScores,
        unlockedBadges: newBadges,
      };
    });
  }, [triggerConfetti]);

  const getLevel = useCallback((xp: number): LevelTier => {
    return getLevelForXp(xp);
  }, []);

  const isLessonUnlocked = useCallback((moduleId: number): boolean => {
    if (moduleId === 1) return true;
    // Unlocked if previous module is completed or user has >= (moduleId - 1) * 100 XP
    return progress.completedModules.includes(moduleId - 1) || progress.xp >= (moduleId - 1) * 120;
  }, [progress.completedModules, progress.xp]);

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

  const setStudentName = useCallback((name: string) => {
    setStudentNameState(name);
    localStorage.setItem('agentic_student_name', name);
  }, []);

  const resetProgress = useCallback(() => {
    if (window.confirm('Reset all course progress, XP, and badges?')) {
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
        completeModule,
        recordQuizScore,
        unlockBadge,
        getLevel,
        isLessonUnlocked,
        toggleChecklistItem,
        badges,
        studentName,
        setStudentName,
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
