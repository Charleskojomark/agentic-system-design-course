import React, { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw, Award, ArrowRight, HelpCircle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { QuizQuestion } from '../../types';
import { useProgress } from '../../context/ProgressContext';

export const InteractiveQuiz: React.FC<{
  lessonId: string;
  questions: QuizQuestion[];
  onComplete?: () => void;
}> = ({ lessonId, questions, onComplete }) => {
  const { addXp, recordQuizScore, progress } = useProgress();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, any>>({});
  const [submittedAnswers, setSubmittedAnswers] = useState<Record<number, boolean>>({});
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = questions[currentQuestionIndex];
  const previousScore = progress.quizScores[lessonId] || null;

  const handleSelectOption = (option: string) => {
    if (submittedAnswers[currentQuestionIndex]) return;
    setSelectedAnswers(prev => ({ ...prev, [currentQuestionIndex]: option }));
  };

  const handleMatchSelect = (leftKey: string, rightVal: string) => {
    if (submittedAnswers[currentQuestionIndex]) return;
    setSelectedAnswers(prev => {
      const currentMatches = prev[currentQuestionIndex] || {};
      return {
        ...prev,
        [currentQuestionIndex]: { ...currentMatches, [leftKey]: rightVal },
      };
    });
  };

  const handleSubmitQuestion = () => {
    setSubmittedAnswers(prev => ({ ...prev, [currentQuestionIndex]: true }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Calculate score
      let correctCount = 0;
      questions.forEach((q, idx) => {
        const userAns = selectedAnswers[idx];
        if (q.type === 'multiple-choice') {
          if (userAns === q.correctAnswer) correctCount++;
        } else if (q.type === 'match-pairs') {
          const expected = q.correctAnswer as Record<string, string>;
          const allMatch = Object.keys(expected).every(k => userAns && userAns[k] === expected[k]);
          if (allMatch) correctCount++;
        }
      });

      const scorePct = Math.round((correctCount / questions.length) * 100);
      recordQuizScore(lessonId, scorePct);
      setIsFinished(true);

      if (scorePct === 100) {
        confetti({ particleCount: 75, spread: 70, origin: { y: 0.6 } });
      }
      if (onComplete) onComplete();
    }
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setSubmittedAnswers({});
    setCurrentQuestionIndex(0);
    setIsFinished(false);
  };

  if (isFinished) {
    let correctCount = 0;
    questions.forEach((q, idx) => {
      const userAns = selectedAnswers[idx];
      if (q.type === 'multiple-choice' && userAns === q.correctAnswer) correctCount++;
      else if (q.type === 'match-pairs') {
        const expected = q.correctAnswer as Record<string, string>;
        if (Object.keys(expected).every(k => userAns && userAns[k] === expected[k])) correctCount++;
      }
    });
    const scorePct = Math.round((correctCount / questions.length) * 100);

    return (
      <div className="p-8 rounded-3xl bg-slate-900 border border-white/10 text-center space-y-6 animate-fade-in shadow-2xl">
        <div className="w-16 h-16 rounded-3xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto border border-indigo-500/30 text-2xl">
          {scorePct >= 80 ? '🏆' : '📚'}
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-white">
            {scorePct >= 80 ? 'Mastery Checkpoint Cleared!' : 'Checkpoint Reviewed'}
          </h3>
          <p className="text-xs text-slate-400">
            You scored <strong className="text-white">{scorePct}%</strong> ({correctCount} of {questions.length} correct).
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-black/40 border border-white/5 inline-flex items-center gap-6 text-xs font-mono">
          <div>
            <span className="text-slate-500 block">XP Awarded</span>
            <strong className="text-amber-400 font-bold">+{Math.floor(scorePct * 0.8)} XP</strong>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div>
            <span className="text-slate-500 block">Personal Best</span>
            <strong className="text-emerald-400 font-bold">{Math.max(scorePct, previousScore || 0)}%</strong>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={handleRetry}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 border border-white/10 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retry (Keep Best Score)</span>
          </button>
        </div>
      </div>
    );
  }

  const isCurrentSubmitted = !!submittedAnswers[currentQuestionIndex];
  const userAns = selectedAnswers[currentQuestionIndex];
  const isMultipleChoice = currentQ.type === 'multiple-choice';

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-white/10 shadow-2xl backdrop-blur-xl space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-indigo-400">
          <HelpCircle className="w-4 h-4" />
          <span>Checkpoint Assessment</span>
        </div>
        <span className="text-xs font-mono text-slate-400">
          Question {currentQuestionIndex + 1} of {questions.length}
        </span>
      </div>

      {/* Question Prompt */}
      <div className="space-y-4">
        <h4 className="text-base sm:text-lg font-semibold text-white leading-relaxed">
          {currentQ.question}
        </h4>

        {/* Multiple Choice Options */}
        {isMultipleChoice && currentQ.options && (
          <div className="space-y-2.5">
            {currentQ.options.map((opt, oIdx) => {
              const isSelected = userAns === opt;
              const isCorrect = opt === currentQ.correctAnswer;
              
              let cardStyle = 'bg-white/[0.02] border-white/10 hover:bg-white/[0.05] text-slate-200';
              if (isCurrentSubmitted) {
                if (isCorrect) {
                  cardStyle = 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200';
                } else if (isSelected && !isCorrect) {
                  cardStyle = 'bg-rose-950/40 border-rose-500/50 text-rose-200';
                } else {
                  cardStyle = 'opacity-40 bg-black/20 border-transparent text-slate-500';
                }
              } else if (isSelected) {
                cardStyle = 'bg-indigo-600/30 border-indigo-500 text-white shadow-inner';
              }

              return (
                <div
                  key={oIdx}
                  onClick={() => handleSelectOption(opt)}
                  className={`p-4 rounded-2xl border text-xs sm:text-sm font-medium transition cursor-pointer flex items-center justify-between gap-3 ${cardStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-black/30 flex items-center justify-center font-mono text-xs text-slate-400">
                      {String.fromCharCode(65 + oIdx)}
                    </span>
                    <span>{opt}</span>
                  </div>
                  {isCurrentSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                  {isCurrentSubmitted && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-400 shrink-0" />}
                </div>
              );
            })}
          </div>
        )}

        {/* Match Pairs Options */}
        {currentQ.type === 'match-pairs' && (
          <div className="space-y-3 pt-2">
            <p className="text-xs text-slate-400">Select the matching role for each architectural component:</p>
            {Object.keys(currentQ.correctAnswer as Record<string, string>).map(leftKey => {
              const assigned = userAns && userAns[leftKey];
              const expected = (currentQ.correctAnswer as Record<string, string>)[leftKey];
              const options = Object.values(currentQ.correctAnswer as Record<string, string>);

              return (
                <div key={leftKey} className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2">
                  <div className="font-bold text-xs text-indigo-400 uppercase font-mono">{leftKey}</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {options.map((optVal, vIdx) => {
                      const isChosen = assigned === optVal;
                      let btnStyle = isChosen
                        ? 'bg-indigo-600 text-white font-bold'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10';
                      if (isCurrentSubmitted) {
                        if (isChosen && optVal === expected) btnStyle = 'bg-emerald-600 text-white';
                        else if (isChosen && optVal !== expected) btnStyle = 'bg-rose-600 text-white';
                      }

                      return (
                        <button
                          key={vIdx}
                          disabled={isCurrentSubmitted}
                          onClick={() => handleMatchSelect(leftKey, optVal)}
                          className={`p-2.5 rounded-xl text-left text-xs transition border border-white/5 ${btnStyle}`}
                        >
                          {optVal}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Explanation Rationale Box */}
        {isCurrentSubmitted && (
          <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-indigo-200 space-y-1.5 animate-fade-in">
            <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px] text-indigo-300">
              <Sparkles className="w-3.5 h-3.5" /> Course Concept Rationale
            </div>
            <p className="leading-relaxed">{currentQ.explanation}</p>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-2">
        <div className="text-xs text-slate-400">
          {!isCurrentSubmitted ? 'Select an answer to reveal explanation' : 'Step complete'}
        </div>

        {!isCurrentSubmitted ? (
          <button
            onClick={handleSubmitQuestion}
            disabled={!userAns}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 disabled:pointer-events-none text-xs font-bold text-white transition shadow-md shadow-indigo-500/25"
          >
            Check Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-xs font-bold text-white transition shadow-md shadow-indigo-500/25"
          >
            <span>{currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'View Results'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
