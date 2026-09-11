"use client";

import {
  A2TheoryLesson,
  CompareTable,
  ExamPractice,
  FlowStrip,
  HashSlots,
} from "../../_components/a2-theory-lesson";
import { Slide, type HomeworkSection, type SlideData } from "../../_components/lesson-shell";

const homeworkSections: HomeworkSection[] = [
  {
    code: "A",
    title: "Core distinctions",
    subtitle: "Use organisation and access as two different technical decisions",
    marks: 10,
    questions: [
      {
        id: "a2-02-1",
        marks: 4,
        lines: 5,
        prompt: <><b>Distinguish file organisation from file access.</b><p>Give one valid example of each.</p></>,
        answer: <p><strong>Organisation</strong> is how records are arranged or stored in the file <em>[1]</em>; for example, ordered by a key field <em>[1]</em>. <strong>Access</strong> is the method used to reach or read a record <em>[1]</em>; for example, jumping to an indexed or calculated address <em>[1]</em>.</p>,
      },
      {
        id: "a2-02-2",
        marks: 3,
        lines: 4,
        prompt: <><b>Describe serial file organisation,</b> including how a new record is added.</>,
        answer: <p>Records are stored one after another as they are collected <em>[1]</em>, in chronological or input order <em>[1]</em>. A new record is appended at the end <em>[1]</em>.</p>,
      },
      {
        id: "a2-02-3",
        marks: 3,
        lines: 4,
        prompt: <><b>Describe sequential file organisation</b> and one implication for updating the file.</>,
        answer: <p>Records are stored in an order <em>[1]</em> determined by a key field <em>[1]</em>. Insertion or update normally preserves the order by copying records to a new version of the file <em>[1]</em>.</p>,
      },
    ],
  },
  {
    code: "B",
    title: "Select and apply",
    subtitle: "Match the workload to a justified organisation and route",
    marks: 10,
    questions: [
      {
        id: "a2-02-4",
        marks: 3,
        lines: 5,
        prompt: <><b>A sensor logger receives one reading each second.</b><p>Every reading is processed overnight. Select the organisation and access methods, with linked reasons.</p></>,
        answer: <p>Use <strong>serial organisation</strong> <em>[1]</em> because readings arrive chronologically and can be appended <em>[1]</em>. Use <strong>sequential access</strong> because the complete file is processed in order <em>[1]</em>.</p>,
      },
      {
        id: "a2-02-5",
        marks: 4,
        lines: 6,
        prompt: <><b>Explain sequential access</b> in a serial file and in a sequential file.</>,
        answer: <p>Begin at the physical start <em>[1]</em> and inspect records one by one <em>[1]</em>. In a serial file, continue until the match or end of file <em>[1]</em>. In a sequential file, compare keys and stop at the match or when the current key has passed the target <em>[1]</em>.</p>,
      },
      {
        id: "a2-02-6",
        marks: 3,
        lines: 4,
        prompt: <><b>A payroll run outputs every employee in employee-number order.</b><p>Select the organisation and access methods and give one reason.</p></>,
        answer: <p>Use <strong>sequential organisation</strong> <em>[1]</em> and <strong>sequential access</strong> <em>[1]</em>. Every ordered record is required, so a direct lookup offers no benefit <em>[1]</em>.</p>,
      },
    ],
  },
  {
    code: "C",
    title: "Published-paper transfer",
    subtitle: "Apply verified Paper 3 mark points to unfamiliar contexts",
    marks: 10,
    questions: [
      {
        id: "a2-02-7",
        marks: 4,
        lines: 6,
        prompt: <><span className="syllabus-mark">PAST PAPER PRACTICE</span><p><b>Describe sequential and random methods of file organisation.</b></p><p>Adapted from 9618/31 O/N 2023 Q4(a). [4]</p></>,
        answer: <p>Sequential records are ordered by a key <em>[1]</em> and an update may require a new ordered file/version <em>[1]</em>. Random records are not stored in key order <em>[1]</em>; the record key has a defined relationship with its expected address, commonly through hashing, allowing direct update <em>[1]</em>.</p>,
      },
      {
        id: "a2-02-8",
        marks: 4,
        lines: 6,
        prompt: <><span className="syllabus-mark">PAST PAPER PRACTICE</span><p><b>Explain direct access for a sequential file and a random file.</b></p><p>Adapted from 9618/32 M/J 2024 Q7(b). [4]</p></>,
        answer: <p>For a sequential file, search an index of key values <em>[1]</em> to obtain the corresponding record address <em>[1]</em>. For a random file, apply a hashing algorithm to the record key <em>[1]</em> to calculate the expected address, then follow the defined collision route if the stored key does not match <em>[1]</em>.</p>,
      },
      {
        id: "a2-02-9",
        marks: 2,
        lines: 3,
        prompt: <><b>State the role of a key field</b> in a sequential file and a record key in a random file.</>,
        answer: <p>The key field determines the ordering of a sequential file <em>[1]</em>. The random-file record key is input to the address calculation/hash <em>[1]</em>.</p>,
      },
    ],
  },
];

export default function A2Lesson02Client() {
  const slides: SlideData[] = [
    {
      time: "4 min",
      focus: "Frame organisation and access as separate design choices.",
      prompt: "A file has one million records. Must every search begin at record 1?",
      source: "2027–2029 syllabus 13.2; coursebook Chapter 16 §16.02 printed pp.317–320.",
      content: (
        <Slide number="01" eyebrow="A2 · PAPER 3" sourceLabel="TEXTBOOK Ch16 §16.02" syllabusLabel="SYLLABUS 13.2" className="a2-slide a2-title a2-dr-slide">
          <section className="a2-title-grid"><div><span>LESSON 02 · 90 MINUTES</span><h1>Arrange the records.<br /><em>Choose the route.</em></h1><p>Serial · sequential · random organisation · sequential and direct access</p></div><div className="a2-dr-hero-graphic" role="img" aria-label="A record travelling through file organisation to an address"><strong>RECORD</strong><span>SERIAL</span><span>SEQUENTIAL</span><span>RANDOM</span><span>ACCESS</span></div></section>
        </Slide>
      ),
    },
    {
      time: "5 min",
      focus: "Locate the lesson precisely in the syllabus and textbook.",
      prompt: "Students state which word answers how data is arranged and which answers how it is reached.",
      source: "Syllabus p.32; coursebook pp.317–320; published 2023–2024 Paper 3 questions.",
      content: (
        <Slide number="02" eyebrow="SOURCE MAP" sourceLabel="TEXTBOOK pp.317–320" syllabusLabel="SYLLABUS 13.2 · PAPER 3" title={<>Two decisions; <em>one justified design.</em></>} className="a2-slide a2-dr-slide">
          <section className="a2-source-map"><article><span>01</span><b>ORGANISE</b><p>serial, sequential using a key, or random using a record key</p></article><i>→</i><article><span>02</span><b>ACCESS</b><p>read records sequentially or go directly to an address</p></article><i>→</i><article><span>03</span><b>SELECT</b><p>link the combination to the workload in the question</p></article></section>
          <p className="a2-rule"><b>Today</b><span>Build the full organisation/access map. Lesson 03 develops the hashing route.</span></p>
        </Slide>
      ),
    },
    {
      time: "5 min",
      focus: "Retrieve file vocabulary before comparing organisations.",
      prompt: "Label which of these are logical content and which identify a location.",
      source: "Coursebook p.317; prior AS records and file concepts.",
      content: (
        <Slide number="03" eyebrow="DO NOW · RETRIEVAL" sourceLabel="TEXTBOOK p.317" syllabusLabel="BRIDGE TO 13.2" title="A file is a sequence of records—not one undivided block." className="a2-slide a2-dr-slide">
          <FlowStrip steps={[{ eyebrow: "FILE", title: "Customer.dat", body: "the stored collection" }, { eyebrow: "RECORD", title: "one customer", body: "a repeated structure" }, { eyebrow: "FIELDS", title: "ID · name · balance", body: "the values in a record" }, { eyebrow: "KEY + ADDRESS", title: "C104 → 582", body: "identity and location" }]} />
          <p className="a2-alert"><b>Key warning</b><span>A file key orders or locates records; it is not automatically a unique database primary key.</span></p>
        </Slide>
      ),
    },
    {
      time: "5 min",
      focus: "Connect physical record structure to the choice of organisation.",
      prompt: "Why does a directly accessed binary record normally need a known length?",
      source: "Coursebook §16.02 p.317.",
      content: (
        <Slide number="04" eyebrow="FILE ANATOMY" sourceLabel="TEXTBOOK p.317" syllabusLabel="13.2 · FOUNDATION" title="Known record structure makes a storage address meaningful." className="a2-slide a2-dr-slide">
          <section className="a2-dr-ledger"><b>ADDRESS</b><b>ID</b><b>NAME</b><b>BALANCE</b><span>000</span><span>C104</span><span>A. Khan</span><span>48.20</span><span>001</span><span>C219</span><span>J. Li</span><span>91.75</span><span>002</span><span>C305</span><span>S. Reed</span><span>12.00</span></section>
          <p className="a2-rule"><b>Record layout</b><span>Fixed field sizes allow the system to calculate where record <em>n</em> begins in a binary file.</span></p>
        </Slide>
      ),
    },
    {
      time: "6 min",
      focus: "Define serial organisation with its ordering and update behaviour.",
      prompt: "Which is the only order visible in this transaction stream?",
      source: "Coursebook p.318; 9618/32 O/N 2024 Q2(a)–(b).",
      content: (
        <Slide number="05" eyebrow="SERIAL ORGANISATION" sourceLabel="TEXTBOOK p.318 · O/N 2024 Q2" syllabusLabel="13.2 · SERIAL" title="Store each record as it arrives; append the next one." className="a2-slide a2-dr-slide">
          <FlowStrip steps={[{ eyebrow: "09:01", title: "Deposit", code: "T881" }, { eyebrow: "09:03", title: "Withdrawal", code: "T104" }, { eyebrow: "09:04", title: "Deposit", code: "T527" }, { eyebrow: "NEXT", title: "Append", code: "end of file" }]} />
          <p className="a2-answer-band"><b>BEST FIT</b>transaction log · sensor stream · temporary batch file</p>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Define sequential organisation and show the cost of maintaining key order.",
      prompt: "Where must key 240 be inserted, and why is append not enough?",
      source: "Coursebook p.318; 9618/31 O/N 2023 Q4(a).",
      content: (
        <Slide number="06" eyebrow="SEQUENTIAL ORGANISATION" sourceLabel="TEXTBOOK p.318 · O/N 2023 Q4" syllabusLabel="13.2 · SEQUENTIAL" title="Store records in the order of a chosen key field." className="a2-slide a2-dr-slide">
          <section className="a2-dr-ledger"><b>OLD KEY</b><b>ACTION</b><b>NEW KEY</b><b>RESULT</b><span>105</span><span>copy</span><span>105</span><span>ordered</span><span>210</span><span>copy</span><span>210</span><span>ordered</span><span>—</span><span>insert</span><span>240</span><span>new file</span><span>390</span><span>copy</span><span>390</span><span>ordered</span></section>
          <p className="a2-alert"><b>Do not claim</b><span>Sequential keys need not be consecutive or automatically unique; they must define the record order.</span></p>
        </Slide>
      ),
    },
    {
      time: "6 min",
      focus: "Introduce random organisation as a key-to-location relationship.",
      prompt: "What makes this organisation predictable rather than arbitrary?",
      source: "Coursebook pp.318–319; syllabus 13.2.",
      content: (
        <Slide number="07" eyebrow="RANDOM ORGANISATION" sourceLabel="TEXTBOOK pp.318–319" syllabusLabel="13.2 · RANDOM" title="Physical order is not key order; the record key predicts a location." className="a2-slide a2-dr-slide">
          <HashSlots slots={[{ address: 0 }, { address: 1, value: "K188" }, { address: 2 }, { address: 3, value: "K707", state: "home" }, { address: 4 }, { address: 5 }, { address: 6, value: "K314" }, { address: 7 }, { address: 8, value: "K502" }, { address: 9 }, { address: 10 }]} />
          <p className="a2-rule"><b>Relationship</b><span><code>record key → calculation → expected address</code>. Hashing supplies that calculation.</span></p>
        </Slide>
      ),
    },
    {
      time: "6 min",
      focus: "Compare the three organisations across examinable properties.",
      prompt: "Choose the decisive property for each row, not just a memorised advantage.",
      source: "Coursebook pp.318–320; syllabus 13.2 selection requirement.",
      content: (
        <Slide number="08" eyebrow="COMPARE ORGANISATIONS" sourceLabel="TEXTBOOK pp.318–320" syllabusLabel="13.2 · SELECT" title="Choose from the workload: arrival order, key order or individual lookup." className="a2-slide a2-dr-slide">
          <CompareTable headers={["Organisation", "Physical order", "Add / update", "Typical workload"]} rows={[["Serial", "arrival / chronological", "append", "process the whole stream"], ["Sequential", "ordered by key", "preserve order; often copy", "ordered batch or range"], ["Random", "address derived from key", "direct location; handle collision", "fast individual lookup/update"]]} />
        </Slide>
      ),
    },
    {
      time: "6 min",
      focus: "Separate organisation from access and teach the official valid pairings.",
      prompt: "Why can the same sequential file support two access methods?",
      source: "Syllabus 13.2 notes and guidance; coursebook pp.319–320.",
      content: (
        <Slide number="09" eyebrow="ORGANISATION ≠ ACCESS" sourceLabel="SYLLABUS p.32 · TEXTBOOK p.319" syllabusLabel="13.2 · ACCESS METHODS" title="How records are stored does not fully determine how they are reached." className="a2-slide a2-dr-slide">
          <CompareTable headers={["Organisation", "Sequential access", "Direct access"]} rows={[["Serial", "✓ core route", "—"], ["Sequential", "✓ read in key order", "✓ through an index"], ["Random", "—", "✓ record key + hash"]]} />
          <p className="a2-alert"><b>Exam language</b><span><strong>Random</strong> names the organisation; <strong>direct</strong> names the access method.</span></p>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Trace sequential access for serial and key-ordered files.",
      prompt: "For target 240, identify the earliest valid stopping point in each file.",
      source: "Coursebook p.319; 9618/31 M/J 2024 Q4.",
      content: (
        <Slide number="10" eyebrow="SEQUENTIAL ACCESS TRACE" sourceLabel="M/J 2024 Q4" syllabusLabel="13.2 · SEQUENTIAL ACCESS" title="Start at the physical beginning; inspect one record after another." className="a2-slide a2-dr-slide">
          <section className="a2-dr-split"><article><span>SERIAL FILE</span><b>105 → 390 → 180 → 240</b><p>Stop at the matching record or at end of file. Arrival order gives no early key-based stop.</p></article><article><span>SEQUENTIAL FILE</span><b>105 → 180 → 240</b><p>Compare ordered keys. Stop at the match—or once the current key exceeds the target.</p></article></section>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Apply authentic mark-scheme logic to sequential access.",
      prompt: "Five minutes closed-book; reveal and annotate one distinct point per mark.",
      source: "Adapted from Cambridge 9618/31 M/J 2024 Q4(a)–(b) and published mark scheme.",
      content: (
        <Slide number="11" eyebrow="PAST PAPER PRACTICE" sourceLabel="9618/31 M/J 2024 · Q4" syllabusLabel="13.2 · 5 MARKS" title="Describe sequential access, then apply it to serial and sequential files." className="a2-slide a2-paper a2-dr-slide">
          <ExamPractice reference="9618/31 M/J 2024 · Q4(a)–(b) · ADAPTED" marks={5} prompt={<><p><b>Describe the method.</b> [2]</p><p><b>Explain its use in both organisations.</b> [3]</p></>} answer={<ul><li>Search records one after another from the physical start. [2]</li><li>Serial: chronological order; test every record until match or EOF. [up to 2]</li><li>Sequential: ordered by a key; compare keys and stop at match or once the target has been passed. [up to 2, max 3 for part]</li></ul>} />
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Explain direct access to an ordered file through a separate key/address index.",
      prompt: "Find key 390 in the small index, then state the only main-file record read.",
      source: "Coursebook p.318; 9618/32 M/J 2024 Q7(b)(i).",
      content: (
        <Slide number="12" eyebrow="DIRECT ACCESS · SEQUENTIAL FILE" sourceLabel="TEXTBOOK p.318 · M/J 2024 Q7" syllabusLabel="13.2 · DIRECT ACCESS" title="Search a compact index; jump to the matching main-file address." className="a2-slide a2-dr-slide">
          <FlowStrip steps={[{ eyebrow: "TARGET", title: "key 390" }, { eyebrow: "INDEX", title: "390 → 0842", body: "key/address pair" }, { eyebrow: "SEEK", title: "address 0842", body: "skip intervening records" }, { eyebrow: "READ", title: "verify key 390" }]} />
          <p className="a2-answer-band"><b>DIRECT</b>the main file is entered at a known address, not read from record 1</p>
        </Slide>
      ),
    },
    {
      time: "8 min",
      focus: "Preview direct access to a random file and the need to verify keys.",
      prompt: "Why must the record key still be compared after jumping to the hash address?",
      source: "Coursebook pp.318–319; 9618/32 M/J 2024 Q7(b)(ii).",
      content: (
        <Slide number="13" eyebrow="DIRECT ACCESS · RANDOM FILE" sourceLabel="TEXTBOOK pp.318–319" syllabusLabel="13.2 · DIRECT ACCESS" title="Hash the record key; jump; verify; follow the collision route if needed." className="a2-slide a2-dr-slide">
          <FlowStrip steps={[{ eyebrow: "KEY", title: "K707" }, { eyebrow: "HASH", title: "expected 003" }, { eyebrow: "SEEK", title: "location 003" }, { eyebrow: "COMPARE", title: "stored key?", body: "match or collision" }, { eyebrow: "RESOLVE", title: "defined route", body: "Lesson 03" }]} />
          <p className="a2-alert"><b>Never skip</b><span>An occupied home address is not proof that it contains the target record.</span></p>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Synthesize direct access across sequential and random organisations.",
      prompt: "Students self-mark for the words direct, index, address, hash, key and collision route.",
      source: "Adapted from Cambridge 9618/32 M/J 2024 Q7(a)–(b).",
      content: (
        <Slide number="14" eyebrow="PAST PAPER PRACTICE" sourceLabel="9618/32 M/J 2024 · Q7" syllabusLabel="13.2 · 6 MARKS" title="Outline direct access and explain both routes." className="a2-slide a2-paper a2-dr-slide">
          <ExamPractice reference="9618/32 M/J 2024 · Q7(a)–(b) · ADAPTED" marks={6} prompt={<><p><b>What makes access direct?</b> [2]</p><p><b>Sequential file route</b> [2] · <b>random file route</b> [2]</p></>} answer={<ul><li>Reach a record without reading intervening records; use the target key/address. [2]</li><li>Sequential: search the key index and obtain its file address. [2]</li><li>Random: hash the record key to an expected address and use the collision method if required. [2]</li></ul>} />
        </Slide>
      ),
    },
    {
      time: "4 min",
      focus: "Check selection and terminology before homework.",
      prompt: "Students answer all three with a method plus one linked reason.",
      source: "Lesson synthesis aligned to syllabus 13.2 file organisation and access.",
      content: (
        <Slide number="15" eyebrow="EXIT TICKET" sourceLabel="TEXTBOOK §16.02" syllabusLabel="SYLLABUS 13.2" title="Can you select both the arrangement and the route?" className="a2-slide a2-exit a2-dr-slide">
          <section className="a2-exit-grid"><article><span>01</span><p>Choose methods for an append-only data logger.</p></article><article><span>02</span><p>Explain one early-stop rule in a key-ordered search.</p></article><article><span>03</span><p>Name the two direct-access routes taught today.</p></article></section>
          <div className="homework-callout"><b>HOMEWORK 02</b><span>30 marks · answers reveal beside each question · student print by default</span><strong>45 min</strong></div>
        </Slide>
      ),
    },
  ];

  return <A2TheoryLesson lessonNumber="02" title="File organisation and access" syllabusLabel="SYLLABUS 13.2" sourceLabel="TEXTBOOK Ch16 §16.02 · pp.317–320" slides={slides} homeworkSections={homeworkSections} sourceSummary="Official 2027–2029 syllabus §13.2 · endorsed coursebook Chapter 16 §16.02 printed pp.317–320 · verified 2023–2024 Paper 3 questions and mark schemes" sourceDetail="Organisation describes how records are arranged; access describes how they are reached. Past-paper prompts are concise classroom adaptations, with original materials retained in authorised Cambridge channels." />;
}
