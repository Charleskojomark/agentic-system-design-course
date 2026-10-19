import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Zap,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Sliders,
  Cpu,
  Layers,
  Award,
  Terminal,
  Activity,
  Code2
} from 'lucide-react';

export const EurekaEvolutionLoopVisualizer: React.FC = () => {
  const [generation, setGeneration] = useState<number>(1);
  const [selectedCandidate, setSelectedCandidate] = useState<number>(3);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [penRotation, setPenRotation] = useState<number>(0);

  // Pen spinning animation simulator
  useEffect(() => {
    let animId: number;
    if (isPlaying) {
      animId = window.setInterval(() => {
        setPenRotation(prev => (prev + (generation === 1 ? 14 : 7)) % 360);
      }, 30);
    }
    return () => clearInterval(animId);
  }, [isPlaying, generation]);

  const candidatesData: Record<number, { id: number; name: string; fitness: number; status: 'winner' | 'ok' | 'failed'; terms: string; notes: string }[]> = {
    1: [
      { id: 1, name: 'Candidate 1', fitness: 12.4, status: 'ok', terms: 'linear_vel + 0.1 * rot', notes: 'Sluggish rotation, pen slips' },
      { id: 2, name: 'Candidate 2', fitness: 4.2, status: 'failed', terms: 'rot_speed - 10 * jerk', notes: 'Overly conservative, zero movement' },
      { id: 3, name: 'Candidate 3', fitness: 24.8, status: 'winner', terms: '5.0 * rot_prog - 2.0 * drop', notes: 'Fast but jerky; high score with occasional drops' },
      { id: 4, name: 'Candidate 4', fitness: -5.1, status: 'failed', terms: 'exp(orient_error)', notes: 'Exploding gradients in simulator' },
    ],
    2: [
      { id: 1, name: 'Candidate 1', fitness: 31.2, status: 'ok', terms: 'Candidate 3 + wrist_angle_pen', notes: 'Reduced drops, still slightly jerky' },
      { id: 2, name: 'Candidate 2', fitness: 48.6, status: 'winner', terms: 'Rescaled rot_prog + tanh(jerk)', notes: 'Smooth rotation, upright hand posture' },
      { id: 3, name: 'Candidate 3', fitness: 28.0, status: 'ok', terms: 'Exp decay on pen orientation', notes: 'Good alignment, lower velocity' },
      { id: 4, name: 'Candidate 4', fitness: 15.3, status: 'ok', terms: 'Added torque penalty', notes: 'Over-damped finger flexion' },
    ],
    3: [
      { id: 1, name: 'Candidate 1', fitness: 62.4, status: 'ok', terms: 'Fine-tuned temperature = 0.2', notes: 'High precision dexterity' },
      { id: 2, name: 'Candidate 2', fitness: 76.9, status: 'winner', terms: 'Eureka Evolved: Multi-axis stability', notes: 'Superhuman Dexterity: Continuous pen spin, zero drops (+52% vs Human)' },
      { id: 3, name: 'Candidate 3', fitness: 58.1, status: 'ok', terms: 'Rhythmic torque oscillation', notes: 'Graceful manipulation' },
      { id: 4, name: 'Candidate 4', fitness: 54.3, status: 'ok', terms: 'Adaptive coordinate penalty', notes: 'Balanced trajectory' },
    ],
  };

  const currentCandidates = candidatesData[generation] || candidatesData[1];
  const activeCandidate = currentCandidates.find(c => c.id === selectedCandidate) || currentCandidates[0];

  return (
    <div className="rounded-3xl bg-slate-900/90 border border-teal-500/20 p-5 sm:p-7 shadow-2xl backdrop-blur-xl space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 font-bold">
            🧬
          </div>
          <div>
            <h4 className="font-bold text-white text-sm sm:text-base">
              Eureka Evolutionary Loop & Dexterity Simulator
            </h4>
            <p className="text-[11px] sm:text-xs text-slate-400">
              Multi-sampling 16 reward candidates evaluated in Isaac Gym parallel simulation
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {[1, 2, 3].map(gen => (
            <button
              key={gen}
              onClick={() => {
                setGeneration(gen);
                setSelectedCandidate(gen === 1 ? 3 : 2);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition border ${
                generation === gen
                  ? 'bg-teal-500/20 text-teal-300 border-teal-500/50 shadow-md ring-1 ring-teal-400/30'
                  : 'bg-white/[0.03] text-slate-400 border-white/10 hover:text-white'
              }`}
            >
              Iteration 0{gen}
            </button>
          ))}
        </div>
      </div>

      {/* Main Split: Dexterity Robot Rollout Simulator vs Multi-Sample Candidate Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Shadow Hand & Pen Spinning Visualizer */}
        <div className="lg:col-span-5 p-4 rounded-2xl bg-black/50 border border-white/10 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-teal-400 font-bold flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-teal-400" /> Shadow Hand Rollout
            </span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
              generation === 3 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300'
            }`}>
              {generation === 1 ? 'Zero-Shot (Rough)' : generation === 2 ? 'Mutated (Balanced)' : 'Eureka Mastered'}
            </span>
          </div>

          {/* SVG Animated Pen Spinning Hand */}
          <div className="relative h-48 w-full bg-slate-950/80 rounded-xl border border-white/5 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-radial from-teal-500/10 via-transparent to-transparent opacity-50" />
            
            {/* Robot Palm Base */}
            <svg width="220" height="180" viewBox="0 0 220 180" className="relative z-10">
              <rect x="60" y="110" width="100" height="50" rx="12" fill="#1e293b" stroke="#334155" strokeWidth="2" />
              <text x="110" y="140" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="monospace">ISAAC GYM GPU</text>
              
              {/* Fingers */}
              <line x1="75" y1="110" x2="70" y2="70" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round" />
              <line x1="95" y1="110" x2="95" y2="60" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round" />
              <line x1="115" y1="110" x2="115" y2="60" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round" />
              <line x1="135" y1="110" x2="140" y2="70" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round" />
              {/* Thumb */}
              <line x1="60" y1="130" x2="35" y2="105" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round" />

              {/* The Spinning Pen */}
              <g transform={`translate(110, 80) rotate(${penRotation})`}>
                <rect x="-45" y="-5" width="90" height="10" rx="4" fill="#f59e0b" stroke="#d97706" strokeWidth="1.5" />
                <rect x="-42" y="-3" width="16" height="6" rx="2" fill="#fbbf24" />
                <circle cx="0" cy="0" r="3" fill="#ffffff" />
                {generation === 1 && (
                  <circle cx="45" cy="0" r="5" fill="#ef4444" opacity="0.6" className="animate-ping" />
                )}
              </g>
            </svg>
          </div>

          <div className="flex items-center justify-between gap-2 pt-1">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex-1 py-2 px-3 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 font-bold text-xs flex items-center justify-center gap-1.5 border border-teal-500/30 transition shadow-sm"
            >
              {isPlaying ? <RotateCcw className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Pause Rollout' : 'Simulate Rollout'}</span>
            </button>
            <div className="text-right">
              <div className="text-[10px] text-slate-400 font-mono">Policy Fitness</div>
              <div className="text-sm font-bold text-teal-300 font-mono">
                {activeCandidate.fitness > 0 ? `+${activeCandidate.fitness}` : activeCandidate.fitness}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Multi-Sample Candidates & In-Context Mutation Inspector */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">Generation {generation} Candidate Population (K=4 Sampled)</span>
            <span className="text-teal-400 font-bold">PPO Fitness F(π)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {currentCandidates.map(c => {
              const isSelected = selectedCandidate === c.id;
              const isWinner = c.status === 'winner';

              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedCandidate(c.id)}
                  className={`p-3 rounded-xl text-left border transition-all ${
                    isSelected
                      ? 'bg-teal-500/15 border-teal-500 text-white shadow-lg ring-1 ring-teal-500/30'
                      : isWinner
                      ? 'bg-emerald-950/20 border-emerald-500/30 text-slate-300 hover:bg-emerald-950/30'
                      : 'bg-white/[0.02] border-white/5 text-slate-400 hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold font-mono text-white flex items-center gap-1.5">
                      {c.name}
                      {isWinner && (
                        <span className="px-1.5 py-0.2 rounded text-[9px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          Parent ★
                        </span>
                      )}
                    </span>
                    <span className={`text-xs font-mono font-bold ${
                      c.fitness >= 50 ? 'text-emerald-400' : c.fitness > 0 ? 'text-teal-300' : 'text-rose-400'
                    }`}>
                      {c.fitness > 0 ? `+${c.fitness}` : c.fitness}
                    </span>
                  </div>

                  <div className="text-[11px] font-mono text-slate-300 truncate bg-black/40 px-2 py-1 rounded">
                    {c.terms}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1.5 truncate">
                    {c.notes}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Candidate Deep Dive */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-white/10 space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-300 border-b border-white/5 pb-2">
              <span className="font-semibold text-teal-300 flex items-center gap-1">
                <Code2 className="w-3.5 h-3.5" /> {activeCandidate.name} Logic & Diagnostics
              </span>
              <span className="font-mono text-[11px] text-slate-400">
                Formula: {activeCandidate.terms}
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              <strong>Behavioral Analysis:</strong> {activeCandidate.notes}. In Eureka's closed-loop, if a candidate drops the pen or triggers erratic torque spikes, the reflection agent summarizes training epochs into a textual prompt, prompting the coding LLM to alter temperature parameters and rescale component magnitudes in Generation 0{generation < 3 ? generation + 1 : generation}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const EurekaReflectionDiagnostic: React.FC = () => {
  const [rotationProg, setRotationProg] = useState<number>(4.8);
  const [penDropPenalty, setPenDropPenalty] = useState<number>(-2.0);
  const [wristJerk, setWristJerk] = useState<number>(-8.5);
  const [anglePenalty, setAnglePenalty] = useState<number>(0.5);

  const totalReward = (rotationProg + penDropPenalty + wristJerk + anglePenalty).toFixed(1);
  const isDominantJerk = Math.abs(wristJerk) > rotationProg * 1.5;

  return (
    <div className="rounded-3xl bg-slate-900/90 border border-white/10 p-5 sm:p-7 shadow-2xl backdrop-blur-xl space-y-6 animate-fade-in">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-white text-sm sm:text-base">
              Reward Reflection & Credit Assignment Sandbox
            </h4>
            <p className="text-[11px] sm:text-xs text-slate-400">
              Eureka exposes individual terms as a dictionary to prevent scalar collapse
            </p>
          </div>
        </div>

        <div className="text-right">
          <div className="text-[10px] font-mono text-slate-400">Collapsed Scalar</div>
          <div className={`text-base font-bold font-mono ${Number(totalReward) > 0 ? 'text-teal-300' : 'text-rose-400'}`}>
            {totalReward}
          </div>
        </div>
      </div>

      {/* Component Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 space-y-2">
          <div className="flex justify-between text-xs">
            <span className="font-semibold text-emerald-400">Rotation Progress Term</span>
            <span className="font-mono text-slate-300">+{rotationProg}</span>
          </div>
          <input
            type="range"
            min="0"
            max="10"
            step="0.5"
            value={rotationProg}
            onChange={e => setRotationProg(parseFloat(e.target.value))}
            className="w-full accent-emerald-400 cursor-pointer"
          />
          <div className="text-[10px] text-slate-400">Encourages continuous rotation along target axis</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 space-y-2">
          <div className="flex justify-between text-xs">
            <span className="font-semibold text-rose-400">Pen Dropped Penalty</span>
            <span className="font-mono text-slate-300">{penDropPenalty}</span>
          </div>
          <input
            type="range"
            min="-10"
            max="0"
            step="0.5"
            value={penDropPenalty}
            onChange={e => setPenDropPenalty(parseFloat(e.target.value))}
            className="w-full accent-rose-400 cursor-pointer"
          />
          <div className="text-[10px] text-slate-400">Negative terminal signal if object leaves contact boundary</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 space-y-2">
          <div className="flex justify-between text-xs">
            <span className="font-semibold text-amber-400">Wrist Jerk Penalty</span>
            <span className="font-mono text-slate-300">{wristJerk}</span>
          </div>
          <input
            type="range"
            min="-15"
            max="0"
            step="0.5"
            value={wristJerk}
            onChange={e => setWristJerk(parseFloat(e.target.value))}
            className="w-full accent-amber-400 cursor-pointer"
          />
          <div className="text-[10px] text-slate-400">Dampens high-frequency actuator oscillations</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 space-y-2">
          <div className="flex justify-between text-xs">
            <span className="font-semibold text-cyan-400">Safe Wrist Angle Bonus</span>
            <span className="font-mono text-slate-300">+{anglePenalty}</span>
          </div>
          <input
            type="range"
            min="0"
            max="5"
            step="0.5"
            value={anglePenalty}
            onChange={e => setAnglePenalty(parseFloat(e.target.value))}
            className="w-full accent-cyan-400 cursor-pointer"
          />
          <div className="text-[10px] text-slate-400">Prevents hyper-extension of joints</div>
        </div>
      </div>

      {/* Generated LLM Reflection Feedback Prompt */}
      <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-indigo-400 font-bold flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-indigo-400" /> Automated Reflection Signal Generated for LLM
          </span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${isDominantJerk ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-emerald-500/20 text-emerald-300'}`}>
            {isDominantJerk ? 'Rule 3 Triggered: Rescale Needed' : 'Component Weights Balanced'}
          </span>
        </div>

        <pre className="text-[11px] font-mono text-slate-300 bg-black/60 p-3 rounded-xl overflow-x-auto leading-relaxed border border-white/5">
{`We trained an RL policy using the reward code. Component statistics across epochs:
- rotation_progress : max = +${rotationProg}, mean = +${(rotationProg * 0.6).toFixed(1)}, min = 0.0
- pen_dropped       : min = ${penDropPenalty}, mean = ${(penDropPenalty * 0.3).toFixed(1)}
- wrist_jerk        : min = ${wristJerk}, mean = ${(wristJerk * 0.7).toFixed(1)} (Magnitude Dominant!)
- safe_wrist_angle  : mean = +${anglePenalty}

${isDominantJerk ? `[REFLECTION ADVICE TO LLM]:
Rule (3) triggered: 'wrist_jerk' magnitude (${Math.abs(wristJerk)}) is disproportionately suppressing learning. 
Rescale the temperature parameter or apply a tanh() dampening envelope so the agent does not freeze.` : `[REFLECTION ADVICE TO LLM]:
Success rate is positive. Explore fine-tuning temperature to encourage higher angular velocity while maintaining upright stability.`}`}
        </pre>
      </div>
    </div>
  );
};
