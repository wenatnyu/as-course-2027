import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const pagesBasePath = process.env.PAGES_BASE_PATH ?? "";
const pagesSiteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL
  ?? (isGitHubPages ? "https://wenatnyu.github.io/as-course-2027/" : "")
).replace(/\/+$/, "");
const pagesAssetPrefix = pagesSiteUrl || pagesBasePath;

// Keep the existing Worker/Sites build as the default. GitHub Pages builds
// opt into a full static export. The repository path is an asset prefix so
// index.html stays at the artifact root while scripts and styles resolve from
// the GitHub Pages project URL. An absolute prefix keeps the files in the
// artifact-root _next directory, matching how project Pages maps its base URL.
// vinext beta currently redirects nested routes during export when
// trailingSlash is true, so the Pages build emits flat HTML first. The
// build:pages post-step mirrors those files into route/index.html locations.
const nextConfig: NextConfig = isGitHubPages
  ? {
      output: "export",
      trailingSlash: false,
      assetPrefix: pagesAssetPrefix,
    }
  : {};

export default nextConfig;
