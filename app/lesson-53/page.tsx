import "../paper-two-lessons.css";
import { lessonMetadata } from "../_components/lesson-metadata";
import { PaperTwoLesson, type PaperTwoLessonSpec } from "../_components/paper-two-lesson";

export const dynamic = "force-static";
export const metadata = lessonMetadata("53", "Cambridge 9618 IF, nested IF and CASE selection using 2027 pseudocode and Paper 2 questions.");

const spec = {
  lessonNumber: "53", chapter: "11", chapterTitle: "Programming", title: "Selection: IF, Nested IF & CASE", tagline: "Choose one path from conditions that are complete, mutually sensible and ordered so every required case—including boundaries—reaches the right action.", syllabus: "11.2", textbook: "TEXTBOOK CH.14 · pp.250–255",
  objectives: ["Write IF, ELSE and ENDIF with Boolean conditions.", "Use nested IF for dependent or prioritised decisions.", "Use CASE OF for discrete values and inclusive ranges.", "Select and justify IF or CASE from the decision structure."],
  starter: { prompt: "A pass mark is 50. Should 50 follow the pass or fail path in IF Mark > 50?", answer: "It follows the fail path, which exposes a boundary fault. If 50 is a pass, the condition must be Mark >= 50." },
  concepts: [
    { label: "IF", text: "Execute a block only when one Boolean condition is TRUE." },
    { label: "ELSE", text: "Provide the alternative path when the IF condition is FALSE." },
    { label: "NESTED IF", text: "Place a second decision within a branch when its test depends on the first." },
    { label: "CASE OF", text: "Choose among discrete identifier values or inclusive value ranges." },
    { label: "OTHERWISE", text: "Catch any value not covered by earlier CASE branches; place it last." },
    { label: "BOUNDARY", text: "A value exactly at a limit; operators must place it deliberately." },
  ],
  model: { title: "Current CASE and IF syntax.", code: "IF Mark >= 80 THEN\n   Grade ← 'A'\nELSE\n   IF Mark >= 60 THEN\n      Grade ← 'B'\n   ELSE\n      Grade ← 'C'\n   ENDIF\nENDIF\n\nCASE OF Choice\n   1 TO 2 : Fee ← 5.0\n   3 : Fee ← 7.5\n   OTHERWISE : Fee ← 0.0\nENDCASE", note: "CASE branches contain a value or low TO high range followed by a colon. Do not prefix branches with CASE or use unsupported labels such as <10." },
  worked: { title: "Design non-overlapping ticket bands.", prompt: "Ages 0–4 free, 5–15 child, otherwise adult. Place both boundaries exactly.", steps: ["First test Age < 0 as invalid if required.", "Test Age <= 4 for free.", "Else test Age <= 15 for child.", "Else assign adult."], answer: "Ordered nested IF avoids overlap: after Age <= 4 is false, the next Age <= 15 branch implicitly means 5–15." },
  comparison: { title: "Match the construct to the shape of the decision.", rows: [
    { term: "simple IF", distinction: "optional action; no alternative needed", example: "add discount if member" },
    { term: "IF ... ELSE", distinction: "two Boolean outcomes", example: "valid or invalid" },
    { term: "CASE", distinction: "one identifier matched to values/ranges", example: "menu choice 1 to 4" },
  ] },
  practice: { title: "Map a month to a quarter using CASE.", prompt: "Write four range branches and an invalid OTHERWISE branch.", cues: ["Use 1 TO 3, 4 TO 6, 7 TO 9, 10 TO 12.", "Assign Quarter in each valid branch.", "Use OTHERWISE last."], answer: "CASE OF Month with the four inclusive ranges assigning 1,2,3,4; OTHERWISE output invalid or assign a documented sentinel; ENDCASE." },
  pitfalls: ["IF condition THEN is one header; do not copy the textbook style that places THEN on a separate logical form.", "CASE OF uses one identifier and explicit values/ranges; unsupported relational labels such as <10 should be rewritten.", "Overlapping or missing boundaries create logic errors even when syntax is valid."],
  examMethod: ["List all outcomes and their exact value sets before writing keywords.", "Order nested conditions so earlier branches remove values from later tests.", "Dry-run boundary values and one OTHERWISE value against the finished selection."],
  papers: [
    { source: "9618/23 O/N 2024 · Q4(a)", marks: "4 MARKS", prompt: "Complete a grade-band search using IF and AND.", cues: [{ label: "BOUND", text: "loop reaches 5" }, { label: "UPPER", text: "upper = boundary + 2" }, { label: "RANGE", text: "Mark >= Lower AND Mark <= Upper" }], answer: "The published four completions are the loop end value 5, the correct upper-bound expression, Mark >= Lower and Mark <= Upper." },
    { source: "9618/23 O/N 2025 · Q5(b)", marks: "3 MARKS", prompt: "Combine two identical CASE branches correctly.", cues: [{ label: "RANGE", text: "write 1 TO 2 :" }, { label: "IDENTIFIER", text: "use CaseVar in the update" }, { label: "CLAUSE", text: "preserve complete branch action" }], answer: "Merge the two cases with the current range label 1 TO 2 :. The branch must use CaseVar rather than a hard-coded literal when updating Index/Count, as required by the original logic." },
  ],
  retrieval: ["How does a flowchart diamond map to pseudocode selection?", "Why can CASE not replace every IF condition?", "Which test values expose a grade-boundary error?"],
  exit: ["Write one IF ... ELSE skeleton.", "Write one CASE range branch.", "Test values around >= 50."],
  homework: {
    instructions: "Use current IF and CASE syntax. Show mutually complete branches and test every exact boundary before revealing answers.",
    sections: [
      { code: "A", title: "Choose and reason", subtitle: "Selection structure", questions: [
        { prompt: "Distinguish simple IF, IF...ELSE and nested IF.", answer: "Simple IF has an optional true branch; IF...ELSE chooses one of two paths; nested IF makes another decision inside a branch.", marks: 3 },
        { prompt: "Give three reasons CASE suits a four-option menu.", answer: "One identifier is compared; choices are discrete; branches are clearer than repeated equality IFs; OTHERWISE catches invalid values. Any three.", marks: 3 },
        { prompt: "For bands <10, 10–19 and >=20, give four test values and expected branches.", answer: "Examples 9→first, 10→second, 19→second, 20→third. These cover both sides of both boundaries.", marks: 4 },
      ] },
      { code: "B", title: "Write selection", subtitle: "IF and CASE", questions: [
        { prompt: "Write IF...ELSE assigning Adult TRUE when Age >= 18.", answer: "IF Age >= 18 THEN Adult ← TRUE ELSE Adult ← FALSE ENDIF.", marks: 3, lines: 4 },
        { prompt: "Write a nested IF assigning A for >=80, B for >=60, else C.", answer: "Test >=80 first; ELSE test >=60; nested ELSE C; close both ENDIF blocks.", marks: 3, lines: 6 },
        { prompt: "Write CASE OF Month assigning quarter 1–4 and handling invalid values.", answer: "Use 1 TO 3, 4 TO 6, 7 TO 9, 10 TO 12 branches and OTHERWISE; close ENDCASE.", marks: 4, lines: 7 },
      ] },
      { code: "C", title: "Published-paper application", subtitle: "Complete and correct", questions: [
        { prompt: "Adapted from 9618/23 O/N 2024 Q4(a): write a Boolean expression that includes both inclusive limits.", answer: "Mark >= Lower AND Mark <= Upper. Both comparisons must apply to Mark and both endpoints are included.", marks: 3 },
        { prompt: "Adapted from 9618/23 O/N 2025 Q5(b): write the current CASE range label for values 1 and 2.", answer: "1 TO 2 : followed by the shared statements.", marks: 3 },
        { prompt: "Correct four faults in a CASE that uses CASE 1, <10, no OTHERWISE and no ENDCASE.", answer: "Start CASE OF Identifier; use value/range then colon; replace <10 with a valid inclusive range; add OTHERWISE if required and ENDCASE.", marks: 4, lines: 5 },
      ] },
    ], challenge: { prompt: "Explain when ordered IF tests remove the need for a compound lower-bound condition.", answer: "If earlier branches already handle all smaller values, reaching a later `IF Mark >= 60` implies the upper alternatives failed; the path context supplies the other bound." },
  },
  sourceSummary: "Checked against syllabus 11.2, Coursebook Chapter 14 printed pp.250–255, the official Pseudocode Guide pp.18–19 and published Paper 2 questions/mark schemes.",
  sourceDetail: "Core: IF including ELSE and nested IF, CASE OF, value/range branches, OTHERWISE and boundary correctness. Authentic anchors: 9618/23 O/N 2024 Q4(a) [4] and 9618/23 O/N 2025 Q5(b) [3]. Unsupported old CASE relational labels are replaced with current range syntax.",
} satisfies PaperTwoLessonSpec;

export default function Lesson53Page() { return <PaperTwoLesson spec={spec} />; }
