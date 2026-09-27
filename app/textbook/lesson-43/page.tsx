import type { Metadata } from "next";
import { TextbookReader } from "../../_components/textbook-reader";

export const metadata: Metadata = { title: "Lesson 43 coursebook · Cambridge 9618" };

export default function Lesson43TextbookPage() { return <TextbookReader lesson="43" />; }
