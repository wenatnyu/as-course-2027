type TextbookReaderProps = {
  lesson: "10" | "11";
  chapter: number;
  title: string;
  firstPrintedPage: number;
  lastPrintedPage: number;
  pageCount: number;
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function TextbookReader({ lesson, chapter, title, firstPrintedPage, lastPrintedPage, pageCount }: TextbookReaderProps) {
  const asset = (path: string) => `${basePath}${path}`;

  return (
    <main className="textbook-reader">
      <header className="textbook-bar">
        <a href={asset(`/lesson-${lesson}/`)}><b>CS</b><span>Cambridge 9618<br />Lesson {lesson}</span></a>
        <nav><a href={asset(`/lesson-${lesson}/`)}>Back to lesson</a><a href={asset(`/notes/chapters/#as-${chapter}`)}>Chapter {chapter} notes</a><a href={asset("/course-progress/")}>Progress</a></nav>
      </header>

      <section className="textbook-hero">
        <div><span>COURSEBOOK READING · LESSON {lesson}</span><h1>{title}</h1><p>Chapter {chapter} · printed pages {firstPrintedPage}–{lastPrintedPage}</p></div>
        <a href={asset(`/textbook/lesson-${lesson}.pdf`)} target="_blank" rel="noreferrer">Open / download PDF</a>
      </section>

      <section className="textbook-pages" aria-label={`Lesson ${lesson} coursebook reading`}>
        <div className="textbook-reading-note"><b>READ IN ORDER</b><span>{pageCount} original coursebook pages · page numbers are preserved</span></div>
        {Array.from({ length: pageCount }, (_, index) => index + 1).map((page) => (
          <figure key={page}>
            <img
              src={asset(`/textbook/rendered/lesson-${lesson}/page-${String(page).padStart(2, "0")}.webp`)}
              alt={`Lesson ${lesson} coursebook extract, page ${page} of ${pageCount}`}
              loading={page === 1 ? "eager" : "lazy"}
            />
            <figcaption>Lesson {lesson} · coursebook printed p.{firstPrintedPage + page - 1}</figcaption>
          </figure>
        ))}
      </section>

      <footer><b>CLASSROOM USE</b><p>This is a limited extract from the coursebook supplied by the teacher, shown for authorised classroom reading. Copyright and original page design remain with the publisher. Do not redistribute these files.</p></footer>
    </main>
  );
}
