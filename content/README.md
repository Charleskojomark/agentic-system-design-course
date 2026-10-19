# Content Directory — Agentic System Design Course

This directory holds **all course teaching material** completely decoupled from UI components. Curriculum authors can edit lesson content, add questions, tweak glossary definitions, and configure gamification badges without touching TypeScript or React code.

---

## Directory Structure

```
content/
├── glossary.json              # 45 Technical terms with verbatim definitions & category tags
├── levels.json                # 8 progression tiers with level names, XP thresholds & icons
├── badges.json                # 10 milestone badges (First Signal, Sensory Acuity, Architect, etc.)
├── modules/
│   ├── module-1.json          # Module 01: Foundations & Introduction to AI Agents
│   ├── module-2.json          # Module 02: Core Agent Components (Model, Tools, Instructions)
│   ├── module-3.json          # Module 03: Components Interaction & Agent Memory
│   ├── module-4.json          # Module 04: Agent Orchestration Patterns (ReAct, Manager-Worker)
│   ├── module-5.json          # Module 05: Building Trustworthy Agents (Guardrails & Human Oversight)
│   ├── module-6.json          # Module 06: Production Challenges & Resilient System Design
│   ├── module-7.json          # Module 07: MACRS Case Study (Multi-Agent Conversational Recommender)
│   ├── module-8.json          # Module 08: Capstone Studio: Production CRM Agent
│   ├── module-9.json          # Module 09: Eureka Case Study: Automating Reward Design with Coding LLMs
│   └── module-10.json         # Module 10: Autonomous Reward Engineering with Google ADK
└── README.md                  # This curriculum authoring guide
```

---

## Module JSON Schema

Each `module-{N}.json` file adheres to the following structure:

```json
{
  "id": 1,
  "slug": "foundations",
  "title": "Introduction to AI Agents",
  "subtitle": "Subtitle description...",
  "color": "#6366f1",
  "icon": "🤖",
  "lessons": [
    {
      "id": "m1-l1",
      "title": "Introduction to AI Agents",
      "hook": "Scenario or hook question highlighting why this matters...",
      "bigIdea": "Core architectural concept in verbatim author wording...",
      "plainEnglish": "Intuitive metaphor or layman translation...",
      "objectives": [
        "Objective 1",
        "Objective 2"
      ],
      "sections": [
        {
          "id": "section-id",
          "title": "Section Title",
          "icon": "🤖",
          "content": "Full section text...",
          "subsections": [
            {
              "title": "Subsection Title",
              "content": "Explanatory text..."
            }
          ],
          "tableData": [
            { "Feature": "Autonomy", "Description": "Acts independently..." }
          ]
        }
      ],
      "quiz": [
        {
          "id": "q1",
          "type": "multiple-choice",
          "question": "Question text...",
          "options": ["A", "B", "C", "D"],
          "correctAnswer": "A",
          "explanation": "Rationale explaining why A is correct..."
        }
      ],
      "recap": [
        "Takeaway 1",
        "Takeaway 2",
        "Takeaway 3"
      ],
      "nextUp": "Next module or concept teaser"
    }
  ]
}
```

---

## How to Edit or Add Course Content

1. **Edit Lesson Text**: Open `content/modules/module-{N}.json` and update `hook`, `bigIdea`, `plainEnglish`, or `sections`.
2. **Add Quiz Questions**: Append a new question object to the `quiz` array. Supported types include `multiple-choice` and `match-pairs`.
3. **Add Glossary Terms**: Open `content/glossary.json` and insert a new term with its exact definition and category.
4. **Deploy Updates**: Simply run `git commit -am "chore: update lesson content"` and `npx vercel --prod --yes`.
