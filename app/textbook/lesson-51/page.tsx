import type { Metadata } from "next";
import { TextbookReader } from "../../_components/textbook-reader";

export const metadata: Metadata = { title: "Lesson 51 coursebook · Cambridge 9618" };

export default function Lesson51TextbookPage() { return <TextbookReader lesson="51" />; }
