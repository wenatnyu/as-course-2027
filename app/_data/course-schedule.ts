export type SyllabusBrief = {
  section: string;
  title: string;
  page: number;
  outcome: string;
};

const asRanges = [
  [1, 3, "1.1", "Data representation", 14, "Represent and convert data accurately; explain why each representation is used."],
  [4, 5, "1.2", "Multimedia", 15, "Explain how image and sound data are encoded and calculate storage requirements."],
  [6, 6, "1.3", "Compression", 15, "Compare lossy and lossless compression and apply run-length encoding."],
  [7, 9, "2.1", "Networks including the internet", 16, "Explain network models, devices, media and the services that move data."],
  [10, 10, "2.1", "Networks including the internet", 17, "Explain IP addressing, subnetting, URLs and DNS in internet communication."],
  [11, 14, "3.1", "Computers and their components", 17, "Explain how hardware components operate in input, processing, storage and control systems."],
  [15, 16, "3.2", "Logic gates and logic circuits", 18, "Use gate symbols, truth tables, Boolean expressions and logic circuits."],
  [17, 19, "4.1", "CPU architecture", 19, "Explain processor architecture, registers, buses, performance and the fetch-execute cycle."],
  [20, 23, "4.2", "Assembly language", 20, "Read, trace and explain assembly programs, addressing and two-pass assembly."],
  [24, 24, "4.3", "Bit manipulation", 22, "Perform shifts and masks and explain their effects on binary data."],
  [25, 28, "5", "System software", 23, "Explain operating systems, utilities, translators and development environments."],
  [29, 32, "6", "Security, privacy and data integrity", 24, "Distinguish key risks and apply suitable protection, validation and error-detection methods."],
  [33, 35, "7", "Ethics and ownership", 25, "Evaluate professional, legal and ethical consequences of computing."],
  [36, 38, "8.1-8.2", "Databases", 25, "Model relational data, normalise tables and explain DBMS functions."],
  [39, 40, "8.3", "DDL and DML", 26, "Write SQL to define, query and maintain data in up to two tables."],
  [41, 44, "9", "Algorithm design and problem-solving", 27, "Apply computational thinking and refine algorithms into precise solutions."],
  [45, 49, "10.1-10.3", "Data types and structures", 28, "Select and use records, arrays and files appropriately."],
  [50, 51, "10.4", "Abstract Data Types", 29, "Explain and apply stacks, queues and linked lists."],
  [52, 54, "11.1-11.2", "Programming", 29, "Use variables, expressions, selection and iteration correctly."],
  [55, 56, "11.3", "Structured programming", 30, "Design modular programs using procedures, functions, scope and parameters."],
  [57, 60, "12.1-12.2", "Software development", 30, "Apply the development life cycle and represent program designs clearly."],
  [61, 63, "12.3", "Testing and maintenance", 31, "Design tests, identify errors and explain maintenance strategies."],
] as const;

const a2Ranges = [
  [1, 3, "13.1-13.2", "User-defined types and file access", 32, "Use advanced data types and explain serial, sequential and random file organisation."],
  [4, 6, "13.3", "Floating-point representation", 33, "Represent, normalise and reason about binary floating-point values and errors."],
  [7, 10, "14.1-14.2", "Communication and internet technologies", 33, "Explain protocol layers and compare circuit and packet switching."],
  [11, 16, "15", "Hardware and virtual machines", 34, "Compare processor architectures and simplify logic using Boolean algebra."],
  [17, 20, "16", "System software", 35, "Explain resource management, scheduling, memory and translation software."],
  [21, 22, "17", "Security", 36, "Explain encryption protocols, certificates and secure communication."],
  [23, 24, "18", "Artificial intelligence", 36, "Apply graph-search ideas and explain machine-learning systems."],
  [25, 27, "19", "Computational thinking", 37, "Implement and compare algorithms, ADTs and recursion."],
  [28, 29, "20", "Further programming", 38, "Compare paradigms and build robust file-processing programs with exception handling."],
] as const;

export function getSyllabusBrief(stage: "AS" | "A2", lessonNumber: string): SyllabusBrief | null {
  const value = Number.parseInt(lessonNumber, 10);
  if (!Number.isFinite(value)) return null;
  const match = (stage === "A2" ? a2Ranges : asRanges).find(([start, end]) => value >= start && value <= end);
  if (!match) return null;
  return { section: match[2], title: match[3], page: match[4], outcome: match[5] };
}

export const AS_MILESTONES = [
  ["2026-09-20", 9, "Completed baseline"],
  ["2026-09-21", 10, "Chapter 2 complete"],
  ["2026-09-30", 16, "Chapter 3 complete"],
  ["2026-10-19", 24, "Chapter 4 complete"],
  ["2026-10-23", 28, "Chapter 5 complete"],
  ["2026-10-30", 32, "Chapter 6 complete"],
  ["2026-11-10", 40, "Chapters 7-8 complete"],
  ["2026-11-20", 44, "Chapter 9 complete"],
  ["2026-12-04", 51, "Chapter 10 complete"],
  ["2026-12-11", 56, "Chapter 11 complete"],
  ["2026-12-22", 63, "AS syllabus complete"],
] as const;

export const AS_SPRING_PLAN = [
  ["22-26 Feb", "Diagnostic + repair", "Paper 1 and Paper 2 baseline; build a personal error log"],
  ["1-12 Mar", "Paper 1 revision", "Sections 1-4: data, networks, hardware, processor and assembly"],
  ["15-26 Mar", "Paper 1 revision", "Sections 5-8: software, security, ethics, databases; timed P1"],
  ["29 Mar-9 Apr", "Paper 2 revision", "Sections 9-10: algorithms, data types, arrays, files and ADTs"],
  ["12-23 Apr", "Paper 2 revision", "Sections 11-12: programming, design, testing and maintenance; timed P2"],
  ["26 Apr-7 May", "Mock + final repair", "Two complete papers, command words, timing and high-frequency errors"],
  ["From May", "Exam window", "Use the Chinese Mainland timetable issued to the centre; dates pending"],
] as const;

export const A2_CALENDAR_PLAN = [
  ["01", "21-27 Sep", "L01-02", "Types, records/classes and file organisation", "P4 baseline: files + evidence"],
  ["02", "28 Sep-4 Oct", "L03", "Hashing and direct access (holiday-adjusted)", "Short file task"],
  ["03", "5-11 Oct", "L04-05", "Floating point: decode, convert and normalise", "Numeric tests"],
  ["04", "12-18 Oct", "L06-07", "Floating-point errors; TCP/IP stack", "Search implementation"],
  ["05", "19-25 Oct", "L08-09", "Application protocols; switching", "Stack + queue"],
  ["06", "26 Oct-1 Nov", "L10-11", "Routers; RISC/CISC and pipelining", "Linked list"],
  ["07", "2-8 Nov", "L12-13", "Parallel processing and virtual machines", "Tree operations"],
  ["08", "9-15 Nov", "L14", "Boolean algebra (event-adjusted)", "Recursion baseline"],
  ["09", "16-22 Nov", "Review", "Mid-term retrieval and repair", "Timed mini practical"],
  ["10", "23-29 Nov", "L15-16", "Adders, flip-flops and Karnaugh maps", "Recursive algorithms"],
  ["11", "30 Nov-6 Dec", "L17-18", "Processes, states and scheduling", "OOP classes + encapsulation"],
  ["12", "7-13 Dec", "L19-20", "Memory management and translation", "OOP inheritance"],
  ["13", "14-20 Dec", "L21-22", "Cryptography, TLS and certificates", "Multi-class program"],
  ["14", "21-27 Dec", "L23", "Graphs and path finding (holiday-adjusted)", "File records"],
  ["15", "28 Dec-3 Jan", "Pause", "New Year consolidation", "Optional repair only"],
  ["16", "4-10 Jan", "L24-25", "AI; searching, sorting and Big O", "Random files"],
  ["17", "11-17 Jan", "L26-27", "ADTs and recursion", "Exception handling"],
  ["18", "18-24 Jan", "L28-29", "Paradigms; files and exceptions", "Full mixed task"],
  ["19", "25-31 Jan", "Winter break", "Retrieval set 1", "Optional repair only"],
  ["20", "1-7 Feb", "Winter break", "Retrieval set 2", "Optional file task"],
  ["21", "8-14 Feb", "Winter break", "Paper 3 topic audit", "Code-reading drill"],
  ["22", "15-21 Feb", "Winter break", "Return-to-school diagnostic", "Environment and evidence check"],
  ["23", "22-28 Feb", "Mock cycle 1", "Timed Paper 3 + item analysis", "Targeted practical sections"],
  ["24", "1-7 Mar", "Repair 1", "Sections 13-14 weak points", "Files, exceptions and validation"],
  ["25", "8-14 Mar", "Repair 2", "Sections 15-16 weak points", "OOP and linked structures"],
  ["26", "15-21 Mar", "Repair 3", "Sections 17-18 weak points", "Recursion, searching and sorting"],
  ["27", "22-28 Mar", "Mock cycle 2", "Full timed Paper 3", "Full 150-minute Paper 4 mock"],
  ["28", "29 Mar-4 Apr", "Evidence repair", "Command words and calculations", "Screenshots, tests and complete evidence"],
  ["29", "5-11 Apr", "Mixed practice", "High-frequency Paper 3 questions", "Integrated scenario task"],
  ["30", "12-18 Apr", "Mock cycle 3", "Final full Paper 3", "Final full Paper 4 mock"],
  ["31", "19-25 Apr", "Final repair", "Personal error-log reteach", "Speed and robustness clinic"],
  ["32", "26 Apr-2 May", "Exam readiness", "Recall grid and exam routines", "Final environment/evidence checklist"],
] as const;
