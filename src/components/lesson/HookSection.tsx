import React from 'react';
import { HelpCircle, Sparkles } from 'lucide-react';

interface HookSectionProps {
  content: string;
  accentColor: string;
}

export const HookSection: React.FC<HookSectionProps> = ({ content, accentColor }) => {
  return (
    <section className="rounded-3xl border border-slate-700/80 bg-slate-900/60 p-6 md:p-8 backdrop-blur-xl shadow-xl my-6">
      <div className="flex items-center gap-2 mb-3">
        <span
          className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border"
          style={{
            backgroundColor: `${accentColor}15`,
            borderColor: `${accentColor}40`,
            color: accentColor,
          }}
        >
          Beat 1 • The Real-World Hook
        </span>
      </div>

      <div className="prose dark:prose-invert prose-base max-w-none text-slate-200 leading-relaxed font-sans whitespace-pre-line">
        {content}
      </div>
    </section>
  );
};
