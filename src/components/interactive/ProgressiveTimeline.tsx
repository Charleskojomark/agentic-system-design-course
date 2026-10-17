import React, { useState } from 'react';
import { GitCommit, Sparkles, Cpu, Award, ArrowRight } from 'lucide-react';

export const ProgressiveTimeline: React.FC = () => {
  const [activeEra, setActiveEra] = useState<number>(2); // Default to modern LLM-powered

  const eras = [
    {
      id: 'rule-based',
      era: '1970s – 1980s',
      name: 'Rule-Based Expert Systems',
      subtitle: 'Fixed Logic & Manual If-Then Rules',
      icon: Cpu,
      color: '#94a3b8',
      summary: 'Developers explicitly coded every rule by hand (e.g., MYCIN, XCON).',
      strength: 'Deterministic, completely transparent, easy to inspect.',
      limitation: 'Brittle. Fails instantly on ambiguity or dynamic context. Does not generalize.',
      quote: '"If temperature > 30°C, turn on fan. If user says forgotten password, show reset form."',
    },
    {
      id: 'learning-based',
      era: '2010s',
      name: 'Learning-Based Agents (ML / RL)',
      subtitle: 'Trial, Error & Reward Optimization',
      icon: Award,
      color: '#38bdf8',
      summary: 'Shifted logic authoring from human hands to algorithmic reward signals (AlphaGo, robotic arms).',
      strength: 'Discovers strategies humans never thought to program explicitly.',
      limitation: 'Narrow domain, compute-intensive, requires massive simulation environments.',
      quote: '"AlphaGo defeated world champions by playing millions of simulated games against itself."',
    },
    {
      id: 'llm-powered',
      era: 'Present Day',
      name: 'LLM-Powered Agents',
      subtitle: 'Zero-Shot Generalization via Language',
      icon: Sparkles,
      color: '#a855f7',
      summary: 'Pretrained world knowledge enables zero-shot task decomposition, tool use, and conversational memory.',
      strength: 'Open-ended problem solving, natural language instructions, flexible tool chaining.',
      limitation: 'Hallucination potential, latency, and requires guardrails for safety.',
      quote: '"Summarize this research paper, query the database, and email key findings to the executive board."',
    },
  ];

  return (
    <div className="rounded-3xl border border-slate-700/80 bg-slate-900/60 p-6 md:p-8 backdrop-blur-xl shadow-xl my-6">
      <div className="mb-6">
        <span className="text-xs uppercase tracking-wider font-bold text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-md border border-purple-500/20">
          Evolutionary Timeline
        </span>
        <h3 className="text-lg md:text-xl font-bold text-slate-100 mt-2">
          From Explicit Rules to LLM-Powered Generalization
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Explore the chronological architectural leaps that brought AI agents from rigid scripts to autonomous reasoning engines.
        </p>
      </div>

      {/* Timeline Nav / Stepper */}
      <div className="relative flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
        {eras.map((era, idx) => {
          const Icon = era.icon;
          const isActive = activeEra === idx;

          return (
            <button
              key={era.id}
              type="button"
              onClick={() => setActiveEra(idx)}
              className={`w-full sm:w-1/3 p-4 rounded-2xl border text-left transition-all duration-200 ${
                isActive
                  ? 'bg-purple-950/40 border-purple-500/60 ring-2 ring-purple-500/40 shadow-lg'
                  : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 opacity-70 hover:opacity-100'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono text-purple-400 font-semibold">{era.era}</span>
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-white"
                  style={{ backgroundColor: era.color }}
                >
                  <Icon size={14} />
                </div>
              </div>
              <h4 className="text-sm font-bold text-slate-200 line-clamp-1">{era.name}</h4>
            </button>
          );
        })}
      </div>

      {/* Selected Era Card */}
      <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800/80">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h4 className="text-base font-bold text-slate-100">{eras[activeEra].name}</h4>
            <p className="text-xs text-purple-400">{eras[activeEra].subtitle}</p>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300">
            Era: {eras[activeEra].era}
          </span>
        </div>

        <p className="text-xs text-slate-300 mb-4 leading-relaxed">{eras[activeEra].summary}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs mb-4">
          <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-emerald-300">
            <span className="font-semibold block mb-1">Architectural Breakthrough:</span>
            {eras[activeEra].strength}
          </div>
          <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/20 text-rose-300">
            <span className="font-semibold block mb-1">Key Limitation:</span>
            {eras[activeEra].limitation}
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400 italic">
          {eras[activeEra].quote}
        </div>
      </div>
    </div>
  );
};
