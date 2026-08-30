"use client";

import { useState, type ReactNode } from "react";
import {
  HomeworkSheet,
  LessonShell,
  Mark,
  Slide,
  type HomeworkSection,
  type SlideData,
} from "../_components/lesson-shell";

function Reveal({
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
  return (
    <div className="l2-reveal">
      <button type="button" onClick={() => onToggle(id)} aria-expanded={visible} aria-controls={`l2-${id}`}>
        {visible ? "Hide answer" : "Reveal answer"}
      </button>
      <div id={`l2-${id}`} className={visible ? "l2-reveal__panel visible" : "l2-reveal__panel"} hidden={!visible}>{children}</div>
    </div>
  );
}

const homeworkSections: HomeworkSection[] = [
  {
    code: "A",
    title: "Language and scale",
    subtitle: "Choose the correct prefix family, symbol and multiplier",
    marks: 8,
    questions: [
      {
        id: "l2-1",
        marks: 2,
        lines: 3,
        prompt: <><b>Define a decimal prefix and a binary prefix.</b><p>Your answer must identify the base used by each family.</p></>,
        answer: <p>A <strong>decimal prefix</strong> scales a unit by a power of 10; a <strong>binary prefix</strong> scales it by a power of 2. <em>[1 each]</em></p>,
      },
      {
        id: "l2-2",
        marks: 4,
        lines: 3,
        prompt: <><b>Complete the four facts.</b><p>1 kB = ___ B &nbsp; · &nbsp; 1 KiB = ___ B &nbsp; · &nbsp; 1 MB = ___ B &nbsp; · &nbsp; 1 MiB = ___ B</p></>,
        answer: <p><strong>1,000 B; 1,024 B; 1,000,000 B; 1,048,576 B.</strong> <em>[1 each]</em></p>,
      },
      {
        id: "l2-3",
        marks: 2,
        lines: 2,
        prompt: <><b>Explain the difference between b and B in a data quantity.</b><p>Then state how many bits are in one byte.</p></>,
        answer: <p>Lower-case <strong>b means bit</strong>; upper-case <strong>B means byte</strong>. One byte contains <strong>8 bits</strong>. <em>[1 distinction; 1 relationship]</em></p>,
      },
    ],
  },
  {
    code: "B",
    title: "Textbook calculations",
    subtitle: "Convert to a sensible magnitude before comparing or dividing",
    marks: 14,
    questions: [
      {
        id: "l2-4",
        marks: 2,
        lines: 3,
        prompt: <><b>Convert 34,560 B to KiB.</b><p>Show the divisor and give an exact answer.</p></>,
        answer: <p>34,560 ÷ 1,024 = <strong>33.75 KiB</strong>. <em>[1 correct divisor; 1 answer]</em></p>,
      },
      {
        id: "l2-5",
        marks: 3,
        lines: 3,
        prompt: <><b>Convert 3,456,000 B to MiB.</b><p>Give the answer to three decimal places.</p></>,
        answer: <p>3,456,000 ÷ 1,024² = 3.295898… = <strong>3.296 MiB</strong>. <em>[1 multiplier; 1 calculation; 1 rounding]</em></p>,
      },
      {
        id: "l2-6",
        marks: 3,
        lines: 3,
        prompt: <><b>A device has 4 GiB free. How many complete 2.4 MiB files will fit?</b><p>Show the common-unit conversion and round in the correct direction.</p></>,
        answer: <p>4 GiB = 4 × 1,024 = 4,096 MiB. 4,096 ÷ 2.4 = 1,706.666… so <strong>1,706 complete files</strong> fit. Always round down for complete files. <em>[1 + 1 + 1]</em></p>,
      },
      {
        id: "l2-7",
        marks: 4,
        lines: 4,
        prompt: <><b>Convert 5.5 MiB to (a) KiB and (b) bytes.</b></>,
        answer: <p><b>(a)</b> 5.5 × 1,024 = <strong>5,632 KiB</strong>. <b>(b)</b> 5.5 × 1,024² = <strong>5,767,168 B</strong>. <em>[2 each]</em></p>,
      },
      {
        id: "l2-8",
        marks: 2,
        lines: 2,
        prompt: <><b>Complete two recent-paper style conversions.</b><p>(a) 3 KiB = ___ B &nbsp;&nbsp; (b) 2 TB = ___ GB</p></>,
        answer: <p><b>(a)</b> <strong>3,072 B</strong>. <b>(b)</b> <strong>2,000 GB</strong>. The first uses the binary family; the second uses the decimal family. <em>[1 each]</em></p>,
      },
    ],
  },
  {
    code: "C",
    title: "Exam application",
    subtitle: "Normalise units, compare values and communicate the method",
    marks: 8,
    questions: [
      {
        id: "l2-9",
        marks: 3,
        lines: 3,
        prompt: <><b>Which quantity is largest: 0.3 MB, 3 MiB, 3,300 kB or 3,300 KiB?</b><p>Show enough working to justify the choice.</p></>,
        answer: <p>0.3 MB = 300,000 B; 3 MiB = 3,145,728 B; 3,300 kB = 3,300,000 B; 3,300 KiB = 3,379,200 B. Therefore <strong>3,300 KiB</strong> is largest. <em>[2 normalisation; 1 choice]</em></p>,
      },
      {
        id: "l2-10",
        marks: 3,
        lines: 3,
        prompt: <><b>A drive is advertised as 500 GB. Express this capacity in GiB.</b><p>Explain why the numerical value shown by an operating system may be smaller.</p></>,
        answer: <p>500 GB = 500,000,000,000 B. Divide by 1,073,741,824 to obtain <strong>about 465.66 GiB</strong>. The byte capacity has not disappeared; the displayed number is smaller because GiB is a larger unit than GB. <em>[2 calculation; 1 explanation]</em></p>,
      },
      {
        id: "l2-11",
        marks: 2,
        lines: 3,
        prompt: <><Mark>BRIDGE TO SYLLABUS 1.2</Mark> <b>A 2,048 × 1,024 image uses 10 bits per pixel. Calculate its size in MiB.</b></>,
        answer: <p>(2,048 × 1,024 × 10) ÷ 8 = 2,621,440 B. Divide by 1,048,576: <strong>2.5 MiB</strong>. <em>[1 bit-to-byte conversion; 1 answer]</em></p>,
      },
    ],
  },
];

export default function Lesson02Client() {
  const [revealed, setRevealed] = useState<Set<string>>(() => new Set());

  const toggleReveal = (id: string) => {
    setRevealed((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const slides: SlideData[] = [
    {
      time: "3 min",
      focus: "Introduce the two prefix families through a familiar storage label and make the central ambiguity visible.",
      prompt: "Ask: does 1 KB mean exactly 1,000 bytes or 1,024 bytes? Do not resolve it until students commit.",
      source: "Coursebook Section 1.02, printed pp.6-8; 9618 Syllabus 2027-2029, 1.1.",
      content: (
        <Slide number="01" eyebrow="INFORMATION REPRESENTATION" sourceLabel="TEXTBOOK 1.02 · pp.6-8" className="slide--l2-title">
          <section className="l2-title-grid">
            <div><span>LESSON 02 · 90 MINUTES</span><h1>Binary Magnitudes<br />&amp; <em>Data Prefixes</em></h1><p>The symbol tells you which scale to use. One letter can change the calculation.</p></div>
            <div className="l2-hero-units"><article><small>DECIMAL</small><b>1 kB</b><strong>1,000 B</strong></article><i>≠</i><article><small>BINARY</small><b>1 KiB</b><strong>1,024 B</strong></article></div>
          </section>
        </Slide>
      ),
    },
    {
      time: "4 min",
      focus: "Locate the lesson precisely in the textbook and syllabus, including the boundary with image and sound calculations.",
      prompt: "Students highlight the words binary and decimal in the syllabus statement; explain that the green label means examinable.",
      source: "Coursebook 1.02, printed pp.6-8; syllabus p.14, Section 1.1.",
      content: (
        <Slide number="02" eyebrow="TEXTBOOK × SYLLABUS" sourceLabel="TEXTBOOK 1.02 · pp.6-8" title="Today’s route follows Coursebook 1.02." className="slide--l2-map lesson-dark">
          <section className="lesson-grid two"><article className="lesson-card"><span>COURSEBOOK</span><h3>Numbers &amp; quantities</h3><p>Equivalent magnitudes → decimal prefixes → binary prefixes → conversions → common-unit calculations.</p></article><article className="lesson-card"><span>SYLLABUS 1.1</span><h3>Exam destination</h3><p>Understand binary magnitudes and the difference between binary and decimal prefixes: kibi/kilo through tebi/tera.</p></article></section>
          <p className="l2-map-note"><Mark>WEEK 02 / 32</Mark><span>File-size formulas belong to Syllabus 1.2 and will be labelled as a bridge.</span></p>
        </Slide>
      ),
    },
    {
      time: "5 min",
      focus: "Retrieve Lesson 01 conversion fluency using the coursebook task immediately before Section 1.02.",
      prompt: "Give 90 seconds. Students answer any three, then reveal all six and self-correct their method.",
      source: "Coursebook p.6, Task 1.01.",
      content: (
        <Slide number="03" eyebrow="RETRIEVAL · LESSON 01" syllabusLabel="SYLLABUS 1.1 · RETRIEVAL" sourceLabel="TEXTBOOK p.6 · TASK 1.01" title="Six quick conversions. No calculator." className="slide--l2-retrieval">
          <section className="lesson-grid"><article className="lesson-card"><span>DENARY → HEX</span><h3>96 · 215 · 374</h3><Reveal id="retrieval-a" visible={revealed.has("retrieval-a")} onToggle={toggleReveal}><b>60 · D7 · 176</b></Reveal></article><article className="lesson-card"><span>HEX → DENARY</span><h3>B4 · FF · 3A2C</h3><Reveal id="retrieval-b" visible={revealed.has("retrieval-b")} onToggle={toggleReveal}><b>180 · 255 · 14,892</b></Reveal></article><article className="lesson-card"><span>WHY NOW?</span><h3>Unit conversions use the same habit.</h3><p>Identify the base and place value before calculating.</p></article></section>
        </Slide>
      ),
    },
    {
      time: "5 min",
      focus: "Connect scientific notation and prefixes as equivalent ways to express a magnitude.",
      prompt: "Ask which form is easiest to read on a road sign, in a calculation and in a data sheet.",
      source: "Coursebook p.6, Table 1.05 and opening example.",
      content: (
        <Slide number="04" eyebrow="MAGNITUDE" sourceLabel="TEXTBOOK p.6 · TABLE 1.05" title="The quantity stays the same when the notation changes." className="slide--l2-magnitude">
          <div className="magnitude-hero"><div><b>23,567 m</b><span>ordinary notation</span></div><i>=</i><div><b>23.567 × 10³ m</b><span>standard form</span></div><i>=</i><div><b>23.567 km</b><span>decimal prefix</span></div></div>
          <p className="takeaway">A prefix packages a multiplier into a symbol. It changes the <b>unit scale</b>, not the quantity.</p>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Teach the exact decimal prefix names, case-sensitive symbols and powers of ten.",
      prompt: "Cover the factor column and ask students to reconstruct it from the exponent pattern.",
      source: "Coursebook p.7, Table 1.06; syllabus 1.1.",
      content: (
        <Slide number="05" eyebrow="DECIMAL PREFIXES" sourceLabel="TEXTBOOK p.7 · TABLE 1.06" title="Decimal prefixes scale by powers of 10." className="slide--l2-prefix">
          <section className="prefix-table"><div className="prefix-family"><header><b>Decimal family</b><span>BASE 10 · SI PREFIXES</span></header><div className="prefix-row"><span>kilo</span><b>k</b><span>10³ = 1,000</span></div><div className="prefix-row"><span>mega</span><b>M</b><span>10⁶</span></div><div className="prefix-row"><span>giga</span><b>G</b><span>10⁹</span></div><div className="prefix-row"><span>tera</span><b>T</b><span>10¹²</span></div></div><div className="l2-scale-ladder"><span>×1,000</span><b>kB</b><i>→</i><b>MB</b><i>→</i><b>GB</b><i>→</i><b>TB</b><small>move up: ÷1,000 · move down: ×1,000</small></div></section>
        </Slide>
      ),
    },
    {
      time: "8 min",
      focus: "Teach the unambiguous binary prefix symbols and their powers of two.",
      prompt: "Students say each prefix aloud. Stress the inserted i and the capitalisation of Ki, Mi, Gi, Ti.",
      source: "Coursebook p.7, Table 1.07; syllabus 1.1.",
      content: (
        <Slide number="06" eyebrow="BINARY PREFIXES" sourceLabel="TEXTBOOK p.7 · TABLE 1.07" title="Binary prefixes scale by powers of 2." className="slide--l2-prefix">
          <section className="prefix-table"><div className="prefix-family binary"><header><b>Binary family</b><span>BASE 2 · IEC PREFIXES</span></header><div className="prefix-row"><span>kibi</span><b>Ki</b><span>2¹⁰ = 1,024</span></div><div className="prefix-row"><span>mebi</span><b>Mi</b><span>2²⁰ = 1,048,576</span></div><div className="prefix-row"><span>gibi</span><b>Gi</b><span>2³⁰ = 1,073,741,824</span></div><div className="prefix-row"><span>tebi</span><b>Ti</b><span>2⁴⁰</span></div></div><div className="l2-scale-ladder binary"><span>×1,024</span><b>KiB</b><i>→</i><b>MiB</b><i>→</i><b>GiB</b><i>→</i><b>TiB</b><small>move up: ÷1,024 · move down: ×1,024</small></div></section>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Make the numerical gap and naming distinction memorable using one side-by-side comparison.",
      prompt: "Students calculate both differences before they are revealed: KiB-kB and GiB-GB.",
      source: "Coursebook p.7, decimal/binary ambiguity discussion; recent Paper 1 wording.",
      content: (
        <Slide number="07" eyebrow="DECIMAL ≠ BINARY" sourceLabel="TEXTBOOK p.7 · KEY DISTINCTION" title="The gap grows as the magnitude grows." className="slide--l2-versus">
          <section className="prefix-versus"><article><small>DECIMAL</small><b>1 kB = 1,000 B</b><p>1 GB = 1,000,000,000 B</p></article><i>versus</i><article><small>BINARY</small><b>1 KiB = 1,024 B</b><p>1 GiB = 1,073,741,824 B</p></article></section>
          <div className="l2-gap-row"><p><b>KiB − kB</b><span>24 bytes</span></p><p><b>GiB − GB</b><span>73,741,824 bytes</span></p></div>
        </Slide>
      ),
    },
    {
      time: "6 min",
      focus: "Prevent the frequent exam error of confusing the magnitude prefix with the bit/byte suffix.",
      prompt: "Ask students to read Mb and MB aloud, then convert 16 Mb to MB.",
      source: "Syllabus 1.1 notation; recurring Paper 1 mark-scheme convention.",
      content: (
        <Slide number="08" eyebrow="SYMBOLS ARE DATA" sourceLabel="EXAM NOTATION" title="Capitalisation is part of the answer." className="slide--l2-symbols">
          <section className="lesson-grid"><article className="lesson-card"><span>LOWER-CASE b</span><h3>bit</h3><p>16 Mb = 2 MB because 8 bits = 1 byte.</p></article><article className="lesson-card"><span>UPPER-CASE B</span><h3>byte</h3><p>Used for file and storage capacities in this lesson.</p></article><article className="lesson-card"><span>CASE TRAP</span><h3>kB, not KB</h3><p>kilo uses lower-case k; M, G and T are capital letters.</p></article></section>
          <p className="takeaway">Write the unit beside every intermediate value. A correct number with the wrong symbol may describe a different quantity.</p>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Give students one durable conversion rule rather than isolated formulas.",
      prompt: "Point to the direction: smaller unit means a larger number, so multiply; larger unit means a smaller number, so divide.",
      source: "Coursebook p.8, conversion method.",
      content: (
        <Slide number="09" eyebrow="CONVERSION METHOD" sourceLabel="TEXTBOOK p.8" title="Choose the family, then follow the direction." className="slide--l2-flow">
          <section className="l2-method-pair"><article><span>TO A SMALLER UNIT</span><div className="conversion-flow"><span>MiB</span><i>× 1,024</i><b>KiB</b></div><p>The numerical value increases.</p></article><article><span>TO A LARGER UNIT</span><div className="conversion-flow"><span>bytes</span><i>÷ 1,024²</i><b>MiB</b></div><p>The numerical value decreases.</p></article></section>
          <p className="l2-check-rule"><b>Sense check:</b> the quantity is unchanged, so convert back to verify.</p>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Model the first exact textbook byte-to-KiB example with explicit units.",
      prompt: "Ask why dividing by 1,000 would answer a different question.",
      source: "Coursebook p.8, conversion example; corrected typographical value.",
      content: (
        <Slide number="10" eyebrow="TEXTBOOK WORKED CALCULATION" sourceLabel="TEXTBOOK p.8 · CORRECTED" title="Convert 34,560 bytes to KiB." className="slide--l2-worked">
          <div className="l2-calculation"><span>34,560 B</span><i>÷ 1,024</i><b>33.75 KiB</b></div>
          <div className="worked-strip">34,560 B × <strong>1 KiB / 1,024 B</strong> = 33.75 KiB</div>
          <section className="lesson-grid two"><article className="lesson-card"><span>WHY DIVIDE?</span><p>KiB is the larger unit, so the number becomes smaller.</p></article><article className="lesson-card"><span>WHY 1,024?</span><p>Ki is a binary prefix: 2¹⁰, not 10³.</p></article></section>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Scale the same method to a squared multiplier and model sensible rounding.",
      prompt: "Students predict whether the answer should be close to 3.456 or much larger before calculating.",
      source: "Coursebook p.8, byte-to-MiB example.",
      content: (
        <Slide number="11" eyebrow="TEXTBOOK WORKED CALCULATION" sourceLabel="TEXTBOOK p.8" title="Convert 3,456,000 bytes to MiB." className="slide--l2-worked">
          <div className="l2-calculation"><span>3,456,000 B</span><i>÷ 1,024²</i><b>3.295898… MiB</b></div>
          <div className="worked-strip">3,456,000 ÷ <strong>1,048,576</strong> = 3.295898… ≈ <strong>3.296 MiB</strong></div>
          <p className="takeaway">Do not round the multiplier. Round only the final answer, and show enough working for the method mark.</p>
        </Slide>
      ),
    },
    {
      time: "8 min",
      focus: "Convert unlike magnitudes to one common unit and round down for complete items.",
      prompt: "Students identify the two decisions before calculation: common unit and whole-file rounding direction.",
      source: "Coursebook p.8, 4 GiB and 2.4 MiB file example; arithmetic corrected.",
      content: (
        <Slide number="12" eyebrow="COMMON MAGNITUDE" sourceLabel="TEXTBOOK p.8 · CORRECTED" title="How many complete 2.4 MiB files fit in 4 GiB?" className="slide--l2-files">
          <section className="l2-file-flow"><article><span>01 · NORMALISE</span><b>4 GiB × 1,024</b><strong>4,096 MiB</strong></article><i>→</i><article><span>02 · DIVIDE</span><b>4,096 ÷ 2.4</b><strong>1,706.666…</strong></article><i>→</i><article><span>03 · INTERPRET</span><b>complete files only</b><strong>1,706 files</strong></article></section>
          <p className="takeaway">A fraction of the next file does not fit. For a maximum count of complete items, <b>round down</b>.</p>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Use two printing errors as a critical-reading activity while preserving the correct textbook method.",
      prompt: "Students locate and repair both errors. Make clear that the coursebook method is sound but these printed numerals are not.",
      source: "Coursebook p.8, verified against the calculations.",
      content: (
        <Slide number="13" eyebrow="COURSEBOOK ERROR DETECTIVE" syllabusLabel="TEXTBOOK ERRATA" sourceLabel="TEXTBOOK p.8" title="Good computing checks the source and the arithmetic." className="slide--l2-errors">
          <section className="error-detective"><article><span>TYPO 01</span><code>printed: 344560 B<br />intended: 34560 B</code><p>The stated question and the correct quotient both require 34,560 bytes.</p></article><article><span>ARITHMETIC 02</span><code>printed: 4,096 ÷ 2.4 = 1,076<br />correct: 1,706.666…</code><p>Therefore 1,706 complete files fit.</p></article></section>
          <p className="l2-check-rule"><b>Verification habit:</b> estimate first, then reverse the conversion.</p>
        </Slide>
      ),
    },
    {
      time: "6 min",
      focus: "Apply the language and method to representative recent Paper 1 question forms.",
      prompt: "Run as a four-minute individual sprint, then reveal and spend two minutes diagnosing unit-family errors.",
      source: "Representative 2023-2024 Paper 1 questions; final item bridges to syllabus 1.2.",
      content: (
        <Slide number="14" eyebrow="PAST PAPER SPRINT" syllabusLabel="SYLLABUS 1.1 + BRIDGE 1.2" sourceLabel="RECENT PAPER STYLE · 2023-24" title="Normalise first. Compare second." className="slide--l2-exam lesson-dark">
          <section className="exam-sprint"><article><span>CORE · [4]</span><h3>Complete the values.</h3><p>3 KiB = ___ B<br />2 TB = ___ GB<br />Largest: 3 MiB, 3,300 kB or 3,300 KiB?</p><Reveal id="exam-core" visible={revealed.has("exam-core")} onToggle={toggleReveal}><p><b>3,072 B · 2,000 GB · 3,300 KiB</b></p></Reveal></article><article><span>BRIDGE TO 1.2 · [2]</span><h3>2,048 × 1,024 pixels, 10 bits each.</h3><p>Calculate the file size in MiB.</p><Reveal id="exam-bridge" visible={revealed.has("exam-bridge")} onToggle={toggleReveal}><p><b>2.5 MiB</b>: divide bits by 8, then bytes by 1,024².</p></Reveal></article></section>
        </Slide>
      ),
    },
    {
      time: "3 min",
      focus: "Finish with three diagnostic statements and direct students into the inline-answer homework.",
      prompt: "Students answer on mini-whiteboards; use the wrong options to identify the exact misconception.",
      source: "Lesson synthesis from Coursebook 1.02 and syllabus 1.1.",
      content: (
        <Slide number="15" eyebrow="EXIT TICKET" sourceLabel="LESSON 02 CHECK" title="Three symbols. Three decisions." className="slide--l2-exit">
          <section className="l2-exit-grid"><article><span>01</span><p>1 MiB = 1,000,000 B.</p><Reveal id="exit-a" visible={revealed.has("exit-a")} onToggle={toggleReveal}><b>False: 1,048,576 B.</b></Reveal></article><article><span>02</span><p>To change GiB to MiB, multiply by 1,024.</p><Reveal id="exit-b" visible={revealed.has("exit-b")} onToggle={toggleReveal}><b>True.</b></Reveal></article><article><span>03</span><p>3 MB and 3 MiB are equal.</p><Reveal id="exit-c" visible={revealed.has("exit-c")} onToggle={toggleReveal}><b>False: 3 MiB is larger.</b></Reveal></article></section>
          <div className="homework-callout"><b>HOMEWORK 02</b><span>30 marks · about 40 minutes · answers stay beside each question</span><strong>USE HOMEWORK TAB ↑</strong></div>
        </Slide>
      ),
    },
  ];

  const homework = (
    <HomeworkSheet
      lessonNumber="02"
      title="Binary magnitudes and decimal/binary prefixes"
      marks={30}
      minutes={40}
      sourceLabel="TEXTBOOK 1.02 · pp.6-8"
      instructions="No calculator unless your teacher allows one for checking. Write the unit at every step, keep decimal and binary prefix families separate, and round only the final answer. Answers remain inline for teaching and printing."
      sections={homeworkSections}
      challenge={{
        id: "l2-challenge",
        prompt: <p>By how many bytes is 3 GiB larger than 3 GB? Show both byte values before subtracting.</p>,
        answer: <p>3 GiB = 3 × 1,073,741,824 = 3,221,225,472 B. 3 GB = 3,000,000,000 B. Difference = <strong>221,225,472 B</strong>.</p>,
      }}
    />
  );

  return (
    <LessonShell
      lessonNumber="02"
      slides={slides}
      homework={homework}
      lessonLinks={[
        { label: "01", href: "../" },
        { label: "02", href: "../lesson-02/", active: true },
        { label: "03", href: "../lesson-03/" },
        { label: "04", href: "../lesson-04/" },
        { label: "05", href: "../lesson-05/" },
      ]}
      courseMapHref="../?view=roadmap"
      sourceSummary="Checked against the 2027-2029 syllabus, Coursebook printed pp.6-8 and representative Paper 1 questions from 2023-2025."
      sourceDetail="Syllabus p.14, Section 1.1 · Coursebook Section 1.02 printed pp.6-8: Tables 1.05-1.07 and byte-prefix calculations · Retrieval from Task 1.01 on p.6 · Recent anchors: 2023 M/J 11 Q3(d)(i), 2023 O/N 12 Q3(a), 2024 M/J 12 Q7(a), 2024 M/J 13 Q1(a) and 2024 O/N 11 Q1(a). The image-size item is explicitly labelled as a bridge to Syllabus 1.2. Coursebook p.8 typographical and arithmetic errors are corrected and identified."
    />
  );
}
