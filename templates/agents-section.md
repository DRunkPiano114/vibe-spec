<!-- vibe-spec:start -->
## vibe-spec Protocol

This project uses **vibe-spec** — a spec-first development protocol. The `.vibe/` directory is the **contract layer** (source of truth). Source code is the **implementation layer** (disposable, rewritable). Always read `.vibe/` before writing code.

### .vibe/ Directory

```
.vibe/                          # Contract Layer — source of truth
├── SPEC.md                     # Product requirements (why + what)
├── STACK.md                    # Tech stack constraints (with what)
├── DESIGN.md                   # System architecture (how, at a high level)
└── modules/                    # Module interface contracts
    ├── auth.md                 #   public API + contract test scenarios
    └── payment.md
```

- **SPEC.md**: product requirements — user stories, functional requirements, non-functional requirements. The "why" and "what".
- **STACK.md**: tech stack decisions — language, frameworks, libraries, conventions. The "with what".
- **DESIGN.md**: system architecture — data model, API design, module boundaries, key flows. The "how" at a high level.
- **modules/*.md**: module interface contracts — public API surface (endpoints, function signatures, events) and **contract test scenarios** (exact behaviors that must be verified).

All `.vibe/` files represent team decisions. They are not suggestions — they are constraints.

### Maintaining .vibe/ Files

- **Before coding a new feature**: check if `.vibe/` files cover it. If not, update SPEC.md / DESIGN.md / modules/ FIRST, then code.
- **Change propagation is top-down**: SPEC → DESIGN → modules → code. Never bottom-up. If code reveals a spec problem, update the spec first.
- **Contract changes require test updates**: when a module interface changes, update both `modules/*.md` and the corresponding contract tests in the same change. The tests are the proof that the new contract works.
- **Keep files in sync**: if you change behavior, update the corresponding `.vibe/` files.

### Testing Discipline

Tests are not optional. They are the only reliable enforcement mechanism for everything defined in `.vibe/`. Specs tell you what to build. Tests prove it was built correctly.

Two categories of tests, with fundamentally different rules:

- **Contract tests** (iron law): verify that a module's public interface behaves exactly as specified in `modules/*.md`. They test WHAT, not HOW — so they survive complete implementation rewrites. They are never deleted unless the contract itself changes and is approved.
- **Unit tests** (disposable): verify internal implementation logic. They follow the code — when the implementation is rewritten, these can be rewritten too.

Rules:
- Every scenario listed in `modules/*.md` MUST have a corresponding contract test.
- Tests must pass before any commit.
- **When a test fails: fix the code, not the test.** A test encodes a contract decision. Modifying a test to make it pass without changing the contract first means the spec and the code silently diverge — this is the failure mode vibespec exists to prevent.
- No code without tests. Untested code = nonexistent code.

### Rules

1. Read `.vibe/` before writing code.
2. Change propagation is top-down: SPEC → DESIGN → modules → code. Never reverse.
3. When modifying `modules/*.md`, update contract tests in the same change.
4. Test failures mean the code is wrong, not the test.
5. Keep `.vibe/` files in sync — if behavior changes, update the spec first.
<!-- vibe-spec:end -->
