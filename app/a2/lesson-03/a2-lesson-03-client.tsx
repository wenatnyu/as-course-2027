"use client";

import {
  A2TheoryLesson,
  CompareTable,
  ConceptCards,
  ExamPractice,
  FlowStrip,
  Formula,
  HashSlots,
  WorkedBoard,
} from "../../_components/a2-theory-lesson";
import { Slide, type HomeworkSection, type SlideData } from "../../_components/lesson-shell";

const homeworkSections: HomeworkSection[] = [
  {
    code: "A", title: "Hash foundations", subtitle: "Turn a record key into a repeatable expected address", marks: 10,
    questions: [
      {
        id: "a2-03-1", marks: 4, lines: 5,
        prompt: <><b>Explain a hashing algorithm</b> in the context of file access.</>,
        answer: <p>It is a mathematical or deterministic formula <em>[1]</em> applied to a record key <em>[1]</em>. The result gives the expected storage address <em>[1]</em> and is used for direct read/write access in a random or sequential file <em>[1]</em>.</p>,
      },
      {
        id: "a2-03-2", marks: 3, lines: 5,
        prompt: <><b>Calculate <code>key MOD 11</code></b> for 2034, 2056 and 2112.</>,
        answer: <p><code>2034 MOD 11 = 10</code> <em>[1]</em>; <code>2056 MOD 11 = 10</code> <em>[1]</em>; <code>2112 MOD 11 = 0</code> <em>[1]</em>.</p>,
      },
      {
        id: "a2-03-3", marks: 3, lines: 5,
        prompt: <><b>A simple string hash adds character codes, then applies <code>MOD 13</code>.</b><p>Given C = 67, A = 65 and T = 84, find the addresses for CAT and ACT and state what this demonstrates.</p></>,
        answer: <p>Both sums are 216. <code>216 MOD 13 = 8</code>, so CAT maps to 8 <em>[1]</em> and ACT maps to 8 <em>[1]</em>. Different keys have produced the same address, which is a collision <em>[1]</em>.</p>,
      },
    ],
  },
  {
    code: "B", title: "Collision resolution", subtitle: "Preserve the route so a record can be found again", marks: 10,
    questions: [
      {
        id: "a2-03-4", marks: 2, lines: 3,
        prompt: <><b>Define a collision</b> in a random file.</>,
        answer: <p>Different record keys produce the same hash value/address <em>[1]</em>, so the expected location is already occupied and cannot hold both records <em>[1]</em>.</p>,
      },
      {
        id: "a2-03-5", marks: 4, lines: 6,
        prompt: <><b>Explain how linear probing</b> stores and later retrieves a collided record.</>,
        answer: <p>Begin at the hashed/home address <em>[1]</em>. If another key occupies it, inspect following locations <em>[1]</em> and store in the first available slot <em>[1]</em>. On retrieval, repeat the same route and compare stored keys until the match or a valid stopping condition <em>[1]</em>.</p>,
      },
      {
        id: "a2-03-6", marks: 4, lines: 6,
        prompt: <><b>Describe an overflow-area method and a chaining method.</b></>,
        answer: <p>For an overflow area, move to a separate reserved area <em>[1]</em> and use its next free/searched location <em>[1]</em>. For chaining, the home slot references a collection or linked list <em>[1]</em>, and insertion/retrieval follows the relevant chain <em>[1]</em>.</p>,
      },
    ],
  },
  {
    code: "C", title: "Published-paper transfer", subtitle: "Combine the formula, file operation and collision path", marks: 10,
    questions: [
      {
        id: "a2-03-7", marks: 5, lines: 7,
        prompt: <><span className="syllabus-mark">PAST PAPER PRACTICE</span><p><b>Explain file-access hashing and outline two collision solutions.</b></p><p>Adapted from 9618/31 O/N 2024 Q5. [5]</p></>,
        answer: <p>Award any three: used with direct access on random/sequential files; mathematical formula; applied to a record key; gives the expected address <em>[3]</em>. Then award one for linear progression to the next free location <em>[1]</em> and one for using the next free location in a separate overflow area <em>[1]</em>.</p>,
      },
      {
        id: "a2-03-8", marks: 3, lines: 6,
        prompt: <><b>Write the three statements</b> that open <code>AccountFile</code> for random access, seek to <code>Location</code>, and read <code>Customer</code>.</>,
        answer: <pre>{"OPENFILE AccountFile FOR RANDOM\nSEEK AccountFile, Location\nGETRECORD AccountFile, Customer"}</pre>,
      },
      {
        id: "a2-03-9", marks: 2, lines: 3,
        prompt: <><b>After <code>GETRECORD</code>, explain why the key must be compared</b> and what happens if it is different.</>,
        answer: <p>A collision may mean the home slot contains a different record <em>[1]</em>. If the key differs, follow the same probing, overflow or chaining route used when the record was stored <em>[1]</em>.</p>,
      },
    ],
  },
];

export default function A2Lesson03Client() {
  const slides: SlideData[] = [
    {
      time: "4 min", focus: "Introduce hashing as the missing key-to-address bridge.", prompt: "Turn key 2034 into a file address without reading record 1.", source: "Syllabus 13.2; coursebook Chapter 16 §16.02 printed pp.318–319.",
      content: <Slide number="01" eyebrow="A2 · PAPER 3" sourceLabel="TEXTBOOK Ch16 §16.02" syllabusLabel="SYLLABUS 13.2" className="a2-slide a2-title a2-dr-slide"><section className="a2-title-grid"><div><span>LESSON 03 · 90 MINUTES</span><h1>One key.<br /><em>One expected address.</em></h1><p>Hash functions · modulus · collisions · probing · overflow · chaining · read/write</p></div><div className="a2-dr-hero-graphic" role="img" aria-label="A record key mapped through a hash to a storage address"><strong>HASH</strong><span>KEY</span><span>MOD</span><span>ADDRESS</span><span>COLLISION?</span></div></section></Slide>,
    },
    {
      time: "5 min", focus: "Set the syllabus boundary and prevent confusion with cryptographic hashes.", prompt: "What does this lesson's hash output: a digest or a storage address?", source: "Syllabus p.32; coursebook pp.318–319; Pseudocode Guide pp.26–27.",
      content: <Slide number="02" eyebrow="SOURCE MAP" sourceLabel="TEXTBOOK pp.318–319 · GUIDE pp.26–27" syllabusLabel="SYLLABUS 13.2 · PAPER 3" title={<>Hash for <em>file location</em>, not message integrity.</>} className="a2-slide a2-dr-slide"><ConceptCards items={[{ eyebrow: "INPUT", title: "record key", body: "the stable value that identifies the wanted record" }, { eyebrow: "PROCESS", title: "mathematical function", body: "a repeatable calculation with a valid address range" }, { eyebrow: "OUTPUT", title: "expected address", body: "where to store or begin the search" }]} /><p className="a2-alert"><b>Boundary</b><span>Cryptographic message digests appear in Section 17. Here, hashing locates file records.</span></p></Slide>,
    },
    {
      time: "5 min", focus: "Retrieve the organisation/access map from Lesson 02.", prompt: "Place hashing in the correct route and explain what comes before and after it.", source: "Syllabus 13.2 access pairings; Lesson 02 retrieval.",
      content: <Slide number="03" eyebrow="DO NOW · RETRIEVAL" sourceLabel="LESSON 02 → TEXTBOOK p.319" syllabusLabel="13.2 · DIRECT ACCESS" title="Hashing belongs inside a direct-access route." className="a2-slide a2-dr-slide"><CompareTable headers={["Organisation", "Core route", "How the address is obtained"]} rows={[["Serial", "sequential access", "start at the physical beginning"], ["Sequential", "sequential or direct", "search an index for key/address"], ["Random", "direct access", "hash the record key"]]} /></Slide>,
    },
    {
      time: "5 min", focus: "Build an exam-ready definition with four distinct mark points.", prompt: "Improve the vague claim: ‘a hash finds the file’. Which four nouns are missing?", source: "9618/31 O/N 2024 Q5(a) published mark scheme.",
      content: <Slide number="04" eyebrow="HASH FUNCTION" sourceLabel="O/N 2024 Q5(a)" syllabusLabel="13.2 · EXPLAIN" title="A deterministic calculation maps a record key to its expected address." className="a2-slide a2-dr-slide"><FlowStrip steps={[{ eyebrow: "01", title: "take key", code: "AccountNumber" }, { eyebrow: "02", title: "apply formula", code: "Hash(key)" }, { eyebrow: "03", title: "produce address", code: "0 … fileSize − 1" }, { eyebrow: "04", title: "store or find", body: "same route both times" }]} /><p className="a2-rule"><b>Invariant</b><span>The same key and same hash function must always produce the same home address.</span></p></Slide>,
    },
    {
      time: "6 min", focus: "Teach modular division as a complete address function.", prompt: "Predict the possible output range before calculating any examples.", source: "Coursebook p.318; 9618/31 M/J 2023 Q3(a).",
      content: <Slide number="05" eyebrow="MODULAR DIVISION" sourceLabel="TEXTBOOK p.318 · M/J 2023 Q3" syllabusLabel="13.2 · USE A HASH" title="The remainder is already inside the table's address range." className="a2-slide a2-dr-slide"><Formula>address ← key MOD tableSize</Formula><ConceptCards columns={3} items={[{ eyebrow: "TABLE SIZE", title: "11 slots", body: "addresses 0 through 10" }, { eyebrow: "KEY", title: "2034", body: "the record's search value" }, { eyebrow: "RESULT", title: "10", code: "2034 MOD 11 = 10" }]} /></Slide>,
    },
    {
      time: "7 min", focus: "Calculate multiple hash values and expose a collision.", prompt: "Students calculate all three before any record is placed.", source: "Coursebook Question 16.01; adapted modulus pattern from 9618/31 M/J 2023 Q3.",
      content: <Slide number="06" eyebrow="WORKED HASH TABLE" sourceLabel="TEXTBOOK Q16.01 · M/J 2023 Q3" syllabusLabel="13.2 · CALCULATE" title="Calculate first. Then inspect whether the home slot is free." className="a2-slide a2-dr-slide"><WorkedBoard label="KEY MOD 11" result={<>2034 and 2056 both expect address 10 → <b>collision</b></>}><code>2034 MOD 11 = 10</code><br /><code>2056 MOD 11 = 10</code><br /><code>2112 MOD 11 = 0</code></WorkedBoard><HashSlots slots={[{ address: 0, value: "2112", state: "home" }, { address: 1 }, { address: 2 }, { address: 3 }, { address: 4 }, { address: 5 }, { address: 6 }, { address: 7 }, { address: 8 }, { address: 9 }, { address: 10, value: "2034 / 2056", state: "collision" }]} /></Slide>,
    },
    {
      time: "6 min", focus: "Extend address calculation to non-numeric keys and reveal a weakness of simple sums.", prompt: "Why do CAT and ACT collide under a character-code sum?", source: "Coursebook p.319 character-code hashing example.",
      content: <Slide number="07" eyebrow="TEXT KEYS" sourceLabel="TEXTBOOK p.319" syllabusLabel="13.2 · DIFFERENT HASHES" title="Convert characters to numbers, combine them, then reduce to an address." className="a2-slide a2-dr-slide"><FlowStrip steps={[{ eyebrow: "KEY", title: "CAT" }, { eyebrow: "CODES", title: "67 + 65 + 84", code: "216" }, { eyebrow: "REDUCE", title: "216 MOD 13", code: "8" }, { eyebrow: "ADDRESS", title: "home slot 8" }]} /><p className="a2-alert"><b>Weakness</b><span>ACT has the same character sum. A simple sum ignores position, so anagrams collide.</span></p></Slide>,
    },
    {
      time: "6 min", focus: "Evaluate hash quality without claiming collisions can be eliminated.", prompt: "Rank these properties by their effect on lookup time.", source: "Coursebook pp.318–319.",
      content: <Slide number="08" eyebrow="A USEFUL HASH FUNCTION" sourceLabel="TEXTBOOK pp.318–319" syllabusLabel="13.2 · SELECT" title="Fast and repeatable; spread keys across the available addresses." className="a2-slide a2-dr-slide"><ConceptCards columns={4} items={[{ eyebrow: "DETERMINISTIC", title: "same key → same home", body: "retrieval can repeat storage" }, { eyebrow: "IN RANGE", title: "valid address", body: "never outside the file" }, { eyebrow: "EVEN SPREAD", title: "few clusters", body: "shorter collision routes" }, { eyebrow: "QUICK", title: "small cost", body: "preserves the access benefit" }]} /><p className="a2-rule"><b>Textbook note</b><span>A prime divisor near the expected file size often improves spread; it does not guarantee zero collisions.</span></p></Slide>,
    },
    {
      time: "6 min", focus: "Define collision precisely and distinguish same address from same key.", prompt: "Which condition makes this a collision rather than a duplicate request?", source: "Coursebook p.319; 9618/32 O/N 2023 Q3(a).",
      content: <Slide number="09" eyebrow="COLLISION" sourceLabel="O/N 2023 Q3(a)" syllabusLabel="13.2 · COLLISION" title="Different keys can calculate the same expected address." className="a2-slide a2-dr-slide"><section className="a2-dr-split"><article><span>KEY 2034</span><b>home = 10</b><p>The slot is filled with the record whose key is 2034.</p></article><article><span>KEY 2056</span><b>home = 10</b><p>A different key reaches the occupied address: collision resolution is required.</p></article></section><p className="a2-answer-band"><b>COMPARE</b>always test the stored record key—not only whether the slot is occupied</p></Slide>,
    },
    {
      time: "7 min", focus: "Trace closed hashing with linear probing and wrap-around.", prompt: "Store key 2056 after 2034 occupies address 10. Which slot is tested next?", source: "Coursebook p.319; 9618/32 O/N 2023 Q3(b).",
      content: <Slide number="10" eyebrow="LINEAR PROBING · CLOSED HASHING" sourceLabel="TEXTBOOK p.319 · O/N 2023 Q3" syllabusLabel="13.2 · RESOLVE" title="From the home address, test following slots until one is available." className="a2-slide a2-dr-slide"><HashSlots slots={[{ address: 0, value: "2056", state: "probe" }, { address: 1 }, { address: 2 }, { address: 3 }, { address: 4 }, { address: 5 }, { address: 6 }, { address: 7 }, { address: 8 }, { address: 9 }, { address: 10, value: "2034", state: "collision" }]} /><FlowStrip steps={[{ eyebrow: "HOME", title: "10 occupied" }, { eyebrow: "WRAP", title: "test 0" }, { eyebrow: "STORE", title: "first free slot" }, { eyebrow: "RETRIEVE", title: "repeat path", body: "compare each key" }]} /></Slide>,
    },
    {
      time: "7 min", focus: "Compare two open-hashing alternatives with closed hashing.", prompt: "Which method keeps collided records outside the main home slots?", source: "Coursebook p.319; published Paper 3 collision mark schemes.",
      content: <Slide number="11" eyebrow="OVERFLOW AND CHAINING" sourceLabel="TEXTBOOK p.319" syllabusLabel="13.2 · RESOLVE" title="A collision route must be defined for storage and replayed for retrieval." className="a2-slide a2-dr-slide"><CompareTable headers={["Method", "Where collided record goes", "Retrieval route"]} rows={[["Linear probing", "next free main-file slot", "walk forward from home"], ["Overflow area", "separate reserved area", "search the overflow route"], ["Chaining", "collection/list linked from home", "follow and compare within chain"]]} /></Slide>,
    },
    {
      time: "7 min", focus: "Connect conceptual hashing to current random-file pseudocode.", prompt: "Students say what must happen between Hash and GETRECORD, and immediately after the read.", source: "2027–2029 Pseudocode Guide pp.26–27; 9618/31 O/N 2023 Q8(a).",
      content: <Slide number="12" eyebrow="WRITE + READ ROUTE" sourceLabel="GUIDE pp.26–27 · O/N 2023 Q8" syllabusLabel="13.2 · USE" title="Hash, seek, transfer the record—then verify the key." className="a2-slide a2-dr-slide"><section className="a2-dr-split"><article><span>WRITE</span><pre>{"Location ← Hash(NewRecord.Key)\nSEEK DataFile, Location\nPUTRECORD DataFile, NewRecord"}</pre><p>Resolve a collision before <code>PUTRECORD</code>.</p></article><article><span>READ</span><pre>{"Location ← Hash(TargetKey)\nSEEK DataFile, Location\nGETRECORD DataFile, Record"}</pre><p>Compare <code>Record.Key</code>; repeat the resolution path if needed.</p></article></section></Slide>,
    },
    {
      time: "8 min", focus: "Apply the most recent verified hashing definition and collision points.", prompt: "Five minutes closed-book; one phrase per mark point, then reveal.", source: "Adapted from Cambridge 9618/31 O/N 2024 Q5(a)–(b).",
      content: <Slide number="13" eyebrow="PAST PAPER PRACTICE" sourceLabel="9618/31 O/N 2024 · Q5" syllabusLabel="13.2 · 5 MARKS" title="Explain hashing for file access and give two collision solutions." className="a2-slide a2-paper a2-dr-slide"><ExamPractice reference="9618/31 O/N 2024 · Q5(a)–(b) · ADAPTED" marks={5} prompt={<><p><b>Hashing in the context of file access</b> [3]</p><p><b>Two methods after a collision</b> [2]</p></>} answer={<ul><li>Direct-access method; mathematical formula; applied to record key; result gives expected storage/read address. [any 3]</li><li>Store at the next free address by linear progression. [1]</li><li>Store at the next free address in a separate overflow area. [1]</li></ul>} /></Slide>,
    },
    {
      time: "7 min", focus: "Combine modulus calculations with collision-aware storage and retrieval.", prompt: "Calculate, place, then describe how each collided key is found again.", source: "Adapted from Cambridge 9618/31 M/J 2023 Q3(a)–(b).",
      content: <Slide number="14" eyebrow="PAST PAPER PRACTICE" sourceLabel="9618/31 M/J 2023 · Q3" syllabusLabel="13.2 · 6 MARKS" title="Use MOD, then preserve the collision path." className="a2-slide a2-paper a2-dr-slide"><ExamPractice reference="9618/31 M/J 2023 · Q3(a)–(b) · ADAPTED" marks={6} prompt={<><p>Calculate two missing values for <code>key MOD 3</code>. [2]</p><p>Explain storage and retrieval when two keys share an address. [4]</p></>} answer={<ul><li>One mark for each correct remainder. [2]</li><li>Recognise that the hashed home location is occupied. [1]</li><li>Follow a defined linear/overflow route to a free location. [1]</li><li>For retrieval, start at the home address and follow the same route. [1]</li><li>Compare record keys until the target is found or the valid search ends. [1]</li></ul>} /></Slide>,
    },
    {
      time: "4 min", focus: "Check calculation, terminology and retrieval logic before homework.", prompt: "Students answer all three without notes.", source: "Lesson synthesis aligned to syllabus 13.2 hashing and file access.",
      content: <Slide number="15" eyebrow="EXIT TICKET" sourceLabel="TEXTBOOK §16.02 · GUIDE pp.26–27" syllabusLabel="SYLLABUS 13.2" title="Can the record be found by replaying the route?" className="a2-slide a2-exit a2-dr-slide"><section className="a2-exit-grid"><article><span>01</span><p>Calculate <code>83 MOD 11</code>.</p></article><article><span>02</span><p>Define collision using <b>different keys</b> and <b>same address</b>.</p></article><article><span>03</span><p>Name one storage action and its matching retrieval action.</p></article></section><div className="homework-callout"><b>HOMEWORK 03</b><span>30 marks · calculations + mark points · inline answer toggles</span><strong>45 min</strong></div></Slide>,
    },
  ];

  return <A2TheoryLesson lessonNumber="03" title="Hashing for file access" syllabusLabel="SYLLABUS 13.2" sourceLabel="TEXTBOOK Ch16 §16.02 · pp.318–319" slides={slides} homeworkSections={homeworkSections} sourceSummary="Official 2027–2029 syllabus §13.2 · endorsed coursebook Chapter 16 §16.02 printed pp.318–319 · Pseudocode Guide pp.26–27 · verified 2023–2024 Paper 3 mark schemes" sourceDetail="The lesson uses hashing to calculate file addresses, not cryptographic digests. Collision routes are taught symmetrically: the method used for storage must be replayed during retrieval." additionalSourceLinks={[{ href: "https://www.cambridgeinternational.org/Images/697401-2027-2029-pseudocode-guide.pdf", label: "Pseudocode guide" }]} />;
}
