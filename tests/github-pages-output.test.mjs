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
