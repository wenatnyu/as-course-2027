import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/", host = "lesson.example.test") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${Math.random()}`);
  const { default: worker } = await import(workerUrl.href);
  const route = pathname.startsWith("/") ? pathname : `/${pathname}`;

  return worker.fetch(
    new Request(new URL(route, `https://${host}`), {
      headers: { accept: "text/html", host, "x-forwarded-host": host, "x-forwarded-proto": "https" },
    }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the complete lesson, homework and roadmap shell", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>AS Computer Science · Lesson 01<\/title>/i);
  assert.match(html, /Binary, Denary/);
  assert.match(html, /SYLLABUS 1\.1/);
  assert.match(html, /cambridgeinternational\.org\/Images\/721397-2027-2029-syllabus\.pdf/);
  assert.doesNotMatch(html, /codex-preview|Building your site|react-loading-skeleton/i);
});

test("serves the printable Communication note and maps Lessons 07–10 to Chapter 2", async () => {
  const noteResponse = await render("/notes/communication");
  assert.equal(noteResponse.status, 200);
  const noteHtml = await noteResponse.text();
  assert.match(noteHtml, /AS 9618 Chapter Note/);
  assert.match(noteHtml, /CSMA\/CD on a shared Ethernet medium/);
  assert.match(noteHtml, /DNS resolves a host name to an IP address/);
  assert.match(noteHtml, /znotes\.org\/caie\/as-level\/computer-science-9618\/theory\/communication/);

  for (const lessonNumber of ["07", "08", "09", "10"]) {
    const lessonHtml = await (await render(`/lesson-${lessonNumber}`)).text();
    assert.match(lessonHtml, /\.\.\/notes\/chapters\/#as-2/);
    assert.match(lessonHtml, /Chapter 2 · Communication/);
  }
});

test("maps lesson navigation to chapter notes and serves the chapter PDF library", async () => {
  const [asLesson, a2Lesson, library] = await Promise.all([
    render("/lesson-10"),
    render("/a2/lesson-07"),
    render("/notes/chapters"),
  ]);
  const [asHtml, a2Html, libraryHtml] = await Promise.all([asLesson.text(), a2Lesson.text(), library.text()]);

  assert.match(asHtml, /CH<\/span><b>2<\/b>/);
  assert.match(asHtml, /notes\/chapters\/#as-2/);
  assert.match(asHtml, /Chapter 2 · Communication/);
  assert.match(a2Html, /CH<\/span><b>14<\/b>/);
  assert.match(a2Html, /notes\/chapters\/#a2-14/);
  assert.match(libraryHtml, /One chapter/);
  assert.match(libraryHtml, /Computational Thinking and Problem-solving/);
  assert.match(libraryHtml, /\/notes\/rendered\/as-theory\/chapter-01\/page-01\.webp/);
  assert.match(libraryHtml, /\/notes\/rendered\/as-theory\/chapter-01\/page-04\.webp/);
  assert.doesNotMatch(libraryHtml, /<object\b/i);
  const chapterData = await readFile(new URL("../app/_data/chapter-resources.ts", import.meta.url), "utf8");
  assert.match(chapterData, /znotes\.org\/caie\/a2-level\/computer-science-9618\/practical\/further-programming/);

  const expectedPdfs = [
    ...Array.from({ length: 8 }, (_, index) => `../public/notes/as-theory/chapter-${String(index + 1).padStart(2, "0")}.pdf`),
    ...Array.from({ length: 4 }, (_, index) => `../public/notes/as-practical/chapter-${String(index + 9).padStart(2, "0")}.pdf`),
    ...Array.from({ length: 6 }, (_, index) => `../public/notes/a2-theory/chapter-${index + 13}.pdf`),
  ];
  for (const relativePath of expectedPdfs) {
    const pdf = await stat(new URL(relativePath, import.meta.url));
    assert.ok(pdf.size > 100_000, `${relativePath} should contain a substantive chapter note`);
  }

  const renderedCollections = [
    ["as-theory", [4, 6, 5, 6, 4, 3, 4, 4]],
    ["as-practical", [2, 4, 3, 4]],
    ["a2-theory", [3, 3, 5, 3, 3, 3]],
  ];
  let chapterNumber = 1;
  for (const [collection, pageCounts] of renderedCollections) {
    for (const pageCount of pageCounts) {
      const folder = new URL(`../public/notes/rendered/${collection}/chapter-${String(chapterNumber).padStart(2, "0")}/`, import.meta.url);
      const pages = (await readdir(folder)).filter((name) => name.endsWith(".webp"));
      assert.equal(pages.length, pageCount, `Chapter ${chapterNumber} should have every rendered page`);
      for (const page of pages) {
        const image = await stat(new URL(page, folder));
        assert.ok(image.size > 5_000, `${page} should be a substantive rendered note page`);
      }
      chapterNumber += 1;
    }
  }
});

test("uses the configured static social image", async () => {
  const html = await (await render("/", "as-cs.example.test")).text();
  const configuredSiteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://wenatnyu.github.io/as-course-2027/").replace(/\/+$/, "");
  const escapedImageUrl = `${configuredSiteUrl}/og.png`.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  assert.match(html, new RegExp(escapedImageUrl));

  const image = await stat(new URL("../public/og.png", import.meta.url));
  assert.ok(image.size > 100_000, "social preview image should be a substantive generated asset");
});

test("keeps the generated lesson source self-contained", async () => {
  const [page, css, layout, nextConfig, packageJson, pagesWorkflow, noJekyll] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../next.config.ts", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../.github/workflows/deploy-pages.yml", import.meta.url), "utf8"),
    readFile(new URL("../public/.nojekyll", import.meta.url), "utf8"),
  ]);

  assert.match(page, /const weeklyPlan/);
  assert.match(page, /Homework 01/);
  assert.match(page, /32 teaching weeks/);
  assert.match(page, /requestFullscreen/);
  assert.match(page, /Coursebook Task 1\.01/);
  assert.match(page, /10010101 00110011/);
  assert.match(page, /Show all answers/);
  assert.match(page, /function InlineAnswer/);
  assert.doesNotMatch(page, /answer-key/);
  assert.match(css, /@media print/);
  assert.match(css, /\.inline-answer\.visible/);
  assert.match(css, /\.homework-page\.all-answers-visible \.writing-lines/);
  assert.match(css, /print-color-adjust: economy/);
  assert.match(css, /\.homework-hero \{[\s\S]{0,500}min-height: 0;/);
  assert.match(css, /\.homework-page,\s*\.homework-page \* \{ color: #000 !important; \}/);
  assert.match(css, /\.question-copy b \{ font-size: 16px/);
  assert.match(layout, /export const metadata/);
  assert.match(layout, /export const dynamic = "force-static"/);
  assert.doesNotMatch(layout, /next\/headers|headers\(\)/);
  assert.match(nextConfig, /output: "export"/);
  assert.match(nextConfig, /process\.env\.PAGES_BASE_PATH/);
  assert.match(nextConfig, /process\.env\.NEXT_PUBLIC_SITE_URL/);
  assert.match(nextConfig, /assetPrefix: pagesAssetPrefix/);
  assert.match(packageJson, /"build:pages"/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.match(pagesWorkflow, /actions\/configure-pages@v5/);
  assert.match(pagesWorkflow, /path: \.\/dist\/client/);
  assert.equal(noJekyll, "");

  const timings = [...page.matchAll(/time: "(\d+) min"/g)].map((match) => Number(match[1]));
  assert.equal(timings.length, 15);
  assert.equal(timings.reduce((sum, value) => sum + value, 0), 90);
});

const lessonRoutes = [
  {
    pathname: "/lesson-02",
    slug: "lesson-02",
    number: "02",
    keyContent: /binary magnitudes?|binary (?:and decimal )?prefixes?|data (?:capacity|units?)|kibibytes?|\bKiB\b/i,
    syllabusPatterns: [/SYLLABUS 1\.1/i],
  },
  {
    pathname: "/lesson-03",
    slug: "lesson-03",
    number: "03",
    keyContent: /signed binary|two(?:'|’|&apos;|&#x27;)?s complement|binary arithmetic|overflow|binary coded decimal|\bBCD\b/i,
    syllabusPatterns: [/SYLLABUS 1\.1/i],
  },
  {
    pathname: "/lesson-04",
    slug: "lesson-04",
    number: "04",
    keyContent: /character data|ASCII|Unicode|bitmap|colour depth|pixel/i,
    syllabusPatterns: [/SYLLABUS 1\.1/i, /SYLLABUS 1\.2/i],
  },
  {
    pathname: "/lesson-05",
    slug: "lesson-05",
    number: "05",
    keyContent: /vector graphics?|drawing (?:list|object)|sampling (?:rate|resolution)|sound|file[- ]size/i,
    syllabusPatterns: [/SYLLABUS 1\.2/i],
  },
  {
    pathname: "/lesson-06",
    slug: "lesson-06",
    number: "06",
    keyContent: /compression|lossy|lossless|run-length encoding|\bRLE\b/i,
    syllabusPatterns: [/SYLLABUS 1\.3/i],
    pastPaperPattern: /9618\/13[^<]{0,80}M\/J 2024[^<]{0,80}Q2\(b\)|MAY\/JUNE 2024[^<]{0,80}Q2\(b\)/i,
  },
  {
    pathname: "/lesson-07",
    slug: "lesson-07",
    number: "07",
    keyContent: /LAN|WAN|client-server|peer-to-peer|topolog|router|switch/i,
    syllabusPatterns: [/SYLLABUS 2\.1/i],
    pastPaperPattern: /9618\/13[^<]{0,80}M\/J 2023[^<]{0,80}Q2|9618\/11[^<]{0,80}O\/N 2023[^<]{0,80}Q2/i,
  },
  {
    pathname: "/lesson-08",
    slug: "lesson-08",
    number: "08",
    keyContent: /cloud|wired|wireless|fibre|satellite/i,
    syllabusPatterns: [/SYLLABUS 2\.1/i],
  },
  {
    pathname: "/lesson-09",
    slug: "lesson-09",
    number: "09",
    keyContent: /Ethernet|CSMA.CD|streaming|internet infrastructure|WWW/i,
    syllabusPatterns: [/SYLLABUS 2\.1/i],
  },
  {
    pathname: "/lesson-10",
    slug: "lesson-10",
    number: "10",
    keyContent: /IPv4|IPv6|subnet|URL|DNS/i,
    syllabusPatterns: [/SYLLABUS 2\.1/i],
  },
  {
    pathname: "/lesson-11",
    slug: "lesson-11",
    number: "11",
    keyContent: /embedded|buffer|input|output|secondary/i,
    syllabusPatterns: [/SYLLABUS 3\.1/i],
  },
  {
    pathname: "/lesson-12",
    slug: "lesson-12",
    number: "12",
    keyContent: /RAM|ROM|SRAM|DRAM|EPROM|EEPROM/i,
    syllabusPatterns: [/SYLLABUS 3\.1/i],
  },
  {
    pathname: "/lesson-13",
    slug: "lesson-13",
    number: "13",
    keyContent: /laser|3D print|hard disk|solid.state|touchscreen|VR/i,
    syllabusPatterns: [/SYLLABUS 3\.1/i],
  },
  {
    pathname: "/lesson-14",
    slug: "lesson-14",
    number: "14",
    keyContent: /monitoring|control|sensor|actuator|feedback/i,
    syllabusPatterns: [/SYLLABUS 3\.1/i],
    pastPaperPattern: /9618\/12[^<]{0,100}O\/N 2024[^<]{0,100}Q9/i,
  },
  {
    pathname: "/lesson-15",
    slug: "lesson-15",
    number: "15",
    keyContent: /logic gate|NAND|NOR|XOR|truth table/i,
    syllabusPatterns: [/SYLLABUS 3\.2/i],
    pastPaperPattern: /9618\/12[^<]{0,100}M\/J 2024[^<]{0,100}Q1/i,
  },
  {
    pathname: "/lesson-16",
    slug: "lesson-16",
    number: "16",
    keyContent: /problem statement|expression|logic circuit|truth table/i,
    syllabusPatterns: [/SYLLABUS 3\.2/i],
    pastPaperPattern: /9618\/11[^<]{0,100}O\/N 2025[^<]{0,100}Q3/i,
  },
  {
    pathname: "/lesson-17",
    slug: "lesson-17",
    number: "17",
    keyContent: /Von Neumann|stored program|Program Counter|Memory Data Register|\bMDR\b/i,
    syllabusPatterns: [/SYLLABUS 4\.1/i],
  },
  {
    pathname: "/lesson-18",
    slug: "lesson-18",
    number: "18",
    keyContent: /address bus|data bus|control bus|clock speed|cache|HDMI/i,
    syllabusPatterns: [/SYLLABUS 4\.1/i],
  },
  {
    pathname: "/lesson-19",
    slug: "lesson-19",
    number: "19",
    keyContent: /fetch.execute|register transfer|interrupt|Interrupt Service Routine|\bISR\b/i,
    syllabusPatterns: [/SYLLABUS 4\.1/i],
  },
  {
    pathname: "/lesson-20",
    slug: "lesson-20",
    number: "20",
    keyContent: /assembly language|machine code|opcode|operand|instruction group/i,
    syllabusPatterns: [/SYLLABUS 4\.2/i],
  },
  {
    pathname: "/lesson-21",
    slug: "lesson-21",
    number: "21",
    keyContent: /addressing mode|immediate|direct|indirect|indexed|relative/i,
    syllabusPatterns: [/SYLLABUS 4\.2/i],
  },
  {
    pathname: "/lesson-22",
    slug: "lesson-22",
    number: "22",
    keyContent: /two.pass assembler|symbol table|forward reference|object code/i,
    syllabusPatterns: [/SYLLABUS 4\.2/i],
  },
  {
    pathname: "/lesson-23",
    slug: "lesson-23",
    number: "23",
    keyContent: /trace|accumulator|\bACC\b|\bCMP\b|\bJPE\b|\bJPN\b/i,
    syllabusPatterns: [/SYLLABUS 4\.2/i],
  },
  {
    pathname: "/lesson-24",
    slug: "lesson-24",
    number: "24",
    keyContent: /logical shift|arithmetic shift|cyclic shift|bit mask|bitwise/i,
    syllabusPatterns: [/SYLLABUS 4\.3/i],
  },
  {
    pathname: "/lesson-25",
    slug: "lesson-25",
    number: "25",
    keyContent: /operating system|memory management|file management|process management/i,
    syllabusPatterns: [/SYLLABUS 5\.1/i],
  },
  {
    pathname: "/lesson-26",
    slug: "lesson-26",
    number: "26",
    keyContent: /utility|disk formatter|defragment|program librar|\bDLL\b/i,
    syllabusPatterns: [/SYLLABUS 5\.1/i],
  },
  {
    pathname: "/lesson-27",
    slug: "lesson-27",
    number: "27",
    keyContent: /assembler|compiler|interpreter|bytecode|\bJVM\b/i,
    syllabusPatterns: [/SYLLABUS 5\.2/i],
  },
  {
    pathname: "/lesson-28",
    slug: "lesson-28",
    number: "28",
    keyContent: /Integrated Development Environment|\bIDE\b|context.sensitive|syntax check|breakpoint|single stepping|prettyprint/i,
    syllabusPatterns: [/SYLLABUS 5\.2/i],
  },
  {
    pathname: "/lesson-29",
    slug: "lesson-29",
    number: "29",
    keyContent: /security|privacy|integrity|virus|spyware|phishing|pharming/i,
    syllabusPatterns: [/SYLLABUS 6\.1/i],
    pastPaperPattern: /9618\/11[^<]{0,100}O\/N 2021[^<]{0,100}Q2/i,
  },
  {
    pathname: "/lesson-30",
    slug: "lesson-30",
    number: "30",
    keyContent: /authentication|authorisation|digital signature|firewall|encryption|access rights/i,
    syllabusPatterns: [/SYLLABUS 6\.1/i],
    pastPaperPattern: /9618\/13[^<]{0,100}M\/J 2023[^<]{0,100}Q6/i,
  },
  {
    pathname: "/lesson-31",
    slug: "lesson-31",
    number: "31",
    keyContent: /validation|verification|range check|existence check|check digit/i,
    syllabusPatterns: [/SYLLABUS 6\.2/i],
    pastPaperPattern: /9618\/13[^<]{0,100}O\/N 2025[^<]{0,100}Q7\(e\)/i,
  },
  {
    pathname: "/lesson-32",
    slug: "lesson-32",
    number: "32",
    keyContent: /even parity|odd parity|block parity|checksum|retransmission/i,
    syllabusPatterns: [/SYLLABUS 6\.2/i],
    pastPaperPattern: /9618\/12[^<]{0,100}O\/N 2025[^<]{0,100}Q6\(c\)/i,
  },
  {
    pathname: "/lesson-33",
    slug: "lesson-33",
    number: "33",
    keyContent: /professional ethics|\bBCS\b|\bIEEE\b|stakeholder|public trust/i,
    syllabusPatterns: [/SYLLABUS 7\.1/i],
    pastPaperPattern: /9618\/12[^<]{0,100}O\/N 2024[^<]{0,100}Q5\(a\)/i,
  },
  {
    pathname: "/lesson-34",
    slug: "lesson-34",
    number: "34",
    keyContent: /copyright|software licence|Free Software Foundation|Open Source Initiative|shareware|commercial/i,
    syllabusPatterns: [/SYLLABUS 7\.1/i],
    pastPaperPattern: /9618\/12[^<]{0,100}O\/N 2025[^<]{0,100}Q2/i,
  },
  {
    pathname: "/lesson-35",
    slug: "lesson-35",
    number: "35",
    keyContent: /artificial intelligence|computer vision|natural language processing|social impact|economic impact|environmental impact/i,
    syllabusPatterns: [/SYLLABUS 7\.1/i],
    pastPaperPattern: /9618\/12[^<]{0,100}M\/J 2025[^<]{0,100}Q3/i,
  },
  {
    pathname: "/lesson-36",
    slug: "lesson-36",
    number: "36",
    keyContent: /file-based|relational database|candidate key|foreign key/i,
    syllabusPatterns: [/SYLLABUS 8\.1/i],
    pastPaperPattern: /9618\/13[^<]{0,120}M\/J 2023[^<]{0,120}Q4/i,
  },
  {
    pathname: "/lesson-37",
    slug: "lesson-37",
    number: "37",
    keyContent: /entity.relationship|E-R|normalisation|1NF|2NF|referential integrity/i,
    syllabusPatterns: [/SYLLABUS 8\.1/i],
    pastPaperPattern: /9618\/11[^<]{0,120}O\/N 2025[^<]{0,120}Q2/i,
  },
  {
    pathname: "/lesson-38",
    slug: "lesson-38",
    number: "38",
    keyContent: /third normal form|3NF|DBMS|data dictionary|logical schema|query processor/i,
    syllabusPatterns: [/SYLLABUS 8\.1[–-]8\.2/i],
    pastPaperPattern: /9618\/13[^<]{0,120}M\/J 2023[^<]{0,120}Q4\(c\)|9618\/12[^<]{0,120}M\/J 2023[^<]{0,120}Q2/i,
  },
  {
    pathname: "/lesson-39",
    slug: "lesson-39",
    number: "39",
    keyContent: /SQL|DDL|CREATE TABLE|ALTER TABLE|FOREIGN KEY|VARCHAR/i,
    syllabusPatterns: [/SYLLABUS 8\.3/i],
    pastPaperPattern: /9618\/13[^<]{0,120}O\/N 2025[^<]{0,120}Q5\(b\)/i,
  },
  {
    pathname: "/lesson-40",
    slug: "lesson-40",
    number: "40",
    keyContent: /SQL|DML|GROUP BY|INNER JOIN|INSERT INTO|UPDATE|DELETE FROM/i,
    syllabusPatterns: [/SYLLABUS 8\.3/i],
    pastPaperPattern: /9618\/13[^<]{0,120}O\/N 2025[^<]{0,120}Q5\(c\)/i,
  },
  {
    pathname: "/lesson-41",
    slug: "lesson-41",
    number: "41",
    keyContent: /abstraction|decomposition|abstract model|sub-problem/i,
    syllabusPatterns: [/SYLLABUS 9\.1/i],
    pastPaperPattern: /9618\/21[^<]{0,120}O\/N 2022[^<]{0,120}Q2/i,
  },
  {
    pathname: "/lesson-42",
    slug: "lesson-42",
    number: "42",
    keyContent: /algorithm|identifier table|input.*process.*output|structured English/i,
    syllabusPatterns: [/SYLLABUS 9\.2/i],
    pastPaperPattern: /9618\/21[^<]{0,120}M\/J 2025[^<]{0,120}Q1/i,
  },
  {
    pathname: "/lesson-43",
    slug: "lesson-43",
    number: "43",
    keyContent: /sequence|selection|iteration|flowchart|pseudocode|AND|OR|NOT/i,
    syllabusPatterns: [/SYLLABUS 9\.2/i],
    pastPaperPattern: /9618\/21[^<]{0,120}M\/J 2025[^<]{0,120}Q3/i,
  },
  {
    pathname: "/lesson-44",
    slug: "lesson-44",
    number: "44",
    keyContent: /stepwise refinement|programmable detail|refine/i,
    syllabusPatterns: [/SYLLABUS 9\.2/i],
    pastPaperPattern: /9618\/23[^<]{0,120}O\/N 2025[^<]{0,120}Q2/i,
  },
  { pathname: "/lesson-45", slug: "lesson-45", number: "45", keyContent: /data types|BookRecord|dot notation/i, syllabusPatterns: [/SYLLABUS 10\.1/i], pastPaperPattern: /9618\/23[^<]{0,120}O\/N 2023[^<]{0,120}Q1/i },
  { pathname: "/lesson-46", slug: "lesson-46", number: "46", keyContent: /1D Arrays|linear search|lower bound/i, syllabusPatterns: [/SYLLABUS 10\.2/i], pastPaperPattern: /9618\/23[^<]{0,120}O\/N 2023[^<]{0,120}Q2/i },
  { pathname: "/lesson-47", slug: "lesson-47", number: "47", keyContent: /bubble sort|NoSwaps|adjacent/i, syllabusPatterns: [/SYLLABUS 10\.2/i], pastPaperPattern: /9618\/21[^<]{0,120}O\/N 2021[^<]{0,120}Q2/i },
  { pathname: "/lesson-48", slug: "lesson-48", number: "48", keyContent: /2D Arrays|nested loops|arrays of records/i, syllabusPatterns: [/SYLLABUS 10\.2/i], pastPaperPattern: /9618\/22[^<]{0,120}O\/N 2024[^<]{0,120}Q2/i },
  { pathname: "/lesson-49", slug: "lesson-49", number: "49", keyContent: /text files|OPENFILE|EOF/i, syllabusPatterns: [/SYLLABUS 10\.3/i], pastPaperPattern: /9618\/21[^<]{0,120}O\/N 2024[^<]{0,120}Q3/i },
  { pathname: "/lesson-50", slug: "lesson-50", number: "50", keyContent: /Stacks|Queues|LIFO|FIFO/i, syllabusPatterns: [/SYLLABUS 10\.4/i], pastPaperPattern: /9618\/22[^<]{0,120}O\/N 2024[^<]{0,120}Q3/i },
  { pathname: "/lesson-51", slug: "lesson-51", number: "51", keyContent: /Linked Lists|HeadPointer|free list/i, syllabusPatterns: [/SYLLABUS 10\.4/i], pastPaperPattern: /9618\/23[^<]{0,120}O\/N 2024[^<]{0,120}Q3/i },
  { pathname: "/lesson-52", slug: "lesson-52", number: "52", keyContent: /Programming Essentials|library routines|assignment/i, syllabusPatterns: [/SYLLABUS 11\.1/i], pastPaperPattern: /9618\/23[^<]{0,120}O\/N 2025[^<]{0,120}Q1/i },
  { pathname: "/lesson-53", slug: "lesson-53", number: "53", keyContent: /Nested IF|CASE OF|selection/i, syllabusPatterns: [/SYLLABUS 11\.2/i], pastPaperPattern: /9618\/23[^<]{0,120}O\/N 2024[^<]{0,120}Q4/i },
  { pathname: "/lesson-54", slug: "lesson-54", number: "54", keyContent: /Iteration|WHILE|REPEAT.*UNTIL|efficient/i, syllabusPatterns: [/SYLLABUS 11\.2[–-]11\.3/i], pastPaperPattern: /9618\/23[^<]{0,120}M\/J 2024[^<]{0,120}Q5/i },
  { pathname: "/lesson-55", slug: "lesson-55", number: "55", keyContent: /Modules|local variable|FUNCTION|PROCEDURE/i, syllabusPatterns: [/SYLLABUS 11\.3/i], pastPaperPattern: /9618\/23[^<]{0,120}M\/J 2025[^<]{0,120}Q1/i },
  { pathname: "/lesson-56", slug: "lesson-56", number: "56", keyContent: /BYVAL|BYREF|Parameters/i, syllabusPatterns: [/SYLLABUS 11\.3/i], pastPaperPattern: /9618\/23[^<]{0,120}M\/J 2025[^<]{0,120}Q7/i },
  { pathname: "/lesson-57", slug: "lesson-57", number: "57", keyContent: /Program Development Life Cycle|analysis|maintenance/i, syllabusPatterns: [/SYLLABUS 12\.1/i], pastPaperPattern: /9618\/21[^<]{0,120}O\/N 2024[^<]{0,120}Q5/i },
  { pathname: "/lesson-58", slug: "lesson-58", number: "58", keyContent: /Waterfall|Iterative|RAD Models/i, syllabusPatterns: [/SYLLABUS 12\.1/i], pastPaperPattern: /9618\/21[^<]{0,120}M\/J 2023[^<]{0,120}Q5/i },
  { pathname: "/lesson-59", slug: "lesson-59", number: "59", keyContent: /Structure Charts|module hierarchy|interface/i, syllabusPatterns: [/SYLLABUS 12\.2/i], pastPaperPattern: /9618\/23[^<]{0,120}O\/N 2025[^<]{0,120}Q7/i },
  { pathname: "/lesson-60", slug: "lesson-60", number: "60", keyContent: /state-transition|Structure Charts to Code|transition/i, syllabusPatterns: [/SYLLABUS 12\.2/i], pastPaperPattern: /9618\/22[^<]{0,120}O\/N 2025[^<]{0,120}Q7/i },
  { pathname: "/lesson-61", slug: "lesson-61", number: "61", keyContent: /syntax error|logic error|white-box|stub/i, syllabusPatterns: [/SYLLABUS 12\.3/i], pastPaperPattern: /9618\/22[^<]{0,120}M\/J 2025[^<]{0,120}Q2/i },
  { pathname: "/lesson-62", slug: "lesson-62", number: "62", keyContent: /Test Strategy|boundary|beta|acceptance/i, syllabusPatterns: [/SYLLABUS 12\.3/i], pastPaperPattern: /9618\/21[^<]{0,120}O\/N 2024[^<]{0,120}Q5/i },
  { pathname: "/lesson-63", slug: "lesson-63", number: "63", keyContent: /corrective|adaptive|perfective|AS Finish/i, syllabusPatterns: [/SYLLABUS 12\.3/i], pastPaperPattern: /9618\/22[^<]{0,120}M\/J 2025[^<]{0,120}Q1/i },
];

async function readTsxTree(directoryUrl) {
  const entries = await readdir(directoryUrl, { withFileTypes: true });
  const sources = await Promise.all(entries.map(async (entry) => {
    const entryUrl = new URL(`${entry.name}${entry.isDirectory() ? "/" : ""}`, directoryUrl);
    if (entry.isDirectory()) return readTsxTree(entryUrl);
    if (!entry.isFile() || !entry.name.endsWith(".tsx")) return "";
    return readFile(entryUrl, "utf8");
  }));
  return sources.join("\n");
}

for (const lesson of lessonRoutes) {
  test(`server-renders Lesson ${lesson.number} with route-specific course content`, async () => {
    const response = await render(lesson.pathname);
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

    const html = await response.text();
    assert.match(html, new RegExp(`<title>[^<]*Lesson ${lesson.number}[^<]*<\\/title>`, "i"));
    assert.match(html, lesson.keyContent);
    for (const syllabusPattern of lesson.syllabusPatterns) assert.match(html, syllabusPattern);
    if (lesson.pastPaperPattern) assert.match(html, lesson.pastPaperPattern);
    assert.match(html, /class="textbook-mark"[^>]*>[^<]*(?:COURSEBOOK|TEXTBOOK)/i);
    assert.match(html, new RegExp(`LESSON ${lesson.number} SOURCES`, "i"));
    assert.match(html, new RegExp(`<meta property="og:title" content="[^"]*Lesson ${lesson.number}[^"]*"`, "i"));
    assert.match(html, new RegExp(`<meta property="og:url" content="[^"]*/${lesson.slug}/"`, "i"));
    assert.match(html, new RegExp(`<meta name="twitter:title" content="[^"]*Lesson ${lesson.number}[^"]*"`, "i"));
    assert.doesNotMatch(html, /codex-preview|Building your site|react-loading-skeleton/i);
  });

  test(`Lesson ${lesson.number} includes inline-answer homework and totals 90 minutes`, async () => {
    const [routeSource, sharedShell, paperTwoLesson] = await Promise.all([
      readTsxTree(new URL(`../app/${lesson.slug}/`, import.meta.url)),
      readFile(new URL("../app/_components/lesson-shell.tsx", import.meta.url), "utf8"),
      readFile(new URL("../app/_components/paper-two-lesson.tsx", import.meta.url), "utf8"),
    ]);
    const lessonSource = Number(lesson.number) >= 45 ? `${routeSource}\n${paperTwoLesson}` : routeSource;

    assert.match(lessonSource, /HomeworkSheet/);
    assert.match(routeSource, /\banswer\s*:/);
    if (Number(lesson.number) >= 6) {
      assert.match(lessonSource, /PAST PAPER PRACTICE/i);
      assert.match(routeSource, /9618\/\d{2}/i);
    }
    assert.match(lessonSource, /Show all answers|HomeworkSheet/);
    assert.match(sharedShell, /function InlineAnswer/);
    assert.match(sharedShell, /className="inline-answer-toggle"/);
    assert.match(sharedShell, /all-answers-visible/);
    assert.match(sharedShell, /target\?\.closest\("button, a, input, textarea, select/);
    assert.match(sharedShell, /className=\{visible \? "inline-answer visible" : "inline-answer"\}/);
    assert.doesNotMatch(routeSource, /answer-key/i);
    assert.doesNotMatch(sharedShell, /answer-key/i);

    const timings = Number(lesson.number) >= 45
      ? [...paperTwoLesson.match(/const timings = \[([^\]]+)\]/)?.[1].matchAll(/\d+/g) ?? []].map((match) => Number(match[0]))
      : [...routeSource.matchAll(/\btime:\s*["'](\d+) min["']/g)].map((match) => Number(match[1]));
    assert.ok(timings.length >= 10, `Lesson ${lesson.number} should expose a maintainable timing for each teaching segment`);
    assert.equal(timings.reduce((sum, value) => sum + value, 0), 90);
    if (Number(lesson.number) >= 36) {
      const homeworkMarks = Number(lesson.number) >= 45
        ? [...routeSource.matchAll(/\bmarks:\s*(\d+)\b/g)].map((match) => Number(match[1]))
        : [...routeSource.matchAll(/\bid:\s*["']l\d+-\d+["'],\s*marks:\s*(\d+)/g)].map((match) => Number(match[1]));
      assert.equal(timings.length, 15, `Lesson ${lesson.number} should contain exactly 15 timed slides`);
      assert.equal(homeworkMarks.reduce((sum, value) => sum + value, 0), 30, `Lesson ${lesson.number} homework should total 30 marks`);
    }
    if (Number(lesson.number) >= 17) {
      assert.match(lessonSource, /marks=\{30\}/);
      assert.match(lessonSource, /minutes=\{45\}/);
    }
  });
}

test("the shared navigation exposes the complete 63-lesson sequence", async () => {
  const [html, shell] = await Promise.all([
    (await render("/lesson-63")).text(),
    readFile(new URL("../app/_components/lesson-shell.tsx", import.meta.url), "utf8"),
  ]);
  assert.match(shell, /const COURSE_LESSONS|export const COURSE_LESSONS/);
  assert.match(shell, /\["63", "Maintenance and complete AS review"\]/);
  assert.match(html, /lesson-01|>01</i);
  assert.match(html, /<option value="\.\.\/lesson-63\/" selected="">63/i);
  assert.match(html, /Maintenance and complete AS review/i);
  assert.match(shell, /\["29", "Security, privacy, integrity and threats"\]/);
});

test("Lesson 08 uses unambiguous media labels and viewport-safe slide navigation", async () => {
  const [lesson, shell, css] = await Promise.all([
    readFile(new URL("../app/lesson-08/lesson-08-client.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/_components/lesson-shell.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(lesson, /COPPER CABLE/);
  assert.match(lesson, /FIBRE-OPTIC CABLE/);
  assert.doesNotMatch(lesson, /<b>CABLE<\/b>|<b>FIBRE<\/b>/);
  assert.match(lesson, /9618\/13 M\/J 2023 Q2\(d\)/);
  assert.match(shell, /scrollIntoView/);
  assert.match(css, /100dvh - 166px/);
  const tabletMedia = css.slice(css.indexOf("@media (max-width: 900px)"), css.indexOf("@media (max-width: 640px)"));
  assert.match(tabletMedia, /\.deck-shell\s*\{[\s\S]*?overflow-x:\s*auto/);
  assert.match(tabletMedia, /\.slide-frame\s*\{\s*min-width:\s*1060px/);
});

const a2RouteCases = [
  { pathname: "/a2", title: /A2 Course 2027/i, content: [/32-WEEK COURSE MAP|32-week dual track/i, /PAPER 3 · SECTIONS 13–20 COMPLETE/i, /Paper 3/i, /Paper 4/i, /\.\/lesson-01\//, /\.\/lesson-29\//, /\.\/lab-01\//] },
  { pathname: "/a2/lesson-01", title: /A2 Computer Science · Lesson 01/i, content: [/SYLLABUS 13\.1/i, /A2 LESSON 01 SOURCES/i, /User-defined data types/i] },
  { pathname: "/a2/lesson-02", title: /A2 Computer Science · Lesson 02/i, content: [/SYLLABUS 13\.2/i, /A2 LESSON 02 SOURCES/i, /File organisation and access/i] },
  { pathname: "/a2/lesson-03", title: /A2 Computer Science · Lesson 03/i, content: [/SYLLABUS 13\.2/i, /A2 LESSON 03 SOURCES/i, /Hashing for file access/i] },
  { pathname: "/a2/lesson-04", title: /A2 Computer Science · Lesson 04/i, content: [/SYLLABUS 13\.3/i, /A2 LESSON 04 SOURCES/i, /floating-point/i] },
  { pathname: "/a2/lesson-05", title: /A2 Computer Science · Lesson 05/i, content: [/SYLLABUS 13\.3/i, /A2 LESSON 05 SOURCES/i, /normalise|normalisation/i] },
  { pathname: "/a2/lesson-06", title: /A2 Computer Science · Lesson 06/i, content: [/SYLLABUS 13\.3/i, /A2 LESSON 06 SOURCES/i, /Precision|underflow|overflow/i] },
  { pathname: "/a2/lesson-07", title: /A2 Computer Science · Lesson 07/i, content: [/SYLLABUS 14\.1/i, /A2 LESSON 07 SOURCES/i, /Application|Transport|Internet|Link/i] },
  { pathname: "/a2/lesson-08", title: /A2 Computer Science · Lesson 08/i, content: [/SYLLABUS 14\.1/i, /A2 LESSON 08 SOURCES/i, /HTTP|SMTP|BitTorrent/i] },
  { pathname: "/a2/lesson-09", title: /A2 Computer Science · Lesson 09/i, content: [/SYLLABUS 14\.2/i, /A2 LESSON 09 SOURCES/i, /Circuit|packet switching/i] },
  { pathname: "/a2/lesson-10", title: /A2 Computer Science · Lesson 10/i, content: [/SYLLABUS 14\.2/i, /A2 LESSON 10 SOURCES/i, /routing table|next hop/i] },
  { pathname: "/a2/lesson-11", title: /A2 Computer Science · Lesson 11/i, content: [/SYLLABUS 15\.1/i, /A2 LESSON 11 SOURCES/i, /RISC|CISC|pipelining/i] },
  { pathname: "/a2/lesson-12", title: /A2 Computer Science · Lesson 12/i, content: [/SYLLABUS 15\.1/i, /A2 LESSON 12 SOURCES/i, /SISD|SIMD|MIMD/i] },
  { pathname: "/a2/lesson-13", title: /A2 Computer Science · Lesson 13/i, content: [/SYLLABUS 15\.1/i, /A2 LESSON 13 SOURCES/i, /Virtual machines|guest operating system/i] },
  { pathname: "/a2/lesson-14", title: /A2 Computer Science · Lesson 14/i, content: [/SYLLABUS 15\.2/i, /A2 LESSON 14 SOURCES/i, /De Morgan|Boolean algebra/i] },
  { pathname: "/a2/lesson-15", title: /A2 Computer Science · Lesson 15/i, content: [/SYLLABUS 15\.2/i, /A2 LESSON 15 SOURCES/i, /half adder|flip-flop/i] },
  { pathname: "/a2/lesson-16", title: /A2 Computer Science · Lesson 16/i, content: [/SYLLABUS 15\.2/i, /A2 LESSON 16 SOURCES/i, /Karnaugh|Gray code/i] },
  { pathname: "/a2/lesson-17", title: /A2 Computer Science · Lesson 17/i, content: [/SYLLABUS 16\.1/i, /A2 LESSON 17 SOURCES/i, /operating system|process states/i] },
  { pathname: "/a2/lesson-18", title: /A2 Computer Science · Lesson 18/i, content: [/SYLLABUS 16\.1/i, /A2 LESSON 18 SOURCES/i, /round robin|shortest remaining/i] },
  { pathname: "/a2/lesson-19", title: /A2 Computer Science · Lesson 19/i, content: [/SYLLABUS 16\.1/i, /A2 LESSON 19 SOURCES/i, /virtual memory|segmentation|thrashing/i] },
  { pathname: "/a2/lesson-20", title: /A2 Computer Science · Lesson 20/i, content: [/SYLLABUS 16\.2/i, /A2 LESSON 20 SOURCES/i, /lexical analysis|Backus|RPN/i] },
  { pathname: "/a2/lesson-21", title: /A2 Computer Science · Lesson 21/i, content: [/SYLLABUS 17\.1/i, /A2 LESSON 21 SOURCES/i, /symmetric|asymmetric|public key/i] },
  { pathname: "/a2/lesson-22", title: /A2 Computer Science · Lesson 22/i, content: [/SYLLABUS 17\.1/i, /A2 LESSON 22 SOURCES/i, /quantum|SSL \/ TLS|digital certificate/i] },
  { pathname: "/a2/lesson-23", title: /A2 Computer Science · Lesson 23/i, content: [/SYLLABUS 18\.1/i, /A2 LESSON 23 SOURCES/i, /Dijkstra|A\*|heuristic/i] },
  { pathname: "/a2/lesson-24", title: /A2 Computer Science · Lesson 24/i, content: [/SYLLABUS 18\.1/i, /A2 LESSON 24 SOURCES/i, /neural network|back propagation|regression/i] },
  { pathname: "/a2/lesson-25", title: /A2 Computer Science · Lesson 25/i, content: [/SYLLABUS 19\.1/i, /A2 LESSON 25 SOURCES/i, /binary search|insertion sort|Big O/i] },
  { pathname: "/a2/lesson-26", title: /A2 Computer Science · Lesson 26/i, content: [/SYLLABUS 19\.1/i, /A2 LESSON 26 SOURCES/i, /Abstract Data Types|linked list|binary tree/i] },
  { pathname: "/a2/lesson-27", title: /A2 Computer Science · Lesson 27/i, content: [/SYLLABUS 19\.2/i, /A2 LESSON 27 SOURCES/i, /recursion|winding|unwinding/i] },
  { pathname: "/a2/lesson-28", title: /A2 Computer Science · Lesson 28/i, content: [/SYLLABUS 20\.1/i, /A2 LESSON 28 SOURCES/i, /low-level|imperative|declarative/i] },
  { pathname: "/a2/lesson-29", title: /A2 Computer Science · Lesson 29/i, content: [/SYLLABUS 20\.2/i, /A2 LESSON 29 SOURCES/i, /random|GETRECORD|exception/i] },
  { pathname: "/a2/lab-01", title: /Python Lab P01/i, content: [/PAPER 4/i, /A2 LAB P01 SOURCES/i, /evidence/i] },
  { pathname: "/exam-papers", title: /Question Papers and Mark Schemes/i, content: [/Question paper/i, /Mark scheme/i, /2024/, /2025/, /2026/, /AS LEVEL/i, /A2 STAGE/i] },
];

for (const routeCase of a2RouteCases) {
  test(`server-renders ${routeCase.pathname} as a complete course route`, async () => {
    const response = await render(routeCase.pathname);
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
    const html = await response.text();
    assert.match(html, routeCase.title);
    for (const pattern of routeCase.content) assert.match(html, pattern);
    assert.match(html, new RegExp(`<meta property="og:url" content="[^"]*${routeCase.pathname}/"`, "i"));
    assert.doesNotMatch(html, /codex-preview|Building your site|react-loading-skeleton/i);
  });
}

test("A2 hub explains the official syllabus and Paper 4 exam environment", async () => {
  const response = await render("/a2");
  const html = await response.text();
  assert.match(html, /OFFICIAL 2027–2029 SYLLABUS/);
  assert.match(html, /centre-owned computers/);
  assert.match(html, /Python, Java, or Visual Basic \.NET/);
  assert.match(html, /Paper 4 practical sequence is still being expanded/);
  assert.match(html, /href="#exam-guide"/);
  assert.match(html, /id="exam-guide"/);
  assert.match(html, /id="paper-4-environment"/);
});

test("A2 resources remain isolated from the 63-lesson AS catalogue", async () => {
  const resources = [
    ["/a2/lesson-01", "../lesson-01/", "01"],
    ["/a2/lesson-02", "../lesson-02/", "02"],
    ["/a2/lesson-03", "../lesson-03/", "03"],
    ["/a2/lesson-04", "../lesson-04/", "04"],
    ["/a2/lesson-05", "../lesson-05/", "05"],
    ["/a2/lesson-06", "../lesson-06/", "06"],
    ["/a2/lesson-07", "../lesson-07/", "07"],
    ["/a2/lesson-08", "../lesson-08/", "08"],
    ["/a2/lesson-09", "../lesson-09/", "09"],
    ["/a2/lesson-10", "../lesson-10/", "10"],
    ["/a2/lesson-11", "../lesson-11/", "11"],
    ["/a2/lesson-12", "../lesson-12/", "12"],
    ["/a2/lesson-13", "../lesson-13/", "13"],
    ["/a2/lesson-14", "../lesson-14/", "14"],
    ["/a2/lesson-15", "../lesson-15/", "15"],
    ["/a2/lesson-16", "../lesson-16/", "16"],
    ["/a2/lesson-17", "../lesson-17/", "17"],
    ["/a2/lesson-18", "../lesson-18/", "18"],
    ["/a2/lesson-19", "../lesson-19/", "19"],
    ["/a2/lesson-20", "../lesson-20/", "20"],
    ["/a2/lesson-21", "../lesson-21/", "21"],
    ["/a2/lesson-22", "../lesson-22/", "22"],
    ["/a2/lesson-23", "../lesson-23/", "23"],
    ["/a2/lesson-24", "../lesson-24/", "24"],
    ["/a2/lesson-25", "../lesson-25/", "25"],
    ["/a2/lesson-26", "../lesson-26/", "26"],
    ["/a2/lesson-27", "../lesson-27/", "27"],
    ["/a2/lesson-28", "../lesson-28/", "28"],
    ["/a2/lesson-29", "../lesson-29/", "29"],
    ["/a2/lab-01", "../lab-01/", "P01"],
  ];
  const htmlPages = await Promise.all(resources.map(async ([pathname]) => (await render(pathname)).text()));

  for (let index = 0; index < resources.length; index += 1) {
    const [, activeHref, activeLabel] = resources[index];
    const html = htmlPages[index];
    const escapedHref = activeHref.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    assert.match(html, new RegExp(`<option value="${escapedHref}" selected="">${activeLabel}`, "i"));
    assert.equal((html.match(/<option /g) ?? []).length, resources.length, `${resources[index][0]} should list all ${resources.length} published A2 resources`);
    assert.match(html, /<option value="\.\.\/lab-01\/"[^>]*>P01/i);
    assert.doesNotMatch(html, /lesson-P01|Maintenance and complete AS review/i);
  }
});

test("every published A2 lesson and lab provides 15 slides, 90 minutes and 30 homework marks", async () => {
  const sourceCases = [
    ["A2 lesson 01", "../app/a2/lesson-01/a2-lesson-01-client.tsx", /\bid:\s*["']a2-01-\d+["'],\s*marks:\s*(\d+)/g, /9618\/3[123]/i],
    ["A2 lesson 02", "../app/a2/lesson-02/a2-lesson-02-client.tsx", /\bid:\s*["']a2-02-\d+["'],\s*marks:\s*(\d+)/g, /9618\/3[123]/i],
    ["A2 lesson 03", "../app/a2/lesson-03/a2-lesson-03-client.tsx", /\bid:\s*["']a2-03-\d+["'],\s*marks:\s*(\d+)/g, /9618\/3[123]/i],
    ["A2 lesson 04", "../app/a2/lesson-04/a2-lesson-04-client.tsx", /\bid:\s*["']a2-04-\d+["'],\s*marks:\s*(\d+)/g, /9618\/3[123]/i],
    ["A2 lesson 05", "../app/a2/lesson-05/a2-lesson-05-client.tsx", /\bid:\s*["']a2-05-\d+["'],\s*marks:\s*(\d+)/g, /9618\/3[123]/i],
    ["A2 lesson 06", "../app/a2/lesson-06/a2-lesson-06-client.tsx", /\bid:\s*["']a2-06-\d+["'],\s*marks:\s*(\d+)/g, /9618\/3[123]/i],
    ["A2 lesson 07", "../app/a2/lesson-07/a2-lesson-07-client.tsx", /\bid:\s*["']a2-07-\d+["'],\s*marks:\s*(\d+)/g, /9618\/3[123]/i],
    ["A2 lesson 08", "../app/a2/lesson-08/a2-lesson-08-client.tsx", /\bid:\s*["']a2-08-\d+["'],\s*marks:\s*(\d+)/g, /9618\/3[123]/i],
    ["A2 lesson 09", "../app/a2/lesson-09/a2-lesson-09-client.tsx", /\bid:\s*["']a2-09-\d+["'],\s*marks:\s*(\d+)/g, /9618\/3[123]/i],
    ["A2 lesson 10", "../app/a2/lesson-10/a2-lesson-10-client.tsx", /\bid:\s*["']a2-10-\d+["'],\s*marks:\s*(\d+)/g, /9618\/3[123]/i],
    ["A2 lesson 11", "../app/a2/lesson-11/a2-lesson-11-client.tsx", /\bid:\s*["']a2-11-\d+["'],\s*marks:\s*(\d+)/g, /9618\/3[123]/i],
    ["A2 lesson 12", "../app/a2/lesson-12/a2-lesson-12-client.tsx", /\bid:\s*["']a2-12-\d+["'],\s*marks:\s*(\d+)/g, /9618\/3[123]/i],
    ["A2 lesson 13", "../app/a2/lesson-13/a2-lesson-13-client.tsx", /\bid:\s*["']a2-13-\d+["'],\s*marks:\s*(\d+)/g, /9618\/3[123]/i],
    ["A2 lesson 14", "../app/a2/lesson-14/a2-lesson-14-client.tsx", /\bid:\s*["']a2-14-\d+["'],\s*marks:\s*(\d+)/g, /9618\/3[123]/i],
    ["A2 lesson 15", "../app/a2/lesson-15/a2-lesson-15-client.tsx", /\bid:\s*["']a2-15-\d+["'],\s*marks:\s*(\d+)/g, /9618\/3[123]/i],
    ["A2 lesson 16", "../app/a2/lesson-16/a2-lesson-16-client.tsx", /\bid:\s*["']a2-16-\d+["'],\s*marks:\s*(\d+)/g, /9618\/3[123]/i],
    ["A2 lesson 17", "../app/a2/lesson-17/a2-lesson-17-client.tsx", /\bid:\s*["']a2-17-\d+["'],\s*marks:\s*(\d+)/g, /9618\/3[123]/i],
    ["A2 lesson 18", "../app/a2/lesson-18/a2-lesson-18-client.tsx", /\bid:\s*["']a2-18-\d+["'],\s*marks:\s*(\d+)/g, /9618\/3[123]/i],
    ["A2 lesson 19", "../app/a2/lesson-19/a2-lesson-19-client.tsx", /\bid:\s*["']a2-19-\d+["'],\s*marks:\s*(\d+)/g, /9618\/3[123]/i],
    ["A2 lesson 20", "../app/a2/lesson-20/a2-lesson-20-client.tsx", /\bid:\s*["']a2-20-\d+["'],\s*marks:\s*(\d+)/g, /9618\/3[123]/i],
    ["A2 lesson 21", "../app/a2/lesson-21/a2-lesson-21-client.tsx", /\bid:\s*["']a2-21-\d+["'],\s*marks:\s*(\d+)/g, /9618\/3[123]/i],
    ["A2 lesson 22", "../app/a2/lesson-22/a2-lesson-22-client.tsx", /\bid:\s*["']a2-22-\d+["'],\s*marks:\s*(\d+)/g, /9618\/3[123]/i],
    ["A2 lesson 23", "../app/a2/lesson-23/a2-lesson-23-client.tsx", /\bid:\s*["']a2-23-\d+["'],\s*marks:\s*(\d+)/g, /9618\/3[123]/i],
    ["A2 lesson 24", "../app/a2/lesson-24/a2-lesson-24-client.tsx", /\bid:\s*["']a2-24-\d+["'],\s*marks:\s*(\d+)/g, /9618\/3[123]/i],
    ["A2 lesson 25", "../app/a2/lesson-25/a2-lesson-25-client.tsx", /\bid:\s*["']a2-25-\d+["'],\s*marks:\s*(\d+)/g, /9618\/3[123]/i],
    ["A2 lesson 26", "../app/a2/lesson-26/a2-lesson-26-client.tsx", /\bid:\s*["']a2-26-\d+["'],\s*marks:\s*(\d+)/g, /9618\/3[123]/i],
    ["A2 lesson 27", "../app/a2/lesson-27/a2-lesson-27-client.tsx", /\bid:\s*["']a2-27-\d+["'],\s*marks:\s*(\d+)/g, /9618\/3[123]/i],
    ["A2 lesson 28", "../app/a2/lesson-28/a2-lesson-28-client.tsx", /\bid:\s*["']a2-28-\d+["'],\s*marks:\s*(\d+)/g, /9618\/3[123]/i],
    ["A2 lesson 29", "../app/a2/lesson-29/a2-lesson-29-client.tsx", /\bid:\s*["']a2-29-\d+["'],\s*marks:\s*(\d+)/g, /9618\/3[123]/i],
    ["A2 lab P01", "../app/a2/lab-01/a2-lab-01-client.tsx", /\bid:\s*["']a2-p01-\d+["'],\s*marks:\s*(\d+)/g, /9618\/4[123]/i],
  ];
  const sharedTheorySource = await readFile(new URL("../app/_components/a2-theory-lesson.tsx", import.meta.url), "utf8");
  assert.match(sharedTheorySource, /HomeworkSheet/);
  assert.match(sharedTheorySource, /marks=\{30\}/);
  assert.match(sharedTheorySource, /minutes=\{45\}/);

  for (const [label, sourcePath, questionPattern, paperPattern] of sourceCases) {
    const source = await readFile(new URL(sourcePath, import.meta.url), "utf8");
    const timings = [...source.matchAll(/\btime:\s*["'](\d+) min["']/g)].map((match) => Number(match[1]));
    const marks = [...source.matchAll(questionPattern)].map((match) => Number(match[1]));
    assert.equal(timings.length, 15, `${label} should contain exactly 15 timed slides`);
    assert.equal(timings.reduce((sum, value) => sum + value, 0), 90, `${label} should total 90 minutes`);
    assert.equal(marks.length, 9, `${label} should contain nine homework questions`);
    assert.equal(marks.reduce((sum, value) => sum + value, 0), 30, `${label} homework should total 30 marks`);
    assert.match(source, /PAST PAPER PRACTICE|PAST PAPER|PUBLISHED-PAPER|AUTHENTIC BENCHMARK/i);
    assert.match(source, paperPattern);
    assert.match(source, /HomeworkSheet|A2TheoryLesson/);
    assert.doesNotMatch(source, /answer-key/i);
  }
});

test("A2 Chapters 14 and 15 preserve current-syllabus model boundaries", async () => {
  const [networkLesson, logicLesson, diagrams] = await Promise.all([
    readFile(new URL("../app/a2/lesson-07/a2-lesson-07-client.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/a2/lesson-15/a2-lesson-15-client.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/_components/a2-advanced-diagrams.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(networkLesson, /Application[\s\S]*Transport[\s\S]*Internet[\s\S]*Link/);
  assert.match(networkLesson, /uses <strong>Internet<\/strong> where[^\n]*Network[^\n]*<strong>Link<\/strong>[^\n]*Data Link \+ Physical/);
  assert.match(logicLesson, /Draw and label a NOR SR latch/);
  assert.match(logicLesson, /MORE THAN TWO INPUTS/);
  assert.match(logicLesson, /SrLatchDiagram/);
  assert.match(diagrams, /Cross-coupled NOR SR latch/);
});

test("A2 Chapters 16 and 17 cover every named current-syllabus boundary", async () => {
  const [processes, scheduling, memory, translation, encryption, trust, diagrams] = await Promise.all([
    readFile(new URL("../app/a2/lesson-17/a2-lesson-17-client.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/a2/lesson-18/a2-lesson-18-client.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/a2/lesson-19/a2-lesson-19-client.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/a2/lesson-20/a2-lesson-20-client.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/a2/lesson-21/a2-lesson-21-client.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/a2/lesson-22/a2-lesson-22-client.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/_components/a2-advanced-diagrams.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(processes, /CPU time[\s\S]*main memory[\s\S]*secondary storage[\s\S]*input\/output/i);
  assert.match(processes, /RUNNING[\s\S]*READY[\s\S]*BLOCKED/i);
  assert.match(processes, /user interface hides hardware complexity|UI AS ABSTRACTION/i);
  assert.match(scheduling, /FIRST COME FIRST SERVED[\s\S]*SHORTEST JOB FIRST[\s\S]*ROUND ROBIN[\s\S]*SHORTEST REMAINING TIME/i);
  assert.match(scheduling, /kernel[\s\S]*interrupt handler|KERNEL AS INTERRUPT HANDLER/i);
  assert.match(memory, /PAGING VS SEGMENTATION/i);
  assert.match(memory, /page replacement|REPLACE PAGES/i);
  assert.match(memory, /disk thrashing/i);
  assert.match(translation, /lexical analysis[\s\S]*syntax analysis[\s\S]*code generation[\s\S]*optimisation/i);
  assert.match(translation, /syntax diagrams[\s\S]*BACKUS[–-]NAUR FORM[\s\S]*RPN/i);
  assert.match(encryption, /recipient's public key[\s\S]*recipient's private key/i);
  assert.match(encryption, /sender's private key[\s\S]*sender's public key/i);
  assert.match(trust, /quantum cryptography[\s\S]*SSL \/ TLS[\s\S]*digital certificate/i);
  assert.match(trust, /Generates key pair \+ CSR[\s\S]*Verifies identity\/control[\s\S]*Signs certificate/i);
  assert.match(diagrams, /Required process states and valid transitions/);
  assert.match(diagrams, /Logical pages mapped through a page table to physical frames/);
});

test("A2 Chapters 18 and 19 cover every named current-syllabus boundary", async () => {
  const [graphs, learning, algorithms, adts, recursion, diagrams] = await Promise.all([
    readFile(new URL("../app/a2/lesson-23/a2-lesson-23-client.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/a2/lesson-24/a2-lesson-24-client.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/a2/lesson-25/a2-lesson-25-client.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/a2/lesson-26/a2-lesson-26-client.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/a2/lesson-27/a2-lesson-27-client.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/_components/a2-advanced-diagrams.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(graphs, /Dijkstra[\s\S]*A\*[\s\S]*heuristic/i);
  assert.match(graphs, /not required to (?:program|write)[\s\S]*graph|NO GRAPH CODE/i);
  assert.match(learning, /supervised[\s\S]*unsupervised[\s\S]*reinforcement/i);
  assert.match(learning, /Deep Learning/i);
  assert.match(learning, /back propagation[\s\S]*regression|regression[\s\S]*back propagation/i);
  assert.match(algorithms, /linear search[\s\S]*binary search[\s\S]*bubble[\s\S]*insertion/i);
  assert.match(algorithms, /O\(log n\)/i);
  assert.match(algorithms, /O\(n²\)|O\(n\^2\)/i);
  assert.match(algorithms, /Auxiliary space|space complexity/i);
  assert.match(adts, /stack[\s\S]*queue[\s\S]*linked list[\s\S]*dictionary[\s\S]*binary tree[\s\S]*graph/i);
  assert.match(adts, /FIND \/ INSERT \/ DELETE|find[\s\S]*insert[\s\S]*delete/i);
  assert.match(adts, /Two LIFO stacks can expose FIFO queue behaviour|ADT FROM ANOTHER ADT/i);
  assert.match(recursion, /base case[\s\S]*winding[\s\S]*unwinding/i);
  assert.match(recursion, /ACTIVATION RECORD|return address/i);
  assert.match(diagrams, /Weighted graph with shortest path highlighted/);
  assert.match(diagrams, /Artificial neural network with back propagation/);
  assert.match(diagrams, /Recursive factorial calls winding and unwinding on a stack/);
});

test("A2 Chapter 20 covers every named current-syllabus boundary", async () => {
  const [paradigms, files, diagrams] = await Promise.all([
    readFile(new URL("../app/a2/lesson-28/a2-lesson-28-client.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/a2/lesson-29/a2-lesson-29-client.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/_components/a2-advanced-diagrams.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(paradigms, /low-level[\s\S]*imperative[\s\S]*object-oriented[\s\S]*declarative/i);
  assert.match(`${paradigms}\n${diagrams}`, /immediate[\s\S]*direct[\s\S]*indirect[\s\S]*indexed[\s\S]*relative/i);
  assert.match(paradigms, /variables[\s\S]*constructs[\s\S]*procedures[\s\S]*functions/i);
  for (const term of [/objects?/i, /propert(?:y|ies)|attributes?/i, /methods?/i, /classes?/i, /inheritance/i, /polymorphism/i, /containment \(aggregation\)|aggregation/i, /encapsulation/i, /getters?/i, /setters?/i, /instances?/i]) assert.match(paradigms, term);
  assert.match(paradigms, /facts[\s\S]*rules[\s\S]*goal/i);
  assert.match(files, /READ[\s\S]*WRITE[\s\S]*APPEND/i);
  assert.match(files, /serial[\s\S]*sequential[\s\S]*random/i);
  assert.match(files, /SEEK[\s\S]*GETRECORD[\s\S]*PUTRECORD/i);
  assert.match(files, /exception[\s\S]*TRY[\s\S]*EXCEPT/i);
  assert.match(diagrams, /Four programming paradigms compared/);
  assert.match(diagrams, /Serial, sequential and random file organisation/);
  assert.match(diagrams, /Normal and exceptional control flow/);
});

test("the recent-paper index uses authorised access and labels unreleased material", async () => {
  const [dataSource, rootSource] = await Promise.all([
    readFile(new URL("../app/_data/exam-papers.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
  ]);
  const years = [...dataSource.matchAll(/\byear:\s*(20\d{2})/g)].map((match) => Number(match[1]));
  assert.deepEqual(years, [2024, 2025, 2026]);
  assert.match(dataSource, /cambridgeinternational\.org/);
  assert.match(dataSource, /schoolsupporthub\.cambridgeinternational\.org/);
  assert.match(dataSource, /status: "pending"/);
  assert.match(dataSource, /Not yet available/);
  assert.doesNotMatch(dataSource, /href:\s*["']#["']/);
  assert.match(rootSource, /href="\.\/a2\/"/);
  assert.match(rootSource, /href="\.\/exam-papers\/"/);
});
