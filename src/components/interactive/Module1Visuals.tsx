import React, { useState, useEffect } from 'react';
import { Play, Pause, ChevronRight, RotateCcw, Eye, Brain, Zap, ArrowRight, CheckCircle2, HelpCircle } from 'lucide-react';

export const PerceiveReasonActLoop: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const steps = [
    {
      id: 'perceive',
      name: '1. Perception',
      icon: Eye,
      color: 'text-sky-400 bg-sky-500/10 border-sky-500/30',
      activeRing: 'ring-sky-500/50 shadow-sky-500/20',
      summary: 'Sensory intake & environmental observation',
      detail: 'The agent extracts structured meaning from raw signals: user messages, API webhooks, document scans, sensor feeds, or live system state.',
      example: 'Flight cancelled alert received via airline API webhook + passenger calendar checked.',
    },
    {
      id: 'reason',
      name: '2. Reasoning & Planning',
      icon: Brain,
      color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30',
      activeRing: 'ring-indigo-500/50 shadow-indigo-500/20',
      summary: 'Deliberation, contextual evaluation & action planning',
      detail: 'The agent assesses goal constraints, consults short & long-term memory, and decomposes the problem into a verified sequence of tool calls.',
      example: 'LLM reasons: "Passenger has meetings in Berlin at 10 AM tomorrow. Connecting flight via Frankfurt arrives at 8 AM. Hotel check-in must be delayed."',
    },
    {
      id: 'act',
      name: '3. Action Execution',
      icon: Zap,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      activeRing: 'ring-emerald-500/50 shadow-emerald-500/20',
      summary: 'Executing decisions via external tools & systems',
      detail: 'The agent initiates real-world actions: invoking database transactions, dispatching emails, querying flight APIs, or adjusting physical actuators.',
      example: 'Books Frankfurt flight, sends confirmation to passenger, and messages hotel concierge.',
    },
  ];

  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setActiveStep(prev => (prev + 1) % steps.length);
      }, 2400);
    }
    return () => clearInterval(timer);
  }, [isPlaying, steps.length]);

  return (
    <div className="rounded-3xl p-4 sm:p-8 bg-slate-900/80 border border-white/10 space-y-5 sm:space-y-6 shadow-2xl backdrop-blur-xl">
      <div className="flex items-center justify-between flex-wrap gap-3 sm:gap-4 border-b border-white/10 pb-4">
        <div>
          <h4 className="font-bold text-white text-sm sm:text-lg flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-indigo-500 animate-pulse shrink-0" />
            <span>The Autonomous Cognitive Loop</span>
          </h4>
          <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
            Russell & Norvig: Perceive → Reason → Act foundation
          </p>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition shadow-sm"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'Pause' : 'Auto Play'}</span>
          </button>
          <button
            onClick={() => {
              setIsPlaying(false);
              setActiveStep(prev => (prev + 1) % steps.length);
            }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium bg-white/5 hover:bg-white/10 text-slate-200 transition border border-white/10"
          >
            <span>Step</span> <ChevronRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => {
              setIsPlaying(false);
              setActiveStep(0);
            }}
            className="p-1.5 sm:p-2 rounded-xl text-xs bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition border border-white/10"
            title="Reset"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          const isActive = idx === activeStep;
          return (
            <div
              key={s.id}
              onClick={() => {
                setIsPlaying(false);
                setActiveStep(idx);
              }}
              className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer space-y-3 ${
                isActive
                  ? `bg-slate-800/90 border-indigo-500/60 shadow-xl ${s.activeRing} ring-1`
                  : 'bg-black/30 border-white/5 hover:border-white/10 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`p-2.5 rounded-xl ${s.color}`}>
                  <Icon className="w-5 h-5" />
                </span>
                <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                  isActive ? 'bg-indigo-500/20 text-indigo-300' : 'bg-white/5 text-slate-500'
                }`}>
                  Phase 0{idx + 1}
                </span>
              </div>
              <div>
                <h5 className="font-bold text-white text-sm">{s.name}</h5>
                <p className="text-xs text-slate-400 mt-1 leading-snug">{s.summary}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-2 animate-fade-in font-sans">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-indigo-400">
            Active Phase Deep Dive: {steps[activeStep].name}
          </span>
          <span className="text-xs text-slate-500 font-mono">Step {activeStep + 1} of 3</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
          {steps[activeStep].detail}
        </p>
        <div className="mt-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-indigo-200 font-mono">
          <strong className="text-indigo-400 block mb-0.5 font-bold">Real-World Execution Example:</strong>
          {steps[activeStep].example}
        </div>
      </div>
    </div>
  );
};

export const ModelVsAgentComparison: React.FC = () => {
  const [sliderPos, setSliderPos] = useState<number>(50);

  const rows = [
    { feature: 'Scope', model: 'Narrow task (e.g. classification)', agent: 'Broader system of continuous behavior' },
    { feature: 'Role', model: 'Computes outputs from inputs', agent: 'Chooses actions in pursuit of goals' },
    { feature: 'Context Awareness', model: 'Limited to current inference window', agent: 'Maintains and updates internal context' },
    { feature: 'Initiative', model: 'Waits for user query', agent: 'Acts autonomously when triggered or scheduled' },
    { feature: 'Tool Use', model: 'No external tool integration', agent: 'Yes, often integrates APIs, DBs, and search' },
    { feature: 'Analogy', model: 'Calculator waiting for an equation', agent: 'Personal assistant listening and taking action' },
  ];

  return (
    <div className="rounded-3xl p-4 sm:p-8 bg-slate-900/80 border border-white/10 space-y-5 sm:space-y-6 shadow-2xl backdrop-blur-xl">
      <div className="space-y-1 border-b border-white/10 pb-4">
        <h4 className="font-bold text-white text-base sm:text-lg flex items-center gap-2">
          <span className="text-xl">⚖️</span>
          Tactile Comparison: AI Model vs. AI Agent
        </h4>
        <p className="text-xs text-slate-400">
          Slide to inspect how passive models compare to active autonomous systems
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono font-bold">
          <span className="text-slate-400">AI Model Focus ({100 - sliderPos}%)</span>
          <span className="text-indigo-400">AI Agent Focus ({sliderPos}%)</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPos}
          onChange={e => setSliderPos(Number(e.target.value))}
          className="w-full accent-indigo-500 cursor-pointer"
        />
      </div>

      <div className="space-y-1">
        <div className="text-[11px] text-slate-500 font-mono text-right sm:hidden">
          ← Swipe horizontally to view full table →
        </div>
        <div className="overflow-x-auto rounded-2xl border border-white/5 no-scrollbar">
          <table className="w-full min-w-[480px] text-xs text-left">
            <thead className="text-[10px] font-mono uppercase bg-black/40 text-slate-400 border-b border-white/10">
              <tr>
                <th className="p-3 w-1/4">Dimension</th>
                <th className="p-3 w-3/8" style={{ opacity: Math.max(0.3, (100 - sliderPos) / 100) }}>
                  AI Model (Passive)
                </th>
                <th className="p-3 w-3/8 text-indigo-300 font-bold" style={{ opacity: Math.max(0.3, sliderPos / 100) }}>
                  AI Agent (Active)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {rows.map((r, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02]">
                  <td className="p-3 font-semibold text-slate-300 font-mono text-[11px]">{r.feature}</td>
                  <td className="p-3 text-slate-400 leading-snug" style={{ opacity: Math.max(0.3, (100 - sliderPos) / 100) }}>
                    {r.model}
                  </td>
                  <td className="p-3 text-indigo-200 font-medium leading-snug" style={{ opacity: Math.max(0.3, sliderPos / 100) }}>
                    {r.agent}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export const DecisionTreeFlowchart: React.FC = () => {
  const [q1, setQ1] = useState<boolean | null>(null);
  const [q2, setQ2] = useState<boolean | null>(null);
  const [q3, setQ3] = useState<boolean | null>(null);

  const reset = () => {
    setQ1(null);
    setQ2(null);
    setQ3(null);
  };

  const needsAgent = q1 === true || q2 === true || q3 === true;
  const isComplete = q1 !== null && q2 !== null && q3 !== null;

  return (
    <div className="rounded-3xl p-4 sm:p-8 bg-slate-900/80 border border-white/10 space-y-5 sm:space-y-6 shadow-2xl backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h4 className="font-bold text-white text-base sm:text-lg flex items-center gap-2">
            <span className="text-xl">🌳</span>
            <span>Interactive Decision Tree</span>
          </h4>
          <p className="text-xs text-slate-400">
            Determine when building an agent is justified
          </p>
        </div>
        <button
          onClick={reset}
          className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1 shrink-0 px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 transition"
        >
          <RotateCcw className="w-3.5 h-3.5" /> <span>Reset</span>
        </button>
      </div>

      <div className="space-y-3 sm:space-y-4">
        <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2.5">
          <div className="text-xs font-semibold text-white">
            Signal 1: Does the task require contextual, nuanced decision-making?
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setQ1(true)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition flex-1 sm:flex-none text-center ${q1 === true ? 'bg-indigo-600 text-white' : 'bg-white/5 text-slate-400 hover:text-white'}`}
            >
              Yes (Nuanced judgment)
            </button>
            <button
              onClick={() => setQ1(false)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition flex-1 sm:flex-none text-center ${q1 === false ? 'bg-slate-700 text-white' : 'bg-white/5 text-slate-400 hover:text-white'}`}
            >
              No (Deterministic rules)
            </button>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2.5">
          <div className="text-xs font-semibold text-white">
            Signal 2: Are business rules too large, fragmented, or volatile to hardcode?
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setQ2(true)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition flex-1 sm:flex-none text-center ${q2 === true ? 'bg-indigo-600 text-white' : 'bg-white/5 text-slate-400 hover:text-white'}`}
            >
              Yes (Evolving rules)
            </button>
            <button
              onClick={() => setQ2(false)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition flex-1 sm:flex-none text-center ${q2 === false ? 'bg-slate-700 text-white' : 'bg-white/5 text-slate-400 hover:text-white'}`}
            >
              No (Static & clear)
            </button>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2.5">
          <div className="text-xs font-semibold text-white">
            Signal 3: Does the pipeline rely on unstructured natural language data (PDFs, emails)?
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setQ3(true)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition flex-1 sm:flex-none text-center ${q3 === true ? 'bg-indigo-600 text-white' : 'bg-white/5 text-slate-400 hover:text-white'}`}
            >
              Yes (Unstructured text)
            </button>
            <button
              onClick={() => setQ3(false)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition flex-1 sm:flex-none text-center ${q3 === false ? 'bg-slate-700 text-white' : 'bg-white/5 text-slate-400 hover:text-white'}`}
            >
              No (Structured tabular data)
            </button>
          </div>
        </div>
      </div>

      {isComplete && (
        <div className={`p-5 rounded-2xl border text-xs sm:text-sm animate-fade-in ${
          needsAgent ? 'bg-indigo-950/40 border-indigo-500/40 text-indigo-200' : 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
        }`}>
          <div className="font-bold flex items-center gap-2 text-sm text-white mb-1">
            {needsAgent ? '🤖 Build an LLM-Powered AI Agent' : '⚡ Use Simple Deterministic Automation'}
          </div>
          <p className="leading-relaxed">
            {needsAgent
              ? 'At least one key signal was met. An LLM agent offers flexibility, handles ambiguity, and reduces manual script maintenance.'
              : 'None of the criteria require agentic autonomy. A deterministic script or standard database query is faster, cheaper, and 100% reliable.'}
          </p>
        </div>
      )}
    </div>
  );
};
