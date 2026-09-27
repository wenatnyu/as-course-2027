import type { Metadata } from "next";
import { TextbookReader } from "../../_components/textbook-reader";

export const metadata: Metadata = { title: "Lesson 49 coursebook · Cambridge 9618" };

export default function Lesson49TextbookPage() { return <TextbookReader lesson="49" />; }
