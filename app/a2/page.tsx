import type { Metadata } from "next";
import { A2_PHASES, A2_WEEKLY_PLAN } from "../_data/a2-course";
import "./a2-hub.css";

const title = "Cambridge 9618 · A2 Course 2028";
const description = "A 32-week A2-stage Cambridge International A Level Computer Science course map with Paper 3 theory, Paper 4 Python practice, lessons and homework.";
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wenatnyu.github.io/as-course-2027/";
const siteUrl = configuredSiteUrl.endsWith("/") ? configuredSiteUrl : `${configuredSiteUrl}/`;
const pageUrl = new URL("a2/", siteUrl).toString();

export const dynamic = "force-static";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website", url: pageUrl, images: [] },
  twitter: { card: "summary", title, description, images: [] },
};

const syllabusChapters = [
  ["13", "Data Representation", "types · files · floating point"],
  ["14", "Communication", "protocols · switching"],
  ["15", "Hardware + VMs", "processors · parallelism · logic"],
  ["16", "System Software", "OS · translation"],
  ["17", "Security", "cryptography · TLS · certificates"],
  ["18", "Artificial Intelligence", "graphs · machine learning"],
  ["19", "Problem-solving", "algorithms · ADTs · recursion"],
  ["20", "Further Programming", "paradigms · files · exceptions"],
] as const;

const milestoneWeeks = new Set(["06", "10", "16", "22", "29", "30", "31", "32"]);
const completedChapters = new Set(["13", "14", "15"]);

const publishedLessons = [
  { href: "./lesson-01/", label: "THEORY · A2-01", title: "User-defined data types", topics: "Enum · pointer · set · record · class/object", syllabus: "13.1 · PAPER 3" },
  { href: "./lesson-02/", label: "THEORY · A2-02", title: "File organisation and access", topics: "Serial · sequential · random · direct access", syllabus: "13.2 · PAPER 3" },
  { href: "./lesson-03/", label: "THEORY · A2-03", title: "Hashing for file access", topics: "MOD · collision · probing · overflow · chaining", syllabus: "13.2 · PAPER 3" },
  { href: "./lesson-04/", label: "THEORY · A2-04", title: "Floating-point format", topics: "Mantissa · exponent · decode · normalise", syllabus: "13.3 · PAPER 3" },
  { href: "./lesson-05/", label: "THEORY · A2-05", title: "Encode and normalise", topics: "Conversion · bit allocation · approximation", syllabus: "13.3 · PAPER 3" },
  { href: "./lesson-06/", label: "THEORY · A2-06", title: "Precision, errors and review", topics: "Rounding · underflow · overflow · checkpoint", syllabus: "13.3 · PAPER 3" },
  { href: "./lesson-07/", label: "THEORY · A2-07", title: "Protocols and TCP/IP", topics: "Protocol rules · four layers · host-to-host journey", syllabus: "14.1 · PAPER 3" },
  { href: "./lesson-08/", label: "THEORY · A2-08", title: "Application protocols", topics: "HTTP · FTP · SMTP · POP3 · IMAP · BitTorrent", syllabus: "14.1 · PAPER 3" },
  { href: "./lesson-09/", label: "THEORY · A2-09", title: "Switching methods", topics: "Circuit switching · packets · routes · comparison", syllabus: "14.2 · PAPER 3" },
  { href: "./lesson-10/", label: "THEORY · A2-10", title: "Routers and review", topics: "Headers · routing tables · reassembly · exam clinic", syllabus: "14.2 · PAPER 3" },
  { href: "./lesson-11/", label: "THEORY · A2-11", title: "RISC, CISC and pipelines", topics: "Instruction sets · registers · interrupts · throughput", syllabus: "15.1 · PAPER 3" },
  { href: "./lesson-12/", label: "THEORY · A2-12", title: "Parallel architectures", topics: "SISD · SIMD · MISD · MIMD · massive parallelism", syllabus: "15.1 · PAPER 3" },
  { href: "./lesson-13/", label: "THEORY · A2-13", title: "Virtual machines", topics: "Host · guest · isolation · roles · limitations", syllabus: "15.1 · PAPER 3" },
  { href: "./lesson-14/", label: "THEORY · A2-14", title: "Boolean algebra", topics: "Laws · De Morgan · SOP · simplification", syllabus: "15.2 · PAPER 3" },
  { href: "./lesson-15/", label: "THEORY · A2-15", title: "Adders and flip-flops", topics: "Truth tables · half/full adders · SR · JK", syllabus: "15.2 · PAPER 3" },
  { href: "./lesson-16/", label: "THEORY · A2-16", title: "Karnaugh maps and review", topics: "Gray code · grouping · optimal SOP · checkpoint", syllabus: "15.2 · PAPER 3" },
  { href: "./lab-01/", label: "PYTHON · A2-P01", title: "Paper 4 baseline + evidence", topics: "Text files · exceptions · executable evidence", syllabus: "20.2 · PAPER 4", lab: true },
] as const;

export default function A2CoursePage() {
  return (
    <main className="a2-hub">
      <header className="a2-hub-bar">
        <a className="a2-hub-brand" href="./"><b>CS</b><span>Cambridge 9618<br />A2 · 2028</span></a>
        <nav aria-label="Course areas"><a href="../">AS course</a><a className="active" href="./">A2 course</a><a href="../exam-papers/">Exam papers</a></nav>
        <a className="a2-hub-cta" href="./lesson-11/">Open Chapter 15 →</a>
      </header>

      <section className="a2-hub-hero">
        <div className="a2-hub-copy"><span>SEPTEMBER 2027 → MAY/JUNE 2028</span><h1>From AS foundations<br />to <em>A Level performance.</em></h1><p>A 32-week dual track: advanced theory for Paper 3, practical Python and evidence discipline for Paper 4.</p><div className="a2-hub-actions"><a href="./lesson-11/">Open Chapter 15</a><a href="./lab-01/">Open Python lab</a></div></div>
        <div className="a2-hub-scope" aria-label="A2 course scope"><div><strong>8</strong><span>syllabus sections</span></div><div><strong>32</strong><span>teaching weeks</span></div><div><strong>2</strong><span>parallel exam tracks</span></div></div>
      </section>

      <section className="a2-hub-section a2-stage-note">
        <span>A2 IS A STAGE, NOT A SEPARATE QUALIFICATION</span>
        <p>The full Cambridge International A Level is assessed through Papers 1–4, or through Papers 3–4 with an eligible carried-forward AS result. This plan teaches the A2-stage content in syllabus Sections 13–20.</p>
      </section>

      <section className="a2-hub-section">
        <header className="a2-section-heading"><span>ASSESSMENT BLUEPRINT</span><h2>Teach the written and practical habits together.</h2></header>
        <div className="a2-paper-cards">
          <article><span>PAPER 3 · ADVANCED THEORY</span><b>1 h 30 · 75 marks</b><p>Sections 13–20. AO1 60% · AO2 40%. Short responses, extended explanation, calculation, trace and design.</p><strong>Weekly routine · recall → model → exam response</strong></article>
          <article><span>PAPER 4 · PRACTICAL</span><b>2 h 30 · 75 marks</b><p>Practical Sections 19–20, excluding low-level and declarative programming. AO3 100%. Python console, complete code and testing evidence.</p><strong>Weekly routine · interpret → code → run → evidence</strong></article>
        </div>
      </section>

      <section className="a2-hub-section">
        <header className="a2-section-heading"><span>SECTIONS 13–15 · COMPLETE</span><h2>Three A2 chapters are ready to teach.</h2><p>Sixteen 90-minute Paper 3 lessons now cover Data Representation, Communication and Internet Technologies, and Hardware and Virtual Machines. Each includes teacher notes, visible syllabus and textbook markers, cited past-paper practice, and a 30-mark printable homework with inline answers.</p></header>
        <div className="a2-live-cards">
          {publishedLessons.map((lesson) => <a className={"lab" in lesson ? "lab" : "theory"} href={lesson.href} key={lesson.href}><span>{lesson.label}</span><h3>{lesson.title}</h3><p>{lesson.topics}</p><div><b>{lesson.syllabus}</b><strong>90 min →</strong></div></a>)}
        </div>
      </section>

      <section className="a2-hub-section">
        <header className="a2-section-heading"><span>COMPLETE A2 SCOPE</span><h2>Eight syllabus chapters, one connected sequence.</h2></header>
        <div className="a2-chapter-grid">{syllabusChapters.map(([number, name, topics]) => <article className={completedChapters.has(number) ? "complete" : ""} key={number}><span>{number}</span><div><b>{name}</b><p>{topics}</p></div><em>{completedChapters.has(number) ? "COMPLETE" : "PLANNED"}</em></article>)}</div>
      </section>

      <section className="a2-hub-section">
        <header className="a2-section-heading"><span>32-WEEK COURSE MAP</span><h2>Content closes before the final mock cycle.</h2><p>Three guided 90-minute blocks per week are assumed: Paper 3 theory, Paper 4 lab and a retrieval/past-paper clinic. The two 150-minute practical mocks need protected extended sessions.</p></header>
        <div className="a2-phase-track">{A2_PHASES.map((phase) => <article className={phase.tone} key={phase.weeks}><span>{phase.weeks}</span><b>{phase.name}</b><p>{phase.detail}</p></article>)}</div>
        <div className="a2-week-table" role="table" aria-label="A2 32-week teaching plan">
          <div className="a2-week-head" role="row"><span role="columnheader">Week</span><span role="columnheader">Paper 3 · advanced theory</span><span role="columnheader">Paper 4 · Python practical</span></div>
          {A2_WEEKLY_PLAN.map(([week, theory, practical]) => <div className={milestoneWeeks.has(week) ? "a2-week-row milestone" : "a2-week-row"} role="row" key={week}><b role="cell">{week}</b><span role="cell">{theory}</span><span role="cell">{practical}</span></div>)}
        </div>
        <div className="a2-pace-rule"><b>PACE RULE</b><p>Finish new Paper 3 content by Week 29. Keep Paper 4 running from Week 1 rather than postponing programming until Sections 19–20. Protect Weeks 30–32 for two written mocks, two full practical mocks and evidence-led repair.</p></div>
      </section>

      <footer className="a2-hub-footer"><div><b>CAMBRIDGE 9618 · AS + A LEVEL</b><p>Plan based on the official 2027–2029 syllabus, the endorsed coursebook, the current Pseudocode Guide and published assessment materials.</p></div><nav aria-label="Reference links"><a href="https://www.cambridgeinternational.org/Images/721397-2027-2029-syllabus.pdf" target="_blank" rel="noreferrer">Official syllabus</a><a href="../exam-papers/">Exam paper library</a><a href="../">AS course</a></nav></footer>
    </main>
  );
}
