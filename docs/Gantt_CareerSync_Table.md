Gantt Chart Task Table — CareerSync

| ID | Name | Duration | Start | Finish | Predecessors |
|---:|---|---:|---:|---:|---|
| 1 | Kickoff & Setup | 7d | 2025-11-17 | 2025-11-23 | — |
| 2 | Repo + CI baseline | 7d | 2025-11-24 | 2025-11-30 | 1 |
| 3 | SRS & Stories | 14d | 2025-11-24 | 2025-12-07 | 1 |
| 4 | Architecture & Data Model | 12d | 2025-11-24 | 2025-12-05 | 3 |
| 5 | Security Checklist | 4d | 2025-12-01 | 2025-12-04 | 4 |
| 6 | UI/UX Prototype | 14d | 2025-12-08 | 2025-12-21 | 4, 3 |
| 7 | Component Library & Tokens | 7d | 2025-12-15 | 2025-12-21 | 6 |
| 8 | Auth & Session Flow | 14d | 2025-12-22 | 2026-01-04 | 2, 4 |
| 9 | DB Models & CRUD | 14d | 2025-12-22 | 2026-01-04 | 4 |
|10 | FE Login & Profile | 14d | 2025-12-22 | 2026-01-04 | 6, 7 |
|11 | App CRUD + Uploads | 14d | 2026-01-05 | 2026-01-18 | 9, 8 |
|12 | FE Application Screens & Upload UX | 14d | 2026-01-05 | 2026-01-18 | 10, 11 |
|13 | JobBoard Sync (skeleton) | 14d | 2026-01-05 | 2026-01-18 | 9 |
|14 | Achievements Engine (rules & schema) | 14d | 2026-01-19 | 2026-02-01 | 11, 13 |
|15 | Dashboard visuals & charts | 14d | 2026-01-19 | 2026-02-01 | 12, 14 |
|16 | Instrumentation / event logging | 14d | 2026-01-19 | 2026-02-01 | 2, 9 |
|17 | Email templates & SMTP | 14d | 2026-02-02 | 2026-02-15 | 14, 11 |
|18 | File storage lifecycle & downloads | 14d | 2026-02-02 | 2026-02-15 | 11 |
|19 | Accessibility & responsive polish | 14d | 2026-02-02 | 2026-02-15 | 6, 7 |
|20 | Integrations & edge-case fixes | 14d | 2026-02-16 | 2026-02-29 | 17, 18, 19 |
|21 | Automated tests & CI coverage gates | 14d | 2026-02-16 | 2026-02-29 | 16, 14 |
|22 | Performance testing & tuning | 14d | 2026-02-16 | 2026-02-29 | 20 |
|23 | E2E testing & defect fixes | 14d | 2026-03-01 | 2026-03-14 | 21, 20, 22 |
|24 | Security review & remediation | 7d | 2026-03-01 | 2026-03-07 | 21 |
|25 | Staging smoke tests & sign-off | 7d | 2026-03-08 | 2026-03-14 | 23, 24 |
|26 | Prod deploy & runbook | 7d | 2026-03-15 | 2026-03-21 | 25 |
|27 | Post-release triage | 7d | 2026-03-15 | 2026-03-21 | 26 |
|28 | Retrospective & final report | 7d | 2026-03-22 | 2026-03-28 | 27 |
|29 | Knowledge transfer & docs freeze | 7d | 2026-03-22 | 2026-03-28 | 27 |

Notes:
- Predecessors reference the table ID in the first column.
- Dates are taken from the planned schedule in `docs/Gantt_CareerSync.md` and assume working days; adjust if you want strict working-day math.
