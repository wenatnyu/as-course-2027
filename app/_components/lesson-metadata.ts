import type { Metadata } from "next";

export function lessonMetadata(number: string, description: string): Metadata {
  const title = `AS Computer Science · Lesson ${number}`;
  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wenatnyu.github.io/as-course-2027/";
  const siteUrl = configuredSiteUrl.endsWith("/") ? configuredSiteUrl : `${configuredSiteUrl}/`;
  const lessonUrl = new URL(`lesson-${number}/`, siteUrl).toString();
  return { title, description, openGraph: { title, description, type: "website", url: lessonUrl, images: [] }, twitter: { card: "summary", title, description, images: [] } };
}
