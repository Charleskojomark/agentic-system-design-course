import React from 'react';
import { CheckSquare, Square, ShieldCheck, Sparkles } from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';

export const InteractiveChecklist: React.FC = () => {
  const { progress, toggleChecklistItem } = useProgress();
  const completed = progress.checklistCompletedItems || [];

  const categories = [
    {
      name: 'Performance and Latency',
      items: [
        { id: 'perf-1', text: 'Are response times within acceptable limits for critical user journeys?' },
        { id: 'perf-2', text: 'Has the system been tested under peak concurrent load conditions?' },
        { id: 'perf-3', text: 'Are cost implications of LLM inference & tool calls modeled and managed?' },
      ],
    },
    {
      name: 'Reliability and Accuracy',
      items: [
        { id: 'rel-1', text: 'Are hallucination rates minimized via RAG & contextual grounding?' },
        { id: 'rel-2', text: 'Are key decisions validated via rules-based output guardrails?' },
        { id: 'rel-3', text: 'Are automatic retries with exponential backoff active for tool failures?' },
        { id: 'rel-4', text: 'Can the system gracefully degrade if non-critical tools fail?' },
      ],
    },
    {
      name: 'Memory Management',
      items: [
        { id: 'mem-1', text: 'Is memory consistency maintained across multi-turn interactions?' },
        { id: 'mem-2', text: 'Are policies for sensitive data retention and TTL expiration enforced?' },
        { id: 'mem-3', text: 'Is the external vector database scalable for production load?' },
      ],
    },
    {
      name: 'Security and Privacy',
      items: [
        { id: 'sec-1', text: 'Are all inputs/outputs filtered for prompt injections and malicious content?' },
        { id: 'sec-2', text: 'Are tool access policies strictly enforced via allowlists?' },
        { id: 'sec-3', text: 'Are PII identifiers automatically scrubbed before memory persistence?' },
      ],
    },
    {
      name: 'Human Oversight and Intervention',
      items: [
        { id: 'hitl-1', text: 'Are clear HITL approval gates configured for high-stakes/irreversible actions?' },
        { id: 'hitl-2', text: 'Are reviewer intervention dashboards intuitive with full context?' },
        { id: 'hitl-3', text: 'Are comprehensive audit trails and decision logs recorded (HATL)?' },
      ],
    },
    {
      name: 'Observability and Monitoring',
      items: [
        { id: 'obs-1', text: 'Are continuous monitoring and alerting active for error rates and latency?' },
        { id: 'obs-2', text: 'Can the system internal reasoning and tool calls be traced and debugged?' },
      ],
    },
    {
      name: 'Scalability and Maintainability',
      items: [
        { id: 'scal-1', text: 'Is the architecture modular and extensible for model/tool upgrades?' },
        { id: 'scal-2', text: 'Are deployment strategies optimized for resilience across cloud regions?' },
      ],
    },
  ];

  const totalItems = categories.reduce((sum, c) => sum + c.items.length, 0);
  const completedCount = completed.length;
  const progressPercent = Math.round((completedCount / totalItems) * 100);

  return (
    <div className="rounded-3xl border border-slate-700/80 bg-slate-900/60 p-6 md:p-8 backdrop-blur-xl shadow-xl my-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-xs uppercase tracking-wider font-bold text-violet-400 bg-violet-500/10 px-2.5 py-1 rounded-md border border-violet-500/20">
            Audit Checklist Tool
          </span>
          <h3 className="text-lg md:text-xl font-bold text-slate-100 mt-2">
            Production Readiness Checklist
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Audit your architecture against the 7 production-readiness dimensions from the syllabus.
          </p>
        </div>

        {/* Audit Score Badge */}
        <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-right shrink-0">
          <div className="text-[11px] text-slate-400 font-mono">Readiness Score</div>
          <div className="text-xl font-bold text-violet-400 font-mono">
            {progressPercent}%
            <span className="text-xs text-slate-500 font-normal ml-1">
              ({completedCount}/{totalItems})
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-800 rounded-full h-2 mb-8 overflow-hidden">
        <div
          className="bg-gradient-to-r from-violet-600 to-indigo-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Checklist Accordions */}
      <div className="space-y-6">
        {categories.map((cat, cIdx) => (
          <div key={cIdx} className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80">
            <h4 className="text-xs font-bold uppercase tracking-wider text-violet-300 mb-3 flex items-center justify-between">
              <span>{cat.name}</span>
              <span className="text-[10px] text-slate-500 font-normal">
                {cat.items.filter((i) => completed.includes(i.id)).length} / {cat.items.length}
              </span>
            </h4>

            <div className="space-y-2">
              {cat.items.map((item) => {
                const isChecked = completed.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleChecklistItem(item.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 ${
                      isChecked
                        ? 'bg-violet-950/30 border-violet-500/40 text-slate-200'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className="shrink-0 mt-0.5 text-violet-400">
                      {isChecked ? <CheckSquare size={16} /> : <Square size={16} />}
                    </span>
                    <span className={`text-xs leading-relaxed ${isChecked ? 'line-through opacity-80' : ''}`}>
                      {item.text}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
