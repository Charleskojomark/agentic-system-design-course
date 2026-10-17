import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, CheckCircle2, Lock, Sparkles } from 'lucide-react';
import { courseData } from '../../data/courseData';
import { useProgress } from '../../context/ProgressContext';

export const ModuleSelectorDropdown: React.FC<{
  activeModuleId: number;
  onSelectModule: (id: number) => void;
}> = ({ activeModuleId, onSelectModule }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { progress, isLessonUnlocked } = useProgress();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentMod = courseData.find(m => m.id === activeModuleId) || courseData[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 sm:gap-2.5 px-2.5 sm:px-3.5 py-1.5 rounded-full bg-slate-800/80 hover:bg-slate-700/80 border border-white/10 text-xs font-semibold text-slate-200 transition shadow-sm hover:border-indigo-500/50"
      >
        <span className="text-sm">{currentMod.icon}</span>
        <span className="font-mono text-indigo-400 font-bold">Mod 0{currentMod.id}</span>
        <span className="hidden sm:inline text-white font-medium max-w-[140px] truncate">{currentMod.title}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Mobile backdrop for easy dismissal */}
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs sm:hidden"
            onClick={() => setIsOpen(false)}
          />

          <div className="fixed inset-x-3 top-16 sm:inset-x-auto sm:left-0 sm:top-full sm:absolute mt-2 sm:mt-3 w-auto sm:w-96 max-w-sm p-3 rounded-3xl bg-slate-900/98 sm:bg-slate-900/95 border border-white/10 shadow-2xl backdrop-blur-2xl z-50 animate-fade-in space-y-2">
            <div className="flex items-center justify-between px-3 py-2 border-b border-white/5">
              <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                Course Curriculum
              </span>
              <span className="text-[11px] font-mono text-indigo-400 font-bold">
                {progress.completedModules.length}/{courseData.length} Completed
              </span>
            </div>

            <div className="space-y-1.5 max-h-[60vh] sm:max-h-80 overflow-y-auto pr-1">
              {courseData.map(mod => {
                const isActive = mod.id === activeModuleId;
                const isCompleted = progress.completedModules.includes(mod.id);
                const isUnlocked = isLessonUnlocked(mod.id);

                return (
                  <button
                    key={mod.id}
                    disabled={!isUnlocked}
                    onClick={() => {
                      if (isUnlocked) {
                        onSelectModule(mod.id);
                        setIsOpen(false);
                      }
                    }}
                    className={`w-full p-2.5 sm:p-3 rounded-2xl text-left text-xs transition flex items-center justify-between ${
                      isActive
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-md'
                        : isUnlocked
                        ? 'bg-slate-800/40 hover:bg-slate-800 text-slate-200 border border-white/5'
                        : 'bg-slate-900/30 text-slate-500 border border-transparent cursor-not-allowed opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <span className="text-lg sm:text-xl p-1 rounded-xl bg-black/20 shrink-0">{mod.icon}</span>
                      <div className="min-w-0">
                        <div className="text-[10px] uppercase font-mono opacity-75">
                          Module 0{mod.id}
                        </div>
                        <div className="font-medium text-xs text-white truncate">
                          {mod.title}
                        </div>
                      </div>
                    </div>
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : !isUnlocked ? (
                      <Lock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
