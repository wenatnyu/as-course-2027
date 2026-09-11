import type { Metadata } from "next";
import { CAMBRIDGE_PAST_PAPERS_URL, EXAM_ARCHIVE, PUBLIC_JUNE_2024_PAPERS, SCHOOL_SUPPORT_HUB_URL } from "../_data/exam-papers";
import "./resources.css";

const title = "Cambridge 9618 · Question Papers and Mark Schemes";
const description = "An authorised-source index to recent Cambridge 9618 AS, A2-stage and full A Level question papers, mark schemes, inserts and Paper 4 support files.";
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wenatnyu.github.io/as-course-2027/";
const siteUrl = configuredSiteUrl.endsWith("/") ? configuredSiteUrl : `${configuredSiteUrl}/`;
const pageUrl = new URL("exam-papers/", siteUrl).toString();

export const dynamic = "force-static";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website", url: pageUrl, images: [] },
  twitter: { card: "summary", title, description, images: [] },
};

export default function ExamPapersPage() {
  return (
    <main className="papers-page">
      <header className="papers-bar"><a className="papers-brand" href="../"><b>CS</b><span>Cambridge 9618<br />AS + A LEVEL</span></a><nav aria-label="Course areas"><a href="../">AS course</a><a href="../a2/">A2 course</a><a className="active" href="./">Exam papers</a></nav></header>

      <section className="papers-hero"><div><span>QUESTION PAPER · MARK SCHEME · INSERT · SUPPORT FILES</span><h1>Recent papers,<br /><em>one honest index.</em></h1><p>Complete coverage of the 2024–2026 calendar window, with public downloads separated from teacher-account access and unreleased material.</p></div><div className="papers-key"><article><i className="public" /><b>Public download</b><p>Direct official Cambridge file</p></article><article><i className="hub" /><b>Teacher access</b><p>Complete set in School Support Hub</p></article><article><i className="pending" /><b>Not released</b><p>No paper or mark scheme exists yet</p></article></div></section>

      <section className="papers-section papers-scope"><div><span>AS LEVEL</span><b>Papers 1 + 2</b><p>Theory Fundamentals · Fundamental Problem-solving and Programming Skills</p></div><i>+</i><div><span>A2 STAGE</span><b>Papers 3 + 4</b><p>Advanced Theory · Practical</p></div><i>=</i><div><span>FULL A LEVEL</span><b>Papers 1–4</b><p>Use the same location-variant ending: 11 + 21 + 31 + 41, for example.</p></div></section>

      <section className="papers-section papers-notice"><span>WHY THIS PAGE LINKS INSTEAD OF RE-HOSTING</span><p>Cambridge does not permit past papers or mark schemes to be republished on a website or school intranet. Registered Cambridge teachers may download materials from the School Support Hub and print them for classroom use. This library therefore points only to authorised Cambridge sources.</p><a href="https://help.cambridgeinternational.org/hc/en-gb/articles/203544371-Can-I-reproduce-Cambridge-past-examination-papers-on-the-school-s-website-my-website" target="_blank" rel="noreferrer">Read Cambridge&apos;s website policy →</a></section>

      <section className="papers-section"><header className="papers-heading"><span>OFFICIAL PUBLIC SET</span><h2>June 2024 · location variant 1</h2><p>These are the full public AS + A2-stage papers provided on Cambridge&apos;s 9618 page. Paper 2 includes its insert; Paper 4 includes its support-file ZIP.</p></header><div className="public-paper-table"><div className="public-paper-head"><span>Stage / component</span><span>Paper</span><span>Official downloads</span></div>{PUBLIC_JUNE_2024_PAPERS.map((paper)=><article key={paper.component}><div><span>{paper.stage}</span><b>{paper.component}</b></div><p>{paper.paperName}</p><nav aria-label={`June 2024 component ${paper.component} downloads`}><a href={paper.qp} target="_blank" rel="noreferrer" aria-label={`June 2024 component ${paper.component} question paper`}>Question paper</a><a href={paper.ms} target="_blank" rel="noreferrer" aria-label={`June 2024 component ${paper.component} mark scheme`}>Mark scheme</a>{"extra" in paper && paper.extra ? <a href={paper.extra.href} target="_blank" rel="noreferrer" aria-label={`June 2024 component ${paper.component} ${paper.extra.label}`}>{paper.extra.label}</a> : null}</nav></article>)}</div></section>

      <section className="papers-section"><header className="papers-heading"><span>COMPLETE THREE-YEAR INDEX</span><h2>2024–2026 · all AS and A2-stage components</h2><p>Every released row covers Papers 1–4 and all listed location variants. A complete three-year set with both June and November available is currently 2023–2025; the 2026 November series cannot be complete before its January 2027 results day.</p></header><div className="archive-grid">{EXAM_ARCHIVE.map((year)=><article className="archive-year" key={year.year}><header><b>{year.year}</b><span>{year.sessions.filter((session)=>session.status === "released").length} / 2 series released</span></header>{year.sessions.map((session)=><section className={session.status} key={session.name}><div><i /><span>{session.name}</span><em>{session.status === "released" ? "RELEASED" : "PENDING"}</em></div><b>{session.components}</b><p>{session.note}</p><nav>{session.status === "released" ? <a href={SCHOOL_SUPPORT_HUB_URL} target="_blank" rel="noreferrer" aria-label={`${year.year} ${session.name} complete question papers and mark schemes in School Support Hub`}>QP + mark schemes in Hub</a> : <span>No download yet</span>}{"threshold" in session && session.threshold ? <a href={session.threshold} target="_blank" rel="noreferrer" aria-label={`${year.year} ${session.name} grade thresholds`}>Grade thresholds</a> : null}</nav></section>)}</article>)}</div></section>

      <section className="papers-section papers-checklist"><header><span>TEACHER DOWNLOAD CHECKLIST</span><h2>Build a complete exam pack.</h2></header><ol><li><b>Choose one variant ending.</b><p>Match 11 + 21 + 31 + 41, or 12 + 22 + 32 + 42, or 13 + 23 + 33 + 43.</p></li><li><b>Download QP + mark scheme.</b><p>Paper 2 may also require an insert. Paper 4 may require a support-file archive.</p></li><li><b>Keep source files together.</b><p>Extract Paper 4 support files into a clean working folder before the timed practical.</p></li><li><b>Print or distribute through authorised channels.</b><p>Do not repost the downloaded paper or mark scheme on this public site.</p></li></ol></section>

      <section className="papers-section papers-official"><div><span>PRIMARY ACCESS</span><h2>Open the authorised libraries.</h2></div><nav><a href={CAMBRIDGE_PAST_PAPERS_URL} target="_blank" rel="noreferrer">Cambridge public past papers</a><a href={SCHOOL_SUPPORT_HUB_URL} target="_blank" rel="noreferrer">School Support Hub sign-in</a></nav></section>

      <footer className="papers-footer"><p>Availability checked 11 September 2026. The index does not copy, proxy or embed Cambridge copyrighted papers.</p><nav><a href="../">AS course</a><a href="../a2/">A2 course</a><a href="https://help.cambridgeinternational.org/hc/en-gb/articles/32168220870162-When-will-the-latest-question-papers-and-mark-schemes-be-available-on-the-School-Support-Hub" target="_blank" rel="noreferrer">Release policy</a><a href="https://help.cambridgeinternational.org/hc/en-gb/articles/115004333125-Can-I-reproduce-Cambridge-past-examination-papers-for-use-in-the-classroom-with-my-students" target="_blank" rel="noreferrer">Classroom-use policy</a></nav></footer>
    </main>
  );
}

