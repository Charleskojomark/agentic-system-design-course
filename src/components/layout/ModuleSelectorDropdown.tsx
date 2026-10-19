import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, CheckCircle2, Lock, Sparkles } from 'lucide-react';
import { courseData } from '../../data/courseData';
import { useProgress } from '../../context/ProgressContext';

export const ModuleSelectorDropdown: React.FC<{
  activeModuleId: number;
  onSelectModule: (id: number) => void;
}> = ({ activeModuleId, onSelectModule }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<'all' | 'core' | 'fde'>('all');
  const { progress, isLessonUnlocked } = useProgress();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentMod = courseData.find(m => m.id === activeModuleId) || courseData[0];
  const isFdeModule = currentMod.id >= 16;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredModules = courseData.filter(mod => {
    if (selectedTrack === 'core') return mod.id <= 15;
    if (selectedTrack === 'fde') return mod.id >= 16;
    return true;
  });

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 sm:gap-2.5 px-2.5 sm:px-3.5 py-1.5 rounded-full bg-slate-800/80 hover:bg-slate-700/80 border border-white/10 text-xs font-semibold text-slate-200 transition shadow-sm hover:border-indigo-500/50"
      >
        <span className="text-sm">{currentMod.icon}</span>
        <span className={`font-mono font-bold ${isFdeModule ? 'text-sky-400' : 'text-indigo-400'}`}>
          Mod {String(currentMod.id).padStart(2, '0')}
        </span>
        {isFdeModule && (
          <span className="hidden sm:inline px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30 font-mono text-[9px] font-bold">
            FDE
          </span>
        )}
        <span className="hidden sm:inline text-white font-medium max-w-[130px] truncate">{currentMod.title}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Mobile backdrop for easy dismissal */}
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs sm:hidden"
            onClick={() => setIsOpen(false)}
          />

          <div className="fixed inset-x-3 top-16 sm:inset-x-auto sm:left-0 sm:top-full sm:absolute mt-2 sm:mt-3 w-auto sm:w-[420px] max-w-md p-3.5 rounded-3xl bg-slate-900/98 sm:bg-slate-900/95 border border-white/10 shadow-2xl backdrop-blur-2xl z-50 animate-fade-in space-y-2.5">
            <div className="flex items-center justify-between px-2 py-1 border-b border-white/5">
              <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                Curriculum Explorer
              </span>
              <span className="text-[11px] font-mono text-indigo-400 font-bold">
                {progress.completedModules.length}/{courseData.length} Completed
              </span>
            </div>

            {/* Track Switcher Tabs */}
            <div className="flex items-center gap-1 p-1 rounded-2xl bg-black/40 border border-white/10">
              <button
                onClick={() => setSelectedTrack('all')}
                className={`flex-1 py-1 rounded-xl text-[11px] font-mono font-bold transition text-center ${
                  selectedTrack === 'all'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All ({courseData.length})
              </button>
              <button
                onClick={() => setSelectedTrack('core')}
                className={`flex-1 py-1 rounded-xl text-[11px] font-mono font-bold transition text-center ${
                  selectedTrack === 'core'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                🤖 Agentic (01-15)
              </button>
              <button
                onClick={() => setSelectedTrack('fde')}
                className={`flex-1 py-1 rounded-xl text-[11px] font-mono font-bold transition text-center ${
                  selectedTrack === 'fde'
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                💼 FDE Track (16-24)
              </button>
            </div>

            <div className="space-y-1.5 max-h-[60vh] sm:max-h-80 overflow-y-auto pr-1">
              {filteredModules.map(mod => {
                const isActive = mod.id === activeModuleId;
                const isCompleted = progress.completedModules.includes(mod.id);
                const isUnlocked = isLessonUnlocked(mod.id);
                const isModFde = mod.id >= 16;

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
                        ? isModFde
                          ? 'bg-gradient-to-r from-sky-600 to-blue-700 text-white font-semibold shadow-md'
                          : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-md'
                        : isUnlocked
                        ? 'bg-slate-800/40 hover:bg-slate-800 text-slate-200 border border-white/5'
                        : 'bg-slate-900/30 text-slate-500 border border-transparent cursor-not-allowed opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                      <span className="text-lg sm:text-xl p-1 rounded-xl bg-black/20 shrink-0">{mod.icon}</span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] uppercase font-mono opacity-75">
                            Module {String(mod.id).padStart(2, '0')}
                          </span>
                          {isModFde && (
                            <span className="px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-300 font-mono text-[9px] font-bold">
                              FDE
                            </span>
                          )}
                        </div>
                        <div className="font-medium text-xs text-white truncate">
                          {mod.title}
                        </div>
                      </div>
                    </div>
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                    ) : !isUnlocked ? (
                      <Lock className="w-3.5 h-3.5 text-slate-500 shrink-0 ml-2" />
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
