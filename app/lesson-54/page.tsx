import "../paper-two-lessons.css";
import { lessonMetadata } from "../_components/lesson-metadata";
import { PaperTwoLesson, type PaperTwoLessonSpec } from "../_components/paper-two-lesson";

export const dynamic = "force-static";
export const metadata = lessonMetadata("54", "Cambridge 9618 count, pre-condition and post-condition loops plus pseudocode efficiency and Paper 2 practice.");

const spec = {
  lessonNumber: "54", chapter: "11", chapterTitle: "Programming", title: "Iteration & Efficient Loops", tagline: "Choose the loop from what is known before entry, place updates where progress is guaranteed and move invariant work outside repeated code.", syllabus: "11.2–11.3", textbook: "TEXTBOOK CH.14 · pp.255–260",
  objectives: ["Write and trace count-controlled FOR loops.", "Write and trace pre-condition WHILE loops that may execute zero times.", "Write and trace post-condition REPEAT...UNTIL loops that execute at least once.", "Justify loop choice and remove avoidable repeated computation."],
  starter: { prompt: "Which loop guarantees its body executes once even when the stopping condition is already true?", answer: "REPEAT...UNTIL, because the condition is tested after the body. WHILE tests before entry and may execute zero times." },
  concepts: [
    { label: "FOR", text: "Count-controlled loop for a known number or inclusive range of iterations." },
    { label: "WHILE", text: "Pre-condition loop; repeat while condition is true, possibly zero times." },
    { label: "REPEAT...UNTIL", text: "Post-condition loop; body runs first, then stops when condition becomes true." },
    { label: "CONTROL VARIABLE", text: "FOR automatically changes it; condition loops usually need an explicit update." },
    { label: "TERMINATION", text: "A reachable state that makes WHILE false or UNTIL true." },
    { label: "INVARIANT WORK", text: "A calculation unchanged across iterations; compute once before the loop." },
  ],
  model: { title: "Three loop shapes in current pseudocode.", code: "FOR Index ← 1 TO 10\n   OUTPUT Index\nNEXT Index\n\nWHILE Balance > 0\n   Balance ← Balance - Payment\nENDWHILE\n\nREPEAT\n   INPUT Password\nUNTIL Password = CorrectPassword", note: "Current WHILE has no DO. FOR ends with NEXT followed by its control identifier. UNTIL is the stopping condition, so avoid mentally reversing it." },
  worked: { title: "Select a loop for three requirements.", prompt: "Choose and justify: process 30 students; read until EOF; request input at least once until valid.", steps: ["30 known repetitions → FOR.", "File may be empty and condition known before read → WHILE NOT EOF.", "Prompt/input must occur before validity is known → REPEAT...UNTIL.", "In each case, state the contextual reason."], answer: "A correct justification includes both construct and property: known count, possible zero iterations, or mandatory first execution." },
  comparison: { title: "Loop choice depends on when repetition is known.", rows: [
    { term: "FOR", distinction: "number/range known before loop", example: "visit indices 1 to 100" },
    { term: "WHILE", distinction: "continue condition checked before body", example: "read while not EOF" },
    { term: "REPEAT", distinction: "stop condition checked after body", example: "input until valid" },
  ] },
  practice: { title: "Repair a non-terminating WHILE loop.", prompt: "Count starts at 1; loop says WHILE Count <= 10 OUTPUT Count ENDWHILE.", cues: ["Identify which value controls entry.", "Add one update on every path.", "Predict the first value after termination."], answer: "Add Count ← Count + 1 inside the loop after output. It outputs 1 through 10, then Count becomes 11 and the condition is false." },
  pitfalls: ["WHILE condition has no DO in the 2027–2029 guide.", "REPEAT stops when UNTIL becomes TRUE; do not write the opposite continuation condition by habit.", "A condition-controlled loop must change data used by its condition on every repeating path or it may never terminate."],
  examMethod: ["Write known count / pre-test / must-run-once beside the requirement before choosing.", "Dry-run 0, 1 and several iterations to expose boundary or termination faults.", "Circle expressions unchanged within the loop and compute them once before entry."],
  papers: [
    { source: "9618/23 M/J 2024 · Q5(a)", marks: "2 MARKS", prompt: "Identify and justify the best loop type.", cues: [{ label: "TYPE", text: "count-controlled" }, { label: "EVIDENCE", text: "iteration count known" }, { label: "CONTEXT", text: "link to supplied range" }], answer: "Use a count-controlled FOR loop because the number of iterations is known before the loop starts." },
    { source: "9618/23 M/J 2024 · Q5(b)", marks: "4 MARKS", prompt: "Find and remove two repeated inefficiencies.", cues: [{ label: "PROBLEM", text: "FormatA/B results unchanged" }, { label: "MOVE", text: "call each routine before loop" }, { label: "REUSE", text: "store local results inside loop" }], answer: "The FormatA and FormatB calls return the same values each iteration, and Label is invariant. Call each once before the loop, store results in local variables and reuse those values in the body." },
  ],
  retrieval: ["How does a linear search combine loop and selection?", "Why is EOF normally a WHILE condition?", "What makes code inside a loop inefficient?"],
  exit: ["Choose a loop for 12 months.", "Choose a loop for password validation.", "State one termination update."],
  homework: {
    instructions: "For every loop, name its type, state why it fits, and prove termination. Use current NEXT/WHILE/REPEAT syntax.",
    sections: [
      { code: "A", title: "Choose a loop", subtitle: "Control and justification", questions: [
        { prompt: "Choose loops for 50 records, zero-or-more file lines and at-least-one menu input.", answer: "FOR for known 50; WHILE for possible empty file/pre-test; REPEAT...UNTIL for mandatory first menu input.", marks: 3 },
        { prompt: "Distinguish pre-condition and post-condition iteration.", answer: "Pre-condition tests before the body and may run zero times; post-condition tests after and therefore runs at least once.", marks: 3 },
        { prompt: "Explain four features that guarantee a WHILE loop terminates correctly.", answer: "Condition reflects requirement; initial value is defined; body updates condition data on every repeating path; boundary operator eventually makes condition false.", marks: 4 },
      ] },
      { code: "B", title: "Write and trace", subtitle: "Exact loop syntax", questions: [
        { prompt: "Write a FOR loop outputting even values 2 through 20.", answer: "FOR Number ← 2 TO 20 STEP 2; OUTPUT Number; NEXT Number.", marks: 3, lines: 4 },
        { prompt: "Write REPEAT...UNTIL that rejects values outside 1 to 10.", answer: "REPEAT; OUTPUT prompt; INPUT Value; UNTIL Value >= 1 AND Value <= 10.", marks: 3, lines: 5 },
        { prompt: "Trace Count=3 in WHILE Count>0: output Count; decrement Count. Give all rows and final value.", answer: "Outputs 3,2,1; updates to 2,1,0; then condition false; final Count 0.", marks: 4 },
      ] },
      { code: "C", title: "Published-paper application", subtitle: "Efficiency and choice", questions: [
        { prompt: "Adapted from 9618/23 M/J 2024 Q5(a): justify count-controlled iteration.", answer: "The number/range of iterations is known before entry, so a FOR loop expresses it directly.", marks: 3 },
        { prompt: "Adapted from Q5(b): explain why the two FormatA/FormatB calls are invariant and how to move them.", answer: "Their argument Label is unchanged, so each returns the same result on every iteration. Call each once before the loop, store both local results and reuse them inside.", marks: 3 },
        { prompt: "Rewrite an inefficient loop so two unchanged function results are calculated once and reused 100 times.", answer: "Before loop assign AResult ← FormatA(...), BResult ← FormatB(...); inside FOR 1 TO 100 use AResult/BResult rather than call functions again.", marks: 4, lines: 6 },
      ] },
    ], challenge: { prompt: "Explain why replacing every WHILE with REPEAT...UNTIL can change a program.", answer: "REPEAT executes the body once before testing, whereas WHILE may skip it. When the initial condition already says stop, the replacement introduces an unwanted iteration and possible invalid access." },
  },
  sourceSummary: "Checked against syllabus 11.2–11.3, Coursebook Chapter 14 printed pp.255–260, the official Pseudocode Guide pp.20–21 and published Paper 2 questions/mark schemes.",
  sourceDetail: "Core: count-, pre-condition and post-condition loops; justified selection; termination; efficient pseudocode. Authentic anchor: 9618/23 M/J 2024 Q5(a–b) [6], with 9618/21 M/J 2025 Q4(a) as a corroborating loop-choice pattern. FOR uses NEXT Identifier and WHILE has no DO.",
} satisfies PaperTwoLessonSpec;

export default function Lesson54Page() { return <PaperTwoLesson spec={spec} />; }
