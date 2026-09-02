import type { Metadata } from "next";
import Lesson14Client from "./lesson-14-client";

const title = "AS Computer Science · Lesson 14";
const description = "A 90-minute Cambridge 9618 lesson on monitoring and control systems, sensors, actuators and feedback.";
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wenatnyu.github.io/as-course-2027/";
const siteUrl = configuredSiteUrl.endsWith("/") ? configuredSiteUrl : `${configuredSiteUrl}/`;
const lessonUrl = new URL("lesson-14/", siteUrl).toString();

export const dynamic = "force-static";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website", url: lessonUrl, images: [] },
  twitter: { card: "summary", title, description, images: [] },
};

export default function Lesson14Page() {
  return <Lesson14Client />;
}
