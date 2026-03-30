import { useEffect, useRef, useState } from "react";
import handshakeIcon from "../assets/Olympiadimg/join.svg";
import LyfshilpLogo from "../assets/LyfshilpLogo.png";
import agilityLogo from "../assets/Olympiadimg/agility-logo.svg";

const useInView = (threshold = 0.1) => {
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

export default function JoinLearnSection() {
  const [ref, inView] = useInView(0.1);

  return (
    <section style={{
      background: "#061510",
      padding: "72px 24px", position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(circle at 50% 60%,rgba(0,200,150,.1),transparent 50%)",
      }} />
      <div style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: "60%", maxWidth: 500, height: 1,
        background: "linear-gradient(90deg,transparent,rgba(0,200,150,.25),transparent)",
      }} />

      <div
        ref={ref}
        className="max-w-4xl mx-auto"
        style={{
          position: "relative", zIndex: 2,
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(32px)",
          transition: "opacity .8s ease, transform .8s ease",
        }}
      >
        <div style={{
          background: "rgba(255,255,255,.05)", border: "1px solid rgba(0,200,150,.2)",
          borderRadius: 24, padding: "36px 32px",
          display: "flex", flexDirection: "column", gap: 28,
          backdropFilter: "blur(8px)",
        }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

            {/* Left: illustration */}
            <div style={{ display: "flex", justifyContent: "center", position: "relative" }}>
              <div style={{
                position: "absolute", inset: "5%",
                background: "radial-gradient(circle,rgba(0,200,150,.15),transparent 65%)",
                filter: "blur(16px)", borderRadius: "50%",
              }} />
              <img
                src={handshakeIcon} alt="Partnership"
                style={{ position: "relative", zIndex: 1, width: "80%", maxWidth: 280, filter: "drop-shadow(0 12px 32px rgba(0,0,0,.3))" }}
              />
            </div>

            {/* Right: text + logos */}
            <div>
              <div style={{
                fontFamily: "'DM Sans',sans-serif", fontSize: ".72rem", fontWeight: 700,
                letterSpacing: "2.5px", textTransform: "uppercase", color: "#00c896", marginBottom: 14,
              }}>Purpose-Built Partnership</div>
              <h3 style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 900,
                color: "#fff", lineHeight: 1.2, marginBottom: 16,
              }}>A Rare Convergence of <span style={{ color: "#00c896" }}>Education &amp; Industry</span></h3>
              <p style={{
                fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.52)",
                fontSize: ".9rem", lineHeight: 1.8, marginBottom: 24,
              }}>
                Long-term impact through a collaboration between two organisations dedicated to building future-ready leaders.
              </p>

              {/* Logos */}
              <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: 10,
                  background: "rgba(255,255,255,.07)", border: "1px solid rgba(0,200,150,.18)",
                  borderRadius: 12, padding: "10px 16px",
                }}>
                  <img src={LyfshilpLogo} alt="Lyfshilp" style={{ height: 36, width: "auto", objectFit: "contain" }} />
                  <span style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, color: "rgba(255,255,255,.82)", fontSize: ".85rem" }}>
                    Lyfshilp Academy
                  </span>
                </div>

                <span style={{ fontFamily: "'Playfair Display',serif", color: "rgba(255,255,255,.3)", fontSize: "1.2rem" }}>&amp;</span>

                <div style={{
                  display: "flex", alignItems: "center", gap: 10,
                  background: "rgba(255,255,255,.07)", border: "1px solid rgba(0,200,150,.18)",
                  borderRadius: 12, padding: "10px 16px",
                }}>
                  <img src={agilityLogo} alt="Agility AI" style={{ height: 32, width: "auto", objectFit: "contain" }} />
                  <span style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, color: "rgba(255,255,255,.82)", fontSize: ".85rem" }}>
                    Agility AI
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
