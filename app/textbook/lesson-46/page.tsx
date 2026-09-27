import type { Metadata } from "next";
import { TextbookReader } from "../../_components/textbook-reader";

export const metadata: Metadata = { title: "Lesson 46 coursebook · Cambridge 9618" };

export default function Lesson46TextbookPage() { return <TextbookReader lesson="46" />; }
