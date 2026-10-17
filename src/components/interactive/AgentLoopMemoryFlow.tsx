import React, { useState } from 'react';
import { Eye, Database, Brain, Zap, Save, ChevronRight, RotateCcw } from 'lucide-react';

export const AgentLoopMemoryFlow: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const loopSteps = [
    {
      step: '1. Perceive',
      icon: Eye,
      color: '#06b6d4',
      badge: 'Sensory Input',
      title: 'Environmental Sensing',
      content: 'User submits message: "Can you renew my subscription and use my business card on file?"',
      memoryRole: 'Input Interface extracts intent: RenewSubscription(paymentMethod="card_on_file").',
    },
    {
      step: '2. Recall',
      icon: Database,
      color: '#f59e0b',
      badge: 'Pre-Reasoning Retrieval',
      title: 'Memory Retrieval',
      content: 'Agent queries Long-Term SQL Profile: Retrieves customer corporate Visa ending in 4092, billing address, and tier status.',
      memoryRole: 'Supplies essential personal context to the reasoning engine before decisions are made.',
    },
    {
      step: '3. Reason & Plan',
      icon: Brain,
      color: '#8b5cf6',
      badge: 'Decision Core',
      title: 'Model Deliberation',
      content: 'LLM verifies account is in good standing, validates renewal cost ($499/yr), and constructs payment payload.',
      memoryRole: 'Context window combines user prompt with recalled Visa profile to generate safe tool arguments.',
    },
    {
      step: '4. Act',
      icon: Zap,
      color: '#10b981',
      badge: 'Tool Execution',
      title: 'External Action',
      content: 'Agent invokes StripeAPI.charge(card="tok_4092", amount=49900). Transaction succeeds: invoice #INV-8821.',
      memoryRole: 'External environment changes state from pending to renewed.',
    },
    {
      step: '5. Store & Learn',
      icon: Save,
      color: '#ec4899',
      badge: 'Post-Action Update',
      title: 'Memory Persistence',
      content: 'Agent writes renewal timestamp (expires Oct 2027) and invoice ID to Long-Term Database; appends turn to Short-Term Buffer.',
      memoryRole: 'Stores new facts so subsequent queries immediately acknowledge the active renewal.',
    },
  ];

  return (
    <div className="rounded-3xl border border-slate-700/80 bg-slate-900/60 p-6 md:p-8 backdrop-blur-xl shadow-xl my-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-xs uppercase tracking-wider font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
            Trace the Flow Challenge
          </span>
          <h3 className="text-lg md:text-xl font-bold text-slate-100 mt-2">
            The 5-Step Continuous Agent Loop
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Follow a customer renewal request through Perceive → Recall → Reason → Act → Store.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveStep((prev) => (prev + 1) % loopSteps.length)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-amber-600 hover:bg-amber-500 text-white transition-all shadow-md"
          >
            <span>Next Step</span>
            <ChevronRight size={14} />
          </button>
          <button
            type="button"
            onClick={() => setActiveStep(0)}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Progress Chain */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-6">
        {loopSteps.map((s, idx) => {
          const Icon = s.icon;
          const isActive = activeStep === idx;
          const isPassed = activeStep > idx;

          return (
            <div
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`cursor-pointer p-3 rounded-2xl border text-center transition-all ${
                isActive
                  ? 'bg-slate-800/90 border-amber-400/80 ring-2 ring-amber-400/40 shadow-lg'
                  : isPassed
                  ? 'bg-slate-950/60 border-emerald-500/40 text-emerald-300 opacity-80'
                  : 'bg-slate-950/30 border-slate-800/80 text-slate-500 opacity-50'
              }`}
            >
              <div
                className="w-8 h-8 rounded-xl mx-auto mb-1.5 flex items-center justify-center text-white"
                style={{ backgroundColor: s.color }}
              >
                <Icon size={16} />
              </div>
              <span className="text-[11px] font-bold block truncate">{s.step}</span>
            </div>
          );
        })}
      </div>

      {/* Detail Showcase */}
      <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-base font-bold text-slate-100">{loopSteps[activeStep].title}</h4>
          <span className="text-xs font-mono px-2.5 py-0.5 rounded-md bg-amber-950/60 text-amber-300 border border-amber-800/60">
            {loopSteps[activeStep].badge}
          </span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-200 leading-relaxed mb-4">
          {loopSteps[activeStep].content}
        </div>

        <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/20 text-xs text-amber-200">
          <strong className="text-amber-300">Memory Interaction: </strong>
          {loopSteps[activeStep].memoryRole}
        </div>
      </div>
    </div>
  );
};
