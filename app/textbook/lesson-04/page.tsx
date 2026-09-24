import type { Metadata } from "next";
import { TextbookReader } from "../../_components/textbook-reader";

export const metadata: Metadata = { title: "Lesson 04 coursebook · Cambridge 9618" };

export default function Lesson04TextbookPage() {
  return <TextbookReader lesson="04" />;
}
