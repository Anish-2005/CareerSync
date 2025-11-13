DFD Level 1 — CareerSync (ASCII Art)

Legend: [Entity], {Process}, ((Data Store)), --> arrow

                     [User]         [Job Boards]
                       |               |
            Profile / UI actions      Job feed
                       |               |
                       v               v
    +--------------------------------------------------+
    | {CareerSync System}                              |
    |                                                  |
    |  {1.0 User Management}    {2.0 Application Tracking}
    |   - auth/profile CRUD        - add/update/list apps
    |      |                       - attach docs         
    |      v                           |
    |   ((User Profiles))               v
    |                                   ((Applications))
    |                                                  |
    |  {3.0 Achievements & Analytics}  {4.0 Notifications}
    |   - compute stats                - send emails / alerts
    |   - award achievements           - queue notifications
    |      |                             |
    |      v                             v
    |   ((Achievements/Stats))        [Email Service]
    |                                                  |
    |  {5.0 Dashboard / Reporting}                      |
    |   - read aggregates and show charts              |
    +--------------------------------------------------+

Notes:
- Processes map to major functional areas: User Management, Application Tracking, Achievements, Notifications, Dashboard.
- Data stores: ((User Profiles)), ((Applications)), ((Achievements/Stats)), and file storage (not shown inline).
- Job Boards provide optional enrichment to Application Tracking.
