# Data Model: AI Chatbot (Phase III)

## ER Diagram (Mermaid)

```mermaid
erDiagram
    User ||--o{ Conversation : has
    Conversation ||--o{ Message : contains

    User {
        uuid id PK
        string email
        string hashed_password
    }

    Conversation {
        uuid id PK
        uuid user_id FK
        datetime created_at
        datetime updated_at
        string title
    }

    Message {
        uuid id PK
        uuid conversation_id FK
        string role "user|assistant|tool"
        text content
        jsonb tool_calls "Optional: stores tool call details"
        string tool_call_id "Optional: for tool responses"
        datetime created_at
    }
```

## Schema Definitions (SQLModel)

### Conversation
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | UUID | Yes | Primary Key |
| user_id | UUID | Yes | Foreign Key to User |
| title | String | No | Auto-generated title |
| created_at | DateTime | Yes | UTC timestamp |
| updated_at | DateTime | Yes | Last activity timestamp |

### Message
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | UUID | Yes | Primary Key |
| conversation_id | UUID | Yes | Foreign Key to Conversation |
| role | String | Yes | enum: user, assistant, system, tool |
| content | Text | Yes | The message content |
| tool_calls | JSON | No | Metadata for tool calls (if role=assistant) |
| tool_call_id | String | No | ID of the call (if role=tool) |
| created_at | DateTime | Yes | UTC timestamp |
