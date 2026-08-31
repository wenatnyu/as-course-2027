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

function Reveal({ id, visible, onToggle, children }: {
  id: string;
  visible: boolean;
  onToggle: (id: string) => void;
  children: ReactNode;
}) {
  return (
    <div className="l6-reveal">
      <button type="button" onClick={() => onToggle(id)} aria-expanded={visible} aria-controls={`l6-reveal-${id}`}>
        {visible ? "Hide answer" : "Reveal answer"}
      </button>
      <div id={`l6-reveal-${id}`} className={visible ? "l6-reveal__panel visible" : "l6-reveal__panel"} hidden={!visible}>
        {children}
      </div>
    </div>
  );
}

const homeworkSections: HomeworkSection[] = [
  {
    code: "A",
    title: "Compression principles",
    subtitle: "Need, definitions and justified choices",
    marks: 10,
    questions: [
      {
        id: "l6-1",
        marks: 2,
        lines: 3,
        prompt: <><b>Explain two reasons why files are compressed.</b></>,
        answer: <p>Compression can reduce the <strong>storage space</strong> required and reduce the amount of data that must be transferred, so transmission or download can be <strong>faster</strong> and use less bandwidth/data allowance. Award any two distinct benefits. <em>[2]</em></p>,
      },
      {
        id: "l6-2",
        marks: 4,
        lines: 4,
        prompt: <><b>Distinguish lossless compression from lossy compression.</b><p>Refer to discarded data and whether the original can be recovered.</p></>,
        answer: <p><strong>Lossless</strong> compression does not discard information, so decoding can reconstruct the original file exactly. <strong>Lossy</strong> compression permanently removes or modifies some information, so the exact original cannot be reconstructed. <em>[1 data retained/lost + 1 recovery point for each method]</em></p>,
      },
      {
        id: "l6-3",
        marks: 4,
        lines: 4,
        prompt: <><b>Choose and justify a compression category for each task.</b><p>(a) Archiving a program&apos;s source code. [2]</p><p>(b) Sending a small preview of a photograph. [2]</p></>,
        answer: <p><b>(a) Lossless:</b> every character must be recovered exactly or the program may change or fail. <b>(b) Lossy:</b> a small reduction in visual detail may be acceptable and can produce a smaller file for transfer. <em>[1 choice + 1 task-linked reason each]</em></p>,
      },
    ],
  },
  {
    code: "B",
    title: "Run-length encoding and file types",
    subtitle: "Use the declared count/value rule",
    marks: 10,
    questions: [
      {
        id: "l6-4",
        marks: 4,
        lines: 4,
        prompt: <><b>This question uses the pair (count, value).</b><p>Use RLE to encode: R R R R R B B W W W W G G G</p></>,
        answer: <p>The runs are five R, two B, four W and three G, so the encoding is <strong>(5,R) (2,B) (4,W) (3,G)</strong>. <em>[1 correct runs; 1 counts; 1 values/order; 1 complete encoding]</em></p>,
      },
      {
        id: "l6-5",
        marks: 2,
        lines: 3,
        prompt: <><b>Decode this RLE data using (count, value):</b><p>(3,A) (1,B) (4,C)</p></>,
        answer: <p><strong>A A A B C C C C</strong>. Each pair gives the number of consecutive copies followed by the stored value. <em>[1 A/B run; 1 C run]</em></p>,
      },
      {
        id: "l6-6",
        marks: 2,
        lines: 3,
        prompt: <><b>Explain when RLE is effective and when it may increase file size.</b></>,
        answer: <p>RLE is effective when there are <strong>long runs of the same value</strong>. With frequent changes, many count/value pairs are required and their overhead may use <strong>more data than the original</strong>. <em>[1 each]</em></p>,
      },
      {
        id: "l6-7",
        marks: 2,
        lines: 3,
        prompt: <><b>State one suitable compression change for a bitmap and one for a sound file.</b></>,
        answer: <p>Suitable examples include: use <strong>RLE</strong> for repeated bitmap pixel colours, or reduce bitmap resolution/colour depth; for sound, reduce the <strong>sampling rate or sampling resolution</strong>, or use RLE when consecutive sample values repeat. <em>[1 specific method per file type]</em></p>,
      },
    ],
  },
  {
    code: "C",
    title: "Past paper practice",
    subtitle: "Adapted from 9618/13 M/J 2024 Q2(b)",
    marks: 10,
    questions: [
      {
        id: "l6-8",
        marks: 5,
        lines: 5,
        prompt: <><Mark>PAST PAPER PRACTICE</Mark><p><b>An image is compressed before it is transferred online.</b></p><p>(a) State three benefits of using lossy rather than lossless compression. [3]</p><p>(b) Explain how RLE can compress the bitmap data. [2]</p></>,
        answer: <p><b>(a)</b> Any three: <strong>less storage than lossless</strong>, <strong>faster transfer/download than lossless</strong>, <strong>less bandwidth</strong>, or <strong>less data allowance used</strong>. <b>(b)</b> Identify <strong>consecutive pixels with the same colour</strong>, then store the colour/pattern and the <strong>number of repetitions</strong> rather than every pixel separately. <em>[3 + 2]</em></p>,
      },
      {
        id: "l6-9",
        marks: 5,
        lines: 5,
        prompt: <><b>Describe one suitable way that each file type can be compressed:</b><p>text, bitmap image, vector graphic and sound.</p><p>For one example, explain why the method is lossy or lossless.</p></>,
        answer: <p><strong>Text:</strong> use RLE for consecutive repeated characters or shorter codes for frequent symbols. <strong>Bitmap:</strong> use RLE for repeated pixel colours, or reduce resolution/colour depth lossily. <strong>Vector:</strong> apply lossless text/pattern coding to repeated drawing-list or markup tokens. <strong>Sound:</strong> use RLE for repeated samples, or lossily reduce sampling rate/resolution. The explanation must correctly link discarded information to lossy, or exact recovery to lossless. <em>[1 specific method per file type; 1 valid category explanation]</em></p>,
      },
    ],
  },
];

export default function Lesson06Client() {
  const [revealed, setRevealed] = useState<Set<string>>(() => new Set());
  const toggleReveal = (id: string) => setRevealed((current) => {
    const next = new Set(current);
    if (next.has(id)) next.delete(id); else next.add(id);
    return next;
  });

  const slides: SlideData[] = [
    {
      time: "3 min",
      focus: "Open with the central trade-off: represent the same useful information with fewer stored bits.",
      prompt: "Ask which of the two visible strings is quicker to transmit and what rule the receiver must know.",
      source: "Coursebook Section 1.07, printed pp.21-23; syllabus 1.3, p.15.",
      content: (
        <Slide number="01" eyebrow="INFORMATION REPRESENTATION" sourceLabel="TEXTBOOK 1.07 · pp.21-23" syllabusLabel="SYLLABUS 1.3 · p.15" className="slide--l6-title">
          <section className="l6-title-grid">
            <div><span>LESSON 06 · 90 MINUTES</span><h1>Compression<br /><em>Keep the meaning. Store less.</em></h1><p>Choose what may be discarded, preserve what must remain exact, and encode repeated data efficiently.</p></div>
            <div className="l6-title-code"><article><small>ORIGINAL</small><code>A A A A A A B B B C C C C</code></article><b>declared count/value rule</b><article><small>RLE</small><code>(6,A) (3,B) (4,C)</code></article></div>
          </section>
        </Slide>
      ),
    },
    {
      time: "4 min",
      focus: "Expose every examinable outcome and separate named syllabus content from textbook context.",
      prompt: "Students identify which outcomes require explanation, application and justification.",
      source: "2027-2029 syllabus p.15, Section 1.3.",
      content: (
        <Slide number="02" eyebrow="TEXTBOOK × SYLLABUS" sourceLabel="TEXTBOOK pp.21-23" syllabusLabel="SYLLABUS 1.3 · p.15" title="The syllabus names one algorithm — and four file types." className="slide--l6-map">
          <section className="l6-route-grid"><article><span>WHY</span><h3>Need and uses</h3><p>storage · transmission · bandwidth · data allowance</p></article><article><span>WHICH</span><h3>Lossy or lossless</h3><p>distinguish · select · justify for the situation</p></article><article><span>HOW</span><h3>Compress file data</h3><p>text · bitmap · vector · sound · RLE</p></article></section>
          <p className="l6-boundary"><Mark>WEEK 06 / 32</Mark><span>RLE is named syllabus content. Huffman, SVG and frequency-domain examples are textbook context.</span></p>
        </Slide>
      ),
    },
    {
      time: "5 min",
      focus: "Retrieve Lesson 05 file-size ideas and make the need for compression concrete.",
      prompt: "Students give two practical consequences of transferring a large uncompressed bitmap.",
      source: "Coursebook p.21 transition into Section 1.07; syllabus 1.3 need for compression.",
      content: (
        <Slide number="03" eyebrow="DO NOW · RETRIEVAL" sourceLabel="TEXTBOOK p.21" syllabusLabel="SYLLABUS 1.3 — NEED & USE" title="A raw bitmap is about 24 MiB. Why might that be a problem?" className="slide--l6-retrieval">
          <section className="l6-retrieval-grid"><article><span>SCENARIO 01</span><b>thirty students save a copy</b></article><article><span>SCENARIO 02</span><b>the file uploads on a slow connection</b></article><article><span>SCENARIO 03</span><b>the receiver uses a mobile data plan</b></article></section>
          <Reveal id="retrieval" visible={revealed.has("retrieval")} onToggle={toggleReveal}><p>Compression can reduce storage use, transfer time, bandwidth demand and data usage. The suitable method depends on whether the exact original must be recovered.</p></Reveal>
        </Slide>
      ),
    },
    {
      time: "6 min",
      focus: "Connect the need for compression to practical storage and communication outcomes.",
      prompt: "For each scenario, students name the resource saved rather than saying only ‘smaller’.",
      source: "Coursebook p.21; syllabus 1.3 need for and examples of compression.",
      content: (
        <Slide number="04" eyebrow="WHY COMPRESS?" sourceLabel="TEXTBOOK p.21" syllabusLabel="SYLLABUS 1.3 — NEED & USE" title="A smaller representation changes what a system can store and send." className="slide--l6-need">
          <section className="l6-benefit-grid"><article><span>STORAGE</span><b>fit more files</b><p>Reduced file size uses less secondary storage and backup capacity.</p></article><article><span>SPEED</span><b>transfer fewer bits</b><p>Uploads, downloads and delivery can finish sooner.</p></article><article><span>NETWORK USE</span><b>consume less</b><p>Less bandwidth and data allowance may be required.</p></article></section>
          <div className="l6-exam-frame"><b>Precise exam wording</b><span>State the saved resource, then link it to the situation.</span></div>
        </Slide>
      ),
    },
    {
      time: "6 min",
      focus: "Define lossless compression through exact reversibility.",
      prompt: "Ask why one altered character could make program code or a legal document unusable.",
      source: "Coursebook pp.21-22; syllabus 1.3 lossless compression.",
      content: (
        <Slide number="05" eyebrow="LOSSLESS COMPRESSION" sourceLabel="TEXTBOOK pp.21-22" syllabusLabel="SYLLABUS 1.3 — LOSSLESS" title="Lossless decoding reconstructs the original file exactly." className="slide--l6-lossless">
          <section className="l6-recovery-flow"><article><span>ORIGINAL</span><code>THE DATA</code></article><b>encode</b><article><span>COMPRESSED</span><code>shorter code</code></article><b>decode</b><article><span>RESTORED</span><code>THE DATA</code></article></section>
          <div className="l6-equality"><strong>ORIGINAL</strong><i>=</i><strong>RESTORED</strong></div>
          <p className="l6-takeaway">Use lossless compression when every bit of meaning must survive: text, source code, records and master data.</p>
        </Slide>
      ),
    },
    {
      time: "6 min",
      focus: "Define lossy compression through irreversible information removal.",
      prompt: "Students explain why a preview image may tolerate change while source code cannot.",
      source: "Coursebook pp.21-23; syllabus 1.3 lossy compression.",
      content: (
        <Slide number="06" eyebrow="LOSSY COMPRESSION" sourceLabel="TEXTBOOK pp.21-23" syllabusLabel="SYLLABUS 1.3 — LOSSY" title="Lossy compression discards or modifies information permanently." className="slide--l6-lossy">
          <section className="l6-loss-flow"><article><span>ORIGINAL DETAIL</span><div className="l6-detail-bars"><i /><i /><i /><i /><i /><i /><i /><i /></div></article><b>remove less important detail</b><article><span>SMALLER FILE</span><div className="l6-detail-bars reduced"><i /><i /><i /><i /></div></article></section>
          <div className="l6-inequality"><strong>DECODED VERSION</strong><i>≠</i><strong>EXACT ORIGINAL</strong></div>
          <p className="l6-warning">Lossy can be suitable when a reduction in image or sound quality is acceptable for a much smaller transfer.</p>
        </Slide>
      ),
    },
    {
      time: "8 min",
      focus: "Turn definitions into situation-linked justification.",
      prompt: "Pairs choose before revealing; require ‘because’ and a consequence for the stated task.",
      source: "Syllabus 1.3 justify a method in a given situation; Coursebook pp.21-23.",
      content: (
        <Slide number="07" eyebrow="CHOOSE AND JUSTIFY" sourceLabel="TEXTBOOK pp.21-23" syllabusLabel="SYLLABUS 1.3 — JUSTIFY A METHOD" title="Start with what the task must preserve." className="slide--l6-choice">
          <section className="l6-choice-grid"><article><span>SOURCE CODE BACKUP</span><p>Every character must be restored.</p><Reveal id="choice-code" visible={revealed.has("choice-code")} onToggle={toggleReveal}><p><strong>Lossless</strong>, because discarded or altered characters could change the program.</p></Reveal></article><article><span>PHOTO THUMBNAIL</span><p>Minor visual change is acceptable.</p><Reveal id="choice-photo" visible={revealed.has("choice-photo")} onToggle={toggleReveal}><p><strong>Lossy</strong>, because some detail can be removed to make online delivery faster.</p></Reveal></article><article><span>MASTER LOGO</span><p>The editable original must remain exact.</p><Reveal id="choice-logo" visible={revealed.has("choice-logo")} onToggle={toggleReveal}><p><strong>Lossless</strong>, so the original drawing data can be reconstructed.</p></Reveal></article><article><span>MUSIC PREVIEW</span><p>Small quality loss is acceptable.</p><Reveal id="choice-sound" visible={revealed.has("choice-sound")} onToggle={toggleReveal}><p><strong>Lossy</strong>, to reduce the data transferred while keeping acceptable sound.</p></Reveal></article></section>
        </Slide>
      ),
    },
    {
      time: "6 min",
      focus: "Map the syllabus file types to suitable compression ideas without over-teaching optional algorithms.",
      prompt: "Students identify which examples preserve the exact original and which deliberately reduce detail.",
      source: "Coursebook pp.22-23; syllabus 1.3 text, bitmap, vector and sound files.",
      content: (
        <Slide number="08" eyebrow="FOUR FILE TYPES" sourceLabel="TEXTBOOK pp.22-23" syllabusLabel="SYLLABUS 1.3 — FILE-TYPE COMPRESSION" title="The useful method depends on the structure of the data." className="slide--l6-file-types">
          <section className="l6-file-grid"><article><span>TEXT</span><b>lossless patterns</b><p>Repeated runs or shorter codes for frequent symbols.</p></article><article><span>BITMAP</span><b>pixels and detail</b><p>RLE repeated colours; or reduce resolution/depth lossily.</p></article><article><span>VECTOR</span><b>drawing data</b><p>Losslessly encode the drawing list or markup.</p></article><article><span>SOUND</span><b>sample data</b><p>Lossless coding, or reduce sampled detail lossily.</p></article></section>
          <div className="l6-context-strip"><Mark>TEXTBOOK CONTEXT</Mark><span>Huffman coding · SVG markup · frequency-domain sound examples</span></div>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Teach a declared count/value RLE rule and the idea of consecutive runs.",
      prompt: "Students locate the run boundaries before writing any count/value pairs.",
      source: "Coursebook p.22; syllabus 1.3 includes run-length encoding.",
      content: (
        <Slide number="09" eyebrow="RUN-LENGTH ENCODING" sourceLabel="TEXTBOOK p.22" syllabusLabel="SYLLABUS 1.3 — RLE" title="Replace each consecutive run with its count and value." className="slide--l6-rle-rule">
          <section className="l6-run-demo"><div><span>ORIGINAL</span><code><b>AAAAAA</b><i>BB</i><strong>CCCC</strong></code></div><b>group runs</b><div><span>(COUNT, VALUE)</span><code>(6,A) (2,B) (4,C)</code></div></section>
          <ol className="l6-rle-steps"><li><span>01</span><p>Scan values in order.</p></li><li><span>02</span><p>Find consecutive identical values.</p></li><li><span>03</span><p>Store the repetition count, then the value.</p></li></ol>
          <p className="l6-warning"><b>Rule first:</b> this lesson uses (count, value). An exam question may declare a different order.</p>
        </Slide>
      ),
    },
    {
      time: "8 min",
      focus: "Apply RLE to a bitmap row and use a checksum to catch counting errors.",
      prompt: "Students encode independently, then check that their counts total 16 before revealing.",
      source: "Coursebook p.22 RLE principle, adapted as an original bitmap-row task.",
      content: (
        <Slide number="10" eyebrow="GUIDED RLE ENCODING" sourceLabel="TEXTBOOK p.22 · ADAPTED TASK" syllabusLabel="SYLLABUS 1.3 — RLE" title="Encode this 16-pixel row using (count, colour)." className="slide--l6-rle-practice">
          <section className="l6-pixel-run" role="img" aria-label="Six white pixels, three red pixels, five blue pixels and two white pixels">{["w","w","w","w","w","w","r","r","r","b","b","b","b","b","w","w"].map((colour, index) => <i className={`l6-pixel-${colour}`} key={index} />)}</section>
          <div className="l6-symbol-row"><code>W W W W W W · R R R · B B B B B · W W</code></div>
          <Reveal id="rle-row" visible={revealed.has("rle-row")} onToggle={toggleReveal}><p><strong>(6,W) (3,R) (5,B) (2,W)</strong>. Check: 6 + 3 + 5 + 2 = 16 pixels.</p></Reveal>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Decode RLE and explain why it is data-dependent rather than automatically smaller.",
      prompt: "Students decode the first example, then compare the number of runs in the two rows.",
      source: "Coursebook p.22 RLE strengths and limitations; syllabus 1.3.",
      content: (
        <Slide number="11" eyebrow="DECODE · THEN EVALUATE" sourceLabel="TEXTBOOK p.22" syllabusLabel="SYLLABUS 1.3 — RLE" title="RLE works well only when the runs are long enough." className="slide--l6-rle-limits">
          <section className="l6-decode-task"><article><span>DECODE</span><code>(4,N) (1,O) (3,N)</code><Reveal id="decode" visible={revealed.has("decode")} onToggle={toggleReveal}><code>N N N N O N N N</code></Reveal></article><article><span>EFFECTIVE</span><code>BBBBBBBBBBBB</code><p>one long run → one pair</p></article><article><span>INEFFICIENT</span><code>BWBWBWBWBWBW</code><p>twelve runs → count overhead</p></article></section>
          <p className="l6-takeaway">RLE is lossless: decoding restores every original value, provided the rule and counts are correct.</p>
        </Slide>
      ),
    },
    {
      time: "6 min",
      focus: "Contrast exact text recovery with the two main bitmap choices.",
      prompt: "Ask why ordinary text cannot tolerate a nearest-looking replacement character.",
      source: "Coursebook pp.22-23; syllabus 1.3 text and bitmap compression.",
      content: (
        <Slide number="12" eyebrow="TEXT & BITMAP" sourceLabel="TEXTBOOK pp.22-23" syllabusLabel="SYLLABUS 1.3 — FILE TYPES" title="Preserve symbols exactly; decide whether image detail may change." className="slide--l6-text-bitmap">
          <section className="l6-two-files"><article><span>TEXT · LOSSLESS</span><h3>Every character matters</h3><p>Encode repeated or frequent patterns more efficiently, then restore the exact sequence.</p><div><Mark>TEXTBOOK CONTEXT</Mark><small>Huffman: frequent characters can use shorter codes.</small></div></article><article><span>BITMAP · TWO ROUTES</span><h3>Preserve or reduce detail</h3><p><b>Lossless:</b> RLE consecutive same-colour pixels.<br /><b>Lossy:</b> reduce image resolution or colour depth.</p></article></section>
        </Slide>
      ),
    },
    {
      time: "6 min",
      focus: "Complete the four-file syllabus objective while keeping advanced examples visibly contextual.",
      prompt: "Students state what information is preserved or discarded in each route.",
      source: "Coursebook p.23; syllabus 1.3 vector and sound compression.",
      content: (
        <Slide number="13" eyebrow="VECTOR & SOUND" sourceLabel="TEXTBOOK p.23" syllabusLabel="SYLLABUS 1.3 — FILE TYPES" title="Compress structured drawing data and sampled sound according to purpose." className="slide--l6-vector-sound">
          <section className="l6-two-files"><article><span>VECTOR · LOSSLESS MASTER</span><h3>Keep drawing objects editable</h3><p>Encode repeated or structured drawing-list data without changing objects or properties.</p><div><Mark>TEXTBOOK CONTEXT</Mark><small>SVG uses textual markup that can be losslessly compressed.</small></div></article><article><span>SOUND · CHOOSE</span><h3>Exact samples or smaller delivery</h3><p><b>Lossless:</b> preserve every sample value.<br /><b>Lossy:</b> reduce sampling rate/resolution or remove less audible detail.</p><div><Mark>TEXTBOOK CONTEXT</Mark><small>Frequency-domain methods are an example, not a named syllabus algorithm.</small></div></article></section>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Apply the exact marking points from a recent Paper 1 question without reproducing its wording at length.",
      prompt: "Give four minutes of silent writing, then reveal and self-mark against the five points.",
      source: "Adapted from 9618/13 M/J 2024 Q2(b)(i)-(ii).",
      content: (
        <Slide number="14" eyebrow="PAST PAPER PRACTICE · 5 MARKS" sourceLabel="Adapted from 9618/13 M/J 2024 Q2(b)" syllabusLabel="SYLLABUS 1.3" title="Benefits first. Then explain the RLE mechanism." className="slide--l6-past-paper">
          <div className="l6-paper-banner"><Mark>PAST PAPER PRACTICE</Mark><span>9618/13 · MAY/JUNE 2024 · Q2(b) · ADAPTED</span></div>
          <section className="l6-paper-grid"><article><span>01 · LOSSY · [3]</span><p>State three benefits of using lossy rather than lossless compression before online transfer.</p><Reveal id="paper-lossy" visible={revealed.has("paper-lossy")} onToggle={toggleReveal}><p>Any three: <strong>less storage than lossless</strong>, <strong>faster transfer than lossless</strong>, <strong>less bandwidth</strong>, <strong>less data allowance</strong>.</p></Reveal></article><article><span>02 · RLE · [2]</span><p>Explain how RLE can compress the bitmap data.</p><Reveal id="paper-rle" visible={revealed.has("paper-rle")} onToggle={toggleReveal}><p>Find <strong>consecutive same-colour pixels</strong>; store the colour/pattern and its <strong>count</strong>.</p></Reveal></article></section>
        </Slide>
      ),
    },
    {
      time: "5 min",
      focus: "Finish with one definition, one RLE application and one justified choice.",
      prompt: "Students answer all three independently; reveal only after every student has committed.",
      source: "Syllabus 1.3 exit check; Coursebook printed pp.21-23.",
      content: (
        <Slide number="15" eyebrow="EXIT TICKET · 5 MARKS" sourceLabel="TEXTBOOK pp.21-23" syllabusLabel="SYLLABUS 1.3" title="Recover. Encode. Justify." className="slide--l6-exit">
          <section className="l6-exit-grid"><article><span>DEFINE · [2]</span><p>Give one difference between lossy and lossless compression.</p><Reveal id="exit-define" visible={revealed.has("exit-define")} onToggle={toggleReveal}><p>Lossless can restore the exact original; lossy permanently discards or changes information.</p></Reveal></article><article><span>ENCODE · [2]</span><p>Use (count,value): K K K K M M</p><Reveal id="exit-rle" visible={revealed.has("exit-rle")} onToggle={toggleReveal}><p><strong>(4,K) (2,M)</strong></p></Reveal></article><article><span>JUSTIFY · [1]</span><p>Lossy or lossless for a text file?</p><Reveal id="exit-choice" visible={revealed.has("exit-choice")} onToggle={toggleReveal}><p><strong>Lossless</strong>, because every character must be recovered exactly.</p></Reveal></article></section>
          <div className="l6-homework-callout"><b>HOMEWORK 06</b><span>30 marks · about 45 minutes · answers remain beside each question</span><strong>USE HOMEWORK TAB ↑</strong></div>
        </Slide>
      ),
    },
  ];

  const homework = (
    <HomeworkSheet
      lessonNumber="06"
      title="Lossy, Lossless & Run-Length Encoding"
      marks={30}
      minutes={45}
      syllabusLabel="SYLLABUS 1.3"
      sourceLabel="TEXTBOOK 1.07 · pp.21-23"
      instructions="Use the declared count/value order for every RLE question. For compression choices, name the category and link it to what the task must preserve. The adapted past-paper question is in Section C. Answers remain inline for teaching and printing."
      sections={homeworkSections}
      challenge={{
        id: "l6-challenge",
        prompt: <p>A 16-pixel row alternates black and white throughout. Encode it using (count, colour), then explain why RLE may make this representation larger rather than smaller.</p>,
        answer: <p>The encoding needs 16 separate runs: <strong>(1,B) (1,W)</strong> repeated eight times. Every one-pixel run needs both a count and a value, so the added counts can create more data than storing the original pixel values.</p>,
      }}
    />
  );

  return (
    <LessonShell
      lessonNumber="06"
      slides={slides}
      homework={homework}
      lessonLinks={[
        { label: "01", href: "../" },
        { label: "02", href: "../lesson-02/" },
        { label: "03", href: "../lesson-03/" },
        { label: "04", href: "../lesson-04/" },
        { label: "05", href: "../lesson-05/" },
        { label: "06", href: "../lesson-06/", active: true },
        { label: "07", href: "../lesson-07/" },
      ]}
      courseMapHref="../?view=roadmap"
      sourceSummary="Checked against syllabus 1.3 on p.15, Coursebook Section 1.07 printed pp.21-23, and an adapted 2024 AS Paper 1 question."
      sourceDetail="Syllabus p.15 Section 1.3: the need for compression; lossy and lossless compression; justified method choice; compression of text, bitmap, vector and sound files; and run-length encoding · Coursebook Section 1.07 printed pp.21-23. Huffman coding, SVG markup and frequency-domain sound methods are explicitly labelled as textbook context · Past-paper practice is adapted from 9618/13 M/J 2024 Q2(b)(i)-(ii), with short rewritten prompts and mark-scheme concepts rather than reproduced paper text."
    />
  );
}
