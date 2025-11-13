DFD Level 2 — CareerSync (Detailed: Application Tracking — Process 2.0)

This Level 2 diagram drills into Process 2.0 (Application Tracking) and shows subprocesses and data flows.

```mermaid
flowchart LR
  U[User]
  P2_1[2.1 Add Application]
  P2_2[2.2 Update Application Status]
  P2_3[2.3 Fetch / List Applications]
  P2_4[2.4 Sync / Enrich from Job Boards]
  P2_5[2.5 Analyze for Achievements]
  DB[(MongoDB Atlas)]
  FS[(File Storage)]
  EM[Email Service]
  JB[Job Boards]

  U -->|submit application data + doc| P2_1
  P2_1 -->|store application record| DB
  P2_1 -->|store resume| FS
  P2_1 -->|trigger event| P2_5
  P2_1 -->|send confirmation| EM

  U -->|update status / notes| P2_2
  P2_2 -->|update record| DB
  P2_2 -->|trigger notification| EM
  P2_2 -->|trigger achievement check| P2_5

  U -->|view applications| P2_3
  P2_3 -->|read records| DB

  P2_4 <-->|job meta sync| JB
  P2_4 -->|update job meta| DB
  P2_4 -->|flag duplicates / enrich| P2_1

  P2_5 -->|evaluate rules (streaks, milestones)| DB
  P2_5 -->|award achievement| DB
  P2_5 -->|notify user| EM
```

Subprocess details:
- 2.1 Add Application: validates input, attaches file metadata, persists the application object in MongoDB, and emits an 'application.created' event for analytics and achievements.
- 2.2 Update Application Status: updates stages (applied, interviewing, offer), logs timestamps for response-time metrics, and may trigger achievements.
- 2.3 Fetch / List Applications: paginated read API returning user applications and computed fields for dashboard display.
- 2.4 Sync / Enrich: optional background sync with job boards to enrich job metadata (company, seniority) and detect duplicate postings.
- 2.5 Analyze for Achievements: uses recent activity to compute streaks and achievement unlocks and writes an achievement record to the user document.

DFD Level 2 focuses on Application Tracking; other Level 2 diagrams can be produced on request (e.g., User Management or Achievements Engine).
```