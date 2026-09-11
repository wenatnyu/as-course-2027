import type { Metadata } from "next";
import "../../a2-lessons.css";
import "../a2-data-representation.css";
import A2Lesson02Client from "./a2-lesson-02-client";

const title = "A2 Computer Science · Lesson 02";
const description = "A 90-minute Cambridge 9618 Paper 3 lesson on serial, sequential and random file organisation with sequential and direct access.";
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wenatnyu.github.io/as-course-2027/";
const siteUrl = configuredSiteUrl.endsWith("/") ? configuredSiteUrl : `${configuredSiteUrl}/`;
const lessonUrl = new URL("a2/lesson-02/", siteUrl).toString();

export const dynamic = "force-static";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website", url: lessonUrl, images: [] },
  twitter: { card: "summary", title, description, images: [] },
};

export default function A2Lesson02Page() {
  return <A2Lesson02Client />;
}
