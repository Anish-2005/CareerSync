DFD Level 0 — CareerSync (Context Diagram)

This is the top-level context diagram showing CareerSync and its primary external entities and data stores.

```mermaid
flowchart LR
  subgraph External
    U[User]
    JB[Job Boards / Recruiter APIs]
    EM[Email / SMTP Service]
    FB[Firebase Auth]
  end

  subgraph System[CareerSync Web App]
    WA[Web App / API]
  end

  subgraph DataStores
    DB[(MongoDB Atlas)]
    FS[(File Storage / Documents)]
  end

  U -->|Login / Auth| FB
  U -->|Use UI: view/update profile, add application| WA
  WA -->|Persist user/profile/applications| DB
  WA -->|Store resumes, docs| FS
  WA -->|Send emails (alerts)| EM
  WA -->|Ingest job feed / sync| JB
  JB -->|Job feed / external job links| WA
```

Notes:
- External entities: `User`, `Job Boards / Recruiter APIs`, `Email / SMTP Service`, and `Firebase Auth`.
- `Web App / API` is the CareerSync system boundary. Data stores (MongoDB Atlas, file storage) are shown separately.
- This L0 diagram is a context view — it shows what the system exchanges with the outside world but not the internal processes.

Open `docs/DFD_Level_1.md` for the Level 1 breakdown of core processes.
```