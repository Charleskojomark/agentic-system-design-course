import { LevelTier } from '../types';
import levelsData from '../../content/levels.json';

export const levels: LevelTier[] = levelsData as LevelTier[];

export function getLevelForXp(xp: number): LevelTier {
  for (let i = levels.length - 1; i >= 0; i--) {
    if (xp >= levels[i].minXp) {
      return levels[i];
    }
  }
  return levels[0];
}

export function getNextLevel(currentLevelNum: number): LevelTier | null {
  const next = levels.find((l) => l.level === currentLevelNum + 1);
  return next || null;
}

export function getLevelProgress(xp: number): {
  currentLevel: LevelTier;
  nextLevel: LevelTier | null;
  percent: number;
  xpIntoLevel: number;
  xpNeededForNext: number;
} {
  const currentLevel = getLevelForXp(xp);
  const nextLevel = getNextLevel(currentLevel.level);

  if (!nextLevel) {
    return {
      currentLevel,
      nextLevel: null,
      percent: 100,
      xpIntoLevel: xp - currentLevel.minXp,
      xpNeededForNext: 0,
    };
  }

  const range = nextLevel.minXp - currentLevel.minXp;
  const xpIntoLevel = Math.max(0, xp - currentLevel.minXp);
  const percent = Math.min(100, Math.round((xpIntoLevel / range) * 100));

  return {
    currentLevel,
    nextLevel,
    percent,
    xpIntoLevel,
    xpNeededForNext: nextLevel.minXp - xp,
  };
}
