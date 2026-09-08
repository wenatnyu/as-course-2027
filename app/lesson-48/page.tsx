import "../paper-two-lessons.css";
import { lessonMetadata } from "../_components/lesson-metadata";
import { PaperTwoLesson, type PaperTwoLessonSpec } from "../_components/paper-two-lesson";

export const dynamic = "force-static";
export const metadata = lessonMetadata("48", "Cambridge 9618 two-dimensional arrays and arrays of records with current pseudocode and Paper 2 practice.");

const spec = {
  lessonNumber: "48", chapter: "10", chapterTitle: "Data Types and Structures", title: "2D Arrays & Arrays of Records", tagline: "Model rows and columns with two independent bounds, traverse the grid using nested loops and combine indexed access with record-field access.", syllabus: "10.2", textbook: "TEXTBOOK CH.13 · pp.218–225",
  objectives: ["Select a 2D array for rectangular row-and-column data.", "Declare and access a 2D array using two inclusive index ranges.", "Process every cell with correctly nested loops.", "Declare and traverse an array whose elements are records."],
  starter: { prompt: "A cinema has 12 rows and 20 seats per row. What array shape and how many elements are required?", answer: "A 12 × 20 two-dimensional array, for example ARRAY[1:12,1:20], stores 240 elements of one declared type." },
  concepts: [
    { label: "ROW INDEX", text: "The first index selects a row in the course convention used here." },
    { label: "COLUMN INDEX", text: "The second index selects a position within that row." },
    { label: "CELL", text: "One element addressed by both indices, such as Seats[4,11]." },
    { label: "NESTED LOOPS", text: "The inner loop visits every column for each value of the outer row loop." },
    { label: "ARRAY OF RECORDS", text: "Every indexed element has the same record type and contains all its fields." },
    { label: "CHAINED ACCESS", text: "Players[I].Score combines array indexing with record dot notation." },
  ],
  model: { title: "Two dimensions require two bounds and two indices.", code: "DECLARE Board : ARRAY[1:3,1:3] OF CHAR\nDECLARE Row : INTEGER\nDECLARE Column : INTEGER\nFOR Row ← 1 TO 3\n   FOR Column ← 1 TO 3\n      Board[Row,Column] ← '-'\n   NEXT Column\nNEXT Row", note: "The current guide requires DECLARE before the array name. Each inner loop completes before the outer Row advances." },
  worked: { title: "Find the highest value in a 5 × 4 grid.", prompt: "Plan the initial cell, both loops and the update.", steps: ["Initialise Highest from Grid[1,1].", "Loop Row from 1 to 5.", "Inside it, loop Column from 1 to 4.", "Compare Grid[Row,Column] and update Highest."], answer: "The initial cell may be compared again harmlessly. Alternatively start from the next logical cell with more complex control; the simple complete nested traversal is clearer and safe." },
  comparison: { title: "Choose the structure that matches the relationship.", rows: [
    { term: "1D array", distinction: "one index through a sequence", example: "30 daily temperatures" },
    { term: "2D array", distinction: "two indices through a grid", example: "marks by student and test" },
    { term: "array of records", distinction: "many entities, each with mixed fields", example: "Players[I].Name and Players[I].Score" },
  ] },
  practice: { title: "Process a 100 × 2 STRING table.", prompt: "Column 1 stores a code and column 2 its description. Find TargetCode and output its description.", cues: ["Declare exact dimensions.", "Only code column needs comparison.", "Use the same row for the description."], answer: "DECLARE Lookup : ARRAY[1:100,1:2] OF STRING. Traverse Row 1 to 100; when Lookup[Row,1] = TargetCode, output Lookup[Row,2] and record Found." },
  pitfalls: ["Do not write ARRAY[1:100][1:2]; current pseudocode uses one bracket pair with comma-separated dimensions.", "Do not reuse one control variable for both nested loops; the inner loop would destroy the outer position.", "A 2D array stores one element type. Mixed fields belong in a record, perhaps inside a 1D array."],
  examMethod: ["Translate each real-world dimension into one labelled bound.", "Write the outer header, inner header, cell operation, NEXT inner and NEXT outer in that order.", "For arrays of records, audit both punctuation layers: [index] then .Field."],
  papers: [
    { source: "9618/22 O/N 2024 · Q2(b)(i)", marks: "2 MARKS", prompt: "Declare a 100 × 2 array of STRING.", cues: [{ label: "ROWS", text: "100 valid row positions" }, { label: "COLUMNS", text: "exactly two fields per row" }, { label: "TYPE", text: "STRING elements" }], answer: "One valid current declaration is DECLARE Check : ARRAY[1:100,1:2] OF STRING. Marks reward correct dimensions and the remaining declaration/type." },
    { source: "9618/22 O/N 2024 · Q8(a)", marks: "7 MARKS", prompt: "Traverse an array of CharacterType records and test fields.", cues: [{ label: "TRAVERSE", text: "every valid record index" }, { label: "DOT", text: "access required fields" }, { label: "CRITERIA", text: "combine stated conditions" }], answer: "Loop through each array element, use Character[Index].FieldName for each criterion and process only records satisfying the complete Boolean condition." },
  ],
  retrieval: ["How is Board[2,3] different from Player[2].Score?", "Why do nested loops process rows × columns cells?", "Which structure best models a timetable and why?"],
  exit: ["Declare an 8 × 6 BOOLEAN grid.", "Write two correct nested-loop headers.", "Access the Price field of Product[9]."],
  homework: {
    instructions: "Use one bracket pair for all dimensions, distinct loop variables and current record dot notation. State which index means row and column.",
    sections: [
      { code: "A", title: "Declare and access", subtitle: "Dimensions and cells", questions: [
        { prompt: "Declare a 7-row, 5-column array of INTEGER and assign 9 to row 2, column 4.", answer: "DECLARE Grid : ARRAY[1:7,1:5] OF INTEGER; Grid[2,4] ← 9.", marks: 3 },
        { prompt: "Calculate the number of cells in ARRAY[3:8,0:4].", answer: "First dimension has 8−3+1=6 values; second has 4−0+1=5; total 30 cells.", marks: 3 },
        { prompt: "Write nested loops that set every cell of Grid[1:10,1:12] to FALSE.", answer: "FOR Row 1 TO 10; FOR Column 1 TO 12; Grid[Row,Column] ← FALSE; NEXT Column; NEXT Row.", marks: 4, lines: 6 },
      ] },
      { code: "B", title: "Process structured collections", subtitle: "Grid and record patterns", questions: [
        { prompt: "State three reasons a timetable suits a 2D array.", answer: "It has two fixed dimensions; every cell stores the same type; row/column indices map naturally to day/period and allow systematic traversal.", marks: 3 },
        { prompt: "Define a ResultRecord with CandidateID and Mark, then declare 200 results.", answer: "TYPE ResultRecord; DECLARE CandidateID : STRING; DECLARE Mark : INTEGER; ENDTYPE; DECLARE Results : ARRAY[1:200] OF ResultRecord.", marks: 3, lines: 5 },
        { prompt: "Write a traversal that outputs IDs for records with Mark at least 60.", answer: "FOR I ← 1 TO 200; IF Results[I].Mark >= 60 THEN OUTPUT Results[I].CandidateID; ENDIF; NEXT I.", marks: 4, lines: 5 },
      ] },
      { code: "C", title: "Published-paper application", subtitle: "Exact syntax and traversal", questions: [
        { prompt: "Adapted from 9618/22 O/N 2024 Q2(b)(i): declare 100 rows by 2 columns of STRING.", answer: "DECLARE Data : ARRAY[1:100,1:2] OF STRING. Dimensions and type must be exact.", marks: 3 },
        { prompt: "Adapted from 9618/22 O/N 2024 Q8(a): explain the syntax Players[I].Role.", answer: "Players[I] selects one record from the array; .Role selects the Role field in that record.", marks: 3 },
        { prompt: "Search Players[1:6] for records whose Team is 2 and Active is TRUE; output Name.", answer: "Loop I 1 to 6; IF Players[I].Team = 2 AND Players[I].Active = TRUE THEN OUTPUT Players[I].Name; ENDIF; NEXT I.", marks: 4, lines: 6 },
      ] },
    ], challenge: { prompt: "Explain how to traverse a 2D array stored with non-1 lower bounds.", answer: "Use the declared lower and upper bound for each dimension in its own loop; never assume 1. The cell remains Array[FirstIndex,SecondIndex]." },
  },
  sourceSummary: "Checked against syllabus 10.2, Coursebook Chapter 13 printed pp.218–225, the official Pseudocode Guide and published Paper 2 questions/mark schemes.",
  sourceDetail: "Core: choose, declare and process 2D arrays; nested traversal; arrays of records. Authentic anchors: 9618/22 O/N 2024 Q2(b)(i) [2] and 9618/22 O/N 2024 Q8(a) [7]. Old textbook module syntax is excluded and replaced by the current guide.",
} satisfies PaperTwoLessonSpec;

export default function Lesson48Page() { return <PaperTwoLesson spec={spec} />; }
