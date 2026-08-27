import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

async function render(host = "lesson.example.test") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${Math.random()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`https://${host}/`, {
      headers: { accept: "text/html", host, "x-forwarded-host": host, "x-forwarded-proto": "https" },
    }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the complete lesson, homework and roadmap shell", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>AS Computer Science · Lesson 01<\/title>/i);
  assert.match(html, /Binary, Denary/);
  assert.match(html, /SYLLABUS 1\.1/);
  assert.match(html, /cambridgeinternational\.org\/Images\/721397-2027-2029-syllabus\.pdf/);
  assert.doesNotMatch(html, /codex-preview|Building your site|react-loading-skeleton/i);
});

test("uses a request-host absolute social image", async () => {
  const html = await (await render("as-cs.example.test")).text();
  assert.match(html, /https:\/\/as-cs\.example\.test\/og\.png/);

  const image = await stat(new URL("../public/og.png", import.meta.url));
  assert.ok(image.size > 100_000, "social preview image should be a substantive generated asset");
});

test("keeps the generated lesson source self-contained", async () => {
  const [page, css, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
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
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);

  const timings = [...page.matchAll(/time: "(\d+) min"/g)].map((match) => Number(match[1]));
  assert.equal(timings.length, 15);
  assert.equal(timings.reduce((sum, value) => sum + value, 0), 90);
});
