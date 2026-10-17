import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, ChevronRight, Eye, Brain, Zap, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const StepThroughDiagram: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const { reducedMotion } = useTheme();

  const steps = [
    {
      id: 'perceive',
      title: '1. Perception',
      subtitle: 'Sensing the Environment',
      icon: Eye,
      color: '#6366f1',
      bgLight: 'bg-indigo-500/10',
      borderLight: 'border-indigo-500/30',
      example: 'Flight webhook alert: "Flight LH2230 cancelled due to weather."',
      description: 'The agent extracts meaningful signals from raw sensory input, text prompts, or API event streams.',
    },
    {
      id: 'reason',
      title: '2. Reasoning & Planning',
      subtitle: 'Processing & Decision-Making',
      icon: Brain,
      color: '#8b5cf6',
      bgLight: 'bg-purple-500/10',
      borderLight: 'border-purple-500/30',
      example: 'LLM reasoning: "Goal = reach Berlin tonight. Check high-speed ICE trains. Notify hotel."',
      description: 'The model breaks goals into subtasks, queries context, and formulates an actionable plan.',
    },
    {
      id: 'act',
      title: '3. Action Execution',
      subtitle: 'Performing Real-World Tasks',
      icon: Zap,
      color: '#10b981',
      bgLight: 'bg-emerald-500/10',
      borderLight: 'border-emerald-500/30',
      example: 'API Calls: TrainBooking.reserve(train=ICE704) & HotelAPI.sendLateCheckin()',
      description: 'The agent executes tool actions, updating external systems, sending messages, or triggering APIs.',
    },
  ];

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 2400);
    return () => clearInterval(timer);
  }, [isPlaying, steps.length]);

  return (
    <div className="rounded-3xl border border-indigo-500/20 bg-slate-900/60 dark:bg-slate-950/70 p-6 md:p-8 backdrop-blur-xl shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs uppercase tracking-wider font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-md border border-indigo-500/20">
            Interactive Agent Loop Simulator
          </span>
          <h3 className="text-lg md:text-xl font-bold text-slate-100 mt-2">
            The Perceive → Reason → Act Cycle
          </h3>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md active:scale-95"
            aria-label={isPlaying ? 'Pause simulation' : 'Play simulation'}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            {isPlaying ? 'Pause' : 'Play Loop'}
          </button>

          <button
            type="button"
            onClick={() => {
              setIsPlaying(false);
              setCurrentStep((prev) => (prev + 1) % steps.length);
            }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all active:scale-95"
            aria-label="Step forward"
          >
            <ChevronRight size={14} />
            Step
          </button>

          <button
            type="button"
            onClick={() => {
              setIsPlaying(false);
              setCurrentStep(0);
            }}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-200 bg-slate-800/80 hover:bg-slate-700 transition-all active:scale-95"
            aria-label="Reset simulation"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Visual SVG Ring / Node Pipeline */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          const isActive = currentStep === idx;

          return (
            <div
              key={s.id}
              onClick={() => {
                setIsPlaying(false);
                setCurrentStep(idx);
              }}
              className={`cursor-pointer rounded-2xl p-5 border transition-all duration-300 relative overflow-hidden ${
                isActive
                  ? `${s.bgLight} ${s.borderLight} ring-2 ring-indigo-500/50 shadow-lg scale-[1.02]`
                  : 'bg-slate-800/40 border-slate-800/80 hover:border-slate-700 opacity-70 hover:opacity-100'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors shadow-inner"
                  style={{
                    backgroundColor: isActive ? s.color : '#334155',
                    color: '#ffffff',
                  }}
                >
                  <Icon size={20} />
                </div>
                {isActive && (
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Active Stage
                  </span>
                )}
              </div>

              <h4 className="text-base font-bold text-slate-100">{s.title}</h4>
              <p className="text-xs text-slate-400 mt-0.5">{s.subtitle}</p>

              <div className="mt-4 pt-3 border-t border-slate-800/60 text-xs">
                <span className="text-slate-400 block mb-1">Live Telemetry:</span>
                <code className="block bg-slate-950/70 p-2 rounded-lg text-slate-300 font-mono text-[11px] break-all border border-slate-800">
                  {s.example}
                </code>
              </div>
            </div>
          );
        })}
      </div>

      {/* Explanatory Banner */}
      <div className="mt-4 p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 flex items-start gap-3">
        <CheckCircle2 size={18} className="text-indigo-400 shrink-0 mt-0.5" />
        <div className="text-xs md:text-sm text-slate-300 leading-relaxed">
          <strong className="text-indigo-300 font-semibold">{steps[currentStep].title}: </strong>
          {steps[currentStep].description}
        </div>
      </div>
    </div>
  );
};
