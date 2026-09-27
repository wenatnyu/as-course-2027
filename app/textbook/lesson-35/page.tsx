import type { Metadata } from "next";
import { TextbookReader } from "../../_components/textbook-reader";

export const metadata: Metadata = { title: "Lesson 35 coursebook · Cambridge 9618" };

export default function Lesson35TextbookPage() { return <TextbookReader lesson="35" />; }
