import type { Metadata } from "next";
import Lesson04Client from "./lesson-04-client";

const title = "AS Computer Science · Lesson 04";
const description = "A 90-minute Cambridge 9618 lesson on character sets, ASCII, Unicode and bitmap image representation.";
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wenatnyu.github.io/as-course-2027/";
const siteUrl = configuredSiteUrl.endsWith("/") ? configuredSiteUrl : `${configuredSiteUrl}/`;
const lessonUrl = new URL("lesson-04/", siteUrl).toString();

export const dynamic = "force-static";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website", url: lessonUrl, images: [] },
  twitter: { card: "summary", title, description, images: [] },
};

export default function Lesson04Page() {
  return <Lesson04Client />;
}
