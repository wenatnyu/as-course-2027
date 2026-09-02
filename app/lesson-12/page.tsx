import type { Metadata } from "next";
import Lesson12Client from "./lesson-12-client";

const title = "AS Computer Science · Lesson 12";
const description = "A 90-minute Cambridge 9618 lesson on RAM, ROM, SRAM, DRAM, PROM, EPROM and EEPROM.";
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wenatnyu.github.io/as-course-2027/";
const siteUrl = configuredSiteUrl.endsWith("/") ? configuredSiteUrl : `${configuredSiteUrl}/`;
const lessonUrl = new URL("lesson-12/", siteUrl).toString();

export const dynamic = "force-static";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website", url: lessonUrl, images: [] },
  twitter: { card: "summary", title, description, images: [] },
};

export default function Lesson12Page() {
  return <Lesson12Client />;
}
