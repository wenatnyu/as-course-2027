import type { Metadata } from "next";
import "../system-software-lessons.css";
import Lesson25Client from "./lesson-25-client";

const title = "AS Computer Science · Lesson 25";
const description = "A 90-minute Cambridge 9618 lesson on why operating systems are needed and their five key management tasks.";
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wenatnyu.github.io/as-course-2027/";
const siteUrl = configuredSiteUrl.endsWith("/") ? configuredSiteUrl : `${configuredSiteUrl}/`;
const lessonUrl = new URL("lesson-25/", siteUrl).toString();

export const dynamic = "force-static";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website", url: lessonUrl, images: [] },
  twitter: { card: "summary", title, description, images: [] },
};

export default function Lesson25Page() {
  return <Lesson25Client />;
}
