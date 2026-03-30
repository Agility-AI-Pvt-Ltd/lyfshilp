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

const evalItems = [
  { label: "Weekly Quizzes", pct: 15 },
  { label: "Case Analysis", pct: 25 },
  { label: "Venture Performance", pct: 30 },
  { label: "Final Pitch (Demo Day)", pct: 30 },
];

const EvalBar = ({ label, pct, delay }) => {
  const [ref, inView] = useInView(0.1);
  return (
    <div ref={ref} style={{ marginBottom: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".85rem", fontWeight: 600, color: "rgba(255,255,255,.8)" }}>{label}</span>
        <span style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, color: "#00c896" }}>{pct}%</span>
      </div>
      <div style={{ height: 7, background: "rgba(255,255,255,.08)", borderRadius: 50, overflow: "hidden" }}>
        <div style={{
          width: inView ? `${pct}%` : "0%",
          transition: `width 1.3s ease ${delay}s`,
          height: "100%", background: "linear-gradient(90deg,#00c896,#d4af37)", borderRadius: 50,
        }} />
      </div>
    </div>
  );
};

const prizes = [
  { medal: "1", place: "1st Prize", amount: "₹75,000", color: "#d4af37" },
  { medal: "2", place: "2nd Prize", amount: "₹50,000", color: "#a8b8c8" },
  { medal: "3", place: "3rd Prize", amount: "₹25,000", color: "#b87333" },
];

export default function OlympiadSection4() {
  const [leftRef, leftInView] = useInView(0.1);
  const [rightRef, rightInView] = useInView(0.1);

  return (
    <section style={{
      background: "#061510",
      padding: "88px 24px", position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(circle at 20% 70%,rgba(212,175,55,.09),transparent 38%), radial-gradient(circle at 80% 20%,rgba(0,200,150,.1),transparent 40%)",
      }} />

      <div className="max-w-7xl mx-auto" style={{ position: "relative", zIndex: 2 }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left: Evaluation + prizes */}
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
            }}>Measuring Impact</div>
            <h2 style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 900,
              color: "#fff", lineHeight: 1.15, marginBottom: 24,
            }}>
              Assessment & <span style={{ color: "#00c896" }}>Rewards</span>
            </h2>

            {/* Eval bars */}
            <div style={{
              background: "rgba(255,255,255,.05)", border: "1px solid rgba(0,200,150,.15)",
              borderRadius: 16, padding: "22px 20px", marginBottom: 20,
            }}>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, color: "#00c896", fontSize: ".8rem", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 18 }}>
                Evaluation Framework · Total 100 Marks
              </div>
              {evalItems.map((item, i) => <EvalBar key={item.label} {...item} delay={i * 0.2} />)}
            </div>

            {/* Prize pool */}
            <div style={{
              background: "rgba(212,175,55,.08)", border: "1px solid rgba(212,175,55,.2)",
              borderRadius: 16, padding: "22px 20px",
            }}>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, color: "#d4af37", fontSize: ".8rem", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 16 }}>
                Prize Pool · ₹1,50,000+
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                {prizes.map(({ medal, place, amount, color }) => (
                  <div key={place} style={{
                    flex: 1, textAlign: "center", padding: "16px 8px",
                    background: "rgba(255,255,255,.05)", border: `1px solid ${color}33`,
                    borderRadius: 12,
                  }}>
                    <div
                      style={{
                        width: 34,
                        height: 34,
                        margin: "0 auto 8px",
                        borderRadius: 10,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: ".85rem",
                        fontWeight: 800,
                        color,
                        border: `1px solid ${color}66`,
                        background: `${color}1f`,
                      }}
                    >
                      {medal}
                    </div>
                    <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, color, fontSize: "1.1rem" }}>{amount}</div>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.45)", fontSize: ".72rem", marginTop: 4 }}>{place}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Elite opportunities + image */}
          <div
            ref={rightRef}
            style={{
              opacity: rightInView ? 1 : 0,
              transform: rightInView ? "translateX(0)" : "translateX(40px)",
              transition: "opacity .8s ease .15s, transform .8s ease .15s",
            }}
          >
            <div style={{
              background: "rgba(255,255,255,.05)", border: "1px solid rgba(0,200,150,.15)",
              borderRadius: 16, padding: "22px 20px", marginBottom: 24,
            }}>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, color: "#00c896", fontSize: ".8rem", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 16 }}>
                Elite Opportunities
              </div>
              {[
                { icon: "IN", text: "Top 25 All-India Rankers: Internship opportunities with partner startups." },
                { icon: "MT", text: "Top 3%: Lifetime mentorship through The International FutureX Fellows Cohort." },
                { icon: "IC", text: "Guided incubation and mentorship to help students evolve into entrepreneurs." },
              ].map(({ icon, text }) => (
                <div key={text} style={{ display: "flex", gap: 14, marginBottom: 14, alignItems: "flex-start" }}>
                  <span
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 9,
                      flexShrink: 0,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: ".65rem",
                      fontWeight: 800,
                      letterSpacing: ".5px",
                      color: "#00c896",
                      border: "1px solid rgba(0,200,150,.3)",
                      background: "rgba(0,200,150,.08)",
                    }}
                  >
                    {icon}
                  </span>
                  <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".87rem", color: "rgba(255,255,255,.7)", lineHeight: 1.55 }}>{text}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-center" style={{ position: "relative" }}>
              <div style={{
                position: "absolute", inset: "5%",
                background: "radial-gradient(circle,rgba(212,175,55,.15),transparent 60%)",
                filter: "blur(16px)", borderRadius: "50%",
              }} />
              <img src="/images/5.svg" alt="Rewards"
                style={{ position: "relative", zIndex: 1, width: "85%", maxWidth: 380, filter: "drop-shadow(0 16px 40px rgba(0,0,0,.35))" }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
