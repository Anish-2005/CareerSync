DFD Level 2 — CareerSync (ASCII Art)
Focus: Process 2.0 — Application Tracking (drill-down)

Legend: [User], {Subprocess}, ((Data Store)), -->

                 [User]
                   |
     Submit app + doc |  Update status / notes
                   |                 |
                   v                 v
    +-----------------------------------------------+
    | {2.1 Add Application}   {2.2 Update Status}  |
    |  - validate input         - update stage      |
    |  - save record --> ((Applications))           |
    |  - store doc  --> ((File Storage))            |
    |  - emit event --> {2.5 Analyze}               |
    |                                               |
    | {2.3 Fetch / List}       {2.4 Sync / Enrich}  |
    |  - paginated reads         - ingest job feed   |
    |  - read ((Applications))   - update metadata   |
    |                                               |
    | {2.5 Analyze for Achievements}                 |
    |  - evaluate streaks / rules                      |
    |  - write achievements --> ((Achievements/Stats)) |
    +-----------------------------------------------+
                   |                |
         notify via|                |notify user if unlocked
                 v v                v
           [Email Service]       [Dashboard UI]

Notes:
- 2.1 persists application objects and files, then triggers analytics.
- 2.2 updates timestamps and can trigger notifications and achievement checks.
- 2.3 serves reads for UI and dashboard.
- 2.4 syncs with external Job Boards to enrich or deduplicate postings.
- 2.5 computes achievements and writes to ((Achievements/Stats)).
