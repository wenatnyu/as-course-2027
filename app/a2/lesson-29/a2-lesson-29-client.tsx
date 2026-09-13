"use client";

import { A2TheoryLesson, CompareTable, ConceptCards, ExamPractice, FlowStrip, WorkedBoard } from "../../_components/a2-theory-lesson";
import { ExceptionFlow, FileAccessDiagram } from "../../_components/a2-advanced-diagrams";
import { Slide, type HomeworkSection, type SlideData } from "../../_components/lesson-shell";

const homeworkSections: HomeworkSection[] = [
  {
    code: "A", title: "Files and records", subtitle: "Choose the organisation, access route and open mode", marks: 10,
    questions: [
      { id: "a2-29-1", marks: 3, lines: 6, prompt: <><b>Choose READ, WRITE or APPEND</b> for: processing an existing file without changing it; replacing a report; adding today&apos;s transactions.</>, answer: <p><b>READ</b> processes the existing file <em>[1]</em>; <b>WRITE</b> creates/replaces the report and may overwrite existing contents <em>[1]</em>; <b>APPEND</b> adds transactions at the end without replacing earlier data <em>[1]</em>.</p> },
      { id: "a2-29-2", marks: 3, lines: 7, prompt: <><b>Distinguish serial, sequential and random file organisation.</b></>, answer: <p>A serial file stores records in arrival/chronological order <em>[1]</em>. A sequential file stores records in order of a key field <em>[1]</em>. A random file stores fixed-length records at calculated/specific addresses so a record can be accessed directly <em>[1]</em>.</p> },
      { id: "a2-29-3", marks: 4, lines: 8, prompt: <><b>Write pseudocode to read every line from SaleFile and output only non-blank lines.</b></>, answer: <pre><code>{`DECLARE Line : STRING
OPENFILE SaleFile FOR READ
WHILE NOT EOF(SaleFile)
   READFILE SaleFile, Line
   IF Line <> "" THEN
      OUTPUT Line
   ENDIF
ENDWHILE
CLOSEFILE SaleFile`}</code></pre> },
    ],
  },
  {
    code: "B", title: "Random-access processing", subtitle: "Seek, retrieve, change and write back", marks: 10,
    questions: [
      { id: "a2-29-4", marks: 3, lines: 6, prompt: <><b>Explain the purpose of SEEK, GETRECORD and PUTRECORD.</b></>, answer: <p><code>SEEK</code> moves the file pointer to a specified record address <em>[1]</em>. <code>GETRECORD</code> reads the record at the current address into a record variable <em>[1]</em>. <code>PUTRECORD</code> writes a record variable at the current address <em>[1]</em>.</p> },
      { id: "a2-29-5", marks: 3, lines: 8, prompt: <><b>Write the core pseudocode to retrieve record 27 from a random file named MemberFile.</b></>, answer: <pre><code>{`OPENFILE MemberFile FOR RANDOM
SEEK MemberFile, 27
GETRECORD MemberFile, ThisMember
OUTPUT ThisMember
CLOSEFILE MemberFile`}</code></pre> },
      { id: "a2-29-6", marks: 4, lines: 8, prompt: <><span className="syllabus-mark">PAST PAPER PRACTICE</span><p>A random file has 100 locations. <b>Outline an algorithm that stores NewItem in the first empty location, or outputs “File full”.</b></p><p>Adapted from 9618/33 M/J 2025 Q11. [4 adapted marks]</p></>, answer: <p>Open the file for random access and set <code>Location ← 0</code>, <code>Stored ← FALSE</code> <em>[1]</em>. While Location &lt; 100 and not Stored, SEEK and GETRECORD at Location <em>[1]</em>. If its key is empty, PUTRECORD NewItem and set Stored true; otherwise increment Location <em>[1]</em>. If not Stored after the loop, output “File full”, then close the file <em>[1]</em>.</p> },
    ],
  },
  {
    code: "C", title: "Exception handling", subtitle: "Protect the run-time boundary and recover deliberately", marks: 10,
    questions: [
      { id: "a2-29-7", marks: 3, lines: 7, prompt: <><b>Define an exception, explain why it should be handled and give one cause.</b></>, answer: <p>An exception is an unexpected run-time event that disrupts normal program flow <em>[1]</em>. Handling it prevents an uncontrolled halt and permits a message/recovery/cleanup <em>[1]</em>. One cause is a missing file, invalid conversion, division by zero, invalid array index, user error or hardware failure <em>[1]</em>.</p> },
      { id: "a2-29-8", marks: 3, lines: 8, prompt: <><b>Write Python that converts input to an integer, handles invalid input specifically and always outputs “Finished”.</b></>, answer: <pre><code>{`try:
    value = int(input("Integer: "))
    print(value)
except ValueError:
    print("Invalid integer")
finally:
    print("Finished")`}</code></pre> },
      { id: "a2-29-9", marks: 4, lines: 8, prompt: <><span className="syllabus-mark">PAST PAPER PRACTICE</span><p><b>Explain how exception handling prevents a program from terminating when an unwanted run-time event occurs, and identify two possible causes.</b></p><p>Adapted from 9618/32 O/N 2025 Q10(a)–(b). [4]</p></>, answer: <p>Place risky statements in a <code>try</code> block <em>[1]</em>; a matching <code>except</code>/<code>catch</code> routine intercepts the exception and takes a controlled action such as displaying a message, so the program need not halt <em>[1]</em>. Two causes: coding/programming error, invalid user input, hardware failure, missing file, divide by zero or invalid index <em>[1 each, max 2]</em>.</p> },
    ],
  },
];

export default function A2Lesson29Client() {
  const slides: SlideData[] = [
    { time: "4 min", focus: "Frame reliable file processing as a complete life cycle rather than one read statement.", prompt: "What must happen even if opening or converting data fails?", source: "2027–2029 syllabus 20.2 p.38; coursebook Chapter 26 printed pp.446–458.", content: <Slide number="01" eyebrow="A2 · PAPER 3 + PAPER 4" sourceLabel="TEXTBOOK Ch26 · pp.446–458" syllabusLabel="SYLLABUS 20.2" className="a2-slide a2-title a2-at-slide"><section className="a2-title-grid"><div><span>LESSON 29 · 90 MINUTES</span><h1>Open with intent.<br /><em>Fail with control.</em></h1><p>records · modes · sequential · random · exceptions</p></div><div className="a2-at-hero" role="img" aria-label="File processing and exception handling lesson themes"><strong>FILE</strong><span>OPEN</span><span>READ</span><span>SEEK</span><span>HANDLE</span></div></section></Slide> },
    { time: "5 min", focus: "Map every named requirement in syllabus 20.2.", prompt: "Which verbs require code, and which require explanation?", source: "Official 2027–2029 syllabus 20.2 p.38.", content: <Slide number="02" eyebrow="TODAY'S EXAM MAP" sourceLabel="SYLLABUS p.38" syllabusLabel="20.2 · REQUIRED" title="Write the file operations; understand, choose and code exception handling." className="a2-slide a2-at-slide"><ConceptCards columns={4} items={[{ eyebrow: "LIFE CYCLE", title: "Open + close", body: "READ · WRITE · APPEND." }, { eyebrow: "RECORDS", title: "Read + write", body: "Structured items, not isolated fields." }, { eyebrow: "ORGANISATION", title: "Serial · sequential · random", body: "Match access to storage." }, { eyebrow: "ROBUSTNESS", title: "Exceptions", body: "Know when and write handlers." }]} /></Slide> },
    { time: "5 min", focus: "Reconnect file organisation to the access operation it enables.", prompt: "Which organisation lets the program jump straight to a calculated address?", source: "Coursebook §26.02 pp.448–455; earlier Chapter 16 pp.317–320.", content: <Slide number="03" eyebrow="THREE FILE ORGANISATIONS" sourceLabel="TEXTBOOK pp.448–455" syllabusLabel="20.2 · SERIAL / SEQUENTIAL / RANDOM" title="Organisation determines how a record can be reached." className="a2-slide a2-at-slide"><FileAccessDiagram /></Slide> },
    { time: "6 min", focus: "Choose an open mode from the intended change to the file.", prompt: "Which mode risks destroying previous contents?", source: "Coursebook Table 26.01 p.448; syllabus 20.2 p.38.", content: <Slide number="04" eyebrow="OPEN WITH PURPOSE" sourceLabel="TEXTBOOK TABLE 26.01 · p.448" syllabusLabel="20.2 · OPEN / CLOSE" title="The mode is a contract: inspect, replace or extend." className="a2-slide a2-at-slide"><CompareTable headers={["Mode", "Purpose", "Starting effect / position", "Risk"]} rows={[["READ", "retrieve existing data", "start of existing file", "missing file may raise exception"], ["WRITE", "create a new file", "empty file / old contents replaced", "accidental overwrite"], ["APPEND", "add new records", "end of existing file", "cannot revise earlier record in place"], ["RANDOM", "direct record access", "pointer moved using SEEK", "fixed-length address discipline"]]} /></Slide> },
    { time: "6 min", focus: "Write a safe sequential text-file loop with EOF as the guard.", prompt: "Why is READFILE inside, not before, this loop?", source: "Coursebook sequential file processing pp.449–452; 9618/31 M/J 2023 Q10.", content: <Slide number="05" eyebrow="READ EVERY LINE" sourceLabel="9618/31 M/J 2023 · Q10" syllabusLabel="20.2 · SEQUENTIAL PROCESSING" title="Guard with EOF, read one line, process it, then close." className="a2-slide a2-at-slide"><WorkedBoard label="Sequential text-file traversal"><pre><code>{`DECLARE Line : STRING
OPENFILE SaleFile FOR READ
WHILE NOT EOF(SaleFile)
   READFILE SaleFile, Line
   IF Line <> "" THEN
      OUTPUT Line
   ENDIF
ENDWHILE
CLOSEFILE SaleFile`}</code></pre></WorkedBoard></Slide> },
    { time: "6 min", focus: "Distinguish replacing a text file from appending new lines.", prompt: "Which mode is correct for a daily transaction log, and why?", source: "Coursebook §26.02 pp.448–452; syllabus 20.2.", content: <Slide number="06" eyebrow="WRITE OR APPEND" sourceLabel="TEXTBOOK pp.448–452" syllabusLabel="20.2 · WRITE / APPEND" title="WRITE begins a replacement; APPEND preserves earlier lines." className="a2-slide a2-at-slide"><FlowStrip steps={[{ eyebrow: "SERIALISE", title: "convert the record to one text line" }, { eyebrow: "OPEN", title: "FOR WRITE or FOR APPEND" }, { eyebrow: "OUTPUT", title: "WRITEFILE file, line" }, { eyebrow: "FINISH", title: "CLOSEFILE file" }]} /></Slide> },
    { time: "6 min", focus: "Use the three random-file operations in their required order.", prompt: "What does SEEK change: the record, or the file pointer?", source: "Coursebook Worked Example 26.03 p.453; 9618/32 M/J 2023 Q6(b).", content: <Slide number="07" eyebrow="RANDOM ACCESS" sourceLabel="TEXTBOOK WORKED EXAMPLE 26.03" syllabusLabel="20.2 · SEEK / GET / PUT" title="Calculate an address, seek to it, then retrieve or replace the record." className="a2-slide a2-at-slide"><FlowStrip steps={[{ eyebrow: "ADDRESS", title: "Location ← Hash(Key)" }, { eyebrow: "POSITION", title: "SEEK File, Location" }, { eyebrow: "READ", title: "GETRECORD File, Record" }, { eyebrow: "UPDATE", title: "change Record field" }, { eyebrow: "WRITE BACK", title: "SEEK + PUTRECORD" }]} /></Slide> },
    { time: "6 min", focus: "Write a complete in-place random record update.", prompt: "Why is the second SEEK explicit before PUTRECORD?", source: "Coursebook random-access processing pp.453–455; 9618/33 M/J 2025 Q11.", content: <Slide number="08" eyebrow="UPDATE IN PLACE" sourceLabel="TEXTBOOK pp.453–455" syllabusLabel="20.2 · RANDOM FILE CODE" title="Retrieve, change the record variable, return to the address and write back." className="a2-slide a2-at-slide"><WorkedBoard label="Update one fixed-length record"><pre><code>{`OPENFILE MemberFile FOR RANDOM
Location ← Hash(TargetID)
SEEK MemberFile, Location
GETRECORD MemberFile, ThisMember
ThisMember.Active ← TRUE
SEEK MemberFile, Location
PUTRECORD MemberFile, ThisMember
CLOSEFILE MemberFile`}</code></pre></WorkedBoard></Slide> },
    { time: "6 min", focus: "Compare sequential and direct access without confusing access method and file organisation.", prompt: "How can an index provide direct access to a sequential file?", source: "Coursebook Chapter 16 pp.317–320 and Chapter 26; 9618/32 M/J 2024 Q7.", content: <Slide number="09" eyebrow="ACCESS METHOD ≠ ORGANISATION" sourceLabel="9618/32 M/J 2024 · Q7" syllabusLabel="20.2 · COMPARE" title="Sequential access walks records; direct access uses an address route." className="a2-slide a2-at-slide"><CompareTable headers={["Route", "How record is found", "Typical file"]} rows={[["sequential access", "read one after another from the start", "serial or key-ordered sequential"], ["direct via index", "look up key → stored address", "sequential file with separate index"], ["direct via hash", "calculate expected address from key", "random file"], ["collision fallback", "probe / overflow / chain until key or empty slot", "random file"]]} /></Slide> },
    { time: "6 min", focus: "Define exception and explain the value of controlled recovery.", prompt: "Why is a missing file a run-time problem even when the code compiled correctly?", source: "Coursebook §26.03 pp.455–456; 9618/31 O/N 2025 Q10.", content: <Slide number="10" eyebrow="WHAT IS AN EXCEPTION?" sourceLabel="9618/31 O/N 2025 · Q10" syllabusLabel="20.2 · UNDERSTAND" title="An exception is an unexpected run-time event that disrupts normal flow." className="a2-slide a2-at-slide"><ConceptCards columns={4} items={[{ eyebrow: "PROGRAM", title: "Invalid operation", body: "divide by zero · bad index" }, { eyebrow: "USER", title: "Unexpected data", body: "text where an integer is required" }, { eyebrow: "RESOURCE", title: "Unavailable file/device", body: "missing file · hardware failure" }, { eyebrow: "IMPORTANCE", title: "Controlled outcome", body: "message · recover · clean up · continue" }]} /></Slide> },
    { time: "7 min", focus: "Trace normal and exceptional paths through the handler structure.", prompt: "Which block runs whether or not an exception occurs?", source: "Coursebook §26.03 pp.455–456; syllabus 20.2.", content: <Slide number="11" eyebrow="CONTROLLED FAILURE PATH" sourceLabel="TEXTBOOK §26.03 · pp.455–456" syllabusLabel="20.2 · EXCEPTION HANDLING" title="TRY isolates risky work; EXCEPT handles a match; FINALLY guarantees cleanup." className="a2-slide a2-at-slide"><ExceptionFlow /></Slide> },
    { time: "7 min", focus: "Write specific exception handling around a file operation.", prompt: "Why is FileNotFoundError more useful than one catch-all handler?", source: "Coursebook Worked Example 26.04 p.456; 9618/41 M/J 2025 Q2(a),(c).", content: <Slide number="12" eyebrow="WRITE THE HANDLER" sourceLabel="9618/41 M/J 2025 · Q2(a),(c)" syllabusLabel="20.2 · WRITE CODE" title="Catch the failure you can explain and recover from." className="a2-slide a2-at-slide"><WorkedBoard label="Python console-mode example"><pre><code>{`try:
    with open("sales.txt", "r") as file:
        for line in file:
            amount = int(line.strip())
except FileNotFoundError:
    print("sales.txt was not found")
except ValueError:
    print("A line is not an integer")
finally:
    print("File task finished")`}</code></pre></WorkedBoard></Slide> },
    { time: "7 min", focus: "Choose exception handling only where run-time failure is plausible and meaningful.", prompt: "Which problems should be prevented by ordinary validation before TRY?", source: "Syllabus 20.2 p.38; coursebook §26.03; Paper 4 mark schemes.", content: <Slide number="13" eyebrow="ROBUST FILE PIPELINE" sourceLabel="SYLLABUS + PAPER 4" syllabusLabel="20.2 · WHEN APPROPRIATE" title="Validate predictable input; handle failures that can still occur at run time." className="a2-slide a2-at-slide"><CompareTable headers={["Stage", "Normal defence", "Exception boundary"]} rows={[["input", "range/type/presence checks", "conversion may still raise ValueError"], ["open", "correct name and mode", "file may be missing or inaccessible"], ["read / parse", "check expected fields", "I/O may fail; data may be malformed"], ["write", "confirm target and format", "storage/device may fail"], ["finish", "close after success", "finally/context manager cleans up on either path"]]} /></Slide> },
    { time: "8 min", focus: "Write the control conditions for inserting into the first empty random-file location.", prompt: "Five minutes attempt; award marks for bounds, record operations, stop condition and full-file outcome.", source: "Adapted from Cambridge 9618/33 M/J 2025 Q11 and the published mark scheme.", content: <Slide number="14" eyebrow="PAST PAPER PRACTICE" sourceLabel="9618/33 M/J 2025 · Q11" syllabusLabel="20.2 · 5 MARKS" title="Store NewItem in the first empty location, or report that the file is full." className="a2-slide a2-paper a2-at-slide"><ExamPractice reference="9618/33 M/J 2025 · Q11 · ADAPTED" marks={5} prompt={<p>A random file contains 100 fixed-length records. Write pseudocode that searches from location 0, writes <code>NewItem</code> into the first record whose key is empty, and reports if no location is free. [5]</p>} answer={<pre><code>{`OPENFILE ItemFile FOR RANDOM
Location ← 0
Stored ← FALSE
WHILE Location < 100 AND Stored = FALSE
   SEEK ItemFile, Location
   GETRECORD ItemFile, ThisItem
   IF ThisItem.Code = "" THEN
      SEEK ItemFile, Location
      PUTRECORD ItemFile, NewItem
      Stored ← TRUE
   ELSE
      Location ← Location + 1
   ENDIF
ENDWHILE
IF Stored = FALSE THEN
   OUTPUT "File full"
ENDIF
CLOSEFILE ItemFile`}</code></pre>} /></Slide> },
    { time: "5 min", focus: "Close Section 20 and the complete A2 Paper 3 syllabus sequence.", prompt: "Students state one file rule, one random operation and one exception-handling rule.", source: "Syllabus 20.2 p.38; coursebook Chapter 26 pp.446–458.", content: <Slide number="15" eyebrow="SYLLABUS CLOSE" sourceLabel="TEXTBOOK Ch26 · pp.446–458" syllabusLabel="SECTIONS 13–20 · COMPLETE" title="Open deliberately, process the right record, close reliably and recover visibly." className="a2-slide a2-exit a2-at-slide"><section className="a2-exit-grid"><article><span>MODE</span><p>READ, WRITE, APPEND or RANDOM.</p></article><article><span>ROUTE</span><p>Sequential scan or direct address.</p></article><article><span>RECORD</span><p>GET, change, SEEK, PUT.</p></article><article><span>EXCEPTION</span><p>TRY risky work; handle and clean up.</p></article></section><div className="homework-callout"><b>HOMEWORK 29</b><span>30 marks · files and exceptions</span><strong>45 min</strong></div></Slide> },
  ];

  return <A2TheoryLesson lessonNumber="29" title="File processing and exception handling" syllabusLabel="SYLLABUS 20.2" sourceLabel="TEXTBOOK Ch26 · pp.446–458" slides={slides} homeworkSections={homeworkSections} sourceSummary="Official 2027–2029 syllabus 20.2 p.38 · endorsed coursebook Chapter 26 printed pp.446–458 · verified 2023–2025 Paper 3 and Paper 4 questions and mark schemes" sourceDetail="The lesson writes complete record-processing routines for serial, sequential and random files; distinguishes READ, WRITE and APPEND; uses SEEK, GETRECORD and PUTRECORD; and explains when and how to handle run-time exceptions. It closes new A2 Paper 3 content before the mock cycle." />;
}
