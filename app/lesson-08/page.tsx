import type { Metadata } from "next";
import "../chapter2-lessons.css";
import Lesson08Client from "./lesson-08-client";

const title = "AS Computer Science · Lesson 08";
const description = "A 90-minute Cambridge 9618 lesson on cloud computing, wired and wireless networks, and transmission media.";
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wenatnyu.github.io/as-course-2027/";
const siteUrl = configuredSiteUrl.endsWith("/") ? configuredSiteUrl : `${configuredSiteUrl}/`;
const lessonUrl = new URL("lesson-08/", siteUrl).toString();

export const dynamic = "force-static";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website", url: lessonUrl, images: [] },
  twitter: { card: "summary", title, description, images: [] },
};

export default function Lesson08Page() {
  return <Lesson08Client />;
}
