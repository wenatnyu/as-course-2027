import type { Metadata } from "next";
import "../../a2-lessons.css";
import "../a2-data-representation.css";
import A2Lesson06Client from "./a2-lesson-06-client";

const title = "A2 Computer Science · Lesson 06";
const description = "A 90-minute Cambridge 9618 Paper 3 lesson on floating-point precision, range, approximation, rounding, underflow and overflow, with a Chapter 13 checkpoint.";
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wenatnyu.github.io/as-course-2027/";
const siteUrl = configuredSiteUrl.endsWith("/") ? configuredSiteUrl : `${configuredSiteUrl}/`;
const lessonUrl = new URL("a2/lesson-06/", siteUrl).toString();

export const dynamic = "force-static";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website", url: lessonUrl, images: [] },
  twitter: { card: "summary", title, description, images: [] },
};

export default function A2Lesson06Page() {
  return <A2Lesson06Client />;
}
