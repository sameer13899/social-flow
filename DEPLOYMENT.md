# Self-Hosted Deployment

Social Flow is designed to run as a self-hosted control plane with SaaS-style UX.

This document covers:

- local or server install
- Docker deployment
- persistence and storage layout
- first boot and hardening
- upgrades
- backup and restore

## Deployment Modes

### 1. Single-machine install

Good for:

- owner-operated deployments
- agency internal ops
- Windows or Linux workstation/server installs

Typical flow:

```bash
npm install -g @vishalgojha/social-flow
social start-here
social start
social studio --url http://127.0.0.1:1310
```

### 2. Docker / Compose

Good for:

- VPS hosting
- team-shared internal deployment
- persistent self-hosted environments behind a reverse proxy

```bash
docker compose -f docker-compose.hosted.yml up -d --build
```

## Persistent Data

Social Flow stores state on disk. Back this up.

Default locations:

- config: `~/.social-cli/config.json`
- chat sessions: `~/.social-cli/chat/`
- hosted data: `~/.social-cli/hosted/`
- ops workspace state: `~/.social-cli/ops/`

Hosted/channel subdirectories may include:

- recipes
- triggers
- webchat
- baileys
- gateway logs

Overrideable roots:

- `SOCIAL_CLI_HOME`
- `META_CLI_HOME` (backward compatibility)
- `SOCIAL_HOSTED_HOME`
- `SOCIAL_HOSTED_RECIPES_DIR`
- `SOCIAL_HOSTED_TRIGGERS_DIR`
- `SOCIAL_WEBCHAT_DIR`
- `SOCIAL_BAILEYS_DIR`

Recommendation:

- keep config and hosted data on a persistent disk
- do not rely on ephemeral container filesystems
- snapshot both config and hosted roots together

## Required Environment Variables

For any serious self-hosted deployment, set:

- `SOCIAL_GATEWAY_API_KEY`
- `SOCIAL_GATEWAY_REQUIRE_API_KEY=true`
- `SOCIAL_HOSTED_MASTER_KEY`
- `SOCIAL_HOSTED_BOOTSTRAP_API_KEY`
- `SOCIAL_HOSTED_BOOTSTRAP_USER_ID`

Recommended when exposing Studio remotely:

- `SOCIAL_GATEWAY_CORS_ORIGINS=https://studio.yourdomain.com`
- `SOCIAL_GATEWAY_RATE_MAX=180`
- `SOCIAL_GATEWAY_RATE_WINDOW_MS=60000`

Optional storage overrides:

- `SOCIAL_HOSTED_HOME=/data/social-flow`
- `SOCIAL_HOSTED_RECIPES_DIR=/data/social-flow/recipes`
- `SOCIAL_HOSTED_TRIGGERS_DIR=/data/social-flow/triggers`

## First Boot Checklist

1. Start the gateway.

```bash
social start
```

2. Verify health.

```bash
curl http://127.0.0.1:1310/api/health
```

3. Open Studio.

```bash
social studio --url http://127.0.0.1:1310
```

4. In Studio, finish:

- Setup Concierge
- Workspace Admin
- Ops Launchpad

5. Confirm these are green:

- gateway key configured and enforced
- default token configured
- agent API key configured
- Studio assets installed
- hosted master/bootstrap secrets configured

## Reverse Proxy / HTTPS

If you expose Social Flow outside localhost:

- terminate TLS at a reverse proxy
- restrict CORS to your Studio origin
- keep `SOCIAL_GATEWAY_REQUIRE_API_KEY=true`
- do not expose admin surfaces without a gateway key

Recommended topology:

- `https://studio.yourdomain.com` -> reverse proxy -> `http://127.0.0.1:1310`

## Upgrade Playbook

### Global npm install

```bash
npm install -g @vishalgojha/social-flow@latest
social doctor
social start
```

### Repo / pinned deployment

```bash
git pull
npm ci
npm run build
node bin/social.js --no-banner gateway --host 0.0.0.0 --port 1310 --require-api-key
```

After every upgrade:

- run `social doctor`
- open Studio Workspace Admin
- review system checks
- confirm recipes, triggers, webchat, and Baileys paths still exist

## Backup

Back up both:

- `~/.social-cli/`
- your explicit hosted storage directories if overridden by env vars

Minimum backup set:

- `config.json`
- `hosted/`
- `ops/`
- `chat/`

Recommended cadence:

- daily snapshot for production
- before every upgrade
- before changing storage paths or env vars

## Restore

1. Stop the gateway.
2. Restore the config and hosted data directories.
3. Reapply the same env vars as the original deployment.
4. Start the gateway.
5. Open Studio Workspace Admin and verify:

- storage paths present
- gateway security checks green
- invites, roles, recipes, triggers, and logs visible

## Docker Notes

When using Docker, mount persistent volumes for:

- config home
- hosted data
- logs

Example concerns:

- do not rebuild into anonymous volumes only
- keep Baileys auth state on persistent storage
- keep webchat session state on persistent storage

## Smoke Checks

Use these after first deploy or after upgrades:

- `GET /api/health`
- `GET /api/status`
- `GET /api/self-host/admin`
- Studio loads at `/studio/app/`
- Setup Concierge shows saved config
- Workspace Admin shows green hardening checks
- Logs screen returns recent entries

## Studio Surfaces For Admins

The main self-hosted admin surfaces are:

- Setup Concierge: credentials and onboarding
- Workspace Admin: hardening, paths, invites, roles, activity
- Ops Launchpad: guardrails, handoff, morning ops
- Logs: gateway/runtime inspection
