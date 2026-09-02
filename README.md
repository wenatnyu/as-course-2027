# Cambridge 9618 AS Computer Science · 2027 Course

An English classroom course built from the Cambridge 9618 syllabus, the endorsed coursebook and representative Paper 1 questions. Each lesson includes a 90-minute slide deck, teacher notes, printable homework and inline mark-scheme toggles.

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

Lessons 01–16 complete syllabus Chapters 1–3. Monitoring/control is cross-referenced to the coursebook's Chapter 7 and logic to Chapter 4 so the current syllabus order is covered without omissions.

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
