import type { Metadata } from "next";
import Lesson13Client from "./lesson-13-client";

const title = "AS Computer Science · Lesson 13";
const description = "A 90-minute Cambridge 9618 lesson on the operation of printers, audio devices, storage devices, touchscreens and VR headsets.";
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wenatnyu.github.io/as-course-2027/";
const siteUrl = configuredSiteUrl.endsWith("/") ? configuredSiteUrl : `${configuredSiteUrl}/`;
const lessonUrl = new URL("lesson-13/", siteUrl).toString();

export const dynamic = "force-static";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website", url: lessonUrl, images: [] },
  twitter: { card: "summary", title, description, images: [] },
};

export default function Lesson13Page() {
  return <Lesson13Client />;
}
