import type { Metadata } from "next";
import { TextbookReader } from "../../_components/textbook-reader";

export const metadata: Metadata = { title: "Lesson 01 coursebook · Cambridge 9618" };

export default function Lesson01TextbookPage() {
  return <TextbookReader lesson="01" />;
}
