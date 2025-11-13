Estimation: Function Points (FP) and Basic COCOMO for CareerSync

Purpose

This document contains a conservative Function Point (FP) estimate and a Basic COCOMO effort schedule derived from the SRS material in `docs/` for the CareerSync project. Use this as a first-pass planning estimate. All numbers are estimates based on the SRS and typical assumptions; refine with stakeholder input.

1) Summary of final results (single-line)
- Unadjusted Function Points (UFP): 200
- Complexity Adjustment Value (CAV): 36 (assumed)
- Productivity Complexity (PC) = 0.65 + 0.01 * CAV = 1.01
- Adjusted Function Points (AFP / FP): 202
- Language Factor (LF, SLOC per FP) assumed for TypeScript/JavaScript: 50 SLOC/FP
- Estimated SLOC = FP * LF = 202 * 50 = 10,100 SLOC (≈ 10.1 KLOC)
- Basic COCOMO (organic) effort: ~27.2 person-months
- Schedule (Tdev): ~8.8 months
- Average staffing: ~3.1 persons

Notes: alternate LF = 60 (if using a language with higher SLOC/FP) produces ~12.1 KLOC and ~33 PM.

2) FP counting details & assumptions

Categories and counts (rationale summarized from SRS):
- External Inputs (EI): user data entry transactions (registration, login, profile edit, add application, edit application, add document, search filters submit, admin edits, achievement grant, etc.) — assumed total 12 transactions.
- External Outputs (EO): reports, dashboard cards, notification messages, CSV export, achievement banners, email summaries — assumed total 10 outputs.
- External Inquiries (EQ): interactive queries that return immediate data (search, application detail lookups, document download initiation, quick filters) — assumed total 6.
- Internal Logical Files (ILF): persistent logical groups maintained within the system (Users, Profiles, Applications, Achievements, Documents metadata, Settings) — 6 ILFs.
- External Interface Files (EIF): interfaces to external systems treated as logical files (Firebase Auth user store, Cloud Storage metadata or other external data feeds, calendar/ATS import) — assumed 3.

Complexity distribution and weighting (typical/ conservative split):
- EI (12 total): simple 6, average 4, complex 2 -> UFP_EI = 6*3 + 4*4 + 2*6 = 46
- EO (10 total): simple 4, average 4, complex 2 -> UFP_EO = 4*4 + 4*5 + 2*7 = 50
- EQ (6 total): simple 3, average 2, complex 1 -> UFP_EQ = 3*3 + 2*4 + 1*6 = 23
- ILF (6 total): simple 2, average 3, complex 1 -> UFP_ILF = 2*7 + 3*10 + 1*15 = 59
- EIF (3 total): simple 1, avg 1, complex 1 -> UFP_EIF = 1*5 + 1*7 + 1*10 = 22

Unadjusted Function Point total (UFP) = 46 + 50 + 23 + 59 + 22 = 200

3) Complexity Adjustment (14 GSCs)
Rate each general system characteristic (GSC) 0..5 (0: no influence, 5: essential). For a conservative, moderately-complex SaaS app we assume these example ratings:

1. Reliable backup & recovery: 4
2. Data communications required: 3
3. Distributed processing functions: 2
4. Performance critical: 3
5. Run in heavily utilized operational environment: 3
6. On-line data entry: 4
7. On-line update across multiple screens/ops: 3
8. Master files updated on-line: 4
9. Inputs/outputs/inquiries complex: 3
10. Internal processing complex: 3
11. Code designed to be reusable: 3
12. Conversion and installation included in design: 2
13. Multiple installations in different organizations: 2
14. Application designed for change/ease of use: 4

Sum (CAV) = 36 (example)

Product Complexity (PC) = 0.65 + 0.01 * CAV = 0.65 + 0.36 = 1.01

Total Adjusted Function Points (AFP) = UFP * PC = 200 * 1.01 = 202 FP

4) Size estimate (SLOC)
Assume Language Factor (LF) = SLOC per FP. For TypeScript/JavaScript a conservative LF=50 is used. (If your stack or chosen language implies a different LF, replace accordingly).

SLOC = FP * LF = 202 * 50 = 10,100 SLOC ≈ 10.1 KLOC

Alternative: If LF = 60 (e.g., for certain lower-level languages), SLOC ≈ 12,120.

5) Basic COCOMO (Boehm) effort & schedule
We use the basic COCOMO model (organic mode coefficients) for a small-team web app:
- Organic coefficients: a = 2.4, b = 1.05, c = 2.5, d = 0.38
- KLOC = 10.1 (from above)

Effort E (person-months) = a * (KLOC)^b = 2.4 * (10.1)^1.05
Calculations:
- 10.1^1.05 ≈ 11.34
- E ≈ 2.4 * 11.34 = 27.22 person-months

Schedule Tdev (months) = c * (E)^d = 2.5 * (27.22)^0.38
- 27.22^0.38 ≈ 3.51
- Tdev ≈ 2.5 * 3.51 = 8.78 months

Average staffing ≈ E / Tdev ≈ 27.22 / 8.78 ≈ 3.1 people

6) Cost (optional) — example only
If average loaded cost is $7,500 per person-month (adjust for your region):
- Cost ≈ 27.22 * $7,500 ≈ $204,150
(Adjust rate per PM as appropriate.)

7) Sensitivity & alternatives
- Using LF = 60 (SLOC/FP) -> KLOC ≈ 12.12
  - E = 2.4 * (12.12)^1.05 ≈ 32.9 PM
  - Tdev ≈ 9.4 months
  - Staff ≈ 3.5 people

- Using COCOMO II or an expert-calibrated estimation with scale factors and cost drivers will produce a more accurate result (COCOMO II takes into account many cost drivers: product, platform, personnel, project). If you want, I can run a COCOMO II-style estimate — I'll need to assign ratings for scale drivers and cost drivers.

8) Assumptions and caveats
- FP counts were derived from a conservative read of the SRS sections in `docs/` and may omit or double-count items depending on how you categorize screens vs logical transactions. Treat FP as a planning baseline to be refined during detailed requirements review.
- Complexity Adjustment (CAV) used example ratings; refine with stakeholders for accuracy.
- LF chosen for TypeScript/JS; change to match the final implementation language.
- Basic COCOMO is a coarse estimator; for tighter planning use COCOMO II or parametric models and actual historical productivity data from your organization.

9) Recommended next steps
- Review the FP breakdown with stakeholders and adjust counts/complexities per real screens and transactions.
- Decide final implementation language (TypeScript/Node/React) to pick the correct LF (SLOC/FP).
- Run a COCOMO II estimate with rated cost drivers (RELY, DATA, CPLX, RUSE, DOCU, TIME, STOR, PVOL, personnel and platform drivers) to refine effort and schedule.
- Optionally produce a small spreadsheet or add these calculations to `docs/estimation_fp_cocomo.xlsx` for scenario analysis.

If you want, I will:
- Add a detailed FP worksheet (row-by-row counts) into `docs/` as a CSV/markdown table for review.
- Run a COCOMO II estimate — tell me your preferred ratings for the major cost drivers or let me assign conservative defaults and I'll produce the results.

---
Generated from the SRS drafts in `docs/` — ask me to refine any assumption or rerun with different language / cost-driver settings.