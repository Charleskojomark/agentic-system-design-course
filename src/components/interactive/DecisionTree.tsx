import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, AlertCircle, RotateCcw } from 'lucide-react';

export const DecisionTree: React.FC = () => {
  const [answers, setAnswers] = useState<{
    q1: boolean | null;
    q2: boolean | null;
    q3: boolean | null;
  }>({
    q1: null,
    q2: null,
    q3: null,
  });

  const handleAnswer = (key: 'q1' | 'q2' | 'q3', val: boolean) => {
    setAnswers((prev) => ({ ...prev, [key]: val }));
  };

  const reset = () => {
    setAnswers({ q1: null, q2: null, q3: null });
  };

  const trueCount = [answers.q1, answers.q2, answers.q3].filter((a) => a === true).length;
  const allAnswered = answers.q1 !== null && answers.q2 !== null && answers.q3 !== null;

  return (
    <div className="rounded-3xl border border-slate-700/80 bg-slate-900/60 p-6 md:p-8 backdrop-blur-xl shadow-xl my-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs uppercase tracking-wider font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
            Interactive Decision Matrix
          </span>
          <h3 className="text-lg md:text-xl font-bold text-slate-100 mt-2">
            Should You Build an LLM Agent?
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Evaluate your scenario against the three decisive signals from the course curriculum.
          </p>
        </div>

        <button
          type="button"
          onClick={reset}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
        >
          <RotateCcw size={14} />
          Reset
        </button>
      </div>

      <div className="space-y-4 my-6">
        {/* Signal 1 */}
        <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="max-w-xl">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wide">
              Signal 1: Contextual Decision-Making
            </span>
            <h4 className="text-sm font-semibold text-slate-200 mt-0.5">
              Does the task require nuanced human-like judgment, balancing trade-offs, or interpreting ambiguous intent?
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              (e.g., refund approvals based on customer mood, history, and message tone).
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => handleAnswer('q1', true)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                answers.q1 === true
                  ? 'bg-emerald-600 text-white ring-2 ring-emerald-400'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => handleAnswer('q1', false)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                answers.q1 === false
                  ? 'bg-rose-600 text-white ring-2 ring-rose-400'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              No
            </button>
          </div>
        </div>

        {/* Signal 2 */}
        <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="max-w-xl">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wide">
              Signal 2: Rules Too Complex to Maintain
            </span>
            <h4 className="text-sm font-semibold text-slate-200 mt-0.5">
              Does your logic involve dozens of fragile conditional branches, edge exceptions, and evolving compliance policies?
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              (e.g., vendor security compliance audits with changing guidelines).
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => handleAnswer('q2', true)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                answers.q2 === true
                  ? 'bg-emerald-600 text-white ring-2 ring-emerald-400'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => handleAnswer('q2', false)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                answers.q2 === false
                  ? 'bg-rose-600 text-white ring-2 ring-rose-400'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              No
            </button>
          </div>
        </div>

        {/* Signal 3 */}
        <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="max-w-xl">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wide">
              Signal 3: Unstructured or Natural Language Data
            </span>
            <h4 className="text-sm font-semibold text-slate-200 mt-0.5">
              Does the pipeline rely on extracting intent and meaning from freeform emails, transcripts, or reports?
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              (e.g., insurance claim intake with user narratives).
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => handleAnswer('q3', true)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                answers.q3 === true
                  ? 'bg-emerald-600 text-white ring-2 ring-emerald-400'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => handleAnswer('q3', false)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                answers.q3 === false
                  ? 'bg-rose-600 text-white ring-2 ring-rose-400'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              No
            </button>
          </div>
        </div>
      </div>

      {/* Decision Outcome */}
      {allAnswered && (
        <div
          className={`p-5 rounded-2xl border transition-all animate-in fade-in duration-300 ${
            trueCount >= 2
              ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
              : 'bg-amber-950/30 border-amber-500/40 text-amber-200'
          }`}
        >
          <div className="flex items-center gap-2.5 font-bold text-base mb-1">
            {trueCount >= 2 ? (
              <>
                <CheckCircle2 size={20} className="text-emerald-400 shrink-0" />
                <span>Recommendation: Build an LLM-Powered AI Agent ({trueCount}/3 Signals Positive)</span>
              </>
            ) : (
              <>
                <AlertCircle size={20} className="text-amber-400 shrink-0" />
                <span>Recommendation: Use Deterministic Script or Rule-Based Automation</span>
              </>
            )}
          </div>
          <p className="text-xs text-slate-300 leading-relaxed mt-2">
            {trueCount >= 2
              ? 'Your use case exhibits strong agentic signals (contextual judgment, unstructured language, or logic too fragmented for manual rules). The flexibility of an autonomous LLM agent outweighs its computational overhead.'
              : 'Because your criteria are predictable and structured, an LLM agent introduces unnecessary latency, inference expense, and uncertainty. A deterministic script or standard database rule is faster and 100% reliable.'}
          </p>
        </div>
      )}
    </div>
  );
};
