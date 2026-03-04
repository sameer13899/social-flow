# Social Flow Project Summary

## Positioning

Social Flow is a self-hosted execution engine for Meta operations, with a CLI as the fastest entry point.

It is not just a thin API wrapper. It is the reliability layer that keeps Meta workflows deterministic, recoverable, and safe at scale.

## What It Solves

- Token/scope/credential lifecycle drift
- Rate limits, pagination edge cases, and partial failures
- High-risk action control with approvals and auditability
- Multi-account, multi-workspace operator workflows
- Reliable execution for human operators and autonomous agents

## Product Surfaces

- CLI (`social ...`) for day-to-day operator speed
- Conversational operator interface (`social hatch`)
- Studio launcher (`social studio`)
- Gateway (REST + WebSocket)
- SDK endpoints for integration into internal tools and agent systems

## Core Capability Areas

- Guided setup and readiness checks
- Marketing/Graph/Instagram/WhatsApp operations
- Team-safe operations (roles, approvals, alerts, handoff runbooks)
- Chat-first planning with confirmation on risky actions
- Deployment-friendly runtime for local and hosted environments

## Why This Matters

Most teams can build dashboards and analytics quickly. The painful part is trustworthy execution in production. Social Flow focuses on that hard layer so teams can automate confidently without constant manual babysitting.

## Primary Users

- Agencies managing multiple clients and ad accounts
- Ops teams running daily marketing workflows
- Indie builders shipping automation services
- Agent builders needing a stable Meta action surface

## Current North Star

Make Social Flow the default execution backbone for Meta ops:

- CLI-first onboarding in minutes
- Reliable day-2 operations with approvals and observability
- Easy extension via Gateway + SDK

## Related Docs

- [README](README.md)
- [QUICKSTART](QUICKSTART.md)
- [EXAMPLES](EXAMPLES.md)
- [DEPLOYMENT](DEPLOYMENT.md)
- [SDK README](sdk/README.md)
