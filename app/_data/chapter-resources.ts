export type ChapterResource = {
  stage: "AS" | "A2";
  number: number;
  title: string;
  lessonStart: string;
  lessonEnd: string;
  noteType: "Theory" | "Practical";
  pdfHref?: string;
  externalHref?: string;
  extraHref?: string;
};

export const AS_CHAPTERS: ChapterResource[] = [
  { stage: "AS", number: 1, title: "Information Representation", lessonStart: "01", lessonEnd: "06", noteType: "Theory", pdfHref: "../as-theory/chapter-01.pdf" },
  { stage: "AS", number: 2, title: "Communication", lessonStart: "07", lessonEnd: "10", noteType: "Theory", pdfHref: "../as-theory/chapter-02.pdf", extraHref: "../communication/" },
  { stage: "AS", number: 3, title: "Hardware", lessonStart: "11", lessonEnd: "16", noteType: "Theory", pdfHref: "../as-theory/chapter-03.pdf" },
  { stage: "AS", number: 4, title: "Processor Fundamentals", lessonStart: "17", lessonEnd: "24", noteType: "Theory", pdfHref: "../as-theory/chapter-04.pdf" },
  { stage: "AS", number: 5, title: "System Software", lessonStart: "25", lessonEnd: "28", noteType: "Theory", pdfHref: "../as-theory/chapter-05.pdf" },
  { stage: "AS", number: 6, title: "Security, Privacy and Data Integrity", lessonStart: "29", lessonEnd: "32", noteType: "Theory", pdfHref: "../as-theory/chapter-06.pdf" },
  { stage: "AS", number: 7, title: "Ethics and Ownership", lessonStart: "33", lessonEnd: "35", noteType: "Theory", pdfHref: "../as-theory/chapter-07.pdf" },
  { stage: "AS", number: 8, title: "Database and Data Modelling", lessonStart: "36", lessonEnd: "40", noteType: "Theory", pdfHref: "../as-theory/chapter-08.pdf" },
  { stage: "AS", number: 9, title: "Algorithm Design and Problem-solving", lessonStart: "41", lessonEnd: "44", noteType: "Practical", pdfHref: "../as-practical/chapter-09.pdf" },
  { stage: "AS", number: 10, title: "Data Types and Data Structures", lessonStart: "45", lessonEnd: "51", noteType: "Practical", pdfHref: "../as-practical/chapter-10.pdf" },
  { stage: "AS", number: 11, title: "Programming", lessonStart: "52", lessonEnd: "56", noteType: "Practical", pdfHref: "../as-practical/chapter-11.pdf" },
  { stage: "AS", number: 12, title: "Software Development", lessonStart: "57", lessonEnd: "63", noteType: "Practical", pdfHref: "../as-practical/chapter-12.pdf" },
];

export const A2_CHAPTERS: ChapterResource[] = [
  { stage: "A2", number: 13, title: "Data Representation", lessonStart: "01", lessonEnd: "06", noteType: "Theory", pdfHref: "../a2-theory/chapter-13.pdf" },
  { stage: "A2", number: 14, title: "Communication and Internet Technologies", lessonStart: "07", lessonEnd: "10", noteType: "Theory", pdfHref: "../a2-theory/chapter-14.pdf" },
  { stage: "A2", number: 15, title: "Hardware and Virtual Machines", lessonStart: "11", lessonEnd: "16", noteType: "Theory", pdfHref: "../a2-theory/chapter-15.pdf" },
  { stage: "A2", number: 16, title: "System Software", lessonStart: "17", lessonEnd: "20", noteType: "Theory", pdfHref: "../a2-theory/chapter-16.pdf" },
  { stage: "A2", number: 17, title: "Security", lessonStart: "21", lessonEnd: "22", noteType: "Theory", pdfHref: "../a2-theory/chapter-17.pdf" },
  { stage: "A2", number: 18, title: "Artificial Intelligence", lessonStart: "23", lessonEnd: "24", noteType: "Theory", pdfHref: "../a2-theory/chapter-18.pdf" },
  { stage: "A2", number: 19, title: "Computational Thinking and Problem-solving", lessonStart: "25", lessonEnd: "27", noteType: "Practical", externalHref: "https://znotes.org/caie/a2-level/computer-science-9618/practical/computational-thinking-and-problem-solving/" },
  { stage: "A2", number: 20, title: "Further Programming", lessonStart: "28", lessonEnd: "29", noteType: "Practical", externalHref: "https://znotes.org/caie/a2-level/computer-science-9618/practical/further-programming/" },
];

export function getChapterForLesson(stage: "AS" | "A2", lessonNumber: string) {
  if (stage === "A2" && lessonNumber === "P01") return A2_CHAPTERS.find((chapter) => chapter.number === 20) ?? null;
  const value = Number.parseInt(lessonNumber, 10);
  if (!Number.isFinite(value)) return null;
  return (stage === "AS" ? AS_CHAPTERS : A2_CHAPTERS).find((chapter) => {
    const start = Number.parseInt(chapter.lessonStart, 10);
    const end = Number.parseInt(chapter.lessonEnd, 10);
    return value >= start && value <= end;
  }) ?? null;
}
