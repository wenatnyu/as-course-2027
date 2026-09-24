import type { Metadata } from "next";
import { TextbookReader } from "../../_components/textbook-reader";

export const metadata: Metadata = { title: "Lesson 12 coursebook · Cambridge 9618" };

export default function Lesson12TextbookPage() {
  return <TextbookReader lesson="12" />;
}
