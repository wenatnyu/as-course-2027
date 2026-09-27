import type { Metadata } from "next";
import { TextbookReader } from "../../_components/textbook-reader";

export const metadata: Metadata = { title: "Lesson 37 coursebook · Cambridge 9618" };

export default function Lesson37TextbookPage() { return <TextbookReader lesson="37" />; }
