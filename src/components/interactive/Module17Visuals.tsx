import React, { useState } from 'react';
import { 
  Search, 
  Layers, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Database, 
  ShieldCheck, 
  FileText, 
  Users, 
  HelpCircle,
  Play,
  RotateCcw,
  Sparkles
} from 'lucide-react';

export const CustomerDiscoveryWorkbench: React.FC = () => {
  const [viewMode, setViewMode] = useState<'official' | 'workaround'>('official');
  const [selectedPersona, setSelectedPersona] = useState<number>(0);

  const personas = [
    {
      role: 'VP of Operations (Executive Sponsor)',
      icon: '👔',
      quote: '"We want an AI-powered agent to make our global procurement 10x faster and eliminate backlogs."',
      officialView: 'Procurement is routed through SAP, reviewed by regional managers, and completed in 24 hours.',
      realTruth: 'Approvals sit in inbox queues for 12 days. The VP has never seen the actual spreadsheets analysts use to cross-check supplier discounts.',
      keySignal: 'Focus on business pain ($2M in uncollected vendor rebates) and timeline (needs proof in 30 days).'
    },
    {
      role: 'Senior Procurement Specialist (Ops Expert)',
      icon: '💼',
      quote: '"SAP is unusable for fast supplier comparisons. So we copy everything into a Google Sheet called Final_Rebates_v9."',
      officialView: 'Contracts are verified against the master supplier rate card in the ERP database.',
      realTruth: 'Three analysts spend 4 hours every morning manually comparing invoice line items across 60-page PDF attachments against their personal spreadsheet.',
      keySignal: 'The manual workaround is the actual workflow! Automating PDF line-item extraction against the rate card is the Minimal AI Component.'
    },
    {
      role: 'IT Security Lead (Technical Contact)',
      icon: '🛡️',
      quote: '"No customer data can leave our AWS VPC, and outbound API calls to public AI services are blocked by default."',
      officialView: 'Teams can integrate with our standard cloud APIs via standard ticket submission.',
      realTruth: 'API access tickets take 21 days for approval. Real data cannot leave the private VPC. A public cloud POC will fail instantly.',
      keySignal: 'The system must run inside the client VPC using open-weight models (e.g. Llama-3/vLLM) or a private Azure OpenAI gateway.'
    }
  ];

  const currentPersona = personas[selectedPersona];

  return (
    <div className="space-y-6 p-6 rounded-3xl bg-slate-900/90 border border-blue-500/20 backdrop-blur-xl shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-blue-400 font-bold flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5" /> Discovery Simulator
          </span>
          <h3 className="text-xl font-bold text-white mt-1">
            Customer Discovery Workbench: Official Process vs. Real Workaround
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Interview the three essential roles to peel back idealized diagrams and uncover real operational bottlenecks.
          </p>
        </div>

        {/* Official vs Workaround Toggle */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-black/40 border border-white/10">
          <button
            onClick={() => setViewMode('official')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition ${
              viewMode === 'official'
                ? 'bg-blue-600 text-white font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            📋 Official Diagram
          </button>
          <button
            onClick={() => setViewMode('workaround')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition ${
              viewMode === 'workaround'
                ? 'bg-amber-500 text-black font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🔥 The Real Workaround
          </button>
        </div>
      </div>

      {/* Stakeholder Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {personas.map((p, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedPersona(idx)}
            className={`p-3.5 rounded-2xl border text-left transition-all ${
              selectedPersona === idx
                ? 'bg-blue-500/20 border-blue-400 text-white shadow-lg shadow-blue-500/20 ring-1 ring-blue-400/30'
                : 'bg-black/20 border-white/5 text-slate-400 hover:bg-white/[0.04]'
            }`}
          >
            <div className="text-xl mb-1">{p.icon}</div>
            <div className="font-bold text-xs text-white truncate">{p.role.split(' (')[0]}</div>
            <div className="text-[10px] text-blue-300 font-mono mt-0.5 opacity-80 truncate">
              {p.role.split('(')[1]?.replace(')', '')}
            </div>
          </button>
        ))}
      </div>

      {/* Interview Insight Box */}
      <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-4">
        <div className="p-3.5 rounded-xl bg-blue-950/20 border border-blue-500/30">
          <span className="text-[10px] font-mono uppercase text-blue-400 font-bold block mb-1">
            {currentPersona.role} states:
          </span>
          <p className="text-xs text-white italic font-serif">
            {currentPersona.quote}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`p-4 rounded-xl border transition-all ${
            viewMode === 'official'
              ? 'bg-slate-900/90 border-blue-500/40 shadow-sm'
              : 'bg-slate-900/40 border-white/5 opacity-50'
          }`}>
            <span className="text-[11px] font-mono uppercase font-bold text-blue-300 block mb-1 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" /> Documented / Official Version
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              {currentPersona.officialView}
            </p>
          </div>

          <div className={`p-4 rounded-xl border transition-all ${
            viewMode === 'workaround'
              ? 'bg-amber-950/30 border-amber-500/40 shadow-sm ring-1 ring-amber-400/20'
              : 'bg-slate-900/40 border-white/5 opacity-50'
          }`}>
            <span className="text-[11px] font-mono uppercase font-bold text-amber-300 block mb-1 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> Frontline Ground Truth
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              {currentPersona.realTruth}
            </p>
          </div>
        </div>

        {/* FDE Discovery Actionable Signal */}
        <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
          <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block mb-1">
            FDE Architectural Signal:
          </span>
          <p className="text-xs text-emerald-200 font-mono">
            {currentPersona.keySignal}
          </p>
        </div>
      </div>
    </div>
  );
};

export const TranslationLadderAndPOCSimulator: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [sprintDay, setSprintDay] = useState<number>(1);
  const [outcome, setOutcome] = useState<'proceed' | 'pivot' | 'stop' | null>(null);

  const ladderSteps = [
    {
      level: 'Level 1: Business Pain',
      description: 'Vendor contract reviews take 3+ hours per document, causing vendor onboarding delays of 3 weeks.',
      badge: 'Executive View'
    },
    {
      level: 'Level 2: User Workflow',
      description: 'Lawyer opens 40-page PDF, manually searches for indemnity, payment terms, and governing law, flagging deviations.',
      badge: 'Human Task'
    },
    {
      level: 'Level 3: Data Flow',
      description: 'Incoming PDF arrives via Outlook attachment; standard approved firm clauses reside in a SharePoint DOCX repository.',
      badge: 'Data Pipeline'
    },
    {
      level: 'Level 4: System Integration',
      description: 'Read-only access to Outlook attachments and SharePoint folder; write deviation report to shared network folder.',
      badge: 'Integration Scope'
    },
    {
      level: 'Level 5: Minimal AI Component',
      description: 'Structured clause extraction + cosine semantic comparison against standard terms producing a structured Markdown deviation report.',
      badge: 'Target AI System'
    }
  ];

  const sprintEvents: Record<number, string> = {
    1: 'Day 01: Scope document signed. API credentials and 20 sample contracts requested from IT.',
    3: 'Day 03: IT access delayed due to security tickets. FDE builds pipeline against synthetic mock contract PDFs.',
    5: 'Day 05: Real contracts arrive. FDE runs data validation: OCR tables are corrupted in 30% of scans. Preprocessing regex added.',
    7: 'Day 07: Pipeline executes end-to-end! Clause extraction achieves 91% accuracy against gold-standard evaluation set.',
    9: 'Day 09: Value Narrative demo prepared (Before: 3h → After: 14m). Recorded backup video generated.',
    10: 'Day 10: Final Readout meeting with VP of Operations and General Counsel.'
  };

  const handleAdvanceDay = () => {
    if (sprintDay < 10) {
      const next = sprintDay === 1 ? 3 : sprintDay === 3 ? 5 : sprintDay === 5 ? 7 : sprintDay === 7 ? 9 : 10;
      setSprintDay(next);
      if (next === 10) {
        setOutcome('proceed');
      }
    }
  };

  const handleReset = () => {
    setSprintDay(1);
    setOutcome(null);
  };

  return (
    <div className="space-y-6 p-6 rounded-3xl bg-slate-900/90 border border-blue-500/20 backdrop-blur-xl shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" /> FDE Scoping & Execution
          </span>
          <h3 className="text-xl font-bold text-white mt-1">
            Translation Ladder & 10-Day POC Sprint Tracker
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Deconstruct business pain into minimal AI components and run a simulated time-boxed sprint.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Translation Ladder */}
        <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
          <span className="text-xs font-mono uppercase font-bold text-blue-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" /> The 5-Level Translation Ladder
          </span>
          
          <div className="space-y-2">
            {ladderSteps.map((step, idx) => (
              <div
                key={idx}
                onClick={() => setCurrentStep(idx)}
                className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                  currentStep === idx
                    ? 'bg-blue-600/20 border-blue-400 text-white shadow-md'
                    : 'bg-slate-900/50 border-white/5 text-slate-400 hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center justify-between font-mono text-[10px] text-blue-300 mb-1">
                  <span>{step.level}</span>
                  <span className="px-1.5 py-0.5 rounded bg-black/40 border border-white/10">{step.badge}</span>
                </div>
                <div className="text-slate-200 text-xs">{step.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 10-Day Sprint Simulator */}
        <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase font-bold text-amber-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" /> 10-Day POC Sprint Telemetry
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-xs">
                Day 0{sprintDay} of 10
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 via-amber-500 to-emerald-400 transition-all duration-300"
                style={{ width: `${(sprintDay / 10) * 100}%` }}
              />
            </div>

            {/* Current Day Log */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-500 font-bold">Field Execution Log:</span>
              <p className="text-xs text-slate-200 font-mono leading-relaxed">
                {sprintEvents[sprintDay]}
              </p>
            </div>

            {/* Outcome Announcement */}
            {outcome && (
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 space-y-1 animate-fade-in">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Sprint Verdict: PROCEED TO PILOT
                </div>
                <p className="text-[11px] text-slate-300">
                  Accuracy target exceeded (91% vs. 85% goal). Cost per contract: $0.14. Business sponsor approves 6-week active pilot!
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={handleAdvanceDay}
              disabled={sprintDay >= 10}
              className={`flex-1 py-2 px-3 rounded-xl font-mono text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                sprintDay >= 10
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md'
              }`}
            >
              <Play className="w-3.5 h-3.5" /> Advance Sprint Timeline
            </button>
            <button
              onClick={handleReset}
              className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition"
              title="Reset Sprint"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
