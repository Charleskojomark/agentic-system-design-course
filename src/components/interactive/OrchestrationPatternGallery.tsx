import React, { useState } from 'react';
import { User, Users, Repeat, CheckSquare, GitPullRequest, Share2, Play, Pause, ChevronRight } from 'lucide-react';

export const OrchestrationPatternGallery: React.FC = () => {
  const [activePattern, setActivePattern] = useState<string>('react');
  const [reactStep, setReactStep] = useState<number>(0);

  const patterns = [
    {
      id: 'react',
      name: 'ReAct Pattern',
      category: 'Single-Agent',
      icon: Repeat,
      color: '#f43f5e',
      description: 'Alternates explicit Thought (reasoning), Action (tool calling), and Observation (environment feedback).',
      strength: 'Unmatched step-by-step auditing, transparency, and self-correction.',
    },
    {
      id: 'tool-loop',
      name: 'Tool Calling Loop',
      category: 'Single-Agent',
      icon: User,
      color: '#6366f1',
      description: 'Direct loop: agent receives task, invokes tools iteratively until condition met or exit.',
      strength: 'Simple to implement for lightweight exploration and conversational tools.',
    },
    {
      id: 'plan-execute',
      name: 'Plan-and-Execute',
      category: 'Single-Agent',
      icon: CheckSquare,
      color: '#10b981',
      description: 'Generates an entire multi-step plan upfront, then dispatches an executor to run steps sequentially.',
      strength: 'Separates expensive planning from fast execution. Great for structured reports.',
    },
    {
      id: 'manager-worker',
      name: 'Manager-Worker',
      category: 'Multi-Agent',
      icon: Users,
      color: '#a855f7',
      description: 'A central Manager decomposes goals, delegates to specialized Worker agents, and synthesizes results.',
      strength: 'Mirrors human engineering teams; enables parallel multi-agent execution.',
    },
    {
      id: 'handoff',
      name: 'Decentralized Handoff',
      category: 'Multi-Agent',
      icon: Share2,
      color: '#06b6d4',
      description: 'Peer-to-peer control transfer: agents pass the task directly to peer agents without a central coordinator.',
      strength: 'Highly resilient and modular, though requires deadlock safeguards.',
    },
  ];

  const reactSteps = [
    {
      lane: 'Thought',
      actor: 'Model Reasoning',
      color: 'text-purple-400 bg-purple-950/40 border-purple-800',
      text: '"User needs the cheapest flight to Tokyo departing next Friday. I must query the FlightAggregator API."',
    },
    {
      lane: 'Action',
      actor: 'Tool Execution',
      color: 'text-emerald-400 bg-emerald-950/40 border-emerald-800',
      text: 'Call FlightAggregator(dest="NRT", date="2026-10-23", sort="price_asc")',
    },
    {
      lane: 'Observation',
      actor: 'Environment Feedback',
      color: 'text-blue-400 bg-blue-950/40 border-blue-800',
      text: 'Returned 3 flights: ANA ($780), JAL ($820), United ($910). All non-stop.',
    },
    {
      lane: 'Next Thought',
      actor: 'Model Evaluation',
      color: 'text-rose-400 bg-rose-950/40 border-rose-800',
      text: '"ANA is the most affordable at $780. Goal fulfilled. Format final recommendation."',
    },
  ];

  const current = patterns.find((p) => p.id === activePattern) || patterns[0];

  return (
    <div className="rounded-3xl border border-rose-500/20 bg-slate-900/60 p-6 md:p-8 backdrop-blur-xl shadow-xl my-6">
      <div className="mb-6">
        <span className="text-xs uppercase tracking-wider font-bold text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-md border border-rose-500/20">
          Interactive Pattern Gallery
        </span>
        <h3 className="text-lg md:text-xl font-bold text-slate-100 mt-2">
          Orchestration Architectures in Motion
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Toggle between Single-Agent loops and Multi-Agent team coordination models.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {patterns.map((p) => {
          const Icon = p.icon;
          const isActive = activePattern === p.id;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setActivePattern(p.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                isActive
                  ? 'bg-rose-950/50 border-rose-500 text-rose-200 ring-2 ring-rose-500/30 shadow-md'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <Icon size={14} style={{ color: p.color }} />
              <span>{p.name}</span>
              <span className="text-[10px] opacity-60 font-mono">({p.category})</span>
            </button>
          );
        })}
      </div>

      {/* Pattern Visual Canvas */}
      <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
          <div>
            <h4 className="text-base font-bold text-slate-100">{current.name}</h4>
            <span className="text-xs text-rose-400 font-mono">{current.category} Architecture</span>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
            {current.strength}
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed mb-6">{current.description}</p>

        {/* ReAct Visualizer with Thought/Action Lanes */}
        {activePattern === 'react' && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                ReAct Step-Through Trace:
              </span>
              <button
                type="button"
                onClick={() => setReactStep((prev) => (prev + 1) % reactSteps.length)}
                className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white transition-colors"
              >
                <span>Next Lane</span>
                <ChevronRight size={13} />
              </button>
            </div>

            <div className="space-y-2.5">
              {reactSteps.map((s, idx) => {
                const isActive = reactStep === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setReactStep(idx)}
                    className={`cursor-pointer p-3.5 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                      isActive
                        ? `${s.color} ring-2 ring-rose-500/40 shadow-lg scale-[1.01]`
                        : 'bg-slate-900/40 border-slate-800/80 text-slate-400 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="px-2 py-0.5 rounded font-mono text-[10px] uppercase font-bold bg-slate-950 border border-slate-800">
                        {s.lane}
                      </span>
                      <span className="text-xs font-mono">{s.text}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 shrink-0">{s.actor}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Manager-Worker Org-Chart Preview */}
        {activePattern === 'manager-worker' && (
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
            <div className="inline-block p-3 rounded-xl bg-purple-950/80 border border-purple-500/50 text-purple-200 text-xs font-bold mb-4 shadow-md">
              👑 Research Manager Agent (Planner & Synthesizer)
            </div>
            <div className="w-0.5 h-6 bg-slate-700 mx-auto mb-4" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                <span className="font-bold text-slate-200 block mb-1">Worker 1: Competitor Intel</span>
                <span className="text-[11px] text-slate-400">Scrapes web & roadmaps</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                <span className="font-bold text-slate-200 block mb-1">Worker 2: Customer Voice</span>
                <span className="text-[11px] text-slate-400">Analyzes reviews & sentiments</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                <span className="font-bold text-slate-200 block mb-1">Worker 3: Sales Metrics</span>
                <span className="text-[11px] text-slate-400">Queries quarterly SQL revenue</span>
              </div>
            </div>
          </div>
        )}

        {/* Plan and Execute Preview */}
        {activePattern === 'plan-execute' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wide block mb-2">
                Phase 1: Upfront Plan Generation
              </span>
              <ol className="list-decimal list-inside space-y-1 text-xs text-slate-300 font-mono">
                <li>Extract Q2 revenue tables</li>
                <li>Generate bar chart of YoY growth</li>
                <li>Draft executive summary briefing</li>
                <li>Send email report to board</li>
              </ol>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wide block mb-2">
                Phase 2: Sequential Execution
              </span>
              <div className="space-y-1 text-xs text-slate-300 font-mono">
                <div className="text-emerald-400">✓ Step 1: SQL retrieved in 140ms</div>
                <div className="text-emerald-400">✓ Step 2: Chart created</div>
                <div className="text-amber-400 animate-pulse">▶ Step 3: LLM writing draft...</div>
                <div className="text-slate-500">○ Step 4: Pending email trigger</div>
              </div>
            </div>
          </div>
        )}

        {/* Decentralized Handoff */}
        {activePattern === 'handoff' && (
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center">
              <div className="p-3 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-200">
                Agent A: Intent Triage
              </div>
              <span className="text-slate-500 font-mono">-- P2P Handoff --&gt;</span>
              <div className="p-3 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-200">
                Agent B: Flight Booking
              </div>
              <span className="text-slate-500 font-mono">-- P2P Handoff --&gt;</span>
              <div className="p-3 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-200">
                Agent C: Hotel Concierge
              </div>
            </div>
          </div>
        )}

        {/* Tool Calling Loop */}
        {activePattern === 'tool-loop' && (
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-center">
            <div className="inline-block p-2 rounded-lg bg-indigo-950 text-indigo-300 border border-indigo-800 mb-2">
              User Goal Input
            </div>
            <div className="text-slate-500">↓</div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 max-w-sm mx-auto text-slate-300">
              Agent Model: Select Tool → Invoke API → Observe Result → Repeat until Done
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
