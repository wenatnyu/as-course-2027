"use client";

import { useEffect, useMemo, useState } from "react";
import { A2_CHAPTERS, AS_CHAPTERS, type ChapterResource } from "../../_data/chapter-resources";

const allChapters = [...AS_CHAPTERS, ...A2_CHAPTERS];
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function siteHref(href: string) {
  return href.startsWith("/") ? `${basePath}${href}` : href;
}

function chapterHash(chapter: ChapterResource) {
  return `${chapter.stage.toLowerCase()}-${chapter.number}`;
}

function lessonHref(chapter: ChapterResource, lesson: string) {
  if (chapter.stage === "AS") return lesson === "01" ? "../../" : `../../lesson-${lesson}/`;
  return `../../a2/lesson-${lesson}/`;
}

function renderedPageHref(chapter: ChapterResource, page: number) {
  const base = chapter.pdfHref?.replace("/notes/", "/notes/rendered/").replace(/\.pdf$/, "");
  return siteHref(`${base}/page-${String(page).padStart(2, "0")}.webp`);
}

function ChapterButton({ chapter, selected, onSelect }: { chapter: ChapterResource; selected: boolean; onSelect: (chapter: ChapterResource) => void }) {
  return (
    <a className={selected ? "selected" : ""} href={`#${chapterHash(chapter)}`} onClick={() => onSelect(chapter)} aria-current={selected ? "page" : undefined}>
      <b>{chapter.number}</b><span>{chapter.title}</span><small>L{chapter.lessonStart}–{chapter.lessonEnd}</small>
    </a>
  );
}

export default function ChapterLibrary() {
  const [selected, setSelected] = useState<ChapterResource>(AS_CHAPTERS[0]);

  useEffect(() => {
    const selectFromHash = () => {
      const hash = window.location.hash.slice(1).toLowerCase();
      const match = allChapters.find((chapter) => chapterHash(chapter) === hash);
      if (match) setSelected(match);
    };
    selectFromHash();
    window.addEventListener("hashchange", selectFromHash);
    return () => window.removeEventListener("hashchange", selectFromHash);
  }, []);

  const status = useMemo(() => selected.pdfHref ? "PDF READY" : "ONLINE NOTE", [selected]);

  return (
    <main className="chapter-library">
      <header className="chapter-library-bar">
        <a href="../../"><b>CS</b><span>Cambridge 9618<br />Chapter notes</span></a>
        <nav><a href="../../">AS course</a><a href="../../a2/">A2 course</a><a href="../../course-progress/">Progress</a></nav>
      </header>

      <section className="chapter-library-head">
        <div><span>AS + A2 · CHAPTER RESOURCE LIBRARY</span><h1>One chapter.<br />One complete note.</h1></div>
        <p>Choose the chapter, then read the supplied note here or open it as a PDF. Lesson ranges match the course navigation, so Chapter 2 ends with Lesson 10.</p>
      </section>

      <div className="chapter-library-layout">
        <aside className="chapter-list" aria-label="Choose a chapter">
          <section><h2>AS · Chapters 1–12</h2><div>{AS_CHAPTERS.map((chapter) => <ChapterButton chapter={chapter} selected={selected === chapter} onSelect={setSelected} key={chapter.number} />)}</div></section>
          <section><h2>A2 · Chapters 13–20</h2><div>{A2_CHAPTERS.map((chapter) => <ChapterButton chapter={chapter} selected={selected === chapter} onSelect={setSelected} key={chapter.number} />)}</div></section>
        </aside>

        <article className="chapter-reader" key={chapterHash(selected)}>
          <header>
            <div><span>{selected.stage} · {selected.noteType.toUpperCase()} NOTE</span><h2>Chapter {selected.number}<br /><em>{selected.title}</em></h2></div>
            <div className="chapter-status"><b>{status}</b><span>Lessons {selected.lessonStart}–{selected.lessonEnd}</span></div>
          </header>

          <nav className="chapter-actions" aria-label="Chapter actions">
            <a href={lessonHref(selected, selected.lessonStart)}>Start Lesson {selected.lessonStart}</a>
            <a href={lessonHref(selected, selected.lessonEnd)}>Final lesson {selected.lessonEnd}</a>
            {selected.pdfHref && <a className="primary" href={siteHref(selected.pdfHref)} target="_blank" rel="noreferrer">Open / download PDF</a>}
            {selected.extraHref && <a href={siteHref(selected.extraHref)}>Open visual HTML summary</a>}
          </nav>

          {selected.pdfHref ? (
            <section className="pdf-reader" aria-label={`Chapter ${selected.number} PDF note`}>
              <div className="reader-note"><b>WEB READER</b><span>{selected.pageCount} pages · displayed directly below</span></div>
              {Array.from({ length: selected.pageCount ?? 0 }, (_, index) => index + 1).map((page) => (
                <figure className="note-page" key={page}>
                  <img
                    src={renderedPageHref(selected, page)}
                    alt={`Chapter ${selected.number} note, page ${page} of ${selected.pageCount}`}
                    loading={page === 1 ? "eager" : "lazy"}
                  />
                  <figcaption>Chapter {selected.number} · page {page} of {selected.pageCount}</figcaption>
                </figure>
              ))}
            </section>
          ) : (
            <section className="practical-pending">
              <span>A2 PRACTICAL · CHAPTER {selected.number}</span>
              <h3>The online reference is ready; a licensed PDF has not been supplied yet.</h3>
              <p>Use the ZNotes chapter online for now. The course lessons and Paper 4 practice remain the main teaching sequence; an original printable practical note can be built later from the official syllabus, recent Paper 4 tasks and verified Python examples.</p>
              <a href={selected.externalHref} target="_blank" rel="noreferrer">Open ZNotes {selected.title} ↗</a>
              <div><b>Recommended next step</b><p>Create our own Chapter {selected.number} practical booklet with algorithm templates, executable Python, test evidence and common Paper 4 errors. That avoids relying on a third-party page during class.</p></div>
            </section>
          )}

          <footer>
            <b>RESOURCE USE</b>
            <p>The embedded PDFs are secondary revision notes extracted from the copies supplied by the teacher; they are not the official 2027–2029 syllabus. Original attribution, watermarks and usage notices are preserved. Use the current lesson and syllabus as the authority, keep site access within the authorised school use, and do not redistribute the PDF files.</p>
          </footer>
        </article>
      </div>
    </main>
  );
}
