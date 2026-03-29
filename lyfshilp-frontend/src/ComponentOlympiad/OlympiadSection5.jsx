import { useEffect, useRef, useState } from "react";

const useInView = (threshold = 0.12) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
};

const benefits = [
  {
    icon: "OPS",
    title: "Zero Administrative Load",
    desc: "We manage sessions, content, assessments and communication end-to-end.",
  },
  {
    icon: "SCH",
    title: "Enhance School Reputation",
    desc: "Recognition as a certified FutureX Partner School with co-branded identity.",
  },
  {
    icon: "CRT",
    title: "Co-Branded Certificates",
    desc: "Each student certificate carries your school's name and seal.",
  },
  {
    icon: "CSP",
    title: "Seamless Implementation",
    desc: "Dedicated school co-ordinator provided from day one.",
  },
];

export default function OlympiadSection5() {
  const [leftRef, leftInView] = useInView(0.1);
  const [rightRef, rightInView] = useInView(0.1);

  return (
    <section
      style={{
        background: "#061510",
        padding: "88px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(circle at 85% 50%,rgba(0,200,150,.12),transparent 42%)",
        }}
      />

      <div
        className="max-w-7xl mx-auto"
        style={{ position: "relative", zIndex: 2 }}
      >
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
            <div
              style={{
                position: "absolute",
                inset: "5%",
                background:
                  "radial-gradient(circle,rgba(0,200,150,.15),transparent 65%)",
                filter: "blur(20px)",
                borderRadius: "50%",
              }}
            />
            <img
              src="/images/6.svg"
              alt="Partner"
              style={{
                position: "relative",
                zIndex: 1,
                width: "85%",
                maxWidth: 420,
                filter: "drop-shadow(0 20px 48px rgba(0,0,0,.4))",
              }}
            />
          </div>

          {/* Right */}
          <div
            ref={rightRef}
            style={{
              opacity: rightInView ? 1 : 0,
              transform: rightInView ? "translateX(0)" : "translateX(40px)",
              transition: "opacity .8s ease .15s, transform .8s ease .15s",
            }}
          >
            <div
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: ".72rem",
                fontWeight: 700,
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                color: "#00c896",
                marginBottom: 14,
              }}
            >
              Zero Load · Maximum Impact
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "clamp(2rem,4vw,3rem)",
                fontWeight: 900,
                color: "#fff",
                lineHeight: 1.15,
                marginBottom: 28,
              }}
            >
              Why Partner with{" "}
              <span style={{ color: "#00c896" }}>FutureX?</span>
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {benefits.map(({ icon, title, desc }, i) => (
                <div
                  key={title}
                  style={{
                    display: "flex",
                    gap: 16,
                    alignItems: "flex-start",
                    background: "rgba(255,255,255,.05)",
                    border: "1px solid rgba(0,200,150,.14)",
                    borderRadius: 14,
                    padding: "16px 18px",
                    transition:
                      "border-color .3s, background .3s, transform .25s",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(0,200,150,.35)";
                    e.currentTarget.style.background = "rgba(0,200,150,.08)";
                    e.currentTarget.style.transform = "translateX(4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(0,200,150,.14)";
                    e.currentTarget.style.background = "rgba(255,255,255,.05)";
                    e.currentTarget.style.transform = "none";
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      background: "rgba(0,200,150,.14)",
                      border: "1px solid rgba(0,200,150,.25)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: ".62rem",
                      fontWeight: 800,
                      letterSpacing: ".45px",
                      color: "#00c896",
                      flexShrink: 0,
                    }}
                  >
                    {icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "'DM Sans',sans-serif",
                        fontWeight: 700,
                        color: "#fff",
                        fontSize: ".9rem",
                        marginBottom: 4,
                      }}
                    >
                      {title}
                    </div>
                    <div
                      style={{
                        fontFamily: "'DM Sans',sans-serif",
                        color: "rgba(255,255,255,.52)",
                        fontSize: ".8rem",
                        lineHeight: 1.55,
                      }}
                    >
                      {desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
