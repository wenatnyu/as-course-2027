"use client";

import { ExamReveal } from "../../_components/exam-reveal";
import {
  HomeworkSheet,
  LessonShell,
  Mark,
  Slide,
  type HomeworkSection,
  type SlideData,
} from "../../_components/lesson-shell";
import { A2_LESSON_ONE_LINKS, A2_PREVIEW_CATALOG } from "../../_data/a2-course";

const homeworkSections: HomeworkSection[] = [
  {
    code: "A",
    title: "Concepts and classification",
    subtitle: "Explain why a programmer creates a type, then classify it precisely",
    marks: 10,
    questions: [
      {
        id: "a2-01-1",
        marks: 3,
        lines: 4,
        prompt: <><b>Explain why a programmer may create a user-defined data type.</b><p>Your answer must go beyond “it stores data”.</p></>,
        answer: <p>A user-defined type can model the data in a particular problem more accurately <em>[1]</em>, restrict values or group related fields so invalid states are less likely <em>[1]</em>, and make a program easier to understand, maintain or reuse <em>[1]</em>.</p>,
      },
      {
        id: "a2-01-2",
        marks: 4,
        lines: 5,
        prompt: <><b>Distinguish a non-composite data type from a composite data type.</b><p>Give one user-defined example of each.</p></>,
        answer: <p>A <strong>non-composite</strong> value is treated as one indivisible item <em>[1]</em>; an enumerated type or pointer is a valid example <em>[1]</em>. A <strong>composite</strong> value is made from several elements or fields <em>[1]</em>; a set, record or class/object is a valid example <em>[1]</em>.</p>,
      },
      {
        id: "a2-01-3",
        marks: 3,
        lines: 4,
        prompt: <><b>Choose the most suitable type for each requirement and justify one choice:</b><p>(i) one of four compass directions; (ii) the unique modules taken by a student; (iii) a customer&apos;s name, ID and credit balance.</p></>,
        answer: <p>(i) <strong>enumerated</strong> type <em>[1]</em>; (ii) <strong>set</strong> <em>[1]</em>; (iii) <strong>record</strong> <em>[1]</em>. A justification may earn the relevant mark if it links the requirement to ordered named values, unique unordered members, or differently typed named fields.</p>,
      },
    ],
  },
  {
    code: "B",
    title: "Cambridge pseudocode",
    subtitle: "Write current 2027–2029 Guide syntax, not a remembered language variant",
    marks: 10,
    questions: [
      {
        id: "a2-01-4",
        marks: 3,
        lines: 5,
        prompt: <><b>Declare an enumerated type</b> called <code>TStatus</code> with the values Waiting, Active and Finished, then declare <code>CurrentStatus</code>.</>,
        answer: <pre>{`TYPE TStatus = (Waiting, Active, Finished)\nDECLARE CurrentStatus : TStatus`}</pre>,
      },
      {
        id: "a2-01-5",
        marks: 4,
        lines: 6,
        prompt: <><b>Declare an integer pointer type and a variable of that type.</b><p>Then make it point to <code>Score</code> and assign 42 through the pointer.</p></>,
        answer: <pre>{`TYPE TIntPointer = ^INTEGER\nDECLARE Score : INTEGER\nDECLARE ScorePointer : TIntPointer\nScorePointer ← ^Score\nScorePointer^ ← 42`}</pre>,
      },
      {
        id: "a2-01-6",
        marks: 3,
        lines: 5,
        prompt: <><b>Declare a set type</b> called <code>TAccess</code> containing characters, then define <code>AdminAccess</code> to contain R, W and X.</>,
        answer: <pre>{`TYPE TAccess = SET OF CHAR\nDEFINE AdminAccess ('R', 'W', 'X') : TAccess`}</pre>,
      },
    ],
  },
  {
    code: "C",
    title: "Exam transfer",
    subtitle: "Use published mark-point logic, then design and access a record",
    marks: 10,
    questions: [
      {
        id: "a2-01-7",
        marks: 4,
        lines: 6,
        prompt: <><Mark>PAST PAPER PRACTICE</Mark><p><b>Describe enumerated and pointer data types.</b></p><p>Adapted from 9618/31 O/N 2023 Q3. [4]</p></>,
        answer: <p>An <strong>enumerated type</strong> is a user-defined, non-composite type consisting of an ordered list of all permitted named values <em>[max 2]</em>. A <strong>pointer type</strong> is user-defined and non-composite; its value stores the address or memory location of data of a stated type <em>[max 2]</em>.</p>,
      },
      {
        id: "a2-01-8",
        marks: 4,
        lines: 7,
        prompt: <><b>Design a record type</b> called <code>TBook</code> with suitable fields for ISBN, title and whether it is on loan. Declare <code>LibraryBook</code>.</>,
        answer: <pre>{`TYPE TBook\n  DECLARE ISBN : STRING\n  DECLARE Title : STRING\n  DECLARE OnLoan : BOOLEAN\nENDTYPE\nDECLARE LibraryBook : TBook`}</pre>,
      },
      {
        id: "a2-01-9",
        marks: 2,
        lines: 3,
        prompt: <><b>Write two assignment statements</b> that store values in the title and loan-status fields of <code>LibraryBook</code>.</>,
        answer: <pre>{`LibraryBook.Title ← "The Code Book"\nLibraryBook.OnLoan ← FALSE`}</pre>,
      },
    ],
  },
];

export default function A2Lesson01Client() {
  const slides: SlideData[] = [
    {
      time: "3 min",
      focus: "Frame A2 as choosing representations that encode a problem's rules.",
      prompt: "Ask: when does INTEGER or STRING stop being enough?",
      source: "2027–2029 syllabus 13.1; coursebook Chapter 16 §16.01 printed pp.313–317.",
      content: (
        <Slide number="01" eyebrow="A2 · PAPER 3" sourceLabel="TEXTBOOK Ch16 §16.01" syllabusLabel="SYLLABUS 13.1" className="a2-slide a2-title">
          <section className="a2-title-grid">
            <div><span>LESSON 01 · 90 MINUTES</span><h1>Design the <em>type</em>,<br />constrain the data.</h1><p>Enumerated types · pointers · sets · records · classes and objects</p></div>
            <div className="a2-type-orbit" role="img" aria-label="Five user-defined types orbiting a model of the problem"><strong>PROBLEM</strong><span>ENUM</span><span>POINTER</span><span>SET</span><span>RECORD</span><span>CLASS</span></div>
          </section>
        </Slide>
      ),
    },
    {
      time: "4 min",
      focus: "Show exactly where today's knowledge is required and which source controls syntax.",
      prompt: "Students identify the authority to use when the older textbook and current guide differ.",
      source: "Syllabus 13.1; coursebook pp.313–317; 2027–2029 Pseudocode Guide §4 pp.12–14.",
      content: (
        <Slide number="02" eyebrow="SOURCE MAP" sourceLabel="TEXTBOOK pp.313–317 · GUIDE pp.12–14" syllabusLabel="SYLLABUS 13.1 · PAPER 3" title={<>Three sources, <em>one exam-ready model</em>.</>} className="a2-slide">
          <section className="a2-source-map"><article><span>01</span><b>SYLLABUS</b><p>what you must know and do</p></article><i>→</i><article><span>02</span><b>TEXTBOOK</b><p>concepts, context and worked examples</p></article><i>→</i><article><span>03</span><b>CURRENT GUIDE</b><p>the pseudocode syntax to write</p></article></section>
          <p className="a2-rule"><b>Conflict rule</b><span>For the 2027 examination, use the current syllabus and Pseudocode Guide: a set is composite; pointer address syntax uses <code>^variable</code>.</span></p>
        </Slide>
      ),
    },
    {
      time: "5 min",
      focus: "Retrieve primitive types and expose why grouped real-world data needs structure.",
      prompt: "Which single primitive type can represent an entire student? Explain why none can.",
      source: "Coursebook §16.01 introduction; prior AS Section 10.1 data types and records.",
      content: (
        <Slide number="03" eyebrow="DO NOW · RETRIEVAL" sourceLabel="AS 10.1 → TEXTBOOK Ch16" syllabusLabel="BRIDGE TO 13.1" title="A value may be simple. A problem rarely is." className="a2-slide">
          <section className="a2-retrieval"><article><span>PRIMITIVE VALUE</span><code>{'"Amina"'}</code><p>one STRING</p></article><article><span>REAL ENTITY</span><div className="a2-record-mini"><b>Name</b><code>{'"Amina"'}</code><b>Year</b><code>13</code><b>Active</b><code>TRUE</code></div><p>related fields with different types</p></article></section>
          <p className="takeaway">Retrieve: <strong>record</strong> groups named fields. Today we generalise that design decision to five user-defined types.</p>
        </Slide>
      ),
    },
    {
      time: "6 min",
      focus: "Explain user-defined types as enforceable models, not merely renamed storage.",
      prompt: "For a traffic light, compare STRING with a type that permits only Red, Amber or Green.",
      source: "Syllabus 13.1.1; coursebook printed pp.313–314.",
      content: (
        <Slide number="04" eyebrow="WHY DEFINE A TYPE?" sourceLabel="TEXTBOOK pp.313–314" syllabusLabel="13.1.1 · EXPLAIN" title="A type turns a domain rule into part of the program." className="a2-slide">
          <section className="a2-why-grid"><article><span>CONSTRAIN</span><b>only valid values</b><p>reject impossible states by design</p></article><article><span>COMMUNICATE</span><b>meaning in the name</b><p>make intent visible to programmers</p></article><article><span>ORGANISE</span><b>related data together</b><p>treat one entity as one value</p></article><article><span>MAINTAIN</span><b>change the model once</b><p>reuse a consistent structure</p></article></section>
          <div className="a2-model-line"><code>STRING</code><i>allows any text</i><strong>→</strong><code>TLampState</code><i>allows Red, Amber, Green</i></div>
        </Slide>
      ),
    },
    {
      time: "8 min",
      focus: "Build the syllabus taxonomy and explicitly place set in the composite branch.",
      prompt: "Students sort five type cards and justify the set classification.",
      source: "Syllabus 13.1.2–13.1.3; Pseudocode Guide §4; 9618/31 O/N 2024 Q6 mark scheme.",
      content: (
        <Slide number="05" eyebrow="TYPE TAXONOMY" sourceLabel="GUIDE §4 · O/N 2024 MS" syllabusLabel="13.1.2 + 13.1.3" title="First ask: one indivisible value, or a value made of elements?" className="a2-slide">
          <section className="a2-tree"><div><b>USER-DEFINED TYPES</b></div><div className="a2-tree-branches"><article><span>NON-COMPOSITE</span><p>one indivisible value</p><strong>enumerated</strong><strong>pointer</strong></article><article><span>COMPOSITE</span><p>contains elements or fields</p><strong>set</strong><strong>record</strong><strong>class / object</strong></article></div></section>
          <p className="a2-alert"><b>Exam trap</b> The current syllabus, Guide and 2024 mark scheme classify a <strong>set as composite</strong>.</p>
        </Slide>
      ),
    },
    {
      time: "8 min",
      focus: "Define enumerated types using all three examinable features.",
      prompt: "What values and ordering are created by TSeason?",
      source: "Syllabus 13.1.2; coursebook pp.314–315; Pseudocode Guide p.12.",
      content: (
        <Slide number="06" eyebrow="ENUMERATED TYPE" sourceLabel="TEXTBOOK pp.314–315 · GUIDE p.12" syllabusLabel="13.1.2 · NON-COMPOSITE" title="Name every allowed value—and give the list an order." className="a2-slide">
          <section className="a2-enum-layout"><div className="a2-definition"><span>DEFINITION</span><p>A <b>user-defined non-composite</b> type containing an <b>ordered list</b> of all possible named values.</p></div><pre>{`TYPE TSeason = (Spring, Summer, Autumn, Winter)\nDECLARE CurrentSeason : TSeason\nCurrentSeason ← Summer`}</pre></section>
          <section className="a2-value-track"><b>Spring</b><i>0</i><b>Summer</b><i>1</i><b>Autumn</b><i>2</i><b>Winter</b><i>3</i></section>
        </Slide>
      ),
    },
    {
      time: "5 min",
      focus: "Eliminate common enum syntax and modelling errors.",
      prompt: "Students repair three faulty declarations verbally before the answers are shown.",
      source: "Pseudocode Guide p.12; coursebook examples p.314.",
      content: (
        <Slide number="07" eyebrow="ENUM · ERROR CLINIC" sourceLabel="GUIDE p.12" syllabusLabel="13.1.2 · USE" title="Named values are identifiers—not strings, variables or duplicates." className="a2-slide">
          <section className="a2-error-grid"><article><span>WRONG</span><code>TYPE TDay = (&quot;Mon&quot;, &quot;Tue&quot;)</code><b>remove quotes</b></article><article><span>WRONG</span><code>TYPE TFlag = (On, Off, On)</code><b>each value once</b></article><article><span>WRONG</span><code>DECLARE Mode : (Auto, Manual)</code><b>define the type first</b></article></section>
          <p className="a2-rule"><b>Exam language</b><span>Say <strong>ordered list of all possible values</strong>; “a list of words” is too vague.</span></p>
        </Slide>
      ),
    },
    {
      time: "8 min",
      focus: "Separate a pointer's stored address from the data at that address and teach current syntax.",
      prompt: "After ScorePointer ← ^Score, what is stored in ScorePointer and what does ScorePointer^ mean?",
      source: "Syllabus 13.1.2; coursebook pp.315–316; current Pseudocode Guide pp.12–13.",
      content: (
        <Slide number="08" eyebrow="POINTER TYPE" sourceLabel="TEXTBOOK pp.315–316 · GUIDE pp.12–13" syllabusLabel="13.1.2 · NON-COMPOSITE" title="A pointer stores where the value is—not the value itself." className="a2-slide">
          <section className="a2-pointer-layout"><div className="a2-pointer-code"><pre>{`TYPE TIntPointer = ^INTEGER\nDECLARE Score : INTEGER\nDECLARE ScorePointer : TIntPointer\n\nScorePointer ← ^Score\nScorePointer^ ← 42`}</pre></div><div className="a2-memory"><article><span>ScorePointer</span><b>address 2048</b></article><i>points to →</i><article><span>Score · address 2048</span><b>42</b></article></div></section>
          <p className="a2-alert"><b>Current Guide</b> <code>^Score</code> gets the address; <code>ScorePointer^</code> dereferences it. Do not copy the older textbook&apos;s <code>@Score</code> notation.</p>
        </Slide>
      ),
    },
    {
      time: "8 min",
      focus: "Apply a verified authentic mark scheme and insist on distinct technical points.",
      prompt: "Four minutes closed-book; reveal, annotate one mark point per phrase, improve.",
      source: "Adapted from Cambridge 9618/31 O/N 2023 Q3 and its published mark scheme.",
      content: (
        <Slide number="09" eyebrow="PAST PAPER PRACTICE · 4 MARKS" sourceLabel="9618/31 O/N 2023 · Q3" syllabusLabel="13.1.2 · PAPER 3" title="Describe enumerated and pointer data types." className="a2-slide a2-paper">
          <section className="a2-paper-prompt"><span>4 MINUTES · CLOSED BOOK</span><p><b>Enumerated type</b> <strong>[2]</strong></p><p><b>Pointer type</b> <strong>[2]</strong></p></section>
          <ExamReveal><div className="a2-ms-grid"><p><b>Enumerated:</b> user-defined non-composite type; ordered list of all possible values. <em>[max 2]</em></p><p><b>Pointer:</b> user-defined non-composite type; stores an address/memory location; the pointed-to data type is specified. <em>[max 2]</em></p></div></ExamReveal>
          <small className="a2-adaptation">Concise classroom adaptation; original paper and mark scheme remain Cambridge copyright.</small>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Define a set through uniqueness, lack of order, element type and operations.",
      prompt: "Which properties distinguish a set from an array?",
      source: "Syllabus 13.1.3; coursebook p.316; Pseudocode Guide p.13; 9618/31 O/N 2024 Q6.",
      content: (
        <Slide number="10" eyebrow="SET TYPE" sourceLabel="GUIDE p.13 · O/N 2024 Q6" syllabusLabel="13.1.3 · COMPOSITE" title="A set holds unique, unordered values of one stated type." className="a2-slide">
          <section className="a2-set-layout"><div className="a2-set-visual"><span>A</span><span>E</span><span>I</span><span>O</span><span>U</span><b>no duplicate · no position</b></div><pre>{`TYPE TLetterSet = SET OF CHAR\nDEFINE Vowels ('A', 'E', 'I', 'O', 'U') : TLetterSet`}</pre></section>
          <div className="a2-set-ops"><article><b>membership</b><code>{"'E' ∈ Vowels"}</code></article><article><b>union</b><code>A ∪ B</code></article><article><b>intersection</b><code>A ∩ B</code></article></div>
        </Slide>
      ),
    },
    {
      time: "8 min",
      focus: "Design a record with meaningful field names, suitable field types and correct access.",
      prompt: "Why is an ISBN usually STRING rather than INTEGER?",
      source: "Syllabus 13.1.3; coursebook pp.315–317; Pseudocode Guide p.14.",
      content: (
        <Slide number="11" eyebrow="RECORD TYPE" sourceLabel="TEXTBOOK pp.315–317 · GUIDE p.14" syllabusLabel="13.1.3 · COMPOSITE" title="A record gives one entity several named, typed fields." className="a2-slide">
          <section className="a2-record-layout"><pre>{`TYPE TBook\n  DECLARE ISBN : STRING\n  DECLARE Title : STRING\n  DECLARE OnLoan : BOOLEAN\nENDTYPE\n\nDECLARE LibraryBook : TBook\nLibraryBook.OnLoan ← FALSE`}</pre><div className="a2-field-card"><span>LibraryBook</span><p><b>ISBN</b><code>{'"978..."'}</code></p><p><b>Title</b><code>{'"The Code Book"'}</code></p><p><b>OnLoan</b><code>FALSE</code></p></div></section>
          <p className="a2-rule"><b>Design rule</b><span>Choose each field from its meaning and operations—not from how numeric its characters look.</span></p>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Distinguish a passive record from a class that defines data and behaviour for objects.",
      prompt: "Which operation belongs with a BankAccount object's data, and why?",
      source: "Syllabus 13.1.3 class/object; coursebook p.315. Full OOP follows in Section 20.1.",
      content: (
        <Slide number="12" eyebrow="CLASS AND OBJECT" sourceLabel="TEXTBOOK p.315" syllabusLabel="13.1.3 · COMPOSITE" title="A class is the blueprint; an object is one instance created from it." className="a2-slide">
          <section className="a2-class-layout"><article><span>CLASS · BANKACCOUNT</span><div><b>data</b><code>AccountID · Balance</code></div><div><b>methods</b><code>Deposit() · Withdraw()</code></div></article><i>instantiates</i><article><span>OBJECT · STUDENTACCOUNT</span><div><b>AccountID</b><code>{'"S104"'}</code></div><div><b>Balance</b><code>125.50</code></div></article></section>
          <p className="takeaway">For today: recognise class/object as composite. Encapsulation, inheritance and polymorphism are taught in Section 20.1.</p>
        </Slide>
      ),
    },
    {
      time: "6 min",
      focus: "Require justified type choice before students write declarations.",
      prompt: "Pairs choose a type for each requirement and give one sentence using the data properties.",
      source: "Syllabus 13.1.4 choose and design an appropriate user-defined data type.",
      content: (
        <Slide number="13" eyebrow="DESIGN LAB · PAIRS" sourceLabel="TEXTBOOK Ch16 §16.01" syllabusLabel="13.1.4 · CHOOSE + DESIGN" title="Read the data properties. Then choose the structure." className="a2-slide">
          <section className="a2-scenario-grid"><article><span>A</span><b>Game difficulty</b><p>exactly Easy, Normal or Hard</p><strong>?</strong></article><article><span>B</span><b>Permissions</b><p>unique combination of R, W and X</p><strong>?</strong></article><article><span>C</span><b>Sensor</b><p>ID, location, current reading, active flag</p><strong>?</strong></article><article><span>D</span><b>Dynamic node link</b><p>store the location of the next integer</p><strong>?</strong></article></section>
          <p className="a2-answer-strip"><b>CHECK</b> A enumerated · B set · C record · D pointer</p>
        </Slide>
      ),
    },
    {
      time: "4 min",
      focus: "Give a repeatable response structure and correct the most expensive wording errors.",
      prompt: "Students improve one vague answer: ‘a pointer points at data’.",
      source: "Syllabus command words applied to verified 2023 and 2024 Paper 3 mark schemes.",
      content: (
        <Slide number="14" eyebrow="EXAM METHOD" sourceLabel="PAPER 3 MARK-SCHEME LANGUAGE" syllabusLabel="13.1 · EXAM READY" title="Definition marks come from precise, separate properties." className="a2-slide">
          <section className="a2-method"><article><span>01 · CLASSIFY</span><p>user-defined; composite or non-composite</p></article><article><span>02 · STRUCTURE</span><p>what the value contains or stores</p></article><article><span>03 · DISTINCTIVE RULE</span><p>ordered, unique, addressed or named fields</p></article><article><span>04 · SYNTAX</span><p>type first; variable second; current Guide notation</p></article></section>
          <p className="a2-alert"><b>Do not write</b> “set = array”, “enum = list of strings”, or “pointer = the data”.</p>
        </Slide>
      ),
    },
    {
      time: "3 min",
      focus: "Check one conceptual, one classification and one syntax outcome before homework.",
      prompt: "Students answer all three on paper; collect or cold-call before dismissal.",
      source: "Lesson synthesis aligned to syllabus 13.1.1–13.1.4.",
      content: (
        <Slide number="15" eyebrow="EXIT TICKET" sourceLabel="TEXTBOOK Ch16 · GUIDE §4" syllabusLabel="13.1.1–13.1.4" title="Can you model the rule before you code it?" className="a2-slide a2-exit">
          <section className="a2-exit-grid"><article><span>01</span><p>Give one reason to create a user-defined type.</p></article><article><span>02</span><p>Classify <b>set</b> and <b>pointer</b>.</p></article><article><span>03</span><p>Write the line that makes <code>P</code> point to integer variable <code>N</code>.</p></article></section>
          <div className="homework-callout"><b>HOMEWORK 01</b><span>30 marks · answers reveal inline · print defaults to student copy</span><strong>45 min</strong></div>
        </Slide>
      ),
    },
  ];

  return (
    <LessonShell
      lessonNumber="01"
      slides={slides}
      homework={<HomeworkSheet lessonNumber="01" title="User-defined data types" marks={30} minutes={45} sourceLabel="TEXTBOOK Ch16 §16.01 · GUIDE §4" syllabusLabel="SYLLABUS 13.1" qualificationLabel="A LEVEL COMPUTER SCIENCE · 9618" instructions="Answer all questions. Use the 2027–2029 Cambridge pseudocode notation. Mark schemes sit beside each question online; they are hidden from the printed student copy unless revealed before printing." sections={homeworkSections} />}
      lessonLinks={A2_LESSON_ONE_LINKS}
      lessonCatalog={A2_PREVIEW_CATALOG}
      courseMapHref="../"
      courseStageLabel="A2 · 2028"
      qualificationLabel="A2 LESSON"
      siblingCourseHref="../../"
      siblingCourseLabel="AS"
      examPapersHref="../../exam-papers/"
      sourceSummary="Official 2027–2029 syllabus §13.1 · endorsed coursebook Chapter 16 §16.01 · current Pseudocode Guide §4 · verified Paper 3 mark schemes"
      sourceDetail="The current syllabus and Pseudocode Guide take precedence where older textbook notation differs. Past-paper prompts are concise classroom adaptations; full papers and mark schemes remain available only through authorised Cambridge channels."
      additionalSourceLinks={[{ href: "https://www.cambridgeinternational.org/Images/697401-2027-2029-pseudocode-guide.pdf", label: "Pseudocode guide" }]}
    />
  );
}
