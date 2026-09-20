import type { Metadata } from "next";
import PrintButton from "./print-button";
import "./communication-note.css";

const title = "Communication · AS 9618 Chapter Note";
const description = "An original, printable revision note for Cambridge 9618 AS Communication, linked to Lessons 07–10.";

export const dynamic = "force-static";
export const metadata: Metadata = { title, description };

function StarDiagram() {
  return (
    <svg className="network-svg" viewBox="0 0 440 240" role="img" aria-labelledby="star-title star-desc">
      <title id="star-title">Switch-based star topology</title><desc id="star-desc">Four devices connect independently to a central switch.</desc>
      <g className="links"><line x1="220" y1="120" x2="80" y2="55"/><line x1="220" y1="120" x2="360" y2="55"/><line x1="220" y1="120" x2="80" y2="190"/><line x1="220" y1="120" x2="360" y2="190"/></g>
      <rect className="hub" x="166" y="88" width="108" height="64" rx="18"/><text x="220" y="125">SWITCH</text>
      <g className="nodes"><circle cx="80" cy="55" r="30"/><circle cx="360" cy="55" r="30"/><circle cx="80" cy="190" r="30"/><circle cx="360" cy="190" r="30"/></g>
      <g className="node-labels"><text x="80" y="60">A</text><text x="360" y="60">B</text><text x="80" y="195">C</text><text x="360" y="195">D</text></g>
    </svg>
  );
}

function DnsDiagram() {
  return (
    <svg className="dns-svg" viewBox="0 0 760 210" role="img" aria-labelledby="dns-title dns-desc">
      <title id="dns-title">DNS lookup and web request</title><desc id="dns-desc">A browser asks a DNS resolver for an IP address, then requests the resource from the web server.</desc>
      <defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z"/></marker></defs>
      <g className="dns-boxes"><rect x="20" y="70" width="150" height="72" rx="16"/><rect x="305" y="20" width="150" height="72" rx="16"/><rect x="590" y="70" width="150" height="72" rx="16"/></g>
      <g className="dns-labels"><text x="95" y="100">BROWSER</text><text x="95" y="124">school device</text><text x="380" y="50">DNS RESOLVER</text><text x="380" y="74">name → address</text><text x="665" y="100">WEB SERVER</text><text x="665" y="124">requested resource</text></g>
      <g className="dns-arrows"><path d="M170 84 Q230 35 305 55"/><path d="M305 78 Q235 128 170 118"/><path d="M170 130 Q380 200 590 130"/></g>
      <g className="dns-notes"><text x="228" y="28">1 · ask for host name</text><text x="215" y="111">2 · return IP address</text><text x="350" y="192">3 · send request to that address</text></g>
    </svg>
  );
}

const lessonLinks = [
  ["07", "Models, topologies & hardware"],
  ["08", "Cloud & transmission media"],
  ["09", "Ethernet, streaming & internet"],
  ["10", "IP addressing, URL & DNS"],
] as const;

export default function CommunicationNotePage() {
  return (
    <main className="communication-note">
      <header className="note-topbar">
        <a href="../../">← AS course</a>
        <nav aria-label="Communication lessons">{lessonLinks.map(([number]) => <a href={`../../lesson-${number}/`} key={number}>L{number}</a>)}</nav>
        <PrintButton />
      </header>

      <article>
        <section className="note-hero">
          <div><span>CAMBRIDGE 9618 · AS · CHAPTER 2</span><h1>Communication</h1><p>A visual, exam-ready chapter note for Lessons 07–10.</p></div>
          <div className="hero-route" aria-label="Chapter route"><b>device</b><i>→</i><b>LAN</b><i>→</i><b>router</b><i>→</i><b>internet</b><i>→</i><b>server</b></div>
        </section>

        <section className="syllabus-card">
          <div><span>OFFICIAL SYLLABUS · 2.1</span><h2>What you must be able to do</h2></div>
          <ul><li>explain network purposes, models, topologies and supporting hardware</li><li>compare cloud services and wired/wireless transmission media</li><li>describe Ethernet, bit streaming and internet infrastructure</li><li>explain IP addressing, subnetting, URL structure and DNS</li></ul>
          <a href="https://www.cambridgeinternational.org/Images/721397-2027-2029-syllabus.pdf" target="_blank" rel="noreferrer">Open official 2027–2029 syllabus ↗</a>
        </section>

        <nav className="note-index" aria-label="On this page">
          {lessonLinks.map(([number, label]) => <a href={`#lesson-${number}`} key={number}><b>{number}</b><span>{label}</span></a>)}
        </nav>

        <section id="lesson-07" className="note-section lesson-07-note">
          <div className="section-heading"><span>LESSON 07</span><h2>Networks, models, topologies and hardware</h2><a href="../../lesson-07/">Open lesson →</a></div>
          <div className="two-column">
            <div className="content-stack">
              <div className="compare-grid"><article><span>LAN</span><p>Small geographical area; infrastructure is normally owned and managed by one organisation.</p></article><article><span>WAN</span><p>Large geographical area; links separate LANs and often uses leased or public carrier infrastructure.</p></article></div>
              <div className="model-grid"><article><h3>Client–server</h3><p>A client requests a service; a dedicated server provides, stores or controls it.</p><ul><li>central accounts, permissions and backups</li><li>easier consistent administration</li><li>server cost and dependence are drawbacks</li></ul></article><article><h3>Peer-to-peer</h3><p>Each peer may request and provide resources directly.</p><ul><li>cheap and simple for a small network</li><li>no dedicated server required</li><li>harder to secure and back up centrally</li></ul></article></div>
            </div>
            <figure className="diagram-card"><StarDiagram/><figcaption><b>Switch-based star:</b> each device has its own link. One link failure isolates one device; switch failure affects the whole LAN.</figcaption></figure>
          </div>
          <div className="hardware-strip"><article><b>NIC / WNIC</b><span>network interface; identifies and connects a device</span></article><article><b>Switch</b><span>forwards frames to the appropriate LAN port</span></article><article><b>WAP</b><span>lets wireless devices join a LAN</span></article><article><b>Router</b><span>forwards packets between networks</span></article><article><b>Bridge</b><span>connects LAN segments using the same protocol</span></article><article><b>Repeater</b><span>regenerates an attenuated signal</span></article></div>
          <aside className="exam-tip"><b>Exam language</b><p>Do not write “a WAN is the internet”. Compare geographical area and ownership/infrastructure. For hardware, name the object it reads or forwards: a switch uses a destination MAC address; a router uses a destination IP address.</p></aside>
        </section>

        <section id="lesson-08" className="note-section">
          <div className="section-heading"><span>LESSON 08</span><h2>Cloud computing and transmission media</h2><a href="../../lesson-08/">Open lesson →</a></div>
          <div className="cloud-flow"><article><span>LOCAL DEVICE</span><b>requests a service</b></article><i>→</i><article><span>INTERNET</span><b>carries data</b></article><i>→</i><article><span>CLOUD PROVIDER</span><b>storage · processing · platform</b></article></div>
          <div className="three-column"><article><h3>Public cloud</h3><p>Provider-owned resources are shared between customers. It scales easily and reduces local maintenance, but gives the organisation less direct control.</p></article><article><h3>Private cloud</h3><p>Resources are dedicated to one organisation. It offers greater control and customisation, but costs more to build and manage.</p></article><article><h3>Always link the trade-off</h3><p>Availability depends on connectivity; remote storage can support collaboration and backup, but privacy, security, legal location and provider dependence must be considered.</p></article></div>
          <div className="media-table" role="table" aria-label="Transmission media comparison"><div role="row"><b role="columnheader">Medium</b><b role="columnheader">Useful feature</b><b role="columnheader">Limitation</b><b role="columnheader">Typical fit</b></div><div role="row"><span>Copper</span><span>cheap, flexible, easy to install</span><span>attenuation and electromagnetic interference</span><span>short LAN links</span></div><div role="row"><span>Fibre optic</span><span>high bandwidth, long distance, resistant to interference</span><span>equipment and installation cost</span><span>backbone / long-distance link</span></div><div role="row"><span>Radio / Wi-Fi</span><span>mobility; no cable to each device</span><span>interference, security and range</span><span>wireless LAN / mobile link</span></div><div role="row"><span>Microwave</span><span>high-capacity directional link</span><span>line of sight; obstacles/weather</span><span>point-to-point towers</span></div><div role="row"><span>Satellite</span><span>very wide coverage and remote access</span><span>latency, weather and cost</span><span>isolated or moving locations</span></div></div>
        </section>

        <section id="lesson-09" className="note-section">
          <div className="section-heading"><span>LESSON 09</span><h2>Ethernet, streaming and internet infrastructure</h2><a href="../../lesson-09/">Open lesson →</a></div>
          <div className="process-card"><h3>CSMA/CD on a shared Ethernet medium</h3><ol><li><b>Carrier sense:</b> listen before transmitting.</li><li><b>Multiple access:</b> several devices share the medium.</li><li><b>Collision detection:</b> stop if overlapping signals are detected.</li><li><b>Backoff:</b> wait a random time, then retry.</li></ol><p>Modern full-duplex switched Ethernet separates collision domains, so collisions are normally avoided; CSMA/CD still matters as the examined shared-medium method.</p></div>
          <div className="stream-grid"><article><span>REAL-TIME</span><h3>Live data now</h3><p>Capture → encode → transmit → buffer → decode/play. The user cannot request data that has not yet been produced.</p></article><article><span>ON-DEMAND</span><h3>Stored data when requested</h3><p>Server sends an existing encoded file. The player may pause, seek or resume where the service allows.</p></article><article><span>BUFFER</span><h3>Absorbs timing variation</h3><p>Stores arriving data temporarily so playback can continue through short changes in delivery rate. It cannot fix a connection that stays below the required bit rate.</p></article></div>
          <div className="internet-map"><article><b>Internet</b><p>global network of interconnected networks using TCP/IP</p></article><i>contains / carries</i><article><b>World Wide Web</b><p>linked web resources accessed using browsers and web protocols</p></article></div>
          <aside className="exam-tip"><b>Infrastructure roles</b><p>An ISP supplies access. Routers forward packets between networks. A modem converts signals where the access technology requires it. Dedicated lines provide a permanent private/leased path. Cellular networks divide an area into cells served by base stations.</p></aside>
        </section>

        <section id="lesson-10" className="note-section">
          <div className="section-heading"><span>LESSON 10</span><h2>IP addressing, subnetting, URL and DNS</h2><a href="../../lesson-10/">Open lesson →</a></div>
          <div className="ip-grid"><article><span>IPv4</span><code>192.168.10.24</code><p>32 bits, normally written as four decimal octets.</p></article><article><span>IPv6</span><code>2001:db8::17</code><p>128 bits, written as hexadecimal groups; consecutive all-zero groups may be compressed once with <code>::</code>.</p></article><article><span>Public / private</span><p>A public address is routable on the internet. A private address is used inside a LAN; NAT can translate traffic at the gateway.</p></article><article><span>Static / dynamic</span><p>A static assignment remains fixed. A dynamic address is leased automatically, normally by DHCP, and may change.</p></article></div>
          <div className="subnet-card"><div><span>NETWORK PREFIX</span><b>identifies the network / subnet</b></div><div><span>HOST PART</span><b>identifies an interface inside it</b></div><p>A subnet mask (or prefix length) tells a device which address bits belong to the network. Subnetting borrows host bits to create smaller logical networks.</p></div>
          <figure className="diagram-card dns-card"><DnsDiagram/><figcaption>DNS resolves a host name to an IP address. It does not deliver the web page itself.</figcaption></figure>
          <div className="url-card"><code>https://media.school.example/live/video.mp4</code><div><span><b>https</b> protocol</span><span><b>media.school.example</b> host/domain</span><span><b>/live/video.mp4</b> path/resource</span></div></div>
        </section>

        <section className="checklist-section">
          <div><span>FINAL CHECK</span><h2>Can you explain, not just name?</h2></div>
          <ul><li>choose a network model or medium for a stated situation</li><li>trace a frame, packet or stream through named devices</li><li>compare two technologies using linked advantages and drawbacks</li><li>separate Internet, WWW, URL, DNS and IP address</li><li>use precise terms: bandwidth, bit rate, latency, buffer, attenuation</li></ul>
        </section>

        <footer className="note-sources">
          <div><b>How this note was made</b><p>Original teaching summary aligned to Cambridge 9618 syllabus 2.1 and Lessons 07–10. ZNotes was used as a secondary revision reference; wording and diagrams here are newly created and technical claims were checked against the course structure.</p></div>
          <a href="https://znotes.org/caie/as-level/computer-science-9618/theory/communication/" target="_blank" rel="noreferrer">Read the original ZNotes Communication page ↗</a>
        </footer>
      </article>
    </main>
  );
}
