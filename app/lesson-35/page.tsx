import type { Metadata } from "next";
import "../security-ethics-lessons.css";
import Lesson35Client from "./lesson-35-client";

const title = "AS Computer Science · Lesson 35";
const description = "A 90-minute Cambridge 9618 lesson on AI applications and social, economic and environmental impacts.";
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wenatnyu.github.io/as-course-2027/";
const siteUrl = configuredSiteUrl.endsWith("/") ? configuredSiteUrl : `${configuredSiteUrl}/`;
const lessonUrl = new URL("lesson-35/", siteUrl).toString();

export const dynamic = "force-static";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website", url: lessonUrl, images: [] },
  twitter: { card: "summary", title, description, images: [] },
};

export default function Lesson35Page() {
  return <Lesson35Client />;
}
