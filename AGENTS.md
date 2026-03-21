---

## **KEY DIFFERENCES FOR SOCIAL-FLOW**

This agents.md is rewritten specifically for a **flow/workflow system**, not a CLI tool. Here's what changed:

### **1. Flow-first thinking (not command-first)**

**social-CLI:** Rules about CLI commands, options, error messages
**social-flow:** Rules about flow definitions, state transitions, agent coordination

### **2. State management is critical**

Added **Rule 2: State Management** because flows are stateful:
- Must handle concurrent access (two agents writing same state)
- Must be atomic (no partial writes)
- Must be recoverable (crashes shouldn't corrupt state)
- Must use locking (prevent race conditions)

This wasn't needed in social-CLI because each command is stateless.

### **3. Multi-agent coordination**

Added **Rule 5: Agent Coordination** because flows often involve multiple agents:
- Sequential (Agent B waits for Agent A)
- Parallel (Agents work independently)
- Pipeline (Output of A feeds into B)
- Pub/Sub (Event-driven communication)

This is your PropAI multi-agent architecture.

### **4. Error recovery patterns**

**Rule 4: Error Recovery** is much more detailed because flows are long-running:
- Retry with exponential backoff
- Circuit breaker for repeated failures
- State cleanup on fatal errors
- Support manual recovery/restart

CLI commands fail fast. Flows must recover.

### **5. Rate limiting awareness**

**Rule 6: Rate Limiting** because social flows hit Meta APIs constantly:
- Check quota before requests
- Backoff on 429 responses
- Track usage across agents
- Queue requests when at limit

Critical for Instagram/WhatsApp automation.

### **6. Observability requirements**

Added **Rule 10: Flow Observability** because you need to debug running flows:
- Structured logging at each step
- Metrics (duration, success rate, error rate)
- Trace IDs for request correlation
- State snapshots for debugging

You can't step through a running flow with a debugger. You need logs and metrics.

### **7. Integration testing focus**

**Rule 11: Integration Testing** because flows touch real APIs:
- OAuth works end-to-end
- Webhook delivery works
- Rate limiting doesn't break flow
- Network failures are recovered

CLI tools can be unit tested. Flows need integration tests.

### **8. Security rules**

Added **Rule 17: Security** because flows handle sensitive data:
- Never log tokens/secrets
- Encrypt sensitive state
- Validate all external inputs
- Implement auth checks

Flows run unattended. Security is critical.

---

## **HOW TO USE THIS WITH CODEX**

### **When starting a new flow:**

```
You: "Read agents.md and follow those rules. Now create an Instagram story scheduler flow that posts at optimal times."

Codex: [reads agents.md]
       [creates flow definition with proper structure]
       [adds state management with locking]
       [implements retry logic]
       [adds rate limiting]
       [generates tests]
       [adds observability]
       [runs smoke test]
       "Done. All 18 rules satisfied."
```

### **When reviewing Codex's output:**

Check against agents.md:
- ✓ Flow has tests? (Rule 1)
- ✓ State management is atomic? (Rule 2)
- ✓ Error recovery implemented? (Rule 4)
- ✓ Rate limiting respected? (Rule 6)
- ✓ Observability added? (Rule 10)
- ✓ Security checked? (Rule 17)

If all yes -> Ship it.

---

## **WHAT THIS PREVENTS**

Based on your "goof ups" pattern, this prevents:

### **In social-CLI you had:**
- Tests drift from behavior
- Package bloat
- Handoff sprawl

### **In social-flow you'll prevent:**
- **State corruption** (Rule 2: atomic operations, locking)
- **Race conditions** (Rule 5: agent coordination)
- **Lost data** (Rule 4: error recovery, state persistence)
- **Rate limit violations** (Rule 6: quota tracking)
- **Undebuggable failures** (Rule 10: observability)
- **Security breaches** (Rule 17: credential handling)

These are the failure modes of **flow systems**, not CLI tools.

---

## **ADD THIS TO SOCIAL-FLOW REPO**

```bash
cd /path/to/social-flow
cp agents-social-flow.md agents.md
git add agents.md
git commit -m "Add agent operating rules for flow quality enforcement"
git push
```

Now every time you work with Codex on social-flow:

1. Start with: "Read agents.md and follow those rules"
2. Codex generates quality code automatically
3. You validate behavior, not quality

**Zero infrastructure. Just specification.**

---

**This is the right agents.md for social-flow.** It's tailored to the specific challenges of workflow systems, not CLI tools.

---

## **PRODUCT ROADMAP (DRAFT, CONTEXT-SIZED PHASES)**

### **Phase 1: Token UX Quick Wins (1-2 sessions)**
1. WhatsApp token hint deep-link + auto-open fallback (already started).
2. Clear “copy/paste token” CTA copy in CLI + TUI.
3. Add a short “Troubleshooting: token not found” hint.

### **Phase 2: Onboarding Flow Slice (1-2 sessions)**
1. Start screen: `Connect WhatsApp`, `Run Doctor`, `Send Test Message`.
2. Single-screen summary of what’s missing (token, WABA ID, phone ID).
3. “Fix now” links for each missing item.

### **Phase 3: WABA Doctor Slice (1-2 sessions)**
1. Make missing scopes/phone ID actionable with precise steps.
2. Add optional test message prompt.
3. Tighten error display for Meta API failures.

### **Phase 4: Agentic TUI Core Slice (2-3 sessions)**
1. Persistent status bar (profile, token, WABA, webhook).
2. OK/FAIL/SKIP badges everywhere.
3. “Fix with agent” for at least 1 failure case (token missing).

### **Phase 5: Reliability Slice (1-2 sessions)**
1. Retry + backoff on transient Meta API failures.
2. Sandbox vs Production confirmation for send actions.
3. Token expiry warnings when close to expiration.

### **Phase 6: Scale Slice (2-3 sessions)**
1. Multi-profile “agency mode” basics (switch + summary).
2. Minimal readiness dashboard per profile.
3. Metrics summary (success/fail counts + last error).

### **Definition of Done (Global)**
1. Each slice ships with tests for happy + expected failure.
2. Every user-facing error includes exact fix steps.
3. No token or secret is logged or persisted in plaintext logs.
4. Docs and CLI help updated for any new flow.
