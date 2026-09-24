import type { Metadata } from "next";
import { TextbookReader } from "../../_components/textbook-reader";

export const metadata: Metadata = { title: "Lesson 18 coursebook · Cambridge 9618" };

export default function Lesson18TextbookPage() {
  return <TextbookReader lesson="18" />;
}
