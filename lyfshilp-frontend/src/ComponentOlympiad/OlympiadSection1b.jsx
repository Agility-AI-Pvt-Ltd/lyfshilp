import { useEffect, useRef, useState } from "react";

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

const QUOTES = [
  { name: "Larry Page", role: "Co-founder, Google | Former CEO, Alphabet", text: "Education should encourage creativity and experimentation.", img: "/images/larry_page.svg" },
  { name: "Barack Obama", role: "44th President of the United States", text: "Education should prepare young people for jobs that don't yet exist.", img: "/images/Obama.svg" },
  { name: "Bill Gates", role: "Co-founder, Microsoft | Co-chair, Gates Foundation", text: "We need education systems that teach problem-solving and critical thinking.", img: "/images/Bill_Gates.svg" },
  { name: "Jensen Huang", role: "Founder & CEO, NVIDIA", text: "Understanding how to work with AI will be essential for every profession.", img: "/images/Jensen_huang.svg" },
  { name: "Peter Thiel", role: "Co-founder, PayPal | Entrepreneur & Investor", text: "Education should teach people how to think, not what to think.", img: "/images/Peter_Theil.svg" },
  { name: "Falguni Nayar", role: "Founder & CEO, Nykaa", text: "Modern careers demand adaptability and practical skills at every stage.", img: "/images/Falguni_Nayar.svg" },
  { name: "Sheryl Sandberg", role: "Former COO, Meta", text: "Careers today require constant reinvention and skill building.", img: "/images/Sheryl_Sandberg.svg" },
];

const QuoteCard = ({ name, role, text, img, delay }) => {
  const [ref, inView] = useInView(0.1);
  return (
    <div
      ref={ref}
      className="quote-card"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity .7s ease ${delay}s, transform .7s ease ${delay}s`,
        position: "relative",
        background: "rgba(255,255,255,.055)",
        border: "1px solid rgba(0,200,150,.14)",
        borderRadius: 20,
        padding: "28px 24px 22px",
        backdropFilter: "blur(8px)",
        overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute", top: 8, left: 18,
        fontFamily: "'Playfair Display',serif", fontSize: "5rem",
        color: "rgba(0,200,150,.15)", lineHeight: 1, userSelect: "none",
      }}>"</div>
      <p style={{
        fontFamily: "'Playfair Display',serif", fontStyle: "italic",
        color: "rgba(255,255,255,.82)", fontSize: ".92rem", lineHeight: 1.7,
        marginTop: 28, marginBottom: 18, position: "relative",
      }}>{text}</p>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <img
          src={img} alt={name}
          style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(0,200,150,.3)", flexShrink: 0 }}
          onError={e => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0d3d2f&color=00c896&size=80`; }}
        />
        <div>
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, color: "#00c896", fontSize: ".84rem" }}>{name}</div>
          <div style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.38)", fontSize: ".7rem", marginTop: 2 }}>{role}</div>
        </div>
      </div>
    </div>
  );
};

export default function OlympiadSection1b() {
  const [headRef, headInView] = useInView(0.1);
  return (
    <section style={{
      background: "#061510",
      padding: "88px 24px",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(circle at 85% 25%,rgba(212,175,55,.07),transparent 35%), radial-gradient(circle at 15% 75%,rgba(0,200,150,.08),transparent 40%)",
      }} />

      <div className="max-w-5xl mx-auto" style={{ position: "relative", zIndex: 2 }}>
        <div
          ref={headRef}
          className="text-center"
          style={{
            marginBottom: 52,
            opacity: headInView ? 1 : 0,
            transform: headInView ? "translateY(0)" : "translateY(28px)",
            transition: "opacity .75s ease, transform .75s ease",
          }}
        >
          <div style={{
            fontFamily: "'DM Sans',sans-serif", fontSize: ".72rem", fontWeight: 700,
            letterSpacing: "2.5px", textTransform: "uppercase", color: "#00c896", marginBottom: 12,
          }}>Global Visionaries Agree</div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 900, color: "#fff", lineHeight: 1.2 }}>
            Why <span style={{ color: "#00c896" }}>FutureX Fellowship?</span>
          </h2>
          <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.45)", fontSize: ".92rem", marginTop: 12 }}>
            Global Thought Leaders on Future-Ready Education
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" style={{ marginBottom: 36 }}>
          {QUOTES.map((q, i) => <QuoteCard key={q.name} {...q} delay={i * 0.08} />)}
        </div>

        {/* Final callout */}
        <div style={{
          background: "rgba(0,200,150,.08)", border: "1px solid rgba(0,200,150,.22)",
          borderRadius: 20, padding: "28px 32px", textAlign: "center",
          backdropFilter: "blur(8px)",
        }}>
          <p style={{
            fontFamily: "'Playfair Display',serif", fontStyle: "italic",
            color: "rgba(255,255,255,.88)", fontSize: "clamp(.95rem,2vw,1.1rem)", lineHeight: 1.7,
          }}>
            International <strong style={{ color: "#00c896" }}>FutureX Fellowship</strong> is built to develop{" "}
            <strong style={{ color: "#00c896" }}>thinkers</strong>,{" "}
            <strong style={{ color: "#00c896" }}>builders</strong>, and{" "}
            <strong style={{ color: "#00c896" }}>leaders</strong> for an AI-driven world.
          </p>
        </div>
      </div>
    </section>
  );
}
