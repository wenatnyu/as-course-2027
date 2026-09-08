import "../paper-two-lessons.css";
import { lessonMetadata } from "../_components/lesson-metadata";
import { PaperTwoLesson, type PaperTwoLessonSpec } from "../_components/paper-two-lesson";

export const dynamic = "force-static";
export const metadata = lessonMetadata("61", "Cambridge 9618 faults, syntax/logic/runtime errors and developer testing methods with Paper 2 practice.");

const spec = {
  lessonNumber: "61", chapter: "12", chapterTitle: "Software Development", title: "Faults, Errors & Developer Testing", tagline: "Expose faults deliberately, distinguish what prevents translation from what produces wrong behaviour or failure during execution, then choose a testing method that can reveal the risk.", syllabus: "12.3", textbook: "TEXTBOOK CH.15 · pp.296–303",
  objectives: ["Explain why testing aims to expose rather than prove absence of faults.", "Identify and correct syntax, logic and run-time errors.", "Distinguish dry run, walkthrough, white-box and black-box testing.", "Explain integration testing and the role of a stub."],
  starter: { prompt: "A program runs and outputs an incorrect total. Is that automatically a run-time error?", answer: "No. It is usually a logic error because execution completes but the algorithm/calculation is wrong. A run-time error occurs during execution and may crash, freeze or raise an exception." },
  concepts: [
    { label: "SYNTAX ERROR", text: "Breaks language grammar; translator/editor can usually identify it before successful execution." },
    { label: "LOGIC ERROR", text: "Program runs but produces incorrect behaviour or result." },
    { label: "RUN-TIME ERROR", text: "Occurs while executing, such as division by zero, invalid index or non-terminating loop." },
    { label: "AVOID FAULTS", text: "Use clear requirements, tried/tested design, identifier tables, standard algorithms, modular code and proven libraries." },
    { label: "WHITE / BLACK BOX", text: "Use knowledge of code paths versus test from specification without seeing internals." },
    { label: "STUB / INTEGRATION", text: "Temporary called-module replacement; then combine modules and test their interfaces." },
  ],
  model: { title: "Classify by when and how the fault becomes visible.", code: "IF Score => 50 THEN       // SYNTAX: invalid operator\n   Grade ← 'P'\nENDIF\n\nMean ← Total / Count       // RUN-TIME if Count = 0\n\nArea ← Length + Width      // LOGIC: should multiply\n\nWHILE Index <= 10\n   OUTPUT Data[Index]\nENDWHILE                   // RUN-TIME/freeze: Index never changes", note: "A single line may contain more than one risk. Correct the cause, then retest with data that reaches the repaired path." },
  worked: { title: "Choose a method for each purpose.", prompt: "Need every internal branch, external specification behaviour, a missing payment module and module interfaces.", steps: ["Every branch/path → white-box.", "Specification inputs/outputs → black-box.", "Missing called module → stub.", "Joined module interfaces → integration testing."], answer: "Method plus reason is required. Dry runs and walkthroughs inspect execution manually and can expose logic before or alongside running code." },
  comparison: { title: "Testing methods see different evidence.", rows: [
    { term: "white-box", distinction: "tester knows code and targets paths", example: "both sides of nested IF" },
    { term: "black-box", distinction: "tester uses specification and I/O", example: "valid/invalid login outcomes" },
    { term: "walkthrough", distinction: "people manually inspect/trace", example: "peer review with trace table" },
  ] },
  practice: { title: "Repair and retest four faults.", prompt: "Inspect wrong comparison, unsafe division, array bound and missing loop update.", cues: ["Name error category.", "Change the causal statement.", "Give one test that reaches the repaired case."], answer: "Examples: replace => with >=; guard Count<>0; stop index at upper bound; increment control variable. Test equality boundary, zero count, last valid index and several loop iterations." },
  pitfalls: ["Testing can reveal faults but cannot prove a non-trivial program has no remaining faults; prevention starts with clear requirements and tried/tested structured designs.", "Dry run and walkthrough are listed separately in the syllabus: dry run is manual trace; walkthrough is collaborative review.", "A stub simulates a called module's interface; it is not a completed substitute for final integration testing."],
  examMethod: ["State the observed symptom, classify the error and identify its exact cause.", "Correct only the causal code, preserving the original requirement.", "Choose a method from the evidence needed—internal path, external behaviour, missing dependency or interface."],
  papers: [
    { source: "9618/22 M/J 2025 · Q2(b)", marks: "6 MARKS", prompt: "Explain white-box, stub and black-box testing.", cues: [{ label: "WHITE", text: "select data for code paths" }, { label: "STUB", text: "temporary module with interface" }, { label: "BLACK", text: "specification I/O without code" }], answer: "White-box uses knowledge of code to exercise paths; a stub temporarily stands in for an unavailable called module; black-box derives cases from required inputs/outputs without internal code knowledge." },
    { source: "9618/22 M/J 2024 · Q5(a–b)", marks: "6 MARKS", prompt: "Identify errors, explain a redundant branch and name the run-time category.", cues: [{ label: "THREE ERRORS", text: "two syntax plus one other" }, { label: "OTHERWISE", text: "identify and explain why redundant" }, { label: "CATEGORY", text: "name run-time error" }], answer: "The original asks for two syntax errors and one other error [3], identification/explanation of a redundant OTHERWISE branch [2], and the name run-time error [1]. Answer only the requested diagnosis; correction is a separate syllabus skill." },
  ],
  retrieval: ["How does a trace table support a dry run?", "Which array fault creates a run-time risk?", "Why test module interfaces after individual modules?"],
  exit: ["Classify one error of each type.", "Choose white or black box with reason.", "Define a stub."],
  homework: {
    instructions: "For each fault, identify category, cause, correction and a revealing retest. Distinguish methods by evidence, not by who clicks Run.",
    sections: [
      { code: "A", title: "Classify and correct", subtitle: "Syntax, logic and run-time", questions: [
        { prompt: "Define syntax, logic and run-time errors.", answer: "Syntax violates grammar; logic executes but behaves wrongly; run-time occurs during execution and may stop/freeze/fail.", marks: 3 },
        { prompt: "Classify `IF X => 5`, `Area ← L+W`, and `A[11]` for A[1:10].", answer: "Syntax, logic and run-time respectively (assuming line is executed).", marks: 3 },
        { prompt: "Correct all three and state one development practice that could avoid a similar fault.", answer: "Use >=; use L*W; keep the index within 1:10. Avoidance examples: clear requirements, identifier tables, tried/tested design, standard algorithms, modular structured code or proven library routines.", marks: 4 },
      ] },
      { code: "B", title: "Choose testing methods", subtitle: "Purpose and evidence", questions: [
        { prompt: "Distinguish dry run, walkthrough and white-box testing.", answer: "Dry run manually traces values; walkthrough is collaborative code/design review; white-box designs executable tests from known internal paths.", marks: 3 },
        { prompt: "Distinguish black-box and white-box testing.", answer: "Black-box uses specification/I-O without internal knowledge; white-box uses code structure to exercise paths/conditions.", marks: 3 },
        { prompt: "Explain stub and integration testing with a payment module example.", answer: "Stub mimics unavailable Payment response so caller can be tested; integration then joins real Payment and tests calls, parameter/return data and combined behaviour.", marks: 4 },
      ] },
      { code: "C", title: "Published-paper application", subtitle: "Method selection and repair", questions: [
        { prompt: "Adapted from 9618/22 M/J 2025 Q2(b): choose a method to exercise every path and explain.", answer: "White-box, because tester inspects code/control flow and selects cases that execute each branch/path.", marks: 3 },
        { prompt: "From the same item, explain why a stub is useful before all modules exist.", answer: "It provides the expected interface/sample response so the calling module can be developed/tested without the real child.", marks: 3 },
        { prompt: "Adapted from 9618/22 M/J 2024 Q5: state the three diagnostic demands, then give one fault-avoidance practice.", answer: "Identify two syntax errors and one other error; identify/explain redundant OTHERWISE; name run-time error. One prevention practice: clear requirements, tried/tested design, identifier tables/standard algorithms, modular code or proven libraries.", marks: 4, lines: 6 },
      ] },
    ], challenge: { prompt: "Explain why 100% statement coverage can still miss a fault.", answer: "Every statement may run without testing every branch combination, boundary, input interaction or data state. Coverage evidence is useful but not proof of correctness." },
  },
  sourceSummary: "Checked against syllabus 12.3, Coursebook Chapter 15 printed pp.296–303 and published Paper 2 questions/mark schemes.",
  sourceDetail: "Core: expose and avoid faults using clear requirements and tried/tested structured/modular techniques; syntax, logic and run-time errors; correction; dry run, walkthrough, white-box, black-box, integration and stub testing. Authentic anchors: 9618/22 M/J 2025 Q2(b) [6] and 9618/22 M/J 2024 Q5(a–b) [6]. Dry run and walkthrough are kept distinct.",
} satisfies PaperTwoLessonSpec;

export default function Lesson61Page() { return <PaperTwoLesson spec={spec} />; }
