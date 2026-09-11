import type { Metadata } from "next";
import "../../a2-lessons.css";
import A2Lab01Client from "./a2-lab-01-client";

const title = "A2 Computer Science · Python Lab P01";
const description = "A 90-minute Cambridge 9618 Paper 4 Python lab on text files, exception handling and markable evidence.";
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wenatnyu.github.io/as-course-2027/";
const siteUrl = configuredSiteUrl.endsWith("/") ? configuredSiteUrl : `${configuredSiteUrl}/`;
const lessonUrl = new URL("a2/lab-01/", siteUrl).toString();

export const dynamic = "force-static";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website", url: lessonUrl, images: [] },
  twitter: { card: "summary", title, description, images: [] },
};

export default function A2Lab01Page() {
  return <A2Lab01Client />;
}

