# Vocorix chatbot integration plan

The Next.js app is structured so a future assistant can be added without exposing provider keys or coupling the UI to one model vendor.

## Current foundation

- `POST /api/chat` validates a stable message request and returns `chat_not_configured` until a provider is implemented.
- Supabase includes private `chat_conversations` and `chat_messages` tables; browser clients have no direct table access.
- Model credentials, retrieval, tools, rate limits, persistence, budget controls, and handoffs belong on the server.
- No browser component should call an LLM provider directly.

## Provider adapter to add later

Add a server-only adapter such as `streamReply({ conversationId, messages, pageContext })` under `lib/chat/providers/`. Use a streaming response so the widget can render output incrementally.

Before enabling the chatbot:

1. Choose a provider based on latency, quality, privacy, and cost.
2. Define its purpose: lead qualifier, service explainer, or general assistant.
3. Specify its tools, allowed data collection, and when it hands off to a human.
4. Use random, non-PII session IDs and validate conversation access on every request.
5. Apply per-session and per-IP rate limits, message size limits, and budget caps.
6. Test prompt injection and tool abuse before allowing CRM updates or messages to be sent.
7. Set transcript retention/deletion rules and update the privacy notice.

Never put Supabase secret/service keys, model keys, or CRM credentials in a `NEXT_PUBLIC_*` variable.
