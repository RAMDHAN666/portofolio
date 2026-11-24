import React from "react";

/**
 * Label section bernomor, mis. "— 01 PERKENALAN —".
 * Pakai di atas judul section: <SectionLabel number="01" text="Perkenalan" />
 */
export default function SectionLabel({ number, text }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.9rem",
        marginBottom: "1.4rem",
        fontFamily: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
        fontSize: "0.8rem",
        fontWeight: 600,
        letterSpacing: "0.32em",
        textTransform: "uppercase",
        color: "#a78bfa",
      }}
    >
      <span style={{ width: 36, height: 1, background: "linear-gradient(90deg, transparent, #8b5cf6)" }} />
      <span style={{ color: "#ec4899" }}>{number}</span>
      <span>{text}</span>
      <span style={{ width: 36, height: 1, background: "linear-gradient(270deg, transparent, #8b5cf6)" }} />
    </div>
  );
}
