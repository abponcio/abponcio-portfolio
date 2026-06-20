import Image from "next/image";

export function HeroPortrait() {
  return (
    <div
      className="hero-portrait relative w-full h-full min-h-[60vh] md:min-h-0 overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Amber glow behind portrait */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(58% 52% at 54% 40%, rgba(240,165,0,0.18), rgba(240,165,0,0) 68%)",
          zIndex: 1,
        }}
      />

      {/* Seamless blend into left column */}
      <div
        className="pointer-events-none absolute left-0 top-0 bottom-0 hidden md:block"
        aria-hidden="true"
        style={{
          width: 120,
          background: "linear-gradient(to right, var(--bg), transparent)",
          zIndex: 3,
        }}
      />

      {/* Bottom fade */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0"
        aria-hidden="true"
        style={{
          height: "28%",
          background: "linear-gradient(to bottom, transparent, var(--bg))",
          zIndex: 3,
        }}
      />

      <Image
        src="/images/anthony-hero.png"
        alt="Anthony Bryle Poncio"
        fill
        priority
        sizes="(max-width: 768px) 100vw, 45vw"
        style={{
          objectFit: "contain",
          objectPosition: "bottom center",
          zIndex: 2,
          filter: "drop-shadow(0 26px 50px rgba(0,0,0,0.4))",
        }}
      />
    </div>
  );
}
