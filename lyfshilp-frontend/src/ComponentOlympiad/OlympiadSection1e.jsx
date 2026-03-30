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

const InfoCard = ({ title, items, icon, delay }) => {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity .7s ease ${delay}s, transform .7s ease ${delay}s`,
        background: "rgba(255,255,255,.055)",
        border: "1px solid rgba(0,200,150,.18)",
        borderRadius: 16, padding: "22px 20px",
        backdropFilter: "blur(6px)",
      }}
    >
      <div style={{
        fontFamily: "'DM Sans',sans-serif", fontWeight: 700,
        color: "#00c896", fontSize: ".82rem", marginBottom: 14,
        textTransform: "uppercase", letterSpacing: "1px",
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <span>{icon}</span>{title}
      </div>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {items.map((item, i) => (
          <li key={i} style={{
            display: "flex", gap: 10, alignItems: "flex-start",
            fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.72)",
            fontSize: ".85rem", lineHeight: 1.6, marginBottom: 10,
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: "50%", background: "#00c896",
              flexShrink: 0, marginTop: 7,
            }} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function OlympiadSection1e() {
  const [leftRef, leftInView] = useInView(0.1);
  const [rightRef, rightInView] = useInView(0.1);

  return (
    <section style={{
      background: "#061510",
      padding: "88px 24px", position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(circle at 10% 40%,rgba(0,200,150,.1),transparent 40%), radial-gradient(circle at 90% 70%,rgba(212,175,55,.07),transparent 35%)",
      }} />

      <div className="max-w-7xl mx-auto" style={{ position: "relative", zIndex: 2 }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div
            ref={leftRef}
            style={{
              opacity: leftInView ? 1 : 0,
              transform: leftInView ? "translateX(0)" : "translateX(-40px)",
              transition: "opacity .8s ease, transform .8s ease",
            }}
          >
            <div style={{
              fontFamily: "'DM Sans',sans-serif", fontSize: ".72rem", fontWeight: 700,
              letterSpacing: "2.5px", textTransform: "uppercase", color: "#00c896", marginBottom: 14,
            }}>The Landscape is Changing</div>
            <h2 style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 900,
              color: "#fff", lineHeight: 1.15, marginBottom: 16,
            }}>
              The Changing Landscape <br />
              of <span style={{ color: "#00c896" }}>Education</span>
            </h2>
            <p style={{
              fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.55)",
              fontSize: ".95rem", lineHeight: 1.85, marginBottom: 32,
            }}>
              As school leaders, you face the challenge of bridging the gap between traditional academics and future skills.
              NEP 2020 &amp; NCF 2023 require a new kind of learning.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {["Financial Education", "AI & Digital", "Critical Thinking", "Business Comm"].map(t => (
                <span key={t} style={{
                  background: "rgba(0,200,150,.1)", border: "1px solid rgba(0,200,150,.25)",
                  color: "#e2f8f0", padding: "7px 16px", borderRadius: 50,
                  fontFamily: "'DM Sans',sans-serif", fontSize: ".78rem", fontWeight: 600,
                }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Right cards */}
          <div
            ref={rightRef}
            style={{
              opacity: rightInView ? 1 : 0,
              transform: rightInView ? "translateX(0)" : "translateX(40px)",
              transition: "opacity .8s ease .15s, transform .8s ease .15s",
              display: "flex", flexDirection: "column", gap: 14,
            }}
          >
            <InfoCard
              icon="REQ" title="NEP 2020 & NCF 2023 Require Integration of:"
              delay={0.1}
              items={[
                "Financial Literacy & Wealth Management",
                "AI, Coding & Digital Competencies",
                "21st Century Problem Solving & Critical Thinking",
                "Business Communication & Negotiation Skills",
              ]}
            />
            <InfoCard
              icon="CHL" title="The Challenge"
              delay={0.2}
              items={[
                "Implementing these subjects demands trained faculty, modern infrastructure, and additional academic time — resources already stretched thin.",
              ]}
            />
            <InfoCard
              icon="SOL" title="The Solution"
              delay={0.3}
              items={[
                "The FutureX Fellowship brings expert-led, ready-to-launch programs to your school, enabling NEP-compliant future-skilling with zero extra administrative burden.",
              ]}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
