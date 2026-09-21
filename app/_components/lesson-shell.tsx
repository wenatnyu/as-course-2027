"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { getSyllabusBrief } from "../_data/course-schedule";
import { A2_CHAPTERS, AS_CHAPTERS, getChapterForLesson } from "../_data/chapter-resources";

export type SlideData = {
  time: string;
  focus: string;
  prompt: string;
  source: string;
  core?: boolean;
  content: ReactNode;
};

export type LessonLink = {
  label: string;
  href: string;
  active?: boolean;
};

export type LessonCatalog = ReadonlyArray<readonly [string, string]>;

export const COURSE_LESSONS = [
  ["01", "Number systems"],
  ["02", "Data capacity and prefixes"],
  ["03", "Signed binary, BCD and arithmetic"],
  ["04", "Characters and bitmap graphics"],
  ["05", "Vector graphics and sound"],
  ["06", "Compression"],
  ["07", "Network models and LAN hardware"],
  ["08", "Cloud, wired/wireless and media"],
  ["09", "Ethernet, streaming and internet infrastructure"],
  ["10", "IP addressing, subnetting, URL and DNS"],
  ["11", "Hardware roles, embedded systems and buffers"],
  ["12", "Primary memory and ROM families"],
  ["13", "Storage and peripheral operations"],
  ["14", "Monitoring and control"],
  ["15", "Logic gates and truth tables"],
  ["16", "Logic circuits and expressions"],
  ["17", "Von Neumann architecture and registers"],
  ["18", "System buses, performance and ports"],
  ["19", "Fetch-execute cycle and interrupts"],
  ["20", "Assembly language and instruction groups"],
  ["21", "Addressing modes and effective addresses"],
  ["22", "The two-pass assembler"],
  ["23", "Tracing assembly programs"],
  ["24", "Binary shifts and bit masking"],
  ["25", "Operating systems and management"],
  ["26", "Utilities and program libraries"],
  ["27", "Translators, compilers and interpreters"],
  ["28", "IDE features and Chapter 5 review"],
  ["29", "Security, privacy, integrity and threats"],
  ["30", "Layered security and access control"],
  ["31", "Validation, verification and check digits"],
  ["32", "Parity, checksums and Chapter 6 review"],
  ["33", "Professional ethics, BCS and IEEE"],
  ["34", "Copyright and software licensing"],
  ["35", "AI applications, impacts and Chapter 7 review"],
  ["36", "File-based data, relational databases and keys"],
  ["37", "Relationships, E-R diagrams and normalisation to 2NF"],
  ["38", "Third normal form and DBMS features"],
  ["39", "SQL DDL and core single-table DML"],
  ["40", "SQL aggregation, joins and data maintenance"],
  ["41", "Abstraction and decomposition"],
  ["42", "Algorithm design, identifiers and IPO"],
  ["43", "Logic, control constructs and representations"],
  ["44", "Stepwise refinement and Chapter 9 review"],
  ["45", "Data types and records"],
  ["46", "One-dimensional arrays and linear search"],
  ["47", "Bubble sort"],
  ["48", "Two-dimensional arrays and arrays of records"],
  ["49", "Sequential text files"],
  ["50", "Stacks and queues"],
  ["51", "Linked lists and Chapter 10 review"],
  ["52", "Programming essentials and library routines"],
  ["53", "IF, nested IF and CASE selection"],
  ["54", "Iteration and efficient loops"],
  ["55", "Modules, scope, procedures and functions"],
  ["56", "Parameters, BYVAL and BYREF"],
  ["57", "Program development life cycle"],
  ["58", "Waterfall, iterative and RAD models"],
  ["59", "Structure charts and interfaces"],
  ["60", "Structure charts to code and state diagrams"],
  ["61", "Faults, errors and developer testing"],
  ["62", "Test strategy, test data and release testing"],
  ["63", "Maintenance and complete AS review"],
] as const;

export function LessonSwitcher({
  lessonNumber,
  root = false,
  links,
  lessonCatalog = COURSE_LESSONS,
  stage = "AS",
}: {
  lessonNumber: string;
  root?: boolean;
  links?: LessonLink[];
  lessonCatalog?: LessonCatalog;
  stage?: "AS" | "A2";
}) {
  const prefix = root ? "./" : "../";
  const generatedLinks = lessonCatalog.map(([number]) => ({
    label: number,
    href: number === "01" ? prefix : `${prefix}lesson-${number}/`,
    active: number === lessonNumber,
  }));
  const navigationLinks = links?.length === lessonCatalog.length ? links : generatedLinks;
  const chapters = stage === "AS" ? AS_CHAPTERS : A2_CHAPTERS;
  const currentChapter = getChapterForLesson(stage, lessonNumber);
  const chapterHref = currentChapter
    ? stage === "A2"
      ? `../../notes/chapters/#a2-${currentChapter.number}`
      : `${root ? "./" : "../"}notes/chapters/#as-${currentChapter.number}`
    : null;

  return (
    <>
      <div className="lesson-switcher" aria-label="Lesson navigation">
        {navigationLinks.map((link) => <a className={link.active ? "active" : ""} href={link.href} aria-current={link.active ? "page" : undefined} title={lessonCatalog.find(([number]) => number === link.label)?.[1]} key={link.label}>{link.label}</a>)}
      </div>
      <div className="lesson-nav-stack">
        {currentChapter && chapterHref && <a className="chapter-chip" href={chapterHref}><span>CH</span><b>{currentChapter.number}</b><small>{currentChapter.title}</small><em>Notes</em></a>}
        <label className="lesson-picker">
          <span>Lesson</span>
        <select
          aria-label="Choose lesson"
          value={navigationLinks.find((link) => link.active)?.href ?? navigationLinks[0].href}
          onChange={(event) => window.location.assign(event.currentTarget.value)}
        >
          {chapters.map((chapter) => {
            const start = Number.parseInt(chapter.lessonStart, 10);
            const end = Number.parseInt(chapter.lessonEnd, 10);
            const chapterLinks = navigationLinks.filter((link) => {
              if (link.label === "P01") return stage === "A2" && chapter.number === 20;
              const number = Number.parseInt(link.label, 10);
              return number >= start && number <= end;
            });
            if (!chapterLinks.length) return null;
            return <optgroup label={`Chapter ${chapter.number} · ${chapter.title}`} key={chapter.number}>{chapterLinks.map((link) => {
              const title = lessonCatalog.find(([number]) => number === link.label)?.[1] ?? "Lesson";
              return <option value={link.href} key={link.label}>{link.label} · {title}</option>;
            })}</optgroup>;
          })}
        </select>
        </label>
      </div>
    </>
  );
}

export type HomeworkQuestion = {
  id: string;
  prompt: ReactNode;
  marks: number;
  lines?: 2 | 3 | 4 | 5 | 6 | 7 | 8;
  answer: ReactNode;
};

export type HomeworkSection = {
  code: string;
  title: string;
  subtitle: string;
  marks: number;
  questions: HomeworkQuestion[];
};

export function Mark({ children }: { children: ReactNode }) {
  return <span className="syllabus-mark">{children}</span>;
}

export function InlineAnswer({
  id,
  visible,
  onToggle,
  children,
}: {
  id: string;
  visible: boolean;
  onToggle: (id: string) => void;
  children: ReactNode;
}) {
  const panelId = `homework-answer-${id}`;

  return (
    <div className="inline-answer-wrap">
      <button
        type="button"
        className="inline-answer-toggle"
        aria-expanded={visible}
        aria-controls={panelId}
        onClick={() => onToggle(id)}
      >
        {visible ? "Hide answer" : "Show answer"}
      </button>
      <aside id={panelId} className={visible ? "inline-answer visible" : "inline-answer"} hidden={!visible}>
        <span>MARK SCHEME</span>
        <div>{children}</div>
      </aside>
    </div>
  );
}

export function Slide({
  number,
  eyebrow,
  sourceLabel,
  syllabusLabel = "SYLLABUS 1.1",
  title,
  className = "",
  children,
}: {
  number: string;
  eyebrow: string;
  sourceLabel: string;
  syllabusLabel?: string;
  title?: ReactNode;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <article className={`lesson-slide ${className}`}>
      <div className="slide-chrome">
        <span>{eyebrow}</span>
        <div className="source-badges"><Mark>{syllabusLabel}</Mark><span className="textbook-mark">{sourceLabel}</span></div>
        <b>{number}</b>
      </div>
      {title && <h2>{title}</h2>}
      {children}
    </article>
  );
}

export function HomeworkSheet({
  lessonNumber,
  title,
  marks,
  minutes,
  sourceLabel,
  syllabusLabel = "SYLLABUS 1.1",
  instructions,
  sections,
  challenge,
  qualificationLabel = "AS COMPUTER SCIENCE · 9618",
}: {
  lessonNumber: string;
  title: string;
  marks: number;
  minutes: number;
  sourceLabel: string;
  syllabusLabel?: string;
  instructions: string;
  sections: HomeworkSection[];
  challenge?: { id: string; prompt: ReactNode; answer: ReactNode };
  qualificationLabel?: string;
}) {
  const answerIds = useMemo(
    () => [...sections.flatMap((section) => section.questions.map((question) => question.id)), ...(challenge ? [challenge.id] : [])],
    [challenge, sections],
  );
  const [revealedAnswers, setRevealedAnswers] = useState<Set<string>>(() => new Set());
  const allAnswersVisible = answerIds.every((id) => revealedAnswers.has(id));
  const sectionStarts = useMemo(
    () => sections.map((_, sectionIndex) => 1 + sections
      .slice(0, sectionIndex)
      .reduce((total, section) => total + section.questions.length, 0)),
    [sections],
  );

  const toggleAnswer = (id: string) => {
    setRevealedAnswers((currentAnswers) => {
      const nextAnswers = new Set(currentAnswers);
      if (nextAnswers.has(id)) nextAnswers.delete(id);
      else nextAnswers.add(id);
      return nextAnswers;
    });
  };

  const toggleAllAnswers = () => {
    setRevealedAnswers(allAnswersVisible ? new Set() : new Set(answerIds));
  };

  return (
    <section className={allAnswersVisible ? "homework-page all-answers-visible" : "homework-page"}>
      <header className="homework-hero">
        <div><span>{qualificationLabel}</span><h1>Homework {lessonNumber}</h1><p>{title}</p></div>
        <div className="homework-stats"><p><b>{marks}</b><span>marks</span></p><p><b>{minutes}</b><span>minutes</span></p><p><b>0</b><span>calculators</span></p></div>
      </header>
      <div className="student-fields"><span>Name __________________________</span><span>Class __________</span><span>Date __________</span></div>
      <div className="homework-instructions">
        <div className="homework-source-badges"><Mark>{syllabusLabel}</Mark><span className="textbook-mark">{sourceLabel}</span></div>
        <p>{instructions}</p>
        <button type="button" onClick={toggleAllAnswers}>{allAnswersVisible ? "Hide all answers" : "Show all answers"}</button>
      </div>

      {sections.map((section, sectionIndex) => {
        return (
          <section className="homework-section" key={section.code}>
            <div className="homework-section__title"><span>{section.code}</span><div><h2>{section.title}</h2><p>{section.subtitle}</p></div><b>{section.marks} marks</b></div>
            <ol className="question-list" start={sectionStarts[sectionIndex]}>
              {section.questions.map((question) => (
                <li key={question.id}>
                  <div className="question-copy">{question.prompt}</div><span>[{question.marks}]</span>
                  <div className={`writing-lines lines-${question.lines ?? 3}`} />
                  <InlineAnswer id={question.id} visible={revealedAnswers.has(question.id)} onToggle={toggleAnswer}>
                    {question.answer}
                  </InlineAnswer>
                </li>
              ))}
            </ol>
          </section>
        );
      })}

      {challenge && (
        <div className="challenge">
          <span>OPTIONAL CHALLENGE</span>
          <div>{challenge.prompt}</div>
          <InlineAnswer id={challenge.id} visible={revealedAnswers.has(challenge.id)} onToggle={toggleAnswer}>
            {challenge.answer}
          </InlineAnswer>
        </div>
      )}
    </section>
  );
}

export function LessonShell({
  lessonNumber,
  slides,
  homework,
  lessonLinks,
  courseMapHref,
  sourceSummary,
  sourceDetail,
  additionalSourceLinks = [],
  lessonCatalog = COURSE_LESSONS,
  courseStageLabel = "AS · 2027",
  qualificationLabel = "LESSON",
  siblingCourseHref = "../a2/",
  siblingCourseLabel = "A2",
  examPapersHref = "../exam-papers/",
  chapterNoteHref,
  chapterNoteLabel = "Chapter note",
}: {
  lessonNumber: string;
  slides: SlideData[];
  homework: ReactNode;
  lessonLinks?: LessonLink[];
  courseMapHref: string;
  sourceSummary: string;
  sourceDetail: string;
  additionalSourceLinks?: { href: string; label: string }[];
  lessonCatalog?: LessonCatalog;
  courseStageLabel?: string;
  qualificationLabel?: string;
  siblingCourseHref?: string;
  siblingCourseLabel?: string;
  examPapersHref?: string;
  chapterNoteHref?: string;
  chapterNoteLabel?: string;
}) {
  const [view, setView] = useState<"slides" | "homework">("slides");
  const [current, setCurrent] = useState(0);
  const [teacherMode, setTeacherMode] = useState(false);
  const [coreOnly, setCoreOnly] = useState(false);
  const deckRef = useRef<HTMLDivElement>(null);
  const stage = courseStageLabel.startsWith("A2") ? "A2" : "AS";
  const syllabusBrief = getSyllabusBrief(stage, lessonNumber);
  const explicitlyPlannedCore = slides.some((slide) => slide.core !== undefined);
  const defaultCoreLimit = stage === "AS" ? Math.min(8, slides.length) : Math.min(10, slides.length);
  const coreSlides = explicitlyPlannedCore ? slides.filter((slide) => slide.core) : slides.slice(0, defaultCoreLimit);
  const visibleSlides = coreOnly ? coreSlides : slides;

  const goTo = useCallback((next: number) => {
    setCurrent(Math.max(0, Math.min(visibleSlides.length - 1, next)));
    if (!document.fullscreenElement) {
      window.requestAnimationFrame(() => deckRef.current?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      }));
    }
  }, [visibleSlides.length]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (view !== "slides") return;
      const target = event.target instanceof HTMLElement ? event.target : null;
      if (target?.closest("button, a, input, textarea, select, [contenteditable='true']")) return;
      if (["ArrowRight", "PageDown", " "].includes(event.key)) { event.preventDefault(); goTo(current + 1); }
      if (["ArrowLeft", "PageUp"].includes(event.key)) { event.preventDefault(); goTo(current - 1); }
      if (event.key === "Home") goTo(0);
      if (event.key === "End") goTo(visibleSlides.length - 1);
      if (event.key.toLowerCase() === "n") setTeacherMode((value) => !value);
      if (event.key.toLowerCase() === "f") deckRef.current?.requestFullscreen?.();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [current, goTo, visibleSlides.length, view]);

  return (
    <main className={teacherMode ? "teacher-mode" : "student-mode"}>
      <header className="course-bar">
        <button className="course-brand" onClick={() => { setView("slides"); setCurrent(0); }}><b>CS</b><span>Cambridge 9618<br />{courseStageLabel}</span></button>
        <nav aria-label="Course materials">
          <button className={view === "slides" ? "active" : ""} aria-pressed={view === "slides"} onClick={() => setView("slides")}>Slides</button>
          <button className={view === "homework" ? "active" : ""} aria-pressed={view === "homework"} onClick={() => setView("homework")}>Homework</button>
          <a href={courseMapHref}>Course map</a>
          <a href={stage === "A2" ? "../../course-progress/" : lessonNumber === "01" ? "course-progress/" : "../course-progress/"}>Progress</a>
          <a href={siblingCourseHref}>{siblingCourseLabel}</a>
          <a href={examPapersHref}>Papers</a>
          {chapterNoteHref && <a className="chapter-note-link" href={chapterNoteHref}>{chapterNoteLabel}</a>}
        </nav>
        <div className="bar-actions">
          <LessonSwitcher lessonNumber={lessonNumber} links={lessonLinks} lessonCatalog={lessonCatalog} stage={stage} />
          {view === "slides" && <button className={teacherMode ? "notes-toggle active" : "notes-toggle"} aria-pressed={teacherMode} onClick={() => setTeacherMode(!teacherMode)}>Notes {teacherMode ? "ON" : "OFF"}</button>}
          {view !== "slides" && <button className="print-control" onClick={() => window.print()}>Print / PDF</button>}
        </div>
      </header>

      {view === "slides" && (
        <section className="deck-shell" ref={deckRef}>
          {syllabusBrief && (
            <section className="syllabus-brief" aria-label="Official syllabus focus">
              <div className="syllabus-brief-copy">
                <span>OFFICIAL SYLLABUS · {syllabusBrief.section}</span>
                <h1>{syllabusBrief.title}</h1>
                <p>{syllabusBrief.outcome}</p>
                <div><b>{stage === "AS" ? "40-minute core" : "Core route"}</b><small>{coreSlides.length} essential slides</small><b>Optional extension</b><small>{Math.max(0, slides.length - coreSlides.length)} slides</small></div>
              </div>
              <figure><img style={{ objectPosition: `center ${syllabusBrief.focus}` }} src={`${stage === "A2" ? "../../" : lessonNumber === "01" ? "" : "../"}syllabus/syllabus-page-${syllabusBrief.page}.png`} alt={`Cambridge 9618 2027-2029 syllabus page ${syllabusBrief.page}, section ${syllabusBrief.section}`} /></figure>
            </section>
          )}
          <div className="route-toolbar"><div><b>{coreOnly ? "CORE ROUTE" : "FULL DECK"}</b><span>{coreOnly ? "Essential teaching sequence" : "Core teaching + optional extension"}</span></div><button type="button" className={coreOnly ? "active" : ""} onClick={() => { setCoreOnly((value) => !value); setCurrent(0); }}>{coreOnly ? "Show extension" : "Core only"}</button></div>
          <div className="slide-frame">{visibleSlides[current].content}</div>
          <div className="deck-controls">
            <div className="progress-label"><span>{String(current + 1).padStart(2, "0")} / {visibleSlides.length}</span><i><b style={{ width: `${(current + 1) / visibleSlides.length * 100}%` }} /></i></div>
            <div className="arrow-controls"><button onClick={() => goTo(current - 1)} disabled={current === 0} aria-label="Previous slide">←</button><button onClick={() => goTo(current + 1)} disabled={current === visibleSlides.length - 1} aria-label="Next slide">→</button></div>
            <div className="shortcut-line"><button onClick={() => deckRef.current?.requestFullscreen?.()}>Full screen</button><span>← → navigate · F full screen · N notes</span></div>
          </div>
          <aside className="teacher-notes">
            <div><span>TIME</span><b>{visibleSlides[current].time}</b></div>
            <div><span>TEACHING FOCUS</span><p>{visibleSlides[current].focus}</p></div>
            <div><span>PROMPT</span><p>{visibleSlides[current].prompt}</p></div>
            <div><span>SOURCE</span><p>{visibleSlides[current].source}</p></div>
          </aside>
        </section>
      )}

      {view === "homework" && homework}

      <footer className="source-footer">
        <div><b>{`${qualificationLabel} ${lessonNumber} SOURCES`}</b><span>{sourceSummary}</span></div>
        <div className="source-links"><a href="https://www.cambridgeinternational.org/Images/721397-2027-2029-syllabus.pdf" target="_blank" rel="noreferrer">Official syllabus</a><a href="https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/past-papers/" target="_blank" rel="noreferrer">Cambridge past papers</a><a href="https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/published-resources/" target="_blank" rel="noreferrer">Endorsed resources</a>{additionalSourceLinks.map((link) => <a href={link.href} target="_blank" rel="noreferrer" key={link.href}>{link.label}</a>)}</div>
        <p>{sourceDetail}</p>
      </footer>
    </main>
  );
}
