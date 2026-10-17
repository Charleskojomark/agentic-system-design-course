import React, { useState } from 'react';
import { Plane, AlertTriangle, MessageSquare, Bot, CheckCircle2, ArrowRight, Sparkles, RefreshCw, Clock, Calendar, Mail, ShieldAlert } from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';

export const HookInteractiveSimulation: React.FC<{
  hookText: string;
  objectives: string[];
}> = ({ hookText, objectives }) => {
  const { addXp } = useProgress();
  const [activeTab, setActiveTab] = useState<'agent' | 'chatbot'>('agent');
  const [simStep, setSimStep] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [hasCompleted, setHasCompleted] = useState<boolean>(false);

  const startSimulation = () => {
    setIsSimulating(true);
    setSimStep(1);

    setTimeout(() => setSimStep(2), 1200);
    setTimeout(() => setSimStep(3), 2600);
    setTimeout(() => {
      setSimStep(4);
      setIsSimulating(false);
      if (!hasCompleted) {
        setHasCompleted(true);
        addXp(25);
      }
    }, 4000);
  };

  const resetSimulation = () => {
    setSimStep(0);
    setIsSimulating(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Simulation Stage Hero Card */}
      <div className="rounded-3xl bg-slate-900/80 border border-white/10 p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Real-World Scenario Simulator</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              The 10:00 PM Flight Cancellation Crisis
            </h3>
          </div>

          <div className="flex items-center bg-black/40 p-1 rounded-2xl border border-white/10 text-xs shrink-0">
            <button
              onClick={() => { setActiveTab('agent'); resetSimulation(); }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-semibold transition ${
                activeTab === 'agent' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span>Autonomous AI Agent</span>
            </button>
            <button
              onClick={() => { setActiveTab('chatbot'); resetSimulation(); }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-semibold transition ${
                activeTab === 'chatbot' ? 'bg-slate-700 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Passive Chatbot</span>
            </button>
          </div>
        </div>

        {/* Narrative Context */}
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed py-4 border-b border-white/5">
          {hookText}
        </p>

        {/* Flight Disruption Ticket */}
        <div className="my-5 p-4 rounded-2xl bg-black/50 border border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center border border-rose-500/20">
              <Plane className="w-4 h-4 rotate-45" />
            </div>
            <div>
              <div className="font-bold text-white">LH-182 Frankfurt → Berlin</div>
              <div className="text-rose-400 flex items-center gap-1 text-[11px]">
                <AlertTriangle className="w-3 h-3" /> FLIGHT CANCELLED (Storm Delays)
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-indigo-400" /> Scheduled: 22:15</span>
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-emerald-400" /> Meeting: Tomorrow 09:00</span>
          </div>
        </div>

        {/* Interactive Comparison View */}
        {activeTab === 'agent' ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Autonomous Execution Trace (Perceive → Reason → Act)
              </span>

              {simStep === 0 ? (
                <button
                  onClick={startSimulation}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-xs font-bold text-white shadow-lg shadow-indigo-500/25 transition"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Trigger Agent Recovery</span>
                </button>
              ) : (
                <button
                  onClick={resetSimulation}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-400 hover:text-white transition"
                >
                  <RefreshCw className="w-3 h-3" /> Reset
                </button>
              )}
            </div>

            {simStep === 0 ? (
              <div className="p-8 rounded-2xl bg-black/30 border border-dashed border-white/10 text-center space-y-2">
                <div className="text-2xl">⚡</div>
                <div className="text-xs font-bold text-white">System Idle — Ready for Event Trigger</div>
                <p className="text-[11px] text-slate-400 max-w-sm mx-auto">
                  Click 'Trigger Agent Recovery' to watch the autonomous feedback loop perceive cancellation, evaluate calendar constraints, and execute actions.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5 font-mono text-xs">
                {simStep >= 1 && (
                  <div className="p-3.5 rounded-2xl bg-sky-950/40 border border-sky-500/30 text-sky-200 flex items-start gap-3 animate-fade-in">
                    <span className="text-base">👁️</span>
                    <div>
                      <strong className="text-sky-300 block text-[11px] uppercase tracking-wider">1. Perception</strong>
                      <span>Airline webhook parsed: LH-182 cancelled. Cross-referencing user calendar: Keynote presentation in Berlin at 09:00 AM.</span>
                    </div>
                  </div>
                )}

                {simStep >= 2 && (
                  <div className="p-3.5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 flex items-start gap-3 animate-fade-in">
                    <span className="text-base">🧠</span>
                    <div>
                      <strong className="text-indigo-300 block text-[11px] uppercase tracking-wider">2. Deliberative Reasoning & Planning</strong>
                      <span>Evaluating alternatives: ICE Night High-Speed Train departs 23:05, arrives Berlin Hauptbahnhof 06:12 AM. Seats available in Quiet Zone. Hotel late arrival notification required.</span>
                    </div>
                  </div>
                )}

                {simStep >= 3 && (
                  <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 flex items-start gap-3 animate-fade-in">
                    <span className="text-base">⚡</span>
                    <div>
                      <strong className="text-emerald-300 block text-[11px] uppercase tracking-wider">3. Action Execution (Tool Invocations)</strong>
                      <span>• Booked ICE Train #781 ($89.00 via DB API).<br/>• Sent automated Telegram alert with digital ticket PDF.<br/>• Sent webhook to Hotel Ritz Berlin concierge: "Guest arriving 06:45 AM, hold reservation."</span>
                    </div>
                  </div>
                )}

                {simStep >= 4 && (
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-indigo-950/60 border border-emerald-500/40 text-emerald-200 flex items-center justify-between gap-3 animate-fade-in">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      <span className="font-bold text-white text-xs">Mission Accomplished: Passenger reaches Berlin on schedule without lifting a finger.</span>
                    </div>
                    <span className="text-[10px] font-bold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30 shrink-0">
                      +25 XP Earned
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-rose-400 font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-400" />
              Passive Chatbot Failure Mode (No Autonomy)
            </span>

            <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-3 font-sans text-xs">
              <div className="flex items-start gap-3 text-slate-300">
                <span className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-[10px] text-white shrink-0 font-bold">YOU</span>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/5 leading-relaxed">
                  My flight LH-182 to Berlin was just cancelled! I have an important meeting tomorrow morning at 9 AM. What should I do?!
                </div>
              </div>

              <div className="flex items-start gap-3 text-slate-300">
                <span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-[10px] text-white shrink-0 font-bold">BOT</span>
                <div className="p-3 rounded-2xl bg-rose-950/20 border border-rose-500/20 text-rose-200 leading-relaxed space-y-2">
                  <p>I apologize for the inconvenience! Flight cancellations can be very stressful. You can check flight statuses on the Lufthansa website or call their customer support line at 1-800-555-0199.</p>
                  <p className="text-[11px] text-rose-400 italic">⚠️ The chatbot has no autonomy, cannot access your calendar, cannot book replacement trains, and cannot notify your hotel. You are left completely stranded at the terminal at midnight.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Lesson Learning Objectives Checklist */}
      <div className="rounded-3xl bg-slate-900/60 border border-white/10 p-6 shadow-xl backdrop-blur-xl space-y-3">
        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          Lesson Learning Milestones
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {objectives.map((obj, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-black/30 border border-white/5 text-xs text-slate-300 flex items-start gap-2.5"
            >
              <span className="w-5 h-5 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-mono text-[10px] shrink-0 font-bold">
                {idx + 1}
              </span>
              <span className="leading-snug">{obj}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
