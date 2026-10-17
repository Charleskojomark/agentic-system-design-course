import React, { useState } from 'react';
import { Brain, Wrench, Compass, CheckCircle2, Sparkles, Layers, Shield, Code, ChevronRight } from 'lucide-react';

export const ThreePillarsDiagram: React.FC = () => {
  const [activePillar, setActivePillar] = useState<'model' | 'tools' | 'instructions'>('model');

  const pillars = {
    model: {
      name: 'The Model (The Brain)',
      icon: Brain,
      tag: 'Reasoning Engine',
      color: 'indigo',
      desc: 'Sits at the center of the agent decision-making process. Given input, it understands intent, plans multi-step tasks, and chooses which tools to invoke.',
      factors: [
        { label: 'Task Complexity', note: 'Use Mistral/Gemma for extraction; reserve Claude 3.5 / GPT-4 for multi-step reasoning.' },
        { label: 'Latency', note: 'Critical for live user chat; optimize with lightweight models or edge deployment.' },
        { label: 'Cost', note: 'Route routine steps to low-cost models to avoid excessive inference expense.' },
        { label: 'Context Length', note: 'Extended windows (1M+ tokens) enable reasoning over massive enterprise PDFs.' },
      ],
    },
    tools: {
      name: 'The Tools (The Hands)',
      icon: Wrench,
      tag: 'External Action',
      color: 'emerald',
      desc: 'Give the agent the power to act in the real world. Tools include APIs, database query clients, code execution environments, and robotic actuators.',
      factors: [
        { label: 'REST APIs', note: 'Call flight search, weather forecasts, and calendar creation endpoints.' },
        { label: 'Database Lookups', note: 'Query SQL and vector databases for live customer and inventory status.' },
        { label: 'Code Execution', note: 'Run Python/Bash scripts to perform calculations and parse structured data.' },
        { label: 'Actuators', note: 'Control motors, assembly arms, or smart-home devices in physical agents.' },
      ],
    },
    instructions: {
      name: 'The Instructions (The Compass)',
      icon: Compass,
      tag: 'Guiding Framework',
      color: 'amber',
      desc: 'Shape how the agent behaves, communicates, and prioritizes goals. Instructions bridge raw model capability with purposeful, aligned behavior.',
      factors: [
        { label: 'System Prompts', note: 'Define persona, tone, style, and domain assumptions.' },
        { label: 'Operational Constraints', note: 'Set strict limits (e.g. "Do not confirm payments above $5,000 without approval").' },
        { label: 'Few-Shot Examples', note: 'Demonstrate desired behavior on complex edge cases.' },
        { label: 'Ethical Guardrails', note: 'Define forbidden topics, safety filters, and escalation rules.' },
      ],
    },
  };

  const current = pillars[activePillar];

  return (
    <div className="rounded-3xl p-4 sm:p-8 bg-slate-900/80 border border-white/10 space-y-5 sm:space-y-6 shadow-2xl backdrop-blur-xl">
      <div className="space-y-1 border-b border-white/10 pb-4">
        <h4 className="font-bold text-white text-base sm:text-lg flex items-center gap-2">
          <span className="text-xl">🏛️</span>
          <span>The Three Pillars of Modular Agent Architecture</span>
        </h4>
        <p className="text-xs text-slate-400">
          Inspect Model, Tools, and Instructions specifications and selection criteria
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
        {(['model', 'tools', 'instructions'] as const).map(key => {
          const p = pillars[key];
          const Icon = p.icon;
          const isSelected = activePillar === key;

          return (
            <div
              key={key}
              onClick={() => setActivePillar(key)}
              className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer space-y-2.5 sm:space-y-3 ${
                isSelected
                  ? 'bg-slate-800/90 border-indigo-500/60 shadow-xl ring-1 ring-indigo-500/40'
                  : 'bg-black/30 border-white/5 hover:border-white/10 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="p-2 sm:p-2.5 rounded-xl bg-white/5 text-white">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400" />
                </span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/5 text-indigo-300 font-bold">
                  {p.tag}
                </span>
              </div>
              <div>
                <h5 className="font-bold text-white text-sm">{p.name}</h5>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 sm:p-6 rounded-2xl bg-black/40 border border-white/10 space-y-4 animate-fade-in">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-indigo-400 block mb-1">
            Component Role & Responsibility
          </span>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{current.desc}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {current.factors.map((f, idx) => (
            <div key={idx} className="p-3 sm:p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
              <span className="text-xs font-bold text-indigo-300 block">{f.label}</span>
              <span className="text-[11px] text-slate-400 leading-snug block">{f.note}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ToolBuilderSandbox: React.FC = () => {
  const [toolName, setToolName] = useState('book_flight');
  const [hasAuthCheck, setHasAuthCheck] = useState(true);
  const [hasRateLimit, setHasRateLimit] = useState(true);
  const [hasSchemaValidation, setHasSchemaValidation] = useState(true);

  return (
    <div className="rounded-3xl p-4 sm:p-8 bg-slate-900/80 border border-white/10 space-y-5 sm:space-y-6 shadow-2xl backdrop-blur-xl">
      <div className="space-y-1 border-b border-white/10 pb-4">
        <h4 className="font-bold text-white text-base sm:text-lg flex items-center gap-2">
          <span className="text-xl">⚡</span>
          Tool Definition Sandbox: How Models Call APIs
        </h4>
        <p className="text-xs text-slate-400">
          Toggle safeguards and view the generated JSON schema sent to the LLM
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-mono text-slate-400 font-bold uppercase">Select Tool Function</label>
            <select
              value={toolName}
              onChange={e => setToolName(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-black/50 border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="book_flight">book_flight(origin, destination, date)</option>
              <option value="query_inventory">query_inventory(sku, warehouseId)</option>
              <option value="send_email_notification">send_email_notification(recipient, subject)</option>
            </select>
          </div>

          <div className="space-y-2 pt-2">
            <span className="text-xs font-mono text-slate-400 font-bold uppercase block">Architectural Safeguards</span>
            
            <label className="flex items-center gap-3 p-3 rounded-xl bg-black/30 border border-white/5 cursor-pointer">
              <input
                type="checkbox"
                checked={hasSchemaValidation}
                onChange={e => setHasSchemaValidation(e.target.checked)}
                className="accent-indigo-500"
              />
              <span className="text-xs text-slate-300">Strict JSON Argument Schema Validation</span>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-xl bg-black/30 border border-white/5 cursor-pointer">
              <input
                type="checkbox"
                checked={hasAuthCheck}
                onChange={e => setHasAuthCheck(e.target.checked)}
                className="accent-indigo-500"
              />
              <span className="text-xs text-slate-300">Role-Based Permission Precondition</span>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-xl bg-black/30 border border-white/5 cursor-pointer">
              <input
                type="checkbox"
                checked={hasRateLimit}
                onChange={e => setHasRateLimit(e.target.checked)}
                className="accent-indigo-500"
              />
              <span className="text-xs text-slate-300">Rate Limiter (Max 10 calls/minute)</span>
            </label>
          </div>
        </div>

        <div className="rounded-2xl bg-black/70 border border-white/10 p-4 font-mono text-xs overflow-x-auto text-indigo-300 space-y-2">
          <div className="text-[10px] text-slate-500 border-b border-white/5 pb-2 uppercase tracking-wider font-bold">
            Generated LLM Tool Schema (OpenAI / Gemini format)
          </div>
          <pre className="text-[11px] leading-relaxed">
{`{
  "type": "function",
  "function": {
    "name": "${toolName}",
    "description": "Performs verified external action",
    "parameters": {
      "type": "object",
      "required": ["id"],
      "strict": ${hasSchemaValidation}
    },
    "safeguards": {
      "authVerified": ${hasAuthCheck},
      "rateLimited": ${hasRateLimit}
    }
  }
}`}
          </pre>
        </div>
      </div>
    </div>
  );
};
