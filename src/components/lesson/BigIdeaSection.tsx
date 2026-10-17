import React, { useState } from 'react';
import { Lightbulb, ToggleLeft, ToggleRight, Sparkles } from 'lucide-react';
import { RichGlossaryText } from '../shared/GlossaryTooltip';

interface BigIdeaSectionProps {
  content: string;
  accentColor: string;
}

export const BigIdeaSection: React.FC<BigIdeaSectionProps> = ({ content, accentColor }) => {
  const [showPlainEnglishOnly, setShowPlainEnglishOnly] = useState(false);

  // Split into formal definition and plain English callout
  const parts = content.split('> **In Plain English:**');
  const formalText = parts[0]?.trim() || '';
  const plainText = parts[1]?.trim() || '';

  return (
    <section className="relative rounded-3xl border border-slate-700/80 bg-gradient-to-br from-slate-900/90 to-slate-950/90 p-6 md:p-8 backdrop-blur-xl shadow-2xl my-6 overflow-hidden">
      <div
        className="absolute -top-24 -right-24 w-60 h-60 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: accentColor }}
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <span
          className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border w-fit"
          style={{
            backgroundColor: `${accentColor}15`,
            borderColor: `${accentColor}40`,
            color: accentColor,
          }}
        >
          Beat 2 • The Big Idea
        </span>

        {plainText && (
          <button
            type="button"
            onClick={() => setShowPlainEnglishOnly(!showPlainEnglishOnly)}
            className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 px-3 py-1.5 rounded-xl border border-slate-700 transition-colors w-fit"
          >
            {showPlainEnglishOnly ? (
              <ToggleRight size={18} className="text-emerald-400" />
            ) : (
              <ToggleLeft size={18} className="text-slate-400" />
            )}
            <span>In Plain English View</span>
          </button>
        )}
      </div>

      {!showPlainEnglishOnly ? (
        <div className="text-sm md:text-base text-slate-200 leading-relaxed font-sans mb-4">
          <RichGlossaryText text={formalText} />
        </div>
      ) : null}

      {plainText && (
        <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 text-xs md:text-sm text-indigo-200 leading-relaxed flex items-start gap-3">
          <Lightbulb size={20} className="text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-indigo-300 font-semibold block mb-0.5">In Plain English:</strong>
            <RichGlossaryText text={plainText} />
          </div>
        </div>
      )}
    </section>
  );
};
