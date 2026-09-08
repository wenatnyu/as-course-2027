import "../paper-two-lessons.css";
import { lessonMetadata } from "../_components/lesson-metadata";
import { PaperTwoLesson, type PaperTwoLessonSpec } from "../_components/paper-two-lesson";

export const dynamic = "force-static";
export const metadata = lessonMetadata("60", "Cambridge 9618 structure-chart-to-pseudocode derivation and state-transition diagrams with Paper 2 practice.");

const spec = {
  lessonNumber: "60", chapter: "12", chapterTitle: "Software Development", title: "From Structure Charts to Code & States", tagline: "Derive current procedure/function interfaces from module couples, then model event-driven behaviour as named states connected by labelled transitions.", syllabus: "12.2", textbook: "TEXTBOOK CH.15 · pp.292–296",
  objectives: ["Derive procedure/function headers and calls from a structure chart.", "Translate parameter and return arrows into current BYVAL/BYREF syntax.", "Explain the purpose of a state-transition diagram.", "Trace and complete states, events, outputs and labelled transitions."],
  starter: { prompt: "Which diagram answers 'what module is called?' and which answers 'what state comes next after an event?'", answer: "A structure chart shows module calls and interfaces. A state-transition diagram shows how an event/input moves a system between states, optionally producing an output." },
  concepts: [
    { label: "DERIVE HEADER", text: "Module box gives name; incoming couples give typed parameters; returned result identifies a function or BYREF update." },
    { label: "DERIVE CALL", text: "Parent module invokes each child with matching arguments in the shown interface order." },
    { label: "STATE", text: "A named condition/mode in which the system behaves consistently." },
    { label: "TRANSITION", text: "A directed change from one state to another." },
    { label: "EVENT / INPUT", text: "The condition or occurrence labelling the arrow that triggers a transition." },
    { label: "OUTPUT", text: "An action produced on a transition, often shown after a separator in its label." },
  ],
  model: { title: "One chart interface; one current pseudocode interface.", code: "STRUCTURE CHART FACTS\nMain sends Data to Sort; Sort updates Data\nMain sends X to Analyse; Analyse returns INTEGER Result\n\nCURRENT PSEUDOCODE\nPROCEDURE Sort(BYREF Data : ARRAY[1:20] OF INTEGER)\n   // sorting body\nENDPROCEDURE\n\nFUNCTION Analyse(X : REAL) RETURNS INTEGER\n   RETURN ...\nENDFUNCTION\n\nCALL Sort(Values)\nResult ← Analyse(Reading)", note: "Do not copy the textbook's old MODULE...ENDMODULE. Use current PROCEDURE/FUNCTION/CALL/BYREF forms from the 2027–2029 guide." },
  worked: { title: "Trace a two-state door controller.", prompt: "States are Locked and Unlocked. ValidCard unlocks; Timeout locks; InvalidCard stays locked with Alarm.", steps: ["Start in Locked.", "ValidCard: transition Locked → Unlocked.", "Timeout: transition Unlocked → Locked.", "InvalidCard in Locked: self-loop, output Alarm."], answer: "Every possible labelled event must be interpreted from the current state. A self-loop is still a transition even though the next state has the same name." },
  comparison: { title: "One describes program structure; one describes behaviour over time.", rows: [
    { term: "structure chart", distinction: "static module hierarchy/interfaces", example: "Main sends A,B to Calculate" },
    { term: "state-transition diagram", distinction: "state changes caused by events", example: "Idle --Start→ Running" },
    { term: "pseudocode", distinction: "implementable statements within modules", example: "FUNCTION Calculate..." },
  ] },
  practice: { title: "Complete a traffic-light state model.", prompt: "States Red, RedAmber, Green, Amber; event Timer advances cyclically.", cues: ["Choose one start state.", "Use four directed Timer transitions.", "Add a self-loop for Reset if specification says remain Red."], answer: "start→Red; Red--Timer→RedAmber; RedAmber--Timer→Green; Green--Timer→Amber; Amber--Timer→Red. A Reset arrow depends on the exact requirement." },
  pitfalls: ["A returned function value travels from child to parent and the call belongs in an expression.", "A state is a continuing condition, not an instantaneous event; label arrows with events/inputs.", "Do not invent old MODULE syntax when deriving code: use current PROCEDURE/FUNCTION and typed parameters."],
  examMethod: ["For chart-to-code, annotate every box as procedure/function and every couple as input, BYREF or return.", "For a state diagram, build a transition table of current state + input → output + next state.", "Check start state, arrow direction, labels, self-loops and every case supplied in the question."],
  papers: [
    { source: "9618/22 O/N 2025 · Q7(b)", marks: "4 MARKS", prompt: "Derive three current module headers from a structure chart.", cues: [{ label: "PROCEDURE", text: "Analyse header" }, { label: "FUNCTION", text: "Update returns INTEGER" }, { label: "BYREF", text: "Sort updates supplied data" }], answer: "The published marking pattern credits a correct PROCEDURE Analyse header, a FUNCTION Update header with RETURNS INTEGER, and PROCEDURE Sort with the required BYREF parameter/interface." },
    { source: "9618/21 O/N 2025 · Q7(a)", marks: "5 MARKS", prompt: "Complete a state-transition diagram from supplied behaviour.", cues: [{ label: "STATE", text: "add missing named state" }, { label: "ARROW", text: "correct origin and destination" }, { label: "LABEL", text: "event/output exactly placed" }], answer: "Marks are awarded point by point for the missing state, correctly directed transitions and exact labels. Derive each from the current-state/input table before drawing." },
  ],
  retrieval: ["How does BYREF direction appear on a structure chart?", "Why is an FSM useful for a user interface or controller?", "How is a self-loop different from no documented event?"],
  exit: ["Derive one function header from a return couple.", "Define state and transition.", "Trace two labelled events."],
  homework: {
    instructions: "Use current module syntax. For state diagrams, tabulate current state, input/event, output and next state before drawing arrows.",
    sections: [
      { code: "A", title: "Derive modules", subtitle: "Chart to current pseudocode", questions: [
        { prompt: "A chart sends INTEGER N to Display with no return. Write header and call.", answer: "PROCEDURE Display(N : INTEGER) ... ENDPROCEDURE; CALL Display(Value). Default passing is BYVAL.", marks: 3 },
        { prompt: "A chart sends REAL X to Classify and receives STRING label. Write the function header and use.", answer: "FUNCTION Classify(X : REAL) RETURNS STRING ... ENDFUNCTION; Label ← Classify(Reading).", marks: 3 },
        { prompt: "A chart shows Sort updating an INTEGER array. Explain and write the BYREF interface.", answer: "Use a procedure because caller data is changed: PROCEDURE Sort(BYREF Data : ARRAY[1:20] OF INTEGER) ... ENDPROCEDURE; CALL Sort(Values).", marks: 4, lines: 6 },
      ] },
      { code: "B", title: "Model states", subtitle: "Events and transitions", questions: [
        { prompt: "Define state, transition and event/input.", answer: "State is a persistent mode; transition is directed change between states; event/input is the labelled trigger for that change.", marks: 3 },
        { prompt: "Create a transition table for Off --Power→ On and On --Power→ Off.", answer: "Rows: Off + Power → On; On + Power → Off. Include any stated output separately.", marks: 3 },
        { prompt: "Design a three-state download model: Idle, Downloading, Complete with Start, Finish and Reset.", answer: "start→Idle; Idle--Start→Downloading; Downloading--Finish→Complete; Complete--Reset→Idle. Add only specified self-loops/error transitions.", marks: 4 },
      ] },
      { code: "C", title: "Published-paper application", subtitle: "Headers and diagrams", questions: [
        { prompt: "Adapted from 9618/22 O/N 2025 Q7(b): distinguish a function-return couple from BYREF update.", answer: "Function produces one typed result used in an expression; BYREF lets a procedure update a caller variable through a parameter.", marks: 3 },
        { prompt: "Adapted from 9618/21 O/N 2025 Q7(a): list three checks when completing a state diagram.", answer: "Correct missing state; arrow origin/destination/direction; exact event/output label. Also check start and self-loops.", marks: 3 },
        { prompt: "Correct four errors in a state diagram that uses events as nodes and states on arrows.", answer: "Make states the nodes; events/inputs label arrows; direct each arrow to required next state; add start arrow and outputs/self-loops where specified.", marks: 4, lines: 5 },
      ] },
    ], challenge: { prompt: "Explain how a transition table can prove a diagram is complete.", answer: "Enumerate every permitted current-state/input pair and its next state/output. Each row must map to exactly one diagram arrow; missing or contradictory arrows become visible." },
  },
  sourceSummary: "Checked against syllabus 12.2, Coursebook Chapter 15 printed pp.292–296, the official Pseudocode Guide pp.22–24 and published Paper 2 questions/mark schemes.",
  sourceDetail: "Core: derive current pseudocode from structure charts; express parameter passing; state-transition diagram purpose, states, events, outputs and transitions. Authentic anchors: 9618/22 O/N 2025 Q7(b) [4] and 9618/21 O/N 2025 Q7(a) [5]. Old MODULE syntax is excluded.",
} satisfies PaperTwoLessonSpec;

export default function Lesson60Page() { return <PaperTwoLesson spec={spec} />; }
