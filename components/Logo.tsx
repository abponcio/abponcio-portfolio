"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { gsap } from "gsap";

interface LogoProps {
  className?: string;
  size?: number;
  animate?: boolean;
  /** Glyph only — sits on amber circle in nav */
  onAccent?: boolean;
}

export function Logo({
  className = "",
  size = 40,
  animate = true,
  onAccent = false,
}: LogoProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  const bgFill = isLight ? "#F0A500" : "#111111";
  const glyphColor = onAccent ? "#111111" : isLight ? "#111111" : "#F0A500";
  const label = "abp";
  const fontSize = onAccent ? size * 0.375 : size * 0.36;
  const letterSpacing = "-0.06em";

  useEffect(() => {
    if (!animate || !ref.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    gsap.from(ref.current, {
      opacity: 0,
      scale: 0.88,
      duration: 0.55,
      ease: "power3.out",
      delay: 0.15,
    });
  }, [animate]);

  const glyph = (
    <span
      ref={ref}
      className={`font-display font-bold leading-none select-none ${className}`}
      style={{
        fontSize,
        letterSpacing,
        color: glyphColor,
      }}
      aria-hidden={onAccent}
    >
      {label}
    </span>
  );

  if (onAccent) {
    return glyph;
  }

  return (
    <span
      className={`inline-grid place-items-center rounded-full shrink-0 ${className}`}
      style={{
        width: size,
        height: size,
        background: bgFill,
      }}
      aria-label="ABP — Anthony Bryle Poncio"
    >
      {glyph}
    </span>
  );
}

export function LogoStatic({ size = 40 }: { size?: number }) {
  return <Logo size={size} animate={false} />;
}
