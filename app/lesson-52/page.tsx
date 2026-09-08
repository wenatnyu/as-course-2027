import "../paper-two-lessons.css";
import { lessonMetadata } from "../_components/lesson-metadata";
import { PaperTwoLesson, type PaperTwoLessonSpec } from "../_components/paper-two-lesson";

export const dynamic = "force-static";
export const metadata = lessonMetadata("52", "Cambridge 9618 programming essentials, expressions, input/output and library routines with Paper 2 practice.");

const spec = {
  lessonNumber: "52", chapter: "11", chapterTitle: "Programming", title: "Programming Essentials & Library Routines", tagline: "Translate a designed algorithm into exact current pseudocode: declare, initialise, assign, calculate, input, output and reuse provided routines deliberately.", syllabus: "11.1", textbook: "TEXTBOOK CH.14 · pp.243–249, 260–262",
  objectives: ["Implement flowchart or structured-English steps as current pseudocode.", "Declare and initialise constants and variables before use.", "Build arithmetic and logical expressions with correct operators.", "Use INPUT, OUTPUT and supplied built-in or library routines appropriately."],
  starter: { prompt: "Classify each symbol: ←, =, <>, DIV, MOD, &. Which one changes stored data?", answer: "← is assignment and changes a variable. = compares equality; <> compares inequality; DIV gives integer quotient; MOD gives remainder; & concatenates strings." },
  concepts: [
    { label: "CONSTANT", text: "A named literal whose value cannot change during the program." },
    { label: "VARIABLE", text: "A named typed storage location whose value may change." },
    { label: "ASSIGNMENT", text: "Evaluate the right side, then store the result in the left-side variable using ←." },
    { label: "EXPRESSION", text: "Operators and operands evaluated to one result of an appropriate type." },
    { label: "INPUT / OUTPUT", text: "Read a value from keyboard; display data on the console, with a separate prompt OUTPUT." },
    { label: "LIBRARY ROUTINE", text: "A tested reusable routine provided for a common task, reducing repeated development." },
  ],
  model: { title: "A complete sequence with declaration, I/O and calculation.", code: "CONSTANT VAT_RATE = 0.20\nDECLARE Price : REAL\nDECLARE Total : REAL\nOUTPUT \"Enter price\"\nINPUT Price\nTotal ← Price * (1 + VAT_RATE)\nOUTPUT \"Total: \", Total", note: "Constants are assigned a literal at declaration. OUTPUT prompt and INPUT target are separate statements in the current guide." },
  worked: { title: "Evaluate an expression before storing it.", prompt: "Find A DIV B, A MOD B and (A > B) AND Flag when A=17, B=5, Flag=TRUE.", steps: ["17 DIV 5 gives integer quotient 3.", "17 MOD 5 gives remainder 2.", "17 > 5 is TRUE.", "TRUE AND TRUE evaluates to TRUE."], answer: "The three results are 3, 2 and TRUE. Assignment would then store a result, for example Quotient ← A DIV B." },
  comparison: { title: "Syntax signals different intentions.", rows: [
    { term: "← vs =", distinction: "store a value vs compare equality", example: "Count ← 0; Count = 0" },
    { term: "/ vs DIV", distinction: "real division vs integer quotient", example: "7/2 = 3.5; 7 DIV 2 = 3" },
    { term: "routine vs rewritten code", distinction: "reuse tested service vs duplicate logic", example: "LENGTH(Name)" },
  ] },
  practice: { title: "Translate a rectangle algorithm.", prompt: "Input width and height, calculate area and perimeter, then output both.", cues: ["Choose REAL for measurements.", "Declare and prompt before INPUT.", "Use two assignments and labelled outputs."], answer: "Declare Width, Height, Area, Perimeter as REAL; prompt/input Width and Height; Area ← Width * Height; Perimeter ← 2 * (Width + Height); output labelled results." },
  pitfalls: ["Do not write INPUT \"Enter X\", X; current guide uses OUTPUT \"Enter X\" followed by INPUT X.", "Do not confuse ← assignment with = equality comparison.", "Only rely on a routine guaranteed by the guide or defined in the question; unfamiliar string/date conversion routines will be supplied."],
  examMethod: ["Turn every noun into a declared identifier and every action into one statement.", "Trace expression precedence and type before assigning the result.", "Audit declarations, initial values, prompts, inputs, processing and outputs against the requirement."],
  papers: [
    { source: "9618/23 O/N 2025 · Q1(a),(c)", marks: "6 MARKS", prompt: "Explain library-routine benefits and evaluate three expressions.", cues: [{ label: "REUSE", text: "ready and tested" }, { label: "MAINTAIN", text: "provider updates routine" }, { label: "EVALUATE", text: "results 3, TRUE, 20" }], answer: "Benefits include tried/tested reliability, immediate availability and faster development, provider maintenance/updates and standards compliance. The published expression results are 3, TRUE and 20." },
    { source: "9618/22 M/J 2023 · Q1(a)", marks: "4 MARKS", prompt: "Identify constants and explain why named constants help.", cues: [{ label: "ONE INPUT", text: "set value once" }, { label: "SAFE", text: "prevent accidental inconsistency" }, { label: "MAINTAIN", text: "change in one readable place" }], answer: "A constant is the correct fixed-value construct. Named constants reduce repeated input and accidental change, improve readability and allow a later update in one location." },
  ],
  retrieval: ["How is implementing an algorithm different from designing it?", "Why might an identifier that looks numeric still be STRING?", "Which expressions return BOOLEAN?"],
  exit: ["Declare and initialise one constant.", "Write separate prompt and input lines.", "Evaluate 23 DIV 4 and 23 MOD 4."],
  homework: {
    instructions: "Use uppercase keywords and current 2027–2029 syntax. Separate prompts from INPUT and show every declaration, initialisation and output.",
    sections: [
      { code: "A", title: "Core statements", subtitle: "Constants, variables and assignment", questions: [
        { prompt: "Define constant, variable and assignment.", answer: "Constant is a named fixed literal; variable is typed storage that may change; assignment evaluates a right-side expression and stores it on the left using ←.", marks: 3 },
        { prompt: "Write declarations for integer Count and real Mean, then initialise both.", answer: "DECLARE Count : INTEGER; DECLARE Mean : REAL; Count ← 0; Mean ← 0.0.", marks: 3 },
        { prompt: "Evaluate 19 DIV 4, 19 MOD 4, 19/4 and (19 > 4 AND FALSE).", answer: "4, 3, 4.75 and FALSE respectively.", marks: 4 },
      ] },
      { code: "B", title: "Implement a sequence", subtitle: "Input, process and output", questions: [
        { prompt: "Correct: INPUT \"Enter age\", Age and explain the correction.", answer: "OUTPUT \"Enter age\"; INPUT Age. The current guide separates console output from keyboard input.", marks: 3 },
        { prompt: "Write pseudocode to input two INTEGERs and output quotient and remainder.", answer: "Declare A,B; prompt/input both; OUTPUT A DIV B; OUTPUT A MOD B. Assume B non-zero or validate it.", marks: 3, lines: 5 },
        { prompt: "Implement a currency conversion using constant RATE and real Amount/Converted.", answer: "CONSTANT RATE = stated literal; declare two REALs; prompt/input Amount; Converted ← Amount * RATE; output Converted with label.", marks: 4, lines: 6 },
      ] },
      { code: "C", title: "Published-paper application", subtitle: "Library routines and complete code", questions: [
        { prompt: "Adapted from 9618/23 O/N 2025 Q1(a): give three benefits of a standard library routine.", answer: "Any three: already tested/reliable, readily available/faster development, maintained/updated by provider, standards compliant.", marks: 3 },
        { prompt: "Adapted from 9618/22 M/J 2023 Q1(a): give three benefits of a named constant.", answer: "Input/set once; avoids inconsistent/accidental changes; update in one place; improves readability/maintenance. Any three.", marks: 3 },
        { prompt: "Adapted from 9618/23 O/N 2024 Q2(a): write a 100-value loop that sums only positive inputs and outputs once after the loop.", answer: "Declare/initialise Total; FOR Count 1 TO 100; prompt/input Value; if Value > 0 add to Total; NEXT Count; output Total after loop.", marks: 4, lines: 7 },
      ] },
    ], challenge: { prompt: "Use LENGTH and RIGHT to output the final two characters of a code with its length.", answer: "OUTPUT RIGHT(Code, 2), \" length \", LENGTH(Code). Comma-separated OUTPUT may combine values of different types; & is reserved for joining strings." },
  },
  sourceSummary: "Checked against syllabus 11.1, Coursebook Chapter 14 printed pp.243–249 and 260–262, and the official 2027–2029 Pseudocode Guide.",
  sourceDetail: "Core: implementation from designed representations; constants, variables, assignment, arithmetic/logical expressions, keyboard input, console output and built-in/library routines. Authentic anchors: 9618/23 O/N 2025 Q1(a),(c) [6], 9618/22 M/J 2023 Q1(a) [4] and homework spiral 9618/23 O/N 2024 Q2(a). Python/VB/Java syntax is not assessed here.",
} satisfies PaperTwoLessonSpec;

export default function Lesson52Page() { return <PaperTwoLesson spec={spec} />; }
