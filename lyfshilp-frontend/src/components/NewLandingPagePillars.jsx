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

const Reveal = ({ children, delay = 0, className = "" }) => {
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

const PillarIcon = ({ kind, accent }) => {
  const common = {
    width: 46,
    height: 46,
    viewBox: "0 0 64 64",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    style: { color: accent, flex: "0 0 auto" },
  };

  const stroke = { stroke: "currentColor", strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round" };

  if (kind === "tech") {
    return (
      <svg {...common} aria-hidden="true">
        <rect x="18" y="18" width="28" height="28" rx="7" {...stroke} />
        <path d="M26 10v8M38 10v8M26 46v8M38 46v8" {...stroke} />
        <path d="M10 26h8M10 38h8M46 26h8M46 38h8" {...stroke} />
        <path d="M32 26c-3.5 0-6 2.6-6 6s2.5 6 6 6 6-2.6 6-6-2.5-6-6-6Z" {...stroke} />
        <path d="M30 32h4" {...stroke} />
      </svg>
    );
  }

  if (kind === "finance") {
    return (
      <svg {...common} aria-hidden="true">
        <path d="M14 52h40" {...stroke} />
        <path d="M18 52V30" {...stroke} />
        <path d="M28 52V38" {...stroke} />
        <path d="M38 52V24" {...stroke} />
        <path d="M48 52V34" {...stroke} />
        <path d="M44 18l6 6" {...stroke} />
        <path d="M50 24V18H44" {...stroke} />
      </svg>
    );
  }

  if (kind === "marketing") {
    return (
      <svg {...common} aria-hidden="true">
        <path d="M24 26l28-10v32L24 38V26Z" {...stroke} />
        <path d="M24 38l-10 5V26l10 4v8Z" {...stroke} />
        <path d="M44 22c5 6 5 14 0 20" {...stroke} />
        <path d="M48 18c8 9 8 19 0 28" {...stroke} />
      </svg>
    );
  }

  // kind === "communication"
  return (
    <svg {...common} aria-hidden="true">
      <path
        d="M18 20h30c4 0 6 2.3 6 6v12c0 3.7-2 6-6 6H34l-14 10v-10H18c-4 0-6-2.3-6-6V26c0-3.7 2-6 6-6Z"
        {...stroke}
      />
      <path d="M24 30h18" {...stroke} />
      <path d="M24 38h12" {...stroke} />
    </svg>
  );
};

const PILLARS = [
  {
    kind: "tech",
    title: "AI & Future Tech",
    focus: "Computational Thinking & Digital Competencies",
    alignment: "National Digital Education Mission, Skill India",
    outcome: "Tech-literate students ready for the AI era",
    accent: "#00c896",
  },
  {
    kind: "finance",
    title: "Finance & Wealth Skills",
    focus: "Financial education & wealth creation basics",
    alignment: "NEP Financial Literacy Mandates",
    outcome: "Financially aware young citizens",
    accent: "#d4af37",
  },
  {
    kind: "marketing",
    title: "Digital Marketing & Branding",
    focus: "Design Thinking, Communication & Digital Citizenship",
    alignment: "Socio-Emotional Learning (NCF)",
    outcome: "Confident communicators and strategic thinkers",
    accent: "#00e8ad",
  },
  {
    kind: "communication",
    title: "Business Communication",
    focus: "Negotiation, influence, conflict resolution, storytelling",
    alignment: "Entrepreneurial soft skills aligned with NEP, Skill India",
    outcome: "Persuasive negotiators, storytellers, networkers",
    accent: "#2e6b52",
  },
];

export default function NewLandingPagePillars() {
  return (
    <>
      <style>{`
        .pillar-card{
          transition:transform .35s ease,box-shadow .35s ease;
          position:relative;
          overflow:hidden;
        }
        .pillar-card::after{
          content:'';
          position:absolute;
          bottom:0;
          left:0;
          right:0;
          height:3px;
          background:linear-gradient(90deg,#00c896,#d4af37);
          transform:scaleX(0);
          transition:transform .35s;
        }
        .pillar-card:hover{
          transform:translateY(-8px);
          box-shadow:0 20px 50px rgba(13,61,47,.15);
        }
        .pillar-card:hover::after{transform:scaleX(1);}
      `}</style>

      <section
        id="curriculum"
        className="py-28 px-6"
        style={{ background: "#f6fefa" }}
      >
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-16">
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
              NCF 2023 Aligned
            </div>
            <h2
              style={{
                fontSize: "clamp(2rem,4vw,3rem)",
                color: "#0d3d2f",
                marginBottom: 16,
              }}
            >
              The 4 Pillars of the{" "}
              <span style={{ color: "#00c896" }}>Curriculum</span>
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans',sans-serif",
                color: "#5a7a6e",
                fontSize: ".97rem",
                maxWidth: 520,
                margin: "0 auto",
                lineHeight: 1.8,
              }}
            >
              A multidisciplinary approach building the complete toolkit needed
              to thrive in an AI-driven economy.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PILLARS.map(
              ({ kind, title, focus, alignment, outcome, accent }, i) => (
                <Reveal key={title} delay={i * 0.12}>
                  <div
                    className="pillar-card h-full p-7 rounded-2xl"
                    style={{
                      background: "#fff",
                      border: "1px solid #e2f0ec",
                      boxShadow: "0 4px 24px rgba(13,61,47,.07)",
                    }}
                  >
                    <div
                      style={{
                        width: 58,
                        height: 58,
                        borderRadius: 18,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 16,
                        background: "rgba(0,200,150,.07)",
                        border: `1px solid rgba(0,200,150,.14)`,
                      }}
                    >
                      <PillarIcon kind={kind} accent={accent} />
                    </div>

                    <h3
                      style={{
                        color: "#0d3d2f",
                        fontSize: "1.05rem",
                        fontWeight: 700,
                        marginBottom: 18,
                        lineHeight: 1.3,
                      }}
                    >
                      {title}
                    </h3>

                    {[
                      ["Focus", focus],
                      ["Alignment", alignment],
                      ["Outcome", outcome],
                    ].map(([k, v]) => (
                      <div key={k} style={{ marginBottom: 12 }}>
                        <div
                          style={{
                            fontFamily: "'DM Sans',sans-serif",
                            fontSize: ".7rem",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "1px",
                            color: "#00c896",
                            marginBottom: 4,
                          }}
                        >
                          {k}
                        </div>
                        <div
                          style={{
                            fontFamily: "'DM Sans',sans-serif",
                            fontSize: ".8rem",
                            color: "#5a7a6e",
                            lineHeight: 1.55,
                          }}
                        >
                          {v}
                        </div>
                      </div>
                    ))}
                  </div>
                </Reveal>
              )
            )}
          </div>
        </div>
      </section>
    </>
  );
}

