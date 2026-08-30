import type { Metadata } from "next";
import "./globals.css";
import "./lessons.css";

const title = "AS Computer Science · Lesson 01";
const description = "A textbook-led Cambridge 9618 AS Computer Science lesson with classroom slides, inline homework answers and a 32-week course map for 2027.";
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wenatnyu.github.io/as-course-2027/";
const siteUrl = configuredSiteUrl.endsWith("/") ? configuredSiteUrl : `${configuredSiteUrl}/`;
const imageUrl = new URL("og.png", siteUrl).toString();

export const dynamic = "force-static";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    description,
    title,
    type: "website",
    url: siteUrl,
    images: [{ url: imageUrl, width: 1672, height: 941, alt: "How Computers Count: 46 equals 101110 equals 2E" }],
  },
  twitter: { card: "summary_large_image", title, description, images: [imageUrl] },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
