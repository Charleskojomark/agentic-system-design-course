import React, { useState } from 'react';
import { Bot, Wrench, Shield, CheckCircle2, AlertTriangle, ArrowRight, RefreshCw, Sparkles, Calendar, Mail, FileText, UserCheck, MessageSquare } from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';

export const CRMAgentStudio: React.FC = () => {
  const { addXp } = useProgress();
  const [selectedScenario, setSelectedScenario] = useState<number>(0);
  const [hasHitlGate, setHasHitlGate] = useState<boolean>(true);
  const [selectedModel, setSelectedModel] = useState<'fast' | 'reasoning'>('reasoning');
  const [simState, setSimState] = useState<'idle' | 'running' | 'hitl_paused' | 'completed'>('idle');
  const [hitlApproved, setHitlApproved] = useState<boolean | null>(null);

  const scenarios = [
    {
      id: 'demo',
      title: 'Scenario 1: Demo Meeting Scheduling',
      userQuery: 'Hi! We loved the product tour and want to schedule a 30-min deep dive with our VP of Engineering next Tuesday at 2 PM EST. Please confirm availability and send calendar invite.',
      isHighStakes: false,
      toolsUsed: ['chat_summarizer', 'calendar_scheduler', 'email_drafter'],
      summary: 'Customer wants 30-min technical demo next Tuesday 2:00 PM EST with VP of Engineering.',
      actionTaken: 'calendar_scheduler.book({ time: "Tuesday 14:00 EST", duration: 30, attendee: "vp@client.com" })',
      emailPreview: 'Subject: Confirmed: Product Deep Dive — Tuesday 2:00 PM EST. Calendar invitation dispatched.',
      coachFeedback: 'Excellent autonomous execution. Low-risk scheduling should run automatically via calibrated API schemas without demanding human manual effort.'
    },
    {
      id: 'escalate',
      title: 'Scenario 2: Critical Churn Threat ($7,500 Refund)',
      userQuery: 'Our system has been experiencing intermittent downtime for 3 days. We are demanding an immediate refund of $7,500 and are preparing to cancel our enterprise contract unless executive leadership steps in.',
      isHighStakes: true,
      toolsUsed: ['chat_summarizer', 'safe_escalation_gate'],
      summary: 'CRITICAL: Client experiencing 3-day downtime, demanding $7,500 refund and threatening enterprise cancellation.',
      actionTaken: 'safe_escalation_gate.pauseAndEscalate({ risk: "HIGH_CHURN_RISK", amount: 7500, supervisorRole: "VP_CUSTOMER_SUCCESS" })',
      emailPreview: 'Agent execution PAUSED. Proposed response drafted for Human Supervisor review.',
      coachFeedback: 'Crucial architectural judgment! Monetary transactions > $1,000 and enterprise churn threats must trigger a Human-in-the-Loop approval gate to prevent irreversible financial and legal mistakes.'
    },
    {
      id: 'summarize',
      title: 'Scenario 3: Long 12-Message Support Triage',
      userQuery: 'Customer sent a 12-message diagnostic trace detailing database connection pool exhaustion after migrating to PostgreSQL 16. Requires ticket triage and technical response draft.',
      isHighStakes: false,
      toolsUsed: ['chat_summarizer', 'email_drafter'],
      summary: 'Identified: PG 16 connection pool exhaustion. Root cause: max_connections misconfigured during migration.',
      actionTaken: 'email_drafter.generateResponse({ template: "pg_pool_fix", steps: ["Tune pgbouncer", "Check idle_in_transaction_session_timeout"] })',
      emailPreview: 'Subject: Triage Update: Resolving PostgreSQL 16 Connection Exhaustion. Detailed technical steps attached.',
      coachFeedback: 'Spot-on delegation. Summarizing messy logs into scannable bullets before drafting technical replies prevents model context degradation.'
    }
  ];

  const current = scenarios[selectedScenario];

  const runSimulation = () => {
    setSimState('running');
    setHitlApproved(null);

    setTimeout(() => {
      if (current.isHighStakes && hasHitlGate) {
        setSimState('hitl_paused');
      } else {
        setSimState('completed');
        addXp(35);
      }
    }, 1400);
  };

  const handleHitlDecision = (approved: boolean) => {
    setHitlApproved(approved);
    setSimState('completed');
    addXp(50);
  };

  const reset = () => {
    setSimState('idle');
    setHitlApproved(null);
  };

  return (
    <div className="rounded-3xl p-4 sm:p-8 bg-slate-900/80 border border-white/10 space-y-6 shadow-2xl backdrop-blur-xl">
      {/* Session Guidelines Header */}
      <div className="p-4 rounded-2xl bg-sky-950/20 border border-sky-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-0.5">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Capstone Studio Guidelines</span>
          </div>
          <p className="text-xs text-slate-300">
            The AI coach helps you reflect. There are no scores or grades. Test different parameters and observe outcomes.
          </p>
        </div>
        <div className="text-[11px] font-mono text-sky-300 shrink-0 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20">
          Reflective Learning Mode
        </div>
      </div>

      {/* Studio Workbench Configuration */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Model Selection */}
        <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2">
          <label className="text-[11px] font-mono uppercase text-slate-400 font-bold block">
            1. Reasoning Brain (Model Tier)
          </label>
          <select
            value={selectedModel}
            onChange={(e: any) => setSelectedModel(e.target.value)}
            className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-sky-500"
          >
            <option value="reasoning">Claude 3.5 / GPT-4o (Deep Reasoning)</option>
            <option value="fast">Gemma 2 / Mistral-7B (Ultra-Low Latency)</option>
          </select>
          <span className="text-[10px] text-slate-500 block leading-snug">
            {selectedModel === 'reasoning'
              ? 'Ideal for nuanced intent extraction and high-stakes financial diplomacy.'
              : 'Sub-second response time for routine lookup and fast template generation.'}
          </span>
        </div>

        {/* Safeguards / HITL Threshold */}
        <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2">
          <label className="text-[11px] font-mono uppercase text-slate-400 font-bold block">
            2. Safety Gate (HITL Threshold)
          </label>
          <label className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-900/60 border border-white/5 cursor-pointer text-xs text-slate-300 select-none">
            <input
              type="checkbox"
              checked={hasHitlGate}
              onChange={(e) => setHasHitlGate(e.target.checked)}
              className="accent-sky-500 rounded"
            />
            <span>Pause for Human Sign-Off (Refunds &gt; $1k)</span>
          </label>
          <span className="text-[10px] text-slate-500 block leading-snug">
            {hasHitlGate
              ? 'Concentric defense active: critical operations pause at approval gate.'
              : '⚠️ Unrestricted autonomy: agent executes all refunds automatically.'}
          </span>
        </div>

        {/* 4 Available Tools Badge */}
        <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1.5">
          <label className="text-[11px] font-mono uppercase text-slate-400 font-bold block">
            3. Available Tool Schemas
          </label>
          <div className="flex flex-wrap gap-1.5 text-[10px] font-mono">
            <span className="px-2 py-0.5 rounded bg-white/5 text-slate-300">chat_summarizer</span>
            <span className="px-2 py-0.5 rounded bg-white/5 text-slate-300">email_drafter</span>
            <span className="px-2 py-0.5 rounded bg-white/5 text-slate-300">calendar_scheduler</span>
            <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-bold">safe_escalation_gate</span>
          </div>
          <span className="text-[10px] text-slate-500 block pt-1">
            Standard JSON parameter schemas bound to agent context.
          </span>
        </div>
      </div>

      {/* Scenario Selector Tabs */}
      <div className="space-y-2">
        <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
          Select Customer Inquiry Scenario to Simulate
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {scenarios.map((sc, idx) => (
            <button
              key={sc.id}
              onClick={() => {
                setSelectedScenario(idx);
                reset();
              }}
              className={`p-3 rounded-2xl border text-left transition-all ${
                selectedScenario === idx
                  ? 'bg-sky-950/60 border-sky-500/60 text-white shadow-md ring-1 ring-sky-500/30'
                  : 'bg-black/30 border-white/5 text-slate-400 hover:border-white/10'
              }`}
            >
              <div className="text-xs font-bold text-white truncate">{sc.title}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                {sc.isHighStakes ? '⚠️ High-Stakes Threshold' : '⚡ Routine Autonomous Action'}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Inquiry Box & Simulation Trigger */}
      <div className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-white/10 space-y-3 font-mono">
        <div className="flex items-center justify-between text-xs text-slate-400 border-b border-white/5 pb-2">
          <span>Incoming Customer Query:</span>
          <span>SLA Priority: {current.isHighStakes ? 'P1 CRITICAL' : 'P3 NORMAL'}</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
          "{current.userQuery}"
        </p>

        <div className="flex items-center justify-between pt-2">
          <span className="text-[11px] text-slate-500">
            Tools needed: {current.toolsUsed.join(', ')}
          </span>

          <div className="flex items-center gap-2">
            {simState === 'idle' ? (
              <button
                onClick={runSimulation}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-xs font-bold text-white shadow-md shadow-sky-500/25 transition"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Simulate Agent Execution</span>
              </button>
            ) : (
              <button
                onClick={reset}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-300 border border-white/10 transition"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset Scenario</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Execution Trace & HITL Review Gate */}
      {simState !== 'idle' && (
        <div className="space-y-4 animate-fade-in font-mono text-xs">
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/10 space-y-3">
            <span className="text-[10px] uppercase font-bold text-sky-400 tracking-wider block">
              Agent Execution & Telemetry Trace
            </span>

            {/* Trace Step 1: Summarize */}
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
              <strong className="text-sky-300 block text-[11px]">1. chat_summarizer invocation:</strong>
              <span className="text-slate-300 font-sans">{current.summary}</span>
            </div>

            {/* Trace Step 2: Tool Call or Gate */}
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
              <strong className="text-indigo-300 block text-[11px]">2. Action Execution:</strong>
              <span className="text-indigo-200">{current.actionTaken}</span>
            </div>

            {/* HITL Gate Decision Box */}
            {simState === 'hitl_paused' && (
              <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/40 text-amber-200 space-y-3 animate-fade-in">
                <div className="flex items-center gap-2 font-bold text-amber-300">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span>Human-in-the-Loop (HITL) Sign-Off Gate Triggered!</span>
                </div>
                <p className="text-xs leading-relaxed font-sans text-slate-200">
                  The agent detected a monetary refund of $7,500 and enterprise cancellation risk. Execution is paused awaiting supervisor review.
                </p>
                <div className="flex items-center gap-2 pt-1 font-sans">
                  <button
                    onClick={() => handleHitlDecision(true)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white transition"
                  >
                    ✓ Approve Refund & Escalate to VP
                  </button>
                  <button
                    onClick={() => handleHitlDecision(false)}
                    className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-bold text-white transition"
                  >
                    ✕ Reject & Route to Retention Specialist
                  </button>
                </div>
              </div>
            )}

            {/* Outcome Display */}
            {simState === 'completed' && (
              <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-200 space-y-2 animate-fade-in">
                <div className="flex items-center gap-2 font-bold text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Workflow Finalized Safely</span>
                </div>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  {current.emailPreview}
                </p>
              </div>
            )}
          </div>

          {/* AI Coach Reflective Feedback */}
          {simState === 'completed' && (
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-sky-950/40 via-indigo-950/30 to-purple-950/30 border border-sky-500/30 space-y-2 animate-fade-in">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-400 font-mono">
                <Sparkles className="w-4 h-4" />
                <span>AI Coach Design Reflection</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                {current.coachFeedback}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
