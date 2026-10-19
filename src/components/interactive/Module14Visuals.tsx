import React, { useState } from 'react';
import { 
  HeartPulse, 
  Activity, 
  ShieldAlert, 
  Terminal, 
  Server, 
  Database, 
  Cpu, 
  RefreshCw, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Lock, 
  Sparkles,
  Layers,
  Send,
  UserCheck
} from 'lucide-react';

export const AIHospitalSimulationStudio: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(1);
  const [orderedLab, setOrderedLab] = useState<string | null>(null);
  const [sealLessons, setSealLessons] = useState<string[]>([
    "Lesson #14: In atypical chest pain with normal resting ECG, serial troponins at 0h and 3h are mandatory.",
    "Lesson #28: Always rule out aortic dissection prior to administering high-dose heparin anticoagulants."
  ]);

  const stages = [
    {
      num: 1,
      title: '1. Patient Intake & Dynamic Symptoms',
      role: 'Patient Agent (Roleplay Engine)',
      desc: 'Patient presents with 45 minutes of substernal chest tightness radiating to the left jaw. Symptoms worsen with exertion, accompanied by diaphoresis and nausea.',
      status: 'Intake Complete'
    },
    {
      num: 2,
      title: '2. Multi-Doctor Differential Diagnosis',
      role: 'Intern Doctor 1 (Cardio) & Intern Doctor 2 (General)',
      desc: 'Doctor 1 suspects Acute Coronary Syndrome (STEMI/NSTEMI). Doctor 2 considers Pulmonary Embolism or severe GERD spasm. Both recommend urgent diagnostic testing.',
      status: 'Hypotheses Formulated'
    },
    {
      num: 3,
      title: '3. Examiner Diagnostic Department',
      role: 'Examiner Agent (Lab & Imaging Simulator)',
      desc: orderedLab 
        ? `Lab Complete: ${orderedLab} results returned. ST-segment elevation observed in leads V1-V4. Troponin I elevated at 4.2 ng/mL (Normal < 0.04).`
        : 'Awaiting lab orders from doctors. Select a diagnostic test to run.',
      status: orderedLab ? 'Diagnostic Evidence Ready' : 'Pending Order'
    },
    {
      num: 4,
      title: '4. Medical Director Consensus & SEAL Memory',
      role: 'Medical Director (Evaluator & SEAL Engine)',
      desc: 'Director confirms diagnosis: Acute Anterior STEMI. Activates cardiac catheterization protocol. Trajectory and decision trace indexed into SEAL episodic memory.',
      status: 'Consensus Reached'
    }
  ];

  const handleOrderLab = (lab: string) => {
    setOrderedLab(lab);
    setActiveStage(3);
  };

  const handleCompleteCase = () => {
    setActiveStage(4);
    if (!sealLessons.includes("Lesson #42: Acute STEMI verified with ST elevation in V1-V4. Immediate cath lab activation within 90 minutes door-to-balloon.")) {
      setSealLessons(prev => [
        "Lesson #42: Acute STEMI verified with ST elevation in V1-V4. Immediate cath lab activation within 90 minutes door-to-balloon.",
        ...prev
      ]);
    }
  };

  return (
    <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-emerald-500/30 backdrop-blur-xl shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-[11px] font-bold border border-emerald-500/30">
              SIMULATOR 01
            </span>
            <span className="text-xs text-slate-400 uppercase tracking-widest font-mono">
              Clinical Multi-Agent Simulation
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <HeartPulse className="w-5 h-5 text-emerald-400" />
            AI Hospital Clinical Workflow & SEAL Evolution
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
            Simulate a 4-agent clinical consultation: Patient, Intern Doctors, Examiner, and Medical Director. Observe how doctor agents evolve over thousands of cases via episodic memory without model weight retraining.
          </p>
        </div>

        <button
          onClick={() => { setActiveStage(1); setOrderedLab(null); }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/10 border border-white/10 text-xs text-slate-300 font-mono transition self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Reset Case
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Interactive Consultation Stages */}
        <div className="lg:col-span-7 space-y-4">
          <div className="space-y-3">
            {stages.map((st) => (
              <div
                key={st.num}
                onClick={() => setActiveStage(st.num)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  activeStage === st.num
                    ? 'bg-emerald-950/30 border-emerald-400 shadow-lg shadow-emerald-500/10'
                    : 'bg-white/[0.02] border-white/5 opacity-80 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-emerald-400 font-bold">{st.title}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-slate-300">
                    {st.role}
                  </span>
                </div>
                <p className="text-xs text-slate-200 mt-2 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>

          {/* Diagnostic Action Bar */}
          {activeStage === 2 && !orderedLab && (
            <div className="p-4 rounded-2xl bg-black/60 border border-emerald-500/30 space-y-2">
              <span className="text-xs font-mono text-emerald-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="w-4 h-4" /> Intern Doctors: Order Urgent Diagnostics
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                <button
                  onClick={() => handleOrderLab('12-Lead ECG + Troponin I Panel')}
                  className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-md shadow-emerald-500/20"
                >
                  ⚡ Order 12-Lead ECG + Troponins
                </button>
                <button
                  onClick={() => handleOrderLab('CT Pulmonary Angiogram')}
                  className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/10 border border-white/10 text-slate-300 text-xs transition"
                >
                  🫁 Order CT Angiogram (PE Rule-Out)
                </button>
                <button
                  onClick={() => handleOrderLab('Chest X-Ray + Upper Endoscopy')}
                  className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/10 border border-white/10 text-slate-300 text-xs transition"
                >
                  🔍 Order Upper GI Series
                </button>
              </div>
            </div>
          )}

          {activeStage === 3 && orderedLab && (
            <button
              onClick={handleCompleteCase}
              className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              <span>Submit to Medical Director for Consensus & SEAL Indexing</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Right: SEAL Episodic Memory Ledger */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-3xl bg-black/60 border border-white/10 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-mono text-emerald-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Database className="w-4 h-4" /> SEAL Episodic Memory Ledger
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold">
                0% Weight Retraining
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Doctor agents accumulate clinical experience through Simulacrum-based Evolutionary Agent Learning (SEAL). Verified diagnostic trajectories and failure reflections are dynamically retrieved as few-shot clinical guidance.
            </p>

            <div className="space-y-2">
              <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 font-bold">
                Active Extracted Clinical Lessons:
              </span>
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {sealLessons.map((les, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-[11px] text-slate-200 font-mono leading-relaxed"
                  >
                    {les}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-[11px] text-emerald-300 flex items-center justify-between font-mono">
              <span>Experience Transfer:</span>
              <span className="font-bold">Real-World Ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const OpenClawAssistantArchitecture: React.FC = () => {
  const [selectedLayer, setSelectedLayer] = useState<number>(2);
  const [contextTokens, setContextTokens] = useState<number>(7800);
  const [isCompacting, setIsCompacting] = useState<boolean>(false);
  const [hitlTriggered, setHitlTriggered] = useState<boolean>(false);

  const layers = [
    {
      id: 1,
      name: 'Layer 1: Channel Adapters',
      role: 'Perception & Delivery Edge',
      desc: 'Maintains live connections to WhatsApp, Slack, Telegram, and Discord. Normalizes inbound message payloads into a standardized event format and isolates platform quirks.',
      tech: 'WebSockets, Webhooks, Message Normalization'
    },
    {
      id: 2,
      name: 'Layer 2: Gateway Control Plane',
      role: 'Operating System of the Assistant',
      desc: 'Long-running persistent daemon. Keeps session state warm, manages routing tables, runs background cron sentinels for proactive monitoring, and enforces authentication.',
      tech: 'Persistent Daemon, Routing Tables, Cron Sentinels'
    },
    {
      id: 3,
      name: 'Layer 3: Agent Runtime',
      role: 'Reasoning & Execution Engine',
      desc: 'Assembles context window (system prompt, retrieved memories, recent turns), drives the LLM reasoning loop, intercepts tool requests, and writes append-only event logs.',
      tech: 'Context Assembler, Tool Interceptor, LLM Loop'
    },
    {
      id: 4,
      name: 'Layer 4: Memory & State Layer',
      role: 'Searchable Storage Infrastructure',
      desc: 'Treats memory as durable infrastructure: append-only JSONL transcripts for immutable logging + local SQLite database for hybrid vector embeddings and keyword BM25 search.',
      tech: 'Append-Only JSONL, SQLite Vector Search'
    },
    {
      id: 5,
      name: 'Layer 5: Tool & Execution Substrate',
      role: 'Physical Agency & Security Sandbox',
      desc: 'Executes shell commands, file manipulations, and browser automation. Runs untrusted operations inside isolated, read-only, non-root Docker containers with HITL review gates.',
      tech: 'Docker Sandboxes, Capability Dropping, HITL Gate'
    }
  ];

  const handleCompact = () => {
    setIsCompacting(true);
    setTimeout(() => {
      setContextTokens(2400);
      setIsCompacting(false);
    }, 800);
  };

  const currentLayer = layers[selectedLayer - 1];

  return (
    <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-teal-500/30 backdrop-blur-xl shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-400 font-mono text-[11px] font-bold border border-teal-500/30">
              SIMULATOR 02
            </span>
            <span className="text-xs text-slate-400 uppercase tracking-widest font-mono">
              Persistent Autonomous Infrastructure
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Server className="w-5 h-5 text-teal-400" />
            OpenClaw 5-Layer Assistant Infrastructure & Security
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
            Explore the 5 cooperating layers of an always-on 24/7 personal assistant. Understand persistent daemons, Docker sandboxing, context compaction, and Human-in-the-Loop review gates.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400">Context Window:</span>
          <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg ${
            contextTokens > 7000 ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-emerald-500/20 text-emerald-300'
          }`}>
            {contextTokens} / 8,192 Tokens
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: 5-Layer Stack Selector */}
        <div className="lg:col-span-5 space-y-2.5">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider font-bold">
            The 5 Cooperating Infrastructure Layers
          </span>
          {layers.map((lay) => (
            <button
              key={lay.id}
              onClick={() => setSelectedLayer(lay.id)}
              className={`w-full p-3.5 rounded-2xl text-left transition border ${
                selectedLayer === lay.id
                  ? 'bg-teal-950/40 border-teal-400 text-white shadow-lg shadow-teal-500/10'
                  : 'bg-white/[0.02] border-white/5 text-slate-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold">{lay.name}</span>
                <span className="text-[10px] text-teal-400">Tier 0{lay.id}</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-1 truncate">{lay.role}</div>
            </button>
          ))}
        </div>

        {/* Right: Layer Deep Dive & Interactive Controls */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 rounded-3xl bg-black/60 border border-white/10 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-mono text-teal-300 font-bold uppercase tracking-wider">
                {currentLayer.name}: {currentLayer.role}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-slate-300">
                Active Inspection
              </span>
            </div>

            <p className="text-xs text-slate-200 leading-relaxed">{currentLayer.desc}</p>

            <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 text-xs font-mono text-slate-300">
              <span className="text-slate-500">Underlying Technologies: </span>
              <span className="text-teal-300 font-bold">{currentLayer.tech}</span>
            </div>

            {/* Context Compaction Trigger */}
            <div className="pt-2 border-t border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Context Window Survival Strategy:</span>
                <span className="text-amber-400 font-bold">LLM Compaction</span>
              </div>
              <button
                onClick={handleCompact}
                disabled={isCompacting || contextTokens <= 3000}
                className="w-full py-2.5 px-4 rounded-xl bg-amber-600/80 hover:bg-amber-500 text-white font-bold text-xs transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isCompacting ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Compacting History via LLM Summarization...
                  </>
                ) : contextTokens <= 3000 ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Context Optimized (2,400 Tokens)
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" /> Execute Context Compaction (Save Tokens)
                  </>
                )}
              </button>
            </div>

            {/* Security HITL Simulation */}
            <div className="pt-2 border-t border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Tool Execution Security Gate:</span>
                <span className="text-rose-400 font-bold">Human-in-the-Loop</span>
              </div>
              <button
                onClick={() => setHitlTriggered(!hitlTriggered)}
                className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 border ${
                  hitlTriggered
                    ? 'bg-rose-950/40 border-rose-500 text-rose-200'
                    : 'bg-white/[0.04] border-white/10 text-slate-300 hover:text-white'
                }`}
              >
                <Lock className="w-3.5 h-3.5 text-rose-400" />
                {hitlTriggered ? 'High-Risk Command Paused: "rm -rf /logs" (Approval Required)' : 'Simulate Dangerous Shell Command Interception'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
