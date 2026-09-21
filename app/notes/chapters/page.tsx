import type { Metadata } from "next";
import ChapterLibrary from "./chapter-library";
import "./chapter-notes.css";

const title = "Chapter Notes · Cambridge 9618";
const description = "Chapter-level AS and A2 theory and practical notes, mapped to every lesson in the Cambridge 9618 course.";

export const dynamic = "force-static";
export const metadata: Metadata = { title, description };

export default function ChapterNotesPage() {
  return <ChapterLibrary />;
}
