import React, { useState } from 'react';
import { Target, Users, ShieldAlert, CheckCircle2, AlertTriangle, Clock, ArrowRight, Building2, Sparkles, BookOpen } from 'lucide-react';

export const FDEInterviewDimensionsSimulator: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<'swe' | 'ai' | 'fde'>('fde');
  const [activeDimension, setActiveDimension] = useState<number>(0);

  const dimensions = [
    {
      name: 'Problem Type',
      swe: 'Well-defined, one correct algorithmic answer (e.g. LeetCode graph traversal).',
      ai: 'Technical precision expected on clean benchmark ML datasets.',
      fde: 'Deliberately ambiguous enterprise business scenario; quality of reasoning and clarifying questions is the signal.',
      signal: 'Tests whether candidate stops to ask questions or blindly codes.',
    },
    {
      name: 'Coding Focus',
      swe: 'Algorithmic efficiency: time/space complexity, arrays, trees, dynamic programming.',
      ai: 'Applied modeling: RAG chains, prompt engineering, vector embeddings.',
      fde: 'Production-grounded: data processing, SQL, API error handling, retry backoff, telemetry.',
      signal: 'Tests practical engineering hygiene in messy environments.',
    },
    {
      name: 'System Design',
      swe: 'Scalability, microservices, load balancers, caching, distributed transactions.',
      ai: 'Model architectures, context window sizing, latency vs throughput trade-offs.',
      fde: 'Enterprise integration: access control lists (ACLs), data residency, legacy systems, audit trails.',
      signal: 'Tests compliance and organizational deployment constraints.',
    },
    {
      name: 'Unique Rounds',
      swe: 'Standard pair coding and architectural design.',
      ai: 'Take-home model evaluation or fine-tuning notebook.',
      fde: 'Decomposition Round (60m) & Customer Simulation Discovery Round (60m).',
      signal: 'Tests ambiguity resolution and live customer empathy.',
    },
    {
      name: 'Behavioral Focus',
      swe: 'Internal team collaboration and personal technical triumphs.',
      ai: 'Similar to SWE with focus on experimental model iterations.',
      fde: 'Client ownership, production accountability, managing scope creep, explaining failure to non-technical executives.',
      signal: 'Tests customer-facing judgment under pressure.',
    },
    {
      name: 'Communication Testing',
      swe: 'Minimal — primarily engineer-to-engineer communication.',
      ai: 'Minimal — presenting benchmark metric charts.',
      fde: 'Dedicated client simulation round; role-playing with skeptical buyers and C-level sponsors.',
      signal: 'Tests translation between technical constraints and business outcomes.',
    },
  ];

  return (
    <div className="p-4 sm:p-6 rounded-3xl bg-slate-900/80 border border-sky-500/20 backdrop-blur-xl shadow-xl space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white">FDE vs SWE vs AI Engineer Evaluation Matrix</h3>
            <p className="text-xs text-slate-400">Compare how hiring bars and interview expectations differ across the three tracks</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-black/40 border border-white/10">
          <button
            onClick={() => setSelectedRole('swe')}
            className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition ${
              selectedRole === 'swe' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            SWE
          </button>
          <button
            onClick={() => setSelectedRole('ai')}
            className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition ${
              selectedRole === 'ai' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            AI Engineer
          </button>
          <button
            onClick={() => setSelectedRole('fde')}
            className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition ${
              selectedRole === 'fde' ? 'bg-sky-500 text-slate-950 font-extrabold shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            FDE Track
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
        {dimensions.map((dim, idx) => (
          <button
            key={dim.name}
            onClick={() => setActiveDimension(idx)}
            className={`p-2.5 rounded-xl text-left border transition text-xs ${
              activeDimension === idx
                ? 'bg-sky-500/20 border-sky-500/50 text-sky-300 font-bold shadow-sm'
                : 'bg-white/[0.02] border-white/5 text-slate-400 hover:bg-white/[0.05] hover:text-slate-200'
            }`}
          >
            <div className="text-[10px] font-mono text-slate-500 uppercase">Dim 0{idx + 1}</div>
            <div className="truncate">{dim.name}</div>
          </button>
        ))}
      </div>

      <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400">
            {dimensions[activeDimension].name} Deep Dive
          </span>
          <span className="text-[11px] text-slate-400">
            Interviewer Signal: <span className="text-amber-300 font-medium">{dimensions[activeDimension].signal}</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className={`p-3.5 rounded-xl border transition ${selectedRole === 'swe' ? 'bg-indigo-950/40 border-indigo-500/50 ring-1 ring-indigo-500/30' : 'bg-white/[0.01] border-white/5 opacity-60'}`}>
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-indigo-400 mb-1">
              <span>Software Engineer</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{dimensions[activeDimension].swe}</p>
          </div>

          <div className={`p-3.5 rounded-xl border transition ${selectedRole === 'ai' ? 'bg-purple-950/40 border-purple-500/50 ring-1 ring-purple-500/30' : 'bg-white/[0.01] border-white/5 opacity-60'}`}>
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-purple-400 mb-1">
              <span>AI Engineer</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{dimensions[activeDimension].ai}</p>
          </div>

          <div className={`p-3.5 rounded-xl border transition ${selectedRole === 'fde' ? 'bg-sky-950/40 border-sky-400/60 ring-1 ring-sky-400/40' : 'bg-white/[0.01] border-white/5 opacity-60'}`}>
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-sky-300 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>Forward Deployed Engineer</span>
            </div>
            <p className="text-xs text-sky-100 font-medium leading-relaxed">{dimensions[activeDimension].fde}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const DecompositionRoundPracticeStudio: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [userPromptIdx, setUserPromptIdx] = useState<number>(0);

  const prompts = [
    {
      title: 'Healthcare EHR Documentation',
      brief: 'A regional healthcare network wants to reduce the 2 hours daily that physicians spend on clinical chart documentation.',
      goodClarifyingQuestions: [
        'Do physicians type directly into Epic or dictate audio for transcription?',
        'What is the legal liability policy for unreviewed clinical notes under HIPAA?',
        'What accuracy threshold is required for diagnostic codes vs procedure codes?',
        'Does the hospital have on-prem GPU infrastructure or must this integrate with cloud EHR APIs?',
      ],
      badFirstMove: 'Immediately designing a 70B parameter Llama 3 fine-tuning pipeline with multi-agent transcription workers.',
      refinedStatement: 'Design an on-premise, HIPAA-compliant assisted drafting pipeline that extracts clinical facts from physician dictated audio, maps to Epic EHR templates, and requires mandatory physician sign-off before committing to the patient chart.',
    },
    {
      title: 'Commercial Lending Underwriting',
      brief: 'A financial institution wants to automate commercial loan reviews that currently take underwriters 3 to 4 days per file.',
      goodClarifyingQuestions: [
        'What file formats do borrowers submit (scanned tax returns, bank PDFs, Excel models)?',
        'What is the maximum loan limit before senior credit committee approval is legally required?',
        'What does an erroneous automated approval cost vs a delayed approval?',
        'Are there audit regulations requiring full explainability on loan denial decisions?',
      ],
      badFirstMove: 'Writing an autonomous loan approval agent that automatically wires funds to applicant accounts.',
      refinedStatement: 'Architect a document ingestion and structured financial extraction system with deterministic ratio calculation, pre-filtering against underwriting criteria, and generating an auditable credit memo for underwriter confirmation.',
    },
  ];

  const phases = [
    { name: '1. Clarifying Questions', duration: '10 min', color: 'text-sky-400', desc: 'Identify users, data availability, authority boundaries, and success metrics before proposing anything.' },
    { name: '2. Problem Decomposition', duration: '15 min', color: 'text-indigo-400', desc: 'Break the messy scenario into 5-7 modular subproblems with independent inputs and outputs.' },
    { name: '3. Constraints & Prioritization', duration: '15 min', color: 'text-amber-400', desc: 'Identify non-negotiable security, compliance, and infrastructure constraints. Determine MVP scope.' },
    { name: '4. Tradeoff Discussion', duration: '10 min', color: 'text-rose-400', desc: 'Name alternative designs (e.g. RAG vs fine-tuning, single vs multi-agent) and the cost of each.' },
    { name: '5. Present Back', duration: '10 min', color: 'text-emerald-400', desc: 'Deliver a crisp, synthesized problem statement and an phased architectural roadmap.' },
  ];

  const currentPrompt = prompts[userPromptIdx];

  return (
    <div className="p-4 sm:p-6 rounded-3xl bg-slate-900/80 border border-indigo-500/20 backdrop-blur-xl shadow-xl space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white">60-Minute Decomposition Studio</h3>
            <p className="text-xs text-slate-400">Practice time-boxing and analytical structuring against real FDE interview prompts</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {prompts.map((p, idx) => (
            <button
              key={p.title}
              onClick={() => {
                setUserPromptIdx(idx);
                setActiveStep(0);
              }}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition border ${
                userPromptIdx === idx
                  ? 'bg-indigo-600 text-white border-indigo-400'
                  : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              Scenario {idx + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="p-3.5 rounded-2xl bg-indigo-950/20 border border-indigo-500/30 text-xs">
        <div className="font-mono text-indigo-400 font-bold uppercase mb-1">Deliberately Ambiguous Prompt:</div>
        <div className="text-white text-sm font-semibold">{currentPrompt.brief}</div>
      </div>

      {/* 5-Phase Navigation Track */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {phases.map((phase, idx) => (
          <button
            key={phase.name}
            onClick={() => setActiveStep(idx)}
            className={`p-2.5 rounded-xl border text-left transition ${
              activeStep === idx
                ? 'bg-white/[0.08] border-indigo-500 text-white shadow-md'
                : 'bg-black/30 border-white/5 text-slate-400 hover:bg-white/[0.03]'
            }`}
          >
            <div className={`text-[10px] font-mono font-bold ${phase.color}`}>{phase.duration}</div>
            <div className="text-xs font-semibold truncate">{phase.name}</div>
          </button>
        ))}
      </div>

      <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold uppercase text-slate-300">
            {phases[activeStep].name} Strategy
          </span>
          <span className="text-xs text-slate-400">{phases[activeStep].desc}</span>
        </div>

        {activeStep === 0 && (
          <div className="space-y-3">
            <div className="text-xs text-slate-300 font-medium">Recommended Clarifying Inquiries:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {currentPrompt.goodClarifyingQuestions.map((q, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-200 text-xs flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{q}</span>
                </div>
              ))}
            </div>
            <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/30 text-rose-200 text-xs flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-rose-300">Fatal Rejection Signal:</strong> {currentPrompt.badFirstMove}
              </div>
            </div>
          </div>
        )}

        {activeStep > 0 && activeStep < 4 && (
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-300 space-y-2">
            <p className="leading-relaxed">
              In this phase, maintain deliberate pacing. Avoid mentioning specific model families (e.g. GPT-4 vs Claude) until the subproblems and constraints have been rigorously bounded on the whiteboard.
            </p>
            <div className="flex items-center gap-2 text-indigo-400 font-mono">
              <Clock className="w-3.5 h-3.5" />
              <span>Target Phase Time: {phases[activeStep].duration}</span>
            </div>
          </div>
        )}

        {activeStep === 4 && (
          <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/40 text-xs space-y-2">
            <div className="font-mono text-emerald-400 font-bold uppercase flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Synthesized Problem Statement (Deliverable)</span>
            </div>
            <p className="text-emerald-100 font-medium leading-relaxed italic">
              "{currentPrompt.refinedStatement}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
