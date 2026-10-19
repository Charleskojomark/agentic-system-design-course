import React, { useState } from 'react';
import { 
  Sparkles, 
  MessageSquare, 
  Layers, 
  FileJson, 
  ArrowRight, 
  CheckCircle2, 
  Bot, 
  Cpu, 
  Workflow, 
  Code2, 
  RefreshCw, 
  Database,
  Sliders,
  Check,
  Eye
} from 'lucide-react';

export const ChainBuddyIntakeSimulator: React.FC = () => {
  const [selectedGoal, setSelectedGoal] = useState<string>('tweet-generation');
  const [activeConstraint, setActiveConstraint] = useState<string>('char-144');
  const [evaluatorType, setEvaluatorType] = useState<'python' | 'llm'>('python');
  const [step, setStep] = useState<number>(1);
  const [isCompiling, setIsCompiling] = useState<boolean>(false);
  const [isGenerated, setIsGenerated] = useState<boolean>(false);

  const goals: Record<string, { title: string; prompt: string; desc: string }> = {
    'tweet-generation': {
      title: 'Catchy Tweet Generator',
      prompt: 'Compare prompts for generating catchy, viral tweets from long technical paragraphs.',
      desc: 'Transforms lengthy blog posts or research papers into concise tweets.'
    },
    'math-reasoning': {
      title: 'Persona Math Benchmark',
      prompt: 'Evaluate whether a mathematician persona solves integrals more accurately than a student.',
      desc: 'Compares mathematical accuracy across diverse prompt personas.'
    },
    'safety-audit': {
      title: 'Red-Teaming Safety Audit',
      prompt: 'Audit LLM responses against adversarial jailbreaks and policy compliance.',
      desc: 'Detects refusal degradation across temperature settings.'
    }
  };

  const handleGenerate = () => {
    setIsCompiling(true);
    setTimeout(() => {
      setIsCompiling(false);
      setIsGenerated(true);
      setStep(3);
    }, 900);
  };

  const handleReset = () => {
    setStep(1);
    setIsGenerated(false);
  };

  return (
    <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-sky-500/30 backdrop-blur-xl shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-400 font-mono text-[11px] font-bold border border-sky-500/30">
              SIMULATOR 01
            </span>
            <span className="text-xs text-slate-400 uppercase tracking-widest font-mono">
              Phase 1: Conversational Intake
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-sky-400" />
            ChainBuddy Smart Intake Form & Chain-of-Reasoning (CoR)
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
            Experience Heterogeneous Model Tiering: Claude 3.5 Sonnet conducts the structured 3-part intake while updating the agent's internal Chain-of-Reasoning state whiteboard.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/10 border border-white/10 text-xs text-slate-300 font-mono transition self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Reset Intake
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Smart Intake Form */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="text-sky-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5" /> Smart Intake Form (Max 3 Questions)
            </span>
            <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-300">Claude 3.5 Sonnet (Chat Tier)</span>
          </div>

          {/* Q1: Goal Clarification */}
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
              <span className="w-5 h-5 rounded-full bg-sky-500/30 text-sky-300 flex items-center justify-center text-[10px] font-mono font-bold">1</span>
              <span>Goal Clarification: What high-level workflow are you building?</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {Object.entries(goals).map(([key, item]) => (
                <button
                  key={key}
                  onClick={() => { setSelectedGoal(key); setIsGenerated(false); }}
                  className={`p-2.5 rounded-xl text-left transition border text-xs ${
                    selectedGoal === key
                      ? 'bg-sky-500/20 border-sky-400 text-white shadow-sm'
                      : 'bg-white/[0.02] border-white/5 text-slate-400 hover:text-slate-200 hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="font-bold">{item.title}</div>
                  <div className="text-[10px] text-slate-500 truncate mt-0.5">{item.prompt}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Q2: Requirements Exploration */}
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
              <span className="w-5 h-5 rounded-full bg-sky-500/30 text-sky-300 flex items-center justify-center text-[10px] font-mono font-bold">2</span>
              <span>Requirements Exploration: What constraint must be enforced?</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'char-144', label: '144-Character Strict Ceiling' },
                { id: 'humor-scale', label: '1-5 Humor / Catchiness Score' },
                { id: 'exact-math', label: 'Exact Match Target (π)' }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => { setActiveConstraint(opt.id); setIsGenerated(false); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition border ${
                    activeConstraint === opt.id
                      ? 'bg-sky-600 text-white border-sky-400'
                      : 'bg-white/[0.02] border-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Q3: Evaluation Strategy */}
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
              <span className="w-5 h-5 rounded-full bg-sky-500/30 text-sky-300 flex items-center justify-center text-[10px] font-mono font-bold">3</span>
              <span>Evaluation Mode: How should outputs be validated?</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setEvaluatorType('python')}
                className={`p-2.5 rounded-xl text-left border transition text-xs ${
                  evaluatorType === 'python'
                    ? 'bg-sky-500/20 border-sky-400 text-white'
                    : 'bg-white/[0.02] border-white/5 text-slate-400 hover:text-white'
                }`}
              >
                <div className="font-bold flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-emerald-400" /> Python Code Evaluator
                </div>
                <div className="text-[10px] text-slate-500">Deterministic string/regex assertions (0 tokens)</div>
              </button>

              <button
                onClick={() => setEvaluatorType('llm')}
                className={`p-2.5 rounded-xl text-left border transition text-xs ${
                  evaluatorType === 'llm'
                    ? 'bg-sky-500/20 border-sky-400 text-white'
                    : 'bg-white/[0.02] border-white/5 text-slate-400 hover:text-white'
                }`}
              >
                <div className="font-bold flex items-center gap-1.5">
                  <Bot className="w-3.5 h-3.5 text-indigo-400" /> LLM Scorer Node
                </div>
                <div className="text-[10px] text-slate-500">Subjective tone, catchiness, or alignment rating</div>
              </button>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isCompiling}
            className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2 transition disabled:opacity-50"
          >
            {isCompiling ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" /> Compiling JSON Work Ticket...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-sky-300" /> Generate Starter Workflow Ticket
              </>
            )}
          </button>
        </div>

        {/* Right: Chain-of-Reasoning Whiteboard & JSON Output */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="text-indigo-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5" /> Chain-of-Reasoning (CoR) Whiteboard
            </span>
            <span className="text-[11px] text-slate-500">Internal Agent Memory State</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#070b14] border border-white/10 space-y-3 font-mono text-xs">
            <div className="text-slate-400 text-[11px] border-b border-white/5 pb-2">
              <span className="text-emerald-400">STATE_TRACKER:</span> Active Goal & Discovered Preferences
            </div>

            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-slate-500 text-[11px] w-24 shrink-0">PRIMARY_GOAL:</span>
                <span className="text-slate-200 font-sans text-xs">{goals[selectedGoal].prompt}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-slate-500 text-[11px] w-24 shrink-0">CONSTRAINTS:</span>
                <span className="text-sky-300 text-xs">[{activeConstraint}]</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-slate-500 text-[11px] w-24 shrink-0">EVALUATOR:</span>
                <span className="text-emerald-300 text-xs">{evaluatorType === 'python' ? 'PythonCodeEvaluator (len <= 144)' : 'LLMScorer (Scale 1-5)'}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-slate-500 text-[11px] w-24 shrink-0">MODELS:</span>
                <span className="text-purple-300 text-xs">['gpt-4o', 'claude-3-5-sonnet', 'gemini-1-5-pro']</span>
              </div>
            </div>
          </div>

          {/* Compiled JSON Work Ticket */}
          <div className="p-4 rounded-2xl bg-[#040810] border border-sky-500/20 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="text-sky-300 font-semibold flex items-center gap-1.5">
                <FileJson className="w-3.5 h-3.5" /> Machine-Readable Work Ticket (JSON)
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Ready for LangGraph
              </span>
            </div>

            <pre className="p-3 rounded-xl bg-black/60 border border-white/5 font-mono text-[11px] text-slate-300 overflow-x-auto max-h-56 leading-relaxed">
{JSON.stringify({
  user_goal: goals[selectedGoal].prompt,
  requirements: [
    `Enforce constraint: ${activeConstraint}`,
    `Evaluation method: ${evaluatorType.toUpperCase()}`
  ],
  plan: {
    justification: goals[selectedGoal].desc,
    layer_skeleton: [
      { layer_id: 1, name: 'Input Layer', node: 'TextFieldsNode1' },
      { layer_id: 2, name: 'Template Layer', node: 'TextFieldsNode2' },
      { layer_id: 3, name: 'Prompt Node Layer', node: 'PromptNode1' },
      { layer_id: 4, name: 'Evaluation Layer', node: evaluatorType === 'python' ? 'PythonEvaluator1' : 'LLMScorer1' }
    ],
    variable_traces: [
      { variable: 'input_text', origin: 'TextFieldsNode1', consumed_by: ['TextFieldsNode2'] },
      { variable: 'prompt_template', origin: 'TextFieldsNode2', consumed_by: ['PromptNode1'] },
      { variable: 'model_responses', origin: 'PromptNode1', consumed_by: [evaluatorType === 'python' ? 'PythonEvaluator1' : 'LLMScorer1'] }
    ]
  }
}, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export const LangGraphPipelineGenerator: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const stages = [
    {
      num: 1,
      title: 'Phase 2A: Planner Agent Architecting',
      agent: 'Planner Agent (GPT-4o)',
      desc: 'Takes the JSON work ticket and constructs the 4-layer skeleton with variable origin-to-consumer dependency traces.',
      nodes: [
        { id: 'L1', title: 'Layer 1: Input Layer', type: 'Input', status: 'Planned' },
        { id: 'L2', title: 'Layer 2: Template Layer', type: 'Template', status: 'Planned' },
        { id: 'L3', title: 'Layer 3: Prompt Layer', type: 'Prompt', status: 'Planned' },
        { id: 'L4', title: 'Layer 4: Evaluation Layer', type: 'Evaluator', status: 'Planned' }
      ]
    },
    {
      num: 2,
      title: 'Phase 2B: Specialized Worker Synthesis',
      agent: 'TextFields & Prompt Specialists',
      desc: 'Worker agents synthesize node configurations: TextFields populates sample paragraphs, and Prompt Agent configures model matrix [GPT-4o, Claude 3.5, Gemini 1.5].',
      nodes: [
        { id: 'L1', title: 'TextFieldsNode1', type: 'Data: Long Paragraphs', status: 'Synthesized' },
        { id: 'L2', title: 'TextFieldsNode2', type: 'Template: {long_paragraph}', status: 'Synthesized' },
        { id: 'L3', title: 'PromptNode1', type: 'Models: 3 Top LLMs', status: 'Synthesized' },
        { id: 'L4', title: 'Layer 4: Evaluator', type: 'Pending', status: 'Waiting' }
      ]
    },
    {
      num: 3,
      title: 'Phase 2C: Evaluator Synthesis & Variable Wiring',
      agent: 'Evaluator & Edge Specialists',
      desc: 'Evaluator Agent synthesizes Python code (`len(r) <= 144`). Edge Agent creates connection bindings matching variable traces.',
      nodes: [
        { id: 'L1', title: 'TextFieldsNode1', type: 'Output: paragraph', status: 'Wired' },
        { id: 'L2', title: 'TextFieldsNode2', type: 'Output: prompt_template', status: 'Wired' },
        { id: 'L3', title: 'PromptNode1', type: 'Output: tweet_response', status: 'Wired' },
        { id: 'L4', title: 'PythonEvaluatorNode', type: 'Assert: len <= 144', status: 'Wired' }
      ]
    },
    {
      num: 4,
      title: 'Phase 2D: Canvas Layout & JSON Export',
      agent: 'Layout Agent (Finishers)',
      desc: 'Layout Agent computes non-overlapping 2D (x, y) coordinates and renders the final executable starter workflow onto the ChainForge canvas.',
      nodes: [
        { id: 'L1', title: 'x: 80, y: 150', type: 'Input Node', status: 'Rendered' },
        { id: 'L2', title: 'x: 340, y: 150', type: 'Template Node', status: 'Rendered' },
        { id: 'L3', title: 'x: 620, y: 150', type: 'Prompt Node', status: 'Rendered' },
        { id: 'L4', title: 'x: 920, y: 150', type: 'Evaluator Node', status: 'Rendered' }
      ]
    }
  ];

  const currentStage = stages[activeStage];

  return (
    <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-sky-500/30 backdrop-blur-xl shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 font-mono text-[11px] font-bold border border-indigo-500/30">
              SIMULATOR 02
            </span>
            <span className="text-xs text-slate-400 uppercase tracking-widest font-mono">
              Phase 2: LangGraph Plan-and-Execute Factory
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Workflow className="w-5 h-5 text-indigo-400" />
            LangGraph Multi-Agent Pipeline Assembly Factory
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
            Watch the Planner Agent ('The Architect') lay out blueprints while Task Specialists (TextFields, Prompt, Evaluator) and Connection Finishers (Edge, Layout) assemble the ChainForge canvas.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {stages.map((stg, idx) => (
            <button
              key={stg.num}
              onClick={() => setActiveStage(idx)}
              className={`w-8 h-8 rounded-xl font-mono text-xs font-bold transition flex items-center justify-center ${
                activeStage === idx
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-500/20 border border-sky-400'
                  : 'bg-white/[0.04] text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              {stg.num}
            </button>
          ))}
        </div>
      </div>

      {/* Stage Description Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-950/40 via-indigo-950/40 to-slate-900/40 border border-sky-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="text-xs font-mono font-bold text-sky-400 flex items-center gap-1.5 uppercase">
            <Bot className="w-4 h-4 text-sky-400" /> {currentStage.agent}
          </div>
          <div className="text-sm font-bold text-white">{currentStage.title}</div>
          <p className="text-xs text-slate-300 max-w-xl">{currentStage.desc}</p>
        </div>

        <button
          onClick={() => setActiveStage((prev) => (prev + 1) % stages.length)}
          className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition flex items-center gap-1.5 shrink-0 self-start sm:self-auto shadow-md shadow-sky-500/20"
        >
          <span>Next Assembly Step</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Visual Canvas Layout */}
      <div className="p-6 rounded-3xl bg-[#050811] border border-white/10 space-y-4">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-white/5 pb-3">
          <span className="text-slate-300 font-bold flex items-center gap-2">
            <Layers className="w-4 h-4 text-sky-400" /> ChainForge Visual Canvas Simulation
          </span>
          <span className="text-emerald-400 text-[11px] flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Live Canvas Rendering
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {currentStage.nodes.map((node, i) => (
            <div
              key={node.id}
              className={`p-4 rounded-2xl border transition-all duration-300 space-y-3 ${
                activeStage >= 2
                  ? 'bg-sky-950/20 border-sky-500/40 shadow-lg shadow-sky-500/5'
                  : 'bg-white/[0.02] border-white/10'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-slate-300 font-bold">
                  LAYER 0{i + 1}
                </span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                  node.status === 'Rendered' || node.status === 'Wired'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : node.status === 'Synthesized'
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                    : 'bg-slate-800 text-slate-400'
                }`}>
                  {node.status}
                </span>
              </div>

              <div className="space-y-1">
                <div className="text-xs font-bold text-white font-mono truncate">{node.title}</div>
                <div className="text-[11px] text-slate-400">{node.type}</div>
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                <span>Origin: Sockets</span>
                <span className="text-sky-400">→ Wire #{i + 1}</span>
              </div>
            </div>
          ))}
        </div>

        {activeStage === 3 && (
          <div className="mt-4 p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-300 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              Complete ChainForge starter workflow compiled successfully! User can immediately test or edit nodes.
            </span>
            <span className="font-mono text-[11px] text-emerald-400 font-bold">0 Blank Page Paralysis</span>
          </div>
        )}
      </div>
    </div>
  );
};
