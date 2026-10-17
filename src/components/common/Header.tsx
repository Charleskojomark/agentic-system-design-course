import React from 'react';
import { Flame, Star, BookOpen, Map, Award, Sun, Moon, Volume2, VolumeX } from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';
import { useTheme } from '../../context/ThemeContext';
import { ModuleSelectorDropdown } from '../layout/ModuleSelectorDropdown';

export const Header: React.FC<{
  activeModuleId: number;
  onSelectModule: (id: number) => void;
  onOpenGlossary: () => void;
  onOpenMap: () => void;
  onOpenCertificate: () => void;
}> = ({
  activeModuleId,
  onSelectModule,
  onOpenGlossary,
  onOpenMap,
  onOpenCertificate,
}) => {
  const { progress, getLevel } = useProgress();
  const { dark, toggle, reducedMotion, toggleReducedMotion } = useTheme();
  const currentLevel = getLevel(progress.xp);
  const isCourseComplete = progress.completedModules.length >= 6;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] dark:border-white/[0.08] bg-[#060913]/90 dark:bg-[#060913]/90 backdrop-blur-2xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand & Module Dropdown */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 ring-1 ring-white/20">
              <span className="text-base">🤖</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-extrabold text-sm tracking-tight text-white block">
                AGENTIC
              </span>
              <span className="text-[9px] text-indigo-400 font-mono tracking-widest uppercase block -mt-1 font-bold">
                System Design
              </span>
            </div>
          </div>

          <ModuleSelectorDropdown
            activeModuleId={activeModuleId}
            onSelectModule={onSelectModule}
          />
        </div>

        {/* Gamification Stats */}
        <div className="hidden md:flex items-center gap-3.5 bg-white/[0.04] p-1.5 px-3.5 rounded-full border border-white/10 text-xs shadow-inner">
          <div className="flex items-center gap-1.5 font-bold text-orange-400 pr-3 border-r border-white/10">
            <Flame className="w-4 h-4 fill-orange-400" />
            <span>{progress.streak}d Streak</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-base">{currentLevel.icon}</span>
            <span className="font-semibold text-slate-200">{currentLevel.name}</span>
            <span className="font-bold text-amber-400 flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400" /> {progress.xp} XP
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenGlossary}
            className="px-3 py-1.5 rounded-full text-xs font-semibold text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition"
          >
            Glossary
          </button>
          <button
            onClick={onOpenMap}
            className="px-3 py-1.5 rounded-full text-xs font-semibold text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition"
          >
            Map
          </button>
          <button
            onClick={onOpenCertificate}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
              isCourseComplete
                ? 'bg-gradient-to-r from-amber-500 to-indigo-600 text-white shadow-md ring-1 ring-amber-300 animate-pulse'
                : 'bg-white/[0.04] hover:bg-white/[0.08] text-amber-300 border border-amber-500/30'
            }`}
          >
            Certificate
          </button>
          <div className="h-4 w-px bg-white/10 mx-0.5" />
          <button
            onClick={toggleReducedMotion}
            className="p-1.5 rounded-full text-slate-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition"
            title={reducedMotion ? 'Enable animations' : 'Reduce motion'}
          >
            {reducedMotion ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={toggle}
            className="p-1.5 rounded-full text-slate-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition"
            title={dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {dark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-indigo-400" />}
          </button>
        </div>
      </div>
    </header>
  );
};
