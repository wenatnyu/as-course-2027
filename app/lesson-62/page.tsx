import "../paper-two-lessons.css";
import { lessonMetadata } from "../_components/lesson-metadata";
import { PaperTwoLesson, type PaperTwoLessonSpec } from "../_components/paper-two-lesson";

export const dynamic = "force-static";
export const metadata = lessonMetadata("62", "Cambridge 9618 test strategy, test plans, test data and release testing with Paper 2 practice.");

const spec = {
  lessonNumber: "62", chapter: "12", chapterTitle: "Software Development", title: "Test Strategy, Test Data & Release", tagline: "Plan what will be tested, why and by whom; record data with expected and actual results; then widen from integrated modules to alpha, beta and acceptance evidence.", syllabus: "12.3", textbook: "TEXTBOOK CH.15 · pp.304–306",
  objectives: ["Explain the purpose and contents of a test strategy and detailed test plan.", "Select normal, abnormal, extreme and boundary data with expected results.", "Distinguish integration, alpha, beta and acceptance testing.", "Interpret actual results and record pass/fail plus corrective action."],
  starter: { prompt: "For valid ages 18–65 inclusive, classify 40, 17, 18, 65 and 66.", answer: "40 normal; 17 and 66 abnormal and just outside boundaries; 18 and 65 are valid extreme/boundary values. Classification wording should state the rule and expected outcome." },
  concepts: [
    { label: "TEST STRATEGY", text: "High-level scope, risks, methods, resources, responsibilities, schedule and completion criteria." },
    { label: "TEST PLAN", text: "Detailed cases: ID, purpose, data, expected result, actual result and pass/fail/action." },
    { label: "NORMAL / ABNORMAL", text: "Typical valid data versus invalid data the program should reject or handle." },
    { label: "EXTREME / BOUNDARY", text: "Largest/smallest valid values and values at or immediately around a limit." },
    { label: "ALPHA / BETA", text: "Internal developer/organisation testing, then limited external users in real contexts." },
    { label: "ACCEPTANCE", text: "Customer/end-user evidence and sign-off that agreed requirements are met." },
  ],
  model: { title: "A test-plan row is a prediction plus evidence.", code: "ID: AGE-04\nPurpose: upper valid boundary\nInput data: Age = 65\nExpected result: accepted; Adult category stored\nActual result: __________________\nPass/fail: ______________________\nAction / retest: _______________\n\nCompanion cases: 64, 66, typical 40, wrong type \"old\"", note: "An expected result must be specific enough to compare with actual output. 'Works' is not an expected result." },
  worked: { title: "Build boundary cases for 24–37 inclusive.", prompt: "Choose four values and exact expected results.", steps: ["23: just below, reject.", "24: lower valid boundary, accept.", "37: upper valid boundary, accept.", "38: just above, reject."], answer: "These four cases expose < versus <= and > versus >= faults at both limits. Add a typical normal value and wrong-type abnormal value for wider coverage." },
  comparison: { title: "Release tests differ by tester and purpose.", rows: [
    { term: "alpha", distinction: "internal pre-release testing by developer/organisation", example: "in-house QA" },
    { term: "beta", distinction: "limited selected external users before general release", example: "real devices/environments" },
    { term: "acceptance", distinction: "customer/end user verifies agreed requirements", example: "formal sign-off" },
  ] },
  practice: { title: "Plan tests for a mark 0–100.", prompt: "Give normal, extreme/boundary and abnormal cases with expected results.", cues: ["Use 0 and 100 as valid extremes.", "Use −1 and 101 just outside.", "Include one typical value and wrong type if input interface permits."], answer: "50 accepted as normal; 0 and 100 accepted as valid extreme/boundary; −1 and 101 rejected; non-numeric text rejected/handled. State exact messages or stored outcomes." },
  pitfalls: ["Extreme valid values are not automatically abnormal; validity depends on the specification.", "Boundary testing needs values at and immediately either side of a limit, not only the endpoints.", "Beta testing is limited external use before general release; acceptance is customer/end-user confirmation against requirements."],
  examMethod: ["Copy the valid domain and derive lower−1, lower, lower+1, upper−1, upper, upper+1.", "For every case, write a precise expected result before the program is run.", "When comparing release tests, name who tests, when, where and what decision the evidence supports."],
  papers: [
    { source: "9618/21 O/N 2024 · Q5(b)", marks: "5 MARKS", prompt: "Complete test-plan rows for values 24–37 and identify integration testing.", cues: [{ label: "LOWER", text: "23 reject; 24 accept" }, { label: "UPPER", text: "37 accept; 38 reject" }, { label: "METHOD", text: "joined modules → integration" }], answer: "The four rows test immediately below/at both limits with expected accept/reject outcomes. Testing combined modules and their interfaces is integration testing." },
    { source: "9618/21 M/J 2023 · Q5(b)", marks: "3 MARKS", prompt: "Describe the stage and purpose of beta testing.", cues: [{ label: "WHEN", text: "after internal testing, before general release" }, { label: "WHO", text: "selected external users" }, { label: "WHY", text: "real use feedback and undiscovered faults" }], answer: "A limited group of selected external users tests a pre-release version in realistic environments, reports faults/usability issues and supplies feedback before wider release." },
  ],
  retrieval: ["Which earlier method tests joined module interfaces?", "Why must expected results precede actual results?", "How does acceptance link back to analysis requirements?"],
  exit: ["Write four boundary cases for 10–20.", "Distinguish alpha and beta.", "Name six test-plan fields."],
  homework: {
    instructions: "State the valid domain first. Every test row needs purpose, data and a precise expected result; distinguish testers and timing for release methods.",
    sections: [
      { code: "A", title: "Plan testing", subtitle: "Strategy and plan", questions: [
        { prompt: "Distinguish test strategy from test plan and give one purpose of each.", answer: "Strategy sets high-level scope/risk/resources/methods; plan lists executable cases and expected/actual evidence. Both support systematic coverage.", marks: 3 },
        { prompt: "Name six useful fields in a test-plan row.", answer: "Test ID, purpose/requirement, input data, expected result, actual result, pass/fail, action/retest. Any six.", marks: 3 },
        { prompt: "Explain four reasons expected results are written before execution.", answer: "Objective comparison, exposes unclear requirements, prevents adjusting expectation to output, supports repeatability/automation and clear pass/fail. Any four.", marks: 4 },
      ] },
      { code: "B", title: "Select test data", subtitle: "Normal, abnormal and boundaries", questions: [
        { prompt: "Classify data for valid quantity 1–99: 50, 1 and 0.", answer: "50 normal valid; 1 valid extreme/lower boundary; 0 abnormal just below boundary.", marks: 3 },
        { prompt: "Give three more cases needed around the upper boundary and expected results.", answer: "98 accepted, 99 accepted as upper boundary/extreme, 100 rejected as just above.", marks: 3 },
        { prompt: "Create four complete rows testing password length 8–20 inclusive.", answer: "7 reject; 8 accept; 20 accept; 21 reject, each with a precise expected validation message/state.", marks: 4 },
      ] },
      { code: "C", title: "Published-paper application", subtitle: "Release evidence", questions: [
        { prompt: "Adapted from 9618/21 O/N 2024 Q5(b): give four boundary cases for 24–37 inclusive.", answer: "23 reject, 24 accept, 37 accept, 38 reject.", marks: 3 },
        { prompt: "Adapted from 9618/21 M/J 2023 Q5(b): describe beta testing in three points.", answer: "Selected external users; realistic use of pre-release version; feedback/fault reports before general release.", marks: 3 },
        { prompt: "Distinguish integration, alpha, beta and acceptance testing.", answer: "Integration joins modules/interfaces; alpha is internal organisational pre-release; beta is limited external real use; acceptance is customer/end-user confirmation/sign-off against agreed requirements.", marks: 4 },
      ] },
    ], challenge: { prompt: "Explain why a passing boundary suite still cannot prove correctness.", answer: "It samples high-risk limits but cannot cover every internal path, data combination, state, interface or environment. Testing increases evidence and exposes faults; it does not prove none remain." },
  },
  sourceSummary: "Checked against syllabus 12.3, Coursebook Chapter 15 printed pp.304–306 and published Paper 2 questions/mark schemes.",
  sourceDetail: "Core: test strategy/plan content; normal, abnormal, extreme and boundary data; expected/actual evidence; integration, alpha, beta and acceptance testing. Authentic anchors: 9618/21 O/N 2024 Q5(b) [5] and 9618/21 M/J 2023 Q5(b) [3]. Alpha is described conservatively as internal organisational testing before wider release.",
} satisfies PaperTwoLessonSpec;

export default function Lesson62Page() { return <PaperTwoLesson spec={spec} />; }
