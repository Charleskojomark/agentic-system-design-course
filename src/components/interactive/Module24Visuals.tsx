import React, { useState } from 'react';
import { Sparkles, Terminal, Award, Compass, ArrowRight, ShieldCheck, CheckCircle2, ChevronRight, BookOpen, Layers } from 'lucide-react';

export const FrontierLabInterviewNavigator: React.FC = () => {
  const [selectedLab, setSelectedLab] = useState<'palantir' | 'openai' | 'anthropic' | 'google'>('palantir');

  const labData = {
    palantir: {
      name: 'Palantir AI FDE',
      trackName: 'Delta Track (Customer Deployment)',
      timeline: '28-35 Days (5-6 Rounds)',
      stack: 'Foundry, AIP Agent Studio, Workshop, Gotham',
      uniqueRound: 'The Learning Interview (60m Live CodePair)',
      uniqueDesc: 'Given an unfamiliar proprietary query language/database with minimal docs, solve 4 progressive problems. Tests rapid mental model formation and asking questions.',
      rejectionSignal: 'Pretending to understand syntax and staying silent for 10 minutes rather than using the interviewer as a resource.',
      winningTip: 'Narrate your thought process constantly and ask targeted clarifying questions. Asking questions is explicitly evaluated as a positive signal.',
      color: 'border-blue-500/30 text-blue-400 bg-blue-500/10',
    },
    openai: {
      name: 'OpenAI FDE',
      trackName: 'DeployCo / Enterprise Deployments',
      timeline: '~3 Weeks (4 Fast Phases)',
      stack: 'GPT-4, o-series, Whisper, Sora, ChatGPT Enterprise',
      uniqueRound: 'Take-Home Video Walkthrough & Technical Deep Dive',
      uniqueDesc: 'Build a working system with OpenAI APIs, accompanied by a recorded video demo treated as a customer presentation. Defend against "How do you know it works?"',
      rejectionSignal: 'Opening with system diagrams in the onsite solution design before clarifying customer constraints, or failing to cite formal evaluation metrics.',
      winningTip: 'Treat the 5-hour take-home video as an executive briefing to a CTO: explicitly explain why you made deliberate scope tradeoffs.',
      color: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
    },
    anthropic: {
      name: 'Anthropic Applied AI',
      trackName: 'Customer Solutions & Applied Safety',
      timeline: '4-6 Weeks (6 Stages)',
      stack: 'Claude 3.5 (Haiku, Sonnet, Opus), Claude Code, MCP Servers',
      uniqueRound: 'Customer Simulation (60-90m) & Standalone Values Round (55m)',
      uniqueDesc: 'Discovery conversation with an enterprise buyer VP (filters 60% of candidates). Plus a standalone session testing ethical backbone under pushback.',
      rejectionSignal: 'Pitching Claude features during the first 10 minutes of discovery, or collapsing your ethical stance the second an interviewer pushes back in the values round.',
      winningTip: 'Engage with the Responsible Scaling Policy (RSP) as an active engineering constraint. Show restraint, active listening, and honest skepticism.',
      color: 'border-amber-500/30 text-amber-400 bg-amber-500/10',
    },
    google: {
      name: 'Google Cloud GenAI FDE',
      trackName: 'Professional Services / GenAI Practice',
      timeline: '4-5 Weeks (5 Rounds + Hiring Committee)',
      stack: 'Vertex AI, Gemini, BigQuery, Google ADK, LangGraph',
      uniqueRound: 'Vibe-Coding Session (60m Live Pair Programming)',
      uniqueDesc: 'A collaborative exercise where the interviewer actively writes code with you and redirects the technical approach partway through.',
      rejectionSignal: 'Treating the interviewer as a passive observer, or getting defensive when redirected to a different architecture mid-session.',
      winningTip: 'Demonstrate Googleyness by embracing redirects enthusiastically: "Great point—that removes a Redis dependency and simplifies deployment. Let us refactor."',
      color: 'border-indigo-500/30 text-indigo-400 bg-indigo-500/10',
    },
  };

  const current = labData[selectedLab];

  return (
    <div className="p-4 sm:p-6 rounded-3xl bg-slate-900/80 border border-indigo-500/20 backdrop-blur-xl shadow-xl space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white">Frontier AI Lab Interview Playbook Navigator</h3>
            <p className="text-xs text-slate-400">Compare hiring loops, unique round formats, and evaluation rubrics across Tier-1 AI labs</p>
          </div>
        </div>
      </div>

      {/* Lab Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {(Object.keys(labData) as (keyof typeof labData)[]).map(key => (
          <button
            key={key}
            onClick={() => setSelectedLab(key)}
            className={`p-3 rounded-2xl border text-left transition ${
              selectedLab === key
                ? 'bg-indigo-600 text-white font-bold shadow-md border-indigo-400'
                : 'bg-black/40 border-white/5 text-slate-400 hover:text-white hover:bg-white/[0.02]'
            }`}
          >
            <div className="text-[10px] font-mono opacity-75 uppercase">Playbook</div>
            <div className="text-xs sm:text-sm truncate">{labData[key].name}</div>
          </button>
        ))}
      </div>

      {/* Selected Lab Card */}
      <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-white/5 pb-3">
          <div>
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <span>{current.name}</span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${current.color}`}>
                {current.trackName}
              </span>
            </h4>
            <p className="text-xs text-slate-400 font-mono mt-0.5">Timeline: {current.timeline}</p>
          </div>
          <div className="text-xs font-mono text-slate-400">
            Stack: <strong className="text-slate-200">{current.stack}</strong>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-indigo-950/20 border border-indigo-500/30 text-xs space-y-1">
          <div className="font-mono text-indigo-400 font-bold uppercase">Signature Round: {current.uniqueRound}</div>
          <p className="text-slate-200 leading-relaxed">{current.uniqueDesc}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-1">
            <div className="font-mono text-rose-400 font-bold uppercase">Fatal Rejection Signal</div>
            <p className="text-rose-200 text-[11px] leading-relaxed">{current.rejectionSignal}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-1">
            <div className="font-mono text-emerald-400 font-bold uppercase">Winning Playbook Strategy</div>
            <p className="text-emerald-200 text-[11px] leading-relaxed">{current.winningTip}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const FDECareerPlaybookPlanner: React.FC = () => {
  const [activeHabit, setActiveHabit] = useState<number>(0);

  const habits = [
    {
      title: '1. Vertical Domain Expertise',
      icon: '🏥',
      tagline: 'Go deep in one high-friction regulated industry',
      summary: 'An FDE who deeply understands healthcare (HIPAA, Epic, HL7/FHIR) or financial services (FINRA, FIX, sovereign data residency) arrives on day one already knowing the non-negotiable boundaries that generalist software engineers take 6 months to discover.',
      actionItem: 'Pick one vertical (Healthcare, Finance, Defense, Logistics) and master its data privacy laws, legacy ERP schemas, and primary liability models.',
    },
    {
      title: '2. Evaluation Fluency',
      icon: '📐',
      tagline: 'Master non-deterministic system validation',
      summary: 'As models take more autonomous tool actions, the engineer who can build synthetic scenario fuzzers, trajectory evaluators, and shadow-mode benchmarks becomes the single most valuable technical asset in the deployment.',
      actionItem: 'Never ship a RAG or agent system without an automated offline evaluation suite measuring Faithfulness, Context Recall, and Tool Accuracy.',
    },
    {
      title: '3. Building to Orchestrating',
      icon: '🎼',
      tagline: 'Shift from boilerplate coder to systems orchestrator',
      summary: 'Frontier models write basic code in seconds. The enduring value of an elite FDE lies in architectural judgment: scoping the right problem, defining tool contracts, establishing safety gates, and managing executive stakeholders.',
      actionItem: 'Focus on harness engineering, state machine design, Model Context Protocol (MCP), and human-in-the-loop audit boundaries.',
    },
    {
      title: '4. The Personal Field Playbook',
      icon: '📓',
      tagline: 'Systematize hard-won deployment lessons into a compounding asset',
      summary: 'After every deployment, spend 30 minutes writing down: What surprised you? What constraint should you have probed earlier? How did you earn user trust? Over 3-4 engagements, this becomes an insurmountable personal moat.',
      actionItem: 'Maintain an append-only deployment retrospective journal covering discovery mistakes, IT security negotiations, and production failure recoveries.',
    },
  ];

  const current = habits[activeHabit];

  return (
    <div className="p-4 sm:p-6 rounded-3xl bg-slate-900/80 border border-indigo-500/20 backdrop-blur-xl shadow-xl space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white">The FDE Horizon: Four Compounding Habits</h3>
            <p className="text-xs text-slate-400">The strategic habits that separate elite Forward Deployed Engineers from short-term prompt tuners</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {habits.map((h, idx) => (
          <button
            key={h.title}
            onClick={() => setActiveHabit(idx)}
            className={`p-3 rounded-2xl border text-left transition ${
              activeHabit === idx
                ? 'bg-indigo-600 text-white font-bold shadow-md border-indigo-400'
                : 'bg-black/30 border-white/5 text-slate-400 hover:text-white hover:bg-white/[0.02]'
            }`}
          >
            <div className="text-lg mb-1">{h.icon}</div>
            <div className="text-xs font-semibold truncate">{h.title.split('. ')[1]}</div>
          </button>
        ))}
      </div>

      <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-white">{current.title}</span>
          <span className="text-xs font-mono text-indigo-400">{current.tagline}</span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">{current.summary}</p>

        <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-200 flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-emerald-300">Actionable Commitment:</strong> {current.actionItem}
          </div>
        </div>
      </div>
    </div>
  );
};
