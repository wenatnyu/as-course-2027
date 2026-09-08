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
