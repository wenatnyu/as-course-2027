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
    <div className="lesson-reveal">
      <button type="button" onClick={() => onToggle(id)} aria-expanded={visible} aria-controls={panelId}>
        {visible ? "Hide mark scheme" : "Reveal mark scheme"}
      </button>
      <div id={panelId} className={visible ? "lesson-reveal__panel visible" : "lesson-reveal__panel"} hidden={!visible}>
        {children}
      </div>
    </div>
  );
}

function Topology({ kind, label }: { kind: "bus" | "star" | "mesh" | "hybrid"; label: string }) {
  const descriptions = {
    bus: "four devices attached by short links to one shared backbone cable",
    star: "four devices connected by separate links to one central device",
    mesh: "four devices connected by several direct links so alternate routes exist",
    hybrid: "a bus segment connected through a bridge to a star segment",
  };

  if (kind === "bus") {
    return (
      <div className="l7-topology l7-topology--bus" role="img" aria-label={`${label}: ${descriptions.bus}`}>
        <i className="l7-bus-backbone" />
        {[1, 2, 3, 4].map((node) => <i className={`l7-bus-stub l7-bus-stub--${node}`} key={`stub-${node}`} />)}
        {[1, 2, 3, 4].map((node) => <b className={`l7-bus-node l7-bus-node--${node}`} key={node}>{String.fromCharCode(64 + node)}</b>)}
        <span>{label}</span>
      </div>
    );
  }

  if (kind === "mesh") {
    return (
      <div className="l7-topology l7-topology--mesh" role="img" aria-label={`${label}: ${descriptions.mesh}`}>
        {['top', 'right', 'bottom', 'left', 'diag-a', 'diag-b'].map((link) => <i className={`l7-mesh-link l7-mesh-link--${link}`} key={link} />)}
        {[1, 2, 3, 4].map((node) => <b className={`l7-corner-node l7-corner-node--${node}`} key={node}>{String.fromCharCode(64 + node)}</b>)}
        <span>{label}</span>
      </div>
    );
  }

  if (kind === "hybrid") {
    return (
      <div className="l7-topology l7-topology--hybrid" role="img" aria-label={`${label}: ${descriptions.hybrid}`}>
        <div className="l7-hybrid-bus"><b>A</b><b>B</b><i /></div>
        <strong className="l7-hybrid-bridge">BR</strong>
        <div className="l7-hybrid-star"><strong>CENTRE</strong><b>C</b><b>D</b><i /><i /></div>
        <span>{label}</span>
      </div>
    );
  }

  return (
    <div className="l7-topology l7-topology--star" role="img" aria-label={`${label}: ${descriptions.star}`}>
      <i className="l7-link l7-link--1" /><i className="l7-link l7-link--2" /><i className="l7-link l7-link--3" /><i className="l7-link l7-link--4" />
      <b className="l7-node l7-node--1">A</b><b className="l7-node l7-node--2">B</b><b className="l7-node l7-node--3">C</b><b className="l7-node l7-node--4">D</b>
      <strong className="l7-centre">CENTRE</strong>
      <span>{label}</span>
    </div>
  );
}

const homeworkSections: HomeworkSection[] = [
  {
    code: "A",
    title: "Network purpose and models",
    subtitle: "Use precise roles, benefits and task-linked choices",
    marks: 10,
    questions: [
      {
        id: "l7-1",
        marks: 3,
        lines: 4,
        prompt: <><b>Give three benefits of connecting a company&apos;s computers in a network.</b></>,
        answer: <p>Any three: share files/data, share hardware such as printers, share software, communicate between devices, or manage security/backups centrally. <em>[1 each; max 3]</em></p>,
      },
      {
        id: "l7-2",
        marks: 4,
        lines: 4,
        prompt: <><b>Distinguish a LAN from a WAN.</b><p>Refer to geographical area and ownership/infrastructure.</p></>,
        answer: <p>A <strong>LAN</strong> covers a small area such as one site and its infrastructure is normally privately owned/managed. A <strong>WAN</strong> spans a large geographical area, links sites, and often uses leased/public telecommunications infrastructure. <em>[1 area + 1 ownership/infrastructure for each]</em></p>,
      },
      {
        id: "l7-3",
        marks: 3,
        lines: 4,
        prompt: <><b>A school wants central accounts, access control and backups.</b><p>Choose client-server or peer-to-peer and justify the choice.</p></>,
        answer: <p><strong>Client-server</strong>. A dedicated server can authenticate users and centrally control permissions; files can be stored and backed up in one managed location. <em>[1 choice; 2 linked benefits]</em></p>,
      },
    ],
  },
  {
    code: "B",
    title: "Topologies and packet paths",
    subtitle: "Describe the route before comparing resilience and cost",
    marks: 10,
    questions: [
      {
        id: "l7-4",
        marks: 3,
        lines: 4,
        prompt: <><b>Describe how a packet travels from one computer to another in a switch-based star topology.</b></>,
        answer: <p>The source sends the packet on its dedicated link to the <strong>central switch</strong>. The switch reads the destination address and forwards it only through the link to the destination device. <em>[1 via centre; 1 address/decision; 1 correct outgoing link]</em></p>,
      },
      {
        id: "l7-5",
        marks: 3,
        lines: 4,
        prompt: <><b>Explain one advantage of a star topology over a bus topology, and one drawback.</b></>,
        answer: <p>Advantage: one device/link failure normally leaves the others operating, or dedicated links reduce collisions and aid fault finding. Drawback: the central device is a single point of failure and the layout needs more cable/hardware. <em>[1 advantage + linked explanation; 1 drawback]</em></p>,
      },
      {
        id: "l7-6",
        marks: 4,
        lines: 4,
        prompt: <><Mark>PAST PAPER PRACTICE</Mark> <b>A university uses a mesh topology in one building.</b><p>Describe mesh and give two advantages over bus. Adapted from 9618/13 M/J 2023 Q2(b). [4]</p></>,
        answer: <p>Devices have multiple connections/routes, and may relay packets towards the destination. Advantages include an alternative route after a link failure, fewer collisions, or adding a node without interrupting other links. <em>[2 description; 1 each for two advantages]</em></p>,
      },
    ],
  },
  {
    code: "C",
    title: "LAN hardware · authentic paper practice",
    subtitle: "Name each device, then state its role in one exact sentence",
    marks: 10,
    questions: [
      {
        id: "l7-7",
        marks: 4,
        lines: 4,
        prompt: <><b>State one role for each device:</b><p>(a) NIC &nbsp; (b) WNIC &nbsp; (c) repeater &nbsp; (d) server</p></>,
        answer: <p><b>NIC:</b> connects/identifies a device on a wired LAN. <b>WNIC:</b> provides the network interface for wireless connection. <b>Repeater:</b> regenerates a weakened signal to extend a network segment. <b>Server:</b> provides a managed network service/resource. <em>[1 each]</em></p>,
      },
      {
        id: "l7-8",
        marks: 6,
        lines: 4,
        prompt: <><Mark>PAST PAPER PRACTICE</Mark> <b>A school LAN uses a router, switch, WAP and bridge.</b><p>(a) Describe three functions of the router. [3]</p><p>(b) State one purpose each of the switch, WAP and bridge. [3]</p><p>Adapted from 9618/11 O/N 2023 Q2(a)-(b). [6]</p></>,
        answer: <p><b>Router:</b> reads a packet&apos;s destination and forwards it between networks using routing information; may choose an efficient route. <b>Switch:</b> connects LAN devices and forwards a frame/packet towards its destination. <b>WAP:</b> lets wireless devices join a wired LAN using Wi-Fi/radio. <b>Bridge:</b> connects two LAN segments using the same protocol. Award up to three linked router points and one for each other device, to the question maximum. <em>[6]</em></p>,
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
      time: "3 min",
      focus: "Start Chapter 2 with the human purpose of a network before naming devices.",
      prompt: "Ask what becomes possible when four isolated computers are connected.",
      source: "Coursebook Chapter 2 opening and Section 2.01, printed pp.26-28; syllabus 2.1 p.16.",
      content: (
        <Slide number="01" eyebrow="CHAPTER 2 · COMMUNICATION" sourceLabel="TEXTBOOK CH.2 · pp.26-28" syllabusLabel="SYLLABUS 2.1 · p.16" className="slide--l7-title">
          <section className="l7-title-grid">
            <div><span>LESSON 07 · 90 MINUTES</span><h1>Networks:<br /><em>Connect with purpose</em></h1><p>Compare scale and models, trace packet paths, then give each device a job.</p></div>
            <div className="l7-hero-network" role="img" aria-label="Four computers connected through a central network device"><i /><i /><i /><i /><b>LAN</b><span>share · communicate · manage</span></div>
          </section>
        </Slide>
      ),
    },
    {
      time: "4 min",
      focus: "Make the lesson boundary explicit so the first communication lesson remains teachable in 90 minutes.",
      prompt: "Students read the green syllabus route and name what will be deferred.",
      source: "Syllabus 2.1 p.16; Coursebook printed pp.27-38, with this lesson stopping before detailed media and internet content.",
      content: (
        <Slide number="02" eyebrow="TEXTBOOK × SYLLABUS" sourceLabel="TEXTBOOK 2.01-2.04" syllabusLabel="SYLLABUS 2.1 · p.16" title="Today: network purpose, models, topologies and LAN hardware." className="slide--l7-map">
          <section className="l7-route-grid"><article><b>1</b><span>PURPOSE</span><p>benefits · LAN · WAN</p></article><article><b>2</b><span>MODELS</span><p>client-server · peer-to-peer · thin · thick</p></article><article><b>3</b><span>STRUCTURE</span><p>bus · star · mesh · hybrid</p></article><article><b>4</b><span>HARDWARE</span><p>LAN devices · router</p></article></section>
          <p className="l7-defer"><Mark>DEFER TO LESSON 08</Mark><span>cloud · wired vs wireless and media · Ethernet · streaming · WWW/internet hardware · IP · URL/DNS</span></p>
        </Slide>
      ),
    },
    {
      time: "5 min",
      focus: "Link each network benefit to a concrete organisational action.",
      prompt: "For every benefit, ask: what is shared or managed, and who gains?",
      source: "Coursebook Section 2.01 printed pp.27-28; syllabus 2.1 purpose and benefits.",
      content: (
        <Slide number="03" eyebrow="WHY NETWORK DEVICES?" sourceLabel="TEXTBOOK 2.01 · pp.27-28" syllabusLabel="SYLLABUS 2.1 — PURPOSE & BENEFITS" title="A network turns isolated devices into shared services." className="slide--l7-benefits">
          <section className="l7-benefit-grid"><article><span>DATA</span><b>share files</b><p>authorised users access common work</p></article><article><span>HARDWARE</span><b>share resources</b><p>printers and storage serve many users</p></article><article><span>PEOPLE</span><b>communicate</b><p>messages move electronically</p></article><article><span>CONTROL</span><b>manage centrally</b><p>accounts, security and backups</p></article></section>
          <p className="l7-takeaway">Exam answers score when the shared item or central task is named — not just “it is easier”.</p>
        </Slide>
      ),
    },
    {
      time: "6 min",
      focus: "Separate geographical scope from infrastructure ownership and avoid treating the internet as the definition of a WAN.",
      prompt: "Classify a school building, a multi-site bank and two branches in different cities.",
      source: "Coursebook Section 2.01 printed pp.27-28; syllabus 2.1 LAN/WAN characteristics.",
      content: (
        <Slide number="04" eyebrow="LAN OR WAN?" sourceLabel="TEXTBOOK 2.01 · pp.27-28" syllabusLabel="SYLLABUS 2.1 — LAN / WAN" title="Compare area, ownership and purpose — not just speed." className="slide--l7-lan-wan">
          <section className="l7-compare"><article><span>LAN</span><h3>Local Area Network</h3><ul><li>small area: room, building or site</li><li>infrastructure normally privately owned</li><li>connects local end-systems and servers</li></ul></article><article><span>WAN</span><h3>Wide Area Network</h3><ul><li>large geographical area</li><li>connects sites or branches</li><li>often uses leased/public carrier links</li></ul></article></section>
          <p className="l7-warning"><b>Do not say:</b> “a WAN is the internet.” The internet is one global network of networks; a company can operate its own WAN.</p>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Teach client-server as roles in a request-response relationship, not as fixed machine sizes.",
      prompt: "Trace login → request → processing/data → response.",
      source: "Coursebook Section 2.01 printed pp.28-29; syllabus 2.1 network models.",
      content: (
        <Slide number="05" eyebrow="CLIENT-SERVER MODEL" sourceLabel="TEXTBOOK 2.01 · pp.28-29" syllabusLabel="SYLLABUS 2.1 — CLIENT-SERVER" title="Clients request a service; a server provides and controls it." className="slide--l7-client-server">
          <section className="l7-request-flow"><article><span>CLIENT</span><b>request</b><p>login · file · page · database query</p></article><i>→</i><article><span>SERVER</span><b>process &amp; manage</b><p>authenticate · store · apply access rules</p></article><i>→</i><article><span>CLIENT</span><b>receive</b><p>result, data or service output</p></article></section>
          <div className="l7-model-points"><p><b>Strength:</b> central control, security and backup</p><p><b>Cost:</b> specialist hardware/admin and server dependence</p></div>
        </Slide>
      ),
    },
    {
      time: "6 min",
      focus: "Make the dual role of a peer explicit and contrast distributed control with central management.",
      prompt: "Ask which computer is the server in peer-to-peer; the answer is role-dependent.",
      source: "Coursebook p.29 file-sharing example; syllabus 2.1 peer-to-peer model.",
      content: (
        <Slide number="06" eyebrow="PEER-TO-PEER MODEL" sourceLabel="TEXTBOOK p.29 · FILE SHARING" syllabusLabel="SYLLABUS 2.1 — PEER-TO-PEER" title="Each peer may request and provide resources directly." className="slide--l7-p2p">
          <section className="l7-peer-grid" role="img" aria-label="Three peers directly exchanging data"><article><b>PEER A</b><span>requests B</span></article><article><b>PEER B</b><span>serves A · requests C</span></article><article><b>PEER C</b><span>serves B</span></article></section>
          <div className="l7-model-points"><p><b>Strength:</b> low setup cost and no dedicated server</p><p><b>Cost:</b> weaker central security, backup and version control</p></div>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Turn memorised advantages into scenario-linked model choices.",
      prompt: "Students justify one model for a hospital and the other for three friends sharing files at home.",
      source: "Syllabus 2.1: benefits, drawbacks and justification for a given situation; Coursebook pp.28-29.",
      content: (
        <Slide number="07" eyebrow="JUSTIFY A MODEL" sourceLabel="TEXTBOOK pp.28-29" syllabusLabel="SYLLABUS 2.1 — JUSTIFY A MODEL" title="Choose from the requirement, then link a feature to its effect." className="slide--l7-model-choice">
          <section className="l7-scenario-grid"><article><span>HOSPITAL RECORDS</span><b>client-server</b><p>central authentication and permissions support confidential, consistent records</p></article><article><span>THREE HOME DEVICES</span><b>peer-to-peer</b><p>direct sharing is inexpensive and avoids a dedicated server</p></article></section>
          <div className="l7-answer-frame"><b>Exam frame</b><span>Use ___ because ___, which means ___ in this situation.</span></div>
        </Slide>
      ),
    },
    {
      time: "5 min",
      focus: "Distinguish where processing and software reside in thin and thick clients.",
      prompt: "Ask what happens to each client if the server or connection fails.",
      source: "Coursebook printed pp.28-29; syllabus 2.1 thin/thick clients.",
      content: (
        <Slide number="08" eyebrow="THIN OR THICK CLIENT?" sourceLabel="TEXTBOOK pp.28-29" syllabusLabel="SYLLABUS 2.1 — THIN / THICK" title="The difference is how much processing the client performs." className="slide--l7-thin-thick">
          <section className="l7-compare"><article><span>THIN CLIENT</span><h3>server does most processing</h3><ul><li>client mainly sends input and displays output</li><li>easy central updates; dependent on server/network</li></ul></article><article><span>THICK CLIENT</span><h3>client does substantial processing</h3><ul><li>software/resources are installed or downloaded locally</li><li>can work more independently; harder to manage</li></ul></article></section>
          <p className="l7-takeaway">Thin/thick describes a <b>software-processing role</b>, not the physical thickness of a computer.</p>
        </Slide>
      ),
    },
    {
      time: "4 min",
      focus: "Give a visual overview of only the four topologies named in the current syllabus.",
      prompt: "Students identify the common link, central device and multiple-route layouts.",
      source: "Coursebook Section 2.02 printed pp.29-32; syllabus 2.1 specified topologies.",
      content: (
        <Slide number="09" eyebrow="TOPOLOGY = CONNECTION LAYOUT" sourceLabel="TEXTBOOK 2.02 · pp.29-32" syllabusLabel="SYLLABUS 2.1 — TOPOLOGIES" title="Four required structures; four different packet paths." className="slide--l7-topologies">
          <section className="l7-topology-grid"><Topology kind="bus" label="BUS" /><Topology kind="star" label="STAR" /><Topology kind="mesh" label="MESH" /><Topology kind="hybrid" label="HYBRID" /></section>
          <p className="l7-warning"><b>Syllabus boundary:</b> bus, star, mesh and hybrid are specified. Ring topology is not a core 2027–2029 requirement.</p>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Trace a packet path through bus and star, then connect the path to failure and collision behaviour.",
      prompt: "Use A to D: ask which links carry the packet in each topology.",
      source: "Coursebook Section 2.02 printed pp.30-31; syllabus packet transmission between hosts.",
      content: (
        <Slide number="10" eyebrow="PACKET PATHS · BUS vs STAR" sourceLabel="TEXTBOOK 2.02 · pp.30-31" syllabusLabel="SYLLABUS 2.1 — PACKET PATHS" title="Shared backbone or dedicated links through a centre?" className="slide--l7-paths">
          <section className="l7-path-grid"><article><Topology kind="bus" label="BUS: A → D" /><p>Signal travels along the shared backbone; devices inspect the destination and only D accepts it.</p></article><article><Topology kind="star" label="STAR: A → SWITCH → D" /><p>A sends to the central switch; it forwards on D&apos;s dedicated link.</p></article></section>
          <p className="l7-takeaway">In this switch-based example, traffic uses the required links; the central switch remains a single point of failure.</p>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Explain alternate mesh routes and hybrid composition without inventing a new fifth topology.",
      prompt: "Block one link and ask students to point to an alternate mesh route.",
      source: "Coursebook Section 2.02 printed pp.30-32; syllabus mesh and hybrid topologies.",
      content: (
        <Slide number="11" eyebrow="PACKET PATHS · MESH & HYBRID" sourceLabel="TEXTBOOK 2.02 · pp.30-32" syllabusLabel="SYLLABUS 2.1 — MESH / HYBRID" title="Resilience comes from routes; flexibility comes from combining structures." className="slide--l7-mesh-hybrid">
          <section className="l7-path-grid"><article><Topology kind="mesh" label="MESH" /><p>Packets may travel directly or via intermediate nodes; another route can be chosen after a link fails.</p></article><article><Topology kind="hybrid" label="HYBRID" /><p>Two or more topology types are connected, often using bridges or routers between segments.</p></article></section>
          <div className="l7-model-points"><p><b>Mesh trade-off:</b> resilience ↔ more links/cost</p><p><b>Hybrid trade-off:</b> flexibility ↔ complexity</p></div>
        </Slide>
      ),
    },
    {
      time: "6 min",
      focus: "Use an authentic Paper 1 combination to make description and comparison marks visible.",
      prompt: "Give four minutes closed-book, then reveal and self-mark one point per distinct idea.",
      source: "Adapted from 9618/13 May/June 2023 Question 2(b)-(c), verified against the published mark scheme.",
      content: (
        <Slide number="12" eyebrow="PAST PAPER PRACTICE · 6 MARKS" sourceLabel="9618/13 M/J 2023 · Q2(b-c)" syllabusLabel="SYLLABUS 2.1 — EXAM PRACTICE" title="Mesh topology and thin clients — adapted, with the original mark allocation." className="slide--l7-paper">
          <section className="l7-paper-question"><p><b>(a)</b> Describe a mesh topology. <strong>[2]</strong></p><p><b>(b)</b> Give two advantages over bus. <strong>[2]</strong></p><p><b>(c)</b> Describe the roles of a thin client and server. <strong>[2]</strong></p></section>
          <Reveal id="paper-model" visible={revealed.has("paper-model")} onToggle={toggleReveal}><p><b>(a)</b> Multiple links/routes; nodes may relay packets. <b>(b)</b> Alternative route after failure; fewer collisions / safer dedicated links / add nodes with less disruption. <b>(c)</b> Server performs processing and/or stores data; thin client sends requests and displays results.</p></Reveal>
          <p className="l7-citation">Adapted from 9618/13 M/J 2023 Q2(b)-(c); concise wording replaces the original university scenario.</p>
        </Slide>
      ),
    },
    {
      time: "8 min",
      focus: "Build a role map for the first half of the required LAN hardware list.",
      prompt: "Students match each device name to the exact verb that earns a mark.",
      source: "Coursebook Section 2.04 printed pp.35-36; syllabus 2.1 LAN hardware list.",
      content: (
        <Slide number="13" eyebrow="LAN HARDWARE · CORE DEVICES" sourceLabel="TEXTBOOK 2.04 · pp.35-36" syllabusLabel="SYLLABUS 2.1 — LAN HARDWARE" title="Name the device, then use a precise action verb." className="slide--l7-hardware">
          <section className="l7-hardware-grid"><article><span>SERVER</span><b>provides</b><p>managed services, data or applications</p></article><article><span>SWITCH</span><b>forwards</b><p>traffic to the correct LAN port/device</p></article><article><span>NIC</span><b>connects &amp; identifies</b><p>a device on a wired network</p></article><article><span>WNIC</span><b>connects wirelessly</b><p>a device using radio/Wi-Fi</p></article></section>
          <p className="l7-warning"><b>Careful:</b> a switch connects devices within a LAN. A router connects different networks.</p>
        </Slide>
      ),
    },
    {
      time: "8 min",
      focus: "Complete the required device list and keep router explanation at the current syllabus depth.",
      prompt: "Read a role; students hold up the matching device name.",
      source: "Coursebook printed pp.35-38; syllabus 2.1 LAN hardware and router function.",
      content: (
        <Slide number="14" eyebrow="LAN HARDWARE · EXTEND & CONNECT" sourceLabel="TEXTBOOK pp.35-38" syllabusLabel="SYLLABUS 2.1 — HARDWARE / ROUTER" title="Join devices, extend segments, then cross a network boundary." className="slide--l7-hardware-more">
          <section className="l7-device-ladder"><article><span>CABLE</span><p>physical transmission link</p></article><article><span>WAP</span><p>connects wireless devices to a wired LAN</p></article><article><span>REPEATER</span><p>regenerates a weakened signal</p></article><article><span>BRIDGE</span><p>joins LAN segments using the same protocol</p></article><article><span>ROUTER</span><p>reads destination information and forwards packets between networks</p></article></section>
          <p className="l7-defer"><Mark>LESSON 08</Mark><span>How IP addressing and internet routing support that router decision.</span></p>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Finish with a second authentic paper anchor focused on hardware and topology choice.",
      prompt: "Students answer individually for five minutes; reveal a compact published-mark-scheme version.",
      source: "Adapted from 9618/11 October/November 2023 Question 2(a), 2(b) and 2(d), verified against the mark scheme.",
      content: (
        <Slide number="15" eyebrow="PAST PAPER EXIT · 7 MARKS" sourceLabel="9618/11 O/N 2023 · Q2" syllabusLabel="SYLLABUS 2.1 — EXAM PRACTICE" title="A school LAN: router, switch, WAP and star topology." className="slide--l7-exit">
          <section className="l7-exit-question"><p><b>1</b> Describe three router functions. <strong>[3]</strong></p><p><b>2</b> State one purpose each of a switch and WAP. <strong>[2]</strong></p><p><b>3</b> Explain one advantage of star over bus. <strong>[2]</strong></p></section>
          <Reveal id="paper-hardware" visible={revealed.has("paper-hardware")} onToggle={toggleReveal}><p><b>Router:</b> receives/analyses destination data, uses routing information, and forwards towards the destination or chooses a route. <b>Switch:</b> connects LAN devices and forwards to the destination. <b>WAP:</b> lets wireless devices join the wired LAN. <b>Star:</b> it is more resilient because one cable failure normally isolates only one computer; alternatively, dedicated links to the switch reduce collisions or make expansion/fault-finding easier.</p></Reveal>
          <div className="l7-homework-callout"><b>HOMEWORK 07</b><span>30 marks · inline answers · monochrome print layout</span><strong>USE HOMEWORK TAB ↑</strong></div>
        </Slide>
      ),
    },
  ];

  const homework = (
    <HomeworkSheet
      lessonNumber="07"
      title="Network Purpose, Models, Topologies & LAN Hardware"
      marks={30}
      minutes={45}
      syllabusLabel="SYLLABUS 2.1 · p.16"
      sourceLabel="TEXTBOOK CH.2 · pp.27-38 + PAPER 1"
      instructions="Use the exact device or model name in every answer. When asked to justify, link a network feature to the stated situation. Past-paper prompts are concise adaptations; the original session, paper and question are cited beside them."
      sections={homeworkSections}
      challenge={{
        id: "l7-challenge",
        prompt: <p><Mark>CHALLENGE</Mark> Design a network for a two-building school. State a model, one topology in each building, the device between networks, and one linked reason for each choice.</p>,
        answer: <p>One valid design: <strong>client-server</strong> for central accounts and backups; <strong>star</strong> in each building for isolated link faults and easy expansion; a <strong>router</strong> between the networks to forward packets. Other well-justified syllabus choices can earn credit.</p>,
      }}
    />
  );

  return (
    <LessonShell
      lessonNumber="07"
      slides={slides}
      homework={homework}
      lessonLinks={[
        { label: "01", href: "../" },
        { label: "02", href: "../lesson-02/" },
        { label: "03", href: "../lesson-03/" },
        { label: "04", href: "../lesson-04/" },
        { label: "05", href: "../lesson-05/" },
        { label: "06", href: "../lesson-06/" },
        { label: "07", href: "../lesson-07/", active: true },
      ]}
      courseMapHref="../?view=roadmap"
      sourceSummary="Checked against syllabus 2.1 p.16, Coursebook Chapter 2 printed pp.26-38, and published 2023-2024 AS Paper 1 questions and mark schemes."
      sourceDetail="Core boundary: network purpose and benefits; LAN/WAN; client-server, peer-to-peer, thin and thick clients; bus, star, mesh and hybrid packet paths; LAN hardware and router role. Authentic anchors: 9618/13 M/J 2023 Q2(b)-(c), 9618/12 M/J 2023 Q1(a)-(c),(e), 9618/11 O/N 2023 Q2(a),(b),(d), and 9618/13 M/J 2024 Q5(b). Questions are concise adaptations with original references, not reproductions of complete papers. Cloud, wired/wireless implications and media, Ethernet/CSMA-CD, streaming, WWW/internet hardware, IP addressing, URL and DNS are deferred to Lesson 08."
    />
  );
}
