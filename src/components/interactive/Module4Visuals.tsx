import React, { useState } from 'react';
import { Layers, Play, CheckCircle2, ArrowRight, UserCheck, Users, GitBranch } from 'lucide-react';

export const OrchestrationPatternsGallery: React.FC = () => {
  const [selectedPattern, setSelectedPattern] = useState<'loop' | 'react' | 'plan' | 'manager' | 'handoff'>('react');

  const patterns = {
    loop: {
      title: 'Tool Calling Loop (Single Agent)',
      tag: 'Dynamic & Lightweight',
      desc: 'The model receives an instruction, decides whether to invoke a tool, inspects the result, and loops until the goal is achieved or it halts.',
      steps: ['1. Receive User Prompt', '2. LLM selects tool and generates arguments', '3. Tool executes and returns observation', '4. LLM evaluates if goal is complete; loops or exits'],
      bestFor: 'Simple lookups, search tasks, and quick API wrappers.',
    },
    react: {
      title: 'ReAct: Reasoning + Acting (Single Agent)',
      tag: 'Transparent & Auditable',
      desc: 'The model alternates explicit "Thought" reasoning steps with "Action" tool invocations and "Observation" evaluations for full traceability.',
      steps: ['Thought: "I need to check flight availability first"', 'Action: call flight_search_api()', 'Observation: flight UA-412 found at $350', 'Thought: "Now I will book UA-412"', 'Action: return final answer'],
      bestFor: 'Complex troubleshooting, research pipelines, and regulated domains requiring auditability.',
    },
    plan: {
      title: 'Plan-and-Execute (Single Agent)',
      tag: 'Structured Two-Phase',
      desc: 'Separates planning from execution. An LLM planner first drafts a sequence of subtasks, then an executor executes each step sequentially.',
      steps: ['Phase 1: Generate ordered subtask plan [A, B, C, D]', 'Phase 2: Execute step A via tools', 'Phase 3: Execute step B using results of A', 'Phase 4: Synthesize final output'],
      bestFor: 'Predictable multi-stage tasks like report generation or data migration.',
    },
    manager: {
      title: 'Manager-Worker (Multi-Agent Swarm)',
      tag: 'Hierarchical Team',
      desc: 'A central Manager agent breaks down high-level goals into parallel subtasks, delegates them to specialized workers (Research, Finance, Code), and synthesizes outputs.',
      steps: ['Manager receives goal: "Analyze competitor pricing"', 'Manager assigns Worker 1 (Web Search) and Worker 2 (Database Triage)', 'Workers execute concurrently in parallel threads', 'Manager reviews results and compiles executive summary'],
      bestFor: 'Large enterprise projects requiring multiple distinct skills or parallel execution.',
    },
    handoff: {
      title: 'Decentralized Peer Handoff (Multi-Agent)',
      tag: 'Autonomous Relay',
      desc: 'No central manager. Agents operate as peers with distinct specializations, passing control to peer agents based on task state.',
      steps: ['Intake Agent triages user query', 'Handoff to Flight Specialist Agent', 'Flight Specialist completes booking and triggers Hotel Agent', 'Hotel Agent confirms reservation and replies to user'],
      bestFor: 'Decentralized microservices, customer journey flows, and real-time distributed simulations.',
    },
  };

  const current = patterns[selectedPattern];

  return (
    <div className="rounded-3xl p-6 sm:p-8 bg-slate-900/80 border border-white/10 space-y-6 shadow-2xl backdrop-blur-xl">
      <div className="space-y-1 border-b border-white/10 pb-4">
        <h4 className="font-bold text-white text-base sm:text-lg flex items-center gap-2">
          <span className="text-xl">📐</span>
          Interactive Orchestration Pattern Gallery
        </h4>
        <p className="text-xs text-slate-400">
          Compare single-agent execution loops with multi-agent collaborative topologies
        </p>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {(['loop', 'react', 'plan', 'manager', 'handoff'] as const).map(key => {
          const isSelected = selectedPattern === key;
          const p = patterns[key];

          return (
            <button
              key={key}
              onClick={() => setSelectedPattern(key)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition border ${
                isSelected
                  ? 'bg-rose-600 text-white border-transparent shadow-md shadow-rose-500/20'
                  : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10 hover:text-white'
              }`}
            >
              {p.title.split(' ')[0]} {p.title.includes('Multi') ? '👥' : '👤'}
            </button>
          );
        })}
      </div>

      <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-4 animate-fade-in font-sans">
        <div className="flex items-center justify-between">
          <h5 className="font-bold text-white text-base">{current.title}</h5>
          <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/20 font-bold">
            {current.tag}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{current.desc}</p>

        <div className="space-y-2 pt-2">
          <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-rose-400 block">
            Execution Flow Sequence
          </span>
          <div className="space-y-2">
            {current.steps.map((st, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-200 flex items-center gap-2.5 font-mono">
                <span className="w-5 h-5 rounded-lg bg-rose-500/20 text-rose-300 flex items-center justify-center text-[10px] shrink-0 font-bold">
                  {idx + 1}
                </span>
                <span>{st}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/20 text-xs text-rose-200">
          <strong>Best Fit:</strong> {current.bestFor}
        </div>
      </div>
    </div>
  );
};
