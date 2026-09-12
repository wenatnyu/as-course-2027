"use client";

import type { CSSProperties, ReactNode } from "react";

export function LayerStack({
  layers,
  footer,
}: {
  layers: Array<{ name: string; detail: ReactNode; tag?: string }>;
  footer?: ReactNode;
}) {
  return (
    <section className="a2-at-stack" aria-label="Layered protocol stack">
      {layers.map((layer, index) => (
        <article key={layer.name}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <b>{layer.name}</b>
          <p>{layer.detail}</p>
          {layer.tag && <code>{layer.tag}</code>}
        </article>
      ))}
      {footer && <footer>{footer}</footer>}
    </section>
  );
}

export function PacketRoute({
  nodes,
  packets = ["01", "02", "03"],
}: {
  nodes: Array<{ label: string; detail?: string; state?: "router" | "host" }>;
  packets?: string[];
}) {
  return (
    <section className="a2-at-route" aria-label="Packet route">
      <div className="a2-at-route-nodes">
        {nodes.map((node, index) => (
          <div className="a2-at-route-step" key={`${node.label}-${index}`}>
            <article className={node.state ?? "router"}><span>{node.state === "host" ? "HOST" : "ROUTER"}</span><b>{node.label}</b>{node.detail && <p>{node.detail}</p>}</article>
            {index < nodes.length - 1 && <i aria-hidden="true">→</i>}
          </div>
        ))}
      </div>
      <div className="a2-at-packets">{packets.map((packet, index) => <span style={{ "--packet-index": index } as CSSProperties} key={packet}>P{packet}</span>)}</div>
    </section>
  );
}

export function PipelineGrid({
  instructions = 5,
  stages = ["IF", "ID", "OF", "IE", "WB"],
}: {
  instructions?: number;
  stages?: string[];
}) {
  const cycles = instructions + stages.length - 1;
  return (
    <section className="a2-at-pipeline" aria-label={`${instructions} instructions in a ${stages.length}-stage pipeline`}>
      <div className="a2-at-pipeline-head"><b>INSTRUCTION</b>{Array.from({ length: cycles }, (_, index) => <span key={index}>{index + 1}</span>)}</div>
      {Array.from({ length: instructions }, (_, instruction) => (
        <div className="a2-at-pipeline-row" key={instruction}>
          <b>I{instruction + 1}</b>
          {Array.from({ length: cycles }, (_, cycle) => {
            const stageIndex = cycle - instruction;
            return <span className={stageIndex >= 0 && stageIndex < stages.length ? "active" : ""} key={cycle}>{stageIndex >= 0 && stageIndex < stages.length ? stages[stageIndex] : ""}</span>;
          })}
        </div>
      ))}
    </section>
  );
}

export function FlynnMatrix({ cells }: { cells?: Record<string, ReactNode> }) {
  const values = cells ?? {
    SISD: "one instruction · one data stream",
    SIMD: "one instruction · multiple data streams",
    MISD: "multiple instructions · one data stream",
    MIMD: "multiple instructions · multiple data streams",
  };
  return (
    <section className="a2-at-flynn" aria-label="Flynn architecture matrix">
      <span />
      <b>SINGLE DATA</b>
      <b>MULTIPLE DATA</b>
      <b>SINGLE INSTRUCTION</b>
      <article><strong>SISD</strong><p>{values.SISD}</p></article>
      <article><strong>SIMD</strong><p>{values.SIMD}</p></article>
      <b>MULTIPLE INSTRUCTIONS</b>
      <article><strong>MISD</strong><p>{values.MISD}</p></article>
      <article><strong>MIMD</strong><p>{values.MIMD}</p></article>
    </section>
  );
}

export function VmTower({ layers }: { layers: Array<{ name: string; detail?: ReactNode; tone?: "guest" | "virtual" | "host" }> }) {
  return (
    <section className="a2-at-vm" aria-label="Virtual machine software stack">
      {layers.map((layer) => <article className={layer.tone ?? "virtual"} key={layer.name}><b>{layer.name}</b>{layer.detail && <span>{layer.detail}</span>}</article>)}
    </section>
  );
}

export function LogicBlocks({ blocks }: { blocks: Array<{ label: string; expression?: ReactNode; detail?: ReactNode }> }) {
  return (
    <section className="a2-at-logic-flow" aria-label="Logic circuit trace">
      {blocks.map((block, index) => (
        <div key={`${block.label}-${index}`}><article><span>STAGE {index + 1}</span><b>{block.label}</b>{block.expression && <code>{block.expression}</code>}{block.detail && <p>{block.detail}</p>}</article>{index < blocks.length - 1 && <i aria-hidden="true">→</i>}</div>
      ))}
    </section>
  );
}

export function LogicTable({ headers, rows }: { headers: ReactNode[]; rows: ReactNode[][] }) {
  return (
    <section className="a2-at-truth-wrap">
      <table className="a2-at-truth"><thead><tr>{headers.map((header, index) => <th key={index}>{header}</th>)}</tr></thead><tbody>{rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody></table>
    </section>
  );
}

export function SrLatchDiagram() {
  return (
    <section className="a2-at-latch" aria-label="Cross-coupled NOR SR latch">
      <svg viewBox="0 0 720 360" role="img" aria-labelledby="sr-latch-title sr-latch-desc">
        <title id="sr-latch-title">NOR SR latch circuit</title>
        <desc id="sr-latch-desc">Two NOR gates are cross-coupled. The inputs are S and R, and the complementary outputs are Q and not Q.</desc>
        <defs>
          <marker id="sr-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" /></marker>
        </defs>
        <text className="input-label" x="42" y="90">R</text>
        <text className="input-label" x="42" y="282">S</text>
        <path className="wire" d="M70 84 H250" markerEnd="url(#sr-arrow)" />
        <path className="wire" d="M70 276 H250" markerEnd="url(#sr-arrow)" />
        <path className="gate" d="M250 45 Q288 94 250 143 Q345 143 405 94 Q345 45 250 45 Q280 94 250 143" />
        <path className="gate" d="M250 237 Q288 286 250 335 Q345 335 405 286 Q345 237 250 237 Q280 286 250 335" />
        <circle className="invert" cx="414" cy="94" r="9" />
        <circle className="invert" cx="414" cy="286" r="9" />
        <path className="wire output" d="M423 94 H655" />
        <path className="wire output" d="M423 286 H655" />
        <text className="gate-label" x="319" y="101">NOR</text>
        <text className="gate-label" x="319" y="293">NOR</text>
        <text className="output-label" x="670" y="101">Q</text>
        <text className="output-label" x="666" y="293">Q̅</text>
        <path className="feedback" d="M540 94 V190 H215 V266 H250" markerEnd="url(#sr-arrow)" />
        <path className="feedback" d="M580 286 V178 H195 V114 H250" markerEnd="url(#sr-arrow)" />
        <text className="feedback-label" x="32" y="187">feedback stores state</text>
      </svg>
      <div><b>Cross-coupled outputs</b><span>Each output feeds one input of the other NOR gate. Q and Q̅ should be complements except in the invalid state.</span></div>
    </section>
  );
}

export function KMap({
  rowLabels,
  columnLabels,
  values,
  caption,
}: {
  rowLabels: string[];
  columnLabels: string[];
  values: Array<Array<0 | 1 | "X">>;
  caption?: ReactNode;
}) {
  return (
    <section className="a2-at-kmap-wrap">
      {caption && <p>{caption}</p>}
      <div className="a2-at-kmap" style={{ "--kmap-columns": columnLabels.length } as CSSProperties}>
        <b>ROW / COLUMN</b>{columnLabels.map((label) => <b key={label}>{label}</b>)}
        {values.flatMap((row, rowIndex) => [
          <b key={`row-${rowIndex}`}>{rowLabels[rowIndex]}</b>,
          ...row.map((value, columnIndex) => <span className={value === 1 ? "one" : value === "X" ? "dont-care" : ""} key={`${rowIndex}-${columnIndex}`}>{value}</span>),
        ])}
      </div>
    </section>
  );
}

export function ProcessStateDiagram() {
  return (
    <section className="a2-at-process" aria-label="Required process states and valid transitions">
      <svg viewBox="0 0 920 430" role="img" aria-labelledby="process-state-title process-state-desc">
        <title id="process-state-title">Running, ready and blocked process states</title>
        <desc id="process-state-desc">Ready moves to running when dispatched. Running returns to ready after pre-emption. Running moves to blocked when waiting for an event, and blocked returns to ready when the event completes.</desc>
        <defs><marker id="process-arrow" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" /></marker></defs>
        <rect className="state ready" x="70" y="115" width="220" height="110" rx="18" />
        <rect className="state running" x="630" y="115" width="220" height="110" rx="18" />
        <rect className="state blocked" x="350" y="300" width="220" height="110" rx="18" />
        <text className="state-title" x="180" y="173">READY</text><text className="state-detail" x="180" y="201">waiting for CPU</text>
        <text className="state-title" x="740" y="173">RUNNING</text><text className="state-detail" x="740" y="201">using the CPU</text>
        <text className="state-title" x="460" y="358">BLOCKED</text><text className="state-detail" x="460" y="386">waiting for event</text>
        <path className="transition" d="M290 145 C400 72 520 72 630 145" markerEnd="url(#process-arrow)" />
        <text className="transition-label" x="460" y="73">dispatch</text>
        <path className="transition" d="M630 206 C520 270 400 270 290 206" markerEnd="url(#process-arrow)" />
        <text className="transition-label" x="460" y="279">pre-emption / time slice</text>
        <path className="transition accent" d="M680 225 C640 278 592 307 566 328" markerEnd="url(#process-arrow)" />
        <text className="transition-label" x="692" y="292">wait for I/O</text>
        <path className="transition accent" d="M354 328 C318 300 252 267 220 225" markerEnd="url(#process-arrow)" />
        <text className="transition-label" x="218" y="314">event completes</text>
      </svg>
      <p><b>Exam rule:</b> a blocked process returns to <strong>ready</strong>; it cannot jump straight to running.</p>
    </section>
  );
}

export function ScheduleBar({
  title,
  segments,
}: {
  title: string;
  segments: Array<{ process: string; start: number; end: number; idle?: boolean }>;
}) {
  const endTime = Math.max(...segments.map((segment) => segment.end));
  return (
    <section className="a2-at-schedule" aria-label={`${title} scheduling timeline`}>
      <header><b>{title}</b><span>CPU timeline</span></header>
      <div className="a2-at-schedule-track">
        {segments.map((segment, index) => (
          <article
            className={segment.idle ? "idle" : ""}
            style={{ "--schedule-width": `${((segment.end - segment.start) / endTime) * 100}%` } as CSSProperties}
            key={`${segment.process}-${index}`}
          >
            <b>{segment.process}</b><span>{segment.start}–{segment.end}</span>
          </article>
        ))}
      </div>
      <div className="a2-at-schedule-axis"><span>0</span><span>{endTime} time units</span></div>
    </section>
  );
}

export function PageFrameMap() {
  const pages = ["P0", "P1", "P2", "P3"];
  const frames = ["P2", "FREE", "P0", "P3", "OS", "FREE"];
  return (
    <section className="a2-at-memory" aria-label="Logical pages mapped through a page table to physical frames">
      <div><b>LOGICAL PAGES</b>{pages.map((page) => <span key={page}>{page}</span>)}</div>
      <div className="page-table"><b>PAGE TABLE</b><span>P0 → F2</span><span>P1 → disk</span><span>P2 → F0</span><span>P3 → F3</span></div>
      <i aria-hidden="true">→</i>
      <div><b>PHYSICAL FRAMES</b>{frames.map((frame, index) => <span className={frame === "FREE" ? "free" : frame === "OS" ? "os" : ""} key={index}>F{index} · {frame}</span>)}</div>
    </section>
  );
}

export function StackMachine({
  stack,
  operation,
  result,
}: {
  stack: Array<string | number>;
  operation: string;
  result: string | number;
}) {
  return (
    <section className="a2-at-stack-machine" aria-label={`Stack operation ${operation} gives ${result}`}>
      <div><b>TOP</b>{[...stack].reverse().map((item, index) => <span key={`${item}-${index}`}>{item}</span>)}<em>STACK</em></div>
      <i aria-hidden="true">→</i>
      <article><span>POP RIGHT, THEN LEFT</span><code>{operation}</code><b>PUSH {result}</b></article>
    </section>
  );
}

export function KeyJourney({
  purpose,
  steps,
}: {
  purpose: string;
  steps: Array<{ actor: string; action: ReactNode; keyLabel?: string }>;
}) {
  return (
    <section className="a2-at-key-journey" aria-label={purpose}>
      <header><span>KEY DIRECTION</span><b>{purpose}</b></header>
      <div>{steps.map((step, index) => <section key={`${step.actor}-${index}`}><article><span>{step.actor}</span><p>{step.action}</p>{step.keyLabel && <code>{step.keyLabel}</code>}</article>{index < steps.length - 1 && <i aria-hidden="true">→</i>}</section>)}</div>
    </section>
  );
}

export function CertificateCard() {
  return (
    <section className="a2-at-certificate" aria-label="Contents and trust chain of a digital certificate">
      <article><span>CA-SIGNED</span><h3>DIGITAL CERTIFICATE</h3><dl><div><dt>Subject</dt><dd>example.edu</dd></div><div><dt>Public key</dt><dd>owner&apos;s key</dd></div><div><dt>Issuer</dt><dd>trusted CA</dd></div><div><dt>Validity</dt><dd>start → expiry</dd></div><div><dt>Serial</dt><dd>unique ID</dd></div></dl><strong>CA DIGITAL SIGNATURE</strong></article>
      <div><b>Browser trusts CA</b><span>→</span><b>CA vouches for identity ↔ public key</b></div>
    </section>
  );
}
