# Social API Gateway

## Command

```bash
social gateway
```

## Purpose

`social gateway` runs a local HTTP server that provides:

- API routes for chat/agent, ops workflows, and SDK actions
- a WebSocket stream for live events
- secure frontend connectivity via gateway key + CORS controls

Supported workflow categories:

- Marketing/content operations (posts, campaigns, analytics)
- Developer operations (auth status, token debug, webhook subscription checks)

Root `/` is disabled by default in current builds.
Bundled Studio UI is served at `/studio/app` and contextual guidance is served at `/studio` (or `/studio/context`).
If you want gateway to serve additional static Studio assets, set:

- `SOCIAL_STUDIO_ASSET_DIRS=<comma-separated-absolute-or-relative-dirs>`

Each directory must be inside allowed gateway roots (project root / configured CLI home).

Studio routes:

- `GET /studio` or `GET /studio/context` (health/auth/readiness-aware launch page)
- `GET /studio/app` (bundled Studio frontend SPA)

## Endpoints

- `GET /api/health`
- `GET /api/status`
- `GET /api/sessions`
- `GET /api/config`
- `POST /api/config/update`
- `POST /api/chat/start`
- `POST /api/chat/message`
- `POST /api/ai`
- `POST /api/execute`
- `POST /api/cancel`
- `GET /api/sdk/status`
- `GET /api/sdk/doctor`
- `GET /api/sdk/actions`
- `POST /api/sdk/actions/plan`
- `POST /api/sdk/actions/execute`
- `WS /ws`

## SDK Contract

`/api/sdk/*` routes return a stable envelope:

```json
{
  "ok": true,
  "traceId": "sdk_xxx",
  "data": {},
  "error": null,
  "meta": {
    "action": "create_post",
    "risk": "MEDIUM",
    "requiresApproval": true,
    "approvalToken": "ap_xxx",
    "approvalTokenExpiresAt": "2026-01-01T00:00:00.000Z",
    "source": "gateway-sdk"
  }
}
```

For medium/high-risk actions:

1. Call `POST /api/sdk/actions/plan`
2. Use returned `approvalToken`
3. Call `POST /api/sdk/actions/execute` with `approvalToken` (and `approvalReason` for high-risk)

## Session Model

Sessions are persisted through the chat memory layer:

- storage path: `~/.social-cli/chat/sessions/*.json`
- resumed automatically when a known `sessionId` is provided

## Safety

- No shell execution in gateway action flow
- Uses `lib/chat/agent.js` + `lib/ai/executor.js`
- Pending actions require explicit conversational confirmation (`yes`/`no`)

## Railway + Frontend

Recommended env vars on Railway:

- `SOCIAL_GATEWAY_API_KEY=<long-random-secret>`
- `SOCIAL_GATEWAY_REQUIRE_API_KEY=true`
- `SOCIAL_GATEWAY_CORS_ORIGINS=https://<your-frontend-domain>`

Frontend requirements:

- Send `x-gateway-key` on REST requests.
- Use `wss://<gateway-domain>/ws?gatewayKey=<SOCIAL_GATEWAY_API_KEY>` for WebSocket auth.
- Health route (`/api/health`) remains public for platform probes.

## External Starter Screens

An external starter UI (multi-screen, agentic flow) is available at:

- `docs/agentic-frontend/`

It includes:

- Command Deck
- Agent Copilot
- Approvals Center
- Ads Diagnosis
- Ops Launchpad

## Files

- `src-runtime/commands/gateway.ts`
- `lib/gateway/server.ts`

## Studio Command Wiring

`social studio` supports:

- `--frontend-url <url>` for already-hosted UI
- `--frontend-path <path>` for local Studio projects (auto-starts local dev server or static host)

Default behavior:

- Without frontend overrides, `social studio` opens bundled app route: `/studio/app`
- Context landing remains reachable at `/studio`

