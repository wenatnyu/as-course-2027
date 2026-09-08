import "../paper-two-lessons.css";
import { lessonMetadata } from "../_components/lesson-metadata";
import { PaperTwoLesson, type PaperTwoLessonSpec } from "../_components/paper-two-lesson";

export const dynamic = "force-static";
export const metadata = lessonMetadata("58", "Cambridge 9618 waterfall, iterative and RAD life cycle models with benefits, drawbacks and Paper 2 practice.");

const spec = {
  lessonNumber: "58", chapter: "12", chapterTitle: "Software Development", title: "Waterfall, Iterative & RAD Models", tagline: "There is no universally best life cycle: choose from requirement stability, risk, time, scale, user access and the cost of change.", syllabus: "12.1", textbook: "TEXTBOOK CH.15 · pp.287–289",
  objectives: ["Describe the principles of Waterfall, iterative and RAD models.", "Explain contextual benefits and drawbacks of each.", "Recognise why different programs need different life cycles.", "Recommend and justify a model from project evidence."],
  starter: { prompt: "Requirements change weekly and users can review prototypes daily. Which model is least suitable, and why?", answer: "Waterfall is least suitable because it assumes comparatively stable, defined requirements and produces working software late; change may require costly return to completed stages." },
  concepts: [
    { label: "WATERFALL", text: "Defined sequential stages with completed outputs feeding the next stage." },
    { label: "ITERATIVE", text: "Build and review repeated working increments, using feedback to refine requirements and solution." },
    { label: "RAD", text: "Rapid prototyping, strong user involvement, reusable tools/components and short time-boxed development." },
    { label: "STABILITY", text: "How complete and unlikely to change the requirements are." },
    { label: "FEEDBACK", text: "How often users/developers can evaluate working software and revise priorities." },
    { label: "MODEL CHOICE", text: "A justified trade-off based on project conditions, not a memorised favourite." },
  ],
  model: { title: "Compare the feedback rhythm.", code: "WATERFALL\nAnalysis → Design → Coding → Testing → Maintenance\n            limited planned return to earlier stage\n\nITERATIVE\n[analyse → design → code → test → review] × increments\n\nRAD\nrequirements workshops ↔ rapid prototype ↔ user feedback\nshort time-boxes + reuse/tools → operational solution", note: "All models still need requirements, design, implementation, testing and maintenance. The model changes organisation and feedback—not the need for quality." },
  worked: { title: "Choose a model for two projects.", prompt: "Compare regulated payroll replacement with a promotional event app needed in six weeks.", steps: ["Payroll: stable legal rules and formal sign-off favour Waterfall discipline.", "But high integration risk may justify planned iterations/prototypes.", "Event app: short deadline and available users favour RAD.", "State one matching drawback and mitigation for each."], answer: "Credit evidence-based choices. No label is automatically correct; the justification must use the supplied constraints." },
  comparison: { title: "Benefits arise from the same principles that create risks.", rows: [
    { term: "Waterfall", distinction: "clear stages/documentation; late working product and costly change", example: "stable, well-understood contract" },
    { term: "Iterative", distinction: "early increments/feedback; coordination and rework", example: "large evolving service" },
    { term: "RAD", distinction: "fast prototypes/user fit; needs skilled team and available users", example: "time-critical interface" },
  ] },
  practice: { title: "Recommend for a medical monitoring interface.", prompt: "Safety is critical, sensor integration is uncertain and clinicians can review monthly.", cues: ["Use risk and need for evidence.", "Use feedback availability.", "A hybrid argument is acceptable if justified."], answer: "An iterative model can tackle high-risk integration early and obtain clinician feedback each increment, with formal documentation/testing gates for safety. Explain why pure RAD speed or rigid Waterfall may be insufficient." },
  pitfalls: ["Do not claim Waterfall forbids every return; its defining feature is staged progression, and late changes are difficult/costly.", "RAD does not mean skipping analysis or testing; it accelerates work through prototypes, reuse, tools and user involvement.", "A recommendation earns marks only when model features are linked to the scenario."],
  examMethod: ["Annotate the scenario: stable/change, deadline, size/risk, users and documentation.", "Name one model principle and convert it into a contextual benefit.", "Balance with one relevant drawback or condition, then give a clear recommendation."],
  papers: [
    { source: "9618/21 M/J 2023 · Q5(a)", marks: "3 MARKS", prompt: "Explain Waterfall drawbacks and name an alternative.", cues: [{ label: "LATE", text: "working product arrives late" }, { label: "CHANGE", text: "poor fit for evolving requirements" }, { label: "ALTERNATIVE", text: "iterative or RAD" }], answer: "Valid drawbacks include late delivery of working software, costly response to changing requirements and limited continuous client involvement. Iterative or RAD is a valid named alternative." },
    { source: "9618/23 O/N 2022 · Q1(c)", marks: "4 MARKS", prompt: "State a RAD principle, benefits and a drawback.", cues: [{ label: "PRINCIPLE", text: "rapid prototype/time-box/reuse" }, { label: "BENEFIT", text: "speed and user feedback" }, { label: "DRAWBACK", text: "skills/users/scale or quality risk" }], answer: "One principle plus up to two linked benefits and one drawback: rapid prototypes and frequent user feedback can deliver a closer fit quickly, but demand available users/skilled developers and may be unsuitable for very large or safety-critical work without controls." },
  ],
  retrieval: ["Which PDLC stages still exist in RAD?", "Why can early working increments expose risk?", "What project evidence favours Waterfall?"],
  exit: ["State one principle per model.", "Link one benefit to its principle.", "Recommend a model with one caveat."],
  homework: {
    instructions: "Every benefit/drawback must follow from a model principle and connect to the supplied project. Avoid absolute claims.",
    sections: [
      { code: "A", title: "Know the models", subtitle: "Principles and flow", questions: [
        { prompt: "State one defining principle of Waterfall, iterative and RAD.", answer: "Waterfall sequential completed stages; iterative repeated working increments/review; RAD rapid prototype/time-box/reuse with strong user involvement.", marks: 3 },
        { prompt: "Give one linked benefit for each model.", answer: "Waterfall clear stages/documentation; iterative early working functionality/feedback; RAD rapid delivery/user fit. Each must link to principle.", marks: 3 },
        { prompt: "Give one contextual drawback of each and one condition that affects choice.", answer: "Waterfall costly change/late product; iterative rework/coordination; RAD needs users/skills and may not scale. Choice condition could be requirements, risk, time, size.", marks: 4 },
      ] },
      { code: "B", title: "Recommend and justify", subtitle: "Project evidence", questions: [
        { prompt: "Recommend a model for stable tax software with formal sign-off.", answer: "Waterfall is defensible because rules are stable and staged documentation/review supports sign-off; note integration/change risk if relevant.", marks: 3 },
        { prompt: "Recommend a model for an evolving social app with weekly user access.", answer: "Iterative suits evolving requirements and weekly feedback through working increments; manage rework/integration.", marks: 3 },
        { prompt: "Recommend a model for a six-week prototype and develop two benefits plus one risk.", answer: "RAD: time-boxed prototyping/reuse speeds delivery; frequent user feedback improves fit; needs skilled team/available users and controls for quality.", marks: 4 },
      ] },
      { code: "C", title: "Published-paper application", subtitle: "Balanced model answers", questions: [
        { prompt: "Adapted from 9618/21 M/J 2023 Q5(a): give two Waterfall drawbacks and one alternative.", answer: "Late working product; costly/difficult requirement change or limited ongoing user involvement; alternative iterative or RAD.", marks: 3 },
        { prompt: "Adapted from 9618/23 O/N 2022 Q1(c): state one RAD principle and two benefits.", answer: "Rapid/time-boxed prototypes with user feedback; quicker working solution and early feedback/better requirement fit.", marks: 3 },
        { prompt: "Evaluate RAD for a safety-critical control system in four developed points.", answer: "Fast prototypes expose interface needs; user feedback can refine requirements; but speed/reuse may not provide sufficient formal assurance and users/skills are demanding; use rigorous testing/documentation or choose controlled iteration.", marks: 4 },
      ] },
    ], challenge: { prompt: "Design a justified hybrid life cycle.", answer: "Use staged analysis/safety requirements and formal acceptance gates, then iterative prototypes for high-risk interfaces and integrations. Explain who reviews each increment and what evidence allows progression." },
  },
  sourceSummary: "Checked against syllabus 12.1, Coursebook Chapter 15 printed pp.287–289 and published Paper 2 questions/mark schemes.",
  sourceDetail: "Core: Waterfall, iterative and RAD principles, benefits, drawbacks and program-dependent selection. Authentic anchors: 9618/21 M/J 2023 Q5(a) [3] and 9618/23 O/N 2022 Q1(c) [4]. The lesson avoids claiming any model is universally best.",
} satisfies PaperTwoLessonSpec;

export default function Lesson58Page() { return <PaperTwoLesson spec={spec} />; }
