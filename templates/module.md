# Module: [module-name]

## Purpose

<!-- Single responsibility statement. One sentence.
e.g. "Handles user authentication and issues session tokens." -->

## Public Interface

<!-- The contract other modules depend on. Everything here is protected — changes require updating contract tests.

### `functionName(param: Type): ReturnType`
Description of behavior and any invariants.

### `POST /api/resource`
Request: `{ field: type }`
Response: `{ field: type }`
Error cases: `401`, `422`
-->

## Contract Test Scenarios

<!-- Each scenario here MUST have a corresponding test. These tests survive code rewrites.
Format: Given [precondition], when [action], then [expected result]. Reference the FR it covers.

- **S-1** (FR-1): Given a valid user, when calling X, then Y is returned.
- **S-2** (FR-1): Given an invalid input, when calling X, then a 422 error is returned.
-->

## Dependencies

<!-- Other modules this module calls. Helps identify coupling and change impact.
- [module-name]: reason
-->

## Implementation Notes

<!-- Optional. Non-binding notes for implementors — hints, known trade-offs, links to ADRs.
Not part of the contract. Can change freely. -->
