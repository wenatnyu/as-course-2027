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
  const panelId = `l8-reveal-${id}`;
  return (
    <div className="l8-reveal">
      <button type="button" onClick={() => onToggle(id)} aria-expanded={visible} aria-controls={panelId}>
        {visible ? "Hide mark scheme" : "Reveal mark scheme"}
      </button>
      <div id={panelId} className={visible ? "l8-reveal-panel l8-visible" : "l8-reveal-panel"} hidden={!visible}>
        {children}
      </div>
    </div>
  );
}

const homeworkSections: HomeworkSection[] = [
  {
    code: "A",
    title: "Cloud computing",
    subtitle: "Define the model, then link benefits and risks to the user",
    marks: 10,
    questions: [
      {
        id: "l8-1",
        marks: 6,
        lines: 4,
        prompt: <><b>Distinguish a public cloud from a private cloud.</b><p>Give two defining features and one suitable user for each model.</p></>,
        answer: <p>A <strong>public cloud</strong> is owned/managed by a third-party provider and its infrastructure is shared between customers; it may suit an individual or small company. A <strong>private cloud</strong> is dedicated to one organisation and may be managed internally or by a provider; it may suit an organisation needing greater control. <em>[2 features + 1 valid use for each model]</em></p>,
      },
      {
        id: "l8-2",
        marks: 4,
        lines: 4,
        prompt: <><Mark>PAST PAPER PRACTICE</Mark><p><b>State two advantages and two disadvantages of cloud storage for a student.</b></p><p>Adapted from 9618/12 O/N 2025 Q8(a)(i)-(ii). [4]</p></>,
        answer: <p><b>Advantages:</b> access from any internet-connected computer; provider backup/recovery; easy sharing/collaboration; scalable capacity; little/no personal storage hardware. <b>Disadvantages:</b> dependence on network/provider; slow transfer; downtime; security/privacy risk; migration/compatibility issues; limited free space or long-term cost. Award any two distinct points in each category. <em>[2 + 2]</em></p>,
      },
    ],
  },
  {
    code: "B",
    title: "Transmission media",
    subtitle: "Compare the signal, performance and physical constraint",
    marks: 10,
    questions: [
      {
        id: "l8-3",
        marks: 4,
        lines: 4,
        prompt: <><b>Compare copper cable with fibre-optic cable.</b><p>Include bandwidth, interference and cost.</p></>,
        answer: <p>Fibre normally offers <strong>higher bandwidth</strong>, lower attenuation over long distances and immunity to electromagnetic interference. Copper is normally <strong>cheaper and easier to install</strong>, but has lower bandwidth and is more affected by interference and signal loss. Award four distinct comparative points. <em>[4]</em></p>,
      },
      {
        id: "l8-4",
        marks: 3,
        lines: 4,
        prompt: <><b>Describe one suitable use of each medium:</b><p>(a) Wi-Fi radio waves &nbsp; (b) terrestrial microwave &nbsp; (c) satellite</p></>,
        answer: <p><b>Wi-Fi:</b> mobile access inside a home, school or office. <b>Microwave:</b> a high-capacity line-of-sight link between towers/buildings. <b>Satellite:</b> communication with remote or very widely separated locations where cable is impractical. <em>[1 each]</em></p>,
      },
      {
        id: "l8-5",
        marks: 3,
        lines: 4,
        prompt: <><b>A hospital links two buildings and must protect confidential, high-volume data.</b><p>Choose a medium and justify it with two linked reasons.</p></>,
        answer: <p><strong>Fibre-optic cable</strong> is suitable because its high bandwidth supports large data transfers and it is not affected by electromagnetic interference. A wired point-to-point route is also harder to intercept casually than an unguided wireless signal. <em>[1 choice; 2 linked reasons]</em></p>,
      },
    ],
  },
  {
    code: "C",
    title: "Authentic Paper 1 application",
    subtitle: "Use named media and situation-linked implications",
    marks: 10,
    questions: [
      {
        id: "l8-6",
        marks: 4,
        lines: 4,
        prompt: <><Mark>PAST PAPER PRACTICE</Mark><p><b>Other than copper cable, identify and describe two media that may transmit data across a WAN.</b></p><p>Adapted from 9618/13 O/N 2024 Q9(b). [4]</p></>,
        answer: <p>Any two matched pairs from the published scheme: <strong>fibre-optic cable</strong> transmits pulses of light; <strong>radio waves</strong> or <strong>microwaves</strong> are electromagnetic waves transmitted at particular frequencies. <em>[1 medium + 1 matching description each]</em></p>,
      },
      {
        id: "l8-7",
        marks: 4,
        lines: 5,
        prompt: <><Mark>PAST PAPER PRACTICE</Mark><p><b>Give three advantages of wireless over wired communication and one disadvantage.</b></p><p>Adapted from 9618/13 O/N 2025 Q4(a)-(b). [4]</p></>,
        answer: <p><b>Advantages:</b> mobility/no physical connection, no cabling/easier setup, easy addition of devices, or support for different portable device types. <b>Disadvantage:</b> less secure, slower, subject to interference, or signal strength degrades with distance/obstacles. <em>[3 + 1]</em></p>,
      },
      {
        id: "l8-8",
        marks: 2,
        lines: 3,
        prompt: <><b>State two factors, other than cost, used to select a transmission medium.</b></>,
        answer: <p>Any two: required bandwidth/data rate, distance and attenuation, susceptibility to interference, security, mobility, line-of-sight, terrain/installation constraints, reliability or latency. <em>[1 each]</em></p>,
      },
    ],
  },
];

export default function Lesson08Client() {
  const [revealed, setRevealed] = useState<Set<string>>(() => new Set());
  const toggleReveal = (id: string) => setRevealed((current) => {
    const next = new Set(current);
    if (next.has(id)) next.delete(id); else next.add(id);
    return next;
  });

  const slides: SlideData[] = [
    {
      time: "3 min",
      focus: "Frame every connection as a choice between control, mobility and performance.",
      prompt: "Ask students what must cross the gap: electrical signal, light or electromagnetic wave?",
      source: "Coursebook Section 2.03 printed pp.32-35 and cloud subsection p.39; syllabus 2.1 p.16.",
      content: (
        <Slide number="01" eyebrow="CHAPTER 2 · COMMUNICATION" sourceLabel="TEXTBOOK 2.03 + p.39" syllabusLabel="SYLLABUS 2.1 · p.16" className="l8-slide l8-title">
          <section className="l8-title-grid"><div><span>LESSON 08 · 90 MINUTES</span><h1>Connect<br /><em>through the right medium</em></h1><p>Place services in a cloud, then choose how the data should travel.</p></div><div className="l8-signal-hero" role="img" aria-label="Electrical, light and radio signals connecting users to a cloud"><b>USER</b><i /><strong>CLOUD</strong><i /><b>USER</b><span>copper · light · radio</span></div></section>
        </Slide>
      ),
    },
    {
      time: "4 min",
      focus: "Make the current syllabus boundary visible before teaching details.",
      prompt: "Students identify the two decisions made today: where a service runs and how its data travels.",
      source: "2027-2029 syllabus Section 2.1 p.16.",
      content: (
        <Slide number="02" eyebrow="TEXTBOOK × SYLLABUS" sourceLabel="TEXTBOOK pp.32-35, 39" syllabusLabel="SYLLABUS 2.1 · p.16" title="Two connected questions: where is the service, and what carries its data?" className="l8-slide l8-map">
          <section className="l8-route"><article><span>01</span><b>CLOUD MODEL</b><p>public · private · benefits · drawbacks</p></article><article><span>02</span><b>NETWORK TYPE</b><p>wired · wireless · implications</p></article><article><span>03</span><b>MEDIUM</b><p>copper · fibre · radio · microwave · satellite</p></article></section>
          <p className="l8-boundary"><Mark>DEFER TO LESSONS 09–10</Mark><span>Ethernet · streaming · internet infrastructure · IP · URL · DNS</span></p>
        </Slide>
      ),
    },
    {
      time: "5 min",
      focus: "Retrieve the difference between a network device and the medium that connects it.",
      prompt: "Students classify cable, WAP, radio wave, router and fibre as device or medium.",
      source: "Coursebook Sections 2.03-2.04 printed pp.32-36; Lesson 07 retrieval.",
      content: (
        <Slide number="03" eyebrow="DO NOW · RETRIEVAL" sourceLabel="TEXTBOOK pp.32-36" syllabusLabel="SYLLABUS 2.1 — MEDIA" title="Device or medium? Name the job before the object." className="l8-slide l8-retrieval">
          <section className="l8-sort"><article><b>CABLE</b><span>?</span></article><article><b>WAP</b><span>?</span></article><article><b>RADIO WAVE</b><span>?</span></article><article><b>ROUTER</b><span>?</span></article><article><b>FIBRE</b><span>?</span></article></section>
          <Reveal id="sort" visible={revealed.has("sort")} onToggle={toggleReveal}><p><strong>Media:</strong> cable, radio wave and fibre. <strong>Devices:</strong> WAP and router. A medium carries the signal; a device connects, processes or forwards.</p></Reveal>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Define cloud computing as remote provision of computing services, not weather or a single storage box.",
      prompt: "Ask which resources besides storage may be provided through a cloud.",
      source: "Coursebook cloud computing subsection printed p.39; syllabus 2.1 cloud computing.",
      content: (
        <Slide number="04" eyebrow="WHAT IS CLOUD COMPUTING?" sourceLabel="TEXTBOOK p.39" syllabusLabel="SYLLABUS 2.1 — CLOUD" title="Computing resources are provided remotely, usually through the internet." className="l8-slide l8-cloud-definition">
          <section className="l8-cloud-flow"><article><span>LOCAL DEVICE</span><b>request</b><p>browser or client</p></article><i>→</i><article><span>REMOTE SYSTEM</span><b>provide</b><p>storage · software · processing</p></article><i>→</i><article><span>LOCAL DEVICE</span><b>receive</b><p>service or result</p></article></section>
          <p className="l8-takeaway"><b>Cloud</b> describes service delivery and resource location. It does not mean the data has no physical server.</p>
        </Slide>
      ),
    },
    {
      time: "6 min",
      focus: "Separate ownership, exclusivity and location in public and private clouds.",
      prompt: "Classify a shared provider service and a dedicated company-only service.",
      source: "Coursebook printed p.39; syllabus 2.1 public and private clouds.",
      content: (
        <Slide number="05" eyebrow="PUBLIC OR PRIVATE?" sourceLabel="TEXTBOOK p.39" syllabusLabel="SYLLABUS 2.1 — CLOUD TYPES" title="The key distinction is who the infrastructure serves." className="l8-slide l8-cloud-types">
          <section className="l8-compare"><article><span>PUBLIC CLOUD</span><h3>shared provider infrastructure</h3><ul><li>owned and managed by a third party</li><li>services sold to many customers</li><li>fast to scale; less direct control</li></ul></article><article><span>PRIVATE CLOUD</span><h3>dedicated to one organisation</h3><ul><li>may be on-site or provider-hosted</li><li>greater configuration and policy control</li><li>higher management cost or responsibility</li></ul></article></section>
          <p className="l8-warning">Public does <b>not</b> mean that anyone may read the customer&apos;s data.</p>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Build linked benefit and drawback chains rather than isolated buzzwords.",
      prompt: "For each card, students add the consequence for a school or company.",
      source: "Coursebook pp.39-40; syllabus 2.1 benefits and drawbacks of cloud computing.",
      content: (
        <Slide number="06" eyebrow="CLOUD TRADE-OFFS" sourceLabel="TEXTBOOK pp.39-40" syllabusLabel="SYLLABUS 2.1 — BENEFITS / DRAWBACKS" title="Every cloud benefit moves some responsibility elsewhere." className="l8-slide l8-tradeoffs">
          <section className="l8-trade-grid"><article><span>ACCESS</span><b>many locations/devices</b><p>but service depends on network availability</p></article><article><span>SCALE</span><b>increase capacity quickly</b><p>but recurring fees and provider lock-in may grow</p></article><article><span>MANAGEMENT</span><b>provider maintains systems</b><p>but the customer gives up some control</p></article><article><span>RESILIENCE</span><b>provider can replicate/backup</b><p>but outage or breach affects remote access</p></article></section>
          <div className="l8-answer-frame"><b>Exam frame</b><span>Feature → direct consequence → why it matters here.</span></div>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Use a verified authentic question to distinguish private-cloud definition from comparative benefit.",
      prompt: "Give four minutes closed-book, then reveal and self-mark one distinct point per mark.",
      source: "Adapted from 9618/13 May/June 2024 Question 5(a)(i)-(ii), verified against the published mark scheme.",
      content: (
        <Slide number="07" eyebrow="PAST PAPER PRACTICE · 4 MARKS" sourceLabel="9618/13 M/J 2024 · Q5(a)" syllabusLabel="SYLLABUS 2.1 — CLOUD" title="Private cloud: define it, then compare it with public cloud." className="l8-slide l8-paper">
          <section className="l8-paper-question"><p><b>(a)</b> Define <em>private cloud</em>. <strong>[1]</strong></p><p><b>(b)</b> Describe three benefits to a multimedia company of private rather than public cloud storage. <strong>[3]</strong></p></section>
          <Reveal id="cloud-paper" visible={revealed.has("cloud-paper")} onToggle={toggleReveal}><p><b>(a)</b> Dedicated/bespoke remote services or storage available only to the company. <b>(b)</b> Any three: less reliance on a third party; greater control of security/privacy; greater control of backup; capacity/configuration tailored or scaled to company needs.</p></Reveal>
          <p className="l8-citation">Concise adaptation of 9618/13 M/J 2024 Q5(a)(i)-(ii), with the original 1 + 3 mark allocation.</p>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Require a model choice that is driven by an organisation's constraints.",
      prompt: "Pairs choose a model for each scenario and write one linked reason.",
      source: "Syllabus 2.1 public/private clouds and justified benefits/drawbacks; Coursebook p.39.",
      content: (
        <Slide number="08" eyebrow="CLOUD DECISION LAB" sourceLabel="TEXTBOOK p.39" syllabusLabel="SYLLABUS 2.1 — APPLY" title="Choose from the requirement, not from a memorised favourite." className="l8-slide l8-scenarios">
          <section className="l8-scenario-grid"><article><span>START-UP</span><b>traffic changes each week</b><p>small technical team · global customers</p><Reveal id="startup" visible={revealed.has("startup")} onToggle={toggleReveal}><p><strong>Public:</strong> rapid scaling and provider management reduce initial infrastructure work.</p></Reveal></article><article><span>HEALTH SERVICE</span><b>sensitive patient records</b><p>strict control · specialist IT team</p><Reveal id="health" visible={revealed.has("health")} onToggle={toggleReveal}><p><strong>Private:</strong> dedicated infrastructure gives the organisation greater policy and access control.</p></Reveal></article></section>
          <p className="l8-warning">A model choice never removes the need for encryption, authentication, backup and access control.</p>
        </Slide>
      ),
    },
    {
      time: "6 min",
      focus: "Introduce a reusable set of criteria for every transmission-medium decision.",
      prompt: "Students rank the five criteria for a rural clinic and a gaming room.",
      source: "Coursebook Section 2.03 printed pp.32-35; syllabus wired/wireless implications.",
      content: (
        <Slide number="09" eyebrow="CHOOSE A MEDIUM" sourceLabel="TEXTBOOK 2.03 · pp.32-35" syllabusLabel="SYLLABUS 2.1 — MEDIA" title="The best medium depends on what the connection must achieve." className="l8-slide l8-criteria">
          <section className="l8-criteria-row"><article><b>BANDWIDTH</b><span>data per second</span></article><article><b>DISTANCE</b><span>attenuation</span></article><article><b>INTERFERENCE</b><span>signal quality</span></article><article><b>MOBILITY</b><span>movement/access</span></article><article><b>CONSTRAINT</b><span>cost · terrain · security</span></article></section>
          <p className="l8-takeaway">Do not write “faster” alone. Name the property, then its consequence for the stated network.</p>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Explain how copper carries data and connect physical behaviour to advantages and limitations.",
      prompt: "Ask why twisting pairs and shielding can improve signal quality.",
      source: "Coursebook printed pp.32-33; syllabus copper cable characteristics.",
      content: (
        <Slide number="10" eyebrow="COPPER CABLE" sourceLabel="TEXTBOOK pp.32-33" syllabusLabel="SYLLABUS 2.1 — COPPER" title="Changing electrical signals carry bits through metal conductors." className="l8-slide l8-medium">
          <section className="l8-medium-layout"><div className="l8-copper-visual" role="img" aria-label="Two twisted copper conductors carrying an electrical signal"><i /><i /><i /><i /><span>electrical signal</span></div><article><span>STRENGTHS</span><ul><li>relatively inexpensive</li><li>easy to terminate and install</li><li>common for short LAN links</li></ul></article><article><span>LIMITS</span><ul><li>electromagnetic interference</li><li>attenuation over distance</li><li>lower bandwidth than fibre</li></ul></article></section>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Explain fibre as light transmission and make comparison language explicit.",
      prompt: "Students convert each physical feature into a network consequence.",
      source: "Coursebook printed pp.32-33; syllabus fibre-optic cable characteristics.",
      content: (
        <Slide number="11" eyebrow="FIBRE-OPTIC CABLE" sourceLabel="TEXTBOOK pp.32-33" syllabusLabel="SYLLABUS 2.1 — FIBRE" title="Pulses of light travel through a glass or plastic core." className="l8-slide l8-medium l8-fibre">
          <section className="l8-fibre-flow" role="img" aria-label="Pulses of light travelling along a fibre"><b>LIGHT</b><i /><i /><i /><i /><i /><strong>RECEIVER</strong></section>
          <section className="l8-property-grid"><article><b>HIGH BANDWIDTH</b><p>more data may be carried each second</p></article><article><b>LOW INTERFERENCE</b><p>electromagnetic fields do not alter light</p></article><article><b>LOWER ATTENUATION</b><p>long links need fewer repeaters</p></article><article><b>TRADE-OFF</b><p>equipment and installation can cost more</p></article></section>
        </Slide>
      ),
    },
    {
      time: "6 min",
      focus: "Differentiate radio/Wi-Fi and terrestrial microwave without treating all wireless links as identical.",
      prompt: "Ask which signal can support movement and which usually needs line-of-sight.",
      source: "Coursebook printed pp.33-34; syllabus radio waves including Wi-Fi and microwaves.",
      content: (
        <Slide number="12" eyebrow="WIRELESS: RADIO & MICROWAVE" sourceLabel="TEXTBOOK pp.33-34" syllabusLabel="SYLLABUS 2.1 — RADIO / MICROWAVE" title="Wireless removes the cable, not the engineering constraints." className="l8-slide l8-wireless">
          <section className="l8-wave-compare"><article><div className="l8-radio-rings"><i /><i /><i /></div><span>RADIO / WI-FI</span><b>local mobility</b><p>travels through air; range, obstacles, interference and shared access affect performance</p></article><article><div className="l8-microwave-beam"><i /></div><span>MICROWAVE</span><b>directed link</b><p>high-frequency electromagnetic waves; terrestrial links usually require line-of-sight</p></article></section>
          <p className="l8-warning">Wi-Fi is an IEEE 802.11 WLAN technology — not simply “Ethernet without a wire”.</p>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Model satellite as a microwave relay and link distance to coverage and latency.",
      prompt: "Students trace uplink → satellite → downlink and identify where delay is introduced.",
      source: "Coursebook printed p.35; syllabus satellite characteristics.",
      content: (
        <Slide number="13" eyebrow="SATELLITE LINKS" sourceLabel="TEXTBOOK p.35" syllabusLabel="SYLLABUS 2.1 — SATELLITES" title="A satellite relays microwave signals across a very large area." className="l8-slide l8-satellite">
          <section className="l8-orbit" role="img" aria-label="Ground station uplink to satellite and downlink to a remote receiver"><article><b>GROUND A</b><span>uplink</span></article><i className="l8-uplink" /><strong>SATELLITE</strong><i className="l8-downlink" /><article><b>GROUND B</b><span>downlink</span></article></section>
          <section className="l8-sat-points"><p><b>Benefit:</b> wide coverage and access where cable is impractical.</p><p><b>Drawback:</b> long signal path creates latency; weather/interference and capacity may matter.</p></section>
        </Slide>
      ),
    },
    {
      time: "6 min",
      focus: "Synthesize wired/wireless implications in one decision matrix.",
      prompt: "Students complete the final column for one school scenario.",
      source: "Coursebook pp.32-35; syllabus 2.1 wired and wireless implications.",
      content: (
        <Slide number="14" eyebrow="WIRED vs WIRELESS" sourceLabel="TEXTBOOK pp.32-35" syllabusLabel="SYLLABUS 2.1 — IMPLICATIONS" title="Compare reliability and mobility — then connect both to the user." className="l8-slide l8-matrix">
          <section className="l8-decision-table"><div><b>NEED</b><b>WIRED</b><b>WIRELESS</b></div><div><span>movement</span><p>fixed connection</p><p>portable access</p></div><div><span>interference</span><p>usually lower</p><p>often higher/shared</p></div><div><span>security surface</span><p>physical access needed</p><p>signal extends through air</p></div><div><span>installation</span><p>cable route required</p><p>fast to add mobile devices</p></div></section>
          <div className="l8-answer-frame"><b>Balanced conclusion</b><span>Many networks use both: wired backbone + wireless access.</span></div>
        </Slide>
      ),
    },
    {
      time: "5 min",
      focus: "Finish with an authentic medium-identification item and a concise self-mark.",
      prompt: "Students answer in two matched name-description pairs before revealing.",
      source: "Adapted from 9618/13 October/November 2024 Question 9(b), verified against the published mark scheme.",
      content: (
        <Slide number="15" eyebrow="PAST PAPER EXIT · 4 MARKS" sourceLabel="9618/13 O/N 2024 · Q9(b)" syllabusLabel="SYLLABUS 2.1 — MEDIA" title="Other than copper, name and describe two WAN transmission media." className="l8-slide l8-exit">
          <section className="l8-exit-prompt"><p><b>MEDIUM 1</b><span>name + how its signal carries data</span></p><p><b>MEDIUM 2</b><span>name + how its signal carries data</span></p></section>
          <Reveal id="media-exit" visible={revealed.has("media-exit")} onToggle={toggleReveal}><p>Examples: <strong>fibre optic</strong> — pulses of light; <strong>radio waves/microwaves</strong> — electromagnetic waves at selected frequencies. Award one mark for each valid medium and one for its matching description.</p></Reveal>
          <div className="l8-homework"><b>HOMEWORK 08</b><span>30 marks · 45 minutes · inline answers</span><strong>USE HOMEWORK TAB ↑</strong></div>
        </Slide>
      ),
    },
  ];

  const homework = (
    <HomeworkSheet
      lessonNumber="08"
      title="Cloud Computing, Wired/Wireless Networks & Transmission Media"
      marks={30}
      minutes={45}
      syllabusLabel="SYLLABUS 2.1 · p.16"
      sourceLabel="TEXTBOOK CH.2 · pp.32-35, 39-40 + PAPER 1"
      instructions="Use a named medium or cloud model in every answer. For each explanation, link one technical feature to its consequence in the stated situation. Past-paper prompts are concise adaptations with their original references and marks."
      sections={homeworkSections}
      challenge={{
        id: "l8-challenge",
        prompt: <p><Mark>CHALLENGE</Mark> Design a connection for a remote medical clinic. Choose a cloud model, one local medium and one long-distance medium; justify every choice.</p>,
        answer: <p>One valid design is a <strong>private cloud</strong> for greater control of patient data, <strong>Wi-Fi</strong> locally for mobile clinical devices, and a <strong>satellite link</strong> where terrestrial cable is unavailable. Fibre could replace satellite where installed because it offers high bandwidth and low latency. Credit any technically consistent, linked design.</p>,
      }}
    />
  );

  return (
    <LessonShell
      lessonNumber="08"
      slides={slides}
      homework={homework}
      courseMapHref="../?view=roadmap"
      sourceSummary="Checked against syllabus 2.1 p.16, Coursebook Chapter 2 printed pp.32-35 and 39-40, and published 2023-2025 AS Paper 1 questions and mark schemes."
      sourceDetail="Core boundary: public/private clouds and their trade-offs; wired/wireless implications; copper, fibre-optic, radio/Wi-Fi, microwave and satellite media. Authentic anchors: 9618/13 M/J 2024 Q5(a), 9618/12 O/N 2025 Q8(a), 9618/13 O/N 2025 Q4(a)-(b), and 9618/13 O/N 2024 Q9(b). Infrared and detailed satellite-orbit counts are enrichment, not core 2027-2029 outcomes. Ethernet, streaming and internet infrastructure follow in Lesson 09; IP, subnetting, URL and DNS follow in Lesson 10."
    />
  );
}
