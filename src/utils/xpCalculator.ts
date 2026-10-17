import { LevelInfo } from '../types/content';
import levelsData from '../../content/levels.json';

export const levels: LevelInfo[] = levelsData as LevelInfo[];

export function getLevelForXp(xp: number): LevelInfo {
  for (let i = levels.length - 1; i >= 0; i--) {
    if (xp >= levels[i].minXp) {
      return levels[i];
    }
  }
  return levels[0];
}

export function getNextLevel(currentLevelNum: number): LevelInfo | null {
  const next = levels.find((l) => l.level === currentLevelNum + 1);
  return next || null;
}

export function getLevelProgress(xp: number): {
  currentLevel: LevelInfo;
  nextLevel: LevelInfo | null;
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
