import type { Metadata } from "next";
import "../security-ethics-lessons.css";
import Lesson29Client from "./lesson-29-client";

const title = "AS Computer Science · Lesson 29";
const description = "A 90-minute Cambridge 9618 lesson on security, privacy, integrity and internet threats.";
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wenatnyu.github.io/as-course-2027/";
const siteUrl = configuredSiteUrl.endsWith("/") ? configuredSiteUrl : `${configuredSiteUrl}/`;
const lessonUrl = new URL("lesson-29/", siteUrl).toString();

export const dynamic = "force-static";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website", url: lessonUrl, images: [] },
  twitter: { card: "summary", title, description, images: [] },
};

export default function Lesson29Page() {
  return <Lesson29Client />;
}
