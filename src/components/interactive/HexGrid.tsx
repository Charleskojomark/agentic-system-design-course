import React, { useState } from 'react';
import {
  Zap,
  AlertTriangle,
  Database,
  TrendingUp,
  GitMerge,
  ShieldAlert,
  BarChart3,
  UserCheck,
  RefreshCcw,
  Check,
} from 'lucide-react';

export const HexGrid: React.FC = () => {
  const [selectedHex, setSelectedHex] = useState<number>(0);

  const challenges = [
    {
      id: 'latency',
      name: 'High Inference Latency',
      icon: Zap,
      color: '#f59e0b',
      problem: 'Heavy models, sequential tool chains, and multi-turn loops introduce 10+ second delays.',
      strategies: ['Judicious model selection & routing', 'Model quantization & distillation', 'Output & tool caching', 'Parallel tool execution', 'Async background processing'],
    },
    {
      id: 'hallucination',
      name: 'Output Uncertainty & Hallucination',
      icon: AlertTriangle,
      color: '#ef4444',
      problem: 'LLMs generate plausible but factually wrong statements, catastrophic in legal/financial advice.',
      strategies: ['Retrieval-Augmented Generation (RAG)', 'Rules-based output validation', 'Ensembling & consensus voting', 'Confidence scoring with explicit limits'],
    },
    {
      id: 'memory',
      name: 'Memory Management & Consistency',
      icon: Database,
      color: '#3b82f6',
      problem: 'Agents lose context, repeat questions, or accumulate stale state across long conversations.',
      strategies: ['Structured 3-tier memory separation', 'Explicit read/write access policies', 'Selective retention & TTL expiration', 'Memory versioning & audit lineage'],
    },
    {
      id: 'scalability',
      name: 'Scalability',
      icon: TrendingUp,
      color: '#10b981',
      problem: 'Systems handling 1 user collapse under 10,000 concurrent requests due to rate limits and cost.',
      strategies: ['Modular microservice architecture', 'Multi-agent workload distribution', 'Dynamic endpoint load balancing', 'Batching optimized tool API calls'],
    },
    {
      id: 'integration',
      name: 'Integration Complexity',
      icon: GitMerge,
      color: '#a855f7',
      problem: 'Connecting heterogeneous APIs, legacy databases, and web services with distinct schemas.',
      strategies: ['Standardized JSON schema tool definitions', 'API abstraction decoupling layers', 'Comprehensive try/catch & retry logic', 'Explicit inter-agent communication protocols'],
    },
    {
      id: 'security',
      name: 'Security & Privacy Vulnerabilities',
      icon: ShieldAlert,
      color: '#ec4899',
      problem: 'Prompt injection, jailbreaking, and unintentional PII data leakage into public vectors.',
      strategies: ['Multi-layered input/output guardrails', 'Automated PII scrubbing before storage', 'Least-privilege token access control', 'Differential privacy & encrypted sandboxes'],
    },
    {
      id: 'evaluation',
      name: 'Lack of Standardized Evaluation',
      icon: BarChart3,
      color: '#06b6d4',
      problem: 'Traditional static NLP metrics cannot measure dynamic goal-seeking and multi-turn adaptation.',
      strategies: ['Task-oriented metrics (Success Rate, Hit@K, Turns)', 'Simulated user test environments', 'Human-in-the-loop qualitative scoring', 'Full-trace observability & logging (LangSmith)'],
    },
    {
      id: 'hitl-overhead',
      name: 'Human-in-the-Loop Overhead',
      icon: UserCheck,
      color: '#6366f1',
      problem: 'Over-escalating routine requests creates reviewer fatigue and eliminates automation speed.',
      strategies: ['Strategic touchpoints on high-stakes thresholds only', 'Context-rich reviewer dashboards', 'Automated concise agent escalation summaries', 'Continuous few-shot learning from human fixes'],
    },
    {
      id: 'fault-tolerance',
      name: 'Fault Tolerance & Recovery',
      icon: RefreshCcw,
      color: '#14b8a6',
      problem: 'A single tool timeout or API hang crashes the entire multi-agent pipeline.',
      strategies: ['Graceful degradation on non-critical tool failure', 'Automatic retries with exponential backoff & jitter', 'State checkpointing and workflow resumption', 'Error boundaries isolating agent crashes'],
    },
  ];

  const current = challenges[selectedHex];
  const Icon = current.icon;

  return (
    <div className="rounded-3xl border border-purple-500/20 bg-slate-900/60 p-6 md:p-8 backdrop-blur-xl shadow-xl my-6">
      <div className="mb-6">
        <span className="text-xs uppercase tracking-wider font-bold text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-md border border-purple-500/20">
          Interactive Challenge Map
        </span>
        <h3 className="text-lg md:text-xl font-bold text-slate-100 mt-2">
          The 9 Production Engineering Challenges
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Select any challenge node to view the root failure mode and its proven architectural mitigation strategies.
        </p>
      </div>

      {/* Hex Grid Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-6">
        {challenges.map((c, idx) => {
          const CIcon = c.icon;
          const isSelected = selectedHex === idx;

          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelectedHex(idx)}
              className={`p-3.5 rounded-2xl border text-left transition-all ${
                isSelected
                  ? 'bg-slate-800 border-purple-500 text-white ring-2 ring-purple-500/40 shadow-lg scale-[1.02]'
                  : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0 shadow-inner"
                  style={{ backgroundColor: c.color }}
                >
                  <CIcon size={16} />
                </div>
                <span className="text-xs font-bold truncate">{c.name}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Detail Card */}
      <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md"
            style={{ backgroundColor: current.color }}
          >
            <Icon size={20} />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-100">{current.name}</h4>
            <span className="text-xs text-purple-400 font-mono">Production Vulnerability #{selectedHex + 1}</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/20 text-xs text-rose-200 mb-4 leading-relaxed">
          <strong className="text-rose-300">Failure Mode: </strong>
          {current.problem}
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs">
          <span className="font-semibold text-emerald-400 block mb-2">
            Architectural Mitigation Strategies:
          </span>
          <ul className="space-y-1.5 text-slate-300">
            {current.strategies.map((strategy, i) => (
              <li key={i} className="flex items-start gap-2">
                <Check size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>{strategy}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
