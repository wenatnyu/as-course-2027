"use client";

export default function PrintButton() {
  return <button type="button" className="note-print" onClick={() => window.print()}>Print / Save PDF</button>;
}
