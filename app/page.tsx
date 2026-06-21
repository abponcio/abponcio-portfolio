"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Nav } from "@/components/Nav";
import { InfoBar } from "@/components/InfoBar";
import { HeroPortrait } from "@/components/HeroPortrait";
import { Testimonials } from "@/components/Testimonials";
import {
  siteCopy,
  caseStudies,
  caseStudyDetails,
  principles,
  timeline,
  builds,
  stack,
  type CaseStudyDetail,
} from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroContentRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const mouseTarget = useRef({ x: 0, y: 0 });
  const mouseCurrent = useRef({ x: 0, y: 0 });
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

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    let rafId: number | null = null;

    const tick = () => {
      const cur = mouseCurrent.current;
      const tgt = mouseTarget.current;
      cur.x = lerp(cur.x, tgt.x, 0.07);
      cur.y = lerp(cur.y, tgt.y, 0.07);

      if (rightPanelRef.current) {
        rightPanelRef.current.style.transform = `translate(${cur.x * 22}px, ${cur.y * 12}px)`;
      }
      if (heroContentRef.current) {
        heroContentRef.current.style.transform = `translate(${-cur.x * 8}px, ${-cur.y * 5}px)`;
      }

      const settled =
        Math.abs(cur.x - tgt.x) < 0.0002 &&
        Math.abs(cur.y - tgt.y) < 0.0002;

      rafId = settled ? null : requestAnimationFrame(tick);
    };

    const startTick = () => {
      if (rafId === null) rafId = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      mouseTarget.current = {
        x: (e.clientX - rect.left) / rect.width - 0.5,
        y: (e.clientY - rect.top) / rect.height - 0.5,
      };
      startTick();
    };
    const onLeave = () => {
      mouseTarget.current = { x: 0, y: 0 };
      startTick();
    };

    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseleave", onLeave);

    return () => {
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <Nav />

      <main>
        {/* ── Hero ──────────────────────────────────────────── */}
        <header
          ref={heroRef}
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
                className="hero-eyebrow inline-flex flex-wrap items-center font-display font-bold uppercase text-muted"
                style={{
                  gap: "6px 10px",
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
                {siteCopy.hero.roleEyebrow.before}
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
                  className="work-item-num font-display font-bold text-accent min-w-[2ch]"
                  style={{
                    fontSize: "clamp(13px, 1.3vw, 15px)",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {item.num}
                </span>
                <span
                  className="work-item-title font-display font-bold"
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
            <div style={{ padding: "clamp(24px,3vw,36px) clamp(8px,1.5vw,20px) 0" }}>
              <a
                href={siteCopy.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-ghost"
              >
                Learn more on LinkedIn <span aria-hidden="true">↗</span>
              </a>
            </div>
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
            <div style={{ paddingTop: "clamp(24px,3vw,36px)" }}>
              <a
                href={siteCopy.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-ghost"
              >
                Learn more on LinkedIn <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>

        {/* ── Stack ─────────────────────────────────────────── */}
        <section
          className="flex flex-col border-t"
          style={{
            padding: "clamp(56px, 9vw, 148px) clamp(20px, 5vw, 72px)",
            gap: "clamp(28px, 3.4vw, 48px)",
            borderColor: "var(--line)",
          }}
        >
          <div className="flex flex-col" style={{ gap: "clamp(20px, 2.4vw, 28px)" }}>
            <div className="flex flex-wrap items-center" style={{ gap: 14 }}>
              <span
                className="font-display font-bold uppercase text-muted"
                style={{ fontSize: 13, letterSpacing: "0.22em", width: 120, flex: "none" }}
              >
                {siteCopy.life.buildsLabel}
              </span>
              <div className="flex flex-wrap" style={{ gap: 10 }}>
                {builds.map((b) => (
                  <span key={b} className="tag-pill tag-pill-filled">{b}</span>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap items-center" style={{ gap: 14 }}>
              <span
                className="font-display font-bold uppercase text-muted"
                style={{ fontSize: 13, letterSpacing: "0.22em", width: 120, flex: "none" }}
              >
                {siteCopy.life.stackLabel}
              </span>
              <div className="flex" style={{ gap: 10, overflowX: "auto", scrollbarWidth: "none" }}>
                {stack.map((s) => (
                  <span key={s} className="tag-pill" style={{ flexShrink: 0 }}>{s}</span>
                ))}
              </div>
            </div>
          </div>
          <div>
            <a
              href={siteCopy.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-ghost"
            >
              Learn more on LinkedIn <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>

        {/* ── Life outside the build ────────────────────────── */}
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

          {/* Bento grid */}
          <div
            className="bento-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridTemplateRows: "repeat(2, minmax(168px, 1fr)) minmax(150px, auto)", gap: "clamp(12px, 1.4vw, 18px)" }}
          >
            {/* Travel — large 2×2 */}
            <div className="bento-tile" style={{ gridColumn: "1/3", gridRow: "1/3", background: "var(--card)", border: "1px solid var(--line)", borderRadius: "clamp(18px,1.8vw,26px)", padding: "clamp(28px,3vw,44px)", display: "flex", flexDirection: "column", gap: 18 }}>
              <span style={{ display: "inline-flex", width: 54, height: 54, flex: "none", alignItems: "center", justifyContent: "center", borderRadius: "50%", background: "color-mix(in srgb,var(--accent) 16%,transparent)", color: "var(--accent)" }}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3.5 14.5l17-6.2c.9-.3 1.6.7 1 1.4L12 20l-1.6-4.4L3.5 14.5z"/><path d="M10.4 15.6l3.2-3.2"/></svg>
              </span>
              <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 12 }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 10, flexWrap: "wrap", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(26px,2.8vw,38px)", letterSpacing: "-.025em" }}>
                  Travel{" "}
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase" as const, color: "var(--accent)", border: "1px solid color-mix(in srgb,var(--accent) 40%,transparent)", borderRadius: 99, padding: "4px 10px" }}>On the road now</span>
                </span>
                <p style={{ fontSize: "clamp(15px,1.5vw,17px)", lineHeight: 1.55, color: "var(--muted)", fontWeight: 500, maxWidth: "36ch" }}>
                  Chasing the seven wonders of the world together. Dubai makes a pretty good base camp — if there&apos;s a new corner of the map, we&apos;re already booking it.
                </p>
              </div>
            </div>

            {/* Tennis — wide top-right */}
            <div className="bento-tile" style={{ gridColumn: "3/5", gridRow: "1/2", background: "var(--bg)", border: "1px solid var(--line)", borderRadius: "clamp(18px,1.8vw,26px)", padding: "clamp(24px,2.6vw,34px)", display: "flex", alignItems: "flex-start", gap: 18 }}>
              <span style={{ color: "var(--accent)", flex: "none", marginTop: 2 }}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <ellipse cx="12" cy="8" rx="5" ry="6" />
                  <line x1="9.5" y1="3" x2="9.5" y2="13" />
                  <line x1="12" y1="2.5" x2="12" y2="13.5" />
                  <line x1="14.5" y1="3" x2="14.5" y2="13" />
                  <line x1="7.5" y1="5.5" x2="16.5" y2="5.5" />
                  <line x1="7" y1="8" x2="17" y2="8" />
                  <line x1="7.5" y1="10.5" x2="16.5" y2="10.5" />
                  <line x1="12" y1="14" x2="12" y2="21.5" />
                </svg>
              </span>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(19px,1.9vw,24px)", letterSpacing: "-.01em" }}>Tennis</span>
                <p style={{ fontSize: "clamp(14px,1.4vw,15.5px)", lineHeight: 1.5, color: "var(--muted)", fontWeight: 500, maxWidth: "42ch" }}>
                  My wife and I play together. It&apos;s part of our routine, our exercise, and honestly part of how we travel. If there&apos;s a court, we&apos;ll find it.
                </p>
              </div>
            </div>

            {/* Food */}
            <div className="bento-tile" style={{ gridColumn: "3/4", gridRow: "2/3", background: "var(--bg)", border: "1px solid var(--line)", borderRadius: "clamp(18px,1.8vw,26px)", padding: "clamp(24px,2.6vw,32px)", display: "flex", flexDirection: "column", gap: 12 }}>
              <span style={{ color: "var(--accent)" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3.5 11h17a8.5 8.5 0 0 1-8.5 8 8.5 8.5 0 0 1-8.5-8z"/><path d="M12 11V7"/><path d="M12 5.2c1.1 0 1.1-1.7 0-1.7"/><path d="M19 21H5"/></svg>
              </span>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(18px,1.8vw,22px)", letterSpacing: "-.01em", marginTop: "auto" }}>Food</span>
              <p style={{ fontSize: "clamp(13.5px,1.3vw,15px)", lineHeight: 1.45, color: "var(--muted)", fontWeight: 500 }}>
                A good shawarma or a great bowl of ramen, always worth the detour.
              </p>
            </div>

            {/* BeeLover */}
            <div className="bento-tile" style={{ gridColumn: "4/5", gridRow: "2/3", background: "var(--bg)", border: "1px solid var(--line)", borderRadius: "clamp(18px,1.8vw,26px)", padding: "clamp(24px,2.6vw,32px)", display: "flex", flexDirection: "column", gap: 12 }}>
              <span style={{ color: "var(--muted)" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3c3 3.6 5 6.2 5 9a5 5 0 0 1-10 0c0-2.8 2-5.4 5-9z"/><path d="M9.5 13.5h5"/><path d="M9.8 16.2h4.4"/></svg>
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8, flexWrap: "wrap", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(18px,1.8vw,22px)", letterSpacing: "-.01em", marginTop: "auto" }}>
                BeeLover{" "}
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase" as const, color: "var(--muted)", border: "1px solid var(--line)", borderRadius: 99, padding: "3px 8px" }}>Back in PH</span>
              </span>
              <p style={{ fontSize: "clamp(13.5px,1.3vw,15px)", lineHeight: 1.45, color: "var(--muted)", fontWeight: 500 }}>
                A honey side-venture my wife and I ran back home in the Philippines.
              </p>
            </div>

            {/* Plants — full-width bottom */}
            <div className="bento-tile" style={{ gridColumn: "1/5", gridRow: "3/4", background: "var(--bg)", border: "1px solid var(--line)", borderRadius: "clamp(18px,1.8vw,26px)", padding: "clamp(24px,2.6vw,36px)", display: "flex", alignItems: "center", gap: "clamp(18px,2.4vw,30px)" }}>
              <span style={{ display: "inline-flex", width: 50, height: 50, flex: "none", alignItems: "center", justifyContent: "center", borderRadius: "50%", background: "color-mix(in srgb,var(--muted) 12%,transparent)", color: "var(--muted)" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 21v-8"/><path d="M12 13c0-4 3-7 8-7 0 4-3 7-8 7z"/><path d="M12 15c0-3-2.5-5.5-7-5.5 0 3 2.5 5.5 7 5.5z"/></svg>
              </span>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 10, flexWrap: "wrap", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(18px,1.9vw,24px)", letterSpacing: "-.01em" }}>
                  Selling plants{" "}
                  <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase" as const, color: "var(--muted)", border: "1px solid var(--line)", borderRadius: 99, padding: "3px 9px" }}>Back in PH</span>
                </span>
                <p style={{ fontSize: "clamp(14px,1.4vw,15.5px)", lineHeight: 1.5, color: "var(--muted)", fontWeight: 500, maxWidth: "62ch" }}>
                  Repotting and reselling them on the side, back in the Philippines — my first real instinct to grow something from scratch and ship it. One of those sleepless-night experiments worth every minute.
                </p>
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
          className="modal-outer"
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
            className="modal-inner"
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

            {/* Company badge */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 12, letterSpacing: ".02em", color: "var(--accent)", background: "color-mix(in srgb,var(--accent) 14%,transparent)", borderRadius: 99, padding: "5px 12px" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", display: "inline-block" }} />
                Hello Chef
              </span>
              <span style={{ fontSize: "12.5px", color: "var(--muted)", fontWeight: 500 }}>Dubai, UAE</span>
            </div>

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
              className="modal-impact"
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
