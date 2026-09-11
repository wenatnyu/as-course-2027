"use client";

import {
  A2TheoryLesson,
  BinaryPointScale,
  BitRegister,
  ConceptCards,
  ExamPractice,
  FlowStrip,
  Formula,
  WorkedBoard,
} from "../../_components/a2-theory-lesson";
import { Slide, type HomeworkSection, type SlideData } from "../../_components/lesson-shell";

const homeworkSections: HomeworkSection[] = [
  {
    code: "A", title: "Decode the fields", subtitle: "Treat mantissa and exponent as two separate two's-complement values", marks: 10,
    questions: [
      {
        id: "a2-04-1", marks: 3, lines: 5,
        prompt: <><b>Convert <code>01011100 │ 00101</code> to denary.</b><p>The mantissa has 8 bits and the exponent has 5 bits.</p></>,
        answer: <p>Exponent <code>00101 = +5</code> <em>[1]</em>. Mantissa <code>0.1011100 = 0.71875</code> <em>[1]</em>. <code>0.71875 × 2⁵ = 23</code> <em>[1]</em>.</p>,
      },
      {
        id: "a2-04-2", marks: 3, lines: 5,
        prompt: <><b>Convert <code>10110100 │ 00100</code> to denary.</b></>,
        answer: <p>Exponent <code>00100 = +4</code> <em>[1]</em>. Mantissa <code>1.0110100 = −0.59375</code> in two&apos;s complement <em>[1]</em>. <code>−0.59375 × 2⁴ = −9.5</code> <em>[1]</em>.</p>,
      },
      {
        id: "a2-04-3", marks: 4, lines: 6,
        prompt: <><b>Convert both values to denary:</b><p>(i) <code>01100000 │ 11110</code> &nbsp; (ii) <code>10010000 │ 11101</code></p></>,
        answer: <p>(i) <code>0.75 × 2⁻² = 0.1875</code> <em>[2]</em>. (ii) <code>−0.875 × 2⁻³ = −0.109375</code> <em>[2]</em>.</p>,
      },
    ],
  },
  {
    code: "B", title: "Normalise and preserve value", subtitle: "Remove redundant leading sign bits and adjust the exponent", marks: 10,
    questions: [
      {
        id: "a2-04-4", marks: 4, lines: 6,
        prompt: <><b>Normalise <code>00010110 │ 00101</code></b> and verify that the value is unchanged.</>,
        answer: <p>Shift the mantissa left twice <em>[1]</em> to get <code>01011000</code> <em>[1]</em>. Reduce the exponent twice to <code>00011</code> <em>[1]</em>. Both forms represent <code>5.5</code> <em>[1]</em>.</p>,
      },
      {
        id: "a2-04-5", marks: 4, lines: 6,
        prompt: <><b>Normalise <code>11101000 │ 00100</code></b> and verify that the value is unchanged.</>,
        answer: <p>Shift the mantissa left twice <em>[1]</em> to get <code>10100000</code> <em>[1]</em>. Reduce the exponent twice to <code>00010</code> <em>[1]</em>. Both forms represent <code>−3</code> <em>[1]</em>.</p>,
      },
      {
        id: "a2-04-6", marks: 2, lines: 3,
        prompt: <><b>State the first two mantissa bits</b> of a non-zero normalised positive number and a non-zero normalised negative number.</>,
        answer: <p>A positive normalised mantissa begins <code>01</code> <em>[1]</em>; a negative normalised mantissa begins <code>10</code> <em>[1]</em>.</p>,
      },
    ],
  },
  {
    code: "C", title: "Exam transfer", subtitle: "Make every conversion step visible to the marker", marks: 10,
    questions: [
      {
        id: "a2-04-7", marks: 4, lines: 6,
        prompt: <><b>Describe a method for converting a stored binary floating-point value to denary.</b></>,
        answer: <p>Split the mantissa and exponent fields <em>[1]</em>; decode the exponent as a two&apos;s-complement integer <em>[1]</em>; decode the mantissa as a two&apos;s-complement fixed-point fraction with the point after its sign bit <em>[1]</em>; calculate <code>mantissa × 2^exponent</code> and check the sign <em>[1]</em>.</p>,
      },
      {
        id: "a2-04-8", marks: 4, lines: 7,
        prompt: <><span className="syllabus-mark">PAST PAPER PRACTICE</span><p><b>Convert <code>010001110111 │ 0111</code> to denary.</b></p><p>Expanded classroom adaptation of 9618/32 O/N 2024 Q4(a). [4]</p></>,
        answer: <p>Exponent <code>0111 = 7</code> <em>[1]</em>. Move the binary point seven places to obtain <code>1000111.0111</code> <em>[1]</em>. Sum the place values <em>[1]</em> to get <code>71.4375</code> <em>[1]</em>.</p>,
      },
      {
        id: "a2-04-9", marks: 2, lines: 3,
        prompt: <><b>Give two reasons for normalising</b> a non-zero floating-point number.</>,
        answer: <p>It uses the available mantissa bits for significant digits, maximising precision <em>[1]</em>, and removes redundant sign bits so the same value has a preferred/consistent representation <em>[1]</em>.</p>,
      },
    ],
  },
];

export default function A2Lesson04Client() {
  const slides: SlideData[] = [
    {
      time: "4 min", focus: "Use an undecoded word as the entry question.", prompt: "Students predict the sign and size before doing any calculation.", source: "Syllabus 13.3; coursebook Chapter 16 §16.03 printed pp.320–323.",
      content: <Slide number="01" eyebrow="A2 · PAPER 3" sourceLabel="TEXTBOOK Ch16 §16.03" syllabusLabel="SYLLABUS 13.3" className="a2-slide a2-title a2-dr-slide"><section className="a2-title-grid"><div><span>LESSON 04 · 90 MINUTES</span><h1>Read the word.<br /><em>Recover the value.</em></h1><p>Mantissa · exponent · two&apos;s complement · implied point · decoding · normalisation</p></div><div className="a2-dr-hero-graphic" role="img" aria-label="A mantissa and exponent combined to represent a real number"><strong>M × 2ᴱ</strong><span>01011100</span><span>00101</span><span>0.71875</span><span>23</span></div></section></Slide>,
    },
    {
      time: "6 min", focus: "Establish the Cambridge storage format and explicitly reject IEEE assumptions.", prompt: "Point to the stored sign information for each field and the unstored binary point.", source: "Syllabus 13.3; coursebook pp.320–321; recent Paper 3 instructions.",
      content: <Slide number="02" eyebrow="THE CAMBRIDGE FORMAT" sourceLabel="TEXTBOOK pp.320–321" syllabusLabel="13.3 · FORMAT" title="Two signed fields; one implied scale." className="a2-slide a2-dr-slide"><BitRegister mantissa="01011100" exponent="00101" /><Formula>value = mantissa × 2^exponent</Formula><p className="a2-alert"><b>Not IEEE 754</b><span>No biased exponent, hidden 1 or separate sign field. Both stored fields use two&apos;s complement.</span></p></Slide>,
    },
    {
      time: "7 min", focus: "Build the mantissa as a signed fixed-point fraction.", prompt: "Evaluate 0.1011000 and 1.0100000 using the displayed weights.", source: "Coursebook p.321 Table 16.02; syllabus 13.3 two's complement note.",
      content: <Slide number="03" eyebrow="MANTISSA PLACE VALUES" sourceLabel="TEXTBOOK p.321" syllabusLabel="13.3 · FORMAT" title="The implied binary point sits immediately after the sign bit." className="a2-slide a2-dr-slide"><BinaryPointScale labels={["−1", "½", "¼", "⅛", "¹⁄₁₆", "¹⁄₃₂", "¹⁄₆₄", "¹⁄₁₂₈"]} /><BitRegister mantissa="01011000" exponent="00000" exponentLabel="SCALE OFF FOR NOW" /><p className="a2-answer-band"><b>MANTISSA</b><code>0.1011000 = 0.6875</code></p></Slide>,
    },
    {
      time: "7 min", focus: "Decode the exponent as a signed integer, independently of the mantissa.", prompt: "Convert 00101 and 11110, then predict their effect on magnitude.", source: "Coursebook pp.320–321; AS two's-complement retrieval.",
      content: <Slide number="04" eyebrow="EXPONENT PLACE VALUES" sourceLabel="TEXTBOOK pp.320–321" syllabusLabel="13.3 · FORMAT" title="The exponent is a two's-complement integer." className="a2-slide a2-dr-slide"><section className="a2-dr-split"><article><span>00101</span><b>+5</b><p>Multiply the mantissa by <code>2⁵</code>; move its binary point five places right.</p></article><article><span>11110</span><b>−2</b><p>Multiply the mantissa by <code>2⁻²</code>; move its binary point two places left.</p></article></section><p className="a2-alert"><b>Do not merge</b><span>Decode mantissa and exponent separately; never take two&apos;s complement of the whole stored word.</span></p></Slide>,
    },
    {
      time: "5 min", focus: "Give a repeatable decoding routine.", prompt: "Students turn each step into one line of working suitable for a marker.", source: "Syllabus 13.3 conversion requirement; published Paper 3 mark schemes.",
      content: <Slide number="05" eyebrow="FOUR-STEP DECODE" sourceLabel="PAPER 3 MARK-SCHEME ROUTINE" syllabusLabel="13.3 · CONVERT" title="Separate → decode → scale → verify." className="a2-slide a2-dr-slide"><FlowStrip steps={[{ eyebrow: "01", title: "split fields", body: "mantissa │ exponent" }, { eyebrow: "02", title: "decode E", body: "signed integer" }, { eyebrow: "03", title: "decode M", body: "signed fraction" }, { eyebrow: "04", title: "calculate", code: "M × 2^E" }]} /><p className="a2-rule"><b>Final check</b><span>Does the sign match the mantissa? Does a negative exponent make the magnitude smaller?</span></p></Slide>,
    },
    {
      time: "7 min", focus: "Decode a positive value and show both fraction and shifted-point methods.", prompt: "Students identify where 13.25 appears after moving the point four places.", source: "Coursebook p.321 worked format; calculation verified against Cambridge convention.",
      content: <Slide number="06" eyebrow="WORKED DECODE · POSITIVE" sourceLabel="TEXTBOOK p.321" syllabusLabel="13.3 · CONVERT" title="A positive exponent scales the fractional mantissa upward." className="a2-slide a2-dr-slide"><BitRegister mantissa="01101010" exponent="0100" /><WorkedBoard label="TWO EQUIVALENT ROUTES" result="13.25"><code>0.1101010₂ = 0.828125</code><br /><code>0.828125 × 2⁴ = 13.25</code><br /><code>0.1101010 → 1101.010 = 13.25</code></WorkedBoard></Slide>,
    },
    {
      time: "6 min", focus: "Use a negative exponent to reinforce scale direction.", prompt: "Predict whether the result is greater or less than the mantissa before calculating.", source: "Syllabus 13.3 conversion; coursebook pp.320–321.",
      content: <Slide number="07" eyebrow="WORKED DECODE · NEGATIVE EXPONENT" sourceLabel="TEXTBOOK pp.320–321" syllabusLabel="13.3 · CONVERT" title="A negative exponent moves the point left and reduces magnitude." className="a2-slide a2-dr-slide"><BitRegister mantissa="01100000" exponent="1110" /><WorkedBoard label="DECODE" result="0.1875"><code>M = 0.1100000₂ = 0.75</code><br /><code>E = 1110₂ = −2</code><br /><code>0.75 × 2⁻² = 0.1875</code></WorkedBoard></Slide>,
    },
    {
      time: "8 min", focus: "Decode a negative mantissa with a negative exponent.", prompt: "Students calculate the mantissa from −1 plus the positive fractional weights.", source: "Coursebook p.321 two's-complement mantissa table.",
      content: <Slide number="08" eyebrow="WORKED DECODE · TWO NEGATIVES" sourceLabel="TEXTBOOK p.321" syllabusLabel="13.3 · CONVERT" title="A negative exponent changes scale—not the sign." className="a2-slide a2-dr-slide"><BitRegister mantissa="10100000" exponent="1101" /><WorkedBoard label="DECODE EACH FIELD" result="−0.09375"><code>M = −1 + ¼ = −0.75</code><br /><code>E = 1101₂ = −3</code><br /><code>−0.75 × 2⁻³ = −0.09375</code></WorkedBoard></Slide>,
    },
    {
      time: "8 min", focus: "Move from worked examples to paired independent decoding.", prompt: "Pairs decode all three, swap working, and locate the first differing step.", source: "Syllabus 13.3 conversion practice; examples independently verified.",
      content: <Slide number="09" eyebrow="PAIRED DECODE SPRINT" sourceLabel="TEXTBOOK §16.03 METHOD" syllabusLabel="13.3 · CONVERT" title="Decode the exponent first; keep one line per mark point." className="a2-slide a2-dr-slide"><ConceptCards items={[{ eyebrow: "A", title: <code>01010000 │ 00011</code>, body: "answer: 5" }, { eyebrow: "B", title: <code>10100000 │ 00010</code>, body: "answer: −3" }, { eyebrow: "C", title: <code>01110000 │ 11111</code>, body: "answer: 0.4375" }]} /><p className="a2-answer-band"><b>CHECK ORDER</b>exponent → mantissa → scale → sign and magnitude</p></Slide>,
    },
    {
      time: "5 min", focus: "Introduce the normalised first-bit test for non-zero numbers.", prompt: "Sort four mantissa prefixes and explain why 00 and 11 contain redundancy.", source: "Coursebook pp.322–323; syllabus 13.3 normalisation.",
      content: <Slide number="10" eyebrow="IS IT NORMALISED?" sourceLabel="TEXTBOOK pp.322–323" syllabusLabel="13.3 · NORMALISE" title="For a non-zero mantissa, the first two bits must differ." className="a2-slide a2-dr-slide"><ConceptCards columns={4} items={[{ eyebrow: "01", title: "positive", body: "normalised" }, { eyebrow: "10", title: "negative", body: "normalised" }, { eyebrow: "00", title: "positive", body: "redundant sign extension" }, { eyebrow: "11", title: "negative", body: "redundant sign extension" }]} /><p className="a2-alert"><b>Zero exception</b><span>An all-zero mantissa represents zero; do not force it to begin 01 or 10.</span></p></Slide>,
    },
    {
      time: "5 min", focus: "Explain normalisation as precision and consistency rather than a cosmetic change.", prompt: "Which representation uses more mantissa bits to carry significant information?",
      source: "Coursebook p.322; syllabus reason-for-normalisation requirement.",
      content: <Slide number="11" eyebrow="WHY NORMALISE?" sourceLabel="TEXTBOOK p.322" syllabusLabel="13.3 · EXPLAIN" title="Move the first significant change next to the implied point." className="a2-slide a2-dr-slide"><ConceptCards items={[{ eyebrow: "PRECISION", title: "use every useful bit", body: "retain more significant binary digits" }, { eyebrow: "NO REDUNDANCY", title: "remove repeated sign bits", body: "00… or 11… no longer wastes space" }, { eyebrow: "CONSISTENCY", title: "preferred representation", body: "avoid multiple encodings of one non-zero value" }]} /></Slide>,
    },
    {
      time: "7 min", focus: "Prove the shift/exponent rule preserves the represented value.", prompt: "Why is the exponent reduced by one for every left shift?",
      source: "Coursebook pp.322–323; verified arithmetic.",
      content: <Slide number="12" eyebrow="NORMALISE · PRESERVE VALUE" sourceLabel="TEXTBOOK pp.322–323" syllabusLabel="13.3 · NORMALISE" title="Shift mantissa left; reduce exponent by the same count." className="a2-slide a2-dr-slide"><FlowStrip steps={[{ eyebrow: "START", title: <code>00010110 │ 00101</code>, body: "0.171875 × 2⁵" }, { eyebrow: "SHIFT ×2", title: <code>00101100 │ 00100</code> }, { eyebrow: "SHIFT ×2", title: <code>01011000 │ 00011</code>, body: "0.6875 × 2³" }]} /><p className="a2-answer-band"><b>SAME VALUE</b><code>5.5 → 5.5 → 5.5</code></p></Slide>,
    },
    {
      time: "7 min", focus: "Apply a published normalisation pattern with a signed exponent.", prompt: "Students mark the two removed sign bits and the two exponent decrements.", source: "Adapted from Cambridge 9618/31 O/N 2022 Q1(c).",
      content: <Slide number="13" eyebrow="PAST PAPER PRACTICE" sourceLabel="9618/31 O/N 2022 · Q1(c)" syllabusLabel="13.3 · NORMALISE" title="Normalise without changing the stored value." className="a2-slide a2-paper a2-dr-slide"><ExamPractice reference="9618/31 O/N 2022 · Q1(c) · ADAPTED" marks={3} prompt={<><p>Normalise <code>00011110 │ 00011000</code>.</p><p>Show the mantissa shift and exponent adjustment.</p></>} answer={<ul><li>Shift the mantissa left twice to produce <code>01111000</code>. [1]</li><li>Decrease the exponent by two: <code>00011000</code> (+24) becomes <code>00010110</code> (+22). [1]</li><li>Final representation: <code>01111000 │ 00010110</code>. [1]</li></ul>} /></Slide>,
    },
    {
      time: "5 min", focus: "Use a recent Paper 3 value to check complete decoding under time pressure.", prompt: "Two minutes working, then reveal and circle exponent, shift and final value.", source: "Expanded classroom adaptation of Cambridge 9618/32 O/N 2024 Q4(a).",
      content: <Slide number="14" eyebrow="PAST PAPER PRACTICE" sourceLabel="9618/32 O/N 2024 · Q4(a)" syllabusLabel="13.3 · CONVERT" title="Decode a 12-bit mantissa and 4-bit exponent." className="a2-slide a2-paper a2-dr-slide"><ExamPractice reference="9618/32 O/N 2024 · Q4(a) · ADAPTED" marks={3} prompt={<p>Convert <code>010001110111 │ 0111</code> to denary. Show working.</p>} answer={<ul><li>Exponent <code>0111 = +7</code>; move the point seven places. [1]</li><li><code>1000111.0111 = 64 + 4 + 2 + 1 + ¼ + ⅛ + ¹⁄₁₆</code>. [1]</li><li>Answer: <code>71.4375</code>. [1]</li></ul>} /></Slide>,
    },
    {
      time: "3 min", focus: "Check the format, normalised test and shift rule before homework.", prompt: "Students answer each in one precise sentence.", source: "Lesson synthesis aligned to syllabus 13.3 format, conversion and normalisation.",
      content: <Slide number="15" eyebrow="EXIT TICKET" sourceLabel="TEXTBOOK §16.03" syllabusLabel="SYLLABUS 13.3" title="Can you recover the value without mixing the two fields?" className="a2-slide a2-exit a2-dr-slide"><section className="a2-exit-grid"><article><span>01</span><p>State the implied binary-point position.</p></article><article><span>02</span><p>Test whether <code>10110000</code> is normalised.</p></article><article><span>03</span><p>State the exponent change after two left shifts.</p></article></section><div className="homework-callout"><b>HOMEWORK 04</b><span>30 marks · decode + normalise · all answers inline</span><strong>45 min</strong></div></Slide>,
    },
  ];

  return <A2TheoryLesson lessonNumber="04" title="Floating-point format and decoding" syllabusLabel="SYLLABUS 13.3" sourceLabel="TEXTBOOK Ch16 §16.03 · pp.320–323" slides={slides} homeworkSections={homeworkSections} sourceSummary="Official 2027–2029 syllabus §13.3 · endorsed coursebook Chapter 16 §16.03 printed pp.320–323 · verified 2022 and 2024 Paper 3 questions and mark schemes" sourceDetail="Cambridge 9618 uses a two's-complement fixed-point mantissa with the binary point after its sign bit, plus a two's-complement integer exponent. It is not the IEEE 754 layout." />;
}
