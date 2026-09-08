import "../paper-two-lessons.css";
import { lessonMetadata } from "../_components/lesson-metadata";
import { PaperTwoLesson, type PaperTwoLessonSpec } from "../_components/paper-two-lesson";

export const dynamic = "force-static";
export const metadata = lessonMetadata("56", "Cambridge 9618 parameters, BYVAL, BYREF and integrated modular pseudocode with Paper 2 practice.");

const spec = {
  lessonNumber: "56", chapter: "11", chapterTitle: "Programming", title: "Parameters, BYVAL/BYREF & Integrated Programs", tagline: "Design an explicit interface, distinguish definition-time parameters from call-time arguments and pass by reference only when a procedure must change the caller's variable.", syllabus: "11.3", textbook: "TEXTBOOK CH.14 · pp.267–275",
  objectives: ["Use procedure parameters: none, one or several.", "Distinguish formal parameters from actual arguments.", "Trace BYVAL copies and BYREF aliases accurately.", "Combine procedures, functions, loops, selection and earlier data structures efficiently."],
  starter: { prompt: "After CALL AddOne(X), when should X change: parameter N is BYVAL or BYREF?", answer: "Only BYREF permits the procedure's assignment to update the caller variable X. BYVAL passes a copy, so changing N does not change X." },
  concepts: [
    { label: "PARAMETER", text: "A typed placeholder named in the module header." },
    { label: "ARGUMENT", text: "The actual value or variable supplied at a particular call." },
    { label: "BYVAL", text: "Pass a copy; the procedure cannot change the caller's original variable through it." },
    { label: "BYREF", text: "Pass a reference/alias; procedure assignments affect the caller's variable." },
    { label: "RETURN VALUE", text: "The single typed result produced by a function and used in an expression." },
    { label: "EFFICIENCY", text: "Avoid repeated work and unnecessary globals while keeping interfaces clear." },
  ],
  model: { title: "Reference is explicit; value is the default.", code: "PROCEDURE Swap(BYREF A : INTEGER, BYREF B : INTEGER)\n   DECLARE Temp : INTEGER\n   Temp ← A\n   A ← B\n   B ← Temp\nENDPROCEDURE\n\nDECLARE X : INTEGER\nDECLARE Y : INTEGER\nX ← 4\nY ← 9\nCALL Swap(X, Y)", note: "After the call X=9 and Y=4. BYVAL may be written explicitly but is the default. Functions should not have BYREF parameters." },
  worked: { title: "Trace one call by value and one by reference.", prompt: "X starts 5. Procedure P adds 3 to N. Compare CALL P(X) under each mode.", steps: ["Bind argument X to parameter N.", "BYVAL creates N as a separate copy 5.", "BYREF makes N another name for X.", "Execute N ← N + 3 and inspect caller state."], answer: "BYVAL: N becomes 8 inside but X remains 5. BYREF: the assignment acts on X, so X becomes 8." },
  comparison: { title: "Interface terms describe different moments.", rows: [
    { term: "parameter", distinction: "placeholder in definition/header", example: "N in FUNCTION Square(N...)" },
    { term: "argument", distinction: "actual item at call", example: "Score in Square(Score)" },
    { term: "return value", distinction: "one function result", example: "Area ← RectangleArea(W,H)" },
  ] },
  practice: { title: "Design an UpdateScore procedure.", prompt: "It receives an INTEGER score and STRING last-date, changes both, and returns no function value.", cues: ["Both caller variables must change.", "Put BYREF before each relevant parameter.", "Use a procedure call statement."], answer: "One header is PROCEDURE UpdateScore(BYREF Score : INTEGER, BYREF LastDate : STRING). After its body, CALL UpdateScore(CustomerScore, CustomerDate)." },
  pitfalls: ["The current keyword is BYVAL, not the textbook's older BYVALUE spelling.", "Function parameters should not be passed BYREF; return one value explicitly instead.", "Parameter order and types form the interface, so every call must supply matching arguments in that order."],
  examMethod: ["Draw arrows from each call argument to its header parameter and label copy or alias.", "Use BYREF only for caller variables the procedure is required to update.", "For integrated code, outline module calls first, then fill loops/selection and audit return/call syntax."],
  papers: [
    { source: "9618/23 M/J 2025 · Q7(a)(i–ii)", marks: "6 MARKS", prompt: "Complete a two-BYREF procedure, then write the same-day condition.", cues: [{ label: "HEADER", text: "two typed BYREF parameters" }, { label: "DATE", text: "TODAY/MONTH comparison supplied" }, { label: "UPDATE", text: "+4 or +1; save date; compare DAYINDEX" }], answer: "The five-mark procedure uses two typed BYREF parameters, supplied TODAY/MONTH routines, +4 in the same month or +1 otherwise, and updates LastVisitDate. The one-mark follow-up is DAYINDEX(LastVisitDate) = DAYINDEX(TODAY())." },
    { source: "9618/23 M/J 2025 · Q7(b)(i)", marks: "8 MARKS", prompt: "Build an integrated function that parses and updates loyalty data.", cues: [{ label: "REUSE", text: "store FindCustomer return" }, { label: "PARSE", text: "MID and supplied conversion" }, { label: "RETURN", text: "calculate Monday bonus; return INTEGER" }], answer: "Store the search result once, extract the required substring using the supplied MID signature, convert points with the provided routine, test the supplied date/day condition, add the bonus when required and RETURN the final INTEGER." },
  ],
  retrieval: ["Why is an array argument often BYREF in a procedure that sorts it?", "How can a function replace a global output variable?", "Which Chapter 11 construct controls a date-dependent update?"],
  exit: ["Define parameter versus argument.", "Predict one BYVAL call.", "Write one two-parameter BYREF header."],
  homework: {
    instructions: "Label each parameter BYVAL/default or BYREF and trace caller state after each call. Functions return one value and never use CALL.",
    sections: [
      { code: "A", title: "Interface vocabulary", subtitle: "Parameters, arguments and returns", questions: [
        { prompt: "Define parameter, argument and return value.", answer: "Parameter is a typed placeholder in header; argument is actual call value/variable; return value is the one result sent back by a function.", marks: 3 },
        { prompt: "Distinguish BYVAL and BYREF effects on caller data.", answer: "BYVAL copies the value so parameter assignment leaves caller unchanged; BYREF aliases the caller variable so assignment changes it.", marks: 3 },
        { prompt: "Give four interface checks before calling a module.", answer: "Correct module name, argument count, order, compatible types and writable variables for BYREF; function return type must fit expression. Any four.", marks: 4 },
      ] },
      { code: "B", title: "Write and trace calls", subtitle: "Value and reference", questions: [
        { prompt: "Trace X=7 through a BYVAL parameter that doubles itself.", answer: "The local copy becomes 14; X remains 7 after the call.", marks: 3 },
        { prompt: "Trace X=7 through a BYREF parameter that doubles itself.", answer: "The parameter aliases X, so assignment changes X to 14.", marks: 3 },
        { prompt: "Write a Swap procedure for two STRING variables and a valid call.", answer: "PROCEDURE Swap(BYREF A : STRING, BYREF B : STRING); local Temp; three assignments; ENDPROCEDURE; CALL Swap(First,Second).", marks: 4, lines: 7 },
      ] },
      { code: "C", title: "Published-paper application", subtitle: "Integrated module", questions: [
        { prompt: "Adapted from 9618/23 M/J 2025 Q7(a): explain why both supplied parameters are BYREF.", answer: "The procedure must update the caller's points and last-visit date, so both original variables must reflect assignments made inside.", marks: 3 },
        { prompt: "From Q7(b), explain why FindCustomer should be called once and stored.", answer: "Its result is reused; storing it avoids repeated search work and makes the following code clearer and more efficient.", marks: 3 },
        { prompt: "Write a function AddBonus(Points, IsMonday) returning updated INTEGER points.", answer: "FUNCTION AddBonus(Points : INTEGER, IsMonday : BOOLEAN) RETURNS INTEGER; IF IsMonday THEN Points ← Points + 10 ENDIF; RETURN Points; ENDFUNCTION.", marks: 4, lines: 7 },
      ] },
    ], challenge: { prompt: "Return two logical results without using BYREF in a function.", answer: "Define a record type containing the two results and return one value of that record type, or redesign as a procedure with explicit BYREF outputs when the specification permits." },
  },
  sourceSummary: "Checked against syllabus 11.3, Coursebook Chapter 14 printed pp.267–275, the official Pseudocode Guide pp.22–24 and published Paper 2 questions/mark schemes.",
  sourceDetail: "Core: zero/one/multiple parameters, parameter versus argument, BYVAL/BYREF, function return value, interface and integrated efficient pseudocode. Authentic anchors: 9618/23 M/J 2025 Q7(a) [6] and Q7(b)(i) [8]. Chapter 11 is complete; supplied non-standard routines are used only when the question defines them.",
} satisfies PaperTwoLessonSpec;

export default function Lesson56Page() { return <PaperTwoLesson spec={spec} />; }
