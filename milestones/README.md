# Milestones

Development planning lives here (spec §22). Nothing about planning lives elsewhere.

## Contents

| File | Purpose |
|---|---|
| [roadmap.md](./roadmap.md) | Dependencies and release progression M001 → M007 |
| [release-plan.md](./release-plan.md) | Versioning and release gates |
| [technical-debt.md](./technical-debt.md) | Tracked debt with priorities and dispositions |
| [milestones/](./milestones/) | Per-milestone specs (objective, scope, tasks, tests, docs, acceptance, risks, debt) |
| [sprints/](./sprints/) | Sprint specs split out of milestones |

## Rules

- Stable identifiers: `M001`…`M007`, sprints `M00X-S0Y`. Never reuse.
- Every milestone carries: objective, scope, prerequisites, deliverables, technical tasks, test requirements, documentation requirements, acceptance criteria, risks, dependencies, outstanding debt.
- **Do not overwrite completed milestone specs.** Append amendments and completion reports.
- Dependencies are hard: M002 before M003 before M004… (spec §26).
- Technical debt is explicit, prioritised, assigned a disposition — never implied.
- Definition of Done for the whole project: spec §27.
