"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Nav } from "@/components/Nav";
import { InfoBar } from "@/components/InfoBar";
import { HeroPortrait } from "@/components/HeroPortrait";
import { Testimonials } from "@/components/Testimonials";
import { LifeIcon } from "@/components/LifeIcon";
import {
  siteCopy,
  caseStudies,
  caseStudyDetails,
  principles,
  beyondTheJob,
  timeline,
  builds,
  stack,
  type CaseStudyDetail,
} from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroContentRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const [openWork, setOpenWork] = useState<number | null>(null);
  const active: CaseStudyDetail | null = openWork !== null ? caseStudyDetails[openWork] : null;

  const closeWork = useCallback(() => setOpenWork(null), []);

  useEffect(() => {
    if (openWork === null) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeWork(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openWork, closeWork]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      gsap.from(heroContentRef.current, {
        y: 32,
        opacity: 0,
        duration: prefersReducedMotion ? 0 : 1,
        ease: "power4.out",
        delay: prefersReducedMotion ? 0 : 0.45,
      });

      gsap.from(rightPanelRef.current, {
        x: 30,
        opacity: 0,
        duration: prefersReducedMotion ? 0 : 1,
        ease: "power3.out",
        delay: prefersReducedMotion ? 0 : 0.4,
      });

      const sections = [
        { trigger: ".work-section", sel: ".work-item", y: 20 },
        { trigger: ".philosophy-section", sel: ".philosophy-item", x: -12, start: "top 80%" },
        { trigger: ".about-section", sel: ".timeline-item", y: 16, start: "top 80%" },
        { trigger: ".beyond-section", sel: ".life-card", y: 12 },
        { trigger: ".testimonials-section", sel: ".testimonial-item", y: 16 },
      ];

      sections.forEach(({ trigger, sel, start = "top 85%", ...vars }) => {
        ScrollTrigger.create({
          trigger,
          start,
          onEnter: () => {
            gsap.from(sel, {
              opacity: 0,
              duration: prefersReducedMotion ? 0 : 0.45,
              ease: "power3.out",
              stagger: prefersReducedMotion ? 0 : 0.07,
              clearProps: "transform,opacity",
              ...vars,
            });
          },
          once: true,
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Nav />

      <main>
        {/* ── Hero ──────────────────────────────────────────── */}
        <header
          id="top"
          className="hero-grid grid min-h-screen border-b"
          style={{
            gridTemplateColumns: "minmax(0, 55fr) minmax(0, 45fr)",
            borderColor: "var(--line)",
          }}
        >
          <div
            className="hero-left min-w-0 flex flex-col justify-between"
            style={{
              padding: "clamp(36px, 6vw, 84px)",
              gap: 48,
            }}
          >
            <div
              ref={heroContentRef}
              className="hero-content flex flex-col"
              style={{
                gap: "clamp(22px, 3vw, 40px)",
                marginTop: "auto",
              }}
            >
              <span
                className="hero-eyebrow inline-flex items-center font-display font-bold uppercase text-muted"
                style={{
                  gap: 10,
                  fontSize: "clamp(12px, 1.3vw, 15px)",
                  letterSpacing: "0.22em",
                }}
              >
                <span
                  className="shrink-0"
                  style={{
                    width: 24,
                    height: 1.5,
                    background: "var(--accent)",
                  }}
                  aria-hidden="true"
                />
                {siteCopy.hero.roleEyebrow.before}{" "}
                <span style={{ color: "var(--accent)" }}>
                  {siteCopy.hero.roleEyebrow.accent}
                </span>
              </span>

              <h1
                className="font-display font-semibold uppercase"
                style={{
                  lineHeight: 0.92,
                  letterSpacing: "-0.045em",
                  fontSize: "clamp(52px, 9.5vw, 146px)",
                }}
              >
                <span className="block">Anthony</span>
                <span className="block text-accent">Bryle</span>
                <span className="block">Poncio</span>
              </h1>

              <p
                style={{
                  fontSize: "clamp(18px, 2vw, 27px)",
                  lineHeight: 1.32,
                  maxWidth: "28ch",
                  fontWeight: 500,
                  color: "var(--text)",
                }}
              >
                {siteCopy.hero.tagline}{" "}
                <span style={{ color: "var(--accent)" }}>
                  {siteCopy.hero.taglineAccent}
                </span>
              </p>
            </div>

            <InfoBar />
          </div>

          <div
            ref={rightPanelRef}
            className="hero-img-wrap min-w-0"
            style={{ background: "var(--bg)" }}
          >
            <HeroPortrait />
          </div>
        </header>

        {/* ── Work ──────────────────────────────────────────── */}
        <section
          id="work"
          className="work-section"
          style={{
            padding: "clamp(56px, 8vw, 128px) clamp(20px, 5vw, 72px)",
          }}
        >
          <div className="flex flex-wrap items-baseline justify-between gap-5 mb-[clamp(28px,4vw,56px)]">
            <h2
              className="uppercase tracking-[0.28em] text-muted font-display font-bold"
              style={{ fontSize: "clamp(13px, 1.4vw, 15px)" }}
            >
              {siteCopy.work.eyebrow}
            </h2>
            <span style={{ fontSize: 13, color: "var(--muted)", fontWeight: 500 }}>
              {siteCopy.work.subtitle}
            </span>
          </div>

          <div style={{ borderTop: "1px solid var(--line)" }}>
            {caseStudies.map((item, i) => (
              <button
                key={item.slug}
                onClick={() => setOpenWork(i)}
                className="work-item w-full text-left font-[inherit]"
                style={{ background: "transparent", cursor: "pointer", color: "var(--text)" }}
              >
                <span
                  className="font-display font-bold text-accent min-w-[2ch]"
                  style={{
                    fontSize: "clamp(13px, 1.3vw, 15px)",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {item.num}
                </span>
                <span
                  className="font-display font-bold"
                  style={{
                    fontSize: "clamp(24px, 4.2vw, 58px)",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {item.title}
                </span>
                <span
                  className="work-item-result text-right max-w-[24ch]"
                  style={{
                    fontSize: "clamp(13px, 1.4vw, 17px)",
                    fontWeight: 600,
                    color: "var(--muted)",
                  }}
                >
                  {item.result}
                </span>
                <span
                  className="work-item-arrow font-display font-bold text-accent justify-self-end"
                  style={{ fontSize: 22 }}
                  aria-hidden="true"
                >
                  ↗
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* ── Philosophy ────────────────────────────────────── */}
        <section
          id="philosophy"
          className="philosophy-section grid items-center border-t border-b"
          style={{
            padding: "clamp(56px, 9vw, 148px) clamp(20px, 5vw, 72px)",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: "clamp(40px, 6vw, 96px)",
            borderColor: "var(--line)",
          }}
        >
          <h2
            className="font-display font-bold max-md:col-span-full"
            style={{
              fontSize: "clamp(34px, 5.2vw, 80px)",
              lineHeight: 0.98,
              letterSpacing: "-0.03em",
            }}
          >
            {siteCopy.philosophy.headline.before}{" "}
            <span style={{ color: "var(--accent)" }}>
              {siteCopy.philosophy.headline.accent}
            </span>{" "}
            {siteCopy.philosophy.headline.after}
          </h2>

          <div
            className="flex flex-col max-md:col-span-full"
            style={{ gap: "clamp(20px, 2.6vw, 38px)" }}
          >
            {principles.map((p) => (
              <div
                key={p.head}
                className="philosophy-item flex flex-col"
                style={{
                  borderLeft: "3px solid var(--accent)",
                  padding: "4px 0 4px 22px",
                  gap: 7,
                }}
              >
                <h3
                  className="font-display font-bold"
                  style={{
                    fontSize: "clamp(17px, 1.7vw, 22px)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {p.head}
                </h3>
                <p
                  style={{
                    fontSize: "clamp(14px, 1.4vw, 16px)",
                    lineHeight: 1.5,
                    color: "var(--muted)",
                    fontWeight: 500,
                  }}
                >
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── About / Timeline ────────────────────────────── */}
        <section
          id="about"
          className="about-section grid border-t"
          style={{
            padding: "clamp(56px, 9vw, 148px) clamp(20px, 5vw, 72px)",
            gridTemplateColumns: "1fr 1.05fr",
            gap: "clamp(40px, 6vw, 96px)",
            alignItems: "start",
            borderColor: "var(--line)",
          }}
        >
          <div
            className="flex flex-col md:sticky md:top-24"
            style={{ gap: "clamp(18px, 2.4vw, 30px)" }}
          >
            <span
              className="uppercase tracking-[0.28em] text-muted font-display font-bold"
              style={{ fontSize: "clamp(13px, 1.4vw, 15px)" }}
            >
              {siteCopy.about.eyebrow}
            </span>
            <h2
              className="font-display font-semibold"
              style={{
                fontSize: "clamp(34px, 5vw, 72px)",
                lineHeight: 0.98,
                letterSpacing: "-0.03em",
              }}
            >
              {siteCopy.about.headline.before}{" "}
              <span style={{ color: "var(--accent)" }}>
                {siteCopy.about.headline.accent}
              </span>
            </h2>
            <p
              style={{
                fontSize: "clamp(15px, 1.5vw, 18px)",
                lineHeight: 1.55,
                color: "var(--muted)",
                fontWeight: 500,
                maxWidth: "34ch",
              }}
            >
              {siteCopy.about.bio}
            </p>
          </div>

          <div style={{ borderTop: "1px solid var(--line)" }}>
            {timeline.map((t) => (
              <div
                key={`${t.year}-${t.role}`}
                className="timeline-item grid items-baseline"
                style={{
                  gridTemplateColumns: "auto 1fr",
                  gap: "clamp(16px, 3vw, 40px)",
                  padding: "clamp(16px, 2vw, 24px) 4px",
                  borderBottom: "1px solid var(--line)",
                }}
              >
                <span
                  className="font-display font-bold text-accent"
                  style={{
                    fontSize: "clamp(15px, 1.6vw, 19px)",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {t.year}
                </span>
                <div className="flex flex-col" style={{ gap: 3 }}>
                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: "clamp(15px, 1.6vw, 19px)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {t.role}
                  </span>
                  <span
                    style={{
                      fontSize: "13.5px",
                      color: "var(--muted)",
                      fontWeight: 500,
                    }}
                  >
                    {t.org}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Life outside + stack ────────────────────────── */}
        <section
          id="beyond"
          className="beyond-section flex flex-col border-t"
          style={{
            padding: "clamp(56px, 9vw, 148px) clamp(20px, 5vw, 72px)",
            gap: "clamp(40px, 5vw, 72px)",
            borderColor: "var(--line)",
          }}
        >
          <div className="flex flex-wrap items-baseline justify-between gap-5">
            <h2
              className="font-display font-semibold"
              style={{
                fontSize: "clamp(30px, 4.6vw, 64px)",
                lineHeight: 1,
                letterSpacing: "-0.03em",
              }}
            >
              {siteCopy.life.headline.before}{" "}
              <span style={{ color: "var(--accent)" }}>
                {siteCopy.life.headline.accent}
              </span>
            </h2>
            <p
              style={{
                fontSize: "13.5px",
                color: "var(--muted)",
                fontWeight: 500,
                maxWidth: "30ch",
              }}
            >
              {siteCopy.life.subtitle}
            </p>
          </div>

          <div className="life-grid">
            {beyondTheJob.map((item) => (
              <div key={item.label} className="life-card">
                <span className="text-accent">
                  <LifeIcon name={item.icon} />
                </span>
                <span
                  className="font-display font-bold"
                  style={{
                    fontSize: "clamp(19px, 1.9vw, 24px)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {item.label}
                </span>
                <p
                  style={{
                    fontSize: "clamp(14px, 1.4vw, 15.5px)",
                    lineHeight: 1.5,
                    color: "var(--muted)",
                    fontWeight: 500,
                  }}
                >
                  {item.detail}
                </p>
              </div>
            ))}
          </div>

          <div
            className="flex flex-col border-t pt-[clamp(8px,2vw,20px)]"
            style={{
              gap: "clamp(20px, 2.4vw, 28px)",
              borderColor: "var(--line)",
            }}
          >
            <div className="tag-row">
              <span className="tag-row-label">{siteCopy.life.buildsLabel}</span>
              <div className="flex flex-wrap gap-2.5">
                {builds.map((b) => (
                  <span key={b} className="tag-pill tag-pill-filled">
                    {b}
                  </span>
                ))}
              </div>
            </div>
            <div className="tag-row">
              <span className="tag-row-label">{siteCopy.life.stackLabel}</span>
              <div className="flex gap-2.5 overflow-x-auto">
                {stack.map((s) => (
                  <span key={s} className="tag-pill">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Testimonials />

        {/* ── Contact ───────────────────────────────────────── */}
        <section
          id="contact"
          className="flex flex-col border-t"
          style={{
            padding: "clamp(72px, 11vw, 180px) clamp(20px, 5vw, 72px)",
            gap: "clamp(28px, 4vw, 48px)",
            borderColor: "var(--line)",
          }}
        >
          <h2
            className="font-display font-semibold text-balance"
            style={{
              fontSize: "clamp(40px, 8vw, 120px)",
              lineHeight: 0.92,
              letterSpacing: "-0.04em",
              maxWidth: "14ch",
            }}
          >
            {siteCopy.contact.headline.before}{" "}
            <span style={{ color: "var(--accent)" }}>
              {siteCopy.contact.headline.accent}
            </span>
          </h2>
          <div className="flex flex-wrap gap-3.5">
            <a href={siteCopy.contact.email} className="contact-cta-primary">
              {siteCopy.contact.cta} <span aria-hidden="true">→</span>
            </a>
            <a
              href={siteCopy.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-cta-secondary"
            >
              LinkedIn
            </a>
          </div>
        </section>
      </main>

      <footer>
        <div
          className="flex flex-wrap items-center justify-between gap-5"
          style={{
            padding: "clamp(24px, 3vw, 40px) clamp(20px, 5vw, 72px)",
            borderTop: "1px solid var(--line)",
            fontSize: 13,
            fontWeight: 500,
          }}
        >
          <span style={{ color: "var(--muted)" }}>
            {siteCopy.footer.copyright}
          </span>
          <span style={{ color: "var(--muted)" }}>
            Dubai, UAE · Heads down at{" "}
            <span style={{ color: "var(--text)" }}>Hello Chef</span>
          </span>
        </div>
      </footer>

      {/* ── Case Study Modal ───────────────────────────────── */}
      {active && (
        <div
          onClick={closeWork}
          style={{
            position: "fixed", inset: 0, zIndex: 100,
            background: "color-mix(in srgb, #000 64%, transparent)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            display: "flex", alignItems: "flex-start", justifyContent: "center",
            padding: "clamp(16px, 5vh, 64px) clamp(16px, 5vw, 48px)",
            overflowY: "auto",
            animation: "ovIn 0.25s ease both",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative", width: "100%", maxWidth: 860,
              background: "var(--bg)", border: "1px solid var(--line)",
              borderRadius: 18, padding: "clamp(28px, 4vw, 64px)",
              boxShadow: "0 40px 120px rgba(0,0,0,0.5)",
              animation: "wkIn 0.4s cubic-bezier(.2,.8,.2,1) both",
            }}
          >
            <button
              onClick={closeWork}
              aria-label="Close"
              style={{
                position: "absolute",
                top: "clamp(18px, 2.4vw, 28px)", right: "clamp(18px, 2.4vw, 28px)",
                width: 42, height: 42, borderRadius: "50%",
                border: "1px solid var(--line)", background: "transparent",
                color: "var(--text)", cursor: "pointer", fontSize: 20,
                display: "grid", placeItems: "center",
              }}
            >
              ✕
            </button>

            <span
              className="inline-flex items-center gap-2.5 font-display font-bold uppercase text-muted"
              style={{ fontSize: 13, letterSpacing: "0.2em" }}
            >
              <span style={{ fontVariantNumeric: "tabular-nums", color: "var(--accent)" }}>{active.num}</span>
              <span style={{ width: 22, height: 1.5, background: "var(--line)" }} />
              {active.tag}
            </span>

            <h3
              className="font-display font-bold"
              style={{
                fontSize: "clamp(30px, 5vw, 56px)", lineHeight: 1,
                letterSpacing: "-0.03em", marginTop: 14,
              }}
            >
              {active.title}
            </h3>
            <p
              style={{
                fontSize: "clamp(17px, 1.9vw, 22px)", lineHeight: 1.4,
                fontWeight: 500, marginTop: 18, maxWidth: "42ch",
              }}
            >
              {active.summary}
            </p>

            {/* Impact stats */}
            <div
              style={{
                display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
                gap: 1, background: "var(--line)",
                border: "1px solid var(--line)", borderRadius: 12,
                overflow: "hidden", marginTop: "clamp(28px, 3.4vw, 40px)",
              }}
            >
              {active.impact.map((m) => (
                <div
                  key={m.label}
                  style={{
                    background: "var(--bg)", padding: "clamp(16px, 2vw, 24px)",
                    display: "flex", flexDirection: "column", gap: 5,
                  }}
                >
                  <span
                    className="font-display font-bold text-accent"
                    style={{ fontSize: "clamp(22px, 2.6vw, 32px)", letterSpacing: "-0.02em", lineHeight: 1 }}
                  >
                    {m.stat}
                  </span>
                  <span style={{ fontSize: "12.5px", color: "var(--muted)", fontWeight: 500, lineHeight: 1.3 }}>
                    {m.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Problem + Build */}
            <div style={{ display: "grid", gap: "clamp(22px, 2.6vw, 30px)", marginTop: "clamp(28px, 3.4vw, 40px)" }}>
              {[
                { label: "The problem", text: active.problem },
                { label: "What I built", text: active.build },
              ].map(({ label, text }) => (
                <div key={label} className="flex flex-col" style={{ gap: 8 }}>
                  <span
                    className="font-display font-bold uppercase text-accent"
                    style={{ fontSize: "12.5px", letterSpacing: "0.2em" }}
                  >
                    {label}
                  </span>
                  <p style={{ fontSize: "clamp(15px, 1.6vw, 17px)", lineHeight: 1.6, maxWidth: "62ch" }}>
                    {text}
                  </p>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div
              className="flex flex-wrap gap-2.5"
              style={{
                marginTop: "clamp(26px, 3vw, 36px)",
                paddingTop: "clamp(20px, 2.4vw, 28px)",
                borderTop: "1px solid var(--line)",
              }}
            >
              {active.tags.map((t) => (
                <span
                  key={t}
                  style={{
                    border: "1px solid var(--line)", borderRadius: 99,
                    padding: "7px 14px", fontSize: "12.5px",
                    fontWeight: 600, color: "var(--muted)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
