import { useEffect, useRef, useState } from "react";

const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
};

export default function OlympiadSection1a() {
  const [ref, inView] = useInView(0.1);

  return (
    <section
      style={{
        background: "#061510",
        padding: "72px 24px 64px",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(circle at 50% 60%,rgba(0,200,150,.12),transparent 55%)",
      }} />

      <div
        ref={ref}
        className="max-w-4xl mx-auto"
        style={{
          position: "relative", zIndex: 2,
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(36px)",
          transition: "opacity .8s ease, transform .8s ease",
        }}
      >
        <div style={{
          display: "inline-block",
          background: "rgba(0,200,150,.1)", border: "1px solid rgba(0,200,150,.25)",
          color: "#00c896", padding: "5px 18px", borderRadius: 50,
          fontFamily: "'DM Sans',sans-serif", fontSize: ".72rem",
          fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase",
          marginBottom: 24,
        }}>
          MIT Sloan School of Management Principles
        </div>

        <h2 style={{
          fontFamily: "'Playfair Display',serif",
          fontSize: "clamp(2.6rem,6vw,5rem)",
          fontWeight: 900, lineHeight: 1.05, color: "#fff",
          marginBottom: 20,
        }}>
          INTERNATIONAL <br />
          <span style={{ color: "#00c896" }}>FUTUREX</span>{" "}
          <span style={{ color: "rgba(255,255,255,.88)" }}>FELLOWSHIP</span>
        </h2>

        <p style={{
          fontFamily: "'DM Sans',sans-serif",
          color: "rgba(255,255,255,.5)", fontSize: "1rem", lineHeight: 1.8,
          maxWidth: 560, margin: "0 auto 32px",
        }}>
          A nationally recognised program integrating Ivy League learning standards
          with experiential entrepreneurship — built for Classes 6–12.
        </p>

        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 10 }}>
          {["NEP 2020 Aligned", "38 Institutions", "6,000+ Students", "Prize Pool ₹85,000"].map(t => (
            <span key={t} style={{
              background: "rgba(0,200,150,.1)", border: "1px solid rgba(0,200,150,.25)",
              color: "rgba(255,255,255,.8)", padding: "7px 16px", borderRadius: 50,
              fontFamily: "'DM Sans',sans-serif", fontSize: ".78rem", fontWeight: 600,
            }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Divider line */}
      <div style={{
        position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "80%", maxWidth: 600, height: 1,
        background: "linear-gradient(90deg,transparent,rgba(0,200,150,.25),transparent)",
      }} />
    </section>
  );
}
