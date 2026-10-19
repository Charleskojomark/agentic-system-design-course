import React, { useState } from 'react';
import { 
  Briefcase, 
  Search, 
  FileText, 
  Rocket, 
  Users, 
  CheckCircle2, 
  RefreshCw, 
  AlertTriangle, 
  ShieldAlert, 
  Cpu, 
  Activity, 
  Terminal,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const FDEOperatingModelExplorer: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(0);

  const stages = [
    {
      id: 'discovery',
      name: '1. Customer Discovery',
      icon: Search,
      tagline: 'Technical investigation without premature solutioning',
      keyArtifact: '5-Column Discovery Notes',
      primaryRisk: 'HiPPO bias, skipping the baseline, solving the wrong problem',
      fieldQuote: '"Customers describe their symptoms or requested solutions, never their true operational bottlenecks."',
      checklist: [
        'Assemble Executive Sponsor, Ops Expert, and Technical Contact',
        'Ask about the manual workaround used when official software breaks',
        'Establish empirical time, labor, and error rate baselines',
        'Verify data accessibility and realistic customer timelines'
      ]
    },
    {
      id: 'scoping',
      name: '2. Project Scoping',
      icon: FileText,
      tagline: 'Translating business pain into a bounded 2-to-4 week agreement',
      keyArtifact: 'Scope Document with explicit Out-of-Scope boundaries',
      primaryRisk: 'Unbounded scope creep, unaccounted IT access delays',
      fieldQuote: '"The Out of Scope section is load-bearing. It protects the sprint when mid-build requests arrive."',
      checklist: [
        'Apply 5-Level Translation Ladder to isolate Minimal AI Component',
        'Execute a 1-day Scoping Spike on authentic data samples',
        'Draft Technical Risk Register (data quality, tokens, latency)',
        'Check for No-Win scenarios and walk away before signing if unviable'
      ]
    },
    {
      id: 'poc',
      name: '3. POC Delivery',
      icon: Rocket,
      tagline: 'Time-boxed empirical sprint to test the core hypothesis',
      keyArtifact: '1-Page Readout Document (Proceed / Pivot / Stop)',
      primaryRisk: 'Live demo crashes, building against mocks without real-data validation',
      fieldQuote: '"A Stop outcome produced in 10 days is a huge success—it saves millions in wasted build capital."',
      checklist: [
        'Build end-to-end pipeline first before optimizing quality',
        'Use mocks during access delays; always run final evaluation on real data',
        'Deliver 3-Part Value Narrative: Before → During → After',
        'Maintain composure during live demo glitches with pre-recorded backups'
      ]
    },
    {
      id: 'comms',
      name: '4. Stakeholder Comms',
      icon: Users,
      tagline: 'Leading with business outcomes, following with mechanisms',
      keyArtifact: '4-Part Executive Briefings (Situation, Rec, Impact, Ask)',
      primaryRisk: 'Overpromising 100% perfection, boring executives with model weights',
      fieldQuote: '"Frame the system around the 85/15 split: 85% autonomous throughput with 15% calibrated human escalation."',
      checklist: [
        'Translate technical metrics (e.g. latency, embeddings) to dollars and hours',
        'Communicate calibrated confidence thresholds honestly',
        'Deliver regular 3-bullet async updates (done, blocked, next)',
        'Maintain 5 sequential trust documents from discovery to handoff'
      ]
    },
    {
      id: 'handoff',
      name: '5. Project Handoff',
      icon: CheckCircle2,
      tagline: 'Empowering customer teams for independent long-term ownership',
      keyArtifact: 'Production Handoff Package & Runbooks',
      primaryRisk: 'System abandoned post-departure due to missing docs or unobservable logs',
      fieldQuote: '"A system handed off without trained champions creates an ongoing operational dependency rather than a permanent deliverable."',
      checklist: [
        'Validate Minimum Viable Deployment across 5 dimensions',
        'Deliver maintainable code with separated config and README guides',
        'Configure 3-part Human-in-the-Loop fallbacks and structured JSON logging',
        'Train internal champions and establish explicit support windows'
      ]
    },
    {
      id: 'feedback',
      name: '6. Field Feedback',
      icon: RefreshCw,
      tagline: 'Channeling frontline friction into core product upgrades',
      keyArtifact: '6-Element Product Feedback Entry',
      primaryRisk: 'Flooding core product teams with customer-specific noise',
      fieldQuote: '"FDEs see what customers actually encounter. Pattern recognition across 2+ clients drives the core roadmap."',
      checklist: [
        'Maintain daily structured field notes log',
        'Distinguish idiosyncratic noise from cross-cohort systemic signals',
        'Format feedback: Problem, Frequency, Severity, Workaround, Solution, ROI',
        'Partner constructively with core product managers and engineers'
      ]
    }
  ];

  const current = stages[activeStage];
  const Icon = current.icon;

  return (
    <div className="space-y-6 p-6 rounded-3xl bg-slate-900/90 border border-sky-500/20 backdrop-blur-xl shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-sky-400 font-bold flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5" /> FDE Operating Framework
          </span>
          <h3 className="text-xl font-bold text-white mt-1">
            The 6-Stage Customer Engagement Lifecycle
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Explore how Forward Deployed Engineers bridge raw AI capabilities to production ROI.
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 font-mono text-xs">
          <span>Stage 0{activeStage + 1} of 06</span>
        </div>
      </div>

      {/* Stage Selector Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
        {stages.map((stg, idx) => {
          const SIcon = stg.icon;
          const isActive = activeStage === idx;
          return (
            <button
              key={stg.id}
              onClick={() => setActiveStage(idx)}
              className={`p-2.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                isActive
                  ? 'bg-sky-500/20 border-sky-400 text-white shadow-lg shadow-sky-500/20 ring-1 ring-sky-400/40'
                  : 'bg-black/20 border-white/5 text-slate-400 hover:bg-white/[0.04] hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <SIcon className={`w-4 h-4 ${isActive ? 'text-sky-400' : 'text-slate-500'}`} />
                <span className="text-[9px] font-mono opacity-60">0{idx + 1}</span>
              </div>
              <div className="font-semibold text-xs truncate">{stg.name.split('. ')[1]}</div>
            </button>
          );
        })}
      </div>

      {/* Active Stage Details Canvas */}
      <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-sky-500/20 border border-sky-500/30 text-sky-300">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">{current.name}</h4>
              <p className="text-xs text-sky-300/90 font-medium">{current.tagline}</p>
            </div>
          </div>
          <div className="hidden sm:block text-right">
            <span className="text-[10px] uppercase font-mono text-slate-500 block">Core Deliverable</span>
            <span className="text-xs font-mono font-bold text-emerald-400">{current.keyArtifact}</span>
          </div>
        </div>

        <blockquote className="p-3 rounded-xl bg-sky-950/20 border-l-2 border-sky-400 text-xs italic text-slate-300">
          {current.fieldQuote}
        </blockquote>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 space-y-2">
            <span className="text-[11px] font-mono uppercase text-slate-400 font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" /> Operational Action Checklist
            </span>
            <ul className="space-y-1.5">
              {current.checklist.map((item, i) => (
                <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                  <span className="text-sky-400 font-bold mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/20 space-y-2">
            <span className="text-[11px] font-mono uppercase text-rose-300 font-bold flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" /> Primary Hazard & Failure Mode
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              {current.primaryRisk}
            </p>
            <div className="pt-2">
              <span className="text-[10px] font-mono uppercase text-slate-500 block mb-1">Key Deliverable Artifact</span>
              <div className="px-2.5 py-1 rounded bg-black/40 border border-white/5 font-mono text-[11px] text-emerald-300 inline-block">
                {current.keyArtifact}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ModelVsDeploymentFailureDiagnostic: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<number>(0);
  const [userGuess, setUserGuess] = useState<'model' | 'deployment' | null>(null);
  const [revealed, setRevealed] = useState<boolean>(false);

  const incidents = [
    {
      title: 'Incident A: The Vanishing Auth Tokens',
      symptom: 'A customer support copilot performs with 96% factual accuracy in sandbox tests, but crashes with 500 errors every afternoon when used in production.',
      rootCause: 'Customer IT security enforces strict 15-minute expiration on internal API bearer tokens. The agent harness was caching the initial token indefinitely without a background refresh loop.',
      actualType: 'deployment',
      remediation: 'Implement an automated OAuth refresh token listener in the agent execution harness and configure structured heartbeat alerts.'
    },
    {
      title: 'Incident B: The Non-Existent Precedent',
      symptom: 'A legal research assistant summarizes 40-page contracts brilliantly, but cites "Section 14(b) of the 2019 Maritime Privacy Accord"—a statute that does not exist.',
      rootCause: 'Intrinsic model hallucination triggered by ungrounded parametric generation when query relevance dropped below semantic similarity thresholds.',
      actualType: 'model',
      remediation: 'Implement an AI review critic loop and require strict set-of-mark quote attribution grounded in retrieved source chunks.'
    },
    {
      title: 'Incident C: The Silent Truncation Drift',
      symptom: 'A multi-turn procurement agent correctly checks supplier pricing for 5 steps, but at step 18 approves an unvetted vendor without flagging compliance warnings.',
      rootCause: 'Context window overflow. The harness appended raw 12-page PDF text returns for each vendor, silently pushing the initial system guardrail prompt out of the model\'s active context window.',
      actualType: 'deployment',
      remediation: 'Implement active context compaction: step summarization and selective external storage rather than dumping raw tool payloads into prompt history.'
    },
    {
      title: 'Incident D: The 3-Hour Manual Re-Check',
      symptom: 'An automated invoice matching pipeline achieves 94% precision, but the accounting staff continues manually opening and validating every invoice line item by hand.',
      rootCause: 'Trust deficit. The system provided raw binary matches without visual bounding boxes, explainability notes, or calibrated confidence scoring.',
      actualType: 'deployment',
      remediation: 'Introduce confidence indicator badges, visual side-by-side snippet previews, and route cases with <90% confidence into a human review queue.'
    }
  ];

  const current = incidents[selectedCase];

  const handleSelectCase = (idx: number) => {
    setSelectedCase(idx);
    setUserGuess(null);
    setRevealed(false);
  };

  const handleGuess = (guess: 'model' | 'deployment') => {
    setUserGuess(guess);
    setRevealed(true);
  };

  return (
    <div className="space-y-6 p-6 rounded-3xl bg-slate-900/90 border border-sky-500/20 backdrop-blur-xl shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5" /> FDE Diagnostic Studio
          </span>
          <h3 className="text-xl font-bold text-white mt-1">
            Model Failure vs. Deployment Failure Diagnostic
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Diagnose real-world enterprise incidents: is the fault in the AI model, or in the surrounding deployment environment?
          </p>
        </div>
      </div>

      {/* Scenario Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {incidents.map((inc, idx) => (
          <button
            key={idx}
            onClick={() => handleSelectCase(idx)}
            className={`px-3 py-1.5 rounded-full text-xs font-mono transition border shrink-0 ${
              selectedCase === idx
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm'
                : 'bg-black/20 text-slate-400 border-white/5 hover:bg-white/[0.04]'
            }`}
          >
            Case 0{idx + 1}
          </button>
        ))}
      </div>

      {/* Active Incident Brief */}
      <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            <Activity className="w-4 h-4 text-amber-400" /> {current.title}
          </h4>
          <span className="text-[11px] font-mono text-slate-500">Live Incident Telemetry</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">Observed Enterprise Symptom:</span>
          <p className="text-xs text-slate-200 leading-relaxed font-mono">
            {current.symptom}
          </p>
        </div>

        {/* User Guessing Buttons */}
        <div className="space-y-3 pt-1">
          <span className="text-xs font-semibold text-slate-300 block text-center">
            Classify the Root Architectural Fault:
          </span>
          <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
            <button
              onClick={() => handleGuess('model')}
              className={`py-2.5 px-4 rounded-xl text-xs font-bold font-mono transition border ${
                userGuess === 'model'
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/50 shadow-md ring-1 ring-rose-400/30'
                  : 'bg-slate-800/60 text-slate-300 border-white/10 hover:bg-slate-700/60'
              }`}
            >
              🧠 Model Failure
            </button>
            <button
              onClick={() => handleGuess('deployment')}
              className={`py-2.5 px-4 rounded-xl text-xs font-bold font-mono transition border ${
                userGuess === 'deployment'
                  ? 'bg-sky-500/20 text-sky-300 border-sky-500/50 shadow-md ring-1 ring-sky-400/30'
                  : 'bg-slate-800/60 text-slate-300 border-white/10 hover:bg-slate-700/60'
              }`}
            >
              🏢 Deployment Failure
            </button>
          </div>
        </div>

        {/* Revealed Diagnosis */}
        {revealed && (
          <div className={`p-4 rounded-xl border mt-4 space-y-2 animate-fade-in ${
            userGuess === current.actualType
              ? 'bg-emerald-950/30 border-emerald-500/40'
              : 'bg-rose-950/30 border-rose-500/40'
          }`}>
            <div className="flex items-center gap-2">
              {userGuess === current.actualType ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-rose-400" />
              )}
              <span className="text-xs font-bold text-white">
                {userGuess === current.actualType ? 'Correct Diagnosis!' : 'Incorrect Classification!'}
                {' '}This is a <span className="font-mono text-amber-300 uppercase underline">{current.actualType} Failure</span>.
              </span>
            </div>
            <div className="text-xs text-slate-300 leading-relaxed">
              <strong className="text-white">Root Cause:</strong> {current.rootCause}
            </div>
            <div className="text-xs text-emerald-300 font-mono pt-1">
              <strong>FDE Architectural Remediation:</strong> {current.remediation}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
