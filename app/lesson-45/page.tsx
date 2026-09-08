import "../paper-two-lessons.css";
import { lessonMetadata } from "../_components/lesson-metadata";
import { PaperTwoLesson, type PaperTwoLessonSpec } from "../_components/paper-two-lesson";

export const dynamic = "force-static";
export const metadata = lessonMetadata("45", "Cambridge 9618 data types and records with current 2027 pseudocode and cited Paper 2 practice.");

const spec = {
  lessonNumber: "45", chapter: "10", chapterTitle: "Data Types and Structures", title: "Choosing Data Types & Building Records", tagline: "Choose a type from the values it must represent, then group related fields of different types under one record identifier.", syllabus: "10.1", textbook: "TEXTBOOK CH.13 · pp.210–211",
  objectives: ["Select and use INTEGER, REAL, CHAR, STRING, BOOLEAN and DATE.", "Explain why a record stores related fields of different types under one identifier.", "Define a record using current TYPE, DECLARE and ENDTYPE syntax.", "Declare a record variable and read or update fields with dot notation."],
  starter: { prompt: "Which type fits each value: 27, 27.5, 'Y', \"Yes\", TRUE and 09/09/2026?", answer: "INTEGER, REAL, CHAR, STRING, BOOLEAN and DATE respectively. A value's meaning and permitted operations determine its type; its visual appearance alone does not." },
  concepts: [
    { label: "INTEGER / REAL", text: "INTEGER represents whole numbers; REAL represents values that may contain a fractional part." },
    { label: "CHAR / STRING", text: "CHAR is exactly one character in single quotes; STRING is zero or more characters in double quotes." },
    { label: "BOOLEAN / DATE", text: "BOOLEAN is TRUE or FALSE. DATE represents a calendar date in the stated format." },
    { label: "RECORD", text: "A named collection of related fields that may have different data types." },
    { label: "FIELD", text: "One named component of a record, accessed using RecordVariable.FieldName." },
    { label: "TYPE THEN VARIABLE", text: "Define the record type once; declare as many variables or array elements of that type as required." },
  ],
  model: { title: "Define the shape; then create and use a value.", code: "TYPE BookRecord\n   DECLARE Title : STRING\n   DECLARE Pages : INTEGER\n   DECLARE Price : REAL\n   DECLARE InStock : BOOLEAN\nENDTYPE\n\nDECLARE Book : BookRecord\nBook.Title ← \"Algorithms\"\nBook.Price ← 24.99\nOUTPUT Book.Price", note: "Current guide syntax includes DECLARE inside the TYPE block. Dot notation identifies exactly which field is read or updated." },
  worked: { title: "Design one record for a library loan.", prompt: "Choose types for LoanID, BorrowerName, DueDate and Returned, then write one access statement.", steps: ["List the facts that belong to one loan.", "Choose each field type from its valid values.", "Define one named record type.", "Declare Loan and update Loan.Returned."], answer: "LoanID INTEGER or STRING according to the stated identifier format; BorrowerName STRING; DueDate DATE; Returned BOOLEAN. A valid update is Loan.Returned ← TRUE." },
  comparison: { title: "Choose by domain, not by convenience.", rows: [
    { term: "CHAR vs STRING", distinction: "one character vs a sequence", example: "Grade 'A' vs Name \"Amira\"" },
    { term: "INTEGER vs REAL", distinction: "whole-only vs fractional values", example: "ItemCount vs MeanScore" },
    { term: "separate variables vs record", distinction: "unrelated values vs one related entity", example: "one StudentRecord keeps ID, name and DOB together" },
  ] },
  practice: { title: "Create a PatientRecord.", prompt: "It must store ID, family name, blood group, height and whether consent was given.", cues: ["Use five descriptive field names.", "Decide whether blood group is one character or a string.", "Declare CurrentPatient and assign consent."], answer: "One valid design uses PatientID STRING, FamilyName STRING, BloodGroup STRING, HeightM REAL and Consent BOOLEAN; then DECLARE CurrentPatient : PatientRecord and CurrentPatient.Consent ← TRUE." },
  pitfalls: ["Do not store every numeric-looking identifier as INTEGER: leading zeros and no arithmetic usually indicate STRING.", "Do not copy the old textbook record block without DECLARE; the 2027–2029 guide requires each field declaration.", "A record groups different fields for one entity; an array groups many elements of the same declared type."],
  examMethod: ["Underline the possible values and required operations before choosing a type.", "For a record explanation, write both ideas: different field types and one identifier/entity.", "Audit TYPE/ENDTYPE, one DECLARE per field, a separate variable declaration and dot notation."],
  papers: [
    { source: "9618/23 O/N 2023 · Q1(a)", marks: "4 MARKS", prompt: "Choose types for four supplied data items.", cues: [{ label: "MEASUREMENT", text: "may contain a decimal" }, { label: "CALENDAR", text: "date value" }, { label: "TEXT", text: "several characters" }, { label: "TWO STATES", text: "true or false" }], answer: "The published answers are REAL, DATE, STRING and BOOLEAN in the supplied contexts; one mark is awarded for each exact type." },
    { source: "9618/21 M/J 2021 · Q1(c)", marks: "3 MARKS", prompt: "Name and justify one suitable user-defined type.", cues: [{ label: "NAME IT", text: "record" }, { label: "COMBINE", text: "fields may have different types" }, { label: "IDENTIFY", text: "one identifier represents the entity" }], answer: "Use a record: it combines related data items of different types so one identifier can represent and access the complete entity." },
  ],
  retrieval: ["Why is a telephone number often STRING rather than INTEGER?", "Write the difference between defining a record type and declaring a record variable.", "How would an array of records differ from one record?"],
  exit: ["Choose a type for a price and justify it.", "Write one correct record field declaration.", "Use dot notation to output a field."],
  homework: {
    instructions: "Use current 2027–2029 pseudocode. Show the value domain behind every type choice and include DECLARE inside each record definition.",
    sections: [
      { code: "A", title: "Select data types", subtitle: "Value domains and operations", questions: [
        { prompt: "Choose and justify types for NumberOfSeats, AverageTime and HasPaid.", answer: "INTEGER for a whole count; REAL for a value that may be fractional; BOOLEAN for two logical states. One justified type each.", marks: 3 },
        { prompt: "Explain why StudentID '00417' should be STRING, not INTEGER.", answer: "It is an identifier, is not used in arithmetic and leading zeros must be preserved.", marks: 3 },
        { prompt: "Distinguish CHAR, STRING, BOOLEAN and DATE using one example of each.", answer: "CHAR is one character such as 'Y'; STRING is a sequence such as \"Yes\"; BOOLEAN is TRUE/FALSE; DATE is a calendar value such as 09/09/2026 in the stated format.", marks: 4 },
      ] },
      { code: "B", title: "Define and use records", subtitle: "Current pseudocode", questions: [
        { prompt: "State three reasons a record suits one employee's ID, name and salary.", answer: "The fields are related to one entity, have different types and can be handled under one record identifier.", marks: 3 },
        { prompt: "Write a complete EmployeeRecord definition with ID, Name and Salary.", answer: "TYPE EmployeeRecord; DECLARE ID : STRING; DECLARE Name : STRING; DECLARE Salary : REAL; ENDTYPE. Award structure and correct fields/types.", marks: 3, lines: 5 },
        { prompt: "Declare Employee and write statements to input its Name and increase Salary by 250.", answer: "DECLARE Employee : EmployeeRecord; INPUT Employee.Name; Employee.Salary ← Employee.Salary + 250. Correct declaration and dot access throughout.", marks: 4, lines: 5 },
      ] },
      { code: "C", title: "Published-paper application", subtitle: "Type and record decisions", questions: [
        { prompt: "Adapted from 9618/23 O/N 2023 Q1(a): identify suitable types for a decimal measurement, date and on/off flag.", answer: "REAL, DATE and BOOLEAN; one mark per correct contextual type.", marks: 3 },
        { prompt: "Adapted from 9618/21 M/J 2021 Q1(c): name the type used to group related values of different types and explain it.", answer: "Record; it groups fields of different types under one identifier for a single entity.", marks: 3 },
        { prompt: "Correct this old-style definition: TYPE T; Name : STRING; Active : BOOLEAN; ENDTYPE. Then declare X and set Active.", answer: "Add DECLARE before both fields; DECLARE X : T; X.Active ← TRUE. Award declarations, type use and dot assignment.", marks: 4, lines: 5 },
      ] },
    ], challenge: { prompt: "Design an array-of-record declaration for 30 books without teaching array processing yet.", answer: "After defining BookRecord, write DECLARE Books : ARRAY[1:30] OF BookRecord. Each array element is one complete record." },
  },
  sourceSummary: "Checked against syllabus 10.1, Coursebook Chapter 13 printed pp.210–211, the official 2027–2029 Pseudocode Guide and published Paper 2 questions/mark schemes.",
  sourceDetail: "Core: INTEGER, REAL, CHAR, STRING, BOOLEAN and DATE; record purpose; current TYPE/DECLARE/ENDTYPE syntax; declaration and dot access. Authentic anchors: 9618/23 O/N 2023 Q1(a) [4] and 9618/21 M/J 2021 Q1(c) [3]. Enumerated, set, pointer and class types are outside this AS section.",
} satisfies PaperTwoLessonSpec;

export default function Lesson45Page() { return <PaperTwoLesson spec={spec} />; }
