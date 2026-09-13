import type { LessonCatalog, LessonLink } from "../_components/lesson-shell";

export const A2_PREVIEW_CATALOG: LessonCatalog = [
  ["01", "User-defined data types"],
  ["02", "File organisation and access"],
  ["03", "Hashing for file access"],
  ["04", "Floating-point format and decoding"],
  ["05", "Conversion, normalisation and bit allocation"],
  ["06", "Approximation, errors and Chapter 13 review"],
  ["07", "Protocols and the TCP/IP stack"],
  ["08", "Application-layer protocols"],
  ["09", "Circuit and packet switching"],
  ["10", "Routers and Chapter 14 review"],
  ["11", "RISC, CISC, pipelining and interrupts"],
  ["12", "Parallel processing architectures"],
  ["13", "Virtual machines"],
  ["14", "Boolean algebra and De Morgan's laws"],
  ["15", "Adders and flip-flops"],
  ["16", "Karnaugh maps and Chapter 15 review"],
  ["17", "OS resources, processes and states"],
  ["18", "CPU scheduling and interrupt handling"],
  ["19", "Paging, virtual memory and segmentation"],
  ["20", "Translation software, grammar and RPN"],
  ["21", "Symmetric and asymmetric cryptography"],
  ["22", "Quantum cryptography, SSL/TLS and certificates"],
  ["23", "Graphs, Dijkstra and A* search"],
  ["24", "Machine learning, neural networks and back propagation"],
  ["25", "Search, sort and Big O comparison"],
  ["26", "Abstract Data Types and their algorithms"],
  ["27", "Recursion, stacks and unwinding"],
  ["28", "Low-level, procedural, OOP and declarative paradigms"],
  ["29", "File processing and exception handling"],
  ["P01", "Python evidence and file baseline"],
];

export function buildA2LessonLinks(activeLabel: string): LessonLink[] {
  return A2_PREVIEW_CATALOG.map(([label]) => ({
    label,
    href: label === "P01" ? "../lab-01/" : `../lesson-${label}/`,
    active: label === activeLabel,
  }));
}

export const A2_LESSON_ONE_LINKS = buildA2LessonLinks("01");

export const A2_LAB_ONE_LINKS = buildA2LessonLinks("P01");

export const A2_PHASES = [
  { weeks: "W01–06", name: "Represent data", detail: "Section 13 · types, files and floating point", tone: "violet" },
  { weeks: "W07–10", name: "Move data", detail: "Section 14 · protocols and switching", tone: "teal" },
  { weeks: "W11–20", name: "Run systems", detail: "Sections 15–16 · hardware, logic, OS and translation", tone: "orange" },
  { weeks: "W21–24", name: "Secure + learn", detail: "Sections 17–18 · cryptography and AI", tone: "violet" },
  { weeks: "W25–32", name: "Solve + perform", detail: "Sections 19–20 · algorithms, paradigms and mocks", tone: "teal" },
] as const;

export const A2_WEEKLY_PLAN = [
  ["01", "13.1 · User-defined types: enum, pointer, set, record, class/object", "P01 · Paper 4 contract, evidence workflow and text-file baseline"],
  ["02", "13.2 · Serial, sequential and random file organisation", "Read/write/append modes; records in text files"],
  ["03", "13.2 · Sequential/direct access and hashing algorithms", "Keyed file task; hashing and controlled error cases"],
  ["04", "13.3 · Floating-point format, mantissa and exponent", "Arrays, numeric inputs and traceable test design"],
  ["05", "13.3 · Conversion, normalisation and bit allocation", "Validation functions and boundary test evidence"],
  ["06", "13.3 · Approximation, rounding, underflow and overflow · checkpoint", "Timed mini practical · diagnose from evidence"],
  ["07", "14.1 · Why protocols; four-layer TCP/IP stack", "Linear and binary search implementation spiral"],
  ["08", "14.1 · HTTP, FTP, POP3, IMAP, SMTP and BitTorrent", "Insertion and bubble sort implementation spiral"],
  ["09", "14.2 · Circuit switching: route, benefits and drawbacks", "Stack and queue implementation"],
  ["10", "14.2 · Packet switching and router decisions · Paper 3 clinic", "Linked-list and dictionary operations · diagnostic 1"],
  ["11", "15.1 · RISC, CISC, pipelining and registers", "Binary-tree search and insertion"],
  ["12", "15.1 · SISD, SIMD, MISD, MIMD and massive parallelism", "Implement one ADT using another"],
  ["13", "15.1 · Virtual machines: roles, benefits and limitations", "Benchmark time and memory; introduce Big O"],
  ["14", "15.2 · Boolean algebra and De Morgan’s laws", "Recursion essentials, base case and call stack"],
  ["15", "15.2 · Half/full adders; SR and JK flip-flops", "Write and trace recursive search/number routines"],
  ["16", "15.2 · Karnaugh maps and logic simplification · checkpoint", "Timed algorithms task · error-log repair"],
  ["17", "16.1 · OS resources, processes and state transitions", "OOP: classes, objects, attributes and methods"],
  ["18", "16.1 · Scheduling: RR, SJF, FCFS and SRT", "OOP: encapsulation, getters and setters"],
  ["19", "16.1 · Paging, virtual memory, segmentation and thrashing", "OOP: inheritance and polymorphism"],
  ["20", "16.2 · Compilation stages, BNF/syntax diagrams and RPN", "OOP: containment/aggregation and full class design"],
  ["21", "17.1 · Symmetric/asymmetric cryptography and key use", "Multi-class program with a supplied test plan"],
  ["22", "17.1 · Quantum cryptography, TLS and certificates", "Mixed OOP Paper 4 task · diagnostic 2"],
  ["23", "18.1 · Graphs, Dijkstra and A* search", "Sequential file processing with records"],
  ["24", "18.1 · Neural networks, ML, deep/reinforcement learning", "Random-access files and record updates"],
  ["25", "19.1 · Search, sort and Big O comparison", "Exception handling: specific failures and recovery"],
  ["26", "19.1 · ADTs: list, tree, graph, dictionary, stack and queue", "Robust file pipeline · read, validate, process, write"],
  ["27", "19.2 · Recursion, stacks and unwinding", "Timed Paper 4 section · review against mark points"],
  ["28", "20.1 · Low-level, procedural, OOP and declarative paradigms", "Full OOP + files practical task"],
  ["29", "20.2 · File processing and exception handling · syllabus close", "Specimen/official Paper 4 rehearsal · 150-minute extension"],
  ["30", "Full Paper 3 mock 1 · item analysis and reteach", "Paper 4 correction lab · rewrite weak evidence"],
  ["31", "Targeted Paper 3 repair · full mock 2", "Full Paper 4 mock 1 · 150-minute protected session"],
  ["32", "Final retrieval, command words and exam routines", "Full Paper 4 mock 2 · final evidence audit"],
] as const;
