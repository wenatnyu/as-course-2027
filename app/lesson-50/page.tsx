import "../paper-two-lessons.css";
import { lessonMetadata } from "../_components/lesson-metadata";
import { PaperTwoLesson, type PaperTwoLessonSpec } from "../_components/paper-two-lesson";

export const dynamic = "force-static";
export const metadata = lessonMetadata("50", "Cambridge 9618 abstract data types, stacks and queues with diagram manipulation and Paper 2 practice.");

const spec = {
  lessonNumber: "50", chapter: "10", chapterTitle: "Data Types and Structures", title: "ADTs I: Stacks & Queues", tagline: "Separate the logical rules from the array implementation: stacks expose one end in LIFO order, while queues add at the rear and remove from the front in FIFO order.", syllabus: "10.4", textbook: "TEXTBOOK CH.13 · pp.227–229",
  objectives: ["Define an abstract data type as data plus permitted operations.", "Explain, trace and justify stack LIFO operations.", "Explain, trace and justify queue FIFO operations.", "Describe array, pointer/count and circular-queue implementations."],
  starter: { prompt: "Undo history and a ticket line both remove an item. Why do they require different ADTs?", answer: "Undo removes the most recently added action, so a LIFO stack fits. A ticket line serves the earliest arrival first, so a FIFO queue fits." },
  concepts: [
    { label: "ADT", text: "A collection of data together with the operations allowed on it." },
    { label: "STACK · LIFO", text: "Push and pop at the top; last item added is first removed." },
    { label: "QUEUE · FIFO", text: "Enqueue at rear, dequeue at front; first added is first removed." },
    { label: "FULL / EMPTY", text: "Guards prevent insertion beyond capacity and removal when no item exists." },
    { label: "POINTER + COUNT", text: "Implementation variables record valid positions and the number of stored elements." },
    { label: "CIRCULAR QUEUE", text: "Front/rear wrap to the first array index so freed cells can be reused." },
  ],
  model: { title: "State the invariant before tracing pointers.", code: "STACK (top is last occupied index)\nData:  [A][B][C][ ][ ]   Top = 3   Count = 3\nPOP → returns C; Top = 2; Count = 2\n\nQUEUE (circular, 1..5)\nData:  [D][ ][ ][B][C]   Front = 4   Rear = 1\nDEQUEUE → returns B; Front = 5\nENQUEUE E → Rear = 2; Data[2] = E", note: "Papers use different pointer conventions. Always read whether a pointer means the occupied item or the next free position before updating it." },
  worked: { title: "Trace four operations without writing ADT code.", prompt: "Start with empty structures. Apply add A, add B, remove, add C.", steps: ["Stack after A,B is bottom A, top B.", "Stack remove returns B; add C leaves A,C.", "Queue after A,B has front A, rear B.", "Queue remove returns A; add C leaves B,C."], answer: "The same operation words produce different removed values: stack removes B (latest); queue removes A (earliest). That ordering rule is the key justification." },
  comparison: { title: "Choose from the removal order required.", rows: [
    { term: "stack", distinction: "last in, first out", example: "undo, backtracking, call history" },
    { term: "queue", distinction: "first in, first out", example: "print jobs, customers, messages" },
    { term: "circular queue", distinction: "FIFO plus array-space reuse", example: "fixed-size streaming buffer" },
  ] },
  practice: { title: "Design a five-slot circular queue state.", prompt: "Front is 5, rear is 1 and two items are stored. Enqueue X, then dequeue once.", cues: ["Agree whether rear is occupied or next-free.", "Wrap after upper bound.", "Update count exactly once per operation."], answer: "Under an occupied-rear convention, enqueue advances Rear from 1 to 2 and stores X; dequeue removes Data[5] and wraps Front to 1. Count rises then falls, returning to its original value." },
  pitfalls: ["Do not justify an ADT only by naming it; connect LIFO/FIFO to the scenario's required removal order.", "Null/empty and pointer conventions vary across papers; state the invariant before a trace.", "The 2027 syllabus requires using and describing these ADTs but explicitly says ADT pseudocode is not required."],
  examMethod: ["Draw the initial array, pointers and count before applying operations.", "For every add/remove, record returned value, changed pointer and changed count.", "For a choice question, name the ADT, state LIFO/FIFO and link that order to the context."],
  papers: [
    { source: "9618/22 O/N 2024 · Q3(a–b)", marks: "7 MARKS", prompt: "Interpret a stack implementation, pointer/count and full condition.", cues: [{ label: "INVARIANT", text: "what Top points to" }, { label: "CAPACITY", text: "60 array positions" }, { label: "GUARD", text: "full before adding" }], answer: "Use the stated pointer convention and Count to identify valid contents and the full state. Update the top/count in the required order. Any legacy code part is guided extension, not a current requirement." },
    { source: "9618/23 O/N 2023 · Q3(a–b)", marks: "9 MARKS", prompt: "Read and update a circular queue representation.", cues: [{ label: "FRONT", text: "next item removed" }, { label: "REAR", text: "insertion position/convention" }, { label: "WRAP", text: "after upper bound return to lower" }], answer: "The mark scheme rewards correct pointer meanings, a full guard, wrap-around, count update and storing the new value at the correct indexed position." },
  ],
  retrieval: ["How is an ADT different from its backing array?", "Which order does a printer queue require and why?", "Why can a circular queue reuse space?"],
  exit: ["Define LIFO.", "Define FIFO.", "State one full/empty invariant."],
  homework: {
    instructions: "State the pointer convention before every trace. Focus on operations, order and array implementation; full ADT pseudocode is not required by the current syllabus.",
    sections: [
      { code: "A", title: "Understand the ADTs", subtitle: "Data, operations and order", questions: [
        { prompt: "Define ADT and name three operations across stacks or queues.", answer: "An ADT combines data with permitted operations. Examples: push, pop, enqueue/add, dequeue/remove, inspect top/front.", marks: 3 },
        { prompt: "Explain why browser Back uses a stack.", answer: "The most recently visited page should be returned to first; a stack's LIFO order matches that requirement.", marks: 3 },
        { prompt: "Explain why a print spooler uses a queue and describe add/remove ends.", answer: "Jobs should normally print in arrival order, so FIFO applies; enqueue at rear and dequeue from front.", marks: 4 },
      ] },
      { code: "B", title: "Trace implementations", subtitle: "Pointers, counts and wrap-around", questions: [
        { prompt: "A stack contains A,B,C with C on top. State results after pop, push D, pop.", answer: "First pop returns C; push D places D above B; second pop returns D; A,B remain.", marks: 3 },
        { prompt: "A queue contains A,B,C from front to rear. State results after dequeue, enqueue D, dequeue.", answer: "First returns A; D joins rear; second returns B; queue then contains C,D.", marks: 3 },
        { prompt: "Describe four steps for adding to a fixed circular queue safely.", answer: "Check not full; advance/wrap rear according to convention; store item at rear; increment count. State convention before steps.", marks: 4 },
      ] },
      { code: "C", title: "Published-paper application", subtitle: "State and justification", questions: [
        { prompt: "Adapted from 9618/22 O/N 2024 Q3: explain how Count identifies an empty and full 60-item stack.", answer: "Empty when Count = 0; full when Count = 60; valid values between show the exact number stored.", marks: 3 },
        { prompt: "Adapted from 9618/23 O/N 2023 Q3: explain wrap-around in an array queue.", answer: "When a pointer would move beyond the upper bound, set it to the lower bound so freed earlier positions can be reused.", marks: 3 },
        { prompt: "Choose stack or queue for four scenarios and justify each with LIFO/FIFO.", answer: "Award one linked choice per scenario: undo/call return generally stack LIFO; ticket line/print jobs generally queue FIFO.", marks: 4 },
      ] },
    ], challenge: { prompt: "Explain why Count can distinguish full from empty when Front = Rear in a circular queue.", answer: "The same pointer equality can occur in both states after wrapping. Count = 0 identifies empty and Count = capacity identifies full." },
  },
  sourceSummary: "Checked against syllabus 10.4, Coursebook Chapter 13 printed pp.227–229 and published Paper 2 questions/mark schemes.",
  sourceDetail: "Core: ADT meaning; stack/queue features and justified selection; manipulating contents; array, pointer/count and circular implementations. Authentic anchors: 9618/22 O/N 2024 Q3(a–b) [7] and 9618/23 O/N 2023 Q3(a–b) [9]. Current syllabus note: ADT pseudocode is not required.",
} satisfies PaperTwoLessonSpec;

export default function Lesson50Page() { return <PaperTwoLesson spec={spec} />; }
