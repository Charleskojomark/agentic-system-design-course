import React from 'react';
import { CheckCircle2, XCircle, Info } from 'lucide-react';

interface QuizFeedbackProps {
  isCorrect: boolean;
  explanation: string;
}

export const QuizFeedback: React.FC<QuizFeedbackProps> = ({ isCorrect, explanation }) => {
  return (
    <div
      className={`p-5 rounded-2xl border text-xs md:text-sm leading-relaxed my-4 animate-in fade-in duration-300 ${
        isCorrect
          ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200'
          : 'bg-rose-950/30 border-rose-500/50 text-rose-200'
      }`}
    >
      <div className="flex items-center gap-2 font-bold mb-2 text-sm">
        {isCorrect ? (
          <>
            <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
            <span>Spot On! +15 XP</span>
          </>
        ) : (
          <>
            <XCircle size={18} className="text-rose-400 shrink-0" />
            <span>Architectural Misalignment</span>
          </>
        )}
      </div>
      <p className="text-slate-300 mt-1">{explanation}</p>
    </div>
  );
};
