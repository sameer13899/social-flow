# Social Flow Studio

This folder contains the canonical Studio frontend served by the gateway at `/studio/app/`.

The UX is beginner-first by default:

- `Start Here` is the landing screen
- Beginner mode hides advanced build/run/config surfaces
- Advanced mode is persisted in local storage per browser

## Included Screens

- `Campaign Home`: readiness, risk pressure, and source health
- `Agent Copilot`: conversation-first control with plan preview + live websocket events
- `Approvals Center`: pending approvals and open alerts with resolve/ack actions
- `Ads Diagnosis`: form wrapper for `social marketing diagnose-poor-ads`
- `Launchpad`: identity setup, morning run, guard mode, and handoff generation
- `Keys`: BYOK encrypted key vault management (`/api/keys`)
- `Agents`: built-in + user-defined agent registry (`/api/agents`)
- `Tools`: typed tool registry with schema metadata (`/api/tools`)
- `Recipes`: JSON/YAML multi-step workflow management (`/api/recipes`)
- `Triggers`: cron/webhook/event recipe execution (`/api/triggers`)
- `Webchat`: widget key lifecycle, public session simulation, operator replies (`/api/webchat/public/*`, `/api/channels/webchat/*`)
- `Baileys`: WhatsApp Web session controls and message logs (`/api/channels/baileys/*`)
- `Logs`: hosted observability stream (`/api/logs`)

## Optional Baileys Dependency

Install this in deployments that need WhatsApp Web sessions:

```bash
npm install @whiskeysockets/baileys
```

Without this package, Baileys routes stay available but return dependency-missing errors on connect.

## Run Locally

1. Start gateway (example):

```bash
social gateway --host 127.0.0.1 --port 1310
```

2. Serve this folder as static files:

```bash
bun scripts/bun/studio-serve.ts docs/agentic-frontend 4173 http://127.0.0.1:1310
```

3. Open:

- `http://127.0.0.1:4173`

If you want a quick local check of the mode switch and startup route, run:

```bash
npm run smoke:frontend
```

4. In the app settings panel, set:

- Gateway URL: `http://127.0.0.1:1310`
- Gateway API key: if your gateway requires `x-gateway-key`
- User API key: required for hosted multi-agent routes (`x-api-key`)

## Custom Launches

If you host this frontend somewhere else, use:

```bash
social studio --url http://127.0.0.1:1310 --frontend-url http://127.0.0.1:4173
```

For a local Vite Studio project folder:

```bash
social studio --url http://127.0.0.1:1310 --frontend-path C:\Users\you\Downloads\social-flow-ui
```

`social studio --frontend-path ...` is for custom frontend projects and built assets. The default app path remains `/studio/app/`.
