import type { Metadata } from "next";
import "../database-algorithm-lessons.css";
import Lesson40Client from "./lesson-40-client";

const title = "AS Computer Science · Lesson 40";
const description = "A 90-minute Cambridge 9618 lesson on SQL aggregation, joins and data maintenance.";
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wenatnyu.github.io/as-course-2027/";
const siteUrl = configuredSiteUrl.endsWith("/") ? configuredSiteUrl : `${configuredSiteUrl}/`;
const lessonUrl = new URL("lesson-40/", siteUrl).toString();

export const dynamic = "force-static";
export const metadata: Metadata = { title, description, openGraph: { title, description, type: "website", url: lessonUrl, images: [] }, twitter: { card: "summary", title, description, images: [] } };

export default function Lesson40Page() { return <Lesson40Client />; }
