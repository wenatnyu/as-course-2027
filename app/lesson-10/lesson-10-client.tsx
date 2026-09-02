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
  const panelId = `l10-reveal-${id}`;
  return (
    <div className="l10-reveal">
      <button type="button" onClick={() => onToggle(id)} aria-expanded={visible} aria-controls={panelId}>
        {visible ? "Hide mark scheme" : "Reveal mark scheme"}
      </button>
      <div id={panelId} className={visible ? "l10-reveal-panel l10-visible" : "l10-reveal-panel"} hidden={!visible}>
        {children}
      </div>
    </div>
  );
}

const homeworkSections: HomeworkSection[] = [
  {
    code: "A",
    title: "IP formats and association",
    subtitle: "Recognise the notation, then explain what the address identifies",
    marks: 10,
    questions: [
      {
        id: "l10-1",
        marks: 3,
        lines: 4,
        prompt: <><b>For each address, state IPv4, IPv6 or invalid and give one reason.</b><p>(a) 192.168.4.27 &nbsp; (b) 2001:db8::27 &nbsp; (c) 10.4.300.8</p></>,
        answer: <p><b>(a) IPv4:</b> four denary groups separated by full stops, each within 0–255. <b>(b) IPv6:</b> hexadecimal groups separated by colons; <code>::</code> compresses consecutive zero groups. <b>(c) Invalid IPv4:</b> 300 cannot fit in one 8-bit group. <em>[1 each]</em></p>,
      },
      {
        id: "l10-2",
        marks: 3,
        lines: 4,
        prompt: <><Mark>PAST PAPER PRACTICE</Mark><p><b>(a) State why a router uses a public IP address. [1]</b></p><p><b>(b) Give two IPv4/IPv6 differences other than the separator. [2]</b></p><p>Adapted from 9618/11 M/J 2024 Q8(b)(i)-(ii).</p></>,
        answer: <p><b>(a)</b> It makes the router visible/accessible to other devices on the internet. <b>(b)</b> Any two: IPv4 has 4 groups versus 8; IPv4 uses denary versus hexadecimal; group ranges are 0–255 versus 0–FFFF; total length is 32 versus 128 bits. <em>[1 + 2]</em></p>,
      },
      {
        id: "l10-3",
        marks: 4,
        lines: 4,
        prompt: <><b>Explain how IP addresses are associated with a laptop that changes from home Wi-Fi to mobile data.</b></>,
        answer: <p>An IP address is assigned to a <strong>network interface</strong> on the current network. The home router/provider assigns an address for Wi-Fi; after changing network, the mobile provider assigns another. A dynamic address may change when the interface reconnects. The laptop can also have different addresses on two active interfaces. <em>[4]</em></p>,
      },
    ],
  },
  {
    code: "B",
    title: "Subnetting",
    subtitle: "Split the address, contain traffic and explain the benefit",
    marks: 10,
    questions: [
      {
        id: "l10-4",
        marks: 3,
        lines: 4,
        prompt: <><b>An address in a subnet has a network ID and a host ID.</b><p>Identify the role of each part.</p></>,
        answer: <p>The <strong>network ID</strong> identifies the network/subnet and is shared by interfaces in it. The <strong>host ID</strong> uniquely identifies an interface within that subnet. Routers first use the network portion to direct traffic to the correct network. <em>[1 identification; 2 roles]</em></p>,
      },
      {
        id: "l10-5",
        marks: 4,
        lines: 5,
        prompt: <><Mark>PAST PAPER PRACTICE</Mark><p><b>Describe two benefits of subnetting a network.</b></p><p>Adapted from 9618/11 M/J 2023 Q4(d)(ii). [4]</p></>,
        answer: <p>Any two developed benefits: <strong>less traffic/better performance</strong> because local traffic stays within its subnet; <strong>greater security</strong> because access between segments can be restricted; <strong>easier maintenance</strong> because one subnet can be changed or taken down while others continue. <em>[1 benefit + 1 linked explanation each]</em></p>,
      },
      {
        id: "l10-6",
        marks: 3,
        lines: 4,
        prompt: <><b>In 192.168.12.44/24, explain what /24 means and identify the network and host portions.</b></>,
        answer: <p><code>/24</code> means the first <strong>24 bits</strong> are the network prefix. Therefore <code>192.168.12</code> is the network portion and the final 8-bit value <code>44</code> is the host portion for this interface. <em>[1 prefix length; 1 network; 1 host]</em></p>,
      },
    ],
  },
  {
    code: "C",
    title: "Address types, URL and DNS",
    subtitle: "Use the right identifier at the right stage",
    marks: 10,
    questions: [
      {
        id: "l10-7",
        marks: 4,
        lines: 4,
        prompt: <><Mark>PAST PAPER PRACTICE</Mark><p><b>Complete the four address-type descriptions: public, private, static and dynamic.</b></p><p>Adapted from 9618/12 O/N 2023 Q7(d). [4]</p></>,
        answer: <p><strong>Public:</strong> assigned for direct visibility/access on the internet. <strong>Private:</strong> used within an internal LAN and not routed directly on the public internet. <strong>Static:</strong> fixed/does not change when the device rejoins. <strong>Dynamic:</strong> may be refreshed or changed when the device reconnects. <em>[1 each]</em></p>,
      },
      {
        id: "l10-8",
        marks: 2,
        lines: 3,
        prompt: <><b>Identify the host name and path in this URL:</b><p><code>https://learn.example.org/course/unit1</code></p></>,
        answer: <p>The <strong>host name</strong> is <code>learn.example.org</code>. The <strong>path</strong> is <code>/course/unit1</code>. DNS uses the host name; the web server uses the path to select the resource. <em>[1 each]</em></p>,
      },
      {
        id: "l10-9",
        marks: 4,
        lines: 5,
        prompt: <><Mark>PAST PAPER PRACTICE</Mark><p><b>Explain how a browser uses a URL and DNS to access a resource on a web server.</b></p><p>Adapted from 9618/11 O/N 2025 Q7(c). [4]</p></>,
        answer: <p>Any four linked points: the browser checks its cache; parses the URL/extracts the domain; sends the domain to a DNS resolver; DNS returns the matching IP address; the browser connects to that IP/web server; requests the resource identified by the path; receives and renders it; caches the IP record. <em>[4]</em></p>,
      },
    ],
  },
];

export default function Lesson10Client() {
  const [revealed, setRevealed] = useState<Set<string>>(() => new Set());
  const toggleReveal = (id: string) => setRevealed((current) => {
    const next = new Set(current);
    if (next.has(id)) next.delete(id); else next.add(id);
    return next;
  });

  const slides: SlideData[] = [
    {
      time: "3 min",
      focus: "Frame naming and addressing as two different jobs: humans name resources; networks route to interfaces.",
      prompt: "Ask why a browser needs both a readable name and a numeric network address.",
      source: "Coursebook Sections 2.08-2.09 printed pp.41-47; syllabus 2.1 p.17.",
      content: (
        <Slide number="01" eyebrow="CHAPTER 2 · COMMUNICATION" sourceLabel="TEXTBOOK 2.08-2.09" syllabusLabel="SYLLABUS 2.1 · p.17" className="l10-slide l10-title">
          <section className="l10-title-grid"><div><span>LESSON 10 · 90 MINUTES</span><h1>Name it.<br /><em>Address it. Route it.</em></h1><p>Move from a human-readable URL to the IP information a network can use.</p></div><div className="l10-address-hero"><article><span>NAME</span><b>learn.example.org</b></article><i>DNS</i><article><span>ADDRESS</span><b>203.0.113.24</b></article></div></section>
        </Slide>
      ),
    },
    {
      time: "4 min",
      focus: "Expose every remaining Chapter 2 outcome and show that this lesson closes the chapter.",
      prompt: "Students group the outcomes into format, organisation, address type and lookup.",
      source: "2027-2029 syllabus Section 2.1 p.17.",
      content: (
        <Slide number="02" eyebrow="TEXTBOOK × SYLLABUS" sourceLabel="TEXTBOOK pp.41-47" syllabusLabel="SYLLABUS 2.1 · p.17" title="The final Chapter 2 route: format → subnet → address type → lookup." className="l10-slide l10-map">
          <section className="l10-route"><article><span>01</span><b>FORMAT</b><p>IPv4 · IPv6</p></article><article><span>02</span><b>ORGANISE</b><p>subnetting · network/host</p></article><article><span>03</span><b>ASSIGN</b><p>public/private · static/dynamic</p></article><article><span>04</span><b>LOCATE</b><p>URL · DNS</p></article></section>
          <p className="l10-boundary"><Mark>CHAPTER 2 CLOSE</Mark><span>Classful A/B/C addressing is historical context, not a named 2027–2029 outcome.</span></p>
        </Slide>
      ),
    },
    {
      time: "5 min",
      focus: "Diagnose IP notation before teaching definitions.",
      prompt: "Students vote valid IPv4, valid IPv6 or invalid, then justify with one format rule.",
      source: "Coursebook 2.08 printed pp.41-46; syllabus IPv4 and IPv6 formats.",
      content: (
        <Slide number="03" eyebrow="DO NOW · ADDRESS DETECTIVE" sourceLabel="TEXTBOOK pp.41-46" syllabusLabel="SYLLABUS 2.1 — IP FORMAT" title="Which two could be valid IP addresses?" className="l10-slide l10-detective">
          <section className="l10-address-cards"><article><b>192.168.7.31</b><span>IPv4 · IPv6 · invalid?</span></article><article><b>2001:db8::31</b><span>IPv4 · IPv6 · invalid?</span></article><article><b>10.2.400.7</b><span>IPv4 · IPv6 · invalid?</span></article></section>
          <Reveal id="address-detective" visible={revealed.has("address-detective")} onToggle={toggleReveal}><p><strong>192.168.7.31</strong> is valid IPv4. <strong>2001:db8::31</strong> is valid compressed IPv6. <strong>10.2.400.7</strong> is invalid because one IPv4 8-bit group cannot exceed 255.</p></Reveal>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Correct the idea that an IP address permanently names a person or physical computer.",
      prompt: "Ask how one laptop can hold Wi-Fi and Ethernet addresses at the same time.",
      source: "Syllabus 2.1: how an IP address is associated with a device on a network; Coursebook p.42.",
      content: (
        <Slide number="04" eyebrow="WHAT DOES AN IP ADDRESS IDENTIFY?" sourceLabel="TEXTBOOK p.42" syllabusLabel="SYLLABUS 2.1 — ASSOCIATION" title="An IP address is assigned to a network interface in a network context." className="l10-slide l10-interface">
          <section className="l10-interface-model"><div className="l10-laptop"><b>LAPTOP</b><span>one physical device</span></div><article><span>WI-FI INTERFACE</span><b>192.168.1.24</b><p>assigned on home LAN</p></article><article><span>MOBILE INTERFACE</span><b>10.64.8.19</b><p>assigned by mobile network</p></article></section>
          <p className="l10-takeaway">Change the network or interface and the address may change. A router has multiple interfaces and therefore multiple IP addresses.</p>
        </Slide>
      ),
    },
    {
      time: "6 min",
      focus: "Teach IPv4 as 32 bits represented in four bounded denary groups.",
      prompt: "Students convert the first byte 11000000 to denary and validate the address.",
      source: "Coursebook 2.08 printed pp.41-42; syllabus IPv4 format.",
      content: (
        <Slide number="05" eyebrow="IPv4 FORMAT" sourceLabel="TEXTBOOK pp.41-42" syllabusLabel="SYLLABUS 2.1 — IPv4" title="32 bits become four 8-bit groups in dotted decimal notation." className="l10-slide l10-ipv4">
          <section className="l10-ipv4-model"><div><span>8 bits</span><b>11000000</b><strong>192</strong></div><i>.</i><div><span>8 bits</span><b>10101000</b><strong>168</strong></div><i>.</i><div><span>8 bits</span><b>00000001</b><strong>1</strong></div><i>.</i><div><span>8 bits</span><b>00011000</b><strong>24</strong></div></section>
          <section className="l10-rule-strip"><p><b>4 groups</b></p><p><b>0–255</b> per group</p><p><b>full stops</b></p><p><b>32 bits total</b></p></section>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Teach full and compressed IPv6 notation without relying on migration predictions from the older textbook.",
      prompt: "Students expand the double colon and count the eight 16-bit groups.",
      source: "Coursebook printed p.46; syllabus IPv6 format.",
      content: (
        <Slide number="06" eyebrow="IPv6 FORMAT" sourceLabel="TEXTBOOK p.46" syllabusLabel="SYLLABUS 2.1 — IPv6" title="128 bits are written as eight hexadecimal groups separated by colons." className="l10-slide l10-ipv6">
          <section className="l10-ipv6-model"><span>FULL</span><code>2001:0db8:0000:0000:0000:0000:0000:0024</code><i>remove leading zeros · compress one consecutive zero run</i><span>SHORT</span><code>2001:db8::24</code></section>
          <section className="l10-rule-strip"><p><b>8 groups</b></p><p><b>16 bits</b> per group</p><p><b>hexadecimal</b></p><p><b>128 bits total</b></p></section>
          <p className="l10-warning"><code>::</code> may replace consecutive all-zero groups only once in an address, or expansion would be ambiguous.</p>
        </Slide>
      ),
    },
    {
      time: "8 min",
      focus: "Use an authentic format question and make each blank correspond to one retrievable fact.",
      prompt: "Students complete all five facts from memory, then self-mark.",
      source: "Adapted from 9618/11 May/June 2023 Question 4(d)(i), verified against the published mark scheme.",
      content: (
        <Slide number="07" eyebrow="PAST PAPER PRACTICE · 5 MARKS" sourceLabel="9618/11 M/J 2023 · Q4(d)(i)" syllabusLabel="SYLLABUS 2.1 — IP FORMAT" title="Complete the five missing IPv4 and IPv6 format facts." className="l10-slide l10-paper">
          <section className="l10-fill-question"><p>IPv4 contains <b>___</b> groups; each group uses <b>___</b> bits.</p><p>IPv6 contains <b>___</b> groups; each group uses <b>___</b> bits.</p><p>Consecutive all-zero IPv6 groups may be replaced by <b>___</b>.</p></section>
          <Reveal id="format-paper" visible={revealed.has("format-paper")} onToggle={toggleReveal}><p><strong>4 groups · 8 bits · 8 groups · 16 bits · <code>::</code> (double colon)</strong>. The IPv4 groups are separated by full stops; IPv6 groups use colons.</p></Reveal>
          <p className="l10-citation">Concise adaptation of 9618/11 M/J 2023 Q4(d)(i), retaining all five original marks.</p>
        </Slide>
      ),
    },
    {
      time: "6 min",
      focus: "Explain subnetting as a logical division of one network, not merely cutting a cable.",
      prompt: "Students assign admin, students and guests to three logical segments.",
      source: "Coursebook 2.08 printed pp.43-45; syllabus use of subnetting.",
      content: (
        <Slide number="08" eyebrow="WHY SUBNET?" sourceLabel="TEXTBOOK pp.43-45" syllabusLabel="SYLLABUS 2.1 — SUBNETTING" title="Subnetting divides a network into smaller logical networks." className="l10-slide l10-subnet-purpose">
          <section className="l10-subnet-campus" role="img" aria-label="One school network divided into admin, students and guest subnets"><strong>SCHOOL NETWORK</strong><i /><article><span>SUBNET A</span><b>ADMIN</b></article><article><span>SUBNET B</span><b>STUDENTS</b></article><article><span>SUBNET C</span><b>GUESTS</b></article></section>
          <p className="l10-takeaway">Routers or layer-3 controls move traffic between subnets and can apply different access rules.</p>
        </Slide>
      ),
    },
    {
      time: "6 min",
      focus: "Make the network/host split visible using prefix notation and a subnet mask.",
      prompt: "Students underline the shared network portion in three /24 addresses.",
      source: "Coursebook pp.42-44; syllabus subnetting and device association.",
      content: (
        <Slide number="09" eyebrow="NETWORK ID + HOST ID" sourceLabel="TEXTBOOK pp.42-44" syllabusLabel="SYLLABUS 2.1 — ADDRESS PARTS" title="The prefix identifies the subnet; the remaining bits identify an interface within it." className="l10-slide l10-prefix">
          <section className="l10-prefix-address"><span>192 . 168 . 12</span><b>.</b><strong>44</strong><i>/24</i></section>
          <section className="l10-prefix-grid"><article><span>NETWORK PREFIX · FIRST 24 BITS</span><b>shared by this subnet</b></article><article><span>HOST PORTION · LAST 8 BITS</span><b>unique within this subnet</b></article></section>
          <p className="l10-warning"><code>/24</code> is a decimal prefix length, not an extra 8-bit field added to the IPv4 address.</p>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Turn three memorised benefits into linked cause-and-effect explanations.",
      prompt: "For each benefit, students must finish the sentence with because/so that.",
      source: "Coursebook pp.43-45; syllabus use of subnetting; 9618/11 M/J 2023 Q4(d)(ii).",
      content: (
        <Slide number="10" eyebrow="SUBNETTING BENEFITS" sourceLabel="TEXTBOOK pp.43-45" syllabusLabel="SYLLABUS 2.1 — SUBNETTING" title="Contain traffic, restrict access and isolate maintenance." className="l10-slide l10-subnet-benefits">
          <section className="l10-benefit-grid"><article><span>PERFORMANCE</span><b>less unnecessary traffic</b><p>local transmissions remain in their subnet</p></article><article><span>SECURITY</span><b>separate access zones</b><p>rules can limit traffic between groups</p></article><article><span>MANAGEMENT</span><b>isolate faults/change</b><p>one subnet can be maintained while others operate</p></article></section>
          <div className="l10-answer-frame"><b>Two-mark pattern</b><span>name the benefit + explain the network consequence.</span></div>
        </Slide>
      ),
    },
    {
      time: "6 min",
      focus: "Distinguish routability from permanence and link public exposure to security implications.",
      prompt: "Place public/private on one axis and static/dynamic on another.",
      source: "Coursebook pp.45-46; syllabus public/private and security implications.",
      content: (
        <Slide number="11" eyebrow="PUBLIC OR PRIVATE?" sourceLabel="TEXTBOOK pp.45-46" syllabusLabel="SYLLABUS 2.1 — PUBLIC / PRIVATE" title="Public describes internet routability; private describes internal scope." className="l10-slide l10-public-private">
          <section className="l10-compare"><article><span>PUBLIC IP</span><h3>globally routable</h3><ul><li>visible/reachable across the internet when services permit</li><li>must be unique in public routing</li><li>larger exposure requires strong security controls</li></ul></article><article><span>PRIVATE IP</span><h3>used inside a private network</h3><ul><li>not routed directly on the public internet</li><li>same ranges may be reused by many LANs</li><li>usually translated at the router for internet access</li></ul></article></section>
          <p className="l10-warning">Private addressing and NAT do not replace a firewall, authentication, patching or encryption.</p>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Separate the address's scope from whether its assignment changes.",
      prompt: "Students label four combinations: public-static, public-dynamic, private-static, private-dynamic.",
      source: "Coursebook pp.45-46; syllabus static/dynamic IP addresses.",
      content: (
        <Slide number="12" eyebrow="STATIC OR DYNAMIC?" sourceLabel="TEXTBOOK pp.45-46" syllabusLabel="SYLLABUS 2.1 — STATIC / DYNAMIC" title="Static/dynamic is a second, independent classification." className="l10-slide l10-static-dynamic">
          <section className="l10-axis"><div><span>STATIC</span><b>assignment stays fixed</b><p>useful when other devices must find a server reliably</p></div><i>ADDRESS CHANGE</i><div><span>DYNAMIC</span><b>assigned from a pool</b><p>can change on reconnect; efficient for many client devices</p></div></section>
          <section className="l10-four-types"><p>public + static</p><p>public + dynamic</p><p>private + static</p><p>private + dynamic</p></section>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Decompose a URL and make clear which part DNS uses.",
      prompt: "Students colour-code scheme, host, path, query and fragment in the example.",
      source: "Coursebook 2.09 printed pp.46-47; syllabus URL use.",
      content: (
        <Slide number="13" eyebrow="URL ANATOMY" sourceLabel="TEXTBOOK 2.09 · pp.46-47" syllabusLabel="SYLLABUS 2.1 — URL" title="A Uniform Resource Locator tells software how and where to request a resource." className="l10-slide l10-url">
          <div className="l10-url-line"><span>https</span><b>://</b><strong>learn.example.org</strong><em>/course/unit1</em><i>?week=2#quiz</i></div>
          <section className="l10-url-key"><p><span>SCHEME</span>how to communicate</p><p><span>HOST / DOMAIN</span>which server name</p><p><span>PATH</span>which resource</p><p><span>QUERY / FRAGMENT</span>options or in-page target</p></section>
          <p className="l10-warning">URL means <b>Uniform</b> Resource Locator. DNS resolves the host name, not the path or query.</p>
        </Slide>
      ),
    },
    {
      time: "6 min",
      focus: "Trace a realistic DNS resolution path with caching and hierarchy.",
      prompt: "Students number the resolver, root, TLD and authoritative stages.",
      source: "Coursebook printed p.47; syllabus role of DNS.",
      content: (
        <Slide number="14" eyebrow="PAST PAPER PRACTICE · 4 MARKS" sourceLabel="9618/11 O/N 2025 · Q7(c)" syllabusLabel="SYLLABUS 2.1 — URL / DNS" title="Explain how a browser uses a URL and DNS to access a web resource." className="l10-slide l10-dns">
          <section className="l10-dns-flow"><article><span>1</span><b>BROWSER</b><p>asks resolver</p></article><i>→</i><article><span>2</span><b>RESOLVER</b><p>checks cache</p></article><i>→</i><article><span>3</span><b>ROOT / TLD</b><p>directs query</p></article><i>→</i><article><span>4</span><b>AUTHORITATIVE</b><p>returns record</p></article></section>
          <div className="l10-dns-result"><b>203.0.113.24</b><span>The browser can now contact the server and request the URL path.</span></div>
          <Reveal id="dns-check" visible={revealed.has("dns-check")} onToggle={toggleReveal}><p>Parse the URL/extract its domain; check browser/resolver cache; query DNS; receive the IP; connect to the server; request the named resource; receive/render it. Any four linked points score. DNS does not send the web page or choose its packet route.</p></Reveal>
          <p className="l10-citation">Concise adaptation of 9618/11 O/N 2025 Q7(c), retaining the original 4 marks.</p>
        </Slide>
      ),
    },
    {
      time: "5 min",
      focus: "Close Chapter 2 with an authentic four-way address classification.",
      prompt: "Students write one exact description for each type before revealing.",
      source: "Adapted from 9618/12 October/November 2023 Question 7(d), verified against the published mark scheme.",
      content: (
        <Slide number="15" eyebrow="PAST PAPER EXIT · 4 MARKS" sourceLabel="9618/12 O/N 2023 · Q7(d)" syllabusLabel="SYLLABUS 2.1 — IP TYPES" title="Define public, private, static and dynamic IP addresses." className="l10-slide l10-exit">
          <section className="l10-exit-grid"><article><b>PUBLIC</b><span>?</span></article><article><b>PRIVATE</b><span>?</span></article><article><b>STATIC</b><span>?</span></article><article><b>DYNAMIC</b><span>?</span></article></section>
          <Reveal id="types-exit" visible={revealed.has("types-exit")} onToggle={toggleReveal}><p><strong>Public:</strong> direct internet visibility/routing. <strong>Private:</strong> internal LAN use. <strong>Static:</strong> fixed assignment. <strong>Dynamic:</strong> may be refreshed/changed when reconnecting.</p></Reveal>
          <div className="l10-homework"><b>HOMEWORK 10</b><span>30 marks · Chapter 2 complete</span><strong>USE HOMEWORK TAB ↑</strong></div>
        </Slide>
      ),
    },
  ];

  const homework = (
    <HomeworkSheet
      lessonNumber="10"
      title="IP Addressing, Subnetting, URLs & DNS"
      marks={30}
      minutes={45}
      syllabusLabel="SYLLABUS 2.1 · p.17"
      sourceLabel="TEXTBOOK CH.2 · pp.41-47 + PAPER 1"
      instructions="Treat format, scope and assignment as separate ideas. Show subnet prefix reasoning clearly. Past-paper prompts are concise adaptations with their original references and marks."
      sections={homeworkSections}
      challenge={{
        id: "l10-challenge",
        prompt: <p><Mark>CHALLENGE</Mark> A browser requests <code>https://media.school.example/live</code>. Trace the host name from URL through DNS, then explain how public/private addressing can appear at the school gateway.</p>,
        answer: <p>The browser extracts <code>media.school.example</code> and asks its DNS resolver. Cached or hierarchical DNS queries return the server&apos;s public IP address; the browser then requests <code>/live</code>. Inside the school, the client may use a private IP. The gateway/router has a public-facing address and translates/forwards traffic between the private network and the internet, with security controls still required.</p>,
      }}
    />
  );

  return (
    <LessonShell
      lessonNumber="10"
      slides={slides}
      homework={homework}
      courseMapHref="../?view=roadmap"
      sourceSummary="Checked against syllabus 2.1 p.17, Coursebook Chapter 2 printed pp.41-47, and published 2021-2025 AS Paper 1 questions and mark schemes."
      sourceDetail="Core boundary: IPv4/IPv6 formats; subnetting and network/host portions; how IP addresses are associated with network interfaces; public/private addressing and security implications; static/dynamic assignment; URL components and DNS resolution. Authentic anchors: 9618/11 M/J 2023 Q4(d), 9618/11 M/J 2024 Q8(b), 9618/12 O/N 2023 Q7(d), and 9618/11 O/N 2025 Q7(a)-(c). This lesson completes syllabus Chapter 2."
    />
  );
}
