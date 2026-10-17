import React, { useState } from 'react';
import { Scale, AlertTriangle, ShieldCheck, Clock, UserX } from 'lucide-react';

export const SafetyUtilitySlider: React.FC = () => {
  const [sliderVal, setSliderVal] = useState<number>(50); // 0 (Max Utility) to 100 (Max Strictness)

  // Calculations derived from course text
  const overblockingRate = Math.round((sliderVal / 100) * 35);
  const underblockingRate = Math.round(((100 - sliderVal) / 100) * 40);
  const latencyMs = 120 + Math.round((sliderVal / 100) * 1400);

  return (
    <div className="rounded-3xl border border-slate-700/80 bg-slate-900/60 p-6 md:p-8 backdrop-blur-xl shadow-xl my-6">
      <div className="mb-4">
        <span className="text-xs uppercase tracking-wider font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-md border border-cyan-500/20">
          Interactive Trade-off Simulator
        </span>
        <h3 className="text-lg md:text-xl font-bold text-slate-100 mt-2">
          Safety vs. Utility Equilibrium
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Drag the slider to observe how guardrail strictness directly impacts false positives, latency, and user friction.
        </p>
      </div>

      {/* Slider Control */}
      <div className="my-6 p-5 rounded-2xl bg-slate-950 border border-slate-800">
        <div className="flex items-center justify-between text-xs font-semibold mb-2">
          <span className="text-emerald-400 flex items-center gap-1">
            Permissive / Max Utility
          </span>
          <span className="text-slate-400 font-mono">Strictness Level: {sliderVal}%</span>
          <span className="text-rose-400 flex items-center gap-1">
            Ultra-Strict Guardrails
          </span>
        </div>

        <input
          type="range"
          min={0}
          max={100}
          value={sliderVal}
          onChange={(e) => setSliderVal(Number(e.target.value))}
          className="w-full accent-cyan-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
          aria-label="Safety utility slider"
        />
      </div>

      {/* Real-Time Metrics Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>False Positives (Over-blocking):</span>
            <UserX size={15} className="text-rose-400" />
          </div>
          <div className="text-lg font-bold text-slate-100 font-mono">{overblockingRate}%</div>
          <p className="text-[11px] text-slate-400 mt-1">
            Harmless legitimate requests wrongly rejected by aggressive filters.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Vulnerability Risk (Under-blocking):</span>
            <AlertTriangle size={15} className="text-amber-400" />
          </div>
          <div className="text-lg font-bold text-slate-100 font-mono">{underblockingRate}%</div>
          <p className="text-[11px] text-slate-400 mt-1">
            Chance an adversarial prompt injection or sensitive PII slips through.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Inspection Latency:</span>
            <Clock size={15} className="text-cyan-400" />
          </div>
          <div className="text-lg font-bold text-slate-100 font-mono">{latencyMs} ms</div>
          <p className="text-[11px] text-slate-400 mt-1">
            Total latency added by multi-layered filter and classification checks.
          </p>
        </div>
      </div>
    </div>
  );
};
