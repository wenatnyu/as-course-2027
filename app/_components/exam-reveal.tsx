"use client";

import { useId, useState, type ReactNode } from "react";

export function ExamReveal({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(false);
  const id = useId();

  return (
    <div className="exam-reveal se-reveal">
      <button type="button" aria-expanded={visible} aria-controls={id} onClick={() => setVisible((current) => !current)}>
        {visible ? "Hide mark scheme" : "Reveal mark scheme"}
      </button>
      <div id={id} className={visible ? "exam-reveal__panel se-reveal__panel visible" : "exam-reveal__panel se-reveal__panel"} hidden={!visible}>
        {children}
      </div>
    </div>
  );
}
