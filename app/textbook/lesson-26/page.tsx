import type { Metadata } from "next";
import { TextbookReader } from "../../_components/textbook-reader";

export const metadata: Metadata = { title: "Lesson 26 coursebook · Cambridge 9618" };

export default function Lesson26TextbookPage() {
  return <TextbookReader lesson="26" />;
}
