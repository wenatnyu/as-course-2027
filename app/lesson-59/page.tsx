import "../paper-two-lessons.css";
import { lessonMetadata } from "../_components/lesson-metadata";
import { PaperTwoLesson, type PaperTwoLessonSpec } from "../_components/paper-two-lesson";

export const dynamic = "force-static";
export const metadata = lessonMetadata("59", "Cambridge 9618 structure charts, interfaces, parameters, selection and repetition with Paper 2 practice.");

const spec = {
  lessonNumber: "59", chapter: "12", chapterTitle: "Software Development", title: "Structure Charts: Modules & Interfaces", tagline: "Show a program's modular hierarchy and the data crossing each interface, then annotate conditional or repeated calls without turning the chart into a flowchart.", syllabus: "12.2", textbook: "TEXTBOOK CH.15 · pp.289–292",
  objectives: ["Explain the purpose of a structure chart.", "Construct a hierarchy of calling and called modules.", "Show parameters and return values in the correct direction.", "Use selection and repetition symbols on module calls."],
  starter: { prompt: "Does a structure chart show the time order of every statement or the calling relationship between modules?", answer: "The calling relationship and modular hierarchy. It is not a control-flow trace or flowchart, though symbols can mark a conditional or repeated module call." },
  concepts: [
    { label: "MODULE BOX", text: "A rectangle names one procedure, function or controlling module." },
    { label: "HIERARCHY", text: "Parent/calling module appears above the child module it calls." },
    { label: "INTERFACE", text: "Labelled arrows show parameters sent down and values returned up." },
    { label: "DATA COUPLE", text: "A labelled arrow with a hollow-circle end shows a non-Boolean value passed between modules." },
    { label: "UPDATED DATA", text: "A double-headed data couple shows a variable updated within the called module, matching BYREF." },
    { label: "CONTROL COUPLE", text: "A solid-circle end marks a Boolean flag; diamonds and curved arrows separately mark selection and repetition." },
  ],
  model: { title: "Read the chart from parent to children and back.", code: "                 PROCESS ORDER\n              /         |          \\\n      INPUT ORDER   CALCULATE TOTAL   PRINT RECEIPT\n        ↓ Order        ↓ Order            ↓ Total\n                       ↑ Total\n\nDiamond on a branch  = child called conditionally\nCurved arrow on call = child called repeatedly", note: "Use the exact symbol convention supplied in the question or coursebook. Arrow labels name data, not vague actions." },
  worked: { title: "Build a chart for calculating an average.", prompt: "The main module inputs two numbers, calls CalculateAverage and outputs the result.", steps: ["Place Main/ProcessAverage at Level 0.", "Place InputNumbers, CalculateAverage and OutputAverage below it.", "Send Number1/Number2 into CalculateAverage.", "Return Average and pass it to output."], answer: "Three child boxes connect directly to the parent. Parameter arrows point from caller to called module; the function/result arrow returns Average to the caller." },
  comparison: { title: "Do not confuse three diagram types.", rows: [
    { term: "structure chart", distinction: "module hierarchy and interface data", example: "Main calls Sort" },
    { term: "flowchart", distinction: "statement/control sequence", example: "decision diamond chooses path" },
    { term: "state diagram", distinction: "states and event-labelled transitions", example: "Locked→Unlocked" },
  ] },
  practice: { title: "Chart a login check.", prompt: "Main gets credentials, repeatedly validates until format is valid, then conditionally calls GrantAccess.", cues: ["Create coherent module boxes.", "Use repetition on validation call.", "Use selection on GrantAccess and label parameter data."], answer: "Place a controlling Login module above InputCredentials, Validate and GrantAccess/Reject. Mark Validate's repeated call and the conditional access branch; label username/password and Boolean result directions." },
  pitfalls: ["Do not draw execution arrows between individual statements; structure-chart lines represent calls/interfaces.", "A chart does not write BYVAL/BYREF by name: infer an update only where the supplied convention shows bidirectional data, and keep return direction separate.", "Selection and repetition symbols annotate a module call; they do not replace the complete module box."],
  examMethod: ["List every module and identify who calls whom before drawing.", "Lay out one level at a time, parent above children, without crossing lines if possible.", "Add every named parameter/return label, then apply selection/repetition only where the description requires it."],
  papers: [
    { source: "9618/23 O/N 2025 · Q7(b)", marks: "4 MARKS", prompt: "Complete a structure chart from supplied module relationships.", cues: [{ label: "BOX / LEVEL", text: "correct hierarchy" }, { label: "DATA", text: "label couples and direction" }, { label: "DIAMOND", text: "conditional call" }, { label: "CURVE", text: "repeated call" }], answer: "Complete the supplied hierarchy with the correct module boxes and labelled data directions, then place the selection diamond and repetition curve on the calls specified by the scenario." },
    { source: "9618/23 M/J 2025 · Q6(c)", marks: "3 MARKS", prompt: "Explain the two structure-chart symbols shown.", cues: [{ label: "SOLID CIRCLE", text: "Boolean flag/control couple" }, { label: "DOUBLE ARROW", text: "data updated by called module" }, { label: "CONTEXT", text: "state direction/effect precisely" }], answer: "A solid/filled circular end identifies a Boolean flag or control couple. A double-headed data couple shows a value passed to the called module and updated back in the caller; explain the direction and effect in the supplied chart." },
  ],
  retrieval: ["How does a structure chart realise Chapter 9 decomposition?", "What interface information comes from a function header?", "Why is a state transition not a module call?"],
  exit: ["State structure-chart purpose.", "Draw one parent with two children.", "Label one parameter and one return direction."],
  homework: {
    instructions: "Draw module boxes and labelled call lines clearly. Show hierarchy first, then data direction and control-couple symbols.",
    sections: [
      { code: "A", title: "Read chart notation", subtitle: "Hierarchy and couples", questions: [
        { prompt: "Explain module box, hierarchy and interface.", answer: "Box names a module; hierarchy places callers above called modules; interface shows parameters and returns crossing the call boundary.", marks: 3 },
        { prompt: "Explain the purpose of a diamond and curved arrow on a call.", answer: "Diamond marks that the child call is conditional/selected; curved arrow marks repeated calls.", marks: 3 },
        { prompt: "Distinguish four chart interfaces: input-only data, updated data, function return and no data.", answer: "Input-only data travels caller→child; updated data is shown bidirectionally; a function result travels child→caller; a no-parameter procedure may have an unlabelled call line. Convert to BYVAL/BYREF only when the shown update semantics justify it.", marks: 4 },
      ] },
      { code: "B", title: "Construct a chart", subtitle: "Modules and data", questions: [
        { prompt: "Draw in words a parent Main calling Input, Calculate and Output.", answer: "Main at top with three child boxes below, each connected directly to Main.", marks: 3 },
        { prompt: "Add Width/Height sent to Calculate and Area returned to Main.", answer: "Label downward data couples Width and Height; label an upward return couple Area.", marks: 3 },
        { prompt: "Modify the chart so Input repeats until Valid and Output is conditional on Valid.", answer: "Mark repeated call on Input/Validate branch; use a selection diamond on Output call; pass or return Valid Boolean in correct direction.", marks: 4 },
      ] },
      { code: "C", title: "Published-paper application", subtitle: "Complete notation", questions: [
        { prompt: "Adapted from 9618/23 O/N 2025 Q7(b): name three checks when completing a structure chart.", answer: "Correct module boxes/levels, correct labelled data-couple direction, and correct selection diamond or repetition curve. Any three.", marks: 3 },
        { prompt: "Adapted from 9618/23 M/J 2025 Q6(c): explain the solid-circle and double-headed symbols.", answer: "Solid circle identifies a Boolean flag/control couple; double-headed data couple shows a value supplied and updated by the called module.", marks: 3 },
        { prompt: "Find four errors in a chart with children above parent, missing labels, reversed return and flowchart arrows.", answer: "Move parent above children; label data couples; reverse function result toward parent; replace statement-flow arrows with module call lines/control symbols.", marks: 4 },
      ] },
    ], challenge: { prompt: "Explain why a structure chart can show interfaces but not enough detail to implement every module.", answer: "It shows decomposition, calls and data crossing boundaries, but not the internal sequence, decisions, loops or calculations. Each module still needs pseudocode/design detail." },
  },
  sourceSummary: "Checked against syllabus 12.2, Coursebook Chapter 15 printed pp.289–292 and published Paper 2 questions/mark schemes.",
  sourceDetail: "Core: structure-chart purpose, hierarchy, module boxes, parameter/return couples, selection and repetition. Authentic anchors: 9618/23 O/N 2025 Q7(b) [4] and 9618/23 M/J 2025 Q6(c) [3]. Exact notation follows the supplied convention; structure charts are not flowcharts.",
} satisfies PaperTwoLessonSpec;

export default function Lesson59Page() { return <PaperTwoLesson spec={spec} />; }
