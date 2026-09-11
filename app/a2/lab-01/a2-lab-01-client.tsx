"use client";

import { ExamReveal } from "../../_components/exam-reveal";
import {
  HomeworkSheet,
  LessonShell,
  Mark,
  Slide,
  type HomeworkSection,
  type SlideData,
} from "../../_components/lesson-shell";
import { A2_LAB_ONE_LINKS, A2_PREVIEW_CATALOG } from "../../_data/a2-course";

const homeworkSections: HomeworkSection[] = [
  {
    code: "A",
    title: "Paper 4 workflow",
    subtitle: "Protect marks by making the program and its evidence independently checkable",
    marks: 8,
    questions: [
      {
        id: "a2-p01-1",
        marks: 4,
        lines: 4,
        prompt: <><b>State four conditions or requirements of Paper 4.</b></>,
        answer: <p>Any four: 2 hours 30 minutes; 75 marks; practical application of Sections 19–20 except low-level/declarative programming; an approved console language; centre-owned computer; no internet/email; complete program listings; specified screenshots/testing evidence; work saved regularly. <em>[1 each, max 4]</em></p>,
      },
      {
        id: "a2-p01-2",
        marks: 2,
        lines: 3,
        prompt: <><b>Put the main exam workflow into a safe order.</b><p>Include reading, coding, running, saving and evidence.</p></>,
        answer: <p>Read and annotate the requirements → create the correctly named file → code → run the specified test → save → place the requested code/output evidence in the correct section. Award one mark for the correct main sequence and one for saving plus correctly placed evidence.</p>,
      },
      {
        id: "a2-p01-3",
        marks: 2,
        lines: 3,
        prompt: <><b>Explain why both a code listing and an output screenshot may be requested.</b></>,
        answer: <p>The code listing shows the algorithm and implementation that can be marked <em>[1]</em>; the screenshot shows the requested test was executed and produced the displayed result <em>[1]</em>.</p>,
      },
    ],
  },
  {
    code: "B",
    title: "Python file task",
    subtitle: "Write robust, readable code that returns a predictable type",
    marks: 12,
    questions: [
      {
        id: "a2-p01-4",
        marks: 7,
        lines: 8,
        prompt: <><b>Write a function <code>read_scores(filename)</code>.</b><p>It must read every integer from a text file into a list, handle a missing file and return the list.</p></>,
        answer: <pre>{`def read_scores(filename):\n    scores = []\n    try:\n        with open(filename, "r") as source_file:\n            for line in source_file:\n                scores.append(int(line.strip()))\n    except FileNotFoundError:\n        print(filename, "was not found")\n    return scores`}</pre>,
      },
      {
        id: "a2-p01-5",
        marks: 3,
        lines: 7,
        prompt: <><b>Write <code>format_report(scores)</code>.</b><p>Use a loop and return the count, total and one-decimal average. Return <code>No scores loaded</code> for an empty list.</p></>,
        answer: <pre>{`def format_report(scores):\n    if len(scores) == 0:\n        return "No scores loaded"\n    total = 0\n    for score in scores:\n        total = total + score\n    average = total / len(scores)\n    return f"Count: {len(scores)} Total: {total} Average: {average:.1f}"`}</pre>,
      },
      {
        id: "a2-p01-6",
        marks: 2,
        lines: 3,
        prompt: <><b>Write the main-program statements</b> that read <code>Scores.txt</code> and output the formatted report.</>,
        answer: <pre>{`scores = read_scores("Scores.txt")\nprint(format_report(scores))`}</pre>,
      },
    ],
  },
  {
    code: "C",
    title: "Published-paper transfer",
    subtitle: "Apply the workflow to a concise adaptation of a verified Paper 4 task",
    marks: 10,
    questions: [
      {
        id: "a2-p01-7",
        marks: 6,
        lines: 8,
        prompt: <><Mark>PAST PAPER PRACTICE</Mark><p><b>Write <code>ReadData()</code> to read 45 strings from <code>Data.txt</code> into a list and return it.</b></p><p>Adapted from 9618/41 O/N 2024 Q1(a). [6]</p></>,
        answer: <pre>{`def ReadData():\n    data = []\n    try:\n        with open("Data.txt", "r") as source_file:\n            for line in source_file:\n                data.append(line.strip())\n    except FileNotFoundError:\n        print("Data.txt was not found")\n    return data`}</pre>,
      },
      {
        id: "a2-p01-8",
        marks: 3,
        lines: 4,
        prompt: <><Mark>PAST PAPER PRACTICE</Mark><p><b>Call <code>ReadData</code>, pass its returned list to the supplied function <code>FormatArray</code>, and output the result.</b></p></>,
        answer: <pre>{`colours = ReadData()\nprint(FormatArray(colours))`}</pre>,
      },
      {
        id: "a2-p01-9",
        marks: 1,
        lines: 2,
        prompt: <><b>State what the requested output screenshot must show.</b></>,
        answer: <p>A complete console output showing all 45 strings in one space-separated result. <em>[1]</em></p>,
      },
    ],
  },
];

export default function A2Lab01Client() {
  const slides: SlideData[] = [
    {
      time: "2 min",
      focus: "Establish Paper 4 as a weekly practice track from the first A2 week.",
      prompt: "Ask what an examiner can mark if working code never appears in the evidence document.",
      source: "Syllabus assessment details p.40 and Section 20.2.",
      content: <Slide number="01" eyebrow="A2 · PYTHON LAB" sourceLabel="TEXTBOOK Ch26 · pp.446–458" syllabusLabel="20.2 · PAPER 4" className="a2-slide a2-lab-title"><section className="a2-lab-title-grid"><div><span>LAB P01 · 90 MINUTES</span><h1>Code it.<br /><em>Run it.</em><br />Prove it.</h1><p>Paper 4 baseline · text files · exceptions · evidence</p></div><div className="a2-evidence-loop" role="img" aria-label="Paper 4 workflow: read, code, run, save, evidence"><b>READ</b><i>→</i><b>CODE</b><i>→</i><b>RUN</b><i>→</i><b>SAVE</b><i>→</i><strong>EVIDENCE</strong></div></section></Slide>,
    },
    {
      time: "5 min",
      focus: "Make the duration, marks, syllabus scope, environment and submission obligations explicit.",
      prompt: "Students highlight which requirements concern the program and which concern evidence.",
      source: "2027–2029 syllabus assessment overview and details pp.11, 40.",
      content: <Slide number="02" eyebrow="THE PAPER 4 CONTRACT" sourceLabel="OFFICIAL SYLLABUS p.40" syllabusLabel="PAPER 4 · AO3 100%" title="The practical exam assesses the solution that the examiner can verify." className="a2-slide"><section className="a2-contract-grid"><article><b>2 h 30</b><span>working time</span></article><article><b>75</b><span>marks</span></article><article><b>19–20</b><span>practical scope</span></article><article><b>console</b><span>Python / Java / VB</span></article></section><div className="a2-contract-note"><b>EXAM COMPUTER</b><span>centre-owned · no internet · no email · source files contain no binary files</span></div></Slide>,
    },
    {
      time: "3 min",
      focus: "Prevent the highest-cost procedural error: having working code without submitted evidence.",
      prompt: "Read the statement, then students rewrite it as a personal non-negotiable checklist item.",
      source: "Syllabus p.40: work without evidence in the supplied evidence document receives no marks.",
      content: <Slide number="03" eyebrow="THE ZERO-MARK TRAP" sourceLabel="OFFICIAL SYLLABUS p.40" syllabusLabel="PAPER 4 · SUBMISSION" title="Working on screen is not the same as evidence submitted." className="a2-slide a2-zero"><div className="a2-zero-equation"><span>perfect code</span><b>+</b><span>empty evidence section</span><strong>= 0 marks for that work</strong></div><p className="a2-rule"><b>NON-NEGOTIABLE</b><span>Save regularly. Paste every requested listing or screenshot into the correct numbered section before moving on.</span></p></Slide>,
    },
    {
      time: "6 min",
      focus: "Teach one repeatable loop that protects both programming and submission marks.",
      prompt: "Students place six shuffled action cards in order and name the checkpoint after each run.",
      source: "Syllabus p.40 Paper 4 submission guidance; coursebook Chapter 26 practical workflow.",
      content: <Slide number="04" eyebrow="ONE REPEATABLE LOOP" sourceLabel="TEXTBOOK Ch26 · EXAM WORKFLOW" syllabusLabel="PAPER 4 · EVIDENCE" title="Repeat the same six-step loop for every task." className="a2-slide"><section className="a2-six-loop">{[["01","READ","underline output + constraints"],["02","NAME","create the requested file"],["03","CODE","solve one testable part"],["04","RUN","use the specified data"],["05","SAVE","source + evidence document"],["06","PROVE","listing or full screenshot"]].map(([n,t,d])=><article key={n}><span>{n}</span><b>{t}</b><p>{d}</p></article>)}</section></Slide>,
    },
    {
      time: "4 min",
      focus: "Connect relative file paths to the exam working folder.",
      prompt: "Predict which open call succeeds if Scores.txt sits beside main.py.",
      source: "Syllabus 20.2 file processing; coursebook Chapter 26 file organisation and access.",
      content: <Slide number="05" eyebrow="WORKING FOLDER" sourceLabel="TEXTBOOK Ch26 · FILES" syllabusLabel="20.2 · FILE PROCESSING" title="The folder structure is part of the solution." className="a2-slide"><section className="a2-folder-layout"><div className="a2-file-tree"><b>Candidate_1042/</b><span>├── main.py</span><span>├── Scores.txt</span><span>└── evidence.docx</span></div><div className="a2-path-call"><code>{'open("Scores.txt", "r")'}</code><p>Relative path: look beside the running program.</p><strong>Match spelling, capitals and extension exactly.</strong></div></section></Slide>,
    },
    {
      time: "4 min",
      focus: "Choose file modes intentionally and explain why with closes the handle reliably.",
      prompt: "Which mode risks destroying existing content? Which preserves it and adds at the end?",
      source: "Syllabus 20.2 open/read/write/append/close; coursebook Chapter 26 pp.446–458.",
      content: <Slide number="06" eyebrow="READ · WRITE · APPEND" sourceLabel="TEXTBOOK Ch26 · pp.446–458" syllabusLabel="20.2 · FILE MODES" title="The mode decides what may happen to the file." className="a2-slide"><section className="a2-mode-grid"><article><b>r</b><span>READ</span><p>file must exist · content preserved</p></article><article><b>w</b><span>WRITE</span><p>create or overwrite · existing content can be lost</p></article><article><b>a</b><span>APPEND</span><p>create or add at the end</p></article></section><pre>{`with open("Scores.txt", "r") as source_file:\n    for line in source_file:\n        print(line.strip())  # closed automatically after the block`}</pre></Slide>,
    },
    {
      time: "8 min",
      focus: "Turn prose requirements into a one-to-one implementation checklist.",
      prompt: "Pairs label which code feature earns each of six marks before any code is written.",
      source: "Adapted from 9618/41 O/N 2024 Q1(a), verified against the published mark scheme.",
      content: <Slide number="07" eyebrow="REQUIREMENTS → MARKS" sourceLabel="9618/41 O/N 2024 · Q1(a)" syllabusLabel="20.2 · PAPER 4" title="Translate each bullet into a visible code feature." className="a2-slide"><section className="a2-mark-map"><article><span>01</span><p>declare function</p></article><article><span>02</span><p>create local list</p></article><article><span>03</span><p>open named file</p></article><article><span>04</span><p>loop through records</p></article><article><span>05</span><p>store each string</p></article><article><span>06</span><p>return the list</p></article></section><p className="a2-alert"><b>Before coding</b> Your checklist should be short enough to scan while testing, and specific enough to expose a missing requirement.</p></Slide>,
    },
    {
      time: "12 min",
      focus: "Construct ReadData incrementally with visible correspondence to the requirements.",
      prompt: "Students complete the three blanks, run on a tiny file, then compare with the reveal.",
      source: "Adapted from 9618/41 O/N 2024 Q1(a); syllabus 20.2.",
      content: <Slide number="08" eyebrow="PAIR CODE · READDATA" sourceLabel="9618/41 O/N 2024 · Q1(a)" syllabusLabel="20.2 · FILE PROCESSING" title="Build the smallest function that satisfies all six requirements." className="a2-slide a2-code-task"><pre>{`def ReadData():\n    data = ______\n    with open(__________, ___) as source_file:\n        for line in source_file:\n            __________________________\n    return data`}</pre><ExamReveal><pre>{`def ReadData():\n    data = []\n    with open("Data.txt", "r") as source_file:\n        for line in source_file:\n            data.append(line.strip())\n    return data`}</pre></ExamReveal></Slide>,
    },
    {
      time: "4 min",
      focus: "Handle a predictable file failure without hiding every possible programming error.",
      prompt: "Why is except Exception less helpful during development than a specific exception?",
      source: "Syllabus 20.2 exceptions, appropriateness and code; coursebook exception handling.",
      content: <Slide number="09" eyebrow="FAIL GRACEFULLY" sourceLabel="TEXTBOOK Ch26 · EXCEPTIONS" syllabusLabel="20.2 · EXCEPTION HANDLING" title="Catch the failure you can handle; keep the return type predictable." className="a2-slide"><section className="a2-exception-layout"><pre>{`def read_scores(filename):\n    scores = []\n    try:\n        with open(filename, "r") as file:\n            for line in file:\n                scores.append(int(line.strip()))\n    except FileNotFoundError:\n        print(filename, "was not found")\n    return scores`}</pre><article><span>SPECIFIC</span><b>FileNotFoundError</b><p>The program can explain the missing file and return an empty list.</p><strong>Do not silently catch every error.</strong></article></section></Slide>,
    },
    {
      time: "6 min",
      focus: "Use explicit iteration when the requirement assesses loop construction.",
      prompt: "Students trace OutputString across three values and identify the trailing space decision.",
      source: "9618/41 O/N 2024 Q1(b); Paper 4 algorithm implementation skills.",
      content: <Slide number="10" eyebrow="FORMAT THE RESULT" sourceLabel="9618/41 O/N 2024 · Q1(b)" syllabusLabel="19.1 + 20.1 · IMPLEMENT" title="If the task asks for a loop, make the loop visible." className="a2-slide"><section className="a2-format-layout"><pre>{`def FormatArray(data):\n    output_string = ""\n    for item in data:\n        output_string = output_string + item + " "\n    return output_string`}</pre><div><span>TRACE</span><p><b>start</b><code>{'""'}</code></p><p><b>red</b><code>{'"red "'}</code></p><p><b>blue</b><code>{'"red blue "'}</code></p></div></section><p className="a2-rule"><b>Read the verb</b><span>A convenient library method may produce the same output but fail to demonstrate the requested algorithm.</span></p></Slide>,
    },
    {
      time: "4 min",
      focus: "Compose functions in main without discarding return values.",
      prompt: "Which variable holds the returned list, and what is passed into FormatArray?",
      source: "9618/41 O/N 2024 Q1(b)(ii); procedural programming assumed in Section 20.1.",
      content: <Slide number="11" eyebrow="COMPOSE THE PROGRAM" sourceLabel="9618/41 O/N 2024 · Q1(b)" syllabusLabel="20.1 · PROCEDURAL" title="Capture a return value, pass it on, then display the final result." className="a2-slide"><section className="a2-call-flow"><article><code>ReadData()</code><span>returns list</span></article><i>→</i><article><code>colours</code><span>stores list</span></article><i>→</i><article><code>FormatArray(colours)</code><span>returns string</span></article><i>→</i><article><code>print(...)</code><span>shows result</span></article></section><pre>{`colours = ReadData()\nprint(FormatArray(colours))`}</pre></Slide>,
    },
    {
      time: "4 min",
      focus: "Distinguish readable code evidence from complete execution evidence.",
      prompt: "Students audit two hypothetical screenshots: cropped output and editor-only code.",
      source: "Syllabus p.40 Paper 4 submission; published Paper 4 evidence instructions.",
      content: <Slide number="12" eyebrow="MARKABLE EVIDENCE" sourceLabel="OFFICIAL SUBMISSION GUIDANCE" syllabusLabel="PAPER 4 · EVIDENCE" title="A stranger should be able to identify, read and verify the work." className="a2-slide"><section className="a2-evidence-grid"><article><span>CODE LISTING</span><b>complete + readable</b><p>copy the requested function/program as text into the correct section</p></article><article><span>OUTPUT SCREENSHOT</span><b>complete run + result</b><p>show enough console context to prove the required test was executed</p></article><article><span>IDENTITY + LOCATION</span><b>correct document section</b><p>centre/candidate naming and question number remain visible and organised</p></article></section></Slide>,
    },
    {
      time: "20 min",
      focus: "Complete an independent, evidence-ready file task under a strict time box.",
      prompt: "Use the five supplied numbers; students submit code listing and full expected output evidence.",
      source: "Teacher-authored bridge task aligned to syllabus 20.2 and Paper 4 evidence practice.",
      content: <Slide number="13" eyebrow="TIMED LAB · 20 MINUTES" sourceLabel="TEXTBOOK Ch26 · PRACTICE" syllabusLabel="20.2 · APPLY" title="Scores.txt: read, report, recover, prove." className="a2-slide a2-timed-lab"><section className="a2-timed-grid"><div><span>SCORES.TXT</span><pre>{`18\n12\n20\n15\n17`}</pre></div><article><ol><li>Write <code>read_scores(filename)</code>.</li><li>Handle a missing file specifically.</li><li>Write <code>format_report(scores)</code> using a loop.</li><li>Output count, total and one-decimal average.</li><li>Capture code and successful output evidence.</li></ol></article><div><span>EXPECTED RUN</span><pre>{`Count: 5\nTotal: 82\nAverage: 16.4`}</pre></div></section></Slide>,
    },
    {
      time: "6 min",
      focus: "Benchmark the class task against a real Paper 4 demand and published marking logic.",
      prompt: "Students tick the six visible features in their own ReadData solution, then name missing evidence.",
      source: "Adapted from 9618/41 O/N 2024 Q1(a)–(b)(iii) and published mark scheme.",
      content: <Slide number="14" eyebrow="AUTHENTIC BENCHMARK · 12 MARKS" sourceLabel="9618/41 O/N 2024 · Q1" syllabusLabel="20.2 · PAPER 4" title="The official task rewards traceable implementation, composition and output evidence." className="a2-slide a2-paper"><section className="a2-benchmark"><article><b>6</b><span>ReadData function</span><p>list · file · loop · store · return</p></article><article><b>3</b><span>FormatArray</span><p>iteration · concatenation · return</p></article><article><b>2</b><span>Main program</span><p>capture · pass · output</p></article><article><b>1</b><span>Evidence</span><p>complete specified result</p></article></section><small className="a2-adaptation">Concise classroom map of the published task; original paper and mark scheme remain Cambridge copyright.</small></Slide>,
    },
    {
      time: "2 min",
      focus: "End with a five-item operational check students can repeat in every lab.",
      prompt: "Students point to their evidence for each item or write the missing action.",
      source: "Lesson synthesis: syllabus 20.2 and Paper 4 submission guidance.",
      content: <Slide number="15" eyebrow="EXIT AUDIT" sourceLabel="TEXTBOOK Ch26 · PAPER 4" syllabusLabel="20.2 · READY" title="Before you leave the task, can the examiner verify all five?" className="a2-slide a2-exit"><section className="a2-audit-row">{["correct filename","saved source","successful run","code evidence","output evidence"].map((item,index)=><article key={item}><span>{String(index+1).padStart(2,"0")}</span><b>{item}</b></article>)}</section><div className="homework-callout"><b>HOMEWORK P01</b><span>30 marks · Python + evidence · answers reveal inline</span><strong>50 min</strong></div></Slide>,
    },
  ];

  return <LessonShell lessonNumber="P01" slides={slides} homework={<HomeworkSheet lessonNumber="P01" title="Paper 4 baseline and file evidence" marks={30} minutes={50} sourceLabel="TEXTBOOK Ch26 · PAPER 4" syllabusLabel="SYLLABUS 20.2" qualificationLabel="A LEVEL COMPUTER SCIENCE · 9618" instructions="Answer all questions and run all Python code. Inline exemplars are hidden by default and can be revealed beside each question; the printed student copy remains black-and-white without answers unless they are revealed before printing." sections={homeworkSections} />} lessonLinks={A2_LAB_ONE_LINKS} lessonCatalog={A2_PREVIEW_CATALOG} courseMapHref="../" courseStageLabel="A2 · 2028" qualificationLabel="A2 LAB" siblingCourseHref="../../" siblingCourseLabel="AS" examPapersHref="../../exam-papers/" sourceSummary="Official 2027–2029 syllabus §20.2 and Paper 4 submission rules · endorsed coursebook Chapter 26 · verified 9618/41 O/N 2024 task and mark scheme" sourceDetail="The lab uses Python console mode and teacher-authored files. Published-paper content is concisely adapted; full papers, support files and mark schemes remain available only through authorised Cambridge channels." />;
}

