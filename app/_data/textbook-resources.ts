export type TextbookResource = {
  lesson: string;
  chapter: number;
  title: string;
  printedPages: number[];
};

const range = (start: number, end: number) => Array.from({ length: end - start + 1 }, (_, index) => start + index);

export const TEXTBOOK_RESOURCES: TextbookResource[] = [
  { lesson: "01", chapter: 1, title: "Number Systems", printedPages: range(3, 6) },
  { lesson: "02", chapter: 1, title: "Data Capacity & Prefixes", printedPages: range(6, 8) },
  { lesson: "03", chapter: 1, title: "Signed Binary, BCD & Arithmetic", printedPages: range(8, 14) },
  { lesson: "04", chapter: 1, title: "Characters & Bitmap Graphics", printedPages: range(14, 20) },
  { lesson: "05", chapter: 1, title: "Vector Graphics & Sound", printedPages: range(17, 21) },
  { lesson: "06", chapter: 1, title: "Compression", printedPages: range(21, 23) },
  { lesson: "07", chapter: 2, title: "Network Foundations & Models", printedPages: range(26, 29) },
  { lesson: "08", chapter: 2, title: "Topologies, Packet Paths & Cloud", printedPages: [29, 30, 31, 32, 39] },
  { lesson: "09", chapter: 2, title: "Network Media, Hardware & Internet Services", printedPages: range(32, 41) },
  { lesson: "10", chapter: 2, title: "IP Addressing, URLs & DNS", printedPages: range(41, 47) },
  { lesson: "11", chapter: 3, title: "Hardware Roles, Embedded Systems & Storage", printedPages: range(50, 58) },
  { lesson: "12", chapter: 3, title: "Primary Memory & ROM Families", printedPages: range(53, 54) },
  { lesson: "13", chapter: 3, title: "Storage & Peripheral Operations", printedPages: range(55, 63) },
  { lesson: "14", chapter: 3, title: "Monitoring & Control", printedPages: range(112, 114) },
  { lesson: "15", chapter: 3, title: "Logic Gates & Truth Tables", printedPages: range(66, 71) },
  { lesson: "16", chapter: 3, title: "Logic Circuits & Expressions", printedPages: range(71, 75) },
  { lesson: "17", chapter: 4, title: "Von Neumann Architecture & Registers", printedPages: range(80, 83) },
  { lesson: "18", chapter: 4, title: "System Buses, Performance & Ports", printedPages: range(83, 86) },
  { lesson: "19", chapter: 4, title: "Fetch-Execute Cycle & Interrupts", printedPages: range(87, 90) },
  { lesson: "20", chapter: 4, title: "Assembly Language & Instruction Groups", printedPages: range(91, 100) },
  { lesson: "21", chapter: 4, title: "Addressing Modes & Effective Addresses", printedPages: [94, 98] },
  { lesson: "22", chapter: 4, title: "The Two-Pass Assembler", printedPages: range(95, 97) },
  { lesson: "23", chapter: 4, title: "Tracing Assembly Programs", printedPages: range(98, 106) },
  { lesson: "24", chapter: 4, title: "Binary Shifts & Bit Masking", printedPages: [101, 102, ...range(115, 120)] },
  { lesson: "25", chapter: 5, title: "Operating Systems & Management", printedPages: range(121, 124) },
  { lesson: "26", chapter: 5, title: "Utilities, Libraries & DLLs", printedPages: range(124, 127) },
  { lesson: "27", chapter: 5, title: "Assemblers, Compilers, Interpreters & Java", printedPages: range(127, 129) },
  { lesson: "28", chapter: 5, title: "IDE Features & Chapter Review", printedPages: range(129, 132) },
  { lesson: "29", chapter: 6, title: "Security, Privacy, Integrity & Threats", printedPages: range(133, 136) },
  { lesson: "30", chapter: 6, title: "Layered Security & Access Control", printedPages: range(137, 140) },
  { lesson: "31", chapter: 6, title: "Validation, Verification & Check Digits", printedPages: range(140, 142) },
  { lesson: "32", chapter: 6, title: "Parity, Block Checks & Checksums", printedPages: range(141, 145) },
  { lesson: "33", chapter: 7, title: "Professional Ethics", printedPages: range(146, 150) },
  { lesson: "34", chapter: 7, title: "Copyright & Software Licensing", printedPages: range(150, 153) },
  { lesson: "35", chapter: 7, title: "AI Applications & Impacts", printedPages: range(153, 156) },
  { lesson: "36", chapter: 8, title: "Relational Databases & Keys", printedPages: range(158, 162) },
  { lesson: "37", chapter: 8, title: "E-R Diagrams & Normalisation to 2NF", printedPages: range(162, 166) },
  { lesson: "38", chapter: 8, title: "Third Normal Form & DBMS", printedPages: range(166, 170) },
  { lesson: "39", chapter: 8, title: "SQL DDL & Core DML", printedPages: range(170, 172) },
  { lesson: "40", chapter: 8, title: "SQL Aggregation, Joins & Maintenance", printedPages: range(171, 176) },
  { lesson: "41", chapter: 9, title: "Abstraction & Decomposition", printedPages: range(179, 180) },
  { lesson: "42", chapter: 9, title: "Algorithm Design, Identifiers & IPO", printedPages: range(180, 184) },
  { lesson: "43", chapter: 9, title: "Logic, Control & Representations", printedPages: range(184, 198) },
  { lesson: "44", chapter: 9, title: "Stepwise Refinement & Chapter Review", printedPages: range(199, 208) },
  { lesson: "45", chapter: 10, title: "Data Types & Records", printedPages: range(210, 211) },
  { lesson: "46", chapter: 10, title: "One-Dimensional Arrays & Linear Search", printedPages: range(212, 215) },
  { lesson: "47", chapter: 10, title: "Bubble Sort", printedPages: range(215, 218) },
  { lesson: "48", chapter: 10, title: "Two-Dimensional Arrays & Record Arrays", printedPages: range(218, 225) },
  { lesson: "49", chapter: 10, title: "Sequential Text Files", printedPages: range(226, 227) },
  { lesson: "50", chapter: 10, title: "Stacks & Queues", printedPages: range(227, 229) },
  { lesson: "51", chapter: 10, title: "Linked Lists & Chapter Review", printedPages: range(229, 238) },
];

export const A2_TEXTBOOK_RESOURCES: TextbookResource[] = [
  { lesson: "01", chapter: 13, title: "User-defined Data Types", printedPages: range(313, 317) },
  { lesson: "02", chapter: 13, title: "File Organisation and Access", printedPages: range(317, 320) },
  { lesson: "03", chapter: 13, title: "Hashing for File Access", printedPages: range(318, 319) },
  { lesson: "04", chapter: 13, title: "Floating-point Format and Decoding", printedPages: range(320, 323) },
  { lesson: "05", chapter: 13, title: "Conversion, Normalisation and Bit Allocation", printedPages: range(322, 324) },
  { lesson: "06", chapter: 13, title: "Approximation, Errors and Chapter Review", printedPages: range(322, 325) },
  { lesson: "07", chapter: 14, title: "Protocols and the TCP/IP Stack", printedPages: range(331, 335) },
  { lesson: "08", chapter: 14, title: "Application-layer Protocols", printedPages: range(335, 337) },
  { lesson: "09", chapter: 14, title: "Circuit and Packet Switching", printedPages: range(330, 331) },
  { lesson: "10", chapter: 14, title: "Routers and Chapter Review", printedPages: range(329, 339) },
  { lesson: "11", chapter: 15, title: "RISC, CISC, Pipelining and Interrupts", printedPages: range(340, 343) },
  { lesson: "12", chapter: 15, title: "Parallel Processing Architectures", printedPages: range(344, 346) },
  { lesson: "13", chapter: 15, title: "Virtual Machines", printedPages: range(346, 347) },
  { lesson: "14", chapter: 15, title: "Boolean Algebra and De Morgan's Laws", printedPages: range(356, 359) },
  { lesson: "15", chapter: 15, title: "Adders and Flip-flops", printedPages: range(351, 356) },
  { lesson: "16", chapter: 15, title: "Karnaugh Maps and Chapter Review", printedPages: range(340, 362) },
  { lesson: "17", chapter: 16, title: "OS Resources, Processes and States", printedPages: range(368, 375) },
  { lesson: "18", chapter: 16, title: "CPU Scheduling and Interrupt Handling", printedPages: range(370, 372) },
  { lesson: "19", chapter: 16, title: "Paging, Virtual Memory and Segmentation", printedPages: range(372, 375) },
  { lesson: "20", chapter: 16, title: "Translation Software, Grammar and RPN", printedPages: range(375, 382) },
  { lesson: "21", chapter: 17, title: "Symmetric and Asymmetric Cryptography", printedPages: range(387, 392) },
  { lesson: "22", chapter: 17, title: "Quantum Cryptography, SSL/TLS and Certificates", printedPages: range(389, 395) },
  { lesson: "23", chapter: 18, title: "Graphs, Dijkstra and A* Search", printedPages: range(397, 402) },
  { lesson: "24", chapter: 18, title: "Machine Learning, Neural Networks and Back Propagation", printedPages: range(403, 408) },
  { lesson: "25", chapter: 19, title: "Search, Sort and Big O Comparison", printedPages: range(411, 431) },
  { lesson: "26", chapter: 19, title: "Abstract Data Types and Their Algorithms", printedPages: range(415, 429) },
  { lesson: "27", chapter: 19, title: "Recursion, Stacks and Unwinding", printedPages: range(434, 442) },
  { lesson: "28", chapter: 20, title: "Programming Paradigms", printedPages: [...range(443, 445), ...range(459, 512)] },
  { lesson: "29", chapter: 20, title: "File Processing and Exception Handling", printedPages: range(446, 458) },
];

export function getTextbookResource(lesson: string) {
  return TEXTBOOK_RESOURCES.find((resource) => resource.lesson === lesson) ?? null;
}

export function getA2TextbookResource(lesson: string) {
  return A2_TEXTBOOK_RESOURCES.find((resource) => resource.lesson === lesson) ?? null;
}

export function formatPrintedPages(pages: number[]) {
  const runs: string[] = [];
  let start = pages[0];
  let previous = pages[0];
  [...pages.slice(1), pages[pages.length - 1] + 2].forEach((page) => {
    if (page === previous + 1) { previous = page; return; }
    runs.push(start === previous ? `${start}` : `${start}–${previous}`);
    start = previous = page;
  });
  return runs.join(", ");
}
