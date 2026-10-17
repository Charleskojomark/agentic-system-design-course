import React, { useState } from 'react';
import { Database, FileText, Clock, Cloud, ArrowRight, Play, RefreshCw, CheckCircle2 } from 'lucide-react';

export const MemoryInTheLoopVisualizer: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const loopSteps = [
    {
      step: '1. Perceive',
      sub: 'Input parsing',
      desc: 'User says: "Book the same flight as last Tuesday." The agent extracts intent and embedding.',
    },
    {
      step: '2. Recall (Pre-Reasoning)',
      sub: 'Memory Query',
      desc: 'BEFORE reasoning, agent queries Vector DB for "last Tuesday flight bookings" + short-term session buffer.',
    },
    {
      step: '3. Reason & Plan',
      sub: 'LLM Deliberation',
      desc: 'LLM combines prompt + retrieved memory: "Customer flew United UA-412. I will search availability for tomorrow."',
    },
    {
      step: '4. Act',
      sub: 'Tool Invocations',
      desc: 'Agent dispatches flight booking API for United UA-412 and reserves the seat.',
    },
    {
      step: '5. Store & Learn (Post-Action)',
      sub: 'Memory Consolidation',
      desc: 'Agent stores confirmation # to short-term buffer and updates long-term user travel habits.',
    },
  ];

  return (
    <div className="rounded-3xl p-4 sm:p-8 bg-slate-900/80 border border-white/10 space-y-5 sm:space-y-6 shadow-2xl backdrop-blur-xl">
      <div className="flex items-center justify-between flex-wrap gap-3 border-b border-white/10 pb-4">
        <div>
          <h4 className="font-bold text-white text-base sm:text-lg flex items-center gap-2">
            <span className="text-xl">🔄</span>
            <span>Memory in the Loop: 5-Stage Control Flow</span>
          </h4>
          <p className="text-xs text-slate-400">
            Memory supports the agent before, during, and after action
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveStep(prev => (prev + 1) % loopSteps.length)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition shadow-sm"
          >
            <span>Next Phase</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-2.5">
        {loopSteps.map((s, idx) => {
          const isActive = idx === activeStep;
          return (
            <div
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`p-2.5 sm:p-3.5 rounded-2xl border transition-all cursor-pointer text-center space-y-1 ${
                isActive
                  ? 'bg-amber-500/10 border-amber-500/50 text-white ring-1 ring-amber-500/30'
                  : 'bg-black/30 border-white/5 text-slate-400 hover:border-white/10'
              }`}
            >
              <div className="text-[9px] sm:text-[10px] font-mono text-amber-400 font-bold uppercase">
                Step 0{idx + 1}
              </div>
              <div className="font-bold text-[11px] sm:text-xs text-white truncate">{s.step}</div>
              <div className="text-[9px] sm:text-[10px] text-slate-400 line-clamp-1">{s.sub}</div>
            </div>
          );
        })}
      </div>

      <div className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-white/10 space-y-2 animate-fade-in">
        <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-amber-400 block">
          Current State Execution Breakdown: {loopSteps[activeStep].step}
        </span>
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
          {loopSteps[activeStep].desc}
        </p>
      </div>
    </div>
  );
};

export const ThreeTierMemoryExploration: React.FC = () => {
  const [activeTier, setActiveTier] = useState<'short' | 'long' | 'external'>('short');

  const tiers = {
    short: {
      name: 'Tier 1: Short-Term Memory',
      tag: 'In-Session Context Window',
      icon: Clock,
      storage: 'RAM buffer / conversation thread array',
      scope: 'Current session only (fleeting)',
      examples: ['What the user asked two messages ago', 'Parameters of a flight currently being booked', 'Active error counter'],
    },
    long: {
      name: 'Tier 2: Long-Term Memory',
      tag: 'Cross-Session Persistence',
      icon: Database,
      storage: 'Persistent Vector DB & Relational User Profile',
      scope: 'Across sessions and months',
      examples: ['Customer seating and airline loyalty preferences', 'Past support tickets submitted yesterday', 'Historical purchase patterns'],
    },
    external: {
      name: 'Tier 3: External Knowledge Memory (RAG)',
      tag: 'On-Demand Semantic Knowledge',
      icon: Cloud,
      storage: 'Enterprise Vector Search (RAG)',
      scope: 'Millions of external corporate documents',
      examples: ['Company return policy PDF documentation', 'API reference documentation', 'Real-time weather and flight aggregators'],
    },
  };

  const current = tiers[activeTier];

  return (
    <div className="rounded-3xl p-4 sm:p-8 bg-slate-900/80 border border-white/10 space-y-5 sm:space-y-6 shadow-2xl backdrop-blur-xl">
      <div className="space-y-1 border-b border-white/10 pb-4">
        <h4 className="font-bold text-white text-base sm:text-lg flex items-center gap-2">
          <span className="text-xl">🗄️</span>
          <span>The Three-Tier Memory Cabinet</span>
        </h4>
        <p className="text-xs text-slate-400">
          Click each memory tier to explore storage architecture, scope, and use cases
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(['short', 'long', 'external'] as const).map(tierKey => {
          const t = tiers[tierKey];
          const Icon = t.icon;
          const isSelected = activeTier === tierKey;

          return (
            <div
              key={tierKey}
              onClick={() => setActiveTier(tierKey)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                isSelected
                  ? 'bg-slate-800/90 border-amber-500/60 shadow-xl ring-1 ring-amber-500/30'
                  : 'bg-black/30 border-white/5 hover:border-white/10 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="p-2.5 rounded-xl bg-white/5 text-amber-400">
                  <Icon className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/5 text-amber-300 font-bold">
                  {tierKey.toUpperCase()}
                </span>
              </div>
              <h5 className="font-bold text-white text-sm">{t.name}</h5>
              <p className="text-xs text-slate-400">{t.tag}</p>
            </div>
          );
        })}
      </div>

      <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-4 animate-fade-in font-sans">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase">Storage Subsystem</span>
            <span className="text-xs text-white block">{current.storage}</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase">Persistence Scope</span>
            <span className="text-xs text-white block">{current.scope}</span>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <span className="text-xs font-mono font-bold text-amber-400 uppercase">Real-World Examples in Production</span>
          <div className="space-y-1.5">
            {current.examples.map((ex, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{ex}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
