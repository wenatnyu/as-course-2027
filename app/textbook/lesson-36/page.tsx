import type { Metadata } from "next";
import { TextbookReader } from "../../_components/textbook-reader";

export const metadata: Metadata = { title: "Lesson 36 coursebook · Cambridge 9618" };

export default function Lesson36TextbookPage() { return <TextbookReader lesson="36" />; }
