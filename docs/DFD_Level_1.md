DFD Level 1 — CareerSync (Top-level Processes)

This diagram decomposes the system into its main processes and shows the major data flows and stores.

```mermaid
flowchart LR
  U[User]
  FB[Firebase Auth]
  EM[Email Service]
  JB[Job Boards]
  DB[(MongoDB Atlas)]
  FS[(File Storage)]

  subgraph System[CareerSync]
    P1[1.0 User Management]
    P2[2.0 Application Tracking]
    P3[3.0 Achievements & Analytics]
    P4[4.0 Notifications & Documents]
    P5[5.0 Dashboard / Reporting]
  end

  U -->|Login/Register| FB
  U -->|Profile edits / preferences| P1
  P1 -->|store profile| DB
  U -->|Add / update application| P2
  P2 -->|store applications| DB
  P2 -->|store resumes| FS
  P2 -->|notify changes| P4
  P3 -->|read events / stats| DB
  P3 -->|write achievements| DB
  P4 -->|send email| EM
  P5 -->|read aggregated stats| P3
  JB -->|job feed / sync| P2
```

Process descriptions:
- 1.0 User Management: handles authentication (via Firebase) and profile CRUD operations stored in MongoDB.
- 2.0 Application Tracking: create/update/delete job applications, attach documents, and synchronize job metadata from external job boards.
- 3.0 Achievements & Analytics: aggregates user activity and calculates achievements and streaks; writes achievement records to the user document.
- 4.0 Notifications & Documents: queues and sends email notifications and stores uploaded documents (resumes, cover letters) in file storage.
- 5.0 Dashboard / Reporting: reads analytics and achievements to present the user's dashboard and charts.

Data stores:
- `MongoDB Atlas`: user profiles, applications, achievements, stats.
- `File Storage`: user-uploaded documents.

Open `docs/DFD_Level_2.md` for a Level 2 drill-down (job application process example).
```