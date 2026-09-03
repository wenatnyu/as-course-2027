import type { Metadata } from "next";
import "../assembly-lessons.css";
import Lesson22Client from "./lesson-22-client";

const title = "AS Computer Science · Lesson 22";
const description = "A 90-minute Cambridge 9618 lesson on the stages and application of a two-pass assembler.";
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wenatnyu.github.io/as-course-2027/";
const siteUrl = configuredSiteUrl.endsWith("/") ? configuredSiteUrl : `${configuredSiteUrl}/`;
const lessonUrl = new URL("lesson-22/", siteUrl).toString();

export const dynamic = "force-static";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website", url: lessonUrl, images: [] },
  twitter: { card: "summary", title, description, images: [] },
};

export default function Lesson22Page() {
  return <Lesson22Client />;
}
