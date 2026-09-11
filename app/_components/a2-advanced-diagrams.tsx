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
