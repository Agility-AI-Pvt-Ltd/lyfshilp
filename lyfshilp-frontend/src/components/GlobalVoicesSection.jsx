import { useEffect, useRef, useState } from "react";
import larryPageImg from "../assets/voices/larry-page.webp";
import barackObamaImg from "../assets/voices/barack-obama.webp";
import billGatesImg from "../assets/voices/bill-gates.webp";
import jensenHuangImg from "../assets/voices/jensen-huang.webp";
import peterThielImg from "../assets/voices/peter-thiel.webp";
import falguniNayarImg from "../assets/voices/falguni-nayar.webp";

const useInView = (threshold = 0.15) => {
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

const Reveal = ({ children, delay = 0, className = "" }) => {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(44px)",
        transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

const QUOTES = [
  {
    name: "Larry Page",
    role: "Co-founder, Google | Former CEO, Alphabet",
    text: "Education should encourage creativity and experimentation.",
    image: larryPageImg,
  },
  {
    name: "Barack Obama",
    role: "44th President of the United States",
    text: "Education should prepare young people for jobs that do not yet exist.",
    image: barackObamaImg,
  },
  {
    name: "Bill Gates",
    role: "Co-founder, Microsoft | Co-chair, Gates Foundation",
    text: "We need education systems that teach problem-solving and critical thinking.",
    image: billGatesImg,
  },
  {
    name: "Jensen Huang",
    role: "Founder and CEO, NVIDIA",
    text: "Understanding how to work with AI will be essential for every profession.",
    image: jensenHuangImg,
  },
  {
    name: "Peter Thiel",
    role: "Co-founder, PayPal | Entrepreneur and Investor",
    text: "Education should teach people how to think, not what to think.",
    image: peterThielImg,
  },
  {
    name: "Falguni Nayar",
    role: "Founder and CEO, Nykaa",
    text: "Modern careers demand adaptability and practical skills at every stage.",
    image: falguniNayarImg,
  },
];

const fallbackAvatar = (name) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0d3d2f&color=ffffff&size=128`;

export default function GlobalVoicesSection() {
  return (
    <section
      style={{
        background: "linear-gradient(135deg,#0d3d2f,#1a5c46)",
        padding: "96px 24px",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <Reveal className="text-center mb-14">
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
            Global Visionaries Agree
          </div>
          <h2 style={{ fontSize: "clamp(2rem,4vw,3rem)", color: "#fff" }}>
            Why Education Must <span style={{ color: "#00c896" }}>Evolve</span>
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {QUOTES.map(({ name, role, text, image }, i) => (
            <Reveal key={name} delay={i * 0.1}>
              <div
                className="quote-card relative p-7 rounded-2xl h-full"
                style={{
                  background: "rgba(255,255,255,.055)",
                  border: "1px solid rgba(0,200,150,.14)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 8,
                    left: 20,
                    fontFamily: "'Playfair Display',serif",
                    fontSize: "5rem",
                    color: "rgba(0,200,150,.18)",
                    lineHeight: 1,
                    userSelect: "none",
                  }}
                >
                  "
                </div>

                <p
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontStyle: "italic",
                    color: "rgba(255,255,255,.86)",
                    fontSize: ".95rem",
                    lineHeight: 1.65,
                    marginTop: 24,
                    marginBottom: 18,
                    position: "relative",
                  }}
                >
                  {text}
                </p>

                <div className="flex items-center gap-3">
                  <img
                    src={image}
                    alt={name}
                    loading="lazy"
                    width={46}
                    height={46}
                    onError={(e) => {
                      e.currentTarget.src = fallbackAvatar(name);
                    }}
                    style={{
                      width: 46,
                      height: 46,
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "2px solid rgba(0,200,150,.34)",
                      boxShadow: "0 4px 10px rgba(0,0,0,.22)",
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <div
                      style={{
                        fontFamily: "'DM Sans',sans-serif",
                        fontWeight: 700,
                        color: "#00c896",
                        fontSize: ".85rem",
                      }}
                    >
                      {name}
                    </div>
                    <div
                      style={{
                        fontFamily: "'DM Sans',sans-serif",
                        color: "rgba(255,255,255,.4)",
                        fontSize: ".73rem",
                        marginTop: 3,
                      }}
                    >
                      {role}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
