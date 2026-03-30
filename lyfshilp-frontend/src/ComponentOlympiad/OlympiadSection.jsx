import { useEffect, useRef, useState } from "react";
import studentsImage from "/students-group.svg";

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

const AnimatedStat = ({ value, label, icon, delay }) => {
  const [ref, inView] = useInView(0.2);
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0) scale(1)" : "translateY(20px) scale(0.92)",
        transition: `opacity .7s ease ${delay}s, transform .7s ease ${delay}s`,
        textAlign: "center",
        padding: "20px 16px",
        borderRadius: 16,
        background: "rgba(0,200,150,.08)",
        border: "1px solid rgba(0,200,150,.22)",
      }}
    >
      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: 12,
          margin: "0 auto 8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: ".72rem",
          fontWeight: 800,
          letterSpacing: ".8px",
          color: "#00c896",
          border: "1px solid rgba(0,200,150,.28)",
          background: "rgba(0,200,150,.08)",
        }}
      >
        {icon}
      </div>
      <div style={{
        fontFamily: "'Playfair Display',serif",
        fontSize: "clamp(1.5rem,3vw,2.2rem)",
        fontWeight: 900,
        color: "#00c896",
        lineHeight: 1,
        marginBottom: 6,
      }}>{value}</div>
      <p style={{
        fontFamily: "'DM Sans',sans-serif",
        fontSize: ".75rem",
        color: "rgba(255,255,255,.55)",
        lineHeight: 1.5,
        textTransform: "uppercase",
        letterSpacing: "1px",
      }}>{label}</p>
    </div>
  );
};

export default function OlympiadSection() {
  const [titleRef, titleInView] = useInView(0.1);
  const [imgRef, imgInView] = useInView(0.1);

  const stats = [
    { icon: "ER", value: "9/10", label: "Improved Exam Readiness" },
    { icon: "BC", value: "82%", label: "Boosted Confidence" },
    { icon: "CC", value: "87%", label: "Better Career Clarity" },
  ];

  return (
    <section
      style={{
        background: "#061510",
        padding: "100px 24px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glows */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(circle at 20% 60%,rgba(0,200,150,.13),transparent 45%), radial-gradient(circle at 80% 20%,rgba(212,175,55,.08),transparent 40%)",
      }} />
      <div style={{
        position: "absolute", right: -80, top: -80, width: 320, height: 320,
        borderRadius: "50%", border: "1px solid rgba(0,200,150,.07)", pointerEvents: "none",
      }} />

      <div className="max-w-7xl mx-auto" style={{ position: "relative", zIndex: 2 }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16">

          {/* Left content */}
          <div
            ref={titleRef}
            className="order-2 lg:order-1"
            style={{
              opacity: titleInView ? 1 : 0,
              transform: titleInView ? "translateX(0)" : "translateX(-50px)",
              transition: "opacity .85s ease, transform .85s ease",
            }}
          >
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(0,200,150,.12)", border: "1px solid rgba(0,200,150,.3)",
              color: "#00c896", padding: "5px 16px", borderRadius: 50,
              fontFamily: "'DM Sans',sans-serif", fontSize: ".72rem",
              fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase",
              marginBottom: 24,
            }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#00c896", display: "inline-block", animation: "pulse 1.6s infinite" }} />
              DPIIT Recognised · Incubated at IIIT Allahabad
            </div>

            <h1 style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(2.4rem,5vw,3.8rem)",
              fontWeight: 900, color: "#fff", lineHeight: 1.1, marginBottom: 20,
            }}>
              The International <br />
              <span style={{ color: "#00c896" }}>FutureX</span> Fellowship
            </h1>

            <p style={{
              fontFamily: "'DM Sans',sans-serif",
              color: "rgba(255,255,255,.55)", fontSize: "1rem", lineHeight: 1.85,
              maxWidth: 520, marginBottom: 32,
            }}>
              Learn how real businesses are built directly from the founders who built them.
              A journey that connects students with real-world mentors, hands-on experiences,
              and opportunities to transform ideas into impact.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 48 }}>
              <a
                href="#contact"
                style={{
                  display: "inline-block",
                  background: "linear-gradient(135deg,#00c896,#128061)",
                  color: "#fff", padding: "14px 32px", borderRadius: 50,
                  fontFamily: "'DM Sans',sans-serif", fontSize: ".9rem",
                  fontWeight: 700, textDecoration: "none",
                  boxShadow: "0 8px 24px rgba(0,200,150,.35)",
                  transition: "transform .25s,box-shadow .25s",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 14px 32px rgba(0,200,150,.45)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,200,150,.35)"; }}
              >
                Apply for Fellowship →
              </a>
              <a
                href="/International_FutureXFellowship.pdf"
                download
                style={{
                  display: "inline-block",
                  border: "1.5px solid rgba(0,200,150,.4)",
                  color: "#00c896", padding: "14px 32px", borderRadius: 50,
                  fontFamily: "'DM Sans',sans-serif", fontSize: ".9rem",
                  fontWeight: 600, textDecoration: "none",
                  transition: "border-color .25s,background .25s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,200,150,.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
              >
                ↓ Download Brochure
              </a>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {stats.map((s, i) => (
                <AnimatedStat key={i} {...s} delay={0.2 + i * 0.12} />
              ))}
            </div>
          </div>

          {/* Right image */}
          <div
            ref={imgRef}
            className="relative flex justify-center order-1 lg:order-2"
            style={{
              opacity: imgInView ? 1 : 0,
              transform: imgInView ? "translateX(0)" : "translateX(50px)",
              transition: "opacity .85s ease .2s, transform .85s ease .2s",
            }}
          >
            <div style={{
              position: "absolute", inset: "10% 5%",
              background: "radial-gradient(circle,rgba(0,200,150,.18),transparent 65%)",
              filter: "blur(16px)", borderRadius: "50%",
            }} />
            <img
              src={studentsImage}
              alt="FutureX Fellowship students"
              style={{ position: "relative", zIndex: 1, width: "85%", maxWidth: 480, filter: "drop-shadow(0 20px 50px rgba(0,0,0,.4))" }}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
