DFD Level 0 — CareerSync (ASCII Art)

Legend: [Entity], {System}, ((Data Store)), --> arrow

                       [User]
                         |
                Login / Use UI |
                         v
            +---------------------------------+
            | {CareerSync Web App / API}     |
            |                                 |
            |  - handle profile CRUD          |
            |  - application tracking         |
            |  - achievements & analytics     |
            |                                 |
            |   --> Persist ----------------> ((MongoDB))
            |   --> Store docs -------------> ((File Storage))
            |   --> Send alerts ------------> [Email Service]
            |   <-- Ingest job feed -------- [Job Boards]
            |   <-- Auth handshake --------- [Firebase Auth]
            +---------------------------------+

Notes:
- External entities: [User], [Job Boards], [Email Service], [Firebase Auth].
- Data stores: ((MongoDB)) and ((File Storage)).
- This is a context-level view showing system boundaries and external interactions.
