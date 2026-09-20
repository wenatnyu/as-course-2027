import assert from "node:assert/strict";
import { access, readFile, stat } from "node:fs/promises";
import test from "node:test";

const outputRoot = new URL("../dist/client/", import.meta.url);
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ?? "https://wenatnyu.github.io/as-course-2027/";
const siteUrl = configuredSiteUrl.replace(/\/+$/g, "");
const escapedSiteUrl = siteUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const assetUrlPattern = new RegExp(`${escapedSiteUrl}/_next/static/`);

test("emits a complete Lesson 01 GitHub Pages artifact", async () => {
  const html = await readFile(new URL("index.html", outputRoot), "utf8");
  const assets = await stat(new URL("_next/static/", outputRoot));

  assert.ok(assets.isDirectory());
  await access(new URL(".nojekyll", outputRoot));
  await access(new URL("og.png", outputRoot));
  assert.match(html, assetUrlPattern);
  assert.match(html, /https:\/\/wenatnyu\.github\.io\/as-course-2027\/og\.png/);
});

const lessonArtifacts = [
  {
    slug: "lesson-02",
    number: "02",
    keyContent: /binary magnitudes?|binary (?:and decimal )?prefixes?|data (?:capacity|units?)|kibibytes?|\bKiB\b/i,
  },
  {
    slug: "lesson-03",
    number: "03",
    keyContent: /signed binary|two(?:'|’|&apos;|&#x27;)?s complement|binary arithmetic|overflow|binary coded decimal|\bBCD\b/i,
  },
  {
    slug: "lesson-04",
    number: "04",
    keyContent: /character data|ASCII|Unicode|bitmap|colour depth|pixel/i,
  },
  {
    slug: "lesson-05",
    number: "05",
    keyContent: /vector graphics?|drawing (?:list|object)|sampling (?:rate|resolution)|sound|file[- ]size/i,
  },
  {
    slug: "lesson-06",
    number: "06",
    keyContent: /compression|lossy|lossless|run-length encoding|\bRLE\b/i,
  },
  {
    slug: "lesson-07",
    number: "07",
    keyContent: /LAN|WAN|client-server|peer-to-peer|topolog|router|switch/i,
  },
  {
    slug: "lesson-08",
    number: "08",
    keyContent: /cloud|wired|wireless|fibre|satellite/i,
  },
  {
    slug: "lesson-09",
    number: "09",
    keyContent: /Ethernet|CSMA.CD|streaming|internet infrastructure|WWW/i,
  },
  {
    slug: "lesson-10",
    number: "10",
    keyContent: /IPv4|IPv6|subnet|URL|DNS/i,
  },
  {
    slug: "lesson-11",
    number: "11",
    keyContent: /embedded|buffer|input|output|secondary/i,
  },
  {
    slug: "lesson-12",
    number: "12",
    keyContent: /RAM|ROM|SRAM|DRAM|EPROM|EEPROM/i,
  },
  {
    slug: "lesson-13",
    number: "13",
    keyContent: /laser|3D print|hard disk|solid.state|touchscreen|VR/i,
  },
  {
    slug: "lesson-14",
    number: "14",
    keyContent: /monitoring|control|sensor|actuator|feedback/i,
  },
  {
    slug: "lesson-15",
    number: "15",
    keyContent: /logic gate|NAND|NOR|XOR|truth table/i,
  },
  {
    slug: "lesson-16",
    number: "16",
    keyContent: /problem statement|expression|logic circuit|truth table/i,
  },
  {
    slug: "lesson-17",
    number: "17",
    keyContent: /Von Neumann|stored program|Program Counter|Memory Data Register|\bMDR\b/i,
  },
  {
    slug: "lesson-18",
    number: "18",
    keyContent: /address bus|data bus|control bus|clock speed|cache|HDMI/i,
  },
  {
    slug: "lesson-19",
    number: "19",
    keyContent: /fetch.execute|register transfer|interrupt|Interrupt Service Routine|\bISR\b/i,
  },
  {
    slug: "lesson-20",
    number: "20",
    keyContent: /assembly language|machine code|opcode|operand|instruction group/i,
  },
  {
    slug: "lesson-21",
    number: "21",
    keyContent: /addressing mode|immediate|direct|indirect|indexed|relative/i,
  },
  {
    slug: "lesson-22",
    number: "22",
    keyContent: /two.pass assembler|symbol table|forward reference|object code/i,
  },
  {
    slug: "lesson-23",
    number: "23",
    keyContent: /trace|accumulator|\bACC\b|\bCMP\b|\bJPE\b|\bJPN\b/i,
  },
  {
    slug: "lesson-24",
    number: "24",
    keyContent: /logical shift|arithmetic shift|cyclic shift|bit mask|bitwise/i,
  },
  {
    slug: "lesson-25",
    number: "25",
    keyContent: /operating system|memory management|file management|process management/i,
  },
  {
    slug: "lesson-26",
    number: "26",
    keyContent: /utility|disk formatter|defragment|program librar|\bDLL\b/i,
  },
  {
    slug: "lesson-27",
    number: "27",
    keyContent: /assembler|compiler|interpreter|bytecode|\bJVM\b/i,
  },
  {
    slug: "lesson-28",
    number: "28",
    keyContent: /Integrated Development Environment|\bIDE\b|context.sensitive|syntax check|breakpoint|single stepping|prettyprint/i,
  },
  {
    slug: "lesson-29",
    number: "29",
    keyContent: /security|privacy|integrity|virus|spyware|phishing|pharming/i,
  },
  {
    slug: "lesson-30",
    number: "30",
    keyContent: /authentication|authorisation|digital signature|firewall|encryption|access rights/i,
  },
  {
    slug: "lesson-31",
    number: "31",
    keyContent: /validation|verification|range check|existence check|check digit/i,
  },
  {
    slug: "lesson-32",
    number: "32",
    keyContent: /even parity|odd parity|block parity|checksum|retransmission/i,
  },
  {
    slug: "lesson-33",
    number: "33",
    keyContent: /professional ethics|\bBCS\b|\bIEEE\b|stakeholder|public trust/i,
  },
  {
    slug: "lesson-34",
    number: "34",
    keyContent: /copyright|software licence|Free Software Foundation|Open Source Initiative|shareware|commercial/i,
  },
  {
    slug: "lesson-35",
    number: "35",
    keyContent: /artificial intelligence|computer vision|natural language processing|social impact|economic impact|environmental impact/i,
  },
  {
    slug: "lesson-36",
    number: "36",
    keyContent: /file-based|relational database|candidate key|foreign key/i,
  },
  {
    slug: "lesson-37",
    number: "37",
    keyContent: /entity.relationship|E-R|normalisation|1NF|2NF|referential integrity/i,
  },
  {
    slug: "lesson-38",
    number: "38",
    keyContent: /third normal form|3NF|DBMS|data dictionary|logical schema|query processor/i,
  },
  {
    slug: "lesson-39",
    number: "39",
    keyContent: /SQL|DDL|CREATE TABLE|ALTER TABLE|FOREIGN KEY|VARCHAR/i,
  },
  {
    slug: "lesson-40",
    number: "40",
    keyContent: /SQL|DML|GROUP BY|INNER JOIN|INSERT INTO|UPDATE|DELETE FROM/i,
  },
  {
    slug: "lesson-41",
    number: "41",
    keyContent: /abstraction|decomposition|abstract model|sub-problem/i,
  },
  {
    slug: "lesson-42",
    number: "42",
    keyContent: /algorithm|identifier table|input.*process.*output|structured English/i,
  },
  {
    slug: "lesson-43",
    number: "43",
    keyContent: /sequence|selection|iteration|flowchart|pseudocode|AND|OR|NOT/i,
  },
  {
    slug: "lesson-44",
    number: "44",
    keyContent: /stepwise refinement|programmable detail|refine/i,
  },
  { slug: "lesson-45", number: "45", keyContent: /data types|BookRecord|dot notation/i },
  { slug: "lesson-46", number: "46", keyContent: /1D Arrays|linear search|lower bound/i },
  { slug: "lesson-47", number: "47", keyContent: /bubble sort|NoSwaps|adjacent/i },
  { slug: "lesson-48", number: "48", keyContent: /2D Arrays|nested loops|arrays of records/i },
  { slug: "lesson-49", number: "49", keyContent: /text files|OPENFILE|EOF/i },
  { slug: "lesson-50", number: "50", keyContent: /Stacks|Queues|LIFO|FIFO/i },
  { slug: "lesson-51", number: "51", keyContent: /Linked Lists|HeadPointer|free list/i },
  { slug: "lesson-52", number: "52", keyContent: /Programming Essentials|library routines|assignment/i },
  { slug: "lesson-53", number: "53", keyContent: /Nested IF|CASE OF|selection/i },
  { slug: "lesson-54", number: "54", keyContent: /Iteration|WHILE|REPEAT.*UNTIL|efficient/i },
  { slug: "lesson-55", number: "55", keyContent: /Modules|local variable|FUNCTION|PROCEDURE/i },
  { slug: "lesson-56", number: "56", keyContent: /BYVAL|BYREF|Parameters/i },
  { slug: "lesson-57", number: "57", keyContent: /Program Development Life Cycle|analysis|maintenance/i },
  { slug: "lesson-58", number: "58", keyContent: /Waterfall|Iterative|RAD Models/i },
  { slug: "lesson-59", number: "59", keyContent: /Structure Charts|module hierarchy|interface/i },
  { slug: "lesson-60", number: "60", keyContent: /state-transition|Structure Charts to Code|transition/i },
  { slug: "lesson-61", number: "61", keyContent: /syntax error|logic error|white-box|stub/i },
  { slug: "lesson-62", number: "62", keyContent: /Test Strategy|boundary|beta|acceptance/i },
  { slug: "lesson-63", number: "63", keyContent: /corrective|adaptive|perfective|AS Finish/i },
];

for (const lesson of lessonArtifacts) {
  test(`emits a complete Lesson ${lesson.number} GitHub Pages artifact`, async () => {
    const html = await readFile(new URL(`${lesson.slug}/index.html`, outputRoot), "utf8");

    await assert.rejects(access(new URL(`${lesson.slug}.html`, outputRoot)));
    assert.match(html, assetUrlPattern);
    assert.match(html, new RegExp(`<title>[^<]*Lesson ${lesson.number}[^<]*<\\/title>`, "i"));
    assert.match(html, lesson.keyContent);
    assert.match(html, new RegExp(`<meta property="og:title" content="[^"]*Lesson ${lesson.number}[^"]*"`, "i"));
    assert.match(html, new RegExp(`<meta property="og:url" content="${escapedSiteUrl}/${lesson.slug}/"`, "i"));
    assert.match(html, new RegExp(`<meta name="twitter:title" content="[^"]*Lesson ${lesson.number}[^"]*"`, "i"));
    assert.doesNotMatch(html, /<meta property="og:image" content="[^"]*\/og\.png"/i);
    assert.doesNotMatch(html, /<meta name="twitter:image" content="[^"]*\/og\.png"/i);
  });
}

const nestedCourseArtifacts = [
  { flat: "a2.html", route: "a2", title: /A2 Course 2027/i, keyContent: /32-WEEK COURSE MAP|32-week dual track/i },
  { flat: "a2/lesson-01.html", route: "a2/lesson-01", title: /A2 Computer Science · Lesson 01/i, keyContent: /SYLLABUS 13\.1/i },
  { flat: "a2/lesson-02.html", route: "a2/lesson-02", title: /A2 Computer Science · Lesson 02/i, keyContent: /SYLLABUS 13\.2/i },
  { flat: "a2/lesson-03.html", route: "a2/lesson-03", title: /A2 Computer Science · Lesson 03/i, keyContent: /SYLLABUS 13\.2/i },
  { flat: "a2/lesson-04.html", route: "a2/lesson-04", title: /A2 Computer Science · Lesson 04/i, keyContent: /SYLLABUS 13\.3/i },
  { flat: "a2/lesson-05.html", route: "a2/lesson-05", title: /A2 Computer Science · Lesson 05/i, keyContent: /SYLLABUS 13\.3/i },
  { flat: "a2/lesson-06.html", route: "a2/lesson-06", title: /A2 Computer Science · Lesson 06/i, keyContent: /SYLLABUS 13\.3/i },
  { flat: "a2/lesson-07.html", route: "a2/lesson-07", title: /A2 Computer Science · Lesson 07/i, keyContent: /SYLLABUS 14\.1/i },
  { flat: "a2/lesson-08.html", route: "a2/lesson-08", title: /A2 Computer Science · Lesson 08/i, keyContent: /SYLLABUS 14\.1/i },
  { flat: "a2/lesson-09.html", route: "a2/lesson-09", title: /A2 Computer Science · Lesson 09/i, keyContent: /SYLLABUS 14\.2/i },
  { flat: "a2/lesson-10.html", route: "a2/lesson-10", title: /A2 Computer Science · Lesson 10/i, keyContent: /SYLLABUS 14\.2/i },
  { flat: "a2/lesson-11.html", route: "a2/lesson-11", title: /A2 Computer Science · Lesson 11/i, keyContent: /RISC|CISC|pipelining/i },
  { flat: "a2/lesson-12.html", route: "a2/lesson-12", title: /A2 Computer Science · Lesson 12/i, keyContent: /SISD|SIMD|MIMD/i },
  { flat: "a2/lesson-13.html", route: "a2/lesson-13", title: /A2 Computer Science · Lesson 13/i, keyContent: /Virtual machines|guest operating system/i },
  { flat: "a2/lesson-14.html", route: "a2/lesson-14", title: /A2 Computer Science · Lesson 14/i, keyContent: /De Morgan|Boolean algebra/i },
  { flat: "a2/lesson-15.html", route: "a2/lesson-15", title: /A2 Computer Science · Lesson 15/i, keyContent: /half adder|flip-flop/i },
  { flat: "a2/lesson-16.html", route: "a2/lesson-16", title: /A2 Computer Science · Lesson 16/i, keyContent: /Karnaugh|Gray code/i },
  { flat: "a2/lesson-17.html", route: "a2/lesson-17", title: /A2 Computer Science · Lesson 17/i, keyContent: /operating system|process states/i },
  { flat: "a2/lesson-18.html", route: "a2/lesson-18", title: /A2 Computer Science · Lesson 18/i, keyContent: /round robin|shortest remaining/i },
  { flat: "a2/lesson-19.html", route: "a2/lesson-19", title: /A2 Computer Science · Lesson 19/i, keyContent: /virtual memory|disk thrashing/i },
  { flat: "a2/lesson-20.html", route: "a2/lesson-20", title: /A2 Computer Science · Lesson 20/i, keyContent: /lexical analysis|Backus|RPN/i },
  { flat: "a2/lesson-21.html", route: "a2/lesson-21", title: /A2 Computer Science · Lesson 21/i, keyContent: /symmetric|asymmetric|public key/i },
  { flat: "a2/lesson-22.html", route: "a2/lesson-22", title: /A2 Computer Science · Lesson 22/i, keyContent: /quantum|SSL \/ TLS|digital certificate/i },
  { flat: "a2/lesson-23.html", route: "a2/lesson-23", title: /A2 Computer Science · Lesson 23/i, keyContent: /Dijkstra|A\*|heuristic/i },
  { flat: "a2/lesson-24.html", route: "a2/lesson-24", title: /A2 Computer Science · Lesson 24/i, keyContent: /neural network|back propagation|regression/i },
  { flat: "a2/lesson-25.html", route: "a2/lesson-25", title: /A2 Computer Science · Lesson 25/i, keyContent: /binary search|insertion sort|Big O/i },
  { flat: "a2/lesson-26.html", route: "a2/lesson-26", title: /A2 Computer Science · Lesson 26/i, keyContent: /Abstract Data Types|linked list|binary tree/i },
  { flat: "a2/lesson-27.html", route: "a2/lesson-27", title: /A2 Computer Science · Lesson 27/i, keyContent: /recursion|winding|unwinding/i },
  { flat: "a2/lesson-28.html", route: "a2/lesson-28", title: /A2 Computer Science · Lesson 28/i, keyContent: /low-level|imperative|declarative/i },
  { flat: "a2/lesson-29.html", route: "a2/lesson-29", title: /A2 Computer Science · Lesson 29/i, keyContent: /random|GETRECORD|exception/i },
  { flat: "a2/lab-01.html", route: "a2/lab-01", title: /Python Lab P01/i, keyContent: /PAPER 4/i },
  { flat: "exam-papers.html", route: "exam-papers", title: /Question Papers and Mark Schemes/i, keyContent: /School Support Hub/i },
];

for (const artifact of nestedCourseArtifacts) {
  test(`emits the nested ${artifact.route} GitHub Pages artifact`, async () => {
    const html = await readFile(new URL(`${artifact.route}/index.html`, outputRoot), "utf8");
    await assert.rejects(access(new URL(artifact.flat, outputRoot)));
    assert.match(html, assetUrlPattern);
    assert.match(html, artifact.title);
    assert.match(html, artifact.keyContent);
    assert.match(html, new RegExp(`<meta property="og:url" content="${escapedSiteUrl}/${artifact.route}/"`, "i"));
  });
}
