import type { Metadata } from "next";
import { TextbookReader } from "../../_components/textbook-reader";

export const metadata: Metadata = { title: "Lesson 31 coursebook · Cambridge 9618" };

export default function Lesson31TextbookPage() { return <TextbookReader lesson="31" />; }
