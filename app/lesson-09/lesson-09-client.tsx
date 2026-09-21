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
  const panelId = `l9-reveal-${id}`;
  return (
    <div className="l9-reveal">
      <button type="button" onClick={() => onToggle(id)} aria-expanded={visible} aria-controls={panelId}>
        {visible ? "Hide mark scheme" : "Reveal mark scheme"}
      </button>
      <div id={panelId} className={visible ? "l9-reveal-panel l9-visible" : "l9-reveal-panel"} hidden={!visible}>
        {children}
      </div>
    </div>
  );
}

const homeworkSections: HomeworkSection[] = [
  {
    code: "A",
    title: "Ethernet and collisions",
    subtitle: "Separate collision avoidance from collision recovery",
    marks: 10,
    questions: [
      {
        id: "l9-1",
        marks: 3,
        lines: 3,
        prompt: <><b>Describe what is meant by Ethernet and explain why modern switched Ethernet normally has no collisions.</b></>,
        answer: <p>Ethernet is a family of <strong>wired LAN standards/protocols</strong> defining local data transmission. In modern Ethernet, each device has a dedicated full-duplex link to a switch, so devices do not compete on one shared medium. <em>[1 standard; 1 wired LAN/data transmission; 1 dedicated/full-duplex link]</em></p>,
      },
      {
        id: "l9-2",
        marks: 3,
        lines: 4,
        prompt: <><Mark>PAST PAPER PRACTICE</Mark><p><b>Describe how Ethernet deals with collisions using CSMA/CD.</b></p><p>Adapted from 9618/12 O/N 2025 Q5(d). [3]</p></>,
        answer: <p>Any three: listen to/sense the medium; transmit only when idle; detect a collision and abort/send a jamming signal; wait a random back-off time; retry; increase the wait after repeated collisions. <em>[3]</em></p>,
      },
      {
        id: "l9-3",
        marks: 4,
        lines: 5,
        prompt: <><Mark>PAST PAPER PRACTICE</Mark><p><b>(a) Describe how CSMA/CD manages a detected collision. [2]</b></p><p><b>(b) Identify two drawbacks of CSMA/CD. [2]</b></p><p>Adapted from 9618/13 M/J 2024 Q5(c)(i)-(ii).</p></>,
        answer: <p><b>(a)</b> Abort transmission/send a jamming signal, wait for a random back-off time, then retry; increase the wait after repeated collisions. <b>(b)</b> Valid drawbacks include unpredictable or very long waits, no node priority, poor scalability as nodes increase, or high power consumption. <em>[2 + 2]</em></p>,
      },
    ],
  },
  {
    code: "B",
    title: "Internet infrastructure and the WWW",
    subtitle: "Name the network layer and the service that uses it",
    marks: 10,
    questions: [
      {
        id: "l9-4",
        marks: 3,
        lines: 4,
        prompt: <><b>Distinguish the internet from the World Wide Web.</b></>,
        answer: <p>The <strong>internet</strong> is the global infrastructure/network of interconnected networks that carries data. The <strong>WWW</strong> is a distributed collection of linked web pages/resources accessed over the internet, normally with a browser. The web is one internet service; the terms are not synonyms. <em>[3]</em></p>,
      },
      {
        id: "l9-5",
        marks: 2,
        lines: 3,
        prompt: <><Mark>PAST PAPER PRACTICE</Mark><p><b>State one role for each item:</b></p><p>(a) modem [1] &nbsp; (b) dedicated line [1]</p><p>Adapted from 9618/11 M/J 2025 Q2(c). [2]</p></>,
        answer: <p><b>Modem:</b> converts digital data to/from analogue signals for transmission over a telephone line. <b>Dedicated line:</b> provides a direct/private connection, allowing faster transmission. <em>[1 each]</em></p>,
      },
      {
        id: "l9-5b",
        marks: 1,
        lines: 2,
        prompt: <><b>State the role of a cell phone network in internet access.</b></>,
        answer: <p>It gives a mobile device wireless access through a cell tower and provider network, which connects onward to the internet. <em>[1]</em></p>,
      },
      {
        id: "l9-6",
        marks: 4,
        lines: 5,
        prompt: <><Mark>PAST PAPER PRACTICE</Mark><p><b>Describe the roles of (a) routers [2] and (b) the PSTN [2] in internet transmission.</b></p><p>Adapted from 9618/12 M/J 2024 Q3(c)(i)-(ii).</p></>,
        answer: <p><b>Router:</b> receives a packet, examines its destination IP address/routing table and forwards it towards the destination. <b>PSTN:</b> provides communication lines and switching centres; signals may be converted into a form suitable for the particular line and may travel in both directions. <em>[2 + 2]</em></p>,
      },
    ],
  },
  {
    code: "C",
    title: "Bit streaming",
    subtitle: "Track source, buffer, bit rate and playback",
    marks: 10,
    questions: [
      {
        id: "l9-7",
        marks: 3,
        lines: 4,
        prompt: <><Mark>PAST PAPER PRACTICE</Mark><p><b>(a) State what is meant by bit streaming. [1]</b></p><p><b>(b) Give two differences between real-time and on-demand streaming. [2]</b></p><p>Adapted from 9618/11 M/J 2024 Q2(e)(i)-(ii).</p></>,
        answer: <p><b>(a)</b> A continuous, ordered flow of bits over a communication path. <b>(b)</b> Real-time content is delivered as it is produced, whereas on-demand content is pre-recorded and requested at a chosen time. On-demand can normally be paused/replayed; a basic live stream normally follows the source continuously. <em>[1 + 2]</em></p>,
      },
      {
        id: "l9-8",
        marks: 4,
        lines: 4,
        prompt: <><b>Explain how a buffer supports smooth video streaming.</b></>,
        answer: <p>Incoming media bits are stored temporarily in a <strong>buffer</strong> before playback. The player consumes data from it at the required playback bit rate. Stored data absorbs short variations or delays in delivery; if the buffer empties, playback pauses/stutters while it refills. <em>[4]</em></p>,
      },
      {
        id: "l9-9",
        marks: 3,
        lines: 4,
        prompt: <><b>A stream needs 6 Mbit/s, but a connection sustains only 4 Mbit/s.</b><p>Explain the likely effect and give one remedy.</p></>,
        answer: <p>The player removes data faster than the network replaces it, so the buffer eventually <strong>underflows</strong> and playback stalls. A sustainable remedy is to use a lower/adaptive-bit-rate compressed stream or increase the connection&apos;s sustained throughput. <em>[1 rate comparison; 1 effect; 1 remedy]</em></p>,
      },
    ],
  },
];

export default function Lesson09Client() {
  const [revealed, setRevealed] = useState<Set<string>>(() => new Set());
  const toggleReveal = (id: string) => setRevealed((current) => {
    const next = new Set(current);
    if (next.has(id)) next.delete(id); else next.add(id);
    return next;
  });

  const slides: SlideData[] = [
    {
      time: "3 min",
      focus: "Connect a local Ethernet frame to the much larger internet journey and final media experience.",
      prompt: "Ask what can go wrong at the shared cable, across the internet and inside the player.",
      source: "Coursebook Sections 2.05-2.07 printed pp.36-41; syllabus 2.1 p.16.",
      content: (
        <Slide number="01" eyebrow="CHAPTER 2 · COMMUNICATION" sourceLabel="TEXTBOOK 2.05-2.07" syllabusLabel="SYLLABUS 2.1 · p.16" className="l9-slide l9-title">
          <section className="l9-title-grid"><div><span>LESSON 09 · 90 MINUTES</span><h1>From frame<br /><em>to live stream</em></h1><p>Coordinate local access, cross internet infrastructure and keep media playing.</p></div><div className="l9-route-hero" role="img" aria-label="Local device passes data through a network into a playback buffer"><b>LAN</b><i>→</i><strong>INTERNET</strong><i>→</i><b>BUFFER</b><span>access · route · play</span></div></section>
        </Slide>
      ),
    },
    {
      time: "4 min",
      focus: "Expose the four remaining non-addressing outcomes for this lesson.",
      prompt: "Students identify which part is infrastructure and which part is an application.",
      source: "2027-2029 syllabus Section 2.1 p.16.",
      content: (
        <Slide number="02" eyebrow="TEXTBOOK × SYLLABUS" sourceLabel="TEXTBOOK pp.36-41" syllabusLabel="SYLLABUS 2.1 · p.16" title="One journey, four syllabus lenses." className="l9-slide l9-map">
          <section className="l9-route"><article><span>01</span><b>ETHERNET</b><p>collision detection and avoidance</p></article><article><span>02</span><b>INFRASTRUCTURE</b><p>modem · PSTN · lines · cell network</p></article><article><span>03</span><b>WWW ≠ INTERNET</b><p>application over infrastructure</p></article><article><span>04</span><b>STREAMING</b><p>real-time · on-demand · bit rate</p></article></section>
          <p className="l9-boundary"><Mark>LESSON 10</Mark><span>IPv4 · IPv6 · subnetting · public/private · static/dynamic · URL · DNS</span></p>
        </Slide>
      ),
    },
    {
      time: "5 min",
      focus: "Retrieve media choices and reveal why access rules matter on a shared medium.",
      prompt: "Two devices share one cable and transmit together: predict what happens to both signals.",
      source: "Coursebook transition from 2.03 to 2.05, printed pp.32-37.",
      content: (
        <Slide number="03" eyebrow="DO NOW · RETRIEVAL" sourceLabel="TEXTBOOK pp.32-37" syllabusLabel="SYLLABUS 2.1 — ETHERNET" title="A and B transmit at the same time on one shared cable. What must the protocol do?" className="l9-slide l9-collision-question">
          <section className="l9-collision-visual" role="img" aria-label="Two devices send signals that collide on a shared cable"><b>A</b><i /><strong>COLLISION</strong><i /><b>B</b></section>
          <Reveal id="collision-do-now" visible={revealed.has("collision-do-now")} onToggle={toggleReveal}><p>The corrupted transmissions must stop. Devices need to detect the collision, wait for different random periods and attempt retransmission.</p></Reveal>
        </Slide>
      ),
    },
    {
      time: "6 min",
      focus: "Define Ethernet at the correct syllabus depth and distinguish legacy shared from modern switched links.",
      prompt: "Ask whether Ethernet names a cable, a topology or a family of standards.",
      source: "Coursebook Section 2.05 printed pp.36-37; syllabus 2.1 Ethernet.",
      content: (
        <Slide number="04" eyebrow="WHAT IS ETHERNET?" sourceLabel="TEXTBOOK 2.05 · pp.36-37" syllabusLabel="SYLLABUS 2.1 — ETHERNET" title="Ethernet is a family of wired LAN standards for exchanging data." className="l9-slide l9-ethernet">
          <section className="l9-ethernet-grid"><article><span>STANDARD</span><b>IEEE 802.3</b><p>defines local wired communication</p></article><article><span>LEGACY</span><b>shared medium</b><p>devices compete; collisions are possible</p></article><article><span>MODERN</span><b>switched links</b><p>dedicated full-duplex links avoid collision domains</p></article></section>
          <p className="l9-warning">CSMA/CD remains examinable even though modern switched Ethernet normally does not need it.</p>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Make collision causation visible before introducing the acronym.",
      prompt: "Students explain why carrier sensing reduces but cannot guarantee prevention of collisions.",
      source: "Coursebook printed p.37; syllabus collision detection and avoidance.",
      content: (
        <Slide number="05" eyebrow="WHY COLLISIONS HAPPEN" sourceLabel="TEXTBOOK p.37" syllabusLabel="SYLLABUS 2.1 — COLLISIONS" title="Signals overlap when two devices use the same medium together." className="l9-slide l9-cause">
          <section className="l9-timeline" role="img" aria-label="Two devices sense an idle cable then transmit before hearing the other"><div><span>t₀</span><b>A senses idle</b><b>B senses idle</b></div><div><span>t₁</span><b>A transmits →</b><b>← B transmits</b></div><div><span>t₂</span><strong>signals overlap: collision</strong></div></section>
          <p className="l9-takeaway">Propagation takes time. Two distant devices may both sense “idle” before either signal reaches the other.</p>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Teach CSMA/CD as a complete ordered cycle with distinct avoidance and recovery phases.",
      prompt: "Class chants the sequence, then closes the slide and reconstructs it.",
      source: "Coursebook p.37; syllabus CSMA/CD.",
      content: (
        <Slide number="06" eyebrow="CSMA/CD · THE CYCLE" sourceLabel="TEXTBOOK p.37" syllabusLabel="SYLLABUS 2.1 — CSMA/CD" title="Listen first. Detect overlap. Back off randomly. Retry." className="l9-slide l9-cycle">
          <section className="l9-cycle-row"><article><span>1</span><b>SENSE</b><p>listen to carrier</p></article><i>→</i><article><span>2</span><b>TRANSMIT</b><p>only if idle</p></article><i>→</i><article><span>3</span><b>DETECT</b><p>monitor collision</p></article><i>→</i><article><span>4</span><b>ABORT</b><p>jam / stop</p></article><i>→</i><article><span>5</span><b>BACK OFF</b><p>random wait, retry</p></article></section>
          <div className="l9-answer-frame"><b>Avoidance</b><span>sense + wait</span><b>Recovery</b><span>detect + abort + random back-off + retransmit</span></div>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Use a verified authentic item to expose recovery marks and limitations.",
      prompt: "Students answer in four distinct bullets before revealing.",
      source: "Adapted from 9618/13 May/June 2024 Question 5(c)(i)-(ii), verified against the published mark scheme.",
      content: (
        <Slide number="07" eyebrow="PAST PAPER PRACTICE · 4 MARKS" sourceLabel="9618/13 M/J 2024 · Q5(c)" syllabusLabel="SYLLABUS 2.1 — CSMA/CD" title="A collision has been detected. Manage it, then identify two drawbacks." className="l9-slide l9-paper">
          <section className="l9-paper-question"><p><b>(a)</b> Describe how CSMA/CD manages the collision. <strong>[2]</strong></p><p><b>(b)</b> Identify two drawbacks of CSMA/CD. <strong>[2]</strong></p></section>
          <Reveal id="csma-paper" visible={revealed.has("csma-paper")} onToggle={toggleReveal}><p><b>(a)</b> Send a jamming signal/abort; wait a random period, then retry; increase wait after repeated collisions. <b>(b)</b> Any two: unpredictable long wait, no priority, high power consumption, limited distance, or poor scalability as nodes increase.</p></Reveal>
          <p className="l9-citation">Concise adaptation of 9618/13 M/J 2024 Q5(c)(i)-(ii), retaining the original 2 + 2 marks.</p>
        </Slide>
      ),
    },
    {
      time: "6 min",
      focus: "Explain why switching and full-duplex operation remove the shared collision domain.",
      prompt: "Compare a hub broadcast with a switch forwarding on one destination port.",
      source: "Coursebook p.37; syllabus Ethernet and collision avoidance.",
      content: (
        <Slide number="08" eyebrow="MODERN SWITCHED ETHERNET" sourceLabel="TEXTBOOK p.37" syllabusLabel="SYLLABUS 2.1 — AVOIDANCE" title="Dedicated full-duplex switch links do not compete for one shared cable." className="l9-slide l9-switched">
          <section className="l9-switch-visual" role="img" aria-label="Two devices use separate full-duplex links to a switch"><article><b>A</b><span>send + receive</span></article><i /><strong>SWITCH</strong><i /><article><b>B</b><span>send + receive</span></article></section>
          <section className="l9-two-points"><p><b>Separate links:</b> A and B do not transmit on the same conductor.</p><p><b>Full duplex:</b> each link can send and receive simultaneously.</p></section>
        </Slide>
      ),
    },
    {
      time: "6 min",
      focus: "Correct the common misconception that the WWW and internet are synonyms.",
      prompt: "Classify email, web pages, physical fibre and routers as internet infrastructure or services.",
      source: "Coursebook Section 2.07 printed pp.38-39; syllabus WWW versus internet.",
      content: (
        <Slide number="09" eyebrow="WWW ≠ INTERNET" sourceLabel="TEXTBOOK 2.07 · pp.38-39" syllabusLabel="SYLLABUS 2.1 — WWW / INTERNET" title="The web uses the internet; it is not the internet itself." className="l9-slide l9-web">
          <section className="l9-layer-stack"><article><span>APPLICATION</span><b>WORLD WIDE WEB</b><p>linked pages/resources on web servers, accessed with browsers</p></article><article><span>INFRASTRUCTURE</span><b>INTERNET</b><p>interconnected networks, routers and links that carry many services</p></article></section>
          <p className="l9-warning">Email, voice calls and online games can use the internet without being part of the WWW.</p>
        </Slide>
      ),
    },
    {
      time: "6 min",
      focus: "Show internet access as a path through multiple networks rather than one device.",
      prompt: "Students trace a packet from a home device to a remote web server.",
      source: "Coursebook Section 2.06 printed pp.37-38; syllabus internet-support hardware.",
      content: (
        <Slide number="10" eyebrow="INTERNET INFRASTRUCTURE" sourceLabel="TEXTBOOK 2.06 · pp.37-38" syllabusLabel="SYLLABUS 2.1 — INTERNET HARDWARE" title="Internet access is a chain of links, conversions and routing decisions." className="l9-slide l9-infrastructure">
          <section className="l9-internet-path" role="img" aria-label="Device connects via modem and provider network through routers to a server"><article><b>DEVICE</b><span>data</span></article><i>→</i><article><b>MODEM / ACCESS</b><span>signal fit</span></article><i>→</i><article><b>ISP + ROUTERS</b><span>forward</span></article><i>→</i><article><b>SERVER</b><span>service</span></article></section>
          <p className="l9-takeaway">A router chooses the next network path. A modem adapts signals for the access link.</p>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Assign a precise role to each named syllabus item without treating a line as a box.",
      prompt: "Read each role aloud; students name the matching infrastructure item.",
      source: "Coursebook printed p.38; syllabus modems, PSTN, dedicated lines and cell phone network.",
      content: (
        <Slide number="11" eyebrow="FOUR SUPPORTING ROUTES" sourceLabel="TEXTBOOK p.38" syllabusLabel="SYLLABUS 2.1 — INTERNET HARDWARE" title="Different access networks carry data in different signal forms." className="l9-slide l9-hardware">
          <section className="l9-hardware-grid"><article><span>MODEM</span><b>modulates / demodulates</b><p>converts data to and from signals suitable for the communication link</p></article><article><span>PSTN</span><b>switches connections</b><p>telephone infrastructure can carry internet traffic through provider systems</p></article><article><span>DEDICATED LINE</span><b>permanent capacity</b><p>reserved connection between an organisation and provider/site</p></article><article><span>CELL NETWORK</span><b>mobile access</b><p>radio link to a cell tower, then onward through the provider</p></article></section>
          <p className="l9-warning">A modem is not always simply “digital to analogue”; it converts data into the signal form required by its line.</p>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Define streaming by delivery behaviour, not by a file merely containing bits.",
      prompt: "Ask how playback can start before the complete media file arrives.",
      source: "Coursebook bit streaming printed pp.40-41; syllabus bit streaming.",
      content: (
        <Slide number="12" eyebrow="WHAT IS BIT STREAMING?" sourceLabel="TEXTBOOK pp.40-41" syllabusLabel="SYLLABUS 2.1 — STREAMING" title="An ordered flow of bits arrives continuously while media is consumed." className="l9-slide l9-stream">
          <section className="l9-stream-flow"><article><span>MEDIA SERVER</span><b>encoded media</b></article><div className="l9-bit-train"><i>1</i><i>0</i><i>1</i><i>1</i><i>0</i><i>0</i><i>1</i></div><article><span>PLAYER</span><b>decode + play</b></article></section>
          <p className="l9-takeaway">The complete file need not arrive first. All network data uses bits; “streaming” describes continuous ordered delivery and consumption.</p>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Separate when content is produced from when a user requests it.",
      prompt: "Classify a live lesson, catch-up programme and music track, then justify.",
      source: "Coursebook p.40; syllabus real-time and on-demand methods.",
      content: (
        <Slide number="13" eyebrow="REAL-TIME OR ON-DEMAND?" sourceLabel="TEXTBOOK p.40" syllabusLabel="SYLLABUS 2.1 — STREAMING METHODS" title="The source timeline determines the streaming method." className="l9-slide l9-stream-types">
          <section className="l9-compare"><article><span>REAL-TIME</span><h3>produced and delivered now</h3><ul><li>live event or call</li><li>little control over source timing</li><li>many simultaneous users may load servers</li></ul></article><article><span>ON-DEMAND</span><h3>stored before the request</h3><ul><li>user chooses when to start</li><li>normally pause, seek and replay</li><li>server sends the selected stored content</li></ul></article></section>
        </Slide>
      ),
    },
    {
      time: "6 min",
      focus: "Relate sustained incoming throughput, playback bit rate and buffer fill level.",
      prompt: "Predict the buffer when input is 8 Mbit/s and playback is 6 Mbit/s, then reverse the rates.",
      source: "Coursebook pp.40-41; syllabus importance of bit rates and broadband speed.",
      content: (
        <Slide number="14" eyebrow="BUFFER + BIT RATE" sourceLabel="TEXTBOOK pp.40-41" syllabusLabel="SYLLABUS 2.1 — BIT RATE / BROADBAND" title="Smooth playback needs data to arrive at least as fast as it is consumed." className="l9-slide l9-buffer">
          <section className="l9-rate-model"><article><span>NETWORK</span><b>8 Mbit/s</b><p>incoming</p></article><i>→</i><div><span>BUFFER</span><b>temporary store</b><em /></div><i>→</i><article><span>PLAYER</span><b>6 Mbit/s</b><p>consumed</p></article></section>
          <section className="l9-buffer-rules"><p><b>input &gt; playback:</b> buffer fills</p><p><b>input = playback:</b> level is stable</p><p><b>input &lt; playback:</b> buffer drains → stall</p></section>
        </Slide>
      ),
    },
    {
      time: "6 min",
      focus: "Close with a verified authentic definition-and-comparison item.",
      prompt: "Students answer in exactly three scoring statements before revealing.",
      source: "Adapted from 9618/11 May/June 2024 Question 2(e)(i)-(ii), verified against the published mark scheme.",
      content: (
        <Slide number="15" eyebrow="PAST PAPER EXIT · 3 MARKS" sourceLabel="9618/11 M/J 2024 · Q2(e)" syllabusLabel="SYLLABUS 2.1 — STREAMING" title="Define bit streaming, then give two real-time/on-demand differences." className="l9-slide l9-exit">
          <section className="l9-exit-prompt"><p><b>1 mark</b><span>one exact definition</span></p><p><b>2 marks</b><span>two paired differences</span></p></section>
          <Reveal id="stream-exit" visible={revealed.has("stream-exit")} onToggle={toggleReveal}><p>A <strong>continuous ordered flow of bits</strong> over a communication path. Real-time is direct from a live source; on-demand is pre-recorded and requested later. On-demand normally permits pause/replay; a basic real-time stream follows the live source.</p></Reveal>
          <div className="l9-homework"><b>HOMEWORK 09</b><span>30 marks · 45 minutes · inline answers</span><strong>USE HOMEWORK TAB ↑</strong></div>
        </Slide>
      ),
    },
  ];

  const homework = (
    <HomeworkSheet
      lessonNumber="09"
      title="Ethernet, Internet Infrastructure, the WWW & Bit Streaming"
      marks={30}
      minutes={45}
      syllabusLabel="SYLLABUS 2.1 · p.16"
      sourceLabel="TEXTBOOK CH.2 · pp.36-41 + PAPER 1"
      instructions="Write processes in order and use precise action verbs. For comparisons, make paired points. Past-paper prompts are concise adaptations with their original references and marks."
      sections={homeworkSections}
      challenge={{
        id: "l9-challenge",
        prompt: <p><Mark>CHALLENGE</Mark> Trace a live video packet from a school computer to a remote viewer. Use Ethernet, router, ISP infrastructure, buffer and player in a technically correct sequence.</p>,
        answer: <p>The source sends data over its local <strong>Ethernet</strong> link to a switch/router. The router examines destination information and forwards packets through ISP/internet routers. At the viewer, ordered media bits enter a <strong>buffer</strong>; the player removes, decodes and plays them at the required bit rate. Short delivery variations are absorbed while buffered data remains.</p>,
      }}
    />
  );

  return (
    <LessonShell
      lessonNumber="09"
      slides={slides}
      homework={homework}
      courseMapHref="../?view=roadmap"
      sourceSummary="Checked against syllabus 2.1 p.16, Coursebook Chapter 2 printed pp.36-41, and published 2021-2025 AS Paper 1 questions and mark schemes."
      sourceDetail="Core boundary: Ethernet and CSMA/CD; modern switched collision avoidance; internet versus WWW; modem, PSTN, dedicated lines and cell network; real-time/on-demand bit streaming, buffers, bit rate and broadband speed. Authentic anchors: 9618/12 O/N 2025 Q5(d), 9618/13 M/J 2024 Q5(c), 9618/11 M/J 2025 Q2(c), 9618/12 M/J 2024 Q3(c), and 9618/11 M/J 2024 Q2(e). IP addressing, subnetting, URL and DNS follow in Lesson 10."
    />
  );
}
