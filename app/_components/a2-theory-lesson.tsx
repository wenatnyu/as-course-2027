"use client";

import type { CSSProperties, ReactNode } from "react";
import { ExamReveal } from "./exam-reveal";
import {
  HomeworkSheet,
  LessonShell,
  type HomeworkSection,
  type SlideData,
} from "./lesson-shell";
import { A2_PREVIEW_CATALOG, buildA2LessonLinks } from "../_data/a2-course";

type Card = {
  eyebrow: string;
  title: ReactNode;
  body?: ReactNode;
  code?: ReactNode;
};

export function ConceptCards({ items, columns = 3 }: { items: Card[]; columns?: 2 | 3 | 4 }) {
  return (
    <section className={`a2-dr-cards columns-${columns}`}>
      {items.map((item, index) => (
        <article key={`${item.eyebrow}-${index}`}>
          <span>{item.eyebrow}</span>
          <b>{item.title}</b>
          {item.body && <p>{item.body}</p>}
          {item.code && <code>{item.code}</code>}
        </article>
      ))}
    </section>
  );
}

export function FlowStrip({ steps }: { steps: Card[] }) {
  return (
    <section className="a2-dr-flow">
      {steps.map((step, index) => (
        <div className="a2-dr-flow-step" key={`${step.eyebrow}-${index}`}>
          <article><span>{step.eyebrow}</span><b>{step.title}</b>{step.body && <p>{step.body}</p>}{step.code && <code>{step.code}</code>}</article>
          {index < steps.length - 1 && <i aria-hidden="true">→</i>}
        </div>
      ))}
    </section>
  );
}

export function CompareTable({
  headers,
  rows,
  caption,
}: {
  headers: ReactNode[];
  rows: ReactNode[][];
  caption?: ReactNode;
}) {
  return (
    <section className="a2-dr-table-wrap">
      {caption && <p className="a2-dr-table-caption">{caption}</p>}
      <table className="a2-dr-table">
        <thead><tr>{headers.map((header, index) => <th key={index}>{header}</th>)}</tr></thead>
        <tbody>{rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody>
      </table>
    </section>
  );
}

export function BitRegister({
  mantissa,
  exponent,
  mantissaLabel = "MANTISSA",
  exponentLabel = "EXPONENT",
}: {
  mantissa: string;
  exponent: string;
  mantissaLabel?: string;
  exponentLabel?: string;
}) {
  return (
    <section className="a2-dr-register" aria-label={`${mantissaLabel} ${mantissa}; ${exponentLabel} ${exponent}`}>
      <div><b>{mantissaLabel}</b><div className="a2-dr-bits mantissa">{mantissa.split("").map((bit, index) => <span key={index}>{bit}</span>)}</div></div>
      <div><b>{exponentLabel}</b><div className="a2-dr-bits">{exponent.split("").map((bit, index) => <span key={index}>{bit}</span>)}</div></div>
    </section>
  );
}

export function HashSlots({
  slots,
}: {
  slots: Array<{ address: number | string; value?: string; state?: "home" | "collision" | "probe" }>;
}) {
  return (
    <section className="a2-dr-slots" aria-label="File locations">
      {slots.map((slot) => (
        <article className={slot.state ?? ""} key={slot.address}>
          <span>{slot.address}</span><b>{slot.value ?? "—"}</b>
        </article>
      ))}
    </section>
  );
}

export function WorkedBoard({ label, children, result }: { label: string; children: ReactNode; result?: ReactNode }) {
  return (
    <section className="a2-dr-worked">
      <span>{label}</span>
      <div>{children}</div>
      {result && <strong>{result}</strong>}
    </section>
  );
}

export function ExamPractice({
  reference,
  marks,
  prompt,
  answer,
}: {
  reference: string;
  marks: number;
  prompt: ReactNode;
  answer: ReactNode;
}) {
  return (
    <section className="a2-dr-exam">
      <div><span>{reference}</span><b>{marks} MARKS</b></div>
      <section>{prompt}</section>
      <ExamReveal>{answer}</ExamReveal>
      <small>Concise classroom adaptation; original paper and mark scheme remain Cambridge copyright.</small>
    </section>
  );
}

export function Formula({ children }: { children: ReactNode }) {
  return <div className="a2-dr-formula">{children}</div>;
}

export function BinaryPointScale({ labels }: { labels: string[] }) {
  return (
    <div className="a2-dr-scale" style={{ "--scale-count": labels.length } as CSSProperties}>
      {labels.map((label, index) => <span key={`${label}-${index}`}>{label}</span>)}
    </div>
  );
}

export function A2TheoryLesson({
  lessonNumber,
  title,
  syllabusLabel,
  sourceLabel,
  slides,
  homeworkSections,
  sourceSummary,
  sourceDetail,
  additionalSourceLinks = [],
}: {
  lessonNumber: string;
  title: string;
  syllabusLabel: string;
  sourceLabel: string;
  slides: SlideData[];
  homeworkSections: HomeworkSection[];
  sourceSummary: string;
  sourceDetail: string;
  additionalSourceLinks?: { href: string; label: string }[];
}) {
  return (
    <LessonShell
      lessonNumber={lessonNumber}
      slides={slides}
      homework={<HomeworkSheet lessonNumber={lessonNumber} title={title} marks={30} minutes={45} sourceLabel={sourceLabel} syllabusLabel={syllabusLabel} qualificationLabel="A LEVEL COMPUTER SCIENCE · 9618" instructions="Answer all questions. Show working for calculations and use precise Cambridge terminology. Each mark scheme is beside its question online; answers stay hidden on the printed student copy unless revealed before printing." sections={homeworkSections} />}
      lessonLinks={buildA2LessonLinks(lessonNumber)}
      lessonCatalog={A2_PREVIEW_CATALOG}
      courseMapHref="../"
      courseStageLabel="A2 · 2027"
      qualificationLabel="A2 LESSON"
      siblingCourseHref="../../"
      siblingCourseLabel="AS"
      examPapersHref="../../exam-papers/"
      sourceSummary={sourceSummary}
      sourceDetail={sourceDetail}
      additionalSourceLinks={additionalSourceLinks}
    />
  );
}
