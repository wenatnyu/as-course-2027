"use client";

import {
  A2TheoryLesson,
  BinaryPointScale,
  BitRegister,
  ConceptCards,
  ExamPractice,
  FlowStrip,
  WorkedBoard,
} from "../../_components/a2-theory-lesson";
import { Slide, type HomeworkSection, type SlideData } from "../../_components/lesson-shell";

const homeworkSections: HomeworkSection[] = [
  {
    code: "A", title: "Encode real values", subtitle: "Convert, normalise, fit both fields and decode-check", marks: 10,
    questions: [
      {
        id: "a2-05-1", marks: 3, lines: 6,
        prompt: <><b>Encode +18.75</b> using a 10-bit mantissa and 6-bit exponent. Show working.</>,
        answer: <p><code>18.75 = 10010.11₂</code> <em>[1]</em>; normalised form is <code>0.1001011 × 2⁵</code> <em>[1]</em>; final answer <code>0100101100 │ 000101</code> <em>[1]</em>.</p>,
      },
      {
        id: "a2-05-2", marks: 3, lines: 6,
        prompt: <><b>Encode −18.75</b> in the same 10/6 format.</>,
        answer: <p>The positive fixed-width mantissa is <code>0100101100</code> <em>[1]</em>. Its two&apos;s complement is <code>1011010100</code> <em>[1]</em>. The exponent remains +5, so the answer is <code>1011010100 │ 000101</code> <em>[1]</em>.</p>,
      },
      {
        id: "a2-05-3", marks: 4, lines: 7,
        prompt: <><b>Encode +0.15625 and −0.15625</b> using an 8-bit mantissa and 4-bit exponent.</>,
        answer: <p><code>0.15625 = 0.00101₂ = 0.101 × 2⁻²</code> <em>[1]</em>. Positive: <code>01010000 │ 1110</code> <em>[1]</em>. Two&apos;s-complement the mantissa <em>[1]</em> to obtain negative: <code>10110000 │ 1110</code> <em>[1]</em>.</p>,
      },
    ],
  },
  {
    code: "B", title: "Normalise and allocate", subtitle: "Preserve the value, then explain the precision-range trade-off", marks: 10,
    questions: [
      {
        id: "a2-05-4", marks: 3, lines: 5,
        prompt: <><b>Normalise <code>00001101 │ 00110</code>.</b></>,
        answer: <p>Shift the mantissa left three places <em>[1]</em> to <code>01101000</code> <em>[1]</em>; reduce the exponent from +6 to +3, giving <code>01101000 │ 00011</code> <em>[1]</em>. Both forms represent 6.5.</p>,
      },
      {
        id: "a2-05-5", marks: 3, lines: 5,
        prompt: <><b>Normalise <code>11100100 │ 00101</code>.</b></>,
        answer: <p>Shift the mantissa left twice <em>[1]</em> to <code>10010000</code> <em>[1]</em>; reduce the exponent from +5 to +3, giving <code>10010000 │ 00011</code> <em>[1]</em>. Both forms represent −7.</p>,
      },
      {
        id: "a2-05-6", marks: 4, lines: 5,
        prompt: <><b>A 16-bit system changes from 12 mantissa / 4 exponent bits to 10 / 6.</b><p>Explain the two effects.</p></>,
        answer: <p>The mantissa loses two bits <em>[1]</em>, so precision/accuracy decreases and spacing between stored values grows <em>[1]</em>. The exponent gains two bits <em>[1]</em>, so a larger range of magnitudes can be represented <em>[1]</em>.</p>,
      },
    ],
  },
  {
    code: "C", title: "Approximation and paper practice", subtitle: "Recognise when a finite mantissa cannot keep the exact value", marks: 10,
    questions: [
      {
        id: "a2-05-7", marks: 4, lines: 7,
        prompt: <><b>Store 0.1</b> using an 8-bit mantissa, 5-bit exponent and truncation. Give the stored denary value.</>,
        answer: <p><code>0.1₁₀ = 0.000110011…₂ = 0.110011… × 2⁻³</code> <em>[1]</em>. Stored fields: <code>01100110 │ 11101</code> <em>[1]</em>. Stored value is <code>51/512 = 0.099609375</code> <em>[1]</em>, so it is an approximation <em>[1]</em>.</p>,
      },
      {
        id: "a2-05-8", marks: 3, lines: 6,
        prompt: <><span className="syllabus-mark">PAST PAPER PRACTICE</span><p><b>Store +201.125</b> using a 10-bit mantissa and 6-bit exponent. State the stored denary value.</p><p>Adapted from 9618/31 O/N 2024 Q1(a). [3]</p></>,
        answer: <p><code>201.125 = 11001001.001₂ = 0.11001001001 × 2⁸</code> <em>[1]</em>. Only nine fractional mantissa bits fit, giving <code>0110010010 │ 001000</code> <em>[1]</em>. This stores 201.0, losing 0.125 <em>[1]</em>.</p>,
      },
      {
        id: "a2-05-9", marks: 3, lines: 6,
        prompt: <><span className="syllabus-mark">PAST PAPER PRACTICE</span><p><b>Encode +54.8125</b> using a 12-bit mantissa and 4-bit exponent.</p><p>Adapted from 9618/32 M/J 2024 Q1(b). [3]</p></>,
        answer: <p><code>54.8125 = 110110.1101₂</code> <em>[1]</em>; normalise with exponent +6 <em>[1]</em>; final answer <code>011011011010 │ 0110</code> <em>[1]</em>.</p>,
      },
    ],
  },
];

export default function A2Lesson05Client() {
  const slides: SlideData[] = [
    {
      time: "5 min", focus: "Frame encoding as a reversible process, not pattern copying.", prompt: "What evidence would prove an encoded result is correct?", source: "Syllabus 13.3; coursebook Chapter 16 §16.03 printed pp.322–324.",
      content: <Slide number="01" eyebrow="A2 · PAPER 3" sourceLabel="TEXTBOOK Ch16 §16.03" syllabusLabel="SYLLABUS 13.3" className="a2-slide a2-title a2-dr-slide"><section className="a2-title-grid"><div><span>LESSON 05 · 90 MINUTES</span><h1>Convert. Normalise.<br /><em>Fit. Check.</em></h1><p>Denary to binary · negative mantissas · exponent scale · bit allocation · approximation</p></div><div className="a2-dr-hero-graphic" role="img" aria-label="A denary real number converted into mantissa and exponent fields"><strong>ENCODE</strong><span>13.25</span><span>1101.01</span><span>01101010</span><span>0100</span></div></section></Slide>,
    },
    {
      time: "7 min", focus: "Retrieve binary fractions and give two conversion routes.", prompt: "Build 0.6875 from place values, then verify by repeated multiplication by two.", source: "Coursebook p.323 conversion of representations; AS binary fraction retrieval.",
      content: <Slide number="02" eyebrow="DENARY FRACTION → BINARY" sourceLabel="TEXTBOOK p.323" syllabusLabel="13.3 · CONVERT" title="Use fractional place values—or multiply the remainder by two." className="a2-slide a2-dr-slide"><BinaryPointScale labels={["½", "¼", "⅛", "¹⁄₁₆", "¹⁄₃₂", "¹⁄₆₄", "¹⁄₁₂₈"]} /><WorkedBoard label="0.6875" result="0.1011₂"><code>0.5 + 0.125 + 0.0625 = 0.6875</code><br /><code>½ + ⅛ + ¹⁄₁₆ → .1011</code></WorkedBoard></Slide>,
    },
    {
      time: "5 min", focus: "Provide a six-step positive encoding workflow.", prompt: "Students identify the step most likely to catch an exponent error.", source: "Coursebook pp.323–324; recent Paper 3 mark-scheme working points.",
      content: <Slide number="03" eyebrow="POSITIVE ENCODING WORKFLOW" sourceLabel="TEXTBOOK pp.323–324" syllabusLabel="13.3 · CONVERT" title="Make every transformation visible, then decode-check." className="a2-slide a2-dr-slide"><FlowStrip steps={[{ eyebrow: "01", title: "convert", body: "whole + fraction" }, { eyebrow: "02", title: "add sign", body: "positive starts 0" }, { eyebrow: "03", title: "normalise", body: "first bits 01" }, { eyebrow: "04", title: "fit fields", body: "pad or truncate" }, { eyebrow: "05", title: "encode E" }, { eyebrow: "06", title: "decode-check" }]} /></Slide>,
    },
    {
      time: "8 min", focus: "Work a complete exact positive encoding.", prompt: "Students narrate the origin of each stored bit and the exponent 4.", source: "Coursebook Worked Example 16.01 method; independently verified example.",
      content: <Slide number="04" eyebrow="WORKED ENCODE · +13.25" sourceLabel="TEXTBOOK WE16.01 METHOD" syllabusLabel="13.3 · CONVERT" title="Move the point four places to obtain a normalised mantissa." className="a2-slide a2-dr-slide"><FlowStrip steps={[{ eyebrow: "DENARY", title: "13.25" }, { eyebrow: "BINARY", title: <code>1101.01</code> }, { eyebrow: "NORMALISE", title: <code>0.1101010 × 2⁴</code> }, { eyebrow: "STORE", title: <code>01101010 │ 0100</code> }]} /><BitRegister mantissa="01101010" exponent="0100" /></Slide>,
    },
    {
      time: "6 min", focus: "Teach negative encoding at a fixed mantissa width.", prompt: "Why is only the mantissa complemented, while the exponent stays +4?", source: "Coursebook pp.323–324; two's-complement convention in syllabus 13.3.",
      content: <Slide number="05" eyebrow="NEGATIVE VALUES" sourceLabel="TEXTBOOK pp.323–324" syllabusLabel="13.3 · TWO'S COMPLEMENT" title="Choose the scale first; two's-complement the fixed-width mantissa only." className="a2-slide a2-dr-slide"><ConceptCards items={[{ eyebrow: "1 · MAGNITUDE", title: <code>01101010</code>, body: "+13.25 at exponent +4" }, { eyebrow: "2 · INVERT", title: <code>10010101</code>, body: "flip all 8 mantissa bits" }, { eyebrow: "3 · ADD ONE", title: <code>10010110</code>, body: "the mantissa for −13.25" }]} /><p className="a2-alert"><b>Exponent</b><span>The exponent controls scale, not sign. Keep <code>0100</code> for both +13.25 and −13.25.</span></p></Slide>,
    },
    {
      time: "8 min", focus: "Complete and verify a negative encoding.", prompt: "Decode the final mantissa from −1 plus its set fractional weights.", source: "Coursebook negative conversion method p.324.",
      content: <Slide number="06" eyebrow="WORKED ENCODE · −13.25" sourceLabel="TEXTBOOK p.324" syllabusLabel="13.3 · CONVERT" title="The final check should reconstruct the original negative value." className="a2-slide a2-dr-slide"><BitRegister mantissa="10010110" exponent="0100" /><WorkedBoard label="DECODE-CHECK" result="−13.25"><code>M = −1 + ⅛ + ¹⁄₃₂ + ¹⁄₆₄ = −0.828125</code><br /><code>E = +4</code><br /><code>−0.828125 × 2⁴ = −13.25</code></WorkedBoard></Slide>,
    },
    {
      time: "5 min", focus: "Detach number sign from exponent sign.", prompt: "Predict which fields change when +202 becomes −202.", source: "9618/31 O/N 2022 Q1(a)–(b) published mark scheme.",
      content: <Slide number="07" eyebrow="SCALE ≠ SIGN" sourceLabel="9618/31 O/N 2022 · Q1" syllabusLabel="13.3 · CONVERT" title="Positive and negative values of equal magnitude use the same exponent." className="a2-slide a2-dr-slide"><section className="a2-dr-split"><article><span>+202</span><b>positive mantissa</b><p>Normalised magnitude sets the exponent.</p></article><article><span>−202</span><b>two&apos;s-complement mantissa</b><p>The binary-point movement—and exponent—remain the same.</p></article></section></Slide>,
    },
    {
      time: "8 min", focus: "Encode a recent Paper 3 positive value under time pressure.", prompt: "Four minutes, then reveal and annotate conversion, exponent and final fields.", source: "Adapted from Cambridge 9618/32 M/J 2024 Q1(b).",
      content: <Slide number="08" eyebrow="PAST PAPER WORKSHOP" sourceLabel="9618/32 M/J 2024 · Q1(b)" syllabusLabel="13.3 · 3 MARKS" title="Encode +54.8125 in a 12/4 system." className="a2-slide a2-paper a2-dr-slide"><ExamPractice reference="9618/32 M/J 2024 · Q1(b) · ADAPTED" marks={3} prompt={<p>Both fields use two&apos;s complement. Show the binary conversion and normalisation.</p>} answer={<ul><li><code>54.8125 = 110110.1101₂</code>. [1]</li><li>Move the point six places; exponent <code>0110</code>. [1]</li><li>Final answer: <code>011011011010 │ 0110</code>. [1]</li></ul>} /></Slide>,
    },
    {
      time: "8 min", focus: "Encode a negative recent Paper 3 value and verify its two's complement.", prompt: "Students compare the positive magnitude and negative mantissa bit by bit.", source: "Adapted from Cambridge 9618/32 O/N 2024 Q4(b).",
      content: <Slide number="09" eyebrow="PAST PAPER WORKSHOP" sourceLabel="9618/32 O/N 2024 · Q4(b)" syllabusLabel="13.3 · 4 MARKS" title="Encode −49.1875 in a 12/4 system." className="a2-slide a2-paper a2-dr-slide"><ExamPractice reference="9618/32 O/N 2024 · Q4(b) · ADAPTED" marks={4} prompt={<p>Show the magnitude conversion, two&apos;s-complement mantissa and exponent.</p>} answer={<ul><li><code>49.1875 = 110001.0011₂</code>. [1]</li><li>At exponent +6, two&apos;s-complement the 12-bit mantissa. [1]</li><li>Exact mantissa <code>100111011010</code>. [1]</li><li>Final answer: <code>100111011010 │ 0110</code>. [1]</li></ul>} /></Slide>,
    },
    {
      time: "7 min", focus: "Apply normalisation to positive and negative non-zero values.", prompt: "Pairs mark repeated sign bits, count shifts, and prove each value is preserved.", source: "Coursebook pp.322–323.",
      content: <Slide number="10" eyebrow="NORMALISATION CLINIC" sourceLabel="TEXTBOOK pp.322–323" syllabusLabel="13.3 · NORMALISE" title="Shift until the first two mantissa bits differ." className="a2-slide a2-dr-slide"><section className="a2-dr-split"><article><span>POSITIVE</span><b><code>00001101 │ 00110</code></b><p>Three left shifts → <code>01101000 │ 00011</code> → 6.5.</p></article><article><span>NEGATIVE</span><b><code>11100100 │ 00101</code></b><p>Two left shifts → <code>10010000 │ 00011</code> → −7.</p></article></section><p className="a2-answer-band"><b>RULE</b>one mantissa left shift → exponent decreases by one</p></Slide>,
    },
    {
      time: "5 min", focus: "Introduce the fixed-word precision versus range trade-off.", prompt: "If two bits move from exponent to mantissa, what improves and what shrinks?",
      source: "Coursebook p.322; 9618/32 M/J 2024 Q1(a).",
      content: <Slide number="11" eyebrow="BIT ALLOCATION" sourceLabel="TEXTBOOK p.322 · M/J 2024 Q1(a)" syllabusLabel="13.3 · EFFECTS" title="With a fixed word, precision and range compete for bits." className="a2-slide a2-dr-slide"><section className="a2-dr-balance"><article><span>MORE MANTISSA BITS</span><b>greater precision</b><p>More significant binary digits; smaller gaps between representable values.</p></article><i>↔</i><article><span>MORE EXPONENT BITS</span><b>greater range</b><p>Larger positive and negative exponents; more extreme magnitudes.</p></article></section></Slide>,
    },
    {
      time: "6 min", focus: "Classify finite and recurring binary fractions.", prompt: "Students justify each card by the denominator after reducing the fraction.", source: "Coursebook p.323; syllabus approximation requirement.",
      content: <Slide number="12" eyebrow="EXACT OR RECURRING?" sourceLabel="TEXTBOOK p.323" syllabusLabel="13.3 · APPROXIMATION" title="A finite word cannot store every real value exactly." className="a2-slide a2-dr-slide"><ConceptCards columns={4} items={[{ eyebrow: "0.25", title: "exact", body: "1/4; denominator is 2²" }, { eyebrow: "0.125", title: "exact", body: "1/8; denominator is 2³" }, { eyebrow: "0.1", title: "recurring", body: "1/10 includes factor 5" }, { eyebrow: "0.2", title: "recurring", body: "1/5 cannot terminate in base 2" }]} /></Slide>,
    },
    {
      time: "5 min", focus: "State the course's safe truncation and rounding convention.", prompt: "Why should students not invent IEEE round-to-nearest-even?",
      source: "Recent Cambridge Paper 3 mark schemes; coursebook pp.323–325.",
      content: <Slide number="13" eyebrow="WHEN BITS RUN OUT" sourceLabel="TEXTBOOK pp.323–325" syllabusLabel="13.3 · ROUNDING" title="Keep only what fits unless the question supplies a rounding rule." className="a2-slide a2-dr-slide"><ConceptCards items={[{ eyebrow: "SOURCE", title: "0.11001001001…", body: "more digits than the mantissa can hold" }, { eyebrow: "TRUNCATE", title: "0.110010010", body: "discard least-significant extra bits" }, { eyebrow: "CONSEQUENCE", title: "stored value differs", body: "loss of precision / rounding error" }]} /><p className="a2-alert"><b>Exam convention</b><span>Recent mark schemes truncate when space runs out; do not assume an IEEE rounding mode unless stated.</span></p></Slide>,
    },
    {
      time: "5 min", focus: "Show an exact input losing precision because the mantissa is too short.", prompt: "Identify the first source bit that cannot be stored and calculate the denary error.", source: "Adapted from Cambridge 9618/31 O/N 2024 Q1(a).",
      content: <Slide number="14" eyebrow="PAST PAPER PRECISION CHECK" sourceLabel="9618/31 O/N 2024 · Q1(a)" syllabusLabel="13.3 · APPROXIMATION" title="201.125 needs more mantissa bits than the format provides." className="a2-slide a2-paper a2-dr-slide"><ExamPractice reference="9618/31 O/N 2024 · Q1(a) · ADAPTED" marks={3} prompt={<p>Encode +201.125 using a 10-bit mantissa and 6-bit exponent. State any loss.</p>} answer={<ul><li><code>201.125 = 11001001.001₂ = 0.11001001001 × 2⁸</code>. [1]</li><li><code>0110010010 │ 001000</code>. [1]</li><li>The stored value is 201.0: precision loss / error of 0.125. [1]</li></ul>} /></Slide>,
    },
    {
      time: "2 min", focus: "Check the complete encoding routine before homework.", prompt: "Students encode +5.5 in an 8/4 system and state whether it is exact.", source: "Lesson synthesis aligned to syllabus 13.3 conversion, normalisation and bit allocation.",
      content: <Slide number="15" eyebrow="EXIT TICKET" sourceLabel="TEXTBOOK §16.03" syllabusLabel="SYLLABUS 13.3" title="Can you encode—and prove the stored value?" className="a2-slide a2-exit a2-dr-slide"><section className="a2-exit-grid"><article><span>01</span><p>Convert +5.5 to binary.</p></article><article><span>02</span><p>Normalise and fit an 8/4 word.</p></article><article><span>03</span><p>Decode-check and state whether it is exact.</p></article></section><div className="homework-callout"><b>HOMEWORK 05</b><span>30 marks · encode + normalise + precision · inline answers</span><strong>45 min</strong></div></Slide>,
    },
  ];

  return <A2TheoryLesson lessonNumber="05" title="Conversion, normalisation and bit allocation" syllabusLabel="SYLLABUS 13.3" sourceLabel="TEXTBOOK Ch16 §16.03 · pp.322–324" slides={slides} homeworkSections={homeworkSections} sourceSummary="Official 2027–2029 syllabus §13.3 · endorsed coursebook Chapter 16 §16.03 printed pp.322–324 · verified 2022 and 2024 Paper 3 questions and mark schemes" sourceDetail="Examples use the Cambridge two's-complement mantissa/exponent format. Where a finite mantissa cannot hold every source bit, the lesson follows recent Paper 3 mark-scheme truncation rather than assuming an IEEE rounding mode." />;
}
