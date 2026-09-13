"use client";

import { A2TheoryLesson, CompareTable, ConceptCards, ExamPractice, WorkedBoard } from "../../_components/a2-theory-lesson";
import { AddressingModePaths, ParadigmMap } from "../../_components/a2-advanced-diagrams";
import { Slide, type HomeworkSection, type SlideData } from "../../_components/lesson-shell";

const homeworkSections: HomeworkSection[] = [
  {
    code: "A", title: "Paradigm and low-level code", subtitle: "Name the style, then resolve the operand", marks: 10,
    questions: [
      { id: "a2-28-1", marks: 2, lines: 5, prompt: <><b>Define a programming paradigm and explain why one language may support more than one paradigm.</b></>, answer: <p>A programming paradigm is a fundamental style or approach to programming/problem-solving <em>[1]</em>. One language may provide features for several styles, so different parts of a program can use different paradigms <em>[1]</em>.</p> },
      { id: "a2-28-2", marks: 4, lines: 8, prompt: <><b>Calculate four independent results.</b><p>IX=3, BR=100; M[20]=50, M[23]=9 and M[50]=12. Give the value loaded by <code>LDD 20</code>, <code>LDI 20</code>, <code>LDX 20</code>, and the effective address used by <code>STO [BR] + 6</code>.</p></>, answer: <p><b>Direct:</b> <code>LDD 20</code> loads M[20] = 50 <em>[1]</em>. <b>Indirect:</b> <code>LDI 20</code> loads M[M[20]] = M[50] = 12 <em>[1]</em>. <b>Indexed:</b> <code>LDX 20</code> loads M[20+3] = M[23] = 9 <em>[1]</em>. <b>Relative:</b> effective address = BR+6 = 106 <em>[1]</em>.</p> },
      { id: "a2-28-3", marks: 4, lines: 8, prompt: <><span className="syllabus-mark">PAST PAPER PRACTICE</span><p><b>Write low-level code to store 25 in A, load the value at address 300 into B, then add A and B and store the result in TOTAL.</b></p><p>Adapted from 9618/31 O/N 2025 Q11(a). [4 adapted marks]</p></>, answer: <pre><code>{`LDM #25
STO A
LDD 300
STO B
ADD A
STO TOTAL

A: 0
B: 0
TOTAL: 0`}</code></pre> },
    ],
  },
  {
    code: "B", title: "Procedural and object-oriented", subtitle: "Organise steps or model collaborating objects", marks: 10,
    questions: [
      { id: "a2-28-4", marks: 3, lines: 6, prompt: <><b>State three characteristics of imperative (procedural) programming.</b></>, answer: <p>The programmer gives an explicit sequence of instructions that changes program state <em>[1]</em>. Code uses variables and structured constructs such as sequence, selection and iteration <em>[1]</em>. Procedures/functions decompose the solution into reusable modules <em>[1]</em>.</p> },
      { id: "a2-28-5", marks: 3, lines: 7, prompt: <><b>Explain encapsulation, inheritance and polymorphism.</b></>, answer: <p><b>Encapsulation</b> combines data and methods in a class and can restrict direct access <em>[1]</em>. <b>Inheritance</b> lets a derived class receive and extend members of a parent class <em>[1]</em>. <b>Polymorphism</b> lets the same method name have different implementations/behaviour in different derived classes <em>[1]</em>.</p> },
      { id: "a2-28-6", marks: 4, lines: 8, prompt: <><b>Design a class Member</b> for a library. Give two private attributes, a constructor, a getter and one behaviour method.</>, answer: <pre><code>{`CLASS Member
   PRIVATE MemberID : STRING
   PRIVATE Loans : INTEGER
   PUBLIC PROCEDURE NEW(ID : STRING)
      MemberID ← ID
      Loans ← 0
   ENDPROCEDURE
   PUBLIC FUNCTION GetLoans() RETURNS INTEGER
      RETURN Loans
   ENDFUNCTION
   PUBLIC PROCEDURE Borrow()
      Loans ← Loans + 1
   ENDPROCEDURE
ENDCLASS`}</code></pre> },
    ],
  },
  {
    code: "C", title: "Declarative logic and choice", subtitle: "Write what is true, then let inference satisfy the goal", marks: 10,
    questions: [
      { id: "a2-28-7", marks: 3, lines: 7, prompt: <><b>Write two facts and one query</b> stating that Amina is a student, computing is a subject, and asking which subjects exist.</>, answer: <pre><code>{`student(amina).
subject(computing).
subject(X).`}</code></pre> },
      { id: "a2-28-8", marks: 3, lines: 7, prompt: <><b>Contrast imperative and declarative programming.</b></>, answer: <p>Imperative code specifies <strong>how</strong> to reach a result as ordered state-changing steps <em>[1]</em>. Declarative code specifies <strong>what</strong> facts, relationships and rules hold <em>[1]</em>; an inference engine searches/backtracks to satisfy a goal <em>[1]</em>.</p> },
      { id: "a2-28-9", marks: 4, lines: 8, prompt: <><span className="syllabus-mark">PAST PAPER PRACTICE</span><p>Predicates <code>student(S)</code>, <code>subject(C)</code>, <code>choice1(S,C)</code> and <code>barred(S,C)</code> are supplied. <b>Write a rule <code>canEnrol(S,C)</code></b> that succeeds for a student and a subject when it is the student&apos;s first choice and the student is not barred.</p><p>Adapted from 9618/31 O/N 2023 Q11(c). [4 adapted marks]</p></>, answer: <pre><code>{`canEnrol(S, C) IF student(S)
                  AND subject(C)
                  AND choice1(S, C)
                  AND NOT barred(S, C)`}</code></pre> },
    ],
  },
];

export default function A2Lesson28Client() {
  const slides: SlideData[] = [
    { time: "4 min", focus: "Frame a paradigm as a way of expressing a solution, not a brand of language.", prompt: "How could Python support procedural and object-oriented solutions in the same program?", source: "2027–2029 syllabus 20.1 p.38; coursebook Chapter 25 printed pp.443–445.", content: <Slide number="01" eyebrow="A2 · PAPER 3" sourceLabel="TEXTBOOK Ch25 · Ch27–29" syllabusLabel="SYLLABUS 20.1" className="a2-slide a2-title a2-at-slide"><section className="a2-title-grid"><div><span>LESSON 28 · 90 MINUTES</span><h1>Same problem.<br /><em>Different lens.</em></h1><p>low-level · imperative · object-oriented · declarative</p></div><div className="a2-at-hero" role="img" aria-label="Programming paradigm lesson themes"><strong>PARADIGM</strong><span>PROCESSOR</span><span>STEPS</span><span>OBJECTS</span><span>RULES</span></div></section></Slide> },
    { time: "5 min", focus: "Map every named requirement in syllabus 20.1.", prompt: "Which two paradigms are excluded from Paper 4?", source: "Official 2027–2029 syllabus 20.1 p.38 and assessment details p.40.", content: <Slide number="02" eyebrow="TODAY'S EXAM MAP" sourceLabel="SYLLABUS pp.38, 40" syllabusLabel="20.1 · REQUIRED" title="Recognise four paradigms; write code in each required form." className="a2-slide a2-at-slide"><ConceptCards columns={4} items={[{ eyebrow: "LOW-LEVEL", title: "Five addressing modes", body: "Write code; Paper 3 only." }, { eyebrow: "IMPERATIVE", title: "Structured steps", body: "Variables, constructs, procedures, functions." }, { eyebrow: "OOP", title: "Design + code classes", body: "Paper 3 and Paper 4." }, { eyebrow: "DECLARATIVE", title: "Facts, rules, goals", body: "Write logic; Paper 3 only." }]} /></Slide> },
    { time: "5 min", focus: "Define paradigm and recognise overlap between language features.", prompt: "Does using a class force every line of a program to be object-oriented?", source: "Coursebook §25.01 p.444.", content: <Slide number="03" eyebrow="THE FOUR LENSES" sourceLabel="TEXTBOOK §25.01 · p.444" syllabusLabel="20.1 · DEFINE" title="A paradigm is a fundamental style of programming and problem-solving." className="a2-slide a2-at-slide"><ParadigmMap /><p>A programming language can support several paradigms; the chosen features reveal the style used for a particular part of the solution.</p></Slide> },
    { time: "6 min", focus: "Connect low-level programming to processor architecture and precise state change.", prompt: "Why is low-level code less portable than high-level code?", source: "Coursebook Chapter 28 pp.487–497; prior AS Sections 4.2–4.3.", content: <Slide number="04" eyebrow="LOW-LEVEL PARADIGM" sourceLabel="TEXTBOOK Ch28 · pp.487–497" syllabusLabel="20.1 · LOW-LEVEL" title="The programmer works directly with instructions, registers and memory addresses." className="a2-slide a2-at-slide"><ConceptCards columns={4} items={[{ eyebrow: "INSTRUCTION", title: "Opcode + operand", body: "One processor operation at a time." }, { eyebrow: "STATE", title: "ACC · IX · memory", body: "Track every changed location." }, { eyebrow: "CONTROL", title: "Compare + jump", body: "Labels implement selection and loops." }, { eyebrow: "TRADE-OFF", title: "Precise, hardware-specific", body: "Efficient control; weak portability." }]} /></Slide> },
    { time: "6 min", focus: "Retrieve the complete set of syllabus addressing modes.", prompt: "For each row, say whether the operand is data, an address, a pointer, a base or a displacement.", source: "Syllabus 20.1 p.38; coursebook Chapter 28 pp.488–495.", content: <Slide number="05" eyebrow="FIVE ADDRESSING ROUTES" sourceLabel="TEXTBOOK Ch28 · pp.488–495" syllabusLabel="20.1 · WRITE LOW-LEVEL CODE" title="Resolve the mode before using the operand." className="a2-slide a2-at-slide"><AddressingModePaths /><p>The coursebook uses <strong>absolute</strong> for a fixed numeric address and <strong>direct</strong> for the matching data lookup. Its base-register relative form is A2 content even though it is not in the standard 9618 example instruction set.</p></Slide> },
    { time: "6 min", focus: "Write a short low-level data path with immediate and direct operands.", prompt: "Which instruction loads a literal, and which loads from memory?", source: "Adapted from Cambridge 9618/31 O/N 2025 Q11(a), checked against the published mark scheme.", content: <Slide number="06" eyebrow="LOW-LEVEL CODE" sourceLabel="9618/31 O/N 2025 · Q11(a)" syllabusLabel="20.1 · WRITE" title="Load values, preserve them in memory, then calculate." className="a2-slide a2-at-slide"><WorkedBoard label="Store 25 in A; add the value at address 300"><pre><code>{`LDM #25      // immediate: ACC ← 25
STO A        // direct store: M[A] ← ACC
LDD 300      // direct load: ACC ← M[300]
STO B
ADD A        // ACC ← ACC + M[A]
STO TOTAL

A: 0
B: 0
TOTAL: 0`}</code></pre></WorkedBoard></Slide> },
    { time: "6 min", focus: "Identify the state-changing character of imperative programming.", prompt: "Where do sequence, selection and iteration appear in this routine?", source: "Coursebook Chapter 25 p.444; Chapters 12–15; syllabus 20.1 p.38.", content: <Slide number="07" eyebrow="IMPERATIVE · PROCEDURAL" sourceLabel="TEXTBOOK p.444 + AS PROGRAMMING" syllabusLabel="20.1 · IMPERATIVE" title="Tell the computer how: execute ordered statements that update state." className="a2-slide a2-at-slide a2-at-code-dense"><WorkedBoard label="Variables, constructs, procedure and function"><pre><code>{`FUNCTION IsPass(Mark : INTEGER) RETURNS BOOLEAN
   RETURN Mark >= 50
ENDFUNCTION

PROCEDURE CountPasses(Marks : ARRAY[0:99] OF INTEGER,
                      LastIndex : INTEGER)
   DECLARE Count : INTEGER
   DECLARE i : INTEGER
   Count ← 0
   FOR i ← 0 TO LastIndex
      IF IsPass(Marks[i]) THEN
         Count ← Count + 1
      ENDIF
   NEXT i
   OUTPUT Count
ENDPROCEDURE`}</code></pre></WorkedBoard></Slide> },
    { time: "6 min", focus: "Use every core object-oriented term with an accurate relationship.", prompt: "Which term means the blueprint, and which means one realised member of it?", source: "Coursebook Chapter 27 pp.459–486; syllabus 20.1 p.38.", content: <Slide number="08" eyebrow="OOP VOCABULARY" sourceLabel="TEXTBOOK Ch27 · pp.459–486" syllabusLabel="20.1 · OOP TERMS" title="A class defines state and behaviour; an object is an instance of that class." className="a2-slide a2-at-slide"><CompareTable headers={["Term", "Meaning", "Exam distinction"]} rows={[["class", "blueprint containing attributes and methods", "defined once"], ["object / instance", "one created member of a class", "owns its state"], ["property / attribute", "data describing object state", "may be private"], ["method", "procedure/function belonging to class", "acts on object data"], ["getter / setter", "controlled read / update method", "supports encapsulation"]]} /></Slide> },
    { time: "6 min", focus: "Relate encapsulation, inheritance, polymorphism and aggregation to class design.", prompt: "Is a Library a special kind of Book, or does it contain Books?", source: "Coursebook Chapter 27 pp.461–486; 9618/31 O/N 2024 Q9; 9618/31 M/J 2025 Q11(b).", content: <Slide number="09" eyebrow="OOP RELATIONSHIPS" sourceLabel="9618/31 O/N 2024 · Q9" syllabusLabel="20.1 · DESIGN CLASSES" title="Choose is-a for inheritance and has-a for containment (aggregation)." className="a2-slide a2-at-slide"><ConceptCards columns={4} items={[{ eyebrow: "ENCAPSULATION", title: "Protect state", body: "Private attributes; public methods/getters/setters." }, { eyebrow: "INHERITANCE", title: "is-a", body: "EBook inherits Book and extends it." }, { eyebrow: "POLYMORPHISM", title: "Same call, different action", body: "Display() is overridden in each subclass." }, { eyebrow: "AGGREGATION", title: "has-a", body: "Library contains a collection of Book objects." }]} /></Slide> },
    { time: "6 min", focus: "Write a complete class with private state and a public interface.", prompt: "Which statements may access Loans directly, and how is one Member object created?", source: "Coursebook §27.01–27.03 pp.460–468; 9618/32 O/N 2024 Q10.", content: <Slide number="10" eyebrow="OOP DESIGN → CODE" sourceLabel="TEXTBOOK pp.460–468" syllabusLabel="20.1 · WRITE OOP" title="Private state; public constructor and methods." className="a2-slide a2-at-slide a2-at-code-dense"><WorkedBoard label="Complete Cambridge-style class"><pre><code>{`CLASS Member
   PRIVATE MemberID : STRING
   PRIVATE Loans : INTEGER
   PUBLIC PROCEDURE NEW(ID : STRING)
      MemberID ← ID
      Loans ← 0
   ENDPROCEDURE
   PUBLIC FUNCTION GetLoans() RETURNS INTEGER
      RETURN Loans
   ENDFUNCTION
   PUBLIC PROCEDURE Borrow()
      Loans ← Loans + 1
   ENDPROCEDURE
ENDCLASS

DECLARE OneMember : Member
OneMember ← NEW Member("M104")`}</code></pre></WorkedBoard></Slide> },
    { time: "7 min", focus: "Express supplied information as declarative facts and a query.", prompt: "Which tokens are constants and which are variables?", source: "Coursebook Chapter 29 pp.498–503; syllabus 20.1 p.38.", content: <Slide number="11" eyebrow="DECLARATIVE · FACTS + GOAL" sourceLabel="TEXTBOOK Ch29 · pp.498–503" syllabusLabel="20.1 · FACTS / GOAL" title="State what is true; ask the inference engine what satisfies the goal." className="a2-slide a2-at-slide"><WorkedBoard label="Knowledge base and query"><pre><code>{`student(amina).
student(ben).
choice1(amina, computing).
choice1(ben, physics).

choice1(Person, computing).   % goal/query`}</code></pre><p>Lower-case names are constants. <code>Person</code> begins with a capital and is a variable; the first answer is <code>amina</code>.</p></WorkedBoard></Slide> },
    { time: "7 min", focus: "Write a rule and explain inference, instantiation and backtracking.", prompt: "What makes the engine try another possible value for H?", source: "Coursebook Chapter 29 pp.503–506; 9618/32 O/N 2023 Q11.", content: <Slide number="12" eyebrow="DECLARATIVE · RULES" sourceLabel="9618/32 O/N 2023 · Q11" syllabusLabel="20.1 · FACTS / RULES" title="A rule succeeds when every required sub-goal can be satisfied." className="a2-slide a2-at-slide"><WorkedBoard label="Cambridge Paper 3 rule form"><pre><code>{`canTry(N, H) IF person(N)
                AND hobby(H)
                AND NOT dislikes(N, H)`}</code></pre><p>Paper 3 uses <code>IF</code>, <code>AND</code> and <code>NOT</code>. The coursebook&apos;s Prolog form writes <code>:-</code> and commas instead. Variables are instantiated with facts; backtracking tries another binding after failure.</p></WorkedBoard></Slide> },
    { time: "7 min", focus: "Select a paradigm from the nature of the problem rather than habit.", prompt: "Which paradigm best fits each scenario, and could another still appear inside it?", source: "Coursebook Chapter 25 pp.443–445; syllabus 20.1 synthesis.", content: <Slide number="13" eyebrow="CHOOSE THE LENS" sourceLabel="TEXTBOOK Ch25 · pp.443–445" syllabusLabel="20.1 · COMPARE" title="The strongest solution may combine paradigms while keeping one dominant model." className="a2-slide a2-at-slide"><CompareTable headers={["Problem emphasis", "Natural paradigm", "Reason"]} rows={[["device register and exact memory route", "low-level", "hardware-visible control"], ["calculate report through ordered stages", "imperative", "explicit algorithm and changing variables"], ["school system with Student, Course, Teacher", "object-oriented", "persistent entities and relationships"], ["derive family relationships from known statements", "declarative", "facts, rules and queries"]]} /></Slide> },
    { time: "8 min", focus: "Produce a syntactically complete declarative rule under timed conditions.", prompt: "Four minutes attempt; then mark predicate coverage and negation.", source: "Adapted from Cambridge 9618/32 O/N 2023 Q11(c) and the published mark scheme.", content: <Slide number="14" eyebrow="PAST PAPER PRACTICE" sourceLabel="9618/32 O/N 2023 · Q11(c)" syllabusLabel="20.1 · 4 MARKS" title="Write a rule that returns hobbies a person can try." className="a2-slide a2-paper a2-at-slide"><ExamPractice reference="9618/32 O/N 2023 · Q11(c) · ADAPTED" marks={4} prompt={<p>Using <code>person(N)</code>, <code>hobby(H)</code> and <code>dislikes(N,H)</code>, write <code>canTry(N,H)</code> so it succeeds only when N is a person, H is a hobby and N does not dislike H. [4]</p>} answer={<pre><code>{`canTry(N, H) IF person(N)
                AND hobby(H)
                AND NOT dislikes(N, H)`}</code></pre>} /></Slide> },
    { time: "5 min", focus: "Retrieve the defining question for each paradigm and close 20.1.", prompt: "Students give one paradigm, one characteristic and one code feature from memory.", source: "Syllabus 20.1 p.38; coursebook Chapters 25, 27, 28 and 29.", content: <Slide number="15" eyebrow="EXIT TICKET" sourceLabel="TEXTBOOK Ch25 + Ch27–29" syllabusLabel="20.1 · COMPLETE" title="Processor, steps, objects or truths: name the lens before writing the code." className="a2-slide a2-exit a2-at-slide"><section className="a2-exit-grid"><article><span>LOW-LEVEL</span><p>Which address gives the value?</p></article><article><span>IMPERATIVE</span><p>Which steps change state?</p></article><article><span>OOP</span><p>Which objects own data and behaviour?</p></article><article><span>DECLARATIVE</span><p>Which facts and rules satisfy the goal?</p></article></section><div className="homework-callout"><b>HOMEWORK 28</b><span>30 marks · all four paradigms</span><strong>45 min</strong></div></Slide> },
  ];

  return <A2TheoryLesson lessonNumber="28" title="Programming paradigms" syllabusLabel="SYLLABUS 20.1" sourceLabel="TEXTBOOK Ch25 + Ch27–29" slides={slides} homeworkSections={homeworkSections} sourceSummary="Official 2027–2029 syllabus 20.1 p.38 · endorsed coursebook Chapters 25 and 27–29, printed pp.443–445 and 459–512 · verified 2023–2025 Paper 3 questions and mark schemes" sourceDetail="The lesson defines programming paradigms and teaches the required characteristics and code forms for low-level, imperative (procedural), object-oriented and declarative programming. Paper 4 excludes low-level and declarative programming; those two remain Paper 3 content." />;
}
