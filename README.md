# vibe-spec

Spec-first development protocol for AI coding agents.

**One command. Your agent learns the rules.**

```bash
npx vibe-spec init
```

## What is this?

When you work with AI coding agents (Cursor, Claude Code, Copilot, Aider, etc.), the agent can write code fast — but it doesn't know *what to protect*. It rewrites things that shouldn't change. It skips tests. It drifts from the spec.

**vibe-spec** solves this with a simple protocol:

1. A `.vibe/` directory holds your **contract layer** — product spec, tech stack, system design, and module interface contracts.
2. An `AGENTS.md` section tells the agent the rules — read the specs, maintain the contracts, write contract tests, never break interfaces without approval.

The agent plans and builds however it wants. vibe-spec doesn't dictate workflow — it dictates **what to protect and what to verify**.

## Quickstart

```bash
npx vibe-spec init
```

This creates:

```
.vibe/
├── SPEC.md       # Product requirements (why + what)
├── STACK.md      # Tech stack constraints (with what)
├── DESIGN.md     # System architecture (how, at a high level)
└── modules/      # Module interface contracts
```

And appends the vibe-spec protocol section to your `AGENTS.md`.

Then tell your coding agent:

> Read AGENTS.md, fill in .vibe/ based on this project.

That's it. The agent reads the protocol, fills in the specs, and follows the rules from then on.

## The Contract Layer

All `.vibe/` files are the **contract layer** — they represent team decisions about what to build, with what, and how modules talk to each other.

Source code is the **implementation layer** — disposable, rewritable. The contract layer is not.

| File | Purpose |
|------|---------|
| `SPEC.md` | Product requirements — user stories, functional/non-functional requirements |
| `STACK.md` | Tech stack — language, frameworks, libraries, conventions |
| `DESIGN.md` | System architecture — data model, API design, module boundaries |
| `modules/*.md` | Module contracts — public interface + contract test scenarios |

### Change propagation is top-down

```
SPEC → DESIGN → modules → code
```

Never bottom-up. If code reveals a spec problem, update the spec first.

## Testing Philosophy

vibe-spec enforces two categories of tests:

**Contract tests** (iron law): verify that a module's public interface behaves as specified in `modules/*.md`. These tests survive code rewrites — they test *what*, not *how*. They are never deleted unless the contract changes.

**Unit tests** (disposable): verify internal implementation logic. When code is rewritten, these can be rewritten too.

The key insight: contract tests are the safety net that lets you aggressively rewrite implementation code. Without them, every rewrite is a gamble.

## Agent Usage

### Cursor

After running `npx vibe-spec init`, Cursor's agent will automatically read `AGENTS.md` and follow the protocol. No special configuration needed.

### Claude Code

Claude Code reads `AGENTS.md` by default. After init, ask it to:

> Read AGENTS.md and fill in the .vibe/ directory based on the current project.

### Other Agents

Any agent that supports `AGENTS.md` (or can be told to read a file) works. The protocol is just markdown — nothing agent-specific.

## License

MIT
