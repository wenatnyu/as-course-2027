import type { Metadata } from "next";
import "../security-ethics-lessons.css";
import Lesson34Client from "./lesson-34-client";

const title = "AS Computer Science · Lesson 34";
const description = "A 90-minute Cambridge 9618 lesson on copyright and software licensing models.";
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wenatnyu.github.io/as-course-2027/";
const siteUrl = configuredSiteUrl.endsWith("/") ? configuredSiteUrl : `${configuredSiteUrl}/`;
const lessonUrl = new URL("lesson-34/", siteUrl).toString();

export const dynamic = "force-static";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website", url: lessonUrl, images: [] },
  twitter: { card: "summary", title, description, images: [] },
};

export default function Lesson34Page() {
  return <Lesson34Client />;
}
