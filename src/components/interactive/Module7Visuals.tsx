import React, { useState } from 'react';
import { Bot, MessageSquare, Sparkles, CheckCircle2, ArrowRight, RefreshCw, Layers, ShieldAlert, Sliders, TrendingUp, HelpCircle } from 'lucide-react';

export const MACRSActPlanningVisualizer: React.FC = () => {
  const [selectedTurn, setSelectedTurn] = useState<number>(0);
  const [customInput, setCustomInput] = useState('');
  const [activeTab, setActiveTab] = useState<'interactive' | 'diagram'>('interactive');

  const turns = [
    {
      userQuery: 'Hello, I want to watch a relaxing animated film.',
      asking: 'Ask about the era: "Sure! Are you looking for classic films or more recent ones?"',
      recommending: 'Recommend "Zootopia": "You might love Zootopia, a vibrant and heartwarming animated adventure!"',
      chitchat: 'Chat about Disney: "Animated movies are wonderful for unwinding after a long day! Disney animations especially have great soundtracks."',
      winner: 'asking',
      plannerReasoning: 'User preference is too broad ("relaxing animated film"). Recommending immediately risks a premature hit. Asking a targeted question about era narrows the candidate pool effectively while keeping engagement high.',
      selectedOutput: 'Sure! Are you looking for classic films or more recent ones?'
    },
    {
      userQuery: 'I would like to find some recent ones.',
      asking: 'Ask about theme: "Do you prefer fantasy adventure, lighthearted animal comedy, or family drama?"',
      recommending: 'Recommend "Elemental": "How about \'Elemental\'? It\'s a visually stunning recent animated release with great humor."',
      chitchat: 'Chat about animation: "Recent computer animations have pushed visual details so far, from water to fire physics!"',
      winner: 'recommending',
      plannerReasoning: 'Preferences are sufficiently narrowed (Relaxing + Animated + Recent). Dialogue progress indicates readiness for a top recommendation. Recommending "Elemental" capitalizes on momentum.',
      selectedOutput: 'How about "Elemental"? It\'s a relaxing and heartwarming recent animated film about fire and water elements.'
    }
  ];

  const current = turns[selectedTurn];

  return (
    <div className="rounded-3xl p-4 sm:p-8 bg-slate-900/80 border border-white/10 space-y-5 sm:space-y-6 shadow-2xl backdrop-blur-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <h4 className="font-bold text-white text-base sm:text-lg flex items-center gap-2">
            <span className="text-xl">🤖</span>
            <span>MACRS Multi-Agent Act Planning Framework</span>
          </h4>
          <p className="text-xs text-slate-400">
            Three specialized responders propose moves; the central planner selects the optimal act
          </p>
        </div>

        <div className="flex items-center gap-2 bg-black/40 p-1 rounded-xl border border-white/10 text-xs">
          <button
            onClick={() => setActiveTab('interactive')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              activeTab === 'interactive' ? 'bg-pink-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Live Coordinator
          </button>
          <button
            onClick={() => setActiveTab('diagram')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              activeTab === 'diagram' ? 'bg-pink-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Architecture Diagram
          </button>
        </div>
      </div>

      {activeTab === 'diagram' ? (
        <div className="space-y-4">
          <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/50 p-2 sm:p-4 text-center">
            <img
              src="/images/macrs_framework.png"
              alt="MACRS Multi-Agent Act Planning Framework diagram"
              className="max-h-[420px] mx-auto rounded-xl object-contain shadow-lg"
            />
          </div>
          <p className="text-xs text-slate-400 leading-relaxed text-center font-mono">
            Figure: Three responder agents propose responses in parallel; the central Planner evaluates context to dispatch the winning turn.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {/* Turn selector tabs */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedTurn(0)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                selectedTurn === 0
                  ? 'bg-pink-600 text-white shadow-md'
                  : 'bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              Turn 1: Broad Query
            </button>
            <button
              onClick={() => setSelectedTurn(1)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                selectedTurn === 1
                  ? 'bg-pink-600 text-white shadow-md'
                  : 'bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              Turn 2: Refined Era
            </button>
          </div>

          {/* User Input Bubble */}
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex items-start gap-3">
            <span className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-xs shrink-0">
              👤
            </span>
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
                User Input Message
              </span>
              <p className="text-xs sm:text-sm text-white font-medium">"{current.userQuery}"</p>
            </div>
          </div>

          {/* 3 Responder Proposals Grid */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-indigo-400 font-bold block">
              Phase 1: Parallel Option Generation (Specialized Responders)
            </span>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Asking Agent */}
              <div className={`p-4 rounded-2xl border transition-all ${
                current.winner === 'asking'
                  ? 'bg-sky-950/40 border-sky-500/50 ring-1 ring-sky-500/30'
                  : 'bg-black/20 border-white/5 opacity-60'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-sky-300 flex items-center gap-1.5">
                    <span>❓</span> Asking Agent
                  </span>
                  {current.winner === 'asking' && (
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-bold uppercase">
                      Selected
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-300 leading-snug">{current.asking}</p>
              </div>

              {/* Recommending Agent */}
              <div className={`p-4 rounded-2xl border transition-all ${
                current.winner === 'recommending'
                  ? 'bg-emerald-950/40 border-emerald-500/50 ring-1 ring-emerald-500/30'
                  : 'bg-black/20 border-white/5 opacity-60'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                    <span>💡</span> Recommending Agent
                  </span>
                  {current.winner === 'recommending' && (
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold uppercase">
                      Selected
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-300 leading-snug">{current.recommending}</p>
              </div>

              {/* Chit-Chat Agent */}
              <div className={`p-4 rounded-2xl border transition-all ${
                current.winner === 'chitchat'
                  ? 'bg-purple-950/40 border-purple-500/50 ring-1 ring-purple-500/30'
                  : 'bg-black/20 border-white/5 opacity-60'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                    <span>💬</span> Chit-Chat Agent
                  </span>
                  {current.winner === 'chitchat' && (
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold uppercase">
                      Selected
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-300 leading-snug">{current.chitchat}</p>
              </div>
            </div>
          </div>

          {/* Phase 2: Planner Agent Selection */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-pink-950/30 via-slate-900 to-indigo-950/30 border border-pink-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-pink-400 font-bold flex items-center gap-1.5">
                <BrainIcon className="w-4 h-4 text-pink-400" />
                Phase 2: Planner Agent Deliberation
              </span>
              <span className="text-[11px] font-mono text-slate-400">Decision Policy: Value Maximization</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-mono bg-black/40 p-3 rounded-xl border border-white/5">
              <strong className="text-pink-300 block mb-1">Planner Reasoning:</strong>
              {current.plannerReasoning}
            </p>

            <div className="pt-2 border-t border-white/10 flex items-start gap-2.5">
              <span className="w-6 h-6 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center text-xs shrink-0 font-bold">
                ✓
              </span>
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                  Final System Output Delivered to User
                </span>
                <span className="text-xs sm:text-sm font-semibold text-white">
                  "{current.selectedOutput}"
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const MACRSReflectionVisualizer: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'interactive' | 'diagram'>('interactive');

  const reflectionStages = [
    {
      title: '1. User Feedback Received',
      userBubble: 'Thanks. But I\'m not really into romantic storylines.',
      agentOutput: 'User rejected the previous romantic recommendation. Explicit negative constraint signaled.',
      color: 'rose',
    },
    {
      title: '2. Information-Level Reflection',
      userBubble: 'Extract implicit & explicit preference update',
      agentOutput: 'User Profile updated: [-Romance, +Animated, +Relaxing, +Family/Adventure]. Added to persistent profile memory.',
      color: 'cyan',
    },
    {
      title: '3. Strategy-Level Reflection',
      userBubble: 'Detect conversational failure trigger',
      agentOutput: 'Corrective experience generated for Planner & Recommender: "Avoid romance subplots; pivot to comedy or fantasy elements immediately."',
      color: 'amber',
    },
    {
      title: '4. Dynamic In-Session Adaptation',
      userBubble: 'Refined recommendation executed',
      agentOutput: 'Planner dispatches refined recommendation: "How about \'Elemental\' or \'Zootopia\'? Focus is purely on friendship and humor without romantic plots."',
      color: 'emerald',
    },
  ];

  const currentStage = reflectionStages[activeStep];

  return (
    <div className="rounded-3xl p-4 sm:p-8 bg-slate-900/80 border border-white/10 space-y-5 sm:space-y-6 shadow-2xl backdrop-blur-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <h4 className="font-bold text-white text-base sm:text-lg flex items-center gap-2">
            <span className="text-xl">🔄</span>
            <span>User Feedback-Aware Reflection Mechanism</span>
          </h4>
          <p className="text-xs text-slate-400">
            Real-time closed loop: Information reflection (Profile) + Strategy reflection (Tactics)
          </p>
        </div>

        <div className="flex items-center gap-2 bg-black/40 p-1 rounded-xl border border-white/10 text-xs">
          <button
            onClick={() => setActiveTab('interactive')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              activeTab === 'interactive' ? 'bg-pink-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Closed-Loop Simulator
          </button>
          <button
            onClick={() => setActiveTab('diagram')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              activeTab === 'diagram' ? 'bg-pink-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Reflection Diagram
          </button>
        </div>
      </div>

      {activeTab === 'diagram' ? (
        <div className="space-y-4">
          <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/50 p-2 sm:p-4 text-center">
            <img
              src="/images/macrs_reflection.png"
              alt="MACRS User Feedback-Aware Reflection Mechanism diagram"
              className="max-h-[420px] mx-auto rounded-xl object-contain shadow-lg"
            />
          </div>
          <p className="text-xs text-slate-400 leading-relaxed text-center font-mono">
            Figure: User feedback ('Not into romantic storylines') feeds directly into reflection, updating profile memory and dynamically adjusting the planner.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {/* 4 Steps timeline */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
            {reflectionStages.map((st, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  activeStep === idx
                    ? 'bg-pink-950/60 border-pink-500/60 text-white shadow-md ring-1 ring-pink-500/30'
                    : 'bg-black/30 border-white/5 text-slate-400 hover:border-white/10'
                }`}
              >
                <div className="text-[10px] font-mono text-pink-400 font-bold uppercase mb-1">
                  Phase 0{idx + 1}
                </div>
                <div className="text-xs font-semibold text-white truncate">{st.title.split('. ')[1]}</div>
              </button>
            ))}
          </div>

          {/* Active Phase Display */}
          <div className="p-4 sm:p-6 rounded-2xl bg-black/40 border border-white/10 space-y-4 animate-fade-in font-mono">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <span className="text-xs font-bold text-pink-400 uppercase tracking-wider">
                {currentStage.title}
              </span>
              <span className="text-[11px] text-slate-500">Step {activeStep + 1} of 4</span>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-300">
              <strong className="text-amber-400 block mb-1">Contextual Trigger / Signal:</strong>
              "{currentStage.userBubble}"
            </div>

            <div className="p-3.5 rounded-xl bg-pink-950/20 border border-pink-500/20 text-xs text-pink-200">
              <strong className="text-pink-300 block mb-1">Agent Reflection & Adaptation Outcome:</strong>
              {currentStage.agentOutput}
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
                disabled={activeStep === 0}
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none text-xs text-slate-300 border border-white/10 transition"
              >
                ← Prev Step
              </button>
              <button
                onClick={() => setActiveStep(prev => (prev + 1) % reflectionStages.length)}
                className="px-4 py-1.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-xs font-bold text-white transition shadow-sm"
              >
                {activeStep < 3 ? 'Next Phase →' : 'Restart Cycle ↺'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const MACRSEvaluationVisualizer: React.FC = () => {
  const [removedComponent, setRemovedComponent] = useState<string | null>(null);

  const baselines = [
    { name: 'Fine-tuned GPT (Single Agent)', success: 40.2, hitK: 58.6, turns: 7.9, note: 'End-to-end monolithic model' },
    { name: 'GPT-RS (Rule + Model)', success: 42.5, hitK: 60.1, turns: 7.4, note: 'Simple rule-based + GPT recs' },
    { name: 'GPT-RL (Reinforcement Learning)', success: 48.7, hitK: 64.3, turns: 6.8, note: 'RL-optimized single agent' },
    { name: 'MACRS (Full Multi-Agent)', success: 58.3, hitK: 69.5, turns: 5.9, note: 'Full team + planner + reflection' },
  ];

  // Ablation impact calculation
  const getAblationStats = () => {
    if (!removedComponent) return { success: 58.3, hitK: 69.5, turns: 5.9, impact: 'Peak performance with all modules active.' };
    if (removedComponent === 'info-reflection') return { success: 49.1, hitK: 61.4, turns: 6.7, impact: 'Drops -9.2% success. System cannot update user profile based on implicit behavioral cues.' };
    if (removedComponent === 'strategy-reflection') return { success: 47.8, hitK: 60.2, turns: 7.1, impact: 'Drops -10.5% success. System repeatedly makes the same mistake after rejection.' };
    if (removedComponent === 'multi-agent') return { success: 42.1, hitK: 59.8, turns: 7.6, impact: 'Drops -16.2% success. Single agent suffers prompt overload and lacks role focus.' };
    if (removedComponent === 'planner') return { success: 44.0, hitK: 61.0, turns: 7.5, impact: 'Drops -14.3% success. Without strategic planner, candidate choices are scattered and unaligned.' };
    return { success: 58.3, hitK: 69.5, turns: 5.9, impact: '' };
  };

  const currentStats = getAblationStats();

  return (
    <div className="rounded-3xl p-4 sm:p-8 bg-slate-900/80 border border-white/10 space-y-5 sm:space-y-6 shadow-2xl backdrop-blur-xl">
      <div className="space-y-1 border-b border-white/10 pb-4">
        <h4 className="font-bold text-white text-base sm:text-lg flex items-center gap-2">
          <span className="text-xl">📊</span>
          <span>MACRS Evaluation & Ablation Stress Test</span>
        </h4>
        <p className="text-xs text-slate-400">
          Compare MACRS against single-agent baselines and test which architectural pillars drive success
        </p>
      </div>

      {/* Benchmark Comparison Table */}
      <div className="space-y-2">
        <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
          Longitudinal Benchmark Results (Simulation over 1,000+ Sessions)
        </span>

        <div className="overflow-x-auto rounded-2xl border border-white/10 no-scrollbar">
          <table className="w-full min-w-[500px] text-xs text-left">
            <thead className="text-[10px] font-mono uppercase bg-black/50 text-slate-400 border-b border-white/10">
              <tr>
                <th className="p-3">Model Architecture</th>
                <th className="p-3">Success Rate (%)</th>
                <th className="p-3">Hit Ratio@K (%)</th>
                <th className="p-3">Avg. Turns</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              {baselines.map((b, idx) => (
                <tr key={idx} className={b.name.includes('MACRS') ? 'bg-pink-950/25 font-bold text-pink-300' : 'hover:bg-white/[0.02] text-slate-300'}>
                  <td className="p-3 font-sans">
                    <div>{b.name}</div>
                    <div className="text-[10px] text-slate-500 font-normal">{b.note}</div>
                  </td>
                  <td className="p-3">{b.success}%</td>
                  <td className="p-3">{b.hitK}%</td>
                  <td className="p-3 text-emerald-400">{b.turns}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Ablation Sandbox */}
      <div className="space-y-3 pt-2">
        <span className="text-[11px] font-mono uppercase tracking-wider text-pink-400 font-bold block">
          Ablation Stress-Tester: What Happens When You Remove a Component?
        </span>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setRemovedComponent(null)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              removedComponent === null ? 'bg-pink-600 text-white' : 'bg-white/5 text-slate-400 hover:text-white'
            }`}
          >
            All Components Active (Baseline)
          </button>
          <button
            onClick={() => setRemovedComponent('info-reflection')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              removedComponent === 'info-reflection' ? 'bg-rose-600 text-white' : 'bg-white/5 text-slate-400 hover:text-white'
            }`}
          >
            - Disable Info Reflection
          </button>
          <button
            onClick={() => setRemovedComponent('strategy-reflection')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              removedComponent === 'strategy-reflection' ? 'bg-rose-600 text-white' : 'bg-white/5 text-slate-400 hover:text-white'
            }`}
          >
            - Disable Strategy Reflection
          </button>
          <button
            onClick={() => setRemovedComponent('multi-agent')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              removedComponent === 'multi-agent' ? 'bg-rose-600 text-white' : 'bg-white/5 text-slate-400 hover:text-white'
            }`}
          >
            - Remove Multi-Agent Separation
          </button>
          <button
            onClick={() => setRemovedComponent('planner')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              removedComponent === 'planner' ? 'bg-rose-600 text-white' : 'bg-white/5 text-slate-400 hover:text-white'
            }`}
          >
            - Remove Central Planner
          </button>
        </div>

        {/* Dynamic Metric Readout */}
        <div className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-white/10 space-y-3 font-mono">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-[10px] text-slate-400 uppercase block">Success Rate</span>
              <strong className="text-base sm:text-lg text-white">{currentStats.success}%</strong>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-[10px] text-slate-400 uppercase block">Hit Ratio@K</span>
              <strong className="text-base sm:text-lg text-white">{currentStats.hitK}%</strong>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-[10px] text-slate-400 uppercase block">Avg Turns</span>
              <strong className="text-base sm:text-lg text-amber-400">{currentStats.turns}</strong>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed font-sans pt-1">
            <strong className="text-pink-400 font-mono">Architectural Diagnosis: </strong>
            {currentStats.impact}
          </p>
        </div>
      </div>
    </div>
  );
};

function BrainIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  );
}
