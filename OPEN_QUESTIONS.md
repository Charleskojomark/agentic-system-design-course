# OPEN QUESTIONS & DECISION LOG

This document tracks all open questions and ambiguities in the course material as required by the course building protocol.

---

### 1. Code Samples Arrival & Target Allocation
- **Status:** Pending Instructor Input
- **Question:** No code samples were provided with the course content. The plan assumes they will arrive later. Which lessons should they target, and what languages/frameworks (e.g., Python / LangChain / OpenAI Agents SDK) do you want featured?
- **Current Fallback:** In Beat 5 ("Code in Context") of each lesson, a clean developer card displays: *"Code examples for this lesson will be added soon."* along with a concept-specific architectural blueprint preview.

---

### 2. Images Referenced in Course Text
- **Status:** Handled via Bespoke SVG Diagrams & Interactive Widgets
- **Question:** The course references several images in the raw text (e.g., *"Breaking down how an AI agent works"*, *"AI model vs. AI agent"*, *"Software-based AI agent"*, *"Evolution of AI agents"*, etc.). Should these be generated as interactive SVG illustrations, or will you provide dedicated image asset files?
- **Current Approach:** We have built bespoke, animated SVG diagrams and tactile interactive explainer widgets directly in the React components for all of these references.

---

### 3. Quiz Scoring for Case Study / Notepad Questions
- **Status:** Interactive Self-Assessment with Model Answer Comparison
- **Question:** Lessons 3 and 4 include open-ended "notepad" questions (e.g., SaaS support agent diagnosis, research assistant orchestration). Should these be auto-scored with semantic keyword matching, self-assessed with an expandable rubrics/revealed answer, or treated as bonus reflection points?
- **Current Approach:** Implemented as an interactive case-study workspace where students can type their response, get real-time feedback, view the model answer derived word-for-word from course content, and earn reflection XP.

---

### 4. Student Name for Certificate
- **Status:** Configured with In-App Personalization
- **Question:** Should the app prompt for the student's name at sign-up, or allow name editing directly on the final Certificate screen?
- **Current Approach:** Students can edit and customize their name anytime in the header profile and directly on the verifiable Certificate screen, with instant persistence to `localStorage`.

---

### 5. Capstone Sandbox Scoring Rubric
- **Status:** Derived from Production Readiness Checklist
- **Question:** The capstone in Module 6 needs an evaluation rubric. Should we derive it directly from the 7-dimension Production Readiness Checklist in the course content, or will you provide a specific grading matrix?
- **Current Approach:** Derived strictly from the 7-category Production Readiness Checklist provided in the Lesson 6 course content.
