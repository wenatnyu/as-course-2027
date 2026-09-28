import { formatPrintedPages, getA2TextbookResource, getTextbookResource } from "../_data/textbook-resources";

type TextbookReaderProps = { lesson: string; stage?: "AS" | "A2" };

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function TextbookReader({ lesson, stage = "AS" }: TextbookReaderProps) {
  const asset = (path: string) => `${basePath}${path}`;
  const resource = stage === "A2" ? getA2TextbookResource(lesson) : getTextbookResource(lesson);
  if (!resource) return null;
  const { chapter, title, printedPages } = resource;
  const lessonHref = stage === "A2"
    ? asset(`/a2/lesson-${lesson}/`)
    : lesson === "01" ? asset("/") : asset(`/lesson-${lesson}/`);
  const resourcePrefix = stage === "A2" ? "/textbook/a2" : "/textbook";
  const renderPrefix = stage === "A2" ? "/textbook/rendered/a2" : "/textbook/rendered";
  const noteAnchor = stage === "A2" ? `a2-${chapter}` : `as-${chapter}`;

  return (
    <main className="textbook-reader">
      <header className="textbook-bar">
        <a href={lessonHref}><b>CS</b><span>Cambridge 9618<br />{stage} Lesson {lesson}</span></a>
        <nav><a href={lessonHref}>Back to lesson</a><a href={asset(`/notes/chapters/#${noteAnchor}`)}>Chapter {chapter} notes</a><a href={asset("/course-progress/")}>Progress</a></nav>
      </header>

      <section className="textbook-hero">
        <div><span>COURSEBOOK READING · {stage} LESSON {lesson}</span><h1>{title}</h1><p>Chapter {chapter} · printed pages {formatPrintedPages(printedPages)}</p></div>
        <a href={asset(`${resourcePrefix}/lesson-${lesson}.pdf`)} target="_blank" rel="noreferrer">Open / download PDF</a>
      </section>

      <section className="textbook-pages" aria-label={`Lesson ${lesson} coursebook reading`}>
        <div className="textbook-reading-note"><b>READ IN ORDER</b><span>{printedPages.length} original coursebook pages · page numbers are preserved</span></div>
        {printedPages.map((printedPage, index) => (
          <figure key={`${printedPage}-${index}`}>
            <img
              src={asset(`${renderPrefix}/lesson-${lesson}/page-${String(index + 1).padStart(2, "0")}.webp`)}
              alt={`Lesson ${lesson} coursebook extract, printed page ${printedPage}`}
              loading={index === 0 ? "eager" : "lazy"}
            />
            <figcaption>Lesson {lesson} · coursebook printed p.{printedPage}</figcaption>
          </figure>
        ))}
      </section>

      <footer><b>CLASSROOM USE</b><p>This is a limited extract from the coursebook supplied by the teacher, shown for authorised classroom reading. Copyright and original page design remain with the publisher. Do not redistribute these files.</p></footer>
    </main>
  );
}
