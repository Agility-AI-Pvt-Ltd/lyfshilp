import { Link } from "react-router-dom";

export default function ComingSoon() {
  return (
    <div
      className="min-h-[70vh] flex items-center justify-center pt-28 pb-16 px-4"
      style={{
        background:
          "radial-gradient(circle at top, rgba(0,200,150,0.16), transparent 45%), linear-gradient(135deg,#071a11,#0d3d2f)",
      }}
    >
      <div
        className="max-w-2xl w-full text-center rounded-3xl p-10 md:p-12"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(0,200,150,0.25)",
          boxShadow: "0 24px 70px rgba(0,0,0,0.35)",
          backdropFilter: "blur(6px)",
        }}
      >
        <div
          className="text-xs font-semibold tracking-[0.25em] uppercase mb-3"
          style={{ color: "#00c896" }}
        >
          Community
        </div>
        <h1
          className="text-4xl md:text-5xl font-extrabold mb-4"
          style={{ color: "#ffffff" }}
        >
          Coming Soon
        </h1>
        <p
          className="text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto"
          style={{ color: "rgba(255,255,255,0.72)" }}
        >
          We're building a space for learners, mentors, and builders to connect.
          Check back shortly.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="px-6 py-3 rounded-full font-medium transition"
            style={{
              color: "#0a2a1f",
              background:
                "linear-gradient(90deg,#00c896 0%,#00e8ad 40%,#d4af37 100%)",
            }}
          >
            Go to Home
          </Link>
          <Link
            to="/contact"
            className="px-6 py-3 rounded-full font-medium transition"
            style={{
              color: "#dffcf3",
              border: "1px solid rgba(0,200,150,0.55)",
              background: "rgba(0,200,150,0.08)",
            }}
          >
            Partner with us
          </Link>
        </div>
      </div>
    </div>
  );
}

