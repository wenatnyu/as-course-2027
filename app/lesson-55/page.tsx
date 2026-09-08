import "../paper-two-lessons.css";
import { lessonMetadata } from "../_components/lesson-metadata";
import { PaperTwoLesson, type PaperTwoLessonSpec } from "../_components/paper-two-lesson";

export const dynamic = "force-static";
export const metadata = lessonMetadata("55", "Cambridge 9618 modules, scope, procedures and functions using current pseudocode and Paper 2 practice.");

const spec = {
  lessonNumber: "55", chapter: "11", chapterTitle: "Programming", title: "Modules, Scope, Procedures & Functions", tagline: "Give each module one coherent job, control what it can access and choose a procedure for an action or a function for one value used in an expression.", syllabus: "11.3 · PP EXTENSION", textbook: "TEXTBOOK CH.14 · pp.262–269",
  objectives: ["Past-paper/textbook extension: explain how modules improve reuse, testing and maintenance.", "Past-paper/textbook extension: distinguish local and global scope.", "Syllabus 11.3: define and call procedures with zero, one or more parameters.", "Syllabus 11.3: define functions that return one value and use calls inside expressions."],
  starter: { prompt: "Which call belongs in an expression: CALL DisplayMenu() or Tax ← CalculateTax(Price)?", answer: "Tax ← CalculateTax(Price), because a function returns one value that replaces its call in an expression. CALL DisplayMenu() invokes a procedure statement." },
  concepts: [
    { label: "PP EXTENSION · MODULE", text: "A named self-contained part that performs one defined task." },
    { label: "PP EXTENSION · LOCAL", text: "Visible only inside its module; protects state and permits name reuse." },
    { label: "PP EXTENSION · GLOBAL", text: "Accessible across modules; convenient but easier to change accidentally." },
    { label: "PROCEDURE", text: "Performs an action and is invoked with CALL; it does not return one function value." },
    { label: "FUNCTION", text: "Computes one value using RETURN; its call is used within an expression." },
    { label: "INTERFACE", text: "The module header plus parameters/return information visible to callers." },
  ],
  model: { title: "Current procedure and function patterns.", code: "PROCEDURE ShowTotal(Value : REAL)\n   OUTPUT Value\nENDPROCEDURE\n\nFUNCTION IsEven(Number : INTEGER) RETURNS BOOLEAN\n   RETURN Number MOD 2 = 0\nENDFUNCTION\n\nCALL ShowTotal(18.5)\nFlag ← IsEven(Count)", note: "No-parameter modules still use (). A function call has no CALL keyword and must provide the value required by an expression." },
  worked: { title: "Split a checkout into coherent modules.", prompt: "Classify InputBasket, CalculateTotal and PrintReceipt.", steps: ["InputBasket changes/fills shared or referenced data → procedure.", "CalculateTotal produces one numeric result → function.", "PrintReceipt performs output → procedure.", "Keep loop counters and intermediate totals local."], answer: "One valid interface: PROCEDURE InputBasket(...); FUNCTION CalculateTotal(...) RETURNS REAL; PROCEDURE PrintReceipt(...). The exact parameters depend on the supplied data design." },
  comparison: { title: "Choose by the caller's need.", rows: [
    { term: "procedure", distinction: "perform an action; CALL statement", example: "CALL PrintReceipt(Order)" },
    { term: "function", distinction: "produce one typed value", example: "Total ← CalculateTotal(Order)" },
    { term: "local scope", distinction: "data hidden within module", example: "Index exists only while searching" },
  ] },
  practice: { title: "Write three module headers.", prompt: "Display one INTEGER, test a REAL threshold, and reset a STRING through a procedure.", cues: ["Display is a procedure.", "Threshold test returns BOOLEAN.", "Reset action is a procedure; reference passing comes next lesson."], answer: "PROCEDURE Display(Value : INTEGER); FUNCTION AboveLimit(Value : REAL) RETURNS BOOLEAN; PROCEDURE Reset(Text : STRING). Complete each with matching end keyword." },
  pitfalls: ["A function call is never prefixed with CALL; use it where a value is expected.", "Do not use global variables by default: hidden dependencies make modules harder to test and reuse.", "Do not write old MODULE...ENDMODULE; the current guide defines PROCEDURE and FUNCTION only."],
  examMethod: ["Underline the module's single job and whether the caller needs a returned value.", "Write the complete header/interface before the body: name, typed parameters and return type if any.", "Check call syntax, argument order, local declarations and matching ENDPROCEDURE/ENDFUNCTION."],
  papers: [
    { source: "9618/23 M/J 2025 · Q1(a)", marks: "5 MARKS", prompt: "Explain module benefits and local/global scope.", cues: [{ label: "MODULE", text: "reuse, isolate task, reduce complexity" }, { label: "SCOPE", text: "local only inside; global throughout" }, { label: "LOCAL", text: "protect data, reuse names, easier test" }], answer: "Marks include reusable/specific modules, lower complexity and easier testing/debugging/maintenance; local variables are visible only within their module, while globals are program-wide; locals reduce accidental changes and support self-contained code." },
    { source: "9618/23 M/J 2025 · Q6(a–b)", marks: "6 MARKS", prompt: "Distinguish procedure/function and complete three headers.", cues: [{ label: "RETURN", text: "function returns one value; procedure does not" }, { label: "TYPES", text: "every parameter typed" }, { label: "HEADER", text: "include RETURNS or BYREF exactly" }], answer: "A function returns one value while a procedure does not (and a procedure may update BYREF parameters). Valid headers: PROCEDURE Sub_Part1A(R : INTEGER); FUNCTION Sub_Part2A(T : REAL) RETURNS BOOLEAN; PROCEDURE Sub_Part3A(V : INTEGER, W : BOOLEAN, BYREF U : STRING)." },
  ],
  retrieval: ["How does decomposition in Chapter 9 lead to modules here?", "Why does a function call replace an expression value?", "What risk does a global loop counter create?"],
  exit: ["Write a no-parameter procedure header.", "Call a function in an assignment.", "State one local-variable benefit."],
  homework: {
    instructions: "Use only current PROCEDURE/FUNCTION syntax. Write () even for no parameters; use CALL only for procedures and put function calls inside expressions.",
    sections: [
      { code: "A", title: "Modular design", subtitle: "Purpose and scope", questions: [
        { prompt: "Give three benefits of dividing a program into modules.", answer: "Any three: reduce complexity, isolate specific jobs, reuse, independent testing/debugging, easier maintenance, team development.", marks: 3 },
        { prompt: "Distinguish local and global variables.", answer: "Local is declared/accessible only within its module and lifetime/context; global is accessible across the program/modules.", marks: 3 },
        { prompt: "Explain four reasons to prefer local variables where possible.", answer: "Prevent accidental external change; hide implementation; reuse names; self-contained modules; easier testing; memory may be reused. Any four.", marks: 4 },
      ] },
      { code: "B", title: "Procedures and functions", subtitle: "Definition and call", questions: [
        { prompt: "Write and call a no-parameter procedure ClearScreen().", answer: "PROCEDURE ClearScreen() ... ENDPROCEDURE; CALL ClearScreen(). Parentheses are required.", marks: 3, lines: 5 },
        { prompt: "Write a function Square(N : INTEGER) returning INTEGER.", answer: "FUNCTION Square(N : INTEGER) RETURNS INTEGER; RETURN N * N; ENDFUNCTION.", marks: 3, lines: 5 },
        { prompt: "Explain four differences between procedure use and function use.", answer: "Procedure called with CALL and performs action; function returns one value with RETURN, declares RETURNS type and is used inside an expression without CALL.", marks: 4 },
      ] },
      { code: "C", title: "Published-paper application", subtitle: "Headers and reasoning", questions: [
        { prompt: "Adapted from 9618/23 M/J 2025 Q1(a): give two module benefits and one local-scope benefit.", answer: "Examples: reuse and independent testing; local data cannot be accidentally changed elsewhere. Any valid 2+1.", marks: 3 },
        { prompt: "Adapted from Q6: write headers for a procedure with INTEGER R and function with REAL T returning BOOLEAN.", answer: "PROCEDURE Sub_Part1A(R : INTEGER); FUNCTION Sub_Part2A(T : REAL) RETURNS BOOLEAN.", marks: 3 },
        { prompt: "Correct four errors: MODULE F(X), RETURN X, ENDMODULE, CALL F(3) in an assignment.", answer: "Use FUNCTION F(X : suitable type) RETURNS type; keep RETURN; ENDFUNCTION; write Result ← F(3) without CALL.", marks: 4, lines: 5 },
      ] },
    ], challenge: { prompt: "Explain how a pure function with only local state is easier to test.", answer: "Its output depends only on explicit arguments and it does not change hidden global state, so the same inputs give a predictable value and tests need fewer environmental assumptions." },
  },
  sourceSummary: "Checked against syllabus 11.3, Coursebook Chapter 14 printed pp.262–269, the official Pseudocode Guide pp.22–24 and published Paper 2 questions/mark schemes.",
  sourceDetail: "Syllabus core: procedures/functions, headers, interfaces, calls and return values. Module benefits and local/global scope are clearly labelled textbook/past-paper extension because recent papers assess them although the 2027–2029 bullet list does not name them explicitly. Authentic anchors: 9618/23 M/J 2025 Q1(a) [5] and Q6(a–b) [6]. Old MODULE syntax is replaced by current PROCEDURE/FUNCTION syntax.",
} satisfies PaperTwoLessonSpec;

export default function Lesson55Page() { return <PaperTwoLesson spec={spec} />; }
