"use client";

import { useState, type ReactNode } from "react";
import {
  HomeworkSheet,
  LessonShell,
  Mark,
  Slide,
  type HomeworkSection,
  type SlideData,
} from "../_components/lesson-shell";

function Reveal({ visible, onToggle, children }: { visible: boolean; onToggle: () => void; children: ReactNode }) {
  return (
    <div className="l13-reveal">
      <button type="button" onClick={onToggle} aria-expanded={visible} aria-controls="l13-paper-answer">
        {visible ? "Hide mark scheme" : "Reveal mark scheme"}
      </button>
      <div id="l13-paper-answer" className={visible ? "l13-reveal__panel visible" : "l13-reveal__panel"} hidden={!visible}>
        {children}
      </div>
    </div>
  );
}

const homeworkSections: HomeworkSection[] = [
  {
    code: "A",
    title: "Printing and audio",
    subtitle: "Write each physical conversion in the correct order",
    marks: 10,
    questions: [
      {
        id: "l13-1",
        marks: 4,
        lines: 5,
        prompt: <><b>Describe four stages in the principal operation of a laser printer.</b></>,
        answer: <p>Any four linked stages: the drum is given an electrostatic charge; a laser discharges selected points to form the page image; charged toner sticks to that pattern; toner transfers to oppositely charged paper; heated pressure rollers fuse it to the paper; the drum is cleaned and reset. <em>[1 each; max 4]</em></p>,
      },
      {
        id: "l13-2",
        marks: 3,
        lines: 4,
        prompt: <><b>Describe the principal operation of a 3D printer.</b></>,
        answer: <p>A digital/CAD model is sliced into layers. The printer creates one cross-section at a time using an additive process, then repeats at successive heights until the object is complete. Material may be deposited and fused or resin/powder may be cured. <em>[Any three distinct points]</em></p>,
      },
      {
        id: "l13-3",
        marks: 3,
        lines: 4,
        prompt: <><b>Explain how a microphone inputs sound and a speaker outputs sound.</b></>,
        answer: <p>A microphone diaphragm vibrates and a transducer creates an analogue electrical signal, which an ADC samples into digital data. For output, a DAC creates an analogue signal; current in the speaker coil moves a cone/diaphragm, producing sound waves. <em>[Input conversion; ADC; output conversion]</em></p>,
      },
    ],
  },
  {
    code: "B",
    title: "Secondary storage operation",
    subtitle: "Magnetic, optical and solid-state mechanisms",
    marks: 10,
    questions: [
      {
        id: "l13-4",
        marks: 4,
        lines: 4,
        prompt: <><Mark>PAST PAPER PRACTICE</Mark><p><b>Complete the operation of a magnetic HDD using these four terms: platters, spindle, read/write head, magnetic field.</b></p><p>Adapted from 9618/11 M/J 2025 Q6(a)(i). [4]</p></>,
        answer: <p>The <strong>platters</strong> rotate on a <strong>spindle</strong>. An actuator positions a <strong>read/write head</strong>; writing uses a <strong>magnetic field</strong> to change the magnetisation of areas on the surface. <em>[1 each]</em></p>,
      },
      {
        id: "l13-5",
        marks: 3,
        lines: 4,
        prompt: <><b>Describe how data is read from a pressed optical disc.</b></>,
        answer: <p>The disc spins while a low-power laser follows a spiral track. Pits and lands reflect different amounts/patterns of light; a photodiode detects the reflection changes and the electronics decode them as stored bits. <em>[1 laser/track; 1 reflection; 1 interpretation]</em></p>,
      },
      {
        id: "l13-6",
        marks: 3,
        lines: 4,
        prompt: <><b>Describe how a flash-memory cell stores and reads a bit.</b></>,
        answer: <p>An electrical voltage moves electrons onto or off an insulated floating gate. Trapped charge changes the transistor’s threshold/conduction and remains without power. The controller applies a voltage, senses the current/threshold and interprets the state as data. <em>[1 charge; 1 non-volatile effect; 1 read]</em></p>,
      },
    ],
  },
  {
    code: "C",
    title: "Touch and virtual reality",
    subtitle: "Connect sensing to coordinates and display updates",
    marks: 10,
    questions: [
      {
        id: "l13-7",
        marks: 4,
        lines: 5,
        prompt: <><Mark>PAST PAPER PRACTICE</Mark><p><b>Describe how a touchscreen detects a touch and uses it to select a menu item.</b></p><p>Adapted from 9618/12 O/N 2025 Q8(b)(i). [4]</p></>,
        answer: <p>Valid detection examples include resistive layers making contact/completing a circuit or a finger changing the charge/capacitance in an electrode grid. The controller calculates the x-y coordinates, then compares those coordinates with the menu regions and selects/adds the matching item. <em>[Up to 2 detection; up to 2 coordinates/action]</em></p>,
      },
      {
        id: "l13-8",
        marks: 4,
        lines: 4,
        prompt: <><b>Describe four features used in the principal operation of a VR headset.</b></>,
        answer: <p>One or two displays show images through lenses; separate eye views create depth; speakers provide spatial/surround sound; gyroscopes and accelerometers detect head direction and movement; cameras may track position; the computer updates the rendered viewpoint from the sensor data. <em>[Any four]</em></p>,
      },
      {
        id: "l13-9",
        marks: 2,
        lines: 3,
        prompt: <><b>Choose a suitable device for each task:</b><p>(a) durable portable storage with no moving parts; (b) producing a physical prototype from a CAD model.</p></>,
        answer: <p><b>(a)</b> Flash storage, such as a USB drive or memory card. <b>(b)</b> A 3D printer. <em>[1 each]</em></p>,
      },
    ],
  },
];

export default function Lesson13Client() {
  const [paperVisible, setPaperVisible] = useState(false);

  const slides: SlideData[] = [
    {
      time: "3 min",
      focus: "Introduce device questions as ordered physical transformations rather than lists of features.",
      prompt: "Ask what changes form in a printer, microphone and storage device.",
      source: "Coursebook Chapter 3 device sections, printed pp.55-63; syllabus 3.1 specified devices.",
      content: (
        <Slide number="01" eyebrow="DEVICE OPERATION" sourceLabel="TEXTBOOK CH.3 · pp.55-63" syllabusLabel="SYLLABUS 3.1" className="slide--l13-title">
          <section className="l13-title-grid"><div><span>LESSON 13 · 90 MINUTES</span><h1>Trace the signal.<br /><em>Name the mechanism.</em></h1><p>From charge and magnetism to light, movement and sound: explain devices as ordered processes.</p></div><div className="l13-transform" role="img" aria-label="Data passes through a physical mechanism to become output"><b>DATA</b><i>→</i><strong>PHYSICAL<br />MECHANISM</strong><i>→</i><b>RESULT</b></div></section>
        </Slide>
      ),
    },
    {
      time: "4 min",
      focus: "Expose every named syllabus device and the coursebook pages supporting it.",
      prompt: "Students group the nine named devices into print, audio, storage and interaction.",
      source: "Coursebook printed pp.55-63; syllabus 3.1 principal operation of hardware devices.",
      content: (
        <Slide number="02" eyebrow="TEXTBOOK × SYLLABUS" sourceLabel="TEXTBOOK pp.55-63" syllabusLabel="SYLLABUS 3.1 — DEVICES" title="Nine named devices; four mechanism families." className="slide--l13-map">
          <section className="l13-route"><article><b>PRINT</b><p>laser · 3D</p></article><article><b>AUDIO</b><p>microphone · speaker</p></article><article><b>STORE</b><p>HDD · flash · optical</p></article><article><b>INTERACT</b><p>touchscreen · VR</p></article></section>
          <p className="l13-boundary"><Mark>EXAM VERB</Mark><span>“Describe the principal operation” means ordered mechanism, not advantages and disadvantages.</span></p>
        </Slide>
      ),
    },
    {
      time: "5 min",
      focus: "Give students a reusable structure for every operation question.",
      prompt: "Apply input-process-output to a microphone in one sentence per stage.",
      source: "Coursebook Chapter 3 synthesis; Paper 1 mark schemes award distinct ordered stages.",
      content: (
        <Slide number="03" eyebrow="HOW TO WRITE AN OPERATION" sourceLabel="PAPER 1 METHOD" syllabusLabel="SYLLABUS 3.1 — EXAM METHOD" title="Input → mechanism → changed state → result." className="slide--l13-method">
          <section className="l13-method-grid"><article><b>1 · INPUT</b><p>What enters or starts the process?</p></article><article><b>2 · MECHANISM</b><p>Which named part acts?</p></article><article><b>3 · CHANGE</b><p>What physical state changes?</p></article><article><b>4 · RESULT</b><p>How is data read or output produced?</p></article></section>
          <p className="l13-warning">Avoid brand names and vague verbs such as “it processes it”. Name charge, light, magnetism, vibration or motion.</p>
        </Slide>
      ),
    },
    {
      time: "6 min",
      focus: "Teach the electrophotographic laser-printing sequence accurately.",
      prompt: "Students arrange charge, laser, toner, transfer, fuse and clean in order.",
      source: "Coursebook laser-printer section printed pp.59-60; syllabus 3.1 laser printer.",
      content: (
        <Slide number="04" eyebrow="LASER PRINTER" sourceLabel="TEXTBOOK pp.59-60" syllabusLabel="SYLLABUS 3.1 — LASER PRINTER" title="Charge → image → toner → paper → fuse." className="slide--l13-laser">
          <section className="l13-process six"><article><b>1</b><p>charge drum</p></article><i>→</i><article><b>2</b><p>laser discharges image</p></article><i>→</i><article><b>3</b><p>toner adheres</p></article><i>→</i><article><b>4</b><p>transfer to paper</p></article><i>→</i><article><b>5</b><p>heat + pressure fuse</p></article><i>→</i><article><b>6</b><p>clean drum</p></article></section>
          <p className="l13-takeaway">The laser does not burn the paper. It changes charge on a photosensitive drum to form an electrostatic page image.</p>
        </Slide>
      ),
    },
    {
      time: "6 min",
      focus: "Teach the method-independent stages of additive manufacturing before examples.",
      prompt: "Ask why slicing must happen before the printer can build the first layer.",
      source: "Coursebook 3D-printer section printed pp.60-61; syllabus 3.1 3D printer.",
      content: (
        <Slide number="05" eyebrow="3D PRINTER" sourceLabel="TEXTBOOK pp.60-61" syllabusLabel="SYLLABUS 3.1 — 3D PRINTER" title="A digital model becomes successive physical layers." className="slide--l13-3d">
          <section className="l13-3d-flow"><article><span>CAD MODEL</span><div className="l13-cube"><i /><i /><i /></div></article><i>→</i><article><span>SLICE</span><div className="l13-slices"><i /><i /><i /><i /><i /></div></article><i>→</i><article><span>BUILD</span><div className="l13-build"><i /><i /><i /><i /><i /></div></article></section>
          <p className="l13-takeaway">The general process is additive and layer-by-layer. FDM deposits heated material; other methods cure resin or fuse powder.</p>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Apply the generic 3D-printing process to an authentic recent question.",
      prompt: "Give three minutes, then reveal; award only distinct process stages.",
      source: "Adapted from 9618/11 O/N 2025 Q10(a), visually checked against the published mark scheme.",
      content: (
        <Slide number="06" eyebrow="PAST PAPER PRACTICE · 3 MARKS" sourceLabel="9618/11 O/N 2025 · Q10(a)" syllabusLabel="SYLLABUS 3.1 — EXAM PRACTICE" title="Describe the principal operation of a 3D printer. [3]" className="slide--l13-paper">
          <section className="l13-paper-question"><p>A design company sends a digital model to a 3D printer. Describe how the printer produces the object. <strong>[3]</strong></p></section>
          <Reveal visible={paperVisible} onToggle={() => setPaperVisible((value) => !value)}><p>Any three generic points: additive manufacturing; starts from a digital/CAD file; constructs one layer at a time; repeats for every layer; material cools/sets or is cured. One method detail may also score, such as heated material through a nozzle or UV curing.</p></Reveal>
          <p className="l13-citation">Adapted from 9618/11 O/N 2025 Q10(a), original allocation [3].</p>
        </Slide>
      ),
    },
    {
      time: "6 min",
      focus: "Trace analogue sound through a transducer and ADC.",
      prompt: "Students identify the two conversions: pressure wave to voltage, then voltage to binary samples.",
      source: "Coursebook microphone section printed p.63; syllabus 3.1 microphone.",
      content: (
        <Slide number="07" eyebrow="MICROPHONE" sourceLabel="TEXTBOOK p.63" syllabusLabel="SYLLABUS 3.1 — MICROPHONE" title="Sound pressure becomes an electrical signal, then digital samples." className="slide--l13-audio">
          <section className="l13-audio-flow"><div className="l13-wave" aria-hidden="true"><i /><i /><i /><i /><i /></div><strong>→</strong><article><b>DIAPHRAGM + TRANSDUCER</b><p>vibration creates analogue voltage</p></article><strong>→</strong><article><b>ADC</b><p>samples and quantises to binary</p></article></section>
          <p className="l13-warning">A microphone alone does not make the waveform digital; the analogue-to-digital converter performs that stage.</p>
        </Slide>
      ),
    },
    {
      time: "6 min",
      focus: "Reverse the conversion chain and name the moving speaker parts.",
      prompt: "Ask why a rapidly changing current makes the cone move back and forth.",
      source: "Coursebook speaker section printed p.63; syllabus 3.1 speaker.",
      content: (
        <Slide number="08" eyebrow="SPEAKER" sourceLabel="TEXTBOOK p.63" syllabusLabel="SYLLABUS 3.1 — SPEAKER" title="Digital samples become motion — and motion becomes sound." className="slide--l13-speaker">
          <section className="l13-speaker-flow"><article><b>DAC</b><p>binary → analogue signal</p></article><i>→</i><article><b>COIL + MAGNET</b><p>changing current creates force</p></article><i>→</i><article><b>CONE</b><p>vibrates air into sound waves</p></article></section>
          <p className="l13-takeaway">An amplifier may increase the signal power before it drives the voice coil.</p>
        </Slide>
      ),
    },
    {
      time: "6 min",
      focus: "Link HDD mechanical parts to magnetic read/write operations.",
      prompt: "Students trace one block address to a track/sector and then to the read/write head.",
      source: "Coursebook magnetic-storage section printed pp.55-56; syllabus 3.1 magnetic HDD.",
      content: (
        <Slide number="09" eyebrow="MAGNETIC HARD DISK" sourceLabel="TEXTBOOK pp.55-56" syllabusLabel="SYLLABUS 3.1 — HDD" title="Spinning platters; moving heads; magnetic domains." className="slide--l13-hdd">
          <section className="l13-hdd-diagram" role="img" aria-label="Three magnetic platters on a spindle with an actuator arm and read write head"><div className="l13-platters"><i /><i /><i /><b>SPINDLE</b></div><div className="l13-arm"><i /><b>HEAD</b></div><article><span>WRITE</span><p>magnetic field changes domains</p><span>READ</span><p>head detects magnetisation changes</p></article></section>
          <p className="l13-warning">The head floats extremely close to the surface; it should not touch the spinning platter.</p>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Explain non-volatile solid-state storage through trapped charge and threshold sensing.",
      prompt: "Ask what remains physically different in a flash cell after power is removed.",
      source: "Coursebook solid-state section printed pp.57-58; syllabus 3.1 flash memory.",
      content: (
        <Slide number="10" eyebrow="FLASH MEMORY" sourceLabel="TEXTBOOK pp.57-58" syllabusLabel="SYLLABUS 3.1 — FLASH" title="Trapped electrons change how a transistor conducts." className="slide--l13-flash">
          <section className="l13-flash-cell" role="img" aria-label="Control gate above an insulated floating gate in a flash memory cell"><b>CONTROL GATE</b><i /><strong>FLOATING GATE<br /><small>trapped charge</small></strong><i /><span>SOURCE</span><em>channel</em><span>DRAIN</span></section>
          <div className="l13-fact-row"><p><b>Write/erase:</b> electrical voltage moves charge</p><p><b>Store:</b> insulation retains charge</p><p><b>Read:</b> controller senses threshold/current</p></div>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Keep pressed optical-disc reading separate from rewritable-disc phase change.",
      prompt: "Students point to the reflection change rather than assigning a universal bit to every pit or land.",
      source: "Coursebook optical-storage section printed pp.56-57; syllabus 3.1 optical storage.",
      content: (
        <Slide number="11" eyebrow="OPTICAL DISC · READ" sourceLabel="TEXTBOOK pp.56-57" syllabusLabel="SYLLABUS 3.1 — OPTICAL" title="A laser follows one spiral and a sensor reads reflection changes." className="slide--l13-optical">
          <section className="l13-disc-read"><div className="l13-disc"><i /><i /><i /><b>spiral track</b></div><article><span>LASER</span><i>↓</i><b>PIT / LAND PATTERN</b><i>↑</i><span>PHOTODIODE</span></article></section>
          <p className="l13-takeaway">Pressed discs contain pits and lands. Their different reflection pattern is detected and decoded as data.</p>
        </Slide>
      ),
    },
    {
      time: "8 min",
      focus: "Distinguish permanent dye changes from reversible phase-change material.",
      prompt: "Sort read, write-once and rewritable mechanisms without mixing pits with phase change.",
      source: "Coursebook optical-storage section printed pp.56-57; syllabus 3.1 optical media.",
      content: (
        <Slide number="12" eyebrow="OPTICAL DISC · WRITE" sourceLabel="TEXTBOOK pp.56-57" syllabusLabel="SYLLABUS 3.1 — OPTICAL" title="Writable layers change reflectivity; the mechanism depends on the medium." className="slide--l13-optical-write">
          <section className="l13-optical-grid"><article><span>READ-ONLY / PRESSED</span><b>pits and lands</b><p>manufactured physical pattern</p></article><article><span>RECORDABLE</span><b>laser changes dye</b><p>write once; reflection pattern becomes permanent</p></article><article><span>REWRITABLE</span><b>phase-change alloy</b><p>laser switches crystalline/amorphous states</p></article></section>
          <p className="l13-warning">Do not say a rewritable drive “burns new pits”. It changes the optical state of a recording layer.</p>
        </Slide>
      ),
    },
    {
      time: "7 min",
      focus: "Compare resistive and capacitive detection mechanisms and complete the coordinate step.",
      prompt: "Ask which accepts a gloved stylus and which supports light multi-touch gestures.",
      source: "Coursebook touchscreen section printed pp.61-62; syllabus 3.1 touchscreen.",
      content: (
        <Slide number="13" eyebrow="TOUCHSCREEN" sourceLabel="TEXTBOOK pp.61-62" syllabusLabel="SYLLABUS 3.1 — TOUCHSCREEN" title="Detect a physical change, calculate coordinates, select the target." className="slide--l13-touch">
          <section className="l13-touch-grid"><article><span>RESISTIVE</span><div><i /><i /></div><p>pressure brings conductive layers together and completes a circuit</p></article><article><span>CAPACITIVE</span><div className="capacitive"><i /><i /><i /><i /></div><p>a conductive finger changes capacitance/charge in an electrode grid</p></article></section>
          <div className="l13-coordinate"><b>signal pattern</b><i>→</i><b>x-y coordinate</b><i>→</i><b>screen region / command</b></div>
        </Slide>
      ),
    },
    {
      time: "8 min",
      focus: "Connect VR displays, audio and motion sensors into a low-latency feedback loop.",
      prompt: "Students trace what changes on-screen when the user turns their head left.",
      source: "Coursebook VR headset section printed p.59; 9618/12 M/J 2024 Q2(a).",
      content: (
        <Slide number="14" eyebrow="VIRTUAL REALITY HEADSET" sourceLabel="TEXTBOOK p.59" syllabusLabel="SYLLABUS 3.1 — VR" title="Sense movement; render the matching viewpoint." className="slide--l13-vr">
          <section className="l13-vr-loop"><article><span>SENSE</span><b>gyroscope · accelerometer · cameras</b><p>direction, speed and position</p></article><i>→</i><article><span>PROCESS</span><b>update virtual camera</b><p>calculate the new viewpoint</p></article><i>→</i><article><span>OUTPUT</span><b>eye displays + spatial audio</b><p>stereoscopic, responsive scene</p></article><strong>↺</strong></section>
          <p className="l13-takeaway">Low latency matters because the displayed scene must remain consistent with the user’s movement.</p>
        </Slide>
      ),
    },
    {
      time: "4 min",
      focus: "Finish with three mechanisms and direct students to the printable homework.",
      prompt: "Students state the physical change used by magnetic, optical and flash storage.",
      source: "Lesson synthesis from syllabus 3.1 and Coursebook printed pp.55-63.",
      content: (
        <Slide number="15" eyebrow="EXIT TICKET" sourceLabel="TEXTBOOK CH.3 · REVIEW" syllabusLabel="SYLLABUS 3.1" title="One technology. One physical state." className="slide--l13-exit">
          <section className="l13-exit-grid"><article><b>MAGNETIC</b><p>orientation of domains</p></article><article><b>OPTICAL</b><p>reflection from a track/layer</p></article><article><b>FLASH</b><p>charge on a floating gate</p></article></section>
          <div className="l13-homework"><b>HOMEWORK 13</b><span>30 marks · 45 minutes · inline mark schemes</span><strong>USE HOMEWORK TAB ↑</strong></div>
        </Slide>
      ),
    },
  ];

  return (
    <LessonShell
      lessonNumber="13"
      slides={slides}
      homework={<HomeworkSheet lessonNumber="13" title="How Hardware Devices Work" marks={30} minutes={45} syllabusLabel="SYLLABUS 3.1" sourceLabel="TEXTBOOK CH.3 · pp.55-63 + PAPER 1" instructions="Answer operation questions as ordered processes. Name the physical mechanism and the component causing each change. Past-paper prompts are concise adaptations with the exact session, paper, question and mark allocation shown." sections={homeworkSections} challenge={{ id: "l13-challenge", prompt: <p><Mark>CHALLENGE</Mark> A museum scans an object, stores the model, edits it and prints a replica. Trace the data through one input device, primary memory, secondary storage and a 3D printer.</p>, answer: <p>A scanner or camera captures data; the processor works on the model held in RAM; the saved CAD file is retained on secondary storage; slicing software converts it into layers; the 3D printer builds each layer additively until the replica is complete.</p> }} />}
      courseMapHref="../?view=roadmap"
      sourceSummary="Checked against syllabus 3.1, Coursebook Chapter 3 printed pp.55-63, and published AS Paper 1 questions and mark schemes from 2023-2025."
      sourceDetail="Coursebook magnetic HDD pp.55-56; optical storage pp.56-57; solid-state storage pp.57-58; VR headset p.59; laser printer pp.59-60; 3D printer pp.60-61; touchscreen pp.61-62; microphone and speaker p.63. Technical corrections keep pressed pits/lands separate from rewritable phase change, use a general CAD-slice-layer additive model for 3D printing, and describe the laser-printer charge-image-toner-transfer-fuse-clean sequence. Authentic anchors: 9618/11 O/N 2025 Q10(a) [3], 9618/11 M/J 2025 Q6(a)(i) [4], 9618/12 O/N 2025 Q8(b)(i) [4], and 9618/12 M/J 2024 Q2(a) [4]."
    />
  );
}
