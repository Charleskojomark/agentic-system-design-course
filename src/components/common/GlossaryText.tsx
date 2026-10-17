import React, { useState } from 'react';
import { Search, BookOpen, X, Sparkles } from 'lucide-react';
import glossaryData from '../../../content/glossary.json';
import { GlossaryItem } from '../../types';

const getGlossaryList = (): GlossaryItem[] => {
  if (Array.isArray(glossaryData)) {
    return glossaryData as GlossaryItem[];
  }
  return Object.entries(glossaryData as Record<string, string>).map(([term, definition]) => ({
    term,
    definition,
    category: 'system-design',
  }));
};

export const GlossaryModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  if (!isOpen) return null;

  const glossary = getGlossaryList();
  const categories = ['all', ...Array.from(new Set(glossary.map(g => g.category)))];

  const filtered = glossary.filter(item => {
    const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-2xl max-h-[85vh] rounded-3xl bg-slate-900 border border-white/10 shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Course Glossary</h3>
              <p className="text-xs text-slate-400">Verbatim technical terms and system design definitions</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filter */}
        <div className="p-4 bg-slate-950/60 border-b border-white/5 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search terms (e.g., ReAct, RAG, Latency, Guardrails)..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-[11px] font-mono capitalize transition ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'bg-white/5 text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Glossary Terms List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs">
              No matching definitions found for "{searchTerm}".
            </div>
          ) : (
            filtered.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 transition space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-xs">{item.term}</span>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/5 text-indigo-400">
                    {item.category}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{item.definition}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export const GlossaryTooltip: React.FC<{
  term: string;
  children: React.ReactNode;
}> = ({ term, children }) => {
  const [show, setShow] = useState(false);
  const glossary = getGlossaryList();
  const item = glossary.find(g => g.term.toLowerCase() === term.toLowerCase());

  if (!item) return <>{children}</>;

  return (
    <span
      className="relative inline-block border-b border-dotted border-indigo-400 cursor-help"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 rounded-2xl bg-slate-900 border border-white/10 shadow-2xl text-[11px] text-slate-200 z-50 animate-fade-in pointer-events-none block leading-relaxed">
          <strong className="text-indigo-400 block mb-1 font-semibold">{item.term}</strong>
          {item.definition}
        </span>
      )}
    </span>
  );
};
