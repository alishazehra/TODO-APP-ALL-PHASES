# Implementation Plan: AI Chatbot & MCP Integration (Phase III)

**Branch**: `001-ai-chatbot-mcp` | **Date**: 2026-01-29 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-ai-chatbot-mcp/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Enable users to manage todos via natural language using an AI chatbot interaction. The solution implements a stateless backend using OpenAI Agents SDK, integrates with MCP tools for task operations, and uses OpenAI ChatKit for the frontend UI. It adheres to a strict stateless architecture where all conversation state is persisted in the database.

## Technical Context

**Language/Version**: Python 3.12 (Backend), TypeScript/React (Frontend)
**Primary Dependencies**: FastAPI (Backend), OpenAI Agents SDK, MCP SDK, SQLModel, OpenAI ChatKit (Frontend)
**Storage**: Neon PostgreSQL (SQLModel)
**Testing**: pytest (Backend), Jest (Frontend)
**Target Platform**: Docker/Cloud (inferred from project structure)
**Project Type**: Web Application (Backend + Frontend)
**Performance Goals**: AI response within 3s (95th percentile)
**Constraints**: Fully stateless backend, MCP-only task mutations
**Scale/Scope**: Conversational interface for existing task management functionality

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

1. **Stateless Backend**: Backend design is fully stateless; conversation history loaded from DB per request. (PASS)
2. **MCP Tool Governance**: All task operations tasked to MCP tools (add, list, update, complete, delete). (PASS)
3. **Conversation Persistence**: Conversation state stored in DB (users, messages, history). (PASS)
4. **Scope Compliance**: Features strictly limited to conversational task management. (PASS)

## Project Structure

### Documentation (this feature)

```text
specs/001-ai-chatbot-mcp/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── checklists/          # Feature checklists
```

### Source Code (repository root)

```text
backend/
├── src/
│   ├── api/             # API endpoints including new /chat endpoint
│   ├── core/            # Core configurations
│   ├── db/              # Database models and session management
│   ├── models/          # Data models (SQLModel)
│   ├── mcp/             # [NEW] MCP server and tool definitions
│   ├── agent/           # [NEW] AI Agent logic and orchestration
│   └── services/        # Business logic services
└── tests/

frontend/
├── src/
│   ├── components/      # UI components
│   │   └── chat/        # [NEW] ChatKit integration components
│   ├── pages/
│   └── services/        # Frontend API client
└── tests/
```

**Structure Decision**: Web application structure with separate backend (Python/FastAPI) and frontend (React/Next.js) directories. New directories `backend/src/mcp` and `backend/src/agent` added for feature logic.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
