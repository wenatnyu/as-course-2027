import type { Metadata } from "next";
import "../processor-core-lessons.css";
import Lesson17Client from "./lesson-17-client";

const title = "AS Computer Science · Lesson 17";
const description = "A 90-minute Cambridge 9618 lesson on the Von Neumann model, CPU components, the IAS and processor registers.";
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wenatnyu.github.io/as-course-2027/";
const siteUrl = configuredSiteUrl.endsWith("/") ? configuredSiteUrl : `${configuredSiteUrl}/`;
const lessonUrl = new URL("lesson-17/", siteUrl).toString();

export const dynamic = "force-static";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website", url: lessonUrl, images: [] },
  twitter: { card: "summary", title, description, images: [] },
};

export default function Lesson17Page() {
  return <Lesson17Client />;
}
