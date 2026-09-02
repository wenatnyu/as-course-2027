"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";

export type SlideData = {
  time: string;
  focus: string;
  prompt: string;
  source: string;
  content: ReactNode;
};

export type LessonLink = {
  label: string;
  href: string;
  active?: boolean;
};

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
] as const;

export function LessonSwitcher({
  lessonNumber,
  root = false,
  links,
}: {
  lessonNumber: string;
  root?: boolean;
  links?: LessonLink[];
}) {
  const prefix = root ? "./" : "../";
  const generatedLinks = COURSE_LESSONS.map(([number]) => ({
    label: number,
    href: number === "01" ? prefix : `${prefix}lesson-${number}/`,
    active: number === lessonNumber,
  }));
  const navigationLinks = links?.length === COURSE_LESSONS.length ? links : generatedLinks;

  return (
    <>
      <div className="lesson-switcher" aria-label="Lesson navigation">
        {navigationLinks.map((link) => <a className={link.active ? "active" : ""} href={link.href} aria-current={link.active ? "page" : undefined} title={COURSE_LESSONS.find(([number]) => number === link.label)?.[1]} key={link.label}>{link.label}</a>)}
      </div>
      <label className="lesson-picker">
        <span>Lesson</span>
        <select
          aria-label="Choose lesson"
          value={navigationLinks.find((link) => link.active)?.href ?? navigationLinks[0].href}
          onChange={(event) => window.location.assign(event.currentTarget.value)}
        >
          {navigationLinks.map((link) => {
            const title = COURSE_LESSONS.find(([number]) => number === link.label)?.[1] ?? "Lesson";
            return <option value={link.href} key={link.label}>{link.label} · {title}</option>;
          })}
        </select>
      </label>
    </>
  );
}

export type HomeworkQuestion = {
  id: string;
  prompt: ReactNode;
  marks: number;
  lines?: 2 | 3 | 4 | 5;
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
        <div><span>AS COMPUTER SCIENCE · 9618</span><h1>Homework {lessonNumber}</h1><p>{title}</p></div>
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
}: {
  lessonNumber: string;
  slides: SlideData[];
  homework: ReactNode;
  lessonLinks?: LessonLink[];
  courseMapHref: string;
  sourceSummary: string;
  sourceDetail: string;
}) {
  const [view, setView] = useState<"slides" | "homework">("slides");
  const [current, setCurrent] = useState(0);
  const [teacherMode, setTeacherMode] = useState(false);
  const deckRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((next: number) => {
    setCurrent(Math.max(0, Math.min(slides.length - 1, next)));
  }, [slides.length]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (view !== "slides") return;
      const target = event.target instanceof HTMLElement ? event.target : null;
      if (target?.closest("button, a, input, textarea, select, [contenteditable='true']")) return;
      if (["ArrowRight", "PageDown", " "].includes(event.key)) { event.preventDefault(); goTo(current + 1); }
      if (["ArrowLeft", "PageUp"].includes(event.key)) { event.preventDefault(); goTo(current - 1); }
      if (event.key === "Home") goTo(0);
      if (event.key === "End") goTo(slides.length - 1);
      if (event.key.toLowerCase() === "n") setTeacherMode((value) => !value);
      if (event.key.toLowerCase() === "f") deckRef.current?.requestFullscreen?.();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [current, goTo, slides.length, view]);

  return (
    <main className={teacherMode ? "teacher-mode" : "student-mode"}>
      <header className="course-bar">
        <button className="course-brand" onClick={() => { setView("slides"); setCurrent(0); }}><b>CS</b><span>Cambridge 9618<br />AS · 2027</span></button>
        <nav aria-label="Course materials">
          <button className={view === "slides" ? "active" : ""} onClick={() => setView("slides")}>Slides</button>
          <button className={view === "homework" ? "active" : ""} onClick={() => setView("homework")}>Homework</button>
          <a href={courseMapHref}>Course map</a>
        </nav>
        <div className="bar-actions">
          <LessonSwitcher lessonNumber={lessonNumber} links={lessonLinks} />
          {view === "slides" && <button className={teacherMode ? "notes-toggle active" : "notes-toggle"} onClick={() => setTeacherMode(!teacherMode)}>Notes {teacherMode ? "ON" : "OFF"}</button>}
          {view !== "slides" && <button className="print-control" onClick={() => window.print()}>Print / PDF</button>}
        </div>
      </header>

      {view === "slides" && (
        <section className="deck-shell" ref={deckRef}>
          <div className="slide-frame">{slides[current].content}</div>
          <div className="deck-controls">
            <div className="progress-label"><span>{String(current + 1).padStart(2, "0")} / {slides.length}</span><i><b style={{ width: `${(current + 1) / slides.length * 100}%` }} /></i></div>
            <div className="arrow-controls"><button onClick={() => goTo(current - 1)} disabled={current === 0} aria-label="Previous slide">←</button><button onClick={() => goTo(current + 1)} disabled={current === slides.length - 1} aria-label="Next slide">→</button></div>
            <div className="shortcut-line"><button onClick={() => deckRef.current?.requestFullscreen?.()}>Full screen</button><span>← → navigate · F full screen · N notes</span></div>
          </div>
          <aside className="teacher-notes">
            <div><span>TIME</span><b>{slides[current].time}</b></div>
            <div><span>TEACHING FOCUS</span><p>{slides[current].focus}</p></div>
            <div><span>PROMPT</span><p>{slides[current].prompt}</p></div>
            <div><span>SOURCE</span><p>{slides[current].source}</p></div>
          </aside>
        </section>
      )}

      {view === "homework" && homework}

      <footer className="source-footer">
        <div><b>{`LESSON ${lessonNumber} SOURCES`}</b><span>{sourceSummary}</span></div>
        <div className="source-links"><a href="https://www.cambridgeinternational.org/Images/721397-2027-2029-syllabus.pdf" target="_blank" rel="noreferrer">Official syllabus</a><a href="https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/past-papers/" target="_blank" rel="noreferrer">Cambridge past papers</a><a href="https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/published-resources/" target="_blank" rel="noreferrer">Endorsed resources</a></div>
        <p>{sourceDetail}</p>
      </footer>
    </main>
  );
}
