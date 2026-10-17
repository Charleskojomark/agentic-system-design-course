import React, { useState } from 'react';
import { Calendar, Mail, CheckCircle2, ChevronRight, Play, RotateCcw } from 'lucide-react';

export const MeetingSchedulingTrace: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const steps = [
    {
      title: '1. Perceive and Plan',
      actor: 'The Model + Instructions',
      color: '#6366f1',
      action: 'Parses: "Set up a meeting with Sarah next week to discuss roadmap." Decomposes into: [Find Sarah email, Query calendars, Send invite, Await RSVP].',
      componentUsed: 'Model (Language understanding & Task planning)',
    },
    {
      title: '2. Gather Information',
      actor: 'The Tools (Calendar API)',
      color: '#10b981',
      action: 'Invokes: CalendarAPI.queryAvailability(participants=["User", "Sarah"], range="NextWeek"). Result: Tuesday 2:00 PM is mutually free.',
      componentUsed: 'Tools (Calendar API Wrapper)',
    },
    {
      title: '3. Execute Action',
      actor: 'The Tools (Email API)',
      color: '#f59e0b',
      action: 'Invokes: EmailAPI.sendInvite(to="sarah@corp.com", subject="Roadmap Discussion", time="Tue 2:00 PM").',
      componentUsed: 'Tools (Email API) + Model (Drafting courteous body text)',
    },
    {
      title: '4. Confirm Completion',
      actor: 'The Model',
      color: '#06b6d4',
      action: 'Webhook receives Sarah\'s acceptance. Model generates confirmation to user: "Meeting scheduled with Sarah for Tuesday at 2:00 PM."',
      componentUsed: 'Model (Interpreting status) + Output Interface',
    },
  ];

  return (
    <div className="rounded-3xl border border-slate-700/80 bg-slate-900/60 p-6 md:p-8 backdrop-blur-xl shadow-xl my-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs uppercase tracking-wider font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-md border border-indigo-500/20">
            End-to-End Execution Trace
          </span>
          <h3 className="text-lg md:text-xl font-bold text-slate-100 mt-2">
            Multi-Step Meeting Scheduling Walkthrough
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Observe the dynamic interplay between Model, Tools, and Instructions in a real task.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setCurrentStep((prev) => (prev + 1) % steps.length)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md"
        >
          <span>Next Step</span>
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Steps Pipeline */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 my-6">
        {steps.map((s, idx) => {
          const isActive = currentStep === idx;
          return (
            <div
              key={idx}
              onClick={() => setCurrentStep(idx)}
              className={`cursor-pointer p-4 rounded-2xl border transition-all ${
                isActive
                  ? 'bg-slate-800/90 border-indigo-500 ring-2 ring-indigo-500/40 shadow-lg'
                  : 'bg-slate-950/40 border-slate-800/80 hover:border-slate-700 opacity-60 hover:opacity-90'
              }`}
            >
              <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                Step {idx + 1}
              </span>
              <h5 className="text-xs font-bold text-slate-200 line-clamp-1">{s.title}</h5>
            </div>
          );
        })}
      </div>

      {/* Active Step Detailed Card */}
      <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-base font-bold text-slate-100">{steps[currentStep].title}</h4>
          <span className="text-xs font-mono px-2.5 py-0.5 rounded-md bg-indigo-950 text-indigo-300 border border-indigo-800">
            {steps[currentStep].actor}
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 leading-relaxed mb-4">
          {steps[currentStep].action}
        </div>

        <div className="text-xs text-slate-400 flex items-center gap-2">
          <span className="font-semibold text-slate-300">Components Active:</span>
          <span className="text-indigo-400">{steps[currentStep].componentUsed}</span>
        </div>
      </div>
    </div>
  );
};
