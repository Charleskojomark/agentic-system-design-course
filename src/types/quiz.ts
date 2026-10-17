export type QuizType =
  | 'multiple-choice'
  | 'drag-to-order'
  | 'match-the-pairs'
  | 'spot-the-error'
  | 'fill-in-the-blank';

export interface MultipleChoiceOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: string;
  type: QuizType;
  prompt: string;
  isMultiSelect?: boolean;
  options?: MultipleChoiceOption[];
  explanation: string;
  // Drag to order
  items?: { id: string; text: string }[];
  correctOrder?: string[];
  // Match the pairs
  pairs?: { id: string; left: string; right: string }[];
  // Fill in the blank
  sentence?: string;
  blanks?: { id: string; label: string; correct: string; options: string[] }[];
}
