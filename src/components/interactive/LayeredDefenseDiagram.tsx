import React, { useState } from 'react';
import { Shield, ShieldAlert, UserCheck, Lock, Eye, AlertTriangle } from 'lucide-react';

export const LayeredDefenseDiagram: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<'input' | 'tool' | 'output' | 'human'>('input');

  const layers = {
    input: {
      title: 'Layer 1: Input Guardrails',
      ring: 'Outer Perimeter',
      color: '#06b6d4',
      intercepts: 'Before the LLM processes user or sensor queries.',
      defendsAgainst: ['Prompt injection overrides', 'Jailbreaking attempts', 'Inbound PII leakage'],
      techniques: 'Moderation API classifiers, regex sanitizers, topic allowlists.',
    },
    tool: {
      title: 'Layer 2: Tool-Use Safeguards',
      ring: 'Operational Perimeter',
      color: '#10b981',
      intercepts: 'Before any tool, API, or database write is executed.',
      defendsAgainst: ['Unauthorized payment calls', 'Accidental infinite query loops', 'Unchecked parameter injections'],
      techniques: 'Tool allowlists, argument JSON schemas, rate limits, sandbox dry-run simulation.',
    },
    output: {
      title: 'Layer 3: Output Validation',
      ring: 'Delivery Perimeter',
      color: '#f59e0b',
      intercepts: 'After LLM generation, before response is transmitted.',
      defendsAgainst: ['Hallucinated claims', 'Omission of mandatory legal disclaimers', 'Toxic or profane responses'],
      techniques: 'Factual consistency checkers (RAG verification), regex schema validators, blocklists.',
    },
    human: {
      title: 'Layer 4: Human Oversight',
      ring: 'Ultimate Authority',
      color: '#8b5cf6',
      intercepts: 'High-stakes inflection points, irreversible actions, or low model confidence.',
      defendsAgainst: ['Catastrophic model uncertainty', 'Irreversible money movement', 'Complex ethical edge cases'],
      techniques: 'HITL approval gates, real-time HOTL intervention consoles, HATL audit logging.',
    },
  };

  const selected = layers[activeLayer];

  return (
    <div className="rounded-3xl border border-cyan-500/20 bg-slate-900/60 p-6 md:p-8 backdrop-blur-xl shadow-xl my-6">
      <div className="mb-6">
        <span className="text-xs uppercase tracking-wider font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-md border border-cyan-500/20">
          Interactive Defense Visualizer
        </span>
        <h3 className="text-lg md:text-xl font-bold text-slate-100 mt-2">
          Concentric Layered Defense Architecture
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Click any defense ring to see where it intercepts the agent workflow and what threats it neutralizes.
        </p>
      </div>

      {/* Layer Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
        {(['input', 'tool', 'output', 'human'] as const).map((key) => {
          const l = layers[key];
          const isSelected = activeLayer === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setActiveLayer(key)}
              className={`p-3 rounded-2xl border text-left transition-all ${
                isSelected
                  ? 'bg-slate-800 border-cyan-400 text-white ring-2 ring-cyan-400/40 shadow-lg'
                  : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="text-[10px] font-mono uppercase text-cyan-400 block mb-0.5">
                {l.ring}
              </span>
              <h5 className="text-xs font-bold truncate">{l.title}</h5>
            </button>
          );
        })}
      </div>

      {/* Visual Concentric Ring Graphic */}
      <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center my-4 relative overflow-hidden">
        <div
          className={`w-64 h-64 rounded-full border-4 flex items-center justify-center transition-all duration-300 relative ${
            activeLayer === 'input' ? 'border-cyan-400 ring-8 ring-cyan-500/20' : 'border-cyan-500/30'
          }`}
        >
          <div
            className={`w-48 h-48 rounded-full border-4 flex items-center justify-center transition-all duration-300 ${
              activeLayer === 'tool' ? 'border-emerald-400 ring-8 ring-emerald-500/20' : 'border-emerald-500/30'
            }`}
          >
            <div
              className={`w-32 h-32 rounded-full border-4 flex items-center justify-center transition-all duration-300 ${
                activeLayer === 'output' ? 'border-amber-400 ring-8 ring-amber-500/20' : 'border-amber-500/30'
              }`}
            >
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center text-white transition-all shadow-md ${
                  activeLayer === 'human'
                    ? 'bg-purple-600 ring-8 ring-purple-500/30 scale-110'
                    : 'bg-purple-950/80'
                }`}
              >
                <Lock size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Layer Details */}
      <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-bold text-slate-100">{selected.title}</h4>
          <span className="font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
            {selected.intercepts}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <span className="font-semibold text-slate-300 block mb-1">Threats Intercepted:</span>
            <ul className="space-y-1 text-slate-400">
              {selected.defendsAgainst.map((item, idx) => (
                <li key={idx}>• {item}</li>
              ))}
            </ul>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <span className="font-semibold text-slate-300 block mb-1">Mitigation Mechanism:</span>
            <p className="text-slate-400 leading-relaxed">{selected.techniques}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
