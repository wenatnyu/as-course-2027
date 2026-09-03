import type { Metadata } from "next";
import "../system-software-lessons.css";
import Lesson27Client from "./lesson-27-client";

const title = "AS Computer Science · Lesson 27";
const description = "A 90-minute Cambridge 9618 lesson on assemblers, compilers, interpreters and the Java bytecode model.";
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wenatnyu.github.io/as-course-2027/";
const siteUrl = configuredSiteUrl.endsWith("/") ? configuredSiteUrl : `${configuredSiteUrl}/`;
const lessonUrl = new URL("lesson-27/", siteUrl).toString();

export const dynamic = "force-static";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website", url: lessonUrl, images: [] },
  twitter: { card: "summary", title, description, images: [] },
};

export default function Lesson27Page() {
  return <Lesson27Client />;
}
