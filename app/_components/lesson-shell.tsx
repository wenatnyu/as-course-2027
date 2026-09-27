"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { getSyllabusBrief } from "../_data/course-schedule";
import { A2_CHAPTERS, AS_CHAPTERS, getChapterForLesson } from "../_data/chapter-resources";
import { formatPrintedPages, getTextbookResource } from "../_data/textbook-resources";

export type SlideData = {
  time: string;
  focus: string;
  prompt: string;
  source: string;
  core?: boolean;
  content: ReactNode;
};

export type LessonLink = {
  label: string;
  href: string;
  active?: boolean;
};

export type LessonCatalog = ReadonlyArray<readonly [string, string]>;

export const COURSE_LESSONS = [
  ["01", "Number systems"],
  ["02", "Data capacity and prefixes"],
  ["03", "Signed binary, BCD and arithmetic"],
  ["04", "Characters and bitmap graphics"],
  ["05", "Vector graphics and sound"],
  ["06", "Compression"],
  ["07", "Network foundations and models"],
  ["08", "Topologies, packet paths and cloud"],
  ["09", "Network media, hardware and internet services"],
  ["10", "IP addressing, subnetting, URL and DNS"],
  ["11", "Hardware roles, embedded systems and buffers"],
  ["12", "Primary memory and ROM families"],
  ["13", "Storage and peripheral operations"],
  ["14", "Monitoring and control"],
  ["15", "Logic gates and truth tables"],
  ["16", "Logic circuits and expressions"],
  ["17", "Von Neumann architecture and registers"],
  ["18", "System buses, performance and ports"],
  ["19", "Fetch-execute cycle and interrupts"],
  ["20", "Assembly language and instruction groups"],
  ["21", "Addressing modes and effective addresses"],
  ["22", "The two-pass assembler"],
  ["23", "Tracing assembly programs"],
  ["24", "Binary shifts and bit masking"],
  ["25", "Operating systems and management"],
  ["26", "Utilities and program libraries"],
  ["27", "Translators, compilers and interpreters"],
  ["28", "IDE features and Chapter 5 review"],
  ["29", "Security, privacy, integrity and threats"],
  ["30", "Layered security and access control"],
  ["31", "Validation, verification and check digits"],
  ["32", "Parity, checksums and Chapter 6 review"],
  ["33", "Professional ethics, BCS and IEEE"],
  ["34", "Copyright and software licensing"],
  ["35", "AI applications, impacts and Chapter 7 review"],
  ["36", "File-based data, relational databases and keys"],
  ["37", "Relationships, E-R diagrams and normalisation to 2NF"],
  ["38", "Third normal form and DBMS features"],
  ["39", "SQL DDL and core single-table DML"],
  ["40", "SQL aggregation, joins and data maintenance"],
  ["41", "Abstraction and decomposition"],
  ["42", "Algorithm design, identifiers and IPO"],
  ["43", "Logic, control constructs and representations"],
  ["44", "Stepwise refinement and Chapter 9 review"],
  ["45", "Data types and records"],
  ["46", "One-dimensional arrays and linear search"],
  ["47", "Bubble sort"],
  ["48", "Two-dimensional arrays and arrays of records"],
  ["49", "Sequential text files"],
  ["50", "Stacks and queues"],
  ["51", "Linked lists and Chapter 10 review"],
  ["52", "Programming essentials and library routines"],
  ["53", "IF, nested IF and CASE selection"],
  ["54", "Iteration and efficient loops"],
  ["55", "Modules, scope, procedures and functions"],
  ["56", "Parameters, BYVAL and BYREF"],
  ["57", "Program development life cycle"],
  ["58", "Waterfall, iterative and RAD models"],
  ["59", "Structure charts and interfaces"],
  ["60", "Structure charts to code and state diagrams"],
  ["61", "Faults, errors and developer testing"],
  ["62", "Test strategy, test data and release testing"],
  ["63", "Maintenance and complete AS review"],
] as const;

const AS_CORE_ROUTES: Record<string, number[]> = {
  "02": [1, 2, 3, 5, 6, 7, 8, 9, 10, 12, 15],
  "03": [1, 2, 4, 5, 6, 7, 9, 10, 11, 12, 13, 15],
  "04": [1, 2, 4, 5, 7, 8, 10, 11, 12, 13, 14, 15],
  "05": [1, 2, 4, 6, 7, 8, 9, 12, 13, 14, 15],
  "06": [1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 14, 15],
  "07": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  "08": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  "09": [1, 2, 3, 8, 5, 4, 6, 9, 10, 12, 15],
  "10": [1, 2, 4, 5, 6, 8, 10, 11, 12, 13, 14, 15],
  "11": [1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13],
  "12": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 15],
  "13": [1, 2, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14],
  "14": [1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 15],
  "15": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15],
  "16": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15],
  "17": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15],
  "18": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 15],
  "19": [1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 15],
  "20": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 15],
  "21": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15],
  "22": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15],
  "23": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 15],
  "24": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 15],
  "25": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15],
  "26": [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 15],
  "27": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 15],
  "28": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15],
  "29": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 15],
  "30": [1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 15],
  "31": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15],
  "32": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 13, 14, 15],
  "33": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 15],
  "34": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 15],
  "35": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15],
  "36": [1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15],
  "37": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 15],
  "38": [1, 2, 3, 4, 6, 7, 9, 10, 11, 12, 13, 15],
  "39": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 15],
  "40": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 15],
  "41": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 15],
  "42": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 15],
  "43": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 15],
  "44": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 15],
  "45": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 15],
  "46": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 15],
  "47": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 15],
  "48": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 15],
  "49": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 15],
  "50": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 15],
  "51": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 15],
};

const AS_CORE_TIMES: Record<string, string[]> = {
  "02": ["2 min · 02", "2 min · 04", "3 min · 07", "4 min · 11", "4 min · 15", "3 min · 18", "2 min · 20", "4 min · 24", "5 min · 29", "6 min · 35", "5 min · 40"],
  "03": ["2 min · 02", "2 min · 04", "3 min · 07", "4 min · 11", "4 min · 15", "4 min · 19", "4 min · 23", "3 min · 26", "3 min · 29", "4 min · 33", "3 min · 36", "4 min · 40"],
  "04": ["2 min · 02", "2 min · 04", "3 min · 07", "4 min · 11", "3 min · 14", "3 min · 17", "4 min · 21", "3 min · 24", "4 min · 28", "3 min · 31", "4 min · 35", "5 min · 40"],
  "05": ["2 min · 02", "2 min · 04", "4 min · 08", "3 min · 11", "4 min · 15", "4 min · 19", "4 min · 23", "4 min · 27", "4 min · 31", "4 min · 35", "5 min · 40"],
  "06": ["2 min · 02", "2 min · 04", "3 min · 07", "3 min · 10", "3 min · 13", "4 min · 17", "3 min · 20", "4 min · 24", "4 min · 28", "4 min · 32", "4 min · 36", "4 min · 40"],
  "07": ["2 min · 02", "3 min · 05", "4 min · 09", "5 min · 14", "4 min · 18", "4 min · 22", "5 min · 27", "3 min · 30", "5 min · 35", "5 min · 40"],
  "08": ["2 min · 02", "3 min · 05", "4 min · 09", "4 min · 13", "4 min · 17", "4 min · 21", "5 min · 26", "5 min · 31", "6 min · 37", "3 min · 40"],
  "09": ["2 min · 02", "3 min · 05", "4 min · 09", "4 min · 13", "4 min · 17", "3 min · 20", "5 min · 25", "3 min · 28", "4 min · 32", "4 min · 36", "4 min · 40"],
  "10": ["2 min · 02", "3 min · 05", "4 min · 09", "4 min · 13", "4 min · 17", "4 min · 21", "4 min · 25", "3 min · 28", "3 min · 31", "3 min · 34", "3 min · 37", "3 min · 40"],
  "11": ["2 min · 02", "3 min · 05", "3 min · 08", "3 min · 11", "3 min · 14", "3 min · 17", "3 min · 20", "4 min · 24", "4 min · 28", "4 min · 32", "4 min · 36", "4 min · 40"],
  "12": ["2 min · 02", "3 min · 05", "3 min · 08", "3 min · 11", "3 min · 14", "3 min · 17", "3 min · 20", "4 min · 24", "4 min · 28", "4 min · 32", "4 min · 36", "4 min · 40"],
  "13": ["2 min · 02", "3 min · 05", "3 min · 08", "3 min · 11", "3 min · 14", "3 min · 17", "3 min · 20", "4 min · 24", "4 min · 28", "4 min · 32", "4 min · 36", "4 min · 40"],
  "14": ["2 min · 02", "3 min · 05", "4 min · 09", "4 min · 13", "4 min · 17", "4 min · 21", "4 min · 25", "4 min · 29", "4 min · 33", "4 min · 37", "3 min · 40"],
  "15": ["2 min · 02", "3 min · 05", "4 min · 09", "4 min · 13", "4 min · 17", "4 min · 21", "4 min · 25", "4 min · 29", "4 min · 33", "4 min · 37", "3 min · 40"],
  "16": ["2 min · 02", "3 min · 05", "4 min · 09", "4 min · 13", "4 min · 17", "4 min · 21", "4 min · 25", "4 min · 29", "4 min · 33", "4 min · 37", "3 min · 40"],
  "17": ["2 min · 02", "3 min · 05", "4 min · 09", "4 min · 13", "4 min · 17", "4 min · 21", "4 min · 25", "4 min · 29", "4 min · 33", "4 min · 37", "3 min · 40"],
  "18": ["2 min · 02", "3 min · 05", "3 min · 08", "3 min · 11", "3 min · 14", "3 min · 17", "3 min · 20", "4 min · 24", "4 min · 28", "4 min · 32", "4 min · 36", "4 min · 40"],
  "19": ["2 min · 02", "3 min · 05", "3 min · 08", "3 min · 11", "3 min · 14", "3 min · 17", "3 min · 20", "4 min · 24", "4 min · 28", "4 min · 32", "4 min · 36", "4 min · 40"],
  "20": ["2 min · 02", "3 min · 05", "3 min · 08", "3 min · 11", "3 min · 14", "3 min · 17", "3 min · 20", "3 min · 23", "3 min · 26", "3 min · 29", "3 min · 32", "3 min · 35", "5 min · 40"],
  "21": ["2 min · 02", "3 min · 05", "4 min · 09", "4 min · 13", "4 min · 17", "4 min · 21", "4 min · 25", "4 min · 29", "4 min · 33", "4 min · 37", "3 min · 40"],
  "22": ["2 min · 02", "3 min · 05", "4 min · 09", "4 min · 13", "4 min · 17", "4 min · 21", "4 min · 25", "4 min · 29", "4 min · 33", "4 min · 37", "3 min · 40"],
  "23": ["2 min · 02", "3 min · 05", "3 min · 08", "3 min · 11", "3 min · 14", "3 min · 17", "3 min · 20", "4 min · 24", "4 min · 28", "4 min · 32", "4 min · 36", "4 min · 40"],
  "24": ["2 min · 02", "3 min · 05", "3 min · 08", "3 min · 11", "3 min · 14", "3 min · 17", "3 min · 20", "4 min · 24", "4 min · 28", "4 min · 32", "4 min · 36", "4 min · 40"],
  "25": ["2 min · 02", "3 min · 05", "4 min · 09", "4 min · 13", "4 min · 17", "4 min · 21", "4 min · 25", "4 min · 29", "4 min · 33", "4 min · 37", "3 min · 40"],
  "26": ["2 min · 02", "3 min · 05", "4 min · 09", "4 min · 13", "4 min · 17", "4 min · 21", "4 min · 25", "4 min · 29", "4 min · 33", "4 min · 37", "3 min · 40"],
  "27": ["2 min · 02", "3 min · 05", "3 min · 08", "3 min · 11", "3 min · 14", "3 min · 17", "3 min · 20", "4 min · 24", "4 min · 28", "4 min · 32", "4 min · 36", "4 min · 40"],
  "28": ["2 min · 02", "3 min · 05", "4 min · 09", "4 min · 13", "4 min · 17", "4 min · 21", "4 min · 25", "4 min · 29", "4 min · 33", "4 min · 37", "3 min · 40"],
  "29": ["2 min · 02", "3 min · 05", "3 min · 08", "3 min · 11", "3 min · 14", "3 min · 17", "3 min · 20", "3 min · 23", "3 min · 26", "3 min · 29", "3 min · 32", "4 min · 36", "4 min · 40"],
  "30": ["2 min · 02", "3 min · 05", "3 min · 08", "3 min · 11", "3 min · 14", "3 min · 17", "3 min · 20", "3 min · 23", "3 min · 26", "3 min · 29", "3 min · 32", "4 min · 36", "4 min · 40"],
  "31": ["2 min · 02", "3 min · 05", "3 min · 08", "3 min · 11", "3 min · 14", "3 min · 17", "3 min · 20", "3 min · 23", "3 min · 26", "3 min · 29", "3 min · 32", "4 min · 36", "4 min · 40"],
  "32": ["2 min · 02", "3 min · 05", "3 min · 08", "3 min · 11", "3 min · 14", "3 min · 17", "3 min · 20", "3 min · 23", "3 min · 26", "3 min · 29", "3 min · 32", "4 min · 36", "4 min · 40"],
  "33": ["2 min · 02", "3 min · 05", "3 min · 08", "3 min · 11", "3 min · 14", "3 min · 17", "3 min · 20", "3 min · 23", "3 min · 26", "3 min · 29", "3 min · 32", "4 min · 36", "4 min · 40"],
  "34": ["2 min · 02", "3 min · 05", "3 min · 08", "3 min · 11", "3 min · 14", "3 min · 17", "3 min · 20", "3 min · 23", "3 min · 26", "3 min · 29", "3 min · 32", "4 min · 36", "4 min · 40"],
  "35": ["2 min · 02", "3 min · 05", "3 min · 08", "3 min · 11", "3 min · 14", "3 min · 17", "3 min · 20", "3 min · 23", "3 min · 26", "3 min · 29", "3 min · 32", "4 min · 36", "4 min · 40"],
  "36": ["2 min · 02", "3 min · 05", "3 min · 08", "3 min · 11", "3 min · 14", "3 min · 17", "3 min · 20", "3 min · 23", "3 min · 26", "3 min · 29", "3 min · 32", "4 min · 36", "4 min · 40"],
  "37": ["2 min · 02", "3 min · 05", "3 min · 08", "3 min · 11", "3 min · 14", "3 min · 17", "3 min · 20", "3 min · 23", "3 min · 26", "3 min · 29", "3 min · 32", "4 min · 36", "4 min · 40"],
  "38": ["2 min · 02", "3 min · 05", "3 min · 08", "3 min · 11", "3 min · 14", "3 min · 17", "3 min · 20", "4 min · 24", "4 min · 28", "4 min · 32", "4 min · 36", "4 min · 40"],
  "39": ["2 min · 02", "3 min · 05", "3 min · 08", "3 min · 11", "3 min · 14", "3 min · 17", "3 min · 20", "3 min · 23", "3 min · 26", "3 min · 29", "3 min · 32", "4 min · 36", "4 min · 40"],
  "40": ["2 min · 02", "3 min · 05", "3 min · 08", "3 min · 11", "3 min · 14", "3 min · 17", "3 min · 20", "3 min · 23", "3 min · 26", "3 min · 29", "3 min · 32", "4 min · 36", "4 min · 40"],
  "41": ["2 min · 02", "3 min · 05", "3 min · 08", "3 min · 11", "3 min · 14", "3 min · 17", "3 min · 20", "3 min · 23", "3 min · 26", "3 min · 29", "3 min · 32", "4 min · 36", "4 min · 40"],
  "42": ["2 min · 02", "3 min · 05", "3 min · 08", "3 min · 11", "3 min · 14", "3 min · 17", "3 min · 20", "3 min · 23", "3 min · 26", "3 min · 29", "3 min · 32", "4 min · 36", "4 min · 40"],
  "43": ["2 min · 02", "3 min · 05", "3 min · 08", "3 min · 11", "3 min · 14", "3 min · 17", "3 min · 20", "3 min · 23", "3 min · 26", "3 min · 29", "3 min · 32", "4 min · 36", "4 min · 40"],
  "44": ["2 min · 02", "3 min · 05", "3 min · 08", "3 min · 11", "3 min · 14", "3 min · 17", "3 min · 20", "3 min · 23", "3 min · 26", "3 min · 29", "3 min · 32", "4 min · 36", "4 min · 40"],
  "45": ["2 min · 02", "3 min · 05", "3 min · 08", "3 min · 11", "3 min · 14", "3 min · 17", "3 min · 20", "3 min · 23", "3 min · 26", "3 min · 29", "3 min · 32", "4 min · 36", "4 min · 40"],
  "46": ["2 min · 02", "3 min · 05", "3 min · 08", "3 min · 11", "3 min · 14", "3 min · 17", "3 min · 20", "3 min · 23", "3 min · 26", "3 min · 29", "3 min · 32", "4 min · 36", "4 min · 40"],
  "47": ["2 min · 02", "3 min · 05", "3 min · 08", "3 min · 11", "3 min · 14", "3 min · 17", "3 min · 20", "3 min · 23", "3 min · 26", "3 min · 29", "3 min · 32", "4 min · 36", "4 min · 40"],
  "48": ["2 min · 02", "3 min · 05", "3 min · 08", "3 min · 11", "3 min · 14", "3 min · 17", "3 min · 20", "3 min · 23", "3 min · 26", "3 min · 29", "3 min · 32", "4 min · 36", "4 min · 40"],
  "49": ["2 min · 02", "3 min · 05", "3 min · 08", "3 min · 11", "3 min · 14", "3 min · 17", "3 min · 20", "3 min · 23", "3 min · 26", "3 min · 29", "3 min · 32", "4 min · 36", "4 min · 40"],
  "50": ["2 min · 02", "3 min · 05", "3 min · 08", "3 min · 11", "3 min · 14", "3 min · 17", "3 min · 20", "3 min · 23", "3 min · 26", "3 min · 29", "3 min · 32", "4 min · 36", "4 min · 40"],
  "51": ["2 min · 02", "3 min · 05", "3 min · 08", "3 min · 11", "3 min · 14", "3 min · 17", "3 min · 20", "3 min · 23", "3 min · 26", "3 min · 29", "3 min · 32", "4 min · 36", "4 min · 40"],
};

export function LessonSwitcher({
  lessonNumber,
  root = false,
  links,
  lessonCatalog = COURSE_LESSONS,
  stage = "AS",
}: {
  lessonNumber: string;
  root?: boolean;
  links?: LessonLink[];
  lessonCatalog?: LessonCatalog;
  stage?: "AS" | "A2";
}) {
  const prefix = root ? "./" : "../";
  const generatedLinks = lessonCatalog.map(([number]) => ({
    label: number,
    href: number === "01" ? prefix : `${prefix}lesson-${number}/`,
    active: number === lessonNumber,
  }));
  const navigationLinks = links?.length === lessonCatalog.length ? links : generatedLinks;
  const chapters = stage === "AS" ? AS_CHAPTERS : A2_CHAPTERS;
  return (
      <div className="lesson-nav-stack">
        <label className="lesson-picker">
          <span>Lesson</span>
        <select
          aria-label="Choose lesson"
          value={navigationLinks.find((link) => link.active)?.href ?? navigationLinks[0].href}
          onChange={(event) => window.location.assign(event.currentTarget.value)}
        >
          {chapters.map((chapter) => {
            const start = Number.parseInt(chapter.lessonStart, 10);
            const end = Number.parseInt(chapter.lessonEnd, 10);
            const chapterLinks = navigationLinks.filter((link) => {
              if (link.label === "P01") return stage === "A2" && chapter.number === 20;
              const number = Number.parseInt(link.label, 10);
              return number >= start && number <= end;
            });
            if (!chapterLinks.length) return null;
            return <optgroup label={`Chapter ${chapter.number} · ${chapter.title}`} key={chapter.number}>{chapterLinks.map((link) => {
              const title = lessonCatalog.find(([number]) => number === link.label)?.[1] ?? "Lesson";
              return <option value={link.href} key={link.label}>{link.label} · {title}</option>;
            })}</optgroup>;
          })}
        </select>
        </label>
      </div>
  );
}

export type HomeworkQuestion = {
  id: string;
  prompt: ReactNode;
  marks: number;
  lines?: 2 | 3 | 4 | 5 | 6 | 7 | 8;
  answer: ReactNode;
};

export type HomeworkSection = {
  code: string;
  title: string;
  subtitle: string;
  marks: number;
  questions: HomeworkQuestion[];
};

export function Mark({ children }: { children: ReactNode }) {
  return <span className="syllabus-mark">{children}</span>;
}

export function InlineAnswer({
  id,
  visible,
  onToggle,
  children,
}: {
  id: string;
  visible: boolean;
  onToggle: (id: string) => void;
  children: ReactNode;
}) {
  const panelId = `homework-answer-${id}`;

  return (
    <div className="inline-answer-wrap">
      <button
        type="button"
        className="inline-answer-toggle"
        aria-expanded={visible}
        aria-controls={panelId}
        onClick={() => onToggle(id)}
      >
        {visible ? "Hide answer" : "Show answer"}
      </button>
      <aside id={panelId} className={visible ? "inline-answer visible" : "inline-answer"} hidden={!visible}>
        <span>MARK SCHEME</span>
        <div>{children}</div>
      </aside>
    </div>
  );
}

export function Slide({
  number,
  eyebrow,
  sourceLabel,
  syllabusLabel = "SYLLABUS 1.1",
  title,
  className = "",
  children,
}: {
  number: string;
  eyebrow: string;
  sourceLabel: string;
  syllabusLabel?: string;
  title?: ReactNode;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <article className={`lesson-slide ${className}`}>
      <div className="slide-chrome">
        <span>{eyebrow}</span>
        <div className="source-badges"><Mark>{syllabusLabel}</Mark><span className="textbook-mark">{sourceLabel}</span></div>
        <b>{number}</b>
      </div>
      {title && <h2>{title}</h2>}
      {children}
    </article>
  );
}

export function HomeworkSheet({
  lessonNumber,
  title,
  marks,
  minutes,
  sourceLabel,
  syllabusLabel = "SYLLABUS 1.1",
  instructions,
  sections,
  challenge,
  qualificationLabel = "AS COMPUTER SCIENCE · 9618",
}: {
  lessonNumber: string;
  title: string;
  marks: number;
  minutes: number;
  sourceLabel: string;
  syllabusLabel?: string;
  instructions: string;
  sections: HomeworkSection[];
  challenge?: { id: string; prompt: ReactNode; answer: ReactNode };
  qualificationLabel?: string;
}) {
  const splitCoreHomework = qualificationLabel.startsWith("AS") && ["02", "03", "04", "05", "06", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51"].includes(lessonNumber);
  const nonCoreQuestionIds = new Set(["l10-6"]);
  const coreSectionCount = splitCoreHomework ? Math.min(2, sections.length) : sections.length;
  const coreMarks = sections.slice(0, coreSectionCount).flatMap((section) => section.questions).filter((question) => !nonCoreQuestionIds.has(question.id)).reduce((total, question) => total + question.marks, 0);
  const optionalMarks = sections.flatMap((section, sectionIndex) => section.questions.filter((question) => sectionIndex >= coreSectionCount || nonCoreQuestionIds.has(question.id))).reduce((total, question) => total + question.marks, 0);
  const displayedMinutes = splitCoreHomework ? Math.min(30, minutes) : minutes;
  const answerIds = useMemo(
    () => [...sections.flatMap((section) => section.questions.map((question) => question.id)), ...(challenge ? [challenge.id] : [])],
    [challenge, sections],
  );
  const [revealedAnswers, setRevealedAnswers] = useState<Set<string>>(() => new Set());
  const allAnswersVisible = answerIds.every((id) => revealedAnswers.has(id));
  const sectionStarts = useMemo(
    () => sections.map((_, sectionIndex) => 1 + sections
      .slice(0, sectionIndex)
      .reduce((total, section) => total + section.questions.length, 0)),
    [sections],
  );

  const toggleAnswer = (id: string) => {
    setRevealedAnswers((currentAnswers) => {
      const nextAnswers = new Set(currentAnswers);
      if (nextAnswers.has(id)) nextAnswers.delete(id);
      else nextAnswers.add(id);
      return nextAnswers;
    });
  };

  const toggleAllAnswers = () => {
    setRevealedAnswers(allAnswersVisible ? new Set() : new Set(answerIds));
  };

  return (
    <section className={allAnswersVisible ? "homework-page all-answers-visible" : "homework-page"}>
      <header className="homework-hero">
        <div><span>{qualificationLabel}</span><h1>Homework {lessonNumber}</h1><p>{title}</p></div>
        <div className="homework-stats"><p><b>{splitCoreHomework ? coreMarks : marks}</b><span>core marks</span></p><p><b>{displayedMinutes}</b><span>minutes</span></p><p><b>0</b><span>calculators</span></p></div>
      </header>
      <div className="student-fields"><span>Name __________________________</span><span>Class __________</span><span>Date __________</span></div>
      <div className="homework-instructions">
        <div className="homework-source-badges"><Mark>{syllabusLabel}</Mark><span className="textbook-mark">{sourceLabel}</span></div>
        <p>{instructions}</p>
        <button type="button" onClick={toggleAllAnswers}>{allAnswersVisible ? "Hide all answers" : "Show all answers"}</button>
      </div>

      {sections.map((section, sectionIndex) => {
        const optionalSection = sectionIndex >= coreSectionCount;
        return (
          <section className={optionalSection ? "homework-section homework-section--optional" : "homework-section"} key={section.code}>
            {optionalSection && sectionIndex === coreSectionCount && <div className="homework-optional-banner"><b>OPTIONAL EXTENSION</b><span>{optionalMarks} additional marks · use after the core homework is secure</span></div>}
            <div className="homework-section__title"><span>{section.code}</span><div><h2>{section.title}</h2><p>{section.subtitle}</p></div><b>{section.marks} marks</b></div>
            <ol className="question-list" start={sectionStarts[sectionIndex]}>
              {section.questions.map((question) => (
                <li className={nonCoreQuestionIds.has(question.id) ? "question-optional" : ""} key={question.id}>
                  {nonCoreQuestionIds.has(question.id) && <div className="question-optional__label">TEXTBOOK EXTENSION · NOT NAMED IN THE 2027–2029 SYLLABUS</div>}
                  <div className="question-copy">{question.prompt}</div><span>[{question.marks}]</span>
                  <div className={`writing-lines lines-${question.lines ?? 3}`} />
                  <InlineAnswer id={question.id} visible={revealedAnswers.has(question.id)} onToggle={toggleAnswer}>
                    {question.answer}
                  </InlineAnswer>
                </li>
              ))}
            </ol>
          </section>
        );
      })}

      {challenge && (
        <div className="challenge">
          <span>OPTIONAL CHALLENGE</span>
          <div>{challenge.prompt}</div>
          <InlineAnswer id={challenge.id} visible={revealedAnswers.has(challenge.id)} onToggle={toggleAnswer}>
            {challenge.answer}
          </InlineAnswer>
        </div>
      )}
    </section>
  );
}

export function LessonShell({
  lessonNumber,
  slides,
  homework,
  lessonLinks,
  courseMapHref,
  sourceSummary,
  sourceDetail,
  additionalSourceLinks = [],
  lessonCatalog = COURSE_LESSONS,
  courseStageLabel = "AS · 2027",
  qualificationLabel = "LESSON",
  siblingCourseHref = "../a2/",
  siblingCourseLabel = "A2",
  examPapersHref = "../exam-papers/",
  chapterNoteHref,
  chapterNoteLabel = "Chapter note",
  textbookHref,
  textbookLabel = "Textbook",
  defaultCoreOnly = false,
}: {
  lessonNumber: string;
  slides: SlideData[];
  homework: ReactNode;
  lessonLinks?: LessonLink[];
  courseMapHref: string;
  sourceSummary: string;
  sourceDetail: string;
  additionalSourceLinks?: { href: string; label: string }[];
  lessonCatalog?: LessonCatalog;
  courseStageLabel?: string;
  qualificationLabel?: string;
  siblingCourseHref?: string;
  siblingCourseLabel?: string;
  examPapersHref?: string;
  chapterNoteHref?: string;
  chapterNoteLabel?: string;
  textbookHref?: string;
  textbookLabel?: string;
  defaultCoreOnly?: boolean;
}) {
  const [view, setView] = useState<"slides" | "homework">("slides");
  const [current, setCurrent] = useState(0);
  const [teacherMode, setTeacherMode] = useState(false);
  const plannedCoreRoute = courseStageLabel.startsWith("AS") ? AS_CORE_ROUTES[lessonNumber] : undefined;
  const [coreOnly, setCoreOnly] = useState(defaultCoreOnly || Boolean(plannedCoreRoute));
  const deckRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);
  const stage = courseStageLabel.startsWith("A2") ? "A2" : "AS";
  const currentChapter = getChapterForLesson(stage, lessonNumber);
  const resolvedChapterNoteHref = chapterNoteHref ?? (currentChapter
    ? stage === "A2" ? `../../notes/chapters/#a2-${currentChapter.number}` : `../notes/chapters/#as-${currentChapter.number}`
    : undefined);
  const resolvedChapterNoteLabel = chapterNoteHref ? chapterNoteLabel : currentChapter ? `Chapter ${currentChapter.number} ZNotes` : chapterNoteLabel;
  const textbookResource = stage === "AS" ? getTextbookResource(lessonNumber) : null;
  const resolvedTextbookHref = textbookHref ?? (textbookResource ? `../textbook/lesson-${lessonNumber}/` : undefined);
  const resolvedTextbookLabel = textbookResource
    ? `Textbook pp.${formatPrintedPages(textbookResource.printedPages)}`
    : textbookLabel;
  const syllabusBrief = getSyllabusBrief(stage, lessonNumber);
  const explicitlyPlannedCore = slides.some((slide) => slide.core !== undefined);
  const defaultCoreLimit = stage === "AS" ? Math.min(8, slides.length) : Math.min(10, slides.length);
  const coreSlides = plannedCoreRoute
    ? plannedCoreRoute.map((slideNumber) => slides[slideNumber - 1]).filter(Boolean)
    : explicitlyPlannedCore ? slides.filter((slide) => slide.core) : slides.slice(0, defaultCoreLimit);
  const visibleSlides = coreOnly ? coreSlides : slides;
  const currentIsCore = coreSlides.includes(visibleSlides[current]);
  const coreTime = coreOnly && AS_CORE_TIMES[lessonNumber]?.[current] ? AS_CORE_TIMES[lessonNumber][current] : visibleSlides[current].time;

  const goTo = useCallback((next: number) => {
    setCurrent(Math.max(0, Math.min(visibleSlides.length - 1, next)));
    if (!document.fullscreenElement) {
      window.requestAnimationFrame(() => slideRef.current?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      }));
    }
  }, [visibleSlides.length]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (view !== "slides") return;
      const target = event.target instanceof HTMLElement ? event.target : null;
      if (target?.closest("button, a, input, textarea, select, [contenteditable='true']")) return;
      if (["ArrowRight", "PageDown", " "].includes(event.key)) { event.preventDefault(); goTo(current + 1); }
      if (["ArrowLeft", "PageUp"].includes(event.key)) { event.preventDefault(); goTo(current - 1); }
      if (event.key === "Home") goTo(0);
      if (event.key === "End") goTo(visibleSlides.length - 1);
      if (event.key.toLowerCase() === "n") setTeacherMode((value) => !value);
      if (event.key.toLowerCase() === "f") deckRef.current?.requestFullscreen?.();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [current, goTo, visibleSlides.length, view]);

  return (
    <main className={teacherMode ? "teacher-mode" : "student-mode"}>
      <header className="course-bar">
        <button className="course-brand" onClick={() => { setView("slides"); setCurrent(0); }}><b>CS</b><span>Cambridge 9618<br />{courseStageLabel}</span></button>
        <nav aria-label="Course materials">
          <button className={view === "slides" ? "active" : ""} aria-pressed={view === "slides"} onClick={() => setView("slides")}>Slides</button>
          <button className={view === "homework" ? "active" : ""} aria-pressed={view === "homework"} onClick={() => setView("homework")}>Homework</button>
          <a href={courseMapHref}>Course map</a>
          <a href={examPapersHref}>Papers</a>
          <a href={siblingCourseHref}>{siblingCourseLabel}</a>
        </nav>
        <div className="bar-actions">
          <LessonSwitcher lessonNumber={lessonNumber} links={lessonLinks} lessonCatalog={lessonCatalog} stage={stage} />
          {view === "slides" && <button className={teacherMode ? "notes-toggle active" : "notes-toggle"} aria-pressed={teacherMode} onClick={() => setTeacherMode(!teacherMode)}>Notes {teacherMode ? "ON" : "OFF"}</button>}
          {view !== "slides" && <button className="print-control" onClick={() => window.print()}>Print / PDF</button>}
        </div>
      </header>

      {(resolvedTextbookHref || resolvedChapterNoteHref) && (
        <aside className="textbook-callout" aria-label="Lesson resources">
          <div><b>LESSON RESOURCES</b><span>Matched reading and chapter notes</span></div>
          <div className="lesson-resource-links">
            {resolvedTextbookHref && <a href={resolvedTextbookHref}>{resolvedTextbookLabel} <span aria-hidden="true">→</span></a>}
            {resolvedChapterNoteHref && <a className="notes-resource" href={resolvedChapterNoteHref}>{resolvedChapterNoteLabel} <span aria-hidden="true">→</span></a>}
          </div>
        </aside>
      )}

      {view === "slides" && (
        <section className="deck-shell" ref={deckRef}>
          {syllabusBrief && (
            <section className="syllabus-brief" aria-label="Official syllabus focus">
              <div className="syllabus-brief-copy">
                <span>OFFICIAL SYLLABUS · {syllabusBrief.section}</span>
                <h1>{syllabusBrief.title}</h1>
                <p>{syllabusBrief.outcome}</p>
                <div><b>{stage === "AS" ? "40-minute core" : "Core route"}</b><small>{coreSlides.length} essential slides</small><b>Optional extension</b><small>{Math.max(0, slides.length - coreSlides.length)} slides</small></div>
              </div>
              <figure><img style={{ objectPosition: `center ${syllabusBrief.focus}`, objectFit: syllabusBrief.asset ? "contain" : "cover" }} src={`${stage === "A2" ? "../../" : lessonNumber === "01" ? "" : "../"}syllabus/${syllabusBrief.asset ?? `syllabus-page-${syllabusBrief.page}.png`}`} alt={`Cambridge 9618 2027-2029 syllabus page ${syllabusBrief.page}, section ${syllabusBrief.section}`} /></figure>
            </section>
          )}
          <div className="route-toolbar"><div><b>{coreOnly ? "CORE ROUTE" : "FULL DECK"}</b><span>{coreOnly ? "Essential teaching sequence" : "Core teaching + optional extension"}</span></div><button type="button" className={coreOnly ? "active" : ""} onClick={() => { setCoreOnly((value) => !value); setCurrent(0); }}>{coreOnly ? "Show extension" : "Core only"}</button></div>
          <div className="slide-frame" ref={slideRef}>
            {!coreOnly && !currentIsCore && <div className="extension-ribbon"><b>OPTIONAL SUPPORT</b><span>Use after the 40-minute core · check the source badge for syllabus or textbook context</span></div>}
            {visibleSlides[current].content}
          </div>
          <div className="deck-controls">
            <div className="progress-label"><span>{String(current + 1).padStart(2, "0")} / {visibleSlides.length}</span><i><b style={{ width: `${(current + 1) / visibleSlides.length * 100}%` }} /></i></div>
            <div className="arrow-controls"><button onClick={() => goTo(current - 1)} disabled={current === 0} aria-label="Previous slide">←</button><button onClick={() => goTo(current + 1)} disabled={current === visibleSlides.length - 1} aria-label="Next slide">→</button></div>
            <div className="shortcut-line"><button onClick={() => deckRef.current?.requestFullscreen?.()}>Full screen</button><span>← → navigate · F full screen · N notes</span></div>
          </div>
          <aside className="teacher-notes">
            <div><span>TIME</span><b>{coreTime}</b></div>
            <div><span>TEACHING FOCUS</span><p>{visibleSlides[current].focus}</p></div>
            <div><span>PROMPT</span><p>{visibleSlides[current].prompt}</p></div>
            <div><span>SOURCE</span><p>{visibleSlides[current].source}</p></div>
          </aside>
        </section>
      )}

      {view === "homework" && homework}

      <footer className="source-footer">
        <div><b>{`${qualificationLabel} ${lessonNumber} SOURCES`}</b><span>{sourceSummary}</span></div>
        <div className="source-links"><a href="https://www.cambridgeinternational.org/Images/721397-2027-2029-syllabus.pdf" target="_blank" rel="noreferrer">Official syllabus</a><a href="https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/past-papers/" target="_blank" rel="noreferrer">Cambridge past papers</a><a href="https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/published-resources/" target="_blank" rel="noreferrer">Endorsed resources</a>{additionalSourceLinks.map((link) => <a href={link.href} target="_blank" rel="noreferrer" key={link.href}>{link.label}</a>)}</div>
        <p>{sourceDetail}</p>
      </footer>
    </main>
  );
}
