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

Two categories of tests, fundamentally different:

- **Contract tests** (iron law): verify that the module's public interface behaves as specified in `modules/*.md`. These tests survive code rewrites — they test WHAT, not HOW. They are never deleted unless the contract changes.
- **Unit tests** (disposable): verify internal implementation logic. These follow the code — when code is rewritten, these can be rewritten too.

Rules:
- Every contract test scenario listed in `modules/*.md` MUST have a corresponding test.
- Tests must pass before any commit.
- When a test fails: fix the code, not the test (unless the contract itself changed).
- No code without tests. Untested code = nonexistent code.

### Rules

1. Read `.vibe/` before writing code.
2. When modifying `modules/*.md`, always update contract tests in the same change.
3. Every module interface change must update the contract test scenarios.
4. Test failures mean the code is wrong, not the test.
5. Keep `.vibe/` files in sync — if you change behavior, update the spec.
6. Change propagation is top-down: SPEC → DESIGN → modules → code.
<!-- vibe-spec:end -->
