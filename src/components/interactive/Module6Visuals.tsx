import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, ShieldCheck, Zap, Server, Lock, Cpu, BarChart3, Users, RefreshCw } from 'lucide-react';

export const ProductionChallengesHexMap: React.FC = () => {
  const [selectedChallenge, setSelectedChallenge] = useState<number>(0);

  const challenges = [
    { title: '1. High Latency', icon: '⏱️', problem: 'Heavy LLM calls and multi-turn loops create multi-second user delays and compound cloud costs.', strategy: 'Model routing (lightweight models for routine extraction), response caching, and parallelized tool invocations.' },
    { title: '2. Output Uncertainty', icon: '🌀', problem: 'Ungrounded LLMs hallucinate plausible-sounding but factually wrong data, eroding user trust in high-stakes tasks.', strategy: 'Ground prompts in verifiable documents via RAG, enforce schema validation guardrails, and score confidence.' },
    { title: '3. Memory Inconsistency', icon: '🧠', problem: 'Cross-session context loss, stale data, and memory corruption across multi-agent shared state.', strategy: 'Strict three-tier memory architecture (short/long/external), explicit read/write access policies, and selective retention.' },
    { title: '4. System Scalability', icon: '📈', problem: 'Systems degrade or costs spike exponentially as user volume and parallel agent swarms grow.', strategy: 'Modular decoupled microservices, async queue processing, load balancing, and batching tool calls.' },
    { title: '5. Integration Complexity', icon: '🔌', problem: 'Fragile connections across disparate third-party APIs, legacy endpoints, and conflicting data schemas.', strategy: 'Standardized tool JSON schemas, dedicated API abstraction layers, and explicit inter-agent communication protocols.' },
    { title: '6. Security Vulnerabilities', icon: '🔒', problem: 'Prompt injection, jailbreaking, and unintentional PII leakage introduce severe liabilities.', strategy: 'Concentric defense: input filtering, PII redaction, tool allowlisting, and role-based access authorization.' },
    { title: '7. Lack of Standard Metrics', icon: '📊', problem: 'Traditional static benchmarks fail to measure dynamic, goal-seeking agent workflows over time.', strategy: 'Task-oriented metrics: Success Rate, Hit Ratio@K, Average Number of Turns, and qualitative review traces.' },
    { title: '8. Human Review Overhead', icon: '👥', problem: 'Excessive human review steps create operational bottlenecks, high labor costs, and reviewer fatigue.', strategy: 'Strategic escalation triggers (high-stakes only), automated AI-generated reviewer summaries, and feedback loops.' },
    { title: '9. Cascading Faults', icon: '💥', problem: 'Single tool or API failures mid-execution crash the workflow and leave memory in corrupted states.', strategy: 'Graceful degradation, exponential backoff retries, state checkpointing, and safe rollback recovery.' },
  ];

  const current = challenges[selectedChallenge];

  return (
    <div className="rounded-3xl p-6 sm:p-8 bg-slate-900/80 border border-white/10 space-y-6 shadow-2xl backdrop-blur-xl">
      <div className="space-y-1 border-b border-white/10 pb-4">
        <h4 className="font-bold text-white text-base sm:text-lg flex items-center gap-2">
          <span className="text-xl">⚡</span>
          The 9 Production Engineering Challenges & Design Strategies
        </h4>
        <p className="text-xs text-slate-400">
          Click any challenge below to inspect its operational vulnerability and architectural solution
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {challenges.map((c, idx) => {
          const isSelected = selectedChallenge === idx;
          return (
            <button
              key={idx}
              onClick={() => setSelectedChallenge(idx)}
              className={`p-3 rounded-2xl border text-left transition-all ${
                isSelected
                  ? 'bg-violet-950/60 border-violet-500/60 text-white shadow-lg shadow-violet-500/20 ring-1 ring-violet-500/30'
                  : 'bg-black/30 border-white/5 text-slate-400 hover:border-white/10 hover:text-slate-200'
              }`}
            >
              <div className="text-lg mb-1">{c.icon}</div>
              <div className="font-bold text-xs truncate">{c.title}</div>
            </button>
          );
        })}
      </div>

      <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-4 animate-fade-in font-sans">
        <div className="flex items-center gap-2">
          <span className="text-xl">{current.icon}</span>
          <h5 className="font-bold text-white text-base">{current.title}</h5>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/20 space-y-1">
            <span className="text-xs font-mono font-bold text-rose-300 uppercase">The Production Challenge</span>
            <p className="text-xs text-slate-300 leading-relaxed">{current.problem}</p>
          </div>

          <div className="p-4 rounded-xl bg-violet-950/20 border border-violet-500/20 space-y-1">
            <span className="text-xs font-mono font-bold text-violet-300 uppercase">Architectural Mitigation</span>
            <p className="text-xs text-slate-200 leading-relaxed">{current.strategy}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProductionChecklistInteractive: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    'p1': true,
    'r1': true,
    'm1': true,
  });

  const categories = [
    {
      title: 'Performance & Latency',
      items: [
        { id: 'p1', label: 'Response times within acceptable limits for critical user journeys' },
        { id: 'p2', label: 'System load-tested under peak concurrency conditions' },
        { id: 'p3', label: 'Cost implications of LLM inference & tool usage managed via routing' },
      ],
    },
    {
      title: 'Reliability & Accuracy',
      items: [
        { id: 'r1', label: 'Hallucination minimized via RAG and grounding checks' },
        { id: 'r2', label: 'Error handling and automatic exponential backoff retries configured' },
        { id: 'r3', label: 'Graceful degradation designed for third-party tool outages' },
      ],
    },
    {
      title: 'Memory Management',
      items: [
        { id: 'm1', label: 'Memory consistency maintained across turns and agents' },
        { id: 'm2', label: 'Sensitive data retention & expiration policies enforced' },
        { id: 'm3', label: 'Vector database scalable for multi-session expansion' },
      ],
    },
    {
      title: 'Security & Oversight',
      items: [
        { id: 's1', label: 'Inputs & outputs filtered for prompt injection and PII' },
        { id: 's2', label: 'Tool allowlisting and authorization policies enforced' },
        { id: 's3', label: 'Human-in-the-Loop approval gates in place for high-risk actions' },
      ],
    },
  ];

  const totalItems = categories.reduce((sum, c) => sum + c.items.length, 0);
  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const pct = Math.round((completedCount / totalItems) * 100);

  const toggleItem = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="rounded-3xl p-6 sm:p-8 bg-slate-900/80 border border-white/10 space-y-6 shadow-2xl backdrop-blur-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <h4 className="font-bold text-white text-base sm:text-lg flex items-center gap-2">
            <span className="text-xl">📋</span>
            Production Readiness Audit Checklist
          </h4>
          <p className="text-xs text-slate-400">
            Audit your system against the course's production readiness criteria
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-xs font-mono font-bold text-violet-400">
            {completedCount} / {totalItems} Passed ({pct}%)
          </div>
          <div className="w-24 h-2 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-300"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
        {categories.map((cat, cIdx) => (
          <div key={cIdx} className="space-y-3 p-4 rounded-2xl bg-black/40 border border-white/5">
            <h5 className="font-bold text-xs uppercase font-mono text-violet-400 tracking-wider">
              {cat.title}
            </h5>
            <div className="space-y-2">
              {cat.items.map(item => {
                const isChecked = !!checkedItems[item.id];
                return (
                  <label
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/[0.03] cursor-pointer transition text-xs text-slate-300 select-none"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}}
                      className="mt-0.5 accent-violet-500 rounded"
                    />
                    <span className={isChecked ? 'text-white' : 'text-slate-400'}>
                      {item.label}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
