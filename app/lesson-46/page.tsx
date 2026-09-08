import "../paper-two-lessons.css";
import { lessonMetadata } from "../_components/lesson-metadata";
import { PaperTwoLesson, type PaperTwoLessonSpec } from "../_components/paper-two-lesson";

export const dynamic = "force-static";
export const metadata = lessonMetadata("46", "Cambridge 9618 one-dimensional arrays and linear search with current pseudocode and Paper 2 practice.");

const spec = {
  lessonNumber: "46", chapter: "10", chapterTitle: "Data Types and Structures", title: "1D Arrays & Linear Search", tagline: "Store a fixed sequence under one identifier, traverse every valid index safely and make both found and not-found outcomes explicit.", syllabus: "10.2", textbook: "TEXTBOOK CH.13 · pp.212–215",
  objectives: ["Use index, lower bound and upper bound accurately.", "Declare, initialise, traverse and update a one-dimensional array.", "Select an array when many values share one type and purpose.", "Write and trace a linear search with a defined not-found result."],
  starter: { prompt: "How many elements are in ARRAY[4:12], and which indices are valid?", answer: "There are 12 − 4 + 1 = 9 elements. Valid indices are every integer from 4 through 12 inclusive." },
  concepts: [
    { label: "INDEX", text: "The integer position used to address one array element." },
    { label: "LOWER BOUND", text: "The first valid index; it need not be zero or one." },
    { label: "UPPER BOUND", text: "The last valid index; size is upper − lower + 1." },
    { label: "TRAVERSAL", text: "Visit each required valid index exactly once using a controlled loop." },
    { label: "LINEAR SEARCH", text: "Compare the target with elements in order until found or the range is exhausted." },
    { label: "NOT FOUND", text: "A deliberate Boolean, sentinel index or message—not an accidental out-of-range access." },
  ],
  model: { title: "Declare once; use an index to process many values.", code: "DECLARE Scores : ARRAY[1:30] OF INTEGER\nDECLARE Index : INTEGER\nDECLARE Total : INTEGER\nTotal ← 0\nFOR Index ← 1 TO 30\n   Total ← Total + Scores[Index]\nNEXT Index\nOUTPUT Total", note: "Bounds are inclusive. The loop variable takes every valid position from 1 to 30 and never accesses Scores[31]." },
  worked: { title: "Search Names[1:20] for a target.", prompt: "Design a search that reports the first matching index or 0 when absent.", steps: ["Set Index to the lower bound and Found to FALSE.", "While still in range and not Found, compare Names[Index].", "On a match store the result; otherwise advance Index.", "Output the stored index, including the not-found sentinel."], answer: "Use WHILE Index <= 20 AND NOT Found. If Names[Index] = Target, set Found TRUE and Position ← Index; otherwise increment Index. Initialise Position ← 0 so absence is explicit." },
  comparison: { title: "One array decision, three different jobs.", rows: [
    { term: "direct access", distinction: "known index selects one element", example: "Scores[7]" },
    { term: "full traversal", distinction: "every valid element is processed", example: "sum all 30 scores" },
    { term: "linear search", distinction: "stop on a match or after last index", example: "find first occurrence of a name" },
  ] },
  practice: { title: "Find the smallest temperature and its index.", prompt: "Temperatures[1:24] stores REAL values. Write the safe initialisation and update logic.", cues: ["Initialise from element 1, not an invented extreme.", "Begin comparisons at index 2.", "Update value and index together."], answer: "MinTemp ← Temperatures[1]; MinIndex ← 1; FOR Index ← 2 TO 24; IF Temperatures[Index] < MinTemp THEN update both; NEXT Index; output MinIndex and MinTemp." },
  pitfalls: ["Array bounds are inclusive: ARRAY[1:30] has 30 elements, not 29.", "Do not use slice notation such as Scores[1 TO 30]; process elements using an index.", "A search must define what happens when the target is absent and must test the bound before accessing an element."],
  examMethod: ["Copy the declared bounds into the loop before writing its body.", "Initialise best-value searches from a real array element and preserve its index.", "For a search, show comparison, update/advance, termination and found/not-found output."],
  papers: [
    { source: "9618/23 O/N 2023 · Q2(a–c)", marks: "9 MARKS", prompt: "Find the smallest element/index, justify arrays and redeclare 120 REAL values.", cues: [{ label: "INITIALISE", text: "use first element and index" }, { label: "TRAVERSE", text: "visit remaining valid indices" }, { label: "UPDATE", text: "value and index together" }], answer: "Initialise the minimum from the first element, scan the rest, compare and update both minimum and index. Arrays give indexed storage of many same-type values. The declaration is DECLARE ... : ARRAY[1:120] OF REAL." },
    { source: "9618/21 O/N 2022 · Q3", marks: "5 MARKS", prompt: "Describe a scan that finds the largest value.", cues: [{ label: "START", text: "sensible initial largest value" }, { label: "LOOP", text: "complete traversal" }, { label: "FINISH", text: "update then output" }], answer: "Set Largest to the first valid element; iterate through the remaining array; if the current element is greater, replace Largest; output it after the loop." },
  ],
  retrieval: ["Why can a record be an array element even though fields have different types?", "What is the size formula for arbitrary inclusive bounds?", "How can AND prevent an out-of-bounds search?"],
  exit: ["Declare 40 REAL readings.", "Write valid indices for ARRAY[5:9].", "State one explicit not-found design."],
  homework: {
    instructions: "Write current pseudocode with inclusive bounds. For every search, show initialisation, safe termination and both outcomes.",
    sections: [
      { code: "A", title: "Array foundations", subtitle: "Bounds, declaration and access", questions: [
        { prompt: "For ARRAY[-2:6], state the lower bound, upper bound and number of elements.", answer: "Lower −2; upper 6; size 6 − (−2) + 1 = 9.", marks: 3 },
        { prompt: "Declare an array Ages for 25 INTEGER values and assign 16 to its fifth element.", answer: "DECLARE Ages : ARRAY[1:25] OF INTEGER; Ages[5] ← 16.", marks: 3 },
        { prompt: "Write pseudocode to input 25 ages and count how many are at least 18.", answer: "Initialise Count to 0; FOR Index ← 1 TO 25; INPUT Ages[Index]; IF Ages[Index] >= 18 THEN Count ← Count + 1; ENDIF; NEXT Index; OUTPUT Count.", marks: 4, lines: 6 },
      ] },
      { code: "B", title: "Search safely", subtitle: "Found and not found", questions: [
        { prompt: "State three essential features of a linear search.", answer: "Compare target with indexed elements; advance through valid range; stop on match or exhaustion and report the outcome.", marks: 3 },
        { prompt: "Explain why WHILE Data[Index] <> Target can fail.", answer: "It has no bounds check; if the target is absent, Index eventually addresses beyond the array and causes a run-time error.", marks: 3 },
        { prompt: "Write a search of Codes[1:50] returning Position 0 when Target is absent.", answer: "Set Position 0, Index 1; WHILE Index <= 50 AND Position = 0; if Codes[Index] = Target set Position ← Index else increment; ENDWHILE; return/output Position.", marks: 4, lines: 7 },
      ] },
      { code: "C", title: "Published-paper application", subtitle: "Minimum and declaration", questions: [
        { prompt: "Adapted from 9618/23 O/N 2023 Q2: initialise a minimum search and explain why the first element is used.", answer: "Min ← Data[1] and MinIndex ← 1. It is a valid domain value and avoids assuming an arbitrary extreme.", marks: 3 },
        { prompt: "Adapted from 9618/21 O/N 2022 Q3: describe the compare-and-update stage of a maximum scan.", answer: "For each remaining element, compare it with Largest; when greater, assign that element to Largest; after all elements output Largest.", marks: 3 },
        { prompt: "Declare 120 REAL values, then write a loop that increases every element by 1.5.", answer: "DECLARE Values : ARRAY[1:120] OF REAL; FOR I ← 1 TO 120; Values[I] ← Values[I] + 1.5; NEXT I.", marks: 4, lines: 5 },
      ] },
    ], challenge: { prompt: "Modify a linear search so it counts every occurrence rather than stopping at the first.", answer: "Initialise Count to 0, traverse the complete valid range and increment Count whenever the current element equals Target. Do not use Found to stop early." },
  },
  sourceSummary: "Checked against syllabus 10.2, Coursebook Chapter 13 printed pp.212–215, the official Pseudocode Guide and published Paper 2 questions/mark schemes.",
  sourceDetail: "Core: index/lower/upper bound, exact 1D declaration and processing, safe traversal and linear search. Authentic anchors: 9618/23 O/N 2023 Q2(a–c) [9] and 9618/21 O/N 2022 Q3 [5]. Binary search is not required in this section.",
} satisfies PaperTwoLessonSpec;

export default function Lesson46Page() { return <PaperTwoLesson spec={spec} />; }
