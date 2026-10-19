import React, { useState } from 'react';
import { 
  Building2, 
  Workflow, 
  Layers, 
  CheckCircle2, 
  Sparkles, 
  RefreshCw, 
  Sliders, 
  ArrowRight, 
  Bot, 
  GitFork, 
  RotateCw, 
  Search, 
  ShieldCheck, 
  Cpu,
  Compass
} from 'lucide-react';

export const AgentTaxonomyInteractiveExplorer: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('agentic-ai');

  const agentTypes: Record<string, {
    name: string;
    decisionBasis: string;
    memory: string;
    useCase: string;
    courseExample: string;
    desc: string;
  }> = {
    'simple-reflex': {
      name: '1. Simple Reflex Agent',
      decisionBasis: 'Current perception only',
      memory: 'None (Stateless)',
      useCase: 'Spam email filter, basic thermostat',
      courseExample: 'Condition-action IF/THEN rules without context',
      desc: 'Applies fixed condition-action rules strictly to immediate sensory input. Cannot handle partially hidden environments or learn from mistakes.'
    },
    'model-based-reflex': {
      name: '2. Model-Based Reflex Agent',
      decisionBasis: 'Current perception + internal state',
      memory: 'Limited (Internal world model)',
      useCase: 'Autonomous vehicles, robotic navigation',
      courseExample: 'Tracking pedestrian trajectory when temporarily behind obstacles',
      desc: 'Maintains an internal model of the unobserved parts of the environment, allowing informed decision-making despite temporary sensor occlusions.'
    },
    'goal-based': {
      name: '3. Goal-Based Agent',
      decisionBasis: 'Evaluates actions against a long-term goal',
      memory: 'Contextual task state',
      useCase: 'GPS navigation systems, multi-step task planners',
      courseExample: 'Chain-of-thought task decomposition to achieve target state',
      desc: 'Acts with a predefined objective in mind. Evaluates candidate moves by how effectively they bring the system closer to the goal.'
    },
    'utility-based': {
      name: '4. Utility-Based Agent',
      decisionBasis: 'Optimization of a mathematical utility score',
      memory: 'Contextual state + score history',
      useCase: 'Dynamic pricing, cloud resource scheduling',
      courseExample: 'Balancing latency, token cost, and accuracy across candidate paths',
      desc: 'Goes beyond binary goal achievement to optimize trade-offs between competing priorities (speed, cost, risk, revenue) using a utility function.'
    },
    'learning': {
      name: '5. Learning Agent',
      decisionBasis: 'Improving from experience and feedback',
      memory: 'Adaptive episodic memory',
      useCase: 'Recommendation engines, autonomous RL policies',
      courseExample: 'Eureka meta-level reward generation & evolutionary reflection',
      desc: 'Breaks free from static build-time rules by observing the consequences of its actions, receiving feedback, and updating its internal models over time.'
    },
    'multi-agent': {
      name: '6. Multi-Agent System',
      decisionBasis: 'Distributed across specialized peer agents',
      memory: 'Shared / distributed state blackboard',
      useCase: 'Complex collaborative workflow pipelines',
      courseExample: 'MACRS conversational recommendation swarm',
      desc: 'Decomposes complex problems across specialized agents (researcher, coder, critic) communicating over shared protocols.'
    },
    'hierarchical': {
      name: '7. Hierarchical Agent',
      decisionBasis: 'Tiered strategic planning + tactical workers',
      memory: 'Layered memory across tiers',
      useCase: 'Enterprise automation, complex robotics',
      courseExample: 'ChainBuddy Planner Agent overseeing specialized worker crews',
      desc: 'Top-level orchestrators manage strategic decomposition while subordinate worker agents execute narrow, specialized sub-tasks.'
    },
    'agentic-ai': {
      name: '8. Agentic AI (Modern Synthesis)',
      decisionBasis: 'Synthesis of goal-direction, utility, learning, and swarms',
      memory: 'Full 3-tier memory (short, long, external)',
      useCase: 'Autonomous coding agents, persistent personal assistants',
      courseExample: 'WebVoyager multimodal browsing + OpenClaw 24/7 infrastructure',
      desc: 'The complete convergence: plans multi-step workflows, calls external tools, reflects on outcomes, and operates autonomously with minimal human intervention.'
    }
  };

  const current = agentTypes[selectedType];

  return (
    <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-amber-500/30 backdrop-blur-xl shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-mono text-[11px] font-bold border border-amber-500/30">
              EXPLORER 01
            </span>
            <span className="text-xs text-slate-400 uppercase tracking-widest font-mono">
              The 8 Agent Archetypes Taxonomy
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Building2 className="w-5 h-5 text-amber-400" />
            AI Agent Capabilities & Decision Models Taxonomy
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
            Inspect the evolution of decision-making paradigms from simple reflex IF/THEN rules to full Agentic AI synthesis. Click any agent type below to explore its memory, decision basis, and real-world use cases.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: 8-Type Buttons */}
        <div className="lg:col-span-5 space-y-2">
          {Object.entries(agentTypes).map(([key, item]) => (
            <button
              key={key}
              onClick={() => setSelectedType(key)}
              className={`w-full p-3 rounded-2xl text-left transition border text-xs font-mono flex items-center justify-between ${
                selectedType === key
                  ? 'bg-amber-950/40 border-amber-400 text-white shadow-md shadow-amber-500/10'
                  : 'bg-white/[0.02] border-white/5 text-slate-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <span className="font-bold truncate">{item.name}</span>
              <span className="text-[10px] text-amber-400 ml-2 shrink-0">{item.decisionBasis.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Right: Detailed Archetype Card */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 sm:p-6 rounded-3xl bg-black/60 border border-white/10 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-sm font-mono text-amber-300 font-bold uppercase tracking-wider">
                {current.name}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Archetype Profile
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{current.desc}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                <div className="text-[10px] font-mono uppercase text-slate-400">Decision Basis</div>
                <div className="text-xs font-bold text-white">{current.decisionBasis}</div>
              </div>

              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                <div className="text-[10px] font-mono uppercase text-slate-400">Memory Architecture</div>
                <div className="text-xs font-bold text-sky-400">{current.memory}</div>
              </div>

              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                <div className="text-[10px] font-mono uppercase text-slate-400">Typical Production Use Case</div>
                <div className="text-xs font-bold text-emerald-400">{current.useCase}</div>
              </div>

              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                <div className="text-[10px] font-mono uppercase text-slate-400">Course Masterclass Example</div>
                <div className="text-xs font-bold text-fuchsia-400">{current.courseExample}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const FrameworkComparisonAndWorkflowStudio: React.FC = () => {
  const [activeWorkflow, setActiveWorkflow] = useState<'planning' | 'react' | 'reflection' | 'routing'>('react');

  const workflows = {
    planning: {
      name: 'Planning Pattern',
      tagline: 'Decompose the complex goal into an ordered blueprint before taking action.',
      loop: 'User Goal → Planner Agent → Step-by-Step Subtasks → Sequential Execution → Goal Achieved',
      example: 'Eureka decomposes reward generation into component dictionaries before JAX policy evaluation.',
      bestFor: 'Long-horizon tasks with complex sequential dependencies.'
    },
    react: {
      name: 'ReAct (Reasoning + Acting)',
      tagline: 'Alternate explicit thought reasoning with grounded external tool execution.',
      loop: 'Observe State → Explicit Thought ("What do I do?") → Grounded Action (Tool) → Observe Feedback',
      example: 'WebVoyager captures screenshot, generates thought, and executes Click [46].',
      bestFor: 'Dynamic, unpredictable environments requiring real-time perception and tool feedback.'
    },
    reflection: {
      name: 'Reflection (Self-Critique)',
      tagline: 'A quality-control loop where a critic reviews outputs and provides diagnostic feedback.',
      loop: 'Draft Output → Critic Inspection (VLM / Evaluator) → Structured Critique → Targeted Revision',
      example: 'MuLan VLM critic audits Stage 2 colors and triggers self-correction re-generation.',
      bestFor: 'High-stakes generative and diagnostic tasks where cascading errors must be prevented.'
    },
    routing: {
      name: 'Routing Pattern',
      tagline: 'An orchestrator classifies incoming queries and dispatches them to specialized sub-agents.',
      loop: 'Incoming Request → Intent Router → Specialist Domain Agent (Legal / Billing / Code) → Tailored Output',
      example: 'Enterprise support assistant dispatching billing queries to payment agents and technical queries to engineering agents.',
      bestFor: 'Multi-domain applications requiring tight scope control and specialized tools.'
    }
  };

  const currentWf = workflows[activeWorkflow];

  return (
    <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-amber-500/30 backdrop-blur-xl shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 font-mono text-[11px] font-bold border border-indigo-500/30">
              STUDIO 02
            </span>
            <span className="text-xs text-slate-400 uppercase tracking-widest font-mono">
              Workflow Patterns & Frameworks Matrix
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Workflow className="w-5 h-5 text-indigo-400" />
            The 4 Agentic Workflow Patterns & Frameworks Landscape
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
            Toggle between Planning, ReAct, Reflection, and Routing to inspect their operational execution loops and review the production framework comparison matrix.
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/10 text-xs">
          {(['planning', 'react', 'reflection', 'routing'] as const).map(wfKey => (
            <button
              key={wfKey}
              onClick={() => setActiveWorkflow(wfKey)}
              className={`px-3 py-1.5 rounded-lg font-mono font-semibold transition uppercase text-[11px] ${
                activeWorkflow === wfKey
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {wfKey}
            </button>
          ))}
        </div>
      </div>

      {/* Active Workflow Card */}
      <div className="p-5 rounded-3xl bg-black/60 border border-white/10 space-y-3">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <span className="text-sm font-bold text-white font-mono flex items-center gap-2">
            <RotateCw className="w-4 h-4 text-amber-400" /> {currentWf.name}
          </span>
          <span className="text-xs font-mono text-amber-400">{currentWf.bestFor}</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300">{currentWf.tagline}</p>

        <div className="p-3.5 rounded-2xl bg-amber-950/20 border border-amber-500/30 font-mono text-xs text-amber-200">
          <span className="text-slate-400">Execution Loop: </span>
          <span className="font-bold">{currentWf.loop}</span>
        </div>

        <div className="text-xs text-slate-400 font-mono">
          <span className="text-slate-500">Course Landmark: </span>
          <span className="text-slate-300">{currentWf.example}</span>
        </div>
      </div>

      {/* Framework Comparison Table */}
      <div className="space-y-3 pt-2">
        <span className="text-xs font-mono text-slate-400 uppercase tracking-wider font-bold">
          Major Production Frameworks Comparison Matrix
        </span>

        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-950/80 text-slate-400 border-b border-white/10">
              <tr>
                <th className="p-3">Framework</th>
                <th className="p-3">Primary Abstraction</th>
                <th className="p-3">Best Suited For</th>
                <th className="p-3">Key Production Trade-Off</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 bg-black/40 text-slate-300">
              <tr>
                <td className="p-3 font-bold text-sky-400">LangGraph</td>
                <td className="p-3">Stateful cyclical graphs & nodes</td>
                <td className="p-3">Cyclical ReAct loops, complex stateful pipelines</td>
                <td className="p-3 text-slate-400">Deep abstraction layer; steeper learning curve</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-emerald-400">AutoGen</td>
                <td className="p-3">Conversable agents in group chat</td>
                <td className="p-3">Multi-agent debate, code execution & verification</td>
                <td className="p-3 text-slate-400">Less suited for single-agent linear workflows</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-fuchsia-400">CrewAI</td>
                <td className="p-3">Role-based agent crews</td>
                <td className="p-3">Business process automation & team workflows</td>
                <td className="p-3 text-slate-400">Less control over low-level execution loops</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-orange-400">Google ADK</td>
                <td className="p-3">Sequential & Loop agent hierarchies</td>
                <td className="p-3">Cloud-native learning loops & robotics simulation</td>
                <td className="p-3 text-slate-400">Ecosystem alignment with Google infrastructure</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
