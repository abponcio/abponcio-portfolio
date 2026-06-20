"use client";

import { useEffect, useState } from "react";

export function InfoBar() {
  const [clock, setClock] = useState("00:00:00");

  useEffect(() => {
    const update = () => {
      try {
        const formatted = new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Dubai",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date());
        setClock(formatted);
      } catch {
        setClock("00:00:00");
      }
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="flex flex-wrap items-center gap-x-[22px] gap-y-3.5 pt-[26px]"
      style={{
        borderTop: "1px solid var(--line)",
        fontSize: "13.5px",
        fontWeight: 600,
        letterSpacing: "0.01em",
      }}
    >
      <span className="flex items-center gap-2">
        <span
          className="shrink-0"
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "var(--accent)",
          }}
        />
        Dubai, UAE
      </span>
      <span style={{ color: "var(--line)" }}>·</span>
      <span
        className="font-mono"
        style={{ fontVariantNumeric: "tabular-nums", color: "var(--text)" }}
      >
        {clock}
        <span className="gst-suffix"> GST</span>
      </span>
      <span style={{ color: "var(--line)" }}>·</span>
      <span style={{ color: "var(--muted)" }}>
        Heads down at{" "}
        <span style={{ color: "var(--text)" }}>Hello Chef</span>
      </span>
    </div>
  );
}
