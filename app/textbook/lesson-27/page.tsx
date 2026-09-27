import type { Metadata } from "next";
import { TextbookReader } from "../../_components/textbook-reader";

export const metadata: Metadata = { title: "Lesson 27 coursebook · Cambridge 9618" };

export default function Lesson27TextbookPage() {
  return <TextbookReader lesson="27" />;
}
