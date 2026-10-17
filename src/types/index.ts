export interface ModuleData {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  color: string;
  icon: string;
  lessons: LessonData[];
}

export interface LessonData {
  id: string;
  title: string;
  hook: string;
  bigIdea: string;
  plainEnglish: string;
  objectives: string[];
  sections: SectionData[];
  quiz: QuizQuestion[];
  recap: string[];
  nextUp: string;
}

export interface SectionData {
  id: string;
  title: string;
  icon: string;
  content: string;
  subsections?: SubSection[];
  tableData?: TableRow[];
  interactiveType?: string;
}

export interface SubSection {
  title: string;
  content: string;
  bullets?: string[];
}

export interface TableRow {
  [key: string]: string;
}

export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'drag-to-order' | 'match-pairs' | 'fill-blank' | 'spot-error';
  question: string;
  options?: string[];
  correctAnswer: string | string[] | Record<string, string>;
  explanation: string;
}

export interface LevelTier {
  level: number;
  name: string;
  minXp: number;
  maxXp: number;
  icon: string;
  title: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
}

export interface GlossaryItem {
  term: string;
  definition: string;
  category: string;
}

export interface UserProgress {
  xp: number;
  streak: number;
  lastActiveDate: string;
  completedBeats: string[];
  completedModules: number[];
  unlockedBadges: string[];
  quizScores: Record<string, number>;
}
