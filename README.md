# Cambridge 9618 AS Computer Science · 2027 Course

An English classroom course built from the Cambridge 9618 syllabus, the endorsed coursebook, the official pseudocode guide and representative Paper 1 and Paper 2 questions. Each lesson includes a 90-minute slide deck, teacher notes, printable homework and inline mark-scheme toggles.

## Published lessons

- Lesson 01 — Binary, denary and hexadecimal foundations
- Lesson 02 — Data capacity and binary/decimal prefixes
- Lesson 03 — Signed binary, arithmetic, overflow and BCD
- Lesson 04 — Character data and bitmap graphics
- Lesson 05 — Vector graphics, bitmap file sizes and digital sound
- Lesson 06 — Lossy/lossless compression and run-length encoding
- Lesson 07 — Network purpose, models, topologies and LAN hardware
- Lesson 08 — Cloud computing, wired/wireless networks and transmission media
- Lesson 09 — Ethernet, internet infrastructure and bit streaming
- Lesson 10 — IP addressing, subnetting, URL and DNS
- Lesson 11 — Hardware roles, embedded systems and buffers
- Lesson 12 — RAM/ROM, SRAM/DRAM and programmable ROM families
- Lesson 13 — Storage and peripheral device operations
- Lesson 14 — Monitoring, control, sensors, actuators and feedback
- Lesson 15 — Logic gates, symbols, functions and truth tables
- Lesson 16 — Logic statements, expressions, circuits and truth tables
- Lesson 17 — Von Neumann architecture, CPU components and registers
- Lesson 18 — System buses, performance factors and ports
- Lesson 19 — Fetch-execute cycle, register transfer notation and interrupts
- Lesson 20 — Assembly language foundations and instruction groups
- Lesson 21 — Addressing modes and effective addresses
- Lesson 22 — The two-pass assembler
- Lesson 23 — Tracing assembly-language programs
- Lesson 24 — Binary shifts, bitwise operations and masking
- Lesson 25 — Operating-system purpose and management tasks
- Lesson 26 — Utility software, program libraries and DLL files
- Lesson 27 — Assemblers, compilers, interpreters and Java bytecode
- Lesson 28 — IDE features and Chapter 5 consolidation
- Lesson 29 — Security, privacy, integrity and internet threats
- Lesson 30 — Layered security, authentication, firewalls, encryption and access rights
- Lesson 31 — Validation, entry verification and check digits
- Lesson 32 — Byte parity, block parity, checksums and Chapter 6 consolidation
- Lesson 33 — Professional ethics, BCS, IEEE and stakeholder decisions
- Lesson 34 — Copyright and software licensing
- Lesson 35 — AI applications and social, economic and environmental impacts
- Lesson 36 — File-based limitations, relational databases and keys
- Lesson 37 — Relationships, E-R diagrams and normalisation to 2NF
- Lesson 38 — Third normal form and DBMS features
- Lesson 39 — SQL DDL and core single-table DML
- Lesson 40 — SQL aggregation, two-table joins and data maintenance
- Lesson 41 — Abstraction and decomposition
- Lesson 42 — Algorithm design, identifiers and IPO
- Lesson 43 — Logic, control constructs and algorithm representations
- Lesson 44 — Stepwise refinement and Chapter 9 consolidation
- Lesson 45 — Data types and records
- Lesson 46 — One-dimensional arrays and linear search
- Lesson 47 — Bubble sort
- Lesson 48 — Two-dimensional arrays and arrays of records
- Lesson 49 — Sequential text files
- Lesson 50 — Stacks and queues
- Lesson 51 — Linked lists and Chapter 10 consolidation
- Lesson 52 — Programming essentials and library routines
- Lesson 53 — IF, nested IF and CASE selection
- Lesson 54 — Iteration and efficient loops
- Lesson 55 — Modules, scope, procedures and functions
- Lesson 56 — Parameters, BYVAL/BYREF and integrated programs
- Lesson 57 — Program development life cycle
- Lesson 58 — Waterfall, iterative and RAD models
- Lesson 59 — Structure charts and interfaces
- Lesson 60 — Structure-chart derivation and state-transition diagrams
- Lesson 61 — Faults, errors and developer testing
- Lesson 62 — Test strategy, test data and release testing
- Lesson 63 — Maintenance, program amendment and complete AS review

Lessons 01–63 complete all 12 chapters of the 2027–2029 AS syllabus. Monitoring/control, bit manipulation and other cross-chapter textbook material are deliberately reordered so the current syllabus sequence is covered without omissions. The endorsed coursebook numbers Paper 2 topics differently: syllabus Chapters 9–12 align with Coursebook Chapters 12–15. Lessons 41–63 use authentic Paper 2 questions because Paper 1 assesses Sections 1–8 only. All pseudocode is normalised to the official 2027–2029 guide even where the older textbook uses superseded syntax.

GitHub Pages: <https://wenatnyu.github.io/as-course-2027/>

Each new lesson should include a clearly labelled **Past Paper Practice** slide and at least one homework item with the exact session, paper, question and mark allocation. Prompts should be concise adaptations rather than full-paper reproductions.

## Local development

Requires Node.js `>=22.13.0`.

```bash
npm ci
npm run dev
```

Useful checks:

```bash
npm run lint
npm test
GITHUB_PAGES=true \
  PAGES_BASE_PATH=/as-course-2027 \
  NEXT_PUBLIC_SITE_URL=https://wenatnyu.github.io/as-course-2027/ \
  npm run build:pages
```

The GitHub Actions workflow publishes `dist/client` whenever `main` is pushed. GitHub Pages lesson routes are prepared as nested folders so relative lesson navigation remains inside the project site.
