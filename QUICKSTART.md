# Social Flow Quickstart

Social Flow is the execution engine for Meta operations. Use the CLI to get running fast, then expand to Gateway + SDK when needed.

## 60-Second Start

```bash
# 1) Install
npm install -g @vishalgojha/social-flow

# 2) Guided setup + readiness checks
social start-here

# 3) Open conversational control plane
social hatch
```

Optional Studio UI:

```bash
social studio --url http://127.0.0.1:1310
```

## Verify It Is Working

```bash
social auth status
social marketing status
social ops morning-run --workspace default
```

## Common Next Commands

```bash
social marketing portfolio --preset last_7d --target-daily 250
social marketing insights --help
social ops approvals list --workspace default --open
social ops alerts list --workspace default --open
```

## Source Workflow (Developers)

```bash
npm ci
npm run build
npm start
```

## If Something Breaks

- `social` not found: open a new terminal and rerun
- Auth/token issue: run `social start-here` again
- Gateway issue: run `social start --force`, then retry `social studio`

## Where To Go Next

- [README](README.md)
- [Examples](EXAMPLES.md)
- [Gateway UI/API](docs/GATEWAY_UI.md)
- [Hatch UI](docs/HATCH_UI.md)
- [SDK](sdk/README.md)
