import React, { useState } from 'react';
import { Flame, Star, BookOpen, Map, Award, Sun, Moon, Volume2, VolumeX, Menu, X, Sparkles } from 'lucide-react';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentLevel = getLevel(progress.xp);
  const isCourseComplete = progress.completedModules.length >= 6;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#060913]/95 backdrop-blur-2xl">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand & Module Dropdown */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 ring-1 ring-white/20 shrink-0">
              <span className="text-sm sm:text-base">🤖</span>
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

        {/* Desktop Gamification Stats */}
        <div className="hidden lg:flex items-center gap-3.5 bg-white/[0.04] p-1.5 px-3.5 rounded-full border border-white/10 text-xs shadow-inner">
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

        {/* Desktop Action Controls */}
        <div className="hidden md:flex items-center gap-2">
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

        {/* Mobile Header Right (XP Badge + Menu Toggle) */}
        <div className="flex md:hidden items-center gap-1.5 sm:gap-2">
          {/* Compact XP pill */}
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/10 text-[11px] font-bold text-amber-400">
            <Star className="w-3 h-3 fill-amber-400" />
            <span>{progress.xp}</span>
          </div>

          {/* Quick theme button */}
          <button
            onClick={toggle}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white bg-white/[0.04] border border-white/10 transition"
            aria-label="Toggle theme"
          >
            {dark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-indigo-400" />}
          </button>

          {/* Hamburger Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-300 hover:text-white bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 transition"
            aria-label="Open mobile navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4 text-white" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#060913]/98 backdrop-blur-3xl px-4 py-4 space-y-4 animate-fade-in shadow-2xl">
          {/* Mobile Gamification Stats Card */}
          <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">{currentLevel.icon}</span>
              <div>
                <div className="text-xs font-bold text-white">{currentLevel.name}</div>
                <div className="text-[10px] text-slate-400 font-mono">{currentLevel.title}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono">
              <div className="flex items-center gap-1 text-orange-400 font-bold">
                <Flame className="w-3.5 h-3.5 fill-orange-400" />
                <span>{progress.streak}d</span>
              </div>
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{progress.xp} XP</span>
              </div>
            </div>
          </div>

          {/* Quick Action Navigation Buttons */}
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => {
                onOpenGlossary();
                setMobileMenuOpen(false);
              }}
              className="p-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 flex flex-col items-center justify-center gap-1 text-center transition"
            >
              <BookOpen className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-semibold text-slate-200">Glossary</span>
            </button>

            <button
              onClick={() => {
                onOpenMap();
                setMobileMenuOpen(false);
              }}
              className="p-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 flex flex-col items-center justify-center gap-1 text-center transition"
            >
              <Map className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-semibold text-slate-200">Roadmap</span>
            </button>

            <button
              onClick={() => {
                onOpenCertificate();
                setMobileMenuOpen(false);
              }}
              className={`p-3 rounded-2xl flex flex-col items-center justify-center gap-1 text-center transition border ${
                isCourseComplete
                  ? 'bg-gradient-to-r from-amber-500/20 to-indigo-600/20 border-amber-500/40 text-amber-300 ring-1 ring-amber-400/30'
                  : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/10 text-amber-300'
              }`}
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-semibold">Certificate</span>
            </button>
          </div>

          {/* Motion preference & info */}
          <div className="flex items-center justify-between pt-1 px-1 text-xs text-slate-400">
            <button
              onClick={toggleReducedMotion}
              className="flex items-center gap-1.5 py-1 text-slate-400 hover:text-white transition"
            >
              {reducedMotion ? <VolumeX className="w-3.5 h-3.5 text-amber-400" /> : <Volume2 className="w-3.5 h-3.5 text-indigo-400" />}
              <span>{reducedMotion ? 'Animations Off' : 'Animations On'}</span>
            </button>
            <span className="font-mono text-[11px] text-indigo-400 font-bold">
              {progress.completedModules.length}/6 Modules Cleared
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
