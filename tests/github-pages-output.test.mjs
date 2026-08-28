import assert from "node:assert/strict";
import { access, readFile, stat } from "node:fs/promises";
import test from "node:test";

const outputRoot = new URL("../dist/client/", import.meta.url);
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ?? "https://wenatnyu.github.io/as-course-2027/";
const siteUrl = configuredSiteUrl.replace(/\/+$/g, "");

test("emits a complete Lesson 01 GitHub Pages artifact", async () => {
  const html = await readFile(new URL("index.html", outputRoot), "utf8");
  const assets = await stat(new URL("_next/static/", outputRoot));

  assert.ok(assets.isDirectory());
  await access(new URL(".nojekyll", outputRoot));
  await access(new URL("og.png", outputRoot));
  assert.match(html, new RegExp(`${siteUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/_next/static/`));
  assert.match(html, /https:\/\/wenatnyu\.github\.io\/as-course-2027\/og\.png/);
});
