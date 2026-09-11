"use client";

import {
  A2TheoryLesson,
  BinaryPointScale,
  BitRegister,
  CompareTable,
  ConceptCards,
  ExamPractice,
  Formula,
} from "../../_components/a2-theory-lesson";
import { Slide, type HomeworkSection, type SlideData } from "../../_components/lesson-shell";

const homeworkSections: HomeworkSection[] = [
  {
    code: "A", title: "Precision and range", subtitle: "Explain what changes when a fixed word is reallocated", marks: 10,
    questions: [
      {
        id: "a2-06-1", marks: 4, lines: 5,
        prompt: <><b>A 16-bit format changes from 12 mantissa / 4 exponent bits to 10 / 6.</b><p>Explain the effects.</p></>,
        answer: <p>The mantissa loses bits <em>[1]</em>, so precision/accuracy decreases <em>[1]</em>. The exponent gains bits <em>[1]</em>, so the range of magnitudes increases <em>[1]</em>.</p>,
      },
      {
        id: "a2-06-2", marks: 4, lines: 5,
        prompt: <><b>A 16-bit format changes from 8 mantissa / 8 exponent bits to 12 / 4.</b><p>Explain the effects.</p></>,
        answer: <p>The mantissa gains bits <em>[1]</em>, so precision improves and spacing becomes smaller <em>[1]</em>. The exponent loses bits <em>[1]</em>, so the representable range decreases <em>[1]</em>.</p>,
      },
      {
        id: "a2-06-3", marks: 2, lines: 3,
        prompt: <><b>State the denary range</b> of a 5-bit two&apos;s-complement exponent.</>,
        answer: <p>The minimum is <code>−2⁴ = −16</code> <em>[1]</em> and the maximum is <code>2⁴ − 1 = +15</code> <em>[1]</em>.</p>,
      },
    ],
  },
  {
    code: "B", title: "Approximation and rounding", subtitle: "Connect finite storage to the size and accumulation of error", marks: 10,
    questions: [
      {
        id: "a2-06-4", marks: 3, lines: 4,
        prompt: <><b>State whether each value has a finite exact binary fraction:</b><p>13.25, 0.2 and 65.20.</p></>,
        answer: <p>13.25 is exact <em>[1]</em>. 0.2 is recurring/approximate <em>[1]</em>. 65.20 is also approximate because its 0.20 fraction recurs in binary <em>[1]</em>.</p>,
      },
      {
        id: "a2-06-5", marks: 4, lines: 7,
        prompt: <><span className="syllabus-mark">PAST PAPER PRACTICE</span><p><b>Store 201.125</b> in a 10-bit mantissa / 6-bit exponent format and calculate the absolute error.</p><p>Adapted from 9618/31 O/N 2024 Q1(a). [4]</p></>,
        answer: <p><code>201.125 = 11001001.001₂</code> <em>[1]</em>; normalise with exponent +8 <em>[1]</em>; store <code>0110010010 │ 001000</code> <em>[1]</em>. This represents 201.0, so absolute error is 0.125 <em>[1]</em>.</p>,
      },
      {
        id: "a2-06-6", marks: 3, lines: 4,
        prompt: <><b>Explain how rounding error can accumulate</b> and state one way to reduce its effect.</>,
        answer: <p>Each finite-precision operation can introduce a small difference <em>[1]</em>; repeated calculations can accumulate these differences into a significant error <em>[1]</em>. More mantissa bits / double precision reduces the error <em>[1]</em>.</p>,
      },
    ],
  },
  {
    code: "C", title: "Error conditions and checkpoint", subtitle: "Define both boundaries, then integrate a published comparison task", marks: 10,
    questions: [
      {
        id: "a2-06-7", marks: 2, lines: 3,
        prompt: <><b>Define underflow</b> for a floating-point calculation.</>,
        answer: <p>An arithmetic operation produces a non-zero result <em>[1]</em> whose magnitude is too small to be represented precisely in the available format, so it may lose precision or be treated as zero <em>[1]</em>.</p>,
      },
      {
        id: "a2-06-8", marks: 2, lines: 3,
        prompt: <><b>Define overflow</b> for a floating-point calculation.</>,
        answer: <p>An operation produces a result outside the format&apos;s representable range <em>[1]</em>, so the exponent or most-significant information cannot be stored correctly <em>[1]</em>.</p>,
      },
      {
        id: "a2-06-9", marks: 6, lines: 8,
        prompt: <><span className="syllabus-mark">PAST PAPER PRACTICE</span><p><b>Represent 113.75 in systems with 10/6 and 8/8 mantissa/exponent bits, then explain the difference.</b></p><p>Adapted from 9618/31 M/J 2023 Q1. [6]</p></>,
        answer: <p><code>113.75 = 1110001.11₂</code> and exponent +7 <em>[2]</em>. System 1: <code>0111000111 │ 000111</code> <em>[1]</em>. System 2: <code>01110001 │ 00000111</code> <em>[1]</em>. System 2 lacks enough mantissa bits <em>[1]</em>, so least-significant bits are truncated and precision is lost; it stores 113 rather than 113.75 <em>[1]</em>.</p>,
      },
    ],
  },
];

export default function A2Lesson06Client() {
  const slides: SlideData[] = [
    {
      time: "5 min", focus: "Open with four outcomes students must distinguish by cause.", prompt: "Classify: exact, approximate, underflow or overflow—and justify with one phrase.", source: "Syllabus 13.3; coursebook Chapter 16 §16.03 printed pp.322–325.",
      content: <Slide number="01" eyebrow="A2 · PAPER 3" sourceLabel="TEXTBOOK Ch16 §16.03" syllabusLabel="SYLLABUS 13.3" className="a2-slide a2-title a2-dr-slide"><section className="a2-title-grid"><div><span>LESSON 06 · 90 MINUTES</span><h1>Precision has a cost.<br /><em>Range has a boundary.</em></h1><p>Bit allocation · spacing · approximation · rounding · underflow · overflow · Chapter 13 checkpoint</p></div><div className="a2-dr-hero-graphic" role="img" aria-label="Precision and range balanced inside one fixed word"><strong>16 BITS</strong><span>PRECISION</span><span>RANGE</span><span>UNDERFLOW</span><span>OVERFLOW</span></div></section></Slide>,
    },
    {
      time: "5 min", focus: "Represent floating-point values as discrete grid points rather than a continuum.", prompt: "Where would a value between two grid points have to go?",
      source: "Syllabus approximation requirement; coursebook pp.323–325.",
      content: <Slide number="02" eyebrow="A REPRESENTABLE GRID" sourceLabel="TEXTBOOK pp.323–325" syllabusLabel="13.3 · APPROXIMATION" title="A finite word stores selected points on the real number line." className="a2-slide a2-dr-slide"><BinaryPointScale labels={["12.0", "12.25", "12.5", "12.75", "13.0", "13.25", "13.5", "13.75"]} /><ConceptCards columns={3} items={[{ eyebrow: "ON THE GRID", title: "13.25", body: "stored exactly" }, { eyebrow: "BETWEEN POINTS", title: "13.30", body: "requires an approximation" }, { eyebrow: "CONSEQUENCE", title: "small error", body: "stored value differs from intended value" }]} /></Slide>,
    },
    {
      time: "7 min", focus: "Relate mantissa length to the gap between adjacent values.", prompt: "At a fixed exponent, predict the effect of adding one mantissa bit.", source: "Coursebook p.322 precision discussion; derived binary spacing relation.",
      content: <Slide number="03" eyebrow="MANTISSA BITS → PRECISION" sourceLabel="TEXTBOOK p.322" syllabusLabel="13.3 · BIT ALLOCATION" title="One more mantissa bit halves the spacing at a fixed exponent." className="a2-slide a2-dr-slide"><Formula>spacing = 2^(E − (p − 1))</Formula><ConceptCards items={[{ eyebrow: "p", title: "mantissa bits", body: "including its sign bit" }, { eyebrow: "E", title: "current exponent", body: "sets the scale band" }, { eyebrow: "MORE p", title: "smaller spacing", body: "greater precision / accuracy" }]} /></Slide>,
    },
    {
      time: "7 min", focus: "Derive the two's-complement exponent range and connect it to magnitude range.", prompt: "Calculate the exponent ranges for 4 bits and 8 bits.", source: "Coursebook pp.321–322; two's-complement exponent convention.",
      content: <Slide number="04" eyebrow="EXPONENT BITS → RANGE" sourceLabel="TEXTBOOK pp.321–322" syllabusLabel="13.3 · BIT ALLOCATION" title="More exponent bits allow more extreme powers of two." className="a2-slide a2-dr-slide"><Formula>−2^(q−1) ≤ E ≤ 2^(q−1) − 1</Formula><section className="a2-dr-split"><article><span>4-BIT EXPONENT</span><b>−8 to +7</b><p>Smaller interval of scale factors.</p></article><article><span>8-BIT EXPONENT</span><b>−128 to +127</b><p>Far wider range of magnitudes.</p></article></section></Slide>,
    },
    {
      time: "6 min", focus: "Make the fixed-word trade-off explicit.", prompt: "Students complete both arrows for 12/4 → 8/8.", source: "Syllabus 13.3; coursebook p.322; 9618/32 M/J 2024 Q1(a).",
      content: <Slide number="05" eyebrow="ONE 16-BIT WORD · TWO DESIGNS" sourceLabel="M/J 2024 Q1(a) · TEXTBOOK p.322" syllabusLabel="13.3 · EFFECTS" title="Reallocating bits improves one property by reducing the other." className="a2-slide a2-dr-slide"><section className="a2-dr-balance"><article><span>12 MANTISSA · 4 EXPONENT</span><b>finer precision</b><p>More significant digits; narrower range.</p></article><i>↔</i><article><span>8 MANTISSA · 8 EXPONENT</span><b>wider range</b><p>More extreme exponents; coarser precision.</p></article></section></Slide>,
    },
    {
      time: "9 min", focus: "Use a published comparison to show real precision loss.", prompt: "Students encode in the first system, then identify exactly which source bits system 2 drops.", source: "Adapted from Cambridge 9618/31 M/J 2023 Q1(a)–(b).",
      content: <Slide number="06" eyebrow="PAST PAPER CASE STUDY" sourceLabel="9618/31 M/J 2023 · Q1" syllabusLabel="13.3 · 6 MARKS" title="The same 16 bits can preserve 113.75—or only 113." className="a2-slide a2-paper a2-dr-slide"><ExamPractice reference="9618/31 M/J 2023 · Q1(a)–(b) · ADAPTED" marks={6} prompt={<><p><code>113.75 = 1110001.11₂ = 0.111000111 × 2⁷</code></p><p>Represent it in 10/6 and 8/8 systems; explain the difference.</p></>} answer={<ul><li>Exponent is +7. [1]</li><li>10/6: <code>0111000111 │ 000111</code>, exactly 113.75. [2]</li><li>8/8: <code>01110001 │ 00000111</code>, representing 113. [1]</li><li>The shorter mantissa cannot hold every source bit; least-significant bits are truncated, reducing precision. [2]</li></ul>} /></Slide>,
    },
    {
      time: "6 min", focus: "Give a mathematical test for finite binary fractions.", prompt: "Reduce each fraction first, then inspect the denominator's prime factors.", source: "Coursebook p.323 approximation discussion.",
      content: <Slide number="07" eyebrow="WHICH FRACTIONS TERMINATE?" sourceLabel="TEXTBOOK p.323" syllabusLabel="13.3 · APPROXIMATION" title="A reduced fraction terminates in binary only when its denominator is a power of two." className="a2-slide a2-dr-slide"><CompareTable headers={["Denary", "Reduced fraction", "Binary result"]} rows={[["0.125", "1/8", "finite: 0.001"], ["0.2", "1/5", "recurring"], ["0.1", "1/10", "recurring"], ["13.25", "53/4", "finite: 1101.01"]]} /></Slide>,
    },
    {
      time: "6 min", focus: "Distinguish a storage action from its error consequence.", prompt: "For the same source bits, compare truncation with a hypothetical round-to-nearest result.", source: "Syllabus rounding-error wording; recent Paper 3 mark schemes.",
      content: <Slide number="08" eyebrow="TRUNCATION AND ROUNDING ERROR" sourceLabel="PAPER 3 MARK-SCHEME CONVENTION" syllabusLabel="13.3 · ROUNDING" title="The representation choice creates the difference; the difference is the error." className="a2-slide a2-dr-slide"><ConceptCards items={[{ eyebrow: "TRUNCATE", title: "discard extra low bits", body: "the action commonly shown by recent mark schemes" }, { eyebrow: "ROUND", title: "choose a nearby stored value", body: "only follow a stated rule" }, { eyebrow: "ERROR", title: "stored − intended", body: "non-zero whenever the values differ" }]} /><p className="a2-alert"><b>Language</b><span>Cambridge may call finite-precision loss a rounding error even when the shown storage step truncates.</span></p></Slide>,
    },
    {
      time: "5 min", focus: "Show how repeated operations amplify individually small differences.", prompt: "Why can a weather or finance model drift even if each individual error is tiny?",
      source: "Coursebook p.325 problems with floating-point numbers.",
      content: <Slide number="09" eyebrow="ERROR ACCUMULATION" sourceLabel="TEXTBOOK p.325" syllabusLabel="13.3 · ROUNDING" title="A small difference can be carried into every later calculation." className="a2-slide a2-dr-slide"><ConceptCards columns={4} items={[{ eyebrow: "STEP 1", title: "+0.1", body: "store approximation" }, { eyebrow: "STEP 2", title: "+0.1", body: "reuse approximate result" }, { eyebrow: "STEP n", title: "repeat", body: "differences may accumulate" }, { eyebrow: "REDUCE", title: "more mantissa bits", body: "smaller error per step" }]} /></Slide>,
    },
    {
      time: "8 min", focus: "Derive maximum magnitudes from both field limits.", prompt: "Students build the largest positive and most-negative 4/4 words, then calculate their values.", source: "Coursebook p.321 Table 16.03; two's-complement limits.",
      content: <Slide number="10" eyebrow="REPRESENTABLE EXTREMES" sourceLabel="TEXTBOOK p.321 · TABLE 16.03" syllabusLabel="13.3 · RANGE" title="The mantissa limit and maximum exponent together set the boundary." className="a2-slide a2-dr-slide"><section className="a2-dr-split"><article><span>LARGEST POSITIVE · 4/4</span><b><code>0111 │ 0111</code></b><p><code>0.875 × 2⁷ = 112</code></p></article><article><span>LARGEST NEGATIVE MAGNITUDE</span><b><code>1000 │ 0111</code></b><p><code>−1 × 2⁷ = −128</code></p></article></section><Formula>max positive = (1 − 2^(−(p−1))) × 2^Emax</Formula></Slide>,
    },
    {
      time: "6 min", focus: "Define overflow through an operation and an exceeded range.", prompt: "Which field reaches its limit first in the displayed multiplication?",
      source: "Coursebook p.325; syllabus 13.3 overflow requirement.",
      content: <Slide number="11" eyebrow="OVERFLOW" sourceLabel="TEXTBOOK p.325" syllabusLabel="13.3 · OVERFLOW" title="The calculated magnitude lies beyond the largest representable value." className="a2-slide a2-dr-slide"><BitRegister mantissa="01111111" exponent="0111" /><ConceptCards items={[{ eyebrow: "CAUSE", title: "large operation", body: "for example, multiplication" }, { eyebrow: "BOUNDARY", title: "required E > Emax", body: "or significant information will not fit" }, { eyebrow: "RESULT", title: "cannot represent correctly", body: "overflow condition" }]} /></Slide>,
    },
    {
      time: "6 min", focus: "Define underflow without assuming an unstated subnormal policy.", prompt: "Why is representing a tiny non-zero result as zero a risk?",
      source: "Coursebook p.325; 9618/32 O/N 2022 Q1(c).",
      content: <Slide number="12" eyebrow="UNDERFLOW" sourceLabel="TEXTBOOK p.325 · O/N 2022 Q1(c)" syllabusLabel="13.3 · UNDERFLOW" title="The non-zero result is too small for the available precision and range." className="a2-slide a2-dr-slide"><ConceptCards items={[{ eyebrow: "CAUSE", title: "small ÷ large", body: "or repeated division" }, { eyebrow: "BOUNDARY", title: "magnitude below the usable minimum", body: "available word cannot preserve it" }, { eyebrow: "CONSEQUENCE", title: "precision loss or zero", body: "underflow condition" }]} /><p className="a2-alert"><b>Safe definition</b><span>Name the operation, the non-zero result and the failure to represent it precisely.</span></p></Slide>,
    },
    {
      time: "5 min", focus: "Resolve a textbook subtlety around tiny unnormalised patterns.", prompt: "Which first-bit rule shows that 0001 is not a normalised positive mantissa?",
      source: "Coursebook pp.321–323, Table 16.03 and Extension Question 16.03.",
      content: <Slide number="13" eyebrow="TEXTBOOK CAVEAT" sourceLabel="TEXTBOOK TABLE 16.03 · EXTENSION 16.03" syllabusLabel="13.3 · NORMALISATION" title="A tiny bit pattern may be valid in a table yet still be unnormalised." className="a2-slide a2-dr-slide"><section className="a2-dr-split"><article><span>TABLE EXAMPLE</span><b><code>0001 │ 1000</code></b><p>Shows a very small stored pattern, but the positive mantissa starts <code>00</code>.</p></article><article><span>EXAM CONDITION</span><b>if “normalised” is stated</b><p>Require a non-zero positive mantissa to start <code>01</code>, or negative to start <code>10</code>.</p></article></section></Slide>,
    },
    {
      time: "6 min", focus: "Rehearse three frequent Paper 3 explanation patterns and reconnect all of Chapter 13.", prompt: "Students choose one station, write mark points, then teach it to another pair.", source: "9618/32 M/J 2024 Q1(a); 9618/31 O/N 2023 Q1(b); 9618/32 O/N 2022 Q1(c).",
      content: <Slide number="14" eyebrow="CHAPTER 13 CHECKPOINT" sourceLabel="PAPER 3 · 2022–2024" syllabusLabel="13.1 + 13.2 + 13.3" title="Choose the representation—and explain the consequence." className="a2-slide a2-dr-slide"><ConceptCards items={[{ eyebrow: "STATION A · TYPES", title: "model a valid state", body: "choose enum, pointer, set, record or class/object" }, { eyebrow: "STATION B · FILES", title: "arrange and reach", body: "organisation + access + key/hash" }, { eyebrow: "STATION C · FLOATS", title: "format and limits", body: "convert + normalise + precision/range + errors" }]} /><p className="a2-answer-band"><b>EXAM ROUTINE</b>identify property → name method → apply to data → state consequence</p></Slide>,
    },
    {
      time: "3 min", focus: "Close the chapter with a seven-point self-audit and final homework.", prompt: "Students mark the first item they still cannot explain without notes.", source: "Full synthesis of syllabus 13.1–13.3.",
      content: <Slide number="15" eyebrow="SECTION 13 COMPLETE" sourceLabel="TEXTBOOK Ch16 · pp.313–325" syllabusLabel="SYLLABUS 13.1–13.3" title="One chapter. Seven checks." className="a2-slide a2-exit a2-dr-slide"><section className="a2-exit-grid"><article><span>01</span><p>types · files · hashing</p></article><article><span>02</span><p>format · convert · normalise</p></article><article><span>03</span><p>precision/range · errors</p></article></section><div className="homework-callout"><b>HOMEWORK 06</b><span>30-mark Chapter 13 checkpoint · inline answers · printable student copy</span><strong>45 min</strong></div></Slide>,
    },
  ];

  return <A2TheoryLesson lessonNumber="06" title="Approximation, errors and Chapter 13 review" syllabusLabel="SYLLABUS 13.3" sourceLabel="TEXTBOOK Ch16 §16.03 · pp.322–325" slides={slides} homeworkSections={homeworkSections} sourceSummary="Official 2027–2029 syllabus §13.3 · endorsed coursebook Chapter 16 §16.03 printed pp.322–325 · verified 2022–2024 Paper 3 questions and mark schemes" sourceDetail="The final lesson distinguishes precision from range, finite-storage error from the action used to shorten a value, and underflow from overflow. The checkpoint reconnects all of syllabus Section 13." />;
}
