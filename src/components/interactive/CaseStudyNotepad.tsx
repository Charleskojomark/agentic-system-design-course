import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, CheckCircle2, FileEdit } from 'lucide-react';

export const CaseStudyNotepad: React.FC = () => {
  const [openHint1, setOpenHint1] = useState(false);
  const [openAnswer1, setOpenAnswer1] = useState(false);
  const [note1, setNote1] = useState('');

  const [openHint2, setOpenHint2] = useState(false);
  const [openAnswer2, setOpenAnswer2] = useState(false);
  const [note2, setNote2] = useState('');

  return (
    <div className="rounded-3xl border border-slate-700/80 bg-slate-900/60 p-6 md:p-8 backdrop-blur-xl shadow-xl my-6">
      <div className="mb-6">
        <span className="text-xs uppercase tracking-wider font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
          Interactive Case Study Workspace
        </span>
        <h3 className="text-lg md:text-xl font-bold text-slate-100 mt-2">
          Case Study: SaaS Support Agent Diagnosis
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Type your engineering diagnosis in the notepad, test your intuition with hints, and reveal the course model answer.
        </p>
      </div>

      <div className="space-y-6">
        {/* Question 1 */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
          <h4 className="text-sm font-bold text-slate-200 mb-2">
            Question 1: Based on the 4 production issues (repeats questions, forgets past tickets, generic FAQ answers, ignores frustration), which primary architecture blueprint element is failing?
          </h4>

          <textarea
            value={note1}
            onChange={(e) => setNote1(e.target.value)}
            placeholder="Type your architectural diagnosis here..."
            className="w-full h-20 p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/50 resize-none font-mono"
          />

          <div className="mt-3 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setOpenHint1(!openHint1)}
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
            >
              {openHint1 ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              {openHint1 ? 'Hide Hint' : 'Show Hint'}
            </button>
            <button
              type="button"
              onClick={() => setOpenAnswer1(!openAnswer1)}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
            >
              {openAnswer1 ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              {openAnswer1 ? 'Hide Model Answer' : 'Reveal Model Answer'}
            </button>
          </div>

          {openHint1 && (
            <div className="mt-3 p-3 rounded-xl bg-amber-950/20 border border-amber-500/20 text-xs text-amber-200">
              💡 <strong>Hint:</strong> Look at what is missing: recent chat turns, historical tickets, FAQ retrieval, and customer sentiment history across sessions.
            </div>
          )}

          {openAnswer1 && (
            <div className="mt-3 p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-xs text-emerald-200 leading-relaxed">
              ✅ <strong>Course Solution:</strong> <strong>Memory and Context</strong> is the failing element. The model, tools, and instructions exist, but the agent lacks active session context buffers (short-term), ticket history retrieval (long-term), and semantic FAQ embeddings via RAG (external).
            </div>
          )}
        </div>

        {/* Question 2 */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
          <h4 className="text-sm font-bold text-slate-200 mb-2">
            Question 2: One specific user says: "I'm still having the same issue I reported yesterday." Using the 5-step loop (Perceive → Recall → Reason → Act → Store), explain which specific step bridges this session gap and what memory type is retrieved?
          </h4>

          <textarea
            value={note2}
            onChange={(e) => setNote2(e.target.value)}
            placeholder="Type your explanation of the step and memory type..."
            className="w-full h-20 p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/50 resize-none font-mono"
          />

          <div className="mt-3 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setOpenHint2(!openHint2)}
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
            >
              {openHint2 ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              {openHint2 ? 'Hide Hint' : 'Show Hint'}
            </button>
            <button
              type="button"
              onClick={() => setOpenAnswer2(!openAnswer2)}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
            >
              {openAnswer2 ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              {openAnswer2 ? 'Hide Model Answer' : 'Reveal Model Answer'}
            </button>
          </div>

          {openHint2 && (
            <div className="mt-3 p-3 rounded-xl bg-amber-950/20 border border-amber-500/20 text-xs text-amber-200">
              💡 <strong>Hint:</strong> The previous session happened yesterday (it ended). In which phase does retrieval happen, and which memory persists across days?
            </div>
          )}

          {openAnswer2 && (
            <div className="mt-3 p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-xs text-emerald-200 leading-relaxed">
              ✅ <strong>Course Solution:</strong> The <strong>Recall</strong> step is responsible for querying memory before reasoning. It must retrieve <strong>Long-Term Memory</strong> (the database of historical support tickets and past session notes) to bring yesterday's context into the present session.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
