import type { Metadata } from "next";
import "../../a2-lessons.css";
import "../a2-data-representation.css";
import "../a2-advanced-theory.css";
import A2Lesson28Client from "./a2-lesson-28-client";

const title = "A2 Computer Science · Lesson 28";
const description = "A 90-minute Cambridge 9618 Paper 3 lesson on low-level, imperative, object-oriented and declarative programming paradigms.";
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wenatnyu.github.io/as-course-2027/";
const siteUrl = configuredSiteUrl.endsWith("/") ? configuredSiteUrl : `${configuredSiteUrl}/`;
const lessonUrl = new URL("a2/lesson-28/", siteUrl).toString();
export const dynamic = "force-static";
export const metadata: Metadata = { title, description, openGraph: { title, description, type: "website", url: lessonUrl, images: [] }, twitter: { card: "summary", title, description, images: [] } };
export default function A2Lesson28Page() { return <A2Lesson28Client />; }
