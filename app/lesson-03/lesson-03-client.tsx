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

function BitCode({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "positive" | "negative" | "invalid" }) {
  return <code className={`l3-bit-code l3-bit-code--${tone}`}>{children}</code>;
}

function RevealPanel({
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
    <div className="l3-reveal">
      <button type="button" onClick={() => onToggle(id)} aria-expanded={visible} aria-controls={`l3-reveal-${id}`}>
        {visible ? "Hide answer" : "Reveal answer"}
      </button>
      <div id={`l3-reveal-${id}`} className={visible ? "l3-reveal__panel visible" : "l3-reveal__panel"} hidden={!visible}>
        {children}
      </div>
    </div>
  );
}

const homeworkSections: HomeworkSection[] = [
  {
    code: "A",
    title: "Signed representations",
    subtitle: "One’s complement, two’s complement and fixed-width ranges",
    marks: 10,
    questions: [
      {
        id: "l3-1",
        marks: 2,
        lines: 3,
        prompt: <><b>Give the 8-bit one’s complement representation of -120.</b><p>Show the positive binary value before taking the complement.</p></>,
        answer: <p>+120 = <strong>0111 1000</strong>. Invert every bit to obtain <strong>1000 0111</strong>. <em>[1 working; 1 answer]</em></p>,
      },
      {
        id: "l3-2",
        marks: 2,
        lines: 3,
        prompt: <><b>Give the 8-bit two’s complement representation of -37.</b><p>Show both complement steps.</p></>,
        answer: <p>+37 = 0010 0101; one’s complement = 1101 1010; add 1 = <strong>1101 1011</strong>. <em>[1 valid method; 1 answer]</em></p>,
      },
      {
        id: "l3-3",
        marks: 2,
        lines: 3,
        prompt: <><b>Convert the 8-bit two’s complement integer 1110 0010 to denary.</b><p>Show your working.</p></>,
        answer: <p>Invert and add 1: 1110 0010 -&gt; 0001 1101 + 1 = 0001 1110 = 30. The original value is <strong>-30</strong>. <em>[1 working; 1 answer]</em></p>,
      },
      {
        id: "l3-4",
        marks: 2,
        lines: 2,
        prompt: <><b>State the smallest and largest 8-bit two’s complement integers.</b><p>Give each bit pattern and its denary value.</p></>,
        answer: <p>Smallest: <strong>1000 0000 = -128</strong>. Largest: <strong>0111 1111 = +127</strong>. <em>[1 each]</em></p>,
      },
      {
        id: "l3-5",
        marks: 2,
        lines: 3,
        prompt: <><b>Give two differences between one’s complement and two’s complement signed representations.</b></>,
        answer: <p>One’s complement is formed by inverting the bits; two’s complement inverts and then adds 1. One’s complement has two zero codes and an 8-bit range of -127 to +127; two’s complement has one zero and a range of -128 to +127. <em>[1 per valid difference]</em></p>,
      },
    ],
  },
  {
    code: "B",
    title: "Binary arithmetic and overflow",
    subtitle: "Show carries, preserve the bit width and interpret the result",
    marks: 10,
    questions: [
      {
        id: "l3-6",
        marks: 2,
        lines: 3,
        prompt: <><b>Complete the binary addition.</b><p>1011 0000 + 0001 1011</p></>,
        answer: <p><strong>1100 1011</strong>. Show the carried 1s above the appropriate columns. The unsigned result is 203, so it fits in 8 bits. <em>[1 working; 1 answer]</em></p>,
      },
      {
        id: "l3-7",
        marks: 3,
        lines: 4,
        prompt: <><b>Add all three 8-bit values and include any overflow bit.</b><p>1001 1110 + 0110 0001 + 0001 1001</p></>,
        answer: <p>The complete sum is <strong>(1) 0001 1000</strong>. In an 8-bit register the stored result is 0001 1000 and the leading 1 is the overflow bit. <em>[1 carries; 1 result; 1 overflow identified]</em></p>,
      },
      {
        id: "l3-8",
        marks: 3,
        lines: 4,
        prompt: <><b>Subtract denary 23 from the 8-bit two’s complement integer 0100 1010.</b><p>Use addition of the two’s complement of 23.</p></>,
        answer: <p>23 = 0001 0111, so -23 = 1110 1001. Then 0100 1010 + 1110 1001 = (1) 0011 0011. Discard the final carry: <strong>0011 0011 = 51</strong>. <em>[1 negative operand; 1 addition; 1 answer]</em></p>,
      },
      {
        id: "l3-9",
        marks: 2,
        lines: 3,
        prompt: <><b>Name and describe the error that may occur when binary arithmetic is performed in a fixed-width register.</b></>,
        answer: <p><strong>Overflow.</strong> It occurs when the correct result is outside the range that can be represented using the available number of bits, so the stored bit pattern represents an incorrect value. <em>[1 name; 1 description]</em></p>,
      },
    ],
  },
  {
    code: "C",
    title: "BCD and mixed exam practice",
    subtitle: "Encode decimal digits separately and justify the application",
    marks: 8,
    questions: [
      {
        id: "l3-10",
        marks: 2,
        lines: 3,
        prompt: <><b>Complete both BCD conversions.</b><p>(a) 108<sub>10</sub> to BCD &nbsp;&nbsp; (b) BCD 1000 0110 0101 to denary</p></>,
        answer: <p><b>(a)</b> <strong>0001 0000 1000</strong> &nbsp;&nbsp; <b>(b)</b> <strong>865</strong>. Each group of four bits represents one decimal digit. <em>[1 each]</em></p>,
      },
      {
        id: "l3-11",
        marks: 2,
        lines: 3,
        prompt: <><b>Give one practical application of BCD and justify why BCD is suitable.</b></>,
        answer: <p>Example: a <strong>digital clock</strong>. Its output contains separate decimal digits, so converting each stored BCD nibble to the displayed digit is straightforward. Financial values are also acceptable when linked to exact decimal digits and avoidance of binary rounding error. <em>[1 application; 1 linked justification]</em></p>,
      },
      {
        id: "l3-12",
        marks: 4,
        lines: 4,
        prompt: <><b>Complete the mixed representation check.</b><p>(a) Write -196 as a 12-bit two’s complement integer. [1]</p><p>(b) Convert denary 964 to BCD. [1]</p><p>(c) Add signed 8-bit values 0110 0100 and 0011 1100; state whether overflow occurs. [2]</p></>,
        answer: <p><b>(a)</b> 1111 0011 1100. <b>(b)</b> 1001 0110 0100. <b>(c)</b> 1010 0000; <strong>signed overflow</strong> occurs because +100 + +60 = +160, outside -128 to +127, and two positive operands produced a negative-sign bit. <em>[1 + 1 + 2]</em></p>,
      },
    ],
  },
];

export default function Lesson03Client() {
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
      focus: "Frame the lesson around the central fixed-width question: how can the same bits represent positive and negative values?",
      prompt: "Ask students what 1110 0010 means. Accept different answers until a representation and bit width are stated.",
      source: "Coursebook Section 1.03, printed pp.8-14; 9618 Syllabus 2027-2029, 1.1.",
      content: (
        <Slide number="01" eyebrow="INFORMATION REPRESENTATION" sourceLabel="TEXTBOOK 1.03 · pp.8-14" className="slide--l3-title">
          <section className="l3-title-grid">
            <div className="l3-hero-copy">
              <span>LESSON 03 · 90 MINUTES</span>
              <h1>Signed Binary,<br /><em>Arithmetic &amp; BCD</em></h1>
              <p>Representation gives a bit pattern its meaning. Width gives it a limit.</p>
            </div>
            <div className="l3-number-stack" aria-label="Three interpretations of binary data">
              <article><small>UNSIGNED</small><BitCode>1110 0010</BitCode><b>226</b></article>
              <article><small>TWO’S COMPLEMENT</small><BitCode tone="negative">1110 0010</BitCode><b>-30</b></article>
              <article><small>BCD?</small><BitCode tone="invalid">1110 0010</BitCode><b>invalid digit</b></article>
            </div>
          </section>
        </Slide>
      ),
    },
    {
      time: "4 min",
      focus: "Make the textbook sequence and exact syllabus statements visible before instruction begins.",
      prompt: "Students identify which items are representations, which are operations, and which are applications.",
      source: "Coursebook 1.03, printed pp.8-14; syllabus p.14, Section 1.1.",
      content: (
        <Slide number="02" eyebrow="TEXTBOOK × SYLLABUS" sourceLabel="TEXTBOOK 1.03 · pp.8-14" title="Today’s route is both textbook-led and examinable." className="slide--l3-map">
          <section className="l3-map-grid">
            <article>
              <span>COURSEBOOK 1.03</span>
              <h3>Concept route</h3>
              <p>signed integers -&gt; one’s and two’s complement -&gt; binary arithmetic -&gt; overflow -&gt; BCD</p>
            </article>
            <article>
              <span>SYLLABUS 1.1</span>
              <h3>Exam destination</h3>
              <ul>
                <li>use one’s and two’s complement</li>
                <li>convert between representations</li>
                <li>add and subtract positive and negative binary integers</li>
                <li>explain overflow and BCD applications</li>
              </ul>
            </article>
          </section>
          <p className="l3-route-note"><Mark>WEEK 03 / 32</Mark><span>BCD correction on textbook p.14 is extension only; it is not a Syllabus 1.1 requirement.</span></p>
        </Slide>
      ),
    },
    {
      time: "6 min",
      focus: "Use sign-and-magnitude as textbook context, while making clear that the assessed complement forms solve its key problems.",
      prompt: "Ask why two representations of zero are inconvenient and why arithmetic needs more than attaching a sign bit.",
      source: "Coursebook p.8 and Table 1.08 on p.10.",
      content: (
        <Slide number="03" eyebrow="SIGNED INTEGER CONTEXT" syllabusLabel="TEXTBOOK CONTEXT" sourceLabel="TEXTBOOK pp.8, 10" title="The simplest signed code stores a sign and a magnitude." className="slide--l3-sign">
          <section className="l3-concept-grid">
            <article className="l3-rule-card">
              <span>MOST SIGNIFICANT BIT</span>
              <div className="l3-sign-key"><b>0</b><em>positive</em><b>1</b><em>negative</em></div>
              <p>The remaining bits store the magnitude.</p>
            </article>
            <article className="l3-rule-card">
              <span>4-BIT EXAMPLES</span>
              <dl><div><dt>+7</dt><dd><BitCode tone="positive">0111</BitCode></dd></div><div><dt>-7</dt><dd><BitCode tone="negative">1111</BitCode></dd></div><div><dt>+0</dt><dd><BitCode>0000</BitCode></dd></div><div><dt>-0</dt><dd><BitCode>1000</BitCode></dd></div></dl>
            </article>
          </section>
          <p className="l3-warning"><b>Problem:</b> there are two zero codes, and ordinary binary arithmetic does not work cleanly across the sign boundary.</p>
        </Slide>
      ),
    },
    {
      time: "6 min",
      focus: "Teach the exact textbook definition of one’s complement and connect it to the 2027 syllabus wording.",
      prompt: "Students invert +120 independently, then check that every bit changed and the width stayed at 8 bits.",
      source: "Coursebook p.8, Key Terms; syllabus 1.1; 2023 M/J 12 Q4(b).",
      content: (
        <Slide number="04" eyebrow="ONE’S COMPLEMENT" sourceLabel="TEXTBOOK p.8 · KEY TERM" title="One’s complement: subtract every bit from 1." className="slide--l3-complement">
          <section className="l3-transform">
            <div><span>POSITIVE MAGNITUDE</span><BitCode tone="positive">0111 1000</BitCode><small>+120</small></div>
            <b aria-label="invert every bit">invert 0 ↔ 1</b>
            <div><span>ONE’S COMPLEMENT</span><BitCode tone="negative">1000 0111</BitCode><small>-120</small></div>
          </section>
          <div className="l3-two-facts"><p><b>Range in 8 bits</b><span>-127 to +127</span></p><p><b>Zero codes</b><span>0000 0000 and 1111 1111</span></p></div>
          <p className="l3-takeaway">Keep the bit width fixed. One’s complement means <b>invert only</b> - do not add 1.</p>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Build two’s complement from the textbook definition and model both the formal and shortcut methods.",
      prompt: "Ask students to explain why the shortcut leaves the rightmost 1 and all trailing zeros unchanged.",
      source: "Coursebook pp.8-9, Key Terms and shortcut method.",
      content: (
        <Slide number="05" eyebrow="TWO’S COMPLEMENT" sourceLabel="TEXTBOOK pp.8-9" title="Two’s complement = invert the bits, then add 1." className="slide--l3-method">
          <ol className="l3-step-flow">
            <li><span>1</span><p>Fix the width and write the positive magnitude.</p><BitCode>0010 0101</BitCode></li>
            <li><span>2</span><p>Take the one’s complement.</p><BitCode>1101 1010</BitCode></li>
            <li><span>3</span><p>Add 1.</p><BitCode tone="negative">1101 1011</BitCode></li>
          </ol>
          <div className="l3-worked-summary"><b>-37 in 8-bit two’s complement</b><strong>1101 1011</strong></div>
          <p className="l3-takeaway"><b>Textbook shortcut:</b> from the right, keep all zeros through the first 1; invert every bit to its left.</p>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Make fixed width and the leading zero explicit before students encode a negative value.",
      prompt: "Reveal the answer only after students have written +108 in 12 bits. Diagnose zero-padding after complementing.",
      source: "Coursebook p.9, positive and negative conversion procedures; 2025 O/N 13 Q2(b).",
      content: (
        <Slide number="06" eyebrow="DENARY → TWO’S COMPLEMENT" sourceLabel="TEXTBOOK p.9 · PROCEDURE" title="Width first. Sign second. Complement last." className="slide--l3-encode">
          <section className="l3-encode-grid">
            <article><span>POSITIVE VALUE</span><ol><li>Convert magnitude to binary.</li><li>Add leading zeros to the required width.</li><li>Leading bit remains 0.</li></ol></article>
            <article><span>NEGATIVE VALUE</span><ol><li>Ignore the minus sign and convert the magnitude.</li><li>Pad to the required width with a leading 0.</li><li>Take the two’s complement.</li></ol></article>
          </section>
          <div className="l3-practice-card"><p>Write <b>-108</b> as a <b>12-bit</b> two’s complement number.</p><RevealPanel id="minus-108" visible={revealed.has("minus-108")} onToggle={toggleReveal}><p>+108 = 0000 0110 1100 -&gt; invert and add 1 -&gt; <strong>1111 1001 0100</strong>.</p></RevealPanel></div>
        </Slide>
      ),
    },
    {
      time: "8 min",
      focus: "Teach both decoding methods from Worked Example 1.03 so students can choose and verify.",
      prompt: "Cover the final value. Half the class uses Method 1; half uses Method 2; compare answers.",
      source: "Coursebook p.9, Worked Example 1.03.",
      content: (
        <Slide number="07" eyebrow="TWO’S COMPLEMENT → DENARY" sourceLabel="TEXTBOOK p.9 · WORKED EXAMPLE 1.03" title="Decode 1011 0001 in two independent ways." className="slide--l3-decode">
          <section className="l3-method-grid">
            <article><span>METHOD 1 · CHANGE THE SIGN</span><BitCode tone="negative">1011 0001</BitCode><i>two’s complement</i><BitCode tone="positive">0100 1111</BitCode><p>64 + 8 + 4 + 2 + 1 = 79</p><strong>-79</strong></article>
            <article><span>METHOD 2 · NEGATIVE MSB WEIGHT</span><div className="l3-weight-line"><b>-128</b><b>64</b><b>32</b><b>16</b><b>8</b><b>4</b><b>2</b><b>1</b></div><BitCode tone="negative">1&nbsp;0&nbsp;1&nbsp;1&nbsp;0&nbsp;0&nbsp;0&nbsp;1</BitCode><p>-128 + 32 + 16 + 1</p><strong>-79</strong></article>
          </section>
          <p className="l3-takeaway">A leading 1 signals a negative two’s complement value; it is not a separate minus sign.</p>
        </Slide>
      ),
    },
    {
      time: "6 min",
      focus: "Use Table 1.08 to consolidate range, the single zero and sign extension.",
      prompt: "Ask why 1011 and 111011 have the same value. Students should identify repeated leading 1s as sign extension.",
      source: "Coursebook p.10, Table 1.08, Tasks 1.02-1.03 and notes.",
      content: (
        <Slide number="08" eyebrow="THE 4-BIT LANDSCAPE" syllabusLabel="1.1 CORE + TEXTBOOK CONTEXT" sourceLabel="TEXTBOOK p.10 · TABLE 1.08" title="Two’s complement uses every pattern once." className="slide--l3-table">
          <div className="l3-table-wrap">
            <table>
              <thead><tr><th>Denary</th><th>Sign and magnitude</th><th>Two’s complement</th></tr></thead>
              <tbody><tr><td>+7</td><td>0111</td><td>0111</td></tr><tr><td>0</td><td>0000</td><td>0000</td></tr><tr><td>-0</td><td>1000</td><td>not represented</td></tr><tr><td>-1</td><td>1001</td><td>1111</td></tr><tr><td>-7</td><td>1111</td><td>1001</td></tr><tr><td>-8</td><td>not represented</td><td>1000</td></tr></tbody>
            </table>
          </div>
          <div className="l3-range-strip"><p><b>n-bit range</b><span>-2<sup>n-1</sup> to 2<sup>n-1</sup>-1</span></p><p><b>Sign extension</b><span>positive: add 0s · negative: add 1s</span></p><p><b>One zero</b><span>all zeros</span></p></div>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Rehearse the complete set of binary addition facts and model a worked sum from right to left.",
      prompt: "Students chant each rule, then narrate the carry into every column of 14 + 11.",
      source: "Coursebook p.11, Binary arithmetic and worked addition of 14 and 11.",
      content: (
        <Slide number="09" eyebrow="BINARY ADDITION" sourceLabel="TEXTBOOK p.11" title="Work from right to left and record every carry." className="slide--l3-add">
          <section className="l3-arithmetic-grid">
            <article className="l3-rule-list"><span>CORE FACTS</span><p><b>0 + 0</b><em>0</em></p><p><b>0 + 1</b><em>1</em></p><p><b>1 + 1</b><em>0, carry 1</em></p><p><b>1 + 1 + 1</b><em>1, carry 1</em></p></article>
            <article className="l3-column-sum" aria-label="Binary addition of fourteen and eleven"><span>carries</span><code>1 1 1</code><code>&nbsp;1110</code><code>+1011</code><hr /><strong>11001</strong><small>14 + 11 = 25</small></article>
          </section>
          <p className="l3-takeaway">Writing carries is not decoration: recent mark schemes award a separate working mark.</p>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Model direct subtraction with borrowing before switching to the complement method.",
      prompt: "Ask what is borrowed in base 2. Students should say 10₂, not ten denary.",
      source: "Coursebook pp.11-12, direct binary subtraction of 11 from 14.",
      content: (
        <Slide number="10" eyebrow="DIRECT BINARY SUBTRACTION" sourceLabel="TEXTBOOK pp.11-12" title="Borrow 1 from the next column: it becomes 10₂ here." className="slide--l3-subtract">
          <section className="l3-arithmetic-grid">
            <article className="l3-rule-list"><span>SUBTRACTION FACTS</span><p><b>0 - 0</b><em>0</em></p><p><b>1 - 0</b><em>1</em></p><p><b>1 - 1</b><em>0</em></p><p><b>0 - 1</b><em>1 after a borrow</em></p></article>
            <article className="l3-column-sum"><span>14 - 11</span><code>&nbsp;1110</code><code>-1011</code><hr /><strong>0011</strong><small>denary 3</small></article>
          </section>
          <RevealPanel id="borrow-check" visible={revealed.has("borrow-check")} onToggle={toggleReveal}><p>At the rightmost column, 0 - 1 needs a borrow. The borrowed 1 has place value 2, so the working column becomes 10₂ and 10₂ - 1₂ = 1₂.</p></RevealPanel>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Apply the textbook advantage of two’s complement: subtraction can be implemented as addition.",
      prompt: "Students complete Task 1.04 in pairs, checking the final result in denary.",
      source: "Coursebook p.13, subtraction explanation and Task 1.04.",
      content: (
        <Slide number="11" eyebrow="SUBTRACT BY ADDING" sourceLabel="TEXTBOOK p.13 · TASK 1.04" title="To subtract B, add the two’s complement of B." className="slide--l3-tc-subtract">
          <ol className="l3-step-flow l3-step-flow--four">
            <li><span>1</span><p>67 in one byte</p><BitCode>0100 0011</BitCode></li>
            <li><span>2</span><p>+35 in one byte</p><BitCode>0010 0011</BitCode></li>
            <li><span>3</span><p>Two’s complement gives -35</p><BitCode tone="negative">1101 1101</BitCode></li>
            <li><span>4</span><p>Add and discard the carry</p><BitCode tone="positive">(1) 0010 0000</BitCode></li>
          </ol>
          <div className="l3-worked-summary"><b>67 - 35</b><strong>0010 0000 = 32</strong></div>
          <p className="l3-takeaway">The discarded carry is outside the fixed 8-bit register. Check the interpreted result, not just the raw columns.</p>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Define overflow in textbook language and distinguish a valid result from a sign-flipped invalid result.",
      prompt: "Students predict the sign of each true answer before viewing the stored bit pattern.",
      source: "Coursebook p.12, Overflow key term and +96/-96 examples; 2024 M/J 13 Q1(c).",
      content: (
        <Slide number="12" eyebrow="OVERFLOW" sourceLabel="TEXTBOOK p.12 · KEY TERM" title="Overflow: the correct answer does not fit the defined bit width." className="slide--l3-overflow">
          <section className="l3-overflow-grid">
            <article><span>POSITIVE OVERFLOW</span><BitCode tone="positive">0110 0000</BitCode><i>+</i><BitCode tone="positive">0110 0000</BitCode><hr /><BitCode tone="invalid">1100 0000</BitCode><p>+192 is outside the 8-bit signed range; the stored pattern looks negative.</p></article>
            <article><span>NEGATIVE OVERFLOW</span><BitCode tone="negative">1010 0000</BitCode><i>+</i><BitCode tone="negative">1010 0000</BitCode><hr /><BitCode tone="invalid">(1) 0100 0000</BitCode><p>-192 is outside the range; the stored 8 bits look positive.</p></article>
          </section>
          <div className="l3-overflow-test"><b>Signed test</b><span>same-sign operands + opposite-sign result = overflow</span><small>A carry-out alone is not the signed-overflow test.</small></div>
        </Slide>
      ),
    },
    {
      time: "6 min",
      focus: "Define BCD as a representation of separate decimal digits and connect it to practical syllabus applications.",
      prompt: "Ask students why 1010 cannot be a BCD digit, then encode 108 one digit at a time.",
      source: "Coursebook p.13, BCD and packed BCD Key Terms and Figure 1.01; syllabus 1.1.",
      content: (
        <Slide number="13" eyebrow="BINARY CODED DECIMAL" sourceLabel="TEXTBOOK p.13 · FIGURE 1.01" title="BCD stores each denary digit in its own nibble." className="slide--l3-bcd">
          <section className="l3-bcd-grid">
            <article><span>ENCODE 108</span><div className="l3-bcd-digits"><p><b>1</b><BitCode>0001</BitCode></p><p><b>0</b><BitCode>0000</BitCode></p><p><b>8</b><BitCode>1000</BitCode></p></div><strong>0001 0000 1000</strong></article>
            <article><span>PACKED BCD · 8503</span><BitCode>1000 0101</BitCode><BitCode>0000 0011</BitCode><p>Two decimal digits per byte. Codes 1010-1111 are invalid as individual BCD digits.</p></article>
          </section>
          <div className="l3-application-row"><p><b>Calculator display</b><span>direct digit mapping</span></p><p><b>Currency</b><span>exact decimal digits</span></p><p><b>Digital clock</b><span>easy decimal conversion</span></p></div>
        </Slide>
      ),
    },
    {
      time: "4 min",
      focus: "Acknowledge and accurately summarise the textbook’s BCD correction method without presenting it as examinable Syllabus 1.1 content.",
      prompt: "Keep this brief. The only required takeaway is why ordinary binary addition can create an invalid BCD nibble.",
      source: "Coursebook pp.13-14, Figures 1.02-1.03. Textbook extension beyond Syllabus 1.1.",
      content: (
        <Slide number="14" eyebrow="BCD ARITHMETIC" syllabusLabel="TEXTBOOK EXTENSION" sourceLabel="TEXTBOOK pp.13-14 · FIGURES 1.02-1.03" title="Ordinary binary addition can produce an invalid BCD digit." className="slide--l3-extension">
          <div className="l3-extension-notice"><b>TEXTBOOK EXTENSION</b><p>This correction algorithm is useful enrichment, but Syllabus 1.1 requires BCD representation and applications - not BCD arithmetic.</p></div>
          <section className="l3-correction-flow">
            <article><span>EXPECTED</span><strong>0.26 + 0.85 = 1.11</strong></article>
            <article><span>PROBLEM</span><p>Plain binary addition creates nibbles corresponding to 10 and 11.</p><BitCode tone="invalid">1010 1011</BitCode></article>
            <article><span>TEXTBOOK CORRECTION</span><p>When a nibble is greater than 1001, add 0110 and carry into the next decimal digit.</p><BitCode tone="positive">0001 0001 0001</BitCode></article>
          </section>
        </Slide>
      ),
    },
    {
      time: "5 min",
      focus: "Finish with a three-part no-calculator check using the form and demand of recent Paper 1 questions.",
      prompt: "Students complete all three silently in three minutes; reveal and self-mark in the final two minutes.",
      source: "Recent-paper anchors: 2023 O/N 12 Q3(b), 2024 M/J 13 Q1(c), 2025 O/N 11 Q1(a-b).",
      content: (
        <Slide number="15" eyebrow="EXIT TICKET · 6 MARKS" sourceLabel="RECENT PAPER STYLE · 2023-25" title="Width. Working. Interpretation." className="slide--l3-exit">
          <section className="l3-exam-grid">
            <article><span>01 · [1]</span><p>Write -196 as a 12-bit two’s complement integer.</p><RevealPanel id="exit-1" visible={revealed.has("exit-1")} onToggle={toggleReveal}><strong>1111 0011 1100</strong></RevealPanel></article>
            <article><span>02 · [1]</span><p>Convert denary 108 to BCD.</p><RevealPanel id="exit-2" visible={revealed.has("exit-2")} onToggle={toggleReveal}><strong>0001 0000 1000</strong></RevealPanel></article>
            <article><span>03 · [4]</span><p>State what overflow means and explain why 0110 0100 + 0011 1100 overflows in signed 8-bit arithmetic.</p><RevealPanel id="exit-3" visible={revealed.has("exit-3")} onToggle={toggleReveal}><p>The correct result cannot fit in the available 8 bits. +100 + +60 = +160, outside -128 to +127; the stored result 1010 0000 has the wrong sign.</p></RevealPanel></article>
          </section>
          <p className="l3-final-check"><b>Before you submit:</b><span>fixed width shown</span><span>carries visible</span><span>BCD grouped by digit</span><span>overflow interpreted</span></p>
        </Slide>
      ),
    },
  ];

  const homework = (
    <HomeworkSheet
      lessonNumber="03"
      title="Signed Binary, Arithmetic, Overflow & BCD"
      marks={28}
      minutes={45}
      sourceLabel="TEXTBOOK 1.03 · pp.8-14"
      instructions="No calculator. Keep every binary value at the stated width, group long codes in nibbles, show carries or complement working, and interpret every overflow result. Answers remain inline for teaching and printing."
      sections={homeworkSections}
    />
  );

  return (
    <LessonShell
      lessonNumber="03"
      slides={slides}
      homework={homework}
      lessonLinks={[
        { label: "01", href: "../" },
        { label: "02", href: "../lesson-02/" },
        { label: "03", href: "../lesson-03/", active: true },
        { label: "04", href: "../lesson-04/" },
        { label: "05", href: "../lesson-05/" },
        { label: "06", href: "../lesson-06/" },
        { label: "07", href: "../lesson-07/" },
      ]}
      courseMapHref="../?view=roadmap"
      sourceSummary="Checked against the 2027-2029 syllabus, Coursebook printed pp.8-14 and representative Paper 1 questions from 2023-2025."
      sourceDetail="Syllabus p.14, Section 1.1 · Coursebook Section 1.03 printed pp.8-14: signed integers, Key Terms for one’s/two’s complement, Worked Example 1.03, Table 1.08, Tasks 1.02-1.04, binary arithmetic, overflow, BCD and Figures 1.01-1.03 · Recent anchors: 2023 M/J 12 Q4(b), 2023 O/N 12 Q3(b-c), 2024 M/J 11 Q7, 2024 O/N 11 Q1, 2025 M/J 12 Q2 and 2025 O/N 11 Q1. BCD correction is labelled textbook extension only."
    />
  );
}
