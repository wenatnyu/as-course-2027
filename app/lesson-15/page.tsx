import type { Metadata } from "next";
import Lesson15Client from "./lesson-15-client";

const title = "AS Computer Science · Lesson 15";
const description = "A 90-minute Cambridge 9618 lesson on six logic gates, their symbols, functions and truth tables.";
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wenatnyu.github.io/as-course-2027/";
const siteUrl = configuredSiteUrl.endsWith("/") ? configuredSiteUrl : `${configuredSiteUrl}/`;
const lessonUrl = new URL("lesson-15/", siteUrl).toString();

export const dynamic = "force-static";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website", url: lessonUrl, images: [] },
  twitter: { card: "summary", title, description, images: [] },
};

export default function Lesson15Page() {
  return <Lesson15Client />;
}
