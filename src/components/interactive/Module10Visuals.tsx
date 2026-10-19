import React, { useState } from 'react';
import {
  Cpu,
  Layers,
  Terminal,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Code,
  Sparkles,
  Zap,
  Activity
} from 'lucide-react';

export const ADKPipelineVisualizer: React.FC = () => {
  const [activeStep, setActiveStep] = useState<string>('designer');

  const steps: Record<string, {
    name: string;
    agentClass: string;
    file: string;
    role: string;
    reads: string[];
    writes: string[];
    failureHandling: string;
    codeSnippet: string;
  }> = {
    setup: {
      name: '01. Setup Phase',
      agentClass: 'SetupAgent (BaseAgent)',
      file: 'agents/setup_agent.py',
      role: 'Initializes environment and shared session state once before loop starts.',
      reads: ['loop_config.yaml', 'task_spec_halfcheetah.yaml'],
      writes: ['_setup_done', 'env', 'env_source', 'outdir', 'leaderboard_path', 'iteration = 0'],
      failureHandling: 'Fails fast on missing config keys or invalid types before GPU allocation.',
      codeSnippet: `ctx.session.state.update({
  "_setup_done": True,
  "env": env,
  "env_source": env_source,
  "outdir": str(outdir),
  "iteration": 0
})
yield Event(author=self.name, content=None)`,
    },
    designer: {
      name: '02. Reward Designer',
      agentClass: 'RewardDesignerOpenAIAgent',
      file: 'agents/llm_agents.py',
      role: 'Generates K reward candidates as plain Python code using OpenAI GPT-4.',
      reads: ['task_spec', 'env_source', 'best_reward_code', 'reflection', 'candidate_results'],
      writes: ['reward_candidates_text'],
      failureHandling: 'Wrapped in tenacity with exponential backoff (min 2s, max 10s, 3 attempts).',
      codeSnippet: `@retry(stop=stop_after_attempt(3), wait=wait_exponential(min=2, max=10))
def call_llm():
    return client.chat.completions.create(
        model=self._model,
        messages=[{"role": "system", "content": DESIGNER_SYSTEM},
                  {"role": "user", "content": prompt}]
    )`,
    },
    evaluator: {
      name: '03. Candidate Evaluator',
      agentClass: 'CandidateEvaluatorAgent',
      file: 'agents/evaluator_agent.py',
      role: 'Parses code, compiles safely in sandbox, clears JAX caches, and trains PPO policies.',
      reads: ['reward_candidates_text', 'env_name', 'train_steps', 'seed', 'K'],
      writes: ['candidate_results (JSON)', 'train_metrics.json', 'eval_metrics.json', 'rollout.html'],
      failureHandling: 'Catches compile/divergence errors per-candidate, saves error.txt, continues iteration.',
      codeSnippet: `try:
    reward_fn = compile_reward(code)
    jax.clear_caches()
    make_inf, params, train_metrics, _ = train_policy(env_name, reward_fn, seed+i, train_steps)
    score = score_candidate(eval_metrics)
except Exception as e:
    save_text(cdir / "error.txt", str(e))`,
    },
    selector: {
      name: '04. Candidate Selector',
      agentClass: 'SelectorAgent',
      file: 'agents/selector_agent.py',
      role: 'Compares evaluation scores against previous best and crowns the generational winner.',
      reads: ['candidate_results', 'best_score', 'best_reward_code'],
      writes: ['best_score', 'best_reward_code', 'best_candidate_idx'],
      failureHandling: 'Fallback to previous best if all candidates in current generation fail.',
      codeSnippet: `top_candidate = max(results, key=lambda x: x["score"])
if top_candidate["score"] > ctx.session.state.get("best_score", -float("inf")):
    ctx.session.state["best_reward_code"] = top_candidate["reward_code"]
    ctx.session.state["best_score"] = top_candidate["score"]`,
    },
    reflector: {
      name: '05. Reward Reflector',
      agentClass: 'RewardReflectorAgent',
      file: 'agents/llm_agents.py',
      role: 'Analyzes epoch telemetry, component statistics, and policy rollouts into structured feedback.',
      reads: ['candidate_results', 'train_metrics', 'task_spec'],
      writes: ['reflection'],
      failureHandling: 'Emits heuristic reflection checklist if LLM summarization encounters timeout.',
      codeSnippet: `reflector_prompt = _reflector_prompt(candidate_results, task_spec)
reflection_text = call_llm(reflector_prompt)
ctx.session.state["reflection"] = reflection_text`,
    },
    exit: {
      name: '06. Exit Checker',
      agentClass: 'ExitCheckerAgent',
      file: 'agents/exit_checker_agent.py',
      role: 'Evaluates whether learning should terminate (target fitness reached or max iterations hit).',
      reads: ['iteration', 'loop_cfg', 'best_score'],
      writes: ['loop_continue (bool)'],
      failureHandling: 'Gracefully breaks loop, triggers final 5-seed evaluation, and emits summary.',
      codeSnippet: `if iteration >= max_iterations or best_score >= target_threshold:
    ctx.session.state["loop_continue"] = False
else:
    ctx.session.state["iteration"] += 1
    ctx.session.state["loop_continue"] = True`,
    },
  };

  const currentStep = steps[activeStep] || steps.designer;

  return (
    <div className="rounded-3xl bg-slate-900/90 border border-orange-500/20 p-5 sm:p-7 shadow-2xl backdrop-blur-xl space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold">
            🦾
          </div>
          <div>
            <h4 className="font-bold text-white text-sm sm:text-base">
              Google ADK Orchestration & State Flow
            </h4>
            <p className="text-[11px] sm:text-xs text-slate-400">
              Interactive architecture of the EurekaRewardEvolutionPipeline state machine
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>ADK Sequential + Loop Topology</span>
        </div>
      </div>

      {/* State Flow Node Track */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
        {Object.entries(steps).map(([key, item]) => {
          const isActive = activeStep === key;
          return (
            <button
              key={key}
              onClick={() => setActiveStep(key)}
              className={`p-2.5 rounded-xl text-left border transition text-xs ${
                isActive
                  ? 'bg-orange-500/20 border-orange-500 text-white shadow-lg ring-1 ring-orange-500/40'
                  : 'bg-white/[0.02] border-white/5 text-slate-400 hover:bg-white/[0.05] hover:text-slate-200'
              }`}
            >
              <div className="text-[9px] font-mono font-bold uppercase opacity-60">
                {key.toUpperCase()}
              </div>
              <div className="font-bold text-xs truncate mt-0.5">
                {item.name.split('. ')[1]}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Node Deep Dive */}
      <div className="p-5 rounded-2xl bg-slate-950 border border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-orange-400 font-bold block">
              {currentStep.file}
            </span>
            <h5 className="font-bold text-base text-white">{currentStep.name}: {currentStep.agentClass}</h5>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-white/5 border border-white/10 text-slate-300">
            {currentStep.role}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="space-y-3">
            <div>
              <span className="font-semibold text-slate-300 block mb-1">Reads from Session State:</span>
              <div className="flex flex-wrap gap-1.5">
                {currentStep.reads.map((r, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-blue-950/40 border border-blue-500/30 text-blue-300 font-mono text-[10px]">
                    {r}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="font-semibold text-slate-300 block mb-1">Writes to Session State:</span>
              <div className="flex flex-wrap gap-1.5">
                {currentStep.writes.map((w, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 font-mono text-[10px]">
                    {w}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
              <span className="text-amber-400 font-bold text-[11px] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Production Fault Isolation
              </span>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                {currentStep.failureHandling}
              </p>
            </div>
          </div>

          <div>
            <span className="font-semibold text-slate-300 block mb-1">Implementation Code Contract:</span>
            <pre className="text-[11px] font-mono text-slate-300 bg-black/60 p-3 rounded-xl overflow-x-auto border border-white/5 leading-relaxed">
              {currentStep.codeSnippet}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export const BraxCheetahSimulationVisualizer: React.FC = () => {
  const [velWeight, setVelWeight] = useState<number>(1.0);
  const [torsoAngleWeight, setTorsoAngleWeight] = useState<number>(0.5);
  const [actionCost, setActionCost] = useState<number>(0.05);

  const estimatedSpeed = (velWeight * 3.8).toFixed(1);
  const estimatedStability = (100 - (velWeight > 1.8 ? 45 : 10) - (torsoAngleWeight < 0.2 ? 35 : 0)).toFixed(0);

  return (
    <div className="rounded-3xl bg-slate-900/90 border border-white/10 p-5 sm:p-7 shadow-2xl backdrop-blur-xl space-y-6 animate-fade-in">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-white text-sm sm:text-base">
              Brax HalfCheetah Reward Shaping Sandbox
            </h4>
            <p className="text-[11px] sm:text-xs text-slate-400">
              Interactive tuning of JAX-compiled reward function terms
            </p>
          </div>
        </div>

        <div className="text-right font-mono">
          <span className="text-[10px] text-slate-400">Simulated Gait</span>
          <div className="text-xs font-bold text-orange-400">
            {Number(estimatedStability) > 70 ? 'Stable Sprint' : 'Chaotic Tumble'}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 space-y-2">
          <div className="flex justify-between text-xs">
            <span className="font-semibold text-emerald-400">Forward Velocity Weight</span>
            <span className="font-mono text-slate-300">{velWeight}x</span>
          </div>
          <input
            type="range"
            min="0.1"
            max="3.0"
            step="0.1"
            value={velWeight}
            onChange={e => setVelWeight(parseFloat(e.target.value))}
            className="w-full accent-emerald-400 cursor-pointer"
          />
          <div className="text-[10px] text-slate-400">Higher values incentivize speed, but risk tipping over</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 space-y-2">
          <div className="flex justify-between text-xs">
            <span className="font-semibold text-cyan-400">Torso Posture Penalty</span>
            <span className="font-mono text-slate-300">{torsoAngleWeight}x</span>
          </div>
          <input
            type="range"
            min="0.0"
            max="1.5"
            step="0.1"
            value={torsoAngleWeight}
            onChange={e => setTorsoAngleWeight(parseFloat(e.target.value))}
            className="w-full accent-cyan-400 cursor-pointer"
          />
          <div className="text-[10px] text-slate-400">Penalizes pitching forward or backward off-balance</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 space-y-2">
          <div className="flex justify-between text-xs">
            <span className="font-semibold text-amber-400">Action Smoothness (Energy)</span>
            <span className="font-mono text-slate-300">{actionCost}x</span>
          </div>
          <input
            type="range"
            min="0.01"
            max="0.2"
            step="0.01"
            value={actionCost}
            onChange={e => setActionCost(parseFloat(e.target.value))}
            className="w-full accent-amber-400 cursor-pointer"
          />
          <div className="text-[10px] text-slate-400">Penalizes jerky motor torques to preserve actuators</div>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-xs">
          <span className="text-slate-400 font-mono text-[10px] uppercase">Gait Metrics Prediction</span>
          <div className="flex items-center gap-4">
            <div className="font-mono">
              Velocity: <strong className="text-emerald-300">{estimatedSpeed} m/s</strong>
            </div>
            <div className="font-mono">
              Stability: <strong className={Number(estimatedStability) > 70 ? 'text-teal-300' : 'text-rose-400'}>{estimatedStability}%</strong>
            </div>
          </div>
        </div>

        <div className="text-[11px] font-mono text-slate-300 bg-black/60 px-3.5 py-2 rounded-xl border border-white/5">
          total_reward = {velWeight} * vel - {torsoAngleWeight} * jnp.abs(pitch) - {actionCost} * jnp.sum(action**2)
        </div>
      </div>
    </div>
  );
};
