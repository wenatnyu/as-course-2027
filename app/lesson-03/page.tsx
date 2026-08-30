import type { Metadata } from "next";
import Lesson03Client from "./lesson-03-client";

const title = "AS Computer Science · Lesson 03";
const description = "A 90-minute Cambridge 9618 lesson on signed binary, complements, binary arithmetic, overflow and BCD.";
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wenatnyu.github.io/as-course-2027/";
const siteUrl = configuredSiteUrl.endsWith("/") ? configuredSiteUrl : `${configuredSiteUrl}/`;
const lessonUrl = new URL("lesson-03/", siteUrl).toString();

export const dynamic = "force-static";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website", url: lessonUrl, images: [] },
  twitter: { card: "summary", title, description, images: [] },
};

export default function Lesson03Page() {
  return <Lesson03Client />;
}
