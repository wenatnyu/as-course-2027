"use client";

import { useEffect, useMemo, useState } from "react";
import { A2_CALENDAR_PLAN, AS_MILESTONES, AS_SPRING_PLAN } from "../_data/course-schedule";
import { COURSE_LESSONS } from "../_components/lesson-shell";

const DAY = 86_400_000;

function plannedAsLesson(date: Date) {
  const iso = date.toISOString().slice(0, 10);
  let result = 9;
  for (const [deadline, lesson] of AS_MILESTONES) if (iso >= deadline) result = lesson;
  return result;
}

export default function CourseProgressPage() {
  const today = useMemo(() => new Date(), []);
  const planned = plannedAsLesson(today);
  const [completed, setCompleted] = useState(9);
  useEffect(() => {
    const stored = window.localStorage.getItem("as-completed-lesson");
    const timer = window.setTimeout(() => {
      if (stored) setCompleted(Math.max(0, Math.min(63, Number(stored))));
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);
  const updateCompleted = (value: number) => {
    setCompleted(value);
    window.localStorage.setItem("as-completed-lesson", String(value));
  };
  const delta = completed - planned;
  const status = delta === 0 ? "On track" : delta > 0 ? `${delta} lesson${delta === 1 ? "" : "s"} ahead` : `${Math.abs(delta)} lesson${delta === -1 ? "" : "s"} behind`;
  const examWindowDays = Math.ceil((new Date("2027-05-03T00:00:00+08:00").getTime() - today.getTime()) / DAY);

  return (
    <main className="schedule-page">
      <header className="schedule-nav"><a href="../">AS course</a><a href="../a2/">A2 course</a><a href="../exam-papers/">Past papers</a></header>
      <section className="schedule-hero">
        <div><span>CAMBRIDGE 9618 · MAY/JUNE 2027</span><h1>Course pace,<br /><em>made visible.</em></h1><p>One shared benchmark for the teacher and students. Update the completed AS lesson on this device to see whether the class is ahead or behind.</p></div>
        <aside><small>CHINESE MAINLAND TIMETABLE</small><b>Official 2027 dates pending</b><p>Cambridge requires centres in Chinese Mainland to use the bespoke timetable issued through Direct, not the public Zone 5 timetable. This plan works back from an estimated early-May exam window; replace it when your exams officer confirms the entry components and dates.</p><strong>{Math.max(0, examWindowDays)} days to provisional exam window</strong></aside>
      </section>

      <section className="pace-panel">
        <div className="pace-number"><span>AS ACTUAL</span><b>{String(completed).padStart(2, "0")}</b><small>of 63 lessons</small></div>
        <div className="pace-number planned"><span>PLAN TODAY</span><b>{String(planned).padStart(2, "0")}</b><small>milestone target</small></div>
        <div className={`pace-status ${delta < 0 ? "behind" : delta > 0 ? "ahead" : "on-track"}`}><span>STATUS</span><b>{status}</b><p>{completed < 63 ? `Current topic: ${COURSE_LESSONS[Math.max(0, completed - 1)]?.[1] ?? "Start of course"}` : "AS syllabus complete - begin timed paper practice."}</p></div>
        <label><span>Update completed lesson</span><input type="range" min="0" max="63" value={completed} onChange={(event) => updateCompleted(Number(event.currentTarget.value))} /><output>{completed}</output></label>
      </section>

      <section className="schedule-section">
        <div className="section-heading"><span>AS · 40 MINUTES DAILY</span><h2>Finish content before Christmas</h2><p>The core route is the normal lesson. Extension slides are used only when students are secure or for consolidation.</p></div>
        <div className="milestone-grid">{AS_MILESTONES.map(([date, lesson, label]) => <article className={lesson <= completed ? "done" : lesson <= planned ? "due" : ""} key={date}><time>{date.slice(5)}</time><b>L{String(lesson).padStart(2, "0")}</b><p>{label}</p></article>)}</div>
      </section>

      <section className="schedule-section">
        <div className="section-heading"><span>AS · SPRING TERM FROM 22 FEBRUARY 2027</span><h2>Revision, mocks and repair</h2><p>New content is already complete. Spring lessons alternate recall, timed responses and immediate correction so Paper 1 and Paper 2 both stay active.</p></div>
        <div className="spring-plan">{AS_SPRING_PLAN.map(([dates, phase, focus]) => <article key={dates}><time>{dates}</time><b>{phase}</b><p>{focus}</p></article>)}</div>
      </section>

      <section className="schedule-section a2-plan">
        <div className="section-heading"><span>A2 · TWO 2-HOUR SESSIONS / WEEK</span><h2>Weekly plan from 21 September</h2><p>Each week combines Paper 3 theory with Paper 4 implementation. The exact weekday can move without changing the weekly outcome.</p></div>
        <div className="a2-table" role="table" aria-label="A2 weekly plan">
          <div className="a2-row head" role="row"><b>Week</b><b>Date</b><b>Lessons</b><b>Paper 3 focus</b><b>Paper 4 focus</b></div>
          {A2_CALENDAR_PLAN.map((row) => <div className="a2-row" role="row" key={row[0]}>{row.map((cell, index) => <span role="cell" data-label={["Week", "Date", "Lessons", "Paper 3", "Paper 4"][index]} key={index}>{cell}</span>)}</div>)}
        </div>
      </section>

      <section className="exam-structure">
        <article><span>AS LEVEL</span><b>Paper 1 + Paper 2</b><p>Sections 1-8 theory, then Sections 9-12 problem-solving and programming skills.</p></article>
        <article><span>A2 TEACHING</span><b>Paper 3 + Paper 4</b><p>Sections 13-20 advanced theory, plus a practical programming examination.</p></article>
        <article><span>FULL A LEVEL</span><b>Four papers</b><p>Papers 1 and 2 plus Papers 3 and 4, subject to the centre&apos;s entry route and carry-forward rules.</p></article>
      </section>
      <footer className="schedule-source">Assessment structure source: Cambridge 9618 syllabus 2027-2029. Dates shown are teaching targets, not Cambridge examination appointments. Chinese Mainland centres must confirm their bespoke timetable and exact component entry with the exams officer.</footer>
    </main>
  );
}
