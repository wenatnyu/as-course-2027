import { copyFile, mkdir, readdir, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const outputRoot = new URL("../dist/client/", import.meta.url);
const lessonRoutes = (await readdir(fileURLToPath(outputRoot)))
  .filter((name) => /^lesson-\d{2}\.html$/.test(name))
  .map((name) => name.replace(/\.html$/, ""))
  .sort();

for (const route of lessonRoutes) {
  const routeDirectory = new URL(`${route}/`, outputRoot);
  await mkdir(fileURLToPath(routeDirectory), { recursive: true });
  await copyFile(
    fileURLToPath(new URL(`${route}.html`, outputRoot)),
    fileURLToPath(new URL("index.html", routeDirectory)),
  );
  await rm(fileURLToPath(new URL(`${route}.html`, outputRoot)));
}

console.log(`Prepared ${lessonRoutes.length} nested GitHub Pages routes.`);
