import { useEffect, useRef, useState } from "react";

const useInView = (threshold = 0.12) => {
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

const structureItems = [
  { label: "Duration", value: "6 Months" },
  { label: "Target Group", value: "Classes 6–12" },
  { label: "Methodology", value: "Build a working startup alongside learning business concepts (NEP Section 4.4)" },
  { label: "Framework", value: "Integrates MIT Sloan School of Management principles with FutureX's experiential learning" },
];

export default function OlympiadSection1s() {
  const [leftRef, leftInView] = useInView(0.1);
  const [rightRef, rightInView] = useInView(0.1);

  return (
    <section style={{
      background: "#061510",
      padding: "88px 24px", position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(circle at 80% 30%,rgba(0,200,150,.12),transparent 45%)",
      }} />

      <div className="max-w-7xl mx-auto" style={{ position: "relative", zIndex: 2 }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left image */}
          <div
            ref={leftRef}
            className="flex justify-center"
            style={{
              opacity: leftInView ? 1 : 0,
              transform: leftInView ? "translateX(0)" : "translateX(-40px)",
              transition: "opacity .8s ease, transform .8s ease",
              position: "relative",
            }}
          >
            <div style={{
              position: "absolute", inset: "5%",
              background: "radial-gradient(circle,rgba(0,200,150,.15),transparent 65%)",
              filter: "blur(20px)", borderRadius: "50%",
            }} />
            <img
              src="/images/2.svg" alt="World-class learning"
              style={{ position: "relative", zIndex: 1, width: "85%", maxWidth: 420, filter: "drop-shadow(0 20px 48px rgba(0,0,0,.4))" }}
            />
          </div>

          {/* Right text */}
          <div
            ref={rightRef}
            style={{
              opacity: rightInView ? 1 : 0,
              transform: rightInView ? "translateX(0)" : "translateX(40px)",
              transition: "opacity .8s ease .15s, transform .8s ease .15s",
            }}
          >
            <div style={{
              fontFamily: "'DM Sans',sans-serif", fontSize: ".72rem", fontWeight: 700,
              letterSpacing: "2.5px", textTransform: "uppercase", color: "#00c896", marginBottom: 14,
            }}>Ivy League Standards · Delivered Locally</div>
            <h2 style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 900,
              color: "#fff", lineHeight: 1.15, marginBottom: 16,
            }}>
              World-Class Learning, <br />
              <span style={{ color: "#00c896" }}>Delivered Locally</span>
            </h2>
            <p style={{
              fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.55)",
              fontSize: ".95rem", lineHeight: 1.85, marginBottom: 28,
            }}>
              Students don't just learn about business — they build one. Each participant learns business,
              tech and communication by building a live venture, managing finance, operations, marketing, and sales.
            </p>

            <div style={{
              background: "rgba(255,255,255,.05)", border: "1px solid rgba(0,200,150,.18)",
              borderRadius: 16, padding: "22px 20px",
            }}>
              <div style={{
                fontFamily: "'DM Sans',sans-serif", fontWeight: 700, color: "#00c896",
                fontSize: ".8rem", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 18,
              }}>Program Structure</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {structureItems.map(({ label, value }) => (
                  <div key={label} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <span style={{
                      width: 6, height: 6, borderRadius: "50%", background: "#00c896",
                      flexShrink: 0, marginTop: 7,
                    }} />
                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".88rem", color: "rgba(255,255,255,.75)", lineHeight: 1.55 }}>
                      <strong style={{ color: "#fff" }}>{label}:</strong> {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
