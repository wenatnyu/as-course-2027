import type { Metadata } from "next";
import { TextbookReader } from "../../_components/textbook-reader";

export const metadata: Metadata = { title: "Lesson 11 coursebook · Cambridge 9618" };

export default function Lesson11TextbookPage() {
  return <TextbookReader lesson="11" chapter={3} title="Hardware Roles, Embedded Systems & Storage" firstPrintedPage={50} lastPrintedPage={58} pageCount={9} />;
}
