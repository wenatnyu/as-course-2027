import "../paper-two-lessons.css";
import { lessonMetadata } from "../_components/lesson-metadata";
import { PaperTwoLesson, type PaperTwoLessonSpec } from "../_components/paper-two-lesson";

export const dynamic = "force-static";
export const metadata = lessonMetadata("47", "Cambridge 9618 bubble sort tracing, pseudocode and efficiency with authentic Paper 2 practice.");

const spec = {
  lessonNumber: "47", chapter: "10", chapterTitle: "Data Types and Structures", title: "Bubble Sort: Trace, Write, Improve", tagline: "Compare adjacent values, swap complete records or paired fields together, shrink the unsorted boundary and stop early when a pass makes no swaps.", syllabus: "10.2", textbook: "TEXTBOOK CH.13 · pp.215–218",
  objectives: ["Trace ascending bubble-sort passes accurately.", "Write nested-loop bubble-sort pseudocode using adjacent indices.", "Keep parallel data associated during every swap.", "Improve efficiency with a shrinking boundary and no-swap termination."],
  starter: { prompt: "After one ascending bubble-sort pass through 7, 2, 9, 4, where must the largest value be?", answer: "At the rightmost position. The pass produces 2, 7, 4, 9; adjacent swaps move 9 to its final position." },
  concepts: [
    { label: "PASS", text: "One left-to-right scan of the current unsorted portion." },
    { label: "ADJACENT PAIR", text: "Compare A[Index] with A[Index + 1], never skip an element." },
    { label: "SWAP", text: "Use temporary storage so neither value is lost." },
    { label: "BOUNDARY", text: "After each pass, one largest remaining value is fixed at the right." },
    { label: "NO-SWAP FLAG", text: "A complete pass with no swap proves the array is already sorted." },
    { label: "ASSOCIATED DATA", text: "When keys move, linked names, IDs or record fields must move with them." },
  ],
  model: { title: "Efficient ascending bubble sort.", code: "MaxIndex ← 20\nREPEAT\n   NoSwaps ← TRUE\n   FOR Index ← 1 TO MaxIndex - 1\n      IF A[Index] > A[Index + 1] THEN\n         Temp ← A[Index]\n         A[Index] ← A[Index + 1]\n         A[Index + 1] ← Temp\n         NoSwaps ← FALSE\n      ENDIF\n   NEXT Index\n   MaxIndex ← MaxIndex - 1\nUNTIL NoSwaps = TRUE", note: "Use > rather than >= for a stable ascending comparison. The inner loop stops one position before MaxIndex because it also reads Index + 1." },
  worked: { title: "Trace one pass through 5, 1, 4, 2.", prompt: "State the array after each adjacent comparison and count swaps.", steps: ["5 vs 1: swap → 1, 5, 4, 2.", "5 vs 4: swap → 1, 4, 5, 2.", "5 vs 2: swap → 1, 4, 2, 5.", "Fix 5 at the boundary; next pass ends one element earlier."], answer: "The pass ends 1, 4, 2, 5 with three swaps. The array is not fully sorted, so NoSwaps is FALSE and another pass is required." },
  comparison: { title: "Correctness first; efficiency second.", rows: [
    { term: "fixed full range", distinction: "works but rechecks sorted tail", example: "inner loop always 1 to 19" },
    { term: "shrinking range", distinction: "excludes one fixed item per pass", example: "MaxIndex decreases" },
    { term: "early exit", distinction: "stops after a swap-free pass", example: "NoSwaps remains TRUE" },
  ] },
  practice: { title: "Sort scores while preserving candidate IDs.", prompt: "Two parallel arrays store Score and CandidateID. Sort scores descending.", cues: ["Reverse the comparison for descending order.", "Swap both score elements.", "Use the same temporary-pair pattern for IDs."], answer: "Compare Score[Index] < Score[Index + 1]. When true, swap both Score values and the corresponding CandidateID values so each score remains attached to its candidate." },
  pitfalls: ["The inner loop must end at MaxIndex − 1 because the comparison also accesses Index + 1.", "Reset NoSwaps to TRUE at the start of every pass and set it FALSE only when a swap occurs.", "Sorting one parallel array alone silently corrupts the relationship between associated values."],
  examMethod: ["Write the outer pass control, reset flag and current boundary before the comparison.", "Show adjacent comparison and the full three-assignment swap.", "Finish with flag update, inner-loop end, reduced boundary and correct termination."],
  papers: [
    { source: "9618/21 O/N 2021 · Q2(a)", marks: "6 MARKS", prompt: "Refine an efficient bubble-sort description.", cues: [{ label: "INDEX", text: "traverse adjacent pairs" }, { label: "RANGE", text: "reduce the inner limit" }, { label: "SWAP", text: "compare and exchange" }], answer: "Use repeated passes over adjacent pairs, swapping out-of-order values. Reduce the upper comparison limit after each pass and stop when a full pass produces no swaps." },
    { source: "9618/22 O/N 2022 · Q7(b)", marks: "8 MARKS", prompt: "Sort two parallel arrays efficiently.", cues: [{ label: "LOOPS", text: "outer pass and inner scan" }, { label: "PAIR", text: "swap both arrays" }, { label: "EFFICIENCY", text: "flag and shrinking boundary" }], answer: "The scheme rewards both loops, adjacent comparison, complete swaps in both arrays, a no-swap flag and a reduced boundary. Every associated pair must remain aligned." },
  ],
  retrieval: ["Why does linear search need only one traversal but bubble sort needs passes?", "When can a bubble sort stop before all planned passes?", "How would you swap two whole records?"],
  exit: ["Trace one pass of 3, 2, 1.", "State the safe inner-loop upper limit.", "Explain why parallel arrays must swap together."],
  homework: {
    instructions: "Show every pass or write complete current pseudocode. Keep associated values together and label every efficiency feature.",
    sections: [
      { code: "A", title: "Trace the algorithm", subtitle: "Passes and boundaries", questions: [
        { prompt: "Trace the first pass of ascending bubble sort on 6, 3, 8, 2.", answer: "3, 6, 2, 8 after comparisons: swap 6/3, do not swap 6/8, swap 8/2. The largest value 8 is fixed.", marks: 3 },
        { prompt: "Trace all passes needed to sort 3, 1, 2 and state when it stops.", answer: "Pass 1 → 1,2,3 with swaps. Pass 2 makes no swaps, so the flag remains TRUE and the algorithm stops.", marks: 3 },
        { prompt: "Explain the two independent efficiency improvements in the model.", answer: "Decrease the comparison boundary because the sorted tail grows; stop after a pass with no swaps because the whole active range is ordered.", marks: 4 },
      ] },
      { code: "B", title: "Write bubble sort", subtitle: "Complete pseudocode", questions: [
        { prompt: "Write the three assignments that safely swap A[I] and A[I+1].", answer: "Temp ← A[I]; A[I] ← A[I+1]; A[I+1] ← Temp.", marks: 3 },
        { prompt: "State the code change needed for descending order and explain two parts that remain unchanged.", answer: "Change the adjacent comparison from > to <. The same safe swap pattern and the same boundary/no-swap control remain valid.", marks: 3 },
        { prompt: "Write efficient pseudocode to sort A[1:10] ascending.", answer: "Use MaxIndex 10; REPEAT reset NoSwaps; FOR I 1 TO MaxIndex−1; compare adjacent, three-line swap and set flag FALSE; NEXT; decrement MaxIndex; UNTIL NoSwaps TRUE.", marks: 4, lines: 8 },
      ] },
      { code: "C", title: "Published-paper application", subtitle: "Parallel data and marks", questions: [
        { prompt: "Adapted from 9618/22 O/N 2022 Q7(b): explain how to sort ErrorCode and ErrorText together.", answer: "Compare adjacent ErrorCode values; whenever codes swap, swap the ErrorText elements at the same two indices; use passes, reduced boundary and no-swap flag.", marks: 3 },
        { prompt: "Adapted from 9618/21 O/N 2021 Q2(a): give three features that make a bubble sort efficient.", answer: "Adjacent scan only over unsorted part; decrease upper bound each pass; terminate after a pass with no swaps.", marks: 3 },
        { prompt: "Find and correct four faults in a sort whose inner loop reaches MaxIndex, flag is never reset and only scores swap.", answer: "End inner loop at MaxIndex−1; reset flag TRUE each pass; set it FALSE on a swap; swap associated IDs as well as scores.", marks: 4 },
      ] },
    ], challenge: { prompt: "Explain why using >= can make the sort unstable when equal keys have associated records.", answer: "Equal keys would be swapped even though their key order need not change, so equal-key records can reverse their original relative order. Using > preserves that order." },
  },
  sourceSummary: "Checked against syllabus 10.2, Coursebook Chapter 13 printed pp.215–218 and published Paper 2 questions/mark schemes.",
  sourceDetail: "Core: trace and write bubble sort; adjacent comparison, complete swap, nested loops, decreasing boundary, no-swap exit and associated data. Authentic anchors: 9618/21 O/N 2021 Q2(a) [6] and 9618/22 O/N 2022 Q7(b) [8]. Other sort algorithms and Big-O notation are outside this AS requirement.",
} satisfies PaperTwoLessonSpec;

export default function Lesson47Page() { return <PaperTwoLesson spec={spec} />; }
