import type { Metadata } from "next";
import "../system-software-lessons.css";
import Lesson26Client from "./lesson-26-client";

const title = "AS Computer Science · Lesson 26";
const description = "A 90-minute Cambridge 9618 lesson on utility software, program libraries and dynamic link libraries.";
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wenatnyu.github.io/as-course-2027/";
const siteUrl = configuredSiteUrl.endsWith("/") ? configuredSiteUrl : `${configuredSiteUrl}/`;
const lessonUrl = new URL("lesson-26/", siteUrl).toString();

export const dynamic = "force-static";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website", url: lessonUrl, images: [] },
  twitter: { card: "summary", title, description, images: [] },
};

export default function Lesson26Page() {
  return <Lesson26Client />;
}
