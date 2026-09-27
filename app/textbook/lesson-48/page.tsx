import type { Metadata } from "next";
import { TextbookReader } from "../../_components/textbook-reader";

export const metadata: Metadata = { title: "Lesson 48 coursebook · Cambridge 9618" };

export default function Lesson48TextbookPage() { return <TextbookReader lesson="48" />; }
