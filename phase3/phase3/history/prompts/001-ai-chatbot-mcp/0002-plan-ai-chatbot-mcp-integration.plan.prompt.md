# PHR: Plan AI Chatbot MCP Integration

---
id: 0002
title: Plan AI Chatbot MCP Integration
stage: plan
date: 2026-01-29
surface: agent
model: claude-sonnet-4-5-20250929
feature: 001-ai-chatbot-mcp
branch: 001-ai-chatbot-mcp
user: abc
command: /sp.plan
labels: ["ai-agent", "mcp", "fastapi", "react", "architecture"]
links:
  spec: ../specs/001-ai-chatbot-mcp/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/001-ai-chatbot-mcp/plan.md
  - specs/001-ai-chatbot-mcp/research.md
  - specs/001-ai-chatbot-mcp/data-model.md
  - specs/001-ai-chatbot-mcp/contracts/openapi.yaml
  - specs/001-ai-chatbot-mcp/quickstart.md
tests:
  -
---

## Prompt

before planning first you can review the frontend and backend folder after that generate plan here is plan: /sp.plan # sp.plan – Spec-4

## Goal
Build a **stateless AI chatbot** for todo management using **Agents SDK**, **MCP tools**, and **ChatKit UI**.

## Plan
1. Create `/chat` API (stateless)
2. Store conversations in DB
3. Setup MCP task tools
4. Connect agent to MCP
5. Integrate frontend with backend
6. Validate restart safety

## Done
- Natural language works
- MCP handles all tasks
- Conversations persist
- No server state

## Response snapshot

Created implementation plan for AI Chatbot & MCP Integration feature.

Architecture decisions:
- Backend: Stateless FastAPI service with internal agent Loop
- State: PostgreSQL (Conversations/Messages) as single source of truth
- Tools: MCP Python SDK integrated directly in backend logic
- Frontend: React + OpenAI ChatKit
- API: Standard REST POST /api/chat

Artifacts generated:
1. `plan.md`: Complete implementation plan verifying Constitution compliance
2. `research.md`: Decisions on statelessness, MCP integration, and data model
3. `data-model.md`: ER Diagram and schema for Conversations and Messages
4. `contracts/openapi.yaml`: API definition for chat endpoint
5. `quickstart.md`: Developer guide for new feature

Agent context updated with new technologies.

## Outcome

- ✅ Impact: Complete architectural plan ready for task generation
- 🧪 Tests: Defined testing strategy (pytest/Jest) and validation gates
- 📁 Files: Plan, Research, Data Model, Contracts, Quickstart
- 🔁 Next prompts: /sp.tasks to generate actionable tasks from this plan
- 🧠 Reflection: Architecture strictly adheres to stateless backend and MCP-driven mutation requirements.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): All constitution gates PASSED
- Prompt variant (if applicable): Standard plan generation
- Next experiment (smallest change to try): Proceed to task generation
