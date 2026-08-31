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
    <div className="lesson-reveal">
      <button type="button" onClick={() => onToggle(id)} aria-expanded={visible} aria-controls={`l4-reveal-${id}`}>
        {visible ? "Hide answer" : "Reveal answer"}
      </button>
      <div id={`l4-reveal-${id}`} className={visible ? "lesson-reveal__panel visible" : "lesson-reveal__panel"} hidden={!visible}>
        {children}
      </div>
    </div>
  );
}

const homeworkSections: HomeworkSection[] = [
  {
    code: "A",
    title: "Character data",
    subtitle: "Use supplied codes; do not memorise a table",
    marks: 10,
    questions: [
      {
        id: "l4-1",
        marks: 2,
        lines: 3,
        prompt: <><b>Explain why a character set is required.</b><p>Refer to both characters and binary.</p></>,
        answer: <p>A character set assigns each character a <strong>unique numeric code</strong>; that code can be stored as a <strong>binary pattern</strong>. The same agreed mapping lets a receiver interpret the bits correctly. <em>[1 unique mapping; 1 binary/interpretation]</em></p>,
      },
      {
        id: "l4-2",
        marks: 3,
        lines: 4,
        prompt: <><b>A supplied table gives A = 65, a = 97 and ! = 33.</b><p>Write each code as one 8-bit binary value.</p></>,
        answer: <p><strong>A = 0100 0001</strong>, <strong>a = 0110 0001</strong>, <strong>! = 0010 0001</strong>. Convert the supplied denary values and retain the stated 8-bit width. <em>[1 each]</em></p>,
      },
      {
        id: "l4-3",
        marks: 3,
        lines: 3,
        prompt: <><b>Distinguish ASCII, extended ASCII and Unicode.</b></>,
        answer: <p><strong>ASCII</strong> is a standard 7-bit set with 128 codes. <strong>Extended ASCII</strong> uses an 8th bit but has several incompatible variants. <strong>Unicode</strong> provides code points for characters from a far wider range of writing systems and symbols. <em>[1 each]</em></p>,
      },
      {
        id: "l4-4",
        marks: 2,
        lines: 3,
        prompt: <><b>Explain one reason Unicode is needed and correct this claim: “Unicode is always 16-bit.”</b></>,
        answer: <p>ASCII cannot represent the full range of world scripts and symbols, so Unicode provides a much larger universal repertoire. Unicode is <strong>not one fixed-width encoding</strong>; encodings such as UTF-8 use a variable number of bytes. <em>[1 need; 1 correction]</em></p>,
      },
    ],
  },
  {
    code: "B",
    title: "Bitmap structure",
    subtitle: "Pixels, headers, resolution and colour depth",
    marks: 12,
    questions: [
      {
        id: "l4-5",
        marks: 3,
        lines: 4,
        prompt: <><b>Describe how a bitmapped image is encoded.</b></>,
        answer: <p>The image is divided into a <strong>grid of pixels</strong>. A binary value is stored for the colour of <strong>each pixel</strong>, interpreted using a colour palette/model and metadata in the <strong>file header</strong>. <em>[1 grid/pixels; 1 binary colour values; 1 interpretation/header]</em></p>,
      },
      {
        id: "l4-6",
        marks: 3,
        lines: 3,
        prompt: <><b>State the maximum number of colours represented by colour depths of 1, 4 and 8 bits per pixel.</b></>,
        answer: <p>Use <strong>2<sup>n</sup></strong>: 1 bit gives <strong>2</strong> colours; 4 bits gives <strong>16</strong>; 8 bits gives <strong>256</strong>. <em>[1 each]</em></p>,
      },
      {
        id: "l4-7",
        marks: 2,
        lines: 3,
        prompt: <><b>Distinguish image resolution from screen resolution.</b></>,
        answer: <p><strong>Image resolution</strong> is the width × height in pixels stored for one image. <strong>Screen resolution</strong> is the width × height in pixels available on the display device. <em>[1 each]</em></p>,
      },
      {
        id: "l4-8",
        marks: 2,
        lines: 3,
        prompt: <><b>Give two items of metadata that a bitmap file header may store.</b></>,
        answer: <p>Any two suitable items, for example: <strong>image width/height</strong>, <strong>colour depth</strong>, file format/encoding method or colour-palette information. <em>[1 each]</em></p>,
      },
      {
        id: "l4-9",
        marks: 2,
        lines: 3,
        prompt: <><b>Explain why magnifying a low-resolution bitmap can reveal a blocky edge.</b></>,
        answer: <p>The image contains a <strong>fixed grid</strong> of pixels. Magnification makes each stored pixel cover a larger displayed area, so individual square pixels and stepped edges become visible. <em>[1 fixed pixels; 1 linked effect]</em></p>,
      },
    ],
  },
  {
    code: "C",
    title: "Quality and size",
    subtitle: "Write linked cause-and-effect explanations",
    marks: 8,
    questions: [
      {
        id: "l4-10",
        marks: 4,
        lines: 4,
        prompt: <><b>An image changes from 800 × 600 at 8-bit colour to 1600 × 1200 at 24-bit colour.</b><p>Explain two effects on quality and two effects on uncompressed file size.</p></>,
        answer: <p>More pixels can represent <strong>finer spatial detail</strong>; more bits per pixel can represent <strong>more colours/smoother colour changes</strong>. Pixel count becomes 4 times larger and colour depth 3 times larger, so the pixel data become <strong>12 times larger</strong>. Avoid claiming quality must improve if the source contains no extra detail. <em>[2 quality; 2 size]</em></p>,
      },
      {
        id: "l4-11",
        marks: 4,
        lines: 4,
        prompt: <><b>A 32 × 16 monochrome icon uses 1 bit per pixel.</b><p>Calculate its raw pixel data in bits and bytes. Explain why the real file may be larger.</p></>,
        answer: <p>32 × 16 × 1 = <strong>512 bits</strong>; 512 ÷ 8 = <strong>64 bytes</strong>. A real file also stores a <strong>file header/metadata</strong>. <em>[1 method; 1 bits; 1 bytes; 1 explanation]</em></p>,
      },
    ],
  },
];

export default function Lesson04Client() {
  const [revealed, setRevealed] = useState<Set<string>>(() => new Set());
  const toggleReveal = (id: string) => setRevealed((current) => {
    const next = new Set(current);
    if (next.has(id)) next.delete(id); else next.add(id);
    return next;
  });

  const slides: SlideData[] = [
    {
      time: "3 min",
      focus: "Frame two data types around one idea: binary needs an agreed interpretation.",
      prompt: "Ask: how can 0100 0001 be a letter, while 0101 1010 might be part of a picture?",
      source: "Coursebook Sections 1.04-1.05, printed pp.14-20; syllabus 1.1 and 1.2.",
      content: (
        <Slide number="01" eyebrow="INFORMATION REPRESENTATION" sourceLabel="TEXTBOOK 1.04-1.05 · pp.14-20" syllabusLabel="SYLLABUS 1.1 · SYLLABUS 1.2" className="slide--l4-title">
          <section className="l4-title-grid">
            <div><span>LESSON 04 · 90 MINUTES</span><h1>Character Data<br /><em>&amp; Bitmap Graphics</em></h1><p>Bits become meaningful when a shared code tells us how to read them.</p></div>
            <div className="l4-dual-code"><article><small>AS TEXT</small><code>0100 0001</code><b>A</b></article><article><small>AS PIXELS</small><div className="l4-mini-pixels"><i /><i /><i /><i /><i /><i /><i /><i /></div><b>an image fragment</b></article></div>
          </section>
        </Slide>
      ),
    },
    {
      time: "4 min",
      focus: "Make the textbook path and syllabus boundary visible.",
      prompt: "Students label the character outcomes 1.1 and bitmap outcomes 1.2.",
      source: "Syllabus pp.14-15; Coursebook printed pp.14-20.",
      content: (
        <Slide number="02" eyebrow="TEXTBOOK × SYLLABUS" sourceLabel="TEXTBOOK pp.14-20" syllabusLabel="SYLLABUS 1.1 · SYLLABUS 1.2" title="Two representations. One exam habit: define the code before interpreting the bits." className="slide--l4-map">
          <section className="l4-route-grid"><article><span>1.1 · CHARACTER DATA</span><h3>Character set → code → binary</h3><ul><li>ASCII and extended ASCII</li><li>Unicode and UTF-8 context</li><li>use a supplied code table</li></ul></article><article><span>1.2 · BITMAP GRAPHICS</span><h3>Grid → pixel codes → image</h3><ul><li>pixel and file header</li><li>image vs screen resolution</li><li>colour depth and quality</li></ul></article></section>
          <p className="l4-boundary"><Mark>WEEK 04 / 32</Mark><span>Formal bitmap calculations continue in Lesson 05. Compression begins in Lesson 06.</span></p>
        </Slide>
      ),
    },
    {
      time: "5 min",
      focus: "Retrieve binary place values and expose the need for a representation label.",
      prompt: "Students convert 0100 0001 to denary and identify the supplied ASCII character before revealing either answer.",
      source: "Coursebook transition from 1.03 to 1.04, printed p.14.",
      content: (
        <Slide number="03" eyebrow="DO NOW · RETRIEVAL" sourceLabel="TEXTBOOK p.14" title="A bit pattern does not carry its meaning with it." className="slide--l4-retrieval">
          <div className="l4-bit-identity"><code>0100 0001</code><div><p><b>Unsigned integer</b><span>?</span></p><p><b>ASCII code</b><span>?</span></p><p><b>Pixel data</b><span>needs depth + position</span></p></div></div>
          <Reveal id="retrieval" visible={revealed.has("retrieval")} onToggle={toggleReveal}><p>The place values give 64 + 1 = <strong>65</strong>. A supplied character set maps code 65 to <strong>A</strong>. Without its representation and metadata, the bits are ambiguous.</p></Reveal>
        </Slide>
      ),
    },
    {
      time: "6 min",
      focus: "Define a character set as an agreed one-to-one mapping.",
      prompt: "Ask what breaks if sender and receiver use different mappings.",
      source: "Coursebook 1.04, printed p.14.",
      content: (
        <Slide number="04" eyebrow="CHARACTER SETS" sourceLabel="TEXTBOOK 1.04 · p.14" title="A character set assigns each character a unique numeric code." className="slide--l4-codebook">
          <section className="l4-encode-flow"><article><span>CHARACTER</span><strong>A</strong><small>human-readable symbol</small></article><b>character set</b><article><span>CODE POINT</span><strong>65</strong><small>agreed number</small></article><b>binary encode</b><article><span>STORED BITS</span><code>0100 0001</code><small>one byte here</small></article></section>
          <p className="l4-takeaway"><b>Communication rule:</b> encoder and decoder must agree on the character set and encoding.</p>
        </Slide>
      ),
    },
    {
      time: "6 min",
      focus: "Teach the scope and storage distinction of standard ASCII.",
      prompt: "Students explain why 7 bits give 128 possible codes and why an ASCII byte begins with 0.",
      source: "Coursebook pp.14-15, Table 1.09; syllabus 1.1.",
      content: (
        <Slide number="05" eyebrow="ASCII" sourceLabel="TEXTBOOK pp.14-15 · TABLE 1.09" title="Standard ASCII is a 7-bit character set: 2⁷ = 128 codes." className="slide--l4-ascii">
          <section className="l4-ascii-grid"><article><span>PRINTING</span><p><code>0100 0001</code><b>A</b></p><p><code>0110 0001</code><b>a</b></p><p><code>0011 0000</code><b>0</b></p></article><article><span>CONTROL</span><p>Some codes represent actions such as a line break, not a visible symbol.</p><div className="l4-byte"><i>0</i><b>7 ASCII bits</b></div></article></section>
          <p className="l4-takeaway"><b>Exam precision:</b> ASCII is 7-bit. It is often stored in an 8-bit byte with the most significant bit set to 0.</p>
        </Slide>
      ),
    },
    {
      time: "6 min",
      focus: "Apply supplied character codes through denary-to-binary conversion.",
      prompt: "Pairs encode ‘Ba!’ using only the supplied mini-table.",
      source: "Coursebook Table 1.09, printed p.15; syllabus note: codes need not be memorised.",
      content: (
        <Slide number="06" eyebrow="USE A SUPPLIED TABLE" sourceLabel="TEXTBOOK p.15 · TABLE 1.09" title="The syllabus tests representation — not memory of individual codes." className="slide--l4-practice">
          <section className="l4-code-table"><div><b>Character</b><b>Supplied denary code</b><b>Your 8-bit storage</b></div><div><span>B</span><span>66</span><code>???? ????</code></div><div><span>a</span><span>97</span><code>???? ????</code></div><div><span>!</span><span>33</span><code>???? ????</code></div></section>
          <div className="l4-string-task"><p>Encode <strong>Ba!</strong> as three bytes.</p><Reveal id="ba" visible={revealed.has("ba")} onToggle={toggleReveal}><code>0100 0010 &nbsp; 0110 0001 &nbsp; 0010 0001</code></Reveal></div>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Distinguish extended ASCII variants from standard ASCII and motivate Unicode.",
      prompt: "Ask why adding one bit does not create one universal extended standard.",
      source: "Coursebook pp.15-16; syllabus 1.1.",
      content: (
        <Slide number="07" eyebrow="EXTENDED ASCII" sourceLabel="TEXTBOOK pp.15-16" title="An eighth bit doubles the space — but not the agreement." className="slide--l4-extended">
          <section className="l4-capacity-bars"><article><span>ASCII</span><div style={{ "--fill": "50%" } as CSSProperties} /><b>128 codes · 7 bits</b><p>English letters, digits, punctuation and control codes.</p></article><article><span>EXTENDED ASCII</span><div style={{ "--fill": "100%" } as CSSProperties} /><b>256 codes · 8 bits</b><p>Extra regional characters, but several different variants exist.</p></article></section>
          <p className="l4-warning"><b>Limitation:</b> 256 positions cannot cover all languages and symbols, and a byte value above 127 may mean different characters in different variants.</p>
        </Slide>
      ),
    },
    {
      time: "5 min",
      focus: "Present Unicode as a universal repertoire, not a fixed bit width.",
      prompt: "Students correct three claims: Unicode is a language, always 16-bit, and replaces every encoding.",
      source: "Coursebook p.16; syllabus 1.1; recent Paper 1 wording.",
      content: (
        <Slide number="08" eyebrow="UNICODE" sourceLabel="TEXTBOOK p.16" title="Unicode gives characters universal code points across writing systems." className="slide--l4-unicode">
          <section className="l4-script-cloud"><b>A</b><b>中</b><b>ع</b><b>Ω</b><b>🙂</b><b>अ</b></section>
          <div className="l4-unicode-facts"><p><b>Code point</b><span>a universal identifier such as U+0041</span></p><p><b>Encoding</b><span>a rule such as UTF-8 for turning code points into bytes</span></p><p><b>Width</b><span>not always 16-bit; it depends on the encoding and character</span></p></div>
        </Slide>
      ),
    },
    {
      time: "5 min",
      focus: "Use UTF-8 to resolve the common fixed-width misconception without overloading the syllabus.",
      prompt: "Ask why keeping the first 128 codes compatible with ASCII is useful.",
      source: "Coursebook p.16, UTF-8 formats. Context supporting syllabus Unicode understanding.",
      content: (
        <Slide number="09" eyebrow="UTF-8 CONTEXT" syllabusLabel="TEXTBOOK CONTEXT" sourceLabel="TEXTBOOK p.16" title="UTF-8 uses one to four bytes and preserves ASCII compatibility." className="slide--l4-utf8">
          <section className="l4-utf8-lanes"><p><span>1 byte</span><code>0xxxxxxx</code><b>ASCII-range code points</b></p><p><span>2 bytes</span><code>110xxxxx 10xxxxxx</code><b>more code points</b></p><p><span>3-4 bytes</span><code>1110… / 11110…</code><b>wider repertoire</b></p></section>
          <p className="l4-takeaway"><b>Safe exam wording:</b> Unicode supports a much larger range of characters; UTF-8 is one variable-length way to encode them.</p>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Transition from sequential character codes to a two-dimensional pixel grid.",
      prompt: "Students read the 8 × 8 icon row-by-row as 1-bit pixel data.",
      source: "Coursebook 1.05, printed p.18; syllabus 1.2.",
      content: (
        <Slide number="10" eyebrow="BITMAP MODEL" sourceLabel="TEXTBOOK 1.05 · p.18" syllabusLabel="SYLLABUS 1.2" title="A bitmap stores a colour code for every pixel in a fixed grid." className="slide--l4-bitmap">
          <section className="l4-bitmap-grid"><div className="l4-pixel-art" role="img" aria-label="An eight by eight one-bit bitmap">{[0,0,1,1,1,1,0,0,0,1,1,0,0,1,1,0,1,1,0,1,1,0,1,1,1,1,0,0,0,0,1,1,1,1,0,1,1,0,1,1,1,1,0,0,0,0,1,1,0,1,1,1,1,1,1,0,0,0,1,0,0,1,0,0].map((bit, index) => <i className={bit ? "on" : ""} key={index} />)}</div><article><span>PIXEL</span><p>The smallest identifiable component of a bitmap.</p><span>POSITION</span><p>Its row and column locate it in the image matrix.</p><span>VALUE</span><p>Its bits select a colour.</p></article></section>
        </Slide>
      ),
    },
    {
      time: "6 min",
      focus: "Connect each pixel value to a palette or colour model and make traversal order explicit.",
      prompt: "Read the supplied palette together, then model how the four visible pixel colours become one row-major bit sequence.",
      source: "Coursebook p.18; syllabus bitmap encoding terms.",
      content: (
        <Slide number="11" eyebrow="FROM PIXELS TO BITS" sourceLabel="TEXTBOOK p.18" syllabusLabel="SYLLABUS 1.2" title="With 2 bits per pixel, each code selects one of four colours." className="slide--l4-palette">
          <section className="l4-palette-grid"><div><p><i className="c0" /><code>00</code><span>white</span></p><p><i className="c1" /><code>01</code><span>blue</span></p><p><i className="c2" /><code>10</code><span>orange</span></p><p><i className="c3" /><code>11</code><span>navy</span></p></div><article><div className="l4-four-pixels"><i className="c1" /><i className="c2" /><i className="c3" /><i className="c0" /></div><code>01 10 11 00</code><p>One possible row-major sequence for four pixels.</p></article></section>
          <p className="l4-takeaway">The file format/header tells software how to interpret dimensions, depth and pixel data.</p>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Derive the 2^n colour relationship and distinguish bits per pixel from bits per RGB component.",
      prompt: "Use the displayed powers of two to establish the rule, then ask students to calculate 12-bit colour independently.",
      source: "Coursebook p.18; syllabus colour depth/bit depth.",
      content: (
        <Slide number="12" eyebrow="COLOUR DEPTH" sourceLabel="TEXTBOOK p.18" syllabusLabel="SYLLABUS 1.2" title="n bits per pixel can identify up to 2ⁿ colours." className="slide--l4-depth">
          <section className="l4-depth-scale"><article><b>1 bit</b><strong>2</strong><span>colours</span></article><article><b>4 bits</b><strong>16</strong><span>colours</span></article><article><b>8 bits</b><strong>256</strong><span>colours</span></article><article><b>24 bits</b><strong>16,777,216</strong><span>colours</span></article></section>
          <div className="l4-rgb-note"><b>24-bit RGB</b><span>8 bits red + 8 bits green + 8 bits blue = 24 bits per pixel</span></div>
          <p className="l4-takeaway">More depth can represent smoother colour changes, but every pixel needs more bits.</p>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Distinguish stored image dimensions from display dimensions.",
      prompt: "Ask whether a 1920 × 1080 image gains detail when shown on a 4K screen.",
      source: "Coursebook pp.18-19; syllabus image and screen resolution.",
      content: (
        <Slide number="13" eyebrow="TWO RESOLUTIONS" sourceLabel="TEXTBOOK pp.18-19" syllabusLabel="SYLLABUS 1.2" title="Image resolution belongs to the file. Screen resolution belongs to the display." className="slide--l4-resolution">
          <section className="l4-resolution-pair"><article><span>IMAGE RESOLUTION</span><div className="l4-image-frame"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div><b>width × height pixels stored</b></article><article><span>SCREEN RESOLUTION</span><div className="l4-screen"><div /></div><b>width × height pixels available</b></article></section>
          <p className="l4-warning"><b>Do not claim:</b> a higher-resolution display invents extra image detail. Scaling maps stored pixels onto display pixels.</p>
        </Slide>
      ),
    },
    {
      time: "8 min",
      focus: "Link resolution and colour depth to both quality and raw size, and introduce header overhead.",
      prompt: "Students complete each increase/decrease arrow with one quality effect and one size effect.",
      source: "Coursebook pp.19-20; syllabus bitmap quality/file-size effects.",
      content: (
        <Slide number="14" eyebrow="QUALITY × FILE SIZE" sourceLabel="TEXTBOOK pp.19-20" syllabusLabel="SYLLABUS 1.2" title="Every extra pixel and every extra bit must be stored." className="slide--l4-tradeoff">
          <section className="l4-trade-grid"><article><span>IMAGE RESOLUTION ↑</span><b>more pixels</b><p>Potentially finer spatial detail and less visible pixelation.</p><strong>raw size increases</strong></article><article><span>COLOUR DEPTH ↑</span><b>more bits per pixel</b><p>More colours and potentially smoother gradients.</p><strong>raw size increases</strong></article><article><span>FILE HEADER</span><b>metadata overhead</b><p>Dimensions, depth and format information sit alongside pixel data.</p><strong>actual file may be larger</strong></article></section>
          <div className="l4-formula"><span>estimated pixel bits</span><b>width × height × colour depth</b><small>Full calculations: Lesson 05</small></div>
        </Slide>
      ),
    },
    {
      time: "8 min",
      focus: "Finish with recent-Paper-1-style description and calculation demands.",
      prompt: "Students answer silently for five minutes, then reveal and self-mark for three.",
      source: "Representative Paper 1 questions from 2024-2025; adapted, not reproduced verbatim.",
      content: (
        <Slide number="15" eyebrow="EXIT TICKET · 7 MARKS" sourceLabel="RECENT PAPER STYLE · 2024-25" syllabusLabel="SYLLABUS 1.1 · SYLLABUS 1.2" title="Use precise terms, then link every change to an effect." className="slide--l4-exit">
          <section className="l4-exit-grid"><article><span>01 · [2]</span><p>Why is Unicode used instead of ASCII for a global messaging app?</p><Reveal id="exit-a" visible={revealed.has("exit-a")} onToggle={toggleReveal}><p>It has a much larger repertoire, so it can represent characters from many writing systems and symbols that ASCII cannot.</p></Reveal></article><article><span>02 · [3]</span><p>Describe how a bitmap stores an image.</p><Reveal id="exit-b" visible={revealed.has("exit-b")} onToggle={toggleReveal}><p>A grid of pixels is stored; each pixel has a binary colour code; header metadata supports interpretation.</p></Reveal></article><article><span>03 · [2]</span><p>What happens when colour depth increases?</p><Reveal id="exit-c" visible={revealed.has("exit-c")} onToggle={toggleReveal}><p>More colours can be represented and raw file size increases because every pixel stores more bits.</p></Reveal></article></section>
        </Slide>
      ),
    },
  ];

  const homework = (
    <HomeworkSheet
      lessonNumber="04"
      title="Character Data & Bitmap Graphics"
      marks={30}
      minutes={45}
      syllabusLabel="SYLLABUS 1.1 · SYLLABUS 1.2"
      sourceLabel="TEXTBOOK 1.04-1.05 · pp.14-20"
      instructions="No code-table memorisation is required. Use every supplied value, show binary conversions and write linked explanations using pixel, resolution, colour depth and file header. Answers remain inline for teaching and printing."
      sections={homeworkSections}
      challenge={{
        id: "l4-challenge",
        prompt: <p>A bitmap uses 3 bits per pixel. Explain why exactly 7 colours can be used while one bit pattern remains unused.</p>,
        answer: <p>Three bits give 2³ = <strong>8 possible codes</strong>. A palette may assign seven codes to colours and leave one code unused; colour depth states capacity, not a requirement to use every colour.</p>,
      }}
    />
  );

  return (
    <LessonShell
      lessonNumber="04"
      slides={slides}
      homework={homework}
      lessonLinks={[
        { label: "01", href: "../" },
        { label: "02", href: "../lesson-02/" },
        { label: "03", href: "../lesson-03/" },
        { label: "04", href: "../lesson-04/", active: true },
        { label: "05", href: "../lesson-05/" },
        { label: "06", href: "../lesson-06/" },
        { label: "07", href: "../lesson-07/" },
      ]}
      courseMapHref="../?view=roadmap"
      sourceSummary="Checked against the 2027-2029 syllabus, Coursebook printed pp.14-20 and representative AS Paper 1 questions from 2024-2025."
      sourceDetail="Syllabus p.14 Section 1.1: character data, ASCII, extended ASCII and Unicode; p.15 Section 1.2: bitmap encoding, pixels, file headers, image/screen resolution, colour depth, file-size estimation and quality effects · Coursebook Section 1.04 printed pp.14-16 and bitmap material in Section 1.05 printed pp.18-20 · Recent anchors: 2024 M/J 13 Q1(d), 2025 M/J 11 Q3, 2025 M/J 13 Q1(a,c) and 2025 O/N 11 Q7(d). UTF-8 is labelled textbook context. Individual character codes are supplied rather than memorised."
    />
  );
}
