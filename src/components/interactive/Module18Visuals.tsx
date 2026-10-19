import React, { useState } from 'react';
import { 
  Activity, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Users, 
  Sliders, 
  FileText, 
  Code, 
  Terminal, 
  Clock, 
  Check, 
  X,
  Sparkles
} from 'lucide-react';

export const PilotReadinessAndShadowModeStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'shadow' | 'signals'>('shadow');
  const [selectedCaseIdx, setSelectedCaseIdx] = useState<number>(0);

  const shadowCases = [
    {
      id: 'case-01',
      title: 'Invoice Line Item: Tier-1 Server Maintenance',
      humanDecision: 'Approved discount of 14% based on 2024 Master Agreement Amendment.',
      shadowAIOutput: 'Approved discount of 14% matching Master Agreement clause 8.2 (Confidence: 0.96).',
      verdict: 'Exact Match — Shadow Mode Verified',
      status: 'match'
    },
    {
      id: 'case-02',
      title: 'Contract Amendment: Offshore Data Storage',
      humanDecision: 'Flagged for Legal Review: Conflicts with EU Data Residency standard.',
      shadowAIOutput: 'Flagged for Compliance Review: Clause 19 allows Frankfurt AWS but specifies backup in US-East-1 (Confidence: 0.93).',
      verdict: 'Superhuman Catch — AI caught sub-clause backup loophole missed by manual skimming',
      status: 'superior'
    },
    {
      id: 'case-03',
      title: 'Procurement PO: Expedited Freight Surcharge',
      humanDecision: 'Rejected surcharge: Vendor failed to give 48h notice.',
      shadowAIOutput: 'Approved surcharge of $420 (Confidence: 0.61 - Low Confidence Flag).',
      verdict: 'Discrepancy Caught in Shadow — Confidence threshold triggered; routes to human review in production',
      status: 'flagged'
    }
  ];

  const currentCase = shadowCases[selectedCaseIdx];

  return (
    <div className="space-y-6 p-6 rounded-3xl bg-slate-900/90 border border-emerald-500/20 backdrop-blur-xl shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5" /> Pilot Telemetry Studio
          </span>
          <h3 className="text-xl font-bold text-white mt-1">
            Shadow Mode Benchmarking & The 3 Pilot Readiness Signals
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Compare AI outputs side-by-side with human decisions in shadow mode, then evaluate Reliability, Adoption, and Trust.
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-black/40 border border-white/10">
          <button
            onClick={() => setActiveTab('shadow')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition ${
              activeTab === 'shadow'
                ? 'bg-emerald-600 text-white font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            👤 Shadow Mode
          </button>
          <button
            onClick={() => setActiveTab('signals')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition ${
              activeTab === 'signals'
                ? 'bg-emerald-600 text-white font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            📊 3 Readiness Signals
          </button>
        </div>
      </div>

      {activeTab === 'shadow' ? (
        <div className="space-y-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {shadowCases.map((c, idx) => (
              <button
                key={c.id}
                onClick={() => setSelectedCaseIdx(idx)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono transition border shrink-0 ${
                  selectedCaseIdx === idx
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm'
                    : 'bg-black/20 text-slate-400 border-white/5 hover:bg-white/[0.04]'
                }`}
              >
                Case 0{idx + 1}
              </button>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-4">
            <div className="font-bold text-sm text-white flex items-center justify-between">
              <span>{currentCase.title}</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase ${
                currentCase.status === 'match'
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                  : currentCase.status === 'superior'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}>
                {currentCase.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                  Human Operator Decision (Live Workflow):
                </span>
                <p className="text-xs text-slate-300 font-mono">
                  {currentCase.humanDecision}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-1">
                <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block">
                  Shadow AI Output (Logged Silently):
                </span>
                <p className="text-xs text-emerald-200 font-mono">
                  {currentCase.shadowAIOutput}
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-black/50 border border-white/5 flex items-center gap-2 text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-slate-300">
                <strong className="text-white">FDE Analysis:</strong> {currentCase.verdict}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Reliability */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-400">1. RELIABILITY</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">99.2%</span>
              </div>
              <div className="text-2xl font-extrabold text-white">0.08%</div>
              <p className="text-[11px] text-slate-400">
                Exception rate under peak load. P95 latency stable at 1.4 seconds across 4,200 transactions.
              </p>
            </div>

            {/* Adoption */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-400">2. ADOPTION</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">HIGH</span>
              </div>
              <div className="text-2xl font-extrabold text-white">87.5%</div>
              <p className="text-[11px] text-slate-400">
                7 of 8 pilot analysts voluntarily ceased opening legacy spreadsheets; active daily usage is routine.
              </p>
            </div>

            {/* Trust */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-400">3. TRUST</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">CALIBRATED</span>
              </div>
              <div className="text-2xl font-extrabold text-white">6.4%</div>
              <p className="text-[11px] text-slate-400">
                Override rate. Users act directly on AI outputs and intervene only when confidence flags appear.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <div>
                <div className="text-xs font-bold text-white">Pilot Verdict: ALL 3 READINESS SIGNALS POSITIVE</div>
                <div className="text-[11px] text-emerald-300">Proceed to Full Deployment & Hand off to internal engineering owner.</div>
              </div>
            </div>
            <button className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold font-mono text-xs transition shadow-md">
              Generate Handoff Runbook
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export const DeploymentHandoffAndHITLGateway: React.FC = () => {
  const [confidence, setConfidence] = useState<number>(0.92);

  const isAutoApproved = confidence >= 0.85;

  return (
    <div className="space-y-6 p-6 rounded-3xl bg-slate-900/90 border border-emerald-500/20 backdrop-blur-xl shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" /> Handoff & Governance
          </span>
          <h3 className="text-xl font-bold text-white mt-1">
            Production HITL Gateway & Minimum Viable Deployment
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Simulate calibrated confidence threshold routing and review the 4 mandatory handoff artifacts.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* HITL Gateway Slider */}
        <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-emerald-400" /> Calibrated Confidence Threshold
            </span>
            <span className="px-2 py-0.5 rounded bg-black/60 font-mono text-xs font-bold text-emerald-300">
              Score: {(confidence * 100).toFixed(0)}%
            </span>
          </div>

          <input
            type="range"
            min="0.5"
            max="1.0"
            step="0.01"
            value={confidence}
            onChange={(e) => setConfidence(parseFloat(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />

          <div className="flex justify-between text-[10px] font-mono text-slate-500">
            <span>0.50 (High Ambiguity)</span>
            <span className="text-emerald-400 font-bold">Threshold: 0.85</span>
            <span>1.00 (Certainty)</span>
          </div>

          {/* Dynamic Routing Gate */}
          <div className={`p-4 rounded-xl border transition-all ${
            isAutoApproved
              ? 'bg-emerald-950/30 border-emerald-500/40 shadow-sm'
              : 'bg-amber-950/30 border-amber-500/40 shadow-sm'
          }`}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-mono font-bold text-white">
                Execution Routing: {isAutoApproved ? '⚡ Autonomous Write-Back' : '🛑 Human Review Escalation'}
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                isAutoApproved ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
              }`}>
                {isAutoApproved ? 'PASS' : 'HOLD'}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {isAutoApproved
                ? 'Confidence meets SLA standards (≥0.85). Transaction automatically writes to enterprise ERP database with structured audit log.'
                : 'Confidence below SLA threshold (<0.85). Payload routed to Legal Specialist ticketing queue with full reasoning trace and highlighted discrepancies.'}
            </p>
          </div>
        </div>

        {/* 4 Handoff Artifacts Checklist */}
        <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
          <span className="text-xs font-mono uppercase font-bold text-slate-300 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-emerald-400" /> The 4 Core Handoff Deliverables
          </span>

          <div className="space-y-2">
            <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5 flex items-start gap-2.5">
              <Code className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-white">1. Maintainable Codebase</div>
                <div className="text-[11px] text-slate-400">Decoupled configs, env variables, local test scripts, zero undocumented local tools.</div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5 flex items-start gap-2.5">
              <Terminal className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-white">2. In-Repo README & Runbook</div>
                <div className="text-[11px] text-slate-400">Environment bootstrapping, mock payload generators, and step-by-step CLI deploy guides.</div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5 flex items-start gap-2.5">
              <FileText className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-white">3. Formal Handoff Document</div>
                <div className="text-[11px] text-slate-400">Data lineage, known failure catalog, latency benchmarks, and designated escalation paths.</div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5 flex items-start gap-2.5">
              <Users className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-white">4. Live Recorded Walkthrough</div>
                <div className="text-[11px] text-slate-400">Hands-on session with client engineers debugging simulated anomalies and setting alert thresholds.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
