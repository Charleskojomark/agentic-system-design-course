import React, { useState, useEffect } from 'react';
import { courseData } from './data/courseData';
import { useProgress } from './context/ProgressContext';
import { useTheme } from './context/ThemeContext';
import { Header } from './components/common/Header';
import { GlossaryModal } from './components/common/GlossaryText';
import { ProgressMapModal } from './components/common/ProgressMapModal';
import { CertificateModal } from './components/certificate/CertificateModal';
import { InteractiveQuiz } from './components/quiz/InteractiveQuiz';
import { BossChallengeView } from './components/interactive/BossChallenge';

// Visual Simulators
import { HookInteractiveSimulation } from './components/interactive/HookInteractiveSimulation';
import { PerceiveReasonActLoop, ModelVsAgentComparison, DecisionTreeFlowchart } from './components/interactive/Module1Visuals';
import { ThreePillarsDiagram, ToolBuilderSandbox } from './components/interactive/Module2Visuals';
import { MemoryInTheLoopVisualizer, ThreeTierMemoryExploration } from './components/interactive/Module3Visuals';
import { OrchestrationPatternsGallery } from './components/interactive/Module4Visuals';
import { LayeredDefenseVisualizer, HumanOversightAnalogy } from './components/interactive/Module5Visuals';
import { ProductionChallengesHexMap, ProductionChecklistInteractive } from './components/interactive/Module6Visuals';
import { MACRSActPlanningVisualizer, MACRSReflectionVisualizer, MACRSEvaluationVisualizer } from './components/interactive/Module7Visuals';
import { CRMAgentStudio } from './components/interactive/Module8Visuals';
import { EurekaEvolutionLoopVisualizer, EurekaReflectionDiagnostic } from './components/interactive/Module9Visuals';
import { ADKPipelineVisualizer, BraxCheetahSimulationVisualizer } from './components/interactive/Module10Visuals';
import { ChainBuddyIntakeSimulator, LangGraphPipelineGenerator } from './components/interactive/Module11Visuals';
import { WebVoyagerReActSimulator, SkillWeaverAutonomousLibrary } from './components/interactive/Module12Visuals';
import { MuLanProgressiveDiffusionSimulator, CompositionalBenchmarkVisualizer } from './components/interactive/Module13Visuals';
import { AIHospitalSimulationStudio, OpenClawAssistantArchitecture } from './components/interactive/Module14Visuals';
import { AgentTaxonomyInteractiveExplorer, FrameworkComparisonAndWorkflowStudio } from './components/interactive/Module15Visuals';
import { FDEOperatingModelExplorer, ModelVsDeploymentFailureDiagnostic } from './components/interactive/Module16Visuals';
import { CustomerDiscoveryWorkbench, TranslationLadderAndPOCSimulator } from './components/interactive/Module17Visuals';
import { PilotReadinessAndShadowModeStudio, DeploymentHandoffAndHITLGateway } from './components/interactive/Module18Visuals';
import { HarnessEngineeringCockpit, OrchestrationTopologyAndFrameworkSelector } from './components/interactive/Module19Visuals';
import { CodeInContextViewer } from './components/interactive/CodeInContextViewer';
import { UserAuthModal } from './components/common/UserAuthModal';

import {
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Code,
  Sparkles,
  BookOpen,
  HelpCircle,
  Award,
  Zap,
  Eye,
  Clock,
  Target,
  ArrowRight
} from 'lucide-react';

const MODULE_TAGLINES: Record<number, string> = {
  1: 'From passive text prediction to autonomous systems that perceive, reason, and act.',
  2: 'The three architectural pillars: reasoning model, external tools, and system instructions.',
  3: 'Environmental sensing and state management across short-term, long-term, and external memory.',
  4: 'Single-agent execution loops (ReAct, Plan-and-Execute) and multi-agent coordination patterns.',
  5: 'Defense-in-depth safety: input/output guardrails, tool constraints, and human oversight.',
  6: 'Bridging the lab-to-production gap: latency, hallucination, state recovery, and evaluation.',
  7: 'MACRS Case Study: specialized responder agents, central planner, and closed-loop reflection.',
  8: 'Capstone Studio: Design and evaluate a production-ready CRM Agent with tool calling & HITL guardrails.',
  9: 'Eureka Case Study: Meta-level agency, zero-shot reward programming, evolutionary search, and Isaac Gym simulation.',
  10: 'Hands-On ADK Pipeline: Build a modular reward evolution system with Google ADK, Brax physics, and parallel GPU evaluation.',
  11: 'ChainBuddy Case Study: Solving the blank page problem with heterogeneous model tiering and LangGraph pipeline generation.',
  12: 'WebVoyager Case Study: Multimodal web agents, grounded action with Set-of-Mark prompting, and Playwright execution.',
  13: 'MuLan Case Study: Overcoming one-shot limitations with LLM planning, progressive diffusion, and VLM feedback.',
  14: 'Autonomous Systems: Closed-loop clinical diagnosis (AI Hospital) and 24/7 persistent assistant infrastructure (OpenClaw).',
  15: 'The Production Architect: Comprehensive agent taxonomies, architecture patterns, and enterprise frameworks.',
  16: 'The Forward Deployed Engineer: Bridging frontier AI capability to enterprise operational fit.',
  17: 'FDE Lifecycle: Technical discovery, the 5-level translation ladder, and time-boxed POC sprints.',
  18: 'Production Readiness: Live shadow-mode pilots, enterprise compliance, and maintainable handoffs.',
  19: 'Harness Engineering: Production runtimes, dual-tier memory, guardrails, and orchestration topologies.',
};


export default function App() {
  const { progress, completeBeat, completeModule } = useProgress();

  const [activeModuleId, setActiveModuleId] = useState<number>(1);
  const [activeLessonIdx, setActiveLessonIdx] = useState<number>(0);
  const [activeBeat, setActiveBeat] = useState<number>(0);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState<boolean>(false);
  const [isMapOpen, setIsMapOpen] = useState<boolean>(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState<boolean>(false);
  const [isUserAuthOpen, setIsUserAuthOpen] = useState<boolean>(false);
  const [showPlainEnglish, setShowPlainEnglish] = useState<boolean>(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({ 'sec-0': true });

  const currentModule = courseData.find(m => m.id === activeModuleId) || courseData[0];
  const currentLesson = currentModule.lessons[activeLessonIdx] || currentModule.lessons[0];

  const beats = [
    { id: 'hook', num: '01', label: 'The Hook', icon: Eye },
    { id: 'big-idea', num: '02', label: 'The Big Idea', icon: Sparkles },
    { id: 'visual', num: '03', label: 'Interactive Simulator', icon: Zap },
    { id: 'deep-dive', num: '04', label: 'Deep Dive', icon: BookOpen },
    { id: 'code', num: '05', label: 'Architecture Code', icon: Code },
    { id: 'quiz', num: '06', label: 'Checkpoint Quiz', icon: HelpCircle },
    { id: 'recap', num: '07', label: 'Boss Challenge', icon: Award },
  ];

  // Auto-mark beat completed when viewed
  useEffect(() => {
    const beatKey = `m${activeModuleId}-l${activeLessonIdx + 1}:${beats[activeBeat].id}`;
    completeBeat(beatKey);
  }, [activeModuleId, activeLessonIdx, activeBeat, completeBeat]);

  const handleNextBeat = () => {
    if (activeBeat < beats.length - 1) {
      setActiveBeat(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevBeat = () => {
    if (activeBeat > 0) {
      setActiveBeat(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const toggleSection = (id: string) => {
    setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAllSections = () => {
    const all: Record<string, boolean> = {};
    currentLesson.sections.forEach((s, idx) => {
      all[s.id || `sec-${idx}`] = true;
    });
    setExpandedSections(all);
  };

  const collapseAllSections = () => {
    setExpandedSections({});
  };

  return (
    <div className="min-h-screen bg-[#060913] text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white relative w-full overflow-x-hidden">
      <div className="ambient-glow" />

      {/* Top Floating Glass Header */}
      <Header
        activeModuleId={activeModuleId}
        onSelectModule={id => {
          setActiveModuleId(id);
          setActiveLessonIdx(0);
          setActiveBeat(0);
        }}
        onOpenGlossary={() => setIsGlossaryOpen(true)}
        onOpenMap={() => setIsMapOpen(true)}
        onOpenCertificate={() => setIsCertificateOpen(true)}
        onOpenUserAuth={() => setIsUserAuthOpen(true)}
      />

      {/* Main Learning Canvas */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-3 sm:px-6 py-6 sm:py-12 space-y-6 sm:space-y-8 relative z-10">
        
        {/* Module Header Stage */}
        <div className="text-center space-y-3 sm:space-y-4 pt-1 sm:pt-2">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-400 text-[11px] sm:text-xs font-mono font-semibold max-w-full truncate">
            <span>MOD {String(currentModule.id).padStart(2, '0')}</span>
            <span>•</span>
            <span className="truncate">{currentModule.title.toUpperCase()}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight px-1">
            {currentLesson.title}
          </h1>

          <p className="text-xs sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed px-2">
            {MODULE_TAGLINES[currentModule.id] || currentModule.subtitle}
          </p>

          <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 pt-1 text-[11px] sm:text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-indigo-400" /> ~15 min
            </span>
            <span className="opacity-40">•</span>
            <span className="flex items-center gap-1">
              <Target className="w-3.5 h-3.5 text-emerald-400" /> {currentLesson.objectives.length} Milestones
            </span>
            <span className="opacity-40">•</span>
            <span className="flex items-center gap-1 text-amber-400 font-bold">
              ★ +150 XP
            </span>
          </div>

          {/* Sub-Lesson Selector Tabs if module has multiple lessons */}
          {currentModule.lessons.length > 1 && (
            <div className="pt-2 flex items-center justify-center gap-2 flex-wrap">
              {currentModule.lessons.map((les, lIdx) => (
                <button
                  key={les.id}
                  onClick={() => {
                    setActiveLessonIdx(lIdx);
                    setActiveBeat(0);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition border ${
                    activeLessonIdx === lIdx
                      ? 'bg-pink-500/20 text-pink-300 border-pink-500/50 shadow-md ring-1 ring-pink-400/30'
                      : 'bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 border-white/10 hover:text-slate-200'
                  }`}
                >
                  <span className="font-mono text-pink-400 mr-1.5">{String(lIdx + 1).padStart(2, '0')}</span>
                  <span>{les.title.split(':')[0]}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 7-Beat Step Navigation Track */}
        <div className="p-1.5 sm:p-2 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-xl shadow-xl">
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar snap-x snap-mandatory py-0.5 px-0.5">
            {beats.map((b, idx) => {
              const isCurrent = activeBeat === idx;
              const beatKey = `m${activeModuleId}-l${activeLessonIdx + 1}:${b.id}`;
              const isCompleted = progress.completedBeats.includes(beatKey);
              const Icon = b.icon;

              return (
                <button
                  key={b.id}
                  onClick={() => {
                    setActiveBeat(idx);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`flex-1 min-w-[100px] sm:min-w-[120px] p-2 sm:p-2.5 rounded-xl text-left transition-all duration-200 border snap-start shrink-0 ${
                    isCurrent
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-transparent shadow-lg shadow-indigo-500/25 ring-1 ring-white/20'
                      : isCompleted
                      ? 'bg-emerald-950/20 text-emerald-300 border-emerald-500/30 hover:bg-emerald-950/40'
                      : 'bg-white/[0.02] text-slate-400 border-white/5 hover:bg-white/[0.05] hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${isCurrent ? 'bg-black/30 text-white' : 'bg-white/10 text-slate-400'}`}>
                      {b.num}
                    </span>
                    {isCompleted ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Icon className="w-3.5 h-3.5 opacity-60" />
                    )}
                  </div>
                  <div className="font-semibold text-[11px] sm:text-xs truncate">
                    {b.label}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Beat Interactive Container */}
        <div className="space-y-6">
          
          {/* BEAT 1: HOOK */}
          {activeBeat === 0 && (
            <HookInteractiveSimulation
              hookText={currentLesson.hook}
              objectives={currentLesson.objectives}
            />
          )}

          {/* BEAT 2: BIG IDEA */}
          {activeBeat === 1 && (
            <div className="rounded-3xl bg-slate-900/80 border border-white/10 p-6 sm:p-10 shadow-2xl backdrop-blur-xl space-y-6 animate-fade-in">
              <div className="flex items-center justify-between flex-wrap gap-3 border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400">
                  <Sparkles className="w-4 h-4" /> Core Mental Model
                </div>
                <button
                  onClick={() => setShowPlainEnglish(!showPlainEnglish)}
                  className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 transition shadow-sm"
                >
                  <span>💡</span>
                  <span>{showPlainEnglish ? 'Show Technical Definition' : 'Explain In Plain English'}</span>
                </button>
              </div>

              <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-slate-900 to-purple-950/30 border border-indigo-500/30 shadow-inner">
                <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 font-bold block mb-3">
                  {showPlainEnglish ? 'Intuitive Metaphor' : 'Architectural System Definition'}
                </span>
                <p className="text-lg sm:text-xl font-medium leading-relaxed text-white">
                  {showPlainEnglish ? currentLesson.plainEnglish : currentLesson.bigIdea}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span>Want to dive into the technical details?</span>
                <button
                  onClick={() => setActiveBeat(3)}
                  className="text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1"
                >
                  Skip to Deep Dive <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* BEAT 3: VISUAL EXPLAINER */}
          {activeBeat === 2 && (
            <div className="space-y-6 animate-fade-in">
              {activeModuleId === 1 && (
                <>
                  <PerceiveReasonActLoop />
                  <ModelVsAgentComparison />
                  <DecisionTreeFlowchart />
                </>
              )}

              {activeModuleId === 2 && (
                <>
                  <ThreePillarsDiagram />
                  <ToolBuilderSandbox />
                </>
              )}

              {activeModuleId === 3 && (
                <>
                  <MemoryInTheLoopVisualizer />
                  <ThreeTierMemoryExploration />
                </>
              )}

              {activeModuleId === 4 && (
                <>
                  <OrchestrationPatternsGallery />
                </>
              )}

              {activeModuleId === 5 && (
                <>
                  <LayeredDefenseVisualizer />
                  <HumanOversightAnalogy />
                </>
              )}

              {activeModuleId === 6 && (
                <>
                  <ProductionChallengesHexMap />
                  <ProductionChecklistInteractive />
                </>
              )}

              {activeModuleId === 7 && (
                <>
                  <MACRSActPlanningVisualizer />
                  <MACRSReflectionVisualizer />
                  <MACRSEvaluationVisualizer />
                </>
              )}

              {activeModuleId === 8 && (
                <>
                  <CRMAgentStudio />
                </>
              )}

              {activeModuleId === 9 && (
                <>
                  <EurekaEvolutionLoopVisualizer />
                  <EurekaReflectionDiagnostic />
                </>
              )}

              {activeModuleId === 10 && (
                <>
                  <ADKPipelineVisualizer />
                  <BraxCheetahSimulationVisualizer />
                </>
              )}

              {activeModuleId === 11 && (
                <>
                  <ChainBuddyIntakeSimulator />
                  <LangGraphPipelineGenerator />
                </>
              )}

              {activeModuleId === 12 && (
                <>
                  <WebVoyagerReActSimulator />
                  <SkillWeaverAutonomousLibrary />
                </>
              )}

              {activeModuleId === 13 && (
                <>
                  <MuLanProgressiveDiffusionSimulator />
                  <CompositionalBenchmarkVisualizer />
                </>
              )}

              {activeModuleId === 14 && (
                <>
                  <AIHospitalSimulationStudio />
                  <OpenClawAssistantArchitecture />
                </>
              )}

              {activeModuleId === 15 && (
                <>
                  <AgentTaxonomyInteractiveExplorer />
                  <FrameworkComparisonAndWorkflowStudio />
                </>
              )}

              {activeModuleId === 16 && (
                <>
                  <FDEOperatingModelExplorer />
                  <ModelVsDeploymentFailureDiagnostic />
                </>
              )}

              {activeModuleId === 17 && (
                <>
                  <CustomerDiscoveryWorkbench />
                  <TranslationLadderAndPOCSimulator />
                </>
              )}

              {activeModuleId === 18 && (
                <>
                  <PilotReadinessAndShadowModeStudio />
                  <DeploymentHandoffAndHITLGateway />
                </>
              )}

              {activeModuleId === 19 && (
                <>
                  <HarnessEngineeringCockpit />
                  <OrchestrationTopologyAndFrameworkSelector />
                </>
              )}
            </div>
          )}

          {/* BEAT 4: DEEP DIVE */}
          {activeBeat === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between flex-wrap gap-3 p-4 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-xl">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
                  <BookOpen className="w-4 h-4" />
                  <span>Beat 04: Scannable Deep Dive</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-300 font-sans">{currentLesson.sections.length} Core Topics</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={expandAllSections}
                    className="px-3 py-1 rounded-xl text-xs font-semibold bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border border-white/10 transition"
                  >
                    Expand All
                  </button>
                  <button
                    onClick={collapseAllSections}
                    className="px-3 py-1 rounded-xl text-xs font-semibold bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border border-white/10 transition"
                  >
                    Collapse All
                  </button>
                </div>
              </div>

              {currentLesson.sections.map((section, idx) => {
                const secId = section.id || `sec-${idx}`;
                const isExpanded = !!expandedSections[secId];

                return (
                  <div
                    key={secId}
                    className="rounded-3xl bg-slate-900/80 border border-white/10 shadow-xl backdrop-blur-xl overflow-hidden transition-all duration-200"
                  >
                    <button
                      onClick={() => toggleSection(secId)}
                      className="w-full p-6 sm:p-7 flex items-center justify-between gap-4 text-left hover:bg-white/[0.02] transition"
                    >
                      <div className="flex items-center gap-3.5">
                        <span className="text-2xl p-2.5 rounded-2xl bg-white/5 border border-white/10 shrink-0">
                          {section.icon}
                        </span>
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 font-bold block">
                            SECTION 0{idx + 1}
                          </span>
                          <h3 className="font-bold text-base sm:text-lg text-white">
                            {section.title}
                          </h3>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
                          {isExpanded ? 'Collapse' : 'Expand'}
                        </span>
                        <div className="p-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-400">
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="px-6 pb-6 sm:px-7 sm:pb-7 pt-2 border-t border-white/5 space-y-4 animate-fade-in">
                        <p className="text-sm leading-relaxed text-slate-300">
                          {section.content}
                        </p>

                        {section.subsections && section.subsections.length > 0 && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
                            {section.subsections.map((sub, sIdx) => (
                              <div
                                key={sIdx}
                                className="p-4 rounded-2xl bg-black/40 border border-white/5 text-xs space-y-1.5"
                              >
                                <h5 className="font-bold text-indigo-300 text-xs">
                                  {sub.title}
                                </h5>
                                <p className="text-slate-400 leading-relaxed">
                                  {sub.content}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* BEAT 5: CODE IN CONTEXT */}
          {activeBeat === 4 && (
            <CodeInContextViewer moduleId={activeModuleId} />
          )}

          {/* BEAT 6: CHECKPOINT QUIZ */}
          {activeBeat === 5 && (
            <div className="space-y-6 animate-fade-in">
              <InteractiveQuiz
                lessonId={currentLesson.id}
                questions={currentLesson.quiz}
                onComplete={() => {}}
              />
            </div>
          )}

          {/* BEAT 7: RECAP & BOSS CHALLENGE */}
          {activeBeat === 6 && (
            <div className="space-y-6 animate-fade-in">
              <div className="rounded-3xl bg-slate-900/80 border border-white/10 p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 border-b border-white/10 pb-3">
                  <CheckCircle2 className="w-4 h-4" /> Lesson Recap & Core Takeaways
                </div>

                <div className="space-y-3">
                  {currentLesson.recap.map((bullet, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-black/40 border border-white/5 text-xs sm:text-sm flex items-start gap-3.5 text-slate-200"
                    >
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shrink-0">
                        #{idx + 1}
                      </span>
                      <span className="leading-relaxed">{bullet}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 text-xs text-slate-400 italic">
                  Next Concept: {currentLesson.nextUp}
                </div>
              </div>

              <BossChallengeView
                moduleId={currentModule.id}
                onSuccess={() => {
                  completeModule(currentModule.id);
                }}
              />
            </div>
          )}
        </div>

        {/* Floating Bottom Navigation Toolbar */}
        <div className="p-3 sm:p-4 rounded-2xl bg-slate-900/90 border border-white/10 backdrop-blur-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xl">
          <div className="text-xs text-slate-400 font-mono text-center sm:text-left w-full sm:w-auto">
            Beat {activeBeat + 1} of 7: <strong className="text-white">{beats[activeBeat].label}</strong>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2.5 w-full sm:w-auto">
            <button
              onClick={handlePrevBeat}
              disabled={activeBeat === 0}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-white/[0.04] hover:bg-white/[0.08] disabled:opacity-30 disabled:pointer-events-none text-slate-300 border border-white/10 transition"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={handleNextBeat}
              disabled={activeBeat === beats.length - 1}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-30 disabled:pointer-events-none text-white shadow-lg shadow-indigo-500/25 transition"
            >
              <span>Next Beat</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>

      {/* Global Modals */}
      <GlossaryModal isOpen={isGlossaryOpen} onClose={() => setIsGlossaryOpen(false)} />
      <ProgressMapModal
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        onSelectModule={modId => {
          setActiveModuleId(modId);
          setActiveLessonIdx(0);
          setActiveBeat(0);
        }}
      />
      <CertificateModal isOpen={isCertificateOpen} onClose={() => setIsCertificateOpen(false)} />
      <UserAuthModal isOpen={isUserAuthOpen} onClose={() => setIsUserAuthOpen(false)} />
    </div>
  );
}
