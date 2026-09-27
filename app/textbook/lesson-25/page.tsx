import type { Metadata } from "next";
import { TextbookReader } from "../../_components/textbook-reader";

export const metadata: Metadata = { title: "Lesson 25 coursebook · Cambridge 9618" };

export default function Lesson25TextbookPage() {
  return <TextbookReader lesson="25" />;
}
