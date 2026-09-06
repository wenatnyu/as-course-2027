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
