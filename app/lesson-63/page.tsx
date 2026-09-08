import "../paper-two-lessons.css";
import { lessonMetadata } from "../_components/lesson-metadata";
import { PaperTwoLesson, type PaperTwoLessonSpec } from "../_components/paper-two-lesson";

export const dynamic = "force-static";
export const metadata = lessonMetadata("63", "Cambridge 9618 corrective, adaptive and perfective maintenance, program amendment and full AS course review.");

const spec = {
  lessonNumber: "63", chapter: "12", chapterTitle: "Software Development", title: "Maintenance, Program Amendment & AS Finish", tagline: "Diagnose before changing: correct faults, adapt to a changed environment or improve an already working program—then regression-test the old and new behaviour.", syllabus: "12.3", textbook: "TEXTBOOK CH.15 · pp.306–311",
  objectives: ["Explain why operational software needs maintenance.", "Distinguish corrective, adaptive and perfective maintenance.", "Analyse an existing program and amend it to enhance functionality.", "Plan regression tests and connect all AS Chapters 9–12."],
  starter: { prompt: "Classify: fix wrong tax, support a new operating system, reduce response time.", answer: "Corrective fixes the wrong tax fault; adaptive responds to the changed OS/environment; perfective improves speed/performance of software that already works." },
  concepts: [
    { label: "CORRECTIVE", text: "Repair an identified fault so behaviour matches the existing specification." },
    { label: "ADAPTIVE", text: "Change software for a new environment, platform, law, format or external requirement." },
    { label: "PERFECTIVE", text: "Improve performance, usability or maintainability without fixing a failure." },
    { label: "IMPACT ANALYSIS", text: "Trace changed requirement through data, modules, interfaces, code and tests." },
    { label: "REGRESSION TEST", text: "Re-run relevant existing tests to show old behaviour still works after change." },
    { label: "CHANGE RECORD", text: "Document reason, version, affected components, implementation and evidence." },
  ],
  model: { title: "A safe amendment follows an evidence loop.", code: "1  Reproduce / define the requested change\n2  Locate affected requirement, data and modules\n3  Predict side effects and interfaces\n4  Make the smallest coherent code/design change\n5  Add tests for the new or corrected behaviour\n6  Re-run relevant old tests (regression)\n7  Record version, reason, result and remaining risk", note: "Maintenance is not 'edit until it seems to work'. It repeats analysis, design, coding and testing at a controlled scale." },
  worked: { title: "Enhance an existing reward procedure.", prompt: "Existing RecordVisit only adds 1 point. Add a Weekend flag: weekend visits add 3, other visits add 1, and LastVisit is updated.", steps: ["Existing line is Points ← Points + 1; identify Points as an updated caller value.", "Add Weekend : BOOLEAN and BYREF LastVisit : DATE to the interface.", "Use IF Weekend THEN +3 ELSE +1.", "After selection set LastVisit ← TODAY(), using the supplied date routine."], answer: "PROCEDURE RecordVisit(BYREF Points : INTEGER, Weekend : BOOLEAN, BYREF LastVisit : DATE); IF Weekend THEN Points ← Points + 3 ELSE Points ← Points + 1 ENDIF; LastVisit ← TODAY(); ENDPROCEDURE. Test both branches, the date update and old non-weekend behaviour." },
  comparison: { title: "The reason for change determines the category.", rows: [
    { term: "corrective", distinction: "existing behaviour is wrong", example: "off-by-one total" },
    { term: "adaptive", distinction: "external requirement/environment changed", example: "new file format or OS" },
    { term: "perfective", distinction: "working solution is improved", example: "faster search or clearer interface" },
  ] },
  practice: { title: "Analyse four change requests.", prompt: "Crash on empty file; new tax rule; faster sort; clearer variable names.", cues: ["Use the reason, not the code changed.", "State affected modules/data/tests.", "Give one regression test."], answer: "Crash fix corrective; new tax rule adaptive; faster sort perfective; clearer names perfective maintainability. Each still requires impact analysis and regression tests." },
  pitfalls: ["A new feature caused by a changed requirement is adaptive, not automatically perfective.", "A speed improvement to already correct software is perfective, not corrective.", "Changing one line without testing interfaces and previous cases risks regression faults elsewhere."],
  examMethod: ["Write 'because...' after the maintenance type and quote the reason for change.", "For an amendment, trace inputs, data structures, modules, conditions, outputs and existing tests.", "Show the exact code change plus new-case and regression evidence."],
  papers: [
    { source: "9618/22 M/J 2025 · Q1(b)", marks: "4 MARKS", prompt: "Explain reasons for adaptive maintenance and name another type.", cues: [{ label: "ENVIRONMENT", text: "hardware/OS/platform change" }, { label: "REQUIREMENT", text: "law, format or user need changes" }, { label: "OTHER", text: "corrective or perfective" }], answer: "Adaptive reasons include changed hardware/OS/platform, external interfaces, law or requirements. Another named type is corrective or perfective, with its matching purpose." },
    { source: "9618/23 M/J 2022 · Q2", marks: "4 MARKS", prompt: "Match maintenance types to reasons for program change.", cues: [{ label: "FAULT", text: "corrective" }, { label: "CHANGE", text: "adaptive" }, { label: "IMPROVE", text: "perfective" }], answer: "Match from cause: repair a fault→corrective; respond to changed environment/specification→adaptive; improve performance/usability/maintainability of a working program→perfective. Marks require type and matching reason." },
  ],
  retrieval: ["How does maintenance revisit all five PDLC stages?", "Which Chapter 10 structure might an adaptive file-format change affect?", "How do modular interfaces reduce change impact?"],
  exit: ["Classify three change reasons.", "State one regression test.", "Explain how Chapters 9–12 form one solution cycle."],
  homework: {
    instructions: "Classify maintenance from the reason for change, not from the edited line. For amendments, include impact, exact change, new tests and regression tests.",
    sections: [
      { code: "A", title: "Classify maintenance", subtitle: "Cause and purpose", questions: [
        { prompt: "Define corrective, adaptive and perfective maintenance.", answer: "Corrective repairs faults; adaptive responds to changed environment/requirements; perfective improves performance/usability/maintainability of working software.", marks: 3 },
        { prompt: "Classify wrong output, new data law and faster response time.", answer: "Corrective, adaptive and perfective respectively.", marks: 3 },
        { prompt: "Explain why the same code edit could receive different labels in two contexts.", answer: "Category comes from why it is changed: restoring an original requirement is corrective; implementing a newly changed requirement is adaptive; optional improvement is perfective.", marks: 4 },
      ] },
      { code: "B", title: "Analyse and enhance", subtitle: "Add functionality to existing code", questions: [
        { prompt: "Existing RecordVisit(BYREF Points) adds 1. Analyse three interface/data changes needed for a weekend bonus and LastVisit date.", answer: "Add Weekend BOOLEAN input; add BYREF LastVisit DATE output/update; preserve BYREF Points and ensure caller supplies matching arguments.", marks: 3 },
        { prompt: "Write the core amendment: weekend adds 3, otherwise 1, then update LastVisit using supplied TODAY().", answer: "IF Weekend THEN Points ← Points + 3 ELSE Points ← Points + 1 ENDIF; LastVisit ← TODAY().", marks: 3, lines: 5 },
        { prompt: "Give four tests covering the enhancement and regression risk.", answer: "Weekend TRUE adds 3; FALSE adds 1; both update LastVisit to TODAY(); rerun an old ordinary-visit case to confirm previous +1 behaviour remains correct.", marks: 4 },
      ] },
      { code: "C", title: "Published-paper application", subtitle: "Full AS synthesis", questions: [
        { prompt: "Adapted from 9618/22 M/J 2025 Q1(b): give two reasons for adaptive maintenance and name one other type.", answer: "Examples new OS/hardware and changed law/file format; other type corrective or perfective.", marks: 3 },
        { prompt: "Adapted from 9618/23 M/J 2022 Q2: match fault repair, changed platform and speed improvement.", answer: "Corrective, adaptive and perfective respectively.", marks: 3 },
        { prompt: "Explain the full Chapters 9–12 route from problem to maintained program.", answer: "Ch9 designs/refines algorithm; Ch10 selects data structures; Ch11 implements current pseudocode/modules; Ch12 manages lifecycle, diagrams, tests and maintenance. Link all four clearly.", marks: 4 },
      ] },
    ], challenge: { prompt: "Write a minimal change proposal for replacing linear search with another approach without assuming it is allowed by AS syllabus.", answer: "State performance goal, required precondition/data changes, affected module interface, risks and comparison tests. In assessed AS pseudocode, keep required syllabus algorithms; treat alternatives as design discussion only." },
  },
  sourceSummary: "Checked against syllabus 12.3, Coursebook Chapter 15 printed pp.306–311 and published Paper 2 questions/mark schemes.",
  sourceDetail: "Core: need for maintenance; corrective, adaptive and perfective types; impact analysis, program amendment and regression testing. Authentic anchors: 9618/22 M/J 2025 Q1(b) [4] and 9618/23 M/J 2022 Q2 [4]. Lesson 63 completes all 12 AS syllabus chapters; PDF/printed p.312 begins Advanced Theory and is excluded.",
} satisfies PaperTwoLessonSpec;

export default function Lesson63Page() { return <PaperTwoLesson spec={spec} />; }
