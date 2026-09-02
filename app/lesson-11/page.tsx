import type { Metadata } from "next";
import Lesson11Client from "./lesson-11-client";

const title = "AS Computer Science · Lesson 11";
const description = "A 90-minute Cambridge 9618 lesson on hardware roles, storage categories, embedded systems and buffers.";
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wenatnyu.github.io/as-course-2027/";
const siteUrl = configuredSiteUrl.endsWith("/") ? configuredSiteUrl : `${configuredSiteUrl}/`;
const lessonUrl = new URL("lesson-11/", siteUrl).toString();

export const dynamic = "force-static";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website", url: lessonUrl, images: [] },
  twitter: { card: "summary", title, description, images: [] },
};

export default function Lesson11Page() {
  return <Lesson11Client />;
}
