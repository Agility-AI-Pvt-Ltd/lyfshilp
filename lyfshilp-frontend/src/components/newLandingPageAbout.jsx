import { useEffect, useRef, useState } from "react";

/* Local reveal helpers so this section works standalone */
const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        // Toggle both ways so we can fade out when the section scrolls away.
        setInView(e.isIntersecting);
      },
      { threshold }
    );

    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView];
};

const SlideIn = ({ children, from = "left", delay = 0, className = "" }) => {
  const [ref, inView] = useInView();
  // Use a subtle vertical lift for a professional fade-in/out feel.
  const ty = from === "left" ? "18px" : "18px";

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : `translateY(${ty})`,
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

export default function NewLandingPageAbout() {
  const rightCards = [
    {
      t: "Ivy League Standards",
      accent: "#00c896",
      d: "Curriculum benchmarked with MIT Sloan School of Management principles",
    },
    {
      t: "Live Venture Build",
      accent: "#d4af37",
      d: "Students build a real startup - finance, ops, marketing, and sales",
    },
    {
      t: "NEP 2020 Aligned",
      accent: "#2e6b52",
      d: "Fully compliant with NEP Section 4.4 and NCF 2023 mandates",
    },
    {
      t: "Global Network",
      accent: "#00e8ad",
      d: "Lifelong international fellows network with incubation access",
    },
  ];
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const activeCard = rightCards[activeCardIndex];

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveCardIndex((prev) => (prev + 1) % rightCards.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isPaused, rightCards.length]);

  return (
    <section
      id="about"
      className="py-28 px-6"
      style={{ background: "#f6fefa" }}
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <SlideIn from="left">
          <div
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: ".73rem",
              fontWeight: 700,
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              color: "#00c896",
              marginBottom: 14,
            }}
          >
            Why FutureX?
          </div>

          <h2
            style={{
              fontSize: "clamp(2rem,4vw,3rem)",
              color: "#0d3d2f",
              lineHeight: 1.15,
              marginBottom: 20,
            }}
          >
            The Changing <span style={{ color: "#00c896" }}>Landscape</span>{" "}
            of Education
          </h2>

          <p
            style={{
              fontFamily: "'DM Sans',sans-serif",
              color: "#5a7a6e",
              fontSize: ".97rem",
              lineHeight: 1.85,
              marginBottom: 18,
            }}
          >
            As school leaders, you face the challenge of bridging the gap
            between traditional academics and future skills. NEP 2020 &amp;
            NCF 2023 require integration of Financial Education, AI &amp;
            Digital Competencies, 21st Century Problem Solving, and Business
            Communication.
          </p>

          <p
            style={{
              fontFamily: "'DM Sans',sans-serif",
              color: "#5a7a6e",
              fontSize: ".97rem",
              lineHeight: 1.85,
              marginBottom: 30,
            }}
          >
            The FutureX Fellowship brings expert-led, ready-to-launch programs
            to your school, enabling NEP-compliant future-skilling with{" "}
            <strong style={{ color: "#0d3d2f" }}>
              zero administrative burden
            </strong>
            .
          </p>

          <div className="flex flex-wrap gap-3">
            {["Financial Education", "AI & Digital", "Critical Thinking", "Business Comm"].map(
              (t) => (
                <span
                  key={t}
                  style={{
                    background: "rgba(0,200,150,.1)",
                    border: "1px solid rgba(0,200,150,.25)",
                    color: "#0d3d2f",
                    padding: "8px 18px",
                    borderRadius: 50,
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: ".78rem",
                    fontWeight: 600,
                  }}
                >
                  {t}
                </span>
              )
            )}
          </div>
        </SlideIn>

        <SlideIn from="right">
          <div
            style={{ position: "relative" }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              style={{
                position: "absolute",
                inset: "-16px -14px auto",
                height: 130,
                background:
                  "radial-gradient(circle at 20% 40%,rgba(0,200,150,.18),transparent 58%), radial-gradient(circle at 80% 10%,rgba(212,175,55,.15),transparent 52%)",
                pointerEvents: "none",
                filter: "blur(6px)",
              }}
            />
            <div
              className="hover-lift p-8 rounded-3xl"
              style={{
                position: "relative",
                overflow: "hidden",
                background:
                  "linear-gradient(165deg,#ffffff 0%,#f3fbf7 50%,#eef8f4 100%)",
                border: "1px solid rgba(13,61,47,.14)",
                boxShadow:
                  "0 20px 48px rgba(13,61,47,.14), 0 2px 0 rgba(255,255,255,.7) inset",
                minHeight: 280,
                transition: "opacity .35s ease, transform .35s ease, box-shadow .35s ease",
                opacity: 1,
                transform: "translateY(0)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  right: -70,
                  top: -70,
                  width: 190,
                  height: 190,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle at 40% 40%, rgba(0,200,150,.65) 0%, rgba(0,200,150,.22) 45%, transparent 75%)",
                  filter: "blur(2px)",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: -50,
                  bottom: -50,
                  width: 140,
                  height: 140,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle at 60% 30%, rgba(0,200,150,.45) 0%, rgba(0,200,150,.16) 42%, transparent 76%)",
                  filter: "blur(1px)",
                  pointerEvents: "none",
                }}
              />

              <div
                style={{
                  position: "relative",
                  zIndex: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 14,
                }}
              >
                <span
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: ".68rem",
                    fontWeight: 700,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    color: "#0d3d2f",
                    background: "rgba(13,61,47,.08)",
                    border: "1px solid rgba(13,61,47,.14)",
                    borderRadius: 999,
                    padding: "5px 10px",
                  }}
                >
                  Featured Highlight
                </span>
                <span
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: ".74rem",
                    fontWeight: 700,
                    color: "#0d3d2f",
                    opacity: 0.7,
                  }}
                >
                  {String(activeCardIndex + 1).padStart(2, "0")} /{" "}
                  {String(rightCards.length).padStart(2, "0")}
                </span>
              </div>

              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 14,
                  marginBottom: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'DM Sans',sans-serif",
                  fontWeight: 800,
                  color: activeCard.accent,
                  background: `${activeCard.accent}1a`,
                  border: `1px solid ${activeCard.accent}33`,
                  textTransform: "uppercase",
                  letterSpacing: ".5px",
                  position: "relative",
                  zIndex: 2,
                }}
              >
                {activeCardIndex + 1}
              </div>
              <h4
                style={{
                  color: "#0d3d2f",
                  fontFamily: "'Playfair Display',serif",
                  fontSize: "1.28rem",
                  fontWeight: 700,
                  marginBottom: 10,
                  position: "relative",
                  zIndex: 2,
                }}
              >
                {activeCard.t}
              </h4>
              <p
                style={{
                  color: "#5a7a6e",
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: ".9rem",
                  lineHeight: 1.65,
                  marginBottom: 18,
                  position: "relative",
                  zIndex: 2,
                }}
              >
                {activeCard.d}
              </p>

              <div
                style={{
                  position: "relative",
                  zIndex: 2,
                  height: 6,
                  borderRadius: 999,
                  background: "rgba(13,61,47,.12)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${((activeCardIndex + 1) / rightCards.length) * 100}%`,
                    borderRadius: 999,
                    background: `linear-gradient(90deg,${activeCard.accent},#00c896)`,
                    transition: "width .35s ease",
                  }}
                />
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 mt-4">
              {rightCards.map((card, idx) => (
                <button
                  key={card.t}
                  type="button"
                  onClick={() => setActiveCardIndex(idx)}
                  aria-label={`Show ${card.t}`}
                  style={{
                    width: idx === activeCardIndex ? 28 : 10,
                    height: 10,
                    borderRadius: 999,
                    border: "none",
                    cursor: "pointer",
                    background:
                      idx === activeCardIndex
                        ? `linear-gradient(90deg,${activeCard.accent},#00c896)`
                        : "#c6ddd4",
                    transition: "all .25s ease",
                    boxShadow:
                      idx === activeCardIndex
                        ? "0 6px 12px rgba(0,200,150,.28)"
                        : "none",
                  }}
                />
              ))}
            </div>
          </div>
        </SlideIn>
      </div>
    </section>
  );
}

