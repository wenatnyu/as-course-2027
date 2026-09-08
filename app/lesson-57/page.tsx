import "../paper-two-lessons.css";
import { lessonMetadata } from "../_components/lesson-metadata";
import { PaperTwoLesson, type PaperTwoLessonSpec } from "../_components/paper-two-lesson";

export const dynamic = "force-static";
export const metadata = lessonMetadata("57", "Cambridge 9618 program development life cycle purpose and five stages with authentic Paper 2 practice.");

const spec = {
  lessonNumber: "57", chapter: "12", chapterTitle: "Software Development", title: "The Program Development Life Cycle", tagline: "Move from an evidenced problem to a maintained solution through analysis, design, coding, testing and maintenance—while recognising feedback between stages.", syllabus: "12.1", textbook: "TEXTBOOK CH.15 · pp.285–287",
  objectives: ["Explain the purpose of a program development life cycle.", "Distinguish analysis, design, coding, testing and maintenance.", "Map realistic activities and deliverables to the correct stage.", "Explain why stages communicate and may be revisited."],
  starter: { prompt: "Where belongs 'interview users of the current system': analysis, design, coding, testing or maintenance?", answer: "Analysis. It investigates the current problem, users, inputs/outputs and requirements before a solution is designed." },
  concepts: [
    { label: "ANALYSIS", text: "Investigate current system and problem; establish requirements and success criteria." },
    { label: "DESIGN", text: "Plan algorithms, modules, data structures, interfaces, validation and tests." },
    { label: "CODING", text: "Implement the approved design in program code." },
    { label: "TESTING", text: "Expose faults by comparing actual behaviour with specified expected results." },
    { label: "MAINTENANCE", text: "Correct, adapt or improve software after or during operational use." },
    { label: "LIFE CYCLE", text: "A managed set of connected development stages and feedback, not five isolated labels." },
  ],
  model: { title: "Each stage consumes evidence and produces a deliverable.", code: "ANALYSIS     requirements specification\n      ↓\nDESIGN       algorithms, modules, data, test plan\n      ↓\nCODING       implemented program\n      ↓\nTESTING      actual results, defect reports, acceptance evidence\n      ↓\nMAINTENANCE  corrected/adapted/improved releases\n      ↺       new requirements begin another cycle", note: "The syllabus names five stages. Documentation, review and communication support them but are not extra required stage labels." },
  worked: { title: "Classify a school-booking project.", prompt: "Place four activities and justify each from its purpose.", steps: ["Observe reception workflow → analysis.", "Choose records, modules and screen layout → design.", "Implement procedures → coding.", "Run boundary bookings and fix discovered defects → testing then coding/maintenance."], answer: "Use the activity's purpose, not just its timing. A fault found during formal testing returns to coding; a fault reported after release is corrective maintenance." },
  comparison: { title: "Adjacent stages ask different questions.", rows: [
    { term: "analysis", distinction: "what problem and requirements?", example: "interview users" },
    { term: "design", distinction: "how should the solution work?", example: "choose data structures" },
    { term: "testing", distinction: "does implementation meet specification?", example: "expected vs actual" },
  ] },
  practice: { title: "Sort eight activities into five stages.", prompt: "Interview users; define records; write procedures; create expected results; run tests; install new-hardware support; fix wrong total; improve speed.", cues: ["Separate planned test data from executing tests.", "Use release timing for maintenance contexts.", "Explain ambiguous items using purpose."], answer: "Analysis: interview. Design: records and planned expected results. Coding: write procedures. Testing: run tests. Maintenance: new-hardware support, post-release fault fix and speed improvement." },
  pitfalls: ["Do not treat 'write a test plan' as executing testing; planning normally occurs during design.", "Do not call every change maintenance without checking whether the program is already in use/released.", "The life cycle manages evidence and feedback; it does not guarantee error-free software."],
  examMethod: ["Underline the action verb and the artefact produced by each activity.", "Match requirements to analysis, solution decisions to design and observed behaviour to testing.", "When two stages interact, state both and the direction of feedback rather than guessing one label."],
  papers: [
    { source: "9618/21 O/N 2024 · Q5(a)", marks: "5 MARKS", prompt: "Match five activities to PDLC stages.", cues: [{ label: "WALKTHROUGH", text: "Testing" }, { label: "IMPLEMENT", text: "Coding" }, { label: "INTERVIEW", text: "Analysis" }, { label: "HARDWARE CHANGE", text: "Maintenance" }], answer: "Published matches include walkthrough→Testing, implement algorithm→Coding, interview current-system users→Analysis, change for new hardware→Maintenance and define records/files→Design." },
    { source: "9618/22 O/N 2025 · Q5(a)", marks: "4 MARKS", prompt: "Identify stages from development activities.", cues: [{ label: "REQUIRE", text: "analyse needs" }, { label: "PLAN", text: "design solution" }, { label: "BUILD", text: "code" }, { label: "CHECK / CHANGE", text: "test or maintain" }], answer: "Award the stage whose purpose matches each stated activity: investigate/requirements, plan, implement, compare with expected behaviour, or amend operational software." },
  ],
  retrieval: ["How does Chapter 9 algorithm design fit inside the design stage?", "Where are test expected results first decided?", "Why can maintenance return to analysis?"],
  exit: ["Name all five stages in order.", "Classify one ambiguous activity with a reason.", "State one deliverable from design."],
  homework: {
    instructions: "For each activity, name the stage and justify it from the purpose or deliverable. Do not rely only on chronological order.",
    sections: [
      { code: "A", title: "Purpose and stages", subtitle: "The whole cycle", questions: [
        { prompt: "Explain three purposes of using a development life cycle.", answer: "Structures/manage work, clarifies stage outputs/responsibility, supports review/quality, links requirements to tests and manages change/risk. Any three.", marks: 3 },
        { prompt: "Name the five required stages and place them in a sensible sequence.", answer: "Analysis, design, coding, testing, maintenance. Feedback/repetition may occur.", marks: 3 },
        { prompt: "Give one clear deliverable or activity for each of four stages.", answer: "Examples: analysis requirements; design algorithm/test plan; coding program; testing result/defect report; maintenance release change. Any four matched pairs.", marks: 4 },
      ] },
      { code: "B", title: "Distinguish stages", subtitle: "Evidence and feedback", questions: [
        { prompt: "Distinguish analysis from design using a library system.", answer: "Analysis discovers current problems/user requirements; design decides data structures, algorithms, modules and interface meeting them.", marks: 3 },
        { prompt: "Distinguish coding from testing and explain one feedback link.", answer: "Coding implements the design; testing compares actual with expected. A failed test identifies a fault and sends work back for code correction.", marks: 3 },
        { prompt: "Classify: interview users, define record fields, implement search, compare outputs, support new OS.", answer: "Analysis, design, coding, testing, maintenance respectively.", marks: 4 },
      ] },
      { code: "C", title: "Published-paper application", subtitle: "Activity matching", questions: [
        { prompt: "Adapted from 9618/21 O/N 2024 Q5(a): match interview, record definition and algorithm implementation.", answer: "Interview→Analysis; define records→Design; implement algorithm→Coding.", marks: 3 },
        { prompt: "From the same item, explain why a walkthrough is Testing and new-hardware change is Maintenance.", answer: "Walkthrough exposes faults by checking execution; new hardware requires changing an existing operational program.", marks: 3 },
        { prompt: "Create four new activity-to-stage pairs and justify each.", answer: "Award one precise matched pair each; justification must connect the activity's purpose/deliverable to analysis, design, coding, testing or maintenance.", marks: 4 },
      ] },
    ], challenge: { prompt: "Explain why 'fix a fault' could be coding or maintenance.", answer: "If formal pre-release testing exposes it, developers return to coding; if users report it after release, the change is corrective maintenance. Context determines the label." },
  },
  sourceSummary: "Checked against syllabus 12.1, Coursebook Chapter 15 printed pp.285–287 and published Paper 2 questions/mark schemes.",
  sourceDetail: "Core: lifecycle purpose and the five required stages—analysis, design, coding, testing and maintenance—with activities, deliverables and feedback. Authentic anchors: 9618/21 O/N 2024 Q5(a) [5] and 9618/22 O/N 2025 Q5(a) [4]. Model selection follows in Lesson 58.",
} satisfies PaperTwoLessonSpec;

export default function Lesson57Page() { return <PaperTwoLesson spec={spec} />; }
