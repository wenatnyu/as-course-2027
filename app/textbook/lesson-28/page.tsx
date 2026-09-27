import type { Metadata } from "next";
import { TextbookReader } from "../../_components/textbook-reader";

export const metadata: Metadata = { title: "Lesson 28 coursebook · Cambridge 9618" };

export default function Lesson28TextbookPage() {
  return <TextbookReader lesson="28" />;
}
