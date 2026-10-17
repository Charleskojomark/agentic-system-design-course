import React, { useState } from 'react';
import { Monitor, Car, Layers, Brain, Wrench, Compass, ArrowRight, Check } from 'lucide-react';

interface ClickableArchDiagramProps {
  mode: 'categories' | 'components';
}

export const ClickableArchDiagram: React.FC<ClickableArchDiagramProps> = ({ mode }) => {
  const [selectedId, setSelectedId] = useState<string>(
    mode === 'categories' ? 'software' : 'model'
  );

  const categoriesData = [
    {
      id: 'software',
      title: 'Software-Based Agents',
      subtitle: 'Sandbox Digital Environments',
      icon: Monitor,
      color: '#6366f1',
      examples: 'Retail chatbots, email triage agents, financial trading bots',
      characteristics: [
        'Zero physical sensors or hardware requirements',
        'Operates entirely through code, APIs, interfaces & databases',
        'Utilizes tools like web search, file systems, and LLMs',
      ],
    },
    {
      id: 'physical',
      title: 'Physical Agents',
      subtitle: 'Embodied Systems',
      icon: Car,
      color: '#10b981',
      examples: 'Autonomous vehicles (Tesla, Waymo), domestic cleaning robots, factory robotic arms',
      characteristics: [
        'Senses physical reality via LiDAR, ultrasonic, cameras & microphones',
        'Performs actions using physical actuators (motors, arms, wheels)',
        'Must navigate real-time physical uncertainty, safety & mechanical delays',
      ],
    },
    {
      id: 'hybrid',
      title: 'Hybrid & Adaptive Agents',
      subtitle: 'Blended Real-World Integration',
      icon: Layers,
      color: '#f59e0b',
      examples: 'AI traffic light system, healthcare wearable assistant, inventory warehouse robot',
      characteristics: [
        'Operates seamlessly across digital software and physical domains',
        'Integrates multimodal sensor inputs with remote database logic',
        'Continuously adapts policies through real-world environmental feedback',
      ],
    },
  ];

  const componentsData = [
    {
      id: 'model',
      title: 'The Model (The Brain)',
      subtitle: 'Interprets, Reasons, Plans',
      icon: Brain,
      color: '#6366f1',
      examples: 'GPT-6 Astra, Claude Opus 4.1, Gemini 1.5 Flash, Mistral 8B',
      characteristics: [
        'Decomposes high-level instructions into executable sub-steps',
        'Evaluates context and selects optimal tool calls',
        'Executes self-critique, reflection, and error recovery',
      ],
    },
    {
      id: 'tools',
      title: 'The Tools (The Hands)',
      subtitle: 'Acts on External Environments',
      icon: Wrench,
      color: '#10b981',
      examples: 'Calendar API, PostgreSQL client, Web search scraper, Bash sandbox',
      characteristics: [
        'Enables the agent to impact systems beyond generating text',
        'Fetches live real-time information from outside knowledge sources',
        'Transforms theoretical reasoning plans into completed workflows',
      ],
    },
    {
      id: 'instructions',
      title: 'The Instructions (The Compass)',
      subtitle: 'Guides Behavior & Policy',
      icon: Compass,
      color: '#f43f5e',
      examples: 'System prompts, few-shot demonstration exemplars, safety rules',
      characteristics: [
        'Sets role, tone, ethical boundaries, and output formatting rules',
        'Shapes how the model interprets ambiguity and handles frustration',
        'Provides behavioral alignment without hardcoding brittle procedural logic',
      ],
    },
  ];

  const currentList = mode === 'categories' ? categoriesData : componentsData;
  const activeItem = currentList.find((item) => item.id === selectedId) || currentList[0];
  const IconActive = activeItem.icon;

  return (
    <div className="rounded-3xl border border-slate-700/80 bg-slate-900/60 p-6 md:p-8 backdrop-blur-xl shadow-xl my-6">
      <div className="mb-6">
        <span className="text-xs uppercase tracking-wider font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
          Clickable Architecture Explorer
        </span>
        <h3 className="text-lg md:text-xl font-bold text-slate-100 mt-2">
          {mode === 'categories'
            ? 'Three Categories of AI Agents'
            : 'The Core Agent Components'}
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Click any component node to inspect its operational role, real-world examples, and architectural constraints.
        </p>
      </div>

      {/* Nodes Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {currentList.map((item) => {
          const Icon = item.icon;
          const isSelected = item.id === selectedId;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedId(item.id)}
              className={`p-4 rounded-2xl border text-left transition-all duration-200 flex items-center gap-3.5 ${
                isSelected
                  ? 'bg-slate-800/90 border-slate-500 ring-2 ring-emerald-400/50 shadow-lg'
                  : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 opacity-75 hover:opacity-100'
              }`}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-inner"
                style={{
                  backgroundColor: isSelected ? item.color : '#334155',
                  color: '#ffffff',
                }}
              >
                <Icon size={20} />
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-slate-200 truncate">{item.title}</h4>
                <p className="text-[11px] text-slate-400 truncate">{item.subtitle}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Slide-in Details Panel */}
      <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md"
            style={{ backgroundColor: activeItem.color }}
          >
            <IconActive size={20} />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-100">{activeItem.title}</h4>
            <span className="text-xs text-slate-400">{activeItem.subtitle}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mt-3">
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/90">
            <span className="font-semibold text-slate-300 block mb-2">Key Characteristics:</span>
            <ul className="space-y-1.5 text-slate-400">
              {activeItem.characteristics.map((c, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/90">
            <span className="font-semibold text-slate-300 block mb-2">Real-World Examples:</span>
            <p className="text-slate-400 leading-relaxed">{activeItem.examples}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
