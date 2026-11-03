# Hackathon quick start

## Working locally

Open this repository in VS Code or Codex. Each person clones their own copy.
Before a new task, start from current main:

```sh
git switch main
git pull --ff-only
git switch -c yourname/short-task
```

Ask your AI to read AGENTS.md, implement one task, run relevant checks, and open a PR. Include acceptance criteria and the files/module you own. Use a separate worktree for each simultaneous agent on one computer.

## What is automated now

All team PRs, including code and large changes, use the same Codex review gate. It checks the real bot identity, exact current commit, completed review, and absence of findings. Optional Security Review must also be clean when it runs. Missing or unrecognized review data keeps the PR blocked.

The workflow reads GitHub metadata only; it never checks out or executes PR code. It attempts a squash merge using the reviewed commit SHA, so a newer commit cannot slip into that merge. GitHub still enforces required checks, up-to-date branches, and resolved conversations.

Review-summary events trigger evaluation. A scheduled retry runs approximately every ten minutes (GitHub scheduling can be delayed). Missing reviews are requested once per commit after a short grace period. This does not repeatedly invoke AI when nothing changes. If quota or service availability prevents review, fix the issue and request `@codex review` again.

If another PR lands first, use Update branch. The new commit needs a new review. Draft PRs remain blocked. External forks must first be brought to a team branch.

The required status remains named `bootstrap-policy` for continuity with existing branch protection. Administrators are subject to protection too. There is no blanket human approval requirement and no owner bypass in the new workflow.

## Before building your application

1. Agree on the smallest product demo and choose the stack.
2. Establish installation, build, lint/type checks, and meaningful tests in CI.
3. Add those application checks to main's required checks. The merge workflow respects them.
4. Test passing and failing application PRs before relying on automatic merges for the demo.

No application CI exists yet. Automated review is useful feedback, not proof that an application runs. Native Codex review focuses on serious findings and can miss issues. Keep PRs small even though large PRs are accepted.

The review-summary metadata format is supplied by the Codex integration. If it changes, the gate fails closed and needs updating; it does not infer success from prose or emojis.

No paid API reviewer or API secret has been provisioned. Reviews use the connected Codex integration and its applicable allowance.

## First ten minutes as a team

Agree on the target user and a two-minute demo. Split four independent tasks, assign one owner each, agree shared interfaces, and make a tiny PR early. Keep features small; demonstrate the integrated app frequently. Reserve time for integration and presentation.

## Checking the merge automation

Run `node .github/tests/review-merge.cjs`. The tests execute the actual workflow script against mocked GitHub APIs, including blocked-review cases and retry deduplication. GitHub also runs this suite on pushes and PRs; it validates the merge gate, not your future application.
