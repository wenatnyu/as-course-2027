"use client";

import { ExamReveal } from "./exam-reveal";
import { HomeworkSheet, LessonShell, Mark, Slide, type HomeworkSection, type SlideData } from "./lesson-shell";

export type PaperTwoCard = { label: string; text: string };
export type PaperTwoRow = { term: string; distinction: string; example: string };
export type PaperTwoQuestion = { prompt: string; answer: string; marks: number; lines?: 2 | 3 | 4 | 5 | 6 | 7 | 8 };
export type PaperTwoPaper = {
  source: string;
  marks: string;
  prompt: string;
  cues: PaperTwoCard[];
  answer: string;
};

export type PaperTwoLessonSpec = {
  lessonNumber: string;
  chapter: "10" | "11" | "12";
  chapterTitle: string;
  title: string;
  tagline: string;
  syllabus: string;
  textbook: string;
  objectives: string[];
  starter: { prompt: string; answer: string };
  concepts: PaperTwoCard[];
  model: { title: string; code: string; note: string };
  worked: { title: string; prompt: string; steps: string[]; answer: string };
  comparison: { title: string; rows: PaperTwoRow[] };
  practice: { title: string; prompt: string; cues: string[]; answer: string };
  pitfalls: string[];
  examMethod: string[];
  papers: [PaperTwoPaper, PaperTwoPaper];
  retrieval: string[];
  exit: string[];
  homework: {
    instructions: string;
    sections: [
      { code: string; title: string; subtitle: string; questions: PaperTwoQuestion[] },
      { code: string; title: string; subtitle: string; questions: PaperTwoQuestion[] },
      { code: string; title: string; subtitle: string; questions: PaperTwoQuestion[] },
    ];
    challenge: { prompt: string; answer: string };
  };
  sourceSummary: string;
  sourceDetail: string;
};

const timings = [4, 5, 5, 5, 6, 6, 5, 6, 6, 6, 6, 7, 7, 8, 8];

function Cards({ cards }: { cards: PaperTwoCard[] }) {
  return <section className={`p2-cards ${cards.length === 4 ? "four" : "three"}`}>{cards.map((card) => <article key={card.label}><span>{card.label}</span><p>{card.text}</p></article>)}</section>;
}

function PaperSlide({ paper, number, syllabus }: { paper: PaperTwoPaper; number: string; syllabus: string }) {
  return <Slide number={number} eyebrow={`PAST PAPER PRACTICE · ${paper.marks}`} sourceLabel={paper.source} syllabusLabel={`SYLLABUS ${syllabus} · PAPER 2`} title={paper.prompt} className="p2-paper"><Cards cards={paper.cues} /><ExamReveal><p>{paper.answer}</p></ExamReveal><small className="p2-source">Concise adaptation checked against the published mark scheme.</small></Slide>;
}

function toHomeworkSections(spec: PaperTwoLessonSpec): HomeworkSection[] {
  return spec.homework.sections.map((section, sectionIndex) => ({
    code: section.code,
    title: section.title,
    subtitle: section.subtitle,
    marks: section.questions.reduce((total, question) => total + question.marks, 0),
    questions: section.questions.map((question, questionIndex) => ({
      id: `l${spec.lessonNumber}-${spec.homework.sections.slice(0, sectionIndex).reduce((total, prior) => total + prior.questions.length, 0) + questionIndex + 1}`,
      prompt: <><b>{question.prompt}</b>{sectionIndex === 2 && questionIndex === 0 ? <p><Mark>PAST PAPER PRACTICE · PAPER 2</Mark></p> : null}</>,
      answer: <p>{question.answer} <em>[{question.marks}]</em></p>,
      marks: question.marks,
      lines: question.lines,
    })),
  })) as HomeworkSection[];
}

export function PaperTwoLesson({ spec }: { spec: PaperTwoLessonSpec }) {
  const [paperA, paperB] = spec.papers;
  const slides: SlideData[] = [
    {
      time: `${timings[0]} min`, focus: `Frame ${spec.title} within syllabus Chapter ${spec.chapter}.`, prompt: "Read the lesson question and ask students to predict the exam action words.", source: `${spec.textbook}; syllabus ${spec.syllabus}.`,
      content: <Slide number="01" eyebrow={`CHAPTER ${spec.chapter} · ${spec.chapterTitle.toUpperCase()}`} sourceLabel={spec.textbook} syllabusLabel={`SYLLABUS ${spec.syllabus}`} className="p2-title"><section className="p2-title-grid"><div><span>LESSON {spec.lessonNumber} · 90 MINUTES · PAPER 2</span><h1>{spec.title}</h1><p>{spec.tagline}</p></div><div className="p2-title-map">{spec.concepts.slice(0, 4).map((item, index) => <article key={item.label}><b>{String(index + 1).padStart(2, "0")}</b><span>{item.label}</span></article>)}</div></section></Slide>,
    },
    {
      time: `${timings[1]} min`, focus: "Make the assessed outcomes explicit before teaching details.", prompt: "Students paraphrase each outcome using an exam command word.", source: `2027–2029 syllabus ${spec.syllabus}.`,
      content: <Slide number="02" eyebrow="SYLLABUS ROUTE" sourceLabel="OFFICIAL 2027–2029 SYLLABUS" syllabusLabel={`SYLLABUS ${spec.syllabus}`} title="By the end, you can…"><section className="p2-objectives">{spec.objectives.map((objective, index) => <article key={objective}><b>{index + 1}</b><p>{objective}</p></article>)}</section></Slide>,
    },
    {
      time: `${timings[2]} min`, focus: "Surface prior knowledge and one likely misconception.", prompt: spec.starter.prompt, source: `${spec.textbook}; diagnostic retrieval.`,
      content: <Slide number="03" eyebrow="DO NOW · RETRIEVAL" sourceLabel={spec.textbook} syllabusLabel={`SYLLABUS ${spec.syllabus}`} title={spec.starter.prompt} className="p2-starter"><div className="p2-thinking"><span>THINK</span><span>PAIR</span><span>JUSTIFY</span></div><ExamReveal><p>{spec.starter.answer}</p></ExamReveal></Slide>,
    },
    {
      time: `${timings[3]} min`, focus: "Secure the first three definitions and their use in context.", prompt: "For each card, add one example and one non-example.", source: spec.textbook,
      content: <Slide number="04" eyebrow="CORE LANGUAGE" sourceLabel={spec.textbook} syllabusLabel={`SYLLABUS ${spec.syllabus}`} title="Three ideas that must stay distinct."><Cards cards={spec.concepts.slice(0, 3)} /></Slide>,
    },
    {
      time: `${timings[4]} min`, focus: "Connect terminology to the decisions or operations students must perform.", prompt: "Ask students to link each idea to a line of pseudocode, diagram or test action.", source: spec.textbook,
      content: <Slide number="05" eyebrow="CORE MODEL" sourceLabel={spec.textbook} syllabusLabel={`SYLLABUS ${spec.syllabus}`} title="From definition to use."><Cards cards={spec.concepts.slice(3, 6)} /><p className="p2-note">Cambridge rewards the operation and its purpose in context—not a label on its own.</p></Slide>,
    },
    {
      time: `${timings[5]} min`, focus: "Model the exact current notation or representation.", prompt: "Students annotate each line before copying the pattern.", source: `${spec.textbook}; official Pseudocode Guide where applicable.`,
      content: <Slide number="06" eyebrow="REFERENCE MODEL" sourceLabel="TEXTBOOK + 2027 PSEUDOCODE GUIDE" syllabusLabel={`SYLLABUS ${spec.syllabus}`} title={spec.model.title}><pre className="p2-code">{spec.model.code}</pre><p className="p2-note">{spec.model.note}</p></Slide>,
    },
    {
      time: `${timings[6]} min`, focus: "Demonstrate a complete worked route from requirement to answer.", prompt: spec.worked.prompt, source: `${spec.textbook}; worked example adapted to current syntax.`,
      content: <Slide number="07" eyebrow="WORKED EXAMPLE" sourceLabel={spec.textbook} syllabusLabel={`SYLLABUS ${spec.syllabus}`} title={spec.worked.title}><section className="p2-process">{spec.worked.steps.map((step, index) => <div key={step}><b>{index + 1}</b><span>{step}</span></div>)}</section><ExamReveal><p>{spec.worked.answer}</p></ExamReveal></Slide>,
    },
    {
      time: `${timings[7]} min`, focus: "Compare closely related choices using a shared criterion.", prompt: "Cover the example column; students supply it from the distinction.", source: `${spec.textbook}; syllabus ${spec.syllabus}.`,
      content: <Slide number="08" eyebrow="COMPARE · CHOOSE · JUSTIFY" sourceLabel={spec.textbook} syllabusLabel={`SYLLABUS ${spec.syllabus}`} title={spec.comparison.title}><section className="p2-table"><div><span>TERM / CHOICE</span><span>EXACT DISTINCTION</span><span>CONTEXTUAL EXAMPLE</span></div>{spec.comparison.rows.map((row) => <div key={row.term}><b>{row.term}</b><span>{row.distinction}</span><span>{row.example}</span></div>)}</section></Slide>,
    },
    {
      time: `${timings[8]} min`, focus: "Move responsibility from teacher modelling to guided student construction.", prompt: spec.practice.prompt, source: `${spec.textbook}; syllabus-aligned practice.`,
      content: <Slide number="09" eyebrow="YOU DO · GUIDED PRACTICE" sourceLabel={spec.textbook} syllabusLabel={`SYLLABUS ${spec.syllabus}`} title={spec.practice.title}><section className="p2-cue-grid">{spec.practice.cues.map((cue, index) => <article key={cue}><b>{String.fromCharCode(65 + index)}</b><p>{cue}</p></article>)}</section><ExamReveal><p>{spec.practice.answer}</p></ExamReveal></Slide>,
    },
    {
      time: `${timings[9]} min`, focus: "Prevent errors caused by outdated textbook syntax or imprecise exam language.", prompt: "Students correct each trap aloud and explain the consequence.", source: "2027–2029 syllabus and Pseudocode Guide corrections.",
      content: <Slide number="10" eyebrow="ERROR CLINIC" sourceLabel="CURRENT GUIDE CHECK" syllabusLabel={`SYLLABUS ${spec.syllabus}`} title="Three traps to remove now."><section className="p2-pitfalls">{spec.pitfalls.map((pitfall, index) => <article key={pitfall}><b>TRAP {index + 1}</b><p>{pitfall}</p></article>)}</section></Slide>,
    },
    {
      time: `${timings[10]} min`, focus: "Turn content knowledge into a repeatable exam routine.", prompt: "Students write the three-step method in the margin of their notes.", source: "Published Paper 2 mark-scheme patterns.",
      content: <Slide number="11" eyebrow="EXAM METHOD" sourceLabel="PUBLISHED MARK SCHEME PATTERNS" syllabusLabel={`SYLLABUS ${spec.syllabus}`} title="Build marks in visible steps."><section className="p2-method">{spec.examMethod.map((method, index) => <article key={method}><b>{index + 1}</b><p>{method}</p></article>)}</section></Slide>,
    },
    {
      time: `${timings[11]} min`, focus: "Attempt the first cited question under timed conditions.", prompt: "Annotate the command word and mark allocation before writing.", source: `${paperA.source}, checked against published mark scheme.`,
      content: <PaperSlide paper={paperA} number="12" syllabus={spec.syllabus} />,
    },
    {
      time: `${timings[12]} min`, focus: "Attempt a second authentic pattern and self-mark precisely.", prompt: "Students underline the evidence for each awarded mark.", source: `${paperB.source}, checked against published mark scheme.`,
      content: <PaperSlide paper={paperB} number="13" syllabus={spec.syllabus} />,
    },
    {
      time: `${timings[13]} min`, focus: "Connect today's material to earlier Paper 2 knowledge.", prompt: "Answer without notes, then repair one weak response.", source: `Syllabus ${spec.syllabus}; spaced retrieval.`,
      content: <Slide number="14" eyebrow="SPACED RETRIEVAL" sourceLabel="CHAPTER CONNECTIONS" syllabusLabel={`SYLLABUS ${spec.syllabus}`} title="Explain, do not merely name."><section className="p2-retrieval">{spec.retrieval.map((question, index) => <article key={question}><b>0{index + 1}</b><p>{question}</p></article>)}</section></Slide>,
    },
    {
      time: `${timings[14]} min`, focus: "Check readiness for independent homework and the next lesson.", prompt: "Collect one sentence or code fragment for each exit prompt.", source: `${spec.textbook}; syllabus ${spec.syllabus} checkpoint.`,
      content: <Slide number="15" eyebrow="EXIT TICKET" sourceLabel={spec.textbook} syllabusLabel={`SYLLABUS ${spec.syllabus}`} title="Three checks before you leave."><section className="p2-exit">{spec.exit.map((question, index) => <article key={question}><span>{index + 1}</span><p>{question}</p></article>)}</section><p className="p2-homework-callout"><b>HOMEWORK {spec.lessonNumber}</b><span>30 marks · 45 minutes · answers toggle inline</span></p></Slide>,
    },
  ];

  return <LessonShell lessonNumber={spec.lessonNumber} slides={slides} homework={<HomeworkSheet lessonNumber={spec.lessonNumber} title={spec.title} marks={30} minutes={45} syllabusLabel={`SYLLABUS ${spec.syllabus} · PAPER 2`} sourceLabel={`${spec.textbook} + PUBLISHED PAPER 2`} instructions={spec.homework.instructions} sections={toHomeworkSections(spec)} challenge={{ id: `l${spec.lessonNumber}-challenge`, prompt: <p><Mark>CHALLENGE</Mark> {spec.homework.challenge.prompt}</p>, answer: <p>{spec.homework.challenge.answer}</p> }} />} courseMapHref="../?view=roadmap" sourceSummary={spec.sourceSummary} sourceDetail={spec.sourceDetail} />;
}
