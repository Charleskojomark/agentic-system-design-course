import { ModuleMeta, LessonContent, BadgeInfo } from '../types/content';

// Glossary & Badges
import glossaryData from '../../content/glossary.json';
import badgesData from '../../content/badges.json';

// Module 1
import m1Meta from '../../content/modules/module-1-foundations/meta.json';
import l1Meta from '../../content/modules/module-1-foundations/lesson-1-intro-to-agents/meta.json';
import l1Hook from '../../content/modules/module-1-foundations/lesson-1-intro-to-agents/hook.md?raw';
import l1BigIdea from '../../content/modules/module-1-foundations/lesson-1-intro-to-agents/big-idea.md?raw';
import l1DeepDive from '../../content/modules/module-1-foundations/lesson-1-intro-to-agents/deep-dive.json';
import l1Quiz from '../../content/modules/module-1-foundations/lesson-1-intro-to-agents/quiz.json';
import l1Recap from '../../content/modules/module-1-foundations/lesson-1-intro-to-agents/recap.md?raw';
import l1Boss from '../../content/modules/module-1-foundations/lesson-1-intro-to-agents/boss-challenge.json';

// Module 2
import m2Meta from '../../content/modules/module-2-core-components/meta.json';
import l2Meta from '../../content/modules/module-2-core-components/lesson-1-core-components/meta.json';
import l2Hook from '../../content/modules/module-2-core-components/lesson-1-core-components/hook.md?raw';
import l2BigIdea from '../../content/modules/module-2-core-components/lesson-1-core-components/big-idea.md?raw';
import l2DeepDive from '../../content/modules/module-2-core-components/lesson-1-core-components/deep-dive.json';
import l2Quiz from '../../content/modules/module-2-core-components/lesson-1-core-components/quiz.json';
import l2Recap from '../../content/modules/module-2-core-components/lesson-1-core-components/recap.md?raw';
import l2Boss from '../../content/modules/module-2-core-components/lesson-1-core-components/boss-challenge.json';

// Module 3
import m3Meta from '../../content/modules/module-3-memory-perception/meta.json';
import l3Meta from '../../content/modules/module-3-memory-perception/lesson-1-memory-perception/meta.json';
import l3Hook from '../../content/modules/module-3-memory-perception/lesson-1-memory-perception/hook.md?raw';
import l3BigIdea from '../../content/modules/module-3-memory-perception/lesson-1-memory-perception/big-idea.md?raw';
import l3DeepDive from '../../content/modules/module-3-memory-perception/lesson-1-memory-perception/deep-dive.json';
import l3Quiz from '../../content/modules/module-3-memory-perception/lesson-1-memory-perception/quiz.json';
import l3Recap from '../../content/modules/module-3-memory-perception/lesson-1-memory-perception/recap.md?raw';
import l3Boss from '../../content/modules/module-3-memory-perception/lesson-1-memory-perception/boss-challenge.json';

// Module 4
import m4Meta from '../../content/modules/module-4-orchestration/meta.json';
import l4Meta from '../../content/modules/module-4-orchestration/lesson-1-orchestration/meta.json';
import l4Hook from '../../content/modules/module-4-orchestration/lesson-1-orchestration/hook.md?raw';
import l4BigIdea from '../../content/modules/module-4-orchestration/lesson-1-orchestration/big-idea.md?raw';
import l4DeepDive from '../../content/modules/module-4-orchestration/lesson-1-orchestration/deep-dive.json';
import l4Quiz from '../../content/modules/module-4-orchestration/lesson-1-orchestration/quiz.json';
import l4Recap from '../../content/modules/module-4-orchestration/lesson-1-orchestration/recap.md?raw';
import l4Boss from '../../content/modules/module-4-orchestration/lesson-1-orchestration/boss-challenge.json';

// Module 5
import m5Meta from '../../content/modules/module-5-trust-safety/meta.json';
import l5Meta from '../../content/modules/module-5-trust-safety/lesson-1-guardrails/meta.json';
import l5Hook from '../../content/modules/module-5-trust-safety/lesson-1-guardrails/hook.md?raw';
import l5BigIdea from '../../content/modules/module-5-trust-safety/lesson-1-guardrails/big-idea.md?raw';
import l5DeepDive from '../../content/modules/module-5-trust-safety/lesson-1-guardrails/deep-dive.json';
import l5Quiz from '../../content/modules/module-5-trust-safety/lesson-1-guardrails/quiz.json';
import l5Recap from '../../content/modules/module-5-trust-safety/lesson-1-guardrails/recap.md?raw';
import l5Boss from '../../content/modules/module-5-trust-safety/lesson-1-guardrails/boss-challenge.json';

// Module 6
import m6Meta from '../../content/modules/module-6-production/meta.json';
import l6Meta from '../../content/modules/module-6-production/lesson-1-challenges/meta.json';
import l6Hook from '../../content/modules/module-6-production/lesson-1-challenges/hook.md?raw';
import l6BigIdea from '../../content/modules/module-6-production/lesson-1-challenges/big-idea.md?raw';
import l6DeepDive from '../../content/modules/module-6-production/lesson-1-challenges/deep-dive.json';
import l6Quiz from '../../content/modules/module-6-production/lesson-1-challenges/quiz.json';
import l6Recap from '../../content/modules/module-6-production/lesson-1-challenges/recap.md?raw';
import l6Boss from '../../content/modules/module-6-production/lesson-1-challenges/boss-challenge.json';

export const glossary: Record<string, string> = glossaryData;
export const badges: BadgeInfo[] = badgesData as BadgeInfo[];

export const modules: ModuleMeta[] = [
  m1Meta,
  m2Meta,
  m3Meta,
  m4Meta,
  m5Meta,
  m6Meta,
];

export const lessons: Record<string, LessonContent> = {
  [l1Meta.id]: {
    meta: l1Meta,
    moduleMeta: m1Meta,
    hook: l1Hook,
    bigIdea: l1BigIdea,
    deepDive: l1DeepDive,
    quiz: l1Quiz,
    recap: l1Recap,
    bossChallenge: l1Boss,
  },
  [l2Meta.id]: {
    meta: l2Meta,
    moduleMeta: m2Meta,
    hook: l2Hook,
    bigIdea: l2BigIdea,
    deepDive: l2DeepDive,
    quiz: l2Quiz,
    recap: l2Recap,
    bossChallenge: l2Boss,
  },
  [l3Meta.id]: {
    meta: l3Meta,
    moduleMeta: m3Meta,
    hook: l3Hook,
    bigIdea: l3BigIdea,
    deepDive: l3DeepDive,
    quiz: l3Quiz,
    recap: l3Recap,
    bossChallenge: l3Boss,
  },
  [l4Meta.id]: {
    meta: l4Meta,
    moduleMeta: m4Meta,
    hook: l4Hook,
    bigIdea: l4BigIdea,
    deepDive: l4DeepDive,
    quiz: l4Quiz,
    recap: l4Recap,
    bossChallenge: l4Boss,
  },
  [l5Meta.id]: {
    meta: l5Meta,
    moduleMeta: m5Meta,
    hook: l5Hook,
    bigIdea: l5BigIdea,
    deepDive: l5DeepDive,
    quiz: l5Quiz,
    recap: l5Recap,
    bossChallenge: l5Boss,
  },
  [l6Meta.id]: {
    meta: l6Meta,
    moduleMeta: m6Meta,
    hook: l6Hook,
    bigIdea: l6BigIdea,
    deepDive: l6DeepDive,
    quiz: l6Quiz,
    recap: l6Recap,
    bossChallenge: l6Boss,
  },
};

export const lessonOrder: string[] = [
  l1Meta.id,
  l2Meta.id,
  l3Meta.id,
  l4Meta.id,
  l5Meta.id,
  l6Meta.id,
];

export function getLessonById(id: string): LessonContent | undefined {
  return lessons[id];
}

export function getModuleById(id: string): ModuleMeta | undefined {
  return modules.find((m) => m.id === id);
}

export function getLessonsForModule(moduleId: string): LessonContent[] {
  return Object.values(lessons).filter((l) => l.meta.moduleId === moduleId);
}

export function getNextLessonId(currentLessonId: string): string | null {
  const idx = lessonOrder.indexOf(currentLessonId);
  if (idx >= 0 && idx < lessonOrder.length - 1) {
    return lessonOrder[idx + 1];
  }
  return null;
}

export function getPreviousLessonId(currentLessonId: string): string | null {
  const idx = lessonOrder.indexOf(currentLessonId);
  if (idx > 0) {
    return lessonOrder[idx - 1];
  }
  return null;
}
