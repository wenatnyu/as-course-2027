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
  const panelId = `l7-reveal-${id}`;
  return (
    <div className="lesson-reveal l7-reveal">
      <button type="button" onClick={() => onToggle(id)} aria-expanded={visible} aria-controls={panelId}>
        {visible ? "Hide mark scheme" : "Reveal mark scheme"}
      </button>
      <div id={panelId} className={visible ? "lesson-reveal__panel visible" : "lesson-reveal__panel"} hidden={!visible}>
        {children}
      </div>
    </div>
  );
}

const homeworkSections: HomeworkSection[] = [
  {
    code: "A",
    title: "LAN purpose and characteristics",
    subtitle: "Authentic Paper 1 questions · core slides 03–04",
    marks: 6,
    questions: [
      {
        id: "l7-1",
        marks: 2,
        lines: 3,
        prompt: <><Mark>PAST PAPER · VERBATIM</Mark><p>A company has a LAN (local area network).</p><b>Give two benefits of connecting computers to a LAN.</b><p className="question-source">9618/12 M/J 2023 · Q1(a)</p></>,
        answer: <p>Award one mark for each distinct benefit, to a maximum of two: sharing files/data or communicating between devices; sharing hardware/software resources; central management such as backup or security. <em>[2]</em></p>,
      },
      {
        id: "l7-2",
        marks: 2,
        lines: 3,
        prompt: <><Mark>PAST PAPER · VERBATIM</Mark><b>Give two characteristics of a LAN.</b><p className="question-source">9618/12 M/J 2023 · Q1(b)</p></>,
        answer: <p>It covers a small geographical area <em>[1]</em>; its infrastructure is privately owned / is not controlled by an external organisation <em>[1]</em>.</p>,
      },
      {
        id: "l7-3",
        marks: 2,
        lines: 4,
        prompt: <><Mark>PAST PAPER · VERBATIM</Mark><b>Identify two differences between a WAN and a LAN (local area network).</b><p className="question-source">9618/13 M/J 2023 · Q2(a)</p></>,
        answer: <p>Any two paired differences accepted by the published mark scheme: a WAN covers a larger geographical area; it may use public or leased infrastructure rather than privately owned infrastructure; it is usually slower; it normally has greater security exposure; and it uses different long-distance connections. <em>[1 per paired difference]</em></p>,
      },
    ],
  },
  {
    code: "B",
    title: "Client-server model",
    subtitle: "Two authentic scenarios · core slides 05 and 07",
    marks: 8,
    questions: [
      {
        id: "l7-4",
        marks: 4,
        lines: 6,
        prompt: <><Mark>PAST PAPER · VERBATIM</Mark><p>A bank allows customers to access their accounts using an application that they can download onto a device such as a smartphone. The system is a client-server model.</p><b>Describe the roles of the different devices in this model.</b><p className="question-source">9618/11 M/J 2024 · Q5(a)</p></>,
        answer: <p>Identify the bank system as the <strong>server</strong> <em>[1]</em> and state that it receives/processes requests <em>[1]</em>. Identify the smartphone/application as the <strong>client</strong> <em>[1]</em> and state that it sends a request, waits for the response and outputs/displays it <em>[1]</em>.</p>,
      },
      {
        id: "l7-5",
        marks: 4,
        lines: 7,
        prompt: <><Mark>PAST PAPER · VERBATIM</Mark><p>A computer game lets users play from any computer with internet access using a web browser. The game allows users to interact with other users.</p><b>Explain why the statement ‘This computer game uses a client-server model’ is correct.</b><p className="question-source">9618/13 M/J 2025 · Q3(c)</p></>,
        answer: <p>A web server stores the data for each player <em>[1]</em>. Each player&apos;s computer or browser is a client <em>[1]</em> that sends requests over the internet <em>[1]</em>. The server performs the required action/updates game data and sends the result back to the player <em>[1]</em>. <strong>Maximum 4 marks.</strong></p>,
      },
    ],
  },
  {
    code: "C",
    title: "Peer-to-peer and thick clients",
    subtitle: "Authentic Paper 1 questions · core slides 06 and 08",
    marks: 8,
    questions: [
      {
        id: "l7-6",
        marks: 2,
        lines: 4,
        prompt: <><Mark>PAST PAPER · VERBATIM</Mark><p>Melinda and her friends set up a peer-to-peer network between their computers to share data.</p><b>Describe the key features of a peer-to-peer network.</b><p className="question-source">9618/11 M/J 2021 · Q4(a)</p></>,
        answer: <p>Any two: all computers have equal status; each computer can provide access to resources/data; data is distributed; computers communicate and share resources directly; each computer is responsible for its own security. <em>[2]</em></p>,
      },
      {
        id: "l7-7",
        marks: 4,
        lines: 7,
        prompt: <><Mark>PAST PAPER · VERBATIM</Mark><b>Describe two drawbacks to Melinda and her friends of using a peer-to-peer network.</b><p className="question-source">9618/11 M/J 2021 · Q4(b)</p></>,
        answer: <p>Award up to two marks for each linked drawback. Examples: no central security management, so the network is only as secure as its weakest computer; no central backup, so an unbacked-up file may be lost; no central file/software management, so versions can become inconsistent; a computer may slow down while serving others; a computer must remain switched on for its shared files to be available. <em>[4]</em></p>,
      },
      {
        id: "l7-8",
        marks: 2,
        lines: 4,
        prompt: <><Mark>PAST PAPER · VERBATIM</Mark><p>The network runs as a thick-client model.</p><b>Describe what is meant by a thick-client model.</b><p className="question-source">9618/12 M/J 2023 · Q1(e)</p></>,
        answer: <p>The server performs only minimal/some processing for the client <em>[1]</em>; clients do most of their own processing or work independently because most resources are installed locally <em>[1]</em>.</p>,
      },
    ],
  },
];

export default function Lesson07Client() {
  const [revealed, setRevealed] = useState<Set<string>>(() => new Set());
  const toggleReveal = (id: string) => setRevealed((current) => {
    const next = new Set(current);
    if (next.has(id)) next.delete(id); else next.add(id);
    return next;
  });

  const slides: SlideData[] = [
    {
      time: "2 min · cumulative 02", core: true,
      focus: "Introduce one clear lesson question: how should computers share resources?",
      prompt: "Ask students to name one thing that becomes easier after two computers are connected.",
      source: "2027–2029 syllabus 2.1 p.16; Coursebook Chapter 2, printed pp.26–29.",
      content: <Slide number="01" eyebrow="CHAPTER 2 · COMMUNICATION" sourceLabel="TEXTBOOK pp.26–29" syllabusLabel="SYLLABUS 2.1 · p.16" className="l7-readable l7-clean-title"><section className="l7-clean-title__grid"><div><span>LESSON 07 · 40-MINUTE CORE</span><h1>Network foundations<br />and models</h1><p>Purpose · LAN and WAN · client-server · peer-to-peer · thin and thick clients</p></div><div className="l7-clean-question"><span>TODAY&apos;S QUESTION</span><strong>Who provides the data and processing?</strong><p>The answer determines the network model and the role of each computer.</p></div></section></Slide>,
    },
    {
      time: "3 min · cumulative 05", core: true,
      focus: "Show the exact syllabus slice for this lesson and make the boundary visible.",
      prompt: "Students underline the four actions: understand, explain, justify and distinguish.",
      source: "Official Cambridge 9618 syllabus 2027–2029, section 2.1, p.16.",
      content: <Slide number="02" eyebrow="EXACT SYLLABUS SLICE" sourceLabel="OFFICIAL SYLLABUS p.16" syllabusLabel="2.1 · NETWORK FOUNDATIONS" title="What must you be able to do?" className="l7-readable l7-syllabus-slice"><section className="l7-outcome-list"><article><b>01</b><div><strong>Purpose and benefits</strong><p>Explain why devices are networked.</p></div></article><article><b>02</b><div><strong>LAN and WAN</strong><p>Understand their characteristics and differences.</p></div></article><article><b>03</b><div><strong>Client-server and peer-to-peer</strong><p>Explain roles, benefits and drawbacks; justify a model for a situation.</p></div></article><article><b>04</b><div><strong>Thin and thick clients</strong><p>Understand how they differ.</p></div></article></section><p className="l7-boundary"><b>NEXT LESSON</b><span>Topologies, packet paths and cloud computing begin in Lesson 08.</span></p></Slide>,
    },
    {
      time: "5 min · cumulative 10", core: true,
      focus: "Link concrete benefits to the LAN/WAN distinction.",
      prompt: "Classify a school building and three offices in different cities, then give one networking benefit.",
      source: "Coursebook 2.01, printed pp.27–28; 9618/12 M/J 2023 Q1(a)–(b).",
      content: <Slide number="03" eyebrow="FOUNDATION 1 · WHY AND HOW LARGE?" sourceLabel="TEXTBOOK pp.27–28" syllabusLabel="2.1 · PURPOSE · LAN · WAN" title="Purpose answers why; LAN or WAN describes scope." className="l7-readable l7-foundation"><section className="l7-two-column"><article><span>LAN · LOCAL AREA NETWORK</span><h3>One limited site or area</h3><ul><li>small geographical area</li><li>infrastructure normally privately owned</li><li>may use wired or wireless links</li></ul></article><article><span>WAN · WIDE AREA NETWORK</span><h3>Connects distant sites</h3><ul><li>large geographical area</li><li>often uses leased or public infrastructure</li><li>links separate LANs or branches</li></ul></article></section><p className="l7-keyline"><b>Why connect?</b><span>Share data, hardware or software; communicate; manage users, security and backups centrally.</span></p></Slide>,
    },
    {
      time: "3 min · cumulative 13", core: true,
      focus: "Check that students can form paired differences rather than isolated facts.",
      prompt: "Students answer aloud using the sentence frame before the reveal.",
      source: "9618/13 M/J 2023 Q2(a), verified against the published mark scheme.",
      content: <Slide number="04" eyebrow="RETRIEVAL · 2 MARKS" sourceLabel="9618/13 M/J 2023 · Q2(a)" syllabusLabel="AUTHENTIC PAST PAPER" title="Identify two differences between a WAN and a LAN." className="l7-readable l7-paper-clean"><div className="l7-answer-frame"><b>Write paired comparisons</b><span>“A LAN …, whereas a WAN …”</span></div><Reveal id="lan-wan" visible={revealed.has("lan-wan")} onToggle={toggleReveal}><p>Use two paired differences: <b>small area vs large area</b>; <b>normally privately owned infrastructure vs public/leased infrastructure</b>. The published scheme also allows valid comparisons involving speed, security or connections. <em>[2]</em></p></Reveal></Slide>,
    },
    {
      time: "5 min · cumulative 18", core: true,
      focus: "Teach client-server through a visible request-response sequence.",
      prompt: "Trace: browser requests login → server checks data → server returns result.",
      source: "Coursebook 2.01, printed pp.28–29; 9618/11 M/J 2024 Q5(a).",
      content: <Slide number="05" eyebrow="FOUNDATION 2 · CLIENT-SERVER" sourceLabel="TEXTBOOK pp.28–29" syllabusLabel="2.1 · ROLES AND MODEL" title="The client requests. The server provides and controls." className="l7-readable l7-model-flow"><section className="l7-flow"><article><span>CLIENT</span><strong>1 · sends request</strong><p>login, file, webpage or database query</p></article><i>→</i><article><span>SERVER</span><strong>2 · processes</strong><p>authenticates, stores data and applies access rules</p></article><i>→</i><article><span>CLIENT</span><strong>3 · receives result</strong><p>displays the returned data or service</p></article></section><div className="l7-pro-con"><p><b>Benefits:</b> central security, backup and consistent data</p><p><b>Drawbacks:</b> server cost, administration and dependence</p></div></Slide>,
    },
    {
      time: "5 min · cumulative 23", core: true,
      focus: "Make the equal status and dual role of peers explicit.",
      prompt: "Ask which computer is the server. Expected answer: no dedicated server; each peer may provide and request.",
      source: "Coursebook p.29; 9618/11 M/J 2021 Q4(a)–(b).",
      content: <Slide number="06" eyebrow="FOUNDATION 3 · PEER-TO-PEER" sourceLabel="TEXTBOOK p.29" syllabusLabel="2.1 · ROLES AND MODEL" title="Every peer can request and provide resources." className="l7-readable l7-peer-model"><section className="l7-peer-row"><article><b>PEER A</b><span>requests B</span></article><i>⇄</i><article><b>PEER B</b><span>serves A · requests C</span></article><i>⇄</i><article><b>PEER C</b><span>serves B</span></article></section><div className="l7-pro-con"><p><b>Benefits:</b> low setup cost; no dedicated server</p><p><b>Drawbacks:</b> no central security, backup or file management</p></div></Slide>,
    },
    {
      time: "5 min · cumulative 28", core: true,
      focus: "Turn feature recall into justified model selection.",
      prompt: "Students choose a model for each scenario and complete the because/therefore chain.",
      source: "Syllabus 2.1: justify the use of a model for a given situation; Coursebook pp.28–29.",
      content: <Slide number="07" eyebrow="APPLY · CHOOSE AND JUSTIFY" sourceLabel="TEXTBOOK pp.28–29" syllabusLabel="2.1 · GIVEN SITUATION" title="A model is correct only when the reason fits the situation." className="l7-readable l7-scenarios"><section className="l7-two-column"><article><span>HOSPITAL RECORDS</span><h3>Client-server</h3><p>Central authentication and permissions keep confidential records consistent and controlled.</p></article><article><span>THREE FRIENDS AT HOME</span><h3>Peer-to-peer</h3><p>Direct file sharing is inexpensive and does not require a dedicated server.</p></article></section><div className="l7-answer-frame"><b>Exam sentence</b><span>Use ___ because ___; therefore ___ in this situation.</span></div></Slide>,
    },
    {
      time: "4 min · cumulative 32", core: true,
      focus: "Distinguish clients by where processing and resources reside.",
      prompt: "Ask where the program runs and what happens when the server or connection fails.",
      source: "Coursebook pp.28–29; syllabus 2.1 thin/thick clients; 9618/12 M/J 2023 Q1(e).",
      content: <Slide number="08" eyebrow="FOUNDATION 4 · CLIENT WORKLOAD" sourceLabel="TEXTBOOK pp.28–29" syllabusLabel="2.1 · THIN / THICK CLIENT" title="Thin and thick describe workload, not physical size." className="l7-readable l7-client-types"><section className="l7-two-column"><article><span>THIN CLIENT</span><h3>Server does most processing</h3><ul><li>client mainly sends input and displays output</li><li>easy central updates</li><li>strong dependence on server/network</li></ul></article><article><span>THICK CLIENT</span><h3>Client does most processing</h3><ul><li>software/resources installed locally</li><li>can work more independently</li><li>updates and security are harder to centralise</li></ul></article></section></Slide>,
    },
    {
      time: "5 min · cumulative 37", core: true,
      focus: "Use an authentic four-mark scenario to combine roles and request-response language.",
      prompt: "Students write four separate marking points before revealing the scheme.",
      source: "9618/11 M/J 2024 Q5(a), verified against the published mark scheme.",
      content: <Slide number="09" eyebrow="GUIDED EXAM PRACTICE · 4 MARKS" sourceLabel="9618/11 M/J 2024 · Q5(a)" syllabusLabel="AUTHENTIC PAST PAPER" title="Describe the roles in a banking client-server model." className="l7-readable l7-paper-clean"><section className="l7-question-box"><p>A bank lets customers access accounts using an application downloaded to a smartphone.</p><strong>Describe the roles of the different devices in this client-server model. [4]</strong></section><Reveal id="bank-model" visible={revealed.has("bank-model")} onToggle={toggleReveal}><ol><li>Identify the bank system as the server.</li><li>The server receives and processes requests.</li><li>Identify the smartphone/application as the client.</li><li>The client sends a request, waits, and displays the response.</li></ol></Reveal></Slide>,
    },
    {
      time: "3 min · cumulative 40", core: true,
      focus: "Close with a compact decision sequence students can retrieve next lesson.",
      prompt: "Students explain each line without looking back, then complete Homework 07.",
      source: "Syllabus 2.1 synthesis; Coursebook pp.26–29.",
      content: <Slide number="10" eyebrow="EXIT · FOUR DECISIONS" sourceLabel="TEXTBOOK pp.26–29" syllabusLabel="2.1 · CHECKPOINT" title="Name the scope, model, roles and workload." className="l7-readable l7-exit-clean"><section className="l7-exit-list"><p><b>1 · SCOPE</b><span>LAN or WAN?</span></p><p><b>2 · MODEL</b><span>Client-server or peer-to-peer?</span></p><p><b>3 · ROLES</b><span>Who requests? Who provides?</span></p><p><b>4 · WORKLOAD</b><span>Thin or thick client?</span></p></section><div className="l7-homework"><b>HOMEWORK 07</b><span>22 marks · 8 authentic Paper 1 questions · inline mark schemes</span><strong>HOMEWORK TAB ↑</strong></div></Slide>,
    },
    {
      time: "6 min", core: false,
      focus: "Provide a slower worked example for students who need more concrete network benefits.",
      prompt: "For each benefit, ask what is shared and who gains.",
      source: "Coursebook pp.27–28; syllabus 2.1 purpose and benefits.",
      content: <Slide number="E1" eyebrow="OPTIONAL SUPPORT · SYLLABUS CONTENT" sourceLabel="TEXTBOOK pp.27–28" syllabusLabel="2.1 · PURPOSE" title="Replace vague benefits with named actions." className="l7-readable l7-support"><section className="l7-benefit-list"><article><b>SHARE DATA</b><p>Authorised users work with common files.</p></article><article><b>SHARE RESOURCES</b><p>Many users access printers, storage or software.</p></article><article><b>COMMUNICATE</b><p>Users and devices exchange messages.</p></article><article><b>MANAGE CENTRALLY</b><p>Accounts, security and backups are controlled together.</p></article></section><p className="l7-keyline"><b>Exam warning</b><span>“It is easier” is not a complete benefit. Name what becomes possible.</span></p></Slide>,
    },
    {
      time: "7 min", core: false,
      focus: "Offer additional model-selection practice without adding new syllabus content.",
      prompt: "Students complete both justification chains orally or in writing.",
      source: "Syllabus-style original practice based on 2.1 model justification.",
      content: <Slide number="E2" eyebrow="OPTIONAL SUPPORT · SYLLABUS CONTENT" sourceLabel="ORIGINAL PRACTICE" syllabusLabel="2.1 · JUSTIFY" title="Choose the model from the requirement, not from habit." className="l7-readable l7-support"><section className="l7-two-column"><article><span>ONLINE SHOP</span><h3>What matters?</h3><p>One consistent stock database, secure customer accounts and continuous availability.</p></article><article><span>SMALL TEMPORARY TEAM</span><h3>What matters?</h3><p>Quick setup, direct sharing and very low cost; no specialist administrator.</p></article></section><div className="l7-answer-frame"><b>Your turn</b><span>Choose a model and give one linked reason for each scenario.</span></div></Slide>,
    },
    {
      time: "5 min", core: false,
      focus: "Repair three common misconceptions explicitly.",
      prompt: "Students correct every statement using one precise sentence.",
      source: "Misconception check derived from syllabus 2.1 and Coursebook pp.27–29.",
      content: <Slide number="E3" eyebrow="OPTIONAL SUPPORT · MISCONCEPTION CHECK" sourceLabel="TEXTBOOK pp.27–29" syllabusLabel="2.1 · PRECISION" title="Three statements that lose marks." className="l7-readable l7-support"><section className="l7-misconceptions"><article><b>“A WAN is the internet.”</b><p>No. A WAN connects a large geographical area; the internet is a global network of networks.</p></article><article><b>“A server is always a powerful computer.”</b><p>Server describes a role: it provides a service or resource to clients.</p></article><article><b>“Thin client means a small computer.”</b><p>Thin describes dependence on server-side processing and resources.</p></article></section></Slide>,
    },
  ];

  const homework = <HomeworkSheet lessonNumber="07" title="Network Foundations and Models" marks={22} minutes={35} syllabusLabel="SYLLABUS 2.1 · p.16" sourceLabel="8 AUTHENTIC PAPER 1 QUESTIONS" instructions="Answer every question. All wording is taken from Cambridge 9618 question papers; the answer toggle gives a concise version of the corresponding published mark scheme. Write one distinct point for each mark." sections={homeworkSections} />;

  return <LessonShell lessonNumber="07" defaultCoreOnly textbookHref="../textbook/lesson-07/" textbookLabel="Coursebook reading · pp.26–29" chapterNoteHref="../notes/chapters/#as-2" chapterNoteLabel="Chapter 2 ZNotes" slides={slides} homework={homework} courseMapHref="../?view=roadmap" additionalSourceLinks={[{ href: "https://znotes.org/caie/as-level/computer-science-9618/theory/communication/", label: "ZNotes Communication" }]} sourceSummary="Official 2027–2029 syllabus 2.1 p.16 · Coursebook Chapter 2 printed pp.26–29 · Chapter 2 ZNotes · original 2021 and 2023–2025 Paper 1 question papers and published mark schemes." sourceDetail="This sample deliberately limits Lesson 07 to network purpose, LAN/WAN, client-server, peer-to-peer, and thin/thick clients. Topologies and packet paths move to Lesson 08 so the core route remains teachable in 40 minutes. Homework sources: 9618/11 M/J 2021 Q4(a)–(b), 9618/12 M/J 2023 Q1(a),(b),(e), 9618/13 M/J 2023 Q2(a), 9618/11 M/J 2024 Q5(a), and 9618/13 M/J 2025 Q3(c)." />;
}
