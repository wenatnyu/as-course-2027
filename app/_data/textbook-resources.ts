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
  { lesson: "07", chapter: 2, title: "Network Models & LAN Hardware", printedPages: range(26, 38) },
  { lesson: "08", chapter: 2, title: "Cloud, Wired/Wireless & Media", printedPages: [32, 33, 34, 35, 39] },
  { lesson: "09", chapter: 2, title: "Ethernet, Streaming & Internet Infrastructure", printedPages: range(36, 41) },
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
];

export function getTextbookResource(lesson: string) {
  return TEXTBOOK_RESOURCES.find((resource) => resource.lesson === lesson) ?? null;
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
