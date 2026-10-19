import React, { useState } from 'react';
import { 
  Palette, 
  Layers, 
  Sparkles, 
  Eye, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  Sliders, 
  Split, 
  ArrowRight,
  ShieldCheck,
  Maximize2
} from 'lucide-react';

export const MuLanProgressiveDiffusionSimulator: React.FC = () => {
  const [currentStage, setCurrentStage] = useState<number>(1);
  const [criticEnabled, setCriticEnabled] = useState<boolean>(true);
  const [simulatedError, setSimulatedError] = useState<boolean>(false);
  const [isRetrying, setIsRetrying] = useState<boolean>(false);
  const [humanAdjustment, setHumanAdjustment] = useState<string>('none');

  const stages = [
    {
      num: 1,
      name: 'Stage 1: Small Green Pyramid',
      subPrompt: 'A small green pyramid on a reflective metal floor',
      roughMask: { x: '15%', y: '45%', w: '25%', h: '35%' },
      color: '#10b981',
      shape: 'Pyramid',
      spatialNote: 'Sorted first: leftmost object on floor'
    },
    {
      num: 2,
      name: 'Stage 2: Wide Blue Cylinder',
      subPrompt: 'A wide blue cylinder to the right of the green pyramid',
      roughMask: { x: '50%', y: '40%', w: '35%', h: '45%' },
      color: simulatedError ? '#eab308' : '#3b82f6', // Error: yellow instead of blue
      shape: 'Cylinder',
      spatialNote: 'Positioned right of Stage 1 with 20% overlap'
    },
    {
      num: 3,
      name: 'Stage 3: Red Cube on Top',
      subPrompt: 'A red cube on top of the blue cylinder',
      roughMask: { x: '55%', y: '15%', w: '25%', h: '25%' },
      color: humanAdjustment === 'purple-crown' ? '#a855f7' : '#ef4444',
      shape: humanAdjustment === 'purple-crown' ? 'Crown' : 'Cube',
      spatialNote: 'Stacked on top of the cylinder'
    }
  ];

  const handleCriticCorrection = () => {
    setIsRetrying(true);
    setTimeout(() => {
      setSimulatedError(false);
      setIsRetrying(false);
    }, 800);
  };

  const activeStageData = stages[currentStage - 1];

  return (
    <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-fuchsia-500/30 backdrop-blur-xl shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-fuchsia-500/20 text-fuchsia-400 font-mono text-[11px] font-bold border border-fuchsia-500/30">
              SIMULATOR 01
            </span>
            <span className="text-xs text-slate-400 uppercase tracking-widest font-mono">
              Progressive Multi-Object Diffusion
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Palette className="w-5 h-5 text-fuchsia-400" />
            MuLan Progressive Diffusion & VLM Feedback Control
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
            Watch the agent paint objects sequentially (left-to-right, bottom-to-top), steer latents with rough masks and backward guidance, and trigger LLaVA-1.5 self-correction critics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setCurrentStage(1);
              setSimulatedError(false);
              setHumanAdjustment('none');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/10 border border-white/10 text-xs text-slate-300 font-mono transition"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset Canvas
          </button>
        </div>
      </div>

      {/* Stage Progress Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {stages.map((st) => (
          <button
            key={st.num}
            onClick={() => setCurrentStage(st.num)}
            className={`p-3.5 rounded-2xl border text-left transition ${
              currentStage === st.num
                ? 'bg-fuchsia-950/40 border-fuchsia-400 shadow-md shadow-fuchsia-500/10'
                : currentStage > st.num
                ? 'bg-emerald-950/20 border-emerald-500/30 text-slate-300'
                : 'bg-white/[0.02] border-white/5 text-slate-500'
            }`}
          >
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="font-bold">STAGE 0{st.num}</span>
              {currentStage > st.num ? (
                <span className="text-emerald-400 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Painted</span>
              ) : currentStage === st.num ? (
                <span className="text-fuchsia-400 animate-pulse font-bold">Active Brush</span>
              ) : (
                <span>Pending</span>
              )}
            </div>
            <div className="text-xs font-bold text-white mt-1 truncate">{st.name}</div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Interactive Canvas with Rough Mask & Latent Steering */}
        <div className="lg:col-span-7 space-y-3">
          <div className="p-3 bg-slate-950 rounded-2xl border border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="flex items-center gap-2 text-slate-300">
              <span className="w-3 h-3 rounded-full bg-fuchsia-500/80 inline-block" />
              Progressive Canvas (Stage {currentStage} of 3)
            </span>
            <span className="text-fuchsia-400">Resolution: 512x512 Latents</span>
          </div>

          <div className="relative aspect-video rounded-3xl overflow-hidden border border-fuchsia-500/30 bg-[#060a12] shadow-inner p-4 flex flex-col justify-between">
            {/* Background Floor */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1d] via-[#111827] to-[#1f2937] opacity-90" />
            <div className="absolute bottom-0 inset-x-0 h-1/3 bg-slate-800/40 border-t border-slate-600/30 backdrop-blur-sm" />

            {/* Stage 1 Object (always rendered if stage >= 1) */}
            {currentStage >= 1 && (
              <div
                style={{ left: '15%', top: '45%', width: '25%', height: '35%' }}
                className="absolute flex items-center justify-center transition-all duration-500"
              >
                <div className="w-0 h-0 border-l-[45px] border-l-transparent border-r-[45px] border-r-transparent border-b-[80px] border-b-emerald-500 shadow-2xl drop-shadow-[0_10px_10px_rgba(16,185,129,0.3)]" />
              </div>
            )}

            {/* Stage 2 Object (rendered if stage >= 2) */}
            {currentStage >= 2 && (
              <div
                style={{ left: '50%', top: '40%', width: '35%', height: '45%' }}
                className="absolute flex items-center justify-center transition-all duration-500"
              >
                <div
                  style={{ backgroundColor: simulatedError ? '#eab308' : '#3b82f6' }}
                  className="w-28 h-32 rounded-3xl shadow-2xl transition-colors duration-500 border border-white/20"
                />
              </div>
            )}

            {/* Stage 3 Object (rendered if stage >= 3) */}
            {currentStage >= 3 && (
              <div
                style={{ left: '55%', top: '15%', width: '25%', height: '25%' }}
                className="absolute flex items-center justify-center transition-all duration-500"
              >
                <div
                  style={{ backgroundColor: humanAdjustment === 'purple-crown' ? '#a855f7' : '#ef4444' }}
                  className="w-16 h-16 rounded-xl shadow-2xl border border-white/20"
                />
              </div>
            )}

            {/* Rough Mask Outline (for active stage) */}
            <div
              style={{
                position: 'absolute',
                left: activeStageData.roughMask.x,
                top: activeStageData.roughMask.y,
                width: activeStageData.roughMask.w,
                height: activeStageData.roughMask.h,
              }}
              className="border-2 border-dashed border-fuchsia-400 bg-fuchsia-500/10 rounded-2xl pointer-events-none flex items-start justify-start p-1.5 transition-all duration-300"
            >
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-fuchsia-600 text-white font-bold">
                Rough Mask #{currentStage}
              </span>
            </div>

            <div className="relative z-10 text-[11px] font-mono text-slate-300 bg-black/70 p-2.5 rounded-xl border border-white/10 flex items-center justify-between">
              <span>Sub-Prompt: "{activeStageData.subPrompt}"</span>
              <span className="text-fuchsia-400 font-bold">{activeStageData.spatialNote}</span>
            </div>
          </div>

          {/* Human-in-the-Loop Interventions Bar */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="text-fuchsia-300 font-bold flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5" /> Human-in-the-Loop Steering Controls
              </span>
              <span className="text-[10px] text-slate-500">Mid-Generation Checkpoints</span>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              <button
                onClick={() => setHumanAdjustment('purple-crown')}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition ${
                  humanAdjustment === 'purple-crown'
                    ? 'bg-purple-600 text-white border-purple-400'
                    : 'bg-white/[0.04] text-slate-400 hover:text-white border-white/10'
                }`}
              >
                👑 Object Swap: Crown instead of Cube
              </button>
              <button
                onClick={() => setSimulatedError(true)}
                className="px-3 py-1.5 rounded-xl text-xs font-medium border border-amber-500/40 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 transition"
              >
                ⚠️ Inject Attribute Error (Yellow Cylinder)
              </button>
            </div>
          </div>
        </div>

        {/* Right: VLM Critic & Self-Correction Inspector */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 rounded-3xl bg-slate-950/80 border border-white/10 space-y-3 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-fuchsia-400 uppercase tracking-wider">
                <Eye className="w-4 h-4 text-fuchsia-400" /> VLM Critic (LLaVA-1.5)
              </div>
              <button
                onClick={() => setCriticEnabled(!criticEnabled)}
                className={`text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold border transition ${
                  criticEnabled
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                    : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                }`}
              >
                {criticEnabled ? 'Critic Active' : 'Critic Disabled'}
              </button>
            </div>

            {simulatedError ? (
              <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-500/40 space-y-2 text-xs text-amber-200">
                <div className="flex items-center gap-2 font-bold text-amber-300">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  Attribute Binding Violation Detected!
                </div>
                <p className="text-[11px] leading-relaxed text-amber-200/90">
                  LLaVA-1.5 evaluated Stage 2 against prompt: Expected "wide blue cylinder", but perceived yellow attribute binding. Triggering backward guidance scale adjustment.
                </p>
                <button
                  onClick={handleCriticCorrection}
                  disabled={isRetrying}
                  className="w-full py-2 px-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs transition flex items-center justify-center gap-2"
                >
                  {isRetrying ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Adjusting Hyperparameters & Re-generating...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-3.5 h-3.5" /> Execute VLM Self-Correction Re-generation
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-2 text-xs text-emerald-300">
                <div className="flex items-center gap-2 font-bold text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  Stage Alignment Verified
                </div>
                <div className="text-[11px] text-slate-300 space-y-1 font-mono">
                  <div>• Object Presence: 100%</div>
                  <div>• Attribute Binding: Verified Correct</div>
                  <div>• Spatial Hierarchy: Left-to-Right Consistent</div>
                </div>
              </div>
            )}

            {/* Overlap Candidate Selector via CLIP */}
            <div className="pt-2 border-t border-white/10 space-y-2">
              <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 font-bold flex items-center justify-between">
                <span>Fast Critic: CLIP Overlap Selector</span>
                <span className="text-sky-400">Candidate #2 Selected</span>
              </span>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 1, overlap: '10% Overlap', score: '0.28' },
                  { id: 2, overlap: '30% Overlap', score: '0.36 (Winner)' },
                  { id: 3, overlap: '50% Overlap', score: '0.24' }
                ].map(c => (
                  <div
                    key={c.id}
                    className={`p-2 rounded-xl text-center text-[10px] font-mono border ${
                      c.id === 2
                        ? 'bg-sky-500/20 border-sky-400 text-sky-300 font-bold'
                        : 'bg-white/[0.02] border-white/5 text-slate-500'
                    }`}
                  >
                    <div>{c.overlap}</div>
                    <div className="text-[9px] mt-0.5">CLIP: {c.score}</div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setCurrentStage(prev => (prev % 3) + 1)}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-fuchsia-600 to-indigo-600 hover:from-fuchsia-500 hover:to-indigo-500 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-lg shadow-fuchsia-500/20"
            >
              <span>Advance to Stage {(currentStage % 3) + 1}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CompositionalBenchmarkVisualizer: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState<string>('mulan-sdxl');

  const methods: Record<string, { name: string; completeness: string; attributes: string; spatial: string; overall: string; humanOverall: string; latency: string }> = {
    'sd-v14': {
      name: 'Stable Diffusion v1.4 (One-Shot)',
      completeness: '90.31%',
      attributes: '57.14%',
      spatial: '37.24%',
      overall: '66.43%',
      humanOverall: '56.73%',
      latency: '2.4s'
    },
    'sdxl': {
      name: 'SDXL Base (One-Shot)',
      completeness: '94.64%',
      attributes: '66.07%',
      spatial: '41.14%',
      overall: '72.34%',
      humanOverall: '57.55%',
      latency: '4.8s'
    },
    'structure-diffusion': {
      name: 'Structure Diffusion (Controllable)',
      completeness: '88.98%',
      attributes: '54.62%',
      spatial: '34.36%',
      overall: '64.31%',
      humanOverall: '64.85%',
      latency: '6.2s'
    },
    'mulan-sdxl': {
      name: 'MuLan-SDXL (Multi-Step Agentic)',
      completeness: '96.17%',
      attributes: '75.00%',
      spatial: '39.29%',
      overall: '76.33%',
      humanOverall: '77.78%',
      latency: '18.6s'
    }
  };

  const current = methods[selectedMethod];

  return (
    <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-fuchsia-500/30 backdrop-blur-xl shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 font-mono text-[11px] font-bold border border-indigo-500/30">
              SIMULATOR 02
            </span>
            <span className="text-xs text-slate-400 uppercase tracking-widest font-mono">
              200-Hard-Prompt Benchmark
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Split className="w-5 h-5 text-indigo-400" />
            Compositional Benchmark: One-Shot vs. Agentic MuLan
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
            Inspect quantitative scores across Object Completeness, Attribute Bindings, and Spatial Relationships from the curated 200-prompt failure benchmark.
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/10 text-xs">
          {Object.entries(methods).map(([k, m]) => (
            <button
              key={k}
              onClick={() => setSelectedMethod(k)}
              className={`px-3 py-1.5 rounded-lg font-mono font-semibold transition ${
                selectedMethod === k
                  ? 'bg-fuchsia-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {k.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1.5">
          <div className="text-[10px] font-mono uppercase text-slate-400">Object Completeness</div>
          <div className="text-2xl font-bold font-mono text-emerald-400">{current.completeness}</div>
          <div className="text-[11px] text-slate-500">All prompt entities present</div>
        </div>

        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1.5">
          <div className="text-[10px] font-mono uppercase text-slate-400">Attribute Bindings</div>
          <div className="text-2xl font-bold font-mono text-fuchsia-400">{current.attributes}</div>
          <div className="text-[11px] text-slate-500">Correct color & texture pairings</div>
        </div>

        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1.5">
          <div className="text-[10px] font-mono uppercase text-slate-400">Spatial Relationships</div>
          <div className="text-2xl font-bold font-mono text-sky-400">{current.spatial}</div>
          <div className="text-[11px] text-slate-500">On top, to the left, relative depth</div>
        </div>

        <div className="p-4 rounded-2xl bg-fuchsia-950/30 border border-fuchsia-500/30 space-y-1.5">
          <div className="text-[10px] font-mono uppercase text-fuchsia-300 font-bold">Human-Evaluated Overall</div>
          <div className="text-2xl font-bold font-mono text-white">{current.humanOverall}</div>
          <div className="text-[11px] text-emerald-400 font-bold">
            {selectedMethod === 'mulan-sdxl' ? '+20.23% vs SDXL Base' : 'Baseline standard'}
          </div>
        </div>
      </div>

      {/* Ablation Callout */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-fuchsia-950/40 via-purple-950/30 to-slate-900 border border-fuchsia-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="space-y-0.5">
          <span className="font-mono text-fuchsia-400 font-bold uppercase">The VLM Critic Ablation Finding:</span>
          <p className="text-slate-300">
            Removing the LLaVA-1.5 feedback loop causes overall score to drop from <span className="text-emerald-400 font-bold">77.55% down to 60.00%</span>, proving that closed-loop critics are essential for multi-step generative reliability.
          </p>
        </div>
        <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 font-mono text-slate-400 shrink-0 text-right">
          Avg Wall-Clock: <span className="text-white font-bold">{current.latency}</span>
        </div>
      </div>
    </div>
  );
};
