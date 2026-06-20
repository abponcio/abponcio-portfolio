"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { testimonials } from "@/lib/content";

const AVATARS = [
  "https://media.licdn.com/dms/image/v2/D5603AQGymMuxpg4FDA/profile-displayphoto-scale_100_100/B56ZljxeIbJ8Ac-/0/1758315538135?e=1783555200&v=beta&t=iGDqJ3uTkYveg8gt1pes5uvIEq_vjl28T-_qRJoZrIM",
  "https://media.licdn.com/dms/image/v2/D4D03AQHRiH8wdKJRsg/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1727684088870?e=1783555200&v=beta&t=zSrnJ8fXGt-7pUMPNS02EG6N3Z-8D3tExnHio3PM6TU",
  "https://media.licdn.com/dms/image/v2/C4E03AQHdB1mFfShxkA/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1517550007123?e=1783555200&v=beta&t=MpaA4Tw55Ne0Vaa8XIDYiyC3Caw9Mu37rFSeJ59Cimg",
];
const AUTO_MS = 7000;

export function Testimonials() {
  const [slide, setSlide] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goSlide = (i: number) => {
    const next = ((i % testimonials.length) + testimonials.length) % testimonials.length;
    setSlide(next);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setSlide((s) => (s + 1) % testimonials.length), AUTO_MS);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => setSlide((s) => (s + 1) % testimonials.length), AUTO_MS);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  return (
    <section
      className="flex flex-col border-t"
      style={{
        padding: "clamp(40px, 5vw, 80px) clamp(20px, 5vw, 72px)",
        gap: "clamp(20px, 2.4vw, 36px)",
        borderColor: "var(--line)",
      }}
    >
      {/* Header */}
      <div className="flex flex-wrap items-baseline justify-between gap-5">
        <h2
          className="font-display font-semibold"
          style={{ fontSize: "clamp(30px, 4.6vw, 64px)", lineHeight: 1, letterSpacing: "-0.03em" }}
        >
          What people <span style={{ color: "var(--accent)" }}>say.</span>
        </h2>
        <p style={{ fontSize: "13.5px", color: "var(--muted)", fontWeight: 500, maxWidth: "30ch" }}>
          From managers, peers, and clients across a decade of building together.
        </p>
      </div>

      {/* Slides — CSS grid overlay so container height = current slide only */}
      <div style={{ display: "grid" }}>
        {testimonials.map((q, i) => (
          <figure
            key={q.name}
            aria-hidden={i !== slide}
            className="flex flex-col"
            style={{
              gridArea: "1 / 1",
              gap: "clamp(14px, 1.8vw, 24px)",
              opacity: i === slide ? 1 : 0,
              pointerEvents: i === slide ? "auto" : "none",
              transition: "opacity 0.55s ease",
              paddingRight: "clamp(0px, 4vw, 80px)",
            }}
          >
            <span style={{ color: "var(--accent)", display: "block", lineHeight: 0 }}>
              <svg width="44" height="34" viewBox="0 0 58 44" fill="currentColor" aria-hidden="true">
                <path d="M0 44V25.5C0 11.4 8.7 2 23 0l2.6 6.4C17.8 8.6 13.4 13 12.8 19.4H24V44H0zm34 0V25.5C34 11.4 42.7 2 57 0l2.6 6.4C51.8 8.6 47.4 13 46.8 19.4H58V44H34z" />
              </svg>
            </span>

            <blockquote
              className="font-display font-semibold text-pretty"
              style={{
                fontSize: "clamp(18px, 2.2vw, 32px)",
                lineHeight: 1.2,
                letterSpacing: "-0.022em",
                maxWidth: "32ch",
              }}
            >
              {q.quote}
            </blockquote>

            <figcaption className="flex items-center" style={{ gap: 14 }}>
              <Image
                src={AVATARS[i]}
                alt={q.name}
                width={48}
                height={48}
                style={{
                  borderRadius: "50%",
                  objectFit: "cover",
                  objectPosition: "center 15%",
                  border: "1px solid var(--line)",
                  flexShrink: 0,
                  display: "block",
                }}
              />
              <div className="flex flex-col" style={{ gap: 2 }}>
                <span style={{ fontWeight: 700, fontSize: 15 }}>{q.name}</span>
                <span style={{ fontSize: "13px", color: "var(--muted)", fontWeight: 500 }}>{q.org}</span>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-5">
        <div className="flex items-center" style={{ gap: 10 }}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goSlide(i)}
              aria-label={`Show testimonial ${i + 1}`}
              style={{
                width: i === slide ? 28 : 7,
                height: 7,
                borderRadius: 99,
                background: i === slide ? "var(--accent)" : "var(--line)",
                border: "none",
                padding: 0,
                cursor: "pointer",
                transition: "width 0.45s cubic-bezier(.2,.8,.2,1), background 0.45s ease",
              }}
            />
          ))}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {(["←", "→"] as const).map((arrow, dir) => (
            <button
              key={arrow}
              onClick={() => goSlide(slide + (dir === 0 ? -1 : 1))}
              aria-label={dir === 0 ? "Previous" : "Next"}
              style={{
                width: 44, height: 44, borderRadius: "50%",
                border: "1px solid var(--line)",
                background: "transparent", color: "var(--text)",
                cursor: "pointer", fontSize: 16,
                display: "grid", placeItems: "center",
                transition: "border-color 0.2s ease, color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--accent)";
                (e.currentTarget as HTMLButtonElement).style.color = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--line)";
                (e.currentTarget as HTMLButtonElement).style.color = "var(--text)";
              }}
            >
              {arrow}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
