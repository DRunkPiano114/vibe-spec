# vibespec

Spec-first development protocol for AI coding agents.

We believe that spec-driven development and rigorous contract testing makes speed sustainable.




## The problem with vibecoding

AI coding agents write code fast — but they don't know *what to protect*. They rewrite things that shouldn't change. They skip tests. They drift from the original plan. The more you vibe, the more the codebase diverges from intent.

**vibespec** fixes this with two things:

1. A `.vibe/` directory — the **contract layer**: spec, stack, design, and module interface contracts. The agent reads these before writing any code.
2. **Contract tests** — the enforcement layer: every module contract defines test scenarios that must pass. When a test fails, the agent fixes the code, not the test.

Specs tell the agent what to build. Tests prove it was built correctly. Together they give the agent a hard boundary: move fast, but don't break what's been decided.

## Quickstart

**Step 1 — scaffold your project:**

```bash
npx @soberpiano/vibespec init
```

This creates:

```
.vibe/
├── SPEC.md       # Product requirements (why + what)
├── STACK.md      # Tech stack constraints (with what)
├── DESIGN.md     # System architecture (how, at a high level)
└── modules/      # Module interface contracts
AGENTS.md         # ← vibespec protocol appended (existing content preserved)
```

**Step 2 — tell your agent:**

> Read AGENTS.md, then fill in the .vibe/ files based on this project.

That's it. The agent reads the protocol once and follows the rules from then on — in every subsequent conversation.


## How agents use .vibe/

The `.vibe/` directory is the **contract layer**. Source code is the **implementation layer** — disposable and rewritable. The contract layer is not.

| File | What the agent reads from it |
|------|------------------------------|
| `SPEC.md` | What to build and why — user stories, functional requirements |
| `STACK.md` | What tools to use — language, frameworks, libraries, conventions |
| `DESIGN.md` | How the system is structured — data model, API design, module boundaries |
| `modules/*.md` | The exact public interface of each module + contract test scenarios |

### Change propagation is top-down

```
SPEC → DESIGN → modules → code
```

If a feature changes, the agent updates SPEC first, then DESIGN, then modules, then code — never the reverse.

### Module contracts

Each `modules/*.md` file defines:
- **Public interface** — the endpoints, functions, or events other modules depend on
- **Contract test scenarios** — exact behaviors that must be verified with tests

### Tests are the enforcement mechanism

Specs without tests are wishes. **Tests are the only thing that makes a spec real.**

vibespec enforces two categories of tests, with fundamentally different rules:

**Contract tests — iron law.**
Written against the scenarios defined in `modules/*.md`. They verify *what* a module does, not *how* it does it. They survive complete implementation rewrites. If the auth module is rewritten from scratch, the contract tests still run unchanged — and must still pass.

**Unit tests — disposable.**
Verify internal implementation logic. When code is refactored or rewritten, unit tests can be rewritten too. They follow the code.

The agent operates under one absolute rule: **when a test fails, fix the code — not the test.** Modifying a test to make it pass is not fixing the problem — it's hiding it. The test encodes a decision. Changing the test without changing the contract first means the contract and the code silently diverge.

This is the hard guarantee vibespec provides: the agent can move fast, experiment freely, and rewrite aggressively — because contract tests are a floor it cannot fall through. Every session, every rewrite, every refactor is bounded by what the tests say must remain true.

## Re-running init

Running `init` again on an existing project is safe — it skips files that already exist:

```bash
npx @soberpiano/vibespec init
# Skipped .vibe/SPEC.md (already exists)
# Skipped AGENTS.md (vibe-spec section already exists)
```

To force overwrite everything:

```bash
npx @soberpiano/vibespec init --force
```

## Why this works

LLM agents have perfect recall within a session — but no memory across sessions. `.vibe/` files act as **persistent memory**: the agent re-reads them at the start of every conversation and always has the full picture.

Contract tests act as **machine-enforced correctness**: even when the agent misunderstands intent, makes an optimistic assumption, or silently changes behavior during a refactor — the tests catch it before it ships.

```
.vibe/     →  agent knows what to build and what the boundaries are
tests/     →  machine verifies the agent actually did it right
```

Without specs: the agent drifts — every session pulls the codebase in a slightly different direction.
Without tests: the agent ships broken things confidently — no friction, no feedback, no floor.
**With both: the agent moves fast *and* stays correct.** Speed without drift. Autonomy without chaos.

## License

MIT
