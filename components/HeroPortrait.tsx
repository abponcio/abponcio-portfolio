import Image from "next/image";

export function HeroPortrait() {
  return (
    <div
      className="hero-portrait relative flex items-end justify-center w-full h-full min-h-[50vh] md:min-h-0 overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Amber glow behind portrait */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(58% 52% at 54% 40%, rgba(240,165,0,0.18), rgba(240,165,0,0) 68%)",
        }}
      />

      {/* Seamless blend into left column — no hard border */}
      <div
        className="pointer-events-none absolute left-0 top-0 bottom-0 hidden md:block"
        aria-hidden="true"
        style={{
          width: 120,
          background: "linear-gradient(to right, var(--bg), transparent)",
          zIndex: 2,
        }}
      />

      <Image
        src="/images/anthony-hero.png"
        alt="Anthony Bryle Poncio"
        width={716}
        height={716}
        priority
        sizes="(max-width: 768px) 100vw, 45vw"
        className="relative z-[1] w-auto max-w-none h-full max-h-[100vh] object-contain object-bottom"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, #000 0%, #000 76%, transparent 99%)",
          maskImage:
            "linear-gradient(to bottom, #000 0%, #000 76%, transparent 99%)",
          filter: "drop-shadow(0 26px 50px rgba(0,0,0,0.4))",
        }}
      />
    </div>
  );
}
