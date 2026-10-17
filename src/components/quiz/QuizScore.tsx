import React from 'react';
import { Award, RotateCcw, ArrowRight, Sparkles } from 'lucide-react';

interface QuizScoreProps {
  score: number;
  total: number;
  onRetry: () => void;
  onContinue: () => void;
}

export const QuizScore: React.FC<QuizScoreProps> = ({ score, total, onRetry, onContinue }) => {
  const percent = Math.round((score / total) * 100);
  const isPerfect = percent === 100;

  return (
    <div className="p-6 md:p-8 rounded-3xl bg-slate-950 border border-slate-800 text-center animate-in zoom-in-95 duration-300">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center mx-auto mb-4 shadow-xl">
        <Award size={32} />
      </div>

      <h4 className="text-xl font-bold text-slate-100">Checkpoint Evaluation Complete!</h4>
      <p className="text-xs text-slate-400 mt-1">
        You scored <strong className="text-indigo-400 font-mono text-sm">{score}</strong> out of{' '}
        <strong className="text-slate-200 font-mono text-sm">{total}</strong> ({percent}%)
      </p>

      {isPerfect && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold mt-4 animate-bounce">
          <Sparkles size={14} />
          <span>Flawless Checkpoint! +50 XP Perfect Bonus</span>
        </div>
      )}

      <div className="flex items-center justify-center gap-3 mt-8">
        <button
          type="button"
          onClick={onRetry}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
        >
          <RotateCcw size={14} />
          <span>Retry Checkpoint</span>
        </button>

        <button
          type="button"
          onClick={onContinue}
          className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-lg shadow-indigo-600/30"
        >
          <span>Continue Lesson</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};
