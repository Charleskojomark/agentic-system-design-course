import React, { useState } from 'react';
import { Terminal, Copy, Check, Sparkles, HelpCircle, Info } from 'lucide-react';

export interface CodeLineAnnotation {
  line: number;
  code: string;
  concept: string;
  explanation: string;
  keyTakeaway: string;
}

export interface ModuleCodeSample {
  moduleId: number;
  filename: string;
  description: string;
  lines: CodeLineAnnotation[];
}

const MODULE_CODE_SAMPLES: Record<number, ModuleCodeSample> = {
  1: {
    moduleId: 1,
    filename: 'agent_perceive_reason_act.ts',
    description: 'Implements the foundational Perceive-Reason-Act loop contrasting an active agent against a passive model.',
    lines: [
      { line: 1, code: `import { LLMClient, ToolRegistry, EnvironmentSensor } from '@agentic/core';`, concept: 'Agent Core Imports', explanation: 'Imports the three fundamental building blocks: reasoning brain (LLM), external capabilities (Tools), and environmental inputs (Sensors).', keyTakeaway: 'Agents require distinct components for perception, reasoning, and action.' },
      { line: 2, code: ``, concept: 'Spacing', explanation: 'Modular separation of concerns.', keyTakeaway: 'Clean architecture.' },
      { line: 3, code: `export async function runAgenticCycle(rawSignal: EnvironmentalEvent) {`, concept: 'Autonomy Trigger', explanation: 'Unlike a passive model waiting for a prompt, the agent wakes up from environmental signals or scheduled triggers.', keyTakeaway: 'Autonomy allows agents to initiate action without continuous human intervention.' },
      { line: 4, code: `  // 1. Perception: Parse and structure raw environmental inputs`, concept: 'Perception Phase', explanation: 'The agent senses its environment by reading text, parsing OCR, or listening to telemetry APIs to extract meaningful signals.', keyTakeaway: 'Perception transforms unstructured sensory input into grounded structured facts.' },
      { line: 5, code: `  const observation = await EnvironmentSensor.extractMeaning(rawSignal);`, concept: 'Sensing & Context Extraction', explanation: 'Converts raw sensor data or user input into an internal contextual representation the LLM can reason over.', keyTakeaway: 'Grounded perception prevents hallucination before reasoning begins.' },
      { line: 6, code: ``, concept: 'Spacing', explanation: 'Transition.', keyTakeaway: 'Flow.' },
      { line: 7, code: `  // 2. Reasoning: Multi-step deliberative planning via LLM`, concept: 'Deliberative Reasoning', explanation: 'The LLM evaluates the observation against the predefined goal and chooses whether to invoke tools or respond.', keyTakeaway: 'LLMs provide zero-shot generalization and compositional reasoning.' },
      { line: 8, code: `  const decision = await LLMClient.reason({`, concept: 'Model Invocation', explanation: 'Calls the reasoning core with current observation, goal, and available tool descriptions.', keyTakeaway: 'The model acts as the brain making deliberate architectural choices.' },
      { line: 9, code: `    observation,`, concept: 'Current State', explanation: 'Provides what was just perceived in the environment.', keyTakeaway: 'Grounding in active reality.' },
      { line: 10, code: `    availableTools: ToolRegistry.getSchemas(),`, concept: 'Action Space', explanation: 'Supplies the JSON schemas of all actions the agent is permitted to execute.', keyTakeaway: 'Tools define what the agent is capable of doing in the external world.' },
      { line: 11, code: `  });`, concept: 'Decision Output', explanation: 'Produces either a tool execution command or a completed goal status.', keyTakeaway: 'Structured output ensures deterministic execution.' },
      { line: 12, code: ``, concept: 'Spacing', explanation: 'Transition.', keyTakeaway: 'Step demarcation.' },
      { line: 13, code: `  // 3. Action Execution: Grounded action modifying the external world`, concept: 'Action Execution', explanation: 'The agent triggers external APIs, updates databases, or sends messages based on its reasoned plan.', keyTakeaway: 'Actions differentiate active agents from passive calculators or classifiers.' },
      { line: 14, code: `  const outcome = await ToolRegistry.execute(decision.selectedTool, decision.args);`, concept: 'Tool Dispatcher', explanation: 'Safely executes the chosen tool and captures the environmental outcome for the next feedback loop.', keyTakeaway: 'The agent feedback loop continues as actions alter the environment.' },
      { line: 15, code: `  return outcome;`, concept: 'Loop Completion', explanation: 'Returns execution state back to the agentic feedback cycle.', keyTakeaway: 'Continuous feedback loop powers adaptive intelligence.' },
      { line: 16, code: `}`, concept: 'Function Close', explanation: 'End of autonomous cycle.', keyTakeaway: 'Modular, testable agent execution.' },
    ],
  },
  2: {
    moduleId: 2,
    filename: 'agent_core_components.ts',
    description: 'Defines the 3 foundational pillars of modular agent architecture: Model, Tools, and Instructions.',
    lines: [
      { line: 1, code: `import { AgentDefinition, ToolSchema } from '@agentic/core';`, concept: 'Modular Architecture', explanation: 'Imports architectural types supporting modular swapping of models, tools, and instructions.', keyTakeaway: 'Modularity enables upgrading models or adding tools without rewriting the whole system.' },
      { line: 2, code: ``, concept: 'Spacing', explanation: 'Code hygiene.', keyTakeaway: 'Clear boundaries.' },
      { line: 3, code: `// PILLAR 1: Instructions (Shaping behavior, persona, and ethical boundaries)`, concept: 'Pillar 1: Instructions', explanation: 'System prompt providing the agent compass, ethical boundaries, and operational constraints.', keyTakeaway: 'Instructions are the bridge between raw capability and purposeful, aligned behavior.' },
      { line: 4, code: `const systemInstructions = \`You are an enterprise logistics concierge.`, concept: 'Persona Definition', explanation: 'Establishes the agent domain identity and tone.', keyTakeaway: 'Clear instructions set user expectations and prevent drift.' },
      { line: 5, code: `Always prioritize shipment security, confirm bookings above $5,000,`, concept: 'Safety Constraints', explanation: 'Injects domain rules directly into the decision policy.', keyTakeaway: 'Explicit instructions enforce safety limits.' },
      { line: 6, code: `and verify warehouse capacity before dispatching manifests.\`;`, concept: 'Operational Preconditions', explanation: 'Instructs the model to check prerequisites before executing actions.', keyTakeaway: 'Reduces unauthorized or erroneous tool calls.' },
      { line: 7, code: ``, concept: 'Spacing', explanation: 'Separating components.', keyTakeaway: 'Separation of concerns.' },
      { line: 8, code: `// PILLAR 2: Tools (External capabilities that let the agent act)`, concept: 'Pillar 2: Tools', explanation: 'Gives the agent power to interact with external APIs, databases, or physical actuators.', keyTakeaway: 'Without tools, an agent can only simulate actions in text; tools make it useful in practice.' },
      { line: 9, code: `const dispatchFleetTool: ToolSchema = {`, concept: 'Standardized Schema', explanation: 'A standardized JSON schema specifying parameters, types, and descriptions for the LLM.', keyTakeaway: 'Standardized schemas ensure the model generates valid tool arguments.' },
      { line: 10, code: `  name: 'dispatch_fleet',`, concept: 'Tool Identifier', explanation: 'Unique identifier used by the LLM function calling mechanism.', keyTakeaway: 'Allows unambiguous selection during reasoning.' },
      { line: 11, code: `  description: 'Dispatches available freight trucks to specified coordinates',`, concept: 'Semantic Description', explanation: 'The LLM reads this description to understand when and why to invoke this tool.', keyTakeaway: 'Clear semantic descriptions are critical for accurate tool selection.' },
      { line: 12, code: `  parameters: { type: 'object', properties: { truckId: { type: 'string' } } }`, concept: 'Argument Validation Schema', explanation: 'Enforces strict validation on arguments passed by the model.', keyTakeaway: 'Argument validation prevents malformed API payloads.' },
      { line: 13, code: `};`, concept: 'Tool Definition End', explanation: 'Close of tool object.', keyTakeaway: 'Declarative tool registry.' },
      { line: 14, code: ``, concept: 'Spacing', explanation: 'Separation.', keyTakeaway: 'Clean boundaries.' },
      { line: 15, code: `// PILLAR 3: Model Selection (The reasoning brain tailored to complexity & latency)`, concept: 'Pillar 3: Model', explanation: 'Choosing the right reasoning engine based on task complexity, latency, context window, and cost.', keyTakeaway: 'Do not always default to the largest LLM; pick what matches the task complexity.' },
      { line: 16, code: `export const logisticsAgent = new AgentDefinition({`, concept: 'Agent Instantiation', explanation: 'Binds the three pillars into a unified, maintainable agent instance.', keyTakeaway: 'Modular composition ensures fault isolation and easy model swapping.' },
      { line: 17, code: `  model: 'gemini-1.5-pro', // Long context for freight manifests`, concept: 'Model Configuration', explanation: 'Selected for extended context window and structured output reasoning capabilities.', keyTakeaway: 'Match context length and reasoning depth to domain requirements.' },
      { line: 18, code: `  instructions: systemInstructions,`, concept: 'Instruction Binding', explanation: 'Attaches the guiding behavior framework to every inference turn.', keyTakeaway: 'System messages maintain tone and safety boundaries.' },
      { line: 19, code: `  tools: [dispatchFleetTool],`, concept: 'Tool Registry', explanation: 'Exposes external APIs to the agent.', keyTakeaway: 'Extensible toolset allows expanding agent capability over time.' },
      { line: 20, code: `});`, concept: 'Definition Close', explanation: 'Agent ready for deployment.', keyTakeaway: 'Production-ready modular building block.' },
    ],
  },
  3: {
    moduleId: 3,
    filename: 'agent_memory_loop.ts',
    description: 'Implements the complete 5-stage loop: Perceive -> Recall -> Reason -> Act -> Store with 3-tier memory.',
    lines: [
      { line: 1, code: `import { ShortTermBuffer, VectorDBLongTerm, KnowledgeBaseRAG } from '@agentic/memory';`, concept: 'Three-Tier Memory Architecture', explanation: 'Imports short-term session buffer, long-term semantic storage, and external RAG knowledge base.', keyTakeaway: 'Multi-tiered memory equips agents for both instant conversation and multi-session continuity.' },
      { line: 2, code: ``, concept: 'Spacing', explanation: 'Separation.', keyTakeaway: 'Structure.' },
      { line: 3, code: `export async function executeContextAwareCycle(userQuery: string, userId: string) {`, concept: 'Stateful Cycle', explanation: 'A persistent session loop maintaining context across turns and days.', keyTakeaway: 'Memory prevents the agent from repeating questions or forgetting prior agreements.' },
      { line: 4, code: `  // STAGE 1: Perceive - Ingest incoming prompt`, concept: 'Stage 1: Perceive', explanation: 'Extracts user intent and identifies entity parameters from natural language.', keyTakeaway: 'Perception initiates the cognitive cycle.' },
      { line: 5, code: `  const intent = parseInput(userQuery);`, concept: 'Intent Parsing', explanation: 'Extracts semantic tokens used for vector similarity lookup.', keyTakeaway: 'Query representation guides memory recall.' },
      { line: 6, code: ``, concept: 'Spacing', explanation: 'Transition.', keyTakeaway: 'Clarity.' },
      { line: 7, code: `  // STAGE 2: Recall - Query 3-tier memory before reasoning`, concept: 'Stage 2: Recall', explanation: 'Retrieves relevant memories before the model decides what to do.', keyTakeaway: 'Retrieval occurs BEFORE reasoning to ground the LLM in historical facts.' },
      { line: 8, code: `  const recentTurns = await ShortTermBuffer.getConversation(userId, { maxTurns: 5 });`, concept: 'Short-Term Memory', explanation: 'In-session context window preserving immediate dialogue history.', keyTakeaway: 'Short-term memory maintains conversation coherence.' },
      { line: 9, code: `  const userProfile = await VectorDBLongTerm.searchSimilar(userId, intent.embedding);`, concept: 'Long-Term Memory', explanation: 'Persistent vector database storing past preferences and completed tasks across sessions.', keyTakeaway: 'Vector databases enable semantic retrieval without exact keyword matches.' },
      { line: 10, code: `  const companyDocs = await KnowledgeBaseRAG.queryExternalKnowledge(intent.keywords);`, concept: 'External / RAG Memory', explanation: 'Pulls facts from massive external document repositories without overloading the context window.', keyTakeaway: 'RAG grounds agent knowledge in verifiable corporate documents.' },
      { line: 11, code: ``, concept: 'Spacing', explanation: 'Transition.', keyTakeaway: 'Pipeline flow.' },
      { line: 12, code: `  // STAGE 3: Reason & Plan - LLM synthesizes input + retrieved memory`, concept: 'Stage 3: Reason', explanation: 'Combines prompt with short-term, long-term, and external memory to plan an informed response.', keyTakeaway: 'Memory grounded reasoning avoids generic or repetitive answers.' },
      { line: 13, code: `  const responsePlan = await LLM.synthesize({ prompt: userQuery, memory: { recentTurns, userProfile, companyDocs } });`, concept: 'Context Synthesis', explanation: 'The assembled context equips the LLM with full situational awareness.', keyTakeaway: 'The model reasons over the combined context.' },
      { line: 14, code: ``, concept: 'Spacing', explanation: 'Transition.', keyTakeaway: 'Clean flow.' },
      { line: 15, code: `  // STAGE 4: Act - Execute the reasoned action or reply`, concept: 'Stage 4: Act', explanation: 'Dispatches API tools or delivers the final synthesized answer to the user.', keyTakeaway: 'Actions generate real outcomes.' },
      { line: 16, code: `  const actionResult = await executeAction(responsePlan);`, concept: 'Action Invocation', explanation: 'Performs external API calls and observes the return status.', keyTakeaway: 'Tool outputs produce feedback for memory.' },
      { line: 17, code: ``, concept: 'Spacing', explanation: 'Transition.', keyTakeaway: 'Next stage.' },
      { line: 18, code: `  // STAGE 5: Store & Learn - Persist outcome for future turns`, concept: 'Stage 5: Store & Learn', explanation: 'Updates memory buffers and logs learned preferences for subsequent interactions.', keyTakeaway: 'Memory connects past steps with the future, enabling continuous adaptation.' },
      { line: 19, code: `  await ShortTermBuffer.append(userId, userQuery, actionResult);`, concept: 'Buffer Update', explanation: 'Saves current exchange into active session memory.', keyTakeaway: 'Immediate turns stay fresh.' },
      { line: 20, code: `  await VectorDBLongTerm.upsertLearnedFacts(userId, actionResult.extractedFacts);`, concept: 'Consolidation', explanation: 'Embeds and writes long-lasting preferences to persistent storage.', keyTakeaway: 'Long-term memory ensures lifelong agent intelligence.' },
      { line: 21, code: `  return actionResult;`, concept: 'Cycle Return', explanation: 'Delivers response to the user.', keyTakeaway: 'End of 5-stage loop.' },
      { line: 22, code: `}`, concept: 'Function End', explanation: 'Complete memory loop module.', keyTakeaway: 'Architecture in action.' },
    ],
  },
  4: {
    moduleId: 4,
    filename: 'orchestration_react_and_manager.ts',
    description: 'Implements single-agent ReAct (Reason + Act) loop and multi-agent Manager-Worker delegation.',
    lines: [
      { line: 1, code: `import { Agent, ManagerAgent, WorkerAgent, Tool } from '@agentic/orchestration';`, concept: 'Orchestration Framework', explanation: 'Framework primitives supporting ReAct loops, tool calling chains, and multi-agent hierarchy.', keyTakeaway: 'Orchestration patterns define how agents sequence thoughts, call tools, and delegate.' },
      { line: 2, code: ``, concept: 'Spacing', explanation: 'Formatting.', keyTakeaway: 'Clarity.' },
      { line: 3, code: `// PATTERN 1: ReAct Loop (Thought -> Action -> Observation cycle)`, concept: 'ReAct Pattern', explanation: 'Alternates explicit reasoning steps with tool actions for auditability and step-by-step transparency.', keyTakeaway: 'ReAct improves traceability because every thought and action is observable and logged.' },
      { line: 4, code: `export async function runReActLoop(goal: string, tools: Tool[]) {`, concept: 'Single-Agent ReAct', explanation: 'Executes an iterative thought-action loop until the objective is reached.', keyTakeaway: 'Ideal for exploratory search, debugging, and transparent reasoning.' },
      { line: 5, code: `  let isFinished = false;`, concept: 'Termination Flag', explanation: 'Monitors when the agent decides it has accomplished the goal.', keyTakeaway: 'Loop termination prevents infinite reasoning deadlocks.' },
      { line: 6, code: `  while (!isFinished) {`, concept: 'Deliberative Loop', explanation: 'Continuously queries the LLM with accumulated history of thoughts and observations.', keyTakeaway: 'Sequential iteration allows mid-course correction.' },
      { line: 7, code: `    const thought = await LLM.reason("Thought: What is the next logical step?");`, concept: 'Observable Thought', explanation: 'The model formulates explicit reasoning before choosing a tool.', keyTakeaway: 'Exposing thought steps aids debugging and builds user trust.' },
      { line: 8, code: `    const action = await LLM.selectTool(thought, tools);`, concept: 'Action Selection', explanation: 'Selects the specific tool and computes valid argument payloads.', keyTakeaway: 'Grounded in the immediate thought step.' },
      { line: 9, code: `    if (action.isFinalAnswer) { isFinished = true; break; }`, concept: 'Exit Condition', explanation: 'When the goal is satisfied, the agent yields the final answer.', keyTakeaway: 'Clean exit without redundant API calls.' },
      { line: 10, code: `    const observation = await action.execute();`, concept: 'Observation Phase', explanation: 'Runs the tool and feeds the observation result back into prompt context for next turn.', keyTakeaway: 'Observation provides ground truth for the next thought.' },
      { line: 11, code: `  }`, concept: 'Loop End', explanation: 'ReAct loop terminates successfully.', keyTakeaway: 'Verified step-by-step outcome.' },
      { line: 12, code: `}`, concept: 'Function End', explanation: 'ReAct implementation complete.', keyTakeaway: 'Transparent single-agent execution.' },
      { line: 13, code: ``, concept: 'Spacing', explanation: 'Pattern separation.', keyTakeaway: 'Structure.' },
      { line: 14, code: `// PATTERN 2: Manager-Worker Multi-Agent Orchestration`, concept: 'Manager-Worker Pattern', explanation: 'A central coordinator breaks down goals, delegates subtasks to specialized workers, and stitches results.', keyTakeaway: 'Mirrors real-world teams: centralized alignment with distributed specialized execution.' },
      { line: 15, code: `export async function runManagerWorkerSystem(projectGoal: string) {`, concept: 'Multi-Agent Team', explanation: 'Coordinates multiple specialized agents with dedicated models, tools, and prompts.', keyTakeaway: 'Multi-agent setups excel when tasks require distinct competencies or parallel execution.' },
      { line: 16, code: `  const manager = new ManagerAgent({ role: 'Planner & Synthesizer' });`, concept: 'Manager Agent', explanation: 'Central coordinator responsible for task decomposition, assignment, and final synthesis.', keyTakeaway: 'The manager maintains global state and shared task queues.' },
      { line: 17, code: `  const subtasks = await manager.decompose(projectGoal);`, concept: 'Goal Decomposition', explanation: 'Breaks high-level goals into parallelizable or specialized subgoals.', keyTakeaway: 'Decomposition simplifies complex multi-domain objectives.' },
      { line: 18, code: `  const workerResults = await Promise.all([`, concept: 'Parallel Worker Dispatch', explanation: 'Specialized agents execute concurrently, reducing latency.', keyTakeaway: 'Parallel execution maximizes system throughput.' },
      { line: 19, code: `    researchWorker.execute(subtasks.researchQuery),`, concept: 'Specialized Worker 1', explanation: 'Research agent searches web and document bases.', keyTakeaway: 'Specialization isolates tools and prompts.' },
      { line: 20, code: `    financeWorker.execute(subtasks.budgetAnalysis),`, concept: 'Specialized Worker 2', explanation: 'Finance agent queries internal accounting APIs.', keyTakeaway: 'Security isolation: only the finance worker has API credentials.' },
      { line: 21, code: `  ]);`, concept: 'Worker Sync', explanation: 'Awaits completion of all concurrent tasks.', keyTakeaway: 'Synchronization before synthesis.' },
      { line: 22, code: `  return await manager.synthesize(workerResults);`, concept: 'Integration & Synthesis', explanation: 'Manager stitches individual subtask answers into a cohesive, verified output.', keyTakeaway: 'Synthesis ensures consistency and fulfills the overarching objective.' },
      { line: 23, code: `}`, concept: 'System Close', explanation: 'Multi-agent workflow complete.', keyTakeaway: 'Scalable team orchestration.' },
    ],
  },
  5: {
    moduleId: 5,
    filename: 'layered_guardrails_and_hitl.ts',
    description: 'Implements concentric defensive guardrails (Input, Tool, Output) and Human-in-the-Loop approval gates.',
    lines: [
      { line: 1, code: `import { InputGuard, ToolGuard, OutputValidator, HITLApprovalGate } from '@agentic/safety';`, concept: 'Defense-in-Depth', explanation: 'Imports security modules that intercept data at every stage of the agentic control loop.', keyTakeaway: 'Trust is a system-level design choice built with concentric layers of defense.' },
      { line: 2, code: ``, concept: 'Spacing', explanation: 'Formatting.', keyTakeaway: 'Clarity.' },
      { line: 3, code: `export async function runSecureAgentCycle(rawPrompt: string, userAuth: AuthContext) {`, concept: 'Guarded Pipeline', explanation: 'Processes queries through sequential validation checkpoints.', keyTakeaway: 'Guardrails operate alongside the model, intercepting inputs and outputs.' },
      { line: 4, code: `  // LAYER 1: Input Guardrail (Prompt Injection & Jailbreak Defense)`, concept: 'Input Guardrail', explanation: 'Analyzes incoming prompt before it ever touches the reasoning LLM to prevent prompt injection.', keyTakeaway: 'Input filters stop adversarial attacks at the front gate.' },
      { line: 5, code: `  const isSafeInput = await InputGuard.inspect({ text: rawPrompt, blockAttacks: true });`, concept: 'Adversarial Inspection', explanation: 'Detects jailbreak attempts, toxic language, and malicious instruction overrides.', keyTakeaway: 'Protects the reasoning engine from parameter compromise.' },
      { line: 6, code: `  if (!isSafeInput.passed) throw new SecurityException('Input policy violation');`, concept: 'Immediate Rejection', explanation: 'Terminates execution if malicious input is detected.', keyTakeaway: 'Fail-safe default prevents downstream damage.' },
      { line: 7, code: ``, concept: 'Spacing', explanation: 'Transition.', keyTakeaway: 'Layer transition.' },
      { line: 8, code: `  // LAYER 2: Tool-Use Safeguards (Allowlisting, Preconditions, Rate Limits)`, concept: 'Tool Safeguard', explanation: 'Restricts when and how external APIs are invoked to prevent unauthorized or costly actions.', keyTakeaway: 'Tools give agents power to affect the world; safeguards prevent catastrophic mistakes.' },
      { line: 9, code: `  const plannedTool = await AgentBrain.planAction(rawPrompt);`, concept: 'Action Proposal', explanation: 'Agent plans the next tool action.', keyTakeaway: 'Proposal is audited before execution.' },
      { line: 10, code: `  ToolGuard.validatePermissions(plannedTool, userAuth.role);`, concept: 'Authorization & Allowlisting', explanation: 'Ensures the current user and agent role are authorized to call the proposed tool.', keyTakeaway: 'Role-based access control prevents privilege escalation.' },
      { line: 11, code: `  ToolGuard.enforceRateLimit(plannedTool.name, { maxPerMinute: 10 });`, concept: 'Rate Limiting', explanation: 'Prevents loop amplification where an agent repeatedly calls an API.', keyTakeaway: 'Rate limits protect external services and contain financial cost.' },
      { line: 12, code: ``, concept: 'Spacing', explanation: 'Transition.', keyTakeaway: 'Layer transition.' },
      { line: 13, code: `  // LAYER 3: Human-in-the-Loop (HITL) Approval Gate for High-Stakes Actions`, concept: 'Human Oversight (HITL)', explanation: 'Like a student driver with an instructor: the agent pauses and demands explicit human sign-off.', keyTakeaway: 'HITL ensures human judgment remains the decisive force for irreversible actions.' },
      { line: 14, code: `  if (plannedTool.isHighStakes || plannedTool.amountUSD > 1000) {`, concept: 'High-Stakes Checkpoint', explanation: 'Triggers human intervention when monetary value or risk threshold is exceeded.', keyTakeaway: 'Strategic touchpoints balance safety with operational velocity.' },
      { line: 15, code: `    const approved = await HITLApprovalGate.requestSignOff({`, concept: 'Approval Gate', explanation: 'Pauses execution and displays proposed plan to a human reviewer dashboard.', keyTakeaway: 'Transparent context allows reviewers to make quick, confident decisions.' },
      { line: 16, code: `      action: plannedTool.name, args: plannedTool.args, rationale: plannedTool.reasoning`, concept: 'Reviewer Context', explanation: 'Provides full audit rationale and arguments so the human can evaluate safety.', keyTakeaway: 'Explainability speeds up human review and reduces fatigue.' },
      { line: 17, code: `    });`, concept: 'Gate Close', explanation: 'End of sign-off request.', keyTakeaway: 'Verified approval protocol.' },
      { line: 18, code: `    if (!approved) return { status: 'rejected_by_human_supervisor' };`, concept: 'Override Protection', explanation: 'Human supervisor can reject or override erroneous proposals.', keyTakeaway: 'Human oversight maintains final authority.' },
      { line: 19, code: `  }`, concept: 'Approval Block End', explanation: 'Execution proceeds only if approved or low-risk.', keyTakeaway: 'Gated execution.' },
      { line: 20, code: ``, concept: 'Spacing', explanation: 'Transition.', keyTakeaway: 'Final layer.' },
      { line: 21, code: `  // LAYER 4: Output Validation (PII Redaction & Grounding Checks)`, concept: 'Output Validation', explanation: 'Final inspection of generated payload before delivery to user or downstream systems.', keyTakeaway: 'Output validation acts as the final safety net catching policy violations or PII leakage.' },
      { line: 22, code: `  const rawOutput = await plannedTool.execute();`, concept: 'Raw Output', explanation: 'Generated response or API output.', keyTakeaway: 'Unsanitized data.' },
      { line: 23, code: `  const sanitizedOutput = OutputValidator.redactPII(rawOutput);`, concept: 'PII Redaction Guardrail', explanation: 'Automatically masks emails, credit card numbers, and secret tokens using regex & classifiers.', keyTakeaway: 'Ensures compliance with GDPR, HIPAA, and corporate privacy policies.' },
      { line: 24, code: `  return sanitizedOutput;`, concept: 'Safe Output Delivery', explanation: 'Returns fully validated, trustworthy output.', keyTakeaway: 'Trustworthy AI achieved through multi-layered defense.' },
      { line: 25, code: `}`, concept: 'Pipeline Close', explanation: 'Complete defensive architecture.', keyTakeaway: 'Safe, production-grade agent implementation.' },
    ],
  },
  6: {
    moduleId: 6,
    filename: 'resilient_production_agent.ts',
    description: 'Implements production resiliency: model routing for latency, RAG grounding, and checkpoint recovery.',
    lines: [
      { line: 1, code: `import { ModelRouter, RAGGrounder, StateCheckpoint, ExponentialRetry } from '@agentic/production';`, concept: 'Resilience Modules', explanation: 'Imports production battle-tested tools to combat latency, hallucination, and cascading failures.', keyTakeaway: 'Designing for production requires proactively managing latency, uncertainty, and fault recovery.' },
      { line: 2, code: ``, concept: 'Spacing', explanation: 'Formatting.', keyTakeaway: 'Structure.' },
      { line: 3, code: `export async function runResilientWorkflow(task: WorkflowTask) {`, concept: 'Fault-Tolerant Workflow', explanation: 'An industrial-strength agent workflow resilient to API downtime and network timeouts.', keyTakeaway: 'Resilient agents gracefully degrade rather than crashing unexpectedly.' },
      { line: 4, code: `  // STRATEGY 1: Model Routing for Latency & Cost Optimization`, concept: 'Model Routing', explanation: 'Routes simple tasks to lightweight models (Gemma/Mistral) and reserves heavy LLMs for deep reasoning.', keyTakeaway: 'Judicious model selection optimizes both speed and token expense.' },
      { line: 5, code: `  const selectedModel = task.complexity === 'low' ? 'gemma-2b-fast' : 'claude-3-opus';`, concept: 'Dynamic Model Selection', explanation: 'Matches model size to task complexity, avoiding multi-second inference latency for simple lookups.', keyTakeaway: 'Avoid defaulting to the largest LLM for simple classification or extraction.' },
      { line: 6, code: ``, concept: 'Spacing', explanation: 'Transition.', keyTakeaway: 'Clarity.' },
      { line: 7, code: `  // STRATEGY 2: Checkpointing and State Persistence`, concept: 'State Checkpointing', explanation: 'Saves execution progress before starting long-running or multi-agent calls.', keyTakeaway: 'Allows resuming from last known good state if network or external tools fail.' },
      { line: 8, code: `  const checkpointId = await StateCheckpoint.save({ taskId: task.id, state: 'in_progress' });`, concept: 'Persistent Snapshot', explanation: 'Records current workflow variables to persistent storage.', keyTakeaway: 'State snapshots eliminate redundant work upon restarts.' },
      { line: 9, code: ``, concept: 'Spacing', explanation: 'Transition.', keyTakeaway: 'Flow.' },
      { line: 10, code: `  try {`, concept: 'Resilience Boundary', explanation: 'Encapsulates external dependencies in fault-tolerant isolation.', keyTakeaway: 'Error boundaries prevent single tool failures from bringing down the entire agent.' },
      { line: 11, code: `    // STRATEGY 3: RAG Grounding to Combat Hallucination`, concept: 'RAG Grounding', explanation: 'Retrieves verifiable facts from vector database to ground the LLM response.', keyTakeaway: 'Grounding an agent in external facts transforms uncertain outputs into reliable answers.' },
      { line: 12, code: `    const verifiableDocs = await RAGGrounder.fetchRelevantFacts(task.query);`, concept: 'Semantic Retrieval', explanation: 'Pulls factual citations from the knowledge repository.', keyTakeaway: 'Reduces hallucination rate significantly in high-stakes domains.' },
      { line: 13, code: ``, concept: 'Spacing', explanation: 'Transition.', keyTakeaway: 'Clarity.' },
      { line: 14, code: `    // STRATEGY 4: Exponential Backoff Retry for Tool Calls`, concept: 'Exponential Backoff', explanation: 'Automatically retries transient network or API errors with progressive backoff delays.', keyTakeaway: 'Prevents transient network hiccups from causing hard workflow failures.' },
      { line: 15, code: `    const result = await ExponentialRetry.run(() => executeTool(task, verifiableDocs), {`, concept: 'Automated Retry Wrapper', explanation: 'Executes the tool with built-in retry logic.', keyTakeaway: 'Handles rate limits and transient server errors automatically.' },
      { line: 16, code: `      maxRetries: 3, backoffMs: 1000`, concept: 'Backoff Configuration', explanation: 'Waits 1s, 2s, 4s before giving up, preventing server overload.', keyTakeaway: 'Protects both client and downstream services.' },
      { line: 17, code: `    });`, concept: 'Retry Close', explanation: 'Captures outcome of retried operation.', keyTakeaway: 'Resilient execution.' },
      { line: 18, code: `    await StateCheckpoint.markSuccess(checkpointId);`, concept: 'Checkpoint Success', explanation: 'Finalizes the checkpoint as complete.', keyTakeaway: 'Ensures transactional integrity.' },
      { line: 19, code: `    return result;`, concept: 'Success Return', explanation: 'Delivers result to caller.', keyTakeaway: 'Clean execution.' },
      { line: 20, code: `  } catch (error) {`, concept: 'Graceful Degradation', explanation: 'Catches fatal errors and triggers graceful degradation or human handoff.', keyTakeaway: 'Never crash silently; degrade gracefully or hand off to human supervisors.' },
      { line: 21, code: `    await StateCheckpoint.rollback(checkpointId);`, concept: 'Safe Rollback', explanation: 'Restores the system to a clean previous state, preventing corrupted memory.', keyTakeaway: 'Rollbacks maintain database and state consistency.' },
      { line: 22, code: `    return fallbackToHumanSupport(task, error);`, concept: 'Human Escalation', explanation: 'Escalates unrecoverable failures to human agents with full error diagnostics.', keyTakeaway: 'Failure handoffs maintain customer satisfaction even during outages.' },
      { line: 23, code: `  }`, concept: 'Try-Catch End', explanation: 'End of resilient execution block.', keyTakeaway: 'Production resilience pattern complete.' },
      { line: 24, code: `}`, concept: 'Module End', explanation: 'Complete production agent implementation.', keyTakeaway: 'Production-ready reliability.' },
    ],
  },
  7: {
    moduleId: 7,
    filename: 'macrs_orchestrator.ts',
    description: 'Implements the MACRS Multi-Agent Act Planning Framework and User Feedback-Aware Reflection loop.',
    lines: [
      { line: 1, code: `import { AskingAgent, RecommendingAgent, ChitChatAgent, PlannerAgent, ReflectionEngine } from '@agentic/macrs';`, concept: 'MACRS Architecture Imports', explanation: 'Imports the three specialized responder agents, the central coordinating planner, and the dual reflection engine.', keyTakeaway: 'Modular agent roles separate conversational goals (asking, recommending, chatting) from central decision making.' },
      { line: 2, code: ``, concept: 'Spacing', explanation: 'Architecture structure.', keyTakeaway: 'Clean separation.' },
      { line: 3, code: `export async function runMACRSTurn(userMessage: string, sessionState: MACRSSession) {`, concept: 'Turn-Level Controller', explanation: 'Executes a goal-directed conversational turn with multi-agent candidate generation and planning.', keyTakeaway: 'Goal-directed dialogue balances conversational fluency with purposeful task completion.' },
      { line: 4, code: `  // 1. Concurrent Candidate Generation from 3 Specialized Responders`, concept: 'Manager-Worker Decomposition', explanation: 'Each responder agent receives the shared user profile and dialogue history to propose an optimal next move.', keyTakeaway: 'Decomposition allows each agent to focus on its single conversational objective without cognitive overload.' },
      { line: 5, code: `  const [askCandidate, recCandidate, chatCandidate] = await Promise.all([`, concept: 'Parallel Execution', explanation: 'Dispatches all 3 responder agents concurrently to minimize latency overhead.', keyTakeaway: 'Parallel LLM calls keep turn latency acceptable despite multi-agent orchestration.' },
      { line: 6, code: `    AskingAgent.proposeQuestion(userMessage, sessionState.userProfile),`, concept: 'Asking Agent', explanation: 'Elicits missing preferences through targeted, non-repetitive inquiry.', keyTakeaway: 'Information elicitation narrows the search space for recommendations.' },
      { line: 7, code: `    RecommendingAgent.proposeItem(userMessage, sessionState.userProfile),`, concept: 'Recommending Agent', explanation: 'Suggests high-confidence items matching known positive preferences.', keyTakeaway: 'Recommendation drives the session towards the target conversion goal.' },
      { line: 8, code: `    ChitChatAgent.proposeEngagement(userMessage, sessionState.userProfile),`, concept: 'Chit-Chat Agent', explanation: 'Maintains conversational rapport and natural dialogue flow when data is insufficient.', keyTakeaway: 'Keeps users engaged without forcing premature or irrelevant recommendations.' },
      { line: 9, code: `  ]);`, concept: 'Candidate Pool Ready', explanation: 'Three distinct candidate moves are ready for strategic evaluation.', keyTakeaway: 'Multiple candidates provide rich strategic options.' },
      { line: 10, code: ``, concept: 'Spacing', explanation: 'Transition to planning.', keyTakeaway: 'Planning phase.' },
      { line: 11, code: `  // 2. Central Planner Deliberation: Multi-Step Reasoning Selection`, concept: 'Central Planner Reasoning', explanation: 'The planner evaluates dialogue progress, preference completeness, and user sentiment to pick the winning response.', keyTakeaway: 'The central planner acts as the team lead, ensuring dialogue stays on-course.' },
      { line: 12, code: `  const selectedTurn = await PlannerAgent.selectOptimalAct({`, concept: 'Planner Decision', explanation: 'Weighs task effectiveness against user experience.', keyTakeaway: 'Prevents random meandering by choosing the highest-value conversational move.' },
      { line: 13, code: `    candidates: { askCandidate, recCandidate, chatCandidate },`, concept: 'Option Space', explanation: 'Provides all three generated candidates to the planner context.', keyTakeaway: 'Planner reasons across candidates.' },
      { line: 14, code: `    history: sessionState.dialogueHistory,`, concept: 'Context Grounding', explanation: 'Ensures the planner avoids repetitive questions or skipped concepts.', keyTakeaway: 'Dialogue memory prevents cyclical chat loops.' },
      { line: 15, code: `    strategyFeedback: sessionState.strategyCorrections,`, concept: 'Corrective Memory', explanation: 'Feeds prior failure reflections directly into the planner reasoning window.', keyTakeaway: 'Corrective experiences stop the planner from repeating failed tactics.' },
      { line: 16, code: `  });`, concept: 'Planner Output', explanation: 'Delivers the single contextually optimal system utterance to the user.', keyTakeaway: 'Only one strategic response is surfaced to the user.' },
      { line: 17, code: ``, concept: 'Spacing', explanation: 'Transition to reflection.', keyTakeaway: 'Feedback loop.' },
      { line: 18, code: `  // 3. Dual-Layer Reflection: Information-Level & Strategy-Level Learning`, concept: 'Closed-Loop Reflection', explanation: 'Observes user reaction (accept, skip, dislike) to update user profile and strategy memory.', keyTakeaway: 'Good agents do not just act; they reflect on outcomes and adapt in real time.' },
      { line: 19, code: `  ReflectionEngine.registerListener(selectedTurn, async (userReaction) => {`, concept: 'Feedback Trigger', explanation: 'Asynchronously monitors clicks, skips, and conversational sentiment.', keyTakeaway: 'Behavioral signals (e.g. skips) are treated as explicit feedback clues.' },
      { line: 20, code: `    await ReflectionEngine.updateUserProfile(userReaction, sessionState.userProfile);`, concept: 'Information-Level Reflection', explanation: 'Updates negative constraints and refined genre preferences in shared memory.', keyTakeaway: 'Tunes response content by listening to what the user does.' },
      { line: 21, code: `    await ReflectionEngine.refineStrategy(userReaction, sessionState.strategyCorrections);`, concept: 'Strategy-Level Reflection', explanation: 'Formulates corrective experiences for future planner decisions.', keyTakeaway: 'Tunes the conversation method by learning from failed recommendations.' },
      { line: 22, code: `  });`, concept: 'Reflection Hook Bound', explanation: 'Completes real-time adaptation loop.', keyTakeaway: 'Continuous in-session self-improvement.' },
      { line: 23, code: `  return selectedTurn.text;`, concept: 'System Output', explanation: 'Returns the finalized response to the user interface.', keyTakeaway: 'Clean goal-directed interaction.' },
      { line: 24, code: `}`, concept: 'Turn Complete', explanation: 'End of MACRS orchestration cycle.', keyTakeaway: 'Production multi-agent recommender framework.' },
    ],
  },
  8: {
    moduleId: 8,
    filename: 'crm_agent_pipeline.ts',
    description: 'Implements the production CRM Agent with tool calling, meeting scheduling, email drafting, and HITL refund gates.',
    lines: [
      { line: 1, code: `import { CRMAgent, ToolDefinition, GuardrailGate, HumanApproval } from '@agentic/crm';`, concept: 'Enterprise CRM Imports', explanation: 'Imports agent orchestrator, tool schemas, safety guardrails, and human escalation gates.', keyTakeaway: 'Enterprise agents require formal boundaries between autonomous execution and human review.' },
      { line: 2, code: ``, concept: 'Spacing', explanation: 'Separation.', keyTakeaway: 'Clean layout.' },
      { line: 3, code: `export const summarizeChatTool: ToolDefinition = {`, concept: 'Summarization Tool', explanation: 'Generates structured CRM interaction notes, urgency tags, and sentiment scores.', keyTakeaway: 'Autonomous summarization eliminates manual data entry for human support teams.' },
      { line: 4, code: `  name: 'summarize_dialogue', description: 'Extracts customer sentiment, problem statement, and key facts into CRM records',`, concept: 'Tool Schema', explanation: 'Provides semantic instructions and parameter expectations for the LLM.', keyTakeaway: 'Accurate tool descriptions enable precise function selection.' },
      { line: 5, code: `};`, concept: 'Tool End', explanation: 'Tool schema registered.', keyTakeaway: 'Modular tool definition.' },
      { line: 6, code: ``, concept: 'Spacing', explanation: 'Separation.', keyTakeaway: 'Structure.' },
      { line: 7, code: `export const issueRefundTool: ToolDefinition = {`, concept: 'High-Impact Financial Tool', explanation: 'Transfers money or applies credits directly to customer accounts.', keyTakeaway: 'Irreversible financial tools carry existential risk if invoked without guardrails.' },
      { line: 8, code: `  name: 'issue_account_refund', description: 'Dispatches refund credit via billing API up to authorized thresholds',`, concept: 'Refund Schema', explanation: 'Defines parameters: customerId, amount, reasonCode.', keyTakeaway: 'Schema defines the argument requirements.' },
      { line: 9, code: `};`, concept: 'Tool End', explanation: 'Financial tool registered.', keyTakeaway: 'Declared capability.' },
      { line: 10, code: ``, concept: 'Spacing', explanation: 'Separation.', keyTakeaway: 'Workflow logic.' },
      { line: 11, code: `export async function executeCRMWorkflow(customerInput: string, customerId: string) {`, concept: 'CRM Orchestration Flow', explanation: 'Coordinates perception, tool dispatching, and safety enforcement.', keyTakeaway: 'Orchestrator enforces business rules before dispatching tools.' },
      { line: 12, code: `  const intent = await CRMAgent.analyzeIntent(customerInput);`, concept: 'Intent & Sentiment Analysis', explanation: 'Extracts customer urgency, required actions, and requested amounts.', keyTakeaway: 'Initial intent classification grounds downstream tool calls.' },
      { line: 13, code: `  await CRMAgent.invokeTool('summarize_dialogue', { customerId, notes: intent.summary });`, concept: 'Safe Autonomous Action', explanation: 'Safely records CRM notes and sentiment tags without requiring human sign-off.', keyTakeaway: 'Low-risk read/write operations execute autonomously for high efficiency.' },
      { line: 14, code: ``, concept: 'Spacing', explanation: 'Guardrail check.', keyTakeaway: 'Safety boundary.' },
      { line: 15, code: `  // CRITICAL SAFETY GUARD: Human-in-the-Loop Threshold Check`, concept: 'HITL Escalation Gate', explanation: 'Enforces corporate policy: any financial action exceeding $1,000 must pause for human manager sign-off.', keyTakeaway: 'Human-in-the-loop gates protect against prompt injections, hallucinations, and fraud.' },
      { line: 16, code: `  if (intent.requestedRefund && intent.requestedRefund.amount > 1000) {`, concept: 'Policy Boundary', explanation: 'Detects high-value transaction exceeding autonomous authority.', keyTakeaway: 'Deterministic threshold checks prevent runaway agent spending.' },
      { line: 17, code: `    const ticket = await HumanApproval.createEscalation({`, concept: 'Human Escalation Dispatch', explanation: 'Creates a pending review ticket in Jira/Zendesk with customer history and agent reasoning.', keyTakeaway: 'Escalations should provide human reviewers with rich, pre-assembled context.' },
      { line: 18, code: `      customerId, amount: intent.requestedRefund.amount, justification: intent.requestedRefund.reason`, concept: 'Ticket Context', explanation: 'Supplies all data needed for the human supervisor to make an informed decision.', keyTakeaway: 'Saves human time during incident review.' },
      { line: 19, code: `    });`, concept: 'Ticket Created', explanation: 'Ticket queued for manager review.', keyTakeaway: 'Secure audit trail.' },
      { line: 20, code: `    await CRMAgent.invokeTool('draft_followup_email', { template: 'refund_escalated_for_review' });`, concept: 'Empathetic Communication', explanation: 'Drafts and sends a reassuring message to the user acknowledging the priority review.', keyTakeaway: 'Proactive communication de-escalates customer frustration.' },
      { line: 21, code: `    return { status: 'ESCALATED_TO_HUMAN', ticketId: ticket.id };`, concept: 'Safe Pause', explanation: 'Pauses workflow execution safely without modifying bank balances.', keyTakeaway: 'Safe degradation preserves trust and financial assets.' },
      { line: 22, code: `  }`, concept: 'Guardrail Branch End', explanation: 'End of high-value protection check.', keyTakeaway: 'Boundary enforced.' },
      { line: 23, code: `  return { status: 'COMPLETED_AUTONOMOUSLY' };`, concept: 'Normal Completion', explanation: 'Completes routine automated workflow.', keyTakeaway: 'Smooth autonomous resolution.' },
      { line: 24, code: `}`, concept: 'Workflow Complete', explanation: 'End of enterprise CRM agent workflow.', keyTakeaway: 'Production-ready agentic design.' },
    ],
  },
};

export const CodeInContextViewer: React.FC<{ moduleId: number }> = ({ moduleId }) => {
  const sample = MODULE_CODE_SAMPLES[moduleId] || MODULE_CODE_SAMPLES[1];
  const [selectedLineNumber, setSelectedLineNumber] = useState<number>(3);
  const [copied, setCopied] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'interactive' | 'full'>('interactive');

  const selectedLine = sample.lines.find(l => l.line === selectedLineNumber) || sample.lines[0];

  const handleCopy = () => {
    const fullCode = sample.lines.map(l => l.code).join('\n');
    navigator.clipboard.writeText(fullCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-5 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
            <Terminal className="w-4 h-4 text-indigo-400" />
            <span>Beat 05: Code In Context</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300 font-sans">{sample.filename}</span>
          </div>
          <p className="text-xs text-slate-400 max-w-xl">
            {sample.description} Click any line below to inspect its architectural rationale.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center bg-black/40 p-1 rounded-xl border border-white/10 text-xs">
            <button
              onClick={() => setActiveTab('interactive')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                activeTab === 'interactive' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Interactive Inspector
            </button>
            <button
              onClick={() => setActiveTab('full')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                activeTab === 'full' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Full Code
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-300 hover:text-white transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-white/10 bg-[#060a12] shadow-2xl">
          <div className="px-4 py-3 bg-slate-950 border-b border-white/10 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-2 font-mono text-slate-300 font-semibold">{sample.filename}</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-indigo-400">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              TypeScript Strict
            </div>
          </div>

          <div className="p-3 font-mono text-xs overflow-x-auto select-none space-y-0.5">
            {sample.lines.map(lineItem => {
              const isSelected = selectedLineNumber === lineItem.line;
              const hasCode = lineItem.code.trim().length > 0;

              return (
                <div
                  key={lineItem.line}
                  onClick={() => hasCode && setSelectedLineNumber(lineItem.line)}
                  className={`group flex items-center gap-3 px-3 py-1 rounded-lg cursor-pointer transition-all duration-150 ${
                    isSelected
                      ? 'bg-indigo-600/25 border-l-4 border-indigo-500 text-white font-semibold shadow-inner'
                      : hasCode
                      ? 'hover:bg-white/[0.04] text-slate-300'
                      : 'text-slate-700 pointer-events-none'
                  }`}
                >
                  <span className={`w-6 text-right font-mono text-[11px] shrink-0 ${
                    isSelected ? 'text-indigo-400 font-bold' : 'text-slate-600 group-hover:text-slate-400'
                  }`}>
                    {lineItem.line}
                  </span>

                  <span className="whitespace-pre overflow-x-auto py-0.5 font-mono">
                    {lineItem.code.startsWith('//') ? (
                      <span className="text-slate-500 italic">{lineItem.code}</span>
                    ) : lineItem.code.includes('import ') ? (
                      <span className="text-purple-400">{lineItem.code}</span>
                    ) : lineItem.code.includes('export ') || lineItem.code.includes('function ') || lineItem.code.includes('const ') ? (
                      <span className="text-indigo-300">{lineItem.code}</span>
                    ) : lineItem.code.includes('await ') ? (
                      <span className="text-cyan-300">{lineItem.code}</span>
                    ) : (
                      <span className={isSelected ? 'text-white' : 'text-slate-300'}>{lineItem.code}</span>
                    )}
                  </span>

                  {hasCode && isSelected && (
                    <span className="ml-auto text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/30 text-indigo-300 shrink-0 font-bold">
                      INSPECTING
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <div className="p-3 bg-slate-950/70 border-t border-white/5 text-[11px] text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-indigo-400" />
              Click any line to view its architectural purpose and design rationale.
            </span>
            <span className="font-mono text-slate-500">
              Line {selectedLineNumber} of {sample.lines.length}
            </span>
          </div>
        </div>

        <div className="lg:col-span-5 rounded-3xl bg-slate-900/90 border border-white/10 p-4 sm:p-6 shadow-2xl backdrop-blur-2xl space-y-4 sm:space-y-5 lg:sticky lg:top-24">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400">
              <Sparkles className="w-4 h-4" /> Line-by-Line Blueprint Analysis
            </div>
            <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold">
              Line #{selectedLine.line}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-black/60 border border-white/10 font-mono text-xs text-indigo-300 overflow-x-auto shadow-inner">
            <code>{selectedLine.code || '// Empty line'}</code>
          </div>

          <div className="space-y-1.5">
            <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 font-bold">
              Architectural Concept
            </span>
            <div className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              {selectedLine.concept}
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 font-bold">
              Why This Is Written This Way
            </span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-white/[0.02] p-4 rounded-2xl border border-white/5">
              {selectedLine.explanation}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-950/40 to-purple-950/30 border border-indigo-500/30 space-y-1.5">
            <span className="text-[10px] uppercase font-mono tracking-widest text-indigo-400 font-bold flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5" /> Core Design Principle
            </span>
            <p className="text-xs font-medium text-slate-200 leading-relaxed">
              {selectedLine.keyTakeaway}
            </p>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                const prev = sample.lines.filter(l => l.line < selectedLineNumber && l.code.trim().length > 0);
                if (prev.length > 0) setSelectedLineNumber(prev[prev.length - 1].line);
              }}
              disabled={selectedLineNumber <= 1}
              className="px-3.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] disabled:opacity-30 disabled:pointer-events-none text-xs text-slate-300 border border-white/10 transition"
            >
              ← Previous Line
            </button>
            <button
              onClick={() => {
                const next = sample.lines.filter(l => l.line > selectedLineNumber && l.code.trim().length > 0);
                if (next.length > 0) setSelectedLineNumber(next[0].line);
              }}
              disabled={selectedLineNumber >= sample.lines.length}
              className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 disabled:pointer-events-none text-xs font-bold text-white shadow-md shadow-indigo-500/25 transition"
            >
              Next Line →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
