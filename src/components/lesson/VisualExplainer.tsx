import React from 'react';
import { StepThroughDiagram } from '../interactive/StepThroughDiagram';
import { ComparisonSlider } from '../interactive/ComparisonSlider';
import { ClickableArchDiagram } from '../interactive/ClickableArchDiagram';
import { ProgressiveTimeline } from '../interactive/ProgressiveTimeline';
import { DecisionTree } from '../interactive/DecisionTree';
import { DragDropBuilder } from '../interactive/DragDropBuilder';
import { PromptInspector } from '../interactive/PromptInspector';
import { MeetingSchedulingTrace } from '../interactive/MeetingSchedulingTrace';
import { MemoryTierDiagram } from '../interactive/MemoryTierDiagram';
import { AgentLoopMemoryFlow } from '../interactive/AgentLoopMemoryFlow';
import { CaseStudyNotepad } from '../interactive/CaseStudyNotepad';
import { OrchestrationPatternGallery } from '../interactive/OrchestrationPatternGallery';
import { OrchestrationDecisionMatrix } from '../interactive/OrchestrationDecisionMatrix';
import { LayeredDefenseDiagram } from '../interactive/LayeredDefenseDiagram';
import { HumanOversightComparison } from '../interactive/HumanOversightComparison';
import { SafetyUtilitySlider } from '../interactive/SafetyUtilitySlider';
import { HexGrid } from '../interactive/HexGrid';
import { InteractiveChecklist } from '../interactive/InteractiveChecklist';

interface VisualExplainerProps {
  lessonId: string;
  accentColor: string;
}

export const VisualExplainer: React.FC<VisualExplainerProps> = ({ lessonId, accentColor }) => {
  return (
    <section className="my-6">
      <div className="flex items-center gap-2 mb-3">
        <span
          className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border"
          style={{
            backgroundColor: `${accentColor}15`,
            borderColor: `${accentColor}40`,
            color: accentColor,
          }}
        >
          Beat 3 • Interactive Visual Explainer
        </span>
      </div>

      {lessonId === 'lesson-1-intro-to-agents' && (
        <div className="space-y-6">
          <StepThroughDiagram />
          <ComparisonSlider />
          <ClickableArchDiagram mode="categories" />
          <ProgressiveTimeline />
          <DecisionTree />
        </div>
      )}

      {lessonId === 'lesson-2-core-components' && (
        <div className="space-y-6">
          <ClickableArchDiagram mode="components" />
          <DragDropBuilder />
          <PromptInspector />
          <MeetingSchedulingTrace />
        </div>
      )}

      {lessonId === 'lesson-3-memory-perception' && (
        <div className="space-y-6">
          <AgentLoopMemoryFlow />
          <MemoryTierDiagram />
          <CaseStudyNotepad />
        </div>
      )}

      {lessonId === 'lesson-4-orchestration' && (
        <div className="space-y-6">
          <OrchestrationPatternGallery />
          <OrchestrationDecisionMatrix />
        </div>
      )}

      {lessonId === 'lesson-5-guardrails' && (
        <div className="space-y-6">
          <LayeredDefenseDiagram />
          <HumanOversightComparison />
          <SafetyUtilitySlider />
        </div>
      )}

      {lessonId === 'lesson-6-production-readiness' && (
        <div className="space-y-6">
          <HexGrid />
          <InteractiveChecklist />
        </div>
      )}
    </section>
  );
};
