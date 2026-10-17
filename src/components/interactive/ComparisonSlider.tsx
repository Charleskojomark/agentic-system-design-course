import React, { useState } from 'react';
import { Calculator, UserCheck, MoveHorizontal } from 'lucide-react';

export const ComparisonSlider: React.FC = () => {
  const [sliderPos, setSliderPos] = useState<number>(50);

  return (
    <div className="rounded-3xl border border-slate-700/80 bg-slate-900/60 p-6 md:p-8 backdrop-blur-xl shadow-xl my-6">
      <div className="mb-4">
        <span className="text-xs uppercase tracking-wider font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-md border border-indigo-500/20">
          Interactive Comparison Slider
        </span>
        <h3 className="text-lg md:text-xl font-bold text-slate-100 mt-2">
          AI Model (Passive Calculator) vs. AI Agent (Active Assistant)
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Drag the slider left or right to inspect the contrasting system properties.
        </p>
      </div>

      {/* Slider Container */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 min-h-[300px] select-none">
        {/* Model Side (Left background) */}
        <div className="absolute inset-0 p-6 flex flex-col justify-between bg-gradient-to-br from-slate-900 to-slate-950">
          <div className="max-w-[45%]">
            <div className="w-10 h-10 rounded-xl bg-slate-800 text-slate-300 flex items-center justify-center mb-3">
              <Calculator size={20} />
            </div>
            <h4 className="text-base font-bold text-slate-200">AI Model</h4>
            <span className="text-xs text-slate-400 font-medium">The Calculator Metaphor</span>

            <ul className="mt-4 space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                <strong>Scope:</strong> Narrow, single-turn task
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                <strong>Role:</strong> Computes output from input
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                <strong>Initiative:</strong> Passive — waits for query
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                <strong>Tool Use:</strong> None (isolated weights)
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                <strong>Context:</strong> Limited to inference window
              </li>
            </ul>
          </div>
        </div>

        {/* Agent Side (Right clipped overlay) */}
        <div
          className="absolute inset-0 p-6 flex flex-col justify-between bg-gradient-to-br from-indigo-950/90 to-purple-950/90 border-l border-indigo-400/50"
          style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
        >
          <div className="ml-auto max-w-[45%] text-right">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center mb-3 ml-auto">
              <UserCheck size={20} />
            </div>
            <h4 className="text-base font-bold text-indigo-200">AI Agent</h4>
            <span className="text-xs text-indigo-300 font-medium">The Personal Assistant Metaphor</span>

            <ul className="mt-4 space-y-2 text-xs text-indigo-100">
              <li className="flex items-center justify-end gap-1.5">
                <strong>Scope:</strong> Broad, multi-step goal system
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              </li>
              <li className="flex items-center justify-end gap-1.5">
                <strong>Role:</strong> Chooses actions in pursuit of goals
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              </li>
              <li className="flex items-center justify-end gap-1.5">
                <strong>Initiative:</strong> Active — operates autonomously
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              </li>
              <li className="flex items-center justify-end gap-1.5">
                <strong>Tool Use:</strong> Invokes APIs, SQL & tools
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              </li>
              <li className="flex items-center justify-end gap-1.5">
                <strong>Context:</strong> Persists state across memory
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              </li>
            </ul>
          </div>
        </div>

        {/* Divider Bar & Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-indigo-400 cursor-ew-resize flex items-center justify-center -translate-x-1/2"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg border-2 border-white text-xs">
            <MoveHorizontal size={14} />
          </div>
        </div>
      </div>

      {/* Manual Range Input */}
      <div className="mt-4 flex items-center gap-4">
        <span className="text-xs font-semibold text-slate-400">AI Model Focus</span>
        <input
          type="range"
          min={15}
          max={85}
          value={sliderPos}
          onChange={(e) => setSliderPos(Number(e.target.value))}
          className="w-full accent-indigo-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
          aria-label="Comparison slider"
        />
        <span className="text-xs font-semibold text-indigo-400">AI Agent Focus</span>
      </div>
    </div>
  );
};
