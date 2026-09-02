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
    <div className="l12-reveal">
      <button type="button" onClick={onToggle} aria-expanded={visible} aria-controls="l12-paper-answer">
        {visible ? "Hide mark scheme" : "Reveal mark scheme"}
      </button>
      <div id="l12-paper-answer" className={visible ? "l12-reveal__panel visible" : "l12-reveal__panel"} hidden={!visible}>
        {children}
      </div>
    </div>
  );
}

const homeworkSections: HomeworkSection[] = [
  {
    code: "A",
    title: "RAM and ROM",
    subtitle: "Use volatility, access and contents precisely",
    marks: 10,
    questions: [
      {
        id: "l12-1",
        marks: 4,
        lines: 4,
        prompt: <><b>Give two differences between RAM and ROM.</b></>,
        answer: <p>RAM is volatile and normally supports read/write operations; ROM is non-volatile and is normally read during everyday system operation. RAM holds currently running programs/data, while ROM holds fixed startup instructions or firmware. <em>[Any two paired differences, 2 marks each]</em></p>,
      },
      {
        id: "l12-2",
        marks: 2,
        lines: 3,
        prompt: <><b>State one item normally stored in RAM and one in ROM.</b></>,
        answer: <p><strong>RAM:</strong> part of a currently running program, its data or part of the operating system. <strong>ROM:</strong> bootstrap/startup instructions, firmware or BIOS. <em>[1 each]</em></p>,
      },
      {
        id: "l12-3",
        marks: 4,
        lines: 4,
        prompt: <><b>Explain why an embedded controller may need both RAM and ROM.</b></>,
        answer: <p>ROM retains the controller firmware when power is removed, so the fixed control program is available at startup. RAM provides read/write working space for changing sensor readings, variables and intermediate results while the program runs. <em>[2 linked points for each]</em></p>,
      },
    ],
  },
  {
    code: "B",
    title: "SRAM and DRAM",
    subtitle: "Link cell design to refresh, speed, density and use",
    marks: 10,
    questions: [
      {
        id: "l12-4",
        marks: 4,
        lines: 4,
        prompt: <><b>Describe two differences between SRAM and DRAM.</b></>,
        answer: <p>SRAM stores each bit using a transistor flip-flop/latch and does not need refreshing while powered; DRAM uses a transistor and capacitor whose charge leaks, so it needs periodic refresh. SRAM is faster but costlier/lower density; DRAM is slower but cheaper/higher density. <em>[Any two paired differences, 2 marks each]</em></p>,
      },
      {
        id: "l12-5",
        marks: 4,
        lines: 4,
        prompt: <><b>Choose SRAM or DRAM for each use and justify:</b><p>(a) CPU cache [2] &nbsp; (b) main memory [2]</p></>,
        answer: <p><b>(a) SRAM:</b> its faster access and lack of refresh suit the high-speed cache close to the processor. <b>(b) DRAM:</b> its higher density and lower cost allow a larger main-memory capacity. <em>[1 choice + 1 linked reason each]</em></p>,
      },
      {
        id: "l12-6",
        marks: 2,
        lines: 3,
        prompt: <><b>Explain why DRAM must be refreshed.</b></>,
        answer: <p>A DRAM bit is represented by charge stored in a capacitor. The charge leaks away, so the value must be read and restored periodically while power is supplied. <em>[1 leakage; 1 restore]</em></p>,
      },
    ],
  },
  {
    code: "C",
    title: "Programmable ROM families",
    subtitle: "Authentic paper practice plus applied selection",
    marks: 10,
    questions: [
      {
        id: "l12-7",
        marks: 3,
        lines: 4,
        prompt: <><Mark>PAST PAPER PRACTICE</Mark><p><b>(a) Give one benefit of DRAM over SRAM in an embedded system. [1]</b></p><p><b>(b) Give two differences between EPROM and EEPROM. [2]</b></p><p>Adapted from 9618/12 O/N 2024 Q2(b)-(c). [3]</p></>,
        answer: <p><b>(a)</b> DRAM is cheaper or has higher bit density/capacity per chip. <b>(b)</b> EPROM is erased with ultraviolet light whereas EEPROM uses an electrical signal; EPROM is normally removed whereas EEPROM remains in circuit; EPROM erases the whole chip whereas EEPROM can erase selected parts. <em>[1 + any two differences]</em></p>,
      },
      {
        id: "l12-8",
        marks: 4,
        lines: 4,
        prompt: <><b>Choose PROM, EPROM or EEPROM for each situation and justify.</b><p>(a) A permanent calibration written once after manufacture. [2]</p><p>(b) Firmware updated by the user while the chip remains installed. [2]</p></>,
        answer: <p><b>(a) PROM:</b> it can be programmed once after manufacture and then remains fixed. <b>(b) EEPROM:</b> electrical erase/programming allows repeated updates in circuit without removing the chip. <em>[1 choice + 1 linked reason each]</em></p>,
      },
      {
        id: "l12-9",
        marks: 3,
        lines: 4,
        prompt: <><b>Correct three errors in this statement:</b><p>“SRAM uses capacitors, needs refreshing, and is normally chosen for high-capacity main memory because it is cheaper.”</p></>,
        answer: <p>SRAM uses transistor flip-flop/latch circuits; it does not need refresh while powered; and it is costlier/lower density, so it is normally used for cache. DRAM is the usual high-capacity main-memory choice. <em>[1 per valid correction; max 3]</em></p>,
      },
    ],
  },
];

export default function Lesson12Client() {
  const [paperVisible, setPaperVisible] = useState(false);

  const slides: SlideData[] = [
    {
      time: "3 min",
      focus: "Make persistence and working speed the two questions that organise every memory choice.",
      prompt: "Ask which memory must survive power-off and which must change constantly while a program runs.",
      source: "Coursebook Section 3.03 printed pp.53-54; syllabus 3.1 memory types.",
      content: (
        <Slide number="01" eyebrow="PRIMARY MEMORY" sourceLabel="TEXTBOOK 3.03 · pp.53-54" syllabusLabel="SYLLABUS 3.1" className="slide--l12-title">
          <section className="l12-title-grid"><div><span>LESSON 12 · 90 MINUTES</span><h1>Memory choices<br /><em>begin with a trade-off.</em></h1><p>Working or persistent? Fast or dense? Fixed once or safely updated?</p></div><div className="l12-memory-stack" role="img" aria-label="Memory family branching from primary memory to RAM and ROM types"><b>PRIMARY MEMORY</b><i /><section><span>RAM<br /><small>SRAM · DRAM</small></span><span>ROM<br /><small>PROM · EPROM · EEPROM</small></span></section></div></section>
        </Slide>
      ),
    },
    {
      time: "4 min",
      focus: "Map every named memory type to the syllabus and coursebook boundary.",
      prompt: "Students identify which branch is volatile and which technologies can be reprogrammed.",
      source: "Syllabus 3.1; Coursebook Section 3.03 printed pp.53-54.",
      content: (
        <Slide number="02" eyebrow="TEXTBOOK × SYLLABUS" sourceLabel="TEXTBOOK 3.03 · pp.53-54" syllabusLabel="SYLLABUS 3.1 — MEMORY" title="Seven names; four comparison questions." className="slide--l12-map">
          <section className="l12-question-map"><article><b>RAM ↔ ROM</b><p>contents · volatility · use</p></article><article><b>SRAM ↔ DRAM</b><p>cell · refresh · speed · cost</p></article><article><b>PROM ↔ EPROM</b><p>write once · UV erase</p></article><article><b>EPROM ↔ EEPROM</b><p>remove · in-circuit update</p></article></section>
          <p className="l12-boundary"><Mark>EXAM RULE</Mark><span>When asked for a difference, compare the same property on both sides.</span></p>
        </Slide>
      ),
    },
    {
      time: "5 min",
      focus: "Establish the shared category before comparing RAM and ROM.",
      prompt: "Ask why both technologies count as primary memory even though only one is volatile.",
      source: "Coursebook Section 3.03 printed p.53; syllabus 3.1 primary memory.",
      content: (
        <Slide number="03" eyebrow="RAM AND ROM" sourceLabel="TEXTBOOK 3.03 · p.53" syllabusLabel="SYLLABUS 3.1 — PRIMARY MEMORY" title="Both are primary memory; their jobs differ." className="slide--l12-ram-rom">
          <section className="l12-compare"><article><span>RAM</span><h3>working memory</h3><p>read/write · changing programs and data · volatile</p></article><article><span>ROM</span><h3>startup or fixed firmware</h3><p>normally read · retained without power · non-volatile</p></article></section>
          <p className="l12-warning">Primary does not mean volatile. ROM remains primary memory even though its contents persist.</p>
        </Slide>
      ),
    },
    {
      time: "6 min",
      focus: "Describe RAM contents dynamically and connect capacity to reduced secondary-storage access.",
      prompt: "Trace what enters RAM when an application opens and what disappears when power is removed.",
      source: "Coursebook Section 3.03 printed p.53; 9618/11 M/J 2025 Q6(a)(ii).",
      content: (
        <Slide number="04" eyebrow="RAM" sourceLabel="TEXTBOOK 3.03 · p.53" syllabusLabel="SYLLABUS 3.1 — RAM" title="RAM is the processor’s changing workspace." className="slide--l12-ram">
          <section className="l12-ram-flow"><div><span>SECONDARY</span><b>saved program</b></div><i>load</i><div><span>RAM</span><b>instructions + current data</b></div><i>access</i><div><span>CPU</span><b>execute</b></div></section>
          <div className="l12-fact-row"><p><b>Read/write:</b> contents change constantly</p><p><b>Volatile:</b> power loss removes contents</p><p><b>Capacity:</b> more active work can remain ready</p></div>
        </Slide>
      ),
    },
    {
      time: "6 min",
      focus: "Replace the misleading phrase ‘ROM never changes’ with a precise operational description.",
      prompt: "Ask when the processor reads ROM and why the startup code must survive power-off.",
      source: "Coursebook Section 3.03 printed pp.53-54; syllabus 3.1 ROM.",
      content: (
        <Slide number="05" eyebrow="ROM" sourceLabel="TEXTBOOK 3.03 · pp.53-54" syllabusLabel="SYLLABUS 3.1 — ROM" title="ROM retains instructions that must be present at startup." className="slide--l12-rom">
          <section className="l12-boot"><b>POWER ON</b><i>→</i><b>READ BOOTSTRAP / FIRMWARE</b><i>→</i><b>INITIALISE HARDWARE</b><i>→</i><b>LOAD SYSTEM</b></section>
          <p className="l12-takeaway">ROM is non-volatile and normally read during operation. Programmable ROM families explain how contents may be installed or updated.</p>
        </Slide>
      ),
    },
    {
      time: "6 min",
      focus: "Link the SRAM cell to no refresh and fast access.",
      prompt: "Students complete the chain: latch state remains → no refresh → faster access → cache use.",
      source: "Coursebook Section 3.03 printed p.53; syllabus 3.1 SRAM.",
      content: (
        <Slide number="06" eyebrow="STATIC RAM · SRAM" sourceLabel="TEXTBOOK 3.03 · p.53" syllabusLabel="SYLLABUS 3.1 — SRAM" title="A transistor latch holds its state while power is supplied." className="slide--l12-sram">
          <section className="l12-cell"><div className="l12-latch" role="img" aria-label="Two linked transistor groups form a stable latch"><i /><b>0 / 1</b><i /></div><article><span>CELL</span><p>several transistors form a flip-flop or latch</p><span>EFFECT</span><p>no periodic refresh while powered</p><span>USE</span><p>fast, low-capacity CPU cache</p></article></section>
          <p className="l12-warning">Static does not mean non-volatile: SRAM still loses its contents when power is removed.</p>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Link capacitor leakage to refresh and the density/cost advantage of DRAM.",
      prompt: "Ask what happens to a charged capacitor over time and what refresh must do.",
      source: "Coursebook Section 3.03 printed p.53; syllabus 3.1 DRAM.",
      content: (
        <Slide number="07" eyebrow="DYNAMIC RAM · DRAM" sourceLabel="TEXTBOOK 3.03 · p.53" syllabusLabel="SYLLABUS 3.1 — DRAM" title="A capacitor stores charge — then slowly leaks." className="slide--l12-dram">
          <section className="l12-dram-cycle"><article><b>CHARGE</b><p>represents a stored bit</p></article><i>→</i><article><b>LEAK</b><p>charge level falls</p></article><i>→</i><article><b>REFRESH</b><p>read and restore</p></article><i>↺</i></section>
          <div className="l12-fact-row"><p><b>One transistor + capacitor:</b> high density</p><p><b>Refresh:</b> slower than SRAM</p><p><b>Low cost / bit:</b> main memory</p></div>
        </Slide>
      ),
    },
    {
      time: "6 min",
      focus: "Practise paired differences that match Paper 1 mark schemes.",
      prompt: "Cover one column and make students supply the matching property on the other side.",
      source: "Coursebook p.53; 9618/11 O/N 2025 Q6(c) and 9618/13 O/N 2024 Q2(a).",
      content: (
        <Slide number="08" eyebrow="SRAM vs DRAM" sourceLabel="TEXTBOOK p.53 + PAPER 1" syllabusLabel="SYLLABUS 3.1 — COMPARE" title="Compare like with like." className="slide--l12-table">
          <section className="l12-memory-table"><div><b>PROPERTY</b><b>SRAM</b><b>DRAM</b></div><div><span>cell</span><span>flip-flop / latch</span><span>transistor + capacitor</span></div><div><span>refresh</span><span>not required</span><span>required</span></div><div><span>access</span><span>faster</span><span>slower</span></div><div><span>density / cost</span><span>lower / higher</span><span>higher / lower</span></div><div><span>typical use</span><span>cache</span><span>main memory</span></div></section>
        </Slide>
      ),
    },
    {
      time: "6 min",
      focus: "Define PROM through its one-time programming constraint.",
      prompt: "Choose a scenario where post-manufacture personalisation is needed but future updating is not.",
      source: "Coursebook Section 3.03 printed p.54; syllabus 3.1 PROM.",
      content: (
        <Slide number="09" eyebrow="PROM" sourceLabel="TEXTBOOK 3.03 · p.54" syllabusLabel="SYLLABUS 3.1 — PROM" title="Programmable once after manufacture." className="slide--l12-programmable">
          <section className="l12-program-card"><span>PROM</span><b>blank → program once → fixed</b><p>A device programmer permanently sets fuses or antifuses. The contents are then retained without power.</p></section>
          <p className="l12-takeaway">Use PROM when one post-manufacture configuration is enough; a later correction would require replacement.</p>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Explain EPROM erase conditions and their maintenance cost.",
      prompt: "Students identify why a quartz window and chip removal make updates inconvenient.",
      source: "Coursebook Section 3.03 printed p.54; syllabus 3.1 EPROM.",
      content: (
        <Slide number="10" eyebrow="EPROM" sourceLabel="TEXTBOOK 3.03 · p.54" syllabusLabel="SYLLABUS 3.1 — EPROM" title="Ultraviolet light erases the whole chip." className="slide--l12-eprom">
          <section className="l12-update-flow"><b>REMOVE CHIP</b><i>→</i><b>UV THROUGH WINDOW</b><i>→</i><b>ERASE ALL</b><i>→</i><b>REPROGRAM</b></section>
          <div className="l12-exam-frame"><b>EPROM</b><span>Erasable and reusable, but the circuit must normally be opened and all stored contents are erased.</span></div>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Explain why electrical, in-circuit updates suit changing firmware.",
      prompt: "Apply EEPROM to a headset receiving a firmware update at home.",
      source: "Coursebook Section 3.03 printed p.54; 9618/12 M/J 2024 Q2(c).",
      content: (
        <Slide number="11" eyebrow="EEPROM" sourceLabel="TEXTBOOK 3.03 · p.54" syllabusLabel="SYLLABUS 3.1 — EEPROM" title="Electrical erase and write — while the chip remains installed." className="slide--l12-eeprom">
          <section className="l12-update-flow"><b>SELECT DATA</b><i>→</i><b>ELECTRICAL PULSE</b><i>→</i><b>ERASE / WRITE PART</b><i>→</i><b>RESTART</b></section>
          <div className="l12-fact-row"><p><b>Reusable:</b> repeated update cycles</p><p><b>In circuit:</b> no physical removal</p><p><b>Selective:</b> parts can change</p></div>
        </Slide>
      ),
    },
    {
      time: "8 min",
      focus: "Turn three technologies into scenario-linked choices.",
      prompt: "Students rank each choice by update frequency, erase method and whether removal is acceptable.",
      source: "Coursebook p.54; 9618/13 O/N 2025 Q4(c).",
      content: (
        <Slide number="12" eyebrow="CHOOSE A ROM FAMILY" sourceLabel="TEXTBOOK p.54 + PAPER 1" syllabusLabel="SYLLABUS 3.1 — APPLICATION" title="How often must the contents change — and where?" className="slide--l12-choice">
          <section className="l12-choice-grid"><article><span>ONE FINAL WRITE</span><b>PROM</b><p>permanent calibration</p></article><article><span>WORKSHOP REUSE</span><b>EPROM</b><p>remove and UV erase</p></article><article><span>USER UPDATE</span><b>EEPROM</b><p>electrical, in-circuit change</p></article></section>
          <p className="l12-warning">Do not award a technology name alone when the command word is “justify”. Link its erase/write feature to the situation.</p>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Use one authentic question to retrieve the entire memory family.",
      prompt: "Give five minutes closed-book; reveal and award one mark per independent point.",
      source: "Adapted from 9618/11 M/J 2022 Q2(a)(i)-(ii), checked against the published mark scheme.",
      content: (
        <Slide number="13" eyebrow="PAST PAPER PRACTICE · 8 MARKS" sourceLabel="9618/11 M/J 2022 · Q2(a)" syllabusLabel="SYLLABUS 3.1 — EXAM PRACTICE" title="Complete the memory description, then compare programmable ROM." className="slide--l12-paper">
          <section className="l12-paper-question"><p><b>(a)</b> State the shared memory category, one RAM item, one ROM item, the SRAM cell structure and the DRAM cell structure. <strong>[5]</strong></p><p><b>(b)</b> Explain three differences among PROM, EPROM and EEPROM. <strong>[3]</strong></p></section>
          <Reveal visible={paperVisible} onToggle={() => setPaperVisible((value) => !value)}><p><b>(a)</b> Primary memory; current program/data/OS; boot instructions/BIOS; transistor flip-flop/latch; transistor plus capacitor. <b>(b)</b> PROM is written once; EPROM and EEPROM can be rewritten. EPROM uses UV, is removed and erases the whole chip; EEPROM uses electricity, remains in circuit and can erase selected parts.</p></Reveal>
          <p className="l12-citation">Adapted from 9618/11 M/J 2022 Q2(a)(i)-(ii), original allocation [5 + 3].</p>
        </Slide>
      ),
    },
    {
      time: "8 min",
      focus: "Repair the most common category and comparison errors before homework.",
      prompt: "Teams rewrite each red statement as a two-sided comparison.",
      source: "Coursebook Section 3.03 synthesis; recurring Paper 1 mark-scheme distinctions.",
      content: (
        <Slide number="14" eyebrow="EXAM CLINIC" sourceLabel="TEXTBOOK 3.03 · REVIEW" syllabusLabel="SYLLABUS 3.1" title="Three phrases that lose marks." className="slide--l12-clinic">
          <section className="l12-error-grid"><article><span>✕ “SRAM is permanent”</span><b>✓ no refresh while powered</b></article><article><span>✕ “ROM cannot change”</span><b>✓ normal access is read; family controls programming</b></article><article><span>✕ “EEPROM is faster”</span><b>✓ electrical, selective, in-circuit updating</b></article></section>
          <div className="l12-exam-frame"><b>Difference frame</b><span>___ does ___ whereas ___ does ___; therefore ___ suits the stated use.</span></div>
        </Slide>
      ),
    },
    {
      time: "4 min",
      focus: "Check all seven names with one decision chain.",
      prompt: "Students answer from left to right without notes and justify the final technology choice.",
      source: "Lesson synthesis from syllabus 3.1 and Coursebook Section 3.03.",
      content: (
        <Slide number="15" eyebrow="EXIT TICKET" sourceLabel="TEXTBOOK 3.03 · REVIEW" syllabusLabel="SYLLABUS 3.1" title="Cell. Behaviour. Use." className="slide--l12-exit">
          <section className="l12-exit-grid"><article><b>01</b><p>Which RAM needs refresh?</p></article><article><b>02</b><p>Which RAM usually forms cache?</p></article><article><b>03</b><p>Which ROM uses UV?</p></article><article><b>04</b><p>Which ROM updates in circuit?</p></article></section>
          <div className="l12-homework"><b>HOMEWORK 12</b><span>30 marks · 45 minutes · inline mark schemes</span><strong>USE HOMEWORK TAB ↑</strong></div>
        </Slide>
      ),
    },
  ];

  return (
    <LessonShell
      lessonNumber="12"
      slides={slides}
      homework={<HomeworkSheet lessonNumber="12" title="RAM, ROM and Programmable Memory" marks={30} minutes={45} syllabusLabel="SYLLABUS 3.1" sourceLabel="TEXTBOOK 3.03 · pp.53-54 + PAPER 1" instructions="For every comparison, describe the same property on both sides. Use precise terms such as volatile, refresh, flip-flop, capacitor, ultraviolet and in-circuit. Past-paper prompts are concise adaptations with their original references and marks." sections={homeworkSections} challenge={{ id: "l12-challenge", prompt: <p><Mark>CHALLENGE</Mark> A wearable device needs very fast cache, affordable working memory and user-updatable firmware. Select three memory technologies and justify each.</p>, answer: <p>Use <strong>SRAM</strong> for cache because it is fast and needs no refresh; <strong>DRAM</strong> for working memory because it has high density and lower cost; and <strong>EEPROM</strong> for firmware because it is non-volatile and can be updated electrically while installed.</p> }} />}
      courseMapHref="../?view=roadmap"
      sourceSummary="Checked against syllabus 3.1, Coursebook Section 3.03 printed pp.53-54, and published AS Paper 1 questions and mark schemes from 2022-2025."
      sourceDetail="Coursebook Section 3.03 printed pp.53-54: RAM and ROM; SRAM and DRAM; PROM, EPROM and EEPROM. Technical wording distinguishes volatile SRAM from non-volatile storage, capacitor leakage from refresh, and one-time, ultraviolet and electrical programming methods. Authentic anchors: 9618/11 M/J 2022 Q2(a)(i)-(ii) [8], 9618/12 O/N 2024 Q2(b)-(c) [3], 9618/11 O/N 2025 Q6(c) [3], and 9618/13 O/N 2025 Q4(c) [3]."
    />
  );
}
