import type { Metadata } from "next";
import { TextbookReader } from "../../_components/textbook-reader";

export const metadata: Metadata = { title: "Lesson 29 coursebook · Cambridge 9618" };

export default function Lesson29TextbookPage() { return <TextbookReader lesson="29" />; }
