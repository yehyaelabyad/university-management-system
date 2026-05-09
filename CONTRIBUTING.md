# Contributing — UMS Team Workflow

This document describes how our team works together on the UMS project. It's owned by the Scrum Master and updated each sprint based on retrospective feedback.

## Team

- Yehia Mohamed (23P0067) — Product Owner (Sprint 1)
- Omar Tamer (23P0096) — Scrum Master (Sprint 1)
- Saeed Mohamed (23P0255) — Developer (Sprint 1)

Roles rotate every sprint per course instructions.

## Branching

- `main` is the integration branch. Sprint 1 work landed directly on `main` since the team is small and we coordinate closely.
- From Sprint 2 onwards: one branch per user story, named `feature/US-XX-short-description`. Open a PR back to `main` for review before merging.

## Commit message convention

- `feat:` new feature
- `fix:` bug fix
- `docs:` documentation
- `refactor:` code change without feature/bug
- `chore:` config / housekeeping

Reference the user story ID where relevant. Example:
```
feat: US-02 prevent double-booking on overlapping slots
```

## Daily Standups

- Every weekday at 7pm on a WhatsApp call (after classes).
- Each member answers the three standard questions:
  1. What did I do yesterday?
  2. What will I do today?
  3. Any blockers?
- Time-box: 15 minutes maximum.
- Anything that needs more than a brief discussion gets taken offline.

## Definition of Done

A story is considered Done when:

1. The feature meets all the acceptance criteria for that story.
2. The code is reviewed by another team member and merged into `main`.
3. Manual testing has been done with the relevant demo account(s) and the feature has no obvious bugs.
4. Both functional and non-functional requirements are met (the feature works correctly and the UI is usable).
5. README and inline comments are updated if behaviour changed.
6. The Product Owner has reviewed and accepted the feature.
7. The Jira ticket is moved to Done and the feature has been demonstrated during the sprint review.

## Sprint Cadence

- 2-week sprints.
- Sprint Planning at the start (4-hour time-box).
- Daily standups every weekday.
- Sprint Review and Sprint Retrospective at the end of each sprint.
- Sprint Goal is posted in Jira at planning time and visible on the board throughout the sprint.

## Tech Notes

- Vanilla HTML/CSS/JS only — no frameworks.
- Data is stored in `localStorage` under `ums_*` namespaced keys (e.g. `ums_rooms`, `ums_students`).
- The shell (`index.html`) defines shared helpers — `getStore`, `setStore`, `openModal`, `closeModal`, `currentUser`. Module files use these globals.
- The Curriculum module (US-06 + US-07) lives in `js/courses.js` and is loaded via a `<script>` tag in `index.html`.

## Code Style

- Each user-story-related function has a comment header indicating which story it implements.
- Prefer descriptive function names over short ones (`renderCoursesAdmin`, not `rcA`).
- Keep render functions pure: they read state, produce HTML — no global side effects beyond updating `mainContent`.
- Confirmation dialogs (`confirm()`) before any destructive action (delete, etc.) per the Definition of Done.
