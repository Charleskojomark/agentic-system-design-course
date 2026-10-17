import React, { useState } from 'react';
import { Compass, Info, Check } from 'lucide-react';

export const PromptInspector: React.FC = () => {
  const [activeSegment, setActiveSegment] = useState<string>('role');

  const segments = {
    role: {
      title: 'Agent Role & Persona',
      color: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
      description: 'Defines the agent identity, tone, and overall persona. Shapes expectations and conversational style.',
      text: 'You are an empathetic, concise IT support agent for Acme Corp.',
    },
    constraints: {
      title: 'Safety Constraints & Ethical Boundaries',
      color: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
      description: 'Enforces ethical guardrails, prohibited topics, privacy boundaries, and format expectations.',
      text: 'NEVER reveal employee passwords or private tokens. Always verify the caller badge ID before triggering password resets.',
    },
    toolGuide: {
      title: 'Tool Invocation Guidance',
      color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      description: 'Directs the model on when and how to invoke specific external APIs, avoiding hallucinated data.',
      text: 'If the user queries server status, invoke the CheckHealthAPI(service="all") rather than estimating status.',
    },
    escalation: {
      title: 'Escalation Policy',
      color: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      description: 'Instructs the agent on trigger conditions that necessitate handing off to human support.',
      text: 'If the customer expresses anger or has reported this issue > 2 times, hand off the session to a live supervisor.',
    },
  };

  return (
    <div className="rounded-3xl border border-slate-700/80 bg-slate-900/60 p-6 md:p-8 backdrop-blur-xl shadow-xl my-6">
      <div className="mb-4">
        <span className="text-xs uppercase tracking-wider font-bold text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-md border border-rose-500/20">
          Interactive Prompt Engineer
        </span>
        <h3 className="text-lg md:text-xl font-bold text-slate-100 mt-2">
          Deconstructing System Instructions
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Click or hover across the instruction segments to see how each prompt directive shapes agent behavior.
        </p>
      </div>

      {/* Interactive System Prompt Canvas */}
      <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs md:text-sm leading-relaxed space-y-3">
        <div className="text-slate-500 select-none">// SYSTEM INSTRUCTIONS PAYLOAD</div>

        <p>
          <span
            onClick={() => setActiveSegment('role')}
            className={`cursor-pointer px-2 py-1 rounded-lg border transition-all ${
              activeSegment === 'role'
                ? 'bg-indigo-600 text-white border-indigo-400 font-semibold ring-2 ring-indigo-400/50'
                : 'bg-indigo-950/40 text-indigo-300 border-indigo-800 hover:border-indigo-600'
            }`}
          >
            "{segments.role.text}"
          </span>{' '}
          <span
            onClick={() => setActiveSegment('constraints')}
            className={`cursor-pointer px-2 py-1 rounded-lg border transition-all ${
              activeSegment === 'constraints'
                ? 'bg-rose-600 text-white border-rose-400 font-semibold ring-2 ring-rose-400/50'
                : 'bg-rose-950/40 text-rose-300 border-rose-800 hover:border-rose-600'
            }`}
          >
            "{segments.constraints.text}"
          </span>{' '}
          <span
            onClick={() => setActiveSegment('toolGuide')}
            className={`cursor-pointer px-2 py-1 rounded-lg border transition-all ${
              activeSegment === 'toolGuide'
                ? 'bg-emerald-600 text-white border-emerald-400 font-semibold ring-2 ring-emerald-400/50'
                : 'bg-emerald-950/40 text-emerald-300 border-emerald-800 hover:border-emerald-600'
            }`}
          >
            "{segments.toolGuide.text}"
          </span>{' '}
          <span
            onClick={() => setActiveSegment('escalation')}
            className={`cursor-pointer px-2 py-1 rounded-lg border transition-all ${
              activeSegment === 'escalation'
                ? 'bg-amber-600 text-white border-amber-400 font-semibold ring-2 ring-amber-400/50'
                : 'bg-amber-950/40 text-amber-300 border-amber-800 hover:border-amber-600'
            }`}
          >
            "{segments.escalation.text}"
          </span>
        </p>
      </div>

      {/* Segment Explanation Box */}
      {activeSegment && (
        <div className="mt-4 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 animate-in fade-in duration-200">
          <div className="flex items-center gap-2 mb-2 font-bold text-sm text-slate-200">
            <Info size={16} className="text-rose-400" />
            <span>
              {segments[activeSegment as keyof typeof segments].title}
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            {segments[activeSegment as keyof typeof segments].description}
          </p>
        </div>
      )}
    </div>
  );
};
