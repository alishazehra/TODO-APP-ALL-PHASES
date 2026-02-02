# Quickstart: AI Chatbot Feature

## Prerequisites
- Backend running (`uvicorn src.main:app --reload`)
- Frontend running (`npm run dev`)
- Database up and migrations applied (`alembic upgrade head`)
- OpenAI API Key configured in `.env` (`OPENAI_API_KEY`)

## Local Development

1. **Verify Database**:
   Ensure `conversations` and `messages` tables exist.
   ```bash
   # Check tables (assuming standard psql)
   \dt
   ```

2. **Test API via Curl**:
   ```bash
   curl -X POST http://localhost:8000/api/chat \
     -H "Authorization: Bearer <token>" \
     -H "Content-Type: application/json" \
     -d '{"message": "Add buy milk to my list"}'
   ```

3. **Frontend Integration**:
   - Navigate to `/chat`
   - Type a message
   - Verify response appears and task is added to the list

## Troubleshooting

- **500 Error**: Check backend logs for OpenAI API errors or DB connection issues.
- **Tools not working**: Ensure MCP tools are correctly registered and the agent has permission to call them.
- **State lost**: Verify that `message` rows are explicitly committed to the DB after each turn.
