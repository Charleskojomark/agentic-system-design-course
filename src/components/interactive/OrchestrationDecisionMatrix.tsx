import React, { useState } from 'react';
import { GitBranch, CheckCircle2, RotateCcw } from 'lucide-react';

export const OrchestrationDecisionMatrix: React.FC = () => {
  const [scope, setScope] = useState<'narrow' | 'broad'>('narrow');
  const [skills, setSkills] = useState<'single' | 'distinct'>('single');
  const [execution, setExecution] = useState<'sequential' | 'parallel'>('sequential');
  const [observability, setObservability] = useState<'high' | 'flexible'>('high');

  const isMultiAgent =
    scope === 'broad' || skills === 'distinct' || execution === 'parallel';

  const recommendedPattern = isMultiAgent
    ? execution === 'parallel'
      ? 'Manager-Worker Pattern (Hierarchical Team with Parallel Worker Execution)'
      : 'Decentralized Peer Handoff Pattern (Modular Stage Handoffs)'
    : execution === 'sequential' && observability === 'high'
    ? 'ReAct Pattern (Single-Agent with Step-by-Step Auditable Thought/Action Lanes)'
    : 'Plan-and-Execute Pattern (Upfront Decomposition & Linear Execution)';

  return (
    <div className="rounded-3xl border border-slate-700/80 bg-slate-900/60 p-6 md:p-8 backdrop-blur-xl shadow-xl my-6">
      <div className="mb-4">
        <span className="text-xs uppercase tracking-wider font-bold text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-md border border-rose-500/20">
          Interactive Architecture Selector
        </span>
        <h3 className="text-lg md:text-xl font-bold text-slate-100 mt-2">
          Orchestration Decision Matrix
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Adjust the 4 system factors from the course text to compute your optimal orchestration blueprint.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
        {/* Factor 1: Task Scope */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
          <label className="text-xs font-bold text-slate-300 block mb-2">
            1. Task Scope & Autonomy Boundaries:
          </label>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => setScope('narrow')}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                scope === 'narrow'
                  ? 'bg-rose-950/40 border-rose-500 text-rose-200 ring-2 ring-rose-500/30'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <strong>Narrow:</strong> Self-contained goal (e.g. Meeting scheduler)
            </button>
            <button
              type="button"
              onClick={() => setScope('broad')}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                scope === 'broad'
                  ? 'bg-rose-950/40 border-rose-500 text-rose-200 ring-2 ring-rose-500/30'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <strong>Broad:</strong> Multi-domain goal (e.g. Enterprise Assistant)
            </button>
          </div>
        </div>

        {/* Factor 2: Skill Specialization */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
          <label className="text-xs font-bold text-slate-300 block mb-2">
            2. Specialization of Competencies:
          </label>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => setSkills('single')}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                skills === 'single'
                  ? 'bg-rose-950/40 border-rose-500 text-rose-200 ring-2 ring-rose-500/30'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <strong>Unified:</strong> Single prompt skill suffices
            </button>
            <button
              type="button"
              onClick={() => setSkills('distinct')}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                skills === 'distinct'
                  ? 'bg-rose-950/40 border-rose-500 text-rose-200 ring-2 ring-rose-500/30'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <strong>Distinct:</strong> Code, Legal & Finance split
            </button>
          </div>
        </div>

        {/* Factor 3: Execution Topology */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
          <label className="text-xs font-bold text-slate-300 block mb-2">
            3. Execution Flow Topology:
          </label>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => setExecution('sequential')}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                execution === 'sequential'
                  ? 'bg-rose-950/40 border-rose-500 text-rose-200 ring-2 ring-rose-500/30'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <strong>Sequential:</strong> Step-by-step linear stages
            </button>
            <button
              type="button"
              onClick={() => setExecution('parallel')}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                execution === 'parallel'
                  ? 'bg-rose-950/40 border-rose-500 text-rose-200 ring-2 ring-rose-500/30'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <strong>Parallel:</strong> Concurrent background branches
            </button>
          </div>
        </div>

        {/* Factor 4: Observability Needs */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
          <label className="text-xs font-bold text-slate-300 block mb-2">
            4. Observability & Auditing Constraints:
          </label>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => setObservability('high')}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                observability === 'high'
                  ? 'bg-rose-950/40 border-rose-500 text-rose-200 ring-2 ring-rose-500/30'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <strong>High Audit:</strong> Strict regulator logs needed
            </button>
            <button
              type="button"
              onClick={() => setObservability('flexible')}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                observability === 'flexible'
                  ? 'bg-rose-950/40 border-rose-500 text-rose-200 ring-2 ring-rose-500/30'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <strong>Flexible:</strong> Low friction / internal tool
            </button>
          </div>
        </div>
      </div>

      {/* Computed Recommendation */}
      <div className="p-5 rounded-2xl bg-slate-950 border border-rose-500/40">
        <div className="flex items-center gap-2 mb-2 font-bold text-sm text-rose-300">
          <CheckCircle2 size={18} className="text-rose-400" />
          <span>Recommended Architecture: {isMultiAgent ? 'Multi-Agent Network' : 'Single-Agent System'}</span>
        </div>
        <p className="text-xs font-mono text-emerald-300 font-semibold mb-2">
          ▶ {recommendedPattern}
        </p>
        <p className="text-xs text-slate-400 leading-relaxed">
          {isMultiAgent
            ? 'Because your workload requires parallel execution or distinct domain specialization, a multi-agent architecture will prevent context dilution and optimize throughput.'
            : 'A single-agent architecture keeps system complexity low, centralizes state monitoring, and avoids inter-agent latency overhead.'}
        </p>
      </div>
    </div>
  );
};
