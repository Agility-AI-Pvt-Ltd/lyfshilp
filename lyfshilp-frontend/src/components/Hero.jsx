import { useEffect, useRef, useState } from "react";

/* ── Scroll-reveal hooks (used by Counter) ── */
const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold }
    );

    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView];
};

const Counter = ({ end, suffix = "" }) => {
  const [val, setVal] = useState(0);
  const [ref, inView] = useInView();

  useEffect(() => {
    if (!inView) return;

    let s = 0;
    const step = end / 50;
    const t = setInterval(() => {
      s += step;
      if (s >= end) {
        setVal(end);
        clearInterval(t);
      } else {
        setVal(Math.floor(s));
      }
    }, 28);

    return () => clearInterval(t);
  }, [inView, end]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
};

export default function Hero() {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(135deg,#061510 0%,#0d3d2f 45%,#1a5c46 100%)",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
        @keyframes float2{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}
        @keyframes heroFade{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
        @keyframes scrollBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(8px)}}
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        @keyframes gridMove{0%{background-position:0 0}100%{background-position:60px 60px}}
        @keyframes pulseRing{0%{transform:scale(1);opacity:.7}100%{transform:scale(1.8);opacity:0}}

        .ha1{animation:heroFade .9s ease .1s both;}
        .ha2{animation:heroFade .9s ease .3s both;}
        .ha3{animation:heroFade .9s ease .5s both;}
        .ha4{animation:heroFade .9s ease .7s both;}
        .ha5{animation:heroFade .9s ease .9s both;}

        .floating{animation:float 5.5s ease-in-out infinite;}
        .floating2{animation:float2 7s ease-in-out 1.5s infinite;}
        .scroll-bounce{animation:scrollBounce 1.8s ease-in-out infinite;}
        .grid-bg{background-image:linear-gradient(rgba(0,200,150,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(0,200,150,.035) 1px,transparent 1px);background-size:60px 60px;animation:gridMove 9s linear infinite;}

        .pulse-dot{animation:pulseRing 1.6s infinite;}

        .shimmer-btn{
          background:linear-gradient(90deg,#00c896 0%,#00e8ad 40%,#d4af37 60%,#00c896 100%);
          background-size:200% 100%;
          animation:shimmer 2.8s linear infinite;
          color:#0a2a1f;
          font-weight:700;
          border-radius:50px;
          cursor:pointer;
          transition:transform .25s,box-shadow .25s;
        }
        .shimmer-btn:hover{transform:translateY(-2px);box-shadow:0 10px 32px rgba(0,200,150,.35);}
      `}</style>

      <div className="grid-bg absolute inset-0 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 15% 55%,rgba(0,200,150,.12) 0%,transparent 45%),radial-gradient(circle at 80% 20%,rgba(212,175,55,.07) 0%,transparent 38%),radial-gradient(circle at 65% 80%,rgba(0,200,150,.06) 0%,transparent 40%)",
        }}
      />

      {/* Floating rings */}
      <div
        className="floating absolute pointer-events-none"
        style={{
          right: 60,
          top: 100,
          width: 280,
          height: 280,
          borderRadius: "50%",
          border: "1px solid rgba(0,200,150,.08)",
        }}
      />
      <div
        className="floating2 absolute pointer-events-none"
        style={{
          right: 120,
          top: 170,
          width: 160,
          height: 160,
          borderRadius: "50%",
          border: "1px solid rgba(0,200,150,.06)",
        }}
      />
      <div
        className="floating absolute pointer-events-none"
        style={{
          left: 30,
          bottom: 100,
          width: 200,
          height: 200,
          borderRadius: "50%",
          border: "1px solid rgba(212,175,55,.06)",
        }}
      />

      <div
        className="max-w-7xl mx-auto px-6 w-full"
        style={{
          paddingTop: 120,
          paddingBottom: 80,
          position: "relative",
          zIndex: 2,
        }}
      >
        <div style={{ maxWidth: 620 }}>
          {/* Badge */}
          <div
            className="ha1 inline-flex items-center gap-2 mb-8"
            style={{
              background: "rgba(0,200,150,.11)",
              border: "1px solid rgba(0,200,150,.28)",
              color: "#00c896",
              padding: "6px 18px",
              borderRadius: 50,
              fontFamily: "'DM Sans',sans-serif",
              fontSize: ".75rem",
              fontWeight: 700,
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            <span
              className="pulse-dot"
              style={{
                display: "inline-block",
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#00c896",
              }}
            />
            Global Standards · International Impact
          </div>

          <h1
            className="ha2"
            style={{
              fontSize: "clamp(2.8rem,6vw,5.4rem)",
              fontFamily: "'Playfair Display',serif",
              color: "#fff",
              fontWeight: 900,
              lineHeight: 1.04,
              marginBottom: 16,
            }}
          >
            International
            <br />
            <span style={{ color: "#00c896" }}>FutureX</span>{" "}
            <em style={{ color: "rgba(255,255,255,.8)", fontStyle: "italic" }}>
              Fellowship
            </em>
          </h1>

          <p
            className="ha3"
            style={{
              fontFamily: "'Playfair Display',serif",
              fontStyle: "italic",
              color: "rgba(255,255,255,.58)",
              fontSize: "clamp(1rem,2vw,1.25rem)",
              marginBottom: 20,
            }}
          >
            Developing thinkers, builders & leaders for an AI-driven world.
          </p>

          <p
            className="ha4"
            style={{
              fontFamily: "'DM Sans',sans-serif",
              color: "rgba(255,255,255,.5)",
              fontSize: "1rem",
              lineHeight: 1.8,
              marginBottom: 40,
              maxWidth: 500,
            }}
          >
            A 6-month transformative fellowship integrating MIT Sloan School
            of Management principles with experiential, NEP 2020-aligned
            entrepreneurship education.
          </p>

          <div className="ha4 flex flex-wrap gap-4 mb-14">
            <a
              href="#contact"
              className="shimmer-btn px-8 py-4 text-sm"
              style={{
                textDecoration: "none",
                fontFamily: "'DM Sans',sans-serif",
                letterSpacing: ".4px",
              }}
            >
              Apply for Fellowship →
            </a>
            <a
              href="#about"
              style={{
                display: "inline-block",
                border: "2px solid rgba(255,255,255,.25)",
                color: "#fff",
                padding: "14px 32px",
                borderRadius: 50,
                fontFamily: "'DM Sans',sans-serif",
                fontSize: ".9rem",
                fontWeight: 500,
                textDecoration: "none",
                transition: "border-color .3s,color .3s",
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = "#00c896";
                e.target.style.color = "#00c896";
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = "rgba(255,255,255,.25)";
                e.target.style.color = "#fff";
              }}
            >
              Learn More
            </a>
          </div>

          {/* Stats */}
          <div className="ha5 flex flex-wrap gap-10">
            {[
              { end: 6, suf: " Mo", label: "Program Duration" },
              { end: 4, suf: "", label: "Certifications" },
              { end: 8, suf: " Students", label: "Per Mentor" },
              { end: 100, suf: "K+", label: "Prize Pool ₹" },
            ].map(({ end, suf, label }) => (
              <div key={label}>
                <div
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontSize: "2rem",
                    fontWeight: 900,
                    color: "#00c896",
                    lineHeight: 1,
                  }}
                >
                  <Counter end={end} suffix={suf} />
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: ".72rem",
                    color: "rgba(255,255,255,.4)",
                    textTransform: "uppercase",
                    letterSpacing: "1.5px",
                    marginTop: 5,
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="scroll-bounce absolute flex flex-col items-center gap-2"
        style={{ bottom: 28, left: "50%", transform: "translateX(-50%)" }}
      >
        <span
          style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: ".68rem",
            color: "rgba(255,255,255,.3)",
            letterSpacing: "2px",
          }}
        >
          SCROLL
        </span>
        <div
          style={{
            width: 1,
            height: 32,
            background: "linear-gradient(to bottom,rgba(0,200,150,.6),transparent)",
            borderRadius: 1,
          }}
        />
      </div>
    </section>
  );
}