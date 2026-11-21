# Agent handoff

Use this template when ending a session or handing work to another agent/human.

## Session handoff template

```markdown
## Handoff — <date>

### Current milestone
M00X — <name> (<state: not-started | in-progress | blocked>)

### Completed
- <file/change> — <verification run>

### In progress
- <task> — <exact next step>

### Blocked / awaiting decision
- <question> — <options, recommendation, who decides>

### Verification status
- `pnpm verify`: pass/fail (<failing step if any>)
- Untested changes: <list>

### Key context
- Decisions made this session (ADR links or "none")
- Debt recorded (file links)
- Spec sections consulted: <§§>
```

## Continuation checklist for the next agent

1. Read root `AGENTS.md`, then this handoff.
2. Read `PROGRESS.md` (session-level checklist, if present) and the current milestone file.
3. Run `pnpm verify` to confirm the stated baseline.
4. Inspect uncommitted changes (`git status`, `git diff`) before editing anything.
5. Resume from the exact next step — do not re-explore settled questions.

## Never hand off

- Secrets, tokens, real credentials or production financial data.
- Unverified claims as facts — label assumptions explicitly.
