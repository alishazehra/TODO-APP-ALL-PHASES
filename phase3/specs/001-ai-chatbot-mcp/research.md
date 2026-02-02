# Research: AI Chatbot & MCP Integration

## Decisions

### 1. Stateless Agent Architecture
**Decision**: The backend will reconstruct the conversation context from the database for every request. The AI Agent will be initialized with the retrieved history, generate a response (and tool calls), and the new state will be saved back to the DB.
**Rationale**: Adheres to the "Stateless Backend" constitution principle. Ensures robustness against server restarts and load balancing.
**Alternatives**:
- *In-memory session storage*: Rejected (violates statelessness).
- *External state store (Redis)*: Viable, but PostgreSQL is already chosen as the single source of truth.

### 2. MCP Integration Strategy
**Decision**: Implement MCP tools using the standard MCP Python SDK but exposed directly to the Agent within the FastAPI process.
**Rationale**: Avoids the complexity of a separate networked MCP server process for internal tools. The agent can invoke the tools via the MCP protocol content defined in identifying the toolset.
**Alternatives**:
- *Standalone MCP Server process*: Overkill for a single application where the tools interact with the same DB as the backend.

### 3. Conversation & Message Data Model
**Decision**: Create `Conversation` and `Message` tables in PostgreSQL. `Conversation` links to `User`. `Message` stores role (user/assistant/tool), content, and timestamp.
**Rationale**: Provides persistence and allows reconstructing the full context window for the LLM.
**Alternatives**:
- *JSONB column**: Could store messages as a JSON array, but normalized tables allow for better querying and partial loading if context limit strategies are needed later.

### 4. Frontend-Backend Communication
**Decision**: REST API endpoint `POST /api/chat` that accepts a message and returns the assistant's response.
**Rationale**: Simple, standard, and easy to integrate with ChatKit.
**Alternatives**:
- *WebSockets*: Better for real-time streaming, but increases statefulness complexity. REST is sufficient for request-response interactions and simpler for a stateless mandate.

## Implementation Patterns

### Agent Loop (in `POST /api/chat`)
1. **Load**: Fetch `Conversation` and previous `Message`s from DB.
2. **Think**: Call OpenAI API with conversation history + system prompt + tool definitions.
3. **Act**: If tool calls generated, execute corresponding MCP tool functions (e.g., `add_task`).
4. **Observe**: Append tool outputs to history.
5. **Respond**: If final response generated, append to history.
6. **Save**: Persist new `Message`s to DB.
7. **Return**: Send response to frontend.
