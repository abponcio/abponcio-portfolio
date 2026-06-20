export function HeroPortrait() {
  return (
    <div
      className="hero-portrait"
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        background: "var(--bg)",
      }}
    >
      {/* Amber glow */}
      <div
        className="pointer-events-none"
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(58% 52% at 54% 40%, rgba(240,165,0,0.18), rgba(240,165,0,0) 68%)",
        }}
      />

      {/* Left blend — desktop only */}
      <div
        className="pointer-events-none hidden md:block"
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 120,
          background: "linear-gradient(to right, var(--bg), transparent)",
        }}
      />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="hero-img"
        src="/images/anthony-hero.png"
        alt="Anthony Bryle Poncio"
        style={{
          position: "relative",
          height: "100%",
          maxHeight: "100vh",
          width: "auto",
          maxWidth: "none",
          objectFit: "contain",
          objectPosition: "bottom",
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
