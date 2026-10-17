import React from 'react';
import { CheckCircle2, Lock, Star, Trophy, X, ArrowRight, Zap } from 'lucide-react';
import { courseData } from '../../data/courseData';
import { useProgress } from '../../context/ProgressContext';

export const ProgressMapModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSelectModule: (modId: number) => void;
}> = ({ isOpen, onClose, onSelectModule }) => {
  const { progress, getLevel, isLessonUnlocked, badges } = useProgress();
  const currentLevel = getLevel();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-3xl max-h-[90vh] rounded-3xl bg-slate-900 border border-white/10 shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">Curriculum Progress Map</h3>
              <p className="text-xs text-slate-400">Master autonomous architectures step-by-step</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Level Stats Bar */}
        <div className="p-5 bg-slate-950/70 border-b border-white/5 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{currentLevel.icon}</span>
            <div>
              <div className="text-xs font-bold text-white">{currentLevel.name}</div>
              <div className="text-[11px] text-slate-400">{currentLevel.title}</div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="text-amber-400 font-bold flex items-center gap-1">
              <Star className="w-4 h-4 fill-amber-400" /> {progress.xp} XP Earned
            </div>
            <div className="text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> {progress.completedModules.length}/6 Modules Completed
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Module Nodes Path */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
              Learning Road Map
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {courseData.map((mod, idx) => {
                const isCompleted = progress.completedModules.includes(mod.id);
                const isUnlocked = isLessonUnlocked(mod.id);

                return (
                  <div
                    key={mod.id}
                    onClick={() => {
                      if (isUnlocked) {
                        onSelectModule(mod.id);
                        onClose();
                      }
                    }}
                    className={`p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between ${
                      isUnlocked
                        ? 'bg-slate-800/50 hover:bg-slate-800/90 border-white/10 cursor-pointer shadow-md hover:border-indigo-500/40'
                        : 'bg-black/40 border-white/5 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-xl shrink-0">
                        {mod.icon}
                      </div>
                      <div>
                        <div className="text-[10px] font-mono text-indigo-400 font-bold uppercase">
                          Module 0{mod.id}
                        </div>
                        <div className="font-semibold text-xs text-white">
                          {mod.title}
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0">
                      {isCompleted ? (
                        <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Done
                        </span>
                      ) : isUnlocked ? (
                        <span className="flex items-center gap-1 text-[11px] font-bold text-indigo-300 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
                          Active <ArrowRight className="w-3 h-3" />
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[11px] text-slate-500 bg-white/5 px-2.5 py-1 rounded-full">
                          <Lock className="w-3.5 h-3.5" /> Locked
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Badges Showcase */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400" /> Milestone Badges ({progress.unlockedBadges.length}/{badges.length})
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {badges.map(b => {
                const isEarned = progress.unlockedBadges.includes(b.id);
                return (
                  <div
                    key={b.id}
                    className={`p-3 rounded-2xl text-center border transition-all ${
                      isEarned
                        ? 'bg-amber-500/10 border-amber-500/30 text-white shadow-sm'
                        : 'bg-black/20 border-white/5 text-slate-500 grayscale opacity-40'
                    }`}
                  >
                    <div className="text-2xl mb-1.5">{b.icon}</div>
                    <div className="font-bold text-[11px] truncate">{b.name}</div>
                    <div className="text-[9px] text-slate-400 line-clamp-2 mt-0.5 leading-snug">
                      {b.description}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
