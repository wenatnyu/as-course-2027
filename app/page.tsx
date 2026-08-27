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
const hexDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];

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

function Slide({
  number,
  eyebrow,
  title,
  className = "",
  children,
}: {
  number: string;
  eyebrow: string;
  title?: ReactNode;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <article className={`lesson-slide ${className}`}>
      <div className="slide-chrome"><span>{eyebrow}</span><Mark>SYLLABUS 1.1</Mark><b>{number}</b></div>
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
  const [showAnswers, setShowAnswers] = useState(false);
  const deckRef = useRef<HTMLDivElement>(null);

  const bitValue = useMemo(() => bits.reduce((sum, bit, index) => sum + bit * weights[index], 0), [bits]);
  const toggleBit = (index: number) => setBits((old) => old.map((bit, i) => i === index ? 1 - bit : bit));

  const slides: SlideData[] = [
    {
      time: "2 min",
      focus: "Set the lesson question and establish the three equivalent representations.",
      prompt: "Read the title, then point to 46, 101110 and 2E without explaining them yet.",
      source: "Coursebook Ch.1, opening and pp.3-4.",
      content: (
        <Slide number="01" eyebrow="INFORMATION REPRESENTATION" className="slide--title">
          <div className="title-copy"><span>HOW COMPUTERS COUNT</span><h1>Binary, Denary<br />& <em>Hexadecimal</em></h1><p>One value. Three representations. One idea: <b>place value</b>.</p></div>
          <div className="number-triptych"><div><small>DENARY</small><b>46</b></div><i>=</i><div><small>BINARY</small><b>101110</b></div><i>=</i><div><small>HEXADECIMAL</small><b>2E</b></div></div>
        </Slide>
      ),
    },
    {
      time: "3 min",
      focus: "Give students the assessment destination before teaching content.",
      prompt: "Emphasise that Paper 1 tests explanation and application, not conversion drills alone.",
      source: "9618 Syllabus 2027-2029, pp.11 and 13.",
      content: (
        <Slide number="02" eyebrow="THE DESTINATION" title="Two papers. Equal weight. Different thinking." className="slide--exam-map">
          <div className="exam-halves">
            <div><span>PAPER 1</span><b>50%</b><h3>Theory Fundamentals</h3><p>1 h 30 · 75 marks<br />Sections 1-8 · AO1 + AO2</p></div>
            <div><span>PAPER 2</span><b>50%</b><h3>Problem-solving & Programming</h3><p>2 h · 75 marks<br />Sections 9-12 · pseudocode</p></div>
          </div>
          <div className="lesson-position"><i /><p><b>Today:</b> Paper 1 · Section 1.1 · number bases and integer conversion</p><span>WEEK 01 / 32</span></div>
        </Slide>
      ),
    },
    {
      time: "5 min",
      focus: "Diagnose prior understanding and create curiosity.",
      prompt: "Think-pair-share for 45 seconds. Accept answers about electricity, transistors, voltage or switches.",
      source: "Coursebook p.4: hardware recognises two states, on and off.",
      content: (
        <Slide number="03" eyebrow="OPENING QUESTION" className="slide--question">
          <h2>Why does a computer use only <em>two</em> symbols?</h2>
          <div className="state-visual"><div><b>0</b><small>OFF</small></div><i /><div><b>1</b><small>ON</small></div></div>
          <button className="reveal-button" onClick={() => setHookRevealed(!hookRevealed)}>{hookRevealed ? "Hide idea" : "Reveal idea"}</button>
          <p className={hookRevealed ? "reveal-copy visible" : "reveal-copy"}>Electronic components can reliably distinguish two physical states. Binary maps those states to <b>0</b> and <b>1</b>.</p>
        </Slide>
      ),
    },
    {
      time: "6 min",
      focus: "Connect all bases through positional notation.",
      prompt: "Ask: Why is the right-most place always base to the power zero?",
      source: "Coursebook p.3, Table 1.01; syllabus p.14.",
      content: (
        <Slide number="04" eyebrow="ONE RULE" title="A digit only has value because of its position." className="slide--place-value">
          <div className="place-equation"><b>digit</b><i>×</i><b>base<sup>position</sup></b><i>=</i><b>place value</b></div>
          <div className="place-comparison">
            <div><span>BASE 10</span><strong>3&nbsp;&nbsp;4&nbsp;&nbsp;6</strong><p>3×10² + 4×10¹ + 6×10⁰ = <b>346</b></p></div>
            <div><span>BASE 2</span><strong>1&nbsp;&nbsp;0&nbsp;&nbsp;1&nbsp;&nbsp;1&nbsp;&nbsp;1&nbsp;&nbsp;0</strong><p>1×2⁵ + 1×2³ + 1×2² + 1×2¹ = <b>46</b></p></div>
          </div>
          <p className="takeaway">Start at the right with <b>base⁰</b>. Move left by multiplying the place value by the base.</p>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Build the essential vocabulary around binary group sizes.",
      prompt: "Keep asking whether a displayed pattern is a number or merely a code.",
      source: "Coursebook pp.3-4.",
      content: (
        <Slide number="05" eyebrow="BINARY LANGUAGE" title="Bits become useful when we group them." className="slide--groups">
          <div className="group-visual">
            <div className="byte-strip">{"10110110".split("").map((bit, index) => <i key={index} className={index < 4 ? "first-nibble" : "second-nibble"}>{bit}</i>)}</div>
            <div className="group-braces"><span>nibble · 4 bits</span><span>nibble · 4 bits</span></div>
            <b>1 byte · 8 bits</b>
          </div>
          <div className="vocab-line"><p><b>bit</b><span>one binary digit</span></p><p><b>nibble</b><span>four bits</span></p><p><b>byte</b><span>eight bits</span></p></div>
          <p className="takeaway"><b>Careful:</b> a binary code is not always a binary number. The same bits might encode a colour, character or instruction.</p>
        </Slide>
      ),
    },
    {
      time: "8 min",
      focus: "Let students see place-value addition change in real time.",
      prompt: "Invite students to call out a target value, then toggle the switches to build it.",
      source: "Coursebook p.3, Table 1.02.",
      content: (
        <Slide number="06" eyebrow="LIVE BYTE" title="Switch a bit on; add its place value." className="slide--bit-lab">
          <div className="bit-lab">
            <div className="bit-weights">{weights.map((weight) => <span key={weight}>{weight}</span>)}</div>
            <div className="bit-switches">{bits.map((bit, index) => <button key={index} onClick={() => toggleBit(index)} className={bit ? "on" : "off"} aria-label={`Toggle ${weights[index]} bit`}>{bit}</button>)}</div>
            <div className="bit-products">{bits.map((bit, index) => <span key={index}>{bit ? weights[index] : "·"}</span>)}</div>
          </div>
          <div className="live-result"><span>{bits.join("")}<sub>2</sub></span><i>=</i><b>{bitValue}<sub>10</sub></b></div>
          <p className="takeaway">For 8 unsigned bits: minimum = <b>0</b>; maximum = <b>2⁸ - 1 = 255</b>.</p>
        </Slide>
      ),
    },
    {
      time: "9 min",
      focus: "Model binary-to-denary conversion with visible working.",
      prompt: "Insist on writing weights before adding. Award process, not only the final number.",
      source: "Coursebook p.5, Worked Example 1.01 uses 11001 = 25.",
      content: (
        <Slide number="07" eyebrow="BINARY → DENARY" title="Write the weights. Keep only the ones." className="slide--worked">
          <div className="worked-binary"><div className="work-row labels"><span>16</span><span>8</span><span>4</span><span>2</span><span>1</span></div><div className="work-row digits"><span>1</span><span>1</span><span>0</span><span>0</span><span>1</span></div><div className="work-row kept"><span>16</span><span>8</span><span>—</span><span>—</span><span>1</span></div></div>
          <div className="worked-answer"><span>16 + 8 + 1</span><i>=</i><b>25<sub>10</sub></b></div>
          <ol className="method-steps"><li>Write powers of two from right to left.</li><li>Select the positions containing 1.</li><li>Add those place values.</li></ol>
        </Slide>
      ),
    },
    {
      time: "8 min",
      focus: "Model denary-to-binary conversion using subtraction of powers of two.",
      prompt: "Highlight the zero positions: unused powers must still be written.",
      source: "Coursebook p.5 gives 78 = 1001110; division by two is the alternative method.",
      content: (
        <Slide number="08" eyebrow="DENARY → BINARY" title="Build the number from the largest powers of two." className="slide--subtraction">
          <div className="subtraction-chain"><div><span>78</span><small>start</small></div><i>-64</i><div><span>14</span><small>remainder</small></div><i>-8</i><div><span>6</span><small>remainder</small></div><i>-4</i><div><span>2</span><small>remainder</small></div><i>-2</i><div><span>0</span><small>done</small></div></div>
          <div className="conversion-table"><div>{weights.map((w) => <span key={w}>{w}</span>)}</div><div>{[0,1,0,0,1,1,1,0].map((b,i) => <b key={i}>{b}</b>)}</div></div>
          <p className="conversion-result">78<sub>10</sub> = <b>01001110<sub>2</sub></b></p>
          <p className="takeaway">Check by converting back. Missing middle zeroes change every place to their right.</p>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Run a low-stakes retrieval check before introducing hexadecimal.",
      prompt: "Students answer on mini-whiteboards. Reveal only after every board is up.",
      source: "Original retrieval questions based on syllabus 1.1.",
      content: (
        <Slide number="09" eyebrow="CHECKPOINT" title="Three questions. No calculator." className="slide--checkpoint">
          <div className="checkpoint-questions"><div><span>A</span><p>Convert <b>101101<sub>2</sub></b> to denary.</p></div><div><span>B</span><p>Write <b>94<sub>10</sub></b> as an 8-bit binary number.</p></div><div><span>C</span><p>What is the largest unsigned value in 7 bits?</p></div></div>
          <button className="reveal-button dark" onClick={() => setPracticeRevealed(!practiceRevealed)}>{practiceRevealed ? "Hide answers" : "Reveal answers"}</button>
          <div className={practiceRevealed ? "checkpoint-answers visible" : "checkpoint-answers"}><b>A · 45</b><b>B · 01011110</b><b>C · 127</b></div>
        </Slide>
      ),
    },
    {
      time: "8 min",
      focus: "Introduce hexadecimal as a human-readable shorthand for bit patterns.",
      prompt: "Say explicitly: hardware still stores bits; hexadecimal is our notation.",
      source: "Coursebook p.4; syllabus p.14 requires practical applications of hexadecimal.",
      content: (
        <Slide number="10" eyebrow="WHY HEXADECIMAL?" title="Four bits collapse into one hexadecimal digit." className="slide--hex-intro">
          <div className="hex-collapse"><div><span>1</span><span>0</span><span>1</span><span>0</span></div><i>→</i><b>A</b></div>
          <div className="hex-scale">{hexDigits.map((digit, index) => <div key={digit} className={index > 9 ? "letter" : ""}><b>{digit}</b><span>{index}</span></div>)}</div>
          <p className="takeaway">Hexadecimal is base 16. The single digits <b>A-F</b> represent denary values <b>10-15</b>.</p>
        </Slide>
      ),
    },
    {
      time: "6 min",
      focus: "Practise direct conversion between binary and hexadecimal.",
      prompt: "Cover the answer first. Ask where grouping must begin: always from the right.",
      source: "Coursebook p.6; recurring exam form, e.g. 2023 M/J 11 Q3(d)(iii).",
      content: (
        <Slide number="11" eyebrow="BINARY ↔ HEX" title="Group from the right, four bits at a time." className="slide--hex-groups">
          <div className="hex-group-example"><div><span>1</span><span>0</span><span>1</span><span>1</span></div><div><span>0</span><span>1</span><span>1</span><span>0</span></div></div>
          <div className="hex-group-arrows"><span>8 + 2 + 1 = 11 → B</span><span>4 + 2 = 6 → 6</span></div>
          <div className="hex-group-answer">10110110<sub>2</sub> = <b>B6<sub>16</sub></b></div>
          <p className="takeaway">One byte always becomes <b>two hexadecimal digits</b>. Add leading zeroes when fixed width matters.</p>
        </Slide>
      ),
    },
    {
      time: "5 min",
      focus: "Connect hexadecimal back to positional notation and denary.",
      prompt: "Ask students to say the value of A before revealing the calculation.",
      source: "Coursebook p.4, Table 1.03; compare 2023 M/J 12 Q4(c), where working earns a mark.",
      content: (
        <Slide number="12" eyebrow="HEX → DENARY" title="Hexadecimal follows the same place-value rule." className="slide--hex-denary">
          <div className="hex-place-grid"><div><small>16² = 256</small><b>2</b><span>2 × 256 = 512</span></div><div><small>16¹ = 16</small><b>A</b><span>10 × 16 = 160</span></div><div><small>16⁰ = 1</small><b>6</b><span>6 × 1 = 6</span></div></div>
          <div className="worked-answer"><span>512 + 160 + 6</span><i>=</i><b>678<sub>10</sub></b></div>
          <p className="takeaway">For longer values, converting each hex digit to four binary bits can reduce arithmetic errors.</p>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Answer the syllabus application requirement and correct the idea that computers store hex.",
      prompt: "Ask: When a numeric hexadecimal value is stored, is the symbol E stored directly?",
      source: "Syllabus p.14; Coursebook pp.4 and 6.",
      content: (
        <Slide number="13" eyebrow="USEFUL SHORTHAND" title="Humans use hexadecimal to read long bit patterns." className="slide--applications">
          <div className="application-line"><div><span>MEMORY</span><b>0x7FA2</b><p>Addresses and memory dumps</p></div><div><span>WEB COLOUR</span><b>#3156D3</b><p>Three compact colour bytes</p></div><div><span>NETWORK</span><b>AC:4F:2B:91:7D:08</b><p>Readable identifiers</p></div></div>
          <div className="binary-underlay">00110001 01010110 11010011</div>
          <p className="takeaway"><b>Exam wording:</b> hexadecimal is shorter, easier to read and less error-prone; each digit maps exactly to four bits.</p>
        </Slide>
      ),
    },
    {
      time: "6 min",
      focus: "Model the mark-scheme language expected in Paper 1.",
      prompt: "Students write a two-sentence answer, then compare with the three highlighted marking points.",
      source: "Recurring Paper 1 conversion/application style; 2023-2025 Paper 1 audit.",
      content: (
        <Slide number="14" eyebrow="EXAM-STYLE" title="Explain why hexadecimal is used in a memory dump. [3]" className="slide--exam-answer">
          <div className="answer-build"><p><span>1</span>Binary patterns are very long, so they are difficult for people to read.</p><p><span>2</span>Hexadecimal is more compact because one hex digit represents exactly four bits.</p><p><span>3</span>This makes values easier to copy and check, reducing human error.</p></div>
          <div className="command-word"><b>EXPLAIN</b><span>Give a reason and show why it matters.</span></div>
        </Slide>
      ),
    },
    {
      time: "3 min",
      focus: "Close the loop and set homework expectations.",
      prompt: "Collect exit slips before students leave. Do not reveal answers in class unless time remains.",
      source: "Lesson synthesis; homework is original and aligned to syllabus 1.1.",
      content: (
        <Slide number="15" eyebrow="EXIT TICKET" title="One value. Three forms. Show your working." className="slide--exit">
          <div className="exit-task"><span>94<sub>10</sub></span><i>=</i><span>________<sub>2</sub></span><i>=</i><span>____<sub>16</sub></span></div>
          <div className="exit-prompts"><p>1 · Why must unused binary places contain zero?</p><p>2 · Why is hexadecimal useful if hardware stores binary?</p></div>
          <div className="homework-callout"><b>HOMEWORK</b><span>30 marks · 35 minutes · due next lesson</span><button onClick={() => setView("homework")}>Open homework →</button></div>
        </Slide>
      ),
    },
  ];

  const goTo = useCallback((next: number) => {
    setCurrent(Math.max(0, Math.min(slides.length - 1, next)));
  }, [slides.length]);

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
          {view === "slides" && <button className={teacherMode ? "notes-toggle active" : "notes-toggle"} onClick={() => setTeacherMode(!teacherMode)}>Notes {teacherMode ? "ON" : "OFF"}</button>}
          {view !== "slides" && <button className="print-control" onClick={() => window.print()}>Print / PDF</button>}
          <span>LESSON 01</span>
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
          <div className="homework-instructions"><Mark>SYLLABUS 1.1</Mark><p>Show working for every conversion. Use subscripts or clearly label each number base. Complete without a calculator.</p><button onClick={() => setShowAnswers(!showAnswers)}>{showAnswers ? "Hide answer key" : "Show answer key"}</button></div>

          <section className="homework-section">
            <div className="homework-section__title"><span>A</span><div><h2>Foundations</h2><p>Vocabulary and place value</p></div><b>8 marks</b></div>
            <ol className="question-list">
              <li><div className="question-copy"><b>Define each term.</b><p>(a) bit &nbsp;&nbsp; (b) nibble &nbsp;&nbsp; (c) byte</p></div><span>[3]</span><div className="writing-lines lines-3" /></li>
              <li><div className="question-copy"><b>Complete the place-value statement.</b><p>110101<sub>2</sub> = 1×___ + 1×___ + 0×___ + 1×___ + 0×___ + 1×___</p><p>Hence, convert 110101<sub>2</sub> to denary.</p></div><span>[3]</span><div className="writing-lines lines-3" /></li>
              <li><div className="question-copy"><b>State the range of an 8-bit unsigned integer.</b><p>Give both the minimum and maximum values.</p></div><span>[2]</span><div className="writing-lines lines-2" /></li>
            </ol>
          </section>

          <section className="homework-section">
            <div className="homework-section__title"><span>B</span><div><h2>Conversion fluency</h2><p>Accuracy before speed</p></div><b>14 marks</b></div>
            <ol className="question-list" start={4}>
              <li><div className="question-copy"><b>Convert each binary number to denary.</b><p>(a) 00101101 &nbsp;&nbsp; (b) 10110110 &nbsp;&nbsp; (c) 11111111</p></div><span>[3]</span><div className="writing-lines lines-3" /></li>
              <li><div className="question-copy"><b>Convert each denary value to an 8-bit binary number.</b><p>(a) 58 &nbsp;&nbsp; (b) 94 &nbsp;&nbsp; (c) 201</p></div><span>[3]</span><div className="writing-lines lines-3" /></li>
              <li><div className="question-copy"><b>Convert between binary and hexadecimal.</b><p>(a) 01101101<sub>2</sub> → hex &nbsp;&nbsp; (b) 10101011<sub>2</sub> → hex</p><p>(c) F05<sub>16</sub> → binary &nbsp;&nbsp; (d) 3C<sub>16</sub> → binary</p></div><span>[4]</span><div className="writing-lines lines-4" /></li>
              <li><div className="question-copy"><b>Convert each hexadecimal value to denary. Show place-value working.</b><p>(a) 7B<sub>16</sub> &nbsp;&nbsp; (b) 1A4<sub>16</sub></p></div><span>[4]</span><div className="writing-lines lines-4" /></li>
            </ol>
          </section>

          <section className="homework-section">
            <div className="homework-section__title"><span>C</span><div><h2>Exam application</h2><p>Use precise explanation</p></div><b>8 marks</b></div>
            <ol className="question-list" start={8}>
              <li><div className="question-copy"><b>A memory display contains the two bytes 10110100 01101110.</b><p>(a) Write the value in hexadecimal. &nbsp; (b) Convert the complete unsigned value to denary.</p></div><span>[4]</span><div className="writing-lines lines-4" /></li>
              <li><div className="question-copy"><b>Explain two reasons why hexadecimal is used to display memory contents.</b></div><span>[2]</span><div className="writing-lines lines-3" /></li>
              <li><div className="question-copy"><b>Explain why the maximum unsigned value in 8 bits is 255, not 256.</b></div><span>[2]</span><div className="writing-lines lines-3" /></li>
            </ol>
          </section>

          <div className="challenge"><span>OPTIONAL CHALLENGE</span><p>What is the minimum number of unsigned bits needed to represent 1000<sub>10</sub>? Justify your answer using a range.</p></div>

          <section className={showAnswers ? "answer-key visible" : "answer-key"}>
            <div className="answer-key__title"><span>MARK SCHEME</span><h2>Homework 01 · Answers</h2></div>
            <div className="answer-grid">
              <p><b>1</b> Bit: one binary digit. Nibble: four bits. Byte: eight bits.</p>
              <p><b>2</b> 32, 16, 8, 4, 2, 1; 32 + 16 + 4 + 1 = <strong>53</strong>.</p>
              <p><b>3</b> <strong>0 to 255</strong>.</p>
              <p><b>4</b> (a) 45 (b) 182 (c) 255.</p>
              <p><b>5</b> (a) 00111010 (b) 01011110 (c) 11001001.</p>
              <p><b>6</b> (a) 6D (b) AB (c) 1111 0000 0101 (d) 0011 1100.</p>
              <p><b>7</b> (a) 7×16 + 11 = <strong>123</strong>. (b) 1×256 + 10×16 + 4 = <strong>420</strong>.</p>
              <p><b>8</b> (a) B46E (b) 11×4096 + 4×256 + 6×16 + 14 = <strong>46190</strong>.</p>
              <p><b>9</b> More compact/easier to read; exact 1-hex-digit to 4-bit mapping reduces copying errors.</p>
              <p><b>10</b> Eight bits give 2⁸ = 256 patterns, but counting begins at 0; maximum is 2⁸ - 1 = 255.</p>
              <p><b>Challenge</b> 10 bits: 2⁹ - 1 = 511 is too small; 2¹⁰ - 1 = 1023 includes 1000.</p>
            </div>
          </section>
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
        <p>Syllabus pp.11, 13-14 · Coursebook Ch.1 pp.3-6 (PDF pp.10-13) · Past-paper anchors: 2023 M/J 11 Q3(d)(iii), 2023 M/J 12 Q4(c), 2025 M/J 12 Q2(a) · Homework questions are original exam-style adaptations.</p>
      </footer>
    </main>
  );
}
