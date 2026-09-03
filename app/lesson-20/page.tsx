import type { Metadata } from "next";
import "../processor-core-lessons.css";
import Lesson20Client from "./lesson-20-client";

const title = "AS Computer Science · Lesson 20";
const description = "A 90-minute Cambridge 9618 lesson on assembly language, machine code, instruction structure and instruction groups.";
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wenatnyu.github.io/as-course-2027/";
const siteUrl = configuredSiteUrl.endsWith("/") ? configuredSiteUrl : `${configuredSiteUrl}/`;
const lessonUrl = new URL("lesson-20/", siteUrl).toString();

export const dynamic = "force-static";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website", url: lessonUrl, images: [] },
  twitter: { card: "summary", title, description, images: [] },
};

export default function Lesson20Page() {
  return <Lesson20Client />;
}
