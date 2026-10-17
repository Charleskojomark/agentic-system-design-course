import React, { useState } from 'react';
import { Wrench, CheckCircle2, XCircle, RotateCcw, Plus, Trash2 } from 'lucide-react';

interface ToolItem {
  id: string;
  name: string;
  category: string;
  description: string;
  isCorrectForPrompt: boolean;
}

export const DragDropBuilder: React.FC = () => {
  const availableTools: ToolItem[] = [
    {
      id: 'tool-weather',
      name: 'Weather Forecast API',
      category: 'API Integration',
      description: 'Queries live radar, precipitation %, and weather forecast by city & date.',
      isCorrectForPrompt: true,
    },
    {
      id: 'tool-sms',
      name: 'Messaging / Twilio API',
      category: 'Communication',
      description: 'Sends automated SMS or push notification alerts to the user mobile device.',
      isCorrectForPrompt: true,
    },
    {
      id: 'tool-crypto',
      name: 'Crypto Trading Bot',
      category: 'Finance',
      description: 'Executes automated cryptocurrency buy/sell orders on decentralized exchanges.',
      isCorrectForPrompt: false,
    },
    {
      id: 'tool-robot',
      name: 'Robotic Arm Motor Controller',
      category: 'Actuator',
      description: 'Controls stepper motors for factory sorting and physical manipulation.',
      isCorrectForPrompt: false,
    },
    {
      id: 'tool-sql',
      name: 'PostgreSQL Database Client',
      category: 'Storage',
      description: 'Executes relational SQL queries for transactional inventory records.',
      isCorrectForPrompt: false,
    },
  ];

  const promptTask = '"Check tomorrow\'s weather in Seattle and message me if it looks rainy."';

  const [activeWorkflow, setActiveWorkflow] = useState<ToolItem[]>([]);
  const [evaluated, setEvaluated] = useState<boolean>(false);

  const addTool = (tool: ToolItem) => {
    if (!activeWorkflow.some((t) => t.id === tool.id)) {
      setActiveWorkflow([...activeWorkflow, tool]);
      setEvaluated(false);
    }
  };

  const removeTool = (toolId: string) => {
    setActiveWorkflow(activeWorkflow.filter((t) => t.id !== toolId));
    setEvaluated(false);
  };

  const reset = () => {
    setActiveWorkflow([]);
    setEvaluated(false);
  };

  const hasAllCorrect =
    activeWorkflow.some((t) => t.id === 'tool-weather') &&
    activeWorkflow.some((t) => t.id === 'tool-sms');
  const hasNoIncorrect = !activeWorkflow.some((t) => !t.isCorrectForPrompt);
  const isPerfect = hasAllCorrect && hasNoIncorrect && activeWorkflow.length === 2;

  return (
    <div className="rounded-3xl border border-emerald-500/20 bg-slate-900/60 p-6 md:p-8 backdrop-blur-xl shadow-xl my-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs uppercase tracking-wider font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
            Interactive Tool Builder
          </span>
          <h3 className="text-lg md:text-xl font-bold text-slate-100 mt-2">
            Assemble the Agent Toolset
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Equip the agent with the precise external functions required to fulfill the user prompt.
          </p>
        </div>

        <button
          type="button"
          onClick={reset}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
        >
          <RotateCcw size={14} />
          Reset
        </button>
      </div>

      {/* User Prompt Banner */}
      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 mb-6">
        <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wide block mb-1">
          Goal Prompt from User:
        </span>
        <code className="text-sm font-semibold text-emerald-200 font-mono">{promptTask}</code>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Available Tool Palette */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Available Tools Catalog:
          </h4>
          <div className="space-y-2.5">
            {availableTools.map((tool) => {
              const inWorkflow = activeWorkflow.some((t) => t.id === tool.id);
              return (
                <div
                  key={tool.id}
                  className={`p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                    inWorkflow
                      ? 'bg-slate-900/40 border-slate-800/80 opacity-50'
                      : 'bg-slate-900/80 border-slate-800 hover:border-emerald-500/50 shadow-sm'
                  }`}
                >
                  <div className="min-w-0">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">
                      {tool.category}
                    </span>
                    <h5 className="text-sm font-semibold text-slate-200">{tool.name}</h5>
                    <p className="text-[11px] text-slate-400 line-clamp-1">{tool.description}</p>
                  </div>

                  <button
                    type="button"
                    disabled={inWorkflow}
                    onClick={() => addTool(tool)}
                    className="p-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-300 disabled:opacity-40 transition-colors shrink-0"
                    aria-label={`Add ${tool.name}`}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Assembled Workflow Canvas */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Agent Workflow Canvas ({activeWorkflow.length} Tools):
            </h4>
            <button
              type="button"
              disabled={activeWorkflow.length === 0}
              onClick={() => setEvaluated(true)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white disabled:opacity-50 transition-all shadow-md"
            >
              Verify Agent Tooling
            </button>
          </div>

          <div className="min-h-[220px] rounded-2xl bg-slate-950/80 border-2 border-dashed border-slate-800 p-4 space-y-2.5 flex flex-col justify-center">
            {activeWorkflow.length === 0 ? (
              <div className="text-center text-xs text-slate-500 py-8">
                <Wrench size={28} className="mx-auto mb-2 opacity-30" />
                Click + on the tools to assemble the agent workflow.
              </div>
            ) : (
              activeWorkflow.map((tool) => (
                <div
                  key={tool.id}
                  className="p-3 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-between gap-3 animate-in fade-in zoom-in-95"
                >
                  <div>
                    <h5 className="text-xs font-bold text-slate-200">{tool.name}</h5>
                    <p className="text-[10px] text-slate-400">{tool.category}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeTool(tool.id)}
                    className="text-slate-500 hover:text-rose-400 p-1 rounded-md transition-colors"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Validation Feedback */}
          {evaluated && (
            <div
              className={`mt-4 p-4 rounded-xl border text-xs leading-relaxed animate-in fade-in duration-200 ${
                isPerfect
                  ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                  : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
              }`}
            >
              <div className="flex items-center gap-2 font-bold mb-1">
                {isPerfect ? (
                  <>
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                    <span>Tooling Validated! Correct Agent Configuration</span>
                  </>
                ) : (
                  <>
                    <XCircle size={16} className="text-rose-400 shrink-0" />
                    <span>Configuration Suboptimal</span>
                  </>
                )}
              </div>
              {isPerfect ? (
                <p>
                  The agent now holds the <strong>Weather Forecast API</strong> to sense tomorrow's forecast and the <strong>Messaging API</strong> to notify the user. No extraneous tools to waste context!
                </p>
              ) : (
                <p>
                  This prompt requires exactly: 1) A tool to retrieve weather data, and 2) A tool to send a text alert. Unneeded tools add context bloat and failure risk.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
