import React, { useState } from 'react';
import { UserCheck, Gauge, FileText, Check } from 'lucide-react';

export const HumanOversightComparison: React.FC = () => {
  const [activeModel, setActiveModel] = useState<'hitl' | 'hotl' | 'hatl'>('hitl');

  const models = {
    hitl: {
      name: 'Human-in-the-Loop (HITL)',
      metaphor: 'Student Driver with Instructor',
      metaphorDesc: 'The car cannot make a turn until the instructor gives the verbal signal or releases the dual brake pedal.',
      color: '#06b6d4',
      icon: UserCheck,
      timing: 'Pre-Action (Synchronous Gating)',
      mechanisms: ['Approval Gates for transactions > $5,000', 'Escalation triggers on high model uncertainty', 'Human review before code deployment'],
      tradeoffs: 'High safety guarantee, but introduces latency and reviewer bottleneck.',
    },
    hotl: {
      name: 'Human-on-the-Loop (HOTL)',
      metaphor: 'Driver using Adaptive Cruise Control',
      metaphorDesc: 'The system steers and accelerates autonomously, but the driver watches the road and can grab the wheel instantly.',
      color: '#10b981',
      icon: Gauge,
      timing: 'Real-Time (Continuous Telemetry & Pause)',
      mechanisms: ['Live operator supervision dashboards', 'Emergency stop / pause buttons', 'Live plan and parameter editing while running'],
      tradeoffs: 'Faster execution for routine flows; requires dedicated operators monitoring live telemetry.',
    },
    hatl: {
      name: 'Human-above-the-Loop (HATL)',
      metaphor: 'Reviewing Fleet GPS & Dashcam Telematics',
      metaphorDesc: 'After the journey is over, safety inspectors review camera logs, fuel efficiency, and speed records to score performance.',
      color: '#8b5cf6',
      icon: FileText,
      timing: 'Post-Action (Retrospective Auditing)',
      mechanisms: ['Audit trails and decision lineage logs', 'Nightly compliance verification scripts', 'Continuous evaluation for fine-tuning & prompt updates'],
      tradeoffs: 'Zero latency during runtime execution, but cannot prevent errors that have already occurred.',
    },
  };

  const selected = models[activeModel];
  const Icon = selected.icon;

  return (
    <div className="rounded-3xl border border-slate-700/80 bg-slate-900/60 p-6 md:p-8 backdrop-blur-xl shadow-xl my-6">
      <div className="mb-6">
        <span className="text-xs uppercase tracking-wider font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-md border border-cyan-500/20">
          Car Driving Metaphor
        </span>
        <h3 className="text-lg md:text-xl font-bold text-slate-100 mt-2">
          Human Oversight Models: HITL vs. HOTL vs. HATL
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Explore how human intervention is timed across the execution life-cycle.
        </p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {(['hitl', 'hotl', 'hatl'] as const).map((key) => {
          const m = models[key];
          const MIcon = m.icon;
          const isSelected = activeModel === key;

          return (
            <button
              key={key}
              type="button"
              onClick={() => setActiveModel(key)}
              className={`p-4 rounded-2xl border text-left transition-all ${
                isSelected
                  ? 'bg-slate-800 border-cyan-400 text-white ring-2 ring-cyan-400/40 shadow-lg'
                  : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white mb-2 shadow-inner"
                style={{ backgroundColor: m.color }}
              >
                <MIcon size={18} />
              </div>
              <h5 className="text-sm font-bold text-slate-200">{m.name}</h5>
              <span className="text-[11px] text-cyan-400 font-mono block mt-0.5">{m.timing}</span>
            </button>
          );
        })}
      </div>

      {/* Detail Showcase */}
      <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md"
            style={{ backgroundColor: selected.color }}
          >
            <Icon size={20} />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-100">{selected.name}</h4>
            <span className="text-xs text-cyan-400 font-medium">{selected.metaphor}</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 leading-relaxed italic mb-4">
          "{selected.metaphorDesc}"
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
            <span className="font-semibold text-slate-300 block mb-2">Production Mechanisms:</span>
            <ul className="space-y-1.5 text-slate-400">
              {selected.mechanisms.map((m, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <Check size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
            <span className="font-semibold text-slate-300 block mb-2">System Trade-off:</span>
            <p className="text-slate-400 leading-relaxed">{selected.tradeoffs}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
