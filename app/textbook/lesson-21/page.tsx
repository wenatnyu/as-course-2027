import type { Metadata } from "next";
import { TextbookReader } from "../../_components/textbook-reader";

export const metadata: Metadata = { title: "Lesson 21 coursebook · Cambridge 9618" };

export default function Lesson21TextbookPage() {
  return <TextbookReader lesson="21" />;
}
