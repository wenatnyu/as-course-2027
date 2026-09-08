import "../paper-two-lessons.css";
import { lessonMetadata } from "../_components/lesson-metadata";
import { PaperTwoLesson, type PaperTwoLessonSpec } from "../_components/paper-two-lesson";

export const dynamic = "force-static";
export const metadata = lessonMetadata("49", "Cambridge 9618 sequential text files, persistence and current pseudocode with Paper 2 practice.");

const spec = {
  lessonNumber: "49", chapter: "10", chapterTitle: "Data Types and Structures", title: "Persistent Data with Text Files", tagline: "Open a sequential text file in the correct mode, test EOF before reading, process zero or more lines and always close the resource.", syllabus: "10.3", textbook: "TEXTBOOK CH.13 · pp.226–227",
  objectives: ["Explain why programs need files for persistent data.", "Select READ, WRITE or APPEND mode from the required effect.", "Write current pseudocode to read one or many text lines safely.", "Write values and close every opened file on all normal paths."],
  starter: { prompt: "A program ends and its array disappears. Which property must storage gain so the data is available tomorrow?", answer: "Persistence: data stored in a file remains available after program execution and can be reloaded in a later run." },
  concepts: [
    { label: "READ", text: "Open an existing text file to obtain data without changing it." },
    { label: "WRITE", text: "Create or replace file contents, then write new lines from the start." },
    { label: "APPEND", text: "Preserve existing content and add new lines at the end." },
    { label: "EOF", text: "EOF(File) becomes true when there is no further line to read." },
    { label: "SEQUENTIAL", text: "Lines are processed in order from the current file position." },
    { label: "LIFECYCLE", text: "OPENFILE → read/write operations → CLOSEFILE." },
  ],
  model: { title: "Read an empty, one-line or many-line file safely.", code: "DECLARE Line : STRING\nOPENFILE \"Names.txt\" FOR READ\nWHILE NOT EOF(\"Names.txt\")\n   READFILE \"Names.txt\", Line\n   OUTPUT Line\nENDWHILE\nCLOSEFILE \"Names.txt\"", note: "The EOF condition is checked before READFILE, so an empty file is safe. Current WHILE syntax has no DO." },
  worked: { title: "Append one attendance entry.", prompt: "Choose the mode and order the four resource actions.", steps: ["Build the STRING line to be stored.", "OPENFILE the existing log FOR APPEND.", "WRITEFILE the filename and line.", "CLOSEFILE immediately after the operation."], answer: "OPENFILE \"Attendance.txt\" FOR APPEND; WRITEFILE \"Attendance.txt\", Entry; CLOSEFILE \"Attendance.txt\". APPEND preserves earlier attendance." },
  comparison: { title: "The mode determines what happens to existing data.", rows: [
    { term: "READ", distinction: "obtain existing lines", example: "load saved names" },
    { term: "WRITE", distinction: "start a new/replaced file", example: "create today's report" },
    { term: "APPEND", distinction: "add after existing lines", example: "extend an audit log" },
  ] },
  practice: { title: "Count non-empty lines in a file.", prompt: "Write a safe loop and state where Count changes.", cues: ["Initialise before OPENFILE or before loop.", "Test EOF before READFILE.", "Increment only when Line <> \"\"."], answer: "Set Count ← 0; open for READ; while not EOF, READFILE into Line then if Line <> \"\" increment Count; endwhile; close; output Count." },
  pitfalls: ["WRITE may replace existing contents; use APPEND when earlier lines must remain.", "Never READFILE before checking EOF in a zero-or-more-lines loop.", "The AS requirement is text files only: RANDOM, SEEK, GETRECORD and PUTRECORD are outside Chapter 10."],
  examMethod: ["Circle the required effect—load, replace or extend—to select the mode.", "Write the resource lifecycle first, then place processing inside it.", "For repeated reads, show EOF before READFILE, update inside the loop and CLOSEFILE after it."],
  papers: [
    { source: "9618/21 O/N 2024 · Q3(a–c)", marks: "9 MARKS", prompt: "Read the final lines, then output selected consecutive lines safely.", cues: [{ label: "MODE", text: "open for READ" }, { label: "ORDER", text: "retain line order while scanning" }, { label: "SAFETY", text: "EOF/failure and close" }], answer: "The mark scheme rewards correct READ mode, EOF-controlled traversal, preserving the required line order, safe handling when lines do not exist and closing the file." },
    { source: "9618/22 O/N 2023 · Q6(a)", marks: "6 MARKS", prompt: "Generate several named text files and write to each.", cues: [{ label: "LOOP", text: "repeat for required file count" }, { label: "NAME", text: "construct each filename" }, { label: "RESOURCE", text: "OPEN WRITE, WRITEFILE, CLOSE" }], answer: "Loop through the required suffixes, construct each filename, open that file FOR WRITE, write its initial content and close it before the next iteration." },
  ],
  retrieval: ["Why is a file persistent but an ordinary array variable is not?", "How does EOF prevent a run-time fault?", "When would APPEND be wrong?"],
  exit: ["Choose a mode for an audit log.", "Write one correct READFILE statement.", "State the complete file lifecycle."],
  homework: {
    instructions: "Use only current text-file pseudocode. Choose the mode deliberately, guard reads with EOF and close every file.",
    sections: [
      { code: "A", title: "Purpose and modes", subtitle: "Persistent sequential data", questions: [
        { prompt: "Give three reasons a school program stores student data in a file rather than only an array.", answer: "Data persists after the run, can be loaded by future runs and can be shared/updated without recompiling; any three developed reasons.", marks: 3 },
        { prompt: "Choose READ, WRITE or APPEND for loading settings, replacing a report and extending a log.", answer: "READ for settings; WRITE for a replacement report; APPEND for preserving and extending the log.", marks: 3 },
        { prompt: "Explain four stages in the lifecycle of reading a multi-line file.", answer: "Open FOR READ; test EOF; read/process each line while data remains; close the file after the loop.", marks: 4 },
      ] },
      { code: "B", title: "Write file pseudocode", subtitle: "One and many lines", questions: [
        { prompt: "Write pseudocode to replace Message.txt with one STRING value Message.", answer: "OPENFILE \"Message.txt\" FOR WRITE; WRITEFILE \"Message.txt\", Message; CLOSEFILE \"Message.txt\".", marks: 3, lines: 4 },
        { prompt: "Write pseudocode to append NewName to Names.txt.", answer: "OPENFILE \"Names.txt\" FOR APPEND; WRITEFILE \"Names.txt\", NewName; CLOSEFILE \"Names.txt\".", marks: 3, lines: 4 },
        { prompt: "Write pseudocode to read and output every line of Notes.txt.", answer: "Open FOR READ; WHILE NOT EOF; READFILE into Line; OUTPUT Line; ENDWHILE; CLOSEFILE. No DO after WHILE.", marks: 4, lines: 7 },
      ] },
      { code: "C", title: "Published-paper application", subtitle: "File algorithms", questions: [
        { prompt: "Adapted from 9618/21 O/N 2024 Q3: state three safeguards when reading chosen lines.", answer: "Open for READ; check EOF before each read/handle missing requested lines; close file. Preserve line order/indexing.", marks: 3 },
        { prompt: "Adapted from 9618/22 O/N 2023 Q6(a): identify the three file statements needed inside each filename iteration.", answer: "OPENFILE constructed name FOR WRITE; WRITEFILE that name and data; CLOSEFILE that name.", marks: 3 },
        { prompt: "Correct four faults: wrong mode, READ before EOF test, WHILE ... DO and no close.", answer: "Select required READ/WRITE/APPEND mode; test NOT EOF before READFILE; remove DO; add CLOSEFILE after processing.", marks: 4, lines: 5 },
      ] },
    ], challenge: { prompt: "Explain a simple text representation for one record per line.", answer: "Convert fields to strings if needed, join them with a chosen separator and write one record per line. When reading, split consistently; the separator must not be ambiguous in field data." },
  },
  sourceSummary: "Checked against syllabus 10.3, Coursebook Chapter 13 printed pp.226–227, the official Pseudocode Guide pp.25–26 and published Paper 2 questions/mark schemes.",
  sourceDetail: "Core: persistence, READ/WRITE/APPEND, OPENFILE/READFILE/WRITEFILE/EOF/CLOSEFILE and safe sequential processing. Authentic anchors: 9618/21 O/N 2024 Q3(a–c) [9] and 9618/22 O/N 2023 Q6(a) [6]. Random and binary files are outside this AS section.",
} satisfies PaperTwoLessonSpec;

export default function Lesson49Page() { return <PaperTwoLesson spec={spec} />; }
