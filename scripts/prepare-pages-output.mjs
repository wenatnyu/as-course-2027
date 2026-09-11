import { copyFile, mkdir, readdir, rm } from "node:fs/promises";
import { basename, dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const outputRoot = fileURLToPath(new URL("../dist/client/", import.meta.url));

async function collectHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await collectHtmlFiles(entryPath));
    else if (entry.isFile() && entry.name.endsWith(".html")) files.push(entryPath);
  }

  return files;
}

const routeFiles = (await collectHtmlFiles(outputRoot)).filter((filePath) => {
  const name = basename(filePath);
  return name !== "index.html" && name !== "404.html" && name !== "500.html" && !name.startsWith("_");
});

for (const filePath of routeFiles) {
  const routePath = relative(outputRoot, filePath).replace(/\.html$/, "");
  const indexPath = join(outputRoot, routePath, "index.html");
  await mkdir(dirname(indexPath), { recursive: true });
  await copyFile(filePath, indexPath);
  await rm(filePath);
}

console.log(`Prepared ${routeFiles.length} nested GitHub Pages routes.`);
