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

The Bootstrap policy workflow evaluates PR metadata without executing PR code. Small README.md or docs/*.md changes (at most 10 files and 500 changed lines) from repository contributors can pass and merge automatically. Agent instruction files are excluded. This checks scope, not prose correctness, links, AI findings, or application behavior.

Code, configuration, large changes, and external contributions cannot use this automatic path. Main requires the bootstrap-policy status, an up-to-date branch, and resolved review conversations. Force pushes and deletion are disabled. Administrators are subject to protection too.

For an intentional bootstrap change, glumbis can open Actions > Bootstrap policy > Run workflow on main, supply the PR number and exact head commit SHA, and run it. This is an explicit owner approval for that commit and enables protected merging. It does not claim tests passed. Refresh the branch and repeat the decision if the commit changes. Contributors cannot use this owner path.

Draft PRs remain blocked until marked ready. If another PR merges first, use Update branch and let the gate rerun. New workflow changes must be reviewed carefully; they govern repository permissions.

## Before automatic application merges

1. Pick the smallest product demo and stack with glumbis.
2. Establish installation, build, lint/type checks, and meaningful tests in CI.
3. Configure Codex review and an explicit machine-readable AI-review result tied to the current commit. Bot silence is not an approval. Native Codex review settings are separate from GitHub settings.
4. Replace the bootstrap-only code restriction with tested application and AI gates; require those checks in branch protection. Keep sensitive changes on the owner-review path.
5. Test failing checks, missing review, new commits, conflicts, sensitive files, and successful routine PRs before enabling application auto-merge.

No API key or paid AI workflow has been provisioned. Do not paste credentials into issues, PRs, or chat. Use repository secrets for any future API integration.

## First ten minutes as a team

Agree on the target user and a two-minute demo. Split four independent tasks, assign one owner each, agree shared interfaces, and make a tiny PR early. Keep features small; demonstrate the integrated app frequently. Reserve time for integration and presentation.
