import React, { useState } from 'react';
import { Award, CheckCircle, Download, Printer, X, Sparkles } from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';
import { courseData } from '../../data/courseData';

export const CertificateModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const { progress } = useProgress();
  const [studentName, setStudentName] = useState('Valued Engineer');
  const isComplete = progress.completedModules.length >= courseData.length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-2xl rounded-3xl bg-slate-900 border border-white/10 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-white text-base">Course Certificate of Completion</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Canvas */}
        <div className="p-3 sm:p-6 overflow-y-auto space-y-4 sm:space-y-6">
          <div className="p-4 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/40 border-2 border-amber-500/30 shadow-2xl relative text-center space-y-4 sm:space-y-5">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] sm:text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              VERIFIED MASTERY CREDENTIAL
            </div>

            <div className="space-y-1">
              <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight text-white">
                Certificate of System Mastery
              </h2>
              <p className="text-[11px] sm:text-xs text-indigo-300 font-mono">
                AGENTIC SYSTEM DESIGN MASTERCLASS
              </p>
            </div>

            <div className="py-1 sm:py-2">
              <span className="text-[11px] sm:text-xs text-slate-400 block mb-1">Presented to:</span>
              <input
                type="text"
                value={studentName}
                onChange={e => setStudentName(e.target.value)}
                className="text-lg sm:text-2xl font-bold text-center text-amber-300 bg-transparent border-b border-white/20 focus:outline-none focus:border-amber-400 max-w-sm w-full mx-auto"
                placeholder="Enter your name"
              />
            </div>

            <p className="text-[11px] sm:text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
              For successfully demonstrating mastery across autonomous agent foundations, modular architectures, three-tier memory loops, orchestration patterns, defensive guardrails, production resilience strategies, MACRS multi-agent recommender planning, and hands-on CRM agent design.
            </p>

            <div className="pt-3 sm:pt-4 border-t border-white/10 flex items-center justify-between text-[10px] sm:text-xs text-slate-400 font-mono">
              <div>
                <span>Score: </span>
                <strong className="text-white">{progress.xp} XP</strong>
              </div>
              <div>
                <span>Modules: </span>
                <strong className="text-emerald-400">{progress.completedModules.length} / 8</strong>
              </div>
              <div>
                <span>Date: </span>
                <strong className="text-white">{new Date().toLocaleDateString()}</strong>
              </div>
            </div>
          </div>

          {!isComplete && (
            <div className="p-3 sm:p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-center gap-2">
              <span>⚠️</span>
              <span>Complete all 8 modules to fully verify and certify your completion credential.</span>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3">
            <button
              onClick={() => window.print()}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Certificate</span>
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white transition shadow-md shadow-indigo-500/25 text-center"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
