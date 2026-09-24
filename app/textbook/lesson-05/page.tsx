import type { Metadata } from "next";
import { TextbookReader } from "../../_components/textbook-reader";

export const metadata: Metadata = { title: "Lesson 05 coursebook · Cambridge 9618" };

export default function Lesson05TextbookPage() {
  return <TextbookReader lesson="05" />;
}
