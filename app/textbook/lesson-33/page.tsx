import type { Metadata } from "next";
import { TextbookReader } from "../../_components/textbook-reader";

export const metadata: Metadata = { title: "Lesson 33 coursebook · Cambridge 9618" };

export default function Lesson33TextbookPage() { return <TextbookReader lesson="33" />; }
