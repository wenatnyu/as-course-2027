import type { Metadata } from "next";
import Lesson05Client from "./lesson-05-client";

const title = "AS Computer Science · Lesson 05";
const description = "A 90-minute Cambridge 9618 lesson on vector graphics, bitmap file-size calculations and digital sound representation.";
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wenatnyu.github.io/as-course-2027/";
const siteUrl = configuredSiteUrl.endsWith("/") ? configuredSiteUrl : `${configuredSiteUrl}/`;
const lessonUrl = new URL("lesson-05/", siteUrl).toString();

export const dynamic = "force-static";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website", url: lessonUrl, images: [] },
  twitter: { card: "summary", title, description, images: [] },
};

export default function Lesson05Page() {
  return <Lesson05Client />;
}
