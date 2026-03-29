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

const PILLARS = [
  {
    num: 1, accent: "#00c896",
    title: "AI & Future Tech",
    focus: "Computational Thinking & Digital Competencies",
    align: "National Digital Education Mission, Skill India",
    outcome: "Tech-literate students ready for the AI era",
  },
  {
    num: 2, accent: "#d4af37",
    title: "Finance & Wealth Skills",
    focus: "Financial literacy & wealth creation basics",
    align: "NEP Financial Literacy Mandates",
    outcome: "Financially aware young citizens",
  },
  {
    num: 3, accent: "#00e8ad",
    title: "Digital Marketing & Branding",
    focus: "Design Thinking, Communication & Digital Citizenship",
    align: "Socio-Emotional Learning (NCF)",
    outcome: "Confident communicators & strategic thinkers",
  },
  {
    num: 4, accent: "#7ee8c8",
    title: "Business Communication",
    focus: "Negotiation, influence, conflict resolution, storytelling, networking",
    align: "Entrepreneurial soft skills — NEP, Skill India",
    outcome: "Persuasive negotiators, storytellers, networkers",
  },
];

const PillarCard = ({ num, accent, title, focus, align, outcome, delay }) => {
  const [ref, inView] = useInView(0.1);
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity .7s ease ${delay}s, transform .7s ease ${delay}s`,
        background: "rgba(255,255,255,.05)",
        border: "1px solid rgba(0,200,150,.15)",
        borderRadius: 18, padding: "24px 20px",
        borderLeft: `3px solid ${accent}`,
        cursor: "default",
        transition: `opacity .7s ease ${delay}s, transform .7s ease ${delay}s, box-shadow .3s ease`,
      }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 16px 40px rgba(0,0,0,.3)`; e.currentTarget.style.transform = "translateY(-3px)"; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
        <div style={{
          width: 38, height: 38, borderRadius: "50%",
          background: `${accent}22`, border: `1px solid ${accent}55`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'Playfair Display',serif", fontWeight: 900,
          color: accent, fontSize: "1.1rem", flexShrink: 0,
        }}>{num}</div>
        <h4 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, color: "#fff", fontSize: "1rem" }}>
          {title}
        </h4>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {[["Focus", focus], ["Alignment", align], ["Outcome", outcome]].map(([k, v]) => (
          <p key={k} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".8rem", color: "rgba(255,255,255,.62)", lineHeight: 1.5, margin: 0 }}>
            <strong style={{ color: "rgba(255,255,255,.82)" }}>{k}:</strong> {v}
          </p>
        ))}
      </div>
    </div>
  );
};

export default function OlympiadSection2() {
  const [headRef, headInView] = useInView(0.1);
  return (
    <section style={{
      background: "#061510",
      padding: "88px 24px", position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(circle at 15% 50%,rgba(0,200,150,.1),transparent 38%), radial-gradient(circle at 85% 20%,rgba(212,175,55,.07),transparent 32%)",
      }} />

      <div className="max-w-7xl mx-auto" style={{ position: "relative", zIndex: 2 }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left: heading + badges */}
          <div
            ref={headRef}
            style={{
              opacity: headInView ? 1 : 0,
              transform: headInView ? "translateX(0)" : "translateX(-40px)",
              transition: "opacity .8s ease, transform .8s ease",
            }}
          >
            <div style={{
              fontFamily: "'DM Sans',sans-serif", fontSize: ".72rem", fontWeight: 700,
              letterSpacing: "2.5px", textTransform: "uppercase", color: "#00c896", marginBottom: 14,
            }}>NCF 2023 Aligned · Multidisciplinary</div>
            <h2 style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 900,
              color: "#fff", lineHeight: 1.15, marginBottom: 16,
            }}>
              The 4 Pillars of the <br />
              <span style={{ color: "#00c896" }}>Curriculum</span>
            </h2>
            <p style={{
              fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.5)",
              fontSize: ".95rem", lineHeight: 1.85, marginBottom: 32,
            }}>
              A multidisciplinary approach designed to future-proof students across every domain that matters in tomorrow's world.
            </p>
            <div className="relative flex justify-center">
              <div style={{
                position: "absolute", inset: "5%",
                background: "radial-gradient(circle,rgba(0,200,150,.13),transparent 65%)",
                filter: "blur(18px)", borderRadius: "50%",
              }} />
              <img src="/images/10.svg" alt="Curriculum"
                style={{ position: "relative", zIndex: 1, width: "80%", maxWidth: 380, filter: "drop-shadow(0 16px 40px rgba(0,0,0,.35))" }}
              />
            </div>
          </div>

          {/* Right: pillar cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {PILLARS.map((p, i) => <PillarCard key={p.num} {...p} delay={i * 0.1} />)}
          </div>

        </div>
      </div>
    </section>
  );
}
