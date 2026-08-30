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

test("uses the configured static GitHub Pages social image", async () => {
  const html = await (await render("/", "as-cs.example.test")).text();
  assert.match(html, /https:\/\/wenatnyu\.github\.io\/as-course-2027\/og\.png/);

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
  },
  {
    pathname: "/lesson-03",
    slug: "lesson-03",
    number: "03",
    keyContent: /signed binary|two(?:'|’|&apos;|&#x27;)?s complement|binary arithmetic|overflow|binary coded decimal|\bBCD\b/i,
  },
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
    assert.match(html, /SYLLABUS 1\.1/i);
    assert.match(html, /class="textbook-mark"[^>]*>[^<]*(?:COURSEBOOK|TEXTBOOK)/i);
    assert.match(html, new RegExp(`LESSON ${lesson.number} SOURCES`, "i"));
    assert.doesNotMatch(html, /codex-preview|Building your site|react-loading-skeleton/i);
  });

  test(`Lesson ${lesson.number} includes inline-answer homework and totals 90 minutes`, async () => {
    const [routeSource, sharedShell] = await Promise.all([
      readTsxTree(new URL(`../app/${lesson.slug}/`, import.meta.url)),
      readFile(new URL("../app/_components/lesson-shell.tsx", import.meta.url), "utf8"),
    ]);

    assert.match(routeSource, /HomeworkSheet/);
    assert.match(routeSource, /\banswer\s*:/);
    assert.match(routeSource, /Show all answers|HomeworkSheet/);
    assert.match(sharedShell, /function InlineAnswer/);
    assert.match(sharedShell, /className="inline-answer-toggle"/);
    assert.match(sharedShell, /className=\{visible \? "inline-answer visible" : "inline-answer"\}/);
    assert.doesNotMatch(routeSource, /answer-key/i);
    assert.doesNotMatch(sharedShell, /answer-key/i);

    const timings = [...routeSource.matchAll(/\btime:\s*["'](\d+) min["']/g)].map((match) => Number(match[1]));
    assert.ok(timings.length >= 10, `Lesson ${lesson.number} should expose a maintainable timing for each teaching segment`);
    assert.equal(timings.reduce((sum, value) => sum + value, 0), 90);
  });
}
