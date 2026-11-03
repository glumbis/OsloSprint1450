# OsloSprint1450

Hackathon workspace for four contributors using AI assistants.

## Current status

The product and technology stack are not selected. AGENTS.md contains the team's working agreement. Bootstrap documentation checks and protected auto-merge are configured. Application CI and AI review are not active until a stack and review integration are selected. See [the hackathon guide](docs/HACKATHON.md).

## Before feature work

1. Agree on the target user, problem, and smallest demo.
2. Choose the language/framework and deployment target with glumbis.
3. Create a minimal runnable application, commit its lockfile, and document exact setup/build/test commands here.
4. Add application CI with meaningful tests and a stable required check name.
5. Configure AI review and a machine-readable pass/fail gate tied to the exact PR commit. A bot comment or no findings is not sufficient by itself.
6. Configure main protections: PRs required, required checks, current branch required, resolved conversations, no force pushes/deletion, and no automation bypass.
7. Configure routine PR auto-merge only after those gates pass. Sensitive changes require glumbis; enforce that in the merge gate, not just these instructions.
8. Test the system using PRs with a passing change, failing test, sensitive-file change, missing AI review, and new commit after approval. Confirm failures block merging.

For this personally owned repository, do not assume an organization merge queue is available. Use protected auto-merge with up-to-date checks if supported.

## Suggested division of work

Assign independent features, each with one owner and its own branch. Agree on shared interfaces before frontend/backend work starts. Keep PRs small. Separate working folders do not isolate shared databases or services.

## Task brief

- User outcome:
- Acceptance criteria:
- Owner:
- Expected files or module:
- Dependencies and agreed interfaces:
- Validation:
- Out of scope:

## Daily workflow

See [docs/HACKATHON.md](docs/HACKATHON.md) for branches, PRs, automatic documentation merges, and owner decisions for bootstrap code changes.

## Developer commands

To be filled from the chosen stack; do not assume commands exist before adding the application.
