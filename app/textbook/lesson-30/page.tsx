import type { Metadata } from "next";
import { TextbookReader } from "../../_components/textbook-reader";

export const metadata: Metadata = { title: "Lesson 30 coursebook · Cambridge 9618" };

export default function Lesson30TextbookPage() { return <TextbookReader lesson="30" />; }
