import type { Metadata } from "next";
import "../security-ethics-lessons.css";
import Lesson31Client from "./lesson-31-client";

const title = "AS Computer Science · Lesson 31";
const description = "A 90-minute Cambridge 9618 lesson on validation, entry verification and check digits.";
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wenatnyu.github.io/as-course-2027/";
const siteUrl = configuredSiteUrl.endsWith("/") ? configuredSiteUrl : `${configuredSiteUrl}/`;
const lessonUrl = new URL("lesson-31/", siteUrl).toString();

export const dynamic = "force-static";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website", url: lessonUrl, images: [] },
  twitter: { card: "summary", title, description, images: [] },
};

export default function Lesson31Page() {
  return <Lesson31Client />;
}
