# Social Flow Quickstart

Social Flow ships the deterministic CLI by default. Use it to manage config, run profile/post/ads actions, and replay logged operations from one consistent entrypoint.

For the beginner-first path, use the unified first-run flow first:

```bash
social start-here
```

Then open the canonical Studio app:

```bash
social studio
```

The Studio frontend defaults to `Start Here` in Beginner Mode and hides the advanced surfaces until you switch modes.

## 60-Second Start

```bash
# 1) Install
npm install -g @vishalgojha/social-flow

# 2) Configure token + defaults
social onboard
# also provisions Chromium for browser automation unless you pass --skip-browser

# 3) Validate setup
social doctor
social status
```

## First Commands

```bash
social hatch
social accounts summary
social accounts check --only needs-setup
social status --profiles
social profile get --fields id,name
social ops center
social post create --message "Hello team" --page-id PAGE_ID
social ads list --account act_123
social ai --provider deterministic "list ads account act_123"
```

## Studio

```bash
social hatch
```

Onboarding notes:
- Facebook/Instagram: opens Graph Explorer to generate a token.
- WhatsApp: opens Meta App Dashboard (WhatsApp API Setup) for token generation.
- `social studio` opens the canonical `/studio/app/` route. `--frontend-path` is for custom local frontends only.

## WhatsApp Send Safety

`social whatsapp send` requires `--sandbox` or `--prod` (or set `SOCIAL_WABA_MODE=prod`). Sandbox mode prints the payload and never sends.

## Local AI

```bash
social ai --provider ollama "get my facebook profile"
```

Default Ollama base URL: `http://127.0.0.1:11434`

## Source Workflow

```bash
npm ci
npm run build:social-ts
npm run test:social-ts
npm start
```

## Config Notes

- Current state path: `~/.social-flow/config.json`
- Legacy `~/.social-cli` and `~/.meta-cli` config is imported automatically
- Existing profile-based `.social-flow` config remains compatible with the latest CLI

## Next

- [README](README.md)
- [Examples](EXAMPLES.md)
- [Contributing](CONTRIBUTING.md)
