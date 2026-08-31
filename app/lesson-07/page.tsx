import type { Metadata } from "next";
import Lesson07Client from "./lesson-07-client";

const title = "AS Computer Science · Lesson 07";
const description = "A 90-minute Cambridge 9618 lesson on network purposes, LANs and WANs, client models, topologies and LAN hardware.";
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wenatnyu.github.io/as-course-2027/";
const siteUrl = configuredSiteUrl.endsWith("/") ? configuredSiteUrl : `${configuredSiteUrl}/`;
const lessonUrl = new URL("lesson-07/", siteUrl).toString();

export const dynamic = "force-static";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website", url: lessonUrl, images: [] },
  twitter: { card: "summary", title, description, images: [] },
};

export default function Lesson07Page() {
  return <Lesson07Client />;
}
