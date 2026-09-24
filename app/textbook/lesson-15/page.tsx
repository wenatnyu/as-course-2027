import type { Metadata } from "next";
import { TextbookReader } from "../../_components/textbook-reader";

export const metadata: Metadata = { title: "Lesson 15 coursebook · Cambridge 9618" };

export default function Lesson15TextbookPage() {
  return <TextbookReader lesson="15" />;
}
