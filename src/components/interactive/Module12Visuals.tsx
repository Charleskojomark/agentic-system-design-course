import React, { useState } from 'react';
import { 
  Globe, 
  Eye, 
  Terminal, 
  FileCode, 
  Layers, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  MousePointer, 
  Search, 
  Calendar, 
  RefreshCw, 
  Database,
  Sliders,
  Sparkles,
  Camera,
  Play
} from 'lucide-react';

export const WebVoyagerReActSimulator: React.FC = () => {
  const [viewMode, setViewMode] = useState<'multimodal' | 'text-only'>('multimodal');
  const [activeStep, setActiveStep] = useState<number>(0);
  const [selectedElement, setSelectedElement] = useState<number | null>(null);

  const steps = [
    {
      num: 1,
      title: 'Step 1: Homepage Search Box Focus',
      url: 'https://www.google.com/travel/flights',
      thought: 'I see the main Google Flights homepage. The user wants to fly from LAX to JFK. I see the origin input field visually labeled "Where from", which corresponds to the Set-of-Mark numerical tag [23]. I will type "LAX" into this element.',
      action: 'Input [23]; "LAX"',
      tagId: 23,
      elements: [
        { id: 23, label: 'Where from (Origin)', type: 'input', x: '18%', y: '35%', w: '28%', h: '12%' },
        { id: 24, label: 'Where to (Destination)', type: 'input', x: '50%', y: '35%', w: '28%', h: '12%' },
        { id: 25, label: 'Departure Date', type: 'button', x: '18%', y: '52%', w: '28%', h: '12%' },
        { id: 26, label: 'Search Flights', type: 'submit', x: '50%', y: '52%', w: '28%', h: '12%' }
      ],
      textOnlyView: '<input type="text" id="i23" aria-label="Where from" class="QFw9Te" value="" placeholder="Where from?" />\n<div class="hidden-field" data-origin="lax">LAX Los Angeles</div>\n<span class="placeholder-label">Where from?</span>'
    },
    {
      num: 2,
      title: 'Step 2: Conquering the Calendar Grid Widget',
      url: 'https://www.google.com/travel/flights#calendar',
      thought: 'The calendar widget has opened. The user specified "next Friday". I see the 7-column calendar grid for the active month. Friday the 12th corresponds to the box with numerical tag [46]. The text-only agent would get lost in repeating 12s, but visually I can see this date is active and non-disabled. I will click [46].',
      action: 'Click [46]',
      tagId: 46,
      elements: [
        { id: 44, label: 'Wednesday 10', type: 'date', x: '45%', y: '40%', w: '8%', h: '10%' },
        { id: 45, label: 'Thursday 11', type: 'date', x: '55%', y: '40%', w: '8%', h: '10%' },
        { id: 46, label: 'Friday 12 (Target)', type: 'date-target', x: '65%', y: '40%', w: '8%', h: '10%' },
        { id: 47, label: 'Saturday 13', type: 'date', x: '75%', y: '40%', w: '8%', h: '10%' },
        { id: 50, label: 'Done Button', type: 'button', x: '75%', y: '70%', w: '18%', h: '12%' }
      ],
      textOnlyView: '<div class="calendar-container">\n  <div class="calendar-row">\n    <span class="date-disabled">12</span> <!-- Last month -->\n    <div class="date-clickable" data-day="12">12</div> <!-- Ambiguous span -->\n    <span class="date-disabled">12</span> <!-- Next month -->\n  </div>\n</div>'
    },
    {
      num: 3,
      title: 'Step 3: Sorting & Terminal Answer Extraction',
      url: 'https://www.google.com/travel/flights/results',
      thought: 'Flight results have populated. The user asked for the cheapest option. I spot the "Sort by" dropdown with numerical tag [58]. I will select "Cheapest" and extract the lowest fare ($189 Delta non-stop at 6:00 AM) and provide the final answer.',
      action: 'Answer ["Cheapest flight: Delta $189 non-stop, LAX -> JFK next Friday. URL: google.com/flights/..."]',
      tagId: 58,
      elements: [
        { id: 58, label: 'Sort: Cheapest First', type: 'dropdown', x: '70%', y: '20%', w: '22%', h: '10%' },
        { id: 60, label: 'Delta $189 (Non-stop)', type: 'result-target', x: '15%', y: '38%', w: '70%', h: '15%' },
        { id: 61, label: 'American $215 (1 Stop)', type: 'result', x: '15%', y: '56%', w: '70%', h: '15%' },
        { id: 62, label: 'United $240 (Non-stop)', type: 'result', x: '15%', y: '74%', w: '70%', h: '15%' }
      ],
      textOnlyView: '<div class="results-list">\n  <div class="flight-card" data-price="189">Delta 6:00 AM - 2:30 PM ($189)</div>\n  <div class="flight-card" data-price="215">American ($215)</div>\n</div>'
    }
  ];

  const current = steps[activeStep];

  return (
    <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-purple-500/30 backdrop-blur-xl shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-400 font-mono text-[11px] font-bold border border-purple-500/30">
              SIMULATOR 01
            </span>
            <span className="text-xs text-slate-400 uppercase tracking-widest font-mono">
              Live Web Navigation
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-purple-400" />
            WebVoyager Multimodal ReAct Loop & Set-of-Mark Grounding
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
            Compare how a text-only agent parses messy DOM HTML versus how WebVoyager utilizes Set-of-Mark numerical bounding box tags to ground actions deterministically.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-black/40 p-1 rounded-xl border border-white/10 text-xs font-mono">
            <button
              onClick={() => setViewMode('multimodal')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition flex items-center gap-1.5 ${
                viewMode === 'multimodal'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" /> Multimodal (Set-of-Mark)
            </button>
            <button
              onClick={() => setViewMode('text-only')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition flex items-center gap-1.5 ${
                viewMode === 'text-only'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" /> Text-Only DOM
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Step Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {steps.map((st, idx) => (
          <button
            key={st.num}
            onClick={() => { setActiveStep(idx); setSelectedElement(null); }}
            className={`px-4 py-2 rounded-2xl text-xs font-mono transition flex items-center gap-2 border whitespace-nowrap ${
              activeStep === idx
                ? 'bg-purple-600 text-white border-purple-400 shadow-md shadow-purple-500/20'
                : 'bg-white/[0.03] text-slate-400 hover:text-white border-white/10'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold">
              {st.num}
            </span>
            <span>{st.title}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Rendered Browser Viewport */}
        <div className="lg:col-span-7 space-y-3">
          <div className="p-3 bg-slate-950 rounded-2xl border border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="text-slate-300 ml-1 truncate max-w-xs">{current.url}</span>
            </div>
            <span className="text-[11px] text-purple-400">Viewport: 1440x900</span>
          </div>

          {viewMode === 'multimodal' ? (
            <div className="relative aspect-video rounded-3xl overflow-hidden border border-purple-500/30 bg-[#090d1a] shadow-inner p-4 flex flex-col justify-between">
              {/* Mock Web Interface */}
              <div className="text-xs font-mono text-slate-500 border-b border-white/10 pb-2 flex items-center justify-between">
                <span>Google Flights Interface Mock</span>
                <span className="text-purple-300">Set-of-Mark JS Injected</span>
              </div>

              {/* Rendered Interactive Elements with Set-of-Mark tags */}
              <div className="relative w-full h-full min-h-[220px]">
                {current.elements.map((el) => {
                  const isTarget = el.id === current.tagId;
                  const isHovered = selectedElement === el.id;

                  return (
                    <div
                      key={el.id}
                      onClick={() => setSelectedElement(el.id)}
                      style={{
                        position: 'absolute',
                        left: el.x,
                        top: el.y,
                        width: el.w,
                        height: el.h,
                      }}
                      className={`cursor-pointer rounded-lg border-2 p-1.5 transition-all flex flex-col justify-between text-[11px] font-mono select-none ${
                        isTarget
                          ? 'border-emerald-400 bg-emerald-500/20 shadow-lg shadow-emerald-500/30'
                          : isHovered
                          ? 'border-sky-400 bg-sky-500/20'
                          : 'border-purple-500/60 bg-purple-950/40 hover:border-purple-400'
                      }`}
                    >
                      {/* Set-of-Mark Tag Badge */}
                      <span className={`self-start px-1.5 py-0.2 rounded text-[10px] font-bold ${
                        isTarget ? 'bg-emerald-500 text-black' : 'bg-purple-600 text-white'
                      }`}>
                        [{el.id}]
                      </span>
                      <span className="text-[10px] text-slate-200 truncate">{el.label}</span>
                    </div>
                  );
                })}
              </div>

              <div className="text-[11px] text-slate-400 bg-black/60 p-2 rounded-xl flex items-center justify-between border border-white/5 font-mono">
                <span>Target Element: [{current.tagId}]</span>
                <span className="text-emerald-400 font-bold">Grounded Action Ready</span>
              </div>
            </div>
          ) : (
            <div className="relative aspect-video rounded-3xl overflow-hidden border border-rose-500/30 bg-[#090508] p-4 font-mono text-xs text-rose-300 overflow-y-auto space-y-2 shadow-inner">
              <div className="flex items-center justify-between border-b border-rose-500/20 pb-2 text-[11px] text-rose-400">
                <span className="flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400" /> HTML-Only Perception (DOM Dump)
                </span>
                <span>200,000+ Tokens Raw</span>
              </div>
              <pre className="text-[11px] text-slate-400 whitespace-pre leading-relaxed p-2">
                {current.textOnlyView}
              </pre>
              <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-200 text-xs">
                ⚠️ <span className="font-bold">Text-Only Pitfall:</span> Multiple dates with number 12 exist across overlapping rows. Without visual grid coordinates, the text agent guesses randomly and clicks disabled elements.
              </div>
            </div>
          )}
        </div>

        {/* Right: ReAct Cycle & Process Log */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 rounded-3xl bg-slate-950/80 border border-white/10 space-y-3 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-400 uppercase tracking-wider">
                <Terminal className="w-4 h-4 text-purple-400" /> ReAct Reasoning Cycle
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono font-bold">
                GPT-4V Multimodal
              </span>
            </div>

            {/* Thought */}
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-purple-400" /> 1. Explicit Thought
              </span>
              <p className="text-xs text-slate-200 bg-white/[0.03] p-3 rounded-2xl border border-white/5 leading-relaxed">
                "{current.thought}"
              </p>
            </div>

            {/* Action */}
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 font-bold flex items-center gap-1.5">
                <Play className="w-3 h-3 text-emerald-400" /> 2. Executable Action Primitive
              </span>
              <div className="p-3 rounded-2xl bg-black/60 border border-emerald-500/30 font-mono text-xs text-emerald-300 font-bold">
                <code>{current.action}</code>
              </div>
            </div>

            {/* Context Clipping Status */}
            <div className="pt-2 border-t border-white/10 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Context Clipping Window:</span>
                <span className="text-purple-300 font-bold">Last 3 Screenshots Only</span>
              </div>
              <div className="flex gap-2">
                {[1, 2, 3].map((idx) => (
                  <div
                    key={idx}
                    className={`flex-1 py-1 px-2 rounded-lg text-center text-[10px] font-mono border ${
                      idx <= activeStep + 1
                        ? 'bg-purple-950/40 border-purple-500/40 text-purple-300'
                        : 'bg-white/[0.02] border-white/5 text-slate-600'
                    }`}
                  >
                    page_{idx}.png
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* process_log.jsonl Live Event */}
          <div className="p-4 rounded-3xl bg-[#03060f] border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="text-slate-300 font-bold flex items-center gap-1.5">
                <FileCode className="w-3.5 h-3.5 text-purple-400" /> process_log.jsonl Event
              </span>
              <span className="text-[10px] text-emerald-400">Serialized Audit Log</span>
            </div>

            <pre className="p-3 rounded-xl bg-black/60 border border-white/5 font-mono text-[10px] text-slate-300 overflow-x-auto max-h-36 leading-relaxed">
{JSON.stringify({
  stage: activeStep === 2 ? "answer" : "action",
  url: current.url,
  step_number: activeStep + 1,
  selected_tag: current.tagId,
  command: current.action,
  vlm_grounded: true,
  clipping_buffer_size: Math.min(activeStep + 1, 3)
}, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SkillWeaverAutonomousLibrary: React.FC = () => {
  const [phase, setPhase] = useState<'exploring' | 'synthesizing' | 'verified'>('verified');
  const [selectedSkill, setSelectedSkill] = useState<string>('find_flight');

  const skills: Record<string, { title: string; signature: string; latencyBefore: string; latencyAfter: string; tokensSaved: string }> = {
    'find_flight': {
      title: 'Flight Finder Function',
      signature: 'find_flight(page, origin="LAX", destination="JFK", date="next_friday")',
      latencyBefore: '28.4s (11 LLM turns)',
      latencyAfter: '2.1s (1 tool execution)',
      tokensSaved: '~14,200 tokens'
    },
    'check_hotel': {
      title: 'Hotel Availability Checker',
      signature: 'check_hotel(page, city="Tokyo", check_in="2026-11-01", nights=4)',
      latencyBefore: '34.2s (14 LLM turns)',
      latencyAfter: '3.4s (1 tool execution)',
      tokensSaved: '~19,500 tokens'
    },
    'apply_coupon': {
      title: 'Checkout Promo Code Applier',
      signature: 'apply_coupon(page, promo_code="FALL2026")',
      latencyBefore: '16.8s (6 LLM turns)',
      latencyAfter: '1.2s (1 tool execution)',
      tokensSaved: '~8,100 tokens'
    }
  };

  return (
    <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-purple-500/30 backdrop-blur-xl shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-violet-500/20 text-violet-400 font-mono text-[11px] font-bold border border-violet-500/30">
              SIMULATOR 02
            </span>
            <span className="text-xs text-slate-400 uppercase tracking-widest font-mono">
              Self-Improving Web Agents (SkillWeaver)
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Database className="w-5 h-5 text-violet-400" />
            Autonomous Skill Synthesis & Dynamic Tool Library
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
            Experience how SkillWeaver transforms repetitive multi-step exploratory web trajectories into parameterized, deterministic Python functions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPhase('exploring')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition border ${
              phase === 'exploring'
                ? 'bg-amber-600 text-white border-amber-400'
                : 'bg-white/[0.04] text-slate-400 hover:text-white border-white/10'
            }`}
          >
            1. Exploration
          </button>
          <button
            onClick={() => setPhase('synthesizing')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition border ${
              phase === 'synthesizing'
                ? 'bg-sky-600 text-white border-sky-400'
                : 'bg-white/[0.04] text-slate-400 hover:text-white border-white/10'
            }`}
          >
            2. Synthesis
          </button>
          <button
            onClick={() => setPhase('verified')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition border ${
              phase === 'verified'
                ? 'bg-emerald-600 text-white border-emerald-400'
                : 'bg-white/[0.04] text-slate-400 hover:text-white border-white/10'
            }`}
          >
            3. Verified Library
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Skill Catalog */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-2 font-bold">
            <Database className="w-4 h-4 text-violet-400" /> Dynamic Vector Skill Library
          </div>

          <div className="space-y-2.5">
            {Object.entries(skills).map(([key, item]) => (
              <button
                key={key}
                onClick={() => setSelectedSkill(key)}
                className={`w-full p-4 rounded-2xl text-left transition border space-y-2 ${
                  selectedSkill === key
                    ? 'bg-violet-950/40 border-violet-400 text-white shadow-lg shadow-violet-500/10'
                    : 'bg-white/[0.02] border-white/5 text-slate-400 hover:bg-white/[0.05] hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs font-mono">{item.title}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono font-bold">
                    VERIFIED
                  </span>
                </div>
                <div className="font-mono text-[11px] text-violet-300 truncate">{item.signature}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Synthesis Details & Performance Gain */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 rounded-3xl bg-black/60 border border-white/10 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-mono text-violet-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <FileCode className="w-4 h-4" /> Synthesized Python Playwright Skill
              </span>
              <span className="text-[11px] font-mono text-emerald-400">Headless Execution</span>
            </div>

            <pre className="p-4 rounded-2xl bg-[#050811] border border-white/5 font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed">
{`async def ${skills[selectedSkill].signature}:
    """Synthesized by SkillWeaver from exploratory trajectories."""
    await page.goto("https://www.travel-site.com")
    await page.locator("#origin-input").fill(origin)
    await page.locator("#dest-input").fill(destination)
    await page.locator("#date-picker").click()
    await page.locator(f"[aria-label='{date}']").click()
    await page.locator("#search-btn").click()
    await page.wait_for_selector(".results-container")
    return await extract_lowest_fare(page)`}
            </pre>

            {/* Performance Impact Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                <div className="text-[10px] font-mono uppercase text-slate-400">Latency Reduction</div>
                <div className="text-xs font-bold text-emerald-400 font-mono">
                  {skills[selectedSkill].latencyBefore} → <span className="text-white">{skills[selectedSkill].latencyAfter}</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                <div className="text-[10px] font-mono uppercase text-slate-400">Token Efficiency</div>
                <div className="text-xs font-bold text-sky-400 font-mono">
                  {skills[selectedSkill].tokensSaved} saved
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                <div className="text-[10px] font-mono uppercase text-slate-400">Reliability</div>
                <div className="text-xs font-bold text-purple-400 font-mono">
                  99.8% Deterministic
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
