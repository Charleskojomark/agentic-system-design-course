export interface ModuleMeta {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  badge: string;
  order: number;
}

export interface LessonMeta {
  id: string;
  moduleId: string;
  title: string;
  shortTitle: string;
  order: number;
  xpReward: number;
  estimatedMinutes: number;
  visualType: string;
}

export interface DeepDiveCard {
  id: string;
  title: string;
  icon: string;
  summary: string;
  content: string;
  table?: {
    headers: string[];
    rows: string[][];
  };
}

export interface BossChallenge {
  id: string;
  title: string;
  scenario: string;
  type: string;
  steps?: any[];
  agentTypeQuestion?: any;
  slots?: any[];
  diagnoses?: any[];
  patternChoice?: any;
  wiringSteps?: any[];
  placements?: any[];
  rubricDimensions?: any[];
  xpReward: number;
}

export interface LessonContent {
  meta: LessonMeta;
  moduleMeta: ModuleMeta;
  hook: string;
  bigIdea: string;
  deepDive: DeepDiveCard[];
  quiz: any[];
  recap: string;
  bossChallenge: BossChallenge;
}

export interface LevelInfo {
  level: number;
  name: string;
  minXp: number;
  maxXp: number;
  icon: string;
}

export interface BadgeInfo {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}
