"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";

type View = "slides" | "homework" | "roadmap";
type SlideData = {
  time: string;
  focus: string;
  prompt: string;
  source: string;
  content: ReactNode;
};

const weights = [128, 64, 32, 16, 8, 4, 2, 1];
const homeworkAnswerIds = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "challenge"];

const phases = [
  { weeks: "W01-08", name: "Foundations", note: "Representation, networks, hardware + pseudocode habits" },
  { weeks: "W09-17", name: "Systems & data", note: "CPU, software, security, ethics, databases" },
  { weeks: "W18-24", name: "Problem solving", note: "Algorithms, structures, programming, testing" },
  { weeks: "W25-28", name: "Consolidation", note: "Topic retrieval and complete timed papers" },
  { weeks: "W29-32", name: "Exam readiness", note: "Two mocks, error-log repair, final recall" },
];

const weeklyPlan = [
  ["01", "Number bases: binary, denary, hexadecimal", "Variables, assignment, input/output"],
  ["02", "Binary magnitudes; binary vs decimal prefixes", "Selection and Boolean expressions"],
  ["03", "Signed binary, arithmetic, overflow, BCD", "Count- and condition-controlled loops"],
  ["04", "Character data; bitmap graphics", "Trace tables and algorithm dry-runs"],
  ["05", "Vector graphics, sound and file-size calculations", "Decomposition, abstraction, pattern recognition"],
  ["06", "Lossy/lossless compression and RLE", "Pseudocode conventions and structured solutions"],
  ["07", "Networks: models, topologies, hardware", "Data types and records"],
  ["08", "Internet, transmission media and bit streaming", "One-dimensional arrays · diagnostic 1"],
  ["09", "Computer components and input/output devices", "Two-dimensional arrays"],
  ["10", "Logic gates and logic circuits", "Files and persistent data"],
  ["11", "CPU architecture and fetch-execute cycle", "Computational thinking in exam contexts"],
  ["12", "Assembly language", "Procedures and parameter passing"],
  ["13", "Bit manipulation", "Functions and return values"],
  ["14", "Operating systems", "Programming reliability: errors and test data"],
  ["15", "Language translators and IDEs", "ADTs: stack, queue, linked list"],
  ["16", "Security and data protection", "Programming practice · mid-year check"],
  ["17", "Data integrity: validation/verification; ethics and ownership", "Testing methods and Paper 2 mixed retrieval"],
  ["18", "Database concepts and normalisation", "Algorithm design: searching"],
  ["19", "DBMS, DDL and DML", "Algorithm design: sorting"],
  ["20", "Paper 1 mixed application", "Records, arrays and files in one solution"],
  ["21", "Paper 1 command words and explanations", "Programming constructs under time"],
  ["22", "Targeted theory retrieval", "Structured programming and modular design"],
  ["23", "Theory misconceptions clinic", "Program development life cycle and design"],
  ["24", "Paper 1 topic test", "Testing and maintenance · syllabus complete"],
  ["25", "Sections 1-4 spaced retrieval", "Sections 9-10 spaced retrieval"],
  ["26", "Sections 5-8 spaced retrieval", "Sections 11-12 spaced retrieval"],
  ["27", "Timed Paper 1 sections + feedback", "Timed Paper 2 sections + feedback"],
  ["28", "Full Paper 1 · 90 min", "Full Paper 2 · 120 min extended session"],
  ["29", "Mock 1 · Paper 1 + item analysis", "Mock 1 · Paper 2 + item analysis (extended)"],
  ["30", "Weak-topic reteaching", "Targeted pseudocode repair"],
  ["31", "Mock 2 · Paper 1 + final repair", "Mock 2 · Paper 2 + final repair (extended)"],
  ["32", "Final recall and exam routines", "Final tracing and pseudocode checklist"],
];

function Mark({ children }: { children: ReactNode }) {
  return <span className="syllabus-mark">{children}</span>;
}

function InlineAnswer({
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

function Slide({
  number,
  eyebrow,
  sourceLabel = "COURSEBOOK 1.01",
  title,
  className = "",
  children,
}: {
  number: string;
  eyebrow: string;
  sourceLabel?: string;
  title?: ReactNode;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <article className={`lesson-slide ${className}`}>
      <div className="slide-chrome">
        <span>{eyebrow}</span>
        <div className="source-badges"><Mark>SYLLABUS 1.1</Mark><span className="textbook-mark">{sourceLabel}</span></div>
        <b>{number}</b>
      </div>
      {title && <h2>{title}</h2>}
      {children}
    </article>
  );
}

export default function Home() {
  const [view, setView] = useState<View>("slides");
  const [current, setCurrent] = useState(0);
  const [teacherMode, setTeacherMode] = useState(false);
  const [bits, setBits] = useState([0, 0, 1, 0, 1, 1, 1, 0]);
  const [hookRevealed, setHookRevealed] = useState(false);
  const [practiceRevealed, setPracticeRevealed] = useState(false);
  const [taskRevealed, setTaskRevealed] = useState(false);
  const [examRevealed, setExamRevealed] = useState(false);
  const [revealedAnswers, setRevealedAnswers] = useState<Set<string>>(() => new Set());
  const deckRef = useRef<HTMLDivElement>(null);

  const bitValue = useMemo(() => bits.reduce((sum, bit, index) => sum + bit * weights[index], 0), [bits]);
  const toggleBit = (index: number) => setBits((old) => old.map((bit, i) => i === index ? 1 - bit : bit));
  const allAnswersVisible = homeworkAnswerIds.every((id) => revealedAnswers.has(id));
  const toggleAnswer = (id: string) => {
    setRevealedAnswers((currentAnswers) => {
      const nextAnswers = new Set(currentAnswers);
      if (nextAnswers.has(id)) nextAnswers.delete(id);
      else nextAnswers.add(id);
      return nextAnswers;
    });
  };
  const toggleAllAnswers = () => {
    setRevealedAnswers(allAnswersVisible ? new Set() : new Set(homeworkAnswerIds));
  };

  const slides: SlideData[] = [
    {
      time: "2 min",
      focus: "Set the lesson question and establish the three equivalent representations.",
      prompt: "Read the title, then point to 46, 101110 and 2E without explaining them yet.",
      source: "Coursebook Ch.1, opening and pp.3-6.",
      content: (
        <Slide number="01" eyebrow="INFORMATION REPRESENTATION" className="slide--title">
          <div className="title-copy"><span>HOW COMPUTERS COUNT</span><h1>Binary, Denary<br />& <em>Hexadecimal</em></h1><p>One value. Three representations. One idea: <b>place value</b>.</p></div>
          <div className="number-triptych"><div><small>DENARY</small><b>46</b></div><i>=</i><div><small>BINARY</small><b>101110</b></div><i>=</i><div><small>HEXADECIMAL</small><b>2E</b></div></div>
        </Slide>
      ),
    },
    {
      time: "3 min",
      focus: "Make the textbook-led route and its precise syllabus overlap visible.",
      prompt: "Point out that the lesson sequence and core examples follow Coursebook Section 1.01; the green tag marks examinable syllabus content.",
      source: "Coursebook Section 1.01, pp.3-6; 9618 Syllabus 2027-2029, p.14.",
      content: (
        <Slide number="02" eyebrow="TEXTBOOK × SYLLABUS" sourceLabel="COURSEBOOK 1.01 · pp.3-6" title="This lesson follows Coursebook 1.01 — Number systems." className="slide--exam-map">
          <div className="exam-halves">
            <div><span>COURSEBOOK</span><b>1.01</b><h3>Concept sequence</h3><p>Place value → binary → hexadecimal → conversion methods → Task 1.01</p></div>
            <div><span>SYLLABUS 1.1</span><b>P1</b><h3>Exam destination</h3><p>Understand number systems, convert integer values and describe uses of hexadecimal.</p></div>
          </div>
          <div className="lesson-position"><i /><p><b>Today:</b> every textbook example is linked to an examinable objective</p><span>WEEK 01 / 32</span></div>
        </Slide>
      ),
    },
    {
      time: "6 min",
      focus: "Transfer the familiar denary place-value model directly into base 2.",
      prompt: "Read each table from the right. Students should verbalise that the place value is multiplied by the base as we move left.",
      source: "Coursebook p.3, Tables 1.01 and 1.02.",
      content: (
        <Slide number="03" eyebrow="PLACE VALUE" sourceLabel="TEXTBOOK p.3 · TABLES 1.01-1.02" title="The same place-value rule works in every base." className="slide--place-value">
          <div className="place-equation"><b>digit</b><i>×</i><b>base<sup>position</sup></b><i>=</i><b>place value</b></div>
          <div className="place-comparison">
            <div><span>DENARY · TABLE 1.01</span><strong>3&nbsp;&nbsp;4&nbsp;&nbsp;6</strong><p>3×100 + 4×10 + 6×1 = <b>346</b></p></div>
            <div><span>BINARY · TABLE 1.02</span><strong>1&nbsp;&nbsp;0&nbsp;&nbsp;1&nbsp;&nbsp;1&nbsp;&nbsp;1&nbsp;&nbsp;0</strong><p>32 + 8 + 4 + 2 = <b>46</b></p></div>
          </div>
          <p className="takeaway">Start at the right with <b>base⁰</b>. Each move left multiplies the place value by the base.</p>
        </Slide>
      ),
    },
    {
      time: "5 min",
      focus: "Explain the two-state hardware reason and distinguish number from code.",
      prompt: "Think-pair-share for 45 seconds. Then ask whether 01000001 must be a number; foreshadow character codes.",
      source: "Coursebook pp.3-4: hardware recognises on/off states; binary code is not necessarily a number.",
      content: (
        <Slide number="04" eyebrow="WHY BINARY?" sourceLabel="TEXTBOOK pp.3-4" className="slide--question">
          <h2>Hardware only needs to recognise <em>two</em> reliable states.</h2>
          <div className="state-visual"><div><b>0</b><small>OFF</small></div><i /><div><b>1</b><small>ON</small></div></div>
          <button className="reveal-button" onClick={() => setHookRevealed(!hookRevealed)}>{hookRevealed ? "Hide key idea" : "Reveal key idea"}</button>
          <p className={hookRevealed ? "reveal-copy visible" : "reveal-copy"}>A binary code may represent a binary <b>number</b>, but it does not have to. For example, the same pattern could represent a character.</p>
        </Slide>
      ),
    },
    {
      time: "6 min",
      focus: "Use the textbook definitions for bit, byte and nibble.",
      prompt: "Keep asking whether a displayed pattern is a number or merely a code.",
      source: "Coursebook pp.3-4.",
      content: (
        <Slide number="05" eyebrow="KEY TERMS" sourceLabel="TEXTBOOK pp.3-4 · KEY TERMS" title="Bits are grouped into bytes and nibbles." className="slide--groups">
          <div className="group-visual">
            <div className="byte-strip">{"10110110".split("").map((bit, index) => <i key={index} className={index < 4 ? "first-nibble" : "second-nibble"}>{bit}</i>)}</div>
            <div className="group-braces"><span>nibble · 4 bits</span><span>nibble · 4 bits</span></div>
            <b>1 byte · 8 bits</b>
          </div>
          <div className="vocab-line"><p><b>bit</b><span>one binary digit: 0 or 1</span></p><p><b>byte</b><span>eight bits treated as one unit</span></p><p><b>nibble</b><span>four bits</span></p></div>
          <p className="takeaway"><b>Careful:</b> a binary code may represent a binary number, but it does not have to. A character code is one example.</p>
        </Slide>
      ),
    },
    {
      time: "6 min",
      focus: "Introduce hexadecimal through place value before teaching conversion algorithms, matching the textbook sequence.",
      prompt: "Ask students to supply the denary value of A before completing the centre column.",
      source: "Coursebook p.4, Table 1.03.",
      content: (
        <Slide number="06" eyebrow="HEXADECIMAL PLACE VALUE" sourceLabel="TEXTBOOK p.4 · TABLE 1.03" title="Hexadecimal is base 16 — and follows the same rule." className="slide--hex-denary">
          <div className="hex-place-grid"><div><small>16² = 256</small><b>2</b><span>2 × 256 = 512</span></div><div><small>16¹ = 16</small><b>A</b><span>10 × 16 = 160</span></div><div><small>16⁰ = 1</small><b>6</b><span>6 × 1 = 6</span></div></div>
          <div className="worked-answer"><span>512 + 160 + 6</span><i>=</i><b>678<sub>10</sub></b></div>
          <p className="takeaway">A-F are single hexadecimal digits representing denary values <b>10-15</b>.</p>
        </Slide>
      ),
    },
    {
      time: "5 min",
      focus: "Make the nibble-byte-hexadecimal relationship concrete with the textbook's own Table 1.04 values.",
      prompt: "Ask why the leading zero in 0A matters when one full byte is displayed as two hex digits.",
      source: "Coursebook p.4, Table 1.04.",
      content: (
        <Slide number="07" eyebrow="ONE BYTE · THREE FORMS" sourceLabel="TEXTBOOK p.4 · TABLE 1.04" title="One nibble maps to one hexadecimal digit." className="slide--book-table">
          <div className="book-equivalence"><div className="book-equivalence__head"><span>BINARY</span><span>HEXADECIMAL</span><span>DENARY</span></div><div><b>00001010</b><b>0A</b><b>10</b></div><div><b>11111111</b><b>FF</b><b>255</b></div></div>
          <div className="equivalence-rule"><span>4 bits</span><i>=</i><span>1 hex digit</span><i>·</i><span>8 bits</span><i>=</i><span>2 hex digits</span></div>
          <p className="takeaway">A fixed-width binary code cannot contain blanks. For one full byte, write <b>0A</b>, not just A.</p>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Use the interactive byte to consolidate Table 1.02 and the p.6 range tip.",
      prompt: "Invite students to call out a target value, then toggle the switches to build it. Finish with 255.",
      source: "Coursebook p.3, Table 1.02; p.6 TIP.",
      content: (
        <Slide number="08" eyebrow="LIVE BYTE" sourceLabel="TEXTBOOK p.3 TABLE 1.02 · p.6 TIP" title="Switch a bit on; add its place value." className="slide--bit-lab">
          <div className="bit-lab"><div className="bit-weights">{weights.map((weight) => <span key={weight}>{weight}</span>)}</div><div className="bit-switches">{bits.map((bit, index) => <button key={index} onClick={() => toggleBit(index)} className={bit ? "on" : "off"} aria-label={`Toggle ${weights[index]} bit`}>{bit}</button>)}</div><div className="bit-products">{bits.map((bit, index) => <span key={index}>{bit ? weights[index] : "·"}</span>)}</div></div>
          <div className="live-result"><span>{bits.join("")}<sub>2</sub></span><i>=</i><b>{bitValue}<sub>10</sub></b></div>
          <p className="takeaway">Eight bits give <b>256 patterns</b>, but the unsigned range is <b>0-255</b>.</p>
        </Slide>
      ),
    },
    {
      time: "8 min",
      focus: "Teach the textbook's multiply-by-two/add-next-bit method accurately.",
      prompt: "Read from the most significant bit. Students say the running total after every new bit.",
      source: "Coursebook p.5, Worked Example 1.01.",
      content: (
        <Slide number="09" eyebrow="BINARY → DENARY" sourceLabel="TEXTBOOK p.5 · WORKED EXAMPLE 1.01" title="Read left to right: double, then add the next bit." className="slide--rolling">
          <div className="rolling-input">11001<sub>2</sub></div>
          <div className="rolling-chain"><b>1</b><i>×2 + 1</i><b>3</b><i>×2 + 0</i><b>6</b><i>×2 + 0</i><b>12</b><i>×2 + 1</i><b>25</b></div>
          <div className="rolling-formula">(((1×2+1)×2+0)×2+0)×2+1 = <strong>25<sub>10</sub></strong></div>
          <p className="takeaway">Alternative method: write the powers of two and add only the places containing 1.</p>
        </Slide>
      ),
    },
    {
      time: "9 min",
      focus: "Compare the two denary-to-binary methods shown on Coursebook p.5.",
      prompt: "Model the powers-of-two method for 78. For repeated division, stress that remainders are read from bottom to top.",
      source: "Coursebook p.5, including Worked Example 1.02.",
      content: (
        <Slide number="10" eyebrow="DENARY → BINARY" sourceLabel="TEXTBOOK p.5 · WORKED EXAMPLE 1.02" title="Choose either powers of two or repeated division." className="slide--conversion-methods">
          <div className="conversion-methods"><article><span>METHOD A · POWERS OF TWO</span><b>78 = 64 + 8 + 4 + 2</b><strong>1001110<sub>2</sub></strong><p>As one byte: <b>01001110</b></p></article><article><span>METHOD B · DIVIDE BY 2</span><b>246 → remainders 0,1,1,0,1,1,1,1</b><strong>11110110<sub>2</sub></strong><p>Read remainders <b>bottom to top</b>.</p></article></div>
          <p className="takeaway">Convert back to denary to check. Never omit a zero between two used places.</p>
        </Slide>
      ),
    },
    {
      time: "6 min",
      focus: "Check the p.6 range tip and fixed-width representation before moving on.",
      prompt: "Students answer on mini-whiteboards. Reveal only after every board is up.",
      source: "Coursebook p.6 TIP and p.5 example of 78.",
      content: (
        <Slide number="11" eyebrow="TEXTBOOK CHECKPOINT" sourceLabel="TEXTBOOK p.6 · TIP" title="Three checks before hexadecimal conversion." className="slide--checkpoint">
          <div className="checkpoint-questions"><div><span>A</span><p>Largest unsigned value in <b>7 bits</b>?</p></div><div><span>B</span><p>Write <b>78<sub>10</sub></b> as one full byte.</p></div><div><span>C</span><p>Why is the 8-bit maximum 255, not 256?</p></div></div>
          <button className="reveal-button dark" onClick={() => setPracticeRevealed(!practiceRevealed)}>{practiceRevealed ? "Hide answers" : "Reveal answers"}</button>
          <div className={practiceRevealed ? "checkpoint-answers visible" : "checkpoint-answers"}><b>A · 127</b><b>B · 01001110</b><b>C · 256 patterns start at 0</b></div>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Teach the exact p.6 four-bit grouping procedure.",
      prompt: "Cover the answer. Ask where grouping begins: from the right-hand, least significant end.",
      source: "Coursebook p.6, Conversions for hexadecimal numbers; 2023 M/J 11 Q3(d)(iii).",
      content: (
        <Slide number="12" eyebrow="BINARY ↔ HEX" sourceLabel="TEXTBOOK p.6 · CONVERSION METHOD" title="Group from the right, four bits at a time." className="slide--hex-groups">
          <div className="hex-group-example"><div><span>1</span><span>0</span><span>1</span><span>1</span></div><div><span>0</span><span>1</span><span>1</span><span>0</span></div></div>
          <div className="hex-group-arrows"><span>8 + 2 + 1 = 11 → B</span><span>4 + 2 = 6 → 6</span></div>
          <div className="hex-group-answer">10110110<sub>2</sub> = <b>B6<sub>16</sub></b></div>
          <p className="takeaway">Hex → binary: convert each digit separately to 4 bits. Binary → hex: group from the right.</p>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Use the exact values from Coursebook Task 1.01 as paired practice.",
      prompt: "Pairs solve one column each, then cross-check. Reveal only after methods are visible.",
      source: "Coursebook p.6, Task 1.01.",
      content: (
        <Slide number="13" eyebrow="TEXTBOOK PRACTICE" sourceLabel="TEXTBOOK p.6 · TASK 1.01" title="Task 1.01 — six conversions." className="slide--task">
          <div className="task-grid"><div><span>DENARY → HEX</span><p>96<sub>10</sub></p><p>215<sub>10</sub></p><p>374<sub>10</sub></p></div><div><span>HEX → DENARY</span><p>B4<sub>16</sub></p><p>FF<sub>16</sub></p><p>3A2C<sub>16</sub></p></div></div>
          <button className="reveal-button dark" onClick={() => setTaskRevealed(!taskRevealed)}>{taskRevealed ? "Hide Task answers" : "Reveal Task answers"}</button>
          <div className={taskRevealed ? "task-answers visible" : "task-answers"}><span>60<sub>16</sub> · D7<sub>16</sub> · 176<sub>16</sub></span><span>180<sub>10</sub> · 255<sub>10</sub> · 14892<sub>10</sub></span></div>
        </Slide>
      ),
    },
    {
      time: "10 min",
      focus: "Complete only the unsigned and hexadecimal parts of the coursebook's Chapter 1 exam-style Question 1.",
      prompt: "Students show working for denary and group bits for hex. Explicitly defer Question 1(c) because two's complement belongs in a later lesson.",
      source: "Coursebook p.24, Exam-style Question 1(a-b).",
      content: (
        <Slide number="14" eyebrow="COURSEBOOK EXAM-STYLE" sourceLabel="TEXTBOOK p.24 · QUESTION 1(a-b)" title="Two successive bytes: 10010101 00110011" className="slide--book-exam">
          <div className="book-exam-questions"><p><span>a(i)</span>Calculate the unsigned denary value. <b>[2]</b></p><p><span>a(ii)</span>Calculate the hexadecimal value. <b>[2]</b></p><p><span>b</span>Give one use of hexadecimal representation. <b>[1]</b></p></div>
          <button className="reveal-button" onClick={() => setExamRevealed(!examRevealed)}>{examRevealed ? "Hide mark scheme" : "Reveal mark scheme"}</button>
          <div className={examRevealed ? "book-exam-answer visible" : "book-exam-answer"}><p><b>a(i)</b> 38195<sub>10</sub></p><p><b>a(ii)</b> 9533<sub>16</sub></p><p><b>b</b> memory dump</p></div>
          <p className="takeaway">Textbook boundary: Question 1(c) onwards uses two&apos;s complement — save it for the signed-binary lesson.</p>
        </Slide>
      ),
    },
    {
      time: "3 min",
      focus: "Close the loop and set homework expectations.",
      prompt: "Collect exit slips before students leave. Do not reveal answers in class unless time remains.",
      source: "Coursebook Section 1.01 synthesis; Question 1.01 asks whether a computer ever uses hexadecimal numbers.",
      content: (
        <Slide number="15" eyebrow="EXIT TICKET" sourceLabel="TEXTBOOK 1.01 · REVIEW" title="Finish with the textbook's central question." className="slide--exit">
          <div className="exit-task"><span>374<sub>10</sub></span><i>=</i><span>________<sub>16</sub></span><i>·</i><span>11111111<sub>2</sub></span><i>=</i><span>____<sub>16</sub></span></div>
          <div className="exit-prompts"><p>1 · Does computer hardware store hexadecimal digits directly?</p><p>2 · Why do people still use hexadecimal?</p></div>
          <div className="homework-callout"><b>HOMEWORK</b><span>30 marks · 35 minutes · due next lesson</span><button onClick={() => setView("homework")}>Open homework →</button></div>
        </Slide>
      ),
    },
  ];

  const goTo = useCallback((next: number) => {
    setCurrent(Math.max(0, Math.min(slides.length - 1, next)));
  }, [slides.length]);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("view") === "roadmap") {
      const roadmapTimer = window.setTimeout(() => setView("roadmap"), 0);
      return () => window.clearTimeout(roadmapTimer);
    }
  }, []);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (view !== "slides") return;
      if (["ArrowRight", "PageDown", " "].includes(event.key)) { event.preventDefault(); goTo(current + 1); }
      if (["ArrowLeft", "PageUp"].includes(event.key)) { event.preventDefault(); goTo(current - 1); }
      if (event.key === "Home") goTo(0);
      if (event.key === "End") goTo(slides.length - 1);
      if (event.key.toLowerCase() === "n") setTeacherMode((value) => !value);
      if (event.key.toLowerCase() === "f") deckRef.current?.requestFullscreen?.();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [current, view, slides.length, goTo]);

  return (
    <main className={teacherMode ? "teacher-mode" : "student-mode"}>
      <header className="course-bar">
        <button className="course-brand" onClick={() => { setView("slides"); setCurrent(0); }}><b>CS</b><span>Cambridge 9618<br />AS · 2027</span></button>
        <nav aria-label="Course materials">
          <button className={view === "slides" ? "active" : ""} onClick={() => setView("slides")}>Slides</button>
          <button className={view === "homework" ? "active" : ""} onClick={() => setView("homework")}>Homework</button>
          <button className={view === "roadmap" ? "active" : ""} onClick={() => setView("roadmap")}>Course map</button>
        </nav>
        <div className="bar-actions">
          <div className="lesson-switcher" aria-label="Lesson navigation">
            <a className="active" href="./" aria-current="page">01</a>
            <a href="./lesson-02/">02</a>
            <a href="./lesson-03/">03</a>
            <a href="./lesson-04/">04</a>
            <a href="./lesson-05/">05</a>
          </div>
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

      {view === "homework" && (
        <section className="homework-page">
          <header className="homework-hero">
            <div><span>AS COMPUTER SCIENCE · 9618</span><h1>Homework 01</h1><p>Binary, denary and hexadecimal</p></div>
            <div className="homework-stats"><p><b>30</b><span>marks</span></p><p><b>35</b><span>minutes</span></p><p><b>0</b><span>calculators</span></p></div>
          </header>
          <div className="student-fields"><span>Name __________________________</span><span>Class __________</span><span>Date __________</span></div>
          <div className="homework-instructions"><div className="homework-source-badges"><Mark>SYLLABUS 1.1</Mark><span className="textbook-mark">COURSEBOOK 1.01 · pp.3-6 &amp; p.24</span></div><p>Show working for every conversion. Use subscripts or clearly label each number base. Complete without a calculator.</p><button type="button" onClick={toggleAllAnswers}>{allAnswersVisible ? "Hide all answers" : "Show all answers"}</button></div>

          <section className="homework-section">
            <div className="homework-section__title"><span>A</span><div><h2>Foundations</h2><p>Vocabulary and place value</p></div><b>8 marks</b></div>
            <ol className="question-list">
              <li>
                <div className="question-copy"><b>Define each term.</b><p>(a) bit &nbsp;&nbsp; (b) nibble &nbsp;&nbsp; (c) byte</p></div><span>[3]</span>
                <div className="writing-lines lines-3" />
                <InlineAnswer id="1" visible={revealedAnswers.has("1")} onToggle={toggleAnswer}>
                  <p><b>(a)</b> A bit is one binary digit. <b>(b)</b> A nibble is four bits. <b>(c)</b> A byte is eight bits. <em>[1 mark each]</em></p>
                </InlineAnswer>
              </li>
              <li>
                <div className="question-copy"><b>Complete the place-value statement.</b><p>110101<sub>2</sub> = 1×___ + 1×___ + 0×___ + 1×___ + 0×___ + 1×___</p><p>Hence, convert 110101<sub>2</sub> to denary.</p></div><span>[3]</span>
                <div className="writing-lines lines-3" />
                <InlineAnswer id="2" visible={revealedAnswers.has("2")} onToggle={toggleAnswer}>
                  <p>1×<b>32</b> + 1×<b>16</b> + 0×<b>8</b> + 1×<b>4</b> + 0×<b>2</b> + 1×<b>1</b>; 32 + 16 + 4 + 1 = <strong>53</strong>. <em>[1 complete place values; 1 valid addition; 1 answer]</em></p>
                </InlineAnswer>
              </li>
              <li>
                <div className="question-copy"><b>State the range of an 8-bit unsigned integer.</b><p>Give both the minimum and maximum values.</p></div><span>[2]</span>
                <div className="writing-lines lines-2" />
                <InlineAnswer id="3" visible={revealedAnswers.has("3")} onToggle={toggleAnswer}>
                  <p><strong>0 to 255</strong>, inclusive. <em>[1 minimum; 1 maximum]</em></p>
                </InlineAnswer>
              </li>
            </ol>
          </section>

          <section className="homework-section">
            <div className="homework-section__title"><span>B</span><div><h2>Textbook practice</h2><p>Coursebook Task 1.01 and Worked Example 1.02</p></div><b>14 marks</b></div>
            <ol className="question-list" start={4}>
              <li>
                <div className="question-copy"><b>Coursebook Task 1.01 — complete all six conversions.</b><p>Denary → hexadecimal: (a) 96 &nbsp; (b) 215 &nbsp; (c) 374</p><p>Hexadecimal → denary: (d) B4 &nbsp; (e) FF &nbsp; (f) 3A2C</p></div><span>[6]</span>
                <div className="writing-lines lines-4" />
                <InlineAnswer id="4" visible={revealedAnswers.has("4")} onToggle={toggleAnswer}>
                  <p><b>(a)</b> 60<sub>16</sub> &nbsp; <b>(b)</b> D7<sub>16</sub> &nbsp; <b>(c)</b> 176<sub>16</sub> &nbsp; <b>(d)</b> 180<sub>10</sub> &nbsp; <b>(e)</b> 255<sub>10</sub> &nbsp; <b>(f)</b> 14892<sub>10</sub>. <em>[1 mark each]</em></p>
                </InlineAnswer>
              </li>
              <li>
                <div className="question-copy"><b>Use successive division by 2 to convert 246<sub>10</sub> to binary.</b><p>Show the remainder at every stage and state how the remainders are read.</p></div><span>[4]</span>
                <div className="writing-lines lines-4" />
                <InlineAnswer id="5" visible={revealedAnswers.has("5")} onToggle={toggleAnswer}>
                  <p>Remainders from the divisions are 0, 1, 1, 0, 1, 1, 1, 1. Read them <strong>from bottom to top</strong>: <strong>11110110<sub>2</sub></strong>. <em>[2 valid division stages; 1 order; 1 answer]</em></p>
                </InlineAnswer>
              </li>
              <li>
                <div className="question-copy"><b>Convert between binary and hexadecimal.</b><p>(a) 01101101<sub>2</sub> → hex &nbsp;&nbsp; (b) 10101011<sub>2</sub> → hex</p><p>(c) F05<sub>16</sub> → binary &nbsp;&nbsp; (d) 3C<sub>16</sub> → binary</p></div><span>[4]</span>
                <div className="writing-lines lines-4" />
                <InlineAnswer id="6" visible={revealedAnswers.has("6")} onToggle={toggleAnswer}>
                  <p><b>(a)</b> 6D &nbsp;&nbsp; <b>(b)</b> AB &nbsp;&nbsp; <b>(c)</b> 1111 0000 0101 &nbsp;&nbsp; <b>(d)</b> 0011 1100. <em>[1 mark each]</em></p>
                </InlineAnswer>
              </li>
            </ol>
          </section>

          <section className="homework-section">
            <div className="homework-section__title"><span>C</span><div><h2>Coursebook exam application</h2><p>Exam-style Question 1(a-b), then two checks</p></div><b>8 marks</b></div>
            <ol className="question-list" start={7}>
              <li>
                <div className="question-copy"><b>Coursebook Exam-style Question 1 — two successive bytes are 10010101 00110011.</b><p>(a)(i) Calculate the unsigned denary value. [2]</p><p>(a)(ii) Calculate the hexadecimal value. [2] &nbsp; (b) Give one use of hexadecimal representation. [1]</p></div><span>[5]</span>
                <div className="writing-lines lines-4" />
                <InlineAnswer id="7" visible={revealedAnswers.has("7")} onToggle={toggleAnswer}>
                  <p><b>(a)(i)</b> <strong>38195<sub>10</sub></strong>. <b>(a)(ii)</b> <strong>9533<sub>16</sub></strong>. <b>(b)</b> memory dump. <em>[2 + 2 + 1]</em></p>
                </InlineAnswer>
              </li>
              <li>
                <div className="question-copy"><b>Explain why the maximum unsigned value in 8 bits is 255, not 256.</b></div><span>[2]</span>
                <div className="writing-lines lines-3" />
                <InlineAnswer id="8" visible={revealedAnswers.has("8")} onToggle={toggleAnswer}>
                  <p>Eight bits give <strong>2⁸ = 256 different patterns</strong>. The unsigned range begins at zero, so the largest value is <strong>2⁸ − 1 = 255</strong>. <em>[1 pattern count; 1 link to zero-based range]</em></p>
                </InlineAnswer>
              </li>
              <li>
                <div className="question-copy"><b>Complete the fixed-width representations.</b><p>10<sub>10</sub> = ________<sub>2</sub> as one byte = ____<sub>16</sub> as two hexadecimal digits.</p></div><span>[1]</span>
                <div className="writing-lines lines-2" />
                <InlineAnswer id="9" visible={revealedAnswers.has("9")} onToggle={toggleAnswer}>
                  <p><strong>00001010<sub>2</sub> = 0A<sub>16</sub></strong>. All leading zeros shown are required for these fixed widths.</p>
                </InlineAnswer>
              </li>
            </ol>
          </section>

          <div className="challenge">
            <span>OPTIONAL CHALLENGE</span>
            <p>What is the minimum number of unsigned bits needed to represent 1000<sub>10</sub>? Justify your answer using a range.</p>
            <InlineAnswer id="challenge" visible={revealedAnswers.has("challenge")} onToggle={toggleAnswer}>
              <p><strong>10 bits.</strong> The 9-bit maximum, 2⁹ − 1 = 511, is too small; the 10-bit maximum, 2¹⁰ − 1 = 1023, includes 1000.</p>
            </InlineAnswer>
          </div>
        </section>
      )}

      {view === "roadmap" && (
        <section className="roadmap-page">
          <header className="roadmap-hero"><div><span>SEPTEMBER 2026 → MAY/JUNE 2027</span><h1>32 teaching weeks<br />to exam-ready.</h1><p>Core timetable: two 90-minute lessons per week, with Paper 1 and Paper 2 developing in parallel from Week 1. Add about 2 h 40 min of supervised practical work, retrieval and guided homework each week to approach Cambridge&apos;s 180 guided learning hours.</p></div><div className="roadmap-year"><b>2027</b><span>AS EXAM</span></div></header>
          <div className="phase-track">{phases.map((phase, index) => <div key={phase.weeks} style={{ flex: [8, 9, 7, 4, 4][index] }}><span>{phase.weeks}</span><b>{phase.name}</b><p>{phase.note}</p></div>)}</div>
          <div className="exam-blueprint"><article><span>PAPER 1</span><b>1 h 30 · 75 marks</b><p>Sections 1-8 · 60% knowledge, 40% application</p></article><article><span>PAPER 2</span><b>2 h · 75 marks</b><p>Sections 9-12 · 40% application, 60% design/programming</p></article><article><span>NON-NEGOTIABLE</span><b>Past papers begin in Week 8</b><p>Short retrieval first; complete timed papers after syllabus completion.</p></article></div>
          <div className="weekly-table"><div className="weekly-head"><span>Week</span><span>Paper 1 · Theory</span><span>Paper 2 · Problem-solving</span></div>{weeklyPlan.map(([week, theory, programming]) => <div className={week === "01" ? "weekly-row current" : ["08","16","24","29","31"].includes(week) ? "weekly-row milestone" : "weekly-row"} key={week}><b>{week}</b><span>{theory}</span><span>{programming}</span></div>)}</div>
          <div className="pace-notes"><Mark>PACE RULE</Mark><p>Finish new syllabus content by Week 24. Reserve at least eight teaching weeks for spaced retrieval, two complete mocks and error-log repair. Do not wait until the syllabus is finished to introduce past-paper language.</p></div>
        </section>
      )}

      <footer className="source-footer">
        <div><b>LESSON 01 SOURCES</b><span>Checked against the 2027-2029 syllabus, the endorsed coursebook and all 18 Paper 1 variants from 2023-2025.</span></div>
        <div className="source-links"><a href="https://www.cambridgeinternational.org/Images/721397-2027-2029-syllabus.pdf" target="_blank" rel="noreferrer">Official syllabus</a><a href="https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/past-papers/" target="_blank" rel="noreferrer">Cambridge past papers</a><a href="https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/published-resources/" target="_blank" rel="noreferrer">Endorsed resources</a></div>
        <p>Syllabus pp.11, 13-14 · Coursebook Section 1.01 pp.3-6: Tables 1.01-1.04, Worked Examples 1.01-1.02 and Task 1.01 · Coursebook p.24: Exam-style Question 1(a-b) · Recent-paper anchors: 2023 M/J 11 Q3(d)(iii), 2023 M/J 12 Q4(c), 2025 M/J 12 Q2(a).</p>
      </footer>
    </main>
  );
}
