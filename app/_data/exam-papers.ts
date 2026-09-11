export const CAMBRIDGE_PAST_PAPERS_URL = "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/past-papers/";
export const SCHOOL_SUPPORT_HUB_URL = "https://schoolsupporthub.cambridgeinternational.org/";

export const PUBLIC_JUNE_2024_PAPERS = [
  { stage: "AS", component: "11", paperName: "Paper 1 · Theory Fundamentals", qp: "https://www.cambridgeinternational.org/Images/673628-june-2024-question-paper-11.pdf", ms: "https://www.cambridgeinternational.org/Images/673620-june-2024-mark-scheme-paper-11.pdf" },
  { stage: "AS", component: "21", paperName: "Paper 2 · Fundamental Problem-solving", qp: "https://www.cambridgeinternational.org/Images/673630-june-2024-question-paper-21.pdf", ms: "https://www.cambridgeinternational.org/Images/673622-june-2024-mark-scheme-paper-21.pdf", extra: { label: "Insert 21", href: "https://www.cambridgeinternational.org/Images/673618-june-2024-insert-paper-21.pdf" } },
  { stage: "A2", component: "31", paperName: "Paper 3 · Advanced Theory", qp: "https://www.cambridgeinternational.org/Images/673637-june-2024-question-paper-31.pdf", ms: "https://www.cambridgeinternational.org/Images/673624-june-2024-mark-scheme-paper-31.pdf" },
  { stage: "A2", component: "41", paperName: "Paper 4 · Practical", qp: "https://www.cambridgeinternational.org/Images/673639-june-2024-question-paper-41.pdf", ms: "https://www.cambridgeinternational.org/Images/673626-june-2024-mark-scheme-paper-41.pdf", extra: { label: "Support files 41", href: "https://www.cambridgeinternational.org/Images/673632-june-2024-support-file-paper-41.zip" } },
] as const;

export const EXAM_ARCHIVE = [
  {
    year: 2024,
    sessions: [
      { name: "May / June", components: "11–13 · 21–23 · 31–33 · 41–43", status: "released", note: "One complete location set (11/21/31/41) is public below; every variant is available to registered centres in the School Support Hub.", threshold: "https://www.cambridgeinternational.org/Images/716004-computer-science-9618-june-2024-grade-threshold-table.pdf" },
      { name: "October / November", components: "11–13 · 21–23 · 31–33 · 41–43", status: "released", note: "Complete question papers and mark schemes are available in the School Support Hub.", threshold: "https://www.cambridgeinternational.org/Images/727981-computer-science-9618-november-2024-grade-threshold-table.pdf" },
    ],
  },
  {
    year: 2025,
    sessions: [
      { name: "May / June", components: "11–13 · 21–23 · 31–33 · 41–43", status: "released", note: "Complete question papers, mark schemes and relevant support files are available in the School Support Hub.", threshold: "https://www.cambridgeinternational.org/Images/740314-computer-science-9618-june-2025-grade-threshold-table.pdf" },
      { name: "October / November", components: "11–13 · 21–23 · 31–33 · 41–43", status: "released", note: "Complete question papers, mark schemes and relevant support files are available in the School Support Hub.", threshold: "https://www.cambridgeinternational.org/Images/749702-computer-science-9618-november-2025-grade-threshold-table.pdf" },
    ],
  },
  {
    year: 2026,
    sessions: [
      { name: "May / June", components: "11–13 · 21–23 · 31–33 · 41–43", status: "released", note: "Results were released on 11 August 2026; the full question-paper and mark-scheme set is available to registered centres in the School Support Hub.", threshold: "https://www.cambridgeinternational.org/Images/761508-computer-science-9618-june-2026-grade-threshold-table.pdf" },
      { name: "October / November", components: "11–13 · 21–23 · 31–33 · 41–43", status: "pending", note: "Not yet available: this series has not been examined. Cambridge is scheduled to release results on 7 January 2027; papers normally enter the Hub on results day." },
    ],
  },
] as const;

