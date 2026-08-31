"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
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
    <div className="l5-reveal">
      <button type="button" onClick={() => onToggle(id)} aria-expanded={visible} aria-controls={`l5-reveal-${id}`}>
        {visible ? "Hide answer" : "Reveal answer"}
      </button>
      <div id={`l5-reveal-${id}`} className={visible ? "l5-reveal__panel visible" : "l5-reveal__panel"} hidden={!visible}>
        {children}
      </div>
    </div>
  );
}

function WavePlot({ samples = 0 }: { samples?: number }) {
  const waveCentres = [50, 14.3, 50, 85.7, 50, 14.3, 50, 85.7, 50];
  const samplePoints = Array.from({ length: samples }, (_, index) => {
    const x = 10 + (160 * index) / Math.max(samples - 1, 1);
    const xPercent = x / 1.8;
    const waveSegment = xPercent / 12.5;
    const segmentIndex = Math.min(Math.floor(waveSegment), waveCentres.length - 2);
    const segmentProgress = waveSegment - segmentIndex;
    const yPercent = waveCentres[segmentIndex] + (waveCentres[segmentIndex + 1] - waveCentres[segmentIndex]) * segmentProgress;
    return { x: `${xPercent}%`, y: `${yPercent}%` };
  });

  return (
    <div className="l5-wave-plot" role="img" aria-label={samples ? `${samples} regular samples taken from the same continuous waveform` : "A continuous analogue waveform"}>
      {samplePoints.map((point, index) => <i key={index} style={{ "--sample-x": point.x, "--sample-y": point.y } as CSSProperties} />)}
    </div>
  );
}

const homeworkSections: HomeworkSection[] = [
  {
    code: "A",
    title: "Vector graphics",
    subtitle: "Drawing lists, objects, properties and justified choices",
    marks: 10,
    questions: [
      {
        id: "l5-1",
        marks: 3,
        lines: 4,
        prompt: <><b>Describe how a vector graphic is encoded.</b><p>Use the terms drawing list, drawing object and property.</p></>,
        answer: <p>A vector file stores a <strong>drawing list</strong> of <strong>drawing objects</strong>. Each object is defined by <strong>properties</strong>, such as its coordinates, size, line style and fill colour. Software follows the list to redraw the image. <em>[1 per required term used correctly]</em></p>,
      },
      {
        id: "l5-2",
        marks: 3,
        lines: 4,
        prompt: <><b>A simple icon contains a blue circle above a black vertical line.</b><p>Give three suitable items of data that its drawing list could store.</p></>,
        answer: <p>Examples include: the circle&apos;s <strong>centre coordinates</strong>, <strong>radius</strong> and <strong>blue fill</strong>; and the line&apos;s <strong>start/end coordinates</strong>, thickness or black stroke colour. Award one mark for each relevant object/property value, to a maximum of three. <em>[3]</em></p>,
      },
      {
        id: "l5-3",
        marks: 4,
        lines: 4,
        prompt: <><b>Choose a suitable representation for each task and justify your choice.</b><p>(a) A company logo must be printed on both a pen and a billboard. [2]</p><p>(b) A detailed photograph of a forest is placed on a webpage. [2]</p></>,
        answer: <p><b>(a) Vector:</b> the objects can be redrawn at different sizes without pixelation, so edges remain smooth. <b>(b) Bitmap:</b> a photograph contains many irregular colour and tonal variations that are naturally recorded as a pixel grid. <em>[1 choice + 1 linked reason each]</em></p>,
      },
    ],
  },
  {
    code: "B",
    title: "Bitmap file-size calculations",
    subtitle: "Show the formula, bit-to-byte conversion and sensible units",
    marks: 10,
    questions: [
      {
        id: "l5-4",
        marks: 3,
        lines: 4,
        prompt: <><b>Estimate the raw pixel data for a 1366 × 768 bitmap using 24 bits per pixel.</b><p>Give the result in bits, bytes and MiB.</p></>,
        answer: <p>1366 × 768 × 24 = <strong>25,178,112 bits</strong>. Divide by 8 to obtain <strong>3,147,264 bytes</strong>. Divide by 1,024² to obtain <strong>3.001… MiB ≈ 3.00 MiB</strong>. <em>[1 bits; 1 bytes; 1 sensible magnitude]</em></p>,
      },
      {
        id: "l5-5",
        marks: 4,
        lines: 4,
        prompt: <><b>A 5 inch × 3 inch image is rendered at 72 pixels per inch and uses 24 bits per pixel.</b><p>Calculate the raw pixel data in bytes and KiB.</p></>,
        answer: <p>Pixel dimensions: 5 × 72 = <strong>360</strong> and 3 × 72 = <strong>216</strong>. The image has 360 × 216 = 77,760 pixels. At 24 bits = 3 bytes per pixel: 77,760 × 3 = <strong>233,280 bytes</strong>. 233,280 ÷ 1,024 = <strong>227.8125 KiB ≈ 227.8 KiB</strong>. <em>[1 dimensions; 1 pixel count/method; 1 bytes; 1 KiB]</em></p>,
      },
      {
        id: "l5-6",
        marks: 3,
        lines: 4,
        prompt: <><b>A bitmap&apos;s width and height are both doubled, while its colour depth changes from 8 to 24 bits per pixel.</b><p>State the raw-size multiplier and explain why a real file may not equal the calculated value.</p></>,
        answer: <p>Doubling both dimensions gives <strong>four times as many pixels</strong>; increasing 8 to 24 bits gives <strong>three times as many bits per pixel</strong>. The raw pixel data are therefore <strong>12 times larger</strong>. A real file also includes a <strong>file header/metadata</strong>, so the formula is an estimate of pixel data rather than the complete stored file. <em>[1 ×4 pixels; 1 final ×12 multiplier; 1 header explanation]</em></p>,
      },
    ],
  },
  {
    code: "C",
    title: "Digital sound",
    subtitle: "Sampling rate, sampling resolution, accuracy and size",
    marks: 10,
    questions: [
      {
        id: "l5-7",
        marks: 2,
        lines: 3,
        prompt: <><b>Distinguish analogue data from digital data.</b></>,
        answer: <p><strong>Analogue data</strong> can vary continuously across a range. <strong>Digital data</strong> uses discrete values represented in binary. <em>[1 each]</em></p>,
      },
      {
        id: "l5-8",
        marks: 2,
        lines: 4,
        prompt: <><b>Explain sampling rate and sampling resolution.</b><p>For each term, state what is measured or controlled.</p></>,
        answer: <p><strong>Sampling rate</strong> is the number of amplitude samples taken per second. <strong>Sampling resolution</strong> is the number of bits used to store each sample. <em>[1 each]</em></p>,
      },
      {
        id: "l5-9",
        marks: 4,
        lines: 4,
        prompt: <><b>Explain the separate effects of increasing sampling rate and increasing sampling resolution.</b><p>For each change, refer to accuracy and uncompressed file size.</p></>,
        answer: <p>A higher <strong>sampling rate</strong> takes more measurements per second, so rapid changes are tracked more closely, but more samples make the file larger. A higher <strong>sampling resolution</strong> provides more amplitude levels and reduces quantisation error, but more bits per sample make the file larger. <em>[1 linked accuracy effect + 1 size effect for each term]</em></p>,
      },
      {
        id: "l5-10",
        marks: 2,
        lines: 4,
        prompt: <><Mark>DERIVED EXAM PRACTICE</Mark> <b>A 20-second mono recording is sampled at 8,000 Hz using 8 bits per sample.</b><p>Calculate its uncompressed size in bytes.</p></>,
        answer: <p>8,000 × 20 × 8 = 1,280,000 bits. Divide by 8 to obtain <strong>160,000 bytes</strong>. This formula is useful derived practice; the syllabus explicitly requires the effects of rate and resolution rather than a sound-size calculation objective. <em>[1 method; 1 answer]</em></p>,
      },
    ],
  },
];

export default function Lesson05Client() {
  const [revealed, setRevealed] = useState<Set<string>>(() => new Set());
  const toggleReveal = (id: string) => setRevealed((current) => {
    const next = new Set(current);
    if (next.has(id)) next.delete(id); else next.add(id);
    return next;
  });

  const slides: SlideData[] = [
    {
      time: "3 min",
      focus: "Frame the lesson around three ways of describing continuous-looking media with discrete data.",
      prompt: "Ask which representation stores the instructions for a shape, every pixel colour, and regular measurements of a waveform.",
      source: "Coursebook Sections 1.05-1.06, printed pp.17-21; syllabus 1.2.",
      content: (
        <Slide number="01" eyebrow="MULTIMEDIA REPRESENTATION" sourceLabel="TEXTBOOK 1.05-1.06 · pp.17-21" syllabusLabel="SYLLABUS 1.2" className="slide--l5-title">
          <section className="l5-title-grid">
            <div className="l5-title-copy"><span>LESSON 05 · 90 MINUTES</span><h1>Vectors, File Size<br /><em>&amp; Digital Sound</em></h1><p>Describe the structure, calculate the data, then justify the representation.</p></div>
            <div className="l5-hero-media" role="img" aria-label="Vector objects, bitmap pixels and sampled sound"><article className="l5-hero-vector"><i /><i /><i /><b>objects</b></article><article className="l5-hero-bitmap"><i /><i /><i /><i /><i /><i /><i /><i /><i /><b>pixels</b></article><article className="l5-hero-wave"><div><i /><i /><i /><i /><i /><i /><i /></div><b>samples</b></article></div>
          </section>
        </Slide>
      ),
    },
    {
      time: "4 min",
      focus: "Make the exact Coursebook path and syllabus outcomes visible, while preserving the boundary with Lesson 06.",
      prompt: "Students sort the outcomes into describe, calculate and justify.",
      source: "Syllabus p.15, Section 1.2; Coursebook printed pp.17-21.",
      content: (
        <Slide number="02" eyebrow="TEXTBOOK × SYLLABUS" sourceLabel="TEXTBOOK pp.17-21" syllabusLabel="SYLLABUS 1.2" title="Today completes the representation of uncompressed graphics and sound." className="slide--l5-map">
          <section className="l5-route-grid"><article><span>VECTOR GRAPHICS</span><h3>Describe &amp; justify</h3><p>drawing object → property → drawing list → suitable use</p></article><article><span>BITMAP GRAPHICS</span><h3>Estimate &amp; interpret</h3><p>resolution × colour depth → bits → bytes → sensible unit</p></article><article><span>DIGITAL SOUND</span><h3>Explain effects</h3><p>analogue signal → sampling → binary values</p></article></section>
          <p className="l5-boundary"><Mark>WEEK 05 / 32</Mark><span>Compression is only previewed today; its methods and calculations begin in Lesson 06.</span></p>
        </Slide>
      ),
    },
    {
      time: "5 min",
      focus: "Retrieve the bitmap model from Lesson 04 and enforce a complete unit-conversion chain.",
      prompt: "Give students two minutes for the calculation before revealing the exact byte and KiB values.",
      source: "Coursebook Chapter 1 exam-style Question 2, printed p.24; Lesson 04 retrieval.",
      content: (
        <Slide number="03" eyebrow="DO NOW · BITMAP RETRIEVAL" sourceLabel="TEXTBOOK EXAM Q2 · p.24" syllabusLabel="SYLLABUS 1.2" title="A 640 × 480 bitmap uses 16 bits per pixel. Estimate its raw size." className="slide--l5-retrieval">
          <section className="l5-retrieval-grid"><article><span>STEP 1</span><b>count pixels</b><code>640 × 480</code></article><article><span>STEP 2</span><b>count bits</b><code>pixels × 16</code></article><article><span>STEP 3</span><b>convert units</b><code>÷ 8, then ÷ 1,024</code></article></section>
          <Reveal id="retrieval" visible={revealed.has("retrieval")} onToggle={toggleReveal}><p>640 × 480 × 16 = 4,915,200 bits = <strong>614,400 bytes = 600 KiB</strong>, before a file header.</p></Reveal>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Teach the exact three-term vector model required by the syllabus.",
      prompt: "Students complete the sentence: a drawing list contains ___; each is described by ___.",
      source: "Coursebook Section 1.05, printed p.17; syllabus 1.2 vector terms.",
      content: (
        <Slide number="04" eyebrow="VECTOR ENCODING" sourceLabel="TEXTBOOK 1.05 · p.17" syllabusLabel="SYLLABUS 1.2" title="A vector file stores instructions for reconstructing an image." className="slide--l5-vector-model">
          <section className="l5-vector-hierarchy"><article><span>DRAWING LIST</span><b>ordered description of the whole graphic</b></article><i>contains</i><article><span>DRAWING OBJECTS</span><b>lines, curves, circles, polygons and text</b></article><i>defined by</i><article><span>PROPERTIES</span><b>coordinates, size, stroke, thickness and fill</b></article></section>
          <p className="l5-takeaway">The pixels are calculated when software <b>renders</b> the instructions for a particular display or print size.</p>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Translate an original icon into a compact drawing list and separate object type from property value.",
      prompt: "Pairs propose one more property for each object, then predict which line is redrawn last.",
      source: "Coursebook p.17, Task 1.05 concept, adapted as an original worked example.",
      content: (
        <Slide number="05" eyebrow="FROM OBJECTS TO A DRAWING LIST" sourceLabel="TEXTBOOK p.17 · ADAPTED TASK" syllabusLabel="SYLLABUS 1.2" title="One image can be reconstructed from a short list of objects and properties." className="slide--l5-drawing-list">
          <section className="l5-drawing-worked"><div className="l5-person-icon" role="img" aria-label="Simple icon made from a circle and five lines"><i className="l5-icon-head" /><i className="l5-icon-body" /><i className="l5-icon-arm l5-icon-arm--left" /><i className="l5-icon-arm l5-icon-arm--right" /><i className="l5-icon-leg l5-icon-leg--left" /><i className="l5-icon-leg l5-icon-leg--right" /></div><ol><li><b>CIRCLE</b><code>centre (120, 54) · radius 28 · fill amber</code></li><li><b>LINE</b><code>(120, 82) → (120, 160) · width 12 · navy</code></li><li><b>LINES</b><code>arms and legs · endpoint coordinates · round caps</code></li></ol></section>
          <p className="l5-takeaway">Coordinates and other properties stay editable: changing one value can move, recolour or resize one object.</p>
        </Slide>
      ),
    },
    {
      time: "6 min",
      focus: "Explain why mathematical object descriptions scale without exposing a fixed pixel grid.",
      prompt: "Ask what changes in the file when the display size doubles: the object properties may stay the same while rendering uses more pixels.",
      source: "Coursebook p.17, scalable vector explanation; syllabus 1.2.",
      content: (
        <Slide number="06" eyebrow="SCALING AND EDITING" sourceLabel="TEXTBOOK p.17" syllabusLabel="SYLLABUS 1.2" title="Vector objects are recalculated at the requested size." className="slide--l5-scale">
          <section className="l5-scale-pair"><article><span>32 × 32 DISPLAY</span><div className="l5-vector-mark l5-vector-mark--small"><b>A</b><i /><i /><i /><i /></div><p>same object description</p></article><i>redraw</i><article><span>320 × 320 DISPLAY</span><div className="l5-vector-mark l5-vector-mark--large"><b>A</b><i /><i /><i /><i /></div><p>smooth mathematical edges</p></article></section>
          <p className="l5-warning"><b>Precise wording:</b> a vector image avoids bitmap pixelation when enlarged because its objects are redrawn. A display still ultimately uses pixels.</p>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Turn representation choice into a task-linked justification rather than a memorised slogan.",
      prompt: "Use the visible summary, then make students justify two unseen scenarios: a scalable map icon and a detailed satellite photograph.",
      source: "Coursebook pp.19-20, selection examples; syllabus 1.2 comparison objective; recent Paper 1 style.",
      content: (
        <Slide number="07" eyebrow="BITMAP OR VECTOR?" sourceLabel="TEXTBOOK pp.19-20" syllabusLabel="SYLLABUS 1.2" title="Choose from the task — then justify with a linked property." className="slide--l5-choice">
          <section className="l5-choice-grid"><article className="l5-choice-vector"><span>VECTOR</span><h3>Logo · icon · technical diagram</h3><ul><li>smooth scaling across output sizes</li><li>individual objects remain editable</li><li>precise geometric shapes</li></ul></article><article className="l5-choice-bitmap"><span>BITMAP</span><h3>Photograph · scanned art · camera image</h3><ul><li>records complex pixel-by-pixel colour</li><li>natural fit for captured images</li><li>fine texture and tonal detail</li></ul></article></section>
          <div className="l5-justify-frame"><b>Exam frame</b><span>Use ___ because its ___ means that ___ for this task.</span></div>
        </Slide>
      ),
    },
    {
      time: "6 min",
      focus: "Make the raw bitmap formula and every unit conversion explicit.",
      prompt: "Students annotate where the bit-to-byte conversion occurs and when to use 1,024 rather than 1,000.",
      source: "Coursebook printed pp.19-20; syllabus 1.2 bitmap file-size estimation.",
      content: (
        <Slide number="08" eyebrow="BITMAP FILE-SIZE METHOD" sourceLabel="TEXTBOOK pp.19-20" syllabusLabel="SYLLABUS 1.2" title="Count pixels, count bits per pixel, then convert once." className="slide--l5-bitmap-formula">
          <div className="l5-formula-hero"><span>raw pixel data in bits</span><b>width × height × colour depth</b></div>
          <section className="l5-unit-options"><article><span>DECIMAL UNITS</span><b>B ÷ 1,000 → kB ÷ 1,000 → MB</b><p>2,000,000 pixels × 16 bits ÷ 8 = <strong>4 MB</strong></p></article><article><span>BINARY UNITS</span><b>B ÷ 1,024 → KiB ÷ 1,024 → MiB</b><p>Follow the unit or definition supplied in the question.</p></article></section>
          <p className="l5-takeaway">If the depth is 8 bits for <b>each</b> RGB component, use 8 + 8 + 8 = <b>24 bits per pixel</b>.</p>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Model the Coursebook screen-bitmap example with exact arithmetic and a sensible final magnitude.",
      prompt: "Students estimate the result first; reveal the worked chain only after they have committed to an answer.",
      source: "Coursebook p.19, worked bitmap calculation.",
      content: (
        <Slide number="09" eyebrow="TEXTBOOK WORKED EXAMPLE" sourceLabel="TEXTBOOK p.19" syllabusLabel="SYLLABUS 1.2" title="1366 × 768 pixels at 24 bits per pixel." className="slide--l5-screen-calc">
          <div className="l5-calc-prompt"><code>1366 × 768 × 24 bits</code><span>Predict the order of magnitude, then calculate.</span></div>
          <Reveal id="screen-calc" visible={revealed.has("screen-calc")} onToggle={toggleReveal}><ol className="l5-calculation-stack"><li><span>PIXEL BITS</span><code>1366 × 768 × 24</code><b>25,178,112 bits</b></li><li><span>BYTES</span><code>25,178,112 ÷ 8</code><b>3,147,264 B</b></li><li><span>MEBIBYTES</span><code>3,147,264 ÷ 1,024²</code><b>3.001… MiB ≈ 3 MiB</b></li></ol></Reveal>
          <p className="l5-warning"><b>Estimate:</b> this is the raw pixel data. A file header stores extra information.</p>
        </Slide>
      ),
    },
    {
      time: "6 min",
      focus: "Reconstruct the Coursebook print example from physical dimensions to pixel dimensions to bytes.",
      prompt: "Students identify the two different units and complete the calculation; reveal the textbook chain to self-mark.",
      source: "Coursebook pp.19-20, Worked Example 1.04.",
      content: (
        <Slide number="10" eyebrow="TEXTBOOK WORKED EXAMPLE 1.04" sourceLabel="TEXTBOOK pp.19-20" syllabusLabel="SYLLABUS 1.2" title="A 5 × 3 inch image at 72 pixels/inch and 24 bits/pixel." className="slide--l5-print-calc">
          <div className="l5-calc-prompt"><code>5 × 3 inches · 72 pixels/inch · 24 bits/pixel</code><span>Find pixel dimensions first.</span></div>
          <Reveal id="print-calc" visible={revealed.has("print-calc")} onToggle={toggleReveal}><section className="l5-print-flow"><article><span>PHYSICAL → PIXELS</span><p><b>5 × 72 = 360 px</b><b>3 × 72 = 216 px</b></p></article><article><span>COUNT PIXELS</span><p><b>360 × 216</b><strong>77,760 pixels</strong></p></article><article><span>COUNT BYTES</span><p><b>77,760 × 24 ÷ 8</b><strong>233,280 B</strong></p></article><article><span>CONVERT</span><p><b>233,280 ÷ 1,024</b><strong>227.8 KiB</strong></p></article></section></Reveal>
          <p className="l5-takeaway">Keep <b>pixels per inch</b> separate from <b>bits per pixel</b>: one finds image dimensions; the other finds data per pixel.</p>
        </Slide>
      ),
    },
    {
      time: "5 min",
      focus: "Explain why the syllabus calls the calculation an estimate and prepare the conceptual hand-off to compression.",
      prompt: "Ask students whether the formula describes the entire file or only its raw pixel data.",
      source: "Coursebook p.20, file-header note; syllabus 1.2 estimate wording.",
      content: (
        <Slide number="11" eyebrow="WHY IS IT AN ESTIMATE?" sourceLabel="TEXTBOOK p.20" syllabusLabel="SYLLABUS 1.2" title="A complete file stores more than its pixel grid." className="slide--l5-estimate">
          <section className="l5-file-anatomy"><article><span>FILE HEADER</span><p>dimensions · colour depth · format/encoding details · palette information</p></article><article><span>PIXEL DATA</span><p>width × height colour codes</p></article></section>
          <div className="l5-estimate-rule"><b>raw calculation + header overhead</b><span>gives an uncompressed-file estimate</span></div>
          <p className="l5-next-note"><Mark>NEXT · LESSON 06</Mark><span>Compression can change the stored size. Its methods and ratios are deliberately deferred.</span></p>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Build the full sound-encoding pipeline from a continuous signal to discrete binary samples.",
      prompt: "Students narrate where continuous data becomes discrete and identify the role of the ADC.",
      source: "Coursebook Section 1.06, printed pp.20-21; syllabus 1.2 sound encoding.",
      content: (
        <Slide number="12" eyebrow="ANALOGUE → DIGITAL SOUND" sourceLabel="TEXTBOOK 1.06 · pp.20-21" syllabusLabel="SYLLABUS 1.2" title="An ADC measures the waveform at regular time intervals." className="slide--l5-sound-pipeline">
          <section className="l5-sound-flow"><article><span>01 · ANALOGUE</span><WavePlot /><p>continuous amplitude</p></article><b>sample</b><article><span>02 · MEASURE</span><WavePlot samples={7} /><p>regular time intervals</p></article><b>quantise</b><article><span>03 · DIGITAL</span><code>0110 1001 1100…</code><p>nearest defined levels stored in binary</p></article></section>
          <p className="l5-takeaway"><b>Analogue:</b> continuous range. <b>Digital:</b> discrete binary values.</p>
        </Slide>
      ),
    },
    {
      time: "6 min",
      focus: "Isolate sampling rate as measurements per second and link it to waveform detail and file size.",
      prompt: "Compare the two dot patterns. Students explain which follows a rapidly changing waveform more closely and why.",
      source: "Coursebook p.21; syllabus 1.2 sampling and sampling rate.",
      content: (
        <Slide number="13" eyebrow="SAMPLING RATE" sourceLabel="TEXTBOOK p.21" syllabusLabel="SYLLABUS 1.2" title="Sampling rate is the number of samples taken each second." className="slide--l5-rate">
          <section className="l5-rate-compare"><article><span>LOWER RATE</span><WavePlot samples={4} /><p>fewer measurements per second</p><b>smaller file · less temporal accuracy</b></article><article><span>HIGHER RATE</span><WavePlot samples={10} /><p>more measurements per second</p><b>larger file · closer waveform tracking</b></article></section>
          <div className="l5-definition-strip"><p><b>8,000 Hz</b><span>8,000 samples every second</span></p><p><b>duration ↑</b><span>more samples + larger file; accuracy unchanged</span></p></div>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Connect bits per sample to amplitude levels, then derive a transparent uncompressed sound-size relationship without presenting it as an explicit syllabus calculation objective.",
      prompt: "Students calculate the number of levels for 4-bit and 16-bit samples, then follow the labelled derived example.",
      source: "Coursebook p.21; syllabus 1.2 sampling resolution and file-size effects. Sound-size formula is derived exam practice.",
      content: (
        <Slide number="14" eyebrow="SAMPLING RESOLUTION" sourceLabel="TEXTBOOK p.21" syllabusLabel="SYLLABUS 1.2 + DERIVED EXAM PRACTICE" title="Sampling resolution is the number of bits used for each sample." className="slide--l5-resolution-sound">
          <section className="l5-resolution-compare"><article><span>4 BITS / SAMPLE</span><div className="l5-quant-levels l5-quant-levels--low" role="img" aria-label="Schematic showing wider spacing between quantisation levels"><i /><i /><i /><i /><small>spacing shown schematically</small></div><b>2⁴ = 16 levels</b><p>larger rounding steps between allowed amplitudes</p></article><article><span>16 BITS / SAMPLE</span><div className="l5-quant-levels l5-quant-levels--high" role="img" aria-label="Schematic showing denser spacing between quantisation levels"><i /><i /><i /><i /><i /><i /><i /><i /><small>spacing shown schematically</small></div><b>2¹⁶ = 65,536 levels</b><p>smaller quantisation error; more bits stored</p></article></section>
          <div className="l5-derived-formula"><Mark>DERIVED EXAM PRACTICE</Mark><b>samples/sec × seconds × bits/sample × channels</b><span>8,000 × 10 × 8 × 1 = 640,000 bits = 80,000 bytes</span></div>
          <p className="l5-warning">The syllabus explicitly assesses how rate and resolution affect <b>accuracy and file size</b>; this numerical formula is a useful consequence of those ideas.</p>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Finish with one item from each lesson strand and direct students to the inline-answer homework.",
      prompt: "Students answer all three on mini-whiteboards, then reveal only the item that produced disagreement.",
      source: "Adapted representative 2023-2025 Paper 1 patterns; questions are rewritten, not reproduced.",
      content: (
        <Slide number="15" eyebrow="EXIT TICKET · 6 MARKS" sourceLabel="RECENT PAPER STYLE · 2023-25" syllabusLabel="SYLLABUS 1.2" title="Describe. Calculate. Explain." className="slide--l5-exit">
          <section className="l5-exit-grid"><article><span>VECTOR · [2]</span><p>Why can a vector logo be enlarged cleanly?</p><Reveal id="exit-vector" visible={revealed.has("exit-vector")} onToggle={toggleReveal}><p>Its drawing objects and properties are recalculated and redrawn at the new size rather than enlarging a fixed pixel grid.</p></Reveal></article><article><span>BITMAP · [2]</span><p>320 × 200 pixels at 8 bpp: raw bytes?</p><Reveal id="exit-bitmap" visible={revealed.has("exit-bitmap")} onToggle={toggleReveal}><p>320 × 200 × 8 ÷ 8 = <strong>64,000 bytes</strong>.</p></Reveal></article><article><span>SOUND · [2]</span><p>Why does higher resolution improve accuracy but increase size?</p><Reveal id="exit-sound" visible={revealed.has("exit-sound")} onToggle={toggleReveal}><p>More amplitude levels reduce quantisation error, but each sample requires more bits.</p></Reveal></article></section>
          <div className="l5-homework-callout"><b>HOMEWORK 05</b><span>30 marks · about 45 minutes · answers stay beside each question</span><strong>USE HOMEWORK TAB ↑</strong></div>
        </Slide>
      ),
    },
  ];

  const homework = (
    <HomeworkSheet
      lessonNumber="05"
      title="Vector Graphics, Bitmap File Size & Digital Sound"
      marks={30}
      minutes={45}
      syllabusLabel="SYLLABUS 1.2"
      sourceLabel="TEXTBOOK 1.05-1.06 · pp.17-21"
      instructions="Show every formula and unit conversion. For justification questions, link a representation feature to the stated task. For sound, use sampling rate and sampling resolution precisely. Answers remain inline for teaching and printing."
      sections={homeworkSections}
      challenge={{
        id: "l5-challenge",
        prompt: <p><Mark>DERIVED EXAM PRACTICE</Mark> A 30-second stereo recording is sampled at 44,100 Hz using 16 bits per sample per channel. Estimate its uncompressed size in MiB.</p>,
        answer: <p>44,100 × 30 × 16 × 2 = 42,336,000 bits. Divide by 8 = 5,292,000 bytes; divide by 1,024² = <strong>about 5.05 MiB</strong>. Stereo uses two channels.</p>,
      }}
    />
  );

  return (
    <LessonShell
      lessonNumber="05"
      slides={slides}
      homework={homework}
      lessonLinks={[
        { label: "01", href: "../" },
        { label: "02", href: "../lesson-02/" },
        { label: "03", href: "../lesson-03/" },
        { label: "04", href: "../lesson-04/" },
        { label: "05", href: "../lesson-05/", active: true },
        { label: "06", href: "../lesson-06/" },
        { label: "07", href: "../lesson-07/" },
      ]}
      courseMapHref="../?view=roadmap"
      sourceSummary="Checked against the 2027-2029 syllabus, Coursebook printed pp.17-21 plus exam-style Q2 on p.24, and representative AS Paper 1 patterns from 2023-2025."
      sourceDetail="Syllabus p.15 Section 1.2: vector drawing objects, properties and drawing lists; bitmap/vector choice; bitmap file-size estimation; analogue and digital sound, sampling, sampling rate, sampling resolution, and their effects on accuracy and file size · Coursebook Section 1.05 printed pp.17-20, including the 1366 × 768 calculation and Worked Example 1.04; Section 1.06 printed pp.20-21 · Recent anchors: 2023 M/J 13 Q3(c), 2023 O/N 11 Q1(a), 2024 M/J 12 Q2(d) and 2025 O/N 13 Q1(a), Q7(b). Sound-size calculations are explicitly labelled as derived exam practice. Compression is deferred to Lesson 06."
    />
  );
}
