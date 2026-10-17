import React, { useState } from 'react';
import { FileText, Archive, Cloud, Database, HardDrive, Check } from 'lucide-react';

export const MemoryTierDiagram: React.FC = () => {
  const [activeTier, setActiveTier] = useState<'short' | 'long' | 'external'>('short');

  const tiers = {
    short: {
      title: 'Short-Term Memory',
      metaphor: 'The Working Notepad',
      icon: FileText,
      color: '#f59e0b',
      lifespan: 'Single conversation session / Active context window',
      implementation: 'In-session message buffers, sliding token windows, scratchpad memory',
      whatItStores: [
        'User prompt 2 turns ago',
        'Immediate tool outputs and error codes',
        'Clarifying questions answered during the chat',
      ],
      example: 'Remembering you asked for "Paris hotels" when you reply "make it near the Louvre".',
    },
    long: {
      title: 'Long-Term Memory',
      metaphor: 'The Personal Filing Cabinet',
      icon: Archive,
      color: '#10b981',
      lifespan: 'Persists indefinitely across distinct sessions',
      implementation: 'Relational SQL tables, document stores, key-value user preference profiles',
      whatItStores: [
        'User dietary, seat, or hotel room preferences',
        'Historical support tickets and completed transactions',
        'Past user feedback and interaction outcomes',
      ],
      example: 'Recalling that you prefer aisle seats and vegetarian meals from last year\'s trip.',
    },
    external: {
      title: 'External / Knowledge Memory',
      metaphor: 'The Vast Library (RAG & Vector DB)',
      icon: Cloud,
      color: '#6366f1',
      lifespan: 'Enterprise-wide knowledge base, updated periodically',
      implementation: 'Vector databases (Pinecone, Qdrant, Chroma) via numerical embeddings & RAG',
      whatItStores: [
        'Thousands of enterprise policy documents, manuals, and FAQs',
        'Live knowledge articles and technical API specifications',
        'Semantically searched snippets retrieved on-demand',
      ],
      example: 'Retrieving the exact 2026 baggage refund policy clause without loading the 800-page manual.',
    },
  };

  const selected = tiers[activeTier];
  const Icon = selected.icon;

  return (
    <div className="rounded-3xl border border-slate-700/80 bg-slate-900/60 p-6 md:p-8 backdrop-blur-xl shadow-xl my-6">
      <div className="mb-6">
        <span className="text-xs uppercase tracking-wider font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
          Interactive Memory Architecture
        </span>
        <h3 className="text-lg md:text-xl font-bold text-slate-100 mt-2">
          The Three Tiers of Agent Memory
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Click each memory tier to explore its storage medium, persistence lifespan, and retrieval mechanism.
        </p>
      </div>

      {/* Tier Selector Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {(['short', 'long', 'external'] as const).map((tierKey) => {
          const t = tiers[tierKey];
          const TierIcon = t.icon;
          const isSelected = activeTier === tierKey;

          return (
            <button
              key={tierKey}
              type="button"
              onClick={() => setActiveTier(tierKey)}
              className={`p-4 rounded-2xl border text-left transition-all duration-200 flex items-center gap-3.5 ${
                isSelected
                  ? 'bg-slate-800/90 border-slate-500 ring-2 ring-amber-400/50 shadow-lg'
                  : 'bg-slate-950/40 border-slate-800 hover:border-slate-700 opacity-70 hover:opacity-100'
              }`}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 shadow-inner"
                style={{ backgroundColor: t.color }}
              >
                <TierIcon size={20} />
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-slate-200 truncate">{t.title}</h4>
                <span className="text-[11px] text-slate-400 truncate block">{t.metaphor}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Deep Inspection Panel */}
      <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md"
            style={{ backgroundColor: selected.color }}
          >
            <Icon size={20} />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-100">{selected.title}</h4>
            <span className="text-xs text-amber-400 font-medium">{selected.metaphor}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mb-4">
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800/80">
            <span className="font-semibold text-slate-300 block mb-1">Persistence Lifespan:</span>
            <p className="text-slate-400">{selected.lifespan}</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800/80">
            <span className="font-semibold text-slate-300 block mb-1">Technical Implementation:</span>
            <p className="text-slate-400">{selected.implementation}</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 mb-4 text-xs">
          <span className="font-semibold text-slate-200 block mb-2">What It Stores:</span>
          <ul className="space-y-1.5 text-slate-300">
            {selected.whatItStores.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <Check size={14} className="text-amber-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/20 text-xs font-mono text-amber-200">
          <strong className="text-amber-300">Concrete Scenario: </strong>
          {selected.example}
        </div>
      </div>
    </div>
  );
};
