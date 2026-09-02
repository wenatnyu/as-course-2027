import type { Metadata } from "next";
import "../chapter2-lessons.css";
import Lesson10Client from "./lesson-10-client";

const title = "AS Computer Science · Lesson 10";
const description = "A 90-minute Cambridge 9618 lesson on IPv4, IPv6, subnetting, public and private addressing, URLs and DNS.";
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wenatnyu.github.io/as-course-2027/";
const siteUrl = configuredSiteUrl.endsWith("/") ? configuredSiteUrl : `${configuredSiteUrl}/`;
const lessonUrl = new URL("lesson-10/", siteUrl).toString();

export const dynamic = "force-static";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website", url: lessonUrl, images: [] },
  twitter: { card: "summary", title, description, images: [] },
};

export default function Lesson10Page() {
  return <Lesson10Client />;
}
