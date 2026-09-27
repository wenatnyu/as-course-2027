import type { Metadata } from "next";
import { TextbookReader } from "../../_components/textbook-reader";

export const metadata: Metadata = { title: "Lesson 44 coursebook · Cambridge 9618" };

export default function Lesson44TextbookPage() { return <TextbookReader lesson="44" />; }
