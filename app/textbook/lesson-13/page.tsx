import type { Metadata } from "next";
import { TextbookReader } from "../../_components/textbook-reader";

export const metadata: Metadata = { title: "Lesson 13 coursebook · Cambridge 9618" };

export default function Lesson13TextbookPage() {
  return <TextbookReader lesson="13" />;
}
