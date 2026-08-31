import type { Metadata } from "next";
import Lesson06Client from "./lesson-06-client";

const title = "AS Computer Science · Lesson 06";
const description = "A 90-minute Cambridge 9618 lesson on lossy and lossless compression, run-length encoding and compression choices for text, graphics and sound.";
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wenatnyu.github.io/as-course-2027/";
const siteUrl = configuredSiteUrl.endsWith("/") ? configuredSiteUrl : `${configuredSiteUrl}/`;
const lessonUrl = new URL("lesson-06/", siteUrl).toString();

export const dynamic = "force-static";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website", url: lessonUrl, images: [] },
  twitter: { card: "summary", title, description, images: [] },
};

export default function Lesson06Page() {
  return <Lesson06Client />;
}
