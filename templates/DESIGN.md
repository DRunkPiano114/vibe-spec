# System Design

## Architecture Overview

<!-- High-level architecture: monolith, microservices, serverless, etc.
Describe the major layers and how they relate. Include a diagram if helpful. -->

## Data Model

<!-- Core entities and their relationships.

- **User** (fields: id, email, created_at · relations: has many Orders)
- **Order** (fields: id, user_id, total · relations: belongs to User, has many Items)
-->

## Module Boundaries

<!-- The major modules and their single responsibility.
Each module listed here must have a corresponding .vibe/modules/<name>.md file.

- **auth**: authentication and session management
- **billing**: payment processing and subscriptions
-->

## API Design

<!-- The interfaces between modules and with external clients — REST endpoints, GraphQL schema, RPC methods, events.
Define these after module boundaries, since APIs are the product of boundary decisions.

### `POST /api/resource`
Request: `{ field: type }`
Response: `{ field: type }`
-->

## Key Flows

<!-- Walk through 2-3 critical paths through the system as numbered steps.

### Flow: [name]
1. User does X
2. System does Y
3. Module A calls Module B with Z
4. Response returned
-->
