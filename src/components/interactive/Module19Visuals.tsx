import React, { useState } from 'react';
import { 
  Cpu, 
  Layers, 
  ShieldCheck, 
  Activity, 
  Terminal, 
  Zap, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  Workflow, 
  Boxes,
  Lock,
  Eye,
  Sliders,
  Sparkles
} from 'lucide-react';

export const HarnessEngineeringCockpit: React.FC = () => {
  const [guardrailsEnabled, setGuardrailsEnabled] = useState<boolean>(true);
  const [contextCompaction, setContextCompaction] = useState<boolean>(true);
  const [criticReview, setCriticReview] = useState<boolean>(true);
  const [simRunning, setSimRunning] = useState<boolean>(false);
  const [simState, setSimState] = useState<'idle' | 'running' | 'success' | 'failure'>('idle');
  const [logMessages, setLogMessages] = useState<string[]>([]);

  const runSimulation = () => {
    setSimRunning(true);
    setSimState('running');
    setLogMessages(['[T=0s] Initializing reasoning loop (Prompt: Process 32 vendor invoices)...']);

    setTimeout(() => {
      setLogMessages(prev => [...prev, '[T=1.2s] Step 01: Tool query_invoices_db() executed (32 rows retrieved).']);
    }, 600);

    setTimeout(() => {
      if (!contextCompaction) {
        setLogMessages(prev => [
          ...prev, 
          '[T=2.4s] Warning: Context buffer at 98% capacity! Raw PDF text overflowing window.',
          '[T=3.1s] Error: Silent context truncation occurred. Foundation prompt dropped.',
          '[T=3.8s] Failure: Model hallucinates unauthorized discount approval (0.45 rate).'
        ]);
        setSimState('failure');
        setSimRunning(false);
      } else {
        setLogMessages(prev => [
          ...prev,
          '[T=2.2s] Context Compaction: Step summarization compacted 45KB payload into 1.2KB state whiteboard.',
          '[T=3.0s] Step 02: Verification against standard terms completed.'
        ]);

        setTimeout(() => {
          if (!guardrailsEnabled) {
            setLogMessages(prev => [
              ...prev,
              '[T=4.0s] Anomaly: Agent entered infinite retry loop on unparsed line item #14.',
              '[T=4.8s] Warning: 840 tool calls executed in 2 seconds ($140 token burn).',
              '[T=5.2s] Failure: Runaway session halted by cloud rate-limiter.'
            ]);
            setSimState('failure');
            setSimRunning(false);
          } else {
            setLogMessages(prev => [
              ...prev,
              '[T=3.8s] Guardrail: Budget ceiling verified (Turn 04/10, spend $0.04). Scope whitelist verified.'
            ]);

            setTimeout(() => {
              if (criticReview) {
                setLogMessages(prev => [
                  ...prev,
                  '[T=4.5s] Critic Model: Grounding check passed (100% clause attribution confirmed).',
                  '[T=5.0s] Success: 32 invoices processed and verified with zero human interventions.'
                ]);
                setSimState('success');
                setSimRunning(false);
              } else {
                setLogMessages(prev => [
                  ...prev,
                  '[T=4.4s] Warning: No critic review. Minor formatting typo delivered to downstream accounting.',
                  '[T=4.9s] Success: Completed with warnings.'
                ]);
                setSimState('success');
                setSimRunning(false);
              }
            }, 800);
          }
        }, 800);
      }
    }, 1200);
  };

  const handleReset = () => {
    setSimState('idle');
    setSimRunning(false);
    setLogMessages([]);
  };

  return (
    <div className="space-y-6 p-6 rounded-3xl bg-slate-900/90 border border-purple-500/20 backdrop-blur-xl shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-purple-400 font-bold flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5" /> Harness Engineering
          </span>
          <h3 className="text-xl font-bold text-white mt-1">
            Production Harness Engineering Cockpit
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Toggle harness controls (guardrails, context compaction, critic review) to observe how the runtime protects against catastrophic failure.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Harness Control Panel */}
        <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-4">
          <span className="text-xs font-mono uppercase font-bold text-slate-300 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-purple-400" /> Harness Runtime Controls
          </span>

          <div className="space-y-3">
            {/* Guardrails Toggle */}
            <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-emerald-400" /> Multi-Layer Guardrails
                </div>
                <div className="text-[10px] text-slate-400">Budget ceilings (max 10 turns), tool whitelisting, output regex.</div>
              </div>
              <button
                onClick={() => setGuardrailsEnabled(!guardrailsEnabled)}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                  guardrailsEnabled ? 'bg-emerald-500' : 'bg-slate-700'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  guardrailsEnabled ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>

            {/* Context Compaction Toggle */}
            <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <RefreshCw className="w-3.5 h-3.5 text-blue-400" /> Context Compaction
                </div>
                <div className="text-[10px] text-slate-400">Step summarization and selective retrieval to prevent silent truncation.</div>
              </div>
              <button
                onClick={() => setContextCompaction(!contextCompaction)}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                  contextCompaction ? 'bg-blue-500' : 'bg-slate-700'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  contextCompaction ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>

            {/* Critic Review Loop Toggle */}
            <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-purple-400" /> AI Review Loop (Critic Model)
                </div>
                <div className="text-[10px] text-slate-400">Independent critic verifying factual grounding before user delivery.</div>
              </div>
              <button
                onClick={() => setCriticReview(!criticReview)}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                  criticReview ? 'bg-purple-500' : 'bg-slate-700'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  criticReview ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>
          </div>

          <div className="flex gap-2 pt-1">
            <button
              onClick={runSimulation}
              disabled={simRunning}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-mono font-bold transition flex items-center justify-center gap-1.5 ${
                simRunning
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-md'
              }`}
            >
              <Zap className="w-3.5 h-3.5" /> Execute Agentic Workflow
            </button>
            <button
              onClick={handleReset}
              className="p-2.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition"
              title="Reset Console"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Live Execution Terminal */}
        <div className="p-4 rounded-2xl bg-black/60 border border-white/10 flex flex-col justify-between font-mono text-xs">
          <div className="space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-[10px] text-slate-500 flex items-center gap-1.5">
                <Terminal className="w-3 h-3 text-purple-400" /> HARNESS_TELEMETRY.LOG
              </span>
              <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                simState === 'running'
                  ? 'bg-amber-500/20 text-amber-300'
                  : simState === 'success'
                  ? 'bg-emerald-500/20 text-emerald-300'
                  : simState === 'failure'
                  ? 'bg-rose-500/20 text-rose-300'
                  : 'bg-slate-800 text-slate-500'
              }`}>
                {simState}
              </span>
            </div>

            <div className="space-y-1.5 min-h-[160px] max-h-[220px] overflow-y-auto pr-1">
              {logMessages.length === 0 ? (
                <div className="text-slate-600 italic pt-8 text-center">
                  Configure harness controls and click Execute to observe runtime behavior...
                </div>
              ) : (
                logMessages.map((msg, i) => (
                  <div key={i} className={`text-[11px] leading-relaxed ${
                    msg.includes('Failure') || msg.includes('Error')
                      ? 'text-rose-400 font-bold'
                      : msg.includes('Warning')
                      ? 'text-amber-400'
                      : msg.includes('Success') || msg.includes('Guardrail') || msg.includes('Compaction')
                      ? 'text-emerald-300'
                      : 'text-slate-300'
                  }`}>
                    {msg}
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-500">
            <span>Model: Claude 3.5 Sonnet</span>
            <span>Harness: Production v2.4</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const OrchestrationTopologyAndFrameworkSelector: React.FC = () => {
  const [activeTopology, setActiveTopology] = useState<number>(0);
  const [selectedFramework, setSelectedFramework] = useState<number>(0);

  const topologies = [
    {
      name: 'Sequential Pipeline',
      tagline: 'Linear transformations with clear step handoffs',
      icon: Workflow,
      bestFor: 'Extraction → Analysis → Report generation',
      debugging: 'High — failures isolate to a specific step',
      costProfile: 'Predictable — linear token consumption'
    },
    {
      name: 'Parallel Orchestration',
      tagline: 'Simultaneous execution of independent sub-tasks',
      icon: Boxes,
      bestFor: 'Batch analyzing 20 contracts simultaneously',
      debugging: 'Moderate — requires robust aggregation logic',
      costProfile: 'Multiplied — Nx simultaneous model calls'
    },
    {
      name: 'Loop Orchestration',
      tagline: 'Iterative refinement until an exit condition is met',
      icon: RefreshCw,
      bestFor: 'Code generation & test-driven refinement',
      debugging: 'Complex — risk of infinite cycling',
      costProfile: 'Variable — bounded by max-turn ceilings'
    },
    {
      name: 'Hierarchical Orchestrator',
      tagline: 'Central manager directing specialized worker agents',
      icon: Layers,
      bestFor: 'Multi-domain complex enterprise workflows',
      debugging: 'Highest — orchestrator coordination errors',
      costProfile: 'Heavy — coordination token overhead'
    }
  ];

  const frameworks = [
    {
      name: 'LangGraph',
      paradigm: 'Directed state graphs',
      fit: 'Complex branching, cycles, explicit persistent state',
      observability: 'Native LangSmith integration',
      lockIn: 'Open-source, model agnostic'
    },
    {
      name: 'CrewAI',
      paradigm: 'Role-based crews',
      fit: 'Human business process metaphors (researcher, writer)',
      observability: 'Telemetry hooks available',
      lockIn: 'Open-source, role-centric'
    },
    {
      name: 'AutoGen',
      paradigm: 'Conversational turn-taking',
      fit: 'Multi-agent debate, code verification, critique loops',
      observability: 'Structured message transcripts',
      lockIn: 'Microsoft open-source ecosystem'
    },
    {
      name: 'Google ADK',
      paradigm: 'Hierarchical multi-agent',
      fit: 'Google Cloud native, Gemini reasoning models',
      observability: 'Vertex AI tracing',
      lockIn: 'Google Cloud affinity'
    }
  ];

  const currentTop = topologies[activeTopology];
  const currentFw = frameworks[selectedFramework];

  return (
    <div className="space-y-6 p-6 rounded-3xl bg-slate-900/90 border border-purple-500/20 backdrop-blur-xl shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-purple-400 font-bold flex items-center gap-1.5">
            <Workflow className="w-3.5 h-3.5" /> Architecture Topologies
          </span>
          <h3 className="text-xl font-bold text-white mt-1">
            Orchestration Topologies & Framework Selection Matrix
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Compare multi-agent coordination patterns and evaluate frameworks against team maintainability.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Topologies Explorer */}
        <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
          <span className="text-xs font-mono uppercase font-bold text-slate-300 block">
            1. Select Orchestration Topology:
          </span>

          <div className="grid grid-cols-2 gap-2">
            {topologies.map((t, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTopology(idx)}
                className={`p-3 rounded-xl border text-left transition ${
                  activeTopology === idx
                    ? 'bg-purple-500/20 border-purple-400 text-white shadow-md'
                    : 'bg-slate-900/40 border-white/5 text-slate-400 hover:bg-white/[0.04]'
                }`}
              >
                <div className="font-bold text-xs text-white truncate">{t.name}</div>
                <div className="text-[10px] text-purple-300 font-mono mt-0.5 truncate">{t.costProfile.split(' — ')[0]}</div>
              </button>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5 space-y-2 mt-2">
            <div className="text-xs font-bold text-white">{currentTop.name}: {currentTop.tagline}</div>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div>
                <span className="text-slate-500 block">Best Use Case:</span>
                <span className="text-slate-300 font-mono">{currentTop.bestFor}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Debuggability:</span>
                <span className="text-emerald-400 font-mono">{currentTop.debugging}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Frameworks Matrix */}
        <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
          <span className="text-xs font-mono uppercase font-bold text-slate-300 block">
            2. Evaluate Framework Fit:
          </span>

          <div className="grid grid-cols-2 gap-2">
            {frameworks.map((f, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedFramework(idx)}
                className={`p-3 rounded-xl border text-left transition ${
                  selectedFramework === idx
                    ? 'bg-indigo-500/20 border-indigo-400 text-white shadow-md'
                    : 'bg-slate-900/40 border-white/5 text-slate-400 hover:bg-white/[0.04]'
                }`}
              >
                <div className="font-bold text-xs text-white truncate">{f.name}</div>
                <div className="text-[10px] text-indigo-300 font-mono mt-0.5 truncate">{f.paradigm}</div>
              </button>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5 space-y-2 mt-2">
            <div className="text-xs font-bold text-white">{currentFw.name} ({currentFw.paradigm})</div>
            <div className="space-y-1.5 text-[11px]">
              <div>
                <span className="text-slate-500 block">Ideal Architecture Fit:</span>
                <span className="text-slate-300 font-mono">{currentFw.fit}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Observability & Tracing:</span>
                <span className="text-indigo-300 font-mono">{currentFw.observability}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Team Ownership & Portability:</span>
                <span className="text-emerald-300 font-mono">{currentFw.lockIn}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
