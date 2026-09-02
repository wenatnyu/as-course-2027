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

function Reveal({ visible, onToggle, children }: { visible: boolean; onToggle: () => void; children: ReactNode }) {
  return (
    <div className="l11-reveal">
      <button type="button" onClick={onToggle} aria-expanded={visible} aria-controls="l11-paper-answer">
        {visible ? "Hide mark scheme" : "Reveal mark scheme"}
      </button>
      <div id="l11-paper-answer" className={visible ? "l11-reveal__panel visible" : "l11-reveal__panel"} hidden={!visible}>
        {children}
      </div>
    </div>
  );
}

const homeworkSections: HomeworkSection[] = [
  {
    code: "A",
    title: "Hardware roles and storage",
    subtitle: "Classify by purpose before choosing an example",
    marks: 10,
    questions: [
      {
        id: "l11-1",
        marks: 4,
        lines: 4,
        prompt: <><b>Distinguish an input device from an output device.</b><p>Give one suitable example of each.</p></>,
        answer: <p>An <strong>input device</strong> sends data or instructions into a computer, for example a microphone. An <strong>output device</strong> receives data from the computer and presents a result or causes an action, for example a speaker. <em>[1 purpose + 1 example each]</em></p>,
      },
      {
        id: "l11-2",
        marks: 4,
        lines: 4,
        prompt: <><b>Explain two differences between primary storage and secondary storage.</b></>,
        answer: <p>Primary storage is directly accessible by the processor and holds instructions or data currently needed; secondary storage is used for longer-term retention. Secondary storage is normally non-volatile and has greater capacity but slower access than primary memory. <em>[Any two paired differences, 2 marks each]</em></p>,
      },
      {
        id: "l11-3",
        marks: 2,
        lines: 3,
        prompt: <><b>What makes a storage medium removable?</b><p>Give one example.</p></>,
        answer: <p>It can be physically detached from one device and transported or connected elsewhere, for example a USB flash drive, memory card or optical disc. “Removable” describes portability; it may still be secondary storage. <em>[1 definition; 1 example]</em></p>,
      },
    ],
  },
  {
    code: "B",
    title: "Embedded systems and buffers",
    subtitle: "Link each feature to a real hardware constraint",
    marks: 10,
    questions: [
      {
        id: "l11-4",
        marks: 4,
        lines: 4,
        prompt: <><b>Describe four characteristics of an embedded system.</b></>,
        answer: <p>It is built into a larger device; performs one or a small set of dedicated tasks; includes a processor, memory and input/output; and normally runs firmware with limited resources. Other valid characteristics include low power use or little user reprogramming. <em>[1 each; max 4]</em></p>,
      },
      {
        id: "l11-5",
        marks: 4,
        lines: 4,
        prompt: <><b>Explain how a buffer helps when a fast computer sends data to a slower printer.</b></>,
        answer: <p>The buffer temporarily stores data sent at computer speed. The printer removes data at its own slower rate, so the processor can continue other work and the printer is not overloaded. The buffer absorbs the rate difference; it does not make the printer itself faster. <em>[1 temporary store; 1 two rates; 1 release; 1 benefit]</em></p>,
      },
      {
        id: "l11-6",
        marks: 2,
        lines: 3,
        prompt: <><b>Correct this claim:</b><p>“A buffer permanently increases the transfer speed of the slow device.”</p></>,
        answer: <p>A buffer only stores data temporarily and smooths a mismatch or burst. Long-term throughput is still limited by the slower device; if data arrives too quickly for too long, the buffer can fill. <em>[2]</em></p>,
      },
    ],
  },
  {
    code: "C",
    title: "Past-paper application",
    subtitle: "Use an exact feature, then explain its effect",
    marks: 10,
    questions: [
      {
        id: "l11-7",
        marks: 2,
        lines: 3,
        prompt: <><Mark>PAST PAPER PRACTICE</Mark><p><b>A video doorbell is an embedded system. Identify two characteristics that show this.</b></p><p>Adapted from 9618/11 M/J 2024 Q2(a). [2]</p></>,
        answer: <p>Any two: it performs specific doorbell/security tasks; its camera or sensors are built into a larger product; its processor, memory, storage and software are dedicated to those tasks; or limited processing needs allow a dedicated microprocessor. <em>[1 each; max 2]</em></p>,
      },
      {
        id: "l11-8",
        marks: 3,
        lines: 4,
        prompt: <><Mark>PAST PAPER PRACTICE</Mark><p><b>Explain how a buffer is used while a computer writes data to an optical disc.</b></p><p>Adapted from 9618/11 O/N 2024 Q3(d)(ii). [3]</p></>,
        answer: <p>The computer and writer operate at different speeds. Data is placed in a temporary buffer quickly, then supplied to the writer at its slower rate; this prevents overload and lets the computer continue processing. <em>[Any three distinct points]</em></p>,
      },
      {
        id: "l11-9",
        marks: 5,
        lines: 5,
        prompt: <><b>A smart thermostat stores its firmware, current sensor values and a year of temperature history.</b><p>Classify the system and state where each item should be stored. Justify each choice.</p></>,
        answer: <p>It is an <strong>embedded system</strong> because it is built into a larger product for a dedicated control task. Firmware belongs in non-volatile primary memory such as ROM; current values belong in RAM for fast working access; long-term history belongs in non-volatile secondary storage because it needs greater capacity and must survive power loss. <em>[1 classification; 1 each location; 1 linked justification]</em></p>,
      },
    ],
  },
];

export default function Lesson11Client() {
  const [paperVisible, setPaperVisible] = useState(false);

  const slides: SlideData[] = [
    {
      time: "3 min",
      focus: "Frame hardware as a set of roles in a system rather than a list of product names.",
      prompt: "Ask students to name where data enters, where it is held, and where a result leaves a smart doorbell.",
      source: "Coursebook Chapter 3 opening, printed p.50; syllabus 3.1.",
      content: (
        <Slide number="01" eyebrow="HARDWARE" sourceLabel="TEXTBOOK CH.3 · p.50" syllabusLabel="SYLLABUS 3.1" className="slide--l11-title">
          <section className="l11-title-grid"><div><span>LESSON 11 · 90 MINUTES</span><h1>Hardware has<br /><em>a role in the flow.</em></h1><p>Input. Store. Process. Output. Then manage speed differences without losing data.</p></div><div className="l11-system-loop" role="img" aria-label="Input, processing, storage and output arranged as a system"><b>INPUT</b><i>→</i><b>PROCESS</b><i>↔</i><b>STORE</b><i>→</i><b>OUTPUT</b></div></section>
        </Slide>
      ),
    },
    {
      time: "4 min",
      focus: "Make the precise lesson boundary visible before teaching examples.",
      prompt: "Students read the five green outcomes and identify which are categories and which describe system designs.",
      source: "Syllabus 3.1; Coursebook Sections 3.01-3.02 and buffer note, printed pp.51-54.",
      content: (
        <Slide number="02" eyebrow="TEXTBOOK × SYLLABUS" sourceLabel="TEXTBOOK 3.01-3.02 · pp.51-54" syllabusLabel="SYLLABUS 3.1" title="Five examinable decisions organise this lesson." className="slide--l11-map">
          <section className="l11-route"><article><b>01</b><span>INPUT / OUTPUT</span></article><article><b>02</b><span>PRIMARY</span></article><article><b>03</b><span>SECONDARY</span></article><article><b>04</b><span>REMOVABLE</span></article><article><b>05</b><span>EMBEDDED + BUFFER</span></article></section>
          <p className="l11-boundary"><Mark>COMING NEXT</Mark><span>Lesson 12 explains RAM and ROM technologies. Lesson 13 explains how named devices work.</span></p>
        </Slide>
      ),
    },
    {
      time: "5 min",
      focus: "Use verbs to classify a component by purpose.",
      prompt: "Read each verb aloud: enters, processes, holds, presents. Students supply one component for each.",
      source: "Coursebook Section 3.01 printed pp.51-52; syllabus 3.1 hardware purposes.",
      content: (
        <Slide number="03" eyebrow="SYSTEM ROLES" sourceLabel="TEXTBOOK 3.01 · pp.51-52" syllabusLabel="SYLLABUS 3.1 — PURPOSE" title="Classify hardware by what it does to data." className="slide--l11-roles">
          <section className="l11-role-grid"><article><span>INPUT</span><b>captures</b><p>data or instructions enter</p></article><article><span>PROCESSOR</span><b>executes</b><p>instructions transform data</p></article><article><span>STORAGE</span><b>retains</b><p>instructions and data are held</p></article><article><span>OUTPUT</span><b>communicates</b><p>results leave or cause action</p></article></section>
          <p className="l11-takeaway">One physical product may have several roles: a touchscreen is both input and output.</p>
        </Slide>
      ),
    },
    {
      time: "6 min",
      focus: "Define input by direction of useful data, not by whether a user touches the device.",
      prompt: "Classify keyboard, sensor, microphone, camera and network interface; require a data item for each.",
      source: "Coursebook Section 3.01 printed pp.51-52; syllabus 3.1 input devices.",
      content: (
        <Slide number="04" eyebrow="INPUT DEVICES" sourceLabel="TEXTBOOK 3.01 · pp.51-52" syllabusLabel="SYLLABUS 3.1 — INPUT" title="Input hardware converts an event into data for the system." className="slide--l11-io">
          <section className="l11-io-flow"><div><b>EVENT</b><p>key press · sound · light · temperature</p></div><i>→</i><div><b>TRANSDUCER / DEVICE</b><p>detects and converts</p></div><i>→</i><div><b>DATA</b><p>code · sample · reading</p></div></section>
          <div className="l11-exam-frame"><b>Strong answer</b><span>“A microphone inputs digitised sound data” — purpose plus data, not merely a product name.</span></div>
        </Slide>
      ),
    },
    {
      time: "6 min",
      focus: "Separate output data from the physical effect produced by an output device.",
      prompt: "Ask what form of output reaches a person and what form controls a machine.",
      source: "Coursebook Section 3.01 printed pp.51-52; syllabus 3.1 output devices.",
      content: (
        <Slide number="05" eyebrow="OUTPUT DEVICES" sourceLabel="TEXTBOOK 3.01 · pp.51-52" syllabusLabel="SYLLABUS 3.1 — OUTPUT" title="Output hardware converts processed data into a usable result." className="slide--l11-io">
          <section className="l11-output-grid"><article><span>HUMAN</span><b>screen</b><p>pixels form visible information</p></article><article><span>HUMAN</span><b>speaker</b><p>electrical signal becomes sound</p></article><article><span>PHYSICAL</span><b>actuator</b><p>signal produces movement</p></article></section>
          <p className="l11-takeaway">Output does not have to be visible: sound, vibration and control signals are valid outputs.</p>
        </Slide>
      ),
    },
    {
      time: "6 min",
      focus: "Define primary storage using processor access and immediate need, while allowing both volatile and non-volatile examples.",
      prompt: "Ask why ‘primary’ cannot simply mean ‘temporary’ when ROM is also primary memory.",
      source: "Coursebook Section 3.01 and 3.03, printed pp.51-54; syllabus 3.1 primary storage.",
      content: (
        <Slide number="06" eyebrow="PRIMARY STORAGE" sourceLabel="TEXTBOOK 3.01 / 3.03 · pp.51-54" syllabusLabel="SYLLABUS 3.1 — PRIMARY" title="Primary storage is directly available to the processor." className="slide--l11-storage">
          <section className="l11-storage-card"><div><span>USED FOR</span><h3>instructions and data needed now</h3><p>Working programs and data use RAM; startup instructions or firmware may use ROM.</p></div><aside><b>FAST ACCESS</b><b>LOWER CAPACITY</b><b>HIGHER COST / BYTE</b></aside></section>
          <p className="l11-warning"><b>Do not write:</b> “all primary storage is volatile.” ROM is a non-volatile primary memory.</p>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Link the need for secondary storage to persistence and capacity.",
      prompt: "For an operating-system file, a video archive and a saved document, ask what must remain after power-off.",
      source: "Coursebook Section 3.04 introduction, printed pp.55-58; syllabus 3.1 secondary storage purpose.",
      content: (
        <Slide number="07" eyebrow="SECONDARY STORAGE" sourceLabel="TEXTBOOK 3.04 · pp.55-58" syllabusLabel="SYLLABUS 3.1 — SECONDARY" title="Secondary storage retains large volumes for later use." className="slide--l11-secondary">
          <section className="l11-secondary-grid"><article><b>NON-VOLATILE</b><p>data remains without power</p></article><article><b>CAPACITY</b><p>stores programs and user files</p></article><article><b>TRANSFER</b><p>data moves into primary memory before processing</p></article></section>
          <div className="l11-flow-line"><span>SECONDARY STORAGE</span><i>→ load →</i><span>RAM</span><i>→ execute →</i><span>PROCESSOR</span></div>
        </Slide>
      ),
    },
    {
      time: "6 min",
      focus: "Teach removable as a property that can overlap with secondary storage.",
      prompt: "Sort internal SSD, external SSD, memory card and optical disc; allow more than one label.",
      source: "Coursebook Section 3.01 printed pp.51-52; syllabus 3.1 removable storage.",
      content: (
        <Slide number="08" eyebrow="REMOVABLE STORAGE" sourceLabel="TEXTBOOK 3.01 · pp.51-52" syllabusLabel="SYLLABUS 3.1 — REMOVABLE" title="Removable describes movement, not a separate storage technology." className="slide--l11-removable">
          <section className="l11-venn"><article><b>SECONDARY</b><p>long-term, non-volatile purpose</p></article><strong>USB drive<br />memory card<br />optical disc</strong><article><b>REMOVABLE</b><p>detaches and travels between systems</p></article></section>
          <p className="l11-warning">A removable device may be magnetic, optical or solid state. Classify purpose and portability separately.</p>
        </Slide>
      ),
    },
    {
      time: "6 min",
      focus: "Require a situation-linked choice rather than a memorised list of advantages.",
      prompt: "Students choose storage for live calculations, firmware, a film archive and moving one file between computers.",
      source: "Coursebook printed pp.51-58; syllabus 3.1 hardware purposes and choices.",
      content: (
        <Slide number="09" eyebrow="CHOOSE BY REQUIREMENT" sourceLabel="TEXTBOOK CH.3 · pp.51-58" syllabusLabel="SYLLABUS 3.1 — APPLICATION" title="Start with what the data must do next." className="slide--l11-choice">
          <section className="l11-choice-grid"><article><span>RUN NOW</span><b>primary</b><p>direct processor access</p></article><article><span>SURVIVE POWER-OFF</span><b>secondary</b><p>persistent, higher capacity</p></article><article><span>MOVE PHYSICALLY</span><b>removable</b><p>portable between devices</p></article></section>
          <div className="l11-exam-frame"><b>Exam frame</b><span>Choose ___ because it ___, which meets the need for ___.</span></div>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Define an embedded system through dedication, integration and required components.",
      prompt: "Apply every feature to a washing machine rather than reciting an isolated definition.",
      source: "Coursebook Section 3.02 printed pp.52-53; syllabus 3.1 embedded systems.",
      content: (
        <Slide number="10" eyebrow="EMBEDDED SYSTEMS" sourceLabel="TEXTBOOK 3.02 · pp.52-53" syllabusLabel="SYLLABUS 3.1 — EMBEDDED" title="A computer system built into a larger product for a dedicated purpose." className="slide--l11-embedded">
          <section className="l11-embedded-core"><div><b>WASHING MACHINE</b><span>larger product</span></div><div><b>PROCESSOR + MEMORY</b><span>runs firmware</span></div><div><b>SENSORS + OUTPUTS</b><span>reads and controls</span></div><div><b>WASH CYCLE</b><span>specific task</span></div></section>
          <p className="l11-takeaway">“Contains a computer” is incomplete. Name the dedicated task and how it is built into the product.</p>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Balance embedded-system benefits against design and maintenance constraints.",
      prompt: "Connect every point to a pacemaker or smart appliance.",
      source: "Coursebook Section 3.02 printed pp.52-53; 9618/12 O/N 2024 Q2(a).",
      content: (
        <Slide number="11" eyebrow="EMBEDDED TRADE-OFFS" sourceLabel="TEXTBOOK 3.02 · pp.52-53" syllabusLabel="SYLLABUS 3.1 — EMBEDDED" title="Specialisation brings efficiency — and constraints." className="slide--l11-tradeoffs">
          <section className="l11-trade-grid"><article><span>BENEFITS</span><ul><li>small and low power</li><li>low unit cost at scale</li><li>reliable for a fixed task</li></ul></article><article><span>DRAWBACKS</span><ul><li>limited processing and memory</li><li>difficult to upgrade or repair</li><li>firmware flaws may persist</li></ul></article></section>
          <p className="l11-warning">A general-purpose computer can run many user-selected tasks; an embedded system is designed around a restricted purpose.</p>
        </Slide>
      ),
    },
    {
      time: "8 min",
      focus: "Model the buffer as a finite queue between unequal transfer rates.",
      prompt: "Students point to the stage that accepts a burst and the stage that drains more slowly.",
      source: "Coursebook buffer explanation printed p.54; syllabus 3.1 buffers.",
      content: (
        <Slide number="12" eyebrow="BUFFER" sourceLabel="TEXTBOOK p.54 · BUFFER" syllabusLabel="SYLLABUS 3.1 — BUFFERS" title="A temporary store absorbs a difference in data rate." className="slide--l11-buffer">
          <section className="l11-buffer-flow" role="img" aria-label="Fast source fills a temporary buffer and a slower destination drains it"><article><span>FAST SOURCE</span><b>burst</b><i /><i /><i /><i /></article><strong>→</strong><article className="l11-buffer-box"><span>TEMPORARY BUFFER</span><div><i /><i /><i /><i /><i /><i /></div></article><strong>→</strong><article><span>SLOW DESTINATION</span><b>steady</b><i /></article></section>
          <p className="l11-takeaway">The source may continue sooner, but the destination’s sustained physical speed has not changed.</p>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Use empty/full states and interrupts to complete the buffer story without claiming infinite capacity.",
      prompt: "Predict what happens if arrivals remain faster than departures after the buffer becomes full.",
      source: "Coursebook p.54; buffer mark-scheme ideas in 9618/11 O/N 2024 Q3(d)(ii).",
      content: (
        <Slide number="13" eyebrow="BUFFER STATES" sourceLabel="TEXTBOOK p.54 + PAPER 1" syllabusLabel="SYLLABUS 3.1 — BUFFERS" title="Temporary means finite: empty, useful, full." className="slide--l11-buffer-states">
          <section className="l11-state-grid"><article><b>EMPTY</b><p>destination may request more data</p></article><article><b>PART-FULL</b><p>rate mismatch is being absorbed</p></article><article><b>FULL</b><p>source must pause or data may be lost</p></article></section>
          <div className="l11-exam-frame"><b>Cause → mechanism → effect</b><span>Different rates → temporary store → fewer waits or overruns during the transfer.</span></div>
        </Slide>
      ),
    },
    {
      time: "8 min",
      focus: "Practise two authentic hardware contexts with distinct mark points.",
      prompt: "Give five minutes closed-book, then reveal and self-mark one idea per mark.",
      source: "Adapted from 9618/11 M/J 2024 Q2(a) and 9618/11 O/N 2024 Q3(d)(ii), checked against published mark schemes.",
      content: (
        <Slide number="14" eyebrow="PAST PAPER PRACTICE · 5 MARKS" sourceLabel="9618/11 · M/J + O/N 2024" syllabusLabel="SYLLABUS 3.1 — EXAM PRACTICE" title="Embedded purpose, then a rate mismatch." className="slide--l11-paper">
          <section className="l11-paper-question"><p><b>(a)</b> Identify two characteristics that make a video doorbell an embedded system. <strong>[2]</strong></p><p><b>(b)</b> Explain how a buffer is used when a computer writes data to an optical disc. <strong>[3]</strong></p></section>
          <Reveal visible={paperVisible} onToggle={() => setPaperVisible((value) => !value)}><p><b>(a)</b> Dedicated/specific tasks; hardware and software built into the larger doorbell; limited processing allows a dedicated processor. <b>(b)</b> The devices have different speeds; data is stored temporarily at computer speed and released at writer speed, preventing overload or allowing other processing.</p></Reveal>
          <p className="l11-citation">Adapted from 9618/11 M/J 2024 Q2(a) [2] and 9618/11 O/N 2024 Q3(d)(ii) [3].</p>
        </Slide>
      ),
    },
    {
      time: "4 min",
      focus: "Close with rapid classification and one buffer misconception check.",
      prompt: "Students answer all four prompts without notes; collect the final explanation orally.",
      source: "Lesson synthesis from syllabus 3.1 and Coursebook printed pp.50-54.",
      content: (
        <Slide number="15" eyebrow="EXIT TICKET" sourceLabel="TEXTBOOK CH.3 · REVIEW" syllabusLabel="SYLLABUS 3.1" title="Name the role. Link the reason." className="slide--l11-exit">
          <section className="l11-exit-grid"><article><b>01</b><p>Why is RAM primary?</p></article><article><b>02</b><p>Why is an SSD secondary?</p></article><article><b>03</b><p>Why is a thermostat embedded?</p></article><article><b>04</b><p>Why does a buffer not speed up a printer?</p></article></section>
          <div className="l11-homework"><b>HOMEWORK 11</b><span>30 marks · 45 minutes · inline mark schemes</span><strong>USE HOMEWORK TAB ↑</strong></div>
        </Slide>
      ),
    },
  ];

  return (
    <LessonShell
      lessonNumber="11"
      slides={slides}
      homework={<HomeworkSheet lessonNumber="11" title="Hardware Roles, Embedded Systems & Buffers" marks={30} minutes={45} syllabusLabel="SYLLABUS 3.1" sourceLabel="TEXTBOOK CH.3 · pp.50-58 + PAPER 1" instructions="Use precise hardware roles. For every explanation, state the feature, its mechanism and its effect in the given situation. Past-paper prompts are concise adaptations with the original reference and mark allocation shown." sections={homeworkSections} challenge={{ id: "l11-challenge", prompt: <p><Mark>CHALLENGE</Mark> Design the data path in a wildlife camera from sensor input to long-term storage. Include one reason for a buffer.</p>, answer: <p>Light reaches an image sensor, which inputs digital image data. The processor applies instructions held in primary memory; a buffer temporarily holds frames when capture and writing rates differ; non-volatile secondary storage retains the files. A removable memory card would also allow physical transfer.</p> }} />}
      courseMapHref="../?view=roadmap"
      sourceSummary="Checked against syllabus 3.1, Coursebook Chapter 3 printed pp.50-58, and published 2024 AS Paper 1 questions and mark schemes."
      sourceDetail="Coursebook Chapter 3 opening p.50; Section 3.01 printed pp.51-52; Section 3.02 printed pp.52-53; primary-memory and buffer material printed pp.53-54; secondary-storage examples printed pp.55-58. Core boundary: input/output purpose, primary/secondary/removable storage purpose, embedded systems and buffers. Buffer wording explicitly treats the store as finite and temporary, not as a permanent speed increase. Authentic anchors: 9618/11 M/J 2024 Q2(a) [2] and 9618/11 O/N 2024 Q3(d)(ii) [3]."
    />
  );
}
